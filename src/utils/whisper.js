/**
 * Transcribes an audio blob using OpenAI Whisper with word-level timestamps.
 * Requires VITE_OPENAI_API_KEY in environment.
 *
 * Returns: { text: string, words: [{word, start, end}] }
 * where start/end are in seconds.
 */
export async function transcribeAudio(blob, language) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error("VITE_OPENAI_API_KEY is not set");

  // Whisper needs a filename with extension to detect format
  const ext = blob.type.includes("mp4") ? "mp4" : "webm";
  const file = new File([blob], `recording.${ext}`, { type: blob.type });

  const body = new FormData();
  body.append("file", file);
  body.append("model", "whisper-1");
  body.append("response_format", "verbose_json");
  body.append("timestamp_granularities[]", "word");
  // Hint the language to improve accuracy and speed
  if (language === "es") body.append("language", "es");
  if (language === "en") body.append("language", "en");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Whisper ${res.status}: ${detail}`);
  }

  return res.json();
}
