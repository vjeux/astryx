import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o}from"./mergeProps-DHkqklmt.js";import{n as s}from"./isRenderable-C2vVZKI4.js";import{i as c,t as l}from"./themeProps-BVy3p_gf.js";import{n as u}from"./mergeRefs-j3zlnF-6.js";import{c as d,d as f,l as p,u as m}from"./Avatar-C6K3OBt3.js";function h(e){return e<=36?{dotSize:10,borderWidth:1,iconSize:0,tier:`small`}:e<=72?{dotSize:20,borderWidth:2,iconSize:12,tier:`medium`}:{dotSize:32,borderWidth:4,iconSize:18,tier:`large`}}function g({shape:e,field:t,stroke:n}){let r=t/2;return(0,y.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 ${t} ${t}`,width:t,height:t,fill:`none`,...c(`avatar-status-dot-glyph`,{shape:e}),children:e===`ring`?(0,y.jsx)(`circle`,{cx:r,cy:r,r:(t-n)/2,fill:`none`,stroke:`currentColor`,strokeWidth:n}):(0,y.jsx)(`line`,{x1:t*.25/2+n/2,y1:r,x2:t*1.75/2-n/2,y2:r,stroke:`currentColor`,strokeWidth:n,strokeLinecap:`round`})})}function _({ref:e,variant:t=`success`,label:n,icon:i,xstyle:a,className:l,style:f,...p}){let _=(0,v.use)(m),x=(0,v.use)(d),E=(0,v.useCallback)(()=>{let e=x?.current;if(e!=null)return e.label=n,e.update?.(),()=>{e.label=void 0,e.update?.()}},[x,n]),D=(0,v.useMemo)(()=>u(e,E),[e,E]),{dotSize:O,borderWidth:k,iconSize:A,tier:j}=h(_),M=s(i)&&A>0,N=M?void 0:w[t];return(0,y.jsxs)(`div`,{...p,ref:D,...n?{role:`img`,"aria-label":n}:void 0,...o(c(`avatar-status-dot`,{variant:t}),r(b.dot,C[t],S.size(O,k),a),l,f),children:[M&&(0,y.jsx)(`span`,{"aria-hidden":`true`,...r(b.icon,S.iconSize(A)),children:i}),N&&(0,y.jsx)(g,{shape:N,field:O-k*2,stroke:T[j]})]})}var v,y,b,x,S,C,w,T;function E(){return(E=t((()=>{v=e(n(),1),i(),f(),p(),l(),y=a(),b={dot:{kaIpWk:`astryxjspbzw`,ksu8eU:`astryx1y0btm7`,kVAM5u:`astryx1touxvs`,kB7OPa:`astryx9f619`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,$$css:!0},success:{kWkggS:`astryxdsz4j9`,kMwMTN:`astryxri61p4`,$$css:!0},neutral:{kWkggS:`astryx10xzikg`,kMwMTN:`astryxv1l7n4`,$$css:!0},error:{kWkggS:`astryx1pjz0fi`,kMwMTN:`astryx1m024r3`,$$css:!0},icon:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kLWn49:`astryx14ju556`,$$css:!0}},x={kjGldf:``,k2ei4v:``,kZ1KPB:``,ke9TFa:``,kWqL5O:``,kLoX6v:``,kEafiO:``,kt9PQ7:``,$$css:!0},S={size:(e,t)=>[x,{kzqmXN:e==null?e:`astryx5lhr3w`,kZKoxP:e==null?e:`astryx16ye13r`,kMzoRj:t==null?t:`astryx1mw0n95`,$$css:!0},{"--x-width":(e=>typeof e==`number`?e+`px`:e??void 0)(e),"--x-height":(e=>typeof e==`number`?e+`px`:e??void 0)(e),"--x-borderWidth":(e=>typeof e==`number`?e+`px`:e??void 0)(t)}],iconSize:e=>[{kzqmXN:e==null?e:`astryx5lhr3w`,kZKoxP:e==null?e:`astryx16ye13r`,$$css:!0},{"--x-width":(e=>typeof e==`number`?e+`px`:e??void 0)(e),"--x-height":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}]},C={success:b.success,neutral:b.neutral,error:b.error},w={neutral:`ring`,error:`minus`},T={small:1,medium:1.5,large:2},_.displayName=`AvatarStatusDot`,_.__docgenInfo={description:`A status indicator dot that automatically scales to match the parent
Avatar's size.

Each variant pairs a colour with a distinct built-in shape (filled dot,
ring, minus bar) so status stays distinguishable without colour
perception (WCAG 2.1 SC 1.4.1). Themes can target the shape glyph via
the \`astryx-avatar-status-dot-glyph\` class and its \`data-shape\`
attribute.

Must be used inside an Avatar's \`status\` prop so it can read
the avatar size from context.

@example
\`\`\`
<Avatar
  name="John Doe"
  size="lg"
  status={<AvatarStatusDot variant="success" label="Online" />}
/>
<Avatar
  name="Jane Smith"
  size="xl"
  status={<AvatarStatusDot variant="success" label="Verified" icon={<CheckIcon />} />}
/>
\`\`\``,methods:[],displayName:`AvatarStatusDot`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},variant:{required:!1,tsType:{name:`AvatarStatusDotVariantMap`},description:"The semantic variant of the dot. Each variant pairs a colour with a\ndistinct built-in shape so status is never conveyed by colour alone\n(WCAG 2.1 SC 1.4.1):\n- `success` — filled green dot (e.g. online, accepted)\n- `neutral` — grey ring (e.g. away, offline, pending)\n- `error` — red dot with a minus bar (e.g. busy, do not disturb)\n\nMatches the `variant` naming convention from `StatusDot`.\n@default 'success'",defaultValue:{value:`'success'`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the status dot.
Describes the meaning of the indicator for screen readers
(e.g. "Online", "Accepted", "John Doe is busy").

Note: inside an Avatar the dot sits in the avatar's \`role="img"\`
subtree, where descendant semantics are pruned — the dot is never its
own stop there. Instead, Avatar reads this \`label\` and composes it into
its own accessible name (e.g. "Jane Doe, Online"), which is how the
status reaches assistive tech (WCAG 4.1.2). Standalone dots (outside an
Avatar) expose \`role="img"\` with this label directly.`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Optional icon to render centered inside the dot.
Accepts any ReactNode (typically an SVG icon).
The icon is automatically sized to fit the dot and hidden
at the smallest avatar sizes where there isn't enough room.

A rendered icon replaces the variant's built-in shape glyph, so use a
different icon per status — the same icon on every variant leaves the
statuses distinguishable by colour alone (WCAG 1.4.1). At the smallest
avatar sizes the built-in glyph still shows instead of the icon.
Booleans and empty strings are ignored (safe for \`cond && <Icon />\`),
but a component that renders nothing still counts as an icon and
suppresses the glyph.

@example
\`\`\`
<AvatarStatusDot variant="success" label="Verified" icon={<CheckIcon />} />
\`\`\``}},composes:[`Omit`]}})))()}function D({title:e,titleId:t,...n},r){return O.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?O.createElement(`title`,{id:t},e):null,O.createElement(`path`,{fillRule:`evenodd`,d:`M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z`,clipRule:`evenodd`}))}var O,k;function A(){return(A=t((()=>{O=e(n()),k=O.forwardRef(D)})))()}function j({title:e,titleId:t,...n},r){return M.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?M.createElement(`title`,{id:t},e):null,M.createElement(`path`,{fillRule:`evenodd`,d:`M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z`,clipRule:`evenodd`}))}var M,N;function P(){return(P=t((()=>{M=e(n()),N=M.forwardRef(j)})))()}function F({title:e,titleId:t,...n},r){return I.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?I.createElement(`title`,{id:t},e):null,I.createElement(`path`,{fillRule:`evenodd`,d:`M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z`,clipRule:`evenodd`}))}var I,L;function R(){return(R=t((()=>{I=e(n()),L=I.forwardRef(F)})))()}export{k as a,E as c,P as i,R as n,A as o,N as r,_ as s,L as t};