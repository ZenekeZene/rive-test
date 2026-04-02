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

/** Creates (or resumes) a shared AudioContext. Call from a user gesture. */
export function getAudioContext(ref) {
  if (!ref.current) {
    ref.current = new AudioContext();
  } else if (ref.current.state === "suspended") {
    ref.current.resume();
  }
  return ref.current;
}
