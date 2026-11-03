---
'@astryxdesign/core': patch
---

[fix] SegmentedControl: a drag lifted just off the control, within 70 px, commits the nearest segment, as a UIKit control's tracking margin keeps a press inside. A small control, such as an icon-only one, now takes drags that end slightly off it. A lift further off still selects nothing.
@vjeux
