import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Badge-DqOhTiyH.js";import{r as a,t as o}from"./ChatComposerInput-DRwLQp9C.js";import{n as s,t as c}from"./ChatComposer-Ble73cNu.js";import{n as l,t as u}from"./TypeaheadItem-B2bn45PO.js";import{t as d}from"./createStaticSource-DpdQO4C4.js";function f(){let[e,t]=(0,p.useState)(!1);return(0,m.jsxs)(`div`,{children:[(0,m.jsxs)(`button`,{type:`button`,onClick:()=>t(e=>!e),children:[`Toggle disabled: `,String(e)]}),(0,m.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) auto`,alignItems:`end`,gap:12,padding:12,border:`1px solid gray`,width:360},children:[(0,m.jsx)(o,{value:``,onChange:()=>{},placeholder:`Type a message…`,label:`Reproduction input`,isDisabled:e}),(0,m.jsx)(`button`,{type:`button`,style:{width:36,height:36},children:`↑`})]})]})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;function G(){return(G=e((()=>{s(),a(),l(),r(),p=t(),m=n(),{expect:h,fireEvent:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Core/ChatComposerInput`,component:o,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,m.jsx)(`div`,{style:{width:600,padding:40},children:(0,m.jsx)(e,{})})]},b=[{id:`cindy`,label:`Cindy Zhang`,auxiliaryData:{role:`Design Systems`}},{id:`alex`,label:`Alex Johnson`,auxiliaryData:{role:`Frontend`}},{id:`sam`,label:`Sam Rivera`,auxiliaryData:{role:`Backend`}},{id:`jordan`,label:`Jordan Lee`,auxiliaryData:{role:`Product`}},{id:`taylor`,label:`Taylor Kim`,auxiliaryData:{role:`Design`}},{id:`morgan`,label:`Morgan Chen`,auxiliaryData:{role:`Infrastructure`}},{id:`maria`,label:`María José García de la Fuente`,auxiliaryData:{role:`Research`}},{id:`rdj`,label:`Robert Downey Jr.`,auxiliaryData:{role:`Guest Speaker`}},{id:`q4_review`,label:`Design Review: Q4`,auxiliaryData:{role:`Topic`}}],x=[{id:`summarize`,label:`summarize`,auxiliaryData:{description:`Summarize the conversation`}},{id:`translate`,label:`translate`,auxiliaryData:{description:`Translate text to another language`}},{id:`search`,label:`search`,auxiliaryData:{description:`Search the web or documents`}},{id:`code`,label:`code`,auxiliaryData:{description:`Generate or explain code`}},{id:`help`,label:`help`,auxiliaryData:{description:`Show available commands`}}],S=d(b),C=d(x),w=d([{id:`smile`,label:`smile (😄)`},{id:`heart`,label:`heart (❤️)`},{id:`thumbsup`,label:`thumbsup (👍)`},{id:`fire`,label:`fire (🔥)`},{id:`rocket`,label:`rocket (🚀)`},{id:`sparkles`,label:`sparkles (✨)`}]),T={search(e){return new Promise(t=>{setTimeout(()=>{let n=e.toLowerCase();t(b.filter(e=>e.label.toLowerCase().includes(n)))},300)})},bootstrap(){return b}},E={render:()=>{let[e,t]=(0,p.useState)(``);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(c,{onSubmit:e=>{alert(`Submitted: ${e}`),t(``)},value:e,onChange:t,input:(0,m.jsx)(o,{value:e,onChange:t,placeholder:`Type a message...`})}),(0,m.jsxs)(`div`,{style:{fontSize:12,fontFamily:`monospace`,color:`var(--color-text-secondary)`},children:[`Value: `,JSON.stringify(e)]})]})}},D={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(e),input:(0,m.jsx)(o,{placeholder:`Ask me anything about Astryx...`})})},O={render:()=>(0,m.jsx)(c,{onSubmit:()=>{},isDisabled:!0,input:(0,m.jsx)(o,{isDisabled:!0,placeholder:`Input is disabled`})})},k={render:()=>(0,m.jsx)(f,{})},A={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(e),input:(0,m.jsx)(o,{maxRows:3,placeholder:`Type a long message — scrolls after 3 lines...`})})},j={render:()=>{let[e,t]=(0,p.useState)([]);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(c,{onSubmit:e=>t(t=>[...t,e]),input:(0,m.jsx)(o,{placeholder:`Submit messages, then ArrowUp to recall...`})}),e.length>0&&(0,m.jsx)(`div`,{style:{fontSize:12,fontFamily:`monospace`,color:`var(--color-text-secondary)`},children:e.map((e,t)=>(0,m.jsxs)(`div`,{children:[`→ `,e]},t))})]})}},M={render:()=>{let[e,t]=(0,p.useState)([]);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(c,{onSubmit:e=>alert(e),input:(0,m.jsx)(o,{onFiles:e=>t(t=>[...t,...e.map(e=>e.name)]),placeholder:`Paste files here (Ctrl+V)...`})}),e.length>0&&(0,m.jsxs)(`div`,{style:{fontSize:12,color:`var(--color-text-secondary)`},children:[`Files: `,e.join(`, `)]})]})}},N={render:()=>{let e=(0,p.useRef)(null),[t,n]=(0,p.useState)(``);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(c,{value:t,onChange:n,onSubmit:()=>{},input:(0,m.jsx)(o,{handleRef:e,placeholder:`Waiting for dictated text`})}),(0,m.jsx)(`button`,{type:`button`,onClick:()=>{e.current?.focus(),e.current?.insertText(`Dictated text`)},children:`Insert dictated text`}),(0,m.jsx)(`output`,{"aria-label":`Serialized draft`,children:t||`Empty`})]})},play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`Insert dictated text`})),await h(t.getByRole(`textbox`)).toHaveTextContent(`Dictated text`),await h(t.getByRole(`status`,{name:`Serialized draft`})).toHaveTextContent(`Dictated text`),await h(t.queryByText(`Waiting for dictated text`)).not.toBeInTheDocument()}},P={render:()=>{let[e,t]=(0,p.useState)([]);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(c,{onSubmit:()=>{},input:(0,m.jsx)(o,{onFiles:e=>t(e.map(e=>e.name)),placeholder:`Drop a file here`})}),(0,m.jsx)(`output`,{"aria-label":`Received files`,children:e.length===0?`No files`:e.join(`, `)})]})},play:async({canvasElement:e})=>{let t=v(e),n=t.getByRole(`textbox`),r=new DataTransfer;r.items.add(new File([`audit`],`dropped.txt`,{type:`text/plain`})),g.dragOver(n,{dataTransfer:r}),g.drop(n,{dataTransfer:r}),await h(t.getByRole(`status`,{name:`Received files`})).toHaveTextContent(`dropped.txt`)}},F={render:()=>{let[e,t]=(0,p.useState)(``),[n,r]=(0,p.useState)([]);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,m.jsx)(c,{onSubmit:e=>{r(t=>[...t,e]),t(``)},input:(0,m.jsx)(o,{value:e,onChange:t,triggers:[{character:`@`,searchSource:S,hasMultiWordQuery:!0,renderItem:e=>(0,m.jsx)(u,{item:e,description:e.auxiliaryData?.role}),onSelect:e=>({value:`@${e.id}`,label:e.label,variant:`blue`})}],placeholder:`Type @ to mention someone...`})}),(0,m.jsxs)(`div`,{style:{fontSize:12,fontFamily:`monospace`,color:`var(--color-text-secondary)`},children:[`Value: `,JSON.stringify(e)]}),n.length>0&&(0,m.jsx)(`div`,{style:{fontSize:12,fontFamily:`monospace`,color:`var(--color-text-secondary)`},children:n.map((e,t)=>(0,m.jsxs)(`div`,{children:[`→ `,e]},t))})]})}},I={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[{character:`/`,searchSource:C,renderItem:e=>(0,m.jsx)(u,{item:e,description:e.auxiliaryData?.description}),onSelect:e=>({value:`/${e.label}`,label:`/${e.label}`,variant:`yellow`})}],placeholder:`Type / for commands...`})})},L={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[{character:`@`,searchSource:T,onSelect:e=>({value:`@${e.id}`,label:e.label,variant:`blue`}),loadingText:`Searching users…`,emptySearchText:`No users found`}],placeholder:`Type @ for async user search (300ms delay)...`})})},R={render:()=>{let[e,t]=(0,p.useState)(``);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(c,{onSubmit:e=>{alert(`Sent: ${e}`),t(``)},input:(0,m.jsx)(o,{value:e,onChange:t,triggers:[{character:`@`,searchSource:S,hasMultiWordQuery:!0,onSelect:e=>({value:`@${e.id}`,label:e.label,variant:`blue`})},{character:`/`,searchSource:C,onSelect:e=>({value:`/${e.label}`,label:`/${e.label}`,variant:`yellow`})}],placeholder:`Type @ or / ...`})}),(0,m.jsxs)(`div`,{style:{fontSize:12,fontFamily:`monospace`,color:`var(--color-text-secondary)`},children:[`Value: `,JSON.stringify(e)]})]})}},z={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[{character:`@`,searchSource:S,renderItem:e=>(0,m.jsx)(u,{item:e,description:e.auxiliaryData?.role,icon:(0,m.jsx)(`div`,{style:{width:24,height:24,borderRadius:`50%`,backgroundColor:`#e8d5f5`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:11,fontWeight:600,color:`#7c3aed`},children:e.label.charAt(0)})}),onSelect:e=>({value:`@${e.id}`,label:e.label,variant:`purple`,icon:(0,m.jsx)(`span`,{style:{width:14,height:14,borderRadius:`50%`,backgroundColor:`#e8d5f5`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,fontSize:8,fontWeight:700,color:`#7c3aed`},children:e.label.charAt(0)})})}],placeholder:`Type @ — tokens have icons via badge config...`})})},B={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[{character:`@`,searchSource:S,onSelect:e=>({value:`@${e.id}`,label:e.label,variant:`blue`})},{character:`/`,searchSource:C,onSelect:e=>({value:`/${e.label}`,label:`/${e.label}`,variant:`purple`})}],placeholder:`@ for blue mentions, / for purple commands...`})})},V={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[{character:`@`,searchSource:S,renderItem:e=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,m.jsx)(`div`,{style:{width:24,height:24,borderRadius:`50%`,backgroundColor:`#e0e0e0`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:11,fontWeight:600},children:e.label.charAt(0)}),(0,m.jsx)(`span`,{children:e.label})]}),onSelect:e=>({value:`@${e.id}`,render:()=>(0,m.jsx)(`span`,{title:`Click to view ${e.label}'s profile`,style:{cursor:`pointer`},onClick:()=>alert(`Profile: ${e.label}`),children:(0,m.jsx)(i,{variant:`blue`,label:e.label,icon:(0,m.jsx)(`span`,{style:{width:14,height:14,borderRadius:`50%`,backgroundColor:`#c4d4f0`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,fontSize:8,fontWeight:700},children:e.label.charAt(0)})})})})}],placeholder:`Type @ — tokens are clickable with avatars...`})})},H={render:()=>{let e={character:`@`,searchSource:d([{id:`cindy`,label:`Cindy Zhang`,auxiliaryData:{group:`Design`,role:`Design Systems`}},{id:`taylor`,label:`Taylor Kim`,auxiliaryData:{group:`Design`,role:`Product Design`}},{id:`alex`,label:`Alex Johnson`,auxiliaryData:{group:`Engineering`,role:`Frontend`}},{id:`sam`,label:`Sam Rivera`,auxiliaryData:{group:`Engineering`,role:`Backend`}},{id:`morgan`,label:`Morgan Chen`,auxiliaryData:{group:`Engineering`,role:`Infrastructure`}},{id:`jordan`,label:`Jordan Lee`,auxiliaryData:{group:`Product`,role:`Product Manager`}}]),renderItem:e=>(0,m.jsx)(u,{item:e,description:e.auxiliaryData?.role}),onSelect:e=>({value:`@${e.id}`,label:e.label,variant:`blue`})};return(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[e],placeholder:`Type @ to see grouped mentions...`})})}},U={render:()=>(0,m.jsx)(c,{onSubmit:e=>alert(`Sent: ${e}`),input:(0,m.jsx)(o,{triggers:[{character:`:`,searchSource:w,renderItem:e=>(0,m.jsx)(u,{item:e}),onSelect:e=>`:${e.id}: `}],placeholder:`Type : to see emoji suggestions...`})})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <ChatComposer onSubmit={v => {
        alert(\`Submitted: \${v}\`);
        setValue('');
      }} value={value} onChange={setValue} input={<ChatComposerInput value={value} onChange={setValue} placeholder="Type a message..." />} />
        <div style={{
        fontSize: 12,
        fontFamily: 'monospace',
        color: 'var(--color-text-secondary)'
      }}>
          Value: {JSON.stringify(value)}
        </div>
      </div>;
  }
}`,...E.parameters?.docs?.source},description:{story:`Controlled value — shows the serialized value below`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={v => alert(v)} input={<ChatComposerInput placeholder="Ask me anything about Astryx..." />} />
}`,...D.parameters?.docs?.source},description:{story:`Custom placeholder`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={() => {}} isDisabled input={<ChatComposerInput isDisabled placeholder="Input is disabled" />} />
}`,...O.parameters?.docs?.source},description:{story:`Disabled state`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <DisabledHeightToggleExample />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={v => alert(v)} input={<ChatComposerInput maxRows={3} placeholder="Type a long message — scrolls after 3 lines..." />} />
}`,...A.parameters?.docs?.source},description:{story:`Max rows — scrolls after 3 lines`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [log, setLog] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <ChatComposer onSubmit={v => setLog(prev => [...prev, v])} input={<ChatComposerInput placeholder="Submit messages, then ArrowUp to recall..." />} />
        {log.length > 0 && <div style={{
        fontSize: 12,
        fontFamily: 'monospace',
        color: 'var(--color-text-secondary)'
      }}>
            {log.map((msg, i) => <div key={i}>→ {msg}</div>)}
          </div>}
      </div>;
  }
}`,...j.parameters?.docs?.source},description:{story:`Message history — submit a few messages, then ArrowUp/Down to recall`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [files, setFiles] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <ChatComposer onSubmit={v => alert(v)} input={<ChatComposerInput onFiles={f => setFiles(prev => [...prev, ...f.map(x => x.name)])} placeholder="Paste files here (Ctrl+V)..." />} />
        {files.length > 0 && <div style={{
        fontSize: 12,
        color: 'var(--color-text-secondary)'
      }}>
            Files: {files.join(', ')}
          </div>}
      </div>;
  }
}`,...M.parameters?.docs?.source},description:{story:`File paste handler`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const inputRef = useRef<ChatComposerInputHandle>(null);
    const [value, setValue] = useState('');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <ChatComposer value={value} onChange={setValue} onSubmit={() => {}} input={<ChatComposerInput handleRef={inputRef} placeholder="Waiting for dictated text" />} />
        <button type="button" onClick={() => {
        inputRef.current?.focus();
        inputRef.current?.insertText('Dictated text');
      }}>
          Insert dictated text
        </button>
        <output aria-label="Serialized draft">{value || 'Empty'}</output>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Insert dictated text'
    }));
    await expect(canvas.getByRole('textbox')).toHaveTextContent('Dictated text');
    await expect(canvas.getByRole('status', {
      name: 'Serialized draft'
    })).toHaveTextContent('Dictated text');
    await expect(canvas.queryByText('Waiting for dictated text')).not.toBeInTheDocument();
  }
}`,...N.parameters?.docs?.source},description:{story:`Programmatic text follows the same observable draft path as typing.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [files, setFiles] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <ChatComposer onSubmit={() => {}} input={<ChatComposerInput onFiles={next => setFiles(next.map(file => file.name))} placeholder="Drop a file here" />} />
        <output aria-label="Received files">
          {files.length === 0 ? 'No files' : files.join(', ')}
        </output>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole('textbox');
    const transfer = new DataTransfer();
    transfer.items.add(new File(['audit'], 'dropped.txt', {
      type: 'text/plain'
    }));
    fireEvent.dragOver(textbox, {
      dataTransfer: transfer
    });
    fireEvent.drop(textbox, {
      dataTransfer: transfer
    });
    await expect(canvas.getByRole('status', {
      name: 'Received files'
    })).toHaveTextContent('dropped.txt');
  }
}`,...P.parameters?.docs?.source},description:{story:`Dropped files reach the same attachment callback as pasted files.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    const [log, setLog] = useState<string[]>([]);
    const mentionTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: userSource,
      hasMultiWordQuery: true,
      renderItem: item => <TypeaheadItem item={item} description={(item.auxiliaryData as {
        role: string;
      })?.role} />,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: item.label,
        variant: 'blue' as const
      })
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <ChatComposer onSubmit={v => {
        setLog(prev => [...prev, v]);
        setValue('');
      }} input={<ChatComposerInput value={value} onChange={setValue} triggers={[mentionTrigger]} placeholder="Type @ to mention someone..." />} />
        <div style={{
        fontSize: 12,
        fontFamily: 'monospace',
        color: 'var(--color-text-secondary)'
      }}>
          Value: {JSON.stringify(value)}
        </div>
        {log.length > 0 && <div style={{
        fontSize: 12,
        fontFamily: 'monospace',
        color: 'var(--color-text-secondary)'
      }}>
            {log.map((msg, i) => <div key={i}>→ {msg}</div>)}
          </div>}
      </div>;
  }
}`,...F.parameters?.docs?.source},description:{story:`Static @ mentions — type @ to see the menu`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const commandTrigger: ChatComposerTrigger = {
      character: '/',
      searchSource: commandSource,
      renderItem: item => <TypeaheadItem item={item} description={(item.auxiliaryData as {
        description: string;
      })?.description} />,
      onSelect: item => ({
        value: \`/\${item.label}\`,
        label: \`/\${item.label}\`,
        variant: 'yellow' as const
      })
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[commandTrigger]} placeholder="Type / for commands..." />} />;
  }
}`,...I.parameters?.docs?.source},description:{story:`Static / commands — type / to see commands`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const asyncTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: asyncUserSource,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: item.label,
        variant: 'blue' as const
      }),
      loadingText: 'Searching users…',
      emptySearchText: 'No users found'
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[asyncTrigger]} placeholder="Type @ for async user search (300ms delay)..." />} />;
  }
}`,...L.parameters?.docs?.source},description:{story:`Async search source — type @ to trigger a simulated API search`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    const mentionTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: userSource,
      hasMultiWordQuery: true,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: item.label,
        variant: 'blue' as const
      })
    };
    const commandTrigger: ChatComposerTrigger = {
      character: '/',
      searchSource: commandSource,
      onSelect: item => ({
        value: \`/\${item.label}\`,
        label: \`/\${item.label}\`,
        variant: 'yellow' as const
      })
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <ChatComposer onSubmit={v => {
        alert(\`Sent: \${v}\`);
        setValue('');
      }} input={<ChatComposerInput value={value} onChange={setValue} triggers={[mentionTrigger, commandTrigger]} placeholder="Type @ or / ..." />} />
        <div style={{
        fontSize: 12,
        fontFamily: 'monospace',
        color: 'var(--color-text-secondary)'
      }}>
          Value: {JSON.stringify(value)}
        </div>
      </div>;
  }
}`,...R.parameters?.docs?.source},description:{story:`Multiple triggers — @ for mentions, / for commands`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const mentionTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: userSource,
      renderItem: item => <TypeaheadItem item={item} description={(item.auxiliaryData as {
        role: string;
      })?.role} icon={<div style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#e8d5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 600,
        color: '#7c3aed'
      }}>
              {item.label.charAt(0)}
            </div>} />,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: item.label,
        variant: 'purple' as const,
        icon: <span style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: '#e8d5f5',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 8,
          fontWeight: 700,
          color: '#7c3aed'
        }}>
            {item.label.charAt(0)}
          </span>
      })
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[mentionTrigger]} placeholder="Type @ — tokens have icons via badge config..." />} />;
  }
}`,...z.parameters?.docs?.source},description:{story:`Custom item rendering in the trigger menu`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const mentionTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: userSource,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: item.label,
        variant: 'blue' as const
      })
    };
    const commandTrigger: ChatComposerTrigger = {
      character: '/',
      searchSource: commandSource,
      onSelect: item => ({
        value: \`/\${item.label}\`,
        label: \`/\${item.label}\`,
        variant: 'purple' as const
      })
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[mentionTrigger, commandTrigger]} placeholder="@ for blue mentions, / for purple commands..." />} />;
  }
}`,...B.parameters?.docs?.source},description:{story:`Token color variants — different badge colors per trigger`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const mentionTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: userSource,
      renderItem: item => <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
          <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 600
        }}>
            {item.label.charAt(0)}
          </div>
          <span>{item.label}</span>
        </div>,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        render: () => <span title={\`Click to view \${item.label}'s profile\`} style={{
          cursor: 'pointer'
        }} onClick={() => alert(\`Profile: \${item.label}\`)}>
            <Badge variant="blue" label={item.label} icon={<span style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#c4d4f0',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8,
            fontWeight: 700
          }}>
                  {item.label.charAt(0)}
                </span>} />
          </span>
      })
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[mentionTrigger]} placeholder="Type @ — tokens are clickable with avatars..." />} />;
  }
}`,...V.parameters?.docs?.source},description:{story:`Custom render — full control via render() for rich token content`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const groupedUsers = createStaticSource([{
      id: 'cindy',
      label: 'Cindy Zhang',
      auxiliaryData: {
        group: 'Design',
        role: 'Design Systems'
      }
    }, {
      id: 'taylor',
      label: 'Taylor Kim',
      auxiliaryData: {
        group: 'Design',
        role: 'Product Design'
      }
    }, {
      id: 'alex',
      label: 'Alex Johnson',
      auxiliaryData: {
        group: 'Engineering',
        role: 'Frontend'
      }
    }, {
      id: 'sam',
      label: 'Sam Rivera',
      auxiliaryData: {
        group: 'Engineering',
        role: 'Backend'
      }
    }, {
      id: 'morgan',
      label: 'Morgan Chen',
      auxiliaryData: {
        group: 'Engineering',
        role: 'Infrastructure'
      }
    }, {
      id: 'jordan',
      label: 'Jordan Lee',
      auxiliaryData: {
        group: 'Product',
        role: 'Product Manager'
      }
    }] as SearchableItem[]);
    const mentionTrigger: ChatComposerTrigger = {
      character: '@',
      searchSource: groupedUsers,
      renderItem: item => <TypeaheadItem item={item} description={(item.auxiliaryData as {
        role?: string;
      })?.role} />,
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: item.label,
        variant: 'blue' as const
      })
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[mentionTrigger]} placeholder="Type @ to see grouped mentions..." />} />;
  }
}`,...H.parameters?.docs?.source},description:{story:`Grouped menu items — items with auxiliaryData.group render under headings`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const emojiTrigger: ChatComposerTrigger = {
      character: ':',
      searchSource: emojiSource,
      renderItem: item => <TypeaheadItem item={item} />,
      onSelect: item => \`:\${item.id}: \`
    };
    return <ChatComposer onSubmit={value => alert(\`Sent: \${value}\`)} input={<ChatComposerInput triggers={[emojiTrigger]} placeholder="Type : to see emoji suggestions..." />} />;
  }
}`,...U.parameters?.docs?.source},description:{story:`Punctuation trigger (e.g. emoji picker) — type : to see the menu`,...U.parameters?.docs?.description}}},W=[`Controlled`,`CustomPlaceholder`,`Disabled`,`DisabledHeightToggle`,`MaxRows`,`MessageHistory`,`FilePaste`,`ImperativeInsertion`,`FileDrop`,`MentionTrigger`,`SlashCommands`,`AsyncSearch`,`MultipleTriggers`,`CustomRenderItem`,`TokenVariants`,`CustomRender`,`GroupedItems`,`PunctuationTrigger`]})))()}G();export{L as AsyncSearch,E as Controlled,D as CustomPlaceholder,V as CustomRender,z as CustomRenderItem,O as Disabled,k as DisabledHeightToggle,P as FileDrop,M as FilePaste,H as GroupedItems,N as ImperativeInsertion,A as MaxRows,F as MentionTrigger,j as MessageHistory,R as MultipleTriggers,U as PunctuationTrigger,I as SlashCommands,B as TokenVariants,W as __namedExportsOrder,y as default};