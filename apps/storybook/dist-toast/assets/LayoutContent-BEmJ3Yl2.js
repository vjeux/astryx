import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{n as i,t as a}from"./sharedContext-BVffqy7N.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s,r as c}from"./layerScopedContext-CqwdhY_A.js";import{n as l,t as u}from"./LayoutDividerContext-0E-BHDMy.js";import{n as d,t as f}from"./stack.stylex-D6Wy650L.js";import{a as p,n as m,o as h,t as g}from"./useScrollRegionProps-DNvDy4pz.js";import{n as _}from"./mergeProps-DHkqklmt.js";import{n as v}from"./isRenderable-C2vVZKI4.js";import{i as y,t as b}from"./themeProps-BVy3p_gf.js";import{n as x,t as S}from"./paddingStyles.stylex-DcSy8JNI.js";import{a as C,c as w,n as T,o as E,s as D,t as O}from"./padding.stylex-DigmwS-k.js";import{n as k,t as A}from"./useMergedRefs-D6axeCXB.js";var j;function M(){return(M=e((()=>{i(),j=a(`LayoutAreaContext`,1,null),j.displayName=`LayoutAreaContext`})))()}var N,P;function F(){return(F=e((()=>{c(),N={hasHeader:!1,hasFooter:!1,hasStart:!1,hasEnd:!1},P=s(`LayoutSlotsContext`,1,N),P.displayName=`LayoutSlotsContext`})))()}function I(e){if(e==null||typeof e==`number`)return!0;let t=e.trim().toLowerCase();return t.includes(`%`)?!1:t===`0`||/^-?(?:\d+(?:\.\d+)?|\.\d+)[a-z]+$/.test(t)||/^(?:calc|min|max|clamp)\(/.test(t)}function L({area:e,children:t}){return t==null?null:(0,B.jsx)(j,{value:e,children:t})}function R({children:e,content:t,contentWidth:r,defaultHasDividers:i,end:a,footer:o,header:s,height:c=`fill`,padding:l,ref:f,start:p,xstyle:m,className:g,style:b,...x}){let S=c===`fill`,C=t??e,T=(0,z.useMemo)(()=>i==null?null:{defaultHasDividers:i},[i]),E=v(s),O=v(o),k=v(p),A=v(a),j=k&&A,M=k!==A,N=r!=null&&I(r),F=(0,z.useMemo)(()=>({hasHeader:E,hasFooter:O,hasStart:k,hasEnd:A}),[E,O,k,A]),R=(0,B.jsx)(P,{value:F,children:(0,B.jsx)(`div`,{...x,ref:f,..._(y(`layout`,{height:c}),n(V.layoutOuter,S?V.fill:V.auto,m),g,b),children:(0,B.jsxs)(`div`,{...n(W,V.layoutInner,...d({direction:`vertical`}),S?V.fill:V.auto,l===0&&V.fullBleed,l!=null&&D[l],l!=null&&w[l],r!=null&&U.contentWidthVar(r),N&&U.contentAlignmentWidthVar(r)),children:[(0,B.jsx)(L,{area:`header`,children:s}),(0,B.jsxs)(`div`,{...n(...d({direction:`horizontal`}),V.middle,r!=null&&(!N||j)&&U.contentWidth(r),N&&!j&&V.middleQuery,N&&M&&V.singlePanelMiddle,N&&k&&!A&&V.singleStartPanel,N&&!k&&A&&V.singleEndPanel),children:[(0,B.jsx)(L,{area:`start`,children:p}),(0,B.jsx)(`div`,{...n(...h({size:`fill`}),N&&!k&&!A&&V.singleColumnContent),children:(0,B.jsx)(L,{area:`content`,children:C})}),(0,B.jsx)(L,{area:`end`,children:a})]}),(0,B.jsx)(L,{area:`footer`,children:o})]})})});return T==null?R:(0,B.jsx)(u,{value:T,children:R})}var z,B,V,H,U,W;function G(){return(G=e((()=>{z=t(),r(),M(),F(),l(),f(),p(),b(),E(),B=o(),V={layoutOuter:{keTefX:`astryxojxgvx`,k71WvV:`astryx1fcf3bl`,keoZOQ:`astryx1sa9bsh`,k1K539:`astryx6h7pi7`,$$css:!0},layoutInner:{"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,"--layout-content-width":`astryx1vpwbdg`,"--layout-alignment-width":`astryx19kr0ht`,"--layout-padding-own-outer-x":`astryx1vii845`,"--layout-padding-own-outer-y":`astryxojybgt`,"--_layout-flush-block-start":`astryxu9n9za`,"--_layout-flush-block-end":`astryxt8hc1d`,$$css:!0},fill:{kZKoxP:`astryx12qplqi`,kskxy:`astryxenllk4`,$$css:!0},auto:{kAzted:`astryx1us19tq`,$$css:!0},middle:{kUk6DE:`astryx98rzlu`,kzQI83:null,kmuXW:null,kCS8Yb:null,kAzted:`astryx2lwn1j`,"--_layout-flush-block-start":`astryxhmxtp`,"--_layout-flush-block-end":`astryxzzqqf3`,$$css:!0},middleQuery:{k9g6sI:`astryxsw3flo`,$$css:!0},singleColumnContent:{kzqmXN:`astryxh8yej3`,ks0D6T:`astryxjl2t3p astryxpgkkid`,kUOVxO:`astryxvueqy4`,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,$$css:!0},singlePanelMiddle:{kB7OPa:`astryx9f619`,kzqmXN:`astryxh8yej3`,ks0D6T:`astryxjl2t3p astryxnpzo02`,kUOVxO:`astryxvueqy4 astryxb0m1lw`,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,$$css:!0},singleStartPanel:{kZCmMZ:`astryx1vvd0s7`,kE3dHu:null,kpe85a:null,$$css:!0},singleEndPanel:{kwRFfy:`astryxxdn8bs`,kE3dHu:null,kpe85a:null,$$css:!0},fullBleed:{"--layout-padding-own-outer-x":`astryxbjcssu`,"--layout-padding-own-outer-y":`astryx1bz2q72`,$$css:!0}},H={kzqmXN:`astryxh8yej3`,kUOVxO:`astryxvueqy4`,keTefX:``,koQZXg:``,k71WvV:``,km5ZXQ:``,$$css:!0},U={contentWidthVar:e=>[{"--layout-content-width":(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryx4906uf`,$$css:!0},{"--x---layout-content-width":(typeof e==`number`?`${e}px`:e)==null?void 0:typeof e==`number`?`${e}px`:e}],contentAlignmentWidthVar:e=>[{"--layout-alignment-width":(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryx1b1nz06`,$$css:!0},{"--x---layout-alignment-width":(typeof e==`number`?`${e}px`:e)==null?void 0:typeof e==`number`?`${e}px`:e}],contentWidth:e=>[H,{ks0D6T:(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryxf68679`,$$css:!0},{"--x-maxWidth":(e=>typeof e==`number`?e+`px`:e??void 0)(typeof e==`number`?`${e}px`:e)}]},W={"astryx-default-marker":`astryx-default-marker`,$$css:!0},R.displayName=`Layout`,R.__docgenInfo={description:`General layout primitive with header, start, content, end, and footer slots.
Use it to arrange regions within a page or bounded container. AppShell owns
the page shell, app-wide navigation, responsive shell behavior, skip link,
and main landmark.

Handles padding collapse between adjacent slots, scroll containment in the
content area, and automatic RTL support via CSS logical properties.

Structure:
\`\`\`
┌─────────────────────────────────────────┐
│                 header                  │
├──────┬─────────────────────────┬────────┤
│      │                         │        │
│start │        content          │  end   │
│      │                         │        │
├──────┴─────────────────────────┴────────┤
│                 footer                  │
└─────────────────────────────────────────┘
\`\`\`

When to use Layout vs raw flexbox:
- Page with a sidebar → Layout with \`start\` slot
- Dashboard with header + scrollable body → Layout with \`header\` + \`content\`
- Settings page with nav panel → Layout with \`start\` + \`content\`
- Simple vertical stack of items → use VStack instead

@example
\`\`\`
<Layout
  header={<LayoutHeader hasDivider>App Name</LayoutHeader>}
  start={
    <LayoutPanel hasDivider width={240} role="navigation">
      <Navigation />
    </LayoutPanel>
  }
  content={
    <LayoutContent role="main">
      <MainContent />
    </LayoutContent>
  }
/>
\`\`\``,methods:[],displayName:`Layout`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root DOM element.`},content:{required:!1,tsType:{name:`ReactNode`},description:`Main content area (center).`},contentWidth:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Maximum width of the aligned content within each slot (header, content,\nfooter, panels). Dividers remain full-bleed. Content is centered with\n`margin-inline: auto` when narrower than the available space.\n\nIn a layout without start or end panels, LayoutContent spans the available\nwidth so its scrollbar stays at the outer edge, while its children align\ninternally to `contentWidth`. With exactly one panel, that panel remains\naligned to the `contentWidth` frame while LayoutContent extends to the\nopposite open edge. With both panels, `contentWidth` includes the complete\nstart + content + end composition. Intrinsic widths such as `fit-content`\nretain the constrained composition because they cannot participate in the\ninternal alignment arithmetic. Percentage widths, including\npercentage-bearing `calc()`, `min()`, `max()`, and `clamp()` values, use the\nconstrained fallback because they cannot share one arithmetic basis. Bare\n`var(...)` values also use that fallback because their resolved value may be\nintrinsic; wrap a variable guaranteed to resolve to a length in `calc(...)`\nto opt into edge scrolling.\n\nNumbers are treated as pixels, strings are used as-is (e.g., '60ch').\nCommon page widths:\n- `640` — forms, settings, text-focused pages\n- `960` — content pages, component demos, wider layouts"},end:{required:!1,tsType:{name:`ReactNode`},description:`End panel slot (right in LTR, left in RTL).`},footer:{required:!1,tsType:{name:`ReactNode`},description:`Footer slot.`},header:{required:!1,tsType:{name:`ReactNode`},description:`Header slot.`},height:{required:!1,tsType:{name:`union`,raw:`'fill' | 'auto'`,elements:[{name:`literal`,value:`'fill'`},{name:`literal`,value:`'auto'`}]},description:"Controls the height behavior:\n- `fill`: Layout fills container height, content scrolls internally (default)\n- `auto`: Layout grows with content, container/page scrolls\n@default 'fill'",defaultValue:{value:`'fill'`,computed:!1}},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Padding at the layout's outer edges using the spacing scale.
Applies to this Layout's own header, footer, panels, and content; a nested
Layout does not inherit it. Without \`padding\`, regions use the enclosing
Card, Section, or Dialog padding, or the default inset.
Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.`},start:{required:!1,tsType:{name:`ReactNode`},description:`Start panel slot (left in LTR, right in RTL).`},defaultHasDividers:{required:!1,tsType:{name:`boolean`},description:`Default divider visibility for LayoutHeader and LayoutFooter children.
When set, headers/footers that don't explicitly pass \`hasDivider\` will use this value.
When not set, nested layouts inherit from their parent context.`},children:{required:!1,tsType:{name:`ReactNode`},description:"Children are a shorthand for the `content` slot:\n`<Layout>{main}</Layout>` is equivalent to `<Layout content={main} />`.\nThe surrounding zones (`header`/`start`/`end`/`footer`) stay explicit\nprops. If both `content` and `children` are provided, `content` wins.\nAccepting children keeps the natural `<Layout>…</Layout>` form from\nrendering a blank shell."}},composes:[`Omit`]}})))()}function K({children:e,isScrollable:t=!0,padding:r,label:i,role:a,xstyle:o,className:s,style:c,ref:l,...u}){let{hasHeader:d,hasFooter:f,hasStart:p,hasEnd:h}=(0,q.use)(P),g=r===0,v=m({isScrollable:t,role:a,label:i}),b=k(l,v.ref);return(0,J.jsx)(`div`,{ref:b,role:v.role,"aria-label":v[`aria-label`],..._(y(`layout-content`),n(Y.content,!p&&!g&&r==null&&Y.noStart,!h&&!g&&r==null&&Y.noEnd,!d&&!g&&r==null&&Y.noHeader,!f&&!g&&r==null&&Y.noFooter,t&&Y.scrollable,g&&Y.fullBleed,r!=null&&x[r],r!=null&&C[r],r!=null&&T[r],r!=null&&O[r],!p&&!h&&!g&&Y.constrainedNoPanelsStart,!p&&!h&&!g&&Y.constrainedNoPanelsEnd,p&&!h&&!g&&Y.constrainedSingleStartPanel,!p&&h&&!g&&Y.constrainedSingleEndPanel,o),s,c),...u,children:e})}var q,J,Y;function X(){return(X=e((()=>{q=t(),r(),F(),A(),g(),b(),S(),E(),J=o(),Y={content:{kB7OPa:`astryx9f619`,kZKoxP:`astryx5yr21d`,kUk6DE:`astryx98rzlu`,kAzted:`astryx2lwn1j`,kVQacm:`astryx7giv3`,kZCmMZ:`astryxwjyata`,kwRFfy:`astryx1peupej`,kLKAdn:`astryx1q01h0h`,kGO01o:`astryx12g7ifj`,"--container-padding-inline-start":`astryx408pgh`,"--container-padding-inline-end":`astryxikqloz`,"--container-padding-block-start":`astryxzrhu1o`,"--container-padding-block-end":`astryx165zlxo`,$$css:!0},noStart:{kZCmMZ:`astryxaku5ci`,"--container-padding-inline-start":`astryxt2a87w`,$$css:!0},noEnd:{kwRFfy:`astryx19eyx77`,"--container-padding-inline-end":`astryxhq06x6`,$$css:!0},noHeader:{kLKAdn:`astryxuqi0w`,"--container-padding-block-start":`astryx186o6qk`,$$css:!0},noFooter:{kGO01o:`astryx1363qu6`,"--container-padding-block-end":`astryxfsxxt8`,$$css:!0},scrollable:{kVQacm:`astryxysyzu8`,$$css:!0},constrainedNoPanelsStart:{kZCmMZ:`astryxhlv5e7`,kE3dHu:null,kpe85a:null,$$css:!0},constrainedNoPanelsEnd:{kwRFfy:`astryx1ahicqp`,kE3dHu:null,kpe85a:null,$$css:!0},constrainedSingleStartPanel:{kwRFfy:`astryxy07wb4`,kE3dHu:null,kpe85a:null,$$css:!0},constrainedSingleEndPanel:{kZCmMZ:`astryxxjme2g`,kE3dHu:null,kpe85a:null,$$css:!0},fullBleed:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kLKAdn:`astryxexx8yu`,kGO01o:`astryx18d9i69`,"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,$$css:!0}},K.displayName=`LayoutContent`,K.__docgenInfo={description:`Scrollable main content area for Layout. Wraps the primary body content
with automatic scroll containment and context-aware padding.

Already provides its own padding and scroll — don't add padding or overflow
to children. Use \`padding={0}\` if you need edge-to-edge content.

@example
\`\`\`
<Card>
  <Layout
    header={<LayoutHeader>Title</LayoutHeader>}
    content={<LayoutContent>Main body content</LayoutContent>}
  />
</Card>
<Card>
  <Layout
    content={
      <LayoutContent padding={0}>
        <Table />
      </LayoutContent>
    }
  />
</Card>
<Card>
  <Layout
    content={
      <LayoutContent isScrollable={false}>
        <StickyElement />
      </LayoutContent>
    }
  />
</Card>
\`\`\``,methods:[],displayName:`LayoutContent`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the content area.`},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Internal padding of the content area using the spacing scale.
Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.
Overrides the default padding from the layout container.`},isScrollable:{required:!1,tsType:{name:`boolean`},description:`Enables scrollable overflow for the content area.
Set to false for auto-height layouts where sticky positioning
needs to work with parent containers.
@default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the landmark.
Required when role is set and multiple landmarks of the same type exist.
While the content scrolls, it also names the scrolling region, which
otherwise takes a translated "Content".`},role:{required:!1,tsType:{name:`AriaRole`},description:`ARIA landmark role for accessibility.
Use 'main' only for the primary content area of the page (not in nested layouts).`}},composes:[`Omit`]}})))()}export{N as a,j as c,G as i,M as l,X as n,P as o,R as r,F as s,K as t};