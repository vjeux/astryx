// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file springs.ts
 * @input Nothing; data only
 * @output Exports `springs`, every UIKit / SwiftUI interaction spring the
 *   touch presentations use, each in the vocabulary of its source
 *   (SpringDescription: duration/bounce, response/dampingRatio or
 *   mass/stiffness/damping; `toSpring` normalizes)
 * @position The springs domain of the UIKit constants table (motion/uikit)
 *
 * Every leaf carries one or more `@source` (apple-docs | wwdc | webkit |
 * measured | GUESS); webkit and GUESS values also carry the `@measure` task
 * that will confirm or replace them (motion/README.md lists them all).
 * sources.test.ts enforces both.
 *
 * Most interaction springs below are GUESSES today: UIKit does not document
 * the springs of its own transitions, and the simulator measurements that
 * will replace them (method in motion/README.md) have not run yet. Each
 * guess starts from the nearest sourced spring and names it, so a component
 * built on the table gets the right value the moment the measurement lands,
 * without changing.
 *
 * Press highlight in/out are fades, not springs: see timing.ts.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/README.md (measurement list)
 */

/**
 * UIKit's default spring (see `springs.uikitDefault` for its sources). The
 * guesses below start from it: the system-driven transitions it is believed
 * to drive until each is measured.
 */
const UIKIT_DEFAULT_SPRING = {mass: 3, stiffness: 1000, damping: 500} as const;

