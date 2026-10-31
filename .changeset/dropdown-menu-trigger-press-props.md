---
'@astryxdesign/core': patch
---

[feat] `DropdownMenuTriggerProps.onPointerDown` and `onContextMenu`, the menu's press on a `renderTrigger` control, are deprecated; they still drive the menu as before. At the next minor the menu's press reaches the control through `ref` and the two fields are removed: spread every given prop, `ref` included, rather than calling either yourself.

@vjeux
