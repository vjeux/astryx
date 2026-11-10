import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./TypeaheadItem-B2bn45PO.js";import{n as a,t as o}from"./Typeahead-BOmIKfL8.js";import{n as s,t as ee}from"./MagnifyingGlassIcon-D2pYO0WH.js";function c(e,t){let n=t.toLowerCase();return e.filter(e=>e.label.toLowerCase().split(` `).some(e=>e.startsWith(n)))}function te(e){let t=null;return{bootstrap:()=>[],cancel(){t!=null&&(clearTimeout(t.timer),t.reject(Error(`cancelled`)),t=null)},async search(n,r){let i=c(e,n);return r?.update(i),await new Promise((e,r)=>{t={timer:setTimeout(()=>{t=null,e([...i,...c(ne,n)])},800),reject:r}})}}}var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,ne,K,q,J,Y,X,Z,Q,$,re;function ie(){return(ie=e((()=>{l=t(),a(),r(),s(),u=n(),{expect:d,userEvent:f,waitFor:p,within:m}=__STORYBOOK_MODULE_TEST__,h=[{id:`1`,label:`Apple`},{id:`2`,label:`Banana`},{id:`3`,label:`Cherry`},{id:`4`,label:`Date`},{id:`5`,label:`Elderberry`},{id:`6`,label:`Fig`},{id:`7`,label:`Grape`},{id:`8`,label:`Honeydew`}],g={search:e=>h.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>h.slice(0,5)},_={id:`9`,label:`Elderberry and Blackcurrant Preserve`},v={search:e=>[...h,_].filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>[_,...h.slice(0,4)]},y={search:e=>new Promise(t=>{setTimeout(()=>t(h.filter(t=>t.label.toLowerCase().includes(e.toLowerCase()))),1200)}),bootstrap:()=>new Promise(e=>setTimeout(()=>e(h.slice(0,5)),1200))},b={title:`Core/Typeahead`,component:o,tags:[`autodocs`],argTypes:{label:{control:`text`},placeholder:{control:`text`},isDisabled:{control:`boolean`},disabledMessage:{control:`text`,description:`Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the field focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled Typeahead in Tooltip.`},isRequired:{control:`boolean`},isOptional:{control:`boolean`},hasEntriesOnFocus:{control:`boolean`},hasClear:{control:`boolean`},maxMenuItems:{control:`number`},minQueryLength:{control:`number`,description:`Minimum query length before the search source is queried. Below it no search runs and the menu stays closed.`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Input size`}},decorators:[e=>(0,u.jsx)(`div`,{style:{width:320},children:(0,u.jsx)(e,{})})]},x={render:e=>{let[t,n]=(0,l.useState)(null);return(0,u.jsx)(o,{...e,searchSource:g,value:t,onChange:n})},args:{label:`Fruit`,placeholder:`Search fruits...`}},S={...x,args:{...x.args,hasEntriesOnFocus:!0},name:`With Bootstrap Results`},C={...x,args:{...x.args,hasEntriesOnFocus:!0,renderItem:e=>(0,u.jsx)(i,{item:e,description:`Fruit`,icon:(0,u.jsx)(ee,{width:16,height:16,"aria-hidden":`true`})})},name:`Parts / TypeaheadItem with icon`},w={...x,args:{...x.args,isRequired:!0}},T={...x,args:{...x.args,isOptional:!0}},E={...x,args:{...x.args,description:`Pick your favorite fruit from the list`}},D={...x,args:{...x.args,status:{type:`error`,message:`Please select a fruit`}}},O={...x,args:{...x.args,status:{type:`warning`,message:`This fruit may be out of season`}}},k={...x,args:{...x.args,status:{type:`success`,message:`Great choice!`}}},A={...x,args:{...x.args,isDisabled:!0}},j={...x,args:{...x.args,isDisabled:!0,disabledMessage:`You need the Editor role to change this`}},M={...x,args:{...x.args,hasClear:!1},name:`Without Clear Button`},N={...x,args:{...x.args,hasEntriesOnFocus:!0,maxMenuItems:3},name:`Max 3 Results`},P={...x,args:{...x.args,label:`Fruit (type 3 characters)`,placeholder:`Search fruits...`,description:`The search runs once three characters are typed.`,minQueryLength:3},name:`Minimum Query Length`},F={render:()=>{let[e,t]=(0,l.useState)(null),[n,r]=(0,l.useState)(null),[i,a]=(0,l.useState)(null);return(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,u.jsx)(o,{label:`Small (28px)`,searchSource:g,value:e,onChange:t,placeholder:`Small size`,size:`sm`}),(0,u.jsx)(o,{label:`Medium (32px)`,searchSource:g,value:n,onChange:r,placeholder:`Medium size (default)`,size:`md`}),(0,u.jsx)(o,{label:`Large (36px)`,searchSource:g,value:i,onChange:a,placeholder:`Large size`,size:`lg`})]})}},I={...x,args:{...x.args,startIcon:ee,hasEntriesOnFocus:!0},name:`With Start Icon`},L={render:()=>{let[e,t]=(0,l.useState)(null),[n,r]=(0,l.useState)(null);return(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:300},children:[(0,u.jsx)(o,{label:`Attached (default)`,searchSource:g,value:e,onChange:t,status:{type:`error`,message:`Please make a selection`}}),(0,u.jsx)(o,{label:`Detached`,searchSource:g,value:n,onChange:r,status:{type:`error`,message:`Please make a selection`},statusVariant:`detached`})]})}},R={render:()=>{let[e,t]=(0,l.useState)(null);return(0,u.jsx)(`div`,{style:{width:320},children:(0,u.jsx)(o,{label:`Fruit`,placeholder:`Type to search…`,searchSource:y,value:e,onChange:t,hasClear:!0,debounceMs:0})})},name:`Loading (async source)`},z=[{id:`u1`,label:`Bea Lin`},{id:`u2`,label:`Ben Ortiz`},{id:`u3`,label:`Benita Ruiz`},{id:`u4`,label:`Bo Park`}],B=[...z,{id:`u7`,label:`Ben Shah`},{id:`u8`,label:`Bennett Cole`},{id:`u9`,label:`Bea Novak`}],V=null,H={bootstrap:()=>z,cancel(){V!=null&&(clearTimeout(V.timer),V.reject(Error(`cancelled`)),V=null)},async search(e,t){let n=c(z,e);return t?.update(n),await new Promise((t,r)=>{V={timer:setTimeout(()=>{V=null;let r=new Set(n.map(e=>e.id)),i=c(B,e).filter(e=>!r.has(e.id));t([...n,...i])},800),reject:r}})}},U={render:()=>{let[e,t]=(0,l.useState)(null);return(0,u.jsx)(o,{label:`Assign to`,placeholder:`Search people`,searchSource:H,value:e,onChange:t,debounceMs:0})},name:`Incremental results (local first, server appended)`,play:async({canvasElement:e})=>{let t=m(e),n=t.getByRole(`combobox`,{name:`Assign to`}),r=m(document.body),i=()=>r.queryAllByRole(`option`).map(e=>e.textContent);await f.type(n,`ben`),await p(()=>d(i()).toEqual([`Ben Ortiz`,`Benita Ruiz`])),await d(n).toHaveAttribute(`aria-busy`,`true`),await f.keyboard(`{ArrowDown}`);let a=n.getAttribute(`aria-activedescendant`);await d(a).not.toBeNull(),await p(()=>d(n).not.toHaveAttribute(`aria-busy`),{timeout:3e3}),await d(i()).toEqual([`Ben Ortiz`,`Benita Ruiz`,`Ben Shah`,`Bennett Cole`]),await d(n).toHaveAttribute(`aria-activedescendant`,a??``),await f.keyboard(`{Enter}`),await d((await t.findAllByText(`Benita Ruiz`))[0]).toBeInTheDocument()}},W={render:()=>{let[e,t]=(0,l.useState)(null);return(0,u.jsx)(`div`,{style:{paddingBlockStart:`calc(100vh - 140px)`},children:(0,u.jsx)(o,{label:`Assign to`,placeholder:`Search people`,searchSource:H,value:e,onChange:t,debounceMs:0})})},name:`Incremental results above the field`,play:async({canvasElement:e})=>{let t=m(e).getByRole(`combobox`,{name:`Assign to`}),n=m(document.body);await f.type(t,`ben`),await p(()=>d(n.queryAllByRole(`option`)).toHaveLength(2));let[r]=n.getAllByRole(`option`),i=r.getBoundingClientRect().top;await d(r.getBoundingClientRect().bottom).toBeLessThanOrEqual(t.getBoundingClientRect().top),await p(()=>d(t).not.toHaveAttribute(`aria-busy`),{timeout:3e3}),await d(n.getAllByRole(`option`)).toHaveLength(4),await d(Math.abs(n.getAllByRole(`option`)[0].getBoundingClientRect().top-i)).toBeLessThan(1)}},G=Array.from({length:12},(e,t)=>({id:`local-${t}`,label:`Alex ${String.fromCharCode(65+t)}. Local`})),ne=Array.from({length:8},(e,t)=>({id:`server-${t}`,label:`Alex ${String.fromCharCode(77+t)}. Server`})),K=te(G),q=te(G.slice(0,2)),J={render:()=>{let[e,t]=(0,l.useState)(null);return(0,u.jsx)(o,{label:`Assign to`,placeholder:`Search people`,searchSource:K,value:e,onChange:t,debounceMs:0,maxMenuItems:30})},name:`Incremental results in a scrolled list`,play:async({canvasElement:e})=>{let t=m(e).getByRole(`combobox`,{name:`Assign to`}),n=m(document.body);await f.type(t,`alex`),await p(()=>d(n.queryAllByRole(`option`)).toHaveLength(12));let r=n.getByRole(`listbox`),i=r.scrollHeight>r.clientHeight?r:r.parentElement;i.scrollTop=i.scrollHeight;let a=i.scrollTop;await d(a).toBeGreaterThan(0);let o=n.getByRole(`option`,{name:`Alex L. Local`}),s=o.getBoundingClientRect().top;await p(()=>d(t).not.toHaveAttribute(`aria-busy`),{timeout:3e3}),await d(n.getAllByRole(`option`)).toHaveLength(20),await d(Math.abs(i.scrollTop-a)).toBeLessThan(1),await d(Math.abs(o.getBoundingClientRect().top-s)).toBeLessThan(1)}},Y={render:()=>{let[e,t]=(0,l.useState)(null);return(0,u.jsx)(`div`,{style:{paddingBlockStart:`calc(100vh - 280px)`},children:(0,u.jsx)(o,{label:`Assign to`,placeholder:`Search people`,searchSource:q,value:e,onChange:t,debounceMs:0})})},name:`Incremental results below the field, outgrowing the room`,play:async({canvasElement:e})=>{let t=m(e).getByRole(`combobox`,{name:`Assign to`}),n=m(document.body);await f.type(t,`alex`),await p(()=>d(n.queryAllByRole(`option`)).toHaveLength(2));let[r]=n.getAllByRole(`option`),i=r.getBoundingClientRect().top;await d(i).toBeGreaterThanOrEqual(t.getBoundingClientRect().bottom),await p(()=>d(t).not.toHaveAttribute(`aria-busy`),{timeout:3e3}),await d(n.getAllByRole(`option`)).toHaveLength(10);let a=n.getByRole(`listbox`);await d(a.getBoundingClientRect().top).toBeGreaterThanOrEqual(t.getBoundingClientRect().bottom-1),await d(a.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight),await d(Math.abs(n.getAllByRole(`option`)[0].getBoundingClientRect().top-i)).toBeLessThan(1)}},X={render:()=>{let[e,t]=(0,l.useState)(null);return(0,u.jsx)(o,{label:`Assign to`,placeholder:`Search people`,searchSource:H,value:e,onChange:t,debounceMs:0})},name:`Incremental results under a resting pointer`,play:async({canvasElement:e})=>{let t=m(e),n=t.getByRole(`combobox`,{name:`Assign to`}),r=m(document.body);await f.type(n,`ben`),await p(()=>d(r.queryAllByRole(`option`)).toHaveLength(2)),await f.keyboard(`{ArrowDown}`);let i=n.getAttribute(`aria-activedescendant`);await p(()=>d(n).not.toHaveAttribute(`aria-busy`),{timeout:3e3});let a=r.getByRole(`option`,{name:`Ben Shah`});a.dispatchEvent(new MouseEvent(`mouseover`,{bubbles:!0})),a.dispatchEvent(new MouseEvent(`mouseenter`)),await d(n).toHaveAttribute(`aria-activedescendant`,i??``),await f.keyboard(`{Enter}`),await d((await t.findAllByText(`Benita Ruiz`))[0]).toBeInTheDocument()}},Z={render:()=>{let[e,t]=(0,l.useState)(_),[n,r]=(0,l.useState)(null);return(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,gap:16},children:[(0,u.jsx)(o,{label:`Selected`,searchSource:v,value:e,onChange:t,hasClear:!0}),(0,u.jsx)(o,{label:`Empty`,placeholder:`Type to search…`,searchSource:v,value:n,onChange:r,hasClear:!0})]})},name:`Selected value in a content-sized parent`},Q={render:()=>{let[e,t]=(0,l.useState)(_);return(0,u.jsx)(`div`,{style:{width:320},children:(0,u.jsx)(o,{label:`Fruit`,searchSource:v,value:e,onChange:t,hasClear:!0})})},name:`Logical order`},$={render:()=>(0,u.jsx)(`div`,{style:{width:320},children:(0,u.jsx)(o,{label:`Fruit`,searchSource:g,value:h[0],onChange:()=>{},hasClear:!0})}),name:`RTL end lane (selected + clear)`},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <Typeahead {...args} searchSource={fruitSource} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits...'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    hasEntriesOnFocus: true
  },
  name: 'With Bootstrap Results'
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    hasEntriesOnFocus: true,
    renderItem: (item: SearchableItem) => <TypeaheadItem item={item} description="Fruit" icon={<MagnifyingGlassIcon width={16} height={16} aria-hidden="true" />} />
  },
  name: 'Parts / TypeaheadItem with icon'
}`,...C.parameters?.docs?.source},description:{story:`Fixture for the RTL audit: results rendered through TypeaheadItem with a
leading icon and a description, so the item's icon-then-content order can
be measured in both directions.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    isRequired: true
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    isOptional: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    description: 'Pick your favorite fruit from the list'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    status: {
      type: 'error',
      message: 'Please select a fruit'
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    status: {
      type: 'warning',
      message: 'This fruit may be out of season'
    }
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    status: {
      type: 'success',
      message: 'Great choice!'
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    isDisabled: true
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    isDisabled: true,
    disabledMessage: 'You need the Editor role to change this'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    hasClear: false
  },
  name: 'Without Clear Button'
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    hasEntriesOnFocus: true,
    maxMenuItems: 3
  },
  name: 'Max 3 Results'
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    label: 'Fruit (type 3 characters)',
    placeholder: 'Search fruits...',
    description: 'The search runs once three characters are typed.',
    minQueryLength: 3
  },
  name: 'Minimum Query Length'
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sm, setSm] = useState<SearchableItem | null>(null);
    const [md, setMd] = useState<SearchableItem | null>(null);
    const [lg, setLg] = useState<SearchableItem | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <Typeahead label="Small (28px)" searchSource={fruitSource} value={sm} onChange={setSm} placeholder="Small size" size="sm" />
        <Typeahead label="Medium (32px)" searchSource={fruitSource} value={md} onChange={setMd} placeholder="Medium size (default)" size="md" />
        <Typeahead label="Large (36px)" searchSource={fruitSource} value={lg} onChange={setLg} placeholder="Large size" size="lg" />
      </div>;
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.args,
    startIcon: MagnifyingGlassIcon,
    hasEntriesOnFocus: true
  },
  name: 'With Start Icon'
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<SearchableItem | null>(null);
    const [b, setB] = useState<SearchableItem | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 300
    }}>
        <Typeahead label="Attached (default)" searchSource={fruitSource} value={a} onChange={setA} status={{
        type: 'error',
        message: 'Please make a selection'
      }} />
        <Typeahead label="Detached" searchSource={fruitSource} value={b} onChange={setB} status={{
        type: 'error',
        message: 'Please make a selection'
      }} statusVariant="detached" />
      </div>;
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <div style={{
      width: 320
    }}>
        <Typeahead label="Fruit" placeholder="Type to search…" searchSource={slowFruitSource} value={value} onChange={setValue} hasClear debounceMs={0} />
      </div>;
  },
  name: 'Loading (async source)'
}`,...R.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <Typeahead label="Assign to" placeholder="Search people" searchSource={incrementalPeopleSource} value={value} onChange={setValue} debounceMs={0} />;
  },
  name: 'Incremental results (local first, server appended)',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign to'
    });
    const page = within(document.body);
    const labels = () => page.queryAllByRole('option').map(option => option.textContent);
    await userEvent.type(input, 'ben');
    // One change for the keystroke: the local matches, while still busy.
    await waitFor(() => expect(labels()).toEqual(['Ben Ortiz', 'Benita Ruiz']));
    await expect(input).toHaveAttribute('aria-busy', 'true');
    await userEvent.keyboard('{ArrowDown}');
    const activeId = input.getAttribute('aria-activedescendant');
    await expect(activeId).not.toBeNull();

    // The server answer only appends; the shown rows and highlight stay put.
    await waitFor(() => expect(input).not.toHaveAttribute('aria-busy'), {
      timeout: 3000
    });
    await expect(labels()).toEqual(['Ben Ortiz', 'Benita Ruiz', 'Ben Shah', 'Bennett Cole']);
    await expect(input).toHaveAttribute('aria-activedescendant', activeId ?? '');
    await userEvent.keyboard('{Enter}');
    // The selected person shows as the field's value.
    // The field shows the selected person (its value text renders more than
    // once: shown, and measured for sizing).
    await expect((await canvas.findAllByText('Benita Ruiz'))[0]).toBeInTheDocument();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <div style={{
      paddingBlockStart: 'calc(100vh - 140px)'
    }}>
        <Typeahead label="Assign to" placeholder="Search people" searchSource={incrementalPeopleSource} value={value} onChange={setValue} debounceMs={0} />
      </div>;
  },
  name: 'Incremental results above the field',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign to'
    });
    const page = within(document.body);
    await userEvent.type(input, 'ben');
    await waitFor(() => expect(page.queryAllByRole('option')).toHaveLength(2));
    const [first] = page.getAllByRole('option');
    const firstTop = first.getBoundingClientRect().top;
    await expect(first.getBoundingClientRect().bottom).toBeLessThanOrEqual(input.getBoundingClientRect().top);
    await waitFor(() => expect(input).not.toHaveAttribute('aria-busy'), {
      timeout: 3000
    });
    await expect(page.getAllByRole('option')).toHaveLength(4);
    // The shown rows did not move; the appended ones are reached by scrolling.
    await expect(Math.abs(page.getAllByRole('option')[0].getBoundingClientRect().top - firstTop)).toBeLessThan(1);
  }
}`,...W.parameters?.docs?.source},description:{story:`The same source with the field near the bottom of the viewport, so the
popup opens above it. Appended server rows scroll inside the popup; the
rows already shown keep their place on screen (spec:AST-092 FR6).`,...W.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <Typeahead label="Assign to" placeholder="Search people" searchSource={scrolledSource} value={value} onChange={setValue} debounceMs={0} maxMenuItems={30} />;
  },
  name: 'Incremental results in a scrolled list',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign to'
    });
    const page = within(document.body);
    await userEvent.type(input, 'alex');
    await waitFor(() => expect(page.queryAllByRole('option')).toHaveLength(12));
    const listbox = page.getByRole('listbox');
    const scroller = listbox.scrollHeight > listbox.clientHeight ? listbox : listbox.parentElement as HTMLElement;
    scroller.scrollTop = scroller.scrollHeight;
    const scrolledTo = scroller.scrollTop;
    await expect(scrolledTo).toBeGreaterThan(0);
    const lastShown = page.getByRole('option', {
      name: 'Alex L. Local'
    });
    const lastShownTop = lastShown.getBoundingClientRect().top;
    await waitFor(() => expect(input).not.toHaveAttribute('aria-busy'), {
      timeout: 3000
    });
    await expect(page.getAllByRole('option')).toHaveLength(20);
    // The scroll offset and the shown rows' place on screen did not move.
    await expect(Math.abs(scroller.scrollTop - scrolledTo)).toBeLessThan(1);
    await expect(Math.abs(lastShown.getBoundingClientRect().top - lastShownTop)).toBeLessThan(1);
  }
}`,...J.parameters?.docs?.source},description:{story:`The user scrolls a partial list before the server answers: appended rows
land below, and the scroll position and the rows shown stay put.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <div style={{
      paddingBlockStart: 'calc(100vh - 280px)'
    }}>
        <Typeahead label="Assign to" placeholder="Search people" searchSource={shortListSource} value={value} onChange={setValue} debounceMs={0} />
      </div>;
  },
  name: 'Incremental results below the field, outgrowing the room',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign to'
    });
    const page = within(document.body);
    await userEvent.type(input, 'alex');
    await waitFor(() => expect(page.queryAllByRole('option')).toHaveLength(2));
    const [first] = page.getAllByRole('option');
    const firstTop = first.getBoundingClientRect().top;
    // The first list opens below the field.
    await expect(firstTop).toBeGreaterThanOrEqual(input.getBoundingClientRect().bottom);
    await waitFor(() => expect(input).not.toHaveAttribute('aria-busy'), {
      timeout: 3000
    });
    await expect(page.getAllByRole('option')).toHaveLength(10);
    const popup = page.getByRole('listbox');
    // Still below the field, inside the viewport, with the first row in place.
    await expect(popup.getBoundingClientRect().top).toBeGreaterThanOrEqual(input.getBoundingClientRect().bottom - 1);
    await expect(popup.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight);
    await expect(Math.abs(page.getAllByRole('option')[0].getBoundingClientRect().top - firstTop)).toBeLessThan(1);
  }
}`,...Y.parameters?.docs?.source},description:{story:`The field sits low enough that the first, short list fits below it but the
server's answer would not: the popup stays below and grows only within the
room there, scrolling the rest (spec:AST-092 FR6).`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <Typeahead label="Assign to" placeholder="Search people" searchSource={incrementalPeopleSource} value={value} onChange={setValue} debounceMs={0} />;
  },
  name: 'Incremental results under a resting pointer',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign to'
    });
    const page = within(document.body);
    await userEvent.type(input, 'ben');
    await waitFor(() => expect(page.queryAllByRole('option')).toHaveLength(2));
    await userEvent.keyboard('{ArrowDown}');
    const activeId = input.getAttribute('aria-activedescendant');
    await waitFor(() => expect(input).not.toHaveAttribute('aria-busy'), {
      timeout: 3000
    });
    // A row appearing under a still pointer gets boundary events, not a move.
    const appended = page.getByRole('option', {
      name: 'Ben Shah'
    });
    appended.dispatchEvent(new MouseEvent('mouseover', {
      bubbles: true
    }));
    appended.dispatchEvent(new MouseEvent('mouseenter'));
    await expect(input).toHaveAttribute('aria-activedescendant', activeId ?? '');
    await userEvent.keyboard('{Enter}');
    // The field shows the selected person (its value text renders more than
    // once: shown, and measured for sizing).
    await expect((await canvas.findAllByText('Benita Ruiz'))[0]).toBeInTheDocument();
  }
}`,...X.parameters?.docs?.source},description:{story:`A pointer resting where the server's rows land does not take the
highlight: the rows arrive under it without the pointer moving, so Enter
still picks the row the keyboard highlighted (spec:AST-092 FR6).`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<SearchableItem | null>(longFruit);
    const [b, setB] = useState<SearchableItem | null>(null);
    return <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }}>
        <Typeahead label="Selected" searchSource={longFruitSource} value={a} onChange={setA} hasClear />
        <Typeahead label="Empty" placeholder="Type to search…" searchSource={longFruitSource} value={b} onChange={setB} hasClear />
      </div>;
  },
  name: 'Selected value in a content-sized parent'
}`,...Z.parameters?.docs?.source},description:{story:`The two cases no Typeahead story covered, which is why a bug this visible
survived: a value selected, and a parent that is sized by its content.

