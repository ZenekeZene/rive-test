# Voice System Architecture

Technical documentation for the three voice modes of the Rive portfolio avatar.

---

## 1. Overview & Stack

The portfolio avatar supports real-time speech interaction through three voice modes. In all three, the browser captures audio via `MediaRecorder` + `SpeechRecognition`, then routes the result through an API pipeline that eventually produces a timed sequence of viseme indices (mouth shapes 0–10). A `VisemeSequencer` running on `requestAnimationFrame` writes these values to the Rive ViewModel property `propertyOfMouth/viseme` in sync with audio playback.

| Layer | Technology |
|-------|-----------|
| Speech capture (desktop) | Web Speech API (browser, Google servers) + `MediaRecorder` |
| Speech capture (mobile) | `MediaRecorder` only → Whisper transcription (SpeechRecognition unreliable on iOS) |
| Precise transcription | OpenAI Whisper (`whisper-1`, `verbose_json` with word timestamps) |
| TTS synthesis | ElevenLabs (`eleven_multilingual_v2`, `/with-timestamps` endpoint) |
| Conversational AI | OpenAI Chat (`gpt-4o-mini` with function calling) |
| Audio effects | Web Audio API (BufferSource, BiquadFilter, GainNode, DelayNode, OscillatorNode) |
| Avatar rendering | Rive WebGL2 (`@rive-app/react-webgl2`) |

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          LipSyncBar                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              useSpeechRecognition                        │   │
│  │   Desktop: SpeechRecognition API + MediaRecorder         │   │
│  │   Mobile:  MediaRecorder only → Whisper fallback         │   │
│  │   → transcript (string)  +  blob (audio)                 │   │
│  └───────────────────────────┬──────────────────────────────┘   │
│                              │ onReady(transcript, blob, ms)    │
│           ┌──────────────────┼──────────────────┐               │
│           │                  │                  │               │
│      [myvoice]         [elevenlabs]           [chat]            │
│           │                  │                  │               │
│      own blob          ElevenLabs TTS      OpenAI Chat          │
│    ± Whisper            → blob+alignment   → {text, actions}    │
│           │                  │              ↓         ↓         │
│           │                  │         ElevenLabs  CustomEvent  │
│           │                  │         → blob+alignment         │
│           └──────────────────┴──────────────────┘               │
│                              │                                  │
│                    playWithEffect(blob)                          │
│                         Web Audio API                           │
│                              │ onStart                          │
│                    onSpeakSequence(visemes, audioCtx?)           │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                         useLipSync
                               │
                       VisemeSequencer (rAF)
                               │
              Rive ViewModel "propertyOfMouth/viseme" (0–10)
```

---

## 2. The Three Voice Modes

### Mode 1 — My Voice

The user's own recorded voice is played back through an audio effect. Lip sync is generated either from text (fast, imprecise) or from Whisper word timestamps (slower, accurate).

```
[Mic press]
     │
     ▼
SpeechRecognition (Web Speech API, en-US or es-ES)
     │  interim results shown in UI while recording
     ▼
onReady(transcript, audioBlob, durationMs)
     │
     ├─[preciseMode ON]──► Whisper API
     │                        input:  audioBlob + language
     │                        output: { text, words: [{word, start, end}] }
     │                        ▼
     │                     wordsToVisemes(words, language)
     │                        output: VisemeSequence (word-aligned timing)
     │                        ▼
     │                     playWithEffect(audioBlob, effectId, audioCtx)
     │                        ▼ onStart
     │                     onSpeakSequence(sequence)   ← delta timing
     │
     └─[preciseMode OFF]─► playWithEffect(audioBlob, effectId, audioCtx)
                              ▼ onStart
                           onSpeak(transcript, durationMs)
                              ▼
                           textToVisemes(text, language)
                              output: VisemeSequence (fixed durations, scaled)

Available effects: natural | chipmunk | deep | robot | echo
```

**Key detail:** In chipmunk (1.7×) or deep (0.6×) effects, `wordsToVisemes` divides all viseme durations by the playbackRate so lip sync stays aligned with the pitch-shifted audio.

---

### Mode 2 — ElevenLabs

The user speaks; an AI voice (ElevenLabs) repeats the same words. Character-level timing from ElevenLabs drives drift-free lip sync via AudioContext.

```
[Mic press]
     │
     ▼
SpeechRecognition
     │
     ▼
