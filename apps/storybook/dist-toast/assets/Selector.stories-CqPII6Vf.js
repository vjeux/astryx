import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{o as i,s as a}from"./useTheme-CUotWZgR.js";import{n as o,t as s}from"./Button-DoGM0DEN.js";import{n as c,t as l}from"./RadioIndicator-B_4r1Acb.js";import{n as u,t as ee}from"./VStack-SWtDePqc.js";import{i as te,n as ne,r as re,t as d}from"./Selector-MAEgY-r1.js";import{n as ie,t as ae}from"./InputGroup-BWTkP6pA.js";import{n as oe,t as se}from"./InputGroupText-Dko_Ilc1.js";import{n as ce,t as le}from"./FormLayout-CAcZ3H26.js";import{n as ue,t as de}from"./TextInput-LGxpinPt.js";import{c as fe,o as f}from"./iframe-B7UFaprG.js";import{n as pe,t as me}from"./BellIcon-fgdNGfIx.js";import{n as he,t as ge}from"./CogIcon-BIHPheL2.js";import{n as _e,t as ve}from"./GlobeAltIcon-WNucSUjV.js";import{n as ye,t as be}from"./UserIcon-C0yNFtrR.js";function xe({title:e,titleId:t,...n},r){return Se.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?Se.createElement(`title`,{id:t},e):null,Se.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z`}))}var Se,Ce;function we(){return(we=t((()=>{Se=e(n()),Ce=Se.forwardRef(xe)})))()}function Te(e){let t=e.presentation===`popover`?`selector-popup`:`bottom-sheet`,n=i({name:`selector-ast004-${e.name}`,components:{[t]:{base:{width:e.width,maxWidth:e.width}}},...e.usesRadioIndicator?{indicators:{check:l}}:{}});return{globals:{direction:e.direction},parameters:{docs:{description:{story:`AST-004 evidence: the open selection surface keeps visible marks at the configured logical edge and gives empty marks no layout width.`}}},render:(t,r)=>(0,m.jsx)(f,{theme:n,mode:r.globals.colorMode===`dark`?`dark`:`light`,children:(0,m.jsx)(`div`,{"data-ast004-indicator-space":e.name,style:{width:e.width},children:(0,m.jsx)(d,{label:`Project with long option labels`,options:Ie,value:`selected`,onChange:()=>{},indicatorPosition:e.indicatorPosition,presentation:e.presentation,placement:`below`,width:`100%`,isDefaultOpen:!0})})}),play:async({canvasElement:t})=>{await Ee(()=>{h(document.querySelector(`[role="listbox"]`)).not.toBeNull()}),await document.fonts.ready,await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let n=t.querySelector(`[data-ast004-indicator-space="${e.name}"]`),r=document.querySelector(`[role="listbox"]`),i=r?.querySelector(`[role="option"][aria-selected="true"]`),a=r?.querySelector(`[role="option"][aria-selected="false"]`);if(n==null||r==null||i==null||a==null)throw Error(`AST-004 evidence did not render ${e.name}`);h(getComputedStyle(i).direction).toBe(e.direction);let o=t=>e.indicatorPosition===`start`?t.firstElementChild:t.lastElementChild,s=t=>e.indicatorPosition===`start`?t.lastElementChild:t.firstElementChild,c=o(i),l=o(a),u=s(i),ee=s(a);h(c.getBoundingClientRect().width).toBeGreaterThan(0),e.usesRadioIndicator?(h(l.getBoundingClientRect().width).toBeGreaterThan(0),h(Math.abs(u.getBoundingClientRect().width-ee.getBoundingClientRect().width)).toBeLessThanOrEqual(1)):(h(getComputedStyle(l).display).toBe(`none`),h(l.getBoundingClientRect().width).toBe(0),h(ee.getBoundingClientRect().width).toBeGreaterThan(u.getBoundingClientRect().width)),h(u.textContent).toContain(`Selected option with a deliberately long readable label`),h(ee.textContent).toContain(`Unselected option with a deliberately long readable label`),h(u.getBoundingClientRect().width).toBeGreaterThan(0),h(ee.getBoundingClientRect().width).toBeGreaterThan(0);let te=c.getBoundingClientRect(),ne=u.getBoundingClientRect(),re=e.direction===`rtl`?te.left>=ne.right:te.right<=ne.left;if(h(re).toBe(e.indicatorPosition===`start`),e.presentation===`popover`){let t=document.querySelector(`.astryx-selector-popup`);if(t==null)throw Error(`AST-004 Popover evidence did not render ${e.name}`);let n=t.closest(`[popover]`);if(n==null)throw Error(`AST-004 Popover host did not render ${e.name}`);h(n.matches(`:popover-open`)).toBe(!0)}else{let t=document.querySelector(`dialog`);if(t==null)throw Error(`AST-004 BottomSheet evidence did not render ${e.name}`);h(t.matches(`:modal`)).toBe(!0)}}}}var p,m,h,Ee,De,g,Oe,_,v,y,b,x,S,C,w,T,E,D,O,k,ke,Ae,je,Me,A,Ne,j,M,N,P,F,I,L,R,z,B,V,H,U,W,Pe,G,Fe,K,q,J,Ie,Y,X,Z,Q,$,Le;function Re(){return(Re=t((()=>{p=n(),o(),ce(),ie(),oe(),u(),ne(),te(),ue(),fe(),a(),c(),ye(),he(),pe(),we(),_e(),m=r(),{expect:h,waitFor:Ee}=__STORYBOOK_MODULE_TEST__,De={title:`Core/Selector`,component:d,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,m.jsx)(`div`,{style:{width:250},children:(0,m.jsx)(e,{})})],argTypes:{label:{control:`text`,description:`Label text for the selector`},isLabelHidden:{control:`boolean`,description:`Whether to visually hide the label`},description:{control:`text`,description:`Description text displayed between label and selector`},options:{control:`object`,description:`Array of options to display. Can be strings, objects, dividers, or sections.`},value:{control:`text`,description:`The currently selected value`},placeholder:{control:`text`,description:`Placeholder text when no value is selected`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Size variant of the selector`},variant:{control:`radio`,options:[`input`,`secondary`,`ghost`],description:`Visual trigger style`},placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Explicit menu placement. Leave unset for selected-item overlay behavior.`},presentation:{control:`radio`,options:[`popover`,`bottom-sheet`,`adaptive`],description:`Popover, bottom sheet, or responsive presentation.`},isDisabled:{control:`boolean`,description:`Whether the selector is disabled`},isReadOnly:{control:`boolean`,description:`Whether the selected value is visible and submittable without selection controls`},disabledMessage:{control:`text`,description:`Explains why the selector is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the trigger focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled Selector in Tooltip.`},isOptional:{control:`boolean`,description:`Whether the field is optional`},isRequired:{control:`boolean`,description:`Whether the field is required`},renderOption:{description:`Optional render function for custom option rendering`,table:{type:{summary:`(option: SelectorOptionData) => ReactNode`}}},"data-testid":{control:`text`,description:`Test ID for testing frameworks`}}},g={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:e.label??`Fruit`,options:e.options??[`Apple`,`Banana`,`Orange`,`Mango`,`Pineapple`],value:o,onChange:e=>s(e)})},args:{placeholder:`Select a fruit...`}},Oe=Array.from({length:120},(e,t)=>`Team ${t+1}`),_={tags:[`!autodocs`],render:()=>{let[e,t]=(0,p.useState)(void 0);return(0,m.jsx)(d,{label:`Team`,options:Oe,value:e,onChange:e=>t(e),presentation:`popover`})}},v={args:{label:`Assigned owner`,options:[`Alice`,`Bob`,`Charlie`],value:`Alice`,onChange:()=>{},hasClear:!0,hasSearch:!0,htmlName:`owner`,isReadOnly:!0}},y={render:()=>{let[e,t]=(0,p.useState)();return(0,m.jsx)(d,{label:`Team`,options:[`Design`,`Engineering`,`Marketing`,`Operations`],value:e,onChange:t,presentation:`bottom-sheet`})}},b={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Fruit`,isLabelHidden:!0,options:[`Apple`,`Banana`,`Orange`,`Mango`,`Pineapple`],value:o,onChange:e=>s(e),placeholder:`Select a fruit...`})}},x={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Fruit`,description:`Choose your favorite fruit from the list`,options:[`Apple`,`Banana`,`Orange`,`Mango`,`Pineapple`],value:o,onChange:e=>s(e),placeholder:`Select a fruit...`})}},S={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Fruit`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`},{value:`orange`,label:`Orange`,disabled:!0},{value:`mango`,label:`Mango`}],value:o,onChange:e=>s(e)})},args:{placeholder:`Select a fruit...`}},C={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Settings`,options:[{value:`profile`,label:`Profile`,icon:be},{value:`settings`,label:`Settings`,icon:ge},{value:`notifications`,label:`Notifications`,icon:me}],value:o,onChange:e=>s(e)})},args:{placeholder:`Select an option...`}},w={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Fruit`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`},{type:`section`,title:`Citrus`,options:[{value:`orange`,label:`Orange`},{value:`lemon`,label:`Lemon`},{value:`lime`,label:`Lime`}]},{type:`section`,title:`Tropical`,options:[{value:`mango`,label:`Mango`},{value:`pineapple`,label:`Pineapple`}]}],value:o,onChange:e=>s(e)})},args:{placeholder:`Select a fruit...`}},T={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Fruit`,hasSearch:!0,options:[{type:`section`,title:`Citrus`,options:[{value:`orange`,label:`Orange`},{value:`lemon`,label:`Lemon`},{value:`lime`,label:`Lime`},{value:`grapefruit`,label:`Grapefruit`}]},{type:`section`,title:`Tropical`,options:[{value:`mango`,label:`Mango`},{value:`pineapple`,label:`Pineapple`},{value:`papaya`,label:`Papaya`},{value:`guava`,label:`Guava`}]}],value:o,onChange:e=>s(e)})},args:{placeholder:`Select a fruit...`}},E={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0);return(0,m.jsx)(d,{...a,label:`Fruit`,hasSearch:!0,options:[`Apple`,`Apricot`,`Banana`,`Blueberry`,`Cherry`,`Grapefruit`,`Mango`,`Orange`],value:o,onChange:e=>s(e)})},args:{placeholder:`Select a fruit...`}},D={render:()=>{let[e,t]=(0,p.useState)(void 0),[n,r]=(0,p.useState)(void 0),[i,a]=(0,p.useState)(void 0),[o,s]=(0,p.useState)(void 0);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:300},children:[(0,m.jsx)(d,{label:`No options (default)`,options:[],value:e,onChange:e=>t(e)}),(0,m.jsx)(d,{label:`No options (custom)`,options:[],value:n,onChange:e=>r(e),emptyText:`No fruit in season yet`}),(0,m.jsx)(d,{label:`Search for xyz (custom)`,options:[`Apple`,`Banana`,`Cherry`],value:i,onChange:e=>a(e),hasSearch:!0,emptySearchText:`Nothing matches that fruit`}),(0,m.jsx)(d,{label:`Loading (no message)`,options:[],value:o,onChange:e=>s(e),isLoading:!0})]})},decorators:[e=>(0,m.jsx)(e,{})]},O={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??void 0),c=[{value:`user1`,label:`Alice Johnson`,email:`alice@example.com`},{value:`user2`,label:`Bob Smith`,email:`bob@example.com`},{value:`user3`,label:`Carol White`,email:`carol@example.com`}];return(0,m.jsx)(d,{...a,label:`User`,options:c,value:o,onChange:e=>s(e),placeholder:`Select a user...`,renderOption:e=>(0,m.jsx)(re,{icon:be,label:e.label,description:e.email})})}},k={render:()=>{let e=[{value:`private`,label:`Private`,icon:Ce,description:`Only members can access this space and its content.`},{value:`public`,label:`Public`,icon:ve,description:`Anyone at the company can find and join this space.`}],[t,n]=(0,p.useState)(`private`),[r,i]=(0,p.useState)(`private`),[a,o]=(0,p.useState)(`private`),[c,l]=(0,p.useState)(`private`);return(0,m.jsxs)(`div`,{style:{display:`grid`,gap:24},children:[(0,m.jsx)(d,{label:`Visibility (default trigger)`,options:e,value:t,onChange:n,"data-testid":`condensed`}),(0,m.jsx)(d,{label:`Visibility (renderValue, one line)`,options:e,value:r,onChange:i,"data-testid":`one-line`,renderValue:e=>(0,m.jsx)(re,{icon:e.icon,label:e.label??e.value})}),(0,m.jsx)(d,{label:`Visibility (renderValue)`,options:e,value:a,onChange:o,"data-testid":`full`,renderValue:e=>(0,m.jsx)(re,{icon:e.icon,label:e.label??e.value,description:e.description})}),(0,m.jsxs)(ae,{label:`Visibility`,children:[(0,m.jsx)(d,{label:`Visibility (in a group)`,isLabelHidden:!0,options:e,value:c,onChange:l,renderValue:e=>(0,m.jsx)(re,{icon:e.icon,label:e.label??e.value,description:e.description})}),(0,m.jsx)(s,{label:`Save`})]})]})}},ke=i({name:`selector-compact-sizing`,tokens:{"--spacing-5":`10px`,"--size-element-sm":`24px`,"--size-element-md":`28px`,"--size-element-lg":`32px`}}),Ae=i({name:`selector-wide-spacing-sizing`,typography:{scale:{base:18,ratio:1.414}},tokens:{"--spacing-5":`40px`,"--size-element-sm":`40px`,"--size-element-md":`48px`,"--size-element-lg":`56px`}}),je=i({name:`selector-large-text-sizing`,tokens:{"--spacing-5":`40px`,"--text-label-size":`32px`}}),Me=i({name:`selector-wide-spacing-default-sizes`,tokens:{"--spacing-5":`40px`}}),A={render:()=>{let[e,t]=(0,p.useState)(),[n,r]=(0,p.useState)(),[i,a]=(0,p.useState)();return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:250},children:[(0,m.jsx)(d,{label:`Small`,size:`sm`,options:[`Apple`,`Banana`,`Orange`],value:e,onChange:t,placeholder:`Small size (28px)`}),(0,m.jsx)(d,{label:`Medium`,size:`md`,options:[`Apple`,`Banana`,`Orange`],value:n,onChange:r,placeholder:`Medium size (32px)`}),(0,m.jsx)(d,{label:`Large`,size:`lg`,options:[`Apple`,`Banana`,`Orange`],value:i,onChange:a,placeholder:`Large size (36px)`}),(0,m.jsx)(f,{theme:ke,children:[`sm`,`md`,`lg`].map(e=>(0,m.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[[`plain`,`start`,`option`,`status`,`tooltip`,`clear`,`loading`,`custom`,`readonly`].map(t=>(0,m.jsx)(d,{label:`Compact ${e} ${t}`,size:e,options:[{value:`apple`,label:`Apple`,icon:t===`option`?be:void 0}],value:`apple`,onChange:()=>{},startIcon:t===`start`?be:void 0,status:t===`status`||t===`tooltip`?{type:`warning`,message:`Check selection`}:void 0,statusVariant:t===`tooltip`?`tooltip`:`attached`,hasClear:t===`clear`,isLoading:t===`loading`,isReadOnly:t===`readonly`,renderValue:t===`custom`?e=>(0,m.jsx)(`span`,{children:e.label}):void 0},t)),(0,m.jsx)(d,{label:`Compact ${e} multiline`,"data-testid":`compact-multiline`,size:e,options:[`Apple`],value:`Apple`,onChange:()=>{},renderValue:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`div`,{children:e.label}),(0,m.jsx)(`div`,{children:`Second line`})]})})]},e))}),(0,m.jsx)(f,{theme:Ae,children:[`sm`,`md`,`lg`].map(e=>(0,m.jsxs)(`div`,{style:{display:`grid`,gap:8},children:[[`plain`,`clear`].map(t=>(0,m.jsx)(d,{label:`Wide spacing ${e} ${t}`,size:e,options:[`Apple`],value:`Apple`,onChange:()=>{},hasClear:t===`clear`},t)),(0,m.jsx)(d,{label:`Wide spacing ${e} multiline`,"data-testid":`wide-multiline`,size:e,options:[`Apple`],value:`Apple`,onChange:()=>{},renderValue:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`div`,{children:e.label}),(0,m.jsx)(`div`,{children:`Second line`})]})})]},e))}),(0,m.jsx)(f,{theme:je,children:(0,m.jsx)(d,{label:`Large text small`,"data-testid":`large-text`,size:`sm`,options:[`Ågypj`],value:`Ågypj`,onChange:()=>{}})}),(0,m.jsxs)(f,{theme:Me,children:[(0,m.jsx)(d,{label:`Wide spacing default small`,size:`sm`,options:[`Apple`],value:`Apple`,onChange:()=>{}}),(0,m.jsx)(d,{label:`Wide spacing large custom value`,"data-testid":`large-custom`,size:`sm`,options:[`Ågypj`],value:`Ågypj`,onChange:()=>{},renderValue:e=>(0,m.jsx)(`div`,{style:{fontSize:32,lineHeight:1.25},children:e.label})})]})]})},decorators:[e=>(0,m.jsx)(e,{})],play:async({canvasElement:e})=>{await document.fonts.ready;let t=e.querySelectorAll(`.astryx-selector`);h(t).toHaveLength(45);for(let e of t){let t=getComputedStyle(e),n=Number.parseFloat(t.getPropertyValue(`--size-element-${e.dataset.size}`)),r=e.getBoundingClientRect().height,i=e.querySelector(`[data-testid]`)?.dataset.testid;if(i===`large-text`||i===`large-custom`){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),i=t.nextNode();for(;i&&!i.textContent?.includes(`Ågypj`);)i=t.nextNode();let a=i?.parentElement??null;for(;a&&a!==e&&getComputedStyle(a).overflowY===`visible`;)a=a.parentElement;if(h(a).toBeTruthy(),!i||!a)continue;let o=document.createRange();o.selectNodeContents(i);let s=o.getBoundingClientRect(),c=a.getBoundingClientRect();h(s.top).toBeGreaterThanOrEqual(c.top-.5),h(s.bottom).toBeLessThanOrEqual(c.bottom+.5),h(r).toBeGreaterThan(n)}else if(i?.endsWith(`-multiline`)){let i=Number.parseFloat(t.lineHeight),a=Number.parseFloat(t.borderTopWidth)+Number.parseFloat(t.borderBottomWidth);h(r,e.textContent??``).toBeCloseTo(Math.max(n+i,2*i+a),1)}else h(r,e.textContent??``).toBeCloseTo(n,1)}}},Ne={render:()=>{let[e,t]=(0,p.useState)(`week`),[n,r]=(0,p.useState)(`comfortable`);return(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,width:`max-content`},children:[(0,m.jsx)(s,{label:`Today`,variant:`ghost`}),(0,m.jsx)(d,{label:`View`,isLabelHidden:!0,variant:`ghost`,size:`md`,options:[{value:`day`,label:`Day`},{value:`week`,label:`Week`},{value:`month`,label:`Month`}],value:e,onChange:t}),(0,m.jsx)(d,{label:`Density`,isLabelHidden:!0,variant:`ghost`,size:`md`,options:[{value:`compact`,label:`Compact`},{value:`comfortable`,label:`Comfortable`},{value:`spacious`,label:`Spacious`}],value:n,onChange:r,status:{type:`warning`,message:`This setting affects all users`},statusVariant:`tooltip`}),(0,m.jsx)(s,{label:`Export`,variant:`ghost`})]})},decorators:[e=>(0,m.jsx)(e,{})]},j={render:()=>{let[e,t]=(0,p.useState)(`all`);return(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,width:`max-content`},children:[(0,m.jsx)(s,{label:`Share`,variant:`secondary`}),(0,m.jsx)(d,{label:`Platform`,isLabelHidden:!0,variant:`secondary`,size:`md`,options:[{value:`all`,label:`All platforms`},{value:`ios`,label:`iOS`},{value:`android`,label:`Android`}],value:e,onChange:t}),(0,m.jsx)(s,{label:`Export`,variant:`secondary`})]})},decorators:[e=>(0,m.jsx)(e,{})]},M={render:()=>{let e=[{value:`all`,label:`All platforms`},{value:`ios`,label:`iOS`},{value:`android`,label:`Android`}],t=t=>(0,m.jsx)(d,{label:t,isLabelHidden:!0,variant:`secondary`,options:e,value:`all`,onChange:()=>{}});return(0,m.jsxs)(`div`,{"data-secondary-input-group-matrix":!0,style:{display:`grid`,gap:16,width:320},children:[(0,m.jsxs)(ae,{label:`Secondary first`,isLabelHidden:!0,children:[t(`Platform first`),(0,m.jsx)(se,{children:`.app`})]}),(0,m.jsxs)(ae,{label:`Secondary middle`,isLabelHidden:!0,children:[(0,m.jsx)(se,{children:`@`}),t(`Platform middle`),(0,m.jsx)(se,{children:`.app`})]}),(0,m.jsxs)(ae,{label:`Secondary last`,isLabelHidden:!0,children:[(0,m.jsx)(se,{children:`@`}),t(`Platform last`)]})]})},decorators:[e=>(0,m.jsx)(e,{})]},N={render:()=>{let[e,t]=(0,p.useState)(),[n,r]=(0,p.useState)(`banana`),[i,a]=(0,p.useState)(`apple`);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:250},children:[(0,m.jsx)(d,{label:`Error status`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],value:e,onChange:t,placeholder:`Select a fruit...`,status:{type:`error`,message:`Please select a fruit`}}),(0,m.jsx)(d,{label:`Warning status`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],value:n,onChange:r,status:{type:`warning`,message:`Banana is out of season`}}),(0,m.jsx)(d,{label:`Success status`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],value:i,onChange:a,status:{type:`success`}})]})},decorators:[e=>(0,m.jsx)(e,{})]},P={render:()=>{let[e,t]=(0,p.useState)(),[n,r]=(0,p.useState)();return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:250},children:[(0,m.jsx)(d,{label:`Optional field`,isOptional:!0,options:[`Apple`,`Banana`,`Orange`],value:e,onChange:t,placeholder:`Select a fruit...`}),(0,m.jsx)(d,{label:`Required field`,isRequired:!0,options:[`Apple`,`Banana`,`Orange`],value:n,onChange:r,placeholder:`Select a fruit...`})]})},decorators:[e=>(0,m.jsx)(e,{})]},F={args:{label:`Fruit`,options:[`Apple`,`Banana`,`Orange`],value:`Apple`,isDisabled:!0,placeholder:`Select a fruit...`}},I={args:{label:`Owner`,options:[`Alice`,`Bob`,`Carol`],isDisabled:!0,disabledMessage:`You need the Editor role to change this`,placeholder:`Select an owner...`}},L={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(`Banana`);return(0,m.jsx)(d,{...a,label:`Fruit`,options:[`Apple`,`Banana`,`Orange`,`Mango`],value:o,onChange:e=>s(e)})}},R={parameters:{layout:`fullscreen`},render:()=>{let[e,t]=(0,p.useState)(``),[n,r]=(0,p.useState)(`Banana`);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,padding:`96px 24px 0`},children:[(0,m.jsx)(de,{label:`Name`,value:e,onChange:t}),(0,m.jsx)(`div`,{style:{height:64}}),(0,m.jsx)(d,{label:`Fruit`,options:[`Apple`,`Banana`,`Cherry`,`Date`,`Elderberry`,`Fig`],value:n,onChange:e=>r(e)})]})}},z={render:()=>{let[e,t]=(0,p.useState)(),[n,r]=(0,p.useState)(`banana`),[i,a]=(0,p.useState)(),[o,s]=(0,p.useState)();return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,width:`250px`},children:[(0,m.jsx)(d,{label:`Default`,options:[`Apple`,`Banana`,`Orange`],value:e,onChange:t,placeholder:`Select...`}),(0,m.jsx)(d,{label:`Pre-selected`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],value:n,onChange:r}),(0,m.jsx)(d,{label:`With disabled option`,options:[{value:`apple`,label:`Apple`,disabled:!0},{value:`banana`,label:`Banana`}],value:i,onChange:a,placeholder:`Select...`}),(0,m.jsx)(d,{label:`Disabled selector`,options:[`Apple`,`Banana`],value:o,onChange:s,isDisabled:!0,placeholder:`Select...`})]})},decorators:[e=>(0,m.jsx)(e,{})]},B={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(`Banana`);return(0,m.jsx)(d,{...a,options:[`Apple`,`Banana`,`Cherry`,`Date`],value:o,onChange:e=>s(e),hasClear:!0})},args:{label:`Fruit`,placeholder:`Select a fruit...`}},V={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(`Banana`);return(0,m.jsx)(d,{...a,options:[`Apple`,`Banana`,`Cherry`],value:o,onChange:e=>s(e),hasClear:!0})},args:{label:`Required fruit`,status:{type:`warning`,message:`Selection is recommended`}}},H={render:e=>{let{value:t,onChange:n,changeAction:r,hasClear:i,...a}=e,[o,s]=(0,p.useState)(t??`Banana`);return(0,m.jsx)(d,{...a,label:`Bottom toolbar selector`,options:[`Apple`,`Banana`,`Cherry`,`Date`],value:o,onChange:e=>s(e),placement:`above`})}},U={render:()=>{let[e,t]=(0,p.useState)(`Banana`),[n,r]=(0,p.useState)(`Banana`),[i,a]=(0,p.useState)(`Banana`),o=[`Apple`,`Banana`,`Cherry`,`Date`];return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,m.jsx)(d,{label:`placement=below`,options:o,value:e,onChange:e=>t(e),placement:`below`}),(0,m.jsx)(d,{label:`placement=start`,options:o,value:n,onChange:e=>r(e),placement:`start`}),(0,m.jsx)(d,{label:`placement=end`,options:o,value:i,onChange:e=>a(e),placement:`end`})]})}},W={render:()=>{let[e,t]=(0,p.useState)(),[n,r]=(0,p.useState)();return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,m.jsx)(d,{label:`Attached (default)`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],value:e,onChange:t,placeholder:`Select a fruit...`,status:{type:`error`,message:`Please select a fruit`}}),(0,m.jsx)(d,{label:`Detached`,options:[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],value:n,onChange:r,placeholder:`Select a fruit...`,status:{type:`error`,message:`Please select a fruit`},statusVariant:`detached`})]})},decorators:[e=>(0,m.jsx)(e,{})]},Pe=i({name:`selector-icon-demo`,components:{"input-clear-icon":{base:{width:`12px`,height:`12px`,fontSize:`12px`,color:`var(--color-icon-secondary)`,":hover":{color:`var(--color-accent)`}}},"selector-indicator-icon":{base:{width:`14px`,height:`14px`,fontSize:`14px`,color:`var(--color-icon-secondary)`},"state:expanded":{color:`var(--color-accent)`}}}}),G={render:()=>{let[e,t]=(0,p.useState)(`Banana`);return(0,m.jsx)(f,{theme:Pe,mode:`light`,children:(0,m.jsx)(d,{label:`Icons themed (accent on hover/open)`,options:[`Apple`,`Banana`,`Cherry`],value:e,onChange:t,hasClear:!0})})}},Fe=i({name:`radio-selection-demo`,indicators:{check:l}}),K={render:()=>{let[e,t]=(0,p.useState)(`Banana`);return(0,m.jsx)(f,{theme:Fe,mode:`light`,children:(0,m.jsx)(d,{label:`Single selection drawn as a radio`,options:[`Apple`,`Banana`,`Cherry`],value:e,onChange:t,isDefaultOpen:!0})})}},q={render:()=>{let[e,t]=(0,p.useState)(`Banana`);return(0,m.jsx)(d,{label:`Single selection drawn as a check (default)`,options:[`Apple`,`Banana`,`Cherry`],value:e,onChange:t,isDefaultOpen:!0})}},J={render:()=>{let[e,t]=(0,p.useState)(`Banana`);return(0,m.jsx)(d,{label:`Mark at the start`,options:[`Apple`,`Banana`,`Cherry`],value:e,onChange:t,indicatorPosition:`start`,isDefaultOpen:!0})}},Ie=[{value:`selected`,label:`Selected option with a deliberately long readable label`},{value:`unselected`,label:`Unselected option with a deliberately long readable label`}],Y={...Te({name:`popover-narrow-start-default-ltr`,presentation:`popover`,width:`12rem`,indicatorPosition:`start`,direction:`ltr`,usesRadioIndicator:!1}),tags:[`visual-baseline`]},X={...Te({name:`popover-wide-end-radio-rtl`,presentation:`popover`,width:`24rem`,indicatorPosition:`end`,direction:`rtl`,usesRadioIndicator:!0}),tags:[`visual-baseline`]},Z={...Te({name:`bottom-sheet-narrow-end-default-rtl`,presentation:`bottom-sheet`,width:`12rem`,indicatorPosition:`end`,direction:`rtl`,usesRadioIndicator:!1}),tags:[`visual-baseline`]},Q={...Te({name:`bottom-sheet-wide-start-radio-ltr`,presentation:`bottom-sheet`,width:`24rem`,indicatorPosition:`start`,direction:`ltr`,usesRadioIndicator:!0}),tags:[`visual-baseline`]},$={tags:[`!autodocs`],render:()=>{let e=[`Apple`,`Banana`,`Cherry`];return(0,m.jsxs)(ee,{gap:4,children:[(0,m.jsx)(d,{label:`Fruit`,options:e,hasSearch:!0,isRequired:!0}),(0,m.jsx)(le,{defaultOptionality:`required`,children:(0,m.jsx)(d,{label:`Vegetable`,options:e,hasSearch:!0})}),(0,m.jsx)(d,{label:`Herb`,"aria-label":`Pick an herb`,options:e,hasSearch:!0,isRequired:!0}),(0,m.jsxs)(ae,{label:`Nut`,children:[(0,m.jsx)(se,{children:`Kind`}),(0,m.jsx)(d,{label:`Nut kind`,isLabelHidden:!0,options:e,hasSearch:!0,isRequired:!0})]})]})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label={args.label ?? 'Fruit'} options={args.options ?? ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple']} value={value} onChange={v => setValue(v)} />;
  },
  args: {
    placeholder: 'Select a fruit...'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Selector label="Team" options={LONG_LIST} value={value} onChange={v => setValue(v)} presentation="popover" />;
  }
}`,..._.parameters?.docs?.source},description:{story:`A long option list: the list scrolls, End and PageDown scroll it, and a
mouse resting over it keeps the highlight where the keys put it.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Assigned owner',
    options: ['Alice', 'Bob', 'Charlie'],
    value: 'Alice',
    onChange: () => {},
    hasClear: true,
    hasSearch: true,
    htmlName: 'owner',
    isReadOnly: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <Selector label="Team" options={['Design', 'Engineering', 'Marketing', 'Operations']} value={value} onChange={setValue} presentation="bottom-sheet" />;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Fruit" isLabelHidden options={['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple']} value={value} onChange={v => setValue(v)} placeholder="Select a fruit..." />;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Fruit" description="Choose your favorite fruit from the list" options={['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple']} value={value} onChange={v => setValue(v)} placeholder="Select a fruit..." />;
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Fruit" options={[{
      value: 'apple',
      label: 'Apple'
    }, {
      value: 'banana',
      label: 'Banana'
    }, {
      value: 'orange',
      label: 'Orange',
      disabled: true
    }, {
      value: 'mango',
      label: 'Mango'
    }]} value={value} onChange={v => setValue(v)} />;
  },
  args: {
    placeholder: 'Select a fruit...'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Settings" options={[{
      value: 'profile',
      label: 'Profile',
      icon: UserIcon
    }, {
      value: 'settings',
      label: 'Settings',
      icon: CogIcon
    }, {
      value: 'notifications',
      label: 'Notifications',
      icon: BellIcon
    }]} value={value} onChange={v => setValue(v)} />;
  },
  args: {
    placeholder: 'Select an option...'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Fruit" options={[{
      value: 'apple',
      label: 'Apple'
    }, {
      value: 'banana',
      label: 'Banana'
    }, {
      type: 'section',
      title: 'Citrus',
      options: [{
        value: 'orange',
        label: 'Orange'
      }, {
        value: 'lemon',
        label: 'Lemon'
      }, {
        value: 'lime',
        label: 'Lime'
      }]
    }, {
      type: 'section',
      title: 'Tropical',
      options: [{
        value: 'mango',
        label: 'Mango'
      }, {
        value: 'pineapple',
        label: 'Pineapple'
      }]
    }]} value={value} onChange={v => setValue(v)} />;
  },
  args: {
    placeholder: 'Select a fruit...'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Fruit" hasSearch options={[{
      type: 'section',
      title: 'Citrus',
      options: [{
        value: 'orange',
        label: 'Orange'
      }, {
        value: 'lemon',
        label: 'Lemon'
      }, {
        value: 'lime',
        label: 'Lime'
      }, {
        value: 'grapefruit',
        label: 'Grapefruit'
      }]
    }, {
      type: 'section',
      title: 'Tropical',
      options: [{
        value: 'mango',
        label: 'Mango'
      }, {
        value: 'pineapple',
        label: 'Pineapple'
      }, {
        value: 'papaya',
        label: 'Papaya'
      }, {
        value: 'guava',
        label: 'Guava'
      }]
    }]} value={value} onChange={v => setValue(v)} />;
  },
  args: {
    placeholder: 'Select a fruit...'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    return <Selector {...rest} label="Fruit" hasSearch options={['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grapefruit', 'Mango', 'Orange']} value={value} onChange={v => setValue(v)} />;
  },
  args: {
    placeholder: 'Select a fruit...'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<string | undefined>(undefined);
    const [b, setB] = useState<string | undefined>(undefined);
    const [c, setC] = useState<string | undefined>(undefined);
    const [d, setD] = useState<string | undefined>(undefined);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 300
    }}>
        <Selector label="No options (default)" options={[]} value={a} onChange={v => setA(v)} />
        <Selector label="No options (custom)" options={[]} value={b} onChange={v => setB(v)} emptyText="No fruit in season yet" />
        <Selector label="Search for xyz (custom)" options={['Apple', 'Banana', 'Cherry']} value={c} onChange={v => setC(v)} hasSearch emptySearchText="Nothing matches that fruit" />
        <Selector label="Loading (no message)" options={[]} value={d} onChange={v => setD(v)} isLoading />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? undefined);
    const users = [{
      value: 'user1',
      label: 'Alice Johnson',
      email: 'alice@example.com'
    }, {
      value: 'user2',
      label: 'Bob Smith',
      email: 'bob@example.com'
    }, {
      value: 'user3',
      label: 'Carol White',
      email: 'carol@example.com'
    }];
    return <Selector {...rest} label="User" options={users} value={value} onChange={v => setValue(v)} placeholder="Select a user..." renderOption={user => <SelectorOption icon={UserIcon} label={user.label} description={(user as (typeof users)[number]).email} />} />;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const visibility = [{
      value: 'private',
      label: 'Private',
      icon: LockClosedIcon,
      description: 'Only members can access this space and its content.'
    }, {
      value: 'public',
      label: 'Public',
      icon: GlobeAltIcon,
      description: 'Anyone at the company can find and join this space.'
    }];
    const [condensed, setCondensed] = useState<string | undefined>('private');
    const [oneLine, setOneLine] = useState<string | undefined>('private');
    const [full, setFull] = useState<string | undefined>('private');
    const [grouped, setGrouped] = useState<string | undefined>('private');
    return <div style={{
      display: 'grid',
      gap: 24
    }}>
        <Selector label="Visibility (default trigger)" options={visibility} value={condensed} onChange={setCondensed} data-testid="condensed" />
        <Selector label="Visibility (renderValue, one line)" options={visibility} value={oneLine} onChange={setOneLine} data-testid="one-line" renderValue={option => <SelectorOption icon={option.icon} label={option.label ?? option.value} />} />
        <Selector label="Visibility (renderValue)" options={visibility} value={full} onChange={setFull} data-testid="full" renderValue={option => <SelectorOption icon={option.icon} label={option.label ?? option.value} description={option.description} />} />
        <InputGroup label="Visibility">
          <Selector label="Visibility (in a group)" isLabelHidden options={visibility} value={grouped} onChange={setGrouped} renderValue={option => <SelectorOption icon={option.icon} label={option.label ?? option.value} description={option.description} />} />
          <Button label="Save" />
        </InputGroup>
      </div>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string | undefined>();
    const [value2, setValue2] = useState<string | undefined>();
    const [value3, setValue3] = useState<string | undefined>();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 250
    }}>
        <Selector label="Small" size="sm" options={['Apple', 'Banana', 'Orange']} value={value1} onChange={setValue1} placeholder="Small size (28px)" />
        <Selector label="Medium" size="md" options={['Apple', 'Banana', 'Orange']} value={value2} onChange={setValue2} placeholder="Medium size (32px)" />
        <Selector label="Large" size="lg" options={['Apple', 'Banana', 'Orange']} value={value3} onChange={setValue3} placeholder="Large size (36px)" />
        <Theme theme={compactSizingTheme}>
          {(['sm', 'md', 'lg'] as const).map(size => <div key={size} style={{
          display: 'grid',
          gap: 8
        }}>
              {(['plain', 'start', 'option', 'status', 'tooltip', 'clear', 'loading', 'custom', 'readonly'] as const).map(state => <Selector key={state} label={\`Compact \${size} \${state}\`} size={size} options={[{
            value: 'apple',
            label: 'Apple',
            icon: state === 'option' ? UserIcon : undefined
          }]} value="apple" onChange={() => {}} startIcon={state === 'start' ? UserIcon : undefined} status={state === 'status' || state === 'tooltip' ? {
            type: 'warning',
            message: 'Check selection'
          } : undefined} statusVariant={state === 'tooltip' ? 'tooltip' : 'attached'} hasClear={state === 'clear'} isLoading={state === 'loading'} isReadOnly={state === 'readonly'} renderValue={state === 'custom' ? option => <span>{option.label}</span> : undefined} />)}
              <Selector label={\`Compact \${size} multiline\`} data-testid="compact-multiline" size={size} options={['Apple']} value="Apple" onChange={() => {}} renderValue={option => <>
                    <div>{option.label}</div>
                    <div>Second line</div>
                  </>} />
            </div>)}
        </Theme>
        <Theme theme={wideSpacingSizingTheme}>
          {(['sm', 'md', 'lg'] as const).map(size => <div key={size} style={{
          display: 'grid',
          gap: 8
        }}>
              {(['plain', 'clear'] as const).map(state => <Selector key={state} label={\`Wide spacing \${size} \${state}\`} size={size} options={['Apple']} value="Apple" onChange={() => {}} hasClear={state === 'clear'} />)}
              <Selector label={\`Wide spacing \${size} multiline\`} data-testid="wide-multiline" size={size} options={['Apple']} value="Apple" onChange={() => {}} renderValue={option => <>
                    <div>{option.label}</div>
                    <div>Second line</div>
                  </>} />
            </div>)}
        </Theme>
        <Theme theme={largeTextSizingTheme}>
          <Selector label="Large text small" data-testid="large-text" size="sm" options={['Ågypj']} value="Ågypj" onChange={() => {}} />
        </Theme>
        <Theme theme={wideSpacingDefaultSizesTheme}>
          <Selector label="Wide spacing default small" size="sm" options={['Apple']} value="Apple" onChange={() => {}} />
          <Selector label="Wide spacing large custom value" data-testid="large-custom" size="sm" options={['Ågypj']} value="Ågypj" onChange={() => {}} renderValue={option => <div style={{
          fontSize: 32,
          lineHeight: 1.25
        }}>{option.label}</div>} />
        </Theme>
      </div>;
  },
  decorators: [Story => <Story />],
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const triggers = canvasElement.querySelectorAll<HTMLElement>('.astryx-selector');
    expect(triggers).toHaveLength(45);
    for (const trigger of triggers) {
      const styles = getComputedStyle(trigger);
      const size = Number.parseFloat(styles.getPropertyValue(\`--size-element-\${trigger.dataset.size}\`));
      const height = trigger.getBoundingClientRect().height;
      // \`data-testid\` lands on the trigger button inside the control box.
      const testId = trigger.querySelector<HTMLElement>('[data-testid]')?.dataset.testid;
      if (testId === 'large-text' || testId === 'large-custom') {
        // Text larger than the token can hold keeps its whole line box.
        const walker = document.createTreeWalker(trigger, NodeFilter.SHOW_TEXT);
        let text: Node | null = walker.nextNode();
        while (text && !text.textContent?.includes('Ågypj')) {
          text = walker.nextNode();
        }
        // The nearest ancestor that clips: the built-in label, or the
        // renderValue wrapper around caller content.
        let clipElement = text?.parentElement ?? null;
        while (clipElement && clipElement !== trigger && getComputedStyle(clipElement).overflowY === 'visible') {
          clipElement = clipElement.parentElement;
        }
        expect(clipElement).toBeTruthy();
        if (!text || !clipElement) {
          continue;
        }
        const range = document.createRange();
        range.selectNodeContents(text);
        const textBox = range.getBoundingClientRect();
        const clip = clipElement.getBoundingClientRect();
        expect(textBox.top).toBeGreaterThanOrEqual(clip.top - 0.5);
        expect(textBox.bottom).toBeLessThanOrEqual(clip.bottom + 0.5);
        expect(height).toBeGreaterThan(size);
      } else if (testId?.endsWith('-multiline')) {
        // Two text rows, plus whatever padding remains once the first row
        // fills the token (padding never goes below zero).
        const row = Number.parseFloat(styles.lineHeight);
        const borders = Number.parseFloat(styles.borderTopWidth) + Number.parseFloat(styles.borderBottomWidth);
        expect(height, trigger.textContent ?? '').toBeCloseTo(Math.max(size + row, 2 * row + borders), 1);
      } else {
        expect(height, trigger.textContent ?? '').toBeCloseTo(size, 1);
      }
    }
  }
}`,...A.parameters?.docs?.source}}},Ne.parameters={...Ne.parameters,docs:{...Ne.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [view, setView] = useState<string | undefined>('week');
    const [density, setDensity] = useState<string | undefined>('comfortable');
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: 'max-content'
    }}>
        <Button label="Today" variant="ghost" />
        <Selector label="View" isLabelHidden variant="ghost" size="md" options={[{
        value: 'day',
        label: 'Day'
      }, {
        value: 'week',
        label: 'Week'
      }, {
        value: 'month',
        label: 'Month'
      }]} value={view} onChange={setView} />
        <Selector label="Density" isLabelHidden variant="ghost" size="md" options={[{
        value: 'compact',
        label: 'Compact'
      }, {
        value: 'comfortable',
        label: 'Comfortable'
      }, {
        value: 'spacious',
        label: 'Spacious'
      }]} value={density} onChange={setDensity} status={{
        type: 'warning',
        message: 'This setting affects all users'
      }} statusVariant="tooltip" />
        <Button label="Export" variant="ghost" />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...Ne.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [platform, setPlatform] = useState<string | undefined>('all');
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: 'max-content'
    }}>
        <Button label="Share" variant="secondary" />
        <Selector label="Platform" isLabelHidden variant="secondary" size="md" options={[{
        value: 'all',
        label: 'All platforms'
      }, {
        value: 'ios',
        label: 'iOS'
      }, {
        value: 'android',
        label: 'Android'
      }]} value={platform} onChange={setPlatform} />
        <Button label="Export" variant="secondary" />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const options = [{
      value: 'all',
      label: 'All platforms'
    }, {
      value: 'ios',
      label: 'iOS'
    }, {
      value: 'android',
      label: 'Android'
    }];
    const selector = (label: string) => <Selector label={label} isLabelHidden variant="secondary" options={options} value="all" onChange={() => {}} />;
    return <div data-secondary-input-group-matrix style={{
      display: 'grid',
      gap: 16,
      width: 320
    }}>
        <InputGroup label="Secondary first" isLabelHidden>
          {selector('Platform first')}
          <InputGroupText>.app</InputGroupText>
        </InputGroup>
        <InputGroup label="Secondary middle" isLabelHidden>
          <InputGroupText>@</InputGroupText>
          {selector('Platform middle')}
          <InputGroupText>.app</InputGroupText>
        </InputGroup>
        <InputGroup label="Secondary last" isLabelHidden>
          <InputGroupText>@</InputGroupText>
          {selector('Platform last')}
        </InputGroup>
      </div>;
  },
  decorators: [Story => <Story />]
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string | undefined>();
    const [value2, setValue2] = useState<string | undefined>('banana');
    const [value3, setValue3] = useState<string | undefined>('apple');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 250
    }}>
        <Selector label="Error status" options={[{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={value1} onChange={setValue1} placeholder="Select a fruit..." status={{
        type: 'error',
        message: 'Please select a fruit'
      }} />
        <Selector label="Warning status" options={[{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={value2} onChange={setValue2} status={{
        type: 'warning',
        message: 'Banana is out of season'
      }} />
        <Selector label="Success status" options={[{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={value3} onChange={setValue3} status={{
        type: 'success'
      }} />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string | undefined>();
    const [value2, setValue2] = useState<string | undefined>();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 250
    }}>
        <Selector label="Optional field" isOptional options={['Apple', 'Banana', 'Orange']} value={value1} onChange={setValue1} placeholder="Select a fruit..." />
        <Selector label="Required field" isRequired options={['Apple', 'Banana', 'Orange']} value={value2} onChange={setValue2} placeholder="Select a fruit..." />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: ['Apple', 'Banana', 'Orange'],
    value: 'Apple',
    isDisabled: true,
    placeholder: 'Select a fruit...'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Owner',
    options: ['Alice', 'Bob', 'Carol'],
    isDisabled: true,
    disabledMessage: 'You need the Editor role to change this',
    placeholder: 'Select an owner...'
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: _value,
      onChange: _onChange,
      changeAction: _ca,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState('Banana');
    return <Selector {...rest} label="Fruit" options={['Apple', 'Banana', 'Orange', 'Mango']} value={value} onChange={v => setValue(v)} />;
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => {
    const [name, setName] = useState('');
    const [value, setValue] = useState<string | undefined>('Banana');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '96px 24px 0'
    }}>
        <TextInput label="Name" value={name} onChange={setName} />
        <div style={{
        height: 64
      }} />
        <Selector label="Fruit" options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']} value={value} onChange={v => setValue(v)} />
      </div>;
  }
}`,...R.parameters?.docs?.source},description:{story:`A text field above a Selector. On a phone, focus the field so that its
software keyboard rises, then open the Selector. Its list slides above the
keyboard, with every option in view.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string | undefined>();
    const [value2, setValue2] = useState<string | undefined>('banana');
    const [value3, setValue3] = useState<string | undefined>();
    const [value4, setValue4] = useState<string | undefined>();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '250px'
    }}>
        <Selector label="Default" options={['Apple', 'Banana', 'Orange']} value={value1} onChange={setValue1} placeholder="Select..." />
        <Selector label="Pre-selected" options={[{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={value2} onChange={setValue2} />
        <Selector label="With disabled option" options={[{
        value: 'apple',
        label: 'Apple',
        disabled: true
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={value3} onChange={setValue3} placeholder="Select..." />
        <Selector label="Disabled selector" options={['Apple', 'Banana']} value={value4} onChange={setValue4} isDisabled placeholder="Select..." />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: _value,
      onChange: _onChange,
      changeAction: _changeAction,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState<string | null>('Banana');
    return <Selector {...rest} options={['Apple', 'Banana', 'Cherry', 'Date']} value={value} onChange={v => setValue(v)} hasClear />;
  },
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit...'
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: _value,
      onChange: _onChange,
      changeAction: _changeAction,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState<string | null>('Banana');
    return <Selector {...rest} options={['Apple', 'Banana', 'Cherry']} value={value} onChange={v => setValue(v)} hasClear />;
  },
  args: {
    label: 'Required fruit',
    status: {
      type: 'warning',
      message: 'Selection is recommended'
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      value: argsValue,
      onChange: _onChange,
      changeAction: _changeAction,
      hasClear: _hc,
      ...rest
    } = args;
    const [value, setValue] = useState(argsValue ?? 'Banana');
    return <Selector {...rest} label="Bottom toolbar selector" options={['Apple', 'Banana', 'Cherry', 'Date']} value={value} onChange={v => setValue(v)} placement="above" />;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [below, setBelow] = useState('Banana');
    const [start, setStart] = useState('Banana');
    const [end, setEnd] = useState('Banana');
    const options = ['Apple', 'Banana', 'Cherry', 'Date'];
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }}>
        <Selector label="placement=below" options={options} value={below} onChange={v => setBelow(v)} placement="below" />
        <Selector label="placement=start" options={options} value={start} onChange={v => setStart(v)} placement="start" />
        <Selector label="placement=end" options={options} value={end} onChange={v => setEnd(v)} placement="end" />
      </div>;
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<string | undefined>();
    const [b, setB] = useState<string | undefined>();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 280
    }}>
        <Selector label="Attached (default)" options={[{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={a} onChange={setA} placeholder="Select a fruit..." status={{
        type: 'error',
        message: 'Please select a fruit'
      }} />
        <Selector label="Detached" options={[{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]} value={b} onChange={setB} placeholder="Select a fruit..." status={{
        type: 'error',
        message: 'Please select a fruit'
      }} statusVariant="detached" />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | null>('Banana');
    return <Theme theme={iconTheme} mode="light">
        <Selector label="Icons themed (accent on hover/open)" options={['Apple', 'Banana', 'Cherry']} value={value} onChange={setValue} hasClear />
      </Theme>;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | undefined>('Banana');
    return <Theme theme={radioSelectionTheme} mode="light">
        <Selector label="Single selection drawn as a radio" options={['Apple', 'Banana', 'Cherry']} value={value} onChange={setValue} isDefaultOpen />
      </Theme>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | undefined>('Banana');
    return <Selector label="Single selection drawn as a check (default)" options={['Apple', 'Banana', 'Cherry']} value={value} onChange={setValue} isDefaultOpen />;
  }
}`,...q.parameters?.docs?.source},description:{story:`The same Selector with no theme, for comparison: a checkmark on the selected
row, and nothing at all on the others.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string | undefined>('Banana');
    return <Selector label="Mark at the start" options={['Apple', 'Banana', 'Cherry']} value={value} onChange={setValue} indicatorPosition="start" isDefaultOpen />;
  }
}`,...J.parameters?.docs?.source},description:{story:`\`indicatorPosition="start"\` moves a rendered mark to the leading edge, the
way a native menu marks its chosen row.

The default check draws nothing when unchecked, so its empty mark wrapper
collapses. Unselected labels gain that space; the selected label may shift or
have less available width while its visible mark remains at the logical start.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  ...createIndicatorSpaceEvidenceStory({
    name: 'popover-narrow-start-default-ltr',
    presentation: 'popover',
    width: '12rem',
    indicatorPosition: 'start',
    direction: 'ltr',
    usesRadioIndicator: false
  }),
  tags: ['visual-baseline']
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  ...createIndicatorSpaceEvidenceStory({
    name: 'popover-wide-end-radio-rtl',
    presentation: 'popover',
    width: '24rem',
    indicatorPosition: 'end',
    direction: 'rtl',
    usesRadioIndicator: true
  }),
  tags: ['visual-baseline']
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  ...createIndicatorSpaceEvidenceStory({
    name: 'bottom-sheet-narrow-end-default-rtl',
    presentation: 'bottom-sheet',
    width: '12rem',
    indicatorPosition: 'end',
    direction: 'rtl',
    usesRadioIndicator: false
  }),
  tags: ['visual-baseline']
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  ...createIndicatorSpaceEvidenceStory({
    name: 'bottom-sheet-wide-start-radio-ltr',
    presentation: 'bottom-sheet',
    width: '24rem',
    indicatorPosition: 'start',
    direction: 'ltr',
    usesRadioIndicator: true
  }),
  tags: ['visual-baseline']
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: () => {
    const options = ['Apple', 'Banana', 'Cherry'];
    return <VStack gap={4}>
        <Selector label="Fruit" options={options} hasSearch isRequired />
        <FormLayout defaultOptionality="required">
          <Selector label="Vegetable" options={options} hasSearch />
        </FormLayout>
        <Selector label="Herb" aria-label="Pick an herb" options={options} hasSearch isRequired />
        <InputGroup label="Nut">
          <InputGroupText>Kind</InputGroupText>
          <Selector label="Nut kind" isLabelHidden options={options} hasSearch isRequired />
        </InputGroup>
      </VStack>;
  }
}`,...$.parameters?.docs?.source},description:{story:`Required search Selectors in the four ways a closed trigger gets its name:
the field label with its marker, a form whose default hides the marker, a
caller \`aria-label\`, and an InputGroup.`,...$.parameters?.docs?.description}}},Le=`Default.LongList.ReadOnly.BottomSheetPresentation.HiddenLabel.WithDescription.WithObjects.WithIcons.WithSections.SearchableWithSections.Searchable.EmptyStates.CustomRender.OptionDescriptions.SizeVariants.GhostVariant.SecondaryVariant.SecondaryInInputGroup.WithStatus.OptionalRequired.Disabled.DisabledWithMessage.PreSelected.OverlayBesideKeyboard.AllVariations.Clearable.ClearableWithStatus.PlacementAbove.Placements.StatusVariantComparison.ThemedIcons.RadioSelectionIndicator.DefaultSelectionIndicator.StartIndicatorPosition.IndicatorSpacePopoverNarrowStart.IndicatorSpacePopoverWideEndRTL.IndicatorSpaceBottomSheetNarrowEndRTL.IndicatorSpaceBottomSheetWideStart.SearchableRequired`.split(`.`)})))()}Re();export{z as AllVariations,y as BottomSheetPresentation,B as Clearable,V as ClearableWithStatus,O as CustomRender,g as Default,q as DefaultSelectionIndicator,F as Disabled,I as DisabledWithMessage,D as EmptyStates,Ne as GhostVariant,b as HiddenLabel,Z as IndicatorSpaceBottomSheetNarrowEndRTL,Q as IndicatorSpaceBottomSheetWideStart,Y as IndicatorSpacePopoverNarrowStart,X as IndicatorSpacePopoverWideEndRTL,_ as LongList,k as OptionDescriptions,P as OptionalRequired,R as OverlayBesideKeyboard,H as PlacementAbove,U as Placements,L as PreSelected,K as RadioSelectionIndicator,v as ReadOnly,E as Searchable,$ as SearchableRequired,T as SearchableWithSections,M as SecondaryInInputGroup,j as SecondaryVariant,A as SizeVariants,J as StartIndicatorPosition,W as StatusVariantComparison,G as ThemedIcons,x as WithDescription,C as WithIcons,S as WithObjects,w as WithSections,N as WithStatus,Le as __namedExportsOrder,De as default};