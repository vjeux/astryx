// Copyright (c) Meta Platforms, Inc. and affiliates.

// Turns one simulator run (video frames with page-clock times and the sheet's
// top edge per frame, the probe's touch log, the page's __trace) into
// numbers: tracking error under a busy main thread, release-curve error
// against the closed-form spring the page asked for, handoff continuity, and
// an SVG plot. Pure functions here; analyze.mjs does the file handling.

/** Linear interpolation over sorted [t, v] pairs; clamps at the ends. */
export function sampleAt(series, t) {
  if (series.length === 0) {
    return NaN;
  }
  if (t <= series[0][0]) {
    return series[0][1];
  }
  for (let i = 1; i < series.length; i++) {
    if (t <= series[i][0]) {
      const [t0, v0] = series[i - 1];
      const [t1, v1] = series[i];
      return t1 === t0 ? v1 : v0 + ((v1 - v0) * (t - t0)) / (t1 - t0);
    }
  }
  return series[series.length - 1][1];
}

const percentile = (values, p) => {
  if (values.length === 0) {
    return NaN;
  }
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
};

/**
 * Tracking: for every frame between `from` and `to` (page ms), the sheet's
 * top against the finger. The finger-to-sheet offset is fixed at the first
 * frame where both have moved (the scroll view's slop is consumed there), so
 * the error is the drift from 1:1 after that. Also counts stalled frames:
 * the finger moved more than 2 px since the previous frame and the sheet did
 * not move at all.
 */
export function trackingError({frames, finger, from, to, busy = []}) {
  const window = frames.filter(f => f.t >= from && f.t <= to);
  if (window.length < 3 || finger.length < 2) {
    return null;
  }
  const y0 = finger[0][1];
  let offset = null;
  const errors = [];
  const busyErrors = [];
  let stalls = 0;
  let busyFrames = 0;
  let prev = null;
  for (const f of window) {
    const fy = sampleAt(finger, f.t);
    if (offset == null) {
      if (Math.abs(fy - y0) > 12 && prev != null && f.y !== prev.y) {
        offset = fy - f.y;
      }
      prev = f;
      continue;
    }
    const error = f.y - (fy - offset);
    errors.push(error);
    const inBusy = busy.some(([a, b]) => f.t >= a && f.t <= b);
    if (inBusy) {
      busyFrames++;
      busyErrors.push(error);
    }
    const fingerStep = Math.abs(fy - sampleAt(finger, prev.t));
    if (fingerStep > 2 && Math.abs(f.y - prev.y) < 0.25) {
      stalls++;
    }
    prev = f;
  }
  const abs = errors.map(Math.abs);
  const busyAbs = busyErrors.map(Math.abs);
  return {
    frames: window.length,
    offset,
    maxAbs: abs.length ? Math.max(...abs) : NaN,
    p95Abs: percentile(abs, 0.95),
    medianAbs: percentile(abs, 0.5),
    busyFrames,
    busyMaxAbs: busyAbs.length ? Math.max(...busyAbs) : NaN,
    busyP95Abs: percentile(busyAbs, 0.95),
    stalls,
  };
}

/**
 * Release curve: frames after the spring started against the closed form,
 * aligned on the animation's first frame (searched in 0-40 ms after the
 * page logged the spring, at 0.5 ms). `toTop` maps the curve value (visible
 * height S) to the sheet's top edge.
 */
export function curveError({frames, spring, curveValue, settleMs, toTop}) {
  const after = frames.filter(
    f => f.t >= spring.t - 20 && f.t <= spring.t + settleMs + 100,
  );
  let best = null;
  for (let lag = 0; lag <= 40; lag += 0.5) {
    let max = 0;
    let sumSq = 0;
    let n = 0;
    for (const f of after) {
      const te = (f.t - spring.t - lag) / 1000;
      if (te < 0) {
        continue;
      }
      const want = toTop(curveValue(Math.min(te, settleMs / 1000)));
      const e = f.y - want;
      max = Math.max(max, Math.abs(e));
      sumSq += e * e;
      n++;
    }
    if (n > 0 && (best == null || max < best.max)) {
      best = {lag, max, rms: Math.sqrt(sumSq / n), frames: n};
    }
  }
  return best;
}

/** Sheet speed (px/s of the top edge) by least squares over frames in [a, b]. */
export function frameVelocity(frames, a, b) {
  const pts = frames.filter(f => f.t >= a && f.t <= b);
  if (pts.length < 2) {
    return NaN;
  }
  const n = pts.length;
  const mt = pts.reduce((s, f) => s + f.t, 0) / n;
  const my = pts.reduce((s, f) => s + f.y, 0) / n;
  let num = 0;
  let den = 0;
  for (const f of pts) {
    num += (f.t - mt) * (f.y - my);
    den += (f.t - mt) ** 2;
  }
  return den === 0 ? 0 : (num / den) * 1000;
}

