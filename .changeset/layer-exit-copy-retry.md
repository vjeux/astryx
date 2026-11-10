---
'@astryxdesign/core': patch
---

[fix] In Chromium 150 and later, a DropdownMenu's or Popover's close under a finger no longer drops its shrink when the browser keeps refusing to show the exit copy into the next frame. The copy now waits for the closing popover's `toggle` event, for up to three frames.

@vjeux
