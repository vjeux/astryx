// Copyright (c) Meta Platforms, Inc. and affiliates.

// Normalizes one iOS-simulator run folder from the rig (video.mp4,
// trace.json = the page's __trace, events.json = the rig probe's log,
// meta.json = geometry, injections, clock) into
//   {id, meta, trace, frames: [{n, pts, t, y, flash, red, green}], touches: [[[ts, y], ...], ...]}
// with every frame on the page clock.
//
// Page time per frame comes from the rig's compositor clock bar (top-left of
// the page, two 4 px blocks sweeping 96 px every 1000 ms and every 16000 ms
// on a CSS animation whose phase equals performance.now() modulo the
// period). The fine lane gives the time to a few ms, the coarse lane the
// second, the flash frames the 16 s cycle. Frames the recorder repeated
// (same clock reading as the previous frame) are dropped.
//
//   node analyze/extract-ios.mjs <run dir>... [--out dir]

import {execFileSync, spawn} from 'node:child_process';
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {basename, join} from 'node:path';

function decodeFrames(video, w, h, onFrame) {
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', ['-v', 'error', '-i', video, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-vsync', '0', '-']);
    const size = w * h * 3;
    let buf = Buffer.alloc(0);
    let n = 0;
    ff.stdout.on('data', chunk => {
      buf = buf.length === 0 ? chunk : Buffer.concat([buf, chunk]);
      while (buf.length >= size) {
        onFrame(buf.subarray(0, size), n++);
        buf = buf.subarray(size);
      }
    });
    ff.on('error', reject);
    ff.on('close', code => (code === 0 ? resolve(n) : reject(new Error(`ffmpeg exited ${code}`))));
  });
}

