---
'@astryxdesign/core': patch
---

[feat] `createMenuPress(menu, options)` runs the menu press model on any element without React: the row under a release acts, the highlight follows a held pointer, a mouse press on `trigger` opens the menu, and a finger held on it opens it after the long-press delay. `destroy()` removes every listener it added (`spec:AST-107` FR6). `useMenuPress(menuRef, options)` is its React form: `triggerRef` names the trigger, and there is nothing to spread. The options form, `useMenuPress({menuRef, …})` with its `menuProps` and `triggerProps`, still works and is deprecated: migrate to `useMenuPress(menuRef, {triggerRef, …})` and drop the spreads. It is removed at the next minor. Core's own users of the options form, which move at that minor: DropdownMenu, for its trigger's props, and the menus that track only presses on their items (BreadcrumbItem, NavHeadingMenu, TopNavMenu, and the SideNav and TopNav heading menus).

@vjeux
