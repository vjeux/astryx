# AppShell at e5ae4e78: hiddenRegions against the head that was passed, 8e71aef2

Head: #13382 at e5ae4e781aac2253be5ac78fea3320a7eefef24f, the port of #10312 onto main 98c4c6db. Passed: 8e71aef2c6eb8264d4187bde07630469726a4c75, the #10312 head that was passed. Desktop Chromium. All numbers are test measurements.

## Answer (test)

- No difference was found between the head and the passed head, in 8 cases, hiding and restoring.
- In every case, the toggle starts the same animations on both heads, with every keyframe equal. Each runs for 300 ms.
- A hidden nav slides out by its edge through a `clip-path` inset, and the content moves into its place through a `translate`, in one motion.
- Every seeked frame, at 0, 25, 50, 75 and 100% of the motion, is pixel-identical between the heads: 80 of 80.
- In the live frames, the content's edge stays on the nav's visible edge, on both heads.
- The gap is 0 px in the default variant, within 0.01 px. In the section variant it is 1 px at rest, the nav's divider, and 0 px while the nav slides.
- So in the section variant, the clip cuts the divider first. That is the same on both heads.
- At rest, before, hidden and restored, the frames are pixel-identical between the heads. Restored equals before on both heads.
- So this take finds no difference from what was passed.

## What the pull request is

- It ports #10312, whose head 8e71aef2 was passed, onto main 98c4c6db. Main moved 743 commits between the two bases.
- 17 of its 21 files carry the same change as at 8e71aef2. AppShell.tsx and three specs differ, as main moved under them.

## Cases

- Focus Mode (`core-appshell--focus-mode`, stock): hides and restores the top nav and the side nav together.
- Hidden Side Nav Section (`core-appshell--hidden-side-nav-section`, stock): the section variant, side nav only.
- The stock stories have no toggle for one nav alone. So a scratch story, `ZZ/AppShellHidden`, adds one per variant and target, in neither tree.
- It uses each tree's own AppShell story helpers, so its top nav, side nav and content are the stock ones.
- Both builds' copies differ only by an import and a style that the head's helpers declare and the scratch cases do not use.
- Its cases: the default variant and the section variant, each hiding the top nav, the side nav, or both.

## The motion, frame by frame (test)

| Case | Direction | Animations, passed head | Same on the head | Live frames in 400 ms, passed / head | Gap between the nav's visible edge and the content's edge over the live frames, px, passed / head |
| --- | --- | --- | --- | --- | --- |
| Focus Mode (stock): both | hide | clip-path ×2, translate ×2; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | -0.01 to 0 / -0.01 to 0 |
| Focus Mode (stock): both | restore | clip-path ×2, translate ×2; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 24 | 0 / 0 |
| Hidden Side Nav Section (stock): side nav | hide | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | -0.01 to 1 / -0.01 to 1 |
| Hidden Side Nav Section (stock): side nav | restore | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 24 | 0 to 1 / 0 to 1 |
| Default: top nav | hide | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | -0.01 to 0 / -0.01 to 0 |
| Default: top nav | restore | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | 0 / 0 |
| Default: side nav | hide | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | 0 / -0.01 to 0 |
| Default: side nav | restore | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 24 / 24 | 0 / 0 |
| Default: both | hide | clip-path ×2, translate ×2; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | -0.01 to 0 / -0.01 to 0 |
| Default: both | restore | clip-path ×2, translate ×2; 300 ms, 19 keyframes each | yes, every keyframe | 24 / 24 | 0 / 0 |
| Section: top nav | hide | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | 0 to 1 / 0 to 1 |
| Section: top nav | restore | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | 1 / 0 to 1 |
| Section: side nav | hide | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | -0.01 to 1 / -0.01 to 1 |
| Section: side nav | restore | clip-path ×1, translate ×1; 300 ms, 19 keyframes each | yes, every keyframe | 24 / 25 | 0 to 1 / 0 to 1 |
| Section: both | hide | clip-path ×2, translate ×2; 300 ms, 19 keyframes each | yes, every keyframe | 25 / 25 | -0.01 to 1 / -0.01 to 1 |
| Section: both | restore | clip-path ×2, translate ×2; 300 ms, 19 keyframes each | yes, every keyframe | 24 / 24 | 0 to 1 / 0 to 1 |

