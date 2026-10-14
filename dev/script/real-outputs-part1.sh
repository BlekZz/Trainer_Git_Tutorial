#!/usr/bin/env bash
# Records real git output for L2–L5 commands (M2 ground truth). Run in a throwaway dir.
set -u
W="$1"; rm -rf "$W"; mkdir -p "$W"; cd "$W" || exit 1
export GIT_AUTHOR_NAME="Amy" GIT_AUTHOR_EMAIL="amy@example.com" GIT_COMMITTER_NAME="Amy" GIT_COMMITTER_EMAIL="amy@example.com"
git config --global init.defaultBranch >/dev/null || true
run() { echo; echo "\$ $*"; "$@" 2>&1; echo "[exit=$?]"; }
echo "git version: $(git --version)"
mkdir git-journal && cd git-journal
run git init
run git status
printf '# 我的 Git 日誌\n' > README.md
run git status
run git add README.md
run git status
run git commit -m "新增日誌標題"
printf 'Day 1：學會 git init\n' > day1.md
run git add day1.md
run git commit -m "新增 Day 1 筆記"
run git log
run git log --oneline
printf 'Day 1：學會 git init 和 git add\n' > day1.md
run git diff
run git restore day1.md
run git status
printf 'secret\n' > notes.tmp
printf '*.tmp\n' > .gitignore
run git status
run git add .gitignore
run git commit -m "忽略 tmp 檔"
run git switch -c feat/day2
printf 'Day 2：學會分支\n' > day2.md
run git add day2.md
run git commit -m "新增 Day 2 筆記"
run git switch main
run ls
run git merge feat/day2
run git branch -d feat/day2
run git branch
# conflict
run git switch -c feat/title
printf '# 我的 Git 學習日誌\n' > README.md
run git commit -am "標題改成學習日誌"
run git switch main
printf '# Amy 的 Git 日誌\n' > README.md
run git commit -am "標題加上名字"
run git merge feat/title
run git status
echo "--- README.md content during conflict ---"; cat README.md
printf '# Amy 的 Git 學習日誌\n' > README.md
run git add README.md
run git commit --no-edit
run git log --oneline --graph
