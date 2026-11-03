---
'@astryxdesign/core': patch
---

[fix] On iOS, a press on a control such as a Switch or a SegmentedControl no longer ends when the finger first moves a few pixels the way the page could scroll. Only the page's own scroll ends it, so 8 px up and then across still drags the control.

@vjeux
