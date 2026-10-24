// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useRefreshControl.ts
 * @input onRefresh / isRefreshing / isDisabled; the foundation (gesture
 *   recognizers, compositor animator, UIKit table, root scroll styles)
 *   through @astryxdesign/core's experimental motion and gesture subpaths
 * @output Exports useRefreshControl: refs for the pulled content and the
 *   indicator, `isRefreshing`, and `refresh()` for the non-gesture path
 * @position Behavior core of RefreshControl
 *
 * The pull (UIKit's refresh pull, measured; see refreshPull.ts):
 * - RefreshPullRecognizer reads a downward pull at the top without taking the
 *   touch, and the content is translated by the overscroll UIKit shows for
 *   that travel: one write per move, no React render. The scroll owner's
 *   `overscroll-behavior-y` is `none` while it is within one viewport of its
 *   top, so the browser draws no rubber band (and Safari's own page reload
 *   never fires) where the pull is drawn instead. Scrolling stays native.
 * - The pull triggers with the finger down; the refresh starts (spin,
 *   announcement, `onRefresh`). Releasing settles onto the refreshing inset
 *   (or back to the top) on the scroll view's bounce, on the compositor.
 * - The end slides the content up by the inset over `refreshControl.endMs`
 *   on UIKit's ease-in-out, or, when the control has scrolled out of view,
 *   drops the inset and the matching scroll offset in one task (no motion).
 * - A programmatic begin (controlled `isRefreshing`, or `refresh()`) adds the
 *   inset with no visible motion, as `beginRefreshing()` does.
 *
 * Main-thread note: finger tracking runs on the main thread here (the browser
 * has no refresh pull of its own to ride); every release, settle, spin and
 * end runs on the compositor.
 *
 * SYNC: When modified, update:
 * - /packages/lab/src/RefreshControl/useRefreshControl.test.tsx
 * - /packages/lab/src/RefreshControl/RefreshControl.tsx
 * - /packages/lab/src/RefreshControl/RefreshControl.doc.mjs
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefCallback,
} from 'react';
import {
  claimRootScrollStyle,
  isScrollLockActive,
  subscribeScrollLock,
  useGestureRecognizer,
  useTouchPresentation,
} from '@astryxdesign/core/gestures/experimental';
import {useAnnounce} from '@astryxdesign/core/hooks';
import {useTranslator} from '@astryxdesign/core/i18n';
import {
  cubicBezier,
  solveSpring,
  toSpring,
  uikit,
  useAnimator,
  type MotionCurve,
} from '@astryxdesign/core/motion/experimental';
import {RefreshPullRecognizer} from './RefreshPullRecognizer';
import {
  INITIAL_REFRESH_STATE,
  reduceRefresh,
  type RefreshEffect,
  type RefreshEvent,
  type RefreshState,
} from './refreshModel';
import {
  endMotion,
  modeAfterTrigger,
  pullOverscroll,
  pullTravel,
  REFRESH_HEIGHT,
  releaseTarget,
  revealProgress,
  triggerDistance,
  type PullMode,
} from './refreshPull';

const {refreshControl, scroll, timing} = uikit;

/** CSS custom property the indicator reads: how much of it is revealed (0–1). */
export const REFRESH_REVEAL_VAR = '--astryx-refresh-reveal';
/**
 * Attribute on the indicator while it spins: the drawing keys its spin on it
 * (on the compositor), so the hook only sets and removes it.
 */
export const REFRESH_SPINNING_ATTRIBUTE = 'data-refresh-spinning';

/** The indicator's container starts the trigger turn here (π − 0.01 rad). */
const TRIGGER_TURN_DEGREES = ((Math.PI - 0.01) * 180) / Math.PI;

export interface UseRefreshControlOptions {
  /**
   * Called when a pull triggers, or when `refresh()` runs. Return a promise to
   * keep the control refreshing until it settles (uncontrolled use).
   */
  onRefresh?: () => unknown;
  /**
   * Controlled refreshing state: `true` puts the control in the refreshing
   * state (as `beginRefreshing()`), `false` ends it (as `endRefreshing()`).
   * Omit it to let the promise `onRefresh` returns decide.
   */
  isRefreshing?: boolean;
  /** Turns the pull off. A refresh in progress keeps running. */
  isDisabled?: boolean;
}

