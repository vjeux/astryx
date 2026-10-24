// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file timing.ts
 * @input Nothing; data only
 * @output Exports `timing`: the non-spring clocks and curves UIKit uses
 *   (press highlight onset, flash and fade, Core Animation's named Bézier
 *   curves, the navigation bar hide/show duration, the keyboard
 *   notification duration, the Reduced Motion cross-fade)
 * @position The timing domain of the UIKit constants table (motion/uikit)
 *
 * Every leaf carries one or more `@source` (apple-docs | wwdc | webkit |
 * measured | GUESS); webkit and GUESS values also carry the `@measure` task
 * that will confirm or replace them (motion/README.md). sources.test.ts
 * enforces both.
 *
 * Durations are in ms (the unit of pointer-event timestamps, which these
 * clocks are compared against); curves are cubic-bézier control points
 * [x1, y1, x2, y2].
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/README.md (measurement list)
 * - /packages/core/src/utils/pressGesture.ts (the press clocks are measured
 *   there and must agree; timing.test.ts checks it)
 */

export const timing = {
  press: {
    /**
     * Highlight onset once a press is believed: none, the highlight is
     * painted in the frame the touch is accepted (after
     * `scroll.delaysContentTouchesMs` inside a scroller).
     * @source measured: Settings and Contacts, iOS 26.2, simulator driven
     *   with real HID touches at 60 fps (touch press model,
     *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
     */
    highlightInMs: 0,
    /**
     * A tap released before the onset delay still flashes the highlight at
     * full strength for this long before fading.
     * @source measured: Settings and Contacts, iOS 26.2, simulator driven
     *   with real HID touches at 60 fps (PRESS_FLASH_MS,
     *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
     */
    flashMs: 100,
    /**
     * Highlight fade after release: UIKit's deselect cross-fade.
     * @source measured: Settings and Contacts, iOS 26.2, simulator driven
     *   with real HID touches at 60 fps (PRESS_FADE_MS / pressConsts.releaseMs,
     *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
     */
    highlightOutMs: 200,
    /**
     * A touch on a scroller that moved this recently brakes it instead of
     * pressing.
     * @source measured: Settings and Contacts, iOS 26.2, simulator driven
     *   with real HID touches at 60 fps (PRESS_SCROLL_BRAKE_MS,
     *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
     */
    scrollBrakeMs: 150,
  },
  curves: {
    /**
     * `CAMediaTimingFunctionName.default`: "the timing of … most system
     * animations" that are not springs.
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/default
     */
    caDefault: [0.25, 0.1, 0.25, 1],
    /**
     * `easeInEaseOut`; UIKit's default curve (`UIView.AnimationCurve
     * .easeInOut`, "the default curve for most animations").
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/easeineaseout
     */
    easeInOut: [0.42, 0, 0.58, 1],
    /**
     * `easeIn`.
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/easein
     */
    easeIn: [0.42, 0, 1, 1],
    /**
     * `easeOut`.
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/easeout
     */
    easeOut: [0, 0, 0.58, 1],
  },
  /**
   * `UINavigationController.hideShowBarDuration`, in ms.
   * @source GUESS — Apple documents the constant
   *   (https://developer.apple.com/documentation/uikit/uinavigationcontroller/hideshowbarduration),
   *   not its value; 0.2 s is the commonly printed value
   * @measure M-NB1
   */
  navigationBarHideShowMs: 200,
  /**
   * The duration the keyboard notifications report
   * (UIKeyboardAnimationDurationUserInfoKey), in ms. The frame itself
   * follows `springs.keyboard`.
   * @source GUESS — commonly printed value on iPhone
   * @measure M-K2
   */
  keyboardNotificationMs: 250,
  /**
   * Reduced Motion: UIKit replaces travel with a cross-fade
   * (`UIAccessibility.prefersCrossFadeTransitions`,
   * https://developer.apple.com/documentation/uikit/uiaccessibility/preferscrossfadetransitions);
   * the duration and curve of that fade, in ms.
   * @source GUESS — easeInOut over 300 ms until measured
   * @measure M-RM1
   */
  reducedMotionCrossFadeMs: 300,
} as const;
