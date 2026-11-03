// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboard.ts
 * @input Nothing; data only
 * @output `keyboard`: the software keyboard's own spring, and when Mobile
 *   Safari's visual viewport reports the keyboard relative to its motion
 * @position The keyboard domain of the UIKit constants table. The keyboard
 *   model and Chat's keyboard ride read it. The keyboard's notification
 *   duration is `timing.keyboardNotificationMs`.
 *
 * Every leaf carries at least one `@source`, and webkit and GUESS values a
 * `@measure` task too. uikit.test.ts enforces both.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

// UIKit hands a view the keyboard's end frame before the keyboard moves. A
// page learns it only from the visual viewport, which Mobile Safari updates
// once per show or hide, and late. These offsets let the keyboard layout
// guide date each motion back to where the keyboard really is. The spring is
// no motion role. The system moves the keyboard on it whatever the page does,
// so content that rides the keyboard plays this value.
export const keyboard = {
  /**
   * The keyboard's frame animation, show and hide alike: critically damped,
   * response 0.2667 s. The notification reports curve 7 and 0.3833 s
   * (`timing.keyboardNotificationMs`); Core Animation cuts the spring there.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation read on the keyboard host and a
   *   keyboardLayoutGuide-pinned view, Oct 23 2026
   */
  spring: {mass: 1, stiffness: 555.0265, damping: 47.118},
  /**
   * How long after the keyboard starts to rise Mobile Safari usually fires
   * the visual viewport's one `resize` for it, with the final height, in ms.
   * That is about a frame on an idle page. Content that follows the keyboard
   * starts its spring this far in the past.
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   60 fps recordings of seven shows on a light page, the keyboard
   *   assembly's top edge fitted to `keyboard.spring` (rms ≤ 1.8 pt)
   *   against the resize event's timestamp: 11 to 31 ms, mean 19,
   *   Oct 24 2026
   */
  showReportLagMs: 19,
  /**
   * How long after the field that brings up the keyboard gains focus the
   * keyboard starts to rise, in ms. UIKit raises it on its own schedule, so
   * a busy main thread does not delay it; only the page's report waits.
   * When the report comes late, the guide dates the show from the focus by
   * this much. It then joins the keyboard's spring where it is.
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   fourteen shows from a tap on ChatLayout's composer: the visual
   *   viewport's resize came 173 to 241 ms after the focus (median 206),
   *   less `showReportLagMs`, Oct 24 2026
   */
  focusToShowMs: 187,
  /**
   * The longest lag seen when the page's main thread was busy as the
   * keyboard rose. The resize waits for the thread, so the keyboard started
   * at about the last animation frame before the resize. Without a focus to
   * date it from, the guide dates a show back to that frame, but never
   * further than this, in ms.
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   60 fps recording of ChatLayout's full chat story, the keyboard's top
   *   edge fitted to `keyboard.spring` (rms 0.9 pt): it started 43 ms
   *   before the resize and 1 ms before the last frame preceding it,
   *   Oct 24 2026
   */
  showReportLagMaxMs: 43,
  /**
   * How long after the focused field blurs to nothing that brings up a
   * keyboard the keyboard starts to fall, in ms. The page's blur and the
   * accessory bar's Done give the same lag. Safari reports the hide only once
   * the keyboard is down, 417 to 453 ms after the blur.
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   60 fps recordings of six hides (three after a scripted blur, three
   *   after a tap on Done), the keyboard assembly's top edge fitted to
   *   `keyboard.spring` against the blur's timestamp: 18 to 28 ms, mean
   *   23, Oct 24 2026
   */
  hideAfterBlurMs: 23,
} as const;
