export const VOICE_EFFECTS = {
  natural:  { label: "Natural",  playbackRate: 1.0 },
  chipmunk: { label: "Chipmunk", playbackRate: 1.7 },
  deep:     { label: "Deep",     playbackRate: 0.6 },
  robot:    { label: "Robot",    playbackRate: 1.0 },
  echo:     { label: "Echo",     playbackRate: 1.0 },
};

/**
 * Decodes an audio Blob and plays it through a Web Audio effect chain.
 *
 * @param {Blob} blob
 * @param {string} effectId - key of VOICE_EFFECTS
 * @param {AudioContext} audioCtx
 * @param {() => void} onStart - called when playback actually begins
 * @returns {{ stop: () => void }}
 */
export async function playWithEffect(blob, effectId, audioCtx, onStart, speedMultiplier = 1.0) {
  // iOS suspends AudioContext after inactivity or page-focus loss.
  // Resume before touching any nodes — this is safe to call even if already running.
  if (audioCtx.state !== "running") await audioCtx.resume();

  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.playbackRate.value = (VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0) * speedMultiplier;
  if (speedMultiplier !== 1.0) source.preservesPitch = true;

  const destination = audioCtx.destination;
  let chain = source; // current tail of the effect chain

  if (effectId === "chipmunk") {
    const hpf = audioCtx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 300;
    chain.connect(hpf);
    chain = hpf;

  } else if (effectId === "deep") {
    const lpf = audioCtx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 1800;
    chain.connect(lpf);
    chain = lpf;

  } else if (effectId === "robot") {
    // Ring modulation: multiply signal by a carrier oscillator
    const carrier = audioCtx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.value = 60;
    const ringGain = audioCtx.createGain();
    ringGain.gain.value = 0; // driven by oscillator
    carrier.connect(ringGain.gain);
    carrier.start();

    // Wet (ring mod) path
    chain.connect(ringGain);

    // Dry path at lower volume for clarity
    const dryGain = audioCtx.createGain();
    dryGain.gain.value = 0.3;
    chain.connect(dryGain);

    // Mix both through a merger gain
    const mix = audioCtx.createGain();
    mix.gain.value = 0.8;
    ringGain.connect(mix);
    dryGain.connect(mix);

    // Subtle bandpass to give metallic tone
    const bpf = audioCtx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.value = 1200;
    bpf.Q.value = 0.8;
    mix.connect(bpf);
    chain = bpf;

    source.onended = () => carrier.stop();

  } else if (effectId === "echo") {
    const delay = audioCtx.createDelay(2.0);
    delay.delayTime.value = 0.28;

    const feedback = audioCtx.createGain();
    feedback.gain.value = 0.38;

    const wetGain = audioCtx.createGain();
    wetGain.gain.value = 0.55;

    // Feedback loop: delay → feedback → delay
    delay.connect(feedback);
    feedback.connect(delay);

    // Dry signal direct
    chain.connect(destination);

    // Wet signal through delay
    chain.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(destination);

    // Skip default chain.connect(destination) below
    source.start();
    onStart?.();
    return { stop: () => source.stop() };
  }

  chain.connect(destination);
  source.start();
  onStart?.();

  return { stop: () => { try { source.stop(); } catch {} } };
}

/**
 * Plays an audio Blob using HTMLAudioElement — reliable on iOS Safari/Chrome mobile
 * where AudioContext gets re-suspended between gesture and delayed playback.
 *
 * Robot and echo degrade to natural (DSP requires Web Audio; acceptable tradeoff).
 *
 * @param {Blob} blob
 * @param {string} effectId - key of VOICE_EFFECTS
 * @param {() => void} onStart - called when playback actually begins
 * @param {number} speedMultiplier
 * @returns {{ stop: () => void }}
 */
export function playWithAudioElement(blob, effectId, onStart, speedMultiplier = 1.0) {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);

  const effectRate = VOICE_EFFECTS[effectId]?.playbackRate ?? 1.0;
  // chipmunk/deep: change rate but preserve no pitch shift (same as Web Audio approach)
  audio.playbackRate = effectRate * speedMultiplier;
  // preservesPitch = false lets the pitch shift with rate (same behavior as Web Audio)
  if ("preservesPitch" in audio) audio.preservesPitch = false;
  else if ("mozPreservesPitch" in audio) audio.mozPreservesPitch = false;
  else if ("webkitPreservesPitch" in audio) audio.webkitPreservesPitch = false;

  const cleanup = () => URL.revokeObjectURL(url);

  audio.onplaying = () => {
    console.log("[audioEffects] <audio> playing event fired");
    onStart?.();
  };
  audio.onended = cleanup;
  audio.onerror = (e) => {
    console.error("[audioEffects] <audio> error:", e);
    cleanup();
  };

  audio.play()
    .then(() => console.log("[audioEffects] <audio>.play() resolved"))
    .catch((err) => console.error("[audioEffects] <audio>.play() rejected:", err));

  return { stop: () => { audio.pause(); audio.currentTime = 0; cleanup(); } };
}

/** Creates (or resumes) a shared AudioContext. Call from a user gesture.
 *  On iOS, new AudioContext() starts suspended even inside a gesture —
 *  always call resume() so it's unlocked for the lifetime of the session. */
export function getAudioContext(ref) {
  if (!ref.current) ref.current = new AudioContext();
  if (ref.current.state === "suspended") ref.current.resume();
  return ref.current;
}

/**
 * Fully unlocks an AudioContext on iOS Safari.
 *
 * iOS requires that audio is actually *scheduled* (source.start) within
 * the synchronous user-gesture call stack — not just resume(). Without
 * this, the context may report state === "running" but silently discard
 * any subsequent playback until the next user gesture.
 *
 * Call this in every button handler that will eventually play audio.
 * A 1-sample silent buffer is completely inaudible.
 */
export function unlockAudioContext(ref) {
  const ctx = getAudioContext(ref);
  try {
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch {}
  return ctx;
}
