---
'@astryxdesign/core': patch
'@astryxdesign/cli': patch
---

[fix] **ChatLayout**: In a page that scrolls the document (`scrollRef`), the composer stays right above the software keyboard in Safari on iOS. It no longer jumps under the status bar. In Firefox for Android, the first keyboard show on each page that leaves the composer covered keeps it covered before it rises. That takes about 0.75 s on a slow device, and never more than 3 s.
@vjeux
