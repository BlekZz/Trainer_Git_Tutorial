# Git Time Machine — 改善指令文件

> **目標受眾**：完全沒碰過 Terminal 的文組零基礎學習者
> **執行者**：Claude Code 或其他 AI coding assistant
> **前提**：不包含部署相關作業

---

## 任務總覽

| # | 類型 | 檔案 | 優先級 |
|---|------|------|--------|
| 1 | 修改 | `Beginner-Setup-Guide.md` | 🔴 P0 |
| 2 | 修改 | `README.md` | 🔴 P0 |
| 3 | 新建 | `learner-commits/example-blake.md` | 🔴 P0 |
| 4 | 修改 | `src/App.jsx` | 🟡 P1 |
| 5 | 修改 | `src/components/Chapter5Branch.jsx` | 🟡 P1 |
| 6 | 修改 | `src/components/Chapter6Sync.jsx` | 🟡 P1 |
| 7 | 修改 | `src/components/Chapter7Team.jsx` | 🟡 P1 |
| 5 | 修改 | `src/components/Chapter5Branch.jsx` | 🟡 P1 |
| 6 | 修改 | `src/components/Chapter6Sync.jsx` | 🟡 P1 |
| 7 | 修改 | `src/components/Chapter7Team.jsx` | 🟡 P1 |

---

## 任務 1：修改 `Beginner-Setup-Guide.md`

### 問題描述
目前 Guide 在步驟五（安裝 VSCode 外掛）後直接結束，用一個連結導回 README 的「快速開始」段落。對剛學完開 Terminal 的零基礎用戶，這個跳躍缺乏橋接說明，會造成認知斷層與恐慌。此外，GitHub CLI 出現在步驟二但用途要到 Chapter 7-8 才解釋，動機不清。

### 修改內容

**A. 調整步驟二的 GitHub CLI 說明語氣**

找到以下段落：
```
### 4. 下載並安裝 GitHub CLI (gh) 🌟 必學！
這是 GitHub 官方出的超強工具，可以讓你不用打開瀏覽器，直接在電腦裡發 Pull Request！
```

改為：
```
### 4. 下載並安裝 GitHub CLI (gh)
這是 GitHub 官方出的指令工具。現在你可能還不知道它是幹嘛的，但在最後一個章節「發起你的第一個 PR」時，它會讓整個流程快很多。先裝好備用！
```

**B. 刪除原本的最後一段（準備完成區塊）**

找到並刪除以下整段：
```
## 🎉 準備完成！前往下一步

恭喜你！你的電腦已經完全準備好了。
現在，請點擊以下連結回到 README 文件，並從**「🚀 快速開始」**照著步驟把教學專案跑起來！

👉 **[點我回到 README 快速開始](./README.md#🚀-快速開始-適合已經裝好-nodejs-與-git-的人)**
```

**C. 在原位置替換成新的步驟六**

在檔案末尾加入以下完整內容：

````markdown
---

## 🎉 步驟六：把教學網頁跑起來！

恭喜你！軟體都裝好了。現在，我們要把這個教學網頁真正「啟動」在你的電腦上。
請打開 VSCode 內建終端機（`Terminal` → `New Terminal`），然後依序輸入以下四行指令。

> ⚠️ **每輸入一行，請按一次 Enter，等畫面停止跑動後，再輸入下一行。**

---

### 第一行：下載教材到你的電腦

```bash
git clone https://github.com/BlekZz/git-time-machine.git
```

✅ **成功長這樣**：你會看到 `Receiving objects: 100%`，最後沒有紅色文字。

---

### 第二行：進入剛下載的資料夾（這步非常容易被忘記！）

```bash
cd git-time-machine
```

✅ **成功長這樣**：終端機的提示字元裡會出現 `git-time-machine` 字樣，例如 `~/git-time-machine $`。

> 💡 **`cd` 是什麼？** `cd` = Change Directory（切換資料夾）。就像你在 Finder / 檔案總管裡雙擊進入一個資料夾，只是用打字的方式。**如果你跳過這步，後面所有指令都會失敗。**

---

### 第三行：下載工具包（這步會跑比較久）

```bash
npm install
```

⏳ **這步正常現象說明（請仔細閱讀）**：

