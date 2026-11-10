import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./useTooltip-Cmp3pcbb.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./CodeBlock-DQVwkIMF.js";import{r as l,t as u}from"./ChatComposerInput-DRwLQp9C.js";import{n as d,t as f}from"./ChatComposer-Ble73cNu.js";import{n as p,t as m}from"./ChatComposerDrawer-C9Or4CPM.js";import{n as h,t as g}from"./ChatTokenizedText-BQmTNS_f.js";import{n as _,t as v}from"./ChatMessageList-yhs-WclZ.js";import{n as y,t as b}from"./ChatMessage-LFMdokYE.js";import{n as x,t as S}from"./ChatMessageBubble-cWvrxd0T.js";import{n as C,t as w}from"./ChatMessageMetadata-mropitsV.js";import{n as T,t as E}from"./ChatSystemMessage-vYTSrD0o.js";import{i as ee,n as D,r as O,t as k}from"./ChatLayout-BJmL4jTr.js";import{n as te,t as A}from"./ChatToolCalls-CLgKERyt.js";import{n as ne,t as re}from"./EmptyState-BMlM13-L.js";import{n as ie,t as j}from"./Markdown-BzOsAWcI.js";import{n as ae,t as M}from"./Token-DiYqRCxg.js";import{t as N}from"./createStaticSource-DpdQO4C4.js";import{n as oe,t as se}from"./ProgressBar-DBH7OsYW.js";import{n as ce,t as P}from"./Timestamp-Czd81oha.js";import{n as le,t as ue}from"./ClipboardDocumentIcon-DRSo6Bdn.js";import{i as de,n as fe,r as pe,t as me}from"./HandThumbUpIcon-Ck3R8iJ2.js";var F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{D(),ee(),_(),y(),x(),C(),T(),d(),p(),l(),h(),te(),ie(),ae(),a(),ce(),fe(),de(),le(),s(),oe(),i(),ne(),F=t(),I=n(),L={title:`Core/ChatLayout`,component:k,tags:[`autodocs`],parameters:{layout:`fullscreen`}},R=(0,I.jsx)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,I.jsx)(`path`,{d:`m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48`})}),z=(0,I.jsxs)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,I.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`}),(0,I.jsx)(`path`,{d:`M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8`})]}),B=(0,I.jsxs)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,I.jsx)(`path`,{d:`M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z`}),(0,I.jsx)(`path`,{d:`M19 10v2a7 7 0 0 1-14 0v-2`}),(0,I.jsx)(`line`,{x1:`12`,x2:`12`,y1:`19`,y2:`22`})]}),V=[{id:`cindy`,label:`Cindy Zhang`},{id:`alex`,label:`Alex Rivera`},{id:`sam`,label:`Sam Chen`},{id:`navi`,label:`Navi`}],H=[{id:`summarize`,label:`summarize`},{id:`search`,label:`search`},{id:`explain`,label:`explain`}],U=[{id:1,role:`system`,text:`Today`},{id:2,role:`user`,text:`Can you review the Button component and fix the focus ring?`,sentAt:new Date(`2026-03-15T14:30:00`)},{id:3,role:`assistant`,introText:`I'll read the Button component and check the focus styles.`,text:`I'll read the Button component and check the focus styles.

