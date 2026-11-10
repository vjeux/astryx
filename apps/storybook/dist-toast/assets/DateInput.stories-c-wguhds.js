import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{i as n,n as r,r as i,t as a}from"./LayoutContent-BEmJ3Yl2.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{o as s,s as c}from"./useTheme-CUotWZgR.js";import{n as l,t as u}from"./Text-C5BHw0wv.js";import{n as d,t as f}from"./InputGroup-BWTkP6pA.js";import{n as ee,t as te}from"./InputGroupText-Dko_Ilc1.js";import{n as ne,t as p}from"./DateInput-CHI86NkI.js";import{n as re,t as m}from"./FormLayout-CAcZ3H26.js";import{c as ie,l as h,o as ae,u as oe}from"./iframe-B7UFaprG.js";function se({locale:e,calendar:t,label:n,dir:r,min:i,max:a}){let[o,s]=(0,g.useState)(`2026-11-02`);return(0,_.jsx)(h,{locale:e,children:(0,_.jsxs)(`div`,{dir:r,lang:e,"data-calendar-field":`${e}-${t}`,style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,_.jsx)(p,{label:n,calendar:t,value:o,onChange:s,min:i,max:a,width:320}),(0,_.jsx)(u,{type:`supporting`,color:`secondary`,children:(0,_.jsx)(`code`,{"data-value":!0,children:`value: ${o??`—`}`})})]})})}function ce({id:e,locale:t,calendar:n,label:r,dir:i,value:a,min:o,max:s,presentation:c}){let[l,d]=(0,g.useState)(a);return(0,_.jsx)(h,{locale:t,children:(0,_.jsxs)(`div`,{dir:i,lang:t,"data-calendar-field":e,style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,_.jsx)(p,{label:r,calendar:n,value:l,onChange:d,min:o,max:s,presentation:c,width:320}),(0,_.jsx)(u,{type:`supporting`,color:`secondary`,children:(0,_.jsx)(`code`,{"data-value":!0,children:`value: ${l??`—`}`})})]})})}var g,_,v,y,le,ue,de,b,x,S,C,w,fe,T,pe,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,me,q,he,J,Y,X,Z,Q,$,ge;function _e(){return(_e=e((()=>{g=t(),ne(),re(),l(),d(),ee(),n(),r(),ie(),c(),oe(),_=o(),{expect:v,userEvent:y,waitFor:le,within:ue}=__STORYBOOK_MODULE_TEST__,de={title:`Core/DateInput`,component:p,tags:[`autodocs`],parameters:{docs:{description:{component:`A date field that fits the pointer it is used with. Every story below shows the pointer surface — a text input you can type into with a calendar in a popover — because that is the right answer for the mouse you are reading this with.

