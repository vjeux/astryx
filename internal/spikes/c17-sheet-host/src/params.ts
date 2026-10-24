// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file params.ts
 * @input location.search
 * @output Parsed spike parameters
 * @position Spike only (not shipped): selects the sheet host and the
 *   experiment knobs for one run
 */

import type {SpringDescription} from '../../../../packages/core/src/motion/spring';

export type BusySpec =
  | {kind: 'none'}
  /** Block `block` ms, yield `yieldMs`, repeat; start `delay` ms after load, stop after `stopAfter` ms. */
  | {
      kind: 'always';
      block: number;
      yieldMs: number;
      delay: number;
      stopAfter: number;
    }
  /** One block of `block` ms starting `delay` ms after load. */
  | {kind: 'window'; delay: number; block: number}
  /** One block of `block` ms starting `delay` ms after each primary touchstart the page sees. */
  | {kind: 'ontouch'; delay: number; block: number};

export interface Params {
  mode: 'hybrid' | 'js';
  /** Hybrid: hand the release to the spring, or let native momentum + snap finish it. */
  release: 'spring' | 'native';
  /** Hybrid: start the spring from scrollTop as read, or from the momentum extrapolated to the next frame. */
  handoff: 'read' | 'extrap';
  busy: BusySpec;
  open: 'closed' | 'medium' | 'large';
  /** Overrides the constants-table spring for every release. */
  spring: SpringDescription | null;
  /**
   * Hybrid: how the page stops the browser's own scroll animation (momentum
   * or snap) at the handoff: pin scrollTop with an assignment, or with an
   * instant scrollTo().
   */
  stop: 'assign' | 'instant';
  /**
   * Hybrid: keep scroll snapping on while a finger is down (the browser then
   * snaps on its own if the page cannot answer at release), or turn it off
   * at touchstart (no snap animation to stop; a blocked page reconciles at
   * rest instead).
   */
  snapDuringTouch: boolean;
  /** Hybrid: a touchend later than this (ms) is a release the page missed. */
  lateMs: number;
  /** Hybrid: the scroll host ignores pointers outside the sheet (drags start on the sheet only). */
  passthrough: boolean;
  /** Hybrid: dim driven by a scroll-driven animation (compositor) or by script on scroll events. */
  dim: 'scroll' | 'js';
  /** JS host: also write the dim opacity per move (a second write). */
  jsDim: boolean;
  hud: boolean;
  label: string;
}

function parseBusy(raw: string | null): BusySpec {
  if (raw == null || raw === '' || raw === 'none') {
    return {kind: 'none'};
  }
  const [kind, ...rest] = raw.split(':');
  const n = rest.map(Number);
  if (kind === 'always') {
    return {
      kind,
      block: n[0] || 1000,
      yieldMs: n[1] || 16,
      delay: n[2] || 1500,
      stopAfter: n[3] || 12000,
    };
  }
  if (kind === 'window') {
    return {kind, delay: n[0] || 3000, block: n[1] || 1500};
  }
  if (kind === 'ontouch') {
    return {kind, delay: n[0] ?? 50, block: n[1] || 3000};
  }
  throw new Error(`busy: unknown kind ${raw}`);
}

/** `r0.5z0.86` (response, damping ratio), `d0.5b0.15` (duration, bounce), `m3k1000c500` (physics). */
function parseSpring(raw: string | null): SpringDescription | null {
  if (raw == null || raw === '') {
    return null;
  }
  const num = (key: string) => {
    const match = new RegExp(`${key}(-?[0-9.]+)`).exec(raw);
    return match ? Number(match[1]) : undefined;
  };
  const r = num('r');
  const z = num('z');
  if (r != null && z != null) {
    return {response: r, dampingRatio: z};
  }
  const d = num('d');
  const b = num('b');
  if (d != null && b != null) {
    return {duration: d, bounce: b};
  }
  const k = num('k');
  const c = num('c');
  if (k != null && c != null) {
    return {mass: num('m') ?? 1, stiffness: k, damping: c};
  }
  throw new Error(`spring: cannot parse ${raw}`);
}

export function parseParams(search: string): Params {
  const q = new URLSearchParams(search);
  const pick = <T extends string>(key: string, values: T[], fallback: T): T => {
    const v = q.get(key);
    return (values as string[]).includes(v ?? '') ? (v as T) : fallback;
  };
  return {
    mode: pick('mode', ['hybrid', 'js'], 'hybrid'),
    release: pick('release', ['spring', 'native'], 'spring'),
    handoff: pick('handoff', ['read', 'extrap'], 'extrap'),
    busy: parseBusy(q.get('busy')),
    open: pick('open', ['closed', 'medium', 'large'], 'medium'),
    spring: parseSpring(q.get('spring')),
    stop: pick('stop', ['assign', 'instant'], 'assign'),
    snapDuringTouch: q.get('snaptouch') !== '0',
    lateMs: Number(q.get('latems') ?? 40) || 40,
    passthrough: q.get('passthrough') !== '0',
    dim: pick('dim', ['scroll', 'js'], 'scroll'),
    jsDim: q.get('jsdim') !== '0',
    hud: q.get('hud') !== '0',
    label: q.get('label') ?? '',
  };
}
