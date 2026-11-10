import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Icon-BmO5FtDV.js";import{n as i,t as a}from"./ChatMessageList-yhs-WclZ.js";import{n as o,t as s}from"./ChatSystemMessage-vYTSrD0o.js";var c,l,u,d,f,p;function m(){return(m=e((()=>{i(),o(),n(),c=t(),l=`Messages are end-to-end encrypted for everyone in this conversation and on every signed-in device.`,u={title:`a11y/ChatSystemMessage audit`,component:s,args:{children:`Conversation started`},tags:[`no-visual`],parameters:{docs:{description:{component:`Single-subject fixtures for exact-head ChatSystemMessage audit evidence. The dedicated namespace is excluded from stable visual baselines and explicitly routed to the component accessibility owner.`}}}},d={render:()=>(0,c.jsxs)(`div`,{style:{display:`grid`,gap:24,width:480,maxWidth:`100%`},children:[(0,c.jsx)(s,{"data-system-message-case":`default`,children:`Conversation started`}),(0,c.jsx)(s,{"data-system-message-case":`default-icon`,icon:(0,c.jsx)(r,{icon:`info`,size:`sm`}),children:`Messages are end-to-end encrypted`}),(0,c.jsx)(s,{"data-system-message-case":`divider`,variant:`divider`,children:`Today`}),(0,c.jsx)(s,{"data-system-message-case":`divider-icon`,icon:(0,c.jsx)(r,{icon:`info`,size:`sm`}),variant:`divider`,children:`March 15, 2026`}),(0,c.jsx)(a,{align:`top`,children:(0,c.jsx)(s,{"data-system-message-case":`nested-log`,children:`Conversation archived`})})]})},f={render:()=>(0,c.jsxs)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`minmax(0, 1fr)`,width:280,maxWidth:`100%`},children:[(0,c.jsx)(s,{"data-system-message-case":`narrow-default`,icon:(0,c.jsx)(r,{icon:`info`,size:`sm`}),children:`Conversation marked as resolved`}),(0,c.jsx)(s,{"data-system-message-case":`narrow-divider`,variant:`divider`,children:`March 15, 2026`}),(0,c.jsx)(s,{"data-system-message-case":`long-default`,icon:(0,c.jsx)(r,{icon:`info`,size:`sm`}),children:l})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    width: 480,
    maxWidth: '100%'
  }}>
      <ChatSystemMessage data-system-message-case="default">
        Conversation started
      </ChatSystemMessage>
      <ChatSystemMessage data-system-message-case="default-icon" icon={<Icon icon="info" size="sm" />}>
        Messages are end-to-end encrypted
      </ChatSystemMessage>
      <ChatSystemMessage data-system-message-case="divider" variant="divider">
        Today
      </ChatSystemMessage>
      <ChatSystemMessage data-system-message-case="divider-icon" icon={<Icon icon="info" size="sm" />} variant="divider">
        March 15, 2026
      </ChatSystemMessage>
      <ChatMessageList align="top">
        <ChatSystemMessage data-system-message-case="nested-log">
          Conversation archived
        </ChatSystemMessage>
      </ChatMessageList>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    gridTemplateColumns: 'minmax(0, 1fr)',
    width: 280,
    maxWidth: '100%'
  }}>
      <ChatSystemMessage data-system-message-case="narrow-default" icon={<Icon icon="info" size="sm" />}>
        Conversation marked as resolved
      </ChatSystemMessage>
      <ChatSystemMessage data-system-message-case="narrow-divider" variant="divider">
        March 15, 2026
      </ChatSystemMessage>
      <ChatSystemMessage data-system-message-case="long-default" icon={<Icon icon="info" size="sm" />}>
        {LONG_SYSTEM_MESSAGE}
      </ChatSystemMessage>
    </div>
}`,...f.parameters?.docs?.source}}},p=[`States`,`Narrow`]})))()}m();export{f as Narrow,d as States,p as __namedExportsOrder,u as default};