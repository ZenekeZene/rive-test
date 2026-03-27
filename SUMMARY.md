# Lip Sync System — Technical Summary

## Overview

A real-time lip sync system built on top of a Rive character animation. The character exposes a numeric ViewModel property (`propertyOfMouth/viseme`, values 0–10) that controls mouth shape. The system listens to the user's microphone, transcribes speech to text, maps it to a viseme sequence, and drives that property in sync with audio playback — making the character repeat everything the user says.

---

## Architecture

```
Microphone
  ├──► MediaRecorder          → captures raw audio (WebM/Opus blob)
  └──► Web Speech API         → transcribes speech to text (interim + final)

On silence detected
  └──► onReady(transcript, audioBlob)
             │
             ├──► new Audio(blobUrl).play()
             │         └── audio.onplaying ──────────────────────┐
             │                                                    ▼
             └──► textToVisemes(transcript, lang)        VisemeSequencer.play(sequence)
                        │                                        │
                        ▼                                        ▼
              [{ type, value, duration }, ...]     vmInstance.number("propertyOfMouth/viseme").value = N
```

Audio and lip sync are started together using `audio.onplaying` — which fires when the browser actually begins outputting sound (after buffering), not when `.play()` is called. This ensures the mouth animation is never ahead of the audio.

---

## File Map

```
src/
├── hooks/
│   ├── useSpeechRecognition.js   # Mic recording + speech-to-text
│   └── useLipSync.js             # Connects sequencer to Rive ViewModel
│
├── utils/lipSync/
│   ├── visemeMap.js              # Phoneme → viseme (0–10) lookup tables
│   ├── phonemeMap.js             # G2P: English (phonemize) + Spanish (rule-based)
│   ├── textToVisemes.js          # Full pipeline: text → [{type, value, duration}]
│   └── visemeSequencer.js        # rAF-based playback engine
│
└── components/LipSyncBar/
    ├── LipSyncBar.jsx            # UI: mic button + transcript display
    └── LipSyncBar.module.css     # Styles (pulse animation, transcript, stop button)
```

---

## Module Breakdown

### `useSpeechRecognition.js`

Manages the microphone session. On `start()`:

1. Calls `getUserMedia({ audio: true })` to get the mic stream.
2. Starts `MediaRecorder` on that stream (collects audio chunks).
3. Starts `SpeechRecognition` (browser-native, no API key needed).

`SpeechRecognition` fires `onresult` with interim results (shown in the UI in real time) and a final transcript (stored in a ref). When recognition ends (`onend`), `MediaRecorder` is stopped. Its `onstop` handler assembles the blob and fires:

```js
onReady(transcript, blob)
```

**Language:** driven by the app's existing `useLanguage` context — `en` → `en-US`, `es` → `es-ES`.

---

### `textToVisemes.js`

Converts a text string into a flat sequence of timed events:

```js
[
  { type: "viseme", value: 3, duration: 50 },  // consonant
  { type: "viseme", value: 8, duration: 70 },  // vowel
  { type: "pause",  duration: 250 },           // comma
  ...
]
```

**Tokenization** splits input into three token types using a single regex pass:
- `word` — letters + apostrophes (Spanish accented chars included)
- `sentence_end` — `.` `!` `?` `…`
- `mid_pause` — `,` `;` `:` `—` `–`

**Timing constants:**

| Event | Duration |
|---|---|
| Consonant viseme | 50 ms |
| Vowel viseme | 70 ms |
| Between words | 30 ms |
| Comma / semicolon | 250 ms |
| Period / ! / ? | 450 ms |
| Final mouth-close | 80 ms |

---

### `phonemeMap.js` — Grapheme-to-Phoneme (G2P)

