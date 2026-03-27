import { englishWordToVisemes, spanishWordToVisemes } from "./phonemeMap.js";
import { VOWEL_VISEMES } from "./visemeMap.js";

const VISEME_DURATION = 50;        // ms per consonant viseme
const VOWEL_DURATION = 70;         // ms per vowel viseme (slightly longer)
const WORD_PAUSE = 20;              // ms gap between words
const COMMA_PAUSE = 250;            // ms for comma / semicolon
const SENTENCE_PAUSE = 450;         // ms for period / ? / !

// Returns an array of { type: 'viseme', value, duration } | { type: 'pause', duration }
export function textToVisemes(text, language = "en") {
  const sequence = [];
  if (!text || !text.trim()) return sequence;

  const wordToVisemes = language === "es" ? spanishWordToVisemes : englishWordToVisemes;

  // Split into tokens: words and punctuation marks
  // Regex captures: words (letters+apostrophes), sentence-ending marks, mid-sentence pauses
  const tokens = tokenize(text);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "word") {
      const visemes = wordToVisemes(token.value);
      for (const v of visemes) {
        const duration = VOWEL_VISEMES.has(v) ? VOWEL_DURATION : VISEME_DURATION;
        sequence.push({ type: "viseme", value: v, duration });
      }
      // Word gap (unless next token is punctuation)
      const next = tokens[i + 1];
      if (next && next.type === "word") {
        sequence.push({ type: "pause", duration: WORD_PAUSE });
      }
    } else if (token.type === "sentence_end") {
      sequence.push({ type: "pause", duration: SENTENCE_PAUSE });
    } else if (token.type === "mid_pause") {
      sequence.push({ type: "pause", duration: COMMA_PAUSE });
    }
  }

  // Close mouth at the end
  sequence.push({ type: "viseme", value: 0, duration: 80 });

  return sequence;
}

function tokenize(text) {
  const tokens = [];
  // Match: words (with optional apostrophes), sentence-end punctuation, mid-sentence pauses
  const re = /([a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+(?:'[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)*)|([.!?…]+)|([,;:—–])/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match[1]) {
      tokens.push({ type: "word", value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: "sentence_end" });
    } else if (match[3]) {
      tokens.push({ type: "mid_pause" });
    }
  }
  return tokens;
}
