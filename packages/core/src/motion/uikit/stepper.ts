// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file stepper.ts
 * @input Nothing; data only
 * @output Exports `stepper`: UIStepper's tap and autorepeat clocks and its
 *   pressed state's timing, as measured on iOS 26.2, with a proposed ramp
 * @position The stepper domain of the UIKit constants table (motion/uikit)
 *
 * Durations are in ms. Each leaf carries its `@source`, and a GUESS carries
 * its `@measure` task too (uikit.test.ts enforces both).
 *
 * SYNC: When modified, update /packages/core/src/motion/README.md and
 * /packages/core/src/NumberInput/stepperTracking.ts.
 */

export const stepper = {
  autorepeat: {
    /**
     * A held half steps this long after the press reaches the control, then
     * keeps stepping. A quicker tap steps once, at the lift. The press
     * reaches the control at touch-down, or after a scroll view's
     * content-touch delay inside one (there, the first step came at +653 ms).
     * @source measured: UIKit lab (injected host app), iOS 26.2 sim iPhone 17 Pro, valueChanged against the HID stream (holds of 0.8, 3 and 8 s: first step at +505, +508, +514 ms; in a vertical scroll view +653 ms), Oct 23 2026 and Oct 24 2026
     */
    delayMs: 500,
    /**
     * The interval before the second step of a hold. Each later interval is
     * `acceleration` times the one before, down to `minIntervalMs`: one
     * steady ramp. UIStepper waits 500 ms between its first six steps, then
     * drops to 100 ms and later to 50 ms. Those first steps read as slow, so
     * the hold speeds up on a predictable ramp instead.
     * @source GUESS — proposed, pending owner review: UIStepper measured 500 ms between its first repeats (+514, 1017, 1520, 2023, 2525, 3028 ms), iOS 26.2 sim, Oct 23 2026
     * @measure M-STP20
     */
    firstIntervalMs: 250,
    /**
     * Each repeat's interval as a fraction of the one before: a steady
     * acceleration with no jump.
     * @source GUESS — proposed, pending owner review, with `firstIntervalMs`
     * @measure M-STP20
     */
    acceleration: 0.9,
    /**
     * The shortest interval: the ramp stops here; the step size never grows.
     * @source measured: UIKit lab (injected host app), iOS 26.2 sim iPhone 17 Pro, 8 s hold: steps 21 to 59 from +4514 to +6512 ms (52.5 ms apart), step size 1 throughout, Oct 23 2026
     */
    minIntervalMs: 50,
  },
  press: {
    /**
     * When the pressed half's fill changes after the press reaches the
     * control: in the first frame, with no animation, also under Reduce
     * Motion. Only the touched half changes.
     * @source measured: UIKit lab (injected host app), iOS 26.2 sim iPhone 17 Pro, rendered frames of a 60 ms tap and a 1.2 s hold, with and without Reduce Motion, Oct 24 2026
     */
    highlightInMs: 0,
    /**
     * When the fill returns after the lift: in the first frame, with no
     * fade.
     * @source measured: UIKit lab (injected host app), iOS 26.2 sim iPhone 17 Pro, rendered frames of a 60 ms tap and a 1.2 s hold, with and without Reduce Motion, Oct 24 2026
     */
    highlightOutMs: 0,
  },
  /**
   * The haptic UIStepper plays: none, on a tap, during a hold, or when a
   * hold reaches the maximum.
   * @source measured: UIKit lab (injected host app), iOS 26.2 sim iPhone 17 Pro, UIFeedbackGenerator hooks armed (impact, selection, notification), a tap, a 3 s hold and a hold from 7 to the maximum 10, Oct 23 2026 and Oct 24 2026
   */
  haptic: 'none',
} as const;