onReady(transcript, _, _)   ← audio blob discarded
     │
     ▼
ElevenLabs synthesize(transcript, voiceId, language)
     input:  text, voice ID, language ("es" → "es", others → "en")
     model:  eleven_multilingual_v2
     endpoint: /text-to-speech/{voiceId}/with-timestamps
     output: {
       blob: audio/mpeg Blob,
       alignment: {
         characters: string[],
         character_start_times_seconds: number[],
         character_end_times_seconds: number[]
       }
     }
     │
     ▼
alignmentToVisemes(alignment)
     output: VisemeSequence (character-level timing, ms precision)
     │
     ▼
playWithEffect(blob, effectId, audioCtx)
     │ onStart
     ▼
onSpeakSequence(sequence, audioCtx)   ← AudioContext timing (drift-free)

Available effects: natural | robot | echo
```

---

### Mode 3 — Chat

Full conversational AI. The user asks something; `gpt-4o-mini` responds in character as Hector and optionally triggers portfolio actions (scroll, open modals, change outfit, etc.) while speaking.

```
[Mic press]
     │
     ▼
SpeechRecognition
     │
     ▼
onReady(transcript, _, _)
     │
     ▼
conversationHistoryRef ← append { role: "user", content: transcript }
     │
     ▼
OpenAI Chat sendMessage(history)
     model:  gpt-4o-mini
     tools:  8 portfolio action tools (see section 5)
     output: {
       text: string,       ← spoken response (may be empty if only actions)
       actions: [{ name, args }]
     }
     │
     ├──► dispatch CustomEvent("portfolio-action", { actions })
     │         ↓ App.jsx handles — see section 5
     │
     ▼
ElevenLabs synthesize(text, voiceId, language)
     │
     ▼
alignmentToVisemes(alignment)
     │
     ▼
playWithEffect(blob, effectId, audioCtx)
     │ onStart
     ▼
onSpeakSequence(sequence, audioCtx)   ← AudioContext timing

Available effects: natural | robot | echo

Conversation history: persisted in conversationHistoryRef (not reset between turns).
Fallback text when model returns no content: random short phrase ("Toma.", "Hecho.", etc.)
```

---

## 3. Lip Sync System

### 3.1 The 11 Visemes

The Rive avatar's mouth is driven by a single integer property (`propertyOfMouth/viseme`, 0–10). Each value corresponds to a mouth shape:

| Index | Shape | Phonemes (ARPAbet) | Example |
|-------|-------|-------------------|---------|
| 0 | Lips closed | B, M, P | "bump" |
| 1 | Tongue tip / lateral | L | "love" |
| 2 | Palatal / sibilant | SH, ZH, CH, JH | "ship", "measure" |
| 3 | Dental / alveolar / velar | D, G, K, N, S, T, R, HH, Y, Z | "dog", "cat" |
| 4 | Open rounded O | AO, OW | "caught", "go" |
| 5 | Open A / E / I | AE, EH, IH, IY, EY, AY | "bat", "bed" |
| 6 | Close O (Spanish) | (Spanish /o/) | "solo" |
| 7 | Rounded U | UW, UH, W, OY | "food", "book" |
| 8 | Wide open A | AA, AH, AW | "father", "cut" |
| 9 | Teeth visible (TH) | TH, DH | "think", "this" |
| 10 | Labiodental | F, V | "five" |

All sequences end with viseme 0 (mouth closed, 80 ms) to avoid the avatar freezing mid-word.

---

### 3.2 The Three Viseme Generation Pipelines

#### Pipeline A — `textToVisemes` (offline, fixed durations)

Used by My Voice when `preciseMode` is OFF.

```
text (string)
     │
     ▼
tokenize: words + punctuation (regex)
     │
     ▼
per word: phonemeMap.englishWordToVisemes(word)
          or spanishWordToVisemes(word)
     │
     ▼
assign fixed durations:
  consonant viseme → 50 ms
  vowel viseme (indices 4–8) → 70 ms
  word gap → 20 ms
  comma / semicolon → 250 ms
  sentence end (. ! ?) → 450 ms
     │
     ▼
scale entire sequence to match audioDurationMs
  (clamped: 0.4× – 10× original)
     │
     ▼
