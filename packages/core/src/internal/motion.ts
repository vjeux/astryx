// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file motion.ts
 * @input The animator, the bezier and spring math, the rubber band, and the
 *   UIKit tuning tables (motion/)
 * @output `@astryxdesign/core/internal/motion`: the motion Lab components
 *   build on: named re-exports, and the UIKit tuning table index whole
 * @position An internal entry reserved for Astryx's own packages:
 *   undocumented, outside the public API and its compatibility promise,
 *   versioned in lockstep with Core, and allowed by lint only in Core and Lab
 *   (architecture:react-component-runtime INV13). Named re-exports keep a
 *   tuning table's rows to the components that read them
 *   (architecture:component-style-authoring INV6); the table index is
 *   re-exported whole, since each of its tables is its own named export, so a
 *   table added to motion/uikit reaches Lab with no edit here.
 *
 * SYNC: When a motion module a Lab component uses lands in Core, re-export it
 * here and add it to scripts/core-internal-entries.test.mjs; when modified,
 * update scripts/touch-support-bundle.test.mjs.
 */

export {
  animatorFor,
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
export * from '../motion/uikit';