Where the primary pointer is a finger (\`pointer: coarse\`), the same component renders a picker built for one instead: a bottom sheet of months swiped sideways, with month and year wheels behind the header title, and no text entry (the keyboard would cover the sheet it is meant to fill in). Same props either way — there is nothing to opt into.

**Seeing the touch surface:** open any story below on a phone or tablet, or in a device-emulated tab reporting a coarse pointer. Every one of them renders it — they are the same stories, and that is the point. There is no separate touch story because there is no separate thing to adopt.`}}},argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},placeholder:{control:`text`,description:`Placeholder text`},description:{control:`text`,description:`Description text displayed between the label and input`},isOptional:{control:`boolean`,description:`Whether the field is optional (mutually exclusive with isRequired)`},isRequired:{control:`boolean`,description:`Whether the field is required (mutually exclusive with isOptional)`},isDisabled:{control:`boolean`,description:`Whether the input is disabled`},disabledMessage:{control:`text`,description:`Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and describes the focusable controls of the field (activation stays blocked). Use this instead of wrapping a disabled DateInput in Tooltip.`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Size of the input`},numberOfMonths:{control:`radio`,options:[1,2],description:`Number of months to display in calendar`},weekStartsOn:{control:`select`,options:[0,1,2,3,4,5,6,`sun`,`mon`,`tue`,`wed`,`thu`,`fri`,`sat`],description:`First day of week in the calendar popover (0 = Sunday, or a three-letter day name)`},format:{control:`select`,options:[`date_long`,`date`,`date_weekday`,`system_date`],description:`Display format for the committed value, reusing Timestamp's vocabulary. Defaults to 'date_long' (long-month date).`},presentation:{control:`select`,options:[`popover`,`bottom-sheet`,`native`,`adaptive-bottom-sheet`,`adaptive-native`],description:`Which surface draws the picker (spec:AST-043); nativePicker is deprecated`},nativePicker:{control:`radio`,options:[`touch`,`always`,`never`],description:`Deprecated — use presentation ('touch' → 'adaptive-native', 'always' → 'native', 'never' → 'adaptive-bottom-sheet'); presentation wins when both are set`}}},b={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Date`,placeholder:`Select a date`}},x={render:e=>{let[t,n]=(0,g.useState)(`2026-01-25`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Event date`}},S={tags:[`!autodocs`],render:e=>{let[t,n]=(0,g.useState)(void 0),[r,i]=(0,g.useState)([]);return(0,_.jsxs)(h,{locale:`en-GB`,children:[(0,_.jsx)(p,{...e,value:t,onChange:e=>{n(e),i(t=>[...t,String(e)])}}),(0,_.jsx)(u,{"data-testid":`reported`,children:r.join(`, `)})]})},args:{label:`Start date`}},C={name:`Week starts on Monday`,render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Date`,placeholder:`Select a date`,weekStartsOn:`mon`}},w={render:()=>{let[e,t]=(0,g.useState)(`2026-03-21`);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,_.jsx)(p,{label:`Default (format='date_long')`,value:e,onChange:t}),(0,_.jsx)(p,{label:`format='date'`,value:e,onChange:t,format:`date`}),(0,_.jsx)(p,{label:`format='date_weekday'`,value:e,onChange:t,format:`date_weekday`}),(0,_.jsx)(p,{label:`format='system_date'`,value:e,onChange:t,format:`system_date`}),(0,_.jsx)(p,{label:`Custom function`,value:e,onChange:t,format:e=>new Intl.DateTimeFormat(`en-GB`,{dateStyle:`full`}).format(new Date(e+`T00:00`))})]})}},fe=[{locale:`fa-IR`,calendar:`persian`,label:`تاریخ شروع`,dir:`rtl`},{locale:`he`,calendar:`hebrew`,label:`תאריך התחלה`,dir:`rtl`},{locale:`ja-JP`,calendar:`japanese`,label:`開始日`,dir:`ltr`},{locale:`th-TH`,calendar:`buddhist`,label:`วันที่เริ่มต้น`,dir:`ltr`,min:`2020-01-01`,max:`2030-12-31`},{locale:`en`,calendar:`hebrew`,label:`Start date (Hebrew calendar)`,dir:`ltr`}],T={render:()=>(0,_.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:fe.map(e=>(0,_.jsx)(se,{...e},`${e.locale}-${e.calendar}`))})},pe=[{id:`fa-persian`,locale:`fa-IR`,calendar:`persian`,label:`تاریخ شروع`,dir:`rtl`,value:`2026-11-02`},{id:`en-persian-native`,locale:`en`,calendar:`persian`,label:`Start date (Persian, presentation="native")`,dir:`ltr`,value:`2026-11-02`,presentation:`native`},{id:`en-hebrew-leap`,locale:`en`,calendar:`hebrew`,label:`Start date (Hebrew, a leap year)`,dir:`ltr`,value:`2024-02-15`,min:`2020-01-01`,max:`2030-12-31`},{id:`ja-japanese`,locale:`ja-JP`,calendar:`japanese`,label:`開始日`,dir:`ltr`,value:`2026-11-02`,min:`2015-01-01`,max:`2030-12-31`},{id:`en-ethiopic-pagume`,locale:`en`,calendar:`ethiopic`,label:`Start date (Ethiopic, the thirteenth month)`,dir:`ltr`,value:`2026-09-08`},{id:`en-gregory`,locale:`en`,calendar:`gregory`,label:`Start date (Gregorian)`,dir:`ltr`,value:`2026-11-02`}],E={render:()=>(0,_.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:pe.map(e=>(0,_.jsx)(ce,{...e},e.id))})},D={name:`Native picker modes`,render:()=>{let[e,t]=(0,g.useState)(`2026-03-21`);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,_.jsx)(p,{label:`presentation='adaptive-native' (default)`,description:`Native picker on a coarse pointer; Astryx picker otherwise`,value:e,onChange:t,presentation:`adaptive-native`}),(0,_.jsx)(p,{label:`presentation='native'`,description:`Native picker wherever the browser supports it`,value:e,onChange:t,presentation:`native`}),(0,_.jsx)(p,{label:`presentation='adaptive-bottom-sheet'`,description:`Astryx picker on every pointer type`,value:e,onChange:t,presentation:`adaptive-bottom-sheet`})]})}},O={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Birthday`,description:`Enter your date of birth`,placeholder:`Select your birthday`}},k={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Date`,isLabelHidden:!0,placeholder:`Select a date`}},A={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Preferred date`,isOptional:!0,placeholder:`Select a date (optional)`}},j={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Start date`,isRequired:!0,placeholder:`Select a start date`}},M={render:e=>{let[t,n]=(0,g.useState)(`2026-01-25`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Locked date`,isDisabled:!0}},N={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Event date`,isDisabled:!0,disabledMessage:`You need the Editor role to change this`}},P={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Date`,size:`sm`,placeholder:`Select a date`}},F={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Booking date`,min:`2026-01-15`,max:`2026-02-15`,description:`Available dates: Jan 15 - Feb 15, 2026`,placeholder:`Select a booking date`}},I={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(i,{height:`auto`,content:(0,_.jsx)(a,{children:(0,_.jsx)(p,{...e,value:t,onChange:n})})})},args:{label:`End date`,max:new Date().toISOString().slice(0,10),description:`Max is today; open the calendar to verify the label does not turn grey when nav buttons are disabled`,placeholder:`Select an end date`}},L={render:e=>{let[t,n]=(0,g.useState)(void 0);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Travel date`,numberOfMonths:2,placeholder:`Select a travel date`}},R={render:e=>{let[t,n]=(0,g.useState)(`2026-01-25`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Event date`,status:{type:`error`,message:`This date is not available`}}},z={render:e=>{let[t,n]=(0,g.useState)(`2026-01-01`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Meeting date`,status:{type:`warning`,message:`This is a holiday - are you sure?`}}},B={render:e=>{let[t,n]=(0,g.useState)(`2026-02-10`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Appointment date`,status:{type:`success`,message:`Date is available`}}},V={tags:[`visual-theme-matrix`],render:e=>{let[t,n]=(0,g.useState)(`2026-01-25`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Appointment date`,presentation:`popover`},play:async({canvasElement:e})=>{let t=e.querySelector(`[role="combobox"]`);if(t==null)throw Error(`DateInput audit fixture is missing its combobox`);if(t.click(),await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e()))),t.getAttribute(`aria-expanded`)!==`true`)throw Error(`DateInput audit fixture did not open its calendar`);if(e.ownerDocument.querySelector(`[role="dialog"]`)==null)throw Error(`DateInput audit fixture rendered no Calendar dialog`)}},H={tags:[`visual-theme-matrix`],render:()=>{let[e,t]=(0,g.useState)(void 0),[n,r]=(0,g.useState)(`2026-01-25`),[i,a]=(0,g.useState)(void 0),[o,s]=(0,g.useState)(void 0),[c,l]=(0,g.useState)(void 0),[u,d]=(0,g.useState)(`2026-03-10`),[f,ee]=(0,g.useState)(`2026-01-25`);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`300px`},children:[(0,_.jsx)(p,{label:`Default`,value:e,onChange:t,placeholder:`Select a date`}),(0,_.jsx)(p,{label:`With value`,value:n,onChange:r}),(0,_.jsx)(p,{label:`With description`,description:`Pick your preferred date`,value:i,onChange:a,placeholder:`Select a date`}),(0,_.jsx)(p,{label:`Optional field`,isOptional:!0,value:o,onChange:s,placeholder:`Select a date (optional)`}),(0,_.jsx)(p,{label:`Required field`,isRequired:!0,value:c,onChange:l,placeholder:`Select a date`}),(0,_.jsx)(p,{label:`Disabled`,isDisabled:!0,value:u,onChange:d}),(0,_.jsx)(p,{label:`With error`,value:f,onChange:ee,status:{type:`error`,message:`Invalid date selection`}})]})}},U={render:e=>{let[t,n]=(0,g.useState)(`2026-04-06`);return(0,_.jsx)(p,{...e,value:t,onChange:n,hasClear:!0})},args:{label:`Event date`,placeholder:`Select a date`}},W={tags:[`visual-baseline`],render:e=>{let[t,n]=(0,g.useState)(`2026-04-06`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Event date`,hasClear:!0,min:`2026-04-01`,max:`2026-04-30`,presentation:`popover`},play:async({canvasElement:e})=>{let t=ue(e);await y.click(t.getByRole(`button`,{name:`Open calendar`})),await y.click(t.getByRole(`button`,{name:/April 15, 2026/})),await y.click(t.getByRole(`button`,{name:`Clear Event date`})),await v(t.getByRole(`combobox`)).toHaveValue(``),await y.click(t.getByRole(`button`,{name:`Open calendar`})),await le(()=>{v(t.queryAllByRole(`gridcell`,{selected:!0,hidden:!0})).toHaveLength(0)})}},G={render:e=>{let[t,n]=(0,g.useState)(`2026-04-06`);return(0,_.jsx)(p,{...e,value:t,onChange:n,hasClear:!0})},args:{label:`Deadline`,status:{type:`error`,message:`Date is in the past`}}},K={render:()=>{let[e,t]=(0,g.useState)(`2026-01-25`),[n,r]=(0,g.useState)(`2026-01-25`);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,_.jsx)(p,{label:`Attached (default)`,value:e,onChange:t,status:{type:`error`,message:`This date is not available`}}),(0,_.jsx)(p,{label:`Detached`,value:n,onChange:r,status:{type:`error`,message:`This date is not available`},statusVariant:`detached`})]})}},me=s({name:`input-clear-icon-demo`,components:{"input-clear-icon":{base:{width:`12px`,height:`12px`,fontSize:`12px`,color:`var(--color-icon-secondary)`,":hover":{color:`var(--color-accent)`}}}}}),q={render:()=>{let[e,t]=(0,g.useState)(`2026-01-25`);return(0,_.jsx)(ae,{theme:me,mode:`light`,children:(0,_.jsx)(p,{label:`Clear icon themed (12px, accent on hover)`,value:e,onChange:t,hasClear:!0})})}},he=s({name:`date-input-toggle-icon-demo`,components:{"date-input-toggle-icon":{base:{width:`14px`,height:`14px`,fontSize:`14px`,color:`var(--color-icon-secondary)`},"state:expanded":{color:`var(--color-accent)`}}}}),J={render:()=>{let[e,t]=(0,g.useState)(`2026-01-25`);return(0,_.jsx)(ae,{theme:he,mode:`light`,children:(0,_.jsx)(p,{label:`Calendar toggle icon themed (14px, accent when open)`,value:e,onChange:t})})}},Y={outline:`2px dashed #c800ff`,outlineOffset:3},X={backgroundColor:`rgba(0, 150, 255, 0.16)`,padding:8,borderRadius:8},Z={render:()=>(0,_.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:360},children:[(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,_.jsx)(u,{type:`label`,children:`controlStyle`}),(0,_.jsxs)(`div`,{"data-parts-row":`control-popover`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`presentation="popover"`}),(0,_.jsx)(p,{label:`Due date`,presentation:`popover`,controlStyle:Y})]}),(0,_.jsxs)(`div`,{"data-parts-row":`control-native`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`presentation="native"`}),(0,_.jsx)(p,{label:`Due date`,presentation:`native`,controlStyle:Y})]}),(0,_.jsxs)(`div`,{"data-parts-row":`control-bottom-sheet`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`presentation="bottom-sheet"`}),(0,_.jsx)(p,{label:`Due date`,presentation:`bottom-sheet`,controlStyle:Y})]}),(0,_.jsxs)(`div`,{"data-parts-row":`control-form-layout`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,_.jsx)(m,{direction:`horizontal-labels`,children:(0,_.jsx)(p,{label:`Due date`,controlStyle:Y})})]}),(0,_.jsxs)(`div`,{"data-parts-row":`control-input-group`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`InputGroup`}),(0,_.jsxs)(f,{label:`Due date group`,children:[(0,_.jsx)(te,{children:`At`}),(0,_.jsx)(p,{label:`Due date`,isLabelHidden:!0,controlStyle:Y})]})]})]}),(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,_.jsx)(u,{type:`label`,children:`containerStyle and controlStyle`}),(0,_.jsxs)(`div`,{"data-parts-row":`container-popover`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`presentation="popover"`}),(0,_.jsx)(p,{label:`Due date`,presentation:`popover`,containerStyle:X,controlStyle:Y})]}),(0,_.jsxs)(`div`,{"data-parts-row":`container-form-layout`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`horizontal-labels FormLayout`}),(0,_.jsx)(m,{direction:`horizontal-labels`,children:(0,_.jsx)(p,{label:`Due date`,containerStyle:X,controlStyle:Y})})]}),(0,_.jsxs)(`div`,{"data-parts-row":`container-input-group`,style:{display:`grid`,gap:4},children:[(0,_.jsx)(u,{type:`supporting`,children:`InputGroup`}),(0,_.jsxs)(f,{label:`Due date group`,children:[(0,_.jsx)(te,{children:`At`}),(0,_.jsx)(p,{label:`Due date`,isLabelHidden:!0,containerStyle:X,controlStyle:Y})]})]})]})]})},Q={render:e=>{let[t,n]=(0,g.useState)(`2026-03-15`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Date of birth`,presentation:`bottom-sheet`,min:`1900-01-01`,max:`2099-12-31`}},$={render:e=>{let[t,n]=(0,g.useState)(`2026-03-15`);return(0,_.jsx)(p,{...e,value:t,onChange:n})},args:{label:`Date of birth`,presentation:`bottom-sheet`,min:`2026-01-01`,max:`2027-12-31`}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date',
    placeholder: 'Select a date'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event date'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    const [reported, setReported] = useState<string[]>([]);
    return <InternationalizationProvider locale="en-GB">
        <DateInput {...args} value={value} onChange={next => {
        setValue(next);
        setReported(previous => [...previous, String(next)]);
      }} />
        <Text data-testid="reported">{reported.join(', ')}</Text>
      </InternationalizationProvider>;
  },
  args: {
    label: 'Start date'
  }
}`,...S.parameters?.docs?.source},description:{story:`A day-first locale: typed numeric dates read day, then month. The line
under the field shows each value the field reports.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Week starts on Monday',
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    weekStartsOn: 'mon'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-03-21' as ISODateString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <DateInput label="Default (format='date_long')" value={value} onChange={setValue} />
        <DateInput label="format='date'" value={value} onChange={setValue} format="date" />
        <DateInput label="format='date_weekday'" value={value} onChange={setValue} format="date_weekday" />
        <DateInput label="format='system_date'" value={value} onChange={setValue} format="system_date" />
        <DateInput label="Custom function" value={value} onChange={setValue} format={iso => new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full'
      }).format(new Date(iso + 'T00:00'))} />
      </div>;
  }
}`,...w.parameters?.docs?.source},description:{story:"The committed date value can be rendered in different shapes via `format`,\nreusing `Timestamp`'s format vocabulary so the same literal renders the same\ndate shape in both components. It defaults to `'date_long'` (a long-month\ndate, \"March 21, 2026\"). While the user is typing, the raw text is shown\nverbatim — `format` applies only to the committed value.",...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      {CALENDAR_FIELDS.map(field => <CalendarField key={\`\${field.locale}-\${field.calendar}\`} {...field} />)}
    </div>
}`,...T.parameters?.docs?.source},description:{story:"`calendar` sets the calendar the field reads and writes typed dates in.\n`value` and `onChange` stay Gregorian ISO dates. Type in the locale's\ndigits or Latin digits; the field reports a date only when it is complete,\nand names a date the calendar does not have. The Buddhist field sets `min`\nand `max`, so a Gregorian year typed by mistake is caught. Calendars other\nthan Gregorian, Buddhist, Minguo, and Japanese need `Temporal`.",...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      {PRESENTATION_FIELDS.map(field => <PresentationField key={field.id} {...field} />)}
    </div>
}`,...E.parameters?.docs?.source},description:{story:`In a calendar other than Gregorian, the field never shows the native date
control, which is Gregorian: the default and \`presentation="native"\` open
the calendar popover on a mouse and the bottom sheet on a touch screen. The
bottom sheet shows months of the calendar, its month wheel lists the months
of the calendar year, including leap months, and its year wheel names the
era. Values stay Gregorian ISO dates.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Native picker modes',
  render: () => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-03-21' as ISODateString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <DateInput label="presentation='adaptive-native' (default)" description="Native picker on a coarse pointer; Astryx picker otherwise" value={value} onChange={setValue} presentation="adaptive-native" />
        <DateInput label="presentation='native'" description="Native picker wherever the browser supports it" value={value} onChange={setValue} presentation="native" />
        <DateInput label="presentation='adaptive-bottom-sheet'" description="Astryx picker on every pointer type" value={value} onChange={setValue} presentation="adaptive-bottom-sheet" />
      </div>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Birthday',
    description: 'Enter your date of birth',
    placeholder: 'Select your birthday'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date',
    isLabelHidden: true,
    placeholder: 'Select a date'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Preferred date',
    isOptional: true,
    placeholder: 'Select a date (optional)'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Start date',
    isRequired: true,
    placeholder: 'Select a start date'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Locked date',
    isDisabled: true
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event date',
    isDisabled: true,
    disabledMessage: 'You need the Editor role to change this'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date',
    size: 'sm',
    placeholder: 'Select a date'
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Booking date',
    min: '2026-01-15' as ISODateString,
    max: '2026-02-15' as ISODateString,
    description: 'Available dates: Jan 15 - Feb 15, 2026',
    placeholder: 'Select a booking date'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <Layout height="auto" content={<LayoutContent>
            <DateInput {...args} value={value} onChange={setValue} />
          </LayoutContent>} />;
  },
  args: {
    label: 'End date',
    max: new Date().toISOString().slice(0, 10) as ISODateString,
    description: 'Max is today; open the calendar to verify the label does not turn grey when nav buttons are disabled',
    placeholder: 'Select an end date'
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Travel date',
    numberOfMonths: 2,
    placeholder: 'Select a travel date'
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event date',
    status: {
      type: 'error',
      message: 'This date is not available'
    }
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-01' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Meeting date',
    status: {
      type: 'warning',
      message: 'This is a holiday - are you sure?'
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-02-10' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Appointment date',
    status: {
      type: 'success',
      message: 'Date is available'
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  tags: ['visual-theme-matrix'],
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Appointment date',
    presentation: 'popover'
  },
  play: async ({
    canvasElement
  }) => {
    const input = canvasElement.querySelector<HTMLInputElement>('[role="combobox"]');
    if (input == null) {
      throw new Error('DateInput audit fixture is missing its combobox');
    }
    input.click();
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    if (input.getAttribute('aria-expanded') !== 'true') {
      throw new Error('DateInput audit fixture did not open its calendar');
    }
    if (canvasElement.ownerDocument.querySelector('[role="dialog"]') == null) {
      throw new Error('DateInput audit fixture rendered no Calendar dialog');
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  tags: ['visual-theme-matrix'],
  render: () => {
    const [value1, setValue1] = useState<ISODateString | undefined>(undefined);
    const [value2, setValue2] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    const [value3, setValue3] = useState<ISODateString | undefined>(undefined);
    const [value4, setValue4] = useState<ISODateString | undefined>(undefined);
    const [value5, setValue5] = useState<ISODateString | undefined>(undefined);
    const [value6, setValue6] = useState<ISODateString | undefined>('2026-03-10' as ISODateString);
    const [value7, setValue7] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '300px'
    }}>
        <DateInput label="Default" value={value1} onChange={setValue1} placeholder="Select a date" />
        <DateInput label="With value" value={value2} onChange={setValue2} />
        <DateInput label="With description" description="Pick your preferred date" value={value3} onChange={setValue3} placeholder="Select a date" />
        <DateInput label="Optional field" isOptional value={value4} onChange={setValue4} placeholder="Select a date (optional)" />
        <DateInput label="Required field" isRequired value={value5} onChange={setValue5} placeholder="Select a date" />
        <DateInput label="Disabled" isDisabled value={value6} onChange={setValue6} />
        <DateInput label="With error" value={value7} onChange={setValue7} status={{
        type: 'error',
        message: 'Invalid date selection'
      }} />
      </div>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-04-06');
    return <DateInput {...args} value={value} onChange={setValue} hasClear />;
  },
  args: {
    label: 'Event date',
    placeholder: 'Select a date'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  tags: ['visual-baseline'],
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-04-06');
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Event date',
    hasClear: true,
    min: '2026-04-01',
    max: '2026-04-30',
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
      name: /April 15, 2026/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Clear Event date'
    }));
    await expect(canvas.getByRole('combobox')).toHaveValue('');
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
}`,...W.parameters?.docs?.source},description:{story:`Selects a date, clears the controlled value, and reopens the calendar. The
final frame is the regression endpoint: an empty field with no selected day.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-04-06');
    return <DateInput {...args} value={value} onChange={setValue} hasClear />;
  },
  args: {
    label: 'Deadline',
    status: {
      type: 'error',
      message: 'Date is in the past'
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    const [b, setB] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 280
    }}>
        <DateInput label="Attached (default)" value={a} onChange={setA} status={{
        type: 'error',
        message: 'This date is not available'
      }} />
        <DateInput label="Detached" value={b} onChange={setB} status={{
        type: 'error',
        message: 'This date is not available'
      }} statusVariant="detached" />
      </div>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <Theme theme={clearIconTheme} mode="light">
        <DateInput label="Clear icon themed (12px, accent on hover)" value={value} onChange={setValue} hasClear />
      </Theme>;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-01-25' as ISODateString);
    return <Theme theme={toggleIconTheme} mode="light">
        <DateInput label="Calendar toggle icon themed (14px, accent when open)" value={value} onChange={setValue} />
      </Theme>;
  }
}`,...J.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
          <DateInput label="Due date" presentation="popover" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-native" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="native"</Text>
          <DateInput label="Due date" presentation="native" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-bottom-sheet" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">presentation="bottom-sheet"</Text>
          <DateInput label="Due date" presentation="bottom-sheet" controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="control-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <DateInput label="Due date" controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
        <div data-parts-row="control-input-group" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">InputGroup</Text>
          <InputGroup label="Due date group">
            <InputGroupText>At</InputGroupText>
            <DateInput label="Due date" isLabelHidden controlStyle={CONTROL_STYLE} />
          </InputGroup>
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
          <DateInput label="Due date" presentation="popover" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
        </div>
        <div data-parts-row="container-form-layout" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">horizontal-labels FormLayout</Text>
          <FormLayout direction="horizontal-labels">
            <DateInput label="Due date" containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
          </FormLayout>
        </div>
        <div data-parts-row="container-input-group" style={{
        display: 'grid',
        gap: 4
      }}>
          <Text type="supporting">InputGroup</Text>
          <InputGroup label="Due date group">
            <InputGroupText>At</InputGroupText>
            <DateInput label="Due date" isLabelHidden containerStyle={CONTAINER_STYLE} controlStyle={CONTROL_STYLE} />
          </InputGroup>
        </div>
      </div>
    </div>
}`,...Z.parameters?.docs?.source},description:{story:"Where each styling part lands (family:input-fields FR10). The dashed outline\nis `controlStyle` on the visual control box. The blue tint is\n`containerStyle` on the Field box; in a `horizontal-labels` FormLayout and\ninside InputGroup no Field box renders, so there it has no effect (and warns\nin development).",...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-03-15' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date of birth',
    presentation: 'bottom-sheet',
    min: '1900-01-01' as ISODateString,
    max: '2099-12-31' as ISODateString
  }
}`,...Q.parameters?.docs?.source},description:{story:`The bottom sheet with two centuries of years: the year wheel has 200 rows.
Under a finger, opening the month and year wheels costs about the same as
for two years: each year is drawn once, as a flat row.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>('2026-03-15' as ISODateString);
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Date of birth',
    presentation: 'bottom-sheet',
    min: '2026-01-01' as ISODateString,
    max: '2027-12-31' as ISODateString
  }
}`,...$.parameters?.docs?.source},description:{story:`The same sheet with two years: the year wheel has 2 rows.`,...$.parameters?.docs?.description}}},ge=`Default.WithValue.DayFirstLocale.MondayFirstWeek.Formats.CalendarSystems.CalendarSystemPresentations.NativePickerModes.WithDescription.WithHiddenLabel.Optional.Required.Disabled.DisabledWithMessage.SmallSize.WithMinMax.WithMaxDateInLayout.TwoMonthCalendar.WithErrorStatus.WithWarningStatus.WithSuccessStatus.OpenCalendarAudit.AllVariations.Clearable.ClearedCalendarSelection.ClearableWithStatus.StatusVariantComparison.ThemedClearIcon.ThemedCalendarToggleIcon.StylingParts.BottomSheetWideRange.BottomSheetNarrowRange`.split(`.`)})))()}_e();export{H as AllVariations,$ as BottomSheetNarrowRange,Q as BottomSheetWideRange,E as CalendarSystemPresentations,T as CalendarSystems,U as Clearable,G as ClearableWithStatus,W as ClearedCalendarSelection,S as DayFirstLocale,b as Default,M as Disabled,N as DisabledWithMessage,w as Formats,C as MondayFirstWeek,D as NativePickerModes,V as OpenCalendarAudit,A as Optional,j as Required,P as SmallSize,K as StatusVariantComparison,Z as StylingParts,J as ThemedCalendarToggleIcon,q as ThemedClearIcon,L as TwoMonthCalendar,O as WithDescription,R as WithErrorStatus,k as WithHiddenLabel,I as WithMaxDateInLayout,F as WithMinMax,B as WithSuccessStatus,x as WithValue,z as WithWarningStatus,ge as __namedExportsOrder,de as default};