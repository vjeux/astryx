// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file gestures.ts
 * @input Nothing: plain data
 * @output Exports UIKIT_GESTURES, the gesture thresholds the gesture system
 *   (../../gestures) reads, each with where the number comes from, and the
 *   GestureConstant type that carries a value and its source
 * @position Gesture half of the UIKit constants table. Springs, scroll
 *   physics and timing live beside it in this folder; no component carries a
 *   gesture number of its own.
 *
 * Units are CSS pixels and milliseconds. On a phone with
 * `width=device-width`, one CSS pixel is one UIKit point, so a UIKit distance
 * in points is the same number here.
 *
 * Every entry is either SOURCED (Apple documentation, a WWDC session, or a
 * measurement of a real UIKit app on the iOS simulator, named with the app,
 * the iOS version and the method) or a GUESS. A guess says what it rests on
 * and what to measure to replace it; `gestures.test.ts` fails if an entry
 * carries neither. Safari on iOS runs UIKit's own recognizers for
 * tap-to-click, long press, double tap and the start of a page scroll, so
 * many guesses can be settled by measuring Safari itself.
 *
 * SYNC: When modified, update packages/core/src/gestures/README.md (the
 * thresholds section) and packages/core/src/motion/uikit/gestures.test.ts.
 */

export type GestureConstantUnit =
  'px' | 'ms' | 'px/s' | 'rad' | 'ratio' | 'count';

interface GestureConstantBase<T> {
  readonly value: T;
  readonly unit: GestureConstantUnit;
}

/** A number with a citable origin. */
export interface SourcedGestureConstant<
  T = number,
> extends GestureConstantBase<T> {
  /** Documentation URL, WWDC session, or `measured: <app>, <iOS>, <method>`. */
  readonly source: string;
}

/** A number nobody has measured yet. */
export interface GuessedGestureConstant<
  T = number,
> extends GestureConstantBase<T> {
  /** What the guess rests on. */
  readonly guess: string;
  /** The measurement that replaces it. */
  readonly measure: string;
}

export type GestureConstant<T = number> =
  SourcedGestureConstant<T> | GuessedGestureConstant<T>;

/** Whether a constant still needs its measurement. */
export function isGuess<T>(
  constant: GestureConstant<T>,
): constant is GuessedGestureConstant<T> {
  return 'guess' in constant;
}

const APPLE = 'https://developer.apple.com/documentation/uikit';

/**
 * The repository's own measurement of the touch press model, recorded in
 * packages/core/src/utils/pressGesture.ts: Settings and Contacts on an iPhone
 * simulator running iOS 26.2, driven with real HID touches, filmed at 60 fps.
 */
const PRESS_MEASUREMENT =
  'measured: Settings and Contacts, iOS 26.2 simulator, HID touches filmed at 60 fps (utils/pressGesture.ts)';

/**
 * Safari page scroll is a UIScrollView: the distance at which it claims a
 * slow drag (its `pointercancel`) is UIKit's pan start.
 */
const SAFARI_SCROLL_CLAIM =
  'measured: Safari page scroll, iOS 26.2 simulator, slow HID drag got pointercancel after ~12 px (utils/pressGesture.ts)';

