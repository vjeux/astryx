---
'@astryxdesign/core': patch
---

[fix] `useTableSortableState` sorts only when its data, sort, locale or a comparator changes. It re-sorted every row on every render of its owner.

@vjeux
