import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,n as i,r as a,t as o}from"./DropdownMenuRadioItem-C2DSscdw.js";import{n as s,t as c}from"./DropdownMenu-M0We7Ho-.js";function l(){let[e,t]=(0,u.useState)(`newest`),[n,r]=(0,u.useState)(0);return(0,d.jsx)(`div`,{"data-testid":`dropdown-menu-radio-group-audit`,"data-close-request-count":n,children:(0,d.jsx)(c,{button:{label:`Sort`},isMenuOpen:!0,onOpenChange:e=>{e||r(e=>e+1)},menuWidth:280,presentation:`popover`,children:(0,d.jsxs)(a,{"data-testid":`sort-group`,value:e,onChange:t,label:`Sort options`,hasCloseOnSelect:!1,children:[(0,d.jsx)(o,{value:`newest`,label:`Newest first`}),(0,d.jsx)(o,{value:`oldest`,label:`Oldest first`,description:`Use creation date`}),(0,d.jsx)(o,{value:`name`,label:`Name`})]})})})}var u,d,f,p,m,h,g;function _(){return(_=e((()=>{u=t(),s(),r(),i(),d=n(),{expect:f,within:p}=__STORYBOOK_MODULE_TEST__,m={title:`Core/DropdownMenuRadioGroup`,component:a,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`,docs:{description:{component:`A named controlled single-selection group inside DropdownMenu. The group owns value propagation and close policy; DropdownMenu owns keyboard navigation and each DropdownMenuRadioItem owns its row semantics and paint.`}}}},h={render:()=>(0,d.jsx)(l,{}),play:async()=>{let e=await p(document.body).findByRole(`menu`),t=p(e).getByRole(`group`,{name:`Sort options`});await f(p(t).getAllByRole(`menuitemradio`)).toHaveLength(3),await f(p(t).getByRole(`menuitemradio`,{name:`Newest first`})).toHaveAttribute(`aria-checked`,`true`)}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledSelectionFixture />,
  play: async () => {
    const menu = await within(document.body).findByRole('menu');
    const scope = within(menu);
    const group = scope.getByRole('group', {
      name: 'Sort options'
    });
    await expect(within(group).getAllByRole('menuitemradio')).toHaveLength(3);
    await expect(within(group).getByRole('menuitemradio', {
      name: 'Newest first'
    })).toHaveAttribute('aria-checked', 'true');
  }
}`,...h.parameters?.docs?.source}}},g=[`ControlledSelection`]})))()}_();export{h as ControlledSelection,g as __namedExportsOrder,m as default};