import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i}from"./mergeProps-DHkqklmt.js";import{n as a}from"./isRenderable-C2vVZKI4.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./Divider-DkevuVb8.js";function u({children:e,variant:n=`default`,icon:r,xstyle:s,className:c,style:u,ref:p,...m}){return n===`divider`?(0,d.jsx)(`div`,{ref:p,...i(o(`chat-system-message`,{variant:n}),t(f.dividerWrap,s),c,u),...m,children:(0,d.jsx)(l,{label:e})}):(0,d.jsx)(`div`,{ref:p,...i(o(`chat-system-message`,{variant:n}),t(f.root,s),c,u),...m,children:(0,d.jsxs)(`span`,{className:`astryx3nfvp2 astryx6s0dn4 astryx1s4dlld`,children:[a(r)&&(0,d.jsx)(`span`,{className:`astryx3nfvp2 astryx6s0dn4 astryx2lah0s`,children:r}),e]})})}var d,f;function p(){return(p=e((()=>{n(),c(),s(),d=r(),f={root:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kOIVth:`astryx1txdalj`,k8WAf4:`astryxu0wf1k`,kMv6JI:`astryx9ynric`,kGuDYH:`astryx141an7d`,k63SB2:`astryx1sodnla`,kMwMTN:`astryxv1l7n4`,k9WMMc:`astryx2b8uid`,$$css:!0},dividerWrap:{kzqmXN:`astryxh8yej3`,$$css:!0}},u.displayName=`ChatSystemMessage`,u.__docgenInfo={description:`Centered system message for chat threads.

Use for non-sender content: date separators, "conversation started",
"user joined", status changes. Supports a divider variant with horizontal
lines on each side of the text.

It carries no live role: a notice added to a \`ChatMessageList\` is announced
by the list's log, which owns content added inside it (\`spec:AST-086\` FR4),
and a date or divider row is ordinary transcript content.

@example
\`\`\`
<ChatSystemMessage>Conversation started</ChatSystemMessage>
<ChatSystemMessage variant="divider">Today</ChatSystemMessage>
<ChatSystemMessage variant="divider">March 15, 2026</ChatSystemMessage>
\`\`\``,methods:[],displayName:`ChatSystemMessage`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},children:{required:!0,tsType:{name:`ReactNode`},description:`System message content — text or any ReactNode.`},variant:{required:!1,tsType:{name:`union`,raw:`'default' | 'divider'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'divider'`}]},description:`Visual variant.
- 'default': plain centered text
- 'divider': text with horizontal lines on each side (date separator style)
@default 'default'`,defaultValue:{value:`'default'`,computed:!1}},icon:{required:!1,tsType:{name:`ReactNode`},description:`Optional caller-provided icon content associated with the message.
Accepts any ReactNode, typically an Icon.`}},composes:[`Omit`]}})))()}export{p as n,u as t};