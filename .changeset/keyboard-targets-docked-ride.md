---
'@astryxdesign/core': patch
---

[chore] Internal: Core's keyboard module keeps a field above the on-screen keyboard where its nearest scroller can bring it up: a field in scrolling content is scrolled into view by its nearest scroller, the document included, a field in a container fixed at the viewport's bottom moves that container up by the part of it the keyboard still covers, unless the container sets its own `translate`, and focus moves and first taps into those fields arrive without the browser's reveal. A field in a dialog or a sheet that fills the viewport keeps the browser's own reveal. Core's fields adopt it next; apps import nothing new.

@vjeux