#### English
Uses the [`phonemize`](https://github.com/hans00/phonemize) npm package (pure JS, 125K-word dictionary, no WASM). Called per word:

```js
toARPABET(word, { stripStress: true, returnArray: true })
// "hello" → ["HH", "AH", "L", "OW"]
```

Falls back to a letter-by-letter rule set for unknown words (handles common digraphs: `th`, `sh`, `ch`, `wh`, `ph`).

#### Spanish
Custom rule-based converter — Spanish is nearly phonetically regular. Processes character by character with digraph priority:

| Input | Phoneme | Viseme |
|---|---|---|
| `ch` | /tʃ/ | 2 |
| `ll` | /ʎ/ | 1 |
| `qu` | /k/ | 3 |
| `c` + e/i | /s/ | 3 |
| `g` + e/i | /x/ | 3 |
| `h` | silent | — |
| `v` | /b/ | 0 |
| `ñ` | /ɲ/ | 3 |

Accents are stripped via Unicode NFD normalization before processing (they affect stress, not mouth shape).

---

### `visemeMap.js` — Phoneme → Viseme Lookup

Two lookup tables — one for ARPAbet (English), one for Spanish phoneme symbols.

**Viseme scale (0–10):**

| Index | Mouth shape | Phonemes |
|---|---|---|
| 0 | Lips closed | B, M, P |
| 1 | Tongue tip | L |
| 2 | Palatal / sibilant | CH, SH, J |
| 3 | Dental / alveolar / velar | C, D, G, K, N, S, T, X, Y, Z |
| 4 | Open rounded O | O (English open) |
| 5 | Open A, E, I | AE, EH, IH, IY… |
| 6 | Close O | O (Spanish) |
| 7 | Rounded U | UW, W |
| 8 | Wide open A | AA, AH |
| 9 | Teeth visible | TH, DH |
| 10 | Lower lip / teeth | F, V |

`VOWEL_VISEMES = Set([4, 5, 6, 7, 8])` — used by `textToVisemes` to assign longer duration to vowels.

---

### `visemeSequencer.js`

Pure JS class (no React dependency). Drives the Rive property over time using `requestAnimationFrame`.

```js
const seq = new VisemeSequencer((value) => {
  vmInstance.number("propertyOfMouth/viseme").value = value;
});

seq.play(sequence);  // start
seq.stop();          // cancel + close mouth (value = 0)
seq.onComplete = () => { ... };
```

**Timing logic per frame:**
- Accumulates `delta = min(timestamp - lastTimestamp, 100ms)` — the 100ms cap prevents the sequencer from jumping ahead if the browser tab was hidden.
- Advances through the sequence by subtracting each entry's duration until the accumulator is exhausted.
- Pauses emit `value = 0` (mouth closed); viseme entries emit their value.

---

### `useLipSync.js`

React hook that owns the sequencer instance and exposes a simple interface:

```js
const { speak, stop, isPlaying } = useLipSync(riveRef);
```

- Creates `VisemeSequencer` with a callback that resolves `propertyOfMouth/viseme` via the Rive SDK path API.
- `speak(text)` calls `textToVisemes(text, language)` then `sequencer.play(sequence)`.
- Cleanup on unmount calls `sequencer.stop()`.
- In dev mode, logs a warning if the ViewModel path resolves to `null`.

**Rive SDK path access:**
```js
// Slash-separated path traverses nested ViewModels
vmInstance.number("propertyOfMouth/viseme").value = N;
```

---

### `LipSyncBar.jsx`

The UI component, rendered as an absolutely-positioned bar at the bottom of the left panel (the Rive portrait panel). Uses `data-lip-sync` attribute to bypass the CSS rule that hides non-first children of `.leftPanel` on desktop.

**States:**
- **Idle** — mic icon, placeholder text "Press mic and speak"
- **Listening** — mic icon inverted + CSS pulse ring animation, interim transcript shown in italics
- **Playback** — transcript displayed, stop button (⏸) visible

**Sync point:**
```js
audio.onplaying = () => onSpeak(transcript);
audio.play();
```
`onplaying` fires at the exact moment the browser starts outputting audio — after any decode/buffer latency — so the lip sync animation begins in lockstep with the sound.

**Memory management:** previous blob URLs are revoked with `URL.revokeObjectURL` before each new recording.

---

## Key Design Decisions

| Decision | Alternative considered | Rationale |
|---|---|---|
| Web Speech API (native) | Whisper / OpenAI API | No cost, no backend, works offline, native EN+ES support |
| `audio.onplaying` for sync | Fixed `setTimeout` delay | Buffer latency is variable; `onplaying` is exact |
| Custom G2P rules for Spanish | `ephone` (eSpeak WASM) | Spanish is phonetically regular; avoids WASM overhead and GPL license |
| `requestAnimationFrame` sequencer | `setInterval` | Pauses automatically when tab is hidden; timestamp-based = no drift |
| `phonemize` npm (pure JS) | `ephone`, `hama-js` (ONNX) | Pure JS, no native deps, 125K dictionary, MIT license |
| Rive path API (`"a/b"`) | Two-step `viewModel("a").number("b")` | Supported natively by the SDK; cleaner call site |

---

## Browser Compatibility

| Feature | Chrome | Edge | Safari | Firefox |
|---|---|---|---|---|
| Web Speech API | ✅ | ✅ | ✅ 14.1+ | ❌ |
| MediaRecorder | ✅ | ✅ | ✅ 14.1+ | ✅ |
| `getUserMedia` | ✅ | ✅ | ✅ | ✅ |

Requires **HTTPS** in production (both Speech API and `getUserMedia`). Works on `localhost` without HTTPS.

If `SpeechRecognition` is unavailable, `LipSyncBar` renders a static unsupported message instead of crashing.
