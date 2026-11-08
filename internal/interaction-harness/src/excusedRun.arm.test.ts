import {describe, expect, it} from 'vitest';
import {pooledBusyProof, type BusyRun} from './busy';
import type {TrackedFrame} from './frames';

const F = 1000 / 60;
const VALUES = [90, 92, 94, 96, 98, 100, 101, 102, 102, 103, 103, 103, 104, 104, 104, 104, 105, 105, 105, 105, 105, 106, 107, 108, 109, 110];
function run(offset: number, fromIndex: number, toIndex: number): BusyRun {
  const t = (i: number) => offset + i * F;
  const tracked = VALUES.map((v, i) => ({t: t(i), box: {x: v, y: 0, width: 1, height: 1}, pixels: 10, step: {x: 1, y: 1}}) as TrackedFrame);
  const control = VALUES.map((_, i) => ({t: t(i), box: {x: 10 * i, y: 0, width: 10, height: 10}, pixels: 10}) as TrackedFrame);
  return {tracked, control, window: {from: t(fromIndex) - 21, to: t(toIndex) + 1}};
}

describe('a pooled run whose frames are all excused', () => {
  it('passes the verdict and fails the new-level check', () => {
    const runs = [run(100000, 2, 6), run(110000, 2, 6), run(120000, 2, 6), run(130000, 17, 20)];
    const proof = pooledBusyProof(runs, {axis: 'x', settledWithin: 0.5, minRunFrames: 2, minJudgedRuns: 2});
    const reads = proof.runs.map(r => r?.control).map(c => c && {moved: c.moved, movedWith: c.movedWith, belowStep: c.belowStep, visible: c.movedWith - c.belowStep});
    expect(proof.verdict.failures).toEqual([]);
    expect(reads[3]).toEqual({moved: 2, movedWith: 2, belowStep: 2, visible: 0});
    const oldCheck = proof.judged.every((j, i) => !j || (proof.runs[i]?.control?.movedWith ?? 0) >= 1);
    const newCheck = proof.judged.every((j, i) => !j || ((proof.runs[i]?.control?.movedWith ?? 0) - (proof.runs[i]?.control?.belowStep ?? 0)) >= 1);
    expect(oldCheck).toBe(true);
    expect(newCheck).toBe(false);
  });
});
