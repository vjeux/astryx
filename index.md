# #12216 and #12179 side-by-sides on real phones, an emulator and desktop Chromium (test numbers)

#12216: new a9e89138156d239dd79378a7dc6a08e6c849be7c, old fedd05187b92ebe704e2641cec5bae28261a54a9. #12179: new 67dc9e9414d745a48bb5af57aba153897ffebeb2, old 414ea36ad5fcfa337d5630c539783c946d7d4a96. All numbers are test measurements.

**Verdict: no major difference.** Every pass rule gives the same result on both heads, on every device and profile.

**One difference, in focus after a close, on the iPhone only.** In #12179 row (d) in Safari, the empty-space tap closes the menu on both heads. Focus then goes back to the Secondary trigger at the new head (3/3), but to the page body at the old head (3/3).
- **Isolation: the difference is not main's #13155.** Main c1edfa4d (its own deploy: version.json c1edfa4d, on the phone) contains #13155 and not #12179. It leaves focus on the page body in 3/3 takes, the same as the old head.
  - Same-unit controls, interleaved: old 414ea36a gives the page body (1/1); new a9e89138 gives Secondary (1/1).
  - iPhone 14 unit C, Safari, the same driver and the same empty point.
  - So the return of focus to the trigger comes from the stack on top of main: a9e89138 is main c1edfa4d plus #12179 and #12216.
- **From the code:** this is #12216's outside hold. The tap's compatibility mouse events no longer reach the page, so the returned focus stays on the trigger.
  - The holdInput 'outside' scope exists only from #12216.
  - At 414ea36a and on main, the tap's compatibility mousedown lands on the empty area and moves focus to the body.
- Android shows no such difference: the Pixel gives Secondary on both heads, and the emulator gives the page body on both.

**Row (g): no difference is expected.** A mouse press outside moves focus at its `mousedown`, before the close. So main's focus-return change, #13555, does not reach this cell.
- The old head fedd0518 does not contain #13555's commit b29bc4d4; the new head a9e89138 does. On both heads, focus stays on the clicked control.

## Heads and builds

**#12216.**
- New head a9e89138; old head fedd0518.
- Rows (e) and (f) ran on each head's preview.
- Row (g) ran on local static builds of the same two commits.

**#12179.**
- New head 67dc9e94; old head 414ea36a.
- 67dc9e94's preview failed to deploy. So the physical rows (Pixel, iPhone) ran on #12216's preview at a9e89138.
- a9e89138 merges #12179's head 67dc9e94 into #12216, so it holds all of 67dc9e94.
- The emulator rows ran on a static build of 67dc9e94, against a static build of 414ea36a.

**version.json reads.**
- Pixel, emulator and host Chromium: read in the page on every take.
- iPhone: read on the phone for each preview (a9e89138, fedd0518, 414ea36a).

## Devices and profiles

- **Pixel 8 P1** (Android 17, Chrome 157): profiles N and S.
- **Pixel 8 P3** (Android 17, Chrome 156): profile R. The page read prefers-reduced-motion as true on every R take.
- **Android emulator** (Android 17, Chrome 145, software GPU): N, R and S.
- **iPhone 14** (iOS 26.2): unit A for (f), unit B for #12179's rows, and unit C for the isolation control.
- **Host Chromium** (Chrome for Testing 158.0.8127.36, headless, 1280x800): a real CDP mouse.

**Method.**
- 3 takes per head per row per profile, interleaved new, old, old, new, new, old. (f) and (g) use the take counts in their tables.
- Each take is a fresh page load.
- document.activeElement is read about 300 ms after every close.
- Each row's own reads are below.
- N is the phone as is, R removes animations, and S throttles the CPU 4×.

## #12216

**(e) Submenu story on Pixel.** Tap "Actions", wait for "Move to" plus 600 ms, then inject "Beneath" (trusted-event log).

| profile | tap: menu closes, outsideLog [] | pan: closes during the drag, outsideLog [], scrollY > 0 | close ms after the down (drag ms) | scrollY px | focus after close |
|---|---|---|---|---|---|
| N new | 3/3 | 3/3 | 178–190 (290–291) | 230–231 | "Actions" button |
| N old | 3/3 | 3/3 | 187–202 (289–292) | 229–231 | "Actions" button |
| S new | 3/3 | 3/3 | 229–243 (297–299) | 205–211 | "Actions" button |
| S old | 3/3 | 3/3 | 225–240 (295–300) | 202–211 | "Actions" button |
| R new | 3/3 | 3/3 | 244–255 (290–295) | 227–234 | "Actions" button |
| R old | 3/3 | 3/3 | 240–251 (291–293) | 229–232 | "Actions" button |

**(f) Outside-tap-reaches-nothing story on the iPhone.** Tap "Actions", wait 600 ms. Counters are the page's own outputs, read from the accessibility tree. Both heads are the same on every take.

