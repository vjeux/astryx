---
'@astryxdesign/core': patch
---

[feat] `useCombobox` takes a multi-line field you render: pass the new `field` option, `'textarea'` or `'contenteditable'` (default `'input'`). A `textarea` keeps its textbox role and gets `aria-controls` but no `aria-expanded`; a contenteditable element is a `combobox`. While the list is hidden, or open with no options, a multi-line field keeps every key, so the arrows move the caret; only a single-line `input` shows a hidden list on ArrowDown. A key handler passed to `getFieldProps` may be typed for its own element.

@vjeux
