// CodeBunny's 11:32Z non-blocking notes on #9700/#9701, to ride the push that
// rebases the stack once #9399 lands:
//  - A and B: TabBar's Accessibility paragraph keeps only the reasons (the
//    roles, the tab stop and the keys are in the markup);
//  - B: automaticallyActivates says it acts only under a finger;
//  - B: `travel` becomes `capTravel`, without the comment that named it.
// Usage: node h-r7-ab.mjs <worktree>   (idempotent)
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2];
const T = 'packages/lab/src/TabBar';
function edit(rel, pairs) {
  const p = path.join(root, rel);
  let s = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) {
      if (to !== '' && s.includes(to)) continue;
      throw new Error(`${rel}: anchor ${from.slice(0, 100)}`);
    }
    s = s.split(from).join(to);
  }
  fs.writeFileSync(p, s);
}
const tb = fs.readFileSync(path.join(root, `${T}/TabBar.tsx`), 'utf8');
const isB = tb.includes('automaticallyActivates');

if (isB) {
  edit(`${T}/TabBar.tsx`, [
    [
      ` * Accessibility: a \`tablist\` of \`tab\` buttons (\`aria-selected\`) with one tab
 * stop. The arrow keys, Home and End move between tabs, and Enter or Space
 * chooses one. A badge is part of its tab's name, one message with both
 * ("Library, 3"; \`badgeLabel\`, or the badge itself). A disabled tab is dimmed,
 * skipped by the keys and never chosen. Collapsed, the bar is one button for
 * assistive technology, as on iOS. That button is the circle, named after the
 * selected tab and collapsed (\`aria-expanded\`). The tabs stay inert until it
 * expands. Activated from the keys, it moves focus to the selected tab. The
 * circle and the three glass pieces mount only when the bar can collapse under
 * a finger. That is, when minimizing is on or a search tab is there.`,
      ` * Accessibility: collapsed, the bar is one button for assistive technology,
 * as on iOS, and the tabs stay inert until it expands. The circle and the three
 * glass pieces mount only when the bar can collapse under a finger. That is,
 * when minimizing is on or a search tab is there.`,
    ],
    [
      `   * Whether choosing the search tab activates its field at once (UIKit's
   * \`automaticallyActivatesSearch\`); otherwise the field waits inline.
   * @default true`,
      `   * Whether choosing the search tab activates its field at once (UIKit's
   * \`automaticallyActivatesSearch\`); otherwise the field waits inline. Only
   * under a finger: under a mouse the search tab always activates its field.
   * @default true`,
    ],
  ]);
  edit(`${T}/TabBar.doc.mjs`, [
    [
      `            'Whether choosing the search tab activates its field at once. When false, the field waits inline in the bar until it is tapped.',`,
      `            'Whether choosing the search tab activates its field at once. When false, the field waits inline in the bar until it is tapped. Only under a finger: under a mouse the search tab always activates its field.',`,
    ],
  ]);
  edit(`${T}/useTabBarMinimize.ts`, [
    [
      `    // The trailing cap's travel onto the leading one.
    const travel = element.offsetWidth - tabBar.barHeight;`,
      `    const capTravel = element.offsetWidth - tabBar.barHeight;`,
    ],
    [`{x: isCollapsed ? (isRtl ? travel : -travel) : 0},`, `{x: isCollapsed ? (isRtl ? capTravel : -capTravel) : 0},`],
    [`      const travel = next - tabBar.barHeight;`, `      const capTravel = next - tabBar.barHeight;`],
    [`platterEnd.animator.set({x: isRtl ? travel : -travel});`, `platterEnd.animator.set({x: isRtl ? capTravel : -capTravel});`],
  ]);
} else {
  edit(`${T}/TabBar.tsx`, [
    [
      ` *
 * Accessibility: a \`tablist\` of \`tab\` buttons (\`aria-selected\`) with one tab
 * stop. The arrow keys, Home and End move between tabs, and Enter or Space
 * chooses one. A badge is part of its tab's name, one message with both
 * ("Library, 3"; \`badgeLabel\`, or the badge itself).
 */`,
      ` */`,
    ],
  ]);
}
console.log(`round 7 applied (${isB ? 'B' : 'A'} tree)`);
