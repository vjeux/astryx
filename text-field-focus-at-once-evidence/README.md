# A tapped text field shows its focus look at once: evidence

For the head be0851921f on main 1c8292c42f. Main's Storybook is built from 1c8292c42f, and the fix's from the head.

## Browsers (`TextFieldFocusTiming.interaction.browser.spec.ts`)

Reads that are not yet the focus look, of 25 (one at focus, then one per frame), after a tap:

| Field | Chromium main | Chromium fix | WebKit main | WebKit fix |
|---|---|---|---|---|
| TextInput | 9 | 0 | 9 | 0 |
| TextArea | 9 | 0 | 9 | 0 |
| NumberInput | 9 | 0 | 9 | 0 |
| Tokenizer (its sheet's field) | 9 | 0 | 7 | 0 |
| Typeahead | 9 | 0 | 9 | 0 |
| ChatComposer | 9 | 0 | 7 | 0 |
| RichTextEditor | 9 | 0 | 9 | 0 |

A mouse click and the Tab key, in a mouse context of the same viewport, still fade the look in on both builds. The page draws 3 to 9 frames inside the 125 ms fade, and each shows a look between rest and the focus look. ChatComposer after a click draws the fewest, 3, in WebKit on both builds.

## iPhone 17 Pro Simulator, iOS 26.2

A real tap on the field, a page sampler on each animation frame, and a 60 fps screen recording. Two counts per take:

- **Page:** frames whose computed look, read in `requestAnimationFrame`, is between rest and the focus look.
- **Screen:** recorded frames whose left border colour is between rest and the focus colour (`border-timeline.mjs`).

| Field | Page, main | Page, fix | Screen, main | Screen, fix |
|---|---|---|---|---|
| TextInput (2 takes each) | 1, 1 | 0, 0 | 0, 0 | 0, 0 |
| TextArea | 1 | 0 | 2 | 0 |
| NumberInput | 1 | 0 | 2 | 0 |
| Typeahead | 1 | 0 | 0 | 0 |
| ChatComposer | 2 | 0 | not counted (the page scrolls) | not counted |
| RichTextEditor (5 takes each) | 1, 7, 1, 1 | 0 in 5 | 0 in 5 | 0 in 5 |

On screen, main's TextArea and NumberInput each show one in-between border, held for two frames. Elsewhere main changes the border in one step, as the fix does everywhere.

Safari's main thread stalls 140 to 175 ms right after the focus while the keyboard comes up. That stall covers most of the 125 ms fade. The page computes in-between looks after it, and the screen shows few or none of them.

RichTextEditor takes alternate main and fix. One main take is left out of the page count. After its focus the page drew 2 frames in 930 ms, and the keyboard had not risen when sampling ended. Its screen count is included.

`textarea-tap-main-vs-fix.gif` (4x slower) and `textarea-tap-main-vs-fix.png` show TextArea's take of each build, main on the left. Each column starts at the frame where the field's look first changes. In the frame strip, main shows one in-between border on two frames; the fix goes from rest to the focus look in one frame. The grey disc is the simulator's touch marker. Its lead before the field's change varies from take to take, so it is not a latency measure.

`richtexteditor-tap-main-vs-fix.png` shows take 3 of each build. Each column starts one frame before that take's first focus change on screen. Both builds change the border in one step. Main shows the caret one frame before its border; the fix shows the border in the frame where focus lands. The page sampled 7 in-between looks in main's take 3 after its stall, but the screen recording shows none of them.

Files: `sim/*.json` (per-frame samples), `border-timeline.mjs` (the screen count), `field-repaints.mjs` (every change in the field's box), `focus-tap.src.mjs` (the simulator driver).
