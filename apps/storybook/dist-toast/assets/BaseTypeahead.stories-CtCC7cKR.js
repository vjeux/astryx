import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Icon-BmO5FtDV.js";import{n as s,t as c}from"./Button-DoGM0DEN.js";import{n as l,t as u}from"./HStack-D5idGciI.js";import{n as d,t as f}from"./VStack-SWtDePqc.js";import{i as p,n as m,r as h,t as g}from"./RadioListItem-Bxow0I7z.js";import{n as _,t as v}from"./BaseTypeahead-BsPwsex6.js";import{n as y,t as b}from"./Tokenizer-D_tqRcHk.js";import{t as x}from"./createStaticSource-DpdQO4C4.js";import{n as S,t as ee}from"./Typeahead-BOmIKfL8.js";import{n as te,t as ne}from"./FunnelIcon-DufqMjpU.js";function C(){let e=(0,w.useRef)(null),t=(0,w.useRef)(null),[n,r]=(0,w.useState)([]),[a,s]=(0,w.useState)(null),[l,d]=(0,w.useState)(``),p=e=>{s(e),d(e.value),t.current?.open()},m=a==null?{role:`listbox`,render:({listbox:e,query:t})=>(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(i,{type:`supporting`,color:`secondary`,xstyle:D.menuNote,children:t===``?`Filter by`:`Fields matching “${t}”`}),e,(0,T.jsx)(i,{type:`supporting`,color:`secondary`,xstyle:D.menuNote,children:`Arrow keys move, Enter picks`})]})}:{role:`dialog`,label:`${a.field.label} filter`,render:({close:e})=>(0,T.jsxs)(f,{gap:3,xstyle:D.editor,children:[(0,T.jsx)(h,{label:a.field.label,value:l,onChange:d,children:a.field.values.map(e=>(0,T.jsx)(g,{label:e,value:e},e))}),(0,T.jsxs)(u,{gap:2,hAlign:`end`,children:[(0,T.jsx)(c,{label:`Cancel`,variant:`secondary`,onClick:e}),(0,T.jsx)(c,{label:`Apply`,variant:`primary`,onClick:()=>{let t={field:a.field,value:l};r(e=>[...e.filter(e=>e.field.id!==t.field.id),t]),e()}})]})]})};return(0,T.jsxs)(f,{gap:3,xstyle:D.root,children:[(0,T.jsxs)(u,{ref:e,gap:2,vAlign:`center`,xstyle:D.field,children:[(0,T.jsx)(o,{icon:ne,size:`sm`,color:`secondary`}),(0,T.jsx)(v,{"aria-label":`Add a filter`,searchSource:E,value:null,onChange:e=>{e!=null&&p(n.find(t=>t.field.id===e.id)??{field:e,value:e.values[0]})},onOpenChange:e=>{e||s(null)},handleRef:t,menu:m,anchorRef:e,placeholder:`Add a filter…`,hasEntriesOnFocus:!0,debounceMs:0})]}),(0,T.jsx)(u,{gap:2,wrap:`wrap`,children:n.length===0?(0,T.jsx)(i,{type:`supporting`,color:`secondary`,children:`No filters`}):n.map(e=>(0,T.jsx)(c,{label:`${e.field.label}: ${e.value}`,variant:`secondary`,size:`sm`,onClick:()=>p(e)},e.field.id))})]})}var w,T,E,D;function O(){return(O=e((()=>{w=t(),_(),s(),a(),l(),d(),p(),m(),r(),te(),T=n(),E=x([{id:`status`,label:`Status`,values:[`Open`,`In review`,`Closed`]},{id:`priority`,label:`Priority`,values:[`High`,`Medium`,`Low`]},{id:`owner`,label:`Owner`,values:[`Me`,`My team`,`Anyone`]}]),D={root:{kzqmXN:`astryxh8yej3`,ks0D6T:`astryx1lr1uin`,$$css:!0},field:{kWkggS:`astryx10xzikg`,kVAM5u:`astryx14i3s5s`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,ksu8eU:`astryx1y0btm7`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kMzoRj:`astryx1litavf`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,k8WAf4:`astryx1vofgu7`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxf314gf`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kjBf7l:`astryx1uczgqu astryxjc0agd`,kInvED:`astryx1eqjuhu`,k3XXqK:`astryxaatb59`,kMeerF:`astryx1k57tk5 astryx19h5306`,$$css:!0},menuNote:{k8WAf4:`astryxu0wf1k`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,$$css:!0},editor:{kmVPX3:`astryx1b2ylru`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,k7Eaqz:`astryx1klvvdw`,$$css:!0}},C.__docgenInfo={description:`A filter field built on BaseTypeahead's \`menu\`. Typing lists the fields
with a heading and a key hint around the list. Picking a field switches the
same menu to a dialog that edits its value; a filter's button reopens that
dialog, and Escape returns focus to the button.`,methods:[],displayName:`BaseTypeaheadMenu`}})))()}function k({label:e=`Framework`,source:t=L,isNarrow:n=!1,inputId:r,ariaLabelledBy:i,...a}){let[o,s]=(0,j.useState)(null),c=(0,j.useRef)(null),l=`base-typeahead-${(0,j.useId)().replaceAll(`:`,``)}`,u=r??l,d=`${u}-label`;return(0,M.jsxs)(`div`,{className:`x78zum5 xdt5ytf xzye2dw`,children:[(0,M.jsx)(`label`,{id:d,htmlFor:u,className:`x1tgivj0 x9ynric xcr08ib x1e4wzip`,children:e}),(0,M.jsx)(`div`,{ref:c,"data-base-typeahead-anchor":`true`,...{0:{className:`x6s0dn4 x10xzikg xvy26l8 xh6dtrn x1y0btm7 x1litavf x78zum5 x1uogy3y xf314gf x1uczgqu x6bitvs x1eqjuhu xaatb59 x1k57tk5 x1wtjzjv x1fjzz8u`},1:{className:`x6s0dn4 x10xzikg xvy26l8 xh6dtrn x1y0btm7 x1litavf x78zum5 x1uogy3y xf314gf x1uczgqu x6bitvs x1eqjuhu xaatb59 x1k57tk5 x1wtjzjv x193iq5w x1e67fm3`}}[!!n|0],children:(0,M.jsx)(v,{...a,inputId:u,ariaLabelledBy:i??d,anchorRef:c,searchSource:t,value:o,onChange:s})})]})}function A(){let[e,t]=(0,j.useState)(null),[n,r]=(0,j.useState)([]);return(0,M.jsxs)(`div`,{className:`x78zum5 xdt5ytf x9mgr7n x6ymgno`,children:[(0,M.jsx)(k,{source:B,label:`Bare framework`}),(0,M.jsx)(ee,{label:`Single framework`,searchSource:B,value:e,onChange:t}),(0,M.jsx)(b,{label:`Framework tokens`,searchSource:B,value:n,onChange:r})]})}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{j=t(),_(),S(),y(),O(),M=n(),{expect:N,userEvent:P,waitFor:F,within:I}=__STORYBOOK_MODULE_TEST__,L=x([{id:`react`,label:`React`,auxiliaryData:{group:`Libraries`}},{id:`vue`,label:`Vue`,auxiliaryData:{group:`Libraries`}},{id:`angular`,label:`Angular`,auxiliaryData:{group:`Frameworks`}},{id:`svelte`,label:`Svelte`,auxiliaryData:{group:`Frameworks`}},{id:`long`,label:`A deliberately long framework result that must stay inside the menu`,auxiliaryData:{group:`Frameworks`}}]),R=x([]),z={search:()=>new Promise(()=>{}),bootstrap:()=>new Promise(()=>{})},B={search:async e=>(await new Promise(e=>setTimeout(e,1e3)),L.search(e)),bootstrap:()=>[]},V={title:`Core/BaseTypeahead`,component:k,tags:[`autodocs`],parameters:{layout:`centered`}},H={render:()=>(0,M.jsx)(k,{placeholder:`Search frameworks…`})},U={render:()=>(0,M.jsx)(k,{hasEntriesOnFocus:!0,isNarrow:!0,menuWidth:320,placeholder:`Focus to open results…`}),play:async({canvasElement:e})=>{let t=I(e).getByRole(`combobox`);await P.click(t),await F(()=>N(t).toHaveAttribute(`aria-expanded`,`true`))}},W={render:()=>(0,M.jsx)(k,{source:z,debounceMs:0,placeholder:`Type to start a pending search…`}),play:async({canvasElement:e})=>{let t=I(e).getByRole(`combobox`);await P.type(t,`re`),await F(()=>N(t).toHaveAttribute(`aria-busy`,`true`))}},G={render:()=>(0,M.jsx)(k,{source:R,debounceMs:0,emptySearchText:`No matching frameworks`}),play:async({canvasElement:e})=>{let t=I(e).getByRole(`combobox`);await P.type(t,`none`),await F(()=>N(t).toHaveAttribute(`aria-expanded`,`true`))}},K={parameters:{docs:{description:{story:`Search for zzz, wait for the empty result, then type react or xxx. Each request takes one second; the previous empty result must not remain during debounce or loading.`}}},render:()=>(0,M.jsx)(A,{})},q={render:()=>(0,M.jsx)(k,{hasEntriesOnFocus:!0,renderItem:e=>(0,M.jsxs)(`span`,{className:`x78zum5 xdt5ytf xeuugli`,children:[(0,M.jsx)(`span`,{className:`x1tgivj0 xk50ysn`,children:e.label}),(0,M.jsx)(`span`,{className:`xv1l7n4 x141an7d`,children:e.auxiliaryData?.group})]})}),play:async({canvasElement:e})=>{let t=I(e).getByRole(`combobox`);await P.click(t),await F(()=>N(t).toHaveAttribute(`aria-expanded`,`true`))}},J={render:()=>(0,M.jsxs)(`div`,{className:`x78zum5 xdt5ytf x9mgr7n x6ymgno`,children:[(0,M.jsx)(k,{label:`Native disabled`,isDisabled:!0}),(0,M.jsx)(k,{label:`Focusable disabled`,isDisabled:!0,isFocusableDisabled:!0})]})},Y={render:()=>(0,M.jsxs)(`div`,{className:`x78zum5 xdt5ytf x9mgr7n x6ymgno`,children:[(0,M.jsx)(k,{label:`Small`,size:`sm`,hasEntriesOnFocus:!0}),(0,M.jsx)(k,{label:`Medium`,size:`md`,hasEntriesOnFocus:!0}),(0,M.jsx)(k,{label:`Large`,size:`lg`,hasEntriesOnFocus:!0})]})},X={render:()=>(0,M.jsx)(k,{isNarrow:!0,hasEntriesOnFocus:!0,label:`Framework in a narrow container`}),play:async({canvasElement:e})=>{let t=I(e).getByRole(`combobox`);await P.click(t),await F(()=>N(t).toHaveAttribute(`aria-expanded`,`true`)),await F(()=>{let e=document.querySelector(`[role="listbox"]`);if(e==null)throw Error(`Expected the BaseTypeahead listbox to be open`);let t=e.getBoundingClientRect();N(t.left>=16&&t.right<=window.innerWidth-16&&e.scrollWidth<=e.clientWidth).toBe(!0),N(Array.from(e.querySelectorAll(`[role="option"]`)).every(e=>e.scrollWidth<=e.clientWidth)).toBe(!0)})}},Z={render:()=>(0,M.jsx)(C,{})},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <Demo placeholder="Search frameworks…" />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <Demo hasEntriesOnFocus isNarrow menuWidth={320} placeholder="Focus to open results…" />,
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByRole('combobox');
    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <Demo source={pendingSource} debounceMs={0} placeholder="Type to start a pending search…" />,
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByRole('combobox');
    await userEvent.type(input, 're');
    await waitFor(() => expect(input).toHaveAttribute('aria-busy', 'true'));
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Demo source={emptySource} debounceMs={0} emptySearchText="No matching frameworks" />,
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByRole('combobox');
    await userEvent.type(input, 'none');
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Search for zzz, wait for the empty result, then type react or xxx. Each request takes one second; the previous empty result must not remain during debounce or loading.'
      }
    }
  },
  render: () => <EmptyThenPendingDemo />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <Demo hasEntriesOnFocus renderItem={item => <span {...stylex.props(styles.customItem)}>
          <span {...stylex.props(styles.customItemLabel)}>{item.label}</span>
          <span {...stylex.props(styles.customItemGroup)}>
            {(item.auxiliaryData as {
        group?: string;
      } | undefined)?.group}
          </span>
        </span>} />,
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByRole('combobox');
    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.stage)}>
      <Demo label="Native disabled" isDisabled />
      <Demo label="Focusable disabled" isDisabled isFocusableDisabled />
    </div>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.stage)}>
      <Demo label="Small" size="sm" hasEntriesOnFocus />
      <Demo label="Medium" size="md" hasEntriesOnFocus />
      <Demo label="Large" size="lg" hasEntriesOnFocus />
    </div>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <Demo isNarrow hasEntriesOnFocus label="Framework in a narrow container" />,
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByRole('combobox');
    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
    await waitFor(() => {
      const listbox = document.querySelector<HTMLElement>('[role="listbox"]');
      if (listbox == null) {
        throw new Error('Expected the BaseTypeahead listbox to be open');
      }
      const box = listbox.getBoundingClientRect();
      expect(box.left >= 16 && box.right <= window.innerWidth - 16 && listbox.scrollWidth <= listbox.clientWidth).toBe(true);
      expect(Array.from(listbox.querySelectorAll<HTMLElement>('[role="option"]')).every(option => option.scrollWidth <= option.clientWidth)).toBe(true);
    });
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <BaseTypeaheadMenuBlock />
}`,...Z.parameters?.docs?.source}}},Q=[`Default`,`LogicalDropdownPlacement`,`Loading`,`EmptyResults`,`EmptyThenPending`,`CustomRenderer`,`DisabledStates`,`SizeVariants`,`NarrowLongResult`,`Menu`]})))()}$();export{q as CustomRenderer,H as Default,J as DisabledStates,G as EmptyResults,K as EmptyThenPending,W as Loading,U as LogicalDropdownPlacement,Z as Menu,X as NarrowLongResult,Y as SizeVariants,Q as __namedExportsOrder,V as default};