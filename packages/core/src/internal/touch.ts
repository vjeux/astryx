// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file touch.ts
 * @input The gesture core: the arena, the recognizers, their geometry and
 *   their React hook. The motion core: the animator, the cubic-bézier and
 *   spring solvers, the rubber band, the motion resolver and UIKit's timing,
 *   navigation, springs and gesture tables. The touch-presentation hook, the
 *   coarse-pointer query, the writing-direction read and the click-guard read.
 * @output `@astryxdesign/core/internal/touch`: the gesture core's primitives
 *   for Lab components, re-exported by name
 * @position An internal entry reserved for Astryx's own packages:
 *   undocumented, outside the public API and its compatibility promise
 *   (spec:AST-017 FR21), versioned in lockstep with Core, and allowed only in
 *   Core and Lab by the `@astryx/no-core-internal-import` lint rule
 *   (architecture:react-component-runtime INV13). Core components import the
 *   same modules by relative path. Named re-exports only, never a gathering
 *   object: a bundler keeps one copy per page and only what a component uses
 *   (architecture:component-style-authoring INV6). Importing it attaches no
 *   listeners: a recognizer listens only once a component starts it under a
 *   coarse pointer (`spec:AST-094` FR19, FR24).
 *
 * SYNC: When modified, update scripts/touch-support-bundle.test.mjs and
 * touch.test.ts.
 */

export {browserClock, GestureArena} from '../gestures/GestureArena';
export {
  ALL_NATIVE_TOUCH,
  GestureRecognizer,
  isActive,
  isTerminal,
  isTransitionAllowed,
  MANIPULATION,
} from '../gestures/GestureRecognizer';
export {
  angleBetween,
  centroid,
  distance,
  travel,
  unwrapAngle,
} from '../gestures/geometry';
export {LongPressGestureRecognizer} from '../gestures/LongPressGestureRecognizer';
export {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
export {ScreenEdgePanGestureRecognizer} from '../gestures/ScreenEdgePanGestureRecognizer';
export {TapGestureRecognizer} from '../gestures/TapGestureRecognizer';
export {DEFAULT_ENVIRONMENT} from '../gestures/types';
export {useGestureRecognizer} from '../gestures/useGestureRecognizer';
export {isRtlElement} from '../hooks/isRtlElement';
// The animator's internal factory, under a name no public factory has: the
// public animator factory is `createAnimator`.
export {createAnimator as createMotionAnimator} from '../motion/animator';
export type {
  AnimateOptions,
  Animator as MotionAnimator,
  AnimatorOptions as MotionAnimatorOptions,
  MotionCurve,
  MotionHandle,
} from '../motion/animator';
export {cubicBezier} from '../motion/bezier';
export type {BezierPoints} from '../motion/bezier';
export {resolveMotion} from '../motion/resolveMotion';
export {rubberBand, rubberBandInverse} from '../motion/rubberBand';
export {solveSpring, toSpring} from '../motion/spring';
export type {SpringDescription} from '../motion/spring';
export {UIKIT_GESTURES} from '../motion/uikit/gestures';
export {navigation, registerNavigationTable} from '../motion/uikit/navigation';
export {registerSpringsTable, springs} from '../motion/uikit/springs';
export {timing} from '../motion/uikit/timing';
export {isClickGuardArmed} from '../utils/clickGuard';
export {useTouchPresentation} from '../utils/touchPresentation';
export {TOUCH_QUERY} from '../utils/touchQueries';
