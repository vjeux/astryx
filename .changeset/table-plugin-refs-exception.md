---
'@astryxdesign/core': patch
---

[fix] `useTableSortableState` sorts only when its data, sort or locale changes, not on every render. Table's plugin hooks record their render-time config refs as an exception to the runtime's ref rule (DEC-6), with tests that pin what they keep fast.

@vjeux
