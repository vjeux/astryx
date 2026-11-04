// NOT FOR LANDING. A pool neighbour for the helper-overhead benchmark's
// isolation evidence. It streams a 128 MB array for 600 s, so it competes
// with the benchmark for caches and memory bandwidth when both share a pool.
import {expect, it} from 'vitest';

it('streams memory for 600 s', async () => {
  const array = new Float64Array(16 * 1024 * 1024);
  const end = performance.now() + 600_000;
  let passes = 0;
  while (performance.now() < end) {
    const slice = performance.now() + 1000;
    while (performance.now() < slice) {
      for (let index = 0; index < array.length; index += 8) array[index] += 1;
      passes++;
    }
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  expect(passes).toBeGreaterThan(0);
}, 700_000);
