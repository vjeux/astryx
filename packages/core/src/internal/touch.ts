// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file touch.ts
 * @input The gesture core: the arena, the recognizers and their geometry,
 *   the pan recognizer, the gesture types, and the touch presentation queries
 * @output `@astryxdesign/core/internal/touch`: the gesture core's primitives
 *   and the touch queries for Lab components, re-exported by name
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
 * SYNC: When modified, update scripts/touch-support-bundle.test.mjs,
 * scripts/core-internal-entries.test.mjs and touch.test.ts.
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
export {PanGestureRecognizer} from '../gestures/PanGestureRecognizer';
export type {
  PanDirection,
  PanGestureRecognizerOptions,
} from '../gestures/PanGestureRecognizer';
export type {
  GestureEnvironment,
  GestureEventContext,
  GestureState,
  GestureTouch,
  NativeScrollProbe,
  Point,
  PointerKind,
  TouchBeganInput,
  TouchConsumer,
  TouchInput,
  TouchPhase,
  TouchSample,
} from '../gestures/types';
export {
  COMPACT_QUERY,
  COMPACT_TOUCH_QUERY,
  IOS_SUPPORTS_QUERY,
  IOS_TOUCH_STYLE_KEYS,
  readTouchPresentation,
  TOUCH_QUERY,
  useCompactDefinition,
  useTouchPresentation,
} from '../utils/touchPresentation';
export type {TouchPresentation} from '../utils/touchPresentation';
export type {
  ArenaBeganInput,
  ClickDisposition,
  GestureArenaOptions,
  GestureClock,
} from '../gestures/GestureArena';
export {GestureHost, getGestureHost} from '../gestures/GestureHost';
export type {AttachOptions, GestureHostOptions} from '../gestures/GestureHost';
export type {
  GestureListener,
  GestureRecognizerOptions,
  GestureTransitionListener,
  NativeTouchBehavior,
} from '../gestures/GestureRecognizer';
export {
  attachTapHaptic,
  canVibrate,
  playHaptic,
  supportsSwitchControl,
} from '../gestures/haptics';
export {HoverGestureRecognizer} from '../gestures/HoverGestureRecognizer';
export type {LongPressGestureRecognizerOptions} from '../gestures/LongPressGestureRecognizer';
export {
  createNativeScrollProbe,
  parseTouchAction,
} from '../gestures/nativeScroll';
export {PinchGestureRecognizer} from '../gestures/PinchGestureRecognizer';
export type {PinchGestureRecognizerOptions} from '../gestures/PinchGestureRecognizer';
export {PRESS_PROFILES, PressTracker} from '../gestures/PressTracker';
export type {
  ControlEvent,
  PressBounds,
  PressHighlightDelay,
  PressProfile,
  PressProfileName,
  PressTrackerOptions,
} from '../gestures/PressTracker';
export {RotationGestureRecognizer} from '../gestures/RotationGestureRecognizer';
export type {RotationGestureRecognizerOptions} from '../gestures/RotationGestureRecognizer';
export {ScreenEdgePanGestureRecognizer} from '../gestures/ScreenEdgePanGestureRecognizer';
export type {
  ScreenEdge,
  ScreenEdgePanGestureRecognizerOptions,
} from '../gestures/ScreenEdgePanGestureRecognizer';
export {SwipeGestureRecognizer} from '../gestures/SwipeGestureRecognizer';
export type {
  SwipeDirection,
  SwipeGestureRecognizerOptions,
} from '../gestures/SwipeGestureRecognizer';
export type {TapGestureRecognizerOptions} from '../gestures/TapGestureRecognizer';
export {deriveTouchAction, gestureHostStyle} from '../gestures/touchAction';
export type {GestureHostStyle} from '../gestures/touchAction';
export {
  useGestureRecognizer,
  usePressTracker,
} from '../gestures/useGestureRecognizer';
export type {
  UseGestureRecognizerOptions,
  UsePressTrackerOptions,
} from '../gestures/useGestureRecognizer';
export {VelocityTracker} from '../gestures/VelocityTracker';
export type {VelocityTrackerOptions} from '../gestures/VelocityTracker';
