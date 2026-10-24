---
'@astryxdesign/core': patch
---

[feat] DropdownMenu: a `DropdownMenuRadioItem` given children is a cell. The children are the tile (a colour swatch, an icon, a numbered slot) instead of the row, with no radio mark, named by `label`, and the checked cell carries an accent border. Cells keep the row's role, focus and selection, so the arrow keys and typeahead reach them in DOM order; lay them out with a grid on the group or on a wrapper inside it. `ContextMenuRadioItem` and `BreadcrumbMenuRadioItem` are the same component and take children too.

@vjeux
