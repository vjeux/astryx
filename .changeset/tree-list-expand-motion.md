---
'@astryxdesign/core': patch
---

[feat] Without an `animatedLayout` handle, under a coarse primary pointer, a `TreeList` row's children slide out from under it as it expands, as in an iOS outline list, on the theme's motion timing that also turns its chevron. They used to appear in a single frame. A collapse removes them at once while the chevron turns back, and the rows below take their new places at once either way. The slide runs on the compositor and keeps going while the page runs script. With reduced motion on and a finger, the children fade in where they land and the chevron lands at its new angle at once. Trees driven by a mouse are unchanged.

@vjeux
