---
'@astryxdesign/core': patch
---

[fix] Gestures: a trackpad flick on a busy page releases at the fingers' own speed. A finger wheel that a stall delayed, squeezed or merged reads in the fingers' frame rhythm, never faster than their largest step. A merge in the shrinking run counts each frame it carries and reads by the decay's ratio or decrement, so the lift reads on time.

@vjeux
