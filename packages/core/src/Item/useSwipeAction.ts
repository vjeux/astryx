// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useSwipeAction.ts
 * @input Per side, the panel window and its entries (callback refs; the row
 *   root is the window's parent); the gesture foundation
 *   (PanGestureRecognizer); swipeMotion.ts, the UIKit constants table and
 *   swipeRelease.ts
 * @output Exports useSwipeAction — the gesture and the motion behind Item's
 *   `swipeActions` (where a release lands is swipeRelease.ts; where each part
 *   sits for the travel is ItemSwipeLayer's styles)
 * @position Internal to Item, through ItemSwipeLayer (the only module that
 *   imports it); tested through Item.test.tsx and useSwipeAction.test.ts
 *
 * A UIKit list swipe: drag a row sideways and the side's panel is uncovered.
 * Under `reveal` a fast release goes the way it moves and a slow one rests
 * the row open past half the open width, with every entry tappable. A drag
 * on past the confirm point confirms a full swipe: the row runs ahead to
 * UIKit's confirmation offset and the outermost entry covers the space, and
 * letting go there fires it; backing out undoes the look, and a swipe that
 * backed out closes. Under `commit` only a confirmed full swipe fires, and
 * nothing rests (swipeRelease.ts). Whenever the row slides out (a full
 * swipe, or a tapped entry with `hasRemoval`) the entry fires once the row's
 * content has left its box, at once when the row is already past that edge:
 * UIKit calls the handler at the lift or the tap, and firing when the content
 * is gone means a row its app removes at once never vanishes mid-slide. After
 * an entry fires the row springs back, or holds out when the entry has
 * `hasRemoval`.
 *
 * Touch only (the recognizer's pointer types), by pointer type rather than
 * by breakpoint: a mouse has the row's own controls and a keyboard has the
 * verb already; the gesture is an accelerator for a verb the row exposes
 * elsewhere, never the only way to reach one.
 *
 * The pan is the gesture foundation's (named `Item.swipe`, a debugging
 * label). It claims the touch after 8 px of
 * sideways travel (a drag more vertical than horizontal belongs to the
 * scroller and fails it), toward a side with entries or on a row that is open
 * or moving: a browser commits to scrolling a touch at about 10 px, so the
 * row must claim before that. The swipe itself begins where UIKit's does,
 * after 25 px, from 0, and in between the row carries on as it was. The pan
 * reads each touch's pointer, as `spec:AST-057` says: a finger swipes the row
 * whatever the primary pointer and a mouse never starts it, one rule on every
 * device. The foundation tells the browser (`touch-action: pan-y
 * pinch-zoom`, `touchmove` cancelled only while the pan owns the touch, the
 * click the browser synthesizes swallowed) and leaves a pinch to the page: a
 * finger that lands while another is down, on the row or anywhere else, never
 * starts the pan, a second finger that lands before the claim fails it and
 * leaves its touch to the browser's pinch, and once the row has claimed its
 * finger a second finger leaves the swipe going (spec:AST-094 FR10).
 *
 * An open row (resting, or settling to rest open: UIKit counts a row open
 * from the release that opens it) closes on a pointer landing outside it, on
 * a scroll of anything that holds it while focus is outside its open panel,
 * on Escape with focus inside it, and on a tap on its own content. That tap
 * activates nothing on the row, as in UIKit: a foundation tap recognizer
 * takes it at the lift, so the browser never clicks.
 *
 * Motion is UIKit's. Every move of the finger starts a spring toward the
 * finger's offset from the row's presentation value and velocity, so the row
 * trails a moving finger and catches up when it stops; the release starts
 * the same spring toward where the row lands, still from the presentation
 * velocity. A finger that lands on a moving row catches it where it is. The
 * spring writes the row's travel as a custom property on the root on every
 * frame (`spec:AST-057` FR2, swipeMotion.ts), and every part reads it in its
 * transform (ItemSwipeLayer): the root moves by it; each side's panel is a
 * window over the row's resting box that reads its negation (so it stays
 * put and clips to that box); a track inside it moves with the row (so it
 * clips the entries to exactly the space the row vacates); and each entry
 * inside the track is translated back again, from the side's pin and open
 * width this hook writes on the window, so the entries stay pinned at the
 * outer edge until the row has uncovered them all, then ride the row, the
 * outermost entry's colour, painted beside it, stretching it out to the
 * outer edge. A full swipe's confirm is a second property on the same
 * spring: the outermost entry slides by it to the row's edge and the others
 * fade by it over the track's fill of its colour. The entries move as one
 * block with no wrapper around them (minimal DOM,
 * `architecture:component-style-authoring` INV7). Two properties move every
 * part, so they cannot drift apart, and nothing lays out. A drag costs no
 * React render; the claim, the confirming and the landing each cost one.
 *
 * The gesture reads each touch's pointer: a finger swipes the row on every
 * device, whatever the primary pointer, and a mouse never does.
 *
 * Under Reduce Motion (`design:reduced-motion`) the finger's own drag is
 * direct manipulation and follows it one for one, but nothing a release or
 * a close starts travels or springs: the row lands at the bottom of an
 * opacity dip (DR2).
 *
 * Directions are logical: `leading` is uncovered by a drag toward the inline
 * end and sits at the inline start, `trailing` the reverse, read against the
 * root's computed `direction` when the pan begins, so under `dir="rtl"` the
 * finger, the uncovered edge and the panel agree.
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import type {KeyboardEvent as ReactKeyboardEvent} from 'react';
import {
  PanGestureRecognizer,
  TapGestureRecognizer,
  getGestureHost,
  useGestureRecognizer,
} from '../gestures';
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect';
import {isRtlElement} from '../hooks/isRtlElement';
import {solveSpring, toSpring, type SpringDescription} from '../motion/spring';
import {reducedMotionFade} from '../motion/reducedMotion';
import {swipeActions as SWIPE} from '../motion/uikit/swipeActions';
import {
  createSwipeMotion,
  type SwipeCurve,
  type SwipeMotion,
  type SwipeMotionHandle,
} from './swipeMotion';
import {confirmedOffset, confirmPoint, resolveRelease} from './swipeRelease';

export type SwipeSide = 'leading' | 'trailing';
export type SwipeBehavior = 'reveal' | 'commit';
export type SwipePhase =
  /** At rest, closed. */
  | 'idle'
  /** The finger drives the row. */
  | 'dragging'
  /** Springing to where the release, a tap or a close sent it. */
  | 'settling'
  /** Resting open with the side's panel tappable (`reveal` only). */
  | 'resting'
  /** Out, after an entry with `hasRemoval` fired. */
  | 'held';

export interface SwipeState {
  phase: SwipePhase;
  /** The side whose panel is uncovered, or will be. */
  side: SwipeSide;
  /** A confirmed full swipe: letting go now fires the outermost entry. */
  isArmed: boolean;
  /** Where the settle in progress lands (`settling` only). */
  landing?: 'idle' | 'resting' | 'held';
}

/**
 * The row is open: resting, or settling to rest open. UIKit counts a row open
 * from the release that opens it, not from when its spring comes to rest: an
 * open row closes on a tap on its content, a pointer outside it, a scroll or
 * Escape, and its root takes no press.
 */
export function isSwipeOpen(state: SwipeState): boolean {
  return (
    state.phase === 'resting' ||
    (state.phase === 'settling' && state.landing === 'resting')
  );
}

/**
 * A side's geometry, written on its window when a drag begins: the pin
 * (physical px, where the entries sit against the track so they stay at the
 * outer edge), the side's physical sign (+1 on the left), its open width
 * (px) and the outermost entry's slide on a confirmed full swipe (physical
 * px). The entries' and the outermost entry's transforms read them.
 */
export const SWIPE_PIN_PROPERTY = '--_item-swipe-pin';
export const SWIPE_SIGN_PROPERTY = '--_item-swipe-sign';
export const SWIPE_OPEN_PROPERTY = '--_item-swipe-open';
export const SWIPE_SLIDE_PROPERTY = '--_item-swipe-slide';

/** Callback refs for the elements of one side's panel the gesture reads. */
export interface SwipePanelRefs {
  /** The window over the row's resting box; the side's pin is written on it. */
  panel: (element: HTMLElement | null) => void;
  /**
   * Each entry other than the outermost, pinned at the outer edge inside the
   * track and fading on a confirmed full swipe: the ref for the entry with
   * `key` (its React key), stable per key. Their natural widths together,
   * the outermost entry's included, are how far the row opens.
   */
  entry: (key: string) => (element: HTMLElement | null) => void;
  /**
   * The outermost entry, pinned with the others, which slides to the row's
   * edge on a confirmed full swipe.
   */
  outer: (element: HTMLElement | null) => void;
}

export interface UseSwipeActionOptions {
  behavior: SwipeBehavior;
  /** Which sides have entries. A drag toward a side without any never begins. */
  sides: {leading: boolean; trailing: boolean};
  /**
   * Fire the side's outermost entry. Returns whether the row holds out
   * afterwards (the entry's `hasRemoval`).
   */
  fireOutermost: (side: SwipeSide) => boolean;
  /** Whether the side's outermost entry can fire: a disabled one never confirms a full swipe. */
  canConfirm: (side: SwipeSide) => boolean;
  /**
   * Told from the transition that opens or closes the row (open is
   * `isSwipeOpen`). A row that leaves while open is not told: its owner,
   * which decides whether the layer renders, drops its flag as it renders.
   */
  onOpenChange?: (isOpen: boolean) => void;
}

export interface UseSwipeActionResult {
  state: SwipeState;
  /** Attach each side's moving panel parts. */
  panelRefs: Record<SwipeSide, SwipePanelRefs>;
  /**
   * A resting panel's entry was tapped. Without `hasRemoval` (`holdsOut`) it
   * fires at once and the row closes; with it the row slides out, the entry
   * fires once the row's content has left its box, and the row holds out.
   */
  activateEntry: (fire: () => void, holdsOut: boolean) => void;
  /** Close a resting row. */
  close: () => void;
  /** Escape closes a resting row with focus inside it. */
  onKeyDown: (event: ReactKeyboardEvent) => void;
}

// =============================================================================
// Geometry (pure)
// =============================================================================

export interface SwipeLayout {
  side: SwipeSide;
  /** +1 when the inline end is to the right (LTR), −1 under RTL. */
  inlineSign: 1 | -1;
  /** The side's entries at their natural widths together: how far the row opens. */
  openWidth: number;
  /** The outermost entry's width. */
  outerWidth: number;
}

/** +1 when the side's panel is on the physical left, −1 on the right. */
export function physicalSign(side: SwipeSide, inlineSign: 1 | -1): 1 | -1 {
  return side === 'leading' ? inlineSign : inlineSign === 1 ? -1 : 1;
}

/** The longest a slide-out takes to leave the row's box (ms): beyond it, never. */
const SLIDE_OUT_HORIZON_MS = 3000;

/**
 * When `motion`, on the curve it now plays, first carries the row to `edge`
 * (physical px) or past it, in ms after `start`: 0 when it is there already,
 * null when it never gets there. The curve is read back analytically.
 */
function timeToPass(
  motion: SwipeMotion,
  start: number,
  edge: number,
): number | null {
  const sign = Math.sign(edge) || 1;
  const reached = (t: number) =>
    motion.get('x', start + t) * sign >= Math.abs(edge);
  if (reached(0)) {
    return 0;
  }
  for (let t = 1; t <= SLIDE_OUT_HORIZON_MS; t += 1) {
    if (reached(t)) {
      return t;
    }
  }
  return null;
}

/**
 * What started a settle: a touch drag ending (its release, or the browser
 * taking the touch), or anything else (Escape, a pointer outside, a tapped
 * entry, a tap on the content, a scroll).
 */
type SettleCause = 'release' | 'other';

// =============================================================================
// The hook
// =============================================================================

const IDLE_STATE: SwipeState = {isArmed: false, phase: 'idle', side: 'leading'};

/** Below this the row is at rest, closed. */
const AT_REST_PX = 0.5;

/**
 * A side's panel as the gesture reads it: the window it writes the side's pin
 * on, and the entries, whose natural widths together open the row.
 */
interface SidePanel {
  window: HTMLElement | null;
  /** The entries other than the outermost, by React key. */
  entries: Map<string, HTMLElement>;
  /** The callback ref for the entry with `key`, stable per key. */
  entryRef: (key: string) => (element: HTMLElement | null) => void;
  outer: HTMLElement | null;
}

function createSidePanel(): SidePanel {
  const entries = new Map<string, HTMLElement>();
  const refs = new Map<string, (element: HTMLElement | null) => void>();
  return {
    entries,
    entryRef: key => {
      let ref = refs.get(key);
      if (ref == null) {
        ref = element => {
          if (element == null) {
            entries.delete(key);
          } else {
            entries.set(key, element);
          }
        };
        refs.set(key, ref);
      }
      return ref;
    },
    outer: null,
    window: null,
  };
}

/** The entries' natural widths together, the outermost's included: how far the row opens. */
function openWidthOf(side: SidePanel): number {
  let width = side.outer?.offsetWidth ?? 0;
  for (const entry of side.entries.values()) {
    width += entry.offsetWidth;
  }
  return width;
}

/** Where a spring's curve on the travel ends: within this of its target (px). */
const SETTLE_PX = 0.05;
/**
 * Where a spring's curve on the confirm ends: within this of its target, a
 * twentieth of a pixel of the outermost entry's slide.
 */
const SETTLE_CONFIRM = 0.0005;

/**
 * A curve for one spring, from a presentation value and velocity (units,
 * units/s) to `to`, ending exactly at `to` once within `threshold` of it.
 * The spring is the motion foundation's own solution.
 */
function springCurve(
  spring: SpringDescription,
  from: number,
  velocity: number,
  to: number,
  threshold = SETTLE_PX,
): SwipeCurve {
  const curve = solveSpring(toSpring(spring), {from, to, velocity});
  const duration = curve.settleTime(threshold);
  return {
    duration,
    at: t => (t >= duration ? to : curve.value(t)),
    velocity: t => (t >= duration ? 0 : curve.velocity(t)),
  };
}

interface Drag {
  layout: SwipeLayout;
  rowWidth: number;
  /** The finger's swipe at which the full swipe confirms. */
  confirmAt: number;
  /** The side's outermost entry can fire (not disabled). */
  canConfirm: boolean;
  /** Past UIKit's threshold: the row follows the finger. */
  started: boolean;
  /** Which way the finger crossed the threshold: +1 toward the side, -1 away. */
  startSign: number;
  /** The travel the row had when the swipe began (logical, ≥ 0). */
  baseTravel: number;
  /** The finger's travel along the side. */
  raw: number;
  /** Confirmed: the finger is past the confirm point. */
  isArmed: boolean;
  /** The full swipe confirmed at some point in this swipe. */
  wasConfirmed: boolean;
  /**
   * Under Reduce Motion, when the cross-fade a confirm or a back-out started
   * ends (performance.now() ms): until then the moves leave it alone.
   */
  dipUntil?: number;
}

/**
 * The first focusable thing in the row outside its swipe panels, for focus to
 * land on when a resting panel closes under it.
 */
function focusRowContent(root: HTMLElement): void {
  const candidates = root.querySelectorAll<HTMLElement>(
    'button, a[href], input, [tabindex]:not([tabindex="-1"])',
  );
  for (const el of candidates) {
    if (el.closest('[data-swipe-panel]') == null) {
      el.focus();
      return;
    }
  }
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

export function useSwipeAction({
  behavior,
  sides,
  fireOutermost,
  canConfirm,
  onOpenChange,
}: UseSwipeActionOptions): UseSwipeActionResult {
  // The latest options, read by listeners and completions that outlive a render.
  // Synchronizes the gesture system (recognizer callbacks, animation
  // completions, the slide-out's fire timer) with the committed options.
  const latestRef = useRef({
    behavior,
    canConfirm,
    fireOutermost,
    onOpenChange,
    sides,
  });
  useIsomorphicLayoutEffect(() => {
    latestRef.current = {
      behavior,
      canConfirm,
      fireOutermost,
      onOpenChange,
      sides,
    };
  });

  const [state, setState] = useState<SwipeState>(IDLE_STATE);
  const stateRef = useRef(state);
  // Synchronizes the gesture system with the committed state: its recognizer
  // callbacks and the document listeners run outside React and read it here.
  // Idempotent: it rewrites the ref with the committed value.
  useIsomorphicLayoutEffect(() => {
    stateRef.current = state;
  });
  // Every transition goes through here, so the one that opens or closes the
  // row reports it at once, from the handler that caused it.
  const setSwipeState = useCallback((next: SwipeState) => {
    const report = latestRef.current.onOpenChange;
    const wasOpen = isSwipeOpen(stateRef.current);
    const isOpen = isSwipeOpen(next);
    stateRef.current = next;
    setState(next);
    if (wasOpen !== isOpen) {
      report?.(isOpen);
    }
  }, []);

  const [motion] = useState<SwipeMotion>(createSwipeMotion);
  const [panels] = useState<Record<SwipeSide, SidePanel>>(() => ({
    leading: createSidePanel(),
    trailing: createSidePanel(),
  }));
  /** The layout of the side that moved last: where the row is, and how to move it. */
  const layoutRef = useRef<SwipeLayout | null>(null);
  const dragRef = useRef<Drag | null>(null);
  /**
   * Counts the row's motions: a timer started for one motion acts only if
   * no other motion has started since (a finger caught the row, a close).
   */
  const motionRef = useRef(0);
  /** The row's motion in progress, when a spring drives it. */
  const rootMotionRef = useRef<SwipeMotionHandle | null>(null);
  const fireTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Releases the browser timer a slide-out set for its fire when the row
  // leaves, and drops a fire still waiting for its slide-out to start.
  useEffect(
    () => () => {
      motionRef.current += 1;
      if (fireTimerRef.current != null) {
        clearTimeout(fireTimerRef.current);
      }
    },
    [],
  );
  /** The row is open (see `isSwipeOpen`), read by listeners and recognizers. */
  const isOpen = useCallback(() => isSwipeOpen(stateRef.current), []);

  // The row root: the gesture's target and the element that translates. A
  // panel is its child, and a panel's ref is set before this hook's layout
  // effects run, while a ref on the root itself is set after them.
  const rootRef = useRef<HTMLElement | null>(null);
  // A side's window and entries attach as they mount (a side's panel exists
  // only while it has entries).
  const [panelRefs] = useState<Record<SwipeSide, SwipePanelRefs>>(() => {
    const refsFor = (side: SidePanel): SwipePanelRefs => ({
      entry: key => side.entryRef(key),
      outer: element => {
        side.outer = element;
      },
      panel: element => {
        if (element?.parentElement != null) {
          rootRef.current = element.parentElement;
        }
        side.window = element;
      },
    });
    return {
      leading: refsFor(panels.leading),
      trailing: refsFor(panels.trailing),
    };
  });
  useIsomorphicLayoutEffect(() => {
    motion.attach(rootRef.current);
    // The root outlives the layer: the motion gives it back its own styles.
    return () => motion.dispose();
  }, [motion, rootRef]);

  /** The row's travel on screen now, logical, on `layout`'s side. */
  const travelNow = useCallback(
    (layout: SwipeLayout): number =>
      Math.max(
        0,
        motion.get('x') * physicalSign(layout.side, layout.inlineSign),
      ),
    [motion],
  );

  /**
   * Spring the row to `travel`, and a full swipe's confirm to `confirm` (0 or
   * 1), each from its presentation value and velocity, on one spring.
   * Resolves with the motion's completion.
   */
  const springTo = useCallback(
    async (
      layout: SwipeLayout,
      travel: number,
      spring: SpringDescription,
      confirm = 0,
      // A settle a touch drag's release started: under Reduce Motion it
      // cross-fades whatever the pointer (design:reduced-motion DR2).
      touchRelease = false,
    ): Promise<boolean> => {
      layoutRef.current = layout;
      motionRef.current += 1;
      const to = physicalSign(layout.side, layout.inlineSign) * travel;
      // From rest the spring starts at the browser's next frame, so a frame
      // held back (iOS during a smooth scroll) delays the settle instead of
      // skipping into it. A spring that continues motion on screen (the next
      // move's, the release's, a catch's) starts now, from where the row is.
      const at =
        motion.isMoving('x') || motion.isMoving('confirm')
          ? performance.now()
          : undefined;
      // UIKit sets the full swipe's look inside the same per-move animator.
      // The confirm moves only when the full swipe confirms or backs out: a
      // confirm already at its target and still is left as it is.
      const confirming =
        motion.get('confirm') !== confirm || motion.velocity('confirm') !== 0;
      const handle = motion.play(
        {
          x: springCurve(spring, motion.get('x'), motion.velocity('x'), to),
          ...(confirming
            ? {
                confirm: springCurve(
                  spring,
                  motion.get('confirm'),
                  motion.velocity('confirm'),
                  confirm,
                  SETTLE_CONFIRM,
                ),
              }
            : {}),
        },
        {at, fade: reducedMotionFade(rootRef.current, {touchRelease})},
      );
      rootMotionRef.current = handle;
      return handle.finished;
    },
    [motion, rootRef],
  );

  /**
   * The row at `travel` and the confirm at `confirm` now: following the
   * finger one for one under Reduce Motion.
   */
  const moveTo = useCallback(
    (layout: SwipeLayout, travel: number, confirm = 0) => {
      layoutRef.current = layout;
      motionRef.current += 1;
      rootMotionRef.current = null;
      motion.set({
        confirm,
        x: physicalSign(layout.side, layout.inlineSign) * travel,
      });
    },
    [motion],
  );

  /**
   * Settle the row at `travel` and land in `phase`. The landing is skipped
   * when something interrupts the settle (a finger catches the row, another
   * settle starts).
   */
  const settle = useCallback(
    (
      layout: SwipeLayout,
      travel: number,
      phase: 'idle' | 'resting' | 'held',
      afterSettle?: () => boolean,
      cause: SettleCause = 'other',
      confirm = 0,
    ) => {
      setSwipeState({
        isArmed: false,
        landing: phase,
        phase: 'settling',
        side: layout.side,
      });
      // Under Reduce Motion the row cross-fades or lands at once
      // (design:reduced-motion); what a release started always cross-fades.
      const touchRelease = cause === 'release';
      const settled = springTo(
        layout,
        travel,
        SWIPE.settle,
        confirm,
        touchRelease,
      );
      void settled.then(finished => {
        if (!finished) {
          return;
        }
        // A settle that fires an entry may start the spring back itself; the
        // landing below is then that settle's to make.
        if (afterSettle?.() === true) {
          return;
        }
        setSwipeState(
          phase === 'idle'
            ? IDLE_STATE
            : {isArmed: false, phase, side: layout.side},
        );
      });
    },
    [setSwipeState, springTo],
  );

  /** How far out a row goes when an entry fires and the row leaves. */
  const outTravel = useCallback(
    () => (rootRef.current?.clientWidth ?? 0) + SWIPE.slideOutOvershoot,
    [rootRef],
  );

  /**
   * Slide the row out toward the edge it travelled toward, and fire once its
   * content has left its box (`spec:AST-057` FR5). `confirm` is 1 for a
   * confirmed full swipe, whose outermost entry covers the row's place.
   */
  const slideOutThenFire = useCallback(
    (
      layout: SwipeLayout,
      cause: SettleCause,
      confirm: number,
      fire: () => void,
    ) => {
      // UIKit calls the handler at the lift or the tap. The row fires once
      // its content has left its box, so a row its app removes at once never
      // vanishes mid-slide; at once when the row is already past that edge.
      const sign = physicalSign(layout.side, layout.inlineSign);
      const edge = sign * (rootRef.current?.clientWidth ?? 0);
      settle(layout, outTravel(), 'held', undefined, cause, confirm);
      const generation = motionRef.current;
      const handle = rootMotionRef.current;
      const fade = reducedMotionFade(rootRef.current, {
        touchRelease: cause === 'release',
      });
      // One pending fire at a time: a new slide-out replaces an older one's.
      if (fireTimerRef.current != null) {
        clearTimeout(fireTimerRef.current);
        fireTimerRef.current = null;
      }
      let timer: ReturnType<typeof setTimeout> | null = null;
      const fireIfStill = () => {
        if (fireTimerRef.current === timer) {
          fireTimerRef.current = null;
        }
        if (motionRef.current === generation) {
          fire();
        }
      };
      if (fade == null && timeToPass(motion, performance.now(), edge) === 0) {
        fireIfStill();
        return;
      }
      // Timed from when the slide-out starts on screen: one from rest waits
      // for the browser's first frame (longer on a busy page), and until then
      // the row is where it was. Under Reduce Motion the row never travels:
      // it lands out of its box at the bottom of the cross-fade, and fires
      // there; otherwise when the curve the motion plays carries it past
      // the edge, read back from the curve itself.
      void handle?.started.then(startedAt => {
        if (motionRef.current !== generation) {
          return;
        }
        const delay =
          fade != null
            ? fade.duration / 2
            : timeToPass(motion, startedAt, edge);
        if (delay == null) {
          return;
        }
        const wait = Math.max(0, startedAt + delay - performance.now());
        if (wait === 0) {
          fireIfStill();
          return;
        }
        timer = setTimeout(fireIfStill, wait);
        fireTimerRef.current = timer;
      });
    },
    [motion, outTravel, rootRef, settle],
  );

  /**
   * A confirmed full swipe: out with the outermost entry covering the row's
   * place; the entry fires as the row leaves, then it holds out or springs
   * back.
   */
  const slideOutAndFire = useCallback(
    (layout: SwipeLayout, cause: SettleCause) => {
      slideOutThenFire(layout, cause, 1, () => {
        if (!latestRef.current.fireOutermost(layout.side)) {
          settle(layout, 0, 'idle', undefined, cause);
        }
      });
    },
    [settle, slideOutThenFire],
  );

  const close = useCallback(() => {
    const layout = layoutRef.current;
    if (!isOpen() || layout == null) {
      return;
    }
    const root = rootRef.current;
    if (root != null && root.contains(document.activeElement)) {
      focusRowContent(root);
    }
    settle(layout, 0, 'idle');
  }, [isOpen, rootRef, settle]);

  const activateEntry = useCallback(
    (fire: () => void, holdsOut: boolean) => {
      const layout = layoutRef.current;
      // From the release that opens the row, not only once it rests.
      if (!isSwipeOpen(stateRef.current) || layout == null) {
        return;
      }
      const root = rootRef.current;
      if (root != null && root.contains(document.activeElement)) {
        focusRowContent(root);
      }
      if (holdsOut) {
        slideOutThenFire(layout, 'other', 0, fire);
        return;
      }
      fire();
      settle(layout, 0, 'idle');
    },
    [rootRef, settle, slideOutThenFire],
  );

  // An open row closes on a pointer landing anywhere outside it, which is
  // also how a drag on a neighbour closes it: one row rests open at a time
  // with no shared state. It also closes when anything scrolling it moves
  // (the list, the page), as a UIKit row closes when its table scrolls: a
  // scroll that starts on the row itself lands no pointer outside it.
  useEffect(() => {
    if (!isOpen()) {
      return undefined;
    }
    const onOutside = (event: PointerEvent) => {
      const root = rootRef.current;
      if (
        root != null &&
        event.target instanceof Node &&
        !root.contains(event.target)
      ) {
        close();
      }
    };
    const onScroll = (event: Event) => {
      const root = rootRef.current;
      const {target} = event;
      if (
        root == null ||
        !(
          target === document ||
          (target instanceof Element && target.contains(root))
        )
      ) {
        return;
      }
      // Focus inside the open panel means the scroll may be the browser
      // bringing the focused entry into view (keyboard or VoiceOver): the row
      // stays. Focus anywhere else, the row's own content included, closes it
      // (spec:AST-057 FR7).
      const side = layoutRef.current?.side;
      const panel =
        side == null
          ? null
          : root.querySelector(`[data-swipe-panel="${side}"]`);
      if (panel?.contains(document.activeElement) !== true) {
        close();
      }
    };
    document.addEventListener('pointerdown', onOutside, true);
    // A scroll closes the row, as UIKit's table does.
    document.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      document.removeEventListener('pointerdown', onOutside, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  }, [close, isOpen, rootRef, state.phase]);

  // ---------------------------------------------------------------------------
  // The pan

  /** The side a drag from a closed row uncovers: toward the inline end is leading. */
  const sideFor = (dx: number, inlineSign: 1 | -1): SwipeSide =>
    dx * inlineSign > 0 ? 'leading' : 'trailing';

  // Two thresholds. The touch is claimed from the browser at `claim` px of
  // sideways travel, before a browser commits to scrolling it; the swipe
  // itself begins where UIKit's does, at `hysteresis` px, and starts from 0
  // there. In between the row does whatever it was doing (resting,
  // settling) and the browser does nothing.
  const begin = (pan: PanGestureRecognizer) => {
    const root = rootRef.current;
    if (root == null) {
      return;
    }
    const inlineSign: 1 | -1 = isRtlElement(root) ? -1 : 1;
    const x = motion.get('x');
    // An open or moving row continues on its side (closing it or going
    // further); a closed one takes the side the finger moves toward.
    const side: SwipeSide =
      Math.abs(x) > AT_REST_PX
        ? x * inlineSign > 0
          ? 'leading'
          : 'trailing'
        : sideFor(pan.totalTranslation().x, inlineSign);
    const outerWidth = panels[side].outer?.offsetWidth ?? 0;
    const layout: SwipeLayout = {
      inlineSign,
      openWidth: openWidthOf(panels[side]),
      outerWidth,
      side,
    };
    const rowWidth = root.clientWidth;
    // The entries keep their place against the track for the geometry
    // written last; a first drag (or new entries) writes it now, while the
    // track still hides them.
    const sign = physicalSign(side, inlineSign);
    const panel = panels[side].window;
    panel?.style.setProperty(
      SWIPE_PIN_PROPERTY,
      `${sign * layout.openWidth}px`,
    );
    panel?.style.setProperty(SWIPE_SIGN_PROPERTY, String(sign));
    panel?.style.setProperty(SWIPE_OPEN_PROPERTY, `${layout.openWidth}px`);
    panel?.style.setProperty(
      SWIPE_SLIDE_PROPERTY,
      `${sign * (layout.openWidth - outerWidth)}px`,
    );
    dragRef.current = {
      baseTravel: 0,
      canConfirm: latestRef.current.canConfirm(side),
      confirmAt: confirmPoint(layout.openWidth, rowWidth),
      isArmed: false,
      layout,
      raw: 0,
      rowWidth,
      started: false,
      startSign: 1,
      wasConfirmed: false,
    };
    track(pan);
  };

  const track = (pan: PanGestureRecognizer) => {
    const drag = dragRef.current;
    if (drag == null) {
      return;
    }
    const {layout} = drag;
    // The finger's travel toward the side since it landed.
    const along =
      pan.totalTranslation().x * physicalSign(layout.side, layout.inlineSign);
    // UIKit's dead zone: the swipe counts from where the finger crosses it.
    const threshold = SWIPE.hysteresis;
    if (!drag.started) {
      if (Math.abs(along) < threshold) {
        return;
      }
      // The swipe begins: the row is caught where it is, and the tracking
      // spring takes over from its presentation value and velocity.
      drag.started = true;
      drag.startSign = Math.sign(along);
      drag.baseTravel = travelNow(layout);
      setSwipeState({
        isArmed: drag.isArmed,
        phase: 'dragging',
        side: layout.side,
      });
    }
    // The threshold's travel is not part of the swipe, as in UIKit: the
    // swipe counts from where the finger crossed it.
    const swipe = along - drag.startSign * threshold;
    const raw = Math.max(0, drag.baseTravel + swipe);
    drag.raw = raw;
    // The full swipe confirms on the finger's travel, not the row's (which
    // trails it on the spring), and only when the outermost entry can fire.
    const isArmed = drag.canConfirm && raw >= drag.confirmAt;
    const flipped = isArmed !== drag.isArmed;
    if (flipped) {
      drag.isArmed = isArmed;
      drag.wasConfirmed ||= isArmed;
      setSwipeState({isArmed, phase: 'dragging', side: layout.side});
    }
    // Confirmed, the row runs ahead of the finger to UIKit's confirmation
    // offset; backed out, it follows the finger again.
    const travel = isArmed
      ? Math.max(raw, confirmedOffset(drag.rowWidth))
      : raw;
    const confirm = isArmed ? 1 : 0;
    if (reducedMotionFade() == null) {
      void springTo(layout, travel, SWIPE.tracking, confirm);
    } else if (flipped) {
      // Confirming and backing out are changes of state, not the finger's
      // drag: under Reduce Motion they cross-fade (design:reduced-motion
      // DR2), and the moves leave that fade alone until it ends.
      void springTo(layout, travel, SWIPE.tracking, confirm);
      const fade = reducedMotionFade(rootRef.current);
      drag.dipUntil =
        fade == null ? undefined : performance.now() + fade.duration;
    } else if (drag.dipUntil == null || performance.now() >= drag.dipUntil) {
      // Otherwise the row follows the finger one for one: the finger's own
      // drag is direct manipulation (design:reduced-motion).
      drag.dipUntil = undefined;
      moveTo(layout, travel, confirm);
    }
  };

  const release = (pan: PanGestureRecognizer) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag == null) {
      return;
    }
    // A claimed touch that never became a swipe changed nothing: the row
    // carries on as it is, a settle under it landing as it would have.
    if (!drag.started) {
      return;
    }
    const {layout} = drag;
    const velocity =
      pan.velocity().x * physicalSign(layout.side, layout.inlineSign);
    const landing = resolveRelease({
      behavior: latestRef.current.behavior,
      isConfirmed: drag.isArmed,
      openWidth: layout.openWidth,
      travel: drag.raw,
      velocity,
      wasConfirmed: drag.wasConfirmed,
    });
    if (landing === 'perform') {
      slideOutAndFire(layout, 'release');
    } else if (landing === 'open') {
      settle(layout, layout.openWidth, 'resting', undefined, 'release');
    } else {
      settle(layout, 0, 'idle', undefined, 'release');
    }
  };

  const cancel = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag == null) {
      return;
    }
    if (!drag.started) {
      return;
    }
    settle(drag.layout, 0, 'idle', undefined, 'release');
  };

  useGestureRecognizer(
    rootRef,
    () =>
      new PanGestureRecognizer({
        allowedPointerTypes: ['touch'],
        direction: 'horizontal',
        hysteresis: SWIPE.claim,
        maximumNumberOfTouches: 1,
        name: 'Item.swipe',
        shouldBegin: pan => {
          // A finger that is not the only one down is part of a pinch, even
          // when the first finger is off the row: the page zooms
          // (spec:AST-094 FR10).
          const doc = rootRef.current?.ownerDocument ?? document;
          if (getGestureHost(doc).fingersDown() > 1) {
            return false;
          }
          if (stateRef.current.phase === 'held') {
            return false;
          }
          if (Math.abs(motion.get('x')) > AT_REST_PX) {
            return true;
          }
          const root = rootRef.current;
          const inlineSign: 1 | -1 = isRtlElement(root) ? -1 : 1;
          return latestRef.current.sides[
            sideFor(pan.totalTranslation().x, inlineSign)
          ];
        },
      }),
    pan => {
      switch (pan.state) {
        case 'began':
          begin(pan);
          break;
        case 'changed':
          track(pan);
          break;
        case 'ended':
          release(pan);
          break;
        case 'cancelled':
          cancel();
          break;
        case 'possible':
        case 'failed':
          break;
      }
    },
    // `spec:AST-057` reads each event's pointer: a finger swipes the row on
    // every device and a mouse never does, so the host's fine-pointer gate
    // (`spec:AST-094` FR19) does not apply to it.
    {perEventPointer: true},
  );

  // A tap on an open row's own content closes it and activates nothing, as
  // UIKit's dismissal does: the tap recognizes at the lift, and taking the
  // touch cancels the click it would have made. The panel's entries keep
  // their own taps, and a closed row never offers this recognizer a touch.
  useGestureRecognizer(
    rootRef,
    () =>
      new TapGestureRecognizer({
        allowedPointerTypes: ['touch'],
        name: 'item-swipe-dismiss',
        shouldReceiveTouch: (_tap, touch) =>
          isOpen() &&
          !(
            touch.target instanceof Element &&
            touch.target.closest('[data-swipe-panel]') != null
          ),
      }),
    tap => {
      if (tap.state === 'ended') {
        close();
      }
    },
    // The swipe's own dismissal reads each event's pointer, as the swipe
    // does (`spec:AST-057`).
    {perEventPointer: true},
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      if (event.key === 'Escape' && isOpen()) {
        event.stopPropagation();
        close();
      }
    },
    [close, isOpen],
  );

  return {activateEntry, close, onKeyDown, panelRefs, state};
}
