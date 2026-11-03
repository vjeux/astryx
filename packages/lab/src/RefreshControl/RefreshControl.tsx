// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file RefreshControl.tsx
 * @input React, StyleX, Astryx core theme tokens and utilities,
 *   useRefreshControl
 * @output Exports RefreshControl and RefreshControlProps
 * @position Lab implementation; consumed by packages/lab/src/index.ts
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/lab/src/RefreshControl/RefreshControl.doc.mjs
 * - /packages/lab/src/RefreshControl/RefreshControl.test.tsx
 * - /packages/lab/src/RefreshControl/index.ts
 * - /apps/storybook/stories/RefreshControl.stories.tsx
 */

// The content itself is pulled. The indicator stays at the top of the scroll
// view in the gap that a pull opens, as UIRefreshControl does. The content's
// edge covers it on the way back. The optional title under the indicator is
// plain text, and a changed title is announced. The spinner is decoration.
//
// The indicator is UIRefreshControl's replicator, drawn from the refresh
// table. The pull reveals eight capsule spokes one after another, through a
// CSS custom property. Once the refresh starts, a gradient springs in and
// steps round clockwise every eighth of a second. Each capsule is one element:
// a layer in the text color, masked to its capsule already drawn at its angle.
// So nothing is resampled at rest. The hook runs the spin: each spoke steps
// its opacity on a compositor animation that keeps turning while a script
// runs.

import {useEffect, useRef, type ReactNode, type Ref} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '@astryxdesign/core';
import {useAnnounce, useMergedRefs} from '@astryxdesign/core/hooks';
import {refreshControl} from '@astryxdesign/core/internal/touch';
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
 * it. The layer's opacity is the reveal, and each spoke is fainter than the
 * one before by the alpha offset (reveal − 1). So the spokes fill in one after
 * another. At the trigger, every spoke is at full alpha.
 */
function revealOpacity(index: number): string {
  return `calc(${REVEAL} * clamp(0, 1 + ${index} * (${REVEAL} - 1), 1))`;
}

const styles = stylex.create({
  root: {
    position: 'relative',
  },
  // Rides on the content's top edge and clips the indicator to the gap above
  // it. So the content's edge covers the pinned indicator as it comes back.
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
  // One element per spoke, as large as the glyph. It is the text color masked
  // to the spoke's capsule at its angle, in its frame of the sprite.
  // `spokeFrames` picks the frame. The capsules are the table's: 3.67 pt wide
  // with 1.83 pt corners, from 5 to 15 pt out. RefreshControl.test.tsx
  // rebuilds the sprite from refresh.ts.
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
    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 30'%3E%3Crect x='13.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(0 15 15)'/%3E%3Crect x='43.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(45 45 15)'/%3E%3Crect x='73.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(90 75 15)'/%3E%3Crect x='103.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(135 105 15)'/%3E%3Crect x='133.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(180 135 15)'/%3E%3Crect x='163.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(225 165 15)'/%3E%3Crect x='193.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(270 195 15)'/%3E%3Crect x='223.165' y='0' width='3.67' height='10' rx='1.83' transform='rotate(315 225 15)'/%3E%3C/svg%3E")`,
    maskRepeat: 'no-repeat',
    maskSize: '800% 100%',
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
   * Text under the indicator, such as when the content was last updated. A
   * changed title is announced politely; the title it mounts with is not.
   */
  title?: ReactNode;
}

const LIVE_CONTAINER =
  '[role="log"], [role="status"], [role="alert"], [aria-live="polite"], [aria-live="assertive"]';

// Each spoke's frame of the sprite: spoke k drawn k × 45° clockwise from 12
// o'clock.
const spokeFrames = stylex.create({
  s0: {maskPosition: '0% 0%'},
  s1: {maskPosition: '14.2857% 0%'},
  s2: {maskPosition: '28.5714% 0%'},
  s3: {maskPosition: '42.8571% 0%'},
  s4: {maskPosition: '57.1429% 0%'},
  s5: {maskPosition: '71.4286% 0%'},
  s6: {maskPosition: '85.7143% 0%'},
  s7: {maskPosition: '100% 0%'},
});

/** Each spoke's frame, in spoke order. */
const SPOKE_FRAMES = [
  spokeFrames.s0,
  spokeFrames.s1,
  spokeFrames.s2,
  spokeFrames.s3,
  spokeFrames.s4,
  spokeFrames.s5,
  spokeFrames.s6,
  spokeFrames.s7,
];

/**
 * Pull to refresh, as UIRefreshControl. Pulling the content down past the top
 * reveals the indicator. Pulling past the trigger starts a refresh with the
 * finger still down. Letting go settles the content onto the refreshing inset
 * until the refresh ends.
 *
 * A finger's, a pen's or a mouse's drag pulls, and so does a trackpad's
 * two-finger scroll toward the top. Under a coarse primary pointer, on iOS and
 * Android alike, it replaces the browser's own pull to refresh near the top of
 * the page. Always give people another way to refresh, such as a button that
 * calls `onRefresh` and sets `isRefreshing`. A pull has no keyboard or
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
  const titleElement = useRef<HTMLSpanElement>(null);
  const titleRef = useMergedRefs(control.titleRef, titleElement);
  const announce = useAnnounce();
  // A live role on an element that mounts with its text is not reliably read.
  // So the title is plain text, and the shared announcer speaks a changed one.
  // A live container around the control speaks the change itself.
  const spokenTitle = useRef<string | null>(null);
  useEffect(() => {
    const element = titleElement.current;
    const text = (element?.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (
      spokenTitle.current != null &&
      text !== '' &&
      text !== spokenTitle.current &&
      element?.parentElement?.closest(LIVE_CONTAINER) == null
    ) {
      announce(text);
    }
    spokenTitle.current = text;
  }, [announce, title]);
  // The eight capsules, drawn once. Each spoke shows the reveal's opacity
  // during the pull, and its phase of the gradient while spinning.
  const spokes = Array.from({length: SPOKES}, (_, index) => (
    <span
      key={index}
      {...stylex.props(
        styles.spoke,
        SPOKE_FRAMES[index],
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
            <span ref={titleRef} {...stylex.props(styles.title)}>
              {title}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
