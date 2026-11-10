import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Heading-YiIeUtHm.js";import{n as s,t as c}from"./Calendar-Bi5XoPBL.js";import{n as l,t as u}from"./PowerSearch-BTjEYo4i.js";import{n as d,t as f}from"./Timestamp-Czd81oha.js";import{d as p,l as m,u as h}from"./iframe-B7UFaprG.js";function g({title:e,locale:t,calendar:n,componentCalendar:r,value:a,numberOfMonths:s,weekStartsOn:l}){let[u,d]=(0,y.useState)(a);return(0,b.jsx)(m,{locale:t,calendar:n,children:(0,b.jsxs)(`section`,{"aria-label":e,className:`x78zum5 xdt5ytf x18g69wz x1cy8zhl`,children:[(0,b.jsx)(o,{level:2,children:e}),(0,b.jsx)(`div`,{dir:p(t),children:(0,b.jsx)(c,{calendar:r,value:u,onChange:d,numberOfMonths:s,weekStartsOn:l})}),(0,b.jsxs)(i,{children:[`value: `,(0,b.jsx)(`code`,{"data-testid":`value`,children:u})]})]})})}function _(e,t){return{render:()=>(0,b.jsx)(g,{...e}),parameters:{docs:{description:{story:t}}}}}function v({title:e,locale:t,calendar:n}){return(0,b.jsx)(m,{locale:t,calendar:n,children:(0,b.jsxs)(`section`,{"aria-label":e,dir:p(t),className:`x78zum5 xdt5ytf x18g69wz x1cy8zhl`,children:[(0,b.jsx)(o,{level:2,children:e}),[`date`,`date_long`,`date_weekday`,`date_time`].map(e=>(0,b.jsxs)(i,{children:[(0,b.jsx)(`code`,{children:e}),`:`,` `,(0,b.jsx)(f,{value:I,format:e,"data-testid":`timestamp-${e}`})]},e)),(0,b.jsxs)(i,{children:[(0,b.jsx)(`code`,{children:`system_date_time`}),`:`,` `,(0,b.jsx)(f,{value:I,format:`system_date_time`,"data-testid":`timestamp-system_date_time`})]}),(0,b.jsx)(`div`,{className:`x1cvmir6`,children:(0,b.jsx)(u,{config:P,filters:F,onChange:()=>{},timezoneID:`UTC`})}),(0,b.jsx)(c,{value:`2026-10-30`})]})})}var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{y=t(),s(),h(),a(),r(),d(),l(),b=n(),x={title:`Core/Internationalization/Calendar systems`,tags:[`no-visual`],parameters:{layout:`padded`}},S=_({title:`Persian, fa-IR`,locale:`fa-IR`,calendar:`persian`,value:`2026-10-30`,weekStartsOn:`sat`},`Aban 1405 in Farsi with Persian digits. The value stays the Gregorian ISO date.`),C=_({title:`Persian calendar, English`,locale:`en`,calendar:`persian`,value:`2026-10-30`,weekStartsOn:`sat`},`The calendar is independent of the language.`),w=_({title:`fa-IR-u-ca-persian, no calendar`,locale:`fa-IR-u-ca-persian`,value:`2026-10-30`,weekStartsOn:`sat`},"A `-u-ca-` keyword in the provider locale does not select the calendar: the months stay Gregorian."),T=_({title:`fa-IR, no calendar`,locale:`fa-IR`,value:`2026-10-30`,weekStartsOn:`sat`},"A locale's default calendar never applies: `fa-IR` alone shows Gregorian months."),E=_({title:`Gregorian Calendar in a Persian provider`,locale:`fa-IR`,calendar:`persian`,componentCalendar:`gregory`,value:`2026-10-30`,weekStartsOn:`sat`},"The Calendar's own `calendar` prop takes precedence over the provider's."),D=_({title:`Hebrew leap year`,locale:`en`,calendar:`hebrew`,value:`2024-03-01`,numberOfMonths:2},`Adar I and Adar II of 5784 are distinct months. Shift+PageDown from Adar I lands in Adar of 5785.`),O=_({title:`Japanese era change`,locale:`ja-JP`,calendar:`japanese`,value:`2019-04-30`,numberOfMonths:2},`Heisei 31 April and Reiwa 1 May. Japanese months are Gregorian, so no Temporal is needed.`),k=_({title:`Chinese leap second month`,locale:`zh-CN`,calendar:`chinese`,value:`2023-03-01`,numberOfMonths:2,weekStartsOn:`mon`},`The second month of 2023 is followed by a leap second month.`),A=_({title:`Ethiopic thirteenth month`,locale:`am-ET`,calendar:`ethiopic`,value:`2026-09-08`,numberOfMonths:2},`Pagume 2018 has five days and keeps the fixed six-row grid.`),j=_({title:`Islamic (Umm al-Qura), ar-SA`,locale:`ar-SA`,calendar:`islamic-umalqura`,value:`2026-10-30`,weekStartsOn:`sat`},`A right-to-left locale with Arabic-Indic digits.`),M=_({title:`Buddhist, th-TH`,locale:`th-TH`,calendar:`buddhist`,value:`2026-10-30`},`Buddhist years on Gregorian months. No Temporal is needed.`),N=_({title:`ISO 8601, English`,locale:`en`,calendar:`iso8601`,value:`2026-10-30`,weekStartsOn:`mon`},`The ISO 8601 calendar has Gregorian months and uses Gregorian month names.`),P={name:`Dates`,fields:[{key:`created`,label:`Created`,defaultOperator:`after`,operators:[{key:`after`,label:`after`,value:{type:`date_absolute`}}]}]},F=[{field:`created`,operator:`after`,value:{type:`date_absolute`,unixSeconds:Date.parse(`2026-10-30T12:00:00Z`)/1e3}}],I=`2026-10-30T12:00:00Z`,L={render:()=>(0,b.jsxs)(`div`,{className:`x78zum5 x1a02dak x4t41sb x1cy8zhl`,children:[(0,b.jsx)(v,{title:`Persian calendar, English`,locale:`en`,calendar:`persian`}),(0,b.jsx)(v,{title:`Persian, fa-IR`,locale:`fa-IR`,calendar:`persian`})]}),parameters:{docs:{description:{story:"Timestamp's date formats, a PowerSearch date value, and Calendar follow the provider's calendar. `system_date_time` stays Gregorian ISO."}}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`story({
  title: 'Persian, fa-IR',
  locale: 'fa-IR',
  calendar: 'persian',
  value: '2026-10-30',
  weekStartsOn: 'sat'
}, 'Aban 1405 in Farsi with Persian digits. The value stays the Gregorian ISO date.')`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`story({
  title: 'Persian calendar, English',
  locale: 'en',
  calendar: 'persian',
  value: '2026-10-30',
  weekStartsOn: 'sat'
}, 'The calendar is independent of the language.')`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`story({
  title: 'fa-IR-u-ca-persian, no calendar',
  locale: 'fa-IR-u-ca-persian',
  value: '2026-10-30',
  weekStartsOn: 'sat'
}, 'A \`-u-ca-\` keyword in the provider locale does not select the calendar: the months stay Gregorian.')`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`story({
  title: 'fa-IR, no calendar',
  locale: 'fa-IR',
  value: '2026-10-30',
  weekStartsOn: 'sat'
}, "A locale's default calendar never applies: \`fa-IR\` alone shows Gregorian months.")`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`story({
  title: 'Gregorian Calendar in a Persian provider',
  locale: 'fa-IR',
  calendar: 'persian',
  componentCalendar: 'gregory',
  value: '2026-10-30',
  weekStartsOn: 'sat'
}, "The Calendar's own \`calendar\` prop takes precedence over the provider's.")`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`story({
  title: 'Hebrew leap year',
  locale: 'en',
  calendar: 'hebrew',
  value: '2024-03-01',
  numberOfMonths: 2
}, 'Adar I and Adar II of 5784 are distinct months. Shift+PageDown from Adar I lands in Adar of 5785.')`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`story({
  title: 'Japanese era change',
  locale: 'ja-JP',
  calendar: 'japanese',
  value: '2019-04-30',
  numberOfMonths: 2
}, 'Heisei 31 April and Reiwa 1 May. Japanese months are Gregorian, so no Temporal is needed.')`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`story({
  title: 'Chinese leap second month',
  locale: 'zh-CN',
  calendar: 'chinese',
  value: '2023-03-01',
  numberOfMonths: 2,
  weekStartsOn: 'mon'
}, 'The second month of 2023 is followed by a leap second month.')`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`story({
  title: 'Ethiopic thirteenth month',
  locale: 'am-ET',
  calendar: 'ethiopic',
  value: '2026-09-08',
  numberOfMonths: 2
}, 'Pagume 2018 has five days and keeps the fixed six-row grid.')`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`story({
  title: 'Islamic (Umm al-Qura), ar-SA',
  locale: 'ar-SA',
  calendar: 'islamic-umalqura',
  value: '2026-10-30',
  weekStartsOn: 'sat'
}, 'A right-to-left locale with Arabic-Indic digits.')`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`story({
  title: 'Buddhist, th-TH',
  locale: 'th-TH',
  calendar: 'buddhist',
  value: '2026-10-30'
}, 'Buddhist years on Gregorian months. No Temporal is needed.')`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`story({
  title: 'ISO 8601, English',
  locale: 'en',
  calendar: 'iso8601',
  value: '2026-10-30',
  weekStartsOn: 'mon'
}, 'The ISO 8601 calendar has Gregorian months and uses Gregorian month names.')`,...N.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.row)}>
      <FormattedDatesView title="Persian calendar, English" locale="en" calendar="persian" />
      <FormattedDatesView title="Persian, fa-IR" locale="fa-IR" calendar="persian" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Timestamp's date formats, a PowerSearch date value, and Calendar follow the provider's calendar. \`system_date_time\` stays Gregorian ISO."
      }
    }
  }
}`,...L.parameters?.docs?.source}}},R=[`PersianFarsi`,`PersianEnglish`,`LocaleKeywordStaysGregorian`,`LocaleAloneStaysGregorian`,`ComponentCalendarOverProvider`,`HebrewLeapYear`,`JapaneseEraChange`,`ChineseLeapMonth`,`EthiopicThirteenthMonth`,`IslamicUmmAlQura`,`BuddhistThai`,`Iso8601`,`FormattedDatesPersian`]})))()}z();export{M as BuddhistThai,k as ChineseLeapMonth,E as ComponentCalendarOverProvider,A as EthiopicThirteenthMonth,L as FormattedDatesPersian,D as HebrewLeapYear,j as IslamicUmmAlQura,N as Iso8601,O as JapaneseEraChange,T as LocaleAloneStaysGregorian,w as LocaleKeywordStaysGregorian,C as PersianEnglish,S as PersianFarsi,R as __namedExportsOrder,x as default};