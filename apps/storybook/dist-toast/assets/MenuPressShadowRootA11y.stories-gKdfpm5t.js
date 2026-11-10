import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Selector-MAEgY-r1.js";import{n as a,t as o}from"./ContextMenu-Di_JOkJz.js";import{t as s}from"./client-Bg_dA0yi.js";function c({onChange:e}){let[t,n]=(0,u.useState)(``);return(0,f.jsx)(i,{label:`Fruit`,options:[`Apple`,`Banana`,`Orange`],value:t,onChange:t=>{n(t),e(t)}})}function l({onPick:e}){return(0,f.jsx)(o,{items:[{label:`Cut`,onClick:()=>e(`Cut`)},{label:`Copy`,onClick:()=>e(`Copy`)}],children:(0,f.jsx)(`div`,{style:{padding:24,border:`1px dashed`},children:`Right-click inside the shadow root`})})}var u,d,f,p,m,h,g;function _(){return(_=e((()=>{u=t(),d=s(),r(),a(),f=n(),p={title:`a11y/Menu press in a shadow root`,tags:[`no-visual`]},m={render:function(){let e=(0,u.useRef)(null),[t,n]=(0,u.useState)(``);return(0,u.useEffect)(()=>{let t=e.current;if(t==null)return;let r=t.shadowRoot??t.attachShadow({mode:`open`}),i=document.createElement(`div`);r.append(i);let a=(0,d.createRoot)(i);return a.render((0,f.jsx)(c,{onChange:n})),()=>{a.unmount(),i.remove()}},[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`div`,{ref:e,"data-testid":`shadow-host`}),(0,f.jsx)(`output`,{"data-testid":`selected-value`,children:t})]})}},h={render:function(){let e=(0,u.useRef)(null),[t,n]=(0,u.useState)(``);return(0,u.useEffect)(()=>{let t=e.current;if(t==null)return;let r=t.shadowRoot??t.attachShadow({mode:`open`}),i=document.createElement(`div`);r.append(i);let a=(0,d.createRoot)(i);return a.render((0,f.jsx)(l,{onPick:n})),()=>{a.unmount(),i.remove()}},[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`div`,{ref:e,"data-testid":`shadow-host`,style:{padding:48}}),(0,f.jsx)(`output`,{"data-testid":`picked-item`,children:t})]})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function SelectorInShadowRootStory() {
    const hostRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState('');
    useEffect(() => {
      const host = hostRef.current;
      if (host == null) {
        return;
      }
      const shadow = host.shadowRoot ?? host.attachShadow({
        mode: 'open'
      });
      const container = document.createElement('div');
      shadow.append(container);
      const root = createRoot(container);
      root.render(<ShadowSelector onChange={setValue} />);
      return () => {
        root.unmount();
        container.remove();
      };
    }, []);
    return <>
        <div ref={hostRef} data-testid="shadow-host" />
        <output data-testid="selected-value">{value}</output>
      </>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: function ContextMenuInShadowRootStory() {
    const hostRef = useRef<HTMLDivElement>(null);
    const [picked, setPicked] = useState('');
    useEffect(() => {
      const host = hostRef.current;
      if (host == null) {
        return;
      }
      const shadow = host.shadowRoot ?? host.attachShadow({
        mode: 'open'
      });
      const container = document.createElement('div');
      shadow.append(container);
      const root = createRoot(container);
      root.render(<ShadowContextMenu onPick={setPicked} />);
      return () => {
        root.unmount();
        container.remove();
      };
    }, []);
    return <>
        {/* The host's own padding is a press on the host, outside its tree. */}
        <div ref={hostRef} data-testid="shadow-host" style={{
        padding: 48
      }} />
        <output data-testid="picked-item">{picked}</output>
      </>;
  }
}`,...h.parameters?.docs?.source}}},g=[`SelectorInShadowRoot`,`ContextMenuInShadowRoot`]})))()}_();export{h as ContextMenuInShadowRoot,m as SelectorInShadowRoot,g as __namedExportsOrder,p as default};