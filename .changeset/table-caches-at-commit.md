---
'@astryxdesign/core': patch
---

[fix] Table keeps one array for each list of columns, and for each list of plugins, compared by identity. A render React discards, as a suspended transition does, can no longer leave its own array in the cache. The next committed render reuses the array, so rows skip rendering when the columns and plugins match the committed ones. `useBaseTablePlugins` also keeps its array when the base plugins come in a new array of the same plugins. A column plugin with its own render-time cache, such as the tree plugin, still re-renders every row.

@vjeux
