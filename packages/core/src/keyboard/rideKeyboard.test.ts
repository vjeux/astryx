// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file rideKeyboard.test.ts
 * @input vitest, rideKeyboard, a stand-in animator
 * @output Tests that a ride plays the curve the transition publishes, from
 *   the transition's start, takes an entry, and lands a jump at once
 * @position Unit tests for keyboard/rideKeyboard.ts
 */

import {describe, expect, it, vi} from 'vitest';
import type {Animator} from '../motion/animator';
import {keyboard as androidKeyboard} from '../motion/android';
import {cubicBezier} from '../motion/bezier';
import type {KeyboardTransition} from './keyboardModel';
import {rideKeyboard} from './rideKeyboard';

function standInAnimator() {
  const handle = {finished: Promise.resolve(true)};
  return {
    animate: vi.fn(() => handle),
    play: vi.fn(() => handle),
    set: vi.fn(),
    get: vi.fn(() => 0),
  };
}

const transition = (
  overrides: Partial<KeyboardTransition>,
): KeyboardTransition => ({
  kind: 'show',
  from: 0,
  to: 300,
  start: 1000,
  velocity: 0,
  animated: true,
  predicted: false,
  curve: null,
  ...overrides,
});

describe('rideKeyboard', () => {
  it('plays the eased slide the transition publishes where it has one', () => {
    const animator = standInAnimator();

    rideKeyboard(
      animator as unknown as Animator,
      {y: -300},
      transition({
        curve: {
          durationMs: androidKeyboard.showMs,
          points: androidKeyboard.showCurve,
        },
      }),
    );

    expect(animator.animate).not.toHaveBeenCalled();
    expect(animator.play).toHaveBeenCalledTimes(1);
    const [curves, options] = animator.play.mock.calls[0] as unknown as [
      Record<string, {duration: number; at: (t: number) => number}>,
      {at: number},
    ];
    expect(options).toEqual({at: 1000});
    expect(curves.y.duration).toBeCloseTo(androidKeyboard.showMs / 1000, 9);
    expect(curves.y.at(curves.y.duration)).toBe(-300);
  });

  it("plays the transition's own curve, even a show published with the hide slide", () => {
    const animator = standInAnimator();

    rideKeyboard(
      animator as unknown as Animator,
      {y: -300},
      transition({
        kind: 'show',
        curve: {
          durationMs: androidKeyboard.hideMs,
          points: androidKeyboard.hideCurve,
        },
      }),
    );

    const [curves] = animator.play.mock.calls[0] as unknown as [
      Record<string, {duration: number; at: (t: number) => number}>,
    ];
    expect(curves.y.duration).toBeCloseTo(androidKeyboard.hideMs / 1000, 9);
  });

  it('with an entry, reaches its distance from the target within the entry, then follows the slide', () => {
    const animator = standInAnimator();
    animator.get.mockReturnValue(300);
    vi.spyOn(performance, 'now').mockReturnValue(1025);

    rideKeyboard(
      animator as unknown as Animator,
      {y: 0},
      transition({
        curve: {
          durationMs: androidKeyboard.showMs,
          points: androidKeyboard.showCurve,
        },
      }),
      {within: 40, durationMs: 50},
    );

    const [curves, options] = animator.play.mock.calls[0] as unknown as [
      Record<string, {duration: number; at: (t: number) => number}>,
      {at: number; crossfadeAs?: string},
    ];
    expect(options).toEqual({at: 1000, crossfadeAs: 'entrance'});
    const slide = (t: number) =>
      300 *
      (1 -
        cubicBezier(androidKeyboard.showCurve)(
          Math.min(1, t / (androidKeyboard.showMs / 1000)),
        ));
    expect(curves.y.at(0.025)).toBeCloseTo(slide(0.025), 6);
    expect(curves.y.at(0.075)).toBeCloseTo(40, 6);
    expect(curves.y.at(0.05)).toBeLessThan(slide(0.05));
    const late = androidKeyboard.showMs / 1000 - 0.02;
    expect(slide(late)).toBeLessThan(40);
    expect(curves.y.at(late)).toBeCloseTo(slide(late), 6);
    expect(curves.y.at(curves.y.duration)).toBe(0);
    vi.restoreAllMocks();
  });

  it('starts the entry at the time the next frames draw at, which can trail the call', () => {
    const animator = standInAnimator();
    animator.get.mockReturnValue(300);
    vi.spyOn(performance, 'now').mockReturnValue(1100);
    Object.defineProperty(document, 'timeline', {
      configurable: true,
      value: {currentTime: 1010},
    });

    rideKeyboard(
      animator as unknown as Animator,
      {y: 0},
      transition({
        curve: {
          durationMs: androidKeyboard.showMs,
          points: androidKeyboard.showCurve,
        },
      }),
      {within: 40, durationMs: 50},
    );

    const [curves] = animator.play.mock.calls[0] as unknown as [
      Record<string, {at: (t: number) => number}>,
    ];
    expect(curves.y.at(0.06)).toBeCloseTo(40, 6);
    Reflect.deleteProperty(document, 'timeline');
    vi.restoreAllMocks();
  });

  it('without an entry, leaves Reduce Motion to the animator default', () => {
    const animator = standInAnimator();

    rideKeyboard(
      animator as unknown as Animator,
      {y: 0},
      transition({
        curve: {
          durationMs: androidKeyboard.showMs,
          points: androidKeyboard.showCurve,
        },
      }),
    );

    const [, options] = animator.play.mock.calls[0] as unknown as [
      unknown,
      Record<string, unknown>,
    ];
    expect(options).toEqual({at: 1000});
  });

  it('lands at once when the keyboard jumps', () => {
    const animator = standInAnimator();

    expect(
      rideKeyboard(
        animator as unknown as Animator,
        {y: -300},
        transition({animated: false}),
      ),
    ).toBeNull();
    expect(animator.set).toHaveBeenCalledWith({y: -300});
    expect(animator.animate).not.toHaveBeenCalled();
  });
});
