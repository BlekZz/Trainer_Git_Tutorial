# Git Time Machine — 改善指令文件 v2

> **目標受眾**：完全沒碰過 Terminal 的文組小白 + 會 Excel/Python 但沒有協作經驗的數據分析菜鳥
> **執行者**：Claude Code 或其他 AI coding assistant
> **前提**：本文件為 improvement-spec.md v1.2 的後續補丁，假設 v1.2 的所有任務已完成

---

## 任務總覽

| # | 類型 | 檔案 | 優先級 |
|---|------|------|--------|
| 1 | 修改 | `Beginner-Setup-Guide.md` | 🔴 P0 |
| 2 | 修改 | `README.md` | 🔴 P0 |
| 3 | 修改 | `src/components/Chapter1Concept.jsx` | 🟡 P1 |
| 4 | 修改 | `src/components/Chapter3PathA.jsx` | 🔴 P0 |
| 5 | 修改 | `src/components/Chapter4PathB.jsx` | 🔴 P0 |
| 6 | 修改 | `src/components/Chapter5Branch.jsx` | 🟡 P1 |
| 7 | 修改 | `src/components/Chapter6Sync.jsx` | 🟡 P1 |
| 8 | 修改 | `src/components/Chapter7Team.jsx` | 🟡 P1 |
| 9 | 修改 | `src/components/Chapter8Practice.jsx` | 🔴 P0 |
| 10 | 修改 | `learner-commits/example-blake.md` | 🟡 P1 |

---

## 任務 1：修改 `Beginner-Setup-Guide.md`

### 問題描述
三處 Node.js 版本說明矛盾（寫 v18，實際需求 v20+），且缺少「如何讓 VSCode 打開正確資料夾」的說明。

### 修改內容

**A. 修正步驟四的版本驗證說明**

找到：
```markdown
# 檢查 Node
node -v    
# 如果成功，會顯示 v18.x.x 等字樣
```

改為：
```markdown
# 檢查 Node
node -v    
# 如果成功，會顯示 v20.x.x 或 v22.x.x（本教材需要 v20 以上）
```

---

**B. 修正完成 Checklist 的版本說明**

找到以下表格中的這行：
```markdown
| Node.js 安裝 | `node -v` 顯示 v18+ 以上版本號 | ☐ |
```

改為：
```markdown
| Node.js 安裝 | `node -v` 顯示 v20+ 以上版本號 | ☐ |
```

---

**C. 在步驟六「第一行：下載教材」之前加入「先決定資料夾位置」的說明**

找到步驟六中以下段落（第一行指令的說明開頭）：

```markdown
### 第一行：下載教材到你的電腦
```

在這個標題**之前**插入：

```markdown
### 🗂 下載前準備：決定你的教材要放在哪裡

在你開始輸入指令之前，先花 30 秒想清楚：**你想把這份教材下載到電腦的哪個資料夾？**

> 建議放在桌面（Desktop）或「文件」（Documents）資料夾，方便以後找到。

**用 VSCode 打開你想要的資料夾（最推薦的方式）：**

1. 打開 VSCode
2. 點擊上方選單 `File` → `Open Folder`（Mac 是 `File` → `Open...`）
3. 選擇你想要的位置（例如桌面）然後點「選擇資料夾」
4. 接著點 `Terminal` → `New Terminal`，開啟終端機
5. 這樣終端機就會自動在你選的資料夾裡啟動

**如何確認終端機在正確的位置？**

在終端機裡輸入：
```bash
pwd
```

你會看到一行路徑，例如：
- Mac：`/Users/你的名字/Desktop`
- Windows：`C:\Users\你的名字\Desktop`

如果路徑是你想要的位置，就可以繼續了！
如果不對，用 `cd 資料夾名稱` 切換，例如 `cd Desktop` 切到桌面。

---
```

---

## 任務 2：修改 `README.md`

### 問題描述
`🛠 環境需求` 區塊寫的是 `Node.js 18+`，需更正為 20+。

### 修改內容

找到：
```markdown
- **Node.js** 18+ 
```

改為：
```markdown
- **Node.js** 20+
```

---

## 任務 3：修改 `src/components/Chapter1Concept.jsx`

### 問題描述
「你準備好了嗎？」區塊引導使用者去查看「專案根目錄的 Beginner-Setup-Guide.md」，但對線上版（部署後）的使用者，他找不到「專案根目錄」在哪裡，指引失效。

