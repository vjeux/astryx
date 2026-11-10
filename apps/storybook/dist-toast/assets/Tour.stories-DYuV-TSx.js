import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./Text-C5BHw0wv.js";import{n as s,t as c}from"./Button-DoGM0DEN.js";import{n as l,t as u}from"./Heading-YiIeUtHm.js";import{n as d,t as f}from"./Popover-CgJiFJLM.js";import{n as p,t as m}from"./HStack-D5idGciI.js";import{n as h,t as g}from"./VStack-SWtDePqc.js";import{c as _,o as v}from"./iframe-B7UFaprG.js";var y,b;function x(){return(x=e((()=>{y=t(),b=(0,y.createContext)(null)})))()}function S({isActive:e,children:t,onDismiss:n,hasBackdrop:r=!1,isStepCountShown:i=!1}){let[a,o]=(0,C.useState)([]),[s,c]=(0,C.useState)(0),l=(0,C.useCallback)(e=>(o(t=>t.includes(e)?t:[...t,e]),()=>{o(t=>t.filter(t=>t!==e))}),[]),[u,d]=(0,C.useState)(e);Object.is(u,e)||(d(e),e||c(0));let f=a.length,p=(0,C.useCallback)(()=>{s<f-1?c(s+1):n(`complete`)},[s,f,n]),m=(0,C.useCallback)(()=>{c(e=>e>0?e-1:e)},[]),h=e?a[s]??null:null,g=(0,C.useMemo)(()=>({registerStep:l,activeStepId:h,activeStepIndex:s,stepCount:f,isStepCountShown:i,hasBackdrop:r,onNext:p,onPrevious:m,onDismiss:n}),[l,h,s,f,i,r,p,m,n]);return(0,w.jsx)(b.Provider,{value:g,children:t})}var C,w;function T(){return(T=e((()=>{C=t(),x(),w=n(),S.displayName=`Tour`,S.__docgenInfo={description:`Controller for a guided product tour. Renders no chrome; coordinates the
active step among its \`<TourStep>\` children.

@example
\`\`\`
const [isActive, setIsActive] = useState(true);
const saveRef = useRef(null);
const shareRef = useRef(null);
<Tour isActive={isActive} hasBackdrop isStepCountShown onDismiss={() => setIsActive(false)}>
  <TourStep targetRef={saveRef} heading="Save your work">
    Changes save automatically to the cloud.
  </TourStep>
  <TourStep targetRef={shareRef} heading="Share it">
    Invite teammates from here.
  </TourStep>
</Tour>
\`\`\``,methods:[],displayName:`Tour`,props:{isActive:{required:!0,tsType:{name:`boolean`},description:`Whether the tour is running. When false, nothing renders and step state
resets — the tour restarts from the first step next time it becomes active.
(Controlled: the consumer owns "has this user seen the tour?".)`},children:{required:!1,tsType:{name:`ReactNode`},description:"The tour's steps — `<TourStep>` elements. Step order is taken from their\norder here; only the active step renders its callout."},onDismiss:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(source: TourDismissSource) => void`,signature:{arguments:[{type:{name:`union`,raw:`'backdrop' | 'escape' | 'close' | 'skip' | 'complete'`,elements:[{name:`literal`,value:`'backdrop'`},{name:`literal`,value:`'escape'`},{name:`literal`,value:`'close'`},{name:`literal`,value:`'skip'`},{name:`literal`,value:`'complete'`}]},name:`source`}],return:{name:`void`}}},description:"Called when the tour is dismissed, with the reason. Fires for every exit,\nincluding completing the last step (`source === 'complete'`). The consumer\nflips `isActive` to false in response, and can branch on the source to tell\na successful finish apart from an early skip/backdrop/escape."},hasBackdrop:{required:!1,tsType:{name:`boolean`},description:`Dim the page around the active step's target (a spotlight cutout — the
target stays lit, everything else darkens). Use for modal-style steps that
demand focus; leave off for a lightweight coachmark that only rings the
target.
@default false`,defaultValue:{value:`false`,computed:!1}},isStepCountShown:{required:!1,tsType:{name:`boolean`},description:`Show the step count ("2 of 5") in each step.
@default false`,defaultValue:{value:`false`,computed:!1}}}}})))()}function E({rect:e,hasBackdrop:t,onBackdropClick:n}){let r=(0,O.useRef)(null);return A(()=>{let e=r.current;if(e!=null&&typeof e.showPopover==`function`)return e.showPopover(),()=>{e.isConnected&&typeof e.hidePopover==`function`&&e.hidePopover()}},[]),(0,k.jsx)(`div`,{ref:r,popover:`manual`,"data-testid":t?`tour-backdrop`:void 0,"aria-hidden":`true`,onClick:t?n:void 0,...{0:{className:`astryxixxii4 astryx10a8y8t astryx1ghz6dp astryx1717udv astryxc342km astryxng3xce astryxjbqb8w astryx1rea2x4 astryx47corl`},1:{className:`astryxixxii4 astryx10a8y8t astryx1ghz6dp astryx1717udv astryxc342km astryxng3xce astryxjbqb8w astryx1rea2x4 astryx67bb7w`}}[!!t|0],children:(0,k.jsx)(`div`,{"data-testid":`tour-highlight`,...{0:{className:`astryx10l6tqk astryx47corl astryxr5mita astryx1gfj591 astryxuedmi6 astryxlr8y92`},2:{className:`astryx10l6tqk astryx47corl astryx1gfj591 astryxuedmi6 astryxlr8y92 astryxefcaua`},1:{className:`astryx10l6tqk astryx47corl astryxr5mita astryx1gfj591 astryxuedmi6 astryxlr8y92 astryxg01cxk`},3:{className:`astryx10l6tqk astryx47corl astryx1gfj591 astryxuedmi6 astryxlr8y92 astryxefcaua astryxg01cxk`}}[!!t<<1|e==null],style:e==null?void 0:{top:e.top-j,left:e.left-j,width:e.width+8,height:e.height+8,borderRadius:e.radius}})})}function D({targetRef:e,heading:t,children:n,placement:r=`below`,alignment:i=`start`,"data-testid":a}){let s=(0,O.useContext)(b),l=(0,O.useId)(),d=s!=null&&s.activeStepId===l,[p,h]=(0,O.useState)(null);if((0,O.useEffect)(()=>{if(s!=null)return s.registerStep(l)},[s,l]),(0,O.useEffect)(()=>{let t=e.current;if(t==null||!d){h(null);return}let n=()=>{let e=t.getBoundingClientRect();h({top:e.top,left:e.left,width:e.width,height:e.height,radius:getComputedStyle(t).borderRadius||`0px`})};return n(),window.addEventListener(`scroll`,n,!0),window.addEventListener(`resize`,n),()=>{window.removeEventListener(`scroll`,n,!0),window.removeEventListener(`resize`,n),h(null)}},[e,d]),s==null||!d)return null;let{activeStepIndex:_,stepCount:v,isStepCountShown:y,hasBackdrop:x,onNext:S,onPrevious:C,onDismiss:w}=s,T=_<=0,D=v>0&&_===v-1,A=(0,k.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryxjcht0a astryx1va8c73`,"data-testid":a,children:[(0,k.jsxs)(g,{gap:1,children:[(0,k.jsx)(u,{level:4,children:t}),n!=null&&(0,k.jsx)(o,{type:`body`,children:n})]}),(0,k.jsxs)(m,{gap:2,xstyle:M.footer,children:[y&&v>0?(0,k.jsx)(o,{type:`supporting`,color:`secondary`,children:`${_+1} of ${v}`}):(0,k.jsx)(`span`,{}),(0,k.jsxs)(m,{gap:2,children:[!T&&(0,k.jsx)(c,{variant:`ghost`,size:`sm`,label:`Back`,onClick:C}),(0,k.jsx)(c,{variant:`primary`,size:`sm`,label:D?`Done`:`Next`,onClick:S})]})]})]});return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(E,{rect:p,hasBackdrop:x,onBackdropClick:()=>w(`backdrop`)}),(0,k.jsx)(f,{anchorRef:e,isOpen:!0,onOpenChange:e=>{e||w(`close`)},placement:r,alignment:i,width:`fit-content`,xstyle:N[r],label:typeof t==`string`?t:`Tour step`,hasCloseButton:!0,closeButtonLabel:`Close tour`,content:A})]})}var O,k,A,j,M,N;function P(){return(P=e((()=>{O=t(),d(),s(),a(),l(),h(),p(),x(),k=n(),A=typeof window<`u`?O.useLayoutEffect:O.useEffect,j=4,M={footer:{kGNEyG:`astryx6s0dn4`,kjj79g:`astryx1qughib`,$$css:!0},calloutGapBelow:{keoZOQ:`astryxtbrsbv`,$$css:!0},calloutGapAbove:{k1K539:`astryx1p37lm5`,$$css:!0},calloutGapStart:{k71WvV:`astryx1pezmd8`,koQZXg:null,km5ZXQ:null,$$css:!0},calloutGapEnd:{keTefX:`astryx1cmpsy9`,koQZXg:null,km5ZXQ:null,$$css:!0}},N={below:M.calloutGapBelow,above:M.calloutGapAbove,start:M.calloutGapStart,end:M.calloutGapEnd},D.displayName=`TourStep`,D.__docgenInfo={description:`A single spotlight step within a \`<Tour>\`. Renders its callout only while
active.

@example
\`\`\`
<TourStep targetRef={saveRef} heading="Save your work">
  Changes save automatically.
</TourStep>
\`\`\``,methods:[],displayName:`TourStep`,props:{targetRef:{required:!0,tsType:{name:`ReactRefObject`,raw:`React.RefObject<HTMLElement | null>`,elements:[{name:`union`,raw:`HTMLElement | null`,elements:[{name:`HTMLElement`},{name:`null`}]}]},description:'Ref to the element this step points at. The callout anchors to it (like a\nPopover trigger); it must be a `<button>` or `[role="button"]` element,\nmatching Popover\'s `anchorRef` contract. Accepts a ref to any HTMLElement\nsubtype (e.g. `useRef<HTMLButtonElement>(null)`).'},heading:{required:!0,tsType:{name:`ReactNode`},description:`Step heading.`},children:{required:!1,tsType:{name:`ReactNode`},description:`Step body content.`},placement:{required:!1,tsType:{name:`union`,raw:`'above' | 'below' | 'start' | 'end'`,elements:[{name:`literal`,value:`'above'`},{name:`literal`,value:`'below'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Which side of the target the callout sits on.
@default 'below'`,defaultValue:{value:`'below'`,computed:!1}},alignment:{required:!1,tsType:{name:`union`,raw:`'start' | 'center' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`}]},description:"How the callout aligns along the placement side — e.g. with `placement=\"below\"`,\n`start` left-aligns it under the target, `center` centers it, `end` right-aligns it.\n@default 'start'",defaultValue:{value:`'start'`,computed:!1}},"data-testid":{required:!1,tsType:{name:`string`},description:`Test id applied to the callout content.`}}}})))()}var F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{F=t(),T(),P(),s(),l(),p(),h(),a(),_(),i(),I=n(),L={title:`Lab/Tour`,component:S,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[e=>(0,I.jsx)(`div`,{style:{minHeight:480,padding:32},children:(0,I.jsx)(e,{})})]},R={render:()=>{let[e,t]=(0,F.useState)(!1),n=(0,F.useRef)(null),r=(0,F.useRef)(null),i=(0,F.useRef)(null);return(0,I.jsxs)(g,{gap:4,children:[(0,I.jsxs)(m,{gap:2,children:[(0,I.jsx)(c,{ref:n,variant:`secondary`,label:`Save`}),(0,I.jsx)(c,{ref:r,variant:`secondary`,label:`Share`}),(0,I.jsx)(c,{ref:i,variant:`secondary`,label:`Settings`})]}),(0,I.jsx)(c,{label:`Start tour`,onClick:()=>t(!0)}),(0,I.jsxs)(S,{isActive:e,hasBackdrop:!0,isStepCountShown:!0,onDismiss:()=>t(!1),children:[(0,I.jsx)(D,{targetRef:n,heading:`Save your work`,children:`Changes save automatically to the cloud as you go.`}),(0,I.jsx)(D,{targetRef:r,heading:`Share with your team`,children:`Invite teammates and manage access from here.`}),(0,I.jsx)(D,{targetRef:i,heading:`Tune your setup`,children:`Adjust preferences and defaults in Settings.`})]})]})}},z={render:()=>{let[e,t]=(0,F.useState)(!1),n=(0,F.useRef)(null);return(0,I.jsxs)(g,{gap:4,children:[(0,I.jsx)(u,{level:3,children:`Feature callout`}),(0,I.jsx)(o,{type:`body`,children:`A single-step tour with no dimmed background — a lightweight coachmark.`}),(0,I.jsx)(c,{ref:n,variant:`secondary`,label:`New feature`}),(0,I.jsx)(c,{label:`Highlight it`,onClick:()=>t(!0)}),(0,I.jsx)(S,{isActive:e,onDismiss:()=>t(!1),children:(0,I.jsx)(D,{targetRef:n,heading:`Try the new feature`,placement:`below`,children:`We just shipped this — click to explore.`})})]})}},B=r({name:`tour-magenta-demo`,tokens:{"--color-accent":[`#D6006E`,`#FF4FA3`]}}),V={name:`Themed ring (scoped theme)`,render:()=>{let[e,t]=(0,F.useState)(!1),n=(0,F.useRef)(null);return(0,I.jsx)(v,{theme:B,mode:`light`,children:(0,I.jsxs)(g,{gap:4,children:[(0,I.jsx)(u,{level:3,children:`Scoped theme`}),(0,I.jsx)(o,{type:`body`,children:`This subtree uses a scoped theme with a magenta accent. The highlight ring picks it up because the overlay is promoted in place, inside the Theme — not portaled to the body.`}),(0,I.jsx)(c,{ref:n,variant:`secondary`,label:`New feature`}),(0,I.jsx)(c,{label:`Highlight it`,onClick:()=>t(!0)}),(0,I.jsx)(S,{isActive:e,hasBackdrop:!0,onDismiss:()=>t(!1),children:(0,I.jsx)(D,{targetRef:n,heading:`Themed highlight`,children:`The ring uses this theme's accent color.`})})]})})}},H={name:`Placement & alignment`,argTypes:{placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Which side of the target the callout sits on`},alignment:{control:`select`,options:[`start`,`center`,`end`],description:`How the callout aligns along the placement side`}},args:{placement:`below`,alignment:`center`},render:({placement:e,alignment:t})=>{let[n,r]=(0,F.useState)(!0),i=(0,F.useRef)(null);return(0,I.jsxs)(g,{gap:4,align:`center`,justify:`center`,style:{minHeight:460},children:[(0,I.jsx)(c,{ref:i,variant:`secondary`,label:`Target`}),!n&&(0,I.jsx)(c,{label:`Show step`,onClick:()=>r(!0)}),(0,I.jsx)(S,{isActive:n,onDismiss:()=>r(!1),children:(0,I.jsxs)(D,{targetRef:i,heading:`Positioned callout`,placement:e,alignment:t,children:[`placement="`,e,`" · alignment="`,t,`"`]})})]})}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isActive, setIsActive] = useState(false);
    const saveRef = useRef<HTMLButtonElement>(null);
    const shareRef = useRef<HTMLButtonElement>(null);
    const settingsRef = useRef<HTMLButtonElement>(null);
    return <VStack gap={4}>
        <HStack gap={2}>
          <Button ref={saveRef} variant="secondary" label="Save" />
          <Button ref={shareRef} variant="secondary" label="Share" />
          <Button ref={settingsRef} variant="secondary" label="Settings" />
        </HStack>

        <Button label="Start tour" onClick={() => setIsActive(true)} />

        <Tour isActive={isActive} hasBackdrop isStepCountShown onDismiss={() => setIsActive(false)}>
          <TourStep targetRef={saveRef} heading="Save your work">
            Changes save automatically to the cloud as you go.
          </TourStep>
          <TourStep targetRef={shareRef} heading="Share with your team">
            Invite teammates and manage access from here.
          </TourStep>
          <TourStep targetRef={settingsRef} heading="Tune your setup">
            Adjust preferences and defaults in Settings.
          </TourStep>
        </Tour>
      </VStack>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isActive, setIsActive] = useState(false);
    const targetRef = useRef<HTMLButtonElement>(null);
    return <VStack gap={4}>
        <Heading level={3}>Feature callout</Heading>
        <Text type="body">
          A single-step tour with no dimmed background — a lightweight
          coachmark.
        </Text>
        <Button ref={targetRef} variant="secondary" label="New feature" />
        <Button label="Highlight it" onClick={() => setIsActive(true)} />

        <Tour isActive={isActive} onDismiss={() => setIsActive(false)}>
          <TourStep targetRef={targetRef} heading="Try the new feature" placement="below">
            We just shipped this — click to explore.
          </TourStep>
        </Tour>
      </VStack>;
  }
}`,...z.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Themed ring (scoped theme)',
  render: () => {
    const [isActive, setIsActive] = useState(false);
    const targetRef = useRef<HTMLButtonElement>(null);
    return <Theme theme={magentaTheme} mode="light">
        <VStack gap={4}>
          <Heading level={3}>Scoped theme</Heading>
          <Text type="body">
            This subtree uses a scoped theme with a magenta accent. The
            highlight ring picks it up because the overlay is promoted in place,
            inside the Theme — not portaled to the body.
          </Text>
          <Button ref={targetRef} variant="secondary" label="New feature" />
          <Button label="Highlight it" onClick={() => setIsActive(true)} />

          <Tour isActive={isActive} hasBackdrop onDismiss={() => setIsActive(false)}>
            <TourStep targetRef={targetRef} heading="Themed highlight">
              The ring uses this theme&apos;s accent color.
            </TourStep>
          </Tour>
        </VStack>
      </Theme>;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Placement & alignment',
  argTypes: {
    placement: {
      control: 'select',
      options: ['above', 'below', 'start', 'end'],
      description: 'Which side of the target the callout sits on'
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'How the callout aligns along the placement side'
    }
  },
  args: {
    placement: 'below',
    alignment: 'center'
  },
  render: ({
    placement,
    alignment
  }: PlacementArgs) => {
    const [isActive, setIsActive] = useState(true);
    const targetRef = useRef<HTMLButtonElement>(null);
    return <VStack gap={4} align="center" justify="center" style={{
      minHeight: 460
    }}>
        <Button ref={targetRef} variant="secondary" label="Target" />
        {!isActive && <Button label="Show step" onClick={() => setIsActive(true)} />}
        <Tour isActive={isActive} onDismiss={() => setIsActive(false)}>
          <TourStep targetRef={targetRef} heading="Positioned callout" placement={placement} alignment={alignment}>
            placement=&quot;{placement}&quot; · alignment=&quot;{alignment}
            &quot;
          </TourStep>
        </Tour>
      </VStack>;
  }
}`,...H.parameters?.docs?.source}}},U=[`Showcase`,`WithoutBackdrop`,`ScopedTheme`,`Placement`]})))()}W();export{H as Placement,V as ScopedTheme,R as Showcase,z as WithoutBackdrop,U as __namedExportsOrder,L as default};