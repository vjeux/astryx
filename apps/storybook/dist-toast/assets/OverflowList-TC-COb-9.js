import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{n as o}from"./isRenderable-C2vVZKI4.js";import{i as s,t as c}from"./themeProps-BVy3p_gf.js";import{n as l,t as u}from"./useMergedRefs-D6axeCXB.js";import{r as d,t as f}from"./sharedResizeObserver-Cel0TOAm.js";import{n as p,t as m}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{t as h}from"./react-dom-B2lTHb2f.js";import{n as g,t as _}from"./useDevWarning-BysULVtL.js";function v(e,t,n){return Math.max(Math.min(e,n),t)}function y(e,t,n){return{floor:Math.max(0,Math.min(t,e)),ceiling:Math.max(0,Math.min(n??e,e))}}function b(e,t,n,r,i,a){let o=0,s=0;for(let c=0;c<e.length&&!(s>=a);c++){let a=e[c],l=c>0?t:0,u=o+a+l;if(u+(c===e.length-1?0:r+(s>0||r>0?t:0))>n&&s>=i)break;o=u,s++}return s}function x(e,t,n,r,i){let a=0,o=1,s=0;for(let c=0;c<e.length;c++){let l=e[c],u=s===0,d=u?l:s+t+l,f=o===i,p=f&&r>0?r+t:0;if(d+p<=n)s=d,a++;else if(u){if(f&&p>0)break;s=d,a++}else{if(o>=i)break;o++,s=0,c--}}return{placed:a,rows:o}}function S(e,t,n){if(e.length===0)return 0;let r=1,i=0;for(let a=0;a<e.length;a++){let o=e[a],s=i===0,c=s?o:i+t+o;c<=n||s?i=c:(r++,i=o)}return r}function C(e,t,n,r,i){let a=e.length;if(a===0)return{count:0,rows:0};let o=x(e,t,n,0,i);if(o.placed===a)return{count:a,rows:o.rows};let s=x(e,t,n,r,i).placed,c=S(e.slice(0,s),t,n);return{count:s,rows:Math.max(+(s>0),c)}}function w(e){let{widths:t,gap:n,availableWidth:r,indicatorWidth:i,minVisibleItems:a,maxVisibleItems:o,maxRows:s,collapseFrom:c}=e,l=t.length;if(l===0)return{visibleCount:0,rows:0};let{floor:u,ceiling:d}=y(l,a,o),f=c===`end`?t:[...t].reverse();if(!(s!=null&&s>1)){let e=v(b(f,n,r,i,u,d),u,d);return{visibleCount:e,rows:+(e>0)}}let{count:p,rows:m}=C(f,n,r,i,s),h=v(p,u,d),g=h===p?m:S(f.slice(0,h),n,r);return{visibleCount:h,rows:h>0?Math.max(1,g):0}}function T(e){N.size===0&&queueMicrotask(()=>{let e=[...N];N.clear();let t=[];(0,M.flushSync)(()=>{for(let n of e){let e=n(`beforePaint`);e&&t.push(e)}});for(let e of t)e()}),N.add(e)}function E(e,t){let n=!0,r=d(e,()=>{n?t(`now`):T(t)});return n=!1,r}function D(e,t,n,r){let i=Math.min(S(e.widths,t,n),r);if(!e.indicator)return i;let a=e.indicatorFirst?[e.indicator.width,...e.widths]:[...e.widths,e.indicator.width],o=Math.min(S(a,t,n),r);return o===i?o:null}function O(e,t,n,r,i){let a=e=>Math.max(0,...e.heights,e.indicator?.height??0);if(a(e)!==a(t))return!0;if(i<=1)return!1;let o=D(e,n,r,i),s=D(t,n,r,i);return o===null||s===null||o!==s}function k(e,t){let n=e.style;if(n==null||typeof n.setProperty!=`function`)return!1;let r=e.hasAttribute(`style`),i=n.getPropertyValue(`contain`),a=n.getPropertyPriority(`contain`),o=t.offsetWidth,s=t.offsetHeight;n.setProperty(`contain`,`inline-size`,`important`);let c=t.offsetWidth!==o||t.offsetHeight!==s;return i===``?r?n.removeProperty(`contain`):(n.removeProperty(`contain`),e.getAttribute(`style`),e.removeAttribute(`style`)):n.setProperty(`contain`,i,a),t.offsetWidth,c}function A(e,t,{tracksRows:n}){let{gap:r=0,minVisibleItems:i=0,maxVisibleItems:a,maxRows:o,collapseFrom:s=`end`,behavior:c=`observeSelf`}=t;g(`useOverflow`,`maxVisibleItems (${a}) is less than minVisibleItems (${i}); the floor wins and minVisibleItems items will be shown.`,a!=null&&a<i);let l=c===`observeParent`,[u,d]=(0,j.useState)(e),[f,m]=(0,j.useState)(1),[h,_]=(0,j.useState)(0),v=(0,j.useRef)({visibleCount:e,rows:1,rowHeight:0}),y=(0,j.useRef)(null),b=(0,j.useRef)(null),x=(0,j.useRef)(null),S=(0,j.useRef)(null),C=(0,j.useRef)(null),T=(0,j.useRef)(null),D=(0,j.useCallback)((e,t,r)=>{let i=v.current;i.visibleCount!==e&&(i.visibleCount=e,d(e)),n&&(i.rows!==t&&(i.rows=t,m(t)),i.rowHeight!==r&&(i.rowHeight=r,_(r)))},[n]),A=(0,j.useCallback)((t=`now`)=>{let n=y.current,c=b.current;if(!n||!c)return;let u;if(l&&n.parentElement){let e=n.parentElement,t=getComputedStyle(e);u=e.clientWidth-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight)}else u=n.offsetWidth;let d=Array.from(c.children),f=d.length>e,p=f?d.slice(0,e):d,m=f?d[d.length-1].offsetWidth:0;if(p.length===0){D(0,0,v.current.rowHeight);return}let h=p.map(e=>e.offsetWidth),g=p.reduce((e,t)=>Math.max(e,t.offsetHeight||0),0),{visibleCount:_,rows:x}=w({widths:h,gap:r,availableWidth:u,indicatorWidth:m,minVisibleItems:i,maxVisibleItems:a,maxRows:o,collapseFrom:s});if(t===`beforePaint`){let t=f?d[d.length-1]:null,i=n=>{let r=s===`end`?p.slice(0,n):p.slice(p.length-n);return{widths:r.map(e=>e.offsetWidth),heights:r.map(e=>e.offsetHeight||0),indicator:t&&n<e?{width:m,height:t.offsetHeight||0}:null,indicatorFirst:s===`start`}},a=l&&v.current.visibleCount<e!=_<e,c=(o??1)>1&&g!==v.current.rowHeight,h=l&&n.parentElement?n.parentElement:n;if(a||c||_!==v.current.visibleCount&&k(n,h)||O(i(v.current.visibleCount),i(_),r,u,o??1))return()=>D(_,x,g)}D(_,x,g)},[e,r,i,a,o,s,l,D]),M=(0,j.useCallback)(e=>{if(y.current=e,C.current?.(),C.current=null,x.current=null,e){let t=l&&e.parentElement?e.parentElement:e;C.current=E(t,A),x.current=t}},[A,l]),N=(0,j.useCallback)(e=>{T.current?.(),T.current=null,S.current=null,b.current=e,e&&(T.current=E(e,A),S.current=e)},[A]);return p(()=>{A(`now`)},[A]),{containerRef:M,measureRef:N,visibleCount:u,hasOverflow:u<e,rows:n?f:1,rowHeight:n?h:0}}var j,M,N;function P(){return(P=e((()=>{j=t(),M=h(),m(),f(),_(),N=new Set})))()}function F({children:e,gap:t=2,minVisibleItems:r=0,maxVisibleItems:i,maxRows:c,collapseFrom:u=`end`,behavior:d=`observeSelf`,overflowRenderer:f,onOverflowChange:m,xstyle:h,className:g,style:_,ref:v,...y}){let b=I.Children.toArray(e),x=b.length,S=H[t],C=d===`observeParent`,w=c!=null&&c>1,{containerRef:T,measureRef:E,visibleCount:D,hasOverflow:O,rowHeight:k}=A(x,{gap:S,minVisibleItems:r,maxVisibleItems:i,maxRows:c,collapseFrom:u,behavior:d},{tracksRows:w}),j=b.map((e,t)=>({child:e,index:t})),M,N;u===`end`?(M=j.slice(0,D),N=j.slice(D)):(M=j.slice(x-D),N=j.slice(0,x-D));let P=f?.(j),F=m?JSON.stringify({children:b.map((e,t)=>[t,e.key]),gap:t,minVisibleItems:r,maxVisibleItems:i,maxRows:c,collapseFrom:u,behavior:d}):``,[z,U]=(0,I.useState)(F),W=(0,I.useCallback)(e=>{E(e),e&&U(F)},[E,F]),G=m?JSON.stringify(N.map(({child:e,index:t})=>[t,e.key])):`[]`,K=(0,I.useRef)(`[]`),q=(0,I.useRef)(N);return q.current=N,p(()=>{m&&z===F&&K.current!==G&&(K.current=G,m(q.current))},[z,F,G,m]),(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`div`,{ref:W,"aria-hidden":`true`,inert:!0,...n(R.measureContainer,V[t]),children:[b,o(P)&&(0,L.jsx)(`div`,{className:`astryx3nfvp2`,children:P})]}),(0,L.jsxs)(`div`,{ref:l(v,T),...a(s(`overflow-list`),n(w?R.containerMultiRow:R.container,V[t],w&&k>0&&c!=null&&B.height(c,k,S),C&&O&&R.fillParent,h),g,_),...y,children:[u===`start`&&O&&f?.(N),M.map(({child:e})=>e),u===`end`&&O&&f?.(N)]})]})}var I,L,R,z,B,V,H;function U(){return(U=e((()=>{I=t(),r(),P(),m(),c(),u(),L=i(),R={container:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kVQacm:`astryxb3r6kr`,khDVqt:`astryxuxw1ft`,k7Eaqz:`astryxeuugli`,$$css:!0},containerMultiRow:{k1xSpc:`astryx78zum5`,kwnvtZ:`astryx1a02dak`,kfiyM8:`astryx8gbvx8`,kVQacm:`astryxb3r6kr`,khDVqt:`astryxeaf4i8`,k7Eaqz:`astryxeuugli`,$$css:!0},fillParent:{kzqmXN:`astryxh8yej3`,$$css:!0},measureContainer:{kVAEAm:`astryx10l6tqk`,k33iCy:`astryxlshs6z`,kZKoxP:`astryxqtp20y`,kVQacm:`astryxb3r6kr`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,khDVqt:`astryxuxw1ft`,kfzvcC:`astryx47corl`,$$css:!0}},z={kskxy:`astryx1jols5v`,$$css:!0},B={height:(e,t,n)=>[z,{"--x-maxHeight":(e=>typeof e==`number`?e+`px`:e??void 0)(`calc(${t}px * ${e} + ${n}px * ${e-1})`)}]},V={0:{kOIVth:`astryxsn7fz1`,khm7nJ:null,k1C7PZ:null,$$css:!0},1:{kOIVth:`astryxzye2dw`,khm7nJ:null,k1C7PZ:null,$$css:!0},2:{kOIVth:`astryx1txdalj`,khm7nJ:null,k1C7PZ:null,$$css:!0},3:{kOIVth:`astryxjcht0a`,khm7nJ:null,k1C7PZ:null,$$css:!0},4:{kOIVth:`astryx18g69wz`,khm7nJ:null,k1C7PZ:null,$$css:!0},5:{kOIVth:`astryx9mgr7n`,khm7nJ:null,k1C7PZ:null,$$css:!0},6:{kOIVth:`astryx1qh66ti`,khm7nJ:null,k1C7PZ:null,$$css:!0},8:{kOIVth:`astryx4t41sb`,khm7nJ:null,k1C7PZ:null,$$css:!0},10:{kOIVth:`astryx3hoi3v`,khm7nJ:null,k1C7PZ:null,$$css:!0},"0.5":{kOIVth:`astryx1lsbc85`,khm7nJ:null,k1C7PZ:null,$$css:!0},"1.5":{kOIVth:`astryx1s4dlld`,khm7nJ:null,k1C7PZ:null,$$css:!0}},H={0:0,.5:2,1:4,1.5:6,2:8,3:12,4:16,5:20,6:24,8:32,10:40},F.displayName=`OverflowList`,F.__docgenInfo={description:`A horizontal list that hides items that don't fit and shows an overflow indicator.

Uses a hidden measurement container to determine which items fit without
causing visual flickering. The overflow indicator is also measured
automatically so no manual width value is needed.

@example
\`\`\`
<OverflowList
  gap={2}
  overflowRenderer={(items) => (
    <Button label={\`+\${items.length} more\`} variant="ghost" />
  )}>
  <Button label="Action 1" />
  <Button label="Action 2" />
  <Button label="Action 3" />
  <Button label="Action 4" />
</OverflowList>
\`\`\``,methods:[],displayName:`OverflowList`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the visible container element`},children:{required:!0,tsType:{name:`ReactNode`},description:`The items to render. Each child should be a single element.`},gap:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Gap between items as a spacing token step.
Accepts: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10
@default 2`,defaultValue:{value:`2`,computed:!1}},minVisibleItems:{required:!1,tsType:{name:`number`},description:`Minimum number of items to always show.
@default 0`,defaultValue:{value:`0`,computed:!1}},maxVisibleItems:{required:!1,tsType:{name:`number`},description:`Maximum number of items to ever show, even when they all fit. The ceiling
partner to \`minVisibleItems\`; extra items collapse into the overflow
indicator. Leave undefined for no cap. If it is less than
\`minVisibleItems\`, the floor wins (and a dev-only warning is logged).
@default undefined`},maxRows:{required:!1,tsType:{name:`number`},description:`Wrap items across up to this many rows before collapsing the remainder
into the overflow indicator. Leave undefined (or set \`1\`) for the default
single-line behavior. A number, not a boolean — unbounded wrapping is a
plain flex-wrap layout, not overflow collapse. Assumes uniform row height.
@default undefined`},collapseFrom:{required:!1,tsType:{name:`union`,raw:`'start' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Which end to collapse items from.
@default 'end'`,defaultValue:{value:`'end'`,computed:!1}},behavior:{required:!1,tsType:{name:`union`,raw:`'observeParent' | 'observeSelf'`,elements:[{name:`literal`,value:`'observeParent'`},{name:`literal`,value:`'observeSelf'`}]},description:`Which element to observe for overflow calculations.
- \`'observeSelf'\`: uses the container's own width (default)
- \`'observeParent'\`: observes the parent element's content width
  for overflow calculations. This keeps the overflow list
  content-sized while still detecting available space for
  grow-back. Siblings that don't fit can wrap and be clipped by
  the parent's overflow.
@default 'observeSelf'`,defaultValue:{value:`'observeSelf'`,computed:!1}},overflowRenderer:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(overflowItems: OverflowItem[]) => ReactNode`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`OverflowItem`}],raw:`OverflowItem[]`},name:`overflowItems`}],return:{name:`ReactNode`}}},description:`Render function for the overflow indicator. Receives the list of
items that are not visible, each with its original index. Only called
when there are overflowing items.

The indicator is automatically measured in a hidden container to
reserve the correct amount of space.

@example
\`\`\`
const labels = ['Save', 'Edit', 'Share'];
<OverflowList
  overflowRenderer={(overflowItems) => (
    <DropdownMenu
      button={{label: \`+\${overflowItems.length}\`, variant: 'ghost'}}
      items={overflowItems.map(({index}) => ({ label: labels[index] }))}
    />
  )}>
  {labels.map(l => <Button key={l} label={l} />)}
</OverflowList>
\`\`\``},onOverflowChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(overflowItems: OverflowItem[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`OverflowItem`}],raw:`OverflowItem[]`},name:`overflowItems`}],return:{name:`void`}}},description:`Called with the items that are currently collapsed, whenever that set
changes.

Use it when the collapsed items belong in a menu the surrounding UI
already renders (a row that already has its own "…" button), so the list
does not grow a second anchor beside it. \`overflowRenderer\` cannot serve
that case: it is only rendered while items overflow, and its measurement
copy always receives every item.

The contract:
- It fires once measurement has collapsed something, and again with an
  empty array once the row widens back out and everything fits.
- It is **silent while nothing overflows** — including on mount, so a list
  that fits from the start never calls it. There is no report of the
  pre-measurement state, which would always be an empty set whether or not
  the row actually overflows. Hold the collapsed set in state initialised
  to \`[]\` and it is correct at every moment; if you remount the list while
  keeping that state, reset it yourself.
- Reports are keyed on the collapsed items' original indices and React
  keys. Membership and order changes report even when the count stays the
  same; unrelated re-renders and callback identity changes do not.

Give dynamic children stable React keys. Items include their current
original \`index\`; use it to look up your own data rather than storing
\`child\`.

@example
\`\`\`
const [hidden, setHidden] = useState<OverflowItem[]>([]);
<>
  <OverflowList onOverflowChange={setHidden}>{items}</OverflowList>
  <DropdownMenu
    button={{label: 'More', variant: 'ghost'}}
    items={[...alwaysThere, ...hidden.map(({index}) => actions[index])]}
  />
</>
\`\`\``}},composes:[`Omit`]}})))()}export{U as n,F as t};