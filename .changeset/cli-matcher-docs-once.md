---
'@astryxdesign/cli': patch
---

[perf] Within one operation, component discovery and the component matcher read each component doc once, not once for each name they resolve. Resolving 30 names that only the matcher finds, such as names in another case, makes 14,794 file-system calls instead of 305,108. Results are unchanged.

@vjeux
