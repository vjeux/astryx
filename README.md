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
