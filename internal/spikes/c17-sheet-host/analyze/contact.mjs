// Copyright (c) Meta Platforms, Inc. and affiliates.

// Contact sheets for the report: frames of one or more runs at the same
// times relative to each run's press (page clock, from the recording's clock
// bar), cropped to the page, labelled with the time, one row per run.
//
//   node analyze/contact.mjs --out sheet.png --times 0,200,400,... \
//     --run <normalized.json>:<video.mp4>:<label> [...]

import {execFileSync} from 'node:child_process';
import {mkdtempSync, readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const args = process.argv.slice(2);
const opt = name => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const out = opt('--out');
const times = opt('--times').split(',').map(Number);
const runs = [];
args.forEach((a, i) => {
  if (a === '--run') {
    const [json, video, ...rest] = args[i + 1].split(':');
    const label = rest.join(':').replace(/:/g, '\\:');
    runs.push({json, video, label});
  }
});
const font = '/usr/share/fonts/dejavu-sans-fonts/DejaVuSans.ttf';
const work = mkdtempSync(join(tmpdir(), 'contact-'));
const rows = [];
for (const [r, {json, video, label}] of runs.entries()) {
  const run = JSON.parse(readFileSync(json, 'utf8'));
  const press = run.trace.events.find(e => /^(touchstart|pointerdown)$/.test(e.type));
  const t0 = press.ts;
  const top = Math.round(run.meta.top * run.meta.scale);
  const pageH = Math.round(run.trace.meta.geometry.H * run.meta.scale);
  const cells = [];
  for (const [c, dt] of times.entries()) {
    // Frame nearest to press + dt on the page clock.
    let best = run.frames[0];
    for (const f of run.frames) {
      if (Math.abs(f.t - (t0 + dt)) < Math.abs(best.t - (t0 + dt))) {
        best = f;
      }
    }
    const busy = run.trace.events.some((e, i, all) => {
      if (e.type !== 'busy-start') return false;
      const end = all.slice(i).find(x => x.type === 'busy-end');
      return end && best.t >= e.t && best.t <= end.t;
    });
    const cell = join(work, `r${r}c${c}.png`);
    const text = `+${dt} ms${busy ? '  JS BLOCKED' : ''}`;
    execFileSync('ffmpeg', [
      '-v', 'error', '-y', '-i', video,
      '-vf',
      `select='eq(n\\,${best.n})',crop=iw:${pageH}:0:${top},scale=200:-1,` +
        `drawtext=fontfile=${font}:text='${text}':x=6:y=h-22:fontsize=13:fontcolor=white:box=1:boxcolor=black@0.7:boxborderw=4`,
      '-frames:v', '1', cell,
    ]);
    cells.push(cell);
  }
  const row = join(work, `row${r}.png`);
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    ...cells.flatMap(c => ['-i', c]),
    '-filter_complex',
    `${cells.map((_, i) => `[${i}:v]`).join('')}hstack=inputs=${cells.length},pad=iw:ih+28:0:28:color=white,drawtext=fontfile=${font}:text='${label}':x=8:y=6:fontsize=16:fontcolor=black`,
    row,
  ]);
  rows.push(row);
}
execFileSync('ffmpeg', [
  '-v', 'error', '-y',
  ...rows.flatMap(r => ['-i', r]),
  '-filter_complex', rows.length > 1 ? `${rows.map((_, i) => `[${i}:v]`).join('')}vstack=inputs=${rows.length}` : 'null',
  out,
]);
console.log(out);
