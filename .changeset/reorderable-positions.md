---
'@astryxdesign/core': patch
---

[feat] `createReorderable` takes `positions()` for a layout its items' measured places don't describe, such as a fanned hand or a custom grid: one slot centre per item, in item order, from the top-left of the container's padding box. A drag drops the item on the slot within its range whose centre is nearest its own and settles it on that slot's centre, following the pointer on both axes, and reorder mode's arrow keys and hint follow the slots' rows and columns. An array of another length is ignored, with a warning in development, and the measured layout decides.

@vjeux
