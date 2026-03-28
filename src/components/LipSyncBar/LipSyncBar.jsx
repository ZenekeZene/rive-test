import { useCallback, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { transcribeAudio } from "../../utils/whisper";
import { wordsToVisemes } from "../../utils/lipSync/wordsToVisemes";
import { alignmentToVisemes } from "../../utils/lipSync/alignmentToVisemes";
import { synthesize, getVoices } from "../../utils/elevenlabs";
import { playWithEffect, getAudioContext, VOICE_EFFECTS } from "../../utils/audioEffects";
import { sendMessage } from "../../utils/chat";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./LipSyncBar.module.css";

// Build subtitle chunks from ElevenLabs character-level alignment data.
function buildSubtitleChunks(text, alignment, wordsPerChunk = 5) {
  const chars = alignment.characters;
  const starts = alignment.character_start_times_seconds;
  const ends = alignment.character_end_times_seconds;
  const words = text.trim().split(/\s+/);
  const chunks = [];
  let alignIdx = 0;

  for (let i = 0; i < words.length; i += wordsPerChunk) {
    const groupWords = words.slice(i, i + wordsPerChunk);

    while (alignIdx < chars.length && /\s/.test(chars[alignIdx])) alignIdx++;
    const chunkStartMs = alignIdx < starts.length ? starts[alignIdx] * 1000 : 0;

    const wordsWithTiming = [];
    let lastCharIdx = alignIdx;

    for (const word of groupWords) {
      while (alignIdx < chars.length && /\s/.test(chars[alignIdx])) alignIdx++;

      const wordStartMs = alignIdx < starts.length ? starts[alignIdx] * 1000 : chunkStartMs;
      const letterCount = word.replace(/\s/g, "").length;
      let found = 0;
      while (alignIdx < chars.length && found < letterCount) {
        if (!/\s/.test(chars[alignIdx])) { lastCharIdx = alignIdx; found++; }
        alignIdx++;
      }
      wordsWithTiming.push({ word, delayMs: Math.max(0, wordStartMs - chunkStartMs) });
      while (alignIdx < chars.length && /\s/.test(chars[alignIdx])) alignIdx++;
    }

    const endMs = lastCharIdx < ends.length ? ends[lastCharIdx] * 1000 : chunkStartMs + 2000;
    chunks.push({ words: wordsWithTiming, startMs: chunkStartMs, endMs });
  }

  return chunks;
}

// Build subtitle chunks from Whisper word timestamps {word, start, end} (seconds).
function whisperWordsToSubtitleChunks(words, wordsPerChunk = 5) {
  const chunks = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    const group = words.slice(i, i + wordsPerChunk);
    const chunkStartMs = group[0].start * 1000;
    const chunkEndMs = group[group.length - 1].end * 1000;
    const wordsWithTiming = group.map(w => ({
      word: w.word.trim(),
      delayMs: Math.max(0, w.start * 1000 - chunkStartMs),
    }));
    chunks.push({ words: wordsWithTiming, startMs: chunkStartMs, endMs: chunkEndMs });
  }
  return chunks;
}

// Build subtitle chunks from plain text + total duration (uniform distribution).
function textToSubtitleChunks(text, durationMs, wordsPerChunk = 5) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const totalChunks = Math.ceil(words.length / wordsPerChunk);
  const chunkDuration = durationMs / totalChunks;
  return Array.from({ length: totalChunks }, (_, ci) => {
    const group = words.slice(ci * wordsPerChunk, (ci + 1) * wordsPerChunk);
    const chunkStartMs = ci * chunkDuration;
    const wordStep = chunkDuration / group.length;
    return {
      words: group.map((word, wi) => ({ word, delayMs: wi * wordStep })),
      startMs: chunkStartMs,
      endMs: chunkStartMs + chunkDuration,
    };
  });
}

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

const SECTION_LABELS = {
  experience: "Experience / Work history",
  code: "Projects / Code",
  art: "Artwork / Art gallery",
  others: "Contact / Other",
};

