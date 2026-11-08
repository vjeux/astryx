// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file VelocityTracker.timeWeighted.scratch.test.ts
 * @input VelocityTracker and a time-weighted variant of its filter
 * @output NOT FOR LANDING. The release each filter reads on UIKit's recorded
 *   "200 pt in 50 ms" picker swipe and on a slow-start three-move flick
 * @position Evidence for a record note; never part of the suite
 */

import {describe, expect, it} from 'vitest';
import {VelocityTracker} from '../VelocityTracker';

/** One 60 Hz frame, ms: the cadence UIKit's per-event weights assume. */
const FRAME = 1000 / 60;

/**
 * The time-weighted variant: UIKit's blend over frame-long blocks of the
 * path, counted back from the last move. Positions between samples are
 * linear; before the first sample, the first interval's velocity holds.
 */
function timeWeightedScroll(samples: ReadonlyArray<readonly [number, number]>) {
  const last = samples[samples.length - 1];
  const at = (t: number): number => {
    if (t <= samples[0][0]) {
      const [[t0, x0], [t1, x1]] = samples;
      return x0 + ((x1 - x0) * (t - t0)) / (t1 - t0);
    }
    for (let i = samples.length - 1; i > 0; i--) {
      const [ta, xa] = samples[i - 1];
      const [tb, xb] = samples[i];
      if (t >= ta) {
        return xa + ((xb - xa) * (t - ta)) / (tb - ta);
      }
    }
    return last[1];
  };
  const block = (k: number) =>
    ((at(last[0] - k * FRAME) - at(last[0] - (k + 1) * FRAME)) / FRAME) * 1000;
  return 0.05 * block(0) + 0.35 * block(1) + 0.6 * block(2);
}

function uikitScroll(samples: ReadonlyArray<readonly [number, number]>) {
  const tracker = new VelocityTracker();
  for (const [t, x] of samples) {
    tracker.add(x, 0, t);
  }
  return tracker.scrollVelocity(samples[samples.length - 1][0]).x;
}

describe('a time-weighted filter against UIKit (NOT FOR LANDING)', () => {
  it('reads UIKit\'s "200 pt in 50 ms" picker swipe at 1,821 px/s, where UIKit reads 933', () => {
    const swipe = [
      [0, 368],
      [46.48, 334.67],
      [72.92, 201.33],
    ] as const;
    expect(-uikitScroll(swipe)).toBeCloseTo(933.4, 0);
    expect(-timeWeightedScroll(swipe)).toBeCloseTo(1821.3, 0);
  });

  it('reads the slow-start three-move flick at 497 px/s, where UIKit reads 306', () => {
    const flick = [
      [0, 0],
      [20, -2],
      [40, -10],
      [60, -52.2],
    ] as const;
    expect(-uikitScroll(flick)).toBeCloseTo(305.5, 0);
    expect(-timeWeightedScroll(flick)).toBeCloseTo(497.2, 0);
  });
});
