# Sprint_curriculum_restructure — 課綱重排（先單機、再上雲、協作選修）＋作業重設計＋說人話

> 狀態：Sprint（§6 全數裁定）｜**尚未開工——等 Blake 指示開始時間，未指示前不得動 src/**
> 建立：2026-10-14（claude，由 Plan_curriculum_restructure 改名）｜依據：全站 Ch0–Ch8 + ErrorRoom 逐檔閱讀；教學法框架 `~/.claude/coldbench/skills/tutor-sop`（前身 tutorial-design）＋ `tutor-core/references/curriculum-planning.md`（學習階梯、認知負荷）

---

## 0. 一句話結論

現行課綱是「**情境導向**」（A：init 上雲／B：clone 別人的）＋終點是「**跨 owner 的 Fork→PR**」；對零基礎學員應改成「**能力階梯導向**」：先在自己電腦把 Git 玩熟（全程不碰 GitHub）→ 再把**自己的** repo 送上雲 → 在**自己的** repo 發 PR 自己 merge。Fork／貢獻別人專案／rebase 降為不計分的選修。

## 1. 診斷：現行結構的問題（附證據）

### 1.1 順序與整合

| # | 問題 | 證據 | 影響 |
|---|---|---|---|
| S1 | **沒有「純單機」階段**：第一次 commit（Ch3）同章就要建 GitHub repo、remote add、push；本地基本功被拆散在各章角落 | `git status` 速查表在 Ch4:439、`restore` 在 Ch4:487、`git log`／`.gitignore` 在 Ch3:438、`stash` 在 Ch5:120 | 學員同時扛「Git 概念 + 雲端帳號 + 權限」三種新東西，認知負荷爆掉 |
| S2 | **教了 branch 卻沒教本機 `git merge`**；merge 第一次出現是在 Ch6 的 pull 衝突與 Ch7 的 PR | Ch5 只有 branch／checkout／checkout -b；Ch7 quiz:195 卻說「本地執行 git merge 也做得到」 | 分支學到一半；學員以為「合併一定要上 GitHub 發 PR」（Ch1:99 也這樣寫） |
| S3 | **衝突沒有任何真機練習**，且被放在最難的遠端情境（pull）裡教 | Ch6 Part 2 只有圖與說明 | 衝突其實在本機兩個分支就能 100% 重現、零權限問題 |
| S4 | **真機練習只出現在 Ch3 與 Ch8**；Ch4–Ch7 全是模擬或純閱讀 | Ch4:267「關於 Push 的實際練習，請等到 Chapter 8」 | I-We-You 的 You Do 斷掉四章；單機內容本來每章都能真做 |
| S5 | **Ch4 整章在教「失敗」**：clone 一個虛構 repo，結論是 push 會 403 | Ch4:233 | 學員帶著「push 會被拒」的焦慮進 Ch5 |
| S6 | **Ch8 依賴一個從未教過的步驟**：要求在 `Trainer_Git_Tutorial` 資料夾操作，但全站沒有任何一處叫學員 clone `BlekZz/Trainer_Git_Tutorial` | `grep "BlekZz\|git clone" src/` 只命中 Ch8 與虛構 cool-project；Ch8 quiz:537「你在 Ch.4 已經 clone 過原 repo」為**事實錯誤** | 作業第一步就斷頭 |
| S7 | Rebase（Ch6 Part 3）在 PR 之前出現，雖標「進階」仍佔主線 | Ch6:433 | 雜訊 |
| S8 | 身份設定（user.name/email）在 Ch1、其餘一次性設定在 Ch0，`pull.rebase` 在 Ch6 又出現一次 | Ch0:398、Ch1:179、Ch6:147 | 重複、學員不知道做過沒 |

### 1.2 作業（Ch8）設計

現行：Fork BlekZz → `set-url` → branch → push 到自己 Fork → **跨 repo PR 回 BlekZz** → 等維護者 merge。

- 這是**開源貢獻流程**，屬協作進階：涉及兩個 owner、base/compare repo 選擇、`--repo` 參數、Sync fork、upstream 落後等概念（`Sprint_tutorial_optimization.md §7` 已列出 4 個殘餘卡點，且全部源自 owner 錯位）。
- 驗收綁在**別人（Blake）是否按 merge**：學員做完了也無法自證完成；維護者要逐一 review N 份 PR。
- 前置的 clone 步驟根本不存在（S6）。
- 「你的頭像會出現在 Contributors」（Ch8:526）只在 merge 後且 commit email 與帳號綁定時成立——承諾過頭。

### 1.3 呈現與「說人話」

| # | 問題 | 例子 |
|---|---|---|
| T1 | **比喻系統混雜**，同一概念換 2–3 套說法 | commit = 遊戲存檔（Ch1:78）＝拍照按快門（Ch3:285、Ch8:387）；branch = 平行宇宙＝存檔欄位（Ch1:83-84）；Git/GitHub = 剪輯軟體/YouTube（Ch1:148）；PR = 敲門拜託（Ch1:93）＝超商付錢 vs 搶劫（Ch8:78）；`.gitignore` = 隱形斗篷；log = 時光機儀表板；stash = 抽屜；merge = 結局收束 |
| T2 | **核心名詞沒定義或用術語解釋術語** | repo（Ch1:46 提到「什麼是 repo？」卻全站無定義）、origin（只說「命名為 origin」）、`-u` =「建立上下游連線」、HEAD（出現在 log、衝突標記、detached HEAD 卻沒解釋）、working tree、upstream、「非快進（non-fast-forward）」（Ch3 quiz:580）、CI/CD（Ch1:141） |
| T3 | **章首「⚡ 進入狀態」黑框塞滿尚未教過的警告** | Ch5 黑框先講 checkout 失敗；Ch6 黑框四大段含 SSH publickey、403、divergent；Ch4 黑框先講 403 | 違反「就近預告」：警告該放在會發生的那一步上方，而不是章首一次轟炸 |
| T4 | **語氣過嗨／過度承諾** | 「秒懂核心黑話字典」「MMO 合作模式」「多人線上協作工程師」「神器」「這不是演習！」「比任何履歷都有說服力」「你的第一個開源貢獻」 |
| T5 | **說法與事實不符** | push 是「直接、強制的寫入動作」（Ch8:79、Ch7 quiz:175）→ push 會被拒，不是強制；`restore --staged` 說成「搭時光機回到上一個存檔點」（Ch4:502）→ 它不動檔案內容；Merge「PR 審核通過後才會執行」（Ch1:99）；Ch6 模擬輸出 `Fast-forward / Merge successful.`、`Rejected! Remote contains work…`（Ch6:62,84）不是真機原文，違反專案鐵律 4 |
| T6 | 專案鐵律自身違規 | ErrorRoom:53「Please tell me who you are」一個 CommandBlock 放兩條指令（鐵律 1） |
| T7 | 行前準備裝了學員用不到的 Node.js，描述是「讓教學相關工具能運作的引擎」 | Ch0:335；學員走網頁版，Node 只有本機開發教材的人需要 | 多 10–20 分鐘安裝、多一個失敗點 |
| T8 | CLAUDE.md 指向的 skill 路徑已失效 | `~/.claude/coldbench/skills/tutorial-design/SKILL.md` 不存在 → 已改名 `tutor-sop` | 下一個 agent 讀不到教學規範 |

## 2. 新課綱（能力階梯）

設計原則：每階一個「質的躍遷」，每章都有**真機 You Do**（單機階段沒有權限與網路風險，天然安全）。

```
Part 0  準備
  L0 行前準備 ── 裝 VSCode + Git (+ gh)；身份設定 user.name/email 併入此章 checklist
                  （移除 Node.js；GitHub 註冊與登入移到 L6 即時進行）

Part 1  單機 Git（全程不需要 GitHub 帳號）
  L1 觀念 ── 一個比喻講完三格：工作資料夾 → 暫存區 → 存檔紀錄（§4）
  L2 第一次存檔 ── 建資料夾 → git init → status → add → commit → log
  L3 看差異與後悔藥 ── diff、restore、restore --staged、.gitignore、commit 訊息怎麼寫
  L4 分支 ── branch / switch（或 checkout）→ 分支上 commit → 切回 main「檔案不見了」(FalseAlarm) → git merge（fast-forward）→ 刪分支
  L5 本機衝突 ── 兩個分支改同一行 → merge → CONFLICT → 在 VSCode 解 → add → commit
      ▸ CFU：Part 1 小考 + 「不看教材自己做一次 L2→L4」自我檢核

Part 2  上雲（只用自己的 repo，永遠不會 403）
  L6 GitHub 與第一次 push ── 註冊/登入（gh auth login）→ 建空 repo → remote add → push -u
  L7 分支上雲 + 自己的 PR ── push 分支 → 在**自己的** repo 開 PR → 自己按 Merge → 回本機 git pull
      （PR merge 後遠端比本機新 → 自然教出 pull，不需要同事）
  L8 兩台電腦的同步 ── 把自己的 repo clone 到第二個資料夾（模擬換電腦）→ 一邊 push、另一邊 pull
      → 再到 GitHub 網頁直接改同一行 → push 被 rejected → pull → 遠端衝突 → 解
      ▸ 收束卡：「新專案用 init、雲上已有用 clone」（原 Ch2 情境 A/B 降為這張判斷卡）

Part 3  作業（Capstone，見 §3）

Part 4  選修（不計分，標「學完作業再來」）
  E1 Merge vs Rebase（原 Ch6 Part 3）
  E2 參與別人的專案：Fork → clone → PR 回上游 → Sync fork（原 Ch8 內容整包移入）
  E3 stash、detached HEAD、改上一個 commit 訊息

🚑 急診室（不變，新增 L4/L5 會遇到的錯誤）
```

### 2.1 舊章 → 新章對照（素材幾乎全部可重用）

| 舊 | 去向 |
|---|---|
| Ch0 行前準備 | L0（刪 Node、GitHub 註冊/gh login 移 L6、身份設定併入） |
| Ch1 觀念＋身份 | L1（黑話字典重寫成單一比喻）；身份設定 → L0 |
| Ch2 兩大情境 | 改成「全課地圖」放 L1 結尾；A/B 判斷卡移 L8 |
| Ch3 情境 A | 前半 init/add/commit/log → L2；.gitignore、commit 訊息 → L3；remote/push 後半 → L6；挑戰模式終端拆到 L2 與 L6 各一份 |
| Ch4 情境 B | status 速查表 → L2；緊急逃生包 → L3；clone 模擬 → L8（改成 clone 自己的 repo）；403 說明 → E2 |
| Ch5 分支 | L4（補 merge 與刪分支；團隊平行開發圖移 L7） |
| Ch6 同步與衝突 | 衝突解說 → L5（改本機版）；push/pull 拔河模擬 → L8；rebase → E1 |
| Ch7 團隊與 PR | PR 概念 → L7（改成自己 repo 版）；Code Review/Request Changes → E2 |
| Ch8 實戰演練 | Fork 流程整包 → E2；作業改 §3 |

## 3. 作業重設計

### 3.0 固定資訊（教材內引用一律以此為準）

| 項目 | 值 |
|---|---|
| 講師 GitHub 帳號 | `BlekZz`（https://github.com/BlekZz） |
| 學員在 PR 描述要寫的 mention | `@BlekZz` |
| 講師收件匣（所有作業 PR 一頁列出） | https://github.com/pulls?q=is%3Apr+mentions%3ABlekZz （GitHub 搜尋 `is:pr mentions:BlekZz`；只看待審加 `is:open`） |
| 作業 repo 名稱 | `git-homework`（全班統一，方便講師辨識；L2–L8 練習用的是另一個 `git-journal`，2026-10-14 改名避免同名） |

> 帳號若更換，只改這張表＋`src` 內集中常數（M1 建立 `src/config.js` 的 `INSTRUCTOR_GITHUB`），教材文字不得寫死帳號。

### 3.1 定案方案：「我的 Git 日誌」——全程只在學員自己的 repo，用 @mention 交件

學員**從空資料夾開始**（不同於 L2–L8 範例的表面情境，符合 fading 的 far transfer），只拿到一份任務清單、不給逐步指令：

1. 本機 `git init` 一個 `git-homework` 專案（新的空資料夾，不是 L2–L8 的 git-journal），至少 3 次有意義的 commit（各寫一天學到什麼）
2. 有一個 `.gitignore`（忽略指定的檔案）
3. 開 `feat/...` 分支加內容，**本機** merge 回 main
4. 刻意製造並解決一次衝突（留下 merge commit）
5. 在 GitHub 建**自己的** repo，push main
6. 再開一個 `feat/...` 分支 push 上去，在**自己的 repo** 開 PR（base = 自己的 `main`）
7. **繳交＝PR 描述欄寫 `@BlekZz 請 review`**（附固定描述範本，見下）——這就是交件，不另填表單
8. 講師 review：
   - **Approve** → 驗收通過，學員自己按 **Merge pull request**
   - **Request changes** → 學員本機修改 → commit → push 到同一分支（PR 自動更新）→ 留言「已修改，請再看一次」
9. Merge 後本機 `git checkout main` + `git pull`，確認本機與 GitHub 一致

PR 描述範本（教材提供可複製版）：
```
@BlekZz 請 review 我的 Git 作業

- 這個 PR 新增了：<一句話>
- 我在作業中解決過一次衝突：<是哪個檔案>
```

**驗收（講師打開 PR 頁即可判定；學員也能用同一張表自我檢核）**：

| 檢核項 | 在哪裡看 | 對應能力 |
|---|---|---|
| repo owner 是學員本人、Public | repo 首頁 | L6 |
| ≥3 個 commit，訊息有意義、作者頭像正確（email 綁定） | Commits 頁 | L0/L2/L3 |
| `.gitignore` 存在且生效 | 檔案列表 | L3 |
| 有一個 merge commit（本機 merge＋衝突解決） | Commits／Insights → Network 圖 | L4/L5 |
| PR base 是學員自己的 `main`、描述有 `@BlekZz` | PR 頁頂部 | L7 |
| 講師 Approve 後由學員 Merge（PR 狀態 Merged，時間線先 Approved 後 merged） | PR 時間線 | L7 |
| Merge 後 main 最新 commit 與學員本機 `git log -1` 相同（學員在 PR 留言貼截圖） | PR 留言 | L7/L8 |

- 網站內放一張「交作業前自我檢核」checklist（沿用 Ch0 checklist 元件），學員逐項打勾。
- 可選（M4 視需要）：講師批次腳本，用 `gh search prs --mentions BlekZz --json url,state` 列出全部作業與狀態。

**為什麼好**：全程一個 repo、不會 403、不會發錯地方；講師用一條搜尋收齊所有作業；學員完整體驗「發 PR → 被 review →（修改）→ 核准 → 自己 merge」一輪，且你的 repo 不會累積永不 merge 的 PR。

**未實測前提（M4 第一件事）**：(1) public repo 的 PR 描述 @mention 非 collaborator 會發通知給被提及者；(2) 非 collaborator 可以在 public repo 的 PR 按 Approve / Request changes；(3) `mentions:BlekZz` 搜尋能列出這些 PR。任一不成立 → 退回方案：學員 Settings → Collaborators 邀請 `BlekZz`、PR 右欄 Reviewers 指定 `BlekZz`（講師端用 `gh api user/repository_invitations` 批次接受）。

### 3.2 未採用方案（留存比較）

| 方案 | 優 | 劣 |
|---|---|---|
| B. Template repo：Blake 做一個 `git-homework-template`，學員按 **Use this template** 產生自己的 repo 再 clone | 有現成題目 README、格式統一好批改 | 起點變成 clone，跳過了 Part 1 的 init 能力；多一個 GitHub UI 概念 |
| C. 維持 Fork，但 PR 發到自己 Fork 的 main | 保留 Fork 經驗 | GitHub 預設 base 是上游，學員極易發錯——正是現在的坑 |
| D. 開一個班級 repo、每位學員加 Collaborator | 學員體驗「同一個 repo 多人協作」 | 每人要手動邀請；仍是對別人的 repo 發 PR；不屬初學範圍 |

## 4. 說人話：比喻統一與用語規範

### 4.1 定案主比喻：「相簿」（一套貫穿全課）

選它的理由：遊戲存檔解釋不了**暫存區**（Git 最難懂、學員最常卡的概念），相簿可以；而且「雲端相簿」對一般人比「YouTube」更準（YouTube 暗示公開發表，GitHub 對初學者的主要價值是備份與同步）。

| Git 概念 | 相簿說法 | 一句話白話 |
|---|---|---|
| 工作資料夾 | 你的書桌 | 你正在改的檔案 |
| 暫存區（add） | 拍照台：把這次要入鏡的東西擺上去 | 挑出「這次存檔要包含哪些改動」 |
| commit | 按快門，相簿多一張照片（附一句說明） | 存一個隨時能回去看的版本 |
| log | 翻相簿 | 看所有存過的版本 |
| restore | 照著某張照片把書桌恢復原樣 | 丟掉還沒存的改動 |
| branch | 從某張照片開始另開一本相簿 | 試新東西不影響主線 |
| merge | 把另一本相簿的照片收進主相簿 | 把分支的成果合回 main |
| conflict | 兩本相簿對同一處拍了不同的樣子，要你挑 | Git 不敢替你決定 |
| GitHub | 雲端相簿（像 Google 相簿） | 備份＋分享＋多台電腦同步 |
| remote / origin | 雲端相簿的地址，`origin` 是它的小名 | `origin` 就是「我的 GitHub 那份」 |
| push / pull | 上傳到雲端相簿／把雲端的新照片下載下來 | |
| clone | 把整本雲端相簿下載到新電腦 | |
| PR | 「我這本分支相簿拍好了，請收進主相簿」的申請單；按 Merge 才算收進去 | |

（遊戲存檔可保留為 L1 開場的一句鉤子：「就像打王前存檔」，之後統一用相簿。替代選擇見 §6-B。）

### 4.2 用語規範（寫進 CLAUDE.md 鐵律）

1. **每個術語第一次出現時，用一句不含其他術語的白話定義**；之後可直接用英文原名（學員之後要看真機畫面）。必定義清單：repo、commit、暫存區、branch、merge、remote/origin、push、pull、clone、HEAD、PR。
2. **一個概念一個比喻**，全站一致；不另外發明新比喻。
3. 刪除不必要的術語：CI/CD、upstream、non-fast-forward、set-upstream、Collaborator（選修章可出現）。
4. 章首只放「本章學會什麼（1 句）＋需要先準備什麼（≤2 條）」；所有警告／FalseAlarm 移到會發生的那一步正上方。
5. 語氣：鼓勵但不誇大；刪除「黑話」「神器」「MMO」「這不是演習」「升級為工程師」類用語；不寫無法保證的承諾。
6. 模擬終端輸出一律用真機原文（修 Ch6 兩處自創訊息）。

## 5. Sprint 節點

> 驗收共通：每節點結束跑 `npm run build`（必過）＋該節點的 QA；內容節點交 fresh-context agent 依 tutor-sop rubric 1–10 稽核（不自驗）。


### 開工前置（Blake 準備，M0 前到位）
- [x] 一個**學員測試帳號** `blakelee0918`（M3／M4 實跑與 M5 截圖用；學員視角截圖一律用它）——2026-10-14 驗：github.com/blakelee0918 公開頁存在，Joined October 14, 2026，0 個 public repo
- [x] `BlekZz` 登入的 Chrome（Chrome profile 1）＝ claude-in-chrome deviceId `a0a7e3e1-66cd-4059-94b5-edcecd67caf4`——2026-10-14 驗：github.com 首頁顯示「Good morning, BlekZz!」
- [x] 測試帳號的 Chrome（Chrome profile 3）＝ deviceId `73ebd58f-841e-4a3f-b835-5c034d3ac5d4`——2026-10-14 驗：github.com 首頁顯示「Welcome to GitHub, blakelee0918!」
- ⚠️ 擴充功能顯示名稱「Browser 1／2」會隨連線順序互換（同日實測：BlekZz 那台先叫 Browser 1、後變 Browser 2），**以 deviceId 為準**；每次操作 GitHub 前先打開 github.com 首頁確認登入者再動作

### M0 準備（0.5 天）
- 跑 `/init-tutorial`（或 `/init-skill` 選 tutor 套組）把 tutor-core / tutor-sop 與 audit agents 裝進本專案
- 修 CLAUDE.md 失效路徑（T8）→ 指向已安裝的 tutor-sop；把 §4.2 用語規範、§3.0 固定資訊、§7.1 截圖規範摘要加入 CLAUDE.md
- QA：CLAUDE.md 引用路徑 `ls` 存在；`.claude/skills/tutor-sop/SKILL.md` 存在

### M1 骨架、導覽與共用元件（1 天）
> ✅ 2026-10-14 完成（1b9bea3 config/Screenshot、aafb12d 骨架由 codex 搬移）。驗收：build 過；eslint 6（既有）；指令＋quiz 89 項 multiset 0 遺失；`rg BlekZz src` 只命中 config.js；dev server 實測 14 分頁可開、`#flow #pathA #pathB #team #practice` 轉址正確、375px 無橫向捲動、console 0 error；進度條＝tabs 前 10 個（L0–L8＋作業）。未驗：Screenshot 佔位框（尚無章節使用，M2 首用時驗）、瀏覽器上一頁行為。
- `App.jsx` tabs 改為 Part 0–4 分組（L0…L8、作業、選修、急診室），hash id 用新名；舊 hash（`#pathA` 等）轉址到對應新章避免舊連結失效
- 新章先以「搬移舊素材」建立空殼（依 §2.1），內容尚不改寫
- 新增 `src/config.js`（`INSTRUCTOR_GITHUB = 'BlekZz'`、作業 repo 名、收件匣搜尋網址）——教材文字一律引用常數
- `Shared.jsx` 新增 `<Screenshot src alt caption />`：caption 一律「你會看到…」句式、圖片可點開放大、手機寬度不溢出；檔案不存在時顯示「截圖待補：<id>」佔位框（讓 M2–M4 能先寫文字、M5 再補圖）
- QA：所有新 tab 可點；舊 hash 轉址正確；progress bar 只計主線章；`rg "BlekZz" src/` 只命中 `config.js`；Screenshot 佔位框在缺檔時正常顯示

### M2 Part 1 單機（2–3 天）
> ✅ 2026-10-14 完成（c92c99e codex 初稿、b108474 稽核修正、9a7c82d 錄製腳本）。驗收：build 過；eslint 6（既有）；L2–L5 共 40 個 output 區塊逐行比對 `dev/script/real-outputs-part1*.sh` 實跑紀錄（Git 2.55.0.windows.5、init.defaultBranch=main、core.autocrlf=true），僅 L5 `-m "解決標題衝突"` 2 行為指定差異；禁用詞／舊章名／佔位 0；quiz 4/4/5/4/4、每章有「換你了」；dev server 375px 無橫向捲動、console 0 error；Screenshot 佔位框實測顯示（img lazy，捲到才換成佔位框）。rubric 稽核（codex fresh-context，唯讀）high 0／medium 2／low 3，五項全修。未做：「乾淨 Windows PowerShell 實跑」只在 Git Bash 錄輸出，PowerShell 端的引號與 `ls` 行為未真機走一次。
- 寫 L1–L5；L4 補 `git merge`／刪分支；L5 新寫本機衝突真機練習（含預期 CONFLICT 原文、VSCode 衝突畫面說明、Accept Current/Incoming 按鈕白話）
- 每章附「🔥 換你了」真機區＋章末 quiz；Part 1 結尾 CFU
- VSCode 畫面（Source Control 面板、衝突的 Accept 按鈕）在文中放 `<Screenshot>` 佔位，id 依 §7.2
- QA：L2→L5 的每條指令在乾淨 Windows PowerShell 實跑一次，輸出與教材 `variant="output"` 比對（tutor-audit-accuracy）；rubric 1–10 稽核 high 項 = 0

### M3 Part 2 上雲（2 天）
> ✅ 2026-10-14 完成（2fffe81 錄製腳本、78a4610 codex 初稿、稽核修正 b2af976）。真機輸出：`dev/script/real-outputs-part2.sh` 以測試帳號 blakelee0918 對 GitHub 實跑（fixture repo `blakelee0918/git-journal-rec`，per-process token、不改全域 git/gh 設定），進度行依 `\r` 收斂成終端最後畫面。驗收：build 過；eslint 6（既有）；23 個 output 區塊逐行比對 0 不符（`git log -1 --oneline` 範例為唯一未實錄行，格式同 Part 1 實錄的 --oneline）；Fork／403／禁用詞 0；§7.2 L6–L8 截圖 id 10/10；quiz 4/4/5；375px 無橫向捲動、console 0 error。rubric 稽核（codex 唯讀）high 1／medium 2，全修：ErrorRoom SSH 救援網址改 git-journal、Repository not found 改為自有 repo 三步核對（Fork 原因降為 E2 註記）、L8 獨立練習完成訊號改兩邊 `git log -1 --oneline` 比對。實錄觀察：遠端衝突的下方標記是完整 commit id 而非分支名；兩邊改不同行時 pull 會開 Vim 寫合併訊息。未做：GitHub 網頁步驟的按鈕文字未在真實網頁逐一核對（M5 截圖時一併核對回填）。
- L6（GitHub 註冊／gh auth login 從 Ch0 移入）、L7（自己的 PR + pull）、L8（雙資料夾同步＋遠端衝突＋init/clone 判斷卡）
- Ch6 push/pull 模擬改用真機原文輸出（T5）
- 每個 GitHub 網頁操作步驟放 `<Screenshot>` 佔位（§7.2 清單）
- QA：用測試帳號從零實跑 L6–L8 全流程；rejected / conflict 原文截取比對；過程中記下每個 GitHub 畫面的實際按鈕文字，回填文案

### M4 作業與選修（1 天）
- **第一件事：驗證 §3.1 三個未實測前提**（測試帳號開 PR @BlekZz → BlekZz 是否收到通知、能否 Approve／Request changes、`mentions:BlekZz` 搜得到）。記錄觀察到的訊號（通知信主旨、PR 時間線文字）。任一不成立 → 改用 §3.1 退回方案，再繼續
- 作業頁：任務清單＋PR 描述範本（可複製）＋自我檢核 checklist＋「被 Request changes 怎麼辦」；講師驗收表（§3.1）與收件匣網址放 README 教學者專區
- 舊 Ch8 Fork 流程搬 E2、rebase 搬 E1；修 Ch8 quiz 事實錯誤（S6）
- QA：測試帳號完整做一次作業（含一次 Request changes 來回），BlekZz 依驗收表判定通過；收件匣搜尋能看到該 PR

### M5 GitHub／VSCode 操作截圖（1 天）
- 依 §7.2 清單截圖（規範 §7.1），補滿 M2–M4 留下的所有佔位
- QA：`rg "截圖待補"` 渲染結果為 0（在 dev server 逐章檢查無佔位框）；每張圖 fresh-context agent 對照圖說「你會看到…」是否與圖相符；人工檢查無真實 email／token／私人 repo 名入鏡；圖片總量 ≤ 5 MB

### M6 說人話全站掃（1 天）
- 依 §4 比喻對照表全站替換；術語首次定義檢查；章首黑框改寫（T3）；語氣（T4）；事實修正（T5）；ErrorRoom 一塊一指令（T6）；L0 刪 Node（T7）
- QA：`rg` 檢查舊比喻詞（平行宇宙／時光機儀表板／敲門／搶劫／MMO／黑話）在主線章 0 命中（選修章可例外）；fresh-context agent 做「零基礎讀者」角色閱讀，回報任何看不懂的句子

### M7 驗收與部署（0.5 天）
- `npm run build`、`npm run deploy`（部署前確認）
- 找 1 位零基礎同事走完 L0→作業（沿用舊 Sprint 未完成的人工驗收項）

### 最終驗收 Checklist
- [ ] 學員在 Part 1 全程不需要 GitHub 帳號即可完成所有真機練習
- [ ] 主線（L0–L8＋作業）不出現 Fork、跨 owner PR、403、rebase
- [ ] 作業交件＝自己 repo 的 PR 內 @BlekZz；講師用收件匣搜尋看到 PR 並能 review；學員 Approve 後自己 merge
- [x] §3.1 三個前提已實測，觀察訊號記錄在本檔 §8（2026-10-14，§8.1）
- [ ] 每章都有真機 You Do 區與章末 quiz
- [ ] 全站單一比喻系統；必定義術語清單每項都有白話首次定義
- [ ] 模擬終端輸出全部為真機原文
- [ ] 所有 GitHub 網頁操作步驟都有截圖，無截圖佔位框殘留，無敏感資訊入鏡
- [ ] 講師帳號只出現在 `src/config.js`
- [ ] `npm run build` 通過；舊 hash 連結轉址正確
- [ ] 零基礎同事實測走完、卡點已回填急診室

## 6. 裁定紀錄

- **A. 作業方案**：✅ 2026-10-14 「我的 Git 日誌」（§3.1）
- **B. 主比喻**：✅ 2026-10-14 相簿（§4.1）
- **C. 行前準備**：✅ 2026-10-14 刪 Node.js、GitHub 登入移到 L6
- **D. 繳交管道**：✅ 2026-10-14 自己 repo 的 PR 描述 @BlekZz 請求 review → 講師 review → Approve 後學員自己 merge；講師以 `is:pr mentions:BlekZz` 當收件匣（Blake 原提案「Fork → 自 merge → 再發 PR 給講師不 merge」因 Fork 預設 base 指向上游易發錯、跳過 init、講師 repo 累積 open PR 而未採用）。附帶要求：講師帳號留存記錄（§3.0）、GitHub 操作頁面截圖作為教學一部分（§7、M5）

## 7. 截圖

### 7.1 規範（依 tutor-sop「截圖／錄影操作協定」）
- 工具：claude-in-chrome `computer` 截圖；≥3 步連續操作另錄 `gif_creator`，關鍵停留點仍補靜態圖
- 學員視角用**測試帳號**；講師視角（review、收件匣）用 `BlekZz`
- 一張圖只標**一個**動作點（紅框或箭頭）；圖內需要照打的文字，正文必須另有可複製文字版
- 必遮：email、token、通知內容中的他人資訊、無關的私人 repo
- 檔案：`public/screenshots/<章>-<步驟slug>-<before|after|N>.png`（如 `L6-new-repo-after.png`），WebP／壓縮 PNG，單張 ≤ 200 KB
- 圖說寫「你會看到…」，不寫「如圖所示」；每張圖在 §7.2 記錄截圖日期（GitHub 改版時可批次定位重截）

### 7.2 截圖清單（M2–M4 寫文時放佔位，M5 補圖）

| id | 畫面 | 帳號 | 用在 |
|---|---|---|---|
| L2-vscode-source-control | VSCode 左側 Source Control 面板顯示變更檔案 | — | L2 |
| L5-vscode-conflict | VSCode 衝突區塊＋Accept Current / Incoming / Both 按鈕 | — | L5 |
| L6-signup | github.com 註冊頁 | 測試 | L6 |
| L6-gh-auth-device | `gh auth login` 開出的瀏覽器驗證碼頁＋Authorize | 測試 | L6 |
| L6-new-repo-form | New repository 表單（三個初始化選項都不勾） | 測試 | L6 |
| L6-new-repo-after | 空 repo 頁＋HTTPS 網址複製按鈕 | 測試 | L6 |
| L6-after-push | push 後 repo 頁出現檔案 | 測試 | L6 |
| L7-compare-banner | 黃色「had recent pushes」＋Compare & pull request | 測試 | L7、作業 |
| L7-pr-form | Open a pull request 表單（base 是自己的 main） | 測試 | L7、作業 |
| L7-pr-merge-button | PR 頁 Merge pull request／Confirm merge | 測試 | L7、作業 |
| L7-branch-delete | merge 後 Delete branch 按鈕 | 測試 | L7 |
| L8-web-edit | GitHub 網頁直接編輯檔案＋Commit changes | 測試 | L8 |
| HW-pr-mention | PR 描述欄寫 `@BlekZz 請 review` | 測試 | 作業 |
| HW-review-approve | 講師端 Files changed → Review changes → Approve | BlekZz | 作業（講師視角說明） |
| HW-review-request-changes | 學員端看到 Changes requested 的樣子 | 測試 | 作業 |
| HW-approved-timeline | 學員端 PR 時間線顯示 Approved | 測試 | 作業 |
| HW-inbox-search | 講師收件匣 `is:pr mentions:BlekZz` 搜尋結果 | BlekZz | README 教學者專區 |
| HW-commits-page | Commits 頁（含 merge commit） | 測試 | 作業自我檢核 |

## 8. 實測紀錄（M4 填寫）

### 8.1 §3.1 三個前提（2026-10-14，全數成立 → 不需退回方案）
測試 fixture：`blakelee0918/mention-test`（Public，Add README）→ 網頁新增 `day1.md`、Commit 對話框選「Create a new branch for this commit and start a pull request」（分支 `blakelee0918-patch-1`）→ PR #1，描述用 §3.1 範本（首行 `@BlekZz 請 review 我的 Git 作業`）。PR 保留未 merge，供 M5 截圖重用。

| 前提 | 結果 | 觀察到的訊號 |
|---|---|---|
| (1) @mention 通知非 collaborator | ✅ | BlekZz 瀏覽器 `github.com/notifications?query=repo:blakelee0918/mention-test` 出現一列「blakelee0918/mention-test #1 Create day1.md mention」（reason = mention） |
| (2) 非 collaborator 可 Approve | ✅ | `gh pr review 1 -R blakelee0918/mention-test --approve` exit 0；`GET /pulls/1/reviews` → `BlekZz APPROVED NONE`（author_association = NONE 即非 collaborator）。Request changes 為同一 API 不同 event，未另測，M4 作業全流程實跑時補 |
| (3) `mentions:BlekZz` 搜得到 | ✅ | `gh search prs --mentions BlekZz` → `https://github.com/blakelee0918/mention-test/pull/1 open blakelee0918` |

- 附帶事實：無 branch protection 時 `reviewDecision` 為空字串——Approve 只顯示在 PR 時間線，PR 頁頂不會有「Approved」狀態徽章；作業驗收表「時間線先 Approved 後 merged」的寫法正確，教材不要說「PR 會顯示已核准狀態」。
- 附帶事實：本機 `gh`（OAuth token，scopes gist/read:org/repo）`gh api notifications?all=true` 回 0 筆——讀不到通知，講師收件匣一律用網頁 `is:pr mentions:BlekZz` 或 `gh search prs --mentions BlekZz`，不用 notifications API。

### 8.2 作業全流程實跑（2026-10-14，M4 QA，`dev/script/homework-e2e.sh`）
學員＝測試帳號 blakelee0918（per-process token），講師＝gh active 帳號 BlekZz。fixture：`blakelee0918/git-homework` PR #1（已 merge，保留供 M5 截圖）。
- §3.1 第 1–9 步全部通過：3 commit、`.gitignore` 生效（notes.tmp 不在 status）、本機 merge＋衝突 merge commit、push main、feat 分支 PR（base＝自己的 main）、描述首行 `@BlekZz 請 review 我的 Git 作業`。
- 講師搜尋：`gh search prs --mentions BlekZz --repo blakelee0918/git-homework` 命中 PR #1。
- **Request changes 非 collaborator 可用**（補 §8.1 未測項）：reviews API → `BlekZz CHANGES_REQUESTED NONE`，修正後 `BlekZz APPROVED NONE`。
- 學員同分支 push 修正後 PR 自動更新（PR commits=2）；timeline：`committed > mentioned > subscribed > reviewed > committed > commented > reviewed > merged > closed`；`state=MERGED mergedBy=blakelee0918`。
- Merge 後本機 `git pull`，本機 HEAD＝GitHub main（`1ef2aa5…` 兩邊一致）；main 共 12 commit、2 個 merge commit。
