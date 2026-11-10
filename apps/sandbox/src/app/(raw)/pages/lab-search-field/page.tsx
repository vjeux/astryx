// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file page.tsx
 * @position Standalone phone page for the lab SearchField, outside any
 *   frame: a large title, the field under it and the results below.
 * @input ?dir=rtl lays the page out right to left (read on mount).
 * @output The screen, its field and the results its query keeps.
 */

'use client';

import {useEffect, useState} from 'react';
import {SearchField} from '@astryxdesign/lab';
import {Heading, Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

const FRUITS = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Coconut',
  'Grape',
  'Kiwi',
  'Lemon',
  'Mango',
  'Papaya',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Strawberry',
];

export default function LabSearchFieldPage() {
  const [query, setQuery] = useState('');
  // Syncs the document's direction with the URL's query, read after mount so
  // the static HTML hydrates as it is; restored on unmount.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('dir') !== 'rtl') {
      return;
    }
    const root = document.documentElement;
    const previous = root.dir;
    root.dir = 'rtl';
    return () => {
      root.dir = previous;
    };
  }, []);
  const results = FRUITS.filter(fruit =>
    fruit.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <VStack gap={2}>
      <VStack padding={4}>
        <Heading level={1}>Fruits</Heading>
      </VStack>
      <SearchField label="Search fruits" value={query} onChange={setQuery} />
      <VStack padding={4} gap={4}>
        {results.map(fruit => (
          <Text key={fruit}>{fruit}</Text>
        ))}
      </VStack>
    </VStack>
  );
}
