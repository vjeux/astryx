---
'@astryxdesign/core': patch
---

[fix] With a mouse or trackpad, a date or time sheet's wheel no longer turns back to the row a key step is leaving. On a busy page or a slow device the step could draw no frame for longer than the wheel's quiet period, and the wheel took that pause for rest: it committed the row under the band and turned back there. A step the wheel starts now rests only when it reaches its row or the end of the scroll range, or when the browser ends the scroll. A step that stops short of its row rests where it is about a second of drawn frames later. A scroll a person makes still rests after the quiet period.

@vjeux
