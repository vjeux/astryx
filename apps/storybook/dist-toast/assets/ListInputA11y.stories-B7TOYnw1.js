import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./TextInput-LGxpinPt.js";import{n as a,t as o}from"./createReorderable-BR-o97fJ.js";import{n as s,t as c}from"./ListInput-Bo7DCPOU.js";var l,u,d,f,p,m;function h(){return(h=e((()=>{l=t(),a(),r(),s(),u=n(),d={title:`A11y/ListInput`,tags:[`no-visual`]},f=[{key:`name`,header:`Name`,renderInput:({item:e,label:t,isLabelHidden:n,isDisabled:r,updateItem:a})=>(0,u.jsx)(i,{label:t,isLabelHidden:n,value:e.name,onChange:t=>a({...e,name:t},`name`),isDisabled:r})}],p={render:function(){let[e,t]=(0,l.useState)([{id:`host`,name:`Host`},{id:`ada`,name:`Ada`},{id:`grace`,name:`Grace`}]),n=(0,l.useMemo)(()=>o({isReorderable:e=>e!==`host`,onReorder:({key:e,to:n})=>t(t=>{let r=t.find(t=>t.id===e);if(r==null)return t;let i=t.filter(e=>e!==r);return[...i.slice(0,n),r,...i.slice(n)]})}),[]);return(0,u.jsx)(c,{label:`Guests`,value:e,onChange:t,getItemKey:e=>e.id,createItem:()=>({id:crypto.randomUUID(),name:``}),columns:f,itemName:`guest`,reorderable:n})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function FixedRecordStory() {
    const [guests, setGuests] = useState<Guest[]>([{
      id: 'host',
      name: 'Host'
    }, {
      id: 'ada',
      name: 'Ada'
    }, {
      id: 'grace',
      name: 'Grace'
    }]);
    const reorderable = useMemo(() => createReorderable({
      // The host stays first.
      isReorderable: (key: string | number) => key !== 'host',
      onReorder: ({
        key,
        to
      }: {
        key: string | number;
        to: number;
      }) => setGuests(current => {
        const moved = current.find(guest => guest.id === key);
        if (moved == null) {
          return current;
        }
        const rest = current.filter(guest => guest !== moved);
        return [...rest.slice(0, to), moved, ...rest.slice(to)];
      })
    }), []);
    return <ListInput<Guest> label="Guests" value={guests} onChange={setGuests} getItemKey={guest => guest.id} createItem={() => ({
      id: crypto.randomUUID(),
      name: ''
    })} columns={COLUMNS} itemName="guest" reorderable={reorderable} />;
  }
}`,...p.parameters?.docs?.source}}},m=[`FixedRecord`]})))()}h();export{p as FixedRecord,m as __namedExportsOrder,d as default};