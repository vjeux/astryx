// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file privateAttributes/reorderGlide.stylex.ts
 * @input A reorderable List's list element while its rows glide to rest after
 *   a drag or a reorder mode move, and the motions of that glide
 * @output markReorderGlide and clearReorderGlide, which mark the list, and
 *   reorderGlideStyles, which lift the list's inline clip while it is marked
 *   under a coarse primary pointer
 * @position Owner module of the private reorder-glide attribute: the only file
 *   that writes its name. The reorder machinery (List/listReorderEngine.tsx)
 *   marks the list, and List applies the style with the reorder's list style
 *   (List/ListReorderHandle.tsx). No package entry exports it.
 *
 * SYNC: SWIPED_ROW names Item's swipe travel property (Item/useSwipeAction.ts).
 */

import * as stylex from '@stylexjs/stylex';

const REORDER_GLIDE = 'data-astryx-reorder-glide';

/** A row that a swipe moves or holds open (Item/useSwipeAction.ts). */
const SWIPED_ROW = '[style*="--_item-swipe-travel"]';

/**
 * Each list's latest mark, so the end of an earlier glide leaves a later mark
 * in place.
 */
const marks = new WeakMap<Element, object>();

/**
 * Marks `list` until every motion in `glides` has ended: arrived, been
 * stopped, or failed. A later mark or `clearReorderGlide` takes over, so the
 * end of an earlier glide does not unmark the list. Nothing glides when
 * `glides` is empty, so nothing is marked. Nothing is marked while a row of
 * the list is swiped either: the swipe slides row content past the inline
 * edge.
 */
export function markReorderGlide(
  list: Element,
  glides: ReadonlyArray<Promise<unknown>>,
): void {
  if (glides.length === 0 || list.querySelector(SWIPED_ROW) != null) {
    return;
  }
  const mark = {};
  marks.set(list, mark);
  list.setAttribute(REORDER_GLIDE, '');
  void Promise.allSettled(glides).then(() => {
    if (marks.get(list) === mark) {
      marks.delete(list);
      list.removeAttribute(REORDER_GLIDE);
    }
  });
}

/**
 * Removes the mark from `list` at once, as a drag starts or a pointer lands
 * on the list. A glide that marked it before leaves it unmarked when it ends.
 */
export function clearReorderGlide(list: Element): void {
  marks.delete(list);
  list.removeAttribute(REORDER_GLIDE);
}

export const reorderGlideStyles = stylex.create({
  // Under a coarse pointer, WebKit draws a gliding row a point off its place
  // until it rests. It does so when two inline clips nest around the row: the
  // list's and a clipping container's. So the list stops clipping while it is
  // marked. The block axis is not clipped, so `visible` stays visible. It does
  // not compute to `auto`, which would make the list a scroll container.
  list: {
    overflowInline: {
      default: 'clip',
      '@media (pointer: coarse)': {
        default: 'clip',
        '[data-astryx-reorder-glide]': 'visible',
      },
    },
  },
});
