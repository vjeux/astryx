# Sheet host spike (not for merge)

Question: can a bottom sheet track the finger with the browser's own scrolling
(so tracking never waits for the page's main thread) and still finish every
release with exactly the UIKit spring and projection? Or does the sheet keep a
JavaScript gesture recognizer, which stops under the finger whenever the main
thread is busy, as UIKit itself would?

## The two hosts

- **hybrid** (`mode=hybrid`): the sheet sits in a full-viewport scroll
  container. `scrollTop` is the sheet's visible height (a viewport-tall spacer
  sits above the sheet), detents are scroll-snap points, and the native rubber
  band is the edge past the large detent. On the touchend, when the page sees
  it in time, the page reads the release (scroll offset and finger velocity),
  stops the browser's momentum (`overflow: hidden` and the offset pinned in the
  same task), and plays the UIKit spring from that state on the sheet's
  `transform` with Web Animations: it runs on the compositor, then swaps back
  to the equivalent `scrollTop` in one task. If the browser moved the scroller
  after the pin, the page pins again. When the page sees the touchend late (its
  main thread was blocked at the lift), it leaves the native momentum alone and
  springs to the nearest detent once the scroller is at rest. Only passive
  listeners, so the browser never waits for the main thread to scroll.
- **js** (`mode=js`): pointer events on a `touch-action: none` sheet, one
  transform write per move (plus the dim unless `jsdim=0`), the same spring on
  release. The best a main-thread recognizer can do.

Springs and projection come from the motion foundation
(`packages/core/src/motion`): `springs.sheetDetent`, `springs.sheetDismissSwipe`,
`springs.sheetPresent`, `selectSnapPoint` (WWDC18 projection, rate 0.998) and
`solveDecay` for the momentum extrapolation. `spring=` overrides the spring for
every release (`r0.5z0.86`, `d0.5b0.15` or `m3k1000c500`).

Two squares in the top-right corner show which thread is alive: green spins
with a CSS animation (compositor), red is rotated by requestAnimationFrame
(main thread). During a busy block the red one stops.

## Parameters

| Param         | Values                                                                                                    | Meaning                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `mode`        | `hybrid`, `js`                                                                                            | Host                                                                                                                               |
| `release`     | `spring` (default), `native`                                                                              | Hybrid: hand off to the spring, or let momentum + snap finish                                                                      |
| `handoff`     | `extrap` (default), `read`                                                                                | Hybrid: start the spring from the momentum extrapolated to the next frame, or from `scrollTop` as read                             |
| `snaptouch`   | `1` (default), `0`                                                                                        | Hybrid: snapping on while a finger is down (the browser snaps if the page misses the release) or off (the page reconciles at rest) |
| `stop`        | `assign` (default), `instant`                                                                             | Hybrid: pin with `scrollTop =` or `scrollTo({behavior: 'instant'})`                                                                |
| `busy`        | `none`, `ontouch:<delay>:<block>`, `always:<block>:<yield>:<delay>:<stopAfter>`, `window:<delay>:<block>` | Main-thread blocks (ms)                                                                                                            |
| `open`        | `closed`, `medium` (default), `large`                                                                     | Initial detent                                                                                                                     |
| `spring`      | see above                                                                                                 | Spring override                                                                                                                    |
| `dim`         | `scroll` (default), `js`                                                                                  | Hybrid: dim by a scroll-driven animation or by script                                                                              |
| `latems`      | ms, default 40                                                                                            | Hybrid: a touchend later than this is a missed release                                                                             |
| `passthrough` | `1` (default), `0`                                                                                        | Hybrid: drags start on the sheet only                                                                                              |
| `hud`         | `1` (default), `0`                                                                                        | Status line                                                                                                                        |

The page publishes `window.__geometry` (viewport, detents, sheet top per
detent, `handle` / `grab` / `body` points, the scan column), `window.__trace`
(everything it saw and did, page clock) and `window.__ready`.

## Build and run

```
node internal/spikes/c17-sheet-host/build.mjs           # → dist/index.html, one self-contained file
node internal/spikes/c17-sheet-host/chromium/regress.mjs # correctness pass in headless Chromium
```

`runsheet.json` is the simulator run list. `analyze/` turns a run's video,
probe log and trace into per-frame tracking error and release-curve error.

Headless Chromium delivers synthesized touch input through the main thread, so
it cannot show tracking under a blocked main thread; only the iOS simulator
can. Chromium also keeps a snap animation that has already started running
through `overflow: hidden` and a programmatic scroll, so the hybrid needs
`snaptouch=0` there.
