# BottomSheet PR visuals: before (main) and after, iOS 26.2 Safari

These are screen recordings of the Snap Points BottomSheet story in Mobile Safari on the iOS 26.2 simulator (iPhone 17 Pro), driven by simulated touches. The translucent red dot marks the finger.

Each clip is cropped to the page and encoded at 20 fps, 300 px wide. "Before" is main at the stack's base, and "after" is the PR's own head.

| File | What it shows |
|---|---|
| `gif/tracking-{before,after}.gif` | Drag tracking (#8109). The handle is dragged down 180 pt and back up 60 pt past the start. Before, the sheet trails the finger near detents and stretches above the tallest one. After, it stays under the finger and holds at the tallest detent. |
| `gif/dim-{before,after}.gif` | The dim (#8128). The handle is dragged from tall to below the half detent and back to half. Before, the dim trails the sheet on its own 300 ms easing and is still fading back after the sheet returns. After, it follows the sheet's position at once. |
| `gif/present-dismiss-{before,after}.gif` | Opening, then closing with a tap on the dimmed page (#8203). Before uses the theme's entrance and exit curves. After uses UIKit's sheet springs, with the dim on the same spring. |
| `gif/present-busy-{before,after}.gif`, `gif/dismiss-busy-{before,after}.gif` | The same opening and closing with the main thread blocked for 700 ms, starting just after the motion begins. Both keep moving through the block, since Safari runs both on the compositor. What differs is the curve and the dim. |
| `gif/release-busy-{before,after}.gif` | A slow drag released toward the half detent with a 700 ms block from two frames after the lift. Both settle through the block. |
| `storyboards/*.chromium.png` | The Chromium storyboards from each PR's interaction spec. |

## Path clips (X1 audit, batch 4)

These are labelled clips of every user-visible path each PR claims. They come from iOS 26.2 Mobile Safari on the simulator, driven by simulated touches; the red dot is the finger. Each clip is cropped to the page and encoded at 15 fps, 300 px wide. Each was recorded on the build of the PR it documents.

| File | Paths |
|---|---|
| `paths/8105-releases.gif` | #8105 P1 to P4: a slow drag settles on the nearest detent, a flick lands on the next detent, a flick from half dismisses, the release starts at the finger's speed, and a fast throw takes the 0.8-damped spring. |
| `paths/8105-states.gif` | #8105 P5, P6 and P8 to P10: a finger catches the settling sheet, a drag dismissal, a form sheet (canDismiss false) landing on the peek instead of closing, a settle through a 700 ms block, and Reduce Motion keeping the release springs. |
| `paths/8105-fix-{before,after}.gif` | #8105's hit-test fix. During an upward settle, a tap on the sheet's drawn top lands on the scrim in WebKit's hit test. Before the fix it closes the sheet; after, it catches it. |
| `paths/8109-dismiss-zone.gif` | #8109 P3: tracking 1:1 into the dismiss zone and back. |
| `paths/8128-dim.gif` | #8128 P3 to P8: the release dim in lockstep, the catch, the peek's lighter scrim, a dismissal clearing the dim, a 700 ms block, and Reduce Motion. |
| `paths/8203-entrance.gif` | #8203 P4 and P6: a tap and a grab during the entrance are ignored, a close at 100 ms runs after the landing, and Reduce Motion fades in and out in place. |
