// Copyright (c) Meta Platforms, Inc. and affiliates.

// Scratch, local only (in neither pull request): a range Slider with a text value in French. fr-FR ships no
// `@astryx.slider.rangeValue`, so the range text comes from a provider override. The props match the
// "Price range" slider of the Text Value Widths story.

import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Slider} from '@astryxdesign/core/Slider';
import {InternationalizationProvider} from '@astryxdesign/core/i18n';

const meta: Meta = {
  title: 'Scratch/Slider French range',
  tags: ['no-visual'],
};

export default meta;
type Story = StoryObj;

function FrenchRange() {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  return (
    <InternationalizationProvider
      locale="fr-FR"
      overrides={{'fr-FR': {'@astryx.slider.rangeValue': 'de {start} à {end}'}}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
        <Slider
          label="Price range"
          min={0}
          max={1000}
          step={10}
          value={range}
          onChange={setRange}
          valueDisplay="text"
        />
      </div>
    </InternationalizationProvider>
  );
}

export const FrenchRangeText: Story = {render: () => <FrenchRange />};
