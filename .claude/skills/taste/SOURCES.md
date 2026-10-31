---
schema: sources-md/v1
skill: taste
role: domain
lineage: modded
status: active
home: coldbench
last_integrated: 2026-04-29
upstreams:
  - id: skill:taste
    repo: github.com/leonxlnx/taste-skill
    path: "skills"
    absorbed_sha: ce26fc25c0e5e8cab638f883de62d9a86ee5e45b
    reviewed_through_sha: ce26fc25c0e5e8cab638f883de62d9a86ee5e45b
    version: "—"
    license: MIT
    role: "11 組設計風格與情境工作流程"
    track: true
    status: active
standards: []
evals: none
---

# taste 上游帳本

## File map

| 衍生檔 | 上游 | absorption | 轉換說明 |
|---|---|---|---|
| SKILL.md | — | — | 本地自寫 progressive-disclosure 入口、11 列路由及 OS 分工 |
| references/brandkit.md | skill:taste:skills/brandkit/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/brutalist-skill.md | skill:taste:skills/brutalist-skill/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/gpt-tasteskill.md | skill:taste:skills/gpt-tasteskill/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/image-to-code-skill.md | skill:taste:skills/image-to-code-skill/SKILL.md | verbatim | 上游內容保留；彎引號改直引號、檔尾多 </content> |
| references/imagegen-frontend-mobile.md | skill:taste:skills/imagegen-frontend-mobile/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/imagegen-frontend-web.md | skill:taste:skills/imagegen-frontend-web/SKILL.md | verbatim | 上游全文原樣（忽略 CRLF/LF） |
| references/minimalist-skill.md | skill:taste:skills/minimalist-skill/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/redesign-skill.md | skill:taste:skills/redesign-skill/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/soft-skill.md | skill:taste:skills/soft-skill/SKILL.md | verbatim | 上游內容保留；檔尾多 </content> |
| references/stitch-skill.md | skill:taste:skills/stitch-skill/SKILL.md | verbatim | 上游全文原樣（忽略 CRLF/LF） |
| references/taste-skill.md | skill:taste:skills/taste-skill/SKILL.md | verbatim | 上游全文原樣（忽略 CRLF/LF） |

## Local customizations

- SKILL.md：本地自寫路由入口，按需載入 11 個 references；圖像生成與 Codex workflow 註明平台／轉派限制；dashboard、dataviz、drawio、output enforcement 指向獨立技能。
- references/：各上游獨立 skill 改存平面檔；brandkit/brutalist-skill/gpt-tasteskill/image-to-code-skill/imagegen-frontend-mobile/minimalist-skill/redesign-skill/soft-skill 8 檔多尾端 </content>；image-to-code-skill 的彎引號改直引號。
- references/taste-skill.md、imagegen-frontend-web.md、stitch-skill.md 與 pinned 上游原文相同（行尾差異不計）。
- 主體內容測試：刪掉 11 份上游協議，SKILL.md 只餘分派與範圍，無法提供承諾的設計規則／工作流程；故本地自寫入口不等於 original，判 modded。

## Exclusions

- skills/output-skill/SKILL.md：非設計內容，已拆成 full-output-enforcement。
- skills/taste-skill-v1/SKILL.md：dashboard 知識已轉寫至 dashboard-taste，本 skill 只保留 v2。
- skills/stitch-skill/DESIGN.md：未收，原因待查。
- skills/llms.txt：未收，原因待查。

## Evals

無（backfill 時尚未建立）

## Refresh log

| 日期 | 上游 | reviewed 舊→新 sha7 | absorbed 舊→新 sha7 | 每個對映檔的結論 |
|---|---|---|---|---|
| 2026-04-29 | 全部 | — | — | backfill 建帳（adopt），lineage 依內容測試判定 |
