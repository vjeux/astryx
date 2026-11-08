// For a focus-tap take: the field's left border colour on each screen frame,
// read from a band inside the border away from the tap point and the caret.
// Counts the frames whose border sits strictly between the resting colour and
// the focused colour (an in-between border), and the frames that change.
// Usage: node border-timeline.mjs <take.mp4> <take.json>
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

const [file, json] = process.argv.slice(2);
const take = JSON.parse(fs.readFileSync(json, 'utf8'));
const tops = new Set(take.ft.samples.map(s => s.wTop));
if (tops.size > 1) {
  console.log(JSON.stringify({file: file.split('/').pop(), skipped: 'the field moves'}));
  process.exit(0);
}
const W = 1206;
const [l, t, , b] = take.setup.wrapper;
// The left border is 1 pt (3 device px) wide at the wrapper's left edge.
const x0 = Math.round(l * 3);
const y0 = Math.round((t + 62) * 3) + 18;
const y1 = Math.round((b + 62) * 3) - 18;
const H = y1 - y0;
const CW = 3;
const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vsync', 'passthrough', '-vf', `crop=${CW}:${H}:${x0}:${y0}:exact=1,format=gray`, '-f', 'rawvideo', '-'], {maxBuffer: 2e9});
const n = Math.floor(raw.length / (CW * H));
const values = [];
for (let k = 0; k < n; k++) {
  const f = raw.subarray(k * CW * H, (k + 1) * CW * H);
  let min = 255;
  for (const v of f) if (v < min) min = v;
  values.push(min);
}
const rest = values[0];
const final = values[n - 1];
const span = rest - final;
const between = values
  .map((v, k) => [k, v])
  .filter(([, v]) => v < rest - 0.1 * span && v > final + 0.1 * span);
const steps = values.map((v, k) => [k, v]).filter(([k, v]) => k > 0 && Math.abs(v - values[k - 1]) > 0.1 * span);
console.log(JSON.stringify({file: file.split("/").pop(), n, rest, final, inBetweenFrames: between.length, inBetween: between.map(([k, v]) => `${k}:${v}`).join(' '), steps: steps.map(([k, v]) => `${k}:${v}`).join(' ')}));
