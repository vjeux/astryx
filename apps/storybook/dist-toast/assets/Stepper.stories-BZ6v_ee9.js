import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{b as i,i as a,o,p as s}from"./tokens.stylex-uC3T-IhP.js";import{t as c}from"./jsx-runtime-MKhVqBIO.js";import{n as l,r as u}from"./layerScopedContext-CqwdhY_A.js";import{n as d}from"./mergeProps-DHkqklmt.js";import{n as f}from"./isRenderable-C2vVZKI4.js";import{i as p,t as ee}from"./themeProps-BVy3p_gf.js";import{n as te,t as m}from"./useMergedRefs-D6axeCXB.js";import{o as h}from"./InternationalizationContext-C5wQA9mp.js";import{n as ne,t as g}from"./useComponentTranslator-Dzvlp8mx.js";import{r as re,t as ie}from"./sharedResizeObserver-Cel0TOAm.js";import{n as ae,t as _}from"./rtlStyles-BwjrfDSU.js";import{a as v,i as y}from"./focusOutline.stylex-DWroqGen.js";import{i as b,n as x,r as S,t as oe}from"./usePressFeedback-KAUIHUDJ.js";import{t as C}from"./react-dom-B2lTHb2f.js";import{n as se,t as w}from"./Text-C5BHw0wv.js";import{n as T,t as E}from"./Icon-BmO5FtDV.js";import{n as D,t as ce}from"./VisuallyHidden-dGudRqPh.js";import{n as O,t as k}from"./Button-DoGM0DEN.js";import{n as A,t as j}from"./Badge-DqOhTiyH.js";import{n as M,t as N}from"./IconButton-BONXg2Kw.js";import{n as P,t as F}from"./Popover-CgJiFJLM.js";import{n as I,t as L}from"./TextInput-LGxpinPt.js";function le(e,t){let n=(0,de.use)(e);if(n==null)throw Error(`${t} must be used within Stepper. Wrap your Step in <Stepper>.`);return n}function ue(){return le(R,`useStepperInternalContext`)}var de,fe,R;function z(){return(z=e((()=>{de=t(),u(),fe=l(`StepperContext`,1,null),fe.displayName=`StepperContext`,R=l(`StepperInternalContext`,1,null),R.displayName=`StepperInternalContext`})))()}var pe;function B(){return(B=e((()=>{pe={"@astryx.stepper.label":`Progress`,"@astryx.stepper.nextStep":`Next step`,"@astryx.stepper.previousStep":`Previous step`}})))()}function V({activeStep:e,children:t,orientation:r=`horizontal`,onStepClick:i,label:a,density:o=`balanced`,indicatorPosition:s=`separated`,horizontalOptions:c,xstyle:l,className:u,style:f,ref:ee,...m}){let h=ne(),g=a??h(`@astryx.stepper.label`),ie=c?.minimumStepWidth??me,_=c?.collapsedVariant??W,v=(0,H.useRef)(new Map),y=(0,H.useRef)(new Map),[,b]=(0,H.useState)(0),[x,S]=(0,H.useState)(0),oe=(0,H.useCallback)((e,t)=>{let n=v.current,r=n.get(e)??0;n.set(e,r+1);let i=t?.getIsDisabled;if(i){let t=y.current.get(e)??new Set;t.add(i),y.current.set(e,t)}return S(e=>e+1),b(e=>e+1),()=>{let t=n.get(e)??1;if(t<=1?n.delete(e):n.set(e,t-1),i){let t=y.current.get(e);t?.delete(i),t?.size===0&&y.current.delete(e)}S(e=>e-1),b(e=>e+1)}},[]),[C,se]=(0,H.useState)(()=>({current:e,previous:e}));C.current!==e&&se({current:e,previous:C.current});let w=C.current===e?C.previous:C.current,T=r===`horizontal`,[D,ce]=(0,H.useState)(0),O=(0,H.useCallback)(e=>{if(e!=null&&T)return re(e,e=>ce(e.target.clientWidth))},[T]),k=te(ee,O),A=T&&D>0&&x>0&&D/x<ie,[j,M]=(0,H.useState)(null),P=(0,H.useMemo)(()=>({activeStep:e,previousActiveStep:w,orientation:r,isNonLinear:i!=null,onStepClick:i??null,density:o,indicatorPosition:s,registerStep:oe}),[e,w,r,i,o,s,oe]),F=(0,H.useMemo)(()=>({...P,stepCount:x,isCompact:A,summarySlot:j}),[P,x,A,j]),I=s===`on-track`,L=r===`horizontal`?I?G.horizontalOnTrack:G.horizontal:I?G.verticalOnTrack:G.vertical,le=T?void 0:l,ue=T?void 0:u,de=T?void 0:f,z=(0,U.jsx)(`ol`,{ref:k,"aria-label":g,...m,...d(p(`stepper`,{orientation:r,indicatorPosition:s}),n(G.root,L,le),ue,de),children:t});if(!T)return(0,U.jsx)(fe,{value:P,children:(0,U.jsx)(R,{value:F,children:z})});let pe=_===`withLabelAndControls`&&i!=null,B=A&&_!==`hiddenLabel`,V=t=>{let n=null;for(let r of v.current.keys())[...y.current.get(r)??[]].some(e=>e())||(t===-1?r<e&&(n==null||r>n):r>e&&(n==null||r<n))&&(n=r);return n},he=e=>{if(!pe||i==null)return null;let t=V(e),n=h(e===-1?`@astryx.stepper.previousStep`:`@astryx.stepper.nextStep`);return(0,U.jsx)(N,{variant:`ghost`,label:n,tooltip:n,icon:(0,U.jsx)(E,{icon:e===-1?`chevronLeft`:`chevronRight`,xstyle:ae.mirror}),isDisabled:t==null,onClick:()=>{let t=V(e);t!=null&&i(t)}})};return(0,U.jsx)(fe,{value:P,children:(0,U.jsx)(R,{value:F,children:(0,U.jsxs)(`div`,{...d(p(`stepper-frame`),n(G.frame,l),u,f),children:[z,B&&(0,U.jsxs)(`div`,{...d(p(`stepper-summary`),{className:`astryx6s0dn4 astryx78zum5 astryx1txdalj astryx1qughib astryxeuugli`}),children:[he(-1),(0,U.jsx)(`div`,{ref:M,"aria-hidden":`true`,className:`astryx78zum5 astryxdt5ytf astryx1iyjqo2 astryxeuugli astryx2b8uid`}),he(1)]})]})})})}var H,U,me,W,G;function he(){return(he=e((()=>{H=t(),r(),_(),ee(),ie(),m(),T(),M(),z(),g(),B(),U=c(),h(pe),me=112,W=`withLabelAndControls`,G={root:{"--step-connector-gap":`astryx5letbq`,k1xSpc:`astryx78zum5`,kzqmXN:`astryxh8yej3`,kH6xsr:`astryx3ct3a4`,kogj98:`astryx1ghz6dp`,kmVPX3:`astryx1717udv`,$$css:!0},horizontal:{kXwgrk:`astryx1q0g3np`,kGNEyG:`astryx1cy8zhl`,kOIVth:`astryxzye2dw`,khm7nJ:null,k1C7PZ:null,$$css:!0},vertical:{kXwgrk:`astryxdt5ytf`,kOIVth:`astryxzye2dw`,khm7nJ:null,k1C7PZ:null,$$css:!0},horizontalOnTrack:{kXwgrk:`astryx1q0g3np`,kGNEyG:`astryx1cy8zhl`,kOIVth:`astryxxhr3t`,khm7nJ:null,k1C7PZ:null,$$css:!0},verticalOnTrack:{kXwgrk:`astryxdt5ytf`,kOIVth:`astryxxhr3t`,khm7nJ:null,k1C7PZ:null,$$css:!0},frame:{"--step-connector-gap":`astryx152dxt4`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryxxhr3t`,kzqmXN:`astryxh8yej3`,$$css:!0}},V.displayName=`Stepper`,V.__docgenInfo={description:`A stepper component for multi-step workflows. Displays numbered steps
with visual indicators for completed, active, and upcoming states.

Each Step child must provide a \`step\` prop (zero-based index) so it
can derive its state from the parent's activeStep. The on-track layout
hides the leading connector on the first step and the trailing connector
on the last step structurally, from each step's own \`<li>\` position, so
it works regardless of how the steps are grouped.

Rendered as an ordered list (\`<ol>\`/\`<li>\`) rather than a \`nav\`
landmark: a stepper communicates *progress through a sequence*, not a
set of site navigation links. The active step is marked with
\`aria-current="step"\` (handled per-step) and the list carries an
accessible \`label\`. This follows the WAI-ARIA pattern for steppers /
progress sequences and avoids polluting the page's landmark map.

@example
\`\`\`
<Stepper activeStep={1}>
  <Step step={0} label="Account" />
  <Step step={1} label="Profile" />
  <Step step={2} label="Review" />
</Stepper>
\`\`\``,methods:[],displayName:`Stepper`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLOListElement>`,elements:[{name:`HTMLOListElement`}]},description:`Ref forwarded to the root element`},activeStep:{required:!0,tsType:{name:`number`},description:`Zero-based index of the active step.`},children:{required:!0,tsType:{name:`ReactNode`},description:`Step elements to render.`},orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:`Layout direction of the stepper.
@default 'horizontal'`,defaultValue:{value:`'horizontal'`,computed:!1}},onStepClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:`Called when a step is clicked, or when a compact summary control is used.
Enables non-linear navigation. At compact horizontal widths, individual
track nodes are presentational; when the collapsed variant includes
summary controls, those controls skip disabled steps.`},label:{required:!1,tsType:{name:`string`},description:`Accessible label describing the set of steps. Defaults to a translated
"Progress" when unset.`},density:{required:!1,tsType:{name:`union`,raw:`'compact' | 'balanced' | 'spacious'`,elements:[{name:`literal`,value:`'compact'`},{name:`literal`,value:`'balanced'`},{name:`literal`,value:`'spacious'`}]},description:`Controls density (padding) of all steps.
@default 'balanced'`,defaultValue:{value:`'balanced'`,computed:!1}},indicatorPosition:{required:!1,tsType:{name:`union`,raw:`'separated' | 'on-track'`,elements:[{name:`literal`,value:`'separated'`},{name:`literal`,value:`'on-track'`}]},description:`Controls where each step's indicator sits relative to the connector track.
- 'separated': indicator lives in the label row, distinct from the progress
  bar (the original Astryx layout).
- 'on-track': indicator is slotted into the connector line as a node on the
  track (the on-track indicator design).
@default 'separated'`,defaultValue:{value:`'separated'`,computed:!1}},horizontalOptions:{required:!1,tsType:{name:`StepperHorizontalOptions`},description:"Options specific to the horizontal layout. `minimumStepWidth` controls the\nper-step collapse threshold; `collapsedVariant` selects a label with\ncontrols, a label alone, or a bare progress track.\n@default {minimumStepWidth: 112, collapsedVariant: 'withLabelAndControls'}"}},composes:[`Omit`]}})))()}var ge;function _e(){return(_e=e((()=>{ge={astryx1twag4g:`astryx1twag4g`,$$css:!0}})))()}var ve;function K(){return(K=e((()=>{ve={"@astryx.step.goToStep":`Go to step {stepNumber, number}: {label}`,"@astryx.step.goToStepWithStatus":`Go to step {stepNumber, number}: {label}, {status}`,"@astryx.step.optional":`Optional`,"@astryx.step.status.completed":`completed`,"@astryx.step.status.error":`error`,"@astryx.step.status.warning":`warning`}})))()}function ye(){return(0,J.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,children:[(0,J.jsx)(`circle`,{cx:`8`,cy:`8`,r:`8`,fill:`currentColor`}),(0,J.jsx)(`path`,{d:`M4.75 8.25 7 10.5l4.25-4.5`,stroke:a[`--color-background-surface`],strokeWidth:`1.75`,strokeLinecap:`round`,strokeLinejoin:`round`})]})}function be(){return(0,J.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,children:[(0,J.jsx)(`circle`,{cx:`8`,cy:`8`,r:`7`,stroke:`currentColor`,strokeWidth:`2`}),(0,J.jsx)(`circle`,{cx:`8`,cy:`8`,r:`4`,fill:`currentColor`})]})}function xe(e,t){return t<=0?`0s`:t===1?e:`calc(${e} * ${Number(t.toFixed(4))})`}function q({step:e,label:t,description:r,children:a,status:o,isDisabled:s=!1,isOptional:c=!1,endContent:l,indicator:u,density:ee,xstyle:te,className:m,style:h,ref:g,"data-testid":re,...ie}){let ae=x(),_=ne(),{activeStep:v,previousActiveStep:S,orientation:oe,onStepClick:C,density:se,indicatorPosition:w,registerStep:T,isCompact:D,summarySlot:O}=ue();(0,Se.useLayoutEffect)(()=>T(e,{getIsDisabled:()=>s}),[T,e,s]);let k=ee??se,A=k===`spacious`?i[`--spacing-3`]:i[`--spacing-2`],j=u!=null&&typeof u!=`string`,M=j?`auto`:u??`auto`,N=e===v?`in-progress`:e<v?`completed`:`not-started`,P=oe===`vertical`,F=N===`in-progress`,I=C!=null&&!D,L=I&&!s,le=()=>{L&&C&&C(e)},de=N===`completed`||N===`in-progress`,fe=v===S+1,R=S,z=(e,t,n)=>!fe||e!==R?X.connectorTiming(`0s`,`0s`):X.connectorTiming(xe(De,n),xe(De,t)),pe=z(e-1,0,1),B=null,V=j?u:null,H=M===`auto`&&V==null&&!F&&(o===`success`||o===`warning`||o===`error`)?o:null;if(M!==`none`){if(V==null&&H==null&&(M===`number`||M===`auto`&&N===`not-started`)){let t=N===`completed`||N===`in-progress`,r=s?X.numberDisabled:t&&o===`accent`?X.numberAccent:t&&o===`success`?X.numberSuccess:t&&o===`warning`?X.numberWarning:t&&o===`error`?X.numberError:N===`completed`?X.numberCompleted:N===`in-progress`?X.numberInProgress:X.numberNotStarted;B=(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-indicator`,{progress:N,status:o??void 0}),n(X.numberBadge,r)),children:e+1})}else{let e=V??(H===`success`?(0,J.jsx)(E,{icon:`success`,size:`sm`,color:s?`disabled`:`success`}):H===`warning`?(0,J.jsx)(E,{icon:`warning`,size:`sm`,color:s?`disabled`:`warning`}):H===`error`?(0,J.jsx)(E,{icon:`error`,size:`sm`,color:s?`disabled`:`error`}):N===`completed`?(0,J.jsx)(ye,{}):(0,J.jsx)(be,{})),t=s?X.iconDisabled:V==null?H===`success`?X.iconSuccess:H===`warning`?X.iconWarning:H===`error`?X.iconError:N===`completed`?X.iconCompleted:N===`in-progress`?X.iconInProgress:X.iconNotStarted:o===`accent`?X.iconAccent:o===`success`?X.iconSuccess:o===`warning`?X.iconWarning:o===`error`?X.iconError:N===`completed`?X.iconCompleted:N===`in-progress`?X.iconInProgress:X.iconNotStarted;B=(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-indicator`,{progress:N,status:o??void 0}),n(X.icon,t)),children:e})}}let U=o===`error`?_(`@astryx.step.status.error`):o===`warning`?_(`@astryx.step.status.warning`):o===`success`||N===`completed`?_(`@astryx.step.status.completed`):null,me=f(U)?(0,J.jsx)(ce,{children:U}):null,W=U==null?_(`@astryx.step.goToStep`,{stepNumber:e+1,label:t}):_(`@astryx.step.goToStepWithStatus`,{stepNumber:e+1,label:t,status:U}),G=M!==`none`,he=s?X.labelDisabled:N===`not-started`?X.labelNotStarted:F?X.labelInProgress:void 0,_e=p(`step-label`,{progress:N,status:o??void 0,disabled:s?`disabled`:null}),ve=p(`step-description`,{progress:N,status:o??void 0}),K=(0,J.jsxs)(`div`,{className:`astryx78zum5 astryx1q0g3np astryx6s0dn4 astryx1txdalj astryxeuugli`,children:[(!D||w!==`on-track`)&&B,` `,(0,J.jsx)(`span`,{...d(_e,n(X.label,he)),children:t}),me,c&&(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`span`,{className:`astryxjm74w1 astryxv1l7n4`,children:`•`}),(0,J.jsx)(`span`,{className:`astryxjm74w1 astryxv1l7n4`,children:_(`@astryx.step.optional`)})]}),l]}),q=(0,Se.useId)(),we=f(r)?(0,J.jsx)(`div`,{id:q,...{0:{className:`astryx18gyask`},1:{className:`astryx31w388`}}[!!G|0],children:(0,J.jsx)(`span`,{...d(ve,{className:`astryx1lliihq astryx141an7d astryx1ojctns astryxv1l7n4`}),children:r})}):null,Te=f(a)?(0,J.jsx)(`div`,{hidden:D||void 0,...n(X.stepContent,X.contentIndent(A,G?Ee:`0px`)),children:a}):null,Y=p(`step`,{progress:N,status:o??void 0}),je=D&&F&&O!=null?(0,Ce.createPortal)((0,J.jsxs)(`div`,{...d(Y,{className:`astryx6s0dn4 astryx78zum5 astryxdt5ytf astryx1lsbc85 astryxeuugli`}),children:[K,f(r)?(0,J.jsx)(`span`,{className:`astryx1lliihq astryx141an7d astryx1ojctns astryxv1l7n4`,children:r}):null]}),O):null,Me=D?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(ce,{children:t}),me]}):null;if(w===`on-track`){let o=e<=v,u=e<v,ee=P?X.connectorFillV:X.connectorFillH,ne=P?X.connectorEmptyV:X.connectorEmptyH,x=o?ee:ne,S=u?ee:ne,oe=P?ke:Oe,C=1-oe,se=C*(P&&f(a)?Ae:1),w=C-se,T=z(e-1,C,oe),E=z(e,0,se),ce=z(e,se,w),O=k===`compact`?i[`--spacing-1`]:k===`spacious`?i[`--spacing-3`]:i[`--spacing-2`],A=(0,J.jsxs)(`div`,{...{0:{className:`astryx78zum5 astryx1q0g3np astryx6s0dn4 astryxl56j7k astryx1a02dak astryxzye2dw`},1:{className:`astryx78zum5 astryx1q0g3np astryx6s0dn4 astryx1txdalj`}}[!!P|0],children:[(0,J.jsx)(`span`,{...d(_e,n(X.label,he)),children:t}),me,c&&(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`span`,{className:`astryxjm74w1 astryxv1l7n4`,children:`•`}),(0,J.jsx)(`span`,{className:`astryxjm74w1 astryxv1l7n4`,children:_(`@astryx.step.optional`)})]}),l]}),j=f(r)?(0,J.jsx)(`span`,{id:q,...d(ve,{className:`astryx1lliihq astryx141an7d astryx1ojctns astryxv1l7n4`}),children:r}):null,M=f(a)?P?(0,J.jsxs)(`div`,{className:`astryx1n2onr6`,children:[(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-connector`),n(X.connectorTrack,X.otContentSegV(O),S,ce,X.otSegHiddenIfLast))}),(0,J.jsx)(`div`,{...n(X.otContent,X.contentIndent(O,Ee)),children:a})]}):(0,J.jsx)(`div`,{hidden:D||void 0,className:`astryx1xye8es`,children:a}):null;if(P){let e=(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(`div`,{...n(X.otIndicatorColV,X.otRailBridgeV(O)),children:[(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-connector`),n(X.otSegBaseV,X.otSegLeadV(O),X.connectorTrack,G&&X.otSegGapLeadV,x,T,X.otSegHiddenIfFirst))}),B,(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-connector`),n(X.otSegBaseV,X.otSegFlexV,X.connectorTrack,G&&X.otSegGapRailV,S,E,X.otSegHiddenIfLast))})]}),` `,(0,J.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryx1nhvcw1 astryx98rzlu astryx1lsbc85 astryxeuugli`,children:[A,j]})]});return(0,J.jsxs)(`li`,{ref:g,...d(Y,n(ge,X.otVerticalRoot,te),m,h),"data-testid":re,...ie,"aria-current":F?`step`:void 0,children:[I?(0,J.jsx)(`button`,{type:`button`,onClick:le,"aria-label":W,"aria-describedby":f(r)?q:void 0,"aria-disabled":s||void 0,...ae,...n(X.otInteractive,b.backgroundColor,X.otRowWrap,X.otRowPadV(O),y.focusVisible),children:e}):(0,J.jsx)(`div`,{...n(X.otRowWrap,X.otRowPadV(O)),children:e}),M]})}let N=(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(`div`,{className:`astryx78zum5 astryx1q0g3np astryx6s0dn4 astryxh8yej3`,children:[(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-connector`),n(X.otSegH,X.connectorTrack,G&&X.otSegGapLeadH,x,T,X.otSegHiddenIfFirst))}),B,(0,J.jsx)(`div`,{"aria-hidden":`true`,...d(p(`step-connector`),n(X.otSegH,X.connectorTrack,G&&X.otSegGapRailH,S,E,X.otSegHiddenIfLast))})]}),` `,!D&&(0,J.jsxs)(`div`,{...n(X.otLabelWrapH,X.otMarginTop(O)),children:[A,j]})]});return(0,J.jsxs)(`li`,{ref:g,...d(Y,n(ge,X.otHorizontalRoot,te),m,h),"data-testid":re,...ie,"aria-current":F?`step`:void 0,children:[I?(0,J.jsx)(`button`,{type:`button`,onClick:le,"aria-label":W,"aria-describedby":f(r)?q:void 0,"aria-disabled":s||void 0,...ae,...n(X.otInteractive,b.backgroundColor,X.otColWrap,X.otPadBlock(O),y.focusVisible),children:N}):(0,J.jsx)(`div`,{...n(X.otColWrap,X.otPadBlock(O)),children:N}),Me,M,je]})}return P?(0,J.jsxs)(`li`,{ref:g,...d(Y,n(ge,X.verticalRoot,te),m,h),"data-testid":re,...ie,"aria-current":F?`step`:void 0,children:[(0,J.jsx)(`div`,{...d(p(`step-bar`),n(X.verticalBar,X.connectorTrack,de?X.connectorFillV:X.connectorEmptyV,pe)),"aria-hidden":`true`}),(0,J.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryx98rzlu`,children:[I?(0,J.jsxs)(`button`,{type:`button`,onClick:le,"aria-label":W,"aria-describedby":f(r)?q:void 0,"aria-disabled":s||void 0,...ae,...n(X.buttonReset,b.backgroundColor,y.focusVisible,k===`compact`&&X.densityCompact,k===`balanced`&&X.densityBalanced,k===`spacious`&&X.densitySpacious,X.densityInline(A)),children:[K,we]}):(0,J.jsxs)(`div`,{...n(k===`compact`&&X.densityCompact,k===`balanced`&&X.densityBalanced,k===`spacious`&&X.densitySpacious,X.densityInline(A)),children:[K,we]}),Te]})]}):(0,J.jsxs)(`li`,{ref:g,...d(Y,n(ge,X.horizontalStep,te),m,h),"data-testid":re,...ie,"aria-current":F?`step`:void 0,children:[(0,J.jsx)(`div`,{...d(p(`step-bar`),n(X.horizontalBar,X.connectorTrack,de?X.connectorFillH:X.connectorEmptyH,pe)),"aria-hidden":`true`}),D?Me:I?(0,J.jsxs)(`button`,{type:`button`,onClick:le,"aria-label":W,"aria-describedby":f(r)?q:void 0,"aria-disabled":s||void 0,...n(X.buttonReset,b.backgroundColor,y.focusVisible,k===`compact`&&X.densityCompact,k===`balanced`&&X.densityBalanced,k===`spacious`&&X.densitySpacious,X.densityInline(A)),children:[K,we]}):(0,J.jsxs)(`div`,{...n(k===`compact`&&X.densityCompact,k===`balanced`&&X.densityBalanced,k===`spacious`&&X.densitySpacious,X.densityInline(A)),children:[K,we]}),Te,je]})}var Se,Ce,J,we,Te,Ee,De,Oe,ke,Ae,Y,je,Me,Ne,Pe,Fe,Ie,Le,X;function Re(){return(Re=e((()=>{Se=t(),Ce=C(),r(),s(),v(),ee(),S(),oe(),T(),D(),z(),_e(),g(),K(),J=c(),h(ve),we=i[`--spacing-1`],`${i[`--spacing-2`]}`,Te=i[`--spacing-4`],Ee=i[`--spacing-6`],De=o[`--duration-medium`],Oe=.5,ke=.3,Ae=.25,Y={kKXxxB:`astryx196sc62 astryx13sdc92`,k5BDGz:`astryxizoc3 astryxhhm9v0`,$$css:!0},je={kZCmMZ:`astryxnvo3vl`,kE3dHu:``,kpe85a:``,$$css:!0},Me={kuDDbn:``,kE3dHu:``,kP0aTx:``,kpe85a:``,$$css:!0},Ne={kVAEAm:`astryx10l6tqk`,kYYq5F:`astryx10no89f`,k87sOh:``,krVfgx:``,kLqNvP:`astryx1lxsm33`,kbCHJM:``,kCIrl2:``,kzqmXN:`astryxx9zwd3`,$$css:!0},Pe={kLKAdn:``,kGO01o:``,kuDDbn:``,kE3dHu:``,kP0aTx:``,kpe85a:``,$$css:!0},Fe={kqGvvJ:`astryx1oqu0vw`,keoZOQ:``,k1K539:``,$$css:!0},Ie={kLKAdn:``,kGO01o:``,$$css:!0},Le={keoZOQ:`astryx1vhfslr`,$$css:!0},X={verticalRoot:{k1xSpc:`astryx78zum5`,kXwgrk:`astryx1q0g3np`,kGNEyG:`astryx1qjc9v5`,kVAEAm:`astryx1n2onr6`,kOIVth:`astryx1lsbc85`,khm7nJ:null,k1C7PZ:null,$$css:!0},verticalBar:{kzqmXN:`astryxx9zwd3`,kaIpWk:`astryxjspbzw`,kmuXW:`astryx2lah0s`,kSGwAc:`astryxkh2ocl`,$$css:!0},horizontalStep:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx1qjc9v5`,kUk6DE:`astryx98rzlu`,kzQI83:null,kmuXW:null,kCS8Yb:null,k7Eaqz:`astryxeuugli`,$$css:!0},horizontalBar:{kzqmXN:`astryxh8yej3`,kZKoxP:`astryx11c6zpc`,kaIpWk:`astryxjspbzw`,kmuXW:`astryx2lah0s`,k1K539:`astryxlstkdb`,$$css:!0},connectorTrack:{kVAEAm:`astryx1n2onr6`,kWkggS:`astryx1m4xfpy`,kgeoSG:`astryx1cpjm7i`,kEoFBp:`astryx1hmns74`,kFcpXp:`astryxxx281p`,kpsdNU:null,kSJ0CW:null,koaPKo:null,k75S9Q:null,kLBHJ3:null,kGOzcv:null,k96MEf:null,k5Ofw7:null,kPB484:`astryxxyica1`,kCyh2J:null,kgXx4x:null,kKGWhT:null,kBjukC:null,kGBI9E:null,ks091d:null,kLSKZI:null,k9BEaU:null,kLkRvE:`astryx1tzqye7`,k7KCAZ:`astryx1hu8v7x`,kKXxxB:`astryxuhr57t astryx13sdc92`,kqUdNP:`astryxyt8op7`,$$css:!0},connectorTiming:(e,t)=>[Y,{"--x-1dd27dc":(e=>typeof e==`number`?e+`ms`:e??void 0)(e),"--x-owu7oy":(e=>typeof e==`number`?e+`ms`:e??void 0)(t)}],connectorFillV:{kEdqc7:`astryx1fgylwi`,kcTAPf:`astryxd30wvy`,$$css:!0},connectorEmptyV:{kEdqc7:`astryx1fgylwi`,kcTAPf:`astryxb5f74o`,$$css:!0},connectorFillH:{kEdqc7:`astryxgu12d astryxdq8fwl`,kcTAPf:`astryxp1ps4y`,$$css:!0},connectorEmptyH:{kEdqc7:`astryxgu12d astryxdq8fwl`,kcTAPf:`astryx1e8txe`,$$css:!0},icon:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kzqmXN:`astryx12xnipv`,kZKoxP:`astryx6b6gus`,kmuXW:`astryx2lah0s`,$$css:!0},iconCompleted:{kMwMTN:`astryxqwr325`,$$css:!0},iconInProgress:{kMwMTN:`astryxqwr325`,$$css:!0},iconNotStarted:{kMwMTN:`astryxv9yike`,$$css:!0},iconDisabled:{kMwMTN:`astryxqa6c3m`,kSiTet:`astryxbyyjgo`,$$css:!0},iconAccent:{kMwMTN:`astryxqwr325`,$$css:!0},iconSuccess:{kMwMTN:`astryx1vau044`,$$css:!0},iconWarning:{kMwMTN:`astryx4z9hng`,$$css:!0},iconError:{kMwMTN:`astryxskb5cx`,$$css:!0},numberBadge:{k1xSpc:`astryxrvj5dj`,kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,kgQiWS:`astryx1ku5rj1`,kzqmXN:`astryx12xnipv`,kZKoxP:`astryx6b6gus`,kaIpWk:`astryxjspbzw`,kGuDYH:`astryx51wmvv`,k63SB2:`astryx2mo6ok`,kmuXW:`astryx2lah0s`,k9WMMc:`astryx2b8uid`,$$css:!0},numberCompleted:{kWkggS:`astryx1ewilqj`,kMwMTN:`astryxrkvqaz`,$$css:!0},numberInProgress:{kWkggS:`astryx1ewilqj`,kMwMTN:`astryxrkvqaz`,$$css:!0},numberNotStarted:{kWkggS:`astryxwmxj5m`,kMwMTN:`astryxv1l7n4`,$$css:!0},numberDisabled:{kWkggS:`astryxwmxj5m`,kMwMTN:`astryxnbbluu`,kSiTet:`astryxbyyjgo`,$$css:!0},numberAccent:{kWkggS:`astryx1ewilqj`,kMwMTN:`astryx17wrial`,$$css:!0},numberSuccess:{kWkggS:`astryxdsz4j9`,kMwMTN:`astryxri61p4`,$$css:!0},numberWarning:{kWkggS:`astryx1q8g9m5`,kMwMTN:`astryxrebv38`,$$css:!0},numberError:{kWkggS:`astryx1pjz0fi`,kMwMTN:`astryx1m024r3`,$$css:!0},label:{kGuDYH:`astryxjm74w1`,kLWn49:`astryxw6l6zx`,k63SB2:`astryx1sodnla`,kMwMTN:`astryx1tgivj0`,k7Eaqz:`astryxeuugli`,khDVqt:`astryxuxw1ft`,kVQacm:`astryxb3r6kr`,kg5iWk:`astryxlyipyv`,$$css:!0},labelInProgress:{k63SB2:`astryx2mo6ok`,$$css:!0},labelNotStarted:{kMwMTN:`astryxv1l7n4`,$$css:!0},labelDisabled:{kMwMTN:`astryxnbbluu`,$$css:!0},stepContent:{kLKAdn:`astryx1xye8es`,$$css:!0},contentIndent:(e,t)=>[je,{kwRFfy:e==null?e:`astryx120eax6`,$$css:!0},{"--x-paddingInlineStart":(e=>typeof e==`number`?e+`px`:e??void 0)(`calc(${e} + ${t})`),"--x-paddingInlineEnd":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],densityCompact:{k8WAf4:`astryxu0wf1k`,kLKAdn:null,kGO01o:null,$$css:!0},densityBalanced:{k8WAf4:`astryxce4md1`,kLKAdn:null,kGO01o:null,$$css:!0},densitySpacious:{k8WAf4:`astryx8o8v82`,kLKAdn:null,kGO01o:null,$$css:!0},densityInline:e=>[Me,{kg3NbH:e==null?e:`astryx30g6up`,$$css:!0},{"--x-paddingInline":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],buttonReset:{k9WMMc:`astryx1yc453h`,kGNEyG:`astryx1qjc9v5`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kzqmXN:`astryxh8yej3`,kkrTdU:`astryx1ypdohk astryx16khyan`,kaIpWk:`astryxh6dtrn`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxkvfbh3 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,kWkggS:`astryxjbqb8w`,$$css:!0},otVerticalRoot:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kVAEAm:`astryx1n2onr6`,$$css:!0},otHorizontalRoot:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kUk6DE:`astryx98rzlu`,kzQI83:null,kmuXW:null,kCS8Yb:null,k7Eaqz:`astryxeuugli`,$$css:!0},otInteractive:{kB7OPa:`astryx9f619`,k9WMMc:`astryx1yc453h`,kkrTdU:`astryx1ypdohk astryx16khyan`,kaIpWk:`astryxh6dtrn`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxkvfbh3 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,kWkggS:`astryxjbqb8w`,$$css:!0},otRowWrap:{k1xSpc:`astryx78zum5`,kXwgrk:`astryx1q0g3np`,kGNEyG:`astryx1qjc9v5`,kOIVth:`astryx1txdalj`,khm7nJ:null,k1C7PZ:null,kzqmXN:`astryxh8yej3`,$$css:!0},otColWrap:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx1qjc9v5`,kzqmXN:`astryxh8yej3`,$$css:!0},otIndicatorColV:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx6s0dn4`,kzqmXN:`astryx12xnipv`,kmuXW:`astryx2lah0s`,kSGwAc:`astryxkh2ocl`,$$css:!0},otSegBaseV:{kzqmXN:`astryxx9zwd3`,kmuXW:`astryx2lah0s`,kaIpWk:`astryx2u8bby`,$$css:!0},otSegGapLeadV:{kz4h6p:`astryx1yxrbr4`,$$css:!0},otSegGapRailV:{kz4h6p:`astryx1eyou77`,$$css:!0},otSegGapLeadH:{kz4h6p:`astryx17qoqre astryx153f7d5`,$$css:!0},otSegGapRailH:{kz4h6p:`astryx13hy1yx astryx7cmjge`,$$css:!0},otSegFlexV:{kUk6DE:`astryx98rzlu`,kmuXW:null,kAzted:`astryx175cymr`,$$css:!0},otSegLeadV:e=>[{kZKoxP:e==null?e:`astryx16ye13r`,$$css:!0},{"--x-height":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],otSegH:{kZKoxP:`astryx11c6zpc`,kUk6DE:`astryx98rzlu`,k7Eaqz:`astryx18ki04u`,kaIpWk:`astryx2u8bby`,$$css:!0},otSegHiddenIfFirst:{k33iCy:`astryxnpuxes astryx4tzdo8`,$$css:!0},otSegHiddenIfLast:{k33iCy:`astryxnpuxes astryx1ecl1lc`,$$css:!0},otLabelWrapH:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx1qjc9v5`,kOIVth:`astryx1lsbc85`,k9WMMc:`astryx2b8uid`,$$css:!0},otContent:{kLKAdn:`astryx1xye8es`,$$css:!0},otContentSegV:e=>[Ne,{"--x-insetInlineStart":(e=>typeof e==`number`?e+`px`:e??void 0)(`calc(${e} + (${Te} - ${we}) / 2)`)}],otRowPadV:e=>[Pe,{k8WAf4:e==null?e:`astryx1giekp1`,kg3NbH:e==null?e:`astryx30g6up`,$$css:!0},{"--x-paddingBlock":(e=>typeof e==`number`?e+`px`:e??void 0)(e),"--x-paddingInline":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],otRailBridgeV:e=>[Fe,{"--x-marginBlock":(e=>typeof e==`number`?e+`px`:e??void 0)(`calc(-1 * ${e})`)}],otPadBlock:e=>[Ie,{k8WAf4:e==null?e:`astryx1giekp1`,$$css:!0},{"--x-paddingBlock":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],otMarginTop:e=>[Le,{"--x-marginBlockStart":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}]},q.displayName=`Step`,q.__docgenInfo={description:'An individual step within an Stepper. Renders a 4px progress-bar segment,\nan indicator (numbered badge, check, or any custom icon), a label with\noptional description, and an optional content slot.\n\nProgress (completed / active / not-started) is derived from the parent\'s\n`activeStep` and this step\'s `step` prop. The optional `status` prop layers a\nsemantic meaning on top: in the default `auto` indicator mode it recolors the\nindicator and swaps in a matching glyph (`success` → green check-circle,\n`warning`/`error` → the shared Input status icons). The current step always\nkeeps its current-step ring. `status` never recolors the connector/track.\n\n@example\n```\n<Step step={0} label="Account details" description="Enter your email" />\n```\n\n@example\n```\n<Step step={1} label="Payment" status="error" />\n```',methods:[],displayName:`Step`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLLIElement>`,elements:[{name:`HTMLLIElement`}]},description:`Ref forwarded to the root element`},step:{required:!0,tsType:{name:`number`},description:"Zero-based index of this step. Used to derive progress (completed /\nactive / not-started) relative to the parent's `activeStep`."},label:{required:!0,tsType:{name:`string`},description:`Step label text.`},description:{required:!1,tsType:{name:`string`},description:`Optional description shown below the label.`},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered below the label and description. Useful in vertical
steppers to show form fields or detailed content for each step. Compact
horizontal steppers hide it without unmounting it, preserving local state.`},status:{required:!1,tsType:{name:`union`,raw:`'accent' | 'success' | 'warning' | 'error'`,elements:[{name:`literal`,value:`'accent'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'error'`}]},description:'Semantic status for the step, mapped to the global Astryx semantic tokens\n(`accent`, `success`, `warning`, `error`). In the default `auto` indicator\nmode it sets both the indicator color and a matching glyph: `success` shows\na green check-circle, `warning`/`error` show the shared Input status icons.\n`accent` is color-only. The current (in-progress) step always keeps its\ncurrent-step indicator regardless of `status`. Never recolors the\nconnector/track.\n\nBecause the indicator glyphs are decorative (aria-hidden), the status also\nreaches assistive technology as text: visually hidden "completed" /\n"warning" / "error" next to the label, and composed into the accessible\nname of clickable steps.'},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Disable interaction for this step.
@default false`,defaultValue:{value:`false`,computed:!1}},isOptional:{required:!1,tsType:{name:`boolean`},description:`Marks the step as optional, appending an "Optional" affordance after the
label.
@default false`,defaultValue:{value:`false`,computed:!1}},endContent:{required:!1,tsType:{name:`ReactNode`},description:`Trailing content rendered at the end of the label row (e.g. a timestamp
or status chip).`},indicator:{required:!1,tsType:{name:`union`,raw:`StepIndicatorPreset | ReactNode`,elements:[{name:`union`,raw:`'auto' | 'number' | 'none'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'number'`},{name:`literal`,value:`'none'`}]},{name:`ReactNode`}]},description:`What to show as the step indicator. Accepts a preset string or any
ReactNode:
- 'auto': numbered badge until completed, then a check (default)
- 'number': always a numbered badge
- 'none': no indicator, just the bar + label
- ReactNode: any custom icon or element to render as the indicator
@default 'auto'`},density:{required:!1,tsType:{name:`union`,raw:`'compact' | 'balanced' | 'spacious'`,elements:[{name:`literal`,value:`'compact'`},{name:`literal`,value:`'balanced'`},{name:`literal`,value:`'spacious'`}]},description:`Controls vertical padding of the step. Falls back to the stepper-level
density when unset.
- 'compact': minimal padding (4px block)
- 'balanced': default (8px block)
- 'spacious': generous (12px block, 12px inline)`}},composes:[`Omit`]}})))()}var Z,Q,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,$,nt,rt,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t;function vt(){return(vt=e((()=>{Z=t(),he(),Re(),I(),O(),se(),T(),A(),P(),Q=c(),ze={title:`Core/Stepper`,component:V,tags:[`autodocs`],argTypes:{activeStep:{control:{type:`number`,min:0,max:5}},orientation:{control:`select`,options:[`horizontal`,`vertical`]},density:{control:`select`,options:[`compact`,`balanced`,`spacious`]},indicatorPosition:{control:`select`,options:[`separated`,`on-track`]}}},Be={name:`Default`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Create workspace`,description:`Name and configure your workspace`}),(0,Q.jsx)(q,{step:1,label:`Invite team members`,description:`Add collaborators by email`}),(0,Q.jsx)(q,{step:2,label:`Set up integrations`,description:`Connect Slack, GitHub, Jira`}),(0,Q.jsx)(q,{step:3,label:`Import data`,description:`Bring in existing projects`}),(0,Q.jsx)(q,{step:4,label:`Launch`,description:`Go live with your team`})]})})}},Ve={name:`Default — Horizontal`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsx)(`div`,{style:{maxWidth:700},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Workspace`}),(0,Q.jsx)(q,{step:1,label:`Team`}),(0,Q.jsx)(q,{step:2,label:`Integrations`}),(0,Q.jsx)(q,{step:3,label:`Import`}),(0,Q.jsx)(q,{step:4,label:`Launch`})]})})}},He={name:`Numbered — Deploy Pipeline`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Push to main`,description:`Merge your pull request`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Run CI checks`,description:`Lint, type-check, test`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Build container`,description:`Docker image to registry`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Deploy to staging`,description:`Verify in staging environment`,indicator:`number`}),(0,Q.jsx)(q,{step:4,label:`Promote to production`,description:`Canary → full rollout`,indicator:`number`})]})})}},Ue={name:`Numbered — Horizontal Checkout`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsx)(`div`,{style:{maxWidth:600},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Cart`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Confirm`,indicator:`number`})]})})}},We={name:`Status — Account Verification`,render:()=>{let[e,t]=(0,Z.useState)(3);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Email verified`,description:`alice@example.com`,status:`success`}),(0,Q.jsx)(q,{step:1,label:`Phone verified`,description:`+1 (555) 012-3456`,status:`success`}),(0,Q.jsx)(q,{step:2,label:`Identity document`,description:`Passport upload failed`,status:`error`}),(0,Q.jsx)(q,{step:3,label:`Address verification`,description:`Pending review`,status:`accent`}),(0,Q.jsx)(q,{step:4,label:`Background check`,isOptional:!0,description:`Skipped`}),(0,Q.jsx)(q,{step:5,label:`Account activated`})]})})}},Ge={name:`Status — Semantic Colors Reference`,render:()=>{let[e,t]=(0,Z.useState)(5);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Accent`,description:`--color-accent`,status:`accent`}),(0,Q.jsx)(q,{step:1,label:`Success`,description:`--color-icon-success`,status:`success`}),(0,Q.jsx)(q,{step:2,label:`Warning`,description:`--color-icon-warning`,status:`warning`}),(0,Q.jsx)(q,{step:3,label:`Error`,description:`--color-icon-error`,status:`error`}),(0,Q.jsx)(q,{step:4,label:`Default (no status)`,description:`progress-derived color`})]})})}},Ke={name:`Minimal — Interview Process`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Phone screen`,description:`30 min with recruiter`,indicator:`none`}),(0,Q.jsx)(q,{step:1,label:`Technical interview`,description:`1 hour coding session`,indicator:`none`}),(0,Q.jsx)(q,{step:2,label:`System design`,description:`45 min whiteboard`,indicator:`none`}),(0,Q.jsx)(q,{step:3,label:`Team match`,description:`Meet potential teammates`,indicator:`none`}),(0,Q.jsx)(q,{step:4,label:`Offer`,indicator:`none`})]})})}},qe={name:`Minimal — Video Upload`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsx)(`div`,{style:{maxWidth:500},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Upload`,indicator:`none`}),(0,Q.jsx)(q,{step:1,label:`Details`,indicator:`none`}),(0,Q.jsx)(q,{step:2,label:`Audience`,indicator:`none`}),(0,Q.jsx)(q,{step:3,label:`Publish`,indicator:`none`})]})})}},Je={name:`Indicator Modes — Side by Side`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:48},children:[(0,Q.jsxs)(`div`,{style:{maxWidth:280},children:[(0,Q.jsx)(w,{type:`label`,children:`Auto (default)`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Account`}),(0,Q.jsx)(q,{step:1,label:`Profile`}),(0,Q.jsx)(q,{step:2,label:`Settings`}),(0,Q.jsx)(q,{step:3,label:`Review`}),(0,Q.jsx)(q,{step:4,label:`Done`})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:280},children:[(0,Q.jsx)(w,{type:`label`,children:`Number`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Account`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Profile`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Settings`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`}),(0,Q.jsx)(q,{step:4,label:`Done`,indicator:`number`})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:280},children:[(0,Q.jsx)(w,{type:`label`,children:`Custom indicator`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Account`,indicator:(0,Q.jsx)(E,{icon:`info`,size:`sm`})}),(0,Q.jsx)(q,{step:1,label:`Profile`,indicator:(0,Q.jsx)(E,{icon:`search`,size:`sm`})}),(0,Q.jsx)(q,{step:2,label:`Settings`,indicator:(0,Q.jsx)(E,{icon:`wrench`,size:`sm`})}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:(0,Q.jsx)(E,{icon:`clock`,size:`sm`})}),(0,Q.jsx)(q,{step:4,label:`Done`,indicator:(0,Q.jsx)(E,{icon:`check`,size:`sm`})})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:280},children:[(0,Q.jsx)(w,{type:`label`,children:`None`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Account`,indicator:`none`}),(0,Q.jsx)(q,{step:1,label:`Profile`,indicator:`none`}),(0,Q.jsx)(q,{step:2,label:`Settings`,indicator:`none`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`none`}),(0,Q.jsx)(q,{step:4,label:`Done`,indicator:`none`})]})]})]})}},Ye={name:`With Content — Multi-Step Form`,render:()=>{let[e,t]=(0,Z.useState)(0);return(0,Q.jsx)(`div`,{style:{maxWidth:480},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Project details`,indicator:`number`,children:e===0&&(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,Q.jsx)(L,{label:`Project name`,placeholder:`My awesome project`,value:``}),(0,Q.jsx)(L,{label:`Repository URL`,placeholder:`https://github.com/...`,value:``}),(0,Q.jsx)(`div`,{children:(0,Q.jsx)(k,{label:`Continue`,variant:`primary`,onClick:()=>t(1)})})]})}),(0,Q.jsx)(q,{step:1,label:`Environment`,indicator:`number`,children:e===1&&(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,Q.jsx)(L,{label:`Node version`,placeholder:`20`,value:``}),(0,Q.jsx)(L,{label:`Build command`,placeholder:`npm run build`,value:``}),(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,Q.jsx)(k,{label:`Back`,variant:`secondary`,onClick:()=>t(0)}),(0,Q.jsx)(k,{label:`Continue`,variant:`primary`,onClick:()=>t(2)})]})]})}),(0,Q.jsx)(q,{step:2,label:`Deploy`,indicator:`number`,children:e===2&&(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,Q.jsx)(w,{type:`body`,children:`Ready to deploy. This will create a production build and push to your configured hosting.`}),(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,Q.jsx)(k,{label:`Back`,variant:`secondary`,onClick:()=>t(1)}),(0,Q.jsx)(k,{label:`Deploy now`,variant:`primary`,onClick:()=>t(3)})]})]})}),(0,Q.jsx)(q,{step:3,label:`Done`,indicator:`number`})]})})}},Xe={name:`With Content — Alignment`,render:()=>(0,Q.jsx)(`div`,{style:{display:`flex`,gap:48,flexWrap:`wrap`},children:[`separated`,`on-track`].map(e=>(0,Q.jsxs)(`div`,{style:{width:320},children:[(0,Q.jsxs)(w,{type:`label`,children:[e,`, spacious`]}),(0,Q.jsxs)(V,{activeStep:1,orientation:`vertical`,indicatorPosition:e,density:`spacious`,children:[(0,Q.jsx)(q,{step:0,label:`Contact details`}),(0,Q.jsx)(q,{step:1,label:`Billing address`,description:`Used for invoices and tax`,children:(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,Q.jsx)(L,{label:`Street`,placeholder:`1 Hacker Way`,value:``}),(0,Q.jsx)(`div`,{children:(0,Q.jsx)(k,{label:`Save address`,variant:`primary`})})]})}),(0,Q.jsx)(q,{step:2,label:`Review`})]})]},e))})},Ze={name:`Density — Compact / Balanced / Spacious`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:48},children:[(0,Q.jsxs)(`div`,{style:{maxWidth:250},children:[(0,Q.jsx)(w,{type:`label`,children:`Compact`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,density:`compact`,children:[(0,Q.jsx)(q,{step:0,label:`Account`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Profile`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:250},children:[(0,Q.jsx)(w,{type:`label`,children:`Balanced`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,density:`balanced`,children:[(0,Q.jsx)(q,{step:0,label:`Account`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Profile`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:250},children:[(0,Q.jsx)(w,{type:`label`,children:`Spacious`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,density:`spacious`,children:[(0,Q.jsx)(q,{step:0,label:`Account`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Profile`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`})]})]})]})}},Qe={name:`Edge — Two Steps`,render:()=>{let[e,t]=(0,Z.useState)(0);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Before`}),(0,Q.jsx)(q,{step:1,label:`After`})]})})}},$e={name:`Edge — Seven Steps (Horizontal)`,render:()=>{let[e,t]=(0,Z.useState)(3);return(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Idea`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Design`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Build`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Test`,indicator:`number`}),(0,Q.jsx)(q,{step:4,label:`Review`,indicator:`number`}),(0,Q.jsx)(q,{step:5,label:`Deploy`,indicator:`number`}),(0,Q.jsx)(q,{step:6,label:`Monitor`,indicator:`number`})]})}},et={name:`Edge — Disabled Steps`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Basic info`}),(0,Q.jsx)(q,{step:1,label:`Permissions`}),(0,Q.jsx)(q,{step:2,label:`Admin settings`,description:`Requires admin role`,isDisabled:!0}),(0,Q.jsx)(q,{step:3,label:`Confirm`})]})})}},tt={name:`Edge — Optional + Skipped`,render:()=>{let[e,t]=(0,Z.useState)(3);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Basic profile`}),(0,Q.jsx)(q,{step:1,label:`Profile photo`,isOptional:!0,description:`Skipped`}),(0,Q.jsx)(q,{step:2,label:`Connect socials`,isOptional:!0}),(0,Q.jsx)(q,{step:3,label:`Preferences`}),(0,Q.jsx)(q,{step:4,label:`All done`})]})})}},$={name:`Edge — Long Labels & Descriptions`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Configure your development environment`,description:`Install dependencies, set up local database, configure environment variables`}),(0,Q.jsx)(q,{step:1,label:`Create initial data migration`,description:`Define schema, seed data, and run migrations against staging`}),(0,Q.jsx)(q,{step:2,label:`Submit for code review`,description:`Open pull request and address reviewer feedback`})]})})}},nt={name:`On-Track — Vertical`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Create workspace`}),(0,Q.jsx)(q,{step:1,label:`Invite team members`}),(0,Q.jsx)(q,{step:2,label:`Set up integrations`}),(0,Q.jsx)(q,{step:3,label:`Import data`}),(0,Q.jsx)(q,{step:4,label:`Launch`})]})})}},rt={name:`On-Track — Gap Stops at a Layer`,render:()=>{let[e,t]=(0,Z.useState)(!0);return(0,Q.jsx)(`div`,{style:{maxWidth:400,"--step-connector-gap":`6px`},children:(0,Q.jsxs)(V,{activeStep:1,orientation:`vertical`,indicatorPosition:`on-track`,children:[(0,Q.jsx)(q,{step:0,label:`Create workspace`}),(0,Q.jsx)(q,{step:1,label:`Set up integrations`,children:(0,Q.jsx)(F,{label:`Integration steps`,isOpen:e,onOpenChange:t,placement:`end`,content:(0,Q.jsxs)(V,{activeStep:1,orientation:`vertical`,indicatorPosition:`on-track`,children:[(0,Q.jsx)(q,{step:0,label:`Connect`}),(0,Q.jsx)(q,{step:1,label:`Map fields`}),(0,Q.jsx)(q,{step:2,label:`Sync`})]}),children:(0,Q.jsx)(k,{label:`Integration steps`,variant:`secondary`})})}),(0,Q.jsx)(q,{step:2,label:`Launch`})]})})}},it={name:`On-Track — Horizontal`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:700},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Cart`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`}),(0,Q.jsx)(q,{step:4,label:`Confirm`,indicator:`number`})]})})}},at={name:`On-Track — Vertical (with description)`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Create workspace`,description:`Name and configure your workspace`}),(0,Q.jsx)(q,{step:1,label:`Invite team members`,description:`Add collaborators by email`}),(0,Q.jsx)(q,{step:2,label:`Set up integrations`,description:`Connect Slack, GitHub, Jira`}),(0,Q.jsx)(q,{step:3,label:`Import data`,description:`Bring in existing projects`}),(0,Q.jsx)(q,{step:4,label:`Launch`,description:`Go live with your team`})]})})}},ot={name:`On-Track — Horizontal (with description)`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:760},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Cart`,indicator:`number`,description:`Review your items`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,indicator:`number`,description:`Where to deliver`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`,description:`Card or PayPal`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`,description:`Confirm details`}),(0,Q.jsx)(q,{step:4,label:`Confirm`,indicator:`number`,description:`Place your order`})]})})}},st={name:`On-Track — vs Separated`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:64},children:[(0,Q.jsxs)(`div`,{style:{maxWidth:280},children:[(0,Q.jsx)(w,{type:`label`,children:`separated (current)`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,indicatorPosition:`separated`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Account`,description:`Basic details`}),(0,Q.jsx)(q,{step:1,label:`Profile`,description:`About you`}),(0,Q.jsx)(q,{step:2,label:`Settings`,description:`Preferences`}),(0,Q.jsx)(q,{step:3,label:`Review`,description:`Confirm details`})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:280},children:[(0,Q.jsx)(w,{type:`label`,children:`on-track`}),(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Account`,description:`Basic details`}),(0,Q.jsx)(q,{step:1,label:`Profile`,description:`About you`}),(0,Q.jsx)(q,{step:2,label:`Settings`,description:`Preferences`}),(0,Q.jsx)(q,{step:3,label:`Review`,description:`Confirm details`})]})]})]})}},ct={name:`On-Track — Status Colors`,render:()=>{let[e,t]=(0,Z.useState)(3);return(0,Q.jsx)(`div`,{style:{maxWidth:400},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Email verified`,description:`alice@example.com`,status:`success`}),(0,Q.jsx)(q,{step:1,label:`Phone verified`,description:`+1 (555) 012-3456`,status:`success`}),(0,Q.jsx)(q,{step:2,label:`Identity document`,description:`Passport upload failed`,status:`error`}),(0,Q.jsx)(q,{step:3,label:`Address verification`,description:`Pending review`,status:`accent`}),(0,Q.jsx)(q,{step:4,label:`Background check`,isOptional:!0}),(0,Q.jsx)(q,{step:5,label:`Account activated`})]})})}},lt={name:`On-Track — Horizontal, Many Steps`,render:()=>{let[e,t]=(0,Z.useState)(3);return(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,indicatorPosition:`on-track`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Idea`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Design`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Build`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Test`,indicator:`number`}),(0,Q.jsx)(q,{step:4,label:`Review`,indicator:`number`}),(0,Q.jsx)(q,{step:5,label:`Deploy`,indicator:`number`}),(0,Q.jsx)(q,{step:6,label:`Monitor`,indicator:`number`})]})}},ut={name:`Slots — endContent (trailing badges)`,render:()=>{let[e,t]=(0,Z.useState)(2);return(0,Q.jsx)(`div`,{style:{maxWidth:440},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`vertical`,onStepClick:t,children:[(0,Q.jsx)(q,{step:0,label:`Draft`,description:`Written 2 days ago`,endContent:(0,Q.jsx)(j,{variant:`success`,label:`Done`})}),(0,Q.jsx)(q,{step:1,label:`Review`,description:`2 approvals required`,endContent:(0,Q.jsx)(j,{variant:`info`,label:`2 pending`})}),(0,Q.jsx)(q,{step:2,label:`Publish`,description:`Scheduled for Monday`,endContent:(0,Q.jsx)(j,{variant:`warning`,label:`Blocked`})}),(0,Q.jsx)(q,{step:3,label:`Archive`})]})})}},dt={padded:{kmVPX3:`xggk2y7`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kMzoRj:`xmkeg23`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`x1y0btm7`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kVAM5u:`x14i3s5s`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kaIpWk:`x1hviunn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0}},ft={name:`Customization — xstyle + accessible label`,render:()=>{let[e,t]=(0,Z.useState)(1);return(0,Q.jsx)(`div`,{style:{maxWidth:520},children:(0,Q.jsxs)(V,{activeStep:e,orientation:`horizontal`,onStepClick:t,label:`Checkout progress`,xstyle:dt.padded,children:[(0,Q.jsx)(q,{step:0,label:`Cart`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Confirm`,indicator:`number`})]})})}},pt={name:`Motion — Step Advance`,render:()=>{let[e,t]=(0,Z.useState)(0),n=[`Cart`,`Shipping`,`Payment`,`Review`,`Confirm`],r=e=>(0,Q.jsx)(Q.Fragment,{children:n.map((t,n)=>(0,Q.jsx)(q,{step:n,label:t,indicator:`number`,children:e&&n===2?(0,Q.jsx)(w,{type:`body`,children:`Applied at checkout.`}):null},t))});return(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,Q.jsx)(w,{type:`label`,children:`Jump to`}),n.map((n,r)=>(0,Q.jsx)(k,{label:`${r}`,variant:r===e?`primary`:`secondary`,onClick:()=>t(r)},n))]}),(0,Q.jsx)(w,{type:`body`,children:`Advancing one step animates the fill. Jumping further ahead, and every move backwards, lands at once.`})]}),(0,Q.jsx)(`div`,{style:{display:`flex`,gap:48,flexWrap:`wrap`},children:[`separated`,`on-track`].map(n=>(0,Q.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,Q.jsxs)(`div`,{style:{width:460},children:[(0,Q.jsxs)(w,{type:`label`,children:[n,`, horizontal`]}),(0,Q.jsx)(V,{activeStep:e,orientation:`horizontal`,indicatorPosition:n,onStepClick:t,"data-testid":`h-${n}`,children:r(!1)})]}),(0,Q.jsxs)(`div`,{style:{width:460},children:[(0,Q.jsxs)(w,{type:`label`,children:[n,`, vertical (step 3 has content)`]}),(0,Q.jsx)(V,{activeStep:e,orientation:`vertical`,indicatorPosition:n,onStepClick:t,"data-testid":`v-${n}`,children:r(!0)})]})]},n))})]})}},mt={name:`Narrow — Collapsed Track`,parameters:{docs:{description:{story:"A horizontal stepper measures its own width and collapses once a step has less than `horizontalOptions.minimumStepWidth` pixels (112 by default), so the breakpoint follows the step count rather than the viewport. `horizontalOptions.collapsedVariant` selects `'withLabelAndControls'`, `'withLabel'`, or `'hiddenLabel'`; the last renders only the bare progress track with no compact row. The two indicator positions collapse differently on purpose: `separated` drops its indicators with the labels and repeats the active indicator beside the compact label, while `on-track` keeps its indicators as presentational nodes on the rail and does not repeat the active one beside the label. Controls appear only for `withLabelAndControls` when `onStepClick` is set."}}},render:()=>{let[e,t]=(0,Z.useState)(1),[n,r]=(0,Z.useState)(1),[i,a]=(0,Z.useState)(1),o=[`Cart`,`Shipping`,`Delivery`,`Payment`];return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:40},children:[(0,Q.jsxs)(`div`,{style:{maxWidth:560},children:[(0,Q.jsx)(w,{type:`label`,children:`560px — four steps still fit`}),(0,Q.jsx)(V,{activeStep:e,onStepClick:t,label:`Checkout`,children:o.map((e,t)=>(0,Q.jsx)(q,{step:t,label:e},e))})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:320},children:[(0,Q.jsx)(w,{type:`label`,children:`320px — separated, navigable`}),(0,Q.jsx)(V,{activeStep:e,onStepClick:t,label:`Checkout`,children:o.map((e,t)=>(0,Q.jsx)(q,{step:t,label:e},e))})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:320},children:[(0,Q.jsx)(w,{type:`label`,children:`320px — custom 64px threshold stays expanded`}),(0,Q.jsx)(V,{activeStep:e,onStepClick:t,horizontalOptions:{minimumStepWidth:64,collapsedVariant:`withLabelAndControls`},label:`Checkout`,children:o.map((e,t)=>(0,Q.jsx)(q,{step:t,label:e},e))})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:320},children:[(0,Q.jsx)(w,{type:`label`,children:`320px — on-track keeps nodes on the rail`}),(0,Q.jsx)(V,{activeStep:n,onStepClick:r,indicatorPosition:`on-track`,label:`Checkout`,children:o.map((e,t)=>(0,Q.jsx)(q,{step:t,label:e,indicator:`number`},e))})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:320},children:[(0,Q.jsx)(w,{type:`label`,children:`320px — no onStepClick, so no controls`}),(0,Q.jsx)(V,{activeStep:i,label:`Checkout`,children:o.map((e,t)=>(0,Q.jsx)(q,{step:t,label:e},e))}),(0,Q.jsxs)(`div`,{style:{marginTop:12,display:`flex`,gap:8},children:[(0,Q.jsx)(k,{label:`Back`,variant:`secondary`,onClick:()=>a(e=>Math.max(0,e-1))}),(0,Q.jsx)(k,{label:`Continue`,onClick:()=>a(e=>Math.min(3,e+1))})]})]}),(0,Q.jsxs)(`div`,{style:{maxWidth:320},children:[(0,Q.jsx)(w,{type:`label`,children:`320px — a description rides along with the current step`}),(0,Q.jsxs)(V,{activeStep:e,onStepClick:t,label:`Checkout`,children:[(0,Q.jsx)(q,{step:0,label:`Cart`,description:`Review your items`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,description:`Where it goes`}),(0,Q.jsx)(q,{step:2,label:`Delivery`,description:`How fast`}),(0,Q.jsx)(q,{step:3,label:`Payment`,description:`How you pay`})]})]})]})}},ht={name:`Narrow — Collapsed Variants`,parameters:{docs:{description:{story:`The same 320px horizontal Stepper with each collapsedVariant. hiddenLabel omits the entire compact row—even though onStepClick is present—so it is shorter and leaves only the progress track.`}}},render:()=>{let[e,t]=(0,Z.useState)(1),n=[`Cart`,`Shipping`,`Delivery`,`Payment`];return(0,Q.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 320px))`,alignItems:`start`,gap:40},children:[{value:`withLabelAndControls`,label:`withLabelAndControls — label and controls`},{value:`withLabel`,label:`withLabel — label only`},{value:`hiddenLabel`,label:`hiddenLabel — bare track`}].map(r=>(0,Q.jsxs)(`div`,{style:{width:`100%`,maxWidth:320},children:[(0,Q.jsx)(w,{type:`label`,children:r.label}),(0,Q.jsx)(V,{activeStep:e,onStepClick:t,label:`Checkout`,horizontalOptions:{minimumStepWidth:112,collapsedVariant:r.value},children:n.map((e,t)=>(0,Q.jsx)(q,{step:t,label:e},e))})]},r.value))})}},gt={name:`Fragment-Grouped Steps`,render:()=>{let e=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(q,{step:0,label:`Cart`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`})]});return(0,Q.jsxs)(`div`,{style:{display:`grid`,gap:40,maxWidth:700},children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(w,{type:`label`,children:`Steps passed directly`}),(0,Q.jsxs)(V,{activeStep:2,indicatorPosition:`on-track`,children:[(0,Q.jsx)(q,{step:0,label:`Cart`,indicator:`number`}),(0,Q.jsx)(q,{step:1,label:`Shipping`,indicator:`number`}),(0,Q.jsx)(q,{step:2,label:`Payment`,indicator:`number`}),(0,Q.jsx)(q,{step:3,label:`Review`,indicator:`number`})]})]}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(w,{type:`label`,children:`Same steps grouped in a fragment`}),(0,Q.jsx)(V,{activeStep:2,indicatorPosition:`on-track`,children:e})]}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(w,{type:`label`,children:`Fragment-grouped, vertical`}),(0,Q.jsx)(V,{activeStep:2,orientation:`vertical`,indicatorPosition:`on-track`,children:e})]})]})}},Be.parameters={...Be.parameters,docs:{...Be.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Create workspace" description="Name and configure your workspace" />
          <Step step={1} label="Invite team members" description="Add collaborators by email" />
          <Step step={2} label="Set up integrations" description="Connect Slack, GitHub, Jira" />
          <Step step={3} label="Import data" description="Bring in existing projects" />
          <Step step={4} label="Launch" description="Go live with your team" />
        </Stepper>
      </div>;
  }
}`,...Be.parameters?.docs?.source}}},Ve.parameters={...Ve.parameters,docs:{...Ve.parameters?.docs,source:{originalSource:`{
  name: 'Default — Horizontal',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 700
    }}>
        <Stepper activeStep={active} orientation="horizontal" onStepClick={setActive}>
          <Step step={0} label="Workspace" />
          <Step step={1} label="Team" />
          <Step step={2} label="Integrations" />
          <Step step={3} label="Import" />
          <Step step={4} label="Launch" />
        </Stepper>
      </div>;
  }
}`,...Ve.parameters?.docs?.source}}},He.parameters={...He.parameters,docs:{...He.parameters?.docs,source:{originalSource:`{
  name: 'Numbered — Deploy Pipeline',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Push to main" description="Merge your pull request" indicator="number" />
          <Step step={1} label="Run CI checks" description="Lint, type-check, test" indicator="number" />
          <Step step={2} label="Build container" description="Docker image to registry" indicator="number" />
          <Step step={3} label="Deploy to staging" description="Verify in staging environment" indicator="number" />
          <Step step={4} label="Promote to production" description="Canary → full rollout" indicator="number" />
        </Stepper>
      </div>;
  }
}`,...He.parameters?.docs?.source}}},Ue.parameters={...Ue.parameters,docs:{...Ue.parameters?.docs,source:{originalSource:`{
  name: 'Numbered — Horizontal Checkout',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 600
    }}>
        <Stepper activeStep={active} orientation="horizontal" onStepClick={setActive}>
          <Step step={0} label="Cart" indicator="number" />
          <Step step={1} label="Shipping" indicator="number" />
          <Step step={2} label="Payment" indicator="number" />
          <Step step={3} label="Confirm" indicator="number" />
        </Stepper>
      </div>;
  }
}`,...Ue.parameters?.docs?.source}}},We.parameters={...We.parameters,docs:{...We.parameters?.docs,source:{originalSource:`{
  name: 'Status — Account Verification',
  render: () => {
    const [active, setActive] = useState(3);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Email verified" description="alice@example.com" status="success" />
          <Step step={1} label="Phone verified" description="+1 (555) 012-3456" status="success" />
          <Step step={2} label="Identity document" description="Passport upload failed" status="error" />
          <Step step={3} label="Address verification" description="Pending review" status="accent" />
          <Step step={4} label="Background check" isOptional description="Skipped" />
          <Step step={5} label="Account activated" />
        </Stepper>
      </div>;
  }
}`,...We.parameters?.docs?.source}}},Ge.parameters={...Ge.parameters,docs:{...Ge.parameters?.docs,source:{originalSource:`{
  name: 'Status — Semantic Colors Reference',
  render: () => {
    // Start past all steps so each status glyph is visible (the current step
    // always shows the ring, which would otherwise mask one status).
    const [active, setActive] = useState(5);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Accent" description="--color-accent" status="accent" />
          <Step step={1} label="Success" description="--color-icon-success" status="success" />
          <Step step={2} label="Warning" description="--color-icon-warning" status="warning" />
          <Step step={3} label="Error" description="--color-icon-error" status="error" />
          <Step step={4} label="Default (no status)" description="progress-derived color" />
        </Stepper>
      </div>;
  }
}`,...Ge.parameters?.docs?.source}}},Ke.parameters={...Ke.parameters,docs:{...Ke.parameters?.docs,source:{originalSource:`{
  name: 'Minimal — Interview Process',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Phone screen" description="30 min with recruiter" indicator="none" />
          <Step step={1} label="Technical interview" description="1 hour coding session" indicator="none" />
          <Step step={2} label="System design" description="45 min whiteboard" indicator="none" />
          <Step step={3} label="Team match" description="Meet potential teammates" indicator="none" />
          <Step step={4} label="Offer" indicator="none" />
        </Stepper>
      </div>;
  }
}`,...Ke.parameters?.docs?.source}}},qe.parameters={...qe.parameters,docs:{...qe.parameters?.docs,source:{originalSource:`{
  name: 'Minimal — Video Upload',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 500
    }}>
        <Stepper activeStep={active} orientation="horizontal" onStepClick={setActive}>
          <Step step={0} label="Upload" indicator="none" />
          <Step step={1} label="Details" indicator="none" />
          <Step step={2} label="Audience" indicator="none" />
          <Step step={3} label="Publish" indicator="none" />
        </Stepper>
      </div>;
  }
}`,...qe.parameters?.docs?.source}}},Je.parameters={...Je.parameters,docs:{...Je.parameters?.docs,source:{originalSource:`{
  name: 'Indicator Modes — Side by Side',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      display: 'flex',
      gap: 48
    }}>
        <div style={{
        maxWidth: 280
      }}>
          <Text type="label">Auto (default)</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
            <Step step={0} label="Account" />
            <Step step={1} label="Profile" />
            <Step step={2} label="Settings" />
            <Step step={3} label="Review" />
            <Step step={4} label="Done" />
          </Stepper>
        </div>
        <div style={{
        maxWidth: 280
      }}>
          <Text type="label">Number</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
            <Step step={0} label="Account" indicator="number" />
            <Step step={1} label="Profile" indicator="number" />
            <Step step={2} label="Settings" indicator="number" />
            <Step step={3} label="Review" indicator="number" />
            <Step step={4} label="Done" indicator="number" />
          </Stepper>
        </div>
        <div style={{
        maxWidth: 280
      }}>
          <Text type="label">Custom indicator</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
            <Step step={0} label="Account" indicator={<Icon icon="info" size="sm" />} />
            <Step step={1} label="Profile" indicator={<Icon icon="search" size="sm" />} />
            <Step step={2} label="Settings" indicator={<Icon icon="wrench" size="sm" />} />
            <Step step={3} label="Review" indicator={<Icon icon="clock" size="sm" />} />
            <Step step={4} label="Done" indicator={<Icon icon="check" size="sm" />} />
          </Stepper>
        </div>
        <div style={{
        maxWidth: 280
      }}>
          <Text type="label">None</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
            <Step step={0} label="Account" indicator="none" />
            <Step step={1} label="Profile" indicator="none" />
            <Step step={2} label="Settings" indicator="none" />
            <Step step={3} label="Review" indicator="none" />
            <Step step={4} label="Done" indicator="none" />
          </Stepper>
        </div>
      </div>;
  }
}`,...Je.parameters?.docs?.source}}},Ye.parameters={...Ye.parameters,docs:{...Ye.parameters?.docs,source:{originalSource:`{
  name: 'With Content — Multi-Step Form',
  render: () => {
    const [active, setActive] = useState(0);
    return <div style={{
      maxWidth: 480
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Project details" indicator="number">
            {active === 0 && <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
                <TextInput label="Project name" placeholder="My awesome project" value="" />
                <TextInput label="Repository URL" placeholder="https://github.com/..." value="" />
                <div>
                  <Button label="Continue" variant="primary" onClick={() => setActive(1)} />
                </div>
              </div>}
          </Step>
          <Step step={1} label="Environment" indicator="number">
            {active === 1 && <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
                <TextInput label="Node version" placeholder="20" value="" />
                <TextInput label="Build command" placeholder="npm run build" value="" />
                <div style={{
              display: 'flex',
              gap: 8
            }}>
                  <Button label="Back" variant="secondary" onClick={() => setActive(0)} />
                  <Button label="Continue" variant="primary" onClick={() => setActive(2)} />
                </div>
              </div>}
          </Step>
          <Step step={2} label="Deploy" indicator="number">
            {active === 2 && <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
                <Text type="body">
                  Ready to deploy. This will create a production build and push
                  to your configured hosting.
                </Text>
                <div style={{
              display: 'flex',
              gap: 8
            }}>
                  <Button label="Back" variant="secondary" onClick={() => setActive(1)} />
                  <Button label="Deploy now" variant="primary" onClick={() => setActive(3)} />
                </div>
              </div>}
          </Step>
          <Step step={3} label="Done" indicator="number" />
        </Stepper>
      </div>;
  }
}`,...Ye.parameters?.docs?.source}}},Xe.parameters={...Xe.parameters,docs:{...Xe.parameters?.docs,source:{originalSource:`{
  name: 'With Content — Alignment',
  render: () =>
  // The content slot renders outside the density-padded hover target, so it
  // has to re-apply that padding to line up with the label above it. Spacious
  // density is the widest pad, and on-track uses a different scale to
  // separated, so between them these two catch a slot that has drifted.
  <div style={{
    display: 'flex',
    gap: 48,
    flexWrap: 'wrap'
  }}>
      {(['separated', 'on-track'] as const).map(position => <div key={position} style={{
      width: 320
    }}>
          <Text type="label">{position}, spacious</Text>
          <Stepper activeStep={1} orientation="vertical" indicatorPosition={position} density="spacious">
            <Step step={0} label="Contact details" />
            <Step step={1} label="Billing address" description="Used for invoices and tax">
              <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
                <TextInput label="Street" placeholder="1 Hacker Way" value="" />
                <div>
                  <Button label="Save address" variant="primary" />
                </div>
              </div>
            </Step>
            <Step step={2} label="Review" />
          </Stepper>
        </div>)}
    </div>
}`,...Xe.parameters?.docs?.source}}},Ze.parameters={...Ze.parameters,docs:{...Ze.parameters?.docs,source:{originalSource:`{
  name: 'Density — Compact / Balanced / Spacious',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      display: 'flex',
      gap: 48
    }}>
        <div style={{
        maxWidth: 250
      }}>
          <Text type="label">Compact</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive} density="compact">
            <Step step={0} label="Account" indicator="number" />
            <Step step={1} label="Profile" indicator="number" />
            <Step step={2} label="Payment" indicator="number" />
            <Step step={3} label="Review" indicator="number" />
          </Stepper>
        </div>
        <div style={{
        maxWidth: 250
      }}>
          <Text type="label">Balanced</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive} density="balanced">
            <Step step={0} label="Account" indicator="number" />
            <Step step={1} label="Profile" indicator="number" />
            <Step step={2} label="Payment" indicator="number" />
            <Step step={3} label="Review" indicator="number" />
          </Stepper>
        </div>
        <div style={{
        maxWidth: 250
      }}>
          <Text type="label">Spacious</Text>
          <Stepper activeStep={active} orientation="vertical" onStepClick={setActive} density="spacious">
            <Step step={0} label="Account" indicator="number" />
            <Step step={1} label="Profile" indicator="number" />
            <Step step={2} label="Payment" indicator="number" />
            <Step step={3} label="Review" indicator="number" />
          </Stepper>
        </div>
      </div>;
  }
}`,...Ze.parameters?.docs?.source}}},Qe.parameters={...Qe.parameters,docs:{...Qe.parameters?.docs,source:{originalSource:`{
  name: 'Edge — Two Steps',
  render: () => {
    const [active, setActive] = useState(0);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="horizontal" onStepClick={setActive}>
          <Step step={0} label="Before" />
          <Step step={1} label="After" />
        </Stepper>
      </div>;
  }
}`,...Qe.parameters?.docs?.source}}},$e.parameters={...$e.parameters,docs:{...$e.parameters?.docs,source:{originalSource:`{
  name: 'Edge — Seven Steps (Horizontal)',
  render: () => {
    const [active, setActive] = useState(3);
    return <Stepper activeStep={active} orientation="horizontal" onStepClick={setActive}>
        <Step step={0} label="Idea" indicator="number" />
        <Step step={1} label="Design" indicator="number" />
        <Step step={2} label="Build" indicator="number" />
        <Step step={3} label="Test" indicator="number" />
        <Step step={4} label="Review" indicator="number" />
        <Step step={5} label="Deploy" indicator="number" />
        <Step step={6} label="Monitor" indicator="number" />
      </Stepper>;
  }
}`,...$e.parameters?.docs?.source}}},et.parameters={...et.parameters,docs:{...et.parameters?.docs,source:{originalSource:`{
  name: 'Edge — Disabled Steps',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Basic info" />
          <Step step={1} label="Permissions" />
          <Step step={2} label="Admin settings" description="Requires admin role" isDisabled />
          <Step step={3} label="Confirm" />
        </Stepper>
      </div>;
  }
}`,...et.parameters?.docs?.source}}},tt.parameters={...tt.parameters,docs:{...tt.parameters?.docs,source:{originalSource:`{
  name: 'Edge — Optional + Skipped',
  render: () => {
    const [active, setActive] = useState(3);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Basic profile" />
          <Step step={1} label="Profile photo" isOptional description="Skipped" />
          <Step step={2} label="Connect socials" isOptional />
          <Step step={3} label="Preferences" />
          <Step step={4} label="All done" />
        </Stepper>
      </div>;
  }
}`,...tt.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Edge — Long Labels & Descriptions',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Configure your development environment" description="Install dependencies, set up local database, configure environment variables" />
          <Step step={1} label="Create initial data migration" description="Define schema, seed data, and run migrations against staging" />
          <Step step={2} label="Submit for code review" description="Open pull request and address reviewer feedback" />
        </Stepper>
      </div>;
  }
}`,...$.parameters?.docs?.source}}},nt.parameters={...nt.parameters,docs:{...nt.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Vertical',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" indicatorPosition="on-track" onStepClick={setActive}>
          <Step step={0} label="Create workspace" />
          <Step step={1} label="Invite team members" />
          <Step step={2} label="Set up integrations" />
          <Step step={3} label="Import data" />
          <Step step={4} label="Launch" />
        </Stepper>
      </div>;
  }
}`,...nt.parameters?.docs?.source}}},rt.parameters={...rt.parameters,docs:{...rt.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Gap Stops at a Layer',
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return <div style={{
      maxWidth: 400,
      '--step-connector-gap': '6px'
    } as CSSProperties}>
        <Stepper activeStep={1} orientation="vertical" indicatorPosition="on-track">
          <Step step={0} label="Create workspace" />
          <Step step={1} label="Set up integrations">
            <Popover label="Integration steps" isOpen={isOpen} onOpenChange={setIsOpen} placement="end" content={<Stepper activeStep={1} orientation="vertical" indicatorPosition="on-track">
                  <Step step={0} label="Connect" />
                  <Step step={1} label="Map fields" />
                  <Step step={2} label="Sync" />
                </Stepper>}>
              <Button label="Integration steps" variant="secondary" />
            </Popover>
          </Step>
          <Step step={2} label="Launch" />
        </Stepper>
      </div>;
  }
}`,...rt.parameters?.docs?.source}}},it.parameters={...it.parameters,docs:{...it.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Horizontal',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 700
    }}>
        <Stepper activeStep={active} orientation="horizontal" indicatorPosition="on-track" onStepClick={setActive}>
          <Step step={0} label="Cart" indicator="number" />
          <Step step={1} label="Shipping" indicator="number" />
          <Step step={2} label="Payment" indicator="number" />
          <Step step={3} label="Review" indicator="number" />
          <Step step={4} label="Confirm" indicator="number" />
        </Stepper>
      </div>;
  }
}`,...it.parameters?.docs?.source}}},at.parameters={...at.parameters,docs:{...at.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Vertical (with description)',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" indicatorPosition="on-track" onStepClick={setActive}>
          <Step step={0} label="Create workspace" description="Name and configure your workspace" />
          <Step step={1} label="Invite team members" description="Add collaborators by email" />
          <Step step={2} label="Set up integrations" description="Connect Slack, GitHub, Jira" />
          <Step step={3} label="Import data" description="Bring in existing projects" />
          <Step step={4} label="Launch" description="Go live with your team" />
        </Stepper>
      </div>;
  }
}`,...at.parameters?.docs?.source}}},ot.parameters={...ot.parameters,docs:{...ot.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Horizontal (with description)',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 760
    }}>
        <Stepper activeStep={active} orientation="horizontal" indicatorPosition="on-track" onStepClick={setActive}>
          <Step step={0} label="Cart" indicator="number" description="Review your items" />
          <Step step={1} label="Shipping" indicator="number" description="Where to deliver" />
          <Step step={2} label="Payment" indicator="number" description="Card or PayPal" />
          <Step step={3} label="Review" indicator="number" description="Confirm details" />
          <Step step={4} label="Confirm" indicator="number" description="Place your order" />
        </Stepper>
      </div>;
  }
}`,...ot.parameters?.docs?.source}}},st.parameters={...st.parameters,docs:{...st.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — vs Separated',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      display: 'flex',
      gap: 64
    }}>
        <div style={{
        maxWidth: 280
      }}>
          <Text type="label">separated (current)</Text>
          <Stepper activeStep={active} orientation="vertical" indicatorPosition="separated" onStepClick={setActive}>
            <Step step={0} label="Account" description="Basic details" />
            <Step step={1} label="Profile" description="About you" />
            <Step step={2} label="Settings" description="Preferences" />
            <Step step={3} label="Review" description="Confirm details" />
          </Stepper>
        </div>
        <div style={{
        maxWidth: 280
      }}>
          <Text type="label">on-track</Text>
          <Stepper activeStep={active} orientation="vertical" indicatorPosition="on-track" onStepClick={setActive}>
            <Step step={0} label="Account" description="Basic details" />
            <Step step={1} label="Profile" description="About you" />
            <Step step={2} label="Settings" description="Preferences" />
            <Step step={3} label="Review" description="Confirm details" />
          </Stepper>
        </div>
      </div>;
  }
}`,...st.parameters?.docs?.source}}},ct.parameters={...ct.parameters,docs:{...ct.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Status Colors',
  render: () => {
    const [active, setActive] = useState(3);
    return <div style={{
      maxWidth: 400
    }}>
        <Stepper activeStep={active} orientation="vertical" indicatorPosition="on-track" onStepClick={setActive}>
          <Step step={0} label="Email verified" description="alice@example.com" status="success" />
          <Step step={1} label="Phone verified" description="+1 (555) 012-3456" status="success" />
          <Step step={2} label="Identity document" description="Passport upload failed" status="error" />
          <Step step={3} label="Address verification" description="Pending review" status="accent" />
          <Step step={4} label="Background check" isOptional />
          <Step step={5} label="Account activated" />
        </Stepper>
      </div>;
  }
}`,...ct.parameters?.docs?.source}}},lt.parameters={...lt.parameters,docs:{...lt.parameters?.docs,source:{originalSource:`{
  name: 'On-Track — Horizontal, Many Steps',
  render: () => {
    const [active, setActive] = useState(3);
    return <Stepper activeStep={active} orientation="horizontal" indicatorPosition="on-track" onStepClick={setActive}>
        <Step step={0} label="Idea" indicator="number" />
        <Step step={1} label="Design" indicator="number" />
        <Step step={2} label="Build" indicator="number" />
        <Step step={3} label="Test" indicator="number" />
        <Step step={4} label="Review" indicator="number" />
        <Step step={5} label="Deploy" indicator="number" />
        <Step step={6} label="Monitor" indicator="number" />
      </Stepper>;
  }
}`,...lt.parameters?.docs?.source}}},ut.parameters={...ut.parameters,docs:{...ut.parameters?.docs,source:{originalSource:`{
  name: 'Slots — endContent (trailing badges)',
  render: () => {
    const [active, setActive] = useState(2);
    return <div style={{
      maxWidth: 440
    }}>
        <Stepper activeStep={active} orientation="vertical" onStepClick={setActive}>
          <Step step={0} label="Draft" description="Written 2 days ago" endContent={<Badge variant="success" label="Done" />} />
          <Step step={1} label="Review" description="2 approvals required" endContent={<Badge variant="info" label="2 pending" />} />
          <Step step={2} label="Publish" description="Scheduled for Monday" endContent={<Badge variant="warning" label="Blocked" />} />
          <Step step={3} label="Archive" />
        </Stepper>
      </div>;
  }
}`,...ut.parameters?.docs?.source}}},ft.parameters={...ft.parameters,docs:{...ft.parameters?.docs,source:{originalSource:`{
  name: 'Customization — xstyle + accessible label',
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 520
    }}>
        <Stepper activeStep={active} orientation="horizontal" onStepClick={setActive} label="Checkout progress" xstyle={xstyles.padded}>
          <Step step={0} label="Cart" indicator="number" />
          <Step step={1} label="Shipping" indicator="number" />
          <Step step={2} label="Payment" indicator="number" />
          <Step step={3} label="Confirm" indicator="number" />
        </Stepper>
      </div>;
  }
}`,...ft.parameters?.docs?.source}}},pt.parameters={...pt.parameters,docs:{...pt.parameters?.docs,source:{originalSource:`{
  name: 'Motion — Step Advance',
  render: () => {
    // One change animates the connector: advancing a single step. Clicking the
    // next number along grows the fill across the span it just covered;
    // clicking anything else — further ahead, or back — lands at once. Both
    // halves of the rule are worth seeing next to each other, which is what
    // this story is for. All four layouts share one activeStep so the same
    // change can be compared across them, and the buttons reach further than
    // clicking the steps themselves makes convenient.
    const [active, setActive] = useState(0);
    const labels = ['Cart', 'Shipping', 'Payment', 'Review', 'Confirm'];
    // A vertical on-track step carrying content draws a third segment down the
    // side of the slot, so the span leaving it is stitched from three pieces
    // rather than two — the case most likely to show a seam.
    const stepsFor = (withContent: boolean) => <>
        {labels.map((label, i) => <Step key={label} step={i} label={label} indicator="number">
            {withContent && i === 2 ? <Text type="body">Applied at checkout.</Text> : null}
          </Step>)}
      </>;
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }}>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
          <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}>
            <Text type="label">Jump to</Text>
            {labels.map((label, i) => <Button key={label} label={\`\${i}\`} variant={i === active ? 'primary' : 'secondary'} onClick={() => setActive(i)} />)}
          </div>
          <Text type="body">
            Advancing one step animates the fill. Jumping further ahead, and
            every move backwards, lands at once.
          </Text>
        </div>
        <div style={{
        display: 'flex',
        gap: 48,
        flexWrap: 'wrap'
      }}>
          {(['separated', 'on-track'] as const).map(position => <div key={position} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
              <div style={{
            width: 460
          }}>
                <Text type="label">{position}, horizontal</Text>
                <Stepper activeStep={active} orientation="horizontal" indicatorPosition={position} onStepClick={setActive} data-testid={\`h-\${position}\`}>
                  {stepsFor(false)}
                </Stepper>
              </div>
              <div style={{
            width: 460
          }}>
                <Text type="label">
                  {position}, vertical (step 3 has content)
                </Text>
                <Stepper activeStep={active} orientation="vertical" indicatorPosition={position} onStepClick={setActive} data-testid={\`v-\${position}\`}>
                  {stepsFor(true)}
                </Stepper>
              </div>
            </div>)}
        </div>
      </div>;
  }
}`,...pt.parameters?.docs?.source}}},mt.parameters={...mt.parameters,docs:{...mt.parameters?.docs,source:{originalSource:`{
  name: 'Narrow — Collapsed Track',
  parameters: {
    docs: {
      description: {
        story: "A horizontal stepper measures its own width and collapses once a step has less than \`horizontalOptions.minimumStepWidth\` pixels (112 by default), so the breakpoint follows the step count rather than the viewport. \`horizontalOptions.collapsedVariant\` selects \`'withLabelAndControls'\`, \`'withLabel'\`, or \`'hiddenLabel'\`; the last renders only the bare progress track with no compact row. The two indicator positions collapse differently on purpose: \`separated\` drops its indicators with the labels and repeats the active indicator beside the compact label, while \`on-track\` keeps its indicators as presentational nodes on the rail and does not repeat the active one beside the label. Controls appear only for \`withLabelAndControls\` when \`onStepClick\` is set."
      }
    }
  },
  render: () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);
    const [c, setC] = useState(1);
    const steps = ['Cart', 'Shipping', 'Delivery', 'Payment'];
    return <div style={{
      display: 'grid',
      gap: 40
    }}>
        <div style={{
        maxWidth: 560
      }}>
          <Text type="label">560px — four steps still fit</Text>
          <Stepper activeStep={a} onStepClick={setA} label="Checkout">
            {steps.map((s, i) => <Step key={s} step={i} label={s} />)}
          </Stepper>
        </div>
        <div style={{
        maxWidth: 320
      }}>
          <Text type="label">320px — separated, navigable</Text>
          <Stepper activeStep={a} onStepClick={setA} label="Checkout">
            {steps.map((s, i) => <Step key={s} step={i} label={s} />)}
          </Stepper>
        </div>
        <div style={{
        maxWidth: 320
      }}>
          <Text type="label">320px — custom 64px threshold stays expanded</Text>
          <Stepper activeStep={a} onStepClick={setA} horizontalOptions={{
          minimumStepWidth: 64,
          collapsedVariant: 'withLabelAndControls'
        }} label="Checkout">
            {steps.map((s, i) => <Step key={s} step={i} label={s} />)}
          </Stepper>
        </div>
        <div style={{
        maxWidth: 320
      }}>
          <Text type="label">320px — on-track keeps nodes on the rail</Text>
          <Stepper activeStep={b} onStepClick={setB} indicatorPosition="on-track" label="Checkout">
            {steps.map((s, i) => <Step key={s} step={i} label={s} indicator="number" />)}
          </Stepper>
        </div>
        <div style={{
        maxWidth: 320
      }}>
          <Text type="label">320px — no onStepClick, so no controls</Text>
          <Stepper activeStep={c} label="Checkout">
            {steps.map((s, i) => <Step key={s} step={i} label={s} />)}
          </Stepper>
          <div style={{
          marginTop: 12,
          display: 'flex',
          gap: 8
        }}>
            <Button label="Back" variant="secondary" onClick={() => setC(n => Math.max(0, n - 1))} />
            <Button label="Continue" onClick={() => setC(n => Math.min(3, n + 1))} />
          </div>
        </div>
        <div style={{
        maxWidth: 320
      }}>
          <Text type="label">
            320px — a description rides along with the current step
          </Text>
          <Stepper activeStep={a} onStepClick={setA} label="Checkout">
            <Step step={0} label="Cart" description="Review your items" />
            <Step step={1} label="Shipping" description="Where it goes" />
            <Step step={2} label="Delivery" description="How fast" />
            <Step step={3} label="Payment" description="How you pay" />
          </Stepper>
        </div>
      </div>;
  }
}`,...mt.parameters?.docs?.source}}},ht.parameters={...ht.parameters,docs:{...ht.parameters?.docs,source:{originalSource:`{
  name: 'Narrow — Collapsed Variants',
  parameters: {
    docs: {
      description: {
        story: 'The same 320px horizontal Stepper with each collapsedVariant. hiddenLabel omits the entire compact row—even though onStepClick is present—so it is shorter and leaves only the progress track.'
      }
    }
  },
  render: () => {
    const [active, setActive] = useState(1);
    const steps = ['Cart', 'Shipping', 'Delivery', 'Payment'];
    const variants = [{
      value: 'withLabelAndControls',
      label: 'withLabelAndControls — label and controls'
    }, {
      value: 'withLabel',
      label: 'withLabel — label only'
    }, {
      value: 'hiddenLabel',
      label: 'hiddenLabel — bare track'
    }] as const;
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))',
      alignItems: 'start',
      gap: 40
    }}>
        {variants.map(variant => <div key={variant.value} style={{
        width: '100%',
        maxWidth: 320
      }}>
            <Text type="label">{variant.label}</Text>
            <Stepper activeStep={active} onStepClick={setActive} label="Checkout" horizontalOptions={{
          minimumStepWidth: 112,
          collapsedVariant: variant.value
        }}>
              {steps.map((step, index) => <Step key={step} step={index} label={step} />)}
            </Stepper>
          </div>)}
      </div>;
  }
}`,...ht.parameters?.docs?.source}}},gt.parameters={...gt.parameters,docs:{...gt.parameters?.docs,source:{originalSource:`{
  name: 'Fragment-Grouped Steps',
  render: () => {
    const steps = <>
        <Step step={0} label="Cart" indicator="number" />
        <Step step={1} label="Shipping" indicator="number" />
        <Step step={2} label="Payment" indicator="number" />
        <Step step={3} label="Review" indicator="number" />
      </>;
    return <div style={{
      display: 'grid',
      gap: 40,
      maxWidth: 700
    }}>
        <div>
          <Text type="label">Steps passed directly</Text>
          <Stepper activeStep={2} indicatorPosition="on-track">
            <Step step={0} label="Cart" indicator="number" />
            <Step step={1} label="Shipping" indicator="number" />
            <Step step={2} label="Payment" indicator="number" />
            <Step step={3} label="Review" indicator="number" />
          </Stepper>
        </div>
        <div>
          <Text type="label">Same steps grouped in a fragment</Text>
          <Stepper activeStep={2} indicatorPosition="on-track">
            {steps}
          </Stepper>
        </div>
        <div>
          <Text type="label">Fragment-grouped, vertical</Text>
          <Stepper activeStep={2} orientation="vertical" indicatorPosition="on-track">
            {steps}
          </Stepper>
        </div>
      </div>;
  }
}`,...gt.parameters?.docs?.source}}},_t=`Default.DefaultHorizontal.NumberedVertical.NumberedHorizontal.StatusVertical.StatusAllStates.MinimalVertical.MinimalHorizontal.IndicatorComparison.WithContentSlot.ContentSlotAlignment.DensityComparison.TwoSteps.ManySteps.DisabledSteps.OptionalSteps.LongLabels.OnTrackVertical.OnTrackGapInLayer.OnTrackHorizontal.OnTrackVerticalDescriptions.OnTrackHorizontalDescriptions.OnTrackComparison.OnTrackStatus.OnTrackHorizontalManySteps.EndContent.CustomXStyle.StepAdvance.NarrowCollapse.NarrowCollapsedVariants.FragmentGroupedSteps`.split(`.`)})))()}vt();export{Xe as ContentSlotAlignment,ft as CustomXStyle,Be as Default,Ve as DefaultHorizontal,Ze as DensityComparison,et as DisabledSteps,ut as EndContent,gt as FragmentGroupedSteps,Je as IndicatorComparison,$ as LongLabels,$e as ManySteps,qe as MinimalHorizontal,Ke as MinimalVertical,mt as NarrowCollapse,ht as NarrowCollapsedVariants,Ue as NumberedHorizontal,He as NumberedVertical,st as OnTrackComparison,rt as OnTrackGapInLayer,it as OnTrackHorizontal,ot as OnTrackHorizontalDescriptions,lt as OnTrackHorizontalManySteps,ct as OnTrackStatus,nt as OnTrackVertical,at as OnTrackVerticalDescriptions,tt as OptionalSteps,Ge as StatusAllStates,We as StatusVertical,pt as StepAdvance,Qe as TwoSteps,Ye as WithContentSlot,_t as __namedExportsOrder,ze as default};