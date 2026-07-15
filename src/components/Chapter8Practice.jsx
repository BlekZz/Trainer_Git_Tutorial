import React, { useState, useEffect } from 'react';
import { SectionTitle, Card, Badge, InstructionalText, Callout, CommandBlock, Quiz } from './Shared';
import { Rocket, Target, CheckCircle, Terminal, FileText, GitBranch, ArrowUpCircle, GitPullRequest, Search, Square, CheckSquare } from 'lucide-react';

const PROGRESS_KEY = 'gtm-ch8-progress';

// StepCheck — Step 卡標題旁的可勾選進度按鈕（localStorage 持久化）
const StepCheck = ({ stepId, done, onToggle }) => {
  const isDone = done.has(stepId);
  return (
    <button
      type="button"
      onClick={() => onToggle(stepId)}
      className={`ml-auto flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-colors shrink-0 ${
        isDone ? 'text-green-700 bg-green-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
      }`}
    >
      {isDone ? <CheckSquare size={14} /> : <Square size={14} />}
      {isDone ? '已完成' : '標記完成'}
    </button>
  );
};

export const Chapter8Practice = () => {
  const [done, setDone] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
      return new Set(saved);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done]));
  }, [done]);

  const toggleStep = (stepId) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <SectionTitle title="8. 實戰演練：發起你的第一個 PR" subtitle="將所學化為行動，在專案中留下你的足跡！" />

      <Callout variant="warning" title="你是用線上版學到這裡的嗎？">
        本章需要在你自己的電腦上操作。如果你一直是用瀏覽器線上版學習、還沒安裝過 Git，請先完成{' '}
        <a href="#setup" className="underline font-bold hover:text-amber-950">
          Chapter 0 行前準備
        </a>{' '}
        的全部步驟（約 30–60 分鐘），把專案 clone 到你的電腦，再回來繼續。
      </Callout>

      {/* Part 1: The Mission */}
      <section>
        {/* 情境切換說明 */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-6">
          <div className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">⚠️ 重要！先搞清楚你現在在哪個情境</div>
          <p className="text-sm text-slate-700 mb-3">在前面幾章，你都是對<strong>自己的專案</strong>練習（情境 A），或是模擬操作（情境 B）。但 Chapter 8 不一樣——<strong>你現在要去別人的 GitHub 專案做出真正的貢獻</strong>，這才是真實世界 Open Source Contribution 的場景！</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-center">
            <div className="bg-indigo-100 rounded-lg p-2"><div className="font-bold text-indigo-700 mb-1">📘 Ch.3 情境 A</div><div className="text-indigo-600">你的 repo → 你是 Owner → push ✅</div></div>
            <div className="bg-red-100 rounded-lg p-2"><div className="font-bold text-red-700 mb-1">📕 Ch.4 情境 B</div><div className="text-red-600">別人的 repo → 無寫入權限 → push 403 ❌</div></div>
            <div className="bg-green-100 rounded-lg p-2"><div className="font-bold text-green-700 mb-1">🎯 Ch.8 今天</div><div className="text-green-600">Fork → 你的副本 → push ✅ → PR 回原 repo</div></div>
          </div>
          <div className="mt-3 text-xs text-amber-800 bg-amber-100 rounded p-2">💡 <strong>關鍵理解：</strong>你在 Ch.4 push 失敗不是因為 Branch 建錯，而是因為你沒有那個 repo 的寫入權限。<strong>Fork 才是解法。</strong></div>
        </div>

        {/* Fork 概念說明 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
          <div className="text-sm font-bold text-slate-800 mb-3">🍴 Fork 是什麼？為什麼需要它？</div>

          <div className="space-y-4 text-sm text-slate-700 mb-4">
            <p><strong>先想一個問題：</strong>如果你今天走進一間超商，直接把商品放進自己口袋走出去，那叫搶劫。但如果你先付錢、讓店員確認、拿到收據，那叫購物。</p>
            <p><code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">git push</code> 就像是強行把東西放進別人的倉庫——它是<strong>直接、強制的寫入動作</strong>。對自己的 repo push 沒問題，但對別人的 repo 直接 push，是<strong>邏輯上不合理、也在技術上被禁止</strong>的事。</p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="font-bold text-slate-800 mb-2">那貢獻者要怎麼辦？這就帶出了 PR 的本質：</div>
              <p className="text-slate-600"><strong>PR（Pull Request）= 拜託你接受我的更動。</strong><br/>你不能直接推進去，所以你先在自己的副本做好，再向對方說「嘿，我這裡有些改動，你看看要不要拉進你的 repo 裡？」。維護者看了、審查了、覺得 OK，才點 Merge。這才是合理的協作流程。</p>
            </div>
            <p><strong>Fork</strong> 就是這個流程的起點——在 GitHub 上點一下，把別人的 repo <strong>完整複製一份到你自己的帳號下</strong>，讓你有一個可以合法 push 的副本，再從那裡向原 repo 發 PR。</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-slate-100"><th className="px-3 py-2 text-left border border-slate-200"></th><th className="px-3 py-2 border border-slate-200">Fork</th><th className="px-3 py-2 border border-slate-200">Clone</th></tr></thead>
              <tbody>
                <tr><td className="px-3 py-2 border border-slate-200 font-medium">在哪裡發生</td><td className="px-3 py-2 border border-slate-200 text-center">GitHub 網站（點按鈕）</td><td className="px-3 py-2 border border-slate-200 text-center">Terminal（下指令）</td></tr>
                <tr className="bg-slate-50"><td className="px-3 py-2 border border-slate-200 font-medium">產生的結果</td><td className="px-3 py-2 border border-slate-200 text-center">GitHub 上出現你的副本</td><td className="px-3 py-2 border border-slate-200 text-center">電腦上出現本地副本</td></tr>
                <tr><td className="px-3 py-2 border border-slate-200 font-medium">Push 權限</td><td className="px-3 py-2 border border-slate-200 text-center text-green-600 font-bold">你的 Fork ✅</td><td className="px-3 py-2 border border-slate-200 text-center text-red-500">取決於原 repo 設定</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <InstructionalText title="任務說明：這不是演習！" icon={<Target size={18} className="text-red-600" />}>
          <p className="mb-2">現在你要離開這個模擬網頁，<strong>打開你電腦真實的終端機與瀏覽器</strong>來完成這項任務。</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>任務流程：</strong> Fork 原 repo（GitHub 上點按鈕）➡️ 更新本地 Remote 連結 ➡️ 建立 Branch ➡️ 新增 md 檔並 Commit ➡️ Push 到你的 Fork ➡️ 對原 repo 發出 PR。</li>
            <li><strong>最終目標：</strong> 讓寫有你名字的 Markdown 筆記成功被合併進原 repo 的 main 主線中。</li>
            <li><strong>注意事項：</strong> 請確保你在 Trainer_Git_Tutorial 資料夾下操作，不要搞錯位置囉！</li>
          </ul>
        </InstructionalText>
      </section>

      {/* 起始狀態確認 */}
      <section>
        <Card className="bg-white border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">🧭 開始作業前：確認你的位置</div>
          <p className="text-sm text-slate-800 mb-4 font-medium">在開始之前，請打開你的 Terminal，逐行輸入以下指令確認狀態：</p>

          <Callout variant="info" className="mb-4">
            這份清單適用於<strong>第一次</strong>開始作業前。如果你已經做過 Step 2（set-url）後中斷再回來：第 ④ 步請改為先到 GitHub 你的 Fork 頁面按 <strong>Sync fork → Update branch</strong>，再執行 <code className="bg-blue-100 px-1 rounded">git pull</code>。
          </Callout>

          <div className="space-y-3">
            <div className="bg-slate-900 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-xs text-slate-400 mb-1">① 確認你在 Trainer_Git_Tutorial 資料夾內</div>
                <div className="font-mono text-sm text-green-400">$ pwd</div>
                <div className="text-xs text-slate-400 mt-1">✅ 應看到路徑結尾是 <code className="bg-slate-700 px-1 rounded">Trainer_Git_Tutorial</code></div>
                <div className="text-xs text-red-400 mt-0.5">❌ 如果不對：輸入 <code className="bg-slate-700 text-white px-1 rounded">cd 路徑/Trainer_Git_Tutorial</code> 切換過去</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1">② 確認你在 main 分支</div>
                <div className="font-mono text-sm text-green-400">$ git branch</div>
                <div className="text-xs text-slate-400 mt-1">✅ 有星號（*）的那行應該是 <code className="bg-slate-700 px-1 rounded">* main</code></div>
                <div className="text-xs text-red-400 mt-0.5">❌ 如果不對：輸入 <code className="bg-slate-700 text-white px-1 rounded">git checkout main</code> 切換回來</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1">③ 確認工作區是乾淨的</div>
                <div className="font-mono text-sm text-green-400">$ git status</div>
                <div className="text-xs text-slate-400 mt-1">✅ 應看到 <code className="bg-slate-700 px-1 rounded">nothing to commit, working tree clean</code></div>
                <div className="text-xs text-red-400 mt-0.5">❌ 如果有未存檔的修改：先 <code className="bg-slate-700 text-white px-1 rounded">git stash</code> 暫存起來，完成作業後再處理</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1">④ 確認本地已和雲端同步</div>
                <div className="font-mono text-sm text-green-400">$ git pull</div>
                <div className="text-xs text-slate-400 mt-1">✅ 看到 <code className="bg-slate-700 px-1 rounded">Already up to date.</code> 代表你有最新的版本</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1">⑤ 確認你的 Git 身份已設定</div>
                <div className="font-mono text-sm text-green-400">$ git config user.name</div>
                <div className="text-xs text-slate-400 mt-1">✅ 應顯示你的名字</div>
                <div className="text-xs text-red-400 mt-0.5">❌ 沒有任何輸出：回 Chapter 1 完成身份設定，否則等一下 commit 會出現 <code className="bg-slate-700 text-white px-1 rounded">Please tell me who you are</code> 錯誤</div>
              </div>
            </div>

            <div className="bg-green-100 border border-green-300 rounded p-3 text-sm font-bold text-green-900 flex items-center gap-2">
              <CheckCircle size={18} className="shrink-0 text-green-600" />
              <span>五個全部確認 OK 之後，先到 GitHub 完成 Step 1 的 Fork，再回終端機做 Step 2！</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Part 2: Step-by-Step Hands-on */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Badge color="blue">任務步驟</Badge>
          <h3 className="text-xl font-bold text-slate-800">請跟著以下步驟，一步步在你的電腦上執行：</h3>
        </div>

        {/* 實戰示意圖 */}
        <Card className="bg-slate-900 mb-8 border-slate-700 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div style={{ minWidth: '900px' }} className="py-4">
              <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ maxHeight: '380px' }}>
                <defs>
                  <marker id="arr-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                  </marker>
                  <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                  </marker>
                  <marker id="arr-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                  </marker>
                </defs>

                {/* Track Labels */}
                <text x="12" y="58" fill="#fcd34d" fontSize="13" fontWeight="bold">☁️ 原 Repo</text>
                <text x="12" y="148" fill="#fbbf24" fontSize="13" fontWeight="bold">☁️ 你的 Fork</text>
                <text x="12" y="238" fill="#93c5fd" fontSize="13" fontWeight="bold">💻 本地 main</text>
                <text x="12" y="328" fill="#86efac" fontSize="13" fontWeight="bold">💻 本地分支</text>

                {/* Track Lines */}
                <line x1="130" y1="52" x2="870" y2="52" stroke="#f59e0b" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round" />
                <line x1="200" y1="142" x2="870" y2="142" stroke="#fbbf24" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round" strokeDasharray="6 3" />
                <line x1="280" y1="232" x2="870" y2="232" stroke="#3b82f6" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round" />
                <line x1="370" y1="322" x2="870" y2="322" stroke="#22c55e" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round" strokeDasharray="6 3" />

                {/* Step 1: Fork (原 Repo → Fork) */}
                <circle cx="130" cy="52" r="8" fill="#f59e0b" stroke="#0f172a" strokeWidth="3" />
                <path d="M 138 52 C 158 52, 168 142, 188 142" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5" markerEnd="url(#arr-amber)" />
                <circle cx="200" cy="142" r="8" fill="#fbbf24" stroke="#0f172a" strokeWidth="3" />
                <text x="165" y="95" fill="#fcd34d" fontSize="11" fontFamily="monospace" textAnchor="middle">1. Fork</text>
                <text x="165" y="108" fill="#fcd34d" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">(GitHub 網站)</text>

                {/* Clone: Fork → 本地 main (already done) */}
                <path d="M 208 142 C 228 142, 258 232, 268 232" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arr-blue)" />
                <circle cx="280" cy="232" r="8" fill="#3b82f6" stroke="#0f172a" strokeWidth="3" />
                <text x="244" y="182" fill="#93c5fd" fontSize="11" fontFamily="monospace" textAnchor="middle">clone</text>
                <text x="244" y="195" fill="#93c5fd" fontSize="10" textAnchor="middle" opacity="0.7">(已完成)</text>

                {/* Step 2: Update Remote (label on local main track) */}
                <text x="320" y="220" fill="#fbbf24" fontSize="10" fontFamily="monospace">2. set-url origin</text>

                {/* Step 3: checkout -b (本地 main → 本地分支) */}
                <path d="M 288 232 C 308 232, 348 322, 368 322" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arr-green)" />
                <circle cx="380" cy="322" r="8" fill="#22c55e" stroke="#0f172a" strokeWidth="3" />
                <text x="380" y="350" fill="#86efac" fontSize="11" fontFamily="monospace" textAnchor="middle">3. checkout -b</text>
                <text x="380" y="363" fill="#86efac" fontSize="10" textAnchor="middle" opacity="0.8">(建立分支)</text>

                {/* Step 4: commits on branch */}
                <circle cx="500" cy="322" r="7" fill="#4ade80" stroke="#0f172a" strokeWidth="2" />
                <circle cx="580" cy="322" r="7" fill="#4ade80" stroke="#0f172a" strokeWidth="2" />
                <text x="540" y="350" fill="#86efac" fontSize="11" fontFamily="monospace" textAnchor="middle">4. add &amp; commit × n</text>

                {/* Step 5: Push to Fork (本地分支 → Fork) */}
                <path d="M 588 322 C 618 322, 648 142, 668 142" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5" markerEnd="url(#arr-amber)" />
                <circle cx="680" cy="142" r="8" fill="#fbbf24" stroke="#0f172a" strokeWidth="3" />
                <text x="680" y="118" fill="#fcd34d" fontSize="11" fontFamily="monospace" textAnchor="middle">5. push</text>
                <text x="680" y="131" fill="#fcd34d" fontSize="10" textAnchor="middle" opacity="0.8">(到你的 Fork)</text>

                {/* Step 6: PR (Fork → 原 Repo) */}
                <path d="M 688 142 C 728 142, 748 52, 798 52" fill="none" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arr-purple)" />
                <circle cx="810" cy="52" r="10" fill="#a855f7" stroke="#0f172a" strokeWidth="3" />
                <text x="810" y="25" fill="#d8b4fe" fontSize="13" textAnchor="middle" fontWeight="bold">6. PR</text>
                <text x="810" y="40" fill="#d8b4fe" fontSize="10" textAnchor="middle">合併回原 repo</text>
              </svg>
            </div>
          </div>
        </Card>
        <p className="text-xs text-slate-400 text-center md:hidden mb-8">👉 圖片可左右滑動</p>

        <div className="space-y-6">

          {/* Step 1: Fork */}
          <Card className="border-amber-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl shrink-0 mt-1">1</div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                     🍴 Fork 原 repo 到你的帳號
                   </h4>
                   <StepCheck stepId={1} done={done} onToggle={toggleStep} />
                 </div>
                 <p className="text-slate-600 mb-3 text-sm">這步在 <strong>GitHub 網站</strong>上完成，不需要用終端機。</p>
                 <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-sm text-slate-700">
                   <ol className="list-decimal pl-4 space-y-2">
                     <li>打開瀏覽器，前往原 repo 頁面：<code className="bg-slate-100 px-1 rounded text-xs">github.com/BlekZz/Trainer_Git_Tutorial</code></li>
                     <li>點擊右上角的 <strong>Fork</strong> 按鈕（在 Star 旁邊）</li>
                     <li>確認 Owner 是你自己的帳號，點 <strong>Create fork</strong></li>
                     <li>幾秒後，你的帳號下會出現 <code className="bg-slate-100 px-1 rounded text-xs">你的帳號/Trainer_Git_Tutorial</code></li>
                   </ol>
                 </div>
                 <div className="mt-3 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800 flex items-start gap-2">
                   <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-600" />
                   <div><strong>✅ 驗證成功：</strong> 瀏覽器網址變成 <code>github.com/你的帳號/Trainer_Git_Tutorial</code>，頁面左上角顯示「forked from BlekZz/Trainer_Git_Tutorial」</div>
                 </div>
               </div>
             </div>
          </Card>

          {/* Step 2: Update Remote */}
          <Card className="border-amber-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl shrink-0 mt-1">2</div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                     <Terminal size={18} /> 將本地 Remote 指向你的 Fork
                   </h4>
                   <StepCheck stepId={2} done={done} onToggle={toggleStep} />
                 </div>
                 <Callout variant="warning" className="mb-3">
                   ⚠️ 必須先完成 Step 1 的 Fork 再執行這步。如果還沒 Fork 就 set-url，之後 push 會出現 <code className="bg-amber-100 px-1 rounded">remote: Repository not found</code>。
                 </Callout>
                 <p className="text-slate-600 mb-3 text-sm">你電腦裡的 Trainer_Git_Tutorial 目前的 <code>origin</code> 指向原 repo（BlekZz 的），你沒有 push 權限。現在要把它改成指向你自己 Fork 後的副本。</p>
                 <CommandBlock
                   command={"git remote set-url origin https://github.com/你的帳號/Trainer_Git_Tutorial.git\ngit remote -v"}
                   comment="把「你的帳號」換成你的 GitHub 帳號名稱；第二行用來驗證是否修改成功"
                 />
                 <div className="mt-3 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800 flex items-start gap-2">
                   <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-600" />
                   <div><strong>✅ 驗證成功：</strong> <code>git remote -v</code> 的輸出中，兩行都應該顯示 <code>https://github.com/你的帳號/Trainer_Git_Tutorial.git</code>，不再是 BlekZz 的網址。</div>
                 </div>
                 <Callout variant="danger" title="push 時遇到錯誤怎麼辦？" className="mt-3">
                   看到 <code className="bg-red-100 px-1 rounded">remote: Repository not found</code> → 兩種可能：(1) 你還沒 Fork，回 Step 1；(2) 網址裡的帳號或 repo 名打錯了。用 <code className="bg-red-100 px-1 rounded">git remote -v</code> 檢查，重跑一次 set-url 即可（set-url 可以重複執行，放心）。<br/>
                   看到 <code className="bg-red-100 px-1 rounded">403</code> → 你跳過了 Step 2，origin 還指向原 repo。<br/>
                   看到 <code className="bg-red-100 px-1 rounded">Permission denied (publickey)</code> → 你的電腦在用 SSH 連 GitHub，本教程全程用 HTTPS，請到錯誤急診室查「Permission denied (publickey)」這一條。
                 </Callout>
               </div>
             </div>
          </Card>

          {/* Step 3 */}
          <Card className="border-indigo-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl shrink-0 mt-1">3</div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                     <GitBranch size={18} /> 建立專屬分支 (Branch)
                   </h4>
                   <StepCheck stepId={3} done={done} onToggle={toggleStep} />
                 </div>
                 <p className="text-slate-600 mb-3 text-sm">為了不干擾 main 主線，請建立並切換到一個分支。分支名建議用 <code className="bg-slate-100 px-1 rounded">feat/你的帳號名</code>——用 GitHub 帳號名天然唯一，不會和其他同學撞名。</p>
                 <CommandBlock command="git checkout -b feat/你的帳號名" comment="把「你的帳號名」換成你的 GitHub 帳號名稱" />
                 <div className="mt-4 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800 flex items-start gap-2">
                   <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-600" />
                   <div>
                     <strong>✅ 驗證成功：</strong><br/>
                     如果你看到 <code>Switched to a new branch 'feat/你的帳號名'</code>，或是終端機的提示字元結尾變成了 <code>(feat/你的帳號名)</code>，就代表你跳躍到新的宇宙了！
                   </div>
                 </div>
               </div>
             </div>
          </Card>

          {/* Step 4 */}
          <Card className="border-indigo-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl shrink-0 mt-1">4</div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                     <FileText size={18} /> 新增檔案並存檔 (Add & Commit)
                   </h4>
                   <StepCheck stepId={4} done={done} onToggle={toggleStep} />
                 </div>
                 <p className="text-slate-600 mb-3 text-sm">在 <code>learner-commits</code> 目錄下新增一個屬於你的檔案，裡面隨便寫幾句話打招呼。然後把它存檔進 Git。</p>

                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-xs text-blue-800">
                   <div className="font-bold mb-2">💡 如何在 VSCode 裡新增檔案：</div>
                   <ol className="list-decimal pl-4 space-y-1">
                     <li>在 VSCode 左側的「檔案總管」（最上方的資料夾圖示）裡，找到 <code className="bg-blue-100 px-1 rounded">learner-commits</code> 資料夾</li>
                     <li>在 <code className="bg-blue-100 px-1 rounded">learner-commits</code> 資料夾上點右鍵 → <strong>New File</strong></li>
                     <li>輸入你的檔名，用你的 <strong>GitHub 帳號名</strong>命名，例如 <code className="bg-blue-100 px-1 rounded">your-github-id.md</code>——天然唯一，不會和其他同學撞名</li>
                     <li>在檔案裡輸入一些內容（例如「大家好，我是 Blake，這是我的第一個 Git 作業！」）</li>
                     <li>按 <strong>Ctrl+S</strong>（Mac 是 <strong>Cmd+S</strong>）儲存檔案</li>
                   </ol>
                   <div className="mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                     ⚠️ 請建立<strong>新的</strong>檔案（你自己的帳號名），不要修改 <code className="bg-amber-100 px-1 rounded">example-blake.md</code>。
                   </div>
                 </div>

                 <CommandBlock
                   command={'git add learner-commits/你的帳號名.md\ngit commit -m "docs: add 你的帳號名"'}
                 />
                 <div className="mt-4 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800 flex items-start gap-2">
                   <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-600" />
                   <div>
                     <strong>✅ 驗證成功：</strong><br/>
                     如果你看到 <code>[feat/你的帳號名 1234567] docs: add 你的帳號名</code>，並且再輸入一次 <code>git status</code> 顯示 <code>nothing to commit, working tree clean</code>，代表快照拍攝成功！
                   </div>
                 </div>
               </div>
             </div>
          </Card>

          {/* Step 5 */}
          <Card className="border-indigo-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl shrink-0 mt-1">5</div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                     <ArrowUpCircle size={18} /> 推送到你的 Fork (Push)
                   </h4>
                   <StepCheck stepId={5} done={done} onToggle={toggleStep} />
                 </div>
                 <p className="text-slate-600 mb-3 text-sm">因為這是一個全新的分支，遠端還沒有它，所以第一次 Push 時需要加上 <code>-u origin</code>。這次 push 會上傳到你自己的 Fork（因為剛才已經更新了 remote URL）。</p>
                 <CommandBlock command="git push -u origin feat/你的帳號名" />
                 <div className="mt-4 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800 flex items-start gap-2">
                   <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-600" />
                   <div>
                     <strong>✅ 驗證成功：</strong><br/>
                     終端機會跑出一堆上傳進度，最後你會看到 <code>* [new branch] feat/你的帳號名 -{'>'} feat/你的帳號名</code>。同時，終端機通常還會貼心附上一行網址說 <code>Create a pull request for 'feat/你的帳號名' on GitHub by visiting: ...</code>
                   </div>
                 </div>
                 <Callout variant="info" className="mt-3">
                   第一次 push 如果跳出瀏覽器登入視窗——照著登入即可，這是正常的。如果終端機直接要你輸入密碼——<strong>不要輸入 GitHub 網站密碼</strong>（必定失敗），執行 <code className="bg-blue-100 px-1 rounded">gh auth login</code> 重新登入後再 push。
                 </Callout>
               </div>
             </div>
          </Card>

          {/* Step 6 */}
          <Card className="border-indigo-200 shadow-sm relative overflow-hidden bg-indigo-50/30">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shrink-0 mt-1 shadow-md">6</div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <h4 className="font-bold text-lg text-indigo-900 flex items-center gap-2">
                     <GitPullRequest size={18} /> 發起 Pull Request（跨 repo 的 PR）
                   </h4>
                   <StepCheck stepId={6} done={done} onToggle={toggleStep} />
                 </div>
                 <p className="text-slate-700 mb-3 text-sm">你已經把分支推到你的 Fork 了。最後一步是<strong>從你的 Fork 向原 repo 發起 PR</strong>，請維護者把你的貢獻合併進原 repo 的 main。</p>
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-xs text-blue-800">
                   <strong>💡 PR 的方向：</strong> 你的 Fork 的 <code>feat/你的帳號名</code> → 原 repo（BlekZz/Trainer_Git_Tutorial）的 <code>main</code>
                 </div>

                 <div className="grid md:grid-cols-2 gap-4 mt-4">
                   <div className="bg-white p-4 border border-slate-200 rounded-lg">
                     <h5 className="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">🎯 方法一：透過瀏覽器 (推薦新手)</h5>
                     <ol className="list-decimal pl-4 space-y-2 text-sm text-slate-600">
                       <li>打開 GitHub 專案頁面。</li>
                       <li>你會看到一個黃色的提示框說 "feat/你的帳號名 had recent pushes..."。</li>
                       <li>點擊綠色的 <strong>Compare & pull request</strong> 按鈕。</li>
                       <li>建立 PR 前，確認頁面上方 <strong>base repository</strong> 是 <code className="bg-slate-100 px-1 rounded">BlekZz/Trainer_Git_Tutorial</code>、<strong>compare</strong> 是你的 Fork 的分支。</li>
                     </ol>
                   </div>

                   <div className="bg-white p-4 border border-slate-200 rounded-lg">
                     <h5 className="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">💻 方法二：使用 gh CLI (極速)</h5>
                     <div className="bg-slate-50 border border-slate-200 rounded p-2 mb-2 text-xs text-slate-600">
                       <div className="font-bold mb-1">先確認 gh 已連線：</div>
                       <div className="font-mono bg-slate-900 text-green-400 rounded p-1 px-2">$ gh auth status</div>
                       <div className="mt-1">看到 <code className="bg-slate-100 px-0.5 rounded">Logged in as 你的帳號</code> 才能繼續。<br/>
                       如果沒有，先執行 <code className="bg-slate-100 px-0.5 rounded">gh auth login</code> 重新連線。</div>
                     </div>
                     <p className="text-sm text-slate-600 mb-2">確認連線後，直接在終端機輸入：</p>
                     <CommandBlock
                       command={'gh pr create --repo BlekZz/Trainer_Git_Tutorial --title "交作業：你的帳號名" --body "完成了實戰演練"'}
                       comment="--repo 確保 PR 發到原 repo，而不是你自己的 Fork"
                       className="mb-2"
                     />
                     <p className="text-xs text-slate-500 mt-2">按下 Enter，幾秒鐘內 PR 就建好了，終端機會回傳該 PR 的網址給你！</p>
                   </div>
                 </div>

                 <div className="mt-4 flex items-center justify-center">
                   <div className="animate-pulse bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-200">
                     🎉 大功告成！等待維護者 Approve 你的 PR 吧！
                   </div>
                 </div>

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
                           你會收到 GitHub 通知信。先到 GitHub <strong>你的 Fork</strong> 頁面，按 <strong>Sync fork → Update branch</strong>（因為 PR 是合併進原 repo，你的 Fork 不會自動更新），然後回終端機 <code className="bg-green-100 px-1 rounded">git checkout main</code> + <code className="bg-green-100 px-1 rounded">git pull</code>。
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
                      <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <span className="text-red-500 text-base leading-none mt-0.5">🚫</span>
                        <div>
                          <div className="font-bold text-red-800">維護者 Close PR（關閉，不接受）</div>
                          <p className="text-red-700 text-xs mt-1">
                            PR 被關閉，代表這個貢獻不會被合併。常見原因：內容不符合專案方向、格式不對、或維護者選擇了其他方案。<br/>
                            <strong>這非常正常。</strong>你可以在 PR 留言詢問原因，了解後修正再重新開一個 PR。開源世界裡，每個大神都有過被 Close 的 PR——重要的是從中學習。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                 <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white shadow-lg">
                   <h5 className="font-bold text-lg mb-2 flex items-center gap-2">🎉 你的第一個開源貢獻，完成了！</h5>
                   <p className="text-sm text-indigo-50 leading-relaxed">
                     去原 repo 的 <code className="bg-white/20 px-1 rounded">learner-commits/</code> 資料夾看看——你的檔案已經永遠留在這個專案裡了。點 repo 首頁的 <strong>Contributors</strong>，你的頭像也在上面。截圖留念吧，這是你的第一個開源貢獻！
                   </p>
                 </div>
               </div>
             </div>
          </Card>
        </div>

        <Quiz
          questions={[
            {
              q: '你在 Ch.4 已經 clone 過原 repo 了，為什麼不能直接 git push 上去交作業，非得多一道 Fork 的手續？',
              options: [
                '因為 push 前一定要先建立 Branch，這是 Git 的硬性規定',
                '因為你沒有原 repo 的寫入權限，直接 push 會被 GitHub 擋下（403）',
                '因為 Fork 之後檔案會變小，上傳比較快',
              ],
              answer: 1,
              explain: '關鍵不是 Branch 沒建好，而是「權限」——原 repo 是別人的，你只有讀取權限，沒有寫入權限，這正是 Ch.4 遇到的 403 錯誤。Fork 會在你自己的帳號下複製一份完整的副本，你對這份副本有完整的寫入權限，才能合法 push，再從這裡向原 repo 發 PR 請求對方合併。',
            },
            {
              q: 'Fork 完成後、開始 push 之前，本地端還有一個容易漏掉的步驟，是什麼？',
              options: [
                '不需要做任何事，Fork 完成後本地會自動偵測到新副本',
                '要用 git remote set-url origin 把本地的 origin 改指向你的 Fork 網址，否則還是會推去原 repo 而失敗',
                '要重新 git init 一次，讓 Git 重新初始化這個資料夾',
              ],
              answer: 1,
              explain: 'Fork 只在 GitHub 網站上發生，你本地資料夾的 origin 設定完全不會自動跟著變——它仍然指向 BlekZz 的原 repo。如果跳過 set-url 直接 push，會遇到 403（因為 origin 還是別人的 repo）；如果連 Fork 都還沒做就先 set-url，則會遇到 Repository not found（因為你的帳號下根本還沒有這個副本）。兩者都要按順序做：先 Fork，再 set-url。',
            },
            {
              q: '你的 PR 被維護者按下 Merge 之後，直接在本地執行 git checkout main + git pull，拿得到最新版的 main 嗎？',
              options: [
                '拿得到，因為 PR 合併後所有相關的 repo 都會同步更新',
                '拿不到，因為 pull 只會同步 origin（也就是你的 Fork），而 Fork 不會因為原 repo 被合併就自動更新，要先到 Fork 頁面按 Sync fork',
                '拿不到，因為必須整個資料夾重新 clone 一次才行',
              ],
              answer: 1,
              explain: '合併發生在「原 repo」，而你本地的 origin 指向的是「你的 Fork」——這是兩個不同的 GitHub repo，不會自動互相同步。所以 PR 被 Merge 之後，你的 Fork 依然停留在合併前的狀態。正確順序是：先到 GitHub 你的 Fork 頁面按 Sync fork → Update branch，把原 repo 的最新進度同步進你的 Fork，再回終端機 git pull，才能真的拿到最新版本。不需要整個重新 clone。',
            },
          ]}
        />

        <details className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <summary className="cursor-pointer font-bold text-slate-700 text-sm">😵 整個搞砸了想重來？</summary>
          <div className="mt-3 text-sm text-slate-600 space-y-2">
            <p>搞砸了完全不影響原 repo，放心砍掉重練：</p>
            <CommandBlock command={"git checkout main\ngit branch -D feat/你的帳號名"} comment="回到 main，刪掉搞砸的分支" />
            <p>接著手動刪掉你在 <code className="bg-slate-200 px-1 rounded">learner-commits/</code> 建立的 md 檔（若還在），然後從 Step 3 重新開始即可。</p>
          </div>
        </details>
      </section>
    </div>
  );
};
