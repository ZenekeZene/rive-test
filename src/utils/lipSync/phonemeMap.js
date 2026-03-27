import { toARPABET } from "phonemize";
import { ARPABET_TO_VISEME, SPANISH_TO_VISEME } from "./visemeMap.js";

// English: convert a single word to array of viseme indices using phonemize
export function englishWordToVisemes(word) {
  try {
    const result = toARPABET(word, { stripStress: true, returnArray: true });
    const visemes = [];
    for (const phoneme of result) {
      // Skip non-phoneme tokens (punctuation, numbers that phonemize may pass through)
      if (!/^[A-Z]+$/.test(phoneme)) continue;
      const v = ARPABET_TO_VISEME[phoneme];
      if (v !== undefined) visemes.push(v);
    }
    return visemes;
  } catch {
    return fallbackWordToVisemes(word);
  }
}

// Simple fallback for unknown words: process letter by letter
function fallbackWordToVisemes(word) {
  const visemes = [];
  const w = word.toLowerCase();
  let i = 0;
  while (i < w.length) {
    const two = w.slice(i, i + 2);
    if (two === "th") { visemes.push(9); i += 2; continue; }
    if (two === "sh" || two === "ch") { visemes.push(2); i += 2; continue; }
    if (two === "wh") { visemes.push(7); i += 2; continue; }
    if (two === "ph") { visemes.push(10); i += 2; continue; }
    const c = w[i];
    const v = LETTER_FALLBACK[c];
    if (v !== undefined && v !== null) visemes.push(v);
    i++;
  }
  return visemes;
}

const LETTER_FALLBACK = {
  a: 8, e: 5, i: 5, o: 4, u: 7,
  b: 0, c: 3, d: 3, f: 10, g: 3, h: 3, j: 2, k: 3,
  l: 1, m: 0, n: 3, p: 0, q: 3, r: 3, s: 3, t: 3,
  v: 10, w: 7, x: 3, y: 3, z: 3,
};

// Spanish: rule-based G2P — Spanish is almost perfectly phonetic
export function spanishWordToVisemes(word) {
  const visemes = [];
  const w = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // strip accents (preserve sound)
  let i = 0;
  while (i < w.length) {
    const two = w.slice(i, i + 2);
    const three = w.slice(i, i + 3);

    // Digraphs and special sequences
    if (two === "ch") { visemes.push(SPANISH_TO_VISEME.ch); i += 2; continue; }
    if (two === "ll") { visemes.push(SPANISH_TO_VISEME.ll); i += 2; continue; }
    if (two === "rr") { visemes.push(SPANISH_TO_VISEME.rr); i += 2; continue; }
    if (two === "ny" || w[i] === "ñ") { visemes.push(SPANISH_TO_VISEME.ny); i += (w[i] === "ñ" ? 1 : 2); continue; }

    // qu → /k/ (u is silent)
    if (two === "qu") { visemes.push(SPANISH_TO_VISEME.k); i += 2; continue; }
    // gu before e/i → /g/ (u is silent)
    if (two === "gu" && (w[i + 2] === "e" || w[i + 2] === "i")) { visemes.push(SPANISH_TO_VISEME.g); i += 2; continue; }
    // gü → /gw/
    if (two === "gü") { visemes.push(SPANISH_TO_VISEME.g); visemes.push(SPANISH_TO_VISEME.u); i += 2; continue; }

    const c = w[i];

    // c before e/i → /s/ (or /θ/ in Spain, both → viseme 3)
    if (c === "c" && (w[i + 1] === "e" || w[i + 1] === "i")) { visemes.push(3); i++; continue; }
    // g before e/i → /x/ (like Spanish j)
    if (c === "g" && (w[i + 1] === "e" || w[i + 1] === "i")) { visemes.push(3); i++; continue; }
    // h is silent
    if (c === "h") { i++; continue; }
    // x between vowels → /ks/, at start → /s/ — both → viseme 3
    if (c === "x") { visemes.push(3); i++; continue; }
    // v → /b/ in Spanish
    if (c === "v") { visemes.push(SPANISH_TO_VISEME.b); i++; continue; }
    // w → /b/ or /w/ (foreign words) → viseme 7 for /w/
    if (c === "w") { visemes.push(7); i++; continue; }

    const v = SPANISH_TO_VISEME[c];
    if (v !== undefined && v !== null) visemes.push(v);
    i++;
  }
  return visemes;
}
