# Tooltip's first show, with the layer mounted at first show: main and head

Main: de3e9ff260bfe10d0e6e1a9cf2b1eb9ea3e57d3b, `main` in file names. Head: #11916 at 2148c7b0915f602cb53d8e54fe675e6414635199, `pr` in file names. The head's parent merges this main into the branch.

## Answer

- Every show opens within one frame of main's time, and in the same place.
- The first painted frame of each show is pixel-identical on main and head, in 14 of 14 shows. The last frames are pixel-identical in 16 of 16.
- No show flashes: once the tooltip is visible, it stays visible for the rest of the watch.
- At rest, the head's pages are pixel-identical to main's in 8 of 8 conditions.
- The head mounts the layer at the first show. At rest it has no `role="tooltip"` element, while main has one per tooltip.
- No code loads at the first show. No show made any network request, from the gesture to the end of its watch, in 96 of 96 shows.
- So the run with the tooltip's chunk slowed by 400 ms was not done: there is no chunk to slow.

## First show and second show, in ms (median of 3; light / dark)

| Case | Measured from | Main | Head |
| --- | --- | --- | --- |
| First hover | the pointer enters | 232.4 / 232.5 | 232.5 / 232.4 |
| Second hover | the pointer enters | 232.8 / 232.6 | 232.7 / 232.6 |
| First keyboard focus (one Tab) | focus arrives | 22.9 / 22.0 | 21.8 / 26.4 |
| Tap on the inline term | the finger lifts | 30.5 / 31.1 | 30.6 / 31.1 |
| Second tap on the term | the finger lifts | 32.3 / 32.1 | 32.0 / 32.2 |
| Tap on Save | the finger lifts | no tooltip | no tooltip |
| Tap on "?" (`touchTrigger="tap"`) | the finger lifts | 28.4 / 29.0 | 28.6 / 29.1 |

- Each value is the first animation frame in which the tooltip is visible. It reaches full opacity 126 to 133 ms later, on both builds.
- Only first keyboard focus differs by more than 0.5 ms: 21.8 against 22.9 ms in light, and 26.4 against 22.0 ms in dark.
- In dark, the head's runs are 24.5, 26.4 and 38.3 ms, and main's are 20.2 to 22.4 ms. One 60 Hz frame is 16.7 ms.
- Hover shows after the Tooltip's 200 ms delay. Focus and touch show at once.

## Touch at 390, under the default `touchTrigger="auto"`

- A tap on the inline term opens the tooltip once the finger lifts. That term performs no action of its own.
- A tap on the Save button performs only the button's press. No tooltip opens, in 6 of 6 taps on each build.
- A long press on the term: the finger rests on it for 907 to 916 ms, then lifts.
- While the finger rests, no tooltip shows, in 6 of 6 presses on each build.
- After the lift, Chromium fires a click, so it counts the press as a tap. The tooltip opens 32.4 to 32.9 ms after the lift, on both builds.
- The Tooltip record leaves that call to the engine. Its FR5 opens the tooltip when a completed tap's finger lifts, and not on a press the browser does not count as a tap.
- The "?" button sets `touchTrigger="tap"`, so a tap on it opens its tooltip.
- At 390, the story's 100 px padding squeezes the Save button to "S." and cuts the "?" glyph. Both builds draw this the same way.

## Position and the first frame

| Trigger | Side | Gap | Tooltip center against the trigger's |
| --- | --- | --- | --- |
| "Hover me" button (1280) | below | 10 px | 34.92 px to the right |
| Inline term (390) | above | 4 px | centered (−0.01 px) |
| "?" button (390) | above | 8 px | 35.8 px to the left |

- The position is the same on both builds, in every case and mode.
- The button's tooltip is wider than the button, and it stays inside the viewport's left edge. So its center sits right of the button's.
- On the first visible animation frame, the tooltip's box is already at its resting place at 1280.
- On touch, it is at most 3.51 px from that place for the term, and 5.81 px for "?". The entrance scales it into place.
- These distances are the same on both builds.
- First painted frame: the first screencast frame in which the tooltip's resting box differs from the frame before the gesture.
- It comes 239 to 241 ms after the pointer enters, 28 to 33 ms after focus, and 32 to 37 ms after a tap's lift.
- In each case and mode, the same number of pixels changes on both builds.

## What the head changes at rest

- On main, each trigger's `aria-describedby` names the tooltip element itself, which is mounted from the start.
- On the head, it names a hidden copy of the tooltip text, with an id that ends in `-description`. No tooltip element is mounted.
- Mounted `role="tooltip"` elements at rest: 1 on main and 0 on the head in the Default story, and 3 and 0 in the touch story.
- At the first show, the head mounts that tooltip's element. It stays mounted for the second show.

## Builds

- Main: the production deploy of de3e9ff260, by its version.json (environment "production").
- Head: the preview deploy of 2148c7b091, by its version.json (environment "preview").
- Both version.json files and the pull request's head were the same at the start and the end of each run.

## Method

- Stories: `core-tooltip--default`, one "Hover me" button, and `core-tooltip--touch-triggers`.
- The touch story has a Save button, the inline term "hover-able term", and a "?" button with `touchTrigger="tap"`. The pull request does not change either story.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). 1280: 1280 × 800, mouse, scale 1. 390: 390 × 844, touch, scale 2.
- Mode: the Storybook global `colorMode` and the page's color scheme. Each show runs 3 times per build and mode, in a new browser context each time, alternating the build order.
- Hover: the pointer enters the button from 300 px to its right, in 3 steps. Focus: Tab presses until the button holds focus, which is one press.
- Tap: a touchscreen tap at the trigger's center. Long press: CDP touch events, a finger held 900 ms and then lifted.
- Second show: a first show, then the pointer leaves or a tap lands on empty page. After 900 ms, the measured show starts.
- The tooltip is read on every animation frame for 1.6 s: visible means `checkVisibility` holds and its opacity is above 0.01.
- Requests: every network request from the gesture to the end of the watch, from CDP.
- Rest: the viewport with no interaction, the pointer at the top-left corner at 1280, compared by pixels.
- All numbers are test measurements: hosted builds over this machine's network, one machine.
- Box load average (1 min), on 166 cores: about 34 during the rest run, and about 7 to 9 during the shows.
- Times on 2026-11-20: rest from 17:35:09Z to 17:35:58Z, shows from 17:59:59Z to 18:07:29Z.

## Files

- `rest--<story>--<device>--<mode>--<build>.png`: the 16 rest frames. `story` is `default` or `touch`, and `device` is `desktop` (1280) or `phone` (390).
- `first--<case>--<mode>--<build>.png`: the 28 first painted frames, from each case's first run.
- `end--<case>--<mode>--<build>.png`: the 32 frames at the end of each case's first watch.
- `measurements.json`: every show's timeline numbers, positions, mounts, requests and first painted frame, the rest results, and the frame identities.
