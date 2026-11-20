# MediaPlayer: a timeline marker's popover, before and after

Base: main 0dad3454117a9528fe42c8e8a8713bb56f95c4c2. Head: #12989 at de45e67e192abcd9bbfd2b952438c848dec34708, `pr` in file names.

## Builds

- Main's production build serves version.json commit 0dad345411, the head's merged main.
- The head's preview deploy failed. So both Storybooks are built from source with one toolchain, each stamped with its own version.json.
- Control: the built main and the hosted main give the same frame (0 differing pixels, idle, desktop, light).

## Method

- Story: Lab/MediaPlayer, Comment Markers (`lab-mediaplayer--comment-markers`). Every measure is the first marker, at 0.8 s.
- Chromium (Playwright 1.61.1), page-only frames. Desktop: 1280×800, mouse (fine pointer). Phone: 390×844, touch (coarse pointer), scale 2; this is Chromium, not iOS.
- Light and dark come from the Storybook color-mode global.
- The sample clip is served from a local copy of the same file, with byte ranges, so both builds paint the same buffered range.
- At 390 px the story frame is 784 px wide on both builds. So the document overflows the 390 px viewport, and the page zooms out. The phone frames add one frame-only style, `#storybook-root { width: 100% }`, so the frame fits the viewport.
- Reaching the marker: before playback the control bar is hidden, and the marker takes no pointer events, on both builds. Keyboard focus inside the bar shows it. So each run presses the large play control, then pauses at 0 through the media API.
- States: idle; hover (the mouse on the marker); keyboard focus (Tab, 3 presses); open (a click, or a tap on the phone). A press seeks to the marker on both builds.
- Measures: `getBoundingClientRect` of the marker dot, its button, the track line and the popover. Text-line rects are checked against the popover's inner edges, left, right, top and bottom. `scrollWidth > clientWidth` is checked inside the popover and the player, and on the document.
- Open time: from the press (`pointerdown`, or the Enter `keydown`) to the first frame that paints the popover. A probe reads each animation frame; a read taken before the entrance animation starts is dropped. Each run is a fresh browser context, so each first open is cold.
- Throttled cold open: CDP request interception holds the marker popover chunk (`MediaMarkerPopover-*.js`) for 400 ms. A CDP screencast records the frames.
- All numbers are test measurements from local builds on one machine, not field data.

## Frames

All 14 state pairs have 0 differing pixels (pixelmatch, threshold 0.1). 12 pairs are byte-identical; in the other 2, 1 or 2 pixels at the control bar's top-right corner differ by at most 14/255.

| Measure | Desktop 1280 | Phone 390 |
| --- | --- | --- |
| Marker dot | 6×6 px, in a 24×24 px button | 6×6 px, in a 24×24 px button |
| Dot centre along the track | 87.64 px of 511 px | 41.94 px of 222 px |
| Dot centre, vertical, from the track's centre | 0 px | 0 px |
| Popover side | above | above |
| Gap, popover to dot | 13 px | 13 px |
| Popover width | 360 px | 358 px |
| Centring offset (popover centre − dot centre) | 0 px | +69.06 px: the popover keeps 16 px from the left edge |
| Text lines past the popover's left or right edge | 0 | 0 |
| `scrollWidth > clientWidth` in the popover | 0 | 3: the "Copy comment link" button's 36 px touch hit area in its 28 px box, and its two containers; nothing visible |
| Document `scrollWidth` / `clientWidth` | 1280 / 1280 | 390 / 390 (784 / 390 without the frame style) |

Main and the head give the same numbers, in light and in dark.

- The width constant is 360 on both builds (`MARKER_POPOVER_WIDTH`). On the phone the popover is 16 px short of each viewport edge, so it is 358 px.
- In the player at 390 px, 4 more `scrollWidth` findings are touch hit areas wider than their boxes. They are the Play and Full screen buttons, the slider thumb, and the bar that holds them (2 px). No text line crosses an edge.
- On the head, hover or focus loads the popover module, and its closed content then enters the DOM. Main keeps that content in the DOM from the start. This changes no pixel.

## Opening

Press to the first painted popover frame. Median (range) of 5 cold runs, then the second open in the same page.

| Path | Main, first open | Head, first open | Main, second | Head, second |
| --- | --- | --- | --- | --- |
| Desktop, quick click (the pointer enters as it presses) | 42.9 ms (42.6–43.7) | 77.5 ms (76.9–77.9) | 27.6 ms | 29.4 ms |
| Desktop, hover 300 ms, then click | 30.6 ms (29.7–47.8) | 29.4 ms (27.5–30.1) | 31 ms | 31 ms |
| Desktop, Tab to the marker, 300 ms, then Enter | 38.4 ms (37.4–38.5) | 38.5 ms (37.2–38.9) | 20.5 ms | 25.9 ms |
| Phone, tap | 48.9 ms (48.8–49.2) | 80.7 ms (80.3–80.9) | 33.3 ms | 32.9 ms |

- On the head, the pointer entering the marker, or focus on it, starts the chunk load. A hover or a focus first hides the load; a quick click or a tap pays it, about 32–35 ms here from a local server.
- Touch entrance: on main, every touch open grows the popover out of the marker; its first painted frame is 101.4 px wide. On the head, the cold first open fades and scales in instead: its first frame is 346.8 px wide at opacity 0.375. Its later opens grow out of the marker, as on main. On desktop, both builds fade and scale in on every open.
- No flash: in the recorded frames, no frame paints the popover in a wrong place, or at full size before its entrance, on either build.

## Throttled cold open (+400 ms on the chunk)

| Path | Main | Head |
| --- | --- | --- |
| Phone, tap | 49.2 ms (48.8–49.3) | 464 ms (463.7–464.1) |
| Desktop, quick click | 27.3 ms (26.9–43.1) | 477.4 ms (460.8–478.1) |
| Desktop, Tab, then Enter at once | 39.6 ms (39.3–39.6) | 470.1 ms (470.1–470.2) |
| Desktop, hover 300 ms, then click | 46.5 ms (35.2–49.5) | 178.3 ms (161.8–210.9) |

Median (range) of 3 cold runs. Main loads no chunk, so the hold does not apply to it.

What the head shows while it waits:

- The press seeks at once: the video is at the marker 13.5–13.9 ms after the tap, and the thumb moves there.
- Nothing shows the load: no popover and no progress. On desktop the hover preview stays over the marker.
- The marker's `aria-expanded` stays "false" until the popover mounts, 453.8–455 ms after the tap. On main it is "true" 18.7–19.4 ms after the tap.
- When the chunk lands, the popover opens with no second press. Its second open is as fast as main's.

## Files

- `<device>-<mode>--<state>--main.png`, `--pr.png` and `--diff.png`: device `desktop` or `phone`, mode `light` or `dark`, state `idle`, `hover` (desktop), `focus` or `open`.
- `throttle--<path>--<build>--<role>--<time>ms.png`: frames of the throttled cold open. The role is `before`, `gap` (the last frame before the popover), `first-paint` or `settled`, and the time is from the press (`m` = before it).
- `control--idle--local-main.png` and `control--idle--hosted-main.png`: the build control.
- `measurements.json`: the measured values behind these tables.
