import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./mergeProps-DHkqklmt.js";import{i,t as a}from"./themeProps-BVy3p_gf.js";import{r as o}from"./inputAria-WJ0sD5j3.js";import{n as s,t as c}from"./Text-C5BHw0wv.js";import{n as l,t as u}from"./VStack-SWtDePqc.js";import{n as d,t as f}from"./Field-CBd_4iOL.js";import{n as p,t as m}from"./fieldParts-BCwX66yz.js";import{i as h,n as g,r as _,t as v}from"./SelectableCard-Dk-7ODJz.js";function y(e){let{ref:t,label:n,isLabelHidden:a,description:s,htmlName:c,isDisabled:l=!1,orientation:u=`horizontal`,children:d,containerXstyle:m,containerClassName:h,containerStyle:g,selectionMode:_,value:v,onChange:y,...b}=e,w=(0,x.useId)(),T=(0,x.useId)(),E=(0,x.useId)(),D=(0,x.useId)(),O=c??D,{rest:k,container:A}=p(`SelectableCardGroup`,b,{containerXstyle:m,containerClassName:h,containerStyle:g}),{"aria-labelledby":j,"aria-describedby":M,...N}=k,P=o(w,j),F=o(s?E:void 0,M),I=e.selectionMode===`multiple`,L=(0,x.useMemo)(()=>{if(e.selectionMode===`multiple`){let{value:t,onChange:n}=e;return{inputType:`checkbox`,groupName:O,submitName:O,isDisabled:l,isSelected:e=>t.includes(e),change:(e,r)=>n(r?[...t.filter(t=>t!==e),e]:t.filter(t=>t!==e))}}let{value:t,onChange:n}=e;return{inputType:`radio`,groupName:D,submitName:O,isDisabled:l,isSelected:e=>t===e,change:(e,t)=>{t&&n(e)}}},[e.selectionMode,e.value,e.onChange,D,O,l]);return(0,S.jsx)(f,{label:n,isLabelHidden:a,description:s,inputID:T,labelID:w,isGroupLabel:!0,descriptionID:s?E:void 0,isDisabled:l,...A,children:(0,S.jsx)(`div`,{...N,ref:t,role:I?`group`:`radiogroup`,"aria-labelledby":P,"aria-describedby":F,"aria-disabled":l||void 0,...r(i(`selectable-card-group`,{orientation:u,selectionMode:I?`multiple`:`single`}),{0:{className:`astryx78zum5 astryx1a02dak astryxjcht0a`},1:{className:`astryx78zum5 astryxjcht0a astryxdt5ytf astryxozqiw3`}}[u===`vertical`|0]),children:(0,S.jsx)(C.Provider,{value:L,children:d})})})}function b({value:e,isDisabled:t,...n}){let r=(0,x.useContext)(C),i=(0,x.useMemo)(()=>r==null?null:{type:r.inputType,name:r.groupName,value:e},[r,e]);if(r==null)throw Error(`SelectableCardGroupItem must be rendered inside a SelectableCardGroup.`);let a=r.isSelected(e),o=r.isDisabled||t===!0;return(0,S.jsxs)(_,{value:i,children:[(0,S.jsx)(v,{...n,isSelected:a,isDisabled:o,onChange:t=>r.change(e,t)}),r.inputType===`radio`&&a&&!o?(0,S.jsx)(`input`,{type:`hidden`,name:r.submitName,value:e}):null]})}var x,S,C;function w(){return(w=e((()=>{x=t(),d(),g(),h(),m(),a(),S=n(),C=(0,x.createContext)(null),y.displayName=`SelectableCardGroup`,b.displayName=`SelectableCardGroupItem`,y.__docgenInfo={description:`A set of selectable cards with the semantics of its selection: one choice
is a radio group (one tab stop, arrow keys, "2 of 3" spoken), several are a
group of checkboxes.

