import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Slider-CV0XyS9F.js";var a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{a=t(),r(),o=n(),s={title:`Core/Slider`,component:i,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},isDisabled:{control:`boolean`,description:`Whether the slider is disabled`},disabledMessage:{control:`text`,description:`Explains why the slider is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the thumb focusable via aria-disabled (value changes stay blocked). Use this instead of wrapping a disabled Slider in Tooltip.`},min:{control:`number`,description:`Minimum value`},max:{control:`number`,description:`Maximum value`},step:{control:`number`,description:`Step increment`},orientation:{control:`select`,options:[`horizontal`,`vertical`],description:`Slider orientation`},valueDisplay:{control:`select`,options:[`tooltip`,`text`,`none`],description:`How the value is displayed`}}},c={render:e=>{let[t,n]=(0,a.useState)(50);return(0,o.jsx)(i,{...e,value:t,onChange:n})},args:{label:`Volume`}},l={render:e=>{let[t,n]=(0,a.useState)([20,80]);return(0,o.jsx)(i,{...e,value:t,onChange:n})},args:{label:`Price range`}},u={render:e=>{let[t,n]=(0,a.useState)(50);return(0,o.jsx)(i,{...e,value:t,onChange:n})},args:{label:`Volume`,marks:[{value:0,label:`0`},{value:25,label:`25`},{value:50,label:`50`},{value:75,label:`75`},{value:100,label:`100`}]}},d={render:e=>{let[t,n]=(0,a.useState)(50);return(0,o.jsx)(i,{...e,value:t,onChange:n,valueDisplay:`text`})},args:{label:`Quantity`,min:0,max:100,step:10}},f={render:e=>{let[t,n]=(0,a.useState)(72);return(0,o.jsx)(i,{...e,value:t,onChange:n,valueDisplay:`text`})},args:{label:`Temperature`,min:60,max:90,step:1,formatValue:e=>`${e}°F`}},p={render:e=>(0,o.jsx)(i,{...e}),args:{label:`Volume`,value:50,isDisabled:!0}},m={tags:[`visual-theme-matrix`],render:e=>(0,o.jsx)(i,{...e}),args:{label:`Volume`,value:50,valueDisplay:`text`,isDisabled:!0}},h={render:e=>{let[t,n]=(0,a.useState)(50);return(0,o.jsx)(`div`,{style:{height:200},children:(0,o.jsx)(i,{...e,value:t,onChange:n})})},args:{label:`Volume`,orientation:`vertical`}},g={render:()=>{let[e,t]=(0,a.useState)(95),[n,r]=(0,a.useState)(50),[s,c]=(0,a.useState)(75);return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`,maxWidth:`400px`},children:[(0,o.jsx)(i,{label:`CPU Usage`,value:e,onChange:t,status:{type:`error`,message:`CPU usage is critically high`}}),(0,o.jsx)(i,{label:`Memory`,value:n,onChange:r,status:{type:`warning`,message:`Memory usage is moderate`}}),(0,o.jsx)(i,{label:`Disk`,value:s,onChange:c,status:{type:`success`,message:`Disk usage is healthy`}})]})}},_={render:()=>{let[e,t]=(0,a.useState)(50),[n,r]=(0,a.useState)([20,80]),[s,c]=(0,a.useState)(30),[l,u]=(0,a.useState)(72);return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`,maxWidth:`400px`},children:[(0,o.jsx)(i,{label:`Default slider`,value:e,onChange:t}),(0,o.jsx)(i,{label:`Range slider`,value:n,onChange:r}),(0,o.jsx)(i,{label:`With marks`,value:s,onChange:c,marks:[{value:0,label:`0%`},{value:50,label:`50%`},{value:100,label:`100%`}]}),(0,o.jsx)(i,{label:`With text display`,value:l,onChange:u,formatValue:e=>`${e}°F`,valueDisplay:`text`,min:60,max:90}),(0,o.jsx)(i,{label:`Disabled`,value:50,isDisabled:!0}),(0,o.jsx)(i,{label:`No value display`,value:e,onChange:t,valueDisplay:`none`})]})}},v={render:e=>(0,o.jsx)(i,{...e}),args:{label:`Volume`,value:50,isDisabled:!0,disabledMessage:`Volume is locked while sharing your screen`}},y={name:`Pressed state`,parameters:{docs:{description:{story:"Press and drag to paint the system's `--color-overlay-pressed` layer on only the thumb being dragged. The disabled example remains visually unchanged and its value cannot move."}}},render:()=>{let[e,t]=(0,a.useState)(40),[n,r]=(0,a.useState)([20,80]);return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,o.jsx)(i,{label:`Volume — press and drag`,value:e,onChange:t}),(0,o.jsx)(i,{label:`Price range — only the dragged thumb presses`,value:n,onChange:r}),(0,o.jsx)(i,{label:`Unavailable — no pressed state`,value:60,onChange:()=>{},isDisabled:!0})]})}},b={name:`Touch tracking`,parameters:{docs:{description:{story:"Under a finger only the thumb takes a drag, through a touch target larger than it; a swipe from the track scrolls the page, and a tap on the track sets the value when the finger lifts. The value follows the finger’s travel past a 10 px start threshold, so the thumb never jumps to the finger, and a release coasts on before `onChangeEnd` reports the value."}}},render:e=>{let[t,n]=(0,a.useState)(30),[r,s]=(0,a.useState)([40,40]),[c,l]=(0,a.useState)([]),u=e=>t=>l(n=>[...n.slice(-4),`${e} ${Array.isArray(t)?t.join(`–`):t}`]);return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,o.jsx)(i,{label:`Brightness`,value:t,onChange:n,onChangeEnd:u(`Brightness`),valueDisplay:`text`,max:e.max==null?void 0:Number(e.max)}),(0,o.jsx)(i,{label:`Hours`,value:r,onChange:s,onChangeEnd:u(`Hours`),valueDisplay:`text`}),(0,o.jsx)(`output`,{"data-testid":`slider-change-end`,"aria-live":`polite`,children:c.length===0?`No change committed yet`:c.join(`, `)})]})}},x={name:`In a scrolling list`,parameters:{docs:{description:{story:`Sliders in a scrolling list: a vertical swipe that starts on a thumb scrolls the list, a horizontal one drags the thumb, and inside the scroller the thumb lifts only after the content touch delay.`}}},render:()=>{let[e,t]=(0,a.useState)(()=>Array.from({length:12},(e,t)=>t*37%100));return(0,o.jsx)(`div`,{"data-testid":`slider-list`,style:{height:360,overflowY:`auto`,display:`flex`,flexDirection:`column`,gap:20,padding:16},children:e.map((e,n)=>(0,o.jsx)(i,{label:`Channel ${n+1}`,value:e,onChange:e=>t(t=>t.map((t,r)=>r===n?e:t))},n))})}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(50);
    return <Slider {...args as any} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Volume'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return <Slider {...args as any} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Price range'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(50);
    return <Slider {...args as any} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Volume',
    marks: [{
      value: 0,
      label: '0'
    }, {
      value: 25,
      label: '25'
    }, {
      value: 50,
      label: '50'
    }, {
      value: 75,
      label: '75'
    }, {
      value: 100,
      label: '100'
    }]
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(50);
    return <Slider {...args as any} value={value} onChange={setValue} valueDisplay="text" />;
  },
  args: {
    label: 'Quantity',
    min: 0,
    max: 100,
    step: 10
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(72);
    return <Slider {...args as any} value={value} onChange={setValue} valueDisplay="text" />;
  },
  args: {
    label: 'Temperature',
    min: 60,
    max: 90,
    step: 1,
    formatValue: (v: number) => \`\${v}°F\`
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <Slider {...args as any} />;
  },
  args: {
    label: 'Volume',
    value: 50,
    isDisabled: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  tags: ['visual-theme-matrix'],
  render: args => <Slider {...args as any} />,
  args: {
    label: 'Volume',
    value: 50,
    valueDisplay: 'text',
    isDisabled: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(50);
    return <div style={{
      height: 200
    }}>
        <Slider {...args as any} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    label: 'Volume',
    orientation: 'vertical'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState(95);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(75);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '400px'
    }}>
        <Slider label="CPU Usage" value={value1} onChange={setValue1} status={{
        type: 'error',
        message: 'CPU usage is critically high'
      }} />
        <Slider label="Memory" value={value2} onChange={setValue2} status={{
        type: 'warning',
        message: 'Memory usage is moderate'
      }} />
        <Slider label="Disk" value={value3} onChange={setValue3} status={{
        type: 'success',
        message: 'Disk usage is healthy'
      }} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [v1, setV1] = useState(50);
    const [v2, setV2] = useState<[number, number]>([20, 80]);
    const [v3, setV3] = useState(30);
    const [v4, setV4] = useState(72);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      maxWidth: '400px'
    }}>
        <Slider label="Default slider" value={v1} onChange={setV1} />
        <Slider label="Range slider" value={v2} onChange={setV2} />
        <Slider label="With marks" value={v3} onChange={setV3} marks={[{
        value: 0,
        label: '0%'
      }, {
        value: 50,
        label: '50%'
      }, {
        value: 100,
        label: '100%'
      }]} />
        <Slider label="With text display" value={v4} onChange={setV4} formatValue={v => \`\${v}°F\`} valueDisplay="text" min={60} max={90} />
        <Slider label="Disabled" value={50} isDisabled />
        <Slider label="No value display" value={v1} onChange={setV1} valueDisplay="none" />
      </div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <Slider {...args as any} />;
  },
  args: {
    label: 'Volume',
    value: 50,
    isDisabled: true,
    disabledMessage: 'Volume is locked while sharing your screen'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Pressed state',
  parameters: {
    docs: {
      description: {
        story: "Press and drag to paint the system's \`--color-overlay-pressed\` layer on only the thumb being dragged. The disabled example remains visually unchanged and its value cannot move."
      }
    }
  },
  render: () => {
    const [value, setValue] = useState(40);
    const [range, setRange] = useState<[number, number]>([20, 80]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
        <Slider label="Volume — press and drag" value={value} onChange={setValue} />
        <Slider label="Price range — only the dragged thumb presses" value={range} onChange={setRange} />
        <Slider label="Unavailable — no pressed state" value={60} onChange={() => {}} isDisabled />
      </div>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Touch tracking',
  parameters: {
    docs: {
      description: {
        story: 'Under a finger only the thumb takes a drag, through a touch target larger than it; a swipe from the track scrolls the page, and a tap on the track sets the value when the finger lifts. The value follows the finger’s travel past a 10 px start threshold, so the thumb never jumps to the finger, and a release coasts on before \`onChangeEnd\` reports the value.'
      }
    }
  },
  render: args => {
    const [value, setValue] = useState(30);
    const [range, setRange] = useState<[number, number]>([40, 40]);
    const [ends, setEnds] = useState<string[]>([]);
    const logEnd = (label: string) => (next: number | [number, number]) => setEnds(previous => [...previous.slice(-4), \`\${label} \${Array.isArray(next) ? next.join('–') : next}\`]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
        <Slider label="Brightness" value={value} onChange={setValue} onChangeEnd={logEnd('Brightness')} valueDisplay="text" max={args.max == null ? undefined : Number(args.max)} />
        <Slider label="Hours" value={range} onChange={setRange} onChangeEnd={logEnd('Hours')} valueDisplay="text" />
        <output data-testid="slider-change-end" aria-live="polite">
          {ends.length === 0 ? 'No change committed yet' : ends.join(', ')}
        </output>
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'In a scrolling list',
  parameters: {
    docs: {
      description: {
        story: 'Sliders in a scrolling list: a vertical swipe that starts on a thumb scrolls the list, a horizontal one drags the thumb, and inside the scroller the thumb lifts only after the content touch delay.'
      }
    }
  },
  render: () => {
    const [values, setValues] = useState(() => Array.from({
      length: 12
    }, (_, index) => index * 37 % 100));
    return <div data-testid="slider-list" style={{
      height: 360,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: 16
    }}>
        {values.map((value, index) => <Slider key={index} label={\`Channel \${index + 1}\`} value={value} onChange={(next: number) => setValues(previous => previous.map((current, i) => i === index ? next : current))} />)}
      </div>;
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Range`,`WithMarks`,`CustomStep`,`WithFormatValue`,`Disabled`,`DisabledWithTextValue`,`VerticalOrientation`,`WithStatus`,`AllVariations`,`DisabledWithMessage`,`PressedState`,`TouchTracking`,`InScrollingList`]})))()}C();export{_ as AllVariations,d as CustomStep,c as Default,p as Disabled,v as DisabledWithMessage,m as DisabledWithTextValue,x as InScrollingList,y as PressedState,l as Range,b as TouchTracking,h as VerticalOrientation,f as WithFormatValue,u as WithMarks,g as WithStatus,S as __namedExportsOrder,s as default};