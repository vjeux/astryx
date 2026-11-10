import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{d as n,f as r}from"./renderDropdownItems-hNxj8lO0.js";import{n as i,t as a}from"./DropdownMenuGroup-Droqd1s-.js";import{n as o,t as s}from"./DropdownMenu-M0We7Ho-.js";var c,l,u,d,f,p,m;function h(){return(h=e((()=>{o(),i(),r(),c=t(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Core/DropdownMenuGroup`,component:a,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`,docs:{description:{component:`Groups related compound-menu rows under an optional non-interactive heading. A visible heading names role="group"; an untitled group remains unnamed.`}}}},p={render:()=>(0,c.jsxs)(s,{button:{label:`Open group evidence`},presentation:`popover`,children:[(0,c.jsxs)(a,{title:`Version history`,children:[(0,c.jsx)(n,{label:`Restore this version`,onClick:()=>{}}),(0,c.jsx)(n,{label:`Compare with current`,onClick:()=>{}})]}),(0,c.jsx)(a,{children:(0,c.jsx)(n,{label:`Delete version`,variant:`destructive`,onClick:()=>{}})})]}),play:async({canvasElement:e})=>{let t=d(e);await u.click(t.getByRole(`button`,{name:`Open group evidence`}));let n=await d(document.body).findByRole(`menu`),r=d(n),i=r.getAllByRole(`group`);await l(i).toHaveLength(2),await l(r.getByRole(`group`,{name:`Version history`})).toBeInTheDocument(),await l(i[1]).not.toHaveAttribute(`aria-labelledby`)}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Open group evidence'
  }} presentation="popover">
      <DropdownMenuGroup title="Version history">
        <DropdownMenuItem label="Restore this version" onClick={() => {}} />
        <DropdownMenuItem label="Compare with current" onClick={() => {}} />
      </DropdownMenuGroup>
      <DropdownMenuGroup>
        <DropdownMenuItem label="Delete version" variant="destructive" onClick={() => {}} />
      </DropdownMenuGroup>
    </DropdownMenu>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open group evidence'
    }));
    const menu = await within(document.body).findByRole('menu');
    const menuScope = within(menu);
    const groups = menuScope.getAllByRole('group');
    await expect(groups).toHaveLength(2);
    await expect(menuScope.getByRole('group', {
      name: 'Version history'
    })).toBeInTheDocument();
    await expect(groups[1]).not.toHaveAttribute('aria-labelledby');
  }
}`,...p.parameters?.docs?.source}}},m=[`NamedAndUnnamedGroups`]})))()}h();export{p as NamedAndUnnamedGroups,m as __namedExportsOrder,f as default};