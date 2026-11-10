import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./ChatMessageList-yhs-WclZ.js";import{n as o,t as s}from"./ChatMessage-LFMdokYE.js";import{n as c,t as l}from"./ChatMessageBubble-cWvrxd0T.js";import{n as u,t as d}from"./ChatSystemMessage-vYTSrD0o.js";var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{o(),c(),i(),u(),n(),f=t(),p={title:`Core/ChatMessageList`,component:a,tags:[`autodocs`],args:{children:null}},m=()=>new Promise(()=>{}),h={args:{density:`balanced`,align:`bottom`,isStreaming:!1},render:e=>(0,f.jsx)(`div`,{style:{height:440,display:`flex`,flexDirection:`column`},children:(0,f.jsxs)(a,{...e,children:[(0,f.jsx)(d,{variant:`divider`,children:`Today`}),(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:`Could you summarize the update?`})}),(0,f.jsx)(s,{sender:`assistant`,children:(0,f.jsx)(l,{children:`The issue is resolved. The next update will include the remaining details.`})})]})})},g={render:()=>(0,f.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,f.jsx)(`div`,{style:{width:280,height:320,display:`flex`,flexDirection:`column`},children:(0,f.jsx)(a,{"aria-label":`Text empty state`,emptyState:(0,f.jsx)(r,{children:`No messages yet`}),children:[]})}),(0,f.jsx)(`div`,{style:{width:280,height:320,display:`flex`,flexDirection:`column`},children:(0,f.jsx)(a,{"aria-label":`Numeric empty state`,emptyState:0,children:[]})})]})},_={render:()=>(0,f.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[`compact`,`balanced`,`spacious`].map((e,t)=>(0,f.jsxs)(`div`,{style:{width:280,height:320,display:`flex`,flexDirection:`column`},children:[(0,f.jsxs)(r,{type:`supporting`,children:[e,` / `,t===0?`top`:`bottom`]}),(0,f.jsx)(a,{density:e,align:t===0?`top`:`bottom`,children:(0,f.jsx)(s,{sender:`assistant`,children:(0,f.jsx)(l,{children:`A short conversation.`})})})]},e))})},v={render:()=>(0,f.jsx)(`div`,{style:{height:220,overflowY:`auto`},children:(0,f.jsx)(a,{align:`top`,children:Array.from({length:8},(e,t)=>(0,f.jsx)(s,{sender:t%2==0?`user`:`assistant`,children:(0,f.jsxs)(l,{children:[`Conversation item `,t+1,`. This message wraps on narrower screens while the surrounding transcript remains scrollable.`]})},t))})})},y={render:()=>(0,f.jsx)(`div`,{style:{height:320,display:`flex`,flexDirection:`column`},children:(0,f.jsx)(a,{align:`top`,scrollToTopAction:m,children:(0,f.jsx)(s,{sender:`assistant`,children:(0,f.jsx)(l,{children:`Earlier message remains readable while older messages load.`})})})})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    density: 'balanced',
    align: 'bottom',
    isStreaming: false
  },
  render: args => <div style={{
    height: 440,
    display: 'flex',
    flexDirection: 'column'
  }}>
      <ChatMessageList {...args}>
        <ChatSystemMessage variant="divider">Today</ChatSystemMessage>
        <ChatMessage sender="user">
          <ChatMessageBubble>Could you summarize the update?</ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="assistant">
          <ChatMessageBubble>
            The issue is resolved. The next update will include the remaining
            details.
          </ChatMessageBubble>
        </ChatMessage>
      </ChatMessageList>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16
  }}>
      <div style={{
      width: 280,
      height: 320,
      display: 'flex',
      flexDirection: 'column'
    }}>
        <ChatMessageList aria-label="Text empty state" emptyState={<Text>No messages yet</Text>}>
          {[]}
        </ChatMessageList>
      </div>
      <div style={{
      width: 280,
      height: 320,
      display: 'flex',
      flexDirection: 'column'
    }}>
        <ChatMessageList aria-label="Numeric empty state" emptyState={0}>
          {[]}
        </ChatMessageList>
      </div>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16
  }}>
      {(['compact', 'balanced', 'spacious'] as const).map((density, index) => <div key={density} style={{
      width: 280,
      height: 320,
      display: 'flex',
      flexDirection: 'column'
    }}>
          <Text type="supporting">
            {density} / {index === 0 ? 'top' : 'bottom'}
          </Text>
          <ChatMessageList density={density} align={index === 0 ? 'top' : 'bottom'}>
            <ChatMessage sender="assistant">
              <ChatMessageBubble>A short conversation.</ChatMessageBubble>
            </ChatMessage>
          </ChatMessageList>
        </div>)}
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 220,
    overflowY: 'auto'
  }}>
      <ChatMessageList align="top">
        {Array.from({
        length: 8
      }, (_, index) => <ChatMessage key={index} sender={index % 2 === 0 ? 'user' : 'assistant'}>
            <ChatMessageBubble>
              Conversation item {index + 1}. This message wraps on narrower
              screens while the surrounding transcript remains scrollable.
            </ChatMessageBubble>
          </ChatMessage>)}
      </ChatMessageList>
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 320,
    display: 'flex',
    flexDirection: 'column'
  }}>
      <ChatMessageList align="top" scrollToTopAction={pendingOlderMessages}>
        <ChatMessage sender="assistant">
          <ChatMessageBubble>
            Earlier message remains readable while older messages load.
          </ChatMessageBubble>
        </ChatMessage>
      </ChatMessageList>
    </div>
}`,...y.parameters?.docs?.source}}},b=[`Conversation`,`Empty`,`DensityAndAlignment`,`Overflow`,`LoadingOlder`]})))()}x();export{h as Conversation,_ as DensityAndAlignment,g as Empty,y as LoadingOlder,v as Overflow,b as __namedExportsOrder,p as default};