---
'@astryxdesign/cli': patch
---

[perf] `astryx search` and `astryx build` parse a page template's source for the components it renders only when the query could match one of them. A query no page renders now parses none of them. An open search uses about a quarter less CPU on its first run in a process, and results are unchanged.

@vjeux