### 修改內容

找到：
```jsx
<p className="text-sm text-green-700">
  如果你還沒有安裝 Git, Node.js 或 VSCode，請立刻去查看專案根目錄的 <code className="bg-green-100 px-1 rounded">Beginner-Setup-Guide.md</code>。
  以下章節假設你已經安裝完畢，並且知道如何打開 Terminal（終端機）！
</p>
```

改為：
```jsx
<p className="text-sm text-green-700">
  如果你還沒有安裝 Git, Node.js 或 VSCode，請立刻查看{' '}
  <a href="https://github.com/BlekZz/git-time-machine/blob/main/Beginner-Setup-Guide.md"
     target="_blank" rel="noopener noreferrer"
     className="underline font-bold text-green-800 hover:text-green-900">
    👶 零基礎新手安裝與準備指南
  </a>
  （如果你已經下載了這個教材，也可以直接在資料夾裡找到 <code className="bg-green-100 px-1 rounded">Beginner-Setup-Guide.md</code>）。
  以下章節假設你已經安裝完畢，並且知道如何打開 Terminal（終端機）！
</p>
```

---

## 任務 4：修改 `src/components/Chapter3PathA.jsx`

### 問題描述
兩個問題：
1. 「進入狀態提示」要求使用者先在 GitHub 建好空白 Repository，但沒說建立時不能勾選「Initialize」，這是初學者最常踩的雷（勾了會導致 push 被 rejected）。
2. 模擬終端機和真實終端機的分工沒有說清楚，讓學習者不知道要點模擬按鈕還是去真實 Terminal 操作。

### 修改內容

**A. 強化「建立 GitHub Repository」的說明**

找到進入狀態提示中以下這段：

```jsx
<p className="text-sm text-slate-300"><strong className="text-white">先在 GitHub 網頁上建好一個空白的新 Repository，</strong>（點擊右上角的 "+" 或尋找綠色的 🟩 <strong>New</strong> 按鈕），然後複製它的 HTTPS 網址備用（格式： <code className="text-slate-300 bg-slate-700 px-1 rounded">https://github.com/你的帳號/專案名.git</code>）。</p>
```

改為：

```jsx
<div className="flex items-start gap-3">
  <span className="text-blue-400 text-base leading-none mt-0.5">📂</span>
  <div className="text-sm text-slate-300">
    <strong className="text-white">先在 GitHub 網頁上建好一個空白的新 Repository：</strong>
    <ol className="list-decimal pl-5 mt-2 space-y-1 text-slate-300">
      <li>登入 GitHub，點右上角的 <strong className="text-white">"+"</strong> → <strong className="text-white">New repository</strong></li>
      <li>取一個 Repository 名稱（例如 <code className="bg-slate-700 px-1 rounded">my-first-repo</code>）</li>
      <li>選擇 <strong className="text-white">Public</strong></li>
      <li className="text-red-300 font-bold">⚠️ 關鍵：「Add a README file」、「Add .gitignore」、「Choose a license」這三個選項全部<strong>不要勾選</strong>，保持完全空白！（勾了會造成歷史衝突，Push 時會被拒絕）</li>
      <li>點 <strong className="text-white">Create repository</strong>，然後複製頁面上的 HTTPS 網址備用（格式：<code className="bg-slate-700 px-1 rounded text-slate-300">https://github.com/你的帳號/專案名.git</code>）</li>
    </ol>
  </div>
</div>
```

---

**B. 在互動面板標題旁加入模擬器說明**

找到：
```jsx
<h3 className="font-bold text-slate-700 flex items-center gap-2"><PlusCircle size={18} /> 操作步驟</h3>
```

改為：
```jsx
<div className="flex justify-between items-start mb-1">
  <h3 className="font-bold text-slate-700 flex items-center gap-2"><PlusCircle size={18} /> 操作步驟</h3>
</div>
<div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3 text-xs text-blue-800 flex items-start gap-2">
  <span className="shrink-0 mt-0.5">💡</span>
  <span>以下是<strong>示意模擬</strong>，點「執行」可以看到邏輯流程。<strong>實際操作請在你電腦真正的 Terminal 裡輸入同樣的指令。</strong></span>
</div>
```

