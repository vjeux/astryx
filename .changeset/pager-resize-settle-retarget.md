---
'@astryxdesign/core': patch
---

[fix] Carousel paging: a row that resizes while it settles no longer stops at once or runs back to an earlier page. The settle plays on at its speed, to the last page when it was heading there, and otherwise to the page nearest where it was heading.

@vjeux
