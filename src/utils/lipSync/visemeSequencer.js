// rAF-based viseme playback engine (framework-agnostic)
export class VisemeSequencer {
  constructor(onVisemeChange) {
    this._onChange = onVisemeChange;
    this._rafId = null;
    this._sequence = [];
    this._index = 0;
    this._elapsed = 0;
    this._lastTimestamp = null;
    this.onComplete = null;
  }

  get isPlaying() {
    return this._rafId !== null;
  }

  play(sequence) {
    this.stop();
    if (!sequence || sequence.length === 0) return;

    this._sequence = sequence;
    this._index = 0;
    this._elapsed = 0;
    this._lastTimestamp = null;
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
    if (this._lastTimestamp === null) {
      this._lastTimestamp = timestamp;
    }

    // Cap delta to 100ms to avoid huge jumps after tab was hidden
    const delta = Math.min(timestamp - this._lastTimestamp, 100);
    this._lastTimestamp = timestamp;
    this._elapsed += delta;

    // Advance through as many entries as elapsed time covers
    while (this._index < this._sequence.length) {
      const entry = this._sequence[this._index];
      if (this._elapsed < entry.duration) break;

      this._elapsed -= entry.duration;
      this._index++;

      if (this._index < this._sequence.length) {
        const next = this._sequence[this._index];
        if (next.type === "viseme") {
          this._onChange(next.value);
        } else {
          this._onChange(0); // pause = mouth closed
        }
      }
    }

    if (this._index >= this._sequence.length) {
      this._rafId = null;
      this._onChange(0);
      if (this.onComplete) this.onComplete();
      return;
    }

    // Apply current entry if we're at the start
    if (this._index === 0 && this._elapsed === 0) {
      const first = this._sequence[0];
      this._onChange(first.type === "viseme" ? first.value : 0);
    }

    this._rafId = requestAnimationFrame(this._tick);
  }
}
