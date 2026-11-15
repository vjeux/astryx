---
'@astryxdesign/core': patch
---

[fix] TextInput, TextArea and NumberInput: on a phone, a tap on a field's label, padding or icon, outside its input, now places the field above the on-screen keyboard as a tap on the input does. Before, Safari scrolled and panned the page itself, and the field ended higher. A tap on a clear button or another control in the field still goes to that control.

@vjeux
