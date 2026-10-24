# Motion

Internal motion foundation for the touch presentations of core components:
the UIKit constants table, the spring / decay / rubber-band / projection math
UIKit uses, and a compositor animator. Nothing here is exported from the
package entry point; components import it by path.

## Files

| File                                    | What it is                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `uikit/`                                | THE constants table: every spring, duration, deceleration rate, rubber-band constant and curve, with its source.         |
| `uikit/springs.ts`                      | Interaction springs (navigation, sheets, alerts, menus, controls, keyboard, banners) and the SwiftUI / UIKit presets.    |
| `uikit/scroll.ts`                       | UIScrollView: deceleration rates, rubber band, bounce-back spring, paging, `delaysContentTouches`.                       |
| `uikit/timing.ts`                       | Non-spring clocks and curves: press highlight, Core Animation's named curves, keyboard, Reduced Motion cross-fade.       |
| `uikit/switch.ts`                       | UISwitch: geometry, clocks, track color curve, press-and-drag rules, haptic (component domains: `uikit/<component>.ts`). |
| `uikit/navigation.ts`                   | UINavigationController: push velocity, parallax, dimming, transition clock, interactive pop finish rule.                 |
| `uikit/gestures.ts`                     | Gesture thresholds (owned by the gesture foundation).                                                                    |
| `MEASUREMENTS.md`                       | The UIKit reference captures each unconfirmed value still needs.                                                         |
| `spring.ts`                             | Closed-form damped spring, every Apple parameterization, settling duration.                                              |
| `decay.ts`                              | UIScrollView's momentum coast.                                                                                           |
| `rubberBand.ts`                         | UIScrollView's resistance past an edge, and its inverse.                                                                 |
| `projection.ts`                         | Release targets: the rest point nearest the projected coast; paging.                                                     |
| `bezier.ts`                             | Cubic-bézier timing functions (Core Animation's named curves).                                                           |
| `animator.ts`                           | Compositor animator: springs and decays compiled to Web Animations, read back analytically.                              |
| `useAnimator.ts`                        | React wrapper that never re-renders per frame.                                                                           |
| `__tests__/animator.compositor.spec.ts` | Browser proofs (Chromium and WebKit): busy main thread, no Layout / Paint, seeked curves.                                |

## Animator

```
import {createAnimator} from '../motion/animator';
import {solveSpringTowardRamp, toSpring} from '../motion/spring';
import {springs} from '../motion/uikit';

const animator = createAnimator(sheet);

// A drag writes one style per frame and never renders:
animator.set({y: offset});

// The finger lifts: spring to the detent with the release velocity (px/s).
const handle = animator.animate({y: detent}, {spring: springs.sheetDetent, velocity: {y: 1200}});

// A finger lands mid-flight: where is the sheet right now, how fast?
const y = animator.get('y', event.timeStamp);
const v = animator.getVelocity('y', event.timeStamp);
animator.stop(['y']); // freezes at the value on screen

// A throw on a scroll-like surface, with an edge:
animator.decay({x: velocityX}, {bounds: {x: {min: -maxScroll, max: 0}}});

// Any closed-form curve, here a press that keeps deepening: the target
// scale falls at 0.16/s and the platter follows it on a spring.
const ramp = solveSpringTowardRamp(toSpring(springs.contextMenuLift), {
  from: 1,
  target: 1,
  slope: -0.16,
});
animator.play({scale: {duration: 0.266, at: ramp.value, velocity: ramp.velocity}});

await handle.finished; // true if it ran to the end, false if interrupted
```

- Drives `x`, `y`, `rotate`, `scaleX`, `scaleY` (`scale` sets both) and
  `opacity`, through the individual CSS properties `translate`, `rotate`,
  `scale` and `opacity`. The element's `transform` stays the component's.
- `get` / `getVelocity` evaluate the curves; the DOM is never read.
- `play` bakes any curve given as value and velocity functions of time (a
  spring chasing a moving target from `solveSpringTowardRamp`, a fitted UIKit
  curve) exactly like a spring.
- `animate` always starts from the presentation value with the presentation
  velocity unless a velocity is handed in, so retargeting is continuous
  (`handle.retarget(to)` keeps the call's spring).
- Everything one call starts shares one start time; `{at}` puts several
  animators on one clock.
- Reduced Motion (`prefers-reduced-motion: reduce`): travel becomes UIKit's
  cross-fade (Reduce Motion with Prefer Cross-Fade Transitions). An entrance
  lands and fades in, an exit fades out then moves, any other move dips (fade
  out, move, fade in), over `timing.reducedMotionCrossFadeMs` (a navigation
  push or pop) or on the spring passed as `{crossfade}` (a sheet, a modal or
  an alert fades on its presentation spring). `{reducedMotion: 'keep'}` keeps
  the motion (direct manipulation), `'instant'` jumps.
- `createAnimator(dialog, {pseudoElement: '::backdrop'})` drives a
  pseudo-element; with no inline style to hold it, each animation stays in
  effect until the next one replaces it.
- `useAnimator()` returns a stable `{ref, animator}`; attach `ref` to the
  element.

### How it stays on the compositor

Each curve is baked into keyframes, sampled adaptively until linear
interpolation is within 0.05 px, and played with `easing: linear` and an
explicit `startTime`. The element's inline style already holds the end values,
and the keyframes hold the end state for a few seconds past the curve's end;
the main thread drops the animation as soon as it runs after that end. So the
frame an animation ends needs no main thread and shows no flicker, even when
the main thread is blocked as the curve ends (WebKit's compositor otherwise
falls back to the last value its main thread committed, mid-flight).

Keyframes rather than one `linear()` easing: measured in Chromium, both are
composited and, for the same samples, equally precise; but WebKit's Core
Animation path does not accelerate an effect whose easing is `linear()` with
points (`KeyframeEffect::canBeAccelerated`) unless its newer threaded
animations are on, so on older iOS Safari a `linear()` spring would run on the
main thread. Linear segments between keyframes map directly onto Core
Animation keyframe animations.

## The parity method

A curve is only as right as its parameters and its math.

**Math.** `spring.ts` solves m·x″ + c·x′ + k·x = 0 in closed form in all three
regimes: the model behind SwiftUI's `Spring`, `CASpringAnimation` and
`UISpringTimingParameters`. The tests hold it to an independent fourth-order
Runge-Kutta integration over a sweep of damping ratios, responses and release
velocities; to a port of WebKit's own spring solver; to the WWDC23 "Animate
with springs" conversion equations; and to values read from UIKit on the
iOS 26.2 simulator: `CASpringAnimation.settlingDuration` for a grid of springs
and velocities, and the durations UIKit gives its spring APIs, which the
settling formula reproduces to the last digit (underdamped) or within 0.02 %
(critically damped). `decay.ts` is held to a literal per-millisecond simulation
of the deceleration rate and to WWDC18's projection function; `rubberBand.ts`
to a published device measurement of UIScrollView.

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

A `GUESS` or `webkit` value also names the measurement that will confirm or
replace it (`@measure M-…`, listed in MEASUREMENTS.md). An entry may carry
several sources when different parts come from different places.
`uikit/gestures.ts` carries the same information as typed fields that the
gesture system reads at run time: `{value, unit, source}` with a source of one
of the kinds above, or `{value, unit, guess, measure}` with a `measure` that
starts with its MEASUREMENTS.md ID. `uikit/uikit.test.ts` enforces all of it,
in both forms: an unsourced value, an unknown kind, a guess without a task, or
a task missing from MEASUREMENTS.md fails the build.

**Browser proofs.** `__tests__/animator.compositor.spec.ts` drives the real
animator, bundled from source, in Chromium (Pixel 7 emulation) and WebKit
(iPhone 13 emulation):

- a slow spring keeps advancing on every frame while the main thread is
  blocked for 1 s, on the analytic curve within 2 px (Chromium screencast;
  WebKit through its video recording, decoded frame by frame), and a spring
  that ends inside the block keeps showing its end state (WebKit);
- no Layout or Paint runs while it animates, and Chromium reports every
  animation composited (trace);
- seeked to fixed times, the engine plays the analytic curve within 0.05 px,
  with every channel on one start time.

```
pnpm exec playwright test --config packages/core/src/motion/__tests__/playwright.config.ts
```

(`--project chromium-phone` where WebKit cannot launch.) The iOS Safari
check is the same proof on the iOS simulator.

### Adding a constant

1. Find the source: Apple's documentation, a WWDC session, or a measurement on
   the iOS simulator (built-in apps: Settings, Maps, Photos, Files, Contacts,
   Calendar, Reminders, Safari's own chrome; or a UIKit host app that reads
   the animations UIKit attaches).
2. Add the entry to the domain file it belongs to, in the vocabulary of its
   source (a spring published as response and damping ratio stays
   `{response, dampingRatio}`; `toSpring` converts).
3. Tag it with its `@source`. No source yet: write the best-founded `GUESS`,
   say what it is based on, add a measurement task to MEASUREMENTS.md and tag
   the entry with it.
4. When a measurement lands, replace the value, tag it
   `@source measured: …`, and drop the `@measure` tag.

## Measurements

[MEASUREMENTS.md](MEASUREMENTS.md) is the one list of UIKit reference captures:
what each value still needs from the iOS simulator, the app and gesture to
capture, the value to extract and the method. Every `@measure` ID in `uikit/`
resolves there.