| 你看到的畫面 | 代表什麼 | 該怎麼做 |
|---|---|---|
| 一堆文字滾動，感覺跑不完 | 正在從網路下載工具，正常 | 耐心等待 |
| 黃色的 `npm warn deprecated` | 版本過舊警告，完全不影響使用 | 忽略 |
| `found X vulnerabilities` | 安全性提示，不影響教學 | 忽略 |
| 最後出現 `added X packages` | 🎉 安裝成功！ | 繼續下一步 |
| 紅色的 `ERR!` 或 `error` | 真正的錯誤 | 截圖給老師 |

---

### 第四行：啟動教學網頁！

```bash
npm run dev
```

✅ **成功長這樣**：你會看到：
```
VITE v7.x.x  ready in X ms

➜  Local:   http://localhost:5173/
```

看到這個畫面後，打開你的瀏覽器（Chrome / Edge / Safari），在網址列輸入：

```
http://localhost:5173/
```

按下 Enter，教學網頁就會出現了！🎉

---

> 🛑 **關閉教學網頁的方法**：回到終端機，按下鍵盤上的 `Ctrl + C`（Mac 也是 Ctrl，不是 Command），網頁就會停止運作。下次要再開，重新執行 `npm run dev` 即可。
````

---

## 任務 2：修改 `README.md`

### 問題描述
1. 「快速開始」標題副標寫著「適合已經裝好 Node.js 與 Git 的人」，容易讓剛做完 Guide 的人誤以為這段不是寫給自己的。
2. 缺少線上版入口佔位（為日後部署預留）。
3. npm install 的警告說明埋在小引言框，不夠顯眼。

### 修改內容

**A. 修改快速開始的標題**

找到：
```markdown
## 🚀 快速開始 (適合已經裝好 Node.js 與 Git 的人)
```

改為：
```markdown
## 🚀 快速開始

> 💡 **零基礎的同學**：如果你還沒裝好 Node.js 和 Git，請先閱讀 [👶 零基礎新手安裝與準備指南](./Beginner-Setup-Guide.md)。那份指南的最後會直接帶你完成以下步驟，不用再回來這裡。
```

**B. 在 README 最頂部的 warning 區塊下方加入線上版入口佔位**

找到：
```markdown
> ⚠️ **【完全零基礎的新手請注意】** ⚠️
>
> 如果你是完全沒有接觸過寫程式、終端機（Terminal）或 Git 的小白，請**務必先閱讀** [👶 零基礎新手安裝與準備指南](./Beginner-Setup-Guide.md)！
> 它會教你如何打開終端機，並一步一步在 Windows/Mac 上安裝必備軟體。請完成那份指南後，再回來繼續往下看。
```

在這段**之前**插入：

```markdown
## 🌐 不想安裝任何東西？

> **線上版即將推出** — 部署完成後，你可以直接在瀏覽器裡學習，不需要安裝任何軟體。

---

```

**C. 加強 npm install 的警告說明可見度**

找到：
```markdown
> **⏳ 等待與驗證**：這一步會去網路上抓取執行網頁所需的工具，**如果畫面卡住還在跑，請耐心等待安裝**。如果看到 `added X packages, and audited X packages in X s`，代表已經安裝完畢！若出現 npm vulnerability 警告，不用理會即可。
```

改為：

```markdown
> **⏳ 等待與驗證**：這一步會從網路下載工具，畫面會跑很多文字，屬於正常現象。
>
> - 黃色 `npm warn deprecated` → 正常，忽略
> - `found X vulnerabilities` → 正常，忽略
> - 最後出現 `added X packages` → ✅ 安裝成功
> - 紅色 `ERR!` → 真正的錯誤，截圖給老師
```

**D. 修正 FAQ 表格中的 Node 版本說明**

找到：
```markdown
| `npm install` 失敗 | 確認 Node.js 版本 ≥ 18，使用 PowerShell 或 VSCode Terminal |
```

改為：
```markdown
| `npm install` 失敗 | 確認 Node.js 版本 ≥ 20（在終端機輸入 `node -v` 確認），使用 PowerShell 或 VSCode Terminal |
```

---

## 任務 3：新建 `learner-commits/example-blake.md`

### 問題描述
Chapter 8 要求學習者在 `learner-commits/` 目錄下新增 `.md` 檔案，但這個目錄在 repo 裡不存在。學習者打開 VSCode 找不到這個資料夾，會不知道自己哪裡做錯。

