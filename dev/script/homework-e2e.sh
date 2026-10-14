#!/usr/bin/env bash
# End-to-end homework run (Sprint §3.1, M4 QA): test account = learner, instructor = gh active account.
# Learner side uses a per-process token; instructor side runs with GH_TOKEN unset (active gh account).
# Usage: bash dev/script/homework-e2e.sh <throwaway-dir> <test-account> <repo-name> <instructor>
# Precondition: gh holds both accounts, active = instructor; <repo-name> must NOT exist on <test-account>.
set -u
W="$1"; U="$2"; R="$3"; T="$4"
STU="$(gh auth token -h github.com --user "$U")" || { echo "no token for $U"; exit 1; }
as_student() { GH_TOKEN="$STU" "$@"; }
as_teacher() { env -u GH_TOKEN "$@"; }
export GIT_CONFIG_COUNT=5
export GIT_CONFIG_KEY_0=init.defaultBranch GIT_CONFIG_VALUE_0=main
export GIT_CONFIG_KEY_1=core.autocrlf GIT_CONFIG_VALUE_1=true
export GIT_CONFIG_KEY_2=pull.rebase GIT_CONFIG_VALUE_2=false
export GIT_CONFIG_KEY_3=credential.helper GIT_CONFIG_VALUE_3=
export GIT_CONFIG_KEY_4=credential.helper GIT_CONFIG_VALUE_4='!gh auth git-credential'
export GIT_AUTHOR_NAME="Amy" GIT_AUTHOR_EMAIL="amy@example.com" GIT_COMMITTER_NAME="Amy" GIT_COMMITTER_EMAIL="amy@example.com"
step() { echo; echo "== $*"; }
q() { "$@" >/dev/null 2>&1 || { echo "FAILED: $*"; exit 1; }; }
rm -rf "$W"; mkdir -p "$W/$R"; cd "$W/$R" || exit 1

step "1 init + 3 commits"
q git init
for d in 1 2 3; do printf 'Day %s：今天學到的事\n' "$d" > "day$d.md"; q git add "day$d.md"; q git commit -m "新增 Day $d 筆記"; done
step "2 .gitignore"
printf '*.tmp\n' > .gitignore; printf 'x\n' > notes.tmp; q git add .gitignore; q git commit -m "忽略 tmp 檔"
git status --porcelain | grep -q notes.tmp && { echo "FAILED: notes.tmp not ignored"; exit 1; }; echo "notes.tmp ignored"
step "3 feat branch + local merge"
q git switch -c feat/day4; printf 'Day 4\n' > day4.md; q git add day4.md; q git commit -m "新增 Day 4 筆記"
q git switch main; q git merge feat/day4; q git branch -d feat/day4
step "4 conflict + merge commit"
printf '# 我的 Git 日誌\n' > README.md; q git add README.md; q git commit -m "新增標題"
q git switch -c feat/title; printf '# 我的 Git 學習日誌\n' > README.md; q git commit -am "改標題"
q git switch main; printf '# Amy 的 Git 日誌\n' > README.md; q git commit -am "標題加名字"
git merge feat/title >/dev/null 2>&1 && { echo "FAILED: expected conflict"; exit 1; }
printf '# Amy 的 Git 學習日誌\n' > README.md; q git add README.md; q git commit -m "解決標題衝突"; q git branch -d feat/title
git log --merges --oneline | head -1
step "5 own repo + push main"
q as_student gh repo create "$U/$R" --public
q git remote add origin "https://github.com/$U/$R.git"
GH_TOKEN="$STU" git push -u origin main >/dev/null 2>&1 || { echo "FAILED: push main"; exit 1; }
step "6 feat branch push + PR in own repo"
q git switch -c feat/day5; printf 'Day 5：學會發 PR\n' > day5.md; q git add day5.md; q git commit -m "新增 Day 5 筆記"
GH_TOKEN="$STU" git push -u origin feat/day5 >/dev/null 2>&1 || { echo "FAILED: push branch"; exit 1; }
BODY="@$T 請 review 我的 Git 作業

- 這個 PR 新增了：Day 5 筆記
- 我在作業中解決過一次衝突：README.md"
PR_URL=$(as_student gh pr create --repo "$U/$R" --base main --head feat/day5 --title "新增 Day 5 筆記" --body "$BODY")
echo "PR: $PR_URL"
step "7 instructor finds it via search"
sleep 0 # search index may lag; retried below
for i in 1 2 3 4 5 6; do
  HIT=$(as_teacher gh search prs --mentions "$T" --repo "$U/$R" --json url --jq '.[].url'); [ -n "$HIT" ] && break
  node -e "setTimeout(()=>{},10000)"
done
echo "search hit: ${HIT:-<none>}"
step "8a instructor requests changes"
q as_teacher gh pr review "$PR_URL" --request-changes -b "Day 5 請多寫一句你學到什麼"
step "8b learner fixes on same branch + comments"
printf 'Day 5：學會發 PR，也學會被 review 後修改\n' > day5.md; q git commit -am "補充 Day 5 筆記"
GH_TOKEN="$STU" git push >/dev/null 2>&1 || { echo "FAILED: push fix"; exit 1; }
q as_student gh pr comment "$PR_URL" -b "已修改，請再看一次"
step "8c instructor approves; learner merges"
q as_teacher gh pr review "$PR_URL" --approve -b "通過"
q as_student gh pr merge "$PR_URL" --merge
step "9 local main == GitHub main"
q git switch main; GH_TOKEN="$STU" git pull >/dev/null 2>&1 || { echo "FAILED: pull"; exit 1; }
LOCAL=$(git rev-parse HEAD); REMOTE=$(as_student gh api "repos/$U/$R/commits/main" --jq .sha)
echo "local=$LOCAL remote=$REMOTE match=$([ "$LOCAL" = "$REMOTE" ] && echo yes || echo NO)"
step "signals"
as_teacher gh api "repos/$U/$R/pulls/$(basename "$PR_URL")/reviews" --jq '.[] | [.user.login,.state,.author_association] | @tsv'
as_teacher gh pr view "$PR_URL" --json state,mergedBy,commits --jq '"state=\(.state) mergedBy=\(.mergedBy.login) commits=\(.commits|length)"'
as_teacher gh api "repos/$U/$R/issues/$(basename "$PR_URL")/timeline" --jq '[.[] | .event] | join(" > ")'
echo "commits on main: $(git rev-list --count HEAD), merge commits: $(git rev-list --merges --count HEAD)"
