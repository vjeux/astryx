import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./useMergedRefs-D6axeCXB.js";import{n as u,t as d}from"./LayoutChangeSnapshot-CfAuxnOj.js";import{n as f,t as p}from"./useDevWarning-BysULVtL.js";import{i as m,o as h}from"./leaving.stylex-CDjVNtbn.js";import{i as g,r as _}from"./ListItem-C2dBt6xL.js";import{i as v,n as y,r as b}from"./listReorderContext-DIInNQzY.js";function x({children:e,animatedLayout:t,reorderable:r,density:i=`balanced`,hasDividers:s=!1,edge:l,edgeCompensation:u,header:p,listStyle:h=`none`,start:_,xstyle:y,className:x,style:T,"data-testid":D,ref:O,...k}){let A=(0,S.useId)(),j=(0,S.useRef)(null),{session:M,options:N}=v(r,()=>j.current,`${A}h`),P=g(j,t),F=(0,S.useCallback)(()=>{M?.ownsCommit()!==!0&&P()},[P,M]);b(M);let I=c(j,O),L=h===`decimal`,R=L?`ol`:`ul`;f(`List`,"`edge` and the deprecated `edgeCompensation` are both set; `edge` wins. Remove `edgeCompensation`. `astryx upgrade` rewrites existing usage.",l!=null&&u!=null);let z=l??(u===`inline`?`outset`:`padded`),B=z===`outset`||z===`bleed`,V=(0,S.useMemo)(()=>({density:i,hasDividers:s,edge:z,listStyle:h,animatedLayout:t,reorder:M&&{session:M,options:N}}),[i,s,z,h,t,M,N]),H=(0,C.jsx)(R,{ref:I,...k,"data-testid":D,...p==null?null:{"aria-labelledby":A},...L&&_!=null&&_!==1?{start:_}:{},role:`list`,...z===`bleed`&&p==null?{"data-container-corner":``}:null,...a(o(`list`,{density:i,listStyle:h}),n(w.list,t!=null&&w.animatedIsolation,L&&w.numberColumns,s&&w.withDividers,B&&w.reachesContainerPadding,z===`bleed`&&p==null&&w.bleedCorners,h!==`none`&&(_!=null&&_!==1?E.counterStart(_-1):w.withCounter),M?.listStyle,y),x,T),children:e}),U=t==null?null:(0,C.jsx)(d,{value:e,onBeforeChange:F}),{reorder:W}=V,G=W&&(0,C.jsx)(W.session.Host,{reorder:W});return p==null?(0,C.jsxs)(m,{value:V,children:[U,H,G]}):(0,C.jsxs)(m,{value:V,children:[U,(0,C.jsxs)(`div`,{...z===`bleed`?{"data-container-corner":``}:null,...{0:{className:`astryx78zum5 astryxdt5ytf`},1:{className:`astryx78zum5 astryxdt5ytf astryx916qr2 astryx1vx9r65 astryx1dt9b3t astryxjk82ok astryx1q2yvai astryxc60oqu`}}[z===`bleed`|0],children:[(0,C.jsx)(`div`,{id:A,className:`astryx1p37lm5`,children:p}),H,G]})]})}var S,C,w,T,E;function D(){return(D=e((()=>{S=t(),r(),h(),l(),_(),u(),s(),p(),y(),C=i(),w={list:{kogj98:`astryx1ghz6dp`,kZCmMZ:`astryx1c1uobl`,kH6xsr:`astryx3ct3a4`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1lsbc85`,kXHlph:`astryx101abm8`,kHBbk8:`astryxsmms64`,$$css:!0},animatedIsolation:{kHBbk8:`astryxc8icb0`,$$css:!0},numberColumns:{k1xSpc:`astryx78zum5 astryx1tx5i3l`,kumcoG:`astryx16lqc3j`,k1C7PZ:`astryxak3so`,$$css:!0},reachesContainerPadding:{keTefX:`astryxojxgvx`,k71WvV:`astryx1fcf3bl`,kzqmXN:`astryxx6qvi6`,$$css:!0},bleedCorners:{"--_list-corner-start-start":`astryx916qr2 astryxb8h2sp`,"--_list-corner-start-end":`astryx1vx9r65 astryx1d65wlh`,"--_list-corner-end-start":`astryx1dt9b3t astryxjk82ok`,"--_list-corner-end-end":`astryx1q2yvai astryxc60oqu`,$$css:!0},withDividers:{kOIVth:`astryxxhr3t`,k1C7PZ:null,$$css:!0},withCounter:{kt6KFK:`astryxif0320`,$$css:!0}},T={kt6KFK:`astryx1khind5`,$$css:!0},E={counterStart:e=>[T,{"--x-counterReset":`astryx-list ${e}`==null?void 0:`astryx-list ${e}`}]},x.displayName=`List`,x.__docgenInfo={description:`A vertical list component for rendering collections of items.

