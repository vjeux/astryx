// Copyright (c) Meta Platforms, Inc. and affiliates.

// Scratch, local only: MultiSelector triggers with mixed-direction selections in the labels display. One page per
// locale: en (left to right), he-IL and ar-SA (right to left), each with four sets and a narrow copy of set A. Also a
// verbatim copy of #13244's "Mixed Direction Labels" story, so main renders the same content. Built into both local
// Storybooks.

import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {MultiSelector} from '@astryxdesign/core/MultiSelector';
import {InternationalizationProvider} from '@astryxdesign/core/i18n';

const meta: Meta = {
  title: 'Scratch/MultiSelector bidi 2',
  tags: ['no-visual'],
  parameters: {layout: 'centered'},
};

export default meta;
type Story = StoryObj;

const EN = ['Design', 'Marketing', 'Sales', 'Research'];

function Field({label, options, initial}: {label: string; options: string[]; initial: string[]}) {
  const [value, setValue] = useState<string[]>(initial);
  return (
    <MultiSelector
      label={label}
      options={options}
      value={value}
      onChange={setValue}
      triggerDisplay="labels"
    />
  );
}

function Page({locale, dir, rtl, labels}: {locale: string; dir: 'ltr' | 'rtl'; rtl: string[]; labels: string[]}) {
  const [r1, r2, r3] = rtl;
  const [d, m, s] = EN;
  const options = [...EN, ...rtl];
  const sets = [
    [d, r1, r2, m, s],
    [r1, d, r2, m, r3],
    [r1, r2, r3, d, s],
    [d, m, s, r1, r2],
  ];
  return (
    <InternationalizationProvider locale={locale} dir={dir}>
      <div dir={dir} style={{display: 'flex', flexDirection: 'column', gap: 16, width: 320}}>
        {sets.map((initial, i) => (
          <Field key={i} label={labels[i]} options={options} initial={initial} />
        ))}
        <div style={{width: 150}}>
          <Field label={labels[4]} options={options} initial={sets[0]} />
        </div>
      </div>
    </InternationalizationProvider>
  );
}

export const EnLtr: Story = {
  name: 'en, left to right',
  render: () => (
    <Page locale="en" dir="ltr" rtl={['עיצוב', 'שיווק', 'מכירות']} labels={['Set A', 'Set B', 'Set C', 'Set D', 'Narrow']} />
  ),
};

export const HeRtl: Story = {
  name: 'he-IL, right to left',
  render: () => (
    <Page locale="he-IL" dir="rtl" rtl={['עיצוב', 'שיווק', 'מכירות']} labels={['קבוצה א', 'קבוצה ב', 'קבוצה ג', 'קבוצה ד', 'צר']} />
  ),
};

export const ArRtl: Story = {
  name: 'ar-SA, right to left',
  render: () => (
    <Page locale="ar-SA" dir="rtl" rtl={['تصميم', 'تسويق', 'مبيعات']} labels={['المجموعة أ', 'المجموعة ب', 'المجموعة ج', 'المجموعة د', 'ضيق']} />
  ),
};

// The render of #13244's "Mixed Direction Labels" story, copied verbatim, with the MultiSelector stories' centered
// layout and 300 px decorator.
export const MixedDirectionLabelsCopy: Story = {
  name: 'Mixed Direction Labels (copy)',
  decorators: [
    Story => (
      <div style={{width: 300}}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [value, setValue] = useState<string[]>([
      'Design',
      'עיצוב',
      'שיווק',
      'Sales',
      'Support',
    ]);
    return (
      <MultiSelector
        label="Team"
        options={['Design', 'עיצוב', 'שיווק', 'Sales', 'Support']}
        value={value}
        onChange={setValue}
        triggerDisplay="labels"
      />
    );
  },
};
