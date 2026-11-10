import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Timestamp-Czd81oha.js";import{l as o,u as s}from"./iframe-B7UFaprG.js";function c({locale:e}){let t=Date.now()/1e3;return(0,l.jsx)(o,{locale:e,children:(0,l.jsxs)(`div`,{style:{width:680},children:[(0,l.jsx)(r,{type:`large`,weight:`bold`,children:`Relative-time transition points`}),(0,l.jsxs)(r,{type:`supporting`,color:`secondary`,display:`block`,children:[`Provider locale: `,e]}),(0,l.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(280px, 1fr) minmax(160px, auto)`,gap:`10px 32px`,marginTop:20},children:m.map(({label:e,offsetSeconds:n})=>(0,l.jsxs)(`div`,{style:{display:`contents`},children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:e}),(0,l.jsx)(a,{value:t+n,format:`relative`,hasTooltip:!1,type:`body`,color:`primary`})]},e))})]})})}var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{i(),s(),n(),l=t(),u={title:`Core/Timestamp`,component:a,tags:[`autodocs`],argTypes:{format:{control:`select`,options:[`relative`,`relative_short`,`auto`,`date`,`date_long`,`date_weekday`,`date_time`,`time`,`system_date`,`system_date_time`,`system_time`],description:`Display format`},type:{control:`select`,options:[`body`,`large`,`label`,`supporting`,`code`,`display-1`,`display-2`,`display-3`],description:`Semantic text type (from Text)`},size:{control:`select`,options:[`4xs`,`3xs`,`2xs`,`xsm`,`sm`,`base`,`lg`,`xl`,`2xl`,`3xl`,`4xl`],description:`Font size override`},color:{control:`select`,options:[`primary`,`secondary`,`disabled`,`placeholder`,`accent`,`inherit`],description:`Text color`},weight:{control:`select`,options:[`normal`,`medium`,`semibold`,`bold`],description:`Font weight`},isLive:{control:`boolean`,description:`Live-update relative time`},hasTooltip:{control:`boolean`,description:`Show copyable details on hover or keyboard focus`},isTimezoneShown:{control:`boolean`,description:`Append timezone abbreviation`}}},d={args:{value:`2026-03-25T12:00:00Z`}},f={parameters:{docs:{description:{story:`Tab to a timestamp to reveal its details dialog. The focused time exposes the popup relationship. Tab into the copy button; Escape dismisses its tooltip, then the card, returning focus to the timestamp.`}}},render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`,alignItems:`flex-start`},children:[(0,l.jsx)(a,{value:Date.now()/1e3-5,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3-120,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3-3600,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3-86400,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3-259200,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3-7776e3,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3-63072e3,format:`relative`})]})},p={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`,alignItems:`flex-start`},children:[(0,l.jsx)(a,{value:Date.now()/1e3-5,format:`relative_short`}),(0,l.jsx)(a,{value:Date.now()/1e3-120,format:`relative_short`}),(0,l.jsx)(a,{value:Date.now()/1e3-3600,format:`relative_short`}),(0,l.jsx)(a,{value:Date.now()/1e3-86400,format:`relative_short`}),(0,l.jsx)(a,{value:Date.now()/1e3-259200,format:`relative_short`}),(0,l.jsx)(a,{value:Date.now()/1e3-7776e3,format:`relative_short`}),(0,l.jsx)(a,{value:Date.now()/1e3-63072e3,format:`relative_short`})]})},m=[{label:`Present clamp · 5 seconds ago`,offsetSeconds:-5},{label:`Past seconds begin · 10 seconds ago`,offsetSeconds:-10},{label:`Past minutes begin · 60 seconds ago`,offsetSeconds:-60},{label:`Past hours begin · 1 hour ago`,offsetSeconds:-3600},{label:`Past days begin · 1 day ago`,offsetSeconds:-86400},{label:`Past months begin · 30 days ago`,offsetSeconds:-2592e3},{label:`Past years begin · 365 days ago`,offsetSeconds:-31536e3},{label:`Future skew clamp · 30 seconds`,offsetSeconds:30},{label:`Future seconds begin · 31 seconds`,offsetSeconds:31},{label:`Future minutes begin · 60 seconds`,offsetSeconds:60},{label:`Future hours begin · 1 hour`,offsetSeconds:3600},{label:`Future days begin · 1 day`,offsetSeconds:86400},{label:`Future months begin · 30 days`,offsetSeconds:2592e3},{label:`Future years begin · 365 days`,offsetSeconds:31536e3}],h={name:`Relative thresholds · English`,render:()=>(0,l.jsx)(c,{locale:`en-US`})},g={args:{value:`2026-02-19T17:00:00Z`,format:`date`}},_={args:{value:`2026-02-19T17:00:00Z`,format:`date_long`}},v={args:{value:`2026-02-19T17:00:00Z`,format:`date_weekday`}},y={args:{value:`2026-02-19T17:00:00Z`,format:`date_time`}},b={args:{value:`2026-02-19T17:00:00Z`,format:`date_time`,isTimezoneShown:!0}},x={name:`Explicit time zone`,render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,timezoneID:`UTC`,isTimezoneShown:!0}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,timezoneID:`America/Los_Angeles`,isTimezoneShown:!0}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,timezoneID:`Asia/Tokyo`,isTimezoneShown:!0})]})},S={args:{value:`2026-02-19T17:00:00Z`,format:`time`}},C={name:`Hover card — configuration examples`,render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`Local + UTC, default format — hover or tab to the timestamp, then copy any row`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`relative`,tooltipEntries:[{label:`Local`},{timezoneID:`UTC`,label:`UTC`}]})})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`Three labelled zones — the widest case the card holds`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date`,tooltipEntries:[{timezoneID:`America/New_York`,format:`date_time`,label:`New York`},{timezoneID:`Europe/London`,format:`date_time`,label:`London`},{timezoneID:`Asia/Tokyo`,format:`date_time`,label:`Tokyo`}]})})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`One zone, two formats — friendly line plus a machine-precise line`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,tooltipEntries:[{format:`full`},{format:`system_date_time`,label:`ISO`}]})})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`UTC only — an audit log that never shows local time`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,tooltipEntries:[{timezoneID:`UTC`,label:`UTC`}]})})]})]})},w={name:`Copyable hover card`,render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`Local, UTC, another zone, and Unix seconds — hover or tab, then copy any row`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`relative`,tooltipEntries:[{label:`Local`},{timezoneID:`UTC`,label:`UTC`},{timezoneID:`Asia/Tokyo`,format:`date_time`,label:`Tokyo`},{timezoneID:`UTC`,format:`system_date_time`,label:`ISO (UTC)`}]})})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`A single UTC entry — one copyable row, on an absolute format that has no hover card of its own`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,tooltipEntries:[{timezoneID:`UTC`,label:`UTC`}]})})]})]})},T={name:`Per-entry copyable`,render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`Mixed: human-readable rows are read-only; only the machine value opts into a copy button`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`relative`,tooltipEntries:[{label:`Local`},{timezoneID:`UTC`,label:`UTC`},{timezoneID:`UTC`,format:`system_date_time`,label:`ISO (UTC)`,isCopyable:!0}]})})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`Fully read-only card — no row opts in, so there is no copy button and no trailing action column`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`relative`,tooltipEntries:[{label:`Local`},{timezoneID:`UTC`,label:`UTC`}]})})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{type:`supporting`,color:`secondary`,children:`Single read-only row with no label — the value sits flush at the leading edge`}),(0,l.jsx)(`div`,{children:(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`relative`,tooltipEntries:[{}]})})]})]})},E={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`system_date:`,` `]}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`system_date`,type:`code`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`system_date_time:`,` `]}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`system_date_time`,type:`code`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`system_time:`,` `]}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`system_time`,type:`code`})]})]})},D={render:()=>{let e=`2026-02-19T17:00:00Z`;return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`relative:`,` `]}),(0,l.jsx)(a,{value:Date.now()/1e3-3600,format:`relative`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`date:`,` `]}),(0,l.jsx)(a,{value:e,format:`date`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`date_long:`,` `]}),(0,l.jsx)(a,{value:e,format:`date_long`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`date_weekday:`,` `]}),(0,l.jsx)(a,{value:e,format:`date_weekday`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`date_time:`,` `]}),(0,l.jsx)(a,{value:e,format:`date_time`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`time:`,` `]}),(0,l.jsx)(a,{value:e,format:`time`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`system_date:`,` `]}),(0,l.jsx)(a,{value:e,format:`system_date`,type:`code`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`system_date_time:`,` `]}),(0,l.jsx)(a,{value:e,format:`system_date_time`,type:`code`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`system_time:`,` `]}),(0,l.jsx)(a,{value:e,format:`system_time`,type:`code`})]})]})}},O={args:{value:Date.now()/1e3-5,format:`relative`,isLive:!0}},k={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,type:`supporting`}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,type:`body`}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,type:`large`}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,type:`label`,weight:`semibold`})]})},A={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,color:`primary`}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,color:`secondary`}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,color:`disabled`}),(0,l.jsx)(a,{value:`2026-02-19T17:00:00Z`,format:`date_time`,color:`accent`})]})},j={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`Recent (relative):`,` `]}),(0,l.jsx)(a,{value:Date.now()/1e3-3600,format:`auto`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(r,{type:`label`,color:`secondary`,children:[`Old (date_time):`,` `]}),(0,l.jsx)(a,{value:`2025-01-01T12:00:00Z`,format:`auto`})]})]})},M={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`,alignItems:`flex-start`},children:[(0,l.jsx)(a,{value:Date.now()/1e3+60,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3+3600,format:`relative`}),(0,l.jsx)(a,{value:Date.now()/1e3+86400,format:`relative`})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-03-25T12:00:00Z'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Tab to a timestamp to reveal its details dialog. The focused time exposes the popup relationship. Tab into the copy button; Escape dismisses its tooltip, then the card, returning focus to the timestamp.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start'
  }}>
      <Timestamp value={Date.now() / 1000 - 5} format="relative" />
      <Timestamp value={Date.now() / 1000 - 120} format="relative" />
      <Timestamp value={Date.now() / 1000 - 3600} format="relative" />
      <Timestamp value={Date.now() / 1000 - 86400} format="relative" />
      <Timestamp value={Date.now() / 1000 - 259200} format="relative" />
      <Timestamp value={Date.now() / 1000 - 90 * 86400} format="relative" />
      <Timestamp value={Date.now() / 1000 - 730 * 86400} format="relative" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start'
  }}>
      <Timestamp value={Date.now() / 1000 - 5} format="relative_short" />
      <Timestamp value={Date.now() / 1000 - 120} format="relative_short" />
      <Timestamp value={Date.now() / 1000 - 3600} format="relative_short" />
      <Timestamp value={Date.now() / 1000 - 86400} format="relative_short" />
      <Timestamp value={Date.now() / 1000 - 259200} format="relative_short" />
      <Timestamp value={Date.now() / 1000 - 90 * 86400} format="relative_short" />
      <Timestamp value={Date.now() / 1000 - 730 * 86400} format="relative_short" />
    </div>
}`,...p.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Relative thresholds · English',
  render: () => <RelativeThresholds locale="en-US" />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-02-19T17:00:00Z',
    format: 'date'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-02-19T17:00:00Z',
    format: 'date_long'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-02-19T17:00:00Z',
    format: 'date_weekday'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-02-19T17:00:00Z',
    format: 'date_time'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-02-19T17:00:00Z',
    format: 'date_time',
    isTimezoneShown: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Explicit time zone',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" timezoneID="UTC" isTimezoneShown />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" timezoneID="America/Los_Angeles" isTimezoneShown />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" timezoneID="Asia/Tokyo" isTimezoneShown />
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026-02-19T17:00:00Z',
    format: 'time'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Hover card — configuration examples',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
      <div>
        <Text type="supporting" color="secondary">
          Local + UTC, default format — hover or tab to the timestamp, then copy
          any row
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="relative" tooltipEntries={[{
          label: 'Local'
        }, {
          timezoneID: 'UTC',
          label: 'UTC'
        }]} />
        </div>
      </div>
      <div>
        <Text type="supporting" color="secondary">
          Three labelled zones — the widest case the card holds
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="date" tooltipEntries={[{
          timezoneID: 'America/New_York',
          format: 'date_time',
          label: 'New York'
        }, {
          timezoneID: 'Europe/London',
          format: 'date_time',
          label: 'London'
        }, {
          timezoneID: 'Asia/Tokyo',
          format: 'date_time',
          label: 'Tokyo'
        }]} />
        </div>
      </div>
      <div>
        <Text type="supporting" color="secondary">
          One zone, two formats — friendly line plus a machine-precise line
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="date_time" tooltipEntries={[{
          format: 'full'
        }, {
          format: 'system_date_time',
          label: 'ISO'
        }]} />
        </div>
      </div>
      <div>
        <Text type="supporting" color="secondary">
          UTC only — an audit log that never shows local time
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="date_time" tooltipEntries={[{
          timezoneID: 'UTC',
          label: 'UTC'
        }]} />
        </div>
      </div>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Copyable hover card',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
      <div>
        <Text type="supporting" color="secondary">
          Local, UTC, another zone, and Unix seconds — hover or tab, then copy
          any row
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="relative" tooltipEntries={[{
          label: 'Local'
        }, {
          timezoneID: 'UTC',
          label: 'UTC'
        }, {
          timezoneID: 'Asia/Tokyo',
          format: 'date_time',
          label: 'Tokyo'
        }, {
          timezoneID: 'UTC',
          format: 'system_date_time',
          label: 'ISO (UTC)'
        }]} />
        </div>
      </div>
      <div>
        <Text type="supporting" color="secondary">
          A single UTC entry — one copyable row, on an absolute format that has
          no hover card of its own
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="date_time" tooltipEntries={[{
          timezoneID: 'UTC',
          label: 'UTC'
        }]} />
        </div>
      </div>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Per-entry copyable',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
      <div>
        <Text type="supporting" color="secondary">
          Mixed: human-readable rows are read-only; only the machine value opts
          into a copy button
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="relative" tooltipEntries={[{
          label: 'Local'
        }, {
          timezoneID: 'UTC',
          label: 'UTC'
        }, {
          timezoneID: 'UTC',
          format: 'system_date_time',
          label: 'ISO (UTC)',
          isCopyable: true
        }]} />
        </div>
      </div>
      <div>
        <Text type="supporting" color="secondary">
          Fully read-only card — no row opts in, so there is no copy button and
          no trailing action column
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="relative" tooltipEntries={[{
          label: 'Local'
        }, {
          timezoneID: 'UTC',
          label: 'UTC'
        }]} />
        </div>
      </div>
      <div>
        <Text type="supporting" color="secondary">
          Single read-only row with no label — the value sits flush at the
          leading edge
        </Text>
        <div>
          <Timestamp value="2026-02-19T17:00:00Z" format="relative" tooltipEntries={[{}]} />
        </div>
      </div>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <div>
        <Text type="label" color="secondary">
          system_date:{' '}
        </Text>
        <Timestamp value="2026-02-19T17:00:00Z" format="system_date" type="code" />
      </div>
      <div>
        <Text type="label" color="secondary">
          system_date_time:{' '}
        </Text>
        <Timestamp value="2026-02-19T17:00:00Z" format="system_date_time" type="code" />
      </div>
      <div>
        <Text type="label" color="secondary">
          system_time:{' '}
        </Text>
        <Timestamp value="2026-02-19T17:00:00Z" format="system_time" type="code" />
      </div>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const date = '2026-02-19T17:00:00Z';
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
        <div>
          <Text type="label" color="secondary">
            relative:{' '}
          </Text>
          <Timestamp value={Date.now() / 1000 - 3600} format="relative" />
        </div>
        <div>
          <Text type="label" color="secondary">
            date:{' '}
          </Text>
          <Timestamp value={date} format="date" />
        </div>
        <div>
          <Text type="label" color="secondary">
            date_long:{' '}
          </Text>
          <Timestamp value={date} format="date_long" />
        </div>
        <div>
          <Text type="label" color="secondary">
            date_weekday:{' '}
          </Text>
          <Timestamp value={date} format="date_weekday" />
        </div>
        <div>
          <Text type="label" color="secondary">
            date_time:{' '}
          </Text>
          <Timestamp value={date} format="date_time" />
        </div>
        <div>
          <Text type="label" color="secondary">
            time:{' '}
          </Text>
          <Timestamp value={date} format="time" />
        </div>
        <div>
          <Text type="label" color="secondary">
            system_date:{' '}
          </Text>
          <Timestamp value={date} format="system_date" type="code" />
        </div>
        <div>
          <Text type="label" color="secondary">
            system_date_time:{' '}
          </Text>
          <Timestamp value={date} format="system_date_time" type="code" />
        </div>
        <div>
          <Text type="label" color="secondary">
            system_time:{' '}
          </Text>
          <Timestamp value={date} format="system_time" type="code" />
        </div>
      </div>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    value: Date.now() / 1000 - 5,
    format: 'relative',
    isLive: true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" type="supporting" />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" type="body" />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" type="large" />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" type="label" weight="semibold" />
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" color="primary" />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" color="secondary" />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" color="disabled" />
      <Timestamp value="2026-02-19T17:00:00Z" format="date_time" color="accent" />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <div>
        <Text type="label" color="secondary">
          Recent (relative):{' '}
        </Text>
        <Timestamp value={Date.now() / 1000 - 3600} format="auto" />
      </div>
      <div>
        <Text type="label" color="secondary">
          Old (date_time):{' '}
        </Text>
        <Timestamp value="2025-01-01T12:00:00Z" format="auto" />
      </div>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start'
  }}>
      <Timestamp value={Date.now() / 1000 + 60} format="relative" />
      <Timestamp value={Date.now() / 1000 + 3600} format="relative" />
      <Timestamp value={Date.now() / 1000 + 86400} format="relative" />
    </div>
}`,...M.parameters?.docs?.source}}},N=[`Default`,`RelativeFormat`,`RelativeShortFormat`,`RelativeThresholdsEnglish`,`DateFormat`,`DateLongFormat`,`DateWeekdayFormat`,`DateTimeFormat`,`DateTimeWithTimezone`,`ExplicitTimeZone`,`TimeFormat`,`TooltipTimezones`,`CopyableHoverCard`,`PerEntryCopyable`,`SystemFormats`,`AllFormats`,`LiveUpdating`,`TextTypes`,`Colors`,`AutoFormat`,`FutureDates`]})))()}P();export{D as AllFormats,j as AutoFormat,A as Colors,w as CopyableHoverCard,g as DateFormat,_ as DateLongFormat,y as DateTimeFormat,b as DateTimeWithTimezone,v as DateWeekdayFormat,d as Default,x as ExplicitTimeZone,M as FutureDates,O as LiveUpdating,T as PerEntryCopyable,f as RelativeFormat,p as RelativeShortFormat,h as RelativeThresholdsEnglish,E as SystemFormats,k as TextTypes,S as TimeFormat,C as TooltipTimezones,N as __namedExportsOrder,u as default};