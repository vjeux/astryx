---
'@astryxdesign/core': patch
---

[feat] SegmentedControl: a mouse or a pen drags the selection as a finger does (`spec:AST-094` FR43). A drag from the selected segment carries it with the pointer and the release commits the segment under the pointer (`onChange` fires once, at the release), while a release outside the control selects nothing; a drag that starts on another segment commits where it lifts. A click still selects with the theme's color transition, and under a mouse or a pen the selection settles on the theme's state-change spring rather than UIKit's. Keyboard and assistive technology keep the click.

@vjeux
