## Maintainer impact

A proof that must act on a component mid-animation races the test process. On a loaded runner the motion has moved on, or ended, before the next command reaches the page: a second tap mid-slide, or a finger that lands before the last lift reaches the app. The proofs of Lab's TabBar, the drafts that follow, need to act at an instant of the scene's own time.

## Intended invariant

No behavior change. A page that never calls `installPageFreeze` keeps its own clock and runs none of the freeze.

## Change

The interaction harness gains a page freeze (`src/freeze.ts`) and a README section:

- `installPageFreeze`, `freezePage` and `thawPage` stop and restart a scene in one page task. Its animations pause where they stand, timers and frame callbacks wait in the timer gate, and its clocks stand still. `new Date()` keeps the real clock.
- `freezePageOn(page, type)` arms a freeze on the next pointer, touch, mouse, key, wheel or scroll event. The install adds one window capture listener per type before any page script runs, so the freeze lands before the page's own listeners.
- `freezePageWhen(page, predicate, arg)` freezes on the first real frame the predicate holds. Its timeout runs on the real clock.
- `advanceFrozenPage(page, ms)` moves the page's clock and every held animation on together.

At the thaw, every held animation resumes from where it stood on the timeline's own time, one the page dated while frozen included.

## Evidence

- Failure before the change, with the freeze as first drafted: a freeze armed on a key landed after the page's own listener (3/3). A start dated while frozen resumed 12.4 ms short of where it held (3/3). A freeze on a condition hung on a frozen page instead of timing out (2/2).
- Success after the change: the seven self-tests pass in Chromium (35/35) and WebKit (21/21).
- Product/runtime behavior verified unchanged: harness only. No package imports it.

## Scope

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates on the freeze's content, node 24.22.1 from `.nvmrc`:

1. **The harness's own spec, whole file:** Chromium 92 passed, 1 skipped; WebKit 80 passed, 13 skipped (Chromium-only evidence skips itself).
2. **The seven page-freeze self-tests, repeated:** Chromium 35/35 (×5), WebKit 21/21 (×3).
3. **Red-first:** with the freeze as first drafted, the armed-key case saw the page's own listener run first (3/3), the thaw case read 87.6 ms where the run held at 100 (3/3), and a freeze on a condition hung on a frozen page past the test's limit (2/2).
4. **Static:** harness typecheck; Prettier.
