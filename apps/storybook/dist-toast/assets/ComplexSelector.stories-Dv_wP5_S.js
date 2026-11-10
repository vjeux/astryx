import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./useGridFocus-BDVVxsAt.js";import{n as l,t as u}from"./TreeList-D6hq6CTm.js";import{n as d,t as f}from"./HStack-D5idGciI.js";import{n as p,t as m}from"./VStack-SWtDePqc.js";import{n as h,t as g}from"./ComplexSelector-Bt9gOBuj.js";import{n as _,t as v}from"./TextInput-LGxpinPt.js";import{n as y,t as b}from"./Token-DiYqRCxg.js";import{m as x,p as S}from"./iframe-B7UFaprG.js";function C(e){return`${e.fruit} · ${e.ripeness}`}function w(e){return e.path}function T(e,t){return e.label.toLowerCase().includes(t)||e.path.toLowerCase().includes(t)}function E(e,t){let n=t.trim().toLowerCase(),r=[];for(let i of e){let e=i.children?E(i.children,t):void 0;(n.length===0||T(i,n)||e&&e.length!==0)&&r.push({...i,isExpanded:n.length>0||i.children!=null,children:e})}return r}function D(e,t,n){return e.map(e=>{let r=e.children!=null&&e.children.length>0;return{id:e.id,label:e.label,description:e.path,isExpanded:r,isSelected:!r&&e.id===t,endContent:e.kind===`team`?(0,M.jsx)(b,{label:`Team`,size:`sm`,color:`blue`}):void 0,onClick:r?void 0:()=>n({id:e.id,label:e.label,path:e.path}),children:r?D(e.children??[],t,n):void 0}})}function O({value:e,onChange:t}){let{gridRef:n,handleKeyDown:r,handleFocus:i,focusCell:a}=s({columns:B.length,cellSelector:L,hasRovingTabIndex:!0});return(0,j.useEffect)(()=>{let t=z.findIndex(t=>t.id===e.fruit),n=B.findIndex(t=>t.id===e.ripeness);requestAnimationFrame(()=>{a(t>=0&&n>=0?t*B.length+n:0)})},[a,e]),(0,M.jsx)(`div`,{ref:n,role:`grid`,"aria-label":`Fruit ripeness choices`,onKeyDown:r,onFocus:i,className:`x78zum5 xdt5ytf xzye2dw`,children:z.map(n=>(0,M.jsxs)(`div`,{role:`row`,className:`xrvj5dj x48fp95 x6s0dn4 x1lfs0n9 x1wxaq2x xu0wf1k xf314gf x1hviunn xjbqb8w x1rlsyly x1pd5uwb`,children:[(0,M.jsxs)(`div`,{role:`rowheader`,className:`x78zum5 x6s0dn4 x1txdalj xeuugli`,children:[(0,M.jsx)(`span`,{"aria-hidden":`true`,className:`x3nfvp2 x6s0dn4 xl56j7k xgd8bvy x1fgtraw xjspbzw xwmxj5m x19d36u7 x2lah0s`,children:n.emoji}),(0,M.jsxs)(`span`,{className:`x78zum5 xdt5ytf xeuugli`,children:[(0,M.jsx)(`span`,{className:`x1tgivj0 xcr08ib x2mo6ok xb3r6kr xlyipyv xuxw1ft`,children:n.id}),(0,M.jsx)(`span`,{className:`xv1l7n4 x141an7d xb3r6kr xlyipyv xuxw1ft`,children:n.description})]})]}),B.map(r=>{let i={fruit:n.id,ripeness:r.id},a=e.fruit===n.id&&e.ripeness===r.id;return(0,M.jsx)(`button`,{type:`button`,role:`gridcell`,"aria-label":`${n.id}, ${r.id}: ${r.description}`,"aria-selected":a||void 0,tabIndex:a?0:-1,onClick:()=>t(i),...{0:{className:`x1litavf x1y0btm7 x14i3s5s xjspbzw x1de1mus xv1l7n4 x1rz828m xf314gf xjb2p0i x141an7d x1e4wzip x1ypdohk xal5it7 xwc86oh xuedmi6 xlr8y92 x1a2a7pz x17nn4n9 x1hl8ikr x1j9pxtw x1ww4t2b x140uwzg`},1:{className:`x1litavf x1y0btm7 xjspbzw x1rz828m xf314gf xjb2p0i x141an7d x1e4wzip x1ypdohk xwc86oh xuedmi6 xlr8y92 x1a2a7pz x17nn4n9 x1hl8ikr x1j9pxtw x1ww4t2b x140uwzg x1hc1fzr xad5do x1ewilqj x17wrial x1i5ehqx`}}[!!a|0],children:r.shortLabel},`${n.id}-${r.id}`)})]},n.id))})}function k({label:e,value:t,tree:n,searchPlaceholder:r,onChange:a,close:o}){let[s,c]=(0,j.useState)(``),l=(0,j.useMemo)(()=>E(n,s),[s,n]),d=(0,j.useMemo)(()=>D(l,t.id,e=>{a(e),o()}),[o,l,a,t.id]);return(0,M.jsxs)(m,{gap:3,children:[(0,M.jsx)(`div`,{className:`xep27e5`,children:(0,M.jsx)(v,{label:`Search ${e}`,isLabelHidden:!0,value:s,onChange:c,hasClear:!0,placeholder:r})}),(0,M.jsx)(`div`,{className:`xq3t0pi xysyzu8 x1litavf x1y0btm7 x14i3s5s x1hviunn x9epnlk`,children:d.length>0?(0,M.jsx)(u,{items:d,density:`compact`}):(0,M.jsx)(`div`,{role:`status`,className:`x1b2ylru xv1l7n4 x2b8uid`,children:(0,M.jsx)(i,{type:`supporting`,color:`secondary`,children:`No matching destinations.`})})}),(0,M.jsx)(`div`,{className:`xj6sv8s x1vlblms x11xkdxz x13fuv20 x1pc3f07`,children:(0,M.jsxs)(f,{gap:2,wrap:`wrap`,children:[(0,M.jsx)(i,{type:`supporting`,color:`secondary`,children:`Current:`}),(0,M.jsx)(b,{label:t.path,size:`sm`,color:`blue`})]})})]})}function A(){let[e,t]=(0,j.useState)({id:`teams-design-systems-accessibility`,label:`Accessibility`,path:`/Teams/Design systems/Accessibility`});return(0,M.jsx)(m,{gap:4,xstyle:U.wrapper,children:(0,M.jsx)(g,{label:`Project destination`,description:`Search and browse nested folders from one selector.`,value:e,onChange:t,triggerLabel:w(e),contentXstyle:U.treeContent,children:(e,t,n)=>(0,M.jsx)(k,{label:`destinations`,value:e,tree:V,searchPlaceholder:`Search folders or teams`,onChange:t,close:n})})})}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{j=t(),h(),a(),r(),_(),d(),p(),y(),l(),c(),x(),M=n(),{expect:N,userEvent:P,waitFor:F,within:I}=__STORYBOOK_MODULE_TEST__,L=`[role="gridcell"]`,R={title:`Core/ComplexSelector`,component:g,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A high-level selector shell for rich custom content. The component owns the field, trigger, popover, focus restore, and async changeAction flow while consumers render the content. Its sm, md, and lg triggers use the 28px, 32px, and 36px element-height tokens. Custom content should use Astryx focus hooks where appropriate and be evaluated against WCAG 2.2.`}}},argTypes:{variant:{control:`radio`,options:[`input`,`secondary`,`ghost`]}}},z=[{id:`Apple`,emoji:`🍎`,description:`Bright and balanced`},{id:`Pear`,emoji:`🍐`,description:`Soft floral sweetness`},{id:`Peach`,emoji:`🍑`,description:`Round summer flavor`},{id:`Plum`,emoji:`🟣`,description:`Jammy and tart`}],B=[{id:`Crisp`,shortLabel:`C`,description:`Snappy bite`},{id:`Tender`,shortLabel:`T`,description:`Easy bite`},{id:`Juicy`,shortLabel:`J`,description:`Full juice`},{id:`Peak`,shortLabel:`P`,description:`Most intense`}],V=[{id:`workspace`,label:`Workspace`,path:`/Workspace`,kind:`space`,children:[{id:`workspace-research`,label:`Research`,path:`/Workspace/Research`,kind:`folder`,children:[{id:`workspace-research-field-notes`,label:`Field notes`,path:`/Workspace/Research/Field notes`,kind:`folder`},{id:`workspace-research-interviews`,label:`Interviews`,path:`/Workspace/Research/Interviews`,kind:`folder`}]},{id:`workspace-roadmap`,label:`Roadmap`,path:`/Workspace/Roadmap`,kind:`folder`}]},{id:`teams`,label:`Teams`,path:`/Teams`,kind:`space`,children:[{id:`teams-design-systems`,label:`Design systems`,path:`/Teams/Design systems`,kind:`team`,children:[{id:`teams-design-systems-components`,label:`Components`,path:`/Teams/Design systems/Components`,kind:`folder`},{id:`teams-design-systems-accessibility`,label:`Accessibility`,path:`/Teams/Design systems/Accessibility`,kind:`folder`}]},{id:`teams-growth`,label:`Growth`,path:`/Teams/Growth`,kind:`team`}]},{id:`archive`,label:`Archive`,path:`/Archive`,kind:`space`,children:[{id:`archive-2025`,label:`2025 projects`,path:`/Archive/2025 projects`,kind:`folder`}]}],H=[{id:`produce`,label:`Produce`,path:`Produce`,kind:`space`,children:[{id:`produce-fruit`,label:`Fruit`,path:`Produce / Fruit`,kind:`folder`,children:[{id:`produce-fruit-citrus`,label:`Citrus`,path:`Produce / Fruit / Citrus`,kind:`folder`},{id:`produce-fruit-stone`,label:`Stone fruit`,path:`Produce / Fruit / Stone fruit`,kind:`folder`}]},{id:`produce-vegetables`,label:`Vegetables`,path:`Produce / Vegetables`,kind:`folder`}]},{id:`pantry`,label:`Pantry`,path:`Pantry`,kind:`space`,children:[{id:`pantry-grains`,label:`Grains`,path:`Pantry / Grains`,kind:`folder`},{id:`pantry-snacks`,label:`Snacks`,path:`Pantry / Snacks`,kind:`folder`}]}],U={wrapper:{kzqmXN:`xj6ak53`,$$css:!0},fruitContent:{kzqmXN:`xvue9z`,kmVPX3:`xlsj2fj`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,$$css:!0},treeContent:{kzqmXN:`x3p9ev8`,kmVPX3:`x1b2ylru`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,$$css:!0},toolbarContent:{kzqmXN:`x1dz1jew`,kmVPX3:`x1b2ylru`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,$$css:!0},auditMatrix:{kzqmXN:`xmcr6yz`,$$css:!0},auditPopupContent:{kzqmXN:`x16grhtn`,$$css:!0}},W={name:`Fruit ripeness selector`,render:()=>{let[e,t]=(0,j.useState)({fruit:`Apple`,ripeness:`Juicy`});return(0,M.jsx)(m,{gap:4,xstyle:U.wrapper,children:(0,M.jsx)(g,{label:`Fruit blend`,description:`Choose a fruit and ripeness level in one selector. Arrow down preserves the ripeness column.`,value:e,onChange:t,triggerLabel:C(e),contentXstyle:U.fruitContent,children:(e,t,n)=>(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`div`,{className:`xep27e5`,children:(0,M.jsx)(i,{type:`supporting`,color:`secondary`,children:`Pick a blend profile. The compact pills mirror a hover-rich selector while staying available to keyboard users.`})}),(0,M.jsx)(O,{value:e,onChange:e=>{t(e),n()}}),(0,M.jsx)(`div`,{className:`xj6sv8s x1vlblms x11xkdxz x13fuv20 x1pc3f07`,children:(0,M.jsxs)(f,{gap:2,wrap:`wrap`,children:[(0,M.jsx)(i,{type:`supporting`,color:`secondary`,children:`Try keyboard:`}),(0,M.jsx)(i,{type:`supporting`,children:`↓ from Apple J lands on Pear J.`})]})})]})})})},parameters:{docs:{description:{story:`A fruit-themed stand-in for a rich two-axis selector. ComplexSelector owns the trigger, popover, focus restore, and change flow; the custom content owns its grid semantics.`}}}},G={name:`Tree list with search`,render:()=>(0,M.jsx)(A,{}),parameters:{docs:{description:{story:`A complex selector that combines TextInput search with TreeList hierarchy. TreeList owns tree keyboard navigation while ComplexSelector owns the trigger and popover shell. Evaluate the composed content against WCAG 2.2 keyboard, focus, name/role, label, and contrast criteria.`}}}},K={name:`Tree list with search above an app bar`,render:()=>(0,M.jsxs)(S,{inset:{blockEnd:80},children:[(0,M.jsx)(A,{}),(0,M.jsx)(`div`,{"aria-hidden":!0,className:`xixxii4 x17y0mx6 x1ey2m1c xwzfr38 xwmxj5m x11xkdxz x13fuv20 x1pc3f07`})]}),parameters:{docs:{story:{inline:!1,height:`360px`}}}},q={name:`Category tree selector`,render:()=>{let[e,t]=(0,j.useState)({id:`produce-fruit-citrus`,label:`Citrus`,path:`Produce / Fruit / Citrus`});return(0,M.jsxs)(m,{gap:4,xstyle:U.wrapper,children:[(0,M.jsx)(g,{label:`Product category`,description:`Search or browse a category tree.`,value:e,onChange:t,triggerLabel:e.path,contentXstyle:U.treeContent,children:(e,t,n)=>(0,M.jsx)(k,{label:`categories`,value:e,tree:H,searchPlaceholder:`Search categories`,onChange:t,close:n})}),(0,M.jsx)(o,{label:`Save category`,variant:`primary`})]})},parameters:{docs:{description:{story:`A second tree-search example showing the same ComplexSelector shell with different hierarchical data and a form action nearby. The custom content relies on TreeList focus behavior and should be checked against WCAG 2.2.`}}}},J={name:`Secondary toolbar trigger`,render:()=>{let[e,t]=(0,j.useState)(`Comfortable`);return(0,M.jsxs)(`div`,{className:`x78zum5 x6s0dn4 x13a6bvl xzye2dw x9epnlk x1hviunn xwmxj5m xezivpi`,children:[(0,M.jsx)(o,{label:`Reset view`,variant:`secondary`,size:`sm`,onClick:()=>t(`Comfortable`)}),(0,M.jsx)(g,{label:`View density`,isLabelHidden:!0,value:e,onChange:t,triggerLabel:`Density: ${e}`,variant:`secondary`,size:`sm`,width:190,startIcon:`viewColumns`,alignment:`end`,contentXstyle:U.toolbarContent,children:(e,t,n)=>(0,M.jsxs)(m,{gap:3,children:[(0,M.jsx)(i,{type:`supporting`,color:`secondary`,children:`Choose how densely rows are displayed.`}),(0,M.jsx)(f,{gap:2,children:[`Comfortable`,`Compact`].map(r=>(0,M.jsx)(o,{label:r,size:`sm`,variant:e===r?`primary`:`secondary`,onClick:()=>{t(r),n()}},r))})]})}),(0,M.jsx)(o,{label:`Share`,variant:`secondary`,size:`sm`})]})},play:async({canvasElement:e})=>{await document.fonts.ready;let t=I(e),n=e.querySelector(`.astryx-complex-selector[data-variant="secondary"]`);if(n==null)throw Error(`Secondary ComplexSelector root not found`);let r=n.getBoundingClientRect().width;N(r).toBeCloseTo(190,0);let i=t.getByRole(`combobox`,{name:`View density`});await P.click(i);let a=I(document.body).getByRole(`dialog`,{name:`View density`});await P.click(I(a).getByRole(`button`,{name:`Compact`})),await F(()=>N(n.getBoundingClientRect().width).toBeCloseTo(r,0)),i.blur()},parameters:{docs:{description:{story:`A compact toolbar composition where ComplexSelector uses the same neutral-filled treatment as adjacent secondary buttons.`}}}},Y={name:`Controlled toolbar trigger`,render:()=>{let[e,t]=(0,j.useState)(`Comfortable`),[n,r]=(0,j.useState)(!1),a=(0,j.useRef)(null);return(0,M.jsxs)(`div`,{className:`x78zum5 x6s0dn4 x13a6bvl xzye2dw x1cvmir6 x9epnlk x1hviunn xwmxj5m`,children:[(0,M.jsx)(o,{label:`Open options externally`,variant:`ghost`,size:`sm`,onClick:()=>a.current?.toggle()}),(0,M.jsx)(g,{label:`View options`,isLabelHidden:!0,value:e,onChange:t,onOpenChange:r,triggerLabel:`Density: ${e}`,variant:`ghost`,startIcon:`viewColumns`,alignment:`end`,handleRef:a,contentXstyle:U.toolbarContent,children:(e,t,n)=>(0,M.jsxs)(m,{gap:3,children:[(0,M.jsx)(i,{type:`supporting`,color:`secondary`,children:`The selector owns visibility. An external control drives it imperatively via handleRef; choosing a density commits the value and closes the surface. onOpenChange reports every open and close, including the ones the selector performs itself.`}),(0,M.jsx)(f,{gap:2,children:[`Comfortable`,`Compact`].map(r=>(0,M.jsx)(o,{label:r,size:`sm`,variant:e===r?`primary`:`secondary`,onClick:()=>{t(r),n()}},r))})]})}),(0,M.jsx)(i,{type:`supporting`,color:`secondary`,"data-testid":`open-state`,children:n?`open`:`closed`})]})},parameters:{docs:{description:{story:`A compact toolbar composition using the ghost trigger, a leading icon, end-aligned content, and an external control that opens the selector imperatively through its handleRef. The selector still owns its own visibility, focus restoration, and light dismiss.`}}}},X={name:`Audit matrix`,tags:[`no-visual`],render:()=>{let e=()=>(0,M.jsx)(o,{label:`Apply selection`,size:`sm`});return(0,M.jsxs)(m,{gap:4,xstyle:U.auditMatrix,"data-testid":`audit-matrix`,children:[(0,M.jsx)(g,{label:`Empty small`,value:``,size:`sm`,children:e}),(0,M.jsx)(g,{label:`Selected medium`,value:`Design systems`,triggerLabel:`Design systems`,"data-testid":`rtl-trigger`,children:e}),(0,M.jsx)(g,{label:`Long large`,value:`A long selected destination`,triggerLabel:`A long selected destination that must truncate without widening the field`,size:`lg`,children:e}),(0,M.jsx)(g,{label:`Ghost trigger`,value:`Compact`,triggerLabel:`Compact`,variant:`ghost`,startIcon:`viewColumns`,children:e}),(0,M.jsx)(g,{label:`Loading value`,value:`Saving`,triggerLabel:`Saving destination`,isLoading:!0,children:e}),(0,M.jsx)(g,{label:`Disabled value`,value:`Unavailable`,triggerLabel:`Unavailable`,isDisabled:!0,children:e}),(0,M.jsx)(g,{label:`Invalid required value`,value:`Needs attention`,triggerLabel:`Needs attention`,isRequired:!0,status:{type:`error`,message:`Choose an available destination.`},children:e}),(0,M.jsx)(g,{label:`Warning value`,value:`Draft destination`,triggerLabel:`Draft destination`,status:{type:`warning`,message:`This destination is archived.`},children:e}),(0,M.jsx)(g,{label:`Successful value`,value:`Ready`,triggerLabel:`Ready`,status:{type:`success`,message:`Destination is available.`},children:e}),(0,M.jsx)(g,{label:`Custom trigger selector`,value:`Custom`,contentXstyle:U.auditPopupContent,renderTrigger:e=>(0,M.jsx)(o,{"data-testid":`rtl-custom-trigger`,label:`Custom trigger`,variant:`secondary`,...e}),children:e})]})},parameters:{docs:{description:{story:`A bounded audit fixture for the built-in sizes, variants, busy, disabled, validation, overflow, and caller-rendered trigger paths. Browser evidence drives this one fixture through light, dark, RTL, interaction, and 320px states.`}}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Fruit ripeness selector',
  render: () => {
    const [value, setValue] = useState<FruitValue>({
      fruit: 'Apple',
      ripeness: 'Juicy'
    });
    return <VStack gap={4} xstyle={styles.wrapper}>
        <ComplexSelector<FruitValue> label="Fruit blend" description="Choose a fruit and ripeness level in one selector. Arrow down preserves the ripeness column." value={value} onChange={setValue} triggerLabel={formatFruitValue(value)} contentXstyle={styles.fruitContent}>
          {(selectedValue, onChange, close) => <div>
              <div {...stylex.props(styles.intro)}>
                <Text type="supporting" color="secondary">
                  Pick a blend profile. The compact pills mirror a hover-rich
                  selector while staying available to keyboard users.
                </Text>
              </div>

              <FruitRipenessMatrix value={selectedValue} onChange={nextValue => {
            onChange(nextValue);
            close();
          }} />

              <div {...stylex.props(styles.keyboardHint)}>
                <HStack gap={2} wrap="wrap">
                  <Text type="supporting" color="secondary">
                    Try keyboard:
                  </Text>
                  <Text type="supporting">↓ from Apple J lands on Pear J.</Text>
                </HStack>
              </div>
            </div>}
        </ComplexSelector>
      </VStack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A fruit-themed stand-in for a rich two-axis selector. ComplexSelector owns the trigger, popover, focus restore, and change flow; the custom content owns its grid semantics.'
      }
    }
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Tree list with search',
  render: () => <TreeListWithSearchExample />,
  parameters: {
    docs: {
      description: {
        story: 'A complex selector that combines TextInput search with TreeList hierarchy. TreeList owns tree keyboard navigation while ComplexSelector owns the trigger and popover shell. Evaluate the composed content against WCAG 2.2 keyboard, focus, name/role, label, and contrast criteria.'
      }
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Tree list with search above an app bar',
  render: () => <LayerProvider inset={{
    blockEnd: 80
  }}>
      <TreeListWithSearchExample />
      <div aria-hidden {...stylex.props(styles.appBar)} />
    </LayerProvider>,
  // The bar is fixed to the viewport, so on the docs page the story gets its
  // own frame instead of covering the page.
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '360px'
      }
    }
  }
}`,...K.parameters?.docs?.source},description:{story:"The same selector in an app whose bottom bar covers the block-end edge,\ndeclared once through LayerProvider's `inset`, so the popup stays clear of it.",...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Category tree selector',
  render: () => {
    const [value, setValue] = useState<DestinationValue>({
      id: 'produce-fruit-citrus',
      label: 'Citrus',
      path: 'Produce / Fruit / Citrus'
    });
    return <VStack gap={4} xstyle={styles.wrapper}>
        <ComplexSelector<DestinationValue> label="Product category" description="Search or browse a category tree." value={value} onChange={setValue} triggerLabel={value.path} contentXstyle={styles.treeContent}>
          {(selectedValue, onChange, close) => <TreeSearchContent label="categories" value={selectedValue} tree={categoryTree} searchPlaceholder="Search categories" onChange={onChange} close={close} />}
        </ComplexSelector>
        <Button label="Save category" variant="primary" />
      </VStack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A second tree-search example showing the same ComplexSelector shell with different hierarchical data and a form action nearby. The custom content relies on TreeList focus behavior and should be checked against WCAG 2.2.'
      }
    }
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Secondary toolbar trigger',
  render: () => {
    const [density, setDensity] = useState<ViewDensity>('Comfortable');
    return <div {...stylex.props(styles.toolbarDemo, styles.toolbarDemoIntrinsic)}>
        <Button label="Reset view" variant="secondary" size="sm" onClick={() => setDensity('Comfortable')} />
        <ComplexSelector<ViewDensity> label="View density" isLabelHidden value={density} onChange={setDensity} triggerLabel={\`Density: \${density}\`} variant="secondary" size="sm" width={190} startIcon="viewColumns" alignment="end" contentXstyle={styles.toolbarContent}>
          {(selectedDensity, onChange, close) => <VStack gap={3}>
              <Text type="supporting" color="secondary">
                Choose how densely rows are displayed.
              </Text>
              <HStack gap={2}>
                {(['Comfortable', 'Compact'] as const).map(option => <Button key={option} label={option} size="sm" variant={selectedDensity === option ? 'primary' : 'secondary'} onClick={() => {
              onChange(option);
              close();
            }} />)}
              </HStack>
            </VStack>}
        </ComplexSelector>
        <Button label="Share" variant="secondary" size="sm" />
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const canvas = within(canvasElement);
    const root = canvasElement.querySelector<HTMLElement>('.astryx-complex-selector[data-variant="secondary"]');
    if (root == null) {
      throw new Error('Secondary ComplexSelector root not found');
    }
    const widthBefore = root.getBoundingClientRect().width;
    expect(widthBefore).toBeCloseTo(190, 0);
    const trigger = canvas.getByRole('combobox', {
      name: 'View density'
    });
    await userEvent.click(trigger);
    const dialog = within(document.body).getByRole('dialog', {
      name: 'View density'
    });
    await userEvent.click(within(dialog).getByRole('button', {
      name: 'Compact'
    }));
    await waitFor(() => expect(root.getBoundingClientRect().width).toBeCloseTo(widthBefore, 0));
    trigger.blur();
  },
  parameters: {
    docs: {
      description: {
        story: 'A compact toolbar composition where ComplexSelector uses the same neutral-filled treatment as adjacent secondary buttons.'
      }
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Controlled toolbar trigger',
  render: () => {
    const [density, setDensity] = useState<ViewDensity>('Comfortable');
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<ComplexSelectorHandle>(null);
    return <div {...stylex.props(styles.toolbarDemo)}>
        <Button label="Open options externally" variant="ghost" size="sm" onClick={() => selectorRef.current?.toggle()} />
        <ComplexSelector<ViewDensity> label="View options" isLabelHidden value={density} onChange={setDensity} onOpenChange={setIsOpen} triggerLabel={\`Density: \${density}\`} variant="ghost" startIcon="viewColumns" alignment="end" handleRef={selectorRef} contentXstyle={styles.toolbarContent}>
          {(selectedDensity, onChange, close) => <VStack gap={3}>
              <Text type="supporting" color="secondary">
                The selector owns visibility. An external control drives it
                imperatively via handleRef; choosing a density commits the value
                and closes the surface. onOpenChange reports every open and
                close, including the ones the selector performs itself.
              </Text>
              <HStack gap={2}>
                {(['Comfortable', 'Compact'] as const).map(option => <Button key={option} label={option} size="sm" variant={selectedDensity === option ? 'primary' : 'secondary'} onClick={() => {
              onChange(option);
              close();
            }} />)}
              </HStack>
            </VStack>}
        </ComplexSelector>
        <Text type="supporting" color="secondary" data-testid="open-state">
          {isOpen ? 'open' : 'closed'}
        </Text>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A compact toolbar composition using the ghost trigger, a leading icon, end-aligned content, and an external control that opens the selector imperatively through its handleRef. The selector still owns its own visibility, focus restoration, and light dismiss.'
      }
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Audit matrix',
  tags: ['no-visual'],
  render: () => {
    const content = () => <Button label="Apply selection" size="sm" />;
    return <VStack gap={4} xstyle={styles.auditMatrix} data-testid="audit-matrix">
        <ComplexSelector label="Empty small" value="" size="sm">
          {content}
        </ComplexSelector>
        <ComplexSelector label="Selected medium" value="Design systems" triggerLabel="Design systems" data-testid="rtl-trigger">
          {content}
        </ComplexSelector>
        <ComplexSelector label="Long large" value="A long selected destination" triggerLabel="A long selected destination that must truncate without widening the field" size="lg">
          {content}
        </ComplexSelector>
        <ComplexSelector label="Ghost trigger" value="Compact" triggerLabel="Compact" variant="ghost" startIcon="viewColumns">
          {content}
        </ComplexSelector>
        <ComplexSelector label="Loading value" value="Saving" triggerLabel="Saving destination" isLoading>
          {content}
        </ComplexSelector>
        <ComplexSelector label="Disabled value" value="Unavailable" triggerLabel="Unavailable" isDisabled>
          {content}
        </ComplexSelector>
        <ComplexSelector label="Invalid required value" value="Needs attention" triggerLabel="Needs attention" isRequired status={{
        type: 'error',
        message: 'Choose an available destination.'
      }}>
          {content}
        </ComplexSelector>
        <ComplexSelector label="Warning value" value="Draft destination" triggerLabel="Draft destination" status={{
        type: 'warning',
        message: 'This destination is archived.'
      }}>
          {content}
        </ComplexSelector>
        <ComplexSelector label="Successful value" value="Ready" triggerLabel="Ready" status={{
        type: 'success',
        message: 'Destination is available.'
      }}>
          {content}
        </ComplexSelector>
        <ComplexSelector label="Custom trigger selector" value="Custom" contentXstyle={styles.auditPopupContent} renderTrigger={props => <Button data-testid="rtl-custom-trigger" label="Custom trigger" variant="secondary" {...props} />}>
          {content}
        </ComplexSelector>
      </VStack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A bounded audit fixture for the built-in sizes, variants, busy, disabled, validation, overflow, and caller-rendered trigger paths. Browser evidence drives this one fixture through light, dark, RTL, interaction, and 320px states.'
      }
    }
  }
}`,...X.parameters?.docs?.source}}},Z=[`FruitRipenessGrid`,`TreeListWithSearch`,`TreeListWithSearchAboveAppBar`,`CategoryTreeSelector`,`SecondaryVariant`,`ControlledToolbarTrigger`,`AuditMatrix`]})))()}Q();export{X as AuditMatrix,q as CategoryTreeSelector,Y as ControlledToolbarTrigger,W as FruitRipenessGrid,J as SecondaryVariant,G as TreeListWithSearch,K as TreeListWithSearchAboveAppBar,Z as __namedExportsOrder,R as default};