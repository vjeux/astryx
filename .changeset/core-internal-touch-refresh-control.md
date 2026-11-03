---
'@astryxdesign/core': patch
---

[chore] Internal: Core's internal touch entry re-exports what Lab's RefreshControl reads: the pan recognizer and its hook, the motion math and UIKit tables of its pull, and the page's scroll-style claims. The UIKit constants table gains UIRefreshControl's measured values (`refreshControl`), and the locale catalog gains `@astryx.refreshControl.refreshing` ("Refreshing"). Apps import nothing new.

@vjeux
