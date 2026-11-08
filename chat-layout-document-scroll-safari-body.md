<!-- Template: bug-fix.md -->
Review only this pull request's change: https://github.com/vjeux/astryx/compare/590d90164198f68d7eea1eddee4cb93e90b69372...b143b86c013388987e2233f091ff900c31712af1

## User impact

In Safari on iOS, tapping the composer of a ChatLayout whose `scrollRef` is the document puts it under the status bar.

## Problem and solution fit

In a page that scrolls the document, Safari pans the visual viewport to the fixed dock when the keyboard opens, and keeps the pan. ChatLayout also lifts the dock by the keyboard's height, so the two add up. Before the keyboard work, Safari's pan alone put the dock above the keyboard.

Three narrower fixes failed on the Simulator. A lift less Safari's pan made Safari pan again at each change. Re-arming the put-back after ChatLayout's scroll left the pan in place. No lift with the tap claim kept left the composer under the keyboard: Safari then never panned.

## Expected behavior and authority

`spec:AST-099` FR3 puts a docked composer on the keyboard; FR4 keeps focus from panning the page. No put-back undoes Safari's pan here. So FR3 now states that ChatLayout leaves focus and the reveal to the browser in this mode. It needs the spec owners' stamp.

## Smallest restoration

Without the VirtualKeyboard API, when `scrollRef` names the document's root or body, `useChatKeyboard` lifts the fixed dock nothing. It leaves the tap, focus moves and the reveal to the browser, as before the keyboard work. An inner scroller keeps the lift. Chrome keeps its ride: it has `navigator.virtualKeyboard`. Self-scroll mode is unchanged.

## Evidence

- Reproduction before the change (iOS 26.2 Simulator, #10672's page): a tap puts the dock's top at −102 px in `long`, −138 px in `composer`.
- Result after the change: the dock's bottom meets the keyboard at 377 px.
- Representative unchanged path: `docked`, and every case with no keyboard (Testing).
- Regression test or other mutation-sensitive proof: two new `useChatKeyboard.test.tsx` cases fail on main.
- Captures, main above and the fix below (https://github.com/vjeux/astryx/tree/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd):

  ![Keyboard open](https://raw.githubusercontent.com/vjeux/astryx/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd/ios-keyboard-open.png)
  ![No keyboard](https://raw.githubusercontent.com/vjeux/astryx/7f86aa36d52aeefe840cdb2d6ce1e16abae4e1bd/ios-no-keyboard.png)

## Release check

1. Red-first: the frames and unit cases above.
2. #8176 caused it. After a tap in `long`, the dock's top reads 235 px on 33bc644a (before #8176) and on main with #8176 reverted. It reads −102 px on 695653f5 (#8176) and on the release candidate c99ad4aa.
3. Who sees it: every composer tap in a ChatLayout whose `scrollRef` is the document, in Safari on iOS.

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- `useChatKeyboard.test.tsx` adds four cases. For the document in Safari, with a kept pan, there is no lift and no room, and no focus takeover or composer group. Both fail on main. An inner scroller keeps the lift and the takeover; that fails on fa8cf7b82c. With the VirtualKeyboard API the dock still lifts. Chat and keyboard units: 620/620.
- No keyboard: Chromium and WebKit's CI container, phone and desktop, read the same dock and message offsets on both builds. So does the Simulator.
- Measured in Safari on iOS in the browser only. The iOS home-screen app and Firefox for Android take the same code path, unmeasured, and the docs claim neither.
- Core tsc, ESLint, `check:knowledge` and `check:changesets` pass.
- The frames come from 8bb22d9c95 (banked on the fork) with #10672's page applied locally; its code matches fa8cf7b82c. A build of b143b86c01's code reads the same on the Simulator. The dock's top sits at 235 px in `long` and 199 px in `composer`.

## Writing rubric results

`spec:AST-099` FR3, FR9's docked-container clause and the FR3–FR4 verification row: R1–R6 none.
