---
'@astryxdesign/core': patch
---

[fix] A pager move that a new target retargets at its very first instant now goes on at the speed the move starts at, instead of starting again from rest. The motion foundation keeps one eased progress and one timed curve in its progress module, and the pager plays that timed curve.

@vjeux
