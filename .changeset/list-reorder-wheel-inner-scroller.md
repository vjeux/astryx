---
'@astryxdesign/core': patch
---

[fix] A reorderable `List` in its own scroll box keeps a wheel during a drag: at the box's end the page no longer scrolls under the dragged row, so the row still lands under the pointer. The box gets its own `overscroll-behavior` back at the drop.
@vjeux
