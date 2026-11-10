import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Text-C5BHw0wv.js";import{n as o,t as s}from"./Button-DoGM0DEN.js";import{n as c,t as l}from"./Heading-YiIeUtHm.js";import{r as ee,t as te}from"./BottomSheet-C2AuUW1O.js";import{n as ne,t as u}from"./Divider-DkevuVb8.js";import{n as re,t as d}from"./Popover-CgJiFJLM.js";import{n as f,t as p}from"./HStack-D5idGciI.js";import{n as m,t as h}from"./VStack-SWtDePqc.js";import{n as ie,t as ae}from"./Section-g5hpGOnN.js";import{n as oe,t as g}from"./ListItem-C2dBt6xL.js";import{n as se,t as _}from"./List-Bq_ZN_6g.js";import{n as ce,t as v}from"./CheckboxInput-CnJ0nBRn.js";import{n as le,t as ue}from"./Link-D69iJxMA.js";import{n as y,t as b}from"./Switch-C8kZJ1p7.js";import{n as de,t as x}from"./TextInput-LGxpinPt.js";import{n as S,t as fe}from"./Token-DiYqRCxg.js";function pe({selectedAction:e,onSelectAction:t,onReset:n,presentation:r}){return(0,O.jsxs)(h,{gap:3,xstyle:M.actionList,children:[(0,O.jsx)(_,{density:`compact`,hasDividers:!0,header:(0,O.jsxs)(h,{gap:1,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Project actions`}),(0,O.jsx)(a,{type:`supporting`,color:`secondary`,children:r===`popover`?`Compact supplemental actions stay anchored to the trigger and keep the surrounding context visible.`:`The same actions can move into a BottomSheet when a product explicitly wants a bottom-edge touch surface.`})]}),children:A.map(n=>(0,O.jsx)(g,{label:n.label,description:n.description,isSelected:e===n.id,onClick:()=>t(n.id)},n.id))}),(0,O.jsx)(u,{}),(0,O.jsxs)(p,{gap:2,hAlign:`between`,children:[(0,O.jsxs)(a,{type:`supporting`,color:`secondary`,children:[`Selected:`,` `,e==null?`none`:A.find(t=>t.id===e)?.label]}),(0,O.jsx)(s,{label:`Reset selection`,variant:`ghost`,onClick:n,children:`Reset`})]})]})}function me(e,t){let[n,r]=D.useState(!1);return D.useEffect(()=>{if(typeof window>`u`||!window.matchMedia)return;let e=window.matchMedia(`(max-width: 639px) and (pointer: coarse) and (hover: none)`),t=()=>r(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),e??(t===`bottom-sheet`&&n?`bottom-sheet`:`popover`)}function C({presentation:e=`popover`,touchPresentation:t=`bottom-sheet`}){let n=me(e,t),[r,i]=D.useState(!1),[a,o]=D.useState(null),c=(0,O.jsx)(pe,{presentation:n,selectedAction:a,onSelectAction:o,onReset:()=>o(null)});return n===`bottom-sheet`?(0,O.jsxs)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:[(0,O.jsx)(s,{label:`Open project actions`,onClick:()=>i(!0),children:`Open project actions`}),(0,O.jsx)(te,{isOpen:r,onOpenChange:i,label:`Project actions`,height:`hug`,children:(0,O.jsx)(ae,{padding:4,children:c})})]}):(0,O.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,O.jsx)(d,{isOpen:r,onOpenChange:i,placement:`below`,alignment:`start`,label:`Project actions`,width:320,content:c,children:(0,O.jsx)(s,{label:`Open project actions`,children:`Open project actions`})})})}function w(){let[e,t]=D.useState(null);return(0,O.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,O.jsx)(d,{placement:`below`,alignment:`start`,label:`Move to project`,width:320,"data-testid":`tall-popover`,xstyle:M.boundedPopoverContent,content:(0,O.jsx)(_,{density:`compact`,hasDividers:!0,header:(0,O.jsxs)(h,{gap:1,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Move to project`}),(0,O.jsx)(a,{type:`supporting`,color:`secondary`,children:`Choose a destination for this task.`})]}),children:j.map(([n,r])=>(0,O.jsx)(g,{label:n,description:r,isSelected:e===n,onClick:()=>t(n)},n))}),children:(0,O.jsx)(s,{label:`Move task`,children:`Move task`})})})}function T(){let[e,t]=D.useState(!0),[n,r]=D.useState(!1),[i,a]=D.useState(!0);return(0,O.jsxs)(h,{gap:3,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Settings`}),(0,O.jsx)(u,{}),(0,O.jsx)(b,{label:`Notifications`,description:`Receive push notifications`,value:e,onChange:t}),(0,O.jsx)(b,{label:`Dark mode`,description:`Use dark color theme`,value:n,onChange:r}),(0,O.jsx)(b,{label:`Sounds`,description:`Play sounds for actions`,value:i,onChange:a})]})}function E({onApply:e}){let[t,n]=D.useState({active:!0,archived:!1,drafts:!0,shared:!1}),r=e=>n(t=>({...t,[e]:!t[e]}));return(0,O.jsxs)(h,{gap:3,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Filter by status`}),(0,O.jsx)(u,{}),(0,O.jsx)(v,{label:`Active`,value:t.active,onChange:()=>r(`active`)}),(0,O.jsx)(v,{label:`Archived`,value:t.archived,onChange:()=>r(`archived`)}),(0,O.jsx)(v,{label:`Drafts`,value:t.drafts,onChange:()=>r(`drafts`)}),(0,O.jsx)(v,{label:`Shared with me`,value:t.shared,onChange:()=>r(`shared`)}),(0,O.jsx)(u,{}),(0,O.jsxs)(p,{gap:2,hAlign:`end`,children:[(0,O.jsx)(s,{label:`Apply`,variant:`primary`,onClick:e,children:`Apply`}),(0,O.jsx)(s,{label:`Reset`,variant:`ghost`,onClick:()=>n({active:!0,archived:!1,drafts:!0,shared:!1}),children:`Reset`})]})]})}function he({onConfirm:e,onCancel:t}){return(0,O.jsxs)(h,{gap:3,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Delete project?`}),(0,O.jsx)(a,{type:`body`,children:`This will permanently delete the project and all its data. This action cannot be undone.`}),(0,O.jsxs)(p,{gap:2,hAlign:`end`,children:[(0,O.jsx)(s,{label:`Delete`,variant:`destructive`,onClick:e,children:`Delete`}),(0,O.jsx)(s,{label:`Cancel`,variant:`ghost`,onClick:t,children:`Cancel`})]})]})}function ge(){let[e,t]=D.useState(``);return(0,O.jsxs)(h,{gap:3,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Add a note`}),(0,O.jsx)(x,{label:`Title`,placeholder:`Short title`,value:e,onChange:t}),(0,O.jsx)(u,{}),K.map(e=>(0,O.jsx)(a,{children:e},e)),(0,O.jsx)(s,{label:`Save note`,variant:`primary`,children:`Save note`})]})}function _e(){let[e,t]=D.useState(``);return(0,O.jsx)(`div`,{style:{marginTop:16,maxWidth:320},children:(0,O.jsx)(x,{label:`Search notes`,placeholder:`Search`,value:e,onChange:t})})}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{D=e(n()),ee(),re(),o(),S(),le(),se(),oe(),m(),f(),i(),c(),y(),de(),ce(),ne(),ie(),O=r(),k={title:`Core/Popover`,component:d,tags:[`autodocs`],argTypes:{placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Position relative to trigger`},alignment:{control:`select`,options:[`start`,`center`,`end`],description:`Alignment on placement axis`},isEnabled:{control:`boolean`,description:`Enable/disable the popover`}}},A=[{id:`owner`,label:`Assign owner`,description:`Route follow-up to a teammate.`},{id:`label`,label:`Add label`,description:`Group this item with related work.`},{id:`due-date`,label:`Set due date`,description:`Pick a lightweight reminder for review.`}],j=[[`Apollo launch`,`Marketing · 12 open tasks`],[`Customer insights`,`Research · 8 open tasks`],[`Design systems`,`Platform · 24 open tasks`],[`Growth experiments`,`Product · 6 open tasks`],[`Incident review`,`Operations · 4 open tasks`],[`Mobile quality`,`Engineering · 15 open tasks`],[`Quarterly planning`,`Strategy · 9 open tasks`],[`Recruiting plan`,`People · 7 open tasks`],[`Security follow-up`,`Trust · 3 open tasks`],[`Website refresh`,`Brand · 11 open tasks`]],M={oversizedTrigger:{kzqmXN:`x11i3ho8`,$$css:!0},boundedPopoverContent:{kskxy:`x1nsf087`,$$css:!0},evidenceCopy:{ks0D6T:`x1lwm3bp`,kHjlTd:`xj0a0fe`,$$css:!0},actionList:{kzqmXN:`xh8yej3`,$$css:!0}},N={args:{placement:`below`,label:`Settings`,width:280,content:(0,O.jsx)(T,{}),children:(0,O.jsx)(s,{label:`Settings`,children:`Settings`})}},P={render:function(){let[e,t]=D.useState(!1);return(0,O.jsx)(d,{placement:`below`,label:`Filter`,width:240,isOpen:e,onOpenChange:t,content:(0,O.jsx)(E,{onApply:()=>t(!1)}),children:(0,O.jsx)(s,{label:`Filter`,children:`Filter`})})}},F={render:function(){let[e,t]=D.useState(!1);return(0,O.jsx)(d,{placement:`below`,label:`Confirm deletion`,width:300,isOpen:e,onOpenChange:t,content:(0,O.jsx)(he,{onConfirm:()=>t(!1),onCancel:()=>t(!1)}),children:(0,O.jsx)(s,{label:`Delete project`,variant:`destructive`,children:`Delete project`})})}},I={render:function(){let e=D.useRef(null);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(s,{ref:e,label:`Anchor button`,children:`Anchor button`}),(0,O.jsx)(d,{anchorRef:e,label:`Sibling popover`,width:260,placement:`below`,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Sibling mode`}),(0,O.jsx)(a,{type:`body`,children:`This popover uses anchorRef to attach to the button as a sibling, without wrapping it.`})]})})]})}},L={render:()=>(0,O.jsx)(`div`,{style:{paddingTop:200},children:(0,O.jsx)(d,{placement:`above`,label:`Info`,width:260,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Keyboard shortcuts`}),(0,O.jsx)(u,{}),(0,O.jsxs)(p,{gap:3,children:[(0,O.jsx)(a,{type:`body`,weight:`bold`,children:`⌘K`}),(0,O.jsx)(a,{type:`body`,children:`Command palette`})]}),(0,O.jsxs)(p,{gap:3,children:[(0,O.jsx)(a,{type:`body`,weight:`bold`,children:`⌘/`}),(0,O.jsx)(a,{type:`body`,children:`Toggle sidebar`})]}),(0,O.jsxs)(p,{gap:3,children:[(0,O.jsx)(a,{type:`body`,weight:`bold`,children:`⌘.`}),(0,O.jsx)(a,{type:`body`,children:`Quick actions`})]})]}),children:(0,O.jsx)(s,{label:`Shortcuts`,children:`Shortcuts`})})})},R={args:{placement:`below`,label:`Disabled popover`,isEnabled:!1,content:(0,O.jsx)(a,{type:`body`,children:`This should not appear.`}),children:(0,O.jsx)(s,{label:`Disabled popover`,isDisabled:!0,children:`Disabled`})}},z={render:()=>(0,O.jsx)(d,{placement:`below`,label:`Token options`,width:220,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Filter options`}),(0,O.jsx)(u,{}),(0,O.jsx)(a,{type:`body`,children:`The token automatically renders as a button via context.`})]}),children:(0,O.jsx)(fe,{label:`Status: Active`,icon:`filter`})})},B={render:()=>(0,O.jsx)(d,{placement:`below`,label:`Link actions`,width:220,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Quick actions`}),(0,O.jsx)(u,{}),(0,O.jsx)(a,{type:`body`,children:`Link without href renders as a button, suitable for triggers.`})]}),children:(0,O.jsx)(ue,{children:`More options`})})},V={render:()=>(0,O.jsx)(d,{placement:`below`,label:`Custom trigger`,width:260,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Custom trigger`}),(0,O.jsx)(u,{}),(0,O.jsx)(a,{type:`body`,children:`The render prop gives full control over the trigger element.`})]}),children:e=>(0,O.jsx)(`button`,{ref:e.ref,onClick:e.onClick,"aria-haspopup":e[`aria-haspopup`],"aria-expanded":e[`aria-expanded`],"aria-controls":e[`aria-controls`],style:{padding:`8px 16px`,border:`1px dashed currentColor`,borderRadius:4,background:`transparent`,cursor:`pointer`},children:`Custom trigger element`})})},H={name:`Match-trigger viewport fit`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{story:{inline:!1,height:`844px`},description:{story:`Uses the actual Storybook viewport. The real trigger is intentionally 640px wide, while Popover keeps its default match-trigger sizing; the preference is clamped by the layer runtime’s viewport cap (spec:AST-059 FR7) instead of inheriting the full trigger width.`}}},render:()=>(0,O.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,O.jsx)(d,{placement:`below`,alignment:`start`,label:`Match-trigger viewport evidence`,"data-testid":`match-trigger-popover`,content:(0,O.jsxs)(h,{gap:2,xstyle:M.evidenceCopy,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Match-trigger sizing`}),(0,O.jsx)(a,{type:`body`,children:`The anchor is wider than this viewport, but the Popover stays inside the available inline space.`})]}),children:(0,O.jsx)(s,{label:`Oversized match-width trigger`,xstyle:M.oversizedTrigger,children:`Oversized match-width trigger`})})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},U={name:`Tall content overflow`,parameters:{layout:`fullscreen`,viewport:{defaultViewport:`mobile1`},docs:{story:{inline:!1,height:`844px`},description:{story:`Uses the actual Storybook viewport and a realistic project picker. The product-level 360px/50dvh cap keeps this lightweight anchored surface compact, while Popover detects the overflow and makes its content scrollable. Scrolling demonstrates bounded overflow handling; it does not by itself determine whether another presentation is more appropriate.`}}},render:()=>(0,O.jsx)(w,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},W={name:`Read-only dialog focus`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`Manual assistive-technology check for a dialog-style Popover with no content controls. On open, the labeled dialog container receives focus without revealing the fallback close button. Confirm the dialog name and role are announced, Tab reaches Close popover, Shift+Tab remains contained, Escape closes, and focus returns to the trigger.`}}},render:()=>(0,O.jsx)(d,{placement:`below`,label:`Deployment status`,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,children:`Deployment status`}),(0,O.jsx)(a,{type:`body`,children:`The latest production deployment completed successfully.`})]}),children:(0,O.jsx)(s,{label:`View deployment status`,children:`View deployment status`})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},G={name:`Trigger Interaction Evidence`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`Desktop Storybook interaction evidence: the native button trigger opens the popover without hover. Use real touch/iOS evidence before claiming mobile Safari behavior.`}}},render:()=>(0,O.jsx)(d,{placement:`below`,label:`Interaction evidence`,content:(0,O.jsxs)(h,{gap:2,children:[(0,O.jsx)(l,{level:4,tabIndex:-1,children:`Interaction evidence`}),(0,O.jsx)(a,{type:`body`,children:`Opened by trigger activation; Escape, outside press, and focus return are covered by unit tests.`})]}),children:(0,O.jsx)(s,{label:`Open interaction evidence`,children:`Open interaction evidence`})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},K=[`Notes are shared with everyone on the project.`,`Mention a teammate to send them the note.`,`Pin a note to keep it at the top of the list.`,`Notes older than a year are archived.`,`Attach a file by dropping it on the note.`,`Use a short title: it is what the list shows.`],q={name:`Keyboard Avoidance`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`A tall popover with a text field. On a phone, the field brings up the software keyboard; the popover keeps its top and stays clear of the keyboard, as a popover on iOS does. Search notes, below the trigger, brings the keyboard up before the popover opens: it then opens clear of the keyboard.`}}},render:()=>(0,O.jsxs)(`div`,{style:{padding:16},children:[(0,O.jsx)(d,{label:`Add a note`,width:320,content:(0,O.jsx)(ge,{}),children:(0,O.jsx)(s,{label:`Add note`,children:`Add note`})}),(0,O.jsx)(_e,{})]})},J={name:`Keep Popover Presentation`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`Keep Popover for anchored, compact supplemental details and actions. The trigger is click/tap activated, not hover dependent, and the compact surface keeps context near the trigger.`}}},render:()=>(0,O.jsx)(C,{presentation:`popover`}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},Y={name:`BottomSheet Presentation Option`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`This story shows BottomSheet as an explicit alternative for the same focused task when a product wants a bottom-edge modal touch surface. It changes the contract: dialog focus ownership, scrim behavior, Escape handling, swipe-to-dismiss, and sheet body scrolling differ from Popover.`}}},render:()=>(0,O.jsx)(C,{presentation:`bottom-sheet`}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},X={name:`Adaptive Presentation`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`presentation="adaptive": on a compact touch screen (a phone) the content is presented in a BottomSheet, the way iOS presents a popover on an iPhone; with a mouse or on a larger screen it stays anchored to its trigger.`}}},render:()=>(0,O.jsx)(`div`,{style:{padding:16},children:(0,O.jsx)(d,{label:`Filter by status`,presentation:`adaptive`,width:280,content:(0,O.jsx)(E,{}),children:(0,O.jsx)(s,{label:`Filter`,children:`Filter`})})})},Z={name:`Adaptive Popover Recipe`,args:{presentation:`popover`,touchPresentation:`bottom-sheet`},argTypes:{presentation:{control:`select`,options:[`popover`,`bottom-sheet`],description:`Deterministic review/test override for the presentation used by this recipe story.`},touchPresentation:{control:`select`,options:[`popover`,`bottom-sheet`],description:`Opt-in touch presentation. If a consumer omits the deterministic presentation override, the recipe may choose BottomSheet only for compact + coarse pointer + no hover.`}},parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`844px`},description:{story:`Story-local recipe only: Core Popover does not silently adapt. Products opt in with touchPresentation="bottom-sheet" and can force presentation="popover" or presentation="bottom-sheet" for review and tests.`}}},render:e=>(0,O.jsx)(C,{...e}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'below',
    label: 'Settings',
    width: 280,
    content: <SettingsContent />,
    children: <Button label="Settings">Settings</Button>
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: function FilterPanelStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return <Popover placement="below" label="Filter" width={240} isOpen={isOpen} onOpenChange={setIsOpen} content={<FilterContent onApply={() => setIsOpen(false)} />}>
        <Button label="Filter">Filter</Button>
      </Popover>;
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: function ConfirmationStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return <Popover placement="below" label="Confirm deletion" width={300} isOpen={isOpen} onOpenChange={setIsOpen} content={<ConfirmContent onConfirm={() => setIsOpen(false)} onCancel={() => setIsOpen(false)} />}>
        <Button label="Delete project" variant="destructive">
          Delete project
        </Button>
      </Popover>;
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: function AnchorRefStory() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    return <>
        <Button ref={buttonRef} label="Anchor button">
          Anchor button
        </Button>
        <Popover anchorRef={buttonRef as React.RefObject<HTMLElement>} label="Sibling popover" width={260} placement="below" content={<VStack gap={2}>
              <Heading level={4} tabIndex={-1}>
                Sibling mode
              </Heading>
              <Text type="body">
                This popover uses anchorRef to attach to the button as a
                sibling, without wrapping it.
              </Text>
            </VStack>} />
      </>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    paddingTop: 200
  }}>
      <Popover placement="above" label="Info" width={260} content={<VStack gap={2}>
            <Heading level={4} tabIndex={-1}>
              Keyboard shortcuts
            </Heading>
            <Divider />
            <HStack gap={3}>
              <Text type="body" weight="bold">
                ⌘K
              </Text>
              <Text type="body">Command palette</Text>
            </HStack>
            <HStack gap={3}>
              <Text type="body" weight="bold">
                ⌘/
              </Text>
              <Text type="body">Toggle sidebar</Text>
            </HStack>
            <HStack gap={3}>
              <Text type="body" weight="bold">
                ⌘.
              </Text>
              <Text type="body">Quick actions</Text>
            </HStack>
          </VStack>}>
        <Button label="Shortcuts">Shortcuts</Button>
      </Popover>
    </div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'below',
    label: 'Disabled popover',
    isEnabled: false,
    content: <Text type="body">This should not appear.</Text>,
    children: <Button label="Disabled popover" isDisabled>
        Disabled
      </Button>
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Popover placement="below" label="Token options" width={220} content={<VStack gap={2}>
          <Heading level={4} tabIndex={-1}>
            Filter options
          </Heading>
          <Divider />
          <Text type="body">
            The token automatically renders as a button via context.
          </Text>
        </VStack>}>
      <Token label="Status: Active" icon="filter" />
    </Popover>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <Popover placement="below" label="Link actions" width={220} content={<VStack gap={2}>
          <Heading level={4} tabIndex={-1}>
            Quick actions
          </Heading>
          <Divider />
          <Text type="body">
            Link without href renders as a button, suitable for triggers.
          </Text>
        </VStack>}>
      <Link>More options</Link>
    </Popover>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <Popover placement="below" label="Custom trigger" width={260} content={<VStack gap={2}>
          <Heading level={4} tabIndex={-1}>
            Custom trigger
          </Heading>
          <Divider />
          <Text type="body">
            The render prop gives full control over the trigger element.
          </Text>
        </VStack>}>
      {(triggerProps: PopoverTriggerRenderProps) => <button ref={triggerProps.ref} onClick={triggerProps.onClick} aria-haspopup={triggerProps['aria-haspopup']} aria-expanded={triggerProps['aria-expanded']} aria-controls={triggerProps['aria-controls']} style={{
      padding: '8px 16px',
      border: '1px dashed currentColor',
      borderRadius: 4,
      background: 'transparent',
      cursor: 'pointer'
    }}>
          Custom trigger element
        </button>}
    </Popover>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Match-trigger viewport fit',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'Uses the actual Storybook viewport. The real trigger is intentionally 640px wide, while Popover keeps its default match-trigger sizing; the preference is clamped by the layer runtime\\u2019s viewport cap (spec:AST-059 FR7) instead of inheriting the full trigger width.'
      }
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <Popover placement="below" alignment="start" label="Match-trigger viewport evidence" data-testid="match-trigger-popover" content={<VStack gap={2} xstyle={readinessStyles.evidenceCopy}>
            <Heading level={4} tabIndex={-1}>
              Match-trigger sizing
            </Heading>
            <Text type="body">
              The anchor is wider than this viewport, but the Popover stays
              inside the available inline space.
            </Text>
          </VStack>}>
        <Button label="Oversized match-width trigger" xstyle={readinessStyles.oversizedTrigger}>
          Oversized match-width trigger
        </Button>
      </Popover>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Tall content overflow',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'Uses the actual Storybook viewport and a realistic project picker. The product-level 360px/50dvh cap keeps this lightweight anchored surface compact, while Popover detects the overflow and makes its content scrollable. Scrolling demonstrates bounded overflow handling; it does not by itself determine whether another presentation is more appropriate.'
      }
    }
  },
  render: () => <TallContentOverflowExample />,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Read-only dialog focus',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'Manual assistive-technology check for a dialog-style Popover with no content controls. On open, the labeled dialog container receives focus without revealing the fallback close button. Confirm the dialog name and role are announced, Tab reaches Close popover, Shift+Tab remains contained, Escape closes, and focus returns to the trigger.'
      }
    }
  },
  render: () => <Popover placement="below" label="Deployment status" content={<VStack gap={2}>
          <Heading level={4}>Deployment status</Heading>
          <Text type="body">
            The latest production deployment completed successfully.
          </Text>
        </VStack>}>
      <Button label="View deployment status">View deployment status</Button>
    </Popover>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Trigger Interaction Evidence',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'Desktop Storybook interaction evidence: the native button trigger opens the popover without hover. Use real touch/iOS evidence before claiming mobile Safari behavior.'
      }
    }
  },
  render: () => <Popover placement="below" label="Interaction evidence" content={<VStack gap={2}>
          <Heading level={4} tabIndex={-1}>
            Interaction evidence
          </Heading>
          <Text type="body">
            Opened by trigger activation; Escape, outside press, and focus
            return are covered by unit tests.
          </Text>
        </VStack>}>
      <Button label="Open interaction evidence">
        Open interaction evidence
      </Button>
    </Popover>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...G.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Keyboard Avoidance',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'A tall popover with a text field. On a phone, the field brings up the software keyboard; the popover keeps its top and stays clear of the keyboard, as a popover on iOS does. Search notes, below the trigger, brings the keyboard up before the popover opens: it then opens clear of the keyboard.'
      }
    }
  },
  render: () => <div style={{
    padding: 16
  }}>
      <Popover label="Add a note" width={320} content={<NoteContent />}>
        <Button label="Add note">Add note</Button>
      </Popover>
      <SearchNotesField />
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Keep Popover Presentation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'Keep Popover for anchored, compact supplemental details and actions. The trigger is click/tap activated, not hover dependent, and the compact surface keeps context near the trigger.'
      }
    }
  },
  render: () => <ProjectActionSurface presentation="popover" />,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'BottomSheet Presentation Option',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'This story shows BottomSheet as an explicit alternative for the same focused task when a product wants a bottom-edge modal touch surface. It changes the contract: dialog focus ownership, scrim behavior, Escape handling, swipe-to-dismiss, and sheet body scrolling differ from Popover.'
      }
    }
  },
  render: () => <ProjectActionSurface presentation="bottom-sheet" />,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Adaptive Presentation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'presentation="adaptive": on a compact touch screen (a phone) the content is presented in a BottomSheet, the way iOS presents a popover on an iPhone; with a mouse or on a larger screen it stays anchored to its trigger.'
      }
    }
  },
  render: () => <div style={{
    padding: 16
  }}>
      <Popover label="Filter by status" presentation="adaptive" width={280} content={<FilterContent />}>
        <Button label="Filter">Filter</Button>
      </Popover>
    </div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Adaptive Popover Recipe',
  args: {
    presentation: 'popover',
    touchPresentation: 'bottom-sheet'
  },
  argTypes: {
    presentation: {
      control: 'select',
      options: ['popover', 'bottom-sheet'],
      description: 'Deterministic review/test override for the presentation used by this recipe story.'
    },
    touchPresentation: {
      control: 'select',
      options: ['popover', 'bottom-sheet'],
      description: 'Opt-in touch presentation. If a consumer omits the deterministic presentation override, the recipe may choose BottomSheet only for compact + coarse pointer + no hover.'
    }
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '844px'
      },
      description: {
        story: 'Story-local recipe only: Core Popover does not silently adapt. Products opt in with touchPresentation="bottom-sheet" and can force presentation="popover" or presentation="bottom-sheet" for review and tests.'
      }
    }
  },
  render: args => <ProjectActionSurface {...args} />,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...Z.parameters?.docs?.source}}},Q=[`Default`,`FilterPanel`,`Confirmation`,`AnchorRef`,`Above`,`Disabled`,`TokenTrigger`,`LinkTrigger`,`RenderProp`,`MatchTriggerViewportFit`,`TallContentOverflow`,`ReadOnlyDialogFocus`,`TriggerInteractionEvidence`,`KeyboardAvoidance`,`KeepPopoverPresentation`,`BottomSheetPresentationOption`,`AdaptivePresentation`,`AdaptivePopoverRecipe`]})))()}$();export{L as Above,Z as AdaptivePopoverRecipe,X as AdaptivePresentation,I as AnchorRef,Y as BottomSheetPresentationOption,F as Confirmation,N as Default,R as Disabled,P as FilterPanel,J as KeepPopoverPresentation,q as KeyboardAvoidance,B as LinkTrigger,H as MatchTriggerViewportFit,W as ReadOnlyDialogFocus,V as RenderProp,U as TallContentOverflow,z as TokenTrigger,G as TriggerInteractionEvidence,Q as __namedExportsOrder,k as default};