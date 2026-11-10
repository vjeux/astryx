import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,o as i,r as a,s as ee}from"./useTheme-CUotWZgR.js";import{n as te,t as o}from"./Text-C5BHw0wv.js";import{n as ne,t as s}from"./Button-DoGM0DEN.js";import{n as re,t as ie}from"./Heading-YiIeUtHm.js";import{r as ae,t as oe}from"./BottomSheet-C2AuUW1O.js";import{n as se,t as ce}from"./Card-DA0ZfoAz.js";import{n as le,t as c}from"./Dialog-ohVvtWtq.js";import{n as ue,t as l}from"./Stack-C-3OCHCS.js";import{n as de,t as fe}from"./Link-D69iJxMA.js";import{n as pe,t as u}from"./Drawer-BXTsMjyA.js";import{r as me,t as d}from"./Toast-ChN_6mZr.js";import{i as he,n as f,r as p,t as ge}from"./useToast-DtnuYtJN.js";import{c as _e,o as ve}from"./iframe-B7UFaprG.js";function m({title:e,description:t,isRtl:n=!1,children:r}){return(0,C.jsxs)(`div`,{dir:n?`rtl`:void 0,...{0:{className:`x1n2onr6 x9f619 x1cvmir6 x193iq5w x1v2kdr2 xb3r6kr xmkeg23 x1y0btm7 x14i3s5s x1hviunn x1eiddq6 x1i5ehqx x17dzmu4`},1:{className:`x1n2onr6 x9f619 x1cvmir6 x193iq5w x1v2kdr2 xb3r6kr xmkeg23 x1y0btm7 x14i3s5s x1hviunn x1eiddq6 x1i5ehqx x17dzmu4 xzyj77d`}}[!!n|0],children:[(0,C.jsxs)(`div`,{className:`x1na6nto x1pzlopt x10xzikg xso031l x1q0q8m5 xw8gpjh`,children:[(0,C.jsx)(o,{type:`label`,children:e}),(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:t})]}),(0,C.jsx)(`div`,{className:`x78zum5 xdt5ytf xjcht0a x1shk3sm`,children:r})]})}function h({children:e}){return(0,C.jsx)(`div`,{className:`x78zum5 xdt5ytf x1txdalj x1b2ylru xmkeg23 x1y0btm7 x14i3s5s x1hviunn x10xzikg`,children:e})}function g({items:e,label:t=`Show toast`}){let n=f(),r=(0,S.useRef)([]),i=()=>{for(let e of r.current)e();r.current=[]};return(0,C.jsxs)(`div`,{className:`x78zum5 x1a02dak x1txdalj`,children:[(0,C.jsx)(s,{label:t,onClick:()=>{i();for(let t of e){let{key:e,...i}=t;r.current.push(n({uniqueID:e,...i}))}}}),(0,C.jsx)(s,{label:`Reset`,variant:`secondary`,onClick:i})]})}async function ye(){await new Promise(e=>{setTimeout(e,300)})}function be({onSaved:e}){let t=f(),n=async()=>{t({body:`Saving the item.`}),await ye(),e()};return(0,C.jsxs)(l,{gap:3,children:[(0,C.jsx)(`p`,{children:`Save shows a toast, then closes this dialog when the save is done.`}),(0,C.jsx)(s,{label:`Save`,onClick:()=>{n()}})]})}function _({onClose:e}){let t=f();return(0,C.jsxs)(l,{gap:3,children:[(0,C.jsx)(`p`,{children:`Toasts fired here render inside the dialog, above its overlay.`}),(0,C.jsxs)(l,{direction:`horizontal`,gap:2,wrap:`wrap`,children:[(0,C.jsx)(s,{label:`Close`,variant:`secondary`,onClick:e}),(0,C.jsx)(s,{label:`Show toast`,onClick:()=>{t({body:`Toast from inside the dialog!`})}}),(0,C.jsx)(s,{label:`Error toast`,variant:`destructive`,onClick:()=>{t({body:`Something went wrong.`,type:`error`})}})]})]})}function v({openLabel:e}){let[t,n]=(0,S.useState)(!1),[r,i]=(0,S.useState)(`The item is in your inbox.`),a=f();return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(s,{label:e,onClick:()=>n(!0)}),(0,C.jsx)(oe,{isOpen:t,onOpenChange:n,label:`Item actions`,children:(0,C.jsxs)(l,{gap:3,children:[(0,C.jsx)(`p`,{children:r}),(0,C.jsx)(s,{label:`Archive`,onClick:()=>{i(`The item is archived.`),a({body:`Item archived`,isAutoHide:!1,endContent:(0,C.jsx)(s,{label:`Undo`,variant:`secondary`,size:`sm`,onClick:()=>i(`The item is back in your inbox.`)})})}})]})})]})}function y({children:e}){let{mode:t}=a();return(0,C.jsx)(ve,{theme:q,mode:t,children:e})}function b({label:e}){return(0,C.jsxs)(l,{direction:`vertical`,gap:2,children:[(0,C.jsx)(ie,{level:4,children:e}),(0,C.jsx)(d,{type:`info`,body:`Your changes have been saved.`,isAutoHide:!1,autoHideDuration:5e3,onDismiss:x}),(0,C.jsx)(d,{type:`error`,body:`Could not reach the server.`,isAutoHide:!1,autoHideDuration:5e3,onDismiss:x})]})}function xe(){let e=f();return(0,C.jsxs)(l,{direction:`horizontal`,gap:2,children:[(0,C.jsx)(s,{label:`Themed info toast`,onClick:()=>e({body:`Your changes have been saved.`})}),(0,C.jsx)(s,{label:`Themed error toast`,variant:`destructive`,onClick:()=>e({body:`Could not reach the server.`,type:`error`})})]})}function x(){}function Se({type:e,body:t,endContent:n,dismiss:r}){return(0,C.jsxs)(`div`,{className:`x78zum5 x1cy8zhl xjcht0a xh8yej3`,children:[(0,C.jsx)(`div`,{...{0:{className:`xkh2ocl x51ohtg xjspbzw x2lah0s x1ewilqj`},1:{className:`xkh2ocl x51ohtg xjspbzw x2lah0s x1ob8fc3`}}[e===`error`|0]}),(0,C.jsx)(`div`,{className:`x98rzlu xeuugli`,children:t}),n,(0,C.jsx)(s,{label:`Dismiss custom toast`,variant:`ghost`,size:`sm`,onClick:r})]})}function Ce({type:e,body:t}){return(0,C.jsxs)(`div`,{className:`x78zum5 x1cy8zhl xjcht0a xh8yej3`,children:[(0,C.jsx)(`div`,{...{0:{className:`xkh2ocl x51ohtg xjspbzw x2lah0s x1ewilqj`},1:{className:`xkh2ocl x51ohtg xjspbzw x2lah0s x1ob8fc3`}}[e===`error`|0]}),(0,C.jsx)(`div`,{className:`x98rzlu xeuugli`,children:t})]})}function we(){let e=f();return(0,C.jsx)(s,{label:`Show toast`,onClick:()=>e({body:`Placement follows the document direction.`})})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,Te;function $(){return($=e((()=>{S=t(),me(),ge(),he(),_e(),ee(),r(),ne(),de(),se(),ue(),re(),te(),le(),ae(),pe(),C=n(),w={docs:{story:{inline:!1,height:`720px`}}},T={title:`Core/Toast`,tags:[`autodocs`],parameters:{docs:{description:{component:"Imperative toast notification system. Use `useToast()` for brief, non-critical feedback. Works with or without `LayerProvider`."}}}},E={render:function(){let e=f();return(0,C.jsx)(s,{label:`Show toast`,onClick:()=>e({body:`This is an info toast`})})},parameters:{docs:{description:{story:`Plain info toasts are transient by default. Use them for brief, non-critical feedback that is also reflected elsewhere in the UI.`}}}},D={tags:[`!autodocs`],render:function(){let e=f();return(0,S.useEffect)(()=>e({body:`Shown as the page mounted`,isAutoHide:!1,uniqueID:`shown-on-mount`}),[e]),(0,C.jsx)(s,{label:`Show another toast`,onClick:()=>e({body:`This is an info toast`})})},parameters:{docs:{description:{story:`A toast shown as the page mounts. LayerProvider holds it until the toast viewport mounts beside the app, then shows it. It stays up until it is dismissed.`}}}},O={render:function(){let e=f();return(0,C.jsx)(l,{direction:`horizontal`,gap:2,children:[`info`,`error`].map(t=>(0,C.jsx)(s,{label:t,variant:t===`error`?`destructive`:`secondary`,onClick:()=>e({body:`This is a ${t} notification.`,type:t})},t))})},parameters:{docs:{description:{story:`Two toast types: info (default) and error. Plain info toasts are transient by default; error toasts persist until dismissed.`}}}},k={render:function(){let e=f();return(0,C.jsxs)(l,{direction:`horizontal`,gap:2,children:[(0,C.jsx)(s,{label:`With button`,onClick:()=>e({body:`Item deleted`,isAutoHide:!1,endContent:(0,C.jsx)(s,{label:`Undo`,variant:`secondary`,size:`sm`,onClick:()=>console.log(`Undo!`)})})}),(0,C.jsx)(s,{label:`With link`,variant:`secondary`,onClick:()=>e({body:`Your report is ready.`,isAutoHide:!1,endContent:(0,C.jsx)(fe,{href:`#`,hasUnderline:!0,children:`View report`})})})]})},parameters:{docs:{description:{story:"Use `endContent` for short trailing actions. Set `isAutoHide: false` when the action must remain available; timed content still needs to satisfy WCAG 2.2.1."}}}},A={render:function(){let e=f();return(0,C.jsx)(s,{label:`Trigger error`,variant:`destructive`,onClick:()=>e({body:`Check your network connection and try again.`,type:`error`})})},parameters:{docs:{description:{story:"Error toasts default to `isAutoHide: false`; they persist until the user dismisses them."}}}},j={render:function(){let e=f(),t=(0,S.useRef)(null);return(0,C.jsxs)(l,{direction:`horizontal`,gap:2,children:[(0,C.jsx)(s,{label:`Show persistent toast`,onClick:()=>{t.current=e({body:`Uploading...`,isAutoHide:!1})}}),(0,C.jsx)(s,{label:`Dismiss`,variant:`secondary`,onClick:()=>{t.current?.(),t.current=null}})]})},parameters:{docs:{description:{story:"`useToast()` returns a dismiss function. Call it to remove the toast programmatically."}}}},M={render:function(){let e=f();return(0,C.jsxs)(l,{direction:`horizontal`,gap:2,children:[(0,C.jsx)(s,{label:`Offline (ignore)`,onClick:()=>e({body:`You are offline`,uniqueID:`offline`,collisionBehavior:`ignore`,isAutoHide:!1})}),(0,C.jsx)(s,{label:`Progress (overwrite)`,variant:`secondary`,onClick:()=>e({body:`Uploading... ${Math.floor(Math.random()*100)}%`,uniqueID:`upload-progress`,collisionBehavior:`overwrite`,isAutoHide:!1})})]})},parameters:{docs:{description:{story:"`uniqueID` prevents duplicate toasts. `ignore` keeps the existing; `overwrite` replaces it."}}}},N={render:function(){let e=f(),t=(0,S.useRef)(0);return(0,C.jsx)(s,{label:`Add toast`,onClick:()=>{t.current++;let n=[`info`,`error`],r=n[t.current%n.length];e({body:`Toast #${t.current} — ${r} notification.`,type:r})}})},parameters:{docs:{description:{story:`Multiple toasts stack vertically. Default max visible is 5.`}}}},P={name:`Narrow layout reference`,render:()=>(0,C.jsx)(`div`,{className:`x1dz1jew x193iq5w`,children:(0,C.jsx)(d,{type:`info`,body:`Arbeitsbereichsbenachrichtigungseinstellungen gespeichert`,isAutoHide:!1,autoHideDuration:5e3,endContent:(0,C.jsx)(s,{label:`Undo`,variant:`secondary`,size:`sm`}),onDismiss:()=>{}})}),parameters:{docs:{description:{story:`Static visual reference for narrow viewport/content-fit behavior: realistic translated copy wraps while Undo and dismiss stay aligned with its first line. This example opts out of auto-hide and does not emulate touch, pointer, or hover capabilities.`}}}},F={name:`Mobile situations / RTL logical placement`,render:()=>(0,C.jsx)(m,{title:`إعدادات الفريق`,description:`bottomStart follows the document direction; safe-area insets are device behavior and are not pixel-emulated here.`,isRtl:!0,children:(0,C.jsx)(p,{position:`bottomStart`,isTopLayer:!1,maxVisible:2,children:(0,C.jsxs)(h,{children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`The toast uses a logical start placement. On an RTL page, start is the right edge; device safe-area padding is handled by the viewport styles.`}),(0,C.jsx)(g,{label:`إظهار التنبيه`,items:[{key:`mobile-rtl-safe-area`,body:`تم حفظ إعدادات الفريق`}]})]})})}),parameters:{...w,docs:{story:{...w.docs.story,description:`RTL story for logical start/end placement. Safe-area behavior depends on real device insets; this story does not fake pixel evidence.`}}}},I={name:`Mobile situations / Swipe to dismiss`,render:()=>(0,C.jsx)(m,{title:`Swipe dismissal`,description:`Swipe is an enhancement only. Under a finger, as with iOS notification banners, the card follows the finger after a short distance at about half its speed, a quick flick dismisses it, and it leaves by sliding past its edge; with a pen on a desktop the surface fades as it approaches the edge. The visible close button remains the simple alternative.`,children:(0,C.jsx)(p,{position:`topEnd`,isTopLayer:!1,maxVisible:2,children:(0,C.jsxs)(h,{children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Use touch or pen input, or browser touch emulation, to swipe the toast toward its configured block edge: up for top placement, down for bottom placement. This matches the direction each Toast enters and exits, keeping one spatial model for the whole interaction. The gesture claims the touch only after dominant travel matches the dismiss edge, so opposite-direction and horizontal page scrolling remain available. Pen is supported as direct-contact input; mouse dragging is ignored to avoid conflicting with desktop text selection, where the close button remains available.`}),(0,C.jsx)(g,{items:[{key:`mobile-swipe-dismiss`,body:`Swipe or close me`,isAutoHide:!1}]})]})})}),parameters:{...w,docs:{story:{...w.docs.story,description:`Interactive vertical edge swipe-to-dismiss example using real ToastViewport behavior. The vertical axis intentionally matches the Toast placement and motion model: top Toasts leave upward and bottom Toasts leave downward. A non-passive touchmove handoff claims only dominant travel toward that edge; opposite-direction and horizontal page scrolling remain available. Pen is supported as direct-contact input, while mouse drag is excluded to avoid conflicting with desktop selection; the close button and F6 keyboard access remain available.`}}}},L={name:`Mobile situations / Timed toast`,render:()=>(0,C.jsx)(m,{title:`Timed dismissal`,description:`A toast that leaves on its own after three seconds. Under a finger it slides past its edge, as iOS notification banners leave; with a mouse it fades.`,children:(0,C.jsx)(p,{position:`topEnd`,isTopLayer:!1,maxVisible:2,children:(0,C.jsxs)(h,{children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Show the toast and wait: it dismisses itself after three seconds, the way any timed toast leaves.`}),(0,C.jsx)(g,{items:[{key:`mobile-timed`,body:`I leave after three seconds`,autoHideDuration:3e3}]})]})})}),parameters:{...w,docs:{story:{...w.docs.story,description:`A timed toast at the top that dismisses itself after three seconds. Under a finger it slides past its edge, as iOS notification banners leave; with a mouse it fades.`}}}},R={name:`Mobile situations / Motion edge-aware entrance`,render:()=>(0,C.jsx)(m,{title:`Motion replay`,description:`Replay top and bottom stacks to compare the 8px edge-directed slide, fade, and tighter stack spacing.`,children:(0,C.jsxs)(l,{gap:3,children:[(0,C.jsx)(p,{position:`topEnd`,isTopLayer:!1,maxVisible:3,children:(0,C.jsxs)(h,{children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Top placement travels 8px down from the top edge; exits return upward. Existing toasts make room through the wrapper grid-row transition.`}),(0,C.jsx)(g,{label:`Replay top stack`,items:[{key:`motion-top-1`,body:`Top first`,isAutoHide:!1},{key:`motion-top-2`,body:`Top second`,isAutoHide:!1},{key:`motion-top-3`,body:`Top third`,isAutoHide:!1}]})]})}),(0,C.jsx)(p,{position:`bottomEnd`,isTopLayer:!1,maxVisible:3,children:(0,C.jsxs)(h,{children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Bottom placement travels 8px up from the bottom edge and returns downward on exit, with the same transform/opacity contract and tighter stack spacing.`}),(0,C.jsx)(g,{label:`Replay bottom stack`,items:[{key:`motion-bottom-1`,body:`Bottom first`,isAutoHide:!1},{key:`motion-bottom-2`,body:`Bottom second`,isAutoHide:!1},{key:`motion-bottom-3`,body:`Bottom third`,isAutoHide:!1}]})]})})]})}),parameters:{...w,docs:{story:{...w.docs.story,description:`Replayable visual check for the focused motion change: an 8px top/bottom translate with the existing opacity and timing, plus the wrapper grid-row spacing transition.`}}}},z={name:`Accessibility / Nested viewport landmark`,render:()=>(0,C.jsx)(m,{title:`Nested providers`,description:`Only the viewport that receives a toast becomes a Notifications landmark.`,children:(0,C.jsx)(p,{isTopLayer:!1,children:(0,C.jsx)(p,{isTopLayer:!1,children:(0,C.jsxs)(h,{children:[(0,C.jsx)(o,{type:`supporting`,color:`secondary`,children:`Show a toast, then inspect the accessibility tree: the empty outer viewport remains unnamed and only the inner viewport is a region.`}),(0,C.jsx)(g,{items:[{key:`nested-viewport-landmark`,body:`Notification settings saved`,isAutoHide:!1}]})]})})})}),parameters:{...w,docs:{story:{...w.docs.story,description:`Accessibility check for nested ToastViewport composition. With a toast visible, exactly one named Notifications region should appear; with none visible, there should be zero.`}}}},B={render:function(){let e=f();return(0,C.jsx)(ce,{padding:4,children:(0,C.jsxs)(l,{gap:2,children:[(0,C.jsx)(`p`,{style:{margin:0,fontSize:14},children:`No LayerProvider: the hook creates a fallback viewport on document.body automatically.`}),(0,C.jsx)(s,{label:`Show toast`,onClick:()=>e({body:`Works without a provider!`})})]})})},parameters:{docs:{description:{story:"`useToast()` works without a provider. It lazily mounts a fallback viewport on first call."}}}},V={render:function(){let[e,t]=(0,S.useState)(!1);return(0,C.jsxs)(l,{gap:2,children:[(0,C.jsx)(s,{label:`Open dialog`,onClick:()=>t(!0)}),(0,C.jsx)(c,{isOpen:e,onOpenChange:()=>t(!1),children:(0,C.jsx)(p,{isTopLayer:!1,children:(0,C.jsx)(_,{onClose:()=>t(!1)})})})]})},parameters:{docs:{description:{story:"Dialog with its own `ToastViewport`: toasts render inside the dialog's top layer context and appear above the dialog overlay."}}}},H={render:function(){let[e,t]=(0,S.useState)(!1);return(0,C.jsx)(p,{children:(0,C.jsxs)(l,{gap:2,children:[(0,C.jsx)(s,{label:`Open dialog`,onClick:()=>t(!0)}),(0,C.jsx)(c,{isOpen:e,onOpenChange:()=>t(!1),"aria-label":`Edit item`,children:(0,C.jsx)(_,{onClose:()=>t(!1)})})]})})},parameters:{docs:{description:{story:"The app's own `ToastViewport` and no viewport in the dialog: while the dialog is open the viewport moves into it, so toasts fired from inside paint above the overlay and stay clickable."}}}},U={render:function(){let[e,t]=(0,S.useState)(!1);return(0,C.jsx)(p,{children:(0,C.jsxs)(l,{gap:2,children:[(0,C.jsx)(s,{label:`Open dialog`,onClick:()=>t(!0)}),(0,C.jsx)(c,{isOpen:e,onOpenChange:()=>t(!1),"aria-label":`Edit item`,children:(0,C.jsx)(be,{onSaved:()=>t(!1)})})]})})},parameters:{docs:{description:{story:`Save raises a toast and closes the dialog when the save finishes, as an app that waits for a request does. The toast stays on screen while the dialog closes.`}}}},W={render:function(){let[e,t]=(0,S.useState)(!1);return(0,C.jsx)(p,{position:`topEnd`,children:(0,C.jsxs)(l,{gap:2,children:[(0,C.jsx)(v,{openLabel:`Open sheet`}),(0,C.jsx)(s,{label:`Open dialog`,onClick:()=>t(!0)}),(0,C.jsx)(c,{isOpen:e,onOpenChange:()=>t(!1),"aria-label":`Edit item`,children:(0,C.jsx)(v,{openLabel:`Open sheet from the dialog`})})]})})},parameters:{docs:{description:{story:"The app's own `ToastViewport` and a `BottomSheet`, opened on its own or from a dialog: while the sheet is open the viewport moves into it, so a toast fired from the sheet paints above it and its action stays clickable."}}}},G={render:function(){let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(`The candidate is in Screening.`),i=f();return(0,C.jsxs)(p,{children:[(0,C.jsx)(s,{label:`Open candidate`,onClick:()=>t(!0)}),(0,C.jsx)(u,{isOpen:e,onOpenChange:t,label:`Candidate`,children:(0,C.jsxs)(l,{gap:3,children:[(0,C.jsx)(`p`,{children:n}),(0,C.jsx)(s,{label:`Move to Interview`,onClick:()=>{r(`The candidate is in Interview.`),i({body:`Moved to Interview`,isAutoHide:!1,endContent:(0,C.jsx)(s,{label:`Undo`,variant:`secondary`,size:`sm`,onClick:()=>r(`The candidate is back in Screening.`)})})}})]})})]})},parameters:{docs:{description:{story:"The app's own `ToastViewport` and a modal `Drawer`: while the drawer is open the viewport moves into it, so a toast fired from the drawer paints above it and its action stays clickable and reachable with Tab."}}}},K={render:function(){let[e,t]=(0,S.useState)(!1),[n,r]=(0,S.useState)(`The filters are saved.`),i=f();return(0,C.jsxs)(p,{children:[(0,C.jsxs)(l,{gap:2,children:[(0,C.jsx)(`p`,{children:n}),(0,C.jsx)(s,{label:`Save filters`,onClick:()=>i({body:`Filters saved`,isAutoHide:!1,endContent:(0,C.jsx)(s,{label:`Undo`,variant:`secondary`,size:`sm`,onClick:()=>r(`The save is undone.`)})})}),(0,C.jsx)(s,{label:`Open filters`,onClick:()=>t(!0)})]}),(0,C.jsx)(u,{isOpen:e,onOpenChange:t,hasScrim:!1,label:`Filters`,children:(0,C.jsx)(`p`,{children:`Filter options`})})]})},parameters:{docs:{description:{story:"The app's own `ToastViewport` and a `Drawer` without its scrim: a toast shown before the drawer opens stays above it, so its action stays clickable while the drawer covers its corner."}}}},q=i({name:`toast-brand-demo`,components:{toast:{base:{backgroundColor:`#FFF4D6`,borderRadius:`var(--radius-full)`,paddingInline:`var(--spacing-6)`,boxShadow:`var(--shadow-high)`,fontFamily:`var(--font-family-code)`},"type:error":{backgroundColor:`#5C0A18`}}}}),J={render:function(){return(0,C.jsxs)(l,{direction:`horizontal`,gap:4,wrap:`wrap`,children:[(0,C.jsx)(b,{label:`Default`}),(0,C.jsx)(y,{children:(0,C.jsx)(b,{label:`brandToastTheme`})})]})},parameters:{docs:{description:{story:"Pill radius, wider inline padding, the cream surface and the monospace body all come from `components.toast.base`; the deep red is `type:error`. Neither rule sets a text colour."}}}},Y={render:function(){return(0,C.jsx)(y,{children:(0,C.jsx)(p,{children:(0,C.jsx)(xe,{})})})},parameters:{docs:{description:{story:"Same theme, real toasts. The viewport is inside `Theme`, so the scoped theme CSS reaches the toasts it renders."}}}},X=e=>(0,C.jsx)(Se,{...e}),Z={name:`Custom content (renderContent)`,render:function(){let e=f();return(0,C.jsxs)(l,{direction:`horizontal`,gap:2,wrap:`wrap`,children:[(0,C.jsx)(s,{label:`Show`,onClick:()=>{e({body:`Your changes have been saved.`,renderContent:X})}}),(0,C.jsx)(s,{label:`With an action`,variant:`secondary`,onClick:()=>{e({body:`Row deleted.`,endContent:(0,C.jsx)(s,{variant:`ghost`,size:`sm`,label:`Undo`}),renderContent:X})}}),(0,C.jsx)(s,{label:`Error`,variant:`destructive`,onClick:()=>{e({body:`Could not reach the server.`,type:`error`,renderContent:X})}}),(0,C.jsx)(s,{label:`Layout without a close`,variant:`ghost`,onClick:()=>{e({body:`This layout relies on auto-hide.`,renderContent:e=>(0,C.jsx)(Ce,{...e})})}}),(0,C.jsx)(s,{label:`Without renderContent`,variant:`ghost`,onClick:()=>{e({body:`A toast from code that knows nothing about it.`})}})]})},parameters:{docs:{description:{story:"`renderContent` replaces the content of one toast's card and receives a `dismiss` callback. The custom layout composes its own Astryx `Button`; a layout without a close is left as-is and can rely on auto-hide. The last button omits `renderContent`, showing the ordinary Astryx layout and dismiss control."}}}},Q={name:`Logical placement follows direction`,render:function(){return(0,C.jsx)(p,{position:`bottomEnd`,maxVisible:1,children:(0,C.jsx)(we,{})})},parameters:{docs:{description:{story:"`bottomEnd` is a logical placement: the toast sits on the inline END edge, which is the right in LTR and the left in RTL. The viewport spans the inline axis and aligns the card within itself, so the card follows the document direction with no per-direction styling."}}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function DefaultStory() {
    const toast = useToast();
    return <Button label="Show toast" onClick={() => toast({
      body: 'This is an info toast'
    })} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Plain info toasts are transient by default. Use them for brief, non-critical feedback that is also reflected elsewhere in the UI.'
      }
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  // A toast that stays up would cover the docs page, so it shows only here.
  tags: ['!autodocs'],
  render: function ShownOnMountStory() {
    const toast = useToast();
    // The page can render a story more than once. The uniqueID keeps one
    // toast, and the toast leaves with the story.
    useEffect(() => toast({
      body: 'Shown as the page mounted',
      isAutoHide: false,
      uniqueID: 'shown-on-mount'
    }), [toast]);
    return <Button label="Show another toast" onClick={() => toast({
      body: 'This is an info toast'
    })} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'A toast shown as the page mounts. LayerProvider holds it until the toast viewport mounts beside the app, then shows it. It stays up until it is dismissed.'
      }
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: function TypesStory() {
    const toast = useToast();
    const types: ToastType[] = ['info', 'error'];
    return <Stack direction="horizontal" gap={2}>
        {types.map(type => <Button key={type} label={type} variant={type === 'error' ? 'destructive' : 'secondary'} onClick={() => toast({
        body: \`This is a \${type} notification.\`,
        type
      })} />)}
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Two toast types: info (default) and error. Plain info toasts are transient by default; error toasts persist until dismissed.'
      }
    }
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: function WithActionStory() {
    const toast = useToast();
    return <Stack direction="horizontal" gap={2}>
        <Button label="With button" onClick={() => toast({
        body: 'Item deleted',
        isAutoHide: false,
        endContent: <Button label="Undo" variant="secondary" size="sm" onClick={() => console.log('Undo!')} />
      })} />
        <Button label="With link" variant="secondary" onClick={() => toast({
        body: 'Your report is ready.',
        isAutoHide: false,
        endContent: <Link href="#" hasUnderline>
                  View report
                </Link>
      })} />
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Use \`endContent\` for short trailing actions. Set \`isAutoHide: false\` when the action must remain available; timed content still needs to satisfy WCAG 2.2.1.'
      }
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: function ErrorPersistsStory() {
    const toast = useToast();
    return <Button label="Trigger error" variant="destructive" onClick={() => toast({
      body: 'Check your network connection and try again.',
      type: 'error'
    })} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Error toasts default to \`isAutoHide: false\`; they persist until the user dismisses them.'
      }
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: function ProgrammaticDismissStory() {
    const toast = useToast();
    const dismissRef = useRef<(() => void) | null>(null);
    return <Stack direction="horizontal" gap={2}>
        <Button label="Show persistent toast" onClick={() => {
        dismissRef.current = toast({
          body: 'Uploading...',
          isAutoHide: false
        });
      }} />
        <Button label="Dismiss" variant="secondary" onClick={() => {
        dismissRef.current?.();
        dismissRef.current = null;
      }} />
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`useToast()\` returns a dismiss function. Call it to remove the toast programmatically.'
      }
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: function DeduplicationStory() {
    const toast = useToast();
    return <Stack direction="horizontal" gap={2}>
        <Button label="Offline (ignore)" onClick={() => toast({
        body: 'You are offline',
        uniqueID: 'offline',
        collisionBehavior: 'ignore',
        isAutoHide: false
      })} />
        <Button label="Progress (overwrite)" variant="secondary" onClick={() => toast({
        body: \`Uploading... \${Math.floor(Math.random() * 100)}%\`,
        uniqueID: 'upload-progress',
        collisionBehavior: 'overwrite',
        isAutoHide: false
      })} />
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`uniqueID\` prevents duplicate toasts. \`ignore\` keeps the existing; \`overwrite\` replaces it.'
      }
    }
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: function StackingStory() {
    const toast = useToast();
    const countRef = useRef(0);
    return <Button label="Add toast" onClick={() => {
      countRef.current++;
      const types: ToastType[] = ['info', 'error'];
      const type = types[countRef.current % types.length];
      toast({
        body: \`Toast #\${countRef.current} — \${type} notification.\`,
        type
      });
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple toasts stack vertically. Default max visible is 5.'
      }
    }
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Narrow layout reference',
  render: () => <div {...stylex.props(styles.narrowLayoutReference)}>
      <Toast type="info" body="Arbeitsbereichsbenachrichtigungseinstellungen gespeichert" isAutoHide={false} autoHideDuration={5000} endContent={<Button label="Undo" variant="secondary" size="sm" />} onDismiss={() => {}} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Static visual reference for narrow viewport/content-fit behavior: realistic translated copy wraps while Undo and dismiss stay aligned with its first line. This example opts out of auto-hide and does not emulate touch, pointer, or hover capabilities.'
      }
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Mobile situations / RTL logical placement',
  render: () => <MobileCanvas title="إعدادات الفريق" description="bottomStart follows the document direction; safe-area insets are device behavior and are not pixel-emulated here." isRtl>
      <ToastViewport position="bottomStart" isTopLayer={false} maxVisible={2}>
        <MockCard>
          <Text type="supporting" color="secondary">
            The toast uses a logical start placement. On an RTL page, start is
            the right edge; device safe-area padding is handled by the viewport
            styles.
          </Text>
          <ToastReplayControls label="إظهار التنبيه" items={[{
          key: 'mobile-rtl-safe-area',
          body: 'تم حفظ إعدادات الفريق'
        }]} />
        </MockCard>
      </ToastViewport>
    </MobileCanvas>,
  parameters: {
    ...mobileStoryParameters,
    docs: {
      story: {
        ...mobileStoryParameters.docs.story,
        description: 'RTL story for logical start/end placement. Safe-area behavior depends on real device insets; this story does not fake pixel evidence.'
      }
    }
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Mobile situations / Swipe to dismiss',
  render: () => <MobileCanvas title="Swipe dismissal" description="Swipe is an enhancement only. Under a finger, as with iOS notification banners, the card follows the finger after a short distance at about half its speed, a quick flick dismisses it, and it leaves by sliding past its edge; with a pen on a desktop the surface fades as it approaches the edge. The visible close button remains the simple alternative.">
      <ToastViewport position="topEnd" isTopLayer={false} maxVisible={2}>
        <MockCard>
          <Text type="supporting" color="secondary">
            Use touch or pen input, or browser touch emulation, to swipe the
            toast toward its configured block edge: up for top placement, down
            for bottom placement. This matches the direction each Toast enters
            and exits, keeping one spatial model for the whole interaction. The
            gesture claims the touch only after dominant travel matches the
            dismiss edge, so opposite-direction and horizontal page scrolling
            remain available. Pen is supported as direct-contact input; mouse
            dragging is ignored to avoid conflicting with desktop text
            selection, where the close button remains available.
          </Text>
          <ToastReplayControls items={[{
          key: 'mobile-swipe-dismiss',
          body: 'Swipe or close me',
          isAutoHide: false
        }]} />
        </MockCard>
      </ToastViewport>
    </MobileCanvas>,
  parameters: {
    ...mobileStoryParameters,
    docs: {
      story: {
        ...mobileStoryParameters.docs.story,
        description: 'Interactive vertical edge swipe-to-dismiss example using real ToastViewport behavior. The vertical axis intentionally matches the Toast placement and motion model: top Toasts leave upward and bottom Toasts leave downward. A non-passive touchmove handoff claims only dominant travel toward that edge; opposite-direction and horizontal page scrolling remain available. Pen is supported as direct-contact input, while mouse drag is excluded to avoid conflicting with desktop selection; the close button and F6 keyboard access remain available.'
      }
    }
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Mobile situations / Timed toast',
  render: () => <MobileCanvas title="Timed dismissal" description="A toast that leaves on its own after three seconds. Under a finger it slides past its edge, as iOS notification banners leave; with a mouse it fades.">
      <ToastViewport position="topEnd" isTopLayer={false} maxVisible={2}>
        <MockCard>
          <Text type="supporting" color="secondary">
            Show the toast and wait: it dismisses itself after three seconds,
            the way any timed toast leaves.
          </Text>
          <ToastReplayControls items={[{
          key: 'mobile-timed',
          body: 'I leave after three seconds',
          autoHideDuration: 3000
        }]} />
        </MockCard>
      </ToastViewport>
    </MobileCanvas>,
  parameters: {
    ...mobileStoryParameters,
    docs: {
      story: {
        ...mobileStoryParameters.docs.story,
        description: 'A timed toast at the top that dismisses itself after three seconds. Under a finger it slides past its edge, as iOS notification banners leave; with a mouse it fades.'
      }
    }
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Mobile situations / Motion edge-aware entrance',
  render: () => <MobileCanvas title="Motion replay" description="Replay top and bottom stacks to compare the 8px edge-directed slide, fade, and tighter stack spacing.">
      <Stack gap={3}>
        <ToastViewport position="topEnd" isTopLayer={false} maxVisible={3}>
          <MockCard>
            <Text type="supporting" color="secondary">
              Top placement travels 8px down from the top edge; exits return
              upward. Existing toasts make room through the wrapper grid-row
              transition.
            </Text>
            <ToastReplayControls label="Replay top stack" items={[{
            key: 'motion-top-1',
            body: 'Top first',
            isAutoHide: false
          }, {
            key: 'motion-top-2',
            body: 'Top second',
            isAutoHide: false
          }, {
            key: 'motion-top-3',
            body: 'Top third',
            isAutoHide: false
          }]} />
          </MockCard>
        </ToastViewport>
        <ToastViewport position="bottomEnd" isTopLayer={false} maxVisible={3}>
          <MockCard>
            <Text type="supporting" color="secondary">
              Bottom placement travels 8px up from the bottom edge and returns
              downward on exit, with the same transform/opacity contract and
              tighter stack spacing.
            </Text>
            <ToastReplayControls label="Replay bottom stack" items={[{
            key: 'motion-bottom-1',
            body: 'Bottom first',
            isAutoHide: false
          }, {
            key: 'motion-bottom-2',
            body: 'Bottom second',
            isAutoHide: false
          }, {
            key: 'motion-bottom-3',
            body: 'Bottom third',
            isAutoHide: false
          }]} />
          </MockCard>
        </ToastViewport>
      </Stack>
    </MobileCanvas>,
  parameters: {
    ...mobileStoryParameters,
    docs: {
      story: {
        ...mobileStoryParameters.docs.story,
        description: 'Replayable visual check for the focused motion change: an 8px top/bottom translate with the existing opacity and timing, plus the wrapper grid-row spacing transition.'
      }
    }
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Accessibility / Nested viewport landmark',
  render: () => <MobileCanvas title="Nested providers" description="Only the viewport that receives a toast becomes a Notifications landmark.">
      <ToastViewport isTopLayer={false}>
        <ToastViewport isTopLayer={false}>
          <MockCard>
            <Text type="supporting" color="secondary">
              Show a toast, then inspect the accessibility tree: the empty outer
              viewport remains unnamed and only the inner viewport is a region.
            </Text>
            <ToastReplayControls items={[{
            key: 'nested-viewport-landmark',
            body: 'Notification settings saved',
            isAutoHide: false
          }]} />
          </MockCard>
        </ToastViewport>
      </ToastViewport>
    </MobileCanvas>,
  parameters: {
    ...mobileStoryParameters,
    docs: {
      story: {
        ...mobileStoryParameters.docs.story,
        description: 'Accessibility check for nested ToastViewport composition. With a toast visible, exactly one named Notifications region should appear; with none visible, there should be zero.'
      }
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: function NoProviderStory() {
    const toast = useToast();
    return <Card padding={4}>
        <Stack gap={2}>
          <p style={{
          margin: 0,
          fontSize: 14
        }}>
            No LayerProvider: the hook creates a fallback viewport on
            document.body automatically.
          </p>
          <Button label="Show toast" onClick={() => toast({
          body: 'Works without a provider!'
        })} />
        </Stack>
      </Card>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`useToast()\` works without a provider. It lazily mounts a fallback viewport on first call.'
      }
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: function ToastOverDialogStory() {
    const [isOpen, setIsOpen] = useState(false);
    return <Stack gap={2}>
        <Button label="Open dialog" onClick={() => setIsOpen(true)} />
        <Dialog isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
          <ToastViewport isTopLayer={false}>
            <DialogToastContent onClose={() => setIsOpen(false)} />
          </ToastViewport>
        </Dialog>
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: "Dialog with its own \`ToastViewport\`: toasts render inside the dialog's top layer context and appear above the dialog overlay."
      }
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: function AppToastOverDialogStory() {
    const [isOpen, setIsOpen] = useState(false);
    return <ToastViewport>
        <Stack gap={2}>
          <Button label="Open dialog" onClick={() => setIsOpen(true)} />
          <Dialog isOpen={isOpen} onOpenChange={() => setIsOpen(false)} aria-label="Edit item">
            <DialogToastContent onClose={() => setIsOpen(false)} />
          </Dialog>
        </Stack>
      </ToastViewport>;
  },
  parameters: {
    docs: {
      description: {
        story: "The app's own \`ToastViewport\` and no viewport in the dialog: while the dialog is open the viewport moves into it, so toasts fired from inside paint above the overlay and stay clickable."
      }
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: function AppToastOverDialogClosedAfterSaveStory() {
    const [isOpen, setIsOpen] = useState(false);
    return <ToastViewport>
        <Stack gap={2}>
          <Button label="Open dialog" onClick={() => setIsOpen(true)} />
          <Dialog isOpen={isOpen} onOpenChange={() => setIsOpen(false)} aria-label="Edit item">
            <SaveToastContent onSaved={() => setIsOpen(false)} />
          </Dialog>
        </Stack>
      </ToastViewport>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Save raises a toast and closes the dialog when the save finishes, as an app that waits for a request does. The toast stays on screen while the dialog closes.'
      }
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: function AppToastOverBottomSheetStory() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
      // Toasts at the top, clear of the sheet rising from the bottom.
      <ToastViewport position="topEnd">
        <Stack gap={2}>
          <SheetToastContent openLabel="Open sheet" />
          <Button label="Open dialog" onClick={() => setIsDialogOpen(true)} />
          <Dialog isOpen={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} aria-label="Edit item">
            <SheetToastContent openLabel="Open sheet from the dialog" />
          </Dialog>
        </Stack>
      </ToastViewport>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "The app's own \`ToastViewport\` and a \`BottomSheet\`, opened on its own or from a dialog: while the sheet is open the viewport moves into it, so a toast fired from the sheet paints above it and its action stays clickable."
      }
    }
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: function AppToastOverDrawerStory() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('The candidate is in Screening.');
    const toast = useToast();
    return <ToastViewport>
        <Button label="Open candidate" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Candidate">
          <Stack gap={3}>
            <p>{status}</p>
            <Button label="Move to Interview" onClick={() => {
            setStatus('The candidate is in Interview.');
            toast({
              body: 'Moved to Interview',
              isAutoHide: false,
              endContent: <Button label="Undo" variant="secondary" size="sm" onClick={() => setStatus('The candidate is back in Screening.')} />
            });
          }} />
          </Stack>
        </Drawer>
      </ToastViewport>;
  },
  parameters: {
    docs: {
      description: {
        story: "The app's own \`ToastViewport\` and a modal \`Drawer\`: while the drawer is open the viewport moves into it, so a toast fired from the drawer paints above it and its action stays clickable and reachable with Tab."
      }
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: function AppToastOverNonModalDrawerStory() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('The filters are saved.');
    const toast = useToast();
    return <ToastViewport>
        <Stack gap={2}>
          <p>{status}</p>
          <Button label="Save filters" onClick={() => toast({
          body: 'Filters saved',
          isAutoHide: false,
          endContent: <Button label="Undo" variant="secondary" size="sm" onClick={() => setStatus('The save is undone.')} />
        })} />
          <Button label="Open filters" onClick={() => setIsOpen(true)} />
        </Stack>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} hasScrim={false} label="Filters">
          <p>Filter options</p>
        </Drawer>
      </ToastViewport>;
  },
  parameters: {
    docs: {
      description: {
        story: "The app's own \`ToastViewport\` and a \`Drawer\` without its scrim: a toast shown before the drawer opens stays above it, so its action stays clickable while the drawer covers its corner."
      }
    }
  }
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: function ThemedToastStory() {
    return <Stack direction="horizontal" gap={4} wrap="wrap">
        <ToastSpecimens label="Default" />
        <BrandToastScope>
          <ToastSpecimens label="brandToastTheme" />
        </BrandToastScope>
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pill radius, wider inline padding, the cream surface and the ' + 'monospace body all come from \`components.toast.base\`; the deep red ' + 'is \`type:error\`. Neither rule sets a text colour.'
      }
    }
  }
}`,...J.parameters?.docs?.source},description:{story:"Default and themed, side by side, in both types. These are inline `Toast`\nelements rather than fired ones so both states stay on screen together;\n`ThemedToastLive` shows the same theme driving real `useToast()` calls.",...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: function ThemedToastLiveStory() {
    return <BrandToastScope>
        <ToastViewport>
          <ThemedToastTriggers />
        </ToastViewport>
      </BrandToastScope>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Same theme, real toasts. The viewport is inside \`Theme\`, so the ' + 'scoped theme CSS reaches the toasts it renders.'
      }
    }
  }
}`,...Y.parameters?.docs?.source},description:{story:`The copyable shape: wrap the viewport in the theme and fire toasts normally.`,...Y.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Custom content (renderContent)',
  render: function CustomContentStory() {
    const toast = useToast();
    return <Stack direction="horizontal" gap={2} wrap="wrap">
        <Button label="Show" onClick={() => {
        toast({
          body: 'Your changes have been saved.',
          renderContent: renderProductContent
        });
      }} />
        <Button label="With an action" variant="secondary" onClick={() => {
        toast({
          body: 'Row deleted.',
          endContent: <Button variant="ghost" size="sm" label="Undo" />,
          renderContent: renderProductContent
        });
      }} />
        <Button label="Error" variant="destructive" onClick={() => {
        toast({
          body: 'Could not reach the server.',
          type: 'error',
          renderContent: renderProductContent
        });
      }} />
        <Button label="Layout without a close" variant="ghost" onClick={() => {
        toast({
          body: 'This layout relies on auto-hide.',
          renderContent: toastProps => <ContentWithoutDismiss {...toastProps} />
        });
      }} />
        <Button label="Without renderContent" variant="ghost" onClick={() => {
        toast({
          body: 'A toast from code that knows nothing about it.'
        });
      }} />
      </Stack>;
  },
  parameters: {
    docs: {
      description: {
        story: "\`renderContent\` replaces the content of one toast's card and receives a \`dismiss\` callback. The custom layout composes its own Astryx \`Button\`; a layout without a close is left as-is and can rely on auto-hide. The last button omits \`renderContent\`, showing the ordinary Astryx layout and dismiss control."
      }
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Logical placement follows direction',
  render: function LogicalPlacementStory() {
    return <ToastViewport position="bottomEnd" maxVisible={1}>
        <LogicalPlacementTrigger />
      </ToastViewport>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`bottomEnd\` is a logical placement: the toast sits on the inline END edge, which is the right in LTR and the left in RTL. The viewport spans the inline axis and aligns the card within itself, so the card follows the document direction with no per-direction styling.'
      }
    }
  }
}`,...Q.parameters?.docs?.source},description:{story:"The viewport is rendered IN THE STORY TREE, not through the provider-less\nfallback the other stories use, and `isTopLayer` keeps its default.\n\nBoth details are load-bearing for the RTL audit:\n\n- the fallback container is appended to `<body>`, outside the decorator that\n  sets `dir`, so a toast raised there can never flip and reads as a false\n  not-RTL;\n- `isTopLayer={false}` drops the `popover` attribute, and with it the UA\n  `width: fit-content` this placement has to survive — a story without the\n  popover would pass whether or not the viewport can span the inline axis.",...Q.parameters?.docs?.description}}},Te=[`Default`,`ShownOnMount`,`Types`,`WithAction`,`ErrorPersists`,`ProgrammaticDismiss`,`Deduplication`,`Stacking`,`NarrowLayoutReference`,`MobileRtlSafeAreaPlacement`,`MobileSwipeToDismiss`,`MobileTimedToast`,`MobileMotionEdgeAwareEntrance`,`NestedViewportLandmark`,`NoProvider`,`ToastOverDialog`,`AppToastOverDialog`,`AppToastOverDialogClosedAfterSave`,`AppToastOverBottomSheet`,`AppToastOverDrawer`,`AppToastOverNonModalDrawer`,`ThemedToast`,`ThemedToastLive`,`CustomContent`,`LogicalPlacement`]})))()}$();export{W as AppToastOverBottomSheet,H as AppToastOverDialog,U as AppToastOverDialogClosedAfterSave,G as AppToastOverDrawer,K as AppToastOverNonModalDrawer,Z as CustomContent,M as Deduplication,E as Default,A as ErrorPersists,Q as LogicalPlacement,R as MobileMotionEdgeAwareEntrance,F as MobileRtlSafeAreaPlacement,I as MobileSwipeToDismiss,L as MobileTimedToast,P as NarrowLayoutReference,z as NestedViewportLandmark,B as NoProvider,j as ProgrammaticDismiss,D as ShownOnMount,N as Stacking,J as ThemedToast,Y as ThemedToastLive,V as ToastOverDialog,O as Types,k as WithAction,Te as __namedExportsOrder,T as default};