/** Largest frame-to-frame jump of the sheet in [a, b] (px). */
export function maxStep(frames, a, b) {
  const pts = frames.filter(f => f.t >= a && f.t <= b);
  let max = 0;
  for (let i = 1; i < pts.length; i++) {
    max = Math.max(max, Math.abs(pts[i].y - pts[i - 1].y));
  }
  return max;
}

/** First frame time after `t0` from which the sheet stays within `tol` px of `y`. */
export function settledAt(frames, t0, y, tol = 1) {
  let candidate = null;
  for (const f of frames) {
    if (f.t < t0) {
      continue;
    }
    if (Math.abs(f.y - y) <= tol) {
      candidate ??= f.t;
    } else {
      candidate = null;
    }
  }
  return candidate;
}

/** A small SVG: time on x, page y down, finger + sheet + expected curve + busy bands. */
export function plotSvg({
  title,
  frames,
  finger,
  expected = [],
  busy = [],
  marks = [],
  tRange,
  yRange,
}) {
  const W = 900;
  const H = 520;
  const pad = {l: 56, r: 16, t: 34, b: 40};
  const [t0, t1] = tRange;
  const [y0, y1] = yRange;
  const X = t => pad.l + ((t - t0) / (t1 - t0)) * (W - pad.l - pad.r);
  const Y = y => pad.t + ((y - y0) / (y1 - y0)) * (H - pad.t - pad.b);
  const line = (pts, color, width = 1.5, dash = '') =>
    pts.length < 2
      ? ''
      : `<polyline fill="none" stroke="${color}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''} points="${pts
          .filter(([t]) => t >= t0 && t <= t1)
          .map(([t, y]) => `${X(t).toFixed(1)},${Y(y).toFixed(1)}`)
          .join(' ')}"/>`;
  const dots = (pts, color) =>
    pts
      .filter(([t]) => t >= t0 && t <= t1)
      .map(
        ([t, y]) =>
          `<circle cx="${X(t).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="2" fill="${color}"/>`,
      )
      .join('');
  const bands = busy
    .map(
      ([a, b]) =>
        `<rect x="${X(Math.max(a, t0))}" y="${pad.t}" width="${Math.max(0, X(Math.min(b, t1)) - X(Math.max(a, t0)))}" height="${H - pad.t - pad.b}" fill="#ff3b30" opacity="0.08"/>`,
    )
    .join('');
  const ticks = [];
  const step = t1 - t0 > 3000 ? 500 : t1 - t0 > 1200 ? 200 : 100;
  for (let t = Math.ceil(t0 / step) * step; t <= t1; t += step) {
    ticks.push(
      `<line x1="${X(t)}" x2="${X(t)}" y1="${H - pad.b}" y2="${H - pad.b + 4}" stroke="#999"/><text x="${X(t)}" y="${H - pad.b + 16}" font-size="10" text-anchor="middle" fill="#555">${Math.round(t)}</text>`,
    );
  }
  for (let y = Math.ceil(y0 / 100) * 100; y <= y1; y += 100) {
    ticks.push(
      `<line x1="${pad.l - 4}" x2="${W - pad.r}" y1="${Y(y)}" y2="${Y(y)}" stroke="#eee"/><text x="${pad.l - 6}" y="${Y(y) + 3}" font-size="10" text-anchor="end" fill="#555">${y}</text>`,
    );
  }
  const markEls = marks
    .map(
      ({t, label, color = '#333'}) =>
        `<line x1="${X(t)}" x2="${X(t)}" y1="${pad.t}" y2="${H - pad.b}" stroke="${color}" stroke-dasharray="3 3"/><text x="${X(t) + 3}" y="${pad.t + 12}" font-size="10" fill="${color}">${label}</text>`,
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system, system-ui, sans-serif">
<rect width="${W}" height="${H}" fill="#fff"/>
<text x="${pad.l}" y="20" font-size="13" font-weight="600">${title}</text>
${bands}${ticks.join('')}
${line(expected, '#19c37d', 2, '5 4')}
${line(finger, '#ff9500', 1.5)}${dots(finger, '#ff9500')}
${line(
  frames.map(f => [f.t, f.y]),
  '#0a4bff',
  1.5,
)}${dots(
    frames.map(f => [f.t, f.y]),
    '#0a4bff',
  )}
${markEls}
<text x="${W - pad.r}" y="20" font-size="11" text-anchor="end"><tspan fill="#0a4bff">● sheet top (video)</tspan>  <tspan fill="#ff9500">● finger − offset</tspan>  <tspan fill="#19c37d">- - closed-form spring</tspan>  <tspan fill="#ff3b30">▮ main thread blocked</tspan></text>
<text x="${(W + pad.l) / 2}" y="${H - 6}" font-size="11" text-anchor="middle" fill="#555">page clock (ms)</text>
</svg>`;
}
