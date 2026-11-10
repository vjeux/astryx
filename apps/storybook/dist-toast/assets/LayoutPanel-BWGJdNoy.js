import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{c as ee,l as i,o as a,s as o}from"./LayoutContent-BEmJ3Yl2.js";import{t as s}from"./jsx-runtime-MKhVqBIO.js";import{n as c,t as l}from"./useScrollRegionProps-DNvDy4pz.js";import{n as u}from"./mergeProps-DHkqklmt.js";import{i as d,t as f}from"./themeProps-BVy3p_gf.js";import{n as p,t as m}from"./paddingStyles.stylex-DcSy8JNI.js";import{a as te,n as ne,o as h,t as g}from"./padding.stylex-DigmwS-k.js";import{n as _,t as v}from"./useMergedRefs-D6axeCXB.js";import{a as re,o as y,r as b}from"./focusReturn-ClYRo3U4.js";import{n as x,t as S}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{f as C,g as w,i as T,o as E,p as D,u as O}from"./useResizable-MO9DK77O.js";import{n as k,t as A}from"./LayoutChangeSnapshot-CfAuxnOj.js";import{n as ie,t as j}from"./useFocusLeavingChange-MEf4yROz.js";function M({children:e,hasDivider:t=!1,isScrollable:r=!0,label:i,padding:o,role:s,width:l,resizable:f,xstyle:m,className:h,style:v,ref:b,...S}){let C=f==null?void 0:E(f),T=(0,N.use)(ee),{hasHeader:k,hasFooter:j}=(0,N.use)(a),M=C?C._size:l,R=M===0,z=(0,N.useRef)(null),[B]=(0,N.useState)(O),V=(0,N.useSyncExternalStore)(B.subscribe,B.isCollapsed,I),H=C==null,U=C==null?void 0:D(C);x(()=>{let e=H||U!=null,t=t=>{let n=B.attach(e?t:null,H);U?.attach(n)};return t(z.current),()=>{t(null)}},[B,H,U]);let W=T===`end`?`inline-start`:`inline-end`,G=(0,N.useCallback)(()=>{B.beforeChange(R)},[B,R]);x(()=>{B.committed(M,W)});let K=C==null?V:C._isCollapsed,q=ie(K,e=>e?null:y(z.current),(e,t)=>{let n=z.current;t&&n!=null&&re(e,B.focusTarget()??w(n,T),n)}),[J,Y]=(0,N.useState)(K);!K&&J&&Y(!1),x(()=>{K&&!J&&Y(!0)},[K,J]);let ae=K&&J,X=T===`start`,Z=T===`end`,Q=o===0,oe=!t&&!Q&&o==null&&!R,$=c({isScrollable:r&&!R,role:s,label:i}),se=_(b,$.ref,z),ce=X?F.dividerEnd:Z?F.dividerStart:null,le=X?F.collapseEnd:Z?F.collapseStart:null;return(0,P.jsxs)(`div`,{ref:se,role:$.role,"aria-label":$[`aria-label`],...u(d(`layout-panel`),n(F.panel,L.sizing(M??null),X&&!Q&&o==null&&F.startPanel,Z&&!Q&&o==null&&F.endPanel,!k&&!Q&&o==null&&F.noHeader,!j&&!Q&&o==null&&F.noFooter,r&&F.scrollable,Q&&F.fullBleed,o!=null&&p[o],o!=null&&te[o],o!=null&&ne[o],o!=null&&g[o],t&&ce,oe&&le,R&&F.zeroWidth,m),h,v),...S,...ae?{inert:!0,"aria-hidden":!0}:{},children:[(0,P.jsx)(A,{value:R,onBeforeChange:G}),(0,P.jsx)(A,{value:K,onBeforeChange:q}),e]})}var N,P,F,I,L;function R(){return(R=e((()=>{N=t(),r(),i(),o(),v(),l(),T(),C(),k(),S(),b(),j(),f(),m(),h(),P=s(),F={panel:{kB7OPa:`astryx9f619`,kmuXW:`astryx2lah0s`,kVQacm:`astryx7giv3`,kZCmMZ:`astryxwjyata`,kwRFfy:`astryx1peupej`,kLKAdn:`astryxqty4a`,kGO01o:`astryxg476vw`,"--container-padding-inline-start":`astryx408pgh`,"--container-padding-inline-end":`astryxikqloz`,"--container-padding-block-start":`astryxjmgx01`,"--container-padding-block-end":`astryxi9ns85`,$$css:!0},startPanel:{kZCmMZ:`astryxaku5ci`,kE3dHu:null,kpe85a:null,"--container-padding-inline-start":`astryxt2a87w`,$$css:!0},endPanel:{kwRFfy:`astryx19eyx77`,kE3dHu:null,kpe85a:null,"--container-padding-inline-end":`astryxhq06x6`,$$css:!0},noHeader:{kLKAdn:`astryxuqi0w`,"--container-padding-block-start":`astryx186o6qk`,$$css:!0},noFooter:{kGO01o:`astryx1363qu6`,"--container-padding-block-end":`astryxfsxxt8`,$$css:!0},fullBleed:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kE3dHu:null,kpe85a:null,kLKAdn:`astryxexx8yu`,kGO01o:`astryx18d9i69`,"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,$$css:!0},scrollable:{kVQacm:`astryxysyzu8`,kXHlph:null,kORKVm:null,$$css:!0},zeroWidth:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kE3dHu:null,kpe85a:null,kVQacm:`astryx7giv3`,kXHlph:null,kORKVm:null,$$css:!0},dividerEnd:{ke9TFa:`astryx1lun4ml`,kZ1KPB:null,kWqL5O:null,k8ry5P:`astryx18b5jzi`,k4WBpm:null,kSWEuD:null,kBCPoo:`astryx1gejf6u`,kaZRDh:null,k26BEO:null,$$css:!0},dividerStart:{k2ei4v:`astryxpilrb4`,kZ1KPB:null,kWqL5O:null,kVhnKS:`astryx1t7ytsu`,k4WBpm:null,kSWEuD:null,kGJrpR:`astryx1j92z86`,kaZRDh:null,k26BEO:null,$$css:!0},collapseStart:{keTefX:`astryx1wim8z0`,koQZXg:null,km5ZXQ:null,$$css:!0},collapseEnd:{k71WvV:`astryx1kpg4um`,koQZXg:null,km5ZXQ:null,$$css:!0}},I=()=>!1,L={sizing:e=>[{kzqmXN:e==null?e:`astryx5lhr3w`,$$css:!0},{"--x-width":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}]},M.displayName=`LayoutPanel`,M.__docgenInfo={description:`Sidebar or side panel for Layout. Use in the \`start\` slot for left navigation
or in the \`end\` slot for detail/inspector panels.
Renders with optional divider and context-aware padding.
Divider position is auto-detected based on which slot the panel is in.

Already provides its own padding and scroll — don't add padding or
overflow to children. Use \`padding={0}\` if you need edge-to-edge content.

@example
\`\`\`
<Card>
  <Layout
    start={
      <LayoutPanel hasDivider role="navigation">
        <Navigation />
      </LayoutPanel>
    }
    content={<LayoutContent>Main content</LayoutContent>}
    end={
      <LayoutPanel hasDivider role="complementary">
        <Sidebar />
      </LayoutPanel>
    }
  />
</Card>
\`\`\``,methods:[],displayName:`LayoutPanel`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the panel.`},hasDivider:{required:!1,tsType:{name:`boolean`},description:"Adds a themed border on the appropriate edge.\n- Start panel: border on end edge (right in LTR)\n- End panel: border on start edge (left in LTR)\nWhen false and `padding` is unset, the panel and the content share one gap.\n\nNote: When using `resizable` with an adjacent `ResizeHandle hasDivider`,\nset this to `false` to avoid a double-line artifact.\n@default false",defaultValue:{value:`false`,computed:!1}},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Internal padding of the panel on every edge, using the spacing scale.
Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.
Replaces the automatic inset and the gap shared with the content.
\`0\` is full bleed.`},isScrollable:{required:!1,tsType:{name:`boolean`},description:`Enables scrollable overflow for the panel.
Set to false for auto-height layouts where sticky positioning
needs to work with parent containers.
@default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the landmark.
Required when role is set and multiple landmarks of the same type exist.
While the panel scrolls, it also names the scrolling region, which
otherwise takes a translated "Content".`},role:{required:!1,tsType:{name:`AriaRole`},description:`ARIA landmark role for accessibility.
Use 'navigation' or 'complementary' only for top-level layouts (not nested).`},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Width of the panel.
Numbers are treated as pixels, strings are used as-is.
When \`resizable\` is provided, this is ignored — the hook controls width.`},resizable:{required:!1,tsType:{name:`union`,raw:`ResizableRegion | ResizableProps`,elements:[{name:`ResizableRegion`},{name:`ResizableProps`}]},description:`The output of \`useResizable()\`, or its \`props\`. When provided, the panel
width is driven by the hook and a resize handle should be placed
adjacent to this panel.

@example
\`\`\`
const resizable = useResizable({ defaultSize: 250, minSize: 200 });
<LayoutPanel resizable={resizable}>
  <Navigation />
</LayoutPanel>
<ResizeHandle resizable={resizable} />
\`\`\``}},composes:[`Omit`]}})))()}export{R as n,M as t};