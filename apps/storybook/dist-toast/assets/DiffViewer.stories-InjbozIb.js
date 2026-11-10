import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{b as i,p as a}from"./tokens.stylex-uC3T-IhP.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s}from"./mergeProps-DHkqklmt.js";import{n as c}from"./isRenderable-C2vVZKI4.js";import{i as l,t as u}from"./themeProps-BVy3p_gf.js";import{n as d,t as f}from"./rtlStyles-BwjrfDSU.js";import{a as p,r as m}from"./focusOutline.stylex-DWroqGen.js";import{n as h,t as g}from"./Text-C5BHw0wv.js";import{n as _,t as ee}from"./Icon-BmO5FtDV.js";import{n as te,t as ne}from"./VisuallyHidden-dGudRqPh.js";import{n as re,t as ie}from"./Button-DoGM0DEN.js";import{n as ae,t as oe}from"./useScrollableArea-DR6h7Ql_.js";import{n as se,t as ce}from"./Card-DA0ZfoAz.js";import{n as le,t as ue}from"./useTranslator-DQK9PTld.js";import{l as de,n as fe,o as pe,r as me}from"./highlightStyles-DWLr7wif.js";import{n as he,t as ge}from"./SyntaxTheme-CDF68YJV.js";import{n as v,t as _e}from"./HStack-D5idGciI.js";import{n as ve,t as y}from"./VStack-SWtDePqc.js";import{n as ye,t as be}from"./StackItem-BBK-dp_K.js";import{n as xe,t as Se}from"./CheckboxInput-CnJ0nBRn.js";import{n as b,t as Ce}from"./Token-DiYqRCxg.js";function we(e,t){if(t===`char`){let t=0;return Array.from(e,e=>{let n=t;return t+=e.length,{text:e,start:n,end:t}})}let n=[];for(let t of e.matchAll(S)){let e=t.index??0;n.push({text:t[0],start:e,end:e+t[0].length})}return n}function x(e){return e.trim()===``}function Te(e,t,n){let r=[],i=0;for(;i<e.length;){if(!t[i]){i++;continue}let a=e[i].start,o=e[i].end;for(i++;i<e.length;)if(t[i])o=e[i].end,i++;else if(n===`word`&&x(e[i].text)&&i+1<e.length&&t[i+1])o=e[i+1].end,i+=2;else break;e.some(e=>e.start>=a&&e.end<=o&&!x(e.text))&&r.push([a,o])}return r}function Ee(e){let t=0;for(let n of e)x(n.text)||(t+=n.text.length);return t}function De(e,t,n){if(e===t)return ke;let r=we(e,n),i=we(t,n),a=r.length,o=i.length;if(a===0||o===0||a*o>Oe)return ke;let s=o+1,c=new Uint32Array((a+1)*s);for(let e=a-1;e>=0;e--)for(let t=o-1;t>=0;t--)c[e*s+t]=r[e].text===i[t].text?c[(e+1)*s+t+1]+1:Math.max(c[(e+1)*s+t],c[e*s+t+1]);let l=Array(a).fill(!0),u=Array(o).fill(!0),d=0,f=0,p=0;for(;f<a&&p<o;)r[f].text===i[p].text?(l[f]=!1,u[p]=!1,x(r[f].text)||(d+=r[f].text.length),f++,p++):c[(f+1)*s+p]>=c[f*s+p+1]?f++:p++;let m=Math.min(Ee(r),Ee(i));return d===0||d<m*Ae?ke:{old:Te(r,l,n),new:Te(i,u,n)}}var Oe,ke,S,Ae;function je(){return(je=e((()=>{Oe=25e4,ke={old:[],new:[]},S=/\w+|\s+|[^\w\s]/gu,Ae=.5})))()}function Me(e,t){if(e==null)return`plaintext`;let n=e.slice(e.lastIndexOf(`/`)+1),r=n.lastIndexOf(`.`),i=r>0?n.slice(r+1).toLowerCase():null;if(t!=null)for(let e=t.length-1;e>=0;e--){let r=t[e];if(r.fileNames.includes(n)||i!=null&&r.fileExtensions.includes(i))return r}return i==null?`plaintext`:E[i]??`plaintext`}function Ne(e,t){let n=e(t);return c(n)?n:null}function Pe(e,t){return e.kind===`removed`?e.oldLineNumber==null?null:{side:`old`,lineNumber:e.oldLineNumber,line:e,hunkIndex:t}:e.newLineNumber==null?null:{side:`new`,lineNumber:e.newLineNumber,line:e,hunkIndex:t}}function Fe(e,t){let n=0;for(;n<e.length;){if(e[n].line.kind!==`removed`){n++;continue}let r=[],i=[];for(;n<e.length&&e[n].line.kind===`removed`;)r.push(e[n++]);for(;n<e.length&&e[n].line.kind===`added`;)i.push(e[n++]);let a=Math.min(r.length,i.length);for(let e=0;e<a;e++){let n=De(r[e].line.content,i[e].line.content,t);r[e].emphasis=n.old,i[e].emphasis=n.new}}}function Ie(e,t){let n=new Set;return t==null||e.hunks.forEach((e,r)=>{e.lines.some(n=>{if(e.isReplacedBlock===!0&&n.kind===`context`)return!1;let i=Pe(n,r);return i!=null&&Ne(t,i)!=null})&&n.add(r)}),n}function Le(e,t){if(t===`plaintext`)return e.map(()=>[]);let n=t=>e.filter(e=>e.kind!==t).map(e=>e.content).join(`
`),r=de(n(`added`),t),i=de(n(`removed`),t),a=0,o=0;return e.map(e=>e.kind===`removed`?r[a++]??[]:(e.kind===`added`||a++,i[o++]??[]))}function Re(e,t,n,r){return e.hunks.map((e,i)=>{let a=[],o=e=>{let n=Le(e,t);e.forEach((e,t)=>{let r=Pe(e,i);r!=null&&a.push({line:e,ref:r,tokens:n[t],emphasis:[]})})},s=e.isReplacedBlock===!0?e.lines.findIndex(e=>e.kind!==`context`):-1;if(s===-1)return o(e.lines),n!==`none`&&Fe(a,n),{cells:a,fold:null};let c=r.has(i),l=e.lines.filter(e=>e.kind!==`context`).length;if(c)return o(e.lines),{cells:a,fold:{hunkIndex:i,at:a.findIndex(e=>e.line.kind!==`context`),changedLines:l,isExpanded:c}};o(e.lines.slice(0,s));let u=a.length;return o(e.lines.slice(s+l)),{cells:a,fold:{hunkIndex:i,at:u,changedLines:l,isExpanded:c}}})}function ze(e,t){let n=[];return e.hunks.forEach((e,r)=>{n.push({type:`hunk`,key:`h${r}`,header:e.header});let{cells:i,fold:a}=t[r];i.forEach((e,t)=>{a!=null&&a.at===t&&n.push({type:`fold`,key:`h${r}f`,fold:a}),n.push({type:`line`,key:`h${r}l${t}`,cell:e})}),a!=null&&a.at===i.length&&n.push({type:`fold`,key:`h${r}f`,fold:a})}),n}function Be(e,t){let n=[];return e.hunks.forEach((e,r)=>{n.push({type:`hunk`,key:`h${r}`,header:e.header});let{cells:i,fold:a}=t[r],o=0;for(;o<i.length;){a!=null&&a.at===o&&n.push({type:`fold`,key:`h${r}f`,fold:a});let e=i[o];if(e.line.kind===`context`){n.push({type:`pair`,key:`h${r}l${o}`,old:e,new:e}),o++;continue}let t=[],s=[];for(;o<i.length&&i[o].line.kind===`removed`;)t.push(i[o++]);for(;o<i.length&&i[o].line.kind===`added`;)s.push(i[o++]);let c=Math.max(t.length,s.length);for(let e=0;e<c;e++)n.push({type:`pair`,key:`h${r}l${o}r${e}`,old:t[e]??null,new:s[e]??null})}a!=null&&a.at===i.length&&n.push({type:`fold`,key:`h${r}f`,fold:a})}),n}function Ve(e,t,n){let r=[],i=0;for(let n of t){let t=Math.max(n.start,i),a=Math.min(n.end,e.length);t>i&&r.push({start:i,end:t,type:null}),a>t&&r.push({start:t,end:a,type:n.type}),i=Math.max(i,a)}i<e.length&&r.push({start:i,end:e.length,type:null});let a=new Set;for(let[e,t]of n)a.add(e),a.add(t);let o=e=>n.some(([t,n])=>e>=t&&e<n),s=[];for(let e of r){let t=e.start;for(let n=e.start+1;n<e.end;n++)a.has(n)&&(s.push({start:t,end:n,type:e.type,isChanged:o(t)}),t=n);s.push({start:t,end:e.end,type:e.type,isChanged:o(t)})}return s}function He(e,t){let n=e.slice(t.start,t.end);return t.type==null?(0,T.jsx)(w.Fragment,{children:n},t.start):(0,T.jsx)(`span`,{className:`astryx-token-${t.type}`,children:n},t.start)}function Ue(e,t,r,i){if(e===``)return`​`;if(t.length===0&&r.length===0)return e;let a=Ve(e,t,r),o=[],s=0;for(;s<a.length;){if(!a[s].isChanged){o.push(He(e,a[s])),s++;continue}let t=[],r=a[s].start;for(;s<a.length&&a[s].isChanged;)t.push(He(e,a[s])),s++;o.push((0,T.jsx)(`span`,{"data-diff-change":``,...n(i),children:t},`c${r}`))}return o}function We(e){return`calc(${e}ch + 2 * ${i[`--spacing-2`]})`}function Ge(e){return e[`data-scrollable-inline`]===`true`?{...e,style:{...e.style,overscrollBehaviorX:`none`}}:e}function Ke({side:e,label:t,columns:r,isWrapped:i,viewportRef:a,onScroll:o,children:s}){let{getViewportProps:c,getContentProps:l}=ae({axis:`inline`,keyboardAccess:{owner:`viewport`,role:`group`,label:t}});return(0,T.jsx)(`div`,{"data-diff-pane":e,...Ge(c({...{0:{className:`astryxrvj5dj astryx19bwqal astryx1clt5hq astryx1mkdm3x astryxeuugli astryx1npkx4u`},1:{className:`astryxrvj5dj astryx19bwqal astryx1clt5hq astryx1mkdm3x astryxeuugli astryxgkxs2y astryxw8tdv1 astryx18b5jzi astryx1gejf6u`}}[e===`old`|0],ref:a,onScroll:o})),children:(0,T.jsx)(`div`,{role:`table`,...l(n(D.table,D.paneTable,i?D.paneTableWrapped:D.paneTableScroll,k.paneColumns(r))),children:s})})}function qe(e){let t=``,n=-1;for(let r of e){let e=0;for(let t of r){let n=t.codePointAt(0)??0;e+=t===`	`?Ye:n>=4352?2:1}e>n&&(t=r,n=e)}return t}function C({ref:e,file:t,viewMode:r=`unified`,language:i,codeLanguages:a,hasLineNumbers:o=!0,isWrapped:c=!1,changeIndicator:u=`classic`,inlineHighlight:f=`word`,hasChangeBackground:p=!0,isCollapsible:h=!0,isCollapsed:g,defaultIsCollapsed:_=!1,onCollapsedChange:te,headerEnd:re,renderLineAnnotation:oe,onLineNumberClick:se,maxHeight:ce,syntaxTheme:ue,xstyle:de,className:pe,style:me,...he}){let v=le(),_e=(0,w.useId)();(0,w.useInsertionEffect)(()=>{fe()},[]);let ve=t.newPath??t.oldPath,y=i??Me(ve,a),ye=t.status===`renamed`&&t.oldPath!=null&&t.newPath!=null?v(`@astryx.diffViewer.renamedPath`,{oldPath:t.oldPath,newPath:t.newPath}):ve,[be,xe]=(0,w.useState)(_),Se=h&&ye!=null,b=Se&&(g??be),we=()=>{let e=!b;g===void 0&&xe(e),te?.(e)},x=0,Te=!1;for(let e of t.hunks)if(e.isReplacedBlock===!0)Te=!0;else for(let t of e.lines)t.kind!==`context`&&x++;let Ee=x>Je,De=Ee||Te?Ie(t,oe):null,[Oe,ke]=(0,w.useState)(null),S=Ee&&!(Oe?.file===t?Oe.isExpanded:(De?.size??0)>0),Ae=()=>{ke({file:t,isExpanded:S})},[je,Pe]=(0,w.useState)(null),Fe=je?.file===t?je.isExpanded:null,Le=e=>Fe?.get(e)??De?.has(e)??!1,Ve=e=>{let n=new Map(Fe);n.set(e,!Le(e)),Pe({file:t,isExpanded:n})},He=t.hunks.flatMap((e,t)=>e.isReplacedBlock===!0&&Le(t)?[t]:[]).join(`,`),C=(0,w.useMemo)(()=>new Set(He===``?[]:He.split(`,`).map(Number)),[He]),E=(0,w.useMemo)(()=>S?[]:Re(t,y,f,C),[S,t,y,f,C]),Ye=(0,w.useMemo)(()=>r===`unified`&&!S?ze(t,E):[],[r,S,t,E]),Ze=(0,w.useMemo)(()=>r===`split`&&!S?Be(t,E):[],[r,S,t,E]),O=0,A=0,$e=1;for(let e of t.hunks)for(let t of e.lines)t.kind===`added`?O++:t.kind===`removed`&&A++,$e=Math.max($e,t.oldLineNumber??0,t.newLineNumber??0);let et=String($e).length,{getViewportProps:j,getContentProps:tt}=ae({axis:r===`split`?`block`:`both`,keyboardAccess:{owner:`viewport`,role:`group`,label:ye??v(`@astryx.diffViewer.label`)}}),nt=ce==null?void 0:{maxHeight:typeof ce==`number`?`${ce}px`:ce},M=!c,N=We(et),rt=Xe[u],it=u!==`classic`,at=e=>M&&e!=null&&[D.sticky,k.stickyAt(e)],ot=e=>p&&(e===`added`?D.added:e===`removed`&&D.removed),st=e=>e===`div`?{role:`cell`}:{},ct=(e,t,r,i,a)=>{if(!o)return null;let s=e,c=t==null?null:r===`old`?t.line.oldLineNumber:t.line.newLineNumber,l=t?.line.kind,u=c!=null&&t!=null&&t.ref.side===r?t.ref:null;return(0,T.jsx)(s,{...st(e),...n(D.gutter,at(a),ot(l),l===`added`&&D.gutterAdded,l===`removed`&&D.gutterRemoved,t==null&&D.filler),children:u!=null&&se!=null?(0,T.jsx)(`button`,{type:`button`,"data-diff-line-button":``,"aria-label":v(`@astryx.diffViewer.lineNumberButton`,{side:r,line:c}),onClick:e=>se(u,e),...m.focusVisible(D.gutterButton),children:c}):c},i)},lt=(e,t,r,i)=>{let a=e,o=t?.line.kind,s=o===`added`||o===`removed`;return(0,T.jsxs)(a,{...st(e),...n(D.marker,it&&D.markerSlim,at(i),ot(o),o===`added`&&D.markerAdded,o===`removed`&&D.markerRemoved,t==null&&D.filler),children:[s&&u===`classic`&&(0,T.jsx)(`span`,{"aria-hidden":`true`,children:o===`added`?`+`:`-`}),s&&u===`bars`&&(0,T.jsx)(`span`,{"aria-hidden":`true`,"data-diff-bar":``,...{0:{className:`astryx10l6tqk astryx10no89f astryx1o0tod astryx1otkg58 astryx18ii3yt`},1:{className:`astryx10l6tqk astryx10no89f astryx1o0tod astryx1otkg58 astryxdaxpge`}}[o===`added`|0]}),s&&(0,T.jsx)(ne,{children:v(o===`added`?`@astryx.diffViewer.added`:`@astryx.diffViewer.removed`)})]},r)},ut=(e,t,r)=>{let i=e,a=t?.line.kind;return(0,T.jsx)(i,{...st(e),"data-diff":a!=null&&a!==`context`?a:void 0,...n(D.code,D.ltr,c&&D.codeWrapped,ot(a),t==null&&D.filler),children:t!=null&&Ue(t.line.content,t.tokens,t.emphasis,[D.change,a===`added`?D.changeAdded:D.changeRemoved])},r)},dt=(e,t,n,r)=>(0,T.jsxs)(`span`,{...{0:{className:`astryx3nfvp2 astryx6s0dn4 astryx1a02dak astryxjcht0a`},1:{className:`astryx3nfvp2 astryx6s0dn4 astryx1a02dak astryxjcht0a astryx7wzq59 astryx1ybfrjj`}}[!!r|0],children:[(0,T.jsx)(`span`,{children:v(`@astryx.diffViewer.largeChange`,{count:e})}),(0,T.jsx)(ie,{size:`sm`,variant:`secondary`,label:v(t?`@astryx.diffViewer.hideFullDiff`:`@astryx.diffViewer.showFullDiff`),"aria-expanded":t,onClick:n})]}),P=e=>dt(e.changedLines,e.isExpanded,()=>Ve(e.hunkIndex),M),ft=e=>(0,T.jsx)(`span`,{...{0:{className:`astryxzt5al7 astryx4ej8vm`},1:{className:`astryxzt5al7 astryx4ej8vm astryx7wzq59 astryx1ybfrjj`}}[!!M|0],children:e}),F=e=>e==null||oe==null?null:Ne(oe,e.ref),I=(e,t,n)=>(0,T.jsx)(e,{...e===`th`?{scope:`col`}:{role:`columnheader`},className:`astryx1717udv astryxc342km`,children:(0,T.jsx)(ne,{children:n})},t),pt=()=>{let e=(o?2:0)+2,t=o?`calc(2 * ${N})`:`0px`;return(0,T.jsxs)(`table`,{...{0:{className:`astryx1mwwwfo astryx1gukg7c astryx9m5x89 astryxp03k98 astryx17iicif astryxdfisg astryxeq4nuv astryxezivpi astryxgqtt45`},1:{className:`astryx1mwwwfo astryx1gukg7c astryx9m5x89 astryxp03k98 astryx17iicif astryxdfisg astryxeq4nuv astryxh8yej3 astryx140o2bo`}}[!!c|0],children:[(0,T.jsxs)(`colgroup`,{children:[o&&(0,T.jsx)(`col`,{...n(k.columnWidth(N))}),o&&(0,T.jsx)(`col`,{...n(k.columnWidth(N))}),(0,T.jsx)(`col`,{...n(k.columnWidth(rt))}),(0,T.jsx)(`col`,{})]}),(0,T.jsx)(`thead`,{children:(0,T.jsxs)(`tr`,{children:[o&&I(`th`,`og`,v(`@astryx.diffViewer.columnOldLine`)),o&&I(`th`,`ng`,v(`@astryx.diffViewer.columnNewLine`)),I(`th`,`m`,v(`@astryx.diffViewer.columnChange`)),I(`th`,`c`,v(`@astryx.diffViewer.columnCode`))]})}),(0,T.jsx)(`tbody`,{children:Ye.map(n=>{if(n.type===`hunk`)return(0,T.jsx)(`tr`,{children:(0,T.jsx)(`td`,{colSpan:e,className:`astryxu0wf1k astryxrrkdod astryx1yc453h astryx11ds9ch astryxt5rlkq astryx1sdyfia astryxszpfcc astryxykt701 astryxgtxpae`,children:ft(n.header)})},n.key);if(n.type===`fold`)return(0,T.jsx)(`tr`,{children:(0,T.jsx)(`td`,{colSpan:e,className:`astryxce4md1 astryxrrkdod astryx1yc453h astryx11ds9ch astryxv1l7n4 astryx9ynric astryx141an7d astryx1ltkj2j astryxszpfcc astryxykt701 astryxgtxpae`,children:P(n.fold)})},n.key);let r=F(n.cell);return(0,T.jsxs)(w.Fragment,{children:[(0,T.jsxs)(`tr`,{children:[ct(`td`,n.cell,`old`,`og`,`0px`),ct(`td`,n.cell,`new`,`ng`,N),lt(`td`,n.cell,`m`,t),ut(`td`,n.cell,`c`)]}),r!=null&&(0,T.jsx)(`tr`,{children:(0,T.jsx)(`td`,{colSpan:e,className:`astryxce4md1 astryxrrkdod astryx16dsc37 astryxeaf4i8 astryx9ynric astryxjm74w1 astryxw6l6zx astryx1tgivj0 astryx10xzikg astryxszpfcc astryxykt701 astryxgtxpae`,children:(0,T.jsx)(`div`,{className:`astryx1q06l6i astryxj0a0fe astryx5ujdhh astryx41o525`,children:r})})})]},n.key)})})]})},mt=(0,w.useRef)({old:null,new:null}),ht=(0,w.useMemo)(()=>({old:e=>{mt.current.old=e},new:e=>{mt.current.new=e}}),[]),gt=(0,w.useRef)(null),_t=(e,t)=>{let n=t.currentTarget.scrollLeft,r=gt.current;if(r!=null&&r.side===e&&(gt.current=null,Math.abs(r.left-n)<1))return;let i=e===`old`?`new`:`old`,a=mt.current[i];a==null||Math.abs(a.scrollLeft-n)<1||(a.scrollLeft=n,gt.current={side:i,left:a.scrollLeft})},vt=()=>{let e=Ze.map(e=>e.type===`pair`?{row:e,oldNote:e.old?.line.kind===`context`?null:F(e.old),newNote:F(e.new)}:{row:e,oldNote:null,newNote:null}),t=!c,r=t?qe(E.flatMap(e=>e.cells.map(e=>e.line.content))):``,i=1+ +!!t+e.reduce((e,t)=>e+1+ +(t.oldNote!=null||t.newNote!=null),0),a=`${o?`${N} `:``}${rt} ${c?`minmax(0, 1fr)`:`1fr`}`,s=o?N:`0px`,l=n=>{let i=n===`old`,l=[(0,T.jsxs)(`div`,{role:`row`,className:`astryxrvj5dj astryx1osaytk astryx4w6khx`,children:[o&&I(`div`,`g`,v(i?`@astryx.diffViewer.columnOldLine`:`@astryx.diffViewer.columnNewLine`)),I(`div`,`m`,v(`@astryx.diffViewer.columnChange`)),I(`div`,`c`,v(i?`@astryx.diffViewer.columnOldCode`:`@astryx.diffViewer.columnNewCode`))]},`head`)];for(let{row:t,oldNote:r,newNote:a}of e){if(t.type===`hunk`){l.push((0,T.jsx)(`div`,{role:`row`,className:`astryxrvj5dj astryx1osaytk astryx4w6khx`,children:(0,T.jsx)(`div`,{role:`cell`,...{0:{className:`astryxu0wf1k astryxrrkdod astryx1yc453h astryx11ds9ch astryxt5rlkq astryx1sdyfia astryxszpfcc astryxykt701 astryxgtxpae astryx1osaytk`},1:{className:`astryxu0wf1k astryxrrkdod astryx1yc453h astryx11ds9ch astryxt5rlkq astryxszpfcc astryxykt701 astryxgtxpae astryx1osaytk astryx126k92a astryx1lldw8n astryxj0a0fe astryx5ujdhh`}}[!!c|0],children:i?ft(t.header):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`span`,{"aria-hidden":`true`,className:`astryxzt5al7 astryx4ej8vm astryxlshs6z`,children:t.header}),(0,T.jsx)(ne,{children:t.header})]})})},t.key));continue}if(t.type===`fold`){l.push((0,T.jsx)(`div`,{role:`row`,className:`astryxrvj5dj astryx1osaytk astryx4w6khx`,children:(0,T.jsx)(`div`,{role:`cell`,...{0:{className:`astryxce4md1 astryxrrkdod astryx1yc453h astryx11ds9ch astryxv1l7n4 astryx9ynric astryx141an7d astryx1ltkj2j astryxszpfcc astryxykt701 astryxgtxpae astryx1osaytk`},1:{className:`astryxce4md1 astryxrrkdod astryx1yc453h astryx11ds9ch astryxv1l7n4 astryx9ynric astryx141an7d astryx1ltkj2j astryxszpfcc astryxykt701 astryxgtxpae astryx1osaytk astryx126k92a astryx1lldw8n astryxj0a0fe astryx5ujdhh`}}[!!c|0],children:i?P(t.fold):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`span`,{"aria-hidden":`true`,className:`astryxlshs6z`,children:P(t.fold)}),(0,T.jsx)(ne,{children:v(`@astryx.diffViewer.largeChange`,{count:t.fold.changedLines})})]})})},t.key));continue}let e=i?t.old:t.new;if(l.push((0,T.jsxs)(`div`,{role:`row`,"aria-hidden":e==null||void 0,className:`astryxrvj5dj astryx1osaytk astryx4w6khx`,children:[ct(`div`,e,n,`g`,`0px`),lt(`div`,e,`m`,s),ut(`div`,e,`c`)]},t.key)),r!=null||a!=null){let e=i?r:a;l.push((0,T.jsx)(`div`,{role:`row`,"aria-hidden":e==null||void 0,className:`astryxrvj5dj astryx1osaytk astryx4w6khx`,children:(0,T.jsx)(`div`,{role:`cell`,className:`astryxce4md1 astryxrrkdod astryx16dsc37 astryxeaf4i8 astryx9ynric astryxjm74w1 astryxw6l6zx astryx1tgivj0 astryx10xzikg astryxszpfcc astryxykt701 astryxgtxpae astryx1osaytk`,children:e!=null&&(0,T.jsx)(`div`,{className:`astryx1q06l6i astryxj0a0fe astryx5ujdhh astryx41o525`,children:e})})},`${t.key}n`))}}return t&&l.push((0,T.jsx)(`div`,{"data-diff-sizer":``,"aria-hidden":`true`,className:`astryxrvj5dj astryx1osaytk astryx4w6khx`,children:(0,T.jsx)(`div`,{className:`astryx1yc453h astryxt970qd astryx1c1uobl astryxnjyzlh astryx16dsc37 astryx1sdyfia astryxzt5al7 astryx4ej8vm astryx4h4c4w astryxqtp20y astryxlshs6z astryx47corl`,children:r})},`sizer`)),(0,T.jsx)(Ke,{side:n,label:v(i?`@astryx.diffViewer.columnOldCode`:`@astryx.diffViewer.columnNewCode`),columns:a,isWrapped:c,viewportRef:ht[n],onScroll:t?e=>_t(n,e):void 0,children:l},n)};return(0,T.jsxs)(`div`,{"data-diff-split":``,...n(D.split,k.splitRows(i)),children:[l(`old`),l(`new`)]})},yt;yt=t.isBinary?(0,T.jsx)(`div`,{className:`astryx8o8v82 astryx1pzlopt astryxv1l7n4 astryx141an7d`,children:v(`@astryx.diffViewer.binary`)}):t.hunks.length===0?(0,T.jsx)(`div`,{className:`astryx8o8v82 astryx1pzlopt astryxv1l7n4 astryx141an7d`,children:v(`@astryx.diffViewer.noChanges`)}):(0,T.jsxs)(T.Fragment,{children:[Ee&&(0,T.jsx)(`div`,{"data-diff-fold":``,className:`astryxce4md1 astryxrrkdod astryx1yc453h astryx11ds9ch astryxv1l7n4 astryx9ynric astryx141an7d astryx1ltkj2j astryxszpfcc astryxykt701 astryxgtxpae`,children:dt(x,!S,Ae,!1)}),!S&&(0,T.jsx)(`div`,{...Ge(j({className:`astryxeuugli astryxzt5al7`,style:nt})),children:(0,T.jsx)(`div`,{...tt({}),children:r===`split`?vt():pt()})})]});let bt=Qe[t.status],xt=t.status===`added`?v(`@astryx.diffViewer.statusAdded`):t.status===`deleted`?v(`@astryx.diffViewer.statusDeleted`):t.status===`renamed`?v(`@astryx.diffViewer.statusRenamed`):null,St=(0,T.jsx)(`span`,{...s(l(`diff-viewer-path`),{className:`astryxeuugli astryxb3r6kr astryxlyipyv astryxuxw1ft astryx9m5x89 astryx1e4wzip astryxzt5al7 astryx4ej8vm`}),children:ye}),L=ye!=null||re!=null?(0,T.jsxs)(`div`,{...s(l(`diff-viewer-header`),{0:{className:`astryx78zum5 astryx6s0dn4 astryx1txdalj astryxeuugli astryxce4md1 astryxrrkdod astryx10xzikg astryx1tgivj0 astryx141an7d astryx1ltkj2j`},1:{className:`astryx78zum5 astryx6s0dn4 astryx1txdalj astryxeuugli astryxce4md1 astryxrrkdod astryx10xzikg astryx1tgivj0 astryx141an7d astryx1ltkj2j astryx92x3c3 astryx1q0q8m5 astryxw8gpjh`}}[!b|0]),children:[Se?(0,T.jsxs)(`button`,{type:`button`,"aria-expanded":!b,"aria-controls":_e,onClick:we,...m.focusVisible(D.toggle),children:[(0,T.jsx)(`span`,{...{0:{className:`astryx3nfvp2 astryx2lah0s astryxv9yike astryx11xpdln astryxuedmi6 astryx12w9bfk astryxlr8y92`},1:{className:`astryx3nfvp2 astryx2lah0s astryxv9yike astryx11xpdln astryxuedmi6 astryx12w9bfk astryxlr8y92 astryx1iffjtl`}}[!b|0],children:(0,T.jsx)(`span`,{...n(b&&d.mirror),children:(0,T.jsx)(ee,{icon:`chevronRight`,size:`xsm`,color:`inherit`})})}),St]}):St,bt!=null&&xt!=null&&(0,T.jsx)(Ce,{size:`sm`,color:bt,label:xt}),(O>0||A>0)&&(0,T.jsxs)(`span`,{className:`astryx3nfvp2 astryxzye2dw astryx2lah0s astryx9m5x89 astryxzt5al7 astryx4ej8vm`,children:[(0,T.jsx)(`span`,{"aria-hidden":`true`,className:`astryxltfdvo`,children:v(`@astryx.diffViewer.addedCount`,{count:O})}),(0,T.jsx)(`span`,{"aria-hidden":`true`,className:`astryx1joocv1`,children:v(`@astryx.diffViewer.removedCount`,{count:A})}),(0,T.jsx)(ne,{children:v(`@astryx.diffViewer.stats`,{added:O,removed:A})})]}),re!=null&&(0,T.jsx)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryx1txdalj astryxvc5jky astryx2lah0s`,children:re})]}):null,R=(0,T.jsxs)(`div`,{ref:e,...s(l(`diff-viewer`,{viewMode:r}),n(D.root,de),pe,me),...he,children:[L,(0,T.jsx)(`div`,{id:_e,hidden:b,children:b?null:yt})]});return ue?(0,T.jsx)(ge,{theme:ue,children:R}):R}var w,T,E,Je,Ye,Xe,D,Ze,O,k,Qe;function A(){return(A=e((()=>{w=t(),r(),me(),pe(),oe(),re(),ue(),_(),he(),a(),p(),f(),u(),b(),te(),je(),T=o(),E={ts:`ts`,mts:`ts`,cts:`ts`,tsx:`tsx`,js:`js`,mjs:`js`,cjs:`js`,jsx:`jsx`,json:`json`,html:`html`,htm:`html`,xml:`xml`,svg:`svg`,css:`css`,scss:`scss`,less:`less`,py:`python`,sh:`bash`,bash:`bash`,zsh:`zsh`,php:`php`,hack:`hack`,yaml:`yaml`,yml:`yaml`,md:`markdown`,markdown:`markdown`,c:`c`,h:`c`,cpp:`cpp`,cc:`cpp`,cxx:`cpp`,hpp:`cpp`,hh:`cpp`,sql:`sql`,rs:`rust`,kt:`kotlin`,kts:`kotlin`,swift:`swift`,go:`go`},Je=2e3,Ye=2,Xe={classic:`calc(1ch + ${i[`--spacing-1`]} + ${i[`--spacing-2`]})`,bars:i[`--spacing-3`],none:i[`--spacing-2`]},D={root:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,k7Eaqz:`astryxeuugli`,kVQacm:`astryxb3r6kr`,kHBbk8:`astryxc8icb0`,kaIpWk:`astryxh6dtrn`,kMzoRj:`astryx1litavf`,ksu8eU:`astryx1y0btm7`,kVAM5u:`astryx14i3s5s`,kWkggS:`astryxzyc27v`,$$css:!0},toggle:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxzye2dw`,khm7nJ:null,k1C7PZ:null,k7Eaqz:`astryxeuugli`,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kWkggS:`astryxjbqb8w`,kMwMTN:`astryx1heor9g`,kVVagm:`astryxln7xf2`,kMv6JI:null,kGuDYH:null,kQqvRs:null,kKX8nH:null,kjAs5C:null,kLnEks:null,kK6Wou:null,k7vxuK:null,kg1b5M:null,kXP6Bh:null,kcqcaj:null,kgjsQD:null,k63SB2:null,kLWn49:null,k9WMMc:`astryx1yc453h`,kkrTdU:`astryx1ypdohk astryx16khyan`,$$css:!0},table:{kLvRdT:`astryx1mwwwfo`,kheTzg:`astryx1gukg7c`,kMv6JI:`astryx9m5x89`,kGuDYH:`astryxp03k98`,kLWn49:`astryx17iicif`,kMwMTN:`astryxdfisg`,kKi2Bq:`astryxeq4nuv`,$$css:!0},gutter:{k8WAf4:`astryxt970qd`,kg3NbH:`astryxf314gf`,k9WMMc:`astryxp4054r`,kXLuUW:`astryx16dsc37`,khDVqt:`astryxuxw1ft`,kfSwDN:`astryx87ps6o`,kMwMTN:`astryxt5rlkq`,$$css:!0},gutterAdded:{kMwMTN:`astryx1wxerb0`,$$css:!0},gutterRemoved:{kMwMTN:`astryx103bwea`,$$css:!0},gutterButton:{k1xSpc:`astryxt0psk2`,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kogj98:`astryx1ghz6dp`,kUOVxO:null,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,kqGvvJ:null,keoZOQ:null,k1K539:null,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kWkggS:`astryxjbqb8w`,kMwMTN:`astryx1heor9g`,kVVagm:`astryxln7xf2`,kMv6JI:null,kGuDYH:null,kQqvRs:null,kKX8nH:null,kjAs5C:null,kLnEks:null,kK6Wou:null,k7vxuK:null,kg1b5M:null,kXP6Bh:null,kcqcaj:null,kgjsQD:null,k63SB2:null,kLWn49:null,kkrTdU:`astryx1ypdohk astryx16khyan`,kMnn75:`astryxkrqix3 astryxmbzu5e`,$$css:!0},marker:{kVAEAm:`astryx1n2onr6`,k8WAf4:`astryxt970qd`,kZCmMZ:`astryx1vsv5vr`,kwRFfy:`astryx1djylfy`,kXLuUW:`astryx16dsc37`,khDVqt:`astryx1sdyfia`,kfSwDN:`astryx87ps6o`,kMwMTN:`astryxv1l7n4`,$$css:!0},markerSlim:{kg3NbH:`astryxnjsko4`,$$css:!0},sticky:{kVAEAm:`astryx7wzq59`,kY2c9j:`astryx1vjfegm`,kWkggS:`astryxzyc27v`,$$css:!0},markerAdded:{kMwMTN:`astryx1wxerb0`,$$css:!0},markerRemoved:{kMwMTN:`astryx103bwea`,$$css:!0},ltr:{ksoyAI:`astryxzt5al7`,kQ0QjF:`astryx4ej8vm`,$$css:!0},code:{k9WMMc:`astryx1yc453h`,k8WAf4:`astryxt970qd`,kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxnjyzlh`,kXLuUW:`astryx16dsc37`,khDVqt:`astryx1sdyfia`,$$css:!0},codeWrapped:{khDVqt:`astryx126k92a`,kTgw9:`astryx1lldw8n`,kHjlTd:`astryxj0a0fe`,"--_astryx-text-overflow-wrap":`astryx5ujdhh`,$$css:!0},added:{kKwaWg:`astryxhqx4lk`,$$css:!0},removed:{kKwaWg:`astryxibo0b1`,$$css:!0},change:{kaIpWk:`astryxx3sua9`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,keMLs9:`astryxyh5bb9`,$$css:!0},changeAdded:{kWkggS:`astryxjqijk9`,kKwaWg:`astryxhqx4lk`,$$css:!0},changeRemoved:{kWkggS:`astryxv48ua2`,kKwaWg:`astryxibo0b1`,$$css:!0},filler:{kWkggS:`astryx11ds9ch`,$$css:!0},split:{k1xSpc:`astryxrvj5dj`,kumcoG:`astryxcjjqqt`,$$css:!0},paneTable:{k1xSpc:`astryxrvj5dj`,kbNqZ1:`astryx19bwqal`,k9llMU:`astryx1clt5hq`,$$css:!0},paneTableScroll:{kzqmXN:`astryxezivpi`,k7Eaqz:`astryxgqtt45`,$$css:!0},paneTableWrapped:{kzqmXN:`astryxh8yej3`,$$css:!0}},Ze={kbCHJM:``,kCIrl2:``,$$css:!0},O={k9llMU:`astryx1xxtoay`,$$css:!0},k={columnWidth:e=>[{kzqmXN:e==null?e:`astryx5lhr3w`,$$css:!0},{"--x-width":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],stickyAt:e=>[Ze,{kLqNvP:e==null?e:`astryx1lxsm33`,$$css:!0},{"--x-insetInlineStart":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],splitRows:e=>[O,{"--x-gridTemplateRows":`repeat(${e}, auto)`==null?void 0:`repeat(${e}, auto)`}],paneColumns:e=>[{kumcoG:e==null?e:`astryxqketvx`,$$css:!0},{"--x-gridTemplateColumns":e??void 0}]},Qe={added:`green`,deleted:`red`,renamed:`blue`},C.displayName=`DiffViewer`,C.__docgenInfo={description:`Read-only, syntax-highlighted diff of one file, in unified or split view,
for code review surfaces. Supports review-comment annotation rows under any
line and actionable line numbers.

@example
\`\`\`
const [file] = parseUnifiedDiff(patch);
<DiffViewer file={file} viewMode="split" />
\`\`\``,methods:[],displayName:`DiffViewer`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLDivElement`}],raw:`Ref<HTMLDivElement>`},description:`Ref forwarded to the root element.`},file:{required:!0,tsType:{name:`DiffViewerFile`},description:"The file to render. Build one with `parseUnifiedDiff(patch)` (one per\nfile in the patch) or `createDiffFile({oldValue, newValue})`."},viewMode:{required:!1,tsType:{name:`union`,raw:`'unified' | 'split'`,elements:[{name:`literal`,value:`'unified'`},{name:`literal`,value:`'split'`}]},description:`\`unified\` shows one column with removed lines above their replacements;
\`split\` shows the old file on the left and the new file on the right,
pairing each removed line with the added line that replaced it. The hunk
area reads left-to-right in every page direction, like a code editor;
the file header and annotation content follow the page, and annotation
rows scroll with the code.
@default 'unified'`,defaultValue:{value:`'unified'`,computed:!1}},language:{required:!1,tsType:{name:`union`,raw:`string | CodeLanguage`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  /** The identifier the label shows, such as \`graphql\`; shown verbatim. */
  readonly name: string;
  /** The words that name this language in \`language\` strings and fences. */
  readonly identifiers: ReadonlyArray<string>;
  /** File extensions (no dot) that infer this language, such as \`graphql\`. */
  readonly fileExtensions: ReadonlyArray<string>;
  /** Whole file names that infer this language, such as \`Dockerfile\`. */
  readonly fileNames: ReadonlyArray<string>;
  /**
   * A brand that is never present, so the language types of the package and
   * a swizzled copy match.
   */
  readonly '@astryxdesign/core/code-language/v1'?: never;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0},description:"The identifier the label shows, such as `graphql`; shown verbatim."},{key:`identifiers`,value:{name:`ReadonlyArray`,elements:[{name:`string`}],raw:`ReadonlyArray<string>`,required:!0},description:"The words that name this language in `language` strings and fences."},{key:`fileExtensions`,value:{name:`ReadonlyArray`,elements:[{name:`string`}],raw:`ReadonlyArray<string>`,required:!0},description:"File extensions (no dot) that infer this language, such as `graphql`."},{key:`fileNames`,value:{name:`ReadonlyArray`,elements:[{name:`string`}],raw:`ReadonlyArray<string>`,required:!0},description:"Whole file names that infer this language, such as `Dockerfile`."},{key:`@astryxdesign/core/code-language/v1`,value:{name:`never`,required:!1},description:`A brand that is never present, so the language types of the package and
a swizzled copy match.`}]}}]},description:"Syntax-highlighting language: a built-in identifier such as `'rust'`, or\na language value — a module imported on its own, such as `graphql` from\n`@astryxdesign/core/CodeBlock/languages/graphql`, or one made with\n`createCodeLanguage`. Defaults to one inferred from the file's name or\nextension among the built-ins and `codeLanguages`; an unmatched file\nrenders as plain text."},codeLanguages:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`signature`,type:`object`,raw:`{
  /** The identifier the label shows, such as \`graphql\`; shown verbatim. */
  readonly name: string;
  /** The words that name this language in \`language\` strings and fences. */
  readonly identifiers: ReadonlyArray<string>;
  /** File extensions (no dot) that infer this language, such as \`graphql\`. */
  readonly fileExtensions: ReadonlyArray<string>;
  /** Whole file names that infer this language, such as \`Dockerfile\`. */
  readonly fileNames: ReadonlyArray<string>;
  /**
   * A brand that is never present, so the language types of the package and
   * a swizzled copy match.
   */
  readonly '@astryxdesign/core/code-language/v1'?: never;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0},description:"The identifier the label shows, such as `graphql`; shown verbatim."},{key:`identifiers`,value:{name:`ReadonlyArray`,elements:[{name:`string`}],raw:`ReadonlyArray<string>`,required:!0},description:"The words that name this language in `language` strings and fences."},{key:`fileExtensions`,value:{name:`ReadonlyArray`,elements:[{name:`string`}],raw:`ReadonlyArray<string>`,required:!0},description:"File extensions (no dot) that infer this language, such as `graphql`."},{key:`fileNames`,value:{name:`ReadonlyArray`,elements:[{name:`string`}],raw:`ReadonlyArray<string>`,required:!0},description:"Whole file names that infer this language, such as `Dockerfile`."},{key:`@astryxdesign/core/code-language/v1`,value:{name:`never`,required:!1},description:`A brand that is never present, so the language types of the package and
