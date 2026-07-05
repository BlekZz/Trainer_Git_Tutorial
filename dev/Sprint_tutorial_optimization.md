# Plan_tutorial_optimization — Git 時光機教學全盤優化計畫

> 版本：v1.0（2026-07-05）
> 基準：main @ fab31aa
> 分析方式：三路平行深度走查 —— ① 教學內容與教學法、② 視覺設計與佈局、③ 零基礎學員旅程走查（模擬「不懂 Git、不會 terminal、沒裝過 VS Code」的人從第一章走到第八章）
> 目標受眾：完全不懂 Git、也不會 terminal 的初學者（行銷、設計、非工程背景新人）

---

## 0. 診斷摘要

**整體評價：中上水準的教材，結構骨架正確，兩份既有 improvement spec 幾乎全數落地（16.5 / 17 項）。** 章節順序（觀念 → 情境判斷 → 單人 → 多人 → 實戰）、遊戲存檔比喻系統、Chapter 8 的可驗證實戰設計，都是同類教材少見的優點。

但站在零基礎極限視角，仍存在 **7 個「會讓學員直接放棄」的斷點**，其中 3 個是教材內容本身有誤（照做必撞牆），1 個是壞掉的功能（核心 SVG 圖根本沒渲染）。這些問題的共同特徵是：**成本極低（多數是幾行字），但殺傷力極高**。

三路分析交叉印證出的四大主題：

| 主題 | 核心問題 |
|---|---|
| A. 致命斷點 | 線上版路徑斷頭、Vim 陷阱、divergent pull fatal、Mac 安裝死胡同等 —— 零基礎者卡死即放棄 |
| B. 模擬與真實的落差 | 模擬終端輸出與真實 Git 行為不符；Ch3 有模擬無真機收尾；「這要打在哪裡」全站未標示 |
| C. 進度感與導覽 | 無完成狀態、無進度條、無下一章按鈕、重新整理回到第一章 |
| D. 視覺語意系統 | 提示框 5 套皮膚、「整頁都是重點」、危險警告字級最小、行動端多處爆版 |

---

## 1. 應保留的優點（優化時不可破壞）

1. **情境 A/B 決策樹先行**（Ch2）：先教「判斷自己在哪個情境」再教指令。
2. **黑話字典 + 遊戲存檔/平行宇宙比喻系統**，貫穿 Ch5–Ch8。
3. **每章「⚡ 進入狀態」banner**：前置條件 + 常見坑 + 心理預期（advance organizer）。
4. **Ch8 可驗證實戰**：每步 ✅ 成功長相 + ❌ 補救、起始四項檢核、PR 三種結局的心理建設（「被 Close 的 PR 每個大神都有」）。
5. **403 的誠實坑位管理**：Ch4 預告 → Ch8 用 Fork 解決 + 三格對照表。
6. **npm 輸出解讀表、Git Status 紅綠對照表、緊急逃生包**（git restore）。
7. **Ch6 可自由輸入的模擬終端 + 「模擬同事先 Push」惡作劇按鈕**：低壓力的安全失敗預演。
8. **Ch3/4 步驟卡狀態機**（目前步驟高亮、完成變綠、未到灰化）：視覺防呆。
9. **Ch8 四軌道 SVG**（原 repo / Fork / 本地 main / 本地分支）：全站最佳圖解。
10. **雙受眾動機文案**（文組生 / 數據分析新手）與 Python 版 .gitignore。

---

## 2. P0 — 致命斷點（會直接放棄 / 教材錯誤 / 壞掉的功能）

> 共同特徵：修復成本低、不修必出事。建議一個 commit 波次內全部處理。

### P0-1 線上版學習路徑到 Ch8 斷頭【結構性斷層】
- **位置**：`README.md`（主推線上版）、`Beginner-Setup-Guide.md`（全文未提線上版）、`Chapter8Practice.jsx` 起始確認（要求 `pwd` 看到 clone 下來的資料夾）
- **問題**：從線上版一路學到 Ch8 的學員根本沒裝 Git、沒 clone 過，起始確認四步全數失敗，且無任何分流指引。
- **改法**：
  1. Ch8 開頭加醒目分流框：「你是用線上版學到這裡的嗎？→ 請先完成 [安裝指南] 全部步驟（約 30–60 分鐘）再繼續本章。」
  2. Setup Guide 開頭加「兩條路徑」說明：只看 Ch1–7 可用線上版；要做 Ch8 實戰才需要本機安裝。

