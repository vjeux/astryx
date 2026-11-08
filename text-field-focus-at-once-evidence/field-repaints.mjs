// For a focus-tap take: per screen frame after the tap, whether the field's
// own box (its wrapper, 3 pt around) changed from the previous frame. The
// field must hold still (its page top is constant in the take's samples).
// Usage: node field-repaints.mjs <take.mp4> <take.json>
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

const [file, json] = process.argv.slice(2);
const take = JSON.parse(fs.readFileSync(json, 'utf8'));
const tops = new Set(take.ft.samples.map(s => s.wTop));
if (tops.size > 1) {
  console.log(JSON.stringify({file, skipped: 'the field moves', tops: [...tops].slice(0, 4)}));
  process.exit(0);
}
const W = 1206;
const [l, t, r, b] = take.setup.wrapper;
const x0 = Math.max(0, Math.round((l - 3) * 3)), x1 = Math.min(W, Math.round((r + 3) * 3));
const y0 = Math.round((t - 3 + 62) * 3), y1 = Math.round((b + 3 + 62) * 3);
const H = y1 - y0, CW = x1 - x0;
const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vsync', 'passthrough', '-vf', `crop=${CW}:${H}:${x0}:${y0}:exact=1,format=gray`, '-f', 'rawvideo', '-'], {maxBuffer: 2e9});
const n = Math.floor(raw.length / (CW * H));
const frame = k => raw.subarray(k * CW * H, (k + 1) * CW * H);
const diffs = [];
for (let k = 1; k < n; k++) {
  const a = frame(k - 1), c = frame(k);
  let s = 0;
  for (let i = 0; i < a.length; i += 2) s += Math.abs(a[i] - c[i]);
  diffs.push(s / (a.length / 2));
}
// The tap's caret and the field's focus look are the only changes in the box.
const changed = diffs.map((d, i) => [i + 1, d]).filter(([, d]) => d > 0.4);
console.log(JSON.stringify({file: file.split('/').pop(), frames: n, changedFrames: changed.length, changes: changed.map(([k, d]) => `${k}:${d.toFixed(2)}`).join(' ')}));
