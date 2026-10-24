// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file VelocityTracker.test.ts
 * @input Synthetic finger traces with known velocities
 * @output Each strategy against the true velocity: steady motion, a hard
 *   acceleration, a pause before the lift, noise, sparse samples
 * @position Unit tests of packages/core/src/gestures/VelocityTracker.ts
 */

import {describe, expect, it} from 'vitest';
import {VelocityTracker, type VelocityStrategy} from '../VelocityTracker';

const STRATEGIES: VelocityStrategy[] = ['lsq2', 'iosFling', 'window'];

/** Feed `position(t)` sampled every `step` ms over [0, end]. */
function trace(
  tracker: VelocityTracker,
  position: (t: number) => number,
  end: number,
  step = 8,
): void {
  for (let t = 0; t <= end; t += step) {
    tracker.add(position(t), 0, t);
  }
}

describe('VelocityTracker', () => {
  it.each(STRATEGIES)('%s reads a steady 1000 px/s exactly', strategy => {
    const tracker = new VelocityTracker({strategy});
    trace(tracker, t => t, 200);
    expect(tracker.velocity(200).x).toBeCloseTo(1000, 6);
  });

  it('lsq2 follows a hard acceleration where the window average lags', () => {
    // x = 0.02 t^2 (px, ms): the true velocity at t = 200 is 0.04 * 200 =
    // 8 px/ms = 8000 px/s.
    const position = (t: number) => 0.02 * t * t;
    const lsq = new VelocityTracker({strategy: 'lsq2'});
    const window = new VelocityTracker({strategy: 'window'});
    const ios = new VelocityTracker({strategy: 'iosFling'});
    trace(lsq, position, 200);
    trace(window, position, 200);
    trace(ios, position, 200);
    expect(lsq.velocity(200).x).toBeCloseTo(8000, 3);
    // The two-point average over the window (samples 104..200 ms) reads
    // the middle of it: 0.02 * (104 + 200) px/ms.
    expect(window.velocity(200).x).toBeCloseTo(6080, 3);
    // The iOS weighting leans on older pairs, like a scroll view slowing
    // down under the lift.
    expect(ios.velocity(200).x).toBeLessThan(lsq.velocity(200).x);
  });

  it.each(STRATEGIES)('%s releases nothing after a pause', strategy => {
    const tracker = new VelocityTracker({strategy});
    trace(tracker, t => t * 2, 160);
    expect(tracker.velocity(160 + 41)).toEqual({x: 0, y: 0});
    expect(tracker.velocity(160 + 39).x).not.toBe(0);
  });

  it('ignores motion before a rest inside the horizon', () => {
    const tracker = new VelocityTracker();
    tracker.add(0, 0, 0);
    tracker.add(50, 0, 16);
    // A 50 ms rest, then slow motion: only the slow motion counts.
    tracker.add(50, 0, 66);
    tracker.add(51, 0, 74);
    tracker.add(52, 0, 82);
    expect(tracker.velocity(82).x).toBeCloseTo(125, 3);
  });

  it('keeps lsq2 close to the truth under sample noise', () => {
    const tracker = new VelocityTracker({strategy: 'lsq2'});
    const noise = [
      0.6, -0.4, 0.2, -0.7, 0.5, -0.1, 0.3, -0.5, 0.4, -0.3, 0.1, -0.6, 0.7,
    ];
    noise.forEach((jitter, index) => {
      const t = index * 8;
      tracker.add(t * 1.5 + jitter, 0, t);
    });
    expect(Math.abs(tracker.velocity(96).x - 1500)).toBeLessThan(150);
  });

  it('handles one and two samples, and repeated timestamps', () => {
    const tracker = new VelocityTracker();
    expect(tracker.velocity()).toEqual({x: 0, y: 0});
    tracker.add(0, 0, 0);
    expect(tracker.velocity(0)).toEqual({x: 0, y: 0});
    tracker.add(10, 20, 10);
    expect(tracker.velocity(10)).toEqual({x: 1000, y: 2000});
    // The same timestamp replaces the newest sample.
    tracker.add(20, 20, 10);
    expect(tracker.velocity(10).x).toBeCloseTo(2000, 6);
    // An older timestamp is ignored.
    tracker.add(500, 500, 5);
    expect(tracker.lastSample).toEqual({x: 20, y: 20, time: 10});
  });

  it('keeps at most maxSamples and forgets on reset', () => {
    const tracker = new VelocityTracker({maxSamples: 3});
    trace(tracker, t => t, 80);
    tracker.reset();
    expect(tracker.lastSample).toBeNull();
  });
});
