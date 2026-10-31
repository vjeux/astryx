// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, expect, it} from 'vitest';
import transform from '../migrate-touch-trigger-tap-to-press-trigger.mjs';

async function applyTransform(source) {
  const jscodeshift = (await import('jscodeshift')).default;
  const j = jscodeshift.withParser('tsx');
  const api = {jscodeshift: j, stats: () => {}, report: () => {}};
  return transform({source, path: 'test.tsx'}, api) ?? source;
}

describe('migrate-touch-trigger-tap-to-press-trigger (DEP-0016)', () => {
  it('rewrites a static touchTrigger="tap" on Tooltip and HoverCard', async () => {
    const output =
      await applyTransform(`import {Tooltip, HoverCard} from '@astryxdesign/core';
const a = <Tooltip content="Why" touchTrigger="tap"><button>?</button></Tooltip>;
const b = <HoverCard content={card} touchTrigger={'tap'}><button>Ada</button></HoverCard>;`);

    expect(output).toContain("pressTrigger='toggle'");
    expect(output).toContain("pressTrigger={'toggle'}");
    expect(output).not.toContain('touchTrigger');
  });

  it('follows aliased and namespace imports', async () => {
    const output =
      await applyTransform(`import {Tooltip as Tip} from '@astryxdesign/core/Tooltip';
import * as Core from '@astryxdesign/core';
const a = <Tip content="x" touchTrigger="tap"><button>?</button></Tip>;
const b = <Core.HoverCard content="y" touchTrigger="tap"><button>?</button></Core.HoverCard>;`);

    expect(output.match(/pressTrigger='toggle'/g)).toHaveLength(2);
    expect(output).not.toContain('touchTrigger');
  });

  it('removes a static touchTrigger="auto", the default', async () => {
    const output =
      await applyTransform(`import {Tooltip} from '@astryxdesign/core';
const a = <Tooltip content="x" touchTrigger="auto"><span>t</span></Tooltip>;`);

    expect(output).not.toContain('touchTrigger');
    expect(output).not.toContain('pressTrigger');
  });

  it('leaves touchTrigger="none" unchanged', async () => {
    const source = `import {Tooltip} from '@astryxdesign/core';
const a = <Tooltip content="x" touchTrigger="none"><span>t</span></Tooltip>;`;
    expect(await applyTransform(source)).toBe(source);
  });

  it('removes touchTrigger beside a static pressTrigger="toggle", which wins', async () => {
    const output =
      await applyTransform(`import {Tooltip} from '@astryxdesign/core';
const a = <Tooltip content="x" pressTrigger="toggle" touchTrigger="tap" placement="below"><button>?</button></Tooltip>;`);

    expect(output).toContain('pressTrigger="toggle"');
    expect(output).toContain('placement="below"');
    expect(output).not.toContain('touchTrigger');
  });

  it('leaves a TODO for a computed value, a competing pressTrigger, and spread props', async () => {
    const output =
      await applyTransform(`import {Tooltip} from '@astryxdesign/core';
const a = <Tooltip content="x" touchTrigger={mode}><button>?</button></Tooltip>;
const b = <Tooltip content="x" pressTrigger="none" touchTrigger="tap"><button>?</button></Tooltip>;
const c = <Tooltip content="x" {...rest} touchTrigger="tap"><button>?</button></Tooltip>;`);

    expect(output).toContain('touchTrigger={mode}');
    expect(output).toContain('This value is computed');
    expect(output).toContain('pressTrigger="none"');
    expect(output.match(/touchTrigger="tap">/g)).toHaveLength(2);
    expect(output).toContain('a pressTrigger other than a static "toggle"');
    expect(output).toContain('props are also spread here');
    expect(output.match(/TODO\(astryx upgrade\)/g)).toHaveLength(3);
  });

  it('rewrites useTooltip and useHoverCard options written at the call', async () => {
    const output =
      await applyTransform(`import {useTooltip, useHoverCard} from '@astryxdesign/core';
function A() {
  const tip = useTooltip({placement: 'below', touchTrigger: 'tap'});
  const card = useHoverCard({touchTrigger: 'auto', delay: 100});
  const kept = useHoverCard({touchTrigger: 'none'});
  return null;
}`);

    expect(output).toContain("pressTrigger: 'toggle'");
    expect(output).toContain("placement: 'below'");
    expect(output).not.toContain("touchTrigger: 'tap'");
    expect(output).not.toContain("touchTrigger: 'auto'");
    expect(output).toContain('delay: 100');
    expect(output).toContain("useHoverCard({touchTrigger: 'none'})");
  });

  it('leaves components and hooks that are not Core’s unchanged', async () => {
    const source = `import {Tooltip, useTooltip} from './local';
const a = <Tooltip touchTrigger="tap" />;
const b = useTooltip({touchTrigger: 'tap'});`;
    expect(await applyTransform(source)).toBe(source);
  });

  it('changes nothing on a second run', async () => {
    const once =
      await applyTransform(`import {Tooltip} from '@astryxdesign/core';
const a = <Tooltip content="x" touchTrigger="tap"><button>?</button></Tooltip>;
const b = <Tooltip content="x" touchTrigger={mode}><button>?</button></Tooltip>;`);
    expect(await applyTransform(once)).toBe(once);
  });
});
