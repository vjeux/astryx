---
'@astryxdesign/core': patch
---

[fix] Table keeps its column and plugin identity caches at commit. After a render React discards, as a suspended transition does, the next committed render no longer re-renders every row.

@vjeux
