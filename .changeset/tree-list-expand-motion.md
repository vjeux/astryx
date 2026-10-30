---
'@astryxdesign/core': patch
'@astryxdesign/cli': patch
---

[feat] Under a coarse primary pointer, a `TreeList` row's children slide out from under it as it expands while its chevron turns, as in an iOS outline list; they used to appear in a single frame. A collapse removes them at once while the chevron turns back, and the rows below take their new places at once either way. The motion runs on the compositor and keeps going while the page runs script; with reduced motion on, it cross-fades instead of moving. Trees driven by a mouse are unchanged.

@vjeux
