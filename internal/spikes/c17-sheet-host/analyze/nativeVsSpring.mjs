// Copyright (c) Meta Platforms, Inc. and affiliates.

// For runs where the browser's own snap (or momentum) finished the release,
// compare that motion with the UIKit spring from the same place: the curve
// the page would have played had it had the main thread.
//
//   node analyze/nativeVsSpring.mjs <normalized run>...

import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../../../..');
const require = createRequire(join(root, 'package.json'));
const {build} = require('esbuild');
const bundled = await build({
  stdin: {
    contents:
      "export {solveSpring, toSpring} from './packages/core/src/motion/spring'; export {springs} from './packages/core/src/motion/uikit/springs';",
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  logLevel: 'warning',
});
const {solveSpring, toSpring, springs} = await import(
  'data:text/javascript;base64,' + Buffer.from(bundled.outputFiles[0].text).toString('base64')
);

for (const file of process.argv.slice(2)) {
  const run = JSON.parse(readFileSync(file, 'utf8'));
  const g = run.trace.meta.geometry;
  const end = run.trace.events.find(e => /^(touchend|pointerup)$/.test(e.type));
  const liftT = end.ts;
  const frames = run.frames.filter(f => f.y != null);
  // The motion after the lift: from the first frame that moves after the
  // sheet last rested (within 600 ms after the lift), to rest.
  const after = frames.filter(f => f.t >= liftT - 200 && f.t <= liftT + 1500);
  let startIdx = after.findIndex((f, i) => i > 0 && Math.abs(f.y - after[i - 1].y) > 0.6 && f.t > liftT - 60);
  if (startIdx <= 0) {
    console.log(run.id, 'no motion after the lift');
    continue;
  }
  const from = after[startIdx - 1];
  const rest = after[after.length - 1].y;
  const sFrom = g.H - from.y;
  const sTo = g.H - rest;
  const curve = solveSpring(toSpring(springs.sheetDetent), {from: sFrom, to: sTo, velocity: 0});
  const moving = after.slice(startIdx - 1);
  let best = null;
  for (let lag = -40; lag <= 40; lag += 0.5) {
    let max = 0;
    let sum = 0;
    let n = 0;
    for (const f of moving) {
      const te = (f.t - from.t - lag) / 1000;
      if (te < 0) continue;
      const want = g.H - curve.value(te);
      const e = f.y - want;
      max = Math.max(max, Math.abs(e));
      sum += e * e;
      n++;
    }
    if (best == null || max < best.max) best = {lag, max, rms: Math.sqrt(sum / n), n};
  }
  const settleNative = moving.find((f, i) => moving.slice(i).every(x => Math.abs(x.y - rest) <= 1));
  console.log(
    JSON.stringify({
      id: run.id,
      fromTop: from.y,
      restTop: rest,
      distance: Math.round(rest - from.y),
      nativeSettleMs: settleNative ? Math.round(settleNative.t - from.t) : null,
      springSettleMs: Math.round(curve.settleTime(1) * 1000),
      vsSpring: {maxPx: +best.max.toFixed(1), rmsPx: +best.rms.toFixed(1), frames: best.n},
    }),
  );
}