export const UIKIT_GESTURES = {
  tap: {
    /**
     * How far each finger may travel from where it landed before a tap fails.
     */
    allowableMovement: {
      value: 10,
      unit: 'px',
      guess:
        'UITapGestureRecognizer does not document it; matches the long-press tolerance and the press slop the repository measured.',
      measure:
        'Safari (UIKit tap -> click): on a touch-action:none box, HID touch down, move N px over 100 ms, lift; binary-search the largest N that still fires click.',
    },
    /** Longest interval between one tap lifting and the next landing. */
    maximumIntervalBetweenTaps: {
      value: 350,
      unit: 'ms',
      guess:
        'UITapGestureRecognizer does not document its multi-tap interval; 350 ms is the commonly reported UIKit default.',
      measure:
        'Safari with user-scalable=no (UIKit double-tap -> dblclick): two HID taps T ms apart; binary-search the largest T that fires dblclick.',
    },
    /** How far a later tap may land from the first one of the sequence. */
    allowableSeparation: {
      value: 45,
      unit: 'px',
      guess:
        'Undocumented; roughly one fingertip, so a double tap need not land on the same pixel.',
      measure:
        'Safari with user-scalable=no: two HID taps 150 ms apart, the second D px away; binary-search the largest D that fires dblclick.',
    },
    /** Longest a finger may stay down and still tap. */
    maximumTapDuration: {
      value: Number.POSITIVE_INFINITY,
      unit: 'ms',
      guess:
        'Safari fires click after a long hold on a button, which suggests no limit for a single tap.',
      measure:
        'Safari: HID hold on a <button> for 0.5, 1, 2, 4 s then lift; record which fire click.',
    },
  },
  longPress: {
    /** UILongPressGestureRecognizer.minimumPressDuration default. */
    minimumPressDuration: {
      value: 500,
      unit: 'ms',
      source: `${APPLE}/uilongpressgesturerecognizer/minimumpressduration`,
    },
    /** UILongPressGestureRecognizer.allowableMovement default. */
    allowableMovement: {
      value: 10,
      unit: 'px',
      source: `${APPLE}/uilongpressgesturerecognizer/allowablemovement`,
    },
  },
  pan: {
    /**
     * Distance the touches' centroid travels before a pan begins. Kept BELOW
     * the distance at which WebKit claims a drag for scrolling, so a pan that
     * must cancel the native scroll still sees cancelable `touchmove`s.
     */
    hysteresis: {
      value: 10,
      unit: 'px',
      guess: `UIPanGestureRecognizer does not document it. ${SAFARI_SCROLL_CLAIM}; the pan has to decide before that.`,
      measure:
        'Settings list (UIScrollView pan): slow HID drag at 20 px/s filmed at 60 fps; touch travel at the first frame the content moves.',
    },
  },
  swipe: {
    /** Travel along the swipe direction before a swipe is recognized. */
    minimumDistance: {
      value: 50,
      unit: 'px',
      guess:
        'UISwipeGestureRecognizer does not document it; 50 pt is the commonly reported primary-movement minimum.',
      measure:
        'Needs a UIKit app that uses UISwipeGestureRecognizer (no built-in candidate known): HID swipes of increasing length at 600 px/s.',
    },
    /** Longest a swipe may take before it fails. */
    maximumDuration: {
      value: 500,
      unit: 'ms',
      guess: 'Undocumented; a swipe slower than half a second reads as a drag.',
      measure:
        'Same rig as minimumDistance: 120 px swipes at decreasing speed; longest duration that still recognizes.',
    },
    /** Off-axis travel allowed, as a fraction of the travel along the axis. */
    maximumOffAxisRatio: {
      value: 0.5,
      unit: 'ratio',
      guess: 'Undocumented; about 27 degrees off the axis.',
      measure:
        'Same rig: 120 px swipes at increasing angles; largest angle that still recognizes.',
    },
  },
  pinch: {
    /** Change of the distance between two fingers before a pinch begins. */
    hysteresis: {
      value: 8,
      unit: 'px',
      guess: 'UIPinchGestureRecognizer does not document it.',
      measure:
        'Photos (zoomable image): two HID touches spreading at 20 px/s filmed at 60 fps; span change at the first frame the image scales.',
    },
  },
  rotation: {
    /** Rotation of the two-finger vector before a rotation begins. */
    hysteresis: {
      value: (5 * Math.PI) / 180,
      unit: 'rad',
      guess: 'UIRotationGestureRecognizer does not document it; 5 degrees.',
      measure:
        'Maps: two HID touches rotating at 10 deg/s filmed at 60 fps; angle at the first frame the map turns.',
    },
  },
  screenEdgePan: {
    /** Width of the band at the screen edge a touch must land in. */
    edgeRegion: {
      value: 20,
      unit: 'px',
      guess:
        'UIScreenEdgePanGestureRecognizer does not document it; the interactive pop gesture is reported to start within about 20 pt.',
      measure:
        'Settings > General (UINavigationController pop): HID drags inward starting at x = 5, 10 ... 40 pt; largest x that still pops.',
    },
  },
  control: {
    /**
     * How far outside its bounds a UIControl keeps a press inside: a finger
     * dragged out is still "inside" until it passes this margin.
     */
    trackingExpansion: {
      value: 70,
      unit: 'px',
      guess:
        'Undocumented; UIButton is widely reported to stay highlighted about 70 pt outside its frame.',
      measure:
        'Calculator (UIButton): HID press, drag away at 20 px/s filmed at 60 fps; distance from the frame at which the highlight turns off, then back on.',
    },
  },
  press: {
    /** UIScrollView.delaysContentTouches: a touch in a scroller highlights after this. */
    contentTouchDelay: {value: 150, unit: 'ms', source: PRESS_MEASUREMENT},
    /** A tap shorter than the delay shows the highlight at the lift for this long. */
    quickTapFlash: {value: 100, unit: 'ms', source: PRESS_MEASUREMENT},
    /** Travel at which a press is a scroll, not a press. */
    slop: {value: 10, unit: 'px', source: SAFARI_SCROLL_CLAIM},
    /** A touch this soon after a finger-driven scroll moved is a brake, not a press. */
    scrollBrake: {value: 150, unit: 'ms', source: PRESS_MEASUREMENT},
    /**
     * How long after a finger was down a scroll can still be that finger's
     * momentum (the brake only counts scrolls a finger drove).
     */
    momentumMemory: {
      value: 3000,
      unit: 'ms',
      guess:
        'The press model bound (utils/pressFeedback.ts): iOS momentum runs for a second or two after the lift.',
      measure:
        'Safari page, hardest HID flick: time from the lift to the last scroll event.',
    },
  },
  scroll: {
    /**
     * Travel past the point where a native scroll ran out of content before
     * the gesture hands the rest of the pull to a recognizer.
     */
    contentEndHandoffSlop: {
      value: 4,
      unit: 'px',
      guess:
        'The BottomSheet value (useSheetGestures.ts): enough to ignore a fling coming to rest on the last pixel.',
      measure:
        'A UIKit sheet (Maps place card at the medium detent) over a scrolled list: HID drag down from mid-list; finger travel between the list reaching its top and the sheet moving.',
    },
  },
  velocity: {
    /** Samples older than this, relative to the newest, are ignored. */
    horizon: {
      value: 100,
      unit: 'ms',
      guess:
        "UIKit's estimator is private. Android's VelocityTracker and Flutter's both fit the last 100 ms (least squares, degree 2).",
      measure:
        'Safari page scroll (UIScrollView): HID flings with known speed profiles; back out the release velocity from the coast distance (0.998/ms decay) and compare with this estimator on the same samples.',
    },
    /** At most this many samples are kept. */
    maxSamples: {
      value: 20,
      unit: 'count',
      guess: 'Android VelocityTracker and Flutter VelocityTracker keep 20.',
      measure: 'Same comparison as horizon.',
    },
    /** A finger that has not moved for this long before lifting released nothing in motion. */
    assumeStopped: {
      value: 40,
      unit: 'ms',
      guess: 'Android VelocityTracker and Flutter VelocityTracker use 40 ms.',
      measure:
        'Safari page scroll: HID drag, pause P ms, lift; smallest P after which the page does not coast.',
    },
  },
  click: {
    /**
     * Longest the system waits for the browser's click after a touch it
     * swallows. iOS and Chromium deliver it right after `touchend`; this only
     * bounds a click that never comes.
     */
    strayClickWindow: {
      value: 1000,
      unit: 'ms',
      guess: 'A safety bound, not a UIKit number.',
      measure:
        'Not a parity value: confirm in Safari and Chromium that the click follows touchend within one frame.',
    },
  },
} as const satisfies Record<string, Record<string, GestureConstant>>;

