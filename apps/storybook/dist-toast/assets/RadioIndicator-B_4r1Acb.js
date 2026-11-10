import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i}from"./mergeProps-DHkqklmt.js";import{n as a}from"./isRenderable-C2vVZKI4.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./Icon-BmO5FtDV.js";function u({state:e,size:n=`md`,isDisabled:r=!1,children:o,ref:s,className:c,style:u,xstyle:m,...h}){let g=e===`checked`;return a(o)?(0,d.jsx)(`span`,{...h,ref:s,"aria-hidden":`true`,...i(t(p.slot,r?p.disabled:p.enabled,m),c,u),children:o}):g?(0,d.jsx)(l,{...h,"aria-hidden":`true`,icon:`check`,size:f[n],color:r?`disabled`:`accent`,xstyle:m,className:c,style:u}):null}var d,f,p;function m(){return(m=e((()=>{n(),c(),d=r(),f={sm:`sm`,md:`sm`},p={slot:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kzqmXN:`astryxcdlrvm`,kZKoxP:`astryx1l36t39`,$$css:!0},enabled:{kMwMTN:`astryxqwr325`,$$css:!0},disabled:{kMwMTN:`astryxqa6c3m`,$$css:!0}},u.displayName=`CheckIndicator`,u.__docgenInfo={description:`The default single-selection mark: a checkmark when chosen, nothing when not.

Decorative and non-interactive — it renders \`aria-hidden\` and owns no role,
state, or focus behavior; the option or row that hosts it keeps all of that.

@example
\`\`\`
<CheckIndicator state={isSelected ? 'checked' : 'unchecked'} size="sm" />
\`\`\`

Swap every single-selection mark for a radio:

@example
\`\`\`
import {RadioIndicator} from '@astryxdesign/core/Indicator';
defineTheme({name: 'brand', indicators: {check: RadioIndicator}});
\`\`\``,methods:[],displayName:`CheckIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},state:{required:!0,tsType:{name:`IndicatorFamilyMap[F]`,raw:`IndicatorFamilyMap[F]`},description:`Which state to draw. The state space is fixed by the family.`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`}]},description:`Control size.
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`}},composes:[`Omit`]}})))()}function h({state:e,size:n=`md`,isDisabled:r=!1,children:s,ref:c,className:l,style:u,xstyle:d,...f}){let p=e!==`unchecked`;return(0,g.jsx)(`span`,{...f,ref:c,"aria-hidden":`true`,...i(o(`radio-indicator`,{size:n,checked:p?`checked`:null,disabled:r?`disabled`:null}),t(_.circle,v[n],p?_.checked:_.unchecked,r&&_.disabled,r&&!p&&_.disabledUnchecked,d),l,u),children:a(s)?s:p&&(0,g.jsx)(`span`,{...i(o(`radio-indicator-dot`,{size:n}),t(_.dot,y[n]))})})}var g,_,v,y;function b(){return(b=e((()=>{n(),s(),g=r(),_={circle:{kB7OPa:`astryx9f619`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kMzoRj:`astryx1litavf`,ksu8eU:`astryx1y0btm7`,kaIpWk:`astryxjspbzw`,k1ekBW:`astryxts7igz`,kIyJzY:`astryxuedmi6 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,$$css:!0},unchecked:{kVAM5u:`astryxvy26l8 astryxvr0s6v`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx10xzikg astryx1orexks`,$$css:!0},checked:{kVAM5u:`astryxad5do astryx1nccqs`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx1ewilqj astryxe50u90`,$$css:!0},disabled:{kSiTet:`astryxbyyjgo`,kVAM5u:`astryx14i3s5s astryxzl8x75`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,$$css:!0},disabledUnchecked:{kWkggS:`astryxwmxj5m astryxejnnay`,$$css:!0},dot:{kaIpWk:`astryxjspbzw`,kWkggS:`astryx1azo05 astryxwvh9j7`,$$css:!0}},v={sm:{kzqmXN:`astryxw4jnvo`,kZKoxP:`astryx1qx5ct2`,$$css:!0},md:{kzqmXN:`astryxvy4d1p`,kZKoxP:`astryxxk0z11`,$$css:!0}},y={sm:{kzqmXN:`astryx1xc55vz`,kZKoxP:`astryxdk7pt`,$$css:!0},md:{kzqmXN:`astryx1fsd2vl`,kZKoxP:`astryx170jfvy`,$$css:!0}},h.displayName=`RadioIndicator`,h.__docgenInfo={description:`The default radio visual: a circle with a filled inner dot when selected.

Decorative and non-interactive — it renders \`aria-hidden\` and owns no input,
role, or focus behavior. Themes replace it wholesale through
\`defineTheme({indicators: {radio: MyRadio}})\`, or restyle it through the
\`radio-indicator\` / \`radio-indicator-dot\` theme targets like any other
component.

Unlike an icon, a radio draws in *both* states — an empty circle when
unchecked. That is what makes it usable as a selection indicator in
components whose default is "a checkmark when selected, nothing otherwise".

@example
\`\`\`
<RadioIndicator state="checked" size="md" />
\`\`\``,methods:[],displayName:`RadioIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},state:{required:!0,tsType:{name:`IndicatorFamilyMap[F]`,raw:`IndicatorFamilyMap[F]`},description:`Which state to draw. The state space is fixed by the family.`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`}]},description:`Control size.
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`}},composes:[`Omit`]}})))()}export{m as i,b as n,u as r,h as t};