// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file eventTime.ts
 * @input A DOM event
 * @output `eventTime(event)`: the event's time on `performance.now()`'s clock
 * @position A shared utility: the gesture host and the keyboard height module
 *   compare event times with `performance.now()`
 */

/**
 * An event's time on `performance.now()`'s clock. Some engines and DOM
 * emulators stamp events in epoch milliseconds instead.
 */
export function eventTime(event: Event): number {
  const time = event.timeStamp;
  if (
    time > 1e12 &&
    typeof performance !== 'undefined' &&
    performance.timeOrigin > 0
  ) {
    return time - performance.timeOrigin;
  }
  return time;
}
