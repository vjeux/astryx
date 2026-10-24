// Copyright (c) Meta Platforms, Inc. and affiliates.

// Chromium regression pass for the sheet host spike (correctness only).
// Headless Chromium delivers CDP touch input through the main thread, so it
// cannot prove tracking under a blocked main thread; the iOS simulator does
// that. This checks that both hosts land where the spring and the projection
// say, that the hybrid's handoff and swap leave no residue, that the
// compositor spring matches the motion foundation's closed form frame by frame, and that a
// re-grab mid-spring does not jump.
//
// Run from the repo root (after build.mjs):
//   PLAYWRIGHT_BROWSERS_PATH=... node internal/spikes/c17-sheet-host/chromium/regress.mjs [--out dir]

import {createRequire} from 'node:module';
import http from 'node:http';
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../../../..');
const require = createRequire(join(root, 'package.json'));
const {chromium} = require('playwright');
const {build} = require('esbuild');

const outDir = process.argv.includes('--out')
  ? process.argv[process.argv.indexOf('--out') + 1]
  : join(here, '../out/chromium');
mkdirSync(outDir, {recursive: true});

// The motion foundation's closed-form spring, bundled for Node, to check the compositor curve.
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

const html = readFileSync(join(here, '../dist/index.html'));
const server = http.createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(html);
});
await new Promise(resolve => server.listen(0, resolve));
const base = `http://localhost:${server.address().port}/index.html`;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: {width: 393, height: 852},
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

const SAMPLER = `(() => {
  const sheet = document.getElementById('sheet');
  const host = document.getElementById('host');
  const dim = document.getElementById('dim');
  const out = [];
  let on = true;
  const f = now => {
    out.push([Math.round(now * 10) / 10, Math.round(sheet.getBoundingClientRect().top * 100) / 100,
      Math.round(host.scrollTop * 100) / 100, Math.round(Number(getComputedStyle(dim).opacity) * 1000) / 1000]);
    if (on) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
  window.__stopSampler = () => { on = false; return out; };
})()`;

// Headless Chromium takes ~30-50 ms to deliver each CDP touch event, so a
// real-time flick arrives as a slow drag. Every event therefore carries an
// explicit timestamp on the intended schedule: the page's event.timeStamp
// and Chromium's own fling velocity both read it. Runs pass latems=5000 so
// the hybrid does not take the late delivery for a missed release.
async function touch(cdp, type, x, y, timestamp) {
  await cdp.send('Input.dispatchTouchEvent', {
    type,
    touchPoints: type === 'touchEnd' ? [] : [{x, y, id: 1}],
    timestamp,
  });
}

/** Straight-line drag: press, move `dy` over `ms` in 8 ms steps, hold, lift. */
async function drag(cdp, [x, y], dy, ms, {holdMs = 0, liftAfterMs = 8} = {}) {
  let t = Date.now() / 1000;
  await touch(cdp, 'touchStart', x, y, t);
  const steps = Math.max(1, Math.round(ms / 8));
  for (let i = 1; i <= steps; i++) {
    t += ms / steps / 1000;
    await touch(cdp, 'touchMove', x, y + (dy * i) / steps, t);
  }
  t += (holdMs + liftAfterMs) / 1000;
  if (holdMs > 0) {
    await sleep(holdMs);
  }
  await touch(cdp, 'touchEnd', x, y + dy, t);
}

