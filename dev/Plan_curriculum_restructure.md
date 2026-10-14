# Plan_curriculum_restructure — 課綱重排（先單機、再上雲、協作選修）＋作業重設計＋說人話

> 狀態：Plan（待裁定 §6 後改名 `Sprint_curriculum_restructure.md` 開工）
> 建立：2026-10-14（claude）｜依據：全站 Ch0–Ch8 + ErrorRoom 逐檔閱讀；教學法框架 `~/.claude/coldbench/skills/tutor-sop`（前身 tutorial-design）＋ `tutor-core/references/curriculum-planning.md`（學習階梯、認知負荷）

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

### 3.1 推薦方案：「我的 Git 日誌」——全程只在學員自己的 repo

學員**從空資料夾開始**（不同於 L2–L8 範例的表面情境，符合 fading 的 far transfer），只拿到一份任務清單、不給逐步指令：

1. 本機 `git init` 一個 `git-journal` 專案，至少 3 次有意義的 commit（各寫一天學到什麼）
2. 有一個 `.gitignore`（忽略指定的檔案）
3. 開 `feat/...` 分支加內容，**本機** merge 回 main
4. 刻意製造並解決一次衝突（留下 merge commit）
5. 在 GitHub 建**自己的** repo，push main
6. 再開一個分支 push 上去，在**自己的 repo** 開 PR、寫描述、自己 Merge
7. 本機 `git pull`，確認本機與 GitHub 一致
8. **繳交**：只交一個網址 `https://github.com/<帳號>/git-journal`（繳交管道見 §6-D）

**驗收（講師在 GitHub 網頁 5 分鐘內可判定，學員也能自我檢核）**：

| 檢核項 | 在哪裡看 | 對應能力 |
|---|---|---|
| repo owner 是學員本人、Public | repo 首頁 | L6 |
| ≥3 個 commit，訊息有意義、作者頭像正確（email 綁定） | Commits 頁 | L0/L2/L3 |
| `.gitignore` 存在且生效 | 檔案列表 | L3 |
| 有一個 merge commit（本機 merge＋衝突解決） | Commits／Insights → Network 圖 | L4/L5 |
| Pull requests → Closed 裡有 1 個 Merged 的 PR | PR 頁 | L7 |
| main 最新 commit 與學員本機 `git log -1` 相同（學員截圖） | 截圖 | L7/L8 |

- 可選：給講師一支批次核對腳本（`gh api repos/<u>/git-journal/pulls?state=closed` 等）——等 §6-D 確定繳交管道再做。
- 網站內放一張「交作業前自我檢核」checklist（沿用 Ch0 checklist 元件），學員逐項打勾。

**為什麼好**：不會 403、不需要別人 merge、學員能自證完成；PR 的核心觀念（「請求把分支合進 main，按下 Merge 才算數」）完整保留，只拿掉「兩個 owner」這層協作複雜度。

### 3.2 替代方案（不推薦，列出供比較）

| 方案 | 優 | 劣 |
|---|---|---|
| B. Template repo：Blake 做一個 `git-homework-template`，學員按 **Use this template** 產生自己的 repo 再 clone | 有現成題目 README、格式統一好批改 | 起點變成 clone，跳過了 Part 1 的 init 能力；多一個 GitHub UI 概念 |
| C. 維持 Fork，但 PR 發到自己 Fork 的 main | 保留 Fork 經驗 | GitHub 預設 base 是上游，學員極易發錯——正是現在的坑 |
| D. 開一個班級 repo、每位學員加 Collaborator | 學員體驗「同一個 repo 多人協作」 | 每人要手動邀請；仍是對別人的 repo 發 PR；不屬初學範圍 |

## 4. 說人話：比喻統一與用語規範

### 4.1 推薦主比喻：「相簿」（一套貫穿全課）

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

### M0 準備（0.5 天）
- 跑 `/init-tutorial`（或 `/init-skill` 選 tutor 套組）把 tutor-core / tutor-sop 與 audit agents 裝進本專案
- 修 CLAUDE.md 失效路徑（T8）→ 指向已安裝的 tutor-sop；把 §4.2 用語規範加入「教學內容鐵律」
- QA：CLAUDE.md 引用路徑 `ls` 存在；`.claude/skills/tutor-sop/SKILL.md` 存在

