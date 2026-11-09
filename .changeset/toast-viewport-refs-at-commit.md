---
'@astryxdesign/core': patch
---

[fix] ToastViewport syncs its handler refs at commit. After a render React discards, as a suspended transition does, a dismissed toast keeps its exit, and a replaced toast that never rendered reports no `onHide`.

@vjeux