### P0-2 Vim 陷阱：Ch6 教裸 `git commit`【教材主動誘發】
- **位置**：`Chapter6Sync.jsx` 衝突解決第 5 步（約 L389）：「執行 `git commit`（不需要加 -m）」
- **問題**：Git for Windows「一直按 Next」的預設編輯器是 Vim。照做的學員會被關進 Vim，任何按鍵都不對、Ctrl+C 出不去。`git pull` 產生 merge commit 時也會觸發同一陷阱。
- **改法**（建議 a + b 都做）：
  - (a) 改教 `git commit -m "解決衝突"`；
  - (b) 加救命卡：「如果畫面變成一堆 `~` 符號的奇怪編輯器：按 `Esc`，輸入 `:wq`，按 Enter。」
  - (c) 選配：Setup Guide 補 `git config --global core.editor "code --wait"`。

### P0-3 現代 Git 的 divergent-branch `git pull` 會直接 fatal【模擬與真實落差之最】
- **位置**：`Chapter6Sync.jsx` doPull 模擬（約 L74–85，直接顯示成功）
- **問題**：Git 2.33.1+ 未設定 `pull.rebase` 時，分歧情境下 `git pull` 回傳 `fatal: Need to specify how to reconcile divergent branches` —— 而 Ch6 教的正是這個情境。學員照教材做必撞、教材給不了解釋。
- **改法**：Setup Guide 的設定段補 `git config --global pull.rebase false`；Ch6 加一張該錯誤訊息的解讀卡。

### P0-4 裝完軟體沒教「重開終端機」→ `'git' is not recognized`【安裝後最高頻死局】
- **位置**：`Beginner-Setup-Guide.md` 步驟三 → 步驟四交界（約 L96–131）
- **問題**：學員開著終端機去裝 Git/Node，回來驗證必得 `not recognized` / `command not found`（PATH 只在新終端機生效），會誤判為安裝失敗 → 重裝 → 再失敗 → 放棄。
- **改法**：步驟四開頭加粗體警告「輸入指令前，先把 VSCode / 終端機完全關掉重開」；常見問題表加入這條錯誤訊息的對照。

### P0-5 Mac 用戶安裝 Git 是死胡同
- **位置**：`Beginner-Setup-Guide.md` 步驟二（約 L71–92）
- **問題**：(1) git-scm.com 的 macOS 頁面沒有直接安裝檔，只有 Homebrew / Xcode CLT 等英文選項，「一直按 Next」只對 Windows 成立；(2) VSCode 在 Mac 是 zip 解壓拖進 Applications，也沒有「下一步」。
- **改法**：Git / VSCode / Node / gh 四個安裝步驟全部 **Windows 與 Mac 完全分開寫**。Mac 的 Git 改教：打開終端機輸入 `git --version` → 跳出安裝視窗按「安裝」（Xcode CLT 觸發式安裝）。補「怎麼查你的 Mac 是 Intel 還是 M 系列」（ → 關於這台 Mac）。

### P0-6 Ch8 尾聲「merge 後 `git pull`」在 Fork 工作流下是錯的【教材內容錯誤】
- **位置**：`Chapter8Practice.jsx` Approve & Merge 卡片（約 L384）
- **問題**：Step 2 已把 origin set-url 到自己的 Fork；PR merge 進的是原 repo 的 main，此時 `git pull` 只會得到 `Already up to date`，與教材承諾矛盾。
- **改法**：改教「到你 Fork 的 GitHub 頁面按 **Sync fork → Update branch**，再 `git checkout main` + `git pull`」——一句話修好，不需引入 upstream 概念。

### P0-7 Ch6 衝突圖的分岔曲線根本沒有渲染【壞掉的功能】
- **位置**：`Chapter6Sync.jsx` 約 L343–349
- **問題**：`<path d="M 25% 50% Q ...">` —— SVG path 的 `d` 屬性不接受百分比單位，瀏覽器解析失敗、整條線不畫。結果 C0/C1/C2/Merge 四個節點孤零零漂浮，「分岔再收束」的核心敘事線完全消失。
- **改法**：改為帶 `viewBox` 的座標系（如 `viewBox="0 0 800 200"` + `preserveAspectRatio="none"`），節點一併納入同一座標系。**順手修 P2-V4 的 Ch5 同類問題。**

---

## 3. P1 — 嚴重挫折（高機率卡住，但有機會自救）

### 內容正確性

