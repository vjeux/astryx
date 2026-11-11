// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file page.tsx
 * @input ContextMenu and the Sandbox's theme controls
 * @output A phone page with one place for each ContextMenu touch behavior:
 *   a hold, a slide to pick, a still lift, an early drift and a short tap
 * @position A raw Sandbox page (/pages/context-menu-set/) with no sandbox
 *   frame. The document scrolls. The page opens in Neutral light, and the
 *   theme menu at its top changes the theme.
 */

'use client';

import {useEffect, useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {ContextMenu} from '@astryxdesign/core/ContextMenu';
import {Divider} from '@astryxdesign/core/Divider';
import {Item} from '@astryxdesign/core/Item';
import {VStack} from '@astryxdesign/core/Layout';
import {Selector} from '@astryxdesign/core/Selector';
import {Switch} from '@astryxdesign/core/Switch';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {SANDBOX_THEMES, useThemeControls} from '../../../providers';

const ACTIONS = ['Copy', 'Share', 'Rename', 'Delete'];

const ROWS = Array.from({length: 16}, (_, i) => `Message ${i + 1}`);

// A flat swatch as an image, so the page needs no network for its pictures.
function swatch(hue: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="hsl(${hue} 70% 55%)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function ContextMenuSetPage() {
  const {themeName, setThemeName, mode, setMode} = useThemeControls();
  const [lastAction, setLastAction] = useState('none');

  // The page opens in Neutral light. The reset waits one frame, so it comes
  // after the Sandbox restores the theme it kept from an earlier visit.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setThemeName('neutral');
      setMode('light');
    });
    return () => cancelAnimationFrame(frame);
  }, [setThemeName, setMode]);

  const menu = ACTIONS.map(label => ({
    label,
    onClick: () => setLastAction(label),
  }));
  const status = <Text type="supporting">{`Last action: ${lastAction}`}</Text>;

  const holdCard = (title: string, hue: number, hint: string) => (
    <ContextMenu items={menu} label={title}>
      <Card>
        <VStack gap={1}>
          <Thumbnail src={swatch(hue)} alt="" />
          <Text weight="semibold">{title}</Text>
          <Text type="supporting">{hint}</Text>
        </VStack>
      </Card>
    </ContextMenu>
  );

  return (
    <VStack gap={6} padding={4}>
      <VStack gap={2}>
        <Heading level={1}>ContextMenu under a finger</Heading>
        <Text>
          Each section checks one behavior. The page scrolls on its own; tap
          outside a menu to close it.
        </Text>
        <Selector
          label="Theme"
          options={SANDBOX_THEMES.map(theme => ({
            value: theme.id,
            label: theme.label,
          }))}
          value={themeName}
          onChange={setThemeName}
        />
        <Switch
          label="Dark mode"
          value={mode === 'dark'}
          onChange={isOn => setMode(isOn ? 'dark' : 'light')}
        />
        {status}
      </VStack>

      <VStack gap={2}>
        <Heading level={2}>1. Hold to open</Heading>
        <Text>
          Hold the card. It grows on a spring under your finger, and its menu
          shows at about 0.74 s.
        </Text>
        {holdCard('Hold me', 210, 'Hold, then tap outside to close')}
      </VStack>

      <VStack gap={2}>
        <Heading level={2}>2. Slide to pick</Heading>
        <Text>
          Hold the card until its menu shows. Keep your finger down, slide onto
          Share and lift: the last action reads Share.
        </Text>
        {holdCard('Slide from me', 20, 'Hold, slide onto a row, lift')}
        {status}
      </VStack>

      <VStack gap={2}>
        <Heading level={2}>3. A still lift</Heading>
        <Text>
          Hold the card until its menu shows, then lift without moving. The menu
          stays open, and no row runs.
        </Text>
        {holdCard('Lift from me', 140, 'Hold, then lift in place')}
        {status}
      </VStack>

      <VStack gap={2}>
        <Heading level={2}>4. An early drift and 5. a short tap</Heading>
        <Text>
          Press a row and move your finger at once: the page scrolls, and no
          menu opens. Tap a row quickly: the last action names the row, and no
          menu opens.
        </Text>
        {status}
        <VStack gap={0}>
          {ROWS.map((row, i) => (
            <VStack key={row} gap={0}>
              {i > 0 ? <Divider /> : null}
              <ContextMenu items={menu} label={row}>
                <Item
                  label={row}
                  description="Tap to open it, or hold for its menu"
                  onClick={() => setLastAction(`Tapped ${row}`)}
                />
              </ContextMenu>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
