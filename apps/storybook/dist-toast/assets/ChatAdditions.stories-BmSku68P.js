import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{a as c,i as l}from"./focusOutline.stylex-DWroqGen.js";import{n as u,t as d}from"./Button-DoGM0DEN.js";import{n as f,t as p}from"./Popover-CgJiFJLM.js";import{r as m,t as h}from"./Tooltip-CmQs04jO.js";import{n as g,t as _}from"./useGridFocus-BDVVxsAt.js";import{n as v,t as y}from"./ChatMessageList-yhs-WclZ.js";import{n as b,t as x}from"./ChatMessage-LFMdokYE.js";import{n as S,t as C}from"./ChatMessageBubble-cWvrxd0T.js";import{n as w,t as T}from"./TextInput-LGxpinPt.js";import{n as E,t as D}from"./ChatTypingIndicator-vJhlfdsg.js";function O({onSelect:e,emojis:t=j,label:r=`Pick an emoji`,searchLabel:i=`Search emoji`,children:s,xstyle:c,className:u,style:d,"data-testid":f,ref:m}){let[h,_]=(0,k.useState)(!1),[v,y]=(0,k.useState)(``),{gridRef:b,handleKeyDown:x}=g({columns:M}),S=v.trim().toLowerCase(),C=S===``?t:t.filter(e=>e.name.toLowerCase().includes(S)||e.emoji===S),w=e=>{_(e),e||y(``)},E=t=>{e(t),w(!1)};return(0,A.jsx)(p,{isOpen:h,onOpenChange:w,label:r,placement:`below`,alignment:`start`,"data-testid":f,content:(0,A.jsxs)(`div`,{ref:m,...a(o(`chat-emoji-picker`),n(N.panel,c),u,d),children:[(0,A.jsx)(T,{label:i,isLabelHidden:!0,size:`sm`,placeholder:i,value:v,onChange:y,hasClear:!0}),C.length===0?(0,A.jsxs)(`div`,{className:`astryxce4md1 astryx7a5moj astryx9ynric astryx141an7d astryxv1l7n4`,children:[`No emoji match “`,v.trim(),`”.`]}):(0,A.jsx)(`div`,{ref:b,role:`group`,"aria-label":`Emoji`,onKeyDown:x,className:`astryxrvj5dj astryx12m0uhf astryx1lsbc85`,children:C.map(e=>(0,A.jsx)(`button`,{type:`button`,"data-emoji":e.emoji,"aria-label":`React with ${e.name}`,onClick:()=>E(e.emoji),...n(l.focusVisible,N.cell),children:(0,A.jsx)(`span`,{"aria-hidden":`true`,children:e.emoji})},e.emoji))})]}),children:s})}var k,A,j,M,N;function P(){return(P=e((()=>{k=t(),r(),c(),s(),f(),w(),_(),A=i(),j=[{emoji:`👍`,name:`thumbs up`},{emoji:`❤️`,name:`heart`},{emoji:`😂`,name:`joy`},{emoji:`🎉`,name:`tada`},{emoji:`😮`,name:`wow`},{emoji:`😢`,name:`cry`},{emoji:`🔥`,name:`fire`},{emoji:`👀`,name:`eyes`},{emoji:`✅`,name:`check`},{emoji:`🙏`,name:`pray`},{emoji:`💯`,name:`hundred`},{emoji:`🚀`,name:`rocket`},{emoji:`😍`,name:`heart eyes`},{emoji:`🤔`,name:`thinking`},{emoji:`👋`,name:`wave`},{emoji:`⭐`,name:`star`}],M=8,N={panel:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1txdalj`,kzqmXN:`astryx1dz1jew`,kB7OPa:`astryx9f619`,$$css:!0},cell:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kzqmXN:`astryx1td3qas`,kZKoxP:`astryx10w6t97`,kaIpWk:`astryxx3sua9`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kWkggS:`astryxjbqb8w astryx1iutq3a astryxoevpu5`,kkrTdU:`astryx1ypdohk astryx16khyan`,kGuDYH:`astryxosj86m`,kLWn49:`astryxw6l6zx`,kInvED:`astryx1wfwxd8 astryx1bqaal`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxuedmi6 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,$$css:!0}},O.displayName=`ChatEmojiPicker`,O.__docgenInfo={description:`Popover emoji grid with shortname filtering and arrow-key navigation.

Wraps its trigger button in a Popover. Typing in the filter input narrows
the grid by shortname; arrow keys move focus between emoji; picking one
calls \`onSelect\` and closes the popover (focus returns to the trigger).

@example
\`\`\`
<ChatEmojiPicker onSelect={(emoji) => addReaction(emoji)}>
  <button type="button" aria-label="Add reaction">🙂</button>
</ChatEmojiPicker>
\`\`\``,methods:[],displayName:`ChatEmojiPicker`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the popover panel element`},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(emoji: string) => void`,signature:{arguments:[{type:{name:`string`},name:`emoji`}],return:{name:`void`}}},description:`Called with the picked emoji character.
The popover closes itself after selection.`},emojis:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`ChatEmojiOption`}],raw:`ReadonlyArray<ChatEmojiOption>`},description:`Emoji options rendered in the grid (8 per row).
@default DEFAULT_CHAT_EMOJIS`,defaultValue:{value:`[
  {emoji: '👍', name: 'thumbs up'},
  {emoji: '❤️', name: 'heart'},
  {emoji: '😂', name: 'joy'},
  {emoji: '🎉', name: 'tada'},
  {emoji: '😮', name: 'wow'},
  {emoji: '😢', name: 'cry'},
  {emoji: '🔥', name: 'fire'},
  {emoji: '👀', name: 'eyes'},
  {emoji: '✅', name: 'check'},
  {emoji: '🙏', name: 'pray'},
  {emoji: '💯', name: 'hundred'},
  {emoji: '🚀', name: 'rocket'},
  {emoji: '😍', name: 'heart eyes'},
  {emoji: '🤔', name: 'thinking'},
  {emoji: '👋', name: 'wave'},
  {emoji: '⭐', name: 'star'},
]`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the popover dialog.
@default 'Pick an emoji'`,defaultValue:{value:`'Pick an emoji'`,computed:!1}},searchLabel:{required:!1,tsType:{name:`string`},description:`Placeholder and hidden label for the filter input.
@default 'Search emoji'`,defaultValue:{value:`'Search emoji'`,computed:!1}},children:{required:!0,tsType:{name:`ReactNode`},description:"Trigger element — must contain a `<button>` (Popover wires it up)."},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for the popover content.`}},composes:[`Omit`]}})))()}function F(e){if(e.label!=null)return e.label;let t=e.count===1?`reaction`:`reactions`;return`${e.count} ${t} with ${e.emoji}`}function I({reactions:e,onToggle:t,onAdd:r,emojis:i,addLabel:s=`Add reaction`,label:c=`Reactions`,xstyle:l,className:u,style:d,"data-testid":f,ref:p}){return(0,L.jsxs)(`div`,{ref:p,role:`group`,"aria-label":c,"data-testid":f,...a(o(`chat-reaction-bar`),n(R.root,l),u,d),children:[e.map(e=>{let n=e.isSelected===!0,r=(0,L.jsxs)(`button`,{type:`button`,"aria-pressed":n,"aria-label":F(e),onClick:()=>t?.(e.emoji),...{0:{className:`astryx3nfvp2 astryx6s0dn4 astryxzye2dw astryxxk0z11 astryxf314gf astryxjspbzw astryxmkeg23 astryx1y0btm7 astryx9r1u3d astryxs8to0k astryx1xwh4np astryxwmxj5m astryx1ypdohk astryx16khyan astryx9ynric astryx9f619 astryxq90yva astryxuedmi6 astryx12w9bfk astryxlr8y92`},1:{className:`astryx3nfvp2 astryx6s0dn4 astryxzye2dw astryxxk0z11 astryxf314gf astryxjspbzw astryxmkeg23 astryx1y0btm7 astryx1ypdohk astryx16khyan astryx9ynric astryx9f619 astryxq90yva astryxuedmi6 astryx12w9bfk astryxlr8y92 astryxgcxg3y astryxad5do astryxz7zccy astryxmhmdd9`}}[!!n|0],children:[(0,L.jsx)(`span`,{"aria-hidden":`true`,className:`astryxjm74w1 astryxw6l6zx`,children:e.emoji}),(0,L.jsx)(`span`,{...{0:{className:`astryx141an7d astryx1e4wzip astryxv1l7n4 astryxss6m8b astryx1ltkj2j`},1:{className:`astryx141an7d astryxss6m8b astryx1ltkj2j astryxjse4m1 astryx2mo6ok`}}[!!n|0],children:e.count})]},e.emoji);return e.label==null?r:(0,L.jsx)(h,{content:e.label,children:r},e.emoji)}),r!=null&&(0,L.jsx)(O,{emojis:i,onSelect:r,label:s,children:(0,L.jsx)(h,{content:s,children:(0,L.jsx)(`button`,{type:`button`,"aria-label":s,className:`astryx3nfvp2 astryx6s0dn4 astryxl56j7k astryx1td3qas astryxxk0z11 astryxjspbzw astryxmkeg23 astryx1y0btm7 astryx9r1u3d astryxs8to0k astryx1xwh4np astryxwmxj5m astryxv9yike astryx1ypdohk astryx16khyan astryx9f619 astryx1jvydc1 astryx1ltkj2j astryx1717udv`,children:`+`})})})]})}var L,R;function z(){return(z=e((()=>{r(),s(),m(),P(),L=i(),R={root:{k1xSpc:`astryx78zum5`,kwnvtZ:`astryx1a02dak`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxzye2dw`,$$css:!0}},I.displayName=`ChatReactionBar`,I.__docgenInfo={description:`Row of emoji reaction pills under a chat message.

Each pill shows an emoji and count; the current user's own reactions get
an accent tint and \`aria-pressed\`. Provide \`onAdd\` to render a trailing
add-reaction button that opens a ChatEmojiPicker popover.

@example
\`\`\`
<ChatReactionBar
  reactions={[
    {emoji: '🎉', count: 4, isSelected: true, label: 'You and Dana reacted with 🎉'},
    {emoji: '👀', count: 2},
  ]}
  onToggle={(emoji) => toggleReaction(emoji)}
  onAdd={(emoji) => addReaction(emoji)}
/>
\`\`\``,methods:[],displayName:`ChatReactionBar`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`ChatReaction`}],raw:`ChatReaction[]`},description:`Reactions to render, in display order.`},onToggle:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(emoji: string) => void`,signature:{arguments:[{type:{name:`string`},name:`emoji`}],return:{name:`void`}}},description:`Called with the pill's emoji when the user toggles a reaction.`},onAdd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(emoji: string) => void`,signature:{arguments:[{type:{name:`string`},name:`emoji`}],return:{name:`void`}}},description:`Called with the picked emoji when the user adds a reaction from the
emoji picker. The trailing add-reaction button renders only when
this is provided.`},emojis:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`ChatEmojiOption`}],raw:`ReadonlyArray<ChatEmojiOption>`},description:`Emoji options for the add-reaction picker.
@default DEFAULT_CHAT_EMOJIS`},addLabel:{required:!1,tsType:{name:`string`},description:`Accessible label for the add-reaction button.
@default 'Add reaction'`,defaultValue:{value:`'Add reaction'`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the reaction group.
@default 'Reactions'`,defaultValue:{value:`'Reactions'`,computed:!1}}},composes:[`Omit`]}})))()}function B({label:e=`New`,xstyle:t,className:r,style:i,"data-testid":s,ref:c}){return(0,V.jsxs)(`div`,{ref:c,role:`separator`,"aria-label":`${e} messages below`,"data-testid":s,...a(o(`chat-unread-divider`),n(H.root,t),r,i),children:[(0,V.jsx)(`span`,{className:`astryx1iyjqo2 astryxjm9jq1 astryx1pjz0fi`}),(0,V.jsx)(`span`,{className:`astryx2lah0s astryx9ynric astryx141an7d astryx1lvx875 astryx1wj83wy astryx1ltkj2j`,children:e})]})}var V,H;function U(){return(U=e((()=>{r(),s(),V=i(),H={root:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryx1txdalj`,kzqmXN:`astryxh8yej3`,k8WAf4:`astryxu0wf1k`,$$css:!0}},B.displayName=`ChatUnreadDivider`,B.__docgenInfo={description:`Error-colored rule marking the first unread message in a chat thread.

Renders as a separator with an accessible label describing where
unread messages begin.

@example
\`\`\`
<ChatUnreadDivider />
<ChatUnreadDivider label="Unread" />
\`\`\``,methods:[],displayName:`ChatUnreadDivider`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},label:{required:!1,tsType:{name:`string`},description:`Divider label.
@default 'New'`,defaultValue:{value:`'New'`,computed:!1}}},composes:[`Omit`]}})))()}var W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{W=t(),v(),b(),S(),u(),P(),z(),E(),U(),G=i(),K={title:`Lab/ChatAdditions`,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,G.jsx)(`div`,{style:{width:640,maxWidth:`100%`},children:(0,G.jsx)(e,{})})]},q=[{emoji:`🎉`,count:4,isSelected:!0,label:`You, Dana, Lee, and Mia reacted with 🎉`},{emoji:`👀`,count:2,label:`Dana and Lee reacted with 👀`}],J={render:()=>{let[e,t]=(0,W.useState)(q);return(0,G.jsx)(y,{style:{maxWidth:600},children:(0,G.jsxs)(x,{sender:`assistant`,children:[(0,G.jsx)(C,{children:`The design review went great. Tokens are approved and we can start testing the new chat affordances next sprint.`}),(0,G.jsx)(I,{reactions:e,onToggle:e=>{t(t=>t.map(t=>t.emoji===e?{...t,isSelected:!t.isSelected,count:t.count+(t.isSelected?-1:1)}:t).filter(e=>e.count>0))},onAdd:e=>{t(t=>{let n=t.find(t=>t.emoji===e);return n==null?[...t,{emoji:e,count:1,isSelected:!0}]:n.isSelected?t:t.map(t=>t.emoji===e?{...t,isSelected:!0,count:t.count+1}:t)})}})]})})}},Y={render:()=>(0,G.jsxs)(y,{style:{maxWidth:600},children:[(0,G.jsx)(x,{sender:`user`,children:(0,G.jsx)(C,{children:`Sounds good. I'll take the migration notes.`})}),(0,G.jsx)(B,{}),(0,G.jsx)(x,{sender:`assistant`,children:(0,G.jsx)(C,{children:`Perfect. I've drafted the rollout checklist and shared it with the team.`})}),(0,G.jsx)(D,{names:[`Ana`,`Ben`,`Casey`]})]})},X={render:()=>{let[e,t]=(0,W.useState)(`🎉`);return(0,G.jsx)(O,{onSelect:t,children:(0,G.jsx)(d,{label:`Pick emoji ${e}`,variant:`secondary`})})}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [reactions, setReactions] = useState(INITIAL_REACTIONS);
    const handleToggle = (emoji: string) => {
      setReactions(prev => prev.map(reaction => reaction.emoji === emoji ? {
        ...reaction,
        isSelected: !reaction.isSelected,
        count: reaction.count + (reaction.isSelected ? -1 : 1)
      } : reaction).filter(reaction => reaction.count > 0));
    };
    const handleAdd = (emoji: string) => {
      setReactions(prev => {
        const existing = prev.find(reaction => reaction.emoji === emoji);
        if (existing != null) {
          return existing.isSelected ? prev : prev.map(reaction => reaction.emoji === emoji ? {
            ...reaction,
            isSelected: true,
            count: reaction.count + 1
          } : reaction);
        }
        return [...prev, {
          emoji,
          count: 1,
          isSelected: true
        }];
      });
    };
    return <ChatMessageList style={{
      maxWidth: 600
    }}>
        <ChatMessage sender="assistant">
          <ChatMessageBubble>
            The design review went great. Tokens are approved and we can start
            testing the new chat affordances next sprint.
          </ChatMessageBubble>
          <ChatReactionBar reactions={reactions} onToggle={handleToggle} onAdd={handleAdd} />
        </ChatMessage>
      </ChatMessageList>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <ChatMessageList style={{
    maxWidth: 600
  }}>
      <ChatMessage sender="user">
        <ChatMessageBubble>
          Sounds good. I&apos;ll take the migration notes.
        </ChatMessageBubble>
      </ChatMessage>
      <ChatUnreadDivider />
      <ChatMessage sender="assistant">
        <ChatMessageBubble>
          Perfect. I&apos;ve drafted the rollout checklist and shared it with
          the team.
        </ChatMessageBubble>
      </ChatMessage>
      <ChatTypingIndicator names={['Ana', 'Ben', 'Casey']} />
    </ChatMessageList>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState('🎉');
    return <ChatEmojiPicker onSelect={setSelected}>
        <Button label={\`Pick emoji \${selected}\`} variant="secondary" />
      </ChatEmojiPicker>;
  }
}`,...X.parameters?.docs?.source}}},Z=[`Reactions`,`TypingAndUnread`,`EmojiPicker`]})))()}Q();export{X as EmojiPicker,J as Reactions,Y as TypingAndUnread,Z as __namedExportsOrder,K as default};