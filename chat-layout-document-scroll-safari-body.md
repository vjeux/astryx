<!-- Template: bug-fix.md -->
Review only this pull request's change: https://github.com/vjeux/astryx/compare/0d755730457931688c2a51408fb142593aa49306...8e190c33e06545599b04fa0cd23a2d8dc8fe4bbb

## User impact

In Safari on iOS, tapping the composer of a ChatLayout whose `scrollRef` is the document puts it under the status bar.

## Problem and solution fit

In a page that scrolls the document, Safari pans the visual viewport to the fixed dock when the keyboard opens, and keeps the pan. ChatLayout's lift adds to it. Firefox for Android pans at some shows only, so it needs that lift at the others.

Three narrower fixes failed on the Simulator. A lift less Safari's pan made Safari pan again at each change. Re-arming the put-back after ChatLayout's scroll left the pan in place. No lift with the tap claim kept left the composer under the keyboard: Safari then never panned.

## Expected behavior and authority

`spec:AST-099` FR3 puts a docked composer on the keyboard; FR4 keeps focus from panning the page. FR3 and FR4 now name two exceptions: Safari on iOS, and the shows before one leaves the composer covered elsewhere without the VirtualKeyboard API. Three Firefox rows and Gaps 16 and 17 cover them. They need the owners' stamp at this head.

## Smallest restoration

Where `scrollRef` names the document's root or body, without the VirtualKeyboard API, shows leave focus to the browser until one finds the dock covered. The keyboard module's reveal-pan watch decides it, under a new opt-in `dock` option. The dock holds while the browser's reveal runs; a pan to the dock means no lift. A dock still covered after 0.7 s rises, and a clean show teaches the page to work as on main. After a touch or a wheel, the dock rises by the cover the pan leaves. Where the layout viewport follows the pan, as in Safari, it holds. Chrome and self-scroll mode are unchanged.

## Evidence

