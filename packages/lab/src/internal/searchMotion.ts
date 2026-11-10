// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file searchMotion.ts
 * @input Measurements of UIKit's search bar on the iOS 26.2 simulator
 * @output `search`: UISearchController's activation clock, the stacked
 *   field's geometry, and the close and clear buttons
 * @position Lab's measured values for iOS 26's search bar. Only Lab reads
 *   them, so they stay in Lab and not in Core's UIKit tables.
 *
 * SYNC: When modified, update searchMotion.test.ts.
 */

/**
 * UISearchController's search bar: activation, cancel, geometry and
 * placements. Every leaf names its source in `@source`. A `measured` value
 * comes from the UIKit lab: an injected host app on the iOS 26.2 simulator,
 * iPhone 17 Pro.
 */
export const search = {
  /**
   * The activation's clock, in ms. One UIViewPropertyAnimator moves the
   * field, its width, the close button and the large title. It runs on
   * UIKit's ease-in-ease-out, the `timing.curves.move` role, whose control
   * points are the animator's UICubicTimingParameters. Cancel runs the same
   * animator backwards over the same time.
   * @source measured: UIViewPropertyAnimator duration and
   *   UICubicTimingParameters read at setup, and the field's frame per frame
   *   (rms 1.5 % against this clock and curve)
   */
  activationMs: 383.3,
  // Reduce Motion: UIKit keeps the activation's travel with or without
  // Prefer Cross-Fade Transitions, measured in the same lab. Astryx's own
  // reduced-motion handling decides instead, so the table has no setting for
  // it.
  stacked: {
    /**
     * The stacked field's height, pt.
     * @source measured: UISearchTextField frame (370 × 44 at x 16)
     */
    fieldHeight: 44,
    /**
     * The field's inset from each side of its container, pt (370 wide on a
     * 402 pt screen).
     * @source measured: UISearchTextField frame
     */
    fieldInset: 16,
    /**
     * The glass close button that replaces iOS 18's Cancel text: a square of
     * this side, pt, at the trailing inset.
     * @source measured: the close UIButton's frame (44 × 44 at x 342)
     */
    closeSize: 44,
    /**
     * The gap between the active field and the close button, pt. The active
     * field narrows to the container's width minus the two insets, this gap
     * and the button (315 on a 402 pt screen).
     * @source measured: the active field (x 16, 315 wide) and the close button
     *   (x 342)
     */
    closeGap: 11,
    /**
     * How far past its resting place the close button starts, toward the
     * trailing edge, pt. It slides in from there while its opacity goes 0 → 1,
     * both on the activation's curve. On cancel it slides back out at full
     * opacity and is removed at the end.
     * @source measured: the close button's frame and alpha per frame (x 386 →
     *   342, alpha 0 → 1; cancel 342 → 386 at alpha 1)
     */
    closeTravel: 44,
  },
  clear: {
    /**
     * The clear button's side inside the field, pt. It appears and disappears
     * at once, with no fade. A tap clears the text without moving the
     * keyboard. Tapped while the field is not editing, it also makes the field
     * first responder.
     * @source measured: `_UITextFieldClearButton` frame and alpha per frame,
     *   and UIKeyboardWillShow 75 ms after a tap while not editing
     */
    size: 20,
  },
} as const;
