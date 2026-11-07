// For a take with the header/overlay scene: per frame, the share of each
// band's pixels that are not the band's own solid colour (something painted
// over it), plus what a tap at each band's centre hit on each sampled frame.
// Usage: node band-paint.mjs <take.mp4> <take.json>
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

const [file, json] = process.argv.slice(2);
const take = JSON.parse(fs.readFileSync(json, 'utf8'));
const W = 1206;
const toX = pt => Math.round(pt * 3);
const toY = pt => Math.round((pt + 62) * 3);
const bands = {
  header: {rect: take.scene.header, rgb: [255, 0, 255]},
  overlay: {rect: take.scene.overlay, rgb: [0, 255, 255]},
};
const y0 = Math.min(...Object.values(bands).map(b => toY(b.rect[1]))) - 4;
const y1 = Math.max(...Object.values(bands).map(b => toY(b.rect[3]))) + 4;
const H = y1 - y0;
const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vsync', 'passthrough', '-vf', `crop=${W}:${H}:0:${y0},format=rgb24`, '-f', 'rawvideo', '-'], {maxBuffer: 2e9});
const n = Math.floor(raw.length / (W * H * 3));
const out = {frames: n};
for (const [name, b] of Object.entries(bands)) {
  // 6 px inside each edge, clear of the band's anti-aliased border.
  const [l, t, r, bt] = [toX(b.rect[0]) + 6, toY(b.rect[1]) + 6 - y0, toX(b.rect[2]) - 6, toY(b.rect[3]) - 6 - y0];
  const per = [];
  for (let k = 0; k < n; k++) {
    let off = 0, c = 0;
    const base = k * W * H * 3;
    for (let y = t; y < bt; y += 2) for (let x = l; x < r; x += 2) {
      const i = base + (y * W + x) * 3;
      const d = Math.abs(raw[i] - b.rgb[0]) + Math.abs(raw[i + 1] - b.rgb[1]) + Math.abs(raw[i + 2] - b.rgb[2]);
      if (d > 90) off++;
      c++;
    }
    per.push(off / c);
  }
  const bad = per.map((v, k) => [k, v]).filter(([, v]) => v > 0.002);
  out[name] = {framesPaintedOver: bad.length, maxShare: Math.max(...per).toFixed(4), frames: bad.slice(0, 40).map(([k, v]) => `${k}:${(v * 100).toFixed(1)}%`).join(' ')};
}
const samples = take.lc.samples.filter(s => s.tag === 'raf' || s.tag === 'touchend');
const hitCount = (i, want) => samples.filter(s => s.hits && s.hits[i] !== want).map(s => `${s.t}ms:${s.hits[i]}`);
out.tapsDuringGlide = {samples: samples.length, headerMisses: hitCount(0, 'header').slice(0, 10), overlayMisses: hitCount(1, 'overlay').slice(0, 10)};
const isoAuto = samples.filter(s => s.iso === 'auto').map(s => s.t);
out.listIsolationAutoMs = isoAuto.length ? `${isoAuto[0]}..${isoAuto.at(-1)} (${isoAuto.length} frames)` : 'never';
out.dropIso = take.dropIso;
console.log(JSON.stringify(out));
