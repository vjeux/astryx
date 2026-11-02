---
'@astryxdesign/core': patch
---

[feat] `createReorderable` takes an optional `feedback`: `'insertion-line'`, the default and the drag everyone has today (the other items stay still and an accent line marks the gap), or `'shift'`, where the other items slide aside to open the gap as the item moves, the way a hand of playing cards makes room. Under `'shift'` the dragged item itself follows the pointer with no copy and no line, the gap moves only once its centre passes another item's place, so a pointer resting near a boundary moves nothing, and the drop settles the item into the gap without a jump; every pointer gets the slide, in a list, a row and a wrapping grid, and reorder mode's arrow moves slide the items too. Under Reduce Motion nothing travels: the gap cross-fades in place on a touch screen, and with a mouse the drag and reorder mode show the insertion line instead. An unknown value warns in development and shows the line.

@vjeux