| # | 項目 | 位置 | 改法 |
|---|---|---|---|
| P1-1 | **模擬輸出與真實 Git 不符**：`git remote add`、`git add`、`git branch` 真實執行時**無任何輸出**，模擬卻顯示成功訊息，學員真機看到「什麼都沒有」會以為失敗 | `Chapter3PathA.jsx` L37、`Chapter4PathB.jsx` L60、`Chapter5Branch.jsx` L18 | 模擬輸出改為貼近真實（無輸出），加註「真實終端裡成功時不會顯示任何訊息——沒消息就是好消息，可用 `git status` / `git remote -v` 確認」 |
| P1-2 | **跨 Fork 的 `gh pr create` 會多問 base repository**，選錯 PR 就發到自己 Fork | `Chapter8Practice.jsx` L360–363 | 指令加 `--repo BlekZz/git-time-machine`，或補一句「它問 base repository 時，選 BlekZz/git-time-machine」 |
| P1-3 | **`Please tell me who you are` 零覆蓋**：跳過 Ch1 身份設定者第一次 commit 必中 | Ch1 / Ch8 | Ch8 起始確認加第五項 `git config user.name` 驗證；錯誤急診室（P2-S1）收錄此條 |
| P1-4 | **`git config --list` 會進 pager**（要按 q 才能離開），且沒說「這兩行在任何資料夾都能打」 | `Chapter1Concept.jsx` L216–224 | 驗證改用 `git config user.name`（只回一行）；加「在終端機任何位置輸入都可以」+「請打開你電腦的真實終端機（不是這個網頁）」 |
| P1-5 | **GitHub 註冊只有 3 行字**，實際有 email 驗證碼、英文拼圖驗證、註冊後問卷等 5+ 關卡 | `Beginner-Setup-Guide.md` 步驟一 | 補帶截圖的子步驟；明講「問卷可按 Skip」「帳號名會出現在網址裡」「email 之後 git config 要用同一個」 |
| P1-6 | **gh auth login 問答寫死順序**，版本更新後畫面不符會恐慌；瀏覽器沒自動開啟無備案 | `Beginner-Setup-Guide.md` 步驟四 | 加「順序可能略不同，原則：GitHub.com / HTTPS / Yes / Login with a web browser」+「瀏覽器沒開啟時手動複製網址」 |
| P1-7 | **簡體字與錯字**出現在高曝光的完成 Checklist：确認、执行、瀀/眀覽器、「單打歡呼」 | `Beginner-Setup-Guide.md` L268–300 | 全文校對一輪 |

### 教學閉環

| # | 項目 | 位置 | 改法 |
|---|---|---|---|
| P1-8 | **Ch3 有模擬無真機收尾**：進入狀態要求真的建了 GitHub 空 repo，但整章沒有「換你動手」區塊，學員握著真 repo 不知道拿它幹嘛。且開場假設「已寫好幾個 HTML 檔案」——受眾不會寫 HTML | `Chapter3PathA.jsx` | 章末加「🔥 換你了」實作區：`mkdir my-first-repo` → VSCode 開啟 → 建一個 `notes.md` 隨便寫一句話 → 四行指令逐行對照 → 驗證點「GitHub 網頁按 F5 看到你的檔案 = 成功」。VSCode 建檔教學直接複用 Ch8 L274–286 的寫法 |
| P1-9 | **「暫存區」從未正式教過**，Ch3 合併 add+commit、Ch4 突然拆開丟術語、Ch6 又合併 | Ch3/Ch4/Ch6 | Ch3 首次出現時加小圖解：「add = 把要拍照的東西擺上桌，commit = 按下快門」；三章拆分方式一致化 |
| P1-10 | **`git stash` 未教就用**（兩處一句話帶過，學員 stash 後不知道東西去哪、`stash pop` 從未出現） | `Chapter5Branch.jsx` L62、`Chapter8Practice.jsx` L86 | 補 30 秒小卡「stash = 掃進抽屜、`git stash pop` = 拿出來」，或 Ch8 改建議「先 commit 掉」 |
| P1-11 | **detached HEAD 零覆蓋**（新手第二常見恐慌現場） | Ch4 逃生包或 Ch5 | 加一格：「看到 `You are in detached HEAD state` → 別慌，輸入 `git checkout main` 就回家了」 |

### 介面互動

