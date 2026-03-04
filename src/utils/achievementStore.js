const STORAGE_KEY = "achievements_data";
const SIG_KEY = "achievements_sig";

// Obfuscated secret (not plaintext in source)
const SECRET_BYTES = new Uint8Array([
  82, 105, 118, 101, 80, 111, 114, 116, 102, 111,
  108, 105, 111, 83, 101, 99, 114, 101, 116, 50,
  48, 50, 53, 33, 64, 35, 72, 77, 65, 67,
]);

let cachedKey = null;

async function getSigningKey() {
  if (cachedKey) return cachedKey;
  cachedKey = await crypto.subtle.importKey(
    "raw",
    SECRET_BYTES,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  return cachedKey;
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

function canonicalize(states) {
  const sorted = Object.keys(states).sort().reduce((acc, k) => {
    acc[k] = states[k];
    return acc;
  }, {});
  return JSON.stringify(sorted);
}

async function signPayload(json) {
  const key = await getSigningKey();
  const data = new TextEncoder().encode(json);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  return toHex(sig);
}

async function verifyPayload(json, hex) {
  const key = await getSigningKey();
  const data = new TextEncoder().encode(json);
  const sig = fromHex(hex);
  return crypto.subtle.verify("HMAC", key, sig, data);
}

export async function saveAchievements(states) {
  try {
    const json = canonicalize(states);
    const sig = await signPayload(json);
    localStorage.setItem(STORAGE_KEY, json);
    localStorage.setItem(SIG_KEY, sig);
  } catch (e) {
    console.warn("Failed to save achievements:", e);
  }
}

export async function loadAchievements() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    const sig = localStorage.getItem(SIG_KEY);
    if (!json || !sig) return null;

    const valid = await verifyPayload(json, sig);
    if (!valid) {
      clearAchievements();
      return null;
    }

    return JSON.parse(json);
  } catch (e) {
    console.warn("Failed to load achievements:", e);
    return null;
  }
}

export function clearAchievements() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SIG_KEY);
}
