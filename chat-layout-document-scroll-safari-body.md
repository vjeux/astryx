<!-- Template: bug-fix.md -->
Review only this pull request's change: https://github.com/vjeux/astryx/compare/590d90164198f68d7eea1eddee4cb93e90b69372...cd2f76b7616f8f4c9ed6ca1ab65596f06da190bc

## User impact

In Safari on iOS, tapping the composer of a ChatLayout whose `scrollRef` is the document puts the composer under the status bar. Self-scroll layouts and Chrome on Android are not affected.

## Problem and solution fit

In a page that scrolls the document, Safari pans the visual viewport to the fixed dock when the keyboard opens, and keeps the pan. ChatLayout also lifts the dock by the keyboard's height, so the two add up. Before the keyboard work, Safari's pan alone put the dock above the keyboard.

## Expected behavior and authority

`spec:AST-099` FR3 puts a docked composer on the keyboard, and FR4 keeps focus from panning the page. No put-back undoes Safari's pan here. So this change records Gap 13: in this mode, ChatLayout leaves the composer's focus and reveal to Safari. It needs the spec owners' stamp.

## Smallest restoration

Where no layout guide publishes the keyboard's slide and the page scrolls the document, `useChatKeyboard` lifts the fixed dock nothing. It leaves the composer's tap, focus moves and reveal to the browser, as before the keyboard work. Chrome on Android and self-scroll mode are unchanged.

## Evidence

- Reproduction before the change, on the iOS 26.2 Simulator with #10672's page: a tap puts the dock's top under the status bar. It reads −102 px in `long` and −138 px in `composer`.
- Result after the change: the dock's bottom meets the keyboard at 377 px.
- Representative unchanged path: `docked` reads the same on both builds, and so does every case with no keyboard (Testing).
- Regression test or other mutation-sensitive proof: two new `useChatKeyboard.test.tsx` cases fail on main.
- Captures, main above and the fix below (https://github.com/vjeux/astryx/tree/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd):

  ![Keyboard open](https://raw.githubusercontent.com/vjeux/astryx/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd/ios-keyboard-open.png)
  ![No keyboard](https://raw.githubusercontent.com/vjeux/astryx/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd/ios-no-keyboard.png)

## Release check

1. Red-first: the frames and unit cases above. On main the cases read a 300 px lift instead of 0, and a focus takeover.
2. #8176 caused it. After a tap in `long` on the Simulator, the dock's top reads 235 px on 33bc644a (before #8176). It reads −102 px on 695653f5 (#8176) and on the release candidate c99ad4aa. Main with #8176 reverted locally reads 235 px.
3. Who sees it: every composer tap in a ChatLayout whose `scrollRef` is the document, in Safari on iOS. Firefox for Android also returns to the behavior from before #8176.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- `useChatKeyboard.test.tsx` adds three cases for a page that scrolls the document. In Safari with a kept pan there is no lift and no room. There is no focus takeover and no composer group. With the VirtualKeyboard API the dock still lifts. The first two fail on main. Chat and keyboard units: 619/619.
- No keyboard: Chromium and WebKit's CI container, at 390 × 844 and 1280 × 800, read the same dock and message offsets on both builds. So does the Simulator.
- Core tsc, ESLint, `check:knowledge` and `check:changesets` pass.
- The fix build is 8bb22d9c95 with #10672's page applied locally. Its code matches cd2f76b761, which only restores `ChatLayout.doc.mjs`'s formatting.

## Writing rubric results

`spec:AST-099` Gap 13: R1–R6 none.
