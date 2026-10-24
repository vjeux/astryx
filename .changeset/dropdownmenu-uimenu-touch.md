---
'@astryxdesign/core': patch
---

[feature] Under a finger, on every touch device, DropdownMenu and MoreMenu grow out of their trigger on UIKit's open spring and collapse back into it on the close spring, as UIMenu does, on the compositor and interruptible both ways; under Reduce Motion they fade in place (the animator's policy). A pan that starts outside the open menu dismisses it as the page scrolls. Under a mouse the menu keeps its entrance and the theme's motion.

@vjeux
