// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file swipeMotion.test.ts
 * @input vitest with faked frames and timers; swipeMotion.ts
 * @output A motion writes the travel on the root on every frame from the
 *   curve it plays (from rest at the next frame, a continuing one from `at`),
 *   ends exactly where the curve ends, tells an interrupted call it did not
 *   finish, and under Reduce Motion lands at once or at the bottom of an
 *   opacity dip
 * @position Unit tests of packages/core/src/Item/swipeMotion.ts; the swipe
 *   itself is tested through Item.test.tsx and the interaction spec
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  createSwipeMotion,
  SWIPE_TRAVEL_PROPERTY,
  type SwipeCurve,
} from './swipeMotion';

/** A straight line from `from` to `to` over `duration` seconds. */
function line(from: number, to: number, duration: number): SwipeCurve {
  return {
    duration,
    at: t => from + ((to - from) * Math.min(t, duration)) / duration,
    velocity: t => (t >= duration ? 0 : (to - from) / duration),
  };
}

const travelOf = (root: HTMLElement) =>
  root.style.getPropertyValue(SWIPE_TRAVEL_PROPERTY);

describe('createSwipeMotion', () => {
  let root: HTMLElement;
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'performance',
      ],
    });
    root = document.createElement('div');
    document.body.append(root);
  });
  afterEach(() => {
    root.remove();
    vi.useRealTimers();
  });

  it('starts a motion from rest at the next frame and writes the curve at every frame, ending exactly at its end', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    const handle = motion.play({x: line(0, 100, 0.1)});
    // Nothing is written before a frame starts it.
    expect(travelOf(root)).toBe('');
    expect(motion.isMoving('x')).toBe(false);
    vi.advanceTimersByTime(16);
    const started = await handle.started;
    expect(motion.isMoving('x')).toBe(true);
    vi.advanceTimersByTime(48);
    const at = performance.now();
    // The last frame wrote the line at its own time.
    expect(parseFloat(travelOf(root))).toBeGreaterThan(0);
    expect(parseFloat(travelOf(root))).toBeLessThan(100);
    expect(motion.get('x', at)).toBeCloseTo(((at - started) / 100) * 100, 6);
    vi.advanceTimersByTime(100);
    expect(travelOf(root)).toBe('100px');
    expect(await handle.finished).toBe(true);
    expect(motion.isMoving('x')).toBe(false);
    expect(motion.get('x')).toBe(100);
  });

  it('starts a motion that continues one at `at`, so the next frame picks up where the row is', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    const at = performance.now() - 50;
    const handle = motion.play({x: line(0, 100, 0.1)}, {at});
    expect(await handle.started).toBe(at);
    vi.advanceTimersByTime(16);
    // Half the line had passed when the call was made.
    expect(parseFloat(travelOf(root))).toBeGreaterThan(50);
  });

  it('tells a call that another one or a set interrupted it, and leaves the row where it was', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    const first = motion.play({x: line(0, 100, 0.2)});
    vi.advanceTimersByTime(80);
    const here = motion.get('x');
    const second = motion.play(
      {x: line(here, 0, 0.2)},
      {at: performance.now()},
    );
    expect(await first.finished).toBe(false);
    vi.advanceTimersByTime(16);
    expect(parseFloat(travelOf(root))).toBeLessThanOrEqual(here);
    motion.set({x: 30});
    expect(await second.finished).toBe(false);
    expect(travelOf(root)).toBe('30px');
    expect(motion.get('x')).toBe(30);
    expect(motion.velocity('x')).toBe(0);
  });

  it('under Reduce Motion lands at once when the fade is instant', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    const handle = motion.play(
      {x: line(0, 72, 0.3)},
      {fade: {duration: 0, easing: 'linear'}},
    );
    expect(travelOf(root)).toBe('72px');
    expect(await handle.finished).toBe(true);
  });

  it('under Reduce Motion writes the values at the bottom of the dip, never travelling, and finishes when the dip ends', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    const handle = motion.play(
      {x: line(0, 72, 0.3)},
      {fade: {duration: 200, easing: 'linear'}},
    );
    let finished: boolean | null = null;
    void handle.finished.then(value => {
      finished = value;
    });
    vi.advanceTimersByTime(99);
    expect(travelOf(root)).toBe('');
    vi.advanceTimersByTime(1);
    expect(travelOf(root)).toBe('72px');
    await Promise.resolve();
    expect(finished).toBeNull();
    vi.advanceTimersByTime(100);
    await Promise.resolve();
    expect(finished).toBe(true);
  });

  it('under Reduce Motion shortens the fade back in by however late the landing ran, so the dip still ends when it was due', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    const handle = motion.play(
      {x: line(0, 72, 0.3)},
      {fade: {duration: 200, easing: 'linear'}},
    );
    let finished: boolean | null = null;
    void handle.finished.then(value => {
      finished = value;
    });
    // A busy main thread runs the landing 60 ms late.
    const now = performance.now();
    const clock = vi
      .spyOn(performance, 'now')
      .mockImplementation(() => now + 160);
    vi.advanceTimersByTime(100);
    clock.mockRestore();
    expect(travelOf(root)).toBe('72px');
    vi.advanceTimersByTime(40);
    await Promise.resolve();
    expect(finished).toBe(true);
  });

  it('gives the root back its own styles when disposed, and tells a pending call it did not finish', async () => {
    const motion = createSwipeMotion();
    motion.attach(root);
    motion.set({x: 40});
    expect(travelOf(root)).toBe('40px');
    const handle = motion.play({x: line(40, 0, 0.2)});
    motion.dispose();
    expect(travelOf(root)).toBe('');
    expect(await handle.finished).toBe(false);
  });

  it('writes where the row is when it attaches to a root', () => {
    const motion = createSwipeMotion();
    motion.set({x: 25});
    motion.attach(root);
    expect(travelOf(root)).toBe('25px');
  });
});
