import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./ChatMessageList-yhs-WclZ.js";import{n as l,t as u}from"./ChatMessage-LFMdokYE.js";import{n as d,t as f}from"./ChatMessageBubble-cWvrxd0T.js";import{E as ee,F as te,N as ne,P as re,T as ie,y as p}from"./MarkdownPluginNodeRenderer-By5mNuDg.js";import{n as ae,t as m}from"./Markdown-BzOsAWcI.js";import{n as oe,t as se}from"./Link-D69iJxMA.js";import{a as ce,c as le,i as ue,n as de,o as fe,r as pe,s as me,t as he}from"./Markdown.demoPlugins-DIaOaTcU.js";function ge(e){let t=/\r?\n|\r/g,n=t.exec(e);if(n==null)return null;let r=[],i=0;do n.index>i&&r.push({type:`text`,value:e.slice(i,n.index)}),r.push({type:`break`}),i=n.index+n[0].length,n=t.exec(e);while(n!=null);return i<e.length&&r.push({type:`text`,value:e.slice(i)}),r}function _e(e){let t;for(let n=0;n<e.length;n++){let r=e[n];if(r.type===`text`){let i=ge(r.value);i==null?t?.push(r):(t??=e.slice(0,n),t.push(...i))}else if(r.type===`strong`||r.type===`emphasis`||r.type===`delete`||r.type===`link`){let i=_e(r.children);i===r.children?t?.push(r):(t??=e.slice(0,n),t.push({...r,children:i}))}else t?.push(r)}return t??e}function ve(e){let t=_e(e.children);return t===e.children?e:{...e,children:t}}function ye(e){let t=e.children.map(ve);return t.every((t,n)=>t===e.children[n])?e:{...e,children:t}}function be(e){let t=xe(e.children);return t===e.children?e:{...e,children:t}}function xe(e){let t;for(let n=0;n<e.length;n++){let r=e[n],i=r;switch(r.type){case`heading`:case`paragraph`:{let e=_e(r.children);e!==r.children&&(i={...r,children:e});break}case`blockquote`:{let e=xe(r.children);e!==r.children&&(i={...r,children:e});break}case`list`:{let e=r.children.map(be);e.some((e,t)=>e!==r.children[t])&&(i={...r,children:e});break}case`table`:{let e=r.children.map(ye);e.some((e,t)=>e!==r.children[t])&&(i={...r,children:e});break}}i!==r&&(t??=e.slice(0,n)),t?.push(i)}return t??e}var Se,Ce;function we(){return(we=e((()=>{ie(),Se=e=>{let t=xe(e.children);return t===e.children?e:{...e,children:t}},Ce=p({name:`soft-breaks`,apiVersion:1,transform:Se})})))()}function Te(e){if(typeof e!=`string`)throw TypeError(`Expected a string`);return e.replace(/[|\\{}()[\]^$+*?.]/g,`\\$&`).replace(/-/g,`\\x2d`)}function Ee(e){let t=[],n=-1;for(;++n<e.length;)t[n]=Me(e[n]);return ke(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1}}function De(e){let t=e;return ke(n);function n(n){let r=n,i;for(i in e)if(r[i]!==t[i])return!1;return!0}}function Oe(e){return ke(t);function t(t){return t&&t.type===e}}function ke(e){return t;function t(t,n,r){return!!(je(t)&&e.call(this,t,typeof n==`number`?n:void 0,r||void 0))}}function Ae(){return!0}function je(e){return typeof e==`object`&&!!e&&`type`in e}var Me;function Ne(){return(Ne=e((()=>{Me=(function(e){if(e==null)return Ae;if(typeof e==`function`)return ke(e);if(typeof e==`object`)return Array.isArray(e)?Ee(e):De(e);if(typeof e==`string`)return Oe(e);throw Error(`Expected function, string, or object as test`)})})))()}function Pe(e){return e}function Fe(e,t,n,r){let i;typeof t==`function`&&typeof n!=`function`?(r=n,n=t):i=t;let a=Me(i),o=r?-1:1;s(e,void 0,[])();function s(e,i,c){let l=e&&typeof e==`object`?e:{};if(typeof l.type==`string`){let t=typeof l.tagName==`string`?l.tagName:typeof l.name==`string`?l.name:void 0;Object.defineProperty(u,"name",{value:`node (`+Pe(e.type+(t?`<`+t+`>`:``))+`)`})}return u;function u(){let l=Le,u,d,f;if((!t||a(e,i,c[c.length-1]||void 0))&&(l=Ie(n(e,c)),l[0]===!1))return l;if(`children`in e&&e.children){let t=e;if(t.children&&l[0]!==`skip`)for(d=(r?t.children.length:-1)+o,f=c.concat(t);d>-1&&d<t.children.length;){let e=t.children[d];if(u=s(e,d,f)(),u[0]===!1)return u;d=typeof u[1]==`number`?u[1]:d+o}}return l}}}function Ie(e){return Array.isArray(e)?e:typeof e==`number`?[!0,e]:e==null?Le:[e]}var Le;function Re(){return(Re=e((()=>{Ne(),Le=[]})))()}function ze(e,t,n){let r=Me((n||{}).ignore||[]),i=Be(t),a=-1;for(;++a<i.length;)Fe(e,`text`,o);function o(e,t){let n=-1,i;for(;++n<t.length;){let e=t[n],a=i?i.children:void 0;if(r(e,a?a.indexOf(e):void 0,i))return;i=e}if(i)return s(e,t)}function s(e,t){let n=t[t.length-1],r=i[a][0],o=i[a][1],s=0,c=n.children.indexOf(e),l=!1,u=[];r.lastIndex=0;let d=r.exec(e.value);for(;d;){let n=d.index,i={index:d.index,input:d.input,stack:[...t,e]},a=o(...d,i);if(typeof a==`string`&&(a=a.length>0?{type:`text`,value:a}:void 0),a===!1?r.lastIndex=n+1:(s!==n&&u.push({type:`text`,value:e.value.slice(s,n)}),Array.isArray(a)?u.push(...a):a&&u.push(a),s=n+d[0].length,l=!0),!r.global)break;d=r.exec(e.value)}return l?(s<e.value.length&&u.push({type:`text`,value:e.value.slice(s)}),n.children.splice(c,1,...u)):u=[e],c+u.length}}function Be(e){let t=[];if(!Array.isArray(e))throw TypeError(`Expected find and replace tuple or list of tuples`);let n=!e[0]||Array.isArray(e[0])?e:[e],r=-1;for(;++r<n.length;){let e=n[r];t.push([Ve(e[0]),He(e[1])])}return t}function Ve(e){return typeof e==`string`?new RegExp(Te(e),`g`):e}function He(e){return typeof e==`function`?e:function(){return e}}function Ue(){return(Ue=e((()=>{Re(),Ne()})))()}function We(e){ze(e,[/\r?\n|\r/g,Ge])}function Ge(){return{type:`break`}}function Ke(){return(Ke=e((()=>{Ue()})))()}function qe(){return function(e){We(e)}}function Je(){return(Je=e((()=>{Ke()})))()}function Ye(){return{failed:!1,reason:null}}function h(e){y!=null&&!y.failed&&(y.failed=!0,y.reason=e);let t=new Nt(e);throw Pt.set(t,e),t}function Xe(e,t){let n=y;y=e;try{return t()}finally{y=n}}function Ze(e){if(typeof e!=`object`&&typeof e!=`function`||e===null)return!1;let t;try{t=e.then}catch{return!0}if(typeof t!=`function`)return!1;try{t.call(e,()=>{},()=>{})}catch{}return!0}function g(e){return typeof e==`string`&&(Object.prototype.hasOwnProperty.call(kt,e)||At.has(e))?e:`unknown`}function Qe(e){let t=typeof e==`symbol`?`unknown`:e;return b.has(t)||jt.has(t)?t:`unknown`}function $e(e,t){return t===`position`||t===`data`||t===`type`||wt.includes(t)||(kt[e]?.includes(t)??!1)?t:`unknown`}function _(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function et(e,t){if(!_(e)||!_(t))return!1;for(let n of[e,t])for(let e of Object.keys(n))if(!Ft.includes(e))return!1;return Ft.every(n=>e[n]===t[n])}function tt(e,t){if(e===void 0||t===void 0)return e===t;if(!_(e)||!_(t))return!1;for(let n of[e,t])for(let e of Object.keys(n))if(!It.includes(e))return!1;return et(e.start,t.start)&&et(e.end,t.end)}function nt(e){if(!_(e))return;let t={};return typeof e.line==`number`&&(t.line=e.line),typeof e.column==`number`&&(t.column=e.column),typeof e.offset==`number`&&(t.offset=e.offset),t}function rt(e){if(!_(e))return;let t=nt(e.start),n=nt(e.end);return t==null||n==null?void 0:{start:t,end:n}}function it(e){if(Array.isArray(e)){let t=[];for(let n of e)t.push(it(n));return t}if(_(e)){let t={};for(let[n,r]of Object.entries(e))t[n]=it(r);return t}return e}function at(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>at(e,t[n]));if(_(e)&&_(t)){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>n in t&&at(e[n],t[n]))}return!1}function ot(){return{all:new Set}}function st(e,t){t.all.add(e)}function ct(e,t){return Array.isArray(e)?e.map(e=>lt(e,t)):[]}function lt(e,t){st(e,t);let n={type:e.type};switch(e.type){case`root`:case`paragraph`:case`blockquote`:case`strong`:case`emphasis`:case`delete`:case`tableRow`:case`tableCell`:case`listItem`:e.type===`listItem`&&typeof e.checked==`boolean`&&(n.checked=e.checked),n.children=ct(e.children,t);break;case`heading`:n.depth=e.depth,n.children=ct(e.children,t);break;case`text`:case`inlineCode`:case`inlineMath`:case`math`:n.value=e.value;break;case`code`:n.lang=e.lang??null,n.meta=e.meta??null,n.value=e.value;break;case`link`:n.url=e.url,n.title=null,n.children=ct(e.children,t);break;case`image`:n.url=e.url,n.title=null,n.alt=e.alt;break;case`list`:n.ordered=e.ordered,e.start!==void 0&&(n.start=e.start),e.spread!==void 0&&(n.spread=e.spread),e.delimiter!==void 0&&(n.delimiter=e.delimiter),n.children=ct(e.children,t);break;case`table`:n.align=Array.isArray(e.align)?[...e.align]:[],n.children=ct(e.children,t);break;case`citation`:n.sourceId=e.sourceId;break;case`extension`:n.plugin=e.plugin,n.name=e.name,n.display=e.display,e.source!==void 0&&(n.source=e.source)}e.data!==void 0&&(n.data=it(e.data));let r=rt(e.position);return r!=null&&(n.position=r),Object.defineProperty(n,Ct,{configurable:!1,enumerable:!0,value:e,writable:!1}),n}function ut(e,t,n){let r=e[Ct];return r===void 0?null:(_(r)&&n.index.all.has(r)||h(`a "${g(t)}" node carries forged provenance`),r.type!==t&&h(`a source "${g(r.type)}" node cannot be retyped`),n.used.has(r)&&h(`a source "${g(t)}" node cannot be duplicated`),n.used.add(r),r)}function dt(e,t){let n=kt[e];for(let r of Object.keys(t))r!==`type`&&r!==`position`&&r!==`data`&&!n.includes(r)&&h(`a "${g(e)}" node cannot carry the unsupported field "${$e(e,r)}"`)}function ft(e,t){if(t!==void 0){if(_(t))for(let n of wt)n in t&&h(`a "${g(e)}" node cannot carry the raw-markup data channel "${n}"`);return ee(t)||h(`a "${g(e)}" node's data must be finite JSON-like values`),it(t)}}function pt(e,t,n){return typeof n!=`string`&&h(`a "${g(e)}" node requires a string "${$e(e,t)}"`),n}function mt(e,t,n){n!=null&&n!==``&&h(`a "${g(e)}" node's "${$e(e,t)}" has no Astryx representation`)}function ht(e,t,n,r){if(n==null)return;e===`root`&&h(`a document can only contain one root`);let i=e===`extension`?t.display:void 0,a=Tt.has(e)||i===`inline`,o=Et.has(e)||i===`block`;(Dt.has(n)&&!a||Ot.has(n)&&!o||n===`list`&&e!==`listItem`||n===`table`&&e!==`tableRow`||n===`tableRow`&&e!==`tableCell`)&&h(`a "${g(e)}" node cannot be a child of a "${g(n)}" node`),r&&e===`link`&&h(`a link cannot be nested inside another link`)}function gt(e,t){let n=Object.keys(e).filter(t=>t!==`type`&&e[t]!==void 0),r=Object.keys(t).filter(e=>t[e]!==void 0);if(n.length!==r.length)return!1;for(let n of r){let r=t[n],i=e[n];if(r!==i){if(Array.isArray(r)&&Array.isArray(i)){if(r.length!==i.length||r.some((e,t)=>e!==i[t]))return!1}else if(!at(r,i))return!1}}return!0}function _t(e,t,n){if(n!=null&&gt(n,t))return n;let r={type:e,...t};if(n!=null)for(let e of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,e)&&Object.defineProperty(r,e,{configurable:!1,enumerable:!0,value:n[e],writable:!1});return r}function v(e,t,n,r){return Array.isArray(e)||h(`a "${g(t)}" node requires a children array`),e.map(e=>vt(e,t,n||t===`link`,r))}function vt(e,t,n,r){_(e)||h(`every transformed node must be a plain object`);let i=e.type;typeof i!=`string`&&h(`every transformed node requires a string type`),i===`html`&&h(`raw HTML has no Astryx representation`),i in kt||h(`the node type "${g(i)}" is outside the supported MDAST subset`),dt(i,e),ht(i,e,t,n);let a=ut(e,i,r);a==null?e.position!==void 0&&h(`a new "${g(i)}" node cannot carry a source position`):tt(e.position,a.position)||h(`a source "${g(i)}" node's position must stay exactly as Core authored it`);let o={};switch(i){case`root`:case`paragraph`:case`blockquote`:case`strong`:case`emphasis`:case`delete`:case`tableRow`:case`tableCell`:o.children=v(e.children,i,n,r);break;case`heading`:{let t=e.depth;(typeof t!=`number`||!Number.isInteger(t)||t<1||t>6)&&h(`a heading requires a depth between 1 and 6`),a!=null&&a.depth!==t&&h(`a source heading's depth cannot change`),o.depth=t,o.children=v(e.children,i,n,r);break}case`listItem`:{let t=e.checked;t!=null&&(typeof t!=`boolean`&&h(`a list item requires a boolean "checked" value`),o.checked=t),e.spread===!0&&h(`a loose list item has no Astryx representation`),o.children=v(e.children,i,n,r);break}case`text`:case`inlineCode`:case`inlineMath`:case`math`:o.value=pt(i,`value`,e.value);break;case`code`:{let t=e.lang;t!=null&&typeof t!=`string`&&h(`a code node requires a string or null "lang"`);let n=e.meta;n!=null&&typeof n!=`string`&&h(`a code node requires a string or null "meta"`),o.lang=t??null,n!=null&&n!==``&&(o.meta=n),o.value=pt(i,`value`,e.value);break}case`link`:{let t=pt(i,`url`,e.url);re(t)||h(`a link destination was rejected by the navigation owner`),mt(i,`title`,e.title),o.url=te(t),o.children=v(e.children,i,n,r);break}case`image`:{let t=pt(i,`url`,e.url);re(t)||h(`an image source was rejected by the resource owner`),mt(i,`title`,e.title),typeof e.alt!=`string`&&h(`an image requires its text alternative`),o.url=te(t),o.alt=e.alt;break}case`list`:{typeof e.ordered!=`boolean`&&h(`a list requires a boolean "ordered" value`),o.ordered=e.ordered;let t=e.start;t!=null&&(typeof t==`number`&&Number.isFinite(t)||h(`a list requires a finite "start" value`),o.start=t),typeof e.spread==`boolean`&&(o.spread=e.spread);let a=e.delimiter;a!==void 0&&(a!==`.`&&a!==`)`&&h(`a list requires a "." or ")" delimiter`),o.delimiter=a),o.children=v(e.children,i,n,r);break}case`table`:{let t=e.align;Array.isArray(t)&&t.every(e=>e===null||e===`left`||e===`center`||e===`right`)||h(`a table requires normalized alignment values`),o.align=[...t],o.children=v(e.children,i,n,r);break}case`thematicBreak`:case`break`:break;case`citation`:case`extension`:return a!=null&&at(e.data,a.data)&&(i===`citation`?e.sourceId===a.sourceId:e.plugin===a.plugin&&e.name===a.name&&e.display===a.display&&e.source===a.source)||h(`an Astryx "${g(i)}" node cannot be authored or changed here`),a;default:h(`the node type "${g(i)}" is outside the supported MDAST subset`)}let s=ft(i,e.data);s!==void 0&&(o.data=s),a!=null&&a.position!==void 0&&(o.position=a.position);let c=_t(i,o,a);if(i===`table`&&c!==a){let e=o.children,t=e[0]?.children?.length??0;e.some(e=>e.children?.length!==t)&&h(`a transformed table cannot have ragged rows`)}return c}function yt(e,t,n){let r=e instanceof Error?e.message:e;return{reason:r,fatal:!1,place:t??null,ruleId:n??null,toString(){return r}}}function bt(e){let t=[],n={data:{}},r={get value(){return e},get data(){return n.data},get messages(){return t},message(e,n,r){let i=yt(e,n,r);return t.push(i),i},fail(e,n,r){let i=yt(e,n,r);i.fatal=!0,t.push(i),h(Mt)},toString(){return e}};return{file:new Proxy(r,{get(e,t,n){return typeof t==`symbol`||b.has(t)||h(`the file has no "${Qe(t)}" in this profile`),Reflect.get(r,t,n)},set(e,t){h(`the file's "${Qe(t)}" cannot be assigned in this profile`)},defineProperty(e,t){h(`the file's "${Qe(t)}" cannot be assigned in this profile`)},deleteProperty(e,t){h(`the file's "${Qe(t)}" cannot be assigned in this profile`)},has(e,t){return typeof t==`symbol`||b.has(t)},ownKeys(){return[...b]},getOwnPropertyDescriptor(e,t){return typeof t!=`symbol`&&!b.has(t)?void 0:Reflect.getOwnPropertyDescriptor(r,t)}}),state:n}}function xt(e){return(e instanceof Nt?Pt.get(e):void 0)??`the plugin threw an error`}function St(e,...t){if(typeof e!=`function`)throw TypeError(`Markdown Remark adapter: plugin must be a function`);let n=!1,r=null,i=null,a=()=>{n=!0;let a=Ye();Xe(a,()=>{try{let n=e.apply(Lt,t),o=Ze(n);if(a.failed&&h(a.reason??Mt),o&&h(`an asynchronous plugin is outside the adapter`),typeof n!=`function`){i=`only a transform-only plugin returning one synchronous transformer is supported`;return}if(n.length>=3){i=`a callback-style (asynchronous) transformer is outside the adapter`;return}r=n}catch(e){i=xt(e)}}),a.failed&&i==null&&(i=a.reason,r=null)};return(e,t)=>{n||a();let o=r;if(o==null)return t.report(`Remark adapter: ${i??`the plugin failed`}`),e;let s=ot(),{file:c,state:l}=bt(t.source),u=Ye();return Xe(u,()=>{try{let n=lt(e,s),r=o(n,c),i=Ze(r);u.failed&&h(u.reason??Mt),i&&h(`an asynchronous transformer is outside the adapter`);let a=r??n;ee(l.data)||h(`file data must be finite JSON-like values`);let d=vt(a,null,!1,{index:s,used:new Set});d.type!==`root`&&h(`a transformer must return the document root`);let f=d.children;return t.display===`inline`&&(f.length!==1||f[0]?.type!==`paragraph`)&&h(`an inline document must stay one paragraph of phrasing content`),u.failed&&h(u.reason??Mt),d}catch(n){return t.report(`Remark adapter: ${u.reason??xt(n)}`),e}})}}var Ct,wt,Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,y,Ft,It,b,x,Lt;function Rt(){return(Rt=e((()=>{ie(),ne(),Ct=Symbol(`astryx.markdown.remarkOrigin`),wt=[`hName`,`hProperties`,`hChildren`],Tt=new Set([`text`,`inlineCode`,`inlineMath`,`break`,`strong`,`emphasis`,`delete`,`link`,`image`,`citation`]),Et=new Set([`heading`,`paragraph`,`code`,`math`,`blockquote`,`list`,`table`,`thematicBreak`,`image`]),Dt=new Set([`heading`,`paragraph`,`strong`,`emphasis`,`delete`,`link`,`tableCell`]),Ot=new Set([`root`,`blockquote`,`listItem`]),kt={root:[`children`],paragraph:[`children`],heading:[`depth`,`children`],blockquote:[`children`],strong:[`children`],emphasis:[`children`],delete:[`children`],tableRow:[`children`],tableCell:[`children`],text:[`value`],inlineCode:[`value`],inlineMath:[`value`],math:[`value`],code:[`lang`,`meta`,`value`],link:[`url`,`title`,`children`],image:[`url`,`title`,`alt`],list:[`ordered`,`start`,`spread`,`delimiter`,`children`],listItem:[`checked`,`spread`,`children`],table:[`align`,`children`],thematicBreak:[],break:[],citation:[`sourceId`],extension:[`plugin`,`name`,`display`,`source`]},At=new Set([`html`,`yaml`,`toml`,`definition`,`footnote`,`footnoteDefinition`,`footnoteReference`,`imageReference`,`linkReference`,`containerDirective`,`leafDirective`,`textDirective`,`mdxjsEsm`,`mdxFlowExpression`,`mdxTextExpression`,`mdxJsxFlowElement`,`mdxJsxTextElement`]),jt=new Set([`path`,`cwd`,`history`,`basename`,`dirname`,`extname`,`stem`,`stored`,`result`,`map`,`contents`]),Mt=`the plugin reported the document as unsupported`,Nt=class extends Error{},Pt=new WeakMap,y=null,Ft=[`line`,`column`,`offset`],It=[`start`,`end`],b=new Set([`value`,`data`,`messages`,`message`,`fail`,`toString`]),x=`processor registration is outside the adapter`,Lt=new Proxy(Object.freeze({}),{get(){h(x)},set(){h(x)},defineProperty(){h(x)},deleteProperty(){h(x)},apply(){h(x)},has(){return!1},ownKeys(){return[]}})})))()}function zt(e,t){t(e);for(let n of[...e.children??[]])zt(n,t)}var Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt;function Xt(){return(Xt=e((()=>{Je(),ie(),le(),Rt(),Bt=n(),Vt=/\bSPEC-\d+\b/,Ht=({basePath:e})=>t=>{zt(t,t=>{t.children!=null&&t.type!==`link`&&(t.children=t.children.flatMap(t=>{if(t.type!==`text`||typeof t.value!=`string`)return[t];let n=t.value.split(RegExp(`(${Vt.source})`,`g`));return n.length===1?[t]:n.filter(e=>e!==``).map(t=>RegExp(`^${Vt.source}$`).test(t)?{type:`link`,url:`${e}/${t.slice(5)}`,title:null,children:[{type:`text`,value:t}]}:{type:`text`,value:t})}))})},Ut=()=>e=>{e.children?.push({type:`html`,value:`<button onclick="alert(1)">Injected</button>`})},Wt=()=>e=>{zt(e,e=>{e.type===`link`&&(e.url=`javascript:alert(1)`)})},Gt=p({name:`demo-spec-badges`,apiVersion:1,transform:me({pattern:new RegExp(Vt.source,`g`),requiredSubstrings:[`SPEC-`],replace:e=>({type:`extension`,plugin:`demo-spec-badges`,name:`badge`,display:`inline`,data:{label:e[0]}})}),renderers:{badge:{render:({node:e})=>(0,Bt.jsx)(`mark`,{"data-spec-badge":!0,children:e.data.label}),toText:e=>e.data.label}}}),Kt=p({name:`demo-remark-breaks`,apiVersion:1,transform:St(qe)}),qt=p({name:`demo-remark-spec-links`,apiVersion:1,transform:St(Ht,{basePath:`/specs`})}),Jt=p({name:`demo-remark-raw-html`,apiVersion:1,transform:St(Ut)}),Yt=p({name:`demo-remark-unsafe-links`,apiVersion:1,transform:St(Wt)})})))()}function S({width:e,children:t}){return(0,w.jsx)(`div`,{style:{width:Number(e),maxWidth:`100%`,padding:12,outline:`1px dashed #c33`},children:(0,w.jsx)(m,{children:t})})}function Zt({code:e,language:t}){return(0,w.jsxs)(`figure`,{"aria-label":`Host code renderer: ${t??`plaintext`}`,style:{margin:`12px 0`,padding:12,border:`1px dashed currentColor`,borderRadius:8},children:[(0,w.jsxs)(`figcaption`,{style:{fontSize:12,marginBottom:8},children:[`Host code renderer · `,t??`plaintext`]}),(0,w.jsx)(`pre`,{style:{margin:0},children:e})]})}var C,w,T,Qt,E,$t,en,tn,D,O,k,A,nn,j,rn,M,N,P,F,an,on,I,sn,cn,L,R,ln,un,dn,z,B,V,H,U,W,G,fn,K,q,J,pn,Y,mn,X,Z,Q,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,$,En;function Dn(){return(Dn=e((()=>{C=t(),ae(),s(),l(),d(),we(),a(),oe(),r(),pe(),Xt(),w=n(),{expect:T,userEvent:Qt,within:E}=__STORYBOOK_MODULE_TEST__,$t={title:`Core/Markdown`,component:m,tags:[`autodocs`],argTypes:{density:{control:`select`,options:[`default`,`compact`]},headingLevelStart:{control:`select`,options:[1,2,3,4,5,6]},isStreaming:{control:`boolean`},display:{control:`select`,options:[`block`,`inline`]}}},en=`# Markdown Demo

