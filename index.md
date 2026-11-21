# Overlay at 37871253: on hover, the first paint and the first click land on main's first visible frame, at both fades

Main: the Production build of 0f3ed13d4f5c023efbeb592bec3bc9086a32de51, the head's merge base, `main` in file names. Head: #12628 at 378712531907f55dcc0208bc26aa3a0e70791e9b, `head` in file names.

## Answer (test)

- Hover On Image, at the Storybook theme's 125 ms fade: the head first shows the overlay on main's frame, at the same opacity.
- That frame comes 16.4–17 ms after pointerenter, at opacity 0.4717–0.474, on both builds.
- At the unthemed 175 ms fade, the same holds: 16.2–16.7 ms after pointerenter, at opacity 0.3553–0.359, on both builds.
- On both builds and at both fades, the first click lands on that first visible frame, in every run.
- No frame takes a click at opacity 0.001 or less, on either build, at either fade.
- The painted frames agree. The first painted frame shows 0.473 of the settled look at 125 ms, and 0.356–0.357 at 175 ms, on both builds.
- Reveal Modes, Hover link (the head only): the first frame after pointerenter is clipped, at opacity 0, and takes no click.
- On the next frame, the clip lifts, and the first click lands, at opacity 0.4717–0.4763 at 125 ms and 0.3553–0.359 at 175 ms.
- The settled hover frames are pixel-identical between the builds, at both fades, in light and dark.

## The two fades

The fade is the overlay layer's computed transition at rest, read in each hover run.

### Storybook theme (125 ms)

| Build | Transition property | Duration | Delay |
| --- | --- | --- | --- |
| main | opacity, visibility, transform | 0.125s | 0s |
| head | opacity, visibility, transform, clip-path | 0.125s, 0.125s, 0.125s, 0s | 0s, 0s, 0s, 0.125s |

### No theme (175 ms)

| Build | Transition property | Duration | Delay |
| --- | --- | --- | --- |
| main | opacity, visibility, transform | 0.175s | 0s |
| head | opacity, visibility, transform, clip-path | 0.175s, 0.175s, 0.175s, 0s | 0s, 0s, 0s, 0.175s |

- The 175 ms fade comes from the URL global `astryxTheme:none`, beside `colorMode`. With it, the story renders on the base token defaults, with no theme.
- On the head, the clip path has its own delay. At rest, it is the hide delay: the clip applies when the fade ends.
- On a hover, the clip lifts on the first frame after the fade starts, as the frames below show.

## Hover On Image, every frame from pointerenter (test)

"First visible frame" is the first frame after pointerenter with opacity above 0.001. A hit is an `elementFromPoint` hit test at the action's center.

### Storybook theme (125 ms)

| Mode | Build | Runs | First frame after pointerenter, ms | Opacity there | First visible frame, ms | Opacity there | First hit, ms | Opacity there | First hit on the first visible frame | Hits at opacity 0.001 or less | Opacity 0.999 or more, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | main | 6 | 0.1–0.3 | 0 | 16.4–16.8 | 0.4717–0.474 | 16.4–16.8 | 0.4717–0.474 | 6 of 6 | 0 | 116.3–116.6 |
| light | head | 6 | 0.1–0.3 | 0 | 16.5–17 | 0.4717–0.474 | 16.5–17 | 0.4717–0.474 | 6 of 6 | 0 | 116.2–116.5 |
| dark | main | 6 | 0.1–0.3 | 0 | 16.4–16.8 | 0.4717–0.474 | 16.4–16.8 | 0.4717–0.474 | 6 of 6 | 0 | 116.4–116.6 |
| dark | head | 6 | 0.2–0.3 | 0 | 16.4–16.7 | 0.4717–0.474 | 16.4–16.7 | 0.4717–0.474 | 6 of 6 | 0 | 116.2–116.4 |

### No theme (175 ms)

| Mode | Build | Runs | First frame after pointerenter, ms | Opacity there | First visible frame, ms | Opacity there | First hit, ms | Opacity there | First hit on the first visible frame | Hits at opacity 0.001 or less | Opacity 0.999 or more, ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | main | 6 | 0.2–0.3 | 0 | 16.5–16.6 | 0.3571 | 16.5–16.6 | 0.3571 | 6 of 6 | 0 | 149.6–149.8 |
| light | head | 6 | 0.2–0.4 | 0 | 16.6–16.7 | 0.3553–0.3571 | 16.6–16.7 | 0.3553–0.3571 | 6 of 6 | 0 | 149.6–149.9 |
| dark | main | 6 | 0.1–0.3 | 0 | 16.3–16.6 | 0.3553–0.3571 | 16.3–16.6 | 0.3553–0.3571 | 6 of 6 | 0 | 149.7–149.8 |
| dark | head | 6 | 0.2–0.3 | 0 | 16.2–16.6 | 0.3553–0.359 | 16.2–16.6 | 0.3553–0.359 | 6 of 6 | 0 | 149.5–149.9 |

- On main, the first frame after pointerenter is still hidden, at opacity 0. On the head, it is clipped, at opacity 0. Neither takes a click.

## The painted frames (test)

"Shown" is how much of the settled hover look a painted frame shows inside the overlay's box. It is 0 for the rest look, and 1 for the settled look.

### Storybook theme (125 ms)

