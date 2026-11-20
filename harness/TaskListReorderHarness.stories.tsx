// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file TaskListReorderHarness.stories.tsx
 * @input List, ListItem, createReorderable and the internal ListMarkerScope
 * @output A HARNESS, not a shipped story: a task List with reorder handles at
 *   the start or the end of each row, for a before/after spacing comparison
 * @position Local evidence only. Task items come from Markdown through the
 *   internal ListMarkerScope, and Markdown's lists take no `reorderable`, so
 *   no shipped story shows a task List with reorder handles.
 */
import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {List, ListItem} from '@astryxdesign/core/List';
import {
  createReorderable,
  type ReorderHandleOptions as ReorderHandle,
} from '@astryxdesign/core';
// The same module ListItem reads its task from: the core alias points at the
// core source, so this path resolves to the one ListContext module.
import {ListMarkerScope} from '../../../packages/core/src/List/ListContext';

const TASKS = [
  {key: 'notes', label: 'Write the release notes', isChecked: false},
  {key: 'tag', label: 'Tag the release', isChecked: true},
  {key: 'publish', label: 'Publish the packages', isChecked: false},
  {key: 'announce', label: 'Announce the release', isChecked: false},
];

type Task = (typeof TASKS)[number];

function moveKey(rows: ReadonlyArray<Task>, key: unknown, to: number): Task[] {
  const moved = rows.find(row => row.key === key);
  const next = rows.filter(row => row.key !== key);
  if (moved) next.splice(to, 0, moved);
  return next;
}

/** A task list like Markdown's, made reorderable; the last task stays put. */
function TaskListReorder({handle}: {handle?: ReorderHandle}) {
  const [rows, setRows] = useState<ReadonlyArray<Task>>(TASKS);
  return (
    <List
      hasDividers
      listStyle="disc"
      reorderable={
        handle == null
          ? undefined
          : createReorderable({
              onReorder: ({key, to}) =>
                setRows(current => moveKey(current, key, to)),
              isReorderable: key => key !== 'announce',
              handle,
            })
      }>
      {rows.map(task => (
        <ListMarkerScope
          key={task.key}
          marker="disc"
          task={{isChecked: task.isChecked, label: task.label}}>
          <ListItem itemKey={task.key} label={task.label} />
        </ListMarkerScope>
      ))}
    </List>
  );
}

const meta: Meta = {
  title: 'Harness/Task List Reorder',
  parameters: {
    docs: {
      description: {
        component:
          'A harness, not a shipped story: a task List with reorder handles.',
      },
    },
  },
};
export default meta;

export const HandleAtStart: StoryObj = {
  render: () => (
    <TaskListReorder handle={{placement: 'start', revealBehavior: 'always'}} />
  ),
};

export const HandleAtEnd: StoryObj = {
  render: () => (
    <TaskListReorder handle={{placement: 'end', revealBehavior: 'always'}} />
  ),
};

export const WithoutReorder: StoryObj = {
  render: () => <TaskListReorder />,
};
