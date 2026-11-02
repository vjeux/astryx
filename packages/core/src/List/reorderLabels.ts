// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file reorderLabels.ts
 * @input A reorderable object's `labels` (reorderable/createReorderable.ts),
 *   a translator (i18n/useTranslator.ts, or attach's shipped English one) and
 *   its locale; the shared ICU resolver (i18n/resolve.ts)
 * @output `REORDER_LABEL_KEYS`, the catalog message each `labels` key
 *   replaces; `withLabels`, a translator that answers each replaced message
 *   with its given string, formatted in the locale, and every other message
 *   from the translator it wraps; and `useReorderTranslator`, the same under
 *   the provider around a component
 * @position Internal to the reorder (spec:AST-103 FR1, DEC-6): the engine,
 *   its handle, its hint and attach read every string through it, so a given
 *   label replaces a message everywhere, a provider's translation included
 */

import {useMemo} from 'react';
import {getResolve} from '../i18n/resolve';
import {useLocale} from '../i18n/useLocale';
import {useTranslator, type TranslatorFn} from '../i18n/useTranslator';
import type {ReorderableLabels} from '../reorderable/createReorderable';

/** The catalog message each `labels` key replaces. */
export const REORDER_LABEL_KEYS = {
  pickedUp: '@astryx.list.reorderPickedUp',
  dropped: '@astryx.list.reorderDropped',
  cancelled: '@astryx.list.reorderCancelled',
  place: '@astryx.list.reorderPlace',
  placeAtTop: '@astryx.list.reorderPlaceTop',
  placeAtEnd: '@astryx.list.reorderPlaceEnd',
  placeInGrid: '@astryx.list.reorderPlaceGrid',
  placeInTree: '@astryx.list.reorderPlaceTree',
  refused: '@astryx.list.reorderRefused',
  notMoved: '@astryx.list.reorderNotMoved',
  modeDone: '@astryx.list.reorderModeDone',
  unnamedItem: '@astryx.list.reorderItemAt',
  handle: '@astryx.list.reorderHandle',
  handleVerb: '@astryx.list.reorderHandleVerb',
  unnamedHandle: '@astryx.list.reorderHandleAt',
  handleHint: '@astryx.list.reorderHint',
  moveUp: '@astryx.list.reorderMoveUp',
  moveDown: '@astryx.list.reorderMoveDown',
  moveLeft: '@astryx.list.reorderMoveLeft',
  moveRight: '@astryx.list.reorderMoveRight',
  done: '@astryx.list.reorderDone',
} as const satisfies Record<keyof ReorderableLabels, string>;

/**
 * `t`, with each message `labels` gives answered by the given string instead,
 * formatted in `locale` as the catalog's message would be. Every other
 * message comes from `t`: the provider's translation, or English.
 */
export function withLabels(
  t: TranslatorFn,
  labels: ReorderableLabels | undefined,
  locale: string,
): TranslatorFn {
  if (labels == null) {
    return t;
  }
  const given: Record<string, string> = {};
  for (const name of Object.keys(
    REORDER_LABEL_KEYS,
  ) as (keyof ReorderableLabels)[]) {
    const value = labels[name];
    if (typeof value === 'string') {
      given[REORDER_LABEL_KEYS[name]] = value;
    }
  }
  if (Object.keys(given).length === 0) {
    return t;
  }
  // The shared resolver, with the given strings as this locale's overrides:
  // the same ICU formatting, number and plural rules as the catalog's.
  const own = getResolve(locale, {}, {[locale]: given});
  return (key, values) =>
    Object.hasOwn(given, key) ? own(key, values) : t(key, values);
}

/** The provider's translator around a component, with `labels` over it. */
export function useReorderTranslator(
  labels: ReorderableLabels | undefined,
): TranslatorFn {
  const t = useTranslator();
  const locale = useLocale();
  return useMemo(() => withLabels(t, labels, locale), [t, labels, locale]);
}