- Live frames: the toggle is clicked in the page, and every animation frame for 700 ms reads the edges. The counts cover the first 400 ms.
- Live frames land at the display's own times, so the two heads' samples can fall a fraction of a frame apart. The seeked frames compare the same instants.
- So a first frame can catch a nav just starting its slide on one head, and still unshown on the other. Section: top nav, restore, is such a case.
- Each animation's keyframes, start and end values included, are in measurements.json.
- A nav's visible edge is its box, cut by every ancestor's `clip-path` inset and overflow box. The content's edge includes its translate.

## Seeked mid-slide frames (test)

| Case | Direction | At | Passed head | Head | Frame, px that differ |
| --- | --- | --- | --- | --- | --- |
| Focus Mode (stock): both | hide | 0% | top nav bottom 48; side nav right 260; content 260, 48 | top nav bottom 48; side nav right 260; content 260, 48 | 0 |
| Focus Mode (stock): both | hide | 25% | top nav bottom 12.93; side nav right 70.05; content 70.05, 12.93 | top nav bottom 12.93; side nav right 70.05; content 70.05, 12.93 | 0 |
| Focus Mode (stock): both | hide | 50% | top nav bottom 2.22; side nav right 12.02; content 12.02, 2.22 | top nav bottom 2.22; side nav right 12.02; content 12.02, 2.22 | 0 |
| Focus Mode (stock): both | hide | 75% | top nav bottom 0.19; side nav right 1.03; content 1.03, 0.19 | top nav bottom 0.19; side nav right 1.03; content 1.03, 0.19 | 0 |
| Focus Mode (stock): both | hide | 100% | top nav bottom 48; side nav right 260; content 0, 0 | top nav bottom 48; side nav right 260; content 0, 0 | 0 |
| Focus Mode (stock): both | restore | 0% | top nav bottom hidden; side nav right hidden; content 0, 0 | top nav bottom hidden; side nav right hidden; content 0, 0 | 0 |
| Focus Mode (stock): both | restore | 25% | top nav bottom 35.07; side nav right 189.95; content 189.95, 35.07 | top nav bottom 35.07; side nav right 189.95; content 189.95, 35.07 | 0 |
| Focus Mode (stock): both | restore | 50% | top nav bottom 45.78; side nav right 247.98; content 247.98, 45.78 | top nav bottom 45.78; side nav right 247.98; content 247.98, 45.78 | 0 |
| Focus Mode (stock): both | restore | 75% | top nav bottom 47.81; side nav right 258.97; content 258.97, 47.81 | top nav bottom 47.81; side nav right 258.97; content 258.97, 47.81 | 0 |
| Focus Mode (stock): both | restore | 100% | top nav bottom 48; side nav right 260; content 260, 48 | top nav bottom 48; side nav right 260; content 260, 48 | 0 |
| Hidden Side Nav Section (stock): side nav | hide | 0% | side nav right 260; content 261, 49 | side nav right 260; content 261, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | hide | 25% | side nav right 70.32; content 70.32, 49 | side nav right 70.32; content 70.32, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | hide | 50% | side nav right 12.06; content 12.06, 49 | side nav right 12.06; content 12.06, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | hide | 75% | side nav right 1.03; content 1.03, 49 | side nav right 1.03; content 1.03, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | hide | 100% | side nav right 260; content 0, 49 | side nav right 260; content 0, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | restore | 0% | side nav right hidden; content 0, 49 | side nav right hidden; content 0, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | restore | 25% | side nav right 190.68; content 190.68, 49 | side nav right 190.68; content 190.68, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | restore | 50% | side nav right 248.94; content 248.94, 49 | side nav right 248.94; content 248.94, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | restore | 75% | side nav right 259.97; content 259.97, 49 | side nav right 259.97; content 259.97, 49 | 0 |
| Hidden Side Nav Section (stock): side nav | restore | 100% | side nav right 260; content 261, 49 | side nav right 260; content 261, 49 | 0 |
| Default: top nav | hide | 0% | top nav bottom 64; content 276, 64 | top nav bottom 64; content 276, 64 | 0 |
| Default: top nav | hide | 25% | top nav bottom 28.93; content 276, 28.93 | top nav bottom 28.93; content 276, 28.93 | 0 |
| Default: top nav | hide | 50% | top nav bottom 18.22; content 276, 18.22 | top nav bottom 18.22; content 276, 18.22 | 0 |
| Default: top nav | hide | 75% | top nav bottom 16.19; content 276, 16.19 | top nav bottom 16.19; content 276, 16.19 | 0 |
| Default: top nav | hide | 100% | top nav bottom 64; content 276, 16 | top nav bottom 64; content 276, 16 | 0 |
| Default: top nav | restore | 0% | top nav bottom hidden; content 276, 16 | top nav bottom hidden; content 276, 16 | 0 |
| Default: top nav | restore | 25% | top nav bottom 51.07; content 276, 51.07 | top nav bottom 51.07; content 276, 51.07 | 0 |
| Default: top nav | restore | 50% | top nav bottom 61.78; content 276, 61.78 | top nav bottom 61.78; content 276, 61.78 | 0 |
| Default: top nav | restore | 75% | top nav bottom 63.81; content 276, 63.81 | top nav bottom 63.81; content 276, 63.81 | 0 |
| Default: top nav | restore | 100% | top nav bottom 64; content 276, 64 | top nav bottom 64; content 276, 64 | 0 |
| Default: side nav | hide | 0% | side nav right 276; content 276, 64 | side nav right 276; content 276, 64 | 0 |
| Default: side nav | hide | 25% | side nav right 86.05; content 86.05, 64 | side nav right 86.05; content 86.05, 64 | 0 |
| Default: side nav | hide | 50% | side nav right 28.02; content 28.02, 64 | side nav right 28.02; content 28.02, 64 | 0 |
| Default: side nav | hide | 75% | side nav right 17.03; content 17.03, 64 | side nav right 17.03; content 17.03, 64 | 0 |
| Default: side nav | hide | 100% | side nav right 276; content 16, 64 | side nav right 276; content 16, 64 | 0 |
| Default: side nav | restore | 0% | side nav right hidden; content 16, 64 | side nav right hidden; content 16, 64 | 0 |
| Default: side nav | restore | 25% | side nav right 205.95; content 205.95, 64 | side nav right 205.95; content 205.95, 64 | 0 |
| Default: side nav | restore | 50% | side nav right 263.98; content 263.98, 64 | side nav right 263.98; content 263.98, 64 | 0 |
| Default: side nav | restore | 75% | side nav right 274.97; content 274.97, 64 | side nav right 274.97; content 274.97, 64 | 0 |
| Default: side nav | restore | 100% | side nav right 276; content 276, 64 | side nav right 276; content 276, 64 | 0 |
| Default: both | hide | 0% | top nav bottom 64; side nav right 276; content 276, 64 | top nav bottom 64; side nav right 276; content 276, 64 | 0 |
| Default: both | hide | 25% | top nav bottom 28.93; side nav right 86.05; content 86.05, 28.93 | top nav bottom 28.93; side nav right 86.05; content 86.05, 28.93 | 0 |
| Default: both | hide | 50% | top nav bottom 18.22; side nav right 28.02; content 28.02, 18.22 | top nav bottom 18.22; side nav right 28.02; content 28.02, 18.22 | 0 |
| Default: both | hide | 75% | top nav bottom 16.19; side nav right 17.03; content 17.03, 16.19 | top nav bottom 16.19; side nav right 17.03; content 17.03, 16.19 | 0 |
| Default: both | hide | 100% | top nav bottom 64; side nav right 276; content 16, 16 | top nav bottom 64; side nav right 276; content 16, 16 | 0 |
| Default: both | restore | 0% | top nav bottom hidden; side nav right hidden; content 16, 16 | top nav bottom hidden; side nav right hidden; content 16, 16 | 0 |
| Default: both | restore | 25% | top nav bottom 51.07; side nav right 205.95; content 205.95, 51.07 | top nav bottom 51.07; side nav right 205.95; content 205.95, 51.07 | 0 |
| Default: both | restore | 50% | top nav bottom 61.78; side nav right 263.98; content 263.98, 61.78 | top nav bottom 61.78; side nav right 263.98; content 263.98, 61.78 | 0 |
| Default: both | restore | 75% | top nav bottom 63.81; side nav right 274.97; content 274.97, 63.81 | top nav bottom 63.81; side nav right 274.97; content 274.97, 63.81 | 0 |
| Default: both | restore | 100% | top nav bottom 64; side nav right 276; content 276, 64 | top nav bottom 64; side nav right 276; content 276, 64 | 0 |
| Section: top nav | hide | 0% | top nav bottom 64; content 277, 65 | top nav bottom 64; content 277, 65 | 0 |
| Section: top nav | hide | 25% | top nav bottom 29.2; content 277, 29.2 | top nav bottom 29.2; content 277, 29.2 | 0 |
| Section: top nav | hide | 50% | top nav bottom 18.26; content 277, 18.26 | top nav bottom 18.26; content 277, 18.26 | 0 |
| Section: top nav | hide | 75% | top nav bottom 16.19; content 277, 16.19 | top nav bottom 16.19; content 277, 16.19 | 0 |
| Section: top nav | hide | 100% | top nav bottom 64; content 277, 16 | top nav bottom 64; content 277, 16 | 0 |
| Section: top nav | restore | 0% | top nav bottom hidden; content 277, 16 | top nav bottom hidden; content 277, 16 | 0 |
| Section: top nav | restore | 25% | top nav bottom 50.8; content 277, 51.8 | top nav bottom 50.8; content 277, 51.8 | 0 |
| Section: top nav | restore | 50% | top nav bottom 61.74; content 277, 62.74 | top nav bottom 61.74; content 277, 62.74 | 0 |
| Section: top nav | restore | 75% | top nav bottom 63.81; content 277, 64.81 | top nav bottom 63.81; content 277, 64.81 | 0 |
| Section: top nav | restore | 100% | top nav bottom 64; content 277, 65 | top nav bottom 64; content 277, 65 | 0 |
| Section: side nav | hide | 0% | side nav right 276; content 277, 65 | side nav right 276; content 277, 65 | 0 |
| Section: side nav | hide | 25% | side nav right 86.32; content 86.32, 65 | side nav right 86.32; content 86.32, 65 | 0 |
| Section: side nav | hide | 50% | side nav right 28.06; content 28.06, 65 | side nav right 28.06; content 28.06, 65 | 0 |
| Section: side nav | hide | 75% | side nav right 17.03; content 17.03, 65 | side nav right 17.03; content 17.03, 65 | 0 |
| Section: side nav | hide | 100% | side nav right 276; content 16, 65 | side nav right 276; content 16, 65 | 0 |
| Section: side nav | restore | 0% | side nav right hidden; content 16, 65 | side nav right hidden; content 16, 65 | 0 |
| Section: side nav | restore | 25% | side nav right 206.68; content 206.68, 65 | side nav right 206.68; content 206.68, 65 | 0 |
| Section: side nav | restore | 50% | side nav right 264.94; content 264.94, 65 | side nav right 264.94; content 264.94, 65 | 0 |
| Section: side nav | restore | 75% | side nav right 275.97; content 275.97, 65 | side nav right 275.97; content 275.97, 65 | 0 |
| Section: side nav | restore | 100% | side nav right 276; content 277, 65 | side nav right 276; content 277, 65 | 0 |
| Section: both | hide | 0% | top nav bottom 64; side nav right 276; content 277, 65 | top nav bottom 64; side nav right 276; content 277, 65 | 0 |
| Section: both | hide | 25% | top nav bottom 29.2; side nav right 86.32; content 86.32, 29.2 | top nav bottom 29.2; side nav right 86.32; content 86.32, 29.2 | 0 |
| Section: both | hide | 50% | top nav bottom 18.26; side nav right 28.06; content 28.06, 18.26 | top nav bottom 18.26; side nav right 28.06; content 28.06, 18.26 | 0 |
| Section: both | hide | 75% | top nav bottom 16.19; side nav right 17.03; content 17.03, 16.19 | top nav bottom 16.19; side nav right 17.03; content 17.03, 16.19 | 0 |
| Section: both | hide | 100% | top nav bottom 64; side nav right 276; content 16, 16 | top nav bottom 64; side nav right 276; content 16, 16 | 0 |
| Section: both | restore | 0% | top nav bottom hidden; side nav right hidden; content 16, 16 | top nav bottom hidden; side nav right hidden; content 16, 16 | 0 |
| Section: both | restore | 25% | top nav bottom 50.8; side nav right 206.68; content 206.68, 51.8 | top nav bottom 50.8; side nav right 206.68; content 206.68, 51.8 | 0 |
| Section: both | restore | 50% | top nav bottom 61.74; side nav right 264.94; content 264.94, 62.74 | top nav bottom 61.74; side nav right 264.94; content 264.94, 62.74 | 0 |
| Section: both | restore | 75% | top nav bottom 63.81; side nav right 275.97; content 275.97, 64.81 | top nav bottom 63.81; side nav right 275.97; content 275.97, 64.81 | 0 |
| Section: both | restore | 100% | top nav bottom 64; side nav right 276; content 277, 65 | top nav bottom 64; side nav right 276; content 277, 65 | 0 |

