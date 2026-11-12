---
'@astryxdesign/core': patch
---

[fix] Table keeps its column and plugin identity caches in memos keyed on the columns' and plugins' identities, so a render React discards, as a suspended transition does, cannot replace them. The next committed render reuses them, so rows skip rendering when the columns and plugins match the committed ones. `useBaseTablePlugins` also keeps its array when the base plugins come in a new array of the same plugins. A column plugin with its own render-time cache, such as the tree plugin, still re-renders every row.

@vjeux