### M1 骨架與導覽（1 天）
- `App.jsx` tabs 改為 Part 0–4 分組（L0…L8、作業、選修、急診室），hash id 用新名；舊 hash（`#pathA` 等）轉址到對應新章避免舊連結失效
- 新章先以「搬移舊素材」建立空殼（依 §2.1），內容尚不改寫
- QA：所有新 tab 可點；舊 hash 轉址正確；progress bar 計算只含主線章

### M2 Part 1 單機（2–3 天）
- 寫 L1–L5；L4 補 `git merge`／刪分支；L5 新寫本機衝突真機練習（含預期 CONFLICT 原文、VSCode 衝突畫面說明、Accept Current/Incoming 按鈕白話）
- 每章附「🔥 換你了」真機區＋章末 quiz；Part 1 結尾 CFU
- QA：L2→L5 的每條指令在乾淨 Windows PowerShell 實跑一次，輸出與教材 `variant="output"` 比對（tutor-audit-accuracy）；rubric 1–10 稽核 high 項 = 0

### M3 Part 2 上雲（2 天）
- L6（GitHub 註冊／gh auth login 從 Ch0 移入）、L7（自己的 PR + pull）、L8（雙資料夾同步＋遠端衝突＋init/clone 判斷卡）
- Ch6 push/pull 模擬改用真機原文輸出（T5）
- QA：用一個測試帳號從零實跑 L6–L8 全流程；rejected / conflict 原文截取比對

### M4 作業與選修（1 天）
- 作業頁：任務清單＋自我檢核 checklist＋繳交說明（依 §6-D）；講師驗收表（§3.1）放 README 教學者專區
- 舊 Ch8 Fork 流程搬 E2、rebase 搬 E1；修 Ch8 quiz 事實錯誤（S6）
- QA：拿一個測試帳號完成作業，講師依驗收表 5 分鐘內判定通過

### M5 說人話全站掃（1 天）
- 依 §4 比喻對照表全站替換；術語首次定義檢查；章首黑框改寫（T3）；語氣（T4）；事實修正（T5）；ErrorRoom 一塊一指令（T6）；L0 刪 Node（T7）
- QA：`rg` 檢查舊比喻詞（平行宇宙／時光機儀表板／敲門／搶劫／MMO／黑話）在主線章 0 命中（選修章可例外）；fresh-context agent 做「零基礎讀者」角色閱讀，回報任何看不懂的句子

### M6 驗收與部署（0.5 天）
- `npm run build`、`npm run deploy`（部署前確認）
- 找 1 位零基礎同事走完 L0→作業（沿用舊 Sprint 未完成的人工驗收項）

### 最終驗收 Checklist
- [ ] 學員在 Part 1 全程不需要 GitHub 帳號即可完成所有真機練習
- [ ] 主線（L0–L8＋作業）不出現 Fork、跨 owner PR、403、rebase
- [ ] 作業可由學員自證完成；講師依 §3.1 表 5 分鐘內判定
- [ ] 每章都有真機 You Do 區與章末 quiz
- [ ] 全站單一比喻系統；必定義術語清單每項都有白話首次定義
- [ ] 模擬終端輸出全部為真機原文
- [ ] `npm run build` 通過；舊 hash 連結轉址正確
- [ ] 零基礎同事實測走完、卡點已回填急診室

## 6. 待裁（開工前需 Blake 決定）

- **A. 作業方案**：3.1「我的 Git 日誌」（推薦）／B Template repo／保留 Fork 但改選修 bonus
- **B. 主比喻**：相簿（推薦）／保留遊戲存檔（暫存區另用「打包箱」補）
- **C. 行前準備**：刪 Node.js、GitHub 登入移到 L6（推薦）／維持 Ch0 一次裝好
- **D. 繳交管道**：學員交 repo 網址的地方——Google 表單／Slack 頻道／其他
