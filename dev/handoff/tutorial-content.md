# 教學內容優化 [ACTIVE]
- updated: 2026-10-14 (claude)
- base: aafb12d
<!-- 查核: 2026-10-14 -->
- 停點: Sprint_curriculum_restructure 已開工，Blake 指示「token 不夠，先做效益比高的」→ 已完成快修：T5 事實錯誤（Ch7:175、Ch8:79 push 非強制；Ch4 restore --staged；Ch1 Merge 說法；Ch6 模擬 push rejected／pull 改真機原文；Ch8:537 quiz）、T6 ErrorRoom 拆指令、T8 CLAUDE.md 路徑（9012db9、ae4589b）。M0 的 /init-tutorial 安裝與 CLAUDE.md 規範摘要尚未做。
- 下一步: M1 完成（aafb12d，驗收見 Sprint M1 註記）。下一步 M2 Part 1 單機改寫 L1–L5（L5 本機衝突真機練習要新寫；L3／L4／L5 目前有「本章撰寫中」佔位）。舊文案的章節順序暗示（如「Ch.4」「情境 A」）在搬移時刻意保留未改，M2/M3 改寫時處理。
- 切入: dev/Sprint_curriculum_restructure.md（§2 新課綱、§5 M2）, src/components/Lesson*.jsx, src/App.jsx
- 事實: 全站無任何步驟叫學員 clone BlekZz/Trainer_Git_Tutorial，但 Ch8 預設學員已在該資料夾內（fact: `rg "BlekZz|git clone" src/` 僅命中 Chapter8Practice.jsx 與虛構 cool-project）；quiz 敘述已於 9012db9 改為一般情境。
- 事實: @mention 交件三前提 2026-10-14 實測全成立（fact: Sprint §8.1 訊號；fixture blakelee0918/mention-test PR #1 保留未 merge 供截圖）。本機 gh token 讀不到 notifications（回 0 筆），收件匣用搜尋。
- 事實: 測試帳號 blakelee0918 = claude-in-chrome deviceId 73ebd58f…；BlekZz = a0a7e3e1…（Sprint「開工前置」）。
