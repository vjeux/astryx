// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file motion.ts
 * @input The animator, the bezier and spring math, the rubber band, and the
 *   UIKit tuning tables (motion/)
 * @output `@astryxdesign/core/internal/motion`: the motion Lab components
 *   build on, named re-exports only
 * @position An internal entry reserved for Astryx's own packages:
 *   undocumented, outside the public API and its compatibility promise,
 *   versioned in lockstep with Core, and allowed by lint only in Core and Lab
 *   (architecture:react-component-runtime INV13). Named re-exports keep a
 *   tuning table's rows to the components that read them
 *   (architecture:component-style-authoring INV6).
 *
 * SYNC: When a motion module a Lab component uses lands in Core, re-export it
 * here and add it to scripts/core-internal-entries.test.mjs; when modified,
 * update scripts/touch-support-bundle.test.mjs.
 */

export {
  createAnimator,
  END_HOLD_MS,
  SETTLE_THRESHOLD,
} from '../motion/animator';
export type {
  AnimateOptions,
  Animator,
  AnimatorOptions,
  MotionCurve,
  MotionHandle,
  MotionProperty,
  MotionValues,
  SpringTransition,
} from '../motion/animator';
export {cubicBezier} from '../motion/bezier';
export type {BezierPoints} from '../motion/bezier';
export {
  absoluteVelocity,
  dampingRatioOf,
  durationBounceOf,
  naturalFrequency,
  relativeVelocity,
  responseDampingOf,
  responseOf,
  SETTLING_EPSILON,
  settlingDuration,
  solveSpring,
  solveSpringTowardRamp,
  springFromDurationBounce,
  springFromPhysics,
  springFromResponse,
  springFromUIKitDampingDuration,
  toSpring,
} from '../motion/spring';
export type {
  DurationBounce,
  ResponseDamping,
  Spring,
  SpringCurve,
  SpringDescription,
  SpringRampCurve,
} from '../motion/spring';
export {
  rubberBand,
  rubberBandClamp,
  rubberBandInverse,
  rubberBandSlope,
  rubberBandUnclamp,
} from '../motion/rubberBand';
// The UIKit table index whole: every table registers its rows in the index,
// and a table a touch presentation adds reaches this entry with it, so
// presentations that each add a table never edit this file.
export * from '../motion/uikit';
export {
  REDUCED_MOTION_FADE_QUERY,
  REDUCED_MOTION_INSTANT_QUERY,
  reducedMotionFade,
} from '../motion/reducedMotion';
export type {ReducedMotionFade} from '../motion/reducedMotion';
export {resolveMotion} from '../motion/resolveMotion';
export {useAnimator} from '../motion/useAnimator';
export type {UseAnimatorResult} from '../motion/useAnimator';
