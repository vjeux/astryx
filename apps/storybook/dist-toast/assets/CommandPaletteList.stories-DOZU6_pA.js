import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,n as i,r as a,t as o}from"./CommandPaletteItem-B6iHkwQ_.js";import{n as s,t as c}from"./CommandPalette-Cj0mdyQF.js";import{t as l}from"./createStaticSource-DpdQO4C4.js";var u,d,f,p,m,h;function g(){return(g=e((()=>{u=t(),s(),i(),r(),d=n(),f={title:`Core/CommandPaletteList`,component:a,tags:[`autodocs`],parameters:{layout:`centered`}},p={render:()=>(0,d.jsxs)(a,{children:[(0,d.jsx)(o,{value:`home`,onSelect:()=>{},children:`Go home`}),(0,d.jsx)(o,{value:`settings`,onSelect:()=>{},children:`Open settings`}),(0,d.jsx)(o,{value:`profile`,onSelect:()=>{},children:`View profile`})]})},m={render:function(){let e=(0,u.useMemo)(()=>l(Array.from({length:24},(e,t)=>({id:`command-${t+1}`,label:`Command ${t+1}`}))),[]);return(0,d.jsx)(c,{isOpen:!0,isInline:!0,onOpenChange:()=>{},searchSource:e,width:480,maxHeight:320})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <CommandPaletteList>
      <CommandPaletteItem value="home" onSelect={() => {}}>
        Go home
      </CommandPaletteItem>
      <CommandPaletteItem value="settings" onSelect={() => {}}>
        Open settings
      </CommandPaletteItem>
      <CommandPaletteItem value="profile" onSelect={() => {}}>
        View profile
      </CommandPaletteItem>
    </CommandPaletteList>
}`,...p.parameters?.docs?.source},description:{story:`A standalone results listbox with its translated default name.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const source = useMemo(() => createStaticSource(Array.from({
      length: 24
    }, (_, index) => ({
      id: \`command-\${index + 1}\`,
      label: \`Command \${index + 1}\`
    }))), []);
    return <CommandPalette isOpen isInline onOpenChange={() => {}} searchSource={source} width={480} maxHeight={320} />;
  }
}`,...m.parameters?.docs?.source},description:{story:`More results than fit: the list scrolls inside CommandPalette.`,...m.parameters?.docs?.description}}},h=[`Default`,`ScrollingResults`]})))()}g();export{p as Default,m as ScrollingResults,h as __namedExportsOrder,f as default};