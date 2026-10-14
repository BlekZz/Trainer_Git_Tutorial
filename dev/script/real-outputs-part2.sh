#!/usr/bin/env bash
# Records real git/GitHub output for Part 2 (L6 push, L7 own PR + pull, L8 two-folder sync + remote conflict).
# Runs as the TEST account via a per-process token; never changes global git/gh config.
# Usage: bash dev/script/real-outputs-part2.sh <throwaway-dir> <test-account> <repo-name>
#   e.g. bash dev/script/real-outputs-part2.sh /tmp/rec blakelee0918 git-journal-rec
# Precondition: `gh auth login` already holds <test-account>; the repo <repo-name> must NOT exist yet.
set -u
W="$1"; U="$2"; R="$3"
GH_TOKEN="$(gh auth token -h github.com --user "$U")" || { echo "no token for $U"; exit 1; }
export GH_TOKEN
# Student-like config (L0 one-time settings + Git for Windows defaults) and HTTPS credentials from GH_TOKEN, process-scoped.
export GIT_CONFIG_COUNT=5
export GIT_CONFIG_KEY_0=init.defaultBranch GIT_CONFIG_VALUE_0=main
export GIT_CONFIG_KEY_1=core.autocrlf GIT_CONFIG_VALUE_1=true
export GIT_CONFIG_KEY_2=pull.rebase GIT_CONFIG_VALUE_2=false
export GIT_CONFIG_KEY_3=credential.helper GIT_CONFIG_VALUE_3=
export GIT_CONFIG_KEY_4=credential.helper GIT_CONFIG_VALUE_4='!gh auth git-credential'
export GIT_AUTHOR_NAME="Amy" GIT_AUTHOR_EMAIL="amy@example.com" GIT_COMMITTER_NAME="Amy" GIT_COMMITTER_EMAIL="amy@example.com"
URL="https://github.com/$U/$R.git"
run() { echo; echo "\$ $*"; "$@" 2>&1; echo "[exit=$?]"; }
rm -rf "$W"; mkdir -p "$W"; cd "$W" || exit 1
echo "git version: $(git --version)"

# --- local history as at the end of Part 1 (quiet) ---
git init -q git-journal && cd git-journal
printf '# Amy 的 Git 學習日誌\n' > README.md && printf 'Day 1：學會 git init\n' > day1.md && printf '*.tmp\n' > .gitignore
git add . 2>/dev/null && git commit -qm "Part 1 的日誌"

# --- L6: empty repo on GitHub (students use the web form; recorded via gh) -> remote add -> push -u ---
gh repo create "$U/$R" --public >/dev/null || { echo "repo create failed"; exit 1; }
run git remote add origin "$URL"
run git remote -v
run git push --progress -u origin main
run git status

# --- L7: branch -> push branch -> PR in own repo -> merge -> pull ---
run git switch -c feat/day3
printf 'Day 3：學會 push\n' > day3.md
git add day3.md 2>/dev/null
run git commit -m "新增 Day 3 筆記"
run git push --progress -u origin feat/day3
gh pr create --repo "$U/$R" --base main --head feat/day3 --title "新增 Day 3 筆記" --body "test" >/dev/null
gh pr merge --repo "$U/$R" feat/day3 --merge >/dev/null
run git switch main
run git pull --progress
run git log --oneline --graph
run git branch -d feat/day3

# --- L8: second folder via clone (simulates another computer) ---
cd "$W"
run git clone --progress "$URL" git-journal-laptop
cd git-journal-laptop
printf 'Day 4：在第二台電腦寫的\n' > day4.md
git add day4.md 2>/dev/null
run git commit -m "新增 Day 4 筆記"
run git push --progress
cd "$W/git-journal"
run git pull --progress

# --- L8: edit the same line on GitHub web (recorded via contents API) while editing locally -> rejected -> pull -> conflict ---
SHA=$(gh api "repos/$U/$R/contents/README.md" --jq .sha)
CONTENT=$(printf '# Amy 的 Git 學習日誌（網頁版）\n' | base64 -w0)
gh api -X PUT "repos/$U/$R/contents/README.md" -f message="在網頁上改標題" -f content="$CONTENT" -f sha="$SHA" >/dev/null
printf '# Amy 的 Git 學習日誌（電腦版）\n' > README.md
run git commit -am "在電腦上改標題"
run git push --progress
run git pull --progress
run git status
echo "--- README.md content during conflict ---"; cat README.md
printf '# Amy 的 Git 學習日誌\n' > README.md
git add README.md 2>/dev/null
run git commit -m "解決標題衝突"
run git push --progress
run git log --oneline --graph
