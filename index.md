# Overlay at d8bd6e0b: a hover overlay fades in as on main; Quick view takes a click once mostly opaque, the Hover link from frame 2

Main: the Production build of 0f3ed13d4f5c023efbeb592bec3bc9086a32de51, the head's merge base, `main` in file names. Head: #12628 at d8bd6e0b720ae91cfa571a55d1564289503ac842, `head` in file names.

## Answer (test)

- The head paints its hover fade from the same frame as main. The first painted frame comes at 11 to 27 ms on both builds, at 47% of the settled look.
- On that frame the clip has lifted and the opacity is 0.47. The fade then runs as on main.
- The head's action takes its first hit on the fifth frame, at 66.3 to 66.7 ms, at opacity 0.965. That is the frame on which pointer-events lift.
- On frames 2 to 4 the action shows at opacity 0.47 to 0.90, but pointer-events are still none, so it takes no hit.
- Main's action takes its first hit on the second frame, at opacity 0.47.
- The Hover link in Reveal Modes takes no hit on frame 1. From frame 2, at opacity 0.47, it does take a hit, while the layer's pointer-events are still none.
- That link sets its own pointer-events to auto, so it takes a hit as soon as the clip lifts.
- Focus reveals at once, and reduced motion is instant. At rest and on a settled hover, the frames are pixel-identical to main's.

## Hover, frame by frame (test; full motion, 6 runs per build and mode)

| Build | Mode | Frame | ms | Opacity | Clip | pointer-events | Hit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| main | light | 1 | 0.2–0.3 | 0 | none; visibility hidden | auto | miss |
| main | light | 2 | 16.4–16.8 | 0.4717–0.474 | none; visibility visible | auto | hit |
| main | light | 3 | 32.8–33.2 | 0.7588–0.7613 | none; visibility visible | auto | hit |
| main | light | 4 | 49.5–49.9 | 0.9016–0.9022 | none; visibility visible | auto | hit |
| main | light | 5 | 66.2–66.5 | 0.9646–0.9648 | none; visibility visible | auto | hit |
| main | light | 6 | 82.8–83.2 | 0.9897–0.9898 | none; visibility visible | auto | hit |
| main | light | 7 | 99.5–100 | 0.9982 | none; visibility visible | auto | hit |
| main | light | 8 | 116.1–116.5 | 0.9999 | none; visibility visible | auto | hit |
| main | light | 9 | 133–133.3 | 1 | none; visibility visible | auto | hit |
| main | dark | 1 | 0.2–0.3 | 0 | none; visibility hidden | auto | miss |
| main | dark | 2 | 16.4–16.8 | 0.4717–0.474 | none; visibility visible | auto | hit |
| main | dark | 3 | 32.8–33.2 | 0.76–0.7613 | none; visibility visible | auto | hit |
| main | dark | 4 | 49.5–49.9 | 0.9016–0.9022 | none; visibility visible | auto | hit |
| main | dark | 5 | 66.2–66.6 | 0.9646–0.9648 | none; visibility visible | auto | hit |
| main | dark | 6 | 82.9–83.2 | 0.9897–0.9899 | none; visibility visible | auto | hit |
| main | dark | 7 | 99.6–99.9 | 0.9982 | none; visibility visible | auto | hit |
| main | dark | 8 | 116.3–116.6 | 0.9999 | none; visibility visible | auto | hit |
| main | dark | 9 | 133–133.4 | 1 | none; visibility visible | auto | hit |
| head | light | 1 | 0.2–0.4 | 0 | inset(50%) | none | miss |
| head | light | 2 | 16.4–16.8 | 0.4717–0.4763 | none | none | miss |
| head | light | 3 | 32.9–33 | 0.76–0.7613 | none | none | miss |
| head | light | 4 | 49.5–49.7 | 0.9016–0.9027 | none | none | miss |
| head | light | 5 | 66.3–66.6 | 0.9646–0.9648 | none | auto | hit |
| head | light | 6 | 82.8–83.2 | 0.9897–0.9899 | none | auto | hit |
| head | light | 7 | 99.4–99.8 | 0.9982 | none | auto | hit |
| head | light | 8 | 116.3–116.5 | 0.9999 | none | auto | hit |
| head | light | 9 | 133–133.2 | 1 | none | auto | hit |
| head | dark | 1 | 0.1–0.4 | 0 | inset(50%) | none | miss |
| head | dark | 2 | 16.4–16.6 | 0.4717–0.474 | none | none | miss |
| head | dark | 3 | 32.8–33.1 | 0.7588–0.7613 | none | none | miss |
| head | dark | 4 | 49.5–49.8 | 0.9016–0.9022 | none | none | miss |
| head | dark | 5 | 66.3–66.7 | 0.9646–0.9648 | none | auto | hit |
| head | dark | 6 | 82.9–83.2 | 0.9898–0.9899 | none | auto | hit |
| head | dark | 7 | 99.6–99.9 | 0.9982 | none | auto | hit |
| head | dark | 8 | 116.2–116.5 | 0.9999 | none | auto | hit |
| head | dark | 9 | 132.9–133.3 | 1 | none | auto | hit |

