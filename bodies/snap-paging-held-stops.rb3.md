## User impact

With snap paging, a Carousel row that resizes while it settles onto a page ends past that page and then steps back. Narrowed 30 px while settling onto its second view, a row of three per view ended 0.5–1.6 px past the view's stop in Chromium. Under load it ended up to 3.3 px past. It then stepped back when it returned to native scrolling. In WebKit the resize could also leave the row's travel a pixel off, with the same step at the end (1 of 60 runs).

## Problem and solution fit

- Why? A held row's stops are the children's rects plus the animator's position now. In Chromium the rects show the frame's translate, and the animator runs ahead of that frame, so every stop moves by the motion in between. WebKit reads each rect at the time of its read, so the span of a moving row mixes times.
- Why does it harm the task? The retargeted settle heads for the moved stop, so the row rests off its page and jumps back at the hand-back.
- Why does it matter? A paging row rests on its page with no extra motion.

## Expected behavior and authority

`spec:AST-094` FR6: "A resize during a settle retargets it: … any other settle on the page nearest its target's offset." `component:Carousel` FR7 rests each page on its stop.

## Smallest restoration

- While the row is held, each child's stop takes that child's own `translate` off its rect, read right after the rect. It adds the row's native scroll offset. At rest nothing changes.
- The held row's span, which sets its travel after a resize, takes each child's translate off its rect the same way (`itemsSpan`).
- `position()`, the value a catch reads from the curve, is untouched.

Stack: on #10592; review the top commit.

## Evidence

- Reproduction before the change: NOT-FOR-LANDING arm 4e4b992a6eff81413aeff125d3b66cdd915d102d runs these tests on #10592. The browser case fails in Chromium every run, in both directions, and the travel unit lands 2 px off (439, not 441).
- Result after the change: the settle ends on the stop to 0.00 px in both engines.
- Unchanged path: settles with no resize, and #10592's cases, are unchanged.
- Mutation-sensitive proof: five NOT-FOR-LANDING commits, under Testing.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- Restacked from 445b336aa358a7139db9620d852685ad18d52287, the same change over #10592's previous head: this pull request's files are identical, and the restack brings only #10592's uniform-page and report lines, which no Carousel case uses. Runs marked "previous" ran there; the rest ran on this head.
- core `tsc` 0; strict ESLint 0 and Prettier clean on the changed files; comment sentence lengths 0 over on the changed lines; `check:changesets` passes.
- `SnapPaging.test.tsx` 19 of 19. Carousel, SnapPaging, Lightbox, hooks, gestures and motion unit suites: 138 files, 3,159 tests pass.
- The span, in units. Seven items move 0.3 px a millisecond, and each rect read comes 1 ms after the one before, as WebKit reads each rect at its own time; a style read right after a rect sees that time. `itemsSpan` lands on the layout's span to 6 decimals; the rects alone land 1.8 px short. Through the component, a held row narrowed by 30 px reports a travel of 441, the layout's; the base reports 439.
- The case, in both directions: a drag of 70% of a view and a still lift settle a row of three per view onto its second view, and the page narrows the row by 30 px once two frames show the settle. The new settle's last keyframe must sit on the view's layout stop. Chromium resolves every read in a frame at the frame's time and must hold 0.05 px. WebKit resolves each read at its own time, so each WebKit run holds 0.05 px plus the settle's speed times the span of the rect and style reads between the narrowing and the test's observer, and a span over a frame fails by name. A page that shows the whole settle before the narrowing also fails by name.
- End minus stop, both directions: Chromium 0.00 px in 20 of 20 idle runs, and in 20 of 20 on two pinned cores with two busy loops (previous); WebKit 0.00 px in 20 of 20 with 2 workers and 20 of 20 with 4 workers on 2 CPUs (previous), and in 10 of 10 here.
- On #10592, the base: Chromium misses by 0.51–3.26 px, every run, in both directions. WebKit stays within its bound (−0.01 to −0.47 px), so the case is red-first in Chromium only; WebKit reads near-consistent values either way.
- Mutation-sensitive proof, each a NOT-FOR-LANDING commit with one rule removed (browser runs previous, units here):
  - the stops keep the children's translate (627761ba61a729275f90ecfd07a255e88c8ad420): misses of 0.9–4.4 px in both engines;
  - the stops add the animator's position as well (2fc992d34e1bf4040b0d1f1d9890495a1f584696): misses of about 104 px;
  - a right-to-left row takes the translate off backward (d6b08409e20dcda505c08ff5f81cfe9749260d80): right to left misses by 2.6–4.9 px; left to right passes;
  - the span keeps the children's translate (75a42c3cbe2247cf8ebefe1cc286179b1f9fff99): both span units fail (708.89 against 710.69, and 439);
  - the held row's span read as at rest (44103d9ba840a253790c2fcf6da3ef5b88d27cbf): the travel unit fails (439).
- The three-up case's hand-back (previous), WebKit, 60 runs: the held row ends on the native rest in all 60 (#10592 alone: 59 of 60). Chromium under two busy loops, 20 runs: every frame within 0.08 px, and the row ends on the native rest in all 20.
- #10592's cases on this head, 5 runs per engine: the three-up case and the split case pass.
- Interaction specs, ×3 per engine, 2 workers, no retries: Chromium 240 passed, 0 failed on this head; WebKit 246 passed (previous), 3 stopped by the touch harness's pacing guard ("the page's own touch and pointer listeners took 43–56 ms").
