---
'@astryxdesign/core': patch
---

[experimental] `uikit.refreshControl` (from `@astryxdesign/core/motion/experimental`) gains the refresh indicator's measured drawing: each spoke's width, corner radius and inner and outer radius, the refreshing gradient (`spinInstanceAlphaOffset`, `spinFirstInstanceAlpha`) and the spring it comes in on (`triggerGradientSpring`). The guessed `spinAlphaStep` is removed: the measured gradient runs the other way, brightest at the last spoke.

@vjeux
