// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file busy.ts
 * @input A BusySpec
 * @output Main-thread blocks on a schedule (the busy-main-thread proof)
 * @position Spike only
 */

import type {BusySpec} from './params';
import type {Tracer} from './trace';

function block(ms: number, tracer: Tracer, reason: string): void {
  const start = performance.now();
  tracer.log('busy-start', {ms, reason});
  while (performance.now() - start < ms) {
    // Spin: nothing on this thread runs until the block ends.
  }
  tracer.log('busy-end', {ms, reason, actual: performance.now() - start});
}

/**
 * Starts the schedule. For `ontouch`, returns the function the host calls
 * from its (passive) touchstart listener.
 */
export function startBusy(spec: BusySpec, tracer: Tracer): () => void {
  if (spec.kind === 'always') {
    const startedAt = performance.now() + spec.delay;
    const loop = () => {
      if (performance.now() - startedAt > spec.stopAfter) {
        tracer.log('busy-stopped');
        return;
      }
      block(spec.block, tracer, 'always');
      setTimeout(loop, spec.yieldMs);
    };
    setTimeout(loop, spec.delay);
  } else if (spec.kind === 'window') {
    setTimeout(() => block(spec.block, tracer, 'window'), spec.delay);
  } else if (spec.kind === 'ontouch') {
    let pending = 0;
    return () => {
      if (pending !== 0) {
        return;
      }
      pending = window.setTimeout(() => {
        block(spec.block, tracer, 'ontouch');
        pending = 0;
      }, spec.delay);
    };
  }
  return () => {};
}
