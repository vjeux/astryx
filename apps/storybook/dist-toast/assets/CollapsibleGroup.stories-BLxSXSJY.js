import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Heading-YiIeUtHm.js";import{n as i,t as a}from"./VStack-SWtDePqc.js";import{n as o,t as s}from"./Collapsible-twVulli-.js";import{n as c,t as l}from"./CollapsibleGroup-DK_3HHuD.js";var u,d,f,p,m;function h(){return(h=e((()=>{o(),c(),n(),i(),u=t(),d={canvas:{kWkggS:`x1eiddq6`,kMwMTN:`x1tgivj0`,kMv6JI:`x9ynric`,ks0D6T:`xwnkcuf`,kmVPX3:`x1gt495`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,$$css:!0}},f={title:`Core/CollapsibleGroup`,component:l,tags:[`autodocs`,`visual-theme-matrix`],parameters:{layout:`centered`}},p={render:()=>(0,u.jsxs)(a,{gap:6,xstyle:d.canvas,children:[(0,u.jsx)(`section`,{"aria-labelledby":`collapsible-group-single-heading`,children:(0,u.jsxs)(a,{gap:2,children:[(0,u.jsx)(r,{level:2,id:`collapsible-group-single-heading`,children:`Single selection with leading chevrons`}),(0,u.jsxs)(l,{type:`single`,hasDividers:!0,chevronPosition:`start`,defaultValue:`profile`,children:[(0,u.jsx)(s,{trigger:`Profile settings`,value:`profile`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`Update the profile details shown to other people.`})}),(0,u.jsx)(s,{trigger:`Privacy settings`,value:`privacy`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`Choose who can see profile activity.`})})]})]})}),(0,u.jsx)(`section`,{"aria-labelledby":`collapsible-group-multiple-heading`,children:(0,u.jsxs)(a,{gap:2,children:[(0,u.jsx)(r,{level:2,id:`collapsible-group-multiple-heading`,children:`Multiple selection with compact rows`}),(0,u.jsxs)(l,{type:`multiple`,hasDividers:!0,density:`compact`,defaultValue:[`deployment`,`logs`],children:[(0,u.jsx)(s,{trigger:`Deployment details`,value:`deployment`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`The current release is available to everyone.`})}),(0,u.jsx)(s,{trigger:`Environment variables`,value:`environment`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`Twelve variables are configured.`})}),(0,u.jsx)(s,{trigger:`Build logs`,value:`logs`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`The latest build completed successfully.`})})]})]})}),(0,u.jsx)(`section`,{"aria-labelledby":`collapsible-group-plain-heading`,children:(0,u.jsxs)(a,{gap:2,children:[(0,u.jsx)(r,{level:2,id:`collapsible-group-plain-heading`,children:`Plain group with default unpadded rows`}),(0,u.jsxs)(l,{type:`single`,defaultValue:`access`,children:[(0,u.jsx)(s,{trigger:`Account access`,value:`access`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`People with access can sign in to this workspace.`})}),(0,u.jsx)(s,{trigger:`Notifications`,value:`notifications`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`Email notifications are sent for important changes.`})})]})]})}),(0,u.jsx)(`section`,{"aria-labelledby":`collapsible-group-spacious-heading`,children:(0,u.jsxs)(a,{gap:2,children:[(0,u.jsx)(r,{level:2,id:`collapsible-group-spacious-heading`,children:`Spacious group without dividers`}),(0,u.jsxs)(l,{type:`multiple`,density:`spacious`,defaultValue:[`retention`],children:[(0,u.jsx)(s,{trigger:`Data retention`,value:`retention`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`Records are retained for the configured period.`})}),(0,u.jsx)(s,{trigger:`Audit exports`,value:`exports`,children:(0,u.jsx)(`p`,{className:`xv1l7n4 x10im51j`,children:`Exports are available to workspace administrators.`})})]})]})})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={6} xstyle={styles.canvas}>
      <section aria-labelledby="collapsible-group-single-heading">
        <VStack gap={2}>
          <Heading level={2} id="collapsible-group-single-heading">
            Single selection with leading chevrons
          </Heading>
          <CollapsibleGroup type="single" hasDividers chevronPosition="start" defaultValue="profile">
            <Collapsible trigger="Profile settings" value="profile">
              <p {...stylex.props(styles.body)}>
                Update the profile details shown to other people.
              </p>
            </Collapsible>
            <Collapsible trigger="Privacy settings" value="privacy">
              <p {...stylex.props(styles.body)}>
                Choose who can see profile activity.
              </p>
            </Collapsible>
          </CollapsibleGroup>
        </VStack>
      </section>

      <section aria-labelledby="collapsible-group-multiple-heading">
        <VStack gap={2}>
          <Heading level={2} id="collapsible-group-multiple-heading">
            Multiple selection with compact rows
          </Heading>
          <CollapsibleGroup type="multiple" hasDividers density="compact" defaultValue={['deployment', 'logs']}>
            <Collapsible trigger="Deployment details" value="deployment">
              <p {...stylex.props(styles.body)}>
                The current release is available to everyone.
              </p>
            </Collapsible>
            <Collapsible trigger="Environment variables" value="environment">
              <p {...stylex.props(styles.body)}>
                Twelve variables are configured.
              </p>
            </Collapsible>
            <Collapsible trigger="Build logs" value="logs">
              <p {...stylex.props(styles.body)}>
                The latest build completed successfully.
              </p>
            </Collapsible>
          </CollapsibleGroup>
        </VStack>
      </section>

      <section aria-labelledby="collapsible-group-plain-heading">
        <VStack gap={2}>
          <Heading level={2} id="collapsible-group-plain-heading">
            Plain group with default unpadded rows
          </Heading>
          <CollapsibleGroup type="single" defaultValue="access">
            <Collapsible trigger="Account access" value="access">
              <p {...stylex.props(styles.body)}>
                People with access can sign in to this workspace.
              </p>
            </Collapsible>
            <Collapsible trigger="Notifications" value="notifications">
              <p {...stylex.props(styles.body)}>
                Email notifications are sent for important changes.
              </p>
            </Collapsible>
          </CollapsibleGroup>
        </VStack>
      </section>

      <section aria-labelledby="collapsible-group-spacious-heading">
        <VStack gap={2}>
          <Heading level={2} id="collapsible-group-spacious-heading">
            Spacious group without dividers
          </Heading>
          <CollapsibleGroup type="multiple" density="spacious" defaultValue={['retention']}>
            <Collapsible trigger="Data retention" value="retention">
              <p {...stylex.props(styles.body)}>
                Records are retained for the configured period.
              </p>
            </Collapsible>
            <Collapsible trigger="Audit exports" value="exports">
              <p {...stylex.props(styles.body)}>
                Exports are available to workspace administrators.
              </p>
            </Collapsible>
          </CollapsibleGroup>
        </VStack>
      </section>
    </VStack>
}`,...p.parameters?.docs?.source}}},m=[`AuditMatrix`]})))()}h();export{p as AuditMatrix,m as __namedExportsOrder,f as default};