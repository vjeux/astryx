import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./Text-C5BHw0wv.js";import{n as s,t as c}from"./DateTimeInput-CXwQ-UhV.js";import{n as l,t as u}from"./FormLayout-CAcZ3H26.js";import{c as d,l as f,o as p,u as ee}from"./iframe-B7UFaprG.js";function m(){let[e,t]=(0,h.useState)(`2026-11-02T09:30`);return(0,g.jsx)(f,{locale:`en`,calendar:`persian`,children:(0,g.jsxs)(`div`,{"data-calendar-field":`en-persian`,style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,g.jsx)(c,{label:`Appointment`,value:e,onChange:t}),(0,g.jsx)(o,{type:`supporting`,color:`secondary`,children:(0,g.jsx)(`code`,{"data-value":!0,children:`value: ${e??`—`}`})})]})})}var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{h=t(),s(),l(),a(),d(),i(),ee(),g=n(),{expect:_,userEvent:v,waitFor:y,within:b}=__STORYBOOK_MODULE_TEST__,x={title:`Core/DateTimeInput`,component:c,tags:[`autodocs`],parameters:{docs:{description:{component:`A date-time field that fits the pointer it is used with. On a mouse or trackpad it renders the existing side-by-side date and time inputs: the date half opens a calendar popover, and the time half accepts typed entry plus optional preset times.

