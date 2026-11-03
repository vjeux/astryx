// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file NavigationStackTouch.ts
 * @input core's gesture recognizers (Core's internal touch entry), the UIKit
 *   table (its internal motion entry) and navigationTransition.ts for the
 *   release math
 * @output useBackSwipes: UIKit's two back swipes, from the leading screen
 *   edge and from anywhere in the content (iOS 26), driving a stack through
 *   BackSwipeStack
 * @position NavigationStack's back swipes, imported in one place
 *   (NavigationStack.tsx)
 *
 * The content swipe answers every pointer, a finger, a pen and a mouse drag
 * alike; the edge swipe takes a finger only, as the
 * screen-edge pan does by default. A swipe is tracked 1:1 and released by
 * UIKit's rule: it finishes when progress plus 0.35 s of the pan's release
 * velocity passes half, and a release moving back cancels.
 *
 * In a browser tab the screen's leading edge is the browser's own back
 * swipe (iOS Safari keeps it): the edge swipe only runs in a
 * home-screen web app (`navigator.standalone`), and the content swipe
 * ignores a finger that starts in that edge band. Server render and first
 * paint assume a tab.
 */

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from 'react';
import {
  PanGestureRecognizer,
  ScreenEdgePanGestureRecognizer,
  UIKIT_GESTURES,
  useGestureRecognizer,
} from '@astryxdesign/core/internal/touch';
import {navigation} from './navigationMotion';
import {
  popVelocity,
  progressFromTravel,
  shouldFinishPop,
} from './navigationTransition';

/** What a back swipe reads from the stack and drives in it. */
export interface BackSwipeStack {
  /** The cards' width in CSS px. */
  width(): number;
  /** The stack's writing direction. */
  direction(): 'ltr' | 'rtl';
  /** The screens a pop moves between, or null when there is nothing to pop. */
  screens(): {top: string; under: string} | null;
  /** Stops whatever moves and returns the progress to continue from. */
  grab(top: string, under: string): number;
  /** Puts both screens at a progress (0: the top at rest, 1: popped). */
  setProgress(progress: number, top: string, under: string): void;
  /** The progress the screens are at now. */
  progress(): number;
  /**
   * The finger lifted (or the swipe was cancelled): commit the pop, or
   * spring back, at the release velocity in widths per second.
   */
  release(top: string, under: string, finish: boolean, velocity: number): void;
}

/** Whether the page runs as a home-screen web app never changes while it runs. */
const subscribeToNothing = () => () => {};

/**
 * The content swipe claims a sideways drag at the pan's own threshold, while
 * the browser can still be told no (it stops asking once its own slop has
 * passed), but moves nothing until UIKit's 27 px: the travel in between is
 * a dead zone.
 */
const CONTENT_CLAIM_PX = UIKIT_GESTURES.pan.hysteresis.value;
const CONTENT_DEAD_ZONE_PX = Math.max(
  0,
  navigation.contentPopHysteresis - CONTENT_CLAIM_PX,
);

/** A web app opened from the home screen, where no browser back swipe exists. */
function isStandaloneWebApp(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & {standalone?: boolean}).standalone === true
  );
}

/**
 * Whether a touch starting at client x is in the leading screen-edge band of
 * a viewport `viewportWidth` wide.
 */
function startsInEdgeBand(
  x: number,
  direction: 'ltr' | 'rtl',
  viewportWidth: number,
): boolean {
  const band = UIKIT_GESTURES.screenEdgePan.edgeRegion.value;
  return direction === 'rtl' ? x >= viewportWidth - band : x <= band;
}

/**
 * The stack's back swipes: the edge swipe on `containerRef`, the content
 * swipe on `cardsRef`, both driving the stack `stackRef` holds (read at each
 * touch event, so it always sees the latest render). They run while
 * `isEnabled` (the stack can pop and allows interactive pops).
 */