Every other story renders in a fixed-width container, and a block-level
parent fills its container whatever its content is — so both hid a field
that sized itself to its value. Here the field is a flex item, so it is
shrink-to-fit: a table cell, an inline toolbar, a floated column.

Left, a long value: it must not widen the field, and it must ellipsize
before the clear button rather than under it. Right, an empty field for
comparison — the two must be the same width.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<SearchableItem | null>(longFruit);
    return <div style={{
      width: 320
    }}>
        <Typeahead label="Fruit" searchSource={longFruitSource} value={value} onChange={setValue} hasClear />
      </div>;
  },
  name: 'Logical order'
}`,...Q.parameters?.docs?.source},description:{story:`One field with a selected value and a clear button — the two ends of the
content lane. The token opens the lane and the clear button closes it, so
under RTL they must swap sides: this is the story the RTL audit measures as
a D2 layout-order-flip.

A single field on purpose. The comparison story next to it renders two, and
the audit's selectors would match across both.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 320
  }}>
      <Typeahead label="Fruit" searchSource={fruitSource} value={fruits[0]} onChange={() => {}} hasClear />
    </div>,
  name: 'RTL end lane (selected + clear)'
}`,...$.parameters?.docs?.source},description:{story:`The inline-end lane, populated at rest, for the RTL audit's D4 pass.

