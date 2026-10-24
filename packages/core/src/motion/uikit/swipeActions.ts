// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file swipeActions.ts
 * @input Nothing; data only
 * @output Exports `swipeActions`: the swipe-action row's gesture thresholds
 *   (the web's claim and UIKit's swipe), its tracking and settle springs and
 *   their Reduce Motion behavior, and the speed and position that pick where
 *   a release lands
 * @position The swipe-actions domain of the UIKit constants table
 *   (motion/uikit): `UIContextualAction` / `UISwipeActionsConfiguration` rows
 *   of a table or collection list
 *
 * Measured on a UIKit host app (plain `UITableView`, 402 pt rows, two
 * trailing actions, iOS 26.2). Lengths are in pt (CSS px), springs in the
 * vocabulary UIKit was read in (`toSpring` normalizes).
 *
 * Every leaf carries one or more `@source`; GUESS values also carry the
 * `@measure` task that will confirm or replace them. uikit.test.ts enforces
 * both.
 *
 * SYNC: When modified, update /packages/core/src/motion/MEASUREMENTS.md
 */

export const swipeActions = {
  /**
   * Sideways travel at which the row claims the touch from the browser, NOT
   * a UIKit value: on the web a scrolling ancestor takes the touch at about
   * 10 px unless the page cancels `touchmove` before that, so the row claims
   * at 8 px and its swipe still begins at `hysteresis`. In between the touch
   * moves neither the row nor the page.
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro, the
   *   touch stream against WebKit's scroll commit on a scrollable element
   *   (the last cancelable `touchmove` at 10 px; cancelling every `touchmove`
   *   from 8 px keeps the page still for the whole gesture), Oct 23 2026
   */
  claim: 8,
  /**
   * Finger travel before the swipe begins. The travel up to that point is
   * not part of the swipe: the row starts from where it was, it never jumps
   * by the threshold.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `_UISwipeActionPanGestureRecognizer` `_hysteresis` ivar
   *   read (25) and a 1 pt step drag: began at exactly 25 pt of travel with
   *   a translation of 0, Oct 23 2026
   */
  hysteresis: 25,
  /**
   * The spring the row follows the finger with. Each move starts a new
   * spring toward the finger's offset, from the row's presentation value and
   * velocity, so the row trails a moving finger and catches up when it
   * stops. Overdamped on paper; Core Animation renders it critically damped
   * (allowsOverdamping off), ω₀ = 10 rad/s, which `toSpring` mirrors.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `UIViewPropertyAnimator` with
   *   `UISpringTimingParameters(mass: 2, stiffness: 200, damping: 100)`
   *   read on every tracking update, seeded with the presentation velocity,
   *   settlingDuration 0.9235 s, Oct 23 2026
   */
  tracking: {mass: 2, stiffness: 200, damping: 100},
  /**
   * The settle after the finger lifts, to open, to closed or out: the same
   * spring, seeded with the row's presentation velocity (the tracking
   * spring's), not with the finger's.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the release animator read: mass 2, stiffness 200,
   *   damping 100, rendered critically damped; a 1000 pt/s closing flick
   *   seeded it with the presentation velocity (initialVelocity 2.88), not
   *   the finger's, Oct 23 2026
   */
  settle: {mass: 2, stiffness: 200, damping: 100},
  /**
   * Reduce Motion changes nothing: the row still follows the finger and
   * settles on the same springs (the animator's `keep`).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, Reduce Motion on: the same
   *   `UISpringTimingParameters(mass: 2, stiffness: 200, damping: 100)`
   *   animators on tracking and release, and the full swipe still performs,
   *   Oct 23 2026
   */
  reducedMotion: 'keep',
  /**
   * Where a slow release lands (one slower than `releaseVelocity`): past
   * this fraction of the open width the row opens, short of it the row
   * closes.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, releases at rest: 0.32 × the 156.67 pt open width
   *   closed and 0.56 opened (batch 10a), Oct 23 2026
   * @source GUESS — the fraction inside the measured 0.32 to 0.56 bracket
   * @measure M-SA01
   */
  openFraction: 0.5,
  /**
   * A release this fast goes the way it moves: it opens the row when it
   * opens and closes it when it closes, from anywhere short of the commit
   * point. A flick therefore never fires an action.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro: released at 0.67 to 0.75 × the open width while
   *   coming back at 50, 100, 200 or 300 pt/s the row closed, and while
   *   moving out at the same speeds it opened (batch 38c); coming back at
   *   19 pt/s from 1.04 × the open width it stayed open, and of 51
   *   releases every one at 283 pt/s or more went its way (batch 10a),
   *   Oct 23 2026
   * @source GUESS — the speed inside the measured 19 to 50 pt/s bracket
   * @measure M-SA05
   */
  releaseVelocity: 35,
  /**
   * Past the open width, how far beyond the panel the row must be dragged
   * for a release to fire the outermost action (`commitPastPanel`), unless
   * `commitFraction` of the row is further.
   * @source GUESS — the threshold Astryx used before the UIKit lab; UIKit's
   *   confirmation threshold (the table width − 29 pt on iOS 26.2) replaces
   *   it with the full-swipe expansion
   * @measure M-SA02
   */
  commitPastPanel: 48,
  /**
   * See `commitPastPanel`.
   * @source GUESS — the threshold Astryx used before the UIKit lab
   * @measure M-SA02
   */
  commitFraction: 0.5,
  /**
   * Past the commit point the row moves this much per point of finger
   * travel.
   * @source GUESS — the resistance Astryx used before the UIKit lab
   * @measure M-SA03
   */
  overdragResistance: 0.35,
  /**
   * How far past the row's edge the row travels when an action fires and
   * the row goes out.
   * @source GUESS — the distance Astryx used before the UIKit lab
   * @measure M-SA04
   */
  slideOutOvershoot: 24,
} as const;
