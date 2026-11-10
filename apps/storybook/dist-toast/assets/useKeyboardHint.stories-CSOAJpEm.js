import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./Card-DA0ZfoAz.js";import{n as l,t as u}from"./useKeyboardHint-BmLvIsQe.js";import{n as d,t as f}from"./VStack-SWtDePqc.js";import{n as p,t as m}from"./Section-g5hpGOnN.js";import{n as h,t as g}from"./Toolbar-BjzQwWLc.js";function _({label:e,orientation:t,items:n}){let r=(0,v.useRef)(null),i=l({orientation:t}),a=t===`vertical`?`ArrowDown`:`ArrowRight`,o=t===`vertical`?`ArrowUp`:`ArrowLeft`,s=(0,v.useCallback)(e=>{let t=r.current;if(!t)return;let n=Array.from(t.querySelectorAll(`button`)),i=n.findIndex(e=>e===document.activeElement);if(i===-1)return;let s;if(e.key===a)s=(i+1)%n.length;else if(e.key===o)s=(i-1+n.length)%n.length;else return;e.preventDefault(),n[i].tabIndex=-1,n[s].tabIndex=0,n[s].focus()},[a,o]);return(0,y.jsxs)(`div`,{ref:r,role:`toolbar`,"aria-label":e,"aria-orientation":t,onKeyDown:e=>{i.onKeyDown(e),s(e)},onFocus:i.onFocus,onBlur:i.onBlur,style:{display:`inline-flex`,flexDirection:t===`vertical`?`column`:`row`,alignItems:t===`vertical`?`stretch`:`center`,gap:4,padding:8,borderRadius:8,background:`var(--color-background-muted)`},children:[n.map((e,n)=>(0,y.jsx)(`button`,{type:`button`,tabIndex:n===0?0:-1,style:{appearance:`none`,border:`none`,borderRadius:6,padding:`6px 12px`,background:`var(--color-background-popover)`,color:`var(--color-text-primary)`,font:`inherit`,textAlign:t===`vertical`?`start`:`center`,cursor:`pointer`},children:e},e)),i.hintElement]})}var v,y,b,x,S,C,w;function T(){return(T=e((()=>{v=t(),u(),h(),a(),s(),p(),r(),d(),y=n(),b={title:`Core/Hooks/useKeyboardHint`,parameters:{layout:`centered`}},x={render:()=>(0,y.jsx)(c,{padding:4,children:(0,y.jsxs)(f,{gap:3,children:[(0,y.jsx)(i,{type:`body`,weight:`bold`,children:`Formatting`}),(0,y.jsx)(i,{type:`supporting`,color:`secondary`,children:`Tab into the toolbar with your keyboard — the hint appears once.`}),(0,y.jsx)(_,{label:`Formatting`,orientation:`horizontal`,items:[`Bold`,`Italic`,`Underline`]})]})})},S={render:()=>(0,y.jsx)(c,{padding:4,children:(0,y.jsxs)(f,{gap:3,children:[(0,y.jsx)(i,{type:`body`,weight:`bold`,children:`Navigation`}),(0,y.jsx)(i,{type:`supporting`,color:`secondary`,children:`Tab into the list — the vertical hint teaches ↑ ↓ navigation.`}),(0,y.jsx)(_,{label:`Sidebar navigation`,orientation:`vertical`,items:[`Overview`,`Reports`,`Settings`]})]})})},C={render:()=>(0,y.jsxs)(c,{style:{width:420},children:[(0,y.jsx)(g,{label:`Document actions`,startContent:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{label:`Cut`,variant:`ghost`}),(0,y.jsx)(o,{label:`Copy`,variant:`ghost`}),(0,y.jsx)(o,{label:`Paste`,variant:`ghost`})]}),endContent:(0,y.jsx)(o,{label:`Settings`,variant:`ghost`})}),(0,y.jsx)(m,{children:(0,y.jsx)(i,{type:`supporting`,color:`secondary`,children:`Tab into the toolbar above — the arrow-key hint appears on first keyboard focus.`})})]})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Card padding={4}>
      <VStack gap={3}>
        <Text type="body" weight="bold">
          Formatting
        </Text>
        <Text type="supporting" color="secondary">
          Tab into the toolbar with your keyboard — the hint appears once.
        </Text>
        <HintToolbar label="Formatting" orientation="horizontal" items={['Bold', 'Italic', 'Underline']} />
      </VStack>
    </Card>
}`,...x.parameters?.docs?.source},description:{story:`Tab into the toolbar to reveal the horizontal "← → to navigate" hint.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Card padding={4}>
      <VStack gap={3}>
        <Text type="body" weight="bold">
          Navigation
        </Text>
        <Text type="supporting" color="secondary">
          Tab into the list — the vertical hint teaches ↑ ↓ navigation.
        </Text>
        <HintToolbar label="Sidebar navigation" orientation="vertical" items={['Overview', 'Reports', 'Settings']} />
      </VStack>
    </Card>
}`,...S.parameters?.docs?.source},description:{story:`A vertical list (e.g. a sidebar nav) shows the "↑ ↓ to navigate" hint.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Card style={{
    width: 420
  }}>
      <Toolbar label="Document actions" startContent={<>
            <Button label="Cut" variant="ghost" />
            <Button label="Copy" variant="ghost" />
            <Button label="Paste" variant="ghost" />
          </>} endContent={<Button label="Settings" variant="ghost" />} />
      <Section>
        <Text type="supporting" color="secondary">
          Tab into the toolbar above — the arrow-key hint appears on first
          keyboard focus.
        </Text>
      </Section>
    </Card>
}`,...C.parameters?.docs?.source},description:{story:"The real `<Toolbar>` component wires `useKeyboardHint` in automatically — no\nextra wiring required. Tab into it to see the integrated behavior.",...C.parameters?.docs?.description}}},w=[`Default`,`Vertical`,`WithToolbar`]})))()}T();export{x as Default,S as Vertical,C as WithToolbar,w as __namedExportsOrder,b as default};