---
'@astryxdesign/core': patch
---

[fix] ClickableCard, SelectableCard and Thumbnail show a press at once and fade its release on the theme's exit duration and easing, on every pointer. Under reduced motion, a pressed Button no longer shrinks, and the three cards change their hover, border and selection colors at once on every pointer, whatever the theme's duration. A finger's press highlight still fades out on release, on the exit tokens within 200 ms.

@vjeux
