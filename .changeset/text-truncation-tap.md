---
'@astryxdesign/core': patch
---

[fix] Text: a tap on truncated text that is a tab stop opens its full text and goes no further. Before, the tap opened the tooltip and also activated what the text sat in: a clickable table row or container ran its action. Now a tap by finger or pen opens or closes the full text without activating it, the operable path `architecture:interaction-modality` INV4 asks of every modality. A mouse click and the keyboard behave as before, and a truncated Text inside a link, button or other control leaves the tap to the control.

@vjeux
