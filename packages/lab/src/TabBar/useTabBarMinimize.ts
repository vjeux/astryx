// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useTabBarMinimize.ts
 * @input The capsule and whether minimizing applies. Core's motion engine, pan
 *   recognizer and finger-scroll reader (internal/touch) and uikitTabBar.ts.
 * @output useTabBarMinimize: whether the bar is minimized (UIKit's
 *   `.onScrollDown`) and a way to expand it. It also returns the refs TabBar
 *   puts on the platter, the items, the badges and the circle.
 * @position Part of TabBar's touch layer (TabBarTouch.ts)
 *
 * SYNC: When modified, update TabBar.tsx, useTabBarLens.ts and
 * __tests__/TabBar.interaction.browser.spec.ts.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import {
  isRtlElement,
  PanGestureRecognizer,
  useFingerScroll,
  useGestureRecognizer,
} from '@astryxdesign/core/internal/touch';
import {observeResize} from '@astryxdesign/core/utils';
import {useMotionEngine} from '../internal/useMotionEngine';
import {tabBar} from './uikitTabBar';

export interface UseTabBarMinimizeOptions {
  readonly capsuleRef: RefObject<HTMLDivElement | null>;
  /** `minimizeBehavior="onScrollDown"` under a finger. */
  readonly isEnabled: boolean;
}

export interface TabBarMinimize {
  /** Minimized by the page's scrolling. */
  readonly isMinimized: boolean;
  /** Expands a minimized bar: the circle activated, by a tap or the keys. */
  readonly expand: () => void;
  /** The capsule: its document is the page whose scrolling minimizes the bar. */
  readonly capsule: (element: HTMLElement | null) => void;
  /** The platter: shrinks to the circle about the leading cap's centre. */
  readonly platter: (element: HTMLElement | null) => void;
  /** The platter's middle: narrows to nothing. */
  readonly platterMiddle: (element: HTMLElement | null) => void;
  /** The platter's trailing cap: slides onto the leading one. */
  readonly platterEnd: (element: HTMLElement | null) => void;
  /** The items' layer (every tab button): fades as one. */
  readonly items: (element: HTMLElement | null) => void;
  /** The badges: fade with the items. */
  readonly badges: (element: HTMLElement | null) => void;
  /** The minimized circle's icon: fades in. */
  readonly circleIcon: (element: HTMLElement | null) => void;
}

/** No scroller to watch: the server, or minimizing is off. */
const NO_SCROLLER: RefObject<Element | null> = {current: null};

/**
 * Follows the person's scrolling of the page: minimizes after
 * `minimizeDistance` down, expands at the top. The person's scrolling starts as
 * a vertical pan on the page that never claims its touch (`claimsTouches:
 * false`). The gesture host gives it only passive listeners, so the page
 * scrolls exactly as it would without it. From the pan's start until the
 * person's scroll ends, and only then, a passive scroll listener follows the
 * offset. The gesture host's finger-scroll reader says when the scroll ends,
 * and it counts the coast after the lift as the person's.
 */
