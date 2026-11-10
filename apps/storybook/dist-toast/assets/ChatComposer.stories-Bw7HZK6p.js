import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./Badge-DqOhTiyH.js";import{r as l,t as u}from"./ChatComposerInput-DRwLQp9C.js";import{n as d,t as f}from"./ChatSendButton-BU7-4Qyn.js";import{n as p,t as m}from"./ChatComposer-Ble73cNu.js";import{n as h,t as g}from"./ChatComposerDrawer-C9Or4CPM.js";import{n as _,t as v}from"./ListItem-C2dBt6xL.js";import{n as y,t as b}from"./List-Bq_ZN_6g.js";import{n as x,t as S}from"./Token-DiYqRCxg.js";import{n as C,t as w}from"./ProgressBar-DBH7OsYW.js";function T(){let[e,t]=(0,E.useState)(0);return(0,D.jsx)(`div`,{"data-testid":`disabled-streaming-fixture`,"data-stop-requests":e,children:(0,D.jsx)(m,{"data-testid":`disabled-streaming-composer`,onSubmit:()=>{},onStop:()=>t(e=>e+1),isDisabled:!0,isStopShown:!0,placeholder:``})})}var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{p(),h(),l(),d(),x(),a(),C(),y(),_(),r(),s(),E=t(),D=n(),{expect:O,userEvent:k,within:A}=__STORYBOOK_MODULE_TEST__,j=(0,D.jsxs)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`}),(0,D.jsx)(`path`,{d:`M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8`})]}),M=(0,D.jsx)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,D.jsx)(`path`,{d:`m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48`})}),N=(0,D.jsxs)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,D.jsx)(`path`,{d:`M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z`}),(0,D.jsx)(`path`,{d:`M19 10v2a7 7 0 0 1-14 0v-2`}),(0,D.jsx)(`line`,{x1:`12`,x2:`12`,y1:`19`,y2:`22`})]}),P={title:`Core/ChatComposer`,component:m,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,D.jsx)(`div`,{style:{boxSizing:`border-box`,maxWidth:`100%`,padding:40,width:680},children:(0,D.jsx)(e,{})})]},F={render:()=>(0,D.jsx)(m,{onSubmit:e=>{console.log(`Submit:`,e),alert(`Sent: ${e}`)}})},I={render:()=>{let e=typeof window<`u`&&window.matchMedia?.(`(pointer: coarse)`).matches;return(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),input:(0,D.jsx)(u,{placeholder:e?`Enter inserts a newline on touch — use Send`:`Enter sends; Shift+Enter for a newline`,enterKeyHint:e?`enter`:`send`,onKeyDown:t=>{e&&t.key===`Enter`&&!t.shiftKey&&t.preventDefault()}})})}},L={render:()=>{let[e,t]=(0,E.useState)(!0);return(0,D.jsx)(m,{onSubmit:e=>{console.log(`Submit:`,e),t(!0)},isStopShown:e,onStop:()=>{console.log(`Stopped`),t(!1)}})}},R={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),footerActions:(0,D.jsx)(o,{label:`GPT-4`,variant:`ghost`,size:`md`}),sendActions:(0,D.jsx)(o,{label:`Microphone`,variant:`ghost`,size:`md`,icon:N,isIconOnly:!0})})},z={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),drawer:(0,D.jsxs)(g,{children:[(0,D.jsx)(S,{label:`report.pdf`,onRemove:()=>{}}),(0,D.jsx)(S,{label:`data.csv`,onRemove:()=>{}})]}),headerActions:(0,D.jsx)(o,{label:`Attach file`,variant:`ghost`,size:`sm`,icon:M,isIconOnly:!0}),headerContext:(0,D.jsx)(w,{label:`Context window`,value:3,isLabelHidden:!0})})},B={render:()=>{let[e,t]=(0,E.useState)(!1);return(0,D.jsx)(m,{onSubmit:e=>{console.log(`Submit:`,e),t(!0),setTimeout(()=>t(!1),3e3)},isStopShown:e,onStop:()=>t(!1),placeholder:`Ask me anything...`,drawer:(0,D.jsx)(g,{children:(0,D.jsx)(S,{label:`design-spec.pdf`,onRemove:()=>{}})}),headerActions:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(o,{label:`Mention`,variant:`ghost`,size:`sm`,icon:j,isIconOnly:!0}),(0,D.jsx)(o,{label:`Attach file`,variant:`ghost`,size:`sm`,icon:M,isIconOnly:!0})]}),headerContext:(0,D.jsx)(w,{label:`Context window`,value:3,isLabelHidden:!0}),footerActions:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(o,{label:`Auto`,variant:`ghost`,size:`md`}),(0,D.jsx)(o,{label:`Settings`,variant:`ghost`,size:`md`})]}),sendActions:(0,D.jsx)(o,{label:`Microphone`,variant:`ghost`,size:`md`,icon:N,isIconOnly:!0})})}},V={render:()=>(0,D.jsx)(m,{onSubmit:()=>{},isDisabled:!0,placeholder:`Composer is disabled`})},H={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),drawer:(0,D.jsxs)(g,{count:6,children:[(0,D.jsx)(S,{label:`new_feature_prd.docx`,onRemove:()=>{}}),(0,D.jsx)(S,{label:`2026_roadmap.docx`,onRemove:()=>{}}),(0,D.jsx)(S,{label:`user_flow.pdf`,onRemove:()=>{}}),(0,D.jsx)(S,{label:`launch_plan.docx`,onRemove:()=>{}}),(0,D.jsx)(S,{label:`user_feedback.csv`,onRemove:()=>{}}),(0,D.jsx)(S,{label:`kpis.csv`,onRemove:()=>{}})]})})},U={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),status:{type:`error`,message:`Failed to send message. Please try again.`}})},W={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),statusPosition:`top`,status:{type:`warning`,message:`Context window is 90% full.`}})},G={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),status:{type:`error`,message:`Failed to send message. Please try again.`}})},K={render:()=>(0,D.jsx)(m,{onSubmit:e=>{console.log(`Submit:`,e),alert(`Sent: ${e}`)},placeholder:`Type to enable the send button...`})},q={render:()=>(0,D.jsx)(m,{onSubmit:e=>console.log(`Submit:`,e),sendButton:(0,D.jsx)(f,{size:`sm`,onSend:()=>alert(`Custom send!`)})})},J={render:()=>{let[e,t]=(0,E.useState)(!1);return(0,D.jsx)(m,{onSubmit:e=>{console.log(`Submit:`,e),t(!0),setTimeout(()=>t(!1),5e3)},isStopShown:e,onStop:()=>{console.log(`Stopped`),t(!1)},placeholder:`Send a message to start streaming...`})}},Y={render:()=>{let e=[{key:`A`,label:`Yes`},{key:`B`,label:"Yes, and don’t ask again for `git add` commands"},{key:`C`,label:`No, and tell me what to do differently`}],[t,n]=(0,E.useState)(null);return(0,D.jsx)(m,{onSubmit:e=>{console.log(`Submit:`,e,`| Answer:`,t),alert(`Sent: "${e}"\nAnswer: ${t}`)},drawer:(0,D.jsx)(g,{count:1,label:`User feedback requested`,children:(0,D.jsx)(`div`,{style:{width:`100%`},children:(0,D.jsxs)(b,{children:[(0,D.jsx)(v,{label:(0,D.jsx)(i,{weight:`bold`,children:`Do you want to proceed?`})}),e.map(e=>(0,D.jsx)(v,{label:e.label,startContent:(0,D.jsx)(c,{variant:t===e.key?`info`:`neutral`,label:e.key}),isSelected:t===e.key,onClick:()=>n(e.key)},e.key))]})})})})}},X={render:()=>(0,D.jsx)(m,{elevation:`none`,onSubmit:e=>{console.log(`Submit:`,e)}})},Z={name:`Readiness / disabled streaming on narrow viewport`,parameters:{layout:`fullscreen`,docs:{description:{story:`At a mobile viewport, editing is disabled while the explicit Stop action stays reachable. The play assertion clicks the real button and rejects horizontal overflow.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,D.jsx)(T,{}),play:async({canvasElement:e})=>{let t=A(e),n=t.getByTestId(`disabled-streaming-composer`),r=n.getBoundingClientRect();O(r.left).toBeGreaterThanOrEqual(0),O(r.right).toBeLessThanOrEqual(window.innerWidth),O(n.scrollWidth).toBeLessThanOrEqual(n.clientWidth),await k.click(t.getByRole(`button`,{name:`Stop`})),O(t.getByTestId(`disabled-streaming-fixture`)).toHaveAttribute(`data-stop-requests`,`1`)}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => {
    console.log('Submit:', value);
    alert(\`Sent: \${value}\`);
  }} />
}`,...F.parameters?.docs?.source},description:{story:`Simplest usage — just onSubmit`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
    return <ChatComposer onSubmit={value => console.log('Submit:', value)} input={<ChatComposerInput placeholder={isCoarsePointer ? 'Enter inserts a newline on touch — use Send' : 'Enter sends; Shift+Enter for a newline'}
    // The Return key says what Enter does: Send where Enter sends,
    // Return where it inserts a line break.
    enterKeyHint={isCoarsePointer ? 'enter' : 'send'} onKeyDown={e => {
      if (isCoarsePointer && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
      }
    }} />} />;
  }
}`,...I.parameters?.docs?.source},description:{story:"Platform-specific Enter behavior. Pass a custom `ChatComposerInput` in the\n`input` slot and handle keys through `onKeyDown` — the single seam for\nplatform quirks. Here, on a touch keyboard we `preventDefault()` Enter so a\nsoft-keyboard Return inserts a newline instead of sending (and never strands\na multi-line prompt); on a pointer device Enter sends as usual. The same\nseam covers shortcuts like Cmd/Ctrl+Enter — just call submit yourself.\n`enterKeyHint` keeps the touch keyboard's Return key honest: Send where\nEnter sends, Return where it inserts a line break. IME composition is\nalways respected regardless.",...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isStreaming, setIsStreaming] = useState(true);
    return <ChatComposer onSubmit={value => {
      console.log('Submit:', value);
      setIsStreaming(true);
    }} isStopShown={isStreaming} onStop={() => {
      console.log('Stopped');
      setIsStreaming(false);
    }} />;
  }
}`,...L.parameters?.docs?.source},description:{story:`With streaming state and stop button`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} footerActions={<Button label="GPT-4" variant="ghost" size="md" />} sendActions={<Button label="Microphone" variant="ghost" size="md" icon={MicIcon} isIconOnly />} />
}`,...R.parameters?.docs?.source},description:{story:`With footer actions (model selector) and mic button`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} drawer={<ChatComposerDrawer>
          <Token label="report.pdf" onRemove={() => {}} />
          <Token label="data.csv" onRemove={() => {}} />
        </ChatComposerDrawer>} headerActions={<Button label="Attach file" variant="ghost" size="sm" icon={PaperclipIcon} isIconOnly />} headerContext={<ProgressBar label="Context window" value={3} isLabelHidden />} />
}`,...z.parameters?.docs?.source},description:{story:`With attachment chips and a context toolbar`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isStreaming, setIsStreaming] = useState(false);
    return <ChatComposer onSubmit={value => {
      console.log('Submit:', value);
      setIsStreaming(true);
      setTimeout(() => setIsStreaming(false), 3000);
    }} isStopShown={isStreaming} onStop={() => setIsStreaming(false)} placeholder="Ask me anything..." drawer={<ChatComposerDrawer>
            <Token label="design-spec.pdf" onRemove={() => {}} />
          </ChatComposerDrawer>} headerActions={<>
            <Button label="Mention" variant="ghost" size="sm" icon={AtSignIcon} isIconOnly />
            <Button label="Attach file" variant="ghost" size="sm" icon={PaperclipIcon} isIconOnly />
          </>} headerContext={<ProgressBar label="Context window" value={3} isLabelHidden />} footerActions={<>
            <Button label="Auto" variant="ghost" size="md" />
            <Button label="Settings" variant="ghost" size="md" />
          </>} sendActions={<Button label="Microphone" variant="ghost" size="md" icon={MicIcon} isIconOnly />} />;
  }
}`,...B.parameters?.docs?.source},description:{story:`Full featured — all slots populated`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={() => {}} isDisabled placeholder="Composer is disabled" />
}`,...V.parameters?.docs?.source},description:{story:`Disabled state`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} drawer={<ChatComposerDrawer count={6}>
          <Token label="new_feature_prd.docx" onRemove={() => {}} />
          <Token label="2026_roadmap.docx" onRemove={() => {}} />
          <Token label="user_flow.pdf" onRemove={() => {}} />
          <Token label="launch_plan.docx" onRemove={() => {}} />
          <Token label="user_feedback.csv" onRemove={() => {}} />
          <Token label="kpis.csv" onRemove={() => {}} />
        </ChatComposerDrawer>} />
}`,...H.parameters?.docs?.source},description:{story:`With many attachments and collapsible drawer`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} status={{
    type: 'error',
    message: 'Failed to send message. Please try again.'
  }} />
}`,...U.parameters?.docs?.source},description:{story:`With error status`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} statusPosition="top" status={{
    type: 'warning',
    message: 'Context window is 90% full.'
  }} />
}`,...W.parameters?.docs?.source},description:{story:`With status on top`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} status={{
    type: 'error',
    message: 'Failed to send message. Please try again.'
  }} />
}`,...G.parameters?.docs?.source},description:{story:`With status on bottom`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => {
    console.log('Submit:', value);
    alert(\`Sent: \${value}\`);
  }} placeholder="Type to enable the send button..." />
}`,...K.parameters?.docs?.source},description:{story:`Default send button — reads from composer context automatically`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} sendButton={<ChatSendButton size="sm" onSend={() => alert('Custom send!')} />} />
}`,...q.parameters?.docs?.source},description:{story:`Custom send button via sendButton slot`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isStreaming, setIsStreaming] = useState(false);
    return <ChatComposer onSubmit={value => {
      console.log('Submit:', value);
      setIsStreaming(true);
      setTimeout(() => setIsStreaming(false), 5000);
    }} isStopShown={isStreaming} onStop={() => {
      console.log('Stopped');
      setIsStreaming(false);
    }} placeholder="Send a message to start streaming..." />;
  }
}`,...J.parameters?.docs?.source},description:{story:`Send/stop toggle — type text and submit to start streaming, click stop to end`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const options = [{
      key: 'A',
      label: 'Yes'
    }, {
      key: 'B',
      label: 'Yes, and don\\u2019t ask again for \`git add\` commands'
    }, {
      key: 'C',
      label: 'No, and tell me what to do differently'
    }];
    const [selected, setSelected] = useState<string | null>(null);
    return <ChatComposer onSubmit={value => {
      console.log('Submit:', value, '| Answer:', selected);
      alert(\`Sent: "\${value}"\\nAnswer: \${selected}\`);
    }} drawer={<ChatComposerDrawer count={1} label="User feedback requested">
            <div style={{
        width: '100%'
      }}>
              <List>
                <ListItem label={<Text weight="bold">Do you want to proceed?</Text>} />
                {options.map(opt => <ListItem key={opt.key} label={opt.label} startContent={<Badge variant={selected === opt.key ? 'info' : 'neutral'} label={opt.key} />} isSelected={selected === opt.key} onClick={() => setSelected(opt.key)} />)}
              </List>
            </div>
          </ChatComposerDrawer>} />;
  }
}`,...Y.parameters?.docs?.source},description:{story:`Drawer with a feedback prompt, warning badge, and selectable options`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer elevation="none" onSubmit={value => {
    console.log('Submit:', value);
  }} />
}`,...X.parameters?.docs?.source},description:{story:'Flat composer — `elevation="none"` drops the resting shadow so depth comes\nfrom the border and focus ring instead. The default is `low` (raised).',...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Readiness / disabled streaming on narrow viewport',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'At a mobile viewport, editing is disabled while the explicit Stop action stays reachable. The play assertion clicks the real button and rejects horizontal overflow.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <DisabledStreamingFixture />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const composer = canvas.getByTestId('disabled-streaming-composer');
    const bounds = composer.getBoundingClientRect();
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(window.innerWidth);
    expect(composer.scrollWidth).toBeLessThanOrEqual(composer.clientWidth);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Stop'
    }));
    expect(canvas.getByTestId('disabled-streaming-fixture')).toHaveAttribute('data-stop-requests', '1');
  }
}`,...Z.parameters?.docs?.source}}},Q=[`Simplest`,`EnterBehavior`,`WithStreaming`,`WithFooterActions`,`WithAttachments`,`FullFeatured`,`Disabled`,`WithManyAttachments`,`WithError`,`WithStatusTop`,`WithStatusBottom`,`DefaultSendButton`,`CustomSendButton`,`SendStopToggle`,`Feedback`,`Flat`,`DisabledStreamingNarrow`]})))()}$();export{q as CustomSendButton,K as DefaultSendButton,V as Disabled,Z as DisabledStreamingNarrow,I as EnterBehavior,Y as Feedback,X as Flat,B as FullFeatured,J as SendStopToggle,F as Simplest,z as WithAttachments,U as WithError,R as WithFooterActions,H as WithManyAttachments,G as WithStatusBottom,W as WithStatusTop,L as WithStreaming,Q as __namedExportsOrder,P as default};