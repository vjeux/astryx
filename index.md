# Overlay at 808a9cf8: a hover overlay takes no click until it shows

Main: the Production build of 0f3ed13d4f5c023efbeb592bec3bc9086a32de51, the head's merge base, `main` in file names. Head: #12628 at 808a9cf8304603021214df10e34087861460b383, `head` in file names.

## Answer (test)

- On a hover, the head's action takes no click while its opacity is near 0. Its first hit is on the fifth frame, at 66.4 to 66.7 ms, at opacity 0.965.
- The clip lifts on that frame, the first one after half the fade. The fade takes 0.125 s, so half of it is 62.5 ms.
- Main's action takes its first hit on the second frame, at 16.4 to 16.7 ms, at opacity 0.47.
- Focus reveals at once. On the first frame after focus, the clip has lifted, and the fade shows from the next frame.
- Under reduced motion, a hover shows the overlay in full on the first frame. When the pointer leaves, the overlay hides on the first frame.
- At rest and on a settled hover, the head's frames are pixel-identical to main's, in light and dark.
- The clip also hides the first half of the fade. The head paints nothing new until 63 to 79 ms, and then paints the overlay at 96% of its settled look.
- Main's first painted frame comes at 16 to 23 ms, at 47% of the settled look. So on the head, a hover reveal shows later and with almost no visible fade-in.

## Hover, frame by frame (test; full motion, 6 runs per build and mode)

| Build | Mode | Frame | ms | Opacity | Clip | pointer-events | Hit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| main | light | 1 | 0.1–0.3 | 0 | none; visibility hidden | auto | miss |
| main | light | 2 | 16.5–16.7 | 0.4717–0.474 | none; visibility visible | auto | hit |
| main | light | 3 | 33–33.1 | 0.76–0.7613 | none; visibility visible | auto | hit |
| main | light | 4 | 49.6–49.8 | 0.9016–0.9022 | none; visibility visible | auto | hit |
| main | light | 5 | 66.3–66.5 | 0.9646–0.9648 | none; visibility visible | auto | hit |
| main | light | 6 | 83–83.1 | 0.9898–0.9899 | none; visibility visible | auto | hit |
| main | light | 7 | 99.6–99.8 | 0.9982 | none; visibility visible | auto | hit |
| main | light | 8 | 116.3–116.5 | 0.9999 | none; visibility visible | auto | hit |
| main | light | 9 | 133.1–133.3 | 1 | none; visibility visible | auto | hit |
| main | dark | 1 | 0.2–0.4 | 0 | none; visibility hidden | auto | miss |
| main | dark | 2 | 16.4–16.7 | 0.4717–0.474 | none; visibility visible | auto | hit |
| main | dark | 3 | 32.9–33.2 | 0.76–0.7613 | none; visibility visible | auto | hit |
| main | dark | 4 | 49.5–49.9 | 0.9022–0.9027 | none; visibility visible | auto | hit |
| main | dark | 5 | 66.2–66.5 | 0.9646–0.965 | none; visibility visible | auto | hit |
| main | dark | 6 | 82.9–83.2 | 0.9898–0.9899 | none; visibility visible | auto | hit |
| main | dark | 7 | 99.6–99.9 | 0.9982 | none; visibility visible | auto | hit |
| main | dark | 8 | 116.2–116.5 | 0.9999 | none; visibility visible | auto | hit |
| main | dark | 9 | 133–133.3 | 1 | none; visibility visible | auto | hit |
| head | light | 1 | 0.1–0.3 | 0 | inset(50%) | auto | miss |
| head | light | 2 | 16.5–16.6 | 0.4717–0.474 | inset(50%) | auto | miss |
| head | light | 3 | 32.9–33.1 | 0.76–0.7613 | inset(50%) | auto | miss |
| head | light | 4 | 49.5–49.8 | 0.9016–0.9022 | inset(50%) | auto | miss |
| head | light | 5 | 66.4–66.7 | 0.9646–0.9648 | none | auto | hit |
| head | light | 6 | 82.8–83.1 | 0.9898–0.9899 | none | auto | hit |
| head | light | 7 | 99.4–99.8 | 0.9982 | none | auto | hit |
| head | light | 8 | 116.3–116.4 | 0.9999 | none | auto | hit |
| head | light | 9 | 133–133.2 | 1 | none | auto | hit |
| head | dark | 1 | 0.2–0.3 | 0 | inset(50%) | auto | miss |
| head | dark | 2 | 16.5–16.7 | 0.4717–0.4763 | inset(50%) | auto | miss |
| head | dark | 3 | 33–33.2 | 0.76–0.7613 | inset(50%) | auto | miss |
| head | dark | 4 | 49.6–49.9 | 0.9022–0.9027 | inset(50%) | auto | miss |
| head | dark | 5 | 66.4–66.7 | 0.9648–0.965 | none | auto | hit |
| head | dark | 6 | 82.9–83.3 | 0.9899 | none | auto | hit |
| head | dark | 7 | 99.6–99.9 | 0.9982 | none | auto | hit |
| head | dark | 8 | 116.3–116.5 | 0.9999 | none | auto | hit |
| head | dark | 9 | 133–133.3 | 1 | none | auto | hit |

