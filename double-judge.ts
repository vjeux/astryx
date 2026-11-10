// Replays recorded wheel-burst casts through main's judgment and this head's,
// and lists every verdict that moves.
import {readFileSync, writeFileSync} from 'node:fs';
import {it} from 'vitest';
import * as head from './webInput';
import * as main from './webInput.mainref';

type Got = {
  stamps: number[];
  timeOrigin: number;
  receivedAt: number[];
  frames: number[];
  handledAt: number[];
  deltas: [number, number][];
};
type Cast = {
  title: string;
  repeat: number;
  engine: 'webkit' | 'chromium';
  maxGapMs: number | null;
  release: head.WheelRelease | null;
  everyMs: number;
  steps: {dx?: number; dy?: number}[];
  sentAt: number[];
  got: Got;
  file: string;
};

function oldVerdict(c: Cast): {verdict: string; detail: string} {
  const arrivals = main.wheelArrivals(c.engine, c.got.stamps, c.got.receivedAt);
  if (c.maxGapMs == null) return {verdict: 'ok', detail: ''};
  const {pageStalls, dispatchStalls} = main.wheelGapCauses(
    c.engine,
    arrivals,
    c.got.handledAt,
    c.maxGapMs,
    main.wheelSendGaps(c.steps, c.sentAt, c.got.deltas),
    c.got.frames,
  );
  if (pageStalls.length > 0)
    return {verdict: pageStalls[0].frameGapMs != null ? 'WheelPageStallError(frame)' : 'WheelPageStallError(listeners)', detail: JSON.stringify(pageStalls[0])};
  if (dispatchStalls.length > 0)
    return {verdict: 'WheelPacingError(gap)', detail: `arrival gaps ${dispatchStalls.map(g => g.toFixed(0)).join(',')}`};
  return {verdict: 'ok', detail: ''};
}

function newVerdict(c: Cast): {verdict: string; detail: string} {
  const stamps = head.wheelStamps(c.got.stamps, c.got.timeOrigin);
  if (c.maxGapMs != null) {
    const {pageStalls, dispatchStalls} = head.wheelGapCauses(
      c.engine,
      stamps,
      c.got.handledAt,
      c.maxGapMs,
      head.wheelSendGaps(c.steps, c.sentAt, c.got.deltas),
      c.got.frames,
      c.got.receivedAt,
    );
    if (pageStalls.length > 0)
      return {verdict: pageStalls[0].frameGapMs != null ? 'WheelPageStallError(frame)' : 'WheelPageStallError(listeners)', detail: JSON.stringify(pageStalls[0])};
    if (dispatchStalls.length > 0)
      return {verdict: 'WheelPacingError(gap)', detail: `stamp gaps ${dispatchStalls.map(g => g.toFixed(0)).join(',')}`};
  }
  if (c.release != null) {
    const read = head.wheelReleaseRead(c.steps, c.sentAt, stamps, c.got.deltas, c.release, c.everyMs);
    if (read != null && head.wheelReleaseStrays(read)) {
      const hold = head.wheelReleaseHold(c.engine, c.release, c.steps, c.sentAt, stamps, c.got, c.everyMs);
      if (hold != null) {
        return {verdict: hold.frameGapMs != null ? 'WheelPageStallError(release, frame)' : 'WheelPageStallError(release, listeners)', detail: JSON.stringify(hold)};
      }
      const kind = read.merged != null
        ? `merge ${read.merged.join('-')} inside ${read.readStep - 1}-${read.liftStep}`
        : read.stepwiseMerge != null
          ? `stepwise merge ${read.stepwiseMerge.steps.join('-')} (+${read.stepwiseMerge.gapMs.toFixed(0)} ms)`
          : `carry ${read.pageCarryPx.toFixed(1)} px vs script ${read.scriptCarryPx.toFixed(1)} px, bar ${JSON.stringify(read.carryPx)}`;
      return {verdict: 'WheelPacingError(release)', detail: kind};
    }
  }
  return {verdict: 'ok', detail: ''};
}

