import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,n,r,t as i}from"./LayoutContent-BEmJ3Yl2.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./LayoutPanel-BWGJdNoy.js";import{n as c,t as l}from"./VStack-SWtDePqc.js";import{n as u,t as d}from"./StackItem-BBK-dp_K.js";function f(){return h.map(e=>(0,m.jsx)(`p`,{children:(0,m.jsx)(`button`,{type:`button`,children:e})},e))}function p({children:e}){return(0,m.jsx)(`div`,{className:`x1u5z0ei`,children:e})}var m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{t(),n(),o(),u(),c(),m=a(),h=Array.from({length:40},(e,t)=>`Line ${t+1}`),g={title:`a11y/Scroll region name`,tags:[`no-visual`],parameters:{layout:`padded`}},_={render:()=>(0,m.jsx)(p,{children:(0,m.jsx)(r,{content:(0,m.jsx)(i,{"data-scroll-region":!0,children:(0,m.jsx)(f,{})})})})},v={render:()=>(0,m.jsx)(p,{children:(0,m.jsx)(r,{content:(0,m.jsx)(i,{"data-scroll-region":!0,children:`Line 1`})})})},y={render:()=>(0,m.jsx)(p,{children:(0,m.jsx)(r,{content:(0,m.jsx)(i,{"data-scroll-region":!0,label:`Messages`,children:(0,m.jsx)(f,{})})})})},b={render:()=>(0,m.jsx)(p,{children:(0,m.jsx)(r,{content:(0,m.jsx)(i,{"data-scroll-region":!0,role:`main`,children:(0,m.jsx)(f,{})})})})},x={render:()=>(0,m.jsx)(p,{children:(0,m.jsx)(r,{start:(0,m.jsx)(s,{"data-scroll-region":!0,hasDivider:!0,children:(0,m.jsx)(f,{})}),content:(0,m.jsx)(i,{children:`Line 1`})})})},S={render:()=>(0,m.jsx)(l,{height:240,children:(0,m.jsx)(d,{"data-scroll-region":!0,isScrollable:!0,size:`fill`,children:(0,m.jsx)(f,{})})})},C={render:()=>(0,m.jsx)(l,{height:240,children:(0,m.jsx)(d,{as:`ul`,"data-scroll-region":!0,isScrollable:!0,size:`fill`,children:h.map(e=>(0,m.jsx)(`li`,{children:(0,m.jsx)(`button`,{type:`button`,children:e})},e))})})},w={render:()=>(0,m.jsx)(l,{height:240,children:(0,m.jsx)(d,{"data-scroll-region":!0,size:`fill`,children:(0,m.jsx)(f,{})})})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <Layout content={<LayoutContent data-scroll-region>
            <Lines />
          </LayoutContent>} />
    </Frame>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <Layout content={<LayoutContent data-scroll-region>Line 1</LayoutContent>} />
    </Frame>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <Layout content={<LayoutContent data-scroll-region label="Messages">
            <Lines />
          </LayoutContent>} />
    </Frame>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <Layout content={<LayoutContent data-scroll-region role="main">
            <Lines />
          </LayoutContent>} />
    </Frame>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <Layout start={<LayoutPanel data-scroll-region hasDivider>
            <Lines />
          </LayoutPanel>} content={<LayoutContent>Line 1</LayoutContent>} />
    </Frame>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <VStack height={240}>
      <StackItem data-scroll-region isScrollable size="fill">
        <Lines />
      </StackItem>
    </VStack>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <VStack height={240}>
      <StackItem as="ul" data-scroll-region isScrollable size="fill">
        {LINES.map(line => <li key={line}>
            <button type="button">{line}</button>
          </li>)}
      </StackItem>
    </VStack>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <VStack height={240}>
      <StackItem data-scroll-region size="fill">
        <Lines />
      </StackItem>
    </VStack>
}`,...w.parameters?.docs?.source}}},T=[`ContentScrolls`,`ContentFits`,`ContentLabelled`,`ContentMain`,`PanelScrolls`,`StackItemScrolls`,`StackItemListScrolls`,`StackItemStatic`]})))()}E();export{v as ContentFits,y as ContentLabelled,b as ContentMain,_ as ContentScrolls,x as PanelScrolls,C as StackItemListScrolls,S as StackItemScrolls,w as StackItemStatic,T as __namedExportsOrder,g as default};