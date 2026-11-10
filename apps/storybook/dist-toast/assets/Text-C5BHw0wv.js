import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,r as o}from"./layerScopedContext-CqwdhY_A.js";import{n as s}from"./mergeProps-DHkqklmt.js";import{i as c,t as l}from"./themeProps-BVy3p_gf.js";import{n as u,t as d}from"./useMergedRefs-D6axeCXB.js";import{t as f}from"./composeEventHandlers-CceNiKXL.js";import{C as p,S as m,_ as h,b as g,c as _,d as ee,f as v,g as y,l as b,m as x,n as S,o as C,p as w,r as T,s as E,t as D,u as O,v as te,x as ne,y as k}from"./TruncationTooltip-DZHS6tMX.js";var A;function j(){return(j=e((()=>{o(),A=a(`TextClampContext`,1,!1)})))()}function M(e){return e in y?e:`body`}function N(e){return e in b?e:`primary`}function P({type:e=`body`,size:t,color:r,weight:i,display:a=`inline`,maxLines:o=0,hasTruncateTooltip:l=!0,wordBreak:d,textWrap:S,justify:C=`start`,hasCapsize:w=!1,hasStrikethrough:j=!1,hasTabularNumbers:P=!1,xstyle:R,className:z,style:B,as:V=`span`,children:H,ref:U,...W}){let G=r??L[e]??`primary`,K=M(e),q=N(G),J=d??(o===1?`break-all`:`break-word`),Y=o>0||w?`block`:a,X=E({maxLines:l===!1?0:o}),re=typeof l==`string`?l:`above`,Z=o>0&&l!==!1&&X.isTruncated,Q=T(Z),$=(0,F.useRef)(null),ie=u(U,X.ref,$),ae=(0,F.use)(A),oe=o===1||o>1&&!w,se=o>1?{WebkitLineClamp:o}:void 0;return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(V,{ref:ie,...s(c(`text`,{type:e,size:t,color:G}),n(b[q],y[K],t&&h[t],ee[K],i&&m[i],o===1?g.singleLine:o>1?g.multiLine:v[Y],o>0&&p[J],S&&k[S],C!==`start`&&x[C],w&&_.enabled,j&&O.strikethrough,P&&te.enabled,R),z,{...B,...se}),...W,onPointerEnter:f(Q.onPointerEnter,W.onPointerEnter),onPointerLeave:f(Q.onPointerLeave,W.onPointerLeave),onPointerDown:f(Q.onPointerDown,W.onPointerDown),onFocus:f(Q.onFocus,W.onFocus),onBlur:f(Q.onBlur,W.onBlur),children:(0,I.jsx)(A,{value:oe||ae,children:H})}),Z&&Q.isWanted&&(0,I.jsx)(D,{anchorRef:$,content:(0,I.jsx)(`span`,{...n(ne.content),children:X.fullText}),placement:re,interest:Q})]})}var F,I,L;function R(){return(R=e((()=>{F=t(),r(),w(),C(),S(),d(),l(),j(),I=i(),L={body:`primary`,large:`primary`,label:`primary`,supporting:`secondary`,code:`primary`,"display-1":`primary`,"display-2":`primary`,"display-3":`primary`,inherit:`inherit`},P.displayName=`Text`,P.__docgenInfo={description:`Semantic text component. Renders text with type-based styling from the theme.

@example
\`\`\`
<Text type="body">Body text</Text>
<Text type="large">Large body text</Text>
<Text type="label">Form label</Text>
<Text type="supporting">Helper text</Text>
<Text type="code">{'const x = 1;'}</Text>
<Text type="display-1" as="h1">Hero Title</Text>
<Text type="display-2">$1.2M Revenue</Text>
<Text type="body" maxLines={2}>Clamped text</Text>
\`\`\``,methods:[],displayName:`Text`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:`Ref forwarded to the root element`},type:{required:!1,tsType:{name:`union`,raw:`BuiltinTextType | (keyof CustomTextTypes & string)`,elements:[{name:`union`,raw:`| 'body'
| 'large'
| 'label'
| 'supporting'
| 'code'
| 'display-1'
| 'display-2'
| 'display-3'
| 'inherit'`,elements:[{name:`literal`,value:`'body'`},{name:`literal`,value:`'large'`},{name:`literal`,value:`'label'`},{name:`literal`,value:`'supporting'`},{name:`literal`,value:`'code'`},{name:`literal`,value:`'display-1'`},{name:`literal`,value:`'display-2'`},{name:`literal`,value:`'display-3'`},{name:`literal`,value:`'inherit'`}]},{name:`unknown`}]},description:`Semantic text type. Determines size, weight, and line-height from theme.
@default 'body'`,defaultValue:{value:`'body'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`| '4xs'
| '3xs'
| '2xs'
| 'xsm'
| 'sm'
| 'base'
| 'lg'
| 'xl'
| '2xl'
| '3xl'
| '4xl'`,elements:[{name:`literal`,value:`'4xs'`},{name:`literal`,value:`'3xs'`},{name:`literal`,value:`'2xs'`},{name:`literal`,value:`'xsm'`},{name:`literal`,value:`'sm'`},{name:`literal`,value:`'base'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'xl'`},{name:`literal`,value:`'2xl'`},{name:`literal`,value:`'3xl'`},{name:`literal`,value:`'4xl'`}]},description:"Explicit font size override. When set, overrides the size from `type`\nbut preserves other type properties (font-family, default color).\n\n⚠️ Lint rule: Prefer using `type` alone. Use `size` only for custom\nUI elements that need explicit size control (metrics, callouts)."},color:{required:!1,tsType:{name:`TextColorMap`},description:`Text color. Defaults vary by type:
- 'supporting' → 'secondary'
- others → 'primary'`},weight:{required:!1,tsType:{name:`union`,raw:`'normal' | 'medium' | 'semibold' | 'bold'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'semibold'`},{name:`literal`,value:`'bold'`}]},description:`Font weight override.`},display:{required:!1,tsType:{name:`union`,raw:`'inline' | 'block'`,elements:[{name:`literal`,value:`'inline'`},{name:`literal`,value:`'block'`}]},description:`Display type. Text defaults to inline.
Note: Silently overridden to 'block' when maxLines > 0 or hasCapsize is true.
@default 'inline'`,defaultValue:{value:`'inline'`,computed:!1}},maxLines:{required:!1,tsType:{name:`number`},description:`Maximum lines before truncation. 0 = no truncation.
When set, shows tooltip on hover if content is truncated.
@default 0`,defaultValue:{value:`0`,computed:!1}},hasTruncateTooltip:{required:!1,tsType:{name:`union`,raw:`boolean | LayerPlacement`,elements:[{name:`boolean`},{name:`union`,raw:`'above' | 'below' | 'start' | 'end'`,elements:[{name:`literal`,value:`'above'`},{name:`literal`,value:`'below'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]}]},description:`Control tooltip behavior for truncated text.
- \`true\` (default when maxLines > 0): show tooltip at default position
- \`false\`: disable tooltip
- Position value: show tooltip at specific position
@default true`,defaultValue:{value:`true`,computed:!1}},wordBreak:{required:!1,tsType:{name:`union`,raw:`'break-word' | 'break-all'`,elements:[{name:`literal`,value:`'break-word'`},{name:`literal`,value:`'break-all'`}]},description:`Word break behavior for truncated text.
@default 'break-all' for maxLines=1, 'break-word' otherwise`},textWrap:{required:!1,tsType:{name:`union`,raw:`'wrap' | 'nowrap' | 'balance' | 'pretty'`,elements:[{name:`literal`,value:`'wrap'`},{name:`literal`,value:`'nowrap'`},{name:`literal`,value:`'balance'`},{name:`literal`,value:`'pretty'`}]},description:`Text wrapping behavior.`},justify:{required:!1,tsType:{name:`union`,raw:`'start' | 'center' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`}]},description:`Text alignment (justification). Uses logical values (start/end)
for i18n/RTL compatibility.
@default 'start'`,defaultValue:{value:`'start'`,computed:!1}},hasCapsize:{required:!1,tsType:{name:`boolean`},description:`Enable optical alignment (text-box-trim).
Forces block display.
@default false`,defaultValue:{value:`false`,computed:!1}},hasStrikethrough:{required:!1,tsType:{name:`boolean`},description:`Strikethrough decoration.
@default false`,defaultValue:{value:`false`,computed:!1}},hasTabularNumbers:{required:!1,tsType:{name:`boolean`},description:`Use tabular (monospace) numbers for alignment.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!0,tsType:{name:`ReactNode`},description:`Text content`},as:{required:!1,tsType:{name:`union`,raw:`'span' | 'p' | 'div' | 'label' | 'h1' | 'h2' | 'h3'`,elements:[{name:`literal`,value:`'span'`},{name:`literal`,value:`'p'`},{name:`literal`,value:`'div'`},{name:`literal`,value:`'label'`},{name:`literal`,value:`'h1'`},{name:`literal`,value:`'h2'`},{name:`literal`,value:`'h3'`}]},description:`HTML element to render.
Includes h1-h3 for display types that need heading semantics.
@default 'span'`,defaultValue:{value:`'span'`,computed:!1}}},composes:[`Omit`]}})))()}export{j as a,A as i,R as n,N as r,P as t};