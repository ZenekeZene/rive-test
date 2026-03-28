import { useCallback, useRef, useState, useEffect } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { transcribeAudio } from "../../utils/whisper";
import { wordsToVisemes } from "../../utils/lipSync/wordsToVisemes";
import { alignmentToVisemes } from "../../utils/lipSync/alignmentToVisemes";
import { synthesize, getVoices } from "../../utils/elevenlabs";
import { playWithEffect, getAudioContext, VOICE_EFFECTS } from "../../utils/audioEffects";
import { sendMessage } from "../../utils/chat";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./LipSyncBar.module.css";

// Effects available per mode
const MY_VOICE_EFFECTS = ["natural", "chipmunk", "deep", "robot", "echo"];
const EL_EFFECTS = ["natural", "robot", "echo"];
const CHAT_EFFECTS = ["natural", "robot", "echo"];

function LipSyncBar({ onSpeak, onSpeakSequence, onStop, isPlaying }) {
  const { language } = useLanguage();
  const audioCtxRef = useRef(null);
  const playbackRef = useRef(null);

  // Voice mode
  const [voiceMode, setVoiceMode] = useState("myvoice"); // "myvoice" | "elevenlabs"

  // My voice options
  const [selectedEffect, setSelectedEffect] = useState("natural");
  const [preciseMode, setPreciseMode] = useState(true);

  // ElevenLabs options
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [voicesError, setVoicesError] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingState, setProcessingState] = useState(""); // "thinking" | "synthesizing" | ""

  // Chat mode
  const conversationHistoryRef = useRef([]);
  const [lastResponse, setLastResponse] = useState("");

  // Fetch EL voices the first time the user switches to ElevenLabs or Chat mode
  useEffect(() => {
    if ((voiceMode !== "elevenlabs" && voiceMode !== "chat") || voicesLoaded) return;
    getVoices()
      .then((list) => {
        setVoices(list);
        if (list.length > 0) setSelectedVoice(list[0].voice_id);
        setVoicesLoaded(true);
      })
      .catch((err) => {
        setVoicesError(err.message);
        setVoicesLoaded(true);
      });
  }, [voiceMode, voicesLoaded]);

  // ── My voice flow ────────────────────────────────────────────────────────────
  const handleMyVoiceReady = useCallback(async (transcript, audioBlob, durationMs) => {
    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;
    const playbackRate = VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0;

    let sequence = null;

    if (preciseMode) {
      setIsProcessing(true);
      try {
        const { words } = await transcribeAudio(audioBlob, language);
        const raw = wordsToVisemes(words, language);
        sequence = playbackRate === 1.0
          ? raw
          : raw.map((e) => ({ ...e, duration: Math.max(Math.round(e.duration / playbackRate), 16) }));
      } catch (err) {
        console.warn("[LipSyncBar] Whisper failed, text fallback:", err.message);
      }
    }

    try {
      playbackRef.current = await playWithEffect(audioBlob, effectId, audioCtx, () => {
        setIsProcessing(false);
        sequence ? onSpeakSequence(sequence) : onSpeak(transcript, durationMs);
      });
    } catch (err) {
      console.warn("[LipSyncBar] Playback failed:", err);
      setIsProcessing(false);
    }
  }, [language, selectedEffect, preciseMode, onSpeak, onSpeakSequence]);

  // ── ElevenLabs flow ──────────────────────────────────────────────────────────
  const handleELReady = useCallback(async (transcript) => {
    if (!transcript?.trim() || !selectedVoice) return;

    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;

    setIsProcessing(true);
    setProcessingState("synthesizing");
    try {
      const { blob, alignment } = await synthesize(transcript, selectedVoice, language);
      const sequence = alignmentToVisemes(alignment);

      playbackRef.current = await playWithEffect(blob, effectId, audioCtx, () => {
        setIsProcessing(false);
        setProcessingState("");
        onSpeakSequence(sequence, audioCtx);
      });
    } catch (err) {
      console.warn("[LipSyncBar] ElevenLabs failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
    }
  }, [language, selectedVoice, selectedEffect, onSpeakSequence]);

  // ── Chat flow ─────────────────────────────────────────────────────────────
  const handleChatReady = useCallback(async (transcript) => {
    if (!transcript?.trim() || !selectedVoice) return;

    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;

    setIsProcessing(true);
    setProcessingState("thinking");

    const userMsg = { role: "user", content: transcript };
    conversationHistoryRef.current = [...conversationHistoryRef.current, userMsg];

    try {
      const reply = await sendMessage(conversationHistoryRef.current);
      conversationHistoryRef.current = [...conversationHistoryRef.current, { role: "assistant", content: reply }];

      setProcessingState("synthesizing");
      const { blob, alignment } = await synthesize(reply, selectedVoice, language);
      const sequence = alignmentToVisemes(alignment);

      playbackRef.current = await playWithEffect(blob, effectId, audioCtx, () => {
        setIsProcessing(false);
        setProcessingState("");
        setLastResponse(reply);
        onSpeakSequence(sequence, audioCtx);
      });
    } catch (err) {
      console.warn("[LipSyncBar] Chat failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
      conversationHistoryRef.current = conversationHistoryRef.current.slice(0, -1);
    }
  }, [language, selectedVoice, selectedEffect, onSpeakSequence]);

  // ── Speech recognition ───────────────────────────────────────────────────────
  const handleReady = useCallback((transcript, blob, durationMs) => {
    if (voiceMode === "elevenlabs") {
      handleELReady(transcript);
    } else if (voiceMode === "chat") {
      handleChatReady(transcript);
    } else {
      handleMyVoiceReady(transcript, blob, durationMs);
    }
  }, [voiceMode, handleELReady, handleChatReady, handleMyVoiceReady]);

  const {
    supported,
    isListening,
    interimTranscript,
    finalTranscript,
    start,
    stop: stopListening,
  } = useSpeechRecognition({ onReady: handleReady });

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      if (isPlaying) onStop();
      playbackRef.current?.stop();
      start();
    }
  }, [isListening, isPlaying, start, stopListening, onStop]);

  const handleStop = useCallback(() => {
    playbackRef.current?.stop();
    onStop();
  }, [onStop]);

  const handleModeSwitch = useCallback((mode) => {
    if (isListening || isProcessing) return;
    setVoiceMode(mode);
    setSelectedEffect("natural");
    if (mode !== "chat") setLastResponse("");
  }, [isListening, isProcessing]);

  const displayText = isListening
    ? interimTranscript
    : (voiceMode === "chat" && lastResponse && !finalTranscript)
      ? lastResponse
      : finalTranscript;
  const effectList = voiceMode === "myvoice" ? MY_VOICE_EFFECTS : (voiceMode === "chat" ? CHAT_EFFECTS : EL_EFFECTS);

  if (!supported) {
    return (
      <div className={styles.wrapper} data-lip-sync>
        <span className={styles.unsupported}>Speech recognition not available in this browser</span>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} data-lip-sync>

      {/* ── Mode tabs ── */}
      <div className={styles.modeTabs}>
        <button
          className={`${styles.modeTab} ${voiceMode === "myvoice" ? styles.modeActive : ""}`}
          onClick={() => handleModeSwitch("myvoice")}
        >
          Mi voz
        </button>
        <button
          className={`${styles.modeTab} ${voiceMode === "elevenlabs" ? styles.modeActive : ""}`}
          onClick={() => handleModeSwitch("elevenlabs")}
        >
          ElevenLabs
        </button>
        <button
          className={`${styles.modeTab} ${voiceMode === "chat" ? styles.modeActive : ""}`}
          onClick={() => handleModeSwitch("chat")}
        >
          Chat
        </button>
      </div>

      {/* ── Options row ── */}
      <div className={styles.optionsRow}>
        {/* ElevenLabs / Chat: voice selector */}
        {(voiceMode === "elevenlabs" || voiceMode === "chat") && (
          <div className={styles.voiceSelectWrap}>
            {!voicesLoaded ? (
              <span className={styles.voiceLoading}>Loading voices…</span>
            ) : voicesError ? (
              <span className={styles.voiceError}>API key missing</span>
            ) : (
              <select
                className={styles.voiceSelect}
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                disabled={isListening || isProcessing}
              >
                {voices.map((v) => (
                  <option key={v.voice_id} value={v.voice_id}>{v.name}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Effects (vary by mode) */}
        <div className={styles.effects}>
          {effectList.map((id) => (
            <button
              key={id}
              className={`${styles.effectBtn} ${selectedEffect === id ? styles.effectActive : ""}`}
              onClick={() => setSelectedEffect(id)}
              disabled={isListening || isProcessing}
            >
              {VOICE_EFFECTS[id].label}
            </button>
          ))}

          {/* Precise toggle — only in Mi voz mode */}
          {voiceMode === "myvoice" && (
            <button
              className={`${styles.preciseBtn} ${preciseMode ? styles.effectActive : ""}`}
              onClick={() => setPreciseMode((p) => !p)}
              disabled={isListening || isProcessing}
              title={preciseMode ? "Precise mode on (Whisper)" : "Precise mode off (client only)"}
            >
              Precise
            </button>
          )}
        </div>
      </div>

      {/* ── Mic bar ── */}
      <div className={styles.bar}>
        <button
          className={`${styles.micButton} ${isListening ? styles.listening : ""}`}
          onClick={handleMicClick}
          disabled={isProcessing || ((voiceMode === "elevenlabs" || voiceMode === "chat") && !selectedVoice)}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isProcessing ? (
            <span className={styles.spinner} />
          ) : (
            <>
              <svg className={styles.micIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
                <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {isListening && <span className={styles.pulse} />}
            </>
          )}
        </button>

        <span className={`${styles.transcript} ${!displayText ? styles.placeholder : ""} ${isListening ? styles.interim : ""}`}>
          {isProcessing
            ? (processingState === "thinking" ? "Thinking…" : "Synthesizing…")
            : displayText || (isListening ? "Listening…" : "Press mic and speak")}
        </span>

        {isPlaying && (
          <button className={styles.stopButton} onClick={handleStop} aria-label="Stop">
            <svg className={styles.stopIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="5" width="4" height="14" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default LipSyncBar;
