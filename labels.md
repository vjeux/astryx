# #12605: hover after a tap, constructed story

- Builds (static Storybook): head 24f57247 (24f57247adc55f584a9c7995768afd12a414a966) and main 432354a7 (432354a7974800a5e82777e55565aa66a4165d4d). Both builds carry the same constructed story, written for this check and never committed.
- Device, from each take's record: iOS Simulator, iPhone 17 Pro, iOS 26.2, Safari 26.2, Reduce Motion off. Taps are simulated touches with an 80 ms hold, on a fresh page load per take. These are test runs.
- Each frame is about 1.5 s after the tap. For the two-tap control, the two frames are about 1 s after tap 1 and about 1.5 s after tap 2. Measured: the screenshot was requested 1500–1502 ms after the tap's lift and finished 1995–2457 ms after it. For the two-tap control, 999–1002 / 1497–3652 ms after tap 1 (requested / finished) and 1500–1509 / 1989–2622 ms after tap 2.
- Frames show the page only (status bar and Safari toolbar cropped out), at half size, with a label strip on top.
- A card or hint take counts when "Moved trigger heard" lists all six compatibility events (mouseover, mouseenter, mousemove, mousedown, mouseup, click). A script-focus take counts when its log shows focus. A two-tap take counts when tap 1's log shows all six and tap 2's log adds mouseleave and focus. In the takes that did not count, tap 1's events never reached the (i), and the script focus then opened the card on both builds.

## Frames

| File | Build | Case |
|---|---|---|
| `1-card-main-432354a7.png` | main 432354a7 | Card under the finger: tap "Open sheet: card" |
| `2-card-head-24f57247.png` | head 24f57247 | Card under the finger: tap "Open sheet: card" |
| `3-hint-main-432354a7.png` | main 432354a7 | Hint under the finger: tap "Open sheet: hint" |
| `4-hint-head-24f57247.png` | head 24f57247 | Hint under the finger: tap "Open sheet: hint" |
| `5-script-main-432354a7.png` | main 432354a7 | Script-focus control: tap "Focus the (i)" |
| `6-script-head-24f57247.png` | head 24f57247 | Script-focus control: tap "Focus the (i)" |
| `7-twotap1-main-432354a7.png` | main 432354a7 | Two-tap control, after tap 1 "Open sheet: two-tap" |
| `8-twotap2-main-432354a7.png` | main 432354a7 | Two-tap control, after tap 2 "Focus the dropped (i)" |
| `9-twotap1-head-24f57247.png` | head 24f57247 | Two-tap control, after tap 1 "Open sheet: two-tap" |
| `10-twotap2-head-24f57247.png` | head 24f57247 | Two-tap control, after tap 2 "Focus the dropped (i)" |

## Every take

| Case | Build | Takes that counted | Result |
|---|---|---|---|
| Card under the finger | main 432354a7 | 6 of 16 (10 did not count: the tap's compatibility mouse events did not reach the moved trigger, "Moved trigger heard: nothing") | opened in 6 of 6 |
| Card under the finger | head 24f57247 | 6 of 12 (6 did not count: the tap's compatibility mouse events did not reach the moved trigger, "Moved trigger heard: nothing") | opened in 0 of 6 |
| Hint under the finger | main 432354a7 | 6 of 23 (17 did not count: the tap's compatibility mouse events did not reach the moved trigger, "Moved trigger heard: nothing") | opened in 6 of 6 |
| Hint under the finger | head 24f57247 | 6 of 19 (13 did not count: the tap's compatibility mouse events did not reach the moved trigger, "Moved trigger heard: nothing") | opened in 0 of 6 |
| Script-focus control | main 432354a7 | 3 of 3 (heard: focus) | opened in 3 of 3 |
| Script-focus control | head 24f57247 | 3 of 3 (heard: focus) | opened in 3 of 3 |
| Two-tap control | main 432354a7 | 3 of 12 (9 did not count: tap 1's six compatibility events, or tap 2's mouseleave and focus, missing from the (i)'s log) | After tap 1 the page counter was 1 in 3 of 3. After tap 2 (a new open after the script focus) it was 1 in 0 of 3. |
| Two-tap control | head 24f57247 | 3 of 13 (10 did not count: tap 1's six compatibility events, or tap 2's mouseleave and focus, missing from the (i)'s log) | After tap 1 the page counter was 1 in 0 of 3. After tap 2 (a new open after the script focus) it was 1 in 3 of 3. |
| Direct tap on "Service fee" (hint-only Tooltip) | main 432354a7 | 2 of 2 | opened in 2 of 2 |
| Direct tap on "Service fee" (hint-only Tooltip) | head 24f57247 | 2 of 2 | opened in 2 of 2 |
| Direct tap on the (i) (HoverCard) | main 432354a7 | 2 of 2 | opened in 2 of 2 |
| Direct tap on the (i) (HoverCard) | head 24f57247 | 2 of 2 | opened in 2 of 2 |

Desktop Chromium, 1000×900, mouse, each read 1.5 s after the last gesture: hovering "Service fee" or the (i) opens it on both builds. A mouse click on "Open sheet: card", then hovering the dropped (i), opens the card on both builds.