export interface UseRefreshControlResult {
  /** Attach to the element that wraps the scrolled content (it is pulled). */
  contentRef: RefCallback<HTMLElement>;
  /** Attach to the indicator, placed above the content. */
  indicatorRef: RefCallback<HTMLElement>;
  /**
   * Attach to the indicator's glyph wrapper (optional): it turns at the
   * trigger, while the glyph inside it spins on its own.
   */
  spinnerRef: RefCallback<HTMLElement>;
  /** Whether a refresh is in progress. */
  isRefreshing: boolean;
  /** Starts a refresh without a pull (the non-gesture path). */
  refresh: () => void;
}

/** The element whose scroll moves the content, or null for the document. */
function findScrollOwner(start: HTMLElement): HTMLElement | null {
  const doc = start.ownerDocument;
  for (
    let node = start.parentElement;
    node != null && node !== doc.body && node !== doc.documentElement;
    node = node.parentElement
  ) {
    const overflowY = getComputedStyle(node).overflowY;
    if (
      overflowY === 'auto' ||
      overflowY === 'scroll' ||
      overflowY === 'overlay'
    ) {
      return node;
    }
  }
  return null;
}

function scrollTopOf(owner: HTMLElement | null): number {
  return owner == null ? window.scrollY : owner.scrollTop;
}

function heightOf(owner: HTMLElement | null): number {
  return owner == null ? window.innerHeight : owner.clientHeight;
}

function scrollOwnerBy(owner: HTMLElement | null, delta: number): void {
  if (delta === 0) {
    return;
  }
  if (owner == null) {
    window.scrollTo({top: window.scrollY + delta, behavior: 'instant'});
  } else {
    owner.scrollTop += delta;
  }
}

/** A curve from `from` to `to` over `ms` on a cubic bézier. */
function bezierCurve(
  from: number,
  to: number,
  ms: number,
  points: readonly [number, number, number, number],
): MotionCurve {
  const ease = cubicBezier(points);
  const duration = ms / 1000;
  const at = (t: number) =>
    from + (to - from) * ease(Math.min(1, Math.max(0, t / duration)));
  return {duration, at, velocity: derivative(at, duration)};
}

function derivative(
  at: (t: number) => number,
  duration: number,
): (t: number) => number {
  const step = 1 / 1000;
  return t => {
    const a = Math.max(0, t - step);
    const b = Math.min(duration, t + step);
    return b > a ? (at(b) - at(a)) / (b - a) : 0;
  };
}

