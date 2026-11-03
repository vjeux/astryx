// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useTabBarLens.ts
 * @input The capsule, the item count, the selected index, the presentation,
 *   and the lift's handler. Core's motion engine and action-group tracking
 *   (internal/touch), uikitTabBar.ts and tabBarModel.ts.
 * @output useTabBarLens: the selection lens's motion and press tracking, and
 *   the refs TabBar puts on the capsule and the lens's layers
 * @position Part of TabBar's touch layer (TabBarTouch.ts)
 *
 * SYNC: When modified, update TabBar.tsx, tabBarModel.ts and
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
import {flushSync} from 'react-dom';
import {
  createMotionEngine,
  isRtlElement,
  type MotionCurve,
  type MotionEngine,
  UIKIT_GESTURES,
  useActionGroupTracking,
} from '@astryxdesign/core/internal/touch';
import {
  copyTransform,
  itemCenters,
  itemWidth,
  lensTarget,
  liftScale,
  nearestIndex,
} from './tabBarModel';
import {useMotionEngine} from '../internal/useMotionEngine';
import {tabBar} from './uikitTabBar';

/** A finger that has moved this far from where it landed is dragging. */
const DRAG_SLOP = UIKIT_GESTURES.longPress.allowableMovement.value;

/** How long the selected copy's curves run: past any lens spring's settle. */
const COPY_HORIZON_S = 1.5;

/** Seconds between the samples a derived curve's velocity is read from. */
const VELOCITY_STEP_S = 0.001;

interface Press {
  /** The items' centres in the capsule, physical px, before the flex. */
  readonly centers: number[];
  /** The items' (and the resting lens's) width, px. */
  readonly size: number;
  /** The capsule's left edge in client px, before the flex. */
  readonly left: number;
  readonly startX: number;
  lastX: number;
  isDragging: boolean;
  /** A tab was selected when the finger landed: the lens follows it. */
  hasLens: boolean;
  /** A fine pointer's press: a drag moves the lens body, with no lift. */
  readonly isFine: boolean;
  /** The capsule's box in client px, before the flex. */
  readonly box: {left: number; right: number; top: number; bottom: number};
  readonly count: number;
}

export interface UseTabBarLensOptions {
  readonly capsuleRef: RefObject<HTMLDivElement | null>;
  readonly count: number;
  readonly selectedIndex: number;
  /**
   * The touch presentation (a coarse primary pointer): a finger lifts the
   * lens on springs. Otherwise a press drags it in the mouse presentation.
   */
  readonly isTouch: boolean;
  /** A press released over the item at `index`: a lift, or a drag's release. */
  readonly onLift: (index: number) => void;
}

export interface TabBarLensRefs {
  /** The lens's resting place: TabBar's CSS slides it after a click. */
  readonly lens: (element: HTMLElement | null) => void;
  /** The capsule. Its scale is the press flex. */
  readonly capsule: (element: HTMLElement | null) => void;
  /**
   * The lens body: its offset and lift, and its `::before`, the lifted lens's
   * shadow (outside the clip).
   */
  readonly body: (element: HTMLElement | null) => void;
  /** The lens's clip: its `::before` is the lifted lens's glass. */
  readonly clip: (element: HTMLElement | null) => void;
  /** The selected copy of the items. */
  readonly copy: (element: HTMLElement | null) => void;
  /** One copied item, by index: the magnification. */
  readonly copyItem: (index: number) => (element: HTMLElement | null) => void;
  /**
   * The copy is drawn: the lens is lifted, or moving under a finger. At rest
   * the selected tab draws its own look and the copy is not mounted.
   */
  readonly isCopyShown: boolean;
}

/** One animator per copied item, stable across renders. */
function useAnimatorList(count: number) {
  const listRef = useRef<{
    animators: MotionEngine[];
    refs: Array<(element: HTMLElement | null) => void>;
  }>({animators: [], refs: []});
  const list = listRef.current;
  while (list.animators.length < count) {
    const animator = createMotionEngine(null);
    list.animators.push(animator);
    list.refs.push(element => animator.attach(element));
  }
  return list;
}

