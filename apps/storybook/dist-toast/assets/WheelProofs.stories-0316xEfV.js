import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,n as i,r as a,t as o}from"./Wheel-Cy4oLTLP.js";var s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{s=t(),r(),i(),c=n(),l=Array.from({length:60},(e,t)=>({value:t,label:String(t).padStart(2,`0`)})),u={color:`inherit`,backgroundColor:`transparent`},d={title:`Core/Wheel`,tags:[`no-visual`,`!autodocs`],parameters:{layout:`centered`}},f={render:()=>{let[e,t]=(0,s.useState)(0);return(0,c.jsxs)(`div`,{style:{display:`grid`,gap:16,inlineSize:160},children:[(0,c.jsx)(`input`,{"aria-label":`Committed minute`,readOnly:!0,style:u,value:String(e).padStart(2,`0`)}),(0,c.jsx)(o,{label:`Minute`,options:l,value:e,onChange:t})]})}},p={render:()=>{let[e,t]=(0,s.useState)(0);return(0,c.jsxs)(`div`,{style:{display:`grid`,gap:16,inlineSize:160},children:[(0,c.jsx)(`input`,{"aria-label":`Committed minute`,readOnly:!0,style:u,value:String(e).padStart(2,`0`)}),(0,c.jsx)(a,{label:`Minute`,options:l,value:e,onChange:t})]})}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [minute, setMinute] = useState(0);
    return <div style={{
      display: 'grid',
      gap: 16,
      inlineSize: 160
    }}>
        <input aria-label="Committed minute" readOnly style={READOUT_STYLE} value={String(minute).padStart(2, '0')} />
        <Wheel label="Minute" options={MINUTES} value={minute} onChange={setMinute} />
      </div>;
  }
}`,...f.parameters?.docs?.source},description:{story:`A finger gets the touch column, a mouse the scrolling column; either commits
into the field above it.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [minute, setMinute] = useState(0);
    return <div style={{
      display: 'grid',
      gap: 16,
      inlineSize: 160
    }}>
        <input aria-label="Committed minute" readOnly style={READOUT_STYLE} value={String(minute).padStart(2, '0')} />
        <PickerWheel label="Minute" options={MINUTES} value={minute} onChange={setMinute} />
      </div>;
  }
}`,...p.parameters?.docs?.source},description:{story:`The touch column alone, whatever the primary pointer: WebKit's driver sends
a trackpad's precise deltas only from a desktop context, whose primary
pointer is fine, and its mobile emulation sends no wheel at all.`,...p.parameters?.docs?.description}}},m=[`Minutes`,`TouchMinutes`]})))()}h();export{f as Minutes,p as TouchMinutes,m as __namedExportsOrder,d as default};