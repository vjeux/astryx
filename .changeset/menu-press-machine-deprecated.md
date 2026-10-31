---
'@astryxdesign/core': patch
---

[feat] `menuPressStep`, `MENU_PRESS_SETTLE_MS` and the `MenuPressEffect`, `MenuPressEvent`, `MenuPressGesture`, `MenuPressPointerType` and `MenuPressStep` types, the press machine behind the menu press model, are deprecated. They keep working and are removed at the next minor: use `useMenuPress(menuRef, options)` in React, or `createMenuPress(menu, options)` without it.

@vjeux
