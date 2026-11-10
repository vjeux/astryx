import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Code-DultGxz3.js";import{n as o,t as s}from"./Stack-C-3OCHCS.js";import{n as c,t as l}from"./Link-D69iJxMA.js";var u,d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{i(),n(),o(),c(),u=t(),{expect:d}=__STORYBOOK_MODULE_TEST__,f={title:`Core/Code`,component:a,tags:[`autodocs`],argTypes:{children:{control:`text`,description:`Code content`}}},p={tags:[`visual-baseline`],args:{children:`const x = 1`}},m={render:()=>(0,u.jsxs)(s,{gap:2,children:[(0,u.jsxs)(r,{type:`body`,children:[`Primary:`,` `,(0,u.jsx)(a,{color:`primary`,"data-testid":`code-primary`,children:`const primary = true`})]}),(0,u.jsxs)(r,{type:`body`,children:[`Secondary:`,` `,(0,u.jsx)(a,{color:`secondary`,"data-testid":`code-secondary`,children:`const secondary = true`})]}),(0,u.jsxs)(r,{type:`body`,color:`accent`,"data-testid":`inherited-color-parent`,children:[`Inherited:`,` `,(0,u.jsx)(a,{color:`inherit`,"data-testid":`code-inherit`,children:`const inherited = true`})]})]}),play:async({canvasElement:e})=>{await document.fonts.ready;let t=e.querySelector(`[data-testid="code-primary"]`),n=e.querySelector(`[data-testid="code-secondary"]`),r=e.querySelector(`[data-testid="code-inherit"]`),i=e.querySelector(`[data-testid="inherited-color-parent"]`);if(!t||!n||!r||!i)throw Error(`Code color fixture did not render every state`);let a=getComputedStyle(t).color,o=getComputedStyle(n).color,s=getComputedStyle(r).color;d(o).not.toBe(a),d(s).toBe(getComputedStyle(i).color),d(s).not.toBe(a),d(s).not.toBe(o)}},h={name:`Inline in paragraph`,render:()=>(0,u.jsxs)(r,{type:`body`,children:[`Use `,(0,u.jsx)(a,{children:`useState`}),` for local state and `,(0,u.jsx)(a,{children:`useEffect`}),` for side effects. If you need shared state across components, consider`,` `,(0,u.jsx)(a,{children:`useContext`}),` or a state management library.`]})},g={name:`Instructional text`,render:()=>(0,u.jsxs)(s,{gap:3,children:[(0,u.jsxs)(r,{type:`body`,children:[`Install the package with `,(0,u.jsx)(a,{children:`npm install @astryxdesign/core`}),`, then import the component:`]}),(0,u.jsxs)(r,{type:`body`,children:[`Add `,(0,u.jsx)(a,{children:`<Button label="Save">Save</Button>`}),` to your JSX. The`,` `,(0,u.jsx)(a,{children:`label`}),` prop is required for accessibility.`]})]})},_={name:`Mixed with links and emphasis`,render:()=>(0,u.jsxs)(r,{type:`body`,children:[`The `,(0,u.jsx)(a,{children:`ThemeProvider`}),` component wraps your app and supplies design tokens. See the`,` `,(0,u.jsx)(l,{href:`/docs/theme`,isExternalLink:!1,children:`theme docs`}),` `,`for setup. Set `,(0,u.jsx)(a,{children:`colorScheme="dark"`}),` to enable dark mode.`]})},v={name:`Various code content`,render:()=>(0,u.jsxs)(s,{gap:2,children:[(0,u.jsxs)(r,{type:`body`,children:[`Variable: `,(0,u.jsx)(a,{children:`const count = 0`})]}),(0,u.jsxs)(r,{type:`body`,children:[`Terminal: `,(0,u.jsx)(a,{children:`pnpm build --watch`})]}),(0,u.jsxs)(r,{type:`body`,children:[`CSS property: `,(0,u.jsx)(a,{children:`border-radius: 8px`})]}),(0,u.jsxs)(r,{type:`body`,children:[`File path: `,(0,u.jsx)(a,{children:`packages/core/src/CodeBlock/Code.tsx`})]}),(0,u.jsxs)(r,{type:`body`,children:[`Keyboard shortcut: `,(0,u.jsx)(a,{children:`Ctrl+Shift+P`})]})]})},y={render:()=>(0,u.jsx)(`div`,{"data-testid":`long-inline-container`,style:{maxWidth:240},children:(0,u.jsxs)(r,{type:`body`,children:[`Long token:`,` `,(0,u.jsx)(a,{"data-testid":`long-inline-code`,children:`aVeryLongUnbrokenIdentifierThatMustWrapInsideItsProseContainer`})]})}),play:async({canvasElement:e})=>{await document.fonts.ready,await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let t=e.querySelector(`[data-testid="long-inline-container"]`),n=e.querySelector(`[data-testid="long-inline-code"]`);if(!t||!n)throw Error(`Code wrapping fixture did not render`);d(n.getClientRects().length).toBeGreaterThan(1),d(t.scrollWidth).toBeLessThanOrEqual(t.clientWidth)}},b={name:`Across text sizes`,render:()=>(0,u.jsxs)(s,{gap:2,children:[(0,u.jsxs)(r,{type:`large`,"data-testid":`text-large`,children:[`Heading with`,` `,(0,u.jsx)(a,{size:`inherit`,"data-testid":`code-large`,children:`inline code`})]}),(0,u.jsxs)(r,{type:`body`,"data-testid":`text-body`,children:[`Body text with`,` `,(0,u.jsx)(a,{size:`inherit`,"data-testid":`code-body`,children:`inline code`})]}),(0,u.jsxs)(r,{type:`supporting`,"data-testid":`text-supporting`,children:[`Detail text with`,` `,(0,u.jsx)(a,{size:`inherit`,"data-testid":`code-supporting`,children:`inline code`})]}),(0,u.jsxs)(r,{type:`label`,"data-testid":`text-label`,children:[`Label text with`,` `,(0,u.jsx)(a,{size:`inherit`,"data-testid":`code-label`,children:`inline code`})]})]}),play:async({canvasElement:e})=>{await document.fonts.ready;let t=[`large`,`body`,`supporting`,`label`],n=[];for(let r of t){let t=e.querySelector(`[data-testid="text-${r}"]`),i=e.querySelector(`[data-testid="code-${r}"]`);if(!t||!i)throw Error(`Code inherited-size fixture did not render ${r}`);let a=getComputedStyle(t),o=getComputedStyle(i);d(o.fontSize).toBe(a.fontSize),d(o.lineHeight).toBe(a.lineHeight),n.push(o.fontSize)}d(new Set(n).size).toBeGreaterThan(1)}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  tags: ['visual-baseline'],
  args: {
    children: 'const x = 1'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={2}>
      <Text type="body">
        Primary:{' '}
        <Code color="primary" data-testid="code-primary">
          const primary = true
        </Code>
      </Text>
      <Text type="body">
        Secondary:{' '}
        <Code color="secondary" data-testid="code-secondary">
          const secondary = true
        </Code>
      </Text>
      <Text type="body" color="accent" data-testid="inherited-color-parent">
        Inherited:{' '}
        <Code color="inherit" data-testid="code-inherit">
          const inherited = true
        </Code>
      </Text>
    </Stack>,
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const primary = canvasElement.querySelector<HTMLElement>('[data-testid="code-primary"]');
    const secondary = canvasElement.querySelector<HTMLElement>('[data-testid="code-secondary"]');
    const inherited = canvasElement.querySelector<HTMLElement>('[data-testid="code-inherit"]');
    const inheritedParent = canvasElement.querySelector<HTMLElement>('[data-testid="inherited-color-parent"]');
    if (!primary || !secondary || !inherited || !inheritedParent) {
      throw new Error('Code color fixture did not render every state');
    }
    const primaryColor = getComputedStyle(primary).color;
    const secondaryColor = getComputedStyle(secondary).color;
    const inheritedColor = getComputedStyle(inherited).color;
    expect(secondaryColor).not.toBe(primaryColor);
    expect(inheritedColor).toBe(getComputedStyle(inheritedParent).color);
    expect(inheritedColor).not.toBe(primaryColor);
    expect(inheritedColor).not.toBe(secondaryColor);
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Inline in paragraph',
  render: () => <Text type="body">
      Use <Code>useState</Code> for local state and <Code>useEffect</Code> for
      side effects. If you need shared state across components, consider{' '}
      <Code>useContext</Code> or a state management library.
    </Text>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Instructional text',
  render: () => <Stack gap={3}>
      <Text type="body">
        Install the package with <Code>npm install @astryxdesign/core</Code>,
        then import the component:
      </Text>
      <Text type="body">
        Add <Code>{'<Button label="Save">Save</Button>'}</Code> to your JSX. The{' '}
        <Code>label</Code> prop is required for accessibility.
      </Text>
    </Stack>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Mixed with links and emphasis',
  render: () => <Text type="body">
      The <Code>ThemeProvider</Code> component wraps your app and supplies
      design tokens. See the{' '}
      <Link href="/docs/theme" isExternalLink={false}>
        theme docs
      </Link>{' '}
      for setup. Set <Code>colorScheme=&quot;dark&quot;</Code> to enable dark
      mode.
    </Text>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Various code content',
  render: () => <Stack gap={2}>
      <Text type="body">
        Variable: <Code>const count = 0</Code>
      </Text>
      <Text type="body">
        Terminal: <Code>pnpm build --watch</Code>
      </Text>
      <Text type="body">
        CSS property: <Code>border-radius: 8px</Code>
      </Text>
      <Text type="body">
        File path: <Code>packages/core/src/CodeBlock/Code.tsx</Code>
      </Text>
      <Text type="body">
        Keyboard shortcut: <Code>Ctrl+Shift+P</Code>
      </Text>
    </Stack>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div data-testid="long-inline-container" style={{
    maxWidth: 240
  }}>
      <Text type="body">
        Long token:{' '}
        <Code data-testid="long-inline-code">
          aVeryLongUnbrokenIdentifierThatMustWrapInsideItsProseContainer
        </Code>
      </Text>
    </div>,
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const container = canvasElement.querySelector<HTMLElement>('[data-testid="long-inline-container"]');
    const code = canvasElement.querySelector<HTMLElement>('[data-testid="long-inline-code"]');
    if (!container || !code) {
      throw new Error('Code wrapping fixture did not render');
    }
    expect(code.getClientRects().length).toBeGreaterThan(1);
    expect(container.scrollWidth).toBeLessThanOrEqual(container.clientWidth);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Across text sizes',
  render: () => <Stack gap={2}>
      <Text type="large" data-testid="text-large">
        Heading with{' '}
        <Code size="inherit" data-testid="code-large">
          inline code
        </Code>
      </Text>
      <Text type="body" data-testid="text-body">
        Body text with{' '}
        <Code size="inherit" data-testid="code-body">
          inline code
        </Code>
      </Text>
      <Text type="supporting" data-testid="text-supporting">
        Detail text with{' '}
        <Code size="inherit" data-testid="code-supporting">
          inline code
        </Code>
      </Text>
      <Text type="label" data-testid="text-label">
        Label text with{' '}
        <Code size="inherit" data-testid="code-label">
          inline code
        </Code>
      </Text>
    </Stack>,
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const sizes = ['large', 'body', 'supporting', 'label'];
    const fontSizes: string[] = [];
    for (const size of sizes) {
      const parent = canvasElement.querySelector<HTMLElement>(\`[data-testid="text-\${size}"]\`);
      const code = canvasElement.querySelector<HTMLElement>(\`[data-testid="code-\${size}"]\`);
      if (!parent || !code) {
        throw new Error(\`Code inherited-size fixture did not render \${size}\`);
      }
      const parentStyle = getComputedStyle(parent);
      const codeStyle = getComputedStyle(code);
      expect(codeStyle.fontSize).toBe(parentStyle.fontSize);
      expect(codeStyle.lineHeight).toBe(parentStyle.lineHeight);
      fontSizes.push(codeStyle.fontSize);
    }
    expect(new Set(fontSizes).size).toBeGreaterThan(1);
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Colors`,`InParagraph`,`InstructionalParagraph`,`MixedInline`,`VariousContent`,`LongInlineContent`,`TextSizes`]})))()}S();export{m as Colors,p as Default,h as InParagraph,g as InstructionalParagraph,y as LongInlineContent,_ as MixedInline,b as TextSizes,v as VariousContent,x as __namedExportsOrder,f as default};