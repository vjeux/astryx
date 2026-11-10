import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,n as r,o as i,t as a}from"./Markdown-BzOsAWcI.js";var o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{r(),i(),o=t(),{expect:s,userEvent:c,within:l}=__STORYBOOK_MODULE_TEST__,u={title:`Core/Markdown`,component:a},d=`# Linkable headings

Hover a heading area or move keyboard focus to reveal the \`#\` copy button. On touch it stays visible. Activating it copies the full permalink without changing the current hash, scroll position, or page.

> ## Nested heading

## Read the [guide](https://example.com/guide)

### Third-level heading

#### Fourth-level heading

##### Fifth-level heading

###### Sixth-level heading

## A narrow heading whose trailing control stays with its final text line

## Ｈｅｌｌｏ Привет 你好 😄 １２３

## Repeat

## Repeat

## Repeat-1`,f=[n({headingIdPrefix:`heading-links-ltr`})],p=[n({headingIdPrefix:`heading-links-rtl`})],m=[n({headingIdPrefix:`heading-links-compact`})],h={name:`Heading links`,parameters:{docs:{description:{story:`The opt-in first-party module gives every built-in h1–h6 an inline trailing # copy button. It is hidden at fine-pointer rest, reveals when the heading row is hovered or receives keyboard focus, and follows useContainerReveal touch behavior. Activating it copies the canonical permalink without navigation, hash mutation, or scrolling; the fixed-space # becomes a check for ~1.5 seconds. The coarse target keeps the 24px AA floor while its painted control remains centered on the heading line box. Nested headings share the depth-first allocator, authored heading links remain valid, Unicode ids remain readable, and a caller-owned namespace keeps multiple documents distinct.`}}},render:()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{id:`heading-links-ltr`,plugins:f,children:d}),(0,o.jsx)(`section`,{dir:`rtl`,"aria-label":`Right-to-left heading links`,children:(0,o.jsx)(a,{id:`heading-links-rtl`,plugins:p,children:`# عنوان قابل للربط

## تفاصيل`})}),(0,o.jsx)(`section`,{"aria-label":`Compact heading links`,children:(0,o.jsx)(a,{id:`heading-links-compact`,density:`compact`,plugins:m,children:`# Compact first-level heading

## Compact second-level heading

### Compact third-level heading

#### Compact fourth-level heading

##### Compact fifth-level heading

###### Compact sixth-level heading

###### Compact sixth-level heading`})}),(0,o.jsx)(`div`,{"aria-hidden":`true`,className:`x10l6tqk xlshs6z x47corl`,children:(0,o.jsx)(a,{id:`heading-links-reference`,children:d})})]}),play:async({canvasElement:e})=>{let t=l(e),n=e.querySelector(`#heading-links-ltr`);if(n==null)throw Error(`missing namespaced Markdown root`);let r=l(n).getByRole(`heading`,{name:`Linkable headings`});await s(r).toHaveAttribute(`id`,`heading-links-ltr--linkable-headings`);let i=l(n).getByRole(`button`,{name:`Copy link to Linkable headings`});await s(i).toHaveAttribute(`type`,`button`),await s(i).not.toHaveAttribute(`href`),await s(r.parentElement).toContainElement(i),await s(r).not.toContainElement(i);for(let[e,t]of[[1,`Linkable headings`],[2,`Read the guide`],[3,`Third-level heading`],[4,`Fourth-level heading`],[5,`Fifth-level heading`],[6,`Sixth-level heading`]]){let r=l(n).getByRole(`heading`,{level:e,name:t}),i=l(r.parentElement).getByRole(`button`);await s(i).toHaveAccessibleName(`Copy link to ${t}`)}await s(l(n).getByRole(`heading`,{name:`Nested heading`})).toHaveAttribute(`id`,`heading-links-ltr--nested-heading`),await s(l(n).getByRole(`heading`,{name:`Read the guide`})).toContainElement(l(n).getByRole(`link`,{name:`guide`})),await s(n.querySelector(`a a`)).toBeNull(),await s(l(n).getByRole(`heading`,{name:/Ｈｅｌｌｏ Привет 你好/})).toHaveAttribute(`id`,`heading-links-ltr--hello-привет-你好-123`),await s(Array.from(n.querySelectorAll(`h1,h2`)).slice(-3).map(e=>e.id)).toEqual([`heading-links-ltr--repeat`,`heading-links-ltr--repeat-1`,`heading-links-ltr--repeat-1-1`]),await c.tab(),await s(i).toHaveFocus(),await s(t.getByRole(`button`,{name:`Copy link to عنوان قابل للربط`})).toHaveAttribute(`type`,`button`),i.blur(),n.dataset.headingLinksPlayComplete=`true`}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Heading links',
  parameters: {
    docs: {
      description: {
        story: 'The opt-in first-party module gives every built-in h1–h6 an inline trailing # copy button. It is hidden at fine-pointer rest, reveals when the heading row is hovered or receives keyboard focus, and follows useContainerReveal touch behavior. Activating it copies the canonical permalink without navigation, hash mutation, or scrolling; the fixed-space # becomes a check for ~1.5 seconds. The coarse target keeps the 24px AA floor while its painted control remains centered on the heading line box. Nested headings share the depth-first allocator, authored heading links remain valid, Unicode ids remain readable, and a caller-owned namespace keeps multiple documents distinct.'
      }
    }
  },
  render: () => <>
      <Markdown id="heading-links-ltr" plugins={ltrPlugins}>
        {SOURCE}
      </Markdown>
      <section dir="rtl" aria-label="Right-to-left heading links">
        <Markdown id="heading-links-rtl" plugins={rtlPlugins}>
          {'# عنوان قابل للربط\\n\\n## تفاصيل'}
        </Markdown>
      </section>
      <section aria-label="Compact heading links">
        <Markdown id="heading-links-compact" density="compact" plugins={compactPlugins}>
          {['# Compact first-level heading', '## Compact second-level heading', '### Compact third-level heading', '#### Compact fourth-level heading', '##### Compact fifth-level heading', '###### Compact sixth-level heading', '###### Compact sixth-level heading'].join('\\n\\n')}
        </Markdown>
      </section>
      <div aria-hidden="true" {...stylex.props(styles.geometryReference)}>
        <Markdown id="heading-links-reference">{SOURCE}</Markdown>
      </div>
    </>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const ltr = canvasElement.querySelector<HTMLElement>('#heading-links-ltr');
    if (ltr == null) {
      throw new Error('missing namespaced Markdown root');
    }
    const firstHeading = within(ltr).getByRole('heading', {
      name: 'Linkable headings'
    });
    await expect(firstHeading).toHaveAttribute('id', 'heading-links-ltr--linkable-headings');
    const firstPermalink = within(ltr).getByRole('button', {
      name: 'Copy link to Linkable headings'
    });
    await expect(firstPermalink).toHaveAttribute('type', 'button');
    await expect(firstPermalink).not.toHaveAttribute('href');
    await expect(firstHeading.parentElement).toContainElement(firstPermalink);
    await expect(firstHeading).not.toContainElement(firstPermalink);
    for (const [level, name] of [[1, 'Linkable headings'], [2, 'Read the guide'], [3, 'Third-level heading'], [4, 'Fourth-level heading'], [5, 'Fifth-level heading'], [6, 'Sixth-level heading']] as const) {
      const heading = within(ltr).getByRole('heading', {
        level,
        name
      });
      const button = within(heading.parentElement as HTMLElement).getByRole('button');
      await expect(button).toHaveAccessibleName(\`Copy link to \${name}\`);
    }
    await expect(within(ltr).getByRole('heading', {
      name: 'Nested heading'
    })).toHaveAttribute('id', 'heading-links-ltr--nested-heading');
    await expect(within(ltr).getByRole('heading', {
      name: 'Read the guide'
    })).toContainElement(within(ltr).getByRole('link', {
      name: 'guide'
    }));
    await expect(ltr.querySelector('a a')).toBeNull();
    await expect(within(ltr).getByRole('heading', {
      name: /Ｈｅｌｌｏ Привет 你好/
    })).toHaveAttribute('id', 'heading-links-ltr--hello-привет-你好-123');
    await expect(Array.from(ltr.querySelectorAll('h1,h2')).slice(-3).map(node => node.id)).toEqual(['heading-links-ltr--repeat', 'heading-links-ltr--repeat-1', 'heading-links-ltr--repeat-1-1']);
    await userEvent.tab();
    await expect(firstPermalink).toHaveFocus();
    await expect(canvas.getByRole('button', {
      name: 'Copy link to عنوان قابل للربط'
    })).toHaveAttribute('type', 'button');
    firstPermalink.blur();
    ltr.dataset.headingLinksPlayComplete = 'true';
  }
}`,...h.parameters?.docs?.source}}},g=[`HeadingLinks`]})))()}_();export{h as HeadingLinks,g as __namedExportsOrder,u as default};