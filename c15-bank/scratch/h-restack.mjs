#!/usr/bin/env node
// Restack the TabBar stack (P-core, page freeze, A, B) onto #9399's new head.
// Same patches; each step is a 3-way merge of the commit's own change onto
// its new parent. Stops on any conflict. Prints the new SHAs and updates
// refs/c15b/l4/{p1,p2,a,b}.
// Usage: node h-restack.mjs <worktree> <new #9399 head>
import {execFileSync} from 'node:child_process';

const [wt, newBase] = process.argv.slice(2);
const git = (...args) => execFileSync('git', ['-C', wt, ...args], {encoding: 'utf8'}).trim();
const env = {
  ...process.env,
  GIT_COMMITTER_NAME: 'Christopher Chedeau',
  GIT_COMMITTER_EMAIL: 'vjeuxx@gmail.com',
};
function pick(commit, oldParent, newParent) {
  let out;
  try {
    out = execFileSync('git', ['-C', wt, 'merge-tree', '--write-tree', `--merge-base=${oldParent}`, newParent, commit], {encoding: 'utf8'});
  } catch (error) {
    console.error(`CONFLICT picking ${commit.slice(0, 10)} onto ${newParent.slice(0, 10)}:\n${String(error.stdout).split('\n').slice(0, 12).join('\n')}`);
    process.exit(1);
  }
  const tree = out.split('\n')[0];
  const message = git('log', '-1', '--format=%B', commit);
  const [an, ae, ad] = [git('log', '-1', '--format=%an', commit), git('log', '-1', '--format=%ae', commit), git('log', '-1', '--format=%ad', '--date=raw', commit)];
  return execFileSync('git', ['-C', wt, 'commit-tree', tree, '-p', newParent, '-m', message], {
    encoding: 'utf8',
    env: {...env, GIT_AUTHOR_NAME: an, GIT_AUTHOR_EMAIL: ae, GIT_AUTHOR_DATE: ad},
  }).trim();
}
const oldBase = '1748182dbfec05e897a4c1e7aef6565c21d1a68a';
const p1 = git('rev-parse', 'refs/c15b/l3/p1');
const freeze = git('rev-parse', 'refs/c15b/l1/pfreeze-main');
const a = git('rev-parse', 'refs/c15b/l3/a');
const aParent = git('rev-parse', 'refs/c15b/l3/p2');
const b = git('rev-parse', 'refs/c15b/l3/b');
const base = git('rev-parse', newBase);
const np1 = pick(p1, oldBase, base);
const np2 = pick(freeze, `${freeze}^`, np1);
const na = pick(a, aParent, np2);
const nb = pick(b, a, na);
for (const [name, sha] of [['p1', np1], ['p2', np2], ['a', na], ['b', nb]]) {
  git('update-ref', `refs/c15b/l4/${name}`, sha);
  const extra = git('cat-file', '-p', sha).split('\n\n')[0].split('\n').filter(line => !/^(tree|parent|author|committer) /.test(line));
  console.log(`l4/${name} = ${sha.slice(0, 10)}${extra.length ? ' EXTRA HEADERS ' + extra.join('|') : ''}`);
}
