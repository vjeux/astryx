## Maintainer impact

Under load, three of ChatLayout's Chrome on Android proofs fail without a named starvation error:

- "the dock rides up on Gboard's slide from the report, dated back to Gboard's start" fails with `Received: Infinity`.
- "the dock rides down on Gboard's slide from the blur" fails the same way.
- "storyboard: the keyboard shows and the composer rides Gboard's slide" fails with "holdAnimations: the hold took no animation of the judged motion".

Gboard's ride runs about 300 ms. After the report or the blur, each test read the ride's start from `getAnimations()` or sent a hold. On a busy machine, those reached the page after the ride ended. The read found no animation, so the start was minus infinity, and the hold took nothing.

## Intended invariant

The interaction harness states the hold rule in `internal/interaction-harness/README.md` ("Curve sampling"). For a short animation that an action starts, the page arms the hold before the action (`armHold`). The proofs' checks stay as they are:

- the rise starts within 2 ms of the report, less `showReportLagMs`;
- the fall starts within 8 ms of the blur, plus `hideAfterBlurMs`;
- each curve stays within 0.5 px, and the storyboard's dock only rises.

## Change

- The three tests arm `armHold` on the dock before the report or the blur, and read `hold.held()` after it. The storyboard films that held set (`held`).
- The two ride tests read the ride's start from a recorder. It wraps `Element.prototype.animate` and reads `startTime` in a microtask of the task that makes the ride. The file's "rise does no Layout or Paint per frame" proof reads it the same way.
- These replace the `waitForAnimation`, `getAnimations()` and `holdAnimations` calls that ran after the action.

## Evidence

- Failure before the change: under the load profile below, main fails each of the three proofs 3 of 3.
- Success after the change: the same profile passes each of them 5 of 5.
- The start checks still bite. With the keyboard model's two time offsets removed (vjeux/astryx@7c0b8f3e55f6538c19b2bb0de842ba173fb466bd), the rise fails by 25 ms and the fall by 16 ms: the removed offsets.
- Product/runtime behavior verified unchanged: one test file changes.
- CI impact (for a change to workflows, actions or CI scripts): none.

## Scope

Components: ChatLayout

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

All runs use main 3582c71f9d with its own Storybook build, Chromium, `--retries=0`.

| Profile | Main | This branch |
| --- | --- | --- |
| Load: a 2-thread pin (one physical core), 4 workers, 2 busy loops at the tests' priority; the file's 6 Chrome on Android tests, 3 runs on main and 5 on this branch | rise 3 fail, fall 3 fail, storyboard 3 fail; the other 3 tests pass | 30 pass |
| CI's container (4 CPUs), 1 worker, the whole file twice | 36 pass | 36 pass |
| WebKit in CI's container, the whole file | | 12 pass, 6 skipped (the Chrome on Android tests) |

**Gates.** typecheck (core), ESLint and Prettier pass. `pnpm review:pre` reports 0 findings.

**Overlap.** No open pull request changes this file.
