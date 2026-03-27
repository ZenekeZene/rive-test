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

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const startMs = Math.round(character_start_times_seconds[i] * 1000);
    const endMs = Math.round(character_end_times_seconds[i] * 1000);
    const duration = Math.max(endMs - startMs, 16);

    if (char === " " || char === "\n") {
      if (duration > 20) sequence.push({ type: "pause", duration });
      continue;
    }

    if (SENTENCE_PUNCT.has(char)) {
      sequence.push({ type: "pause", duration: Math.max(duration, 300) });
      continue;
    }

    if (MID_PUNCT.has(char)) {
      sequence.push({ type: "pause", duration: Math.max(duration, 150) });
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
