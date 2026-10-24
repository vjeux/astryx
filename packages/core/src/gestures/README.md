# Gestures

A gesture recognizer system with UIKit's semantics, for the touch
presentations of Astryx core components. It is internal to
`@astryxdesign/core`: components import it from `../gestures`, and nothing
here is exported from the package entry.

UIKit is the reference throughout: the same recognizer states, the same
conflict rules, the same thresholds (from `../motion/uikit/gestures.ts`, each
one sourced or marked as a guess awaiting measurement), and touch handling
that behaves like `UIControl` and `UIScrollView`. The rest of this page says
where the web forces a difference.

## Using it from a component

```tsx
import {useRef} from 'react';
import {PanGestureRecognizer, useGestureRecognizer} from '../gestures';

function Sheet() {
  const ref = useRef<HTMLDivElement>(null);
  useGestureRecognizer(
    ref,
    () => new PanGestureRecognizer({direction: 'down'}),
    pan => {
      // Runs inside the input event: write the transform, render nothing.
      const element = ref.current;
      if (element == null) return;
      if (pan.state === 'ended') {
        settle(element, pan.translation().y, pan.velocity().y);
      } else {
        element.style.transform = `translateY(${pan.translation().y}px)`;
      }
    },
  );
  return <div ref={ref}>…</div>;
}
```

- The recognizer is created once per component and keeps its identity, so
  relationships set up when it is created (`requireToFail`,
  `recognizeSimultaneouslyWith`) keep working.
- The listener is read through a ref. Passing a new function on each render
  attaches nothing new, and a gesture never causes a React render.
- The recognizer attaches in a layout effect, so the element's `touch-action`
  is set before the browser can see a finger.
- `usePressTracker(ref, options)` gives an element `UIControl` touch tracking
  (see below).

Outside React, `getGestureHost(document).attach(element, recognizer)` does
the same and returns a detach function.

## Recognizers

| Recognizer                       | UIKit                              | Kind       | Notes                                                                                                                       |
| -------------------------------- | ---------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `TapGestureRecognizer`           | `UITapGestureRecognizer`           | discrete   | `numberOfTapsRequired`, `numberOfTouchesRequired`; fails on travel, extra fingers, a late next tap, or a far next tap       |
| `LongPressGestureRecognizer`     | `UILongPressGestureRecognizer`     | continuous | `minimumPressDuration` 500 ms, `allowableMovement` 10 px (a distance, not per axis), `numberOfTapsRequired`                 |
| `PanGestureRecognizer`           | `UIPanGestureRecognizer`           | continuous | min/max touches, `direction` (axis or one-way), `lockAxis`, `scrollEdge`, `scrollHandoff`; `translation()`, `velocity()`    |
| `SwipeGestureRecognizer`         | `UISwipeGestureRecognizer`         | discrete   | recognized during the motion; one or more directions, `numberOfTouchesRequired`                                             |
| `PinchGestureRecognizer`         | `UIPinchGestureRecognizer`         | continuous | `scale` (settable, to re-base it), `velocity` in scale per second, `focalPoint()`                                           |
| `RotationGestureRecognizer`      | `UIRotationGestureRecognizer`      | continuous | `rotation` in radians, unwrapped, clockwise positive; `velocity` in rad/s                                                   |
| `ScreenEdgePanGestureRecognizer` | `UIScreenEdgePanGestureRecognizer` | continuous | `edges` including `leading` / `trailing` (resolved against the writing direction); fails as soon as the touch lands outside |
| `HoverGestureRecognizer`         | `UIHoverGestureRecognizer`         | continuous | a mouse or a hovering pen; silent for fingers                                                                               |

Every recognizer also has UIKit's switches: `isEnabled` (use `setEnabled`;
turning it off mid-gesture cancels), `cancelsTouchesInView` (default true),
`delaysTouchesBegan` (default false), `delaysTouchesEnded` (default true),
`allowedPointerTypes`, and `requiresExclusiveTouchType`.

### States

```
possible ─► began ─► changed* ─► ended | cancelled     continuous
possible ─► ended                                       discrete ("recognized")
possible ─► failed
```

