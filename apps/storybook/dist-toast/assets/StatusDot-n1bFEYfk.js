import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i}from"./mergeProps-DHkqklmt.js";import{n as a}from"./isRenderable-C2vVZKI4.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{r as c,t as l}from"./Tooltip-CmQs04jO.js";function u({variant:e,label:n,isPulsing:r=!1,tooltip:s,icon:c,xstyle:u,className:m,style:h,ref:g,..._}){let v=a(c),y=(0,d.jsx)(`span`,{ref:g,role:`img`,"aria-label":n,...i(o(`status-dot`,{variant:e}),t(f.base,p[e],r&&f.pulsing,r&&f.reducedMotion,u),m,h),..._,children:v&&(0,d.jsx)(`span`,{"aria-hidden":`true`,className:`astryx78zum5 astryx6s0dn4 astryxl56j7k astryx14ju556 astryx1xc55vz astryxdk7pt`,children:c})});return s?(0,d.jsx)(l,{content:s,children:y}):y}var d,f,p;function m(){return(m=e((()=>{n(),c(),s(),d=r(),f={base:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kaIpWk:`astryx16rqkct`,kmuXW:`astryx2lah0s`,kzqmXN:`astryx1xc55vz`,kZKoxP:`astryxdk7pt`,$$css:!0},pulsing:{kKVMdj:`astryxkx4dgo`,k44tkh:`astryx1c74tu6`,kyAemX:`astryx4hg4is`,ko0y90:`astryxa4qsjk`,$$css:!0},reducedMotion:{kjO2d4:`astryx1aquc0h`,$$css:!0}},p={success:{kWkggS:`astryx14en1nb`,kMwMTN:`astryxrkvqaz`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0},warning:{kWkggS:`astryxzud2hm`,kMwMTN:`astryxrkvqaz`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0},error:{kWkggS:`astryxa2dwd4`,kMwMTN:`astryxrkvqaz`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0},accent:{kWkggS:`astryx1ewilqj`,kMwMTN:`astryx17wrial`,$$css:!0},neutral:{kWkggS:`astryx1q5y3ey`,kMwMTN:`astryxrkvqaz`,$$css:!0}},u.displayName=`StatusDot`,u.__docgenInfo={description:`A small colored dot indicator for status display (online/offline, severity, etc).

Fixed 8px size. By default the dot conveys status by colour only, which is
not accessible in isolation (WCAG 2.1 SC 1.4.1) — treat it as a signal the
surrounding UI must make accessible: use it as a binary present/absent
signal, pair it with a visible label, pass \`icon\` so the status carries a
non-colour mark, or convey the status accessibly elsewhere. See the usage
guidance in the component docs.

Renders as a non-focusable \`<span>\` with \`role="img"\` and
\`aria-label\` for accessibility. Styles use Astryx theme tokens via StyleX.
Wrap your app in \`<Theme>\` to apply a theme.

@example
\`\`\`
<StatusDot variant="success" label="Online" />
<StatusDot variant="error" label="Offline" />
<StatusDot variant="success" label="Live" isPulsing />
<StatusDot variant="success" label="Online" tooltip="Online" />
<StatusDot variant="success" label="Verified" icon={<CheckIcon />} />
\`\`\``,methods:[],displayName:`StatusDot`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLSpanElement>`,elements:[{name:`HTMLSpanElement`}]},description:`Ref forwarded to the root element`},variant:{required:!0,tsType:{name:`StatusDotVariantMap`},description:`The semantic color variant.`},label:{required:!0,tsType:{name:`string`},description:"Accessible label describing the status. Required for a11y — it is the\ndot's `aria-label`, so the status reaches screen readers without hover."},isPulsing:{required:!1,tsType:{name:`boolean`},description:`Whether the dot should pulse to indicate activity.
Respects \`prefers-reduced-motion\`.
@default false`,defaultValue:{value:`false`,computed:!1}},tooltip:{required:!1,tsType:{name:`string`},description:`Tooltip text shown on hover to explain the status meaning.
When omitted, no tooltip is rendered.`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Optional icon to render centered inside the dot. Accepts any ReactNode
(typically an SVG icon), painted in the dot's \`currentColor\` ink. Same
contract as \`AvatarStatusDot\`'s \`icon\`.

By default the dot is a colour-only signal; an icon gives the status a
non-colour mark, so use a different icon per status — the same icon on
every variant leaves the statuses distinguishable by colour alone
(WCAG 2.1 SC 1.4.1). Booleans and empty strings are ignored (safe for
\`cond && <Icon />\`).

@example
\`\`\`
<StatusDot variant="success" label="Verified" icon={<CheckIcon />} />
\`\`\``}},composes:[`Omit`]}})))()}export{m as n,u as t};