import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Card-DA0ZfoAz.js";import{n as o,t as s}from"./VStack-SWtDePqc.js";import{n as c,t as l}from"./Section-g5hpGOnN.js";import{n as u,t as d}from"./Grid-DxYgorpj.js";import{n as f,t as p}from"./GridSpan-DojrJQ9X.js";import{n as m,t as h}from"./Tokenizer-D_tqRcHk.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{u(),f(),i(),c(),n(),o(),m(),g=t(),{expect:_}=__STORYBOOK_MODULE_TEST__,v={sectionLabel:{k1K539:`x1p37lm5`,$$css:!0}},y={title:`Core/Grid`,component:d,tags:[`autodocs`],argTypes:{columns:{control:`object`,description:`Column configuration: number for fixed columns, or {minWidth, max?, repeat?} for responsive`},gap:{control:`select`,options:[0,.5,1,1.5,2,3,4,5,6,8,10],description:`Spacing between all grid items`},rowGap:{control:`select`,options:[0,.5,1,1.5,2,3,4,5,6,8,10],description:`Spacing between rows (overrides gap)`},columnGap:{control:`select`,options:[0,.5,1,1.5,2,3,4,5,6,8,10],description:`Spacing between columns (overrides gap)`},align:{control:`select`,options:[`start`,`center`,`end`,`stretch`],description:`Vertical alignment of grid items`},justify:{control:`select`,options:[`start`,`center`,`end`,`stretch`],description:`Horizontal alignment of grid items`}}},b=({children:e})=>(0,g.jsx)(`div`,{className:`x1shk3sm x1eiddq6 xh6dtrn x2b8uid`,children:(0,g.jsx)(r,{type:`body`,children:e})}),x=({children:e})=>(0,g.jsx)(`div`,{className:`x1gt495 xgcxg3y xh6dtrn x2b8uid x5yr21d x9f619`,children:(0,g.jsx)(r,{type:`body`,children:e})}),S={args:{columns:3,gap:4},render:e=>(0,g.jsx)(`div`,{className:`x1shk3sm x10xzikg`,children:(0,g.jsxs)(d,{...e,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`})]})})},C={render:()=>(0,g.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1qh66ti`,children:[(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`2 Columns`}),(0,g.jsxs)(d,{columns:2,gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`})]})]}),(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`4 Columns`}),(0,g.jsxs)(d,{columns:4,gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`}),(0,g.jsx)(b,{children:`Item 7`}),(0,g.jsx)(b,{children:`Item 8`})]})]})]})},w={render:()=>(0,g.jsxs)(s,{gap:6,children:[(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`columns={{minWidth: 200, repeat: 'fit'}} with 2 items — cards stretch to fill`}),(0,g.jsxs)(d,{columns:{minWidth:200,repeat:`fit`},gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`})]})]}),(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Same auto-fit grid with 6 items; items fill the available tracks`}),(0,g.jsxs)(d,{columns:{minWidth:200,repeat:`fit`},gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`})]})]})]})},T={render:()=>(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Resize the viewport — columns auto-fill, empty tracks preserved (min 200px per item)`}),(0,g.jsxs)(d,{columns:{minWidth:200},gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`})]})]})},E={render:()=>(0,g.jsxs)(s,{gap:6,children:[(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`auto-fill (default) — items stay consistent width, empty tracks preserved`}),(0,g.jsxs)(d,{columns:{minWidth:250},gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`})]})]}),(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`auto-fit — items stretch to fill all available space`}),(0,g.jsxs)(d,{columns:{minWidth:250,repeat:`fit`},gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`})]})]})]})},D={render:()=>(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Responsive with max 3 columns (min 250px per item; column count is capped but present columns always fill)`}),(0,g.jsxs)(d,{columns:{minWidth:250,max:3},gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`})]})]})},O={name:`Capped — fills when collapsed (#3391)`,render:()=>(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsxs)(r,{type:`supporting`,xstyle:v.sectionLabel,children:[`columns=`,`{{minWidth: 360, max: 2}}`,` — resize the viewport narrow enough that only one column fits. The lone column stretches to full width (no dead space on the right); on wider viewports it caps at 2.`]}),(0,g.jsx)(`div`,{style:{maxWidth:520,resize:`horizontal`,overflow:`auto`},children:(0,g.jsxs)(d,{columns:{minWidth:360,max:2},gap:4,children:[(0,g.jsx)(b,{children:`Left block`}),(0,g.jsx)(b,{children:`Right block`})]})})]})},k={render:()=>(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Using GridSpan to span multiple columns/rows`}),(0,g.jsxs)(d,{columns:4,gap:4,children:[(0,g.jsx)(p,{columns:2,children:(0,g.jsx)(x,{children:`Spans 2 columns`})}),(0,g.jsx)(b,{children:`Normal`}),(0,g.jsx)(b,{children:`Normal`}),(0,g.jsx)(b,{children:`Normal`}),(0,g.jsx)(p,{columns:3,children:(0,g.jsx)(x,{children:`Spans 3 columns`})}),(0,g.jsx)(p,{columns:`full`,children:(0,g.jsx)(x,{children:`Full width (spans all columns)`})})]})]})},A=[{id:`short`,label:`Design`},{id:`long`,label:`A long token label with spaces that is much wider than the 500px grid cell it sits in, so it has to truncate`}],j={search:()=>A,bootstrap:()=>A},M={name:`GridSpan contains a long token (#7438)`,render:()=>(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`The dashed box is 500px wide. The long token truncates inside it.`}),(0,g.jsx)(`div`,{"data-testid":`host`,className:`x65f84u xeuugli xfwpf8i`,children:(0,g.jsx)(d,{columns:{minWidth:280,max:2},gap:4,children:(0,g.jsx)(p,{columns:`full`,children:(0,g.jsx)(s,{children:(0,g.jsx)(h,{label:`Labels`,width:`100%`,searchSource:j,value:A,onChange:()=>{}})})})})})]}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-testid="host"]`),n=t?.querySelector(`.astryx-grid-span`),r=n?.firstElementChild;if(!t||!n||!r)throw Error(`Expected the host, its GridSpan and the field stack`);let i=t.getBoundingClientRect().right;await _(n.getBoundingClientRect().right).toBeLessThanOrEqual(i+.5),await _(r.getBoundingClientRect().right).toBeLessThanOrEqual(i+.5)}},N={render:()=>(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Grid items spanning both columns and rows`}),(0,g.jsxs)(d,{columns:4,gap:4,children:[(0,g.jsx)(p,{columns:2,rows:2,children:(0,g.jsx)(x,{children:`2x2 Featured`})}),(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`})]})]})},P={render:()=>(0,g.jsxs)(l,{variant:`muted`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Gallery/Card Grid — Responsive with min 280px cards (auto-fill)`}),(0,g.jsx)(d,{columns:{minWidth:280},gap:5,children:Array.from({length:8},(e,t)=>(0,g.jsxs)(a,{children:[(0,g.jsx)(`div`,{className:`x1wkxgih x1eiddq6 xh6dtrn xep27e5`}),(0,g.jsxs)(r,{type:`label`,display:`block`,children:[`Card Title `,t+1]}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`A brief description of the card content goes here.`})]},t))})]})},F={render:()=>(0,g.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1qh66ti`,children:[(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Same gap for rows and columns (gap=4)`}),(0,g.jsxs)(d,{columns:3,gap:4,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`})]})]}),(0,g.jsxs)(`div`,{className:`x1shk3sm x10xzikg`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Different gaps: rowGap=2, columnGap=6`}),(0,g.jsxs)(d,{columns:3,rowGap:2,columnGap:6,children:[(0,g.jsx)(b,{children:`Item 1`}),(0,g.jsx)(b,{children:`Item 2`}),(0,g.jsx)(b,{children:`Item 3`}),(0,g.jsx)(b,{children:`Item 4`}),(0,g.jsx)(b,{children:`Item 5`}),(0,g.jsx)(b,{children:`Item 6`})]})]})]})},I={render:()=>(0,g.jsxs)(l,{variant:`muted`,children:[(0,g.jsx)(r,{type:`supporting`,xstyle:v.sectionLabel,children:`Dashboard-style layout with different sized widgets`}),(0,g.jsxs)(d,{columns:4,gap:4,children:[(0,g.jsx)(p,{columns:2,rows:2,children:(0,g.jsxs)(a,{children:[(0,g.jsx)(r,{type:`label`,display:`block`,children:`Main Chart`}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`Large visualization widget`})]})}),(0,g.jsxs)(a,{children:[(0,g.jsx)(r,{type:`label`,display:`block`,children:`Metric 1`}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`Quick stat`})]}),(0,g.jsxs)(a,{children:[(0,g.jsx)(r,{type:`label`,display:`block`,children:`Metric 2`}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`Quick stat`})]}),(0,g.jsxs)(a,{children:[(0,g.jsx)(r,{type:`label`,display:`block`,children:`Metric 3`}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`Quick stat`})]}),(0,g.jsxs)(a,{children:[(0,g.jsx)(r,{type:`label`,display:`block`,children:`Metric 4`}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`Quick stat`})]}),(0,g.jsx)(p,{columns:`full`,children:(0,g.jsxs)(a,{children:[(0,g.jsx)(r,{type:`label`,display:`block`,children:`Full-width Section`}),(0,g.jsx)(r,{type:`supporting`,display:`block`,children:`This section spans all explicit columns`})]})})]})]})},L={parameters:{layout:`padded`},render:()=>(0,g.jsxs)(`div`,{"data-testid":`grid-audit-host`,className:`x78zum5 xdt5ytf x1qh66ti x9f619 xh8yej3 xwnkcuf xeuugli`,children:[(0,g.jsxs)(d,{"data-testid":`grid-audit-fixed`,columns:3,gap:2,children:[(0,g.jsx)(b,{children:`One`}),(0,g.jsx)(b,{children:`Two`}),(0,g.jsx)(b,{children:`Three`})]}),(0,g.jsxs)(d,{"data-testid":`grid-audit-responsive`,columns:{minWidth:180,max:3},gap:2,children:[(0,g.jsx)(b,{children:`One`}),(0,g.jsx)(b,{children:`Two`}),(0,g.jsx)(b,{children:`Three`})]}),(0,g.jsxs)(d,{"data-testid":`grid-audit-fill`,columns:{minWidth:160},gap:2,children:[(0,g.jsx)(b,{children:`Fill one`}),(0,g.jsx)(b,{children:`Fill two`})]}),(0,g.jsxs)(d,{"data-testid":`grid-audit-fit`,columns:{minWidth:160,repeat:`fit`},gap:2,children:[(0,g.jsx)(b,{children:`Fit one`}),(0,g.jsx)(b,{children:`Fit two`})]}),(0,g.jsxs)(d,{"data-testid":`grid-audit-span-grid`,columns:3,gap:2,children:[(0,g.jsx)(p,{"data-testid":`grid-audit-span`,columns:`full`,children:(0,g.jsx)(b,{children:`All explicit columns`})}),(0,g.jsx)(b,{children:`One`}),(0,g.jsx)(b,{children:`Two`}),(0,g.jsx)(b,{children:`Three`})]})]}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-testid="grid-audit-host"]`),n=e.querySelector(`[data-testid="grid-audit-fixed"]`),r=e.querySelector(`[data-testid="grid-audit-responsive"]`),i=e.querySelector(`[data-testid="grid-audit-fill"]`),a=e.querySelector(`[data-testid="grid-audit-fit"]`),o=e.querySelector(`[data-testid="grid-audit-span-grid"]`),s=e.querySelector(`[data-testid="grid-audit-span"]`);if(!t||!n||!r||!i||!a||!o||!s)throw Error(`Expected the complete Grid audit fixture`);await _(n).toHaveClass(`astryx-grid`),await _(s).toHaveClass(`astryx-grid-span`),await _(getComputedStyle(n).display).toBe(`grid`);let c=getComputedStyle(n).direction,l=Array.from(n.children).map(e=>e.getBoundingClientRect().left);c===`rtl`?(await _(l[0]).toBeGreaterThan(l[1]),await _(l[1]).toBeGreaterThan(l[2])):(await _(l[0]).toBeLessThan(l[1]),await _(l[1]).toBeLessThan(l[2]));let u=t.getBoundingClientRect().right;for(let e of[n,r,i,a,o])await _(e.getBoundingClientRect().right).toBeLessThanOrEqual(u+.5);await _(t.scrollWidth).toBeLessThanOrEqual(t.clientWidth+1);let d=getComputedStyle(r),f=d.gridTemplateColumns.split(` `).filter(Boolean).length,p=Number.parseFloat(d.columnGap)||0,m=Math.min(3,Math.max(1,Math.floor((r.clientWidth+p)/(180+p))));if(await _(f).toBe(m),m===3){let e=i.firstElementChild.getBoundingClientRect().width,t=a.firstElementChild.getBoundingClientRect().width;await _(t).toBeGreaterThan(e)}let h=o.getBoundingClientRect(),g=s.getBoundingClientRect();await _(Math.abs(g.left-h.left)).toBeLessThanOrEqual(.5),await _(Math.abs(g.right-h.right)).toBeLessThanOrEqual(.5)}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    columns: 3,
    gap: 4
  },
  render: args => <div {...stylex.props(styles.container)}>
      <Grid {...args}>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </Grid>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.storyWrapper)}>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          2 Columns
        </Text>
        <Grid columns={2} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          4 Columns
        </Text>
        <Grid columns={4} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
          <GridItem>Item 7</GridItem>
          <GridItem>Item 8</GridItem>
        </Grid>
      </div>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={6}>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          {"columns={{minWidth: 200, repeat: 'fit'}} with 2 items — cards stretch to fill"}
        </Text>
        <Grid columns={{
        minWidth: 200,
        repeat: 'fit'
      }} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
        </Grid>
      </div>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          Same auto-fit grid with 6 items; items fill the available tracks
        </Text>
        <Grid columns={{
        minWidth: 200,
        repeat: 'fit'
      }} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </div>
    </VStack>
}`,...w.parameters?.docs?.source},description:{story:`auto-fit (repeat: 'fit') stretches items to fill when there are fewer
items than available columns. Compare with auto-fill (default) which
preserves consistent widths.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.container)}>
      <Text type="supporting" xstyle={styles.sectionLabel}>
        Resize the viewport — columns auto-fill, empty tracks preserved (min
        200px per item)
      </Text>
      <Grid columns={{
      minWidth: 200
    }} gap={4}>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
      </Grid>
    </div>
}`,...T.parameters?.docs?.source},description:{story:`New API: responsive columns with auto-fill (consistent widths)`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={6}>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          auto-fill (default) — items stay consistent width, empty tracks
          preserved
        </Text>
        <Grid columns={{
        minWidth: 250
      }} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
        </Grid>
      </div>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          auto-fit — items stretch to fill all available space
        </Text>
        <Grid columns={{
        minWidth: 250,
        repeat: 'fit'
      }} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
        </Grid>
      </div>
    </VStack>
}`,...E.parameters?.docs?.source},description:{story:`Side-by-side comparison: auto-fill vs auto-fit with few items`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.container)}>
      <Text type="supporting" xstyle={styles.sectionLabel}>
        Responsive with max 3 columns (min 250px per item; column count is
        capped but present columns always fill)
      </Text>
      <Grid columns={{
      minWidth: 250,
      max: 3
    }} gap={4}>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </Grid>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Capped — fills when collapsed (#3391)',
  render: () => <div {...stylex.props(styles.container)}>
      <Text type="supporting" xstyle={styles.sectionLabel}>
        columns={'{{minWidth: 360, max: 2}}'} — resize the viewport narrow
        enough that only one column fits. The lone column stretches to full
        width (no dead space on the right); on wider viewports it caps at 2.
      </Text>
      <div style={{
      maxWidth: 520,
      resize: 'horizontal',
      overflow: 'auto'
    }}>
        <Grid columns={{
        minWidth: 360,
        max: 2
      }} gap={4}>
          <GridItem>Left block</GridItem>
          <GridItem>Right block</GridItem>
        </Grid>
      </div>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.container)}>
      <Text type="supporting" xstyle={styles.sectionLabel}>
        Using GridSpan to span multiple columns/rows
      </Text>
      <Grid columns={4} gap={4}>
        <GridSpan columns={2}>
          <FeaturedItem>Spans 2 columns</FeaturedItem>
        </GridSpan>
        <GridItem>Normal</GridItem>
        <GridItem>Normal</GridItem>
        <GridItem>Normal</GridItem>
        <GridSpan columns={3}>
          <FeaturedItem>Spans 3 columns</FeaturedItem>
        </GridSpan>
        <GridSpan columns="full">
          <FeaturedItem>Full width (spans all columns)</FeaturedItem>
        </GridSpan>
      </Grid>
    </div>
}`,...k.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'GridSpan contains a long token (#7438)',
  render: () => <div {...stylex.props(styles.container)}>
      <Text type="supporting" xstyle={styles.sectionLabel}>
        The dashed box is 500px wide. The long token truncates inside it.
      </Text>
      <div data-testid="host" {...stylex.props(styles.narrowHost)}>
        <Grid columns={{
        minWidth: 280,
        max: 2
      }} gap={4}>
          <GridSpan columns="full">
            <VStack>
              <Tokenizer label="Labels" width="100%" searchSource={longTokenSource} value={longTokens} onChange={() => {}} />
            </VStack>
          </GridSpan>
        </Grid>
      </div>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('[data-testid="host"]');
    const span = host?.querySelector('.astryx-grid-span');
    const field = span?.firstElementChild;
    if (!host || !span || !field) {
      throw new Error('Expected the host, its GridSpan and the field stack');
    }
    // The span's single column must not grow past the host to fit a token.
    const hostRight = host.getBoundingClientRect().right;
    await expect(span.getBoundingClientRect().right).toBeLessThanOrEqual(hostRight + 0.5);
    await expect(field.getBoundingClientRect().right).toBeLessThanOrEqual(hostRight + 0.5);
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.container)}>
      <Text type="supporting" xstyle={styles.sectionLabel}>
        Grid items spanning both columns and rows
      </Text>
      <Grid columns={4} gap={4}>
        <GridSpan columns={2} rows={2}>
          <FeaturedItem>2x2 Featured</FeaturedItem>
        </GridSpan>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </Grid>
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Section variant="muted">
      <Text type="supporting" xstyle={styles.sectionLabel}>
        Gallery/Card Grid — Responsive with min 280px cards (auto-fill)
      </Text>
      <Grid columns={{
      minWidth: 280
    }} gap={5}>
        {Array.from({
        length: 8
      }, (_, i) => <Card key={i}>
            <div {...stylex.props(styles.cardImage)} />
            <Text type="label" display="block">
              Card Title {i + 1}
            </Text>
            <Text type="supporting" display="block">
              A brief description of the card content goes here.
            </Text>
          </Card>)}
      </Grid>
    </Section>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.storyWrapper)}>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          Same gap for rows and columns (gap=4)
        </Text>
        <Grid columns={3} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </div>
      <div {...stylex.props(styles.container)}>
        <Text type="supporting" xstyle={styles.sectionLabel}>
          Different gaps: rowGap=2, columnGap=6
        </Text>
        <Grid columns={3} rowGap={2} columnGap={6}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </div>
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Section variant="muted">
      <Text type="supporting" xstyle={styles.sectionLabel}>
        Dashboard-style layout with different sized widgets
      </Text>
      <Grid columns={4} gap={4}>
        <GridSpan columns={2} rows={2}>
          <Card>
            <Text type="label" display="block">
              Main Chart
            </Text>
            <Text type="supporting" display="block">
              Large visualization widget
            </Text>
          </Card>
        </GridSpan>
        <Card>
          <Text type="label" display="block">
            Metric 1
          </Text>
          <Text type="supporting" display="block">
            Quick stat
          </Text>
        </Card>
        <Card>
          <Text type="label" display="block">
            Metric 2
          </Text>
          <Text type="supporting" display="block">
            Quick stat
          </Text>
        </Card>
        <Card>
          <Text type="label" display="block">
            Metric 3
          </Text>
          <Text type="supporting" display="block">
            Quick stat
          </Text>
        </Card>
        <Card>
          <Text type="label" display="block">
            Metric 4
          </Text>
          <Text type="supporting" display="block">
            Quick stat
          </Text>
        </Card>
        <GridSpan columns="full">
          <Card>
            <Text type="label" display="block">
              Full-width Section
            </Text>
            <Text type="supporting" display="block">
              This section spans all explicit columns
            </Text>
          </Card>
        </GridSpan>
      </Grid>
    </Section>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div data-testid="grid-audit-host" {...stylex.props(styles.storyWrapper, styles.auditHost)}>
      <Grid data-testid="grid-audit-fixed" columns={3} gap={2}>
        <GridItem>One</GridItem>
        <GridItem>Two</GridItem>
        <GridItem>Three</GridItem>
      </Grid>

      <Grid data-testid="grid-audit-responsive" columns={{
      minWidth: 180,
      max: 3
    }} gap={2}>
        <GridItem>One</GridItem>
        <GridItem>Two</GridItem>
        <GridItem>Three</GridItem>
      </Grid>

      <Grid data-testid="grid-audit-fill" columns={{
      minWidth: 160
    }} gap={2}>
        <GridItem>Fill one</GridItem>
        <GridItem>Fill two</GridItem>
      </Grid>

      <Grid data-testid="grid-audit-fit" columns={{
      minWidth: 160,
      repeat: 'fit'
    }} gap={2}>
        <GridItem>Fit one</GridItem>
        <GridItem>Fit two</GridItem>
      </Grid>

      <Grid data-testid="grid-audit-span-grid" columns={3} gap={2}>
        <GridSpan data-testid="grid-audit-span" columns="full">
          <GridItem>All explicit columns</GridItem>
        </GridSpan>
        <GridItem>One</GridItem>
        <GridItem>Two</GridItem>
        <GridItem>Three</GridItem>
      </Grid>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-host"]');
    const fixed = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-fixed"]');
    const responsive = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-responsive"]');
    const fill = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-fill"]');
    const fit = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-fit"]');
    const spanGrid = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-span-grid"]');
    const span = canvasElement.querySelector<HTMLElement>('[data-testid="grid-audit-span"]');
    if (!host || !fixed || !responsive || !fill || !fit || !spanGrid || !span) {
      throw new Error('Expected the complete Grid audit fixture');
    }
    await expect(fixed).toHaveClass('astryx-grid');
    await expect(span).toHaveClass('astryx-grid-span');
    await expect(getComputedStyle(fixed).display).toBe('grid');
    const direction = getComputedStyle(fixed).direction;
    const fixedItems = Array.from(fixed.children) as HTMLElement[];
    const fixedStarts = fixedItems.map(item => item.getBoundingClientRect().left);
    if (direction === 'rtl') {
      await expect(fixedStarts[0]).toBeGreaterThan(fixedStarts[1]);
      await expect(fixedStarts[1]).toBeGreaterThan(fixedStarts[2]);
    } else {
      await expect(fixedStarts[0]).toBeLessThan(fixedStarts[1]);
      await expect(fixedStarts[1]).toBeLessThan(fixedStarts[2]);
    }
    const hostRight = host.getBoundingClientRect().right;
    for (const grid of [fixed, responsive, fill, fit, spanGrid]) {
      await expect(grid.getBoundingClientRect().right).toBeLessThanOrEqual(hostRight + 0.5);
    }
    await expect(host.scrollWidth).toBeLessThanOrEqual(host.clientWidth + 1);
    const responsiveStyle = getComputedStyle(responsive);
    const responsiveTracks = responsiveStyle.gridTemplateColumns.split(' ').filter(Boolean).length;
    const responsiveGap = Number.parseFloat(responsiveStyle.columnGap) || 0;
    const expectedResponsiveTracks = Math.min(3, Math.max(1, Math.floor((responsive.clientWidth + responsiveGap) / (180 + responsiveGap))));
    await expect(responsiveTracks).toBe(expectedResponsiveTracks);
    if (expectedResponsiveTracks === 3) {
      const fillWidth = (fill.firstElementChild as HTMLElement).getBoundingClientRect().width;
      const fitWidth = (fit.firstElementChild as HTMLElement).getBoundingClientRect().width;
      await expect(fitWidth).toBeGreaterThan(fillWidth);
    }
    const gridRect = spanGrid.getBoundingClientRect();
    const spanRect = span.getBoundingClientRect();
    await expect(Math.abs(spanRect.left - gridRect.left)).toBeLessThanOrEqual(0.5);
    await expect(Math.abs(spanRect.right - gridRect.right)).toBeLessThanOrEqual(0.5);
  }
}`,...L.parameters?.docs?.source},description:{story:`Bounded browser fixture for the Grid and GridSpan public layout contract.`,...L.parameters?.docs?.description}}},R=[`Default`,`FixedColumns`,`ResponsiveAutoFit`,`ResponsiveAutoFill`,`FillVsFitComparison`,`CappedResponsive`,`CappedCollapsesToFullWidth`,`WithGridSpan`,`GridSpanWithLongContent`,`GridSpanWithRows`,`GalleryExample`,`DifferentGaps`,`DashboardLayout`,`AuditMatrix`]})))()}z();export{L as AuditMatrix,O as CappedCollapsesToFullWidth,D as CappedResponsive,I as DashboardLayout,S as Default,F as DifferentGaps,E as FillVsFitComparison,C as FixedColumns,P as GalleryExample,M as GridSpanWithLongContent,N as GridSpanWithRows,T as ResponsiveAutoFill,w as ResponsiveAutoFit,k as WithGridSpan,R as __namedExportsOrder,y as default};