| # | 項目 | 位置 | 改法 |
|---|---|---|---|
| P1-12 | **全站無複製按鈕**，受眾手打長指令錯字率極高；也沒有任何地方說「`$` 不用打」 | 所有靜態指令區塊 | `Shared.jsx` 新增 `<CommandBlock>`：右上角複製鈕（點擊變勾勾 2 秒）、複製時自動去掉 `$`、含佔位符時提示「記得換成你的帳號」；Ch1 第一個指令旁一次性說明「開頭的 `$` 代表終端機指令，輸入時不用打」 |
| P1-13 | **靜態指令區塊沒標「這要打在哪裡」**，與 TerminalSim 模擬畫面難以分辨 | 各章 `bg-slate-900` 區塊 | `<CommandBlock>` 統一加迷你標頭「⌨ 在你的終端機輸入」；輸出示範用另一標頭「你會看到類似這樣的輸出」 |
| P1-14 | **TerminalSim 唯讀時仍顯示「輸入指令...」placeholder**，學員打字沒反應以為壞了；Ch6 可以打字卻沒被告知 | `Shared.jsx` L80–87 | 唯讀時隱藏輸入列或 placeholder 改「此終端機為自動示範（唯讀），請點上方按鈕」；Ch6 加一句「這個終端機可以真的打指令！試試 `git add .`」 |
| P1-15 | **Ch3/4 的終端機回饋在畫面外**：左欄點「執行」，log 出現在整個 grid 下方，桌機上看不到 | `Chapter3PathA.jsx` L216、`Chapter4PathB.jsx` L264 | TerminalSim 移進右欄視覺化區下方，讓「按鈕→輸出」同屏 |
| P1-16 | **push 認證彈窗 / 要密碼情境未覆蓋**（輸入 GitHub 網站密碼必定失敗，GitHub 已停用密碼驗證） | Ch8 Step 5 | 補小卡：跳出瀏覽器視窗 → 照著登入即可；被要密碼 → 回去跑 `gh auth login` |

---

## 4. P2 — 系統性改進（教學設計 / 視覺 / 互動）

### S. 結構與系統

**P2-S1 建立「🚑 錯誤訊息急診室」集中頁**（三路分析共同指向的最高價值新增功能）
零基礎者遇錯的行為是「複製錯誤訊息找對照」，不是「拿著原因找答案」。目前錯誤處理散落各章。建議做成 App 第九個 tab 或 README 附錄，格式：**英文錯誤原文 → 白話翻譯 → 一行解法**。首發收錄（依殺傷力排序）：

| 錯誤訊息 | 解法 |
|---|---|
| `'git' is not recognized` / `command not found` | 重開終端機（P0-4） |
| 畫面變成一堆 `~`（Vim） | Esc → `:wq` → Enter（P0-2） |
| `fatal: Need to specify how to reconcile divergent branches` | 見 P0-3 |
| `Please tell me who you are` | 跑 Ch1 的兩行 config（P1-3） |
| `fatal: not a git repository` | 你忘了 cd 到專案資料夾 |
| `You are in detached HEAD state` | `git checkout main`（P1-11） |
| `remote: Permission ... 403` | 見 Ch8 Fork 說明（已有，收錄入口） |
| push 時被要求密碼 | `gh auth login`（P1-16） |

**P2-S2 進度系統**（App.jsx）
- 章節底部加共用 `<ChapterNav prev/next>`（目前讀完一章要手動滾回頂部點 Tab；Ch2 結尾的跳動箭頭不能點，會誤導）
- Tab 加「已完成」勾勾（localStorage）+ Tab 下方細進度條（目前章節/8）
- `activeTab` 同步 URL hash：重新整理不再跳回第一章、老師可分享「第 5 章」連結
- 切換章節時 `window.scrollTo(0, 0)`

**P2-S3 比喻系統收斂**
- 全教材至少 8 套比喻，出現「比喻通膨」。保留：遊戲存檔/平行宇宙（主線）、Git=剪輯軟體/GitHub=YouTube（精準）。刪除或歸併：「登艦」「火車主幹道」等一次性比喻。
- **標題比喻「時光機」幾乎沒被用過**：在 Ch3 git log 與 Ch4 git restore 處明確接回「時光機 = 回到上一個存檔點」，讓標題落地。
- Ch8「push = 搶劫」情緒過強，改中性：「push 到自己家 = 放進自己倉庫；push 到別人家要用 PR『按門鈴請對方收貨』」。
- Ch1 黑話字典把 Merge 和 PR 綁同一格，與 Ch7 整章強調兩者層次不同矛盾 → 拆成兩格。

