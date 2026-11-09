// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file TabBarMoreList.tsx
 * @input React, core's List, Icon and Badge, core i18n, and TabBar.tsx's
 *   tab reading (`overflowItems`)
 * @output Exports TabBarMoreList: the More tab's screen, a list of the tabs
 *   past the fourth (UIKit's `UIMoreListController`)
 * @position Lab component beside TabBar (packages/lab/src/TabBar)
 *
 * SYNC: When modified, update TabBar.doc.mjs, TabBar.test.tsx and
 * __tests__/TabBar.interaction.browser.spec.ts.
 */

import type {ReactNode} from 'react';
import type {BaseProps} from '@astryxdesign/core';
import {Badge} from '@astryxdesign/core/Badge';
import {useTranslator} from '@astryxdesign/core/i18n';
import {Icon} from '@astryxdesign/core/Icon';
import {List, ListItem} from '@astryxdesign/core/List';
import {rtlStyles} from '@astryxdesign/core/utils';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {badgedName, hasBadge, isDisabledItem, overflowItems} from './TabBar';

export interface TabBarMoreListProps extends Omit<
  BaseProps<HTMLElement>,
  'onChange'
> {
  /** The same `TabBarItem` elements given to TabBar. */
  children: ReactNode;
  /** The selected tab's value: its row reads as selected. */
  value?: string;
  /** Called with a row's value when it is chosen. */
  onChange: (value: string) => void;
}

/**
 * The More tab's screen: a list of the tabs past the fourth.
 *
 * @example
 * ```
 * {tab === 'more' ? (
 *   <TabBarMoreList onChange={setTab}>{tabs}</TabBarMoreList>
 * ) : null}
 * <TabBar value={tab} onChange={setTab}>{tabs}</TabBar>
 * ```
 */
/*
 * WHAT IT DRAWS
 *
 * With more than five tabs, TabBar shows the first four and a More tab. This is
 * what More shows: one row per remaining tab, its icon, its label and a
 * disclosure chevron (mirrored right to left), in order. Choosing a row hands
 * its value to the app, which shows that section inside More's own navigation
 * stack (back to "More"). TabBar keeps More selected meanwhile, as iOS does.
 * A disabled tab's row is disabled too, so it never activates there either.
 * The app passes the same TabBarItem children it gives TabBar, so the two agree
 * on which tabs overflow.
 *
 * Not here: iOS's Edit, which rearranges the tabs by dragging them onto the
 * bar.
 */
export function TabBarMoreList({
  children,
  value,
  onChange,
  ...props
}: TabBarMoreListProps) {
  const t = useTranslator();
  return (
    <List aria-label={t('@astryx.tabBar.more')} hasDividers {...props}>
      {overflowItems(children).map(item => (
        <ListItem
          key={item.value}
          label={
            badgedName(item, t) == null ? (
              item.label
            ) : (
              // The row's name is one message with both, as the tab's is.
              <>
                <span aria-hidden>{item.label}</span>
                <VisuallyHidden>{badgedName(item, t)}</VisuallyHidden>
              </>
            )
          }
          startContent={item.icon}
          endContent={
            <>
              {hasBadge(item.badge) ? (
                <Badge variant="error" label={item.badge} aria-hidden />
              ) : null}
              {/* Right to left it points left, as Core's disclosure rows' do. */}
              <Icon icon="chevronRight" xstyle={rtlStyles.mirror} />
            </>
          }
          isSelected={item.value === value}
          isDisabled={isDisabledItem(item)}
          onClick={() => onChange(item.value)}
        />
      ))}
    </List>
  );
}
