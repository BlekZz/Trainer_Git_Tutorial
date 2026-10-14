# 教學內容優化 [BLOCKED: 等 Blake 指示 Sprint_curriculum_restructure 開工時間]
- updated: 2026-10-14 (claude)
- base: 11e5cde
<!-- 查核: 2026-10-14 -->
- 停點: Sprint_curriculum_restructure 已寫定（§6 A–D 全數裁定：自有 repo 作業「我的 Git 日誌」、相簿比喻、刪 Node＋登入移 L6、交件＝PR 內 @BlekZz 請 review），尚未動 src/。
- 下一步: Blake 指示開工後 → 先確認「開工前置」（學員測試帳號、兩個 Chrome profile）→ M0。未指示前不得改 src/。
- 切入: dev/Sprint_curriculum_restructure.md（§3.0 固定資訊、§5 節點、§7 截圖清單）, src/App.jsx, src/components/Chapter8Practice.jsx
- 事實: 全站無任何步驟叫學員 clone BlekZz/Trainer_Git_Tutorial，但 Ch8 預設學員已在該資料夾內（fact: `rg "BlekZz|git clone" src/` 僅命中 Chapter8Practice.jsx 與虛構 cool-project；Chapter8Practice.jsx:537 quiz 敘述「你在 Ch.4 已經 clone 過原 repo」不成立）。
- 事實: CLAUDE.md 引用的 `~/.claude/coldbench/skills/tutorial-design/SKILL.md` 不存在，已改名為 `coldbench/skills/tutor-sop`（fact: tutor-sop/SKILL.md:20「前身為 tutorial-design skill」）。
- 事實: 「@mention 會通知非 collaborator、非 collaborator 可 Approve、`mentions:BlekZz` 搜得到」三項為 inference 未實測，Sprint M4 第一件事驗證（Sprint §3.1）。
