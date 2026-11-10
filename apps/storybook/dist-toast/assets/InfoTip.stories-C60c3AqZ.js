import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./HStack-D5idGciI.js";import{n as o,t as s}from"./InfoTip-xmhCIsMA.js";import{n as c,t as l}from"./ListItem-C2dBt6xL.js";import{n as u,t as d}from"./List-Bq_ZN_6g.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{o(),i(),u(),c(),n(),f=t(),p={title:`Core/InfoTip`,component:s,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`xsm`,`sm`,`md`,`lg`],description:`Size of the info icon`}}},m={args:{content:`Editors can change this field; viewers cannot.`}},h={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(a,{gap:1,align:`center`,children:[(0,f.jsx)(r,{children:`Rolling average`}),(0,f.jsx)(s,{content:`30-day rolling average, recomputed nightly.`,label:`About this metric`})]})})},g={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(a,{gap:1,align:`center`,children:[(0,f.jsx)(r,{children:`Rolling average`}),(0,f.jsx)(s,{content:`30-day rolling average, recomputed nightly.`,label:`About this metric`})]})})},_={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(a,{gap:4,align:`center`,children:[(0,f.jsx)(s,{content:`Extra small`,size:`xsm`}),(0,f.jsx)(s,{content:`Small (default)`,size:`sm`}),(0,f.jsx)(s,{content:`Medium`,size:`md`}),(0,f.jsx)(s,{content:`Large`,size:`lg`})]})})},v={render:()=>(0,f.jsx)(`div`,{style:{maxWidth:360},children:(0,f.jsxs)(d,{hasDividers:!0,children:[(0,f.jsx)(l,{label:`Rolling average`,endContent:(0,f.jsx)(s,{content:`30-day rolling average, recomputed nightly.`,label:`About rolling average`})}),(0,f.jsx)(l,{label:`Peak`,endContent:(0,f.jsx)(s,{content:`The highest daily value this month.`,label:`About peak`})})]})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Editors can change this field; viewers cannot.'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HStack gap={1} align="center">
        <Text>Rolling average</Text>
        <InfoTip content="30-day rolling average, recomputed nightly." label="About this metric" />
      </HStack>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HStack gap={1} align="center">
        <Text>Rolling average</Text>
        <InfoTip content="30-day rolling average, recomputed nightly." label="About this metric" />
      </HStack>
    </div>
}`,...g.parameters?.docs?.source},description:{story:`Revealing the help is the button's only purpose, so \`InfoTip\` pins it on a
press: tap the icon on a phone (or with touch emulation on), click it, or
press Enter or Space and the help pins open; tap outside and it dismisses.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HStack gap={4} align="center">
        <InfoTip content="Extra small" size="xsm" />
        <InfoTip content="Small (default)" size="sm" />
        <InfoTip content="Medium" size="md" />
        <InfoTip content="Large" size="lg" />
      </HStack>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 360
  }}>
      <List hasDividers>
        <ListItem label="Rolling average" endContent={<InfoTip content="30-day rolling average, recomputed nightly." label="About rolling average" />} />
        <ListItem label="Peak" endContent={<InfoTip content="The highest daily value this month." label="About peak" />} />
      </List>
    </div>
}`,...v.parameters?.docs?.source},description:{story:`Info buttons at the end of divided List rows. Under a finger each button
takes taps out toward 44 px, as anywhere else. The row's divider never
widens that reach.`,...v.parameters?.docs?.description}}},y=[`Default`,`NextToALabel`,`Touch`,`Sizes`,`InADividedList`]})))()}b();export{m as Default,v as InADividedList,h as NextToALabel,_ as Sizes,g as Touch,y as __namedExportsOrder,p as default};