export function useBackSwipes(
  containerRef: RefObject<HTMLElement | null>,
  cardsRef: RefObject<HTMLElement | null>,
  stackRef: RefObject<BackSwipeStack | null>,
  {isEnabled}: {isEnabled: boolean},
): void {
  const swipeRef = useRef<{
    start: number;
    top: string;
    under: string;
    /** The finger has passed the content swipe's dead zone. */
    isPastDeadZone: boolean;
  } | null>(null);

  const onSwipe = useCallback(
    (recognizer: PanGestureRecognizer, deadZone: number) => {
      const stack = stackRef.current;
      const screens = stack?.screens();
      if (stack == null || screens == null) {
        return;
      }
      const width = stack.width();
      const direction = stack.direction();
      switch (recognizer.state) {
        case 'began': {
          const start = stack.grab(screens.top, screens.under);
          swipeRef.current = {start, ...screens, isPastDeadZone: deadZone <= 0};
          stack.setProgress(start, screens.top, screens.under);
          break;
        }
        case 'changed': {
          const swipe = swipeRef.current;
          if (swipe == null) {
            return;
          }
          const along =
            (direction === 'rtl' ? -1 : 1) * recognizer.translation().x;
          if (along >= deadZone) {
            swipe.isPastDeadZone = true;
          }
          // In the dead zone the screen holds still. Once past it, back past
          // where it started, the screen follows with resistance
          // (progressFromTravel).
          const travel = swipe.isPastDeadZone ? along - deadZone : 0;
          stack.setProgress(
            progressFromTravel(
              swipe.start,
              (direction === 'rtl' ? -1 : 1) * travel,
              width,
              direction,
            ),
            swipe.top,
            swipe.under,
          );
          break;
        }
        case 'ended':
        case 'cancelled': {
          const swipe = swipeRef.current;
          swipeRef.current = null;
          if (swipe == null) {
            return;
          }
          const p = stack.progress();
          // The pan's own release velocity: Core's tracker reads 0 once the
          // finger has rested before the lift.
          const v =
            recognizer.state === 'ended'
              ? popVelocity(recognizer.velocity().x, width, direction)
              : 0;
          stack.release(
            swipe.top,
            swipe.under,
            recognizer.state === 'ended' && shouldFinishPop(p, v),
            v,
          );
          break;
        }
        default:
          break;
      }
    },
    [stackRef],
  );

  const browserOwnsEdge = useSyncExternalStore(
    subscribeToNothing,
    () => !isStandaloneWebApp(),
    () => true,
  );
  const browserOwnsEdgeRef = useRef(browserOwnsEdge);
  useLayoutEffect(() => {
    browserOwnsEdgeRef.current = browserOwnsEdge;
  });
  const edge = useGestureRecognizer(
    containerRef,
    () =>
      new ScreenEdgePanGestureRecognizer({
        edges: ['leading'],
        // Published, so app code can relate to it (gestureNamed).
        name: 'NavigationStack.backSwipe',
      }),
    recognizer => onSwipe(recognizer, 0),
    {isEnabled: isEnabled && !browserOwnsEdge},
  );
  // iOS 26's back swipe from anywhere in the content. It waits for the edge
  // swipe to fail, which a touch outside the edge band does at once.
  useGestureRecognizer(
    cardsRef,
    () => {
      const recognizer = new PanGestureRecognizer({
        name: 'NavigationStack.contentBackSwipe',
        direction: 'right',
        hysteresis: CONTENT_CLAIM_PX,
        maximumNumberOfTouches: 1,
        // A horizontal scroller under the finger that can still scroll
        // that way keeps the drag (UIKit's scroll views do).
        scrollEdge: true,
        shouldReceiveTouch: (_recognizer, touch) => {
          const direction = stackRef.current?.direction() ?? 'ltr';
          // It pops toward the trailing edge, read at each touch: the
          // writing direction can change while the stack is mounted.
          recognizer.direction = direction === 'rtl' ? 'left' : 'right';
          const view = containerRef.current?.ownerDocument.defaultView;
          return !(
            touch.pointerType === 'touch' &&
            browserOwnsEdgeRef.current &&
            startsInEdgeBand(touch.startX, direction, view?.innerWidth ?? 0)
          );
        },
      });
      return recognizer.requireToFail(edge);
    },
    recognizer => onSwipe(recognizer, CONTENT_DEAD_ZONE_PX),
    {isEnabled},
  );
}
