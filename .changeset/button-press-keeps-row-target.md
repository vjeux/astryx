---
'@astryxdesign/core': patch
---

[fix] A finger's press no longer changes the containing block of a Button's own pseudo-elements. With `position: static` and `transform: none` through `xstyle`, a Button's `::after` can cover a row as its tap target. That target now holds through the press and its release, so a tap on the row activates the Button again. In that pattern the touch press layer, the Button's `::before`, covers the row too, so a finger's press tints the whole row. A mouse's press, and a Button that keeps its own positioning, still tint only the Button. The release still runs on the compositor and paints nothing.

@vjeux
