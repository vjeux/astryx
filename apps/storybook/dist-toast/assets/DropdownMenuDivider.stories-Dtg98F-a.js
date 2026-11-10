import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{d as n,f as r,l as i,u as a}from"./renderDropdownItems-hNxj8lO0.js";import{n as o,t as s}from"./DropdownMenu-M0We7Ho-.js";var c,l,u,d,f,p,m;function h(){return(h=e((()=>{o(),a(),r(),c=t(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Core/DropdownMenuDivider`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:'A non-interactive horizontal separator between groups of pointer-menu rows. In pointer presentations, the same component renders the data API’s `{type: "divider"}` entry.'}}}},p={render:()=>(0,c.jsxs)(s,{button:{label:`Open divider evidence`},children:[(0,c.jsx)(n,{label:`Edit`}),(0,c.jsx)(i,{"data-testid":`dropdown-menu-divider-evidence`}),(0,c.jsx)(n,{label:`Delete`,variant:`destructive`})]}),play:async({canvasElement:e})=>{let t=d(e);await u.click(t.getByRole(`button`,{name:`Open divider evidence`})),await l(d(document.body).getByRole(`separator`)).toHaveAttribute(`aria-orientation`,`horizontal`)}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Open divider evidence'
  }}>
      <DropdownMenuItem label="Edit" />
      <DropdownMenuDivider data-testid="dropdown-menu-divider-evidence" />
      <DropdownMenuItem label="Delete" variant="destructive" />
    </DropdownMenu>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open divider evidence'
    }));
    await expect(within(document.body).getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  }
}`,...p.parameters?.docs?.source}}},m=[`MenuSeparator`]})))()}h();export{p as MenuSeparator,m as __namedExportsOrder,f as default};