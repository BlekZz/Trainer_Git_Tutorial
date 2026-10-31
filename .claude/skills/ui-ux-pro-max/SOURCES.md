---
schema: sources-md/v1
skill: ui-ux-pro-max
role: domain
lineage: vanilla
status: active
home: coldbench
last_integrated: 2026-10-07
upstreams:
  - id: skill:ui-ux-pro-max
    repo: github.com/nextlevelbuilder/ui-ux-pro-max-skill
    path: ".claude/skills/ui-ux-pro-max"
    absorbed_sha: 477bcb28c9812b385cb51a4605ddf30d7b2266e2
    reviewed_through_sha: 477bcb28c9812b385cb51a4605ddf30d7b2266e2
    version: "—"
    license: "MIT"
    role: "領域內容與對映的 scripts／references 子樹"
    track: true
    status: active
standards: []
evals: none
---

# ui-ux-pro-max — 來源帳本

## File map

| 衍生檔 | 上游 | absorption | 轉換說明 |
|---|---|---|---|
| . | skill:ui-ux-pro-max:.claude/skills/ui-ux-pro-max | verbatim | 上游子樹原樣；SKILL.md frontmatter／安裝路徑接線，詳見 Local customizations；額外 repo 根授權另列。 |

## Local customizations

- SKILL.md：description 精簡並區分 taste、dashboard-taste；正文僅修正安裝路徑接線。
- SKILL.md：11 處 ${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py 改為 <skill-dir>/scripts/search.py；補充 skill-dir 的位置與 plugin 形式適用範圍，搜尋功能不變。
- SKILL.md frontmatter：加入 audience: agent、role: domain（OS 接線）。

## Exclusions

無

## Evals

無（backfill 時尚未建立）

## Refresh log

| 日期 | 上游 | reviewed 舊→新 sha7 | absorbed 舊→新 sha7 | 每個對映檔的結論 |
|---|---|---|---|---|
| 2026-10-07 | 全部 | — | — | backfill 建帳（adopt），lineage 依內容測試判定 |
