# BottomSheet release: evidence

What a BottomSheet does when a finger lets go of it, recorded for the pull request.

## iOS Safari (`ios/`)

iOS 26.2 Safari, iPhone 17 Pro simulator, simulated touches, 60 fps screen recordings. The page is the
`Snap Points` story with one evidence-only change: the sheet gets a thin solid outline so each frame's
sheet top can be read. `?busy=700` spins the main thread for 700 ms, starting two frames after the
finger lifts, so the block lands mid-settle.

Each board plots the sheet top on screen in every frame against the curve the page planned at the
release (its Web Animation keyframes), with the block shaded. Twelve frames run through the block.
Frames are cropped to the page. `<run>.json` holds the per-frame series, the planned keyframes and the
block.

| Run | Gesture | Release | Fit to the planned curve |
|---|---|---|---|
| P1 | slow drag to the half detent | 563 pt/s, critically damped | rms 1.0 pt |
| P2 | throw | 854 pt/s, critically damped | rms 1.7 pt |
| P3 | slow drag, no block (control) | critically damped | rms 1.1 pt |
| P4 | throw down from the half detent, short of halfway: springs back | 938 pt/s | rms 0.6 pt |
| P5 | fast throw: ~3 pt overshoot past the half detent | 1491 pt/s, 0.8 damped | rms 1.2 pt |
| P6 | drag dismissal from the half detent | 933 pt/s | within 1 pt after the first frame |

In every run the sheet keeps moving on its curve through the 700 ms block, and it ends on the detent,
or off screen, without a snap.

## Chromium and WebKit (`storyboards/`, `curves/`, `busy-main-thread/`)

From `BottomSheetDetent.interaction.browser.spec.ts`, with real touch input.

- **`storyboards/`**: frame-by-frame boards (with JSON traces) of a drag that settles on the half
  detent, the settle seeked through its curve, a fast throw on the 0.8 damped spring, and (Chromium) the
  settle through a 700 ms main-thread block.
- **`curves/`**: the settle sampled frame by frame against UIKit's spring, for a release at rest and at
  600 px/s and 1500 px/s. The maximum error is ≤ 0.5 px in both engines.
- **`busy-main-thread/`**: frames presented while the main thread was blocked mid-settle.
