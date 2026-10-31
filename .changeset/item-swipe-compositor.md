---
'@astryxdesign/core': patch
---

[fix] Under a finger, swipe actions on `Item` and `ListItem` keep moving while the page is busy. The row, its panel and its full swipe now move on the compositor with the same springs, so a script that holds the page no longer stalls the row and then makes it jump, and a release starts its motion without a style recalculation inside the touch.

@vjeux
