// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file page.tsx
 * @position Chat Layout: a full page ChatLayout with no sandbox chrome, for
 *   phone keyboard and touch checks. ChatLayout's transcript keeps its own
 *   scroller, and the composer docks at the bottom of the visible viewport.
 * @input None.
 * @output A long transcript and a composer that adds each sent message.
 */

'use client';

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  ChatComposer,
  ChatComposerInput,
  ChatLayout,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
  ChatSystemMessage,
} from '@astryxdesign/core/Chat';
import {Markdown} from '@astryxdesign/core/Markdown';
import {VStack} from '@astryxdesign/core/Stack';

const styles = stylex.create({
  page: {height: '100dvh'},
});

interface Message {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
}

const SEED_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'user',
    text: 'Can you help me plan a weekend trip to the coast?',
  },
  {
    id: 2,
    sender: 'assistant',
    text: 'Sure. A two-day trip works well: arrive on Saturday morning, walk the cliffs in the afternoon, and keep Sunday for the harbor and the market.',
  },
  {
    id: 3,
    sender: 'user',
    text: 'What should I pack for changeable weather?',
  },
  {
    id: 4,
    sender: 'assistant',
    text: 'Pack layers: a light rain jacket, a warm sweater and shoes with good grip. The wind on the cliffs is often stronger than in town.',
  },
  {id: 5, sender: 'user', text: 'Is there a good place to watch the sunset?'},
  {
    id: 6,
    sender: 'assistant',
    text: 'The headland past the lighthouse faces west. Get there about 30 minutes early, because the path is narrow and the light changes fast.',
  },
  {id: 7, sender: 'user', text: 'And somewhere to eat after that?'},
  {
    id: 8,
    sender: 'assistant',
    text: 'The harbor has a few small seafood places. Most close their kitchens at 9, so book a table for the evening if you can.',
  },
  {id: 9, sender: 'user', text: 'How early does the market open on Sunday?'},
  {
    id: 10,
    sender: 'assistant',
    text: 'It opens at 8. The bakery stalls sell out first, so go early and leave the harbor walk for later in the morning.',
  },
  {id: 11, sender: 'user', text: 'Can I get there by train?'},
  {
    id: 12,
    sender: 'assistant',
    text: 'Yes. The coast line runs every hour, and the station is a ten minute walk from the harbor. Trains on Sunday evening fill up, so take an earlier one home.',
  },
];

export default function ChatLayoutPage() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const send = (text: string) => {
    setMessages(previous => [
      ...previous,
      {id: previous.length + 1, sender: 'user', text},
    ]);
  };

  return (
    <VStack xstyle={styles.page}>
      <ChatLayout
        composer={
          <ChatComposer
            onSubmit={send}
            input={<ChatComposerInput placeholder="Message" />}
          />
        }>
        <ChatMessageList>
          <ChatSystemMessage variant="divider">Today</ChatSystemMessage>
          {messages.map(message =>
            message.sender === 'user' ? (
              <ChatMessage key={message.id} sender="user">
                <ChatMessageBubble>{message.text}</ChatMessageBubble>
              </ChatMessage>
            ) : (
              <ChatMessage key={message.id} sender="assistant">
                <Markdown density="compact">{message.text}</Markdown>
              </ChatMessage>
            ),
          )}
        </ChatMessageList>
      </ChatLayout>
    </VStack>
  );
}
