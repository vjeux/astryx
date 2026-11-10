---
'@astryxdesign/cli': patch
---

[perf] `astryx theme targets` and the theme build's target check scan Core's component docs once per process and reuse that scan while every folder and doc it read is unchanged, as the docs and search catalogs do. A Core reached through a symlink, as a project's node_modules reaches it, shares the scan of its real path. The targets each command reports are unchanged.

@vjeux
