import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./IconButton-BONXg2Kw.js";import{_ as i,g as a,v as o}from"./highlightStyles-DWLr7wif.js";import{n as s,t as c}from"./CodeBlock-DQVwkIMF.js";import{n as l,t as u}from"./thrift-DjOiFWkK.js";var d;function f(){return(f=e((()=>{o(),d=i({name:`java`,identifiers:[`java`],fileExtensions:[`java`],fileNames:[]},()=>a(`abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long native new package private protected public return short static super switch synchronized this throw throws transient try var void volatile while record sealed permits yield true false null`,[{type:`constant`,regex:/@\w+/},{type:`string`,regex:/"""[\s\S]*?"""/}]))})))()}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;function G(){return(G=e((()=>{s(),f(),u(),n(),p=t(),m={title:`Core/CodeBlock`,component:c,tags:[`autodocs`],argTypes:{language:{control:`select`,options:[`typescript`,`javascript`,`json`,`html`,`css`,`python`,`bash`,`php`,`hack`,`yaml`,`markdown`,`plaintext`],description:`Language for syntax highlighting`},size:{control:`select`,options:[`sm`,`md`],description:`Text size`},width:{control:`text`,description:`Width of the code block (any CSS width value)`},container:{control:`select`,options:[`card`,`section`],description:`Container presentation style`},hasLineNumbers:{control:`boolean`},hasCopyButton:{control:`boolean`},isWrapped:{control:`boolean`},isCollapsible:{control:`boolean`},collapsibleThreshold:{control:`number`}}},h=`import {useState, useEffect} from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
}

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  return user;
}`,g={args:{code:h,language:`typescript`,title:`useUser.ts`,hasLineNumbers:!0,hasCopyButton:!0}},_={args:{code:h,language:`typescript`,title:`useUser.ts`,hasLineNumbers:!0,highlightLines:[9,10,11,12,13]}},v={args:{language:`tsx`,isDiff:!0,title:`Button.tsx`,hasLineNumbers:!0,code:`@@ -12,7 +12,7 @@ export function Button({children, ...props}: ButtonProps) {
   return (
     <button
-      className="astryx-button"
+      className="astryx-button astryx-button-primary"
       type="button"
       {...props}>
       {children}`}},y={args:{language:`tsx`,isDiff:!0,hasLineNumbers:!0,isWrapped:!1,code:`@@ -1,3 +1,3 @@
 export function Button({children, ...props}: ButtonProps) {
-  return <button className="astryx-button" type="button" aria-label="A deliberately long accessible label that pushes this changed line well past the width of a phone-sized viewport" {...props}>{children}</button>;
+  return <button className="astryx-button astryx-button-primary" type="button" aria-label="A deliberately long accessible label that pushes this changed line well past the width of a phone-sized viewport" {...props}>{children}</button>;
 }`}},b={args:{language:`tsx`,code:`const fits = true;`}},x={args:{code:`pnpm --filter @astryxdesign/core exec vitest run src/CodeBlock --reporter=verbose --coverage
exit 0`,width:`360px`}},S=(0,p.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:16,height:16,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,p.jsx)(`path`,{d:`m7 11 2-2-2-2`}),(0,p.jsx)(`path`,{d:`M11 13h4`}),(0,p.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`})]}),C=(0,p.jsx)(r,{variant:`ghost`,size:`sm`,label:`Run in terminal`,tooltip:`Run in terminal`,icon:S}),w={args:{code:`npm install @astryxdesign/core`,language:`bash`,endContent:C,width:`360px`}},T={args:{code:`pnpm --filter @astryxdesign/core exec vitest run src/CodeBlock --reporter=verbose --coverage
exit 0`,language:`bash`,hasLanguageLabel:!1,endContent:C,width:`360px`}},E={args:{code:`npm install @astryxdesign/core`,language:`bash`,hasLanguageLabel:!1,endContent:(0,p.jsx)(r,{label:`Run in terminal`,variant:`ghost`,icon:S}),width:`360px`}},D={render:()=>(0,p.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:520},children:[(0,p.jsx)(c,{language:`cpp`,code:`#include <vector>
// Sum a vector
int sum(const std::vector<int>& v) {
  int total = 0;
  for (int x : v) total += x;
  return total;
}`}),(0,p.jsx)(c,{language:`rust`,code:`// Parse a port
fn port(s: &str) -> Result<u16, String> {
    s.parse::<u16>().map_err(|e| e.to_string())
}`}),(0,p.jsx)(c,{language:`sql`,code:`-- Active users this week
SELECT id, name FROM users
WHERE last_seen > NOW() - INTERVAL '7 days'
ORDER BY name;`})]})},O={render:()=>(0,p.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:520},children:[(0,p.jsx)(c,{language:l,code:`# A user record
struct User {
  1: required i64 id;
  2: optional string name;
}`}),(0,p.jsx)(c,{language:d,code:`// Greet a user
public final class Greeter {
  String greet(String name) { return "hello, " + name; }
}`})]})},k={args:{code:`{
  "name": "@astryxdesign/core",
  "version": "0.0.5",
  "dependencies": {
    "@stylexjs/stylex": "^0.17.5",
    "react": "^19.0.0"
  },
  "scripts": {
    "build": "tsup",
    "test": "vitest"
  }
}`,language:`json`,title:`package.json`,hasLineNumbers:!0}},A={args:{code:`#!/usr/bin/env python3
"""Data processing pipeline."""

from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Config:
    input_path: str
    output_path: str
    batch_size: int = 100

def process(config: Config) -> None:
    """Process data according to config."""
    print(f"Processing {config.input_path}")
    # TODO: implement pipeline
    pass

if __name__ == "__main__":
    cfg = Config("input.csv", "output.csv")
    process(cfg)`,language:`python`,title:`pipeline.py`,hasLineNumbers:!0,highlightLines:[7,8,9,10,11]}},j={args:{code:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main id="app">
      <h1>Hello, World!</h1>
      <p class="subtitle">Welcome to Astryx.</p>
    </main>
    <script src="app.js"><\/script>
  </body>
</html>`,language:`html`,title:`index.html`,hasLineNumbers:!0}},M={args:{code:`:root {
  --color-primary: #0064E0;
  --radius: 8px;
}

.button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: var(--radius);
  background-color: var(--color-primary);
  color: white;
  font-weight: 600;
  transition: opacity 0.15s ease;
}

.button:hover {
  opacity: 0.9;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #2694FE;
  }
}`,language:`css`,title:`button.css`,hasLineNumbers:!0}},N={args:{code:`#!/bin/bash
# Deploy script for production

set -euo pipefail

DEPLOY_DIR="/opt/app"
VERSION=$(git describe --tags --always)

echo "Deploying version $VERSION..."

if [ ! -d "$DEPLOY_DIR" ]; then
  mkdir -p "$DEPLOY_DIR"
fi

pnpm build
cp -r dist/* "$DEPLOY_DIR/"

echo "Deploy complete: $VERSION"`,language:`bash`,title:`deploy.sh`,hasLineNumbers:!0}},P={args:{code:`npm install @astryxdesign/core`,language:`bash`,hasCopyButton:!0}},F={args:{code:`// This is a very long line that demonstrates the word wrapping behavior of the code block component when isWrapped is set to true, which causes long lines to wrap instead of scrolling horizontally
const result = someVeryLongFunctionName(parameterOne, parameterTwo, parameterThree, parameterFour, parameterFive);`,language:`typescript`,isWrapped:!0,hasLineNumbers:!0}},I={args:{code:Array.from({length:50},(e,t)=>`const line${t+1} = ${t+1};`).join(`
`),language:`typescript`,title:`many-lines.ts`,hasLineNumbers:!0,maxHeight:200}},L={args:{code:h,language:`typescript`,title:`useUser.ts`,hasLineNumbers:!0,size:`sm`}},R={args:{code:`const greeting = "Hello, world!";
console.log(greeting);`,language:`typescript`,hasLanguageLabel:!1,hasCopyButton:!0}},z={args:{code:`This is plain text without any syntax highlighting.
It preserves whitespace and line breaks.

  Indentation is maintained.
    Nested indentation too.`,language:`plaintext`,title:`notes.txt`,hasLineNumbers:!0}},B={args:{code:h,language:`typescript`,title:`useUser.ts`,width:`100%`}},V={args:{code:h,language:`typescript`,title:`useUser.ts`,width:`100%`,container:`section`}},H={args:{code:h,language:`typescript`,title:`useUser.ts`,hasLineNumbers:!0,isCollapsible:!0}},U={args:{code:"  const response = await fetch(`/api/users/${id}`);\n  if (!response.ok) {\n    throw new Error(`HTTP ${response.status}`);\n  }\n  return response.json();",language:`typescript`,title:`useUser.ts — lines 40–44`,hasLineNumbers:!0,startLineNumber:40,highlightLines:[42]}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    code: tsExample,
    language: 'typescript',
    title: 'useUser.ts',
    hasLineNumbers: true,
    hasCopyButton: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    code: tsExample,
    language: 'typescript',
    title: 'useUser.ts',
    hasLineNumbers: true,
    highlightLines: [9, 10, 11, 12, 13]
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    language: 'tsx',
    isDiff: true,
    title: 'Button.tsx',
    hasLineNumbers: true,
    code: \`@@ -12,7 +12,7 @@ export function Button({children, ...props}: ButtonProps) {
   return (
     <button
-      className="astryx-button"
+      className="astryx-button astryx-button-primary"
       type="button"
       {...props}>
       {children}\`
  }
}`,...v.parameters?.docs?.source},description:{story:"The diff layer over a language: `+` lines sit on a success-tinted row and\n`-` lines on an error-tinted row, the `@@` header is a quiet row, and the\nrest of every line keeps the language's syntax highlighting. The glyph has\nits own column, so the code's indentation lines up on every row, and copy\nreturns the exact source with its glyphs. Markdown gets this from a\n```diff-tsx fence.",...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    language: 'tsx',
    isDiff: true,
    hasLineNumbers: true,
    isWrapped: false,
    code: \`@@ -1,3 +1,3 @@
 export function Button({children, ...props}: ButtonProps) {
-  return <button className="astryx-button" type="button" aria-label="A deliberately long accessible label that pushes this changed line well past the width of a phone-sized viewport" {...props}>{children}</button>;
+  return <button className="astryx-button astryx-button-primary" type="button" aria-label="A deliberately long accessible label that pushes this changed line well past the width of a phone-sized viewport" {...props}>{children}</button>;
 }\`
  }
}`,...y.parameters?.docs?.source},description:{story:`A diff whose changed lines run past the viewport: the row tint and the
gutter tint must follow the line to the end of the scroll width, not stop at
the visible edge. Toggle \`isWrapped\` to see the same rows wrapped instead.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    language: 'tsx',
    code: 'const fits = true;'
  }
}`,...b.parameters?.docs?.source},description:{story:`The code viewport is a keyboard stop only while its content overflows.
This story starts fitting; the browser contract widens the code and caps
the height to prove each state, and shrinks it again to prove focus stays.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    code: 'pnpm --filter @astryxdesign/core exec vitest run src/CodeBlock --reporter=verbose --coverage\\nexit 0',
    width: '360px'
  }
}`,...x.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    code: 'npm install @astryxdesign/core',
    language: 'bash',
    endContent: runAction,
    width: '360px'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    code: 'pnpm --filter @astryxdesign/core exec vitest run src/CodeBlock --reporter=verbose --coverage\\nexit 0',
    language: 'bash',
    hasLanguageLabel: false,
    endContent: runAction,
    width: '360px'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    code: 'npm install @astryxdesign/core',
    language: 'bash',
    hasLanguageLabel: false,
    endContent: <IconButton label="Run in terminal" variant="ghost" icon={terminalIcon} />,
    width: '360px'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    maxWidth: 520
  }}>
      <CodeBlock language="cpp" code={'#include <vector>\\n// Sum a vector\\nint sum(const std::vector<int>& v) {\\n  int total = 0;\\n  for (int x : v) total += x;\\n  return total;\\n}'} />
      <CodeBlock language="rust" code={'// Parse a port\\nfn port(s: &str) -> Result<u16, String> {\\n    s.parse::<u16>().map_err(|e| e.to_string())\\n}'} />
      <CodeBlock language="sql" code={"-- Active users this week\\nSELECT id, name FROM users\\nWHERE last_seen > NOW() - INTERVAL '7 days'\\nORDER BY name;"} />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    maxWidth: 520
  }}>
      <CodeBlock language={thrift} code={'# A user record\\nstruct User {\\n  1: required i64 id;\\n  2: optional string name;\\n}'} />
      <CodeBlock language={java} code={'// Greet a user\\npublic final class Greeter {\\n  String greet(String name) { return "hello, " + name; }\\n}'} />
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`{
  "name": "@astryxdesign/core",
  "version": "0.0.5",
  "dependencies": {
    "@stylexjs/stylex": "^0.17.5",
    "react": "^19.0.0"
  },
  "scripts": {
    "build": "tsup",
    "test": "vitest"
  }
}\`,
    language: 'json',
    title: 'package.json',
    hasLineNumbers: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`#!/usr/bin/env python3
"""Data processing pipeline."""

from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Config:
    input_path: str
    output_path: str
    batch_size: int = 100

def process(config: Config) -> None:
    """Process data according to config."""
    print(f"Processing {config.input_path}")
    # TODO: implement pipeline
    pass

if __name__ == "__main__":
    cfg = Config("input.csv", "output.csv")
    process(cfg)\`,
    language: 'python',
    title: 'pipeline.py',
    hasLineNumbers: true,
    highlightLines: [7, 8, 9, 10, 11]
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main id="app">
      <h1>Hello, World!</h1>
      <p class="subtitle">Welcome to Astryx.</p>
    </main>
    <script src="app.js"><\/script>
  </body>
</html>\`,
    language: 'html',
    title: 'index.html',
    hasLineNumbers: true
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`:root {
  --color-primary: #0064E0;
  --radius: 8px;
}

.button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: var(--radius);
  background-color: var(--color-primary);
  color: white;
  font-weight: 600;
  transition: opacity 0.15s ease;
}

.button:hover {
  opacity: 0.9;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #2694FE;
  }
}\`,
    language: 'css',
    title: 'button.css',
    hasLineNumbers: true
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`#!/bin/bash
# Deploy script for production

set -euo pipefail

DEPLOY_DIR="/opt/app"
VERSION=$(git describe --tags --always)

echo "Deploying version $VERSION..."

if [ ! -d "$DEPLOY_DIR" ]; then
  mkdir -p "$DEPLOY_DIR"
fi

pnpm build
cp -r dist/* "$DEPLOY_DIR/"

echo "Deploy complete: $VERSION"\`,
    language: 'bash',
    title: 'deploy.sh',
    hasLineNumbers: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    code: 'npm install @astryxdesign/core',
    language: 'bash',
    hasCopyButton: true
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`// This is a very long line that demonstrates the word wrapping behavior of the code block component when isWrapped is set to true, which causes long lines to wrap instead of scrolling horizontally
const result = someVeryLongFunctionName(parameterOne, parameterTwo, parameterThree, parameterFour, parameterFive);\`,
    language: 'typescript',
    isWrapped: true,
    hasLineNumbers: true
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    code: Array.from({
      length: 50
    }, (_, i) => \`const line\${i + 1} = \${i + 1};\`).join('\\n'),
    language: 'typescript',
    title: 'many-lines.ts',
    hasLineNumbers: true,
    maxHeight: 200
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    code: tsExample,
    language: 'typescript',
    title: 'useUser.ts',
    hasLineNumbers: true,
    size: 'sm'
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`const greeting = "Hello, world!";
console.log(greeting);\`,
    language: 'typescript',
    hasLanguageLabel: false,
    hasCopyButton: true
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`This is plain text without any syntax highlighting.
It preserves whitespace and line breaks.

  Indentation is maintained.
    Nested indentation too.\`,
    language: 'plaintext',
    title: 'notes.txt',
    hasLineNumbers: true
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    code: tsExample,
    language: 'typescript',
    title: 'useUser.ts',
    width: '100%'
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    code: tsExample,
    language: 'typescript',
    title: 'useUser.ts',
    width: '100%',
    container: 'section'
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    code: tsExample,
    language: 'typescript',
    title: 'useUser.ts',
    hasLineNumbers: true,
    isCollapsible: true
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    code: \`  const response = await fetch(\\\`/api/users/\\\${id}\\\`);
  if (!response.ok) {
    throw new Error(\\\`HTTP \\\${response.status}\\\`);
  }
  return response.json();\`,
    language: 'typescript',
    title: 'useUser.ts — lines 40–44',
    hasLineNumbers: true,
    startLineNumber: 40,
    highlightLines: [42]
  }
}`,...U.parameters?.docs?.source},description:{story:`A code excerpt: N lines around a point of interest, with the gutter
showing the lines' real file numbers. highlightLines uses the same file
coordinates, so the point of interest stays emphasized.`,...U.parameters?.docs?.description}}},W=`Default.WithHighlightedLines.Diff.DiffLongLines.OverflowStop.CopyClearance.EndContent.EndContentHeaderless.EndContentTall.BuiltInLanguages.LanguageModules.JSON.Python.HTML.CSS.Bash.SingleLine.Wrapped.WithMaxHeight.SmallSize.NoHeader.Plaintext.FullWidth.ContainerSection.Collapsible.Excerpt`.split(`.`)})))()}G();export{N as Bash,D as BuiltInLanguages,M as CSS,H as Collapsible,V as ContainerSection,x as CopyClearance,g as Default,v as Diff,y as DiffLongLines,w as EndContent,T as EndContentHeaderless,E as EndContentTall,U as Excerpt,B as FullWidth,j as HTML,k as JSON,O as LanguageModules,R as NoHeader,b as OverflowStop,z as Plaintext,A as Python,P as SingleLine,L as SmallSize,_ as WithHighlightedLines,I as WithMaxHeight,F as Wrapped,W as __namedExportsOrder,m as default};