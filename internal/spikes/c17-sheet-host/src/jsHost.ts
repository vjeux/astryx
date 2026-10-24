// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file jsHost.ts
 * @input HostContext
 * @output The JS-recognizer sheet host: pointer events drive the sheet with
 *   one transform write per move; the same UIKit spring finishes the release
 * @position Spike only (PR-0, the comparison arm of decision D-11)
 *
 * This is the best a main-thread recognizer can do: `touch-action: none`
 * on the sheet (the browser never scrolls it), no React, no layout read
 * after the press, one style write per pointer move (plus the dim unless
 * jsdim=0), and the release spring on the compositor. While the main thread
 * is blocked no pointer event is handled, so the sheet stops under the
 * finger: that is what the comparison shows.
 */

import {selectSnapPoint} from '../../../../packages/core/src/motion/projection';
import {rubberBandClamp} from '../../../../packages/core/src/motion/rubberBand';
import type {SpringDescription} from '../../../../packages/core/src/motion/spring';
import {springs} from '../../../../packages/core/src/motion/uikit/springs';
import {dimFor} from './geometry';
import {round2, type HostApi, type HostContext} from './host';
import {animateSpring, type SpringRun} from './springAnim';
import {VelocityTracker} from './velocity';

export function mountJs(ctx: HostContext): HostApi {
  const {host, sheet, dim, g, p, tracer, heartbeat} = ctx;
  host.classList.add('js');
  sheet.style.height = `${g.sLarge}px`;
  const finger = new VelocityTracker();
  let s = ctx.initialS;
  let run: SpringRun | null = null;
  let drag: {id: number; y0: number; s0: number} | null = null;

  const write = (value: number) => {
    sheet.style.transform = `translate3d(0, ${round2(g.H - value)}px, 0)`;
    if (p.jsDim) {
      dim.style.opacity = String(dimFor(g, value));
    }
  };
  write(s);
  if (!p.jsDim) {
    dim.style.opacity = String(dimFor(g, s));
  }
  tracer.log('js-mount', {s});

  const springTo = (
    target: number,
    from: number,
    velocity: number,
    table: SpringDescription,
    reason: string,
  ) => {
    run?.anim.cancel();
    run?.dimAnim?.cancel();
    const spring = p.spring ?? table;
    const started = animateSpring({
      el: sheet,
      dimEl: dim,
      from,
      to: target,
      velocity,
      spring,
      toTransform: value => `translate3d(0, ${round2(g.H - value)}px, 0)`,
      toDim: value => dimFor(g, value),
    });
    run = started;
    tracer.log('spring', {
      reason,
      from: round2(from),
      to: target,
      velocity: round2(velocity),
      settle: round2(started.settle * 1000),
      spring,
    });
    started.anim.finished.then(
      () => {
        if (run !== started) {
          return;
        }
        run = null;
        s = target;
        sheet.style.transform = `translate3d(0, ${round2(g.H - target)}px, 0)`;
        dim.style.opacity = String(dimFor(g, target));
        started.anim.cancel();
        started.dimAnim?.cancel();
        tracer.log('settled', {target, why: 'finished'});
        if (target === 0) {
          ctx.onClosed();
        }
      },
      () => {},
    );
  };

  sheet.addEventListener('pointerdown', e => {
    const now = performance.now();
    tracer.log('pointerdown', {
      ts: round2(e.timeStamp),
      lag: round2(now - e.timeStamp),
      sinceFrame: round2(now - heartbeat.last),
      y: e.clientY,
      primary: e.isPrimary,
      springing: run != null,
    });
    if (!e.isPrimary) {
      return;
    }
    ctx.onTouchStart();
    sheet.setPointerCapture(e.pointerId);
    if (run != null) {
      const held = run;
      run = null;
      s = held.presentation();
      held.anim.cancel();
      held.dimAnim?.cancel();
      write(s);
      tracer.log('regrab', {
        s: round2(s),
        at: round2(Number(held.anim.currentTime ?? 0)),
      });
    }
    drag = {id: e.pointerId, y0: e.clientY, s0: s};
    finger.reset();
    finger.add(e.timeStamp, e.clientY);
  });

  sheet.addEventListener('pointermove', e => {
    if (drag == null || e.pointerId !== drag.id) {
      return;
    }
    const coalesced =
      typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
    for (const sample of coalesced.length > 0 ? coalesced : [e]) {
      finger.add(sample.timeStamp, sample.clientY);
      tracer.move(sample.timeStamp, sample.clientY);
    }
    const raw = drag.s0 - (e.clientY - drag.y0);
    s = rubberBandClamp(raw, 0, g.sLarge, g.H);
    write(s);
  });

  const end = (e: PointerEvent) => {
    if (drag == null || e.pointerId !== drag.id) {
      return;
    }
    drag = null;
    const now = performance.now();
    finger.add(e.timeStamp, e.clientY);
    const velocity = -finger.velocity(e.timeStamp);
    const pick = selectSnapPoint(g.detents, {position: s, velocity});
    tracer.log('pointerup', {
      type: e.type,
      ts: round2(e.timeStamp),
      lag: round2(now - e.timeStamp),
      sinceFrame: round2(now - heartbeat.last),
      velocity: round2(velocity),
      s: round2(s),
      projected: round2(pick.projected),
      target: pick.value,
      samples: finger.count(),
    });
    springTo(
      pick.value,
      s,
      velocity,
      pick.value === 0 ? springs.sheetDismissSwipe : springs.sheetDetent,
      'release',
    );
  };
  sheet.addEventListener('pointerup', end);
  sheet.addEventListener('pointercancel', end);

  return {
    currentS: () => (run != null ? run.presentation() : s),
    present(to) {
      springTo(to, s, 0, springs.sheetPresent, 'present');
    },
    dismiss() {
      const from = run != null ? run.presentation() : s;
      springTo(0, from, 0, springs.sheetDismiss, 'dismiss');
    },
    state: () => ({
      s: round2(run != null ? run.presentation() : s),
      dragging: drag != null,
      springing: run != null,
    }),
  };
}