Added a \`:focus-visible\` style with a 2px solid outline and 2px offset. All 24 Button tests pass.

\`\`\`css
:focus-visible {
  outline: 2px solid var(--color-ring-focus);
  outline-offset: 2px;
}
\`\`\`

Here's the test breakdown:

| Suite | Tests | Duration | Status |
|-------|-------|----------|--------|
| Button.test.tsx | 18 | 1.2s | ✓ Pass |
| Button.a11y.test.tsx | 4 | 0.8s | ✓ Pass |
| Button.snapshot.test.tsx | 2 | 0.3s | ✓ Pass |

The focus ring meets **WCAG 2.4.7** requirements and uses the theme's focus color token.`,toolCalls:[{key:`1`,name:`read`,target:`Button.tsx`,status:`complete`,duration:`45ms`,node:`astryx`},{key:`2`,name:`edit`,target:`Button.tsx`,status:`complete`,duration:`120ms`,node:`astryx`,additions:8,deletions:2,resultDetail:(0,I.jsx)(c,{code:`:focus-visible {
  outline: 2px solid var(--color-ring-focus);
  outline-offset: 2px;
}`,language:`css`})},{key:`3`,name:`bash`,target:`yarn test`,status:`complete`,duration:`6.1s`,node:`astryx`,resultDetail:(0,I.jsx)(c,{code:`$ yarn test
✓ 24 tests passed (3 suites)`,language:`bash`})}]},{id:4,role:`user`,text:`Nice, can you also check the Card component?`,sentAt:new Date(`2026-03-15T14:35:00`)}],W={name:`Full AI Chat`,render:()=>{let[e,t]=(0,F.useState)(U),[n,i]=(0,F.useState)([]),[a,s]=(0,F.useState)(!1),c=(0,F.useRef)(void 0),l=(0,F.useRef)(null),d=r({placement:`above`}),p=V.map(e=>({value:`@${e.id}`,label:`@${e.label}`,variant:`blue`})),h=[{character:`@`,searchSource:N(V),onSelect:e=>({value:`@${e.id}`,label:`@${e.label}`,variant:`blue`})},{character:`/`,searchSource:N(H),onSelect:e=>`/${e.label} `}],_=(0,F.useCallback)((e,n,r)=>{let i=Date.now();s(!0),t(t=>[...t,{id:i,role:`assistant`,text:``,introText:e,isStreaming:!0}]);let a=0;c.current=setInterval(()=>{a+=2+Math.floor(Math.random()*4),a>=e.length?(clearInterval(c.current),t(t=>t.map(t=>t.id===i?{...t,text:e}:t)),r?setTimeout(()=>{t(e=>e.map(e=>e.id===i&&e.role===`assistant`?{...e,toolCalls:r.map(e=>({...e,status:`running`,duration:void 0}))}:e)),setTimeout(()=>{t(e=>e.map(e=>e.id===i&&e.role===`assistant`?{...e,toolCalls:r}:e)),setTimeout(()=>{let r=0,a=e+`

`+n;c.current=setInterval(()=>{r+=3+Math.floor(Math.random()*5);let n=e.length+2+r;n>=a.length?(clearInterval(c.current),t(e=>e.map(e=>e.id===i?{...e,text:a,isStreaming:!1}:e)),s(!1)):t(e=>e.map(e=>e.id===i?{...e,text:a.slice(0,n)}:e))},30)},300)},1800)},400):(t(e=>e.map(e=>e.id===i?{...e,isStreaming:!1}:e)),s(!1))):t(t=>t.map(t=>t.id===i?{...t,text:e.slice(0,a)}:t))},30)},[]),y=e=>V.filter(t=>e.includes(`@${t.id}`)).map(e=>({value:`@${e.id}`,label:`@${e.label}`,variant:`blue`})),x=(0,F.useCallback)(e=>{let r=Date.now();t(t=>[...t,{id:r,role:`user`,text:e,files:n.length?[...n]:void 0,tokens:y(e),isSending:!0}]),i([]),setTimeout(()=>{t(e=>e.map(e=>e.id===r&&e.role===`user`?{...e,isSending:!1,sentAt:new Date}:e)),_(`I'll check the Card component for the same issue.`,`The border radius was hardcoded. I replaced it with the theme token:

\`\`\`css
/* before */
border-radius: 12px;

/* after */
border-radius: var(--radius-element);
\`\`\`

Cards now adapt across themes. All tests pass.`,[{key:`r1`,name:`read`,target:`Card.tsx`,status:`complete`,duration:`35ms`,node:`astryx`},{key:`e1`,name:`edit`,target:`Card.tsx`,status:`complete`,duration:`90ms`,node:`astryx`,additions:1,deletions:1},{key:`t1`,name:`bash`,target:`yarn test --filter Card`,status:`complete`,duration:`3.2s`,node:`astryx`}])},2e3)},[n,_]),C=(0,F.useCallback)(()=>{clearInterval(c.current),s(!1),t(e=>e.map(e=>e.role===`assistant`&&e.isStreaming?{...e,isStreaming:!1}:e))},[]),T=(0,I.jsx)(f,{onSubmit:x,onStop:C,isStopShown:a,drawer:n.length>0?(0,I.jsx)(m,{children:n.map(e=>(0,I.jsx)(M,{label:e,onRemove:()=>i(t=>t.filter(t=>t!==e))},e))}):void 0,headerActions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(o,{label:`Mention`,variant:`ghost`,size:`sm`,icon:z,isIconOnly:!0,onClick:()=>{l.current?.focus(),l.current?.insertText(`@`)}}),(0,I.jsx)(o,{label:`Attach`,variant:`ghost`,size:`sm`,icon:R,isIconOnly:!0,onClick:()=>i(e=>[...e,`file-${e.length+1}.tsx`])})]}),headerContext:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(se,{ref:d.ref,"aria-describedby":d.describedBy,label:`Context`,value:12,variant:`neutral`,isLabelHidden:!0,style:{marginInlineEnd:8}}),d.renderTooltip(`3k / 100k tokens used`)]}),input:(0,I.jsx)(u,{handleRef:l,triggers:h,placeholder:`Ask about the codebase...`}),footerActions:(0,I.jsx)(o,{label:`Claude Opus`,variant:`ghost`,size:`md`}),sendActions:(0,I.jsx)(o,{label:`Microphone`,variant:`ghost`,size:`md`,icon:B,isIconOnly:!0})});return(0,I.jsx)(`div`,{style:{height:`calc(100dvh - 32px)`,display:`flex`,flexDirection:`column`},children:(0,I.jsx)(k,{composer:T,children:(0,I.jsx)(v,{children:e.map(e=>{if(e.role===`system`)return(0,I.jsx)(E,{variant:`divider`,children:e.text},e.id);if(e.role===`user`)return(0,I.jsxs)(b,{sender:`user`,children:[e.files&&(0,I.jsx)(m,{children:e.files.map(e=>(0,I.jsx)(M,{label:e},e))}),(0,I.jsx)(S,{metadata:(0,I.jsx)(w,{timestamp:(0,I.jsx)(P,{value:e.sentAt?.toISOString()??new Date(e.id).toISOString(),format:`time`}),status:e.isSending?`sending`:void 0}),children:(0,I.jsx)(g,{tokens:p,children:e.text})})]},e.id);let t=e.introText?.length??0,n=e.toolCalls&&e.toolCalls.length>0,r=t>0?e.text.slice(0,t):null,i=t>0&&e.text.length>t?e.text.slice(t).replace(/^\n+/,``):t?null:e.text;return(0,I.jsxs)(b,{sender:`assistant`,children:[r&&(0,I.jsx)(j,{density:`compact`,children:r}),n&&(0,I.jsx)(A,{calls:e.toolCalls??[]}),i&&(0,I.jsx)(j,{density:`compact`,children:i}),!e.isStreaming&&e.text&&(0,I.jsx)(w,{timestamp:(0,I.jsx)(P,{value:new Date(e.id).toISOString(),format:`time`}),footer:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`span`,{children:`Claude Opus 4.6`}),(0,I.jsx)(`span`,{children:`·`}),(0,I.jsx)(o,{label:`Thumbs up`,icon:(0,I.jsx)(me,{style:{width:14,height:14}}),variant:`ghost`,size:`sm`,isIconOnly:!0}),(0,I.jsx)(o,{label:`Thumbs down`,icon:(0,I.jsx)(pe,{style:{width:14,height:14}}),variant:`ghost`,size:`sm`,isIconOnly:!0}),(0,I.jsx)(o,{label:`Copy`,icon:(0,I.jsx)(ue,{style:{width:14,height:14}}),variant:`ghost`,size:`sm`,isIconOnly:!0})]})})]},e.id)})})})})}},G={name:`Panel View`,render:()=>{let[e,t]=(0,F.useState)(U),[n,r]=(0,F.useState)([]),[i,a]=(0,F.useState)(!1),s=(0,F.useRef)(void 0),c=(0,F.useRef)(null),l=V.map(e=>({value:`@${e.id}`,label:`@${e.label}`,variant:`blue`})),d=[{character:`@`,searchSource:N(V),onSelect:e=>({value:`@${e.id}`,label:`@${e.label}`,variant:`blue`})},{character:`/`,searchSource:N(H),onSelect:e=>`/${e.label} `}],p=(0,F.useCallback)((e,n)=>{let r=Date.now();a(!0),t(e=>[...e,{id:r,role:`assistant`,text:``,isStreaming:!0}]);let i=0,o=e+`

`+n;s.current=setInterval(()=>{i+=3+Math.floor(Math.random()*5),i>=o.length?(clearInterval(s.current),t(e=>e.map(e=>e.id===r?{...e,text:o,isStreaming:!1}:e)),a(!1)):t(e=>e.map(e=>e.id===r?{...e,text:o.slice(0,i)}:e))},30)},[]),h=(0,F.useCallback)(e=>{t(t=>[...t,{id:Date.now(),role:`user`,text:e,files:n.length?[...n]:void 0}]),r([]),setTimeout(()=>{p(`Checking the component now.`,`Found the issue — the border radius was hardcoded. Replaced with the theme token.`)},800)},[n,p]),_=(0,F.useCallback)(()=>{clearInterval(s.current),a(!1),t(e=>e.map(e=>e.role===`assistant`&&e.isStreaming?{...e,isStreaming:!1}:e))},[]),y=(0,I.jsx)(f,{onSubmit:h,onStop:_,isStopShown:i,drawer:n.length>0?(0,I.jsx)(m,{children:n.map(e=>(0,I.jsx)(M,{label:e,onRemove:()=>r(t=>t.filter(t=>t!==e))},e))}):void 0,headerActions:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(o,{label:`Mention`,variant:`ghost`,size:`sm`,icon:z,isIconOnly:!0,onClick:()=>{c.current?.focus(),c.current?.insertText(`@`)}}),(0,I.jsx)(o,{label:`Attach`,variant:`ghost`,size:`sm`,icon:R,isIconOnly:!0,onClick:()=>r(e=>[...e,`file-${e.length+1}.tsx`])})]}),input:(0,I.jsx)(u,{handleRef:c,triggers:d,placeholder:`Ask something...`})});return(0,I.jsx)(`div`,{style:{width:400,height:600,border:`1px solid #ccc`,borderRadius:8,overflow:`hidden`,display:`flex`,flexDirection:`column`},"data-testid":`panel-view`,children:(0,I.jsx)(k,{composer:y,children:(0,I.jsx)(v,{children:e.map(e=>e.role===`system`?(0,I.jsx)(E,{variant:`divider`,children:e.text},e.id):e.role===`user`?(0,I.jsxs)(b,{sender:`user`,children:[e.files&&(0,I.jsx)(m,{children:e.files.map(e=>(0,I.jsx)(M,{label:e},e))}),(0,I.jsx)(S,{children:(0,I.jsx)(g,{tokens:l,children:e.text})})]},e.id):(0,I.jsxs)(b,{sender:`assistant`,children:[e.text&&(0,I.jsx)(j,{density:`compact`,children:e.text}),e.toolCalls&&e.toolCalls.length>0&&(0,I.jsx)(A,{calls:e.toolCalls??[]})]},e.id))})})})}},K={name:`Empty State`,render:()=>(0,I.jsx)(`div`,{style:{height:`calc(100dvh - 32px)`,display:`flex`,flexDirection:`column`},children:(0,I.jsx)(k,{composer:(0,I.jsx)(f,{onSubmit:()=>{},placeholder:`Start a conversation…`}),emptyState:(0,I.jsx)(re,{title:`No messages yet`,description:`Start a conversation by typing below.`}),children:[]})})},q=[`compact`,`balanced`,`spacious`],J={name:`Densities`,render:()=>(0,I.jsx)(`div`,{style:{display:`flex`,gap:16,height:`calc(100dvh - 32px)`,padding:16,boxSizing:`border-box`},children:q.map(e=>(0,I.jsxs)(`div`,{style:{flex:1,minWidth:0,display:`flex`,flexDirection:`column`,overflow:`hidden`},children:[(0,I.jsx)(`strong`,{style:{paddingBlockEnd:8},children:e}),(0,I.jsx)(k,{density:e,composer:(0,I.jsx)(f,{onSubmit:()=>{},placeholder:`Reply…`}),children:(0,I.jsxs)(v,{density:e,children:[(0,I.jsx)(E,{variant:`divider`,children:`Today`}),(0,I.jsx)(b,{sender:`user`,children:(0,I.jsx)(S,{children:`How does density change the layout?`})}),(0,I.jsx)(b,{sender:`assistant`,children:(0,I.jsx)(S,{children:`It sets the dock padding, the message column width, and the height of the blur behind the composer.`})})]})})]},e))})},Y=[`What does the scroll-to-bottom button do?`,`It appears once you scroll away from the newest message.`,`And when I am already at the bottom?`,`Then it is hidden, and it must not take keyboard focus.`,`Why does that matter?`,`Focus landing on something invisible has no visible focus indicator.`,`So the hidden state has to leave the tab order.`,`Exactly — opacity alone does not do that.`,`What removes it?`,`visibility: hidden, carried on the same transition so the fade still plays.`,`Does the visible button stay reachable?`,`Yes. Hiding it from the keyboard only applies while it paints nothing.`],X={name:`Scroll Affordance States`,render:()=>(0,I.jsxs)(`div`,{style:{padding:16},children:[(0,I.jsx)(`button`,{type:`button`,children:`Before chat`}),(0,I.jsx)(`div`,{style:{height:420,marginBlockStart:12,display:`flex`,flexDirection:`column`,overflow:`hidden`},children:(0,I.jsx)(k,{composer:(0,I.jsx)(f,{onSubmit:()=>{},placeholder:`Reply…`}),children:(0,I.jsx)(v,{children:Y.map((e,t)=>(0,I.jsx)(b,{sender:t%2==0?`user`:`assistant`,children:(0,I.jsx)(S,{children:e})},e))})})})]})},Z={name:`Scroll Button States`,parameters:{layout:`centered`},render:()=>(0,I.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,padding:24,width:360},children:[(0,I.jsx)(`div`,{"data-scroll-button-state":`hidden`,children:(0,I.jsx)(O,{isVisible:!1,onClick:()=>{}})}),(0,I.jsx)(`div`,{"data-scroll-button-state":`visible-collapsed`,children:(0,I.jsx)(O,{isVisible:!0,onClick:()=>{}})}),(0,I.jsx)(`div`,{"data-scroll-button-state":`visible-labelled`,children:(0,I.jsx)(O,{isVisible:!0,label:`New messages`,onClick:()=>{}})}),(0,I.jsx)(`div`,{"data-scroll-button-state":`visible-long-label`,children:(0,I.jsx)(O,{isVisible:!0,label:`Neue Nachrichten unterhalb dieser Stelle`,onClick:()=>{}})})]})},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Full AI Chat',
  render: () => {
    const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
    const [files, setFiles] = useState<string[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const streamRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const inputRef = useRef<ChatComposerInputHandle>(null);
    const contextTooltip = useTooltip({
      placement: 'above'
    });
    const mentionTokens = CONTACTS.map(c => ({
      value: \`@\${c.id}\`,
      label: \`@\${c.label}\`,
      variant: 'blue' as const
    }));
    const triggers: ChatComposerTrigger[] = [{
      character: '@',
      searchSource: createStaticSource(CONTACTS),
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: \`@\${item.label}\`,
        variant: 'blue' as const
      })
    }, {
      character: '/',
      searchSource: createStaticSource(COMMANDS),
      onSelect: item => \`/\${item.label} \`
    }];
    const streamResponse = useCallback((introText: string, resultText: string, toolCalls?: ChatToolCallItem[]) => {
      const msgId = Date.now();
      setIsStreaming(true);
      setMessages(prev => [...prev, {
        id: msgId,
        role: 'assistant',
        text: '',
        introText,
        isStreaming: true
      }]);
      let i = 0;
      streamRef.current = setInterval(() => {
        i += 2 + Math.floor(Math.random() * 4);
        if (i >= introText.length) {
          clearInterval(streamRef.current);
          setMessages(prev => prev.map(m => m.id === msgId ? {
            ...m,
            text: introText
          } : m));
          if (toolCalls) {
            setTimeout(() => {
              setMessages(prev => prev.map(m => m.id === msgId && m.role === 'assistant' ? {
                ...m,
                toolCalls: toolCalls.map(tc => ({
                  ...tc,
                  status: 'running' as const,
                  duration: undefined
                }))
              } : m));
              setTimeout(() => {
                setMessages(prev => prev.map(m => m.id === msgId && m.role === 'assistant' ? {
                  ...m,
                  toolCalls
                } : m));
                setTimeout(() => {
                  let j = 0;
                  const fullText = introText + '\\n\\n' + resultText;
                  streamRef.current = setInterval(() => {
                    j += 3 + Math.floor(Math.random() * 5);
                    const end = introText.length + 2 + j;
                    if (end >= fullText.length) {
                      clearInterval(streamRef.current);
                      setMessages(prev => prev.map(m => m.id === msgId ? {
                        ...m,
                        text: fullText,
                        isStreaming: false
                      } : m));
                      setIsStreaming(false);
                      return;
                    }
                    setMessages(prev => prev.map(m => m.id === msgId ? {
                      ...m,
                      text: fullText.slice(0, end)
                    } : m));
                  }, 30);
                }, 300);
              }, 1800);
            }, 400);
          } else {
            setMessages(prev => prev.map(m => m.id === msgId ? {
              ...m,
              isStreaming: false
            } : m));
            setIsStreaming(false);
          }
          return;
        }
        setMessages(prev => prev.map(m => m.id === msgId ? {
          ...m,
          text: introText.slice(0, i)
        } : m));
      }, 30);
    }, []);

    // Simulate backend token resolution — extract @mentions from text
    const resolveTokens = (text: string): ChatComposerToken[] => CONTACTS.filter(c => text.includes(\`@\${c.id}\`)).map(c => ({
      value: \`@\${c.id}\`,
      label: \`@\${c.label}\`,
      variant: 'blue' as const
    }));
    const handleSubmit = useCallback((value: string) => {
      const userMsgId = Date.now();
      setMessages(prev => [...prev, {
        id: userMsgId,
        role: 'user',
        text: value,
        files: files.length ? [...files] : undefined,
        tokens: resolveTokens(value),
        isSending: true
      }]);
      setFiles([]);

      // After 2s, mark as sent and start streaming
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === userMsgId && m.role === 'user' ? {
          ...m,
          isSending: false,
          sentAt: new Date()
        } : m));
        streamResponse("I'll check the Card component for the same issue.", 'The border radius was hardcoded. I replaced it with the theme token:\\n\\n\`\`\`css\\n/* before */\\nborder-radius: 12px;\\n\\n/* after */\\nborder-radius: var(--radius-element);\\n\`\`\`\\n\\nCards now adapt across themes. All tests pass.', [{
          key: 'r1',
          name: 'read',
          target: 'Card.tsx',
          status: 'complete',
          duration: '35ms',
          node: 'astryx'
        }, {
          key: 'e1',
          name: 'edit',
          target: 'Card.tsx',
          status: 'complete',
          duration: '90ms',
          node: 'astryx',
          additions: 1,
          deletions: 1
        }, {
          key: 't1',
          name: 'bash',
          target: 'yarn test --filter Card',
          status: 'complete',
          duration: '3.2s',
          node: 'astryx'
        }]);
      }, 2000);
    }, [files, streamResponse]);
    const handleStop = useCallback(() => {
      clearInterval(streamRef.current);
      setIsStreaming(false);
      setMessages(prev => prev.map(m => m.role === 'assistant' && m.isStreaming ? {
        ...m,
        isStreaming: false
      } : m));
    }, []);
    const composerEl = <ChatComposer onSubmit={handleSubmit} onStop={handleStop} isStopShown={isStreaming} drawer={files.length > 0 ? <ChatComposerDrawer>
              {files.map(f => <Token key={f} label={f} onRemove={() => setFiles(prev => prev.filter(x => x !== f))} />)}
            </ChatComposerDrawer> : undefined} headerActions={<>
            <Button label="Mention" variant="ghost" size="sm" icon={AtSignIcon} isIconOnly onClick={() => {
        inputRef.current?.focus();
        inputRef.current?.insertText('@');
      }} />
            <Button label="Attach" variant="ghost" size="sm" icon={PaperclipIcon} isIconOnly onClick={() => setFiles(prev => [...prev, \`file-\${prev.length + 1}.tsx\`])} />
          </>} headerContext={<>
            <ProgressBar ref={contextTooltip.ref} aria-describedby={contextTooltip.describedBy} label="Context" value={12} variant="neutral" isLabelHidden style={{
        marginInlineEnd: 8
      }} />
            {contextTooltip.renderTooltip('3k / 100k tokens used')}
          </>} input={<ChatComposerInput handleRef={inputRef} triggers={triggers} placeholder="Ask about the codebase..." />} footerActions={<Button label="Claude Opus" variant="ghost" size="md" />} sendActions={<Button label="Microphone" variant="ghost" size="md" icon={MicIcon} isIconOnly />} />;
    return <div style={{
      // The visible height, less the 16px the preview pads every story
      // with on each side, so the composer rests on screen.
      height: 'calc(100dvh - 32px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
        <ChatLayout composer={composerEl}>
          <ChatMessageList>
            {messages.map(msg => {
            if (msg.role === 'system') {
              return <ChatSystemMessage key={msg.id} variant="divider">
                    {msg.text}
                  </ChatSystemMessage>;
            }
            if (msg.role === 'user') {
              return <ChatMessage key={msg.id} sender="user">
                    {msg.files && <ChatComposerDrawer>
                        {msg.files.map(f => <Token key={f} label={f} />)}
                      </ChatComposerDrawer>}
                    <ChatMessageBubble metadata={<ChatMessageMetadata timestamp={<Timestamp value={msg.sentAt?.toISOString() ?? new Date(msg.id).toISOString()} format="time" />} status={msg.isSending ? 'sending' : undefined} />}>
                      <ChatTokenizedText tokens={mentionTokens}>
                        {msg.text}
                      </ChatTokenizedText>
                    </ChatMessageBubble>
                  </ChatMessage>;
            }
            {
              /* Assistant: intro text → tool calls → rest of text */
            }
            const introEnd = msg.introText?.length ?? 0;
            const hasToolCalls = msg.toolCalls && msg.toolCalls.length > 0;
            const introContent = introEnd > 0 ? msg.text.slice(0, introEnd) : null;
            const restContent = introEnd > 0 && msg.text.length > introEnd ? msg.text.slice(introEnd).replace(/^\\n+/, '') : !introEnd ? msg.text : null;
            return <ChatMessage key={msg.id} sender="assistant">
                  {introContent && <Markdown density="compact">{introContent}</Markdown>}
                  {hasToolCalls && <ChatToolCalls calls={msg.toolCalls ?? []} />}
                  {restContent && <Markdown density="compact">{restContent}</Markdown>}
                  {!msg.isStreaming && msg.text && <ChatMessageMetadata timestamp={<Timestamp value={new Date(msg.id).toISOString()} format="time" />} footer={<>
                          <span>Claude Opus 4.6</span>
                          <span>·</span>
                          <Button label="Thumbs up" icon={<HandThumbUpIcon style={{
                  width: 14,
                  height: 14
                }} />} variant="ghost" size="sm" isIconOnly />
                          <Button label="Thumbs down" icon={<HandThumbDownIcon style={{
                  width: 14,
                  height: 14
                }} />} variant="ghost" size="sm" isIconOnly />
                          <Button label="Copy" icon={<ClipboardDocumentIcon style={{
                  width: 14,
                  height: 14
                }} />} variant="ghost" size="sm" isIconOnly />
                        </>} />}
                </ChatMessage>;
          })}
          </ChatMessageList>
        </ChatLayout>
      </div>;
  }
}`,...W.parameters?.docs?.source},description:{story:`Full AI chat with streaming, tool calls, triggers, attachments, and frosted glass composer dock`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Panel View',
  render: () => {
    const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
    const [files, setFiles] = useState<string[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const streamRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const inputRef = useRef<ChatComposerInputHandle>(null);
    const mentionTokens = CONTACTS.map(c => ({
      value: \`@\${c.id}\`,
      label: \`@\${c.label}\`,
      variant: 'blue' as const
    }));
    const triggers: ChatComposerTrigger[] = [{
      character: '@',
      searchSource: createStaticSource(CONTACTS),
      onSelect: item => ({
        value: \`@\${item.id}\`,
        label: \`@\${item.label}\`,
        variant: 'blue' as const
      })
    }, {
      character: '/',
      searchSource: createStaticSource(COMMANDS),
      onSelect: item => \`/\${item.label} \`
    }];
    const streamResponse = useCallback((introText: string, resultText: string) => {
      const msgId = Date.now();
      setIsStreaming(true);
      setMessages(prev => [...prev, {
        id: msgId,
        role: 'assistant',
        text: '',
        isStreaming: true
      }]);
      let i = 0;
      const fullText = introText + '\\n\\n' + resultText;
      streamRef.current = setInterval(() => {
        i += 3 + Math.floor(Math.random() * 5);
        if (i >= fullText.length) {
          clearInterval(streamRef.current);
          setMessages(prev => prev.map(m => m.id === msgId ? {
            ...m,
            text: fullText,
            isStreaming: false
          } : m));
          setIsStreaming(false);
          return;
        }
        setMessages(prev => prev.map(m => m.id === msgId ? {
          ...m,
          text: fullText.slice(0, i)
        } : m));
      }, 30);
    }, []);
    const handleSubmit = useCallback((value: string) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'user',
        text: value,
        files: files.length ? [...files] : undefined
      }]);
      setFiles([]);
      setTimeout(() => {
        streamResponse('Checking the component now.', 'Found the issue — the border radius was hardcoded. Replaced with the theme token.');
      }, 800);
    }, [files, streamResponse]);
    const handleStop = useCallback(() => {
      clearInterval(streamRef.current);
      setIsStreaming(false);
      setMessages(prev => prev.map(m => m.role === 'assistant' && m.isStreaming ? {
        ...m,
        isStreaming: false
      } : m));
    }, []);
    const composerEl = <ChatComposer onSubmit={handleSubmit} onStop={handleStop} isStopShown={isStreaming} drawer={files.length > 0 ? <ChatComposerDrawer>
              {files.map(f => <Token key={f} label={f} onRemove={() => setFiles(prev => prev.filter(x => x !== f))} />)}
            </ChatComposerDrawer> : undefined} headerActions={<>
            <Button label="Mention" variant="ghost" size="sm" icon={AtSignIcon} isIconOnly onClick={() => {
        inputRef.current?.focus();
        inputRef.current?.insertText('@');
      }} />
            <Button label="Attach" variant="ghost" size="sm" icon={PaperclipIcon} isIconOnly onClick={() => setFiles(prev => [...prev, \`file-\${prev.length + 1}.tsx\`])} />
          </>} input={<ChatComposerInput handleRef={inputRef} triggers={triggers} placeholder="Ask something..." />} />;
    return <div style={{
      width: 400,
      height: 600,
      border: '1px solid #ccc',
      borderRadius: 8,
      overflow: 'hidden',
      // A flex column, so the layout fills the panel and its composer
      // rests at the panel's bottom edge.
      display: 'flex',
      flexDirection: 'column'
    }} data-testid="panel-view">
        <ChatLayout composer={composerEl}>
          <ChatMessageList>
            {messages.map(msg => {
            if (msg.role === 'system') {
              return <ChatSystemMessage key={msg.id} variant="divider">
                    {msg.text}
                  </ChatSystemMessage>;
            }
            if (msg.role === 'user') {
              return <ChatMessage key={msg.id} sender="user">
                    {msg.files && <ChatComposerDrawer>
                        {msg.files.map(f => <Token key={f} label={f} />)}
                      </ChatComposerDrawer>}
                    <ChatMessageBubble>
                      <ChatTokenizedText tokens={mentionTokens}>
                        {msg.text}
                      </ChatTokenizedText>
                    </ChatMessageBubble>
                  </ChatMessage>;
            }
            return <ChatMessage key={msg.id} sender="assistant">
                  {msg.text && <Markdown density="compact">{msg.text}</Markdown>}
                  {msg.toolCalls && msg.toolCalls.length > 0 && <ChatToolCalls calls={msg.toolCalls ?? []} />}
                </ChatMessage>;
          })}
          </ChatMessageList>
        </ChatLayout>
      </div>;
  }
}`,...G.parameters?.docs?.source},description:{story:`Panel view — same full features in a narrow sidebar container`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Empty State',
  render: () => <div style={{
    // The visible height, less the preview's 16px padding on each side.
    height: 'calc(100dvh - 32px)',
    display: 'flex',
    flexDirection: 'column'
  }}>
      <ChatLayout composer={<ChatComposer onSubmit={() => {}} placeholder="Start a conversation…" />} emptyState={<EmptyState title="No messages yet" description="Start a conversation by typing below." />}>
        {[]}
      </ChatLayout>
    </div>
}`,...K.parameters?.docs?.source},description:{story:`Empty state using EmptyState`,...K.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Densities',
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    // The visible height, less the preview's 16px padding on each side.
    height: 'calc(100dvh - 32px)',
    padding: 16,
    boxSizing: 'border-box'
  }}>
      {DENSITIES.map(density => <div key={density} style={{
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
          <strong style={{
        paddingBlockEnd: 8
      }}>{density}</strong>
          <ChatLayout density={density} composer={<ChatComposer onSubmit={() => {}} placeholder="Reply…" />}>
            <ChatMessageList density={density}>
              <ChatSystemMessage variant="divider">Today</ChatSystemMessage>
              <ChatMessage sender="user">
                <ChatMessageBubble>
                  How does density change the layout?
                </ChatMessageBubble>
              </ChatMessage>
              <ChatMessage sender="assistant">
                <ChatMessageBubble>
                  It sets the dock padding, the message column width, and the
                  height of the blur behind the composer.
                </ChatMessageBubble>
              </ChatMessage>
            </ChatMessageList>
          </ChatLayout>
        </div>)}
    </div>
}`,...J.parameters?.docs?.source},description:{story:`The three densities side by side. Density is a prop, not an automatic
container-width adaptation: it selects the dock's inline and block-end
padding, the message area's max-width and inline padding, and the height and
mask of the frosted glass blur layer.`,...J.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Scroll Affordance States',
  render: () => <div style={{
    padding: 16
  }}>
      <button type="button">Before chat</button>
      <div style={{
      height: 420,
      marginBlockStart: 12,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
        <ChatLayout composer={<ChatComposer onSubmit={() => {}} placeholder="Reply…" />}>
          <ChatMessageList>
            {AFFORDANCE_TURNS.map((text, index) => <ChatMessage key={text} sender={index % 2 === 0 ? 'user' : 'assistant'}>
                <ChatMessageBubble>{text}</ChatMessageBubble>
              </ChatMessage>)}
          </ChatMessageList>
        </ChatLayout>
      </div>
    </div>
}`,...X.parameters?.docs?.source},description:{story:`Deterministic fixture for the scroll-to-bottom affordance: a bounded,
self-scrolling ChatLayout with static content and a sentinel control in
front of it. Scrolling away from the bottom reveals the affordance and
scrolling back hides it, so one story reaches the hidden, visible, and
re-hidden states without timers, streaming, or \`new Date()\`.

Drives the exact-head keyboard and theme-size evidence in
\`ChatLayoutScrollButton.a11y.chromium.spec.ts\`.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Scroll Button States',
  parameters: {
    layout: 'centered'
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 24,
    width: 360
  }}>
      <div data-scroll-button-state="hidden">
        <ChatLayoutScrollButton isVisible={false} onClick={() => {}} />
      </div>
      <div data-scroll-button-state="visible-collapsed">
        <ChatLayoutScrollButton isVisible onClick={() => {}} />
      </div>
      <div data-scroll-button-state="visible-labelled">
        <ChatLayoutScrollButton isVisible label="New messages" onClick={() => {}} />
      </div>
      <div data-scroll-button-state="visible-long-label">
        <ChatLayoutScrollButton isVisible label="Neue Nachrichten unterhalb dieser Stelle" onClick={() => {}} />
      </div>
    </div>
}`,...Z.parameters?.docs?.source},description:{story:`The scroll affordance's own rendered configurations, side by side, so the
hidden, collapsed, labelled, and long-label pills can be compared in one
frame and in one theme switch.

\`ScrollAffordanceStates\` above owns the *behavioral* fixture — a real
scroller whose position drives the affordance. This one owns the *rendered*
fixture: the labelled pill is only reachable inside ChatLayout when new
messages arrive during a scroll, which no static story can stage, and the
hidden pill occupies no visible place there at all. Rendering the component
directly is what makes those configurations photographable and lets a theme
be judged against the surface it is supposed to paint.

The long label is deliberately past the pill's expanded ceiling: text
expansion is a real locale outcome, and the frame records what a reader sees
when it happens.`,...Z.parameters?.docs?.description}}},Q=[`FullAIChat`,`PanelView`,`WithEmptyState`,`Densities`,`ScrollAffordanceStates`,`ScrollButtonStates`]})))()}$();export{J as Densities,W as FullAIChat,G as PanelView,X as ScrollAffordanceStates,Z as ScrollButtonStates,K as WithEmptyState,Q as __namedExportsOrder,L as default};