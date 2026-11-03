---
'@astryxdesign/core': patch
---

[fix] BottomSheet: a touch release follows the iOS sheet. A release faster than about 1,000 px/s is a flick: it goes at least to the next detent in its direction, so a short fast flick at the lowest detent closes the sheet instead of springing back. Above the lowest detent, a flick closes the sheet only when it is as strong as iOS asks; a normal flick stops at the next detent. A slow or medium touch throw now travels less than before, and a slow touch drag closes the sheet only past halfway to closed. A sheet a touch drag closes leaves on its close spring, starting at the speed of the drag. A mouse or pen drag is unchanged.

@vjeux
