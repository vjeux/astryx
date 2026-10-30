// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file RefreshControl.tsx
 * @input Uses React, StyleX, Astryx core theme tokens and utilities,
 *   useRefreshControl
 * @output Exports RefreshControl and RefreshControlProps
 * @position Lab implementation; consumed by packages/lab/src/index.ts
 *
 * Pull to refresh for the content it wraps, inside a ScrollableArea (or any
 * scroll container) or on the page. The content itself is pulled; the
 * indicator stays at the top of the scroll view in the gap a pull opens, as
 * UIRefreshControl does, and the content's edge covers it on the way back.
 * The title (optional) sits under the indicator, a status line for assistive
 * technology; the spinner is decoration, hidden from it.
 *
 * The indicator is UIRefreshControl's replicator, drawn from the refresh
 * table: eight capsule spokes revealed one after another by the pull (a CSS
 * custom property the pull writes) and, once the refresh starts, a gradient
 * that springs in and steps round clockwise every eighth of a second. The
 * eight capsules are drawn once, one element each: a layer in the text color
 * clipped to its capsule already drawn at its angle (a clip path with exact
 * arcs), so nothing is resampled at rest, and each its own compositor layer,
 * so the pull's reveal and the spin change only opacity and WebKit repaints
 * nothing (it repaints a masked layer on every opacity change). The spin is the
 * hook's: each spoke steps its opacity on a Web Animation, a compositor
 * animation that keeps turning while a script runs. At the trigger the
 * spokes start stepping and the hook fades a transient copy of them, as the
 * pull left them, out over them on the gradient spring: UIKit's
 * cross-fade, and under Reduce Motion the shared 200 ms opacity fade
 * (nothing travels). The copy is removed when its fade ends.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/lab/src/RefreshControl/RefreshControl.doc.mjs
 * - /packages/lab/src/RefreshControl/RefreshControl.test.tsx
 * - /packages/lab/src/RefreshControl/index.ts
 * - /apps/storybook/stories/RefreshControl.stories.tsx
 */

