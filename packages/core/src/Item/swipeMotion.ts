// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file swipeMotion.ts
 * @input The row root; a curve per channel (a spring motion/spring.ts
 *   solved); the Reduced Motion fade (motion/reducedMotion.ts)
 * @output Exports createSwipeMotion — the swipe's travel and its full
 *   swipe's confirm as custom properties on the row root, written on every
 *   animation frame while they move — and the properties' names
 * @position Internal to Item's swipe actions, driven by useSwipeAction;
 *   tested by swipeMotion.test.ts and through Item.test.tsx
 *
 * `spec:AST-057` FR2: the gesture drives the row's travel by writing a custom
 * property on the root (`--_item-swipe-travel`, physical px); the root's
 * transform reads it and each panel's transform its negation
 * (ItemSwipeLayer), so the row moves and the panel appears fixed in the space
 * the row vacates. The full swipe's confirm (`--_item-swipe-confirm`, 0 to
 * 1) is written beside it: the outermost entry slides by it and the others
 * fade by it. A motion plays a curve per channel by writing, on every
 * animation frame, the value the curve has at that frame's time: one style
 * write per frame, on the main thread. A motion from rest starts at the
 * browser's next frame, so a frame held back (iOS during a smooth scroll)
 * delays it instead of skipping into it; one that continues motion on screen
 * starts at `at` (its call time), so the next frame picks up where the row
 * is.
 *
 * Under Reduce Motion (`design:reduced-motion`) a change plays the fade
 * `reducedMotionFade` gives: at once, or an opacity-only dip of the row with
 * the values written at its bottom, where nothing shows (DR2). The fade back
 * in takes what is left of the dip, so a timer a busy main thread runs late
 * shortens it rather than holding the row invisible.
 */

import type {ReducedMotionFade} from '../motion/reducedMotion';

/** The travel the root's transform reads, physical px (ItemSwipeLayer, Item). */
export const SWIPE_TRAVEL_PROPERTY = '--_item-swipe-travel';
/** How far a full swipe has confirmed, 0 to 1 (ItemSwipeLayer). */
export const SWIPE_CONFIRM_PROPERTY = '--_item-swipe-confirm';

/** What a motion moves: the row's travel, and the full swipe's confirm. */
export type SwipeChannel = 'x' | 'confirm';

const PROPERTIES: Record<SwipeChannel, {name: string; unit: string}> = {
  x: {name: SWIPE_TRAVEL_PROPERTY, unit: 'px'},
  confirm: {name: SWIPE_CONFIRM_PROPERTY, unit: ''},
};

const CHANNELS = Object.keys(PROPERTIES) as SwipeChannel[];

/** A curve a channel plays, in seconds from its start. */
export interface SwipeCurve {
  /** Length, s. */
  readonly duration: number;
  /** Value `t` seconds after the start (0 ≤ t ≤ duration). */
  at(t: number): number;
  /** Velocity `t` seconds after the start, units/s. */
  velocity(t: number): number;
}

export interface SwipeMotionHandle {
  /**
   * True when every channel the call moves reached the end of its curve,
   * false as soon as any of them is played again or set before that.
   */
  readonly finished: Promise<boolean>;
  /**
   * When the motion started on the document clock (ms): the browser's next
   * frame for a motion from rest, `at` otherwise; under Reduce Motion, when
   * the dip started.
   */
  readonly started: Promise<number>;
}

export interface SwipeMotionOptions {
  /**
   * The start (ms, document clock) of a motion that continues one on screen;
   * without it the motion starts at the browser's next frame.
   */
  at?: number;
  /** Under Reduce Motion, the fade `reducedMotionFade` gives for the change. */
  fade?: ReducedMotionFade | null;
}

export interface SwipeMotion {
  /** The root the properties are written on; writes where the row is now. */
  attach: (root: HTMLElement | null) => void;
  /** A channel's presentation value at `time` (default now). */
  get: (channel: SwipeChannel, time?: number) => number;
  /** A channel's presentation velocity at `time` (default now), units/s. */
  velocity: (channel: SwipeChannel, time?: number) => number;
  /** Whether a curve on the channel has started on screen and not ended. */
  isMoving: (channel: SwipeChannel, time?: number) => boolean;
  play: (
    curves: Partial<Record<SwipeChannel, SwipeCurve>>,
    options?: SwipeMotionOptions,
  ) => SwipeMotionHandle;
  /** Put channels at values now, ending any motion on them. */
  set: (values: Partial<Record<SwipeChannel, number>>) => void;
  /** End every motion and give the root back its own styles. */
  dispose: () => void;
}

