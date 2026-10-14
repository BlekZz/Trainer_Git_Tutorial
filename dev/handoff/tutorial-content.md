# 教學內容優化 [ACTIVE]
- updated: 2026-10-14 (claude)
- base: a98fa25
<!-- 查核: 2026-10-14 -->
- 停點: Sprint_curriculum_restructure 已開工，Blake 指示「token 不夠，先做效益比高的」→ 已完成快修：T5 事實錯誤（Ch7:175、Ch8:79 push 非強制；Ch4 restore --staged；Ch1 Merge 說法；Ch6 模擬 push rejected／pull 改真機原文；Ch8:537 quiz）、T6 ErrorRoom 拆指令、T8 CLAUDE.md 路徑（9012db9、ae4589b）。M0 的 /init-tutorial 安裝與 CLAUDE.md 規範摘要尚未做。
- 下一步: M4 完成，主線 L0–L8＋作業全部到位（見 Sprint M1–M4 註記）。剩 M5 截圖（§7.2 共 18 張，需 claude-in-chrome 兩個 profile；fixture repo 已備：blakelee0918/mention-test、git-journal-rec、git-homework）、M6 說人話全站掃（E1–E3、L0、ErrorRoom 尚未改寫；舊比喻詞 rg 檢查）、M7 部署（`npm run deploy` 需 Blake 同意）＋零基礎同事實測（含 PowerShell 走一次 L2–L5）。
- 切入: dev/Sprint_curriculum_restructure.md（§5 M5–M7、§7）, src/components/Shared.jsx（Screenshot）, dev/script/
- 事實: 全站無任何步驟叫學員 clone BlekZz/Trainer_Git_Tutorial，但 Ch8 預設學員已在該資料夾內（fact: `rg "BlekZz|git clone" src/` 僅命中 Chapter8Practice.jsx 與虛構 cool-project）；quiz 敘述已於 9012db9 改為一般情境。
- 事實: @mention 交件三前提 2026-10-14 實測全成立（fact: Sprint §8.1 訊號；fixture blakelee0918/mention-test PR #1 保留未 merge 供截圖）。本機 gh token 讀不到 notifications（回 0 筆），收件匣用搜尋。
- 事實: 測試帳號 blakelee0918 = claude-in-chrome deviceId 73ebd58f…；BlekZz = a0a7e3e1…（Sprint「開工前置」）。本機 gh 2.67 兩帳號皆登入、active=BlekZz、git_protocol=ssh（fact: 2026-10-14 `gh auth status`）；測試帳號 fixture repo：mention-test（PR #1 未 merge）、git-journal-rec。
