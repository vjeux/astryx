import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-DoGM0DEN.js";import{n as i,t as a}from"./MoreMenu-BH9y93R6.js";import{n as o,t as s}from"./ArrowDownTrayIcon-BX-7Ay7G.js";import{n as c,t as l}from"./Cog6ToothIcon-CMrx7Bfx.js";import{n as u,t as d}from"./DocumentDuplicateIcon-DGljD83Z.js";import{n as f,t as p}from"./PencilIcon-Cmm9HPbw.js";import{n as m,t as h}from"./ShareIcon-CRmUCwYw.js";import{n as g,t as _}from"./TrashIcon-BuvjJ71A.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{i(),n(),f(),g(),u(),o(),m(),c(),v=t(),y={title:`Core/MoreMenu`,component:a,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{items:{description:`Menu items (items, dividers, or sections)`},label:{control:`text`,description:`Accessible label for the trigger button`},variant:{control:`select`,options:[`primary`,`secondary`,`ghost`,`destructive`],description:`Visual style variant of the trigger button`},size:{control:`select`,options:[`sm`,`md`,`lg`],description:`Size of the trigger button`},isDisabled:{control:`boolean`,description:`Whether the menu trigger is disabled`},placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Position of the menu relative to the trigger`},alignment:{control:`select`,options:[`start`,`center`,`end`],description:`Alignment of the menu along the placement axis`},presentation:{control:`select`,options:[`popover`,`bottom-sheet`,`adaptive`],description:`Popover, BottomSheet, or adaptive compact-touch presentation`},"data-testid":{control:`text`,description:`Test ID for testing frameworks`}}},b={render:()=>(0,v.jsx)(a,{items:[{label:`Edit`,onClick:()=>console.log(`Edit clicked`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate clicked`)},{label:`Delete`,onClick:()=>console.log(`Delete clicked`)}]})},x={render:()=>(0,v.jsx)(a,{items:[{label:`Edit`,icon:p,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:d,onClick:()=>console.log(`Duplicate`)},{label:`Download`,icon:s,onClick:()=>console.log(`Download`)},{label:`Share`,icon:h,onClick:()=>console.log(`Share`)}]})},S={render:()=>(0,v.jsx)(a,{items:[{label:`Edit`,icon:p,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:d,onClick:()=>console.log(`Duplicate`)},{type:`divider`},{label:`Delete`,icon:_,onClick:()=>console.log(`Delete`)}]})},C={render:()=>(0,v.jsx)(a,{label:`Document actions`,items:[{type:`section`,title:`Actions`,items:[{label:`Edit`,icon:p,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:d,onClick:()=>console.log(`Duplicate`)}]},{type:`section`,title:`Danger zone`,items:[{label:`Delete`,icon:_,onClick:()=>console.log(`Delete`)}]}]})},w={render:()=>(0,v.jsx)(a,{size:`sm`,label:`Row actions`,items:[{label:`Edit`,icon:p,onClick:()=>console.log(`Edit`)},{type:`divider`},{label:`Delete`,icon:_,onClick:()=>console.log(`Delete`)}]})},T={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,v.jsx)(a,{variant:`ghost`,label:`Ghost variant`,items:[{label:`Action`,onClick:()=>{}}]}),(0,v.jsx)(a,{variant:`secondary`,label:`Secondary variant`,items:[{label:`Action`,onClick:()=>{}}]}),(0,v.jsx)(a,{variant:`primary`,label:`Primary variant`,items:[{label:`Action`,onClick:()=>{}}]})]})},E={render:()=>(0,v.jsx)(a,{isDisabled:!0,items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Delete`,onClick:()=>console.log(`Delete`)}]})},D={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,v.jsx)(r,{label:`Save`,variant:`primary`,onClick:()=>{}}),(0,v.jsx)(r,{label:`Preview`,variant:`secondary`,onClick:()=>{}}),(0,v.jsx)(a,{label:`More actions`,items:[{label:`Export`,icon:s,onClick:()=>console.log(`Export`)},{label:`Share`,icon:h,onClick:()=>console.log(`Share`)},{type:`divider`},{label:`Delete`,icon:_,onClick:()=>console.log(`Delete`)}]})]})},O={name:`Presentation / BottomSheet`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{story:{inline:!1,height:`560px`},description:{story:`The real MoreMenu component using DropdownMenu’s BottomSheet presentation. Its visible kebab trigger remains the discoverable mobile entry point.`}}},render:()=>(0,v.jsx)(`div`,{style:{padding:16,display:`flex`,justifyContent:`flex-end`},children:(0,v.jsx)(a,{presentation:`bottom-sheet`,label:`Project actions`,items:[{label:`Edit`,icon:p,onClick:()=>{}},{label:`Duplicate`,icon:d,onClick:()=>{}},{label:`Share`,icon:h,onClick:()=>{}},{label:`Delete`,icon:_,variant:`destructive`,onClick:()=>{}}]})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},k={name:`Presentation / adaptive`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{description:{story:"Uses the built-in adaptive policy: BottomSheet on a compact touch screen (a coarse primary pointer, and a viewport narrower than the theme `md` breakpoint (768px by default) or shorter than 500px), anchored popover otherwise. Use device emulation to exercise the touch branch."}}},render:()=>(0,v.jsx)(`div`,{style:{padding:16,display:`flex`,justifyContent:`flex-end`},children:(0,v.jsx)(a,{presentation:`adaptive`,label:`Project actions`,items:[{label:`Edit`,icon:p,onClick:()=>{}},{label:`Share`,icon:h,onClick:()=>{}},{label:`Delete`,icon:_,variant:`destructive`,onClick:()=>{}}]})})},A={render:()=>(0,v.jsx)(a,{label:`User actions`,items:[{label:`Alice Johnson`,onClick:()=>console.log(`Alice`)},{label:`Bob Smith`,onClick:()=>console.log(`Bob`)},{label:`Carol Williams`,onClick:()=>console.log(`Carol`)}]})},j={render:()=>(0,v.jsx)(a,{items:[{label:`Edit`,icon:p,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:d,onClick:()=>console.log(`Duplicate`),isDisabled:!0},{type:`divider`},{label:`Delete`,icon:_,onClick:()=>console.log(`Delete`),isDisabled:!0}]})},M={parameters:{layout:`padded`},render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:240,justifyContent:`center`,paddingBlock:120},children:[(0,v.jsx)(a,{label:`Start aligned`,items:[{label:`Edit`,icon:p,onClick:()=>{}},{label:`Duplicate`,icon:d,onClick:()=>{}},{type:`divider`},{label:`Delete`,icon:_,onClick:()=>{}}]}),(0,v.jsx)(a,{label:`End aligned`,alignment:`end`,items:[{label:`Edit`,icon:p,onClick:()=>{}},{label:`Duplicate`,icon:d,onClick:()=>{}},{type:`divider`},{label:`Delete`,icon:_,onClick:()=>{}}]})]})},N={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,v.jsx)(a,{icon:(0,v.jsx)(l,{}),label:`Settings`,items:[{label:`Preferences`,onClick:()=>console.log(`Preferences`)},{label:`Account`,onClick:()=>console.log(`Account`)},{label:`Logout`,onClick:()=>console.log(`Logout`)}]}),(0,v.jsx)(a,{icon:(0,v.jsx)(p,{}),label:`Edit options`,items:[{label:`Edit title`,onClick:()=>console.log(`Edit title`)},{label:`Edit description`,onClick:()=>console.log(`Edit description`)}]})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu items={[{
    label: 'Edit',
    onClick: () => console.log('Edit clicked')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate clicked')
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete clicked')
  }]} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu items={[{
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    icon: DocumentDuplicateIcon,
    onClick: () => console.log('Duplicate')
  }, {
    label: 'Download',
    icon: ArrowDownTrayIcon,
    onClick: () => console.log('Download')
  }, {
    label: 'Share',
    icon: ShareIcon,
    onClick: () => console.log('Share')
  }]} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu items={[{
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    icon: DocumentDuplicateIcon,
    onClick: () => console.log('Duplicate')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => console.log('Delete')
  }]} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu label="Document actions" items={[{
    type: 'section',
    title: 'Actions',
    items: [{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => console.log('Edit')
    }, {
      label: 'Duplicate',
      icon: DocumentDuplicateIcon,
      onClick: () => console.log('Duplicate')
    }]
  }, {
    type: 'section',
    title: 'Danger zone',
    items: [{
      label: 'Delete',
      icon: TrashIcon,
      onClick: () => console.log('Delete')
    }]
  }]} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu size="sm" label="Row actions" items={[{
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => console.log('Edit')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => console.log('Delete')
  }]} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <MoreMenu variant="ghost" label="Ghost variant" items={[{
      label: 'Action',
      onClick: () => {}
    }]} />
      <MoreMenu variant="secondary" label="Secondary variant" items={[{
      label: 'Action',
      onClick: () => {}
    }]} />
      <MoreMenu variant="primary" label="Primary variant" items={[{
      label: 'Action',
      onClick: () => {}
    }]} />
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu isDisabled items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete')
  }]} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  }}>
      <Button label="Save" variant="primary" onClick={() => {}} />
      <Button label="Preview" variant="secondary" onClick={() => {}} />
      <MoreMenu label="More actions" items={[{
      label: 'Export',
      icon: ArrowDownTrayIcon,
      onClick: () => console.log('Export')
    }, {
      label: 'Share',
      icon: ShareIcon,
      onClick: () => console.log('Share')
    }, {
      type: 'divider'
    }, {
      label: 'Delete',
      icon: TrashIcon,
      onClick: () => console.log('Delete')
    }]} />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / BottomSheet',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      story: {
        inline: false,
        height: '560px'
      },
      description: {
        story: 'The real MoreMenu component using DropdownMenu’s BottomSheet presentation. Its visible kebab trigger remains the discoverable mobile entry point.'
      }
    }
  },
  render: () => <div style={{
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-end'
  }}>
      <MoreMenu presentation="bottom-sheet" label="Project actions" items={[{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => {}
    }, {
      label: 'Duplicate',
      icon: DocumentDuplicateIcon,
      onClick: () => {}
    }, {
      label: 'Share',
      icon: ShareIcon,
      onClick: () => {}
    }, {
      label: 'Delete',
      icon: TrashIcon,
      variant: 'destructive',
      onClick: () => {}
    }]} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / adaptive',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Uses the built-in adaptive policy: BottomSheet on a compact touch screen (a coarse primary pointer, and a viewport narrower than the theme \`md\` breakpoint (768px by default) or shorter than 500px), anchored popover otherwise. Use device emulation to exercise the touch branch.'
      }
    }
  },
  render: () => <div style={{
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-end'
  }}>
      <MoreMenu presentation="adaptive" label="Project actions" items={[{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => {}
    }, {
      label: 'Share',
      icon: ShareIcon,
      onClick: () => {}
    }, {
      label: 'Delete',
      icon: TrashIcon,
      variant: 'destructive',
      onClick: () => {}
    }]} />
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu label="User actions" items={[{
    label: 'Alice Johnson',
    onClick: () => console.log('Alice')
  }, {
    label: 'Bob Smith',
    onClick: () => console.log('Bob')
  }, {
    label: 'Carol Williams',
    onClick: () => console.log('Carol')
  }]} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <MoreMenu items={[{
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    icon: DocumentDuplicateIcon,
    onClick: () => console.log('Duplicate'),
    isDisabled: true
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => console.log('Delete'),
    isDisabled: true
  }]} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    gap: 240,
    justifyContent: 'center',
    paddingBlock: 120
  }}>
      <MoreMenu label="Start aligned" items={[{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => {}
    }, {
      label: 'Duplicate',
      icon: DocumentDuplicateIcon,
      onClick: () => {}
    }, {
      type: 'divider'
    }, {
      label: 'Delete',
      icon: TrashIcon,
      onClick: () => {}
    }]} />
      <MoreMenu label="End aligned" alignment="end" items={[{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => {}
    }, {
      label: 'Duplicate',
      icon: DocumentDuplicateIcon,
      onClick: () => {}
    }, {
      type: 'divider'
    }, {
      label: 'Delete',
      icon: TrashIcon,
      onClick: () => {}
    }]} />
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <MoreMenu icon={<Cog6ToothIcon />} label="Settings" items={[{
      label: 'Preferences',
      onClick: () => console.log('Preferences')
    }, {
      label: 'Account',
      onClick: () => console.log('Account')
    }, {
      label: 'Logout',
      onClick: () => console.log('Logout')
    }]} />
      <MoreMenu icon={<PencilIcon />} label="Edit options" items={[{
      label: 'Edit title',
      onClick: () => console.log('Edit title')
    }, {
      label: 'Edit description',
      onClick: () => console.log('Edit description')
    }]} />
    </div>
}`,...N.parameters?.docs?.source}}},P=[`Default`,`WithIcons`,`WithDividers`,`WithSections`,`SmallSize`,`Variants`,`Disabled`,`InToolbar`,`BottomSheetPresentation`,`AdaptivePresentation`,`CustomItemRendering`,`WithDisabledItems`,`Alignment`,`CustomIcon`]})))()}F();export{k as AdaptivePresentation,M as Alignment,O as BottomSheetPresentation,N as CustomIcon,A as CustomItemRendering,b as Default,E as Disabled,D as InToolbar,w as SmallSize,T as Variants,j as WithDisabledItems,S as WithDividers,x as WithIcons,C as WithSections,P as __namedExportsOrder,y as default};