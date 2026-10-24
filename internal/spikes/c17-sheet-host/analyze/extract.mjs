// Copyright (c) Meta Platforms, Inc. and affiliates.

// Independent per-frame extraction from a simulator recording: the sheet's
// top edge (first sheet-blue pixel down the scan column) and whether the
// main-thread indicator (red square, rotated by requestAnimationFrame) moved
// since the previous frame. Video pixels map to page px with the width scale
// and an offset calibrated on the first frames, where the sheet rests at a
// known detent.
//
//   node analyze/extract.mjs run.mp4 --trace trace.json [--out frames.json]
//
// Output: {scale, offsetY, frames: [{i, pts, yVideo, y, redMoved, greenMoved}]}

import {spawn, execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';

const args = process.argv.slice(2);
const video = args[0];
const opt = name => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const trace = JSON.parse(readFileSync(opt('--trace'), 'utf8'));
const out = opt('--out') ?? video.replace(/\.mp4$/, '.frames.json');
const geo = trace.meta.geometry;

const probe = JSON.parse(
  execFileSync('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height',
    '-show_entries',
    'frame=pts_time',
    '-of',
    'json',
    video,
  ]).toString(),
);
const {width: w, height: h} = probe.streams[0];
const pts = probe.frames.map(f => Number(f.pts_time));
const scale = w / geo.W;
const scanX = Math.round(geo.W * 0.75 * scale);

// Sheet blue (#0a4bff) after compression: strongly blue, little red.
const isSheet = (r, g, b) =>
  b > 190 && r < 90 && g > 30 && g < 140 && b - r > 130;

function sheetTop(frame) {
  for (let y = 0; y < h; y++) {
    const i = (y * w + scanX) * 3;
    if (isSheet(frame[i], frame[i + 1], frame[i + 2])) {
      // Require a run of 4 sheet pixels, so a compression speck is not an edge.
      let run = 1;
      for (let k = 1; k < 4 && y + k < h; k++) {
        const j = ((y + k) * w + scanX) * 3;
        if (isSheet(frame[j], frame[j + 1], frame[j + 2])) {
          run++;
        }
      }
      if (run === 4) {
        return y;
      }
    }
  }
  return null;
}

// Indicator regions (page px → video px): red at right 36..56, green at right 8..28, top 12..32.
function region(frame, rightFrom, rightTo, offsetY) {
  const x0 = Math.round((geo.W - rightTo) * scale);
  const x1 = Math.round((geo.W - rightFrom) * scale);
  const y0 = Math.round((12 + offsetY) * scale);
  const y1 = Math.round((32 + offsetY) * scale);
  const px = [];
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * w + x) * 3;
      px.push(frame[i], frame[i + 1], frame[i + 2]);
    }
  }
  return px;
}
const diff = (a, b) => {
  if (a == null || b == null) {
    return Infinity;
  }
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    s += Math.abs(a[i] - b[i]);
  }
  return s / a.length;
};

const frames = [];
const ff = spawn('ffmpeg', [
  '-v',
  'error',
  '-i',
  video,
  '-f',
  'rawvideo',
  '-pix_fmt',
  'rgb24',
  '-',
]);
const size = w * h * 3;
let buf = Buffer.alloc(0);
let index = 0;
let offsetY = null;
let prevRed = null;
let prevGreen = null;
const initialTop = trace.events.find(e => e.type === 'ready')?.state?.s;
ff.stdout.on('data', chunk => {
  buf = Buffer.concat([buf, chunk]);
  while (buf.length >= size) {
    const frame = buf.subarray(0, size);
    const yVideo = sheetTop(frame);
    if (offsetY == null && yVideo != null && initialTop != null) {
      // First frame: the sheet rests at its initial detent.
      offsetY = yVideo / scale - (geo.H - initialTop);
    }
    const oy = offsetY ?? 0;
    const red = region(frame, 36, 56, oy);
    const green = region(frame, 8, 28, oy);
    frames.push({
      i: index,
      pts: pts[index],
      yVideo,
      y: yVideo == null ? null : Math.round((yVideo / scale - oy) * 100) / 100,
      redMoved: diff(red, prevRed) > 6,
      greenMoved: diff(green, prevGreen) > 6,
    });
    prevRed = red;
    prevGreen = green;
    buf = buf.subarray(size);
    index++;
  }
});
ff.on('close', () => {
  writeFileSync(
    out,
    JSON.stringify({video, w, h, scale, offsetY, scanX, frames}),
  );
  console.log(
    `${out}: ${frames.length} frames, scale ${scale.toFixed(3)}, offsetY ${offsetY?.toFixed(1)}`,
  );
});
