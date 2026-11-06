// Local replay, not part of any PR: re-judges recorded frames of the harness
// self-test's frozen (rAF) arm with the harness's own busyWindowProof, and
// applies both checks to the same frames: main's count bound and this
// change's step trace.
//
//   node replay.mjs <bundled busy.mjs> <trace dump dir>...
import fs from 'node:fs';
import path from 'node:path';

const [bundle, ...dirs] = process.argv.slice(2);
const {busyWindowProof, castStep} = await import(path.resolve(bundle));

let runs = 0;
let mainRed = 0;
let fixRed = 0;
const rows = [];
for (const dir of dirs) {
  for (const file of fs.readdirSync(dir).filter(f => /-1-\d+\.json$/.test(f)).sort()) {
    const dump = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (dump.tracked == null || dump.steps == null) continue;
    const tracked = dump.tracked.map(f => ({
      t: f.t,
      box: f.y == null ? null : {x: 0, y: f.y, width: 0, height: 0},
      pixels: f.y == null ? 0 : 1,
      ...(f.step == null ? {} : {step: f.step}),
    }));
    const control = dump.controlFrames.map(f => ({
      t: f.t,
      box: f.x == null ? null : {x: f.x, y: 0, width: 12, height: 12},
      pixels: f.x == null ? 0 : 1,
    }));
    const window = dump.window;
    const proof = busyWindowProof(tracked, window, {axis: 'y', control});
    const failures = proof.verdict.failures.join('\n');
    // main's checks
    const mainPass =
      proof.verdict.pass === false &&
      /moved on [01] of the \d+ frames the control moved/.test(failures) &&
      /longest stall .* longer than the control's/.test(failures);
    // this change's checks
    const before = dump.steps.filter(s => s.t < window.from && s.t >= window.from - 800).map(s => s.y);
    const step = castStep(tracked, 'y');
    let shown = tracked.filter(f => f.box != null && f.t < proof.judged.from).at(-1)?.box?.y;
    const unset = [];
    for (const f of tracked) {
      const y = f.box?.y;
      if (y == null || f.t < proof.judged.from || f.t > proof.judged.to) continue;
      if (shown != null && Math.abs(y - shown) > 0.25 && !before.some(s => Math.abs(dump.top + s - y) <= step)) {
        unset.push({atMs: f.t - window.from, y: y - dump.top});
      }
      shown = y;
    }
    const fixPass =
      proof.verdict.pass === false &&
      /longest stall .* longer than the control's/.test(failures) &&
      unset.length === 0;
    runs += 1;
    if (!mainPass) mainRed += 1;
    if (!fixPass) fixRed += 1;
    const moved = (failures.match(/moved on (\d+) of the (\d+) frames the control moved/) ?? []).slice(1).join('/');
    const same = JSON.stringify(proof.control) === JSON.stringify(dump.control);
    rows.push(`${path.basename(dir)}/${file.slice(0, 24)} moved ${moved || '-'} | main ${mainPass ? 'pass' : 'RED'} | change ${fixPass ? 'pass' : 'RED'} | shown ${dump.shownSteps.map(s => `+${Math.round(s.stampMs)}ms y${s.y} from step ${s.stepSetMs == null ? '?' : Math.round(s.stepSetMs) + 'ms'}`).join(', ') || 'none'} | re-judged = recorded: ${same}`);
  }
}
for (const row of rows) console.log(row);
console.log(`${runs} recorded runs: main's check red on ${mainRed}, this change's check red on ${fixRed}`);
