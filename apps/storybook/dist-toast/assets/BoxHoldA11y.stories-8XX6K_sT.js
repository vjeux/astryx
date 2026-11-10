import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{c as r,l as i}from"./useMenuPress-q1UHdjWB.js";import{i as a,n as o,r as s,t as c}from"./CheckboxListItem-DvDdmg8P.js";import{n as l,t as u}from"./CheckboxInput-CnJ0nBRn.js";import{n as d,t as f}from"./ContextMenu-Di_JOkJz.js";var p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{p=t(),l(),a(),o(),d(),r(),m=n(),h={title:`A11y/BoxHold`,tags:[`no-visual`]},g=[{label:`Rename`,onClick:()=>{}},{label:`Archive`,onClick:()=>{}}],_={name:`Boxes in a ContextMenu`,render:function(){let[e,t]=(0,p.useState)(!1),[n,r]=(0,p.useState)([]);return(0,m.jsxs)(f,{items:g,label:`Row actions`,children:[(0,m.jsx)(u,{label:`Accept terms`,value:e,onChange:t}),(0,m.jsxs)(s,{label:`Notifications`,value:n,onChange:r,children:[(0,m.jsx)(c,{label:`Email`,value:`email`}),(0,m.jsx)(c,{label:`SMS`,value:`sms`})]})]})}},v={name:`A box in a popover ContextMenu`,render:function(){let[e,t]=(0,p.useState)(!1);return(0,m.jsx)(f,{items:g,label:`Row actions`,presentation:`popover`,children:(0,m.jsx)(u,{label:`Accept terms`,value:e,onChange:t})})}},y={name:`A box in a long-press row`,render:function(){let[e,t]=(0,p.useState)(!1),[n,r]=(0,p.useState)(0),{onTouchStart:a,onTouchMove:o,onTouchEnd:s,onTouchCancel:c}=i({onLongPress:()=>r(e=>e+1)});return(0,m.jsxs)(`div`,{onTouchStart:a,onTouchMove:o,onTouchEnd:s,onTouchCancel:c,children:[(0,m.jsx)(u,{label:`Accept terms`,value:e,onChange:t}),(0,m.jsx)(`div`,{children:`Long presses: ${n}`})]})}},b={name:`A box in an onContextMenu row`,render:function(){let[e,t]=(0,p.useState)(!1),[n,r]=(0,p.useState)(!1);return(0,m.jsxs)(`div`,{onContextMenu:e=>{e.preventDefault(),r(!0)},children:[(0,m.jsx)(u,{label:`Accept terms`,value:e,onChange:t}),(0,m.jsx)(`div`,{children:`Row menu: ${n?`open`:`closed`}`})]})}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Boxes in a ContextMenu',
  render: function InContextMenuStory() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [channels, setChannels] = useState<string[]>([]);
    return <ContextMenu items={rowActions} label="Row actions">
        <CheckboxInput label="Accept terms" value={isAccepted} onChange={setIsAccepted} />
        <CheckboxList label="Notifications" value={channels} onChange={setChannels}>
          <CheckboxListItem label="Email" value="email" />
          <CheckboxListItem label="SMS" value="sms" />
        </CheckboxList>
      </ContextMenu>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'A box in a popover ContextMenu',
  render: function InPopoverContextMenuStory() {
    const [isAccepted, setIsAccepted] = useState(false);
    return <ContextMenu items={rowActions} label="Row actions" presentation="popover">
        <CheckboxInput label="Accept terms" value={isAccepted} onChange={setIsAccepted} />
      </ContextMenu>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'A box in a long-press row',
  render: function InLongPressRowStory() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [longPresses, setLongPresses] = useState(0);
    const {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel
    } = useLongPress({
      onLongPress: () => setLongPresses(count => count + 1)
    });
    return <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchCancel}>
        <CheckboxInput label="Accept terms" value={isAccepted} onChange={setIsAccepted} />
        <div>{\`Long presses: \${longPresses}\`}</div>
      </div>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'A box in an onContextMenu row',
  render: function InOnContextMenuRowStory() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return <div onContextMenu={event => {
      event.preventDefault();
      setIsMenuOpen(true);
    }}>
        <CheckboxInput label="Accept terms" value={isAccepted} onChange={setIsAccepted} />
        <div>{\`Row menu: \${isMenuOpen ? 'open' : 'closed'}\`}</div>
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x=[`InContextMenu`,`InPopoverContextMenu`,`InLongPressRow`,`InOnContextMenuRow`]})))()}S();export{_ as InContextMenu,y as InLongPressRow,b as InOnContextMenuRow,v as InPopoverContextMenu,x as __namedExportsOrder,h as default};