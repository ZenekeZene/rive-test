# Avatar consciente: acciones sobre el portfolio

## Contexto

El avatar en modo Chat solo habla. Queremos que tambien actue: scrollear a secciones, mostrar proyectos, abrir obras de arte, etc. El usuario dice *"llevame a la seccion de arte"* y el avatar scrollea mientras responde.

## Arquitectura

**OpenAI Tools API** — el modelo devuelve `content` (texto hablado) + `tool_calls` (acciones) en la misma respuesta. Sin parsing de JSON/regex.

**Custom Events** — patron ya usado en el codebase (`overlay-embed-change`, `code-project-hover`, etc.). LipSyncBar despacha eventos, los componentes escuchan y ejecutan.

```
User habla → OpenAI (tools) → { text, actions }
                                   │         │
                                   │         └→ CustomEvent → App/componentes ejecutan accion
                                   └→ ElevenLabs TTS → lip sync
```

Las acciones se disparan cuando empieza la sintesis TTS, asi el scroll ocurre mientras el avatar habla.

## Acciones disponibles

| Tool | Params | Que hace |
|------|--------|----------|
| `scroll_to_section` | `section: "experience"\|"code"\|"art"\|"others"` | Desktop: `scrollIntoView`. Mobile: cambia tab activo |
| `highlight_project` | `project_name: string` | Scrollea a code, luego scrollea al card + activa hover overlay |
| `open_artwork` | `artwork_title: string` | Scrollea a art, luego abre el modal de detalle |
| `toggle_dark_mode` | — | Activa/desactiva dark mode |
| `maximize_hero` | — | Maximiza el avatar a fullscreen |
| `switch_language` | `language: "en"\|"es"` | Cambia idioma del portfolio |
| `change_outfit` | `outfit: number (0-3)` | Cambia outfit del avatar Rive (0=casual, 1=code, 2=art, 3=contact) |
| `trigger_animation` | `animation: "wave"\|"nod"\|"shrug"\|"celebrate"` | Activa una animacion puntual del avatar (si existe en el Rive file) |

## Cambios por archivo

### 1. `src/utils/chat.js`
- Anadir array `tools` con las 8 funciones (scroll_to_section, highlight_project, open_artwork, toggle_dark_mode, maximize_hero, switch_language, change_outfit, trigger_animation) al request body
- Importar system prompt desde `src/utils/chatSystemPrompt.js`
- Cambiar return de `string` a `{ text, actions }`:
  ```js
  const msg = data.choices[0].message;
  return {
    text: msg.content?.trim() || "",
    actions: (msg.tool_calls || []).map(tc => ({
      name: tc.function.name,
      args: JSON.parse(tc.function.arguments)
    }))
  };
  ```
- Subir `max_tokens` de 150 a 300 (tool calls consumen ~30-50 tokens extra, mas acciones = mas tokens)

### 2. `src/utils/chatSystemPrompt.js` (nuevo)
- System prompt completo con personalidad de Hector + conocimiento del portfolio + instrucciones de herramientas
- Exportado como string para importar en chat.js
- Fichero separado para facilitar iteracion

### 3. `src/components/LipSyncBar/LipSyncBar.jsx`
- En `handleChatReady`: destructurar `{ text, actions }` de `sendMessage`
- Despachar acciones via `window.dispatchEvent(new CustomEvent("portfolio-action", { detail: { actions } }))`
- Fallback si `text` vacio: `"Mira esto"` / `"Check this out"`
- Pasar solo `text` (no actions) a `synthesize()` y al historial