- Frame 1 is the first animation frame after pointerenter. Each range covers the 6 runs.
- Main has no clip. Its clip column also shows its visibility, which is how main hides.
- "hit" means that elementFromPoint at the action's center returns the action or a child of it.

## Hover summary (test)

| Motion | Build | Mode | Runs | Clip lifts: ms, opacity | pointer-events lifts, ms | First hit, ms | Opacity on that frame | Fade-in starts, ms | Fully shown, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| full | main | light | 6 | no clip | 0.1–0.3 | 16.5–16.7 | 0.4717–0.474 | 16.5–16.7 | 116.3–116.5 |
| full | main | dark | 6 | no clip | 0.2–0.4 | 16.4–16.7 | 0.4717–0.474 | 16.4–16.7 | 116.2–116.5 |
| full | head | light | 6 | 66.4–66.7, 0.9646–0.9648 | 0.1–0.3 | 66.4–66.7 | 0.9646–0.9648 | 16.5–16.6 | 116.3–116.4 |
| full | head | dark | 6 | 66.4–66.7, 0.9648–0.965 | 0.2–0.3 | 66.4–66.7 | 0.9648–0.965 | 16.5–16.7 | 116.3–116.5 |
| reduced | main | light | 6 | no clip | 0.2 | 0.2 | 1 | 0.2 | 0.2 |
| reduced | main | dark | 6 | no clip | 0.2–0.3 | 0.2–0.3 | 1 | 0.2–0.3 | 0.2–0.3 |
| reduced | head | light | 6 | 0.1–0.3, 1 | 0.1–0.3 | 0.1–0.3 | 1 | 0.1–0.3 | 0.1–0.3 |
| reduced | head | dark | 6 | 0.1–0.3, 1 | 0.1–0.3 | 0.1–0.3 | 1 | 0.1–0.3 | 0.1–0.3 |

- On the head, a hover sets the clip's transition delay to 0.0625 s, half of the 0.125 s fade. Under focus-within the delay is 0 s.
- Under reduced motion, every transition duration and delay on the layer is 0 s.

## What the hover paints (test; 3 runs per build and mode)

| Build | Mode | Painted frame | ms after pointerenter | Share of the settled look |
| --- | --- | --- | --- | --- |
| main | light | 1 | 18–23 | 47% |
| main | light | 2 | 30–35 | 76% |
| main | light | 3 | 47–52 | 90% |
| main | light | 4 | 64–68 | 96% |
| main | light | 5 | 81–85 | 99% |
| main | light | 6 | 97–102 | 100% |
| main | light | 7 | 114–119 | 100% |
| main | light | 8 | 132–138 | 100% |
| main | dark | 1 | 16–18 | 47% |
| main | dark | 2 | 28–31 | 76% |
| main | dark | 3 | 46–48 | 90% |
| main | dark | 4 | 63–64 | 96% |
| main | dark | 5 | 79–81 | 99% |
| main | dark | 6 | 96–98 | 100% |
| main | dark | 7 | 113–114 | 100% |
| main | dark | 8 | 130–132 | 100% |
| head | light | 1 | 72–79 | 96% |
| head | light | 2 | 85–89 | 99% |
| head | light | 3 | 102–107 | 100% |
| head | light | 4 | 118–122 | 100% |
| head | light | 5 | 138–142 | 100% |
| head | dark | 1 | 63–67 | 96% |
| head | dark | 2 | 75–79 | 99% |
| head | dark | 3 | 92–96 | 100% |
| head | dark | 4 | 108–113 | 100% |
| head | dark | 5 | 126–131 | 100% |

- Each painted frame is a screencast frame. Its share is the mean pixel change from rest inside the overlay's box, over the settled hover's.
- While the clip is on, the head paints nothing new. So its first painted frame comes when the clip lifts.

## Focus reveals at once (test; head)

| Story | Mode | Stop | Before focus: opacity, clip | First frame after focus: ms, opacity, clip, hit | Fade starts, ms | Fully shown, ms |
| --- | --- | --- | --- | --- | --- | --- |
| Hover On Image | light | 1: "Quick view" | - | 5.9, 0, none, true | 22.6 | 122.5 |
| Reveal Modes | light | 1: "Hover action" | - | 7.7, 0, none, true | 24.4 | 124.3 |
| Reveal Modes | light | 2: "Focus action" | 0, inset(50%) | 12.6, 0, none, true | 29.3 | 129.1 |
| Reveal Modes | light | 3: "Hover strip action" | 0, inset(50%) | 4.2, 0, none, false | 20.9 | 120.9 |
| Reveal Modes | light | 4: "Always action" | 1, none | 8.1, 1, none, true | 8.1 | 8.1 |
| Reveal Modes | light | 5: "Focus link action" | 0, inset(50%) | 1.8, 0, none, true | 18.6 | 118.4 |
| Reveal Modes | light | 6: "Hover link action" | 0, inset(50%) | 1.1, 0, none, true | 17.8 | 117.7 |
| Hover On Image | dark | 1: "Quick view" | - | 7.6, 0, none, true | 24.5 | 124.4 |
| Reveal Modes | dark | 1: "Hover action" | - | 8.5, 0, none, true | 25.1 | 125.2 |
| Reveal Modes | dark | 2: "Focus action" | 0, inset(50%) | 1.3, 0, none, true | 18.2 | 118.1 |
| Reveal Modes | dark | 3: "Hover strip action" | 0, inset(50%) | 5.1, 0, none, false | 21.8 | 121.6 |
| Reveal Modes | dark | 4: "Always action" | 1, none | 0.5, 1, none, true | 0.5 | 0.5 |
| Reveal Modes | dark | 5: "Focus link action" | 0, inset(50%) | 6.1, 0, none, true | 23 | 122.8 |
| Reveal Modes | dark | 6: "Hover link action" | 0, inset(50%) | 4.8, 0, none, true | 21.5 | 121.4 |

