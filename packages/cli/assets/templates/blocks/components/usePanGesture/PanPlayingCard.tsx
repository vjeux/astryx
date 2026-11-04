// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useRef, useState} from 'react';
import {flushSync} from 'react-dom';
import {usePanGesture} from '@astryxdesign/core/hooks';

const DECK = [
  {face: 'A\u2660', name: 'Ace of spades'},
  {face: 'K\u2665', name: 'King of hearts'},
  {face: 'Q\u2663', name: 'Queen of clubs'},
  {face: 'J\u2666', name: 'Jack of diamonds'},
];
/** A release faster than this (px/s) throws the card away. */
const THROW_SPEED = 1000;
/** How far a thrown card travels while it fades, px. */
const THROW_DISTANCE = 160;
const SETTLE = 'translate 300ms cubic-bezier(0.2, 0.9, 0.3, 1.2)';
const THROW = 'translate 250ms ease-in, opacity 250ms ease-in';

/** Moves the card, with a transition unless the person reduces motion. */
function moveCard(card: HTMLElement, x: number, y: number, transition: string) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  card.style.transition = reduced ? 'none' : transition;
  card.style.translate = `${x}px ${y}px`;
}

/** Throws the card off to one side as it fades, then calls `onGone`. */
function throwCard(card: HTMLElement, direction: number, onGone: () => void) {
  moveCard(card, direction * THROW_DISTANCE, 0, THROW);
  card.style.opacity = '0';
  if (card.style.transition === 'none') {
    onGone();
  } else {
    card.addEventListener('transitionend', onGone, {once: true});
  }
}

/** Shows the card again at the center, with no transition. */
function resetCard(card: HTMLElement) {
  moveCard(card, 0, 0, 'none');
  card.style.opacity = '1';
}

export default function PanPlayingCard() {
  const card = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  /** A throw is in flight: the next card is dealt when it ends. */
  const throwing = useRef(false);
  /** The drag in progress met a throw: the rest of it moves nothing. */
  const ignoringDrag = useRef(false);

  function discard(direction: number) {
    const element = card.current;
    // One throw at a time: a second Discard during it would deal twice.
    if (element == null || throwing.current) {
      return;
    }
    throwing.current = true;
    // The drag in progress, if any, moves nothing more.
    ignoringDrag.current = true;
    throwCard(element, direction, () => {
      throwing.current = false;
      // Commit the next card's face first. A reset before that paints the
      // discarded card back at the center for one frame.
      flushSync(() => {
        setAnnouncement(`${DECK[top % DECK.length].name} discarded`);
        setTop(value => value + 1);
      });
      resetCard(element);
    });
  }

  // The drag writes the card's style in onPan: no render per move.
  usePanGesture(card, {
    onPan: ({state, translation, velocity}) => {
      const element = card.current;
      // A drag that meets a throw is ignored to its end. Its moves would
      // cancel the throw's transitions, and the next card would jump to it.
      if (state === 'began') {
        ignoringDrag.current = throwing.current;
      }
      if (element == null || ignoringDrag.current) {
        return;
      }
      if (state === 'began' || state === 'changed') {
        moveCard(element, translation.x, translation.y, 'none');
      } else if (state === 'ended' && Math.abs(velocity.x) > THROW_SPEED) {
        discard(Math.sign(velocity.x));
      } else {
        moveCard(element, 0, 0, SETTLE);
      }
    },
  });

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        padding: 16,
        width: 'min(360px, 80vw)',
      }}>
      <div
        style={{
          height: 280,
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}>
        <div
          ref={card}
          // An image's name is all a screen reader announces, so it names the
          // card.
          role="img"
          aria-label={DECK[top % DECK.length].name}
          style={{
            width: 80,
            height: 112,
            display: 'grid',
            placeItems: 'center',
            font: 'bold 28px system-ui, sans-serif',
            borderRadius: 10,
            backgroundColor: 'var(--color-background-surface)',
            color: 'var(--color-text-primary)',
            boxShadow: '0 2px 8px rgb(0 0 0 / 0.2)',
            cursor: 'grab',
            userSelect: 'none',
          }}>
          {DECK[top % DECK.length].face}
        </div>
      </div>
      {/* The drag's keyboard and assistive-technology path (WCAG 2.5.7). */}
      <button type="button" onClick={() => discard(1)}>
        Discard the top card
      </button>
      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clipPath: 'inset(50%)',
          whiteSpace: 'nowrap',
        }}>
        {announcement}
      </div>
    </div>
  );
}
