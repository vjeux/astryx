---
'@astryxdesign/core': patch
---

[fix] `useChatNewMessages`, which `ChatLayout` uses, reads `isLocked` and `onResize` as last committed. A render that React discards, as a suspended transition does, no longer has its `onResize` called on the next resize. It also no longer flags new messages while the list follows the bottom.

@vjeux
