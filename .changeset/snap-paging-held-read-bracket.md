---
'@astryxdesign/core': patch
---

[fix] Carousel snap paging: in Safari, a row whose items follow its width no longer settles back to the item it left when it resizes mid-settle. Each item's translate is read on both sides of its rect, so a read taken while the animation moves still gives the item's stop.

@vjeux
