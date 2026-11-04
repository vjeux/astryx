// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file toastHost.tsx
 * @input The toast host the Toast module registers, and LayerProvider's
 *   toast configuration
 * @output ToastContext, registerToastHost and ToastHostOutlet
 * @position Layer's side of the toast host (prototype)
 */

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from 'react';
import type {ToastDismissReason, ToastEntry} from '../Toast/types';
import type {LayerInset, LayerToastConfig} from './LayerContext';

export interface ToastContextValue {
  addToast: (entry: ToastEntry) => void;
  removeToast: (id: string, reason: ToastDismissReason) => void;
  findByUniqueID: (uniqueID: string) => ToastEntry | undefined;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
ToastContext.displayName = 'ToastContext';

export interface ToastHostProps {
  position?: LayerToastConfig['position'];
  maxVisible?: LayerToastConfig['maxVisible'];
  inset?: LayerToastConfig['inset'];
  layerInset?: LayerInset;
  children?: ReactNode;
}

let registeredHost: ComponentType<ToastHostProps> | null = null;
const listeners = new Set<() => void>();

export function registerToastHost(host: ComponentType<ToastHostProps>): void {
  if (registeredHost === host) {
    return;
  }
  registeredHost = host;
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
const readHost = () => registeredHost;
const readServerHost = () => null;

function HostCapture({
  onContext,
}: {
  onContext: (ctx: ToastContextValue | null) => void;
}) {
  const ctx = use(ToastContext);
  useEffect(() => {
    onContext(ctx);
    return () => onContext(null);
  }, [ctx, onContext]);
  return null;
}

export function ToastHostOutlet({children, ...config}: ToastHostProps) {
  const Host = useSyncExternalStore(subscribe, readHost, readServerHost);
  const hostRef = useRef<ToastContextValue | null>(null);
  const pendingRef = useRef<ToastEntry[]>([]);
  const outlet = useMemo<ToastContextValue>(
    () => ({
      addToast: entry => {
        if (hostRef.current != null) {
          hostRef.current.addToast(entry);
        } else {
          pendingRef.current.push(entry);
        }
      },
      removeToast: (id, reason) => {
        if (hostRef.current != null) {
          hostRef.current.removeToast(id, reason);
        } else {
          pendingRef.current = pendingRef.current.filter(e => e.id !== id);
        }
      },
      findByUniqueID: uniqueID =>
        hostRef.current != null
          ? hostRef.current.findByUniqueID(uniqueID)
          : pendingRef.current.find(e => e.options.uniqueID === uniqueID),
    }),
    [],
  );
  const onContext = useCallback((ctx: ToastContextValue | null) => {
    hostRef.current = ctx;
    if (ctx == null) {
      return;
    }
    const pending = pendingRef.current;
    pendingRef.current = [];
    for (const entry of pending) {
      ctx.addToast(entry);
    }
  }, []);
  return (
    <ToastContext value={outlet}>
      {children}
      {Host != null ? (
        <Host {...config}>
          <HostCapture onContext={onContext} />
        </Host>
      ) : null}
    </ToastContext>
  );
}
