import React, { useState, useRef } from 'react';
import { SectionTitle, Card, TerminalSim, InstructionalText, CommandBlock, Callout } from './Shared';
import { Laptop, ArrowRight, Github, Download, FileText, CheckCircle, Search, LifeBuoy } from 'lucide-react';

export const Chapter4PathB = () => {
  const [step, setStep] = useState(0); // 0: init, 1: clone, 2: cd, 3: status, 4: add/commit, 5: push
  const [logs, setLogs] = useState([{ prefix: '$', text: '準備開始情境 B：下載現有專案。' }]);
  const repoUrl = "https://github.com/company/cool-project.git";
  const terminalRef = useRef(null);
  const scrollToTerminal = () => {
    terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const addLog = (text, type = 'info', prefix = '>') => {
    setLogs(prev => [...prev, { text, type, prefix }]);
  };

  const handleClone = () => {
    if (step >= 1) return;
    addLog(`git clone ${repoUrl}`, 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog(`Cloning into 'cool-project'...`, 'info');
    }, 300);
    setTimeout(() => {
      addLog(`remote: Enumerating objects: 42, done.`, 'info');
      addLog(`Unpacking objects: 100% (42/42), done.`, 'success');
      setStep(1);
    }, 1200);
  };

  const handleCd = () => {
    if (step >= 2) return;
    addLog('cd cool-project', 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      setStep(2);
    }, 200);
  };

  const handleStatus = () => {
    if (step >= 3) return;
    addLog('git status', 'input', 'cool-project $');
    scrollToTerminal();
    setTimeout(() => {
      addLog('On branch main', 'info');
      addLog('Your branch is up to date with "origin/main".', 'info');
      addLog('nothing to commit, working tree clean', 'success');
      setStep(3);
    }, 300);
  };

  const handleCommit = () => {
    if (step !== 4) return;
    addLog('git commit -m "Add new feature"', 'input', 'cool-project $');
    scrollToTerminal();
    setTimeout(() => {
      addLog('[main 7f8g9h] Add new feature', 'success');
      setStep(5);
    }, 400);
  };

  const handleAdd = () => {
    if (step >= 4) return; // step 4 以上才算 Add 完成
    addLog('echo "hello" > new_feature.txt', 'input', 'cool-project $');
    addLog('git add .', 'input', 'cool-project $');
    scrollToTerminal();
    setTimeout(() => {
      addLog('（沒有任何輸出——這是正常的，代表成功了）', 'info');
      setStep(4);
    }, 300);
  };

  const handlePush = () => {
    if (step >= 6) return;
    addLog('git push', 'input', 'cool-project $');
    scrollToTerminal();
    setTimeout(() => {
      addLog(`To ${repoUrl}`, 'success');
      addLog(`   1a2b3c..7f8g9h  main -> main`, 'success');
      setStep(6);
    }, 800);
  };

  const reset = () => {
    setStep(0);
    setLogs([{ prefix: '$', text: '已重置。' }]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle title="4. 情境 B：參與現有專案" subtitle="下載、修改、上傳的三部曲" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-2 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
          <p className="text-sm text-slate-300">直接 <code className="bg-slate-700 px-1 rounded">git push</code> 到別人的 repo 會得到 <code className="bg-slate-700 px-1 rounded text-red-300">403 Permission Denied</code>——這是正常的保護機制，真正練習 Push 請等 <strong className="text-white">Chapter 8</strong>（用 Fork 解決）。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-base leading-none mt-0.5">💻</span>
          <p className="text-sm text-slate-300">Clone 完記得 <code className="bg-slate-700 px-1 rounded">cd 專案名稱</code> 進入資料夾，否則後續指令都找不到專案。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">🔍</span>
          <p className="text-sm text-slate-300">進入專案後，養成先 <code className="bg-slate-700 px-1 rounded">git status</code> 的習慣，確認工作區乾淨再開始修改（見下方速查表）。</p>
        </div>
        <details className="mt-1 text-sm text-slate-400">
          <summary className="cursor-pointer text-slate-300 hover:text-white">為什麼會 403？點我看完整解釋</summary>
          <div className="mt-2 space-y-2 text-slate-400">
            <p>如果你是 Clone 別人的 repo（包括這個教學 repo），你沒有直接 Push 到對方 main 分支的權限。</p>
            <p>本章我們只在模擬中示範 Push 的流程。真正練習 Push，請等到 <strong className="text-white">Chapter 8 實戰演練</strong>——那裡會教你先 <strong className="text-white">Fork</strong> 取得屬於你自己的 repo 副本，再建立 Branch 並 Push，就不會有權限問題。</p>
            <p className="text-xs">（光是建立 Branch 並不會給你 Push 權限——Push 權限取決於你對那個 repo 是否有寫入權限，或是你有沒有自己的 Fork。）</p>
          </div>
        </details>
      </div>

      <InstructionalText title="什麼時候會用到？">
        <p>這是最常見的工作場景！你剛進公司，主管丟給你一個 GitHub 網址，你要把程式碼下載到電腦裡開始工作。</p>
      </InstructionalText>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-700 flex items-center gap-2"><Download size={18} /> 操作步驟</h3>
              <button onClick={reset} className="text-xs text-slate-500 hover:text-purple-600 underline">重新開始</button>
            </div>
            <Callout variant="info" className="mb-3" title="以下是示意模擬">
              點「執行」可以看到邏輯流程。<strong>實際操作請在你電腦真正的 Terminal 裡輸入同樣的指令。</strong>關於 Push 的實際練習，請等到 Chapter 8。
            </Callout>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 0 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 0 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700 truncate mr-2" title={`$ git clone ${repoUrl}`}>$ git clone ...cool-project.git</div>
                  <button onClick={handleClone} disabled={step !== 0} className={`px-3 py-1 rounded text-xs font-bold text-white shrink-0 ${step > 0 ? 'bg-green-500' : step === 0 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-300'}`}>
                    {step > 0 ? '完成' : '執行'}
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-2">把雲端的專案完整打包下載到電腦。這會自動建立 .git 與 origin 連結！</div>
              </div>

              {/* Step 2 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 1 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 1 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ cd cool-project</div>
                  <button onClick={handleCd} disabled={step !== 1} className={`px-3 py-1 rounded text-xs font-bold text-white ${step > 1 ? 'bg-green-500' : step === 1 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-300'}`}>
                    {step > 1 ? '完成' : '執行'}
                  </button>
                </div>
                <div className="text-xs text-red-500 font-bold mt-2">⚠️ 新手最常忘記這步！下載完記得用 cd (change directory) 進入資料夾，否則你後面的指令都會找不到 git！</div>
              </div>

              {/* Step 3 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 2 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 2 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git status</div>
                  <button onClick={handleStatus} disabled={step !== 2} className={`px-3 py-1 rounded text-xs font-bold text-white ${step > 2 ? 'bg-green-500' : step === 2 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-300'}`}>
                    {step > 2 ? '完成' : '執行'}
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-2">好習慣：養成隨時看 status 的習慣，確認目前狀態是否乾淨。</div>
              </div>

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

              {step === 4 && (
                <Callout variant="info" title="沒消息就是好消息">
                  真實終端裡 <code>git add</code> 成功時<strong>不會顯示任何訊息</strong>。想確認可以輸入 <code>git status</code>，看到檔案變成綠色（Changes to be committed）就對了。
                </Callout>
              )}

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

              {/* Step 5 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 5 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 5 ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git push</div>
                  <button onClick={handlePush} disabled={step !== 5} className={`px-3 py-1 rounded text-xs font-bold text-white ${step > 5 ? 'bg-green-500' : step === 5 ? 'bg-purple-600 hover:bg-purple-700 animate-pulse' : 'bg-slate-300'}`}>
                    {step > 5 ? '完成' : '執行'}
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-2">因為 Clone 時已經有 origin 連結了，所以以後修改完直接 push 即可！</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Visual Feedback */}
        <div className="flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200 p-8 relative overflow-hidden">
          {step === 6 && <div className="absolute inset-0 bg-green-50/50 z-0 animate-fade-in pointer-events-none"></div>}
          
          <div className="relative flex items-center gap-20 z-10 w-full justify-center">
             {/* Local Folder */}
             <div className="flex flex-col items-center relative">
               <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${step >= 1 ? 'bg-purple-600 text-white ring-4 ring-purple-200' : 'bg-white text-slate-300 border border-slate-200'}`}>
                 <Laptop size={40} />
               </div>
               {step >= 1 && (
                 <div className="absolute -left-6 top-1 flex flex-col gap-0.5 animate-fade-in">
                   <div className="flex items-center gap-1 bg-white rounded px-1.5 py-0.5 shadow-sm border border-slate-200 text-xs text-slate-600 font-mono">
                     <FileText size={8} className="text-blue-500 shrink-0" />code.js
                   </div>
                 </div>
               )}
               {step === 2 && (
                 <div className="absolute -bottom-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-bold animate-fade-in whitespace-nowrap border border-yellow-200">
                   已進入資料夾
                 </div>
               )}
               {step === 3 && (
                 <div className="absolute -bottom-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold animate-fade-in whitespace-nowrap border border-blue-200 flex items-center gap-1">
                   <Search size={10} /> 狀態乾淨
                 </div>
               )}
               {step === 4 && (
                 <div className="absolute -bottom-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold animate-fade-in whitespace-nowrap border border-indigo-200">
                   已暫存 (git add)
                 </div>
               )}
               {step === 5 && (
                 <div className="absolute -bottom-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold animate-fade-in whitespace-nowrap border border-green-200">
                   已修改並存檔
                 </div>
               )}
               <span className="mt-4 font-bold text-slate-600">Local (你的電腦)</span>
             </div>

             {/* Connection Line */}
             <div className="absolute left-10 right-10 top-10 h-1 bg-slate-200 -z-10 rounded-full">
               <div className={`h-full rounded-full transition-all duration-1000 ease-out bg-purple-500 ${step >= 1 ? 'w-full opacity-50' : 'w-0'} ${step === 6 ? 'opacity-100 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''}`}></div>
             </div>
             
             {step === 1 && (
               <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20 animate-pulse text-purple-600">
                 <ArrowRight size={24} className="rotate-180" />
               </div>
             )}
             
             {step === 6 && (
               <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 animate-fade-in px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                 <CheckCircle size={14} /> 更新成功！
               </div>
             )}

             {/* GitHub Repo */}
             <div className="flex flex-col items-center relative">
               <div className="w-20 h-20 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-lg">
                 <Github size={40} />
               </div>
               <span className="mt-4 font-bold text-slate-600">Remote (GitHub)</span>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-8" ref={terminalRef}>
        <TerminalSim logs={logs} promptLabel={step >= 2 ? "cool-project $" : "~ $"} height="h-48" />
      </div>

      {/* Git Status Cheatsheet */}
      <div className="mt-8">
        <Card className="bg-slate-50 border-slate-200">
           <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
             <Search size={18} className="text-slate-600" /> Git Status 狀態解碼速查表
           </h3>
           <p className="text-sm text-slate-600 mb-4">輸入 <code>git status</code> 後，終端機會用不同顏色告訴你檔案目前的狀態：</p>
           
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-slate-600 border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
               <thead className="bg-slate-100 text-slate-700">
                 <tr>
                   <th className="px-4 py-3 border-b">狀態名稱</th>
                   <th className="px-4 py-3 border-b">顏色顯示</th>
                   <th className="px-4 py-3 border-b">代表什麼意思？</th>
                   <th className="px-4 py-3 border-b">下一步該怎麼做？</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="border-b">
                   <td className="px-4 py-3 font-mono font-bold text-slate-800">Untracked files</td>
                   <td className="px-4 py-3 text-red-500 font-bold">紅色</td>
                   <td className="px-4 py-3">這是你剛建立的「新檔案」，Git 還不認識它。</td>
                   <td className="px-4 py-3">輸入 <code>git add .</code> 把它加入暫存區。</td>
                 </tr>
                 <tr className="border-b">
                   <td className="px-4 py-3 font-mono font-bold text-slate-800">Changes not staged</td>
                   <td className="px-4 py-3 text-red-500 font-bold">紅色</td>
                   <td className="px-4 py-3">舊檔案被你「修改」了，但還沒放進準備存檔的區域。</td>
                   <td className="px-4 py-3">輸入 <code>git add .</code> 把它加入暫存區。</td>
                 </tr>
                 <tr className="border-b">
                   <td className="px-4 py-3 font-mono font-bold text-slate-800">Changes to be committed</td>
                   <td className="px-4 py-3 text-green-500 font-bold">綠色</td>
                   <td className="px-4 py-3">檔案已經在「暫存區」了，準備好要存檔了！</td>
                   <td className="px-4 py-3">輸入 <code>git commit -m "..."</code> 正式存檔。</td>
                 </tr>
                 <tr>
                   <td className="px-4 py-3 font-mono font-bold text-slate-800">nothing to commit</td>
                   <td className="px-4 py-3 text-slate-500 font-bold">無色</td>
                   <td className="px-4 py-3">工作區超級乾淨，所有修改都已經存檔完畢。</td>
                   <td className="px-4 py-3">安心去喝杯咖啡，或是 <code>git push</code> 上傳。</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </Card>
      </div>

      {/* Emergency Escape Bag */}
      <div className="mt-8">
        <Card className="bg-red-50 border-red-200">
           <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
             <LifeBuoy size={18} /> 緊急逃生包：Oops! 我搞砸了怎麼辦？
           </h3>
           <p className="text-sm text-red-700 mb-4">
             打錯字或加錯檔案時很容易恐慌（例如不小心把全部檔案都 <code>git add .</code> 了，但其實只想傳一個）。別擔心，這幾個指令能救你：
           </p>
           <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded border border-red-100 shadow-sm">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">😭 案發現場 1：不小心 Add 錯檔案</div>
               <p className="text-sm text-slate-600 mb-2">我把還沒寫完的檔案送進暫存區了，我想把它拿出來！</p>
               <CommandBlock command="git restore --staged <檔案名>" />
               <p className="text-xs text-slate-500 mt-2">* 這只會把它移出暫存區，不會刪除你的程式碼。restore = 搭時光機回到上一個存檔點的狀態。</p>
             </div>

             <div className="bg-white p-4 rounded border border-red-100 shadow-sm">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">💥 案發現場 2：把程式碼改壞了</div>
               <p className="text-sm text-slate-600 mb-2">剛剛亂改一通，程式全壞了，我想讓這個檔案回到最後一次 Commit 的狀態！</p>
               <CommandBlock command="git restore <檔案名>" />
               <Callout variant="danger" className="mt-2">
                 這會讓你剛寫的程式碼<strong>永遠消失</strong>，回不去了！執行前先確定你真的不要那些修改。
               </Callout>
             </div>

             <div className="bg-white p-4 rounded border border-red-100 shadow-sm md:col-span-2">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">😵 案發現場 3：畫面出現 detached HEAD</div>
               <p className="text-sm text-slate-600 mb-2">看到 <code>You are in 'detached HEAD' state</code> → 別慌，這只是你時光旅行到了舊存檔點。</p>
               <CommandBlock command="git checkout main" comment="輸入這行就回到現在了" />
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
};
