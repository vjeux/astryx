// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file rideKeyboard.ts
 * @input An animator, target values and a keyboard transition, with its
 *   start and the curve the guide publishes with it, and an optional entry
 * @output rideKeyboard, which moves an element with the keyboard on the
 *   keyboard's own motion
 * @position Keyboard module, internal to core. A guide subscriber calls it
 *   for each transition, as BottomSheet's hook does.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

import type {
  Animator,
  MotionCurve,
  MotionHandle,
  MotionProperty,
  MotionValues,
} from '../motion/animator';
import {cubicBezier} from '../motion/bezier';
import type {KeyboardTransition} from './keyboardModel';

/**
 * How close to its target a ride brings the element within its first
 * milliseconds, ahead of the slide where the slide is slower.
 */
export interface RideEntry {
  /** The largest distance from the target once the entry ends. */
  readonly within: number;
  /** How long the entry takes, from the call. */
  readonly durationMs: number;
}

/**
 * Moves `animator`'s element to `to` with the keyboard: on its curve from
 * `transition.start`, or at once when the keyboard jumps.
 *
 * Android's keyboard moves on Gboard's slides up and down
 * (motion/android/keyboard.ts). The transition publishes the slide
 * (`curve`), and the ride plays it. Every ride starts at the transition's
 * start, so content that joins a slide late lands where the keyboard is. A
 * transition that is not animated, such as a keyboard changing while up,
 * lands at once. These values are the keyboard's own motion, with no motion
 * role. The system moves the keyboard on them whatever the page does, so any
 * other curve would leave the element out of step.
 *
 * With an `entry`, the element also eases to within `entry.within` of its
 * target over `entry.durationMs` from the call. It follows whichever of the
 * two is closer to the target. Under Reduce Motion an entry lands the element
 * at once and fades it in, so it never waits away from its target.
 *
 * @example
 * ```
 * guide.subscribe(t => rideKeyboard(dock.animator, {y: -lift(t.to)}, t));
 * ```
 */
export function rideKeyboard(
  animator: Animator,
  to: MotionValues,
  transition: KeyboardTransition,
  entry?: RideEntry,
): MotionHandle | null {
  if (!transition.animated || transition.curve == null) {
    animator.set(to);
    return null;
  }
  // Under Reduce Motion the animator's default applies, so nothing travels.
  // On a touch screen it cross-fades the element to its new place, and
  // elsewhere it moves the element at once.
  const options =
    entry == null
      ? {at: transition.start}
      : {at: transition.start, crossfadeAs: 'entrance' as const};
  const span = transition.curve.durationMs / 1000;
  const ease = cubicBezier(transition.curve.points);
  const called = (timelineNow() - transition.start) / 1000;
  const curves: Partial<Record<MotionProperty, MotionCurve>> = {};
  for (const [property, target] of Object.entries(to) as [
    MotionProperty,
    number,
  ][]) {
    const from = animator.get(property, transition.start);
    const slide = (t: number) =>
      from + (target - from) * ease(Math.min(1, Math.max(0, t / span)));
    const enter =
      entry == null ? null : entryCurve(from, target, entry, called);
    const at = (t: number) => {
      const onSlide = slide(t);
      if (enter == null) {
        return onSlide;
      }
      const entered = enter(t);
      return Math.abs(entered - target) < Math.abs(onSlide - target)
        ? entered
        : onSlide;
    };
    curves[property] = {
      duration: span,
      at,
      velocity: t => {
        if (t >= span) {
          return 0;
        }
        const a = Math.max(0, t - 0.001);
        const b = Math.min(span, t + 0.001);
        return (at(b) - at(a)) / (b - a);
      },
    };
  }
  return animator.play(curves, options);
}

// The time the next frames draw at. After a busy task it can trail
// `performance.now()` by many milliseconds. Starting the entry on it finishes
// the entry by the first frame that shows the ride.
function timelineNow(): number {
  const time =
    typeof document === 'undefined' ? null : document.timeline?.currentTime;
  return typeof time === 'number' ? time : performance.now();
}

// From `from` at `start` (seconds on the ride's clock), an ease-out to within
// `entry.within` of `target` over `entry.durationMs`.
function entryCurve(
  from: number,
  target: number,
  entry: RideEntry,
  start: number,
): (t: number) => number {
  const gap = from - target;
  const end = target + Math.sign(gap) * Math.min(Math.abs(gap), entry.within);
  const span = entry.durationMs / 1000;
  return t => {
    const p = Math.min(1, Math.max(0, (t - start) / span));
    return from + (end - from) * (1 - (1 - p) * (1 - p));
  };
}
