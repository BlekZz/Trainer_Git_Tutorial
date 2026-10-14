# Git Time Machine 🚀

一個互動式 Git 教學網頁應用，透過視覺化模擬讓 **Git 零基礎** 的初學者從零開始理解版本控制。內含行前準備（Chapter 0）、八大互動章節與錯誤急診室，全程繁體中文。

## 🎓 開始學習（唯一官方入口）

> ## **[👉 點此開啟教學網頁](https://blekzz.github.io/Trainer_Git_Tutorial/)**
>
> 不用安裝任何東西，打開瀏覽器就能學。從「Chapter 0 行前準備」開始，教材會一步步帶你完成所有環境設定與實戰演練。

> ⚠️ **請不要直接點開 repo 裡的 `index.html`**——那是原始碼，用瀏覽器直接開啟不會有任何畫面。請走上面的線上版連結。

---

## 🧱 技術棧

- **React** + **Vite** — 互動教學元件與開發/建置工具
- **Tailwind CSS** — 樣式系統
- 部署：GitHub Pages（`gh-pages` branch）

## 📁 專案結構

```text
Trainer_Git_Tutorial/
├── src/
│   ├── components/      # 各個互動章節的獨立元件 (Chapter 0 ~ 8)
│   ├── App.jsx          # 主要應用程式（匯整所有章節）
│   ├── main.jsx         # React 入口
│   └── index.css        # 全域樣式（Tailwind）
├── public/              # 靜態資源
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🛠 貢獻者・教學者專區

> 以下內容給維護本教材、或帶課的教學者使用；學員不需要看這一區。

### 教學者專區：作業收件與審查

學員完成 L0–L8 後，在新的 `git-homework` 建立自己的 Public repo，於自己的 PR 描述寫 `@BlekZz 請 review` 交件。講師核准後，由學員自己合併並同步回本機。

[開啟講師收件匣](https://github.com/search?q=is%3Apr+mentions%3ABlekZz&type=pullrequests)（與 `src/config.js` 的 `INSTRUCTOR_INBOX_URL` 相同）。搜尋條件是 `is:pr mentions:BlekZz`；只看待審時加上 `is:open`。

![你會看到提及講師的 PR 搜尋結果](public/screenshots/HW-inbox-search.png)

已登入講師帳號的 GitHub CLI 也可列出 PR 網址與狀態：

```bash
gh search prs --mentions BlekZz --json url,state
```

結果是含 `url`、`state` 的 JSON 清單；無符合結果時為空清單。換講師時，把 `BlekZz` 整個換成講師帳號，不加 `@` 或角括號。

本專案實測的 gh OAuth 權限下，notifications API 讀不到通知，因此不能用 `gh api notifications` 當作業收件匣；請用上述搜尋。網頁通知已驗證會收到 mention，與 CLI 讀不到通知是兩件事。

#### 作業驗收表

| 檢核項 | 在哪裡看 | 對應能力 |
|---|---|---|
| repo owner 是學員本人、Public | repo 首頁 | L6 |
| ≥3 個 commit，訊息有意義、作者頭像正確（email 綁定） | Commits 頁 | L0/L2/L3 |
| `.gitignore` 存在且生效 | 檔案列表 | L3 |
| 有一個 merge commit（本機 merge＋衝突解決） | Commits／Insights → Network 圖 | L4/L5 |
| PR base 是學員自己的 `main`、描述有 `@BlekZz` | PR 頁頂部 | L7 |
| 講師 Approve 後由學員 Merge（PR 狀態 Merged，時間線先 Approved 後 merged） | PR 時間線 | L7 |
| Merge 後 main 最新 commit 與學員本機 `git log -1` 相同（學員在 PR 留言貼截圖） | PR 留言 | L7/L8 |

檢查 `.gitignore` 時，同時確認指定的 `scratch.txt` 未出現在雲端檔案列表；學員在本機核對測試檔存在、但 status 不列為待加入。最後兩項在核准、合併後追查，第一次審查時不要求已完成。

#### 審查與退修流程

1. 從收件匣開啟 PR，先核對 owner、Public、base 與描述，再依上表查看既有 commit 紀錄。
2. 點 **Files changed**，會看到本次 PR 的檔案差異；點 **Review changes**，會開啟審查表單。
3. 符合前五項時選 **Approve**，按 **Submit review**；PR 的 Conversation 時間線會留下講師核准紀錄。Public repo 的非 collaborator 也能核准；不要叫學員找頁頂的 Approved 徽章，核准顯示在時間線。
4. 需要修正時，在審查表單寫清楚檔案、問題與預期結果，選 **Request changes** 並按 **Submit review**；學員會看到要求修改的審查紀錄。學員在原分支修改、commit、push 後，原 PR 自動更新，再留言「已修改，請再看一次」，講師重新審查。
5. 核准後讓學員按 **Merge pull request → Confirm merge**；PR 成為 Merged。學員回本機 main 同步，並在原 PR 留言附上本機與 GitHub main 最新 commit 編號相同的截圖，講師補查最後兩項。

![你會看到 Files changed 的 Review changes 表單與 Approve 選項](public/screenshots/HW-review-approve.png)

### 🚀 快速開始（本機開發）

```bash
git clone https://github.com/BlekZz/Trainer_Git_Tutorial.git
cd Trainer_Git_Tutorial
npm install
npm run dev
```

接著打開瀏覽器，前往 `http://localhost:5173/` 即可預覽。需求：Node.js 20+、Git。

### 🔧 教學者快速重置

若實習生環境損壞：

```bash
git reset --hard
git pull
npm install
```

> ⚠️ **警告**：`git reset --hard` 會將所有未儲存的本地修改清空。如果有重要的修改還沒有 commit，請先備份！

### 🔩 維護紀錄

**線上版網址**：https://blekzz.github.io/Trainer_Git_Tutorial/

**Branch 說明**

| Branch | 用途 |
|--------|------|
| `main` | 原始碼，日常開發與維護 |
| `gh-pages` | 自動產生的 build 產物，勿手動修改 |

**日常指令**

```bash
# 本地開發
npm run dev

# 更新線上版（會自動 build 再推到 gh-pages）
npm run deploy

# 備份版本到 main
git add .
git commit -m "feat: ..."
git push
```

> `npm run deploy` 和 `git push` 互相獨立，兩個都要跑才能同時更新線上版與原始碼備份。

---

## 📄 License

MIT
