import React, { useState } from 'react';
import { SectionTitle, Card, TerminalSim, InstructionalText, Callout, Quiz, CommandBlock, FalseAlarm } from './Shared';
import { GitBranch, Plus, ArrowRight, Activity, GitCommit, Copy } from 'lucide-react';

export const Chapter5Branch = () => {
  const [activeBranch, setActiveBranch] = useState('main');
  const [branches, setBranches] = useState(['main']);
  const [logs, setLogs] = useState([{ prefix: '$', text: '準備就緒。目前分支：main' }]);

  const addLog = (text, type = 'info', prefix = '>') => {
    setLogs(prev => [...prev, { text, type, prefix }]);
  };

  const handleCreateBranch = () => {
    if (branches.includes('feat/login')) return;
    addLog('git branch feat/login', 'input', '$');
    setBranches([...branches, 'feat/login']);
    addLog('（沒有任何輸出——這是正常的！真實終端裡成功時不會顯示訊息）', 'info');
    addLog('小提醒：你還在 main 分支上，可以用 git branch 查看清單確認。', 'info');
  };

  const handleCheckout = (branchName) => {
    if (!branches.includes(branchName)) return;
    addLog(`git checkout ${branchName}`, 'input', '$');
    setActiveBranch(branchName);
    addLog(`Switched to branch '${branchName}'`, 'info');
  };

  const handleCheckoutB = () => {
    if (branches.includes('bugfix/ui')) return;
    addLog('git checkout -b bugfix/ui', 'input', '$');
    setBranches([...branches, 'bugfix/ui']);
    setActiveBranch('bugfix/ui');
    addLog(`Switched to a new branch 'bugfix/ui'`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle title="5. 分支與宇宙跳躍" subtitle="在不搞壞主線的情況下，大膽嘗試新功能" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-pink-400 text-base leading-none mt-0.5">🌿</span>
          <p className="text-sm text-slate-300"><strong className="text-white">切換分支（checkout）前，你必須先確認自己已經建立了目標分支。</strong>沒有先建立的話，切換會失敗並報錯。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">📋</span>
          <div className="text-sm text-slate-300">
            <p><strong className="text-white">不知道現在有哪些分支？</strong>輸入 <code className="bg-slate-700 px-1 rounded">git branch</code> 可以列出所有本地分支，輸出長得像這樣：</p>
            <pre className="bg-slate-900 rounded px-3 py-2 mt-2 font-mono text-xs text-slate-200 leading-relaxed">{'* main\n  feat/login'}</pre>
            <p className="mt-1 text-xs text-slate-400">前面有 <code className="bg-slate-700 px-1 rounded">*</code> 星號的那一行，就是你目前所在的分支。</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">💡</span>
          <p className="text-sm text-slate-300"><strong className="text-white">最常用的懶人指令：<code className="bg-slate-700 px-1 rounded">git checkout -b 分支名</code></strong>，一次完成「建立 + 切換」，不需要分兩步做。</p>
        </div>
      </div>

      <InstructionalText title="什麼是分支 (Branch)？" icon={<GitBranch size={18} className="text-pink-600" />}>
        <p>分支就像是「平行宇宙」。當你想開發一個新功能（例如登入頁面），你可以從主線 (main) 複製一個一模一樣的宇宙出來。<br/>
        在這個新的宇宙裡，你愛怎麼改就怎麼改，完全不會影響到主線！等到功能寫好、測試沒問題了，再把它合併 (Merge) 回主線。</p>
      </InstructionalText>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="bg-slate-50 border-slate-200">
             <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
               <Activity size={18} /> 分支操作面板
             </h3>
             
             <div className="space-y-4">
               {/* Create Branch */}
               <div className="bg-white p-3 rounded border border-slate-200">
                 <div className="flex justify-between items-center mb-2">
                   <div className="font-bold text-sm text-slate-800">1. 建立新分支</div>
                   <button 
                     onClick={handleCreateBranch} 
                     disabled={branches.includes('feat/login')}
                     className={`text-xs px-2 py-1 rounded font-bold text-white ${branches.includes('feat/login') ? 'bg-slate-300' : 'bg-pink-500 hover:bg-pink-600'}`}
                   >
                     執行
                   </button>
                 </div>
                 <code className="text-xs text-pink-600 bg-pink-50 px-1 rounded block mb-1">git branch feat/login</code>
                 <p className="text-xs text-slate-500">只建立分支，但「不會」切換過去。輸入後不會有任何訊息跳出來——這就是成功，直接進行下一步。</p>
               </div>

               <Callout variant="warning" title="小心搞混">
                 <code className="bg-amber-100 px-1 rounded">git branch abc</code> 這樣打，會<strong>建立</strong>一個叫 abc 的新分支，而不是切換過去！要切換請用 <code className="bg-amber-100 px-1 rounded">git checkout</code> 或下面的 <code className="bg-amber-100 px-1 rounded">-b</code> 懶人指令。
               </Callout>

               {/* Switch Branch */}
               <div className="bg-white p-3 rounded border border-slate-200">
                 <div className="flex justify-between items-center mb-2">
                   <div className="font-bold text-sm text-slate-800">2. 切換分支</div>
                   <div className="flex gap-2">
                     <button 
                       onClick={() => handleCheckout('main')} 
                       disabled={activeBranch === 'main'}
                       className={`text-xs px-2 py-1 rounded font-bold ${activeBranch === 'main' ? 'bg-slate-200 text-slate-400' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                     >
                       main
                     </button>
                     <button 
                       onClick={() => handleCheckout('feat/login')} 
                       disabled={!branches.includes('feat/login') || activeBranch === 'feat/login'}
                       className={`text-xs px-2 py-1 rounded font-bold ${activeBranch === 'feat/login' ? 'bg-slate-200 text-slate-400' : !branches.includes('feat/login') ? 'bg-slate-100 text-slate-300' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'}`}
                     >
                       feat/login
                     </button>
                   </div>
                 </div>
                 <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded block mb-1">git checkout &lt;分支名&gt;</code>
                 <p className="text-xs text-slate-500">讓你的資料夾內容，瞬間切換到該宇宙的狀態。<code className="bg-slate-100 px-1 rounded">&lt;分支名&gt;</code> 要整個換成真實名稱（例如 <code className="bg-slate-100 px-1 rounded">git checkout feat/login</code>），不要把角括號打進去。</p>
               </div>

               <Callout variant="info" title="🎒 切換前東西沒存怎麼辦？git stash">
                 <code className="bg-blue-100 px-1 rounded">git stash</code> = 把桌上未完成的東西先掃進抽屜（暫存）；<code className="bg-blue-100 px-1 rounded">git stash pop</code> = 從抽屜拿出來繼續。切換分支前，如果工作區還有未存檔的修改，先 <code className="bg-blue-100 px-1 rounded">git commit</code>（建議）或先 <code className="bg-blue-100 px-1 rounded">git stash</code>，再切換。
                 <span className="block mt-1 text-xs">成功時你會看到：<code className="bg-blue-100 px-1 rounded">git stash</code> 顯示 <code className="bg-blue-100 px-1 rounded">Saved working directory and index state ...</code>；<code className="bg-blue-100 px-1 rounded">git stash pop</code> 最後一行顯示 <code className="bg-blue-100 px-1 rounded">Dropped refs/stash@{'{0}'}</code>。</span>
               </Callout>

               <FalseAlarm signal={'warning: LF will be replaced by CRLF in xxx'}>
                 在 Windows 上執行 <code className="bg-amber-100 px-1 rounded">git add</code> 或 commit 時，常會冒出這行黃字。它只是 Git 在提醒「換行符號會自動轉換」，不是錯誤，直接忽略、繼續下一步即可。
               </FalseAlarm>

               {/* Create and Switch */}
               <div className="bg-white p-3 rounded border border-slate-200">
                 <div className="flex justify-between items-center mb-2">
                   <div className="font-bold text-sm text-slate-800">3. 建立並直接切換 (最常用⭐)</div>
                   <button 
                     onClick={handleCheckoutB} 
                     disabled={branches.includes('bugfix/ui')}
                     className={`text-xs px-2 py-1 rounded font-bold text-white ${branches.includes('bugfix/ui') ? 'bg-slate-300' : 'bg-purple-600 hover:bg-purple-700'}`}
                   >
                     執行
                   </button>
                 </div>
                 <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded block mb-1">git checkout -b bugfix/ui</code>
                 <p className="text-xs text-slate-500">加上 <code>-b</code>，等於一次做完上面兩件事，非常方便！</p>
               </div>

               <Callout variant="info" title="看到別人這樣寫別慌">
                 新版 Git 也可以用 <code className="bg-blue-100 px-1 rounded">git switch -c 分支名</code>，和 <code className="bg-blue-100 px-1 rounded">git checkout -b</code> 是同一件事——看到別人這樣寫不用慌。
               </Callout>
             </div>
          </Card>
        </div>

        {/* Visual Map */}
        <div className="bg-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center shadow-xl">
          <h3 className="text-slate-300 font-bold mb-8 text-center tracking-widest text-sm uppercase">目前宇宙狀態</h3>
          
          <div className="relative h-40 w-full max-w-sm mx-auto">
             {/* Main Branch */}
             <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-indigo-500/30 -translate-y-1/2 rounded-full"></div>
             
             {/* Base Commit */}
             <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
               <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
             </div>

             {/* Main Current Commit */}
             <div className="absolute top-1/2 left-[80%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300">
               <div className={`w-5 h-5 rounded-full ${activeBranch === 'main' ? 'bg-white ring-4 ring-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]' : 'bg-indigo-500'} z-10`}></div>
               <span className={`text-xs font-bold mt-2 ${activeBranch === 'main' ? 'text-white' : 'text-indigo-400'}`}>main</span>
               {activeBranch === 'main' && <span className="absolute -top-6 text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">You are here</span>}
             </div>

             {/* feat/login Branch */}
             {branches.includes('feat/login') && (
               <>
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 384 160" preserveAspectRatio="none">
                   <path d="M 80 80 C 100 80, 110 32, 140 32 L 297 32" fill="none" stroke="rgba(236,72,153,0.3)" strokeWidth="6" strokeLinecap="round" />
                 </svg>
                 <div className="absolute top-8 left-[80%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300">
                   <div className={`w-5 h-5 rounded-full ${activeBranch === 'feat/login' ? 'bg-white ring-4 ring-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]' : 'bg-pink-500'} z-10`}></div>
                   <span className={`absolute left-8 whitespace-nowrap text-xs font-bold ${activeBranch === 'feat/login' ? 'text-white' : 'text-pink-400'}`}>feat/login</span>
                   {activeBranch === 'feat/login' && <span className="absolute -top-6 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap">You are here</span>}
                 </div>
               </>
             )}

             {/* bugfix/ui Branch */}
             {branches.includes('bugfix/ui') && (
               <>
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 384 160" preserveAspectRatio="none">
                   <path d="M 80 80 C 100 80, 110 128, 140 128 L 297 128" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="6" strokeLinecap="round" />
                 </svg>
                 <div className="absolute bottom-8 left-[80%] translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300">
                   <div className={`w-5 h-5 rounded-full ${activeBranch === 'bugfix/ui' ? 'bg-white ring-4 ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]' : 'bg-purple-500'} z-10`}></div>
                   <span className={`absolute left-8 whitespace-nowrap text-xs font-bold ${activeBranch === 'bugfix/ui' ? 'text-white' : 'text-purple-400'}`}>bugfix/ui</span>
                   {activeBranch === 'bugfix/ui' && <span className="absolute -bottom-6 text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap">You are here</span>}
                 </div>
               </>
             )}
          </div>
        </div>
      </div>

      <Card className="bg-indigo-50 border-indigo-200 mt-6 p-5">
         <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
           <span className="text-xl">💡</span> 重要觀念：本地分支 vs 雲端分支
         </h3>
         <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
           請記住：<strong>你在電腦上用 checkout 建立的分支，只有你自己看得到！</strong> 雲端（GitHub）此時還不知道有這個宇宙的存在。這就是為什麼只在本地新增分支時，別人是無法拉取 (pull) 到你的進度的。
         </p>
         <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
           <div className="font-bold text-sm text-slate-800 mb-2">要把分支「上傳並在雲端建立」，你需要執行：</div>
           <code className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded block mb-2 font-mono">git push -u origin &lt;你的分支名&gt;</code>
           <Callout variant="warning" title="角括號不要打進去" className="mb-3">
             <code className="bg-amber-100 px-1 rounded">&lt;你的分支名&gt;</code> 要整個換成實際的分支名，例如 <code className="bg-amber-100 px-1 rounded">git push -u origin feat/login</code>。如果連角括號一起打，會出現 <code className="bg-amber-100 px-1 rounded">error: src refspec ... does not match</code>。
           </Callout>
           <p className="text-sm text-slate-600 mb-1">按 Enter 後，終端機會滾動一串進度訊息，長得像這樣：</p>
           <CommandBlock
             variant="output"
             command={'Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), done.\n * [new branch]      feat/login -> feat/login'}
             className="mb-3"
           />
           <p className="text-sm text-slate-600 mb-3">最後看到 <code className="bg-slate-100 px-1 rounded text-xs">* [new branch] 分支名 -&gt; 分支名</code> 就是成功了。第一次 push 時，Windows 可能會彈出要你登入 GitHub 的視窗——這是正常的，登入一次就會記住。</p>
           <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
             <li><code className="bg-slate-100 px-1 rounded text-xs">-u</code> (set-upstream) 的意思是「建立上下游連線」。</li>
             <li>這告訴 Git：「請在 GitHub 也建立一個一模一樣的分支，並把它們綁定在一起」。</li>
             <li>綁定之後，未來你在這個分支只要簡單打 <code className="bg-slate-100 px-1 rounded text-xs">git push</code>，它就會知道要推送到雲端的對應分支了！</li>
           </ul>
         </div>
      </Card>

      <div className="mt-8">
        <TerminalSim logs={logs} promptLabel={`~/project (${activeBranch})`} height="h-40" />
      </div>

      {/* Team Parallel Dev Graph */}
      <div className="mt-8">
        <Card className="bg-white border-slate-200">
           <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
             <GitBranch size={18} className="text-indigo-600" /> 團隊協作的大局觀：多模組平行開發
           </h3>
           <p className="text-sm text-slate-600 mb-2">在真實的公司專案中，主線 (main) 就像火車的主幹道，而大家會各自開分支 (Branch) 進行平行開發，完成後再合併回來（產品迭代），周而復始。</p>
           
           <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-6">
             <h4 className="font-bold text-blue-800 text-sm mb-1">💡 觀念釐清：分支是「階段性服務」</h4>
             <p className="text-xs text-blue-700">分支是為了解決某個特定的功能 (Feature) 或修復 (Bug) 而短暫存在的。當任務完成並合併 (Merge) 回主線後，該分支的使命就結束了，通常會被刪除或封存。長期讓兩個分支平行存在而不合併，是非常危險且容易產生大量衝突的不良設計。</p>
           </div>
           
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
                 <text x="450" y="240" fill="#475569" fontSize="13" textAnchor="middle">耗時較長的開發</text>

                 {/* Merge Nodes */}
                 <circle cx="400" cy="128" r="10" fill="#6366f1" stroke="white" strokeWidth="4" />
                 <text x="400" y="152" fill="#475569" fontSize="13" textAnchor="middle" fontWeight="bold" fontFamily="monospace">v1.1 (UI+API)</text>

                 <circle cx="550" cy="128" r="10" fill="#6366f1" stroke="white" strokeWidth="4" />
                 <text x="550" y="152" fill="#475569" fontSize="13" textAnchor="middle" fontWeight="bold" fontFamily="monospace">v1.2 (DB)</text>
               </svg>
             </div>
           </div>
        </Card>
      </div>

      <Quiz
        questions={[
          {
            q: '你在 main 分支改了一些東西還沒 commit，這時想切去 feat/login 分支繼續開發，該怎麼辦？',
            options: [
              '直接下 git checkout feat/login，反正切過去再改就好',
              '先用 git commit 存檔，或用 git stash 把未完成的修改暫存起來，再切換分支',
              '把檔案手動複製一份備份到別的資料夾，再切換分支',
            ],
            answer: 1,
            explain: '未存檔的修改可能會被切換分支的動作影響甚至報錯擋下（如果修改的檔案在兩個分支不同），也可能被誤帶到不相關的分支上。正確做法是先 git commit（如果東西已經完整）或 git stash（東西還沒寫完、不想現在存檔），確保工作區乾淨後再切換，之後要繼續改可以用 git stash pop 拿回來。',
          },
          {
            q: 'git branch abc 和 git checkout -b abc 有什麼差別？',
            options: [
              '兩個效果完全一樣，只是打法不同',
              'git branch abc 只是建立一個叫 abc 的新分支，並不會切換過去；git checkout -b abc 則是「建立 + 立刻切換」一次做完',
              'git branch abc 會切換過去，git checkout -b abc 只是建立分支',
            ],
            answer: 1,
            explain: '這是初學者最容易搞混的地方：git branch abc 執行後，你其實還留在原本的分支上，只是多了一個 abc 分支的「選項」；要真正切過去還要再打一次 git checkout abc。而 git checkout -b abc 把「建立」和「切換」兩個步驟合成一個指令，是最常用的懶人寫法。',
          },
          {
            q: '你在 feat/login 分支上大幅修改程式碼，甚至改到程式跑不動了，這會影響 main 分支嗎？',
            options: [
              '會，因為所有分支共用同一份程式碼檔案',
              '不會，分支就像獨立的平行宇宙，在 feat/login 上的修改完全不會影響 main，除非你之後主動把它合併 (merge) 回去',
              '會，但只有下次開機重開終端機才會生效',
            ],
            answer: 1,
            explain: '分支的核心價值就是「隔離風險」：不論在 feat/login 上怎麼改、怎麼搞砸，main 分支的內容都維持原樣不受影響，你隨時可以切回 main 看到完好的版本。唯一會讓 main 受到影響的時機，是你確認 feat/login 沒問題後，主動執行合併 (merge) 把它併回 main。',
          },
        ]}
      />
    </div>
  );
};
