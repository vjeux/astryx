import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{i as n,n as r,r as i,t as a}from"./LayoutContent-BEmJ3Yl2.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{r as s,t as c}from"./sharedResizeObserver-Cel0TOAm.js";import{i as l,s as u}from"./useResizable-MO9DK77O.js";import{n as d,t as f}from"./LayoutPanel-BWGJdNoy.js";import{i as p,r as m}from"./columnUtils-ClYX9X3Y.js";import{n as h,t as g}from"./ResizeHandle-8uhoaggA.js";function _(e,t){return{type:`percent`,value:e,...t}}function v({children:e}){return(0,S.jsx)(`div`,{children:e})}function y({kind:e,width:t}){let n=(0,x.useRef)(null),r=(0,x.useRef)(null),[o,c]=(0,x.useState)(!1),l=e.startsWith(`default`),d=e===`minimum`,m=`storybook-structured-percent-${e}`,h=u({...l?{defaultSize:_(40,{min:p(333)})}:d?{defaultSize:0,minSize:_(40,{min:p(333)})}:{defaultSize:500,maxSize:_(10,{max:p(400)})},containerRef:n,direction:`horizontal`,autoSaveId:m}),v=l?null:d?h.props._minSizePx:h.props._maxSizePx,y=l?`defaultSize: percent(40, {min: pixel(333)})`:d?`minSize: percent(40, {min: pixel(333)})`:`maxSize: percent(10, {max: pixel(400)})`,b=(0,x.useCallback)(()=>{let e=r.current;if(e==null)return;let t=getComputedStyle(e).overflowY,n=[`auto`,`scroll`,`overlay`].includes(t)&&e.scrollHeight>e.clientHeight+1;c(e=>e===n?e:n)},[]);return(0,x.useLayoutEffect)(()=>{let e=r.current;if(e!=null)return s(e,b)},[b]),(0,S.jsxs)(`div`,{ref:n,"data-testid":`structured-percent-${e}-frame`,"data-width":t,"data-size":h.size,"data-resolved-bound":v??void 0,"data-storage-key":`astryx-resizable:${m}`,className:`xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr x1b51vyi`,style:{width:t},children:[(0,S.jsxs)(`div`,{className:`x1de1mus xmkeg23 x1y0btm7 x14i3s5s x1hviunn xuoh4cs`,children:[(0,S.jsxs)(`strong`,{children:[t,`px outer / `,t-2,`px content`]}),(0,S.jsx)(`div`,{children:(0,S.jsx)(`code`,{children:y})}),(0,S.jsxs)(`div`,{children:[Math.round(h.size),`px selected`,v==null?` initially`:` · ${Math.round(v)}px resolved bound`]})]}),(0,S.jsx)(`div`,{className:`xwzfr38`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(f,{width:h.size,hasDivider:!1,isScrollable:!1,"data-testid":`structured-percent-${e}-panel`,children:[Math.round(h.size),`px`]}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,label:`Resize structured percent ${e} example`,resizable:h.props})]}),content:(0,S.jsx)(a,{ref:r,"data-testid":`structured-percent-${e}-content`,role:o?`region`:void 0,label:o?`Structured percent ${e.replaceAll(`-`,` `)} details`:void 0,tabIndex:o?0:-1,children:l?`Later basis changes do not rescale this selected pixel size.`:`The percentage bound follows later basis changes.`})})})]})}function b(){let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1);return(0,x.useEffect)(()=>{for(let e of[`default-wide`,`default-narrow`,`minimum`,`maximum`])localStorage.removeItem(`astryx-resizable:storybook-structured-percent-${e}`);t(!0)},[]),e?(0,S.jsxs)(`div`,{"data-testid":`structured-percent-sizing`,className:`xrvj5dj x18g69wz`,children:[(0,S.jsx)(`button`,{type:`button`,"data-testid":`structured-percent-toggle-bases`,onClick:()=>r(e=>!e),children:n?`Restore initial bases`:`Change bases`}),(0,S.jsx)(y,{kind:`default-wide`,width:n?500:1e3}),(0,S.jsx)(y,{kind:`default-narrow`,width:n?1e3:500}),(0,S.jsx)(y,{kind:`minimum`,width:n?1e3:500}),(0,S.jsx)(y,{kind:`maximum`,width:n?500:1e3})]}):null}var x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{x=t(),l(),h(),m(),n(),r(),d(),c(),S=o(),C={muted:{kWkggS:`xwmxj5m`,$$css:!0}},w={title:`Core/Hooks/useResizable`,component:v,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Hook that manages resize state for panel regions. Pair with ResizeHandle for interactive resizing.`}}}},T={render:()=>{let e=u({defaultSize:200,minSize:100,maxSize:500});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:e.size,hasDivider:!1,children:`Sidebar`}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,resizable:e.props})]}),content:(0,S.jsx)(a,{children:`Content`})})})}},E={render:()=>{let e=u({defaultSize:150,minSize:60,maxSize:250,direction:`vertical`});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,header:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:`100%`,padding:4,children:(0,S.jsx)(`div`,{style:{height:e.size},children:`Header`})}),(0,S.jsx)(g,{direction:`vertical`,hasDivider:!0,resizable:e.props})]}),content:(0,S.jsx)(a,{children:`Content`})})})}},D={render:()=>{let e=u({defaultSize:180,minSize:120,maxSize:300}),t=u({defaultSize:220,minSize:150,maxSize:400});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:e.size,hasDivider:!1,children:`Folders`}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,resizable:e.props})]}),content:(0,S.jsx)(a,{children:`Inbox`}),end:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,isReversed:!0,resizable:t.props}),(0,S.jsx)(f,{width:t.size,hasDivider:!1,children:`Preview`})]})})})}},O={render:()=>{let e=u({defaultSize:200,minSize:120,maxSize:350}),t=u({defaultSize:200,minSize:80,maxSize:250,direction:`vertical`});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:e.size,hasDivider:!1,children:`Explorer`}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,resizable:e.props})]}),content:(0,S.jsx)(a,{padding:0,children:(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`},children:[(0,S.jsx)(`div`,{style:{height:t.size,flexShrink:0,display:`flex`,alignItems:`center`,justifyContent:`center`},children:`Editor`}),(0,S.jsx)(g,{direction:`vertical`,hasDivider:!0,resizable:t.props}),(0,S.jsx)(`div`,{style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`},children:`Terminal`})]})})})})}},k={render:()=>{let e=u({defaultSize:250,minSize:100,maxSize:500});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:e.size,hasDivider:!1,children:`Sidebar`}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,resizable:e.props})]}),content:(0,S.jsx)(a,{children:`Content`})})})}},A={render:()=>{let e=u({defaultSize:200,minSize:120,maxSize:350}),t=u({defaultSize:200,minSize:80,maxSize:250,direction:`vertical`});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:e.size,hasDivider:!1,xstyle:C.muted,children:`Explorer`}),(0,S.jsx)(g,{direction:`horizontal`,resizable:e.props})]}),content:(0,S.jsx)(a,{padding:0,children:(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`},children:[(0,S.jsx)(`div`,{style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`},children:`Editor`}),(0,S.jsx)(g,{direction:`vertical`,resizable:t.props}),(0,S.jsx)(`div`,{className:`x1de1mus xmkeg23 x1y0btm7 x14i3s5s x1hviunn xuoh4cs`,style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`},children:`Terminal`})]})})})})}},j={render:()=>{let e=(0,x.useRef)(null),t=u({defaultSize:`40%`,minSize:`15%`,maxSize:`60%`,containerRef:e});return(0,S.jsx)(`div`,{ref:e,className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:t.size,hasDivider:!1,children:(0,S.jsxs)(`div`,{className:`x1de1mus xmkeg23 x1y0btm7 x14i3s5s x1hviunn xuoh4cs`,children:[Math.round(t.size),`px`]})}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,resizable:t.props})]}),content:(0,S.jsx)(a,{children:`Content`})})})}},M={render:()=>(0,S.jsx)(b,{})},N={render:()=>{let e=u({defaultSize:`25%`,minSize:80});return(0,S.jsx)(`div`,{className:`x1vd4hg5 xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,"data-testid":`viewport-pct`,children:(0,S.jsx)(i,{height:`fill`,start:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{width:e.size,hasDivider:!1,children:(0,S.jsxs)(`div`,{className:`x1de1mus xmkeg23 x1y0btm7 x14i3s5s x1hviunn xuoh4cs`,children:[Math.round(e.size),`px`]})}),(0,S.jsx)(g,{direction:`horizontal`,hasDivider:!0,resizable:e.props})]}),content:(0,S.jsx)(a,{children:`Content`})})})}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sidebar = useResizable({
      defaultSize: 200,
      minSize: 100,
      maxSize: 500
    });
    return <div {...stylex.props(s.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={sidebar.size} hasDivider={false}>
                Sidebar
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={sidebar.props} />
            </>} content={<LayoutContent>Content</LayoutContent>} />
      </div>;
  }
}`,...T.parameters?.docs?.source},description:{story:`Two side-by-side panels with a divider handle.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const top = useResizable({
      defaultSize: 150,
      minSize: 60,
      maxSize: 250,
      direction: 'vertical'
    });
    return <div {...stylex.props(s.shell)}>
        <Layout height="fill" header={<>
              <LayoutPanel width="100%" padding={4}>
                <div style={{
            height: top.size
          }}>Header</div>
              </LayoutPanel>
              <ResizeHandle direction="vertical" hasDivider resizable={top.props} />
            </>} content={<LayoutContent>Content</LayoutContent>} />
      </div>;
  }
}`,...E.parameters?.docs?.source},description:{story:`Vertical layout — top and bottom panels.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const left = useResizable({
      defaultSize: 180,
      minSize: 120,
      maxSize: 300
    });
    const right = useResizable({
      defaultSize: 220,
      minSize: 150,
      maxSize: 400
    });
    return <div {...stylex.props(s.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={left.size} hasDivider={false}>
                Folders
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={left.props} />
            </>} content={<LayoutContent>Inbox</LayoutContent>} end={<>
              <ResizeHandle direction="horizontal" hasDivider isReversed resizable={right.props} />
              <LayoutPanel width={right.size} hasDivider={false}>
                Preview
              </LayoutPanel>
            </>} />
      </div>;
  }
}`,...D.parameters?.docs?.source},description:{story:`Three panels with two handles — mail client layout.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sidebar = useResizable({
      defaultSize: 200,
      minSize: 120,
      maxSize: 350
    });
    const editor = useResizable({
      defaultSize: 200,
      minSize: 80,
      maxSize: 250,
      direction: 'vertical'
    });
    return <div {...stylex.props(s.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={sidebar.size} hasDivider={false}>
                Explorer
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={sidebar.props} />
            </>} content={<LayoutContent padding={0}>
              <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
                <div style={{
            height: editor.size,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                  Editor
                </div>
                <ResizeHandle direction="vertical" hasDivider resizable={editor.props} />
                <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                  Terminal
                </div>
              </div>
            </LayoutContent>} />
      </div>;
  }
}`,...O.parameters?.docs?.source},description:{story:`Nested — horizontal split with a vertical split inside.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sidebar = useResizable({
      defaultSize: 250,
      minSize: 100,
      maxSize: 500
    });
    return <div {...stylex.props(s.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={sidebar.size} hasDivider={false}>
                Sidebar
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={sidebar.props} />
            </>} content={<LayoutContent>Content</LayoutContent>} />
      </div>;
  }
}`,...k.parameters?.docs?.source},description:{story:`Always-visible pill grip with divider line.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sidebar = useResizable({
      defaultSize: 200,
      minSize: 120,
      maxSize: 350
    });
    const editor = useResizable({
      defaultSize: 200,
      minSize: 80,
      maxSize: 250,
      direction: 'vertical'
    });
    return <div {...stylex.props(s.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={sidebar.size} hasDivider={false} xstyle={s.muted}>
                Explorer
              </LayoutPanel>
              <ResizeHandle direction="horizontal" resizable={sidebar.props} />
            </>} content={<LayoutContent padding={0}>
              <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
                <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                  Editor
                </div>
                <ResizeHandle direction="vertical" resizable={editor.props} />
                <div {...stylex.props(s.card)} style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                  Terminal
                </div>
              </div>
            </LayoutContent>} />
      </div>;
  }
}`,...A.parameters?.docs?.source},description:{story:`Mixed container styles — no divider lines, relying on background contrast.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const region = useResizable({
      defaultSize: '40%',
      minSize: '15%',
      maxSize: '60%',
      containerRef: frameRef
    });
    return <div ref={frameRef} {...stylex.props(s.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={region.size} hasDivider={false}>
                <div {...stylex.props(s.card)}>{Math.round(region.size)}px</div>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={region.props} />
            </>} content={<LayoutContent>Content</LayoutContent>} />
      </div>;
  }
}`,...j.parameters?.docs?.source},description:{story:`Percentage configuration, resolved against a container.

