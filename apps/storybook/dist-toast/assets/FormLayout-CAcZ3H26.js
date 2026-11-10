import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{o as c,s as l}from"./FieldLabel-Cw7h3Ix_.js";function u({children:e,direction:t=`vertical`,defaultOptionality:r,xstyle:i,className:s,style:l,ref:u,...m}){let h=(0,d.useMemo)(()=>({direction:t,defaultOptionality:r}),[t,r]);return(0,f.jsx)(c,{value:h,children:(0,f.jsx)(`div`,{ref:u,...m,...a(o(`form-layout`,{direction:t}),n(p.base,t===`horizontal`&&p.horizontal,t===`horizontal-labels`&&p.horizontalLabels,i),s,l),children:e})})}var d,f,p;function m(){return(m=e((()=>{d=t(),r(),l(),s(),f=i(),p={base:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx18g69wz`,$$css:!0},horizontal:{k1xSpc:`astryxrvj5dj`,kprqdN:`astryx1mt1orb`,klIVar:`astryxu6a5m6`,$$css:!0},horizontalLabels:{k1xSpc:`astryxrvj5dj`,kumcoG:`astryx1pmbctz`,kOIVth:`astryxlaq8a2`,kGNEyG:`astryx7a106z`,k41HbU:`astryxedohl4`,kUxVDj:`astryx1rpgqan`,k3RL8M:`astryx1a1jff`,kjFzOW:`astryx1q32nj3`,$$css:!0}},u.displayName=`FormLayout`,u.__docgenInfo={description:`Spatial layout container for form fields.

Arranges form fields with consistent spacing and direction. Renders a \`<div>\`
(not a \`<form>\` — form submission is a separate concern). For label wrapping
of custom controls, use \`Field\` directly.

Provides direction context to children via \`FormLayoutContext\`.
Supports nesting — a horizontal layout inside a vertical layout works naturally.

@example
\`\`\`
<FormLayout>
  <TextInput label="Name" value={name} onChange={setName} />
  <TextInput label="Email" value={email} onChange={setEmail} />
</FormLayout>
\`\`\``,methods:[],displayName:`FormLayout`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},children:{required:!1,tsType:{name:`ReactNode`},description:`Form fields to arrange. Accepts Astryx inputs (TextInput, Selector, etc.)
and Field-wrapped custom controls.`},direction:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal' | 'horizontal-labels'`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'horizontal-labels'`}]},description:`Direction of field arrangement.

- \`'vertical'\` — Fields stack top-to-bottom (default). Most common.
- \`'horizontal'\` — Fields occupy one \`1fr\` CSS Grid track per child in
  logical inline order.
- \`'horizontal-labels'\` — CSS Grid with labels beside their inputs on the
  inline-start side. Collapses to vertical when the viewport is narrow
  (≤480px).

@default 'vertical'`,defaultValue:{value:`'vertical'`,computed:!1}},defaultOptionality:{required:!1,tsType:{name:`union`,raw:`'optional' | 'required'`,elements:[{name:`literal`,value:`'optional'`},{name:`literal`,value:`'required'`}]},description:"Which state the form treats as its default, so only the *exception*\ncarries a visible optional/required indicator. It also resolves each\nfield's `aria-required` so the unmarked majority is still announced\ncorrectly — but only `aria-required`, never the native `required`\nattribute, so a layout default can't switch on browser validation.\n\n- `'optional'` — fields read as optional; only a field with `isRequired`\n  shows an indicator (the \"required\" one).\n- `'required'` — fields read as required; only a field with `isOptional`\n  shows an indicator (the \"optional\" one). Fields without `isOptional`\n  expose `aria-required` even though they show no indicator. Checkboxes,\n  switches and checkbox groups are the exception: an unchecked box, an off\n  switch or an empty group is an answer, so they take no required state\n  from the default. A checkbox or switch is required only through its own\n  `isRequired`.\n- unset — today's behavior: `isRequired` and `isOptional` each show their\n  own indicator independently.\n\nA field that merely restates the default (e.g. `isOptional` under\n`'optional'`) shows nothing. An inner `FormLayout` shadows an outer one."}},composes:[`Omit`]}})))()}export{m as n,u as t};