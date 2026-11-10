import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./ChatMessage-LFMdokYE.js";import{n as i,t as a}from"./ChatMessageBubble-cWvrxd0T.js";import{n as o,t as s}from"./ChatMessageMetadata-mropitsV.js";function c({state:e,children:t}){return(0,l.jsxs)(`section`,{"data-bubble-audit-state":e,style:f,children:[(0,l.jsx)(`div`,{style:p,children:e}),t]})}var l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),i(),o(),l=t(),u={title:`Core/ChatMessageBubble`,component:a,tags:[`autodocs`]},d={display:`flex`,flexDirection:`column`,gap:20,maxWidth:720},f={display:`flex`,flexDirection:`column`,gap:8,padding:12,border:`1px solid var(--color-border-primary)`,borderRadius:8},p={color:`var(--color-text-secondary)`,fontSize:12,fontWeight:600},m={render:()=>(0,l.jsxs)(`div`,{"data-chat-message-bubble-audit":!0,style:d,children:[(0,l.jsxs)(c,{state:`sender-alignment`,children:[(0,l.jsx)(r,{sender:`assistant`,children:(0,l.jsx)(a,{name:`Navi`,children:`Assistant message`})}),(0,l.jsx)(r,{sender:`user`,children:(0,l.jsx)(a,{name:`You`,children:`User message`})})]}),(0,l.jsxs)(c,{state:`filled-and-ghost`,children:[(0,l.jsxs)(r,{sender:`assistant`,children:[(0,l.jsx)(a,{children:`Filled assistant bubble`}),(0,l.jsx)(a,{variant:`ghost`,width:`100%`,children:`Ghost assistant content spans the message column`})]}),(0,l.jsxs)(r,{sender:`user`,children:[(0,l.jsx)(a,{children:`Filled user bubble`}),(0,l.jsx)(a,{variant:`ghost`,children:`Ghost user content`})]})]}),(0,l.jsx)(c,{state:`assistant-group`,children:(0,l.jsxs)(r,{sender:`assistant`,children:[(0,l.jsx)(a,{"data-testid":`assistant-group-first`,group:`first`,name:`Navi`,children:`First assistant bubble`}),(0,l.jsx)(a,{"data-testid":`assistant-group-middle`,group:`middle`,children:`Middle assistant bubble`}),(0,l.jsx)(a,{"data-testid":`assistant-group-last`,group:`last`,metadata:(0,l.jsx)(s,{timestamp:`10:32 AM`}),children:`Last assistant bubble`})]})}),(0,l.jsx)(c,{state:`user-group`,children:(0,l.jsxs)(r,{sender:`user`,children:[(0,l.jsx)(a,{"data-testid":`user-group-first`,group:`first`,name:`You`,children:`First user bubble`}),(0,l.jsx)(a,{"data-testid":`user-group-middle`,group:`middle`,children:`Middle user bubble`}),(0,l.jsx)(a,{"data-testid":`user-group-last`,group:`last`,metadata:(0,l.jsx)(s,{timestamp:`10:33 AM`,status:`read`}),children:`Last user bubble`})]})}),(0,l.jsx)(c,{state:`density`,children:[`compact`,`balanced`,`spacious`].map(e=>(0,l.jsx)(r,{sender:`assistant`,density:e,children:(0,l.jsxs)(a,{children:[e,` density`]})},e))}),(0,l.jsx)(c,{state:`numeric-slots`,children:(0,l.jsx)(r,{sender:`assistant`,children:(0,l.jsx)(a,{"data-testid":`numeric-slot-bubble`,name:0,metadata:0,children:`Zero is valid React content`})})}),(0,l.jsx)(c,{state:`empty-content`,children:(0,l.jsx)(r,{sender:`assistant`,children:(0,l.jsx)(a,{children:null})})})]})},h={render:()=>(0,l.jsx)(`div`,{"data-chat-message-bubble-narrow":!0,style:{...d,width:320,maxWidth:`100%`},children:(0,l.jsxs)(c,{state:`narrow-long-content`,children:[(0,l.jsx)(r,{sender:`assistant`,children:(0,l.jsx)(a,{name:`Navi`,children:`A long message wraps without forcing horizontal scrolling, including the unbroken value abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789.`})}),(0,l.jsx)(r,{sender:`user`,children:(0,l.jsx)(a,{width:`100%`,children:`A full-width bubble remains inside its narrow parent.`})})]})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div data-chat-message-bubble-audit style={fixtureStyle}>
      <Panel state="sender-alignment">
        <ChatMessage sender="assistant">
          <ChatMessageBubble name="Navi">Assistant message</ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="user">
          <ChatMessageBubble name="You">User message</ChatMessageBubble>
        </ChatMessage>
      </Panel>

      <Panel state="filled-and-ghost">
        <ChatMessage sender="assistant">
          <ChatMessageBubble>Filled assistant bubble</ChatMessageBubble>
          <ChatMessageBubble variant="ghost" width="100%">
            Ghost assistant content spans the message column
          </ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="user">
          <ChatMessageBubble>Filled user bubble</ChatMessageBubble>
          <ChatMessageBubble variant="ghost">
            Ghost user content
          </ChatMessageBubble>
        </ChatMessage>
      </Panel>

      <Panel state="assistant-group">
        <ChatMessage sender="assistant">
          <ChatMessageBubble data-testid="assistant-group-first" group="first" name="Navi">
            First assistant bubble
          </ChatMessageBubble>
          <ChatMessageBubble data-testid="assistant-group-middle" group="middle">
            Middle assistant bubble
          </ChatMessageBubble>
          <ChatMessageBubble data-testid="assistant-group-last" group="last" metadata={<ChatMessageMetadata timestamp="10:32 AM" />}>
            Last assistant bubble
          </ChatMessageBubble>
        </ChatMessage>
      </Panel>

      <Panel state="user-group">
        <ChatMessage sender="user">
          <ChatMessageBubble data-testid="user-group-first" group="first" name="You">
            First user bubble
          </ChatMessageBubble>
          <ChatMessageBubble data-testid="user-group-middle" group="middle">
            Middle user bubble
          </ChatMessageBubble>
          <ChatMessageBubble data-testid="user-group-last" group="last" metadata={<ChatMessageMetadata timestamp="10:33 AM" status="read" />}>
            Last user bubble
          </ChatMessageBubble>
        </ChatMessage>
      </Panel>

      <Panel state="density">
        {(['compact', 'balanced', 'spacious'] as const).map(density => <ChatMessage key={density} sender="assistant" density={density}>
            <ChatMessageBubble>{density} density</ChatMessageBubble>
          </ChatMessage>)}
      </Panel>

      <Panel state="numeric-slots">
        <ChatMessage sender="assistant">
          <ChatMessageBubble data-testid="numeric-slot-bubble" name={0} metadata={0}>
            Zero is valid React content
          </ChatMessageBubble>
        </ChatMessage>
      </Panel>

      <Panel state="empty-content">
        <ChatMessage sender="assistant">
          <ChatMessageBubble>{null}</ChatMessageBubble>
        </ChatMessage>
      </Panel>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div data-chat-message-bubble-narrow style={{
    ...fixtureStyle,
    width: 320,
    maxWidth: '100%'
  }}>
      <Panel state="narrow-long-content">
        <ChatMessage sender="assistant">
          <ChatMessageBubble name="Navi">
            A long message wraps without forcing horizontal scrolling, including
            the unbroken value
            abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789.
          </ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="user">
          <ChatMessageBubble width="100%">
            A full-width bubble remains inside its narrow parent.
          </ChatMessageBubble>
        </ChatMessage>
      </Panel>
    </div>
}`,...h.parameters?.docs?.source}}},g=[`States`,`NarrowLongContent`]})))()}_();export{h as NarrowLongContent,m as States,g as __namedExportsOrder,u as default};