\`containerRef\` marks what a percentage is a share of. The panel starts at 40%
of the frame's content box and cannot be dragged past 60% of it. Narrow the
frame and the BOUNDS follow — but the size you dragged to stays the pixel
size you chose, clamped rather than rescaled. That is the whole contract:
percentages configure pixels, they do not create a responsive mode.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <StructuredPercentSizingStory />
}`,...M.parameters?.docs?.source},description:{story:"Structured percentages support one explicit pixel floor or ceiling.\n\n`defaultSize: percent(40, {min: pixel(333)})` is an initial choice only. The same\nvalue on `minSize` remains a live floor, while `percent(10, {max: pixel(400)})` on\n`maxSize` remains a live ceiling. Numbers and exact `Npx` remain pixels; state,\nstorage, callbacks, panel geometry, and ARIA all use resolved pixel values.",...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const region = useResizable({
      defaultSize: '25%',
      minSize: 80
    });
    return <div {...stylex.props(s.shell)} data-testid="viewport-pct">
        <Layout height="fill" start={<>
              <LayoutPanel width={region.size} hasDivider={false}>
                <div {...stylex.props(s.card)}>{Math.round(region.size)}px</div>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={region.props} />
            </>} content={<LayoutContent>Content</LayoutContent>} />
      </div>;
  }
}`,...N.parameters?.docs?.source},description:{story:"The compatibility path: a percentage with no `containerRef`.\n\nThis is what shipped before percentages could name a container, and it is\nunchanged — `'25%'` resolves once against `window.innerWidth` (1200px on the\nserver), then behaves as pixels. Resize the window and the panel stays where\nit is; only a percentage BOUND would follow.",...N.parameters?.docs?.description}}},P=[`Horizontal`,`Vertical`,`ThreePanel`,`Nested`,`AlwaysVisible`,`MixedContainers`,`PercentageSizing`,`StructuredPercentSizing`,`ViewportPercentage`]})))()}F();export{k as AlwaysVisible,T as Horizontal,A as MixedContainers,O as Nested,j as PercentageSizing,M as StructuredPercentSizing,D as ThreePanel,E as Vertical,N as ViewportPercentage,P as __namedExportsOrder,w as default};