# Tooltip re-check: 3a71be59 against 2148c7b0

Pull request #11916 at 3a71be59 changes only how a trigger's description is wired. These stills check that nothing visual moved since 2148c7b0.

## Result (test)

- Nothing visual moved. In all 11 cases, in light and dark, each frame is pixel-identical between the two builds.
- The frames are rest, the first painted frame of the show, resting, and closed. That is 172 stills, 86 per build.
- On both builds the tooltip opens within one frame of the same time. It shows in the same place, and no frame flashes.
- The accessible description is the same text on both builds, in every case and at every stage.
- What `aria-describedby` names changes, as intended:
  - On 2148c7b0 it names a hidden copy of the text at every stage.
  - On 3a71be59 it names a hidden copy until the tooltip first mounts. From then on it names the tooltip's own text, and no hidden copy is left.
- A tap on the Button at 390 shows no tooltip on either build. Its description stays the hidden copy.

## Builds

- 2148c7b0915f602cb53d8e54fe675e6414635199: a preview build of the pull request's earlier head.
- 3a71be59485dc79062c5de1c74a475e03dc8fc72: a preview build of the pull request's head.
- Each build's `version.json` named its commit at the start and at the end of the run. The pull request's head was 3a71be59 at both times.
- Chromium 149.0.7827.55. The run took 20:03:26Z to 20:12:33Z, at a box load of 21 to 38.

## Cases

| Case | Story | Size and input | Gesture |
| --- | --- | --- | --- |
| button-hover-first | Button "Hover me" in a Tooltip | 1280, mouse | the pointer enters |
| button-hover-second | the same | 1280, mouse | a second hover |
| checkbox-hover-first | disabled CheckboxInput "Accept terms" with a reason | 1280, mouse | the pointer enters |
| checkbox-hover-second | the same | 1280, mouse | a second hover |
| button-hover-first-390 | Button | 390, mouse | the pointer enters |
| button-hover-second-390 | Button | 390, mouse | a second hover |
| checkbox-hover-first-390 | CheckboxInput | 390, mouse | the pointer enters |
| checkbox-hover-second-390 | CheckboxInput | 390, mouse | a second hover |
| button-tap | Button | 390, touch | a tap |
| checkbox-tap-first | CheckboxInput | 390, touch | a tap |
| checkbox-tap-second | CheckboxInput | 390, touch | a second tap |

A second show comes after a first show and its close.

## Frames (test)

| Case | Size | Mode | Rest | First | Resting | Closed | First visible, ms (2148c7b0 / 3a71be59) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| button-hover-first | 1280, mouse | light | same | same | same | same | 232.9 / 232.6 |
| button-hover-first | 1280, mouse | dark | same | same | same | same | 232.6 / 232.8 |
| button-hover-second | 1280, mouse | light | same | same | same | same | 232.8 / 232.6 |
| button-hover-second | 1280, mouse | dark | same | same | same | same | 232.6 / 232.6 |
| checkbox-hover-first | 1280, mouse | light | same | same | same | same | 183.1 / 183.1 |
| checkbox-hover-first | 1280, mouse | dark | same | same | same | same | 191.3 / 183.2 |
| checkbox-hover-second | 1280, mouse | light | same | same | same | same | 183.1 / 182.9 |
| checkbox-hover-second | 1280, mouse | dark | same | same | same | same | 182.9 / 183.1 |
| button-hover-first-390 | 390, mouse | light | same | same | same | same | 232.6 / 232.8 |
| button-hover-first-390 | 390, mouse | dark | same | same | same | same | 232.4 / 232.6 |
| button-hover-second-390 | 390, mouse | light | same | same | same | same | 232.6 / 232.8 |
| button-hover-second-390 | 390, mouse | dark | same | same | same | same | 232.8 / 232.8 |
| checkbox-hover-first-390 | 390, mouse | light | same | same | same | same | 199.7 / 207.9 |
| checkbox-hover-first-390 | 390, mouse | dark | same | same | same | same | 199.8 / 199.9 |
| checkbox-hover-second-390 | 390, mouse | light | same | same | same | same | 199.7 / 199.8 |
| checkbox-hover-second-390 | 390, mouse | dark | same | same | same | same | 199.8 / 199.7 |
| button-tap | 390, touch | light | same | none | same | same | no tooltip / no tooltip |
| button-tap | 390, touch | dark | same | none | same | same | no tooltip / no tooltip |
| checkbox-tap-first | 390, touch | light | same | same | same | same | 30.7 / 30.7 |
| checkbox-tap-first | 390, touch | dark | same | same | same | same | 30.8 / 38.6 |
| checkbox-tap-second | 390, touch | light | same | same | same | same | 32.3 / 32.3 |
| checkbox-tap-second | 390, touch | dark | same | same | same | same | 32.3 / 32 |

