## User impact

With snap paging, a Carousel row that resizes while it settles onto a page ends past that page and then steps back. Narrowed 30 px while settling onto its second view, a row of three per view ended 0.5–0.9 px past the view's stop in Chromium (up to 2.9 px under load), then stepped back when it returned to native scrolling.

## Problem and solution fit

- Why? A held row's stops are the children's rects plus the animator's position now. In Chromium the rects show the frame's translate, and the animator runs ahead of that frame, so every stop moves by the motion in between.
- Why does it harm the task? The retargeted settle heads for the moved stop, so the row rests off its page and jumps back at the hand-back.
- Why does it matter? A paging row rests on its page with no extra motion.

## Expected behavior and authority

`spec:AST-094` FR6: "A resize during a settle retargets it: … any other settle on the page nearest its target's offset." `component:Carousel` FR7 rests each page on its stop.

## Smallest restoration

- While the row is held, each child's stop takes that child's own `translate` off its rect, read right after the rect, and adds the row's native scroll offset. At rest nothing changes.
- `position()`, the value a catch reads from the curve, is untouched.

Stack: on #10592 (and #10607); review the top commit.

## Evidence

- Reproduction before the change: NOT-FOR-LANDING arm f67035ced6cbb72f8b3d64785a8ac4fbfccd9f24 (this test on #10592) fails in Chromium every run, in both directions.
- Result after the change: the settle ends on the stop to 0.00 px in both engines.
- Unchanged path: settles with no resize, and #10592's cases, are unchanged.
- Mutation-sensitive proof: three NOT-FOR-LANDING commits, under Testing.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- core `tsc` 0; strict ESLint 0 and Prettier clean on the changed files; comment sentence lengths 0 over on the changed lines; `check:changesets` passes.
- Carousel, SnapPaging, hooks, gestures and motion unit suites: 134 files, 2,953 tests pass.
- The case, in both directions: a drag of 70% of a view and a still lift settle a row of three per view onto its second view, and the page narrows the row by 30 px once two frames show the settle. The new settle's last keyframe must sit on the view's layout stop. Chromium resolves every read in a frame at the frame's time and must hold 0.05 px. WebKit resolves each read at its own time, so each WebKit run holds 0.05 px plus the settle's speed times the span of the rect and style reads between the narrowing and the test's observer, and a span over a frame fails by name. A page that shows the whole settle before the narrowing also fails by name.
- This head, end minus stop: Chromium 0.00 px in 10 of 10 idle runs and 20 of 20 on two pinned cores with two busy loops; WebKit 0.00 px in 20 of 20 with 2 workers and in 19 of 20 with 4 workers on 2 CPUs. The one other run stopped at "the row still settles at the narrowing".
- On #10592, the arm: Chromium misses by 0.48–0.87 px idle and 0.27–2.86 px under the busy loops, every run, in both directions. WebKit stays within its bound (−0.01 to −0.47 px), so the case is red-first in Chromium only; WebKit reads near-consistent values either way.
- Mutation-sensitive proof, each a NOT-FOR-LANDING commit with one rule removed, 5 runs per engine and direction:
  - the stops keep the children's translate (53ddf3df10334fa4d24d4bca5c9e2bfe786b37c7): misses of 1.3–4.4 px in both engines;
  - the stops add the animator's position as well (1a89468dcbc4a3c4c01be7c39a299b49106457ca): misses of about 104 px;
  - a right-to-left row takes the translate off backward (1a7a4e2a91aa71754fb5e3f71b250be2581d3791): right to left misses by 2.5–7.8 px; left to right passes.
- #10592's cases on this head, 5 runs per engine: the three-up case and the split case pass. Its three-up hand-back under two busy loops, 20 runs: every frame within 0.08 px, and the held row ends on the native rest in all 20.
- Interaction specs on a build of this head, ×3 per engine, 2 workers, no retries: Chromium 237 passed, 0 failed; WebKit 245 passed, 1 stopped by the touch harness's pacing guard ("the page's own touch and pointer listeners took 38 ms").
