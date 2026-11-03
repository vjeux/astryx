---
'@astryxdesign/core': patch
---

[experimental] Lab's experimental TabBar reaches Core's pan recognizer, press tracker, finger-scroll reader, text-selection lock, touch query, rubber band and UIKit gesture values through Core's internal `@astryxdesign/core/internal/touch` entry, which only Astryx's own packages may import and which stays outside the public API and its compatibility promise. Its More tab's label, its search's Cancel button and a badged tab's name join Core's message catalog.

@vjeux
