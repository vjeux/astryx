---
'@astryxdesign/core': patch
---

[fix] BottomSheet: a release faster than about 1,000 px/s is a flick, as on iOS: it goes at least to the next detent in its direction, so a short fast flick at the lowest detent closes the sheet instead of springing back. Above the lowest detent, a flick closes the sheet only when it is as strong as iOS asks: a normal flick stops at the next detent. A sheet a drag closes leaves on its close spring, starting at the speed of the drag.

@vjeux
