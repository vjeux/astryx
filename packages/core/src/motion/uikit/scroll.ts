// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file scroll.ts
 * @input Nothing; data only
 * @output Exports `scroll`, the UIScrollView constants: deceleration rates,
 *   the rubber-band coefficient, the bounce-back spring, paging and the
 *   content-touch delay
 * @position The scroll domain of the UIKit constants table (motion/uikit);
 *   read by decay.ts, rubberBand.ts, projection.ts and components
 *
 * Every leaf carries one `@source` (apple-docs | wwdc | webkit | measured |
 * GUESS); webkit and GUESS values also carry the `@measure` task that will
 * confirm or replace them (listed in motion/README.md). sources.test.ts
 * enforces both.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/README.md (measurement list)
 */

export const scroll = {
  decelerationRate: {
    /**
     * Normal deceleration: the release velocity is multiplied by this every
     * millisecond. The value of the public SDK constant
     * `UIScrollView.DecelerationRate.normal`; its per-millisecond meaning is
     * the one WWDC18 803's projection function assumes ((v ÷ 1000) · r ÷
     * (1 − r)).
     * @source apple-docs https://developer.apple.com/documentation/uikit/uiscrollview/decelerationrate-swift.struct/normal
     *   (the constant, not its number)
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, rawValue read, Oct 23 2026 (also a new scroll view's
     *   decelerationRate)
     */
    normal: 0.998,
    /**
     * Fast deceleration (`UIScrollView.DecelerationRate.fast`).
     * @source apple-docs https://developer.apple.com/documentation/uikit/uiscrollview/decelerationrate-swift.struct/fast
     *   (the constant, not its number)
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, rawValue read, Oct 23 2026
     */
    fast: 0.99,
  },
  rubberBand: {
    /**
     * c in b = (1 − 1 ÷ (x·c ÷ d + 1))·d, d = the scroll view's size on the
     * axis (rubberBand.ts).
     * @source GUESS — formula and constant from Grant Paul,
     *   twitter.com/chpwn/status/285540192096497664; reproduced within 0.5 pt
     *   by I. Lobanov's device measurement of UIScrollView (finger 500 / 1000
     *   / 1500 pt past the edge → 205 / 328 / 409 pt on an 812 pt view),
     *   medium.com/@esskeetit/how-uiscrollview-works-e418adc47060
     * @measure M-S5
     */
    coefficient: 0.55,
  },
  /**
   * The spring that returns content released past an edge, and that catches
   * a coast hitting an edge (its velocity handed to the spring).
   * @source GUESS — critically damped as in I. Lobanov's UIScrollView
   *   reimplementation (no oscillation at the bound); pace from SwiftUI's
   *   `.smooth` default duration until measured
   * @measure M-S3
   */
  bounce: {duration: 0.5, bounce: 0},
  paging: {
    /**
     * Deceleration rate a paging release is projected with to pick the next
     * page (projection.ts `selectPage`).
     * @source GUESS — UIScrollView paging behaves like a fast scroll view;
     *   the rate it uses internally is not documented
     * @measure M-PG1
     */
    projectionRate: 0.99,
    /**
     * The spring that carries a paging scroll view onto its page.
     * @source GUESS — SwiftUI `.smooth` default until measured
     * @measure M-PG1
     */
    snap: {duration: 0.5, bounce: 0},
  },
  /**
   * `delaysContentTouches`: how long a scroll view holds a touch-down from
   * its content while it decides whether the touch is a scroll (no highlight
   * flash on a quick scroll), in ms.
   * @source wwdc 2014-235 "Advanced Scrollviews and Touch Handling
   *   Techniques": the touch-delay recognizer UIScrollView uses runs "a
   *   pretty short timer … Let's say .15 seconds" (presenter's example value)
   * @source measured: Settings and Contacts, iOS 26.2, simulator driven with
   *   real HID touches at 60 fps, recorded with the touch press model
   *   (PRESS_ONSET_MS in packages/core/src/utils/pressGesture.ts, 2026-10-06)
   */
  delaysContentTouchesMs: 150,
} as const;
