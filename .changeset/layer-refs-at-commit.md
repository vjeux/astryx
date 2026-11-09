---
'@astryxdesign/core': patch
---

[fix] The layer runtime syncs its close-start, replayed-show and keep-open refs at commit, not during render, so a render React discards no longer leaves its values for later callbacks.

@vjeux
