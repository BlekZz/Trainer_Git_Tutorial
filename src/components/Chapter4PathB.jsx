import React, { useState, useRef } from 'react';
import { SectionTitle, Card, TerminalSim, InstructionalText, CommandBlock, Callout, Quiz, NoOutputHint } from './Shared';
import { Laptop, ArrowRight, Github, Download, FileText, CheckCircle, Search, LifeBuoy } from 'lucide-react';

const MAX_STEP = 6;

// StepAction — 一個步驟卡的「按鈕」在挑戰模式下切換成狀態徽章，
// 用包裝的方式接上既有的 step 狀態機，不改動原本的按鈕邏輯。
const StepAction = ({ state, challengeMode, onClick, activeClass }) => {
  if (challengeMode) {
    if (state === 'current') {
      return <span className="px-3 py-1 rounded text-xs font-bold text-white bg-purple-500 animate-pulse shrink-0">🎯 請輸入</span>;
    }
    if (state === 'done') {
      return <span className="px-3 py-1 rounded text-xs font-bold text-white bg-green-500 shrink-0">完成</span>;
    }
    return <span className="px-3 py-1 rounded text-xs font-bold text-slate-400 bg-slate-100 shrink-0">待完成</span>;
  }
  return (
    <button onClick={onClick} disabled={state !== 'current'} className={`px-3 py-1 rounded text-xs font-bold text-white shrink-0 ${state === 'done' ? 'bg-green-500' : state === 'current' ? activeClass : 'bg-slate-300'}`}>
      {state === 'done' ? '完成' : '執行'}
    </button>
  );
};