export function useRefreshControl({
  onRefresh,
  isRefreshing: isRefreshingProp,
  isDisabled = false,
}: UseRefreshControlOptions = {}): UseRefreshControlResult {
  const t = useTranslator();
  const announce = useAnnounce();
  const {isTouch} = useTouchPresentation();
  const content = useAnimator();
  const indicator = useAnimator();
  // The spinner turns on its own: the title beside it must not.
  const turn = useAnimator();
  const contentElement = useRef<HTMLElement | null>(null);
  const indicatorElement = useRef<HTMLElement | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const model = useRef<RefreshState>(INITIAL_REFRESH_STATE);
  const owner = useRef<HTMLElement | null>(null);
  const pull = useRef<{
    travel0: number;
    scrollTop0: number;
    dimension: number;
    floor: number;
    trigger: number;
    mode: PullMode;
  }>({
    travel0: 0,
    scrollTop0: 0,
    dimension: 1,
    floor: 0,
    trigger: triggerDistance(1),
    mode: 'reveal',
  });
  const refreshToken = useRef(0);
  const isControlled = isRefreshingProp !== undefined;
  const latest = useRef({onRefresh, isControlled, t, announce});
  useLayoutEffect(() => {
    latest.current = {onRefresh, isControlled, t, announce};
  });

  // -- Indicator ------------------------------------------------------------

  const setReveal = useCallback((value: number) => {
    indicatorElement.current?.style.setProperty(
      REFRESH_REVEAL_VAR,
      String(value),
    );
  }, []);

  /**
   * The pulled content gets its own compositor layer while it can move: a
   * finger at the top, a pull, a settle, a refresh. Promoting it only when an
   * animation starts would cost a raster of the whole content right then, and
   * the settle's first frames would not be presented.
   */
  const promote = useCallback(() => {
    const element = contentElement.current;
    if (element != null && element.style.willChange !== 'translate') {
      element.style.willChange = 'translate';
    }
  }, []);
  const demote = useCallback(() => {
    contentElement.current?.style.removeProperty('will-change');
  }, []);

  /**
   * No text selection while a finger pulls: iOS Safari otherwise reads a slow
   * pull over text as a press-and-drag selection (the content does not
   * scroll under it, so nothing claims the touch).
   */
  const selection = useRef<string | null>(null);
  const holdSelection = useCallback(() => {
    const element = contentElement.current;
    if (element == null || selection.current != null) {
      return;
    }
    selection.current = element.style.getPropertyValue('-webkit-user-select');
    element.style.setProperty('-webkit-user-select', 'none');
    element.style.setProperty('user-select', 'none');
  }, []);
  const releaseSelection = useCallback(() => {
    const element = contentElement.current;
    if (element == null || selection.current == null) {
      return;
    }
    if (selection.current === '') {
      element.style.removeProperty('-webkit-user-select');
      element.style.removeProperty('user-select');
    } else {
      element.style.setProperty('-webkit-user-select', selection.current);
      element.style.setProperty('user-select', selection.current);
    }
    selection.current = null;
  }, []);

  const resetIndicator = useCallback(() => {
    indicatorElement.current?.removeAttribute(REFRESH_SPINNING_ATTRIBUTE);
    setReveal(0);
    indicator.animator.set({opacity: 1});
    turn.animator.set({rotate: 0});
  }, [indicator.animator, setReveal, turn.animator]);

  const startSpinning = useCallback(
    (withTurn: boolean) => {
      setReveal(1);
      indicator.animator.set({opacity: 1});
      indicatorElement.current?.setAttribute(REFRESH_SPINNING_ATTRIBUTE, '');
      if (withTurn) {
        turn.animator.set({rotate: TRIGGER_TURN_DEGREES});
        turn.animator.animate(
          {rotate: 0},
          {spring: refreshControl.triggerTurnSpring, velocity: {rotate: 0}},
          {reducedMotion: 'keep'},
        );
      }
    },
    [indicator.animator, setReveal, turn.animator],
  );

  // -- Scroll owner and its top-edge policy ----------------------------------

  const edge = useRef<{
    element: HTMLElement | null;
    saved: string | null;
    releaseRoot: (() => void) | null;
  }>({element: null, saved: null, releaseRoot: null});

  const releaseEdge = useCallback(() => {
    const state = edge.current;
    if (state.element != null && state.saved != null) {
      state.element.style.overscrollBehaviorY = state.saved;
    }
    state.releaseRoot?.();
    edge.current = {element: null, saved: null, releaseRoot: null};
  }, []);

  const isPullEnabled = isTouch && !isDisabled && !isLocked;
  const isPullEnabledRef = useRef(isPullEnabled);
  isPullEnabledRef.current = isPullEnabled;

  /** Near the top, the browser draws no overscroll: the pull does. */
  const applyEdge = useCallback(() => {
    const current = owner.current;
    const near =
      isPullEnabledRef.current &&
      scrollTopOf(current) < Math.max(heightOf(current), REFRESH_HEIGHT);
    const state = edge.current;
    if (!near || state.element !== current) {
      releaseEdge();
    }
    if (!near) {
      return;
    }
    if (current == null) {
      if (edge.current.releaseRoot == null) {
        edge.current = {
          element: null,
          saved: null,
          releaseRoot: claimRootScrollStyle({overscrollBehaviorY: 'none'}),
        };
      }
      return;
    }
    if (current.style.overscrollBehaviorY !== 'none') {
      // First claim, or the owner's own render replaced the value.
      edge.current = {
        element: current,
        saved: current.style.overscrollBehaviorY,
        releaseRoot: null,
      };
      current.style.overscrollBehaviorY = 'none';
    }
  }, [releaseEdge]);

  const resolveOwner = useCallback((): HTMLElement | null => {
    const element = contentElement.current;
    if (element == null) {
      return owner.current;
    }
    const next = findScrollOwner(element);
    if (next !== owner.current) {
      releaseEdge();
      owner.current = next;
    }
    return next;
  }, [releaseEdge]);

  useEffect(() => {
    resolveOwner();
    applyEdge();
    const target: HTMLElement | Window = owner.current ?? window;
    const onScroll = () => applyEdge();
    const onResize = () => {
      resolveOwner();
      applyEdge();
    };
    target.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);
    return () => {
      target.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      releaseEdge();
    };
  }, [applyEdge, isPullEnabled, releaseEdge, resolveOwner]);

  useEffect(() => {
    setIsLocked(isScrollLockActive());
    return subscribeScrollLock(setIsLocked);
  }, []);

  // -- Effects of the state machine -----------------------------------------

  const dispatchRef = useRef<(event: RefreshEvent) => void>(() => {});

  const callHandler = useCallback(() => {
    const token = ++refreshToken.current;
    const result = latest.current.onRefresh?.();
    if (latest.current.isControlled) {
      return;
    }
    const settle = () => {
      if (token === refreshToken.current) {
        dispatchRef.current({type: 'end'});
      }
    };
    void Promise.resolve(result).then(settle, settle);
  }, []);

  const settle = useCallback(
    (to: 'inset' | 'top') => {
      const target = releaseTarget(to === 'inset');
      const from = content.animator.get('y');
      // No start time: from rest, the animator starts the settle when the
      // compositor does, so its first frame is the start of the curve.
      const handle = content.animator.animate(
        {y: target},
        {spring: scroll.bounce, velocity: {y: 0}},
        {reducedMotion: 'keep'},
      );
      if (to === 'top' && !model.current.isRefreshing && from > 0) {
        // The spokes retract with the content: started in the same task, the
        // two start on the same compositor frame.
        const curve = solveSpring(toSpring(scroll.bounce), {from, to: 0});
        const {dimension} = pull.current;
        const start = revealProgress(from, dimension) || 1;
        const duration = Math.max(0.016, curve.settleTime(0.05));
        const opacity = (time: number) =>
          revealProgress(curve.value(time), dimension) / start;
        indicator.animator
          .play(
            {
              opacity: {
                duration,
                at: opacity,
                velocity: derivative(opacity, duration),
              },
            },
            {reducedMotion: 'keep'},
          )
          .finished.then(done => {
            if (done && !model.current.isRefreshing) {
              resetIndicator();
            }
          });
      }
      if (to === 'top') {
        void handle.finished.then(done => {
          if (done && !model.current.isRefreshing && !model.current.isPulling) {
            demote();
          }
        });
      }
    },
    [content.animator, demote, indicator.animator, resetIndicator],
  );

  const end = useCallback(() => {
    if (model.current.isPulling) {
      // Under the finger: the release settles back to the top, and the
      // indicator retracts with it.
      pull.current.floor = 0;
      indicatorElement.current?.removeAttribute(REFRESH_SPINNING_ATTRIBUTE);
      return;
    }
    const current = resolveOwner();
    const {animateTo, scrollBy} = endMotion(scrollTopOf(current));
    if (animateTo == null) {
      content.animator.set({y: 0});
      scrollOwnerBy(current, scrollBy);
      resetIndicator();
      demote();
      return;
    }
    // The spinner stays opaque while the content slides up over its gap
    // (UIKit holds it at opacity 1 for nearly the whole end).
    const from = content.animator.get('y');
    content.animator
      .play(
        {
          y: bezierCurve(
            from,
            animateTo,
            refreshControl.endMs,
            timing.curves.easeInOut,
          ),
        },
        {reducedMotion: 'keep'},
      )
      .finished.then(done => {
        if (done) {
          content.animator.set({y: 0});
          scrollOwnerBy(current, scrollBy);
          if (!model.current.isRefreshing) {
            resetIndicator();
            demote();
          }
        }
      });
  }, [content.animator, demote, resetIndicator, resolveOwner]);

  const run = useCallback(
    (effect: RefreshEffect) => {
      const {t: translate, announce: say} = latest.current;
      switch (effect.type) {
        case 'trigger':
          setIsRefreshing(true);
          startSpinning(true);
          say(translate('@astryx.refreshControl.refreshing'));
          callHandler();
          break;
        case 'begin': {
          setIsRefreshing(true);
          startSpinning(false);
          say(translate('@astryx.refreshControl.refreshing'));
          if (!model.current.isPulling) {
            // The inset arrives with no visible motion, as beginRefreshing().
            promote();
            const current = resolveOwner();
            content.animator.set({y: REFRESH_HEIGHT});
            scrollOwnerBy(current, REFRESH_HEIGHT);
          }
          if (effect.callHandler) {
            callHandler();
          }
          break;
        }
        case 'settle':
          settle(effect.to);
          break;
        case 'end':
          setIsRefreshing(false);
          end();
          break;
      }
    },
    [
      callHandler,
      content.animator,
      end,
      promote,
      resolveOwner,
      settle,
      startSpinning,
    ],
  );

  const dispatch = useCallback(
    (event: RefreshEvent) => {
      const next = reduceRefresh(model.current, event);
      model.current = next.state;
      for (const effect of next.effects) {
        run(effect);
      }
    },
    [run],
  );
  dispatchRef.current = dispatch;

  // -- The pull -------------------------------------------------------------

  const recognizer = useGestureRecognizer(
    contentElement,
    () => new RefreshPullRecognizer(),
    pan => {
      const state = model.current;
      if (pan.state === 'began') {
        const current = resolveOwner();
        promote();
        holdSelection();
        const shown = content.animator.get('y');
        content.animator.stop(['y']);
        const dimension = heightOf(current);
        const mode: PullMode = state.isRefreshing ? 'band' : 'reveal';
        pull.current = {
          dimension,
          mode,
          trigger: triggerDistance(dimension),
          floor: state.isRefreshing ? REFRESH_HEIGHT : 0,
          travel0: pullTravel(shown, dimension, mode),
          scrollTop0: scrollTopOf(current),
        };
        dispatch({type: 'pullStart'});
      }
      if (pan.state === 'began' || pan.state === 'changed') {
        const geometry = pull.current;
        // A browser that scrolls the content back as the finger returns
        // (Chromium) takes over from the pull.
        const scrolledBack =
          scrollTopOf(owner.current) - geometry.scrollTop0 > 0.5;
        const travel = scrolledBack
          ? 0
          : geometry.travel0 + pan.translation().y;
        const overscroll = Math.max(
          geometry.floor,
          pullOverscroll(travel, geometry.dimension, geometry.mode),
        );
        const hadTriggered = model.current.hasTriggered;
        dispatch({type: 'pullMove', overscroll, trigger: geometry.trigger});
        if (!hadTriggered && model.current.hasTriggered) {
          // The frame after the trigger steps onto the finger (within the
          // one-to-one band).
          geometry.mode =
            geometry.mode === 'band' ? 'band' : modeAfterTrigger(travel);
        }
        content.animator.set({y: overscroll});
        if (!model.current.isRefreshing) {
          setReveal(revealProgress(overscroll, geometry.dimension));
        }
        return;
      }
      if (pan.state === 'ended' || pan.state === 'cancelled') {
        releaseSelection();
      }
      if (pan.state === 'ended') {
        dispatch({type: 'pullEnd'});
      } else if (pan.state === 'cancelled') {
        dispatch({type: 'pullCancel'});
      }
    },
    {isEnabled: isPullEnabled},
  );

  useEffect(() => {
    // A finger landing on a settle in flight stops it (UIScrollView brakes);
    // if no pull follows, the settle resumes.
    recognizer.onTouchDown = () => {
      const current = resolveOwner();
      applyEdge();
      content.animator.stop(['y']);
      if (scrollTopOf(current) <= 0 || content.animator.get('y') > 0) {
        promote();
      }
    };
    const stopListening = recognizer.addTransitionListener(current => {
      if (current.state !== 'failed' || model.current.isPulling) {
        return;
      }
      const target = releaseTarget(model.current.isRefreshing);
      if (Math.abs(content.animator.get('y') - target) > 0.05) {
        settle(model.current.isRefreshing ? 'inset' : 'top');
      } else if (target === 0) {
        // A tap or a scroll, not a pull.
        demote();
      }
    });
    return () => {
      recognizer.onTouchDown = null;
      stopListening();
    };
  }, [
    applyEdge,
    content.animator,
    demote,
    promote,
    recognizer,
    resolveOwner,
    settle,
  ]);

  // -- Programmatic control -------------------------------------------------

  useEffect(() => {
    if (isRefreshingProp === undefined) {
      return;
    }
    dispatch(
      isRefreshingProp ? {type: 'begin', source: 'program'} : {type: 'end'},
    );
  }, [dispatch, isRefreshingProp]);

  const refresh = useCallback(() => {
    dispatch({type: 'begin', source: 'user'});
  }, [dispatch]);

  useEffect(
    () => () => {
      refreshToken.current++;
    },
    [],
  );

  const contentRef = useCallback(
    (element: HTMLElement | null) => {
      contentElement.current = element;
      content.ref(element);
    },
    [content],
  );
  const indicatorRef = useCallback(
    (element: HTMLElement | null) => {
      indicatorElement.current = element;
      indicator.ref(element);
    },
    [indicator],
  );

  const spinnerRef = useCallback(
    (element: HTMLElement | null) => {
      turn.ref(element);
    },
    [turn],
  );

  return {contentRef, indicatorRef, spinnerRef, isRefreshing, refresh};
}
