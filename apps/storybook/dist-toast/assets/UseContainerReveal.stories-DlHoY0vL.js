import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./mergeProps-DHkqklmt.js";import{n as i,t as a}from"./Button-DoGM0DEN.js";import{n as o,t as s}from"./useContainerReveal-Bw4r4ByY.js";import{n as c,t as l}from"./PencilIcon-Cmm9HPbw.js";import{n as u,t as d}from"./TrashIcon-BuvjJ71A.js";function f({label:e}){let{getContainerProps:t,getContentRevealProps:n}=o();return(0,m.jsxs)(`div`,{...r(t(),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:e}),(0,m.jsxs)(`span`,{...r(n(),{className:`x78zum5 x1jnr06f`}),children:[(0,m.jsx)(a,{label:`Edit ${e}`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(l,{style:{width:16,height:16}})}),(0,m.jsx)(a,{label:`Delete ${e}`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(d,{style:{width:16,height:16}})})]})]})}var p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{p=t(),s(),i(),u(),c(),m=n(),h={title:`Core/Hooks/useContainerReveal`},g={render:()=>(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`Hover a row — or press Tab to focus into it — to reveal its actions. On touch devices the actions are always visible.`}),(0,m.jsx)(f,{label:`report.pdf`}),(0,m.jsx)(f,{label:`budget.xlsx`}),(0,m.jsx)(f,{label:`notes.txt`})]})},_={render:()=>{function e({label:e}){let{getContainerProps:t,getContentRevealProps:n}=o();return(0,m.jsxs)(`div`,{...r(t(),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:e}),(0,m.jsx)(`span`,{...r(n({isRevealInverted:!0}),{className:`xif65rj`}),children:`edited 2h ago`})]})}return(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`The timestamp shows at rest and fades out on mouse hover (a visual declutter). It stays put for keyboard and touch users.`}),(0,m.jsx)(e,{label:`report.pdf`}),(0,m.jsx)(e,{label:`budget.xlsx`})]})}},v={render:()=>{function e({label:e}){let{getContainerProps:t,getContentRevealProps:n}=o();return(0,m.jsxs)(`div`,{...r(t(),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:e}),(0,m.jsx)(`span`,{...r(n({isLayoutPreserved:!0}),{className:`x78zum5 x1jnr06f`}),children:(0,m.jsx)(a,{label:`Delete ${e}`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(d,{style:{width:16,height:16}})})})]})}return(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`The action's space is reserved even while hidden — no reflow when it fades in.`}),(0,m.jsx)(e,{label:`report.pdf`}),(0,m.jsx)(e,{label:`budget.xlsx`})]})}},y={render:()=>(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`Hover the outer row: only its own actions appear. The nested row keeps its actions hidden until you hover it directly — proof that the pool gives each container an isolated marker.`}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(f,{label:`Parent folder`}),(0,m.jsx)(`div`,{className:`x1xmf6yo xefazk8 xyumdvf x1t7ytsu xwq3efc xmzvs34`,children:(0,m.jsx)(f,{label:`Nested file`})})]})]})},b={render:()=>(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`Twenty rows on one page. Hover any row — including the last — to reveal its actions.`}),Array.from({length:20},(e,t)=>(0,m.jsx)(f,{label:`file-${String(t+1).padStart(2,`0`)}.txt`},t))]})},x={render:()=>{function e(){let[e,t]=(0,p.useState)(!0),{getContainerProps:n,getContentRevealProps:i}=o({isEnabled:e});return(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`div`,{className:`x1e56ztr`,children:(0,m.jsx)(a,{label:e?`Reveal on hover`:`Always visible`,variant:`secondary`,onClick:()=>t(e=>!e)})}),(0,m.jsxs)(`div`,{...r(n(),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:`report.pdf`}),(0,m.jsx)(`span`,{...r(i(),{className:`x78zum5 x1jnr06f`}),children:(0,m.jsx)(a,{label:`Delete report.pdf`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(d,{style:{width:16,height:16}})})})]})]})}return(0,m.jsx)(e,{})}},S={render:()=>{function e({label:e}){let{getContainerProps:t,getContentRevealProps:n}=o();return(0,m.jsxs)(`div`,{...r(t({hoverDelay:250}),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:e}),(0,m.jsxs)(`span`,{...r(n(),{className:`x78zum5 x1jnr06f`}),children:[(0,m.jsx)(a,{label:`Edit ${e}`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(l,{style:{width:16,height:16}})}),(0,m.jsx)(a,{label:`Delete ${e}`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(d,{style:{width:16,height:16}})})]})]})}return(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`A 250ms dwell. Sweep the cursor across the rows — none of them light up. Stop on one and its actions appear. Tab moves through them with no delay at all.`}),Array.from({length:6},(t,n)=>(0,m.jsx)(e,{label:`file-${n+1}.txt`},n))]})}},C={render:()=>{function e(){let[e,t]=(0,p.useState)(void 0),{getContainerProps:n,getContentRevealProps:i}=o();return(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`div`,{className:`x1e56ztr`,children:(0,m.jsx)(a,{label:`forceState: ${e??`unset (hover drives it)`}`,variant:`secondary`,onClick:()=>t(e=>e===void 0?`active`:e===`active`?`inactive`:void 0)})}),(0,m.jsxs)(`div`,{...r(n({forceState:e}),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:`report.pdf`}),(0,m.jsx)(`span`,{...r(i({isRevealInverted:!0}),{className:`xif65rj`}),children:`edited 2h ago`}),(0,m.jsx)(`span`,{...r(i(),{className:`x78zum5 x1jnr06f`}),children:(0,m.jsx)(a,{label:`Delete report.pdf`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(d,{style:{width:16,height:16}})})})]}),(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`'active' brings the actions in and takes the timestamp out — one state, two opposite appearances. While it is 'inactive', hovering does nothing, but tabbing in still reveals the action, so it can never be trapped out of reach of the keyboard.`})]})}return(0,m.jsx)(e,{})}},w={render:()=>{function e({label:e,forceVisibility:t}){let{getContainerProps:n,getContentRevealProps:i}=o();return(0,m.jsxs)(`div`,{...r(n(),{className:`x78zum5 x6s0dn4 x1qughib x1v2ro7d x153ncpu xur7f20 xmkeg23 x1y0btm7 x16e1oh1 x1md70p1 x17n6gb2`}),children:[(0,m.jsx)(`span`,{className:`xif65rj`,children:e}),(0,m.jsx)(`span`,{...r(i({forceVisibility:t}),{className:`x78zum5 x1jnr06f`}),children:(0,m.jsx)(a,{label:`Delete ${e}`,variant:`ghost`,isIconOnly:!0,icon:(0,m.jsx)(d,{style:{width:16,height:16}})})})]})}return(0,m.jsxs)(`div`,{className:`x78zum5 xdt5ytf x167g77z xxc7z9f`,children:[(0,m.jsx)(`p`,{className:`xfifm61 xv1l7n4 x1e56ztr`,children:`Row 1 follows the pointer, row 2 is pinned shown, row 3 is pinned hidden — and tabbing into row 3 still brings its action back.`}),(0,m.jsx)(e,{label:`follows-hover.txt`}),(0,m.jsx)(e,{label:`pinned-shown.txt`,forceVisibility:`shown`}),(0,m.jsx)(e,{label:`pinned-hidden.txt`,forceVisibility:`hidden`})]})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.stack)}>
      <p {...stylex.props(styles.hint)}>
        Hover a row — or press Tab to focus into it — to reveal its actions. On
        touch devices the actions are always visible.
      </p>
      <RevealRow label="report.pdf" />
      <RevealRow label="budget.xlsx" />
      <RevealRow label="notes.txt" />
    </div>
}`,...g.parameters?.docs?.source},description:{story:`Hover or tab into a row to reveal its actions.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    function ConcealRow({
      label
    }: {
      label: string;
    }) {
      const {
        getContainerProps,
        getContentRevealProps
      } = useContainerReveal();
      return <div {...mergeProps(getContainerProps(), stylex.props(styles.row))}>
          <span {...stylex.props(styles.label)}>{label}</span>
          <span {...mergeProps(getContentRevealProps({
          isRevealInverted: true
        }), stylex.props(styles.label))}>
            edited 2h ago
          </span>
        </div>;
    }
    return <div {...stylex.props(styles.stack)}>
        <p {...stylex.props(styles.hint)}>
          The timestamp shows at rest and fades out on mouse hover (a visual
          declutter). It stays put for keyboard and touch users.
        </p>
        <ConcealRow label="report.pdf" />
        <ConcealRow label="budget.xlsx" />
      </div>;
  }
}`,..._.parameters?.docs?.source},description:{story:`Inverted: content is visible at rest and fades OUT on hover. Mouse-only —
it never hides on keyboard focus and stays visible on touch.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    function PreserveRow({
      label
    }: {
      label: string;
    }) {
      const {
        getContainerProps,
        getContentRevealProps
      } = useContainerReveal();
      return <div {...mergeProps(getContainerProps(), stylex.props(styles.row))}>
          <span {...stylex.props(styles.label)}>{label}</span>
          <span {...mergeProps(getContentRevealProps({
          isLayoutPreserved: true
        }), stylex.props(styles.actions))}>
            <Button label={\`Delete \${label}\`} variant="ghost" isIconOnly icon={<TrashIcon style={{
            width: 16,
            height: 16
          }} />} />
          </span>
        </div>;
    }
    return <div {...stylex.props(styles.stack)}>
        <p {...stylex.props(styles.hint)}>
          The action's space is reserved even while hidden — no reflow when it
          fades in.
        </p>
        <PreserveRow label="report.pdf" />
        <PreserveRow label="budget.xlsx" />
      </div>;
  }
}`,...v.parameters?.docs?.source},description:{story:`Layout-preserved reveal reserves the action's box at rest, so surrounding
content does not shift when it appears.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.stack)}>
      <p {...stylex.props(styles.hint)}>
        Hover the outer row: only its own actions appear. The nested row keeps
        its actions hidden until you hover it directly — proof that the pool
        gives each container an isolated marker.
      </p>
      <div>
        <RevealRow label="Parent folder" />
        <div {...stylex.props(styles.nested)}>
          <RevealRow label="Nested file" />
        </div>
      </div>
    </div>
}`,...y.parameters?.docs?.source},description:{story:`Nested containers each get their own scoped marker from the pool, so
hovering the outer row does NOT reveal the inner row's actions.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.stack)}>
      <p {...stylex.props(styles.hint)}>
        Twenty rows on one page. Hover any row — including the last — to reveal
        its actions.
      </p>
      {Array.from({
      length: 20
    }, (_, i) => <RevealRow key={i} label={\`file-\${String(i + 1).padStart(2, '0')}.txt\`} />)}
    </div>
}`,...b.parameters?.docs?.source},description:{story:`A flat list of 20 rows. Sibling containers never nest, so every row can share
the same reveal scope: hovering one row reveals only that row's actions, and
mounting the list produces no console warnings.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    function ToggleRow() {
      const [isEnabled, setIsEnabled] = useState(true);
      const {
        getContainerProps,
        getContentRevealProps
      } = useContainerReveal({
        isEnabled
      });
      return <div {...stylex.props(styles.stack)}>
          <div {...stylex.props(styles.toggle)}>
            <Button label={isEnabled ? 'Reveal on hover' : 'Always visible'} variant="secondary" onClick={() => setIsEnabled(v => !v)} />
          </div>
          <div {...mergeProps(getContainerProps(), stylex.props(styles.row))}>
            <span {...stylex.props(styles.label)}>report.pdf</span>
            <span {...mergeProps(getContentRevealProps(), stylex.props(styles.actions))}>
              <Button label="Delete report.pdf" variant="ghost" isIconOnly icon={<TrashIcon style={{
              width: 16,
              height: 16
            }} />} />
            </span>
          </div>
        </div>;
    }
    return <ToggleRow />;
  }
}`,...x.parameters?.docs?.source},description:{story:"`isEnabled` is read on every render: flipping it off removes the reveal\nstyles and leaves the content permanently visible.",...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    function DelayedRow({
      label
    }: {
      label: string;
    }) {
      const {
        getContainerProps,
        getContentRevealProps
      } = useContainerReveal();
      return <div {...mergeProps(getContainerProps({
        hoverDelay: 250
      }), stylex.props(styles.row))}>
          <span {...stylex.props(styles.label)}>{label}</span>
          <span {...mergeProps(getContentRevealProps(), stylex.props(styles.actions))}>
            <Button label={\`Edit \${label}\`} variant="ghost" isIconOnly icon={<PencilIcon style={{
            width: 16,
            height: 16
          }} />} />
            <Button label={\`Delete \${label}\`} variant="ghost" isIconOnly icon={<TrashIcon style={{
            width: 16,
            height: 16
          }} />} />
          </span>
        </div>;
    }
    return <div {...stylex.props(styles.stack)}>
        <p {...stylex.props(styles.hint)}>
          A 250ms dwell. Sweep the cursor across the rows — none of them light
          up. Stop on one and its actions appear. Tab moves through them with no
          delay at all.
        </p>
        {Array.from({
        length: 6
      }, (_, i) => <DelayedRow key={i} label={\`file-\${i + 1}.txt\`} />)}
      </div>;
  }
}`,...S.parameters?.docs?.source},description:{story:"`hoverDelay` gates the reveal on dwell: sweep the pointer down the list and\nnothing paints in its wake, but rest on a row and its actions fade in.",...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    function ForcedRow() {
      const [forced, setForced] = useState<'active' | 'inactive' | undefined>(undefined);
      const {
        getContainerProps,
        getContentRevealProps
      } = useContainerReveal();
      const cycle = () => setForced(prev => prev === undefined ? 'active' : prev === 'active' ? 'inactive' : undefined);
      return <div {...stylex.props(styles.stack)}>
          <div {...stylex.props(styles.toggle)}>
            <Button label={\`forceState: \${forced ?? 'unset (hover drives it)'}\`} variant="secondary" onClick={cycle} />
          </div>
          <div {...mergeProps(getContainerProps({
          forceState: forced
        }), stylex.props(styles.row))}>
            <span {...stylex.props(styles.label)}>report.pdf</span>
            <span {...mergeProps(getContentRevealProps({
            isRevealInverted: true
          }), stylex.props(styles.label))}>
              edited 2h ago
            </span>
            <span {...mergeProps(getContentRevealProps(), stylex.props(styles.actions))}>
              <Button label="Delete report.pdf" variant="ghost" isIconOnly icon={<TrashIcon style={{
              width: 16,
              height: 16
            }} />} />
            </span>
          </div>
          <p {...stylex.props(styles.hint)}>
            'active' brings the actions in and takes the timestamp out — one
            state, two opposite appearances. While it is 'inactive', hovering
            does nothing, but tabbing in still reveals the action, so it can
            never be trapped out of reach of the keyboard.
          </p>
        </div>;
    }
    return <ForcedRow />;
  }
}`,...C.parameters?.docs?.source},description:{story:`\`forceState\` pins the container's trigger: 'inactive' while something else
owns the pointer (a scroll, a drag, a velocity gate), 'active' to keep a row
lit — e.g. while its overflow menu is open. It is state, not appearance: the
inverted timestamp does the opposite of the actions, from the same flag.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    function PinnedRow({
      label,
      forceVisibility
    }: {
      label: string;
      forceVisibility?: 'shown' | 'hidden';
    }) {
      const {
        getContainerProps,
        getContentRevealProps
      } = useContainerReveal();
      return <div {...mergeProps(getContainerProps(), stylex.props(styles.row))}>
          <span {...stylex.props(styles.label)}>{label}</span>
          <span {...mergeProps(getContentRevealProps({
          forceVisibility
        }), stylex.props(styles.actions))}>
            <Button label={\`Delete \${label}\`} variant="ghost" isIconOnly icon={<TrashIcon style={{
            width: 16,
            height: 16
          }} />} />
          </span>
        </div>;
    }
    return <div {...stylex.props(styles.stack)}>
        <p {...stylex.props(styles.hint)}>
          Row 1 follows the pointer, row 2 is pinned shown, row 3 is pinned
          hidden — and tabbing into row 3 still brings its action back.
        </p>
        <PinnedRow label="follows-hover.txt" />
        <PinnedRow label="pinned-shown.txt" forceVisibility="shown" />
        <PinnedRow label="pinned-hidden.txt" forceVisibility="hidden" />
      </div>;
  }
}`,...w.parameters?.docs?.source},description:{story:`\`forceVisibility\` is the same idea one level down, on a single element: it
says how THAT content looks regardless of the container. Here the row's
actions are pinned per row while the container is left on hover.`,...w.parameters?.docs?.description}}},T=[`Reveal`,`InvertedConceal`,`PreserveLayout`,`NestedIsolation`,`ManyRows`,`ToggleEnabled`,`HoverIntentDelay`,`ForcedContainerState`,`ForcedContentVisibility`]})))()}E();export{C as ForcedContainerState,w as ForcedContentVisibility,S as HoverIntentDelay,_ as InvertedConceal,b as ManyRows,y as NestedIsolation,v as PreserveLayout,g as Reveal,x as ToggleEnabled,T as __namedExportsOrder,h as default};