**P2-S4 Ch1 `.git` 警告區塊搬家**：內含 `git init`、Remote、Push、Tag（Tag 全教材唯一一次出現且從未解釋）等未教術語。移到 Ch3 `git init` 之後（學員剛親手產生 .git，情境完美），並刪掉 Tag。

### V. 視覺與佈局

**P2-V1 收斂提示框為單一 `<Callout>` 語意系統**
目前「💡 補充說明」至少 5 種皮膚（indigo 卡 / blue 條 / amber 條 / 白卡藍框 / 深色內嵌）。收斂為 `<Callout variant="info|tip|warning|danger|success">`，固定語意：blue=資訊、amber=注意、red=危險、green=成功；indigo/purple 只保留給「情境 A/B」身分識別。同時把「進入狀態 banner」「StepCard」也收進 `Shared.jsx`（目前大量重複樣式散在各章手刻，是不一致的根源；Ch8 的進入狀態甚至換了皮膚）。

**P2-V2 解決「整頁都是重點」——Ch1 降密度**
Ch1 從上到下全是彩色/漸層卡片，沒有一塊安靜的白底內文；開場三色漸層卡塞 8 條長 bullet 小白字，是全站視覺壓力最大的一塊，卻在第一屏。改法：正文白底無框、漸層卡限一章一張、開場卡降為 `bg-indigo-50`、每 TA 留 2 條最有力的 bullet（「不再需要傳最終最終版」「面試官看 GitHub 主頁」），其餘收進 `<details>`。

**P2-V3 字級與對比底線**
- 全站消滅 `text-[10px]` 以下字級。**最危險的警告目前字最小**：`git restore` 會讓程式碼永久消失的警告是 10px（`Chapter4PathB.jsx` L333–342）、「模擬合併為一步、實際兩步」關鍵註記是 10px —— 升級為 `<Callout variant="danger">` + 至少 text-sm。
- 正文性質小字最低 `text-slate-500`（slate-400 在白底對比僅 2.9:1，未達 WCAG AA）。

**P2-V4 SVG 修復（P0-7 之外的兩處）**
- `Chapter5Branch.jsx` L145–187：節點用百分比定位、曲線用固定像素，容器縮放即錯位 → 統一進 viewBox 座標系。
- `Chapter6Sync.jsx` L486–527 Merge/Rebase 歷史圖：絕對像素定位，窄螢幕被裁切 → `overflow-x-auto` + `min-w-[512px]`，或改 viewBox。
- Ch8 四軌道圖（品質最好）補「圖片可左右滑動」提示或右緣漸層遮罩。
- `Chapter5Branch.jsx` L264 SVG 小字 fontSize 11 → 13–14，`#64748b` → `#475569`。

**P2-V5 行動端修復**
- `Chapter6Sync.jsx` L212 `grid-cols-5` 無響應式前綴，375px 手機上全站核心互動直接擠爆 → `grid-cols-1 md:grid-cols-5`，手機改縱向堆疊（Local 上 / 狀態橋中 / Remote 下）。
- `Chapter8Practice.jsx` L16–20 三欄對照卡 → `grid-cols-1 sm:grid-cols-3`。
- 手機 Tab 目前退化成「Ch.1～Ch.8」語意全失 + flex-wrap 折行凌亂 → 橫向可滑動單行（`overflow-x-auto flex-nowrap shrink-0`）+ 短標題（「觀念」「流程」「情境A」…）。

**P2-V6 基礎設施**
- `index.html`：`lang="en"` → `lang="zh-Hant"`；title 改「Git 時光機實驗室 — 零基礎 Git 互動教學」。
- `tailwind.config.js` 補中文字型堆疊：`fontFamily.sans = ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif']`；正文加 `leading-7`。
- Tab 補 `role="tablist"/"tab"` + `aria-selected`；功能性 emoji（💻🔑📂）統一改 lucide 圖示 + `aria-hidden`。

**P2-V7 文字牆拆解**
- `Chapter4PathB.jsx` L85–108 開頭深色 banner 三大段（403 + cd + status）→ 只留三條一句話 checklist，403 詳細說明收進 `<details>` 或引用 Ch8。
- Ch6 一章三個 Part 長度約其他章兩倍 → Part 3（Merge vs Rebase 進階）預設收合。
- Ch5「進入狀態」一屏內同時出現 checkout / branch / `*` 語意 / status / stash，認知負荷全教材最高 → 拆分下放。

### I. 互動與練習

