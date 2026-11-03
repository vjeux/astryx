// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file ItemSwipeLayer.tsx
 * @input The swipe entries per side, the behavior; useSwipeAction, tokens
 * @output Exports ItemSwipeLayer (default): the panels of a row's swipe
 *   actions and the gesture that uncovers them. Also exports the
 *   ItemSwipeBridge type, the root's way to the gesture's key handler
 * @position Internal to Item, reached only through Item.tsx's dynamic import
 *   when `swipeActions` is set; tested through Item.test.tsx
 *
 * The panels are out-of-flow children of the row's root, so the swipe adds
 * no element to the row. Each part moves by a transform that reads the one
 * travel the gesture writes on the root.
 * SYNC: the property names are useSwipeAction.ts's.
 */

import {useEffect, useRef} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  fontWeightVars,
  typographyVars,
  colorVars,
  spacingVars,
  typeScaleVars,
} from '../theme/tokens.stylex';
import {mergeProps} from '../utils/mergeProps';
import {themeProps} from '../utils/themeProps';
import {disabledInteractionProps} from '../utils/disabledInteraction';
import {focusOutlineProps} from '../utils/focusOutline.stylex';
import {isSwipeOpen, useSwipeAction, type SwipeSide} from './useSwipeAction';
import type {ItemSwipeAction, ItemSwipeBehavior} from './Item';

// =============================================================================
// Types
// =============================================================================

/**
 * What the root needs from the gesture: the key handler it forwards its key
 * events into (Escape closes a resting row). The layer writes it on every
 * render; the root reads it on every event.
 */
export interface ItemSwipeBridge {
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export interface ItemSwipeLayerProps {
  /**
   * Called with the gesture for the root to forward into, after every render
   * of the layer, and with `null` when the layer leaves.
   */
  onBridge: (bridge: ItemSwipeBridge | null) => void;
  /**
   * Called with
   * `true` when the row opens (from the release that opens it) and with `false`
   * when it closes or the layer leaves. The root takes no press while open. A
   * tap on an open row's content only closes it, as in UIKit, where the cell
   * never sees that touch.
   */
  onOpenChange: (isOpen: boolean) => void;
  leading: ItemSwipeAction[];
  trailing: ItemSwipeAction[];
  behavior: ItemSwipeBehavior;
}

// =============================================================================
// Styles
// =============================================================================

/** The travel the gesture writes on the root, physical px (useSwipeAction.ts). */
const SWIPE_TRAVEL = 'var(--_item-swipe-travel, 0px)';
/** How far a full swipe has confirmed, 0 to 1 (useSwipeAction.ts). */
const SWIPE_CONFIRM = 'var(--_item-swipe-confirm, 0)';
// The side's geometry the gesture writes on its window (useSwipeAction.ts):
// the pin, its physical sign, its open width and the outermost entry's slide.
const SWIPE_PIN = 'var(--_item-swipe-pin, 0px)';
const SWIPE_SIGN = 'var(--_item-swipe-sign, 1)';
const SWIPE_OPEN = 'var(--_item-swipe-open, 0px)';
const SWIPE_SLIDE = 'var(--_item-swipe-slide, 0px)';
/**
 * Where the entries sit against the track. They move back by the travel the
 * track moves, so they stay pinned at the outer edge until the row has
 * uncovered them all. Past the open width, they ride the row.
 */
const SWIPE_ENTRIES_X = `calc(${SWIPE_PIN} - ${SWIPE_SIGN} * min(${SWIPE_SIGN} * ${SWIPE_TRAVEL}, ${SWIPE_OPEN}))`;

const styles = stylex.create({
  // A side's window: the row's resting box. It is translated back by the
  // travel, so it stays where the row rests, and clips the track to that box
  // and its corners. Transparent and not hit: only the entries take touches.
  swipePanel: {
    position: 'absolute',
    insetBlock: 0,
    insetInline: 0,
    overflow: 'clip',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    transform: `translate3d(calc(-1 * ${SWIPE_TRAVEL}), 0, 0)`,
  },
  // The track sits beside the window at rest, so no pixel of it shows. It moves
  // with the row, so the part inside the window is exactly the space the row
  // vacates, and the entries show only there. Twice the row's width covers
  // every travel, the slide-out included. The entries run from the track's edge
  // next to the row, on the surface the track paints. Each is translated back,
  // so the entries stay pinned at the row's outer edge until the row has
  // uncovered them all, then ride the row. The neutral variant is translucent
  // and shows what is under it. The track's `::before` is the confirm fill: the
  // outermost entry's colour, as opaque as the full swipe has confirmed. It
  // shows through the other entries as they fade (swipeTrackFillStyles).
  swipeTrack: {
    position: 'absolute',
    insetBlock: 0,
    width: '200%',
    overflow: 'clip',
    borderRadius: 'inherit',
    display: 'flex',
    isolation: 'isolate',
    backgroundColor: colorVars['--color-background-surface'],
    transform: `translate3d(${SWIPE_TRAVEL}, 0, 0)`,
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      opacity: SWIPE_CONFIRM,
      pointerEvents: 'none',
    },
  },
  // The outermost entry is the last, at the outer edge. On the leading side
  // that is the inline start, so the entries run in reverse from the track's
  // inline end.
  swipeTrackLeading: {
    insetInlineEnd: '100%',
    flexDirection: 'row-reverse',
  },
  swipeTrackTrailing: {
    insetInlineStart: '100%',
  },
  swipeEntry: {
    transform: `translate3d(${SWIPE_ENTRIES_X}, 0, 0)`,
    flexShrink: 0,
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingVars['--spacing-1'],
    minWidth: 72,
    height: '100%',
    paddingInline: spacingVars['--spacing-3'],
    boxSizing: 'border-box',
    margin: 0,
    borderWidth: 0,
    borderStyle: 'none',
    appearance: 'none',
    cursor: {
      default: 'pointer',
      ':is(:disabled,[aria-disabled="true"])': 'default',
    },
    fontFamily: typographyVars['--font-family-body'],
    fontSize: typeScaleVars['--text-supporting-size'],
    fontWeight: fontWeightVars['--font-weight-medium'],
    lineHeight: typeScaleVars['--text-supporting-leading'],
    whiteSpace: 'nowrap',
  },
  // An entry other than the outermost fades on a confirmed full swipe.
  swipeEntryFading: {
    opacity: `calc(1 - ${SWIPE_CONFIRM})`,
  },
  // Half strength as a filter, so the entry's own opacity stays free for the
  // full swipe's fade.
  swipeEntryDisabled: {
    filter: 'opacity(0.5)',
  },
  // The outermost entry's colour, painted beside it out to the row's outer
  // edge, fills whatever the row uncovers past the open width. A slide-out
  // fills the row with it. Decoration only, on a pseudo-element; the entry's
  // own fill, theme included. On a confirmed full swipe it slides to the row's
  // edge with the entries' pin.
  swipeOuterEntry: {
    position: 'relative',
    transform: `translate3d(calc(${SWIPE_ENTRIES_X} + ${SWIPE_SLIDE} * ${SWIPE_CONFIRM}), 0, 0)`,
  },
  swipeOuterEntryLeading: {
    '::after': {
      content: '""',
      position: 'absolute',
      insetBlock: 0,
      insetInlineEnd: '100%',
      width: '100vw',
      backgroundColor: 'inherit',
      pointerEvents: 'none',
    },
  },
  swipeOuterEntryTrailing: {
    '::after': {
      content: '""',
      position: 'absolute',
      insetBlock: 0,
      insetInlineStart: '100%',
      width: '100vw',
      backgroundColor: 'inherit',
      pointerEvents: 'none',
    },
  },
});

