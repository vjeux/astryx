# Overlay at 3bbaf48b: Tab reaches hidden actions, and the frames match main

Main: the Production build of 0f3ed13d4f5c023efbeb592bec3bc9086a32de51, the head's merge base, `main` in file names. Head: #12628 at 3bbaf48b62117ddde13234495b2685ee773f9148, `head` in file names.

## Answer (test)

- Hover On Image looks the same as on main. At rest and on a settled mouse hover at 1280, the frames are pixel-identical in light and dark.
- From page start, Tab lands on "Quick view", and its overlay shows. On main, the first Tab leaves the story, and focus stays on the page.
- In Reveal Modes, Tab reaches all six actions in order, and each overlay shows. Then focus leaves the story.
- At 390 with touch, a tap shows the overlay and a second tap hides it. After each tap the frames are pixel-identical to main's.
- On un-hover, the overlay fades out. Its clip applies on the first frame where opacity is 0, at about 133 ms, and never before. Under reduced motion it hides at once.
- On focus, the clip lifts on the first frame, and the fade shows from the next frame. The overlay is fully shown 116 to 131 ms after focus.
- Every focus ring has a contrast of at least 3:1 with the pixels next to it, on both pixel rows of its straight edges. The lowest is 3.24:1.
- At rest, the head exposes each hidden action's name in the accessibility tree. Each of them is on the Tab path, and no other hidden content is exposed.
- On a mouse hover, the head's action takes a click one frame before anything of it shows. Main's action took a click only from its first visible frame.

## Frames: main against the head (test)

| Frame | Mode | main vs head |
| --- | --- | --- |
| Hover On Image at rest, 1280 | light | identical |
| Hover On Image, mouse hover settled, 1280 | light | identical |
| 390 touch, after the first tap | light | identical |
| 390 touch, after the second tap | light | identical |
| Hover On Image at rest, 1280 | dark | identical |
| Hover On Image, mouse hover settled, 1280 | dark | identical |
| 390 touch, after the first tap | dark | identical |
| 390 touch, after the second tap | dark | identical |

## Tab path at rest (test)

| Story | Build | Mode | Tab stops | Stops in order | After the last stop |
| --- | --- | --- | --- | --- | --- |
| Hover On Image | main | light | 0 | none | the first Tab leaves the story, to the body |
| Hover On Image | head | light | 1 | "Quick view" | focus leaves the story, to the body |
| Reveal Modes | head | light | 6 | "Hover action", "Focus action", "Hover strip action", "Always action", "Focus link action", "Hover link action" | focus leaves the story, to the body |
| Hover On Image | main | dark | 0 | none | the first Tab leaves the story, to the body |
| Hover On Image | head | dark | 1 | "Quick view" | focus leaves the story, to the body |
| Reveal Modes | head | dark | 6 | "Hover action", "Focus action", "Hover strip action", "Always action", "Focus link action", "Hover link action" | focus leaves the story, to the body |

- Reveal Modes is new in this pull request, so main has no such story.

## Focus reveals the overlay (test; head)

