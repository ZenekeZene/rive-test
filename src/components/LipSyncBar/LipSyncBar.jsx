import { useCallback, useRef } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import styles from "./LipSyncBar.module.css";

function LipSyncBar({ onSpeak, onStop, isPlaying }) {
  const audioBlobUrlRef = useRef(null);
  const audioRef = useRef(null);

  const handleReady = useCallback((transcript, audioBlob, durationMs) => {
    // Revoke previous blob URL to free memory
    if (audioBlobUrlRef.current) {
      URL.revokeObjectURL(audioBlobUrlRef.current);
    }
    const url = URL.createObjectURL(audioBlob);
    audioBlobUrlRef.current = url;

    // Create audio element and start playback
    const audio = new Audio(url);
    audioRef.current = audio;

    // Start lip sync exactly when audio actually begins playing (after buffering)
    // Pass durationMs so the sequencer can scale viseme timing to match real speech
    audio.onplaying = () => onSpeak(transcript, durationMs);
    audio.play().catch((err) => console.warn("[LipSyncBar] Audio playback failed:", err));
  }, [onSpeak]);

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
      audioRef.current?.pause();
      start();
    }
  }, [isListening, isPlaying, start, stopListening, onStop]);

  const handleStop = useCallback(() => {
    audioRef.current?.pause();
    onStop();
  }, [onStop]);

  const displayText = isListening ? interimTranscript : finalTranscript;

  if (!supported) {
    return (
      <div className={styles.bar} data-lip-sync>
        <span className={styles.unsupported}>
          Speech recognition not available in this browser
        </span>
      </div>
    );
  }

  return (
    <div className={styles.bar} data-lip-sync>
      <button
        className={`${styles.micButton} ${isListening ? styles.listening : ""}`}
        onClick={handleMicClick}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        <svg className={styles.micIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
          <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {isListening && <span className={styles.pulse} />}
      </button>

      <span className={`${styles.transcript} ${!displayText ? styles.placeholder : ""} ${isListening ? styles.interim : ""}`}>
        {displayText || (isListening ? "Listening…" : "Press mic and speak")}
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
  );
}

export default LipSyncBar;
