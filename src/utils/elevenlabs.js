const BASE = "https://api.elevenlabs.io/v1";

function headers() {
  const key = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (!key) throw new Error("VITE_ELEVENLABS_API_KEY is not set");
  return { "xi-api-key": key };
}

/** Returns [{voice_id, name, category}] sorted by name. */
export async function getVoices() {
  const res = await fetch(`${BASE}/voices`, { headers: headers() });
  if (!res.ok) throw new Error(`ElevenLabs /voices ${res.status}`);
  const data = await res.json();
  return data.voices
    .map(({ voice_id, name, category }) => ({ voice_id, name, category }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Synthesizes text and returns character-level timing.
 * @returns {{ blob: Blob, alignment: { characters, character_start_times_seconds, character_end_times_seconds } }}
 */
export async function synthesize(text, voiceId, language) {
  const res = await fetch(`${BASE}/text-to-speech/${voiceId}/with-timestamps`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      language_code: language === "es" ? "es" : "en",
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`ElevenLabs TTS ${res.status}: ${detail}`);
  }

  const { audio_base64, alignment } = await res.json();

  // Decode base64 → Blob
  const binary = atob(audio_base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: "audio/mpeg" });

  return { blob, alignment };
}

/**
 * Streams TTS with character-level alignment.
 * Yields { audioBytes: Uint8Array, alignment } as each chunk arrives.
 * Timestamps in alignment are absolute (relative to full utterance start).
 */
export async function* synthesizeStream(text, voiceId, language) {
  const res = await fetch(`${BASE}/text-to-speech/${voiceId}/stream/with-timestamps`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      language_code: language === "es" ? "es" : "en",
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`ElevenLabs stream ${res.status}: ${detail}`);
  }

  const reader = res.body.getReader();
  const textDecoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += textDecoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // keep incomplete trailing line
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const chunk = JSON.parse(line);
        if (!chunk.audio) continue;
        const binary = atob(chunk.audio);
        const audioBytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) audioBytes[i] = binary.charCodeAt(i);
        yield { audioBytes, alignment: chunk.alignment ?? null };
      } catch { /* skip malformed lines */ }
    }
  }
  // flush remaining buffer
  if (buffer.trim()) {
    try {
      const chunk = JSON.parse(buffer);
      if (chunk.audio) {
        const binary = atob(chunk.audio);
        const audioBytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) audioBytes[i] = binary.charCodeAt(i);
        yield { audioBytes, alignment: chunk.alignment ?? null };
      }
    } catch {}
  }
}
