// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file page.tsx
 * @position Tokenizer touch: an unframed page for checking the inline
 *   Tokenizer field with a phone's on-screen keyboard. The field sets
 *   presentation="popover", so a phone shows the inline field, as a tablet
 *   does, instead of the bottom-sheet field. The document itself scrolls,
 *   and the field sits in the middle of the page.
 * @input Tokenizer
 * @output A tall page with one inline Tokenizer holding three tokens
 */

'use client';

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Tokenizer} from '@astryxdesign/core/Tokenizer';
import type {SearchableItem, SearchSource} from '@astryxdesign/core/Typeahead';

const people: SearchableItem[] = [
  {id: '1', label: 'Alice Johnson'},
  {id: '2', label: 'Bob Smith'},
  {id: '3', label: 'Charlie Brown'},
  {id: '4', label: 'Diana Prince'},
  {id: '5', label: 'Eve Williams'},
  {id: '6', label: 'Frank Miller'},
];

const peopleSource: SearchSource = {
  search: (query: string) =>
    people.filter(person =>
      person.label.toLowerCase().includes(query.toLowerCase()),
    ),
  bootstrap: () => people,
};

const styles = stylex.create({
  intro: {minHeight: '40dvh'},
  tail: {minHeight: '60dvh'},
});

export default function TokenizerTouchPage() {
  const [value, setValue] = useState<SearchableItem[]>(people.slice(0, 3));
  return (
    <VStack gap={4} padding={4}>
      <VStack gap={2} xstyle={styles.intro}>
        <Heading level={3}>Tokenizer on a touch screen</Heading>
        <Text type="supporting" color="secondary">
          The inline field, as a tablet shows it. Remove a token with its ×: the
          keyboard stays down.
        </Text>
      </VStack>
      <Tokenizer
        label="Team members"
        placeholder="Search people"
        searchSource={peopleSource}
        value={value}
        onChange={setValue}
        presentation="popover"
      />
      <VStack xstyle={styles.tail} />
    </VStack>
  );
}