**P2-I1 Ch3/Ch4 模擬升級為兩段式**：第一輪按鈕引導、第二輪要求在模擬終端親手打出指令才過關（Ch6 的 `handleCommand` 架構可直接複用）。這是「看」到「做」之間最重要的中間層——第一次打指令的恐懼在模擬裡先消耗掉。

**P2-I2 各章末加 2–3 題自我檢測 quiz**（例：「你改了檔案但 GitHub 上看不到，最可能漏了哪步？」）——驗收「有沒有真的懂」比動畫有效。

**P2-I3 Ch8 加可勾選的 6 步 checklist**（localStorage 持久化）——實戰是多日任務，學員中斷後回來不記得做到哪。

**P2-I4 放大終點儀式感**：學員名字被 merge 進 repo 是全課程最強的情緒 payoff，目前教材只寫到 PR 送出。補：merge 後引導回原 repo 的 `learner-commits/` 看自己的檔案 + contributors 列表 + 截圖留念。

---

## 5. P3 — 小摩擦（有空再修）

| # | 項目 | 位置 |
|---|---|---|
| P3-1 | `example-blake.md` 的警告是 HTML 註解，GitHub 渲染時看不見（improvement2 spec 任務 10 的半實作）→ 改可見的 markdown 引言 | `learner-commits/example-blake.md` |
| P3-2 | 學員檔名建議改用 GitHub 帳號名命名（天然唯一，避免兩個 blake 相撞） | Ch8 Step 4 |
| P3-3 | `.gitignore`「建立一個以 `.` 開頭的檔案」沒教怎麼建 → 補「VSCode 檔案總管右鍵 New File」一句 | `Chapter3PathA.jsx` L259 |
| P3-4 | Setup Guide L98 提前用 `cd`（L217 才解釋）→ 移位或就地白話解釋 | `Beginner-Setup-Guide.md` |
| P3-5 | `learner-commits` 一詞在 Guide 重置章節首次出現無解釋 → 加括號說明 | `Beginner-Setup-Guide.md` L300 |
| P3-6 | Ch5 加一行「新版 Git 也可用 `git switch -c`，是同一件事」 | `Chapter5Branch.jsx` |
| P3-7 | Ch7 進入狀態「這部分可以先閱讀」→ 改「先讀懂流程圖就好——下一章你就會親手跑一遍」 | `Chapter7Team.jsx` L27 |
| P3-8 | Ch8 起始確認加註「此清單適用於第一次開始作業前」（set-url 之後重跑語意會變） | `Chapter8Practice.jsx` |
| P3-9 | Ch8 末尾補「砍掉重練」盒子：`git checkout main` → `git branch -D feat/xxx` → 重來 | `Chapter8Practice.jsx` |
| P3-10 | Guide 開頭「30–60 分鐘不要中斷」補一句「中斷了也沒關係，Checklist 會幫你找回進度」 | `Beginner-Setup-Guide.md` |
| P3-11 | 模擬終端訊息語言原則統一：「真實 Git 會輸出的照抄英文原文；教學旁白放終端外」 | Ch3/5 |
| P3-12 | gh CLI Releases 頁下載補截圖標示 + 「怎麼查 Mac 晶片」 | `Beginner-Setup-Guide.md` 步驟二之 4 |
| P3-13 | 老師發放教材時直接給兩個連結（線上版 + Guide rendered 頁），不要讓學員從 repo 首頁自己找 | 發放流程（非程式碼） |

---

## 6. 建議執行波次

### 波次一：止血（P0 全部 + P1-1~7）— 純文字/小修為主，半天可完成
> 目標：消滅所有「照教材做會撞牆」與「卡死即放棄」的點。
- P0-1 ~ P0-7（分流框、Vim、pull.rebase、重開終端機、Mac 分支、Sync fork、SVG 修復）
- P1-1（模擬輸出對齊真實）、P1-2（gh pr --repo）、P1-7（簡繁校對）
- Setup Guide 補強（P1-5 註冊、P1-6 gh auth）

**驗收標準**：找一位真正零基礎的同事，只給連結，從 Setup Guide 走到 Ch8 完成 PR，全程不求助——記錄卡點應為零個「放棄級」。

### 波次二：共用元件與進度系統（P1-12~15 + P2-S1、S2、V1）— 1~2 天
> 目標：建立四個共用元件（`CommandBlock` / `Callout` / `ChapterNav` / 進入狀態 banner），一次解決複製按鈕、語意色彩、導覽與進度感。
- 錯誤訊息急診室頁（P2-S1，內容在波次一多已寫好，此處集中成頁）
- localStorage 進度 + URL hash + 完成勾勾（P2-S2）

