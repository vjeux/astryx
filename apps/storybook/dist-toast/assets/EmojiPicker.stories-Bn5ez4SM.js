import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./IconButton-BONXg2Kw.js";import{n as s,t as c}from"./Card-DA0ZfoAz.js";import{n as l,t as u}from"./Popover-CgJiFJLM.js";import{n as d,t as f}from"./HStack-D5idGciI.js";import{n as p,t as m}from"./VStack-SWtDePqc.js";import{n as h,t as g}from"./EmojiPicker-BY0V1l9q.js";function _(){let[e,t]=(0,v.useState)(null);return(0,y.jsxs)(m,{gap:3,width:352,children:[(0,y.jsxs)(f,{gap:2,align:`center`,children:[(0,y.jsx)(i,{type:`label`,children:`Picked:`}),(0,y.jsx)(i,{type:`body`,color:`secondary`,children:e==null?`Nothing yet`:`${e.emoji} ${e.name}`})]}),(0,y.jsx)(c,{padding:0,width:`100%`,children:(0,y.jsx)(g,{onSelect:(e,n)=>t(n)})})]})}var v,y;function b(){return(b=e((()=>{v=t(),s(),d(),p(),r(),h(),y=n(),_.__docgenInfo={description:``,methods:[],displayName:`EmojiPickerShowcase`}})))()}var x,S,C,w,T,E,D;function O(){return(O=e((()=>{x=t(),s(),a(),d(),l(),r(),h(),b(),S=n(),C={title:`Lab/EmojiPicker`,tags:[`autodocs`],parameters:{layout:`centered`}},w={render:()=>(0,S.jsx)(_,{})},T={render:()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(``);return(0,S.jsxs)(f,{gap:2,align:`center`,children:[(0,S.jsx)(u,{isOpen:e,onOpenChange:t,label:`Add emoji`,padding:0,width:352,content:(0,S.jsx)(g,{onSelect:e=>{r(t=>t+e),t(!1)}}),children:(0,S.jsx)(o,{label:`Add emoji`,variant:`secondary`,icon:(0,S.jsx)(`span`,{"aria-hidden":`true`,children:`🙂`})})}),(0,S.jsx)(i,{type:`large`,children:n===``?`Pick some emoji`:n})]})}},E={render:()=>(0,S.jsx)(c,{padding:0,width:352,children:(0,S.jsx)(g,{frequentEmojis:[{emoji:`🚀`,name:`Rocket`},{emoji:`✅`,name:`Check mark button`}],categories:[{name:`Status`,emojis:[{emoji:`🟢`,name:`Green circle`,keywords:[`ok`,`healthy`]},{emoji:`🟡`,name:`Yellow circle`,keywords:[`warning`]},{emoji:`🔴`,name:`Red circle`,keywords:[`error`,`down`]}]}],onSelect:()=>{}})})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <EmojiPickerShowcase />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    return <HStack gap={2} align="center">
        <Popover isOpen={isOpen} onOpenChange={setIsOpen} label="Add emoji" padding={0} width={352}
      // The Popover's own autofocus lands on the picker's search field.
      content={<EmojiPicker onSelect={emoji => {
        setText(current => current + emoji);
        setIsOpen(false);
      }} />}>
          <IconButton label="Add emoji" variant="secondary" icon={<span aria-hidden="true">🙂</span>} />
        </Popover>
        <Text type="large">{text === '' ? 'Pick some emoji' : text}</Text>
      </HStack>;
  }
}`,...T.parameters?.docs?.source},description:{story:`Opened from a button, the picker focuses its search.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Card padding={0} width={352}>
      <EmojiPicker frequentEmojis={[{
      emoji: '🚀',
      name: 'Rocket'
    }, {
      emoji: '✅',
      name: 'Check mark button'
    }]} categories={[{
      name: 'Status',
      emojis: [{
        emoji: '🟢',
        name: 'Green circle',
        keywords: ['ok', 'healthy']
      }, {
        emoji: '🟡',
        name: 'Yellow circle',
        keywords: ['warning']
      }, {
        emoji: '🔴',
        name: 'Red circle',
        keywords: ['error', 'down']
      }]
    }]} onSelect={() => {}} />
    </Card>
}`,...E.parameters?.docs?.source},description:{story:`Your own set: the viewer's recent emoji and a custom group.`,...E.parameters?.docs?.description}}},D=[`Inline`,`InAPopover`,`CustomSet`]})))()}O();export{E as CustomSet,T as InAPopover,w as Inline,D as __namedExportsOrder,C as default};