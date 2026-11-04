---
'@astryxdesign/core': patch
---

[feat] ContextMenu under a finger: after a long press opens the menu, the same finger may slide onto an action without lifting, as on iOS. Lifting over an action picks it, and lifting over no action leaves the menu open. The finger picks only after it has moved 10 px in the open menu, so a still lift picks nothing.

@vjeux
