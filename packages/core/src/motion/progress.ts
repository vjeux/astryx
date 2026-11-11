// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file progress.ts
 * @input A spring, a normalized progress, an animator's presented velocities
 * @output Exports `progressCurve` (a spring's progress from 0 to 1 as a
 *   MotionCurve), `easedProgress` (the eased progress for a length and an
 *   easing already read), `timedCurve` (a timed move on a curve that keeps
 *   a retargeted velocity), `mapProgress` (one curve as a function of
 *   another), `mapRange` (the clamped linear map most companions use) and
 *   `presentedProgressVelocity` (the progress velocity that continues what
 *   an animator shows)
 * @position Shared by the motion building blocks that move several channels
 *   along one path and by companion motion (a
 *   scrim's dim following a sheet): one velocity unit, one curve mapping and
 *   one way to continue an interrupted motion
 *
 * A path is described by a normalized progress: 0 where it starts, 1 where
 * it rests, beyond either end on a spring's overshoot. Its velocity is in
 * progress per second; each channel's own velocity stays in the channel's
 * units per second.
 *
 * An interrupted motion continues from what is on screen: the
 * block reads the presented values and velocities from the animator at one
 * `now` (`get`, `getVelocity`), restarts a path from those values, and starts
 * its progress with the presented velocity projected on the path's tangent
 * at its start, v·t / (t·t), where t = d(values)/dp. Channels are weighted
 * into one unit first (px per unit of scale, say), so a scale and a
 * translation count alike.
 *
 * A companion follows a driving curve through `mapProgress`, most often
 * with `mapRange`: `mapProgress(sheetY, mapRange([closedY, openY], [0, dim]))`
 * dims a scrim as a sheet rises. Played on another animator, it stays in
 * lockstep only when it starts with its driver: pass the driver's start,
 * `scrim.play({opacity}, {at: start})` with `start = await handle.started`
 * (or one shared `at` for both calls); two calls from rest otherwise each
 * start at their own commit.
 *
 * SYNC: When modified, update /packages/core/src/motion/progress.test.ts and
 * /packages/core/src/motion/README.md.
 */

import type {Animator, MotionCurve, MotionProperty} from './animator';
import {cubicBezier, type BezierPoints} from './bezier';
import {
  SETTLING_EPSILON,
  solveSpring,
  toSpring,
  type SpringDescription,
} from './spring';

/** The step of the finite differences taken on a progress. */
const STEP = 1e-4;

/**
 * The progress of `spring` from 0 to 1, starting with `velocity` (progress
 * per second): exactly 1 once it settles within `epsilon`.
 */
export function progressCurve(
  spring: SpringDescription,
  {
    velocity = 0,
    epsilon = SETTLING_EPSILON,
  }: {velocity?: number; epsilon?: number} = {},
): MotionCurve {
  const curve = solveSpring(toSpring(spring), {from: 0, to: 1, velocity});
  const duration = curve.settleTime(epsilon);
  return {
    duration,
    at: t => (t >= duration ? 1 : curve.value(t)),
    velocity: t => (t >= duration ? 0 : curve.velocity(t)),
  };
}

/**
 * The curve of `f(driver(t))`, its velocity by the chain rule: a channel
 * following a path as its progress moves, or a companion following any
 * driving curve (a sheet's `y` mapped onto its scrim's opacity). The driver
 * is any MotionCurve, not only a progress from 0 to 1. A companion played on
 * another animator starts with its driver (`{at: start}`; see the file
 * header).
 */
export function mapProgress(
  driver: MotionCurve,
  f: (value: number) => number,
): MotionCurve {
  return {
    duration: driver.duration,
    at: t => f(driver.at(t)),
    velocity: t => {
      const value = driver.at(t);
      return (
        ((f(value + STEP) - f(value - STEP)) / (2 * STEP)) * driver.velocity(t)
      );
    },
  };
}

/**
 * The linear map from `input` to `output`, held at `output`'s ends outside
 * `input` unless `clamp` is false: what most companions are (a scrim's dim
 * along a sheet's travel, a parallax, a dismissal's fade). Either range may
 * run backward (`[openY, closedY]`).
 */
export function mapRange(
  input: readonly [number, number],
  output: readonly [number, number],
  {clamp = true}: {clamp?: boolean} = {},
): (x: number) => number {
  const [a, b] = input;
  const [c, d] = output;
  return x => {
    let t = a === b ? (x < a ? 0 : 1) : (x - a) / (b - a);
    if (clamp) {
      t = Math.min(1, Math.max(0, t));
    }
    // Exact at both ends.
    return t === 0 ? c : t === 1 ? d : c + (d - c) * t;
  };
}

/**
 * The eased progress from 0 to 1 over `seconds`, as a MotionCurve whose
 * velocity is in progress per second. A curve of no length is at its end.
 * With `jumps`, a jump in the easing, as in `steps()`, carries no speed. The
 * gentler of the slopes just before and just after counts.
 */
export function easedProgress(
  seconds: number,
  ease: (x: number) => number,
  {jumps = false}: {readonly jumps?: boolean} = {},
): MotionCurve {
  const at = (t: number) =>
    seconds <= 0 || t >= seconds ? 1 : ease(Math.max(0, t) / seconds);
  // A central difference, one step inside the curve at either end.
  const step = Math.min(1e-3, seconds / 100);
  return {
    duration: seconds,
    at,
    velocity: t => {
      if (seconds <= 0 || t >= seconds) {
        return 0;
      }
      const before = Math.max(0, t - step);
      const after = Math.min(seconds, t + step);
      if (!jumps) {
        return (at(after) - at(before)) / (after - before);
      }
      const here = at(t);
      const slopes: number[] = [];
      if (t > before) {
        slopes.push((here - at(before)) / (t - before));
      }
      if (after > t) {
        slopes.push((at(after) - here) / (after - t));
      }
      return slopes.reduce((a, b) => (Math.abs(b) < Math.abs(a) ? b : a));
    },
  };
}

/**
 * A move from `from` to `to` (px) over `durationMs` on `curve`. `velocity`
 * (px/s) is the velocity of a move that this one retargets. The new curve
 * starts at it and still ends on `to`, at rest and on time. The carry is a
 * Hermite term, v × duration × u(1 − u)², less the curve's own starting
 * slope. So a move from rest is the curve itself, and its velocity at the
 * start is that slope.
 */
export function timedCurve({
  from,
  to,
  durationMs,
  curve,
  velocity,
}: {
  from: number;
  to: number;
  durationMs: number;
  curve: BezierPoints;
  velocity?: number;
}): MotionCurve {
  const duration = durationMs / 1000;
  const distance = to - from;
  const ease = cubicBezier(curve);
  const progress = (u: number) => ease(Math.min(1, Math.max(0, u)));
  // The carry, in px: the retargeted velocity over the whole duration, less
  // what the curve's own starting slope already gives.
  const startSlope = progress(1e-4) / 1e-4;
  const carry =
    velocity == null ? 0 : velocity * duration - distance * startSlope;
  const at = (t: number) => {
    const u = Math.min(1, Math.max(0, t / duration));
    return from + distance * progress(u) + carry * u * (1 - u) * (1 - u);
  };
  return {
    duration,
    at,
    velocity: t => {
      if (t <= 0) {
        // From rest, the slope that the carry reads: a retarget at the first
        // instant goes on at it.
        return (
          velocity ?? (duration > 0 ? (distance * startSlope) / duration : 0)
        );
      }
      if (t >= duration) {
        return 0;
      }
      const h = Math.min(1e-4, t / 2, (duration - t) / 2);
      return (at(t + h) - at(t - h)) / (2 * h);
    },
  };
}

/**
 * One channel of a path: an animator property and its value at each
 * progress.
 */
export interface ProgressChannel {
  readonly property: MotionProperty;
  /** The property's value at progress `p`. */
  at(p: number): number;
  /**
   * What one unit of the property weighs in the projection, in a unit the
   * channels share (px per unit of scale for a box `weight` px wide). 1 by
   * default.
   */
  readonly weight?: number;
}

/**
 * The progress velocity, per second, that continues what `animator`
 * presents at `now` along a path that starts there: the presented velocity
 * projected on the path's tangent at progress 0, v·t / (t·t). 0 when the
 * path does not move any of its channels.
 */
export function presentedProgressVelocity(
  animator: Pick<Animator, 'getVelocity'>,
  channels: ReadonlyArray<ProgressChannel>,
  now?: number,
): number {
  let along = 0;
  let squared = 0;
  for (const channel of channels) {
    const weight = channel.weight ?? 1;
    const tangent = ((channel.at(STEP) - channel.at(0)) / STEP) * weight;
    along += animator.getVelocity(channel.property, now) * weight * tangent;
    squared += tangent * tangent;
  }
  return squared > 1e-12 ? along / squared : 0;
}
