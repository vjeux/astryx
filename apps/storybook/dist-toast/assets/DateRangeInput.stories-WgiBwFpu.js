import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./Text-C5BHw0wv.js";import{n as s,t as c}from"./DateRangeInput-CfcjqPqn.js";import{n as l,t as u}from"./FormLayout-CAcZ3H26.js";import{c as d,l as f,o as p,u as m}from"./iframe-B7UFaprG.js";function h(e){let t=new Date;return t.setDate(t.getDate()-e),t.toISOString().slice(0,10)}function g(){return new Date().toISOString().slice(0,10)}function _(){let e=new Date;return e.setDate(1),e.toISOString().slice(0,10)}function v({id:e,locale:t,calendar:n,label:r,dir:i}){let[a,s]=(0,y.useState)({start:`2026-10-30`,end:`2026-11-02`});return(0,b.jsx)(f,{locale:t,children:(0,b.jsxs)(`div`,{dir:i,lang:t,"data-calendar-field":e,style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,b.jsx)(c,{label:r,calendar:n,value:a,onChange:s,width:360}),(0,b.jsx)(o,{type:`supporting`,color:`secondary`,children:(0,b.jsx)(`code`,{"data-value":!0,children:`value: ${a==null?`—`:`${a.start} – ${a.end}`}`})})]})})}var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{y=t(),s(),l(),a(),d(),i(),m(),b=n(),x=[{label:`Last 1 day`,getRange:()=>({start:h(1),end:g()})},{label:`Last 3 days`,getRange:()=>({start:h(3),end:g()})},{label:`Last 7 days`,getRange:()=>({start:h(7),end:g()})},{label:`Last 14 days`,getRange:()=>({start:h(14),end:g()})},{label:`Last 30 days`,getRange:()=>({start:h(30),end:g()})},{label:`This month`,getRange:()=>({start:_(),end:g()})}],S={title:`Core/DateRangeInput`,component:c,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label`},placeholder:{control:`text`,description:`Placeholder text`},description:{control:`text`,description:`Description text`},isOptional:{control:`boolean`,description:`Show optional indicator`},isRequired:{control:`boolean`,description:`Mark as required`},isDisabled:{control:`boolean`,description:`Disable the picker`},disabledMessage:{control:`text`,description:`Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and describes the trigger (activation stays blocked). Use this instead of wrapping a disabled DateRangeInput in Tooltip.`},size:{control:`radio`,options:[`sm`,`md`,`lg`]},hasClear:{control:`boolean`,description:`Show clear button`},numberOfMonths:{control:`radio`,options:[1,2],description:`Calendar months`}}},C={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Date range`}},w={render:e=>{let[t,n]=(0,y.useState)({start:`2026-03-10`,end:`2026-03-20`});return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Report period`}},T={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Date range`,presets:x}},E={render:e=>{let[t,n]=(0,y.useState)({start:h(7),end:g()});return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Analytics period`,presets:x}},D={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Constrained analytics period`,presets:x,maxRangeSpan:1},play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},O={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Coverage period`,description:`Select the start and end dates for the report`}},k={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Booking dates`,min:`2026-03-01`,max:`2026-06-30`,description:`Available: Mar 1 – Jun 30, 2026`}},A={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Reporting period`,maxRangeSpan:7,description:`Pick a start date, then any end within a 7-day window`}},j={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Stay`,minRangeSpan:2,maxRangeSpan:30,description:`At least 2 and at most 30 days`}},M={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Filter by date`,isOptional:!0}},N={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Coverage period`,isRequired:!0}},P={render:e=>{let[t,n]=(0,y.useState)({start:`2026-03-10`,end:`2026-03-20`});return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Locked range`,isDisabled:!0}},F={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Reporting period`,isDisabled:!0,disabledMessage:`You need the Editor role to change this`}},I={render:()=>{let[e,t]=(0,y.useState)(null),[n,r]=(0,y.useState)(null),[i,a]=(0,y.useState)(null);return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`340px`},children:[(0,b.jsx)(c,{label:`Small (28px)`,value:e,onChange:t,size:`sm`}),(0,b.jsx)(c,{label:`Medium (32px)`,value:n,onChange:r,size:`md`}),(0,b.jsx)(c,{label:`Large (36px)`,value:i,onChange:a,size:`lg`})]})}},L={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Date range`,numberOfMonths:1}},R={render:e=>{let[t,n]=(0,y.useState)(null);return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Date range`,status:{type:`error`,message:`Please select a date range`}}},z={render:e=>{let[t,n]=(0,y.useState)({start:`2026-03-01`,end:`2026-06-30`});return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Date range`,status:{type:`warning`,message:`Range exceeds 90 days`}}},B={render:e=>{let[t,n]=(0,y.useState)({start:`2026-03-10`,end:`2026-03-20`});return(0,b.jsx)(c,{...e,value:t,onChange:n})},args:{label:`Required range`,hasClear:!1}},V={render:()=>{let[e,t]=(0,y.useState)(null),[n,r]=(0,y.useState)({start:`2026-03-10`,end:`2026-03-20`}),[i,a]=(0,y.useState)(null),[o,s]=(0,y.useState)({start:`2026-03-10`,end:`2026-03-20`}),[l,u]=(0,y.useState)(null);return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`340px`},children:[(0,b.jsx)(c,{label:`Default`,value:e,onChange:t}),(0,b.jsx)(c,{label:`With value`,value:n,onChange:r}),(0,b.jsx)(c,{label:`With presets`,value:i,onChange:a,presets:x}),(0,b.jsx)(c,{label:`Disabled`,isDisabled:!0,value:o,onChange:s}),(0,b.jsx)(c,{label:`With error`,value:l,onChange:u,status:{type:`error`,message:`Date range is required`}})]})}},H={render:()=>{let[e,t]=(0,y.useState)(null),[n,r]=(0,y.useState)(null);return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:320},children:[(0,b.jsx)(c,{label:`Attached (default)`,value:e,onChange:t,status:{type:`error`,message:`Please select a date range`}}),(0,b.jsx)(c,{label:`Detached`,value:n,onChange:r,status:{type:`error`,message:`Please select a date range`},statusVariant:`detached`})]})}},U=r({name:`date-range-input-icon-demo`,components:{"input-clear-icon":{base:{width:`12px`,height:`12px`,fontSize:`12px`,color:`var(--color-icon-secondary)`,":hover":{color:`var(--color-accent)`}}},"date-range-input-toggle-icon":{base:{width:`14px`,height:`14px`,fontSize:`14px`,color:`var(--color-accent)`}}}}),W={render:()=>{let[e,t]=(0,y.useState)({start:h(7),end:g()});return(0,b.jsx)(p,{theme:U,mode:`light`,children:(0,b.jsx)(`div`,{style:{width:320},children:(0,b.jsx)(c,{label:`Icons themed (12px clear w/ hover, 14px accent toggle)`,value:e,onChange:t,hasClear:!0})})})}},G=()=>{},K={outline:`2px dashed #c800ff`,outlineOffset:3},q={backgroundColor:`rgba(0, 150, 255, 0.16)`,padding:8,borderRadius:8},J={render:()=>(0,b.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:360},children:[(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,b.jsx)(o,{type:`label`,children:`controlStyle`}),(0,b.jsxs)(`div`,{"data-parts-row":`control-standalone`,style:{display:`grid`,gap:4},children:[(0,b.jsx)(o,{type:`supporting`,children:`Standalone`}),(0,b.jsx)(c,{value:null,onChange:G,label:`Stay`,controlStyle:K})]}),(0,b.jsxs)(`div`,{"data-parts-row":`control-form-layout`,style:{display:`grid`,gap:4},children:[(0,b.jsx)(o,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,b.jsx)(u,{direction:`horizontal-labels`,children:(0,b.jsx)(c,{value:null,onChange:G,label:`Stay`,controlStyle:K})})]})]}),(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,b.jsx)(o,{type:`label`,children:`containerStyle and controlStyle`}),(0,b.jsxs)(`div`,{"data-parts-row":`container-standalone`,style:{display:`grid`,gap:4},children:[(0,b.jsx)(o,{type:`supporting`,children:`Standalone`}),(0,b.jsx)(c,{value:null,onChange:G,label:`Stay`,containerStyle:q,controlStyle:K})]}),(0,b.jsxs)(`div`,{"data-parts-row":`container-form-layout`,style:{display:`grid`,gap:4},children:[(0,b.jsx)(o,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,b.jsx)(u,{direction:`horizontal-labels`,children:(0,b.jsx)(c,{value:null,onChange:G,label:`Stay`,containerStyle:q,controlStyle:K})})]})]})]})},Y=[{id:`en-persian`,locale:`en`,calendar:`persian`,label:`Stay`,dir:`ltr`},{id:`fa-persian`,locale:`fa-IR`,calendar:`persian`,label:`اقامت`,dir:`rtl`},{id:`he-hebrew`,locale:`he`,calendar:`hebrew`,label:`שהייה`,dir:`rtl`},{id:`th-buddhist`,locale:`th-TH`,calendar:`buddhist`,label:`การเข้าพัก`,dir:`ltr`}],X={render:()=>(0,b.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:Y.map(e=>(0,b.jsx)(v,{...e},e.id))})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date range'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>({
      start: '2026-03-10' as ISODateString,
      end: '2026-03-20' as ISODateString
    });
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Report period'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date range',
    presets: defaultPresets
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>({
      start: daysAgo(7),
      end: today()
    });
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Analytics period',
    presets: defaultPresets
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Constrained analytics period',
    presets: defaultPresets,
    maxRangeSpan: 1
  },
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Coverage period',
    description: 'Select the start and end dates for the report'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Booking dates',
    min: '2026-03-01' as ISODateString,
    max: '2026-06-30' as ISODateString,
    description: 'Available: Mar 1 – Jun 30, 2026'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Reporting period',
    maxRangeSpan: 7,
    description: 'Pick a start date, then any end within a 7-day window'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Stay',
    minRangeSpan: 2,
    maxRangeSpan: 30,
    description: 'At least 2 and at most 30 days'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Filter by date',
    isOptional: true
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Coverage period',
    isRequired: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>({
      start: '2026-03-10' as ISODateString,
      end: '2026-03-20' as ISODateString
    });
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Locked range',
    isDisabled: true
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Reporting period',
    isDisabled: true,
    disabledMessage: 'You need the Editor role to change this'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sm, setSm] = useState<DateRange | null>(null);
    const [md, setMd] = useState<DateRange | null>(null);
    const [lg, setLg] = useState<DateRange | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '340px'
    }}>
        <DateRangeInput label="Small (28px)" value={sm} onChange={setSm} size="sm" />
        <DateRangeInput label="Medium (32px)" value={md} onChange={setMd} size="md" />
        <DateRangeInput label="Large (36px)" value={lg} onChange={setLg} size="lg" />
      </div>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date range',
    numberOfMonths: 1
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>(null);
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date range',
    status: {
      type: 'error',
      message: 'Please select a date range'
    }
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>({
      start: '2026-03-01' as ISODateString,
      end: '2026-06-30' as ISODateString
    });
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date range',
    status: {
      type: 'warning',
      message: 'Range exceeds 90 days'
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DateRange | null>({
      start: '2026-03-10' as ISODateString,
      end: '2026-03-20' as ISODateString
    });
    return <DateRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Required range',
    hasClear: false
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [v1, setV1] = useState<DateRange | null>(null);
    const [v2, setV2] = useState<DateRange | null>({
      start: '2026-03-10' as ISODateString,
      end: '2026-03-20' as ISODateString
    });
    const [v3, setV3] = useState<DateRange | null>(null);
    const [v4, setV4] = useState<DateRange | null>({
      start: '2026-03-10' as ISODateString,
      end: '2026-03-20' as ISODateString
    });
    const [v5, setV5] = useState<DateRange | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '340px'
    }}>
        <DateRangeInput label="Default" value={v1} onChange={setV1} />
        <DateRangeInput label="With value" value={v2} onChange={setV2} />
        <DateRangeInput label="With presets" value={v3} onChange={setV3} presets={defaultPresets} />
        <DateRangeInput label="Disabled" isDisabled value={v4} onChange={setV4} />
        <DateRangeInput label="With error" value={v5} onChange={setV5} status={{
        type: 'error',
        message: 'Date range is required'
      }} />
      </div>;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<DateRange | null>(null);
    const [b, setB] = useState<DateRange | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 320
    }}>
        <DateRangeInput label="Attached (default)" value={a} onChange={setA} status={{
        type: 'error',
        message: 'Please select a date range'
      }} />
        <DateRangeInput label="Detached" value={b} onChange={setB} status={{
        type: 'error',
        message: 'Please select a date range'
      }} statusVariant="detached" />
      </div>;
  }
}`,...H.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<DateRange | null>({
      start: daysAgo(7),
      end: today()
    });
    return <Theme theme={iconTheme} mode="light">
        <div style={{
        width: 320
      }}>
          <DateRangeInput label="Icons themed (12px clear w/ hover, 14px accent toggle)" value={value} onChange={setValue} hasClear />
        </div>
      </Theme>;
  }
}`,...W.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
        <div data-parts-row="control-standalone" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">Standalone</Text>
          <DateRangeInput value={null} onChange={noop} label="Stay" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <DateRangeInput value={null} onChange={noop} label="Stay" controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
      </div>
      <div style={{
      display: 'grid',
      gap: 12
    }}>
        <Text type="label">containerStyle and controlStyle</Text>
        <div data-parts-row="container-standalone" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">Standalone</Text>
          <DateRangeInput value={null} onChange={noop} label="Stay" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="container-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <DateRangeInput value={null} onChange={noop} label="Stay" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
      </div>
    </div>
}`,...J.parameters?.docs?.source},description:{story:"Where each styling part lands (family:input-fields FR10). The dashed outline\nis `controlStyle` on the visual control box. The blue tint is\n`containerStyle` on the Field box; in a `horizontal-labels` FormLayout and\ninside InputGroup no Field box renders, so there it has no effect (and warns\nin development).",...J.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      {RANGE_CALENDAR_FIELDS.map(field => <RangeCalendarField key={field.id} {...field} />)}
    </div>
}`,...X.parameters?.docs?.source},description:{story:"`calendar` sets the calendar the trigger text and the popover calendar\nshow. The range stays Gregorian ISO dates. Calendars other than Gregorian,\nBuddhist, Minguo, and Japanese need `Temporal`.",...X.parameters?.docs?.description}}},Z=[`Default`,`WithValue`,`WithPresets`,`WithPresetsAndValue`,`WithDisabledPresets`,`WithDescription`,`WithMinMax`,`MaxRangeSpan`,`RangeSpanBounds`,`Optional`,`Required`,`Disabled`,`DisabledWithMessage`,`SizeVariants`,`SingleMonth`,`WithErrorStatus`,`WithWarningStatus`,`NoClear`,`AllVariations`,`StatusVariantComparison`,`ThemedIcons`,`StylingParts`,`CalendarSystems`]})))()}Q();export{V as AllVariations,X as CalendarSystems,C as Default,P as Disabled,F as DisabledWithMessage,A as MaxRangeSpan,B as NoClear,M as Optional,j as RangeSpanBounds,N as Required,L as SingleMonth,I as SizeVariants,H as StatusVariantComparison,J as StylingParts,W as ThemedIcons,O as WithDescription,D as WithDisabledPresets,R as WithErrorStatus,k as WithMinMax,T as WithPresets,E as WithPresetsAndValue,w as WithValue,z as WithWarningStatus,Z as __namedExportsOrder,S as default};