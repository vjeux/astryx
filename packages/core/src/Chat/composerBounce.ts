// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file composerBounce.ts
 * @input The keyboard's spring motion role, the spring solver, the shared
 *   animator, Core's Reduced Motion policy, a finger's speed and the bounce's
 *   maximum depth
 * @output bounceComposer: one small spring bounce of the layer that holds the
 *   composer
 * @position Internal to Chat. ChatLayout plays it on the bounce layer inside
 *   its dock container as a drag dismisses the keyboard. So the composer, the
 *   frosted layer and the scroll-to-bottom button move as one, inside the
 *   keyboard's ride of the dock container.
 */

import {
  animatorFor,
  type Animator,
  type MotionHandle,
} from '../motion/animator';
import {reducedMotionFade} from '../motion/reducedMotion';
import {resolveMotion} from '../motion/resolveMotion';
import {solveSpring, toSpring} from '../motion/spring';
import {springs} from '../motion/uikit/springs';

/** A frame at the display rate the animator assumes, in ms. */
const FRAME_MS = 1000 / 60;

/**
 * The bounce ends where it is this close to rest, in px. This is the
 * animator's sample tolerance: a quarter of a CSS pixel, below what a moving
 * element can show.
 */
const REST_PX = 0.25;

/** As in the animator, a curve that has not settled by then stops, in ms. */
const MAX_DURATION_MS = 30_000;

/**
 * Bounces `layer` down and back to rest on the keyboard's spring, once. It
 * starts at the finger's speed, so it never moves faster than the finger, and
 * goes no deeper than `maxDepth` px. It plays through the layer's animator,
 * from where the layer is drawn, so a second bounce takes over the first with
 * no jump. Under Reduce Motion, the person's setting or a theme's mark,
 * nothing moves. Returns the bounce's motion, or null when nothing plays.
 */
export function bounceComposer(
  layer: HTMLElement,
  fingerSpeed: number,
  maxDepth: number,
  animator: Animator = animatorFor(layer),
): MotionHandle | null {
  // The bounce follows a touch drag's release; under Reduce Motion it is no
  // change to fade, so nothing plays.
  if (
    typeof layer.animate !== 'function' ||
    reducedMotionFade(layer, {touchRelease: true}) != null
  ) {
    return null;
  }
  const spring = toSpring(resolveMotion(layer, springs.keyboard));
  // The depth a start at 1 px/s reaches, where the curve first turns back: a
  // faster start scales the whole curve.
  const unit = solveSpring(spring, {from: 0, to: 0, velocity: 1});
  let after = FRAME_MS / 1000;
  while (unit.velocity(after) > 0 && after < MAX_DURATION_MS / 1000) {
    after += FRAME_MS / 1000;
  }
  let before = Math.max(0, after - FRAME_MS / 1000);
  // Halve the frame around the turn until it is far below a frame.
  for (let step = 0; step < 32; step++) {
    const middle = (before + after) / 2;
    if (unit.velocity(middle) > 0) {
      before = middle;
    } else {
      after = middle;
    }
  }
  const unitDepth = unit.value(after);
  const speed = Math.min(fingerSpeed, unitDepth > 0 ? maxDepth / unitDepth : 0);
  if (!(speed > 0)) {
    return null;
  }
  const curve = solveSpring(spring, {
    from: animator.get('y'),
    to: 0,
    velocity: speed,
  });
  const duration = Math.min(curve.settleTime(REST_PX), MAX_DURATION_MS / 1000);
  if (!(duration > 0)) {
    return null;
  }
  // At `duration` the spring is within REST_PX of rest, not at rest. The
  // bounce takes that remainder out evenly over its length, so it lands
  // exactly on 0 and its last frame does not jump. A spring the cap cuts
  // short keeps its jump, as in the animator.
  const settled = curve.value(duration);
  const remainder = 0 * settled;
  return animator.play(
    {
      y: {
        duration,
        at: t =>
          t >= duration ? 0 : curve.value(t) - (remainder * t) / duration,
        velocity: t =>
          t >= duration ? 0 : curve.velocity(t) - remainder / duration,
      },
    },
    {touchRelease: true},
  );
}
