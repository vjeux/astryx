---
'@astryxdesign/core': patch
---

[fix] A `Selector` opened near the bottom of the viewport keeps its whole option list inside the viewport. The selected-item overlay realized its viewport clamp as a negative margin on the anchored layer, which anchor positioning's fit check swallowed, so the last options lay past the viewport's end and could not be pointed at. The clamp now moves the list by `translate`. No public API change: `useSelectedItemOffset` keeps its `offset` and `isPositioned` return.

@vjeux
