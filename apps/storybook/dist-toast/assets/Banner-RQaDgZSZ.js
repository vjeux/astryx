import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{b as ee,p as i}from"./tokens.stylex-uC3T-IhP.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o}from"./mergeProps-DHkqklmt.js";import{n as s}from"./isRenderable-C2vVZKI4.js";import{i as c,t as l}from"./themeProps-BVy3p_gf.js";import{o as u}from"./InternationalizationContext-C5wQA9mp.js";import{n as te,t as d}from"./useComponentTranslator-Dzvlp8mx.js";import{t as f}from"./composeEventHandlers-CceNiKXL.js";import{n as p,t as m}from"./Icon-BmO5FtDV.js";import{n as ne,r as h}from"./edgeCompensation.stylex-Cak90gjc.js";import{n as g,t as _}from"./Button-DoGM0DEN.js";import{n as v,t as y}from"./useCollapsible-B6jpypxb.js";var b;function x(){return(x=e((()=>{b={"@astryx.banner.collapse":`Collapse`,"@astryx.banner.dismiss":`Dismiss`,"@astryx.banner.dismissTitled":`{dismiss} {title}`,"@astryx.banner.expand":`Expand`}})))()}function S(e){return Object.prototype.hasOwnProperty.call(k,e)}function C({status:e,title:t,description:r,icon:i,isDismissable:a=!1,onDismiss:l,dismissLabel:u,endContent:d,container:p=`card`,elevation:h=`none`,collapsible:g=!0,children:y,xstyle:b,className:x,style:C,ref:M,onFocusCapture:re,onPointerDownCapture:ie,role:N,...ae}){let P=te(),[F,oe]=(0,w.useState)(!1),I=typeof g==`object`&&g?g:{},{isEnabled:L,isOpen:R,toggle:se}=v({isCollapsible:g!==!1&&{...I,defaultIsOpen:I.defaultIsOpen??!1}}),z=(0,w.useRef)(null),B=(0,w.useId)(),V=E[e],H=D[e],U=s(y),W=P(`@astryx.banner.dismiss`),G=u??W,ce=u??(typeof t==`string`?P(`@astryx.banner.dismissTitled`,{dismiss:W,title:t}):W);if(F)return null;let K=(e,t)=>{e instanceof HTMLElement&&e!==document.body&&!t.contains(e)&&(z.current=e)},le=e=>{K(e.relatedTarget,e.currentTarget)},ue=e=>{K(document.activeElement,e.currentTarget)},de=()=>{let e=z.current;oe(!0),l?.(),e?.isConnected&&e.focus()},q=L&&U,J=s(d)||a||q,fe=s(d)||a,pe=!s(r)&&fe,Y=U&&(!L||R),X=p===`card`,Z=N===`alert`,Q={},$={};for(let[e,t]of Object.entries(ae))Z&&e.startsWith(`aria-`)?Q[e]=t:$[e]=t;return(0,T.jsxs)(`div`,{ref:M,onFocusCapture:f(re,le),onPointerDownCapture:f(ie,ue),...o(c(`banner-frame`,{container:p,elevation:h}),n(O.root,j[h],X&&h!==`none`&&O.rootElevatedCard,b),x,C),role:Z?void 0:N,...$,children:[(0,T.jsxs)(`div`,{...o(c(`banner`,{container:p,status:e}),n(O.header,pe&&O.headerCentered,S(e)&&k[e],X&&(Y?O.headerCardWithContent:O.headerCardStandalone))),children:[(0,T.jsx)(`div`,{...s(i)?o(c(`banner-icon`,{status:e}),{className:`astryx78zum5 astryx6s0dn4 astryx2lah0s`}):{className:`astryx78zum5 astryx6s0dn4 astryx2lah0s`},"aria-hidden":`true`,children:s(i)?i:V==null?null:(0,T.jsx)(m,{icon:V,size:`md`,color:H,...c(`banner-icon`,{status:e})})}),(0,T.jsxs)(`div`,{role:Z?`alert`:void 0,...Q,...{0:{className:`astryx78zum5 astryxdt5ytf astryxxhr3t astryx98rzlu astryxeuugli`},1:{className:`astryx78zum5 astryxdt5ytf astryxxhr3t astryx98rzlu astryxeuugli astryxgualba`}}[!!s(d)|0],children:[(0,T.jsx)(`div`,{...{0:{className:`astryx1ghz6dp astryxjb2p0i astryxcr08ib astryx2mo6ok astryx1kq96og astryx1tgivj0 astryxj0a0fe astryx5ujdhh`},1:{className:`astryx1ghz6dp astryxjb2p0i astryxcr08ib astryx2mo6ok astryx1kq96og astryxj0a0fe astryx5ujdhh astryx1heor9g`}}[!!S(e)|0],children:t}),Z&&s(r)&&` `,s(r)&&(0,T.jsx)(`div`,{...o(c(`banner-description`),{0:{className:`astryx1ghz6dp astryxjb2p0i astryx141an7d astryx1sodnla astryx1ltkj2j astryxv1l7n4 astryxj0a0fe astryx5ujdhh`},1:{className:`astryx1ghz6dp astryxjb2p0i astryx141an7d astryx1sodnla astryx1ltkj2j astryxj0a0fe astryx5ujdhh astryx1heor9g`}}[!!S(e)|0]),children:r})]}),J&&(0,T.jsxs)(`div`,{...n(O.endArea,ne.inset(ee[`--spacing-2`])),children:[d,q&&(0,T.jsx)(_,{variant:`ghost`,size:`sm`,label:P(R?`@astryx.banner.collapse`:`@astryx.banner.expand`),tooltip:P(R?`@astryx.banner.collapse`:`@astryx.banner.expand`),icon:(0,T.jsx)(m,{icon:`chevronDown`,size:`sm`,color:`inherit`,xstyle:[O.chevron,R&&O.chevronExpanded]}),onClick:se,className:S(e)?n(A[e]).className:void 0,"aria-expanded":R,"aria-controls":Y?B:void 0,isIconOnly:!0}),a&&(0,T.jsx)(_,{variant:`ghost`,size:`sm`,label:ce,tooltip:G,icon:(0,T.jsx)(m,{icon:`close`,size:`sm`,color:`inherit`}),onClick:de,className:S(e)?n(A[e]).className:void 0,isIconOnly:!0})]})]}),Y&&(0,T.jsx)(`div`,{id:q?B:void 0,...o(c(`banner-content`,{container:p,status:e}),{0:{className:`astryx1de1mus astryx8o8v82 astryx1pzlopt astryxgbv0en astryxw8tdv1 astryx92x3c3 astryx1t7ytsu astryx18b5jzi astryx1q0q8m5 astryx1j92z86 astryx1gejf6u astryxw8gpjh`},1:{className:`astryx1de1mus astryx8o8v82 astryx1pzlopt astryxgbv0en astryxw8tdv1 astryx92x3c3 astryx1t7ytsu astryx18b5jzi astryx1q0q8m5 astryx1j92z86 astryx1gejf6u astryxw8gpjh astryx1k5g1gk astryx1eprgri`}}[!!X|0]),children:y})]})}var w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{w=t(),r(),g(),p(),i(),y(),h(),l(),d(),x(),T=a(),u(b),E={info:`info`,warning:`warning`,error:`error`,success:`success`},D={info:`inherit`,warning:`inherit`,error:`inherit`,success:`inherit`},O={root:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kMv6JI:`astryxjb2p0i`,$$css:!0},rootElevatedCard:{kaIpWk:`astryx1vf2byn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},header:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx1cy8zhl`,kwnvtZ:`astryx1a02dak`,k1C7PZ:`astryxak3so`,khm7nJ:`astryx4olc9o`,k8WAf4:`astryx8o8v82`,kg3NbH:`astryx1pzlopt`,$$css:!0},headerCardStandalone:{kaIpWk:`astryx1vf2byn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},headerCardWithContent:{krdFHd:`astryxwxb7qi`,kfmiAY:`astryx13nour3`,kIxVMA:null,ksF3WI:null,kVL7Gh:`astryxbiv7yw`,kT0f0o:`astryx16uus16`,kqGeR4:null,kYm2EN:null,$$css:!0},headerCentered:{kGNEyG:`astryx6s0dn4`,$$css:!0},endArea:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kwnvtZ:`astryx1a02dak`,kjj79g:`astryx13a6bvl`,kOIVth:`astryx1txdalj`,kmuXW:`astryx2lah0s`,kMwMTN:`astryx1tgivj0`,ks0D6T:`astryx193iq5w`,keTefX:`astryxvc5jky`,kqGvvJ:`astryx81ka23`,$$css:!0},chevron:{k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronExpanded:{k3aq6I:`astryx19jd1h0`,$$css:!0}},k={info:{kWkggS:`astryxjeheca`,kMwMTN:`astryx1w9aomi`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0},warning:{kWkggS:`astryx24i8r5`,kMwMTN:`astryxfy1f8t`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0},error:{kWkggS:`astryx1pritpl`,kMwMTN:`astryxl8t7bd`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0},success:{kWkggS:`astryxu13z74`,kMwMTN:`astryxvchut`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,$$css:!0}},A={info:{"--color-text-primary":`astryx1lheorj`,$$css:!0},warning:{"--color-text-primary":`astryxtlqn95`,$$css:!0},error:{"--color-text-primary":`astryxyur9ww`,$$css:!0},success:{"--color-text-primary":`astryxul3f6w`,$$css:!0}},j={none:{kGVxlE:`astryx1gnnqk1`,$$css:!0},low:{kGVxlE:`astryx1i5ehqx`,$$css:!0},med:{kGVxlE:`astryx14hfi27`,$$css:!0},high:{kGVxlE:`astryx1kcpxr7`,$$css:!0}},C.displayName=`Banner`,C.__docgenInfo={description:`A persistent status notification banner for info, warning, error, or success messages.

