# List clip under a finger, variant B: the isolation moves to the List's root

NOT FOR LANDING. Evidence on the batch build 260ccf0f2c.

- Variant B (b7a26acdff): every List renders its root `div`. Under `(pointer: coarse)` the root isolates, and so does an `animatedLayout` list's root. The `ul` keeps `overflow-inline: clip` and stops isolating.
- Control (8d091163b5): the batch build plus the scratch story `core-list--reorder-in-clipped-card`.
- The clip-path variant (3eff3e888d) is measured beside them for the scroll extent.

## The 1 pt step after a reorder drop

iOS 26.2 Simulator, iPhone 17 Pro, the same gesture as before. The numbers are frames with the last row off.

| Story | Control (same session) | Variant B | Runtime injection of B |
|---|---|---|---|
| core List in a clipped card | 15 | 0 and 0 | 0 and 0 |
| TransferList, panel clip kept | 14 | 0 and 0 | 0 and 0 |

The injection keeps the `ul`'s clip, sets its `isolation` to `auto` and isolates its parent. The dropped row's glide runs 36 to 41 frames in every take.

## Scroll extent while a row is swiped

`core-item--swipe-actions`, a row held at about 120 px and then resting open. The document's `scrollWidth` against a 402 px viewport, with the document's own direction set:

| Arm | LTR, swipe right | RTL, swipe left | LTR left, RTL right |
|---|---|---|---|
| Control | 402 / 402 | 402 / 402 | 402 / 402 |
| clip-path variant | 507 / 459 (Chromium), 503 / 458 (WebKit, where the page then scrolls 56 px) | 507 / 459 and 503 / 458; the page scrolls 56 px in both engines | 402 / 402 |
| Variant B | 402 / 402 | 402 / 402 | 402 / 402 |

iOS 26.2 Simulator, LTR, a row resting open after a swipe right: control 402, clip-path variant 458, variant B 402.

## What the isolation is for

Under a finger, in Chromium and WebKit: a fixed header before the list at z-index 1 keeps its tap over the first row's raised band, and so does a fixed overlay after the list. With the isolating element's `isolation` set to `auto`, the band takes the header's tap. That element is the `ul` in the control and the root in variant B.

`ListTouchHitArea.interaction.browser.spec.ts` passes 16 of 16 at the control and 15 of 16 at variant B, in both engines. The failure is the sticky-header case's control step, which still turns off the `ul`'s isolation.

## Cost during the glide

- Chromium, phone emulation, 800 ms from the lift, 5 runs each: 6 paints at the control and 7 at variant B; 0.42 to 0.59 ms and 0.47 to 0.61 ms of paint; 21 raster tasks in both; 50 frames at 16.7 ms in both.
- WebKit, Playwright container at 4 CPUs, 3 runs each: mean frame 16.1 ms and 16.1 to 16.4 ms; p95 18 to 24 ms and 17 to 21 ms; max 24 to 26 ms and 24 to 28 ms.

Files: `detect-*.txt` (per-frame detector output), `b-extent.jsonl`, `b-stacking.jsonl`, `b-cost.jsonl`, `b-hitarea.txt`. The probes are commit b40f8fd04b.
