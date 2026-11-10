import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{d as r,f as i}from"./renderDropdownItems-hNxj8lO0.js";import{n as a,t as o}from"./DropdownMenu-M0We7Ho-.js";import{n as s,t as c}from"./Cog6ToothIcon-CMrx7Bfx.js";import{n as l,t as u}from"./DocumentDuplicateIcon-DGljD83Z.js";import{n as d,t as f}from"./PencilIcon-Cmm9HPbw.js";import{n as p,t as m}from"./TrashIcon-BuvjJ71A.js";function h(){let[e,t]=(0,g.useState)(!1);return(0,_.jsxs)(o,{button:{label:`Open item evidence`},menuWidth:280,presentation:`popover`,children:[(0,_.jsx)(r,{"data-testid":`default-row`,icon:f,label:`Edit project`,onClick:()=>{}}),(0,_.jsx)(r,{"data-testid":`supporting-row`,icon:u,label:`Duplicate project`,description:`Create an editable copy`,endContent:(0,_.jsx)(`span`,{"aria-live":`polite`,role:`status`,children:e?`Copied`:(0,_.jsx)(`span`,{"aria-hidden":`true`,children:`⌘D`})}),hasCloseOnSelect:!1,onClick:()=>t(!0)}),(0,_.jsx)(r,{"data-testid":`destructive-row`,icon:m,label:`Delete project`,variant:`destructive`,onClick:()=>{}}),(0,_.jsx)(r,{"data-testid":`disabled-row`,label:`Archive unavailable`,isDisabled:!0,onClick:()=>{}}),(0,_.jsx)(r,{"data-testid":`link-row`,icon:c,label:`Project settings`,href:`/settings`})]})}var g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{g=t(),a(),i(),s(),l(),d(),p(),_=n(),{expect:v,userEvent:y,within:b}=__STORYBOOK_MODULE_TEST__,x={title:`Core/DropdownMenuItem`,component:r,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`,docs:{description:{component:`One pointer-menu row for an action or destination. The parent menu owns keyboard navigation; the row owns activation, disabled state, optional destination semantics, content layout, and its theme target.`}}}},S={render:()=>(0,_.jsx)(h,{}),play:async({canvasElement:e})=>{let t=b(e).getByRole(`button`,{name:`Open item evidence`}),n=t.getBoundingClientRect();await y.pointer({keys:`[MouseLeft]`,target:t,coords:{clientX:n.x+n.width/2,clientY:n.y+n.height/2}});let r=await b(document.body).findByRole(`menu`),i=b(r);await v(i.getAllByRole(`menuitem`)).toHaveLength(5),await v(i.getByRole(`menuitem`,{name:`Archive unavailable`})).toHaveAttribute(`aria-disabled`,`true`),await v(i.getByRole(`menuitem`,{name:`Project settings`})).toHaveAttribute(`href`,`/settings`)}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <ItemStatesFixture />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Open item evidence'
    });
    const box = trigger.getBoundingClientRect();
    // Press and release on the trigger itself. A click without coordinates
    // releases at the page's corner. The open's own render can outlast the
    // menu's settle delay on a loaded machine. After that delay, a release
    // outside the trigger and the menu closes it.
    await userEvent.pointer({
      keys: '[MouseLeft]',
      target: trigger,
      coords: {
        clientX: box.x + box.width / 2,
        clientY: box.y + box.height / 2
      }
    });
    const menu = await within(document.body).findByRole('menu');
    const scope = within(menu);
    await expect(scope.getAllByRole('menuitem')).toHaveLength(5);
    await expect(scope.getByRole('menuitem', {
      name: 'Archive unavailable'
    })).toHaveAttribute('aria-disabled', 'true');
    await expect(scope.getByRole('menuitem', {
      name: 'Project settings'
    })).toHaveAttribute('href', '/settings');
  }
}`,...S.parameters?.docs?.source}}},C=[`ItemStates`]})))()}w();export{S as ItemStates,C as __namedExportsOrder,x as default};