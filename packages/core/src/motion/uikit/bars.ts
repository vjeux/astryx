// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file bars.ts
 * @input Nothing; data only
 * @output Exports `bars`, the switch, springs, reach and veil of the iOS 26
 *   scroll edge effect under a navigation bar, and `registerBarsTable`
 * @position The bars domain of the UIKit constants table (motion/uikit)
 *
 * The values are a navigation bar's on iOS 26.2, read in a UIKit host app on
 * the simulator. Lengths are in pt (CSS px). uikit.test.ts checks each `@source`.
 *
 * SYNC: When modified, update /packages/core/src/motion/MEASUREMENTS.md.
 */

import {registerMotionTable} from '../roles';

export const bars = {
  /**
   * An iOS 26.2 navigation bar paints no background. The scroll view's edge
   * effect, a veil of one colour, separates the bar from the content under it.
   * The veil's colour is a theme value; this table holds its shape and motion.
   */
  scrollEdgeEffect: {
    /**
     * The effect is off while the content sits at most this many pt past its
     * rest offset, and on beyond it. It is a switch, not a ramp: opacity 0
     * through +10.0 pt and 1 from +10.25 pt. The same threshold turns it off
     * on the way back, with no hysteresis. Overscroll keeps it off.
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, content offset stepped from +7.5 to +12.5 pt past
     *   rest in 0.25 pt steps, ScrollEdgeEffectView model and presentation
     *   opacity read after each step and 500 ms later, Oct 23 2026
     */
    switchPt: 10,
    /**
     * The fade in when the content passes the switch: opacity 0 → 1 on this
     * CASpringAnimation. It is critically damped, with a response of 0.2 s
     * (0.294 s in Core Animation).
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, `-[CALayer addAnimation:forKey:]` hooked on the effect
     *   view while crossing the switch (opacity, mass 1, stiffness 986.96,
     *   damping 62.83, duration 0.294), and its presentation opacity sampled
     *   every frame through a 100 pt/s HID drag, Oct 23 2026
     */
    appear: {mass: 1, stiffness: 986.96, damping: 62.83},
    /**
     * The fade out when the content comes back over the switch: opacity 1 → 0
     * on this CASpringAnimation. It is critically damped, with a response of
     * 0.35 s (0.514 s in Core Animation).
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, `-[CALayer addAnimation:forKey:]` hooked on the effect
     *   view while crossing the switch back (opacity, mass 1, stiffness
     *   322.27, damping 35.90, duration 0.514), and its presentation opacity
     *   sampled every frame through the drag back to rest, Oct 23 2026
     */
    disappear: {mass: 1, stiffness: 322.27, damping: 35.9},
    /**
     * How far the soft edge reaches below the bar's bottom edge, in pt. The
     * effect view is 170.8 pt tall under a bar whose bottom edge is at 116 pt.
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, ScrollEdgeEffectView frame (0, 0, 402, 170.8) under a
     *   standard navigation bar at y 62, height 54, Oct 23 2026
     */
    softExtentPt: 54.8,
    veil: {
      /**
       * The veil's highest alpha over the content: the opacity of its
       * LuminanceAdjustment layer, in light and dark mode alike. Black and
       * mid-grey content read through it with the same alpha. On iOS the veil
       * adapts to the luminance behind the bar; the web veil takes the bar's
       * theme colour.
       * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
       *   iPhone 17 Pro, screenshots of solid black, #808080 and white
       *   content under the effect read per pt row (y 0–180, light and dark,
       *   with and without a title), and the LuminanceAdjustment layer's
       *   opacity (0.85 in both modes), Oct 23 2026
       */
      maxAlpha: 0.85,
      /**
       * Where the veil's edge is half-transparent under a titled bar: this many
       * pt above the bottom of the bar's content. The mask is the Gaussian
       * shadow of a rectangle ending there. A bar with no content puts the
       * edge 11 pt above the status bar's bottom instead, with softness 24.
       * An expanded large title sits outside the veil.
       * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
       *   iPhone 17 Pro, PocketMask's ShadowLayer frame in window coordinates
       *   with an inline title and with a collapsed large title (bottom edge
       *   at y 106), with no bar content and with an expanded large title
       *   (y 51), Oct 23 2026
       */
      edgeAboveContentBottomPt: 10,
      /**
       * How soft the edge is under a titled bar: the veil's alpha is
       * `maxAlpha × (1 − Φ((y − edge) / softnessPt))`, with Φ the standard
       * normal CDF. It is the ShadowLayer's shadowRadius. Nothing behind the
       * veil is blurred: a 1 pt stripe pattern loses only the veil's contrast.
       * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
       *   iPhone 17 Pro, the ShadowLayer's shadowRadius (18 with a title, 24
       *   without), per-pt-row profiles, 1 pt stripe contrast per row,
       *   Oct 23 2026
       */
      softnessPt: 18,
    },
  },
} as const;

/**
 * Registers the bars table (motion/roles.ts). It lists no roles: the springs
 * stay internal constants, and the switch, the reach and the veil are not
 * motion. Nothing registers on import. AppShell hands this function to the
 * scroll edge effect, which calls it once before its first animation.
 */
export function registerBarsTable(): void {
  registerMotionTable('bars', bars);
}
