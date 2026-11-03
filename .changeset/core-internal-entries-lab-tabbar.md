---
'@astryxdesign/core': patch
---

[chore] Internal: Core's internal touch entry re-exports the press tracker, action-group tracker, finger-scroll reader and selection lock that Lab's TabBar uses, and the finger-scroll reader also takes a ref that holds a document. Three tab-bar strings join Core's message catalog. Apps import nothing new.

@vjeux
