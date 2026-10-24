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
or replace it (`@measure M-…`, listed below). An entry may carry several
sources when different parts come from different places (a damping ratio from
a WWDC session, a pace still guessed). `uikit/uikit.test.ts` enforces all of
it: an unsourced value, an unknown kind, a guess without a task, or a task
missing from the list below fails the build.

### Adding a constant

1. Find the source: Apple's documentation, a WWDC session, or a measurement on
   the iOS simulator (built-in apps: Settings, Maps, Photos, Files, Contacts,
   Calendar, Reminders, Safari's own chrome).
2. Add the entry to the domain file it belongs to, in the vocabulary of its
   source (a spring published as response and damping ratio stays
   `{response, dampingRatio}`; `toSpring` converts).
3. Tag it with its `@source`. No source yet: write the best-founded `GUESS`,
   say what it is based on, add a measurement task to the list below and tag
   the entry with it.
4. When a measurement lands, replace the value, change the tag to
   `@source measured: …`, and drop the `@measure` tag.

## Measurements

Values the iOS simulator has to produce. Methods:

- **A, animation dump** (exact parameters): a probe UIKit app walks its
  windows' layer trees on every display-link tick and logs every
  `CAAnimation`: class, key path, begin time, duration, timing function
  control points, `CASpringAnimation` mass / stiffness / damping /
  initialVelocity / settlingDuration / allowsOverdamping, from / to values,
  additive flag. Works for everything UIKit animates in process.
- **B, recording** (ground truth on built-in apps): a 60 fps simulator
  recording, the moving edge tracked per frame into x(t), fitted to a spring
  (response, damping ratio) or a curve by least squares, and compared with A.
- **C, scroll log**: a probe app logs `contentOffset` with
  `CACurrentMediaTime()` on every display-link tick while a UI test drives a
  drag of known velocity
  (`press(forDuration:thenDragTo:withVelocity:thenHoldForDuration:)`).
- **D, print**: read an SDK constant or a computed property directly.

| ID    | What                       | App and gesture                                                                                                                                          | Value to extract                                                                                                        | Method |
| ----- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| M-S1  | Deceleration rates         | none                                                                                                                                                     | `UIScrollView.DecelerationRate.normal.rawValue`, `.fast.rawValue`                                                       | D      |
| M-S2  | Momentum coast             | A long list (Contacts, or a probe table of 500 rows); flicks released at 1000, 2500, 5000 pt/s                                                           | contentOffset(t) from release to rest; decay constant, per-millisecond vs per-frame model, the speed at which it stops  | C      |
| M-S3  | Bounce-back spring         | Same list: drag 120 pt past the top, hold still, release; then a flick into the top edge at 3000 pt/s                                                    | contentOffset(t) after release and after edge contact; spring response and damping ratio; velocity hand-off             | C      |
| M-S5  | Rubber band                | Same list on an 852 pt view: drag 100, 300, 600 pt past the top; a horizontal pager                                                                      | displayed overflow against finger overflow; confirm c = 0.55 and d = the view's size on the axis                        | C      |
| M-PG1 | Paging                     | Photos full-screen swipes; a probe paging scroll view                                                                                                    | page chosen for release position × velocity (thresholds, at most one page?), contentOffset(t) onto the page             | B, C   |
| M-ST1 | Scroll to top              | Settings scrolled down 500, 2000, 8000 pt; tap the status bar                                                                                            | contentOffset(t); duration against distance; curve or spring fit                                                        | B, C   |
| M-N1  | Navigation push            | Settings: tap General                                                                                                                                    | incoming leading edge x(t), outgoing x(t) (parallax fraction), dimming alpha(t); animation parameters                   | A, B   |
| M-N2  | Navigation pop             | General: back button                                                                                                                                     | same as M-N1                                                                                                            | A, B   |
| M-N3  | Interactive pop            | Settings ▸ General: edge swipe released at 40 % of the width at 600 pt/s (finishes) and at 30 % at rest (cancels)                                        | x(t) after release; spring parameters; the finish / cancel rule (position, velocity)                                    | A, B   |
| M-SH1 | Sheet present              | Calendar: + (new event page sheet); a probe sheet with medium and large detents                                                                          | sheet top y(t), dimming alpha(t); animation parameters                                                                  | A, B   |
| M-SH2 | Sheet dismiss              | The same sheets: Cancel; swipe down released at rest and at 1500 pt/s                                                                                    | y(t); overshoot after a swipe (damping ratio)                                                                           | A, B   |
| M-SH3 | Detent snap                | Probe sheet (medium ⇄ large): releases from 3 positions × 3 velocities                                                                                   | y(t); the detent chosen (is it the one nearest the projected rest?)                                                     | A, B   |
| M-A1  | Alert                      | Probe app: `UIAlertController(.alert)` presented and dismissed                                                                                           | scale(t), alpha(t) of the alert and of the dimming view; animation parameters                                           | A      |
| M-AS1 | Action sheet and menu      | Probe app: `.actionSheet`; a button with a `UIMenu` as primary action; Files: the … menu                                                                 | scale, alpha, position (t) on open and close; animation parameters                                                      | A, B   |
| M-CM1 | Context menu               | Files: long-press an item; dismiss by tapping outside                                                                                                    | preview scale(t) on lift, backdrop blur and dim (t), menu scale(t); the preview's return on dismiss                     | A, B   |
| M-SW1 | Switch                     | Settings ▸ Safari ▸ Block Pop-ups: tap; press and hold, then release                                                                                     | thumb x(t) (expected response 0.30 s, ratio 0.75); thumb width(t) while held and after (0.35 s, 0.87); track color fade | A, B   |
| M-SG1 | Segmented control          | Probe app: a 4-segment `UISegmentedControl`, tap and drag across                                                                                         | thumb x(t), thumb scale while pressed; animation parameters                                                             | A, B   |
| M-K1  | UIKit legacy spring        | Probe app: `UIView.animate(withDuration:usingSpringWithDamping:initialSpringVelocity:)` for durations 0.3, 0.5, 1 × ratios 0.5, 0.8, 1 × velocities 0, 2 | the `CASpringAnimation` UIKit attaches (mass, stiffness, damping, initialVelocity, duration, settlingDuration)          | A      |
| M-K2  | Default spring, keyboard   | Probe app: an animator with `UISpringTimingParameters()`; focus and blur a text field                                                                    | both springs' parameters and allowsOverdamping; the keyboard notification's duration and curve                          | A, D   |
| M-CA1 | Settling duration          | none: `CASpringAnimation` mass 1, stiffness 100, damping 5, 10, 15, 20, 40 × initialVelocity 0, 5, −5 × allowsOverdamping on, off                        | `settlingDuration` of each (checks the critically damped and overdamped branches of `settlingDuration`)                 | D      |
| M-T1  | Banner                     | A notification pushed to the simulator while an app is in the foreground                                                                                 | banner y(t) in and out; time on screen                                                                                  | B      |
| M-RM1 | Reduced Motion             | Reduce Motion on, Prefer Cross-Fade Transitions on and off: Settings push and pop, a sheet, an alert                                                     | which transitions become cross-fades; alpha(t), duration and curve; what still moves                                    | B      |
| M-NB1 | Navigation bar hide / show | none                                                                                                                                                     | `UINavigationController.hideShowBarDuration`                                                                            | D      |
