# 👶 Git Time Machine - 零基礎新手安裝與準備指南

> ⚠️ **注意**：如果你完全沒有接觸過寫程式，或是不知道什麼是終端機（Terminal）、Git、Node.js，請**務必先閱讀這份指南**！
> 這份指南不僅會教你安裝軟體，在最後還會帶你啟動網頁並進入教學，所以**完成這份指南後，你就不需要回去看 README.md 了**，可以直接開始你的旅程。

這份指南將會一步步教你把電腦準備好，就像是在玩遊戲前，我們需要先安裝遊戲主機、手把並註冊帳號一樣。

## 🧭 你現在需要走完全部步驟嗎？

- **只想先看 Chapter 1～7（觀念、流程、分支、同步、PR 觀念）**：不用裝任何東西，直接開 [線上版](https://blekzz.github.io/git-time-machine/) 就能學，可以先跳過這份指南。
- **想做 Chapter 8「實戰演練」（真的發一個 PR）**：這需要在自己電腦上真的操作 Git，請把這份指南**從頭到尾走完**，再回到教學網頁繼續。

---

## 🚀 學會 Git + GitHub，你就能夠……

> **不同背景的你，都能找到學這門課的理由：**

### ✍️ 給文組生 / 完全零基礎的你
- 把你的小說草稿、部落格文章、設計稿的每個版本都保存下來，再也不怕「改了之後後悔」
- 和同學線上共同編輯一份報告，告別「最終版」「最終最終版」「真的最終版」的循環
- 讓面試官看到你認真維護的 GitHub 主頁，比任何履歷都更有說服力
- 具備參與任何開源專案、跨部門協作的基礎技能

### 📊 給會用 Python / Excel 的數據分析新手
- 把你的 Jupyter Notebook、清洗腳本放上 GitHub，告別只存在自己電腦的「孤島作品」
- 和工程師同事用同一套工作流程協作，從此說「單機世界」再見，正式進入 MMO 合作模式
- 追蹤每次調整模型參數、特徵工程的版本，不再找不回「上週那個跑得最好的模型」
- 當工程師說「把你的 code 丟到 repo 來」，你直接秒懂並完成

---

## 📖 即將進入的八大互動章節

教學網頁啟動後，你將會經歷以下豐富的關卡：

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

---

## ✅ 開始前確認 Checklist

> 在動手安裝任何東西之前，請先確認以下項目！

| 項目 | 說明 | 符合嗎？ |
|------|------|------|
| 🖥️ 你有一台電腦 | Windows 10+ 或 macOS 10.15+，需要能安裝軟體 | ☐ |
| 🌐 連上了網路 | 安裝軟體時需要下載，建議有穩定的 Wi-Fi | ☐ |
| 📞 能單獨操作這台電腦 | 需要有管理員權限來安裝軟體 | ☐ |
| ⏰ 預計耗時 | 整個指南大約30～60分鐘，請找時間完整完成，不要中斷 | ☐ |

> 💡 中途真的被打斷也沒關係，指南最後的「全部完成後 Checklist」會幫你確認做到哪一步了，回來對照著補做就好。

---

## 步驟一：註冊 GitHub 帳號

GitHub 是全球最大的工程師社群與程式碼代管平台，未來的作業都會上傳到這裡。
1. 前往 GitHub 官網：[https://github.com/](https://github.com/)
2. 點擊右上角的 **Sign up** 註冊一個免費帳號。
3. 依畫面指示輸入 email、密碼、帳號名稱（username）。
4. 系統會寄一組驗證碼到你的 email，回到網頁輸入驗證碼完成驗證。
5. 可能會出現一個英文拼圖／圖形人機驗證（確認你不是機器人），照畫面指示拖曳完成即可。
6. 註冊成功後，GitHub 通常會問你一份「你是做什麼的」問卷——**這份問卷可以直接按 Skip 跳過**，不影響後續任何步驟。
7. 記好你的帳號名稱與密碼，我們稍後會用到。

> 💡 **兩個小提醒**：
> - 你的**帳號名稱**之後會出現在你的個人主頁網址裡（例如 `github.com/你的帳號名`），別取太隨便的名字。
> - **註冊用的 email 請記住**，之後在電腦上設定 Git 身份（Chapter 1）時，會用到同一個 email。

---

## 步驟二：安裝必備軟體

⚠️ **請注意：Windows 和 Mac 的安裝方式不太一樣，下面依系統完全分開說明，請只看你自己系統的那一段。**

### 1. 下載並安裝 VSCode (Visual Studio Code)
這是一款免費且超強大的打字機（文字編輯器），全球的工程師都在用。
**為什麼一定要安裝？** 因為對於初學者來說，只看終端機的純文字會像瞎子摸象。我們需要 VSCode 配合視覺化外掛（Git Graph）來「看到」Git 的時間線。

**🪟 Windows：**
- 前往官網下載：[https://code.visualstudio.com/](https://code.visualstudio.com/)
- 點擊下載按鈕，下載後直接一直按「下一步」安裝到好。

**🍎 Mac：**
- 前往官網下載：[https://code.visualstudio.com/](https://code.visualstudio.com/)，會下載一個 `.zip` 壓縮檔。
- 雙擊解壓縮，會看到一個「Visual Studio Code」的 App 圖示。
- **把它直接拖進「應用程式」（Applications）資料夾**——Mac 沒有「下一步」精靈，拖過去就是裝好了。
- 之後就可以從「應用程式」或 Spotlight 搜尋打開它。

> 💡 VSCode 介面預設是英文很正常，不用擔心。想要中文介面的話，可以在左側「延伸模組（Extensions）」搜尋安裝 **Chinese (Traditional) Language Pack**。

### 2. 下載並安裝 Node.js
這是讓我們的互動教學網頁能在你電腦上運作的必備引擎。
- 前往官網下載：[https://nodejs.org/](https://nodejs.org/)
- 選擇標有 **LTS (長期維護版)** 的按鈕下載（Windows 是 `.msi`，Mac 是 `.pkg`）。
- 下載後打開安裝檔，一路按「Next / 繼續 / 同意」直到安裝完成，Windows 和 Mac 的安裝精靈用法一致。

### 3. 下載並安裝 Git

**🪟 Windows：**
- 前往 Git 官網下載：[https://git-scm.com/downloads](https://git-scm.com/downloads)，下載 Windows 版安裝檔。
- 下載後打開，**在安裝過程中一直按「Next」就好**，不需要修改任何預設選項。

**🍎 Mac：**
Mac 通常已經內建 Git 的觸發式安裝，不需要另外去下載安裝檔：
1. 打開終端機（Terminal，還沒找到的話可以先看下面「步驟三」）。
2. 輸入 `git --version` 並按 Enter。
3. 如果你的 Mac 還沒裝過 Git，會跳出一個視窗詢問是否安裝「Command Line Developer Tools」，點擊 **安裝**。
4. 等待安裝完成（可能要幾分鐘），完成後再輸入一次 `git --version`，看到版本號碼就代表裝好了。

### 4. 下載並安裝 GitHub CLI (gh)
這是 GitHub 官方出的指令工具。現在你可能還不知道它是幹嘛的，但在最後一個章節「發起你的第一個 PR」時，它會讓整個流程快很多。先裝好備用！

**🪟 Windows 用戶**：
- 到 [GitHub CLI Releases](https://github.com/cli/cli/releases) 頁面，找到最上面的最新版本。
- 在 **Assets** 列表中，找**檔名結尾是 `windows_amd64.msi` 的檔案**下載並點擊安裝（Assets 列表通常要點開才會展開，裡面會有一長串不同系統的檔案，不要抓錯）。

**🍎 Mac OS 用戶**：
- 先確認你的晶片：點畫面左上角的蘋果選單 → 「關於這台 Mac」，看到 **Apple M** 開頭（M1/M2/M3...）就是 Apple 晶片，看到 **Intel** 就是 Intel 晶片。
- 到 [GitHub CLI Releases](https://github.com/cli/cli/releases) 頁面，在 Assets 列表中：Apple 晶片下載檔名含 `macOS_arm64` 的 `.pkg`；Intel 晶片下載檔名含 `macOS_amd64` 的 `.pkg`。下載後雙擊安裝。

---

## 步驟三：打開「終端機」（輸入黑客指令的地方）

> 💡 **新手請牢記**：請一定要記住怎麼打開終端機，以及確認它所在的資料夾位置！在後續的教學章節中，你會非常頻繁地用到它。如果之後不小心關閉了終端機，重新打開時，請記得用 `cd`（= change directory，切換資料夾的指令）回到你的專案資料夾。

軟體都安裝完畢後，我們需要透過「終端機」（Terminal）來確認它們有沒有好好工作。打開終端機有三種常見的方式，**請選擇一種使用即可**：

1. **💡 推薦：使用 VSCode 內建終端機**
   - 打開剛剛裝好的 VSCode。
   - 點擊最上方選單的 `Terminal` -> `New Terminal` (終端機 -> 新增終端機)。
   - 視窗下方就會跑出終端機面板。
2. **🪟 Windows 搜尋 PowerShell**
   - 按下鍵盤上的 `Windows 標誌鍵`。
   - 搜尋框輸入 `powershell`，點擊「Windows PowerShell」開啟藍色視窗。
3. **🍎 Mac 搜尋 Terminal**
   - 按下 `Command (⌘)` + `空白鍵 (Space)` 開啟 Spotlight 搜尋。
   - 輸入 `Terminal` 或 `終端機` 並按 Enter，開啟白色/黑色視窗。

---

## 步驟四：確認安裝與串接 GitHub 帳號

> 🛑 **輸入指令前，請先把 VSCode / 終端機完全關掉，重新打開一次！** 剛裝好的軟體要等**新開的**終端機才抓得到，如果你用的是安裝前就開著的舊終端機視窗，會出現 `'git' is not recognized` 或 `command not found` 這類錯誤——這不代表安裝失敗，只是要重開而已。

在你的終端機中，一次輸入一行以下指令並按 Enter。如果看到類似的版本號碼，代表安裝成功：

```bash
# 檢查 Node
node -v    
# 如果成功，會顯示 v20.x.x 或 v22.x.x（本教材需要 v20 以上）

# 檢查 Git
git -v     
# 如果成功，會顯示 git version 2.x.x

# 檢查 gh cli
gh --version
# 如果成功，會顯示 gh version 2.x.x
```

### 🔑 將 gh cli 與你的帳號串接
這步非常重要！輸入以下指令讓電腦登入你的 GitHub 帳號：
```bash
gh auth login
```
接下來終端機會問你幾個問題，請用鍵盤的 `上下方向鍵` 選擇，並按 `Enter` 確認：
1. What account do you want to log into? 選擇 **GitHub.com**
2. What is your preferred protocol for Git operations? 選擇 **HTTPS**
3. Authenticate Git with your GitHub credentials? 選擇 **Yes**
4. How would you like to authenticate? 選擇 **Login with a web browser**
5. 接著它會給你一串 8 碼的驗證碼（One-time code），並按 Enter 打開瀏覽器。
6. 在瀏覽器中貼上那 8 碼，並點擊 Authorize 授權。
7. 回到終端機，看到 `Logged in as 你的帳號` 就代表成功串接囉！

> 💡 **問題的順序和文字可能因 gh 版本略有不同，不用照抄字面，掌握原則就好：GitHub.com → HTTPS → Yes → Login with a web browser。**
> 如果終端機提示已經給你驗證碼，但瀏覽器沒有自動打開，把終端機顯示的網址**手動複製貼到瀏覽器**打開即可，效果一樣。

---

### ⚙️ 一次性建議設定

裝好 Git 後，順手在終端機貼上這一行（在任何資料夾輸入都可以，只需要做一次）：

```bash
git config --global pull.rebase false
```

> 💡 這是在告訴 Git：「之後我 `git pull` 的時候，如果雙方版本有分歧，請用『合併（merge）』的方式處理。」不設定的話，之後在教學章節做到同步（Chapter 6）時，Git 可能會反問你要用哪種方式合併，讓你卡住不知道怎麼選。先設好，之後就不會被問。

---

## 步驟五：安裝 VSCode 必備外掛

打開你的 VSCode，點擊左側邊欄的**四個方塊圖示**（這叫做 Extensions/延伸模組）。
搜尋並安裝以下外掛，讓我們在寫程式時不會瞎子摸象：
1. **Git Graph**：讓你用視覺化的方式看到 Git 的時間線。
2. **GitLens**：超強大的 Git 輔助工具。

---

---

## 🎉 步驟六：把教學網頁跑起來！

恭喜你！軟體都裝好了。現在，我們要把這個教學網頁真正「啟動」在你的電腦上。
請打開 VSCode 內建終端機（`Terminal` → `New Terminal`），然後依序輸入以下四行指令。

> ⚠️ **每輸入一行，請按一次 Enter，等畫面停止跑動後，再輸入下一行。**

---

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

---

## 🎉 全部完成後 Checklist

> 恭喜你完成了所有步驟！在開始歡呼之前，用下面的清單確認一下你的準備狀態：

| 項目 | 如何驗證成功 | 完成了嗎？ |
|------|------|------|
| GitHub 帳號註冊 | 能登入 github.com 看到主頁 | ☐ |
| Node.js 安裝 | `node -v` 顯示 v20+ 以上版本號 | ☐ |
| Git 安裝 | `git -v` 顯示 git version 2.x.x | ☐ |
| GitHub CLI (gh) 安裝 | `gh --version` 顯示版本號 | ☐ |
| gh 帳號連線 | `gh auth status` 顯示 Logged in as 你的帳號 | ☐ |
| VSCode 安裝 | 能正常開啟 VSCode | ☐ |
| Git Graph 外掛安裝 | 在 VSCode 左側列能看到 Git Graph 圖示 | ☐ |
| GitLens 外掛安裝 | 在 VSCode 左側列能看到 GitLens 功能 | ☐ |
| 教學網頁啟動 | 瀏覽器開啟 `http://localhost:5173/` 能看到教學頁面 | ☐ |

> 💡 **如果有任何一項打不了勾，就回到對應的步驟重做一次。前面準備得越完整，後面的章節就會越順。**

---

## ❓ 常見問題

| 問題 | 解決方法 |
|------|----------|
| `npm install` 失敗 | 確認 Node.js 版本 ≥ 20（在終端機輸入 `node -v` 確認），使用 PowerShell 或 VSCode Terminal |
| `npm run dev` 無畫面 | 確認瀏覽器已開啟 `http://localhost:5173/` |
| `git push` 沒權限（403） | 如果是在 Chapter 8 實戰演練中出現，代表你需要先 Fork 再更新 remote URL（教學裡有說明）。如果是登入問題，執行 `gh auth login` |
| `gh auth login` 失敗 | 確認已安裝 GitHub CLI (`gh --version`)，並將瀏覽器允許彈出視窗進行授權 |
| `'git' is not recognized` / `command not found` | 剛裝完軟體嗎？請把 VSCode / 終端機**完全關掉重新打開**再試一次 |
| 看到紅色的 `ERR!` | 截圖發給老師，不要假設它不重要 |

---

## 🔧 環境損壞時的重置方法

如果你的教學環境出問題（例如不小心對 `learner-commits` 資料夾——也就是 Chapter 8 實戰交作業會用到的資料夾——做了錯誤操作），可以執行以下指令重置：

```bash
git reset --hard
git pull
npm install
```

> ⚠️ **警告**：`git reset --hard` 會將所有未儲存的本地修改清空。如果你有重要的修改還沒有 commit，請先備份！

