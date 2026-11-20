// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file TableTruncateHarness.stories.tsx
 * @input Table, useTableSortable and pixel column widths
 * @output A HARNESS, not a shipped story: a truncating Table with a cut plain
 *   heading, a cut sortable heading and sortable headings that fit
 * @position Local evidence only. No shipped story renders a truncating Table
 *   with a sortable column.
 */
import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Table, pixel, useTableSortable} from '@astryxdesign/core/Table';
import type {TableColumn, TableSortState} from '@astryxdesign/core/Table';

interface AppComparison extends Record<string, unknown> {
  id: string;
  criterion: string;
  obsidian: string;
  notion: string;
  apple: string;
}

// The Table stories' HeadingOverflow data.
const appComparison: AppComparison[] = [
  {id: 'best', criterion: 'Best at', obsidian: 'Linked notes', notion: 'Team docs', apple: 'Quick capture'},
  {id: 'data', criterion: 'Your data', obsidian: 'Local files', notion: 'Their cloud', apple: 'iCloud'},
];

// Narrow columns cut "Criterion" (plain) and "Apple Notes" (sortable);
// "Obsidian" and "Notion" (sortable) fit.
const columns: TableColumn<AppComparison>[] = [
  {key: 'criterion', header: 'Criterion', width: pixel(56)},
  {key: 'obsidian', header: 'Obsidian', width: pixel(160), sortable: true},
  {key: 'notion', header: 'Notion', width: pixel(160), sortable: true},
  {key: 'apple', header: 'Apple Notes', width: pixel(72), sortable: true},
];

function TruncatingSortableTable() {
  const [sort, setSort] = useState<TableSortState>([]);
  const sortPlugin = useTableSortable<AppComparison>({sort, onSortChange: setSort});
  return (
    <div style={{width: 'fit-content'}}>
      <Table
        data={appComparison}
        columns={columns}
        idKey="id"
        density="compact"
        dividers="grid"
        textOverflow="truncate"
        plugins={{sort: sortPlugin}}
      />
    </div>
  );
}

const meta: Meta = {title: 'Harness/Table Truncate'};
export default meta;

export const TruncatingSortable: StoryObj = {
  render: () => <TruncatingSortableTable />,
};
