import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./useMergedRefs-D6axeCXB.js";import{a as ee,o as te,r as u}from"./focusReturn-ClYRo3U4.js";import{a as d,r as ne}from"./focusOutline.stylex-DWroqGen.js";import{i as f,n as p,r as m,t as h}from"./usePressFeedback-KAUIHUDJ.js";import{_ as g,c as _,o as re,p as ie,t as v,v as ae}from"./animatedLayout-Bkaa4rq8.js";import{n as y,t as b}from"./LayoutChangeSnapshot-CfAuxnOj.js";import{i as oe,n as x}from"./interactionModality-BrJTO3Zg.js";import{n as S,t as C}from"./useFocusLeavingChange-MEf4yROz.js";import{n as w,t as se}from"./Icon-BmO5FtDV.js";import{a as T,i as E,n as D,t as O}from"./useCollapsible-B6jpypxb.js";function k({trigger:e,children:t,defaultIsOpen:r,isOpen:i,isDisabled:s=!1,onOpenChange:l,chevronPosition:u,value:d,animatedLayout:m,ref:h,xstyle:_,className:y,style:x,...C}){let w=p(),{isOpen:T,toggle:O}=D({isCollapsible:i===void 0?{defaultIsOpen:r??!0,onOpenChange:l}:{isOpen:i,onOpenChange:l},value:d}),k=(0,A.useRef)(null),N=(0,A.useRef)(null),I=(0,A.useMemo)(()=>ae(m,k),[m]),L=(0,A.useCallback)(()=>{v(m,N.current?.querySelector(`:scope > .astryx-icon`)??null),I.measureBefore()},[m,I]);(0,A.useLayoutEffect)(()=>{m??v(null,N.current?.querySelector(`:scope > .astryx-icon`)??null)},[m]);let[R,z]=(0,A.useState)(T),[B,V]=(0,A.useState)(!1);R!==T&&(z(T),V(!T&&m!=null));let H=(0,A.useCallback)(()=>{V(!1)},[]),U=(0,A.useRef)(T);(0,A.useLayoutEffect)(()=>{if(U.current===T)return;U.current=T;let e=k.current;if(e==null)return;let t=I.animate();if(T){g(e),t&&ie(m,e);return}let n=B&&t&&re(m,e,H);B&&!n&&H()},[T,B,I,m,H]),(0,A.useLayoutEffect)(()=>{!T&&!B&&k.current!=null&&g(k.current)},[T,B]);let{ref:W}=oe(),G=c(N,W),K=S(T,e=>e?te(k.current):null,e=>ee(e,N.current,k.current)),ce=(0,A.useCallback)(e=>{K(e),m!=null&&L()},[m,L,K]),le=()=>{s||O()},q=(0,A.use)(E),J=q?.hasDividers??!1,Y=q?.density??null,X=u??q?.chevronPosition??`end`,Z=X===`start`,Q=(0,A.useId)(),$=(0,j.jsx)(se,{icon:Z?`chevronRight`:`chevronDown`,size:`sm`,color:`secondary`,xstyle:[M.chevron,Z&&M.chevronStart,Z?T?M.chevronStartOpen:M.chevronStartClosed:T?M.chevronOpen:M.chevronClosed]});return(0,j.jsxs)(`div`,{ref:h,...a(o(`collapsible`,{density:Y??void 0,divided:J?`divided`:null}),n(M.root,J&&M.divided,_),y,x),...C,children:[(0,j.jsxs)(`button`,{ref:G,type:`button`,onClick:le,"aria-disabled":s||void 0,"aria-expanded":T,"aria-controls":Q,tabIndex:s?-1:void 0,...s?void 0:w,...a(o(`collapsible-trigger`,{density:Y??void 0,chevronPosition:X,open:T?`open`:null,disabled:s?`disabled`:null}),ne.focusVisible(M.trigger,Y!=null&&P[Y],!s&&f.pressedBackgroundColor,s&&M.triggerDisabled)),children:[Z&&$,(0,j.jsx)(`span`,{className:`astryx1b2iylo astryxwgcxoh astryx1iyjqo2`,children:e}),!Z&&$]}),(0,j.jsx)(b,{value:T,onBeforeChange:ce}),(0,j.jsx)(`div`,{ref:k,id:Q,...a(o(`collapsible-content`,{density:Y??void 0,open:T?`open`:null}),n(M.content,Y!=null&&F[Y],!T&&!B&&M.contentHidden)),children:(0,j.jsx)(`div`,{children:q==null?t:(0,j.jsx)(E,{value:null,children:t})})})]})}var A,j,M,N,P,F;function I(){return(I=e((()=>{A=t(),r(),O(),y(),u(),x(),C(),l(),_(),T(),w(),s(),d(),m(),h(),j=i(),M={root:{kzqmXN:`astryxh8yej3`,$$css:!0},trigger:{kB7OPa:`astryx9f619`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryx1qughib`,kzqmXN:`astryxh8yej3`,kkrTdU:`astryx1ypdohk astryx16khyan`,kMv6JI:`astryx9ynric`,kGuDYH:`astryx18juvz8`,k63SB2:`astryx2mo6ok`,kMwMTN:`astryx1tgivj0`,k9WMMc:`astryx1yc453h`,k8WAf4:`astryxt970qd`,kLKAdn:null,kGO01o:null,$$css:!0},triggerDisabled:{kkrTdU:`astryxt0e3qv`,kSiTet:`astryxbyyjgo`,$$css:!0},chevron:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kzqmXN:`astryxta46cu`,kZKoxP:`astryx1seg80s`,kGuDYH:`astryx18juvz8`,k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronOpen:{k3aq6I:`astryx19jd1h0`,$$css:!0},chevronClosed:{k3aq6I:`astryx7p49u4`,$$css:!0},chevronStart:{k71WvV:`astryx1pezmd8`,koQZXg:null,km5ZXQ:null,$$css:!0},chevronStartOpen:{k3aq6I:`astryx1iffjtl astryx1nxqau`,$$css:!0},chevronStartClosed:{k3aq6I:`astryx7p49u4 astryxaafvuh`,$$css:!0},contentHidden:{k1xSpc:`astryx1s85apg`,$$css:!0},content:{kLKAdn:`astryxfsso4q`,kMv6JI:`astryx9ynric`,kGuDYH:`astryxjm74w1`,k63SB2:`astryxxovm9e`,kLWn49:`astryxw6l6zx`,kMwMTN:`astryx1tgivj0`,$$css:!0},divided:{kEafiO:`astryx11xkdxz astryx1g31smg`,kPef9Z:`astryx13fuv20`,kLZC3w:`astryx1pc3f07`,$$css:!0}},N={triggerCompact:{k8WAf4:`astryxu0wf1k`,kLKAdn:null,kGO01o:null,$$css:!0},triggerBalanced:{k8WAf4:`astryxce4md1`,kLKAdn:null,kGO01o:null,$$css:!0},triggerSpacious:{k8WAf4:`astryx8o8v82`,kLKAdn:null,kGO01o:null,$$css:!0},contentCompact:{kGO01o:`astryxy143xn`,$$css:!0},contentBalanced:{kGO01o:`astryx1wesfrj`,$$css:!0},contentSpacious:{kGO01o:`astryxvmdzux`,$$css:!0}},P={compact:N.triggerCompact,balanced:N.triggerBalanced,spacious:N.triggerSpacious},F={compact:N.contentCompact,balanced:N.contentBalanced,spacious:N.contentSpacious},k.displayName=`Collapsible`,k.__docgenInfo={description:`A primitive that makes any content collapsible.

