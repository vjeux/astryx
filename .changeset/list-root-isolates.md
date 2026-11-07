---
'@astryxdesign/core': patch
---

[fix] List: under a finger, the rows after a reorder drop settle together at the edge of a card that clips, with no late 1 pt step on iOS. The List's root now isolates under a coarse pointer, and the list keeps its inline clip without isolating. Every List now renders its root `div`, as a List with a `header` already did. `ref` and `xstyle` stay on the list element.

@vjeux
