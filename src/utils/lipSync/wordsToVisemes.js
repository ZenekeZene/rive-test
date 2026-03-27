import { englishWordToVisemes, spanishWordToVisemes } from "./phonemeMap.js";
import { VOWEL_VISEMES } from "./visemeMap.js";

/**
 * Converts Whisper word timestamps to a viseme sequence.
 *
 * @param {Array<{word: string, start: number, end: number}>} words - seconds
 * @param {string} language - "en" | "es"
 * @returns {Array<{type: "viseme"|"pause", value?: number, duration: number}>}
 */
export function wordsToVisemes(words, language = "en") {
  if (!words?.length) return [];

  const sequence = [];
  const wordFn = language === "es" ? spanishWordToVisemes : englishWordToVisemes;

  // Leading silence before the first word
  if (words[0].start > 0.05) {
    sequence.push({ type: "pause", duration: Math.round(words[0].start * 1000) });
  }

  for (let i = 0; i < words.length; i++) {
    const { word, start, end } = words[i];
    const wordDurationMs = Math.round((end - start) * 1000);
    const visemes = wordFn(word.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ']/g, ""));

    if (visemes.length > 0 && wordDurationMs > 0) {
      // Vowels get 1.4× weight so they absorb more of the word's duration
      const weights = visemes.map((v) => (VOWEL_VISEMES.has(v) ? 1.4 : 1.0));
      const totalWeight = weights.reduce((a, b) => a + b, 0);

      for (let j = 0; j < visemes.length; j++) {
        const duration = Math.max(
          Math.round((weights[j] / totalWeight) * wordDurationMs),
          16
        );
        sequence.push({ type: "viseme", value: visemes[j], duration });
      }
    }

    // Silence gap between this word and the next
    if (i < words.length - 1) {
      const gapMs = Math.round((words[i + 1].start - end) * 1000);
      if (gapMs > 20) {
        sequence.push({ type: "pause", duration: gapMs });
      }
    }
  }

  // Close mouth at the end
  sequence.push({ type: "viseme", value: 0, duration: 80 });

  return sequence;
}
