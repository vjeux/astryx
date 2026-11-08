<!-- Template: bug-fix.md -->
Review only this pull request's change: https://github.com/vjeux/astryx/compare/590d90164198f68d7eea1eddee4cb93e90b69372...b58dab06950db61f5f4b981ccb32501ccb620bb9

## User impact

In Safari on iOS, tapping the composer of a ChatLayout whose `scrollRef` is the document puts it under the status bar. Self-scroll layouts and Chrome on Android are unaffected.

## Problem and solution fit

In a page that scrolls the document, Safari pans the visual viewport to the fixed dock when the keyboard opens, and keeps the pan. ChatLayout also lifts the dock by the keyboard's height, so the two add up. Before the keyboard work, Safari's pan alone put the dock above the keyboard.

Three narrower fixes failed on the Simulator. A lift less Safari's pan made Safari pan again at each change. Re-arming the put-back after ChatLayout's scroll left the pan in place. No lift with the tap claim kept left the composer under the keyboard: Safari then never panned.

## Expected behavior and authority

`spec:AST-099` FR3 puts a docked composer on the keyboard; FR4 keeps focus from panning the page. No put-back undoes Safari's pan here. So FR3 now states that ChatLayout leaves focus and the reveal to the browser in this mode. It needs the spec owners' stamp.

## Smallest restoration

Without the VirtualKeyboard API, in a page that scrolls the document, `useChatKeyboard` lifts the fixed dock nothing. It leaves the tap, focus moves and the reveal to the browser, as before the keyboard work. Firefox for Android takes this path too, unmeasured. Chrome on Android and self-scroll mode are unchanged.

## Evidence

- Reproduction before the change (iOS 26.2 Simulator, #10672's page): a tap puts the dock's top at −102 px in `long`, −138 px in `composer`.
- Result after the change: the dock's bottom meets the keyboard at 377 px.
- Representative unchanged path: `docked`, and every case with no keyboard, read the same on both builds (Testing).
- Regression test or other mutation-sensitive proof: two new `useChatKeyboard.test.tsx` cases fail on main.
- Captures, main above and the fix below (https://github.com/vjeux/astryx/tree/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd):

  ![Keyboard open](https://raw.githubusercontent.com/vjeux/astryx/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd/ios-keyboard-open.png)
  ![No keyboard](https://raw.githubusercontent.com/vjeux/astryx/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd/ios-no-keyboard.png)

## Release check

1. Red-first: the frames and unit cases above. On main the cases read a 300 px lift and a focus takeover.
2. #8176 caused it. After a tap in `long`, the dock's top reads 235 px on 33bc644a (before #8176) and on main with #8176 reverted. It reads −102 px on 695653f5 (#8176) and on the release candidate c99ad4aa.
3. Who sees it: every composer tap in a ChatLayout whose `scrollRef` is the document, in Safari on iOS.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- `useChatKeyboard.test.tsx` adds three cases for a page that scrolls the document. In Safari with a kept pan there is no lift and no room. There is no focus takeover and no composer group. With the VirtualKeyboard API the dock still lifts. The first two fail on main. Chat and keyboard units: 619/619.
- No keyboard: Chromium and WebKit's CI container, phone and desktop, read the same dock and message offsets on both builds. So does the Simulator.
- Core tsc, ESLint, `check:knowledge` and `check:changesets` pass.
- The fix build is 8bb22d9c95 (banked on the fork) with #10672's page applied locally. Its code matches b58dab0695; only the records and `ChatLayout.doc.mjs`'s formatting differ.

## Writing rubric results

`spec:AST-099` FR3: R1–R6 none.