### 4. `src/App.jsx`
- Anadir `useEffect` que escucha `"portfolio-action"` en `window`
- Router de acciones:
  - `scroll_to_section`: Desktop → `document.querySelector('[data-section="X"]').scrollIntoView({behavior:'smooth'})`. Mobile → `setActiveTab` + `handleTabChange`
  - `highlight_project`: scroll a code primero, luego dispatch `"avatar-highlight-project"` con delay de 400ms
  - `open_artwork`: scroll a art primero, luego dispatch `"avatar-open-artwork"` con delay de 400ms
  - `toggle_dark_mode`: dispatch `"avatar-toggle-darkmode"`
  - `maximize_hero`: llamar `handleMaximizeToggle`
  - `switch_language`: dispatch `"avatar-switch-language"` con `{ language }`
  - `change_outfit`: `riveRef.current.viewModelInstance.number("outfit").value = outfit` + actualizar `matrixEnabled`/`canvasEnabled` segun valor (1→matrix, 2→canvas)
  - `trigger_animation`: dispatch `"avatar-trigger-animation"` con `{ animation }` (componente Rive lo escucha)
- Acciones multiples: ejecutar secuencialmente con 400ms entre cada una

### 5. `src/components/ProjectShowcase/ProjectShowcase.jsx`
- Anadir `useEffect` que escucha `"avatar-highlight-project"`
- Fuzzy match por nombre (case-insensitive `includes`)
- `setHoveredCardId(project.id)` + `cardRef.scrollIntoView({behavior:'smooth', block:'center'})`
- Mobile: `setActiveProject(index)`

### 6. `src/components/ImageGallery/ImageGallery.jsx`
- Anadir `useEffect` que escucha `"avatar-open-artwork"`
- Fuzzy match por titulo en `PLACEHOLDER_IMAGES`
- Llamar la funcion existente que abre el modal de detalle
- El item del masonry se scrollea a view primero

### 7. `src/components/DarkModeToggle/DarkModeToggle.jsx`
- Anadir `useEffect` que escucha `"avatar-toggle-darkmode"` y ejecuta toggle

### 8. `src/components/LanguageSelector/LanguageSelector.jsx`
- Anadir `useEffect` que escucha `"avatar-switch-language"` y llama `setLanguage(e.detail.language)`

### 9. `src/components/PortraitHero/PortraitHero.jsx` (o gestionar en App.jsx)
- Para `trigger_animation`: investigar si existen triggers en el Rive file para wave/nod/shrug/celebrate. Si no existen en el archivo .riv, esta accion queda como no-op silencioso por ahora
- Para `change_outfit`: ya se gestiona en App.jsx directamente via `vmInstance.number("outfit")`, `vmInstance.boolean("matrixEnabled")`, `vmInstance.boolean("canvasEnabled")`

## Rive ViewModel — referencia rapida

| Propiedad | Tipo | Lectura/Escritura | Uso |
|---|---|---|---|
| `"outfit"` | number | write | Outfit del avatar (0-3) |
| `"matrixEnabled"` | boolean | write | Efecto matrix (outfit 1) |
| `"canvasEnabled"` | boolean | write | Modo canvas (outfit 2) |
| `"isListening"` | boolean | read+write | Estado sleep/audio |
| `"propertyOfMouth/viseme"` | number | write | Lip sync |

## Timing y errores

- Acciones se disparan al empezar la sintesis TTS (scroll ocurre mientras el avatar habla)
- Si el target no existe (fuzzy match falla): skip silencioso, el audio sigue
- Si hay accion compuesta (scroll + highlight): delay de 400ms entre pasos
- Si el componente destino no esta montado (lazy load): el scroll a la seccion lo monta, el delay de 400ms da tiempo

## Verificacion

1. Modo Chat: decir *"llevame al arte"* → scrollea a art section, avatar responde
2. *"ensename el proyecto del Gorila"* → scrollea a art, abre modal del Gorila
3. *"que proyecto de codigo te mola mas?"* → avatar elige uno, scrollea a code, lo destaca
4. *"pon modo oscuro"* → toggle dark mode
5. *"ponte el traje de codigo"* → cambia outfit a 1, activa matrix
6. *"saluda"* → trigger wave animation (si existe en .riv)
7. *"cambia a ingles"* → switch language a "en"
8. Verificar que en mobile funciona con cambio de tabs en vez de scroll
9. Verificar que si no hay accion, el chat funciona como antes (solo texto)
10. Verificar acciones compuestas: *"llevame a arte y pon modo oscuro"* → ambas acciones secuenciales
