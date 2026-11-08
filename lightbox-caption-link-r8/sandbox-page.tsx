// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file page.tsx
 * @input `?case=gallery` (default) or `?case=single`, and `?open=0` to start
 *   closed
 * @output A Lightbox open on a photo with a long caption: a gallery's first
 *   page, or a single photo. A button opens it again.
 * @position A raw Sandbox page (/pages/lightbox-captions/) with no sandbox
 *   frame. The document scrolls, as a page around a viewer does.
 */

import {useState} from 'react';
import {Lightbox} from '@astryxdesign/core/Lightbox';

function photo(sky: string, hill: string, sun: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="2000" viewBox="0 0 3000 2000"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky}"/><stop offset="1" stop-color="#f4e2c4"/></linearGradient></defs><rect width="3000" height="2000" fill="url(#s)"/><circle cx="2200" cy="620" r="210" fill="${sun}"/><path d="M0 1350 C600 1100 1100 1250 1600 1150 S2600 1050 3000 1200 V2000 H0Z" fill="${hill}" opacity="0.85"/><path d="M0 1600 C700 1450 1400 1650 2100 1500 S2800 1450 3000 1550 V2000 H0Z" fill="${hill}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const LONG =
  'A winding path through the forest, past the old mill and down to the river, where the trail turns back toward the village. In autumn the beeches along it turn copper, and on a clear morning you can see the church spire from the bridge before the path climbs the last hill home.';

const GALLERY = [
  {src: photo('#7aa7d9', '#3f6b3a', '#ffd27a'), alt: 'Forest path', caption: LONG},
  {
    src: photo('#9fb8d6', '#2f5d6b', '#ffe3a3'),
    alt: 'Lake',
    caption: 'Morning fog lifting off the lake, seen from the old stone bridge',
  },
  {src: photo('#d9a77a', '#6b4a3a', '#fff0c2'), alt: 'Hills', caption: 'Golden hour'},
];

export default function LightboxCaptionsPage() {
  const params =
    typeof window === 'undefined'
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
  const isSingle = params.get('case') === 'single';
  const [isOpen, setIsOpen] = useState(params.get('open') !== '0');
  return (
    <div
      style={{
        minHeight: '200vh',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '45vh',
      }}>
      <button
        type="button"
        style={{visibility: isOpen ? 'hidden' : 'visible'}}
        onClick={() => setIsOpen(true)}>
        Open {isSingle ? 'single photo' : 'gallery'}
      </button>
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={isSingle ? GALLERY[0] : GALLERY}
        hasZoom
      />
    </div>
  );
}