- Frame 1 is the first animation frame after pointerenter. Each range covers the 6 runs.
- Main has no clip. Its clip column also shows its visibility, which is how main hides.
- "hit" means that elementFromPoint at the action's center returns the action or a child of it.

## Hover summary (test)

| Motion | Build | Mode | Runs | Clip lifts: ms, opacity | pointer-events lifts: ms, opacity | First hit, ms | Opacity on that frame | Fade-in starts, ms | Fully shown, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| full | main | light | 6 | no clip | 0.2–0.3, 0 | 16.4–16.8 | 0.4717–0.474 | 16.4–16.8 | 116.1–116.5 |
| full | main | dark | 6 | no clip | 0.2–0.3, 0 | 16.4–16.8 | 0.4717–0.474 | 16.4–16.8 | 116.3–116.6 |
| full | head | light | 6 | 16.4–16.8, 0.4717–0.4763 | 66.3–66.6, 0.9646–0.9648 | 66.3–66.6 | 0.9646–0.9648 | 16.4–16.8 | 116.3–116.5 |
| full | head | dark | 6 | 16.4–16.6, 0.4717–0.474 | 66.3–66.7, 0.9646–0.9648 | 66.3–66.7 | 0.9646–0.9648 | 16.4–16.6 | 116.2–116.5 |
| reduced | main | light | 6 | no clip | 0.1–0.3, 1 | 0.1–0.3 | 1 | 0.1–0.3 | 0.1–0.3 |
| reduced | main | dark | 6 | no clip | 0.1–0.3, 1 | 0.1–0.3 | 1 | 0.1–0.3 | 0.1–0.3 |
| reduced | head | light | 6 | 0.2–0.4, 1 | 0.2–0.4, 1 | 0.2–0.4 | 1 | 0.2–0.4 | 0.2–0.4 |
| reduced | head | dark | 6 | 0.1–0.3, 1 | 0.1–0.3, 1 | 0.1–0.3 | 1 | 0.1–0.3 | 0.1–0.3 |

- On a hover, the head sets the clip's transition delay to 0.015625 s, an eighth of the 0.125 s fade. It sets the pointer-events delay to 0.0625 s, half of the fade.
- Under focus-within and under reduced motion, every delay on the layer is 0 s. Under reduced motion every duration is 0 s too.

## What the hover paints (test; 6 runs per build and mode)

| Build | Mode | Painted frame | ms after pointerenter | Share of the settled look |
| --- | --- | --- | --- | --- |
| main | light | 1 | 12–27 | 47% |
| main | light | 2 | 24–40 | 76% |
| main | light | 3 | 40–56 | 90% |
| main | light | 4 | 57–74 | 96% |
| main | light | 5 | 74–90 | 99% |
| main | light | 6 | 91–107 | 100% |
| main | light | 7 | 107–123 | 100% |
| main | light | 8 | 126–142 | 100% |
| main | dark | 1 | 11–26 | 47% |
| main | dark | 2 | 23–38 | 76% |
| main | dark | 3 | 40–55 | 90% |
| main | dark | 4 | 57–71 | 96–97% |
| main | dark | 5 | 73–89 | 99% |
| main | dark | 6 | 90–104 | 100% |
| main | dark | 7 | 107–122 | 100% |
| main | dark | 8 | 124–139 | 100% |
| head | light | 1 | 12–27 | 47–48% |
| head | light | 2 | 26–39 | 76% |
| head | light | 3 | 42–58 | 90% |
| head | light | 4 | 59–74 | 96% |
| head | light | 5 | 75–91 | 99% |
| head | light | 6 | 92–107 | 100% |
| head | light | 7 | 109–124 | 100% |
| head | light | 8 | 128–143 | 100% |
| head | dark | 1 | 12–18 | 47% |
| head | dark | 2 | 25–31 | 76–77% |
| head | dark | 3 | 42–47 | 90% |
| head | dark | 4 | 59–64 | 96–97% |
| head | dark | 5 | 75–81 | 99% |
| head | dark | 6 | 92–97 | 100% |
| head | dark | 7 | 108–114 | 100% |
| head | dark | 8 | 126–131 | 100% |

