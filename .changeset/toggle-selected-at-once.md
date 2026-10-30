---
'@astryxdesign/core': patch
---

[fix] Under a coarse primary pointer (a touch screen as the main input), a ToggleButton's selected look now changes at once when a tap toggles it, as UIKit's does, instead of fading in over 100 ms; that fade was repainted on every frame in WebKit. Its press still scales and releases as any button's. A Button you give `aria-pressed` behaves the same. With any other pointer, and under reduced motion, nothing changes.

@vjeux