- Reproduction before the change (iOS 26.2 Simulator, #10672's page): a tap puts the dock's top at −102 px in `long`, −138 px in `composer`.
- Result after the change: the dock's bottom meets the keyboard at 377 px.
- Representative unchanged path: `docked`, and every case with no keyboard (Testing).
- Regression test or other mutation-sensitive proof: new scripted-time cases fail on main, and removing any gate fails its case (Testing).
- Captures, main first; the README maps each (https://github.com/vjeux/astryx/tree/f2732673f1409e230ae6ee02d6a3b4740adb0264):

  ![Keyboard open](https://raw.githubusercontent.com/vjeux/astryx/f2732673f1409e230ae6ee02d6a3b4740adb0264/ios-keyboard-open.png)
  ![No keyboard](https://raw.githubusercontent.com/vjeux/astryx/f2732673f1409e230ae6ee02d6a3b4740adb0264/ios-no-keyboard.png)
  ![Home-screen app, main and fix](https://raw.githubusercontent.com/vjeux/astryx/f2732673f1409e230ae6ee02d6a3b4740adb0264/ios-home-screen-main-fix.png)
  ![Home-screen app, every entry path](https://raw.githubusercontent.com/vjeux/astryx/f2732673f1409e230ae6ee02d6a3b4740adb0264/ios-home-screen-app.png)

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- `useChatKeyboard.test.tsx` and `keyboardHeight.test.ts` script time, touches and visual-viewport values:
  - No pan with a 290 px keyboard: no lift at 699 ms, then 290 at 700 ms after the report. The height reports of the keyboard's slide don't extend the wait. The next show lifts at once, with the focus takeover.
  - A pan decides only its own show. After a pan at 108 ms, the next show with no pan lifts at 700 ms and teaches the page. The show after lifts at once.
  - A drag unwinds Firefox's pan from 290 to 0: the dock's translate follows 90, 190 and 290, keeping the composer on the keyboard. Nothing is laid out and no scroll is read until the finger lifts; then the layout takes 290 once.
  - A fling that pans only the visual viewport is laid out once at its scroll end, with no lifted finger.
  - A slow drag of 0.3 px per report lays out nothing until the finger lifts, then once.
  - A composer show under a pinch zoom teaches nothing.
  - After a show learns the cover, a pan to the dock before any input goes back. The next show still lifts at once, with reduced motion too.
  - Safari's model, where `innerHeight` grows as the pan unwinds through a slow drag to the page's top: the lift stays 0, with no translate.
  - A caret reveal while typing, and a show for a field outside the composer, each have a case.
  - The tap claim, `focus()`'s reveal and the put-back each have a case before and after a page learns the dock is covered. Removing any one gate fails its case.
  - With the option off, the reveal-pan watch reports and listens as before; one visual-viewport read per report stays (INV11).
  - The cases fail on main. Chat, keyboard, utils and BottomSheet units: 2423/2423.
- Safari on the iOS 26.2 Simulator, in scripted traces at 729784099d (browser and home-screen app): a tap, then drags with the keyboard up. The dock's applied lift is 0 px on every frame, and it never flips direction within 100 ms, as on 33bc644a. Safari's own slide on a slow drag toward the top stays as in earlier releases (Gap 17, #10718).
- In Firefox, while a scroll moves the pan after input, each report moves only the dock's translate. The layout takes the lift when the last finger lifts. After a fling, it takes it again when the fling comes to rest.
- Firefox for Android in the emulator, at a64d445a42, with animations at normal scale, slow and removed:
  - Scroll, fling and scroll back with the keyboard up: the composer stays on the visual viewport's bottom, worst −0.5 px, as on main.
  - First show: covered 668 to 814 ms before the lift at normal scale, and 675 ms with animations removed (main: 0 ms). In two takes Firefox's own pan revealed it at 155 and 188 ms. Each is within Gap 16's wait, which ends at 3 s at most.
  - Second show: 0 ms at normal and slow scale, as on main. With animations removed, one of three takes was covered 599 ms.
  - Frame times during the follow: p50 17 to 21 ms against main's 17 to 19 ms, with p95 and max overlapping. Chrome for Android, the control: p50 24 ms against main's 24.5 ms. No added long frames at any scale.
- No keyboard: Chromium and WebKit's CI container, phone and desktop, read the same dock and message offsets on both builds. So does the Simulator.
- The iOS home-screen app, on the Simulator, on a build of d0516270ff: a tap, Done, Next from a probe field, and `focus()`. Each keyboard route rests the composer on the keyboard, and Done leaves no group. On main, a tap and Next put it off screen.
- Core tsc, ESLint, `check:knowledge` and `check:changesets` pass.
- The browser frames come from 8bb22d9c95 (banked on the fork) with #10672's page. A build of d0516270ff reads the same in Safari: 235 px in `long`, 199 px in `composer`.

## Release check

1. Red-first: the frames and unit cases above.
2. #8176 caused it. After a tap in `long`, the dock's top reads 235 px on 33bc644a (before #8176) and on main with #8176 reverted. It reads −102 px on 695653f5 (#8176) and on the release candidate c99ad4aa.
3. Who sees it: every composer tap in a ChatLayout whose `scrollRef` is the document, in Safari on iOS.
4. The cost is in Firefox for Android. A page's first show that leaves the composer covered keeps it so for about 0.7 s. That was 731 to 755 ms on a slow device at df30dc50e0, and 668 to 814 ms at a64d445a42. Later shows lift at once. Chrome never takes this path. The follow-up is #10703.
5. Safari on iOS keeps its own slide on a slow scroll toward the top, as in earlier releases (Gap 17, #10718). Chrome's intermittent late pan in the `long` case predates this change (#10713).

## Writing rubric results

`spec:AST-099` FR3, FR4, FR9's docked-container clause, the three Firefox rows, and Gaps 16 and 17:

- R2: Gap 16 states measured values: Safari's pan on the Simulator (0 to 400 ms) and Firefox's slow-device cover (731 to 755 ms). Kept: Spec owners' ruling, 2026-11-08.
- R4: Gaps 16 and 17 each give one line on the alternative not taken. They are a lift then a drop, and a lift that chases Safari's reveal. Kept: one line each, inside the gap.
- R1, R3, R5, R6: none.