export async function extractRun(dir) {
  const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'));
  const trace = JSON.parse(readFileSync(join(dir, 'trace.json'), 'utf8'));
  const probe = JSON.parse(readFileSync(join(dir, 'events.json'), 'utf8'));
  const video = join(dir, 'video.mp4');
  const info = JSON.parse(
    execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-show_entries', 'frame=pts_time', '-of', 'json', video]).toString(),
  );
  const {width: w, height: h} = info.streams[0];
  const pts = info.frames.map(f => Number(f.pts_time));
  const screenW = meta.ready?.screen?.[0] ?? meta.geometry.viewport.w;
  const s = w / screenW;
  // Page viewport top on the screen (pt): injection screen y − page y.
  const inj = meta.injections?.[0];
  let top = 62;
  if (inj != null) {
    const nums = inj.args.map(Number).filter(Number.isFinite);
    top = nums[1] - inj.from[1];
  }
  const g = trace.meta.geometry;
  const scanX = Math.round(g.W * 0.75 * s);
  const vy = yPage => Math.round((yPage + top) * s);
  const isSheet = (r, gg, b) => b > 190 && r < 90 && gg > 30 && gg < 150 && b - r > 120;
  const lum = (f, x, y) => {
    const i = (y * w + x) * 3;
    return (f[i] + f[i + 1] + f[i + 2]) / 3;
  };

  // Clock lane: weighted centroid of dark pixels along the lane's middle row,
  // over x 0..100 page px. Returns {x} in page px (block centre) or {flash}.
  const lane = (f, yPage) => {
    const y = vy(yPage);
    const x1 = Math.round(100 * s);
    let sum = 0;
    let weight = 0;
    let dark = 0;
    for (let x = 0; x < x1; x++) {
      const darkness = Math.max(0, 255 - lum(f, x, y) - 40) / 215;
      if (darkness > 0.5) {
        dark++;
      }
      sum += darkness * x;
      weight += darkness;
    }
    if (dark > x1 * 0.6) {
      return {flash: true};
    }
    if (weight < 1) {
      return {x: null};
    }
    return {x: sum / weight / s};
  };

  const sheetTop = f => {
    for (let y = vy(0); y < h - 4; y++) {
      const i = (y * w + scanX) * 3;
      if (isSheet(f[i], f[i + 1], f[i + 2])) {
        let run = 1;
        for (let k = 1; k < 4; k++) {
          const j = ((y + k) * w + scanX) * 3;
          if (isSheet(f[j], f[j + 1], f[j + 2])) {
            run++;
          }
        }
        if (run === 4) {
          // Sub-pixel: blend with the pixel above by its blueness.
          const above = ((y - 1) * w + scanX) * 3;
          const frac = Math.min(1, Math.max(0, (f[above + 2] - 120) / 135));
          return (y - frac) / s - top;
        }
      }
    }
    return null;
  };

  const indicator = (f, rightFrom, rightTo) => {
    const x0 = Math.round((g.W - rightTo) * s);
    const x1 = Math.round((g.W - rightFrom) * s);
    const y0 = vy(12);
    const y1 = vy(32);
    const out = [];
    for (let y = y0; y < y1; y += 2) {
      for (let x = x0; x < x1; x += 2) {
        out.push(lum(f, x, y));
      }
    }
    return out;
  };
  const diff = (a, b) => (b == null ? 0 : a.reduce((acc, v, i) => acc + Math.abs(v - b[i]), 0) / a.length);

  const raw = [];
  let prevRed = null;
  let prevGreen = null;
  await decodeFrames(video, w, h, (f, n) => {
    const fine = lane(f, 2);
    const coarse = lane(f, 6);
    const red = indicator(f, 36, 56);
    const green = indicator(f, 8, 28);
    raw.push({
      n,
      pts: pts[n],
      flash: fine.flash === true || coarse.flash === true,
      fineX: fine.x ?? null,
      coarseX: coarse.x ?? null,
      y: sheetTop(f),
      redDiff: diff(red, prevRed),
      greenDiff: diff(green, prevGreen),
    });
    prevRed = red;
    prevGreen = green;
  });

  // Page time: block left = centre − 2; phase = left / 96.
  const phase = x => (((x - 2) / 96) % 1 + 1) % 1;
  // The 16 s cycle from the flashes: the first frame of each flash run is a
  // flash time from the probe log (nearest in order).
  const flashTimes = probe.filter(e => e.kind === 'flash').map(e => e.at);
  const flashFrames = raw.filter((fr, i) => fr.flash && !(raw[i - 1]?.flash));
  let offsetMs = null;
  if (flashFrames.length > 0 && flashTimes.length > 0) {
    // Pair the last flash run with the last flash time (the rig flashes after
    // the run too); fall back to the first pair.
    const pairs = [];
    for (let k = 1; k <= Math.min(flashFrames.length, flashTimes.length); k++) {
      pairs.push(flashTimes[flashTimes.length - k] - flashFrames[flashFrames.length - k].pts * 1000);
    }
    offsetMs = pairs[0];
  }
  const frames = [];
  let last = null;
  for (const fr of raw) {
    if (fr.flash || fr.fineX == null || fr.coarseX == null) {
      continue;
    }
    const t1 = phase(fr.fineX) * 1000;
    const t16 = phase(fr.coarseX) * 16000;
    const k = (((Math.round((t16 - t1) / 1000) % 16) + 16) % 16);
    const base = k * 1000 + t1;
    const approx = offsetMs == null ? base : fr.pts * 1000 + offsetMs;
    const m = Math.round((approx - base) / 16000);
    const t = Math.round((m * 16000 + base) * 10) / 10;
    if (last != null && Math.abs(t - last.t) < 3) {
      continue; // repeated frame
    }
    const frame = {
      n: fr.n,
      pts: fr.pts,
      t,
      y: fr.y == null ? null : Math.round(fr.y * 100) / 100,
      red: fr.redDiff > 4,
      green: fr.greenDiff > 4,
    };
    frames.push(frame);
    last = frame;
  }
  frames.sort((a, b) => a.t - b.t);

  // Touches from the probe (window-level, passive): one sample list per touch.
  const touches = [];
  let current = null;
  for (const e of probe) {
    if (e.kind !== 'event' || !e.type?.startsWith('touch')) {
      continue;
    }
    const tp = e.touches?.[0];
    if (e.type === 'touchstart') {
      current = [];
      touches.push(current);
    }
    if (current != null && tp != null) {
      current.push([e.ts, tp[2]]);
    }
    if (e.type === 'touchend' || e.type === 'touchcancel') {
      current = null;
    }
  }
  return {
    id: basename(dir.replace(/\/+$/, "")),
    meta: {scale: s, top, scanX, offsetMs, videoW: w, videoH: h, rawFrames: raw.length, spec: meta.spec, injections: meta.injections},
    trace,
    frames: frames.filter(f => f.y != null || true),
    touches,
  };
}

const isMain = process.argv[1]?.endsWith('extract-ios.mjs');
if (isMain) {
  const args = process.argv.slice(2);
  const outDir = args.includes('--out') ? args[args.indexOf('--out') + 1] : '.';
  mkdirSync(outDir, {recursive: true});
  for (const dir of args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out')) {
    const run = await extractRun(dir);
    const file = join(outDir, `${run.id}.json`);
    writeFileSync(file, JSON.stringify(run));
    const ts = run.frames.map(f => f.t);
    const gaps = ts.slice(1).map((t, i) => t - ts[i]);
    console.log(`${run.id}: ${run.frames.length}/${run.meta.rawFrames} frames, t ${ts[0]}..${ts.at(-1)}, median frame gap ${gaps.sort((a, b) => a - b)[Math.floor(gaps.length / 2)]} ms, offset ${run.meta.offsetMs?.toFixed(0)}, touches ${run.touches.map(t => t.length).join('/')}`);
  }
}
