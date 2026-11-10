import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Button-DoGM0DEN.js";import{n as o,t as s}from"./HStack-D5idGciI.js";import{n as c,t as l}from"./TextInput-LGxpinPt.js";import{n as u,t as d}from"./Token-DiYqRCxg.js";import{n as f,t as p}from"./PowerSearch-BTjEYo4i.js";import{n as ee,t as te}from"./MagnifyingGlassIcon-D2pYO0WH.js";function m(e,t,n){return{key:e,label:t,group:n,defaultOperator:`contains`,operators:[{key:`contains`,label:`contains`,value:{type:`string`}},{key:`not_contains`,label:`does not contain`,value:{type:`string`}}]}}function h(e,t){return{key:e,label:t,group:`People`,defaultOperator:`any_of`,operators:[{key:`any_of`,label:`is any of`,value:{type:`entity_list`,searchSource:me}}]}}async function ne(e){await document.fonts.ready;let t=performance.now()+2e3;for(;e.style.getPropertyValue(`--_tokenizer-end-lane-reserve`)===``;){if(performance.now()>=t)throw Error(`Clear-all lane reserve was not measured`);await new Promise(e=>requestAnimationFrame(()=>e()))}await be()}function re(e){let t=e.querySelector(`.astryx-tokenizer`),n=t?.querySelector(`[role="combobox"]`),r=[...t?.querySelectorAll(`.astryx-token`)??[]];if(!t||!n||r.length!==ye.length)throw Error(`Token-row fixture did not render as expected`);return{wrapper:t,input:n,tokens:r}}function ie({filter:e,field:t,operator:n,maxLength:r,onClick:i,onRemove:a,isDisabled:o}){let s=e.value.type===`enum`?e.value.value:`?`;return(0,_.jsx)(d,{label:`${t.label}: ${n.label}`,endContent:(0,_.jsx)(`span`,{style:{fontWeight:600,color:{open:`#22c55e`,in_progress:`#3b82f6`,review:`#a855f7`,closed:`#6b7280`,blocked:`#ef4444`}[s]??`inherit`},children:s}),onClick:i?e=>{e.stopPropagation(),i()}:void 0,onRemove:a,isDisabled:o})}function ae({config:e,filter:t,mode:n,onSave:r,onCancel:i,saveButtonLabel:a,isReadOnly:o}){let c=t.value?.type===`integer`?t.value.value:50;return(0,_.jsxs)(`div`,{style:{padding:16},children:[(0,_.jsx)(`p`,{style:{margin:`0 0 12px`,fontSize:13},children:`Custom range editor for integer fields:`}),(0,_.jsxs)(s,{gap:2,vAlign:`center`,children:[(0,_.jsx)(`input`,{type:`range`,min:0,max:1e3,value:c,onChange:e=>{t.operator!=null&&r({field:t.field,operator:t.operator,value:{type:`integer`,value:Number(e.target.value)}})},style:{flex:1},disabled:o}),(0,_.jsx)(`span`,{style:{fontSize:12,whiteSpace:`nowrap`},children:c})]}),(0,_.jsx)(`div`,{style:{marginTop:12,display:`flex`,gap:8,justifyContent:`flex-end`},children:(0,_.jsx)(`button`,{onClick:i,children:`Cancel`})})]})}function oe({children:e}){return(0,_.jsx)(`div`,{style:{width:390,maxWidth:`100%`},children:e})}function se({filters:e}){return e.length===0?null:(0,_.jsx)(`pre`,{style:{marginTop:16,padding:12,borderRadius:8,fontSize:12,overflow:`auto`,maxWidth:390},children:JSON.stringify(e,null,2)})}function ce({value:e,onChange:t,placeholder:n,isDisabled:r}){return(0,_.jsx)(l,{label:`Code`,isLabelHidden:!0,value:e??``,placeholder:n,isDisabled:r,width:`100%`,onChange:e=>t(e===``?null:e.toUpperCase())})}function le(e,t){let n={type:e,minValue:0,units:t};return[{key:`eq`,label:`equals`,value:n},{key:`ne`,label:`does not equal`,value:n},{key:`gt`,label:`is greater than`,value:n},{key:`gte`,label:`is at least`,value:n},{key:`lt`,label:`is less than`,value:n},{key:`lte`,label:`is at most`,value:n},{key:`set`,label:`is set`,value:{type:`empty`}},{key:`unset`,label:`is not set`,value:{type:`empty`}}]}var g,_,v,y,ue,de,fe,b,x,pe,me,he,ge,_e,S,C,ve,ye,be,w,xe,T,Se,E,D,O,k,A,j,M,N,P,F,I,L,Ce,R,we,z,B,V,H,U,Te,W,G,Ee,K,q,De,Oe,J,Y,X,Z,Q,ke,Ae,je,Me,Ne,Pe,Fe,$,Ie;function Le(){return(Le=t((()=>{g=e(n()),f(),i(),ee(),c(),_=r(),u(),o(),v=[{value:`open`,label:`Open`},{value:`in_progress`,label:`In Progress`},{value:`review`,label:`In Review`},{value:`closed`,label:`Closed`},{value:`blocked`,label:`Blocked`}],y=[{value:`p0`,label:`P0 - Critical`},{value:`p1`,label:`P1 - High`},{value:`p2`,label:`P2 - Medium`},{value:`p3`,label:`P3 - Low`}],ue=[{value:`bug`,label:`Bug`},{value:`feature`,label:`Feature`},{value:`docs`,label:`Documentation`},{value:`perf`,label:`Performance`},{value:`security`,label:`Security`},{value:`ux`,label:`UX`},{value:`infra`,label:`Infrastructure`}],de=[{id:`user-1`,label:`Alice Johnson`,auxiliaryData:{photo:`https://i.pravatar.cc/150?u=alice`}},{id:`user-2`,label:`Bob Smith`,auxiliaryData:{photo:`https://i.pravatar.cc/150?u=bob`}},{id:`user-3`,label:`Charlie Brown`,auxiliaryData:{photo:`https://i.pravatar.cc/150?u=charlie`}},{id:`user-4`,label:`Diana Prince`,auxiliaryData:{photo:`https://i.pravatar.cc/150?u=diana`}},{id:`user-5`,label:`Eve Williams`,auxiliaryData:{photo:`https://i.pravatar.cc/150?u=eve`}},{id:`user-6`,label:`Frank Miller`,auxiliaryData:{photo:`https://i.pravatar.cc/150?u=frank`}}],fe={search:e=>de.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>de},b={name:`BasicSearch`,fields:[{key:`status`,label:`Status`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:v}},{key:`is_not`,label:`is not`,value:{type:`enum`,values:v}}]},{key:`title`,label:`Title`,defaultOperator:`contains`,operators:[{key:`contains`,label:`contains`,value:{type:`string`}},{key:`not_contains`,label:`does not contain`,value:{type:`string`}}]},{key:`priority`,label:`Priority`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:y}}]}]},x={name:`FullSearch`,fields:[{key:`status`,label:`Status`,defaultOperator:`any_of`,operators:[{key:`any_of`,label:`is any of`,value:{type:`enum_list`,values:v}},{key:`none_of`,label:`is none of`,value:{type:`enum_list`,values:v}}]},{key:`title`,label:`Title`,defaultOperator:`contains`,operators:[{key:`contains`,label:`contains`,value:{type:`string`}},{key:`not_contains`,label:`does not contain`,value:{type:`string`}}]},{key:`priority`,label:`Priority`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:y}}]},{key:`assignee`,label:`Assignee`,defaultOperator:`any_of`,typeaheadAliases:[`owner`,`assigned`],operators:[{key:`any_of`,label:`is any of`,value:{type:`entity_list`,searchSource:fe}},{key:`none_of`,label:`is none of`,value:{type:`entity_list`,searchSource:fe}}]},{key:`tags`,label:`Tags`,defaultOperator:`include`,operators:[{key:`include`,label:`include`,value:{type:`enum_list`,values:ue}},{key:`exclude`,label:`exclude`,value:{type:`enum_list`,values:ue}}]},{key:`line_count`,label:`Line count`,defaultOperator:`gt`,operators:[{key:`gt`,label:`is greater than`,value:{type:`integer`,minValue:0,maxValue:1e4,units:`lines`}},{key:`lt`,label:`is less than`,value:{type:`integer`,minValue:0,maxValue:1e4,units:`lines`}}]},{key:`cost`,label:`Cost`,defaultOperator:`gt`,operators:[{key:`gt`,label:`>`,value:{type:`float`,minValue:0,maxValue:1e5,units:`USD`}},{key:`lt`,label:`<`,value:{type:`float`,minValue:0,maxValue:1e5,units:`USD`}}]},{key:`created`,label:`Created`,defaultOperator:`after`,operators:[{key:`after`,label:`is after`,value:{type:`date_absolute`,isDateOnly:!0}},{key:`newer_than`,label:`is newer than`,value:{type:`date_relative`,isPastAllowed:!0,isFutureAllowed:!1}},{key:`between`,label:`is between`,value:{type:`date_range`}}]},{key:`ids`,label:`ID`,defaultOperator:`in`,operators:[{key:`in`,label:`is any of`,value:{type:`string_list`}}]},{key:`unread`,label:`Unread only`,defaultOperator:`yes`,operators:[{key:`yes`,label:``,value:{type:`empty`}}]}]},pe=Array.from({length:25},(e,t)=>({id:`person-${t+1}`,label:`Person ${String(t+1).padStart(2,`0`)}`})),me={search:e=>pe.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>pe},he={name:`IssueTrackerSearch`,fields:[{key:`status`,label:`Status`,defaultOperator:`any_of`,operators:[{key:`any_of`,label:`is any of`,value:{type:`enum_list`,values:v}}]},{key:`priority`,label:`Priority`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:y}}]},m(`title`,`Title`),m(`labels`,`Labels`),h(`owner`,`Owner`),h(`creator`,`Creator`),h(`subscriber`,`Subscriber`),h(`reviewer`,`Reviewer`),m(`project`,`Project`,`Planning`),m(`milestone`,`Milestone`,`Planning`),m(`sprint`,`Sprint`,`Planning`),m(`estimate`,`Estimate`,`Planning`),{key:`due_date`,label:`Due date`,group:`Planning`,defaultOperator:`before`,operators:[{key:`before`,label:`is before`,value:{type:`date_absolute`,isDateOnly:!0}}]},{key:`created`,label:`Created`,group:`Activity`,defaultOperator:`after`,operators:[{key:`after`,label:`is after`,value:{type:`date_absolute`,isDateOnly:!0}}]},{key:`updated`,label:`Updated`,group:`Activity`,defaultOperator:`after`,operators:[{key:`after`,label:`is after`,value:{type:`date_absolute`,isDateOnly:!0}}]},{key:`comment_count`,label:`Comment count`,group:`Activity`,defaultOperator:`gt`,operators:[{key:`gt`,label:`is greater than`,value:{type:`integer`,minValue:0}}]},m(`linked_items`,`Linked items`,`Activity`)]},ge={title:`Core/PowerSearch`,component:p,tags:[`autodocs`],decorators:[e=>(0,_.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 600px)`},children:(0,_.jsx)(e,{})})],argTypes:{placeholder:{control:`text`},isDisabled:{control:`boolean`},disabledMessage:{control:`text`,description:`Explains why the search is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (input stays blocked). Use this instead of wrapping a disabled PowerSearch in Tooltip.`},isReadOnly:{control:`boolean`},hasClear:{control:`boolean`},maxTokenLength:{control:`number`},maxSearchResults:{control:`number`,description:`Main ranked results shown after typing a query.`},maxOperatorMenuItems:{control:`number`,description:`Value results shown after selecting a field, such as people in the Owner picker.`},menuWidth:{control:`number`,description:`Main field/search menu width in pixels.`},popoverSaveButtonLabel:{control:`text`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Search input size`}}},_e={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Search by status, title, priority...`}},S={render:e=>{let[t,n]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}}]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},name:`Pre-set Filters`},C={render:e=>{let[t,n]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}},{field:`title`,operator:`contains`,value:{type:`string`,value:`aaaaaaaaaaaaa`}}]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},name:`Near-full Token Row`,play:async({canvasElement:e})=>{let t=e.querySelector(`.astryx-tokenizer`),n=t?.querySelector(`[role="combobox"]`),r=t?.querySelectorAll(`:scope > span`),i=r?.item(0),a=r?.item((r?.length??0)-1),o=t?.querySelector(`button[aria-label="Clear all"]`);if(!t||!n||!i||!a||!o)throw Error(`Near-full token-row fixture did not render as expected`);let s=matchMedia(`(pointer: coarse)`).matches;if(new URLSearchParams(window.location.search).get(`storyPlayPointer`)===`coarse`&&!s)throw Error(`Near-full token-row guard requires a coarse pointer`);await document.fonts.ready;let c=performance.now()+2e3;for(;t.style.getPropertyValue(`--_tokenizer-end-lane-reserve`)===``;){if(performance.now()>=c)throw Error(`Clear-all lane reserve was not measured`);await new Promise(e=>requestAnimationFrame(()=>e()))}await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let l=n.getBoundingClientRect(),u=i.getBoundingClientRect(),d=a.getBoundingClientRect(),f=o.getBoundingClientRect(),p={left:f.left,right:f.right};if(s){let e=[o,...o.querySelectorAll(`*`)].find(e=>getComputedStyle(e,`::after`).content!==`none`),t=e&&getComputedStyle(e,`::after`),n=Number.parseFloat(t?.left??``),r=Number.parseFloat(t?.right??``);if(!e||!Number.isFinite(n)||!Number.isFinite(r))throw Error(`Clear all did not expose its coarse-pointer hit area`);let i=e.getBoundingClientRect();p={left:i.left+n,right:i.right-r}}if(Math.abs(u.top-d.top)>.5)throw Error(`Fixture tokens wrapped before the empty combobox check: first token top ${u.top.toFixed(2)}, final token top ${d.top.toFixed(2)}`);let ee=n.getAttribute(`placeholder`);n.removeAttribute(`placeholder`);let te=n.getBoundingClientRect().top;if(ee!==null&&n.setAttribute(`placeholder`,ee),te<d.bottom)throw Error(`Fixture is no longer a nearly full token row: the in-flow editing input still fits beside the final token (input top ${te.toFixed(2)}, final token bottom ${d.bottom.toFixed(2)})`);if(l.top>=d.bottom)throw Error(`Empty combobox wrapped onto a blank row: input top ${l.top.toFixed(2)}, final token bottom ${d.bottom.toFixed(2)}`);if(l.width<=0)throw Error(`Empty combobox has no pointer hit target`);let m=Math.min(l.right,p.right)-Math.max(l.left,p.left);if(m>0)throw Error(`Empty combobox overlaps the coarse-pointer Clear all hit area by ${m.toFixed(2)}px`);let h=document.elementFromPoint(f.left+f.width/2,f.top+f.height/2);if(!h||!o.contains(h))throw Error(`Clear all center is hit-tested as ${h?.tagName??`nothing`}`);let ne=document.elementFromPoint(d.left+d.width/2,d.top+d.height/2);if(!ne||!a.contains(ne))throw Error(`Final token center is hit-tested as ${ne?.tagName??`nothing`}`);let re=l.top+l.height/2,ie=null;for(let e=Math.ceil(l.left);e<l.right;e+=1){let t=document.elementFromPoint(e+.5,re);if(t===n){ie=t;break}}if(!ie)throw Error(`Empty combobox has no exposed pointer hit target`);if(ie.dispatchEvent(new MouseEvent(`click`,{bubbles:!0})),document.activeElement!==n)throw Error(`Clicking the empty combobox did not focus it`)}},ve={...C,decorators:[e=>(0,_.jsx)(`div`,{dir:`rtl`,children:(0,_.jsx)(e,{})})],name:`Near-full Token Row (RTL)`},ye=[{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}},{field:`title`,operator:`contains`,value:{type:`string`,value:`release notes`}}],be=()=>new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e()))),w={render:e=>{let[t,n]=(0,g.useState)(ye);return(0,_.jsx)(`div`,{style:{width:600},children:(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e])})})},args:{placeholder:`Add more filters...`},name:`Default filters beside the search input`,play:async({canvasElement:e})=>{let{wrapper:t,input:n,tokens:r}=re(e);await ne(t);let i=t.getBoundingClientRect(),a=r.map(e=>e.getBoundingClientRect());if(new Set(a.map(e=>Math.round(e.top))).size!==1)throw Error(`Fixture tokens no longer share one row`);let o=i.left+i.width/2,s=Math.max(...a.map(e=>e.right)),c=Math.min(...a.map(e=>e.left));if(getComputedStyle(t).direction===`rtl`){if(c>o)throw Error(`Fixture tokens no longer reach the field center`)}else if(s<o)throw Error(`Fixture tokens no longer reach the field center`);let l=n.getBoundingClientRect();if(l.width<=0)throw Error(`The search input has no pointer hit target`);r.forEach((e,t)=>{let n=a[t],r=Math.min(n.right,l.right)-Math.max(n.left,l.left),i=Math.min(n.bottom,l.bottom)-Math.max(n.top,l.top);if(r>.5&&i>.5)throw Error(`Token "${e.textContent??``}" covers ${r.toFixed(2)}px of the search input`)});let u=document.elementFromPoint(l.left+l.width/2,l.top+l.height/2);if(u!==n)throw Error(`The search input's center is hit-tested as ${u?.tagName??`nothing`}${u?.getAttribute(`aria-label`)?` "${u.getAttribute(`aria-label`)}"`:``}`);if(u.dispatchEvent(new MouseEvent(`click`,{bubbles:!0})),document.activeElement!==n)throw Error(`Pressing the search input did not focus it`);n.blur()}},xe={...w,decorators:[e=>(0,_.jsx)(`div`,{dir:`rtl`,children:(0,_.jsx)(e,{})})],name:`Default filters beside the search input (RTL)`},T={render:e=>{let[t,n]=(0,g.useState)(ye.slice(0,2));return(0,_.jsx)(`div`,{style:{width:600},children:(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e])})})},args:{placeholder:`Add more filters...`},name:`Token row when resting styles win`,play:async({canvasElement:e})=>{let t=e.querySelector(`.astryx-tokenizer`),n=t?.querySelector(`[role="combobox"]`),r=[...t?.querySelectorAll(`.astryx-token`)??[]];if(!t||!n||r.length!==2)throw Error(`Token-row fixture did not render as expected`);if(await ne(t),!n.matches(`:placeholder-shown`))throw Error(`The empty search input does not match :placeholder-shown`);let i=new Set(n.classList),a=[],o=new Set,s=e=>{for(let t of e)if(t instanceof CSSLayerBlockRule)s(t.cssRules);else if(t instanceof CSSStyleRule)for(let e of t.selectorText.split(`,`)){let n=/^\.([\w-]+)((?::[\w-]+(?:\([^)]*\))?)*)$/.exec(e.trim());if(!n||!i.has(n[1]))continue;let r=n[2].replace(/:not\(#\\#\)/g,``);for(let e of t.style)r===``?a.push({className:n[1],property:e,value:t.style.getPropertyValue(e)}):r.includes(`:placeholder-shown`)&&o.add(e)}};for(let e of document.styleSheets)try{s(e.cssRules)}catch{}let c=a.filter(({property:e})=>o.has(e));if(c.length===0)throw Error(`No resting declaration of the search input has an empty-query override`);let l=t.getBoundingClientRect().height,u=document.createElement(`style`);document.head.append(u);try{for(let{className:e,property:i,value:a}of c){u.textContent=`.${CSS.escape(e)}{${i}:${a} !important}`,await be();let o=t.getBoundingClientRect().height,s=n.getBoundingClientRect(),c=r[r.length-1].getBoundingClientRect(),d=s.top+s.height/2;if(d<c.top||d>c.bottom)throw Error(`With the resting "${i}: ${a}" winning, the empty search input left the token row (input middle ${d.toFixed(2)}, row ${c.top.toFixed(2)}-${c.bottom.toFixed(2)})`);if(o>l+.5)throw Error(`With the resting "${i}: ${a}" winning, the field grew from ${l.toFixed(2)} to ${o.toFixed(2)}`)}}finally{u.remove()}}},Se={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:x,filters:t,onChange:(e,t,r)=>{n([...e])}}),t.length>0&&(0,_.jsx)(`pre`,{style:{marginTop:16,padding:12,backgroundColor:`#f5f5f5`,borderRadius:8,fontSize:12,overflow:`auto`},children:JSON.stringify(t,null,2)})]})},args:{placeholder:`Search...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Full Featured (All Field Types)`},E={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsx)(p,{...e,config:he,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Filter issues...`,hasAutoFocus:!0,maxSearchResults:2,maxOperatorMenuItems:2,menuWidth:700,presentation:`popover`},parameters:{docs:{description:{story:`A realistic issue-tracker field set. Open the empty search to browse ungrouped fields first, followed by optional People, Planning, and Activity sections. Typing switches back to a flat ranked list. Use maxSearchResults to cap the main ranked list; use maxOperatorMenuItems for values after selecting a field, such as Owner.`}}},decorators:[e=>(0,_.jsx)(`div`,{style:{width:500,minHeight:420},children:(0,_.jsx)(e,{})})],name:`Issue Tracker (Grouped Fields)`},D={render:e=>{let[t,n]=(0,g.useState)([{field:`status`,operator:`any_of`,value:{type:`enum_list`,value:[`open`,`in_progress`]}},{field:`tags`,operator:`include`,value:{type:`enum_list`,value:[`bug`,`security`]}}]);return(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Multi-value Filters`},O={render:e=>{let[t,n]=(0,g.useState)([{field:`assignee`,operator:`any_of`,value:{type:`entity_list`,value:[{id:`user-1`,label:`Alice Johnson`},{id:`user-3`,label:`Charlie Brown`}]}}]);return(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Entity Filters`},k={render:e=>{let[t,n]=(0,g.useState)([{field:`line_count`,operator:`gt`,value:{type:`integer`,value:100}},{field:`cost`,operator:`lt`,value:{type:`float`,value:500.5}}]);return(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Numeric Filters`},A={render:e=>{let[t,n]=(0,g.useState)([{field:`created`,operator:`between`,value:{type:`date_range`,value:{start:{type:`ABSOLUTE`,unixSeconds:Date.parse(`2026-01-05T00:00:00Z`)/1e3},end:{type:`ABSOLUTE`,unixSeconds:Date.parse(`2026-01-07T00:00:00Z`)/1e3}}}}]);return(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Date Filters`},j={render:e=>{let[t,n]=(0,g.useState)([{field:`unread`,operator:`yes`,value:{type:`empty`}}]);return(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Boolean / Empty Filters`},M={render:e=>{let t=[{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p0`}}];return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:()=>{},isReadOnly:!0})},args:{placeholder:`Search...`},name:`Read Only`},N={render:e=>{let t=[{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}}];return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:()=>{},isDisabled:!0})},args:{placeholder:`Search...`}},P={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e]),status:{type:`error`,message:`Invalid filter combination`}})},args:{placeholder:`Search...`},name:`With Error Status`},F={render:e=>{let[t,n]=(0,g.useState)([{field:`title`,operator:`contains`,value:{type:`string`,value:`test`}}]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e]),status:{type:`warning`,message:`Broad search may be slow`}})},args:{placeholder:`Search...`},name:`With Warning Status`},I={render:e=>{let[t,n]=(0,g.useState)([{field:`status`,operator:`any_of`,value:{type:`enum_list`,value:[`open`,`in_progress`]}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}},{field:`title`,operator:`contains`,value:{type:`string`,value:`login`}},{field:`assignee`,operator:`any_of`,value:{type:`entity_list`,value:[{id:`user-1`,label:`Alice Johnson`}]}},{field:`tags`,operator:`include`,value:{type:`enum_list`,value:[`bug`]}},{field:`line_count`,operator:`gt`,value:{type:`integer`,value:50}},{field:`created`,operator:`after`,value:{type:`date_absolute`,unixSeconds:Math.floor(new Date(`2025-06-01`).getTime()/1e3)}}]);return(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e])})},args:{placeholder:`Add more filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:800},children:(0,_.jsx)(e,{})})],name:`Many Filters`},L={render:e=>{let[t,n]=(0,g.useState)([]),[r,i]=(0,g.useState)([]);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:b,filters:t,onChange:(e,t,r)=>{n([...e]),i(n=>[...n,`${t} at index ${r} (${e.length} filters total)`])}}),r.length>0&&(0,_.jsxs)(`div`,{style:{marginTop:16,padding:12,backgroundColor:`#f5f5f5`,borderRadius:8,fontSize:12,maxHeight:200,overflow:`auto`},children:[(0,_.jsx)(`strong`,{children:`Change log:`}),(0,_.jsx)(`ul`,{style:{margin:`4px 0`,paddingInlineStart:20},children:r.map((e,t)=>(0,_.jsx)(`li`,{children:e},t))})]})]})},args:{placeholder:`Try adding, editing, and removing filters...`},name:`Change Tracking`},Ce={name:`NestedSearch`,fields:[{key:`status`,label:`Status`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:v}},{key:`is_not`,label:`is not`,value:{type:`enum`,values:v}}]},{key:`title`,label:`Title`,defaultOperator:`contains`,operators:[{key:`contains`,label:`contains`,value:{type:`string`}}]},{key:`priority`,label:`Priority`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:y}}]},{key:`or_group`,label:`Any of (OR)`,defaultOperator:`match_any`,operators:[{key:`match_any`,label:`match any`,value:{type:`nested`}}]},{key:`and_group`,label:`All of (AND)`,defaultOperator:`match_all`,operators:[{key:`match_all`,label:`match all`,value:{type:`nested`}}]}]},R={render:e=>{let[t,n]=(0,g.useState)([{field:`or_group`,operator:`match_any`,value:{type:`nested`,value:[{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}},{field:`status`,operator:`is`,value:{type:`enum`,value:`in_progress`}}]}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p0`}},{field:`and_group`,operator:`match_all`,value:{type:`nested`,value:[{field:`title`,operator:`contains`,value:{type:`string`,value:`login`}},{field:`status`,operator:`is_not`,value:{type:`enum`,value:`closed`}}]}}]);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:Ce,filters:t,onChange:e=>n([...e])}),t.length>0&&(0,_.jsx)(`pre`,{style:{marginTop:16,padding:12,backgroundColor:`#f5f5f5`,borderRadius:8,fontSize:12,overflow:`auto`},children:JSON.stringify(t,null,2)})]})},args:{placeholder:`Add filters...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Nested Filters`},we={name:`ContentSearch`,contentSearchFieldKey:`title`,fields:[{key:`title`,label:`Title`,defaultOperator:`contains`,operators:[{key:`contains`,label:`contains`,value:{type:`string`}},{key:`not_contains`,label:`does not contain`,value:{type:`string`}}]},{key:`status`,label:`Status`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:v}},{key:`is_not`,label:`is not`,value:{type:`enum`,values:v}}]},{key:`priority`,label:`Priority`,defaultOperator:`is`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:y}}]}]},z={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:we,filters:t,onChange:e=>n([...e])}),t.length>0&&(0,_.jsx)(`pre`,{style:{marginTop:16,padding:12,backgroundColor:`#f5f5f5`,borderRadius:8,fontSize:12,overflow:`auto`},children:JSON.stringify(t,null,2)})]})},args:{placeholder:`Type to search by title, or pick a field...`},name:`Content Search Field Key`},B={render:()=>{let[e,t]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}}]),[n,r]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}}]),[i,a]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}}]);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,_.jsx)(p,{label:`Small (28px)`,config:b,filters:e,onChange:e=>t([...e]),placeholder:`Small size`,size:`sm`}),(0,_.jsx)(p,{label:`Medium (32px)`,config:b,filters:n,onChange:e=>r([...e]),placeholder:`Medium size (default)`,size:`md`}),(0,_.jsx)(p,{label:`Large (36px)`,config:b,filters:i,onChange:e=>a([...e]),placeholder:`Large size`,size:`lg`})]})}},V={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e]),startIcon:te})},args:{label:`Search`,isLabelHidden:!0,placeholder:`Search...`},name:`With Start Icon`},H={render:e=>{let[t,n]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}}]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e]),resultCount:1234,startIcon:te})},args:{label:`Search`,isLabelHidden:!0,placeholder:`Search...`},name:`With Result Count`},U={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:e=>n([...e]),resultCount:42,endContent:(0,_.jsx)(a,{label:`Save`,variant:`primary`,size:`sm`,style:{height:`20px`}})})},args:{label:`Search`,isLabelHidden:!0,placeholder:`Search...`,size:`lg`},name:`With End Content and Result Count`},Te=[{field:`status`,operator:`any_of`,value:{type:`enum_list`,value:[`open`,`in_progress`]}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}},{field:`title`,operator:`contains`,value:{type:`string`,value:`login`}},{field:`assignee`,operator:`any_of`,value:{type:`entity_list`,value:[{id:`user-1`,label:`Alice Johnson`}]}},{field:`tags`,operator:`include`,value:{type:`enum_list`,value:[`bug`]}}],W={render:e=>{let[t,n]=(0,g.useState)(Te);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e]),tokenOverflowBehavior:`unfocusedInline`,presentation:`popover`}),(0,_.jsx)(`p`,{style:{marginTop:8},children:`This text will shift down when the search bar expands on focus.`})]})},args:{placeholder:`Add more filters...`},name:`Overflow Inline`},G={render:e=>{let[t,n]=(0,g.useState)(Te);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e]),tokenOverflowBehavior:`unfocusedLayer`,presentation:`popover`}),(0,_.jsx)(`p`,{style:{marginTop:8},children:`This text should not shift when the search bar expands on focus.`})]})},args:{placeholder:`Add more filters...`},name:`Overflow Layer`},Ee={enum:{Token:ie},integer:{Editor:ae}},K={render:e=>{let[t,n]=(0,g.useState)([{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}},{field:`line_count`,operator:`gt`,value:{type:`integer`,value:200}}]);return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n([...e]),components:Ee}),(0,_.jsxs)(`p`,{style:{marginTop:16,fontSize:13,color:`var(--color-text-secondary)`},children:[(0,_.jsx)(`strong`,{children:`Custom overrides:`}),` Status tokens show colored text (custom Token). Integer fields use a range slider editor (custom Editor).`]})]})},args:{placeholder:`Search with custom components...`},decorators:[e=>(0,_.jsx)(`div`,{style:{width:700},children:(0,_.jsx)(e,{})})],name:`Custom Components Map`},q={render:e=>{let t=[{field:`status`,operator:`is`,value:{type:`enum`,value:`open`}}];return(0,_.jsx)(p,{...e,config:b,filters:t,onChange:()=>{},isDisabled:!0,disabledMessage:`You need edit access to search`})},args:{placeholder:`Search...`}},De={render:()=>{let[e,t]=(0,g.useState)([]),[n,r]=(0,g.useState)([]);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:400},children:[(0,_.jsx)(p,{config:b,filters:e,onChange:e=>t([...e]),isLabelHidden:!1,label:`Attached (default)`,status:{type:`error`,message:`Add at least one filter`}}),(0,_.jsx)(p,{config:b,filters:n,onChange:e=>r([...e]),isLabelHidden:!1,label:`Detached`,status:{type:`error`,message:`Add at least one filter`},statusVariant:`detached`})]})}},Oe=[{field:`status`,operator:`any_of`,value:{type:`enum_list`,value:[`open`,`in_progress`]}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}},{field:`created`,operator:`after`,value:{type:`date_absolute`,unixSeconds:1710039600}}],J={render:e=>{let[t,n]=(0,g.useState)(Oe);return(0,_.jsxs)(oe,{children:[(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n(e),resultCount:Math.max(1,Math.round(240/(t.length+1))),timezoneID:`America/Los_Angeles`,presentation:`bottom-sheet`}),(0,_.jsx)(se,{filters:t})]})},name:`Bottom sheet (forced)`,parameters:{viewport:{defaultViewport:`mobile2`}}},Y={render:e=>{let[t,n]=(0,g.useState)(Oe);return(0,_.jsxs)(oe,{children:[(0,_.jsx)(p,{...e,config:x,filters:t,onChange:e=>n(e),timezoneID:`America/Los_Angeles`}),(0,_.jsx)(se,{filters:t})]})},name:`Adaptive (default)`},X={render:e=>{let[t,n]=(0,g.useState)([]);return(0,_.jsxs)(oe,{children:[(0,_.jsx)(p,{...e,config:we,filters:t,onChange:e=>n(e),placeholder:`Search issues…`,presentation:`bottom-sheet`}),(0,_.jsx)(se,{filters:t})]})},name:`Bottom sheet with content search`,parameters:{viewport:{defaultViewport:`mobile2`}}},Z={render:()=>{let[e,t]=(0,g.useState)([]);return(0,_.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 360px)`},children:(0,_.jsx)(p,{config:x,filters:e,onChange:e=>t(e),placeholder:`Filter issues by title, assignee, status, label or date...`,resultCount:128,presentation:`bottom-sheet`})})},name:`Bottom sheet with a long placeholder`},Q={render:()=>{let[e,t]=(0,g.useState)(Oe);return(0,_.jsx)(oe,{children:(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,_.jsx)(p,{config:x,filters:e,onChange:e=>t(e),label:`Read-only filters`,isLabelHidden:!1,isReadOnly:!0,resultCount:42,presentation:`bottom-sheet`}),(0,_.jsx)(p,{config:x,filters:e,onChange:e=>t(e),label:`Disabled filters`,isLabelHidden:!1,isDisabled:!0,disabledMessage:`Pick a project first`,presentation:`bottom-sheet`}),(0,_.jsx)(p,{config:x,filters:e,onChange:e=>t(e),label:`With a status`,isLabelHidden:!1,status:{type:`error`,message:`Add at least one filter`},startIcon:te,presentation:`bottom-sheet`})]})})},name:`Bottom sheet states`,parameters:{viewport:{defaultViewport:`mobile2`}}},ke=Array.from({length:60},(e,t)=>({value:`region_${t+1}`,label:`Region ${String(t+1).padStart(2,`0`)} · ${(t*7919%9e3).toLocaleString(`en-US`)} items`})),Ae=[`Draft`,`Submitted`,`In triage`,`Accepted`,`In progress`,`Blocked by dependency`,`In review`,`Ready to release`,`Released`,`Won’t do`,`Archived`].map((e,t)=>({value:`stage_${t}`,label:e})),je={search:async e=>(await new Promise(e=>setTimeout(e,150)),de.filter(t=>t.label.toLowerCase().includes(e.toLowerCase()))),bootstrap:()=>de},Me={search:e=>ue.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())).map(e=>({id:e.value,label:e.label})),bootstrap:()=>ue.map(e=>({id:e.value,label:e.label}))},Ne=[{key:`contains`,label:`contains`,value:{type:`string`}},{key:`not_contains`,label:`does not contain`,value:{type:`string`}},{key:`is`,label:`is exactly`,value:{type:`string`}},{key:`is_not`,label:`is not exactly`,value:{type:`string`}},{key:`starts`,label:`starts with`,value:{type:`string`}},{key:`ends`,label:`ends with`,value:{type:`string`}},{key:`any`,label:`is any of`,value:{type:`string_list`}},{key:`none`,label:`is none of`,value:{type:`string_list`}},{key:`set`,label:`is set`,value:{type:`empty`}},{key:`unset`,label:`is not set`,value:{type:`empty`}}],Pe={name:`RealisticSearch`,fields:[{key:`title`,label:`Title`,group:`Basics`,defaultOperator:`contains`,operators:Ne},{key:`stage`,label:`Stage`,group:`Basics`,description:`Where the item is in its workflow, from draft to archived.`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:Ae}},{key:`is_not`,label:`is not`,value:{type:`enum`,values:Ae}},{key:`any`,label:`is any of`,value:{type:`enum_list`,values:Ae}},{key:`none`,label:`is none of`,value:{type:`enum_list`,values:Ae}},{key:`set`,label:`is set`,value:{type:`empty`}},{key:`unset`,label:`is not set`,value:{type:`empty`}}]},{key:`priority`,label:`Priority`,group:`Basics`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:y}},{key:`is_not`,label:`is not`,value:{type:`enum`,values:y}},{key:`any`,label:`is any of`,value:{type:`enum_list`,values:y}},{key:`none`,label:`is none of`,value:{type:`enum_list`,values:y}}]},{key:`region`,label:`Primary delivery region`,group:`Basics`,operators:[{key:`is`,label:`is`,value:{type:`enum`,values:ke}},{key:`any`,label:`is any of`,value:{type:`enum_list`,values:ke}},{key:`none`,label:`is none of`,value:{type:`enum_list`,values:ke}}]},{key:`owner`,label:`Owner`,group:`People`,operators:[{key:`any`,label:`is any of`,value:{type:`entity_list`,searchSource:je}},{key:`none`,label:`is none of`,value:{type:`entity_list`,searchSource:je}},{key:`set`,label:`is set`,value:{type:`empty`}},{key:`unset`,label:`is not set`,value:{type:`empty`}}]},{key:`reviewer`,label:`Reviewer (searches as you type)`,group:`People`,operators:[{key:`is`,label:`is`,value:{type:`string`,searchSource:je}},{key:`is_not`,label:`is not`,value:{type:`string`,searchSource:je}}]},{key:`labels`,label:`Labels`,group:`People`,operators:[{key:`include`,label:`include`,value:{type:`string_list`,searchSource:Me,isArbitraryStringAllowed:!0}},{key:`exclude`,label:`exclude`,value:{type:`string_list`,searchSource:Me,isArbitraryStringAllowed:!0}}]},{key:`estimate`,label:`Estimate`,group:`Numbers`,operators:le(`integer`,`points`)},{key:`budget`,label:`Approved budget`,group:`Numbers`,description:`The amount approved at the last planning review, in US dollars.`,operators:le(`float`,`USD`)},{key:`created`,label:`Created`,group:`Dates`,operators:[{key:`on`,label:`is on`,value:{type:`date_absolute`,isDateOnly:!0}},{key:`before`,label:`is before`,value:{type:`date_absolute`,isDateOnly:!0}},{key:`after`,label:`is after`,value:{type:`date_absolute`,isDateOnly:!0}},{key:`within`,label:`is within the last`,value:{type:`date_relative`,isPastAllowed:!0,isFutureAllowed:!1}},{key:`between`,label:`is between`,value:{type:`date_range`}},{key:`set`,label:`is set`,value:{type:`empty`}}]},{key:`due`,label:`Due`,group:`Dates`,operators:[{key:`before`,label:`is before`,value:{type:`date_absolute`,isDateOnly:!1}},{key:`after`,label:`is after`,value:{type:`date_absolute`,isDateOnly:!1}},{key:`next`,label:`is within the next`,value:{type:`date_relative`,isPastAllowed:!1,isFutureAllowed:!0}},{key:`unset`,label:`is not set`,value:{type:`empty`}}]},{key:`window`,label:`Maintenance window`,group:`Dates`,operators:[{key:`between`,label:`is between`,value:{type:`date_range`}}]},{key:`start_time`,label:`Daily start time`,group:`Dates`,operators:[{key:`before`,label:`is before`,value:{type:`time`}},{key:`after`,label:`is after`,value:{type:`time`}}]},{key:`code`,label:`Cost center code`,group:`Other`,operators:[{key:`is`,label:`is`,value:{type:`custom`,Editor:ce,getString:e=>e}}]},{key:`flagged`,label:`Flagged for follow-up only`,group:`Other`,operators:[{key:`yes`,label:``,value:{type:`empty`}}]},{key:`notes`,label:`Notes`,group:`Other`,defaultOperator:`contains`,operators:Ne.slice(0,6)},{key:`any_of_group`,label:`Any of these conditions`,group:`Other`,operators:[{key:`match_any`,label:`match any`,value:{type:`nested`}},{key:`match_all`,label:`match all`,value:{type:`nested`}}]}]},Fe=[{field:`stage`,operator:`any`,value:{type:`enum_list`,value:[`stage_1`,`stage_4`,`stage_6`]}},{field:`priority`,operator:`is`,value:{type:`enum`,value:`p1`}}],$={render:e=>{let[t,n]=(0,g.useState)(Fe);return(0,_.jsxs)(oe,{children:[(0,_.jsx)(p,{...e,config:Pe,filters:t,onChange:e=>n(e),timezoneID:`America/Los_Angeles`,presentation:`bottom-sheet`}),(0,_.jsx)(se,{filters:t})]})},name:`Sheet presentation · realistic config`,parameters:{viewport:{defaultViewport:`mobile2`}}},_e.parameters={..._e.parameters,docs:{..._e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Search by status, title, priority...'
  }
}`,..._e.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }, {
      field: 'priority',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'p1'
      }
    }]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  name: 'Pre-set Filters'
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }, {
      field: 'priority',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'p1'
      }
    }, {
      field: 'title',
      operator: 'contains',
      value: {
        type: 'string',
        value: 'aaaaaaaaaaaaa'
      }
    }]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  name: 'Near-full Token Row',
  play: async ({
    canvasElement
  }) => {
    const wrapper = canvasElement.querySelector<HTMLElement>('.astryx-tokenizer');
    const input = wrapper?.querySelector<HTMLInputElement>('[role="combobox"]');
    const tokens = wrapper?.querySelectorAll<HTMLElement>(':scope > span');
    const firstToken = tokens?.item(0);
    const finalToken = tokens?.item((tokens?.length ?? 0) - 1);
    const clearButton = wrapper?.querySelector<HTMLButtonElement>('button[aria-label="Clear all"]');
    if (!wrapper || !input || !firstToken || !finalToken || !clearButton) {
      throw new Error('Near-full token-row fixture did not render as expected');
    }
    const isCoarsePointer = matchMedia('(pointer: coarse)').matches;
    const requiresCoarsePointer = new URLSearchParams(window.location.search).get('storyPlayPointer') === 'coarse';
    if (requiresCoarsePointer && !isCoarsePointer) {
      throw new Error('Near-full token-row guard requires a coarse pointer');
    }
    await document.fonts.ready;
    const reserveDeadline = performance.now() + 2000;
    while (wrapper.style.getPropertyValue('--_tokenizer-end-lane-reserve') === '') {
      if (performance.now() >= reserveDeadline) {
        throw new Error('Clear-all lane reserve was not measured');
      }
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const inputRect = input.getBoundingClientRect();
    const firstTokenRect = firstToken.getBoundingClientRect();
    const tokenRect = finalToken.getBoundingClientRect();
    const clearRect = clearButton.getBoundingClientRect();
    let clearHitRect = {
      left: clearRect.left,
      right: clearRect.right
    };
    if (isCoarsePointer) {
      // Button draws its touch band as the \`::after\` of an element inside
      // it, so find whichever element in the button carries the band.
      const bandHost = [clearButton, ...clearButton.querySelectorAll('*')].find(element => getComputedStyle(element, '::after').content !== 'none');
      const bandStyle = bandHost && getComputedStyle(bandHost, '::after');
      const bandLeft = Number.parseFloat(bandStyle?.left ?? '');
      const bandRight = Number.parseFloat(bandStyle?.right ?? '');
      if (!bandHost || !Number.isFinite(bandLeft) || !Number.isFinite(bandRight)) {
        throw new Error('Clear all did not expose its coarse-pointer hit area');
      }
      const bandHostRect = bandHost.getBoundingClientRect();
      clearHitRect = {
        left: bandHostRect.left + bandLeft,
        right: bandHostRect.right - bandRight
      };
    }
    if (Math.abs(firstTokenRect.top - tokenRect.top) > 0.5) {
      throw new Error(\`Fixture tokens wrapped before the empty combobox check: first token top \${firstTokenRect.top.toFixed(2)}, final token top \${tokenRect.top.toFixed(2)}\`);
    }
    // Fail closed if token metrics drift: the row is only "nearly full" while
    // the ordinary in-flow editing input (the typed-query layout) cannot fit
    // beside the final token. Without a placeholder the input never matches
    // :placeholder-shown, so it lays out exactly as it does once typing starts.
    const placeholderAttribute = input.getAttribute('placeholder');
    input.removeAttribute('placeholder');
    const inFlowInputTop = input.getBoundingClientRect().top;
    if (placeholderAttribute !== null) {
      input.setAttribute('placeholder', placeholderAttribute);
    }
    if (inFlowInputTop < tokenRect.bottom) {
      throw new Error(\`Fixture is no longer a nearly full token row: the in-flow editing input still fits beside the final token (input top \${inFlowInputTop.toFixed(2)}, final token bottom \${tokenRect.bottom.toFixed(2)})\`);
    }
    if (inputRect.top >= tokenRect.bottom) {
      throw new Error(\`Empty combobox wrapped onto a blank row: input top \${inputRect.top.toFixed(2)}, final token bottom \${tokenRect.bottom.toFixed(2)}\`);
    }
    if (inputRect.width <= 0) {
      throw new Error('Empty combobox has no pointer hit target');
    }
    const overlap = Math.min(inputRect.right, clearHitRect.right) - Math.max(inputRect.left, clearHitRect.left);
    if (overlap > 0) {
      throw new Error(\`Empty combobox overlaps the coarse-pointer Clear all hit area by \${overlap.toFixed(2)}px\`);
    }
    const clearHitTarget = document.elementFromPoint(clearRect.left + clearRect.width / 2, clearRect.top + clearRect.height / 2);
    if (!clearHitTarget || !clearButton.contains(clearHitTarget)) {
      throw new Error(\`Clear all center is hit-tested as \${clearHitTarget?.tagName ?? 'nothing'}\`);
    }
    const tokenHitTarget = document.elementFromPoint(tokenRect.left + tokenRect.width / 2, tokenRect.top + tokenRect.height / 2);
    if (!tokenHitTarget || !finalToken.contains(tokenHitTarget)) {
      throw new Error(\`Final token center is hit-tested as \${tokenHitTarget?.tagName ?? 'nothing'}\`);
    }
    const hitY = inputRect.top + inputRect.height / 2;
    let inputHitTarget: Element | null = null;
    for (let x = Math.ceil(inputRect.left); x < inputRect.right; x += 1) {
      const candidate = document.elementFromPoint(x + 0.5, hitY);
      if (candidate === input) {
        inputHitTarget = candidate;
        break;
      }
    }
    if (!inputHitTarget) {
      throw new Error('Empty combobox has no exposed pointer hit target');
    }
    inputHitTarget.dispatchEvent(new MouseEvent('click', {
      bubbles: true
    }));
    if (document.activeElement !== input) {
      throw new Error('Clicking the empty combobox did not focus it');
    }
  }
}`,...C.parameters?.docs?.source},description:{story:`A nearly full token row keeps its empty combobox on that row instead of
growing the field with a blank trailing row. Typing still restores the
input's normal editing width and may wrap visibly when space is exhausted.`,...C.parameters?.docs?.description}}},ve.parameters={...ve.parameters,docs:{...ve.parameters?.docs,source:{originalSource:`{
  ...NearFullTokenRow,
  decorators: [Story => <div dir="rtl">
        <Story />
      </div>],
  name: 'Near-full Token Row (RTL)'
}`,...ve.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState(tokenRowGuardFilters);
    return <div style={{
      width: 600
    }}>
        <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />
      </div>;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  name: 'Default filters beside the search input',
  play: async ({
    canvasElement
  }) => {
    const {
      wrapper,
      input,
      tokens
    } = tokenRowParts(canvasElement);
    await waitForTokenRow(wrapper);
    const field = wrapper.getBoundingClientRect();
    const tokenRects = tokens.map(token => token.getBoundingClientRect());
    if (new Set(tokenRects.map(rect => Math.round(rect.top))).size !== 1) {
      throw new Error('Fixture tokens no longer share one row');
    }
    // Fail closed if the fixture stops covering the field's middle, where a
    // test or a person would naturally press the search input.
    const fieldCenter = field.left + field.width / 2;
    const tokenEnd = Math.max(...tokenRects.map(rect => rect.right));
    const tokenStart = Math.min(...tokenRects.map(rect => rect.left));
    if (getComputedStyle(wrapper).direction === 'rtl') {
      if (tokenStart > fieldCenter) {
        throw new Error('Fixture tokens no longer reach the field center');
      }
    } else if (tokenEnd < fieldCenter) {
      throw new Error('Fixture tokens no longer reach the field center');
    }
    const inputRect = input.getBoundingClientRect();
    if (inputRect.width <= 0) {
      throw new Error('The search input has no pointer hit target');
    }
    tokens.forEach((token, index) => {
      const rect = tokenRects[index];
      const overlapX = Math.min(rect.right, inputRect.right) - Math.max(rect.left, inputRect.left);
      const overlapY = Math.min(rect.bottom, inputRect.bottom) - Math.max(rect.top, inputRect.top);
      if (overlapX > 0.5 && overlapY > 0.5) {
        throw new Error(\`Token "\${token.textContent ?? ''}" covers \${overlapX.toFixed(2)}px of the search input\`);
      }
    });
    const hit = document.elementFromPoint(inputRect.left + inputRect.width / 2, inputRect.top + inputRect.height / 2);
    if (hit !== input) {
      throw new Error(\`The search input's center is hit-tested as \${hit?.tagName ?? 'nothing'}\${hit?.getAttribute('aria-label') ? \` "\${hit.getAttribute('aria-label')}"\` : ''}\`);
    }
    hit.dispatchEvent(new MouseEvent('click', {
      bubbles: true
    }));
    if (document.activeElement !== input) {
      throw new Error('Pressing the search input did not focus it');
    }
    input.blur();
  }
}`,...w.parameters?.docs?.source},description:{story:`Default filters fill more than half of the field, and the search input
stays beside them: no token paints over it, and pressing the input's
center reaches the input rather than a token.`,...w.parameters?.docs?.description}}},xe.parameters={...xe.parameters,docs:{...xe.parameters?.docs,source:{originalSource:`{
  ...DefaultFiltersBesideSearch,
  decorators: [Story => <div dir="rtl">
        <Story />
      </div>],
  name: 'Default filters beside the search input (RTL)'
}`,...xe.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState(tokenRowGuardFilters.slice(0, 2));
    return <div style={{
      width: 600
    }}>
        <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />
      </div>;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  name: 'Token row when resting styles win',
  play: async ({
    canvasElement
  }) => {
    const wrapper = canvasElement.querySelector<HTMLElement>('.astryx-tokenizer');
    const input = wrapper?.querySelector<HTMLInputElement>('[role="combobox"]');
    const tokens = [...(wrapper?.querySelectorAll<HTMLElement>('.astryx-token') ?? [])];
    if (!wrapper || !input || tokens.length !== 2) {
      throw new Error('Token-row fixture did not render as expected');
    }
    await waitForTokenRow(wrapper);
    if (!input.matches(':placeholder-shown')) {
      throw new Error('The empty search input does not match :placeholder-shown');
    }

    // The input's own atomic rules, split into resting and empty-query ones.
    const ownClasses = new Set(input.classList);
    const resting: Array<{
      className: string;
      property: string;
      value: string;
    }> = [];
    const emptyQueryProperties = new Set<string>();
    const visit = (rules: CSSRuleList) => {
      for (const rule of rules) {
        if (rule instanceof CSSLayerBlockRule) {
          visit(rule.cssRules);
          continue;
        }
        if (!(rule instanceof CSSStyleRule)) {
          continue;
        }
        for (const selector of rule.selectorText.split(',')) {
          const match = /^\\.([\\w-]+)((?::[\\w-]+(?:\\([^)]*\\))?)*)$/.exec(selector.trim());
          if (!match || !ownClasses.has(match[1])) {
            continue;
          }
          const pseudo = match[2].replace(/:not\\(#\\\\#\\)/g, '');
          for (const property of rule.style) {
            if (pseudo === '') {
              resting.push({
                className: match[1],
                property,
                value: rule.style.getPropertyValue(property)
              });
            } else if (pseudo.includes(':placeholder-shown')) {
              emptyQueryProperties.add(property);
            }
          }
        }
      }
    };
    for (const sheet of document.styleSheets) {
      try {
        visit(sheet.cssRules);
      } catch {
        // A cross-origin sheet cannot style the input's own classes.
      }
    }
    const contested = resting.filter(({
      property
    }) => emptyQueryProperties.has(property));
    // Fail closed: with no resting declaration that an empty-query rule
    // overrides, the loop below would prove nothing.
    if (contested.length === 0) {
      throw new Error('No resting declaration of the search input has an empty-query override');
    }
    const restingHeight = wrapper.getBoundingClientRect().height;
    const override = document.createElement('style');
    document.head.append(override);
    try {
      for (const {
        className,
        property,
        value
      } of contested) {
        override.textContent = \`.\${CSS.escape(className)}{\${property}:\${value} !important}\`;
        await settleFrames();
        const height = wrapper.getBoundingClientRect().height;
        const inputRect = input.getBoundingClientRect();
        const row = tokens[tokens.length - 1].getBoundingClientRect();
        const inputMiddle = inputRect.top + inputRect.height / 2;
        if (inputMiddle < row.top || inputMiddle > row.bottom) {
          throw new Error(\`With the resting "\${property}: \${value}" winning, the empty search input left the token row (input middle \${inputMiddle.toFixed(2)}, row \${row.top.toFixed(2)}-\${row.bottom.toFixed(2)})\`);
        }
        if (height > restingHeight + 0.5) {
          throw new Error(\`With the resting "\${property}: \${value}" winning, the field grew from \${restingHeight.toFixed(2)} to \${height.toFixed(2)}\`);
        }
      }
    } finally {
      override.remove();
    }
  }
}`,...T.parameters?.docs?.source},description:{story:`An app that compiles its own StyleX can emit the same atomic class as the
search input's resting styles, unlayered, so it outranks the input's
layered empty-query styles. Whichever single resting declaration wins that
way, the empty input stays on the token row: the field never grows a
blank row under its filters.`,...T.parameters?.docs?.description}}},Se.parameters={...Se.parameters,docs:{...Se.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <div>
        <PowerSearch {...args} config={fullConfig} filters={filters} onChange={(newFilters, _changeType, _index) => {
        setFilters([...newFilters]);
      }} />
        {filters.length > 0 && <pre style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        fontSize: 12,
        overflow: 'auto'
      }}>
            {JSON.stringify(filters, null, 2)}
          </pre>}
      </div>;
  },
  args: {
    placeholder: 'Search...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Full Featured (All Field Types)'
}`,...Se.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <PowerSearch {...args} config={issueTrackerConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Filter issues...',
    hasAutoFocus: true,
    maxSearchResults: 2,
    maxOperatorMenuItems: 2,
    menuWidth: 700,
    presentation: 'popover'
  },
  parameters: {
    docs: {
      description: {
        story: 'A realistic issue-tracker field set. Open the empty search to browse ungrouped fields first, followed by optional People, Planning, and Activity sections. Typing switches back to a flat ranked list. Use maxSearchResults to cap the main ranked list; use maxOperatorMenuItems for values after selecting a field, such as Owner.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: 500,
    minHeight: 420
  }}>
        <Story />
      </div>],
  name: 'Issue Tracker (Grouped Fields)'
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'any_of',
      value: {
        type: 'enum_list',
        value: ['open', 'in_progress']
      }
    }, {
      field: 'tags',
      operator: 'include',
      value: {
        type: 'enum_list',
        value: ['bug', 'security']
      }
    }]);
    return <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Multi-value Filters'
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'assignee',
      operator: 'any_of',
      value: {
        type: 'entity_list',
        value: [{
          id: 'user-1',
          label: 'Alice Johnson'
        }, {
          id: 'user-3',
          label: 'Charlie Brown'
        }]
      }
    }]);
    return <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Entity Filters'
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'line_count',
      operator: 'gt',
      value: {
        type: 'integer',
        value: 100
      }
    }, {
      field: 'cost',
      operator: 'lt',
      value: {
        type: 'float',
        value: 500.5
      }
    }]);
    return <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Numeric Filters'
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'created',
      operator: 'between',
      value: {
        type: 'date_range',
        value: {
          start: {
            type: 'ABSOLUTE',
            unixSeconds: Date.parse('2026-01-05T00:00:00Z') / 1000
          },
          end: {
            type: 'ABSOLUTE',
            unixSeconds: Date.parse('2026-01-07T00:00:00Z') / 1000
          }
        }
      }
    }]);
    return <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Date Filters'
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'unread',
      operator: 'yes',
      value: {
        type: 'empty'
      }
    }]);
    return <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Boolean / Empty Filters'
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const filters: PowerSearchFilter[] = [{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }, {
      field: 'priority',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'p0'
      }
    }];
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={() => {}} isReadOnly />;
  },
  args: {
    placeholder: 'Search...'
  },
  name: 'Read Only'
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const filters: PowerSearchFilter[] = [{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }];
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={() => {}} isDisabled />;
  },
  args: {
    placeholder: 'Search...'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} status={{
      type: 'error',
      message: 'Invalid filter combination'
    }} />;
  },
  args: {
    placeholder: 'Search...'
  },
  name: 'With Error Status'
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'title',
      operator: 'contains',
      value: {
        type: 'string',
        value: 'test'
      }
    }]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} status={{
      type: 'warning',
      message: 'Broad search may be slow'
    }} />;
  },
  args: {
    placeholder: 'Search...'
  },
  name: 'With Warning Status'
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'any_of',
      value: {
        type: 'enum_list',
        value: ['open', 'in_progress']
      }
    }, {
      field: 'priority',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'p1'
      }
    }, {
      field: 'title',
      operator: 'contains',
      value: {
        type: 'string',
        value: 'login'
      }
    }, {
      field: 'assignee',
      operator: 'any_of',
      value: {
        type: 'entity_list',
        value: [{
          id: 'user-1',
          label: 'Alice Johnson'
        }]
      }
    }, {
      field: 'tags',
      operator: 'include',
      value: {
        type: 'enum_list',
        value: ['bug']
      }
    }, {
      field: 'line_count',
      operator: 'gt',
      value: {
        type: 'integer',
        value: 50
      }
    }, {
      field: 'created',
      operator: 'after',
      value: {
        type: 'date_absolute',
        unixSeconds: Math.floor(new Date('2025-06-01').getTime() / 1000)
      }
    }]);
    return <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  decorators: [Story => <div style={{
    width: 800
  }}>
        <Story />
      </div>],
  name: 'Many Filters'
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    const [log, setLog] = useState<string[]>([]);
    return <div>
        <PowerSearch {...args} config={basicConfig} filters={filters} onChange={(newFilters, changeType, index) => {
        setFilters([...newFilters]);
        setLog(prev => [...prev, \`\${changeType} at index \${index} (\${newFilters.length} filters total)\`]);
      }} />
        {log.length > 0 && <div style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        fontSize: 12,
        maxHeight: 200,
        overflow: 'auto'
      }}>
            <strong>Change log:</strong>
            <ul style={{
          margin: '4px 0',
          paddingInlineStart: 20
        }}>
              {log.map((entry, i) => <li key={i}>{entry}</li>)}
            </ul>
          </div>}
      </div>;
  },
  args: {
    placeholder: 'Try adding, editing, and removing filters...'
  },
  name: 'Change Tracking'
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'or_group',
      operator: 'match_any',
      value: {
        type: 'nested',
        value: [{
          field: 'status',
          operator: 'is',
          value: {
            type: 'enum',
            value: 'open'
          }
        }, {
          field: 'status',
          operator: 'is',
          value: {
            type: 'enum',
            value: 'in_progress'
          }
        }]
      }
    }, {
      field: 'priority',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'p0'
      }
    }, {
      field: 'and_group',
      operator: 'match_all',
      value: {
        type: 'nested',
        value: [{
          field: 'title',
          operator: 'contains',
          value: {
            type: 'string',
            value: 'login'
          }
        }, {
          field: 'status',
          operator: 'is_not',
          value: {
            type: 'enum',
            value: 'closed'
          }
        }]
      }
    }]);
    return <div>
        <PowerSearch {...args} config={nestedConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />
        {filters.length > 0 && <pre style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        fontSize: 12,
        overflow: 'auto'
      }}>
            {JSON.stringify(filters, null, 2)}
          </pre>}
      </div>;
  },
  args: {
    placeholder: 'Add filters...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Nested Filters'
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <div>
        <PowerSearch {...args} config={contentSearchConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} />
        {filters.length > 0 && <pre style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        fontSize: 12,
        overflow: 'auto'
      }}>
            {JSON.stringify(filters, null, 2)}
          </pre>}
      </div>;
  },
  args: {
    placeholder: 'Type to search by title, or pick a field...'
  },
  name: 'Content Search Field Key'
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [smFilters, setSmFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }]);
    const [mdFilters, setMdFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }]);
    const [lgFilters, setLgFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <PowerSearch label="Small (28px)" config={basicConfig} filters={smFilters} onChange={newFilters => setSmFilters([...newFilters])} placeholder="Small size" size="sm" />
        <PowerSearch label="Medium (32px)" config={basicConfig} filters={mdFilters} onChange={newFilters => setMdFilters([...newFilters])} placeholder="Medium size (default)" size="md" />
        <PowerSearch label="Large (36px)" config={basicConfig} filters={lgFilters} onChange={newFilters => setLgFilters([...newFilters])} placeholder="Large size" size="lg" />
      </div>;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} startIcon={MagnifyingGlassIcon} />;
  },
  args: {
    label: 'Search',
    isLabelHidden: true,
    placeholder: 'Search...'
  },
  name: 'With Start Icon'
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} resultCount={1234} startIcon={MagnifyingGlassIcon} />;
  },
  args: {
    label: 'Search',
    isLabelHidden: true,
    placeholder: 'Search...'
  },
  name: 'With Result Count'
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([]);
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} resultCount={42} endContent={<Button label="Save" variant="primary" size="sm" style={{
      height: '20px'
    }} />} />;
  },
  args: {
    label: 'Search',
    isLabelHidden: true,
    placeholder: 'Search...',
    size: 'lg'
  },
  name: 'With End Content and Result Count'
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>(overflowFilters);
    return <div>
        <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} tokenOverflowBehavior="unfocusedInline" presentation="popover" />
        <p style={{
        marginTop: 8
      }}>
          This text will shift down when the search bar expands on focus.
        </p>
      </div>;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  name: 'Overflow Inline'
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>(overflowFilters);
    return <div>
        <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} tokenOverflowBehavior="unfocusedLayer" presentation="popover" />
        <p style={{
        marginTop: 8
      }}>
          This text should not shift when the search bar expands on focus.
        </p>
      </div>;
  },
  args: {
    placeholder: 'Add more filters...'
  },
  name: 'Overflow Layer'
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<PowerSearchFilter[]>([{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }, {
      field: 'line_count',
      operator: 'gt',
      value: {
        type: 'integer',
        value: 200
      }
    }]);
    return <div>
        <PowerSearch {...args} config={fullConfig} filters={filters} onChange={newFilters => setFilters([...newFilters])} components={customComponents} />
        <p style={{
        marginTop: 16,
        fontSize: 13,
        color: 'var(--color-text-secondary)'
      }}>
          <strong>Custom overrides:</strong> Status tokens show colored text
          (custom Token). Integer fields use a range slider editor (custom
          Editor).
        </p>
      </div>;
  },
  args: {
    placeholder: 'Search with custom components...'
  },
  decorators: [Story => <div style={{
    width: 700
  }}>
        <Story />
      </div>],
  name: 'Custom Components Map'
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => {
    const filters: PowerSearchFilter[] = [{
      field: 'status',
      operator: 'is',
      value: {
        type: 'enum',
        value: 'open'
      }
    }];
    return <PowerSearch {...args} config={basicConfig} filters={filters} onChange={() => {}} isDisabled disabledMessage="You need edit access to search" />;
  },
  args: {
    placeholder: 'Search...'
  }
}`,...q.parameters?.docs?.source}}},De.parameters={...De.parameters,docs:{...De.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<PowerSearchFilter[]>([]);
    const [b, setB] = useState<PowerSearchFilter[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 400
    }}>
        <PowerSearch config={basicConfig} filters={a} onChange={newFilters => setA([...newFilters])} isLabelHidden={false} label="Attached (default)" status={{
        type: 'error',
        message: 'Add at least one filter'
      }} />
        <PowerSearch config={basicConfig} filters={b} onChange={newFilters => setB([...newFilters])} isLabelHidden={false} label="Detached" status={{
        type: 'error',
        message: 'Add at least one filter'
      }} statusVariant="detached" />
      </div>;
  }
}`,...De.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>(sheetPresetFilters);
    return <PhoneFrame>
        <PowerSearch {...args} config={fullConfig} filters={filters} onChange={next => setFilters(next)}
      // A count that follows the filters, so a commit from the flow (and
      // Clear all) changes it and the flow announces the change.
      resultCount={Math.max(1, Math.round(240 / (filters.length + 1)))} timezoneID="America/Los_Angeles" presentation="bottom-sheet" />
        <FilterDump filters={filters} />
      </PhoneFrame>;
  },
  name: 'Bottom sheet (forced)',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}`,...J.parameters?.docs?.source},description:{story:`\`presentation="bottom-sheet"\`: the field is one trigger
with display-only tokens; a tap opens the Filters sheet, whose rows edit or
remove a filter, Add filter opens above it with the fields, and the value
step opens above that and stages operator → value. Dismissing a step
reveals the one beneath. Clear all asks first. List values (Assignee, Tags)
open the Tokenizer's own sheet above the step.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>(sheetPresetFilters);
    return <PhoneFrame>
        <PowerSearch {...args} config={fullConfig} filters={filters} onChange={next => setFilters(next)} timezoneID="America/Los_Angeles" />
        <FilterDump filters={filters} />
      </PhoneFrame>;
  },
  name: 'Adaptive (default)'
}`,...Y.parameters?.docs?.source},description:{story:`The default presentation, \`adaptive\`: the sheet flow on a compact
coarse-pointer screen, the tokenizer field and editor popover otherwise.
Resize the viewport or switch the pointer emulation to see it switch.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>([]);
    return <PhoneFrame>
        <PowerSearch {...args} config={contentSearchConfig} filters={filters} onChange={next => setFilters(next)} placeholder="Search issues…" presentation="bottom-sheet" />
        <FilterDump filters={filters} />
      </PhoneFrame>;
  },
  name: 'Bottom sheet with content search',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}`,...X.parameters?.docs?.source},description:{story:`With \`contentSearchFieldKey\`, Add filter carries the content search: the
field typeahead's suggestions list inline under the search box, and a value
suggestion commits a filter straight away.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>([]);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 360px)'
    }}>
        <PowerSearch config={fullConfig} filters={filters} onChange={next => setFilters(next)} placeholder="Filter issues by title, assignee, status, label or date..." resultCount={128} presentation="bottom-sheet" />
      </div>;
  },
  name: 'Bottom sheet with a long placeholder'
}`,...Z.parameters?.docs?.source},description:{story:`A placeholder longer than the trigger ends in an ellipsis inside it and
stays clear of the result count at every width. The grid column sizes the
field, so a test can narrow it.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>(sheetPresetFilters);
    return <PhoneFrame>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
          <PowerSearch config={fullConfig} filters={filters} onChange={next => setFilters(next)} label="Read-only filters" isLabelHidden={false} isReadOnly resultCount={42} presentation="bottom-sheet" />
          <PowerSearch config={fullConfig} filters={filters} onChange={next => setFilters(next)} label="Disabled filters" isLabelHidden={false} isDisabled disabledMessage="Pick a project first" presentation="bottom-sheet" />
          <PowerSearch config={fullConfig} filters={filters} onChange={next => setFilters(next)} label="With a status" isLabelHidden={false} status={{
          type: 'error',
          message: 'Add at least one filter'
        }} startIcon={MagnifyingGlassIcon} presentation="bottom-sheet" />
        </div>
      </PhoneFrame>;
  },
  name: 'Bottom sheet states',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}`,...Q.parameters?.docs?.source},description:{story:`Read-only keeps the Filters sheet as plain rows with Done only; disabled
keeps the trigger focusable (aria-disabled) and shows its reason; the result
count renders at the end of the field in both presentations.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>(realisticPresetFilters);
    return <PhoneFrame>
        <PowerSearch {...args} config={realisticConfig} filters={filters} onChange={next => setFilters(next)} timezoneID="America/Los_Angeles" presentation="bottom-sheet" />
        <FilterDump filters={filters} />
      </PhoneFrame>;
  },
  name: 'Sheet presentation · realistic config',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}`,...$.parameters?.docs?.source},description:{story:`The bottom-sheet presentation with a config sized like real product filter
bars, covering every value type PowerSearch edits: text with ten operators,
a text field that searches as you type, text lists, single and multiple
choice (11 and 60 options), people, whole and decimal numbers with units,
dates with and without a time, relative dates past and future, date
ranges, a time of day, a custom editor, a one-tap filter, and a nested
group.`,...$.parameters?.docs?.description}}},Ie=`Default.WithPresetFilters.NearFullTokenRow.NearFullTokenRowRTL.DefaultFiltersBesideSearch.DefaultFiltersBesideSearchRTL.TokenRowWhenRestingStylesWin.FullFeatured.IssueTracker.WithEnumListFilters.WithEntityFilters.WithNumericFilters.WithDateFilters.WithEmptyFilter.ReadOnly.Disabled.WithError.WithWarning.ManyFilters.WithOnChangeTracking.WithNestedFilters.WithContentSearchFieldKey.SizeVariants.WithStartIcon.WithResultCount.WithEndContentPowerSearch.OverflowInline.OverflowLayer.WithCustomComponents.DisabledWithMessage.StatusVariantComparison.SheetPresentation.AdaptivePresentation.SheetPresentationContentSearch.SheetPresentationLongPlaceholder.SheetPresentationStates.SheetPresentationRealisticConfig`.split(`.`)})))()}Le();export{Y as AdaptivePresentation,_e as Default,w as DefaultFiltersBesideSearch,xe as DefaultFiltersBesideSearchRTL,N as Disabled,q as DisabledWithMessage,Se as FullFeatured,E as IssueTracker,I as ManyFilters,C as NearFullTokenRow,ve as NearFullTokenRowRTL,W as OverflowInline,G as OverflowLayer,M as ReadOnly,J as SheetPresentation,X as SheetPresentationContentSearch,Z as SheetPresentationLongPlaceholder,$ as SheetPresentationRealisticConfig,Q as SheetPresentationStates,B as SizeVariants,De as StatusVariantComparison,T as TokenRowWhenRestingStylesWin,z as WithContentSearchFieldKey,K as WithCustomComponents,A as WithDateFilters,j as WithEmptyFilter,U as WithEndContentPowerSearch,O as WithEntityFilters,D as WithEnumListFilters,P as WithError,R as WithNestedFilters,k as WithNumericFilters,L as WithOnChangeTracking,S as WithPresetFilters,H as WithResultCount,V as WithStartIcon,F as WithWarning,Ie as __namedExportsOrder,ge as default};