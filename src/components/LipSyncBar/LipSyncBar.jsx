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

// SVG icons for each effect
const EFFECT_ICONS = {
  natural: (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5 Q3 1 5 5 Q7 9 9 5 Q11 1 13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  chipmunk: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 9l4-3.5 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 5.5l4-3.5 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  deep: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 3l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 6.5l4 3.5 4-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  robot: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="2" y="3.5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="6" y1="1" x2="6" y2="3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="4.2" cy="6.5" r="1" fill="currentColor"/>
      <circle cx="7.8" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  ),
  echo: (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M5 5a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M3 5a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M1 5a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
};

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

  // ── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    // Elements where space/digits should pass through untouched
    const isTextInput = (e) => {
      const tag = e.target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable;
    };

    const onKeyDown = (e) => {
      if (e.code === "Space") {
        if (isTextInput(e)) return;         // let space type in real inputs
        e.preventDefault();                 // block scroll / SELECT toggle / button click
        if (!e.repeat && !isListening) {
          if (isPlaying) onStop();
          playbackRef.current?.stop();
          start();
        }
        return;
      }

      if (isTextInput(e)) return;

      // Mode switching: 1 / 2 / 3
      if (e.code === "Digit1") { e.preventDefault(); handleModeSwitch("myvoice"); }
      if (e.code === "Digit2") { e.preventDefault(); handleModeSwitch("elevenlabs"); }
      if (e.code === "Digit3") { e.preventDefault(); handleModeSwitch("chat"); }
    };

    const onKeyUp = (e) => {
      if (e.code !== "Space" || isTextInput(e)) return;
      e.preventDefault();
      if (isListening) stopListening();
    };

    // Capture phase: fires before any element-level handler, ensuring
    // e.preventDefault() always wins over container scroll.
    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("keyup", onKeyUp, { capture: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("keyup", onKeyUp, { capture: true });
    };
  }, [isListening, isPlaying, start, stopListening, onStop, handleModeSwitch]);

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
      {/* ── Single bar ── */}
      <div className={styles.bar}>
        {/* Mic */}
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
              <svg className={styles.micIcon} viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
                <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {isListening && <span className={styles.pulse} />}
            </>
          )}
        </button>

        {/* Filter icons */}
        {effectList.map((id) => (
          <button
            key={id}
            className={`${styles.filterBtn} ${selectedEffect === id ? styles.filterActive : ""}`}
            onClick={() => setSelectedEffect(id)}
            disabled={isListening || isProcessing}
            title={VOICE_EFFECTS[id].label}
          >
            {EFFECT_ICONS[id]}
          </button>
        ))}

        {/* Precise toggle (myvoice) or voice selector (EL/Chat) */}
        {(voiceMode === "elevenlabs" || voiceMode === "chat") ? (
          <div className={styles.voiceSelectWrap}>
            {!voicesLoaded ? (
              <span className={styles.voiceLoading}>…</span>
            ) : voicesError ? (
              <span className={styles.voiceError}>!</span>
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
        ) : (
          <button
            className={`${styles.filterBtn} ${preciseMode ? styles.filterActive : ""}`}
            onClick={() => setPreciseMode((p) => !p)}
            disabled={isListening || isProcessing}
            title={preciseMode ? "Precise (Whisper)" : "Precise off"}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
              <line x1="6" y1="0" x2="6" y2="1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="6" y1="10.5" x2="6" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="0" y1="6" x2="1.5" y2="6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="10.5" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {/* Mode tabs */}
        <button
          className={`${styles.modeTab} ${voiceMode === "myvoice" ? styles.modeActive : ""}`}
          onClick={() => handleModeSwitch("myvoice")}
          title="Mi voz (1)"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="5.5" y="1" width="5" height="8" rx="2.5" fill="currentColor"/>
            <path d="M3 8a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          className={`${styles.modeTab} ${voiceMode === "elevenlabs" ? styles.modeActive : ""}`}
          onClick={() => handleModeSwitch("elevenlabs")}
          title="ElevenLabs (2)"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="6" width="2" height="4" rx="1"/>
            <rect x="4.5" y="3.5" width="2" height="9" rx="1"/>
            <rect x="8" y="1" width="2" height="14" rx="1"/>
            <rect x="11.5" y="3.5" width="2" height="9" rx="1"/>
          </svg>
        </button>
        <button
          className={`${styles.modeTab} ${voiceMode === "chat" ? styles.modeActive : ""}`}
          onClick={() => handleModeSwitch("chat")}
          title="Chat (3)"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h9A1.5 1.5 0 0 1 14 2.5v7A1.5 1.5 0 0 1 12.5 11H5.5l-3.5 3V2.5z" fill="currentColor"/>
          </svg>
        </button>

        {/* Stop */}
        {isPlaying && (
          <button className={styles.stopButton} onClick={handleStop} aria-label="Stop">
            <svg className={styles.stopIcon} viewBox="0 0 24 24" fill="none">
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
