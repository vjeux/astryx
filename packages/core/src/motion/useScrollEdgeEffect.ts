// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useScrollEdgeEffect.ts
 * @input A bar's scroll container or the page, the bars springs, the colour
 *   tokens, the touch presentation and the finger-scroll reader
 * @output `useScrollEdgeEffect`: props for a bar's veil layer and for the
 *   sentinel that switches it, with the veil fading on the bars springs
 * @position Internal motion module for the iOS 26 bar over scrolling content,
 *   under a finger. AppShell's pinned header uses it. With a mouse it observes
 *   nothing, and the veil stays hidden.
 *
 * SYNC: When modified, update useScrollEdgeEffect.test.tsx and AppShell.
 */

import * as stylex from '@stylexjs/stylex';
import type {StyleXStyles} from '@stylexjs/stylex';
import {useCallback, useEffect, useRef, type RefObject} from 'react';
import {getGestureHost} from '../gestures/GestureHost';
import {useFingerScroll} from '../gestures/useFingerScroll';
import {colorVars} from '../theme/tokens.stylex';
import type {SpringDescription} from './spring';
import {useAnimator} from './useAnimator';
import {useTouchPresentation} from '../utils/touchPresentation';

/** No scroller: nothing is watched (a mouse, or the effect is off). */
const NO_SCROLLER: RefObject<Element | null> = {current: null};

/**
 * The private custom property the layer's `will-change` reads: `opacity`
 * while a finger works the scroller, unset otherwise. Only this hook sets it
 * inline; it is not theme data.
 */
export const SCROLL_EDGE_LAYER_PROMOTION = '--_scroll-edge-will-change';

const PASSIVE_CAPTURE = {capture: true, passive: true} as const;

/**
 * Where the browser sends no `scrollend`, the delay in ms before the layer's
 * promotion is checked again after the last scroll event. It is past the
 * finger-scroll watch's 150 ms limit, so a fling never leaves the layer
 * promoted.
 */
const PROMOTION_RECHECK_MS = 200;

const styles = stylex.create({
  // The veil is one colour over the content, never a blur. It reaches
  // `bars.scrollEdgeEffect.softExtentPt` (54.8px) past the bar's bottom, and
  // the mask's stops are measured from the layer's bottom.
  layer: {
    display: {
      default: 'none',
      '@media (pointer: coarse)': 'block',
    },
    position: 'absolute',
    insetInline: 0,
    insetBlockStart: 0,
    pointerEvents: 'none',
    opacity: 0,
    // Composited only while a finger works the scroller; the hook sets the
    // private property (see the promotion code below).
    willChange: 'var(--_scroll-edge-will-change, auto)',
    // The mask is 0.95 × (1 − Φ((y − edge) / softness)), sampled every 6px;
    // the test recomputes it. It is denser than UIKit's, so a bar's title
    // keeps 4.5:1 contrast over the brightest content. Reduce Transparency
    // makes the veil an opaque band with a hard edge at the bar's bottom.
    maskImage: {
      default:
        'linear-gradient(to bottom, rgb(0 0 0 / 0.950) calc(100% - 118.8px), rgb(0 0 0 / 0.949) calc(100% - 112.8px), rgb(0 0 0 / 0.948) calc(100% - 106.8px), rgb(0 0 0 / 0.945) calc(100% - 100.8px), rgb(0 0 0 / 0.938) calc(100% - 94.8px), rgb(0 0 0 / 0.922) calc(100% - 88.8px), rgb(0 0 0 / 0.893) calc(100% - 82.8px), rgb(0 0 0 / 0.845) calc(100% - 76.8px), rgb(0 0 0 / 0.772) calc(100% - 70.8px), rgb(0 0 0 / 0.675) calc(100% - 64.8px), rgb(0 0 0 / 0.559) calc(100% - 58.8px), rgb(0 0 0 / 0.433) calc(100% - 52.8px), rgb(0 0 0 / 0.312) calc(100% - 46.8px), rgb(0 0 0 / 0.207) calc(100% - 40.8px), rgb(0 0 0 / 0.127) calc(100% - 34.8px), rgb(0 0 0 / 0.071) calc(100% - 28.8px), rgb(0 0 0 / 0.036) calc(100% - 22.8px), rgb(0 0 0 / 0.017) calc(100% - 16.8px), rgb(0 0 0 / 0.007) calc(100% - 10.8px))',
      '@media (prefers-reduced-transparency: reduce)': 'none',
    },
  },
  // `bars.scrollEdgeEffect.switchPt` (10px) tall at the top of the scrolled
  // content.
  sentinel: {
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineStart: 0,
    width: 1,
    height: 10,
    pointerEvents: 'none',
    visibility: 'hidden',
  },
});

