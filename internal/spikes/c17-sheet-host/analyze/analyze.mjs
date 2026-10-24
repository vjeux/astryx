// Copyright (c) Meta Platforms, Inc. and affiliates.

// Per-run analysis of a simulator capture. Input: a normalized run
//   {id, trace, frames: [{t, y}], finger: [[t, y]]}
// t = page clock ms (the recording's frames get page-clock times from the
// rig's compositor clock bar), y = page px of the sheet's top edge / finger.
// Output: numbers for the verdict and an SVG.
//
//   node analyze/analyze.mjs <run.normalized.json>... [--out dir]

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';
import {basename, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  curveError,
  frameVelocity,
  maxStep,
  plotSvg,
  settledAt,
  trackingError,
} from './metrics.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../../../..');
const require = createRequire(join(root, 'package.json'));
const {build} = require('esbuild');
const bundled = await build({
  stdin: {
    contents:
      "export {solveSpring, toSpring} from './packages/core/src/motion/spring';",
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  logLevel: 'warning',
});
const {solveSpring, toSpring} = await import(
  'data:text/javascript;base64,' +
    Buffer.from(bundled.outputFiles[0].text).toString('base64')
);

export function analyzeRun(run) {
  const {trace, frames} = run;
  const touchList = run.touches ?? (run.finger ? [run.finger] : []);
  const finger = touchList[0] ?? [];
  const g = trace.meta.geometry;
  const toTop = s => g.H - s;
  const events = trace.events;
  const busy = [];
  let open = null;
  for (const e of events) {
    if (e.type === 'busy-start') {
      open = e.t;
    } else if (e.type === 'busy-end' && open != null) {
      busy.push([open, e.t]);
      open = null;
    }
  }
  const touches = events.filter(e => /^(touchstart|pointerdown)$/.test(e.type));
  const ends = events.filter(e => /^(touchend|pointerup)$/.test(e.type));
  const springs = events.filter(e => e.type === 'spring');
  const result = {
    id: run.id,
    mode: trace.meta.params.mode,
    params: trace.meta.params,
    busy,
  };

  // Tracking per touch, from its press to its lift (finger samples on the
  // events' own timestamps, so a busy block does not hide them).
  result.tracking = touchList
    .filter(samples => samples.length > 2)
    .map(samples =>
      trackingError({
        frames,
        finger: samples,
        from: samples[0][0],
        to: samples[samples.length - 1][0],
        busy,
      }),
    );
  // Re-grab: the sheet's largest frame-to-frame step around the grab.
  const regrabEvent = events.find(e => e.type === 'regrab');
  if (regrabEvent != null) {
    result.regrab = {
      t: regrabEvent.t,
      presentation: regrabEvent.presentation ?? regrabEvent.s,
      maxStepAround: maxStep(frames, regrabEvent.t - 34, regrabEvent.t + 50),
      sheetSpeedBefore: frameVelocity(
        frames,
        regrabEvent.t - 50,
        regrabEvent.t,
      ),
    };
  }

  // Release: the spring the page started, against the frames after it.
  const release = springs.find(
    s => s.reason === 'release' || s.reason === 'reconcile',
  );
  if (release != null) {
    const curve = solveSpring(toSpring(release.spring), {
      from: release.from,
      to: release.to,
      velocity: release.velocity,
    });
    result.spring = {
      reason: release.reason,
      from: release.from,
      to: release.to,
      velocity: release.velocity,
      settleMs: release.settle,
      loggedAt: release.t,
    };
    result.curve = curveError({
      frames,
      spring: release,
      curveValue: t => curve.value(t),
      settleMs: release.settle,
      toTop,
    });
    const end = ends[ends.length - 1];
    if (end != null) {
      // Continuity at the handoff: the sheet's speed just before the lift
      // and in the frames right after the spring took over, and the largest
      // single-frame step across the handoff.
      const liftT = end.ts ?? end.t;
      result.handoff = {
        liftT,
        pageLagMs: end.lag,
        late: end.late ?? false,
        sheetSpeedBefore: frameVelocity(frames, liftT - 60, liftT),
        sheetSpeedAfter: frameVelocity(frames, release.t + 10, release.t + 60),
        springSpeedAt0: -release.velocity,
        maxStepAround: maxStep(frames, liftT - 34, release.t + 50),
      };
    }
    const lastFrame = frames[frames.length - 1];
    result.settledAt = settledAt(frames, release.t, toTop(release.to), 1);
    result.restsAt = lastFrame?.y;
  }
  result.events = events
    .filter(e =>
      /touch|pointer|release|spring|settled|regrab|reconcile|rest|scroll-during/.test(
        e.type,
      ),
    )
    .map(e => ({
      t: e.t,
      type: e.type,
      ...(e.lag != null ? {lag: e.lag} : {}),
      ...(e.late != null ? {late: e.late} : {}),
      ...(e.target != null ? {target: e.target} : {}),
      ...(e.s != null ? {s: e.s} : {}),
    }));

  // Plot.
  const t0 = (touches[0]?.ts ?? touches[0]?.t ?? frames[0]?.t ?? 0) - 150;
  const tEnd = Math.max(
    (release?.t ?? t0) + (release?.settle ?? 600) + 300,
    (touchList.flat().at(-1)?.[0] ?? t0) + 400,
  );
  const offset = result.tracking[0]?.offset ?? 0;
  const expected = [];
  if (release != null) {
    const curve = solveSpring(toSpring(release.spring), {
      from: release.from,
      to: release.to,
      velocity: release.velocity,
    });
    const lag = result.curve?.lag ?? 0;
    for (let t = 0; t <= release.settle; t += 4) {
      expected.push([release.t + lag + t, toTop(curve.value(t / 1000))]);
    }
  }
  const ys = [
    ...frames.filter(f => f.t >= t0 && f.t <= tEnd).map(f => f.y),
    ...touchList.flat().map(([, y]) => y - offset),
    ...expected.map(([, y]) => y),
  ].filter(Number.isFinite);
  const yMin = Math.floor((Math.min(...ys) - 20) / 50) * 50;
  const yMax = Math.ceil((Math.max(...ys) + 20) / 50) * 50;
  result.svg = plotSvg({
    title: `${run.id}`,
    frames: frames.filter(f => f.y != null),
    finger: touchList.flat().map(([t, y]) => [t, y - offset]),
    expected,
    busy,
    marks: [
      ...ends.map(e => ({t: e.ts ?? e.t, label: 'lift', color: '#ff9500'})),
      ...springs.map(s => ({
        t: s.t,
        label: `spring (${s.reason})`,
        color: '#19c37d',
      })),
      ...events
        .filter(e => e.type === 'regrab')
        .map(e => ({t: e.t, label: 're-grab', color: '#af52de'})),
    ],
    tRange: [t0, tEnd],
    yRange: [yMin, yMax],
  });
  return result;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const outDir = args.includes('--out')
    ? args[args.indexOf('--out') + 1]
    : 'analysis';
  mkdirSync(outDir, {recursive: true});
  const files = args.filter(
    (a, i) => !a.startsWith('--') && args[i - 1] !== '--out',
  );
  const summary = [];
  for (const file of files) {
    const run = JSON.parse(readFileSync(file, 'utf8'));
    const r = analyzeRun(run);
    writeFileSync(join(outDir, `${basename(file, '.json')}.svg`), r.svg);
    delete r.svg;
    summary.push(r);
    console.log(
      JSON.stringify({
        id: r.id,
        tracking: r.tracking,
        curve: r.curve,
        handoff: r.handoff,
        regrab: r.regrab,
        settledAt: r.settledAt,
        restsAt: r.restsAt,
      }),
    );
  }
  writeFileSync(join(outDir, 'summary.json'), JSON.stringify(summary, null, 1));
}
