---
'@astryxdesign/core': patch
---

[feat] Dragged past the confirm point, an `Item` or `ListItem` swipe-action row slows under the finger instead of running ahead. It follows at about half the finger's speed, then at about a fifth. A lift there still fires the outermost entry, and a swipe that comes back short closes the row and fires nothing.

@vjeux
