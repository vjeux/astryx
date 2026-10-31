---
'@astryxdesign/core': patch
---

[chore] Internal: where the gesture host reads a finger from its pointer events, the finger follows the Touch Events path's rules. A second finger, wherever it lands, leaves both to the page's pinch, and a pen or a finger the window's blur cancelled clicks nothing at its later lift, while a mouse keeps its click. A disabled recognizer brings no blocking listener. Not exported from the package entry point.

@vjeux
