import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Table-DReqd1jV.js";import{i as o,r as s}from"./columnUtils-ClYX9X3Y.js";import{n as c,t as l}from"./useTableColumnResize-BiImaama.js";import{n as u,t as d}from"./useTableStickyColumns-CjZLR3jH.js";import{n as f,t as p}from"./neutralTheme-BXK-s1F0.js";import{a as m,c as h,i as g,o as _}from"./iframe-B7UFaprG.js";function v({children:e}){let[t,n]=(0,b.useState)(!1),[r,i]=(0,b.useState)(!1);return(0,x.jsx)(_,{theme:r?m:f,mode:t?`dark`:`system`,children:(0,x.jsxs)(`div`,{style:{backgroundColor:`var(--color-background-surface)`},children:[(0,x.jsx)(`button`,{type:`button`,onClick:()=>n(e=>!e),children:`Theme dark`}),(0,x.jsx)(`button`,{type:`button`,onClick:()=>i(e=>!e),children:`Theme stone`}),e]})})}function y({children:e}){let[t,n]=(0,b.useState)(!1),[r,i]=(0,b.useState)(!1),[a,o]=(0,b.useState)(!1);return(0,x.jsxs)(`div`,{"data-row-color":r?`green`:`red`,"data-border-on":a?`cells`:`row`,children:[(0,x.jsx)(`button`,{type:`button`,onClick:()=>n(e=>!e),children:`Show table`}),(0,x.jsx)(`button`,{type:`button`,onClick:()=>i(e=>!e),children:`Recolour row`}),(0,x.jsx)(`button`,{type:`button`,onClick:()=>o(e=>!e),children:`Border on cells`}),t&&e]})}var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=t((()=>{b=e(n()),i(),d(),l(),s(),h(),p(),g(),x=r(),S=[{id:`1`,name:`Alice Nguyen`,email:`alice@example.com`,team:`Design Systems`,role:`Staff Engineer`,location:`San Francisco`,startDate:`2019-03-12`,manager:`Priya Patel`,status:`Active`},{id:`2`,name:`Bob Martinez`,email:`bob@example.com`,team:`Design Systems`,role:`Senior Designer`,location:`New York`,startDate:`2020-07-01`,manager:`Priya Patel`,status:`Active`},{id:`3`,name:`Charlie Okafor`,email:`charlie@example.com`,team:`Platform`,role:`Engineering Manager`,location:`London`,startDate:`2017-11-20`,manager:`Sam Lee`,status:`On leave`},{id:`4`,name:`Diana Rossi`,email:`diana@example.com`,team:`Platform`,role:`Staff Engineer`,location:`Remote`,startDate:`2021-01-15`,manager:`Sam Lee`,status:`Active`},{id:`5`,name:`Ehsan Karimi`,email:`ehsan@example.com`,team:`Growth`,role:`Product Engineer`,location:`Berlin`,startDate:`2022-05-30`,manager:`Mei Chen`,status:`Active`}],C=[{key:`name`,header:`Name`,width:o(180)},{key:`email`,header:`Email`,width:o(220)},{key:`team`,header:`Team`,width:o(180)},{key:`role`,header:`Role`,width:o(200)},{key:`location`,header:`Location`,width:o(160)},{key:`startDate`,header:`Start date`,width:o(140)},{key:`manager`,header:`Manager`,width:o(180)},{key:`status`,header:`Status`,width:o(140)}],w={title:`Core/TableStickyColumns`,tags:[`autodocs`]},T={marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},E={render:()=>{let e=u({startKeys:[`name`]});return(0,x.jsxs)(`div`,{style:{maxWidth:720},children:[(0,x.jsxs)(`p`,{style:T,children:[(0,x.jsx)(`code`,{children:`startKeys: ['name']`}),` — scroll right to see the Name column stay pinned with a drop shadow.`]}),(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{stickyColumns:e}})]})}},D={render:()=>{let e=u({startKeys:[`name`]});return(0,x.jsxs)(`div`,{"data-testid":`pinned-dividers`,style:{maxWidth:720,"--color-border":`rgb(37, 99, 235)`},children:[(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers"] tbody tr:nth-child(2) { border-bottom: 2px solid rgb(220, 38, 38); }`}),(0,x.jsx)(`p`,{style:T,children:`A blue theme border color on every row and an app's red 2 px border on the second row, both on the pinned Name column as you scroll.`}),(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{stickyColumns:e}})]})}},O={render:()=>{let e=u({startKeys:[`name`],endKeys:[`status`]}),[t,n]=(0,b.useState)(!1),[r,i]=(0,b.useState)(!1),[o,s]=(0,b.useState)(!1),[c,l]=(0,b.useState)(!1),[d,f]=(0,b.useState)(!1),[p,m]=(0,b.useState)(!1),h=r?C:C.filter(e=>[`name`,`status`].includes(e.key));return(0,x.jsxs)(`div`,{"data-testid":`pinned-dividers-live`,style:{maxWidth:720},children:[(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-live"] tbody tr:hover td { border-bottom-color: rgb(147, 51, 234); }`}),t&&(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-live"] tbody tr:nth-child(3) td { border-bottom: 2px solid rgb(22, 163, 74); }`}),c&&(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-live"] tbody tr { border-bottom: 2px solid rgb(37, 99, 235); } [data-testid="pinned-dividers-live"] tbody tr:hover { border-bottom-color: rgb(220, 38, 38); }`}),p&&(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-live"] tbody tr:nth-child(3) td { border-top: 3px solid var(--color-border); }`}),d&&(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-live"] tbody tr:first-child td { border-top: 3px solid rgb(234, 88, 12); }`}),o&&(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-live"] tbody tr:nth-child(4) td { border-top: 3px solid rgb(234, 88, 12); }`}),(0,x.jsxs)(`p`,{style:T,children:[(0,x.jsx)(`button`,{type:`button`,onClick:()=>n(e=>!e),children:`Highlight`}),` `,(0,x.jsx)(`button`,{type:`button`,onClick:()=>s(e=>!e),children:`Thick top`}),` `,(0,x.jsx)(`button`,{type:`button`,onClick:()=>l(e=>!e),children:`Row borders`}),` `,(0,x.jsx)(`button`,{type:`button`,onClick:()=>f(e=>!e),children:`First row top`}),` `,(0,x.jsx)(`button`,{type:`button`,onClick:()=>m(e=>!e),children:`Token top border`}),` `,(0,x.jsx)(`button`,{type:`button`,onClick:()=>i(e=>!e),children:`Add columns`})]}),(0,x.jsx)(v,{children:(0,x.jsx)(a,{data:S,columns:h,idKey:`id`,plugins:{stickyColumns:e}})})]})}},k={render:()=>{let e=u({startKeys:[`name`]});return(0,x.jsxs)(`div`,{"data-testid":`pinned-dividers-revealed`,style:{maxWidth:720},children:[(0,x.jsx)(`style`,{children:`[data-testid="pinned-dividers-revealed"] tbody tr:nth-child(2) { border-bottom: 2px solid rgb(220, 38, 38); } [data-testid="pinned-dividers-revealed"] [data-row-color="green"] tbody tr:nth-child(2) { border-bottom-color: rgb(22, 163, 74); } [data-testid="pinned-dividers-revealed"] [data-border-on="cells"] tbody tr:nth-child(2) { border-bottom: 0; } [data-testid="pinned-dividers-revealed"] [data-border-on="cells"] tbody tr:nth-child(2) > td { border-bottom: 2px solid rgb(220, 38, 38); } [data-testid="pinned-dividers-revealed"] [data-border-on="cells"][data-row-color="green"] tbody tr:nth-child(2) > td { border-bottom-color: rgb(22, 163, 74); }`}),(0,x.jsx)(y,{children:(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{stickyColumns:e}})})]})}},A={render:()=>{let e=u({endKeys:[`status`]});return(0,x.jsxs)(`div`,{style:{maxWidth:720},children:[(0,x.jsxs)(`p`,{style:T,children:[(0,x.jsx)(`code`,{children:`endKeys: ['status']`}),` — the Status column stays pinned to the right edge while the rest scrolls.`]}),(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{stickyColumns:e}})]})}},j={render:()=>{let e=u({startKeys:[`name`,`email`],endKeys:[`status`]});return(0,x.jsxs)(`div`,{style:{maxWidth:720},children:[(0,x.jsxs)(`p`,{style:T,children:[(0,x.jsx)(`code`,{children:`startKeys: ['name', 'email']`}),` +`,` `,(0,x.jsx)(`code`,{children:`endKeys: ['status']`}),` — two columns pinned left with cumulative offsets, one pinned right.`]}),(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{stickyColumns:e}})]})}},M={render:()=>{let[e,t]=(0,b.useState)({}),n=c({columnWidths:e,columns:C,onColumnResizeEnd:e=>t(t=>({...t,...e}))}),r=u({startKeys:[`name`]});return(0,x.jsxs)(`div`,{style:{maxWidth:720},children:[(0,x.jsxs)(`p`,{style:T,children:[`Resize columns by dragging header edges; the pinned Name column stays sticky. Plugins compose:`,` `,(0,x.jsx)(`code`,{children:`{ columnResize, stickyColumns }`}),`.`]}),(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{columnResize:n,stickyColumns:r}})]})}},N={render:()=>{let e=u({});return(0,x.jsxs)(`div`,{style:{maxWidth:720},children:[(0,x.jsxs)(`p`,{style:T,children:[(0,x.jsxs)(`code`,{children:[`useTableStickyColumns(`,`{}`,`)`]}),` — no pinned columns; the table behaves as if the plugin weren't installed.`]}),(0,x.jsx)(a,{data:S,columns:C,idKey:`id`,plugins:{stickyColumns:e}})]})}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({
      startKeys: ['name']
    });
    return <div style={{
      maxWidth: 720
    }}>
        <p style={note}>
          <code>startKeys: ['name']</code> — scroll right to see the Name column
          stay pinned with a drop shadow.
        </p>
        <Table data={employees} columns={columns} idKey="id" plugins={{
        stickyColumns: sticky
      }} />
      </div>;
  }
}`,...E.parameters?.docs?.source},description:{story:"Pin the leading `Name` column to the start edge. Scroll horizontally — the\nname stays put and a drop shadow appears over the scrolling content.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({
      startKeys: ['name']
    });
    return <div data-testid="pinned-dividers" style={{
      maxWidth: 720,
      '--color-border': 'rgb(37, 99, 235)'
    } as React.CSSProperties}>
        <style>{\`[data-testid="pinned-dividers"] tbody tr:nth-child(2) { border-bottom: 2px solid rgb(220, 38, 38); }\`}</style>
        <p style={note}>
          A blue theme border color on every row and an app&apos;s red 2 px
          border on the second row, both on the pinned Name column as you
          scroll.
        </p>
        <Table data={employees} columns={columns} idKey="id" plugins={{
        stickyColumns: sticky
      }} />
      </div>;
  }
}`,...D.parameters?.docs?.source},description:{story:"A pinned column draws each row's divider itself, so the line under it moves\nwith the column. A theme's border color (`--color-border`, set on the\nwrapper here) and an app's own `border-bottom` on a row (the second row)\nboth carry over to the pinned cells.",...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({
      startKeys: ['name'],
      endKeys: ['status']
    });
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [hasMoreColumns, setHasMoreColumns] = useState(false);
    const [hasThickTop, setHasThickTop] = useState(false);
    const [hasRowBorders, setHasRowBorders] = useState(false);
    const [hasFirstRowTop, setHasFirstRowTop] = useState(false);
    const [hasTokenTop, setHasTokenTop] = useState(false);
    const shown = hasMoreColumns ? columns : columns.filter(column => ['name', 'status'].includes(column.key));
    return <div data-testid="pinned-dividers-live" style={{
      maxWidth: 720
    }}>
        <style>{\`[data-testid="pinned-dividers-live"] tbody tr:hover td { border-bottom-color: rgb(147, 51, 234); }\`}</style>
        {isHighlighted && <style>{\`[data-testid="pinned-dividers-live"] tbody tr:nth-child(3) td { border-bottom: 2px solid rgb(22, 163, 74); }\`}</style>}
        {hasRowBorders && <style>{\`[data-testid="pinned-dividers-live"] tbody tr { border-bottom: 2px solid rgb(37, 99, 235); } [data-testid="pinned-dividers-live"] tbody tr:hover { border-bottom-color: rgb(220, 38, 38); }\`}</style>}
        {hasTokenTop && <style>{\`[data-testid="pinned-dividers-live"] tbody tr:nth-child(3) td { border-top: 3px solid var(--color-border); }\`}</style>}
        {hasFirstRowTop && <style>{\`[data-testid="pinned-dividers-live"] tbody tr:first-child td { border-top: 3px solid rgb(234, 88, 12); }\`}</style>}
        {hasThickTop && <style>{\`[data-testid="pinned-dividers-live"] tbody tr:nth-child(4) td { border-top: 3px solid rgb(234, 88, 12); }\`}</style>}
        <p style={note}>
          <button type="button" onClick={() => setIsHighlighted(on => !on)}>
            Highlight
          </button>{' '}
          <button type="button" onClick={() => setHasThickTop(on => !on)}>
            Thick top
          </button>{' '}
          <button type="button" onClick={() => setHasRowBorders(on => !on)}>
            Row borders
          </button>{' '}
          <button type="button" onClick={() => setHasFirstRowTop(on => !on)}>
            First row top
          </button>{' '}
          <button type="button" onClick={() => setHasTokenTop(on => !on)}>
            Token top border
          </button>{' '}
          <button type="button" onClick={() => setHasMoreColumns(on => !on)}>
            Add columns
          </button>
        </p>
        {/* The table sits in its own Theme (\`system\` by default, so it
            follows the operating system), switched by a control inside it, so
            the switch does not re-render the component that calls the hooks. */}
        <ThemeAroundTable>
          <Table data={employees} columns={shown} idKey="id" plugins={{
          stickyColumns: sticky
        }} />
        </ThemeAroundTable>
      </div>;
  }
}`,...O.parameters?.docs?.source},description:{story:`A border that changes after mount reaches the pinned cells, and the edge
shadows follow columns added without a resize. Hovering a row turns its
line purple (an app's \`:hover\` rule on the cells); "Highlight" sets the
third row's border through React state; "Thick top" gives the fourth row a
3 px top border, which wins the collapse over the third row's bottom; "Row
borders" draws an app's 2 px blue border on the rows that turns red on
hover (\`tr:hover\`); "First row top" gives the first body row a 3 px top
border, which wins over the header's bottom; "Token top border" gives the
third row a 3 px top border in the theme's border token, which the pinned
cells above it carry as values and which follows a light/dark switch (the
table sits in a \`system\`-mode Theme); "Add columns" widens the table inside
the same wrapper.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({
      startKeys: ['name']
    });
    return <div data-testid="pinned-dividers-revealed" style={{
      maxWidth: 720
    }}>
        <style>{\`[data-testid="pinned-dividers-revealed"] tbody tr:nth-child(2) { border-bottom: 2px solid rgb(220, 38, 38); } [data-testid="pinned-dividers-revealed"] [data-row-color="green"] tbody tr:nth-child(2) { border-bottom-color: rgb(22, 163, 74); } [data-testid="pinned-dividers-revealed"] [data-border-on="cells"] tbody tr:nth-child(2) { border-bottom: 0; } [data-testid="pinned-dividers-revealed"] [data-border-on="cells"] tbody tr:nth-child(2) > td { border-bottom: 2px solid rgb(220, 38, 38); } [data-testid="pinned-dividers-revealed"] [data-border-on="cells"][data-row-color="green"] tbody tr:nth-child(2) > td { border-bottom-color: rgb(22, 163, 74); }\`}</style>
        <RevealBelowOwner>
          <Table data={employees} columns={columns} idKey="id" plugins={{
          stickyColumns: sticky
        }} />
        </RevealBelowOwner>
      </div>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({
      endKeys: ['status']
    });
    return <div style={{
      maxWidth: 720
    }}>
        <p style={note}>
          <code>endKeys: ['status']</code> — the Status column stays pinned to
          the right edge while the rest scrolls.
        </p>
        <Table data={employees} columns={columns} idKey="id" plugins={{
        stickyColumns: sticky
      }} />
      </div>;
  }
}`,...A.parameters?.docs?.source},description:{story:"Pin the trailing `Status` column to the end edge.",...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({
      startKeys: ['name', 'email'],
      endKeys: ['status']
    });
    return <div style={{
      maxWidth: 720
    }}>
        <p style={note}>
          <code>startKeys: ['name', 'email']</code> +{' '}
          <code>endKeys: ['status']</code> — two columns pinned left with
          cumulative offsets, one pinned right.
        </p>
        <Table data={employees} columns={columns} idKey="id" plugins={{
        stickyColumns: sticky
      }} />
      </div>;
  }
}`,...j.parameters?.docs?.source},description:{story:"Pin both edges at once. `startKeys`/`endKeys` each define a contiguous run\nfrom their edge inward; columns get cumulative offsets so multiple pinned\ncolumns stack correctly.",...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const resize = useTableColumnResize<Employee>({
      columnWidths,
      columns: columns as TableColumn<Record<string, unknown>>[],
      onColumnResizeEnd: updates => setColumnWidths(prev => ({
        ...prev,
        ...updates
      }))
    });
    const sticky = useTableStickyColumns<Employee>({
      startKeys: ['name']
    });
    return <div style={{
      maxWidth: 720
    }}>
        <p style={note}>
          Resize columns by dragging header edges; the pinned Name column stays
          sticky. Plugins compose:{' '}
          <code>{'{ columnResize, stickyColumns }'}</code>.
        </p>
        <Table data={employees} columns={columns} idKey="id" plugins={{
        columnResize: resize,
        stickyColumns: sticky
      }} />
      </div>;
  }
}`,...M.parameters?.docs?.source},description:{story:`Sticky columns composed with column resize. Resizing a pinned column keeps it
pinned; the plugin order (sticky after resize) ensures the sticky inline
offset wins over the resize handle's inline width.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sticky = useTableStickyColumns<Employee>({});
    return <div style={{
      maxWidth: 720
    }}>
        <p style={note}>
          <code>useTableStickyColumns({'{}'})</code> — no pinned columns; the
          table behaves as if the plugin weren't installed.
        </p>
        <Table data={employees} columns={columns} idKey="id" plugins={{
        stickyColumns: sticky
      }} />
      </div>;
  }
}`,...N.parameters?.docs?.source},description:{story:`Empty config is a valid no-op — nothing is pinned, every cell passes through
untouched. Lets callers compute keys conditionally without branching on
whether to install the plugin.`,...N.parameters?.docs?.description}}},P=[`PinStart`,`PinnedDividers`,`PinnedDividersLive`,`PinnedDividersRevealed`,`PinEnd`,`PinBothEdges`,`WithColumnResize`,`NoOpEmptyConfig`]})))()}F();export{N as NoOpEmptyConfig,j as PinBothEdges,A as PinEnd,E as PinStart,D as PinnedDividers,O as PinnedDividersLive,k as PinnedDividersRevealed,M as WithColumnResize,P as __namedExportsOrder,w as default};