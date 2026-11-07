#!/usr/bin/env node
// Held-frame comparison for the List batch card's iPhone takes. For each clip
// and take, it extracts every frame of the take's mp4, finds the drop (the
// first big change after the expected release), takes the held frame just
// before it, and compares held frames between takes inside and outside the
// preview's box (read from the page at the finger's lift).
// Usage: node frames-held.mjs <repo-with-node_modules> <takes dir> <out dir>
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [repo, dir, outDir] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json'));
const {PNG} = require('pngjs');
const FFMPEG = path.join(process.env.HOME, 'ios-astryx/tools/ffmpeg/ffmpeg');
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
const CLIPS = ['transferlist-after', 'listinput-after', 'list-after', 'list-busy-drop'];
const TAKES = ['v15a', 'v15b', 'v16a', 'v16b'];
const SCREEN_POINTS = 402;
const PAGE_TOP = 62;
const FPS = 30;
// A channel step above this counts as a real difference, not encoder noise.
const REAL = 24;

function frames(clip, take) {
  const target = path.join(outDir, `${clip}-${take}`);
  if (!fs.existsSync(path.join(target, '0001.png'))) {
    fs.mkdirSync(target, {recursive: true});
    execFileSync(FFMPEG, ['-loglevel', 'error', '-i', path.join(dir, `${clip}-${take}.mp4`), '-vf', `fps=${FPS}`, path.join(target, '%04d.png')]);
  }
  return fs.readdirSync(target).filter(f => f.endsWith('.png')).sort().map(f => path.join(target, f));
}

const read = file => PNG.sync.read(fs.readFileSync(file));

function compare(a, b, box) {
  let inside = 0, outside = 0, insideReal = 0, outsideReal = 0, maxInside = 0, maxOutside = 0;
  for (let y = 0; y < a.height; y += 1) {
    for (let x = 0; x < a.width; x += 1) {
      const i = (y * a.width + x) * 4;
      const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
      if (d === 0) continue;
      const isInside = box != null && x >= box.x0 && x < box.x1 && y >= box.y0 && y < box.y1;
      if (isInside) { inside += 1; maxInside = Math.max(maxInside, d); if (d > REAL) insideReal += 1; }
      else { outside += 1; maxOutside = Math.max(maxOutside, d); if (d > REAL) outsideReal += 1; }
    }
  }
  return {inside, insideReal, maxInside, outside, outsideReal, maxOutside};
}

function changed(a, b) {
  let n = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    if (Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2])) > REAL) n += 1;
  }
  return n;
}

const report = {};
for (const clip of CLIPS) {
  report[clip] = {};
  const held = {};
  for (const take of TAKES) {
    const m = meta[`${clip}-${take}`];
    if (m == null) { report[clip][take] = 'no take'; continue; }
    const list = frames(clip, take);
    // The hold: the longest run of still frames between the drag's end and
    // a second past the expected release (0.7 s lead, the press, the drag,
    // the hold). Its last frame is the held frame; the next one starts the
    // drop.
    const expected = 0.7 + m.press + m.duration + m.hold;
    const from = Math.max(1, Math.round((0.7 + m.press + m.duration) * FPS));
    const to = Math.min(list.length - 1, Math.round((expected + 1.0) * FPS));
    let previous = read(list[from - 1]);
    const steps = [];
    let best = null;
    let run = null;
    for (let index = from; index <= to; index += 1) {
      const frame = read(list[index]);
      const n = changed(previous, frame);
      steps.push([index, n]);
      if (n < 200) {
        run = run == null ? {start: index - 1, end: index} : {...run, end: index};
        if (best == null || run.end - run.start > best.end - best.start) best = {...run};
      } else {
        run = null;
      }
      previous = frame;
    }
    const drop = best == null ? null : best.end + 1;
    const image = read(list[0]);
    const scale = image.width / SCREEN_POINTS;
    const p = m.lift?.preview;
    const box = p == null ? null : {
      x0: Math.floor(p.x * scale), x1: Math.ceil((p.x + p.width) * scale),
      y0: Math.floor((p.y + PAGE_TOP) * scale), y1: Math.ceil((p.y + p.height + PAGE_TOP) * scale),
    };
    const heldIndex = best == null ? null : best.end;
    held[take] = {file: heldIndex == null ? null : list[heldIndex], box};
    report[clip][take] = {frames: list.length, size: `${image.width}x${image.height}`, expectedRelease: expected, still: best == null ? null : [best.start, best.end], dropFrame: drop, heldFrame: heldIndex, box, lift: m.lift, order: (m.after ?? []).slice(0, 4), steps};
  }
  const pairs = [['v15a', 'v15b', 'same build (v15)'], ['v16a', 'v16b', 'same build (v16d)'], ['v15a', 'v16a', 'cross'], ['v15b', 'v16b', 'cross'], ['v15a', 'v16b', 'cross'], ['v15b', 'v16a', 'cross']];
  report[clip].pairs = pairs.map(([a, b, kind]) => {
    if (held[a]?.file == null || held[b]?.file == null) return {a, b, kind, result: 'missing held frame'};
    return {a, b, kind, result: compare(read(held[a].file), read(held[b].file), held[a].box)};
  });
}
fs.writeFileSync(path.join(outDir, 'held-report.json'), JSON.stringify(report, null, 1));
for (const clip of CLIPS) {
  console.log(`== ${clip}`);
  for (const take of TAKES) {
    const r = report[clip][take];
    if (typeof r === 'string') { console.log(` ${take}: ${r}`); continue; }
    console.log(` ${take}: release ~${r.expectedRelease.toFixed(2)} s (frame ${Math.round(r.expectedRelease * FPS)}), still frames ${JSON.stringify(r.still)}, held ${r.heldFrame}, box ${JSON.stringify(r.box)}, at lift: willChange ${r.lift?.willChange}, scrollY ${r.lift?.scrollY}`);
  }
  for (const pair of report[clip].pairs) console.log(` ${pair.kind} ${pair.a}/${pair.b}: ${JSON.stringify(pair.result)}`);
}