function gapReason(c: Cast, o: string, n: string): string {
  const arrivals = main.wheelArrivals(c.engine, c.got.stamps, c.got.receivedAt);
  const stamps = head.wheelStamps(c.got.stamps, c.got.timeOrigin);
  const gaps = (xs: number[]) => xs.slice(1).map((t, i) => t - xs[i]);
  const maxA = Math.max(0, ...gaps(arrivals));
  const maxS = Math.max(0, ...gaps(stamps));
  const send = head.wheelSendGaps(c.steps, c.sentAt, c.got.deltas);
  const maxSend = Math.max(0, ...send.map(g => g ?? 0));
  if (o === 'ok' && n === 'WheelPacingError(gap)')
    return `longest stamp gap ${maxS.toFixed(0)} ms ≥ ${c.maxGapMs} where arrivals peaked at ${maxA.toFixed(0)}: judged on stamps, the host's clock`;
  if (o === 'WheelPacingError(gap)' && n === 'ok')
    return `arrival gap ${maxA.toFixed(0)} ms ≥ ${c.maxGapMs} but stamps peak at ${maxS.toFixed(0)}: the host reads one gesture`;
  if (o.startsWith('WheelPageStallError') && n === 'WheelPacingError(gap)')
    return maxSend >= (c.maxGapMs ?? Infinity)
      ? `send gap ${maxSend.toFixed(0)} ms ≥ bound: the dispatch's (send-gap rule)`
      : `listener time inside the gap does not cover its excess: the dispatch's`;
  if (o === 'WheelPacingError(gap)' && n.startsWith('WheelPageStallError'))
    return n.includes('frame')
      ? `measured on stamps, the page drew no frame across nearly all of the ${maxS.toFixed(0)} ms gap`
      : `measured on stamps, the page's own listeners held the step behind the ${maxS.toFixed(0)} ms gap`;
  if (o === 'ok' && n.startsWith('WheelPageStallError'))
    return `stamp gap ${maxS.toFixed(0)} ms ≥ ${c.maxGapMs} the page held (arrivals ${maxA.toFixed(0)})`;
  if (o.startsWith('WheelPageStallError') && n === 'ok')
    return `arrival gap ${maxA.toFixed(0)} ≥ bound, stamps ${maxS.toFixed(0)}: no split on the host's clock`;
  return `${o} → ${n}`;
}

it('double-judges recorded casts', () => {
  const files = (process.env.CASTS ?? 'casts.jsonl').split(',').filter(Boolean);
  const casts: Cast[] = [];
  for (const file of files) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const i = line.indexOf('CAST {');
      if (i < 0) continue;
      try {
        casts.push({...JSON.parse(line.slice(i + 5)), file: file.split('/').pop()});
      } catch {
        // A line cut by the reporter.
      }
    }
  }
  const moves: unknown[] = [];
  const all: unknown[] = [];
  const table = new Map<string, {casts: number; moved: number}>();
  for (const c of casts) {
    const o = oldVerdict(c);
    const n = newVerdict(c);
    const key = `${c.file} | ${c.engine} | ${c.title}`;
    all.push({file: c.file, title: c.title, repeat: c.repeat, old: o.verdict, new: n.verdict});
    const row = table.get(key) ?? {casts: 0, moved: 0};
    row.casts += 1;
    if (o.verdict !== n.verdict) {
      row.moved += 1;
      moves.push({file: c.file, engine: c.engine, title: c.title, repeat: c.repeat, old: o.verdict, new: n.verdict, reason: n.verdict.includes('release') ? `release: ${n.detail}${n.verdict.startsWith('WheelPageStallError') ? ' (the page held a step the release reads)' : ''}` : gapReason(c, o.verdict, n.verdict), oldDetail: o.detail, newDetail: n.detail});
    }
    table.set(key, row);
  }
  writeFileSync(process.env.OUT ?? 'double-judge-out.json', JSON.stringify({all, casts: casts.length, table: [...table].map(([k, v]) => ({k, ...v})), moves}, null, 1));
});
