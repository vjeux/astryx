import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{d as r,f as i}from"./renderDropdownItems-hNxj8lO0.js";import{n as a,t as o}from"./Divider-DkevuVb8.js";import{n as s,t as c}from"./DropdownMenuCheckboxItem-CDJsJQ4U.js";import{i as l,n as u,r as d,t as f}from"./DropdownMenuRadioItem-C2DSscdw.js";import{n as p,t as m}from"./ContextMenu-Di_JOkJz.js";import{n as h,t as g}from"./ArrowDownTrayIcon-BX-7Ay7G.js";import{n as _,t as v}from"./ClipboardDocumentIcon-DRSo6Bdn.js";import{i as y,n as b,r as x,t as S}from"./ScissorsIcon-jj90jfH2.js";import{n as C,t as w}from"./DocumentDuplicateIcon-DGljD83Z.js";import{n as T,t as E}from"./PencilIcon-Cmm9HPbw.js";import{n as D,t as O}from"./ShareIcon-CRmUCwYw.js";import{n as k,t as A}from"./TrashIcon-BuvjJ71A.js";var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{j=t(),p(),i(),s(),l(),u(),a(),T(),k(),C(),h(),D(),b(),y(),_(),M=n(),N={title:`Core/ContextMenu`,component:m,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{items:{description:`Menu items (items, dividers, or sections)`},menuWidth:{control:`text`,description:`Custom menu width (number for px or CSS string)`},size:{control:`select`,options:[`sm`,`md`,`lg`],description:`Menu item size`},isDisabled:{control:`boolean`,description:`Disable custom context menu`},presentation:{control:`select`,options:[`popover`,`bottom-sheet`,`adaptive`],description:`Cursor popover, BottomSheet, or adaptive compact-touch presentation`},"data-testid":{control:`text`,description:`Test ID for testing frameworks`}}},P={render:()=>(0,M.jsx)(m,{items:[{label:`Cut`,onClick:()=>console.log(`Cut`)},{label:`Copy`,onClick:()=>console.log(`Copy`)},{label:`Paste`,onClick:()=>console.log(`Paste`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click this area`})})},F={name:`Presentation / pointer menu`,tags:[`visual-theme-matrix`],render:()=>(0,M.jsx)(m,{"data-testid":`pointer-context-menu`,label:`Document actions`,items:[{label:`Edit`,icon:E,onClick:()=>{}},{label:`Duplicate`,icon:w,onClick:()=>{}},{type:`divider`},{label:`Delete`,icon:A,variant:`destructive`,onClick:()=>{}}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for document actions`})}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-testid="pointer-context-menu"]`),n=t?.getBoundingClientRect();t?.dispatchEvent(new MouseEvent(`contextmenu`,{bubbles:!0,clientX:(n?.left??0)+40,clientY:(n?.top??0)+40}))}},I={render:()=>(0,M.jsx)(m,{items:[{label:`Cut`,icon:S,onClick:()=>console.log(`Cut`)},{label:`Copy`,icon:v,onClick:()=>console.log(`Copy`)},{label:`Paste`,icon:x,onClick:()=>console.log(`Paste`)},{type:`divider`},{label:`Delete`,icon:A,onClick:()=>console.log(`Delete`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for actions`})})},L={name:`Destructive item`,render:()=>(0,M.jsx)(m,{items:[{label:`Rename`,onClick:()=>console.log(`Rename`)},{label:`Duplicate`,icon:v,onClick:()=>console.log(`Duplicate`)},{type:`divider`},{label:`Delete`,icon:A,variant:`destructive`,onClick:()=>console.log(`Delete`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for actions`})})},R={render:()=>(0,M.jsx)(m,{items:[{type:`section`,title:`Edit`,items:[{label:`Cut`,icon:S,onClick:()=>console.log(`Cut`)},{label:`Copy`,icon:v,onClick:()=>console.log(`Copy`)},{label:`Paste`,icon:x,onClick:()=>console.log(`Paste`)}]},{type:`section`,title:`Share`,items:[{label:`Share`,icon:O,onClick:()=>console.log(`Share`)},{label:`Download`,icon:g,onClick:()=>console.log(`Download`)}]}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for grouped actions`})})},z={render:()=>(0,M.jsx)(m,{items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{type:`divider`},{label:`Delete`,onClick:()=>console.log(`Delete`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click this area`})})},B={render:()=>(0,M.jsx)(m,{items:[{label:`Edit`,icon:E,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:w,onClick:()=>console.log(`Duplicate`)},{label:`Delete (no permission)`,icon:A,isDisabled:!0}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click this area`})})},V={render:()=>(0,M.jsx)(m,{menuWidth:280,items:[{label:`This is a longer option that needs more space`,onClick:()=>console.log(`Option 1`)},{label:`Another long option`,onClick:()=>console.log(`Option 2`)},{label:`Short`,onClick:()=>console.log(`Option 3`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for wide menu`})})},H={render:()=>(0,M.jsx)(m,{size:`sm`,items:[{label:`Cut`,onClick:()=>console.log(`Cut`)},{label:`Copy`,onClick:()=>console.log(`Copy`)},{label:`Paste`,onClick:()=>console.log(`Paste`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for compact menu`})})},U={render:()=>(0,M.jsx)(m,{isDisabled:!0,items:[{label:`Cut`,onClick:()=>console.log(`Cut`)},{label:`Copy`,onClick:()=>console.log(`Copy`)}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click shows native menu (disabled)`})})},W={render:()=>(0,M.jsx)(m,{menuContent:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(r,{icon:E,label:`Edit`,onClick:()=>console.log(`Edit`)}),(0,M.jsx)(r,{icon:w,label:`Duplicate`,onClick:()=>console.log(`Duplicate`)}),(0,M.jsx)(o,{}),(0,M.jsx)(r,{icon:A,label:`Delete`,onClick:()=>console.log(`Delete`)})]}),children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for compound menu`})})},G={render:()=>(0,M.jsx)(m,{menuWidth:280,menuContent:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(r,{icon:E,label:`Edit`,description:`Modify this item`,onClick:()=>console.log(`Edit`)}),(0,M.jsx)(r,{icon:O,label:`Share`,description:`Share with others`,onClick:()=>console.log(`Share`)}),(0,M.jsx)(o,{}),(0,M.jsx)(r,{icon:A,label:`Delete`,description:`Permanently remove`,onClick:()=>console.log(`Delete`)})]}),children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for detailed menu`})})},K={render:function(){let[e,t]=(0,j.useState)(`name`),[n,i]=(0,j.useState)(!1),[a,s]=(0,j.useState)(!0);return(0,M.jsx)(m,{menuWidth:220,menuContent:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(r,{icon:E,label:`Rename`,onClick:()=>console.log(`Rename`)}),(0,M.jsx)(o,{}),(0,M.jsxs)(d,{value:e,onChange:t,label:`Sort by`,children:[(0,M.jsx)(f,{value:`name`,label:`Sort by name`}),(0,M.jsx)(f,{value:`date`,label:`Sort by date`}),(0,M.jsx)(f,{value:`size`,label:`Sort by size`})]}),(0,M.jsx)(o,{}),(0,M.jsx)(c,{label:`Show hidden files`,value:n,onChange:i}),(0,M.jsx)(c,{label:`Show preview pane`,value:a,onChange:s})]}),children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click for selectable items`})})},parameters:{docs:{description:{story:`Checkbox and radio menu items compose inside a ContextMenu just like in a DropdownMenu. The radio group is a single-select set (menuitemradio) that closes the menu on selection; the checkbox items are independent toggles (menuitemcheckbox) that keep the menu open so several can be flipped. Arrow keys, typeahead, and Enter/Space traverse and activate all three row types alongside plain items.`}}}},q={name:`Presentation / BottomSheet`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{story:{inline:!1,height:`560px`},description:{story:`The real ContextMenu component forced to BottomSheet presentation. Long-press opens this surface on touch; this story opens it with a contextmenu event so the sheet is directly reviewable.`}}},render:()=>(0,M.jsx)(`div`,{style:{padding:16},children:(0,M.jsx)(m,{"data-testid":`bottom-sheet-context-menu`,presentation:`bottom-sheet`,label:`Document actions`,items:[{label:`Edit`,icon:E,onClick:()=>{}},{label:`Duplicate`,icon:w,onClick:()=>{}},{label:`Share`,icon:O,onClick:()=>{}},{label:`Delete`,icon:A,variant:`destructive`,onClick:()=>{}}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Long-press or right-click for document actions`})})}),play:async({canvasElement:e})=>{e.querySelector(`[data-testid="bottom-sheet-context-menu"]`)?.dispatchEvent(new MouseEvent(`contextmenu`,{bubbles:!0,clientX:40,clientY:40}))}},J={name:`Presentation / adaptive`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{description:{story:"Uses the built-in adaptive policy: BottomSheet on a compact touch screen (a coarse primary pointer, and a viewport narrower than the theme `md` breakpoint (768px by default) or shorter than 500px), cursor-positioned popover otherwise. Important actions still need a visible MoreMenu or equivalent entry point."}}},render:()=>(0,M.jsx)(`div`,{style:{padding:16},children:(0,M.jsx)(m,{presentation:`adaptive`,label:`Document actions`,items:[{label:`Edit`,icon:E,onClick:()=>{}},{label:`Share`,icon:O,onClick:()=>{}},{label:`Delete`,icon:A,variant:`destructive`,onClick:()=>{}}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Long-press or right-click for document actions`})})})},Y={name:`Inline trigger in prose (triggerAs)`,parameters:{docs:{description:{story:'A reference inside running text owns a context menu without breaking the flow: `triggerAs="span"` wraps it inline. Right-click, a held press or Shift+F10 on the reference opens the menu at the pointer.'}}},render:()=>(0,M.jsxs)(`p`,{style:{maxWidth:480,lineHeight:1.6},children:[`The regression was tracked in`,` `,(0,M.jsx)(m,{triggerAs:`span`,label:`Task actions`,items:[{label:`Open`,onClick:()=>{}},{label:`Copy link`,onClick:()=>{}}],children:(0,M.jsx)(`a`,{href:`/tasks/123`,children:`T123`})}),` `,`and fixed by`,` `,(0,M.jsx)(m,{triggerAs:`span`,label:`Diff actions`,items:[{label:`Open`,onClick:()=>{}},{label:`Copy link`,onClick:()=>{}}],children:(0,M.jsx)(`a`,{href:`/diff/456`,children:`D456`})}),` `,`the same afternoon.`]})},X={name:`Inside a scroll container`,parameters:{docs:{description:{story:`The trigger scrolls inside a box. The menu opens at the pointer, and the browser hides it while the box scrolls the pointer position out of view.`}}},render:()=>(0,M.jsxs)(`div`,{"data-testid":`context-menu-scroller`,tabIndex:0,role:`region`,"aria-label":`Scrolling content`,style:{width:320,height:160,overflowY:`auto`},children:[(0,M.jsx)(`p`,{style:{height:240,margin:0},children:`Scroll down to the area.`}),(0,M.jsx)(m,{items:[{label:`Cut`,onClick:()=>{}},{label:`Copy`,onClick:()=>{}},{label:`Paste`,onClick:()=>{}}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Right-click this area`})})]})},Z={name:`Presentation / BottomSheet submenu`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{story:{inline:!1,height:`560px`}}},render:()=>(0,M.jsx)(`div`,{style:{padding:16},children:(0,M.jsx)(m,{"data-testid":`bottom-sheet-submenu-context-menu`,presentation:`bottom-sheet`,label:`Document actions`,items:[{label:`Edit`,icon:E,onClick:()=>{}},{label:`Share`,icon:O,items:[{label:`Copy link`,onClick:()=>{}},{label:`Email`,onClick:()=>{}}]}],children:(0,M.jsx)(`div`,{className:`x1o8uwn5 xdh2fpr xbsl7fq x1y0avi5 xur7f20 x2b8uid x93p4j0 x87ps6o`,children:`Long-press or right-click for document actions`})})}),play:async({canvasElement:e})=>{e.querySelector(`[data-testid="bottom-sheet-submenu-context-menu"]`)?.dispatchEvent(new MouseEvent(`contextmenu`,{bubbles:!0,clientX:40,clientY:40}));for(let e=0;e<40;e++){let e=Array.from(document.body.querySelectorAll(`[role="menuitem"], button`)).find(e=>e.textContent?.trim()===`Share`);if(e!=null){e.click();return}await new Promise(e=>setTimeout(e,50))}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    label: 'Cut',
    onClick: () => console.log('Cut')
  }, {
    label: 'Copy',
    onClick: () => console.log('Copy')
  }, {
    label: 'Paste',
    onClick: () => console.log('Paste')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>Right-click this area</div>
    </ContextMenu>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / pointer menu',
  tags: ['visual-theme-matrix'],
  render: () => <ContextMenu data-testid="pointer-context-menu" label="Document actions" items={[{
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
    variant: 'destructive',
    onClick: () => {}
  }]}>
      <div {...stylex.props(triggerStyles.area)}>
        Right-click for document actions
      </div>
    </ContextMenu>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('[data-testid="pointer-context-menu"]');
    const box = trigger?.getBoundingClientRect();
    trigger?.dispatchEvent(new MouseEvent('contextmenu', {
      bubbles: true,
      clientX: (box?.left ?? 0) + 40,
      clientY: (box?.top ?? 0) + 40
    }));
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    label: 'Cut',
    icon: ScissorsIcon,
    onClick: () => console.log('Cut')
  }, {
    label: 'Copy',
    icon: ClipboardDocumentIcon,
    onClick: () => console.log('Copy')
  }, {
    label: 'Paste',
    icon: ClipboardIcon,
    onClick: () => console.log('Paste')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => console.log('Delete')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>Right-click for actions</div>
    </ContextMenu>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Destructive item',
  render: () => <ContextMenu items={[{
    label: 'Rename',
    onClick: () => console.log('Rename')
  }, {
    label: 'Duplicate',
    icon: ClipboardDocumentIcon,
    onClick: () => console.log('Duplicate')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    icon: TrashIcon,
    variant: 'destructive',
    onClick: () => console.log('Delete')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>Right-click for actions</div>
    </ContextMenu>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    type: 'section',
    title: 'Edit',
    items: [{
      label: 'Cut',
      icon: ScissorsIcon,
      onClick: () => console.log('Cut')
    }, {
      label: 'Copy',
      icon: ClipboardDocumentIcon,
      onClick: () => console.log('Copy')
    }, {
      label: 'Paste',
      icon: ClipboardIcon,
      onClick: () => console.log('Paste')
    }]
  }, {
    type: 'section',
    title: 'Share',
    items: [{
      label: 'Share',
      icon: ShareIcon,
      onClick: () => console.log('Share')
    }, {
      label: 'Download',
      icon: ArrowDownTrayIcon,
      onClick: () => console.log('Download')
    }]
  }]}>
      <div {...stylex.props(triggerStyles.area)}>
        Right-click for grouped actions
      </div>
    </ContextMenu>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>Right-click this area</div>
    </ContextMenu>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    icon: DocumentDuplicateIcon,
    onClick: () => console.log('Duplicate')
  }, {
    label: 'Delete (no permission)',
    icon: TrashIcon,
    isDisabled: true
  }]}>
      <div {...stylex.props(triggerStyles.area)}>Right-click this area</div>
    </ContextMenu>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu menuWidth={280} items={[{
    label: 'This is a longer option that needs more space',
    onClick: () => console.log('Option 1')
  }, {
    label: 'Another long option',
    onClick: () => console.log('Option 2')
  }, {
    label: 'Short',
    onClick: () => console.log('Option 3')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>Right-click for wide menu</div>
    </ContextMenu>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu size="sm" items={[{
    label: 'Cut',
    onClick: () => console.log('Cut')
  }, {
    label: 'Copy',
    onClick: () => console.log('Copy')
  }, {
    label: 'Paste',
    onClick: () => console.log('Paste')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>
        Right-click for compact menu
      </div>
    </ContextMenu>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu isDisabled items={[{
    label: 'Cut',
    onClick: () => console.log('Cut')
  }, {
    label: 'Copy',
    onClick: () => console.log('Copy')
  }]}>
      <div {...stylex.props(triggerStyles.area)}>
        Right-click shows native menu (disabled)
      </div>
    </ContextMenu>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu menuContent={<>
          <ContextMenuItem icon={PencilIcon} label="Edit" onClick={() => console.log('Edit')} />
          <ContextMenuItem icon={DocumentDuplicateIcon} label="Duplicate" onClick={() => console.log('Duplicate')} />
          <Divider />
          <ContextMenuItem icon={TrashIcon} label="Delete" onClick={() => console.log('Delete')} />
        </>}>
      <div {...stylex.props(triggerStyles.area)}>
        Right-click for compound menu
      </div>
    </ContextMenu>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu menuWidth={280} menuContent={<>
          <ContextMenuItem icon={PencilIcon} label="Edit" description="Modify this item" onClick={() => console.log('Edit')} />
          <ContextMenuItem icon={ShareIcon} label="Share" description="Share with others" onClick={() => console.log('Share')} />
          <Divider />
          <ContextMenuItem icon={TrashIcon} label="Delete" description="Permanently remove" onClick={() => console.log('Delete')} />
        </>}>
      <div {...stylex.props(triggerStyles.area)}>
        Right-click for detailed menu
      </div>
    </ContextMenu>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: function WithSelectableItemsStory() {
    const [sort, setSort] = useState('name');
    const [showHidden, setShowHidden] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    return <ContextMenu menuWidth={220} menuContent={<>
            <ContextMenuItem icon={PencilIcon} label="Rename" onClick={() => console.log('Rename')} />
            <Divider />
            <ContextMenuRadioGroup value={sort} onChange={setSort} label="Sort by">
              <ContextMenuRadioItem value="name" label="Sort by name" />
              <ContextMenuRadioItem value="date" label="Sort by date" />
              <ContextMenuRadioItem value="size" label="Sort by size" />
            </ContextMenuRadioGroup>
            <Divider />
            <ContextMenuCheckboxItem label="Show hidden files" value={showHidden} onChange={setShowHidden} />
            <ContextMenuCheckboxItem label="Show preview pane" value={showPreview} onChange={setShowPreview} />
          </>}>
        <div {...stylex.props(triggerStyles.area)}>
          Right-click for selectable items
        </div>
      </ContextMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox and radio menu items compose inside a ContextMenu just like in a DropdownMenu. The radio group is a single-select set (menuitemradio) that closes the menu on selection; the checkbox items are independent toggles (menuitemcheckbox) that keep the menu open so several can be flipped. Arrow keys, typeahead, and Enter/Space traverse and activate all three row types alongside plain items.'
      }
    }
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
        story: 'The real ContextMenu component forced to BottomSheet presentation. Long-press opens this surface on touch; this story opens it with a contextmenu event so the sheet is directly reviewable.'
      }
    }
  },
  render: () => <div style={{
    padding: 16
  }}>
      <ContextMenu data-testid="bottom-sheet-context-menu" presentation="bottom-sheet" label="Document actions" items={[{
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
    }]}>
        <div {...stylex.props(triggerStyles.area)}>
          Long-press or right-click for document actions
        </div>
      </ContextMenu>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('[data-testid="bottom-sheet-context-menu"]');
    trigger?.dispatchEvent(new MouseEvent('contextmenu', {
      bubbles: true,
      clientX: 40,
      clientY: 40
    }));
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / adaptive',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Uses the built-in adaptive policy: BottomSheet on a compact touch screen (a coarse primary pointer, and a viewport narrower than the theme \`md\` breakpoint (768px by default) or shorter than 500px), cursor-positioned popover otherwise. Important actions still need a visible MoreMenu or equivalent entry point.'
      }
    }
  },
  render: () => <div style={{
    padding: 16
  }}>
      <ContextMenu presentation="adaptive" label="Document actions" items={[{
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
    }]}>
        <div {...stylex.props(triggerStyles.area)}>
          Long-press or right-click for document actions
        </div>
      </ContextMenu>
    </div>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Inline trigger in prose (triggerAs)',
  parameters: {
    docs: {
      description: {
        story: 'A reference inside running text owns a context menu without breaking the flow: \`triggerAs="span"\` wraps it inline. Right-click, a held press or Shift+F10 on the reference opens the menu at the pointer.'
      }
    }
  },
  render: () => <p style={{
    maxWidth: 480,
    lineHeight: 1.6
  }}>
      The regression was tracked in{' '}
      <ContextMenu triggerAs="span" label="Task actions" items={[{
      label: 'Open',
      onClick: () => {}
    }, {
      label: 'Copy link',
      onClick: () => {}
    }]}>
        <a href="/tasks/123">T123</a>
      </ContextMenu>{' '}
      and fixed by{' '}
      <ContextMenu triggerAs="span" label="Diff actions" items={[{
      label: 'Open',
      onClick: () => {}
    }, {
      label: 'Copy link',
      onClick: () => {}
    }]}>
        <a href="/diff/456">D456</a>
      </ContextMenu>{' '}
      the same afternoon.
    </p>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Inside a scroll container',
  parameters: {
    docs: {
      description: {
        story: 'The trigger scrolls inside a box. The menu opens at the pointer, and the browser hides it while the box scrolls the pointer position out of view.'
      }
    }
  },
  render: () => <div data-testid="context-menu-scroller"
  // The box scrolls but holds nothing focusable, so it needs a tab stop
  // and a name for keyboard scrolling (axe: scrollable-region-focusable).
  tabIndex={0} role="region" aria-label="Scrolling content" style={{
    width: 320,
    height: 160,
    overflowY: 'auto'
  }}>
      <p style={{
      height: 240,
      margin: 0
    }}>Scroll down to the area.</p>
      <ContextMenu items={[{
      label: 'Cut',
      onClick: () => {}
    }, {
      label: 'Copy',
      onClick: () => {}
    }, {
      label: 'Paste',
      onClick: () => {}
    }]}>
        <div {...stylex.props(triggerStyles.area)}>Right-click this area</div>
      </ContextMenu>
    </div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / BottomSheet submenu',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      story: {
        inline: false,
        height: '560px'
      }
    }
  },
  render: () => <div style={{
    padding: 16
  }}>
      <ContextMenu data-testid="bottom-sheet-submenu-context-menu" presentation="bottom-sheet" label="Document actions" items={[{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => {}
    }, {
      label: 'Share',
      icon: ShareIcon,
      items: [{
        label: 'Copy link',
        onClick: () => {}
      }, {
        label: 'Email',
        onClick: () => {}
      }]
    }]}>
        <div {...stylex.props(triggerStyles.area)}>
          Long-press or right-click for document actions
        </div>
      </ContextMenu>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('[data-testid="bottom-sheet-submenu-context-menu"]');
    trigger?.dispatchEvent(new MouseEvent('contextmenu', {
      bubbles: true,
      clientX: 40,
      clientY: 40
    }));
    // The sheet renders in the top layer, outside the canvas.
    for (let attempt = 0; attempt < 40; attempt++) {
      const share = Array.from(document.body.querySelectorAll<HTMLElement>('[role="menuitem"], button')).find(element => element.textContent?.trim() === 'Share');
      if (share != null) {
        share.click();
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}`,...Z.parameters?.docs?.source},description:{story:`The BottomSheet presentation opened into a submenu. The sheet's back button
points toward the previous view, so its chevron mirrors in right-to-left
layouts; this story keeps that view on screen for the RTL audit.`,...Z.parameters?.docs?.description}}},Q=[`Default`,`PointerPresentation`,`WithIcons`,`DestructiveItem`,`WithSections`,`WithDividers`,`WithDisabledItems`,`CustomWidth`,`SmallSize`,`Disabled`,`CompoundBasic`,`CompoundWithDescriptions`,`WithSelectableItems`,`BottomSheetPresentation`,`AdaptivePresentation`,`InlineTrigger`,`InScrollContainer`,`BottomSheetSubmenu`]})))()}$();export{J as AdaptivePresentation,q as BottomSheetPresentation,Z as BottomSheetSubmenu,W as CompoundBasic,G as CompoundWithDescriptions,V as CustomWidth,P as Default,L as DestructiveItem,U as Disabled,X as InScrollContainer,Y as InlineTrigger,F as PointerPresentation,H as SmallSize,B as WithDisabledItems,z as WithDividers,I as WithIcons,R as WithSections,K as WithSelectableItems,Q as __namedExportsOrder,N as default};