Listeners (UIKit's target-action) run for `began`, `changed`, `ended` and
`cancelled`. `addTransitionListener` also reports `failed` and the return to
`possible`. A recognizer in a terminal state ignores the touches it still
holds and returns to `possible` when all of them have ended.

## Conflicts: the arena

A new touch goes to every recognizer on its hit path, innermost first, and
each one that accepts it tracks it until it ends. Then:

- **Exclusivity.** Two recognizers that share a touch are never active
  together unless one allows it (`recognizeSimultaneouslyWith`, or the
  `shouldRecognizeSimultaneously` delegate). The first to recognize fails
  the other possible ones. A recognizer that tries to begin while a
  conflicting one is active fails instead. When two qualify on the same
  input, the innermost one wins.
- **Failure requirements.** `a.requireToFail(b)` keeps `a` in `possible`
  until `b` fails, then lets `a` recognize. If `b` recognizes, `a` fails. A
  recognizer that is not involved in the current touches holds nothing up.
  The delegates `shouldRequireFailureOf` and `shouldBeRequiredToFailBy`
  express the same thing dynamically.
- **Delegates.** `shouldBegin`, `shouldReceiveTouch`, and `canPrevent` /
  `canBePrevented` on subclasses.

```ts
// Single tap waits for the double tap to fail, as in UIKit.
single.requireToFail(double);

// Inner horizontal scroller yields to the back-swipe in the edge band only:
// the edge pan fails at touch-down anywhere else, so nothing waits.
innerPan.requireToFail(edgePan);
```

## Touches in the view: `PressTracker`

A pressable control's view-level touch handling, with `UIControl`
semantics:

- `touchDown`, `touchDragInside` / `touchDragOutside`, `touchDragEnter` /
  `touchDragExit`, `touchUpInside` / `touchUpOutside`, `touchCancel`.
- "Inside" is the control's bounds expanded by `trackingExpansion`, so a
  fingertip that slides a little off a button is still on it.
- The highlight comes on in the same frame. Inside a scroller it waits
  `contentTouchDelay` (`UIScrollView.delaysContentTouches`), so a flick
  paints nothing. A tap quicker than that delay shows the highlight at the
  lift for `quickTapFlash`.
- A recognizer that takes the touch (`cancelsTouchesInView`), or the browser
  taking it to scroll, cancels the press with no release.
- `UIControl`'s iOS 6 rule applies: an ancestor's single-finger single tap
  does not beat the control's own action for a touch on it.
  `vetoesAncestorRecognizer` replaces that rule (a slider vetoes a pan along
  its track).

The browser's click stays the control's activation, so keyboard and
assistive-technology activation keep working.

## What the browser is told

- **`touch-action`.** Each element gets the intersection of what its
  recognizers leave the browser. It is set inline on attach and restored on
  detach (opt out with `manageStyle: false`):

  | Recognizers on the element                   | `touch-action`     |
  | -------------------------------------------- | ------------------ |
  | tap, long press                              | `manipulation`     |
  | horizontal pan or swipe, horizontal edge pan | `pan-y pinch-zoom` |
  | vertical pan or swipe                        | `pan-x pinch-zoom` |
  | free pan                                     | `pinch-zoom`       |
  | pan with `scrollEdge` / `scrollHandoff`      | `manipulation`     |
  | pinch or rotation                            | `pan-x pan-y`      |
  | pinch or rotation together with a free pan   | `none`             |

  `pinch-zoom` stays in the value unless a pinch or rotation recognizer is
  attached, so the page stays zoomable (WCAG 1.4.4). A long press also turns
  off the iOS callout and text selection on its element.

- **Claiming.** When a recognizer recognizes, it owns its touches. Each
  element with touch recognizers has a non-passive `touchmove` listener that
  cancels the event only while one of its touches is owned. A touch nobody
  owns scrolls exactly as it would without the system, and only touches that
  begin on such an element wait for the main thread before scrolling.
  WebKit pans any drag with a vertical component even under `pan-y`, and
  cancelling `touchmove` is the one signal it honors. That is why the pan's
  10 px threshold sits below the ~12 px at which WebKit claims a scroll.
- **The browser's claim.** `pointercancel` on a finger, a `touchmove` that
  can no longer be cancelled, or a scroll above the touch means the browser
  took the finger. Possible recognizers that share it fail, active ones are
  cancelled, and the view's press is cancelled. The exception is a pan with
  `scrollHandoff`, which keeps watching.
- **Clicks.** When a touch's gesture cancelled the view's touches, its
  `touchend` is cancelled (no click and no compatibility mouse events) and a
  one-shot guard swallows the next trusted click. A click held back for a
  recognizer that may still recognize (a double tap between taps) is
  swallowed at once and replayed on the original target if the recognizer
  fails. Clicks with `detail === 0` (keyboard, assistive technology, code)
  always pass.
- **Context menus.** A `contextmenu` while a recognizer owns a touch is
  cancelled, so a long press never also opens the browser's menu.
- **Focus.** Losing window focus or hiding the page cancels every touch in
  flight, as UIKit does when the app resigns active.

### Native scrolling

`scrollEdge` and `scrollHandoff` make a pan share its axis with the native
scrollers under the finger. This is the sheet over its own list:

- With `scrollEdge`, the pan begins only if nothing under the touch could
  scroll for that movement: the finger landed at the edge and pulls away
  from it. The browser has not committed yet, so beginning claims the touch
  and the content never moves.
- With `scrollHandoff` (one-way directions only), once the browser has taken
  the touch to scroll, the pan keeps watching. When the content runs out in
  the pan's direction, the travel past that point becomes the pan, after
  `contentEndHandoffSlop`. The point is placed from the distance the content
  had left, not at the next sample. If the finger comes back, the
  translation clamps at zero while the content scrolls again.

"Could scroll" follows the browser's own rules: `touch-action` between the
touch and each scroller, scroll chaining stopped by `overscroll-behavior`,
and RTL `scrollLeft` ranges.

### Multiple fingers

A second finger never breaks a one-finger pan that is already moving: the
pan ignores it, and the claim keeps the browser from zooming with it. A
second finger that lands before any recognizer has claimed fails the
one-finger recognizers, so the two fingers zoom the page.

## Time

Every input carries its own timestamp (`event.timeStamp`), and timers are
deadlines on that same clock. Before an input is processed, every timer due
by its timestamp runs first, at its own deadline. A long press therefore
begins at exactly touch-down + 500 ms even when the main thread was blocked
and the timer callback ran late. Tests drive the whole system with explicit
timestamps and no real time.

## Velocity

`VelocityTracker` reports px per second, UIKit's unit. Strategies:

- `lsq2` (default): least-squares quadratic fit over the last 100 ms (at most
  20 samples), as Android's and Flutter's trackers do.
- `iosFling`: Flutter's approximation of what an iOS scroll view hands its
  deceleration (weights 0.6 / 0.35 / 0.05 on the last three pair
  velocities).
- `window`: the two-point average over 100 ms that BottomSheet used.

A finger that rested for 40 ms before lifting releases zero velocity. A lift
event's repeated position is not added as a sample.

## Haptics

`playHaptic(kind)` vibrates where `navigator.vibrate` exists, with one
pattern per UIKit feedback kind. iOS Safari has no vibration API. It plays a
light impact only when a real tap toggles an `<input type="checkbox"
switch>`, and WebKit requires a trusted event for it. `attachTapHaptic(label)`
puts a hidden switch inside a label the control renders as its tap target,
so every real tap on it plays that impact. Nothing can play a haptic later
from script, so mid-drag haptics (detent snaps, picker ticks) are not
possible in iOS Safari.

## Thresholds

All numbers live in `../motion/uikit/gestures.ts`. Each one carries either
its source (Apple documentation, or a measurement of a UIKit app on the iOS
simulator) or a guess together with the measurement that will replace it. A
unit test fails if an entry has neither.

## Where the web differs from UIKit

- Once a recognizer owns a touch, the browser cannot take the scroll back
  later in the same gesture (UIKit can hand a sheet's drag to its list at the
  top detent). A component that needs that has to drive the scroll position
  itself.
- In Chromium a finger's first `touchmove` arrives only after about 16 px.
  Movement below that comes from the finger's pointer events, but the
  browser's own decision to scroll happens at that first `touchmove`.
- iOS Safari's own back swipe at the left edge cannot be cancelled by the
  page. A leading-edge pan works where that swipe has no history to go back
  to.
- `translation()` is in client CSS px. It is not converted into a rotated or
  scaled ancestor's coordinate space.
- A replayed click is untrusted. Anything that needs real user activation
  inside the replay window (opening a file picker, for example) should not
  sit under a multi-tap recognizer.

## Tests

- `__tests__/recognizers.test.ts`: each recognizer's state machine on
  synthetic touches with explicit timestamps.
- `__tests__/arena.test.ts`: the conflict matrix, delivery to the view,
  click dispositions, cancellation, and multiple fingers.
- `__tests__/GestureHost.test.ts`: the DOM integration through real
  listeners in jsdom.
- `__tests__/browser/`: the browser proof in phone-emulated Chromium with
  CDP touches. Run it with
  `pnpm exec playwright test --config packages/core/src/gestures/__tests__/browser/playwright.config.ts`.