| Mode | Build | Runs | First painted frame, ms after pointerenter | Shown there | Second painted frame, ms | Shown there |
| --- | --- | --- | --- | --- | --- | --- |
| light | main | 3 | 16–30 | 0.473 | 28–40 | 0.76 |
| light | head | 3 | 20–26 | 0.473 | 32–40 | 0.76 |
| dark | main | 3 | 19–25 | 0.473 | 30–38 | 0.761–0.766 |
| dark | head | 3 | 12–21 | 0.473 | 25–33 | 0.761 |

### No theme (175 ms)

| Mode | Build | Runs | First painted frame, ms after pointerenter | Shown there | Second painted frame, ms | Shown there |
| --- | --- | --- | --- | --- | --- | --- |
| light | main | 3 | 10–25 | 0.357 | 24–38 | 0.619 |
| light | head | 3 | 10–16 | 0.357 | 24–28 | 0.619 |
| dark | main | 3 | 11–18 | 0.356 | 25–30 | 0.618 |
| dark | head | 3 | 11–26 | 0.356 | 24–38 | 0.618 |

## Reveal Modes, Hover link (test)

Reveal Modes is new in this pull request, so main's Storybook does not have it.

### Storybook theme (125 ms)

| Mode | Build | Runs | Frame 1, ms | Opacity | Clip path | Hit | Clip lifts, ms | Opacity there | First hit, ms | Opacity there | First hit when the clip lifts |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | main | - | not in this build's Storybook | | | | | | | | |
| light | head | 6 | 0.1–0.3 | 0 | inset(50%) | none | 16.2–16.6 | 0.4717–0.4763 | 16.2–16.6 | 0.4717–0.4763 | 6 of 6 |
| dark | main | - | not in this build's Storybook | | | | | | | | |
| dark | head | 6 | 0.1–0.3 | 0 | inset(50%) | none | 16.4–16.6 | 0.4717–0.474 | 16.4–16.6 | 0.4717–0.474 | 6 of 6 |

### No theme (175 ms)

| Mode | Build | Runs | Frame 1, ms | Opacity | Clip path | Hit | Clip lifts, ms | Opacity there | First hit, ms | Opacity there | First hit when the clip lifts |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | main | - | not in this build's Storybook | | | | | | | | |
| light | head | 6 | 0.1–0.4 | 0 | inset(50%) | none | 6.4–16.7 | 0.3553–0.3571 | 6.4–16.7 | 0.3553–0.3571 | 6 of 6 |
| dark | main | - | not in this build's Storybook | | | | | | | | |
| dark | head | 6 | 0.1–0.3 | 0 | inset(50%) | none | 16.4–16.7 | 0.3553–0.359 | 16.4–16.7 | 0.3553–0.359 | 6 of 6 |

- In one run at 175 ms, the second frame came 6.4 ms after pointerenter. The clip lifted on that frame, at opacity 0.3567, and it took the first click.

## Stills: main against the head (test)

| Still | Fade | Mode | main vs head |
| --- | --- | --- | --- |
| First painted frame after pointerenter | Storybook theme | light | identical |
| Settled hover | Storybook theme | light | identical |
| First painted frame after pointerenter | Storybook theme | dark | identical |
| Settled hover | Storybook theme | dark | identical |
| First painted frame after pointerenter | no theme (astryxTheme:none) | light | differs (4960 px, at most 1 of 255 in a channel, x 40–439, y 90–225) |
| Settled hover | no theme (astryxTheme:none) | light | identical |
| First painted frame after pointerenter | no theme (astryxTheme:none) | dark | identical |
| Settled hover | no theme (astryxTheme:none) | dark | identical |

- The one first-frame difference is at most 1 of 255 in a channel, inside the overlay's box. Run 0's first visible frames differ in opacity in both modes: in light 0.3571 on main and 0.3553 on the head, in dark the reverse. Only the light stills differ.

## Builds

- Main: the Production deploy of 0f3ed13d, the head's merge base, by its version.json (environment "production").
- Head: the preview deploy of 37871253, by its version.json (environment "preview").
- The version.json files and the pull request's head were the same at the start and the end of the runs.

## Method

- 1280 × 800, scale 1, light and dark, no reduced motion. Mouse moves are real input events from Playwright, through the DevTools protocol.
- The mouse rests at the page's corner, then moves once onto the overlay. Every animation frame for 600 ms from pointerenter records the layer's computed opacity, visibility, clip path and pointer events.
- Each frame also runs a hit test at the action's center.
- Fully shown means opacity of at least 0.999.
- Hover On Image: 6 runs per build and mode, and the builds alternate. Hover link: 6 runs per mode. Painted frames: 3 runs per build and mode.
- The painted frames come from the DevTools screencast, after pointerenter.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). All numbers are test measurements: hosted builds, on one machine.
- On 2026-11-21 the runs took 02:21:48Z to 02:29:59Z. The box load was 8.92 at the start and 10.42 at the end of the hover runs.

## Files

- `hover--image--[unthemed--]<mode>--<build>.png`: the settled hover. `unthemed` marks the 175 ms fade.
- `hoverin-first-frame--image--[unthemed--]<mode>--<build>.png`: the first screencast frame after pointerenter, from run 0.
- `measurements.json`: every frame of every run (opacity, visibility, clip path, pointer events and the hit test), the summaries, the painted frames and the fade.