Renders a trigger area (always visible) with a chevron indicator,
and a content area that toggles visibility on click.
Handles its own state by default, or defers to CollapsibleGroup
when a \`value\` prop is provided and a group is present.

Use inside Card for elevated collapsible sections.
Wrap multiple instances in CollapsibleGroup for accordion behavior.

@example
\`\`\`
<Collapsible trigger="Details">
  <Text type="body">Collapsible content</Text>
</Collapsible>
<Card>
  <Collapsible trigger="Settings">
    <SettingsForm />
  </Collapsible>
</Card>
<CollapsibleGroup type="single" defaultValue="general">
  <VStack gap={2}>
    <Card>
      <Collapsible trigger="General" value="general">
        <GeneralSettings />
      </Collapsible>
    </Card>
    <Card>
      <Collapsible trigger="Advanced" value="advanced">
        <AdvancedSettings />
      </Collapsible>
    </Card>
  </VStack>
</CollapsibleGroup>
\`\`\``,methods:[],displayName:`Collapsible`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},trigger:{required:!0,tsType:{name:`ReactNode`},description:`Content shown in the trigger area (always visible).
Rendered inside a button with aria-expanded and a chevron indicator.`},children:{required:!1,tsType:{name:`ReactNode`},description:`Content that collapses/expands when the trigger is clicked.`},defaultIsOpen:{required:!1,tsType:{name:`boolean`},description:`Default open state for standalone uncontrolled usage. Ignored when \`value\`
binds this item to a surrounding CollapsibleGroup.
@default true`},isOpen:{required:!1,tsType:{name:`boolean`},description:"Controlled open state for standalone usage. Ignored when `value` binds this\nitem to a surrounding CollapsibleGroup."},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the collapsible is disabled. A disabled item can't be toggled —
its trigger is non-interactive and dimmed. Following the system-wide
disabled convention, the trigger uses \`aria-disabled\` (not the native
\`disabled\` attribute) and drops out of the tab order, staying perceivable
to assistive tech. The content stays in whatever open state it was;
disabling doesn't collapse an already-open item.
@default false`,defaultValue:{value:`false`,computed:!1}},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:"Callback when standalone open state changes. A surrounding\nCollapsibleGroup owns grouped state and calls its `onChange` instead."},animatedLayout:{required:!1,tsType:{name:`AnimatedLayout`},description:`The handle from \`useAnimatedLayout({containerRef})\`. With it, opening and
closing glides the content after this Collapsible, up to that container,
instead of jumping, and the chevron turns on the same timing.`},chevronPosition:{required:!1,tsType:{name:`union`,raw:`'start' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Logical position of the disclosure chevron.

- \`end\` (default): a trailing indicator that points down when collapsed and
  up when expanded.
- \`start\`: a leading disclosure arrow ahead of the label. It points inward
  toward the content when collapsed, mirrors under RTL, and points down when
  expanded.

Inside a CollapsibleGroup this defaults to the group's \`chevronPosition\`.

@default 'end'`},value:{required:!1,tsType:{name:`string`},description:`Unique identifier for this collapsible within a CollapsibleGroup. When set
inside a group, the group owns open state and its \`onChange\` is the
notification callback.`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for the collapsible element.`}},composes:[`Omit`]}})))()}export{I as n,k as t};