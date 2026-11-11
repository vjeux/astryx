// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file timedCurveValues.test.ts
 * @input vitest, easedProgress and solveAnimatedPageScroll over a fixed grid
 *   of easings, durations, moves and retarget velocities
 * @output Pins every value those curves give, bit for bit, as one hash per
 *   set: easedProgress's positions and velocities, and the pager's positions
 *   and velocities
 * @position Testing; guards the values that Popover, SegmentedControl and the
 *   pager read from the progress module
 */

import {createHash} from 'node:crypto';
import {describe, expect, it} from 'vitest';
import type {MotionCurve} from '../animator';
import {cubicBezier, type BezierPoints} from '../bezier';
import {solveAnimatedPageScroll} from '../paging';
import {easedProgress} from '../progress';

/** The first 16 hex digits of the SHA-256 of the values as float64. */
function hashOf(values: number[]): string {
  const bytes = new Uint8Array(new Float64Array(values).buffer);
  return createHash('sha256').update(bytes).digest('hex').slice(0, 16);
}

const EASINGS: BezierPoints[] = [
  [0, 0, 1, 1],
  [0.25, 0.1, 0.25, 1],
  [0.42, 0, 1, 1],
  [0, 0, 0.58, 1],
  [0.42, 0, 0.58, 1],
  [0.2, 0, 0, 1],
];

/** 1,005 times across a curve of `duration` seconds, from just before it. */
function timesAcross(duration: number): number[] {
  return Array.from({length: 1005}, (_, i) => ((i - 2) / 1000) * duration);
}

describe('the timed curves keep their values, bit for bit', () => {
  it('easedProgress, for each easing, length and jump setting', () => {
    const steps = (x: number) => Math.floor(4 * x) / 4;
    const values: number[] = [];
    for (const ease of [...EASINGS.map(points => cubicBezier(points)), steps]) {
      for (const seconds of [0, 0.1, 0.2, 0.3, 0.5]) {
        for (const jumps of [false, true]) {
          const curve: MotionCurve = easedProgress(seconds, ease, {jumps});
          for (const t of timesAcross(seconds)) {
            values.push(curve.at(t), curve.velocity(t));
          }
        }
      }
    }
    expect(values).toHaveLength(140_700);
    expect(hashOf(values)).toBe('e0dc2c4f1f0daee6');
  });

  // From rest, a pager curve's velocity at its start is the case
  // `paging.test.ts` pins: every other value is here.
  it('the pager, for each curve, duration, move and retarget velocity', () => {
    const positions: number[] = [];
    const velocities: number[] = [];
    for (const curve of EASINGS) {
      for (const durationMs of [150, 300]) {
        for (const [from, to] of [
          [0, 402],
          [0, 804],
          [0, 2010],
          [804, 402],
          [100, 100],
        ]) {
          for (const velocity of [undefined, 900, -900, 0, 2500]) {
            const move = solveAnimatedPageScroll({
              from,
              to,
              durationMs,
              curve,
              velocity,
            });
            for (const t of timesAcross(move.duration)) {
              positions.push(move.at(t));
              if (t > 0 || velocity != null) {
                velocities.push(move.velocity(t));
              }
            }
          }
        }
      }
    }
    expect(positions).toHaveLength(301_500);
    expect(hashOf(positions)).toBe('e1e70cc3826c653d');
    expect(velocities).toHaveLength(301_320);
    expect(hashOf(velocities)).toBe('5566f63049f35967');
  });
});
