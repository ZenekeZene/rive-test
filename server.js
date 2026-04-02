import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { SYSTEM_PROMPT } from './src/utils/chatSystemPrompt.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const upload = multer({ storage: multer.memoryStorage() })
const PORT = process.env.PORT || 3001

app.use(express.json())

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173']

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')))
}

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'scroll_to_section',
      description: 'Navigate the portfolio to a specific section',
      parameters: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            enum: ['experience', 'code', 'art', 'others'],
            description: 'Section to navigate to',
          },
        },
        required: ['section'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'highlight_project',
      description: 'Navigate to the code section and highlight a specific project card',
      parameters: {
        type: 'object',
        properties: {
          project_name: { type: 'string', description: 'Name of the project to highlight' },
        },
        required: ['project_name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'open_artwork',
      description: 'Navigate to the art section and open a specific artwork in the detail modal',
      parameters: {
        type: 'object',
        properties: {
          artwork_title: { type: 'string', description: 'Title of the artwork to open' },
        },
        required: ['artwork_title'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'toggle_dark_mode',
      description: 'Toggle dark mode on or off',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'maximize_hero',
      description: 'Toggle fullscreen / maximized mode for the avatar panel',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'switch_language',
      description: 'Switch the portfolio display language',
      parameters: {
        type: 'object',
        properties: {
          language: { type: 'string', enum: ['en', 'es'] },
        },
        required: ['language'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'change_outfit',
      description: "Change the avatar's outfit in the Rive animation",
      parameters: {
        type: 'object',
        properties: {
          outfit: {
            type: 'integer',
            enum: [0, 1, 2, 3],
            description: '0=casual (default), 1=code (matrix effect), 2=art (canvas), 3=contact',
          },
        },
        required: ['outfit'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'close_modal',
      description:
        "Close any open lightbox, artwork modal, or highlighted project. Use when the user says 'close', 'go back', 'hide it', 'quita', 'cierra', 'vuelve', etc.",
      parameters: { type: 'object', properties: {} },
    },
  },
]

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context, scriptPrompt } = req.body
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set' })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...(scriptPrompt ? [{ role: 'system', content: scriptPrompt }] : []),
          ...(context ? [{ role: 'system', content: context }] : []),
          ...messages,
        ],
        tools: TOOLS,
        tool_choice: 'auto',
        max_tokens: 300,
        temperature: 0.85,
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      return res.status(response.status).json({ error: detail })
    }

    const data = await response.json()
    const msg = data.choices[0].message

    res.json({
      text: msg.content?.trim() || '',
      actions: (msg.tool_calls || []).map((tc) => ({
        name: tc.function.name,
        args: JSON.parse(tc.function.arguments),
      })),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/transcribe', upload.single('file'), async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set' })

    const body = new FormData()
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype })
    body.append('file', blob, req.file.originalname)
    body.append('model', 'whisper-1')
    body.append('response_format', 'verbose_json')
    body.append('timestamp_granularities[]', 'word')
    if (req.body.language) body.append('language', req.body.language)

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      return res.status(response.status).json({ error: detail })
    }

    res.json(await response.json())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