export const Chapter4PathB = () => {
  const [step, setStep] = useState(0); // 0: init, 1: clone, 2: cd, 3: status, 4: add/commit, 5: push
  const [logs, setLogs] = useState([{ prefix: '$', text: '準備開始情境 B：下載現有專案。' }]);
  const repoUrl = "https://github.com/company/cool-project.git";
  const terminalRef = useRef(null);
  const scrollToTerminal = () => {
    terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // 第二輪挑戰模式：學員親手在模擬終端機打指令
  const [challengeMode, setChallengeMode] = useState(false);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeAttempts, setChallengeAttempts] = useState(0);
  const [challengeDone, setChallengeDone] = useState(false);

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
      addLog(`Receiving objects: 100% (42/42), 12.3 KiB | 6.15 MiB/s, done.`, 'info');
      addLog(`Unpacking objects: 100% (42/42), done.`, 'success');
      addLog('（真實 clone 會跑一連串像上面這樣的百分比進度，跑完就是成功）', 'info');
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
    addLog('（旁白：假設你剛剛新增了一個檔案 new_feature.txt——這行是劇情設定，不是要你打的指令）', 'info');
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
    setChallengeMode(false);
    setChallengeIdx(0);
    setChallengeAttempts(0);
    setChallengeDone(false);
  };

  const normalize = (raw) => raw.trim().replace(/\s+/g, ' ');

  const CHALLENGE_STEPS = [
    {
      label: 'git clone <網址>',
      match: (lower, normalized) => lower.startsWith('git clone ') && normalized.slice('git clone '.length).trim().length > 0,
      run: () => handleClone(),
      delay: 1400,
      hint1: '提示：先把雲端的專案完整下載下來。',
      hint2: '指令以 git clone 開頭，後面接專案網址',
    },
    {
      label: 'cd 資料夾名稱',
      match: (lower, normalized) => lower.startsWith('cd ') && normalized.slice(3).trim().length > 0,
      run: () => handleCd(),
      delay: 400,
      hint1: '提示：下載完別忘記「走進去」那個資料夾。',
      hint2: '指令是 cd 加上資料夾名稱（例如 cd cool-project）',
    },
    {
      label: 'git status',
      match: (lower) => lower === 'git status',
      run: () => handleStatus(),
      delay: 500,
      hint1: '提示：先確認一下目前工作區乾不乾淨。',
      hint2: '指令是 git status',
    },
    {
      label: 'git add .',
      match: (lower) => lower === 'git add .' || lower === 'git add -a',
      run: () => handleAdd(),
      delay: 500,
      hint1: '提示：把修改過的檔案放進暫存區。',
      hint2: '指令是 git add .（也接受 git add -A）',
    },
    {
      label: 'git commit -m "..."',
      match: (lower, normalized) => lower.startsWith('git commit -m') && normalized.slice('git commit -m'.length).trim().length > 0,
      run: () => handleCommit(),
      delay: 600,
      hint1: '提示：正式對這次修改拍照存檔，記得寫上說明文字。',
      hint2: '指令以 git commit -m 開頭，後面接你的說明文字',
    },
    {
      label: 'git push',
      match: (lower) => lower === 'git push',
      run: () => handlePush(),
      delay: 1000,
      hint1: '提示：把存檔推上雲端（clone 時 origin 已經設定好了）。',
      hint2: '指令是 git push',
    },
  ];

  const startChallenge = () => {
    setChallengeMode(true);
    setChallengeIdx(0);
    setChallengeAttempts(0);
    setChallengeDone(false);
    setStep(0);
    setLogs([{ prefix: '>', text: '挑戰開始！第 1 步：把雲端的專案下載下來（忘記指令可以往上看步驟卡）', type: 'info' }]);
  };

  const abandonChallenge = () => {
    setChallengeMode(false);
    setChallengeIdx(0);
    setChallengeAttempts(0);
    setChallengeDone(false);
    setStep(MAX_STEP);
    setLogs([{ prefix: '$', text: '已回到按鈕模式（第一輪已完成）。' }]);
  };

  const handleTerminalCommand = (raw) => {
    if (challengeDone) return;
    const normalized = normalize(raw);
    if (!normalized) return;
    const lower = normalized.toLowerCase();
    const current = CHALLENGE_STEPS[challengeIdx];
    if (!current) return;

    if (current.match(lower, normalized)) {
      setChallengeAttempts(0);
      current.run(normalized);
      const idx = challengeIdx;
      const isLast = idx === CHALLENGE_STEPS.length - 1;
      setTimeout(() => {
        if (isLast) {
          addLog('🎉 挑戰完成！你已經不需要按鈕了——真實終端機對你來說不再陌生。', 'success');
          setChallengeDone(true);
        } else {
          addLog(`✅ 正確！下一步：${CHALLENGE_STEPS[idx + 1].label}`, 'success');
          setChallengeIdx(idx + 1);
        }
      }, current.delay);
    } else {
      addLog(raw, 'input', 'cool-project $');
      const attempts = challengeAttempts + 1;
      setChallengeAttempts(attempts);
      addLog(attempts >= 2 ? current.hint2 : current.hint1, 'warning');
    }
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
            <div className="bg-slate-900 rounded-md px-3 py-2 font-mono text-xs text-red-300 whitespace-pre-wrap break-all">{"remote: Permission to company/cool-project.git denied to 你的帳號.\nfatal: unable to access 'https://github.com/company/cool-project.git/': The requested URL returned error: 403"}</div>
            <p>真實畫面的紅字長這樣——看到它就代表是<strong className="text-white">權限保護在作用，不是你打錯指令</strong>。</p>
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
                  <StepAction state={step > 0 ? 'done' : step === 0 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleClone} activeClass="bg-purple-600 hover:bg-purple-700" />
                </div>
                <div className="text-xs text-slate-500 mt-2">把雲端的專案完整打包下載到電腦。這會自動建立 .git 與 origin 連結！</div>
              </div>

              {/* Step 2 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 1 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 1 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ cd cool-project</div>
                  <StepAction state={step > 1 ? 'done' : step === 1 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleCd} activeClass="bg-purple-600 hover:bg-purple-700" />
                </div>
                <div className="text-xs text-red-500 font-bold mt-2">⚠️ 新手最常忘記這步！下載完記得用 cd (change directory) 進入資料夾，否則你後面的指令都會找不到 git！</div>
              </div>

              {/* Step 3 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 2 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 2 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git status</div>
                  <StepAction state={step > 2 ? 'done' : step === 2 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleStatus} activeClass="bg-purple-600 hover:bg-purple-700" />
                </div>
                <div className="text-xs text-slate-500 mt-2">好習慣：養成隨時看 status 的習慣，確認目前狀態是否乾淨。</div>
              </div>

              {/* Step 4a: git add */}
              <div className={`p-3 border rounded-lg transition-all ${step === 3 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 3 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git add .</div>
                  <StepAction state={step > 3 ? 'done' : step === 3 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleAdd} activeClass="bg-purple-600 hover:bg-purple-700" />
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
                  <StepAction state={step > 4 ? 'done' : step === 4 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleCommit} activeClass="bg-purple-600 hover:bg-purple-700" />
                </div>
                <div className="text-xs text-slate-500 mt-2">正式建立快照！<code>-m</code> 後面是這次存檔的說明文字。</div>
              </div>

              {/* Step 5 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 5 ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-50' : step > 5 ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git push</div>
                  <StepAction state={step > 5 ? 'done' : step === 5 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handlePush} activeClass="bg-purple-600 hover:bg-purple-700 animate-pulse" />
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
        <TerminalSim
          logs={logs}
          promptLabel={step >= 2 ? "cool-project $" : "~ $"}
          height="h-48"
          onCommand={challengeMode && !challengeDone ? handleTerminalCommand : undefined}
        />
      </div>

      {step === MAX_STEP && !challengeMode && (
        <Callout variant="success" title="第一輪完成！你已經看懂整個流程了。" className="mt-4">
          <p className="mb-3">現在換第二輪——這次不能按按鈕了，改成你自己在下面的終端機裡打指令。把「第一次打指令」的緊張感，先在這個安全的地方消耗掉。</p>
          <button
            type="button"
            onClick={startChallenge}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow"
          >
            🔄 第二輪挑戰：這次換你打指令
          </button>
        </Callout>
      )}

      {challengeMode && !challengeDone && (
        <div className="flex justify-end mt-2">
          <button type="button" onClick={abandonChallenge} className="text-xs text-slate-500 hover:text-red-600 underline">
            放棄挑戰，回到按鈕模式
          </button>
        </div>
      )}

      {challengeDone && (
        <Callout variant="success" title="🎉 挑戰完成" className="mt-4">
          你已經不需要按鈕了——真實終端機對你來說不再陌生。
        </Callout>
      )}

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
               <NoOutputHint>想確認的話輸入 <code>git status</code>——看到那個檔案變回紅色（未暫存）就代表拿出來了。</NoOutputHint>
               <p className="text-xs text-slate-500 mt-2">* 這只會把它移出暫存區，不會刪除你的程式碼。restore = 搭時光機回到上一個存檔點的狀態。</p>
             </div>

             <div className="bg-white p-4 rounded border border-red-100 shadow-sm">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">💥 案發現場 2：把程式碼改壞了</div>
               <p className="text-sm text-slate-600 mb-2">剛剛亂改一通，程式全壞了，我想讓這個檔案回到最後一次 Commit 的狀態！</p>
               <CommandBlock command="git restore <檔案名>" />
               <NoOutputHint>想確認的話輸入 <code>git status</code>——那個檔案從變動清單上消失，就代表已還原成功。</NoOutputHint>
               <Callout variant="danger" className="mt-2">
                 這會讓你剛寫的程式碼<strong>永遠消失</strong>，回不去了！執行前先確定你真的不要那些修改。
               </Callout>
             </div>

             <div className="bg-white p-4 rounded border border-red-100 shadow-sm md:col-span-2">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">😵 案發現場 3：畫面出現 detached HEAD</div>
               <p className="text-sm text-slate-600 mb-2">看到 <code>You are in 'detached HEAD' state</code> → 別慌，這只是你時光旅行到了舊存檔點。</p>
               <CommandBlock command="git checkout main" comment="輸入這行就回到現在了" />
               <CommandBlock variant="output" command={"Switched to branch 'main'"} className="mt-2" />
             </div>
           </div>
        </Card>
      </div>

      <Quiz
        questions={[
          {
            q: 'Clone 完一個專案後，直接在原本的資料夾位置打 git status 卻顯示找不到 git repository，最可能是忘了做什麼？',
            options: [
              '忘記先 cd 進入 clone 下來的資料夾，指令還停在外層目錄',
              'git clone 指令本身失敗了，需要重新下載',
              'GitHub 那個 repo 其實是空的',
            ],
            answer: 0,
            explain: 'git clone 會在目前位置新建一個「以專案命名」的子資料夾，並把 .git 放在那個子資料夾裡，不是放在你執行指令的當下位置。沒有 cd 進去，你的終端機根本還站在外面，當然找不到任何 git 相關資訊。這是新手最常忘記的一步。',
          },
          {
            q: '執行 git status 後看到一堆紅色文字（Untracked files / Changes not staged），這代表？',
            options: [
              '出現錯誤了，程式碼可能已經損壞，要趕快搶救',
              '只是「狀態標示」——代表有檔案是新增或修改過、還沒放進暫存區，不是壞掉或出錯',
              '代表這個 repo 已經跟遠端斷線了',
            ],
            answer: 1,
            explain: '紅色在 git status 裡只是一種「顏色編碼」，用來標示尚未加入暫存區的變動（新檔案或被修改的檔案），完全不代表出錯。看到紅字就緊張、以為東西壞掉，是很多初學者的直覺誤解；正確反應是接著打 git add . 把它們放進暫存區，看到變成綠色（Changes to be committed）才是下一步 commit 的時機。',
          },
          {
            q: '你改壞了一個檔案、但還沒 git add，想讓它整個回到最後一次 commit 的乾淨狀態，該用哪個指令？',
            options: [
              'git restore <檔案名>——把還沒暫存的修改整個丟棄，回到上次 commit 的樣子',
              'git commit -m "還原"——重新 commit 一次就能蓋掉剛剛的錯誤',
              'git clone 重新下載一次專案最快最保險',
            ],
            answer: 0,
            explain: 'git restore <檔案名> 專門用來丟棄「尚未暫存」的修改，讓檔案回到最後一次 commit 時的狀態——但要注意這個動作會讓你剛寫的改動永久消失，執行前務必先確認真的不要了。commit 沒辦法「蓋掉」錯誤，它只會再新增一筆歷史紀錄；而重新 clone 則是殺雞用牛刀，且如果本地已經有其他未推送的改動還會被覆蓋，並不是正確的救援方式。',
          },
        ]}
      />
    </div>
  );
};
