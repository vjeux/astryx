## User impact

With snap paging, a Carousel row resized mid-settle jumps or rests on the wrong page. Narrowed 100 px toward its last view, a row of three per view ran back to the view it left. A partial last page, narrowed 60 px, rested 60 px short of the end. Otherwise the resize ended the settle in a one-frame jump of 60–190 px.

## Problem and solution fit

- Why? The settle keeps a page index; a resize stops it and sets the track on that index's new offset, and a renumbering resize makes it another page.
- Why does it harm the task? The row jumps, moves against the gesture, or stops short of its end.
- Why does it matter? A paging scroll view keeps heading where it was sent.

The settle now retargets by offset and plays on from where it shows, at its velocity.

## Expected behavior and authority

`spec:AST-094` FR6: "A new target MUST keep the current velocity". Amended here for the spec owners' stamp: "A resize during a settle retargets it: a settle toward the last page ends on the last page, and any other settle on the page nearest its target's offset", with a resize row. `component:Carousel` FR7: "the last page rests where the row ends".

UIKit differs: resized mid-settle, a paging scroll view keeps decaying toward its old target, resting off the new pages (iOS 26.2 simulator). FR6 and FR7 require the new last page, so the settle retargets, speeding up toward a farther page (12.8→17.3 px per frame, Chromium).

## Smallest restoration

- When a resize renumbers the pages, `usePager`'s `measure()` maps a settle's target and the page last at rest by offset; the last page stays the last page.
- A resize mid-settle replays the settle from the track's value and velocity at one time, and starts the new curve then: the paging integrator after a release, the animated scroll otherwise.
- The renumbered page is the pager's own change, not reported back.

Requires #10607 before merge: FR6's text there.

## Evidence

- Reproduction before the change: NOT-FOR-LANDING arm b2259a4db32ca645b1235f2791b20449d9ce87fe (these tests on #10591) fails the 5 new unit cases and both browser cases, 5 of 5 per engine.
- Result after the change: every case passes (Testing).
- Unchanged path: settles with no resize are frame-identical to #10591's.
- Mutation-sensitive proof: seven NOT-FOR-LANDING commits, under Testing.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- core `tsc` 0; strict ESLint 0 and Prettier clean on the changed files; comment sentence lengths 0 over on the changed lines; `check:changesets` passes; `check:knowledge` reports the records aligned.
- `usePager.test.ts` 139 of 139; on #10591 the 5 new cases fail. Carousel, SnapPaging, hooks and gestures unit suites: 96 files, 1,959 tests pass.
- The frame oracle, in the three-up narrowing case. From the lift to the hand-back, the page records each frame: where the row shows, when the read ran, and each settle's own animation clock. The settle before the resize fits the paging integrator's curve through its keyframes, to 0.00 px at every keyframe. Each frame after the resize must sit on the integrator's curve to the new settle's last keyframe, from where the settle before stands at the new settle's own start, at its velocity then. Chromium must hold 0.5 px at the frame's clock; WebKit must hold 1 px over the read's span. WebKit shows a frame at the time of the read, not the rAF stamp: taking out each read's delay collapses the clock spread of the frames before the resize from 1.1–2.8 ms to 0.1–0.2 ms, and WebKit reads its clocks to the millisecond (±0.5 ms). A control holds each moving frame before the resize to 1 px on its own settle. The first frame after the resize may still show the settle before it, or the new curve between its start and its clock, where the browser commits it inside that frame (FR6). Once the new settle ends, a held frame must show its end.
- This head: Chromium 10 of 10 on two pinned cores with two busy loops and 20 of 20 at the host's load, every frame within 0.08 px; WebKit 120 of 120, every frame within 0.01 px. On #10591, 5 runs per engine: the row of three runs back to 308, and the split end rests at 411, not 471.
- Mutation-sensitive proof, each a NOT-FOR-LANDING commit removing one rule; 5 browser runs per engine:
  - a settle toward the last page by offset too (8882562e1c6a433e652ceccbc3c0b8aaf751bd3d): the split end rests at 411 in both engines; 2 units fail.
  - the page last at rest keeping its old index (ba1da986c5ccc1c8ee1e443c3e94384859b49f2c): its unit fails.
  - no re-sync of the last report (4ce2d683f6f309788a414815153054126d63f028): its unit fails.
  - a resize ending the settle at once (cb4f36b1a96db9f5f548d82acdc77492d797c512): the three-up case fails in both engines, with no settle after the resize; 2 units fail.
  - the velocity dropped at the retarget (4572a53578ebb5febd02bea5918ed5e5df75fd5d): the three-up case misses by 11 px in Chromium and 10 px in WebKit; the stall unit fails.
  - the retarget starting from the old settle's end (4db8b6dd413b6fa55cf2f334967814211f35b65d): misses of 230–260 px in both engines; the continuity unit fails.
  - the read and the play at two times (fbd89701ef0f605479de7c12d270f75325a14ba0): the stall unit fails, and Chromium misses by 0.74 px. WebKit's frames match this head's there.
- A 75 ms stall between the read and the play, from a NOT-FOR-LANDING hook: on the two-times mutant (1a637f939b00302bbbba9dd5533664305b087bc8) Chromium misses by 23–26 px, 5 of 5; on this head (15777ecc8cb95aea97c94b7a3b7b7abe78253c65), 5 of 5 per engine pass. One time for the read and the play also covers keeping the track moving through the swap: that version changed no frame once both share the time, so it is not here.
- Settles with no resize are unchanged: a still lift and a flick on #10591 and on this head fit the same integrator curve in Chromium (still: from 487.08 px at −7 px/s; flick: from 373.10 px at 825 px/s), every frame within 0.12 px of it, 5 runs each.
- Hand-back, measured and unchanged here: the frame check stops where the row goes back to native scrolling, and the rest is checked on its own (716). In 2 of 10 Chromium runs under two busy loops, 2 of 20 at the host's load and 2 of 120 WebKit runs, the held settle ends 1–2 px past the native rest (717–718 against 716), a 1–2 px step at the hand-back: the offsets the paging measures while it holds the row run past the native travel. In WebKit the hand-back also steps 0.5–0.85 px every few runs: the integrator's 0.5 px rest distance plus the whole-pixel native offset. Both are follow-ups.
- Interaction specs on a build of this head, ×3 per engine, 2 workers, no retries: Chromium 231 passed, 0 failed; WebKit 234 passed, 6 failed at a host load of about 50, each stopped by the touch harness's pacing guards ("the page read a resting finger", "the page's own touch and pointer listeners took 38–54 ms").

## Follow-ups

| Follow-up | When |
| --- | --- |
| The held row's offsets: a 1–2 px step at the hand-back after a narrowing mid-settle | Next, red-first |
| A key press between a resize and the paging's next frame | Not scheduled |

## Writing rubric results

R1 narration: none; the FR6 sentence and row state the system in the present tense.
R2 research: none in the record.
R3 evidence: the verification row names the tests and their cases, not a change.
R4 rejected alternatives: none added.
R5 change references: none.
R6 open questions: none added.
