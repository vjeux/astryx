// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file toastSwipe.ts
 * @input The Toast constants of the UIKit table (motion/uikit/toast) and the
 *   cubic-bézier timing function (motion/bezier)
 * @output Pure math for Toast's presentation under a finger: how far the card follows a
 *   finger, whether a release dismisses, and the retract it leaves by
 * @position Internal; used by useToastBannerSwipe.ts and unit-tested on its own
 *
 * Distances are CSS px measured from rest toward the toast's edge (up for a
 * top toast, down for a bottom toast), so they are positive in both
 * placements; velocities are px/s in the same direction.
 *
 * SYNC: When modified, update /packages/core/src/Toast/toastSwipe.test.ts
 */

import type {MotionCurve} from '../motion/animator';
import {cubicBezier, type BezierPoints} from '../motion/bezier';
import {toast} from '../motion/uikit/toast';

/**
 * Where the card sits for a finger that travelled `fingerTravel` since
 * touch-down, positive toward the edge and negative away from it. The card
 * stays still until `toast.followFrom`, then moves at `toast.followRatio` of
 * the finger, either way. Away from the edge the card only stretches: a
 * release there always springs it back (`isDismissRelease`).
 */
export function followOffset(fingerTravel: number): number {
  const past = Math.abs(fingerTravel) - toast.followFrom;
  if (past <= 0) {
    return 0;
  }
  return Math.sign(fingerTravel) * toast.followRatio * past;
}

/**
 * Whether a release dismisses. It does when the card is at least
 * `toast.dismissOffset` out. It also does when the card is at or past rest
 * and the finger moved toward the edge at `toast.flickVelocity` or faster as
 * it lifted. The speed is the shared release filter's, which reads no speed
 * for a finger that rested before the lift. A release moving back toward
 * rest never dismisses, however far out the card is: the banner springs back
 * after a drag that turns back. A card stretched away from the edge always
 * springs back, however fast the finger flicks it back.
 */
export function isDismissRelease(offset: number, velocity: number): boolean {
  if (velocity < 0) {
    return false;
  }
  return (
    offset >= toast.dismissOffset ||
    (offset >= 0 && velocity >= toast.flickVelocity)
  );
}

/** How far past its edge a retracting card ends: clear of its shadow. */
export const RETRACT_CLEARANCE = 16;

/**
 * Where a retracting card ends, as its translation (px, down positive):
 * fully past its edge. `box` is the card's untranslated box in viewport px;
 * `direction` is 1 for a bottom toast, -1 for a top one.
 */
export function retractTarget(
  box: {readonly top: number; readonly bottom: number},
  viewportHeight: number,
  direction: 1 | -1,
): number {
  return direction === -1
    ? -(box.bottom + RETRACT_CLEARANCE)
    : viewportHeight - box.top + RETRACT_CLEARANCE;
}

/**
 * The retract as a curve the animator plays: from `from` to `to` (px) over
 * `durationMs` on the timing curve `points`. After a dismissing release,
 * `releaseVelocity` is the card's speed at the lift, in px/s on the axis of
 * `from` and `to`. The retract starts at that speed. The curve's first
 * control point sets the initial slope. A release faster than the curve can
 * start carries the card out sooner instead of overshooting. Without a
 * release (the close button, the timeout, the app's dismiss), it plays the
 * banner's fitted curve.
 */
export function retractCurve(
  from: number,
  to: number,
  durationMs: number,
  points: BezierPoints,
  releaseVelocity?: number,
): MotionCurve {
  let duration = Math.max(durationMs, 1) / 1000;
  let curvePoints = points;
  const distance = to - from;
  if (releaseVelocity != null && distance !== 0 && points[0] > 0) {
    // The curve's initial slope is y1 / x1 (progress per unit of time
    // fraction); the card's initial speed is distance × slope / duration.
    const [x1, , x2, y2] = points;
    const speed = Math.max(0, releaseVelocity / distance);
    let y1 = x1 * speed * duration;
    if (y1 > 1) {
      // y1 above 1 would overshoot the target: shorten the retract so the
      // curve can start at the release speed with y1 = 1.
      duration = 1 / (x1 * speed);
      y1 = 1;
    }
    curvePoints = [x1, y1, x2, y2];
  }
  const ease = cubicBezier(curvePoints);
  const progress = (t: number) => Math.min(1, Math.max(0, t / duration));
  const at = (t: number) => from + (to - from) * ease(progress(t));
  const step = duration / 1000;
  return {
    duration,
    at,
    velocity: t => {
      const a = Math.max(0, t - step);
      const b = Math.min(duration, t + step);
      return (at(b) - at(a)) / (b - a);
    },
  };
}
