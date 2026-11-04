---
'@astryxdesign/cli': patch
---

[perf] A run of `astryx` loads the project, integration and code-rewrite modules only when its command uses them. In a project whose config names `debug` or `integrations`, every run still loads the project, as before. In a folder with no project config, `astryx --version` uses about three quarters less CPU. Commands that load the project start a little faster. Output and exit codes are unchanged.

@vjeux