### 修改內容

在 repo 根目錄下**新建**以下兩個檔案：

**`learner-commits/.gitkeep`**（空檔案，確保空目錄能被 Git 追蹤）

內容：空（零位元組檔案）

---

**`learner-commits/example-blake.md`**（範例檔案）

內容：
```markdown
# 學員筆記 - Blake（範例）

> 這是一個範例檔案，讓你知道你的筆記應該放在哪裡、格式大概長什麼樣子。

## 我學到了什麼

- Git 就像遊戲存檔點，Commit 一次等於按下存檔
- Branch 是平行宇宙，搞砸了不影響主線
- Push 前記得先 Pull，否則會被 rejected

## 我的第一個感想

（在這裡寫你自己的感想，然後把這個檔案複製一份，改成你自己的名字！）
```

---

## 任務 4：修改 `src/App.jsx`

### 問題描述
導覽列在手機寬度（`sm` breakpoint 以下）的降級顯示使用 `tab.id.toUpperCase().substring(0,4)`，產生 `CONC`, `FLOW`, `PATH`, `BRAN`, `SYNC`, `TEAM`, `PRAC` 等縮寫。對零基礎學習者完全無法從縮寫判斷章節內容，破壞導覽可用性。

### 修改內容

找到以下這段（在 `tabs.map` 的 `return` 內部）：

```jsx
{tab.icon}
<span className="hidden sm:inline">{tab.label}</span>
<span className="sm:hidden">{tab.id.toUpperCase().substring(0,4)}</span>
```

改為：

```jsx
{tab.icon}
<span className="hidden sm:inline">{tab.label}</span>
<span className="sm:hidden">Ch.{tabs.indexOf(tab) + 1}</span>
```

> ⚠️ **注意**：`tabs.indexOf(tab)` 需要 `tabs` 在 `map` 的 scope 內可被存取。確認 `tabs.map(tab => ...)` 的寫法下 `tabs` 是外層變數，這在現有程式碼結構中是成立的。若執行時有問題，可改用 `index` 參數：將 `tabs.map(tab =>` 改為 `tabs.map((tab, index) =>`，然後使用 `Ch.{index + 1}`。

---

## 任務 5：修改 `src/components/Chapter5Branch.jsx`

### 問題描述
Chapter 5 分支視覺圖使用硬編碼的 SVG 絕對座標（像素值），導致在不同視窗寬度下節點與連線錯位，在手機或小視窗尤其明顯。需改為相對定位方案，讓圖形在任意寬度下都能正確呈現。

### 修改內容

**找到「團隊協作的大局觀」卡片內的 SVG 分支示意圖**

這段程式碼的特徵是開頭有一個 `<div className="relative w-full h-64 overflow-x-auto ...">` 的容器，裡面包含一個 `<svg viewBox="0 0 700 256">` 的固定尺寸 SVG。

**將整個 SVG 容器替換為以下內容：**

