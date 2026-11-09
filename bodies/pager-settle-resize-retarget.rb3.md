## User impact

A pager resized mid-settle jumps or rests on the wrong page. Narrowed 100 px toward its last view, a Carousel row of three per view ran back to the view it left. A partial last page, narrowed 60 px, rested 60 px short of the end. Otherwise the settle ended in a one-frame jump of 60–190 px.

## Problem and solution fit

- Why? The settle keeps a page index. A resize stops it and sets the track on that index's new offset, and a renumbering resize makes it another page.
- Why does it harm the task? The row jumps, moves against the gesture, or stops short.
- Why does it matter? A paging scroll view keeps heading where it was sent.

The settle now retargets by offset, keeping its velocity.

## Expected behavior and authority

`spec:AST-094` FR6: "A new target MUST keep the current velocity". Amended here for the spec owners' stamp: "A resize during a settle retargets it: a settle toward the last page ends on the last page, and any other settle on the page nearest its target's offset", with a resize row. `component:Carousel` FR7: "the last page rests where the row ends".

UIKit differs: resized mid-settle, a paging scroll view keeps decaying toward its old target, resting off the new pages (iOS 26.2 simulator). FR6 and FR7 require the new last page, so the settle retargets.

## Smallest restoration

- When a resize renumbers child pages, `usePager`'s `measure()` maps a settle's target and the page last at rest by offset. The last page stays last.
- A resize mid-settle replays the settle from the track's value and velocity at one time, and starts the new curve then. A release keeps the paging integrator; any other move keeps the animated scroll.
- Uniform pages, such as Lightbox's, scale with the viewport, so their settle keeps its fraction of a page.
- The renumbered page is the pager's own change, not reported back. A release's waiting report still waits two frames into the new settle.

## Evidence

- Reproduction before the change: NOT-FOR-LANDING arm bb953862c181e20e6711e1776e167208afe33e0e runs these tests on main. It fails the 9 new unit cases and both browser cases, 5 of 5 per engine.
- Result after the change: every case passes (Testing).
- Unchanged path: settles with no resize are frame-identical to main's.
- Mutation-sensitive proof: ten NOT-FOR-LANDING commits, under Testing.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- core `tsc` 0; strict ESLint 0 and Prettier clean on the changed files; comment sentence lengths 0 over on the changed lines; `check:changesets` passes; `check:knowledge` reports the records aligned.
- `usePager.test.ts` 147 of 147; on main the 9 new cases fail. Carousel, SnapPaging, Lightbox, hooks, gestures and motion unit suites: 138 files, 3,155 tests pass.
- The browser runs below ran on 645e02a022db20f8c32524cd012d2d409d56870b, this change less the line that retires the old settle's report timer; on this head the two browser cases pass 5 of 5 per engine.
- Uniform pages: a narrowing (400 to 200 px) and a widening (400 to 800 px) during a settle toward page 2 move the row, one frame on, by at most 1.5 times the step before, in pages, and the settle ends on page 2 at its new offset. Main lands on page 2 at once and the previous head starts from the old pixels: both fail (1.10–1.20 and 0.36 pages against 0.26).
- A release's report that still waits at the resize goes out two frames after the new settle starts, also when the resize comes in the old settle's first frames; main sends it at the resize.
- The frame oracle, in the three-up narrowing case. From the lift to the hand-back, the page records each frame: where the row shows, when the read ran, and each settle's own animation clock. The settle before the resize fits the paging integrator's curve through its keyframes, to 0.00 px at every keyframe. Each frame after the resize must sit on the integrator's curve to the new settle's last keyframe, from where the settle before stands at the new settle's own start, at its velocity then. Chromium must hold 0.5 px at the frame's clock; WebKit must hold 1 px over the read's span. WebKit shows a frame at the time of the read, not the rAF stamp: taking out each read's delay collapses the clock spread of the frames before the resize from 1.1–2.8 ms to 0.1–0.2 ms, and WebKit reads its clocks to the millisecond (±0.5 ms). A control holds each moving frame before the resize to 1 px on its own settle. The first frame after the resize may still show the settle before it, or the new curve between its start and its clock, where the browser commits it inside that frame (FR6). Once the new settle ends, a held frame must show its end.
- This head: Chromium 30 of 30 on two pinned cores with two busy loops and 20 of 20 at the host's load, every frame within 0.08 px; WebKit 30 of 30, every frame within 0.01 px. On main, 5 runs per engine: the row of three runs back to 308, and the split end rests at 411, not 471.
- Mutation-sensitive proof, each a NOT-FOR-LANDING commit removing one rule; 5 browser runs per engine:
  - a settle toward the last page by offset too (62c5001f5311c8cd5a68595fdc1a50a99fe67342): the split end rests at 411 in both engines; 2 units fail.
  - the page last at rest keeping its old index (bc69e54ed77bd9e002eb4089f15c6f726a429c51): its unit fails.
  - no re-sync of the last report (1e271e9c6a3d133825836942a9213e9d045781fb): its unit fails.
  - a resize ending the settle at once (cd86ff1eef6cf61341eb8b33e20845e0ba9a2b04): the three-up case fails in both engines, with no settle after the resize; 6 units fail.
  - the velocity dropped at the retarget (93e9ac3a5068d6aafeb004e3891e6395ff642925): the three-up case misses by 11 px in Chromium and 6.9 px in WebKit; the stall unit fails.
  - the retarget starting from the old settle's end (f0f1908d974949cfa34bdecd48e4a1b717123192): misses of 186–260 px in both engines; 3 units fail.
  - the read and the play at two times (54ce9acf88a73bc5356ac5f805fd1482cef3cb99): the stall unit fails, and Chromium misses by 0.69 px. WebKit's frames match this head's there.
  - a uniform pager's retarget from the old pixels (331af56f240a34f9f23ef5ab9a46cbb80d1da0ea): both uniform-page units fail.
  - the waiting report sent at the resize (4056abfe485d1b7227c2a159f4960ea27541c0a8): both report units fail.
  - the old settle's report timer left live (0e653953f595707876a7d59982056d9c59d5d69b): the first-frames report unit fails.