export const springs = {
  // ---------------------------------------------------------------------
  // Sourced presets
  // ---------------------------------------------------------------------

  /**
   * SwiftUI `.smooth`: no bounce. Also SwiftUI's `Spring()` and
   * `.spring(duration:bounce:)` defaults.
   * @source apple-docs https://developer.apple.com/documentation/swiftui/spring/smooth(duration:extrabounce:)
   */
  smooth: {duration: 0.5, bounce: 0},
  /**
   * SwiftUI `.snappy`: "small amount of bounce", base bounce 0.15.
   * @source apple-docs https://developer.apple.com/documentation/swiftui/spring/snappy(duration:extrabounce:)
   */
  snappy: {duration: 0.5, bounce: 0.15},
  /**
   * SwiftUI `.bouncy`: base bounce 0.3.
   * @source apple-docs https://developer.apple.com/documentation/swiftui/spring/bouncy(duration:extrabounce:)
   */
  bouncy: {duration: 0.5, bounce: 0.3},
  /**
   * SwiftUI `interactiveSpring()` defaults: for a value that tracks a finger.
   * @source apple-docs https://developer.apple.com/documentation/swiftui/animation/interactivespring(response:dampingfraction:blendduration:)
   */
  interactive: {response: 0.15, dampingRatio: 0.86},
  /**
   * SwiftUI `Animation.default` since iOS 17 (what `withAnimation` uses).
   * @source apple-docs https://developer.apple.com/documentation/swiftui/animation/default
   */
  swiftUIDefault: {response: 0.55, dampingRatio: 1},
  /**
   * SwiftUI `.spring(response:dampingFraction:blendDuration:)` defaults.
   * @source apple-docs https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:)
   */
  swiftUISpring: {response: 0.5, dampingRatio: 0.825},
  /**
   * UIKit `UIView.animate(springDuration:bounce:…)` defaults (iOS 17).
   * @source apple-docs https://developer.apple.com/documentation/uikit/uiview/animate(springduration:bounce:initialspringvelocity:delay:options:animations:completion:)
   */
  uikitSpringDuration: {duration: 0.5, bounce: 0},
  /**
   * UIKit's default spring, `UISpringTimingParameters()`: Apple documents
   * its damping ratio as 4.56, which is exactly 500 ÷ (2·√(3·1000)).
   * Overdamped on paper; Core Animation treats overdamping as critical
   * unless told otherwise, which `toSpring` mirrors: in effect a critically
   * damped spring with ω₀ = 18.26 rad/s (response 0.344 s) that settles in
   * 0.506 s. The keyboard does not use it (see `keyboard`).
   * @source apple-docs https://developer.apple.com/documentation/uikit/uispringtimingparameters/init() (damping ratio 4.56)
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation read, Oct 23 2026: UISpringTimingParameters()
   *   is mass 3, stiffness 1000, damping 500; UIKit runs it for 0.505824 s
   *   (clamped to critical) whatever duration the animator was given, and
   *   `UIView.animate` with curve 7 outside the keyboard is this spring with
   *   its duration forced to 0.5 s
   */
  uikitDefault: UIKIT_DEFAULT_SPRING,

  // ---------------------------------------------------------------------
  // Navigation (UINavigationController)
  // ---------------------------------------------------------------------

  /**
   * Push: incoming view slides in from the trailing edge, outgoing parallax.
   * @source GUESS — provisional recording fit of Settings ▸ General on the
   *   iOS 26.2 simulator (about 400 ms for 402 pt, overdamped: response
   *   ≈ 0.12–0.14 s, damping ratio ≈ 1.7–1.8, rms 1.6–2 %; the page
   *   underneath shifts about −106 pt), pending averaged captures
   * @measure M-N1
   */
  navigationPush: {response: 0.13, dampingRatio: 1.75},
  /**
   * Pop (back button).
   * @source GUESS — assumed symmetric with the push until measured
   * @measure M-N2
   */
  navigationPop: {response: 0.13, dampingRatio: 1.75},
  /**
   * Interactive pop (edge swipe) finishing or cancelling after the finger
   * lifts; the release velocity is handed to it.
   * @source GUESS — UIKit's default spring
   * @measure M-N3
   */
  navigationInteractivePopFinish: UIKIT_DEFAULT_SPRING,

  // ---------------------------------------------------------------------
  // Sheets (UISheetPresentationController)
  // ---------------------------------------------------------------------

  /**
   * Sheet presented by a tap: no overshoot.
   * @source wwdc 2018-803 "Designing Fluid Interfaces": a presentation
   *   driven by a tap has no momentum, so Music's Now Playing uses 100 %
   *   damping (damping ratio)
   * @source GUESS — pace from UIKit's default spring
   * @measure M-SH07
   */
  sheetPresent: UIKIT_DEFAULT_SPRING,
  /**
   * Sheet dismissed by a control (Cancel / Done / scrim tap).
   * @source wwdc 2018-803 (no momentum → 100 % damping)
   * @source GUESS — pace from UIKit's default spring
   * @measure M-SH07
   */
  sheetDismiss: UIKIT_DEFAULT_SPRING,
  /**
   * Sheet dismissed by a swipe: the gesture's momentum earns a little
   * overshoot.
   * @source wwdc 2018-803 "Designing Fluid Interfaces": swipe-to-dismiss
   *   Now Playing "has momentum … so we use 80 % damping" (damping ratio)
   * @source GUESS — response from UIKit's default spring's ω₀
   * @measure M-SH09
   */
  sheetDismissSwipe: {response: 0.344, dampingRatio: 0.8},
  /**
   * Snap between detents after a drag releases (release velocity handed
   * over).
   * @source GUESS — critically damped at UIKit's default pace
   * @measure M-SH08
   * @measure M-SH09
   */
  sheetDetent: UIKIT_DEFAULT_SPRING,

  // ---------------------------------------------------------------------
  // Alerts, action sheets, menus
  // ---------------------------------------------------------------------

  /**
   * Alert (UIAlertController .alert) appearing.
   * @source GUESS — UIKit's default spring
   * @measure M-A1
   */
  alertPresent: UIKIT_DEFAULT_SPRING,
  /**
   * Alert dismissing.
   * @source GUESS — UIKit's default spring
   * @measure M-A1
   */
  alertDismiss: UIKIT_DEFAULT_SPRING,
  /**
   * Action sheet (UIAlertController .actionSheet) appearing.
   * @source GUESS — UIKit's default spring
   * @measure M-AS1
   */
  actionSheetPresent: UIKIT_DEFAULT_SPRING,
  /**
   * Action sheet dismissing.
   * @source GUESS — UIKit's default spring
   * @measure M-AS1
   */
  actionSheetDismiss: UIKIT_DEFAULT_SPRING,
  /**
   * UIMenu (pull-down / button menu) opening.
   * @source GUESS — UIKit's default spring
   * @measure M-AS1
   */
  menuOpen: UIKIT_DEFAULT_SPRING,
  /**
   * UIMenu closing.
   * @source GUESS — UIKit's default spring
   * @measure M-AS1
   */
  menuClose: UIKIT_DEFAULT_SPRING,
  /**
   * Context menu (UIContextMenuInteraction): preview lift after the long
   * press commits.
   * @source GUESS — UIKit's default spring
   * @measure M-CM1
   */
  contextMenuLift: UIKIT_DEFAULT_SPRING,
  /**
   * Context menu dismissing back into its source.
   * @source GUESS — UIKit's default spring
   * @measure M-CM1
   */
  contextMenuDismiss: UIKIT_DEFAULT_SPRING,

  // ---------------------------------------------------------------------
  // Controls
  // ---------------------------------------------------------------------

  /**
   * UISwitch thumb travelling between off and on.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `thumbMoveSpring = SpringSolver(1.0, 438.649…, 31.4159…)`, "Values
   *   chosen for consistency with UIKit" (= response 0.30 s, ratio 0.75);
   *   its settling duration is WebKit's iOS switch duration 0.48801 s
   *   (RenderThemeIOS.h)
   * @measure M-SW02
   */
  switchThumbMove: {response: 0.3, dampingRatio: 0.75},
  /**
   * UISwitch thumb stretching while pressed and relaxing on release.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `thumbPressSpring = SpringSolver(1.0, 322.272…, 31.2364…)`, "Values
   *   chosen for consistency with UIKit" (= response 0.35 s, ratio 0.87);
   *   settles in WebKit's held duration 0.50740 s (RenderThemeIOS.h)
   * @measure M-SW03
   */
  switchThumbStretch: {response: 0.35, dampingRatio: 0.87},
  /**
   * UISegmentedControl selection thumb sliding to a new segment.
   * @source GUESS — WebKit's UIKit-matched switch thumb spring, the nearest
   *   sourced control thumb
   * @measure M-SG02
   * @measure M-SG03
   */
  segmentedThumb: {response: 0.3, dampingRatio: 0.75},

  // ---------------------------------------------------------------------
  // System
  // ---------------------------------------------------------------------

  /**
   * Keyboard frame animation, show and hide alike: critically damped,
   * response 0.2667 s. The notification reports curve 7 and 0.3833 s
   * (`timing.keyboardNotificationMs`); Core Animation cuts the spring there.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation read on the keyboard host and a
   *   keyboardLayoutGuide-pinned view, Oct 23 2026
   */
  keyboard: {mass: 1, stiffness: 555.0265, damping: 47.118},
  /**
   * Scroll-to-top after a status-bar tap.
   * @source GUESS — UIKit's default spring
   * @measure M-ST1
   */
  scrollToTop: UIKIT_DEFAULT_SPRING,
  /**
   * Banner / toast sliding in from the top edge (system notification
   * banner as the reference).
   * @source GUESS — UIKit's default spring
   * @measure M-T1
   */
  banner: UIKIT_DEFAULT_SPRING,
} as const;
