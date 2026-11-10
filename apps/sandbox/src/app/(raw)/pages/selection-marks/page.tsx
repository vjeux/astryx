// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file page.tsx
 * @input Nothing
 * @output A CheckboxList, single checkboxes and a RadioList, in a light
 *   section and a dark section of the sandbox's theme
 * @position Raw page for phone and mouse checks of the selection marks'
 *   press. The document scrolls; there is no inner scroll container.
 */

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {VStack} from '@astryxdesign/core/Layout';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Theme, type ThemeMode} from '@astryxdesign/core/theme';
import {colorVars} from '@astryxdesign/core/theme/tokens.stylex';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {SANDBOX_THEMES, useThemeControls} from '../../../providers';

const styles = stylex.create({
  // Each section paints its own mode's page background.
  section: {
    backgroundColor: colorVars['--color-background-body'],
  },
});

const MODES: ReadonlyArray<ThemeMode> = ['light', 'dark'];

function SelectionMarks({mode}: {mode: ThemeMode}) {
  const [channels, setChannels] = useState<string[]>(['email']);
  const [terms, setTerms] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [plan, setPlan] = useState('pro');
  return (
    <VStack gap={5} padding={4} xstyle={styles.section}>
      <Heading level={2}>{mode === 'dark' ? 'Dark' : 'Light'}</Heading>
      <CheckboxList
        label="Notifications"
        value={channels}
        onChange={setChannels}>
        <CheckboxListItem
          label="Email"
          value="email"
          description="A summary each morning"
        />
        <CheckboxListItem
          label="SMS"
          value="sms"
          description="Message rates may apply"
        />
        <CheckboxListItem label="Push notification" value="push" />
        <CheckboxListItem label="Phone call" value="call" />
      </CheckboxList>
      <VStack gap={3}>
        <CheckboxInput
          label="I accept the terms"
          value={terms}
          onChange={setTerms}
        />
        <CheckboxInput
          label="Send me product updates"
          value={updates}
          onChange={setUpdates}
        />
        <CheckboxInput label="Read-only" value={true} isReadOnly />
        <CheckboxInput label="Disabled" value={false} isDisabled />
      </VStack>
      <RadioList label="Plan" value={plan} onChange={setPlan}>
        <RadioListItem label="Starter" value="starter" />
        <RadioListItem
          label="Pro"
          value="pro"
          description="For teams of up to 20"
        />
        <RadioListItem label="Enterprise" value="enterprise" />
      </RadioList>
    </VStack>
  );
}

export default function SelectionMarksPage() {
  const {themeName} = useThemeControls();
  const theme =
    SANDBOX_THEMES.find(item => item.id === themeName)?.theme ?? neutralTheme;
  return (
    <VStack gap={0}>
      <VStack gap={2} padding={4}>
        <Heading level={1}>Selection marks</Heading>
        <Text color="secondary">
          Press and hold a checkbox, a list row or a radio option, then let go.
          The light section comes first and the dark section follows. Scroll the
          page with a finger between presses.
        </Text>
      </VStack>
      {MODES.map(mode => (
        <Theme key={mode} theme={theme} mode={mode}>
          <SelectionMarks mode={mode} />
        </Theme>
      ))}
    </VStack>
  );
}
