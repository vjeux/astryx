import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Kbd-C2QfIYQG.js";import{i,n as a,r as o,t as s}from"./CommandPaletteItem-B6iHkwQ_.js";var c,l,u,d,f;function p(){return(p=e((()=>{a(),i(),n(),c=t(),l={title:`Core/CommandPaletteItem`,component:s,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`}},u={render:()=>(0,c.jsxs)(o,{label:`Command item states`,style:{inlineSize:`min(22rem, calc(100vw - 4rem))`},children:[(0,c.jsxs)(s,{value:`open-file`,onSelect:()=>{},children:[`Open file`,(0,c.jsx)(r,{keys:`mod+o`})]}),(0,c.jsx)(s,{value:`search-files`,isHighlighted:!0,onSelect:()=>{},children:`Search files`}),(0,c.jsx)(s,{value:`settings`,isSelected:!0,onSelect:()=>{},children:`Settings`}),(0,c.jsx)(s,{value:`archived`,isDisabled:!0,onSelect:()=>{},children:`Archived command`})]})},d={render:()=>(0,c.jsxs)(o,{label:`Combined and long command item states`,style:{inlineSize:`min(22rem, calc(100vw - 4rem))`},children:[(0,c.jsx)(s,{value:`selected-highlighted`,isHighlighted:!0,isSelected:!0,onSelect:()=>{},children:`Selected and highlighted`}),(0,c.jsxs)(s,{value:`long-label`,onSelect:()=>{},children:[`Review every pending workspace configuration change before continuing`,(0,c.jsx)(r,{keys:`mod+shift+p`})]})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <CommandPaletteList label="Command item states" style={{
    inlineSize: 'min(22rem, calc(100vw - 4rem))'
  }}>
      <CommandPaletteItem value="open-file" onSelect={() => {}}>
        Open file
        <Kbd keys="mod+o" />
      </CommandPaletteItem>
      <CommandPaletteItem value="search-files" isHighlighted onSelect={() => {}}>
        Search files
      </CommandPaletteItem>
      <CommandPaletteItem value="settings" isSelected onSelect={() => {}}>
        Settings
      </CommandPaletteItem>
      <CommandPaletteItem value="archived" isDisabled onSelect={() => {}}>
        Archived command
      </CommandPaletteItem>
    </CommandPaletteList>
}`,...u.parameters?.docs?.source},description:{story:`Default, highlighted, selected, and disabled states in the supported listbox composition.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <CommandPaletteList label="Combined and long command item states" style={{
    inlineSize: 'min(22rem, calc(100vw - 4rem))'
  }}>
      <CommandPaletteItem value="selected-highlighted" isHighlighted isSelected onSelect={() => {}}>
        Selected and highlighted
      </CommandPaletteItem>
      <CommandPaletteItem value="long-label" onSelect={() => {}}>
        Review every pending workspace configuration change before continuing
        <Kbd keys="mod+shift+p" />
      </CommandPaletteItem>
    </CommandPaletteList>
}`,...d.parameters?.docs?.source},description:{story:`Coincident visual state and long content remain measurable without changing option semantics.`,...d.parameters?.docs?.description}}},f=[`States`,`CombinedAndLong`]})))()}p();export{d as CombinedAndLong,u as States,f as __namedExportsOrder,l as default};