---
'@astryxdesign/core': patch
---

[feature] Under a finger, Popover is presented like a popover on iOS: it grows out of its trigger on UIKit's present spring, wide before tall, with its edge held on the trigger, and shrinks back into the trigger on the dismiss spring when it closes, on the compositor and interruptible both ways. With reduced motion it fades in and out on the same springs. Under a mouse it keeps its entrance and the theme's motion.

@vjeux
