// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file keyboard.ts
 * @input None
 * @output `KEYBOARD_SPRING`, `KEYBOARD_NOTIFICATION_MS` and `keyboard`: how
 *   UIKit moves the software keyboard on iOS, as Safari shows it. They hold
 *   the keyboard frame's spring and the duration the keyboard notifications
 *   report.
 * @position The keyboard domain of the UIKit constants table, read by
 *   keyboard/keyboardModel.ts. springs.ts and timing.ts list the same values
 *   in their tables. It registers nothing, so the keyboard module loads no
 *   other table.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

// UIKit moves the keyboard on these values whatever the page does. Content
// that rides the keyboard plays them from the slide's start, so it moves in
// step with the keyboard. They are the keyboard's own motion, with no motion
// role. Every leaf carries one or more `@source`, and uikit.test.ts enforces
// it.

/**
 * The keyboard frame's animation, show and hide alike: critically damped,
 * response 0.2667 s. Core Animation cuts it at `keyboard.notificationMs`.
 * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
 *   iPhone 17 Pro, CAAnimation read on the keyboard host and a
 *   keyboardLayoutGuide-pinned view, Oct 23 2026
 */
export const KEYBOARD_SPRING = {
  mass: 1,
  stiffness: 555.0265,
  damping: 47.118,
} as const;

// The duration the keyboard notifications report, as `keyboard` lists it. A
// table that lists it by this name keeps its other rows out of a bundle.
export const KEYBOARD_NOTIFICATION_MS = 383.3;

export const keyboard = {
  spring: KEYBOARD_SPRING,
  /**
   * The duration the keyboard notifications report
   * (UIKeyboardAnimationDurationUserInfoKey, with curve 7), show and hide
   * alike, in ms.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIKeyboardWillShow / WillHide / WillChangeFrame read,
   *   Oct 23 2026
   */
  notificationMs: KEYBOARD_NOTIFICATION_MS,
} as const;
