---
'@astryxdesign/cli': patch
---

[perf] A run of `astryx` loads the project, integration and code-rewrite modules only when its command uses them. `astryx --version` uses about three quarters less CPU, and commands that load the project start a little faster. Output and exit codes are unchanged.

@vjeux
