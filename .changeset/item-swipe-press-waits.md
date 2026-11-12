---
'@astryxdesign/core': patch
---

[fix] `Item`'s swipe actions: a touch that becomes a swipe paints no press on the row. A finger's press on a row that can swipe waits 150 ms, as a row in a scroll view does, and the swipe ends it when it takes the touch. So a slow swipe no longer flashes the row's pressed state. A tap still paints its press.

@vjeux
