---
'@astryxdesign/core': patch
---

[fix] An open Lightbox caption that widens to fewer lines no longer forces a layout in the frame that shrinks it. A caption keeps that layout, as before, when a float, a list marker, a text indent, or `::before` or `::after` content outside an inline element's boxes can take room on its last line.

@vjeux
