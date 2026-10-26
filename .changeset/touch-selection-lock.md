---
'@astryxdesign/core': patch
---

[fix] Where the primary pointer is fine (a mouse, a trackpad, a touchscreen laptop, a desktop pen tablet), the press controller registers no touch listener. Internal, for the touch components: while a finger or pen holds an element whose hold acts (a long press, or a recognizer given a selection lock), the gesture host turns text selection and the iOS callout off and restores them at the lift; text fields keep their selection and links their native menu. Not exported from the package entry point.

@vjeux
