---
'@astryxdesign/core': patch
---

[chore] Internal: gesture host fixes from review. A page scroll under a still finger keeps the press and its click; watchers and touches nothing can claim get passive listeners only, and a disabled recognizer brings none; where a finger comes from its pointer events, a claimed finger's touchend is cancelled too, a hold's that claims with its lift included; a pen the window's blur cancelled clicks nothing at its later lift; an element's own `touch-action` is never widened; slotted content scrolls with its shadow-tree scroller. Not exported from the package entry point.

@vjeux
