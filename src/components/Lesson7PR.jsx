
import { SectionTitle, InstructionalText, CommandBlock, Callout, Card, Badge, Quiz } from './Shared';
import { ArrowRight, Github, GitBranch, CheckCircle, AlertCircle, GitMerge, GitPullRequest } from 'lucide-react';

export const Lesson7PR = () => {
  return (
    <div className="animate-fade-in space-y-12">
      <SectionTitle title="L7. 團隊合併與 PR" subtitle="Pull Request：不是請求你拉取，而是請求你合併" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：發 PR 前必讀</div>
        <div className="flex items-start gap-3">
          <span className="text-pink-400 text-base leading-none mt-0.5">🌿</span>
          <p className="text-sm text-slate-300"><strong className="text-white">發 PR 的前提：你必須已經有一個獨立的 Branch（分支），</strong>並且已經把它 <code className="bg-slate-700 px-1 rounded">git push -u origin 分支名</code> 推上 GitHub。沒有分支就沒有 PR。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-purple-400 text-base leading-none mt-0.5">🔀</span>
          <p className="text-sm text-slate-300"><strong className="text-white">PR 是「請求把你的分支合併回 main」，</strong>不是下載最新進度。目標分支通常是 <code className="bg-slate-700 px-1 rounded">main</code> 或 <code className="bg-slate-700 px-1 rounded">develop</code>，請在發 PR 前確認清楚要合併去哪裡。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
          <p className="text-sm text-slate-300"><strong className="text-white">你需要在 GitHub 上已連線的帳號，</strong>並且已將你的分支 push 到 GitHub（推到你的 Fork 或有寫入權限的 repo），才能看到 Compare &amp; pull request 的按鈕。不需要是 Collaborator——Fork 後 push 到自己的副本，同樣可以發起 PR！</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-slate-400 text-base leading-none mt-0.5">ℹ️</span>
          <p className="text-sm text-slate-300"><strong>給初學者的話：</strong>先讀懂 PR 的流程圖就好——下一章你就會親手跑一遍完整流程，所以別跳過喔。</p>
        </div>
      </div>

      {/* Part 1: PR Concepts */}
      <section>
        <InstructionalText title="核心觀念：版本推拉 vs 分支合併" icon={<AlertCircle size={18} className="text-indigo-600" />}>
          <p className="mb-4">新手最常搞混的是「什麼時候用 Pull」跟「什麼時候發 PR」。<br/><strong>PR (Pull Request)</strong> 的本質是「請求管理員將我的分支拉進主線」。</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Same Timeline */}
            <div className="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
               <h4 className="font-bold text-indigo-800 mb-3 text-lg">1. 同一條時間線上的更新</h4>
               <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                 你和同事<strong>都在 main 分支</strong>上工作。同事上傳了新版本，你的電腦版本舊了。<br/>
                 這時候你只需要 <code>git pull</code> 把更新拉下來，修改完後再 <code>git push</code>。這是<strong>日常的版本迭代</strong>。
               </p>
               <div className="flex items-center justify-between text-indigo-500 font-mono text-sm bg-indigo-50 p-3 rounded">
                  <span>main (你)</span>
                  <div className="flex items-center gap-1">
                     <ArrowRight size={14} />
                     <span className="text-[10px] bg-indigo-200 text-indigo-800 px-1 rounded">pull/push</span>
                     <ArrowRight size={14} />
                  </div>
                  <span>main (遠端)</span>
               </div>
            </div>

            {/* Different Timelines */}
            <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
               <h4 className="font-bold text-purple-800 mb-3 text-lg">2. 完全不同的時間線</h4>
               <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                 你在 <strong>feat/login</strong> 分支，而主線是 <strong>main</strong>。你想把你的功能整包裝進主線裡。<br/>
                 這時候你不能只用 pull，你必須到 GitHub 上發起 <strong>Pull Request (PR)</strong>。
               </p>
               <div className="flex items-center justify-between text-purple-500 font-mono text-sm bg-purple-50 p-3 rounded">
                  <span>feat/login</span>
                  <div className="flex flex-col items-center">
                     <GitPullRequest size={18} className="text-purple-600" />
                     <span className="text-[10px] font-bold mt-1 text-purple-700">發起 PR 請求合併</span>
                  </div>
                  <span>main</span>
               </div>
            </div>
          </div>
        </InstructionalText>
      </section>

      {/* Part 2: The PR Flow */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Badge color="purple">PR 流程解析</Badge>
          <h3 className="text-xl font-bold text-slate-800">一個 PR 從誕生到合併的一生</h3>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
           
           {/* Step 1 */}
           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-600 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><GitBranch size={16}/> 開發與上傳</h4>
                 <p className="text-sm text-slate-600">在你自己的分支上完成開發，並使用 <code>git push -u origin 分支名</code> 將整條分支推上 GitHub。</p>
              </div>
           </div>

           {/* Step 2 */}
           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                 <GitPullRequest size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-purple-200 bg-purple-50 shadow-sm relative">
                 <div className="absolute -right-2 -top-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow animate-pulse">Action!</div>
                 <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2"><Github size={16}/> 發起 Pull Request</h4>
                 <p className="text-sm text-purple-800 mb-3">在 GitHub 網頁上點擊 "Compare &amp; pull request"，寫下你做了什麼改變。</p>

                 <div className="space-y-3">
                   <div className="bg-white rounded border border-purple-100 p-3">
                     <div className="text-xs font-bold text-slate-600 mb-2">🌐 方法一：瀏覽器操作（推薦初學者）</div>
                     <ol className="text-xs text-slate-600 space-y-1 list-decimal pl-4">
                       <li>打開 GitHub 專案頁面</li>
                       <li>點擊黃色提示框的 <strong>Compare &amp; pull request</strong></li>
                       <li>
                         寫標題與描述，點 <strong>Create pull request</strong>
                         <div className="mt-1 bg-slate-50 border border-slate-200 rounded p-2 font-mono text-[10px] text-slate-600">
                           <div className="text-slate-400 mb-1">標題範例：</div>
                           <div>feat: 新增 your-name 的學習筆記</div>
                           <div className="text-slate-400 mt-1 mb-1">描述範例：</div>
                           <div>這是我的第一個 PR，包含了 E2 實戰演練中新增的個人筆記。</div>
                         </div>
                       </li>
                     </ol>
                   </div>

                   <div>
                     <div className="text-xs font-bold text-slate-600 mb-2">💻 方法二：GitHub CLI（記得嗎？這就是當初裝它的原因！）</div>
                     <CommandBlock command="gh pr create" comment="這個工具在 L0 行前準備安裝的" />
                     <div className="text-xs text-slate-500 mt-2">
                       輸入這一行，它會互動式地問你標題、描述，幾秒內 PR 就建好了。互動過程中它可能會問你要 push 到哪、要不要開瀏覽器——多半直接按 Enter 選預設值即可。
                     </div>
                     <div className="text-xs text-slate-500 mt-1">
                       ⚠️ 如果回你 <code className="bg-slate-100 px-1 rounded">not logged into any GitHub hosts</code>，先執行 <code className="bg-slate-100 px-1 rounded">gh auth login</code> 登入，再重跑一次 <code className="bg-slate-100 px-1 rounded">gh pr create</code>。
                     </div>
                   </div>
                 </div>
              </div>
           </div>

           {/* Step 4 */}
           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                 <GitMerge size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-green-200 bg-green-50 shadow-sm">
                 <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2"><CheckCircle size={16}/> Approve &amp; Merge</h4>
                 <p className="text-sm text-green-800">審查通過！維護者點擊 <strong>Merge pull request</strong>。你的分支完美融入 main 宇宙，任務圓滿達成！🎉</p>
                 <Callout variant="info" title="合併後會怎樣？" className="mt-3">
                   合併後，這個功能分支（如 feat/login）通常會被<strong>刪除或封存</strong>。因為它的階段性任務已經結束了。下次如果有新需求，請記得切回 main 並拉取最新進度後，<strong>再開一個全新的分支</strong>！
                 </Callout>
              </div>
           </div>

        </div>
      </section>

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
            q: 'PR（Pull Request）的本質最接近下面哪一種說法？',
            options: [
              '把你分支上的內容直接寫進 main，是一個強制執行的動作',
              '請求維護者把你的分支合併進主線，決定權在對方手上',
              '就是 git pull 的另一種說法，把遠端進度拉到本地',
            ],
            answer: 1,
            explain: '名字裡雖然有 Pull，但 PR 完全不是「拉取」，而是「請求對方拉進去」——你只是提出申請，維護者看過、審查過，才會按下 Merge。這跟直接 push 完全不同層次：push 是直接寫入，前提是你本來就有寫入權限（沒有就會被 GitHub 拒絕）；PR 則是需要對方同意的請求，這正是團隊協作裡權限控管的關鍵設計。',
          },
          
          {
            q: 'Merge 和 PR 兩個詞常被搞混，它們的層次差別是什麼？',
            options: [
              '兩者是同一件事，只是叫法不同',
              'Merge 是 Git 本身的合併動作；PR 是 GitHub（平台）提供的協作流程，內部最終也是靠 Merge 完成',
              'PR 是本地指令，Merge 只能在網頁上點擊完成',
            ],
            answer: 1,
            explain: 'Merge 是 Git 這個版本控制系統的底層動作，把兩條分支的歷史接在一起，本地執行 git merge 也做得到，跟有沒有 GitHub 帳號無關。PR 則是 GitHub（或其他平台）在 Merge 之上包裝出來的協作流程——審查、留言、CI 檢查通過後，維護者按下的「Merge pull request」按鈕，內部做的其實就是一次 Merge。搞懂這層次差異，才不會誤以為地端也需要「發 PR」才能合併分支。',
          },
        ]}
      />
    </div>
  );
};