Renders semantic \`<ul>\` or \`<ol>\` elements with configurable density,
dividers, marker styles, and an optional header.

Set \`edge\` to choose where row text, dividers, and backgrounds sit: inside
each row's padding (\`padded\`, the default), at the list's edges (\`flush\`),
on a heading's line with backgrounds reaching into the container's padding
(\`outset\`), or reaching the container's edges like Table rows (\`bleed\`).

@example
\`\`\`
<List>
  <ListItem label="Notifications" description="Manage your alerts" />
  <ListItem label="Privacy" description="Control your data" />
</List>
<List listStyle="decimal" density="compact">
  <ListItem label="First step" />
  <ListItem label="Second step" />
</List>
<List edge="flush" hasDividers>
  <ListItem label="Solstice Mug" description="Ceramic, 12 oz" />
</List>
\`\`\``,methods:[],displayName:`List`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLUListElement | HTMLOListElement>`,elements:[{name:`union`,raw:`HTMLUListElement | HTMLOListElement`,elements:[{name:`HTMLUListElement`},{name:`HTMLOListElement`}]}]},description:`Ref forwarded to the root element`},children:{required:!0,tsType:{name:`ReactNode`},description:`List items. Should be ListItem components.`},density:{required:!1,tsType:{name:`union`,raw:`'compact' | 'balanced' | 'spacious'`,elements:[{name:`literal`,value:`'compact'`},{name:`literal`,value:`'balanced'`},{name:`literal`,value:`'spacious'`}]},description:`Spacing density for list items.
- 'compact': Tighter spacing for dense UIs
- 'balanced': Standard spacing
- 'spacious': Extra spacing for readability
@default 'balanced'`,defaultValue:{value:`'balanced'`,computed:!1}},animatedLayout:{required:!1,tsType:{name:`AnimatedLayout`},description:`The handle from \`useAnimatedLayout({containerRef})\`. With it, the list
animates its row changes on one shared motion, under every pointer. An
inserted row enters, and a removed row collapses in place. A row that
crosses rows moving the other way rides above them. The rows after a
change, and the content after the list up to that container, glide to
their new places. A row's identity is its \`itemKey\`, so a row without one
changes at once. Without a handle the list changes at once.`},reorderable:{required:!1,tsType:{name:`Reorderable`},description:`Makes the rows reorderable, with the object \`createReorderable\` makes.
Each ListItem with an \`itemKey\` gets a reorder handle at its end. One the
object's \`isReorderable\` rejects keeps its place. Each committed move
calls its \`onReorder\` once with the row's key and its index after the
move. Apply it by rendering the rows in their new order. A drop on the
starting place, a cancel, or a move the order does not take changes
nothing.

On a touch screen, a finger held still on a handle for a moment picks up
its row. A flick on it still scrolls. The row stays in its place, dimmed,
while a copy of it follows the finger. An accent line marks where it
would land. The other rows stay still, the list scrolls near the edges,
and on release the rows rearrange. A mouse drags a handle at once, the
same way.

Without a drag, activating a handle (a click, Space or Enter) turns on
reorder mode for its row. Each arrow key moves it a place at once,
reported and announced with its place and neighbours. Escape or another
activation ends the mode, keeping the moves.
While it is on, a hint anchored to the handle shows the moves and Done as
buttons, so taps alone can reorder.`},hasDividers:{required:!1,tsType:{name:`boolean`},description:`Whether to show dividers between list items.
@default false`,defaultValue:{value:`false`,computed:!1}},edge:{required:!1,tsType:{name:`union`,raw:`'padded' | 'flush' | 'outset' | 'bleed'`,elements:[{name:`literal`,value:`'padded'`},{name:`literal`,value:`'flush'`},{name:`literal`,value:`'outset'`},{name:`literal`,value:`'bleed'`}]},description:`Where each row's text, dividers, and hover and selection backgrounds sit,
relative to the list's edges and the container around it.
- 'padded': text sits inside each row's padding, so it starts a little in
  from a heading above the list and backgrounds have room around it
- 'flush': rows drop their side padding, so text starts on the heading's
  line and dividers and backgrounds stop at the row's content, with no
  room beyond it on either side. Works anywhere. Suits static rows
- 'outset': text sits on the heading's line, and dividers and backgrounds
  reach a little past it into the container's padding. Suits interactive
  rows in a container
- 'bleed': text sits on the heading's line, and dividers and backgrounds
  reach the container's edges, like Table rows in a Card. Rows are
  square, except that the first or last row of a list that is a rounded
  Card's or Dialog's first or last child takes its corner

A row's first content is what lines up with the heading: its marker,
icon, or avatar when it has one, otherwise its label. 'outset' and
'bleed' reach into the padding of the nearest container that shares its
padding: a Card, Section, Dialog, or BottomSheet, or a transparent
container such as a Layout region with explicit padding or a padded
ScrollableArea. Place the List directly in that container's padding:
padding that Stack, Center, or your own styles add in between is not
counted. Drawers and the automatic padding of LayoutContent and
LayoutPanel aren't supported yet. With no such container, including in a Popover, they look
like 'padded'. In a container with less padding than the rows' own, text
starts a little after the heading's line. A theme's inline padding on \`item\` replaces the row
padding of every value, including the zero padding of 'flush'.
@default 'padded'`},edgeCompensation:{required:!1,tsType:{name:`literal`,value:`'inline'`},description:'@deprecated Use `edge="outset"`, which this sets. Still works; `edge`\nwins when both are set. `astryx upgrade` rewrites existing usage.'},header:{required:!1,tsType:{name:`ReactNode`},description:`Header content rendered above the list.
Semantically associated via aria-labelledby.`},listStyle:{required:!1,tsType:{name:`union`,raw:`'none' | 'disc' | 'decimal' | 'circle'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'disc'`},{name:`literal`,value:`'decimal'`},{name:`literal`,value:`'circle'`}]},description:"List marker style.\nWhen 'decimal', renders an `<ol>`. Otherwise renders a `<ul>`.\n@default 'none'",defaultValue:{value:`'none'`,computed:!1}},start:{required:!1,tsType:{name:`number`},description:`Starting number for ordered lists (listStyle='decimal').
Sets the CSS counter to begin at this value.
@default 1`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}})))()}export{D as n,x as t};