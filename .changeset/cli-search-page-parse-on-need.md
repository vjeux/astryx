---
'@astryxdesign/cli': patch
---

[perf] `astryx search` and `astryx build` parse a page template's source for the components it renders only when the query could match one of them. A query no page renders parses only the few pages whose source holds an escape, and a first search in a process uses about 5–17% less CPU. Results are unchanged.

@vjeux
