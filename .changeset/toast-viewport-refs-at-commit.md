---
'@astryxdesign/core': patch
---

[fix] ToastViewport syncs its committed list and limit at commit. When a render React discards, such as a suspended transition, lowered `maxVisible`, dismissing a toast still on screen plays its exit. A toast that only such a render showed reports no `onHide` when a repeat replaces it.

@vjeux