function useScrollMinimize(isEnabled: boolean) {
  const [isMinimized, setIsMinimized] = useState(false);
  // The bar's own document, which an iframe or another window can hold, and
  // its root for the pan below. The capsule's ref fills both.
  const docRef = useRef<Document | null>(null);
  const rootRef = useRef<Element | null>(null);
  // The same document as state, for the finger-scroll reader below.
  const [doc, setDoc] = useState<Document | null>(null);
  // The downward run, across the person's scrolls: where it started and
  // where the page was last seen.
  const runRef = useRef<ScrollRun>({lastY: Number.NaN, downFrom: null});
  const capsule = useCallback((element: HTMLElement | null) => {
    const doc = element?.ownerDocument ?? null;
    if (doc === docRef.current) {
      return;
    }
    docRef.current = doc;
    rootRef.current = doc?.documentElement ?? null;
    setDoc(doc);
    // A bar now in another document starts its run where that page is.
    runRef.current = {
      lastY: doc?.defaultView?.scrollY ?? Number.NaN,
      downFrom: null,
    };
  }, []);
  // Whose scroll the page's is, from the gesture host: watched only while
  // minimizing is on.
  const isFingerScroll = useFingerScroll(
    isEnabled && doc != null ? doc : NO_SCROLLER,
  );
  const watchRef = useRef<{lift: () => void; stop: () => void} | null>(null);
  useGestureRecognizer(
    rootRef,
    () =>
      new PanGestureRecognizer({
        name: 'tab-bar-page-scroll',
        direction: 'vertical',
        claimsTouches: false,
        allowedPointerTypes: ['touch'],
      }),
    pan => {
      const view = docRef.current?.defaultView;
      if (pan.state === 'began' && view != null) {
        watchRef.current?.stop();
        watchRef.current = watchScroll(
          view,
          runRef.current,
          // The finger's travel since it landed (up scrolls the page down).
          -pan.totalTranslation().y,
          setIsMinimized,
          isFingerScroll,
          () => {
            watchRef.current = null;
          },
        );
      } else if (pan.state === 'ended' || pan.state === 'cancelled') {
        watchRef.current?.lift();
      }
    },
    {isEnabled},
  );
  // Minimizing turned off: the bar is expanded again, read during render,
  // so a later turn on starts expanded.
  const [wasEnabled, setWasEnabled] = useState(isEnabled);
  if (wasEnabled !== isEnabled) {
    setWasEnabled(isEnabled);
    if (!isEnabled) {
      setIsMinimized(false);
    }
  }
  // Synchronizes the scroll watch with minimizing being on. Turning it off
  // stops a running watch.
  useEffect(() => {
    const view = docRef.current?.defaultView;
    if (!isEnabled || view == null) {
      return;
    }
    // The run starts where the page is when the watching starts.
    runRef.current = {lastY: view.scrollY, downFrom: null};
    return () => watchRef.current?.stop();
  }, [isEnabled]);
  // Expanding starts the downward run over, in place, since a watch running now
  // holds the same run. So an expanded bar takes another `minimizeDistance`
  // down before it minimizes again.
  const expand = useCallback(() => {
    runRef.current.lastY = docRef.current?.defaultView?.scrollY ?? Number.NaN;
    runRef.current.downFrom = null;
    setIsMinimized(false);
  }, []);
  return {isMinimized: isEnabled && isMinimized, expand, capsule};
}

interface ScrollRun {
  lastY: number;
  /** Where the current downward run started. */
  downFrom: number | null;
}

/**
 * Follows one scroll of the page by the person, from the finger's pan to the
 * page's rest. Call its `lift` when the finger lifts. The listeners go at the
 * `scrollend` that follows, or at once if the scroll has already ended
 * (`isFingerScroll`, the gesture host's reader). Where the browser sends no
 * `scrollend`, they go when the reader says the person's scroll ended.
 */
function watchScroll(
  view: Window,
  run: ScrollRun,
  fingerTravel: number,
  setIsMinimized: (isMinimized: boolean) => void,
  isFingerScroll: () => boolean,
  onStop: () => void,
) {
  const moved = view.scrollY - run.lastY;
  // Since the person last scrolled, the page moved on its own (a script, the
  // keys), unless this finger's travel since it landed covers the move. The
  // browser may start scrolling before the pan begins. On its own, the downward
  // run starts over.
  const isThisFinger =
    Math.sign(moved) === Math.sign(fingerTravel) &&
    Math.abs(moved) <= Math.abs(fingerTravel);
  if (!Number.isFinite(moved) || (moved !== 0 && !isThisFinger)) {
    run.lastY = view.scrollY;
    run.downFrom = null;
  }
  let isLifted = false;
  const onScroll = () => {
    const y = view.scrollY;
    if (y > run.lastY) {
      run.downFrom ??= run.lastY;
      if (y - run.downFrom >= tabBar.minimizeDistance) {
        setIsMinimized(true);
      }
    } else if (y < run.lastY) {
      run.downFrom = null;
      if (y <= 0) {
        setIsMinimized(false);
      }
    }
    run.lastY = y;
  };
  const onScrollEnd = () => {
    if (isLifted) {
      finish();
    }
  };
  // Where the browser sends no `scrollend`, the person's scroll ends when the
  // gesture host's reader says so. The reader has its own fallback after the
  // last scroll event, and this reads it once a frame from the lift.
  let frame = 0;
  const waitForReader = () => {
    frame = view.requestAnimationFrame(() => {
      if (isFingerScroll()) {
        waitForReader();
      } else {
        finish();
      }
    });
  };
  const stop = () => {
    view.cancelAnimationFrame(frame);
    view.removeEventListener('scroll', onScroll);
    view.removeEventListener('scrollend', onScrollEnd);
    onStop();
  };
  // Where the page is when the person's scroll ends is theirs. The browser
  // sends at most one scroll event a frame, so the last moves may not have
  // arrived yet.
  const finish = () => {
    onScroll();
  };
  view.addEventListener('scroll', onScroll, {passive: true});
  view.addEventListener('scrollend', onScrollEnd, {passive: true});
  return {
    lift: () => {
      isLifted = true;
      if (!isFingerScroll()) {
        finish();
      } else if (!('onscrollend' in view)) {
        waitForReader();
      }
    },
    stop,
  };
}