> ⚠️ **注意**：同時移除原本的 `<div className="flex justify-between items-center mb-4">` 的舊 `mb-4`，改為 `mb-1`，以配合新結構。若原本的按鈕外層結構略有不同，請以保持視覺一致為準進行微調。

---

**C. 在 .gitignore 說明加入數據分析版本**

找到 `.gitignore` 的 Card（特徵是標題有 `ShieldAlert` 圖示，內容有「防雷神針」），在其現有的程式碼區塊後加入：

```jsx
<div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
  <div className="text-xs font-bold text-purple-800 mb-2">📊 數據分析菜鳥版（Python / Jupyter）</div>
  <div className="bg-slate-900 rounded p-2 font-mono text-xs text-green-400">
    # Python 數據分析常見需要忽略的<br/>
    __pycache__/<br/>
    .ipynb_checkpoints/<br/>
    .env<br/>
    *.pyc<br/>
    data/raw/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 原始資料通常不放 Git
  </div>
</div>
```

---

## 任務 5：修改 `src/components/Chapter4PathB.jsx`

### 問題描述
情境 B 是 Clone 現有 repo，但使用者對 `git-time-machine` 這個 repo 沒有寫入權限，直接 `git push` 會得到 403 Permission Denied。這個死胡同需要被解釋清楚，並引導使用者用「建立自己的 Branch 再 Push 到自己的 Fork」的方式繼續練習 Push 動作。同時，互動模擬器省略了 `git add` 步驟，需要拆成兩步。

### 修改內容

**A. 在進入狀態提示加入權限說明與解決方案**

找到進入狀態提示中「你的 GitHub 帳號需要有這個 Repository 的存取權」相關段落，將整段替換為：

```jsx
<div className="flex items-start gap-3">
  <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
  <div className="text-sm text-slate-300">
    <strong className="text-white">關於 Push 權限：你需要了解這件事！</strong>
    <p className="mt-1">如果你是 Clone 別人的 repo（包括這個教學 repo），你沒有直接 Push 到對方 main 分支的權限。直接 `git push` 會得到 <code className="bg-slate-700 px-1 rounded text-red-300">403 Permission Denied</code>。</p>
    <p className="mt-2 text-slate-400">這是正常的，代表保護機制在正常運作！</p>
    <div className="mt-2 bg-slate-700/50 rounded-lg p-3 space-y-1">
      <div className="text-white font-bold text-xs">✅ 本章的練習方式：</div>
      <p className="text-xs">我們會在模擬中示範 Push 的流程。真正練習 Push，請等到 <strong className="text-white">Chapter 8 實戰演練</strong>——那裡你會先建立自己的 Branch，再 Push 這個分支，就不會有權限問題。</p>
      <p className="text-xs text-slate-400 mt-1">（Branch 的概念會在 Chapter 5 詳細說明，這裡只需要知道：有了自己的 Branch 就可以合法 Push！）</p>
    </div>
  </div>
</div>
```

---

**B. 在互動面板加入模擬器說明**

找到情境 B 的互動面板標題：
```jsx
<h3 className="font-bold text-slate-700 flex items-center gap-2"><Download size={18} /> 操作步驟</h3>
```

在標題下方加入（參考 Chapter 3 同樣的模式）：
```jsx
<div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3 text-xs text-blue-800 flex items-start gap-2">
  <span className="shrink-0 mt-0.5">💡</span>
  <span>以下是<strong>示意模擬</strong>，點「執行」可以看到邏輯流程。<strong>實際操作請在你電腦真正的 Terminal 裡輸入同樣的指令。</strong>關於 Push 的實際練習，請等到 Chapter 8。</span>
</div>
```

---

**C. 將互動步驟的 Commit 按鈕拆分為 Add + Commit 兩步**

找到 Step 4（特徵是 `$ git add . <br/>$ git commit -m "..."`）的整個 `<div>` 區塊：

```jsx
{/* Step 4 */}
<div className={`p-3 border rounded-lg transition-all ${step === 3 ? ...}`}>
  <div className="flex items-center justify-between">
    <div className="font-mono text-sm text-slate-700">$ git add . <br/>$ git commit -m "..."</div>
    <button onClick={handleCommit} ...>
```

將這一個步驟拆為兩個步驟。**這需要同時修改 state 邏輯**，請按以下方式調整：

