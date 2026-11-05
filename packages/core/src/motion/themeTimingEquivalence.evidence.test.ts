// EVIDENCE, NOT FOR LANDING: main's private timedCurve (copied below) against
// easedProgress mapped onto a range, as SegmentedControl now builds its curve.
import {describe, expect, it} from 'vitest';
import type {MotionCurve} from './animator';
import {cubicBezier} from './bezier';
import {mapProgress, mapRange} from './progress';
import {easedProgress} from './themeTiming';

interface ThemeTiming { readonly seconds: number; readonly ease: (p: number) => number }
function timedCurve(from: number, to: number, timing: ThemeTiming): MotionCurve {
  const {seconds, ease} = timing;
  const at = (t: number) => from + (to - from) * ease(Math.min(1, Math.max(0, t / seconds)));
  const step = Math.min(seconds / 100, 0.001);
  return {duration: seconds, at, velocity: t => {
    const before = Math.max(0, t - step);
    const after = Math.min(seconds, t + step);
    return (at(after) - at(before)) / (after - before);
  }};
}
const toward = (p: MotionCurve, from: number, to: number) => mapProgress(p, mapRange([0, 1], [from, to], {clamp: false}));
const easings: [string, [number, number, number, number]][] = [
  ['standard', [0.24, 1, 0.4, 1]], ['exit', [0.3, 0, 0.6, 0.6]], ['linear', [0, 0, 1, 1]],
  ['overshoot', [0.34, 1.56, 0.64, 1]], ['undershoot', [0.6, -0.28, 0.735, 0.045]],
];
describe('probe', () => {
  it('matches main on every sample', () => {
    let maxAt = 0, maxV = 0, maxDur = 0, n = 0, nanBoth = 0; const mis: Record<string, number> = {}; const ex: Record<string, string> = {};
    for (const [, pts] of easings) for (const seconds of [0.001, 0.0975, 0.13, 0.175, 0.23, 0.31, 0.41, 1.3])
      for (const [from, to] of [[0, 1], [-37.5, 0], [12, 0], [1, 1.08], [0.92, 1], [5, 5]] as const) {
        const ease = cubicBezier(pts);
        const a = timedCurve(from, to, {seconds, ease});
        const b = toward(easedProgress(seconds, ease), from, to);
        maxDur = Math.max(maxDur, Math.abs(a.duration - b.duration));
        for (let i = -10; i <= 1210; i++) {
          const t = (i / 1000) * seconds;
          maxAt = Math.max(maxAt, Math.abs(a.at(t) - b.at(t)));
          const va = a.velocity!(t), vb = b.velocity!(t);
          const zone = t < 0 ? 'before' : t < seconds ? 'during' : 'after';
          const same = (Number.isNaN(va) && Number.isNaN(vb)) || Math.abs(va - vb) < 1e-6;
          if (Number.isNaN(va) && Number.isNaN(vb)) nanBoth++;
          if (!same) { (mis as Record<string, number>)[zone] = ((mis as Record<string, number>)[zone] ?? 0) + 1; if (!ex[zone]) ex[zone] = `s=${seconds} t=${t} main=${va} dedupe=${vb}`; }
          else if (zone === 'during' && !Number.isNaN(va)) maxV = Math.max(maxV, Math.abs(va - vb));
          n++;
        }
      }
    console.log(`samples ${n}; max |dAt| ${maxAt}; max |dVelocity| ${maxV}; max |dDuration| ${maxDur}; NaN in both: ${nanBoth}; mismatches ${JSON.stringify(mis)}; examples ${JSON.stringify(ex)}`);
    expect(maxAt).toBeLessThan(1e-12);
    expect(maxV).toBeLessThan(1e-6);
    expect(maxDur).toBe(0);
  });
});
