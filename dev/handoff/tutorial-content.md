# 教學內容優化 [BLOCKED: M5 等 Claude 用量恢復＋Blake 縮窗與自拍 2 張 VSCode]
- updated: 2026-10-14 (claude)
- base: 7e3b82e
<!-- 查核: 2026-10-14 -->
- 停點: Sprint_curriculum_restructure M1–M4、M6 完成並 push（7e3b82e）：新課綱骨架 L0–L8／作業／E1–E3、Part 1–2 依實跑輸出改寫、作業頁＋README 教學者專區、全站說人話。M5 截圖開工即撞用量上限而暫停（已備 dev/script/shot.py）。M7 未開始；網站尚未 `npm run deploy`，線上仍是舊版。
- 下一步: 確認 Blake 已把測試帳號 Chrome 視窗縮到 ~1280–1440 寬（原 3440×1249）→ 測試帳號建空 `git-journal` repo，走 L6–L8 網頁流程邊截（~10 張）→ BlekZz 截收件匣與 Review（mention-test PR #1 可用）→ 截圖時對照實際按鈕文字回填教材 → shot.py 輸出到 public/screenshots/。之後 M7 部署（需 Blake 同意）＋零基礎同事實測（含 PowerShell 走 L2–L5）。
- 切入: dev/Sprint_curriculum_restructure.md（§5 M5–M7 註記、§7.2 截圖清單）, dev/script/shot.py, src/components/Shared.jsx（Screenshot 元件）
- 事實: @mention 交件、非 collaborator Approve／Request changes、`mentions:` 搜尋皆實測成立；Approve 只在 PR 時間線、頁頂無徽章（fact: Sprint §8.1、§8.2；dev/script/homework-e2e.sh 2026-10-14 實跑 exit 0）。本機 gh token 讀 notifications 回 0 筆，收件匣用搜尋。
- 事實: 測試帳號 blakelee0918 = claude-in-chrome deviceId 73ebd58f…；BlekZz = a0a7e3e1…（擴充顯示名 Browser 1／2 會互換，以 deviceId 為準）。本機 gh 2.67 兩帳號皆登入、active=BlekZz、git_protocol=ssh（fact: 2026-10-14 `gh auth status`）；測試帳號操作一律 per-command `GH_TOKEN`，不切 active。
- 事實: 測試帳號 fixture repo：mention-test（PR #1 open 未 merge）、git-journal-rec（Part 2 錄製用）、git-homework（作業全流程，PR #1 merged）——M5 截圖用，M5 後再問 Blake 是否刪。
- 待裁: M6 未另派獨立「零基礎讀者」角色閱讀（由 codex 自身子稽核代替）——要不要補，由 Blake 決定。