- "same" means that the decoded pixels are equal. "none" means that no tooltip opens, so the case has no first frame.
- First visible is the median of 2 runs per build. It is the time from the gesture to the first animation frame that shows the tooltip.
- Three medians differ by about 8 ms. In each of them, one run saw the tooltip one frame later: once on 2148c7b0 and twice on 3a71be59.
- Across both builds and both runs, each case's times stay within 16.8 ms, which is one frame.

## Description wiring (test; light, and dark is the same in every case)

| Case | Size | Stage | 2148c7b0 names | 3a71be59 names | Accessible description (both) |
| --- | --- | --- | --- | --- | --- |
| button-hover-first | 1280, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-first | 1280, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-first | 1280, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second | 1280, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second | 1280, mouse | closedAfterFirst | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second | 1280, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second | 1280, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| checkbox-hover-first | 1280, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-first | 1280, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-first | 1280, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second | 1280, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second | 1280, mouse | closedAfterFirst | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second | 1280, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second | 1280, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| button-hover-first-390 | 390, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-first-390 | 390, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-first-390 | 390, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second-390 | 390, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second-390 | 390, mouse | closedAfterFirst | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second-390 | 390, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| button-hover-second-390 | 390, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "This is a helpful tooltip" |
| checkbox-hover-first-390 | 390, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-first-390 | 390, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-first-390 | 390, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second-390 | 390, mouse | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second-390 | 390, mouse | closedAfterFirst | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second-390 | 390, mouse | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-hover-second-390 | 390, mouse | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| button-tap | 390, touch | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| button-tap | 390, touch | shown | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| button-tap | 390, touch | closed | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "This is a helpful tooltip" |
| checkbox-tap-first | 390, touch | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-tap-first | 390, touch | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-tap-first | 390, touch | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-tap-second | 390, touch | rest | a hidden copy (1 hidden, id x1) | a hidden copy (1 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-tap-second | 390, touch | closedAfterFirst | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-tap-second | 390, touch | shown | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |
| checkbox-tap-second | 390, touch | closed | a hidden copy (1 hidden, id x1) | the tooltip's text (0 hidden, id x1) | "Terms are managed by your administrator" |

- "a hidden copy" is a hidden element with the description's text. "the tooltip's text" is the element in the mounted tooltip that holds the text.
- In parentheses: how many hidden elements in the page have the same text, and how many elements carry the id.
- The stages: rest is before any show. closedAfterFirst is after a first show closes. shown is while the tooltip shows. closed is after the close.
- The accessible description comes from Chromium's accessibility tree.

## Method

- Stories: `core-tooltip--default`, a Button wrapped in Tooltip, and `core-checkboxinput--disabled-with-message`.
- The CheckboxInput is disabled, and its reason is "Terms are managed by your administrator".
- Sizes: 1280 × 800 with a mouse, 390 × 844 at scale 2 with a mouse, and 390 × 844 at scale 2 with touch.
- A hover moves the pointer in from 300 px to the right, in 3 steps. A tap is a touch tap at the target's center.
- A close moves the pointer to the page corner, or taps on empty page. The closed frame is 900 ms later.
- The rest frame is before the gesture. The resting frame is 1.6 s after the gesture.
- The first frame is the first screencast frame whose pixels change inside the tooltip's resting box, inset by 3 px.
- Each case runs twice on each build, and the builds alternate. The stills come from the first run.

## Files

- `measurements.json`: for each case, the frame identity, the times, the position, and each stage's `aria-describedby` target with its accessible description. It also holds every run's record.
- Stills: `<frame>--<case>--<mode>--<build>.png`, where the frame is rest, first, resting or closed.
