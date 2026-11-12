---
'@astryxdesign/core': patch
---

[fix] Table keeps its column and plugin identity caches in state, adjusted during render, so a render React discards, as a suspended transition does, cannot replace them. The next committed render reuses them, so rows skip rendering when the columns and plugins match the committed ones. A column plugin with its own render-time cache, such as the tree plugin, still re-renders every row.

@vjeux
