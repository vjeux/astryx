import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{i,n as a,r as o,t as s}from"./LayoutContent-BEmJ3Yl2.js";import{t as c}from"./jsx-runtime-MKhVqBIO.js";import{i as l,s as u}from"./useResizable-MO9DK77O.js";import{n as ee,t as d}from"./LayoutPanel-BWGJdNoy.js";import{n as f,t as p}from"./Text-C5BHw0wv.js";import{n as te,t as m}from"./Button-DoGM0DEN.js";import{n as h,t as g}from"./Heading-YiIeUtHm.js";import{n as ne,t as re}from"./Divider-DkevuVb8.js";import{n as ie,t as _}from"./Stack-C-3OCHCS.js";import{n as ae,t as v}from"./ResizeHandle-8uhoaggA.js";import{i as oe,n as se,r as ce,t as y}from"./SideNavItem-BqWR4_4N.js";function b({testId:e,minutes:t,initialTop:r,pillPlacement:i,position:a}){let o=u({defaultSize:t/60*B,minSize:B/8,direction:`vertical`}),[s,c]=(0,T.useState)(r),l=(0,T.useRef)(null);return(0,E.jsxs)(`div`,{"data-testid":e,"data-top":s,...n(z.event(s,o.size)),children:[(0,E.jsx)(`div`,{"data-testid":`${e}-body`,className:`x1iyjqo2 x2lwn1j xv5twrn x5ve5x3`,onPointerDown:e=>{l.current={y:e.clientY,top:s},e.currentTarget.setPointerCapture(e.pointerId)},onPointerMove:e=>{let t=l.current;t!=null&&c(t.top+e.clientY-t.y)},onPointerUp:()=>{l.current=null},children:(0,E.jsxs)(p,{type:`supporting`,children:[t,` min`]})}),(0,E.jsx)(v,{direction:`vertical`,position:a,pillPlacement:i,resizable:o,label:`Resize the ${t}-minute event`})]})}function x({pillPlacement:e,position:t}){return(0,E.jsxs)(`div`,{className:`x1n2onr6 xafpxmx xb2rc7v xmkeg23 x1y0btm7 x14i3s5s x1hviunn`,children:[(0,E.jsx)(b,{testId:`thirty`,minutes:30,initialTop:24,pillPlacement:e,position:t}),(0,E.jsx)(b,{testId:`fifteen`,minutes:15,initialTop:120,pillPlacement:e,position:t})]})}function le({pillPlacement:e,dir:t}){let n=u({defaultSize:250,minSize:150,maxSize:500});return(0,E.jsx)(`div`,{dir:t,className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:n.size,hasDivider:!1,children:(0,E.jsxs)(p,{children:[n.size,`px`]})}),(0,E.jsx)(v,{direction:`horizontal`,position:`overlay`,pillPlacement:e,isAlwaysVisible:!1,resizable:n,label:`Resize sidebar`})]}),content:(0,E.jsx)(s,{children:(0,E.jsx)(g,{level:4,children:`Content`})})})})}function ue(){let e=u({defaultSize:200,collapsible:!0,defaultIsCollapsed:!0});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(d,{resizable:e.props,hasDivider:!1,"data-testid":`collapsed-start`,children:[(0,E.jsx)(g,{level:4,children:`Panel`}),(0,E.jsx)(p,{children:`Collapsed with its region.`})]}),(0,E.jsx)(v,{resizable:e.props,label:`Resize panel`})]}),content:(0,E.jsx)(s,{"data-testid":`collapsed-content`,children:(0,E.jsx)(p,{children:`The content starts at the handle.`})}),end:(0,E.jsx)(d,{width:0,hasDivider:!0,"data-testid":`collapsed-end`,children:(0,E.jsx)(g,{level:4,children:`Details`})})})})}function S(){let[e,t]=(0,T.useState)(!0);return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,content:(0,E.jsx)(s,{children:(0,E.jsx)(m,{label:e?`Collapse details`:`Open details`,onClick:()=>t(e=>!e)})}),end:(0,E.jsx)(d,{width:e?240:0,hasDivider:!0,"data-testid":`collapsing-end`,children:Array.from({length:40},(e,t)=>(0,E.jsx)(m,{label:`Detail line ${t+1}`},t))})})})}function C({side:e,lineCount:t=0,minSize:n=120}){let r=u({defaultSize:200,minSize:n,maxSize:320,collapsible:!0}),i=(0,E.jsx)(d,{resizable:r,"data-testid":`sliding-panel`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Panel`}),(0,E.jsx)(m,{label:`Close panel`,onClick:r.collapse}),Array.from({length:t},(e,t)=>(0,E.jsxs)(p,{children:[`Line `,t+1]},t))]})}),a=(0,E.jsx)(v,{resizable:r,isReversed:e===`end`,hasDivider:!0,label:`Resize panel`});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:e===`start`?(0,E.jsxs)(E.Fragment,{children:[i,a]}):void 0,content:(0,E.jsx)(s,{"data-testid":`sliding-content`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(p,{children:`The content glides with the panel's edge.`}),(0,E.jsx)(m,{label:`Open panel`,onClick:r.expand}),(0,E.jsx)(m,{label:`Toggle panel`,onClick:r.isCollapsed?r.expand:r.collapse})]})}),end:e===`end`?(0,E.jsxs)(E.Fragment,{children:[a,i]}):void 0})})}function de(){let[e,t]=(0,T.useState)(!1),n=u({defaultSize:200,minSize:120,maxSize:320,collapsible:!0,isCollapsed:e,onCollapseChange:t});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{resizable:n,"data-testid":`sliding-panel`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Panel`}),(0,E.jsx)(m,{label:`Close panel`,onClick:n.collapse})]})}),(0,E.jsx)(v,{resizable:n,hasDivider:!0,label:`Resize panel`})]}),content:(0,E.jsx)(s,{"data-testid":`sliding-content`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(p,{children:`The parent owns whether the panel is collapsed.`}),(0,E.jsx)(m,{label:`Toggle panel`,onClick:()=>{t(!e)}})]})})})})}function w({isHandBuilt:e}){let t=u({defaultSize:200,minSize:120,maxSize:320,collapsible:!0}),n=e?{...t.props}:t.props;return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{resizable:n,"data-testid":`sliding-panel`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Panel`}),(0,E.jsx)(m,{label:`Close panel`,onClick:t.collapse})]})}),(0,E.jsx)(v,{resizable:t,hasDivider:!0,label:`Resize panel`})]}),content:(0,E.jsx)(s,{"data-testid":`sliding-content`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(p,{children:`The content glides with the panel's edge.`}),(0,E.jsx)(m,{label:`Open panel`,onClick:t.expand})]})})})})}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{T=t(),r(),ae(),l(),f(),h(),i(),a(),ee(),ie(),oe(),se(),ne(),te(),E=c(),D={title:`Core/Resizable`,component:v,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Hook-based resizable panel system. useResizable() manages size state; ResizeHandle provides the interactive pill-grip separator with optional divider line.`}}}},O={render:()=>{let e=u({defaultSize:250,minSize:150,maxSize:500});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Sidebar`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})}),(0,E.jsx)(p,{children:`Drag the handle to resize. Arrow keys when focused.`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize sidebar`})]}),content:(0,E.jsx)(s,{children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Content`}),(0,E.jsx)(p,{children:`Main content area fills remaining space.`})]})})})})}},k={render:()=>{let e=u({defaultSize:250,minSize:100,maxSize:350,direction:`vertical`});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,header:(0,E.jsxs)(`div`,{style:{height:e.size},children:[(0,E.jsx)(d,{padding:4,width:`100%`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Editor`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})})]})}),(0,E.jsx)(v,{direction:`vertical`,hasDivider:!0,resizable:e,label:`Resize editor`})]}),content:(0,E.jsx)(s,{children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Terminal`}),(0,E.jsx)(p,{children:`Bottom panel fills remaining space.`})]})})})})}},A={render:()=>{let e=u({defaultSize:260,minSize:180,collapsible:!0,collapsedSize:60});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[!e.isCollapsed&&(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Sidebar`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})}),(0,E.jsx)(p,{children:`Double-click handle or press Enter to collapse.`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize sidebar`})]}),content:(0,E.jsx)(s,{children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Content`}),(0,E.jsxs)(p,{children:[`Sidebar is `,e.isCollapsed?`collapsed`:`expanded`,`.`,e.isCollapsed&&(0,E.jsx)(`button`,{onClick:()=>e.expand(),style:{marginLeft:8},children:`Expand`})]})]})})})})}},j={render:()=>{let e=u({defaultSize:220,minSize:150,maxSize:400}),t=u({defaultSize:280,minSize:100,maxSize:350,direction:`vertical`});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Explorer`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize explorer`})]}),content:(0,E.jsx)(s,{padding:0,children:(0,E.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`},children:[(0,E.jsx)(`div`,{style:{flex:`none`,height:t.size,padding:16},children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Editor`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[t.size,`px`]})})]})}),(0,E.jsx)(v,{direction:`vertical`,hasDivider:!0,resizable:t,label:`Resize editor`}),(0,E.jsx)(`div`,{style:{flex:1,padding:16},children:(0,E.jsx)(g,{level:4,children:`Terminal`})})]})})})})}},M={render:()=>{let e=u({defaultSize:260,minSize:56,maxSize:600,snaps:[56,160,260,400]}),t=e.size<=60;return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:t?(0,E.jsx)(p,{children:`☰`}):(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Sidebar`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})}),(0,E.jsx)(p,{children:`Snaps to 56 \\u00b7 160 \\u00b7 260 \\u00b7 400px.`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize sidebar`})]}),content:(0,E.jsx)(s,{children:(0,E.jsx)(g,{level:4,children:`Content`})})})})}},N={render:()=>{let e=u({defaultSize:250,minSize:150,maxSize:500});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Sidebar`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})}),(0,E.jsx)(p,{children:`Pill only appears on hover.`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,isAlwaysVisible:!1,resizable:e,label:`Resize sidebar`})]}),content:(0,E.jsx)(s,{children:(0,E.jsx)(g,{level:4,children:`Content`})})})})}},P={render:()=>{let e=u({defaultSize:250,minSize:150});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:(0,E.jsx)(g,{level:4,children:`Sidebar (locked)`})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,isDisabled:!0,label:`Locked`})]}),content:(0,E.jsx)(s,{children:(0,E.jsx)(g,{level:4,children:`Content`})})})})}},F={render:()=>{let e=u({defaultSize:260,minSize:180,maxSize:450,collapsible:!0,collapsedSize:50});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,style:{height:500},children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[!e.isCollapsed&&(0,E.jsx)(d,{resizable:e,hasDivider:!1,role:`navigation`,label:`Sidebar`,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Navigation`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})}),(0,E.jsx)(re,{}),(0,E.jsx)(p,{children:`Drag the handle to resize.`}),(0,E.jsx)(p,{children:`Double-click or press Enter to collapse.`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize navigation`})]}),content:(0,E.jsx)(s,{children:(0,E.jsxs)(_,{gap:3,children:[(0,E.jsx)(g,{level:3,children:`Main Content`}),(0,E.jsx)(p,{children:`LayoutPanel with resizable prop + ResizeHandle with hasDivider.`}),(0,E.jsxs)(p,{children:[`Sidebar is`,` `,(0,E.jsx)(`strong`,{children:e.isCollapsed?`collapsed`:`expanded`}),e.isCollapsed&&(0,E.jsx)(`button`,{onClick:()=>e.expand(),style:{marginLeft:8},children:`Expand`})]})]})})})})}},I={render:()=>{let e=u({defaultSize:260,minSize:200,maxSize:400,collapsible:!0,collapsedSize:50,snaps:[56,260]});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,style:{height:500},children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[!e.isCollapsed&&(0,E.jsx)(d,{width:e.size,hasDivider:!1,padding:0,children:(0,E.jsxs)(ce,{children:[(0,E.jsx)(y,{label:`Home`,isSelected:!0}),(0,E.jsx)(y,{label:`Dashboard`}),(0,E.jsx)(y,{label:`Settings`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize navigation`})]}),content:(0,E.jsx)(s,{children:(0,E.jsxs)(_,{gap:3,children:[(0,E.jsx)(g,{level:3,children:`Dashboard`}),(0,E.jsxs)(p,{children:[(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]}),` — `,e.isCollapsed?`Collapsed`:`Expanded`]}),(0,E.jsx)(p,{children:`SideNav width driven by useResizable. Double-click handle to collapse.`})]})})})})}},L={render:()=>{let e=u({defaultSize:200,minSize:120,maxSize:520});return(0,E.jsx)(`div`,{className:`x16nrsnc xh8yej3 xmkeg23 x1y0btm7 x14i3s5s x1hviunn xb3r6kr`,children:(0,E.jsx)(o,{height:`fill`,start:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{width:e.size,hasDivider:!1,children:(0,E.jsxs)(_,{gap:2,children:[(0,E.jsx)(g,{level:4,children:`Sidebar`}),(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`x197sbye xfifm61 x1ey7xld`,children:[e.size,`px`]})}),(0,E.jsx)(p,{children:`Drag right, across the preview, and back.`})]})}),(0,E.jsx)(v,{direction:`horizontal`,hasDivider:!0,resizable:e,label:`Resize sidebar`})]}),content:(0,E.jsx)(s,{padding:0,children:(0,E.jsx)(`iframe`,{title:`Preview`,srcDoc:`<!doctype html><body style='margin:0;font:14px system-ui;display:grid;place-items:center;height:100vh;background:#eef'>Embedded preview</body>`,style:{width:`100%`,height:`100%`,border:0}})})})})}},R={kVAEAm:`x10l6tqk`,kLqNvP:`xrotz4w`,kt4wiu:`x11dcrhx`,kbCHJM:``,kCIrl2:``,k1xSpc:`x78zum5`,kXwgrk:`xdt5ytf`,kVQacm:`x1rea2x4`,kXHlph:``,kORKVm:``,kaIpWk:`xh6dtrn`,krdFHd:``,kfmiAY:``,kVL7Gh:``,kT0f0o:``,kIxVMA:``,ksF3WI:``,kqGeR4:``,kYm2EN:``,kWkggS:`xwmxj5m`,$$css:!0},z={event:(e,t)=>[R,{k87sOh:e==null?e:`xjbys53`,kZKoxP:t==null?t:`x16ye13r`,$$css:!0},{"--x-top":(e=>typeof e==`number`?e+`px`:e??void 0)(e),"--x-height":(e=>typeof e==`number`?e+`px`:e??void 0)(t)}]},B=48,V={tags:[`!autodocs`,`no-visual`],args:{pillPlacement:`auto`,position:`inline`},render:e=>(0,E.jsx)(x,{...e})},H={tags:[`!autodocs`,`no-visual`],args:{pillPlacement:`start`,dir:`ltr`},render:e=>(0,E.jsx)(le,{...e})},U={tags:[`!autodocs`,`no-visual`],render:()=>(0,E.jsx)(ue,{})},W={tags:[`!autodocs`,`no-visual`],render:()=>(0,E.jsx)(S,{})},G={render:()=>(0,E.jsx)(C,{side:`start`})},K={render:()=>(0,E.jsx)(C,{side:`end`})},q={tags:[`!autodocs`,`no-visual`],render:()=>(0,E.jsx)(C,{side:`start`,lineCount:40})},J={tags:[`!autodocs`,`no-visual`],render:()=>(0,E.jsx)(C,{side:`start`,minSize:50})},Y={render:()=>(0,E.jsx)(de,{})},X={tags:[`!autodocs`,`no-visual`],render:()=>(0,E.jsx)(w,{isHandBuilt:!1})},Z={tags:[`!autodocs`,`no-visual`],render:()=>(0,E.jsx)(w,{isHandBuilt:!0})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 250,
      minSize: 150,
      maxSize: 500
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={resizable.size} hasDivider={false}>
                <Stack gap={2}>
                  <Heading level={4}>Sidebar</Heading>
                  <Text>
                    <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                  </Text>
                  <Text>
                    Drag the handle to resize. Arrow keys when focused.
                  </Text>
                </Stack>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} label="Resize sidebar" />
            </>} content={<LayoutContent>
              <Stack gap={2}>
                <Heading level={4}>Content</Heading>
                <Text>Main content area fills remaining space.</Text>
              </Stack>
            </LayoutContent>} />
      </div>;
  }
}`,...O.parameters?.docs?.source},description:{story:`Basic horizontal split with divider line.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 250,
      minSize: 100,
      maxSize: 350,
      direction: 'vertical'
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" header={<div style={{
        height: resizable.size
      }}>
              <LayoutPanel padding={4} width="100%">
                <Stack gap={2}>
                  <Heading level={4}>Editor</Heading>
                  <Text>
                    <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                  </Text>
                </Stack>
              </LayoutPanel>
              <ResizeHandle direction="vertical" hasDivider resizable={resizable} label="Resize editor" />
            </div>} content={<LayoutContent>
              <Stack gap={2}>
                <Heading level={4}>Terminal</Heading>
                <Text>Bottom panel fills remaining space.</Text>
              </Stack>
            </LayoutContent>} />
      </div>;
  }
}`,...k.parameters?.docs?.source},description:{story:`Vertical split with divider line.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 260,
      minSize: 180,
      collapsible: true,
      collapsedSize: 60
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              {!resizable.isCollapsed && <LayoutPanel width={resizable.size} hasDivider={false}>
                  <Stack gap={2}>
                    <Heading level={4}>Sidebar</Heading>
                    <Text>
                      <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                    </Text>
                    <Text>Double-click handle or press Enter to collapse.</Text>
                  </Stack>
                </LayoutPanel>}
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} label="Resize sidebar" />
            </>} content={<LayoutContent>
              <Stack gap={2}>
                <Heading level={4}>Content</Heading>
                <Text>
                  Sidebar is {resizable.isCollapsed ? 'collapsed' : 'expanded'}.
                  {resizable.isCollapsed && <button onClick={() => resizable.expand()} style={{
              marginLeft: 8
            }}>
                      Expand
                    </button>}
                </Text>
              </Stack>
            </LayoutContent>} />
      </div>;
  }
}`,...A.parameters?.docs?.source},description:{story:`Collapsible sidebar: a lift or a key step past the threshold, or a double-click, collapses it.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const explorer = useResizable({
      defaultSize: 220,
      minSize: 150,
      maxSize: 400
    });
    const editor = useResizable({
      defaultSize: 280,
      minSize: 100,
      maxSize: 350,
      direction: 'vertical'
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={explorer.size} hasDivider={false}>
                <Stack gap={2}>
                  <Heading level={4}>Explorer</Heading>
                  <Text>
                    <span {...stylex.props(ps.sz)}>{explorer.size}px</span>
                  </Text>
                </Stack>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={explorer} label="Resize explorer" />
            </>} content={<LayoutContent padding={0}>
              <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
                <div style={{
            flex: 'none',
            height: editor.size,
            padding: 16
          }}>
                  <Stack gap={2}>
                    <Heading level={4}>Editor</Heading>
                    <Text>
                      <span {...stylex.props(ps.sz)}>{editor.size}px</span>
                    </Text>
                  </Stack>
                </div>
                <ResizeHandle direction="vertical" hasDivider resizable={editor} label="Resize editor" />
                <div style={{
            flex: 1,
            padding: 16
          }}>
                  <Heading level={4}>Terminal</Heading>
                </div>
              </div>
            </LayoutContent>} />
      </div>;
  }
}`,...j.parameters?.docs?.source},description:{story:`Three-panel IDE layout with nested horizontal + vertical splits.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 260,
      minSize: 56,
      maxSize: 600,
      snaps: [56, 160, 260, 400]
    });
    const isRail = resizable.size <= 60;
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={resizable.size} hasDivider={false}>
                {isRail ? <Text>{'\\u2630'}</Text> : <Stack gap={2}>
                    <Heading level={4}>Sidebar</Heading>
                    <Text>
                      <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                    </Text>
                    <Text>Snaps to 56 \\u00b7 160 \\u00b7 260 \\u00b7 400px.</Text>
                  </Stack>}
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} label="Resize sidebar" />
            </>} content={<LayoutContent>
              <Heading level={4}>Content</Heading>
            </LayoutContent>} />
      </div>;
  }
}`,...M.parameters?.docs?.source},description:{story:`Snap points — sidebar snaps to predefined widths.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 250,
      minSize: 150,
      maxSize: 500
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={resizable.size} hasDivider={false}>
                <Stack gap={2}>
                  <Heading level={4}>Sidebar</Heading>
                  <Text>
                    <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                  </Text>
                  <Text>Pill only appears on hover.</Text>
                </Stack>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider isAlwaysVisible={false} resizable={resizable} label="Resize sidebar" />
            </>} content={<LayoutContent>
              <Heading level={4}>Content</Heading>
            </LayoutContent>} />
      </div>;
  }
}`,...N.parameters?.docs?.source},description:{story:`Pill hidden at rest — only appears on hover/focus.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 250,
      minSize: 150
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={resizable.size} hasDivider={false}>
                <Heading level={4}>Sidebar (locked)</Heading>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} isDisabled label="Locked" />
            </>} content={<LayoutContent>
              <Heading level={4}>Content</Heading>
            </LayoutContent>} />
      </div>;
  }
}`,...P.parameters?.docs?.source},description:{story:`Disabled handle — divider visible but non-interactive.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 260,
      minSize: 180,
      maxSize: 450,
      collapsible: true,
      collapsedSize: 50
    });
    return <div {...stylex.props(ps.shell)} style={{
      height: 500
    }}>
        <Layout height="fill" start={<>
              {!resizable.isCollapsed && <LayoutPanel resizable={resizable} hasDivider={false} role="navigation" label="Sidebar">
                  <Stack gap={2}>
                    <Heading level={4}>Navigation</Heading>
                    <Text>
                      <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                    </Text>
                    <Divider />
                    <Text>Drag the handle to resize.</Text>
                    <Text>Double-click or press Enter to collapse.</Text>
                  </Stack>
                </LayoutPanel>}
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} label="Resize navigation" />
            </>} content={<LayoutContent>
              <Stack gap={3}>
                <Heading level={3}>Main Content</Heading>
                <Text>
                  LayoutPanel with resizable prop + ResizeHandle with
                  hasDivider.
                </Text>
                <Text>
                  Sidebar is{' '}
                  <strong>
                    {resizable.isCollapsed ? 'collapsed' : 'expanded'}
                  </strong>
                  {resizable.isCollapsed && <button onClick={() => resizable.expand()} style={{
              marginLeft: 8
            }}>
                      Expand
                    </button>}
                </Text>
              </Stack>
            </LayoutContent>} />
      </div>;
  }
}`,...F.parameters?.docs?.source},description:{story:`Integration with Layout — resizable sidebar with collapsible.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 260,
      minSize: 200,
      maxSize: 400,
      collapsible: true,
      collapsedSize: 50,
      snaps: [56, 260]
    });
    return <div {...stylex.props(ps.shell)} style={{
      height: 500
    }}>
        <Layout height="fill" start={<>
              {!resizable.isCollapsed && <LayoutPanel width={resizable.size} hasDivider={false} padding={0}>
                  <SideNav>
                    <SideNavItem label="Home" isSelected />
                    <SideNavItem label="Dashboard" />
                    <SideNavItem label="Settings" />
                  </SideNav>
                </LayoutPanel>}
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} label="Resize navigation" />
            </>} content={<LayoutContent>
              <Stack gap={3}>
                <Heading level={3}>Dashboard</Heading>
                <Text>
                  <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                  {' \\u2014 '}
                  {resizable.isCollapsed ? 'Collapsed' : 'Expanded'}
                </Text>
                <Text>
                  SideNav width driven by useResizable. Double-click handle to
                  collapse.
                </Text>
              </Stack>
            </LayoutContent>} />
      </div>;
  }
}`,...I.parameters?.docs?.source},description:{story:`AppShell with resizable SideNav.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const resizable = useResizable({
      defaultSize: 200,
      minSize: 120,
      maxSize: 520
    });
    return <div {...stylex.props(ps.shell)}>
        <Layout height="fill" start={<>
              <LayoutPanel width={resizable.size} hasDivider={false}>
                <Stack gap={2}>
                  <Heading level={4}>Sidebar</Heading>
                  <Text>
                    <span {...stylex.props(ps.sz)}>{resizable.size}px</span>
                  </Text>
                  <Text>Drag right, across the preview, and back.</Text>
                </Stack>
              </LayoutPanel>
              <ResizeHandle direction="horizontal" hasDivider resizable={resizable} label="Resize sidebar" />
            </>} content={<LayoutContent padding={0}>
              <iframe title="Preview" srcDoc="<!doctype html><body style='margin:0;font:14px system-ui;display:grid;place-items:center;height:100vh;background:#eef'>Embedded preview</body>" style={{
          width: '100%',
          height: '100%',
          border: 0
        }} />
            </LayoutContent>} />
      </div>;
  }
}`,...L.parameters?.docs?.source},description:{story:`Panel whose content is an embedded frame. The drag must survive the cursor
crossing the frame: pointer events over a frame are dispatched into the
guest document, so a drag that stays armed only while the host keeps
receiving them dies mid-gesture here.`,...L.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  args: {
    pillPlacement: 'auto',
    position: 'inline'
  },
  render: args => <ShortItems {...args} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  args: {
    pillPlacement: 'start',
    dir: 'ltr'
  },
  render: args => <HoverPillOnOverlay {...args} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  render: () => <CollapsedPanels />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  render: () => <CollapsingScrollPanel />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <SlidingPanelSplit side="start" />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <SlidingPanelSplit side="end" />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  render: () => <SlidingPanelSplit side="start" lineCount={40} />
}`,...q.parameters?.docs?.source},description:{story:`A sliding start panel with more lines than fit, for a scrolled slide.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  render: () => <SlidingPanelSplit side="start" minSize={50} />
}`,...J.parameters?.docs?.source},description:{story:`A sliding start panel at the hook's default minimum (50 px), so a key step
from it ends under the collapsed size.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledSlidingPanel />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  render: () => <PropsPanelSplit isHandBuilt={false} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs', 'no-visual'],
  render: () => <PropsPanelSplit isHandBuilt />
}`,...Z.parameters?.docs?.source}}},Q=[`HorizontalSplit`,`VerticalSplit`,`Collapsible`,`ThreePanelIDE`,`SnapPoints`,`HiddenPill`,`Disabled`,`WithLayout`,`WithAppShell`,`WithEmbeddedFrame`,`GrabZoneOnShortItems`,`HoverPillOnOverlayHandle`,`CollapsedPanelFixture`,`CollapsingScrollPanelFixture`,`SlidingStartPanel`,`SlidingEndPanel`,`SlidingScrolledPanelFixture`,`SlidingPanelAtDefaultMinimumFixture`,`SlidingControlledPanel`,`SlidingPanelWithHookProps`,`PanelWithHandBuiltProps`]})))()}$();export{U as CollapsedPanelFixture,A as Collapsible,W as CollapsingScrollPanelFixture,P as Disabled,V as GrabZoneOnShortItems,N as HiddenPill,O as HorizontalSplit,H as HoverPillOnOverlayHandle,Z as PanelWithHandBuiltProps,Y as SlidingControlledPanel,K as SlidingEndPanel,J as SlidingPanelAtDefaultMinimumFixture,X as SlidingPanelWithHookProps,q as SlidingScrolledPanelFixture,G as SlidingStartPanel,M as SnapPoints,j as ThreePanelIDE,k as VerticalSplit,I as WithAppShell,L as WithEmbeddedFrame,F as WithLayout,Q as __namedExportsOrder,D as default};