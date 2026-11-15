---
'@astryxdesign/core': patch
---

[fix] A touch gesture's deadline now runs after the input stamped before it. While the latest contact is a finger or a pen, a deadline behind a blocked page waits for input still queued before it. It waits 50 ms when its timer runs more than 17 ms late. Each finger's or pen's input from before it that comes late keeps it waiting. With a mouse or trackpad as the latest contact, deadlines keep today's single-task yield. A deadline that falls among a coalesced move's samples runs between them. A List reorder hold or a Pager's catch whose finger drifted or lifted in time now ends as it should.

@vjeux
