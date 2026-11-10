---
'@astryxdesign/core': patch
---

[fix] A key that scrolls nothing, as Tab, no longer ends a DateInput wheel's or month scroller's own scroll toward a row. On a busy page, Tab right after an arrow key could commit the row the wheel was leaving. The step now finishes on its row.

@vjeux
