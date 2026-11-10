import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Icon-BmO5FtDV.js";import{n as i,t as a}from"./ChatTokenizedText-BQmTNS_f.js";import{n as o,t as s}from"./ChatMessage-LFMdokYE.js";import{n as c,t as l}from"./ChatMessageBubble-cWvrxd0T.js";import{n as u,t as d}from"./UserCircleIcon-Bkrij0bu.js";var f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{i(),o(),c(),n(),u(),f=t(),p={title:`Core/ChatTokenizedText`,component:a,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,f.jsx)(`div`,{style:{boxSizing:`border-box`,width:`min(500px, calc(100vw - 32px))`,padding:16},children:(0,f.jsx)(e,{})})]},m=[{value:`@cindy`,label:`@Cindy Zhang`,variant:`blue`},{value:`@navi`,label:`@Navi`,variant:`blue`},{value:`@alex`,label:`@Alex Rivera`,variant:`blue`}],h={render:()=>(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{tokens:m,children:`Hey @cindy can you review this?`})})})},g={render:()=>(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{tokens:m,children:`@cindy and @alex can @navi help with the review?`})})})},_={render:()=>(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{children:`Just a regular message with no mentions.`})})})},v={render:()=>(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{tokens:[{value:`@cindy`,label:`@Cindy`,variant:`blue`},{value:`#bug`,label:`#bug`,variant:`red`},{value:`#feat`,label:`#feature`,variant:`green`}],children:`@cindy filed #bug and #feat for the sprint`})})})},y={render:()=>(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{tokens:m,children:`@cindy this is for @navi`})})})},b={render:()=>(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{tokens:[{value:`@cindy`,label:`@Cindy Zhang`,variant:`blue`,icon:(0,f.jsx)(r,{icon:d,size:`sm`})},{value:`@navi`,render:()=>(0,f.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:4,height:20,padding:`0 8px`,borderRadius:999,background:`#e8def8`,fontSize:12},children:[(0,f.jsx)(`span`,{"aria-hidden":!0,children:`★`}),`@Navi`]})}],children:`Hey @cindy and @navi can you take a look?`})})})},x={render:()=>(0,f.jsx)(`div`,{style:{maxWidth:288},children:(0,f.jsx)(s,{sender:`user`,children:(0,f.jsx)(l,{children:(0,f.jsx)(a,{tokens:[{value:``,label:`Ignored`},{value:`@alice`,label:`@Alice Rivera`,variant:`blue`}],children:`A longer localized message for @alice remains readable in a narrow conversation when an empty token definition is present.`})})})})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessage sender="user">
      <ChatMessageBubble>
        <ChatTokenizedText tokens={mentionTokens}>
          Hey @cindy can you review this?
        </ChatTokenizedText>
      </ChatMessageBubble>
    </ChatMessage>
}`,...h.parameters?.docs?.source},description:{story:`Single mention token`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessage sender="user">
      <ChatMessageBubble>
        <ChatTokenizedText tokens={mentionTokens}>
          @cindy and @alex can @navi help with the review?
        </ChatTokenizedText>
      </ChatMessageBubble>
    </ChatMessage>
}`,...g.parameters?.docs?.source},description:{story:`Multiple mentions in one message`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessage sender="user">
      <ChatMessageBubble>
        <ChatTokenizedText>
          Just a regular message with no mentions.
        </ChatTokenizedText>
      </ChatMessageBubble>
    </ChatMessage>
}`,..._.parameters?.docs?.source},description:{story:`No tokens — renders as plain text`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessage sender="user">
      <ChatMessageBubble>
        <ChatTokenizedText tokens={[{
        value: '@cindy',
        label: '@Cindy',
        variant: 'blue'
      }, {
        value: '#bug',
        label: '#bug',
        variant: 'red'
      }, {
        value: '#feat',
        label: '#feature',
        variant: 'green'
      }]}>
          @cindy filed #bug and #feat for the sprint
        </ChatTokenizedText>
      </ChatMessageBubble>
    </ChatMessage>
}`,...v.parameters?.docs?.source},description:{story:`Tokens with different variants`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessage sender="user">
      <ChatMessageBubble>
        <ChatTokenizedText tokens={mentionTokens}>
          @cindy this is for @navi
        </ChatTokenizedText>
      </ChatMessageBubble>
    </ChatMessage>
}`,...y.parameters?.docs?.source},description:{story:`Token at start and end of message`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessage sender="user">
      <ChatMessageBubble>
        <ChatTokenizedText tokens={[{
        value: '@cindy',
        label: '@Cindy Zhang',
        variant: 'blue',
        icon: <Icon icon={UserCircleIcon} size="sm" />
      }, {
        value: '@navi',
        render: () => <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          height: 20,
          padding: '0 8px',
          borderRadius: 999,
          background: '#e8def8',
          fontSize: 12
        }}>
                  <span aria-hidden>★</span>
                  @Navi
                </span>
      }]}>
          Hey @cindy and @navi can you take a look?
        </ChatTokenizedText>
      </ChatMessageBubble>
    </ChatMessage>
}`,...b.parameters?.docs?.source},description:{story:`Tokens carrying an icon, and a fully custom token — both sit on the line`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 288
  }}>
      <ChatMessage sender="user">
        <ChatMessageBubble>
          <ChatTokenizedText tokens={[{
          value: '',
          label: 'Ignored'
        }, {
          value: '@alice',
          label: '@Alice Rivera',
          variant: 'blue'
        }]}>
            A longer localized message for @alice remains readable in a narrow
            conversation when an empty token definition is present.
          </ChatTokenizedText>
        </ChatMessageBubble>
      </ChatMessage>
    </div>
}`,...x.parameters?.docs?.source},description:{story:`Empty token values are ignored in a narrow message.`,...x.parameters?.docs?.description}}},S=[`SingleToken`,`MultipleTokens`,`PlainText`,`MixedVariants`,`TokensAtEdges`,`IconAndCustomTokens`,`EmptyValueNarrow`]})))()}C();export{x as EmptyValueNarrow,b as IconAndCustomTokens,v as MixedVariants,g as MultipleTokens,_ as PlainText,h as SingleToken,y as TokensAtEdges,S as __namedExportsOrder,p as default};