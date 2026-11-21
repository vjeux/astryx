// Copyright (c) Meta Platforms, Inc. and affiliates.

// Scratch, local only: the render of #13192's "Nested Long Labels" story, copied verbatim, so that main (which does
// not have the story) renders the same content. Built into both local Storybooks.

import type {Meta, StoryObj} from '@storybook/react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {
  SideNav,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
} from '@astryxdesign/core/SideNav';
import {Badge} from '@astryxdesign/core/Badge';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Text} from '@astryxdesign/core/Text';
import {HomeIcon, FolderIcon, CubeIcon} from '@heroicons/react/24/outline';

// The same layout and decorator as the SideNav stories' meta.
const meta: Meta = {
  title: 'Scratch/SideNav nested long labels',
  tags: ['no-visual'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{height: 480}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const NestedLongLabels: Story = {
  name: 'Nested Long Labels',
  render: () => (
    <AppShell
      sideNav={
        <SideNav
          collapsible
          header={
            <SideNavHeading
              icon={
                <NavIcon icon={<CubeIcon style={{width: 16, height: 16}} />} />
              }
              heading="My App"
            />
          }>
          <SideNavSection title="Main">
            <SideNavItem label="Dashboard" icon={HomeIcon} href="/dashboard" />
            <SideNavItem label="Projects" icon={FolderIcon}>
              <SideNavItem
                label="Quarterly planning for the platform reliability program"
                href="/projects/planning"
                endContent={<Badge label={12} />}
              />
              <SideNavItem label="Infrastructure migrations and rollouts">
                <SideNavItem
                  label="Regional database failover rehearsal schedule"
                  href="/projects/migrations/failover"
                  endContent={<Badge label="New" />}
                />
              </SideNavItem>
            </SideNavItem>
          </SideNavSection>
        </SideNav>
      }>
      <Text>Content</Text>
    </AppShell>
  ),
};
