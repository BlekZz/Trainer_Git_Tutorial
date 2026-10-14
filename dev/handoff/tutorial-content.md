# 教學內容優化 [ACTIVE]
- updated: 2026-10-14 (claude)
- base: 4ceded9
<!-- 查核: 2026-10-14 -->
- 停點: Sprint_curriculum_restructure 已開工，Blake 指示「token 不夠，先做效益比高的」→ 已完成快修：T5 事實錯誤（Ch7:175、Ch8:79 push 非強制；Ch4 restore --staged；Ch1 Merge 說法；Ch6 模擬 push rejected／pull 改真機原文；Ch8:537 quiz）、T6 ErrorRoom 拆指令、T8 CLAUDE.md 路徑（9012db9、ae4589b）。M0 的 /init-tutorial 安裝與 CLAUDE.md 規範摘要尚未做。
- 下一步: T7 已完成（4ceded9：Ch0 移除 Node、驗收兩關、ErrorRoom 刪 node/npm 卡；GitHub 註冊／gh auth 移 L6 尚未做，屬 M1/M3）→ M4 前提實測（@mention 三項，用 blakelee0918 開 PR 測）→ M1 骨架。大重排（M2/M3）token 成本最高，放後面。
- 切入: dev/Sprint_curriculum_restructure.md（§1.3 T1–T8、§5 節點）, src/components/Chapter0Setup.jsx, src/App.jsx
- 事實: 全站無任何步驟叫學員 clone BlekZz/Trainer_Git_Tutorial，但 Ch8 預設學員已在該資料夾內（fact: `rg "BlekZz|git clone" src/` 僅命中 Chapter8Practice.jsx 與虛構 cool-project）；quiz 敘述已於 9012db9 改為一般情境。
- 事實: 「@mention 會通知非 collaborator、非 collaborator 可 Approve、`mentions:BlekZz` 搜得到」三項為 inference 未實測，Sprint M4 第一件事驗證（Sprint §3.1）。
- 事實: 測試帳號 blakelee0918 = claude-in-chrome deviceId 73ebd58f…；BlekZz = a0a7e3e1…（Sprint「開工前置」）。
