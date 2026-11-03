---
'@astryxdesign/core': patch
---

[feat] On a touch screen, closing a Lightbox with Close, Escape, the platform close or a tap beside the photo now plays a short exit: the photo shrinks a little and fades out with the backdrop and the controls, on the theme's exit duration and easing. Under Reduce Motion it only fades. `onOpenChange(false)` reports when the exit ends. A mouse or a pen still closes the viewer at once.

@vjeux