@example
\`\`\`
<SelectableCardGroup label="Plan" value={plan} onChange={setPlan}>
  <SelectableCardGroupItem value="basic" label="Basic">Basic</SelectableCardGroupItem>
  <SelectableCardGroupItem value="pro" label="Pro">Pro</SelectableCardGroupItem>
</SelectableCardGroup>
\`\`\``,methods:[],displayName:`SelectableCardGroup`,props:{containerXstyle:{required:!1,tsType:{name:`StyleXStyles`},description:`StyleX styles for the field container (the Field box around the label,
control, and status). Has no effect where no Field box renders: inside
InputGroup (style the InputGroup instead) and in a \`horizontal-labels\`
FormLayout.`},containerClassName:{required:!1,tsType:{name:`string`},description:"Class name for the field container. Same targeting as `containerXstyle`."},containerStyle:{required:!1,tsType:{name:`CSSProperties`},description:"Inline styles for the field container. Same targeting as `containerXstyle`."},ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLDivElement`}],raw:`Ref<HTMLDivElement>`},description:`Ref forwarded to the group element (role radiogroup or group).`},label:{required:!0,tsType:{name:`string`},description:`The group's visible label and accessible name.`},isLabelHidden:{required:!1,tsType:{name:`boolean`},description:`Hides the label visually; it still names the group.`},description:{required:!1,tsType:{name:`string`},description:`Helper text under the label, linked to the group.`},htmlName:{required:!1,tsType:{name:`string`},description:`The name the group's value is submitted under. The radios group by a
generated name. Defaults to a generated one.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Disables every card; they stay focusable and announce disabled.`},orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:"`horizontal` (the default) wraps cards in rows; `vertical` stacks them."},children:{required:!0,tsType:{name:`ReactNode`},description:`The SelectableCardGroupItem cards.`}}},b.__docgenInfo={description:`One card of a SelectableCardGroup: a SelectableCard whose input, name and
selection come from the group.`,methods:[],displayName:`SelectableCardGroupItem`,props:{value:{required:!0,tsType:{name:`string`},description:"The value this card stands for in the group's `value`."}},composes:[`Omit`]}})))()}function T({name:e,price:t}){return(0,D.jsxs)(u,{gap:1,children:[(0,D.jsx)(c,{type:`body`,weight:`bold`,children:e}),(0,D.jsx)(c,{type:`supporting`,color:`secondary`,children:t})]})}var E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{E=t(),s(),l(),w(),D=n(),O={title:`Lab/SelectableCardGroup`,component:y,tags:[`autodocs`],parameters:{docs:{description:{component:`A set of selectable cards with the semantics of its selection. One choice is a radio group (one tab stop, arrow keys, "2 of 3" spoken); several are a group of checkboxes.`}}}},k=[{id:`basic`,name:`Basic`,price:`$9/mo`},{id:`pro`,name:`Pro`,price:`$29/mo`},{id:`team`,name:`Team`,price:`$99/mo`}],A={name:`Single choice (radio group)`,render:()=>{let[e,t]=(0,E.useState)(`basic`);return(0,D.jsx)(y,{label:`Plan`,description:`Billed monthly`,value:e,onChange:t,children:k.map(e=>(0,D.jsx)(b,{value:e.id,label:e.name,width:160,children:(0,D.jsx)(T,{name:e.name,price:e.price})},e.id))})}},j={name:`Multiple choice (checkboxes)`,render:()=>{let[e,t]=(0,E.useState)([`pro`]);return(0,D.jsx)(y,{label:`Add-ons`,selectionMode:`multiple`,value:e,onChange:t,children:k.map(e=>(0,D.jsx)(b,{value:e.id,label:e.name,width:160,children:(0,D.jsx)(T,{name:e.name,price:e.price})},e.id))})}},M={render:()=>{let[e,t]=(0,E.useState)(null);return(0,D.jsx)(y,{label:`Plan`,orientation:`vertical`,value:e,onChange:t,children:k.map(e=>(0,D.jsx)(b,{value:e.id,label:e.name,maxWidth:320,children:(0,D.jsx)(T,{name:e.name,price:e.price})},e.id))})}},N={render:()=>(0,D.jsx)(y,{label:`Plan`,value:`pro`,isDisabled:!0,onChange:()=>{},children:k.map(e=>(0,D.jsx)(b,{value:e.id,label:e.name,width:160,children:(0,D.jsx)(T,{name:e.name,price:e.price})},e.id))})},P={name:`Two forms, one htmlName`,render:()=>{let[e,t]=(0,E.useState)(`pro`),[n,r]=(0,E.useState)(`team`);return(0,D.jsxs)(u,{gap:4,children:[(0,D.jsx)(`form`,{"aria-label":`First subscription`,children:(0,D.jsx)(y,{label:`First plan`,htmlName:`plan`,value:e,onChange:t,children:k.map(e=>(0,D.jsx)(b,{value:e.id,label:`First ${e.name}`,width:160,children:(0,D.jsx)(T,{name:e.name,price:e.price})},e.id))})}),(0,D.jsx)(`form`,{"aria-label":`Second subscription`,children:(0,D.jsx)(y,{label:`Second plan`,htmlName:`plan`,value:n,onChange:r,children:k.map(e=>(0,D.jsx)(b,{value:e.id,label:`Second ${e.name}`,width:160,children:(0,D.jsx)(T,{name:e.name,price:e.price})},e.id))})})]})},parameters:{docs:{description:{story:`Two single-choice groups in separate forms that share an htmlName stay separate radio groups, and each form submits its own choice.`}}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Single choice (radio group)',
  render: () => {
    const [plan, setPlan] = useState<string | null>('basic');
    return <SelectableCardGroup label="Plan" description="Billed monthly" value={plan} onChange={setPlan}>
        {PLANS.map(p => <SelectableCardGroupItem key={p.id} value={p.id} label={p.name} width={160}>
            <PlanContent name={p.name} price={p.price} />
          </SelectableCardGroupItem>)}
      </SelectableCardGroup>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Multiple choice (checkboxes)',
  render: () => {
    const [addOns, setAddOns] = useState<string[]>(['pro']);
    return <SelectableCardGroup label="Add-ons" selectionMode="multiple" value={addOns} onChange={setAddOns}>
        {PLANS.map(p => <SelectableCardGroupItem key={p.id} value={p.id} label={p.name} width={160}>
            <PlanContent name={p.name} price={p.price} />
          </SelectableCardGroupItem>)}
      </SelectableCardGroup>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [plan, setPlan] = useState<string | null>(null);
    return <SelectableCardGroup label="Plan" orientation="vertical" value={plan} onChange={setPlan}>
        {PLANS.map(p => <SelectableCardGroupItem key={p.id} value={p.id} label={p.name} maxWidth={320}>
            <PlanContent name={p.name} price={p.price} />
          </SelectableCardGroupItem>)}
      </SelectableCardGroup>;
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <SelectableCardGroup label="Plan" value="pro" isDisabled onChange={() => {}}>
      {PLANS.map(p => <SelectableCardGroupItem key={p.id} value={p.id} label={p.name} width={160}>
          <PlanContent name={p.name} price={p.price} />
        </SelectableCardGroupItem>)}
    </SelectableCardGroup>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Two forms, one htmlName',
  render: () => {
    const [first, setFirst] = useState<string | null>('pro');
    const [second, setSecond] = useState<string | null>('team');
    return <VStack gap={4}>
        <form aria-label="First subscription">
          <SelectableCardGroup label="First plan" htmlName="plan" value={first} onChange={setFirst}>
            {PLANS.map(p => <SelectableCardGroupItem key={p.id} value={p.id} label={\`First \${p.name}\`} width={160}>
                <PlanContent name={p.name} price={p.price} />
              </SelectableCardGroupItem>)}
          </SelectableCardGroup>
        </form>
        <form aria-label="Second subscription">
          <SelectableCardGroup label="Second plan" htmlName="plan" value={second} onChange={setSecond}>
            {PLANS.map(p => <SelectableCardGroupItem key={p.id} value={p.id} label={\`Second \${p.name}\`} width={160}>
                <PlanContent name={p.name} price={p.price} />
              </SelectableCardGroupItem>)}
          </SelectableCardGroup>
        </form>
      </VStack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Two single-choice groups in separate forms that share an htmlName stay separate radio groups, and each form submits its own choice.'
      }
    }
  }
}`,...P.parameters?.docs?.source}}},F=[`SingleChoice`,`MultipleChoice`,`Vertical`,`Disabled`,`TwoFormsSharedName`]})))()}I();export{N as Disabled,j as MultipleChoice,A as SingleChoice,P as TwoFormsSharedName,M as Vertical,F as __namedExportsOrder,O as default};