Renders **markdown** with *design-system-consistent* styling.

## Features

- Headings mapped to Astryx type scale
- **Bold**, *italic*, and ~~strikethrough~~ text
- [Links](https://example.com) with external detection
- Inline \`code\` and fenced code blocks

### Code Block

\`\`\`typescript
interface User {
  id: string;
  name: string;
}

function greet(user: User) {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

### Blockquote

> Design systems free teams to focus on problems that matter.

### Table

| Component | Status | Tests |
|:----------|:------:|------:|
| Markdown | Active | 73 |
| CodeBlock | Active | 44 |

### Task List

- [x] Parser
- [x] Renderer
- [ ] Storybook stories

---

1. First ordered item
2. Second ordered item`,tn=`## Setting Up a Design System

A design system is more than a component library — it's a **shared language** between design and engineering. Here's how to build one that scales.

### 1. Start with Tokens

Design tokens are the atomic values that define your visual language:

\`\`\`typescript
const tokens = {
  color: {
    primary: '#0066FF',
    secondary: '#6B7280',
    success: '#10B981',
    danger: '#EF4444',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
};
\`\`\`

These tokens should be the *single source of truth* for every component.

### 2. Component Architecture

Good components follow these principles:

- **Composable** — small pieces that combine into complex UIs
- **Accessible** — keyboard navigation and screen reader support built-in
- **Themeable** — visual customization without forking
- **Documented** — usage examples, props tables, and do/don't guidelines

> The best design systems are *opinionated enough* to ensure consistency, but *flexible enough* to handle edge cases gracefully.

### 3. Adoption Strategy

Rolling out a design system requires planning:

| Phase | Duration | Goal |
|:------|:--------:|:-----|
| Alpha | 4 weeks | Core components, internal dogfooding |
| Beta | 8 weeks | Expanded component set, 2-3 pilot teams |
| GA | Ongoing | Full adoption, migration support |

Key metrics to track:

1. **Component coverage** — what percentage of UI patterns are served
2. **Adoption rate** — teams actively using the system
3. **Contribution rate** — external PRs and feature requests
4. **Consistency score** — visual audits across products

### 4. Maintenance

A design system is a *living product*. Plan for:

- [x] Automated visual regression testing
- [x] Semantic versioning with changelogs
- [ ] Breaking change codemods
- [ ] Cross-platform support (web, mobile, native)

---

The most important thing? **Ship early, iterate often.** A design system that exists and is used beats a perfect one that's still in planning.`,D={args:{children:en}},O={args:{children:en,density:`compact`}},k={name:`AI Response`,args:{children:tn,density:`compact`,headingLevelStart:3}},A={name:`Lazy continuations`,args:{children:`## Wrapped container paragraphs

> A quoted paragraph can wrap onto another source line
without repeating the quote marker.
>
> A later paragraph can wrap too
and remain in the same quote.

- A list item can wrap the same way
without repeating its indentation.

- [ ] A task item also keeps
its unindented continuation.

> 1. > Nested quote text
continues in the deepest open paragraph.

This paragraph follows all containers.`}},nn=Array.from({length:9},(e,t)=>t),j={name:`Nested lists`,parameters:{docs:{description:{story:`Each nesting level draws its own marker: bulleted lists cycle disc, circle, square and numbered lists cycle decimal, lower-alpha, lower-roman, counting lists of either kind. A numbered list keeps its start.`}}},args:{children:[`## Bulleted`,``,...nn.map(e=>`${`  `.repeat(e)}- Bullet at depth ${e}`),``,`## Numbered`,``,...nn.map(e=>`${`   `.repeat(e)}1. Number at depth ${e}`),``,`## Mixed`,``,`- Mixed at depth 0`,`  1. Mixed at depth 1`,`     - Mixed at depth 2`,`       1. Mixed at depth 3`,``,`## Starts`,``,`26. Start 26`,``,`A paragraph ends that list.`,``,`0. Start 0`].join(`
`)}},rn={args:{children:[`8. Eight`,`   1. Nested under eight`,`9. Nine`,`   1. Nested under nine`,`10. Ten`,`    1. Nested under ten`,`11. Eleven`,`12. Twelve`,``,`## Roman counters`,``,`1. Outer`,`   1. Middle`,...Array.from({length:8},(e,t)=>`      ${t+1}. Roman item ${t+1}`)].join(`
`)}},M={name:`Shifted Headings (start at h3)`,args:{children:en,headingLevelStart:3}},N={name:`Inline Display`,render:()=>(0,w.jsxs)(`div`,{style:{maxWidth:680,display:`grid`,gap:16},children:[(0,w.jsx)(i,{type:`large`,display:`block`,children:(0,w.jsx)(m,{display:`inline`,children:"Use `value` with **controlled state** and [read the docs](https://example.com) without creating block wrappers."})}),(0,w.jsxs)(`div`,{style:{border:`1px solid #ddd`,borderRadius:8,padding:12,display:`grid`,gap:6},children:[(0,w.jsx)(i,{type:`body`,weight:`bold`,display:`block`,children:`Prop description`}),(0,w.jsx)(i,{type:`body`,color:`secondary`,display:`block`,children:(0,w.jsx)(m,{display:`inline`,children:'Accepts an action item `{label, onClick?, icon?}`, a divider `{type: "divider"}`, or a section `{type: "section", items: [...]}`.'})})]})]})},P={name:`Table`,args:{children:`## Comparison Table

| Feature | React | Vue | Svelte |
|:--------|:-----:|:---:|-------:|
| Virtual DOM | Yes | Yes | No |
| Bundle Size | ~40KB | ~30KB | ~2KB |
| TypeScript | Native | Plugin | Native |
| Learning Curve | Medium | Easy | Easy |`}},F={width:{control:`select`,options:[`320`,`390`,`528`,`1024`],description:`Width of the reading column the table renders inside, in px`}},an=`| Step | Time | Code | Tier | Runs | Team |
|---|---|---|---|---|---|
| Init | 12 ms | 200 | A | 3 | Core |
| Sync | 84 ms | 200 | A | 1 | Core |
| Lint | 2.1 s | 422 | B | 2 | Docs |
| Ship | 9.4 s | 200 | A | 1 | Docs |`,on="| Identifier | Endpoint | Status | Accessibility status and remediation owner |\n|---|---|---|---|\n| [PR #6860](https://github.com/meta/astryx/pull/6860) | https://example.com/v2/pipelines/build/runs/1284/logs | `needs_revision_before_landing_v2` | Pass |\n| [PR #6852](https://github.com/meta/astryx/pull/6852) | https://example.com/v2/pipelines/docs/runs/97/logs | `ContentNegotiationMiddleware` | Review |",I={name:`Table — six short columns`,parameters:{docs:{description:{story:"Six short columns fit the reading column instead of squashing. Each column keeps a content-derived floor in `ch` on its text box, so the floor means the same number of characters whatever the cell padding is, and a table this narrow never needs to scroll."}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:an})},sn=`| Stage | What it does | When it runs | What it needs | What it emits | Who reads it |
|---|---|---|---|---|---|
| Parse | Turns the source text into blocks and inline nodes | On every edit | The raw document | A canonical tree | The renderer |
| Render | Maps each node in the tree onto a part | After a parse | A canonical tree | Rendered output | The reader |`,cn=[`| Status | Owner |`,`|---|---|`,``,`| A | B | C |`,`|---|---|---|`,`|  | only the middle cell has content |  |`,``,`| Key | Value |`,`|---|---|`,`| digest | ${`a1b2c3d4e5`.repeat(18)} |`,``,`| Ref | Where it points |`,`|---|---|`,"| [the parser guide](https://example.com/docs/parser) and `parseDocument` | Both in one cell |",``,`| Id | Description |`,`|---|---|`,`| 7 | A column at the minimum floor next to one that reaches the cap and keeps going well past it |`].join(`
`),L={name:`Table — six prose columns`,parameters:{docs:{description:{story:`Prose columns have no long tokens, so min-content alone would let six of them wrap one word per line. The readable floor — half the longest cell, capped — gives each column enough width to wrap to a couple of lines instead.`}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:sn})},R={name:`Table — edge shapes`,parameters:{docs:{description:{story:`Five shapes that stress the column floor: a header row with no body, empty cells, a 180-character token far past the floor cap (the column grows to its min-content rather than breaking the token), a cell mixing a link with inline code, and a minimum-floor column beside a capped one.`}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:cn})},ln="| Method | Path | Behavior | Response |\n|---|---|---|---|\n| `GET` | `/v2/projects/{projectId}/documents` | Lists documents in the project, newest first. Paginates with `cursor`. | `200` `DocumentPage` |\n| `POST` | `/v2/projects/{projectId}/documents` | Creates a document. Rejects a duplicate `slug` in the same project. | `201` `Document`, `409` on conflict |\n| `PATCH` | `/v2/documents/{documentId}` | Updates title, body, or tags. Fields left out are untouched. | `200` `Document` |\n| `DELETE` | `/v2/documents/{documentId}` | Soft-deletes the document; it stays readable for 30 days. | `204` no content |",un="| Service | Environment | Version | State | Updated | Owner |\n|---|---|---|---|---|---|\n| `web-gateway` | production | `4.12.0` | Healthy | 2 h ago | Platform |\n| `web-gateway` | staging | `4.13.0-rc.2` | Rolling out | 11 min ago | Platform |\n| `search-indexer` | production | `2.8.4` | Degraded — reindexing a shard after a failed migration | 40 min ago | Search |\n| `notifications` | production | `1.30.1` | Healthy | 6 h ago | Messaging |",dn=`| Capability | Available on the free plan | Included in the team plan | Notes for administrators |
|---|---|---|---|
| Single sign-on | No | Yes | Requires a verified domain and a SAML or OIDC provider. |
| Audit log retention | 7 days | 400 days | Exportable as newline-delimited JSON from the admin console. |
| Scheduled exports | No | Yes | Runs nightly; a failed run retries twice before it alerts the owner. |
| Seats included | 3 | 25 | Additional seats are billed monthly and prorated. |`,z={name:`Table — API reference`,parameters:{docs:{description:{story:"A real API reference in a narrow reading column: a two-character method column beside routes that must stay readable. The path column is floored by its own content, so `/v2/projects/{projectId}/documents` does not split across lines, and the table scrolls rather than squashing the method column to nothing."}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:ln})},B={name:`Table — release status`,parameters:{docs:{description:{story:"A deployment dashboard pasted into a narrow column: six columns, most of them short, one carrying a sentence. Version strings such as `4.13.0-rc.2` stay whole, and the short columns keep their minimum floor instead of collapsing to a character apiece."}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:un})},V={name:`Table — feature comparison`,parameters:{docs:{description:{story:"A plan comparison matrix, where the headers are longer than the cells under them. Each header reads on one line up to its cap and wraps past it — never truncating to `Availabl…` — and a two-character cell such as `No` still gets a readable column."}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:dn})},H={name:`Table — wide, token-heavy content`,parameters:{docs:{description:{story:`Long identifiers, a long URL, and inline code stay whole: the column is never narrower than its longest unbreakable token, and the table scrolls in Table’s own Scroll region rather than shredding words. Header labels wrap past their one-line cap instead of ellipsizing.`}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(S,{width:e,children:on})},U={name:`Table — in a chat message`,parameters:{docs:{description:{story:"The narrow reading column as chat surfaces actually have it: a deployment status table — the kind an assistant answers with — inside a `ChatMessageBubble`, which already accepts Markdown as its content. The bubble constrains the message, and the table still keeps its column floors and scrolls inside Table’s own Scroll region — the bubble adds no second scroller."}}},argTypes:F,args:{width:`390`},render:({width:e})=>(0,w.jsx)(`div`,{style:{width:Number(e),maxWidth:`100%`,padding:12,outline:`1px dashed #c33`},children:(0,w.jsxs)(c,{children:[(0,w.jsx)(u,{sender:`user`,children:(0,w.jsx)(f,{children:`Which services are still rolling out?`})}),(0,w.jsx)(u,{sender:`assistant`,children:(0,w.jsx)(f,{children:(0,w.jsx)(m,{density:`compact`,children:un})})})]})})},W={render:()=>{let e=tn,[t,n]=(0,C.useState)(0),[r,i]=(0,C.useState)(!0),[a,s]=(0,C.useState)(0);(0,C.useEffect)(()=>{if(!r)return;if(t>=e.length){i(!1);return}let a=Math.floor(Math.random()*8)+2,o=30+Math.random()*60,s=setTimeout(()=>{n(t=>Math.min(t+a,e.length))},o);return()=>clearTimeout(s)},[t,r,e]);let c=(0,C.useCallback)(()=>{n(0),i(!0),s(e=>e+1)},[]);return(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`div`,{style:{marginBlockEnd:12,display:`flex`,gap:8,alignItems:`center`},children:[(0,w.jsx)(o,{label:`Replay`,variant:`secondary`,size:`sm`,onClick:c,isDisabled:r}),(0,w.jsx)(`span`,{style:{fontSize:12,color:`var(--color-text-secondary)`},children:r?`Streaming... ${t}/${e.length}`:`Complete`})]}),(0,w.jsx)(m,{isStreaming:r,density:`compact`,headingLevelStart:3,children:e.slice(0,t)},a)]})}},G={name:`With Images`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:800},children:(0,w.jsx)(m,{children:`
Here is some text before the image.

![A landscape photo](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=680&h=400&fit=crop&auto=format)

Text between two images.

![A tall portrait photo](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop&auto=format)

And here's a really wide one:

![Wide panoramic shot](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=300&fit=crop&auto=format)

Final paragraph after all images.
`})})},fn=`
# Content Alignment

This paragraph is constrained by \`contentWidth\`. Notice how it's narrower than the code block and table below. The alignment prop controls where this narrow prose sits within the wider container.

Here's a bullet list that also respects prose width:
- First item with some explanation text
- Second item that wraps to show the width constraint
- Third item for good measure

\`\`\`typescript
// Code blocks break out to full container width regardless of contentAlign
export function calculateLayout(items: Item[], containerWidth: number): Layout {
  const columns = Math.floor(containerWidth / COLUMN_MIN_WIDTH);
  return { columns, gap: GRID_GAP, items: distributeItems(items, columns) };
}
\`\`\`

Back to prose — this paragraph is aligned according to the \`contentAlign\` prop while the code block above spans the full width.

| Component | Status | Notes |
|-----------|--------|-------|
| Button | Stable | Full API |
| CodeBlock | Stable | With collapsible |
| Markdown | In progress | Adding alignment |

Final paragraph after the table.
`,K={name:`Content Align: Start`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:900,border:`1px dashed #ccc`,padding:16},children:(0,w.jsx)(m,{contentWidth:580,contentAlign:`start`,children:fn})})},q={name:`Content Align: Center`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:900,border:`1px dashed #ccc`,padding:16},children:(0,w.jsx)(m,{contentWidth:580,contentAlign:`center`,children:fn})})},J={name:`Inline Plugins`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{inlinePlugins:[{pattern:/\b([A-Z][A-Z0-9]+-\d+)\b/g,render:(e,t)=>(0,w.jsx)(se,{href:`https://issues.example.com/browse/${e[1]}`,isExternalLink:!0,weight:`semibold`,children:e[0]},t)},{pattern:/#(\d+)/g,render:(e,t)=>(0,w.jsx)(se,{href:`https://github.com/org/repo/issues/${e[1]}`,isExternalLink:!0,weight:`semibold`,children:e[0]},t)}],density:`compact`,headingLevelStart:2,children:`## Release Notes — v2.1.0

This release fixes several issues reported in PROJ-42 and introduces
the inline plugins feature requested in #1873.

### Bug Fixes

- Fixed crash in streaming mode (BUG-789)
- Resolved memory leak in chat components (PROJ-101)
- **Bold context**: Plugin works inside **PROJ-55 formatting**

### Code Example (not linkified)

\`\`\`typescript
// PROJ-999 and BUG-888 should NOT become links inside code blocks
const ticketId = "PROJ-999";
\`\`\`

Inline code is also safe: \`PROJ-999\` stays as plain text.

### Migration Guide

See PROJ-200 for the full pattern. Also check [the docs](/docs/markdown)
for usage alongside regular markdown links.`})})},pn=({value:e,display:t})=>(0,w.jsx)(t===`block`?`div`:`span`,{role:`math`,"aria-label":`Formula: ${e}`,style:{display:t===`block`?`block`:`inline`,padding:t===`block`?`12px 16px`:`1px 4px`,marginBlock:t===`block`?12:void 0,border:`1px solid var(--color-border)`,borderRadius:6,fontFamily:`serif`,fontStyle:`italic`,textAlign:t===`block`?`center`:void 0},children:e}),Y={name:`Custom Math Renderer`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{components:{math:pn},children:`A renderer can typeset inline math such as $E = mc^2$ without preprocessing the source.

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

Code remains opaque: \`$not_math$\`.`})})},mn=`First line
Second **emphasized** line

[Linked
label](/docs) stays one protected link.

\`\`\`text
fenced
code
\`\`\``,X={name:`First-party soft breaks`,parameters:{docs:{description:{story:`The first-party native plugin matches adapted remark-breaks output for supported prose. Links and code remain protected in both paths.`}}},render:()=>(0,w.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:680},children:[(0,w.jsxs)(`section`,{"data-soft-breaks":`native`,children:[(0,w.jsx)(i,{children:`Native first-party plugin`}),(0,w.jsx)(m,{plugins:[Ce],children:mn})]}),(0,w.jsxs)(`section`,{"data-soft-breaks":`remark`,children:[(0,w.jsx)(i,{children:`Adapted remark-breaks`}),(0,w.jsx)(m,{plugins:[Kt],children:mn})]})]}),play:async({canvasElement:e})=>{let t=t=>{let n=e.querySelector(`[data-soft-breaks="${t}"]`);if(n==null)throw Error(`missing soft-breaks pane: ${t}`);return n},n=t(`native`),r=t(`remark`);await T(n.querySelectorAll(`br`)).toHaveLength(2),await T(r.querySelectorAll(`br`)).toHaveLength(2),await T(n.querySelector(`p`)?.innerHTML).toBe(r.querySelector(`p`)?.innerHTML),await T(E(n).getByRole(`link`,{name:`Linked label`})).toHaveAttribute(`href`,`/docs`),await T(E(r).getByRole(`link`,{name:`Linked label`})).toHaveAttribute(`href`,`/docs`),await T(n.querySelector(`code`)?.textContent).toBe(`fenced
code`),await T(r.querySelector(`code`)?.textContent).toBe(`fenced
code`)}},Z={name:`Syntax Plugins`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{plugins:ue,children:`# Plugin composition

Hello @{Ada}. Ordinary **Markdown** keeps its behavior, while TODO becomes a transform-owned node.

:::note
This callout and mention are typed extension nodes.
:::

Protected contexts stay literal: \`TODO @{Linus}\` and [TODO @{Grace}](/people).`})})},Q={name:`Plugin renderer with Suspense`,render:()=>{let[e,t]=(0,C.useState)(0),n=(0,C.useMemo)(()=>he(),[e]);return(0,w.jsxs)(`div`,{style:{maxWidth:680},children:[(0,w.jsx)(`div`,{style:{marginBlockEnd:12},children:(0,w.jsx)(o,{label:`Replay delayed renderer`,variant:`secondary`,size:`sm`,onClick:()=>t(e=>e+1)})}),(0,w.jsx)(m,{plugins:[n],children:`Before the async node.

Hello @{Ada}. This sibling Markdown renders immediately.

After the async node.`},e)]})}},hn={name:`Semantic Fence`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{plugins:[fe],children:"# Build flow\n\n```diagram Checkout to deploy\nCheckout --> Test --> Deploy\n```\n\nThe plugin renderer presents typed data only for declared languages. Other fences keep the ordinary copyable code fallback:\n\n```text\npnpm test\n```"})})},gn={name:`Semantic Fence With Code Renderer`,render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{plugins:[fe],components:{code:Zt},children:'# Build flow\n\nThe fence plugin claims `diagram` fences, so they render through the plugin even though the host supplies its own code renderer:\n\n```diagram Checkout to deploy\nCheckout --> Test --> Deploy\n```\n\nEvery fence no plugin claims renders through the host code renderer:\n\n```ts\nconst stage = "deploy";\n```'})})},_n=`# Release notes

The parser now streams incrementally.

Everything else is unchanged.`,vn={name:`Source Decoration Metadata`,render:()=>{let{plugins:e,readout:t}=de(_n,`The parser now streams incrementally.`);return(0,w.jsxs)(`div`,{style:{maxWidth:680},children:[(0,w.jsx)(m,{plugins:e,children:_n}),(0,w.jsxs)(i,{children:[`Decorations recorded while rendering: `,t.join(`, `)||`none`,`. The document above is identical with and without them because the helper records metadata rather than visual presentation.`]})]})}},yn=`# Plugin composition

Hello @{Ada}. TODO becomes a transform-owned node, and SPEC-4821 is claimed
by whichever plugin runs first, next to an [Authored link](/people).

:::note
Native syntax and an adapted Remark transform share one ordered list.
:::

Protected contexts stay literal: \`TODO @{Linus} SPEC-9999\`.

\`\`\`txt
SPEC-9999 stays copyable
\`\`\``,bn=[...ue,Gt,qt],xn=[...ue,qt,Gt],Sn={name:`Native and Remark plugins`,parameters:{docs:{description:{story:`Native syntax plugins and one adapted synchronous Remark transform run in the same ordered list, and the order decides the outcome. Both claim SPEC-4821: running the native badge first leaves the Remark transform nothing to link, and running the Remark transform first puts the text inside a link, which the native helper treats as a protected context. Astryx keeps ownership of the transformed destination, and code stays copyable either way.`}}},render:()=>(0,w.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:680},children:[(0,w.jsxs)(`section`,{"data-order":`native-first`,children:[(0,w.jsx)(i,{children:`Native badge plugin first`}),(0,w.jsx)(m,{plugins:bn,children:yn})]}),(0,w.jsxs)(`section`,{"data-order":`remark-first`,children:[(0,w.jsx)(i,{children:`Adapted Remark plugin first`}),(0,w.jsx)(m,{plugins:xn,children:yn})]})]}),play:async({canvasElement:e})=>{let t=E(e),n=t=>{let n=e.querySelector(`[data-order="${t}"]`);if(n==null)throw Error(`missing pane: ${t}`);return n},r=E(n(`native-first`)),i=E(n(`remark-first`));await T(r.getByText(`@Ada`)).toBeInTheDocument(),await T(r.getByLabelText(`Note`)).toBeInTheDocument(),await T(r.getByText(`TODO`)).toBeInTheDocument();let a=r.getByText(`SPEC-4821`);await T(a).toHaveAttribute(`data-spec-badge`),await T(r.queryByRole(`link`,{name:`SPEC-4821`})).not.toBeInTheDocument();let o=i.getByRole(`link`,{name:`SPEC-4821`});await T(o).toHaveAttribute(`href`,`/specs/4821`),await T(i.getByText(`SPEC-4821`)).not.toHaveAttribute(`data-spec-badge`),await T(t.getAllByText(`TODO @{Linus} SPEC-9999`)).toHaveLength(2),await T(t.getAllByText(`SPEC-9999 stays copyable`)).toHaveLength(2),await T(i.getAllByRole(`link`).map(e=>e.textContent)).toEqual([`SPEC-4821`,`Authored link`]),o.focus(),await T(o).toHaveFocus(),await Qt.tab(),await T(i.getByRole(`link`,{name:`Authored link`})).toHaveFocus()}},Cn=`---
title: Plugin rollout
status: ready
---
# Plugin rollout

Hello @{Ada}. TODO tracks SPEC-4821.

\`\`\`diagram Release path
Author --> Review --> Publish
\`\`\``,wn={name:`Native frontmatter with full plugin stack`,render:()=>{let e=ce.parse(Cn),{plugins:t}=de(Cn,`Plugin rollout`),n=[ce.plugin,...ue,fe,qt,...t],r=e.status===`match`?`${e.metadata.title} — ${e.metadata.status}`:`No document metadata`;return(0,w.jsxs)(`div`,{style:{maxWidth:680},children:[(0,w.jsxs)(i,{children:[`Document metadata: `,r]}),(0,w.jsx)(m,{plugins:n,children:Cn})]})},play:async({canvasElement:e})=>{let t=E(e);await T(t.getByText(`Document metadata: Plugin rollout — ready`)).toBeInTheDocument(),await T(t.getByRole(`heading`,{name:`Plugin rollout`})).toBeInTheDocument(),await T(t.getByText(`@Ada`)).toBeInTheDocument(),await T(t.getByText(`TODO`)).toBeInTheDocument(),await T(t.getByRole(`link`,{name:`SPEC-4821`})).toHaveAttribute(`href`,`/specs/4821`),await T(t.getByRole(`figure`,{name:`Release path`})).toBeVisible(),await T(t.queryByText(`title: Plugin rollout`)).not.toBeInTheDocument()}},Tn={name:`Remark outside the profile`,parameters:{docs:{description:{story:`A plugin that emits raw HTML or a rejected destination falls closed: the last valid document stays readable, no markup is injected, and the authored destination survives.`}}},render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{plugins:[Jt,Yt],children:`# Still readable

Prose survives with its [authored link](/people).`})}),play:async({canvasElement:e})=>{let t=E(e);await T(t.getByRole(`heading`,{name:`Still readable`})).toBeInTheDocument(),await T(t.getByRole(`link`,{name:`authored link`})).toHaveAttribute(`href`,`/people`),await T(t.queryByText(`Injected`)).not.toBeInTheDocument()}},$={name:`Plugins omitted baseline`,parameters:{docs:{description:{story:`The same source without plugins. Extension syntax stays literal, no badge or transformed link exists, so opting in is the only thing that changes behavior.`}}},render:()=>(0,w.jsx)(`div`,{style:{maxWidth:680},children:(0,w.jsx)(m,{children:yn})}),play:async({canvasElement:e})=>{let t=E(e);await T(t.queryByRole(`link`,{name:`SPEC-4821`})).not.toBeInTheDocument(),await T(t.queryByLabelText(`Note`)).not.toBeInTheDocument(),await T(t.getByText(/Hello @\{Ada\}/)).toBeInTheDocument(),await T(t.getByRole(`link`,{name:`Authored link`})).toBeInTheDocument()}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    children: SAMPLE_MD
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    children: SAMPLE_MD,
    density: 'compact'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'AI Response',
  args: {
    children: STREAMING_RESPONSE,
    density: 'compact',
    headingLevelStart: 3
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Lazy continuations',
  args: {
    children: ['## Wrapped container paragraphs', '', '> A quoted paragraph can wrap onto another source line', 'without repeating the quote marker.', '>', '> A later paragraph can wrap too', 'and remain in the same quote.', '', '- A list item can wrap the same way', 'without repeating its indentation.', '', '- [ ] A task item also keeps', 'its unindented continuation.', '', '> 1. > Nested quote text', 'continues in the deepest open paragraph.', '', 'This paragraph follows all containers.'].join('\\n')
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Nested lists',
  parameters: {
    docs: {
      description: {
        story: 'Each nesting level draws its own marker: bulleted lists cycle disc, circle, square and numbered lists cycle decimal, lower-alpha, lower-roman, counting lists of either kind. A numbered list keeps its start.'
      }
    }
  },
  args: {
    children: ['## Bulleted', '', ...NESTED_LIST_DEPTHS.map(depth => \`\${'  '.repeat(depth)}- Bullet at depth \${depth}\`), '', '## Numbered', '', ...NESTED_LIST_DEPTHS.map(depth => \`\${'   '.repeat(depth)}1. Number at depth \${depth}\`), '', '## Mixed', '', '- Mixed at depth 0', '  1. Mixed at depth 1', '     - Mixed at depth 2', '       1. Mixed at depth 3', '', '## Starts', '', '26. Start 26', '', 'A paragraph ends that list.', '', '0. Start 0'].join('\\n')
  }
}`,...j.parameters?.docs?.source}}},rn.parameters={...rn.parameters,docs:{...rn.parameters?.docs,source:{originalSource:`{
  args: {
    children: ['8. Eight', '   1. Nested under eight', '9. Nine', '   1. Nested under nine', '10. Ten', '    1. Nested under ten', '11. Eleven', '12. Twelve', '', '## Roman counters', '', '1. Outer', '   1. Middle', ...Array.from({
      length: 8
    }, (_, index) => \`      \${index + 1}. Roman item \${index + 1}\`)].join('\\n')
  }
}`,...rn.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Shifted Headings (start at h3)',
  args: {
    children: SAMPLE_MD,
    headingLevelStart: 3
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Inline Display',
  render: () => <div style={{
    maxWidth: 680,
    display: 'grid',
    gap: 16
  }}>
      <Text type="large" display="block">
        <Markdown display="inline">
          {'Use \`value\` with **controlled state** and [read the docs](https://example.com) without creating block wrappers.'}
        </Markdown>
      </Text>

      <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 12,
      display: 'grid',
      gap: 6
    }}>
        <Text type="body" weight="bold" display="block">
          Prop description
        </Text>
        <Text type="body" color="secondary" display="block">
          <Markdown display="inline">
            {'Accepts an action item \`{label, onClick?, icon?}\`, a divider \`{type: "divider"}\`, or a section \`{type: "section", items: [...]}\`.'}
          </Markdown>
        </Text>
      </div>
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Table',
  args: {
    children: ['## Comparison Table', '', '| Feature | React | Vue | Svelte |', '|:--------|:-----:|:---:|-------:|', '| Virtual DOM | Yes | Yes | No |', '| Bundle Size | ~40KB | ~30KB | ~2KB |', '| TypeScript | Native | Plugin | Native |', '| Learning Curve | Medium | Easy | Easy |'].join('\\n')
  }
}`,...P.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Table — six short columns',
  parameters: {
    docs: {
      description: {
        story: 'Six short columns fit the reading column instead of squashing. Each column keeps a content-derived floor in \`ch\` on its text box, so the floor means the same number of characters whatever the cell padding is, and a table this narrow never needs to scroll.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{SHORT_SIX_COLUMN_TABLE}</ReadingColumn>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Table — six prose columns',
  parameters: {
    docs: {
      description: {
        story: 'Prose columns have no long tokens, so min-content alone would let six of them wrap one word per line. The readable floor — half the longest cell, capped — gives each column enough width to wrap to a couple of lines instead.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{SIX_PROSE_COLUMN_TABLE}</ReadingColumn>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Table — edge shapes',
  parameters: {
    docs: {
      description: {
        story: 'Five shapes that stress the column floor: a header row with no body, empty cells, a 180-character token far past the floor cap (the column grows to its min-content rather than breaking the token), a cell mixing a link with inline code, and a minimum-floor column beside a capped one.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{EDGE_SHAPE_TABLES}</ReadingColumn>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Table — API reference',
  parameters: {
    docs: {
      description: {
        story: 'A real API reference in a narrow reading column: a two-character method column beside routes that must stay readable. The path column is floored by its own content, so \`/v2/projects/{projectId}/documents\` does not split across lines, and the table scrolls rather than squashing the method column to nothing.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{API_REFERENCE_TABLE}</ReadingColumn>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Table — release status',
  parameters: {
    docs: {
      description: {
        story: 'A deployment dashboard pasted into a narrow column: six columns, most of them short, one carrying a sentence. Version strings such as \`4.13.0-rc.2\` stay whole, and the short columns keep their minimum floor instead of collapsing to a character apiece.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{RELEASE_STATUS_TABLE}</ReadingColumn>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Table — feature comparison',
  parameters: {
    docs: {
      description: {
        story: 'A plan comparison matrix, where the headers are longer than the cells under them. Each header reads on one line up to its cap and wraps past it — never truncating to \`Availabl…\` — and a two-character cell such as \`No\` still gets a readable column.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{FEATURE_COMPARISON_TABLE}</ReadingColumn>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Table — wide, token-heavy content',
  parameters: {
    docs: {
      description: {
        story: 'Long identifiers, a long URL, and inline code stay whole: the column is never narrower than its longest unbreakable token, and the table scrolls in Table’s own Scroll region rather than shredding words. Header labels wrap past their one-line cap instead of ellipsizing.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{WIDE_TOKEN_TABLE}</ReadingColumn>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Table — in a chat message',
  parameters: {
    docs: {
      description: {
        story: 'The narrow reading column as chat surfaces actually have it: a deployment status table — the kind an assistant answers with — inside a \`ChatMessageBubble\`, which already accepts Markdown as its content. The bubble constrains the message, and the table still keeps its column floors and scrolls inside Table’s own Scroll region — the bubble adds no second scroller.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <div style={{
    width: Number(width),
    maxWidth: '100%',
    padding: 12,
    outline: '1px dashed #c33'
  }}>
      <ChatMessageList>
        <ChatMessage sender="user">
          <ChatMessageBubble>
            Which services are still rolling out?
          </ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="assistant">
          <ChatMessageBubble>
            <Markdown density="compact">{RELEASE_STATUS_TABLE}</Markdown>
          </ChatMessageBubble>
        </ChatMessage>
      </ChatMessageList>
    </div>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const text = STREAMING_RESPONSE;
    const [charIndex, setCharIndex] = useState(0);
    const [isStreaming, setIsStreaming] = useState(true);
    const [key, setKey] = useState(0);
    useEffect(() => {
      if (!isStreaming) {
        return;
      }
      if (charIndex >= text.length) {
        setIsStreaming(false);
        return;
      }
      const chunkSize = Math.floor(Math.random() * 8) + 2;
      const delay = 30 + Math.random() * 60;
      const timer = setTimeout(() => {
        setCharIndex(prev => Math.min(prev + chunkSize, text.length));
      }, delay);
      return () => clearTimeout(timer);
    }, [charIndex, isStreaming, text]);
    const replay = useCallback(() => {
      setCharIndex(0);
      setIsStreaming(true);
      setKey(k => k + 1);
    }, []);
    return <div>
        <div style={{
        marginBlockEnd: 12,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
          <Button label="Replay" variant="secondary" size="sm" onClick={replay} isDisabled={isStreaming} />
          <span style={{
          fontSize: 12,
          color: 'var(--color-text-secondary)'
        }}>
            {isStreaming ? \`Streaming... \${charIndex}/\${text.length}\` : 'Complete'}
          </span>
        </div>
        <Markdown key={key} isStreaming={isStreaming} density="compact" headingLevelStart={3}>
          {text.slice(0, charIndex)}
        </Markdown>
      </div>;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'With Images',
  render: () => <div style={{
    maxWidth: 800
  }}>
      <Markdown>{\`
Here is some text before the image.

![A landscape photo](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=680&h=400&fit=crop&auto=format)

Text between two images.

![A tall portrait photo](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop&auto=format)

And here's a really wide one:

![Wide panoramic shot](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=300&fit=crop&auto=format)

Final paragraph after all images.
\`}</Markdown>
    </div>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Content Align: Start',
  render: () => <div style={{
    maxWidth: 900,
    border: '1px dashed #ccc',
    padding: 16
  }}>
      <Markdown contentWidth={580} contentAlign="start">
        {CONTENT_ALIGN_TEXT}
      </Markdown>
    </div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Content Align: Center',
  render: () => <div style={{
    maxWidth: 900,
    border: '1px dashed #ccc',
    padding: 16
  }}>
      <Markdown contentWidth={580} contentAlign="center">
        {CONTENT_ALIGN_TEXT}
      </Markdown>
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Inline Plugins',
  render: () => {
    const inlinePlugins = [{
      // JIRA-style ticket references: PROJ-123, BUG-456, etc.
      pattern: /\\b([A-Z][A-Z0-9]+-\\d+)\\b/g,
      render: (match: RegExpMatchArray, key: string) => <Link key={key} href={\`https://issues.example.com/browse/\${match[1]}\`} isExternalLink weight="semibold">
            {match[0]}
          </Link>
    }, {
      // GitHub-style issue references: #123, #456, etc.
      pattern: /#(\\d+)/g,
      render: (match: RegExpMatchArray, key: string) => <Link key={key} href={\`https://github.com/org/repo/issues/\${match[1]}\`} isExternalLink weight="semibold">
            {match[0]}
          </Link>
    }];
    const markdown = ['## Release Notes — v2.1.0', '', 'This release fixes several issues reported in PROJ-42 and introduces', 'the inline plugins feature requested in #1873.', '', '### Bug Fixes', '', '- Fixed crash in streaming mode (BUG-789)', '- Resolved memory leak in chat components (PROJ-101)', '- **Bold context**: Plugin works inside **PROJ-55 formatting**', '', '### Code Example (not linkified)', '', '\`\`\`typescript', '// PROJ-999 and BUG-888 should NOT become links inside code blocks', 'const ticketId = "PROJ-999";', '\`\`\`', '', 'Inline code is also safe: \`PROJ-999\` stays as plain text.', '', '### Migration Guide', '', 'See PROJ-200 for the full pattern. Also check [the docs](/docs/markdown)', 'for usage alongside regular markdown links.'].join('\\n');
    return <div style={{
      maxWidth: 680
    }}>
        <Markdown inlinePlugins={inlinePlugins} density="compact" headingLevelStart={2}>
          {markdown}
        </Markdown>
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Custom Math Renderer',
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown components={{
      math: StoryMath
    }}>
        {'A renderer can typeset inline math such as $E = mc^2$ without preprocessing the source.\\n\\n$$\\n\\\\sum_{i=1}^{n} i = \\\\frac{n(n+1)}{2}\\n$$\\n\\nCode remains opaque: \`$not_math$\`.'}
      </Markdown>
    </div>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'First-party soft breaks',
  parameters: {
    docs: {
      description: {
        story: 'The first-party native plugin matches adapted remark-breaks output for supported prose. Links and code remain protected in both paths.'
      }
    }
  },
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 680
  }}>
      <section data-soft-breaks="native">
        <Text>Native first-party plugin</Text>
        <Markdown plugins={[markdownSoftBreaksPlugin]}>
          {softBreaksSource}
        </Markdown>
      </section>
      <section data-soft-breaks="remark">
        <Text>Adapted remark-breaks</Text>
        <Markdown plugins={[remarkBreaksPlugin]}>{softBreaksSource}</Markdown>
      </section>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const pane = (kind: string): HTMLElement => {
      const element = canvasElement.querySelector<HTMLElement>(\`[data-soft-breaks="\${kind}"]\`);
      if (element == null) {
        throw new Error(\`missing soft-breaks pane: \${kind}\`);
      }
      return element;
    };
    const nativePane = pane('native');
    const remarkPane = pane('remark');
    await expect(nativePane.querySelectorAll('br')).toHaveLength(2);
    await expect(remarkPane.querySelectorAll('br')).toHaveLength(2);
    await expect(nativePane.querySelector('p')?.innerHTML).toBe(remarkPane.querySelector('p')?.innerHTML);
    await expect(within(nativePane).getByRole('link', {
      name: 'Linked label'
    })).toHaveAttribute('href', '/docs');
    await expect(within(remarkPane).getByRole('link', {
      name: 'Linked label'
    })).toHaveAttribute('href', '/docs');
    await expect(nativePane.querySelector('code')?.textContent).toBe('fenced\\ncode');
    await expect(remarkPane.querySelector('code')?.textContent).toBe('fenced\\ncode');
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Syntax Plugins',
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown plugins={markdownDemoPlugins}>
        {'# Plugin composition\\n\\nHello @{Ada}. Ordinary **Markdown** keeps its behavior, while TODO becomes a transform-owned node.\\n\\n:::note\\nThis callout and mention are typed extension nodes.\\n:::\\n\\nProtected contexts stay literal: \`TODO @{Linus}\` and [TODO @{Grace}](/people).'}
      </Markdown>
    </div>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Plugin renderer with Suspense',
  render: () => {
    const [run, setRun] = useState(0);
    const delayedPlugin = useMemo(() => createDelayedMarkdownDemoPlugin(), [run]);
    return <div style={{
      maxWidth: 680
    }}>
        <div style={{
        marginBlockEnd: 12
      }}>
          <Button label="Replay delayed renderer" variant="secondary" size="sm" onClick={() => setRun(value => value + 1)} />
        </div>
        <Markdown key={run} plugins={[delayedPlugin]}>
          {'Before the async node.\\n\\nHello @{Ada}. This sibling Markdown renders immediately.\\n\\nAfter the async node.'}
        </Markdown>
      </div>;
  }
}`,...Q.parameters?.docs?.source}}},hn.parameters={...hn.parameters,docs:{...hn.parameters?.docs,source:{originalSource:"{\n  name: 'Semantic Fence',\n  render: () => <div style={{\n    maxWidth: 680\n  }}>\n      <Markdown plugins={[markdownSemanticFenceDemoPlugin]}>\n        {'# Build flow\\n\\n```diagram Checkout to deploy\\nCheckout --> Test --> Deploy\\n```\\n\\nThe plugin renderer presents typed data only for declared languages. Other fences keep the ordinary copyable code fallback:\\n\\n```text\\npnpm test\\n```'}\n      </Markdown>\n    </div>\n}",...hn.parameters?.docs?.source}}},gn.parameters={...gn.parameters,docs:{...gn.parameters?.docs,source:{originalSource:"{\n  name: 'Semantic Fence With Code Renderer',\n  render: () => <div style={{\n    maxWidth: 680\n  }}>\n      <Markdown plugins={[markdownSemanticFenceDemoPlugin]} components={{\n      code: StoryHostCode\n    }}>\n        {'# Build flow\\n\\nThe fence plugin claims `diagram` fences, so they render through the plugin even though the host supplies its own code renderer:\\n\\n```diagram Checkout to deploy\\nCheckout --> Test --> Deploy\\n```\\n\\nEvery fence no plugin claims renders through the host code renderer:\\n\\n```ts\\nconst stage = \"deploy\";\\n```'}\n      </Markdown>\n    </div>\n}",...gn.parameters?.docs?.source}}},vn.parameters={...vn.parameters,docs:{...vn.parameters?.docs,source:{originalSource:`{
  name: 'Source Decoration Metadata',
  render: () => {
    const {
      plugins,
      readout
    } = createSourceDecorationDemo(decorationSource, 'The parser now streams incrementally.');
    return <div style={{
      maxWidth: 680
    }}>
        <Markdown plugins={plugins}>{decorationSource}</Markdown>
        <Text>
          Decorations recorded while rendering: {readout.join(', ') || 'none'}.
          The document above is identical with and without them because the
          helper records metadata rather than visual presentation.
        </Text>
      </div>;
  }
}`,...vn.parameters?.docs?.source}}},Sn.parameters={...Sn.parameters,docs:{...Sn.parameters?.docs,source:{originalSource:`{
  name: 'Native and Remark plugins',
  parameters: {
    docs: {
      description: {
        story: 'Native syntax plugins and one adapted synchronous Remark transform run in the same ordered list, and the order decides the outcome. Both claim SPEC-4821: running the native badge first leaves the Remark transform nothing to link, and running the Remark transform first puts the text inside a link, which the native helper treats as a protected context. Astryx keeps ownership of the transformed destination, and code stays copyable either way.'
      }
    }
  },
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 680
  }}>
      <section data-order="native-first">
        <Text>Native badge plugin first</Text>
        <Markdown plugins={nativeFirst}>{nativeAndRemarkSource}</Markdown>
      </section>
      <section data-order="remark-first">
        <Text>Adapted Remark plugin first</Text>
        <Markdown plugins={remarkFirst}>{nativeAndRemarkSource}</Markdown>
      </section>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const pane = (order: string): HTMLElement => {
      const element = canvasElement.querySelector<HTMLElement>(\`[data-order="\${order}"]\`);
      if (element == null) {
        throw new Error(\`missing pane: \${order}\`);
      }
      return element;
    };
    const nativeFirstPane = within(pane('native-first'));
    const remarkFirstPane = within(pane('remark-first'));

    // Native syntax and transform plugins still own their own nodes.
    await expect(nativeFirstPane.getByText('@Ada')).toBeInTheDocument();
    await expect(nativeFirstPane.getByLabelText('Note')).toBeInTheDocument();
    await expect(nativeFirstPane.getByText('TODO')).toBeInTheDocument();

    // Native first: the badge consumed the prose, so no link was produced.
    const badge = nativeFirstPane.getByText('SPEC-4821');
    await expect(badge).toHaveAttribute('data-spec-badge');
    await expect(nativeFirstPane.queryByRole('link', {
      name: 'SPEC-4821'
    })).not.toBeInTheDocument();

    // Reversed: the Remark transform consumed it, and the native helper left
    // the link's children alone — so the same source renders differently.
    const specLink = remarkFirstPane.getByRole('link', {
      name: 'SPEC-4821'
    });
    await expect(specLink).toHaveAttribute('href', '/specs/4821');
    await expect(remarkFirstPane.getByText('SPEC-4821')).not.toHaveAttribute('data-spec-badge');

    // Protected contexts and copyable code are untouched in both orders.
    await expect(canvas.getAllByText('TODO @{Linus} SPEC-9999')).toHaveLength(2);
    await expect(canvas.getAllByText('SPEC-9999 stays copyable')).toHaveLength(2);

    // Keyboard order follows document order: the transformed link is an
    // ordinary tab stop that hands focus on to the authored link.
    await expect(remarkFirstPane.getAllByRole('link').map(link => link.textContent)).toEqual(['SPEC-4821', 'Authored link']);
    specLink.focus();
    await expect(specLink).toHaveFocus();
    await userEvent.tab();
    await expect(remarkFirstPane.getByRole('link', {
      name: 'Authored link'
    })).toHaveFocus();
  }
}`,...Sn.parameters?.docs?.source}}},wn.parameters={...wn.parameters,docs:{...wn.parameters?.docs,source:{originalSource:`{
  name: 'Native frontmatter with full plugin stack',
  render: () => {
    const metadata = markdownFrontmatterDemo.parse(fullStackFrontmatterSource);
    const {
      plugins: decorationPlugins
    } = createSourceDecorationDemo(fullStackFrontmatterSource, 'Plugin rollout');
    const plugins = [markdownFrontmatterDemo.plugin, ...markdownDemoPlugins, markdownSemanticFenceDemoPlugin, remarkSpecLinkPlugin, ...decorationPlugins];
    const label = metadata.status === 'match' ? \`\${metadata.metadata.title} — \${metadata.metadata.status}\` : 'No document metadata';
    return <div style={{
      maxWidth: 680
    }}>
        <Text>Document metadata: {label}</Text>
        <Markdown plugins={plugins}>{fullStackFrontmatterSource}</Markdown>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Document metadata: Plugin rollout — ready')).toBeInTheDocument();
    await expect(canvas.getByRole('heading', {
      name: 'Plugin rollout'
    })).toBeInTheDocument();
    await expect(canvas.getByText('@Ada')).toBeInTheDocument();
    await expect(canvas.getByText('TODO')).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'SPEC-4821'
    })).toHaveAttribute('href', '/specs/4821');
    await expect(canvas.getByRole('figure', {
      name: 'Release path'
    })).toBeVisible();
    await expect(canvas.queryByText('title: Plugin rollout')).not.toBeInTheDocument();
  }
}`,...wn.parameters?.docs?.source}}},Tn.parameters={...Tn.parameters,docs:{...Tn.parameters?.docs,source:{originalSource:`{
  name: 'Remark outside the profile',
  parameters: {
    docs: {
      description: {
        story: 'A plugin that emits raw HTML or a rejected destination falls closed: the last valid document stays readable, no markup is injected, and the authored destination survives.'
      }
    }
  },
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown plugins={[remarkRawHtmlPlugin, remarkUnsafeLinkPlugin]}>
        {'# Still readable\\n\\nProse survives with its [authored link](/people).'}
      </Markdown>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Still readable'
    })).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'authored link'
    })).toHaveAttribute('href', '/people');
    await expect(canvas.queryByText('Injected')).not.toBeInTheDocument();
  }
}`,...Tn.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Plugins omitted baseline',
  parameters: {
    docs: {
      description: {
        story: 'The same source without plugins. Extension syntax stays literal, no badge or transformed link exists, so opting in is the only thing that changes behavior.'
      }
    }
  },
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown>{nativeAndRemarkSource}</Markdown>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('link', {
      name: 'SPEC-4821'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByLabelText('Note')).not.toBeInTheDocument();
    await expect(canvas.getByText(/Hello @\\{Ada\\}/)).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'Authored link'
    })).toBeInTheDocument();
  }
}`,...$.parameters?.docs?.source}}},En=`Default.Compact.AIResponse.LazyContinuations.NestedLists.LongNumberMarkers.ShiftedHeadings.InlineDisplay.TableFocused.TableNarrowShortColumns.TableNarrowProseColumns.TableNarrowEdgeShapes.TableRealisticApiReference.TableRealisticReleaseStatus.TableRealisticComparison.TableNarrowWideContent.TableInChatMessage.Streaming.WithImages.ContentAlignStart.ContentAlignCenter.InlinePlugins.CustomMath.SoftBreaks.SyntaxPlugins.SuspenseRenderer.SemanticFence.SemanticFenceWithCodeRenderer.SourceDecoration.NativeAndRemarkPlugins.NativeFrontmatterWithFullStack.RemarkOutsideTheProfile.PluginsOmittedBaseline`.split(`.`)})))()}Dn();export{k as AIResponse,O as Compact,q as ContentAlignCenter,K as ContentAlignStart,Y as CustomMath,D as Default,N as InlineDisplay,J as InlinePlugins,A as LazyContinuations,rn as LongNumberMarkers,Sn as NativeAndRemarkPlugins,wn as NativeFrontmatterWithFullStack,j as NestedLists,$ as PluginsOmittedBaseline,Tn as RemarkOutsideTheProfile,hn as SemanticFence,gn as SemanticFenceWithCodeRenderer,M as ShiftedHeadings,X as SoftBreaks,vn as SourceDecoration,W as Streaming,Q as SuspenseRenderer,Z as SyntaxPlugins,P as TableFocused,U as TableInChatMessage,R as TableNarrowEdgeShapes,L as TableNarrowProseColumns,I as TableNarrowShortColumns,H as TableNarrowWideContent,z as TableRealisticApiReference,V as TableRealisticComparison,B as TableRealisticReleaseStatus,G as WithImages,En as __namedExportsOrder,$t as default};