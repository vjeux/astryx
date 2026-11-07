---
'@astryxdesign/core': patch
---

[perf] Under snap paging, a Carousel's release samples the settle's curve once, not once per item. The release takes about half the main-thread time with 9 items, and no more with 30. Every item moves as one through the settle.

@vjeux
