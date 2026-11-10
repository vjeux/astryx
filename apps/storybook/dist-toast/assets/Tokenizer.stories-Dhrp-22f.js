import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-DoGM0DEN.js";import{n as a,t as o}from"./Tokenizer-D_tqRcHk.js";import{n as s,t as c}from"./Token-DiYqRCxg.js";import{n as l,t as u}from"./MagnifyingGlassIcon-D2pYO0WH.js";var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;function ee(){return(ee=e((()=>{d=t(),a(),r(),s(),l(),f=n(),p=[{id:`1`,label:`Alice Johnson`},{id:`2`,label:`Bob Smith`},{id:`3`,label:`Charlie Brown`},{id:`4`,label:`Diana Prince`},{id:`5`,label:`Eve Williams`},{id:`6`,label:`Frank Miller`},{id:`7`,label:`Grace Lee`},{id:`8`,label:`Henry Davis`}],m={search:e=>p.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>p.slice(0,5)},h={search:e=>new Promise(t=>{setTimeout(()=>t(p.filter(t=>t.label.toLowerCase().includes(e.toLowerCase()))),1200)}),bootstrap:()=>new Promise(e=>setTimeout(()=>e(p.slice(0,5)),1200))},g=[`none`,`unfocusedInline`,`unfocusedLayer`],_={title:`Core/Tokenizer`,component:o,tags:[`autodocs`],argTypes:{label:{control:`text`},placeholder:{control:`text`},isDisabled:{control:`boolean`},disabledMessage:{control:`text`,description:`Explains why the tokenizer is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (input stays blocked). Use this instead of wrapping a disabled Tokenizer in Tooltip.`},isRequired:{control:`boolean`},isOptional:{control:`boolean`},hasClear:{control:`boolean`,type:`boolean`},maxEntries:{control:`number`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Input size`},tokenOverflowBehavior:{control:`radio`,options:g,type:{name:`enum`,value:g}}},decorators:[e=>(0,f.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 400px)`},children:(0,f.jsx)(e,{})})]},v={render:e=>{let[t,n]=(0,d.useState)([]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e)})},args:{label:`Team Members`,placeholder:`Search people...`}},y={render:e=>{let[t,n]=(0,d.useState)([p[0],p[2]]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e)})},args:{label:`Team Members`,placeholder:`Add more...`},name:`Pre-selected Items`},b={...v,args:{...v.args,hasClear:!0},name:`With Clear All Button`},x={...v,args:{...v.args,maxEntries:3},name:`Max 3 Entries`},S={...v,args:{...v.args,isRequired:!0}},C={...v,args:{...v.args,description:`Select up to 5 team members for this project`}},w={...v,args:{...v.args,status:{type:`error`,message:`At least one member is required`}}},T={...v,args:{...v.args,status:{type:`warning`,message:`Some members may not have access`}}},E={...v,args:{...v.args,status:{type:`success`,message:`Team is ready!`}}},D={render:e=>{let[t]=(0,d.useState)([p[0],p[1]]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:()=>{}})},args:{label:`Team Members`,isDisabled:!0}},O={...v,args:{...v.args,startIcon:u},name:`With Start Icon`},k={render:e=>{let[t,n]=(0,d.useState)([p[0],p[2]]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e)})},args:{label:`Team Members`,startIcon:u},name:`With Start Icon and Tokens`},A={render:e=>{let[t,n]=(0,d.useState)([]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e),hasEntriesOnFocus:!0})},args:{label:`Team Members`,placeholder:`Click to see suggestions...`},name:`With Entries On Focus`},j={render:e=>{let[t,n]=(0,d.useState)([p[0],p[1],p[2],p[3],p[4],p[5]]);return(0,f.jsxs)(`div`,{children:[(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e),tokenOverflowBehavior:`unfocusedInline`}),(0,f.jsx)(`p`,{style:{marginTop:8},children:`This text will shift down when the tokenizer expands on focus.`})]})},args:{label:`Team Members`,placeholder:`Add more...`},name:`Overflow Inline`},M={render:e=>{let[t,n]=(0,d.useState)([p[0],p[1],p[2],p[3],p[4],p[5]]);return(0,f.jsxs)(`div`,{children:[(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e),tokenOverflowBehavior:`unfocusedLayer`}),(0,f.jsx)(`p`,{style:{marginTop:8},children:`This text should not shift when the tokenizer expands on focus.`})]})},args:{label:`Team Members`,placeholder:`Add more...`},name:`Overflow Layer`},N={render:e=>{let[t,n]=(0,d.useState)([p[0],p[2]]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e),endContent:(0,f.jsx)(i,{label:`Apply`,variant:`primary`,size:`sm`})})},args:{label:`Team Members`},name:`With End Content`},P={search:()=>[],bootstrap:()=>[]},F={render:e=>{let[t,n]=(0,d.useState)([]);return(0,f.jsxs)(`div`,{children:[(0,f.jsx)(o,{...e,searchSource:P,value:t,onChange:(e,t)=>{n(e)},hasCreate:!0,placeholder:`Type a tag and press Enter...`}),(0,f.jsxs)(`p`,{style:{marginTop:8,fontSize:14,color:`var(--color-text-secondary)`},children:[t.length,` tag`,t.length===1?``:`s`,` added`]})]})},args:{label:`Tags`},name:`Creatable (Free Text)`},I={render:()=>{let[e,t]=(0,d.useState)([]),[n,r]=(0,d.useState)([p[0],p[2]]),[i,a]=(0,d.useState)([]);return(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,f.jsx)(o,{label:`Small (28px)`,searchSource:m,value:e,onChange:e=>t(e),placeholder:`Small size`,size:`sm`,hasClear:!0}),(0,f.jsx)(o,{label:`Medium (32px)`,searchSource:m,value:n,onChange:e=>r(e),placeholder:`Medium size (default)`,size:`md`,hasClear:!0}),(0,f.jsx)(o,{label:`Large (36px)`,searchSource:m,value:i,onChange:e=>a(e),placeholder:`Large size`,size:`lg`,hasClear:!0})]})}},L={render:e=>{let[t,n]=(0,d.useState)([]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:(e,t)=>{n(e)},hasCreate:!0,hasEntriesOnFocus:!0,placeholder:`Search or type a new name...`})},args:{label:`Team Members`},name:`Creatable + Search`},R={render:e=>{let[t]=(0,d.useState)([p[0],p[1]]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:()=>{}})},args:{label:`Team Members`,isDisabled:!0,disabledMessage:`You need edit access to change members`}},z={render:()=>{let[e,t]=(0,d.useState)([]),[n,r]=(0,d.useState)([]);return(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,f.jsx)(o,{label:`Attached (default)`,searchSource:m,value:e,onChange:e=>t(e),status:{type:`error`,message:`Select at least one member`}}),(0,f.jsx)(o,{label:`Detached`,searchSource:m,value:n,onChange:e=>r(e),status:{type:`error`,message:`Select at least one member`},statusVariant:`detached`})]})}},B={render:e=>{let[t,n]=(0,d.useState)([p[0]]);return(0,f.jsx)(o,{...e,searchSource:h,value:t,onChange:e=>n(e),hasClear:!0,endContent:(0,f.jsxs)(`span`,{children:[t.length,` selected`]})})},args:{label:`Team Members`,placeholder:`Search people...`},name:`Loading (async source, with clear and end content)`},V={render:e=>{let[t,n]=(0,d.useState)([p[0],p[2]]);return(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e)})},args:{label:`Team Members`,placeholder:`Add more...`,hasClear:!0,presentation:`popover`},name:`Logical order`},H={render:e=>(0,f.jsx)(o,{...e,searchSource:m,value:[p[0]],onChange:()=>{},hasClear:!0,presentation:`popover`}),args:{label:`Team Members`,placeholder:`Search people...`},name:`RTL end lane (token + clear)`},U={id:`long`,label:`Status: is In Progress, Blocked, or Waiting for Review`},W={render:e=>(0,f.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,f.jsx)(o,{...e,searchSource:m,value:[U],onChange:()=>{},hasClear:!0,presentation:`popover`}),(0,f.jsx)(o,{...e,label:`Custom token`,searchSource:m,value:[U],onChange:()=>{},hasClear:!0,renderToken:(e,t)=>(0,f.jsx)(c,{label:e.label,onRemove:t}),presentation:`popover`})]}),args:{label:`Filters`,placeholder:`Add a filter...`},name:`Long token beside the end lane`},G={render:e=>{let[t,n]=(0,d.useState)(p.slice(0,5)),[r,i]=(0,d.useState)(p.slice(0,2));return(0,f.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,f.jsx)(o,{...e,searchSource:m,value:t,onChange:e=>n(e)}),(0,f.jsx)(`div`,{"data-full-row-host":``,children:(0,f.jsx)(o,{...e,label:`Reviewers`,searchSource:m,value:r,onChange:e=>i(e)})})]})},args:{label:`Team Members`,placeholder:`Add more...`,hasClear:!0,presentation:`popover`},name:`Caret placement`,play:async({canvasElement:e})=>{let[t,n]=e.querySelectorAll(`.astryx-tokenizer`),r=e.querySelector(`[data-full-row-host]`);if(!t||!n||!r)throw Error(`Caret fixtures did not render as expected`);let i=()=>new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e()))),a=e=>{let t=e.querySelector(`[role="combobox"]`),n=[...e.querySelectorAll(`.astryx-token`)],r=n.at(-1);if(!t||!r)throw Error(`A caret fixture is missing its input or tokens`);return{input:t,firstToken:n[0],lastToken:r,tokens:n}},o=(e,t)=>{let n=getComputedStyle(e),r=e.getBoundingClientRect(),i=t.getBoundingClientRect();return n.direction===`rtl`?i.left-(r.left+Number.parseFloat(n.borderLeftWidth)+Number.parseFloat(n.paddingLeft)):r.right-Number.parseFloat(n.borderRightWidth)-Number.parseFloat(n.paddingRight)-i.right},s=e=>{let t=getComputedStyle(e),n=t.direction===`rtl`,r=e.getBoundingClientRect(),{textAlign:i}=t;return{isRtl:n,x:i===`right`||i===`start`&&n||i===`end`&&!n?r.right-Number.parseFloat(t.paddingRight):r.left+Number.parseFloat(t.paddingLeft),y:r.top+r.height/2}},c=e=>e.getBoundingClientRect().height;await document.fonts.ready;let l=performance.now()+2e3;for(;[t,n].some(e=>e.style.getPropertyValue(`--_tokenizer-end-lane-reserve`)===``);){if(performance.now()>=l)throw Error(`Clear-all lane reserve was not measured`);await new Promise(e=>requestAnimationFrame(()=>e()))}await i();{let{input:e,lastToken:n,tokens:r}=a(t);if(new Set(r.map(e=>Math.round(e.getBoundingClientRect().top))).size<2||o(t,n)<20)throw Error(`Fixture no longer wraps with room after the last token`);let l=c(t),u=n.getBoundingClientRect();if(e.focus(),await i(),document.activeElement!==e)throw Error(`The combobox did not take focus`);if(Math.abs(c(t)-l)>.5)throw Error(`Focusing changed the field height from ${l.toFixed(2)} to ${c(t).toFixed(2)}`);let d=n.getBoundingClientRect();if(Math.abs(d.left-u.left)>.5||Math.abs(d.top-u.top)>.5)throw Error(`Focusing moved the last token`);let f=s(e);if(f.y<d.top||f.y>d.bottom)throw Error(`The caret is not on the last token's row: caret y ${f.y.toFixed(2)}, last token ${d.top.toFixed(2)}–${d.bottom.toFixed(2)}`);let p=f.isRtl?d.left-f.x:f.x-d.right;if(p<0||p>12)throw Error(`The caret is ${p.toFixed(2)}px from the last token's inline end; expected it right after the token`);e.blur()}{let{input:e,firstToken:t,lastToken:l}=a(n),u=c(n),d=o(n,l);if(r.style.width=`${r.getBoundingClientRect().width-(d-3)}px`,await i(),Math.abs(o(n,l)-3)>.5)throw Error(`Could not leave 3px after the last token`);if(Math.abs(c(n)-u)>.5)throw Error(`With 3px left on the row, the resting field grew from ${u.toFixed(2)} to ${c(n).toFixed(2)}`);e.focus(),await i();let f=s(e),p=l.getBoundingClientRect(),m=t.getBoundingClientRect(),h=f.isRtl?m.right-f.x:f.x-m.left;if(f.y<=p.bottom||h<0||h>8)throw Error(`With no room after the last token, the focused caret did not start a new row`);e.blur(),await i(),e.readOnly=!0,e.focus(),await i();let g=c(n);if(e.blur(),e.readOnly=!1,r.style.width=``,Math.abs(g-u)>.5)throw Error(`With 3px left on the row, focusing a read-only field grew it from ${u.toFixed(2)} to ${g.toFixed(2)}`)}}},K=Array.from({length:1e3},(e,t)=>{let n=t+1;return{id:`tag-${n}`,label:n===1?`Design`:n===2?`Eng`:`Tag ${String(n).padStart(2,`0`)}`}}),q={search:e=>K.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>K},J={render:e=>{let[t,n]=(0,d.useState)([K[0],K[1]]);return(0,f.jsx)(o,{...e,searchSource:q,value:t,onChange:e=>n(e),hasCreate:!0,maxMenuItems:1e3,debounceMs:0,presentation:`bottom-sheet`})},args:{label:`Tags`,placeholder:`Add tags`},name:`Bottom sheet`},Y={render:e=>{let[t,n]=(0,d.useState)([K[0],K[1],K[2],K[3],K[4]]);return(0,f.jsx)(o,{...e,searchSource:q,value:t,onChange:e=>n(e),maxMenuItems:1e3,debounceMs:0,presentation:`adaptive`})},args:{label:`Tags`,placeholder:`Add tags`},name:`Adaptive (default)`},X={render:()=>{let[e,t]=(0,d.useState)([K[0],K[1],K[2],K[3]]),[n,r]=(0,d.useState)(0);return(0,f.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 400px)`},children:(0,f.jsx)(o,{label:`Recipients`,searchSource:q,value:e,onChange:e=>t(e),debounceMs:0,placeholder:`Add recipients`,presentation:`bottom-sheet`,renderToken:(e,t)=>(0,f.jsx)(c,{label:e.label,onRemove:t}),endContent:(0,f.jsx)(i,{label:`Cc (${n})`,variant:`ghost`,size:`sm`,onClick:()=>r(e=>e+1)})})})},name:`Bottom sheet with end content and custom tokens`,parameters:{viewport:{defaultViewport:`mobile2`}}},Z={render:v.render,args:{...v.args,presentation:`popover`},name:`Popover (every device)`},Q={render:e=>{let[t,n]=(0,d.useState)([K[0],K[1]]);return(0,f.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,f.jsx)(o,{...e,label:`Disabled`,searchSource:q,value:[K[0],K[1]],onChange:()=>{},isDisabled:!0,presentation:`bottom-sheet`}),(0,f.jsx)(o,{...e,label:`Disabled and empty`,searchSource:q,value:[],onChange:()=>{},isDisabled:!0,presentation:`bottom-sheet`}),(0,f.jsx)(o,{...e,label:`At the limit`,searchSource:q,value:t,onChange:e=>n(e),maxEntries:2,debounceMs:0,presentation:`bottom-sheet`})]})},args:{placeholder:`Add tags`},name:`Bottom sheet states`},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} />;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Search people...'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState([users[0], users[2]]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} />;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Add more...'
  },
  name: 'Pre-selected Items'
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    hasClear: true
  },
  name: 'With Clear All Button'
}`,...b.parameters?.docs?.source},description:{story:`On touch screens, clear through the sheet's Clear all.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    maxEntries: 3
  },
  name: 'Max 3 Entries'
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    isRequired: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    description: 'Select up to 5 team members for this project'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    status: {
      type: 'error',
      message: 'At least one member is required'
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    status: {
      type: 'warning',
      message: 'Some members may not have access'
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    status: {
      type: 'success',
      message: 'Team is ready!'
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value] = useState([users[0], users[1]]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={() => {}} />;
  },
  args: {
    label: 'Team Members',
    isDisabled: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    startIcon: MagnifyingGlassIcon
  },
  name: 'With Start Icon'
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState([users[0], users[2]]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} />;
  },
  args: {
    label: 'Team Members',
    startIcon: MagnifyingGlassIcon
  },
  name: 'With Start Icon and Tokens'
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} hasEntriesOnFocus />;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Click to see suggestions...'
  },
  name: 'With Entries On Focus'
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([users[0], users[1], users[2], users[3], users[4], users[5]]);
    return <div>
        <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} tokenOverflowBehavior="unfocusedInline" />
        <p style={{
        marginTop: 8
      }}>
          This text will shift down when the tokenizer expands on focus.
        </p>
      </div>;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Add more...'
  },
  name: 'Overflow Inline'
}`,...j.parameters?.docs?.source},description:{story:`Overflow modes apply to the inline field.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([users[0], users[1], users[2], users[3], users[4], users[5]]);
    return <div>
        <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} tokenOverflowBehavior="unfocusedLayer" />
        <p style={{
        marginTop: 8
      }}>
          This text should not shift when the tokenizer expands on focus.
        </p>
      </div>;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Add more...'
  },
  name: 'Overflow Layer'
}`,...M.parameters?.docs?.source},description:{story:`Overflow modes apply to the inline field.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([users[0], users[2]]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} endContent={<Button label="Apply" variant="primary" size="sm" />} />;
  },
  args: {
    label: 'Team Members'
  },
  name: 'With End Content'
}`,...N.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [tags, setTags] = useState<SearchableItem[]>([]);
    return <div>
        <Tokenizer {...args} searchSource={emptySource} value={tags} onChange={(items, _change) => {
        setTags(items);
      }} hasCreate placeholder="Type a tag and press Enter..." />
        <p style={{
        marginTop: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          {tags.length} tag{tags.length !== 1 ? 's' : ''} added
        </p>
      </div>;
  },
  args: {
    label: 'Tags'
  },
  name: 'Creatable (Free Text)'
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sm, setSm] = useState<SearchableItem[]>([]);
    const [md, setMd] = useState<SearchableItem[]>([users[0], users[2]]);
    const [lg, setLg] = useState<SearchableItem[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <Tokenizer label="Small (28px)" searchSource={userSource} value={sm} onChange={items => setSm(items)} placeholder="Small size" size="sm" hasClear />
        <Tokenizer label="Medium (32px)" searchSource={userSource} value={md} onChange={items => setMd(items)} placeholder="Medium size (default)" size="md" hasClear />
        <Tokenizer label="Large (36px)" searchSource={userSource} value={lg} onChange={items => setLg(items)} placeholder="Large size" size="lg" hasClear />
      </div>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={(items, _change) => {
      setValue(items);
    }} hasCreate hasEntriesOnFocus placeholder="Search or type a new name..." />;
  },
  args: {
    label: 'Team Members'
  },
  name: 'Creatable + Search'
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value] = useState([users[0], users[1]]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={() => {}} />;
  },
  args: {
    label: 'Team Members',
    isDisabled: true,
    disabledMessage: 'You need edit access to change members'
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<SearchableItem[]>([]);
    const [b, setB] = useState<SearchableItem[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
        <Tokenizer label="Attached (default)" searchSource={userSource} value={a} onChange={items => setA(items)} status={{
        type: 'error',
        message: 'Select at least one member'
      }} />
        <Tokenizer label="Detached" searchSource={userSource} value={b} onChange={items => setB(items)} status={{
        type: 'error',
        message: 'Select at least one member'
      }} statusVariant="detached" />
      </div>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([users[0]]);
    return <Tokenizer {...args} searchSource={slowUserSource} value={value} onChange={items => setValue(items)} hasClear endContent={<span>{value.length} selected</span>} />;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Search people...'
  },
  name: 'Loading (async source, with clear and end content)'
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState([users[0], users[2]]);
    return <Tokenizer {...args} searchSource={userSource} value={value} onChange={items => setValue(items)} />;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Add more...',
    hasClear: true,
    // A fixture for the inline field's end lane and caret, so it keeps the
    // inline field on every device.
    presentation: 'popover'
  },
  name: 'Logical order'
}`,...V.parameters?.docs?.source},description:{story:`Tokens plus a clear-all button — the two ends of the field. Under RTL they
must swap sides; this is the story the RTL audit measures as a D2
layout-order-flip.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <Tokenizer {...args} searchSource={userSource} value={[users[0]]} onChange={() => {}} hasClear
  // A fixture for the inline field's end lane: the inline field on every
  // device.
  presentation="popover" />,
  args: {
    label: 'Team Members',
    placeholder: 'Search people...'
  },
  name: 'RTL end lane (token + clear)'
}`,...H.parameters?.docs?.source},description:{story:`The inline-end lane, populated at rest, for the RTL audit's D4 pass.

Tokenizer's lane is absolutely positioned — it has to be, so it stays on the
field's first row while tokens wrap below it — which makes its side entirely
a matter of the writing mode. The busy Spinner shares that lane, and busy
only exists mid-search, so a selected token with \`hasClear\` is what puts the
lane on screen for a measurement that can be held still.`,...H.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gap: 16
  }}>
      <Tokenizer {...args} searchSource={userSource} value={[longToken]} onChange={() => {}} hasClear
    // A fixture for the inline field's end lane: the inline field on every
    // device.
    presentation="popover" />
      <Tokenizer {...args} label="Custom token" searchSource={userSource} value={[longToken]} onChange={() => {}} hasClear renderToken={(item, onRemove) => <Token label={item.label} onRemove={onRemove} />} presentation="popover" />
    </div>,
  args: {
    label: 'Filters',
    placeholder: 'Add a filter...'
  },
  name: 'Long token beside the end lane'
}`,...W.parameters?.docs?.source},description:{story:`One token wider than the row, beside the clear-all lane, as the default pill
and through \`renderToken\`. Both must truncate short of the lane rather than
run underneath it.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [wrapped, setWrapped] = useState(users.slice(0, 5));
    const [oneRow, setOneRow] = useState(users.slice(0, 2));
    return <div style={{
      display: 'grid',
      gap: 16
    }}>
        <Tokenizer {...args} searchSource={userSource} value={wrapped} onChange={items => setWrapped(items)} />
        <div data-full-row-host="">
          <Tokenizer {...args} label="Reviewers" searchSource={userSource} value={oneRow} onChange={items => setOneRow(items)} />
        </div>
      </div>;
  },
  args: {
    label: 'Team Members',
    placeholder: 'Add more...',
    hasClear: true,
    // A fixture for the inline field's end lane and caret, so it keeps the
    // inline field on every device.
    presentation: 'popover'
  },
  name: 'Caret placement',
  play: async ({
    canvasElement
  }) => {
    const [wrappedField, fullRowField] = canvasElement.querySelectorAll<HTMLElement>('.astryx-tokenizer');
    const host = canvasElement.querySelector<HTMLElement>('[data-full-row-host]');
    if (!wrappedField || !fullRowField || !host) {
      throw new Error('Caret fixtures did not render as expected');
    }
    const settle = () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const parts = (field: HTMLElement) => {
      const input = field.querySelector<HTMLInputElement>('[role="combobox"]');
      const tokens = [...field.querySelectorAll<HTMLElement>('.astryx-token')];
      const lastToken = tokens.at(-1);
      if (!input || !lastToken) {
        throw new Error('A caret fixture is missing its input or tokens');
      }
      return {
        input,
        firstToken: tokens[0],
        lastToken,
        tokens
      };
    };
    // Room left between the last token and the field's inline-end content
    // edge, which already stops short of the end lane.
    const roomAfter = (field: HTMLElement, token: HTMLElement) => {
      const style = getComputedStyle(field);
      const fieldRect = field.getBoundingClientRect();
      const tokenRect = token.getBoundingClientRect();
      return style.direction === 'rtl' ? tokenRect.left - (fieldRect.left + Number.parseFloat(style.borderLeftWidth) + Number.parseFloat(style.paddingLeft)) : fieldRect.right - Number.parseFloat(style.borderRightWidth) - Number.parseFloat(style.paddingRight) - tokenRect.right;
    };
    // An empty input paints its caret at the edge of its content box that its
    // text alignment starts from.
    const caretOf = (input: HTMLInputElement) => {
      const style = getComputedStyle(input);
      const isRtl = style.direction === 'rtl';
      const rect = input.getBoundingClientRect();
      const {
        textAlign
      } = style;
      const alignsRight = textAlign === 'right' || textAlign === 'start' && isRtl || textAlign === 'end' && !isRtl;
      return {
        isRtl,
        x: alignsRight ? rect.right - Number.parseFloat(style.paddingRight) : rect.left + Number.parseFloat(style.paddingLeft),
        y: rect.top + rect.height / 2
      };
    };
    const heightOf = (field: HTMLElement) => field.getBoundingClientRect().height;
    await document.fonts.ready;
    const reserveDeadline = performance.now() + 2000;
    while ([wrappedField, fullRowField].some(field => field.style.getPropertyValue('--_tokenizer-end-lane-reserve') === '')) {
      if (performance.now() >= reserveDeadline) {
        throw new Error('Clear-all lane reserve was not measured');
      }
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
    await settle();

    // Wrapped tokens: the caret follows the last token, on its row.
    {
      const {
        input,
        lastToken,
        tokens
      } = parts(wrappedField);
      const rows = new Set(tokens.map(token => Math.round(token.getBoundingClientRect().top)));
      if (rows.size < 2 || roomAfter(wrappedField, lastToken) < 20) {
        throw new Error('Fixture no longer wraps with room after the last token');
      }
      const restingHeight = heightOf(wrappedField);
      const restingToken = lastToken.getBoundingClientRect();
      input.focus();
      await settle();
      if (document.activeElement !== input) {
        throw new Error('The combobox did not take focus');
      }
      if (Math.abs(heightOf(wrappedField) - restingHeight) > 0.5) {
        throw new Error(\`Focusing changed the field height from \${restingHeight.toFixed(2)} to \${heightOf(wrappedField).toFixed(2)}\`);
      }
      const token = lastToken.getBoundingClientRect();
      if (Math.abs(token.left - restingToken.left) > 0.5 || Math.abs(token.top - restingToken.top) > 0.5) {
        throw new Error('Focusing moved the last token');
      }
      const caret = caretOf(input);
      if (caret.y < token.top || caret.y > token.bottom) {
        throw new Error(\`The caret is not on the last token's row: caret y \${caret.y.toFixed(2)}, last token \${token.top.toFixed(2)}–\${token.bottom.toFixed(2)}\`);
      }
      const offset = caret.isRtl ? token.left - caret.x : caret.x - token.right;
      if (offset < 0 || offset > 12) {
        throw new Error(\`The caret is \${offset.toFixed(2)}px from the last token's inline end; expected it right after the token\`);
      }
      input.blur();
    }

    // A row with less room than the caret's text inset: no blank row at rest,
    // and focusing starts a new row.
    {
      const {
        input,
        firstToken,
        lastToken
      } = parts(fullRowField);
      const restingHeight = heightOf(fullRowField);
      const room = roomAfter(fullRowField, lastToken);
      host.style.width = \`\${host.getBoundingClientRect().width - (room - 3)}px\`;
      await settle();
      if (Math.abs(roomAfter(fullRowField, lastToken) - 3) > 0.5) {
        throw new Error('Could not leave 3px after the last token');
      }
      if (Math.abs(heightOf(fullRowField) - restingHeight) > 0.5) {
        throw new Error(\`With 3px left on the row, the resting field grew from \${restingHeight.toFixed(2)} to \${heightOf(fullRowField).toFixed(2)}\`);
      }
      input.focus();
      await settle();
      const caret = caretOf(input);
      const token = lastToken.getBoundingClientRect();
      const rowStart = firstToken.getBoundingClientRect();
      const startOffset = caret.isRtl ? rowStart.right - caret.x : caret.x - rowStart.left;
      if (caret.y <= token.bottom || startOffset < 0 || startOffset > 8) {
        throw new Error('With no room after the last token, the focused caret did not start a new row');
      }
      input.blur();
      await settle();

      // A disabled field with a disabledMessage stays focusable, but read-only.
      // Nothing can be typed there, so focusing it must not start a new row.
      input.readOnly = true;
      input.focus();
      await settle();
      const readOnlyHeight = heightOf(fullRowField);
      input.blur();
      input.readOnly = false;
      host.style.width = '';
      if (Math.abs(readOnlyHeight - restingHeight) > 0.5) {
        throw new Error(\`With 3px left on the row, focusing a read-only field grew it from \${restingHeight.toFixed(2)} to \${readOnlyHeight.toFixed(2)}\`);
      }
    }
  }
}`,...G.parameters?.docs?.source},description:{story:`Where the caret goes once the field has tokens. Focused with an empty query,
it sits right after the last token, on the last row, where typed text will
start (top). A row with no room left for it (bottom, narrowed by the play
function) keeps its height at rest; focusing moves the caret to the start of
a new row, as wrapped text would, unless the field is read-only.`,...G.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([sheetTags[0], sheetTags[1]]);
    return <Tokenizer {...args} searchSource={sheetTagSource} value={value} onChange={items => setValue(items)} hasCreate maxMenuItems={1000} debounceMs={0} presentation="bottom-sheet" />;
  },
  args: {
    label: 'Tags',
    placeholder: 'Add tags'
  },
  name: 'Bottom sheet'
}`,...J.parameters?.docs?.source},description:{story:`The touch surface, forced on every device so it is reviewable on a laptop:
\`presentation="bottom-sheet"\`. The trigger shows
the selected tokens; tapping it opens one tall sheet with the search row on
top, checkbox rows that keep their place while the sheet is open, a Create
row for typed text, and a pinned footer with a confirmed Clear all beside
Save, which commits the draft; \`onChange\` fires once, on Save.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => {
    // Enough tokens to wrap the inline field's row on a phone, so the box
    // the trigger keeps at the swap is the wrapped one (FR16, FR17).
    const [value, setValue] = useState<SearchableItem[]>([sheetTags[0], sheetTags[1], sheetTags[2], sheetTags[3], sheetTags[4]]);
    return <Tokenizer {...args} searchSource={sheetTagSource} value={value} onChange={items => setValue(items)} maxMenuItems={1000} debounceMs={0} presentation="adaptive" />;
  },
  args: {
    label: 'Tags',
    placeholder: 'Add tags'
  },
  name: 'Adaptive (default)'
}`,...Y.parameters?.docs?.source},description:{story:`\`presentation="adaptive"\`, the default: the sheet on a compact
coarse-pointer screen (narrow the viewport and emulate touch), otherwise the
inline combobox — the same resolution Selector uses.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem[]>([sheetTags[0], sheetTags[1], sheetTags[2], sheetTags[3]]);
    const [copies, setCopies] = useState(0);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 400px)'
    }}>
        <Tokenizer label="Recipients" searchSource={sheetTagSource} value={value} onChange={items => setValue(items)} debounceMs={0} placeholder="Add recipients" presentation="bottom-sheet" renderToken={(item, onRemove) => <Token label={item.label} onRemove={onRemove} />} endContent={<Button label={\`Cc (\${copies})\`} variant="ghost" size="sm" onClick={() => setCopies(count => count + 1)} />} />
      </div>;
  },
  name: 'Bottom sheet with end content and custom tokens',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}`,...X.parameters?.docs?.source},description:{story:`The sheet presentation keeps \`endContent\` at the field's inline end and
renders its tokens through \`renderToken\`, as the inline field does. The end
content's buttons and a token's own remove control act at once; a tap
anywhere else on the field opens the sheet. The grid column sizes the field,
so a test can narrow it.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: Default.render,
  args: {
    ...Default.args,
    presentation: 'popover'
  },
  name: 'Popover (every device)'
}`,...Z.parameters?.docs?.source},description:{story:'`presentation="popover"`: the inline combobox with its anchored suggestion\nmenu on every device, a compact coarse-pointer screen included.',...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem[]>([sheetTags[0], sheetTags[1]]);
    return <div style={{
      display: 'grid',
      gap: 16
    }}>
        <Tokenizer {...args} label="Disabled" searchSource={sheetTagSource} value={[sheetTags[0], sheetTags[1]]} onChange={() => {}} isDisabled presentation="bottom-sheet" />
        <Tokenizer {...args} label="Disabled and empty" searchSource={sheetTagSource} value={[]} onChange={() => {}} isDisabled presentation="bottom-sheet" />
        <Tokenizer {...args} label="At the limit" searchSource={sheetTagSource} value={value} onChange={items => setValue(items)} maxEntries={2} debounceMs={0} presentation="bottom-sheet" />
      </div>;
  },
  args: {
    placeholder: 'Add tags'
  },
  name: 'Bottom sheet states'
}`,...Q.parameters?.docs?.source},description:{story:`Disabled and at-limit states of the sheet presentation: the disabled
trigger stays focusable and does not open; at \`maxEntries\` the sheet's
unchecked rows are inert while checked rows still toggle.`,...Q.parameters?.docs?.description}}},$=`Default.WithPreselected.WithClear.MaxEntries.Required.WithDescription.WithError.WithWarning.WithSuccess.Disabled.WithStartIcon.WithStartIconAndTokens.WithEntriesOnFocus.OverflowInline.OverflowLayer.WithEndContent.Creatable.SizeVariants.CreatableWithSearch.DisabledWithMessage.StatusVariantComparison.Loading.LogicalOrder.RtlEndLane.LongTokenEndLane.CaretPlacement.SheetPresentation.AdaptivePresentation.SheetPresentationEndContent.PopoverPresentation.SheetPresentationStates`.split(`.`)})))()}ee();export{Y as AdaptivePresentation,G as CaretPlacement,F as Creatable,L as CreatableWithSearch,v as Default,D as Disabled,R as DisabledWithMessage,B as Loading,V as LogicalOrder,W as LongTokenEndLane,x as MaxEntries,j as OverflowInline,M as OverflowLayer,Z as PopoverPresentation,S as Required,H as RtlEndLane,J as SheetPresentation,X as SheetPresentationEndContent,Q as SheetPresentationStates,I as SizeVariants,z as StatusVariantComparison,b as WithClear,C as WithDescription,N as WithEndContent,A as WithEntriesOnFocus,w as WithError,y as WithPreselected,O as WithStartIcon,k as WithStartIconAndTokens,E as WithSuccess,T as WithWarning,$ as __namedExportsOrder,_ as default};