function LipSyncBar({ onSpeak, onSpeakSequence, onStop, isPlaying, isArtMode, activeSection }) {
  const { language } = useLanguage();
  const audioCtxRef = useRef(null);
  const playbackRef = useRef(null);

  // Voice mode
  const [voiceMode, setVoiceMode] = useState(() => localStorage.getItem("lsb_mode") ?? "myvoice");

  // My voice options
  const [selectedEffect, setSelectedEffect] = useState("natural");
  const [preciseMode, setPreciseMode] = useState(true);

  // ElevenLabs options
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem("lsb_voice") ?? "");
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [voicesError, setVoicesError] = useState(null);

  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const cancelledRef = useRef(false);
  const [processingState, setProcessingState] = useState(""); // "thinking" | "synthesizing" | ""

  // Chat mode — history persisted in sessionStorage
  const conversationHistoryRef = useRef(
    (() => { try { const s = sessionStorage.getItem("lsb_chat_history"); return s ? JSON.parse(s) : []; } catch { return []; } })()
  );

  const updateHistory = useCallback((next) => {
    conversationHistoryRef.current = next;
    try { sessionStorage.setItem("lsb_chat_history", JSON.stringify(next)); } catch {}
  }, []);

  // Subtitles
  const [activeSubtitle, setActiveSubtitle] = useState(null); // { text, durationMs }
  const subtitleTimeoutsRef = useRef([]);
  const clearSubtitles = useCallback(() => {
    subtitleTimeoutsRef.current.forEach(clearTimeout);
    subtitleTimeoutsRef.current = [];
    setActiveSubtitle(null);
  }, []);

  const scheduleSubtitles = useCallback((chunks) => {
    subtitleTimeoutsRef.current.forEach(clearTimeout);
    subtitleTimeoutsRef.current = [];
    chunks.forEach((chunk) => {
      const id = setTimeout(
        () => setActiveSubtitle({ words: chunk.words, durationMs: chunk.endMs - chunk.startMs }),
        chunk.startMs
      );
      subtitleTimeoutsRef.current.push(id);
    });
    if (chunks.length) {
      const last = chunks[chunks.length - 1];
      const clearId = setTimeout(() => setActiveSubtitle(null), last.endMs + 400);
      subtitleTimeoutsRef.current.push(clearId);
    }
  }, []);

  // Persist mode and voice selection
  useEffect(() => { localStorage.setItem("lsb_mode", voiceMode); }, [voiceMode]);
  useEffect(() => { if (selectedVoice) localStorage.setItem("lsb_voice", selectedVoice); }, [selectedVoice]);

  // Fetch EL voices the first time the user switches to ElevenLabs or Chat mode
  useEffect(() => {
    if ((voiceMode !== "elevenlabs" && voiceMode !== "chat") || voicesLoaded) return;
    getVoices()
      .then((list) => {
        setVoices(list);
        const miVoz = list.find(v => /mi\s*voz/i.test(v.name));
        setSelectedVoice((miVoz ?? list[0])?.voice_id ?? "");
        setVoicesLoaded(true);
      })
      .catch((err) => {
        setVoicesError(err.message);
        setVoicesLoaded(true);
      });
  }, [voiceMode, voicesLoaded]);

  // ── My voice flow ────────────────────────────────────────────────────────────
  const handleMyVoiceReady = useCallback(async (transcript, audioBlob, durationMs) => {
    cancelledRef.current = false;
    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;
    const playbackRate = VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0;

    let sequence = null;
    let subtitleChunks = [];

    if (preciseMode) {
      setIsProcessing(true);
      try {
        const { words } = await transcribeAudio(audioBlob, language);
        if (cancelledRef.current) return;
        const raw = wordsToVisemes(words, language);
        sequence = playbackRate === 1.0
          ? raw
          : raw.map((e) => ({ ...e, duration: Math.max(Math.round(e.duration / playbackRate), 16) }));
        subtitleChunks = whisperWordsToSubtitleChunks(words);
      } catch (err) {
        console.warn("[LipSyncBar] Whisper failed, text fallback:", err.message);
        subtitleChunks = textToSubtitleChunks(transcript, durationMs);
      }
    } else {
      subtitleChunks = textToSubtitleChunks(transcript, durationMs);
    }

    try {
      playbackRef.current = await playWithEffect(audioBlob, effectId, audioCtx, () => {
        setIsProcessing(false);
        sequence ? onSpeakSequence(sequence) : onSpeak(transcript, durationMs);
        scheduleSubtitles(subtitleChunks);
      });
    } catch (err) {
      console.warn("[LipSyncBar] Playback failed:", err);
      setIsProcessing(false);
    }
  }, [language, selectedEffect, preciseMode, onSpeak, onSpeakSequence, scheduleSubtitles]);

  // ── ElevenLabs flow ──────────────────────────────────────────────────────────
  const handleELReady = useCallback(async (transcript) => {
    if (!transcript?.trim() || !selectedVoice) return;
    cancelledRef.current = false;

    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;

    setIsProcessing(true);
    setProcessingState("synthesizing");
    try {
      const { blob, alignment } = await synthesize(transcript, selectedVoice, language);
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }
      const sequence = alignmentToVisemes(alignment);
      const subtitleChunks = buildSubtitleChunks(transcript, alignment);

      playbackRef.current = await playWithEffect(blob, effectId, audioCtx, () => {
        setIsProcessing(false);
        setProcessingState("");
        onSpeakSequence(sequence, audioCtx);
        scheduleSubtitles(subtitleChunks);
      });
    } catch (err) {
      console.warn("[LipSyncBar] ElevenLabs failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
    }
  }, [language, selectedVoice, selectedEffect, onSpeakSequence, scheduleSubtitles]);

  // ── Chat flow ─────────────────────────────────────────────────────────────
  const handleChatReady = useCallback(async (transcript) => {
    if (!transcript?.trim() || !selectedVoice) return;
    cancelledRef.current = false;

    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;

    setIsProcessing(true);
    setProcessingState("thinking");

    const userMsg = { role: "user", content: transcript };
    updateHistory([...conversationHistoryRef.current, userMsg]);

    try {
      const sectionLabel = SECTION_LABELS[activeSection];
      const context = sectionLabel
        ? `Current context: the visitor is currently viewing the "${sectionLabel}" section of the portfolio.`
        : null;
      const { text, actions } = await sendMessage(conversationHistoryRef.current, context);
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); updateHistory(conversationHistoryRef.current.slice(0, -1)); return; }

      const fallbacks = language === "es"
        ? ["Toma.", "Ahí va.", "Hecho.", "Aquí tienes.", "Listo."]
        : ["There you go.", "Done.", "Here.", "Check it out.", "All yours."];
      const spokenText = text || fallbacks[Math.floor(Math.random() * fallbacks.length)];

      updateHistory([...conversationHistoryRef.current, { role: "assistant", content: spokenText }]);

      setProcessingState("synthesizing");
      const { blob, alignment } = await synthesize(spokenText, selectedVoice, language);
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }
      const sequence = alignmentToVisemes(alignment);
      const subtitleChunks = buildSubtitleChunks(spokenText, alignment);

      if (actions.length > 0) {
        window.dispatchEvent(new CustomEvent("portfolio-action", { detail: { actions } }));
      }

      playbackRef.current = await playWithEffect(blob, effectId, audioCtx, () => {
        if (cancelledRef.current) return;
        setIsProcessing(false);
        setProcessingState("");
        onSpeakSequence(sequence, audioCtx);
        scheduleSubtitles(subtitleChunks);
      });
    } catch (err) {
      console.warn("[LipSyncBar] Chat failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
      updateHistory(conversationHistoryRef.current.slice(0, -1));
    }
  }, [language, selectedVoice, selectedEffect, activeSection, onSpeakSequence, scheduleSubtitles, updateHistory]);

  // ── Speech recognition ───────────────────────────────────────────────────────
  const handleReady = useCallback((transcript, blob, durationMs) => {
    console.log("[transcript]", transcript);
    if (voiceMode === "chat") {
      handleChatReady(transcript);
    } else if (voiceMode === "elevenlabs") {
      handleELReady(transcript);
    } else {
      handleMyVoiceReady(transcript, blob, durationMs);
    }
  }, [voiceMode, handleELReady, handleChatReady, handleMyVoiceReady]);

  const micButtonRef = useRef(null);
  const levelRafRef = useRef(null);

  const {
    supported,
    isListening,
    interimTranscript,
    finalTranscript,
    start,
    stop: stopListening,
    streamRef,
  } = useSpeechRecognition({ onReady: handleReady });

  // ── Audio level visualizer ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isListening || !streamRef.current) return;
    const audioCtx = getAudioContext(audioCtxRef);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.75;
    const source = audioCtx.createMediaStreamSource(streamRef.current);
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const level = Math.min(1, Math.sqrt(sum / data.length) * 6);
      micButtonRef.current?.style.setProperty("--audio-level", level);
      levelRafRef.current = requestAnimationFrame(tick);
    };
    levelRafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(levelRafRef.current);
      source.disconnect();
      micButtonRef.current?.style.setProperty("--audio-level", 0);
    };
  }, [isListening]);

  const interrupt = useCallback(() => {
    cancelledRef.current = true;
    playbackRef.current?.stop();
    clearSubtitles();
    setIsProcessing(false);
    setProcessingState("");
    onStop();
  }, [clearSubtitles, onStop]);

  const handleStop = useCallback(() => {
    playbackRef.current?.stop();
    onStop();
  }, [onStop]);

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      interrupt();
      start();
    }
  }, [isListening, start, stopListening, interrupt]);

  const handleModeSwitch = useCallback((mode) => {
    if (isListening || isProcessing) return;
    setVoiceMode(mode);
    setSelectedEffect("natural");
    clearSubtitles();
  }, [isListening, isProcessing, clearSubtitles]);

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
          interrupt();
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
  }, [isListening, start, stopListening, interrupt, handleModeSwitch]);

  const effectList = voiceMode === "myvoice" ? MY_VOICE_EFFECTS : (voiceMode === "chat" ? CHAT_EFFECTS : EL_EFFECTS);

  if (!supported) {
    return (
      <div className={styles.wrapper} data-lip-sync>
        <span className={styles.unsupported}>Speech recognition not available in this browser</span>
      </div>
    );
  }

  const processingLabel = processingState === "thinking"
    ? (language === "es" ? "Pensando…" : "Thinking…")
    : processingState === "synthesizing"
      ? (language === "es" ? "Sintetizando…" : "Synthesizing…")
      : null;

  const leftPanel = document.getElementById("leftPanel");

  return (
    <>
      {leftPanel && createPortal(
        <div data-avatar-overlay className={isArtMode ? styles.artMode : ""}>
          {!isListening && !isProcessing && !isPlaying && (
            <p className={styles.spaceHint}>
              {language === "es" ? "Pulsa ESPACIO para hablar" : "Press SPACE to speak"}
            </p>
          )}
          {activeSubtitle && subtitlesEnabled && (
            <p className={styles.subtitle} key={activeSubtitle.words.map(w => w.word).join(" ")}>
              {activeSubtitle.words.map(({ word, delayMs }, i) => (
                <span key={i} className={styles.subtitleWord} style={{ "--word-delay": `${delayMs}ms` }}>
                  {word}{" "}
                </span>
              ))}
            </p>
          )}
          {subtitlesEnabled && (interimTranscript || (isListening && finalTranscript)) && (
            <p className={styles.subtitleBottom}>
              {interimTranscript || finalTranscript}
            </p>
          )}
        </div>,
        leftPanel
      )}
    <div className={styles.wrapper} data-lip-sync>
      {processingLabel
        ? <span className={styles.processingLabel}>{processingLabel}</span>
        : <span className={styles.modeBadge}>{voiceMode === "myvoice" ? "MV" : voiceMode === "elevenlabs" ? "EL" : "AI"}</span>
      }

      {/* ── Single bar ── */}
      <div className={styles.bar}>
        {/* Mic */}
        <button
          ref={micButtonRef}
          className={`${styles.micButton} ${isListening ? styles.listening : ""}`}
          onClick={handleMicClick}
          disabled={isProcessing}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening && <span className={styles.levelRing} />}
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
            </>
          )}
        </button>


        {/* Settings gear */}
        <div className={styles.settingsWrap}>
          {settingsOpen && (
            <div className={styles.settingsPanel}>
              {/* Mode */}
              <div className={styles.settingsRow}>
                <button
                  className={`${styles.settingsBtn} ${voiceMode === "myvoice" ? styles.settingsActive : ""}`}
                  onClick={() => handleModeSwitch("myvoice")}
                  title="Mi voz"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <rect x="5.5" y="1" width="5" height="8" rx="2.5" fill="currentColor"/>
                    <path d="M3 8a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className={styles.shortcutHint}>1</span>
                </button>
                <button
                  className={`${styles.settingsBtn} ${voiceMode === "elevenlabs" ? styles.settingsActive : ""}`}
                  onClick={() => handleModeSwitch("elevenlabs")}
                  title="ElevenLabs"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="6" width="2" height="4" rx="1"/>
                    <rect x="4.5" y="3.5" width="2" height="9" rx="1"/>
                    <rect x="8" y="1" width="2" height="14" rx="1"/>
                    <rect x="11.5" y="3.5" width="2" height="9" rx="1"/>
                  </svg>
                  <span className={styles.shortcutHint}>2</span>
                </button>
                <button
                  className={`${styles.settingsBtn} ${voiceMode === "chat" ? styles.settingsActive : ""}`}
                  onClick={() => handleModeSwitch("chat")}
                  title="Chat"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h9A1.5 1.5 0 0 1 14 2.5v7A1.5 1.5 0 0 1 12.5 11H5.5l-3.5 3V2.5z" fill="currentColor"/>
                  </svg>
                  <span className={styles.shortcutHint}>3</span>
                </button>
              </div>

              {/* Voice selector (EL / Chat) */}
              {(voiceMode === "elevenlabs" || voiceMode === "chat") && (
                <div className={styles.settingsRow}>
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
                </div>
              )}

              {/* Effects */}
              <div className={styles.settingsRow}>
                {effectList.map((id) => (
                  <button
                    key={id}
                    className={`${styles.settingsBtn} ${selectedEffect === id ? styles.settingsActive : ""}`}
                    onClick={() => setSelectedEffect(id)}
                    disabled={isListening || isProcessing}
                    title={VOICE_EFFECTS[id].label}
                  >
                    {EFFECT_ICONS[id]}
                  </button>
                ))}
                {voiceMode === "myvoice" && (
                  <button
                    className={`${styles.settingsBtn} ${preciseMode ? styles.settingsActive : ""}`}
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
              </div>

              {/* Subtitles */}
              <div className={styles.settingsRow}>
                <button
                  className={`${styles.settingsBtn} ${subtitlesEnabled ? styles.settingsActive : ""}`}
                  onClick={() => setSubtitlesEnabled(e => !e)}
                  title="Subtítulos"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <line x1="3.5" y1="7.5" x2="7.5" y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <line x1="3.5" y1="10" x2="12.5" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <line x1="9" y1="7.5" x2="12.5" y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Gear button */}
          <button
            className={`${styles.gearBtn} ${settingsOpen ? styles.gearActive : ""}`}
            onClick={() => setSettingsOpen(o => !o)}
            title="Configuración"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
            </svg>
          </button>
        </div>

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
    </>
  );
}

export default LipSyncBar;
