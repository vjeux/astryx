---
'@astryxdesign/cli': patch
---

[perf] `astryx component` and other commands load the code-rewrite toolkit only when they patch an integration manifest, so a lookup loads 74 fewer modules.

@vjeux
