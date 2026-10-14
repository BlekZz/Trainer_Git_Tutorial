# 教學內容優化 [BLOCKED: 等 Blake 裁定 Plan_curriculum_restructure §6 A–D]
- updated: 2026-10-14 (claude)
- base: 8d9b94b
<!-- 查核: 2026-10-14 -->
- 停點: 全站 Ch0–Ch8＋ErrorRoom 重新審視完成，產出課綱重排計畫（先單機→再上雲→協作選修、作業改為只在學員自己 repo 的「我的 Git 日誌」、比喻統一）。
- 下一步: Blake 裁定 §6（作業方案／主比喻／是否刪 Node／繳交管道）→ 改名 Sprint_ → 從 M0（裝 tutor 套組、修 CLAUDE.md 失效路徑）開工。
- 切入: dev/Plan_curriculum_restructure.md, src/App.jsx（tabs）, src/components/Chapter8Practice.jsx
- 事實: 全站無任何步驟叫學員 clone BlekZz/Trainer_Git_Tutorial，但 Ch8 預設學員已在該資料夾內（fact: `rg "BlekZz|git clone" src/` 僅命中 Chapter8Practice.jsx 與虛構 cool-project；Chapter8Practice.jsx:537 quiz 敘述「你在 Ch.4 已經 clone 過原 repo」不成立）。
- 事實: CLAUDE.md 引用的 `~/.claude/coldbench/skills/tutorial-design/SKILL.md` 不存在，已改名為 `coldbench/skills/tutor-sop`（fact: `wc` No such file；tutor-sop/SKILL.md:20「前身為 tutorial-design skill」）。
- 待裁: Plan_curriculum_restructure.md §6 A–D。
