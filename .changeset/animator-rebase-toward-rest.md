---
'@astryxdesign/core': patch
---

[fix] Motion: a value change no longer skips a Switch's thumb ahead on a busy page. The rebase moves the thumb's running curve whole toward its new rest, keeping the browser's start. The call that follows takes that curve over instead of rebuilding it.

@vjeux