The lane holds the busy Spinner, and the busy state only exists between a
keystroke and its response — nothing the audit can hold still. A selected
value with \`hasClear\` puts the same lane on screen with no interaction, so
the audit measures the geometry the indicator lands in.`,...$.parameters?.docs?.description}}},re=`Default.WithBootstrap.ItemWithIcon.Required.Optional.WithDescription.WithError.WithWarning.WithSuccess.Disabled.DisabledWithMessage.NoClear.LimitedResults.MinQueryLength.SizeVariants.WithStartIcon.StatusVariantComparison.Loading.IncrementalResults.IncrementalResultsAboveField.IncrementalResultsScrolled.IncrementalResultsBelowFieldOverflow.IncrementalResultsRestingPointer.SelectedValueInAContentSizedParent.LogicalOrder.RtlEndLane`.split(`.`)})))()}ie();export{x as Default,A as Disabled,j as DisabledWithMessage,U as IncrementalResults,W as IncrementalResultsAboveField,Y as IncrementalResultsBelowFieldOverflow,X as IncrementalResultsRestingPointer,J as IncrementalResultsScrolled,C as ItemWithIcon,N as LimitedResults,R as Loading,Q as LogicalOrder,P as MinQueryLength,M as NoClear,T as Optional,w as Required,$ as RtlEndLane,Z as SelectedValueInAContentSizedParent,F as SizeVariants,L as StatusVariantComparison,S as WithBootstrap,E as WithDescription,D as WithError,I as WithStartIcon,k as WithSuccess,O as WithWarning,re as __namedExportsOrder,b as default};