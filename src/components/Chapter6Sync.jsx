import React, { useState } from 'react';
import { SectionTitle, Card, TerminalSim, InstructionalText, Badge, Callout, CommandBlock } from './Shared';
import { Cloud, Laptop, ArrowRight, ArrowLeft, AlertCircle, Info, FileText, GitCommit, User, CheckCircle, GitGraph, FileCode, GitMerge, Zap } from 'lucide-react';

export const Chapter6Sync = () => {
  // Push/Pull State
  const [localCommits, setLocalCommits] = useState([{ id: 'c1', msg: 'Initial commit', time: '10:00' }]);
  const [remoteCommits, setRemoteCommits] = useState([{ id: 'c1', msg: 'Initial commit', time: '10:00' }]);
  const [logs, setLogs] = useState([{ prefix: '$', text: '同步模擬環境已就緒。' }]);
  const [pendingChanges, setPendingChanges] = useState(false); 

  // Merge/Rebase State
  const [mode, setMode] = useState('diverged');
  const [activeTab, setActiveTab] = useState('code');

  const addLog = (text, type = 'info', prefix = '>') => {
    setLogs(prev => [...prev, { text, type, prefix }]);
  };

  const remoteHeadId = remoteCommits[remoteCommits.length - 1].id;
  const localHeadId = localCommits[localCommits.length - 1].id;
  
  const isLocalUpToDateWithRemote = localCommits.some(c => c.id === remoteHeadId);
  const needPull = !isLocalUpToDateWithRemote;
  const canPush = !needPull && (localHeadId !== remoteHeadId);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    addLog(cmd, 'input', '$');

    if (command.includes('git add')) {
      if (pendingChanges) { addLog('已經有檔案在暫存區了', 'warning'); return; }
      setPendingChanges(true);
      addLog('修改已加入暫存區 (Staged)。', 'success');
    } else if (command.includes('git commit')) {
      doCommit('Update via terminal');
    } else if (command === 'git push') {
      doPush();
    } else if (command === 'git pull') {
      doPull();
    } else {
      addLog(`未知指令。試試 git add ., git commit -m "msg", git push, git pull`, 'error');
    }
  };

  const doCommit = (msg = 'Updated feature') => {
    if (!pendingChanges) {
      addLog('nothing to commit, working tree clean', 'error');
      return;
    }
    const lastIdNum = parseInt(localCommits[localCommits.length - 1].id.substring(1));
    const newId = `c${lastIdNum + 1}`;
    
    const newCommit = { id: newId, msg: msg, time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) };
    setLocalCommits([...localCommits, newCommit]);
    setPendingChanges(false);
    addLog(`[main ${newId}] ${msg}`, 'success', '');
  };

  const doPush = () => {
    if (needPull) {
      addLog('Rejected! Remote contains work that you do not have. Please git pull first.', 'error');
      return;
    }
    if (!canPush) {
      addLog('Everything up-to-date', 'info');
      return;
    }
    setRemoteCommits([...localCommits]);
    addLog('To https://github.com/project.git', 'success');
    addLog(`   ${remoteHeadId}..${localHeadId}  main -> main`, 'success');
  };

  const doPull = () => {
    if (!needPull) {
      addLog('Already up to date.', 'info');
      return;
    }
    const localExclusive = localCommits.filter(lc => !remoteCommits.some(rc => rc.id === lc.id));
    const newLocalState = [...remoteCommits, ...localExclusive];
    
    setLocalCommits(newLocalState);
    addLog('Updating...', 'success');
    addLog(`Fast-forward / Merge successful.`, 'success');
  };

  const simulateTeammatePush = () => {
    const lastRemoteIdNum = parseInt(remoteCommits[remoteCommits.length - 1].id.substring(1));
    const nextId = `c${lastRemoteIdNum + 10}`; 
    const newCommit = { id: nextId, msg: 'Teammate fixed bug', time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) };
    
    setRemoteCommits([...remoteCommits, newCommit]);
    addLog('模擬：同事剛好上傳了新的 Commit (ID: ' + nextId + ')。', 'warning', 'System');
  };

  const codeOriginal = `function calculate(a, b) {\n  return a + b;\n}`;
  const codeRemote = `function calculate(a, b) {\n  console.log("Calculating..."); // 同事 (A) 新增\n  return a + b;\n}`;
  const codeLocal = `function calculate(a, b) {\n  if (a < 0) return 0; // 你 (B) 新增\n  return a + b;\n}`;
  
  const codeMerged = `function calculate(a, b) {\n  if (a < 0) return 0; // 你 (B) 新增\n  console.log("Calculating..."); // 同事 (A) 新增\n  return a + b;\n}`;
  const codeRebased = `function calculate(a, b) {\n  console.log("Calculating..."); // 同事 (A) 新增\n  if (a < 0) return 0; // 你 (B) 被重新套用\n  return a + b;\n}`;

  return (
    <div className="animate-fade-in space-y-12">
      <SectionTitle title="6. 遠端同步與衝突" subtitle="Push 與 Pull 的日常拔河，以及兩條宇宙的碰撞" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
          <p className="text-sm text-slate-300"><strong className="text-white">你的 GitHub 帳號必須已經連線（gh auth login 完成）。</strong>否則 Push 時會出現 403 Permission Denied 或要求密碼。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">⬇️</span>
          <p className="text-sm text-slate-300"><strong className="text-white">黃金法則：先 Pull 再 Push。</strong>每次開始工作前，先 <code className="bg-slate-700 px-1 rounded">git pull</code> 把同事的最新進度同步下來，再開始你的修改，能大幅減少衝突的機率。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-base leading-none mt-0.5">💥</span>
          <p className="text-sm text-slate-300"><strong className="text-white">衝突（Conflict）不是 Bug，是正常現象。</strong>遇到衝突別慌，打開 VSCode，它會用顏色高亮標示出衝突的行，讓你選擇保留哪一方。</p>
        </div>
      </div>

      {/* Part 1: Push and Pull */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Badge color="indigo">Part 1</Badge>
          <h3 className="text-xl font-bold text-slate-800">先 Pull 再 Push 的黃金法則</h3>
        </div>
        
        <InstructionalText title="為什麼不讓我上傳？" icon={<Cloud size={18} className="text-blue-600" />}>
          <p>你的電腦 (Local) 和 GitHub (Remote) 是兩個分開的資料庫。</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li><strong>Git Push (推)</strong>：把你電腦上「多出來」的 Commit 記錄上傳。</li>
            <li><strong>Git Pull (拉)</strong>：把 GitHub 上「別人上傳」的 Commit 下載並合併回來。</li>
            <li>如果你沒拉取最新進度就想上傳，Git 為了保護別人的程式碼不被你覆蓋，會直接<strong>拒絕 (Rejected)</strong> 你的 Push！</li>
          </ul>
        </InstructionalText>

        <Callout variant="warning" title="真實操作可能遇到的錯誤" className="mb-4">
          執行 <code className="bg-amber-100 px-1 rounded">git pull</code> 時如果出現 <code className="bg-amber-100 px-1 rounded">fatal: Need to specify how to reconcile divergent branches</code>——這是新版 Git 在問你要用哪種方式合併。執行下面這行指令（安裝指南建議的設定）後，再 <code className="bg-amber-100 px-1 rounded">git pull</code> 一次即可。
        </Callout>
        <CommandBlock command="git config --global pull.rebase false" comment="只需要設定一次，之後每次 pull 都適用" className="mb-8" />

        <div className="grid lg:grid-cols-3 gap-8 items-start mb-8">
          {/* Left Column: Controls & Terminal */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            <Card className="bg-slate-50 border-slate-200 shadow-none">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">你的本地操作</h3>
              
              <div className="space-y-3">
                <div className="relative">
                  <button 
                    onClick={() => { 
                      if(pendingChanges) { addLog('已經有修改了，請先 Commit', 'warning'); return; }
                      setPendingChanges(true); 
                      addLog('你修改了檔案', 'info', 'Editor'); 
                    }}
                    className="w-full bg-white text-slate-700 border border-slate-300 shadow-sm hover:bg-slate-50 active:scale-95 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 justify-between group"
                  >
                    <span className="flex items-center gap-2"><FileText size={16} className="text-blue-500"/> 1. 修改檔案</span>
                    {pendingChanges && <CheckCircle size={16} className="text-green-500" />}
                  </button>
                </div>

                <button 
                  onClick={() => doCommit()}
                  disabled={!pendingChanges}
                  className={`w-full flex items-center gap-2 justify-between transition-all font-medium px-4 py-2 rounded-lg ${pendingChanges ? 'bg-indigo-600 text-white shadow hover:bg-indigo-700 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <span className="flex items-center gap-2"><GitCommit size={16} /> 2. 暫存 + 存檔 (add + commit)</span>
                </button>
                <Callout variant="info" className="text-sm">
                  模擬中合併為一步，實際 Terminal 需先 <code className="bg-blue-100 px-1 rounded">git add .</code> 再 <code className="bg-blue-100 px-1 rounded">git commit -m "..."</code>
                </Callout>

                <hr className="border-slate-200 my-4" />
                
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">與雲端同步</h3>

                <button 
                  onClick={doPull}
                  disabled={!needPull}
                  className={`w-full flex items-center gap-2 justify-between transition-all font-medium px-4 py-2 rounded-lg ${needPull ? 'bg-green-600 text-white shadow hover:bg-green-700 active:scale-95 ring-2 ring-green-300 ring-offset-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeft size={16} /> Git Pull (下載)
                  </div>
                  {needPull && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-bounce">需更新</span>}
                </button>

                <button 
                  onClick={doPush}
                  disabled={!canPush || needPull}
                  className={`w-full flex items-center gap-2 justify-between transition-all font-medium px-4 py-2 rounded-lg ${canPush && !needPull ? 'bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <div className="flex items-center gap-2">
                    <ArrowRight size={16} /> Git Push (上傳)
                  </div>
                  {canPush && !needPull && <span className="bg-blue-400 text-white text-[10px] px-1.5 py-0.5 rounded-full">可上傳</span>}
                </button>

                <hr className="border-slate-200 my-4" />
                
                <button 
                  onClick={simulateTeammatePush}
                  className="w-full bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm justify-center"
                >
                  <User size={14} /> (惡作劇) 模擬同事先 Push
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-2 order-1 lg:order-2 bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-inner min-h-[500px] flex flex-col relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
              {/* Local Timeline */}
              <div className="md:col-span-2 flex flex-col relative">
                <div className="flex items-center gap-2 mb-6 text-indigo-700 font-bold border-b border-indigo-100 pb-2">
                  <Laptop size={20} />
                  <h3>Local (你的電腦)</h3>
                </div>
                
                <div className="relative flex-1 space-y-4 px-2">
                  <div className="absolute left-6 top-2 bottom-0 w-0.5 bg-slate-200 -z-10"></div>
                  
                  {localCommits.map((c) => {
                    const isUnpushed = !remoteCommits.find(rc => rc.id === c.id);
                    return (
                      <div key={c.id} className={`flex items-start gap-3 animate-fade-in-up transition-all duration-500`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs z-10 shadow-md shrink-0 border-4 border-slate-50
                          ${isUnpushed ? 'bg-indigo-500 ring-2 ring-indigo-200' : 'bg-slate-400'}
                        `}>
                          {c.id}
                        </div>
                        <div className={`p-3 rounded-lg text-sm border flex-1 shadow-sm transition-all
                          ${isUnpushed 
                            ? 'bg-white border-indigo-200 border-l-4 border-l-indigo-500' 
                            : 'bg-slate-100 border-slate-200 text-slate-500 grayscale'}
                        `}>
                          <div className="font-semibold truncate">{c.msg}</div>
                          <div className="text-xs opacity-70 flex justify-between mt-1">
                            <span>{c.time}</span>
                            {isUnpushed && <span className="text-indigo-600 font-bold text-[10px] bg-indigo-50 px-1 rounded">尚未上傳</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {pendingChanges && (
                    <div className="flex items-center gap-3 animate-pulse opacity-70 mt-4">
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-indigo-400 bg-white z-10 shrink-0"></div>
                      <div className="p-2 rounded border border-dashed border-indigo-300 text-xs text-indigo-600 bg-indigo-50 flex-1">
                        Working on changes...
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bridge (Push/Pull State) */}
              <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-center relative z-20 py-2 md:py-0">
                 <div className="sticky top-1/2 md:-translate-y-1/2 w-full flex flex-row md:flex-col items-center gap-2">
                   <div className="h-0.5 w-full bg-slate-200 absolute top-1/2 -z-10 hidden md:block"></div>

                   {needPull ? (
                      <div className="group flex flex-col items-center gap-1 animate-pulse mx-auto">
                        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center border-4 border-red-50 cursor-not-allowed rotate-90 md:rotate-0">
                          <AlertCircle size={24} />
                        </div>
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm text-center">
                          拒絕 Push<br/>必須先 Pull
                        </span>
                      </div>
                   ) : canPush ? (
                      <button
                        onClick={doPush}
                        className="group flex flex-col items-center gap-1 animate-bounce mx-auto"
                      >
                        <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-110 transition-transform cursor-pointer border-4 border-white rotate-90 md:rotate-0">
                          <ArrowRight size={24} />
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                          點擊上傳
                        </span>
                      </button>
                   ) : (
                      <div className="group flex flex-col items-center gap-1 opacity-40 mx-auto">
                        <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center border-4 border-white cursor-not-allowed">
                          <CheckCircle size={20} />
                        </div>
                        <span className="text-xs text-slate-400 bg-slate-100 px-1 rounded">已同步</span>
                      </div>
                   )}
                 </div>
              </div>

              {/* Remote Timeline */}
              <div className="md:col-span-2 flex flex-col relative">
                <div className="flex items-center gap-2 mb-6 text-purple-700 font-bold border-b border-purple-100 pb-2">
                  <Cloud size={20} />
                  <h3>Remote (GitHub)</h3>
                </div>
                
                <div className="relative flex-1 space-y-4 px-2">
                  <div className="absolute left-6 top-2 bottom-0 w-0.5 bg-slate-200 -z-10"></div>

                  {remoteCommits.map((c) => (
                    <div key={c.id} className="flex items-start gap-3 animate-fade-in-up">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs z-10 shadow-md shrink-0 border-4 border-slate-50">
                        {c.id}
                      </div>
                      <div className="p-3 rounded-lg text-sm border bg-white border-purple-100 shadow-sm flex-1">
                        <div className="font-semibold text-slate-700 truncate">{c.msg}</div>
                        <div className="text-xs text-slate-400 mt-1">Cloud</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Callout variant="info" title="💡 這台終端機可以真的打指令！" className="mb-3">
          全站只有這裡的終端機可以真的輸入！試試看打 <code className="bg-blue-100 px-1 rounded">git add .</code>。
        </Callout>
        <TerminalSim logs={logs} onCommand={handleCommand} height="h-48" />
      </section>

      {/* Part 2: Conflict & Merge Visual */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Badge color="red">Part 2</Badge>
          <h3 className="text-xl font-bold text-slate-800">終極挑戰：解開衝突 (Conflict)</h3>
        </div>
        
        <Card className="bg-red-50/50 border-red-200 mb-8 overflow-x-auto">
           <div className="min-w-[600px] h-48 relative flex items-center justify-center">
             <div className="absolute top-1/2 left-20 right-20 h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>
             
             {/* Base Commit */}
             <div className="absolute left-1/4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold">C0</div>
                <div className="text-xs font-mono mt-2 bg-white px-1 border rounded">Line 1: Hello</div>
             </div>

             {/* Diverging Paths */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path d="M 200 100 Q 240 40 400 40" fill="none" stroke="#9333ea" strokeWidth="3" strokeDasharray="4" />
                <path d="M 200 100 Q 240 160 400 160" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="4" />

                <path d="M 400 40 Q 560 40 600 100" fill="none" stroke="#9333ea" strokeWidth="3" />
                <path d="M 400 160 Q 560 160 600 100" fill="none" stroke="#4f46e5" strokeWidth="3" />
             </svg>

             {/* Remote Edit */}
             <div className="absolute left-1/2 top-[20%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">C1</div>
                <div className="text-xs font-mono mt-2 bg-purple-100 text-purple-800 px-1 border border-purple-300 rounded shadow">Line 1: Hello (A改的)</div>
             </div>

             {/* Local Edit */}
             <div className="absolute left-1/2 top-[80%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">C2</div>
                <div className="text-xs font-mono mt-2 bg-indigo-100 text-indigo-800 px-1 border border-indigo-300 rounded shadow">Line 1: Hello (B改的)</div>
             </div>

             {/* Conflict Icon */}
             <div className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2">
                <Zap size={32} className="text-red-500 animate-pulse fill-red-200" />
             </div>

             {/* Merge Commit */}
             <div className="absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-green-100">
                  <GitMerge size={20} />
                </div>
                <div className="text-[10px] font-bold mt-2 bg-white px-2 py-1 border border-green-300 rounded text-green-700 shadow text-center">
                   人為解決衝突<br/>產生 Merge Commit
                </div>
             </div>
           </div>
           
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
                <li className="font-bold text-indigo-700">執行 <code className="bg-indigo-50 px-1 rounded">git commit -m "解決衝突"</code></li>
              </ol>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-2 text-sm text-amber-800">
                少做第 4 步是最常見的錯誤——解決完衝突直接 push，Git 會說「還有未解決的 merge」，讓你以為沒有修好。
              </div>
              <Callout variant="warning" title="🆘 救命卡：不小心打了沒有 -m 的 git commit？" className="mt-3">
                如果畫面突然變成一堆 <code className="bg-amber-100 px-1 rounded">~</code> 符號的奇怪編輯器（它叫 Vim），不要慌：按 <code className="bg-amber-100 px-1 rounded">Esc</code>，輸入 <code className="bg-amber-100 px-1 rounded">:wq</code>，按 <code className="bg-amber-100 px-1 rounded">Enter</code>，就能存檔離開。
              </Callout>
            </div>
        </Card>
      </section>

      {/* Part 3: Merge vs Rebase */}
      <section>
        <details className="group">
          <summary className="cursor-pointer list-none flex items-center gap-2 mb-2">
            <Badge color="orange">Part 3</Badge>
            <Badge color="gray">進階概念</Badge>
            <h3 className="text-xl font-bold text-slate-800 inline">Merge 與 Rebase：你喜歡怎樣的歷史？</h3>
            <span className="text-slate-400 text-sm ml-auto group-open:hidden">▸ 點開看</span>
            <span className="text-slate-400 text-sm ml-auto hidden group-open:inline">▾ 收合</span>
          </summary>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800 flex items-start gap-2">
            <span className="text-lg leading-none mt-0.5">⭐</span>
            <span><strong>這是進階概念</strong>，看不懂完全正常，先跳過——第一次學習建議先完成 Chapter 7 和 8 的實戰演練，再回來看這裡。</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg mb-8">
           <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex gap-4">
              <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 text-sm font-bold ${activeTab === 'code' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                 <FileCode size={16} /> 程式碼合併比對 (Diff)
              </button>
              <button onClick={() => setActiveTab('graph')} className={`flex items-center gap-2 text-sm font-bold ${activeTab === 'graph' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                 <GitGraph size={16} /> 歷史結構圖 (Graph)
              </button>
           </div>

           <div className="p-6 bg-slate-50/50 min-h-[350px]">
              {/* Controls */}
              <div className="flex gap-2 mb-6 max-w-md mx-auto">
                  <button onClick={() => setMode('diverged')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'diverged' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>
                    1. 分歧 (原始狀態)
                  </button>
                  <button onClick={() => setMode('merged')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'merged' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600'}`}>
                    2. Merge 結果
                  </button>
                  <button onClick={() => setMode('rebased')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'rebased' ? 'bg-orange-600 text-white shadow' : 'bg-white text-slate-600'}`}>
                    3. Rebase 結果
                  </button>
              </div>

              {activeTab === 'code' ? (
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-4">
                     <div className="bg-slate-100 p-3 rounded border border-slate-200 font-mono text-xs">
                        <div className="mb-2 font-bold text-slate-500 flex items-center gap-1">原始程式碼 (Base)</div>
                        <pre className="text-slate-400">{codeOriginal}</pre>
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                       <div className="bg-purple-50 p-2 rounded border border-purple-200 font-mono text-xs">
                          <div className="mb-1 font-bold text-purple-700">同事 (Remote A)</div>
                          <pre className="text-slate-600 whitespace-pre-wrap">
                            {codeRemote.split('\n').map((line, i) => (
                              <div key={i} className={line.includes('新增') ? 'bg-purple-200 text-purple-900 font-bold' : ''}>{line}</div>
                            ))}
                          </pre>
                       </div>
                       <div className="bg-indigo-50 p-2 rounded border border-indigo-200 font-mono text-xs">
                          <div className="mb-1 font-bold text-indigo-700">你 (Local B)</div>
                          <pre className="text-slate-600 whitespace-pre-wrap">
                            {codeLocal.split('\n').map((line, i) => (
                              <div key={i} className={line.includes('新增') ? 'bg-indigo-200 text-indigo-900 font-bold' : ''}>{line}</div>
                            ))}
                          </pre>
                       </div>
                     </div>
                   </div>

                   <div className={`p-4 rounded-lg border h-full transition-all duration-500 font-mono text-xs ${mode === 'diverged' ? 'bg-slate-100 border-slate-300' : mode === 'rebased' ? 'bg-orange-50 border-orange-300 shadow-md' : 'bg-blue-50 border-blue-300 shadow-md'}`}>
                      <div className="mb-4 font-bold text-slate-700 flex items-center gap-2 text-sm border-b pb-2">
                        {mode === 'diverged' ? '等待合併...' : 
                         mode === 'rebased' ? <><CheckCircle size={16} className="text-orange-600"/> Rebase：替換基底，再貼上你的修改</> : 
                         <><CheckCircle size={16} className="text-blue-600"/> Merge：保留各自歷史，直接融為一體</>}
                      </div>
                      
                      {mode === 'diverged' ? (
                         <div className="h-40 flex items-center justify-center text-slate-400 italic">請選擇上方按鈕查看結果</div>
                      ) : mode === 'rebased' ? (
                        <pre className="text-slate-700 whitespace-pre-wrap leading-loose">
                          {codeRebased.split('\n').map((line, i) => (
                             <div key={i} className={line.includes('你') ? 'bg-indigo-100 text-indigo-800 px-1 rounded' : line.includes('同事') ? 'bg-purple-100 text-purple-800 px-1 rounded' : ''}>{line}</div>
                          ))}
                        </pre>
                      ) : (
                        <pre className="text-slate-700 whitespace-pre-wrap leading-loose">
                          {codeMerged.split('\n').map((line, i) => (
                             <div key={i} className={line.includes('你') ? 'bg-indigo-100 text-indigo-800 px-1 rounded' : line.includes('同事') ? 'bg-purple-100 text-purple-800 px-1 rounded' : ''}>{line}</div>
                          ))}
                        </pre>
                      )}
                   </div>
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                <div className="relative min-w-[420px] max-w-lg h-64 mx-auto flex items-center justify-center border rounded bg-white">
                   <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                      <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold shadow">Base</div>
                   </div>

                   <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="80" y1="128" x2="160" y2="80" stroke="#9333ea" strokeWidth="3" strokeDasharray="5,5" />
                      {mode !== 'rebased' && <line x1="80" y1="128" x2="160" y2="176" stroke="#4f46e5" strokeWidth="3" strokeDasharray="5,5" />}
                      
                      {mode === 'merged' && (
                         <>
                           <line x1="200" y1="80" x2="320" y2="128" stroke="#9333ea" strokeWidth="3" />
                           <line x1="200" y1="176" x2="320" y2="128" stroke="#4f46e5" strokeWidth="3" />
                         </>
                      )}
                   </svg>

                   <div className="absolute left-40 top-[60px] flex flex-col items-center z-10">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow ring-4 ring-white">A</div>
                      <span className="text-xs text-purple-700 mt-1">Remote</span>
                   </div>

                   <div className={`absolute flex flex-col items-center z-10 transition-all duration-700 ease-in-out
                      ${mode === 'rebased' ? 'left-72 top-[60px]' : 'left-40 top-[156px]'}
                   `}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow ring-4 ring-white bg-indigo-600 text-white`}>
                         {mode === 'rebased' ? "B'" : "B"}
                      </div>
                      <span className="text-xs text-indigo-700 mt-1">Local</span>
                   </div>

                   {mode === 'rebased' && (
                      <div className="absolute left-[210px] top-[78px] w-16 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                   )}

                   {mode === 'merged' && (
                     <div className="absolute left-80 top-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow ring-4 ring-white">M</div>
                        <span className="text-xs text-green-700 mt-1">Merge</span>
                     </div>
                   )}
                </div>
                </div>
              )}
           </div>
          </div>
        </details>
      </section>
    </div>
  );
};
