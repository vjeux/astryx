---
'@astryxdesign/core': patch
---

[fix] Carousel paging: a row that resizes while it settles no longer runs back to an earlier page. Unless the resize leaves the row past its new last page, the settle no longer stops at once. It plays on at its speed, to the last page when it was heading there, and otherwise to the page nearest where it was heading. It ends on that page with no step when it goes back to native scrolling.

@vjeux