**驗收標準**：任一指令一鍵可複製且不含 `$`；提示框全站只剩 4 種語意色；重新整理後停留在原章節。

### 波次三：教學閉環與視覺打磨（其餘 P1 + P2）— 2~3 天
- Ch3 真機收尾（P1-8）、暫存區圖解（P1-9）、兩段式模擬（P2-I1）
- Ch1 降密度（P2-V2）、行動端修復（P2-V5）、字級對比（P2-V3）
- quiz、Ch8 checklist、終點儀式感（P2-I2~4）

**驗收標準**：手機 375px 寬逐章走查無爆版；Ch1 首屏只有一個視覺焦點；Ch3 可獨立完成第一次真實 push 閉環。

### 波次四：P3 掃尾 — 隨手修

---

## 7. 專題驗證：Clone → Fork 的 owner 錯位是否會卡死「交作業」？

> 驗證日期：2026-07-05。針對「Setup Guide 先 clone 原 repo、Ch8 才 Fork，是否會因雲端/本地 owner 錯位導致無法交作業」做的專項確認。

**結論：不會設計級卡死。** 教材有意識到錯位問題，Ch8 Step 2 用 `git remote set-url origin` 把本地 origin 改指向學員自己的 Fork，並附 `git remote -v` 驗證點——主幹流程是通的。且「先 clone 原 repo、感受 403、再用 Fork 解決」正是 Ch4 → Ch8 敘事弧線的刻意設計，**不建議改為業界標準的 fork-first-then-clone**（會要求學員在還不懂 fork 時就 fork，且教材更新後學員本地跑的是過時 fork）。

但 set-url 這條補救路徑上有 4 個殘餘卡點：

| # | 卡點 | 風險 | 對策 |
|---|---|---|---|
| P1-17 | **`remote: Repository not found` 零覆蓋**：學員先跑 set-url 才 Fork（順序倒錯 / 忘了 Fork），或手打 URL 時「你的帳號」沒換、打錯字。錯誤訊息與教材唯一覆蓋的 403 完全不同，救不了 | 高頻 | Ch8 Step 2 開頭加「順序鎖」警告（必須先完成 Step 1，否則 push 會出現 Repository not found）+ 錯誤對照卡（→ `git remote -v` 檢查 → 重跑 set-url），並收入錯誤急診室（P2-S1） |
| P1-18 | **「以為交了但老師沒收到」**：跨 Fork 的 `gh pr create` 會問 base repository，學員選到自己的 Fork，PR 發錯地方且雙方都不會察覺 | 中頻・高傷害 | 指令直接改為 `gh pr create --repo BlekZz/git-time-machine ...`，從指令層面消滅選錯的可能（P1-2 的強化版）；網頁路徑補「確認 base 是 BlekZz/git-time-machine」 |
| （併入 P3-8） | **中斷後重跑起始確認**：做完 set-url 後隔天重來，起始確認 ④ 的 `git pull` 拉到自己 stale 的 Fork，`Already up to date` 是假象（main 已落後原 repo） | 中頻 | 起始確認 ④ 加分流註記：「已做過 Step 2 的人，請先到 GitHub Fork 頁按 **Sync fork** 再 `git pull`」 |
| （即 P0-6） | **merge 後 `git pull` 拉不到原 repo 更新**——同一錯位家族在交件後的延伸 | 必發生 | 見 P0-6（改教 Sync fork） |

> P1-17、P1-18 請併入波次一（止血）執行。

---

## 8. 附錄：問題 × 檔案對照表

| 檔案 | 相關項目 |
|---|---|
| `Beginner-Setup-Guide.md` | P0-1, P0-3, P0-4, P0-5, P1-5, P1-6, P1-7, P3-4, P3-5, P3-10, P3-12 |
| `README.md` | P0-1, P3-13 |
| `src/App.jsx` | P2-S2, P2-V5(Tab), P2-V6(ARIA) |
| `src/components/Shared.jsx` | P1-12, P1-13, P1-14, P2-V1 |
| `Chapter1Concept.jsx` | P1-4, P1-12($說明), P2-S3, P2-S4, P2-V2 |
| `Chapter3PathA.jsx` | P1-1, P1-8, P1-9, P1-15, P3-3, P3-11 |
| `Chapter4PathB.jsx` | P1-1, P1-9, P1-11, P1-15, P2-V3, P2-V7 |
| `Chapter5Branch.jsx` | P1-1, P1-10, P2-V4, P2-V7, P3-6 |
| `Chapter6Sync.jsx` | P0-2, P0-3, P0-7, P1-9, P2-V4, P2-V5, P2-V7 |
| `Chapter7Team.jsx` | P3-7 |
| `Chapter8Practice.jsx` | P0-1, P0-6, P1-2, P1-3, P1-16, P1-17, P1-18, P2-I3, P2-I4, P2-V5, P3-2, P3-8, P3-9 |
| `index.html` / `tailwind.config.js` | P2-V6 |
| `learner-commits/example-blake.md` | P3-1 |