| host | action (takes per head) | menu | counters after |
|---|---|---|---|
| Safari | tap over the Notifications switch (2) | closes | Switch acts: 0 |
| Safari | tap the Volume slider track (2) | closes | Slider acts: 0 |
| Safari | vertical pan on the list (2) | closes | scroll offset 139–142 px in the same gesture |
| Home Screen app | switch tap, slider tap, pan (1 each) | closes | 0 / 0 / 139–142 px |
| Home Screen app | tap "Swipe this row" (1) | closes | row inert |
| Home Screen app | horizontal swipe across the row (2) | closes | Swipes: 0 |
| no menu open | switch tap in Safari (1) | – | Switch acts: 1 |
| no menu open | row swipe in the Home Screen app (1) | – | Swipes: 1 |

The no-menu row swipe ran in the Home Screen app. In the Safari tab, the row sits below the visible area.

**(g) The #13555 cell, host Chromium with a mouse.** Click "Actions", then click the control.

| target (takes per head) | new a9e89138 | old fedd0518 |
|---|---|---|
| Notifications switch (2) | closes; Switch acts: 1; focus on the switch | closes; Switch acts: 1; focus on the switch |
| Slider thumb (2) | closes; Slider acts: 0; focus on the slider | closes; Slider acts: 0; focus on the slider |
| Extra: slider track, away from the thumb (2) | closes; Slider acts: 1; focus on the slider | the same |

- After the mouse open, focus is on the menu on both heads.
- Focus stays on the clicked control 1.2 s after the click on both heads.
- A click on the thumb does not change the slider's value on either head. A click on the track does.

## #12179, button-variants story

Pixel P1 N and S, Pixel P3 R, and emulator N, R and S. Every row passes 3/3 on both heads in every profile.

| row | pass rule | both heads | focus after close |
|---|---|---|---|
| (a) held pick | Secondary's menu closed; Ghost aria-expanded false; no click on Ghost | 3/3 every profile | Secondary |
| (b) ghost.click() 50 ms after the pick's pointerup | Ghost's menu opens | 3/3 every profile | the "Option 1" menu item |
| (c) click() on Option 2 | the menu closes | 3/3 every profile | Secondary |
| (d) open, then tap empty space | rows visible, then closed; no focus ring; trigger rect unchanged | 3/3 every profile | Pixel: Secondary; emulator: page body |

- In (b), the page ran ghost.click() 50–51 ms after the pointerup at N and R. At S it ran 74–119 ms after it, as the 4x CPU throttle slows timers. It was the same on both heads.

**iPhone 14 unit B, 3 takes per head:**

| row | Safari tab | Home Screen web app |
|---|---|---|
| (a) held pick | 3/3 both heads: Secondary's menu closed; Ghost not expanded; no click on Ghost; focus on Secondary | 3/3 both heads: Secondary's menu closed and no second menu (accessibility tree) |
| (b) ghost.click() 50 ms after the pick's pointerup | 3/3 both heads: Ghost's menu opens; the page click ran 50–51 ms after the pointerup; focus on the "Option 1" item | – (needs page script) |
| (c) click() on Option 2 | 3/3 both heads: the menu closes; focus on Secondary | – (needs page script) |
| (d) open, then tap empty space | 3/3 both heads: closes; trigger rect unchanged (32,376,128,33). Focus: new head Secondary 3/3, old head page body 3/3 | 3/3 both heads: closes; trigger rect unchanged (32,405,128,33) |

- In the Home Screen app there is no page script, so document.activeElement, aria-expanded and the click log cannot be read there.
- The first iPhone unit timed out at about 72 min. All #12179 iPhone takes above ran on a fresh unit.
- Two driver errors were redone on that unit. In row (c), the driver expected open rows the page script had already closed. In row (d), the Safari tab's empty tap first landed on the browser's own toolbar at y 760. It was redone at the page point (330,650).

## No-sheet check, for main's bottom-sheet change #11611 (7111951a43)

Every opened surface is a popover menu, never a sheet, on both heads.
- Pixel: button-variants 124x82 at x 32; submenu 129x120; outside-tap-reaches-nothing 103x120. The viewport is 412 wide.
- iPhone: the outside-tap-reaches-nothing rows are 96 pt wide at x 39 on a 390-pt screen, in Safari and in the Home Screen app.
- iPhone: button-variants rows are 120 pt wide at x 36 on a 390-pt screen, in Safari and in the Home Screen app.

## Driver notes

- **Emulator.** Takes keep Chrome running between takes; each take is still a fresh page load. After every Chrome restart, the software-GPU emulator stalled the menu's entrance animation for more than 0.6 s, and an outside tap during it did nothing. This happened on both heads. On the emulator, each row's rects are read again after the 600 ms settle, and the menus' final state is read at about 1.5 s.
- **Pixel.** Chrome restarts before every take, and the reads are at about 300 ms.
- **iPhone #12179 rows.** A bookmarklet logs events and reads focus in Safari. Rows (b) and (c) need page script, so they run in Safari only. In the Home Screen app, the reads come from the accessibility tree.