**State 調整**：原本 `step` 從 0 到 5，現在插入一個 3.5 的概念，最簡單的方式是把 step 上限從 5 改為 6，並相應調整所有 step 數值：
- 原 step 3（add/commit 合一）→ 拆為 step 3（add）和 step 4（commit）
- 原 step 4（push）→ 改為 step 5
- 原 step 5（done）→ 改為 step 6

```jsx
// 新的 handleAdd 函數（插在 handleCommit 前）
const handleAdd = () => {
  if (step >= 4) return; // step 4 以上才算 Add 完成
  addLog('git add .', 'input', 'cool-project $');
  setTimeout(() => {
    addLog('Changes staged for commit.', 'success');
    setStep(4);
  }, 300);
};

// 修改 handleCommit，條件改為 step === 4
const handleCommit = () => {
  if (step !== 4) return;
  addLog('git commit -m "Add new feature"', 'input', 'cool-project $');
  setTimeout(() => {
    addLog('[main 7f8g9h] Add new feature', 'success');
    setStep(5);
  }, 400);
};

// handlePush 條件改為 step === 5，done 改為 step >= 6
const handlePush = () => {
  if (step >= 6) return;
  // ...保持原本內容，最後 setStep(6)
};

// reset 保持 setStep(0)
```

**UI 調整**：把原本的 Step 4 區塊替換為兩個區塊：