const dynamicStyles = stylex.create({
  // The layer ends 54.8px below the veil's edge (the soft extent); Reduce
  // Transparency ends the opaque band at the edge, the bar's bottom.
  geometry: (height: string, reducedHeight: string, color: string) => ({
    height: {
      default: height,
      '@media (prefers-reduced-transparency: reduce)': reducedHeight,
    },
    backgroundColor: color,
  }),
});

export interface UseScrollEdgeEffectOptions {
  /**
   * Whether the effect runs. When false, and always with a mouse, the veil
   * stays transparent and nothing is observed.
   * @default true
   */
  readonly enabled?: boolean;
  /**
   * The scroll container whose content passes under the bar. Omit for a
   * page that scrolls (the viewport).
   */
  readonly root?: RefObject<Element | null>;
  /**
   * How far, in px, a bar overlays the top of `root` from its padding edge:
   * `44` under a 44px bar, so the content counts as under the bar once it
   * has passed the bar's bottom edge. The same in every engine, whatever
   * top padding `root` has.
   * @default 0
   */
  readonly rootInset?: number;
  /**
   * The bar's bottom edge, where the veil is half strength, from the top of
   * the layer's containing block, as a CSS length without `calc()`: `100%`
   * inside the bar itself, `44px` under a 44px bar that overlays the screen.
   */
  readonly edge: string;
  /**
   * The veil's colour: the colour behind the bar's content.
   * @default the body background
   */
  readonly color?: string;
  /** Extra styles for the layer, e.g. its stacking order. */
  readonly layerXstyle?: StyleXStyles;
  /**
   * Extra styles for the sentinel. `insetBlockStart: 'auto'` and
   * `insetInlineStart: 'auto'` leave it at its static position, the top of
   * the content it starts, with no positioned wrapper.
   */
  readonly sentinelXstyle?: StyleXStyles;
  /**
   * The fades' springs: a bar's are `bars.scrollEdgeEffect.appear` and
   * `.disappear`, measured constants of its component's table. The component that
   * animates with a table imports it (motion/uikit/tableImports.test.ts), so
   * the springs and their registration come from it.
   */
  readonly springs: {
    readonly appear: SpringDescription;
    readonly disappear: SpringDescription;
  };
  /** Registers the springs' table; called before the first fade. */
  readonly registerSprings: () => void;
}

/** Props to spread on an element, ref included. */
interface ElementProps {
  readonly ref: (element: HTMLElement | null) => void;
  readonly 'aria-hidden': true;
  readonly className?: string;
  readonly style?: Readonly<Record<string, string | number>>;
}

export interface UseScrollEdgeEffectResult {
  /**
   * The veil. Spread it on an empty element at the top of the bar's
   * containing block: the bar itself, or the screen under it. It sits above
   * the content and below the bar's items.
   */
  readonly layerProps: ElementProps;
  /**
   * The sentinel. Spread it on an empty element at the top of the scrolled
   * content. It sits at the top of its containing block, or at its static
   * position when `sentinelXstyle` sets its insets to `auto`. The scroll
   * container must be its containing block, so that it scrolls with the
   * content.
   */
  readonly sentinelProps: ElementProps;
}

