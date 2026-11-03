---
'@astryxdesign/core': patch
---

[feat] On a phone or tablet, TextInput, TextArea and NumberInput keep themselves above the on-screen keyboard, with nothing to turn on. A field in the page or a scrolling area is scrolled into place 17 px above the keyboard as it opens; a field in a bar fixed at the bottom of the viewport rides up with the keyboard and back down when it closes, even in a bar the app owns; a field inside a fully expanded Tall BottomSheet leaves that to the sheet. The ride moves that bar with its `translate` property, so a bar the app animates should not animate its own `translate`. Focus never pans the page, and nothing changes under a mouse or a trackpad.

@vjeux
