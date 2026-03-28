import { SYSTEM_PROMPT } from "./chatSystemPrompt.js";

const TOOLS = [
  {
    type: "function",
    function: {
      name: "scroll_to_section",
      description: "Navigate the portfolio to a specific section",
      parameters: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["experience", "code", "art", "others"],
            description: "Section to navigate to",
          },
        },
        required: ["section"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "highlight_project",
      description: "Navigate to the code section and highlight a specific project card",
      parameters: {
        type: "object",
        properties: {
          project_name: { type: "string", description: "Name of the project to highlight" },
        },
        required: ["project_name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "open_artwork",
      description: "Navigate to the art section and open a specific artwork in the detail modal",
      parameters: {
        type: "object",
        properties: {
          artwork_title: { type: "string", description: "Title of the artwork to open" },
        },
        required: ["artwork_title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "toggle_dark_mode",
      description: "Toggle dark mode on or off",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "maximize_hero",
      description: "Toggle fullscreen / maximized mode for the avatar panel",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "switch_language",
      description: "Switch the portfolio display language",
      parameters: {
        type: "object",
        properties: {
          language: { type: "string", enum: ["en", "es"] },
        },
        required: ["language"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "change_outfit",
      description: "Change the avatar's outfit in the Rive animation",
      parameters: {
        type: "object",
        properties: {
          outfit: {
            type: "integer",
            enum: [0, 1, 2, 3],
            description: "0=casual (default), 1=code (matrix effect), 2=art (canvas), 3=contact",
          },
        },
        required: ["outfit"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "close_modal",
      description: "Close any open lightbox, artwork modal, or highlighted project. Use when the user says 'close', 'go back', 'hide it', 'quita', 'cierra', 'vuelve', etc.",
      parameters: { type: "object", properties: {} },
    },
  },
];

/**
 * Sends a message to OpenAI Chat API and returns the assistant's reply + any actions.
 * @param {Array<{role: string, content: string}>} messages - full conversation history
 * @param {string} [context] - optional situational context injected as a system message
 * @returns {Promise<{ text: string, actions: Array<{ name: string, args: object }> }>}
 */
export async function sendMessage(messages, context) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error("VITE_OPENAI_API_KEY is not set");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(context ? [{ role: "system", content: context }] : []),
        ...messages,
      ],
      tools: TOOLS,
      tool_choice: "auto",
      max_tokens: 300,
      temperature: 0.85,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI Chat ${res.status}: ${detail}`);
  }

  const data = await res.json();
  const msg = data.choices[0].message;

  return {
    text: msg.content?.trim() || "",
    actions: (msg.tool_calls || []).map((tc) => ({
      name: tc.function.name,
      args: JSON.parse(tc.function.arguments),
    })),
  };
}