---

*本文件為 Plan 階段文件。決定執行時，依全域慣例改名為 `Sprint_tutorial_optimization.md` 並在文末補上 sprint 節點、各節點 QA 項目與最終驗收 checklist（§6 的波次與驗收標準可直接作為基礎）。*

---

## 9. Sprint 節點（2026-07-05 啟動執行）

> 本文件已由 `Plan_tutorial_optimization.md` 升級為 Sprint。範圍調整：P2-I1（兩段式模擬）、P2-I2（章末 quiz）延後至下一輪迭代，其餘全數執行。

### 節點 M1：文件層修復（README + Setup Guide）
- 範圍：P0-1, P0-3(Guide), P0-4, P0-5, P1-5, P1-6, P1-7, P3-4, P3-5, P3-10, P3-12 + 進入點收縮（README 雙路徑選擇區、明示勿直接開 index.html）
- QA：Mac/Windows 安裝步驟完全分離；簡繁錯字歸零；兩條路徑在 README 首屏可辨識

### 節點 M2：基礎設施（Shared.jsx / App.jsx / 急診室 / index.html / tailwind）
- 範圍：P1-12~14, P2-S1, P2-S2, P2-V1, P2-V6 + 手機 Tab（P2-V5 部分）
- QA：CommandBlock 複製去 `$`；Callout 四色語意；重新整理停留原章節；急診室為第 9 個 tab

### 節點 M3：八章內容修復（4 個平行 agents，每 agent 兩章）
- 範圍：其餘所有 P0/P1/P2/P3 章節項目（見 §8 對照表）
- QA：Ch6 SVG 曲線渲染；Ch6 無裸 `git commit`；Ch8 分流框 + 順序鎖 + `--repo` + Sync fork；模擬輸出對齊真實

### 節點 M4：驗證與部署
- 範圍：`npm run build` + `npm run lint` 通過；commit + push main；`npm run deploy` 更新 GitHub Pages
- QA：線上版可開啟、8 章 + 急診室可切換、手機寬度無爆版

### 最終驗收 Checklist
- [x] 三條進入點行為符合預期：repo→README→Guide→本機 ✅；Pages 直連 ✅（Ch8 有分流）；index.html 直開已明示不支援
- [x] P0-1 ~ P0-7 全數修復
- [x] P1-17 / P1-18（owner 錯位殘餘卡點）修復
- [x] 錯誤急診室收錄 §P2-S1 全部 8 條錯誤
- [x] build / lint 無錯誤（部署見 M4）
- [ ] 待人工驗收：找一位零基礎同事走完全程（波次一驗收標準）

---

## 10. 決策紀錄：repo 命名不一致（2026-07-05 部署時發現）

- **發現**：GitHub repo 曾由 `git-time-machine` 改名為 `Trainer_Git_Tutorial`，導致 (1) README 線上版連結 404；(2) vite `base` 與實際 Pages 路徑不符；(3) 學員 Fork 出的 repo 名為 `Trainer_Git_Tutorial`，照教材 set-url 到 `git-time-machine.git` 必撞 `Repository not found`（fork 無轉址）。
- **決策**：使用者未即時回覆，採不需額外授權的方案——教材內所有 URL / 資料夾名 / vite base 統一改為現行正式名稱 `Trainer_Git_Tutorial`（README、Setup Guide、Ch1、Ch8、vite.config.js 共 25 處）。
- **保留選項**：若日後想改回 `git-time-machine`（品牌一致性較佳），在 GitHub rename 後做一次反向全域替換 + 重新 build/deploy 即可；舊名會自動轉址，風險低。
- 歷史文件（`git-time-machine-improvement-spec.md`、`improvement2.md`）為存檔性質，未改動。
