import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Heading-YiIeUtHm.js";import{n as o,t as s}from"./Banner-RQaDgZSZ.js";import{n as c,t as l}from"./CommandPaletteEmpty-B71B3Kue.js";var u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{o(),c(),i(),n(),u=t(),d=`https://example.com/releases/2026/aVeryLongUnbrokenTokenThatIsMuchWiderThanAPhone`,f={title:`A11y/Text reflow`,tags:[`no-visual`],parameters:{layout:`fullscreen`}},p={render:()=>(0,u.jsxs)(`div`,{style:{padding:8},children:[(0,u.jsx)(a,{level:1,"data-testid":`heading`,children:d}),(0,u.jsx)(r,{"data-testid":`text-inline`,children:d}),(0,u.jsx)(r,{display:`block`,"data-testid":`text-block`,children:d})]})},m={render:()=>(0,u.jsxs)(`div`,{style:{padding:8},children:[(0,u.jsx)(a,{level:1,maxLines:1,"data-testid":`heading`,children:d}),(0,u.jsx)(r,{maxLines:1,"data-testid":`text`,children:d})]})},h={render:()=>(0,u.jsx)(l,{children:(0,u.jsx)(r,{"data-testid":`text`,children:`No results for ${d}`})})},g={render:()=>(0,u.jsx)(`div`,{style:{padding:8},children:(0,u.jsx)(s,{status:`info`,title:`Release notes`,description:(0,u.jsx)(r,{"data-testid":`text`,children:d})})})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 8
  }}>
      <Heading level={1} data-testid="heading">
        {TOKEN}
      </Heading>
      <Text data-testid="text-inline">{TOKEN}</Text>
      <Text display="block" data-testid="text-block">
        {TOKEN}
      </Text>
    </div>
}`,...p.parameters?.docs?.source},description:{story:`Untruncated Text (inline and block) and Heading with the token.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 8
  }}>
      <Heading level={1} maxLines={1} data-testid="heading">
        {TOKEN}
      </Heading>
      <Text maxLines={1} data-testid="text">
        {TOKEN}
      </Text>
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Single-line truncation keeps clipping the token on one line.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <CommandPaletteEmpty>
      <Text data-testid="text">{\`No results for \${TOKEN}\`}</Text>
    </CommandPaletteEmpty>
}`,...h.parameters?.docs?.source},description:{story:"A `<Text>` message in the command palette's empty state.",...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 8
  }}>
      <Banner status="info" title="Release notes" description={<Text data-testid="text">{TOKEN}</Text>} />
    </div>
}`,...g.parameters?.docs?.source},description:{story:"A `<Text>` description in a banner.",...g.parameters?.docs?.description}}},_=[`Untruncated`,`Truncated`,`CommandPaletteEmptyText`,`BannerText`]})))()}v();export{g as BannerText,h as CommandPaletteEmptyText,m as Truncated,p as Untruncated,_ as __namedExportsOrder,f as default};