a swizzled copy match.`}]}}],raw:`ReadonlyArray<CodeLanguage>`},description:`Language values the file's name or extension may infer, such as
\`[graphql, dockerfile]\`; a later entry wins. Pass the same list to every
DiffViewer on a review page.`},hasLineNumbers:{required:!1,tsType:{name:`boolean`},description:`Show the old and new line-number gutters.
@default true`,defaultValue:{value:`true`,computed:!1}},isWrapped:{required:!1,tsType:{name:`boolean`},description:`Wrap long lines instead of scrolling them horizontally. Unwrapped, line
numbers and change indicators stay pinned while the code scrolls; in
split view each side is its own scroller, the split stays fixed at half
and half, and the two sides scroll sideways in lockstep. While code
overflows sideways, sideways overscroll (elastic bounce, swipe
navigation) is off.
@default false`,defaultValue:{value:`false`,computed:!1}},changeIndicator:{required:!1,tsType:{name:`union`,raw:`'classic' | 'bars' | 'none'`,elements:[{name:`literal`,value:`'classic'`},{name:`literal`,value:`'bars'`},{name:`literal`,value:`'none'`}]},description:`How changed lines are marked beside their code.
@default 'classic'`,defaultValue:{value:`'classic'`,computed:!1}},inlineHighlight:{required:!1,tsType:{name:`union`,raw:`'word' | 'char' | 'none'`,elements:[{name:`literal`,value:`'word'`},{name:`literal`,value:`'char'`},{name:`literal`,value:`'none'`}]},description:`Highlight the changed words (or characters) inside each removed line and
the added line that replaced it. Lines that share nothing but whitespace
get no inline highlight; the row tint already marks them.
@default 'word'`,defaultValue:{value:`'word'`,computed:!1}},hasChangeBackground:{required:!1,tsType:{name:`boolean`},description:`Tint the rows of added and removed lines. Without it only the change
indicator, the line numbers, and the inline highlight mark a change.
@default true`,defaultValue:{value:`true`,computed:!1}},isCollapsible:{required:!1,tsType:{name:`boolean`},description:`Make the file header a disclosure that hides and shows the hunks. Needs a
file path to name the control.
@default true`,defaultValue:{value:`true`,computed:!1}},isCollapsed:{required:!1,tsType:{name:`boolean`},description:"Controlled collapsed state. Pair with `onCollapsedChange`."},defaultIsCollapsed:{required:!1,tsType:{name:`boolean`},description:`Initial collapsed state when uncontrolled.
@default false`,defaultValue:{value:`false`,computed:!1}},onCollapsedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isCollapsed: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isCollapsed`}],return:{name:`void`}}},description:`Called with the next collapsed state when the header is toggled.`},headerEnd:{required:!1,tsType:{name:`ReactNode`},description:`Content at the end of the file header, e.g. a "Viewed" checkbox or a menu
of file actions.`},renderLineAnnotation:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(ref: DiffViewerLineRef) => ReactNode`,signature:{arguments:[{type:{name:`DiffViewerLineRef`},name:`ref`}],return:{name:`ReactNode`}}},description:"Render content in a full-width row under a line, e.g. review comments.\nReturn `null` (or `false`) for lines with nothing to show. Called once per line with\nits {@link DiffViewerLineRef}; in split view the row sits under the\nline's own side."},onLineNumberClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  ref: DiffViewerLineRef,
  event: MouseEvent<HTMLButtonElement>,
) => void`,signature:{arguments:[{type:{name:`DiffViewerLineRef`},name:`ref`},{type:{name:`MouseEvent`,elements:[{name:`HTMLButtonElement`}],raw:`MouseEvent<HTMLButtonElement>`},name:`event`}],return:{name:`void`}}},description:`Makes each line's number a button (e.g. to start a comment on that line).
Receives the line's {@link DiffViewerLineRef}. Only the number on the
line's anchor side is a button, so an unchanged line's original number
stays plain text. Each button is its own Tab stop, like any other set of
independent buttons.`},maxHeight:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Maximum height of the hunk area before it scrolls.`},syntaxTheme:{required:!1,tsType:{name:`SyntaxThemeDefinition`},description:"Per-instance syntax theme, as on CodeBlock. Without it the nearest\n`SyntaxTheme` or the theme's syntax colors apply."}},composes:[`Omit`]}})))()}function $e(e){if(!e.startsWith(ct)||!e.endsWith(lt))return null;let t=e.slice(13,e.length-7),n=t.lastIndexOf(ut);return n<=0||n+5>=t.length?null:{oldPath:t.slice(0,n),newPath:t.slice(n+5)}}function et(e,t){let n=[],r=t+1;for(;r<e.length;){let t=e[r];if(t===`"`)return{value:P.decode(new Uint8Array(n)),end:r+1};if(t===`\\`&&r+1<e.length){let t=e[r+1],i=/^[0-7]{3}/.exec(e.slice(r+1,r+4));if(i!=null){n.push(parseInt(i[0],8)),r+=4;continue}if(t in dt){n.push(dt[t]),r+=2;continue}}let i=e.codePointAt(r)??0,a=String.fromCodePoint(i);n.push(...ft.encode(a)),r+=a.length}return null}function j(e){if(e.startsWith(`"`)){let t=et(e,0);if(t!=null)return t.value}return e}function tt(e,t){return e.startsWith(t)?e.slice(t.length):e}function nt(e){if(!e.startsWith(st))return null;let t=e.slice(11),n=(e,t)=>({oldPath:tt(e,`a/`),newPath:tt(t,`b/`)});if(t.startsWith(`"`)){let e=et(t,0);if(e!=null&&t[e.end]===` `)return n(e.value,j(t.slice(e.end+1)))}if(t.endsWith(`"`))for(let e=t.lastIndexOf(` "`);e>0;e=t.lastIndexOf(` "`,e-1)){let r=et(t,e+1);if(r!=null&&r.end===t.length)return n(t.slice(0,e),r.value)}if(t.length%2==1){let e=(t.length-1)/2,r=t.slice(0,e),i=t.slice(e+1);if(t[e]===` `&&tt(r,`a/`)===tt(i,`b/`))return n(r,i)}let r=t.indexOf(` `);return r<=0?null:n(t.slice(0,r),t.slice(r+1))}function M(){return{oldPath:null,newPath:null,status:null,isBinary:!1,hunks:[]}}function N(e,t){let n=j(e.split(`	`)[0].trim());return n===`/dev/null`?null:(n.startsWith(t)&&(n=n.slice(t.length)),n)}function rt(e){let t=e.status;return t??=e.oldPath==null&&e.newPath!=null?`added`:e.newPath==null&&e.oldPath!=null?`deleted`:`modified`,{oldPath:t===`added`?null:e.oldPath,newPath:t===`deleted`?null:e.newPath,status:t,isBinary:e.isBinary,hunks:e.hunks}}function it(e){return e.hunks.length>0||e.isBinary||e.oldPath!=null||e.newPath!=null||e.status!=null}function at(e){let t=e.split(`
`).map(e=>e.replace(/\r$/,``)),n=[],r=null,i=null,a=0,o=0,s=0,c=0,l=()=>{r!=null&&it(r)&&n.push(rt(r)),r=null,i=null};for(let e=0;e<t.length;e++){let n=t[e];if(i!=null&&(a>0||o>0)){let r=n[0];if(r===`\\`)continue;if(r===`+`){i.lines.push({kind:`added`,content:n.slice(1),oldLineNumber:null,newLineNumber:c++}),o--;continue}if(r===`-`){i.lines.push({kind:`removed`,content:n.slice(1),oldLineNumber:s++,newLineNumber:null}),a--;continue}if(r===` `||n===``){if(n===``&&e===t.length-1)continue;i.lines.push({kind:`context`,content:n.slice(1),oldLineNumber:s++,newLineNumber:c++}),a--,o--;continue}i=null}if(i!=null&&n.startsWith(`\\`))continue;let u=nt(n);if(u!=null){l(),r=M(),r.oldPath=u.oldPath,r.newPath=u.newPath;continue}if(n.startsWith(`--- `)&&(t[e+1]?.startsWith(`+++ `)??!1)){(r==null||r.hunks.length>0||r.isBinary)&&(l(),r=M());let i=r;i.oldPath=N(n.slice(4),`a/`),i.newPath=N(t[e+1].slice(4),`b/`),i.oldPath==null&&i.status==null?i.status=`added`:i.newPath==null&&i.status==null&&(i.status=`deleted`),e++;continue}let d=ot.exec(n);if(d){r??=M();let e=Number(d[1]),t=d[2]==null?1:Number(d[2]),l=Number(d[3]),u=d[4]==null?1:Number(d[4]),f={header:n,oldStart:e,oldLines:t,newStart:l,newLines:u,lines:[]};r.hunks.push(f),i=f,a=t,o=u,s=t===0?e+1:e,c=u===0?l+1:l;continue}let f=$e(n);if(f!=null&&(r==null||r.hunks.length>0||r.isBinary)){l();let e=M();e.oldPath=N(f.oldPath,`a/`),e.newPath=N(f.newPath,`b/`),e.isBinary=!0,r=e;continue}if(r==null)continue;let p=r;n.startsWith(`new file mode`)?p.status=`added`:n.startsWith(`deleted file mode`)?p.status=`deleted`:n.startsWith(`rename from `)?(p.oldPath=j(n.slice(12)),p.status=`renamed`):n.startsWith(`rename to `)?(p.newPath=j(n.slice(10)),p.status=`renamed`):n.startsWith(`copy from `)?p.oldPath=j(n.slice(10)):n.startsWith(`copy to `)?p.newPath=j(n.slice(8)):(n.startsWith(`Binary files `)||n===`GIT binary patch`)&&(p.isBinary=!0)}return l(),n}var ot,st,ct,lt,ut,dt,P,ft;function F(){return(F=e((()=>{ot=/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/,st=`diff --git `,ct=`Binary files `,lt=` differ`,ut=` and `,dt={a:7,b:8,t:9,n:10,v:11,f:12,r:13,'"':34,"\\":92},P=new TextDecoder,ft=new TextEncoder})))()}function I(e){if(e===``)return[];let t=e.split(`
`).map(e=>e.replace(/\r$/,``));return t[t.length-1]===``&&t.pop(),t}function pt(e,t){let n=0;for(;n<e.length&&n<t.length&&e[n]===t[n];)n++;let r=e.length,i=t.length;for(;r>n&&i>n&&e[r-1]===t[i-1];)r--,i--;let a=[];for(let e=0;e<n;e++)a.push({kind:`context`,a:e,b:e});let o=r===n||i===n,s=Math.min(yt,Math.floor(bt/(r-n+(i-n)))),c=o?null:gt(e,t,n,r,i,Math.min(xt,s))??mt(e,t,n,r,i,s);if(c!=null)for(let e of c)a.push(e);else{for(let e=n;e<r;e++)a.push({kind:`removed`,a:e});for(let e=n;e<i;e++)a.push({kind:`added`,b:e})}for(let t=0;r+t<e.length;t++)a.push({kind:`context`,a:r+t,b:i+t});return{ops:a,isReplacedBlock:c==null&&!o}}function mt(e,t,n,r,i,a){let o=new Map,s=(e,t)=>{let r=new Int32Array(t-n);for(let i=n;i<t;i++){let t=o.get(e[i]);t===void 0&&(t=o.size,o.set(e[i],t)),r[i-n]=t}return r},c=s(e,r),l=s(t,i),u=new Int32Array(o.size);for(let e of c)u[e]++;for(let e of l)u[e]--;let d=0;for(let e of u)d+=Math.abs(e);if(d>a)return null;let f=c.length+l.length+1,p=new Int32Array(2*f+1),m=new Int32Array(2*f+1),h=[],g=(e,t,n,r,i)=>{let a=t-e,o=r-n,s=a-o,u=!!(s&1);p[f+1]=0,m[f+1]=0;for(let d=0;d<=Math.ceil((a+o)/2);d++){if(2*d-1>i)return null;for(let t=-d;t<=d;t+=2){let r=t===-d||t!==d&&p[f+t-1]<p[f+t+1]?p[f+t+1]:p[f+t-1]+1,i=r-t;for(;r<a&&i<o&&c[e+r]===l[n+i];)r++,i++;p[f+t]=r;let h=s-t;if(u&&r<=a&&i<=o&&h>=1-d&&h<=d-1&&r+m[f+h]>=a)return[e+r,n+i]}if(2*d>i)return null;for(let i=-d;i<=d;i+=2){let h=i===-d||i!==d&&m[f+i-1]<m[f+i+1]?m[f+i+1]:m[f+i-1]+1,g=h-i;for(;h<a&&g<o&&c[t-1-h]===l[r-1-g];)h++,g++;m[f+i]=h;let _=s-i;if(!u&&h<=a&&g<=o&&_>=-d&&_<=d&&h+p[f+_]>=a){let t=p[f+_];return[e+t,n+t-_]}}}return null},_=(e,t,r,i,a)=>{for(;e<t&&r<i&&c[e]===l[r];)h.push({kind:`context`,a:n+e,b:n+r}),e++,r++;let o=0;for(;t-o>e&&i-o>r&&c[t-1-o]===l[i-1-o];)o++;let s=t-o,u=i-o;if(e===s||r===u){if(s-e+(u-r)>a)return!1;for(let t=e;t<s;t++)h.push({kind:`removed`,a:n+t});for(let e=r;e<u;e++)h.push({kind:`added`,b:n+e})}else{let t=g(e,s,r,u,a);if(t==null||!_(e,t[0],r,t[1],1/0)||!_(t[0],s,t[1],u,1/0))return!1}for(let e=o;e>0;e--)h.push({kind:`context`,a:n+t-e,b:n+i-e});return!0};return _(0,c.length,0,l.length,a)?ht(h):null}function ht(e){let t=[],n=[];for(let r of e)if(r.kind===`added`)n.push(r);else{if(r.kind===`context`){for(let e of n)t.push(e);n.length=0}t.push(r)}for(let e of n)t.push(e);return t}function gt(e,t,n,r,i,a){let o=r-n,s=i-n,c=o+s,l=c+1,u=new Int32Array(2*c+3),d=[];outer:for(let r=0;r<=c;r++){if(r>a)return null;d.push(u.slice(l-r,l+r+1));for(let i=-r;i<=r;i+=2){let a=i===-r||i!==r&&u[l+i-1]<u[l+i+1]?u[l+i+1]:u[l+i-1]+1,c=a-i;for(;a<o&&c<s&&e[n+a]===t[n+c];)a++,c++;if(u[l+i]=a,a>=o&&c>=s)break outer}}let f=[],p=o,m=s;for(let e=d.length-1;e>=0;e--){let t=d[e],r=n=>t[n+e]??0,i=p-m,a=i===-e||i!==e&&r(i-1)<r(i+1)?i+1:i-1,o=r(a),s=o-a;for(;p>o&&m>s;)p--,m--,f.push({kind:`context`,a:n+p,b:n+m});e>0&&(p===o?f.push({kind:`added`,b:n+s}):f.push({kind:`removed`,a:n+o})),p=o,m=s}return f.reverse(),f}function _t(e,t){return t===1?`${e}`:`${e},${t}`}function vt({oldValue:e,newValue:t,path:n,oldPath:r,newPath:i,contextLines:a=3}){let o=r===void 0?n??null:r,s=i===void 0?n??null:i,c=Number.isNaN(a)?3:Math.max(0,Math.floor(a)),l=`modified`;r===null?l=`added`:i===null?l=`deleted`:o!=null&&s!=null&&o!==s&&(l=`renamed`);let u=I(e),d=I(t),{ops:f,isReplacedBlock:p}=pt(u,d),m=[];f.forEach((e,t)=>{e.kind!==`context`&&m.push(t)});let h=[],g=0;for(;g<m.length;){let e=m[g],t=g+1;for(;t<m.length&&m[t]-e-1<=c*2;)e=m[t],t++;let n=Math.max(0,m[g]-c),r=Math.min(f.length-1,e+c),i=[],a=0,o=0;for(let e=n;e<=r;e++){let t=f[e];t.kind===`context`?(i.push({kind:`context`,content:u[t.a],oldLineNumber:t.a+1,newLineNumber:t.b+1}),a++,o++):t.kind===`removed`?(i.push({kind:`removed`,content:u[t.a],oldLineNumber:t.a+1,newLineNumber:null}),a++):(i.push({kind:`added`,content:d[t.b],oldLineNumber:null,newLineNumber:t.b+1}),o++)}let s=0,l=0;for(let e=0;e<n;e++){let t=f[e];t.kind!==`added`&&s++,t.kind!==`removed`&&l++}let _=a===0?s:s+1,ee=o===0?l:l+1;h.push({header:`@@ -${_t(_,a)} +${_t(ee,o)} @@`,oldStart:_,oldLines:a,newStart:ee,newLines:o,lines:i,...p?{isReplacedBlock:!0}:{}}),g=t}return{oldPath:l===`added`?null:o,newPath:l===`deleted`?null:s,status:l,isBinary:!1,hunks:h}}var yt,bt,xt;function St(){return(St=e((()=>{yt=1e4,bt=1e9,xt=1e3})))()}var L,R,Ct,wt,Tt,z,B,Et,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,Dt;function Ot(){return(Ot=e((()=>{L=t(),A(),St(),F(),re(),se(),xe(),v(),ye(),ve(),h(),R=o(),Ct=at(`diff --git a/src/cart/total.ts b/src/cart/total.ts
index 4c1a2b7..9e0f3d1 100644
--- a/src/cart/total.ts
+++ b/src/cart/total.ts
@@ -1,16 +1,18 @@
 import type {CartItem} from './types';
+import {roundCurrency} from '../money';
 
 /**
- * Sum the price of every item in the cart.
+ * Sum the price of every item in the cart, applying the discount once
+ * after the subtotal so rounding errors do not compound per item.
  */
-export function cartTotal(items: CartItem[], discount = 0) {
-  let total = 0;
-  for (const item of items) {
-    total += item.price * item.quantity * (1 - discount);
-  }
-  return total;
+export function cartTotal(items: CartItem[], discount = 0): number {
+  const subtotal = items.reduce(
+    (sum, item) => sum + item.price * item.quantity,
+    0,
+  );
+  return roundCurrency(subtotal * (1 - discount));
 }
 
 export function isEmpty(items: CartItem[]) {
   return items.length === 0;
 }
@@ -40,7 +42,7 @@ export function formatTotal(total: number, currency: string) {
   const formatter = new Intl.NumberFormat(undefined, {
     style: 'currency',
     currency,
-    maximumFractionDigits: 3,
+    maximumFractionDigits: 2,
   });
   return formatter.format(total);
 }
diff --git a/src/money.ts b/src/money.ts
new file mode 100644
index 0000000..b3f1c2e
--- /dev/null
+++ b/src/money.ts
@@ -0,0 +1,4 @@
+/** Round to whole cents. */
+export function roundCurrency(value: number): number {
+  return Math.round(value * 100) / 100;
+}
diff --git a/src/cart/legacy.ts b/src/cart/legacyTotals.ts
similarity index 100%
rename from src/cart/legacy.ts
rename to src/cart/legacyTotals.ts
diff --git a/public/receipt.png b/public/receipt.png
index 1f2e3d4..5a6b7c8 100644
Binary files a/public/receipt.png and b/public/receipt.png differ
`),[wt]=Ct,Tt={title:`Lab/DiffViewer`,component:C,tags:[`autodocs`],parameters:{layout:`padded`},args:{file:wt},decorators:[e=>(0,R.jsx)(`div`,{style:{maxWidth:1080,padding:16},children:(0,R.jsx)(e,{})})]},z={},B={args:{viewMode:`split`}},Et=at(`diff --git a/src/cart/discounts.ts b/src/cart/discounts.ts
--- a/src/cart/discounts.ts
+++ b/src/cart/discounts.ts
@@ -1,4 +1,4 @@
 import type {CartItem} from './types';
-export const discountFor = (item: CartItem, rules: ReadonlyArray<{sku: string; percent: number}>) => rules.find(rule => rule.sku === item.sku)?.percent ?? 0;
+export const discountFor = (item: CartItem, rules: ReadonlyArray<{sku: string; percent: number; expiresAt?: number}>) => rules.find(rule => rule.sku === item.sku && (rule.expiresAt == null || rule.expiresAt > Date.now()))?.percent ?? 0;
 
 export const NO_DISCOUNT = 0;
`)[0],V={args:{file:Et,viewMode:`split`,changeIndicator:`bars`},decorators:[e=>(0,R.jsx)(`div`,{style:{maxWidth:960},children:(0,R.jsx)(e,{})})]},H={args:{viewMode:`split`,changeIndicator:`bars`,inlineHighlight:`word`,hasChangeBackground:!0,isWrapped:!1,hasLineNumbers:!0},argTypes:{viewMode:{control:`inline-radio`,options:[`unified`,`split`]},changeIndicator:{control:`inline-radio`,options:[`classic`,`bars`,`none`]},inlineHighlight:{control:`inline-radio`,options:[`word`,`char`,`none`]}}},U={args:{changeIndicator:`bars`,hasChangeBackground:!1}},W={args:{inlineHighlight:`char`}},G={args:{viewMode:`split`,isWrapped:!0},decorators:[e=>(0,R.jsx)(`div`,{style:{maxWidth:720},children:(0,R.jsx)(e,{})})]},K={args:{file:Et,viewMode:`split`,renderLineAnnotation:e=>e.side===`old`&&e.lineNumber===2?(0,R.jsx)(g,{type:`body`,children:`كان الخصم لا يتحقق من تاريخ الانتهاء.`}):e.side===`new`&&e.lineNumber===2?(0,R.jsx)(g,{type:`body`,children:`تحقق من تاريخ انتهاء الخصم قبل الدمج.`}):null},decorators:[e=>(0,R.jsx)(`div`,{dir:`rtl`,style:{maxWidth:960},children:(0,R.jsx)(e,{})})]},q={render:e=>(0,R.jsx)(y,{gap:3,children:Ct.map(t=>(0,R.jsx)(C,{...e,file:t},t.newPath??t.oldPath))})},J={args:{file:vt({path:`config/flags.yaml`,oldValue:`flags:
  checkout_v2: false
  dark_mode: true
  search_suggestions: false
  # owner: payments
  retries: 3`,newValue:`flags:
  checkout_v2: true
  dark_mode: true
  search_suggestions: false
  # owner: payments
  retries: 5
  timeout_ms: 2000`})}},Y={args:{file:vt({path:`src/generated/schema.ts`,oldValue:[`// Generated file. Do not edit.`,...Array.from({length:6e3},(e,t)=>`export const field${t} = 'v1-${t}';`),`export default {};`].join(`
`),newValue:[`// Generated file. Do not edit.`,...Array.from({length:6e3},(e,t)=>`export const field${t} = 'v2-${t}';`),`export default {};`].join(`
`)})}},X={render:e=>{let[t,n]=(0,L.useState)(!1),[r,i]=(0,L.useState)(!1);return(0,R.jsx)(C,{...e,isCollapsed:r,onCollapsedChange:i,headerEnd:(0,R.jsx)(Se,{label:`Viewed`,value:t,onChange:e=>{n(e),i(e)}})})}},Z={render:e=>{let[t,n]=(0,L.useState)(`unified`),[r,i]=(0,L.useState)([{id:1,side:`new`,lineNumber:13}]);return(0,R.jsxs)(y,{gap:3,children:[(0,R.jsxs)(_e,{gap:2,vAlign:`center`,children:[(0,R.jsx)(be,{size:`fill`,children:(0,R.jsx)(g,{type:`supporting`,color:`secondary`,children:`Click a line number to add a comment.`})}),(0,R.jsx)(ie,{label:t===`unified`?`Split view`:`Unified view`,variant:`secondary`,onClick:()=>n(e=>e===`unified`?`split`:`unified`)})]}),(0,R.jsx)(C,{...e,viewMode:t,onLineNumberClick:e=>i(t=>[...t,{id:Date.now(),side:e.side,lineNumber:e.lineNumber}]),renderLineAnnotation:e=>{let t=r.filter(t=>t.side===e.side&&t.lineNumber===e.lineNumber);return t.length===0?null:(0,R.jsx)(y,{gap:2,children:t.map(e=>(0,R.jsx)(ce,{children:(0,R.jsxs)(_e,{gap:2,vAlign:`center`,children:[(0,R.jsx)(be,{size:`fill`,children:(0,R.jsx)(g,{children:`Comment on ${e.side} line ${e.lineNumber}`})}),(0,R.jsx)(ie,{label:`Resolve`,variant:`ghost`,size:`sm`,onClick:()=>i(t=>t.filter(t=>t.id!==e.id))})]})},e.id))})}})]})}},Q={args:{renderLineAnnotation:e=>e.side===`new`&&e.lineNumber===13?(0,R.jsx)(g,{type:`body`,children:`Rounding once after the subtotal fixes the drift we saw on large carts, but it changes totals for carts that relied on per-item rounding. Before this lands, check the receipt snapshots, confirm the discount still applies to gift cards, and add a test with a 33% discount on three items so the rounding rule is pinned. If any partner integrations read the per-item totals, they need a heads-up as well.`}):null}},$={args:{hasLineNumbers:!1,maxHeight:240}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{}`,...z.parameters?.docs?.source},description:{story:`One file, unified view (the default).`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    viewMode: 'split'
  }
}`,...B.parameters?.docs?.source},description:{story:`Old file on the left, new file on the right.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    file: LONG_LINE_FILE,
    viewMode: 'split',
    changeIndicator: 'bars'
  },
  decorators: [Story => <div style={{
    maxWidth: 960
  }}>
        <Story />
      </div>]
}`,...V.parameters?.docs?.source},description:{story:`Unwrapped split view with lines wider than their side: the split stays
fixed, both sides scroll sideways together, and line numbers and change
bars stay pinned.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    viewMode: 'split',
    changeIndicator: 'bars',
    inlineHighlight: 'word',
    hasChangeBackground: true,
    isWrapped: false,
    hasLineNumbers: true
  },
  argTypes: {
    viewMode: {
      control: 'inline-radio',
      options: ['unified', 'split']
    },
    changeIndicator: {
      control: 'inline-radio',
      options: ['classic', 'bars', 'none']
    },
    inlineHighlight: {
      control: 'inline-radio',
      options: ['word', 'char', 'none']
    }
  }
}`,...H.parameters?.docs?.source},description:{story:`Every display option, as on diffs.com: how changes are marked, whether rows
are tinted, how finely changed text is highlighted, wrapping, and line
numbers.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    changeIndicator: 'bars',
    hasChangeBackground: false
  }
}`,...U.parameters?.docs?.source},description:{story:`Bars and word highlighting on plain rows: no change tint.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    inlineHighlight: 'char'
  }
}`,...W.parameters?.docs?.source},description:{story:`Character-level highlighting with classic +/− glyphs.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    viewMode: 'split',
    isWrapped: true
  },
  decorators: [Story => <div style={{
    maxWidth: 720
  }}>
        <Story />
      </div>]
}`,...G.parameters?.docs?.source},description:{story:`Long lines wrap instead of scrolling.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    file: LONG_LINE_FILE,
    viewMode: 'split',
    renderLineAnnotation: (ref: DiffViewerLineRef) => {
      if (ref.side === 'old' && ref.lineNumber === 2) {
        return <Text type="body">كان الخصم لا يتحقق من تاريخ الانتهاء.</Text>;
      }
      if (ref.side === 'new' && ref.lineNumber === 2) {
        return <Text type="body">تحقق من تاريخ انتهاء الخصم قبل الدمج.</Text>;
      }
      return null;
    }
  },
  decorators: [Story => <div dir="rtl" style={{
    maxWidth: 960
  }}>
        <Story />
      </div>]
}`,...K.parameters?.docs?.source},description:{story:`A right-to-left page with lines wider than the viewer. The hunk area stays
left-to-right like a code editor, so every line opens at its start. The file
header and comment text follow the page. Comment rows belong to the code
layout: each comment reads from its side's right edge and, like the code
beside it, may need a horizontal scroll to bring into view.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => <VStack gap={3}>
      {FILES.map(file => <DiffViewer key={file.newPath ?? file.oldPath} {...args} file={file} />)}
    </VStack>
}`,...q.parameters?.docs?.source},description:{story:`A whole patch: one DiffViewer per file, incl. added, renamed, and binary files.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    file: createDiffFile({
      path: 'config/flags.yaml',
      oldValue: ['flags:', '  checkout_v2: false', '  dark_mode: true', '  search_suggestions: false', '  # owner: payments', '  retries: 3'].join('\\n'),
      newValue: ['flags:', '  checkout_v2: true', '  dark_mode: true', '  search_suggestions: false', '  # owner: payments', '  retries: 5', '  timeout_ms: 2000'].join('\\n')
    })
  }
}`,...J.parameters?.docs?.source},description:{story:`Diff two versions of a text with createDiffFile.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    file: createDiffFile({
      path: 'src/generated/schema.ts',
      oldValue: ['// Generated file. Do not edit.', ...Array.from({
        length: 6000
      }, (_, i) => \`export const field\${i} = 'v1-\${i}';\`), 'export default {};'].join('\\n'),
      newValue: ['// Generated file. Do not edit.', ...Array.from({
        length: 6000
      }, (_, i) => \`export const field\${i} = 'v2-\${i}';\`), 'export default {};'].join('\\n')
    })
  }
}`,...Y.parameters?.docs?.source},description:{story:`A rewrite too large to compare line by line: the changed lines fold behind a
labeled control until the reader shows them.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [isViewed, setIsViewed] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    return <DiffViewer {...args} isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} headerEnd={<CheckboxInput label="Viewed" value={isViewed} onChange={checked => {
      setIsViewed(checked);
      setIsCollapsed(checked);
    }} />} />;
  }
}`,...X.parameters?.docs?.source},description:{story:`File header actions: a "Viewed" checkbox that also folds the file away.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
    const [comments, setComments] = useState<Comment[]>([{
      id: 1,
      side: 'new',
      lineNumber: 13
    }]);
    return <VStack gap={3}>
        <HStack gap={2} vAlign="center">
          <StackItem size="fill">
            <Text type="supporting" color="secondary">
              Click a line number to add a comment.
            </Text>
          </StackItem>
          <Button label={viewMode === 'unified' ? 'Split view' : 'Unified view'} variant="secondary" onClick={() => setViewMode(mode => mode === 'unified' ? 'split' : 'unified')} />
        </HStack>
        <DiffViewer {...args} viewMode={viewMode} onLineNumberClick={ref => setComments(current => [...current, {
        id: Date.now(),
        side: ref.side,
        lineNumber: ref.lineNumber
      }])} renderLineAnnotation={ref => {
        const here = comments.filter(comment => comment.side === ref.side && comment.lineNumber === ref.lineNumber);
        if (here.length === 0) {
          return null;
        }
        return <VStack gap={2}>
                {here.map(comment => <Card key={comment.id}>
                    <HStack gap={2} vAlign="center">
                      <StackItem size="fill">
                        <Text>
                          {\`Comment on \${comment.side} line \${comment.lineNumber}\`}
                        </Text>
                      </StackItem>
                      <Button label="Resolve" variant="ghost" size="sm" onClick={() => setComments(current => current.filter(c => c.id !== comment.id))} />
                    </HStack>
                  </Card>)}
              </VStack>;
      }} />
      </VStack>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`Review comments: click a line number to open a comment under that line.
Anchors (side + lineNumber) stay put when switching view modes.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    renderLineAnnotation: (ref: DiffViewerLineRef) => ref.side === 'new' && ref.lineNumber === 13 ? <Text type="body">
          Rounding once after the subtotal fixes the drift we saw on large
          carts, but it changes totals for carts that relied on per-item
          rounding. Before this lands, check the receipt snapshots, confirm the
          discount still applies to gift cards, and add a test with a 33%
          discount on three items so the rounding rule is pinned. If any partner
          integrations read the per-item totals, they need a heads-up as well.
        </Text> : null
  }
}`,...Q.parameters?.docs?.source},description:{story:`A multi-sentence comment wraps within the width the code sets; it never
widens the table.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    hasLineNumbers: false,
    maxHeight: 240
  }
}`,...$.parameters?.docs?.source},description:{story:`Without line numbers, capped height.`,...$.parameters?.docs?.description}}},Dt=[`Default`,`Split`,`SplitIndependentScroll`,`DisplayOptions`,`NoBackground`,`CharacterHighlight`,`Wrapped`,`RightToLeft`,`MultiFilePatch`,`FromTwoTexts`,`LargeChange`,`ViewedToggle`,`ReviewComments`,`LongComment`,`Compact`]})))()}Ot();export{W as CharacterHighlight,$ as Compact,z as Default,H as DisplayOptions,J as FromTwoTexts,Y as LargeChange,Q as LongComment,q as MultiFilePatch,U as NoBackground,Z as ReviewComments,K as RightToLeft,B as Split,V as SplitIndependentScroll,X as ViewedToggle,G as Wrapped,Dt as __namedExportsOrder,Tt as default};