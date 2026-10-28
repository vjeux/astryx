---
'@astryxdesign/core': patch
---

[internal] `useTouchLayer` runs a touch layer's setup only while the primary pointer is coarse and after hydration, for touch presentations (`spec:AST-094` FR13); under a fine pointer a component keeps its plain behavior and attaches no input listener (`spec:AST-017` FR59). Nothing a consumer sees changes.

@cixzhang
