/**
 * Converts ElevenLabs character-level alignment to a viseme sequence.
 * ElevenLabs returns timing per individual character — no phoneme grouping needed.
 */

// Direct character → viseme mapping (EN + ES combined)
const CHAR_VISEME = {
  // Vowels
  a: 8, e: 5, i: 5, o: 6, u: 7,
  á: 8, é: 5, í: 5, ó: 6, ú: 7, ü: 7,
  // Labials (lips closed)
  b: 0, m: 0, p: 0,
  // Lateral
  l: 1,
  // Labiodentals
  f: 10,
  // v: /b/ in Spanish, /v/ (labiodental) in English — use 10 as compromise
  v: 10,
  // Dental / alveolar / velar
  c: 3, d: 3, g: 3, k: 3, n: 3, s: 3, t: 3, r: 3, x: 3,
  y: 3, z: 3, h: 3, j: 3, q: 3, ñ: 3,
  // Rounded
  w: 7,
};

const SENTENCE_PUNCT = new Set([".", "!", "?", "…"]);
const MID_PUNCT = new Set([",", ";", ":", "—", "–"]);

export function alignmentToVisemes(alignment) {
  const { characters, character_start_times_seconds, character_end_times_seconds } = alignment;
  const sequence = [];
  let cursorMs = 0; // tracks where the sequencer is in absolute time

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const startMs = Math.round(character_start_times_seconds[i] * 1000);
    const endMs = Math.round(character_end_times_seconds[i] * 1000);
    const duration = Math.max(endMs - startMs, 16);

    // Fill any gap between the last item and this character's start
    const gap = startMs - cursorMs;
    if (gap > 16) {
      sequence.push({ type: "pause", duration: gap });
    }
    cursorMs = endMs;

    if (char === " " || char === "\n") {
      // The gap before this space is already pushed above.
      // Also account for the space's own duration so cumulative time stays accurate.
      if (duration > 16) sequence.push({ type: "pause", duration });
      continue;
    }

    if (SENTENCE_PUNCT.has(char) || MID_PUNCT.has(char)) {
      // Silence for the punctuation character itself — the gap before it is
      // already pushed above, but we must also include its own duration so the
      // cumulative sequence total matches the audio duration.
      if (duration > 16) sequence.push({ type: "pause", duration });
      continue;
    }

    const viseme = CHAR_VISEME[char.toLowerCase()];
    if (viseme !== undefined) {
      sequence.push({ type: "viseme", value: viseme, duration });
    }
  }

  // Close mouth at end
  sequence.push({ type: "viseme", value: 0, duration: 80 });
  return sequence;
}
