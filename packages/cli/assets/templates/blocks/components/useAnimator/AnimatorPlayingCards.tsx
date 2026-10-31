// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useRef, useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {useAnimator, usePanGesture} from '@astryxdesign/core/hooks';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';

const DECK = [
  {rank: 'A', suit: '\u2660', name: 'Ace of spades'},
  {rank: 'K', suit: '\u2665', name: 'King of hearts'},
  {rank: 'Q', suit: '\u2663', name: 'Queen of clubs'},
  {rank: 'J', suit: '\u2666', name: 'Jack of diamonds'},
];

/** A release faster than this (px/s) throws the card away. */
const THROW_SPEED = 1000;
/** The slowest throw, so a thrown card always leaves the table. */
const MIN_THROW = 1600;

export default function AnimatorPlayingCards() {
  // One element, two hooks on its ref: the pan reports the drag, and the
  // animator moves the card.
  const ref = useRef<HTMLDivElement>(null);
  const animator = useAnimator(ref);
  const [top, setTop] = useState(0);
  const [status, setStatus] = useState('');
  // Where the card was when the drag caught it, mid-flight included.
  const origin = useRef({x: 0, y: 0});
  const card = DECK[top % DECK.length];

  // Announces the discard and deals the next card in place of the old one.
  const dealNext = async () => {
    setStatus(`${card.name} discarded`);
    setTop(index => index + 1);
    animator.set({x: 0, y: 0, rotate: 0, scale: 0.9, opacity: 0});
    await animator.animate({scale: 1, opacity: 1});
  };

  // Throws the card away on its release velocity, then deals the next one.
  const discard = async (velocity: {x: number; y: number}) => {
    const speed = Math.hypot(velocity.x, velocity.y);
    const boost = speed < MIN_THROW ? MIN_THROW / Math.max(speed, 1) : 1;
    const throwX = speed < 1 ? MIN_THROW : velocity.x * boost;
    // The card coasts on while it fades; once it is gone, the next card is
    // dealt in place, which ends the coast. A coast continues the person's
    // throw, so Reduce Motion keeps it.
    void animator.decay({x: throwX, y: velocity.y * boost});
    await animator.animate({opacity: 0});
    await dealNext();
  };

  // The button moves the card off on the state-change motion: a planned
  // move, which Reduce Motion turns into a fade where the card is.
  const discardWithButton = async () => {
    await animator.animate({x: 400, opacity: 0});
    await dealNext();
  };

  usePanGesture(ref, {
    onPan: ({state, translation, velocity}) => {
      if (state === 'began') {
        // The drag catches the card where it is.
        animator.stop();
        const {x, y} = animator.get();
        origin.current = {x, y};
        return;
      }
      const x = origin.current.x + translation.x;
      const y = origin.current.y + translation.y;
      if (state === 'changed') {
        // The card follows the finger, turning a little with the drag.
        animator.set({x, y, rotate: x / 18});
      } else if (state === 'ended' && Math.abs(velocity.x) > THROW_SPEED) {
        void discard(velocity);
      } else {
        // A gentle release, or a cancelled drag, springs back, carrying on as
        // it was let go.
        void animator.animate({x: 0, y: 0, rotate: 0}, {velocity});
      }
    },
  });

  return (
    <VStack gap={4} style={{maxWidth: 360, padding: 16}}>
      <Text type="body">
        Drag the card and let go. A gentle release springs it back; a quick
        flick throws it away.
      </Text>
      <div style={{height: 200, display: 'grid', placeItems: 'center'}}>
        <Card
          ref={ref}
          width={120}
          minHeight={170}
          style={{cursor: 'grab', userSelect: 'none'}}
          aria-label={card.name}>
          <VStack gap={1} hAlign="center" style={{paddingBlock: 40}}>
            <Text type="display-2" weight="bold">
              {card.rank}
            </Text>
            <Text type="display-3">{card.suit}</Text>
          </VStack>
        </Card>
      </div>
      <HStack gap={2}>
        <Button
          label={`Discard ${card.name}`}
          variant="secondary"
          onClick={() => void discardWithButton()}
        />
        <Button
          label="Shake"
          variant="ghost"
          onClick={() =>
            void animator.animate(
              {x: 0, rotate: 0},
              {velocity: {x: 900, rotate: 300}},
            )
          }
        />
      </HStack>
      <VisuallyHidden as="div" aria-live="polite">
        {status}
      </VisuallyHidden>
    </VStack>
  );
}
