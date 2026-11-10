import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Spinner-D_2CFi41.js";import{n as a,t as o}from"./Text-C5BHw0wv.js";import{n as s,t as c}from"./CheckboxIndicator-BAwSabDB.js";import{i as l,n as u,r as d,t as f}from"./RadioIndicator-B_4r1Acb.js";import{n as p,t as m}from"./HStack-D5idGciI.js";import{n as h,t as g}from"./VStack-SWtDePqc.js";function _({label:e,children:t}){return(0,y.jsxs)(m,{gap:4,vAlign:`center`,children:[(0,y.jsx)(`span`,{style:{minWidth:260},children:(0,y.jsx)(o,{type:`supporting`,color:`secondary`,children:e})}),t]})}var v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{v=t(),s(),l(),u(),r(),a(),p(),h(),y=n(),b={title:`Core/Indicator`,component:d,parameters:{layout:`padded`,docs:{description:{component:`Indicators are the componentized selection visuals shared by CheckboxInput,
RadioList, Selector and menu selection rows. They are decorative: the owning
component keeps the input, role, accessible name, focus and keyboard
behavior, while the indicator turns \`state\` into a picture.

These stories render them directly, which no other story file does — every
other one reaches an indicator through a host. That matters for the
\`children\` slot in particular: it is the path a host uses to show a pending
Spinner, and it had no rendered coverage anywhere until this file existed.`}}},tags:[`autodocs`]},x={display:`inline-flex`,alignItems:`center`,justifyContent:`center`,minWidth:40,minHeight:32},S={render:()=>(0,y.jsxs)(g,{gap:4,children:[(0,y.jsxs)(_,{label:`CheckIndicator — unchecked, checked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`unchecked`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`})})]}),(0,y.jsxs)(_,{label:`CheckboxIndicator — unchecked, checked, indeterminate`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`unchecked`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`indeterminate`})})]}),(0,y.jsxs)(_,{label:`RadioIndicator — unchecked, checked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`unchecked`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`})})]})]})},C={render:()=>(0,y.jsxs)(g,{gap:4,children:[(0,y.jsxs)(_,{label:`sm`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`,size:`sm`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`,size:`sm`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`,size:`sm`})})]}),(0,y.jsxs)(_,{label:`md (default)`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`,size:`md`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`,size:`md`})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`,size:`md`})})]})]})},w={render:()=>(0,y.jsxs)(g,{gap:4,children:[(0,y.jsxs)(_,{label:`disabled — unchecked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`unchecked`,isDisabled:!0})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`unchecked`,isDisabled:!0})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`unchecked`,isDisabled:!0})})]}),(0,y.jsxs)(_,{label:`disabled — checked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`,isDisabled:!0})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`,isDisabled:!0})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`,isDisabled:!0})})]})]})},T={render:()=>{let e=e=>e&&(0,y.jsx)(i,{size:`sm`,shade:`inherit`});return(0,y.jsxs)(g,{gap:4,children:[(0,y.jsx)(o,{type:`supporting`,color:`secondary`,children:`Column 1 keeps its mark (children renders nothing). Column 2 shows the spinner instead of the mark.`}),(0,y.jsxs)(_,{label:`CheckIndicator — checked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`,children:e(!1)})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`,children:e(!0)})})]}),(0,y.jsxs)(_,{label:`CheckboxIndicator — checked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`,children:e(!1)})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`,children:e(!0)})})]}),(0,y.jsxs)(_,{label:`CheckboxIndicator — indeterminate`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`indeterminate`,children:e(!1)})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`indeterminate`,children:e(!0)})})]}),(0,y.jsxs)(_,{label:`RadioIndicator — checked`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`,children:e(!1)})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`,children:e(!0)})})]})]})}},E={render:function(){let[e,t]=(0,v.useState)(!1),n=e&&(0,y.jsx)(i,{size:`sm`,shade:`inherit`});return(0,y.jsxs)(g,{gap:4,children:[(0,y.jsxs)(`label`,{children:[(0,y.jsx)(`input`,{type:`checkbox`,checked:e,onChange:e=>t(e.target.checked)}),` `,(0,y.jsx)(o,{type:`supporting`,children:`isBusy`})]}),(0,y.jsxs)(m,{gap:4,vAlign:`center`,children:[(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(d,{state:`checked`,children:n})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(c,{state:`checked`,children:n})}),(0,y.jsx)(`span`,{style:x,children:(0,y.jsx)(f,{state:`checked`,children:n})})]})]})}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={4}>
      <Row label="CheckIndicator — unchecked, checked">
        <span style={cellStyle}>
          <CheckIndicator state="unchecked" />
        </span>
        <span style={cellStyle}>
          <CheckIndicator state="checked" />
        </span>
      </Row>
      <Row label="CheckboxIndicator — unchecked, checked, indeterminate">
        <span style={cellStyle}>
          <CheckboxIndicator state="unchecked" />
        </span>
        <span style={cellStyle}>
          <CheckboxIndicator state="checked" />
        </span>
        <span style={cellStyle}>
          <CheckboxIndicator state="indeterminate" />
        </span>
      </Row>
      <Row label="RadioIndicator — unchecked, checked">
        <span style={cellStyle}>
          <RadioIndicator state="unchecked" />
        </span>
        <span style={cellStyle}>
          <RadioIndicator state="checked" />
        </span>
      </Row>
    </VStack>
}`,...S.parameters?.docs?.source},description:{story:`Every indicator, in every state its family defines.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={4}>
      <Row label="sm">
        <span style={cellStyle}>
          <CheckIndicator state="checked" size="sm" />
        </span>
        <span style={cellStyle}>
          <CheckboxIndicator state="checked" size="sm" />
        </span>
        <span style={cellStyle}>
          <RadioIndicator state="checked" size="sm" />
        </span>
      </Row>
      <Row label="md (default)">
        <span style={cellStyle}>
          <CheckIndicator state="checked" size="md" />
        </span>
        <span style={cellStyle}>
          <CheckboxIndicator state="checked" size="md" />
        </span>
        <span style={cellStyle}>
          <RadioIndicator state="checked" size="md" />
        </span>
      </Row>
    </VStack>
}`,...C.parameters?.docs?.source},description:{story:`Both control sizes, side by side.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={4}>
      <Row label="disabled — unchecked">
        <span style={cellStyle}>
          <CheckIndicator state="unchecked" isDisabled />
        </span>
        <span style={cellStyle}>
          <CheckboxIndicator state="unchecked" isDisabled />
        </span>
        <span style={cellStyle}>
          <RadioIndicator state="unchecked" isDisabled />
        </span>
      </Row>
      <Row label="disabled — checked">
        <span style={cellStyle}>
          <CheckIndicator state="checked" isDisabled />
        </span>
        <span style={cellStyle}>
          <CheckboxIndicator state="checked" isDisabled />
        </span>
        <span style={cellStyle}>
          <RadioIndicator state="checked" isDisabled />
        </span>
      </Row>
    </VStack>
}`,...w.parameters?.docs?.source},description:{story:`Disabled is purely visual — the owner keeps the real disabled semantics.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const idiom = (isBusy: boolean) => isBusy && <Spinner size="sm" shade="inherit" />;
    return <VStack gap={4}>
        <Text type="supporting" color="secondary">
          Column 1 keeps its mark (children renders nothing). Column 2 shows the
          spinner instead of the mark.
        </Text>
        <Row label="CheckIndicator — checked">
          <span style={cellStyle}>
            <CheckIndicator state="checked">{idiom(false)}</CheckIndicator>
          </span>
          <span style={cellStyle}>
            <CheckIndicator state="checked">{idiom(true)}</CheckIndicator>
          </span>
        </Row>
        <Row label="CheckboxIndicator — checked">
          <span style={cellStyle}>
            <CheckboxIndicator state="checked">
              {idiom(false)}
            </CheckboxIndicator>
          </span>
          <span style={cellStyle}>
            <CheckboxIndicator state="checked">{idiom(true)}</CheckboxIndicator>
          </span>
        </Row>
        <Row label="CheckboxIndicator — indeterminate">
          <span style={cellStyle}>
            <CheckboxIndicator state="indeterminate">
              {idiom(false)}
            </CheckboxIndicator>
          </span>
          <span style={cellStyle}>
            <CheckboxIndicator state="indeterminate">
              {idiom(true)}
            </CheckboxIndicator>
          </span>
        </Row>
        <Row label="RadioIndicator — checked">
          <span style={cellStyle}>
            <RadioIndicator state="checked">{idiom(false)}</RadioIndicator>
          </span>
          <span style={cellStyle}>
            <RadioIndicator state="checked">{idiom(true)}</RadioIndicator>
          </span>
        </Row>
      </VStack>;
  }
}`,...T.parameters?.docs?.source},description:{story:"The `children` slot, and the reason it needs a story.\n\nA host shows a pending change by passing a Spinner through `children`, and\nthe idiom it writes is `children={isBusy && <Spinner/>}`. When `isBusy` is\nfalse that passes `false` — which is neither `null` nor caught by `??`. Every\nindicator used to take the children path on it, render nothing there, and\nDELETE its state mark (#4893).\n\nRead the first column: each cell must still show its mark. Only the second\ncolumn should show a spinner in place of one.",...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function BusyToggleStory() {
    const [isBusy, setIsBusy] = useState(false);
    const busy = isBusy && <Spinner size="sm" shade="inherit" />;
    return <VStack gap={4}>
        <label>
          <input type="checkbox" checked={isBusy} onChange={e => setIsBusy(e.target.checked)} />{' '}
          <Text type="supporting">isBusy</Text>
        </label>
        <HStack gap={4} vAlign="center">
          <span style={cellStyle}>
            <CheckIndicator state="checked">{busy}</CheckIndicator>
          </span>
          <span style={cellStyle}>
            <CheckboxIndicator state="checked">{busy}</CheckboxIndicator>
          </span>
          <span style={cellStyle}>
            <RadioIndicator state="checked">{busy}</RadioIndicator>
          </span>
        </HStack>
      </VStack>;
  }
}`,...E.parameters?.docs?.source},description:{story:`A live toggle of the same idiom: flip busy and the spinner replaces the mark,
flip it back and the mark returns. Before #4893 the mark did not come back —
it never rendered in the first place.`,...E.parameters?.docs?.description}}},D=[`AllStates`,`Sizes`,`Disabled`,`BusyChildren`,`BusyToggle`]})))()}O();export{S as AllStates,T as BusyChildren,E as BusyToggle,w as Disabled,C as Sizes,D as __namedExportsOrder,b as default};