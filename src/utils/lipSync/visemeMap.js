// ARPAbet phoneme → viseme index (0-10)
// Based on user's mapping:
// 0: B,M,P  1: L  2: CH,SH,J  3: C,D,G,K,N,S,T,X,Y,Z  4: O  5: A,E,I
// 6: close O  7: U  8: A (wide)  9: T (teeth)  10: V
export const ARPABET_TO_VISEME = {
  // 0 — lips closed
  B: 0, M: 0, P: 0,
  // 1 — tongue tip/alveolar lateral
  L: 1,
  // 2 — palatal/sibilant
  SH: 2, ZH: 2, CH: 2, JH: 2,
  // 3 — dental/alveolar/velar
  D: 3, G: 3, K: 3, N: 3, S: 3, T: 3, NG: 3, R: 3, HH: 3, Y: 3, Z: 3,
  // 4 — O open rounded (AO = caught, OW = go)
  AO: 4, OW: 4,
  // 5 — A,E,I open vowels
  AE: 5, EH: 5, IH: 5, IY: 5, EY: 5, AY: 5,
  // 6 — close O (not common in English ARPAbet; used for Spanish /o/)
  // (mapped via Spanish rules directly)
  // 7 — U rounded
  UW: 7, UH: 7, W: 7, OY: 7,
  // 8 — A wide open
  AA: 8, AH: 8, AW: 8,
  // 9 — teeth visible (TH sounds)
  TH: 9, DH: 9,
  // 10 — lower lip/teeth (labiodental)
  F: 10, V: 10,
};

// Spanish phoneme symbols → viseme index
export const SPANISH_TO_VISEME = {
  a: 8,   // wide open
  e: 5,   // mid open
  i: 5,   // front closed
  o: 6,   // close O (Spanish o is more closed than English)
  u: 7,   // rounded
  b: 0, p: 0, m: 0,
  l: 1, ll: 1,
  ch: 2,
  d: 3, g: 3, k: 3, n: 3, s: 3, t: 3, r: 3, rr: 3, x: 3, y: 3, z: 3,
  ny: 3,  // ñ
  f: 10, v: 0,  // Spanish v/b are the same /b/ sound
  h: null, // silent
  w: 7,
  c: 3,   // before a/o/u
  j: 3,   // Spanish j = /x/ (guttural)
  q: 3,   // qu = /k/
};

export const VOWEL_VISEMES = new Set([4, 5, 6, 7, 8]);
