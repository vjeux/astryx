// Probes for the toast host prototype (evidence only, never lands).
import {act, render} from '@testing-library/react';
import {use, useEffect} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {renderToString} from 'react-dom/server';
import {describe, expect, it} from 'vitest';
import {LayerProvider} from './LayerProvider';
import {ToastContext} from './toastHost';

// Queues a toast the way useToast does, before the Toast module has loaded.
function EarlyToast() {
  const ctx = use(ToastContext);
  useEffect(() => {
    ctx?.addToast({id: 'early', createdAt: Date.now(), options: {body: 'Saved early'}});
  }, [ctx]);
  return null;
}

describe('option C prototype probes', () => {
  it('shows a toast queued before the Toast module loads, once it loads', async () => {
    const view = render(
      <LayerProvider>
        <p>App</p>
        <EarlyToast />
      </LayerProvider>,
    );
    const app = view.getByText('App');
    expect(document.body.textContent).not.toContain('Saved early');
    await act(async () => {
      await import('../Toast/ToastViewport');
    });
    expect(document.body.textContent).toContain('Saved early');
    // The app's own subtree was not remounted when the viewport arrived.
    expect(view.getByText('App')).toBe(app);
    view.unmount();
  });

  it('gives each React root its own viewport and toasts', async () => {
    const {useToast} = await import('../Toast/useToast');
    function Shows({text}: {text: string}) {
      const show = useToast();
      useEffect(() => {
        show({body: text});
      }, [show, text]);
      return null;
    }
    const a = document.createElement('div');
    const b = document.createElement('div');
    document.body.append(a, b);
    const ra = createRoot(a);
    const rb = createRoot(b);
    await act(async () => {
      ra.render(
        <LayerProvider>
          <Shows text="From A" />
        </LayerProvider>,
      );
      rb.render(
        <LayerProvider>
          <Shows text="From B" />
        </LayerProvider>,
      );
    });
    const texts = [a.textContent, b.textContent];
    console.log('roots', JSON.stringify(texts));
    expect(a.textContent).toContain('From A');
    expect(a.textContent).not.toContain('From B');
    expect(b.textContent).toContain('From B');
    expect(b.textContent).not.toContain('From A');
    await act(async () => {
      ra.unmount();
      rb.unmount();
    });
    a.remove();
    b.remove();
  });

  it('renders no viewport on the server and hydrates without a mismatch', async () => {
    await import('../Toast/ToastViewport');
    const tree = (
      <LayerProvider>
        <p>App</p>
      </LayerProvider>
    );
    const html = renderToString(tree);
    console.log('server html', html);
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.append(container);
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | null = null;
    await act(async () => {
      root = hydrateRoot(container, tree, {
        onRecoverableError: error => errors.push(error),
      });
    });
    expect(errors).toEqual([]);
    expect(container.querySelectorAll('p')).toHaveLength(1);
    // The viewport's root outlet mounts after hydration.
    console.log('hydrated', container.innerHTML.slice(0, 300));
    expect(container.children.length).toBeGreaterThan(1);
    await act(async () => {
      root?.unmount();
    });
    container.remove();
  });
});
