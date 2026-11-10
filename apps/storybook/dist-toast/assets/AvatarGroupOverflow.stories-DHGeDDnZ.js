import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Avatar-C6K3OBt3.js";import{i,n as a,r as o,t as s}from"./AvatarGroupOverflow-CEwdVyEV.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{i(),a(),n(),c=t(),{fn:l}=__STORYBOOK_MODULE_TEST__,u={title:`Core/AvatarGroupOverflow`,component:s,tags:[`autodocs`],args:{count:2,onClick:void 0},argTypes:{count:{control:`number`},children:{control:`text`},onClick:{control:!1,description:`Callback for intentionally clickable overflow indicators.`},ref:{control:!1},xstyle:{control:!1,description:`stylex.create() value — not an inline style object.`}},render:e=>(0,c.jsxs)(o,{size:`lg`,children:[(0,c.jsx)(r,{name:`Alice`}),(0,c.jsx)(r,{name:`Bob`}),(0,c.jsx)(s,{...e})]})},d={},f={args:{onClick:l()}},p={args:{count:12,children:`12+`}},m={render:()=>(0,c.jsx)(`div`,{className:`x78zum5 xdt5ytf x1qh66ti`,children:[`xsm`,`sm`,`md`,`lg`,`xl`].map(e=>(0,c.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1txdalj`,children:[(0,c.jsx)(`p`,{className:`x9ynric x1ghz6dp`,children:e}),(0,c.jsxs)(o,{size:e,children:[(0,c.jsx)(r,{name:`Alice`}),(0,c.jsx)(s,{count:2})]})]},e))})},h={render:()=>(0,c.jsx)(`div`,{className:`x78zum5 x6s0dn4 x18g69wz x1a02dak`,children:[`circle`,`rounded`,`square`].map(e=>(0,c.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1txdalj`,children:[(0,c.jsx)(`p`,{className:`x9ynric x1ghz6dp`,children:e}),(0,c.jsxs)(o,{size:`lg`,shape:e,children:[(0,c.jsx)(r,{name:`Alice`}),(0,c.jsx)(s,{count:2})]})]},e))})},g={args:{count:4912}},_={args:{count:0}},v={render:e=>(0,c.jsx)(s,{...e})},y={globals:{direction:`rtl`}},b={render:e=>(0,c.jsx)(`div`,{className:`xygnafs`,children:(0,c.jsxs)(o,{size:`lg`,children:[(0,c.jsx)(r,{name:`Alice`}),(0,c.jsx)(r,{name:`Bob`}),(0,c.jsx)(s,{...e})]})})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    onClick: fn()
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    count: 12,
    children: '12+'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(storyStyles.column)}>
      {(['xsm', 'sm', 'md', 'lg', 'xl'] as const).map(size => <div key={size} {...stylex.props(storyStyles.item)}>
          <p {...stylex.props(storyStyles.label)}>{size}</p>
          <AvatarGroup size={size}>
            <Avatar name="Alice" />
            <AvatarGroupOverflow count={2} />
          </AvatarGroup>
        </div>)}
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(storyStyles.row)}>
      {(['circle', 'rounded', 'square'] as const).map(shape => <div key={shape} {...stylex.props(storyStyles.item)}>
          <p {...stylex.props(storyStyles.label)}>{shape}</p>
          <AvatarGroup size="lg" shape={shape}>
            <Avatar name="Alice" />
            <AvatarGroupOverflow count={2} />
          </AvatarGroup>
        </div>)}
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    count: 4912
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    count: 0
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <AvatarGroupOverflow {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  globals: {
    direction: 'rtl'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <div {...stylex.props(storyStyles.narrow)}>
      <AvatarGroup size="lg">
        <Avatar name="Alice" />
        <Avatar name="Bob" />
        <AvatarGroupOverflow {...args} />
      </AvatarGroup>
    </div>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Clickable`,`CustomContent`,`AllSizes`,`AllShapes`,`LargeCount`,`ZeroCount`,`Standalone`,`RightToLeft`,`NarrowContainer`]})))()}S();export{h as AllShapes,m as AllSizes,f as Clickable,p as CustomContent,d as Default,g as LargeCount,b as NarrowContainer,y as RightToLeft,v as Standalone,_ as ZeroCount,x as __namedExportsOrder,u as default};