Two-part visual structure:
- Header: colored status background with icon, title, description, and actions
- Content (optional): card background area for additional rich content

When children are provided, a chevron toggle appears in the header end area
(to the left of the dismiss button if present) and the content starts
collapsed. Pass \`collapsible={false}\` for content that is always visible,
or a config object to change the initial state or control it.

Manages its own dismissed state internally — the banner hides on dismiss
even if \`onDismiss\` is not provided, so product teams don't need to wire
up state management for basic dismiss behavior.

Status controls visual meaning only. The component adds no live-region role;
announce async outcomes from their transition handler with \`useAnnounce\`.
Pass \`role="alert"\` only for an urgent message: Banner places it on the
title and description, so controls and supporting content are not read as
part of the alert.

@example
\`\`\`
<Banner status="info" title="New update available" />
<Banner
  status="error"
  title="Something went wrong"
  description="Please try again later."
  isDismissable
  onDismiss={() => logDismiss()}
/>
<Banner
  status="error"
  title="Multiple errors found"
  description="The following issues need to be resolved:"
  isDismissable>
  <ul>
    <li>Email address is invalid</li>
    <li>Password must be at least 8 characters</li>
  </ul>
</Banner>
<Banner
  status="warning"
  title="Configuration changes"
  collapsible={{defaultIsOpen: true}}>
  <p>Details here...</p>
</Banner>
<Banner status="error" title="3 fields need attention" collapsible={false}>
  <ul>
    <li>Email address is invalid</li>
  </ul>
</Banner>
\`\`\``,methods:[],displayName:`Banner`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},status:{required:!0,tsType:{name:`BannerStatusMap`},description:`Status type controlling the icon and color scheme.`},title:{required:!0,tsType:{name:`ReactNode`},description:`Title text or ReactNode displayed prominently in the header area.`},description:{required:!1,tsType:{name:`ReactNode`},description:`Optional description text below the title in the header area.`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Override the default status icon.`},isDismissable:{required:!1,tsType:{name:`boolean`},description:`Whether the banner can be dismissed.
When true, shows a close button and manages internal dismissed state
so the banner disappears even if \`onDismiss\` is not provided.
@default false`,defaultValue:{value:`false`,computed:!1}},onDismiss:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Called when the dismiss button is clicked.
The banner will hide itself regardless of whether this callback is provided.`},dismissLabel:{required:!1,tsType:{name:`string`},description:`Accessible name and visible tooltip for the dismiss button, replacing the default.
Pass an already-translated string.