| Story | Mode | Stop | Before focus: opacity, clip | First frame after focus: ms, opacity, clip, hit | Fade starts, ms | Fully shown, ms | Ring vs outside: min (median), row 1 / row 2 | Ring vs inside gap: min, row 1 / row 2 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hover On Image | light | 1: "Quick view" | - | 6.6, 0, none, true | 23.5 | 123.3 | 4.14 (10.44) / 4.95 (10.44) | 4.14 / 4.97 |
| Reveal Modes | light | 1: "Hover action" | - | 7, 0, none, true | 23.8 | 123.7 | 4.15 (10.44) / 4.89 (10.44) | 4.15 / 4.95 |
| Reveal Modes | light | 2: "Focus action" | 0, inset(50%) | 14.7, 0, none, true | 31.3 | 131.1 | 4.15 (10.44) / 4.89 (10.44) | 4.15 / 4.89 |
| Reveal Modes | light | 3: "Hover strip action" | 0, inset(50%) | 0.7, 0, none, false | 17 | 117 | 5.5 (9.75) / 7.05 (9.75) | 5.5 / 7.05 |
| Reveal Modes | light | 4: "Always action" | 1, none | 0.5, 1, none, true | 0.5 | 0.5 | 3.61 (10.44) / 4.89 (10.44) | 3.24 / 4.9 |
| Reveal Modes | light | 5: "Focus link action" | 0, inset(50%) | 0.2, 0, none, true | 16.1 | 116.1 | 4.87 (10.44) / 4.87 (10.44) | 4.87 / 4.87 |
| Reveal Modes | light | 6: "Hover link action" | 0, inset(50%) | 12.4, 0, none, true | 29.1 | 129.1 | 4.87 (10.44) / 4.87 (10.44) | 4.87 / 4.87 |
| Hover On Image | dark | 1: "Quick view" | - | 7.5, 0, none, true | 24.2 | 124.2 | 9.7 (15.97) / 12.72 (15.97) | 9.7 / 12.72 |
| Reveal Modes | dark | 1: "Hover action" | - | 6.9, 0, none, true | 23.6 | 123.6 | 9.28 (15.97) / 12.72 (15.97) | 9.28 / 12.72 |
| Reveal Modes | dark | 2: "Focus action" | 0, inset(50%) | 12.3, 0, none, true | 28.9 | 128.7 | 9.44 (15.97) / 12.72 (15.97) | 9.44 / 12.72 |
| Reveal Modes | dark | 3: "Hover strip action" | 0, inset(50%) | 14.3, 0, none, false | 30.9 | 130.8 | 9.23 (15.77) / 14.33 (15.77) | 9.23 / 14.33 |
| Reveal Modes | dark | 4: "Always action" | 1, none | 2.8, 1, none, true | 2.8 | 2.8 | 7.73 (15.97) / 12.72 (15.97) | 7.41 / 12.72 |
| Reveal Modes | dark | 5: "Focus link action" | 0, inset(50%) | 3.8, 0, none, true | 20.5 | 120.4 | 12.69 (15.97) / 12.69 (15.97) | 12.69 / 12.69 |
| Reveal Modes | dark | 6: "Hover link action" | 0, inset(50%) | 3.6, 0, none, true | 20.3 | 120.3 | 12.69 (15.97) / 12.69 (15.97) | 12.69 / 12.69 |

- Times count from the focusin event. "hit" means that a hit-test at the action's center lands on the action.
- A dash means that no frame was read before focus moved.
- The strip slides in, so its action takes a hit from the third frame after focus.
- Every ring is the action's outline: 2 px wide, 3 px out from the action, in rgb(241, 241, 241). The buttons' rings have a 10 px radius, and the links' rings have none.
- Row 1 is the band's outer pixel row, and row 2 its inner one. Each pixel on the band's straight edges is compared with two others.
- One is 1.5 px outside the band, and one is in the middle of the gap inside it.

## Accessibility tree at rest (test)

| Story | Build | Mode | Names exposed from hidden layers | On the Tab path | Exposed from hidden layers, not on the path |
| --- | --- | --- | --- | --- | --- |
| Hover On Image | main | light | none | 0 of 0 | none |
| Hover On Image | head | light | button "Quick view" | 1 of 1 | none |
| Reveal Modes | head | light | button "Hover action", button "Focus action", button "Hover strip action", button "Focus link action", button "Hover link action" | 5 of 5 | none |
| Hover On Image | main | dark | none | 0 of 0 | none |
| Hover On Image | head | dark | button "Quick view" | 1 of 1 | none |
| Reveal Modes | head | dark | button "Hover action", button "Focus action", button "Hover strip action", button "Focus link action", button "Hover link action" | 5 of 5 | none |

- Each button's own text is exposed with it, and counts as that button.
- The images' alt texts are exposed on both builds.
- The two links have no href, so each one renders as a button element. The tree exposes them as buttons.
- The Always action is in a shown layer, so it is not counted as hidden.

## Mouse hover, frame by frame (test)

| Build | Mode | Runs | Last frame before the hover: opacity, clip, visibility, pointer-events, hit | First hittable frame, ms | Opacity on that frame | Fade-in starts, ms | Fully shown, ms |
| --- | --- | --- | --- | --- | --- | --- | --- |
| main | light | 3 | 0, none, hidden, none, false | 16.3–16.7 | 0.474–0.4763 | 16.3–16.7 | 116.3–116.5 |
| main | dark | 3 | 0, none, hidden, none, false | 16.5–16.6 | 0.474 | 16.5–16.6 | 116.4–116.5 |
| head | light | 3 | 0, inset(50%), visible, none, false | 0.2 | 0 | 16.6 | 116.4–116.6 |
| head | dark | 3 | 0, inset(50%), visible, none, false | 0.1–0.3 | 0 | 16.4–16.6 | 116.2–116.4 |

- Times count from pointerenter. The pointer enters the image 24 px from its corner, away from the action.
- On the head, the first frame after the pointer enters lifts both the clip and pointer-events. Opacity is still 0, and a hit-test at the action lands on it.
- On main, pointer-events also lifted on that first frame. But visibility stayed hidden, so the hit-test missed.
- Main's visibility turned visible on the next frame, which is also the first frame of the fade that shows anything, at opacity 0.47.
- So on the head, for one frame of about 16 ms, a click reaches the action while it is fully transparent.
- On both builds, the first frame painted after the pointer enters comes 25 to 27 ms later, with the overlay at about half opacity.

