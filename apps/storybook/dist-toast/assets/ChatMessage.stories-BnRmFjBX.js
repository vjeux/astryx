import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Avatar-C6K3OBt3.js";import{n as o,t as s}from"./ChatMessageList-yhs-WclZ.js";import{n as c,t as l}from"./ChatMessage-LFMdokYE.js";import{n as u,t as d}from"./ChatMessageBubble-cWvrxd0T.js";function f(){return null}var p,m,h,g;function _(){return(_=e((()=>{c(),u(),o(),i(),n(),p=t(),m={title:`Core/ChatMessage`,component:l,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`}},h={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:`min(720px, 90vw)`},children:[(0,p.jsxs)(`section`,{"aria-label":`Sender roles`,style:{display:`flex`,flexDirection:`column`,gap:20},children:[(0,p.jsx)(l,{sender:`assistant`,avatar:(0,p.jsx)(a,{name:`Astra`,size:`md`}),name:`Astra`,metadata:(0,p.jsx)(r,{type:`supporting`,color:`secondary`,children:`Updated just now`}),children:(0,p.jsx)(r,{type:`body`,children:`Here is the summary you asked for, with the sender identity and message metadata attached to the message wrapper.`})}),(0,p.jsx)(l,{sender:`user`,children:(0,p.jsx)(d,{children:`Thanks. Keep the follow-up concise and include the next action.`})}),(0,p.jsx)(l,{sender:`system`,avatar:(0,p.jsx)(a,{name:`System`,size:`md`}),name:`System`,metadata:(0,p.jsx)(`span`,{children:`Suppressed metadata`}),children:(0,p.jsx)(r,{type:`supporting`,color:`secondary`,children:`Conversation archived`})})]}),(0,p.jsx)(`section`,{"aria-label":`Density precedence`,children:(0,p.jsxs)(s,{density:`compact`,style:{border:`1px solid var(--color-border-primary)`,borderRadius:`var(--radius-container)`},children:[(0,p.jsxs)(l,{sender:`assistant`,avatar:(0,p.jsx)(a,{name:`Astra`,size:`sm`}),children:[(0,p.jsx)(d,{children:`Inherited compact density`}),(0,p.jsx)(d,{children:`Second grouped response`})]}),(0,p.jsx)(l,{sender:`user`,density:`spacious`,children:(0,p.jsx)(d,{children:`Explicit spacious density overrides the compact list.`})})]})}),(0,p.jsxs)(`section`,{"aria-label":`Slots that render nothing`,style:{display:`flex`,flexDirection:`column`,gap:20},children:[(0,p.jsx)(l,{sender:`assistant`,avatar:(0,p.jsx)(f,{}),name:(0,p.jsx)(p.Fragment,{}),metadata:[],children:(0,p.jsx)(d,{children:`Empty avatar, name, and metadata slots collapse; the message keeps its fallback label.`})}),(0,p.jsx)(l,{sender:`user`,avatar:!1,name:``,metadata:!1,children:(0,p.jsx)(d,{children:`Booleans and empty strings render no slot.`})})]}),(0,p.jsx)(`section`,{"aria-label":`Narrow long content`,style:{width:320,maxWidth:`100%`},children:(0,p.jsx)(l,{sender:`assistant`,name:`Astra`,children:(0,p.jsx)(d,{children:`Long messages wrap inside a narrow conversation without changing the sender alignment or forcing the message beyond its container. This sentence intentionally expands the content across several lines.`})})})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 'min(720px, 90vw)'
  }}>
      <section aria-label="Sender roles" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
        <ChatMessage sender="assistant" avatar={<Avatar name="Astra" size="md" />} name="Astra" metadata={<Text type="supporting" color="secondary">
              Updated just now
            </Text>}>
          <Text type="body">
            Here is the summary you asked for, with the sender identity and
            message metadata attached to the message wrapper.
          </Text>
        </ChatMessage>

        <ChatMessage sender="user">
          <ChatMessageBubble>
            Thanks. Keep the follow-up concise and include the next action.
          </ChatMessageBubble>
        </ChatMessage>

        <ChatMessage sender="system" avatar={<Avatar name="System" size="md" />} name="System" metadata={<span>Suppressed metadata</span>}>
          <Text type="supporting" color="secondary">
            Conversation archived
          </Text>
        </ChatMessage>
      </section>

      <section aria-label="Density precedence">
        <ChatMessageList density="compact" style={{
        border: '1px solid var(--color-border-primary)',
        borderRadius: 'var(--radius-container)'
      }}>
          <ChatMessage sender="assistant" avatar={<Avatar name="Astra" size="sm" />}>
            <ChatMessageBubble>Inherited compact density</ChatMessageBubble>
            <ChatMessageBubble>Second grouped response</ChatMessageBubble>
          </ChatMessage>
          <ChatMessage sender="user" density="spacious">
            <ChatMessageBubble>
              Explicit spacious density overrides the compact list.
            </ChatMessageBubble>
          </ChatMessage>
        </ChatMessageList>
      </section>

      <section aria-label="Slots that render nothing" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
        <ChatMessage sender="assistant" avatar={<RendersNothing />} name={<></>} metadata={[]}>
          <ChatMessageBubble>
            Empty avatar, name, and metadata slots collapse; the message keeps
            its fallback label.
          </ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="user" avatar={false} name="" metadata={false}>
          <ChatMessageBubble>
            Booleans and empty strings render no slot.
          </ChatMessageBubble>
        </ChatMessage>
      </section>

      <section aria-label="Narrow long content" style={{
      width: 320,
      maxWidth: '100%'
    }}>
        <ChatMessage sender="assistant" name="Astra">
          <ChatMessageBubble>
            Long messages wrap inside a narrow conversation without changing the
            sender alignment or forcing the message beyond its container. This
            sentence intentionally expands the content across several lines.
          </ChatMessageBubble>
        </ChatMessage>
      </section>
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`]})))()}_();export{h as Default,g as __namedExportsOrder,m as default};