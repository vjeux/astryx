import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{_ as r,d as i}from"./useIsHydrating-BD37vgNd.js";import{n as a,t as o}from"./Text-C5BHw0wv.js";import{n as s,t as c}from"./Button-DoGM0DEN.js";import{n as l,t as u}from"./Heading-YiIeUtHm.js";import{r as ee,t as d}from"./BottomSheet-C2AuUW1O.js";import{n as te,t as f}from"./Divider-DkevuVb8.js";import{n as ne,t as re}from"./Popover-CgJiFJLM.js";import{n as ie,t as p}from"./Dialog-ohVvtWtq.js";import{n as m,t as ae}from"./DialogHeader-BKo6d-E-.js";import{n as oe,t as h}from"./VStack-SWtDePqc.js";import{n as se,t as g}from"./Section-g5hpGOnN.js";import{i as ce,n as le,r as ue,t as _}from"./CheckboxListItem-DvDdmg8P.js";import{n as de,t as v}from"./CheckboxInput-CnJ0nBRn.js";import{n as fe,t as pe}from"./ScrollableArea-oHV1-XbU.js";import{n as me,t as y}from"./TextInput-LGxpinPt.js";import{n as he,t as b}from"./TextArea-Duz5jgSr.js";function ge({onPost:e}){let[t,n]=(0,S.useState)({title:``,author:``,email:``,team:``,project:``,relatedTask:``,summary:``,context:``,changes:``,followUp:``,comment:``}),r=e=>t=>n(n=>({...n,[e]:t}));return(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Add a comment`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Keep the Tall sheet fully expanded, then focus fields near the beginning, middle, and end. The outer sheet remains stationary while its body scrolls each control above the mobile keyboard. Drag it down to the half-height stop and the accommodation stops — only a fully expanded Tall sheet provides it — then drag back up and it resumes.`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Move the sheet with its handle or close it with Post comment to verify that sheet travel and closing dismiss the keyboard.`}),(0,C.jsx)(f,{}),(0,C.jsx)(y,{label:`Title`,value:t.title,onChange:r(`title`)}),(0,C.jsx)(y,{label:`Author`,value:t.author,onChange:r(`author`)}),(0,C.jsx)(y,{label:`Email`,type:`email`,value:t.email,onChange:r(`email`)}),(0,C.jsx)(y,{label:`Team`,value:t.team,onChange:r(`team`)}),(0,C.jsx)(y,{label:`Project`,value:t.project,onChange:r(`project`)}),(0,C.jsx)(y,{label:`Related task`,value:t.relatedTask,onChange:r(`relatedTask`)}),(0,C.jsx)(b,{label:`Summary`,rows:4,value:t.summary,onChange:r(`summary`)}),(0,C.jsx)(b,{label:`Context`,rows:6,value:t.context,onChange:r(`context`)}),(0,C.jsx)(b,{label:`What changed?`,rows:4,value:t.changes,onChange:r(`changes`)}),(0,C.jsx)(b,{label:`Suggested follow-up`,rows:4,value:t.followUp,onChange:r(`followUp`)}),(0,C.jsx)(b,{label:`Comment`,rows:8,value:t.comment,onChange:r(`comment`)}),(0,C.jsx)(c,{label:`Post comment`,onClick:e})]})}function _e({onDone:e}){let t=r();return(0,C.jsx)(c,{label:`Done`,onClick:()=>{t(`Saved`),e()}})}function x({change:e}){let[t,n]=(0,S.useState)(!1),[r,i]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>{i(!1),n(!0)}}),(0,C.jsx)(d,{isOpen:t,onOpenChange:n,label:`Exit focus`,children:(0,C.jsx)(g,{children:e===`remove`&&r?null:(0,C.jsx)(c,{label:`Done`,onClick:()=>{n(!1),window.setTimeout(()=>i(!0),100)},isDisabled:e===`disable`&&r})})})]})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{S=t(),ee(),ie(),m(),i(),fe(),s(),te(),l(),se(),oe(),a(),me(),he(),de(),ce(),le(),ne(),C=n(),{expect:w,waitFor:T,within:E}=__STORYBOOK_MODULE_TEST__,D={title:`Core/BottomSheet`,component:d,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`560px`}}},decorators:[e=>(0,C.jsx)(`div`,{style:{minHeight:480,padding:32},children:(0,C.jsx)(e,{})})]},O={args:{isOpen:!0,label:`Reading details`,height:`capped`,children:(0,C.jsx)(g,{children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:2,children:`Reading details`}),Array.from({length:16},(e,t)=>(0,C.jsxs)(o,{children:[`Paragraph `,t+1,`. This sheet contains plain text. Use Tab to reach the scrolling area, then Arrow Down or Page Down to read the remaining content. Escape closes the sheet.`]},t))]})})},render:e=>{let t=e,[n,r]=(0,S.useState)(!0);return(0,C.jsx)(d,{padding:0,...t,isOpen:n,onOpenChange:r})},play:async({canvasElement:e})=>{let t=E(e).getByRole(`group`,{name:`Reading details`});await T(()=>{w(t).toHaveAttribute(`data-scrollable-block`,`true`),w(t).toHaveAttribute(`tabindex`,`0`)})}},k={...O,args:{...O.args,label:`Short details`,children:(0,C.jsx)(g,{children:(0,C.jsx)(o,{children:`This content fits without a separate keyboard scroll stop.`})})},play:async({canvasElement:e})=>{let t=E(e).getByRole(`group`,{name:`Short details`});await T(()=>{w(t).not.toHaveAttribute(`data-scrollable-block`),w(t).not.toHaveAttribute(`tabindex`)})}},A={args:{isOpen:!0,label:`Order summary`,height:`hug`,padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:2,children:`Order summary`}),(0,C.jsx)(o,{children:`This content has no wrapper of its own. The sheet supplies the inset, exactly as Dialog does.`}),(0,C.jsx)(f,{isFullBleed:!0}),(0,C.jsx)(o,{color:`secondary`,children:`The divider above escapes the inset and spans the sheet.`})]})},render:e=>{let t=e,[n,r]=(0,S.useState)(!0);return(0,C.jsx)(d,{...t,isOpen:n,onOpenChange:r})}},j={render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(!1),[i,a]=(0,S.useState)(!1),[o,s]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Filters`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Filters`}),(0,C.jsx)(f,{}),(0,C.jsxs)(ue,{label:`Filters`,isLabelHidden:!0,children:[(0,C.jsx)(_,{label:`In stock`,isChecked:n,onCheck:r}),(0,C.jsx)(_,{label:`On sale`,isChecked:i,onCheck:a}),(0,C.jsx)(_,{label:`Free shipping`,isChecked:o,onCheck:s})]}),(0,C.jsx)(c,{label:`Apply`,onClick:()=>t(!1)})]})})})]})}},M={name:`Sheet over a Dialog`,render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open dialog`,onClick:()=>t(!0)}),(0,C.jsx)(p,{isOpen:e,onOpenChange:t,"aria-label":`Edit item`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(ae,{title:`Edit item`,onOpenChange:t}),(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>r(!0)}),(0,C.jsx)(d,{isOpen:n,onOpenChange:r,label:`Options`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Options`}),(0,C.jsx)(v,{label:`Notify me`,value:!1}),(0,C.jsx)(_e,{onDone:()=>r(!1)})]})})})]})})})]})}},N={name:`Form purpose`,render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Edit profile`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,purpose:`form`,label:`Edit profile`,height:`hug`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Edit profile`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Swiping down or clicking the scrim keeps this form open. Escape and the explicit actions can still close it.`}),(0,C.jsx)(c,{label:`Save changes`,onClick:()=>t(!1)})]})})})]})}},P={render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open nearby places`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Nearby places`,height:`tall`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`A Tall sheet fills most of the viewport and scrolls its content. It has no snap points, so a drag springs back; flick down to dismiss. Escape also dismisses.`}),(0,C.jsx)(f,{}),Array.from({length:12},(e,t)=>(0,C.jsxs)(h,{gap:1,children:[(0,C.jsxs)(o,{type:`label`,children:[`Place `,t+1]}),(0,C.jsxs)(o,{type:`supporting`,color:`secondary`,children:[(.2+t*.3).toFixed(1),` mi away`]})]},t))]})})})]})}},F={render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open nearby places`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Nearby places`,height:`tall`,snapPoints:[.5],children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`One extra stop, at half the viewport. Drag the handle down to collapse the sheet, then back up — the list keeps its scroll position. Flick down to dismiss.`}),(0,C.jsx)(f,{}),Array.from({length:12},(e,t)=>(0,C.jsxs)(h,{gap:1,children:[(0,C.jsxs)(o,{type:`label`,children:[`Place `,t+1]}),(0,C.jsxs)(o,{type:`supporting`,color:`secondary`,children:[(.2+t*.3).toFixed(1),` mi away`]})]},t))]})})})]})}},I={render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open route`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Route`,height:`tall`,snapPoints:[`96px`,`50%`],children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(u,{level:3,children:`To Ferry Building`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Three stops: full, half the viewport, and a 96px peek. The half stop is a working surface — content laid out, scrim full. The peek is a glance: the sheet slides away rather than reflowing into a sliver, and the scrim thins.`}),(0,C.jsx)(f,{}),Array.from({length:10},(e,t)=>(0,C.jsxs)(h,{gap:1,children:[(0,C.jsxs)(o,{type:`label`,children:[`Step `,t+1]}),(0,C.jsxs)(o,{type:`supporting`,color:`secondary`,children:[`Continue for `,(.1+t*.4).toFixed(1),` mi`]})]},t))]})})})]})}},L={render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(0);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(u,{level:3,children:`Live page behind the overlay`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`A scrim is the semi-transparent overlay that covers and blocks the background. This example has no scrim, so the page stays visible and interactive. Open the sheet, then tap the counter below.`}),(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>t(!0)}),(0,C.jsx)(c,{label:`Background clicks: ${n}`,onClick:()=>r(e=>e+1)})]}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Nearby places`,hasScrim:!1,height:`capped`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(u,{level:3,children:`No scrim`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`This is still an overlay, not inline content. The page behind stays live. Drag the handle to resize, flick down to dismiss, or press Escape while focus is here.`}),(0,C.jsx)(f,{}),Array.from({length:8},(e,t)=>(0,C.jsxs)(h,{gap:1,children:[(0,C.jsxs)(o,{type:`label`,children:[`Place `,t+1]}),(0,C.jsxs)(o,{type:`supporting`,color:`secondary`,children:[(.2+t*.3).toFixed(1),` mi away`]})]},t))]})})})]})}},R={render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Share page`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Share page`,height:`hug`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Share page`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`The sheet fits its content, up to 92% of the viewport.`}),(0,C.jsx)(f,{}),(0,C.jsx)(c,{label:`Copy link`}),(0,C.jsx)(c,{label:`Send in Messenger`}),(0,C.jsx)(c,{label:`Save for later`}),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},z={name:`Caller height (500 px)`,render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open 500 px sheet`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Caller height`,style:{height:500},children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Caller height`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`The caller sets this sheet's height to 500 px.`}),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},B={sheet:{kZKoxP:`x1egiwwb`,$$css:!0}},V={name:`Caller height through xstyle (500 px)`,render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open 500 px xstyle sheet`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Caller height through xstyle`,xstyle:B.sheet,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Caller height through xstyle`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`The caller sets this sheet's height to 500 px through xstyle.`}),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},H={name:`Hug height — Long content`,render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`View release notes`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Release notes`,height:`hug`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Release notes`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`The sheet hugs its content until it reaches 92% of the viewport, then the content scrolls within the sheet. Drag it to a snap point and the scrolling area resizes to the height you can actually see — except at the shortest peek, which slides below the viewport at full height rather than reflowing to a sliver.`}),(0,C.jsx)(f,{}),Array.from({length:12},(e,t)=>(0,C.jsxs)(h,{gap:1,children:[(0,C.jsxs)(o,{type:`label`,children:[`Update `,t+1]}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`A summary of the improvements, fixes, and other changes in this update.`})]},t)),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},U={name:`Capped height — Long content`,render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`View saved places`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Saved places`,height:`capped`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:3,children:`Saved places`}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`The sheet opens at a capped height while the long list scrolls within it.`}),(0,C.jsx)(f,{}),Array.from({length:12},(e,t)=>(0,C.jsxs)(h,{gap:1,children:[(0,C.jsxs)(o,{type:`label`,children:[`Saved place `,t+1]}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Notes and details about this saved place.`})]},t)),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},W={name:`Mobile keyboard`,render:()=>{let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Add a comment`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Add a comment`,height:`tall`,snapPoints:[.5],children:(0,C.jsx)(g,{padding:4,children:(0,C.jsx)(ge,{onPost:()=>t(!1)})})})]})}},G={render:()=>{let[e,t]=(0,S.useState)(`button`),[n,r]=(0,S.useState)(!0),[i,a]=(0,S.useState)(!1),s=(0,C.jsx)(c,{label:`First action`,onClick:()=>{}}),l;switch(e){case`text`:l=(0,C.jsx)(o,{children:`Read the details below.`});break;case`link`:l=(0,C.jsx)(c,{label:`First link`,href:`#reading-end`});break;case`input`:l=(0,C.jsx)(y,{label:`First input`,value:``,onChange:()=>{}});break;case`nested`:l=(0,C.jsxs)(pe,{label:`Nested reading`,height:100,children:[s,(0,C.jsx)(`div`,{className:`x1m3v4wt`,children:`Nested content`})]});break;case`native-scroll`:l=(0,C.jsxs)(`div`,{className:`xysyzu8 xpyat2d`,children:[s,(0,C.jsx)(`div`,{className:`x1m3v4wt`,children:`Nested content`})]});break;case`disabled`:l=(0,C.jsx)(c,{label:`First action`,isDisabled:!0});break;case`button`:l=s;break;default:l=(0,C.jsx)(`div`,{role:e,children:s})}return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`label`,{children:[`Content case`,(0,C.jsx)(`select`,{value:e,onChange:e=>t(e.target.value),children:[`button`,`link`,`text`,`input`,`disabled`,`nested`,`native-scroll`,`radiogroup`,`slider`,`combobox`,`listbox`,`menu`,`grid`,`tree`,`tablist`,`toolbar`].map(e=>(0,C.jsx)(`option`,{value:e,children:e},e))})]}),(0,C.jsx)(c,{label:`Before sheet`,onClick:()=>r(!0)}),(0,C.jsx)(c,{label:`Toggle modal`,onClick:()=>a(e=>!e)}),(0,C.jsx)(d,{label:`Keyboard reading`,isOpen:n,onOpenChange:r,hasScrim:i,height:`capped`,children:(0,C.jsx)(g,{children:(0,C.jsxs)(h,{gap:4,children:[(0,C.jsx)(u,{level:2,children:`Keyboard reading`}),l,Array.from({length:24},(e,t)=>(0,C.jsxs)(o,{children:[`Paragraph `,t+1,`. Use Arrow or Page keys to read the full content. The sheet keeps native scrolling after keyboard entry.`]},t)),e!==`text`&&e!==`disabled`&&(0,C.jsx)(c,{label:`Last action`,onClick:()=>{}}),(0,C.jsx)(o,{id:`reading-end`,children:`End of reading`})]})})},i?`modal`:`nonmodal`),(0,C.jsx)(c,{label:`After sheet`,onClick:()=>{}})]})}},K={render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(!1),[i,a]=(0,S.useState)(`info`);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`label`,{children:[`Sheet purpose`,(0,C.jsx)(`select`,{value:i,onChange:e=>a(e.target.value),children:[`info`,`form`,`required`].map(e=>(0,C.jsx)(`option`,{value:e,children:e},e))})]}),(0,C.jsx)(v,{label:`Show scrim`,value:n,onChange:r}),(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>t(!0)}),(0,C.jsxs)(d,{label:`Reference`,isOpen:e,onOpenChange:t,hasScrim:n,purpose:i,height:`tall`,snapPoints:[`96px`,`50%`],padding:6,children:[(0,C.jsx)(re,{label:`Details`,hasAutoFocus:!1,content:(0,C.jsx)(`p`,{children:`Nested information`}),children:(0,C.jsx)(c,{label:`About`})}),(0,C.jsx)(c,{label:`Close sheet`,onClick:()=>t(!1)})]})]})}},q={name:`No scrim with a data-autofocus field`,render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(``);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Filter places`,hasScrim:!1,height:`hug`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(y,{label:`Search`,value:n,onChange:r,hasAutoFocus:!0}),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},J={name:`Modal with a data-autofocus field`,render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(``);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{label:`Open sheet`,onClick:()=>t(!0)}),(0,C.jsx)(d,{isOpen:e,onOpenChange:t,label:`Edit note`,height:`hug`,children:(0,C.jsx)(g,{padding:4,children:(0,C.jsxs)(h,{gap:3,children:[(0,C.jsx)(y,{label:`Note`,value:n,onChange:r,hasAutoFocus:!0}),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})})]})}},Y={tags:[`!autodocs`],render:()=>(0,C.jsx)(x,{change:`remove`})},X={tags:[`!autodocs`],render:()=>(0,C.jsx)(x,{change:`disable`})},Z={render:()=>{let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(!0);return(0,C.jsxs)(h,{gap:2,children:[(0,C.jsx)(v,{label:`Modal (scrim)`,value:n,onChange:r}),(0,C.jsx)(c,{label:`Edit filters`,onClick:()=>t(!0)}),e&&(0,C.jsx)(d,{isOpen:!0,onOpenChange:t,hasScrim:n,label:`Filters`,children:(0,C.jsxs)(h,{gap:2,children:[(0,C.jsx)(o,{children:`Removing this sheet while it is open returns focus.`}),(0,C.jsx)(c,{label:`Done`,onClick:()=>t(!1)})]})})]})}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    label: 'Reading details',
    height: 'capped',
    children: <Section>
        <VStack gap={4}>
          <Heading level={2}>Reading details</Heading>
          {Array.from({
          length: 16
        }, (_, index) => <Text key={index}>
              Paragraph {index + 1}. This sheet contains plain text. Use Tab to
              reach the scrolling area, then Arrow Down or Page Down to read the
              remaining content. Escape closes the sheet.
            </Text>)}
        </VStack>
      </Section>
  },
  render: args => {
    const standaloneArgs = args as StandaloneBottomSheetStoryProps;
    const [isOpen, setIsOpen] = useState(true);
    return <BottomSheet padding={0} {...standaloneArgs} isOpen={isOpen} onOpenChange={setIsOpen} />;
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement).getByRole('group', {
      name: 'Reading details'
    });
    await waitFor(() => {
      expect(body).toHaveAttribute('data-scrollable-block', 'true');
      expect(body).toHaveAttribute('tabindex', '0');
    });
  }
}`,...O.parameters?.docs?.source},description:{story:`Keep this sheet open so the accessibility audit inspects its scroll body.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  ...TextOnly,
  args: {
    ...TextOnly.args,
    label: 'Short details',
    children: <Section>
        <Text>This content fits without a separate keyboard scroll stop.</Text>
      </Section>
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement).getByRole('group', {
      name: 'Short details'
    });
    await waitFor(() => {
      expect(body).not.toHaveAttribute('data-scrollable-block');
      expect(body).not.toHaveAttribute('tabindex');
    });
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    label: 'Order summary',
    height: 'hug',
    padding: 4,
    children: <VStack gap={4}>
        <Heading level={2}>Order summary</Heading>
        <Text>
          This content has no wrapper of its own. The sheet supplies the inset,
          exactly as Dialog does.
        </Text>
        <Divider isFullBleed />
        <Text color="secondary">
          The divider above escapes the inset and spans the sheet.
        </Text>
      </VStack>
  },
  render: args => {
    const standaloneArgs = args as StandaloneBottomSheetStoryProps;
    const [isOpen, setIsOpen] = useState(true);
    return <BottomSheet {...standaloneArgs} isOpen={isOpen} onOpenChange={setIsOpen} />;
  }
}`,...A.parameters?.docs?.source},description:{story:`Content placed directly in a sheet. The sheet pads it like Dialog, by
default or at the \`padding\` step given here, and a full-bleed Divider
reaches the sheet's edges because the content box publishes its inset.
\`padding={0}\` removes the padding; the content still starts below the grab
bar's band.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const [freeShipping, setFreeShipping] = useState(false);
    return <>
        <Button label="Open sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Filters">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Filters</Heading>
              <Divider />
              <CheckboxList label="Filters" isLabelHidden>
                <CheckboxListItem label="In stock" isChecked={inStock} onCheck={setInStock} />
                <CheckboxListItem label="On sale" isChecked={onSale} onCheck={setOnSale} />
                <CheckboxListItem label="Free shipping" isChecked={freeShipping} onCheck={setFreeShipping} />
              </CheckboxList>
              <Button label="Apply" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Sheet over a Dialog',
  render: () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    return <>
        <Button label="Open dialog" onClick={() => setIsDialogOpen(true)} />
        <Dialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} aria-label="Edit item">
          <Section padding={4}>
            <VStack gap={4}>
              <DialogHeader title="Edit item" onOpenChange={setIsDialogOpen} />
              <Button label="Open sheet" onClick={() => setIsSheetOpen(true)} />
              <BottomSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} label="Options">
                <Section padding={4}>
                  <VStack gap={4}>
                    <Heading level={3}>Options</Heading>
                    <CheckboxInput label="Notify me" value={false} />
                    <SaveAndDone onDone={() => setIsSheetOpen(false)} />
                  </VStack>
                </Section>
              </BottomSheet>
            </VStack>
          </Section>
        </Dialog>
      </>;
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Form purpose',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Edit profile" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} purpose="form" label="Edit profile" height="hug">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Edit profile</Heading>
              <Text type="supporting" color="secondary">
                Swiping down or clicking the scrim keeps this form open. Escape
                and the explicit actions can still close it.
              </Text>
              <Button label="Save changes" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open nearby places" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Nearby places" height="tall">
          <Section padding={4}>
            <VStack gap={3}>
              <Text type="supporting" color="secondary">
                A Tall sheet fills most of the viewport and scrolls its content.
                It has no snap points, so a drag springs back; flick down to
                dismiss. Escape also dismisses.
              </Text>
              <Divider />
              {Array.from({
              length: 12
            }, (_, i) => <VStack key={i} gap={1}>
                  <Text type="label">Place {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    {(0.2 + i * 0.3).toFixed(1)} mi away
                  </Text>
                </VStack>)}
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open nearby places" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Nearby places" height="tall" snapPoints={[0.5]}>
          <Section padding={4}>
            <VStack gap={3}>
              <Text type="supporting" color="secondary">
                One extra stop, at half the viewport. Drag the handle down to
                collapse the sheet, then back up — the list keeps its scroll
                position. Flick down to dismiss.
              </Text>
              <Divider />
              {Array.from({
              length: 12
            }, (_, i) => <VStack key={i} gap={1}>
                  <Text type="label">Place {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    {(0.2 + i * 0.3).toFixed(1)} mi away
                  </Text>
                </VStack>)}
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open route" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Route" height="tall" snapPoints={['96px', '50%']}>
          <Section padding={4}>
            <VStack gap={3}>
              <Heading level={3}>To Ferry Building</Heading>
              <Text type="supporting" color="secondary">
                Three stops: full, half the viewport, and a 96px peek. The half
                stop is a working surface — content laid out, scrim full. The
                peek is a glance: the sheet slides away rather than reflowing
                into a sliver, and the scrim thins.
              </Text>
              <Divider />
              {Array.from({
              length: 10
            }, (_, i) => <VStack key={i} gap={1}>
                  <Text type="label">Step {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    Continue for {(0.1 + i * 0.4).toFixed(1)} mi
                  </Text>
                </VStack>)}
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);
    return <>
        {/* A scrim is the semi-transparent layer that covers and blocks the
            background. With hasScrim={false}, this page stays interactive. */}
        <VStack gap={3}>
          <Heading level={3}>Live page behind the overlay</Heading>
          <Text type="supporting" color="secondary">
            A scrim is the semi-transparent overlay that covers and blocks the
            background. This example has no scrim, so the page stays visible and
            interactive. Open the sheet, then tap the counter below.
          </Text>
          <Button label="Open sheet" onClick={() => setIsOpen(true)} />
          <Button label={\`Background clicks: \${count}\`} onClick={() => setCount(c => c + 1)} />
        </VStack>
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Nearby places" hasScrim={false} height="capped">
          <Section padding={4}>
            <VStack gap={3}>
              <Heading level={3}>No scrim</Heading>
              <Text type="supporting" color="secondary">
                This is still an overlay, not inline content. The page behind
                stays live. Drag the handle to resize, flick down to dismiss, or
                press Escape while focus is here.
              </Text>
              <Divider />
              {Array.from({
              length: 8
            }, (_, i) => <VStack key={i} gap={1}>
                  <Text type="label">Place {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    {(0.2 + i * 0.3).toFixed(1)} mi away
                  </Text>
                </VStack>)}
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Share page" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Share page" height="hug">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Share page</Heading>
              <Text type="supporting" color="secondary">
                The sheet fits its content, up to 92% of the viewport.
              </Text>
              <Divider />
              <Button label="Copy link" />
              <Button label="Send in Messenger" />
              <Button label="Save for later" />
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Caller height (500 px)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open 500 px sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Caller height" style={{
        height: 500
      }}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Caller height</Heading>
              <Text type="supporting" color="secondary">
                The caller sets this sheet's height to 500 px.
              </Text>
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...z.parameters?.docs?.source},description:{story:`A sheet whose height the caller sets. It keeps a 48 px surface below the
screen, so a pull past the top stretches it at most that far.`,...z.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Caller height through xstyle (500 px)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open 500 px xstyle sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Caller height through xstyle" xstyle={callerHeightStyles.sheet}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Caller height through xstyle</Heading>
              <Text type="supporting" color="secondary">
                The caller sets this sheet's height to 500 px through xstyle.
              </Text>
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Hug height — Long content',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="View release notes" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Release notes" height="hug">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Release notes</Heading>
              <Text type="supporting" color="secondary">
                The sheet hugs its content until it reaches 92% of the viewport,
                then the content scrolls within the sheet. Drag it to a snap
                point and the scrolling area resizes to the height you can
                actually see — except at the shortest peek, which slides below
                the viewport at full height rather than reflowing to a sliver.
              </Text>
              <Divider />
              {Array.from({
              length: 12
            }, (_, i) => <VStack key={i} gap={1}>
                  <Text type="label">Update {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    A summary of the improvements, fixes, and other changes in
                    this update.
                  </Text>
                </VStack>)}
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Capped height — Long content',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="View saved places" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Saved places" height="capped">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Saved places</Heading>
              <Text type="supporting" color="secondary">
                The sheet opens at a capped height while the long list scrolls
                within it.
              </Text>
              <Divider />
              {Array.from({
              length: 12
            }, (_, i) => <VStack key={i} gap={1}>
                  <Text type="label">Saved place {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    Notes and details about this saved place.
                  </Text>
                </VStack>)}
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Mobile keyboard',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Add a comment" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Add a comment" height="tall" snapPoints={[0.5]}>
          <Section padding={4}>
            <MobileKeyboardCommentForm onPost={() => setIsOpen(false)} />
          </Section>
        </BottomSheet>
      </>;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [variant, setVariant] = useState('button');
    const [isOpen, setIsOpen] = useState(true);
    const [hasScrim, setHasScrim] = useState(false);
    const action = <Button label="First action" onClick={() => {}} />;
    let first;
    switch (variant) {
      case 'text':
        first = <Text>Read the details below.</Text>;
        break;
      case 'link':
        first = <Button label="First link" href="#reading-end" />;
        break;
      case 'input':
        first = <TextInput label="First input" value="" onChange={() => {}} />;
        break;
      case 'nested':
        first = <ScrollableArea label="Nested reading" height={100}>
            {action}
            <div {...stylex.props(keyboardFixtureStyles.nestedContent)}>
              Nested content
            </div>
          </ScrollableArea>;
        break;
      case 'native-scroll':
        first = <div {...stylex.props(keyboardFixtureStyles.nestedViewport)}>
            {action}
            <div {...stylex.props(keyboardFixtureStyles.nestedContent)}>
              Nested content
            </div>
          </div>;
        break;
      case 'disabled':
        first = <Button label="First action" isDisabled />;
        break;
      case 'button':
        first = action;
        break;
      default:
        first = <div role={variant}>{action}</div>;
    }
    return <>
        <label>
          Content case
          <select value={variant} onChange={event => setVariant(event.target.value)}>
            {['button', 'link', 'text', 'input', 'disabled', 'nested', 'native-scroll', 'radiogroup', 'slider', 'combobox', 'listbox', 'menu', 'grid', 'tree', 'tablist', 'toolbar'].map(value => <option key={value} value={value}>
                {value}
              </option>)}
          </select>
        </label>
        <Button label="Before sheet" onClick={() => setIsOpen(true)} />
        <Button label="Toggle modal" onClick={() => setHasScrim(value => !value)} />
        <BottomSheet key={hasScrim ? 'modal' : 'nonmodal'} label="Keyboard reading" isOpen={isOpen} onOpenChange={setIsOpen} hasScrim={hasScrim} height="capped">
          <Section>
            <VStack gap={4}>
              <Heading level={2}>Keyboard reading</Heading>
              {first}
              {Array.from({
              length: 24
            }, (_, index) => <Text key={index}>
                  Paragraph {index + 1}. Use Arrow or Page keys to read the full
                  content. The sheet keeps native scrolling after keyboard
                  entry.
                </Text>)}
              {variant !== 'text' && variant !== 'disabled' && <Button label="Last action" onClick={() => {}} />}
              <Text id="reading-end">End of reading</Text>
            </VStack>
          </Section>
        </BottomSheet>
        <Button label="After sheet" onClick={() => {}} />
      </>;
  }
}`,...G.parameters?.docs?.source},description:{story:`Native content variants deliberately exercise the hook's delegation boundary.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrim, setHasScrim] = useState(false);
    const [purpose, setPurpose] = useState<'info' | 'form' | 'required'>('info');
    return <>
        <label>
          Sheet purpose
          <select value={purpose} onChange={event => setPurpose(event.target.value as 'info' | 'form' | 'required')}>
            {['info', 'form', 'required'].map(value => <option key={value} value={value}>
                {value}
              </option>)}
          </select>
        </label>
        <CheckboxInput label="Show scrim" value={hasScrim} onChange={setHasScrim} />
        <Button label="Open sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet label="Reference" isOpen={isOpen} onOpenChange={setIsOpen} hasScrim={hasScrim} purpose={purpose} height="tall" snapPoints={['96px', '50%']} padding={6}>
          <Popover label="Details" hasAutoFocus={false} content={<p>Nested information</p>}>
            <Button label="About" />
          </Popover>
          <Button label="Close sheet" onClick={() => setIsOpen(false)} />
        </BottomSheet>
      </>;
  }
}`,...K.parameters?.docs?.source},description:{story:`Escape closes only the top-most layer: a Popover opened inside the sheet first.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'No scrim with a data-autofocus field',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    return <>
        <Button label="Open sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Filter places" hasScrim={false} height="hug">
          <Section padding={4}>
            <VStack gap={3}>
              <TextInput label="Search" value={value} onChange={setValue} hasAutoFocus />
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...q.parameters?.docs?.source},description:{story:"A no-scrim sheet with a `data-autofocus` field: the field is focused when\nthe sheet opens, in every browser.",...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Modal with a data-autofocus field',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    return <>
        <Button label="Open sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Edit note" height="hug">
          <Section padding={4}>
            <VStack gap={3}>
              <TextInput label="Note" value={value} onChange={setValue} hasAutoFocus />
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>;
  }
}`,...J.parameters?.docs?.source},description:{story:"A modal sheet with a `data-autofocus` field (a TextInput with hasAutoFocus):\nthe field is focused when the sheet opens, in every browser.",...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: () => <ExitFocusChangeFixture change="remove" />
}`,...Y.parameters?.docs?.source},description:{story:`Browser fixture: Done closes the sheet, and 100 ms into the exit the Done
control is removed. The sheet goes inert and hidden as focus leaves it.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: () => <ExitFocusChangeFixture change="disable" />
}`,...X.parameters?.docs?.source},description:{story:`Browser fixture: Done closes the sheet, and 100 ms into the exit the Done
control is disabled. Focus stays on Done and returns to "Open sheet" when
the sheet closes (FR9).`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrim, setHasScrim] = useState(true);
    return <VStack gap={2}>
        <CheckboxInput label="Modal (scrim)" value={hasScrim} onChange={setHasScrim} />
        <Button label="Edit filters" onClick={() => setIsOpen(true)} />
        {isOpen && <BottomSheet isOpen onOpenChange={setIsOpen} hasScrim={hasScrim} label="Filters">
            <VStack gap={2}>
              <Text>Removing this sheet while it is open returns focus.</Text>
              <Button label="Done" onClick={() => setIsOpen(false)} />
            </VStack>
          </BottomSheet>}
      </VStack>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`A sheet rendered only while it is open. "Done" removes the sheet while it is
