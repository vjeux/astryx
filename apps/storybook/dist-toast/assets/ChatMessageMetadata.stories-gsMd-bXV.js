import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-DoGM0DEN.js";import{n as i,t as a}from"./ChatMessage-LFMdokYE.js";import{n as o,t as s}from"./ChatMessageBubble-cWvrxd0T.js";import{n as c,t as l}from"./ChatMessageMetadata-mropitsV.js";var u,d,f,p,m;function h(){return(h=e((()=>{i(),o(),c(),n(),u=t(),d={title:`Core/ChatMessageMetadata`,component:l,tags:[`autodocs`]},f={render:()=>(0,u.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:640},children:[[`sending`,`sent`,`delivered`,`read`,`error`].map(e=>(0,u.jsx)(`section`,{"data-metadata-case":`status-${e}`,children:(0,u.jsx)(a,{sender:`user`,children:(0,u.jsxs)(s,{metadata:(0,u.jsx)(l,{timestamp:`10:30`,status:e}),children:[e,` message`]})})},e)),(0,u.jsx)(`section`,{"data-metadata-case":`assistant-footer`,children:(0,u.jsxs)(a,{sender:`assistant`,children:[(0,u.jsx)(s,{children:`Reply`}),(0,u.jsx)(l,{timestamp:`10:31`,footer:(0,u.jsx)(r,{label:`Copy reply`,onClick:()=>{},size:`sm`})})]})}),(0,u.jsx)(`section`,{"data-metadata-case":`empty-footer`,children:(0,u.jsx)(a,{sender:`assistant`,children:(0,u.jsx)(l,{timestamp:`10:32`,footer:!1})})}),(0,u.jsx)(`section`,{"data-metadata-case":`empty-timestamp`,children:(0,u.jsx)(a,{sender:`assistant`,children:(0,u.jsx)(l,{timestamp:!1,footer:`Model info`})})}),(0,u.jsx)(`section`,{"data-metadata-case":`empty-row`,style:{minHeight:24},children:(0,u.jsx)(a,{sender:`assistant`,children:(0,u.jsx)(l,{timestamp:``,footer:!1})})}),(0,u.jsx)(`section`,{"data-metadata-case":`numeric-slots`,children:(0,u.jsx)(a,{sender:`user`,children:(0,u.jsx)(l,{timestamp:0,footer:0})})}),(0,u.jsx)(`section`,{"data-metadata-case":`standalone`,children:(0,u.jsx)(l,{timestamp:`11:00`,status:`read`})})]})},p={render:()=>(0,u.jsx)(`div`,{"data-metadata-case":`narrow-overflow`,style:{width:320,maxWidth:`100%`},children:(0,u.jsx)(a,{sender:`assistant`,children:(0,u.jsx)(l,{timestamp:`10:32`,footer:`A longer metadata description that can grow when translated into a different language`,status:`delivered`})})})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    maxWidth: 640
  }}>
      {(['sending', 'sent', 'delivered', 'read', 'error'] as const).map(status => <section key={status} data-metadata-case={\`status-\${status}\`}>
            <ChatMessage sender="user">
              <ChatMessageBubble metadata={<ChatMessageMetadata timestamp="10:30" status={status} />}>
                {status} message
              </ChatMessageBubble>
            </ChatMessage>
          </section>)}
      <section data-metadata-case="assistant-footer">
        <ChatMessage sender="assistant">
          <ChatMessageBubble>Reply</ChatMessageBubble>
          <ChatMessageMetadata timestamp="10:31" footer={<Button label="Copy reply" onClick={() => {}} size="sm" />} />
        </ChatMessage>
      </section>
      <section data-metadata-case="empty-footer">
        <ChatMessage sender="assistant">
          <ChatMessageMetadata timestamp="10:32" footer={false} />
        </ChatMessage>
      </section>
      <section data-metadata-case="empty-timestamp">
        <ChatMessage sender="assistant">
          <ChatMessageMetadata timestamp={false} footer="Model info" />
        </ChatMessage>
      </section>
      <section data-metadata-case="empty-row" style={{
      minHeight: 24
    }}>
        <ChatMessage sender="assistant">
          <ChatMessageMetadata timestamp="" footer={false} />
        </ChatMessage>
      </section>
      <section data-metadata-case="numeric-slots">
        <ChatMessage sender="user">
          <ChatMessageMetadata timestamp={0} footer={0} />
        </ChatMessage>
      </section>
      <section data-metadata-case="standalone">
        <ChatMessageMetadata timestamp="11:00" status="read" />
      </section>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div data-metadata-case="narrow-overflow" style={{
    width: 320,
    maxWidth: '100%'
  }}>
      <ChatMessage sender="assistant">
        <ChatMessageMetadata timestamp="10:32" footer="A longer metadata description that can grow when translated into a different language" status="delivered" />
      </ChatMessage>
    </div>
}`,...p.parameters?.docs?.source}}},m=[`States`,`NarrowOverflow`]})))()}h();export{p as NarrowOverflow,f as States,m as __namedExportsOrder,d as default};