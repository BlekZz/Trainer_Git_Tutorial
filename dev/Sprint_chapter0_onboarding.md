# Sprint_chapter0_onboarding — Chapter 0 行前準備 + 入口收斂 + SSH 走錯路防護

> 建立日期：2026-07-15。動機：學員回饋（舊 Mac 安裝卡關、merge 時撞 SSH `Permission denied (publickey)`、不易判斷問題方向）。
> 決策背景：SSH 問題確認**非教材/repo 設定問題**（教材全 HTTPS + Fork/PR），源頭是學員端 remote URL 選擇。SSH **不進正課**，只做「走錯方向偵測 + 逃生」。
> 相關：[[Sprint_tutorial_optimization]]（P0-P3 既有坑位管理）。

## 0. 設計決策（實作 agent 必讀）

| 決策 | 內容 |
|---|---|
| D1 | 新章節 tab id 固定為 `setup`，label `0. 行前準備`，shortLabel `準備`，插在 `tabs` 陣列最前（成為預設首頁）。既有章節 label 編號不動。 |
| D2 | 學習唯一官方入口 = GitHub Pages（https://blekzz.github.io/Trainer_Git_Tutorial/）。git clone + 本地執行降級為「貢獻者/教學者專區」，不再是學員路徑。 |
| D3 | AI 求助引導 **preset = 截圖**：學員印出規格後直接截圖給 AI（新手不會判斷哪些資訊重要，整個視窗最安全）。**alternative = 複製文字**，但必須教安全複製方式（見 D4）。 |
| D4 | 提示詞**不留空格**，採「以下是／以下附上…」句式，方便人類一次複製整段再自行貼截圖或文字。複製 terminal 文字的引導：Windows = 滑鼠選取 → 右鍵（或 Enter）複製，**明確警告不要按 Ctrl+C 以外的組合鍵、不確定就用滑鼠右鍵**；Mac = 選取後 ⌘C 安全。 |
| D5 | SSH 防護兩層：(a) Chapter 0 安裝流程內置「走錯方向警示」——全教程不需要 SSH，看到 `ssh-keygen`、`SSH key`、`git@github.com:` 開頭網址 = 走錯路；(b) ErrorRoom 新增 `Permission denied (publickey)` 卡，解法 = `git remote -v` 檢查 → `git remote set-url origin https://...` 切回 HTTPS。 |
| D6 | 長內容抗疲倦：Chapter 0 必須用分步 stepper（沿用 Chapter3PathA.jsx:257 的步驟卡三態樣式），每步有明確完成動作，內部進度顯示「已完成 X / N」，關鍵節點給成就感提示（`<Callout variant="success">` + 例句「🎉 你已經完成一半了，加油！」）。禁止單頁長瀑布。 |
| D7 | `Beginner-Setup-Guide.md` 不刪除（站內外有絕對 blob 連結），改為 stub：一句話說明已併入網頁 Chapter 0 + Pages 連結。 |
| D8 | README 收斂為「專案說明」：這是什麼、給誰、Pages 大連結、技術棧、貢獻者/教學者開發區、License。移除與網頁重複的教學內容（章節表、環境需求、學員 FAQ）。 |

## M1 — Chapter0Setup.jsx 新章節 + App.jsx 整合

範圍：新檔 `src/components/Chapter0Setup.jsx`；修改 `src/App.jsx`（僅 import / tabs / render 三處 + lucide icon import）。

內容大綱（內部 stepper，7 步）：
1. **判別你的電腦**：Windows / Mac 二選一大按鈕（輔助判別：鍵盤左下 ⌘ vs Ctrl），選擇後全章後續指令依 OS 分流。
2. **印出你的電腦規格**：CommandBlock 給指令（Mac：`sw_vers && uname -m`；Windows：`systeminfo | findstr /C:"OS"`），說明輸出代表什麼（macOS 版本 / Intel vs Apple Silicon / Windows 版本）。
3. **請 AI 當你的安裝助手**（本 sprint 核心）：
   - Preset：教學員把整個 terminal 視窗**截圖**（Mac `⌘+Shift+4`、Windows `Win+Shift+S`），搭配一段可整段複製的提示詞（CommandBlock 複製鈕），提示詞句式含「以下附上我電腦資訊的截圖」，要求 AI：逐步引導、系統太舊就直接給舊版本與下載連結、每步等回報再繼續。
   - Alternative（折疊區塊）：文字版提示詞（「以下是我的電腦資訊：」句式）+ 安全複製教學（D4）。
   - **走錯方向警示（D5a）**：danger Callout——「本教程從頭到尾不需要 SSH。如果 AI 或網路教學叫你跑 `ssh-keygen`、設定 SSH key、或給你 `git@github.com:` 開頭的網址——停下來，那是另一條路，我們全程用 HTTPS。」
