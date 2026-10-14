
import { SectionTitle, Callout, Card, Quiz, FalseAlarm } from './Shared';
import { GitGraph, Server, Github, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

export const Lesson1Concept = () => (
  <div className="space-y-8 animate-fade-in">
    <SectionTitle title="L1 觀念" subtitle="在開始你的時光機之旅前，我們先把裝備確認好" />

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
          <p className="text-xs text-slate-600">把平行宇宙 (Branch) 的成果合併回主宇宙（這是 <strong>Git 的動作</strong>，在自己電腦上隨時可以做；在 GitHub 上，PR 審核通過後按下 Merge 也是在做這件事）。</p>
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
        如果你還沒有安裝 Git、GitHub CLI 或 VSCode，請先前往{' '}
        <a href="#setup"
           className="underline font-bold hover:text-green-700">
          👶 L0 行前準備
        </a>
        {' '}完成安裝與設定。
        以下章節假設你已經安裝完畢，並且知道如何打開 Terminal（終端機）！
      </p>
    </Callout>


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
<SectionTitle title="全課地圖" />
<div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3 relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-indigo-200"></div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">1</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">初始化 (Init)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git init</code>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">2</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">暫存與存檔 (Add & Commit)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git add .</code> / <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git commit</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-400 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">3</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">連結遠端 (Remote Add)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git remote add origin</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-300 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">4</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">推上雲端 (Push)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git push -u origin main</code>
              </div>
            </div>
          </div>
          <div className="space-y-3 relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-purple-200"></div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">1</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">下載專案 (Clone)</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git clone &lt;URL&gt;</code>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">2</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">進入資料夾</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">cd &lt;專案名稱&gt;</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">3</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">開發與存檔 (Add & Commit)</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git add .</code> / <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git commit</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-300 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">4</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">推上雲端 (Push)</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git push</code>
              </div>
            </div>
          </div>
</div>
    {/* 預防照抄：上面是概念地圖，實際敲之前先打幾支預防針 */}
    <div className="space-y-3">
      <h3 className="text-md font-bold text-slate-700">先打預防針：照著上面的圖敲之前，這幾件事要知道</h3>

      <Callout variant="warning" title="圖中的 git commit 是概念示意，實際輸入務必加 -m">
        實際操作時請打 <code className="bg-amber-100 px-1 rounded">git commit -m "你的存檔訊息"</code>。只打 <code className="bg-amber-100 px-1 rounded">git commit</code> 會掉進一個滿是 <code className="bg-amber-100 px-1 rounded">~</code> 符號的編輯器畫面（不好離開），之後的章節會教怎麼應對，現在先記得加 <code className="bg-amber-100 px-1 rounded">-m</code> 就好。
      </Callout>

      <FalseAlarm signal={'warning: LF will be replaced by CRLF in xxx.md'}>
        Windows 上打 <code className="bg-amber-100 px-1 rounded">git add .</code> 時很常看到這種黃字，它只是在提醒「換行格式會自動轉換」，<strong>不是錯誤</strong>，可以無視、直接繼續下一步。
      </FalseAlarm>

      <FalseAlarm signal={'Enumerating objects: 5, done.\nWriting objects: 100% (5/5), done.\nremote: ...'} title="push 時會冒出一大串訊息——那是上傳進度">
        <code className="bg-amber-100 px-1 rounded">git push</code> 成功時反而話很多：這些是上傳進度回報，不是錯誤。第一次 push 還可能彈出登入視窗，照畫面登入 GitHub 即可。
      </FalseAlarm>

      <FalseAlarm signal={'Receiving objects:  42% (123/291)'} title="clone 時的百分比是下載進度">
        <code className="bg-amber-100 px-1 rounded">git clone</code> 會顯示下載進度百分比，中途停一下是正常的（網路在傳檔案），等它回到可以輸入指令的狀態就是完成了。
      </FalseAlarm>
    </div>
  </div>
);