/**
 * The feedback kinds UIKit's generators offer: UISelectionFeedbackGenerator,
 * UIImpactFeedbackGenerator (.light .medium .heavy .soft .rigid) and
 * UINotificationFeedbackGenerator (.success .warning .error).
 * https://developer.apple.com/documentation/uikit/uifeedbackgenerator
 */
export const HAPTIC_FEEDBACK_KINDS = [
  'selection',
  'impactLight',
  'impactMedium',
  'impactHeavy',
  'impactSoft',
  'impactRigid',
  'notificationSuccess',
  'notificationWarning',
  'notificationError',
] as const;

export type HapticFeedbackKind = (typeof HAPTIC_FEEDBACK_KINDS)[number];

/**
 * `navigator.vibrate` patterns standing in for each kind where the platform
 * has nothing better (Android browsers). Not UIKit numbers: a vibration motor
 * cannot render a Taptic Engine waveform, so these only keep the relative
 * strengths in order.
 */
export const HAPTIC_VIBRATION_PATTERNS: Record<
  HapticFeedbackKind,
  GestureConstant<ReadonlyArray<number>>
> = {
  selection: vibration([5]),
  impactLight: vibration([8]),
  impactMedium: vibration([12]),
  impactHeavy: vibration([18]),
  impactSoft: vibration([10]),
  impactRigid: vibration([6]),
  notificationSuccess: vibration([8, 60, 12]),
  notificationWarning: vibration([12, 80, 12]),
  notificationError: vibration([12, 50, 12, 50, 18]),
};

function vibration(
  pattern: ReadonlyArray<number>,
): GuessedGestureConstant<ReadonlyArray<number>> {
  return {
    value: pattern,
    unit: 'ms',
    guess:
      'No UIKit equivalent exists for a vibration motor; durations only order the strengths.',
    measure:
      'On an Android device, compare against the platform HapticFeedbackConstants for the same moments.',
  };
}
