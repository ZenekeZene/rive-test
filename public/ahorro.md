Dos ángulos: reducir consumo dentro de ElevenLabs, y alternativas más baratas.

  ---
  Reducir consumo dentro de ElevenLabs

  Modelo más barato — el cambio más inmediato. Ahora usas eleven_multilingual_v2,
  que es el más caro. ElevenLabs tiene modelos más baratos:

  ┌────────────────────────┬───────────┬─────────────────┐
  │         Modelo         │  Calidad  │ Coste relativo  │
  ├────────────────────────┼───────────┼─────────────────┤
  │ eleven_multilingual_v2 │ Máxima    │ 1x (actual)     │
  ├────────────────────────┼───────────┼─────────────────┤
  │ eleven_turbo_v2_5      │ Muy buena │ ~50% más barato │
  ├────────────────────────┼───────────┼─────────────────┤
  │ eleven_flash_v2_5      │ Buena     │ ~80% más barato │
  └────────────────────────┴───────────┴─────────────────┘

  El turbo mantiene buena calidad para una demo de portfolio. Flash es el más barato
   y está pensado para tiempo real. Un cambio de una línea en elevenlabs.js.

  Web Speech API para comentarios proactivos/idle — estos comentarios son menos
  críticos (el usuario no está hablando directamente). Podrías usar el TTS gratuito
  del navegador para ellos y reservar ElevenLabs solo para respuestas directas.

  ---
  Alternativas completas a ElevenLabs

  El problema principal al sustituir ElevenLabs es el alignment por caracteres — es
  lo que permite el lip sync. La mayoría de servicios no lo tienen.

  ┌────────────────┬──────────────┬───────────────────────┬─────────────────────┐
  │    Servicio    │    Precio    │        Timing         │    Tier gratuito    │
  ├────────────────┼──────────────┼───────────────────────┼─────────────────────┤
  │ Azure TTS      │ ~$16/1M      │ Word-level (SSML)     │ 500k chars/mes      │
  │                │ chars        │                       │ gratis              │
  ├────────────────┼──────────────┼───────────────────────┼─────────────────────┤
  │ Google Cloud   │ ~$16/1M      │ Word-level (SSML)     │ 4M chars/mes gratis │
  │ TTS            │ chars        │                       │                     │
  ├────────────────┼──────────────┼───────────────────────┼─────────────────────┤
  │ OpenAI TTS     │ $15/1M chars │ ❌ Sin timing         │ No                  │
  ├────────────────┼──────────────┼───────────────────────┼─────────────────────┤
  │ Web Speech API │ Gratis       │ Word-level            │ Siempre gratis      │
  │                │              │ (onboundary)          │                     │
  └────────────────┴──────────────┴───────────────────────┴─────────────────────┘

  Azure y Google tienen tier gratuito generoso y soportan timing por palabra via
  SSML. No es tan preciso como el alignment por carácter de ElevenLabs, pero es
  suficiente para lip sync a nivel de palabra.

  Web Speech API es la opción nuclear: gratis, cero latencia, cero API. Tiene
  onboundary que dispara en cada palabra con su timestamp. La calidad de voz es peor
   pero funciona offline y sin coste.

  ---
  Mi recomendación

  1. Inmediato: cambiar a eleven_turbo_v2_5 — mitad de precio, calidad casi igual,
  un cambio de una línea
  2. Medio plazo: Web Speech API para los comentarios proactivos e idle — son
  secundarios, nadie va a notar tanto la diferencia de voz ahí
  3. Si quieres eliminar ElevenLabs: Azure tiene 500k chars/mes gratis y word-level
  timing — habría que adaptar el lip sync a timestamps por palabra en vez de por
  carácter

  ¿Empezamos por el modelo turbo?
