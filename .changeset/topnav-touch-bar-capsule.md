---
'@astryxdesign/core': patch
---

[feat] TopNav's phone bar under a finger (one touch model on every touch device, iOS and Android alike) puts its end items together on one capsule, as iOS 26 bar buttons do. The old touch bar showed them as separate controls on the bar, as with a mouse. The capsule paints the theme's `--color-background-surface`, fully rounded, reaching 4px (`--spacing-1`) past the controls, with no drop shadow and nothing blurred. It is paint only: the bar keeps its height and padding, and the controls their size and spacing, so the default look grows no box for touch; an end slot whose content renders nothing paints no capsule. No token, prop or target is added. With a mouse the bar is unchanged.

@vjeux
