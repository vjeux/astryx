---
'@astryxdesign/core': patch
---

[fix] A touch on a toast is now decided by its first move. A first move toward the toast's edge belongs to the swipe and never scrolls the page; any other first move leaves the page its scroll. The shared gesture host makes that claim. Its code, about 24 KB gzip, loads when the first toast shows, so importing Toast or LayerProvider costs nothing more until then; a touch that starts before it loads stays the page's.

@vjeux