VisemeSequence: [{type:"viseme"|"pause", value?, duration}]
```

**Input:** `(text: string, language: "en"|"es")`
**Output:** `VisemeEntry[]`

---

#### Pipeline B — `wordsToVisemes` (Whisper word timestamps)

Used by My Voice when `preciseMode` is ON.

```
Whisper response: [{word, start, end}]  (times in seconds)
     │
     ▼
insert leading silence if first word starts > 50 ms
     │
     ▼
per word:
  duration = (end - start) × 1000 ms
  visemes = phonemeMap(word, language)
  distribute duration across visemes proportionally:
    vowel visemes get 1.4× weight (minimum 16 ms each)
     │
     ▼
insert pause entries for inter-word gaps > 20 ms
     │
     ▼
append mouth-close (viseme 0, 80 ms)
     │
     ▼
VisemeSequence aligned to real audio timing
```

**Input:** `(words: {word, start, end}[], language: "en"|"es")`
**Output:** `VisemeEntry[]`

---

#### Pipeline C — `alignmentToVisemes` (ElevenLabs character timing)

Used by ElevenLabs and Chat modes.

```
ElevenLabs alignment: {
  characters: string[],
  character_start_times_seconds: number[],
  character_end_times_seconds: number[]
}
     │
     ▼
iterate characters:
  space / punctuation → pause entry (preserves cumulative timing)
  letter → CHAR_VISEME lookup (direct char → viseme index)
  gaps > 16 ms between cursor and next char → pause entry
     │
     ▼
append mouth-close (viseme 0, 80 ms)
     │
     ▼
VisemeSequence with millisecond-accurate character timing
```

**Input:** `(alignment: ElevenLabsAlignment)`
**Output:** `VisemeEntry[]`

The `CHAR_VISEME` table maps individual characters directly to viseme indices (e.g., `'a'→8`, `'f'→10`, `'b'→0`), covering both EN and ES alphabets. No phonemization needed — ElevenLabs already provides the exact timing per character.

---

### 3.3 Phoneme-to-Viseme (Pipelines A & B)

For text-based pipelines, words are first converted to phonemes:

- **English:** `phonemize` npm library → ARPAbet strings → `ARPABET_TO_VISEME` lookup table
  - Fallback: letter-by-letter using `LETTER_FALLBACK` (handles digraphs: `th`, `sh`, `ch`, `ph`, `wh`)
- **Spanish:** Rule-based grapheme-to-phoneme in `spanishWordToVisemes()`:
  - Handles digraphs: `ch`, `ll`, `rr`, `ny/ñ`, `qu`, `gu`
  - Silent letters: `h`, `u` after `q`/`g` before `e`/`i`
  - Context-dependent: `c`/`g` before front vowels (`e`, `i`) → sibilant
  - `v` → `b` (Spanish bilabial)
  - Accent stripping via Unicode NFD normalization

---

### 3.4 VisemeSequencer

The playback engine. Takes a `VisemeEntry[]` and drives mouth animation via `requestAnimationFrame`.

```
VisemeSequencer.play(sequence, audioCtx?)
     │
     ▼
rAF loop on every frame:
     │
     ├─[AudioContext mode: audioCtx provided]
     │    elapsed = audioCtx.currentTime - startTime  (seconds → ms)
     │    scan forward in sequence to find current entry
     │    → immune to rAF jitter, stays in sync with audio
     │
     └─[Legacy delta mode: no audioCtx]
          delta = timestamp - lastTimestamp  (capped at 100 ms)
          count down current entry's duration
          → minor drift possible over long sequences
     │
     ▼
on each viseme change:
  onVisemeChange(value)
     │
     ▼
riveRef.current.viewModelInstance.number("propertyOfMouth/viseme").value = value

on stop / sequence end:
  → reset to viseme 0 (mouth closed)
```

**When each mode uses AudioContext timing vs delta timing:**

| Mode | Timing Mode |
|------|------------|
| My Voice (precise ON) | Delta (no AudioContext passed) |
| My Voice (precise OFF) | Delta |
| ElevenLabs | AudioContext |
| Chat | AudioContext |

---

## 4. Audio Effects Pipeline

All effects use a single shared `AudioContext` (lazily created in `getAudioContext(ref)`, stored in a React ref to survive re-renders).

### Effect Chains

```
natural:
  Source ─────────────────────────────────────────────► Destination

chipmunk (playbackRate 1.7):
  Source(1.7×) ──► HighpassFilter(300 Hz) ────────────► Destination

