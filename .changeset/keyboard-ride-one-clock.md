---
'@astryxdesign/core': patch
---

[fix] Mobile keyboard: where a DOM emulator stamps events in epoch milliseconds, as jsdom does, the content's ride on the keyboard's slide now settles at the slide's end, not at once. Browsers stamp events on the page's own clock, so they are unaffected.

@vjeux
