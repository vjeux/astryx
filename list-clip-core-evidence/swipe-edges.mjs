// For a partial-swipe take: per frame, how much the strips just outside the
// list's inline edges (inside the swiped row's band) differ from the first
// frame (at rest). A clipped list leaves them unchanged; content painting past
// the list's edge changes them. Also writes the held frame's content crop.
// Usage: node swipe-edges.mjs <take.mp4> <take.json> <out-prefix>
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

const [file, json, prefix] = process.argv.slice(2);
const take = JSON.parse(fs.readFileSync(json, 'utf8'));
const W = 1206;
const px = pt => Math.round(pt * 3);
const [ll, , lr] = take.geo.list; // page pt
const [, rt, , rb] = take.geo.row;
const y0 = px(rt + 62) + 6, y1 = px(rb + 62) - 6;
const H = y1 - y0;
const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vsync', 'passthrough', '-vf', `crop=${W}:${H}:0:${y0},format=gray`, '-f', 'rawvideo', '-'], {maxBuffer: 1.5e9});
const n = Math.floor(raw.length / (W * H));
const frame = k => raw.subarray(k * W * H, (k + 1) * W * H);
const first = frame(0);
// Strips outside the list, 2 px clear of its edges: left [0, ll*3-2), right [lr*3+2, W).
const L1 = px(ll) - 2, R0 = px(lr) + 2;
const diff = (f, x0, x1) => {
  let s = 0, c = 0, mx = 0;
  for (let y = 0; y < H; y++) for (let x = x0; x < x1; x++) { const d = Math.abs(f[y * W + x] - first[y * W + x]); s += d; c++; if (d > mx) mx = d; }
  return {mean: s / c, max: mx};
};
// Motion inside the row: how far the row's content moved (mean abs diff over the row's own width).
const inside = f => diff(f, px(ll) + 2, px(lr) - 2).mean;
let worst = {k: -1, left: 0, right: 0}, held = -1, heldMotion = 0;
const lines = [];
for (let k = 0; k < n; k++) {
  const f = frame(k);
  const l = diff(f, 0, L1), r = diff(f, R0, W), m = inside(f);
  if (l.max > worst.left || r.max > worst.right) worst = {k, left: Math.max(worst.left, l.max), right: Math.max(worst.right, r.max)};
  if (m > heldMotion) { heldMotion = m; held = k; }
  lines.push(`${String(k).padStart(3)} left mean ${l.mean.toFixed(2)} max ${l.max} | right mean ${r.mean.toFixed(2)} max ${r.max} | row motion ${m.toFixed(2)}`);
}
fs.writeFileSync(`${prefix}.edges.txt`, lines.join('\n') + '\n');
console.log(`${file}: frames ${n}, list x ${px(ll)}-${px(lr)} px, row y ${y0}-${y1}px | outside-strip max diff: left ${worst.left}, right ${worst.right} | peak row motion ${heldMotion.toFixed(2)} at frame ${held}`);
// The held frame's content crop (the row band plus a margin), full width.
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', file, '-vf', `select=eq(n\\,${held}),crop=${W}:${H + 120}:0:${y0 - 60}`, '-frames:v', '1', `${prefix}.held.png`]);
