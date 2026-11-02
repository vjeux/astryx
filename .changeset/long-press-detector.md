---
'@astryxdesign/core': patch
---

[chore] Internal: `useLongPress` runs its long-press detection through an internal detector with no React, so a press model that runs without React can share it. The hook and its handlers behave as before. Not exported from the package entry point.

@vjeux
