// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file velocity.ts
 * @input Finger samples (event timestamp, clientY)
 * @output Release velocity, px/s (positive = finger moving down)
 * @position Spike only
 *
 * The finger's speed over its last stretch (100 ms), on the input events'
 * own timestamps: a release judged by the last two samples would let one
 * slow sample cancel a throw, and a finger that rested before lifting
 * released nothing.
 */

const WINDOW_MS = 100;

export class VelocityTracker {
  private samples: Array<[number, number]> = [];

  reset(): void {
    this.samples = [];
  }

  add(t: number, y: number): void {
    const last = this.samples[this.samples.length - 1];
    if (last != null && t < last[0]) {
      return;
    }
    if (last != null && t === last[0]) {
      last[1] = y;
      return;
    }
    this.samples.push([t, y]);
    while (this.samples.length > 2 && t - this.samples[0][0] > WINDOW_MS * 2) {
      this.samples.shift();
    }
  }

  /** px/s at `releaseT`; 0 when the finger rested for the whole window. */
  velocity(releaseT: number): number {
    const recent = this.samples.filter(([t]) => releaseT - t <= WINDOW_MS);
    if (recent.length < 2) {
      return 0;
    }
    const [t0, y0] = recent[0];
    const [t1, y1] = recent[recent.length - 1];
    const dt = t1 - t0;
    return dt > 0 ? ((y1 - y0) / dt) * 1000 : 0;
  }

  count(): number {
    return this.samples.length;
  }
}