deep (playbackRate 0.6):
  Source(0.6×) ──► LowpassFilter(1800 Hz) ────────────► Destination

robot:
  Source ──┬──► DryGain(0.3) ──────────────────────────┐
           │                                            ▼
           └──► RingGain ──────────────────────────► MixGain(0.8) ──► Bandpass(1200 Hz, Q=0.8) ──► Destination
                 ▲
           OscillatorNode(60 Hz sine)
           modulates RingGain.gain

echo:
  Source ──┬─────────────────────────────────────────► Destination (dry)
           └──► Delay(0.28s) ──► WetGain(0.55) ──────► Destination
                     ▲ FeedbackGain(0.38) ─────────────┘
                     └─────────────────────────────────┘
```

### Effect Availability by Mode

| Effect | My Voice | ElevenLabs | Chat |
|--------|----------|-----------|------|
| natural | ✓ | ✓ | ✓ |
| chipmunk | ✓ | — | — |
| deep | ✓ | — | — |
| robot | ✓ | ✓ | ✓ |
| echo | ✓ | ✓ | ✓ |

Chipmunk and deep are disabled in ElevenLabs/Chat because pitch shifting a synthesized voice sounds broken; the playbackRate mismatch would also desync the character-level lip sync.

---

## 5. Chat Mode: Portfolio Actions

### Flow

```
OpenAI gpt-4o-mini (with function calling)
     │
     ▼
{ text: "...", actions: [{name, args}, ...] }
     │
     ├──[text]──► ElevenLabs TTS ──► lip sync (standard path)
     │
     └──[actions]──► window.dispatchEvent("portfolio-action", { actions })
                           │
                           ▼
                       App.jsx handler
                           │
           ┌───────────────┼────────────────────────────────┐
           │               │                                │
   dispatch further    direct Rive VM              call App fn
   CustomEvents        manipulation
```

Actions dispatch as the TTS synthesis begins — the avatar navigates while speaking.

Multiple actions are staggered 400 ms apart to allow lazy-loaded components to mount.

### Available Tools

| Tool | Parameters | What it does |
|------|-----------|--------------|
| `scroll_to_section` | `section: "experience"\|"code"\|"art"\|"others"` | Dispatch `avatar-navigate-to-section` → section scrolls into view (desktop) or tab changes (mobile) |
| `highlight_project` | `project_name: string` | Navigate to code, then dispatch `avatar-highlight-project` after 400 ms → fuzzy match on project name, scroll card into view + hover overlay |
| `open_artwork` | `artwork_title: string` | Navigate to art, then dispatch `avatar-open-artwork` after 600 ms → fuzzy match on title, open lightbox modal |
| `close_modal` | — | Dispatch `avatar-close-modal` → close lightbox + clear highlighted project card |
| `toggle_dark_mode` | — | Dispatch `avatar-toggle-darkmode` |
| `maximize_hero` | — | Call `handleMaximizeToggle()` directly |
| `switch_language` | `language: "en"\|"es"` | Dispatch `avatar-switch-language` |
| `change_outfit` | `outfit: 0\|1\|2\|3` | Write directly to Rive ViewModel (`outfit`, `matrixEnabled`, `canvasEnabled`) + navigate to matching section |

### CustomEvent Convention

All inter-component communication uses `window.dispatchEvent(new CustomEvent(name, { detail }))`. Components add their own `window.addEventListener` in a `useEffect`. This avoids prop drilling and React context for ephemeral, action-triggered events.

---

## 6. Subtitle System

Subtitles are rendered as a React portal injected into the `#leftPanel` DOM node (the same container as the Rive canvas). The portal uses a `<div data-avatar-overlay>` wrapper — this attribute is whitelisted in the `App.css` rule that hides non-first children of `.leftPanel` on desktop.

There are two subtitle layers:

| Layer | Position | Content |
|-------|----------|---------|
| **Top subtitles** | `top: 4rem`, centered, 1.9rem bold white uppercase | Word-by-word TTS output (all three modes) |
| **Bottom subtitles** | `bottom: 1rem`, centered, 0.78rem | Live browser transcript while recording |

Both are controlled by the `subtitlesEnabled` toggle in the settings panel.

### Word-by-word timing pipelines

Subtitles are split into chunks of up to 5 words. Each word has a `delayMs` relative to the chunk start, driven by a CSS variable `--word-delay` and a `wordPop` keyframe animation. Chunks are scheduled with `setTimeout` via `scheduleSubtitles()`.

