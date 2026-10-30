// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file webkitTimeline.test.ts
 * @input Hand-written WebKit Timeline records (no browser)
 * @output `summarizeWebKitTimeline` counts nested records, totals their time
 *   per type, and turns each Paint's quad into a rect at its time
 * @position Unit test of ./webkitTimeline; the browser self-test records a real
 *   timeline in harness.interaction.browser.spec.ts
 */

import {describe, expect, it} from 'vitest';
import {summarizeWebKitTimeline} from './webkitTimeline';

describe('summarizeWebKitTimeline', () => {
  it('counts nested records, totals their time, and gives each paint its rect and time', () => {
    const summary = summarizeWebKitTimeline([
      {
        type: 'RenderingFrame',
        startTime: 10,
        endTime: 10.004,
        children: [
          {type: 'RecalculateStyles', startTime: 10, endTime: 10.001},
          {
            type: 'Paint',
            startTime: 10.002,
            endTime: 10.0025,
            data: {clip: [16, 78, 386, 78, 386, 138, 16, 138]},
          },
        ],
      },
      {
        type: 'Paint',
        startTime: 10.0166,
        endTime: 10.017,
        data: {clip: [0, 0, 402, 0, 402, 714, 0, 714]},
      },
    ]);
    expect(summary.counts).toEqual({
      RenderingFrame: 1,
      RecalculateStyles: 1,
      Paint: 2,
    });
    expect(summary.totalMs.RenderingFrame).toBeCloseTo(4, 6);
    expect(summary.totalMs.Paint).toBeCloseTo(0.9, 6);
    expect(summary.paints).toEqual([
      {t: expect.closeTo(2, 6), rect: {x: 16, y: 78, width: 370, height: 60}},
      {t: expect.closeTo(16.6, 6), rect: {x: 0, y: 0, width: 402, height: 714}},
    ]);
  });

  it('reads nothing into a record with no time or no clip', () => {
    const summary = summarizeWebKitTimeline([
      {type: 'Paint'},
      {type: 'Layout', startTime: 1, endTime: 1.002},
    ]);
    expect(summary.counts).toEqual({Paint: 1, Layout: 1});
    expect(summary.totalMs).toEqual({Layout: expect.closeTo(2, 6)});
    expect(summary.paints).toEqual([]);
  });
});
