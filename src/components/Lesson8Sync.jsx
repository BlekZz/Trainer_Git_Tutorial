import { useState, useRef } from 'react';
import { SectionTitle, InstructionalText, CommandBlock, Callout, NoOutputHint, Card, Badge, Quiz, TerminalSim } from './Shared';
import { ArrowRight, Github, Map, Laptop, Download, PlusCircle, CheckCircle, FileText, Search, GitCommit, Cloud, ArrowLeft, AlertCircle, User } from 'lucide-react';

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

const CloneSimulation = () => {
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
      <SectionTitle title="L8. 情境 B：參與現有專案" subtitle="下載、修改、上傳的三部曲" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-2 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-base leading-none mt-0.5">💻</span>
          <p className="text-sm text-slate-300">Clone 完記得 <code className="bg-slate-700 px-1 rounded">cd 專案名稱</code> 進入資料夾，否則後續指令都找不到專案。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">🔍</span>
          <p className="text-sm text-slate-300">進入專案後，養成先 <code className="bg-slate-700 px-1 rounded">git status</code> 的習慣，確認工作區乾淨再開始修改（見下方速查表）。</p>
        </div>
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
              點「執行」可以看到邏輯流程。<strong>實際操作請在你電腦真正的 Terminal 裡輸入同樣的指令。</strong>關於 Push 的實際練習，請等到 E2。
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
          
          
        ]}
      />
    </div>
  );
};