- Each painted frame is a screencast frame. Its share is the mean pixel change from rest inside the overlay's box, over the settled hover's.

## The Hover link in Reveal Modes (test; head; 6 runs per mode)

| Mode | Runs | At rest: layer / link pointer-events | Frame 1: ms, opacity, clip, hit | Clip lifts: ms, opacity | Layer pointer-events lift: ms, opacity | First hit: ms, opacity |
| --- | --- | --- | --- | --- | --- | --- |
| light | 6 | none / auto | 0.1–0.3, 0, inset(50%), miss | 16.3–16.8, 0.4717–0.474 | 66.3–66.6, 0.9646–0.9648 | 16.3–16.8, 0.4717–0.474 |
| dark | 6 | none / auto | 0.1–0.3, 0, inset(50%), miss | 16.4–16.7, 0.4717–0.474 | 66.4–66.6, 0.9646–0.965 | 16.4–16.7, 0.4717–0.474 |

| Mode | Frame | ms | Opacity | Clip | Layer pointer-events | Link pointer-events | Hit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| light | 1 | 0.1–0.3 | 0 | inset(50%) | none | auto | miss |
| light | 2 | 16.3–16.8 | 0.4717–0.474 | none | none | auto | hit |
| light | 3 | 32.9–33.2 | 0.76–0.7613 | none | none | auto | hit |
| light | 4 | 49.5–49.8 | 0.9016–0.9027 | none | none | auto | hit |
| light | 5 | 66.3–66.6 | 0.9646–0.9648 | none | auto | auto | hit |
| light | 6 | 82.8–83.2 | 0.9898–0.9899 | none | auto | auto | hit |
| light | 7 | 99.5–99.9 | 0.9982 | none | auto | auto | hit |
| dark | 1 | 0.1–0.3 | 0 | inset(50%) | none | auto | miss |
| dark | 2 | 16.4–16.7 | 0.4717–0.474 | none | none | auto | hit |
| dark | 3 | 32.9–33.2 | 0.76–0.7613 | none | none | auto | hit |
| dark | 4 | 49.6–49.9 | 0.9016–0.9027 | none | none | auto | hit |
| dark | 5 | 66.4–66.6 | 0.9646–0.965 | none | auto | auto | hit |
| dark | 6 | 83–83.2 | 0.9898–0.9899 | none | auto | auto | hit |
| dark | 7 | 99.6–99.8 | 0.9982 | none | auto | auto | hit |

- The pointer enters the Hover link's image 24 px from its corner, away from the link. The link renders as a button element.
- At rest the layer has pointer-events none, and the link has pointer-events auto. The clip alone keeps it from a hit at rest.
- Reveal Modes is new in this pull request, so main has no such story.

## Focus reveals at once (test; head)

| Story | Mode | Stop | Before focus: opacity, clip | First frame after focus: ms, opacity, clip, hit | Fade starts, ms | Fully shown, ms |
| --- | --- | --- | --- | --- | --- | --- |
| Hover On Image | light | 1: "Quick view" | - | 8, 0, none, true | 24.8 | 124.6 |
| Reveal Modes | light | 1: "Hover action" | - | 9.6, 0, none, true | 26.4 | 126.2 |
| Reveal Modes | light | 2: "Focus action" | 0, inset(50%) | 11.1, 0, none, true | 27.7 | 127.5 |
| Reveal Modes | light | 3: "Hover strip action" | 0, inset(50%) | 14.9, 0, none, false | 32 | 131.4 |
| Reveal Modes | light | 4: "Always action" | 1, none | 0.9, 1, none, true | 0.9 | 0.9 |
| Reveal Modes | light | 5: "Focus link action" | 0, inset(50%) | 15.5, 0, none, true | 32.3 | 132.3 |
| Reveal Modes | light | 6: "Hover link action" | 0, inset(50%) | 0.9, 0, none, true | 17.7 | 117.5 |
| Hover On Image | dark | 1: "Quick view" | - | 6.4, 0, none, true | 23.2 | 123.1 |
| Reveal Modes | dark | 1: "Hover action" | - | 7.7, 0, none, true | 24.5 | 124.5 |
| Reveal Modes | dark | 2: "Focus action" | 0, inset(50%) | 12.8, 0, none, true | 29.3 | 129.3 |
| Reveal Modes | dark | 3: "Hover strip action" | 0, inset(50%) | 0.7, 0, none, false | 16.7 | 116.6 |
| Reveal Modes | dark | 4: "Always action" | 1, none | 15.1, 1, none, true | 15.1 | 15.1 |
| Reveal Modes | dark | 5: "Focus link action" | 0, inset(50%) | 2.8, 0, none, true | 19.7 | 119.5 |
| Reveal Modes | dark | 6: "Hover link action" | 0, inset(50%) | 3.5, 0, none, true | 20.2 | 120.2 |

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

