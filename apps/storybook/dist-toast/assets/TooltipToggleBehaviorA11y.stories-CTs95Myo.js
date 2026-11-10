import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./ClickableCard-QlBYDZzY.js";import{r as a,t as o}from"./Tooltip-CmQs04jO.js";import{n as s,t as c}from"./HStack-D5idGciI.js";import{n as l,t as u}from"./VStack-SWtDePqc.js";import{n as d,t as f}from"./InfoTip-xmhCIsMA.js";function p(){let[e,t]=(0,m.useState)(0);return(0,h.jsx)(`div`,{style:{padding:100,maxWidth:360},children:(0,h.jsxs)(u,{gap:2,children:[(0,h.jsx)(i,{label:`Icon usage`,onClick:()=>t(e=>e+1),children:(0,h.jsxs)(c,{gap:1,vAlign:`center`,children:[`Icon usage`,(0,h.jsx)(f,{content:_,label:`What is this?`})]})}),(0,h.jsxs)(`span`,{children:[`Card opened `,e,` times`]})]})})}var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{m=t(),r(),d(),s(),l(),a(),h=n(),g={title:`a11y/Tooltip toggle behavior`,tags:[`no-visual`],parameters:{docs:{description:{component:`InfoTip pins its help on a press: a click, a tap, Enter, or Space pins it, and the same press closes it. Inside a clickable card, the press stops at the InfoTip.`}}}},_=`Rows are ranked by how many places import the icon`,v={render:()=>(0,h.jsx)(`div`,{style:{padding:100},children:(0,h.jsx)(f,{content:_,label:`What is this?`})})},y={render:()=>(0,h.jsx)(p,{})},b={render:()=>(0,h.jsx)(`div`,{style:{padding:100},children:(0,h.jsxs)(u,{gap:4,children:[(0,h.jsx)(o,{content:`Adaptive: a tap opens it`,delay:0,children:(0,h.jsx)(`span`,{tabIndex:0,children:`Adaptive term`})}),(0,h.jsx)(f,{content:`Toggle: a press pins it`,label:`Toggle term`})]})})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <InfoTip content={HELP} label="What is this?" />
    </div>
}`,...v.parameters?.docs?.source},description:{story:`A press pins the help open; the same press, Escape, or a press outside closes it.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <InAClickableCardRender />
}`,...y.parameters?.docs?.source},description:{story:`A press on the InfoTip pins its help and stops there: the card does not open.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <VStack gap={4}>
        <Tooltip content="Adaptive: a tap opens it" delay={0}>
          <span tabIndex={0}>Adaptive term</span>
        </Tooltip>
        <InfoTip content="Toggle: a press pins it" label="Toggle term" />
      </VStack>
    </div>
}`,...b.parameters?.docs?.source},description:{story:`A plain Tooltip term, which a tap opens, beside an InfoTip, which a press pins.`,...b.parameters?.docs?.description}}},x=[`ButtonToggle`,`InAClickableCard`,`TriggerBehaviors`]})))()}S();export{v as ButtonToggle,y as InAClickableCard,b as TriggerBehaviors,x as __namedExportsOrder,g as default};