## The hide on un-hover (test)

| Motion | Build | Mode | Runs | Last frame with opacity above 0.001, ms | Opacity at most 0.001, ms | Clip applies, ms | Clip minus that, ms | Visibility hidden, ms | Hit-test fails, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| full | main | light | 3 | 99.7–99.9 | 116.4–116.7 | - | - | 133.2–133.3 | 0.1–0.3 |
| full | main | dark | 3 | 99.8–99.9 | 116.4–116.6 | - | - | 133.2 | 0.1–0.2 |
| full | head | light | 3 | 99.9 | 116.5 | 133.2–133.3 | 16.7–16.8 | - | 0.1–0.2 |
| full | head | dark | 3 | 99.7–99.9 | 116.3–116.6 | 133.1–133.3 | 16.7–16.8 | - | 0.2 |
| reduced | main | light | 3 | - | 0.2–0.3 | - | - | 0.2–0.3 | 0.2–0.3 |
| reduced | main | dark | 3 | - | 0.1–0.3 | - | - | 0.1–0.3 | 0.1–0.3 |
| reduced | head | light | 3 | - | 0.2–0.3 | 0.2–0.3 | 0 | - | 0.2–0.3 |
| reduced | head | dark | 3 | - | 0.2–0.3 | 0.2–0.3 | 0 | - | 0.2–0.3 |

- Times count from pointerleave. A hover showed the overlay for 600 ms first.
- On both builds pointer-events turns none on the first frame, so the action takes no click while the overlay fades.
- With full motion, opacity is above 0.001 until about 100 ms, is 0.0001 at about 116 ms, and is 0 from about 133 ms.
- The head's clip applies on the first frame where opacity is 0, and never before it. Main's visibility turned hidden on that same frame.
- Under reduced motion, opacity is 0 on the first frame. The head's clip applies on that same frame, and so did main's visibility.

## Touch at 390 (test)

| Build | Mode | At rest: opacity, clip, visibility | After tap 1 | After tap 2 |
| --- | --- | --- | --- | --- |
| main | light | 0, none, hidden | 1, none, visible, hit true | 0, none, hidden, hit false |
| head | light | 0, none, hidden | 1, none, visible, hit true | 0, none, hidden, hit false |
| main | dark | 0, none, hidden | 1, none, visible, hit true | 0, none, hidden, hit false |
| head | dark | 0, none, hidden | 1, none, visible, hit true | 0, none, hidden, hit false |

- With touch, both builds keep the overlay hidden with visibility at rest. A tap toggles it.

## Builds

- Main: the Production deploy of 0f3ed13d4f, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of 3bbaf48b62, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of the run.

## Method

- Hover On Image is the same story on both builds. Reveal Modes is new in the head.
- Desktop: 1280 × 800, scale 1, with a mouse. Touch: 390 × 844, scale 2, with touch.
- The layer is the overlay's scrim element. Its computed opacity, visibility, clip-path and pointer-events are read on every animation frame.
- A hit-test calls elementFromPoint at the action's center. It hits when it returns the action or a child of it.
- Shown means opacity above 0.001, and fully shown means opacity of at least 0.999.
- Tab starts with focus on the page and runs until focus leaves the story. Each stop is read on every frame for 400 ms.
- The accessibility tree is Chromium's full tree at rest, read through the DevTools protocol. Each exposed node is mapped to its element.
- Hover and un-hover run 3 times per build and mode, and the builds alternate. The stills come from the first run.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- The run took 21:19:16Z to 21:22:19Z on 2026-11-20, at a box load of about 4.5 on 166 cores.

## Files

- `rest--image--<mode>--<build>.png` and `hover--image--<mode>--<build>.png`: Hover On Image at rest, and on a settled hover, at 1280.
- `tab1-leaves--image--<mode>--main.png` and `tab1--image--<mode>--head.png`: after the first Tab.
- `rest--modes--<mode>--head.png` and `tab<k>--modes--<mode>--head.png`: Reveal Modes at rest, and at each Tab stop.
- `tap1--image--<mode>--<build>.png` and `tap2--image--<mode>--<build>.png`: at 390, after each tap.
- `hoverin-first-frame--image--<mode>--<build>.png`: the first frame painted after the pointer enters.
- `unhover-60ms--image--<motion|reduced>--<mode>--<build>.png`: about 60 ms after the pointer leaves, with full and with reduced motion.
- `measurements.json`: every frame's record, the accessibility trees, the ring samples, and the summaries.
