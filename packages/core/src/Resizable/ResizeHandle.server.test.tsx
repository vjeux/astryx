// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ResizeHandle.server.test.tsx
 * @input vitest (jsdom), react-dom/server and react-dom/client, the
 *   ref-taking useResizable with ResizeHandle, the Table inbox template
 * @output Checks that a ResizeHandle given the hook's ref announces its region
 *   (value, minimum and maximum) in the server's markup, that the first client
 *   render hydrates that markup unchanged, and that the handle then resizes
 *   from the keyboard and a pointer; and that the Table inbox template's pane
 *   handle announces its pane on the server
 * @position Server and hydration tests for ResizeHandle.tsx and useResizable.ts
 */

import {act, fireEvent} from '@testing-library/react';
import {useRef} from 'react';
import {hydrateRoot, type Root} from 'react-dom/client';
import {renderToString} from 'react-dom/server';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {ResizeHandle} from './ResizeHandle';
import {useResizable} from './useResizable';

function Split() {
  const handleRef = useRef<HTMLDivElement>(null);
  const region = useResizable(handleRef, {
    defaultSize: 260,
    minSize: 180,
    maxSize: 400,
  });
  return (
    <div>
      <output data-testid="size">{region.size}</output>
      <ResizeHandle ref={handleRef} label="Sidebar width" />
    </div>
  );
}

/**
 * The Table inbox template, loaded by path. It imports Core by its package
 * name, which the test run resolves and Core's own type check does not.
 */
async function loadInboxTemplate(): Promise<() => React.ReactElement> {
  const page = new URL(
    '../../../cli/assets/templates/pages/table-inbox/page.tsx',
    import.meta.url,
  );
  const module = (await import(/* @vite-ignore */ page.pathname)) as {
    default: () => React.ReactElement;
  };
  return module.default;
}

/** The server's markup, parsed into a detached container. */
function serverMarkup(element: React.ReactElement): HTMLDivElement {
  const container = document.createElement('div');
  container.innerHTML = renderToString(element);
  return container;
}

afterEach(() => {
  document.body.replaceChildren();
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
  vi.restoreAllMocks();
});

describe('ResizeHandle on a useResizable(handleRef) region, on the server', () => {
  it('announces the region’s value, minimum and maximum in the server markup', () => {
    const separator = serverMarkup(<Split />).querySelector(
      '[role="separator"]',
    );
    expect(separator).not.toBeNull();
    expect(separator?.getAttribute('aria-valuenow')).toBe('260');
    expect(separator?.getAttribute('aria-valuemin')).toBe('180');
    expect(separator?.getAttribute('aria-valuemax')).toBe('400');
  });

  it('hydrates that markup unchanged, then resizes from the keyboard and a pointer', async () => {
    const container = serverMarkup(<Split />);
    document.body.append(container);
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const onRecoverableError = vi.fn();
    const hydrated: {root: Root | null} = {root: null};
    await act(async () => {
      hydrated.root = hydrateRoot(container, <Split />, {onRecoverableError});
    });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(
      consoleError.mock.calls.filter(call =>
        String(call[0]).toLowerCase().includes('hydrat'),
      ),
    ).toEqual([]);
    const separator = container.querySelector(
      '[role="separator"]',
    ) as HTMLElement;
    const size = () =>
      Number(container.querySelector('[data-testid="size"]')?.textContent);
    expect(separator.getAttribute('aria-valuenow')).toBe('260');
    act(() => {
      fireEvent.keyDown(separator, {key: 'ArrowRight'});
    });
    expect(size()).toBe(270);
    expect(separator.getAttribute('aria-valuenow')).toBe('270');
    const grabZone = separator.firstElementChild as HTMLElement;
    act(() => {
      fireEvent.pointerDown(grabZone, {pointerId: 1, clientX: 0});
      fireEvent.pointerMove(grabZone, {pointerId: 1, clientX: 40});
      fireEvent.pointerUp(grabZone, {pointerId: 1, clientX: 40});
    });
    expect(size()).toBe(310);
    expect(separator.getAttribute('aria-valuenow')).toBe('310');
    act(() => {
      hydrated.root?.unmount();
    });
  });
});

describe('the Table inbox template, on the server', () => {
  it('announces its open pane on the pane’s handle', async () => {
    const SupportInboxTemplate = await loadInboxTemplate();
    const separators = [
      ...serverMarkup(<SupportInboxTemplate />).querySelectorAll(
        '[role="separator"]',
      ),
    ];
    expect(separators.length).toBeGreaterThan(0);
    for (const separator of separators) {
      const now = Number(separator.getAttribute('aria-valuenow'));
      const min = Number(separator.getAttribute('aria-valuemin'));
      expect(separator.hasAttribute('aria-valuenow')).toBe(true);
      expect(separator.hasAttribute('aria-valuemin')).toBe(true);
      expect(now).toBeGreaterThanOrEqual(min);
    }
  });
});
