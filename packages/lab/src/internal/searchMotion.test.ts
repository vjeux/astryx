// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file searchMotion.test.ts
 * @input vitest, Lab's search-bar values and Core's UIKit timing table
 * @output The search table's values agree with each other and with the
 *   frames they were read from. The activation runs on UIKit's
 *   ease-in-ease-out. The stacked field narrows to 315 pt beside its close
 *   button on a 402 pt screen.
 * @position Testing; validates searchMotion.ts without a browser
 */

import {describe, expect, it} from 'vitest';
import {timing} from '@astryxdesign/core/internal/touch';
import {search} from './searchMotion';

describe('UIKit search table', () => {
  it('activates over 383 ms on UIKit’s ease-in-ease-out, the timing.curves.move role', () => {
    // The animator's UICubicTimingParameters, read at setup, are the role's
    // control points; the table keeps no copy of the curve.
    expect(timing.curves.move).toEqual([0.42, 0, 0.58, 1]);
    expect('activationCurve' in search).toBe(false);
    expect(search.activationMs).toBeCloseTo(383.3, 1);
  });

  it('holds no Reduce Motion setting: design:reduced-motion decides', () => {
    expect('reducedMotion' in search).toBe(false);
  });

  it('narrows the stacked field to 315 pt beside the close button on a 402 pt screen', () => {
    const {fieldInset, closeGap, closeSize} = search.stacked;
    const rest = 402 - 2 * fieldInset;
    expect(rest).toBe(370);
    expect(rest - closeGap - closeSize).toBe(315);
    // The close button ends at the trailing inset (x 342 + 44 = 386).
    expect(402 - fieldInset - closeSize).toBe(342);
  });
});