## Reduced motion, and the hide (test)

| Motion | Build | Mode | Runs | Opacity above 0.001 until, ms | Opacity exactly 0 from, ms | Clip applies, ms | Visibility hidden, ms | Hit-test fails, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| full | main | light | 3 | 99.7–99.8 | 133.2–134.1 | - | 133.2–134.1 | 0.1–0.2 |
| full | main | dark | 3 | 99.6–99.7 | 133.1–133.2 | - | 133.1–133.2 | 0.3 |
| full | head | light | 3 | 99.6–99.8 | 133–133.3 | 133–133.3 | - | 0.2–0.7 |
| full | head | dark | 3 | 99.7 | 133.1–133.2 | 133.1–133.2 | - | 0.1–0.2 |
| reduced | main | light | 3 | - | 0.2 | - | 0.2 | 0.2 |
| reduced | main | dark | 3 | - | 0.2–0.4 | - | 0.2–0.4 | 0.2–0.4 |
| reduced | head | light | 3 | - | 0.2–0.3 | 0.2–0.3 | - | 0.2–0.3 |
| reduced | head | dark | 3 | - | 0.1–0.2 | 0.1–0.2 | - | 0.1–0.2 |

- Times count from pointerleave. With full motion, the head's clip applies on the first frame where opacity is 0. Main's visibility hides on that same frame.
- On both builds the hit-test fails from the first frame. Under reduced motion, both builds hide on the first frame.

## Frames: main against the head (test)

| Frame | Mode | main vs head |
| --- | --- | --- |
| Hover On Image at rest, 1280 | light | identical |
| Hover On Image, mouse hover settled, 1280 | light | identical |
| Hover On Image at rest, 1280 | dark | identical |
| Hover On Image, mouse hover settled, 1280 | dark | identical |

## Builds

- Main: the Production deploy of 0f3ed13d4f, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of d8bd6e0b72, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of the runs.

## Method

- Hover On Image is the same story on both builds. Reveal Modes is new in the head.
- 1280 × 800, scale 1, with a mouse, in light and dark.
- The layer is the overlay's scrim element. Its computed opacity, visibility, clip-path and pointer-events are read on every animation frame.
- The pointer enters the image 24 px from its corner, away from the action.
- Shown means opacity above 0.001, and fully shown means opacity of at least 0.999.
- Hover and the Hover link run 6 times per build, mode and motion setting, and the builds alternate. The hide runs 3 times. The stills come from the first run.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- On 2026-11-20, the main run took 23:50:59Z to 23:56:10Z, and the paint run 23:56:10Z to 23:57:27Z. The box load was about 28 to 30.

## Files

- `rest--image--<mode>--<build>.png` and `hover--image--<mode>--<build>.png`: Hover On Image at rest, and on a settled hover.
- `hover--image--reduced--<mode>--<build>.png`: a settled hover under reduced motion.
- `hoverin-first-frame--image--[reduced--]<mode>--<build>.png`: the first frame painted after the pointer enters.
- `tab1-leaves--image--<mode>--main.png`, `tab1--image--<mode>--head.png`, `rest--modes--<mode>--head.png` and `tab<k>--modes--<mode>--head.png`: the focus path.
- `unhover-60ms--image--<motion|reduced>--<mode>--<build>.png`: about 60 ms after the pointer leaves.
- `measurements.json`: every frame's record, the Hover link's frames, the painted frames, the computed transitions, and the summaries.
