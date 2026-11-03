// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiming.ts
 * @input An element whose CSS transition reads the theme's duration and easing
 *   tokens
 * @output `themeTimingOf`, that transition's timing, and `timedCurve`, a curve
 *   on it for the animator's `play`
 * @position Motion foundation, internal to core. A motion that a tap starts
 *   follows the theme's timing, not a gesture's spring, and reads it here.
 */

import type {MotionCurve} from './animator';
import {cubicBezier} from './bezier';
import {parseCssEasing, parseMotionRoleValue} from './roles';

/** The theme's timing: a duration in seconds and its easing. */
export interface ThemeTiming {
  readonly seconds: number;
  readonly ease: (progress: number) => number;
}

/**
 * The timing of `element`'s own CSS transition, which reads the theme's
 * duration and easing tokens. The first entry counts. The values stay
 * readable while the transition's property is `none`. Null when the theme
 * gives no duration.
 */
export function themeTimingOf(element: Element): ThemeTiming | null {
  const view = element.ownerDocument.defaultView;
  if (view == null) {
    return null;
  }
  const style = view.getComputedStyle(element);
  const ms = parseMotionRoleValue(
    'duration',
    style.transitionDuration.split(',')[0] ?? '',
  );
  const points = parseCssEasing(
    style.transitionTimingFunction.split(/,(?![^(]*\))/)[0] ?? '',
  );
  if (ms == null || ms <= 0 || points == null) {
    return null;
  }
  return {seconds: ms / 1000, ease: cubicBezier(points)};
}

/** A curve from `from` to `to` on `timing`. */
export function timedCurve(
  from: number,
  to: number,
  timing: ThemeTiming,
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
