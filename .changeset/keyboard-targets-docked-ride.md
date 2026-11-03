---
'@astryxdesign/core': patch
---

[chore] Internal: Core's keyboard module keeps a field above the on-screen keyboard wherever it sits: a field in scrolling content is scrolled into place by its nearest scroller, a field in a container fixed at the viewport's bottom rides that container on the keyboard's slide, and a first tap on a field is focused without the browser's reveal. Core's fields adopt it next; apps import nothing new.

@vjeux
