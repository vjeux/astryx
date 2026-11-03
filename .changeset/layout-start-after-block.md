---
'@astryxdesign/core': patch
---

[fix] A layout motion made late in a long main-thread task, such as a tap on a slow device, now plays instead of being skipped: under Reduce Motion the side navigation rail's cross-fade showed no fade at all after such a block. A layout change's animations start on the frame time the page last read only while that frame is at most 34 ms old; otherwise they start at the moment the change makes its first animation, so the block delays the motion. A glide such a change retargets carries on from where the compositor has it. An edge that rides such a glide, as the side navigation rail's does, moves with it. A change keeps one start from its first animation through the flush of its glides, and the parts riding those glides, however long the rest of the commit runs. A change that begins after a block since the last layout motion takes a fresh start, unless it joins an earlier change in the same area whose glides have not started yet.

@vjeux
