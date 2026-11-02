// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file createReorderable.ts
 * @input The reorder's options, and List's reorder machinery
 *   (List/listReorderEngine.ts: the session, its handle and its touch layer)
 * @output `createReorderable`, which makes the object a collection's
 *   `reorderable` prop takes, with `start(key)`, which enters reorder mode
 *   from the app's own UI, and `attach(container, {items})`, which reorders
 *   plain elements (List/listReorderAttach.tsx); and its types:
 *   `Reorderable`, `ReorderableOptions`, `ReorderableLabels` (every string it
 *   announces or shows, each over the catalog's), `ReorderMove`,
 *   `ReorderableItem`
 * @position Public Core API (spec:AST-103), exported from the package root.
 *   The machinery ships here, on the object: a collection imports only the
 *   object's type, so one without `reorderable` loads no reorder code (FR2)
 *
 * SYNC: When modified, update reorderable/createReorderable.doc.mjs,
 * List/listReorderContext.ts and List/List.doc.mjs.
 */

import {
  REORDER_ENGINE,
  type ListReorderOptions,
  type ReorderableInternals,
} from '../List/listReorderContext';
import {attachReorder} from '../List/listReorderAttach';
import {listReorderEngine} from '../List/listReorderEngine';

/** A committed move: the item that moved and where it went. */
export interface ReorderMove<
  TKey extends string | number = string | number,
  TTo = number,
> {
  /**
   * The moved item's key: its ListItem's `itemKey`, or the key a collection
   * built from data takes through its `idKey` (a field name or a function of
   * the item, as Table's).
   */
  readonly key: TKey;
  /**
   * Its index after the move, in the full order of the collection's items,
   * mounted or not. A tree reports `{parent, index}`.
   */
  readonly to: TTo;
}

/** What `createReorderable` takes. */
export interface ReorderableOptions<
  TKey extends string | number = string | number,
  TTo = number,
> {
  /**
   * Called once per committed move: a drop, or each move in reorder mode.
   * Apply it by rendering the items in their new order. A cancelled move calls nothing. The latest function given is the one
   * called, so the object may be made on every render.
   */
  onReorder: (move: ReorderMove<TKey, TTo>) => void;
  /**
   * Whether the item with `key` can move. An item it rejects shows no handle
   * and cannot be picked up; one at either end of the collection also bounds
   * the others, so nothing drops beyond it and a keyboard move into it is
   * refused. Every item moves without it.
   */
  isReorderable?: (key: TKey) => boolean;
  /**
   * The strings the reorder announces or shows, each optional: a given one
   * replaces the catalog's message, a provider's translation included; an
   * absent one keeps it (spec:AST-103 FR1, DEC-6).
   */
  labels?: ReorderableLabels;
}

/**
 * Every string a reorderable object announces or shows (spec:AST-103 FR1,
 * DEC-6), each optional. An absent key keeps the catalog's message:
 * translated when the collection renders under a provider, English without
 * one. A given string replaces that message everywhere, a provider's
 * translation included. A templated message takes the catalog's ICU
 * template, with the same arguments and the same plural and number syntax,
 * and is formatted in the provider's locale.
 */
export interface ReorderableLabels {
  /**
   * A drag's pick-up, with `{position}` and `{total}`: "Picked up, position
   * {position, number} of {total, number}."
   */
  readonly pickedUp?: string;
  /**
   * A drag's drop, with `{position}` and `{total}`: "Dropped, position
   * {position, number} of {total, number}".
   */
  readonly dropped?: string;
  /**
   * A cancelled drag, back to `{position}` of `{total}`: "Reorder cancelled,
   * back to position {position, number} of {total, number}".
   */
  readonly cancelled?: string;
  /**
   * A move in reorder mode, with `{label}`, `{position}`, `{total}`,
   * `{previous}` and `{next}`: "{label}, position {position, number} of
   * {total, number}, after {previous}, before {next}".
   */
  readonly place?: string;
  /**
   * A move to the first place, with `{label}`, `{position}`, `{total}` and
   * `{next}`: "{label}, position {position, number} of {total, number}, at
   * the top, before {next}".
   */
  readonly placeAtTop?: string;
  /**
   * A move to the last place, with `{label}`, `{position}`, `{total}` and
   * `{previous}`: "{label}, position {position, number} of {total, number},
   * after {previous}, at the end".
   */
  readonly placeAtEnd?: string;
  /**
   * A move in a two-dimensional layout, such as a wrapping grid of attached
   * items, with `{label}`, `{row}`, `{column}`, `{position}` and `{total}`:
   * "{label}, row {row, number}, column {column, number}, position
   * {position, number} of {total, number}".
   */
  readonly placeInGrid?: string;
  /**
   * A move inside a parent when a tree list reorders, with `{label}`,
   * `{position}` among the parent's children, `{total}` of them and
   * `{parent}`: "{label}, position {position, number} of {total, number} in
   * {parent}". No tree list reorders yet, so nothing announces it.
   */
  readonly placeInTree?: string;
  /**
   * A move refused by the item that keeps its place, with that item's
   * `{label}`: "Can't move past {label}".
   */
  readonly refused?: string;
  /**
   * A move of an attached item the app did not apply, with its `{label}`:
   * "Can't move {label}".
   */
  readonly notMoved?: string;
  /**
   * Leaving reorder mode, with `{label}`, `{position}` and `{total}`: "Done,
   * {label} at position {position, number} of {total, number}".
   */
  readonly modeDone?: string;
  /**
   * What the announcements call an item that shows no text, with
   * `{position}`: "Item {position, number}".
   */
  readonly unnamedItem?: string;
  /** The handle's name, with the item's `{label}`: "Reorder {label}". */
  readonly handle?: string;
  /**
   * "Reorder" alone: the handle's name before the row's own label element,
   * when that element names the handle.
   */
  readonly handleVerb?: string;
  /**
   * The handle of an item that shows no text, with `{position}`: "Reorder
   * item {position, number}".
   */
  readonly unnamedHandle?: string;
  /** The handle's description: how to drag, and how reorder mode works. */
  readonly handleHint?: string;
  /** Reorder mode's hint: the button that moves the item up. */
  readonly moveUp?: string;
  /** Reorder mode's hint: the button that moves the item down. */
  readonly moveDown?: string;
  /** Reorder mode's hint: the button that moves the item left. */
  readonly moveLeft?: string;
  /** Reorder mode's hint: the button that moves the item right. */
  readonly moveRight?: string;
  /** Reorder mode's hint: the button that ends the mode, keeping the moves. */
  readonly done?: string;
}

declare const reorderableBrand: unique symbol;

/**
 * A collection's reorder behavior, made by `createReorderable` and passed as
 * its `reorderable` prop. It applies to the whole collection; each item's key
 * and `isReorderable` decide which items move.
 */
export interface Reorderable<
  TKey extends string | number = string | number,
  TTo = number,
> {
  /** The keys and places it reports; a type, not a value. */
  readonly [reorderableBrand]: {readonly key: TKey; readonly to: TTo};
  /**
   * Enters reorder mode for the item with `key` from the app's own UI, such
   * as a Move item in its context menu or a toolbar button, as activating
   * its handle does: the focus moves to the handle, which scrolls into view,
   * and the mode's keys, hint, announcements and exits follow. A key that
   * cannot move, or whose item is not mounted, does nothing (and warns in
   * development). On an object passed to two collections, it starts the
   * mode in the one mounted last.
   */
  start(key: TKey): void;
  /**
   * Reorders a container of plain elements, with no collection component
   * (spec:AST-103 FR4b): `items()` returns one `{key, element, handle}` per
   * item, in order. Each reorderable item's handle becomes reorder mode's
   * toggle, named "Reorder" and the item's name, in the Tab order; the
   * container gets the drag, reorder mode and their announcements. A move
   * commits once `items()` reports the new order after `onReorder`; one whose
   * order has not changed by the end of its task is refused and announced.
   * `destroy` ends a drag or reorder mode calling nothing, and removes what
   * `attach` added, putting back each handle's own role, name and tab order.
   */
  attach(
    container: HTMLElement,
    options: {readonly items: () => ReadonlyArray<ReorderableItem<TKey>>},
  ): {destroy: () => void};
}

/** One plain element `attach` reorders (spec:AST-103 FR4b). */
export interface ReorderableItem<
  TKey extends string | number = string | number,
> {
  /** The key its moves report; an item without one cannot move. */
  readonly key?: TKey | null;
  /** The item: its accessible name, else its text, names it. */
  readonly element: HTMLElement;
  /** The element that drags it, and reorder mode's toggle. */
  readonly handle: HTMLElement;
}

/**
 * Makes a collection's rows reorderable: pass the result as the collection's
 * `reorderable` prop (`<List reorderable={createReorderable({onReorder})}>`),
 * with an `itemKey` on each ListItem. Make it once per collection (with
 * `useMemo`); one made again on each render still works.
 *
 * @example
 * ```
 * const reorderable = useMemo(
 *   () =>
 *     createReorderable({
 *       onReorder: ({key, to}) => setTasks(tasks => moveItem(tasks, key, to)),
 *     }),
 *   [],
 * );
 * <List reorderable={reorderable}>
 *   {tasks.map(task => (
 *     <ListItem key={task.id} itemKey={task.id} label={task.title} />
 *   ))}
 * </List>
 * ```
 */
export function createReorderable<
  TKey extends string | number = string | number,
  TTo = number,
>(options: ReorderableOptions<TKey, TTo>): Reorderable<TKey, TTo> {
  const internals: ReorderableInternals = {
    options: options as unknown as ListReorderOptions,
    [REORDER_ENGINE]: listReorderEngine,
    start: key => listReorderEngine.start(internals.options, key),
    attach: (container, {items}) =>
      attachReorder(internals.options, container, items),
  };
  return internals as unknown as Reorderable<TKey, TTo>;
}
