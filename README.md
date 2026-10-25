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

## Side by side (review wave)

Before (main) and after in one clip, started together at the same input: the same iOS 26.2 Mobile Safari simulator runs, each cropped to the page. The thin blue line marks a detent's top.

| File | Shows |
|---|---|
| `cmp/8109-tracking.gif` | #8109: the same drag down and back up past the tallest detent. Before, the sheet trails the finger near a detent and stretches above the tallest; after, it stays under the finger and holds at the line. |
| `cmp/8128-dim.gif` | #8128: the same drag 100 pt below the half detent and release. Before, the dim clears 40 % of the way down; after, it thins in a straight line to the bottom, then rides the release back. |

`paths/8105-releases.gif` and `paths/8105-states.gif` were relabelled: P4 names its 3 px overshoot and P8 names canDismiss false.

## One touch model (Oct 24)

The stack now keys every touch behavior on a coarse primary pointer, iOS and Android alike (AST-094, #8316). These clips were recorded on each PR's head after that change.

iOS 26.2 Mobile Safari on the simulator, labelled, 15 fps, 300 px wide, cropped to the page:

| File | Paths |
|---|---|
| `ios/8105-releases.gif` | #8105 P1 to P4: a slow drag settles on the nearest detent; a flick from tall lands on half, and from half the same flick dismisses; the release starts at the finger's speed; a fast throw takes the 0.8-damped spring. |
| `ios/8105-states.gif` | #8105 P5, P6, P8 to P10: a finger catches the settling sheet; a drag dismissal; a sheet that can't be dismissed lands on its peek; a settle through a 700 ms block; under reduced motion the release fades in place. |
| `ios/8128-dim.gif` | #8128 P3 to P8: the dim rides the release; a catch holds it; a peek keeps its lighter scrim; a dismissal clears it; a 700 ms block; under reduced motion it fades with the sheet. |
| `ios/8203-entrance.gif` | #8203 P4 and P6: a tap and a grab during the entrance are ignored, a close at 100 ms runs after the landing; under reduced motion the sheet fades in and out in place. |

Chrome 124 on an Android 15 emulator (a 1080 × 2400 panel), 540 × 1200 screen recording, cropped to the page, 30 fps, 270 px wide. Each clip passes the gap gate: no frame gap over 40 ms while the sheet moves.

| File | Path |
|---|---|
| `android/8203-present-dismiss.gif` | #8203: a tap opens the sheet on the present spring; a tap on the dim closes it on the dismiss spring. |
| `android/8105-flick-dismiss.gif` | #8105: from half, a flick dismisses on the release spring. |
| `android/8109-tracking.gif` | #8109: the sheet follows the finger 1:1 down from tall, then settles on half. |

Chromium 158 on the same Android 15 emulator (a 720 × 1600 panel), with a finger drag of one move per frame; 540 × 1200 recording, cropped to the page, 30 fps, 270 px wide, each under the gap gate. Each clip's `.take.json` names the emulator image, browser and panel it used.

| File | Path |
|---|---|
| `android/8105-slow-settle.gif` | #8105: a slow drag down from tall follows the finger; let go, the sheet settles on the half detent. |
| `android/8128-dim-drag.gif` | #8128: a drag 130 px below the half detent thins the dim with the sheet; let go, both spring back. |