```jsx
{/* Step 4a: git add */}
<div className={`p-3 border rounded-lg transition-all ${step === 3 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 3 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
  <div className="flex items-center justify-between">
    <div className="font-mono text-sm text-slate-700">$ git add .</div>
    <button onClick={handleAdd} disabled={step !== 3} className={`px-3 py-1 rounded text-xs font-bold text-white ${step > 3 ? 'bg-green-500' : step === 3 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-300'}`}>
      {step > 3 ? '完成' : '執行'}
    </button>
  </div>
  <div className="text-xs text-slate-500 mt-2">把修改過的檔案放進「暫存區」，準備好存檔。（實際操作中這步不能省！）</div>
</div>

{/* Step 4b: git commit */}
<div className={`p-3 border rounded-lg transition-all ${step === 4 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 4 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
  <div className="flex items-center justify-between">
    <div className="font-mono text-sm text-slate-700">$ git commit -m "Add new feature"</div>
    <button onClick={handleCommit} disabled={step !== 4} className={`px-3 py-1 rounded text-xs font-bold text-white ${step > 4 ? 'bg-green-500' : step === 4 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-300'}`}>
      {step > 4 ? '完成' : '執行'}
    </button>
  </div>
  <div className="text-xs text-slate-500 mt-2">正式建立快照！<code>-m</code> 後面是這次存檔的說明文字。</div>
</div>

{/* Step 5: git push — 調整 step 條件為 step === 5 / step > 5 */}
```

> ⚠️ **注意**：調整完 step 數值後，Visual Feedback 區塊裡所有用 `step >= X` 或 `step === X` 判斷顯示狀態的地方，也需要同步更新數字。請逐行確認。

---

## 任務 6：修改 `src/components/Chapter5Branch.jsx`

### 問題描述
進入狀態提示缺少「切換分支前確認工作區是乾淨的」警告，這是初學者（尤其是習慣不存檔的數據分析菜鳥）必踩的雷。

### 修改內容

找到 Chapter 5 的進入狀態提示區塊（特徵是有 `⚡ 進入狀態：讀完再動` 的文字），在最後一個 `<div className="flex items-start gap-3">` 區塊後加入：

```jsx
<div className="flex items-start gap-3">
  <span className="text-red-400 text-base leading-none mt-0.5">⚠️</span>
  <p className="text-sm text-slate-300">
    <strong className="text-white">切換分支前，先確認工作區是乾淨的！</strong>
    輸入 <code className="bg-slate-700 px-1 rounded">git status</code>，確認顯示 <code className="bg-slate-700 px-1 rounded">nothing to commit</code>，再執行 checkout。
    <span className="block text-slate-400 text-xs mt-1">
      如果你有未完成的修改，切換分支時 Git 可能會把那些修改「帶過去」，讓你以為自己搞壞了。
      解法：先 <code className="bg-slate-600 px-1 rounded">git commit</code>（建議）或 <code className="bg-slate-600 px-1 rounded">git stash</code>（暫時保存），再切換。
    </span>
  </p>
</div>
```

---

## 任務 7：修改 `src/components/Chapter6Sync.jsx`

### 問題描述
兩個問題：
1. Part 2 衝突解決說明只說「打開 VSCode 解決後重新 Commit」，但沒說解決後還需要 `git add .` 才能完成 Merge。
2. 互動模擬中「修改檔案」→「存檔 (Commit)」省略了 `git add` 步驟，會讓學習者以為 Commit 前不需要 add。

### 修改內容

**A. 衝突解決說明加入「後續步驟」**

找到 Part 2 說明的結尾段落：

```jsx
<p className="text-sm text-slate-600 mt-4 text-center">
  當兩個人「剛好改到了同一個檔案的同一行」，Git 會不知道該聽誰的，這時候就會爆發 <strong>Conflict</strong>。<br/>
  解法很簡單：打開 VSCode，它會高亮衝突的地方，讓你手動選擇要保留 A、保留 B，還是兩者都保留，然後重新 Commit！
</p>
```

改為：

```jsx
<p className="text-sm text-slate-600 mt-4 text-center">
  當兩個人「剛好改到了同一個檔案的同一行」，Git 會不知道該聽誰的，這時候就會爆發 <strong>Conflict</strong>。
</p>
<div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-700">
  <div className="font-bold mb-3">🛠 解決衝突的完整流程：</div>
  <ol className="space-y-2 list-decimal pl-5">
    <li>打開 VSCode，找到被高亮標示衝突的檔案（側邊欄會有紅色驚嘆號）</li>
    <li>在衝突標記之間選擇：保留「你的修改」、「對方的修改」，或兩者都保留</li>
    <li>存檔並關閉衝突標記</li>
    <li className="font-bold text-indigo-700">執行 <code className="bg-indigo-50 px-1 rounded">git add .</code>（這步很多人忘記！解決完衝突還需要重新暫存）</li>
    <li className="font-bold text-indigo-700">執行 <code className="bg-indigo-50 px-1 rounded">git commit</code>（不需要加 -m，Git 會自動產生 Merge Commit 訊息）</li>
  </ol>
  <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-2 text-xs text-amber-800">
    ⚠️ 少做第 4 步是最常見的錯誤——解決完衝突直接 push，Git 會說「還有未解決的 merge」，讓你以為沒有修好。
  </div>
</div>
```

---

**B. 修改互動面板的操作按鈕說明**

找到 Part 1 控制面板中的「2. 存檔 (Commit)」按鈕：

```jsx
<button 
  onClick={() => doCommit()}
  disabled={!pendingChanges}
  className={...}
>
  <span className="flex items-center gap-2"><GitCommit size={16} /> 2. 存檔 (Commit)</span>
</button>
```

改為在按鈕後加一個小提示：

```jsx
<button 
  onClick={() => doCommit()}
  disabled={!pendingChanges}
  className={...}
>
  <span className="flex items-center gap-2"><GitCommit size={16} /> 2. 暫存 + 存檔 (add + commit)</span>
</button>
<div className="text-[10px] text-slate-400 pl-1">
  ⚠️ 模擬中合併為一步，實際 Terminal 需先 <code>git add .</code> 再 <code>git commit -m "..."</code>
</div>
```

---

## 任務 8：修改 `src/components/Chapter7Team.jsx`

### 問題描述
Step 2「發起 Pull Request」缺少 PR 標題的示範，使用者在空白框前不知道要寫什麼。

### 修改內容

找到 Step 2 的瀏覽器操作說明（`🌐 方法一`）的 `<ol>` 清單，在第三個 `<li>` 後加入示範：

找到：
```jsx
<ol className="text-xs text-slate-600 space-y-1 list-decimal pl-4">
  <li>打開 GitHub 專案頁面</li>
  <li>點擊黃色提示框的 <strong>Compare & pull request</strong></li>
  <li>寫標題，點 <strong>Create pull request</strong></li>
</ol>
```

改為：
```jsx
<ol className="text-xs text-slate-600 space-y-1 list-decimal pl-4">
  <li>打開 GitHub 專案頁面</li>
  <li>點擊黃色提示框的 <strong>Compare & pull request</strong></li>
  <li>
    寫標題與描述，點 <strong>Create pull request</strong>
    <div className="mt-1 bg-slate-50 border border-slate-200 rounded p-2 font-mono text-[10px] text-slate-600">
      <div className="text-slate-400 mb-1">標題範例：</div>
      <div>feat: 新增 your-name 的學習筆記</div>
      <div className="text-slate-400 mt-1 mb-1">描述範例：</div>
      <div>這是我的第一個 PR，包含了 Chapter 8 實戰演練中新增的個人筆記。</div>
    </div>
  </li>
</ol>
```

---

## 任務 9：修改 `src/components/Chapter8Practice.jsx`

### 問題描述
四個問題：
1. 缺少「開始作業前，確認你的起始狀態」的全局導覽，學習者不知道自己的 Terminal 應該在哪個目錄、哪個分支。
2. Step 3 說「在 learner-commits 目錄下新增一個檔案」，但沒說怎麼在 VSCode 裡建立新檔案。
3. Step 5 的方法二（gh CLI）沒說要先確認 `gh auth status`。
4. Chapter 結尾缺少「PR 送出後會發生什麼」的說明，讓學習者有完整的閉環。

### 修改內容

**A. 在 InstructionalText（任務說明）後加入「確認起始狀態」區塊**

找到 Part 1 中的 `<InstructionalText>` 結尾 `</section>` 之後，`{/* Part 2 */}` 之前，插入：

```jsx
{/* 起始狀態確認 */}
<section>
  <Card className="bg-slate-800 border-slate-700">
    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">🧭 開始作業前：確認你的位置</div>
    <p className="text-sm text-slate-300 mb-4">在開始之前，請打開你的 Terminal，逐行輸入以下指令確認狀態：</p>
    
    <div className="space-y-3">
      <div className="bg-slate-900 rounded-lg p-4 space-y-3">
        <div>
          <div className="text-xs text-slate-400 mb-1">① 確認你在 git-time-machine 資料夾內</div>
          <div className="font-mono text-sm text-green-400">$ pwd</div>
          <div className="text-xs text-slate-400 mt-1">✅ 應看到路徑結尾是 <code className="bg-slate-700 px-1 rounded">git-time-machine</code></div>
          <div className="text-xs text-red-400 mt-0.5">❌ 如果不對：輸入 <code className="bg-slate-700 px-1 rounded">cd 路徑/git-time-machine</code> 切換過去</div>
        </div>
        
        <div>
          <div className="text-xs text-slate-400 mb-1">② 確認你在 main 分支</div>
          <div className="font-mono text-sm text-green-400">$ git branch</div>
          <div className="text-xs text-slate-400 mt-1">✅ 有星號（*）的那行應該是 <code className="bg-slate-700 px-1 rounded">* main</code></div>
          <div className="text-xs text-red-400 mt-0.5">❌ 如果不對：輸入 <code className="bg-slate-700 px-1 rounded">git checkout main</code> 切換回來</div>
        </div>
        
        <div>
          <div className="text-xs text-slate-400 mb-1">③ 確認工作區是乾淨的</div>
          <div className="font-mono text-sm text-green-400">$ git status</div>
          <div className="text-xs text-slate-400 mt-1">✅ 應看到 <code className="bg-slate-700 px-1 rounded">nothing to commit, working tree clean</code></div>
          <div className="text-xs text-red-400 mt-0.5">❌ 如果有未存檔的修改：先 <code className="bg-slate-700 px-1 rounded">git stash</code> 暫存起來，完成作業後再處理</div>
        </div>
        
        <div>
          <div className="text-xs text-slate-400 mb-1">④ 確認本地已和雲端同步</div>
          <div className="font-mono text-sm text-green-400">$ git pull</div>
          <div className="text-xs text-slate-400 mt-1">✅ 看到 <code className="bg-slate-700 px-1 rounded">Already up to date.</code> 代表你有最新的版本</div>
        </div>
      </div>
      
      <div className="bg-green-900/30 border border-green-800 rounded p-3 text-xs text-green-300 flex items-start gap-2">
        <CheckCircle size={14} className="shrink-0 mt-0.5 text-green-400" />
        <span>四個全部確認 OK 之後，就可以開始 Step 2 了！</span>
      </div>
    </div>
  </Card>
</section>
```

> ⚠️ **注意**：需要在此 section 內使用的 `CheckCircle` 圖示已在原本的 import 中存在，無需額外 import。

---

**B. 在 Step 3 加入「如何在 VSCode 建立新檔案」的說明**

找到 Step 3 的 `<p>` 段落：

```jsx
<p className="text-slate-600 mb-3 text-sm">用 VSCode 打開這個資料夾，在 <code>learner-commits</code> 目錄下新增一個檔案（例如 <code>blake.md</code>），裡面隨便寫幾句話打招呼。然後把它存檔進 Git。</p>
```

改為：

```jsx
<p className="text-slate-600 mb-3 text-sm">在 <code>learner-commits</code> 目錄下新增一個屬於你的檔案，裡面隨便寫幾句話打招呼。然後把它存檔進 Git。</p>

<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-xs text-blue-800">
  <div className="font-bold mb-2">💡 如何在 VSCode 裡新增檔案：</div>
  <ol className="list-decimal pl-4 space-y-1">
    <li>在 VSCode 左側的「檔案總管」（最上方的資料夾圖示）裡，找到 <code className="bg-blue-100 px-1 rounded">learner-commits</code> 資料夾</li>
    <li>在 <code className="bg-blue-100 px-1 rounded">learner-commits</code> 資料夾上點右鍵 → <strong>New File</strong></li>
    <li>輸入你的檔名，例如 <code className="bg-blue-100 px-1 rounded">blake.md</code>（改成你自己的名字）</li>
    <li>在檔案裡輸入一些內容（例如「大家好，我是 Blake，這是我的第一個 Git 作業！」）</li>
    <li>按 <strong>Ctrl+S</strong>（Mac 是 <strong>Cmd+S</strong>）儲存檔案</li>
  </ol>
  <div className="mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
    ⚠️ 請建立<strong>新的</strong>檔案（你自己的名字），不要修改 <code className="bg-amber-100 px-1 rounded">example-blake.md</code>。
  </div>
</div>
```

---

**C. 在 Step 5 的方法二前加入 gh auth 確認說明**

找到方法二的 `<div className="bg-white p-4 border border-slate-200 rounded-lg">` 區塊，在標題 `h5` 後加入確認步驟：

找到：
```jsx
<h5 className="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">💻 方法二：使用 gh CLI (極速)</h5>
<p className="text-sm text-slate-600 mb-2">如果你有安裝 GitHub CLI，直接在終端機輸入：</p>
```

改為：
```jsx
<h5 className="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">💻 方法二：使用 gh CLI (極速)</h5>
<div className="bg-slate-50 border border-slate-200 rounded p-2 mb-2 text-xs text-slate-600">
  <div className="font-bold mb-1">先確認 gh 已連線：</div>
  <div className="font-mono bg-slate-900 text-green-400 rounded p-1 px-2">$ gh auth status</div>
  <div className="mt-1">看到 <code className="bg-slate-100 px-0.5 rounded">Logged in as 你的帳號</code> 才能繼續。<br/>
  如果沒有，先執行 <code className="bg-slate-100 px-0.5 rounded">gh auth login</code> 重新連線。</div>
</div>
<p className="text-sm text-slate-600 mb-2">確認連線後，直接在終端機輸入：</p>
```

---

**D. 在 Chapter 8 結尾加入「PR 後續流程」說明**

找到結尾的 `animate-pulse` 按鈕（「大功告成！等待維護者 Approve 你的 PR 吧！」）的 `<div>`，在這個 `<div>` 之後、`</div>` 結束 Step 5 Card 之前，加入：

```jsx
<div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
  <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
    <CheckCircle size={16} className="text-green-500" /> PR 送出後會發生什麼？
  </h5>
  <div className="space-y-3 text-sm">
    <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
      <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
      <div>
        <div className="font-bold text-green-800">維護者 Approve &amp; Merge ✅</div>
        <p className="text-green-700 text-xs mt-1">
          代表維護者認同並接納你的貢獻——你的創作正式成為這個專案的一部分了！🎉<br/>
          你會收到 GitHub 通知信。回到本地後，記得執行 <code className="bg-green-100 px-1 rounded">git pull</code>，把最新的 main 同步回你的電腦。
        </p>
      </div>
    </div>
    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <span className="text-amber-600 text-base leading-none mt-0.5">💬</span>
      <div>
        <div className="font-bold text-amber-800">維護者 Request Changes（要求修改）</div>
        <p className="text-amber-700 text-xs mt-1">
          代表他看了、有想法、希望你調整某些地方。不是拒絕！<br/>
          在本地修改後，重新 <code className="bg-amber-100 px-1 rounded">git add .</code> → <code className="bg-amber-100 px-1 rounded">git commit</code> → <code className="bg-amber-100 px-1 rounded">git push</code>，PR 頁面會自動更新。
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## 任務 10：修改 `learner-commits/example-blake.md`

### 問題描述
範例檔案沒有明確警告「不要修改這個檔案」，學習者可能直接修改它，導致衝突。

### 修改內容

在檔案的 `>` 引言區塊後，加入一行醒目警告：

找到：
```markdown
> 這是一個範例檔案，讓你知道你的筆記應該放在哪裡、格式大概長什麼樣子。
```

改為：
```markdown
> 這是一個範例檔案，讓你知道你的筆記應該放在哪裡、格式大概長什麼樣子。

> ⚠️ **請不要修改這個檔案！** 請在 `learner-commits/` 目錄下建立一個**新的檔案**，用你自己的名字命名（例如 `your-name.md`），然後在那個新檔案裡寫你的內容。
```

---

## 執行後驗證清單

完成所有修改後，請逐項確認：

**版本矛盾修正**
- [x] `Beginner-Setup-Guide.md` 步驟四的 Node 版本說明改為 v20+
- [x] `Beginner-Setup-Guide.md` 完成 Checklist 表格改為 v20+
- [x] `README.md` 環境需求改為 Node.js 20+

**新手導引補強**
- [x] `Beginner-Setup-Guide.md` 步驟六前有「先決定資料夾位置」+ `pwd` 確認教學
- [x] `Chapter1Concept.jsx` 的 Guide 連結有 GitHub 備案連結
- [x] `Chapter3PathA.jsx` 的互動面板有「這是示意模擬」的提示
- [x] `Chapter4PathB.jsx` 的互動面板有「這是示意模擬」的提示

**情境 A 補強**
- [x] `Chapter3PathA.jsx` 建立 repo 的說明明確寫出「三個選項全部不要勾選」
- [x] `Chapter3PathA.jsx` 的 .gitignore 說明有「數據分析菜鳥版」Python 範例

**情境 B 補強**
- [x] `Chapter4PathB.jsx` 有清楚的 403 權限說明與「等 Chapter 8 再練 Push」引導
- [x] `Chapter4PathB.jsx` 的互動面板把 add + commit 拆成兩個獨立步驟，並各自有說明

**Chapter 5 補強**
- [x] `Chapter5Branch.jsx` 進入狀態提示有「切換前先 git status 確認乾淨」的警告

**Chapter 6 補強**
- [x] `Chapter6Sync.jsx` Part 2 衝突說明有「解決後需要 git add . + git commit」的完整五步驟
- [x] `Chapter6Sync.jsx` 互動面板的 Commit 按鈕旁有「模擬中合併為一步，實際需要 add 再 commit」的小提示

**Chapter 7 補強**
- [x] `Chapter7Team.jsx` Step 2 的瀏覽器操作說明有 PR 標題和描述的示範範例

**Chapter 8 補強**
- [x] `Chapter8Practice.jsx` 在任務說明後有「確認起始狀態」的四步驟確認區塊
- [x] `Chapter8Practice.jsx` Step 3 有「如何在 VSCode 建立新檔案」的五步驟說明
- [x] `Chapter8Practice.jsx` Step 3 說明旁有「不要修改 example-blake.md」的警告
- [x] `Chapter8Practice.jsx` Step 5 方法二前有 `gh auth status` 確認步驟
- [x] `Chapter8Practice.jsx` 結尾有「PR 後續流程」的兩種情況說明（Approve / Request Changes）

**範例檔補強**
- [x] `learner-commits/example-blake.md` 有明確的「請不要修改此檔案」警告

---

## 不在本次範圍內的事項

以下項目已確認**不處理**，留給後續版本：

- 部署至 GitHub Pages / Vercel（線上版）
- Chapter 8 「PR 後續流程」的第三種情況（Closed/不被接受）

---

*文件版本：v2.0 | 評估基準：git-time-machine@0.0.0 | 補丁對象：improvement-spec v1.2 完成後的狀態*
