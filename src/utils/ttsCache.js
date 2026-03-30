const PREFIX = "tts_";
const MAX_ENTRIES = 25;

function hashKey(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

export function getCached(text, voiceId) {
  try {
    const raw = sessionStorage.getItem(PREFIX + hashKey(`${voiceId}:${text}`));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setCached(text, voiceId, audio_base64, alignment) {
  try {
    const keys = Object.keys(sessionStorage).filter(k => k.startsWith(PREFIX));
    if (keys.length >= MAX_ENTRIES) sessionStorage.removeItem(keys[0]);
    sessionStorage.setItem(PREFIX + hashKey(`${voiceId}:${text}`), JSON.stringify({ audio_base64, alignment }));
  } catch {}
}
