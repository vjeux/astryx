---
'@astryxdesign/core': patch
---

[fix] Under a finger, a tap that lands while a Popover grows out of its trigger is ignored. The popover stays open and keeps its focus, and the tap reaches nothing under it. A pan that starts then scrolls nothing, and a pinch still zooms the page. Once the popover is in, a tap outside dismisses it as before. A mouse is unchanged.

@vjeux
