import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Icon-BmO5FtDV.js";import{n as o,t as s}from"./Button-DoGM0DEN.js";import{n as c,t as l}from"./ButtonGroup-HzazL4TJ.js";import{n as ee,t as u}from"./IconButton-BONXg2Kw.js";import{n as d,t as f}from"./DropdownMenu-M0We7Ho-.js";import{n as p,t as m}from"./BoldIcon-BiwgGT8-.js";import{n as h,t as g}from"./ClipboardDocumentIcon-DRSo6Bdn.js";import{i as _,n as v,r as y,t as b}from"./ScissorsIcon-jj90jfH2.js";import{i as x,n as S,r as C,t as te}from"./UnderlineIcon-DZ-NwZz_.js";function ne({title:e,titleId:t,...n},r){return w.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?w.createElement(`title`,{id:t},e):null,w.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3`}))}var w,T;function E(){return(E=t((()=>{w=e(n()),T=w.forwardRef(ne)})))()}function D({title:e,titleId:t,...n},r){return O.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?O.createElement(`title`,{id:t},e):null,O.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3`}))}var O,k;function A(){return(A=t((()=>{O=e(n()),k=O.forwardRef(D)})))()}function j({title:e,titleId:t,...n},r){return M.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?M.createElement(`title`,{id:t},e):null,M.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`m19.5 8.25-7.5 7.5-7.5-7.5`}))}var M,N;function P(){return(P=t((()=>{M=e(n()),N=M.forwardRef(j)})))()}var F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{F=n(),c(),o(),ee(),i(),d(),h(),v(),_(),E(),A(),p(),x(),S(),P(),I=r(),L={title:`Core/ButtonGroup`,component:l,tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},elevation:{control:`inline-radio`,options:[`none`,`low`,`med`,`high`]}}},R={width:16,height:16},z={render:()=>(0,I.jsxs)(l,{label:`Clipboard actions`,children:[(0,I.jsx)(s,{label:`Copy`,icon:(0,I.jsx)(g,{style:R})}),(0,I.jsx)(s,{label:`Cut`,icon:(0,I.jsx)(b,{style:R})}),(0,I.jsx)(s,{label:`Paste`,icon:(0,I.jsx)(y,{style:R})})]})},B={render:function(){let[e,t]=(0,F.useState)([]),n=e=>()=>t(t=>[...t,e]);return(0,I.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,I.jsxs)(l,{label:`Edit actions`,size:`sm`,children:[(0,I.jsx)(s,{label:`Cut`,onClick:n(`Cut`)}),(0,I.jsx)(s,{label:`Copy`,onClick:n(`Copy`)}),(0,I.jsx)(s,{label:`Paste`,onClick:n(`Paste`)})]}),(0,I.jsx)(`output`,{"data-testid":`slide-log`,children:e.length===0?`Nothing pressed`:`Pressed: ${e.join(`, `)}`})]})}},V={render:()=>(0,I.jsxs)(l,{label:`Actions`,orientation:`vertical`,children:[(0,I.jsx)(s,{label:`Copy`}),(0,I.jsx)(s,{label:`Cut`}),(0,I.jsx)(s,{label:`Paste`})]})},H={render:()=>(0,I.jsxs)(l,{label:`Text formatting`,children:[(0,I.jsx)(u,{label:`Bold`,icon:(0,I.jsx)(a,{icon:m,size:`sm`})}),(0,I.jsx)(u,{label:`Italic`,icon:(0,I.jsx)(a,{icon:C,size:`sm`})}),(0,I.jsx)(u,{label:`Underline`,icon:(0,I.jsx)(a,{icon:te,size:`sm`}),tooltip:`Underline`})]})},U={render:()=>(0,I.jsxs)(l,{label:`History`,children:[(0,I.jsx)(s,{label:`Undo`,variant:`ghost`,icon:(0,I.jsx)(T,{style:R}),isIconOnly:!0}),(0,I.jsx)(s,{label:`Redo`,variant:`ghost`,icon:(0,I.jsx)(k,{style:R}),isIconOnly:!0})]})},W={render:()=>(0,I.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,I.jsxs)(l,{label:`Small actions`,size:`sm`,children:[(0,I.jsx)(s,{label:`Copy`}),(0,I.jsx)(s,{label:`Paste`})]}),(0,I.jsxs)(l,{label:`Medium actions`,size:`md`,children:[(0,I.jsx)(s,{label:`Copy`}),(0,I.jsx)(s,{label:`Paste`})]}),(0,I.jsxs)(l,{label:`Large actions`,size:`lg`,children:[(0,I.jsx)(s,{label:`Copy`}),(0,I.jsx)(s,{label:`Paste`})]})]})},G={render:()=>(0,I.jsxs)(l,{label:`Save options`,children:[(0,I.jsx)(s,{label:`Save`,variant:`primary`}),(0,I.jsx)(s,{label:`Save options`,variant:`primary`,icon:(0,I.jsx)(N,{style:R}),isIconOnly:!0})]})},K={render:()=>(0,I.jsxs)(l,{label:`Merge options`,children:[(0,I.jsx)(s,{label:`Merge pull request`,variant:`primary`}),(0,I.jsx)(s,{label:`More merge options`,variant:`primary`,icon:(0,I.jsx)(N,{style:R}),isIconOnly:!0})]})},q={render:()=>(0,I.jsxs)(l,{label:`Edit actions`,children:[(0,I.jsx)(s,{label:`Edit`}),(0,I.jsx)(u,{label:`More options`,icon:(0,I.jsx)(N,{style:R})})]})},J={render:()=>(0,I.jsxs)(l,{label:`Approve action`,children:[(0,I.jsx)(s,{label:`Allow once`,variant:`primary`}),(0,I.jsx)(f,{hasChevron:!1,button:{label:`Allow options`,variant:`primary`,isIconOnly:!0,icon:(0,I.jsx)(a,{icon:`chevronDown`})},items:[{label:`Allow for 30 minutes`},{label:`Always allow`}]})]})},Y={render:()=>(0,I.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,I.jsxs)(l,{label:`Clipboard actions`,isDisabled:!0,children:[(0,I.jsx)(s,{label:`Copy`}),(0,I.jsx)(s,{label:`Cut`}),(0,I.jsx)(s,{label:`Paste`})]}),(0,I.jsxs)(l,{label:`History`,children:[(0,I.jsx)(s,{label:`Undo`}),(0,I.jsx)(s,{label:`Redo`,isDisabled:!0})]})]})},X={render:()=>(0,I.jsx)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[`none`,`low`,`med`,`high`].map(e=>(0,I.jsxs)(l,{label:e,elevation:e,children:[(0,I.jsx)(s,{label:`Copy`}),(0,I.jsx)(s,{label:`Paste`})]},e))})},Z={render:()=>(0,I.jsx)(`div`,{style:{width:280},children:(0,I.jsxs)(l,{label:`Review actions`,children:[(0,I.jsx)(s,{label:`Approve and merge immediately`}),(0,I.jsx)(s,{label:`Request changes`})]})})},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Clipboard actions">
      <Button label="Copy" icon={<ClipboardDocumentIcon style={iconSize} />} />
      <Button label="Cut" icon={<ScissorsIcon style={iconSize} />} />
      <Button label="Paste" icon={<ClipboardIcon style={iconSize} />} />
    </ButtonGroup>
}`,...z.parameters?.docs?.source},description:{story:`Basic horizontal button group with text buttons.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: function SlideAcrossStory() {
    const [log, setLog] = useState<ReadonlyArray<string>>([]);
    const press = (label: string) => () => setLog(previous => [...previous, label]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
        <ButtonGroup label="Edit actions" size="sm">
          <Button label="Cut" onClick={press('Cut')} />
          <Button label="Copy" onClick={press('Copy')} />
          <Button label="Paste" onClick={press('Paste')} />
        </ButtonGroup>
        <output data-testid="slide-log">
          {log.length === 0 ? 'Nothing pressed' : \`Pressed: \${log.join(', ')}\`}
        </output>
      </div>;
  }
}`,...B.parameters?.docs?.source},description:{story:`Under the touch presentation a press tracks like a menu. Press a button and
slide across the others: the highlight follows, and the button you lift on
runs. A lift outside the group runs nothing. A mouse press acts as a native
button's. With a finger, each small button's target grows toward 44 px, up
to half the gap to a neighbour.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Actions" orientation="vertical">
      <Button label="Copy" />
      <Button label="Cut" />
      <Button label="Paste" />
    </ButtonGroup>
}`,...V.parameters?.docs?.source},description:{story:`Vertical button group.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Text formatting">
      <IconButton label="Bold" icon={<Icon icon={BoldIcon} size="sm" />} />
      <IconButton label="Italic" icon={<Icon icon={ItalicIcon} size="sm" />} />
      <IconButton label="Underline" icon={<Icon icon={UnderlineIcon} size="sm" />} tooltip="Underline" />
    </ButtonGroup>
}`,...H.parameters?.docs?.source},description:{story:`Icon-only button group for compact toolbars.

The trailing button carries a tooltip, which renders an invisible layer after
it in the DOM — its outer corners must still round (#2508).`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="History">
      <Button label="Undo" variant="ghost" icon={<ArrowUturnLeftIcon style={iconSize} />} isIconOnly />
      <Button label="Redo" variant="ghost" icon={<ArrowUturnRightIcon style={iconSize} />} isIconOnly />
    </ButtonGroup>
}`,...U.parameters?.docs?.source},description:{story:`Undo/redo pair with ghost variant.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <ButtonGroup label="Small actions" size="sm">
        <Button label="Copy" />
        <Button label="Paste" />
      </ButtonGroup>
      <ButtonGroup label="Medium actions" size="md">
        <Button label="Copy" />
        <Button label="Paste" />
      </ButtonGroup>
      <ButtonGroup label="Large actions" size="lg">
        <Button label="Copy" />
        <Button label="Paste" />
      </ButtonGroup>
    </div>
}`,...W.parameters?.docs?.source},description:{story:`All three sizes side by side.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Save options">
      <Button label="Save" variant="primary" />
      <Button label="Save options" variant="primary" icon={<ChevronDownIcon style={iconSize} />} isIconOnly />
    </ButtonGroup>
}`,...G.parameters?.docs?.source},description:{story:`Primary variant button group.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Merge options">
      <Button label="Merge pull request" variant="primary" />
      <Button label="More merge options" variant="primary" icon={<ChevronDownIcon style={iconSize} />} isIconOnly />
    </ButtonGroup>
}`,...K.parameters?.docs?.source},description:{story:`Two-button group (common split button pattern).`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Edit actions">
      <Button label="Edit" />
      <IconButton label="More options" icon={<ChevronDownIcon style={iconSize} />} />
    </ButtonGroup>
}`,...q.parameters?.docs?.source},description:{story:`Mixed button and icon button children.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup label="Approve action">
      <Button label="Allow once" variant="primary" />
      <DropdownMenu hasChevron={false} button={{
      label: 'Allow options',
      variant: 'primary',
      isIconOnly: true,
      icon: <Icon icon="chevronDown" />
    }} items={[{
      label: 'Allow for 30 minutes'
    }, {
      label: 'Always allow'
    }]} />
    </ButtonGroup>
}`,...J.parameters?.docs?.source},description:{story:`A DropdownMenu composes as a group member — the split-button pattern, with no
dedicated primitive. Its popover is an invisible DOM sibling after the
trigger, so the trailing corner must still round (#2508).`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <ButtonGroup label="Clipboard actions" isDisabled>
        <Button label="Copy" />
        <Button label="Cut" />
        <Button label="Paste" />
      </ButtonGroup>
      <ButtonGroup label="History">
        <Button label="Undo" />
        <Button label="Redo" isDisabled />
      </ButtonGroup>
    </div>
}`,...Y.parameters?.docs?.source},description:{story:"Disabled members: the whole group via `isDisabled`, and a single member\ndisabling itself inside an enabled group.",...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>
      {(['none', 'low', 'med', 'high'] as const).map(elevation => <ButtonGroup key={elevation} label={elevation} elevation={elevation}>
          <Button label="Copy" />
          <Button label="Paste" />
        </ButtonGroup>)}
    </div>
}`,...X.parameters?.docs?.source},description:{story:`The connected buttons share one surface, so the shadow sits on the group and
lifts them together.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 280
  }}>
      <ButtonGroup label="Review actions">
        <Button label="Approve and merge immediately" />
        <Button label="Request changes" />
      </ButtonGroup>
    </div>
}`,...Z.parameters?.docs?.source},description:{story:`Long labels in a narrow container. Members neither wrap nor truncate, so a
group whose labels are wider than its container overflows it.`,...Z.parameters?.docs?.description}}},Q=[`Horizontal`,`SlideAcross`,`Vertical`,`IconOnly`,`GhostPair`,`Sizes`,`PrimaryVariant`,`SplitButton`,`Mixed`,`WithDropdownMenu`,`Disabled`,`Elevation`,`LongLabels`]})))()}$();export{Y as Disabled,X as Elevation,U as GhostPair,z as Horizontal,H as IconOnly,Z as LongLabels,q as Mixed,G as PrimaryVariant,W as Sizes,B as SlideAcross,K as SplitButton,V as Vertical,J as WithDropdownMenu,Q as __namedExportsOrder,L as default};