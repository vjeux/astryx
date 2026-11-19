// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file tablePressPlace.ts
 * @input The shared press controller (utils/pressFeedback.ts)
 * @output registerTablePressPlace: places a stretched control's press layer
 *   on the control's own box in a table row. It also places it in other
 *   layouts where the control's offsets do not count from the layer's
 *   containing block. Each place is kept until a size or a scroll in its row
 *   changes, so a repeat press reads nothing that lays the page out
 * @position A table's part of the press controller: a page with no table
 *   carries none of it
 */

import {installPlaceMeasure} from '../utils/pressFeedback';
import {parentAcrossShadow} from '../utils/flatTree';
import {sharedState} from '../utils/sharedRealm';
import {observeResize} from '../utils/sharedResizeObserver';

/** A measured place and what it depends on. */
interface Place {
  inset: string | null;
  /** The control's offset parent when it was measured. */
  parent: Element | null;
  /** The press layer's containing block, null for the initial one. */
  block: Element | null;
  /** The scroll offsets of the boxes between the control and the block. */
  scrolls: number[];
}

/**
 * Registered, so a swizzled table and the package keep one set of places. It
 * holds the places, the sizes the observer last reported, the boxes it watches
 * and their stops.
 */
const state = sharedState('table/table-press-place/state', 1, () => ({
  places: new WeakMap<HTMLElement, Place>(),
  sizes: new WeakMap<Element, string>(),
  watched: new WeakSet<Element>(),
  stops: [] as (() => void)[],
}));

/** Watching more boxes than this drops every place first. */
const MOST_WATCHED = 600;

/**
 * Installs the table's measurement into the shared press controller. A table
 * cell calls it as its module loads, so a page with no table carries none of
 * its code.
 */
export function registerTablePressPlace(): void {
  installPlaceMeasure(measure);
}

/**
 * The control's box in its press layers' containing block, as a CSS inset.
 * The offsets give it when they count from that block. A probe gives it in
 * every other layout. A kept place serves while the control keeps its offset
 * parent and the boxes between it and the block keep their scroll offsets.
 */
function measure(element: HTMLElement): string | null {
  const kept = state.places.get(element);
  if (
    kept != null &&
    kept.parent === element.offsetParent &&
    sameScrolls(scrollsBetween(element, kept.block), kept.scrolls)
  ) {
    return kept.inset;
  }
  const parent = element.offsetParent;
  const place: Place =
    parent instanceof HTMLElement && offsetsCountFrom(element, parent)
      ? {
          inset: offsetsInset(element, parent),
          parent,
          block: parent,
          scrolls: scrollsBetween(element, parent),
        }
      : probedPlace(element, parent);
  state.places.set(element, place);
  watch([element, parent, place.block, element.closest('table')]);
  return place.inset;
}

/** Watches the boxes a place depends on. */
function watch(boxes: (Element | null)[]): void {
  if (state.stops.length > MOST_WATCHED) {
    forget();
  }
  for (const box of boxes) {
    if (box != null && !state.watched.has(box)) {
      state.watched.add(box);
      state.stops.push(observeResize(box, resized));
    }
  }
}

/** A change of a watched box's size drops every place. */
function resized({target, contentRect}: ResizeObserverEntry): void {
  // The first call, on registration, carries no size.
  if (contentRect == null) {
    return;
  }
  const size = `${contentRect.width} ${contentRect.height}`;
  const seen = state.sizes.get(target);
  state.sizes.set(target, size);
  if (seen != null && seen !== size) {
    forget();
  }
}

/** Drops every kept place and stops watching. */
function forget(): void {
  for (const stop of state.stops.splice(0)) {
    stop();
  }
  state.places = new WeakMap();
  state.sizes = new WeakMap();
  state.watched = new WeakSet();
}

/** The scroll offsets of the boxes between the control and `block`. */
function scrollsBetween(element: HTMLElement, block: Element | null): number[] {
  const scrolls: number[] = [];
  for (
    let node = element.parentElement;
    node != null && node !== block;
    node = node.parentElement
  ) {
    scrolls.push(node.scrollTop, node.scrollLeft);
  }
  return scrolls;
}

