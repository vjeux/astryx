---
'@astryxdesign/core': patch
---

[fix] `Item`'s swipe actions: a fling opens the row at its actions and never fires one. On a side with two or more entries, only a drag that starts on the open row fires the outermost entry. The panel shows no entry's colour behind another: the entries fill it, and the entry that fires covers it until the row comes back or holds out. No API changes.