The default is "Dismiss {title}" when \`title\` is a string, so stacked
banners are told apart by a screen reader; a non-string \`title\` falls back
to "Dismiss" and should set this.`},endContent:{required:!1,tsType:{name:`ReactNode`},description:`Action button rendered in the header area (end-aligned).
Typically an Button with a secondary or ghost variant.

When the header is too narrow to hold the actions and a readable text
column, the whole end area wraps to its own row below the text.

@example
\`\`\`
endContent={<Button label="Retry" variant="ghost" onClick={handleRetry} />}
\`\`\``},container:{required:!1,tsType:{name:`BannerContainerMap`},description:"Container type of the banner.\n- `card`: standalone card with border-radius\n- `section`: full-width section banner (no border-radius)\n@default 'card'",defaultValue:{value:`'card'`,computed:!1}},elevation:{required:!1,tsType:{name:`union`,raw:`'none' | 'low' | 'med' | 'high'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'low'`},{name:`literal`,value:`'med'`},{name:`literal`,value:`'high'`}]},description:`Resting elevation — the shadow depth the banner sits at. Use for a
floating banner that hovers above content. \`none\` is the default inline
banner.
@default 'none'`,defaultValue:{value:`'none'`,computed:!1}},collapsible:{required:!1,tsType:{name:`union`,raw:`boolean | CollapsibleConfig`,elements:[{name:`boolean`},{name:`signature`,type:`object`,raw:`{
  /** Default open state for uncontrolled usage. @default true */
  defaultIsOpen?: boolean;
  /** Controlled open state. */
  isOpen?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
}`,signature:{properties:[{key:`defaultIsOpen`,value:{name:`boolean`,required:!1},description:`Default open state for uncontrolled usage. @default true`},{key:`isOpen`,value:{name:`boolean`,required:!1},description:`Controlled open state.`},{key:`onOpenChange`,value:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}},required:!1},description:`Callback when open state changes.`}]}}]},description:`Whether the content area (children) sits behind an expand/collapse toggle
in the header. On by default, so a banner with children behaves as it
always has.

- omitted / \`true\` — collapsible, starts collapsed
- \`{defaultIsOpen: true}\` — collapsible, starts open
- \`{isOpen, onOpenChange}\` — controlled by the consumer
- \`false\` — not collapsible: children are always visible, with no toggle,
  no \`aria-expanded\`, and a content region that stays mounted

Takes the shared \`CollapsibleConfig\` so a banner's disclosure is
configured exactly like \`Collapsible\`'s, rather than through a
Banner-only vocabulary. Banner's default differs from the hook's on one
point — it starts closed, not open — because a banner's message lives in
its header and the content is supplementary.

@default true`,defaultValue:{value:`true`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Extra content rendered below the header in a card-background area.
Use for rich content like lists, links, or detailed information.
Collapsed behind a toggle unless \`collapsible={false}\`.`}},composes:[`Omit`]}})))()}export{M as n,C as t};