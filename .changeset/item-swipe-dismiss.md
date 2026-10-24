---
'@astryxdesign/core': patch
---

[fix] An open swipe-action row on `Item` and `ListItem` closes on a tap on its own content, as a UIKit list row does, and that tap no longer activates the row. It also closes when the list or the page scrolls, including a scroll that starts on the row itself, and it counts as open from the release that opens it, before its spring comes to rest.

@vjeux
