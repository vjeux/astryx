import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-DoGM0DEN.js";import{n as a,t as o}from"./Dialog-ohVvtWtq.js";import{n as s,t as c}from"./InfoTip-xmhCIsMA.js";import{n as l,t as u}from"./CommandPalette-Cj0mdyQF.js";import{n as d,t as f}from"./ContextMenu-Di_JOkJz.js";import{n as p,t as m}from"./DateInput-CHI86NkI.js";import{t as h}from"./createStaticSource-DpdQO4C4.js";import{n as g,t as _}from"./Typeahead-BOmIKfL8.js";import{n as v,t as y}from"./DropdownMenu-M0We7Ho-.js";import{n as b,t as x}from"./Drawer-BXTsMjyA.js";var S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{S=t(),d(),p(),s(),g(),r(),l(),a(),b(),v(),C=n(),w={title:`A11y/BackdropPress`,tags:[`no-visual`]},T=`A long note to select with the pointer and release past the edge`,E=[{label:`Rename`,onClick:()=>{}},{label:`Archive`,onClick:()=>{}}],D=h([{id:`open`,label:`Open file`},{id:`save`,label:`Save file`}]),O={render:function(){let[e,t]=(0,S.useState)(null),n=e=>{e||t(null)};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(i,{label:`Open dialog`,onClick:()=>t(`dialog`)}),(0,C.jsx)(i,{label:`Open drawer`,onClick:()=>t(`drawer`)}),(0,C.jsx)(i,{label:`Open palette`,onClick:()=>t(`palette`)}),(0,C.jsxs)(o,{isOpen:e===`dialog`,onOpenChange:n,"aria-label":`Note dialog`,children:[(0,C.jsx)(`input`,{"aria-label":`Note`,defaultValue:T,style:{width:`100%`}}),(0,C.jsx)(y,{button:{label:`Actions`},items:E})]}),(0,C.jsxs)(x,{isOpen:e===`drawer`,onOpenChange:n,label:`Note drawer`,children:[(0,C.jsx)(`input`,{"aria-label":`Note`,defaultValue:T,style:{width:`100%`}}),(0,C.jsx)(y,{button:{label:`Actions`},items:E})]}),(0,C.jsx)(u,{isOpen:e===`palette`,onOpenChange:n,"aria-label":`Commands`,searchSource:D})]})}},k=h([{id:`apple`,label:`Apple`},{id:`apricot`,label:`Apricot`},{id:`banana`,label:`Banana`}]),A={render:function(){let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(null),[a,s]=(0,S.useState)(void 0);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(i,{label:`Open layers dialog`,onClick:()=>t(!0)}),(0,C.jsxs)(o,{isOpen:e,onOpenChange:t,"aria-label":`Layers dialog`,children:[(0,C.jsx)(_,{label:`Fruit`,searchSource:k,value:n,onChange:r}),(0,C.jsx)(m,{label:`Date`,value:a,onChange:s,presentation:`popover`}),(0,C.jsx)(c,{content:`Help text`,label:`About layers`}),(0,C.jsx)(f,{items:E,children:(0,C.jsx)(`div`,{style:{padding:16},children:`Right-click here`})})]})]})}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: function MembersStory() {
    const [open, setOpen] = useState<'dialog' | 'drawer' | 'palette' | null>(null);
    const close = (isOpen: boolean) => {
      if (!isOpen) {
        setOpen(null);
      }
    };
    return <>
        <Button label="Open dialog" onClick={() => setOpen('dialog')} />
        <Button label="Open drawer" onClick={() => setOpen('drawer')} />
        <Button label="Open palette" onClick={() => setOpen('palette')} />
        <Dialog isOpen={open === 'dialog'} onOpenChange={close} aria-label="Note dialog">
          <input aria-label="Note" defaultValue={NOTE} style={{
          width: '100%'
        }} />
          <DropdownMenu button={{
          label: 'Actions'
        }} items={menuItems} />
        </Dialog>
        <Drawer isOpen={open === 'drawer'} onOpenChange={close} label="Note drawer">
          <input aria-label="Note" defaultValue={NOTE} style={{
          width: '100%'
        }} />
          <DropdownMenu button={{
          label: 'Actions'
        }} items={menuItems} />
        </Drawer>
        <CommandPalette isOpen={open === 'palette'} onOpenChange={close} aria-label="Commands" searchSource={commands} />
      </>;
  }
}`,...O.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: function LayersInDialogStory() {
    const [isOpen, setIsOpen] = useState(false);
    const [fruit, setFruit] = useState<SearchableItem | null>(null);
    const [date, setDate] = useState<ISODateString | undefined>(undefined);
    return <>
        <Button label="Open layers dialog" onClick={() => setIsOpen(true)} />
        <Dialog isOpen={isOpen} onOpenChange={setIsOpen} aria-label="Layers dialog">
          <Typeahead label="Fruit" searchSource={fruits} value={fruit} onChange={setFruit} />
          <DateInput label="Date" value={date} onChange={setDate} presentation="popover" />
          <InfoTip content="Help text" label="About layers" />
          <ContextMenu items={menuItems}>
            <div style={{
            padding: 16
          }}>Right-click here</div>
          </ContextMenu>
        </Dialog>
      </>;
  }
}`,...A.parameters?.docs?.source},description:{story:`A Dialog that holds each layer that closes on a press or a focus move.`,...A.parameters?.docs?.description}}},j=[`Members`,`LayersInDialog`]})))()}M();export{A as LayersInDialog,O as Members,j as __namedExportsOrder,w as default};