/**
 * WHAT MOVES (uikitTabBar.ts, all measured on iOS 26.2)
 *
 * The lens is a CSS resting place over the selected item (TabBar.tsx) with a
 * body inside it that this hook moves. `x` is its offset from the resting
 * place, `scaleX` / `scaleY` its lift, and its `::before` the shadow that fades
 * in as it lifts. Inside the body, a clip holds the selected copy of the items
 * while the lens moves. The clip's background is the opaque fill, and its
 * `::before` is the glass that fades in as the lens lifts. The copy is
 * counter-transformed so the items stay put while the lens moves over them. Its
 * curves derive from the body's (tabBarModel's `copyTransform`). Each copied
 * item grows by the lift's magnification about its own centre. The copy mounts
 * when a finger lands or a slide starts and goes once everything rests. At rest
 * the selected tab draws its own look (TabBar.tsx).
 *
 * Under a finger, iOS and Android alike (a long press with no delay, so it
 * begins on the touch, as UIKit's selection tracker does):
 * - landing: the lens travels toward the finger (`lensTravel`) and lifts
 *   (`lift`: outset, glass, magnification), and the capsule flexes
 *   (`flexPress`);
 * - dragging (past the long press's allowable movement): the lens chases the
 *   finger (`lensTrack`), rubber-banded past the first and last items;
 * - lifting: the item nearest the finger is chosen, the lens settles onto it
 *   (`lensSettle`), the lift and the flex relax (`lift`, `flexRelease`). A
 *   cancelled touch settles back onto the selected item.
 * - off the bar: the lens shows the selected item again, and a lift there
 *   chooses nothing. Sliding off cancels, under every pointer.
 * The choice reaches the app (`onLift`) from the lift itself, right after the
 * settle has started in the same task. The settle's first frame waits for the
 * browser's commit, so the app rendering the new tab delays its start rather
 * than freezing it midway. The report renders synchronously, and if the app
 * keeps the old selection the lens settles back onto it. The finger is read in
 * the capsule's own coordinates, before its flex scale, as UIKit reads it.
 * Under the flex the lens drifts slightly away from the finger toward the ends,
 * as on iOS.
 *
 * A selection change slides the body from where the lens was on screen to its
 * new resting place. On `lensTravel` from rest (a key, the app), or continuing
 * the settle a lift started. Every animation runs on the compositor; a finger's
 * moves retarget them, so the lens keeps moving through a busy main thread.
 * Under Reduce Motion the animator cross-fades instead of moving and a press
 * scales nothing. Each spring plays as measured, from the UIKit table.
 *
 * Under a fine pointer the same press drags the lens in the mouse presentation.
 * A fine pointer is a mouse, a pen, or a finger on a screen whose primary
 * pointer is fine. A click stays a plain click. Once the press drags past the
 * allowable movement, the lens follows it on the finger's tracking spring
 * (`lensTrack`). There is no lift and no copy of the items. The release chooses
 * the item nearest the press, as a lift does, and the lens settles onto it on
 * `lensSettle`, from the drag's own speed. A click chooses the same way: the
 * gesture host swallows the browser's click for a press a recognizer took.
 * TabBar's CSS then slides the lens. Released off the bar, the press chooses
 * nothing.
 */
