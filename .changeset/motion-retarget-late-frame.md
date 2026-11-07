---
'@astryxdesign/core': patch
---

[fix] Motion: a retarget that the browser commits late, behind a busy main thread, now starts at that frame, from where the element is on screen and how fast it moves there. Before, it kept the clock of the call, so the element jumped to where the new curve had got to: 42 px back in one frame for a retarget behind a 200 ms block.

@vjeux
