# 教學內容優化 [ACTIVE]
- updated: 2026-10-14 (claude)
- base: b2af976
<!-- 查核: 2026-10-14 -->
- 停點: Sprint_curriculum_restructure 已開工，Blake 指示「token 不夠，先做效益比高的」→ 已完成快修：T5 事實錯誤（Ch7:175、Ch8:79 push 非強制；Ch4 restore --staged；Ch1 Merge 說法；Ch6 模擬 push rejected／pull 改真機原文；Ch8:537 quiz）、T6 ErrorRoom 拆指令、T8 CLAUDE.md 路徑（9012db9、ae4589b）。M0 的 /init-tutorial 安裝與 CLAUDE.md 規範摘要尚未做。
- 下一步: M3 完成（見 Sprint M3 註記）。下一步 M4 作業頁（Homework.jsx：任務清單＋PR 描述範本引用 src/config.js＋自我檢核＋被 Request changes 怎麼辦）與 README 教學者專區；QA 要測試帳號完整做一次作業含一次 Request changes 來回。本機 gh 已同時登入 BlekZz（active）與 blakelee0918，測試帳號操作一律 per-command token，不切 active。
- 切入: dev/Sprint_curriculum_restructure.md（§3.1 作業、§5 M4、§8.1）, src/components/Homework.jsx, dev/script/real-outputs-part2.sh
- 事實: 全站無任何步驟叫學員 clone BlekZz/Trainer_Git_Tutorial，但 Ch8 預設學員已在該資料夾內（fact: `rg "BlekZz|git clone" src/` 僅命中 Chapter8Practice.jsx 與虛構 cool-project）；quiz 敘述已於 9012db9 改為一般情境。
- 事實: @mention 交件三前提 2026-10-14 實測全成立（fact: Sprint §8.1 訊號；fixture blakelee0918/mention-test PR #1 保留未 merge 供截圖）。本機 gh token 讀不到 notifications（回 0 筆），收件匣用搜尋。
- 事實: 測試帳號 blakelee0918 = claude-in-chrome deviceId 73ebd58f…；BlekZz = a0a7e3e1…（Sprint「開工前置」）。本機 gh 2.67 兩帳號皆登入、active=BlekZz、git_protocol=ssh（fact: 2026-10-14 `gh auth status`）；測試帳號 fixture repo：mention-test（PR #1 未 merge）、git-journal-rec。
