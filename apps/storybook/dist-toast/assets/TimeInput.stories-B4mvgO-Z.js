import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./InputGroup-BWTkP6pA.js";import{n as s,t as c}from"./InputGroupText-Dko_Ilc1.js";import{n as l,t as u}from"./FormLayout-CAcZ3H26.js";import{n as d,t as f}from"./TimeInput-ghxif3Hl.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{p=t(),d(),l(),r(),a(),s(),m=n(),h={title:`Core/TimeInput`,component:f,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},placeholder:{control:`text`,description:`Placeholder text`},description:{control:`text`,description:`Description text displayed between the label and input`},isOptional:{control:`boolean`,description:`Whether the field is optional (mutually exclusive with isRequired)`},isRequired:{control:`boolean`,description:`Whether the field is required (mutually exclusive with isOptional)`},isDisabled:{control:`boolean`,description:`Whether the input is disabled`},disabledMessage:{control:`text`,description:`Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and describes the input (activation stays blocked). Use this instead of wrapping a disabled TimeInput in Tooltip.`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Size of the input`},hourFormat:{control:`radio`,options:[`12h`,`24h`],description:`Hour format for display`},hasSeconds:{control:`boolean`,description:`Whether to include seconds in the time`},hasClear:{control:`boolean`,description:`Whether to show a clear button`},presentation:{control:`select`,options:[`text-input`,`popover`,`bottom-sheet`,`native`,`adaptive-bottom-sheet`,`adaptive-native`],description:`Which surface selects the time (spec:AST-043); nativePicker is deprecated`},nativePicker:{control:`radio`,options:[`touch`,`always`,`never`],description:`Deprecated — use presentation ('touch' → 'adaptive-native', 'always' → 'native', 'never' → 'text-input'); presentation wins when both are set`},increment:{control:`number`,description:`Minutes to increment/decrement with arrow keys`}}},g={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Time`,placeholder:`Select a time`}},_={render:e=>{let[t,n]=(0,p.useState)(`14:30`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Meeting time`}},v={render:()=>{let[e,t]=(0,p.useState)(`14:30`);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,m.jsx)(f,{label:`presentation='adaptive-native' (default)`,description:`Native picker on a coarse primary pointer; Astryx typed field on a fine pointer`,value:e,onChange:t,presentation:`adaptive-native`}),(0,m.jsx)(f,{label:`presentation='native'`,description:`Native picker wherever input type=time is compatible`,value:e,onChange:t,presentation:`native`}),(0,m.jsx)(f,{label:`presentation='adaptive-bottom-sheet'`,description:`Astryx bottom sheet on a coarse primary pointer; Astryx typed field on a fine pointer`,value:e,onChange:t,presentation:`adaptive-bottom-sheet`}),(0,m.jsx)(f,{label:`presentation='text-input'`,description:`Astryx typed field on every pointer type`,value:e,onChange:t,presentation:`text-input`})]})}},y={render:e=>{let[t,n]=(0,p.useState)(`14:30`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Time (24h)`,hourFormat:`24h`}},b={render:e=>{let[t,n]=(0,p.useState)(`14:30:45`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Precise time`,hasSeconds:!0}},x={render:e=>{let[t,n]=(0,p.useState)(`09:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Start time`,hasClear:!0}},S={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Alarm time`,description:`When should we wake you up?`,placeholder:`Set alarm time`}},C={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Appointment time`,min:`09:00`,max:`17:00`,description:`Business hours: 9 AM - 5 PM`,placeholder:`Select appointment time`}},w={render:e=>{let[t,n]=(0,p.useState)(`10:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Appointment time`,presentation:`bottom-sheet`,min:`09:00`,max:`17:00`,description:`Business hours: 9 AM - 5 PM`}},T={render:e=>{let[t,n]=(0,p.useState)(`11:58`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Alarm`,presentation:`bottom-sheet`}},E={render:e=>{let[t,n]=(0,p.useState)(`09:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Time slot`,increment:15,description:`Use arrow keys to change by 15 minutes`}},D={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Preferred time`,isOptional:!0,placeholder:`Select a time (optional)`}},O={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Start time`,isRequired:!0,placeholder:`Select a start time`}},k={render:e=>{let[t,n]=(0,p.useState)(`10:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Locked time`,isDisabled:!0}},A={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Start time`,isDisabled:!0,disabledMessage:`You need the Editor role to change this`}},j={render:e=>{let[t,n]=(0,p.useState)(void 0);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Time`,size:`sm`,placeholder:`Select a time`}},M={render:e=>{let[t,n]=(0,p.useState)(`22:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Event time`,status:{type:`error`,message:`Time must be during business hours`}}},N={render:e=>{let[t,n]=(0,p.useState)(`07:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Meeting time`,status:{type:`warning`,message:`Early morning meeting - are you sure?`}}},P={render:e=>{let[t,n]=(0,p.useState)(`10:00`);return(0,m.jsx)(f,{...e,value:t,onChange:n})},args:{label:`Scheduled time`,status:{type:`success`,message:`Time slot is available`}}},F={render:()=>{let[e,t]=(0,p.useState)(void 0),[n,r]=(0,p.useState)(`14:30`),[i,a]=(0,p.useState)(`09:15:30`),[o,s]=(0,p.useState)(void 0),[c,l]=(0,p.useState)(void 0),[u,d]=(0,p.useState)(`10:00`),[h,g]=(0,p.useState)(`22:00`);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`300px`},children:[(0,m.jsx)(f,{label:`Default (12h)`,value:e,onChange:t,placeholder:`Select a time`}),(0,m.jsx)(f,{label:`24-hour format`,value:n,onChange:r,hourFormat:`24h`}),(0,m.jsx)(f,{label:`With seconds`,value:i,onChange:a,hasSeconds:!0}),(0,m.jsx)(f,{label:`With clear button`,value:o,onChange:s,hasClear:!0,placeholder:`Select a time`}),(0,m.jsx)(f,{label:`With description`,description:`Pick your preferred time`,value:c,onChange:l,placeholder:`Select a time`}),(0,m.jsx)(f,{label:`Disabled`,isDisabled:!0,value:u,onChange:d}),(0,m.jsx)(f,{label:`With error`,value:h,onChange:g,status:{type:`error`,message:`Invalid time selection`}})]})}},I={render:()=>{let[e,t]=(0,p.useState)(`22:00`),[n,r]=(0,p.useState)(`22:00`);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,m.jsx)(f,{label:`Attached (default)`,value:e,onChange:t,status:{type:`error`,message:`Must be during business hours`}}),(0,m.jsx)(f,{label:`Detached`,value:n,onChange:r,status:{type:`error`,message:`Must be during business hours`},statusVariant:`detached`})]})}},L={outline:`2px dashed #c800ff`,outlineOffset:3},R={backgroundColor:`rgba(0, 150, 255, 0.16)`,padding:8,borderRadius:8},z={render:()=>(0,m.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:360},children:[(0,m.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,m.jsx)(i,{type:`label`,children:`controlStyle`}),(0,m.jsxs)(`div`,{"data-parts-row":`control-text-input`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`presentation="text-input"`}),(0,m.jsx)(f,{label:`Start time`,presentation:`text-input`,controlStyle:L})]}),(0,m.jsxs)(`div`,{"data-parts-row":`control-native`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`presentation="native"`}),(0,m.jsx)(f,{label:`Start time`,presentation:`native`,controlStyle:L})]}),(0,m.jsxs)(`div`,{"data-parts-row":`control-bottom-sheet`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`presentation="bottom-sheet"`}),(0,m.jsx)(f,{label:`Start time`,presentation:`bottom-sheet`,controlStyle:L})]}),(0,m.jsxs)(`div`,{"data-parts-row":`control-form-layout`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,m.jsx)(u,{direction:`horizontal-labels`,children:(0,m.jsx)(f,{label:`Start time`,controlStyle:L})})]}),(0,m.jsxs)(`div`,{"data-parts-row":`control-input-group`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`InputGroup`}),(0,m.jsxs)(o,{label:`Start time group`,children:[(0,m.jsx)(c,{children:`At`}),(0,m.jsx)(f,{label:`Start time`,isLabelHidden:!0,controlStyle:L})]})]})]}),(0,m.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,m.jsx)(i,{type:`label`,children:`containerStyle and controlStyle`}),(0,m.jsxs)(`div`,{"data-parts-row":`container-text-input`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`presentation="text-input"`}),(0,m.jsx)(f,{label:`Start time`,presentation:`text-input`,containerStyle:R,controlStyle:L})]}),(0,m.jsxs)(`div`,{"data-parts-row":`container-form-layout`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,m.jsx)(u,{direction:`horizontal-labels`,children:(0,m.jsx)(f,{label:`Start time`,containerStyle:R,controlStyle:L})})]}),(0,m.jsxs)(`div`,{"data-parts-row":`container-input-group`,style:{display:`grid`,gap:4},children:[(0,m.jsx)(i,{type:`supporting`,children:`InputGroup`}),(0,m.jsxs)(o,{label:`Start time group`,children:[(0,m.jsx)(c,{children:`At`}),(0,m.jsx)(f,{label:`Start time`,isLabelHidden:!0,containerStyle:R,controlStyle:L})]})]})]})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Time',
    placeholder: 'Select a time'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('14:30' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<ISOTimeString | undefined>('14:30' as ISOTimeString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <TimeInput label="presentation='adaptive-native' (default)" description="Native picker on a coarse primary pointer; Astryx typed field on a fine pointer" value={value} onChange={setValue} presentation="adaptive-native" />
        <TimeInput label="presentation='native'" description="Native picker wherever input type=time is compatible" value={value} onChange={setValue} presentation="native" />
        <TimeInput label="presentation='adaptive-bottom-sheet'" description="Astryx bottom sheet on a coarse primary pointer; Astryx typed field on a fine pointer" value={value} onChange={setValue} presentation="adaptive-bottom-sheet" />
        <TimeInput label="presentation='text-input'" description="Astryx typed field on every pointer type" value={value} onChange={setValue} presentation="text-input" />
      </div>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('14:30' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Time (24h)',
    hourFormat: '24h'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('14:30:45' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Precise time',
    hasSeconds: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('09:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Start time',
    hasClear: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Alarm time',
    description: 'When should we wake you up?',
    placeholder: 'Set alarm time'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Appointment time',
    min: '09:00' as ISOTimeString,
    max: '17:00' as ISOTimeString,
    description: 'Business hours: 9 AM - 5 PM',
    placeholder: 'Select appointment time'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('10:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Appointment time',
    presentation: 'bottom-sheet',
    min: '09:00' as ISOTimeString,
    max: '17:00' as ISOTimeString,
    description: 'Business hours: 9 AM - 5 PM'
  }
}`,...w.parameters?.docs?.source},description:{story:`The bottom-sheet wheels with bounds: hours outside 9 AM - 5 PM stay on the
wheel, greyed out, and a wheel that stops on one goes on to the nearest
hour inside the bounds.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('11:58' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Alarm',
    presentation: 'bottom-sheet'
  }
}`,...T.parameters?.docs?.source},description:{story:`The bottom-sheet wheels as iOS's date picker turns them: from 11:58 AM, one
row down on the hour gives 12:58 PM and the AM/PM column turns with it.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('09:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Time slot',
    increment: 15,
    description: 'Use arrow keys to change by 15 minutes'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Preferred time',
    isOptional: true,
    placeholder: 'Select a time (optional)'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Start time',
    isRequired: true,
    placeholder: 'Select a start time'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('10:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Locked time',
    isDisabled: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Start time',
    isDisabled: true,
    disabledMessage: 'You need the Editor role to change this'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>(undefined);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Time',
    size: 'sm',
    placeholder: 'Select a time'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('22:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event time',
    status: {
      type: 'error',
      message: 'Time must be during business hours'
    }
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('07:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time',
    status: {
      type: 'warning',
      message: 'Early morning meeting - are you sure?'
    }
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('10:00' as ISOTimeString);
    return <TimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Scheduled time',
    status: {
      type: 'success',
      message: 'Time slot is available'
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<ISOTimeString | undefined>(undefined);
    const [value2, setValue2] = useState<ISOTimeString | undefined>('14:30' as ISOTimeString);
    const [value3, setValue3] = useState<ISOTimeString | undefined>('09:15:30' as ISOTimeString);
    const [value4, setValue4] = useState<ISOTimeString | undefined>(undefined);
    const [value5, setValue5] = useState<ISOTimeString | undefined>(undefined);
    const [value6, setValue6] = useState<ISOTimeString | undefined>('10:00' as ISOTimeString);
    const [value7, setValue7] = useState<ISOTimeString | undefined>('22:00' as ISOTimeString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '300px'
    }}>
        <TimeInput label="Default (12h)" value={value1} onChange={setValue1} placeholder="Select a time" />
        <TimeInput label="24-hour format" value={value2} onChange={setValue2} hourFormat="24h" />
        <TimeInput label="With seconds" value={value3} onChange={setValue3} hasSeconds />
        <TimeInput label="With clear button" value={value4} onChange={setValue4} hasClear placeholder="Select a time" />
        <TimeInput label="With description" description="Pick your preferred time" value={value5} onChange={setValue5} placeholder="Select a time" />
        <TimeInput label="Disabled" isDisabled value={value6} onChange={setValue6} />
        <TimeInput label="With error" value={value7} onChange={setValue7} status={{
        type: 'error',
        message: 'Invalid time selection'
      }} />
      </div>;
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<ISOTimeString | undefined>('22:00' as ISOTimeString);
    const [b, setB] = useState<ISOTimeString | undefined>('22:00' as ISOTimeString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 280
    }}>
        <TimeInput label="Attached (default)" value={a} onChange={setA} status={{
        type: 'error',
        message: 'Must be during business hours'
      }} />
        <TimeInput label="Detached" value={b} onChange={setB} status={{
        type: 'error',
        message: 'Must be during business hours'
      }} statusVariant="detached" />
      </div>;
  }
}`,...I.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 360
  }}>
      <div style={{
      display: 'grid',
      gap: 12
    }}>
        <Text type="label">controlStyle</Text>
        <div data-parts-row="control-text-input" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="text-input"</Text>
          <TimeInput label="Start time" presentation="text-input" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-native" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="native"</Text>
          <TimeInput label="Start time" presentation="native" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-bottom-sheet" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="bottom-sheet"</Text>
          <TimeInput label="Start time" presentation="bottom-sheet" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <TimeInput label="Start time" controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
        <div data-parts-row="control-input-group" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">InputGroup</Text>
          <InputGroup label="Start time group">
            <InputGroupText>At</InputGroupText>
            <TimeInput label="Start time" isLabelHidden controlStyle={CONTROL_STYLE} />
          </InputGroup>
        </div>
      </div>
      <div style={{
      display: 'grid',
      gap: 12
    }}>
        <Text type="label">containerStyle and controlStyle</Text>
        <div data-parts-row="container-text-input" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="text-input"</Text>
          <TimeInput label="Start time" presentation="text-input" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="container-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <TimeInput label="Start time" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
        <div data-parts-row="container-input-group" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">InputGroup</Text>
          <InputGroup label="Start time group">
            <InputGroupText>At</InputGroupText>
            <TimeInput label="Start time" isLabelHidden containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
          </InputGroup>
        </div>
      </div>
    </div>
}`,...z.parameters?.docs?.source},description:{story:"Where each styling part lands (family:input-fields FR10). The dashed outline\nis `controlStyle` on the visual control box. The blue tint is\n`containerStyle` on the Field box; in a `horizontal-labels` FormLayout and\ninside InputGroup no Field box renders, so there it has no effect (and warns\nin development).",...z.parameters?.docs?.description}}},B=[`Default`,`WithValue`,`NativePickerModes`,`TwentyFourHourFormat`,`WithSeconds`,`WithClearButton`,`WithDescription`,`WithMinMax`,`BottomSheetWithMinMax`,`BottomSheetWheels`,`WithIncrement`,`Optional`,`Required`,`Disabled`,`DisabledWithMessage`,`SmallSize`,`WithErrorStatus`,`WithWarningStatus`,`WithSuccessStatus`,`AllVariations`,`StatusVariantComparison`,`StylingParts`]})))()}V();export{F as AllVariations,T as BottomSheetWheels,w as BottomSheetWithMinMax,g as Default,k as Disabled,A as DisabledWithMessage,v as NativePickerModes,D as Optional,O as Required,j as SmallSize,I as StatusVariantComparison,z as StylingParts,y as TwentyFourHourFormat,x as WithClearButton,S as WithDescription,M as WithErrorStatus,E as WithIncrement,C as WithMinMax,b as WithSeconds,P as WithSuccessStatus,_ as WithValue,N as WithWarningStatus,B as __namedExportsOrder,h as default};