---
'@astryxdesign/core': patch
---

[chore] Internal: the springs, navigation, paging and picker motion tables register themselves when their module loads, so a spring role plays at the theme's `tempo` wherever it plays, with no register call. A page that plays no spring ships no springs registry. Not exported from the package entry point.

@vjeux
