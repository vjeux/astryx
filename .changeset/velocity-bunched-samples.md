---
'@astryxdesign/core': patch
---

[chore] Internal: the velocity tracker counts moved samples less than 1.5 ms apart as one sample, the newer. When a busy page dispatches queued touch or pointer events back to back with times 1 ms apart, a release no longer reads a speed many times the finger's, so a pager or a wheel no longer flings past where the finger aimed. Not exported from the package entry point.