/**
 * The iOS 26 scroll edge effect of a bar, under a finger. A veil fades in once
 * the content has moved more than 10 pt under the bar. It fades out when the
 * content comes back.
 *
 * @example
 * ```
 * const edge = useScrollEdgeEffect({
 *   root: scrollerRef,
 *   rootInset: 44,
 *   edge: '44px',
 *   springs: bars.scrollEdgeEffect,
 *   registerSprings: registerBarsTable,
 * });
 * <div {...edge.layerProps} />
 * <div ref={scrollerRef}><div><div {...edge.sentinelProps} /></div>…</div>
 * ```
 */
export function useScrollEdgeEffect({
  enabled = true,
  root,
  rootInset = 0,
  edge,
  color = colorVars['--color-background-body'],
  layerXstyle,
  sentinelXstyle,
  springs,
  registerSprings,
}: UseScrollEdgeEffectOptions): UseScrollEdgeEffectResult {
  // Under a finger: the resolver's touch presentation, the same on every
  // touch device.
  const {isTouch} = useTouchPresentation();
  const isOn = enabled && isTouch;
  const {ref: layerRef, animator} = useAnimator({initial: {opacity: 0}});
  // Whether the scroll now moving is a finger's, from the shared gesture host.
  // The page's own scroll is the document's; a container scrolls itself. It
  // is watched only while the effect runs, so a mouse costs nothing.
  const isFingerScroll = useFingerScroll(
    !isOn
      ? NO_SCROLLER
      : (root ?? (typeof document === 'undefined' ? NO_SCROLLER : document)),
  );
  // A callback ref owns the sentinel, never React state. It keeps the node
  // and moves the running observer to a replacement node. The effect creates
  // the observer once the refs are attached.
  const sentinelElementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback((element: HTMLElement | null) => {
    const observer = observerRef.current;
    if (observer != null && sentinelElementRef.current != null) {
      observer.unobserve(sentinelElementRef.current);
    }
    sentinelElementRef.current = element;
    if (observer != null && element != null) {
      observer.observe(element);
    }
  }, []);

  useEffect(() => {
    if (!isOn || typeof IntersectionObserver === 'undefined') {
      return;
    }
    // The springs' table registers before the first animation.
    registerSprings();
    const sentinel = sentinelElementRef.current;
    const doc = sentinel?.ownerDocument ?? document;
    const container = root?.current ?? null;
    let isShown: boolean | null = null;
    // The scroll offset is never read per frame: the observer reports when the
    // sentinel leaves its root. Chromium starts a container's root at its
    // padding box and WebKit at its content box. This is how far below the
    // padding edge this engine starts it; a page has no padding edge.
    let rootOffset: number | null = container == null ? 0 : null;
    let observer: IntersectionObserver;
    const report = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[entries.length - 1];
      if (entry == null) {
        return;
      }
      if (rootOffset == null && container != null) {
        const bounds = entry.rootBounds;
        const paddingEdge =
          container.getBoundingClientRect().top + container.clientTop;
        const offset =
          bounds == null ? 0 : Math.round(bounds.top - rootInset - paddingEdge);
        rootOffset = offset;
        if (offset !== 0) {
          // WebKit measured this report from the content box. Observe again
          // from the padding edge, so every engine switches at one offset.
          observer.disconnect();
          observe();
          return;
        }
      }
      // A box whose edge only touches the root still intersects, so 10 pt is
      // off and 10.25 pt is on. Overscroll moves the box down: the effect
      // stays off.
      const next = !entry.isIntersecting;
      if (next === isShown) {
        return;
      }
      if (isShown != null && isFingerScroll()) {
        animator.animate(
          {opacity: next ? 1 : 0},
          {spring: next ? springs.appear : springs.disappear},
          // Under Reduce Motion, the animator plays its own opacity
          // cross-fade.
        );
      } else {
        // The first report shows a page that loads scrolled at once. A scroll
        // the program drives also switches at once, with no compositing layer.
        // On iOS 26.2, a composited layer under a sticky header makes WebKit
        // drop the header's items for two frames as the program scrolls up. Remove this workaround when WebKit stops doing
        // that.
        animator.set({opacity: next ? 1 : 0}, {promote: false});
      }
      isShown = next;
    };
    const observe = () => {
      observer = new IntersectionObserver(report, {
        // The sentinel's own document, not the implicit root: inside a frame,
        // the implicit root is the top-level viewport.
        root: container ?? doc,
        rootMargin: `${(rootOffset ?? 0) - rootInset}px 0px 0px 0px`,
        threshold: 0,
      });
      observerRef.current = observer;
      const current = sentinelElementRef.current;
      if (current != null) {
        observer.observe(current);
      }
    };
    observe();
    // The layer is composited only while a finger works the scroller: from
    // its landing until its scroll, momentum included, ends. A fade that
    // starts mid-drag then finds its layer ready.
    const scroller: Node = container ?? doc;
    const host = getGestureHost(doc);
    const releaseHost = host.retain();
    let isPromoted = false;
    const updatePromotion = () => {
      const layer = animator.element;
      const next = host.isFingerDownIn(scroller) || isFingerScroll();
      if (layer == null || next === isPromoted) {
        return;
      }
      isPromoted = next;
      if (next) {
        layer.style.setProperty(SCROLL_EDGE_LAYER_PROMOTION, 'opacity');
      } else {
        layer.style.removeProperty(SCROLL_EDGE_LAYER_PROMOTION);
      }
    };
    const unsubscribeFingers = host.onFingersChange(updatePromotion);
    // One document listener per effect. Its `scrollend` drops the layer once
    // the finger's scroll has ended, after the finger-scroll watch hears the
    // same event. Without `scrollend`, scroll events time a re-check instead.
    const view = doc.defaultView;
    const hasScrollEnd = view != null && 'onscrollend' in view;
    let recheck: ReturnType<typeof setTimeout> | null = null;
    const clearRecheck = () => {
      if (recheck != null) {
        clearTimeout(recheck);
        recheck = null;
      }
    };
    const scrollType = hasScrollEnd ? 'scrollend' : 'scroll';
    const onScrollEvent = hasScrollEnd
      ? () => queueMicrotask(updatePromotion)
      : (event: Event) => {
          const target = event.target === doc ? doc : event.target;
          if (target !== scroller) {
            return;
          }
          clearRecheck();
          recheck = setTimeout(() => {
            recheck = null;
            updatePromotion();
          }, PROMOTION_RECHECK_MS);
        };
    doc.addEventListener(scrollType, onScrollEvent, PASSIVE_CAPTURE);
    return () => {
      observerRef.current = null;
      observer.disconnect();
      unsubscribeFingers();
      doc.removeEventListener(scrollType, onScrollEvent, PASSIVE_CAPTURE);
      clearRecheck();
      releaseHost();
      animator.element?.style.removeProperty(SCROLL_EDGE_LAYER_PROMOTION);
      animator.set({opacity: 0}, {promote: false});
    };
  }, [
    isOn,
    root,
    rootInset,
    animator,
    isFingerScroll,
    springs,
    registerSprings,
  ]);

  return {
    layerProps: {
      ref: layerRef,
      'aria-hidden': true,
      ...stylex.props(
        styles.layer,
        dynamicStyles.geometry(`calc(${edge} + 54.8px)`, edge, color),
        layerXstyle,
      ),
    },
    sentinelProps: {
      ref: sentinelRef,
      'aria-hidden': true,
      ...stylex.props(styles.sentinel, sentinelXstyle),
    },
  };
}
