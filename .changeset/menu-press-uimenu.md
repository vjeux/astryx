---
'@astryxdesign/core': patch
---

[feature] A finger on a DropdownMenu or MoreMenu trigger follows UIMenu, on every touch device: resting on the trigger opens the menu after 150 ms, UIKit's delay, instead of 500 ms. To keep 500 ms, pass `longPressDelayMs: 500` to `useMenuPress`. Inside a scrolling region the scroll view's content-touch delay (150 ms) comes first and is added to any delay, a caller's own value included (300 ms by default). The finger that opened the menu picks a row only after it has moved 10 px, so a menu that appears under a resting finger never picks the row beneath it. A mouse keeps its settle rule. `useMenuPress` gains `continueGesture` for a pointer that went down elsewhere (a context menu's long press).

@vjeux