```jsx
<div className="w-full overflow-x-auto">
  <div style={{ minWidth: '600px' }}>
    <svg
      viewBox="0 0 700 256"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ maxHeight: '256px' }}
    >
      {/* Main Line */}
      <line x1="0" y1="128" x2="700" y2="128" stroke="#cbd5e1" strokeWidth="6" />

      {/* Pink (UI) Branch: y=48 */}
      <path d="M 100 128 C 130 128, 140 48, 180 48 L 320 48 C 360 48, 370 128, 400 128" fill="none" stroke="#ec4899" strokeWidth="5" />

      {/* Blue (API) Branch: y=168 */}
      <path d="M 260 128 C 290 128, 300 168, 340 168 L 360 168 C 380 168, 390 128, 400 128" fill="none" stroke="#3b82f6" strokeWidth="5" />

      {/* Yellow (DB) Branch: y=218 */}
      <path d="M 100 128 C 130 128, 140 218, 180 218 L 450 218 C 500 218, 510 128, 550 128" fill="none" stroke="#eab308" strokeWidth="5" />

      {/* v1.0 Base */}
      <circle cx="100" cy="128" r="10" fill="#6366f1" stroke="white" strokeWidth="4" />
      <text x="100" y="152" fill="#475569" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">v1.0</text>

      {/* Pink Nodes */}
      <circle cx="180" cy="48" r="8" fill="#ec4899" stroke="white" strokeWidth="3" />
      <text x="180" y="32" fill="#be185d" fontSize="12" textAnchor="middle" fontWeight="bold">feat/ui</text>
      <circle cx="320" cy="48" r="8" fill="#ec4899" stroke="white" strokeWidth="3" />

      {/* Blue Nodes */}
      <circle cx="340" cy="168" r="8" fill="#3b82f6" stroke="white" strokeWidth="3" />
      <text x="340" y="190" fill="#1d4ed8" fontSize="12" textAnchor="middle" fontWeight="bold">feat/api</text>

      {/* Yellow Nodes */}
      <circle cx="180" cy="218" r="8" fill="#eab308" stroke="white" strokeWidth="3" />
      <text x="180" y="240" fill="#a16207" fontSize="12" textAnchor="middle" fontWeight="bold">feat/db</text>
      <circle cx="450" cy="218" r="8" fill="#eab308" stroke="white" strokeWidth="3" />
      <text x="450" y="240" fill="#64748b" fontSize="11" textAnchor="middle">耗時較長的開發</text>

      {/* Merge Nodes */}
      <circle cx="400" cy="128" r="10" fill="#6366f1" stroke="white" strokeWidth="4" />
      <text x="400" y="152" fill="#475569" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">v1.1 (UI+API)</text>

      <circle cx="550" cy="128" r="10" fill="#6366f1" stroke="white" strokeWidth="4" />
      <text x="550" y="152" fill="#475569" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">v1.2 (DB)</text>
    </svg>
  </div>
</div>
```

> **修改說明**：原本的容器用了 `h-64` 固定高度 + 硬編碼像素，改為 `viewBox` 搭配 `w-full h-auto`，讓 SVG 等比例縮放。外層 `minWidth: 600px` 確保在極小螢幕上 SVG 不會被壓縮到無法辨識，而是改為橫向捲動。同時將 `v1.1` 的 label 縮短，避免文字超出 viewBox 邊界。

---

## 任務 6：修改 `src/components/Chapter6Sync.jsx`

### 問題描述
有兩個問題需要處理：
1. **Merge vs Rebase 區塊**對零基礎學習者屬於進階概念，放在基礎操作之後認知負荷落差過大，需加上「進階」標示讓學習者知道可以先跳過。
2. **GitHub CLI 的介紹**（`gh pr create` 指令）出現在 Chapter 6 的 Part 1 Push/Pull 說明區，但 CLI 的實際使用場景是 PR，應移至 Chapter 7。目前 Chapter 6 裡出現 CLI 相關說明會讓學習者困惑「這跟同步有什麼關係」。

### 修改內容

**A. 在 Merge vs Rebase section 加入進階標示**

找到以下這段（Part 3 的 section 開頭）：

```jsx
<section>
  <div className="flex items-center gap-2 mb-4">
    <Badge color="orange">Part 3</Badge>
    <h3 className="text-xl font-bold text-slate-800">Merge 與 Rebase：你喜歡怎樣的歷史？</h3>
  </div>
```

改為：

```jsx
<section>
  <div className="flex items-center gap-2 mb-2">
    <Badge color="orange">Part 3</Badge>
    <Badge color="gray">進階概念</Badge>
    <h3 className="text-xl font-bold text-slate-800">Merge 與 Rebase：你喜歡怎樣的歷史？</h3>
  </div>
  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800 flex items-start gap-2">
    <span className="text-lg leading-none mt-0.5">⭐</span>
    <span><strong>這是進階概念</strong>，第一次學習時看不懂完全正常。建議先完成 Chapter 7 和 8 的實戰演練，再回來看這裡。</span>
  </div>
```

**B. 移除 Chapter 6 中出現的 GitHub CLI 相關說明**

在 Chapter 6 的 Part 1（Push/Pull 互動模擬區）搜尋是否有包含 `gh` 或 `gh pr` 或 `GitHub CLI` 的文字說明，若有則刪除或改為普通的 git push 說明。

> **查找方式**：在 `Chapter6Sync.jsx` 全文搜尋 `gh ` 或 `cli` 或 `CLI`，確認是否存在並刪除。若搜尋結果為零則此步驟跳過。

