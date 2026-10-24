---
'@astryxdesign/core': patch
---

[feat] SegmentedControl: on touch screens the selection slides to the new segment on UIKit's spring and the labels cross-fade, whether a tap, an arrow key or a new `value` moved it. The motion runs on the compositor and keeps moving while the main thread is busy; with Reduce Motion the selection moves without travel.
@vjeux
