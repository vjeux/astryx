<!-- Template: bug-fix.md -->
Review only this pull request's change: https://github.com/vjeux/astryx/compare/4e4c12a9dd528d879b684ea7838ed2522c9cbc75...259a2d4ff258e71a189664fd6ae9047cc2eaf432

## User impact

In Safari on iOS, tapping the composer of a ChatLayout whose `scrollRef` is the document puts it under the status bar.

## Problem and solution fit

In a page that scrolls the document, Safari pans the visual viewport to the fixed dock when the keyboard opens, and keeps the pan. ChatLayout's lift adds to it. Firefox for Android does not pan, so it needs that lift.

Three narrower fixes failed on the Simulator. A lift less Safari's pan made Safari pan again at each change. Re-arming the put-back after ChatLayout's scroll left the pan in place. No lift with the tap claim kept left the composer under the keyboard: Safari then never panned.

## Expected behavior and authority

`spec:AST-099` FR3 puts a docked composer on the keyboard; FR4 keeps focus from panning the page. FR3 and FR4 now name the exception for Safari on iOS, with a Firefox verification row and Gap 16 for a first keyboard show. They need the spec owners' stamp.

## Smallest restoration

When `scrollRef` names the document's root or body, without the VirtualKeyboard API, the first keyboard show leaves focus to the browser. A pan to the dock means no lift. A dock still covered after 40 still frames (3 s at most) rises, and that page then works as on main. Chrome and self-scroll mode are unchanged.

## Evidence

- Reproduction before the change (iOS 26.2 Simulator, #10672's page): a tap puts the dock's top at −102 px in `long`, −138 px in `composer`.
- Result after the change: the dock's bottom meets the keyboard at 377 px.
- Representative unchanged path: `docked`, and every case with no keyboard (Testing).
- Regression test or other mutation-sensitive proof: new `useChatKeyboard.test.tsx` cases on scripted frames fail on main (Testing).
- Captures, main first; the README maps each (https://github.com/vjeux/astryx/tree/62fa9ee1e0302e27c76b3cbd03d3632f6e6a6256):

  ![Keyboard open](https://raw.githubusercontent.com/vjeux/astryx/62fa9ee1e0302e27c76b3cbd03d3632f6e6a6256/ios-keyboard-open.png)
  ![No keyboard](https://raw.githubusercontent.com/vjeux/astryx/62fa9ee1e0302e27c76b3cbd03d3632f6e6a6256/ios-no-keyboard.png)
  ![Home-screen app, main and fix](https://raw.githubusercontent.com/vjeux/astryx/62fa9ee1e0302e27c76b3cbd03d3632f6e6a6256/ios-home-screen-main-fix.png)
  ![Home-screen app, every entry path](https://raw.githubusercontent.com/vjeux/astryx/62fa9ee1e0302e27c76b3cbd03d3632f6e6a6256/ios-home-screen-app.png)

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

- `useChatKeyboard.test.tsx` drives scripted frames and visual-viewport values, with no clock:
  - No pan with a 290 px keyboard: no lift for 10 frames, then 290 after 40 still frames. The next show lifts at once, with the focus takeover.
  - A pan of 337 within the wait: no lift, no takeover, at that show and the next.
  - Already revealed at the report with no pan: no lift, and nothing learned.
  - A pan after the wait drops the lift once. A busy device waits frames, not time, up to the 3 s cap.
  - Two windows learn on their own. With the VirtualKeyboard API nothing is learned and the dock lifts as before.
  - All but the already-revealed case fail on main; the Firefox cases fail on fa8cf7b82c. Chat and keyboard units: 628/628.
- No keyboard: Chromium and WebKit's CI container, phone and desktop, read the same dock and message offsets on both builds. So does the Simulator.
- The iOS home-screen app, on the Simulator: a tap, Done, Previous and Next from a probe field, and `focus()`. With the fix, each keyboard route rests the composer on the keyboard, and Done leaves no group. On main, a tap and Next put it off screen.
- Core tsc, ESLint, `check:knowledge` and `check:changesets` pass.
- The frames come from 8bb22d9c95 (banked on the fork) with #10672's page applied locally. A build of 259a2d4ff2's code reads the same in Safari on the Simulator: the dock's top sits at 235 px in `long` and 199 px in `composer`.

## Writing rubric results

`spec:AST-099` FR3, FR4, FR9's docked-container clause, the Firefox verification row and Gap 16: R1–R6 none.
