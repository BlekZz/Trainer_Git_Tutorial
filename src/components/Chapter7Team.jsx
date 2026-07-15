import React from 'react';
import { SectionTitle, Card, Badge, InstructionalText, Callout, CommandBlock, Quiz } from './Shared';
import { Users, GitBranch, ArrowRight, GitPullRequest, AlertCircle, CheckCircle, Github, GitMerge } from 'lucide-react';

export const Chapter7Team = () => {
  return (
    <div className="animate-fade-in space-y-12">
      <SectionTitle title="7. 團隊合併與 PR" subtitle="Pull Request：不是請求你拉取，而是請求你合併" />

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
                           <div>這是我的第一個 PR，包含了 Chapter 8 實戰演練中新增的個人筆記。</div>
                         </div>
                       </li>
                     </ol>
                   </div>

                   <div>
                     <div className="text-xs font-bold text-slate-600 mb-2">💻 方法二：GitHub CLI（記得嗎？這就是當初裝它的原因！）</div>
                     <CommandBlock command="gh pr create" comment="這個工具在 Chapter 0 行前準備安裝的" />
                     <div className="text-xs text-slate-500 mt-2">
                       輸入這一行，它會互動式地問你標題、描述，幾秒內 PR 就建好了。
                     </div>
                   </div>
                 </div>
              </div>
           </div>

           {/* Step 3 */}
           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-600 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                 <Users size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-2">Code Review (程式碼審查)</h4>
                 <p className="text-sm text-slate-600">資深同事或維護者會進來檢查你的程式碼。如果需要修改，你可以繼續在本地修改並 push，PR 會自動更新。</p>
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
            explain: '名字裡雖然有 Pull，但 PR 完全不是「拉取」，而是「請求對方拉進去」——你只是提出申請，維護者看過、審查過，才會按下 Merge。這跟直接 push 完全不同層次：push 是強制寫入的動作，PR 是需要對方同意的請求，這正是團隊協作裡權限控管的關鍵設計。',
          },
          {
            q: 'PR 送出後，維護者留言 Request Changes（要求修改），這時候該怎麼辦？',
            options: [
              '這個 PR 已經沒救了，關掉重新開一個新的 PR',
              '在本地把程式碼改好，git add / commit / push 到同一個分支，PR 頁面會自動更新',
              '要重新 fork 一次、重新走一遍整個流程',
            ],
            answer: 1,
            explain: 'Request Changes 不是拒絕，是「審查者看過了，希望你調整某些地方」。因為 PR 綁定的是「某個分支」而不是某一次的快照，你只要在本地繼續修改、commit、push 到同一條分支，GitHub 上的 PR 內容就會自動同步更新，完全不需要重開 PR 或重新 fork。',
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
