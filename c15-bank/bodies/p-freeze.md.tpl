## Maintainer impact

A proof that must act on a component mid-animation races the test process: on a loaded runner the motion has moved on, or ended, before the next command reaches the page. The proofs of Lab's TabBar, the drafts that follow, need to act at an instant of the scene's own time.

## Intended invariant

No behavior change. A page that never calls `installPageFreeze` keeps its own clock and runs none of the freeze.

## Change

The interaction harness gains a page freeze (`src/freeze.ts`) and a README section:

- `installPageFreeze`, `freezePage` and `thawPage` stop and restart a scene in one page task. Its animations pause where they stand, timers and frame callbacks wait in the timer gate, and its clocks stand still. `new Date()` keeps the real clock.
- `freezePageOn(page, type)` arms a freeze on the next pointer, touch, mouse, key, wheel or scroll event. The install adds one window capture listener per type before any page script runs, so the freeze lands before the page's own listeners.
- `freezePageWhen(page, predicate, arg)` freezes on the first real frame the predicate holds. Its timeout runs on the real clock.
- `advanceFrozenPage(page, ms)` moves the page's clock and every held animation on together.

At the thaw, every held animation resumes from where it stood on the timeline's own time, one the page dated while frozen included. Timeouts set before the freeze stop counting too, and come due on the page's clock after the thaw. Only the document timeline's animations are held: a scroll- or view-driven one follows its scroller. The timer gate gets `freeze()` and `thaw()` methods, which `freezeTimers`, `thawTimers` and the page freeze all call. It also carries the real clock: the harness's own waits time themselves on it, so they still sample, hold and time out on a frozen page. Its epoch stamps add back the frozen span in force when each time was taken. The span ends at the frame the held runs restart from, so they stay together. An interval skips its ticks while frozen. A CSS animation the page resumes while frozen is held where it stood, and a run it cancels while frozen stays cancelled.

## Evidence

- Failure before the change: each case Testing lists fails on the freeze as first drafted.
- Success after the change: the harness's whole spec passes in Chromium (105, 1 skipped) and WebKit (93, 13 skipped).
- Product/runtime behavior verified unchanged: harness only. No package imports it.

## Scope

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates at 0cadeb9cac, on main 7f1bace3c4, node 24.22.1 from `.nvmrc`:

1. **The harness's own spec, whole file:** Chromium 105 passed, 1 skipped; WebKit 93 passed, 13 skipped (Chromium-only evidence skips itself).
2. **Red-first, each on the freeze as first drafted:** the armed-key case saw the page's own listener first (3/3); the thaw case read 87.6 ms where the run held at 100 (3/3); a freeze on a condition hung on a frozen page (2/2); a timeout came due 600 ms early on the page's clock (3/3); a scroll-driven animation made the freeze throw (3/3); on a frozen page `sampleRects`, `armHold` and `blockMainThread` never returned (2/2); a CSS animation resumed while frozen read 0 ms, not its 500 (3/3); a throwing condition left `freezePageWhen` pending (2/2); a transition reversed while frozen replayed its old run from the start over the reversal (3/3); after a thaw `blockMainThread` stamped its window 600 ms early (3/3); after a thaw `waitForAnimation` and `sampleRects` stamped about 500 ms early (3/3); a CSS run dated and then removed while frozen restarted at the thaw (5/5 in each engine); a run that finished before a freeze, read after the thaw, was dated about 600 ms late (3/3); ten freeze and thaw cycles put a run 66 to 95 ms ahead of the page's clock (3/3 in each engine). The new cases pass ×3 in both engines.
3. **Static:** harness typecheck; strict ESLint, 0 problems; Prettier.
