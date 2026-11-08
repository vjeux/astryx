---
'@astryxdesign/core': patch
---

[fix] TextInput, TextArea, NumberInput, DateInput, DateRangeInput, DateTimeInput, TimeInput, Tokenizer, Typeahead, PowerSearch and ChatComposer: under a finger the focus look shows at once, with no fade, so a tapped field repaints once while the keyboard rises. With a fine primary pointer, such as a mouse, a click and the Tab key keep the fade.

@vjeux
