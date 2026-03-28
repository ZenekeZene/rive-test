// rAF-based viseme playback engine (framework-agnostic)
export class VisemeSequencer {
  constructor(onVisemeChange) {
    this._onChange = onVisemeChange;
    this._rafId = null;
    this._sequence = [];
    this._index = 0;
    this._elapsed = 0;
    this._lastTimestamp = null;
    this._audioCtx = null;
    this._startTime = null;
    this.onComplete = null;
  }

  get isPlaying() {
    return this._rafId !== null;
  }

  play(sequence, audioCtx, audioStartTime = null) {
    this.stop();
    if (!sequence || sequence.length === 0) return;

    this._sequence = sequence;
    this._audioCtx = audioCtx || null;
    this._startTime = audioStartTime ?? (audioCtx ? audioCtx.currentTime : null);
    this._index = 0;
    this._elapsed = 0;
    this._lastTimestamp = null;

    // Apply first viseme immediately — don't wait one rAF frame
    const first = sequence[0];
    this._onChange(first.type === "viseme" ? first.value : 0);

    this._tick = this._tick.bind(this);
    this._rafId = requestAnimationFrame(this._tick);
  }

  stop() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this._onChange(0); // close mouth
  }

  _tick(timestamp) {
    if (this._audioCtx) {
      // ── AudioContext mode: absolute time, no drift ──────────────────────────
      const elapsedMs = (this._audioCtx.currentTime - this._startTime) * 1000;

      // Scan forward to find the correct position in the sequence
      let cumulative = 0;
      let idx = 0;
      while (idx < this._sequence.length && cumulative + this._sequence[idx].duration <= elapsedMs) {
        cumulative += this._sequence[idx].duration;
        idx++;
      }

      // Apply viseme only if the position changed
      if (idx !== this._index && idx < this._sequence.length) {
        const entry = this._sequence[idx];
        this._onChange(entry.type === "viseme" ? entry.value : 0);
      }
      this._index = idx;

    } else {
      // ── Legacy delta mode (used by speak() without AudioContext) ─────────────
      if (this._lastTimestamp === null) {
        this._lastTimestamp = timestamp;
      }

      const delta = Math.min(timestamp - this._lastTimestamp, 100);
      this._lastTimestamp = timestamp;
      this._elapsed += delta;

      while (this._index < this._sequence.length) {
        const entry = this._sequence[this._index];
        if (this._elapsed < entry.duration) break;

        this._elapsed -= entry.duration;
        this._index++;

        if (this._index < this._sequence.length) {
          const next = this._sequence[this._index];
          this._onChange(next.type === "viseme" ? next.value : 0);
        }
      }

      if (this._index === 0 && this._elapsed === 0) {
        const first = this._sequence[0];
        this._onChange(first.type === "viseme" ? first.value : 0);
      }
    }

    if (this._index >= this._sequence.length) {
      this._rafId = null;
      this._onChange(0);
      if (this.onComplete) this.onComplete();
      return;
    }

    this._rafId = requestAnimationFrame(this._tick);
  }
}
