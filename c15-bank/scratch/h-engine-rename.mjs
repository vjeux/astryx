// Re-points TabBar's own files at the renamed internal motion engine once
// #9754's rename lands. The mapping comes from the command line, so it
// matches whatever names #9754 ships:
//   node h-engine-rename.mjs <worktree> createMotionAnimator=createMotionEngine \
//     MotionAnimator=MotionEngine useMotionAnimator=useMotionEngine \
//     ../internal/useMotionAnimator=../internal/useMotionEngine
// Only TabBar's own files change. Whole identifiers only; a module path pair
// (with a slash) replaces the quoted import path. Prints every file it changed.
import fs from 'node:fs';
import path from 'node:path';

const [root, ...pairs] = process.argv.slice(2);
if (!root || pairs.length === 0) throw new Error('usage: <worktree> old=new ...');
const mapping = pairs.map(pair => {
  const at = pair.indexOf('=');
  if (at < 1) throw new Error(`bad pair ${pair}`);
  return [pair.slice(0, at), pair.slice(at + 1)];
});
const dir = path.join(root, 'packages/lab/src/TabBar');
const files = [];
const walk = d => {
  for (const name of fs.readdirSync(d)) {
    const p = path.join(d, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|mjs)$/.test(name)) files.push(p);
  }
};
walk(dir);
// Longer names first, so MotionAnimator never eats useMotionAnimator.
mapping.sort((a, b) => b[0].length - a[0].length);
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let s = before;
  for (const [from, to] of mapping) {
    if (from.includes('/')) {
      s = s.split(`'${from}'`).join(`'${to}'`);
    } else {
      s = s.replace(new RegExp(`(?<![A-Za-z0-9_$])${from}(?![A-Za-z0-9_$])`, 'g'), to);
    }
  }
  if (s !== before) {
    fs.writeFileSync(file, s);
    console.log('changed', path.relative(root, file));
  }
}
