// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PressTracker.test.ts
 * @input A PressTracker fed through a GestureArena by synthetic touches
 * @output UIControl semantics: events, the expanded tracking bounds, the
 *   highlight timing inside and outside scrollers, cancellation
 * @position Unit tests of packages/core/src/gestures/PressTracker.ts
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {UIKIT_GESTURES} from '../../motion/uikit/gestures';
import {PanGestureRecognizer} from '../PanGestureRecognizer';
import {PressTracker, type ControlEvent} from '../PressTracker';
import {createHarness, scrollProbe} from './harness';

const BOUNDS = {left: 100, top: 100, right: 200, bottom: 140};
const EXPANSION = UIKIT_GESTURES.control.trackingExpansion.value;
const DELAY = UIKIT_GESTURES.press.contentTouchDelay.value;
const FLASH = UIKIT_GESTURES.press.quickTapFlash.value;

function setup() {
  const events: ControlEvent[] = [];
  const highlights: boolean[] = [];
  const tracker = new PressTracker({
    getBounds: () => BOUNDS,
    onControlEvent: event => events.push(event),
    onHighlightChange: value => highlights.push(value),
  });
  return {events, highlights, tracker, h: createHarness()};
}

describe('PressTracker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('highlights in the same frame outside a scroller and acts on touch up inside', () => {
    const {events, highlights, tracker, h} = setup();
    h.finger(1).down(150, 120, 0, {recognizers: [], consumer: tracker});
    expect(highlights).toEqual([true]);
    h.finger(1).move(152, 121, 16);
    h.finger(1).up(80);
    expect(events).toEqual(['touchDown', 'touchDragInside', 'touchUpInside']);
    expect(highlights).toEqual([true, false]);
  });

  it('keeps tracking inside the expanded bounds and exits past them', () => {
    const {events, highlights, tracker, h} = setup();
    const finger = h.finger(1).down(150, 120, 0, {
      recognizers: [],
      consumer: tracker,
    });
    finger.move(200 + EXPANSION, 120, 16);
    expect(tracker.isTouchInside).toBe(true);
    finger.move(200 + EXPANSION + 1, 120, 32);
    expect(tracker.isTouchInside).toBe(false);
    finger.move(150, 120, 48);
    finger.up(64, 200 + EXPANSION + 10, 120);
    expect(events).toEqual([
      'touchDown',
      'touchDragInside',
      'touchDragExit',
      'touchDragOutside',
      'touchDragEnter',
      'touchDragInside',
      'touchUpOutside',
    ]);
    expect(highlights).toEqual([true, false, true, false]);
  });

  it('waits the content-touch delay inside a scroller, and flashes a quicker tap', () => {
    const {highlights, tracker, h} = setup();
    const probe = scrollProbe(() => true, true);
    h.finger(1).down(150, 120, 0, {
      recognizers: [],
      consumer: tracker,
      scroll: probe,
    });
    expect(highlights).toEqual([]);
    vi.advanceTimersByTime(DELAY - 1);
    expect(highlights).toEqual([]);
    vi.advanceTimersByTime(1);
    expect(highlights).toEqual([true]);
    h.finger(1).up(400);
    expect(highlights).toEqual([true, false]);

    const quick = setup();
    quick.h.finger(1).down(150, 120, 0, {
      recognizers: [],
      consumer: quick.tracker,
      scroll: probe,
    });
    quick.h.finger(1).up(60);
    expect(quick.highlights).toEqual([true]);
    vi.advanceTimersByTime(FLASH);
    expect(quick.highlights).toEqual([true, false]);
  });

  it('never paints a pending press whose finger travelled (a flick)', () => {
    const {highlights, tracker, h} = setup();
    const probe = scrollProbe(() => true, true);
    h.finger(1).down(150, 120, 0, {
      recognizers: [],
      consumer: tracker,
      scroll: probe,
    });
    h.finger(1).move(150, 140, 20);
    vi.advanceTimersByTime(DELAY * 2);
    expect(highlights).toEqual([]);
  });

  it('is cancelled, with no release, when a recognizer takes the touch', () => {
    const {events, highlights, tracker, h} = setup();
    const pan = new PanGestureRecognizer({name: 'pan'});
    h.finger(1).down(150, 120, 0, {recognizers: [pan], consumer: tracker});
    h.finger(1).move(175, 120, 16);
    expect(events).toEqual(['touchDown', 'touchCancel']);
    expect(highlights).toEqual([true, false]);
  });

  it('is cancelled when the browser takes the touch to scroll', () => {
    const {events, tracker, h} = setup();
    h.finger(1).down(150, 120, 0, {recognizers: [], consumer: tracker});
    h.finger(1).takenByBrowser(30);
    expect(events).toEqual(['touchDown', 'touchCancel']);
    expect(tracker.isTracking).toBe(false);
  });

  it('tracks one finger at a time', () => {
    const {events, tracker, h} = setup();
    h.finger(1).down(150, 120, 0, {recognizers: [], consumer: tracker});
    h.finger(2).down(160, 120, 10, {recognizers: [], consumer: tracker});
    h.finger(2).up(20);
    h.finger(1).up(30);
    expect(events).toEqual(['touchDown', 'touchUpInside']);
  });
});
