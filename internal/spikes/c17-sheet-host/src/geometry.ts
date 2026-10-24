// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file geometry.ts
 * @input The laid-out host element
 * @output Detents as scroll offsets, and window.__geometry for the rig
 * @position Spike only
 *
 * One coordinate for both hosts: S, the sheet's visible height in px
 * (0 = closed, below the viewport). The hybrid host's scrollTop IS S: a
 * spacer one viewport tall sits above the sheet, so at scrollTop 0 the sheet
 * starts at the viewport's bottom edge. The JS host translates the sheet by
 * H - S. Detents are values of S.
 */

export interface Geometry {
  W: number;
  H: number;
  /** Page y of the sheet's top edge at the large detent. */
  largeTop: number;
  sMedium: number;
  sLarge: number;
  /** Ascending: closed, medium, large. */
  detents: number[];
  dimMax: number;
}

export function measureGeometry(host: HTMLElement): Geometry {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:1px;visibility:hidden;pointer-events:none;' +
    'height:calc(env(safe-area-inset-top, 0px) + 10px)';
  document.body.appendChild(probe);
  const safeTopPlus10 = probe.getBoundingClientRect().height;
  probe.remove();
  const W = host.clientWidth;
  const H = host.clientHeight;
  const largeTop = Math.max(40, Math.round(safeTopPlus10));
  const sMedium = Math.round(H / 2);
  const sLarge = H - largeTop;
  return {
    W,
    H,
    largeTop,
    sMedium,
    sLarge,
    detents: [0, sMedium, sLarge],
    dimMax: 0.35,
  };
}

/** Dim opacity for a visible height: full at and above medium, fading to 0 as the sheet closes. */
export function dimFor(g: Geometry, s: number): number {
  return g.dimMax * Math.min(1, Math.max(0, s / g.sMedium));
}

export function nearestDetent(g: Geometry, s: number): number {
  let best = g.detents[0];
  for (const d of g.detents) {
    if (Math.abs(d - s) < Math.abs(best - s)) {
      best = d;
    }
  }
  return best;
}

/** Publishes the geometry the rig resolves gesture coordinates from. */
export function publishGeometry(g: Geometry, currentS: () => number): void {
  const describe = () => {
    const top = g.H - currentS();
    return {
      viewport: {w: g.W, h: g.H},
      detents: {closed: 0, medium: g.sMedium, large: g.sLarge},
      sheetTop: {medium: g.H - g.sMedium, large: g.H - g.sLarge, now: top},
      /** Handle (grabber) centre, page coordinates. */
      handle: [Math.round(g.W / 2), Math.round(top + 8)],
      /** A point on the sheet body just under the handle. */
      grab: [Math.round(g.W / 2), Math.round(top + 40)],
      /** A point deep in the sheet body: on the sheet at both medium and large. */
      body: [Math.round(g.W / 2), Math.round(g.H - g.sMedium + 150)],
      /** Column the sheet's top edge is scanned in (no handle, text or HUD there). */
      scan: {x: Math.round(g.W * 0.75)},
      sheetColor: '#0a4bff',
    };
  };
  Object.defineProperty(window, '__geometry', {
    configurable: true,
    enumerable: true,
    get: describe,
  });
}