const SyncSimulation = () => {
  // Push/Pull State
  const [localCommits, setLocalCommits] = useState([{ id: 'c1', msg: 'Initial commit', time: '10:00' }]);
  const [remoteCommits, setRemoteCommits] = useState([{ id: 'c1', msg: 'Initial commit', time: '10:00' }]);
  const [logs, setLogs] = useState([{ prefix: '$', text: '同步模擬環境已就緒。' }]);
  const [pendingChanges, setPendingChanges] = useState(false); 

  // Merge/Rebase State

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
    } else if (command.startsWith('git push')) {
      doPush();
    } else if (command.startsWith('git pull')) {
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
      addLog('To https://github.com/project.git', 'error', '');
      addLog(' ! [rejected]        main -> main (fetch first)', 'error', '');
      addLog("error: failed to push some refs to 'https://github.com/project.git'", 'error', '');
      addLog('hint: Updates were rejected because the remote contains work that you do not have locally.', 'error', '');
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
    if (localExclusive.length === 0) {
      addLog(`Updating ${localHeadId}..${remoteHeadId}`, 'success');
      addLog('Fast-forward', 'success', '');
    } else {
      addLog("Merge made by the 'ort' strategy.", 'success');
    }
  };

  const simulateTeammatePush = () => {
    const lastRemoteIdNum = parseInt(remoteCommits[remoteCommits.length - 1].id.substring(1));
    const nextId = `c${lastRemoteIdNum + 10}`; 
    const newCommit = { id: nextId, msg: 'Teammate fixed bug', time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) };
    
    setRemoteCommits([...remoteCommits, newCommit]);
    addLog('模擬：同事剛好上傳了新的 Commit (ID: ' + nextId + ')。', 'warning', 'System');
  };


  return (
    <div className="animate-fade-in space-y-12">
      <SectionTitle title="L8. 遠端同步與衝突" subtitle="Push 與 Pull 的日常拔河，以及兩條宇宙的碰撞" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
          <p className="text-sm text-slate-300"><strong className="text-white">你的 GitHub 帳號必須已經連線（gh auth login 完成）。</strong>否則 Push 時會出現 403 Permission Denied 或要求密碼。<code className="bg-slate-700 px-1 rounded">gh auth login</code> 會問你一連串問題（GitHub.com／HTTPS／用瀏覽器登入），照畫面一步步選即可。還沒完成的話，請先回到 <a href="#push" className="underline font-bold text-white hover:text-green-300">L6 GitHub 與第一次 push</a>。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-orange-400 text-base leading-none mt-0.5">🚧</span>
          <p className="text-sm text-slate-300"><strong className="text-white">若看到 <code className="bg-slate-700 px-1 rounded">Permission denied (publickey)</code></strong>——你的電腦在用 SSH 連 GitHub，本教程全程用 HTTPS，請到錯誤急診室查「Permission denied (publickey)」這一條。另外，用 HTTPS 第一次 push 時，Windows 可能彈出要你登入 GitHub 的視窗——這是正常的，登入一次就會記住。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">⬇️</span>
          <p className="text-sm text-slate-300"><strong className="text-white">黃金法則：先 Pull 再 Push。</strong>每次開始工作前，先 <code className="bg-slate-700 px-1 rounded">git pull</code> 把同事的最新進度同步下來，再開始你的修改，能大幅減少衝突的機率。輸入後看到 <code className="bg-slate-700 px-1 rounded">Already up to date.</code> 表示本來就最新（沒事）；看到 <code className="bg-slate-700 px-1 rounded">Fast-forward</code> 加一串檔案清單，表示有抓到更新（也正常）。</p>
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
          執行 <code className="bg-amber-100 px-1 rounded">git pull</code> 時如果出現 <code className="bg-amber-100 px-1 rounded">fatal: Need to specify how to reconcile divergent branches</code>——這是新版 Git 在問你要用哪種方式合併。執行下面這行指令（<a href="#setup" className="underline font-bold hover:text-amber-950">L0 行前準備</a>建議的設定）後，再 <code className="bg-amber-100 px-1 rounded">git pull</code> 一次即可。
        </Callout>
        <CommandBlock command="git config --global pull.rebase false" comment="只需要設定一次，之後每次 pull 都適用" />
        <NoOutputHint className="mb-4" />
        <Callout variant="warning" title="設定完之後 pull 可能出現的黑畫面" className="mb-8">
          設成 false 之後，如果遠端和你的進度有分歧，<code className="bg-amber-100 px-1 rounded">git pull</code> 可能會跳出一個滿是 <code className="bg-amber-100 px-1 rounded">~</code> 符號的黑畫面（它是 Vim 編輯器），要你確認合併訊息。不要慌：按 <code className="bg-amber-100 px-1 rounded">Esc</code>，輸入 <code className="bg-amber-100 px-1 rounded">:wq</code>，按 <code className="bg-amber-100 px-1 rounded">Enter</code>，就會完成合併。這招和本章下方 Part 2 的「🆘 Vim 救命卡」是同一套逃生術。
        </Callout>

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

                <Callout variant="info" className="text-sm">
                  真實終端裡 push 會滾動 <code className="bg-blue-100 px-1 rounded">Enumerating objects...</code>、<code className="bg-blue-100 px-1 rounded">Writing objects: 100%</code> 的進度行，還有 <code className="bg-blue-100 px-1 rounded">remote:</code> 開頭的訊息——那些都是 GitHub 的正常回應，不是錯誤。
                </Callout>

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
          全站只有這裡的終端機可以真的輸入！試試看打 <code className="bg-blue-100 px-1 rounded">git add .</code>。（真實終端裡打 git add 若冒出黃字 <code className="bg-blue-100 px-1 rounded">warning: LF will be replaced by CRLF</code>，是正常的換行提醒，不是錯誤。）
        </Callout>
        <TerminalSim logs={logs} onCommand={handleCommand} height="h-48" />
      </section>

      <Quiz
        questions={[
          {
            q: '你打了 git push，結果終端機顯示「Rejected! Remote contains work that you do not have.」，第一步該怎麼做？',
            options: [
              '加上 --force 再 push 一次，把遠端蓋過去',
              '先 git pull，把遠端上你沒有的進度同步下來，再 push',
              '這代表帳號沒連線，重新 gh auth login',
            ],
            answer: 1,
            explain: 'Rejected 代表遠端有你本地沒有的 commit，Git 是在保護那些內容不被你覆蓋，不是連線問題。用 --force 硬推會把同事的 commit 直接抹掉，是新手最危險的直覺反應。正確做法就是章節開頭的黃金法則：先 pull 再 push——把遠端進度拉下來合併好，才有資格再上傳。',
          },
          
          
        ]}
      />
    </div>
  );
};


