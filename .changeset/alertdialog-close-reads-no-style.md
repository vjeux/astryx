---
'@astryxdesign/core': patch
---

[perf] AlertDialog: under a finger the alert reads the theme's exit timing when it opens, with its entrance timing, so the tap that closes it forces one style recalculation fewer. The fade, its timing and the input hold do not change.

@vjeux
