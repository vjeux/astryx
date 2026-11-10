import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Selector-MAEgY-r1.js";var i,a,o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),i=t(),{expect:a,userEvent:o,waitFor:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`a11y/Combobox pattern`,component:r,tags:[`no-visual`],parameters:{layout:`centered`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:280},children:(0,i.jsx)(e,{})})],args:{label:`Fruit`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],onChange:()=>{}}},u={},d={play:async({canvasElement:e})=>{let t=c(e);await o.click(t.getByRole(`combobox`,{name:`Fruit`})),await a(t.getByRole(`combobox`,{name:`Fruit`})).toHaveAttribute(`aria-expanded`,`true`)}},f={args:{isReadOnly:!0,value:`apple`}},p={args:{isLoading:!0}},m={args:{presentation:`bottom-sheet`},play:async({canvasElement:e})=>{let t=c(e);await o.click(t.getByRole(`combobox`,{name:`Fruit`}));let n=c(e.ownerDocument.body);await a(await n.findByRole(`dialog`,{name:`Fruit`})).toBeVisible()}},h={args:{hasSearch:!0},play:async({canvasElement:e})=>{let t=c(e);await o.click(t.getByRole(`button`,{name:/Fruit/}));let n=await c(e.ownerDocument.body).findByRole(`combobox`,{name:`Search options`});await s(()=>a(n).toHaveFocus()),await o.keyboard(`{ArrowDown}`),await s(()=>a(n).toHaveAttribute(`aria-activedescendant`))}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox', {
      name: 'Fruit'
    }));
    await expect(canvas.getByRole('combobox', {
      name: 'Fruit'
    })).toHaveAttribute('aria-expanded', 'true');
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    isReadOnly: true,
    value: 'apple'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    presentation: 'bottom-sheet'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox', {
      name: 'Fruit'
    }));
    const page = within(canvasElement.ownerDocument.body);
    await expect(await page.findByRole('dialog', {
      name: 'Fruit'
    })).toBeVisible();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    hasSearch: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /Fruit/
    }));
    const page = within(canvasElement.ownerDocument.body);
    const search = await page.findByRole('combobox', {
      name: 'Search options'
    });
    await waitFor(() => expect(search).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(search).toHaveAttribute('aria-activedescendant'));
  }
}`,...h.parameters?.docs?.source}}},g=[`SelectorClosed`,`SelectorOpen`,`SelectorReadOnly`,`SelectorBusy`,`SelectorSheetOpen`,`SelectorSearchActive`]})))()}_();export{p as SelectorBusy,u as SelectorClosed,d as SelectorOpen,f as SelectorReadOnly,h as SelectorSearchActive,m as SelectorSheetOpen,g as __namedExportsOrder,l as default};