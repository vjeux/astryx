---
'@astryxdesign/core': patch
---

[fix] A press on a DropdownMenu's or MoreMenu's trigger no longer moves or narrows the open menu. The default trigger now renders inside a box that the press does not scale, and the menu anchors to that box, as a Popover's does. A trigger inside a ButtonGroup, and a control from `renderTrigger`, are still the anchor themselves.

@vjeux
