# Plan: Lip Sync para personaje Rive

## Context
El portfolio usa un personaje Rive con un ViewModel que tiene una propiedad anidada `propertyOfMouth/viseme` (número 0-10) que controla la forma de la boca. El objetivo es crear un sistema de sincronización de labios que, dada una frase de texto, genere una secuencia de visemas y los reproduzca en tiempo real sobre el personaje.

## Arquitectura

```
Texto → Fonemas → Visemas (0-10) → Secuenciador → Rive ViewModel
```

- **Fonemas**: Librería `phonemize` (npm, pure JS, 125K palabras) para inglés + reglas custom para español (idioma fonético, mapeo casi 1:1)
- **Visemas**: Tabla de mapeo fonema→visema según la escala 0-10 del usuario
- **Secuenciador**: Motor basado en `requestAnimationFrame` con control de tiempos
- **Acceso Rive**: `vmInstance.number("propertyOfMouth/viseme").value = N`

## Estructura de archivos

### Nuevos archivos
```
src/utils/lipSync/visemeMap.js         # Mapeo fonema → visema (0-10)
src/utils/lipSync/phonemeMap.js        # Reglas G2P español + wrapper phonemize inglés
src/utils/lipSync/textToVisemes.js     # Pipeline: texto → tokens → fonemas → secuencia visemas
src/utils/lipSync/visemeSequencer.js   # Motor de reproducción con rAF
src/hooks/useLipSync.js                # Hook que conecta todo con Rive
src/components/LipSyncBar/LipSyncBar.jsx       # UI barra inferior
src/components/LipSyncBar/LipSyncBar.module.css
```

### Archivos a modificar
- `src/App.jsx` — importar hook y componente, renderizar LipSyncBar

## Pasos de implementación

### 1. Instalar dependencia
```bash
npm install phonemize
```

### 2. `visemeMap.js` — Mapeo fonema→visema
Tabla que mapea símbolos fonéticos (ARPAbet/IPA) a los valores 0-10:
| Visema | Fonemas | Descripción |
|--------|---------|-------------|
| 0 | B, M, P | Labios cerrados |
| 1 | L | Punta de lengua |
| 2 | CH, SH, JH, ZH | Palatales |
| 3 | D, G, K, N, S, NG, R, HH, C, X, Y, Z | Dental/alveolar |
| 4 | AO, OW (O abierta) | O abierta redondeada |
| 5 | AE, EH, IH, IY, EY, AY (A,E,I) | Vocales abiertas |
| 6 | (O cerrada española) | O cerrada redondeada |
| 7 | UW, UH, W | U redondeada |
| 8 | AA, AH (A abierta) | Boca muy abierta |
| 9 | TH, DH | Dientes visibles |
| 10 | F, V | Labio inferior / dientes |

### 3. `phonemeMap.js` — Conversión texto→fonemas
- **Inglés**: Usar `phonemize` (toARPABET) para convertir texto a fonemas ARPAbet
- **Español**: Función rule-based que procesa carácter por carácter con manejo de dígrafos (ch, ll, rr, qu, gu, ce, ci, ge, gi, ñ)

### 4. `textToVisemes.js` — Pipeline completo
1. Normalizar texto (lowercase, split por espacios y puntuación)
2. Clasificar tokens: palabra vs puntuación
3. Palabras → fonemas → visemas con duración (~120ms por visema, ~150ms vocales)
4. Puntuación → pausas (coma: 200ms, punto/!/?: 400ms, punto y coma: 300ms)
5. Entre palabras → pausa breve (80ms)
6. Output: `[{ type: "viseme", value: 0-10, duration: ms }, { type: "pause", duration: ms }]`

### 5. `visemeSequencer.js` — Motor de reproducción
Clase `VisemeSequencer`:
- `constructor(onVisemeChange)` — callback que recibe el valor visema
- `play(sequence)` — inicia reproducción con rAF
- `stop()` — cancela rAF, resetea boca a 0
- `onComplete` — callback cuando termina la secuencia
- Usa timestamps para medir duración, cap delta a 1 frame para evitar saltos al volver de tab oculto

### 6. `useLipSync.js` — Hook React
```js
useLipSync(riveRef) → { speak(text), stop(), isPlaying }
```
- Crea `VisemeSequencer` con callback que escribe en `propertyOfMouth/viseme`
- `speak()` usa `textToVisemes()` con el idioma del contexto (`useLanguage`)
- Limpieza automática en unmount
- Si se llama `speak()` durante reproducción, para la anterior primero

### 7. `LipSyncBar` — Componente UI
- Barra fija en la parte inferior de la pantalla
- Input de texto + botón Play/Stop
- Enter para enviar, botón cambia icono según estado
- `e.stopPropagation()` en keydown para no interferir con Konami code
- Max 200 caracteres con contador
- Fondo semi-transparente, z-index sobre canvas pero bajo modales
- Responsive (se adapta a móvil)

### 8. Integración en `App.jsx`
- Importar `useLipSync` y `LipSyncBar`
- Llamar al hook pasando `riveRef`
- Renderizar `<LipSyncBar>` con props `onSpeak`, `onStop`, `isPlaying`

## Edge cases
- **Rive no listo**: silently skip si viewModelInstance es null
- **Input vacío**: botón deshabilitado
- **Re-envío rápido**: stop anterior + play nuevo
- **Unmount**: cleanup vía useEffect
- **Palabras desconocidas (inglés)**: fallback a reglas básicas
- **Warning en dev**: console.warn si la propiedad `propertyOfMouth/viseme` no existe

## Verificación
1. `npm run dev` y abrir el portfolio
2. Escribir "Hello World" en la barra inferior y pulsar play → la boca del personaje se mueve
3. Escribir "Hola, mundo." → pausa visible en la coma y el punto
4. Cambiar idioma y repetir → fonemas se ajustan al idioma
5. Pulsar stop durante reproducción → boca vuelve a posición cerrada
6. Verificar en consola que no hay warnings de propiedad null
