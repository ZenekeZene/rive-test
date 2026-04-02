import { useCallback, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { transcribeAudio } from "../../utils/whisper";
import { wordsToVisemes } from "../../utils/lipSync/wordsToVisemes";
import { alignmentToVisemes } from "../../utils/lipSync/alignmentToVisemes";
import { synthesize, getVoices } from "../../utils/elevenlabs";
import { playWithEffect, playWithAudioElement, getAudioContext, unlockAudioContext, VOICE_EFFECTS } from "../../utils/audioEffects";
import { sendMessage } from "../../utils/chat";
import { useLanguage } from "../../i18n/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";
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
  const isMobile = useIsMobile();
  const audioCtxRef = useRef(null);
  const playbackRef = useRef(null);

  // Mobile audio permission: "unknown" | "granted" | "denied"
  const [permissionState, setPermissionState] = useState(
    () => localStorage.getItem("lsb_audio_permission") ?? "unknown"
  );

  // Voice mode
  const [voiceMode, setVoiceMode] = useState(() => localStorage.getItem("lsb_mode") ?? "chat");

  // My voice options
  const [selectedEffect, setSelectedEffect] = useState("natural");
  const [preciseMode, setPreciseMode] = useState(true);

  // ElevenLabs options
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem("lsb_voice") ?? "");
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [voicesError, setVoicesError] = useState(null);

  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [proactiveEnabled, setProactiveEnabled] = useState(() => localStorage.getItem("lsb_proactive") !== "false");
  const [speechRate, setSpeechRate] = useState(() => parseFloat(localStorage.getItem("lsb_speech_rate") ?? "1.0"));

  // ElevenLabs kill switch — env var forces off (dev), Ctrl+Shift+E toggles at runtime
  const elForcedOff = import.meta.env.VITE_DISABLE_ELEVENLABS === "true";
  const [elEnabled, setElEnabled] = useState(() => elForcedOff ? false : localStorage.getItem("lsb_el") !== "false");
  const [elToast, setElToast] = useState(null); // "on" | "off" | null

  // Director mode — script prompt injected as system message
  const [scriptPrompt, setScriptPrompt] = useState(() => localStorage.getItem("lsb_script") ?? "");
  const [scriptEnabled, setScriptEnabled] = useState(() => localStorage.getItem("lsb_script_enabled") === "true");
  const [scriptPanelOpen, setScriptPanelOpen] = useState(false);
  // Ref so callbacks don't need to re-bind on every keystroke
  const scriptRef = useRef({ prompt: scriptPrompt, enabled: scriptEnabled });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const cancelledRef = useRef(false);
  const idleTimerRef = useRef(null);
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

  const scaleChunks = useCallback((chunks, rate) => {
    if (rate === 1.0) return chunks;
    return chunks.map(c => ({
      ...c,
      startMs: c.startMs / rate,
      endMs: c.endMs / rate,
      words: c.words.map(w => ({ ...w, delayMs: w.delayMs / rate })),
    }));
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
  useEffect(() => { localStorage.setItem("lsb_proactive", proactiveEnabled); }, [proactiveEnabled]);
  useEffect(() => { if (!elForcedOff) localStorage.setItem("lsb_el", elEnabled); }, [elEnabled, elForcedOff]);
  useEffect(() => { if (!elToast) return; const t = setTimeout(() => setElToast(null), 2500); return () => clearTimeout(t); }, [elToast]);
  useEffect(() => { if (!elEnabled && voiceMode === "elevenlabs") setVoiceMode("chat"); }, [elEnabled, voiceMode]);
  useEffect(() => { localStorage.setItem("lsb_speech_rate", speechRate); }, [speechRate]);
  useEffect(() => {
    scriptRef.current.prompt = scriptPrompt;
    localStorage.setItem("lsb_script", scriptPrompt);
  }, [scriptPrompt]);
  useEffect(() => {
    scriptRef.current.enabled = scriptEnabled;
    localStorage.setItem("lsb_script_enabled", scriptEnabled);
  }, [scriptEnabled]);

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
    const effectRate = VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0;
    const effectiveRate = effectRate * speechRate;

    let sequence = null;
    let subtitleChunks = [];

    if (preciseMode) {
      setIsProcessing(true);
      try {
        const { words } = await transcribeAudio(audioBlob, language);
        if (cancelledRef.current) return;
        const raw = wordsToVisemes(words, language);
        sequence = effectiveRate === 1.0
          ? raw
          : raw.map((e) => ({ ...e, duration: Math.max(Math.round(e.duration / effectiveRate), 16) }));
        subtitleChunks = whisperWordsToSubtitleChunks(words);
      } catch (err) {
        console.warn("[LipSyncBar] Whisper failed, text fallback:", err.message);
        subtitleChunks = textToSubtitleChunks(transcript, durationMs);
      }
    } else {
      subtitleChunks = textToSubtitleChunks(transcript, durationMs);
    }

    try {
      const onStart = () => {
        setIsProcessing(false);
        sequence ? onSpeakSequence(sequence) : onSpeak(transcript, durationMs);
        scheduleSubtitles(subtitleChunks);
      };
      if (isMobile) {
        playbackRef.current = playWithAudioElement(audioBlob, effectId, onStart, speechRate);
      } else {
        playbackRef.current = await playWithEffect(audioBlob, effectId, audioCtx, onStart, speechRate);
      }
    } catch (err) {
      console.warn("[LipSyncBar] Playback failed:", err);
      setIsProcessing(false);
    }
  }, [language, selectedEffect, preciseMode, speechRate, isMobile, onSpeak, onSpeakSequence, scheduleSubtitles]);

  // ── ElevenLabs flow ──────────────────────────────────────────────────────────
  const handleELReady = useCallback(async (transcript) => {
    if (!transcript?.trim() || !selectedVoice) return;
    cancelledRef.current = false;

    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;

    setIsProcessing(true);
    setProcessingState("synthesizing");

    try {
      const { blob, alignment } = await synthesize(transcript, selectedVoice, language, "flash");
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }
      const effectiveRate = (VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0) * speechRate;
      const raw = alignmentToVisemes(alignment);
      const sequence = effectiveRate === 1.0 ? raw : raw.map(e => ({ ...e, duration: Math.max(Math.round(e.duration / effectiveRate), 16) }));
      const subtitleChunks = scaleChunks(buildSubtitleChunks(transcript, alignment), effectiveRate);

      const onStart = () => {
        setIsProcessing(false);
        setProcessingState("");
        onSpeakSequence(sequence, audioCtx);
        scheduleSubtitles(subtitleChunks);
      };
      if (isMobile) {
        playbackRef.current = playWithAudioElement(blob, effectId, onStart, speechRate);
      } else {
        playbackRef.current = await playWithEffect(blob, effectId, audioCtx, onStart, speechRate);
      }
    } catch (err) {
      console.warn("[LipSyncBar] ElevenLabs failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
    }
  }, [language, selectedVoice, selectedEffect, speechRate, isMobile, onSpeakSequence, scheduleSubtitles, scaleChunks]);

  // ── Chat flow ─────────────────────────────────────────────────────────────
  const handleChatReady = useCallback(async (transcript) => {
    if (!transcript?.trim()) return;
    if (!selectedVoice && elEnabled) return;
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
      const activeScript = scriptRef.current.enabled && scriptRef.current.prompt.trim()
        ? scriptRef.current.prompt.trim() : null;
      const { text, actions } = await sendMessage(conversationHistoryRef.current, context, activeScript);
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); updateHistory(conversationHistoryRef.current.slice(0, -1)); return; }

      const fallbacks = language === "es"
        ? ["Toma.", "Ahí va.", "Hecho.", "Aquí tienes.", "Listo."]
        : ["There you go.", "Done.", "Here.", "Check it out.", "All yours."];
      const spokenText = text || fallbacks[Math.floor(Math.random() * fallbacks.length)];

      updateHistory([...conversationHistoryRef.current, { role: "assistant", content: spokenText }]);

      setProcessingState("synthesizing");

      if (actions.length > 0) {
        window.dispatchEvent(new CustomEvent("portfolio-action", { detail: { actions } }));
      }

      if (!elEnabled) {
        // Web Speech API fallback — no ElevenLabs cost
        const estimatedDurationMs = (spokenText.trim().split(/\s+/).length / 150) * 60_000 * (1 / speechRate);
        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.lang = language === "es" ? "es-ES" : "en-US";
        utterance.rate = speechRate;
        const wsVoices = speechSynthesis.getVoices();
        const wsMatch = wsVoices.find(v => v.lang.startsWith(language === "es" ? "es" : "en") && !v.localService)
                     ?? wsVoices.find(v => v.lang.startsWith(language === "es" ? "es" : "en"));
        if (wsMatch) utterance.voice = wsMatch;
        utterance.onstart = () => {
          if (cancelledRef.current) { speechSynthesis.cancel(); return; }
          setIsProcessing(false);
          setProcessingState("");
          onSpeak(spokenText, estimatedDurationMs);
          scheduleSubtitles(textToSubtitleChunks(spokenText, estimatedDurationMs));
        };
        utterance.onend = () => { if (!cancelledRef.current) onStop(); };
        utterance.onerror = (e) => {
          console.error("[LipSyncBar] SpeechSynthesis error:", e.error);
          setIsProcessing(false);
          setProcessingState("");
          onStop();
        };
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
        playbackRef.current = { stop: () => speechSynthesis.cancel() };
        return;
      }

      const { blob, alignment } = await synthesize(spokenText, selectedVoice, language, "flash");
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }

      const effectiveRate = (VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0) * speechRate;
      const raw = alignmentToVisemes(alignment);
      const sequence = effectiveRate === 1.0 ? raw : raw.map(e => ({ ...e, duration: Math.max(Math.round(e.duration / effectiveRate), 16) }));
      const subtitleChunks = scaleChunks(buildSubtitleChunks(spokenText, alignment), effectiveRate);

      const onStart = () => {
        if (cancelledRef.current) return;
        setIsProcessing(false);
        setProcessingState("");
        onSpeakSequence(sequence, audioCtx);
        scheduleSubtitles(subtitleChunks);
      };
      if (isMobile) {
        playbackRef.current = playWithAudioElement(blob, effectId, onStart, speechRate);
      } else {
        playbackRef.current = await playWithEffect(blob, effectId, audioCtx, onStart, speechRate);
      }
    } catch (err) {
      console.warn("[LipSyncBar] Chat failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
      updateHistory(conversationHistoryRef.current.slice(0, -1));
    }
  }, [language, selectedVoice, selectedEffect, speechRate, isMobile, elEnabled, activeSection, onSpeak, onStop, onSpeakSequence, scheduleSubtitles, scaleChunks, updateHistory]);

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
  const waveRef      = useRef(null);
  const levelRafRef  = useRef(null);

  const {
    supported,
    isListening,
    interimTranscript,
    finalTranscript,
    start,
    stop: stopListening,
    prewarm,
    micPermissionRef,
    streamRef,
  } = useSpeechRecognition({ onReady: handleReady });

  // ── Mobile permission bootstrap ──────────────────────────────────────────────
  // On returning visits the permission is already saved — mark micPermissionRef
  // so the first press immediately records without a prewarm round-trip.
  useEffect(() => {
    if (localStorage.getItem("lsb_audio_permission") === "granted") {
      micPermissionRef.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePermissionAccept = useCallback(async () => {
    // Same unlock used on every mic press — sets the baseline for this session.
    unlockAudioContext(audioCtxRef);

    // Now request mic permission (async — will show Safari's native dialog)
    const granted = await prewarm();
    const next = granted ? "granted" : "denied";
    localStorage.setItem("lsb_audio_permission", next);
    setPermissionState(next);
  }, [prewarm]);

  const handlePermissionDeny = useCallback(() => {
    localStorage.setItem("lsb_audio_permission", "denied");
    setPermissionState("denied");
  }, []);

  // ── Audio level visualizer ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isListening || !streamRef.current) return;
    const audioCtx = getAudioContext(audioCtxRef);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    const source = audioCtx.createMediaStreamSource(streamRef.current);
    source.connect(analyser);
    const freqData  = new Uint8Array(analyser.frequencyBinCount); // for waveform bars
    const timeData  = new Uint8Array(analyser.frequencyBinCount); // for level ring

    const tick = () => {
      if (waveRef.current) {
        // Mobile: drive each bar with its own frequency bin (vocal range 0-55)
        analyser.getByteFrequencyData(freqData);
        const bars = waveRef.current.children;
        const count = bars.length;
        for (let i = 0; i < count; i++) {
          const bin = Math.floor((i / count) * 55);
          bars[i].style.setProperty("--lv", Math.max(0.08, freqData[bin] / 255));
        }
      } else {
        // Desktop: single RMS level for the ring
        analyser.getByteTimeDomainData(timeData);
        let sum = 0;
        for (let i = 0; i < timeData.length; i++) {
          const v = (timeData[i] - 128) / 128;
          sum += v * v;
        }
        micButtonRef.current?.style.setProperty("--audio-level", Math.min(1, Math.sqrt(sum / timeData.length) * 6));
      }
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

  // Desktop: toggle on click
  const handleMicClick = useCallback(() => {
    unlockAudioContext(audioCtxRef);
    if (isListening) {
      stopListening();
    } else {
      interrupt();
      start();
    }
  }, [isListening, start, stopListening, interrupt]);

  // Mobile: press-and-hold — touchstart starts, touchend stops.
  // On first touch, permission hasn't been granted yet — iOS would show a dialog
  // that interrupts the gesture. We pre-request permission and bail early;
  // the next press-and-hold will work instantly (getUserMedia resolves with no dialog).
  const handleMicTouchStart = useCallback((e) => {
    e.preventDefault(); // prevent ghost click from also firing
    if (isProcessing) return;
    // Re-unlock on every press — iOS can re-suspend between gestures
    unlockAudioContext(audioCtxRef);

    if (!micPermissionRef.current) {
      // First touch: request permission only, don't start recording yet
      prewarm();
      return;
    }

    if (!isListening) {
      interrupt();
      start();
    }
  }, [isProcessing, isListening, interrupt, start, prewarm, micPermissionRef]);

  const handleMicTouchEnd = useCallback((e) => {
    e.preventDefault();
    if (isListening) stopListening();
  }, [isListening, stopListening]);

  // ── Proactive comments ───────────────────────────────────────────────────────
  const handleProactiveComment = useCallback(async (prompt) => {
    if (!proactiveEnabled || voiceMode === "myvoice" || !selectedVoice || isListening || isProcessing || isPlaying) return;

    cancelledRef.current = false;
    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;

    setIsProcessing(true);
    setProcessingState("thinking");

    try {
      const sectionLabel = SECTION_LABELS[activeSection];
      const context = sectionLabel
        ? `Current context: the visitor is currently viewing the "${sectionLabel}" section of the portfolio.`
        : null;
      const activeScript = scriptRef.current.enabled && scriptRef.current.prompt.trim()
        ? scriptRef.current.prompt.trim() : null;
      const { text } = await sendMessage([{ role: "user", content: prompt }], context, activeScript);
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }

      const spokenText = text;
      if (!spokenText) { setIsProcessing(false); setProcessingState(""); return; }

      updateHistory([
        ...conversationHistoryRef.current,
        { role: "user", content: prompt },
        { role: "assistant", content: spokenText },
      ]);

      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }

      setProcessingState("synthesizing");

      const { blob, alignment } = await synthesize(spokenText, selectedVoice, language, "flash");
      if (cancelledRef.current) { setIsProcessing(false); setProcessingState(""); return; }

      const effectiveRate = (VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0) * speechRate;
      const raw = alignmentToVisemes(alignment);
      const sequence = effectiveRate === 1.0 ? raw : raw.map(e => ({ ...e, duration: Math.max(Math.round(e.duration / effectiveRate), 16) }));
      const subtitleChunks = scaleChunks(buildSubtitleChunks(spokenText, alignment), effectiveRate);

      const onStartProactive = () => {
        if (cancelledRef.current) return;
        setIsProcessing(false);
        setProcessingState("");
        onSpeakSequence(sequence, audioCtx);
        scheduleSubtitles(subtitleChunks);
      };
      if (isMobile) {
        playbackRef.current = playWithAudioElement(blob, effectId, onStartProactive, speechRate);
      } else {
        playbackRef.current = await playWithEffect(blob, effectId, audioCtx, onStartProactive, speechRate);
      }
    } catch (err) {
      console.warn("[LipSyncBar] Proactive comment failed:", err.message);
      setIsProcessing(false);
      setProcessingState("");
    }
  }, [voiceMode, selectedVoice, proactiveEnabled, isListening, isProcessing, isPlaying, selectedEffect, speechRate, isMobile, activeSection, language, onSpeakSequence, scheduleSubtitles, scaleChunks, updateHistory]);

  useEffect(() => {
    const onProject = (e) => {
      if (proactiveCountRef.current >= 3) return;
      proactiveCountRef.current += 1;
      const { project_name } = e.detail;
      handleProactiveComment(`[Context] The visitor just opened the project "${project_name}". React to it naturally in one short sentence, as if you noticed them looking at it.`);
    };
    const onArtwork = (e) => {
      if (proactiveCountRef.current >= 3) return;
      proactiveCountRef.current += 1;
      const { artwork_title } = e.detail;
      handleProactiveComment(`[Context] The visitor just opened the artwork "${artwork_title}". React to it naturally in one short sentence, as if you noticed them looking at it.`);
    };
    window.addEventListener("user-opened-project", onProject);
    window.addEventListener("user-opened-artwork", onArtwork);
    return () => {
      window.removeEventListener("user-opened-project", onProject);
      window.removeEventListener("user-opened-artwork", onArtwork);
    };
  }, [handleProactiveComment]);

  // ── Idle state ───────────────────────────────────────────────────────────────
  const IDLE_DELAY = 20_000;
  const IDLE_DELAY_AFTER = 35_000;
  const idleCountRef = useRef(0);
  const proactiveCountRef = useRef(0);

  const IDLE_PROMPTS = {
    es: [
      "[Idle] El visitante lleva un rato sin interactuar. Dí algo natural y breve para reconectar, como si te hubieras dado cuenta de que sigue ahí. Puede ser una curiosidad sobre tu trabajo, una pregunta, o un comentario casual. Una sola frase.",
      "[Idle] Silencio prolongado. Rompe el hielo con algo interesante sobre ti o tus proyectos. Una frase corta y natural.",
      "[Idle] El visitante está en silencio. Anímale a explorar o hacer una pregunta. Sé natural, no robótico. Una frase.",
    ],
    en: [
      "[Idle] The visitor hasn't interacted for a while. Say something natural and brief to re-engage, as if you just noticed they're still there. Could be a curiosity about your work, a question, or a casual remark. One sentence only.",
      "[Idle] Long silence. Break the ice with something interesting about yourself or your projects. One short natural sentence.",
      "[Idle] The visitor is quiet. Encourage them to explore or ask something. Be natural, not robotic. One sentence.",
    ],
  };

  useEffect(() => {
    if (!proactiveEnabled || voiceMode === "myvoice" || !selectedVoice) return;
    if (isListening || isProcessing || isPlaying) {
      clearTimeout(idleTimerRef.current);
      return;
    }

    if (idleCountRef.current >= 3) return;
    const delay = idleCountRef.current === 0 ? IDLE_DELAY : IDLE_DELAY_AFTER;
    idleTimerRef.current = setTimeout(() => {
      const prompts = IDLE_PROMPTS[language] ?? IDLE_PROMPTS.en;
      const prompt = prompts[idleCountRef.current % prompts.length];
      idleCountRef.current += 1;
      handleProactiveComment(prompt);
    }, delay);

    return () => clearTimeout(idleTimerRef.current);
  }, [isListening, isProcessing, isPlaying, proactiveEnabled, voiceMode, selectedVoice, language, handleProactiveComment]);

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

      // Ctrl+Shift+E — toggle ElevenLabs (disabled if forced off by env)
      if (e.code === "KeyE" && e.ctrlKey && e.shiftKey && !elForcedOff) {
        e.preventDefault();
        setElEnabled(prev => {
          const next = !prev;
          setElToast(next ? "on" : "off");
          return next;
        });
        return;
      }

      // Mode switching: 1 / 2 / 3
      if (e.code === "Digit1") { e.preventDefault(); handleModeSwitch("myvoice"); }
      if (e.code === "Digit2") { e.preventDefault(); if (elEnabled) handleModeSwitch("elevenlabs"); }
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
  }, [isListening, start, stopListening, interrupt, handleModeSwitch, elEnabled, elForcedOff]);

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
              {isMobile
                ? (language === "es" ? "Mantén pulsado para hablar" : "Hold to speak")
                : (language === "es" ? "Pulsa ESPACIO para hablar" : "Press SPACE to speak")
              }
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

      {/* Permission modal — mobile only, first visit */}
      {leftPanel && isMobile && permissionState === "unknown" && createPortal(
        <div className={styles.permissionOverlay}>
          <div className={styles.permissionCard}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={styles.permissionIcon}>
              <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
              <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className={styles.permissionTitle}>
              {language === "es" ? "Habla con el avatar" : "Talk to the avatar"}
            </p>
            <p className={styles.permissionText}>
              {language === "es"
                ? "Necesitamos acceso a tu micrófono para que puedas interactuar con voz."
                : "We need access to your microphone so you can interact by voice."}
            </p>
            <div className={styles.permissionActions}>
              <button className={styles.permissionAccept} onClick={handlePermissionAccept}>
                {language === "es" ? "Activar micrófono" : "Enable microphone"}
              </button>
              <button className={styles.permissionDeny} onClick={handlePermissionDeny}>
                {language === "es" ? "Omitir" : "Skip"}
              </button>
            </div>
          </div>
        </div>,
        leftPanel
      )}

    {/* Hide the recording bar on mobile if permission was denied */}
    {!(isMobile && permissionState === "denied") && (
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
          onTouchStart={handleMicTouchStart}
          onTouchEnd={handleMicTouchEnd}
          disabled={isProcessing}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening && (
            isMobile
              ? (
                <span className={styles.waveform} ref={waveRef}>
                  {Array.from({ length: 24 }, (_, i) => <span key={i} className={styles.waveBar} />)}
                </span>
              )
              : <span className={styles.levelRing} />
          )}
          {isProcessing ? (
            <span className={styles.spinner} />
          ) : (
            /* On mobile, hide the mic icon while the waveform is shown */
            (!isMobile || !isListening) && (
              <svg className={styles.micIcon} viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
                <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )
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
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5 1.5h7a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 12 8.5H9L7 10.5V8.5H5A1.5 1.5 0 0 1 3.5 7V3A1.5 1.5 0 0 1 5 1.5z" opacity="0.45"/>
                    <path d="M2 6h7a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 9 13H6.5L4 15v-2H2A1.5 1.5 0 0 1 .5 11.5v-4A1.5 1.5 0 0 1 2 6z"/>
                  </svg>
                  <span className={styles.shortcutHint}>1</span>
                </button>
                {elEnabled && (
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
                )}
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
              {elEnabled && (voiceMode === "elevenlabs" || voiceMode === "chat") && (
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

              {/* Speed rate (EL / Chat) */}
              {voiceMode !== "myvoice" && (
                <div className={styles.settingsRow}>
                  {[0.8, 1.0, 1.2, 1.5].map((rate) => (
                    <button
                      key={rate}
                      className={`${styles.settingsBtn} ${speechRate === rate ? styles.settingsActive : ""}`}
                      onClick={() => setSpeechRate(rate)}
                      disabled={isListening || isProcessing}
                      title={`Velocidad ${rate}x`}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "-0.3px" }}>{rate}x</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Director script textarea */}
              {scriptPanelOpen && (
                <div className={styles.settingsRow}>
                  <textarea
                    className={styles.scriptTextarea}
                    value={scriptPrompt}
                    onChange={(e) => setScriptPrompt(e.target.value)}
                    placeholder={language === "es" ? "Instrucciones de guión para el avatar…" : "Script instructions for the avatar…"}
                    spellCheck={false}
                  />
                </div>
              )}

              {/* Subtitles + proactive + director toggle */}
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
                <button
                  className={`${styles.settingsBtn} ${proactiveEnabled ? styles.settingsActive : ""}`}
                  onClick={() => setProactiveEnabled(v => !v)}
                  title={proactiveEnabled ? "Comentarios proactivos: ON" : "Comentarios proactivos: OFF"}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1a5 5 0 0 1 3.5 8.5L13 14l-3-1.5A5 5 0 1 1 8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    <circle cx="6" cy="8" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="8" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="8" r="0.8" fill="currentColor"/>
                  </svg>
                </button>
                {/* Director: open panel */}
                <button
                  className={`${styles.settingsBtn} ${scriptPanelOpen ? styles.settingsActive : ""}`}
                  onClick={() => setScriptPanelOpen(v => !v)}
                  title="Director mode"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="5" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M1 7l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* Director: enable/disable script */}
                {scriptPanelOpen && (
                  <button
                    className={`${styles.settingsBtn} ${scriptEnabled ? styles.settingsActive : ""}`}
                    onClick={() => setScriptEnabled(v => !v)}
                    title={scriptEnabled ? "Script: ON" : "Script: OFF"}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 3.5L13 8l-7 4.5V3.5z"/>
                    </svg>
                  </button>
                )}
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

        {/* ElevenLabs toggle toast */}
        {elToast && (
          <span className={styles.elToast} data-state={elToast}>
            Modo ahorro {elToast === "on" ? "OFF" : "ON"}
          </span>
        )}

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
    )}
    </>
  );
}

export default LipSyncBar;
