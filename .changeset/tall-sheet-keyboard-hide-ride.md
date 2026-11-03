---
'@astryxdesign/core': patch
---

[fix] BottomSheet: in iOS Safari and Firefox for Android, which publish no keyboard slide, when the on-screen keyboard closes, a Tall sheet's content rides down with it on the keyboard's own spring, instead of jumping back to its earlier scroll once the keyboard is gone. A field that takes focus again before the keyboard is down rides back up, and focus moving to a select, whose picker takes the keyboard's place, starts no ride.

@vjeux