interface Owner {
  /** The channels the call still moves. */
  channels: Set<SwipeChannel>;
  isSettled: boolean;
  hasStarted: boolean;
  resolveFinished: (finished: boolean) => void;
  resolveStarted: (start: number) => void;
}

interface Segment {
  curve: SwipeCurve;
  /** ms on the document clock; null until the browser's next frame. */
  start: number | null;
  owner: Owner;
}

/** A Reduced Motion change in flight: the row dips and lands at the bottom. */
interface Dip {
  owner: Owner;
  values: Partial<Record<SwipeChannel, number>>;
  timer: ReturnType<typeof setTimeout> | null;
  animations: Animation[];
  hasLanded: boolean;
}

const now = (): number =>
  typeof performance !== 'undefined' ? performance.now() : Date.now();

/** A value as the property writes it: sub-pixel, without float noise. */
const format = (value: number): string =>
  String(Math.round(value * 10000) / 10000);

export function createSwipeMotion(): SwipeMotion {
  let root: HTMLElement | null = null;
  const resting: Record<SwipeChannel, number> = {x: 0, confirm: 0};
  const segments = new Map<SwipeChannel, Segment>();
  let dip: Dip | null = null;
  let frame: number | null = null;

  const write = (channel: SwipeChannel, value: number) => {
    const {name, unit} = PROPERTIES[channel];
    root?.style.setProperty(name, `${format(value)}${unit}`);
  };

  const createOwner = (
    channels: Iterable<SwipeChannel>,
  ): {owner: Owner; handle: SwipeMotionHandle} => {
    let resolveFinished: (finished: boolean) => void = () => {};
    let resolveStarted: (start: number) => void = () => {};
    const finished = new Promise<boolean>(resolve => {
      resolveFinished = resolve;
    });
    const started = new Promise<number>(resolve => {
      resolveStarted = resolve;
    });
    const owner: Owner = {
      channels: new Set(channels),
      hasStarted: false,
      isSettled: false,
      resolveFinished,
      resolveStarted,
    };
    return {handle: {finished, started}, owner};
  };

  const start = (owner: Owner, time: number) => {
    if (!owner.hasStarted) {
      owner.hasStarted = true;
      owner.resolveStarted(time);
    }
  };

  const settle = (owner: Owner, finished: boolean) => {
    if (owner.isSettled) {
      return;
    }
    owner.isSettled = true;
    owner.resolveFinished(finished);
  };

  const valueAt = (channel: SwipeChannel, time: number): number => {
    const segment = segments.get(channel);
    if (segment == null) {
      return resting[channel];
    }
    const {curve} = segment;
    if (segment.start == null) {
      return curve.at(0);
    }
    const t = Math.max(0, (time - segment.start) / 1000);
    return t >= curve.duration ? curve.at(curve.duration) : curve.at(t);
  };

  const velocityAt = (channel: SwipeChannel, time: number): number => {
    const segment = segments.get(channel);
    if (segment == null) {
      return 0;
    }
    const {curve} = segment;
    if (segment.start == null) {
      return curve.velocity(0);
    }
    const t = Math.max(0, (time - segment.start) / 1000);
    return t >= curve.duration ? 0 : curve.velocity(t);
  };

  const tick = (time: number) => {
    frame = null;
    const done: Owner[] = [];
    for (const [channel, segment] of [...segments]) {
      if (segment.start == null) {
        segment.start = time;
        start(segment.owner, time);
      }
      const {curve} = segment;
      const t = Math.max(0, (time - segment.start) / 1000);
      if (t >= curve.duration) {
        resting[channel] = curve.at(curve.duration);
        segments.delete(channel);
        write(channel, resting[channel]);
        segment.owner.channels.delete(channel);
        if (segment.owner.channels.size === 0) {
          done.push(segment.owner);
        }
      } else {
        write(channel, curve.at(t));
      }
    }
    for (const owner of done) {
      settle(owner, true);
    }
    schedule();
  };

  const schedule = () => {
    if (frame == null && segments.size > 0) {
      frame = requestAnimationFrame(tick);
    }
  };

  const endDip = (current: Dip) => {
    if (current.timer != null) {
      clearTimeout(current.timer);
      current.timer = null;
    }
    for (const animation of current.animations) {
      animation.cancel();
    }
    current.animations = [];
    if (dip === current) {
      dip = null;
    }
  };

  /** A channel stops where it is now; the call moving it did not finish. */
  const interrupt = (channel: SwipeChannel) => {
    const segment = segments.get(channel);
    if (segment != null) {
      resting[channel] = valueAt(channel, now());
      segments.delete(channel);
      segment.owner.channels.delete(channel);
      settle(segment.owner, false);
    }
    if (dip != null && channel in dip.values) {
      const current = dip;
      endDip(current);
      settle(current.owner, false);
    }
  };

  const fadeOpacity = (
    from: number,
    to: number,
    duration: number,
    easing: string,
  ): Animation | null =>
    root != null && typeof root.animate === 'function'
      ? root.animate([{opacity: from}, {opacity: to}], {
          duration,
          easing,
          fill: 'forwards',
        })
      : null;

  const startDip = (
    owner: Owner,
    values: Partial<Record<SwipeChannel, number>>,
    fade: ReducedMotionFade,
  ) => {
    const half = fade.duration / 2;
    const current: Dip = {
      animations: [],
      hasLanded: false,
      owner,
      timer: null,
      values,
    };
    dip = current;
    const land = (due: number) => {
      if (dip !== current) {
        return;
      }
      current.timer = null;
      current.hasLanded = true;
      for (const channel of CHANNELS) {
        const value = values[channel];
        if (value != null) {
          resting[channel] = value;
          write(channel, value);
        }
      }
      // The fade back in takes what is left of the dip: a timer a busy main
      // thread ran late shortens it, so the dip still ends when it was due.
      const late = Math.max(0, now() - due);
      const rest = Math.max(1, half - late);
      for (const animation of current.animations) {
        animation.cancel();
      }
      const fadeIn = fadeOpacity(0, 1, rest, fade.easing);
      current.animations = fadeIn == null ? [] : [fadeIn];
      current.timer = setTimeout(() => {
        if (dip !== current) {
          return;
        }
        endDip(current);
        settle(owner, true);
      }, rest);
    };
    const fadeOut = fadeOpacity(1, 0, half, fade.easing);
    if (fadeOut == null) {
      const time = now();
      start(owner, time);
      current.timer = setTimeout(() => land(time + half), half);
      return;
    }
    current.animations = [fadeOut];
    // Timed from when the dip starts on screen: the browser's next frame.
    void fadeOut.ready.then(() => {
      if (dip !== current || current.hasLanded) {
        return;
      }
      const startTime = fadeOut.startTime;
      const began = typeof startTime === 'number' ? startTime : now();
      start(owner, began);
      current.timer = setTimeout(
        () => land(began + half),
        Math.max(0, began + half - now()),
      );
    });
  };

  return {
    attach: element => {
      root = element;
      for (const channel of CHANNELS) {
        if (resting[channel] !== 0 || segments.has(channel)) {
          write(channel, valueAt(channel, now()));
        }
      }
    },
    get: (channel, time = now()) => valueAt(channel, time),
    velocity: (channel, time = now()) => velocityAt(channel, time),
    isMoving: (channel, time = now()) => {
      const segment = segments.get(channel);
      return (
        segment != null &&
        segment.start != null &&
        (time - segment.start) / 1000 < segment.curve.duration
      );
    },
    play: (curves, {at, fade} = {}) => {
      const channels = CHANNELS.filter(channel => curves[channel] != null);
      for (const channel of channels) {
        interrupt(channel);
      }
      const {handle, owner} = createOwner(channels);
      if (fade != null) {
        const values: Partial<Record<SwipeChannel, number>> = {};
        for (const channel of channels) {
          const curve = curves[channel] as SwipeCurve;
          values[channel] = curve.at(curve.duration);
        }
        if (fade.duration > 0 && root != null) {
          startDip(owner, values, fade);
          return handle;
        }
        // At once (design:reduced-motion DR3).
        for (const channel of channels) {
          resting[channel] = values[channel] as number;
          write(channel, resting[channel]);
        }
        start(owner, now());
        settle(owner, true);
        return handle;
      }
      for (const channel of channels) {
        segments.set(channel, {
          curve: curves[channel] as SwipeCurve,
          owner,
          start: at ?? null,
        });
      }
      if (at != null) {
        start(owner, at);
      }
      if (channels.length === 0) {
        start(owner, now());
        settle(owner, true);
      }
      schedule();
      return handle;
    },
    set: values => {
      for (const channel of CHANNELS) {
        const value = values[channel];
        if (value == null) {
          continue;
        }
        interrupt(channel);
        resting[channel] = value;
        write(channel, value);
      }
    },
    dispose: () => {
      if (frame != null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      for (const segment of segments.values()) {
        settle(segment.owner, false);
      }
      segments.clear();
      if (dip != null) {
        const current = dip;
        endDip(current);
        settle(current.owner, false);
      }
      for (const channel of CHANNELS) {
        root?.style.removeProperty(PROPERTIES[channel].name);
      }
    },
  };
}