import type {ReactNode, Ref} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '@astryxdesign/core';
import {useMergedRefs} from '@astryxdesign/core/hooks';
import {refreshControl} from '@astryxdesign/core/internal/motion';
import {
  colorVars,
  spacingVars,
  typeScaleVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {mergeProps, themeProps} from '@astryxdesign/core/utils';
import {REFRESH_HEIGHT} from './refreshPull';
import {
  REFRESH_REVEAL_VAR,
  useRefreshControl,
  type UseRefreshControlOptions,
} from './useRefreshControl';

const SPOKES = refreshControl.indicatorSpokes;
const REVEAL = `var(${REFRESH_REVEAL_VAR}, 0)`;

/**
 * A spoke's opacity while the pull reveals it, as UIKit's replicator draws
 * it: the layer's opacity is the reveal, and each spoke is fainter than the
 * one before by the alpha offset (reveal − 1), so the spokes fill in one
 * after another. At the trigger every spoke is at full alpha.
 */
function revealOpacity(index: number): string {
  return `calc(${REVEAL} * clamp(0, 1 + ${index} * (${REVEAL} - 1), 1))`;
}

const styles = stylex.create({
  root: {
    position: 'relative',
  },
  // Rides on the content's top edge and clips the indicator to the gap above
  // it: the content's edge covers the pinned indicator as it comes back.
  indicatorClip: {
    position: 'absolute',
    insetInline: 0,
    bottom: '100%',
    // Taller than any pull: the indicator stays inside it.
    height: '100lvh',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  indicator: {
    position: 'absolute',
    insetInline: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingVars['--spacing-1'],
    pointerEvents: 'none',
  },
  // UIRefreshControl's band, at the bottom of the clip: the hook moves it
  // against the content so it stays at the top of the scroll view.
  indicatorBand: (height: number) => ({
    bottom: 0,
    height,
  }),
  // The indicator: the spokes reach 15 pt from its center (30 pt across,
  // `spokeOuterRadiusPt` twice; StyleX needs the literal).
  glyph: {
    position: 'relative',
    flexShrink: 0,
    width: 30,
    height: 30,
  },
  // One element per spoke, the glyph's whole box: the text color clipped to
  // the spoke's capsule at its angle (`spokeShapes` gives each its clip
  // path). The capsules are the table's: 3.67 pt wide with 1.83 pt corners,
  // from 5 to 15 pt out; RefreshControl.test.tsx rebuilds the paths from
  // refresh.ts. A clip, not a mask: WebKit repaints a masked layer whenever
  // its opacity changes, and the pull changes every spoke's opacity on every
  // move.
  spoke: {
    position: 'absolute',
    inset: 0,
    // Under forced colors a background becomes the page's Canvas, which would
    // hide every spoke; the spokes keep the system text color instead.
    backgroundColor: {
      default: colorVars['--color-text-secondary'],
      '@media (forced-colors: active)': 'CanvasText',
    },
    forcedColorAdjust: {
      default: null,
      '@media (forced-colors: active)': 'none',
    },
  },
  spokeOpacity: (opacity: string) => ({
    opacity,
    // Each spoke is its own compositor layer: the pull changes its opacity
    // every move (through the reveal), and a composited opacity changes
    // without a repaint.
    willChange: 'opacity',
  }),
  title: {
    fontSize: typeScaleVars['--text-supporting-size'],
    lineHeight: typeScaleVars['--text-supporting-leading'],
    color: colorVars['--color-text-secondary'],
    textAlign: 'center',
    // SYNC: REFRESH_REVEAL_VAR in useRefreshControl.ts
    opacity: 'var(--astryx-refresh-reveal, 0)',
    // Composited, as the spokes: the reveal changes it every move.
    willChange: 'opacity',
  },
});

export interface RefreshControlProps
  extends BaseProps<HTMLElement>, UseRefreshControlOptions {
  /** Ref forwarded to the root element (the pulled content). */
  ref?: Ref<HTMLDivElement>;
  /** The scrolled content (a List, a feed). */
  children: ReactNode;
  /**
   * Text under the indicator, such as when the content was last updated.
   * Assistive technology reads it as a status line, so a new title is
   * announced.
   */
  title?: ReactNode;
}

// Each spoke's capsule: spoke k turned k × 45° clockwise from 12 o'clock
// about the glyph's center, as straight edges and quarter arcs.
const spokeShapes = stylex.create({
  s0: {
    clipPath:
      "path('M 14.995 0 L 15.005 0 A 1.83 1.83 0 0 1 16.835 1.83 L 16.835 8.17 A 1.83 1.83 0 0 1 15.005 10 L 14.995 10 A 1.83 1.83 0 0 1 13.165 8.17 L 13.165 1.83 A 1.83 1.83 0 0 1 14.995 0 Z')",
  },
  s1: {
    clipPath:
      "path('M 25.603 4.39 L 25.61 4.397 A 1.83 1.83 0 0 1 25.61 6.985 L 21.127 11.468 A 1.83 1.83 0 0 1 18.539 11.468 L 18.532 11.461 A 1.83 1.83 0 0 1 18.532 8.873 L 23.015 4.39 A 1.83 1.83 0 0 1 25.603 4.39 Z')",
  },
  s2: {
    clipPath:
      "path('M 30 14.995 L 30 15.005 A 1.83 1.83 0 0 1 28.17 16.835 L 21.83 16.835 A 1.83 1.83 0 0 1 20 15.005 L 20 14.995 A 1.83 1.83 0 0 1 21.83 13.165 L 28.17 13.165 A 1.83 1.83 0 0 1 30 14.995 Z')",
  },
  s3: {
    clipPath:
      "path('M 25.61 25.603 L 25.603 25.61 A 1.83 1.83 0 0 1 23.015 25.61 L 18.532 21.127 A 1.83 1.83 0 0 1 18.532 18.539 L 18.539 18.532 A 1.83 1.83 0 0 1 21.127 18.532 L 25.61 23.015 A 1.83 1.83 0 0 1 25.61 25.603 Z')",
  },
  s4: {
    clipPath:
      "path('M 15.005 30 L 14.995 30 A 1.83 1.83 0 0 1 13.165 28.17 L 13.165 21.83 A 1.83 1.83 0 0 1 14.995 20 L 15.005 20 A 1.83 1.83 0 0 1 16.835 21.83 L 16.835 28.17 A 1.83 1.83 0 0 1 15.005 30 Z')",
  },
  s5: {
    clipPath:
      "path('M 4.397 25.61 L 4.39 25.603 A 1.83 1.83 0 0 1 4.39 23.015 L 8.873 18.532 A 1.83 1.83 0 0 1 11.461 18.532 L 11.468 18.539 A 1.83 1.83 0 0 1 11.468 21.127 L 6.985 25.61 A 1.83 1.83 0 0 1 4.397 25.61 Z')",
  },
  s6: {
    clipPath:
      "path('M 0 15.005 L 0 14.995 A 1.83 1.83 0 0 1 1.83 13.165 L 8.17 13.165 A 1.83 1.83 0 0 1 10 14.995 L 10 15.005 A 1.83 1.83 0 0 1 8.17 16.835 L 1.83 16.835 A 1.83 1.83 0 0 1 0 15.005 Z')",
  },
  s7: {
    clipPath:
      "path('M 4.39 4.397 L 4.397 4.39 A 1.83 1.83 0 0 1 6.985 4.39 L 11.468 8.873 A 1.83 1.83 0 0 1 11.468 11.461 L 11.461 11.468 A 1.83 1.83 0 0 1 8.873 11.468 L 4.39 6.985 A 1.83 1.83 0 0 1 4.39 4.397 Z')",
  },
});

/** Each spoke's capsule, in spoke order. */
const SPOKE_SHAPES = [
  spokeShapes.s0,
  spokeShapes.s1,
  spokeShapes.s2,
  spokeShapes.s3,
  spokeShapes.s4,
  spokeShapes.s5,
  spokeShapes.s6,
  spokeShapes.s7,
];

/**
 * Pull to refresh, as UIRefreshControl: pulling the content down past the
 * top reveals the indicator; pulling past the trigger starts a refresh with
 * the finger still down; letting go settles the content onto the refreshing
 * inset until the refresh ends.
 *
 * A finger's, a pen's or a mouse's drag pulls (spec:AST-094 FR43); a
 * trackpad's scroll and a wheel's do not. Under a finger (a coarse primary
 * pointer, on iOS and Android alike) it replaces the browser's own pull to
 * refresh near the top of the page. Always give people another way to refresh (a button that
 * calls `onRefresh` and sets `isRefreshing`), since a pull has no keyboard or
 * assistive-technology equivalent.
 *
 * @example
 * ```
 * <ScrollableArea label="Inbox" height="100%">
 *   <RefreshControl onRefresh={() => reload()} title="Updated just now">
 *     <List>…</List>
 *   </RefreshControl>
 * </ScrollableArea>
 * ```
 */
export function RefreshControl({
  children,
  title,
  onRefresh,
  isRefreshing,
  isDisabled,
  xstyle,
  className,
  style,
  ref,
  ...props
}: RefreshControlProps) {
  const control = useRefreshControl({onRefresh, isRefreshing, isDisabled});
  const rootRef = useMergedRefs(ref, control.contentRef);
  // The eight capsules, drawn once: each spoke shows the reveal's opacity
  // while the pull reveals it and its phase of the gradient while spinning
  // (at the trigger the hook fades a transient copy of them out over them).
  const spokes = Array.from({length: SPOKES}, (_, index) => (
    <span
      key={index}
      {...stylex.props(
        styles.spoke,
        SPOKE_SHAPES[index],
        styles.spokeOpacity(revealOpacity(index)),
      )}
    />
  ));
  return (
    <div
      ref={rootRef}
      aria-busy={control.isRefreshing || undefined}
      {...mergeProps(
        themeProps('refresh-control'),
        stylex.props(styles.root, xstyle),
        className,
        style,
      )}
      {...props}>
      {children}
      {/* After the content: a spinning indicator painted before the rows would
          have WebKit give every row after it a layer of its own. */}
      <div {...stylex.props(styles.indicatorClip)}>
        <div
          ref={control.indicatorRef}
          {...stylex.props(
            styles.indicator,
            styles.indicatorBand(REFRESH_HEIGHT),
          )}>
          {/* Decoration: the busy state and the announcement carry it. */}
          <span
            ref={control.spinnerRef}
            aria-hidden
            {...stylex.props(styles.glyph)}>
            {spokes}
          </span>
          {title != null ? (
            // A status line, so a new title (after a refresh) is announced.
            <span
              ref={control.titleRef}
              role="status"
              {...stylex.props(styles.title)}>
              {title}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
