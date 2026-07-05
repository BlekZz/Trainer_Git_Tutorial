# Git Time Machine 🚀

一個互動式 Git 教學網頁應用，透過視覺化模擬讓初學者從零開始理解版本控制。

## 🧭 選擇你的學習路徑

在開始之前，請先選一條適合你的路，不用兩條都看：

### 路徑一：線上版（推薦新手起步）

> **[👉 點此開啟線上版](https://blekzz.github.io/git-time-machine/)** — 不用安裝任何東西，直接在瀏覽器裡學習 Chapter 1～7。

到 **Chapter 8「實戰演練」**需要動手操作真實的 Git 指令時，教材會引導你回來完成安裝，現在不用先準備。

### 路徑二：完整實戰版（本機安裝）

如果你想從一開始就在自己電腦上動手操作，請跟著 [👶 零基礎新手安裝與準備指南](./Beginner-Setup-Guide.md) 把環境裝好。指南**手把手教你安裝必備軟體，並在最後直接帶你在本機啟動這個教學網頁**——完成指南後，你就可以直接開始學習，不需要回來看這份 README 的安裝步驟。

---

> ⚠️ **請不要直接點開 repo 裡的 `index.html`**——那是原始碼，用瀏覽器直接開啟不會有任何畫面。請走上面兩條路徑之一。

> ⚠️ **【完全零基礎的新手請注意】** ⚠️
>
> 如果你是完全沒有接觸過寫程式、終端機（Terminal）或 Git 的小白，建議直接走**路徑一**的線上版開始，壓力最小；等到 Chapter 8 要實戰交作業時，教材會提醒你回來完成 [👶 零基礎新手安裝與準備指南](./Beginner-Setup-Guide.md)。

---

### 📖 八大互動章節

| 章節 | 內容 | 互動方式 |
|------|------|----------|
| **1. 觀念與準備** | Git/GitHub/GitLab 比較表、Local 端身份設定、Git 時間線圖 | 靜態圖解 + 比較表 |
| **2. 流程總覽** | 情境 A (從零開始) 與 情境 B (參與現有專案) 路線差異 | 視覺化流程圖 |
| **3. 情境 A** | `git init` -> `add/commit` -> `remote add` -> `push` | 分步按鈕 + 動畫連線 + 模擬終端 |
| **4. 情境 B** | `git clone` -> `cd` -> `status` -> `add/commit` -> `push` | 分步按鈕 + 動畫連線 + 模擬終端 |
| **5. 分支跳躍** | 建立分支、切換分支、`checkout -b` | 平行宇宙狀態圖 + 模擬終端 |
| **6. 同步與衝突** | Push/Pull 差異、防呆模擬、衝突(Conflict)解決、Merge vs Rebase | 雙向 Timeline + 衝突解碼 + 程式碼 Diff |
| **7. 團隊與 PR** | PR 觀念解析 (版本迭代 vs 分支合併)、GitHub CLI 發起教學 | PR 一生流程圖 |
| **8. 實戰演練** | 新增個人筆記、建立分支、發起 Pull Request | Hands-on PR 實戰指南 + 驗證機制 |

### 🎨 設計亮點
- 全寬模擬終端機，真實還原指令操作體驗
- 即時視覺回饋（動畫、狀態變化、連線效果）
- 響應式設計，支援桌面與平板
- 繁體中文介面

---

## 🛠 環境需求

請確保你已經根據 [零基礎新手安裝與準備指南](./Beginner-Setup-Guide.md) 安裝好以下軟體：
- **Node.js** 20+
- **Git** 
- **VSCode** 搭配 Git Graph / GitLens 插件

---

## 📁 專案結構

```text
git-time-machine/
├── src/
│   ├── components/      # 各個互動章節的獨立元件 (Chapter 1 ~ 8)
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

## 🚀 快速開始 (老手專區)

> 💡 **零基礎新手請注意**：請直接前往 [👶 零基礎新手安裝與準備指南](./Beginner-Setup-Guide.md)，那裡有專為你寫的詳細圖文教學！

### 1. 下載本專案

```bash
git clone https://github.com/BlekZz/git-time-machine.git
cd git-time-machine
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

接著打開瀏覽器，前往 `http://localhost:5173/` 即可開始使用。

---

## ❓ 常見問題

| 問題 | 解決方法 |
|------|----------|
| `npm install` 失敗 | 確認 Node.js 版本 ≥ 20（在終端機輸入 `node -v` 確認），使用 PowerShell 或 VSCode Terminal |
| `npm run dev` 無畫面 | 確認瀏覽器已開啟 `http://localhost:5173/` |
| `git push` 沒權限（403） | 如果是對別人的 repo push，請先 Fork 再更新 remote URL（見 Chapter 8）。如果是登入問題，執行 `gh auth login` |
| `'git' is not recognized` / `command not found` | 剛裝完軟體嗎？請把 VSCode / 終端機**完全關掉重新打開**再試一次（新裝的軟體要新開的終端機才抓得到） |

---

## 🔧 教學者快速重置

若實習生環境損壞：

```bash
git reset --hard
git pull
npm install
```

> ⚠️ **警告**：`git reset --hard` 會將所有未儲存的本地修改清空。如果有重要的修改還沒有 commit，請先備份！

---

## 📄 License

MIT

---

## 🔩 維護紀錄

### 線上版網址

https://blekzz.github.io/git-time-machine/

### Branch 說明

| Branch | 用途 |
|--------|------|
| `main` | 原始碼，日常開發與維護 |
| `gh-pages` | 自動產生的 build 產物，勿手動修改 |

### 日常指令

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
