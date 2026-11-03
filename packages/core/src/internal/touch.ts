// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file touch.ts
 * @input The gesture core: the arena, the recognizers, and their geometry;
 *   the motion math and UIKit tables that Lab's RefreshControl reads; the
 *   page's scroll-style claims
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
export {TapGestureRecognizer} from '../gestures/TapGestureRecognizer';
export {DEFAULT_ENVIRONMENT} from '../gestures/types';

// Lab's RefreshControl reads these: the pan recognizer and its hook, the
// motion math and tables of its pull, and the page's scroll-style claims. The
// claims let a pull at the page's top compose with a scroll lock.
export {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
export type {PanGestureRecognizerOptions} from '../gestures/PanGestureRecognizer';
export type {
  GestureEventContext,
  GestureTouch,
  PointerKind,
} from '../gestures/types';
export {useGestureRecognizer} from '../gestures/useGestureRecognizer';
export {
  claimRootScrollStyle,
  isScrollLockActive,
  subscribeScrollLock,
} from '../hooks/rootScrollStyles';
// The animator's internal factory. The name `createAnimator` stays free for
// the public animator factory.
export {createAnimator as createMotionAnimator} from '../motion/animator';
export {SETTLE_THRESHOLD} from '../motion/animator';
export type {
  Animator as MotionAnimator,
  AnimatorOptions as MotionAnimatorOptions,
  MotionCurve,
} from '../motion/animator';
export {cubicBezier} from '../motion/bezier';
export {resolveMotion} from '../motion/resolveMotion';
export {rubberBand, rubberBandInverse} from '../motion/rubberBand';
export {solveSpring, toSpring} from '../motion/spring';
export {refreshControl} from '../motion/uikit/refresh';
export {scroll} from '../motion/uikit/scroll';
export {registerTimingTable, timing} from '../motion/uikit/timing';
export {useTouchPresentation} from '../utils/touchPresentation';
