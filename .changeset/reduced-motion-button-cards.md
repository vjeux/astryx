---
'@astryxdesign/core': patch
---

[fix] Under a coarse primary pointer, ClickableCard, SelectableCard and Thumbnail fade a press's release on the theme's exit duration and easing. Under reduced motion, a pressed Button no longer shrinks, and the three cards change their hover, border and selection colors at once on every pointer, whatever the theme's duration. A finger's press highlight still fades out on release, on the exit tokens within 200 ms.

@vjeux
