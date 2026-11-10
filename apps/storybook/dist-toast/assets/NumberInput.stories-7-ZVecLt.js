import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./NumberInput-CXlV3t9e.js";import{l as o,u as s}from"./iframe-B7UFaprG.js";function c({title:e,titleId:t,...n},r){return l.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?l.createElement(`title`,{id:t},e):null,l.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z`}))}var l,u;function d(){return(d=t((()=>{l=e(n()),u=l.forwardRef(c)})))()}function f({title:e,titleId:t,...n},r){return p.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?p.createElement(`title`,{id:t},e):null,p.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5`}))}var p,m;function h(){return(h=t((()=>{p=e(n()),m=p.forwardRef(f)})))()}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=t((()=>{g=n(),i(),s(),h(),d(),_=r(),v={title:`Core/NumberInput`,component:a,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},placeholder:{control:`text`,description:`Placeholder text`},description:{control:`text`,description:`Description text displayed between the label and input`},value:{control:`number`,description:`Current input value (number, null, or undefined)`},size:{control:`select`,options:[`sm`,`md`,`lg`],description:`Size variant`},isOptional:{control:`boolean`,description:`Whether the field is optional (mutually exclusive with isRequired)`},isRequired:{control:`boolean`,description:`Whether the field is required (mutually exclusive with isOptional)`},isDisabled:{control:`boolean`,description:`Whether the input is disabled`},isReadOnly:{control:`boolean`,description:`Whether the input is read-only. The value still submits with the form but cannot be edited. Unlike isDisabled it is not dimmed and keeps its form value.`},disabledMessage:{control:`text`,description:`Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (the field becomes read-only). Use this instead of wrapping a disabled NumberInput in Tooltip.`},status:{control:`object`,description:`Status indicator with type (warning/error/success) and optional message`},labelTooltip:{control:`text`,description:`Tooltip text to display in an info icon at the end of the label`},min:{control:`number`,description:`Minimum value allowed`},max:{control:`number`,description:`Maximum value allowed`},step:{control:`number`,description:`Step increment for the input`},formatValue:{control:!1,description:`Formats the committed value while the input is not focused`},isWheelEnabled:{control:`boolean`,description:`Whether a wheel gesture over the focused input steps the value`},hasNumberSteppers:{control:`boolean`,description:`Shows increment and decrement buttons`},units:{control:`text`,description:`Units text to display at the end of the input (e.g., "%" or "GB")`},isIntegerOnly:{control:`boolean`,description:`Only allow integer values (no floating point)`},autoComplete:{control:`text`,description:`HTML autocomplete attribute`}}},y={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Quantity`,placeholder:`Enter quantity`}},b={render:()=>{let[e,t]=(0,g.useState)(null),[n,r]=(0,g.useState)(null);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(a,{label:`Impressions (en-US)`,description:`Paste 1,234,234,234 or $1,234.56, then blur`,placeholder:`Paste a formatted number`,value:e,onChange:t,hasClear:!0}),(0,_.jsxs)(`p`,{"data-testid":`en-committed`,children:[`Committed: `,String(e)]})]}),(0,_.jsx)(o,{locale:`de-DE`,children:(0,_.jsxs)(`div`,{children:[(0,_.jsx)(a,{label:`Impressionen (de-DE)`,description:`Paste 1.234.234.234 or 1,5`,placeholder:`Paste a formatted number`,value:n,onChange:r,formatValue:e=>new Intl.NumberFormat(`de-DE`).format(e),hasClear:!0}),(0,_.jsxs)(`p`,{"data-testid":`de-committed`,children:[`Committed: `,String(n)]})]})})]})}},x={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Age`,description:`Enter your age in years`,placeholder:`Enter your age`}},S={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Rating`,placeholder:`1-5`,min:1,max:5,description:`Rate from 1 to 5`}},C={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Price`,placeholder:`0.00`,min:0,step:.01,startIcon:u}},w={render:e=>{let[t,n]=(0,g.useState)(e.value??1234.56);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Monthly revenue`,value:1234.56,min:0,step:.01,description:`Focus the input to edit the raw numeric value`,formatValue:e=>new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`}).format(e)}},T={parameters:{docs:{description:{story:`The compact steppers are shown on fine pointers and hidden on coarse pointers, regardless of viewport width. Direct entry and arrow-key stepping remain available.`}}},render:e=>{let[t,n]=(0,g.useState)(e.value??2);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Quantity`,value:2,min:0,max:10,hasNumberSteppers:!0}},E={render:()=>{let[e,t]=(0,g.useState)(2),[n,r]=(0,g.useState)(2);return(0,_.jsxs)(`div`,{style:{width:360,height:260,overflowY:`auto`,padding:16,border:`1px solid #ccd3db`},children:[(0,_.jsx)(`div`,{style:{height:140},children:`Scroll down to the focused examples.`}),(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,_.jsx)(a,{label:`Wheel stepping enabled (default)`,description:`Focus, then use the wheel to change the value`,value:e,onChange:t}),(0,_.jsx)(a,{label:`Wheel stepping disabled`,description:`Focused wheel gestures continue scrolling`,value:n,onChange:r,isWheelEnabled:!1})]}),(0,_.jsx)(`div`,{style:{height:180}})]})}},D={render:e=>{let[t,n]=(0,g.useState)(e.value??50);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Discount`,placeholder:`Enter discount`,min:0,max:100,units:`%`}},O={render:e=>{let[t,n]=(0,g.useState)(e.value??128);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Storage`,placeholder:`Enter storage`,min:0,units:`GB`}},k={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Count`,placeholder:`Enter count`,isIntegerOnly:!0,description:`Only accepts whole numbers`}},A={render:e=>{let[t,n]=(0,g.useState)(e.value??42);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Quantity`,value:42}},j={render:()=>{let[e,t]=(0,g.useState)(null),[n,r]=(0,g.useState)(null),[i,o]=(0,g.useState)(100),[s,c]=(0,g.useState)(null),[l,u]=(0,g.useState)(null),[d,f]=(0,g.useState)(null),[p,m]=(0,g.useState)(null),[h,v]=(0,g.useState)(50),[y,b]=(0,g.useState)(75);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`300px`},children:[(0,_.jsx)(a,{label:`Visible label`,value:e,onChange:t,placeholder:`Enter number...`}),(0,_.jsx)(a,{label:`With description`,description:`Helpful description text`,value:s,onChange:c,placeholder:`Enter number...`}),(0,_.jsx)(a,{label:`Hidden label`,isLabelHidden:!0,value:n,onChange:r,placeholder:`Hidden label input`}),(0,_.jsx)(a,{label:`With value`,value:i,onChange:o}),(0,_.jsx)(a,{label:`Optional field`,isOptional:!0,value:l,onChange:u,placeholder:`Optional...`}),(0,_.jsx)(a,{label:`Required field`,isRequired:!0,value:d,onChange:f,placeholder:`Required...`}),(0,_.jsx)(a,{label:`With min/max`,description:`Enter a value between 1 and 10`,min:1,max:10,value:p,onChange:m,placeholder:`1-10`}),(0,_.jsx)(a,{label:`Disabled field`,isDisabled:!0,value:h,onChange:v}),(0,_.jsx)(a,{label:`With units`,value:y,onChange:b,units:`%`})]})}},M={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Phone Extension`,isOptional:!0,placeholder:`Enter extension`}},N={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Quantity`,isRequired:!0,placeholder:`Enter quantity`}},P={render:e=>{let[t,n]=(0,g.useState)(e.value??1024);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Allocated storage (GB)`,isReadOnly:!0,value:1024}},F={render:e=>{let[t,n]=(0,g.useState)(e.value??100);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Locked Amount`,isDisabled:!0,value:100}},I={render:e=>{let[t,n]=(0,g.useState)(e.value??100);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Quantity`,isDisabled:!0,disabledMessage:`Editing is locked while the order is processing`,value:100}},L={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Count`,placeholder:`Enter count...`,startIcon:m}},R={render:()=>{let[e,t]=(0,g.useState)(null),[n,r]=(0,g.useState)(null),[i,o]=(0,g.useState)(null);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`300px`},children:[(0,_.jsx)(a,{label:`Small (28px)`,value:e,onChange:t,placeholder:`Small size`,size:`sm`}),(0,_.jsx)(a,{label:`Medium (32px)`,value:n,onChange:r,placeholder:`Medium size (default)`,size:`md`}),(0,_.jsx)(a,{label:`Large (36px)`,value:i,onChange:o,placeholder:`Large size`,size:`lg`})]})}},z={render:e=>{let[t,n]=(0,g.useState)(e.value??-5);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Age`,placeholder:`Enter your age`,min:0,status:{type:`error`,message:`Age must be a positive number`}}},B={render:e=>{let[t,n]=(0,g.useState)(e.value??150);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Age`,placeholder:`Enter your age`,status:{type:`warning`,message:`This value seems unusually high`}}},V={render:e=>{let[t,n]=(0,g.useState)(e.value??25);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Age`,placeholder:`Enter your age`,status:{type:`success`,message:`Valid age`}}},H={render:()=>{let[e,t]=(0,g.useState)(-5),[n,r]=(0,g.useState)(150),[i,o]=(0,g.useState)(25),[s,c]=(0,g.useState)(0);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`300px`},children:[(0,_.jsx)(a,{label:`Error with message`,value:e,onChange:t,status:{type:`error`,message:`Must be positive`}}),(0,_.jsx)(a,{label:`Warning with message`,value:n,onChange:r,status:{type:`warning`,message:`Value seems high`}}),(0,_.jsx)(a,{label:`Success with message`,value:i,onChange:o,status:{type:`success`,message:`Looks good`}}),(0,_.jsx)(a,{label:`Error without message`,value:s,onChange:c,status:{type:`error`}})]})}},U={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`API Rate Limit`,placeholder:`Enter rate limit`,labelTooltip:`Maximum number of API requests per minute`}},W={render:e=>{let[t,n]=(0,g.useState)(e.value??null);return(0,_.jsx)(a,{...e,value:t,onChange:n})},args:{label:`Price`,placeholder:`0.00`,min:0,step:.01,startIcon:u,description:`Enter amount in dollars`}},G={render:e=>{let[t,n]=(0,g.useState)(e.value??null),[r,i]=(0,g.useState)([]),o=e=>{i(t=>[...t.slice(-4),e])};return(0,_.jsxs)(`div`,{style:{maxWidth:`300px`},children:[(0,_.jsx)(a,{label:e.label,placeholder:e.placeholder,description:e.description,value:t,onChange:e=>{n(e),o(`onChange: ${e}`)},onFocus:()=>o(`onFocus`),onBlur:()=>o(`onBlur`),onEnter:()=>o(`onEnter`)}),(0,_.jsxs)(`div`,{style:{marginTop:`16px`,fontSize:`12px`,color:`var(--color-text-secondary)`},children:[(0,_.jsx)(`strong`,{children:`Events:`}),(0,_.jsx)(`ul`,{style:{margin:`4px 0`,paddingLeft:`20px`},children:r.map((e,t)=>(0,_.jsx)(`li`,{children:e},t))})]})]})},args:{label:`Interactive`,placeholder:`Type and press Enter`,description:`Events are logged below`}},K={render:e=>{let[t,n]=(0,g.useState)(e.value??42);return(0,_.jsx)(a,{...e,value:t,onChange:n,hasClear:!0})},args:{label:`Quantity`,placeholder:`Enter a number`}},q={render:e=>{let[t,n]=(0,g.useState)(e.value??75);return(0,_.jsx)(a,{...e,value:t,onChange:n,hasClear:!0})},args:{label:`Progress`,units:`%`,min:0,max:100}},J={render:()=>{let[e,t]=(0,g.useState)(-5),[n,r]=(0,g.useState)(-5);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,_.jsx)(a,{label:`Attached (default)`,value:e,onChange:t,status:{type:`error`,message:`Must be a positive number`}}),(0,_.jsx)(a,{label:`Detached`,value:n,onChange:r,status:{type:`error`,message:`Must be a positive number`},statusVariant:`detached`})]})}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Quantity',
    placeholder: 'Enter quantity'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [enUS, setEnUS] = useState<number | null>(null);
    const [deDE, setDeDE] = useState<number | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
        <div>
          <NumberInput label="Impressions (en-US)" description="Paste 1,234,234,234 or $1,234.56, then blur" placeholder="Paste a formatted number" value={enUS} onChange={setEnUS} hasClear />
          <p data-testid="en-committed">Committed: {String(enUS)}</p>
        </div>
        <InternationalizationProvider locale="de-DE">
          <div>
            <NumberInput label="Impressionen (de-DE)" description="Paste 1.234.234.234 or 1,5" placeholder="Paste a formatted number" value={deDE} onChange={setDeDE} formatValue={value => new Intl.NumberFormat('de-DE').format(value)} hasClear />
            <p data-testid="de-committed">Committed: {String(deDE)}</p>
          </div>
        </InternationalizationProvider>
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Age',
    description: 'Enter your age in years',
    placeholder: 'Enter your age'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Rating',
    placeholder: '1-5',
    min: 1,
    max: 5,
    description: 'Rate from 1 to 5'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Price',
    placeholder: '0.00',
    min: 0,
    step: 0.01,
    startIcon: CurrencyDollarIcon
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 1234.56);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Monthly revenue',
    value: 1234.56,
    min: 0,
    step: 0.01,
    description: 'Focus the input to edit the raw numeric value',
    formatValue: value => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The compact steppers are shown on fine pointers and hidden on coarse pointers, regardless of viewport width. Direct entry and arrow-key stepping remain available.'
      }
    }
  },
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 2);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Quantity',
    value: 2,
    min: 0,
    max: 10,
    hasNumberSteppers: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [enabledValue, setEnabledValue] = useState<number | null>(2);
    const [disabledValue, setDisabledValue] = useState<number | null>(2);
    return <div style={{
      width: 360,
      height: 260,
      overflowY: 'auto',
      padding: 16,
      border: '1px solid #ccd3db'
    }}>
        <div style={{
        height: 140
      }}>Scroll down to the focused examples.</div>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
          <NumberInput label="Wheel stepping enabled (default)" description="Focus, then use the wheel to change the value" value={enabledValue} onChange={setEnabledValue} />
          <NumberInput label="Wheel stepping disabled" description="Focused wheel gestures continue scrolling" value={disabledValue} onChange={setDisabledValue} isWheelEnabled={false} />
        </div>
        <div style={{
        height: 180
      }} />
      </div>;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 50);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Discount',
    placeholder: 'Enter discount',
    min: 0,
    max: 100,
    units: '%'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 128);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Storage',
    placeholder: 'Enter storage',
    min: 0,
    units: 'GB'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Count',
    placeholder: 'Enter count',
    isIntegerOnly: true,
    description: 'Only accepts whole numbers'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 42);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Quantity',
    value: 42
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<number | null>(null);
    const [value2, setValue2] = useState<number | null>(null);
    const [value3, setValue3] = useState<number | null>(100);
    const [value4, setValue4] = useState<number | null>(null);
    const [value5, setValue5] = useState<number | null>(null);
    const [value6, setValue6] = useState<number | null>(null);
    const [value7, setValue7] = useState<number | null>(null);
    const [value8, setValue8] = useState<number | null>(50);
    const [value9, setValue9] = useState<number | null>(75);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '300px'
    }}>
        <NumberInput label="Visible label" value={value1} onChange={setValue1} placeholder="Enter number..." />
        <NumberInput label="With description" description="Helpful description text" value={value4} onChange={setValue4} placeholder="Enter number..." />
        <NumberInput label="Hidden label" isLabelHidden value={value2} onChange={setValue2} placeholder="Hidden label input" />
        <NumberInput label="With value" value={value3} onChange={setValue3} />
        <NumberInput label="Optional field" isOptional value={value5} onChange={setValue5} placeholder="Optional..." />
        <NumberInput label="Required field" isRequired value={value6} onChange={setValue6} placeholder="Required..." />
        <NumberInput label="With min/max" description="Enter a value between 1 and 10" min={1} max={10} value={value7} onChange={setValue7} placeholder="1-10" />
        <NumberInput label="Disabled field" isDisabled value={value8} onChange={setValue8} />
        <NumberInput label="With units" value={value9} onChange={setValue9} units="%" />
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Phone Extension',
    isOptional: true,
    placeholder: 'Enter extension'
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Quantity',
    isRequired: true,
    placeholder: 'Enter quantity'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 1024);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Allocated storage (GB)',
    isReadOnly: true,
    value: 1024
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 100);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Locked Amount',
    isDisabled: true,
    value: 100
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 100);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Quantity',
    isDisabled: true,
    disabledMessage: 'Editing is locked while the order is processing',
    value: 100
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Count',
    placeholder: 'Enter count...',
    startIcon: HashtagIcon
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sm, setSm] = useState<number | null>(null);
    const [md, setMd] = useState<number | null>(null);
    const [lg, setLg] = useState<number | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '300px'
    }}>
        <NumberInput label="Small (28px)" value={sm} onChange={setSm} placeholder="Small size" size="sm" />
        <NumberInput label="Medium (32px)" value={md} onChange={setMd} placeholder="Medium size (default)" size="md" />
        <NumberInput label="Large (36px)" value={lg} onChange={setLg} placeholder="Large size" size="lg" />
      </div>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? -5);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    min: 0,
    status: {
      type: 'error',
      message: 'Age must be a positive number'
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 150);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    status: {
      type: 'warning',
      message: 'This value seems unusually high'
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 25);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    status: {
      type: 'success',
      message: 'Valid age'
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [error, setError] = useState<number | null>(-5);
    const [warning, setWarning] = useState<number | null>(150);
    const [success, setSuccess] = useState<number | null>(25);
    const [errorNoMsg, setErrorNoMsg] = useState<number | null>(0);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '300px'
    }}>
        <NumberInput label="Error with message" value={error} onChange={setError} status={{
        type: 'error',
        message: 'Must be positive'
      }} />
        <NumberInput label="Warning with message" value={warning} onChange={setWarning} status={{
        type: 'warning',
        message: 'Value seems high'
      }} />
        <NumberInput label="Success with message" value={success} onChange={setSuccess} status={{
        type: 'success',
        message: 'Looks good'
      }} />
        <NumberInput label="Error without message" value={errorNoMsg} onChange={setErrorNoMsg} status={{
        type: 'error'
      }} />
      </div>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'API Rate Limit',
    placeholder: 'Enter rate limit',
    labelTooltip: 'Maximum number of API requests per minute'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Price',
    placeholder: '0.00',
    min: 0,
    step: 0.01,
    startIcon: CurrencyDollarIcon,
    description: 'Enter amount in dollars'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    const [events, setEvents] = useState<string[]>([]);
    const addEvent = (event: string) => {
      setEvents(prev => [...prev.slice(-4), event]);
    };
    return <div style={{
      maxWidth: '300px'
    }}>
        <NumberInput label={args.label} placeholder={args.placeholder} description={args.description} value={value} onChange={v => {
        setValue(v);
        addEvent(\`onChange: \${v}\`);
      }} onFocus={() => addEvent('onFocus')} onBlur={() => addEvent('onBlur')} onEnter={() => addEvent('onEnter')} />
        <div style={{
        marginTop: '16px',
        fontSize: '12px',
        color: 'var(--color-text-secondary)'
      }}>
          <strong>Events:</strong>
          <ul style={{
          margin: '4px 0',
          paddingLeft: '20px'
        }}>
            {events.map((event, i) => <li key={i}>{event}</li>)}
          </ul>
        </div>
      </div>;
  },
  args: {
    label: 'Interactive',
    placeholder: 'Type and press Enter',
    description: 'Events are logged below'
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 42);
    return <NumberInput {...args} value={value} onChange={setValue} hasClear />;
  },
  args: {
    label: 'Quantity',
    placeholder: 'Enter a number'
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | null>(args.value ?? 75);
    return <NumberInput {...args} value={value} onChange={setValue} hasClear />;
  },
  args: {
    label: 'Progress',
    units: '%',
    min: 0,
    max: 100
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<number | null>(-5);
    const [b, setB] = useState<number | null>(-5);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 280
    }}>
        <NumberInput label="Attached (default)" value={a} onChange={setA} status={{
        type: 'error',
        message: 'Must be a positive number'
      }} />
        <NumberInput label="Detached" value={b} onChange={setB} status={{
        type: 'error',
        message: 'Must be a positive number'
      }} statusVariant="detached" />
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y=`Default.PasteFormattedNumber.WithDescription.WithMinMax.WithStep.FormattedDisplay.WithNumberSteppers.WheelBehavior.WithUnits.WithUnitsGB.IntegerOnly.WithValue.AllVariations.OptionalField.RequiredField.ReadOnly.Disabled.DisabledWithMessage.WithStartIcon.SizeVariants.ErrorStatus.WarningStatus.SuccessStatus.StatusVariations.WithTooltip.DecimalInput.WithEventHandlers.Clearable.ClearableWithUnits.StatusVariantComparison`.split(`.`)})))()}X();export{j as AllVariations,K as Clearable,q as ClearableWithUnits,W as DecimalInput,y as Default,F as Disabled,I as DisabledWithMessage,z as ErrorStatus,w as FormattedDisplay,k as IntegerOnly,M as OptionalField,b as PasteFormattedNumber,P as ReadOnly,N as RequiredField,R as SizeVariants,J as StatusVariantComparison,H as StatusVariations,V as SuccessStatus,B as WarningStatus,E as WheelBehavior,x as WithDescription,G as WithEventHandlers,S as WithMinMax,T as WithNumberSteppers,L as WithStartIcon,C as WithStep,U as WithTooltip,D as WithUnits,O as WithUnitsGB,A as WithValue,Y as __namedExportsOrder,v as default};