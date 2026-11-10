import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,n,r,t as i}from"./LayoutContent-BEmJ3Yl2.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./Text-C5BHw0wv.js";import{n as c,t as l}from"./Icon-BmO5FtDV.js";import{n as u,t as d}from"./FieldLabel-Cw7h3Ix_.js";import{n as f,t as p}from"./Dialog-ohVvtWtq.js";import{n as m,t as h}from"./DialogHeader-BKo6d-E-.js";import{n as g,t as _}from"./VStack-SWtDePqc.js";import{n as v,t as y}from"./FormLayout-CAcZ3H26.js";import{n as b,t as x}from"./TextInput-LGxpinPt.js";var S,C,w,T,E,D,O;function k(){return(k=e((()=>{u(),c(),v(),b(),g(),o(),f(),m(),t(),n(),S=a(),C={title:`Core/FieldLabel`,component:d,tags:[`autodocs`]},w={display:`grid`,gap:6},T={render:()=>(0,S.jsxs)(_,{gap:6,children:[(0,S.jsx)(s,{type:`body`,children:`Directory`}),(0,S.jsx)(x,{label:`Search people`,value:``,onChange:()=>{},isLabelHidden:!0,labelTooltip:`Searches names and teams.`,placeholder:`Search people`}),(0,S.jsx)(y,{direction:`horizontal-labels`,children:(0,S.jsx)(x,{label:`Search teams`,value:``,onChange:()=>{},isLabelHidden:!0,labelTooltip:`Searches team names.`,placeholder:`Search teams`})})]})},E={render:()=>(0,S.jsx)(p,{isOpen:!0,onOpenChange:()=>{},maxHeight:`50vh`,children:(0,S.jsx)(r,{header:(0,S.jsx)(h,{title:`Files`,onOpenChange:()=>{}}),content:(0,S.jsxs)(i,{children:[(0,S.jsx)(x,{label:`Search files`,value:``,onChange:()=>{},isLabelHidden:!0,labelTooltip:`Searches file names only.`,placeholder:`Search files`}),Array.from({length:12},(e,t)=>(0,S.jsxs)(s,{type:`body`,as:`p`,display:`block`,children:[`File `,t+1]},t))]})})})},D={render:()=>(0,S.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:480},children:[(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Email`,inputID:`field-label-default`}),(0,S.jsx)(`input`,{id:`field-label-default`,defaultValue:`hello@example.com`})]}),(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Workspace`,inputID:`field-label-description`,description:`Shown in navigation and invitations.`,descriptionID:`field-label-description-help`}),(0,S.jsx)(`input`,{id:`field-label-description`,"aria-describedby":`field-label-description-help`})]}),(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Owner`,inputID:`field-label-required`,isRequired:!0,labelIcon:(0,S.jsx)(l,{icon:`info`})}),(0,S.jsx)(`input`,{id:`field-label-required`,required:!0})]}),(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Nickname`,inputID:`field-label-optional`,isOptional:!0,labelTooltip:`This name is shown to collaborators.`}),(0,S.jsx)(`input`,{id:`field-label-optional`})]}),(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Archived field`,inputID:`field-label-disabled`,isDisabled:!0}),(0,S.jsx)(`input`,{id:`field-label-disabled`,disabled:!0})]}),(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Visibility`,inputID:`field-label-group`,labelID:`field-label-group-label`,isGroupLabel:!0}),(0,S.jsxs)(`div`,{id:`field-label-group`,role:`radiogroup`,"aria-labelledby":`field-label-group-label`,children:[(0,S.jsxs)(`label`,{children:[(0,S.jsx)(`input`,{type:`radio`,name:`visibility`,defaultChecked:!0}),` Private`]}),` `,(0,S.jsxs)(`label`,{children:[(0,S.jsx)(`input`,{type:`radio`,name:`visibility`}),` Public`]})]})]}),(0,S.jsxs)(`div`,{style:w,children:[(0,S.jsx)(d,{label:`Search`,inputID:`field-label-hidden`,description:`Search every workspace.`,descriptionID:`field-label-hidden-help`,isLabelHidden:!0}),(0,S.jsx)(`input`,{id:`field-label-hidden`,"aria-describedby":`field-label-hidden-help`,placeholder:`Search every workspace`})]})]})},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={6}>
      <Text type="body">Directory</Text>
      <TextInput label="Search people" value="" onChange={() => {}} isLabelHidden labelTooltip="Searches names and teams." placeholder="Search people" />
      <FormLayout direction="horizontal-labels">
        <TextInput label="Search teams" value="" onChange={() => {}} isLabelHidden labelTooltip="Searches team names." placeholder="Search teams" />
      </FormLayout>
    </VStack>
}`,...T.parameters?.docs?.source},description:{story:`One bounded fixture for every component-owned FieldLabel state. The associated
controls make label, group, hidden-label, and description semantics observable
without turning each prop into a permanent story.
A hidden label's info button inside real fields, in a stacked layout and in
a horizontal-labels FormLayout. Tab to the button: it shows just above its
field.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen onOpenChange={() => {}} maxHeight="50vh">
      <Layout header={<DialogHeader title="Files" onOpenChange={() => {}} />} content={<LayoutContent>
            <TextInput label="Search files" value="" onChange={() => {}} isLabelHidden labelTooltip="Searches file names only." placeholder="Search files" />
            {Array.from({
        length: 12
      }, (_, index) => <Text type="body" as="p" display="block" key={index}>
                File {index + 1}
              </Text>)}
          </LayoutContent>} />
    </Dialog>
}`,...E.parameters?.docs?.source},description:{story:`A hidden label's info button on the first field of a dialog's scrolling
body. Tab to the button: it shows in flow above the field, inside the body.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 480
  }}>
      <div style={groupStyle}>
        <FieldLabel label="Email" inputID="field-label-default" />
        <input id="field-label-default" defaultValue="hello@example.com" />
      </div>

      <div style={groupStyle}>
        <FieldLabel label="Workspace" inputID="field-label-description" description="Shown in navigation and invitations." descriptionID="field-label-description-help" />
        <input id="field-label-description" aria-describedby="field-label-description-help" />
      </div>

      <div style={groupStyle}>
        <FieldLabel label="Owner" inputID="field-label-required" isRequired labelIcon={<Icon icon="info" />} />
        <input id="field-label-required" required />
      </div>

      <div style={groupStyle}>
        <FieldLabel label="Nickname" inputID="field-label-optional" isOptional labelTooltip="This name is shown to collaborators." />
        <input id="field-label-optional" />
      </div>

      <div style={groupStyle}>
        <FieldLabel label="Archived field" inputID="field-label-disabled" isDisabled />
        <input id="field-label-disabled" disabled />
      </div>

      <div style={groupStyle}>
        <FieldLabel label="Visibility" inputID="field-label-group" labelID="field-label-group-label" isGroupLabel />
        <div id="field-label-group" role="radiogroup" aria-labelledby="field-label-group-label">
          <label>
            <input type="radio" name="visibility" defaultChecked /> Private
          </label>{' '}
          <label>
            <input type="radio" name="visibility" /> Public
          </label>
        </div>
      </div>

      <div style={groupStyle}>
        <FieldLabel label="Search" inputID="field-label-hidden" description="Search every workspace." descriptionID="field-label-hidden-help" isLabelHidden />
        <input id="field-label-hidden" aria-describedby="field-label-hidden-help" placeholder="Search every workspace" />
      </div>
    </div>
}`,...D.parameters?.docs?.source}}},O=[`HiddenLabelInfo`,`HiddenLabelInfoInDialog`,`States`]})))()}k();export{T as HiddenLabelInfo,E as HiddenLabelInfoInDialog,D as States,O as __namedExportsOrder,C as default};