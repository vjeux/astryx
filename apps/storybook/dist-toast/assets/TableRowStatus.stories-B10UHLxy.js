import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{o as a}from"./InternationalizationContext-C5wQA9mp.js";import{n as o,t as s}from"./useComponentTranslator-Dzvlp8mx.js";import{n as c,t as l}from"./Icon-BmO5FtDV.js";import{n as u,t as d}from"./VisuallyHidden-dGudRqPh.js";import{r as f,t as p}from"./Tooltip-CmQs04jO.js";import{n as m,t as h}from"./Table-DReqd1jV.js";import{a as g,i as _,r as v}from"./columnUtils-ClYX9X3Y.js";var y;function b(){return(b=e((()=>{y={"@astryx.table.rowStatus.columnHeader":`Row status`}})))()}function x(e){return D[e]??e}function S(e){return e===`success`||e===`warning`||e===`error`}function C(e){let t=e;if(S(t.status))return{variant:`icon`,icon:t.status,iconColor:t.status};if(typeof t.color!=`string`)return null;if(typeof t.icon==`string`){let e=O[t.color];return e==null?{variant:`icon`,icon:t.icon,customColor:t.color}:{variant:`icon`,icon:t.icon,iconColor:e}}return{variant:`dot`,color:x(t.color)}}function w(e){let t=o(),{getStatus:r}=e;return(0,T.useMemo)(()=>{let e={key:`__rowStatus`,header:(0,E.jsx)(d,{children:t(`@astryx.table.rowStatus.columnHeader`)}),width:k,resizable:!1,renderCell:e=>{let t=r(e);if(!t)return null;let i=C(t);if(!i)return null;let a=i.variant===`dot`?(0,E.jsx)(`span`,{...n(j.dot(i.color))}):(0,E.jsx)(l,{icon:i.icon,size:`xsm`,color:`iconColor`in i?i.iconColor:`inherit`});return(0,E.jsx)(p,{content:t.label,children:(0,E.jsx)(`span`,{...n(j.wrap,i.variant===`icon`&&`customColor`in i&&j.customIcon(i.customColor)),role:`img`,"aria-label":t.label,children:a})})}};return{transformColumns(t){return[e,...t]}}},[r,t])}var T,E,D,O,k,A,j;function M(){return(M=e((()=>{T=t(),r(),c(),f(),u(),s(),b(),E=i(),a(y),D={accent:`var(--color-icon-accent)`,success:`var(--color-icon-green)`,error:`var(--color-icon-red)`,warning:`var(--color-icon-orange)`,red:`var(--color-icon-red)`,orange:`var(--color-icon-orange)`,green:`var(--color-icon-green)`,yellow:`var(--color-icon-yellow)`,blue:`var(--color-icon-blue)`,gray:`var(--color-icon-gray)`},O={accent:`accent`,success:`success`,error:`error`,warning:`warning`,red:`red`,orange:`warning`,green:`green`,yellow:`warning`,blue:`blue`,gray:`gray`},k={type:`pixel`,value:28},A={kzqmXN:`astryx1xc55vz`,kZKoxP:`astryxdk7pt`,kaIpWk:`astryx16rqkct`,krdFHd:``,kfmiAY:``,kVL7Gh:``,kT0f0o:``,kIxVMA:``,ksF3WI:``,kqGeR4:``,kYm2EN:``,kmuXW:`astryx2lah0s`,$$css:!0},j={wrap:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,$$css:!0},customIcon:e=>[{kMwMTN:e==null?e:`astryx14rh7hd`,$$css:!0},{"--x-color":e??void 0}],dot:e=>[A,{kWkggS:e==null?e:`astryxl8spv7`,$$css:!0},{"--x-backgroundColor":e??void 0}]}})))()}var N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{m(),M(),v(),N=i(),P=[{id:`j1`,name:`build-core`,owner:`Ava`,state:`failed`},{id:`j2`,name:`lint`,owner:`Liam`,state:`running`},{id:`j3`,name:`unit-tests`,owner:`Zoe`,state:`succeeded`},{id:`j4`,name:`docsite-deploy`,owner:`Max`,state:`queued`},{id:`j5`,name:`smoke-test`,owner:`Mia`,state:`succeeded`},{id:`j6`,name:`snapshot-review`,owner:`Noah`,state:`needsAttention`}],F=[{key:`name`,header:`Job`,width:g(2)},{key:`owner`,header:`Owner`,width:_(120)},{key:`state`,header:`State`,width:_(120)}],I=e=>{switch(e.state){case`failed`:return{status:`error`,label:`Failed`};case`running`:return{color:`warning`,icon:`clock`,label:`Running`};case`queued`:return{color:`gray`,label:`Queued`};case`succeeded`:return{status:`success`,label:`Succeeded`};case`needsAttention`:return{status:`warning`,label:`Needs attention`}}},L={title:`Core/TableRowStatus`,tags:[`autodocs`]},R={render:()=>{let e=w({getStatus:I});return(0,N.jsx)(h,{data:P,columns:F,idKey:`id`,hasHover:!0,plugins:{rowStatus:e}})}},z={render:()=>{let e=w({getStatus:e=>e.state===`failed`?{color:`error`,label:`Error-colored dot`}:e.state===`running`?{color:`warning`,icon:`clock`,label:`Warning-colored clock`}:e.state===`succeeded`?{color:`success`,icon:`check`,label:`Success-colored check`}:{color:`#64748b`,label:`Custom gray dot`}});return(0,N.jsx)(h,{data:P,columns:F,idKey:`id`,hasHover:!0,plugins:{rowStatus:e}})}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const rowStatus = useTableRowStatus<Job>({
      getStatus: jobStatus
    });
    return <Table data={jobs} columns={columns} idKey="id" hasHover plugins={{
      rowStatus
    }} />;
  }
}`,...R.parameters?.docs?.source},description:{story:`Semantic status values use the active theme's outcome glyph and tone. Custom
markers keep caller-owned paint: queued renders a dot, while running uses the
explicit clock icon. Each marker has one accessible image name from \`label\`.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const rowStatus = useTableRowStatus<Job>({
      getStatus: job => job.state === 'failed' ? {
        color: 'error',
        label: 'Error-colored dot'
      } : job.state === 'running' ? {
        color: 'warning',
        icon: 'clock',
        label: 'Warning-colored clock'
      } : job.state === 'succeeded' ? {
        color: 'success',
        icon: 'check',
        label: 'Success-colored check'
      } : {
        color: '#64748b',
        label: 'Custom gray dot'
      }
    });
    return <Table data={jobs} columns={columns} idKey="id" hasHover plugins={{
      rowStatus
    }} />;
  }
}`,...z.parameters?.docs?.source},description:{story:"A custom marker's color never selects its representation. Even colors named\n`error` or `success` remain dots unless the caller supplies an explicit icon.",...z.parameters?.docs?.description}}},B=[`Default`,`CustomMarkers`]})))()}V();export{z as CustomMarkers,R as Default,B as __namedExportsOrder,L as default};