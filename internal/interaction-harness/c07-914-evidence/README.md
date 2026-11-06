NOT FOR LANDING: evidence for the frozen arm's step trace in the control-vs-rAF self-test.

traces/<profile>/*.json: the frozen arm's recorded frames, control frames, window and page steps,
dumped by the trace arm (WebKit CI image: 2-core pin with 2 or 4 workers, 2-core pin with six busy
loops; Chromium: 2-core pin, 4 workers).

From the repository root:
  node internal/interaction-harness/c07-914-evidence/bundle.mjs internal/interaction-harness/src/busy.ts /tmp/busy.mjs
  node internal/interaction-harness/c07-914-evidence/replay.mjs /tmp/busy.mjs internal/interaction-harness/c07-914-evidence/traces/*
    -> each run re-judged by busyWindowProof (equal to the recorded verdict); main's count check red on 5 of 56, the step trace red on 0
  node internal/interaction-harness/c07-914-evidence/replay2.mjs /tmp/busy.mjs 800 internal/interaction-harness/c07-914-evidence/traces/*
    -> a step from inside the block injected every 20 ms of each judged part: with the 800 ms lookback 1902 of 1902 flagged at every lead;
       with every step since the arm started, 9 to 59% escape at leads of 1 to 2.4 s
  python3 internal/interaction-harness/c07-914-evidence/stale-ages.py internal/interaction-harness/c07-914-evidence/traces/*
    -> 49 new positions in the judged part, all steps set before the block, at most 261 ms old
