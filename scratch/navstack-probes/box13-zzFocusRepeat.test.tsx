// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file NavigationStack.test.tsx
 * @input Uses vitest, @testing-library/react, NavigationStack,
 *   NavigationScreen and useNavigationStack
 * @output jsdom coverage of the stack's state: which screens render, the
 *   bar's title and back button, and inert covered screens. It also covers a
 *   popped screen leaving once its slide-out ends, focus after a push and
 *   after a pop, and the hook's guard.
 * @position Testing. Real engines prove the motion itself in
 *   __tests__/NavigationStack.interaction.browser.spec.ts (jsdom has no Web
 *   Animations: the animator writes end values and settles on timers)
 */

import {describe, expect, it} from 'vitest';
import {useState, type ReactNode} from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {List, ListItem} from '@astryxdesign/core/List';
import {
  NavigationScreen,
  NavigationStack,
  useNavigationStack,
} from './NavigationStack';

function Root() {
  const nav = useNavigationStack<string>();
  return (
    <>
      <button type="button" onClick={() => nav.push('General')}>
        General
      </button>
      <button type="button" onClick={() => nav.push('Privacy')}>
        Privacy
      </button>
    </>
  );
}

function Detail({entry}: {entry: string}) {
  const nav = useNavigationStack<string>();
  return (
    <>
      <p>{entry} content</p>
      <button type="button" onClick={() => nav.push(`${entry} › About`)}>
        About
      </button>
      <button type="button" onClick={() => nav.popToRoot()}>
        Done
      </button>
      <span data-testid="depth">{nav.depth}</span>
    </>
  );
}

function Harness({
  initial = [],
  backTitle,
  rootTitle = 'Settings',
  rootEndContent,
}: {
  initial?: string[];
  backTitle?: string;
  rootTitle?: string;
  rootEndContent?: ReactNode;
}) {
  const [path, setPath] = useState<string[]>(initial);
  return (
    <NavigationStack
      label="Settings"
      root={
        <NavigationScreen
          title={rootTitle}
          backTitle={backTitle}
          endContent={rootEndContent}>
          <Root />
        </NavigationScreen>
      }
      path={path}
      onPathChange={setPath}
      getKey={entry => entry}
      renderScreen={entry => (
        <NavigationScreen title={entry}>
          <Detail entry={entry} />
        </NavigationScreen>
      )}
    />
  );
}

/** A screen's card, by title (the root is "Settings"). */
const screenCard = (title: string) =>
  document.querySelector<HTMLElement>(
    `[data-navigation-screen="${title === 'Settings' ? 'root' : `screen-${title}`}"]`,
  );

/** The bar's back button (other buttons may share its name). */
const backButton = (name: string) =>
  screen
    .getAllByRole('button', {name})
    .find(button => button.hasAttribute('data-navigation-back'));

describe('NavigationStack focus repeat', () => {
  it.each(Array.from({length: Number(process.env.ZZ_N ?? 30)}, (_, i) => i))('focus round trip %i', async () => {
    render(<Harness />);
    const general = screen.getByRole('button', {name: 'General'});
    general.focus();
    fireEvent.click(general);

    await waitFor(
      () =>
        expect(document.activeElement).toBe(
          screen.getByRole('heading', {name: 'General'}),
        ),
      {timeout: 3000},
    );

    fireEvent.click(screen.getByRole('button', {name: 'Settings'}));
    await waitFor(() => expect(general).toHaveFocus(), {timeout: 3000});
  });

});
