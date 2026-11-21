// Copyright (c) Meta Platforms, Inc. and affiliates.

// Scratch, local only (never committed): a native DateTimeInput under a locale provider with no
// `dir`, as in DateTimeInput.test.tsx. The page direction comes from the Storybook global.

import type {Meta, StoryObj} from '@storybook/react';
import {DateTimeInput} from '@astryxdesign/core/DateTimeInput';
import type {ISODateTimeString} from '@astryxdesign/core/DateTimeInput';
import {InternationalizationProvider} from '@astryxdesign/core/i18n';

const meta: Meta = {
  title: 'Scratch/Native date locales',
  tags: ['no-visual'],
};

export default meta;
type Story = StoryObj;

function NativeDate({locale}: {locale: string}) {
  return (
    <InternationalizationProvider locale={locale}>
      <DateTimeInput
        label="Meeting"
        presentation="native"
        value={'2026-03-15T09:00' as ISODateTimeString}
        onChange={() => {}}
      />
    </InternationalizationProvider>
  );
}

export const EnGB: Story = {render: () => <NativeDate locale="en-GB" />};
export const ArEG: Story = {render: () => <NativeDate locale="ar-EG" />};
