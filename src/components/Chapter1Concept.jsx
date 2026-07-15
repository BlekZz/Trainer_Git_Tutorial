import React from 'react';
import { SectionTitle, Card, Badge, CommandBlock, Callout, Quiz } from './Shared';
import { GitGraph, Server, Key, Info, Github, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

export const Chapter1Concept = () => (
  <div className="space-y-8 animate-fade-in">
    <SectionTitle title="1. 觀念與準備" subtitle="在開始你的時光機之旅前，我們先把裝備確認好" />

    {/* 學會後能做到的事 */}
    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Sparkles size={22} />
        </div>
        <h3 className="text-xl font-bold text-indigo-900">學會 Git + GitHub，你就能夠……</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* TA 1: 文組生 */}
        <div className="bg-white rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-indigo-500" />
            <span className="text-sm font-bold text-indigo-700">✍️ 給文組生 / 完全零基礎的你</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>和同學線上共同編輯一份報告，不再需要傳「最終版」「最終最終版」「真的最終版」</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>讓面試官看到你認真維護的 GitHub 主頁，這比任何履歷都有說服力</li>
          </ul>
          <details className="mt-3 text-sm text-slate-500">
            <summary className="cursor-pointer select-none hover:text-indigo-600">看更多你能得到的改變</summary>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>把你的小說、部落格草稿、設計稿的每個版本都保存下來，再也不怕「改了之後後悔」</li>
              <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>參與任何開源專案、在業界做任何「跨部門協作」的基礎技能</li>
            </ul>
          </details>
        </div>

        {/* TA 2: 數據分析菜鳥 */}
        <div className="bg-white rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-indigo-500" />
            <span className="text-sm font-bold text-indigo-700">📊 給會用 Python / Excel 的數據分析新手</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>把你的 Jupyter Notebook、Python 清洗腳本放上 GitHub，告別只存在自己電腦的「孤島作品」</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>當工程師說「把你的 code 丟到 repo 來」，你直接秒懂並完成，不再需要尷尬地問「什麼是 repo？」</li>
          </ul>
          <details className="mt-3 text-sm text-slate-500">
            <summary className="cursor-pointer select-none hover:text-indigo-600">看更多你能得到的改變</summary>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>和工程師同事用同一套流程協作，從此說「單機世界」再見，正式進入 MMO 合作模式</li>
              <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>追蹤每次調整模型參數、特徵工程的版本，再也不會問「這個 model 上週跑的結果在哪？」</li>
            </ul>
          </details>
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-lg font-bold text-indigo-900">這門課結束後，你就正式從「單機存檔玩家」升級為「多人線上協作工程師」。</p>
        <p className="text-sm text-indigo-600 mt-1">準備好了嗎？</p>
      </div>
    </div>

    {/* Jargon Dictionary */}
    <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
          <GitGraph size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-indigo-900">什麼是 Git？秒懂核心黑話字典</h3>
          <p className="text-sm text-indigo-700 mt-1">Git 是一個「版本控制系統」。不用怕名詞太高深，如果你有玩過單機遊戲，那你其實已經懂了！</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded border border-indigo-100 shadow-sm">
          <div className="font-bold text-slate-800 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Commit</div>
          <div className="text-indigo-600 font-bold text-sm mb-1">🎮 遊戲存檔點</div>
          <p className="text-xs text-slate-600">「打王前存個檔！」把目前的程式碼狀態拍下快照，未來搞砸了可以隨時讀檔回到這裡，不用再手動複製備份。</p>
        </div>
        <div className="bg-white p-3 rounded border border-indigo-100 shadow-sm">
          <div className="font-bold text-slate-800 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Branch</div>
          <div className="text-indigo-600 font-bold text-sm mb-1">🌌 平行宇宙</div>
          <p className="text-xs text-slate-600">「開個新存檔欄位看不同結局。」複製主線去開發新功能，就算整個搞砸了，主線（main）依然完美無缺。</p>
        </div>
        <div className="bg-white p-3 rounded border border-indigo-100 shadow-sm">
          <div className="font-bold text-slate-800 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Push / Pull</div>
          <div className="text-indigo-600 font-bold text-sm mb-1">☁️ 雲端同步</div>
          <p className="text-xs text-slate-600">「換台電腦繼續玩！」把你本地的存檔上傳 (Push) 到雲端伺服器，或是把雲端的最新存檔下載 (Pull) 回來。</p>
        </div>
        <div className="bg-white p-3 rounded border border-indigo-100 shadow-sm">
          <div className="font-bold text-slate-800 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> PR</div>
          <div className="text-indigo-600 font-bold text-sm mb-1">🙏 敲門拜託</div>
          <p className="text-xs text-slate-600">拜託你接受我的更動（這是 <strong>GitHub 上的審查流程</strong>，讓別人先看過你的改動再決定要不要收）。</p>
        </div>
        <div className="bg-white p-3 rounded border border-indigo-100 shadow-sm">
          <div className="font-bold text-slate-800 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500"></div> Merge</div>
          <div className="text-indigo-600 font-bold text-sm mb-1">🔗 結局收束</div>
          <p className="text-xs text-slate-600">把平行宇宙 (Branch) 的成果合併回主宇宙（這是 <strong>Git 的動作</strong>，PR 審核通過後才會執行）。</p>
        </div>
      </div>
    </Card>

    {/* Git / GitHub / GitLab Table */}
    <Card className="bg-slate-50 border-slate-200">
      <h3 className="text-md font-bold mb-4 flex items-center gap-2 text-slate-700">
        <Server size={18} /> 工具與平台比較表
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-200/50">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">名稱</th>
              <th className="px-4 py-3">本質</th>
              <th className="px-4 py-3">核心功能</th>
              <th className="px-4 py-3 rounded-tr-lg">適合誰 / 特色</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 bg-white">
              <td className="px-4 py-3 font-bold text-orange-600 flex items-center gap-2">
                <GitGraph size={16} /> Git
              </td>
              <td className="px-4 py-3">工具 (軟體)</td>
              <td className="px-4 py-3">在你的<strong>電腦本地端</strong>記錄檔案版本、管理分支</td>
              <td className="px-4 py-3">每個工程師的電腦都必須安裝。底層核心。</td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-2">
                <Github size={16} /> GitHub
              </td>
              <td className="px-4 py-3">雲端平台 (微軟)</td>
              <td className="px-4 py-3">提供 Git 倉庫的遠端代管、開源社群、Pull Request</td>
              <td className="px-4 py-3">全球最大的開源社群。找開源專案、放個人作品集首選。</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-bold text-orange-500 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.65 14.39L12 22.13 1.35 14.39a2.12 2.12 0 0 1-.63-2.92l3-5.52a2 2 0 0 1 1.76-1.04h13.06a2 2 0 0 1 1.76 1.04l3 5.52a2.12 2.12 0 0 1-.65 2.92z"/></svg> GitLab
              </td>
              <td className="px-4 py-3">雲端平台 (或私有部署)</td>
              <td className="px-4 py-3">強大的 CI/CD (自動化部署)、專案管理、權限控制</td>
              <td className="px-4 py-3">很多<strong>企業內部</strong>愛用，因為可以架設在公司自己的伺服器上。</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout variant="info" title="簡單來說" className="mt-4">
        Git 是影片剪輯軟體，GitHub / GitLab 就是 YouTube。你要先用剪輯軟體 (Git) 做好影片，然後再上傳到 YouTube (GitHub) 給別人看或共同合作。
      </Callout>
    </Card>

    {/* Setup Reminder */}
    <Callout variant="success" title="你準備好了嗎？">
      <p>
        如果你還沒有安裝 Git, Node.js 或 VSCode，請先前往{' '}
        <a href="#setup"
           className="underline font-bold hover:text-green-700">
          👶 Chapter 0 行前準備
        </a>
        {' '}完成安裝與設定。
        以下章節假設你已經安裝完畢，並且知道如何打開 Terminal（終端機）！
      </p>
    </Callout>

    {/* --- 設置身份 --- */}
    <div className="mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Key size={20} className="text-amber-500" /> 你的第一步：Local 端身份設定
      </h3>
      <Card className="bg-amber-50 border-amber-200 shadow-sm">
        <p className="text-sm text-slate-700 mb-3 font-medium">太棒了！基本觀念都吸收完畢了吧？現在讓我們正式開始。每次存檔 (Commit) 時，Git 都會記錄「是誰做的」。所以第一件事，就是設定你的專屬身份名牌：</p>

        <Callout variant="warning" title="請打開你電腦的真實終端機（不是這個網頁）" className="mb-3">
          接下來的指令請在 VSCode 的終端機或系統的終端機 App 裡輸入，這個網頁只是教學展示，不會真的執行指令。
        </Callout>

        <CommandBlock
          command={'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"'}
          comment="設定你的身份名牌"
        />

        <Callout variant="info" title="`$` 是什麼？" className="mt-3">
          指令開頭的 <code>$</code> 代表「這是要打在終端機的指令」，輸入時不用打 <code>$</code>——用上面的複製按鈕會自動幫你去掉。
        </Callout>

        <p className="text-sm text-slate-600 mt-3">
          這兩行指令在終端機的<strong>任何資料夾</strong>輸入都可以，不需要先 <code>cd</code> 進某個專案。
        </p>

        <p className="text-sm text-slate-600 mt-3">敲完上面兩行後，輸入這行確認設定是否成功：</p>
        <CommandBlock command="git config user.name" comment="會回你剛剛設定的名字，只有一行" />

        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <div className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2 shadow-sm">
            <Info size={14} className="shrink-0 mt-0.5 text-amber-500" />
            <span><strong>--global</strong> 代表全域設定，設定一次就好，這台電腦上所有的 Git 專案都會認識你。</span>
          </div>
          <div className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-blue-800 flex items-start gap-2 shadow-sm">
            <Info size={14} className="shrink-0 mt-0.5 text-blue-500" />
            <span>如果你未來要把作品推上 GitHub，這裡的 <strong>email 請務必填寫和 GitHub 註冊時相同的信箱</strong>，大頭貼才會漂亮地顯示出來喔！</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          小提醒：執行 <code>git init</code> 後，專案裡會多一個隱藏的 <code>.git</code> 資料夾，那就是你的存檔本體——第 3 章會介紹它。
        </p>
      </Card>
    </div>

    <Quiz
      questions={[
        {
          q: 'Git 和 GitHub 的關係，下面哪個說法最正確？',
          options: [
            'Git 和 GitHub 是同一個東西，只是兩種不同的叫法',
            'Git 是安裝在你電腦裡的軟體工具，GitHub 是把 Git 專案放上雲端、給大家看/協作的平台',
            'GitHub 是本地工具，Git 是雲端平台',
          ],
          answer: 1,
          explain: '就像影片剪輯軟體和 YouTube：Git 是你電腦上用來剪片（記錄版本）的軟體，GitHub 則是上傳給別人看、共同協作的雲端平台。沒裝 Git，你的電腦沒辦法做版本控制；不用 GitHub，你一樣可以用 Git，只是沒有雲端備份和協作功能。',
        },
        {
          q: '「Commit」如果比喻成單機遊戲的概念，最接近下面哪一個？',
          options: [
            '按下遊戲的「暫停」鍵',
            '打王之前的「存檔點」——把目前狀態拍下快照，之後可以讀檔回到這裡',
            '刪除存檔重新開一輪新遊戲',
          ],
          answer: 1,
          explain: 'Commit 就是幫目前的程式碼狀態拍一張快照存起來，之後不管怎麼改壞，都能讀檔回到這個時間點。它不是暫停（暫停不會留下紀錄），也不是刪檔重來（Commit 是「新增」一筆歷史紀錄，不會抹掉之前的存檔）。',
        },
        {
          q: '看到教材裡指令寫成 `$ git init`，實際在終端機輸入時該怎麼打？',
          options: [
            '要完整打 `$ git init`，包含開頭的 $ 符號',
            '只打 `git init`，開頭的 $ 只是標示「這是一段指令」，不用真的輸入',
            '$ 要換成你的使用者名稱才能執行',
          ],
          answer: 1,
          explain: '`$` 是教學慣例，用來提示「這一行是要在終端機輸入的指令」，並不是指令的一部分。如果你把 `$` 也打進終端機，Git 會回報找不到這個指令。用複製按鈕會自動幫你去掉 `$`，手動輸入時也要記得跳過它。',
        },
      ]}
    />
  </div>
);