export const Lesson8Sync = () => {

return (<div className="space-y-6 animate-fade-in">
<SectionTitle title="L8 兩台電腦的同步" />
<SyncSimulation /><CloneSimulation />
    <InstructionalText title="在開始之前，你必須先知道你處於哪個「情境」" icon={<Map size={18} className="text-indigo-600" />}>
      <p>初學者最常犯的錯誤，就是亂下指令。在你要輸入任何 <code>git</code> 指令前，請先問自己一個問題：<br />
      <strong>「這個專案是全新的（我剛剛在電腦裡開的資料夾），還是已經存在於 GitHub 上了？」</strong></p>
    </InstructionalText>

    <div className="grid md:grid-cols-2 gap-8 relative">
      {/* 裝飾分隔線 */}
      <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2"></div>
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center text-xs font-bold text-slate-400 z-10">VS</div>

      <Card className="bg-indigo-50/50 border-indigo-100 hover:shadow-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <PlusCircle size={100} />
        </div>
        <div className="relative z-10">
          <Badge color="indigo">情境 A</Badge>
          <h3 className="text-xl font-bold text-indigo-900 mt-3 mb-2 flex items-center gap-2">
            自己當造物主：從零開始
          </h3>
          <p className="text-sm text-indigo-700 mb-6 h-10">
            你自己在電腦裡寫好了一些 Code，現在你想把它們推上 GitHub 備份。
          </p>

        </div>
      </Card>

      {/* 情境 B */}
      <Card className="bg-purple-50/50 border-purple-100 hover:shadow-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Download size={100} />
        </div>
        <div className="relative z-10">
          <Badge color="purple">情境 B</Badge>
          <h3 className="text-xl font-bold text-purple-900 mt-3 mb-2 flex items-center gap-2">
            加入大部隊：參與現有專案
          </h3>
          <p className="text-sm text-purple-700 mb-6 h-10">
            專案已經存在於 GitHub 上（例如公司的專案，或是別人的開源專案），你要下載下來開發。
          </p>

        </div>
      </Card>
    </div>
    
    <Callout variant="info" className="justify-center text-center">
      <span className="font-bold">接下來的兩個章節，我們將分別帶你實際演練這兩條路線！點下方的「下一章」按鈕繼續。</span>
    </Callout>

    <Quiz
      questions={[
        {
          q: '公司請你加入一個已經在 GitHub 上存在的專案，你打開終端機後，第一個該打的指令是什麼？',
          options: [
            'git init，先把自己的資料夾初始化',
            'git clone <URL>，把整個專案下載到本機',
            'git push -u origin main，先把自己的東西推上去',
          ],
          answer: 1,
          explain: '這是情境 B：專案已經存在雲端，你要做的是「下載」而不是「新建」。git init 是情境 A 專用（從零開始的全新專案），在這裡用會建立一個和 GitHub 上專案完全無關的空倉庫。git push 更是本末倒置——你連專案內容都還沒有，根本沒東西可推。',
        },
        {
          q: '情境 A（從零開始）和情境 B（加入現有專案），兩者最關鍵的差別是什麼？',
          options: [
            '情境 A 用 git，情境 B 用 GitHub，是兩套不同的工具',
            '情境 A 從「本機沒有任何 Git 紀錄」開始要用 git init 建立，情境 B 從「雲端已有專案」開始要用 git clone 下載',
            '情境 A 只能自己一個人用，情境 B 才能多人協作',
          ],
          answer: 1,
          explain: '差別在於「起點」：情境 A 是你電腦裡先有程式碼、Git 世界裡完全沒有這個專案的痕跡，所以要 git init 從無到有建立版本控制，再手動連結遠端 (remote add)。情境 B 是雲端已經有現成的專案，git clone 會直接把整個歷史和遠端連結都幫你設定好。兩者都是同一套 Git，情境 A 之後一樣能多人協作。',
        },
        {
          q: '拿到一個新的開發任務，在打任何 git 指令之前，你應該先判斷什麼？',
          options: [
            '先判斷這個專案的程式語言是什麼',
            '先判斷「這個專案是我剛在電腦裡新建的，還是已經存在於 GitHub 上了」，決定走情境 A 還是情境 B',
            '先判斷公司用的是 GitHub 還是 GitLab',
          ],
          answer: 1,
          explain: '這正是本章的核心提醒：初學者最常犯的錯就是不分情境亂下指令，例如專案明明已經在 GitHub 上，卻對著它打 git init。先判斷「新專案 vs 已存在的專案」，才能決定接下來該走哪一條路線，避免搞出兩個互不相關的版本歷史。',
        },
      ]}
    />

</div>);
};
