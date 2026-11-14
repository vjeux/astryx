---
'@astryxdesign/core': patch
---

[perf] AlertDialog: under a finger, the tap that closes the alert starts its fade first and writes the input hold after the fade's first frame, so that tap's task forces fewer style recalculations. The hold takes input at once, the fade and its timing do not change, and no tap, click or key reaches the alert while it leaves.

@vjeux
