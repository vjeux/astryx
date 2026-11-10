## Maintainer impact

Under load, three of ChatLayout's Chrome on Android proofs fail without a named starvation error. The rise from the report and the fall from the blur fail with `Received: Infinity`. The storyboard fails with "holdAnimations: the hold took no animation of the judged motion".

Gboard's show runs 267 ms and its hide 167 ms. Each test read the ride's start from `getAnimations()`, or sent a hold, after the report or the blur. On a busy machine, those arrived after the ride ended.

## Intended invariant

The interaction harness states the hold rule in `internal/interaction-harness/README.md` ("Curve sampling"). For a short animation that an action starts, the page arms the hold before the action (`armHold`). The proofs' checks stay as they are:

- the rise starts within 2 ms of the report, less `showReportLagMs`;
- the fall starts within 8 ms of the blur, plus `hideAfterBlurMs`;
- each curve stays within 0.5 px, and the storyboard's dock only rises.

## Change

- The rise and fall tests arm `armHold` on the dock before the report or the blur, then read `hold.held()`. A recorder gives the ride's start: it wraps `Element.prototype.animate` and reads `startTime` in the task that makes the ride. The file's Layout and Paint proof now uses the same recorder, instead of its own copy.
- The storyboard arms its hold on the layout's root for new rides (`newOnly`, `count: 2`). It takes the dock's and the transcript's rides, which start in the same task, and films them (`held`). Each frame checks that the transcript rides with the composer.
- No `waitForAnimation`, `getAnimations()` or `holdAnimations` call runs after the action any more.

## Evidence

- Failure before the change: under the load profile below, main fails each of the three proofs 3 of 3.
- Success after the change: the same profile passes each of them 3 of 3.
- The storyboard's frame check bites. With the hold on the dock alone, the transcript runs ahead on the real clock, 163 px at the first frame. It fails 2 of 2.
- The start checks bite. Without the keyboard model's two time offsets (vjeux/astryx@d2013749d42bb08c8a5b1cfc2f4c3a6ce0c4d621), the rise fails by 25 ms and the fall by 16 ms.
- Product/runtime behavior verified unchanged: one test file changes.
- CI impact (for a change to workflows, actions or CI scripts): none.

## Scope

Components: ChatLayout

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

All runs use main 3582c71f9d with its own Storybook build, Chromium, `--retries=0`. Branch results are at 8f55deaaa5.

| Profile | Main | This branch |
| --- | --- | --- |
| Load: a 2-thread pin (one physical core), 4 workers, 2 busy loops at the tests' priority; the file's 6 Chrome on Android tests, 3 runs each | rise 3 fail, fall 3 fail, storyboard 3 fail; the other 3 tests pass | 18 pass |
| CI's container (4 CPUs), 1 worker, the whole file: twice on main, once on this branch | 36 pass | 18 pass |
| WebKit in CI's container, the whole file, at edb4d6228d (the changed tests skip there) | | 12 pass, 6 skipped |

**Gates.** typecheck (core), ESLint and Prettier pass. `pnpm review:pre` reports 0 findings.

**Overlap.** No open pull request changes this file.
