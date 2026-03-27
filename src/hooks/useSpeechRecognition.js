import { useState, useRef, useCallback, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const LANG_MAP = {
  en: "en-US",
  es: "es-ES",
};

// onReady(transcript, audioBlob) — called when both transcript and recording are ready
export function useSpeechRecognition({ onReady } = {}) {
  const { language } = useLanguage();
  const recognitionRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const transcriptRef = useRef("");   // stores final transcript until recorder stops
  const recordingStartRef = useRef(0);
  const onReadyRef = useRef(onReady);
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");

  const supported = typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    // MediaRecorder will be stopped in recognition.onend to keep ordering
  }, []);

  const start = useCallback(async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    // Abort previous session
    recognitionRef.current?.abort();
    recorderRef.current?.state !== "inactive" && recorderRef.current?.stop();
    stopStream();

    // Request mic stream for recording
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      console.warn("[useSpeechRecognition] Microphone access denied");
      return;
    }
    streamRef.current = stream;
    chunksRef.current = [];
    transcriptRef.current = "";

    // Set up MediaRecorder
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const durationMs = Date.now() - recordingStartRef.current;
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
      stopStream();
      if (transcriptRef.current) {
        onReadyRef.current?.(transcriptRef.current, blob, durationMs);
      }
    };
    recorderRef.current = recorder;

    // Set up SpeechRecognition
    const recognition = new SR();
    recognition.lang = LANG_MAP[language] ?? "en-US";
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
      if (interim) setInterimTranscript(interim);
      if (final) {
        transcriptRef.current = final;
        setFinalTranscript(final);
        setInterimTranscript("");
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted") {
        console.warn("[useSpeechRecognition] error:", event.error);
      }
      setIsListening(false);
      setInterimTranscript("");
      if (recorder.state !== "inactive") recorder.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
      // Stop recorder — onstop will fire and deliver the blob
      if (recorder.state !== "inactive") recorder.stop();
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [language, stopStream]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recorderRef.current?.state !== "inactive" && recorderRef.current?.stop();
      stopStream();
    };
  }, [stopStream]);

  return { supported, isListening, interimTranscript, finalTranscript, start, stop };
}
