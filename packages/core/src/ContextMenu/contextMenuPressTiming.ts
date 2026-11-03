// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file contextMenuPressTiming.ts
 * @input A duration token's value and an easing token's value
 * @output pressTiming and timedCurve: the timing and the curve the press
 *   feedback plays
 * @position The press feedback's motion, for ContextMenu's touch invocation
 *
 * SYNC: When modified, update
 * /packages/core/src/ContextMenu/contextMenuPressFeedback.ts
 */

// The trigger's growth under a held finger, and its return after a lift
// before the commit, start from a hold with no velocity. So they are not a
// gesture's motion, and the theme's motion tokens time them. A duration token
// carries the theme's tempo, and the move easing shapes the curve.

import {cubicBezier} from '../motion/bezier';
import type {MotionCurve} from '../motion/animator';
import {parseCssEasing, parseMotionRoleValue} from '../motion/roles';

/** A duration in seconds and its easing. */
export interface PressTiming {
  readonly seconds: number;
  readonly ease: (progress: number) => number;
}

/**
 * The timing a duration token's value and an easing token's value give. Each
 * value that is not one takes its `fallback`, and the result is null when
 * neither gives one.
 */
export function pressTiming(
  duration: string,
  easing: string,
  fallback?: {readonly duration: string; readonly easing: string},
): PressTiming | null {
  const ms =
    parseMotionRoleValue('duration', duration) ??
    (fallback == null
      ? null
      : parseMotionRoleValue('duration', fallback.duration));
  const points =
    parseCssEasing(easing) ??
    (fallback == null ? null : parseCssEasing(fallback.easing));
  if (ms == null || points == null) {
    return null;
  }
  return {seconds: Math.max(ms, 1) / 1000, ease: cubicBezier(points)};
}

/** A curve from `from` to `to` on `timing`, for the compositor animator. */
export function timedCurve(
  from: number,
  to: number,
  timing: PressTiming,
): MotionCurve {
  const {seconds, ease} = timing;
  const at = (t: number) =>
    from + (to - from) * ease(Math.min(1, Math.max(0, t / seconds)));
  const step = Math.min(seconds / 100, 0.001);
  return {
    duration: seconds,
    at,
    velocity: t => {
      const before = Math.max(0, t - step);
      const after = Math.min(seconds, t + step);
      return (at(after) - at(before)) / (after - before);
    },
  };
}