async function runScenario({name, query, gesture, expect}) {
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}?${query}&label=${name}`);
  await page.waitForFunction(() => window.__ready === true);
  const geo = await page.evaluate(() => window.__geometry);
  await page.evaluate(SAMPLER);
  const marks = {};
  await gesture({cdp, geo, page, marks});
  await sleep(1400);
  const samples = await page.evaluate(() => window.__stopSampler());
  const trace = await page.evaluate(() => window.__trace);
  const end = await page.evaluate(() => {
    const host = document.getElementById('host');
    const sheet = document.getElementById('sheet');
    return {
      sheetTop: sheet.getBoundingClientRect().top,
      scrollTop: host.scrollTop,
      overflowY: host.style.overflowY,
      snap: host.style.scrollSnapType,
      animations: sheet.getAnimations().length,
    };
  });
  await page.close();
  const H = geo.viewport.h;
  const finalS = H - end.sheetTop;
  const checks = [];
  const check = (what, ok, detail) => checks.push({what, ok, detail});
  check('no page errors', errors.length === 0, errors.join('; '));
  if (expect.detent != null) {
    const want = geo.detents[expect.detent];
    check(
      `rests at ${expect.detent} (${want})`,
      Math.abs(finalS - want) < 1,
      `S=${finalS.toFixed(1)}`,
    );
  }
  check('no running animation left', end.animations === 0, `${end.animations}`);
  if (query.includes('mode=hybrid')) {
    check('overflow restored', end.overflowY === '', end.overflowY);
    check('snap restored', end.snap === '', end.snap);
  }
  // Curve: every rAF sample after the release spring starts against the foundation's
  // closed form, aligned on the animation's start frame.
  const spring = trace.events.find(
    e => e.type === 'spring' && e.reason === 'release',
  );
  let curveError = null;
  if (spring != null && expect.curve !== false) {
    const curve = solveSpring(toSpring(spring.spring), {
      from: spring.from,
      to: spring.to,
      velocity: spring.velocity,
    });
    const after = samples.filter(
      ([t]) => t >= spring.t && t <= spring.t + spring.settle + 50,
    );
    let best = null;
    for (let lag = 0; lag <= 34; lag += 0.5) {
      let max = 0;
      for (const [t, top] of after) {
        const te = (t - spring.t - lag) / 1000;
        const want = H - (te <= 0 ? spring.from : curve.value(te));
        max = Math.max(max, Math.abs(top - want));
      }
      if (best == null || max < best.max) {
        best = {lag, max};
      }
    }
    curveError = best;
    check(
      'compositor curve = closed form (≤1 px every frame)',
      best != null && best.max <= 1,
      best &&
        `max ${best.max.toFixed(2)} px at start lag ${best.lag} ms, ${after.length} frames`,
    );
  }
  // Regrab continuity: the sheet's top in the frames around the grab.
  if (marks.grabAt != null) {
    const before = samples.filter(([t]) => t <= marks.grabAt).slice(-2);
    const afterGrab = samples.filter(([t]) => t > marks.grabAt).slice(0, 3);
    const seq = [...before, ...afterGrab].map(s => s[1]);
    let maxStep = 0;
    for (let i = 1; i < seq.length; i++) {
      maxStep = Math.max(maxStep, Math.abs(seq[i] - seq[i - 1]));
    }
    const regrab = trace.events.find(e => e.type === 'regrab');
    check('re-grab happened', regrab != null, JSON.stringify(regrab ?? null));
    check(
      'no jump at re-grab (frame step ≤ 40 px)',
      maxStep <= 40,
      `tops ${seq.map(v => v.toFixed(1)).join(', ')}`,
    );
  }
  if (expect.tracking) {
    // While the finger moves, sheet top − finger y stays constant (1:1).
    const moves = trace.moves;
    const diffs = [];
    for (const [, y, handledAt] of moves) {
      const frame = samples.find(([ts]) => ts > handledAt);
      if (frame != null) {
        diffs.push(frame[1] - y);
      }
    }
    const spread =
      diffs.length > 2
        ? Math.max(...diffs.slice(2)) - Math.min(...diffs.slice(2))
        : NaN;
    check(
      'tracks 1:1 while the page is free (spread ≤ 12 px)',
      spread <= 12,
      `spread ${spread.toFixed?.(1)} px over ${diffs.length} moves`,
    );
  }
  const result = {
    name,
    query,
    checks,
    finalS,
    curveError,
    end,
    geo,
    samples,
    trace,
  };
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(result));
  return result;
}

const grab = geo => geo.grab;
const scenarios = [];
const VARIANTS = [
  ['hybrid', 'mode=hybrid'],
  ['hybrid-instant', 'mode=hybrid&stop=instant'],
  ['hybrid-snapoff', 'mode=hybrid&snaptouch=0'],
  ['hybrid-snapoff-instant', 'mode=hybrid&snaptouch=0&stop=instant'],
  ['hybrid-read', 'mode=hybrid&handoff=read&snaptouch=0'],
  ['js', 'mode=js'],
];
const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null;
for (const [tag0, q0] of VARIANTS) {
  if (only != null && !tag0.match(new RegExp(only))) continue;
  {
    const q = `${q0}&latems=5000`;
    const tag = tag0;
    scenarios.push(
      {
        name: `${tag}-slow-up-back-to-medium`,
        query: `${q}&open=medium`,
        gesture: ({cdp, geo}) => drag(cdp, grab(geo), -150, 600, {holdMs: 200}),
        expect: {detent: 'medium', tracking: true},
      },
      {
        name: `${tag}-flick-up-to-large`,
        query: `${q}&open=medium`,
        gesture: ({cdp, geo}) => drag(cdp, grab(geo), -120, 80),
        expect: {detent: 'large'},
      },
      {
        name: `${tag}-flick-down-to-medium`,
        query: `${q}&open=large`,
        // 750 px/s from large projects to ~438 (rate 0.998): medium.
        gesture: ({cdp, geo}) => drag(cdp, grab(geo), 60, 80),
        expect: {detent: 'medium'},
      },
      {
        name: `${tag}-flick-dismiss`,
        query: `${q}&open=medium`,
        gesture: ({cdp, geo}) => drag(cdp, grab(geo), 150, 48),
        expect: {detent: 'closed'},
      },
      {
        name: `${tag}-regrab`,
        query: `${q}&open=medium`,
        gesture: async ({cdp, geo, page, marks}) => {
          await drag(cdp, grab(geo), -120, 80);
          await sleep(100);
          marks.grabAt = await page.evaluate(() => performance.now());
          const [x, y] = geo.body;
          await drag(cdp, [x, y], 100, 300, {holdMs: 200});
        },
        expect: {curve: false},
      },
    );
  }
}
if (only == null)
  scenarios.push({
    name: 'hybrid-native-flick-up',
    query: 'mode=hybrid&release=native&open=medium&latems=5000',
    gesture: ({cdp, geo}) => drag(cdp, grab(geo), -120, 80),
    expect: {detent: 'large', curve: false},
  });

const results = [];
for (const s of scenarios) {
  const r = await runScenario(s);
  results.push(r);
  const bad = r.checks.filter(c => !c.ok);
  console.log(`${bad.length === 0 ? 'PASS' : 'FAIL'} ${r.name}`);
  for (const c of r.checks) {
    console.log(
      `   ${c.ok ? 'ok ' : 'BAD'} ${c.what}${c.detail ? ` — ${c.detail}` : ''}`,
    );
  }
}
writeFileSync(
  join(outDir, 'summary.json'),
  JSON.stringify(
    results.map(({name, checks, finalS, curveError}) => ({
      name,
      checks,
      finalS,
      curveError,
    })),
    null,
    1,
  ),
);
await browser.close();
server.close();
const failed = results.filter(r => r.checks.some(c => !c.ok));
console.log(
  `\n${results.length - failed.length}/${results.length} scenarios pass`,
);
process.exitCode = failed.length === 0 ? 0 : 1;
