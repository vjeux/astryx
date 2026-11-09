// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file eventTime.test.ts
 * @input vitest, eventTime
 * @output Tests that an event's time is on performance.now()'s clock: a
 *   browser's time stamp as it is, and one in epoch milliseconds moved there
 * @position Unit tests for utils/eventTime.ts
 */

import {describe, expect, it} from 'vitest';
import {eventTime} from './eventTime';

function stamped(timeStamp: number): Event {
  const event = new Event('resize');
  Object.defineProperty(event, 'timeStamp', {value: timeStamp});
  return event;
}

describe('eventTime', () => {
  it("keeps a time stamp on performance.now()'s clock, as a browser stamps events", () => {
    expect(eventTime(stamped(1234.5))).toBe(1234.5);
  });

  it("moves a time stamp in epoch milliseconds onto performance.now()'s clock", () => {
    expect(eventTime(stamped(performance.timeOrigin + 500))).toBeCloseTo(
      500,
      6,
    );
  });
});
