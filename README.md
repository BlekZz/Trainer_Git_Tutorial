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
