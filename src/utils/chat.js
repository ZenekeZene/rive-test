/**
 * Sends a message to the backend chat API and returns the assistant's reply + any actions.
 * @param {Array<{role: string, content: string}>} messages - full conversation history
 * @param {string} [context] - optional situational context injected as a system message
 * @param {string} [scriptPrompt] - optional director script injected between base prompt and context
 * @returns {Promise<{ text: string, actions: Array<{ name: string, args: object }> }>}
 */
export async function sendMessage(messages, context, scriptPrompt) {
  const API_BASE = import.meta.env.VITE_API_URL ?? ''
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, context, scriptPrompt }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Chat ${res.status}: ${detail}`)
  }

  return res.json()
}