4. **註冊 GitHub 帳號**（自 Beginner-Setup-Guide 步驟一濃縮）。
5. **安裝四樣工具**：VSCode（+Git Graph 外掛）、Node.js LTS、Git、GitHub CLI，OS 分流；裝不動 → 回步驟 3 找 AI。含「剛裝完必須重開終端機」🛑 警語。
6. **驗收與連線**：`git -v` / `node -v`（v20+）/ `gh --version` 三關 + `gh auth login`（瀏覽器流程）+ `gh auth status`；一次性設定 `pull.rebase false`、`init.defaultBranch main`。
7. **完成 Checklist**：互動勾選清單（每項含如何驗證），全勾 → 🎉 成就 Callout + 導向 Chapter 1。

QA（M1）：
- [ ] `npm run build` 通過，`npm run dev` 首頁預設落在 Chapter 0。
- [ ] tabs 進度條分母自動含 setup；造訪 Chapter 0 後 tab 出現綠勾。
- [ ] OS 選擇後，步驟 2/5/6 的指令與截圖快捷鍵確實依 OS 切換。
- [ ] 兩段 AI 提示詞可一鍵複製、無留白佔位符、句式為「以下是／以下附上…」。
- [ ] 走錯方向警示（SSH）存在且為 danger 樣式。
- [ ] stepper 三態樣式與 Chapter3PathA 一致；至少 2 處成就感提示；內部進度「X / 7」正確。
- [ ] 上一章/下一章按鈕在 Chapter 0 ↔ Chapter 1 間導覽正常（label regex `^\d+\.\s*` 對「0. 行前準備」有效）。

## M2 — ErrorRoom 新錯誤卡

範圍：僅 `src/components/ErrorRoom.jsx`。

新增卡片：
1. **`Permission denied (publickey)`**（D5b）：白話 =「你的電腦在用 SSH 方式連 GitHub，但本教程全程用 HTTPS——你走到別條路上了」；解法 = `git remote -v` 看網址開頭，若是 `git@github.com:` → `git remote set-url origin https://github.com/<你的帳號>/Trainer_Git_Tutorial.git` → 重試。並註明「什麼時候會誤入：複製到 GitHub Code 按鈕的 SSH 分頁、照抄別人畫面、網路教學」。
2. **安裝期錯誤補洞**（Chapter 0 主題延伸）：`node -v` 版本過舊（<20）→ 回 Chapter 0 步驟 3 找 AI 要 LTS 舊機安裝法；`npm install` 網路/權限失敗速查（僅教學者本地執行情境，一張卡即可）。

QA（M2）：
- [ ] 新卡沿用 `ErrorCard` 既有 props 結構與樣式。
- [ ] SSH 卡包含「這代表你走錯方向」的定性說明 + `git remote -v` 診斷 + set-url 逃生指令（CommandBlock 可複製）。
- [ ] 既有 11 張卡未被更動。

## M3 — README 收斂 + Beginner-Setup-Guide stub 化

範圍：`README.md`、`Beginner-Setup-Guide.md`。

- README 依 D8 重寫：專案是什麼／Pages 入口（醒目）／技術棧／「貢獻者・教學者專區」（clone、npm、重置、branch 說明、維護紀錄保留）／License。刪除：八大章節表、學員版環境需求、學員 FAQ、路徑一/二分流、所有指向 Beginner-Setup-Guide 的學習導引。
- Beginner-Setup-Guide.md 依 D7 改為 stub（≤15 行）。

