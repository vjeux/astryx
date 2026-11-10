import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{n as o}from"./isRenderable-C2vVZKI4.js";import{i as s,t as c}from"./themeProps-BVy3p_gf.js";import{n as l,t as u}from"./useAnnounceRenderedText-D_CF9fL0.js";function d(e){let t=(0,f.useRef)(null);return l(t,!0,``,{skipFirstRender:!0}),(0,p.jsx)(`div`,{ref:t,...e})}var f,p;function m(){return(m=e((()=>{f=t(),u(),p=i(),d.__docgenInfo={description:"A `div` whose rendered text is announced once through the shared polite\nlive region when it appears or changes after the page loaded, and never for\ntext present when the page first rendered (`spec:AST-086` FR11).",methods:[],displayName:`AnnounceRenderedText`}})))()}function h({title:e,description:t,icon:r,actions:i,headingLevel:c=3,isCompact:l=!1,xstyle:u,className:f,style:p,ref:m,...h}){let y=`h${c}`;return(0,_.jsxs)(`div`,{ref:m,...h,...a(s(`empty-state`,{variant:l?`compact`:null}),n(v.container,l&&v.containerCompact,u),f,p),children:[o(r)&&(0,_.jsx)(`div`,{"aria-hidden":`true`,children:r}),(0,_.jsxs)(d,{className:`astryx78zum5 astryxdt5ytf astryx6s0dn4 astryxxc7z9f`,children:[(0,g.createElement)(y,a(s(`empty-state-title`,{variant:l?`compact`:null}),{0:{className:`astryx1ghz6dp astryxjb2p0i astryx18juvz8 astryx2mo6ok astryxf74fhv astryx1tgivj0`},1:{className:`astryx1ghz6dp astryxjb2p0i astryx2mo6ok astryxf74fhv astryx1tgivj0 astryxcr08ib`}}[!!l|0]),e),o(t)&&(0,_.jsx)(`div`,{...a(s(`empty-state-description`,{variant:l?`compact`:null}),{0:{className:`astryx1ghz6dp astryxjb2p0i astryxjm74w1 astryx1sodnla astryxw6l6zx astryxv1l7n4`},1:{className:`astryx1ghz6dp astryxjb2p0i astryx1sodnla astryxw6l6zx astryxv1l7n4 astryx141an7d`}}[!!l|0]),children:t})]}),o(i)&&(0,_.jsx)(`div`,{...{0:{className:`astryx78zum5 astryx1q0g3np astryx6s0dn4 astryx1txdalj astryxcsaf9d`},1:{className:`astryx78zum5 astryx6s0dn4 astryx1txdalj astryxcsaf9d astryxdt5ytf`}}[!!l|0],children:i})]})}var g,_,v;function y(){return(y=e((()=>{g=t(),r(),m(),c(),_=i(),v={container:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,k9WMMc:`astryx2b8uid`,kOIVth:`astryx18g69wz`,k8WAf4:`astryxmfvnks`,kg3NbH:`astryxm7rs69`,$$css:!0},containerCompact:{kOIVth:`astryx1txdalj`,k8WAf4:`astryx1na6nto`,kg3NbH:`astryx1pzlopt`,$$css:!0}},h.displayName=`EmptyState`,h.__docgenInfo={description:`An empty state placeholder for content areas with no data.
Displays an icon or illustration, title, optional description, and action buttons.

Not a live region. Its title and description are announced once when they
appear or change after the page loaded, never when the page first renders
with them (\`spec:AST-086\` FR2).
Styles use Astryx theme tokens via StyleX. Wrap your app in <Theme> to apply a theme.

@example
\`\`\`
<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
/>
<EmptyState
  icon={<Icon icon={InboxIcon} size="lg" />}
  title="No messages"
  description="You're all caught up!"
  actions={<Button label="Compose" variant="primary" />}
/>
\`\`\``,methods:[],displayName:`EmptyState`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},title:{required:!0,tsType:{name:`string`},description:`The primary message displayed in the empty state.`},description:{required:!1,tsType:{name:`string`},description:`Optional secondary text providing additional context.`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Optional icon or illustration displayed above the title.
Rendered as decorative (aria-hidden="true").`},actions:{required:!1,tsType:{name:`ReactNode`},description:"Optional action buttons displayed below the description.\nLaid out horizontally by default, stacked vertically when `isCompact`."},headingLevel:{required:!1,tsType:{name:`union`,raw:`1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}]},description:`Semantic heading level for the title element.
Controls only the rendered HTML tag (h1–h6) so the title fits the
document outline. This is a semantic change for accessibility and does
not change the visual size of the title, which stays fixed regardless
of level.
@default 3`,defaultValue:{value:`3`,computed:!1}},isCompact:{required:!1,tsType:{name:`boolean`},description:`Use compact variant for constrained spaces with reduced spacing.
@default false`,defaultValue:{value:`false`,computed:!1}}},composes:[`Omit`]}})))()}export{y as n,h as t};