---
'@astryxdesign/core': patch
---

[fix] A Toast's swipe now follows iOS notification banners. The card stays still for the first 14 px of finger travel and then follows at 0.55 of the finger, with no jump. On release, the finger's travel projected with its velocity decides: a quick flick dismisses even when it barely moved the card, and a release short of dismissing springs the card back. A dismissed card leaves from where the finger left it and never moves back toward rest. The swipe no longer fades or shrinks the card. While the card springs back, touches pass through to the page.

@vjeux
