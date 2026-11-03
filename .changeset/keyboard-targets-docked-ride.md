---
'@astryxdesign/core': patch
---

[chore] Internal: Core's keyboard module keeps a field above the on-screen keyboard where its scrollers can bring it up: a field in page content is scrolled into view by its scrollers, a field in a container fixed at the viewport's bottom rides that container on the keyboard's slide, and focus moves and first taps into those fields arrive without the browser's reveal. A field in a dialog or a sheet that fills the viewport keeps the browser's own reveal. Core's fields adopt it next; apps import nothing new.

@vjeux
