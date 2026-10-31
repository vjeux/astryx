// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file layerSlideRules.ts
 * @input A layer's placement and alignment
 * @output The `@position-try` rules for its span and slide options and their
 *   names, and the beside and fit options of a layer that must never settle
 *   over its anchor
 * @position Layer runtime geometry; the spans and the slide of
 *   spec:AST-059 FR4
 *
 * Two families of options, one for each way useLayer places a layer. A layer
 * that flows horizontally on a horizontally flowing page is placed by
 * `anchor()` insets (useLayer's `getAnchorInsets`), and so is every option of
 * its family (`anchor-` names) but `fit`: on each axis the room from the
 * anchor's edge to the viewport's far edge, aligned toward the anchor, or the
 * whole axis centered on the anchor. Each sets all four insets and both
 * alignments, so nothing of the base position carries over. Any other layer
 * is placed by a `position-area`, and so are its options (the unprefixed
 * names): the engines resolve logical insets differently once a layer's
 * writing mode is orthogonal to its containing block's.
 *
 * A span option (a centered layer's fallback) lands on one physical side,
 * aligned to the anchor's edge on the other axis, and keeps the base margins.
 *
 * The slide is a position option that spans the whole alignment axis, so a
 * layer wider than the room beside its trigger on both sides still reaches
 * the side of the trigger that has room on the placement axis. The base
 * margins belong to an edge-aligned layer: the alignment-axis gutter on one
 * edge only, and the clearance/gutter pair of the base side on the placement
 * axis. Each slide option therefore carries its own margins — the gutter on
 * both alignment-axis edges, and the clearance facing the anchor with the
 * gutter on the far edge of the side it lands on.
 *
 * A layer that must never settle over its anchor (spec:AST-059 FR4, Tooltip)
 * has a second fallback list, for when its settled box covers its anchor:
 * content taller than the room above and below its trigger. `beside` lands on a
 * side across the alignment axis, spanning the whole block axis, at the
 * content's own inline size, so it fits only where the layer fits without
 * squeezing. `fit` lands above or below sized to the room on that side, so
 * overflow scrolls inside the layer, and is never smaller than half of the room
 * the trigger leaves on the block axis, so it fits only on the side with more
 * room; the list tries both only after the layer's own position, `beside` and
 * the opposite side at the layer's own size, so only content taller than the
 * room on both sides is sized to a room. No option is sized to whatever room
 * is left: a browser keeps a layer on the option it last used for as long as
 * that option still fits, so such an option would hold an open layer on a side
 * shrunk to a sliver after its anchor moved. Chromium applies a position
 * option's width and height properties but not their min/max forms, so the
 * sizes are `inline-size` and `block-size`.
 *
 * The rules are static — the anchor clearance travels through a custom
 * property — so one style sheet per document carries all of them. It is
 * installed from a layout effect, before the layer's first paint, rather than
 * through StyleX, whose `positionTry()` output is malformed in the pinned
 * release. The sheet lives in the document head, not beside or inside the
 * layer: a sibling would change what a parent's last child is, and text
 * inside a role-bearing layer would name it to assistive technology.
 */

import type {LayerAlignment, LayerPlacement} from './useLayer';
import {layerViewportInset} from './layerViewportInset.stylex';

/** The custom property a layer writes its anchor clearance to. */
export const LAYER_CLEARANCE_PROPERTY = '--_astryx-layer-clearance';

/**
 * The overflow keyword the span and fit options align with: `unsafe` while
 * the anchor is out of the viewport (spec:AST-059 FR5), so no option shifts
 * the layer toward the viewport; unset otherwise.
 */
export const LAYER_PIN_PROPERTY = '--_astryx-layer-pin';

/**
 * The alignment-axis alignment of a slide option: `anchor-center` unless the
 * anchor is out of the viewport, when it is the layer's own pinned alignment
 * (spec:AST-059 FR5).
 */
export const LAYER_SLIDE_ALIGN_PROPERTY = '--_astryx-layer-slide-align';

const PIN = `var(${LAYER_PIN_PROPERTY},)`;
const SLIDE_ALIGN = `var(${LAYER_SLIDE_ALIGN_PROPERTY},anchor-center)`;

type Side = 'same' | 'opposite';

/** The name of an area-placed layer's slide option. */
export function slideRuleName(
  placement: LayerPlacement,
  alignment: LayerAlignment,
  side: Side,
): string {
  return `--astryx-layer-slide-${placement}-${alignment}-${side}`;
}

/** The name of an inset-placed layer's slide option. */
export function insetSlideRuleName(
  placement: LayerPlacement,
  alignment: LayerAlignment,
  side: Side,
): string {
  return `--astryx-layer-anchor-slide-${placement}-${alignment}-${side}`;
}

const CLEARANCE = `var(${LAYER_CLEARANCE_PROPERTY}, 0px)`;

/** Two declarations: the `env()`-less fallback first, then the full value. */
function pair(property: string, fallback: string, value: string): string {
  return `${property}:${fallback};${property}:${value};`;
}

function blockGutter(property: string): string {
  return pair(
    property,
    layerViewportInset.gutterBlockFallback,
    layerViewportInset.gutterBlock,
  );
}

function inlineGutter(property: string): string {
  return pair(
    property,
    layerViewportInset.gutterInlineFallback,
    layerViewportInset.gutterInline,
  );
}

const OPPOSITE: Record<LayerPlacement, LayerPlacement> = {
  above: 'below',
  below: 'above',
  start: 'end',
  end: 'start',
};

function areaFor(placement: LayerPlacement): string {
  switch (placement) {
    case 'above':
      return 'self-block-start span-all';
    case 'below':
      return 'self-block-end span-all';
    case 'start':
      return 'self-inline-start span-all';
    case 'end':
      return 'self-inline-end span-all';
  }
}

/**
 * The placement-axis insets and alignment of a layer resting on `placement`'s
 * side, across the whole alignment axis with `across` as its alignment there.
 */
function landing(placement: LayerPlacement, across: string): string {
  switch (placement) {
    case 'above':
      return `inset-block-start:0;inset-block-end:anchor(self-start);align-self:${PIN} self-end;justify-self:${across};`;
    case 'below':
      return `inset-block-start:anchor(self-end);inset-block-end:0;align-self:${PIN} self-start;justify-self:${across};`;
    case 'start':
      return `inset-inline-start:0;inset-inline-end:anchor(self-start);justify-self:${PIN} self-end;align-self:${across};`;
    case 'end':
      return `inset-inline-start:anchor(self-end);inset-inline-end:0;justify-self:${PIN} self-start;align-self:${across};`;
  }
}

/** A physical side of the anchor, as the span options name them. */
export type PhysicalSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * The name of the span option that lands on `side` of the anchor, from the
 * anchor's opposite edge across `span`'s side of the other axis.
 */
export function spanRuleName(side: PhysicalSide, span: PhysicalSide): string {
  return `--astryx-layer-span-${side}-${span}`;
}

/** The insets and alignment that put a layer on `side` of its anchor. */
function sideInsets(side: PhysicalSide): string {
  switch (side) {
    case 'top':
      return `top:0;bottom:anchor(top);align-self:${PIN} end;`;
    case 'bottom':
      return `top:anchor(bottom);bottom:0;align-self:${PIN} start;`;
    case 'left':
      return `left:0;right:anchor(left);justify-self:${PIN} right;`;
    case 'right':
      return `left:anchor(right);right:0;justify-self:${PIN} left;`;
  }
}

/**
 * The insets and alignment that align a layer to its anchor's edge and run it
 * toward `span` (`span-left`: the anchor's right edge, toward the left).
 */
function spanInsets(span: PhysicalSide): string {
  switch (span) {
    case 'left':
      return `left:0;right:anchor(right);justify-self:${PIN} right;`;
    case 'right':
      return `left:anchor(left);right:0;justify-self:${PIN} left;`;
    case 'top':
      return `top:0;bottom:anchor(bottom);align-self:${PIN} end;`;
    case 'bottom':
      return `top:anchor(top);bottom:0;align-self:${PIN} start;`;
  }
}

function spanRule(side: PhysicalSide, span: PhysicalSide): string {
  return `@position-try ${spanRuleName(side, span)}{${sideInsets(side)}${spanInsets(span)}}`;
}

const SPANS: ReadonlyArray<[PhysicalSide, PhysicalSide]> = [
  ['top', 'left'],
  ['top', 'right'],
  ['bottom', 'left'],
  ['bottom', 'right'],
  ['left', 'top'],
  ['left', 'bottom'],
  ['right', 'top'],
  ['right', 'bottom'],
];

/** The placement-axis margins for a layer resting on `placement`'s side. */
function placementMargins(placement: LayerPlacement): string {
  switch (placement) {
    case 'above':
      return `margin-block-end:${CLEARANCE};${blockGutter('margin-block-start')}`;
    case 'below':
      return `margin-block-start:${CLEARANCE};${blockGutter('margin-block-end')}`;
    case 'start':
      return `margin-inline-end:${CLEARANCE};${inlineGutter('margin-inline-start')}`;
    case 'end':
      return `margin-inline-start:${CLEARANCE};${inlineGutter('margin-inline-end')}`;
  }
}

/** The alignment-axis gutter on both edges, with the base inset reset. */
function alignmentMargins(placement: LayerPlacement): string {
  return placement === 'above' || placement === 'below'
    ? `${inlineGutter('margin-inline-start')}${inlineGutter('margin-inline-end')}inset-inline-start:0;inset-inline-end:0;`
    : `${blockGutter('margin-block-start')}${blockGutter('margin-block-end')}inset-block-start:0;inset-block-end:0;`;
}

function rule(
  placement: LayerPlacement,
  alignment: LayerAlignment,
  side: Side,
): string {
  const lands = side === 'same' ? placement : OPPOSITE[placement];
  return `@position-try ${slideRuleName(placement, alignment, side)}{position-area:${areaFor(lands)};${placementMargins(lands)}${alignmentMargins(lands)}}`;
}

function insetRule(
  placement: LayerPlacement,
  alignment: LayerAlignment,
  side: Side,
): string {
  const lands = side === 'same' ? placement : OPPOSITE[placement];
  return `@position-try ${insetSlideRuleName(placement, alignment, side)}{${placementMargins(lands)}${alignmentMargins(lands)}${landing(lands, SLIDE_ALIGN)}}`;
}

const PLACEMENTS: ReadonlyArray<LayerPlacement> = [
  'above',
  'below',
  'start',
  'end',
];
const ALIGNMENTS: ReadonlyArray<LayerAlignment> = ['start', 'center', 'end'];

/** The name of the `beside` option that lands on `side`, across the block axis. */
export function besideRuleName(side: 'start' | 'end'): string {
  return `--astryx-layer-beside-${side}`;
}

/** The `beside` option of an inset-placed layer. */
export function insetBesideRuleName(side: 'start' | 'end'): string {
  return `--astryx-layer-anchor-beside-${side}`;
}

/**
 * The name of the `fit` option that lands on `side` sized to the room there,
 * which fits only while that side holds at least half of the room the trigger
 * leaves on the block axis.
 */
export function fitRuleName(side: 'above' | 'below'): string {
  return `--astryx-layer-fit-${side}`;
}

/** The `fit` option of an inset-placed layer. */
export function insetFitRuleName(side: 'above' | 'below'): string {
  return `--astryx-layer-anchor-fit-${side}`;
}

/**
 * `beside`: the slide's geometry on an inline side, at the content's own
 * inline size. A content-sized layer would otherwise wrap to whatever sliver
 * of room the trigger leaves and always fit.
 */
function besideRule(side: 'start' | 'end'): string {
  return `@position-try ${besideRuleName(side)}{position-area:${areaFor(side)};${placementMargins(side)}${alignmentMargins(side)}inline-size:max-content;}`;
}

function insetBesideRule(side: 'start' | 'end'): string {
  return `@position-try ${insetBesideRuleName(side)}{${placementMargins(side)}${alignmentMargins(side)}${landing(side, `${PIN} anchor-center`)}inline-size:max-content;}`;
}

/**
 * Half of the room the trigger leaves on the block axis, minus one side's
 * margins and one pixel: a side whose room is at least this much is the
 * roomier side. The pixel lets both sides fit when the trigger sits at the
 * viewport's middle, where rounding could otherwise fail both.
 */
function halfRoom(viewport: string, gutter: string): string {
  return `calc((${viewport} - anchor-size(block)) / 2 - ${CLEARANCE} - ${gutter} - 1px)`;
}

/** The area a `fit` option takes: its block side, across the inline axis. */
function fitArea(side: 'above' | 'below'): string {
  return side === 'above'
    ? 'self-block-start span-all'
    : 'self-block-end span-all';
}

/** The block size of the room on one block side: the area minus its margins. */
function roomCap(gutter: string): string {
  return `calc(100% - ${CLEARANCE} - ${gutter})`;
}

/**
 * `fit`: the slide's geometry on a block side, sized to the room on that
 * side; the layer scrolls what does not fit (FR3). It is at least half of the
 * room the trigger leaves, so it overflows, and does not fit, on the side
 * with less room.
 *
 * The one option placed by a `position-area`: its size is a percentage of the
 * room on its side, which only an area gives a percentage base, and an option
 * fits only inside its own containing block, so an inset reaching past the
 * viewport could not make it overflow. It is in effect only while a layer
 * taller than the room on both sides is shown. It resets the insets and the
 * alignment the layer's own position sets.
 */
function fitRule(side: 'above' | 'below'): string {
  const size = (viewport: string, gutter: string) =>
    `max(${roomCap(gutter)}, ${halfRoom(viewport, gutter)})`;
  const blockSize = pair(
    'block-size',
    size('100vh', layerViewportInset.gutterBlockFallback),
    size('100dvb', layerViewportInset.gutterBlock),
  );
  return `@position-try ${fitRuleName(side)}{position-area:${areaFor(side)};${placementMargins(side)}${alignmentMargins(side)}${blockSize}}`;
}

function insetFitRule(side: 'above' | 'below'): string {
  const size = (viewport: string, gutter: string) =>
    `max(${roomCap(gutter)}, ${halfRoom(viewport, gutter)})`;
  const blockSize = pair(
    'block-size',
    size('100vh', layerViewportInset.gutterBlockFallback),
    size('100dvb', layerViewportInset.gutterBlock),
  );
  return `@position-try ${insetFitRuleName(side)}{position-area:${fitArea(side)};inset-block-start:0;inset-block-end:0;align-self:normal;justify-self:var(${LAYER_SLIDE_ALIGN_PROPERTY},normal);${placementMargins(side)}${alignmentMargins(side)}${blockSize}}`;
}

/**
 * The fallback list of a layer that must never settle over its anchor, once
 * the standard list has failed it (FR4). After the layer's own position (the
 * preferred block side, at its own size): beside the trigger on the inline
 * end, then the inline start, then the opposite block side at its own size,
 * and only then the preferred block side and the opposite one sized to the
 * room there, each only while it is the roomier side. Every option before the
 * last two keeps the layer at its own size, so a layer whose content fits
 * somewhere is never stretched to a room; the last two are for content taller
 * than the room on both sides. Chromium tries no more than five options, so
 * this replaces the standard list rather than extending it. Side placements
 * already slide along the block axis at full height, so they have none.
 */
export function getAnchorClearFallbacks(placement: LayerPlacement): string {
  if (placement !== 'above' && placement !== 'below') {
    return '';
  }
  const opposite = placement === 'above' ? 'below' : 'above';
  return `${besideRuleName('end')}, ${besideRuleName('start')}, flip-block, ${fitRuleName(placement)}, ${fitRuleName(opposite)}`;
}

/** `getAnchorClearFallbacks` for an inset-placed layer. */
export function getInsetAnchorClearFallbacks(
  placement: LayerPlacement,
): string {
  if (placement !== 'above' && placement !== 'below') {
    return '';
  }
  const opposite = placement === 'above' ? 'below' : 'above';
  return `${insetBesideRuleName('end')}, ${insetBesideRuleName('start')}, flip-block, ${insetFitRuleName(placement)}, ${insetFitRuleName(opposite)}`;
}

/** The custom property a layer writes its anchor-clear fallback list to. */
export const LAYER_CLEAR_FALLBACKS_PROPERTY = '--_astryx-layer-clear-fallbacks';

/** The custom property its `position-try-fallbacks` reads first. */
export const LAYER_TRY_FALLBACKS_PROPERTY = '--_astryx-layer-try-fallbacks';

/**
 * The attribute the runtime sets on a layer whose settled box covered its
 * anchor; it switches the layer to its anchor-clear list.
 */
export const LAYER_CLEARS_ANCHOR_ATTRIBUTE = 'data-astryx-clears-anchor';

/**
 * The attribute the runtime sets on a layer that keeps its anchor clear while
 * its content overflows the box it was given; only then does it scroll, so a
 * layer that fits stays a plain box and a wheel over it still scrolls the
 * page.
 */
export const LAYER_SCROLLS_ATTRIBUTE = 'data-astryx-layer-scrolls';

/**
 * Switches a layer that set the attribute to its anchor-clear list, and lets
 * a layer whose content overflows scroll it.
 */
function clearSwitchCss(): string {
  return `[${LAYER_CLEARS_ANCHOR_ATTRIBUTE}]{${LAYER_TRY_FALLBACKS_PROPERTY}:var(${LAYER_CLEAR_FALLBACKS_PROPERTY});}[${LAYER_SCROLLS_ATTRIBUTE}]{overflow-y:auto;overscroll-behavior-block:contain;}`;
}

/**
 * Every slide rule, for every placement and alignment, the span rules, and
 * the beside and fit rules.
 */
export function slideRulesCss(): string {
  return [
    ...PLACEMENTS.flatMap(placement =>
      ALIGNMENTS.flatMap(alignment => [
        rule(placement, alignment, 'same'),
        rule(placement, alignment, 'opposite'),
        insetRule(placement, alignment, 'same'),
        insetRule(placement, alignment, 'opposite'),
      ]),
    ),
    ...SPANS.map(([side, span]) => spanRule(side, span)),
    besideRule('end'),
    besideRule('start'),
    insetBesideRule('end'),
    insetBesideRule('start'),
    fitRule('above'),
    fitRule('below'),
    insetFitRule('above'),
    insetFitRule('below'),
    clearSwitchCss(),
  ].join('');
}

export const SLIDE_RULES_ID = 'astryx-layer-slide-rules';

/**
 * Install the slide rules in a document once. Idempotent; a second layer, or
 * a layer in another document (an iframe), finds or adds its own sheet.
 */
export function ensureSlideRules(doc: Document): void {
  if (doc.getElementById(SLIDE_RULES_ID)) {
    return;
  }
  const style = doc.createElement('style');
  style.id = SLIDE_RULES_ID;
  style.textContent = slideRulesCss();
  doc.head.appendChild(style);
}
