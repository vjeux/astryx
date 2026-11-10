import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,n as i}from"./sharedMutationObserver-B1G19sqt.js";import{r as a,t as o}from"./sharedResizeObserver-Cel0TOAm.js";import{n as s,t as c}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{n as l,o as u}from"./animator-_25gFM0H.js";import{n as d,t as f}from"./Button-DoGM0DEN.js";import{n as p}from"./isRtlElement-qYN8UwJm.js";import{n as m,t as h}from"./Card-DA0ZfoAz.js";import{a as g,i as _,n as v,o as y,r as b,s as ee,t as x}from"./Carousel-AfwyzOUx.js";import{n as te,t as S}from"./usePager-B8xEn9UM.js";import{n as ne,t as C}from"./Thumbnail-C-mPZsTr.js";function w(e={}){let t=(0,D.useRef)(e);s(()=>{t.current=e});let[n]=(0,D.useState)(()=>{let e={get pages(){return t.current.pages}};return g((t,n)=>ie(t,e,n))});return n}function T(e,t,n){let r=t=>{let n=0;for(let r=1;r<e.length;r++)Math.abs(e[r]-t)<Math.abs(e[n]-t)&&(n=r);return n},i=[e[t]];for(let a=t;a<e.length-1;)a=Math.max(r(e[a]+n),a+1),i.push(e[a]);for(let a=t;a>0;)a=Math.min(r(e[a]-n),a-1),i.unshift(e[a]);return i}function re(e){let[t]=e;return{properties:t.properties,finished:Promise.all(e.map(async e=>e.finished)).then(e=>e.every(Boolean)),started:t.started,value:(e,n)=>t.value(e,n),velocity:(e,n)=>t.velocity(e,n),curve:e=>t.curve(e),retarget:(t,n,r)=>re(e.map(e=>e.retarget(t,n,r))),stop:()=>{for(let t of e)t.stop()}}}function E(e,t){let n=!1,r=0,i=0,a=1,o=null,s=0,c=0,u=0,d=0,f=``,m=[],h=0,g=[],v=()=>Array.from(e.children).filter(e=>e instanceof HTMLElement),b=()=>p(e),x=()=>n?a:b()?-1:1,te=e=>-x()*e,S=()=>Math.abs(e.scrollLeft),ne=()=>{let t=getComputedStyle(e),n=Number.parseFloat(t.scrollPaddingLeft)||0,r=Number.parseFloat(t.scrollPaddingRight)||0;return b()?{start:r,end:n}:{start:n,end:r}},C=e=>e+x()*r;function w(){let e=v()[0];return!n||e==null?S():-x()*(l(e).get(`x`)-x()*r)}function T(){t!=null&&n&&(t({offset:o==null?r:-a*(l(o).get(`x`)-a*r),travel:i}),s=requestAnimationFrame(T))}function E(){return _(e,n)}function ie(t,n){let r=e.getBoundingClientRect(),i=y(e,r),a=b();return t.map(e=>{let t=e.getBoundingClientRect(),o=(a?r.right-t.right:t.left-r.left)/i+n;return{start:o,end:o+t.width/i}})}function D(){let e=v()[0];if(g.length===0||e==null)return;let t=l(e).get(`x`);for(let e of g){let n=l(e);n.get(`x`)!==t&&n.set({x:t})}g=[]}function O(){if(!n)return;D();let t=E(),a=e.clientWidth,o=S();if(m=ie(v(),w()),h=e.offsetWidth,i=Math.max(0,Math.round(c+(t-u)-(a-d))),o!==r){let e=w();r=o,N(e)}}function k(){return n?i:Math.max(0,e.scrollWidth-e.clientWidth)}function A(){return ee(e,S(),k(),n)}function j(){return D(),A().stops}function M(){let{start:t,end:n}=ne();return Math.max(1,e.clientWidth-t-n)}function N(e){let t=C(te(e));for(let e of v()){let n=l(e);n.get(`x`)!==t&&n.set({x:t})}}function P(){if(n)return;let t=S(),s=Math.max(0,e.scrollWidth-e.clientWidth),l=b()?-1:1,p=v(),g=E(),_=e.clientWidth,y=ie(p,t);r=t,i=s,c=s,u=g,d=_,a=l,h=e.offsetWidth,m=y,o=p[0]??null,n=!0,f=e.style.getPropertyValue(`scroll-snap-type`),e.style.setProperty(`scroll-snap-type`,`none`),N(r),T()}function F(r){if(!n)return;let a=w();for(let e of v()){let t=l(e);t.stop([`x`]),t.set({x:0}),e.style.removeProperty(`translate`)}g=[],n=!1,r?.(),f===``?e.style.removeProperty(`scroll-snap-type`):e.style.setProperty(`scroll-snap-type`,f),e.scrollTo({left:b()?-a:a,behavior:`instant`}),t!=null&&(cancelAnimationFrame(s),t({offset:a,travel:i}),t(null))}function I(e){let t=1/0,n=-1/0,r=Math.max(1,Math.ceil(e.duration*ae));for(let i=0;i<=r;i++){let o=-a*e.at(e.duration*i/r);t=Math.min(t,o),n=Math.max(n,o)}return e=>{let r=m[e];return r==null||r.end>t&&r.start<n+h}}return{animator:{get(e,t){let i=v()[0];if(!n||i==null)return e===`x`?te(S()):0;let a=l(i).get(e,t);return e===`x`?a-x()*r:a},getVelocity(e,t){let r=v()[0];return n&&r!=null?l(r).getVelocity(e,t):0},set(e,t){if(!n)return;let r=e.x==null?e:{...e,x:C(e.x)};for(let e of v())l(e).set(r,t);e.x!=null&&(g=[])},stop(e){if(n){for(let t of v())l(t).stop(e);n&&(e==null||e.includes(`x`))&&(N(w()),g=[])}},play(t,n){P();let i=x()*r,a=t.x,o=a==null?t:{...t,x:{...a,at:e=>a.at(e)+i}},[s,...c]=v();if(s==null)return l(e).play(o,n);let u=a==null?()=>!0:I(a),d=[s];g=[];for(let[e,t]of c.entries())(u(e+1)?d:g).push(t);return re(d.map(e=>l(e).play(o,n)))}},get isMoving(){return n},position:w,travel:k,remeasure:O,pages:A,stops:j,viewWidth:M,place:N,takeOver:P,handBack:F}}function ie(e,t,n){let i=E(e,n);for(let t of Array.from(e.children))t instanceof HTMLElement&&l(t);let o=0,s=null,c=new Map,u=e=>{for(let[t,n]of c)e.includes(t)||(c.delete(t),n.value===``?t.style.removeProperty(`scroll-snap-align`):t.style.setProperty(`scroll-snap-align`,n.value,n.priority));for(let t of e)t instanceof HTMLElement&&!c.has(t)&&(c.set(t,{value:t.style.getPropertyValue(`scroll-snap-align`),priority:t.style.getPropertyPriority(`scroll-snap-align`)}),t.style.setProperty(`scroll-snap-align`,`none`))},d=null,f=!1,p=()=>{i.isMoving?f=!0:d??=requestAnimationFrame(()=>{d=null,i.isMoving?f=!0:(f=!1,u(i.pages().skipped))})},m=e=>{let t=i.stops(),n=i.viewWidth();o=t.reduce((n,r,i)=>Math.abs(r-e)<Math.abs(t[n]-e)?i:n,0),s={stops:t,viewWidth:n},h.setOptions({}),s=null,h.goTo(h.nearestPage(e),{animated:!1,reason:`controlled`}),i.takeOver()},h=S({count:1,pages:`children`,panOptions:{allowedPointerTypes:[`touch`,`pen`]},measurePages:()=>{i.remeasure();let e=s?.stops??i.stops();return p(),(t.pages??`view`)===`item`?e:T(e,Math.min(o,e.length-1),s?.viewWidth??i.viewWidth())},shouldBeginPan:()=>(i.isMoving||m(i.position()),!0),onSettle:()=>{!h.isDragging&&!h.isSettling&&i.handBack(f?()=>{f=!1,u(i.pages().skipped)}:void 0)}},{animator:i.animator}),g=h.attach(e,e),_=[],v=()=>{for(let e of _)e();_=Array.from(e.children,e=>a(e,p))},y=r(e,{childList:!0},()=>{v(),p()});return v(),{detach:()=>{g(),h.dispose(),y();for(let e of _)e();d!=null&&(cancelAnimationFrame(d),d=null),i.handBack(),u([])},move:e=>{if(h.isDragging)return;let t=i.position(),n=i.travel(),r=Math.min(Math.max(e(t,n),0),n);i.isMoving||m(t),h.goTo(h.nearestPage(r),{offset:r})},moveHeld:e=>{if(!i.isMoving)return!1;if(!h.isDragging){let t=i.travel(),n=Math.min(Math.max(e(i.position(),t),0),t);h.goTo(h.nearestPage(n),{offset:n})}return!0}}}var D,ae;function O(){return(O=e((()=>{D=t(),te(),c(),u(),i(),o(),b(),ae=120})))()}function k({layout:e,count:t,mode:n,hasLoop:r=!1}){let i=w({pages:n===`item`?`item`:`view`});return(0,j.jsx)(`div`,{className:`xdzyupr`,children:(0,j.jsx)(x,{gap:e===`1-up`?0:2,hasLoop:r,hasSnap:n===`snap`||i,"aria-label":`Numbered items`,children:Array.from({length:t},(t,n)=>(0,j.jsx)(`div`,{"data-item":n,...{0:{className:`x78zum5 x6s0dn4 xl56j7k x1wkxgih xh6dtrn xwmxj5m x1tgivj0 x9ynric x1pvqxga x1s688f xd1f2cv`},1:{className:`x78zum5 x6s0dn4 xl56j7k x1wkxgih xh6dtrn xwmxj5m x1tgivj0 x9ynric x1pvqxga x1s688f xdzyupr`}}[e===`1-up`|0],children:n+1},n))})})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,oe;function se(){return(se=e((()=>{A=t(),v(),O(),ne(),m(),d(),j=n(),M={card:{kzqmXN:`xq1dxzn`,kmuXW:`x2lah0s`,$$css:!0}},N=[{id:1,src:`https://picsum.photos/id/1042/200/200`,label:`dark.jpg`},{id:2,src:`https://picsum.photos/id/1043/200/200`,label:`light.jpg`},{id:3,src:`https://picsum.photos/id/1044/200/200`,label:`warm.jpg`},{id:4,src:`https://picsum.photos/id/1047/200/200`,label:`mixed.jpg`},{id:5,src:`https://picsum.photos/id/1050/200/200`,label:`nature.jpg`},{id:6,src:`https://picsum.photos/id/1055/200/200`,label:`city.jpg`},{id:7,src:`https://picsum.photos/id/1060/200/200`,label:`ocean.jpg`},{id:8,src:`https://picsum.photos/id/1069/200/200`,label:`forest.jpg`}],P={title:`Core/Carousel`,component:x,tags:[`autodocs`],argTypes:{gap:{control:{type:`select`},options:[0,.5,1,1.5,2,3,4],description:`Gap between items`},hasButtons:{control:`boolean`,description:`Show navigation buttons when the content can scroll`},padding:{control:{type:`select`},options:[0,.5,1,1.5,2,3,4,5,6,8,10],description:`Inline padding inside the scroll container`},hasEdgeFade:{control:`boolean`,description:`Show gradient edge-fade mask on overflow`},hasLoop:{control:`boolean`,description:`Wrap-around scrolling (next at end → start)`},hasSnap:{control:`boolean`,description:`Enable scroll-snap`}},decorators:[e=>(0,j.jsx)(`div`,{className:`x1eiddq6 x1gt495 x9ynric`,children:(0,j.jsx)(e,{})})]},F={render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`Scroll or hover for arrows →`}),(0,j.jsx)(x,{gap:1,"aria-label":`Photo thumbnails`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},I={name:`Thumbnails with Remove`,render:function(){let[e,t]=(0,A.useState)(N);return(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsxs)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:[e.length,` attachments`]}),(0,j.jsx)(x,{gap:1,"aria-label":`Attached files`,children:e.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label,onRemove:()=>t(t=>t.filter(t=>t.id!==e.id))},e.id))}),e.length===0&&(0,j.jsxs)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:[`All removed. `,(0,j.jsx)(`button`,{onClick:()=>t(N),children:`Reset`})]})]})}},L={name:`Few Items (No Overflow)`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`No overflow — no fade, no buttons`}),(0,j.jsx)(x,{gap:1,"aria-label":`Small gallery`,children:N.slice(0,3).map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},R={name:`Card Content`,render:()=>(0,j.jsxs)(`div`,{style:{maxWidth:500},children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`Cards in a carousel`}),(0,j.jsx)(x,{gap:2,hasSnap:!0,"aria-label":`Feature cards`,children:[{id:1,title:`Design System`,desc:`Component library`},{id:2,title:`Documentation`,desc:`API reference`},{id:3,title:`Storybook`,desc:`Visual testing`},{id:4,title:`Theme Config`,desc:`Token overrides`},{id:5,title:`CLI Tools`,desc:`Code generation`},{id:6,title:`Accessibility`,desc:`ARIA patterns`}].map(e=>(0,j.jsx)(h,{xstyle:M.card,children:(0,j.jsxs)(`div`,{className:`x1b2ylru`,children:[(0,j.jsx)(`p`,{className:`x1ghz6dp xif65rj x1s688f x1tgivj0 x9ynric`,children:e.title}),(0,j.jsx)(`p`,{className:`x1ghz6dp xfifm61 xv1l7n4 x9ynric`,children:e.desc})]})},e.id))})]})},z={name:`Without Buttons`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`Scroll only — no arrow buttons`}),(0,j.jsx)(x,{gap:1,hasButtons:!1,"aria-label":`Scroll-only gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},B={name:`Scroll Snap`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`Snaps to items on scroll`}),(0,j.jsx)(x,{gap:2,hasSnap:!0,"aria-label":`Snapping gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},V={name:`Large Gap`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`gap=4 (16px)`}),(0,j.jsx)(x,{gap:4,"aria-label":`Spaced gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},H={name:`Custom Content (Swatches)`,render:()=>(0,j.jsxs)(`div`,{style:{maxWidth:360},children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`Any content works as children`}),(0,j.jsx)(x,{gap:1.5,"aria-label":`Color swatches`,children:[`#e74c3c`,`#e67e22`,`#f1c40f`,`#2ecc71`,`#1abc9c`,`#3498db`,`#9b59b6`,`#34495e`,`#e84393`,`#00cec9`,`#6c5ce7`,`#fdcb6e`].map(e=>(0,j.jsx)(`div`,{className:`x1dmp6jm xwzfr38 xh6dtrn x2lah0s`,style:{backgroundColor:e},title:e},e))})]})},U={name:`Loop (Wrap-Around)`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`Next at the end wraps to the start — buttons stay active at both edges`}),(0,j.jsx)(x,{gap:1,hasLoop:!0,hasSnap:!0,"aria-label":`Looping gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},W={name:`Imperative Control (handleRef)`,render:function(){let e=(0,A.useRef)(null);return(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`External buttons driving the carousel through handleRef`}),(0,j.jsx)(x,{handleRef:e,gap:1,hasSnap:!0,hasButtons:!1,"aria-label":`Externally controlled gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))}),(0,j.jsxs)(`div`,{style:{display:`flex`,gap:8,marginTop:12},children:[(0,j.jsx)(f,{label:`Previous`,variant:`secondary`,size:`sm`,onClick:()=>e.current?.scrollPrev()}),(0,j.jsx)(f,{label:`Next`,variant:`secondary`,size:`sm`,onClick:()=>e.current?.scrollNext()}),(0,j.jsx)(f,{label:`Jump to first`,variant:`ghost`,size:`sm`,onClick:()=>e.current?.scrollTo(0)})]})]})}},G={name:`Inline Padding`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`padding=3 puts the gutter inside the scroll area, and scroll-padding keeps snap points on the content edge`}),(0,j.jsx)(x,{gap:1,padding:3,hasSnap:!0,"aria-label":`Padded gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},K={name:`Narrow Container`,render:()=>(0,j.jsxs)(`div`,{className:`x16em4ew`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`240px container`}),(0,j.jsx)(x,{gap:1,"aria-label":`Narrow gallery`,children:N.map(e=>(0,j.jsx)(C,{src:e.src,alt:e.label,label:e.label},e.id))})]})},q={name:`Long Text Items`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`One very long item among short ones, and a word with no break opportunity`}),(0,j.jsxs)(x,{gap:2,"aria-label":`Text items`,children:[(0,j.jsx)(h,{xstyle:M.card,children:(0,j.jsx)(`div`,{className:`x1b2ylru`,children:(0,j.jsx)(`p`,{className:`x1ghz6dp xfifm61 xv1l7n4 x9ynric`,children:`Short`})})}),(0,j.jsx)(h,{xstyle:M.card,children:(0,j.jsx)(`div`,{className:`x1b2ylru`,children:(0,j.jsx)(`p`,{className:`x1ghz6dp xfifm61 xv1l7n4 x9ynric`,children:`A much longer description that runs well past the width of its neighbours and has to wrap inside a fixed-width card without pushing the row out of shape.`})})}),(0,j.jsx)(h,{xstyle:M.card,children:(0,j.jsx)(`div`,{className:`x1b2ylru`,children:(0,j.jsx)(`p`,{className:`x1ghz6dp xfifm61 xv1l7n4 x9ynric`,children:`Unbreakable: Donaudampfschiffahrtselektrizitaetenhauptbetriebswerkbauunterbeamtengesellschaft`})})})]})]})},J={name:`Single Item`,render:()=>(0,j.jsxs)(`div`,{className:`x1j9u4d2`,children:[(0,j.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1p37lm5 x9ynric`,children:`One child: no overflow, no fade, no buttons`}),(0,j.jsx)(x,{gap:1,"aria-label":`Single item`,children:(0,j.jsx)(C,{src:N[0].src,alt:N[0].label,label:N[0].label})})]})},Y={mode:{control:{type:`select`},options:[`snap`,`paging`,`item`],description:`hasSnap (native snap), hasSnap={useSnapPaging()} (one view per flick) or hasSnap={useSnapPaging({pages: "item"})}`}},X={name:`Snap Paging: One Item per View`,argTypes:Y,args:{mode:`paging`},render:({mode:e})=>(0,j.jsx)(k,{layout:`1-up`,count:5,mode:e})},Z={name:`Snap Paging: Three Items per View`,argTypes:Y,args:{mode:`paging`},render:({mode:e,hasLoop:t})=>(0,j.jsx)(k,{layout:`3-up`,count:9,mode:e,hasLoop:t})},Q={name:`Snap Paging: Partial Last Page`,argTypes:Y,args:{mode:`paging`},render:({mode:e})=>(0,j.jsx)(k,{layout:`3-up`,count:7,mode:e})},$={name:`Snap Paging: Right to Left`,argTypes:Y,args:{mode:`paging`},render:({mode:e})=>(0,j.jsx)(`div`,{dir:`rtl`,children:(0,j.jsx)(k,{layout:`3-up`,count:9,mode:e})})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>Scroll or hover for arrows →</p>
      <Carousel gap={1} aria-label="Photo thumbnails">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Thumbnails with Remove',
  render: function WithRemoveStory() {
    const [items, setItems] = useState(IMAGES);
    return <div {...stylex.props(styles.constrainedWidth)}>
        <p {...stylex.props(styles.label)}>{items.length} attachments</p>
        <Carousel gap={1} aria-label="Attached files">
          {items.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} onRemove={() => setItems(prev => prev.filter(i => i.id !== img.id))} />)}
        </Carousel>
        {items.length === 0 && <p {...stylex.props(styles.label)}>
            All removed. <button onClick={() => setItems(IMAGES)}>Reset</button>
          </p>}
      </div>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Few Items (No Overflow)',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>No overflow — no fade, no buttons</p>
      <Carousel gap={1} aria-label="Small gallery">
        {IMAGES.slice(0, 3).map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Card Content',
  render: () => {
    const cards = [{
      id: 1,
      title: 'Design System',
      desc: 'Component library'
    }, {
      id: 2,
      title: 'Documentation',
      desc: 'API reference'
    }, {
      id: 3,
      title: 'Storybook',
      desc: 'Visual testing'
    }, {
      id: 4,
      title: 'Theme Config',
      desc: 'Token overrides'
    }, {
      id: 5,
      title: 'CLI Tools',
      desc: 'Code generation'
    }, {
      id: 6,
      title: 'Accessibility',
      desc: 'ARIA patterns'
    }];
    return <div style={{
      maxWidth: 500
    }}>
        <p {...stylex.props(styles.label)}>Cards in a carousel</p>
        <Carousel gap={2} hasSnap aria-label="Feature cards">
          {cards.map(card => <Card key={card.id} xstyle={styles.card}>
              <div {...stylex.props(styles.cardInner)}>
                <p {...stylex.props(styles.cardTitle)}>{card.title}</p>
                <p {...stylex.props(styles.cardDesc)}>{card.desc}</p>
              </div>
            </Card>)}
        </Carousel>
      </div>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Without Buttons',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>Scroll only — no arrow buttons</p>
      <Carousel gap={1} hasButtons={false} aria-label="Scroll-only gallery">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Scroll Snap',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>Snaps to items on scroll</p>
      <Carousel gap={2} hasSnap aria-label="Snapping gallery">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Large Gap',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>gap=4 (16px)</p>
      <Carousel gap={4} aria-label="Spaced gallery">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Custom Content (Swatches)',
  render: () => {
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#34495e', '#e84393', '#00cec9', '#6c5ce7', '#fdcb6e'];
    return <div style={{
      maxWidth: 360
    }}>
        <p {...stylex.props(styles.label)}>Any content works as children</p>
        <Carousel gap={1.5} aria-label="Color swatches">
          {colors.map(color => <div key={color} {...stylex.props(styles.colorSwatch)} style={{
          backgroundColor: color
        }} title={color} />)}
        </Carousel>
      </div>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Loop (Wrap-Around)',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>
        Next at the end wraps to the start — buttons stay active at both edges
      </p>
      <Carousel gap={1} hasLoop hasSnap aria-label="Looping gallery">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Imperative Control (handleRef)',
  render: function ImperativeControlStory() {
    const carouselRef = useRef<CarouselHandle>(null);
    return <div {...stylex.props(styles.constrainedWidth)}>
        <p {...stylex.props(styles.label)}>
          External buttons driving the carousel through handleRef
        </p>
        <Carousel handleRef={carouselRef} gap={1} hasSnap hasButtons={false} aria-label="Externally controlled gallery">
          {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
        </Carousel>
        <div style={{
        display: 'flex',
        gap: 8,
        marginTop: 12
      }}>
          <Button label="Previous" variant="secondary" size="sm" onClick={() => carouselRef.current?.scrollPrev()} />
          <Button label="Next" variant="secondary" size="sm" onClick={() => carouselRef.current?.scrollNext()} />
          <Button label="Jump to first" variant="ghost" size="sm" onClick={() => carouselRef.current?.scrollTo(0)} />
        </div>
      </div>;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Inline Padding',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>
        padding=3 puts the gutter inside the scroll area, and scroll-padding
        keeps snap points on the content edge
      </p>
      <Carousel gap={1} padding={3} hasSnap aria-label="Padded gallery">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Narrow Container',
  render: () => <div {...stylex.props(styles.narrowWidth)}>
      <p {...stylex.props(styles.label)}>240px container</p>
      <Carousel gap={1} aria-label="Narrow gallery">
        {IMAGES.map(img => <Thumbnail key={img.id} src={img.src} alt={img.label} label={img.label} />)}
      </Carousel>
    </div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Long Text Items',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>
        One very long item among short ones, and a word with no break
        opportunity
      </p>
      <Carousel gap={2} aria-label="Text items">
        <Card xstyle={styles.card}>
          <div {...stylex.props(styles.cardInner)}>
            <p {...stylex.props(styles.cardDesc)}>Short</p>
          </div>
        </Card>
        <Card xstyle={styles.card}>
          <div {...stylex.props(styles.cardInner)}>
            <p {...stylex.props(styles.cardDesc)}>
              A much longer description that runs well past the width of its
              neighbours and has to wrap inside a fixed-width card without
              pushing the row out of shape.
            </p>
          </div>
        </Card>
        <Card xstyle={styles.card}>
          <div {...stylex.props(styles.cardInner)}>
            <p {...stylex.props(styles.cardDesc)}>
              Unbreakable:
              Donaudampfschiffahrtselektrizitaetenhauptbetriebswerkbauunterbeamtengesellschaft
            </p>
          </div>
        </Card>
      </Carousel>
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Single Item',
  render: () => <div {...stylex.props(styles.constrainedWidth)}>
      <p {...stylex.props(styles.label)}>
        One child: no overflow, no fade, no buttons
      </p>
      <Carousel gap={1} aria-label="Single item">
        <Thumbnail src={IMAGES[0].src} alt={IMAGES[0].label} label={IMAGES[0].label} />
      </Carousel>
    </div>
}`,...J.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Snap Paging: One Item per View',
  argTypes: pagingArgTypes,
  args: {
    mode: 'paging'
  },
  render: ({
    mode
  }) => <PagingCarousel layout="1-up" count={5} mode={mode} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Snap Paging: Three Items per View',
  argTypes: pagingArgTypes,
  args: {
    mode: 'paging'
  },
  render: ({
    mode,
    hasLoop
  }) => <PagingCarousel layout="3-up" count={9} mode={mode} hasLoop={hasLoop} />
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Snap Paging: Partial Last Page',
  argTypes: pagingArgTypes,
  args: {
    mode: 'paging'
  },
  render: ({
    mode
  }) => <PagingCarousel layout="3-up" count={7} mode={mode} />
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Snap Paging: Right to Left',
  argTypes: pagingArgTypes,
  args: {
    mode: 'paging'
  },
  render: ({
    mode
  }) => <div dir="rtl">
      <PagingCarousel layout="3-up" count={9} mode={mode} />
    </div>
}`,...$.parameters?.docs?.source}}},oe=[`Default`,`WithRemove`,`FewItems`,`Cards`,`NoButtons`,`WithSnap`,`LargeGap`,`ColorSwatches`,`Loop`,`ImperativeControl`,`WithPadding`,`NarrowContainer`,`LongTextItems`,`SingleItem`,`SnapPagingOneUp`,`SnapPagingThreeUp`,`SnapPagingPartialLastPage`,`SnapPagingRightToLeft`]})))()}se();export{R as Cards,H as ColorSwatches,F as Default,L as FewItems,W as ImperativeControl,V as LargeGap,q as LongTextItems,U as Loop,K as NarrowContainer,z as NoButtons,J as SingleItem,X as SnapPagingOneUp,Q as SnapPagingPartialLastPage,$ as SnapPagingRightToLeft,Z as SnapPagingThreeUp,G as WithPadding,I as WithRemove,B as WithSnap,oe as __namedExportsOrder,P as default};