| Mode | Source | Helper |
|------|--------|--------|
| **My Voice** (precise) | Whisper `words[].start` timestamps | `whisperWordsToSubtitleChunks(words)` |
| **My Voice** (non-precise) | Total `durationMs` / word count (uniform) | `textToSubtitleChunks(text, durationMs)` |
| **ElevenLabs** | ElevenLabs character-level alignment | `buildSubtitleChunks(text, alignment)` |
| **Chat** | ElevenLabs character-level alignment (same as above) | `buildSubtitleChunks(text, alignment)` |

### Scheduling flow

```
playWithEffect(blob, effect, audioCtx, onPlaybackStart) resolves
  └─ onPlaybackStart() fires
       ├─ onSpeakSequence(sequence)   ← starts viseme playback
       └─ scheduleSubtitles(chunks)   ← sets setTimeout per chunk
            └─ each timeout → setActiveSubtitle({ words, durationMs })
                 └─ JSX renders <p.subtitle> with per-word <span> + animation-delay
```

---

## 7. Rive ViewModel Properties

The Rive state machine is `"portrait state machine"` in `/portrait.riv`. All properties are accessed via `riveRef.current.viewModelInstance`.

| Property | Type | R/W | Who reads | Who writes | Purpose |
|----------|------|-----|-----------|-----------|---------|
| `propertyOfMouth/viseme` | number (0–10) | W | — | `useLipSync` (via VisemeSequencer) | Mouth shape for lip sync |
| `outfit` | number (0–3) | W | — | `App.jsx` (tab change + `change_outfit` action) | 0=casual, 1=code, 2=art, 3=contact |
| `matrixEnabled` | boolean | W | — | `App.jsx` | Matrix visual effect (outfit 1 only) |
| `canvasEnabled` | boolean | W | — | `App.jsx` | Canvas/art visual effect (outfit 2 only) |
| `isListening` | boolean | R+W | `App.jsx` polling (500 ms) | `App.jsx` (audio toggle) | Avatar's sleep/music state. App writes `true` to sleep; Rive state machine sets `false` to wake up; App detects transition and stops background music |

---

## 8. Setup & Environment Variables

Two API keys are required. Both must be set in a `.env` file at the project root (or in your deployment environment):

```env
VITE_OPENAI_API_KEY=sk-...
VITE_ELEVENLABS_API_KEY=...
```

| Variable | Used by | If missing |
|----------|---------|-----------|
| `VITE_OPENAI_API_KEY` | Whisper transcription (`whisper.js`) | My Voice precise mode throws `"VITE_OPENAI_API_KEY is not set"`, falls back silently to text-based lip sync |
| `VITE_OPENAI_API_KEY` | Chat mode (`chat.js`) | Chat mode throws `"VITE_OPENAI_API_KEY is not set"`, request aborted, avatar stays silent |
| `VITE_ELEVENLABS_API_KEY` | TTS synthesis (`elevenlabs.js`) | ElevenLabs and Chat modes fail at synthesis step, avatar stays silent |

Both keys are sent directly from the browser (no backend proxy). Keep them restricted to your domain in the provider dashboards.

**Voice selection:** ElevenLabs voices are fetched lazily the first time the user switches to ElevenLabs or Chat mode. If `getVoices()` fails (bad key, network), the voice selector shows an error and no voice is selected — both modes will silently abort at the `if (!selectedVoice) return` guard in `LipSyncBar.jsx`.

---

## 9. Troubleshooting

### Mobile: mic button does nothing

On mobile browsers (iOS Safari, Android Chrome), the recording flow uses a different path because `webkitSpeechRecognition` is unreliable on mobile (frequent `network`, `not-allowed`, and `no-speech` errors) and `MediaRecorder` on iOS only supports `audio/mp4`.

**How the mobile path works (Whisper-only mode):**

```
[Press and hold mic button]  ← onTouchStart
     │
     ├── AudioContext created/resumed synchronously (unlocks iOS audio)
     │
     ▼
getUserMedia({ audio: true })   ← requires HTTPS + mic permission
     │
     ▼
MediaRecorder (mimeType auto-detected: audio/mp4 on iOS, audio/webm on others)
     │ recording while finger held down…
     ▼
[Release mic button]  ← onTouchEnd
     │
     ▼
recorder.stop() → recorder.onstop
     │
     ▼
transcribeAudio(blob, language)   ← Whisper via /api/transcribe
     │
     ▼
onReady(transcript, blob, durationMs)   ← same path as desktop
     │
     ▼
playWithEffect(blob, audioCtx, …)   ← AudioContext already unlocked → audio plays
```

