// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file page.tsx
 * @input `?case=` (one of the ids in caseIds.ts; the first by default)
 * @output A bare page with one swipe actions case, a mail List long enough
 *   that the document scrolls
 * @position A raw page, with no sandbox chrome, for checking swipe actions on
 *   a phone. The page scrolls with the document, as an app's page does.
 */

import {Suspense} from 'react';
import {useSearchParams} from 'react-router-dom';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Link} from '@astryxdesign/core/Link';
import {Heading, Text} from '@astryxdesign/core/Text';
import {SwipeActionsCase} from './cases';
import {
  parseSwipeActionsCase,
  SWIPE_ACTIONS_CASE_LABELS,
  SWIPE_ACTIONS_CASES,
} from './caseIds';

function SwipeActionsCases() {
  const [searchParams] = useSearchParams();
  const id = parseSwipeActionsCase(searchParams.get('case'));
  return (
    <VStack gap={4} padding={4}>
      <VStack gap={1}>
        <Heading level={1}>Swipe actions</Heading>
        <Text color="secondary">{SWIPE_ACTIONS_CASE_LABELS[id]}</Text>
        <HStack gap={3}>
          {SWIPE_ACTIONS_CASES.map(caseId => (
            <Link key={caseId} href={`?case=${caseId}`}>
              {caseId}
            </Link>
          ))}
        </HStack>
      </VStack>
      <SwipeActionsCase key={id} id={id} />
    </VStack>
  );
}

export default function SwipeActionsCasesPage() {
  return (
    <Suspense>
      <SwipeActionsCases />
    </Suspense>
  );
}
