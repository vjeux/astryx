// LOCAL SCRATCH (not for commit): the pager's release for sparse flicks.
import {describe, expect, it} from 'vitest';
import {VelocityTracker} from '../VelocityTracker';
import {pageForRelease} from '../../hooks/usePager';

const STRIDE = 402;
function release(moves: {t: number; speed: number}[], liftGap: number) {
  const tracker = new VelocityTracker();
  let x = 0;
  let previous = 0;
  tracker.add(0, 0, 0);
  for (const move of moves) {
    x -= move.speed * (move.t - previous);
    previous = move.t;
    tracker.add(x, 0, move.t);
  }
  const velocity = tracker.scrollVelocity(previous + liftGap).x;
  // Content moves with the finger: content position = start page - x.
  const page = pageForRelease({
    position: 1 * STRIDE - x,
    velocity: -velocity,
    stride: STRIDE,
    count: 6,
    startIndex: 1,
  });
  return {travel: -x, velocity, page};
}
const even = (n: number, over: number, speed: number) =>
  Array.from({length: n}, (_, i) => ({t: ((i + 1) * over) / n, speed}));

describe('sparse flick release (scratch)', () => {
  it('prints', () => {
    const rows: [string, {t: number; speed: number}[], number][] = [
      ['2 moves 2.1, lift +5', even(2, 60, 2.1), 5],
      ['3 moves 2.1, lift +5', even(3, 60, 2.1), 5],
      ['4 moves 2.1, lift +5', even(4, 60, 2.1), 5],
      ['3 moves 2.1, lift +38', even(3, 60, 2.1), 38],
      ['3 moves 2.1, lift +45', even(3, 60, 2.1), 45],
      ['3 moves 0.1/0.4/2.11, lift +5', [{t: 20, speed: 0.1}, {t: 40, speed: 0.4}, {t: 60, speed: 2.11}], 5],
      ['179 ms take: moves at 100/116/132 (0.3/2.11/2.11), lift +47', [{t: 100, speed: 0.3}, {t: 116, speed: 2.11}, {t: 132, speed: 2.11}], 47],
    ];
    for (const [name, moves, gap] of rows) {
      const r = release(moves, gap);
      console.log(`SCRATCH ${name}: travel=${r.travel.toFixed(1)}px release=${r.velocity.toFixed(0)}px/s page=${r.page}`);
    }
    expect(true).toBe(true);
  });
});