QA（M3）：
- [ ] README 不再含任何「學員請看／新手請往」教學導引；學習入口只剩 Pages 連結。
- [ ] `grep -n "Beginner-Setup-Guide" README.md` 為 0 筆（stub 檔本身除外）。
- [ ] 教學者重置、維護紀錄等營運資訊仍在。

## M4 — 章節內引用改指 Chapter 0 + 即時走錯方向提醒

範圍：`Chapter1Concept.jsx`、`Chapter3PathA.jsx`、`Chapter6Sync.jsx`、`Chapter7Team.jsx`、`Chapter8Practice.jsx`（不動 App.jsx / ErrorRoom / Chapter0Setup）。

- 所有「見 Beginner-Setup-Guide／安裝指南」的文字與 blob 外連改為站內導引「見 Chapter 0 行前準備」（hash `#setup`；已知位置：Chapter1Concept.jsx:153-164、Chapter3PathA.jsx:213-223, 476、Chapter6Sync.jsx:112, 141、Chapter7Team.jsx:125、Chapter8Practice.jsx:52-54）。
- 即時提醒（D5a 延伸）：在 Chapter6（push 前置）與 Chapter8（set-url / pr create 段落）各加一句 warning：「若出現 `Permission denied (publickey)` → 你在用 SSH，去錯誤急診室查這一條」。

QA（M4）：
- [ ] `grep -rn "Beginner-Setup-Guide" src/` 為 0 筆。
- [ ] 站內導引用 hash 導覽（`#setup`）而非外部 blob 連結。
- [ ] Chapter6、Chapter8 各至少一處 publickey 即時提醒，指向錯誤急診室。
- [ ] 未改動各章教學邏輯與模擬流程本體。

## 最終驗收 Checklist（fresh-context agent 執行，驅動真實入口）

- [ ] `npm run build` 成功；`npm run dev` 起站後以瀏覽器（或 build 產物 grep）驗證：預設首頁為 Chapter 0、tab 列含「0. 行前準備」。
- [ ] Chapter 0 全流程走查：OS 二選一 → 指令分流 → 截圖 preset 提示詞可複製 → alternative 折疊存在 → SSH danger 警示 → checklist 全勾出現成就提示。
- [ ] ErrorRoom 含 publickey 卡且逃生指令正確（HTTPS URL 為 `https://github.com/<帳號>/Trainer_Git_Tutorial.git` 形式）。
- [ ] 全 repo `grep -rn "Beginner-Setup-Guide" src/ README.md` = 0；stub 檔存在且指向 Pages。
- [ ] 進度條、上一章/下一章、綠勾在含 Chapter 0 的新章節數下行為正確。
- [ ] 無殘留死鏈（相對連結、blob 絕對連結）。

## 進度

| Milestone | 狀態 |
|---|---|
| M1 Chapter0Setup + App.jsx | ✅ 2026-07-15（QA 全過：7 步 stepper、OS 分流、雙提示詞、SSH danger 警示、3 處成就提示、build 通過；PromptBlock 為合理偏離——CommandBlock 的 `$` 前綴不適合 AI 提示詞） |
| M2 ErrorRoom 新卡 | ✅ 2026-07-15（QA 全過：publickey 卡 + node 版本卡 + npm install 卡，既有 11 卡零改動，build 通過） |
| M3 README / Guide 收斂 | ✅ 2026-07-15（QA 全過：README 零 Guide 引用、營運資訊保留、stub 9 行） |
| M4 章節引用 + 即時提醒 | ✅ 2026-07-15（QA 全過：src/ 零 Guide 引用、hash `#setup` 站內導引、Ch6/Ch8 publickey 提醒、build 通過） |
| 最終驗收 | ✅ 2026-07-15（fresh-context agent 以 dev server + Playwright 實走，Checklist 6/6 全過、console 零錯誤；驗收後補修 ErrorRoom.jsx:116 懸空「安裝指南」引用 → `#setup` 連結，rebuild 通過） |

### 驗收遺留觀察（非阻斷，下輪可做）
- Chapter 0 內部 stepper/checklist 狀態未持久化（切走再回來會重置）——可考慮存 localStorage。
- Chapter7Team.jsx:125 的 CommandBlock comment 為純文字，無法帶 `#setup` 連結（元件限制，可接受）。
- Browserslist caniuse-lite 資料 7 個月舊（僅 build 警告）。
