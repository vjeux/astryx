import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Switch-C8kZJ1p7.js";import{n as a,t as o}from"./createReorderable-BR-o97fJ.js";import{n as s,t as c}from"./TransferList-i8-nB9O-.js";var l,u,d,f,p,m;function h(){return(h=e((()=>{l=t(),s(),a(),r(),u=n(),d={title:`A11y/TransferList`,tags:[`no-visual`]},f=[{value:`name`,label:`Name`},{value:`owner`,label:`Owner`},{value:`status`,label:`Status`},{value:`priority`,label:`Priority`}],p={render:function(){let[e,t]=(0,l.useState)([`name`,`owner`,`status`]),[n,r]=(0,l.useState)(!1),a=(0,l.useMemo)(()=>o({onReorder:({key:e,to:n})=>t(t=>{let r=t.filter(t=>t!==e);return r.splice(n,0,e),r})}),[]);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i,{label:`Disable the list`,value:n,onChange:e=>r(e)}),(0,u.jsx)(c,{label:`Visible fields`,options:f,value:e,onChange:t,reorderable:a,isDisabled:n})]})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function DisabledStory() {
    const [value, setValue] = useState<readonly string[]>(['name', 'owner', 'status']);
    const [isDisabled, setIsDisabled] = useState(false);
    const reorderable = useMemo(() => createReorderable<string>({
      onReorder: ({
        key,
        to
      }) => setValue(current => {
        const next = current.filter(item => item !== key);
        next.splice(to, 0, key);
        return next;
      })
    }), []);
    return <>
        <Switch label="Disable the list" value={isDisabled} onChange={checked => setIsDisabled(checked)} />
        <TransferList label="Visible fields" options={OPTIONS} value={value} onChange={setValue} reorderable={reorderable} isDisabled={isDisabled} />
      </>;
  }
}`,...p.parameters?.docs?.source}}},m=[`Disabled`]})))()}h();export{p as Disabled,m as __namedExportsOrder,d as default};