---
'@astryxdesign/core': patch
---

[feat] A reorderable object's new `attach(container, {items})` reorders plain elements with no collection component: `items()` gives one `{key, element, handle}` per item in order, each item's handle becomes reorder mode's toggle, named after its item and in the Tab order (a rejected or keyless item's handle is hidden), and the container gets the drag and reorder mode with their announcements through the shared announcement channel, following the primary pointer as it turns coarse or fine. Items laid out in a row or a wrapping grid drop on the measured place whose centre is nearest the dragged item's, a drag follows the pointer on both axes and settles the item on that place, and reorder mode's arrow keys and hint follow the layout's rows and columns (Left and Right along a row, all four in a grid, a row and a column in the announcement). `destroy()` removes everything it added.

@vjeux