// A verb's colour: ordinary, the one you mean, the dangerous one. The
// outermost entry's fills the row on a slide-out (swipeOuterEntry).
const swipeVariantStyles = stylex.create({
  neutral: {
    backgroundColor: colorVars['--color-neutral'],
    color: colorVars['--color-text-primary'],
  },
  accent: {
    backgroundColor: colorVars['--color-accent'],
    color: colorVars['--color-on-accent'],
  },
  destructive: {
    backgroundColor: colorVars['--color-error'],
    color: colorVars['--color-on-error'],
    // Forced colors replace the fill with Canvas; a border keeps the
    // destructive fill's shape visible (architecture:theme-tokens INV11). A
    // border, not an outline, leaves the shared focus ring intact.
    borderWidth: {default: 0, '@media (forced-colors: active)': '1px'},
    borderStyle: {default: 'none', '@media (forced-colors: active)': 'solid'},
    borderColor: {
      default: null,
      '@media (forced-colors: active)': 'CanvasText',
    },
  },
});

// The track's confirm fill: the outermost entry's colour (a disabled one
// never confirms, so it has none to show).
const swipeTrackFillStyles = stylex.create({
  neutral: {
    '::before': {backgroundColor: colorVars['--color-neutral']},
  },
  accent: {
    '::before': {backgroundColor: colorVars['--color-accent']},
  },
  destructive: {
    '::before': {backgroundColor: colorVars['--color-error']},
  },
});

// =============================================================================
// Component
// =============================================================================

/**
 * The swipe half of an `Item` with `swipeActions`: both panels, rendered into
 * the root Item owns, and the gesture that drives that root.
 */
