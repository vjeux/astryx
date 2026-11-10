import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./useMergedRefs-D6axeCXB.js";import{t as u}from"./composeEventHandlers-CceNiKXL.js";import{C as d,S as f,b as p,c as m,d as h,f as g,g as _,h as v,l as y,m as b,n as x,o as S,p as C,r as w,s as ee,t as T,u as E,x as D,y as O}from"./TruncationTooltip-DZHS6tMX.js";import{n as k,r as A}from"./Text-C5BHw0wv.js";function j(e){return e===`display-1`||e===`display-2`||e===`display-3`}function M({level:e,type:t,weight:r,accessibilityLevel:i,color:s=`primary`,display:l=`block`,maxLines:x=0,hasTruncateTooltip:S=!0,wordBreak:C,textWrap:k,justify:M=`start`,hasCapsize:I=!1,hasStrikethrough:L=!1,xstyle:R,className:z,style:B,children:V,ref:H,...U}){let W=F[e],G=i&&i!==e?{"aria-level":i}:{},K=C??(x===1?`break-all`:`break-word`),q=x>0||I?`block`:l,J=t&&j(t)?t:void 0,Y=ee({maxLines:S===!1?0:x}),X=typeof S==`string`?S:`above`,Z=x>0&&S!==!1&&Y.isTruncated,Q=w(Z),$=(0,N.useRef)(null),te=c(H,Y.ref,$),ne=x>1?{WebkitLineClamp:x}:void 0;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(W,{ref:te,...a(o(`heading`,{level:e,color:s,type:t,weight:r}),n(y[A(s)],J?_[J]:v[e],J&&h[J],r&&f[r],x===1?p.singleLine:x>1?p.multiLine:g[q],x>0&&d[K],k&&O[k],M!==`start`&&b[M],I&&m.enabled,L&&E.strikethrough,R),z,{...B,...ne}),...G,...U,onPointerEnter:u(Q.onPointerEnter,U.onPointerEnter),onPointerLeave:u(Q.onPointerLeave,U.onPointerLeave),onPointerDown:u(Q.onPointerDown,U.onPointerDown),onFocus:u(Q.onFocus,U.onFocus),onBlur:u(Q.onBlur,U.onBlur),children:V}),Z&&Q.isWanted&&(0,P.jsx)(T,{anchorRef:$,content:(0,P.jsx)(`span`,{...n(D.content),children:Y.fullText}),placement:X,interest:Q})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),r(),C(),S(),x(),k(),l(),s(),P=i(),F={1:`h1`,2:`h2`,3:`h3`,4:`h4`,5:`h5`,6:`h6`},M.displayName=`Heading`,M.__docgenInfo={description:`Heading - Semantic heading component

Renders headings with semantic HTML (h1-h6) and themed styling.

@example
\`\`\`
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section</Heading>
<Heading level={2} accessibilityLevel={3}>Sidebar Section</Heading>
<Heading level={1} type="display-1">Hero Title</Heading>
<Heading level={2} type="display-2">$1.2M Revenue</Heading>
<Heading level={2} maxLines={1}>Very Long Section Title...</Heading>
<Heading level={3} color="secondary">Muted Heading</Heading>
\`\`\``,methods:[],displayName:`Heading`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLHeadingElement>`,elements:[{name:`HTMLHeadingElement`}]},description:`Ref forwarded to the root element`},level:{required:!0,tsType:{name:`union`,raw:`1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}]},description:"Heading level (1-6). Determines the semantic HTML element (h1–h6).\nAlso determines visual styling unless `type` is set."},type:{required:!1,tsType:{name:`HeadingTypeMap`},description:`Display type variant. When set, overrides the visual styling from \`level\`
with display-scale sizing (larger, lighter weight, tighter line-height).
The \`level\` still determines the HTML element for accessibility.

Use for hero banners, marketing headlines, and data callouts that need
heading semantics.

@example
\`\`\`
<Heading level={1} type="display-1">Hero Title</Heading>
<Heading level={2} type="display-2">$1.2M Revenue</Heading>
\`\`\``},weight:{required:!1,tsType:{name:`union`,raw:`'normal' | 'medium' | 'semibold' | 'bold'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'semibold'`},{name:`literal`,value:`'bold'`}]},description:`Explicit font-weight override. The active theme controls the numeric value
behind each name. When omitted, the selected visual type or heading level
supplies the default.`},accessibilityLevel:{required:!1,tsType:{name:`union`,raw:`1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}]},description:"Accessibility level override. When set, the `aria-level` will differ\nfrom the visual `level`. Use this when the visual hierarchy doesn't\nmatch the document outline (e.g., sidebar headings, reused components).\n\n@default Same as `level`\n\n@example\n```\n<Heading level={2} accessibilityLevel={3}>Sidebar Section</Heading>\n```"},color:{required:!1,tsType:{name:`TextColorMap`},description:`Text color.
@default 'primary'`,defaultValue:{value:`'primary'`,computed:!1}},display:{required:!1,tsType:{name:`union`,raw:`'inline' | 'block'`,elements:[{name:`literal`,value:`'inline'`},{name:`literal`,value:`'block'`}]},description:`Display type. Headings default to block.
Note: Silently overridden to 'block' when maxLines > 0 or hasCapsize is true.
@default 'block'`,defaultValue:{value:`'block'`,computed:!1}},maxLines:{required:!1,tsType:{name:`number`},description:`Maximum lines before truncation. 0 = no truncation.
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
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!0,tsType:{name:`ReactNode`},description:`Heading content`}},composes:[`Omit`]}})))()}export{I as n,M as t};