// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file main.ts
 * @input The page DOM, query parameters
 * @output Mounts one sheet host, the busy schedule, the main-thread
 *   indicators and the HUD; publishes window.__geometry / __trace / __ready
 * @position Spike only
 *
 * Two indicators in the top-right corner tell the video which thread is
 * alive: the green square spins with a CSS animation (compositor), the red
 * one is rotated by requestAnimationFrame (main thread). During a busy
 * block the red square stops and the green one keeps turning.
 */

import {measureGeometry, publishGeometry} from './geometry';
import type {HostApi, HostContext} from './host';
import {mountHybrid} from './hybrid';
import {mountJs} from './jsHost';
import {parseParams} from './params';
import {startBusy} from './busy';
import {createTracer} from './trace';

const p = parseParams(location.search);
const $ = (id: string) => document.getElementById(id) as HTMLElement;
const host = $('host');
const spacer = $('spacer');
const sheet = $('sheet');
const dim = $('dim');
const hud = $('hud');
const reopen = $('reopen');
const spinJ = $('spin-j');

const tracer = createTracer({
  params: p,
  userAgent: navigator.userAgent,
  loadedAt: performance.now(),
  devicePixelRatio: window.devicePixelRatio,
});
const g = measureGeometry(host);
tracer.trace.meta.geometry = g;

const heartbeat = {last: performance.now()};
const frame = (now: number) => {
  heartbeat.last = now;
  spinJ.style.transform = `rotate(${((now / 1000) % 1) * 360}deg)`;
  requestAnimationFrame(frame);
};
requestAnimationFrame(frame);

const onTouchStart = startBusy(p.busy, tracer);
const initialS =
  p.open === 'large' ? g.sLarge : p.open === 'medium' ? g.sMedium : 0;

const ctx: HostContext = {
  host,
  spacer,
  sheet,
  dim,
  g,
  p,
  tracer,
  heartbeat,
  onTouchStart,
  initialS,
  onClosed: () => {
    dim.classList.add('closed');
    reopen.hidden = false;
  },
};
const api: HostApi = p.mode === 'js' ? mountJs(ctx) : mountHybrid(ctx);
if (initialS === 0) {
  ctx.onClosed();
}
publishGeometry(g, () => api.currentS());

reopen.addEventListener('click', () => {
  dim.classList.remove('closed');
  reopen.hidden = true;
  api.present(g.sMedium);
});
dim.addEventListener('click', () => {
  if (!dim.classList.contains('closed')) {
    api.dismiss();
  }
});

if (p.hud) {
  const label = [
    p.label,
    p.mode,
    p.mode === 'hybrid' ? `${p.release}/${p.handoff}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const busy =
    p.busy.kind === 'none'
      ? 'idle'
      : `${p.busy.kind}:${'block' in p.busy ? p.busy.block : ''}`;
  setInterval(() => {
    const st = api.state();
    const last = [...tracer.trace.events]
      .reverse()
      .find(e => e.type === 'release' || e.type === 'pointerup');
    hud.textContent =
      `${label} | ${busy}\n` +
      `S ${Math.round(Number(st.s))} rest ${String(st.restingAt ?? '')}` +
      (last
        ? ` | v ${Math.round(Number(last.velocity))} → ${String(last.target)}`
        : '');
  }, 200);
} else {
  hud.hidden = true;
}

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    tracer.log('ready', {state: api.state()});
    (window as unknown as {__ready: boolean}).__ready = true;
  });
});
