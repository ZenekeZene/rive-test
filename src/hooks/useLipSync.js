import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { textToVisemes } from "../utils/lipSync/textToVisemes.js";
import { VisemeSequencer } from "../utils/lipSync/visemeSequencer.js";

const VISEME_PATH = "propertyOfMouth/viseme";

export function useLipSync(riveRef) {
  const { language } = useLanguage();
  const sequencerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setViseme = (value) => {
      const vmi = riveRef.current?.viewModelInstance;
      if (!vmi) return;
      const prop = vmi.number(VISEME_PATH);
      if (import.meta.env.DEV && prop === null) {
        console.warn(`[useLipSync] Property "${VISEME_PATH}" not found on ViewModel`);
      }
      if (prop) prop.value = value;
    };

    const seq = new VisemeSequencer(setViseme);
    sequencerRef.current = seq;

    return () => seq.stop();
  }, [riveRef]);

  const speak = useCallback((text, audioDurationMs) => {
    const seq = sequencerRef.current;
    if (!seq) return;

    let sequence = textToVisemes(text, language);

    if (audioDurationMs > 0) {
      const totalMs = sequence.reduce((sum, e) => sum + e.duration, 0);
      if (totalMs > 0) {
        // Clamp scale to avoid extreme compression or expansion
        const scale = Math.min(Math.max(audioDurationMs / totalMs, 0.4), 10);
        sequence = sequence.map((e) => ({
          ...e,
          duration: Math.max(Math.round(e.duration * scale), 16),
        }));
      }
    }

    seq.onComplete = () => setIsPlaying(false);
    seq.play(sequence);
    setIsPlaying(true);
  }, [language]);

  const speakSequence = useCallback((sequence, audioCtx, audioStartTime) => {
    const seq = sequencerRef.current;
    if (!seq || !sequence?.length) return;
    seq.onComplete = () => setIsPlaying(false);
    seq.play(sequence, audioCtx, audioStartTime);
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    sequencerRef.current?.stop();
    setIsPlaying(false);
  }, []);

  return { speak, speakSequence, stop, isPlaying };
}
