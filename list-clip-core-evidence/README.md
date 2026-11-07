# List clip under a finger: a finite clip-path in place of a one-axis overflow clip

NOT FOR LANDING. Evidence for a core variant, on the batch build 260ccf0f2c.

- Variant (3eff3e888d): under `(pointer: coarse)`, List clips its inline axis with `clip-path: inset(-2000px 0)` instead of `overflow-inline: clip`. A fine pointer keeps the overflow clip.
- Control (8d091163b5): the batch build plus a scratch story, `core-list--reorder-in-clipped-card`: a reorderable compact List that fills a card with `overflow: hidden`.

## The 1 pt step after a reorder drop

iOS 26.2 Simulator (iPhone 17 Pro), Mobile Safari, 30 fps recordings. The same gesture each take: the third row's handle, held 0.5 s, dragged 6.4 rows down over 1.6 s, held 0.6 s, released. `detect.mjs` matches each of the last four rows' bands against the take's settled last frame.

| Story | Control | Variant |
|---|---|---|
| core List in a clipped card | last row 1 pt off for 14 and 15 frames | 0 and 0 |
| TransferList, panel clip kept | 15 and 15 | 0 and 0 |

The dropped row's glide runs 37 to 41 frames in every take. No other row moves.

## Swipe reveals stay clipped

A partial swipe on `core-item--swipe-actions`, held 1.5 s. `swipe-edges.mjs` compares the strips just outside the list's inline edges, inside the row's band, with the first frame.

| Take | Largest change outside the list |
|---|---|
| Control, left and right | 2 and 2 (encoding noise) |
| Variant, left and right | 2 and 2 |
| Variant with its clip removed, left | 253 |

`swipe-held.png` shows the held frame of each take, top to bottom: control left, variant left, control right, variant right, variant with no clip.

## Cost during the glide

- Chromium, phone emulation, 800 ms from the lift, 5 runs each: 6 paints (0.12 per frame), 0.39 to 0.60 ms of paint, 21 raster tasks, 1.16 to 1.29 ms of raster, and 50 frames at 16.7 ms, for both.
- WebKit, Playwright container at 4 CPUs, 3 runs each: mean frame 16.1 to 16.5 ms for both; p95 17 to 22 ms (control) and 17 to 26 ms (variant); max 22 to 30 ms and 25 to 32 ms.
- iOS 26.2 Simulator, the page's frames during the glide, 4 takes each: mean 16.4 to 16.6 ms and 16.3 to 16.6 ms; p95 19 to 21 ms and 18 to 19 ms; max 20 to 23 ms and 20 to 25 ms.

Files: per-frame detector output (`detect-*.txt`), swipe edge differences (`swipe-*.edges.txt`), cost rows (`cost.jsonl`). The cost probe is commit bd6cb90902.
