// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file host.ts
 * @input Shared host types
 * @output HostContext / HostApi
 * @position Spike only
 */

import type {Geometry} from './geometry';
import type {Params} from './params';
import type {Tracer} from './trace';

export interface HostContext {
  host: HTMLElement;
  spacer: HTMLElement;
  sheet: HTMLElement;
  dim: HTMLElement;
  g: Geometry;
  p: Params;
  tracer: Tracer;
  /** performance.now() of the last animation frame the main thread ran. */
  heartbeat: {last: number};
  /** Called from the host's touchstart: arms busy=ontouch. */
  onTouchStart: () => void;
  onClosed: () => void;
  initialS: number;
}

export interface HostApi {
  /** Visible height now (analytic during a spring). */
  currentS(): number;
  present(to: number): void;
  dismiss(): void;
  state(): Record<string, unknown>;
}

export const round2 = (n: number) => Math.round(n * 100) / 100;