- Times count from the focusin event. A dash means that no frame was read before focus moved.
- The strip slides in, so its action takes a hit from the third frame after focus.

| Story | Build | Mode | Tab stops | Stops in order |
| --- | --- | --- | --- | --- |
| Hover On Image | main | light | 0 | none |
| Hover On Image | head | light | 1 | "Quick view" |
| Reveal Modes | head | light | 6 | "Hover action", "Focus action", "Hover strip action", "Always action", "Focus link action", "Hover link action" |
| Hover On Image | main | dark | 0 | none |
| Hover On Image | head | dark | 1 | "Quick view" |
| Reveal Modes | head | dark | 6 | "Hover action", "Focus action", "Hover strip action", "Always action", "Focus link action", "Hover link action" |

- Reveal Modes is new in this pull request, so main has no such story.

## Reduced motion, and the hide (test)

| Motion | Build | Mode | Runs | Opacity above 0.001 until, ms | Opacity exactly 0 from, ms | Clip applies, ms | Visibility hidden, ms | Hit-test fails, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| full | main | light | 3 | 99.7–99.8 | 133.1–133.2 | - | 133.1–133.2 | 0.2–0.3 |
| full | main | dark | 3 | 99.7–99.8 | 133.1–133.3 | - | 133.1–133.3 | 0.1–0.2 |
| full | head | light | 3 | 99.7–99.8 | 133.1–133.4 | 133.1–133.4 | - | 0.1–0.3 |
| full | head | dark | 3 | 99.7–99.8 | 133.2–133.3 | 133.2–133.3 | - | 0.1–0.3 |
| reduced | main | light | 3 | - | 0.2–0.3 | - | 0.2–0.3 | 0.2–0.3 |
| reduced | main | dark | 3 | - | 0.2–0.3 | - | 0.2–0.3 | 0.2–0.3 |
| reduced | head | light | 3 | - | 0.2–0.3 | 0.2–0.3 | - | 0.2–0.3 |
| reduced | head | dark | 3 | - | 0.1–0.3 | 0.1–0.3 | - | 0.1–0.3 |

- Times count from pointerleave. With full motion, the head's clip applies on the first frame where opacity is 0. Main's visibility hides on that same frame.
- Under reduced motion, both builds hide on the first frame.

## Frames: main against the head (test)

| Frame | Mode | main vs head |
| --- | --- | --- |
| Hover On Image at rest, 1280 | light | identical |
| Hover On Image, mouse hover settled, 1280 | light | identical |
| Hover On Image at rest, 1280 | dark | identical |
| Hover On Image, mouse hover settled, 1280 | dark | identical |

## Builds

- Main: the Production deploy of 0f3ed13d4f, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of 808a9cf830, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of the runs.

## Method

- Hover On Image is the same story on both builds. Reveal Modes is new in the head.
- 1280 × 800, scale 1, with a mouse, in light and dark.
- The layer is the overlay's scrim element. Its computed opacity, visibility, clip-path and pointer-events are read on every animation frame.
- The pointer enters the image 24 px from its corner, away from the action.
- Shown means opacity above 0.001, and fully shown means opacity of at least 0.999.
- Hover runs 6 times per build, mode and motion setting, and the builds alternate. The hide runs 3 times. The stills come from the first run.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- On 2026-11-20, the main run took 23:16:23Z to 23:20:56Z, at a box load of 27 at its start and 15 at its end.
- The paint run took 23:22:16Z to 23:22:56Z, at a box load of about 6.

## Files

- `rest--image--<mode>--<build>.png` and `hover--image--<mode>--<build>.png`: Hover On Image at rest, and on a settled hover.
- `hover--image--reduced--<mode>--<build>.png`: a settled hover under reduced motion.
- `hoverin-first-frame--image--[reduced--]<mode>--<build>.png`: the first frame painted after the pointer enters.
- `tab1-leaves--image--<mode>--main.png`, `tab1--image--<mode>--head.png`, `rest--modes--<mode>--head.png` and `tab<k>--modes--<mode>--head.png`: the focus path.
- `unhover-60ms--image--<motion|reduced>--<mode>--<build>.png`: about 60 ms after the pointer leaves.
- `measurements.json`: every frame's record, the summaries, and the painted frames.