Where the primary pointer is a finger (\`pointer: coarse\`), the closed control still renders separate Date and Time segments; tapping either segment opens a bottom sheet directly to the matching section. A segmented Date/Time pill stays at the top of the sheet for switching; Date reuses Astryx's custom swipable month picker and month/year wheels, its Save date action advances to Time, and Time uses accessible hour/minute/second wheels with the final Save action. The public props are the same on both surfaces.

**Seeing the touch surface:** open any story on a phone/tablet or in device emulation reporting a coarse pointer. No separate story is needed because the same component chooses the surface at runtime.`}}},argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},placeholder:{control:`text`,description:`Placeholder text`},description:{control:`text`,description:`Description text displayed between the label and input`},isOptional:{control:`boolean`,description:`Whether the field is optional (mutually exclusive with isRequired)`},isRequired:{control:`boolean`,description:`Whether the field is required (mutually exclusive with isOptional)`},isDisabled:{control:`boolean`,description:`Whether the input is disabled`},disabledMessage:{control:`text`,description:`Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and describes the fields (activation stays blocked). Use this instead of wrapping a disabled DateTimeInput in Tooltip.`},size:{control:`radio`,options:[`sm`,`md`,`lg`]},hourFormat:{control:`radio`,options:[`12h`,`24h`],description:`Hour format for display`},hasSeconds:{control:`boolean`,description:`Whether to include seconds in the time`},hasClear:{control:`boolean`,description:`Whether to show a clear button`},presentation:{control:`select`,options:[`popover`,`bottom-sheet`,`native`,`adaptive-bottom-sheet`,`adaptive-native`],description:`Which surfaces draw the pickers (spec:AST-043); nativePicker is deprecated`},nativePicker:{control:`radio`,options:[`touch`,`always`,`never`],description:`Deprecated — use presentation ('touch' → 'adaptive-native', 'always' → 'native', 'never' → 'adaptive-bottom-sheet'); presentation wins when both are set`},numberOfMonths:{control:`radio`,options:[1,2],description:`Number of months to display in calendar`},timeIncrement:{control:`number`,description:`Desktop only: minutes to increment/decrement with arrow keys. Mobile touch uses wheels.`}}},S={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Meeting time`,placeholder:`Select a date`}},C={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T14:30`);return(0,g.jsx)(`div`,{style:{width:`320px`,maxWidth:`100%`},children:(0,g.jsx)(c,{...e,value:t,onChange:n})})},args:{label:`Meeting time`,hasClear:!0}},w={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T14:30`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Event time`}},T={render:()=>{let[e,t]=(0,h.useState)(`2026-03-15T14:30`);return(0,g.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,g.jsx)(c,{label:`presentation='adaptive-native' (default)`,description:`Native date and compatible time controls on a coarse primary pointer`,value:e,onChange:t,presentation:`adaptive-native`}),(0,g.jsx)(c,{label:`presentation='native'`,description:`Native date and compatible time controls on every pointer type`,value:e,onChange:t,presentation:`native`}),(0,g.jsx)(c,{label:`presentation='adaptive-bottom-sheet'`,description:`Astryx bottom sheet on coarse pointers; calendar popover on fine pointers`,value:e,onChange:t,presentation:`adaptive-bottom-sheet`})]})}},E={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T14:30`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Appointment`,hourFormat:`24h`}},D={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T14:30:45`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Log timestamp`,hasSeconds:!0}},O={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Deadline`,description:`When is this task due?`,placeholder:`Select deadline`}},k={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T09:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Start time`,hasClear:!0}},A={tags:[`visual-baseline`],render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T09:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Meeting time`,hasClear:!0,min:`2026-03-01T00:00`,max:`2026-03-31T23:59`,presentation:`popover`},play:async({canvasElement:e})=>{let t=b(e);await v.click(t.getByRole(`button`,{name:`Open calendar`})),await v.click(t.getByRole(`button`,{name:/March 20, 2026/})),await v.click(t.getByRole(`button`,{name:`Clear Meeting time`})),await v.click(t.getByRole(`button`,{name:`Open calendar`})),await y(()=>{_(t.queryAllByRole(`gridcell`,{selected:!0,hidden:!0})).toHaveLength(0)})}},j={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Appointment`,min:`2026-03-15T09:00`,max:`2026-03-15T17:00`,description:`Available: Mar 15, 9 AM - 5 PM`}},M={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T09:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Time slot`,timeIncrement:15,description:`Use arrow keys to change by 15 minutes`}},N={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T09:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Meeting time`,timeOptionInterval:30,description:`Pick from half-hour slots, or type any time`}},P={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T13:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Office hours`,timeOptionInterval:60,min:`2026-03-15T09:00`,max:`2026-03-15T17:00`,description:`Hourly slots, trimmed to 9 AM - 5 PM`}},F={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Preferred time`,isOptional:!0,placeholder:`Select a date (optional)`}},I={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Start time`,isRequired:!0}},L={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T10:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Locked time`,isDisabled:!0}},R={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Meeting time`,isDisabled:!0,disabledMessage:`You need the Editor role to change this`}},z={render:()=>{let[e,t]=(0,h.useState)(void 0),[n,r]=(0,h.useState)(void 0),[i,a]=(0,h.useState)(void 0);return(0,g.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`460px`},children:[(0,g.jsx)(c,{label:`Small (28px)`,value:e,onChange:t,placeholder:`Small size`,size:`sm`}),(0,g.jsx)(c,{label:`Medium (32px)`,value:n,onChange:r,placeholder:`Medium size (default)`,size:`md`}),(0,g.jsx)(c,{label:`Large (36px)`,value:i,onChange:a,placeholder:`Large size`,size:`lg`})]})}},B={render:e=>{let[t,n]=(0,h.useState)(void 0);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Travel departure`,numberOfMonths:2,presentation:`adaptive-bottom-sheet`}},V={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T14:30`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Event time`,status:{type:`error`,message:`This time slot is not available`}}},H={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T07:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Meeting time`,status:{type:`warning`,message:`Early morning meeting - are you sure?`}}},U={render:e=>{let[t,n]=(0,h.useState)(`2026-03-15T10:00`);return(0,g.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Scheduled time`,status:{type:`success`,message:`Time slot is available`}}},W={render:()=>{let[e,t]=(0,h.useState)(void 0),[n,r]=(0,h.useState)(`2026-03-15T14:30`),[i,a]=(0,h.useState)(`2026-03-15T14:30`),[o,s]=(0,h.useState)(void 0),[l,u]=(0,h.useState)(`2026-03-15T10:00`),[d,f]=(0,h.useState)(`2026-03-15T22:00`);return(0,g.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`460px`},children:[(0,g.jsx)(c,{label:`Default`,value:e,onChange:t,placeholder:`Select a date`}),(0,g.jsx)(c,{label:`With value (12h)`,value:n,onChange:r}),(0,g.jsx)(c,{label:`24-hour format`,value:i,onChange:a,hourFormat:`24h`}),(0,g.jsx)(c,{label:`With description`,description:`Pick your preferred datetime`,value:o,onChange:s}),(0,g.jsx)(c,{label:`Disabled`,isDisabled:!0,value:l,onChange:u}),(0,g.jsx)(c,{label:`With error`,value:d,onChange:f,status:{type:`error`,message:`Invalid datetime selection`}})]})}},G=r({name:`date-time-input-segments-demo`,components:{"date-time-input-date-segment":{base:{borderColor:`var(--color-accent)`}},"date-time-input-time-segment":{base:{backgroundColor:`var(--color-background-muted)`}}}}),K={render:()=>{let[e,t]=(0,h.useState)();return(0,g.jsx)(p,{theme:G,mode:`light`,children:(0,g.jsx)(c,{label:`Themed segments`,description:`Date segment gets an accent border; time segment a muted fill.`,value:e,onChange:t})})}},q=()=>{},J={outline:`2px dashed #c800ff`,outlineOffset:3},Y={backgroundColor:`rgba(0, 150, 255, 0.16)`,padding:8,borderRadius:8},X={render:()=>(0,g.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:360},children:[(0,g.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,g.jsx)(o,{type:`label`,children:`controlStyle`}),(0,g.jsxs)(`div`,{"data-parts-row":`control-popover`,style:{display:`grid`,gap:4},children:[(0,g.jsx)(o,{type:`supporting`,children:`presentation="popover"`}),(0,g.jsx)(c,{onChange:q,label:`Starts`,presentation:`popover`,controlStyle:J})]}),(0,g.jsxs)(`div`,{"data-parts-row":`control-native`,style:{display:`grid`,gap:4},children:[(0,g.jsx)(o,{type:`supporting`,children:`presentation="native"`}),(0,g.jsx)(c,{onChange:q,label:`Starts`,presentation:`native`,controlStyle:J})]}),(0,g.jsxs)(`div`,{"data-parts-row":`control-bottom-sheet`,style:{display:`grid`,gap:4},children:[(0,g.jsx)(o,{type:`supporting`,children:`presentation="bottom-sheet"`}),(0,g.jsx)(c,{onChange:q,label:`Starts`,presentation:`bottom-sheet`,controlStyle:J})]}),(0,g.jsxs)(`div`,{"data-parts-row":`control-form-layout`,style:{display:`grid`,gap:4},children:[(0,g.jsx)(o,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,g.jsx)(u,{direction:`horizontal-labels`,children:(0,g.jsx)(c,{onChange:q,label:`Starts`,controlStyle:J})})]})]}),(0,g.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,g.jsx)(o,{type:`label`,children:`containerStyle and controlStyle`}),(0,g.jsxs)(`div`,{"data-parts-row":`container-popover`,style:{display:`grid`,gap:4},children:[(0,g.jsx)(o,{type:`supporting`,children:`presentation="popover"`}),(0,g.jsx)(c,{onChange:q,label:`Starts`,presentation:`popover`,containerStyle:Y,controlStyle:J})]}),(0,g.jsxs)(`div`,{"data-parts-row":`container-form-layout`,style:{display:`grid`,gap:4},children:[(0,g.jsx)(o,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,g.jsx)(u,{direction:`horizontal-labels`,children:(0,g.jsx)(c,{onChange:q,label:`Starts`,containerStyle:Y,controlStyle:J})})]})]})]})},Z={render:()=>(0,g.jsx)(m,{})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time',
    placeholder: 'Select a date'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    return <div style={{
      width: '320px',
      maxWidth: '100%'
    }}>
        <DateTimeInput {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    label: 'Meeting time',
    hasClear: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event time'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <DateTimeInput label="presentation='adaptive-native' (default)" description="Native date and compatible time controls on a coarse primary pointer" value={value} onChange={setValue} presentation="adaptive-native" />
        <DateTimeInput label="presentation='native'" description="Native date and compatible time controls on every pointer type" value={value} onChange={setValue} presentation="native" />
        <DateTimeInput label="presentation='adaptive-bottom-sheet'" description="Astryx bottom sheet on coarse pointers; calendar popover on fine pointers" value={value} onChange={setValue} presentation="adaptive-bottom-sheet" />
      </div>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Appointment',
    hourFormat: '24h'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T14:30:45' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Log timestamp',
    hasSeconds: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Deadline',
    description: 'When is this task due?',
    placeholder: 'Select deadline'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T09:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Start time',
    hasClear: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  tags: ['visual-baseline'],
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T09:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time',
    hasClear: true,
    min: '2026-03-01T00:00' as ISODateTimeString,
    max: '2026-03-31T23:59' as ISODateTimeString,
    presentation: 'popover'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open calendar'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: /March 20, 2026/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Clear Meeting time'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open calendar'
    }));
    await waitFor(() => {
      expect(canvas.queryAllByRole('gridcell', {
        selected: true,
        hidden: true
      })).toHaveLength(0);
    });
  }
}`,...A.parameters?.docs?.source},description:{story:`Selects a date, clears the controlled value, and reopens the calendar. The
final frame is the regression endpoint: an empty field with no selected day.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Appointment',
    min: '2026-03-15T09:00' as ISODateTimeString,
    max: '2026-03-15T17:00' as ISODateTimeString,
    description: 'Available: Mar 15, 9 AM - 5 PM'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T09:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Time slot',
    timeIncrement: 15,
    description: 'Use arrow keys to change by 15 minutes'
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T09:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time',
    timeOptionInterval: 30,
    description: 'Pick from half-hour slots, or type any time'
  }
}`,...N.parameters?.docs?.source},description:{story:`\`timeOptionInterval\` turns the time field into a combobox over a list of
preset times at that cadence. Click the time field or press Alt+ArrowDown to
open it; ArrowUp/ArrowDown move through the list, Enter picks, Escape closes.

The list is a shortcut, not a restriction — a time between two options can
still be typed, and with the list closed the arrow keys keep stepping by
\`timeIncrement\` exactly as they do without this prop.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T13:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Office hours',
    timeOptionInterval: 60,
    min: '2026-03-15T09:00' as ISODateTimeString,
    max: '2026-03-15T17:00' as ISODateTimeString,
    description: 'Hourly slots, trimmed to 9 AM - 5 PM'
  }
}`,...P.parameters?.docs?.source},description:{story:"An hourly list — the 12 AM to 11 PM shape most scheduling flows want.\n`min` and `max` trim the list on the boundary date, so only bookable hours\nare offered.",...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Preferred time',
    isOptional: true,
    placeholder: 'Select a date (optional)'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Start time',
    isRequired: true
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T10:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Locked time',
    isDisabled: true
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time',
    isDisabled: true,
    disabledMessage: 'You need the Editor role to change this'
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sm, setSm] = useState<ISODateTimeString | undefined>(undefined);
    const [md, setMd] = useState<ISODateTimeString | undefined>(undefined);
    const [lg, setLg] = useState<ISODateTimeString | undefined>(undefined);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '460px'
    }}>
        <DateTimeInput label="Small (28px)" value={sm} onChange={setSm} placeholder="Small size" size="sm" />
        <DateTimeInput label="Medium (32px)" value={md} onChange={setMd} placeholder="Medium size (default)" size="md" />
        <DateTimeInput label="Large (36px)" value={lg} onChange={setLg} placeholder="Large size" size="lg" />
      </div>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Travel departure',
    numberOfMonths: 2,
    presentation: 'adaptive-bottom-sheet'
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event time',
    status: {
      type: 'error',
      message: 'This time slot is not available'
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T07:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting time',
    status: {
      type: 'warning',
      message: 'Early morning meeting - are you sure?'
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateTimeString | undefined>('2026-03-15T10:00' as ISODateTimeString);
    return <DateTimeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Scheduled time',
    status: {
      type: 'success',
      message: 'Time slot is available'
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<ISODateTimeString | undefined>(undefined);
    const [value2, setValue2] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    const [value3, setValue3] = useState<ISODateTimeString | undefined>('2026-03-15T14:30' as ISODateTimeString);
    const [value4, setValue4] = useState<ISODateTimeString | undefined>(undefined);
    const [value5, setValue5] = useState<ISODateTimeString | undefined>('2026-03-15T10:00' as ISODateTimeString);
    const [value6, setValue6] = useState<ISODateTimeString | undefined>('2026-03-15T22:00' as ISODateTimeString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '460px'
    }}>
        <DateTimeInput label="Default" value={value1} onChange={setValue1} placeholder="Select a date" />
        <DateTimeInput label="With value (12h)" value={value2} onChange={setValue2} />
        <DateTimeInput label="24-hour format" value={value3} onChange={setValue3} hourFormat="24h" />
        <DateTimeInput label="With description" description="Pick your preferred datetime" value={value4} onChange={setValue4} />
        <DateTimeInput label="Disabled" isDisabled value={value5} onChange={setValue5} />
        <DateTimeInput label="With error" value={value6} onChange={setValue6} status={{
        type: 'error',
        message: 'Invalid datetime selection'
      }} />
      </div>;
  }
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<ISODateTimeString | undefined>();
    return <Theme theme={segmentTheme} mode="light">
        <DateTimeInput label="Themed segments" description="Date segment gets an accent border; time segment a muted fill." value={value} onChange={setValue} />
      </Theme>;
  }
}`,...K.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
        <div data-parts-row="control-popover" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="popover"</Text>
          <DateTimeInput onChange={noop} label="Starts" presentation="popover" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-native" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="native"</Text>
          <DateTimeInput onChange={noop} label="Starts" presentation="native" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-bottom-sheet" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="bottom-sheet"</Text>
          <DateTimeInput onChange={noop} label="Starts" presentation="bottom-sheet" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <DateTimeInput onChange={noop} label="Starts" controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
      </div>
      <div style={{
      display: 'grid',
      gap: 12
    }}>
        <Text type="label">containerStyle and controlStyle</Text>
        <div data-parts-row="container-popover" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="popover"</Text>
          <DateTimeInput onChange={noop} label="Starts" presentation="popover" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="container-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <DateTimeInput onChange={noop} label="Starts" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
      </div>
    </div>
}`,...X.parameters?.docs?.source},description:{story:"Where each styling part lands (family:input-fields FR10). The dashed outline\nis `controlStyle` on the visual control box. The blue tint is\n`containerStyle` on the Field box; in a `horizontal-labels` FormLayout and\ninside InputGroup no Field box renders, so there it has no effect (and warns\nin development).",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <PersianDateTimeField />
}`,...Z.parameters?.docs?.source},description:{story:`In a calendar other than Gregorian, DateTimeInput never shows native date
and time controls: it opens the popovers on a mouse and the bottom sheet on
a touch screen, whose Date panel shows months of the calendar. The value
stays a Gregorian ISO date-time.`,...Z.parameters?.docs?.description}}},Q=`Default.NarrowContainer.WithValue.NativePickerModes.TwentyFourHourFormat.WithSeconds.WithDescription.WithClearButton.ClearedCalendarSelection.WithMinMax.WithTimeIncrement.WithTimeOptions.WithHourlyTimeOptions.Optional.Required.Disabled.DisabledWithMessage.SizeVariants.TwoMonthCalendar.WithErrorStatus.WithWarningStatus.WithSuccessStatus.AllVariations.ThemedSegments.StylingParts.CalendarSystems`.split(`.`)})))()}$();export{W as AllVariations,Z as CalendarSystems,A as ClearedCalendarSelection,S as Default,L as Disabled,R as DisabledWithMessage,C as NarrowContainer,T as NativePickerModes,F as Optional,I as Required,z as SizeVariants,X as StylingParts,K as ThemedSegments,E as TwentyFourHourFormat,B as TwoMonthCalendar,k as WithClearButton,O as WithDescription,V as WithErrorStatus,P as WithHourlyTimeOptions,j as WithMinMax,D as WithSeconds,U as WithSuccessStatus,M as WithTimeIncrement,N as WithTimeOptions,w as WithValue,H as WithWarningStatus,Q as __namedExportsOrder,x as default};