- Each animation is paused and set to the same time on both heads, so the frames compare the same instant.
- The edges are in CSS px. "The same" means the head's readings equal the passed head's.
- At 100% of a hide, each paused animation sits at its end time, where it no longer applies. So that frame shows the navs over the content, on both heads.
- The live frames never show that state: their gap stays between −0.01 and 1 px.

## At rest (test)

| Case | Before, px that differ | Hidden | Restored | Restored against before, passed / head |
| --- | --- | --- | --- | --- |
| Focus Mode (stock): both | 0 | 0 | 0 | 0 / 0 |
| Hidden Side Nav Section (stock): side nav | 0 | 0 | 0 | 0 / 0 |
| Default: top nav | 0 | 0 | 0 | 0 / 0 |
| Default: side nav | 0 | 0 | 0 | 0 / 0 |
| Default: both | 0 | 0 | 0 | 0 / 0 |
| Section: top nav | 0 | 0 | 0 | 0 / 0 |
| Section: side nav | 0 | 0 | 0 | 0 / 0 |
| Section: both | 0 | 0 | 0 | 0 / 0 |

## Builds

- Head: the preview deploy of e5ae4e78, by its version.json. Passed: the preview deploy of 8e71aef2, by its version.json.
- The scratch cases run on local builds of both commits. Against the hosted previews, the local builds give:

| Story | Build | Local against hosted |
| --- | --- | --- |
| `core-appshell--focus-mode` | passed head | pixel-identical |
| `core-appshell--focus-mode` | head | pixel-identical |
| `core-appshell--hidden-side-nav-section` | passed head | pixel-identical |
| `core-appshell--hidden-side-nav-section` | head | pixel-identical |

- The local builds ran under the lowest scheduling priority.
- Each case ran on the passed head and then on the head, in one browser session, interleaved.

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 px, light, motion not reduced.
- The animations are read through the Web Animations API: target, property, duration, delay and every keyframe.
- Every frame was looked at.

## Files

- `mid-slide--<case>--<hide|restore>--passed-vs-head.png`: the top-left of the viewport at 25, 50 and 75% of the motion, top to bottom. The passed head is on the left, and the head on the right.
- `measurements.json`: every reading, sample and keyframe.
