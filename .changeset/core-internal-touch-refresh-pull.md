---
'@astryxdesign/core': patch
---

[chore] Internal: Core's internal touch entry re-exports what Lab's useRefreshControl reads. That is the pan recognizer, its hook and the gesture types, and the motion animator. It is also the motion math and springs, and the UIKit scroll table of its pull. None is in the public entry. Apps import nothing new.

@vjeux