export default function ItemSwipeLayer({
  onBridge,
  onOpenChange,
  leading,
  trailing,
  behavior,
}: ItemSwipeLayerProps) {
  // The entries, read when an entry fires (after the render that showed them).
  // Synchronizes the gesture system's fire callback, which runs outside React
  // from the recognizer, with the committed entries.
  const entriesRef = useRef({leading, trailing});
  useEffect(() => {
    entriesRef.current = {leading, trailing};
  });
  const swipe = useSwipeAction({
    behavior,
    // An open row's root takes no press.
    onOpenChange,
    // A disabled outermost entry cannot fire, so a full swipe never confirms
    // toward it.
    canConfirm: side => {
      const entries = entriesRef.current[side];
      const entry = entries[entries.length - 1];
      return entry != null && entry.isDisabled !== true;
    },
    fireOutermost: side => {
      const entries = entriesRef.current[side];
      const entry = entries[entries.length - 1];
      if (entry == null || entry.isDisabled === true) {
        return false;
      }
      void entry.onActivate();
      return entry.hasRemoval === true;
    },
    sides: {
      leading: leading.length > 0,
      trailing: trailing.length > 0,
    },
  });
  // The root forwards its key events into what this publishes. The Effect
  // installs this layer's key handler on Item's root, which
  // lives outside the layer, and releases it when the layer leaves. React
  // flushes effects before it delivers a discrete event, so a handler never
  // meets a stale bridge.
  useEffect(() => {
    onBridge({onKeyDown: swipe.onKeyDown});
    return () => {
      onBridge(null);
    };
  });
  // Open from the release that opens it (`isSwipeOpen`), as UIKit counts it:
  // an entry the finger can see while the row springs open is tappable.
  const isOpen = isSwipeOpen(swipe.state);

  // A side's panel: entries as real buttons under
  // `reveal`, presentational blocks under `commit`. It is out of the
  // accessibility tree and the tab order except while the row is open on its
  // side. So the row keeps one tab stop, and the other side's entries, out of
  // sight behind the row, are never reached. A pointer that can hover never
  // meets it.
  const renderSwipePanel = (side: SwipeSide, entries: ItemSwipeAction[]) => {
    if (entries.length === 0) {
      return null;
    }
    const outer = entries[entries.length - 1];
    const isCommit = behavior === 'commit';
    const isLive = isOpen && swipe.state.side === side && !isCommit;
    const refs = swipe.panelRefs[side];
    const renderEntry = (entry: ItemSwipeAction) => {
      const variant = entry.variant ?? 'accent';
      const key = entry.id ?? entry.label;
      // The outermost entry is the full swipe's moving part itself; the
      // others fade.
      const isOuter = entry === outer;
      const ref = isOuter ? refs.outer : refs.entry(key);
      const content = (
        <>
          {entry.icon}
          <span>{entry.label}</span>
        </>
      );
      const entryStyles = [
        styles.swipeEntry,
        swipeVariantStyles[variant],
        entry.isDisabled === true && styles.swipeEntryDisabled,
        !isOuter && styles.swipeEntryFading,
        isOuter && styles.swipeOuterEntry,
        isOuter &&
          (side === 'leading'
            ? styles.swipeOuterEntryLeading
            : styles.swipeOuterEntryTrailing),
      ];
      if (isCommit) {
        return (
          <span
            key={key}
            ref={ref}
            {...mergeProps(
              themeProps('item-swipe-action', {variant}),
              stylex.props(...entryStyles),
            )}>
            {content}
          </span>
        );
      }
      return (
        <button
          key={key}
          ref={ref}
          type="button"
          aria-disabled={entry.isDisabled === true ? true : undefined}
          onClick={() =>
            swipe.activateEntry(() => {
              void entry.onActivate();
            }, entry.hasRemoval === true)
          }
          // A disabled entry stays focusable while the row rests open but is
          // inert: it runs no `onActivate` and its click does not reach the
          // row.
          {...(entry.isDisabled === true
            ? disabledInteractionProps<HTMLButtonElement>()
            : null)}
          {...mergeProps(
            themeProps('item-swipe-action', {variant}),
            focusOutlineProps.focusVisible(...entryStyles),
          )}>
          {content}
        </button>
      );
    };
    return (
      <div
        key={side}
        ref={refs.panel}
        data-swipe-panel={side}
        inert={isLive ? undefined : true}
        aria-hidden={isCommit ? true : undefined}
        {...stylex.props(styles.swipePanel)}>
        <div
          {...mergeProps(
            themeProps('item-swipe-panel', {side}),
            stylex.props(
              styles.swipeTrack,
              side === 'leading'
                ? styles.swipeTrackLeading
                : styles.swipeTrackTrailing,
              swipeTrackFillStyles[outer.variant ?? 'accent'],
            ),
          )}>
          {entries.map(renderEntry)}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSwipePanel('leading', leading)}
      {renderSwipePanel('trailing', trailing)}
    </>
  );
}

ItemSwipeLayer.displayName = 'ItemSwipeLayer';
