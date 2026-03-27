import { useCallback, useRef, useState } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { transcribeAudio } from "../../utils/whisper";
import { wordsToVisemes } from "../../utils/lipSync/wordsToVisemes";
import { playWithEffect, getAudioContext, VOICE_EFFECTS } from "../../utils/audioEffects";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./LipSyncBar.module.css";

function LipSyncBar({ onSpeak, onSpeakSequence, onStop, isPlaying }) {
  const { language } = useLanguage();
  const audioCtxRef = useRef(null);
  const audioBlobUrlRef = useRef(null);
  const playbackRef = useRef(null);       // { stop() } from playWithEffect
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState("natural");
  const [preciseMode, setPreciseMode] = useState(true);

  const handleReady = useCallback(async (transcript, audioBlob, durationMs) => {
    if (audioBlobUrlRef.current) URL.revokeObjectURL(audioBlobUrlRef.current);
    audioBlobUrlRef.current = URL.createObjectURL(audioBlob);

    const audioCtx = getAudioContext(audioCtxRef);
    const effectId = selectedEffect;
    const playbackRate = VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0;

    if (preciseMode) setIsProcessing(true);

    let sequence = null;
    if (preciseMode) {
      try {
        const { words } = await transcribeAudio(audioBlob, language);
        const rawSequence = wordsToVisemes(words, language);
        sequence = playbackRate === 1.0
          ? rawSequence
          : rawSequence.map((e) => ({
              ...e,
              duration: Math.max(Math.round(e.duration / playbackRate), 16),
            }));
      } catch (err) {
        console.warn("[LipSyncBar] Whisper failed, using text fallback:", err.message);
      }
    }

    try {
      playbackRef.current = await playWithEffect(audioBlob, effectId, audioCtx, () => {
        setIsProcessing(false);
        if (sequence) {
          onSpeakSequence(sequence);
        } else {
          onSpeak(transcript, durationMs);
        }
      });
    } catch (err) {
      console.warn("[LipSyncBar] Audio playback failed:", err);
      setIsProcessing(false);
    }
  }, [language, selectedEffect, onSpeak, onSpeakSequence]);

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

  const displayText = isListening ? interimTranscript : finalTranscript;

  if (!supported) {
    return (
      <div className={styles.wrapper} data-lip-sync>
        <span className={styles.unsupported}>
          Speech recognition not available in this browser
        </span>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} data-lip-sync>
      {/* Effect selector + Precise mode toggle */}
      <div className={styles.effects}>
        {Object.entries(VOICE_EFFECTS).map(([id, { label }]) => (
          <button
            key={id}
            className={`${styles.effectBtn} ${selectedEffect === id ? styles.effectActive : ""}`}
            onClick={() => setSelectedEffect(id)}
            disabled={isListening || isProcessing}
          >
            {label}
          </button>
        ))}
        <button
          className={`${styles.preciseBtn} ${preciseMode ? styles.effectActive : ""}`}
          onClick={() => setPreciseMode((p) => !p)}
          disabled={isListening || isProcessing}
          title={preciseMode ? "Precise mode on (Whisper)" : "Precise mode off (client only)"}
        >
          Precise
        </button>
      </div>

      {/* Main bar */}
      <div className={styles.bar}>
        <button
          className={`${styles.micButton} ${isListening ? styles.listening : ""}`}
          onClick={handleMicClick}
          disabled={isProcessing}
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
            ? "Processing…"
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
