---
'@astryxdesign/core': patch
---

[feat] `useCombobox` announces each new result count for a field you render. Pass the new `query` option and each new query's count is announced through the shared announcer, worded by two new catalog messages, `@astryx.combobox.resultCount` and `@astryx.combobox.noResults`. For no matches it announces the words you show: pass them as `emptySearchText` (default “No results found”) and render the returned `emptySearchText` in the element that spreads the new `getEmptyProps`.

@vjeux
