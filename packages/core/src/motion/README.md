# Motion

Internal motion foundation for the touch presentations of core components:
the UIKit constants table, the spring / decay / rubber-band / projection math
that UIKit uses, and a compositor animator. Nothing here is exported from the
package entry point; components import it by path.

## Files

| File                | What it is                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `uikit/`            | THE constants table. Every spring, duration, deceleration rate, rubber-band constant and curve, with its source. |
| `uikit/springs.ts`  | Interaction springs (navigation, sheets, alerts, menus, controls, keyboard, banners) and SwiftUI presets.        |
| `uikit/scroll.ts`   | UIScrollView: deceleration rates, rubber band, bounce-back spring, paging, `delaysContentTouches`.               |
| `uikit/timing.ts`   | Non-spring clocks and curves: press highlight, Core Animation's named curves, Reduced Motion cross-fade.         |
| `uikit/gestures.ts` | Gesture thresholds (owned by the gesture foundation).                                                            |
| `spring.ts`         | Closed-form damped spring, every Apple parameterization, settling duration.                                      |
| `decay.ts`          | UIScrollView's momentum coast.                                                                                   |
| `rubberBand.ts`     | UIScrollView's resistance past an edge, and its inverse.                                                         |
| `projection.ts`     | Release targets: the rest point nearest the projected coast.                                                     |
| `animator.ts`       | Compositor animator: springs and decays compiled to Web Animations, read back analytically.                      |
| `useAnimator.ts`    | React wrapper that never re-renders per frame.                                                                   |

## The parity method

A curve is only as right as its parameters and its math.

**Math.** `spring.ts` solves m·x″ + c·x′ + k·x = 0 in closed form in all three
regimes, the model behind SwiftUI's `Spring`, `CASpringAnimation` and
`UISpringTimingParameters`. The tests hold it to an independent fourth-order
Runge-Kutta integration of the same equation over a sweep of damping ratios,
responses and release velocities, and to every published reference value:

- the WWDC23 "Animate with springs" conversion equations (duration, bounce ⇄
  mass, stiffness, damping);
- Apple's `CASpringAnimation.settlingDuration` example (stiffness 100,
  damping 5 → about 2.85 s; damping 15 → just over 1 s);
- WebKit's UIKit-matched switch springs and their settling durations
  (0.4880138 s, 0.5073966 s), which the settling formula reproduces to nine
  digits.

`decay.ts` is held to a literal per-millisecond simulation of the deceleration
rate and to WWDC18's projection function; `rubberBand.ts` to a published device
measurement of UIScrollView.

**Parameters.** Every value in `uikit/` carries its source next to it, as a
JSDoc tag on the entry:

```
/**
 * What the value is, in UIKit's words.
 * @source apple-docs https://developer.apple.com/documentation/…
 */
key: value,
```

Allowed source kinds:

- `@source apple-docs <developer.apple.com URL>`
- `@source wwdc <year>-<session> "<title>": <what it says>`
- `@source webkit Source/<path> <what it says>` (Apple's engine, matched to
  UIKit in its own comments; confirmed by a measurement)
- `@source measured: <app>, iOS <version>, <method>, <date>`
- `@source GUESS — <what it is based on>`

A `GUESS` or `webkit` value must also name the measurement that will confirm
or replace it (`@measure M-…`, listed in MEASUREMENTS.md). An entry may carry several
sources when different parts come from different places (a damping ratio from
a WWDC session, a pace still guessed). `uikit/uikit.test.ts` enforces all of
it: an unsourced value, an unknown kind, a guess without a task, or a task
missing from MEASUREMENTS.md fails the build.

### Adding a constant

1. Find the source: Apple's documentation, a WWDC session, or a measurement on
   the iOS simulator (built-in apps: Settings, Maps, Photos, Files, Contacts,
   Calendar, Reminders, Safari's own chrome).
2. Add the entry to the domain file it belongs to, in the vocabulary of its
   source (a spring published as response and damping ratio stays
   `{response, dampingRatio}`; `toSpring` converts).
3. Tag it with its `@source`. No source yet: write the best-founded `GUESS`,
   say what it is based on, add a measurement task to MEASUREMENTS.md and tag
   the entry with it.
4. When a measurement lands, replace the value, change the tag to
   `@source measured: …`, and drop the `@measure` tag.

## Measurements

[MEASUREMENTS.md](MEASUREMENTS.md) is the one list of UIKit reference captures:
what each value still needs from the iOS simulator, the app and gesture to
capture, the value to extract and the method. Every `@measure` ID in `uikit/`
resolves there.