**Interaction model**: press-and-hold to record, release to stop. `onTouchStart` begins recording; `onTouchEnd` stops it. Both call `e.preventDefault()` to suppress the ghost `click` event that would otherwise double-fire.

**AudioContext unlock**: iOS requires `new AudioContext()` or `audioCtx.resume()` to be called synchronously within a user gesture. `getAudioContext(audioCtxRef)` is called in `onTouchStart` (and in `onClick` on desktop) to unlock it at gesture time. By the time `playWithEffect` runs — after async network calls — the context is already unlocked and audio plays without issue.

No interim transcript is shown in the UI during recording on mobile (SpeechRecognition is bypassed entirely). All three modes (myvoice, elevenlabs, chat) work via this path.

**Diagnostic logs (mobile):**
```
[useSpeechRecognition] Whisper-only mode (mobile or no SR support)
[recorder.onstop] transcript: "" | duration: 2340ms | mime: audio/mp4
[recorder.onstop] No SR transcript, using Whisper fallback...
[transcript] <whisper result>
```

**Common causes of failure on mobile:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| No permission prompt, button does nothing | Page served over HTTP (not HTTPS) | Serve over HTTPS — `getUserMedia` is blocked on insecure origins |
| Permission denied, silent failure | User denied mic permission | Reset mic permission in browser settings |
| Recording starts but no audio plays back | `AudioContext` not unlocked (old code path) | Should be fixed — `getAudioContext` is now called in `onTouchStart` synchronously |
| `grabación demasiado corta` in log | Finger released in <400 ms | Hold the button for at least 0.5 s before releasing |
| `Whisper fallback failed` in log | Backend `/api/transcribe` unreachable or returned error | Check `VITE_API_URL` and backend logs |
| `MediaRecorder not supported` in log | iOS < 14.3 | Update iOS. MediaRecorder requires iOS 14.3+ |

---

### Transcript is empty — avatar does nothing after recording (desktop)

On desktop, `onReady` is called with the SpeechRecognition transcript. If SR produces no transcript, `useSpeechRecognition` automatically falls back to Whisper (same as mobile) provided the recording lasted >400 ms.

**Diagnostic logs to check in the browser console:**

```
[recognition] lang: en-US
[recognition.onresult] interim: "..." | final: "..."
[recognition.onend] transcript: "..."
[recorder.onstop] transcript: "..." | duration: ...ms | mime: audio/webm
[transcript] <final value>
```

**Common causes (desktop):**

| Symptom in logs | Cause | Fix |
|----------------|-------|-----|
| `lang: en-US` but user speaks Spanish | `useLanguage()` context returning `"en"` — portfolio language is set to English | Switch portfolio language to Spanish before recording |
| `onresult` fires with interim results but `final: ""` at `onend` | Web Speech API sent results to Google but no `isFinal` came back before timeout | SR error triggers Whisper fallback automatically; if Whisper also fails check network |
| No `onresult` at all | Web Speech API got no audio (mic permission denied, wrong input device, or utterance too quiet) | Check browser mic permissions and input device |
| `onresult` shows garbled English for Spanish speech | Language mismatch (see above) | Same fix: switch portfolio language |

---

### Race condition: `onend` fires before `isFinal` result arrives

In rare cases `recognition.onend` fires with `transcriptRef.current` still empty because the `isFinal` result from Google's servers hasn't arrived yet. The log sequence looks like:

```
[recognition.onresult] interim: "hola" | final: ""
[recognition.onend] transcript: ""                    ← final never arrived
[recorder.onstop] No SR transcript, using Whisper fallback...
[transcript] <whisper result>
```

Previously this caused a silent failure. Now `useSpeechRecognition` automatically falls back to Whisper when the transcript is empty and the recording lasted >400 ms.

---

### Chat mode always responds with the same phrase

The system prompt instructs the model to vary its responses. If it still repeats, check:
- `conversationHistoryRef` is accumulating correctly (the model has context of previous turns)
- The model is not returning empty `content` — if `text` is empty, `LipSyncBar` uses a random fallback from `["Toma.", "Hecho.", "Aquí tienes.", ...]`

