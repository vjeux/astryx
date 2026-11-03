---
'@astryxdesign/cli': patch
---

[docs] The side-panels guide, the Grid and Resizable blocks, and the ai-chat, canvas-editor, ide, incident-console, table-filter, table-grouped and table-inbox page templates resize their panels with `useResizable(handleRef, options)`: the handle takes the ref, and the panel renders at `size`, in place of the deprecated configuration-object form.

@vjeux
