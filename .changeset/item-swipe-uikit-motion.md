---
'@astryxdesign/core': patch
---

[fix] Swipe actions on `Item` and `ListItem` move like a UIKit list row. The row now follows the finger on UIKit's own spring and settles on it from where it is and as fast as it was moving, so a release no longer stops dead and restarts; a finger that lands on a moving row catches it instead of being ignored until the row stops. A flick opens the row or closes it, by its direction, and no longer fires the outermost action, which only a long drag does (with `swipeBehavior="commit"` too). The motion runs on the compositor: it keeps going while the page is busy, and the colour behind the row stays exactly in the space the row uncovers.

@vjeux
