import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{d as n,f as r}from"./renderDropdownItems-hNxj8lO0.js";import{n as i,t as a}from"./Kbd-C2QfIYQG.js";import{n as o,t as s}from"./ContextMenu-Di_JOkJz.js";import{n as c,t as l}from"./DocumentDuplicateIcon-DGljD83Z.js";import{n as u,t as d}from"./PencilIcon-Cmm9HPbw.js";import{n as f,t as p}from"./ShareIcon-CRmUCwYw.js";import{n as m,t as h}from"./TrashIcon-BuvjJ71A.js";var g,_,v,y;function b(){return(b=e((()=>{o(),r(),i(),c(),u(),f(),m(),g=t(),_={title:`Core/ContextMenuItem`,component:n,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`}},v={render:()=>(0,g.jsx)(s,{"data-testid":`context-menu-item-audit-trigger`,label:`Document actions`,menuContent:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(n,{icon:d,label:`Edit`,description:`Modify this document`,endContent:(0,g.jsx)(`span`,{"data-testid":`context-menu-item-end-content`,children:(0,g.jsx)(a,{keys:`mod+e`})}),onClick:()=>{}}),(0,g.jsx)(n,{icon:p,label:`Share`,onClick:()=>{}}),(0,g.jsx)(n,{icon:l,label:`Duplicate`,isDisabled:!0,onClick:()=>{}}),(0,g.jsx)(n,{icon:h,label:`Delete`,variant:`destructive`,onClick:()=>{}})]}),children:(0,g.jsx)(`div`,{className:`xmfvnks xixulwi xmkeg23 xbsl7fq xz7bj1o xh6dtrn`,children:`Right-click for document actions`})}),play:async({canvasElement:e})=>{e.querySelector(`[data-testid="context-menu-item-audit-trigger"]`)?.dispatchEvent(new MouseEvent(`contextmenu`,{bubbles:!0,clientX:40,clientY:40}))}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu data-testid="context-menu-item-audit-trigger" label="Document actions" menuContent={<>
          <ContextMenuItem icon={PencilIcon} label="Edit" description="Modify this document" endContent={<span data-testid="context-menu-item-end-content">
                <Kbd keys="mod+e" />
              </span>} onClick={() => {}} />
          <ContextMenuItem icon={ShareIcon} label="Share" onClick={() => {}} />
          <ContextMenuItem icon={DocumentDuplicateIcon} label="Duplicate" isDisabled onClick={() => {}} />
          <ContextMenuItem icon={TrashIcon} label="Delete" variant="destructive" onClick={() => {}} />
        </>}>
      <div {...stylex.props(styles.trigger)}>
        Right-click for document actions
      </div>
    </ContextMenu>,
  play: async ({
    canvasElement
  }) => {
    canvasElement.querySelector('[data-testid="context-menu-item-audit-trigger"]')?.dispatchEvent(new MouseEvent('contextmenu', {
      bubbles: true,
      clientX: 40,
      clientY: 40
    }));
  }
}`,...v.parameters?.docs?.source},description:{story:`The public alias in its supported ContextMenu compound composition.`,...v.parameters?.docs?.description}}},y=[`States`]})))()}b();export{v as States,y as __namedExportsOrder,_ as default};