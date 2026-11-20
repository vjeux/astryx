# Table: a default cell's truncation tooltip, base and head

Base: main c49f8470c0593adee8f5a1d008a61ded8ddaed2d. Head: #11933 at 61dad6ad5beb3b1c933d111e82bfb56b063c8936, `pr` in file names. The head's merge base is this main.

## Answer

- At rest, the story is byte-identical between main and the head, in light and dark mode. Neither build has a tooltip element in the page.
- The first hover, keyboard focus and tap at 390 px show the tooltip at the same time on both builds, in the same place.
- A hover or a tap on a cell that is not cut shows no tooltip and paints nothing, on both builds.
- No flash on either build: no frame paints a tooltip and then removes it.
- No Tab stop reaches a default cell on either build, so keyboard focus is measured on a harness-added tab stop.

## Builds

- Main: the production deploy of c49f8470c0, by its version.json (environment "production").
- Head: the preview deploy of 61dad6ad5b, by its version.json (environment "preview"). No local build was used.

## Method

- Story: `core-table--overflow-behavior`, its second table, "Truncate (with tooltip on hover)" (`textOverflow="truncate"`). The story file is the same in both builds.
- Cut cells (text wider than its box): "a_very_long_string_like_…" and "This is a longer sentenc…". The cut cell measured is the first. The cell that fits is "Fits fine.", in the same column.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). Desktop: 1280×800, mouse, scale 1. Phone: 390×844, touch, scale 2. Light mode for the interactions.
- Each run is a fresh browser context: load, network idle, two frames, then one interaction. 5 runs per case and build.
- Start times: `pointerenter` on the cell's text for a hover, `focusin` for a focus, and `pointerdown` for a tap.
- Chromium does not pass `pointerenter` to a window listener, so the cell's text gets its own listener. The pointer comes from outside the table on the same row, so it crosses no other cell.
- A probe reads every animation frame for 1.6 s: each `[role="tooltip"]` element, its visibility, its composited opacity and its rect. "Shown" is the first read with the tooltip visible.
- Position, from the last read: the side, the gap between the tooltip and the cell's text, and the centring offset (tooltip centre − text centre).
- A CDP screencast records run 0 of each case. Tooltip pixels are pixels that differ from the frame before the interaction, inside the tooltip's resting box.
- Pixel counts use pixelmatch at threshold 0.1.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 12 for the at-rest stills, and 46 falling to 9 during the interaction runs, on 166 cores.

## At rest (1280)

| Mode | Pixels over pixelmatch threshold 0.1 | Byte-identical |
| --- | --- | --- |
| light | 0 | yes |
| dark | 0 | yes |

Every cell's text has the same attributes on both builds (`data-type=body data-color=primary`).

## First interest

Tooltip shown: median (range) of 5 runs, in ms after the start event. Full opacity: the median of the first read at opacity 0.99 or more.

| Case | Main: shown | Head: shown | Main: full opacity | Head: full opacity | Position, both builds |
| --- | --- | --- | --- | --- | --- |
| Hover, cut cell, 1280 | 232.7 ms (232.4–233.1) | 232.5 ms (232.2–232.8) | 332.6 ms | 332.4 ms | above, gap 4 px, centring +0.1 px, 300×68 |
| Keyboard focus, cut cell, 1280 (harness tab stop) | 24.8 ms (23.5–36.1) | 23.6 ms (20.4–25.3) | 124.9 ms | 123.5 ms | above, gap 4 px, centring +0.1 px, 300×68 |
| Tap, cut cell, 390 | 31.4 ms (31.2–31.5) | 31.4 ms (31.3–31.6) | 131.4 ms | 131.3 ms | above, gap 4 px, centring -6.3 px, 300×80 |
| Hover, cell that fits, 1280 | none in 5 runs | none in 5 runs | — | — | — |
| Tap, cell that fits, 390 | none in 5 runs | none in 5 runs | — | — | — |

- The hover's 232 ms is the Tooltip's own hover delay; the entrance then fades the tooltip in over about 100 ms.
- On both builds, the Tooltip chunk had loaded at least 1.1 s before every interaction. Its request started 1024–1906 ms after navigation on main, and 1091–2117 ms on the head.
- The head loads it after the first paint, where main loads it once a cell measures as cut. In this story, both land before the first interaction. This job does not measure the mount-time cost that the head changes.

## Keyboard focus

- Twelve Tab presses leave focus on the page body, on both builds: a default cell's text is not focusable.
- So the focus row adds `tabindex="0"` to the cut cell's text after load, the same on both builds. One Tab press then reaches it, and `:focus-visible` matches.
- In the frames, the focus ring paints at 27 ms and the tooltip at 41 to 42 ms, on both builds.

## No flash

- Hover, cut cell, main: the first frame with more than 30 tooltip pixels is at 240 ms. The 1 frame before it has 0 tooltip pixels. No later frame in the window drops back.
- Hover, cut cell, head: the first frame with more than 30 tooltip pixels is at 241 ms. The 1 frame before it has 0 tooltip pixels. No later frame in the window drops back.
- Focus, cut cell, main: the first frame with more than 30 tooltip pixels is at 41 ms. The 1 frame before it has 0 tooltip pixels. No later frame in the window drops back.
- Focus, cut cell, head: the first frame with more than 30 tooltip pixels is at 42 ms. The 1 frame before it has 0 tooltip pixels. No later frame in the window drops back.
- Tap, cut cell, main: the first frame with more than 30 tooltip pixels is at 36 ms. The 1 frame before it has 0 tooltip pixels. No later frame in the window drops back.
- Tap, cut cell, head: the first frame with more than 30 tooltip pixels is at 35 ms. The 1 frame before it has 0 tooltip pixels. No later frame in the window drops back.
- Hover, cell that fits: in the window, main sends 0 and the head 0 screencast frames, with no changed pixel. No tooltip element appears in any run.
- Tap, cell that fits: in the window, main sends 1 and the head 1 screencast frame, with no changed pixel. No tooltip element appears in any run.
- The end still at 1.6 s makes the browser rasterize the page again once. Frames after the window are left out.

## End of the first interest (1.6 s), main against the head

| Case | Pixels over pixelmatch threshold 0.1 | Byte-identical |
| --- | --- | --- |
| Hover, cut cell, 1280 | 0 | yes |
| Focus, cut cell, 1280 | 0 | yes |
| Tap, cut cell, 390 | 0 | yes |
| Hover, cell that fits, 1280 | 0 | yes |
| Tap, cell that fits, 390 | 0 | yes |

## At 390 (both builds)

- The story's 480 px wrapper makes the page 496 px wide. The visual viewport stays at scale 1 and shows 390 px of it.
- The tooltip is placed within the 496 px page, from x 180 to 480. So 90 px of it are past the screen's right edge until the page scrolls.
- At this size the Scenario cell "Long unbroken string" is cut too.

## Files

- `desktop-<mode>--rest--main.png`, `--pr.png` and `--diff.png`: the story at rest, 1280, light and dark.
- `<case>--<build>--<role>--<time>ms.png`: screencast frames of run 0. Cases: `hover-cut`, `focus-cut` (1280) and `tap-cut` (390). The time is from the start event (`m` = before it).
- Roles: `before`, `wait` (the last frame with no tooltip pixels), `first-tooltip` (the first with more than 30), `entrance-2` and `entrance-3`.
- `<case>--<build>--end-1600ms.png` and `<case>--end-1600ms--diff.png`: the page at the end of the watch, for all five cases. Phone stills are at scale 2.
- `measurements.json`: the values behind these tables.
