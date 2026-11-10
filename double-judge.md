# Double-judge of recorded wheel bursts

Each recorded burst (its sends, stamps, arrivals, handling, frames and deltas) is judged twice: by main's `wheelBurst` judgment and by this head's. A verdict is the burst's outcome: no throw, `WheelPacingError` (gap or release), or `WheelPageStallError` (listeners or frame, gap or release).

97 casts, 7 verdicts move. None moves in CI's profile or in the harness self-tests, in either engine.

The glide proof's own assertions were judged twice too, on the 23 recorded page logs. One moves: main reads wheels by index and fails a run whose two steps WebKit merged (10 wheels where it counts 12). This head maps each sent step to the wheel that carried it. The release check names that run as a merge in the steps the release reads.

## Verdicts that move

| Run | Test | Main | This head | Reason |
|---|---|---|---|---|
| webkit-pressure-wheelburst-callers | a trackpad flick drives the touch column as a finger does: it follows, coasts on at the li | WheelPacingError(gap) | WheelPageStallError(frame) | measured on stamps, the page drew no frame across nearly all of the 339 ms gap |
| webkit-pressure-wheelburst-callers | {pages: "item"}: a trackpad swipe pages | WheelPacingError(gap) | ok | arrival gap 269 ms ≥ 220 but stamps peak at 200: the host reads one gesture |
| webkit-pressure-trackpad-proofs-x16 | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch | ok | WheelPacingError(release) | release: merge 1-2 inside 2-7 |
| webkit-pressure-trackpad-proofs-x16 | absorbs what the undecided stretch showed when the fingers carry on: never a step back, an | ok | WheelPacingError(release) | release: merge 3-4 inside 2-5 |
| webkit-pressure-trackpad-proofs-x16 | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch | ok | WheelPacingError(release) | release: merge 3-5 inside 2-7 |
| webkit-pressure-trackpad-proofs-x16 | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch | ok | WheelPageStallError(release, listeners) | release: {"gapMs":69,"handlingMs":30} (the page held a step the release reads) |
| webkit-pressure-trackpad-proofs-x16 | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch | ok | WheelPacingError(release) | release: merge 6-8 inside 2-7 |

## Casts per test

| Run | Engine | Test | Casts | Moved |
|---|---|---|---|---|
| chromium-gestures-spec | chromium | a pan that takes a trackpad's scroll follows a real trackpad scroll along its axis and keeps the pag | 1 | 0 |
| chromium-harness-self-tests | chromium | a wheel burst reaches the page as one run with its whole delta and no gap past the 100 ms a proof al | 3 | 0 |
| chromium-harness-self-tests | chromium | a wheel burst sent slower than its maxGapMs throws WheelPacingError, in both engines | 3 | 0 |
| chromium-harness-self-tests | chromium | a burst whose steps the dispatch spaces past maxGapMs throws WheelPacingError over a page whose list | 3 | 0 |
| chromium-harness-self-tests | chromium | a page whose wheel listener holds its main thread splits a burst itself: never a runner stall | 3 | 0 |
| chromium-harness-self-tests | chromium | a page whose wheel listener stops the step and holds its main thread still splits a burst itself | 3 | 0 |
| webkit-pressure-wheelburst-callers | webkit | a trackpad flick drives the touch column as a finger does: it follows, coasts on at the lift, and co | 1 | 1 |
| webkit-pressure-wheelburst-callers | webkit | a slow trackpad drag that stops rests on the nearest row, without coasting | 1 | 0 |
| webkit-pressure-wheelburst-callers | webkit | with a trackpad, a two-finger scroll at the top pulls and refreshes as a finger does (spec:AST-094 F | 1 | 0 |
| webkit-pressure-wheelburst-callers | webkit | the default: a trackpad swipe pages | 1 | 0 |
| webkit-pressure-wheelburst-callers | webkit | {pages: "item"}: a trackpad swipe pages | 1 | 0 |
| webkit-pressure-wheelburst-callers | webkit | the default: a trackpad swipe pages | 1 | 0 |
| webkit-pressure-wheelburst-callers | webkit | {pages: "item"}: a trackpad swipe pages | 1 | 1 |
| webkit-pressure-trackpad-proofs-x16 | webkit | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch and lets  | 16 | 4 |
| webkit-pressure-trackpad-proofs-x16 | webkit | absorbs what the undecided stretch showed when the fingers carry on: never a step back, and the pan  | 16 | 1 |
| webkit-ci-wheelburst-callers | webkit | a trackpad flick drives the touch column as a finger does: it follows, coasts on at the lift, and co | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | a slow trackpad drag that stops rests on the nearest row, without coasting | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | a trackpad's scroll stops a zoomed photo at its edge, with no give, as a mouse drag does | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | the default: a trackpad swipe pages | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | {pages: "item"}: a trackpad swipe pages | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | the default: a trackpad swipe pages | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | {pages: "item"}: a trackpad swipe pages | 1 | 0 |
| webkit-ci-wheelburst-callers | webkit | with a trackpad, a two-finger scroll at the top pulls and refreshes as a finger does (spec:AST-094 F | 1 | 0 |
| webkit-ci-gestures-spec | webkit | a wheel gesture stays with the pan that took it when the pan moves its element from under a still cu | 1 | 0 |
| webkit-ci-gestures-spec | webkit | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch and lets  | 1 | 0 |
| webkit-ci-gestures-spec | webkit | absorbs what the undecided stretch showed when the fingers carry on: never a step back, and the pan  | 1 | 0 |
| webkit-ci-gestures-spec | webkit | a pan that takes a trackpad's scroll follows a real trackpad scroll along its axis and keeps the pag | 1 | 0 |
| webkit-ci-harness-self-tests | webkit | a wheel burst reaches the page as one run with its whole delta and no gap past the 100 ms a proof al | 3 | 0 |
| webkit-ci-harness-self-tests | webkit | a wheel burst sent slower than its maxGapMs throws WheelPacingError, in both engines | 3 | 0 |
| webkit-ci-harness-self-tests | webkit | a burst whose steps the dispatch spaces past maxGapMs throws WheelPacingError over a page whose list | 3 | 0 |
| webkit-ci-harness-self-tests | webkit | a page whose wheel listener holds its main thread splits a burst itself: never a runner stall | 3 | 0 |
| webkit-ci-harness-self-tests | webkit | a page that draws no frame across a burst's gap splits it itself, with its listeners idle: WheelPage | 3 | 0 |
| webkit-ci-harness-self-tests | webkit | a page whose wheel listener stops the step and holds its main thread still splits a burst itself | 3 | 0 |
| webkit-ci-trackpad-proofs-x6 | webkit | keeps a trackpad pan moving at the fingers' speed through the splitter's undecided stretch and lets  | 6 | 0 |
| webkit-ci-trackpad-proofs-x6 | webkit | absorbs what the undecided stretch showed when the fingers carry on: never a step back, and the pan  | 6 | 0 |

## Reproduce

`double-judge.ts` reads `casts.jsonl`. Put it in `internal/interaction-harness/src` beside a copy of main's `webInput.ts` named `webInput.mainref.ts`, then run it with Vitest. `pages.jsonl` holds the page logs of the two trackpad proofs.