export function useTabBarLens({
  capsuleRef,
  count,
  selectedIndex,
  isTouch,
  onLift,
}: UseTabBarLensOptions): TabBarLensRefs {
  const capsule = useMotionEngine();
  const body = useMotionEngine();
  // The lifted look, the body's and the clip's `::before`, starts hidden (an
  // animator's values start at identity).
  const shadow = useMotionEngine({
    pseudoElement: '::before',
    initial: {opacity: 0},
  });
  const glass = useMotionEngine({
    pseudoElement: '::before',
    initial: {opacity: 0},
  });
  const bodyRef = useCallback(
    (element: HTMLElement | null) => {
      body.ref(element);
      shadow.ref(element);
    },
    [body, shadow],
  );
  const copy = useMotionEngine();
  const copyItems = useAnimatorList(count);

  const pressRef = useRef<Press | null>(null);
  // The lens's resting place. Under a mouse TabBar's CSS transition on
  // `translate` slides it to a new selection. After a fine pointer's drag the
  // settle carries the lens instead, so the resting place jumps.
  const lensRef = useRef<HTMLElement | null>(null);
  const lensElementRef = useCallback((element: HTMLElement | null) => {
    lensRef.current = element;
  }, []);
  /** The resting place's next move is a jump: its transition is off. */
  const holdRest = () => {
    if (lensRef.current != null) {
      lensRef.current.style.transition = 'none';
    }
  };
  /**
   * Its transition back on. Style is read first with the transition off, so
   * the jump it already took never transitions.
   */
  const releaseRest = () => {
    const element = lensRef.current;
    if (element != null && element.style.transition !== '') {
      void element.ownerDocument.defaultView?.getComputedStyle(element)
        .translate;
      element.style.transition = '';
    }
  };
  // The settle a lift started toward a newly chosen item, until the new
  // selection renders (or the app keeps the old one).
  const settleRef = useRef<number | null>(null);
  const selectedRef = useRef(selectedIndex);
  selectedRef.current = selectedIndex;
  const onLiftRef = useRef(onLift);
  onLiftRef.current = onLift;
  const tabsOf = (capsule: HTMLElement) =>
    [...capsule.children].filter(
      (child): child is HTMLElement => child.getAttribute('role') === 'tab',
    );
  // The tab a press at viewport (x, y) would choose: the tab nearest it. Off
  // the bar nothing is chosen, under every pointer, so sliding off cancels.
  const pickRef = useRef<(x: number, y: number) => HTMLElement | null>(
    () => null,
  );
  pickRef.current = (x, y) => {
    const press = pressRef.current;
    const element = capsuleRef.current;
    if (press == null || element == null) {
      return null;
    }
    const {box} = press;
    if (x < box.left || x > box.right || y < box.top || y > box.bottom) {
      return null;
    }
    const index = nearestIndex(x - press.left, press.centers);
    return tabsOf(element)[index] ?? null;
  };
  // What the lift does with the tab it chose: set as the press ends, run by
  // the shared tracker once it takes that tab.
  const liftRef = useRef<((tab: HTMLElement) => void) | null>(null);
  // Whether the press is over the bar now, where the lift would choose a tab.
  const isOnBarRef = useRef(false);
  /**
   * Where the lens heads for a press at `x`: after it, rubber-banded past
   * the end items. Off the bar, where the lift would choose nothing, the lens
   * shows the selected tab again.
   */
  const chaseTarget = (x: number, centers: number[]) =>
    isOnBarRef.current
      ? lensTarget(x, centers)
      : centers[Math.max(selectedRef.current, 0)];

  // The copy is drawn from a finger landing, or a slide starting, until
  // everything the lens moves rests. A new selection under a finger is
  // seen during render, so the frame that starts the slide already draws it.
  const [isCopyShown, setIsCopyShown] = useState(false);
  const [seenIndex, setSeenIndex] = useState(selectedIndex);
  if (seenIndex !== selectedIndex) {
    setSeenIndex(selectedIndex);
    if (
      isTouch &&
      seenIndex >= 0 &&
      seenIndex < count &&
      selectedIndex >= 0 &&
      body.animator.reducedMotion({}) === 'off'
    ) {
      setIsCopyShown(true);
    }
  }
  const motionRef = useRef(0);
  /** Drops the copy once this motion, or a later one, rests, with no finger down. */
  const dropCopyAtRest = () => {
    const motion = ++motionRef.current;
    void Promise.all([
      body.animator.atRest(),
      glass.animator.atRest(),
      shadow.animator.atRest(),
      ...copyItems.animators.slice(0, count).map(item => item.atRest()),
    ]).then(() => {
      if (motionRef.current === motion && pressRef.current == null) {
        setIsCopyShown(false);
      }
    });
  };

  /**
   * Plays the selected copy's counter-transform from `at`, derived from the
   * body's curves as they now stand. Called after every change to the body.
   */
  const playCopy = (at: number) => {
    const sample = (t: number) => {
      const time = at + t * 1000;
      return copyTransform(
        body.animator.get('x', time),
        body.animator.get('scaleX', time),
        body.animator.get('scaleY', time),
      );
    };
    const curve = (key: 'x' | 'scaleX' | 'scaleY'): MotionCurve => ({
      duration: COPY_HORIZON_S,
      at: t => sample(t)[key],
      velocity: t =>
        (sample(t + VELOCITY_STEP_S)[key] -
          sample(Math.max(0, t - VELOCITY_STEP_S))[key]) /
        (t >= VELOCITY_STEP_S ? 2 * VELOCITY_STEP_S : VELOCITY_STEP_S),
    });
    copy.animator.play(
      {x: curve('x'), scaleX: curve('scaleX'), scaleY: curve('scaleY')},
      {at},
    );
  };

  /**
   * Lifts (true) or lowers (false) a lens `size` px wide and flexes the
   * capsule. Under Reduce Motion a press scales nothing: the glass and its
   * shadow only fade.
   */
  const lift = (
    isLifted: boolean,
    at: number,
    size: number,
    touchRelease = false,
  ) => {
    const options = {at, touchRelease};
    const spring = {spring: tabBar.lift};
    shadow.animator.animate({opacity: isLifted ? 1 : 0}, spring, options);
    glass.animator.animate({opacity: isLifted ? 1 : 0}, spring, options);
    if (body.animator.reducedMotion({touchRelease}) !== 'off') {
      return;
    }
    const lifted = liftScale(size);
    body.animator.animate(
      isLifted ? {scaleX: lifted.x, scaleY: lifted.y} : {scaleX: 1, scaleY: 1},
      spring,
      options,
    );
    for (const item of copyItems.animators.slice(0, count)) {
      item.animate(
        {scale: isLifted ? tabBar.liftMagnification : 1},
        spring,
        options,
      );
    }
    capsule.animator.animate(
      {scale: isLifted ? tabBar.flexScale : 1},
      {spring: isLifted ? tabBar.flexPress : tabBar.flexRelease},
      options,
    );
  };

  const begin = (clientX: number, clientY: number) => {
    const element = capsuleRef.current;
    const selected = selectedRef.current;
    const root = element?.parentElement;
    if (element == null || root == null) {
      return;
    }
    // Read before anything moves: the capsule's layout box (its flex is a
    // transform, which layout ignores) placed by its unscaled parent.
    const rootBox = root.getBoundingClientRect();
    const left = rootBox.left + element.offsetLeft;
    const isRtl = isRtlElement(element);
    const centers = itemCenters(element.offsetWidth, count, isRtl);
    const size = itemWidth(element.offsetWidth, count);
    const x = clientX - left;
    pressRef.current = {
      centers,
      size,
      left,
      startX: x,
      lastX: x,
      isDragging: false,
      hasLens: selected >= 0,
      isFine: !isTouch,
      box: {
        left,
        right: left + element.offsetWidth,
        top: rootBox.top + element.offsetTop,
        bottom: rootBox.top + element.offsetTop + element.offsetHeight,
      },
      count,
    };
    isOnBarRef.current = pickRef.current(clientX, clientY) != null;
    // A fine pointer: nothing moves until the press drags.
    if (!isTouch) {
      return;
    }
    // No tab selected: there is no lens to move; the lift chooses the tab
    // nearest the finger.
    if (selected < 0) {
      return;
    }
    // The lifted lens magnifies the selected look: its copy mounts now, in
    // this event (its animators attach to it with their curves running).
    // Under Reduce Motion nothing lifts or travels, so no copy mounts.
    motionRef.current += 1;
    if (body.animator.reducedMotion({}) === 'off') {
      flushSync(() => setIsCopyShown(true));
    }
    const at = performance.now();
    body.animator.animate(
      {x: chaseTarget(x, centers) - centers[selected]},
      {spring: tabBar.lensTravel},
      {at},
    );
    lift(true, at, size);
    playCopy(at);
  };

  const move = (clientX: number, clientY: number) => {
    const press = pressRef.current;
    const selected = selectedRef.current;
    if (press == null) {
      return;
    }
    isOnBarRef.current = pickRef.current(clientX, clientY) != null;
    const x = clientX - press.left;
    press.lastX = x;
    press.isDragging ||= Math.abs(x - press.startX) > DRAG_SLOP;
    if (press.isFine) {
      // A fine pointer's drag carries the lens on the finger's tracking
      // spring, with no lift and no copy of the items. Where the release would
      // choose nothing, the lens shows the selected tab again.
      if (!press.isDragging) {
        return;
      }
      if (press.hasLens && selected >= 0) {
        const target = chaseTarget(x, press.centers) - press.centers[selected];
        if (body.animator.reducedMotion({}) === 'off') {
          body.animator.animate(
            {x: target},
            {spring: tabBar.lensTrack},
            {at: performance.now()},
          );
        } else {
          // Under Reduce Motion it follows the pointer at once.
          body.animator.set({x: target});
        }
      }
      return;
    }
    if (!press.hasLens || selected < 0) {
      return;
    }
    const at = performance.now();
    body.animator.animate(
      {x: chaseTarget(x, press.centers) - press.centers[selected]},
      {spring: press.isDragging ? tabBar.lensTrack : tabBar.lensTravel},
      {at},
    );
    playCopy(at);
  };

  const end = (tracked: HTMLElement | null, wasCancelled: boolean) => {
    const press = pressRef.current;
    pressRef.current = null;
    liftRef.current = null;
    const selected = selectedRef.current;
    const element = capsuleRef.current;
    if (press == null || element == null) {
      return;
    }
    // The tab list changed under the press. Its centres name the old list, so
    // it ends as a cancel and the lens settles to its resting place.
    const isStale = press.count !== count;
    // The tab the tracker took for the lift, if any.
    const lifted = wasCancelled || isStale ? null : tracked;
    const chosen = lifted == null ? -1 : tabsOf(element).indexOf(lifted);
    if (press.isFine) {
      // The release runs the tab under the press, a click's too: the host
      // swallows the browser's click for a press a recognizer took. After a
      // drag the lens settles on the finger's settle spring, from the drag's
      // own speed (the animator keeps the tracking spring's velocity). It
      // settles onto the chosen tab, or back onto the selected one. After a
      // click TabBar's CSS slides it.
      const isSlide = press.isDragging && press.hasLens && selected >= 0;
      if (isSlide && body.animator.reducedMotion({}) !== 'off') {
        // Under Reduce Motion the resting place takes it there at once.
        body.animator.set({x: 0});
      } else if (isSlide) {
        const target = chosen >= 0 ? chosen : selected;
        body.animator.animate(
          {x: press.centers[target] - press.centers[selected]},
          {spring: tabBar.lensSettle},
          {at: performance.now()},
        );
        if (chosen >= 0 && chosen !== selected) {
          settleRef.current = chosen;
          holdRest();
        }
      }
      if (chosen < 0) {
        return;
      }
      liftRef.current = () => {
        flushSync(() => onLiftRef.current(chosen));
        if (
          chosen !== selected &&
          settleRef.current === chosen &&
          selectedRef.current === selected
        ) {
          // The app kept the old selection: the lens settles back.
          settleRef.current = null;
          releaseRest();
          body.animator.animate(
            {x: 0},
            {spring: tabBar.lensSettle},
            {at: performance.now()},
          );
        }
      };
      return;
    }
    // The app's answer to this lift, as rendered now: the tab the finger
    // chose is the one under it at the lift, whatever renders after.
    const deliver = onLiftRef.current;
    if (!press.hasLens || selected < 0) {
      // No lens moved: the tab the tracker took runs at once.
      if (chosen >= 0) {
        liftRef.current = () => flushSync(() => deliver(chosen));
      }
      return;
    }
    const target = chosen >= 0 ? chosen : selected;
    const at = performance.now();
    body.animator.animate(
      {x: isStale ? 0 : press.centers[target] - press.centers[selected]},
      {spring: tabBar.lensSettle},
      {at, touchRelease: true},
    );
    lift(false, at, press.size, true);
    playCopy(at);
    dropCopyAtRest();
    if (chosen < 0) {
      return;
    }
    if (chosen !== selected) {
      settleRef.current = chosen;
    }
    // The lift reports its choice from the same event, the settle already
    // started. Its first frame waits for the browser's commit, so the app
    // rendering the chosen tab delays it rather than freezing it midway.
    // Rendered at once, so the selection reads the app's answer right after.
    liftRef.current = () => {
      flushSync(() => deliver(chosen));
      if (
        chosen !== selected &&
        settleRef.current === chosen &&
        selectedRef.current === selected
      ) {
        // The app kept the old selection: the lens settles back.
        settleRef.current = null;
        const now = performance.now();
        body.animator.animate(
          {x: 0},
          {spring: tabBar.lensSettle},
          {at: now, touchRelease: true},
        );
        playCopy(now);
        dropCopyAtRest();
      }
    };
  };

  // Core's action-group tracking owns the press: the tab under it, running
  // that tab at the lift, a second finger's cancel and focus after the lift.
  // TabBar picks the tab and draws the lens.
  useActionGroupTracking(capsuleRef, {
    itemSelector: '[role="tab"]',
    highlightOnsetMs: 0,
    highlightExpansion: 0,
    // Every pointer: a finger in the touch presentation, a mouse or a pen
    // dragging in the mouse one.
    pointerTypes: ['touch', 'pen', 'mouse'],
    // Under a mouse the host writes no touch styles and takes no selection
    // lock: desktop selection is unchanged.
    manageStyle: isTouch,
    paintsHighlight: false,
    resolveTarget: (x, y) => pickRef.current(x, y),
    onPressBegin: begin,
    onPressMove: move,
    onPressEnd: tracked => end(tracked, false),
    onPressCancel: () => end(null, true),
    onActivate: tab => {
      const run = liftRef.current;
      liftRef.current = null;
      run?.(tab);
    },
  });

  // Synchronizes the recognizer's press with the presentation: when the
  // presentation changes under a press, the press ends here, as a cancel. A
  // cancel chooses nothing, so the app hears nothing.
  const endRef = useRef(end);
  endRef.current = end;
  useEffect(() => {
    const press = pressRef.current;
    if (press != null && press.isFine === isTouch) {
      endRef.current(null, true);
    }
  }, [isTouch]);

  // Synchronizes the recognizer's press and the lens's animations with the tab
  // list. When it changes under a held finger, the press ends here, as a
  // cancel, rather than at the lift. So no move chases the old centres.
  useLayoutEffect(() => {
    if (pressRef.current != null && pressRef.current.count !== count) {
      endRef.current(null, true);
    }
  }, [count]);

  // Synchronizes the lens's compositor animations (the animator's Web
  // Animations on its body and copy) with the selected tab.
  // A new selection: the resting place jumped to the new item (CSS, this
  // frame); the body starts where the lens was on screen. After a lift it
  // continues the settle the lift started; otherwise it slides from rest.
  // Under a mouse TabBar's CSS slides the lens, except after a drag, whose
  // settle the body continues here.
  const previousIndexRef = useRef(selectedIndex);
  useLayoutEffect(() => {
    const from = previousIndexRef.current;
    previousIndexRef.current = selectedIndex;
    const element = capsuleRef.current;
    const fromLift = settleRef.current === selectedIndex;
    settleRef.current = null;
    if (
      (!isTouch && !fromLift) ||
      element == null ||
      from === selectedIndex ||
      from < 0 ||
      selectedIndex < 0 ||
      from >= count
    ) {
      return;
    }
    const isRtl = isRtlElement(element);
    const centers = itemCenters(element.offsetWidth, count, isRtl);
    const now = performance.now();
    const shift = centers[from] - centers[selectedIndex];
    const offset = body.animator.get('x', now) + shift;
    const velocity = body.animator.getVelocity('x', now);
    body.animator.set({x: offset});
    releaseRest();
    const press = pressRef.current;
    if (press != null) {
      // A finger is down (the selection changed under it): the lens keeps
      // heading for the finger, now measured from its new resting place.
      body.animator.animate(
        {
          x:
            chaseTarget(press.lastX, press.centers) -
            press.centers[selectedIndex],
        },
        {
          spring: press.isDragging ? tabBar.lensTrack : tabBar.lensTravel,
          velocity: {x: velocity},
        },
        {at: now},
      );
      playCopy(now);
      return;
    }
    if (fromLift || velocity !== 0) {
      // Motion on screen: continue it from now, the copy derived from it.
      body.animator.animate(
        {x: 0},
        {
          spring: fromLift ? tabBar.lensSettle : tabBar.lensTravel,
          velocity: {x: velocity},
        },
        {at: now, touchRelease: fromLift && isTouch},
      );
      playCopy(now);
      dropCopyAtRest();
      return;
    }
    // From rest (a key, the app), the body starts when the browser commits the
    // frame, with the lens's jump to its new place. The copy plays the body's
    // own curve on the body's clock. Two calls on two animators would each take
    // their own start, which WebKit's late-start correction can part under a
    // busy main thread.
    copy.animator.set({x: -offset});
    const call = body.animator.animate({x: 0}, {spring: tabBar.lensTravel});
    dropCopyAtRest();
    const motion = motionRef.current;
    void call.started.then(start => {
      if (motionRef.current === motion) {
        playCopy(start);
      }
    });
  }, [selectedIndex, count, isTouch, capsuleRef, body, copy]);

  return {
    lens: lensElementRef,
    capsule: capsule.ref,
    body: bodyRef,
    clip: glass.ref,
    copy: copy.ref,
    copyItem: index => copyItems.refs[index],
    isCopyShown,
  };
}