/**
 * WHEN (uikitTabBar.ts, measured on iOS 26.2)
 *
 * The bar minimizes once the person has scrolled the page down
 * `minimizeDistance` from where the downward scroll started. Scrolling back up
 * does not expand it; reaching the top does, and so does a tap on the circle
 * (`expand`). Only the person's scrolling counts: a finger's drag and the coast
 * after it. The gesture host reads it as a pan on the page that never claims
 * its touch. So a script scrolling the page to the top leaves the bar
 * minimized, as on iOS.
 *
 * HOW IT MORPHS
 *
 * The capsule's glass is drawn in three pieces: a leading cap, a middle and a
 * trailing cap. Collapsing, the middle narrows to nothing from its leading side
 * while the trailing cap slides onto the leading one. So the outline stays a
 * capsule all the way to a circle, and the whole platter shrinks to
 * `minimizedSize` about the leading cap's centre (`collapseSize`). The items
 * and their badges fade out (`minimizeFade`) and the selected icon fades in at
 * the circle's centre; useTabBarLens.ts carries the lens into the circle.
 * Expanding plays the same motion back. Every animation runs on the
 * compositor, transforms and opacity only.
 *
 * The collapse runs on UIKit's springs, under a finger only: the bar minimizes
 * only there.
 */
export function useTabBarMinimize({
  capsuleRef,
  isEnabled,
}: UseTabBarMinimizeOptions): TabBarMinimize {
  const {isMinimized, expand, capsule} = useScrollMinimize(isEnabled);
  const platter = useMotionEngine();
  const platterMiddle = useMotionEngine();
  const platterEnd = useMotionEngine();
  const badges = useMotionEngine();
  const circleIcon = useMotionEngine({initial: {opacity: 0}});
  const items = useMotionEngine();

  const previousRef = useRef(isMinimized);
  // Synchronizes the morph's compositor animations (the platter, the items,
  // the badges and the circle's icon) with the minimized state.
  useLayoutEffect(() => {
    const was = previousRef.current;
    previousRef.current = isMinimized;
    const element = capsuleRef.current;
    if (was === isMinimized || element == null) {
      return;
    }
    const isRtl = isRtlElement(element);
    // The trailing cap's travel onto the leading one.
    const travel = element.offsetWidth - tabBar.barHeight;
    // From rest every curve starts when the browser commits the frame, with the
    // lens's (useTabBarLens.ts). So a busy main thread delays the morph instead
    // of skipping into it. A morph already on screen continues.
    const now = performance.now();
    const options =
      platterMiddle.animator.getVelocity('scaleX', now) !== 0 ? {at: now} : {};
    const size = {spring: tabBar.collapseSize};
    const fade = {spring: tabBar.minimizeFade};
    platterMiddle.animator.animate(
      {scaleX: isMinimized ? 0 : 1},
      size,
      options,
    );
    platterEnd.animator.animate(
      {x: isMinimized ? (isRtl ? travel : -travel) : 0},
      size,
      options,
    );
    platter.animator.animate(
      {scale: isMinimized ? tabBar.minimizedSize / tabBar.barHeight : 1},
      size,
      options,
    );
    // The tabs fade as one layer: one animation, not one per tab.
    items.animator.animate({opacity: isMinimized ? 0 : 1}, fade, options);
    badges.animator.animate({opacity: isMinimized ? 0 : 1}, fade, options);
    circleIcon.animator.animate(
      {opacity: isMinimized ? 1 : 0},
      isMinimized ? size : fade,
      options,
    );
  }, [
    isMinimized,
    capsuleRef,
    platter,
    platterMiddle,
    platterEnd,
    badges,
    circleIcon,
    items,
  ]);

  // Minimized, the bar's width can still change (a rotation, a split view):
  // the trailing cap stays closed on the circle.
  useEffect(() => {
    const element = capsuleRef.current;
    if (!isMinimized || element == null) {
      return;
    }
    let width = element.offsetWidth;
    // Core's shared observer. Its first call, at once, finds the same width.
    return observeResize(element, () => {
      const next = element.offsetWidth;
      if (next === width) {
        return;
      }
      width = next;
      const travel = next - tabBar.barHeight;
      const isRtl = isRtlElement(element);
      platterEnd.animator.set({x: isRtl ? travel : -travel});
    });
  }, [isMinimized, capsuleRef, platterEnd]);

  return {
    isMinimized,
    expand,
    capsule,
    platter: platter.ref,
    platterMiddle: platterMiddle.ref,
    platterEnd: platterEnd.ref,
    items: items.ref,
    badges: badges.ref,
    circleIcon: circleIcon.ref,
  };
}
