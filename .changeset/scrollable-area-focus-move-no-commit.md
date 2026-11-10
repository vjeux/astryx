---
'@astryxdesign/core': patch
---

[fix] A ScrollableArea whose content fits no longer renders again when a commit moves focus between two of its descendants. Neither does a component built on useScrollableArea, such as BottomSheet.

@vjeux
