import { useState, useRef, useCallback, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { transcribeAudio } from "../utils/whisper";

const LANG_MAP = {
  en: "en-US",
  es: "es-ES",
};

// iOS Safari only supports audio/mp4; pick the first supported type
function getSupportedMimeType() {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  if (typeof MediaRecorder === "undefined") return "";
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
}

// SpeechRecognition is unreliable on mobile (iOS drops results, fires network errors)
function isMobileBrowser() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// onReady(transcript, audioBlob, durationMs) — called when both transcript and recording are ready
export function useSpeechRecognition({ onReady } = {}) {
  const { language } = useLanguage();
  const recognitionRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const transcriptRef = useRef("");   // stores final transcript until recorder stops
  const recordingStartRef = useRef(0);
  const micPermissionRef = useRef(false); // true once getUserMedia has been granted
  const onReadyRef = useRef(onReady);
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");

  const supported = typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // Request mic permission without starting a recording.
  // Call this on first touch so iOS shows the dialog before press-and-hold.
  const prewarm = useCallback(async () => {
    if (micPermissionRef.current) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      micPermissionRef.current = true;
      return true;
    } catch {
      return false;
    }
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      // recognition.onend will stop the recorder
    } else if (recorderRef.current?.state !== "inactive") {
      // Mobile / Whisper-only mode: stop recorder directly
      recorderRef.current.stop();
    }
  }, []);

  const start = useCallback(async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const useWhisperOnly = !SR || isMobileBrowser();

    // Abort previous session
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    if (recorderRef.current?.state !== "inactive") recorderRef.current?.stop();
    stopStream();

    // Request mic stream
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      console.warn("[useSpeechRecognition] Microphone access denied");
      return;
    }
    micPermissionRef.current = true;
    streamRef.current = stream;
    chunksRef.current = [];
    transcriptRef.current = "";

    // Set up MediaRecorder with a MIME type compatible with this browser/OS
    const mimeType = getSupportedMimeType();
    let recorder;
    try {
      recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
    } catch {
      try {
        recorder = new MediaRecorder(stream);
      } catch (err) {
        console.warn("[useSpeechRecognition] MediaRecorder not supported:", err.message);
        stopStream();
        return;
      }
    }

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const durationMs = Date.now() - recordingStartRef.current;
      const effectiveMime = recorder.mimeType || mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type: effectiveMime });
      console.log("[recorder.onstop] transcript:", JSON.stringify(transcriptRef.current), "| duration:", durationMs, "ms | mime:", effectiveMime);
      stopStream();
      setIsListening(false);
      setInterimTranscript("");

      if (transcriptRef.current) {
        onReadyRef.current?.(transcriptRef.current, blob, durationMs);
      } else if (durationMs > 400) {
        // No SR transcript — fall back to Whisper transcription
        console.log("[recorder.onstop] No SR transcript, using Whisper fallback...");
        try {
          const { text } = await transcribeAudio(blob, language);
          const trimmed = text?.trim();
          if (trimmed) {
            onReadyRef.current?.(trimmed, blob, durationMs);
          } else {
            console.warn("[recorder.onstop] Whisper returned empty transcript");
          }
        } catch (err) {
          console.warn("[recorder.onstop] Whisper fallback failed:", err.message);
        }
      } else {
        console.warn("[recorder.onstop] grabación demasiado corta — onReady NO llamado");
      }
    };

    recorderRef.current = recorder;

    if (useWhisperOnly) {
      // Mobile / no SR: record audio, transcribe with Whisper on stop
      console.log("[useSpeechRecognition] Whisper-only mode (mobile or no SR support)");
      recordingStartRef.current = Date.now();
      recorder.start();
      setIsListening(true);
      setInterimTranscript("");
      setFinalTranscript("");
      return;
    }

    // Desktop: SpeechRecognition for real-time feedback + MediaRecorder for blob
    const recognition = new SR();
    recognition.lang = LANG_MAP[language] ?? "en-US";
    console.log("[recognition] lang:", recognition.lang);
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript("");
      recordingStartRef.current = Date.now();
      recorder.start();
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += t;
        else interim += t;
      }
      console.log("[recognition.onresult] interim:", JSON.stringify(interim), "| final:", JSON.stringify(final));
      if (interim) setInterimTranscript(interim);
      if (final) {
        transcriptRef.current = final;
        setFinalTranscript(final);
        setInterimTranscript("");
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted") {
        console.warn("[useSpeechRecognition] SR error:", event.error);
      }
      setInterimTranscript("");
      // Keep recorder running — Whisper fallback will handle transcription in onstop
      if (recorder.state !== "inactive") recorder.stop();
    };

    recognition.onend = () => {
      console.log("[recognition.onend] transcript:", JSON.stringify(transcriptRef.current));
      setInterimTranscript("");
      if (recorder.state !== "inactive") recorder.stop();
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      console.warn("[useSpeechRecognition] SR.start() failed:", err.message);
      // Fall back: just record and let Whisper handle it
      recordingStartRef.current = Date.now();
      recorder.start();
      setIsListening(true);
    }
  }, [language, stopStream]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (recorderRef.current?.state !== "inactive") recorderRef.current?.stop();
      stopStream();
    };
  }, [stopStream]);

  return { supported, isListening, interimTranscript, finalTranscript, start, stop, prewarm, micPermissionRef, streamRef };
}
