<!-- Template: new-feature.md -->
Stack: #9983 → #8217
Merge group: #9983, #8217

Review only this PR's change: https://github.com/vjeux/astryx/compare/86c74e8c304c69ffe8a5c2d57f591e19c35f3a1d...1fd9e0ed88a71bebaaa51876285faab06e92d09e, https://github.com/vjeux/astryx/compare/6fd4c287f900fc2e262c95da664f2aa6f0578701...680bf29d0c39692335dbde4a1322a39f1d2e82b7 and https://github.com/vjeux/astryx/compare/cc668a0e1bde4f872935b68286dcbb40a62315e1...8a7df57e539ad8bbf6686db12e24458bd7358ec1. Main merges sit between and after; one joins two `spec:AST-094` FR36 edits. The last one moves the bounce inside main's keyboard ride. Its changes beyond a merge by text: https://github.com/vjeux/astryx/compare/52099ae9d10adc25ab68777f3f3f4aa7332df487..{HEAD_FULL}

## User need

In iOS Messages, dragging the conversation to the field, or swiping down on the input bar, puts the keyboard away. ChatLayout kept it up.

## Problem and solution fit

A watcher pan on the root lets the transcript scroll. With a software keyboard up, the field blurs when a touch or pen drag reaches the composer's top. A layer in the dock then bounces once on `springs.keyboard`, from the finger's speed, at most the composer's bottom padding, unless motion is reduced. The composer, frosted layer and scroll-to-bottom button share that layer. Where the dock rides the keyboard down, the bounce plays inside the ride. Under a finger, focus then rests on the composer's group, as after Done.

A drag down from the composer blurs it too, unless a long press began it (caret loupe). While the keyboard is up, the gesture system's page hold cancels one-finger drags that start on the composer, so nothing scrolls under it. Its own scrollers, a pinch and a zoomed page stay the browser's.

## Current specification

- `component:ChatLayout` FR10 and DEC-1, rewritten.
- Owner decision, Nov 5 2026 (Cindy, card 76b): dismiss when the drag reaches the composer, with a brief spring bounce and no follow-the-finger cue. The composer and the scroll-to-bottom button move together.
- Specs decision, Nov 5 2026: a drag that starts on the composer closes the keyboard and never scrolls content under it.
- Specs decisions, Nov 5–6 2026: `spec:AST-094` FR36 and FR37 except ChatLayout's two keyboard dismissals; FR19 lists the composer's hold.

## Public delta and caller burden

No new prop or type. ChatLayout's import grows by 26.3 kB gzip, mostly the gesture system (Testing).

## Design and alternatives

- Dismissing at the lift with an armed follow: rejected in DEC-1.
- Claiming the composer drag: its `touch-action` blocks pinch-zoom.
- Bouncing the dock container: the keyboard's ride owns its translate.

## Evidence

{SIM_EVIDENCE}

## Scope

- [x] One capability is added.
- [x] Unrelated fixes, cleanup, and policy changes were removed or split.
- [x] Consumer docs, focused tests, and migration evidence ship with the feature.
- [x] Public text and artifacts contain no internal Meta context.

## Writing rubric results

`component:ChatLayout`: R4, DEC-1's two one-line rejections; others none. `spec:AST-094` FR19, FR36, FR37 and FR43 lines and `spec:AST-099` paths: R1–R6 none.

## Testing

Behavior module: ChatLayout transcript dismissal (transcriptDismiss.ts)

ChatLayout's import, bytes (core build, esbuild, minified, React and StyleX external):

| | main (def46d15d9) | this change ({HEAD10}) |
| --- | ---: | ---: |
| minified | 227,334 | 316,236 |
| gzip | 77,244 | 103,565 |

The gesture system's pan, host and page hold make 75 kB of the minified growth.

- Red-first for the last merge: on a merge by text alone, with this head's tests (ede59fb9d2), the Chrome-profile crossing case fails 5 of 5. The dock jumps 320.9 px in one 17 ms frame as the bounce ends, because the bounce hid the keyboard's ride. At this head it passes 20 of 20, with 1 worker and with 4.
- Red-first: on a build of 1fd9e0ed88, the browser spec's 4 crossing and composer cases fail in Chromium (2 of 2 runs) and in WebKit. On a build of 39a9502ca7, the pinch case fails in both engines: every two-finger move was cancelled. On a build of d19cf698ec's code, the drifting-strip case fails in both engines (Chromium 2 of 2): every move went through.
- The bounce case samples the dock's animation paused at each frame. WebKit reads a running animation at each call, and a starved page paints few frames. Under CPU load in the WebKit container, the per-frame version failed 7 of 80 runs; this one passed 40 of 40.
- At this head, the dismissal spec: Chromium 14/14; WebKit in the CI profile (`--cpus=4`, `CI=1`, `LP_NUM_THREADS=4`, 1 worker), 10 runs: 120 passed, 20 skipped (pen and Chrome profile, Chromium-only). Main's keyboard spec: Chromium {KBD_CHROMIUM}; WebKit 10 runs {KBD_WEBKIT}.
- Units: `transcriptDismiss.test.ts` 32/32, `ChatLayoutTranscriptDismiss.test.tsx` 23/23, `composerBounce.test.ts` 6/6, `useChatKeyboard.test.tsx` 31/31, `dragAxes` 2/2. The theme-mark case fails on 9d66f5f3ad's source, and two strip cases on d19cf698ec's. Two cases cover a node made in another window; each fails with `instanceof` in place of `isNode` or `isElement`.
- On today's main, 955564d284's code fails Core's typecheck (`isNodeTarget` is gone) and its Storybook build. This head passes both.
- Mutants, each caught. A dismissal at the lift fails 11 units and two Chromium cases. A bounce on the composer alone fails the button case. A bounce on the dock container fails the Chrome-profile case (the merge by text above). Without the page hold, 4 units and both composer drags in Chromium fail. Without the composer pan, the drag down fails. A bounce at twice the finger's speed fails 3 units. Ignoring composer scrollers fails 2 units and the strip case. Dropping the long-press exception, the zoom check or the keyboard check fails 1 unit each. Counting a drift as the strip's axis fails 2 units and the drifting case.
{SIM_TESTING_LINE}
- At this head: test:ui {UI} and test:node {NODE} passed; Chat accessibility specs {A11Y}. Core tsc, ESLint, `pnpm review:pre` and the repo checks (`sync:exports:check`, `verify-exports`, `check:repo`, `check:token-docs`, `check:motion-roles`, `check:changesets`, `check:knowledge`) pass.
- Preview at this head: {PREVIEW}