- A 75 ms stall between the read and the play, from a NOT-FOR-LANDING hook: on the two-times mutant (eab4625f95c0c802500b9e9ef29150dc176ed485) Chromium misses by 23–24 px, 5 of 5; on this head (756e871e30b3aa3645a5bade279dfc34d7359c32), 5 of 5 pass. One time for the read and the play also covers keeping the track moving through the swap: that version changed no frame once both share the time, so it is not here.
- Settles with no resize are unchanged: a still lift and a flick on main and on this head fit the same integrator curve in Chromium (still: from 487.08 px at −7 px/s; flick: from 373.10 px at 824 px/s), every frame within 0.12 px of it, 5 runs each.
- Hand-back: the frame check stops where the row goes back to native scrolling, and the rest is checked on its own (716). The held settle ends on the native rest in all 50 Chromium runs and 30 WebKit runs here. In 1 of 60 WebKit runs on the previous head, with the same code for this row, it ended at 715 and stepped 1 px: WebKit resolves each child's rect at the time of its read, so the held row's span can mix a moving row's times. The held-stops change stacked on this one takes each child's translate off its rect there too.
- Lightbox's interaction specs, ×3 per engine on this head and on main's `usePager`: Chromium 308 and 307 passed, WebKit 292 and 293. `LightboxDismiss`'s busy-frame dismissal check failed on both builds (this head: once per engine; main: twice in Chromium), and the touch harness's pacing guard stopped one WebKit run on each.
- Interaction specs on a build of this head, ×3 per engine, 2 workers, no retries: Chromium 234 passed, 0 failed; WebKit 242 passed, 1 stopped by the touch harness's pacing guard ("the page's own touch and pointer listeners took 41 ms").

## Follow-ups

| Follow-up | When |
| --- | --- |
| The held row's span takes each child's translate off its rect (WebKit only, 1 of 60 runs) | The held-stops pull request stacked on this one |
| A key press between a resize and the paging's next frame | Not scheduled |

## Writing rubric results

R1 narration: none; the FR6 sentence and row state the system in the present tense.
R2 research: none in the record.
R3 evidence: the verification row names the tests and their cases, not a change.
R4 rejected alternatives: none added.
R5 change references: none.
R6 open questions: none added.
