---
'@astryxdesign/core': patch
---

[fix] BottomSheet: in iOS Safari, when the on-screen keyboard closes, a Tall sheet's content rides down with it on the keyboard's own spring, instead of jumping back to its earlier scroll once the keyboard is gone. A field that takes focus again before the keyboard is down rides back up.

@vjeux