still open; focus returns to "Edit filters" (FR20).`,...Z.parameters?.docs?.description}}},Q=[`TextOnly`,`TextOnlyFitting`,`ContainerPadding`,`Showcase`,`SheetOverDialog`,`FormPurpose`,`TallSheet`,`SnapPoints`,`SnapPointsWithPeek`,`NoScrim`,`HugHeight`,`CallerHeight`,`CallerHeightXstyle`,`HugHeightWithLongContent`,`CappedHeightWithLongContent`,`MobileKeyboard`,`KeyboardDelegation`,`NestedPopover`,`NoScrimAutofocus`,`ModalAutofocus`,`ExitFocusControlRemoved`,`ExitFocusControlDisabled`,`RenderedWhileOpen`]})))()}$();export{z as CallerHeight,V as CallerHeightXstyle,U as CappedHeightWithLongContent,A as ContainerPadding,X as ExitFocusControlDisabled,Y as ExitFocusControlRemoved,N as FormPurpose,R as HugHeight,H as HugHeightWithLongContent,G as KeyboardDelegation,W as MobileKeyboard,J as ModalAutofocus,K as NestedPopover,L as NoScrim,q as NoScrimAutofocus,Z as RenderedWhileOpen,M as SheetOverDialog,j as Showcase,F as SnapPoints,I as SnapPointsWithPeek,P as TallSheet,O as TextOnly,k as TextOnlyFitting,Q as __namedExportsOrder,D as default};