// Local replay, not part of any PR: a positive control for the step trace.
// Into each recorded run of the frozen arm it injects one frame inside the
// judged part, at the position the arm's loop has at window.from + δ (a step
// from inside the block, which a frozen arm never shows), and asks whether
// the trace flags it: with every step since the arm started, and with only
// the steps of the last LOOKBACK ms. A longer lead before the block is
// simulated by extending the loop's steps back to `lead` ms before it.
//
//   node replay2.mjs <bundled busy.mjs> <lookback ms> <trace dump dir>...
import fs from 'node:fs';
import path from 'node:path';

const [bundle, lookbackArg, ...dirs] = process.argv.slice(2);
const LOOKBACK = Number(lookbackArg);
const {busyWindowProof, castStep} = await import(path.resolve(bundle));

const leads = [0, 800, 1000, 1200, 1400, 1600, 2400];
const deltas = [];
for (let d = 20; d <= 680; d += 20) deltas.push(d);
const tally = {};
let traces = 0;
for (const dir of dirs) {
  for (const file of fs.readdirSync(dir).filter(f => /-1-\d+\.json$/.test(f)).sort()) {
    const dump = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (dump.tracked == null || dump.steps == null) continue;
    traces += 1;
    const win = dump.window;
    const real = dump.steps.slice(1); // the first entry is the reset
    const first = real[0];
    const start = first.t - (1600 * first.y) / 560;
    const yAt = t => 560 * ((((t - start) / 1600) % 1) + 1) % 560;
    const baseTracked = dump.tracked.map(f => ({
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
    const step = castStep(baseTracked, 'y');
    const proof = busyWindowProof(baseTracked, win, {axis: 'y', control});
    for (const lead of leads) {
      // The arm's steps: as recorded, plus the loop's steps back to `lead` ms
      // before the block, every 16.7 ms, where a longer lead would have set them.
      const extra = [];
      for (let t = win.from - lead; t < first.t; t += 1000 / 60) extra.push({t, y: yAt(t)});
      const steps = [...extra, ...real].filter(s => s.t < win.from);
      for (const mode of ['full', 'lookback']) {
        const before = steps
          .filter(s => mode === 'full' || s.t >= win.from - LOOKBACK)
          .map(s => s.y);
        let flagged = 0;
        let injectedHere = 0;
        for (const delta of deltas) {
          const t = win.from + delta;
          // Only inside the judged part, which can start after the window's
          // margin (at the arm's first presented change, when it was at rest).
          if (t < proof.judged.from || t > proof.judged.to) {
            continue;
          }
          injectedHere += 1;
          const y = dump.top + Math.round(yAt(t) / step) * step;
          const tracked = [...baseTracked, {t, box: {x: 0, y, width: 0, height: 0}, pixels: 1, step: {x: step, y: step}}]
            .sort((p, q) => p.t - q.t);
          let shown = tracked.filter(f => f.box != null && f.t < proof.judged.from).at(-1)?.box?.y;
          let hit = false;
          for (const f of tracked) {
            const fy = f.box?.y;
            if (fy == null || f.t < proof.judged.from || f.t > proof.judged.to) continue;
            const changed = shown != null && Math.abs(fy - shown) > 0.25;
            if (f.t === t && changed && !before.some(s => Math.abs(dump.top + s - fy) <= step)) hit = true;
            shown = fy;
          }
          if (hit) flagged += 1;
        }
        const key = `${mode} lead ${lead}`;
        tally[key] ??= {flagged: 0, injected: 0};
        tally[key].flagged += flagged;
        tally[key].injected += injectedHere;
      }
    }
  }
}
console.log(`${traces} recorded runs, a step injected every 20 ms of each judged part (δ = 20..680 ms), lookback ${LOOKBACK} ms`);
for (const [key, {flagged, injected}] of Object.entries(tally)) {
  console.log(`  ${key.padEnd(20)} flagged ${flagged}/${injected} (escaped ${injected - flagged})`);
}