---

### Lip sync looks out of sync with audio

| Mode | Timing mechanism | Common cause |
|------|-----------------|--------------|
| My Voice (precise OFF) | Text-based, scaled to `durationMs` | Effect playbackRate not accounted for — only precise mode compensates for chipmunk/deep |
| My Voice (precise ON) | Whisper word timestamps | Whisper latency: audio is already playing before visemes start. Normal for short clips |
| ElevenLabs / Chat | AudioContext clock | Should be drift-free. If off, check that `audioCtx` is passed correctly to `onSpeakSequence` |

---

## 10. File Map

| File | Role |
|------|------|
| `src/components/LipSyncBar/LipSyncBar.jsx` | Main orchestrator. All mode logic, UI controls, mic button, keyboard shortcuts (`Space`, `1`/`2`/`3`). Holds conversation history ref. |
| `src/hooks/useSpeechRecognition.js` | Manages audio capture and transcription. **Desktop:** `SpeechRecognition` + `MediaRecorder` in tandem; if SR produces no transcript, falls back to Whisper. **Mobile** (`/iPhone|iPad|iPod|Android/i`): `MediaRecorder`-only, transcribes via Whisper on stop. MIME type auto-detected (`audio/mp4` on iOS, `audio/webm` on others). Fires `onReady(transcript, blob, durationMs)` when transcript is ready. |
| `src/hooks/useLipSync.js` | Bridge between viseme data and Rive ViewModel. Exposes `speak(text, ms)` and `speakSequence(sequence, audioCtx?)`. |
| `src/utils/lipSync/visemeSequencer.js` | rAF-based playback engine. Two timing modes: AudioContext (drift-free) and delta (legacy). |
| `src/utils/lipSync/visemeMap.js` | Lookup tables: `ARPABET_TO_VISEME`, `SPANISH_TO_VISEME`, `VOWEL_VISEMES` set. |
| `src/utils/lipSync/phonemeMap.js` | `englishWordToVisemes` (via `phonemize` lib) and `spanishWordToVisemes` (rule-based G2P). |
| `src/utils/lipSync/textToVisemes.js` | Text → viseme sequence with fixed durations. Fallback path. |
| `src/utils/lipSync/wordsToVisemes.js` | Whisper word timestamps → proportionally timed viseme sequence. |
| `src/utils/lipSync/alignmentToVisemes.js` | ElevenLabs character alignment → ms-accurate viseme sequence. |
| `src/utils/whisper.js` | OpenAI Whisper client. Returns `{text, words: [{word, start, end}]}`. |
| `src/utils/elevenlabs.js` | ElevenLabs client. `getVoices()` and `synthesize()` → `{blob, alignment}`. |
| `src/utils/chat.js` | OpenAI Chat client with 8 function-calling tools. Returns `{text, actions}`. |
| `src/utils/chatSystemPrompt.js` | System prompt: Hector persona, portfolio knowledge, tool usage instructions. |
| `src/utils/audioEffects.js` | `VOICE_EFFECTS` config, `playWithEffect()`, `getAudioContext()`. |
| `src/components/PortraitHero/PortraitHero.jsx` | Rive canvas wrapper (`@rive-app/react-webgl2`). Passes rive instance up via `onRiveReady`. |
| `src/App.jsx` | Central orchestrator: Rive VM polling, outfit control, `portfolio-action` event router, audio toggle. Passes `speak`/`speakSequence`/`stop`/`isPlaying` to LipSyncBar. |
| `src/components/ProjectShowcase/ProjectShowcase.jsx` | Listens for `avatar-highlight-project` and `avatar-close-modal`. Fuzzy matches project name, scrolls card, activates hover overlay. |
| `src/components/ImageGallery/ImageGallery.jsx` | Listens for `avatar-open-artwork` and `avatar-close-modal`. Fuzzy matches artwork title, opens/closes lightbox modal. |
| `src/components/DarkModeToggle/DarkModeToggle.jsx` | Listens for `avatar-toggle-darkmode`. |
| `src/components/LanguageSelector/LanguageSelector.jsx` | Listens for `avatar-switch-language`. |
| `src/components/TabbedSections/TabbedSections.jsx` | Listens for `avatar-navigate-to-section` for mobile tab switching. |