---

## 任務 7：修改 `src/components/Chapter7Team.jsx`

### 問題描述
GitHub CLI（`gh pr create`）的介紹目前只在 Chapter 6 出現，但它的正確使用場景是 PR 流程，屬於 Chapter 7 的範疇。需要在 Chapter 7 的 PR 流程說明中，將 CLI 做更完整、更有脈絡的介紹，讓學習者知道「為什麼當初要裝這個工具」。

### 修改內容

找到 Chapter 7 的「Step 2：發起 Pull Request」區塊，目前內容是：

```jsx
<div className="bg-slate-900 rounded p-2 text-xs font-mono text-green-400">
  # 或是使用超快的 gh CLI 指令<br/>
  $ gh pr create
</div>
```

將整個 Step 2 的 Card 替換為以下內容：

```jsx
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-purple-200 bg-purple-50 shadow-sm relative">
  <div className="absolute -right-2 -top-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow animate-pulse">Action!</div>
  <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2"><Github size={16}/> 發起 Pull Request</h4>
  <p className="text-sm text-purple-800 mb-3">在 GitHub 網頁上點擊 "Compare & pull request"，寫下你做了什麼改變。</p>

  <div className="space-y-3">
    <div className="bg-white rounded border border-purple-100 p-3">
      <div className="text-xs font-bold text-slate-600 mb-2">🌐 方法一：瀏覽器操作（推薦初學者）</div>
      <ol className="text-xs text-slate-600 space-y-1 list-decimal pl-4">
        <li>打開 GitHub 專案頁面</li>
        <li>點擊黃色提示框的 <strong>Compare & pull request</strong></li>
        <li>寫標題，點 <strong>Create pull request</strong></li>
      </ol>
    </div>

    <div className="bg-slate-900 rounded p-3">
      <div className="text-xs font-bold text-green-400 mb-2">💻 方法二：GitHub CLI（記得嗎？這就是當初裝它的原因！）</div>
      <div className="font-mono text-xs text-green-400">
        $ gh pr create
      </div>
      <div className="text-[10px] text-slate-400 mt-2">
        這個工具在 Beginner-Setup-Guide 的步驟二安裝的。輸入這一行，它會互動式地問你標題、描述，幾秒內 PR 就建好了。
      </div>
    </div>
  </div>
</div>
```

---

## 執行後驗證清單

完成所有修改後，請逐項確認：

- [x] `Beginner-Setup-Guide.md` 不再有「點我回到 README」的結尾連結
- [x] `Beginner-Setup-Guide.md` 末尾有完整的步驟六，包含四行指令與驗證說明
- [x] `Beginner-Setup-Guide.md` 的 GitHub CLI 說明已移除「必學！」標示與過度承諾語氣
- [x] `README.md` 的快速開始標題不再出現「適合已經裝好 Node.js 與 Git 的人」
- [x] `README.md` 有線上版佔位區塊
- [x] `README.md` 的 npm install 說明有分項列出正常/異常現象
- [x] `README.md` 的 FAQ Node 版本要求已從 ≥ 18 修正為 ≥ 20
- [x] `learner-commits/` 目錄存在（含 `.gitkeep` 和 `example-blake.md`）
- [x] `src/App.jsx` 手機版 Tab 顯示為 `Ch.1` 至 `Ch.8`，而非亂碼縮寫
- [x] `Chapter5Branch.jsx` 的分支圖 SVG 容器改為 `w-full h-auto` 等比縮放，外層有 `minWidth: 600px` 橫向捲動保護
- [x] `Chapter6Sync.jsx` 的 Merge vs Rebase section 頂部有「進階概念」Badge 與提示文字
- [x] `Chapter6Sync.jsx` 內不再有獨立的 GitHub CLI 介紹段落
- [x] `Chapter7Team.jsx` 的 Step 2 PR 區塊同時包含瀏覽器操作說明與 CLI 操作說明，並有「這就是當初裝它的原因」的前後呼應文字

---

## 不在本次範圍內的事項

以下項目已確認**不處理**，留給後續版本：

- 部署至 GitHub Pages / Vercel（線上版）

---

*文件版本：v1.3 | 評估基準：git-time-machine@0.0.0 | 任務 1–7 全部完成並驗證 ✅ (2026-04-27)*
