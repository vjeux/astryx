---
'@astryxdesign/core': patch
---

[feat] ContextMenu where the primary pointer is coarse and `presentation` is unset: after the held finger opens the menu at the finger, the same finger may slide onto an action without lifting, as on iOS. Lifting over an action picks it, and lifting over no action leaves the menu open. The finger picks only after it has moved 10 px in the open menu, so a still lift picks nothing.

@vjeux
