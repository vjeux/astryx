import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Grid-DxYgorpj.js";import{n as o,t as s}from"./GridSpan-DojrJQ9X.js";function c({children:e,isTall:t,auditItem:n}){return(0,u.jsx)(`div`,{"data-audit-item":n,...{0:{className:`x9f619 x1b2ylru xwmxj5m xh6dtrn`},1:{className:`x9f619 x1b2ylru xwmxj5m xh6dtrn x1edz59j`}}[!!t|0],children:e})}function l({children:e}){return(0,u.jsx)(`div`,{className:`x9f619 x1b2ylru xwmxj5m xh6dtrn xfwpf8i x1g40iwv`,children:e})}var u,d,f,p;function m(){return(m=e((()=>{i(),o(),n(),u=t(),d={title:`Core/GridSpan`,component:s,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:'An optional wrapper that makes one Grid item span several columns or rows. `columns="full"` covers every explicit column.'}}}},f={render:()=>(0,u.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1qh66ti x9f619 xh8yej3 xwnkcuf xeuugli`,children:[(0,u.jsxs)(a,{"data-audit-grid":`numeric`,columns:3,gap:2,children:[(0,u.jsx)(s,{"data-audit-case":`numeric`,columns:2,children:(0,u.jsx)(l,{children:`Spans 2 columns`})}),(0,u.jsx)(c,{children:`One`})]}),(0,u.jsxs)(a,{"data-audit-grid":`full`,columns:3,gap:2,children:[(0,u.jsx)(s,{"data-audit-case":`full`,columns:`full`,children:(0,u.jsx)(l,{children:`Spans every explicit column`})}),(0,u.jsx)(c,{children:`One`}),(0,u.jsx)(c,{children:`Two`}),(0,u.jsx)(c,{children:`Three`})]}),(0,u.jsxs)(a,{"data-audit-grid":`rows`,columns:3,gap:2,rowHeight:48,children:[(0,u.jsx)(s,{"data-audit-case":`rows`,rows:2,children:(0,u.jsx)(l,{children:`Spans 2 rows`})}),(0,u.jsx)(c,{children:`One`}),(0,u.jsx)(c,{children:`Two`}),(0,u.jsx)(c,{children:`Three`}),(0,u.jsx)(c,{children:`Four`})]}),(0,u.jsx)(`div`,{"data-audit-host":`long-content`,className:`x16em4ew xeuugli`,children:(0,u.jsx)(a,{"data-audit-grid":`long-content`,columns:2,gap:2,children:(0,u.jsx)(s,{"data-audit-case":`long-content`,columns:`full`,children:(0,u.jsx)(l,{children:(0,u.jsx)(r,{"data-audit-text":`long-content`,type:`body`,maxLines:1,children:`A long single-line label that is much wider than its 240px grid and truncates inside the span`})})})})}),(0,u.jsxs)(a,{"data-audit-grid":`aligned`,columns:3,gap:2,align:`center`,children:[(0,u.jsx)(c,{isTall:!0,children:`Tall item`}),(0,u.jsx)(c,{auditItem:`aligned-plain`,children:`Short plain item`}),(0,u.jsx)(s,{"data-audit-case":`aligned`,children:(0,u.jsx)(l,{children:`Short spanned item`})})]})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.matrix)}>
      <Grid data-audit-grid="numeric" columns={3} gap={2}>
        <GridSpan data-audit-case="numeric" columns={2}>
          <Spanned>Spans 2 columns</Spanned>
        </GridSpan>
        <Item>One</Item>
      </Grid>

      <Grid data-audit-grid="full" columns={3} gap={2}>
        <GridSpan data-audit-case="full" columns="full">
          <Spanned>Spans every explicit column</Spanned>
        </GridSpan>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Grid>

      <Grid data-audit-grid="rows" columns={3} gap={2} rowHeight={48}>
        <GridSpan data-audit-case="rows" rows={2}>
          <Spanned>Spans 2 rows</Spanned>
        </GridSpan>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
        <Item>Four</Item>
      </Grid>

      <div data-audit-host="long-content" {...stylex.props(styles.narrowHost)}>
        <Grid data-audit-grid="long-content" columns={2} gap={2}>
          <GridSpan data-audit-case="long-content" columns="full">
            <Spanned>
              <Text data-audit-text="long-content" type="body" maxLines={1}>
                A long single-line label that is much wider than its 240px grid
                and truncates inside the span
              </Text>
            </Spanned>
          </GridSpan>
        </Grid>
      </div>

      <Grid data-audit-grid="aligned" columns={3} gap={2} align="center">
        <Item isTall>Tall item</Item>
        <Item auditItem="aligned-plain">Short plain item</Item>
        <GridSpan data-audit-case="aligned">
          <Spanned>Short spanned item</Spanned>
        </GridSpan>
      </Grid>
    </div>
}`,...f.parameters?.docs?.source},description:{story:`Bounded browser fixture for the GridSpan layout contract.`,...f.parameters?.docs?.description}}},p=[`SpanMatrix`]})))()}m();export{f as SpanMatrix,p as __namedExportsOrder,d as default};