// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file page.tsx
 * @position Standalone phone page for the lab TabBar, outside any frame: the
 *   document itself scrolls under the floating bar, as an app's page does.
 *   Six sections, so the bar shows four and More, whose list holds the rest.
 * @input ?disabled=<value>[,<value>] disables those sections, and ?dir=rtl
 *   lays the page out right to left (both read on mount).
 * @output A scrolling screen per section, the More list, and the bar.
 */

'use client';

import {useEffect, useState} from 'react';
import {
  BookOpenIcon as BookOpenOutline,
  Cog6ToothIcon as CogOutline,
  HomeIcon as HomeOutline,
  QuestionMarkCircleIcon as HelpOutline,
  Squares2X2Icon as GridOutline,
  UserCircleIcon as UserOutline,
} from '@heroicons/react/24/outline';
import {
  BookOpenIcon as BookOpenSolid,
  Cog6ToothIcon as CogSolid,
  HomeIcon as HomeSolid,
  QuestionMarkCircleIcon as HelpSolid,
  Squares2X2Icon as GridSolid,
  UserCircleIcon as UserSolid,
} from '@heroicons/react/24/solid';
import {TabBar, TabBarItem, TabBarMoreList} from '@astryxdesign/lab';
import {Button} from '@astryxdesign/core/Button';
import {Icon, type IconType} from '@astryxdesign/core/Icon';
import {LayerProvider} from '@astryxdesign/core/Layer';
import {Heading, Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

interface Section {
  value: string;
  label: string;
  icon: IconType;
  selectedIcon: IconType;
}

const SECTIONS: Section[] = [
  {value: 'home', label: 'Home', icon: HomeOutline, selectedIcon: HomeSolid},
  {
    value: 'library',
    label: 'Library',
    icon: BookOpenOutline,
    selectedIcon: BookOpenSolid,
  },
  {
    value: 'browse',
    label: 'Browse',
    icon: GridOutline,
    selectedIcon: GridSolid,
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: UserOutline,
    selectedIcon: UserSolid,
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: CogOutline,
    selectedIcon: CogSolid,
  },
  {value: 'help', label: 'Help', icon: HelpOutline, selectedIcon: HelpSolid},
];

/** The room the floating bar takes at the bottom of the page, in px. */
const BAR_ROOM = 83;

/** A screen long enough to scroll the document under the bar. */
function Screen({title}: {title: string}) {
  return (
    <VStack padding={4} gap={6}>
      <Heading level={1}>{title}</Heading>
      {Array.from({length: 40}, (_, i) => (
        <Text key={i}>
          {title} row {i + 1}
        </Text>
      ))}
      <VStack height={BAR_ROOM} />
    </VStack>
  );
}

export default function LabTabBarPage() {
  const [value, setValue] = useState('home');
  const [disabled, setDisabled] = useState<string[]>([]);
  // Syncs with the URL's query, read after mount so the static HTML hydrates
  // as it is. The direction lives on the document element, restored on unmount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const list = params.get('disabled');
    setDisabled(list == null ? [] : list.split(','));
    if (params.get('dir') !== 'rtl') {
      return;
    }
    const root = document.documentElement;
    const previous = root.dir;
    root.dir = 'rtl';
    return () => {
      root.dir = previous;
    };
  }, []);
  const tabs = SECTIONS.map(section => (
    <TabBarItem
      key={section.value}
      value={section.value}
      label={section.label}
      icon={<Icon icon={section.icon} size="lg" />}
      selectedIcon={<Icon icon={section.selectedIcon} size="lg" />}
      badge={section.value === 'help' ? 2 : undefined}
      aria-disabled={disabled.includes(section.value) || undefined}
    />
  ));
  const inMore = SECTIONS.slice(4).find(section => section.value === value);
  return (
    <LayerProvider inset={{blockEnd: BAR_ROOM}}>
      {value === 'more' ? (
        <VStack padding={4} gap={4}>
          <Heading level={1}>More</Heading>
          <TabBarMoreList value={value} onChange={setValue}>
            {tabs}
          </TabBarMoreList>
          <VStack height={BAR_ROOM} />
        </VStack>
      ) : inMore != null ? (
        <VStack padding={4} gap={4}>
          <Button
            label="More"
            variant="ghost"
            onClick={() => setValue('more')}
          />
          <Heading level={1}>{inMore.label}</Heading>
        </VStack>
      ) : (
        <Screen
          title={SECTIONS.find(section => section.value === value)?.label ?? ''}
        />
      )}
      <TabBar
        value={value}
        onChange={setValue}
        onReselect={reselected => {
          // More again returns to its list, as iOS pops More's stack.
          if (reselected === 'more') {
            setValue('more');
          }
        }}
        label="Sections">
        {tabs}
      </TabBar>
    </LayerProvider>
  );
}
