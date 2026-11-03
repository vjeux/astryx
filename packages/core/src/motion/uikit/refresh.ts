// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file refresh.ts
 * @input Nothing; data only
 * @output Exports `refreshControl`, the UIRefreshControl constants: height,
 *   trigger, reveal, spokes, spin, trigger springs and the end clock
 * @position The refresh-control domain of the UIKit constants table
 *   (motion/uikit). A release onto the inset uses `scroll.bounce`, and a pull
 *   past `height` uses `scroll.rubberBand`.
 *
 * Every leaf carries a `@source`; webkit and GUESS values also carry a
 * `@measure` task. uikit.test.ts enforces both.
 *
 * SYNC: When modified, update /packages/core/src/motion/MEASUREMENTS.md
 */

// Lengths are in pt (CSS px), durations in ms, and curves are cubic-bézier
// control points. No motion role names these values, so the table registers
// no roles (motion/roles.ts).
export const refreshControl = {
  /**
   * The refreshing inset: while refreshing, the content rests this far below
   * the top of the scroll view, with the indicator in the gap. Also the
   * stretch of a pull that tracks the finger one to one before the rubber
   * band starts.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIRefreshControl on a 334 pt scroll view: content held
   *   at −60.33 while refreshing (inset top 60), offset equal to finger
   *   travel − 10 pt up to 60, Oct 23 2026
   */
  height: 60,
  /**
   * The trigger distance as a fraction of the scroll view's height. A pull
   * triggers when its overscroll reaches this × the height, or
   * `triggerMinimum` if that is larger. The indicator is then fully revealed.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIRefreshControl on scroll views 400 pt (trigger at
   *   79.0–79.3), 874 pt (168.3–173.7) and 1366 pt (about 271, from the
   *   reveal's slope) tall, Oct 23 2026
   */
  triggerHeightFraction: 0.198,
  /**
   * The shortest trigger distance, pt of overscroll: short scroll views
   * trigger here.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIRefreshControl on a 334 pt scroll view: trigger at
   *   73.0–73.3 at the top of the screen and 540 pt down, Oct 23 2026
   */
  triggerMinimum: 73,
  /**
   * After the trigger, the offset follows the finger one to one again, up to
   * this many `height`s of overscroll. Past it, the pull resists again.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIRefreshControl on a 334 pt scroll view, setContentOffset
   *   log: one to one from the frame after the trigger to −117.67, Oct 23 2026
   * @measure M-RC3
   */
  postTriggerLinearHeights: 2,
  /**
   * The indicator's reveal curve. The reveal is a paused CAReplicatorLayer
   * animation of the layer's opacity, 0 → 1, scrubbed by overscroll ÷ the
   * trigger distance. The spokes' alpha offset follows it (opacity − 1), so
   * the first spoke shows first.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dump (CABasicAnimation instanceAlphaOffset
   *   and opacity, 1 s, timing function (0.42, 0, 0.58, 1)) and per-frame
   *   reads of the replicator's speed, timeOffset, opacity and
   *   instanceAlphaOffset, Oct 23 2026
   */
  revealCurve: [0.42, 0, 0.58, 1],
  /**
   * Spokes the indicator draws (instances of its replicator).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAReplicatorLayer instanceCount read, Oct 23 2026
   */
  indicatorSpokes: 8,
  /**
   * Each spoke is a capsule this wide, with corners of `spokeCornerRadiusPt`.
   * It lies along its radius from `spokeInnerRadiusPt` to
   * `spokeOuterRadiusPt`, measured from the indicator's center.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the replicator's instance layer: 3.67 × 10 pt at
   *   (50.17, 40) in the 100 pt replicator, cornerRadius 1.83, Oct 24 2026
   */
  spokeWidthPt: 3.67,
  /**
   * The spoke's corner radius (half its width: a capsule).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the instance layer's cornerRadius 1.83, Oct 24 2026
   */
  spokeCornerRadiusPt: 1.83,
  /**
   * Where each spoke starts, from the indicator's center.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the instance layer's frame against the replicator's
   *   center (50, 50), Oct 24 2026
   */
  spokeInnerRadiusPt: 5,
  /**
   * Where each spoke ends, from the indicator's center: the indicator is
   * twice this across.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the instance layer's frame against the replicator's
   *   center (50, 50), Oct 24 2026
   */
  spokeOuterRadiusPt: 15,
  /**
   * While refreshing, each spoke is this much more opaque than the spoke
   * before it, clockwise. So the last spoke is the brightest, and the trail
   * fades behind it.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAReplicatorLayer instanceAlphaOffset read while
   *   refreshing, Oct 24 2026
   */
  spinInstanceAlphaOffset: 0.08,
  /**
   * While refreshing, the first spoke's alpha (the replicator's
   * instanceColor alpha); the others add `spinInstanceAlphaOffset` each.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAReplicatorLayer instanceColor read while refreshing
   *   (#3C3C43, alpha 0), Oct 24 2026
   */
  spinFirstInstanceAlpha: 0,
  /**
   * At the trigger, that gradient springs in on this spring from every spoke
   * at full alpha. UIKit asks for mass 1, stiffness 5 and damping 5000 with
   * `allowsOverdamping` off, so Core Animation clamps the damping to critical
   * (2√5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dump: CASpringAnimation instanceAlphaOffset
   *   0 → 0.08 and instanceColor alpha 1 → 0, mass 1, stiffness 5, damping
   *   5000, allowsOverdamping 0, duration 4, Oct 24 2026
   */
  triggerGradientSpring: {mass: 1, stiffness: 5, damping: 4.472},
  /**
   * The indicator's spin: one turn of its keyframed transform per this many
   * ms, repeating, started in the trigger frame.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dump: CAKeyframeAnimation transform on the
   *   CAReplicatorLayer, duration 1 s, repeatCount infinity, Oct 23 2026
   */
  spinMs: 1000,
  /**
   * At the trigger, the indicator's container turns back on this spring from
   * about half a turn (π − 0.01 rad) to rest, additively. UIKit asks for mass
   * 1, stiffness 7.03–7.42 (it differs per release) and damping 5000. Core
   * Animation clamps the damping to critical without `allowsOverdamping`. So
   * the curve is the critically damped spring of that stiffness.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dump: CASpringAnimation transform, additive,
   *   mass 1, stiffness 7.418584 and 7.034003, damping 5000, duration 4,
   *   Oct 23 2026
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the same animation's allowsOverdamping 0, Oct 24 2026
   * @source GUESS — how the stiffness depends on the release was not read
   * @measure M-RC4
   */
  triggerTurnSpring: {mass: 1, stiffness: 7.2, damping: 5.367},
  /**
   * The indicator's turn in radians, about half a turn (π − 0.01). The
   * trigger turn starts this far round and springs back to rest. The end
   * turns from rest to here while the indicator shrinks.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dumps: the trigger's CASpringAnimation
   *   transform starts at a rotation of π − 0.01 (Oct 23 2026); the end's
   *   CABasicAnimation transform ends at a rotation of 179.43° (Oct 24 2026)
   */
  turnRad: 3.131592653589793,
  /**
   * `endRefreshing()` while the control is visible: the inset leaves (the
   * content moves up by `height`) over this long, on `timing.curves.move`.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, setContentOffset per frame over 0.3 s inside
   *   UIView.animate(withDuration: 0.3), three runs at rest identical to the
   *   frame, Oct 23 2026
   */
  endMs: 300,
  /**
   * With the end, over this long on `timing.curves.move`, the indicator
   * shrinks to `exitScale` and turns by `turnRad`. The title fades out at the
   * same time. The control's own opacity stays 1.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dump and per-frame presentation: a 0.3 s
   *   CABasicAnimation on the CAReplicatorLayer transform from identity, and
   *   a 0.3 s opacity from 1 on the title label, on (0.42, 0, 0.58, 1), with
   *   874 pt and 334 pt tables, Oct 24 2026
   */
  exitMs: 300,
  /**
   * The end shrinks the indicator to this scale. It reaches almost nothing
   * while the content's edge still leaves a few points of the gap open.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the replicator view's model transform after
   *   `endRefreshing()`: scale 0.001, uniform, no translation, Oct 24 2026
   */
  exitScale: 0.001,
} as const;
