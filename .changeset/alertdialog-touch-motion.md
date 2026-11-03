---
'@astryxdesign/core': patch
---

[feat] AlertDialog: under a finger the alert appears the way an iOS alert does. It scales down into place from 1.2 while it and the dimming fade in, on your theme's dialog entrance duration and curve. When it closes, it fades out with the dimming. With reduced motion it and the dimming only fade in, over 200 ms. While it appears, a touch on its actions does nothing. While it fades out, a touch, a click, Enter, Space, Escape or an assistive-technology activation on it does nothing. On a phone, an alert with no `width` prop is now UIKit's 320 px wide in every theme, not 400 px. A `width` you pass still wins. With a mouse nothing changes.

@vjeux
