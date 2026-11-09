// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file wheelEnd.harness.test.ts
 * @input GestureHost's trackpad scroll end pauses, and the interaction
 *   harness's copy and burst judge
 * @output Checks that the harness ends a wheel burst's gesture where
 *   GestureHost ends a trackpad scroll: at the same pause on each axis, and
 *   at a gap of that pause or more
 * @position Testing. The harness copies the pauses because it cannot import
 *   Core. This test keeps the two equal.
 *
 * SYNC: When modified, update
 *   /internal/interaction-harness/src/webInput.ts (`WHEEL_SCROLL_END_MS`).
 */

import {
  WHEEL_SCROLL_END_MS,
  wheelGapCauses,
} from '@astryxdesign/interaction-harness';
import {describe, expect, it} from 'vitest';
import {WHEEL_FOLLOW_END_MS, WHEEL_FOLLOW_END_V_MS} from '../GestureHost';

describe("the interaction harness's wheel scroll end", () => {
  it('pauses as long as GestureHost on each axis', () => {
    expect(WHEEL_SCROLL_END_MS).toEqual({
      vertical: WHEEL_FOLLOW_END_V_MS,
      horizontal: WHEEL_FOLLOW_END_MS,
    });
  });

  it('ends the gesture at a gap of the pause or more, as GestureHost does', () => {
    for (const pause of Object.values(WHEEL_SCROLL_END_MS)) {
      expect(
        wheelGapCauses('chromium', [0, pause], [Number.NaN, Number.NaN], pause)
          .dispatchStalls,
      ).toEqual([pause]);
      expect(
        wheelGapCauses(
          'chromium',
          [0, pause - 0.5],
          [Number.NaN, Number.NaN],
          pause,
        ).dispatchStalls,
      ).toEqual([]);
    }
  });
});
