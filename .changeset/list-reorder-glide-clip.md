---
'@astryxdesign/core': patch
---

[fix] List: under a finger, a reorderable list stops clipping in the inline axis while its rows glide to rest. A row inside a container that clips, such as a scrolling panel, then no longer sits a point off its place on iPhone until it rests. The list clips again once its rows rest or a finger lands on it, so a swiped row stays clipped. With a mouse nothing changes.

@vjeux
