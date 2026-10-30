---
'@astryxdesign/core': patch
---

[chore] Internal: press tracking is built by `createPressTracker(options)`, and `PressTracker` is the interface of what it returns, as Core's runtime rules ask of the touch modules outside the recognizer family (the velocity tracker is still a class, their one listed exception). `usePressTracker` and its callers do not change. Not exported from the package entry point.

@vjeux
