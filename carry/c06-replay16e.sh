set -e
export GIT_COMMITTER_NAME='Christopher Chedeau' GIT_COMMITTER_EMAIL='vjeuxx@gmail.com'
replay() {
  local c=$1 base=$2 p=$(git rev-parse $1^1)
  local out conflict=0
  out=$(git merge-tree --write-tree --merge-base=$p $base $c) || conflict=1
  if [ $conflict = 1 ]; then echo "STOP: conflict replaying $(git rev-parse --short=10 $c)" >&2; echo "$out" | sed -n '2,12p' >&2; exit 7; fi
  local tree=$(echo "$out" | head -1)
  local AN=$(git log -1 --format=%an $c) AE=$(git log -1 --format=%ae $c) AD=$(git log -1 --format=%ad --date=raw $c)
  git cat-file -p $c | awk 'f{print} /^$/{f=1}' > /tmp/c06-rmsg.txt
  GIT_AUTHOR_NAME="$AN" GIT_AUTHOR_EMAIL="$AE" GIT_AUTHOR_DATE="$AD" git commit-tree $tree -p $base -F /tmp/c06-rmsg.txt
}
pid() { git show $1 | git patch-id --stable | cut -c1-8; }
pid0() { git show -U0 $1 | git patch-id --stable | cut -c1-8; }
H=$(cat /tmp/c06-v16d-A)
for c in 74629ddd38 23f1985ab9 90c3d31782 b14ba36ecf ea573a0116 0e022a9ad1 4bb628734b 1a15116518; do
  N=$(replay $c $H); echo "$c -> ${N:0:10} $(pid $c)/$(pid $N) U0 $(pid0 $c)/$(pid0 $N)"; H=$N
done; echo "B=$H"; echo $H > /tmp/c06-v16d-B
for c in fe92e1e9c7 7a137e9fd9 22369e1123; do
  N=$(replay $c $H); echo "$c -> ${N:0:10} $(pid $c)/$(pid $N) U0 $(pid0 $c)/$(pid0 $N)"; H=$N
done; echo "C=$H"; echo $H > /tmp/c06-v16d-C