function sameScrolls(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

/**
 * Whether the control's offsets count from its press layers' containing
 * block, in the layers' units. CSSOM View stops a static element's offset
 * parent at a table cell or a table that holds nothing. Offsets from the body
 * count from the initial containing block. The engines measure an inline or
 * table box in their own ways. Offsets do not move with a scrolled box
 * between, do not cross a slot, and do not follow a zoom.
 */
function offsetsCountFrom(element: HTMLElement, block: HTMLElement): boolean {
  const display = getComputedStyle(block).display;
  if (
    /^(?:td|th|table|body|html)$/.test(block.localName) ||
    display === 'inline' ||
    display.includes('table')
  ) {
    return false;
  }
  for (
    let node: HTMLElement | null = element;
    node !== block;
    node = node.parentElement
  ) {
    if (
      node == null ||
      parentAcrossShadow(node) !== node.parentElement ||
      hasOwnZoom(node) ||
      (node !== element && (node.scrollTop !== 0 || node.scrollLeft !== 0))
    ) {
      return false;
    }
  }
  return true;
}

function offsetsInset(element: HTMLElement, block: HTMLElement): string {
  const top = element.offsetTop;
  const left = element.offsetLeft;
  const bottom = block.clientHeight - top - element.offsetHeight;
  const right = block.clientWidth - left - element.offsetWidth;
  return `${top}px ${right}px ${bottom}px ${left}px`;
}

/**
 * Measures the control's box against a probe. The probe is a hidden child,
 * absolutely placed at no inset, with the press layer's containing block. Its
 * box is that block's padding box as the engine lays it out. Absolutely
 * placed, it moves nothing. It leaves at its window's next frame, before the
 * frame renders, so it never paints, and a hit test passes through it. In a
 * hidden page it stays until the page shows. Observers of the control's
 * children see it come and go. Boxes include transforms and zoom, and the inset
 * is in the layer's own pixels. Every read runs while the probe is in place,
 * and the probe stays for the rest of the task. A read after it leaves would
 * lay the page out again. The inset is null when the probe has no box.
 */
function probedPlace(element: HTMLElement, parent: Element | null): Place {
  const probe = element.ownerDocument.createElement('span');
  probe.style.cssText = PROBE_STYLE;
  element.append(probe);
  try {
    const block = probe.offsetParent;
    if (block == null) {
      return {inset: null, parent, block, scrolls: []};
    }
    const outer = probe.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    const size = getComputedStyle(probe);
    const scaleX = outer.width / parseFloat(size.width) || 1;
    const scaleY = outer.height / parseFloat(size.height) || 1;
    const top = (box.top - outer.top) / scaleY;
    const right = (outer.right - box.right) / scaleX;
    const bottom = (outer.bottom - box.bottom) / scaleY;
    const left = (box.left - outer.left) / scaleX;
    return {
      inset: `${top}px ${right}px ${bottom}px ${left}px`,
      parent,
      block,
      scrolls: scrollsBetween(element, block),
    };
  } finally {
    const view = element.ownerDocument.defaultView;
    if (view != null && typeof view.requestAnimationFrame === 'function') {
      view.requestAnimationFrame(() => probe.remove());
    } else {
      probe.remove();
    }
  }
}

/**
 * The probe's box is the press layer's: no box, size limit, transform or zoom
 * of its own, whatever a page's rules give a control's children.
 */
const PROBE_STYLE = [
  'position:absolute',
  'inset:0',
  'display:block',
  'margin:0',
  'padding:0',
  'border:none',
  'width:auto',
  'height:auto',
  'min-width:0',
  'min-height:0',
  'max-width:none',
  'max-height:none',
  'aspect-ratio:auto',
  'transform:none',
  'translate:none',
  'rotate:none',
  'scale:none',
  'zoom:1',
  'float:none',
  'visibility:hidden',
  'pointer-events:none',
]
  .map(declaration => `${declaration}!important`)
  .join(';');

/** Whether an element sets a zoom of its own. */
function hasOwnZoom(element: HTMLElement): boolean {
  const zoom = getComputedStyle(element).zoom;
  return zoom !== '' && zoom !== 'normal' && zoom !== '1';
}
