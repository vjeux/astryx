// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file rideKeyboard.ts
 * @input An animator, target values and a keyboard transition, with its
 *   start and the curve the guide publishes with it
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
 * @example
 * ```
 * guide.subscribe(t => rideKeyboard(dock.animator, {y: -lift(t.to)}, t));
 * ```
 */
export function rideKeyboard(
  animator: Animator,
  to: MotionValues,
  transition: KeyboardTransition,
): MotionHandle | null {
  if (!transition.animated || transition.curve == null) {
    animator.set(to);
    return null;
  }
  // Under Reduce Motion the animator's default applies, so nothing travels.
  // On a touch screen it cross-fades the element to its new place, and
  // elsewhere it moves the element at once.
  const options = {at: transition.start};
  const span = transition.curve.durationMs / 1000;
  const ease = cubicBezier(transition.curve.points);
  const curves: Partial<Record<MotionProperty, MotionCurve>> = {};
  for (const [property, target] of Object.entries(to) as [
    MotionProperty,
    number,
  ][]) {
    const from = animator.get(property, transition.start);
    const at = (t: number) =>
      from + (target - from) * ease(Math.min(1, Math.max(0, t / span)));
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
