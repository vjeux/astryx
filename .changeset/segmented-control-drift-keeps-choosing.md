---
'@astryxdesign/core': patch
---

[fix] SegmentedControl: a drag that drifts off the control keeps choosing by its horizontal position, clamped to the end segments, and the lift commits that segment. Escape or a browser cancel takes the press back, and the highlight returns at once.

@vjeux
