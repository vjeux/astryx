// Per frame: the vertical shift (device px) that best maps each of the last
// four rows' bands onto the clip's last frame. Bands come from the take's JSON
// (the sampler's rest boxes, page pt; iOS screen = page + 62 pt, 3 px/pt).
// Usage: node shift2.mjs <take.mp4> <take.json>
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

const [file, json] = process.argv.slice(2);
const take = JSON.parse(fs.readFileSync(json, 'utf8'));
const rest = take.lc.samples[0].last; // [[top, bottom] x4], page pt
const W = 1206;
const toPx = pt => Math.round((pt + 62) * 3);
const bands = rest.map(([t, b]) => [toPx(t) + 8, toPx(b) - 8]);
const CY = Math.max(0, Math.min(...bands.map(b => b[0])) - 40);
const H = Math.max(...bands.map(b => b[1])) + 40 - CY;
const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vsync', 'passthrough', '-vf', `crop=${W}:${H}:0:${CY},format=gray`, '-f', 'rawvideo', '-'], {maxBuffer: 1.5e9});
const n = Math.floor(raw.length / (W * H));
const frame = k => raw.subarray(k * W * H, (k + 1) * W * H);
const last = frame(n - 1);
const X0 = 60, X1 = 1140;
function bestShift(f, [y0, y1]) {
  let best = null;
  for (let s = -9; s <= 9; s += 1) {
    let sad = 0;
    for (let y = y0 - CY; y < y1 - CY; y += 1) {
      const a = y * W, b = (y + s) * W;
      for (let x = X0; x < X1; x += 2) sad += Math.abs(f[a + x] - last[b + x]);
    }
    if (best == null || sad < best.sad) best = {s, sad};
  }
  const px = (y1 - y0) * ((X1 - X0) / 2);
  return `${best.s >= 0 ? '+' : ''}${best.s}/${(best.sad / px).toFixed(2)}`;
}
console.log(`frames ${n} bands ${JSON.stringify(bands)} keys ${JSON.stringify(take.lc.samples.at(-1).keys)}`);
for (let k = 0; k < n; k += 1) {
  const f = frame(k);
  console.log(`${String(k).padStart(3)}  ${bands.map((b, i) => `r${i} ${bestShift(f, b).padEnd(10)}`).join(' ')}`);
}
