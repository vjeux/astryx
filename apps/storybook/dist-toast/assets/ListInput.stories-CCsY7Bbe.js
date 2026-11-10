import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Selector-MAEgY-r1.js";import{a as s,i as c,r as l}from"./columnUtils-ClYX9X3Y.js";import{n as ee,t as u}from"./DateInput-CHI86NkI.js";import{n as te,t as d}from"./TextInput-LGxpinPt.js";import{n as ne,t as re}from"./NumberInput-CXlV3t9e.js";import{n as ie,t as ae}from"./createReorderable-BR-o97fJ.js";import{n as f,t as p}from"./neutralTheme-BXK-s1F0.js";import{c as m,o as h}from"./iframe-B7UFaprG.js";import{n as g,t as _}from"./ListInput-Bo7DCPOU.js";function oe(e){let t=e.label.trim().toLowerCase();return e.color===`green`&&t===`blocked`||e.color===`red`&&t===`success`}function v(){let[e,t]=(0,O.useState)(()=>new Set),n=(0,O.useCallback)((e,n)=>{let r=y(e,n);t(e=>{if(e.has(r))return e;let t=new Set(e);return t.add(r),t})},[]);return{isFieldTouched:(0,O.useCallback)((t,n)=>e.has(y(t,n)),[e]),markFieldTouched:n}}function y(e,t){return JSON.stringify([e,t])}function b(e){return[{key:`color`,header:`Color`,width:s(1,{minWidth:120}),renderInput:({item:t,label:n,isLabelHidden:r,status:i,statusVariant:a,isDisabled:s,updateItem:c})=>(0,k.jsx)(o,{label:n,isLabelHidden:r,options:j,value:t.color,onChange:e=>c({...t,color:e},`color`),status:i,statusVariant:a,isDisabled:s,onBlur:()=>e(t.id,`color`)})},{key:`label`,header:`Label`,width:s(2,{minWidth:200}),renderInput:({item:t,label:n,isLabelHidden:r,status:i,statusVariant:a,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(d,{label:n,isLabelHidden:r,value:t.label,onChange:e=>c({...t,label:e},`label`),status:i,statusVariant:a,isDisabled:o,isLoading:s,onBlur:()=>e(t.id,`label`)})}]}function x(e){return(0,O.useMemo)(()=>ae({onReorder:({key:t,to:n})=>e(e=>{let r=e.find(e=>e.id===t);if(r==null)return e;let i=e.filter(e=>e!==r);return[...i.slice(0,n),r,...i.slice(n)]})}),[e])}function S({isReorderable:e}){let[t,n]=(0,O.useState)(M),r=x(n),{isFieldTouched:i,markFieldTouched:a}=v(),o=(0,O.useMemo)(()=>b(a),[a]);return(0,k.jsx)(_,{label:`Tag options`,description:e?`Add at least five tags and drag rows to set their order. Field errors appear after the first blur.`:`Add at least five tags. Items remain in the order they were added; field errors appear after the first blur.`,value:t,onChange:n,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),color:`blue`,label:``}),columns:o,itemName:`tag`,status:t.length<5?{type:`error`,message:`Add at least five tag options.`}:void 0,getItemStatus:e=>oe(e)?{type:`error`,message:`“${e.label}” cannot use ${e.color}.`}:void 0,getFieldStatus:(e,t)=>i(e.id,t)&&t===`label`&&e.label.trim()===``?{type:`error`,message:`Enter a label.`}:void 0,reorderable:e?r:void 0})}function C(e){let t=e.trim(),n=t.indexOf(`@`),r=t.lastIndexOf(`.`);return n>0&&r>n+1&&r<t.length-1}function se(){let[e,t]=(0,O.useState)([]),[n,r]=(0,O.useState)(!1),{isFieldTouched:i,markFieldTouched:a}=v(),o=(0,O.useMemo)(()=>[{key:`email`,header:`Email address`,width:s(1,{minWidth:240}),renderInput:({item:e,label:t,isLabelHidden:n,status:r,statusVariant:i,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(d,{type:`email`,label:t,isLabelHidden:n,value:e.email,placeholder:`name@example.com`,onChange:t=>c({...e,email:t},`email`),onBlur:()=>a(e.id,`email`),status:r,statusVariant:i,isDisabled:o,isLoading:s})}],[a]),c=(0,O.useCallback)(e=>{t(e),r(!0)},[]);return(0,k.jsx)(_,{label:`Mailing list`,description:`Start empty, add up to six addresses, and remove the final row to exercise focus restoration and required-list validation.`,value:e,onChange:c,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),email:``}),columns:o,itemName:`subscriber`,status:n&&e.length===0?{type:`error`,message:`Add at least one subscriber.`}:void 0,getItemStatus:t=>{let n=t.email.trim().toLowerCase();return n!==``&&e.some(e=>e.id!==t.id&&e.email.trim().toLowerCase()===n)?{type:`error`,message:`This address is already in the list.`}:void 0},getFieldStatus:(e,t)=>{if(t===`email`&&i(e.id,t))return e.email.trim()===``?{type:`error`,message:`Enter an email address.`}:C(e.email)?void 0:{type:`error`,message:`Enter a valid email address.`}},isRequired:!0,maxItems:6})}function w(){let[e,t]=(0,O.useState)(L),{isFieldTouched:n,markFieldTouched:r}=v(),i=e.reduce((e,t)=>e+(t.percent??0),0),a=(0,O.useMemo)(()=>[{key:`team`,header:`Team`,width:s(2,{minWidth:180}),renderInput:({item:e,label:t,isLabelHidden:n,status:i,statusVariant:a,isDisabled:s,isLoading:c,updateItem:l})=>(0,k.jsx)(o,{label:t,isLabelHidden:n,options:I,value:e.team,placeholder:`Choose a team`,onChange:t=>l({...e,team:t},`team`),onBlur:()=>r(e.id,`team`),status:i,statusVariant:a,isDisabled:s||c})},{key:`percent`,header:`Allocation`,width:c(132),renderInput:({item:e,label:t,isLabelHidden:n,status:i,statusVariant:a,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(re,{label:t,isLabelHidden:n,value:e.percent,onChange:t=>c({...e,percent:t},`percent`),onBlur:()=>r(e.id,`percent`),status:i,statusVariant:a,isDisabled:o||s,min:0,max:100,units:`%`,isIntegerOnly:!0})}],[r]);return(0,k.jsx)(_,{label:`Quarterly budget allocation`,description:`Assign each team once. The percentages across every row must total 100%.`,value:e,onChange:t,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),team:``,percent:null}),columns:a,itemName:`allocation`,status:i===100?void 0:{type:`error`,message:`Allocations must total 100%. Current total: ${i}%.`},getItemStatus:t=>t.team!==``&&e.some(e=>e.id!==t.id&&e.team===t.team)?{type:`error`,message:`Each team can only appear once.`}:void 0,getFieldStatus:(e,t)=>{if(n(e.id,t)){if(t===`team`&&e.team===``)return{type:`error`,message:`Choose a team.`};if(t===`percent`&&e.percent==null)return{type:`error`,message:`Enter an allocation.`};if(t===`percent`&&e.percent!=null&&(e.percent<0||e.percent>100))return{type:`error`,message:`Use a value from 0 to 100.`}}},isRequired:!0,maxItems:4})}function T(){let[e,t]=(0,O.useState)(V),{isFieldTouched:n,markFieldTouched:r}=v(),i=(0,O.useMemo)(()=>[{key:`fullName`,header:`Full legal name`,width:s(2,{minWidth:200}),renderInput:({item:e,label:t,isLabelHidden:n,status:i,statusVariant:a,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(d,{label:t,isLabelHidden:n,value:e.fullName,onChange:t=>c({...e,fullName:t},`fullName`),onBlur:()=>r(e.id,`fullName`),status:i,statusVariant:a,isDisabled:o,isLoading:s})},{key:`relationship`,header:`Relationship`,width:s(1.25,{minWidth:160}),renderInput:({item:e,label:t,isLabelHidden:n,status:i,statusVariant:a,isDisabled:s,isLoading:c,updateItem:l})=>(0,k.jsx)(o,{label:t,isLabelHidden:n,options:z,value:e.relationship,placeholder:`Choose relationship`,onChange:t=>l({...e,relationship:t},`relationship`),onBlur:()=>r(e.id,`relationship`),status:i,statusVariant:a,isDisabled:s||c})},{key:`dateOfBirth`,header:`Date of birth`,width:c(176),renderInput:({item:e,label:t,isLabelHidden:n,status:i,statusVariant:a,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(u,{label:t,isLabelHidden:n,value:e.dateOfBirth,onChange:t=>c({...e,dateOfBirth:t},`dateOfBirth`),onBlur:()=>r(e.id,`dateOfBirth`),status:i,statusVariant:a,isDisabled:o,isLoading:s,max:B})}],[r]);return(0,k.jsx)(_,{label:`Family member declaration`,description:`Declare each immediate family member, their relationship to you, and their date of birth.`,value:e,onChange:t,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),fullName:``,relationship:``,dateOfBirth:void 0}),columns:i,itemName:`family member`,getItemStatus:(t,n)=>{if(t.fullName.trim()===``||t.dateOfBirth==null)return;let r=t.fullName.trim().toLowerCase();return e.findIndex(e=>e.fullName.trim().toLowerCase()===r&&e.dateOfBirth===t.dateOfBirth)===n?void 0:{type:`error`,message:`This family member appears more than once.`}},getFieldStatus:(e,t)=>{if(n(e.id,t)){if(t===`fullName`&&e.fullName.trim()===``)return{type:`error`,message:`Enter a full legal name.`};if(t===`relationship`&&e.relationship===``)return{type:`error`,message:`Choose a relationship.`};if(t===`dateOfBirth`&&e.dateOfBirth==null)return{type:`error`,message:`Choose a date of birth.`};if(t===`dateOfBirth`&&e.dateOfBirth!=null&&e.dateOfBirth>B)return{type:`error`,message:`Date of birth cannot be in the future.`}}},isRequired:!0})}function E(){let[e,t]=(0,O.useState)(W),n=x(t),{isFieldTouched:r,markFieldTouched:i}=v(),a=(0,O.useMemo)(()=>[{key:`destination`,header:`Destination`,width:s(3,{minWidth:200}),renderInput:({item:e,label:t,isLabelHidden:n,status:r,statusVariant:a,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(d,{label:t,isLabelHidden:n,value:e.destination,onChange:t=>c({...e,destination:t},`destination`),onBlur:()=>i(e.id,`destination`),status:r,statusVariant:a,isDisabled:o,isLoading:s})},{key:`departureDate`,header:`Departure`,width:s(2,{minWidth:180}),renderInput:({item:e,label:t,isLabelHidden:n,status:r,statusVariant:a,isDisabled:o,isLoading:s,updateItem:c})=>(0,k.jsx)(u,{label:t,isLabelHidden:n,value:e.departureDate,onChange:t=>c({...e,departureDate:t},`departureDate`),onBlur:()=>i(e.id,`departureDate`),status:r,statusVariant:a,isDisabled:o,isLoading:s,min:`2026-09-01`,max:`2026-12-31`})}],[i]);return(0,k.jsx)(`div`,{className:`x1cvmir6 x193iq5w`,children:(0,k.jsx)(_,{label:`Multi-city itinerary`,description:`At this width, each leg stacks its two fields while keeping reorder and remove controls available.`,value:e,onChange:t,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),destination:``,departureDate:void 0}),columns:a,itemName:`leg`,getItemStatus:(t,n)=>{let r=e[n-1]?.departureDate;return n>0&&r!=null&&t.departureDate!=null&&t.departureDate<r?{type:`error`,message:`Departure dates must follow the itinerary order.`}:void 0},getFieldStatus:(e,t)=>{if(r(e.id,t)){if(t===`destination`&&e.destination.trim()===``)return{type:`error`,message:`Enter a destination.`};if(t===`departureDate`&&e.departureDate==null)return{type:`error`,message:`Choose a departure date.`}}},reorderable:n,isRequired:!0})})}function D({isDisabled:e,isLoading:t,status:n}){let[r,i]=(0,O.useState)(M.slice(0,3)),a=x(i),o=(0,O.useMemo)(()=>b(()=>{}),[]);return(0,k.jsx)(_,{label:`Tag options`,description:`Each row keeps its colour and label.`,value:r,onChange:i,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),color:`blue`,label:``}),columns:o,itemName:`tag`,isDisabled:e,isLoading:t,status:n,reorderable:a})}function ce(){let[e,t]=(0,O.useState)(Y),n=x(t),r=(0,O.useMemo)(()=>b(()=>{}),[]);return(0,k.jsx)(_,{label:`Tag options at volume`,description:`Twenty-five records, every fifth one carrying an over-long label.`,value:e,onChange:t,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),color:`blue`,label:``}),columns:r,itemName:`tag`,reorderable:n})}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{O=t(),ee(),ne(),a(),ie(),m(),l(),r(),te(),p(),g(),k=n(),A={title:`Lab/ListInput`,component:_,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,k.jsx)(`div`,{className:`x1xwk8fm x193iq5w`,children:(0,k.jsx)(e,{})})]},j=[{value:`blue`,label:`Blue`},{value:`green`,label:`Green`},{value:`amber`,label:`Amber`},{value:`red`,label:`Red`},{value:`purple`,label:`Purple`}],M=[{id:`tag-new`,color:`blue`,label:`New`},{id:`tag-blocked`,color:`green`,label:`Blocked`},{id:`tag-empty`,color:`amber`,label:``},{id:`tag-review`,color:`purple`,label:`In review`}],N={render:()=>(0,k.jsx)(S,{isReorderable:!0}),parameters:{docs:{description:{story:`Pointer-activate Add near the bottom of the viewport to keep the action under the pointer while available scroll containers absorb the inserted row from nearest to outermost. The new row receives focus and uses a live translate entrance. Remove one to see stable-size survivors close the gap; reduced-motion preferences use an instant change.`}}}},P={name:`Non-reorderable`,render:()=>(0,k.jsx)(S,{})},F={render:()=>(0,k.jsx)(se,{}),parameters:{docs:{description:{story:`Exercises the empty state, add autofocus, one-column layout, duplicate records, blur validation, removing the last item, and the six-item boundary.`}}}},I=[{value:`design`,label:`Design`},{value:`engineering`,label:`Engineering`},{value:`marketing`,label:`Marketing`},{value:`operations`,label:`Operations`}],L=[{id:`allocation-design`,team:`design`,percent:35},{id:`allocation-engineering`,team:`engineering`,percent:40},{id:`allocation-marketing`,team:`marketing`,percent:15}],R={render:()=>(0,k.jsx)(w,{}),parameters:{docs:{description:{story:`Exercises Selector and NumberInput alignment, fixed and proportional column widths, duplicate-item errors, field tooltips, and a collection-wide total.`}}}},z=[{value:`spouse-or-partner`,label:`Spouse or partner`},{value:`child`,label:`Child`},{value:`parent`,label:`Parent`},{value:`sibling`,label:`Sibling`},{value:`other-dependent`,label:`Other dependent`}],B=`2026-08-05`,V=[{id:`member-jordan`,fullName:`Jordan Lee`,relationship:`spouse-or-partner`,dateOfBirth:`1988-11-02`},{id:`member-alexandria`,fullName:`Alexandria María de la Cruz`,relationship:`child`,dateOfBirth:`2012-06-24`},{id:`member-noah`,fullName:`Noah Lee`,relationship:`child`,dateOfBirth:`2018-09-08`},{id:`member-grace`,fullName:`Grace Lee`,relationship:`parent`,dateOfBirth:`1958-04-17`}],H={render:()=>(0,k.jsx)(T,{}),parameters:{docs:{description:{story:`Exercises the intended three-field ceiling, TextInput, Selector, and DateInput alignment, a long international name, blur validation, duplicate-record validation, and non-reorderable semantics.`}}}},U={render:()=>(0,k.jsx)(`div`,{className:`x14rvwrp x193iq5w`,children:(0,k.jsx)(T,{})}),parameters:{docs:{description:{story:`Exercises the 640px stacking breakpoint at a 600px container with all three field types, repeated labels, and non-reorderable top-aligned remove actions.`}}}},W=[{id:`leg-montreal`,destination:`Montréal–Pierre Elliott Trudeau International Airport`,departureDate:`2026-09-12`},{id:`leg-reykjavik`,destination:`Reykjavík`,departureDate:`2026-09-16`},{id:`leg-copenhagen`,destination:`Copenhagen`,departureDate:`2026-09-20`}],G={render:()=>(0,k.jsx)(E,{}),parameters:{docs:{description:{story:`Exercises the 640px container breakpoint, 32px separation between stacked record groups, repeated labels, a long value, DateInput popovers, item-order validation, and reorder/remove controls aligned beside each record’s first field.`}}}},K={render:()=>(0,k.jsx)(D,{isDisabled:!0}),parameters:{docs:{description:{story:"Sets `aria-disabled` on the group and disables each field, the reorder handle, the remove action, and Add. The values stay legible rather than being hidden, so a disabled list still communicates its contents."}}}},q={render:()=>(0,k.jsx)(D,{isLoading:!0}),parameters:{docs:{description:{story:"Sets `aria-busy` on the group and locks the same controls `isDisabled` does. Loading is distinct from disabled: it means the current values may still change, so an in-flight keyboard reorder is cancelled rather than committed."}}}},J={render:()=>(0,k.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1rzw5jd`,children:[(0,k.jsx)(D,{status:{type:`error`,message:`Add at least five tag options.`}}),(0,k.jsx)(D,{status:{type:`warning`,message:`Two tags share a colour, which may be hard to tell apart.`}}),(0,k.jsx)(D,{status:{type:`success`,message:`All tag options are valid.`}})]}),parameters:{docs:{description:{story:"The other stories only exercise `error`. `warning` and `success` use the same list-level slot and are described by the group, so a screen reader reaches them from any field inside the list."}}}},Y=Array.from({length:25},(e,t)=>({id:`stress-${t}`,color:j[t%j.length].value,label:t%5==0?`Extremely long tag label ${t} that has to wrap or truncate rather than widen the row past its container`:`Tag ${t}`})),X={render:()=>(0,k.jsx)(ce,{}),parameters:{docs:{description:{story:`Checks that column tracks stay stable as row count grows, that an over-long label cannot widen the row past its container, and that reorder stays usable when the list is taller than the viewport.`}}}},Z={render:()=>(0,k.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1rzw5jd`,children:[(0,k.jsx)(h,{theme:f,mode:`light`,children:(0,k.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1v2ro7d x1qhigcl xur7f20 x1eiddq6`,children:[(0,k.jsx)(i,{weight:`bold`,children:`Light`}),(0,k.jsx)(D,{})]})}),(0,k.jsx)(h,{theme:f,mode:`dark`,children:(0,k.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1v2ro7d x1qhigcl xur7f20 x1eiddq6`,children:[(0,k.jsx)(i,{weight:`bold`,children:`Dark`}),(0,k.jsx)(D,{}),(0,k.jsx)(h,{theme:f,mode:`light`,children:(0,k.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1v2ro7d x1qhigcl xur7f20 x1eiddq6`,children:[(0,k.jsx)(i,{weight:`bold`,children:`Light nested inside dark`}),(0,k.jsx)(D,{status:{type:`error`,message:`Add at least five tags.`}})]})})]})})]}),parameters:{docs:{description:{story:`Pins both modes into one frame so a theme regression is visible without toggling the toolbar, and nests a light theme inside a dark one to confirm the component reads its colours from the nearest provider rather than the document root.`}}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <TagOptionsExample isReorderable />,
  parameters: {
    docs: {
      description: {
        story: 'Pointer-activate Add near the bottom of the viewport to keep the action under the pointer while available scroll containers absorb the inserted row from nearest to outermost. The new row receives focus and uses a live translate entrance. Remove one to see stable-size survivors close the gap; reduced-motion preferences use an instant change.'
      }
    }
  }
}`,...N.parameters?.docs?.source},description:{story:`Controlled tag options with validation at list, item, and field scope.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Non-reorderable',
  render: () => <TagOptionsExample />
}`,...P.parameters?.docs?.source},description:{story:`Editable tag options using the default fixed insertion order.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <MailingListExample />,
  parameters: {
    docs: {
      description: {
        story: 'Exercises the empty state, add autofocus, one-column layout, duplicate records, blur validation, removing the last item, and the six-item boundary.'
      }
    }
  }
}`,...F.parameters?.docs?.source},description:{story:`A one-column collection that starts empty and validates fields after blur.`,...F.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <ExpenseAllocationsExample />,
  parameters: {
    docs: {
      description: {
        story: 'Exercises Selector and NumberInput alignment, fixed and proportional column widths, duplicate-item errors, field tooltips, and a collection-wide total.'
      }
    }
  }
}`,...R.parameters?.docs?.source},description:{story:`Mixed control types with item-level uniqueness and cross-list totals.`,...R.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <FamilyMemberDeclarationExample />,
  parameters: {
    docs: {
      description: {
        story: 'Exercises the intended three-field ceiling, TextInput, Selector, and DateInput alignment, a long international name, blur validation, duplicate-record validation, and non-reorderable semantics.'
      }
    }
  }
}`,...H.parameters?.docs?.source},description:{story:`Three simple fields per record in a declaration where order is immaterial.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(storyStyles.responsiveCanvas)}>
      <FamilyMemberDeclarationExample />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Exercises the 640px stacking breakpoint at a 600px container with all three field types, repeated labels, and non-reorderable top-aligned remove actions.'
      }
    }
  }
}`,...U.parameters?.docs?.source},description:{story:`Three fields at an intermediate width that must stack without overflow.`,...U.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsiveItineraryExample />,
  parameters: {
    docs: {
      description: {
        story: 'Exercises the 640px container breakpoint, 32px separation between stacked record groups, repeated labels, a long value, DateInput popovers, item-order validation, and reorder/remove controls aligned beside each record’s first field.'
      }
    }
  }
}`,...G.parameters?.docs?.source},description:{story:`The two-column editor at the component's narrow stacking breakpoint.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <StaticTagsExample isDisabled />,
  parameters: {
    docs: {
      description: {
        story: 'Sets \`aria-disabled\` on the group and disables each field, the reorder handle, the remove action, and Add. The values stay legible rather than being hidden, so a disabled list still communicates its contents.'
      }
    }
  }
}`,...K.parameters?.docs?.source},description:{story:`Every field and mutation control locked while the list stays readable.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <StaticTagsExample isLoading />,
  parameters: {
    docs: {
      description: {
        story: 'Sets \`aria-busy\` on the group and locks the same controls \`isDisabled\` does. Loading is distinct from disabled: it means the current values may still change, so an in-flight keyboard reorder is cancelled rather than committed.'
      }
    }
  }
}`,...q.parameters?.docs?.source},description:{story:`The list marked busy while an async operation settles.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(storyStyles.stack)}>
      <StaticTagsExample status={{
      type: 'error',
      message: 'Add at least five tag options.'
    }} />
      <StaticTagsExample status={{
      type: 'warning',
      message: 'Two tags share a colour, which may be hard to tell apart.'
    }} />
      <StaticTagsExample status={{
      type: 'success',
      message: 'All tag options are valid.'
    }} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'The other stories only exercise \`error\`. \`warning\` and \`success\` use the same list-level slot and are described by the group, so a screen reader reaches them from any field inside the list.'
      }
    }
  }
}`,...J.parameters?.docs?.source},description:{story:`The three list-level status types side by side.`,...J.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <StressExample />,
  parameters: {
    docs: {
      description: {
        story: 'Checks that column tracks stay stable as row count grows, that an over-long label cannot widen the row past its container, and that reorder stays usable when the list is taller than the viewport.'
      }
    }
  }
}`,...X.parameters?.docs?.source},description:{story:`Row volume and over-long values in one place.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(storyStyles.stack)}>
      <Theme theme={neutralTheme} mode="light">
        <div {...stylex.props(storyStyles.themePane)}>
          <Text weight="bold">Light</Text>
          <StaticTagsExample />
        </div>
      </Theme>
      <Theme theme={neutralTheme} mode="dark">
        <div {...stylex.props(storyStyles.themePane)}>
          <Text weight="bold">Dark</Text>
          <StaticTagsExample />
          <Theme theme={neutralTheme} mode="light">
            <div {...stylex.props(storyStyles.themePane)}>
              <Text weight="bold">Light nested inside dark</Text>
              <StaticTagsExample status={{
              type: 'error',
              message: 'Add at least five tags.'
            }} />
            </div>
          </Theme>
        </div>
      </Theme>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Pins both modes into one frame so a theme regression is visible without toggling the toolbar, and nests a light theme inside a dark one to confirm the component reads its colours from the nearest provider rather than the document root.'
      }
    }
  }
}`,...Z.parameters?.docs?.source},description:{story:`The same list pinned to light and dark, including a nested override.`,...Z.parameters?.docs?.description}}},Q=[`TagOptions`,`NonReorderable`,`EmptyMailingList`,`ExpenseAllocations`,`FamilyMemberDeclaration`,`ResponsiveFamilyMemberDeclaration`,`ResponsiveItinerary`,`Disabled`,`Loading`,`ValidationStatuses`,`Stress`,`ThemeMatrix`]})))()}$();export{K as Disabled,F as EmptyMailingList,R as ExpenseAllocations,H as FamilyMemberDeclaration,q as Loading,P as NonReorderable,U as ResponsiveFamilyMemberDeclaration,G as ResponsiveItinerary,X as Stress,N as TagOptions,Z as ThemeMatrix,J as ValidationStatuses,Q as __namedExportsOrder,A as default};