# Selector beside the keyboard at 5ee6cafd: Safari's keyboard band on a physical iPhone

Head: #11846 at 5ee6cafdb06567feaab84f0a9d37fe42b82de588. All numbers are test measurements from one device.

## Result (test)

- On a physical iPhone 14 with iOS 26.2, Safari takes touches just above the address pill while the keyboard is up.
- A real tap there reaches the page as no event at all, and Safari closes the keyboard.
- The zone that takes touches is about 17 pt tall, from 419 to 435 pt. It is not the 30 pt band at 403–433 pt that the body described at 5ee6cafd.
- 403–433 pt is the frame of Safari's accessibility element "Horizontal scroll bar, 1 page".
- Real taps at 405, 410 and 418 pt, in that element's upper part, reach the page with every event.
- A tap on the trigger opens the list. The same tap moves focus off Name, so the keyboard closes 467–475 ms after the tap's click, in 6 taps.
- The flipped story lays out like the plain one, so its trigger is not in the band, as the body says.

## Device, build and pages

- Device: a physical iPhone 14 with iOS 26.2, in Safari.
- Taps: real touches through WebDriverAgent, as W3C pointer actions: down, 60 ms, up.
- Predictive Text was already off on the device. Its setting read back 0, and nothing was changed or restored.
- Build: at 5ee6cafd, #11846 changed one spec bullet, so its Storybook matched main's. The pages ran on that head's preview deploy, by its version.json read in Safari.
- #11846 is now at 057b41e6. It merges a newer main, whose Selector changed, and rewrites its spec line to a band of about 17 pt. Its description now reports these measurements. The positions below are from the 5ee6cafd build.
- Pages: `iframe.html?id=core-selector--overlay-beside-keyboard&viewMode=story` and `iframe.html?id=core-selector--flipped-overlay-beside-keyboard&viewMode=story`.
- Each page was opened directly in Safari as a top-level document. No script changed any layout.
- The page touch log is a bookmarklet that only observes. It adds passive capture listeners on `window` for touch, pointer, click and focus events.
- It also listens for `visualViewport` resize. It writes each event, with its client x and y and its target's rect, into a fixed box at the top.
- That box has `pointer-events: none`. The driver reads it through the accessibility tree.
- Positions come from Safari's accessibility tree, in screen pt, as in the body.
- The web view starts at y 47 pt, so a tap at screen y arrives at clientY = y − 47.

## Checked against the body at 5ee6cafd (test)

| The body said, at 5ee6cafd | The device shows |
| --- | --- |
| A tap on Name raises the keyboard. Its top edge is at 553 pt. | **Matches.** The Keyboard element is at y 553, height 233. |
| The Fruit trigger sits at y 349–369 pt, above the band. | **Matches.** The combobox "Fruit" (value "Banana") is at x 53, y 349, 152 × 20 pt. Its "Fruit" label sits above it, at 315–339 pt. |
| Every tap opened it, with pointerdown, touchstart, pointerup, touchend and click on the trigger. | **Matches, 3 of 3 on each story,** in `takes-plain-fine.json` and `takes-flipped.json`. Each tap delivered those five events on the trigger, and the list opened. The same tap moves focus from Name to the combobox. So the keyboard closes 467–475 ms after the tap's click, and the list shows with the keyboard gone. In `takes-plain.json`, the three taps landed on the "Fruit" label, at y 327 pt. Its click opened the list through the label, and the keyboard closed 490–498 ms later. |
| With the keyboard up, Safari exposes a horizontal scroll band at y 403–433 pt. | **Matches, as an accessibility element:** "Horizontal scroll bar, 1 page" (value 0%), at x 47–343, y 403–433. |
| The address pill's text is at y 445–460 pt. | **Matches.** The "Address" element is at y 445, height 15. The pill is at 436–468. |
| Safari takes every touch in that roughly 30 pt band. A control there receives no touch. | **Does not match the band's extent.** Real taps at 395, 400, 405, 410 and 418 pt reached the page with every event. Every tap from 419 to 435 pt reached the page as no event. Only the viewport grew back, as Safari closed the keyboard. The zone is about 17 pt, from 419 pt down to the pill's top at 436 pt, across the band's width. |
| Measured from the keyboard's top, the band runs from 120 to 150 px above it. | The touch-taking zone runs from 118 to 134 pt above the keyboard's top. In the page's own terms, it is the bottom 17 CSS px of the visual viewport, which ends at clientY 389. |
| The same tap closes the keyboard, as in the public report's trace. | **Matches.** Every tap in 419–435 pt closed the keyboard. |
| `flipped-overlay-beside-keyboard` lays out like `overlay-beside-keyboard`, so it does not put a control in the band. | **Matches.** Name and the trigger sit at the same positions on both stories, with the keyboard down and up. The flipped story's list opens higher and is longer, from Apple to Honeydew. |
| The injected-script series is not evidence. | **Respected.** Only the observe-only logger ran, and every tap is a real touch. |

- The keyboard also closed after every tap that did reach the page, because the input loses focus to that tap.
- So a closed keyboard alone does not mark a taken touch. The page log does.

## (B) Band sweep, one tap each (test)

| Tap (x, y pt) | Page events | Keyboard after |
| --- | --- | --- |
| 195,395 · 195,400 · 195,405 · 195,410 · 195,418 (plain and flipped stories) · 60,410 · 330,410 | pointerdown, touchstart, pointerup, touchend, focusout (Name), click; clientY = y − 47 | closed (Name lost focus) |
| 195,419 · 195,420 · 195,421 · 195,422 · 195,423 · 195,424 · 195,425 · 195,426 (both stories) · 195,428 · 195,431 (both stories) · 195,433 · 195,435 · 60,422 · 60,426 · 330,422 · 330,426 | **none** (only the visual viewport growing back) | closed by Safari |

## The address pill (test)

- The pill shows the host name. So the two stills that reach it mask it with one flat gray box.
- In `11846-keyboard-up-layout.png`, the mask covers x 47.33–343.33 pt and y 436.92–470.18 pt.
- The pill frame is x 52–338 and y 436–468 pt. The mask covers it, except its top 0.92 pt, where no text sits.
- The "Address" text element, at x 70–320 and y 445–460 pt, sits inside the mask.
- That still's pt scale comes from its own marks: the AX band's top line at 403 pt and the keyboard-top line at 553 pt.
- In `11846-band-sweep.png`, the mask covers x 46.33–344 pt, from 434.5 pt to the crop's end at 440 pt.
- Beside each mask, in the same rows, the only dark pixels are the mask's own antialiased edge, 2 px wide.
- `11846-overlay-open.png` shows the page area only: the status bar and Safari's bar are cut. Its bottom edge has no text.

## Stills

- `11846-keyboard-up-layout.png`: the plain story, keyboard up. It marks the trigger, Safari's accessibility band (blue), the touch-taking zone (red) and the keyboard top.
- `11846-band-sweep.png`: 390–440 pt, stretched 4 times vertically, with every sweep tap. Green: the page got touchstart, pointerdown and click. Red: no page event.
- `11846-overlay-open.png`: both stories 1.3 s after a tap on the trigger. The page touch log box shows at the top of each still.
- The stills keep their pixels. Only their tIME and caNv metadata chunks are removed.

## Files

- `takes-plain.json`, `takes-plain-fine.json`, `takes-flipped.json`: every take. Each has the tap coordinates, the keyboard and trigger frames, and the page log after each tap.
- In those files, the preview's host is replaced by the build it names.
- `measurements.json`: the metadata strip and the mask readings.
