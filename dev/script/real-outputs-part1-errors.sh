#!/usr/bin/env bash
# Real outputs for audit fixes: untracked notes.tmp status, switch blocked by local changes, branch -d not fully merged.
set -u
W="$1"; rm -rf "$W"; mkdir -p "$W"; cd "$W" || exit 1
export GIT_AUTHOR_NAME="Amy" GIT_AUTHOR_EMAIL="amy@example.com" GIT_COMMITTER_NAME="Amy" GIT_COMMITTER_EMAIL="amy@example.com"
run() { echo; echo "\$ $*"; "$@" 2>&1; echo "[exit=$?]"; }
git init -q git-journal && cd git-journal
printf '# 我的 Git 日誌\n' > README.md && git add README.md 2>/dev/null && git commit -qm "新增日誌標題"
printf 'Day 1\n' > day1.md && git add day1.md 2>/dev/null && git commit -qm "新增 Day 1 筆記"
printf '練習用臨時筆記\n' > notes.tmp
run git status
rm notes.tmp
git switch -qc feat/x && printf 'x\n' > README.md && git commit -qam "x" 2>/dev/null
git switch -q main
printf 'local edit\n' > README.md
run git switch feat/x
git restore README.md
git switch -qc feat/day2 && printf 'Day 2\n' > day2.md && git add day2.md 2>/dev/null && git commit -qm "新增 Day 2 筆記"
git switch -q main
run git branch -d feat/day2
