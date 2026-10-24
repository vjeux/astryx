// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file switch.ts
 * @input Nothing; data only
 * @output Exports `switchControl`: UISwitch's geometry, clocks, track color
 *   curve, press-and-drag rules, shadow, disabled opacity and haptic style
 * @position The switch domain of the UIKit constants table (motion/uikit);
 *   its springs are `springs.switchThumbMove` and `springs.switchThumbStretch`
 *
 * Every value comes from WebKit's native switch (iOS Safari's
 * `<input type=checkbox switch>`), whose source states its values were chosen
 * for consistency with UIKit; each is to be confirmed on the iOS simulator
 * (MEASUREMENTS.md, M-SW rows). Lengths are in pt (CSS px); curves are
 * cubic-bézier control points [x1, y1, x2, y2].
 *
 * Every leaf carries one or more `@source`; webkit and GUESS values also carry
 * the `@measure` task that will confirm or replace them. uikit.test.ts
 * enforces both.
 *
 * SYNC: When modified, update /packages/core/src/motion/MEASUREMENTS.md
 */

export const switchControl = {
  /**
   * Track size before iOS 26 (width × height).
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `logicalSwitchWidth = 51.f`, `logicalSwitchHeight = 31.f`
   * @measure M-SW01
   */
  trackSize: [51, 31],
  /**
   * Track size with iOS 26's Liquid Glass controls.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `idealSwitchSize = { 64, 28 }`
   * @measure M-SW01
   */
  trackSizeGlass: [64, 28],
  /**
   * Gap between the thumb and the track edge; the thumb is the track height
   * minus twice this.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `thumbMargin = 2.f * trackScale`
   * @measure M-SW01
   */
  thumbInset: 2,
  /**
   * While held, the thumb widens by this many insets toward its travel
   * (8 pt on a 31 pt track), on `springs.switchThumbStretch`.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `logicalThumbWidth = thumbLength + 4.f * thumbMargin * …`
   * @measure M-SW03
   */
  stretchInsets: 4,
  /**
   * How long the thumb travel animation runs (the settling duration of
   * `springs.switchThumbMove`), in ms.
   * @source webkit Source/WebCore/rendering/ios/RenderThemeIOS.h
   *   `switchAnimationVisuallyOnDuration() 0.4880138408543766_s`
   * @measure M-SW02
   */
  moveMs: 488.0138408543766,
  /**
   * How long the stretch animation runs (the settling duration of
   * `springs.switchThumbStretch`), in ms.
   * @source webkit Source/WebCore/rendering/ios/RenderThemeIOS.h
   *   `switchAnimationHeldDuration() 0.5073965509413827_s`
   * @measure M-SW03
   */
  stretchMs: 507.3965509413827,
  /**
   * The track color's progress over `moveMs`: smoothstep 3p² − 2p³, which is
   * exactly this cubic bézier.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `easeInOut(progress) = -2 p³ + 3 p²` applied to the track color
   * @measure M-SW02
   */
  trackColorCurve: [1 / 3, 0, 2 / 3, 1],
  /**
   * A press is held this long before the thumb stretches and drags track,
   * in ms (a scroll view's own content delay is 150 ms).
   * @source webkit Source/WebCore/html/CheckboxInputType.cpp
   *   `switchHeldDelay = 200_ms`
   * @measure M-SW03
   */
  holdDelayMs: 200,
  /**
   * A drag flips the switch when the finger crosses this fraction of the
   * track width.
   * @source webkit Source/WebCore/html/CheckboxInputType.cpp
   *   `changePosition = switchTrackLogicalWidth / 2`
   * @measure M-SW04
   */
  flipLine: 0.5,
  /**
   * For the first flip of a press that started on the far (empty) side, the
   * flip line sits this fraction of the track width past the press instead.
   * @source webkit Source/WebCore/rendering/RenderTheme.h
   *   `switchPointerTrackingMagnitudeProportion() 0.4f`, used in
   *   CheckboxInputType.cpp
   * @measure M-SW04
   */
  farSideFlipOffset: 0.4,
  /**
   * Thumb drop shadow: x, y offset and blur in pt, then black alpha.
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `setDropShadow({ FloatSize { 0, 2.5 }, 6 * usedZoom, …})`, alpha 0.12
   * @measure M-SW01
   */
  thumbShadow: [0, 2.5, 6, 0.12],
  /**
   * Opacity of a disabled switch (iOS 26 controls).
   * @source webkit Source/WebCore/rendering/cocoa/RenderThemeCocoa.mm
   *   `switchDisabledOpacity = 0.5f`
   * @measure M-SW01
   */
  disabledOpacity: 0.5,
  /**
   * Haptic on every flip during a drag and on a toggling tap: a light impact.
   * @source webkit Source/WebCore/html/CheckboxInputType.cpp
   *   `performSwitchHapticFeedback()` on each visual flip and on a click with
   *   a user gesture; Source/WebKit/UIProcess/ios/PageClientImplIOS.mm plays
   *   it as `UIImpactFeedbackGenerator(style: .light)`
   * @measure M-SW09
   */
  hapticStyle: 'light',
} as const;
