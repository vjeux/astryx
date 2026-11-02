// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {createAnimator, createPanGesture} from '@astryxdesign/core';

const DECK = [
  {face: 'A\u2660', name: 'Ace of spades'},
  {face: 'K\u2665', name: 'King of hearts'},
  {face: 'Q\u2663', name: 'Queen of clubs'},
  {face: 'J\u2666', name: 'Jack of diamonds'},
];
/** A release faster than this (px/s) throws the card away. */
const THROW_SPEED = 1000;
/** The slowest throw, so a thrown card always leaves the table. */
const MIN_THROW = 1600;

/**
 * A deck on a table, in plain JavaScript: no React below this line. It
 * returns a function that takes it down again.
 */
function mountDeck(table: HTMLElement, discardButton: HTMLButtonElement) {
  let top = 0;
  const card = document.createElement('div');
  card.textContent = DECK[0].face;
  // An image's name is all a screen reader announces, so it names the card.
  card.setAttribute('role', 'img');
  card.setAttribute('aria-label', DECK[0].name);
  Object.assign(card.style, {
    width: '120px',
    height: '170px',
    display: 'grid',
    placeItems: 'center',
    font: 'bold 40px system-ui, sans-serif',
    // The theme's surface and text, so the rank reads in light and dark.
    borderRadius: 'var(--radius-container)',
    backgroundColor: 'var(--color-background-surface)',
    color: 'var(--color-text-primary)',
    boxShadow: '0 2px 8px var(--color-shadow)',
    cursor: 'grab',
    userSelect: 'none',
  });
  // Announces each discard to screen readers.
  const status = document.createElement('div');
  status.setAttribute('aria-live', 'polite');
  Object.assign(status.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  });
  table.append(card, status);
  const animator = createAnimator(card);
  // One discard at a time: a press while a card leaves deals no second card.
  let isDiscarding = false;
  /** The drag in progress met a discard: the rest of it moves nothing. */
  let isIgnoringDrag = false;

  // Announces the discard and deals the next card in place of the old one.
  async function dealNext() {
    status.textContent = `${DECK[top % DECK.length].name} discarded`;
    top += 1;
    const next = DECK[top % DECK.length];
    card.textContent = next.face;
    card.setAttribute('aria-label', next.name);
    animator.set({x: 0, y: 0, rotate: 0, scale: 0.9, opacity: 0});
    isDiscarding = false;
    await animator.animate({scale: 1, opacity: 1});
  }

  async function discard(vx: number, vy: number) {
    if (isDiscarding) {
      return;
    }
    isDiscarding = true;
    isIgnoringDrag = true;
    const speed = Math.hypot(vx, vy);
    const boost = speed < MIN_THROW ? MIN_THROW / Math.max(speed, 1) : 1;
    // The card coasts on while it fades; once it is gone, the next card is
    // dealt in place, which ends the coast. A coast continues the person's
    // throw, so Reduce Motion keeps it.
    void animator.decay({x: speed < 1 ? MIN_THROW : vx * boost, y: vy * boost});
    await animator.animate({opacity: 0});
    await dealNext();
  }

  // The drag comes from Core's pan. It claims at 10 pt and reports the
  // release velocity for a finger, a mouse and a pen.
  let origin = {x: 0, y: 0};
  const pan = createPanGesture(card, {
    onPan: ({state, translation, velocity}) => {
      if (state === 'began') {
        // A drag that meets a discard is ignored to its end.
        isIgnoringDrag = isDiscarding;
        if (!isIgnoringDrag) {
          animator.stop();
          // A drag that begins while the dealt card grows in finishes the
          // deal, which the stop halted.
          void animator.animate({scale: 1, opacity: 1});
          const {x, y} = animator.get();
          origin = {x, y};
        }
      }
      if (isIgnoringDrag) {
        return;
      }
      if (state === 'began' || state === 'changed') {
        const x = origin.x + translation.x;
        const y = origin.y + translation.y;
        animator.set({x, y, rotate: x / 18});
      } else if (state === 'ended' && Math.abs(velocity.x) > THROW_SPEED) {
        void discard(velocity.x, velocity.y);
      } else {
        // A gentle release springs back, carrying on as it was let go. A
        // cancelled drag was not let go: its velocity is 0.
        void animator.animate({x: 0, y: 0, rotate: 0}, {velocity});
      }
    },
  });
  // The button moves the card off on the state-change motion: a planned
  // move, which Reduce Motion turns into a fade where the card is.
  async function discardWithButton() {
    if (isDiscarding) {
      return;
    }
    isDiscarding = true;
    // A drag in progress moves nothing more.
    isIgnoringDrag = true;
    await animator.animate({x: 400, opacity: 0});
    await dealNext();
  }
  const onDiscard = () => void discardWithButton();

  discardButton.addEventListener('click', onDiscard);
  return () => {
    discardButton.removeEventListener('click', onDiscard);
    pan.destroy();
    animator.destroy();
    card.remove();
    status.remove();
  };
}

/**
 * Mounts the deck when the wrapper attaches, and takes it down when it
 * detaches: its cleanup is the callback ref's.
 */
function mountTable(wrapper: HTMLDivElement | null) {
  if (wrapper == null) {
    return undefined;
  }
  const table = wrapper.firstElementChild as HTMLElement;
  const button = wrapper.querySelector('button') as HTMLButtonElement;
  return mountDeck(table, button);
}

export default function AnimatorPlayingCardsVanilla() {
  return (
    <div
      ref={mountTable}
      style={{display: 'grid', gap: 16, padding: 16, maxWidth: 360}}>
      <div style={{height: 200, display: 'grid', placeItems: 'center'}} />
      <button type="button">Discard the top card</button>
    </div>
  );
}
