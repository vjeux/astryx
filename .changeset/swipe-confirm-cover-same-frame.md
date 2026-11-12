---
'@astryxdesign/core': patch
---

[fix] On a row with two swipe actions, crossing the confirm point no longer shows both actions in one frame. The outermost action's slide and the cover that hides the others update together, and backing out moves that cover with the row instead of stepping it away.

@popsiclelmlm
