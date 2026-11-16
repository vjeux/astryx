---
'@astryxdesign/core': patch
---

[perf] Popover loads its touch motion itself, only where the primary pointer is coarse. A page used with a mouse or trackpad no longer downloads Popover's growth, input hold and exit copy after first paint, and the shared touch runtime no longer carries them.

@vjeux
