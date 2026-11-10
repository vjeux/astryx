import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Kbd-C2QfIYQG.js";import{a,n as o,o as s,t as c}from"./CommandPalette-Cj0mdyQF.js";import{t as l}from"./createStaticSource-DpdQO4C4.js";var u,d,f,p,m,h;function g(){return(g=e((()=>{u=t(),o(),s(),r(),d=n(),f={title:`Core/CommandPaletteInput`,component:a,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`,docs:{story:{inline:!1,height:`600px`}}}},p={render:function(){let[e,t]=(0,u.useState)(``);return(0,d.jsx)(`div`,{style:{width:`min(22rem, calc(100vw - 4rem))`,border:`1px solid currentColor`,borderRadius:8},children:(0,d.jsx)(a,{value:e,onValueChange:t,hasAutoFocus:!1,label:`Search documentation`,endContent:(0,d.jsx)(`span`,{"data-testid":`input-end-content`,children:(0,d.jsx)(i,{keys:`mod+k`})})})})}},m={render:function(){let e=(0,u.useMemo)(()=>l([{id:`home`,label:`Go home`},{id:`settings`,label:`Open settings`},{id:`help`,label:`Open help`}]),[]);return(0,d.jsx)(c,{isOpen:!0,onOpenChange:()=>{},searchSource:e,input:(0,d.jsx)(a,{hasAutoFocus:!1,label:`Search commands`,endContent:(0,d.jsx)(i,{keys:`mod+k`})})})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState('');
    return <div style={{
      width: 'min(22rem, calc(100vw - 4rem))',
      border: '1px solid currentColor',
      borderRadius: 8
    }}>
        <CommandPaletteInput value={value} onValueChange={setValue} hasAutoFocus={false} label="Search documentation" endContent={<span data-testid="input-end-content">
              <Kbd keys="mod+k" />
            </span>} />
      </div>;
  }
}`,...p.parameters?.docs?.source},description:{story:`Independent search field with a visible trailing shortcut hint.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const source = useMemo(() => createStaticSource([{
      id: 'home',
      label: 'Go home'
    }, {
      id: 'settings',
      label: 'Open settings'
    }, {
      id: 'help',
      label: 'Open help'
    }]), []);
    return <CommandPalette isOpen onOpenChange={() => {}} searchSource={source} input={<CommandPaletteInput hasAutoFocus={false} label="Search commands" endContent={<Kbd keys="mod+k" />} />} />;
  }
}`,...m.parameters?.docs?.source},description:{story:`Popup-backed query field with the real CommandPalette context and list.`,...m.parameters?.docs?.description}}},h=[`Standalone`,`PopupContext`]})))()}g();export{m as PopupContext,p as Standalone,h as __namedExportsOrder,f as default};