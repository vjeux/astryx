import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./defineSyntaxTheme-BQS7lO1m.js";import{n as s,t as c}from"./SyntaxTheme-CDF68YJV.js";import{a as l,c as u,d,f,i as p,l as m,m as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S}from"./presets-C7CWBHk3.js";import{n as C,t as w}from"./CodeBlock-DQVwkIMF.js";import{c as T,o as E}from"./iframe-B7UFaprG.js";var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{t(),C(),s(),a(),b(),i(),T(),D=n(),O=`import {useState, useEffect} from 'react';

interface User {
  id: string;
  name: string;
  roles: string[];
}

const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// Fetch user data with retry logic
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`\${API_URL}/users/\${id}\`);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
}

export function UserCard({id}: {id: string}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{user.name}</h2>
      <span>{user.roles.length} roles</span>
    </div>
  );
}`,k={title:`Core/Themes/CodeTheme`,tags:[`autodocs`],parameters:{docs:{description:{component:`Syntax theme provider for code components. Wraps CodeBlock and CodeEditor to apply community syntax color themes. 12 presets ship in @astryxdesign/core/theme/syntax.`}}}},A={render:()=>(0,D.jsx)(c,{theme:S,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},j={render:()=>(0,D.jsx)(c,{theme:p,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},M={render:()=>(0,D.jsx)(c,{theme:u,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},N={render:()=>(0,D.jsx)(c,{theme:m,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},P={render:()=>(0,D.jsx)(c,{theme:v,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},F={render:()=>(0,D.jsx)(c,{theme:y,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},I={render:()=>(0,D.jsx)(c,{theme:_,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},L={render:()=>(0,D.jsx)(c,{theme:l,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},R={render:()=>(0,D.jsx)(c,{theme:f,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},z={render:()=>(0,D.jsx)(c,{theme:d,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},B={render:()=>(0,D.jsx)(c,{theme:g,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},V={render:()=>(0,D.jsx)(c,{theme:h,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`UserCard.tsx`,hasLineNumbers:!0})})},H=`const greet = (name: string) => {
  // Say hello
  return \`Hello, \${name}!\`;
};

const result = greet("World");
console.log(result); // Hello, World!`,U={render:()=>(0,D.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:16},children:x.map(e=>(0,D.jsx)(c,{theme:e,children:(0,D.jsx)(w,{code:H,language:`typescript`,title:e.name,hasLineNumbers:!0})},e.name))}),parameters:{layout:`padded`}},W={render:()=>(0,D.jsx)(c,{theme:m,children:(0,D.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,D.jsx)(w,{code:`// Inherits Nord from provider`,language:`typescript`,title:`nord (from provider)`}),(0,D.jsx)(c,{theme:p,children:(0,D.jsx)(w,{code:`// Inner provider overrides to Dracula`,language:`typescript`,title:`dracula (inner override)`})})]})})},G=o({name:`cyberpunk`,tokens:{keyword:`#ff2a6d`,string:`#05d9e8`,comment:`#4a5568`,number:`#d1f7ff`,function:`#ff6ac1`,type:`#7efff5`,variable:`#e2e8f0`,operator:`#ff9e64`,constant:`#d1f7ff`,tag:`#ff2a6d`,attribute:`#7efff5`,property:`#05d9e8`,punctuation:`#718096`,background:`#0d0221`}}),K={render:()=>(0,D.jsx)(c,{theme:G,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`Custom: Cyberpunk`,hasLineNumbers:!0})})},q=r({name:`dark-dev`,syntax:p,tokens:{"--color-background-surface":`#282a36`,"--color-text-primary":`#f8f8f2`}}),J={render:()=>(0,D.jsx)(E,{theme:q,mode:`dark`,children:(0,D.jsx)(w,{code:O,language:`typescript`,title:`defineTheme with syntax: dracula`,hasLineNumbers:!0})})},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={oneDarkPro}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={dracula}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={monokai}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={nord}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={tokyoNight}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={catppuccinMocha}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={githubLight}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={githubDark}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={solarizedLight}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={oneLight}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={catppuccinLatte}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={tokyoNightLight}>
      <CodeBlock code={sampleCode} language="typescript" title="UserCard.tsx" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...V.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
  }}>
      {allSyntaxPresets.map(theme => <SyntaxThemeProvider key={theme.name} theme={theme}>
          <CodeBlock code={shortCode} language="typescript" title={theme.name} hasLineNumbers />
        </SyntaxThemeProvider>)}
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={nord}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <CodeBlock code="// Inherits Nord from provider" language="typescript" title="nord (from provider)" />
        <SyntaxThemeProvider theme={dracula}>
          <CodeBlock code="// Inner provider overrides to Dracula" language="typescript" title="dracula (inner override)" />
        </SyntaxThemeProvider>
      </div>
    </SyntaxThemeProvider>
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <SyntaxThemeProvider theme={cyberpunk}>
      <CodeBlock code={sampleCode} language="typescript" title="Custom: Cyberpunk" hasLineNumbers />
    </SyntaxThemeProvider>
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={darkDevTheme} mode="dark">
      <CodeBlock code={sampleCode} language="typescript" title="defineTheme with syntax: dracula" hasLineNumbers />
    </Theme>
}`,...J.parameters?.docs?.source}}},Y=[`OneDarkPro`,`Dracula`,`Monokai`,`Nord`,`TokyoNight`,`CatppuccinMocha`,`GitHubLight`,`GitHubDark`,`SolarizedLight`,`OneLight`,`CatppuccinLatte`,`TokyoNightLight`,`AllThemesGallery`,`NestedOverride`,`CustomTheme`,`ThemeWithSyntaxDefaults`]})))()}X();export{U as AllThemesGallery,B as CatppuccinLatte,F as CatppuccinMocha,K as CustomTheme,j as Dracula,L as GitHubDark,I as GitHubLight,M as Monokai,W as NestedOverride,N as Nord,A as OneDarkPro,z as OneLight,R as SolarizedLight,J as ThemeWithSyntaxDefaults,P as TokyoNight,V as TokyoNightLight,Y as __namedExportsOrder,k as default};