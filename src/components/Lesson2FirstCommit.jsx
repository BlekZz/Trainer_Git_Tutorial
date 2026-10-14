import { useState, useRef } from 'react';
import { Quiz, SectionTitle, Card, TerminalSim, CommandBlock, Callout, NoOutputHint, FalseAlarm } from './Shared';
import { Search, Laptop, Folder, Github, Shield, PlusCircle, CheckCircle, Eye } from 'lucide-react';

const MAX_STEP = 4;

// StepAction — 一個步驟卡的「按鈕」在挑戰模式下切換成狀態徽章，
// 用包裝的方式接上既有的 step 狀態機，不改動原本的按鈕邏輯。
const StepAction = ({ state, challengeMode, onClick, activeClass }) => {
  if (challengeMode) {
    if (state === 'current') {
      return <span className="px-3 py-1 rounded text-xs font-bold text-white bg-indigo-500 animate-pulse shrink-0">🎯 請輸入</span>;
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

export const Lesson2FirstCommit = () => {
  const [step, setStep] = useState(0); // 0: initial, 1: init, 2: add/commit, 3: remote add, 4: push
  const [logs, setLogs] = useState([{ prefix: '$', text: '準備開始情境 A：從零開始建立專案。' }]);
  const repoUrl = "https://github.com/blake/my-new-project.git";
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

  const handleInit = () => {
    if (step >= 1) return;
    addLog('git init', 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog('Initialized empty Git repository in /project/.git/', 'success');
      setStep(1);
    }, 300);
  };

  const handleCommit = () => {
    if (step >= 2) return;
    addLog('git add .', 'input', '$');
    addLog('git commit -m "Initial commit"', 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog('[main (root-commit) 1a2b3c] Initial commit', 'success');
      setStep(2);
    }, 300);
  };

  const handleLink = () => {
    if (step >= 3) return;
    addLog(`git remote add origin ${repoUrl}`, 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog('（沒有任何輸出——這是正常的，代表成功了）', 'info');
      setStep(3);
    }, 300);
  };

  const handlePush = () => {
    if (step >= 4) return;
    addLog('git push -u origin main', 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog('Enumerating objects: 3, done.', 'info');
      addLog('Writing objects: 100% (3/3), 230 bytes | 230.00 KiB/s, done.', 'info');
      addLog('remote: Resolving deltas: 100% (0/0), done.', 'info');
      addLog(`To ${repoUrl}`, 'success');
      addLog(` * [new branch]      main -> main`, 'success');
      addLog(`Branch 'main' set up to track remote branch 'main' from 'origin'.`, 'success');
      setStep(4);
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

  // --- 挑戰模式：git add 與 git commit 在真實情境是兩個分開的指令，
  // 這裡各自寫一個小效果，讓學員一次只打一行 ---
  const challengeAddOnly = () => {
    addLog('git add .', 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog('（沒有任何輸出——這是正常的，代表成功了，檔案已進入暫存區）', 'info');
    }, 250);
  };

  const challengeCommitOnly = (raw) => {
    addLog(raw, 'input', '$');
    scrollToTerminal();
    setTimeout(() => {
      addLog('[main (root-commit) 1a2b3c] Initial commit', 'success');
      setStep(2);
    }, 300);
  };

  const normalize = (raw) => raw.trim().replace(/\s+/g, ' ');

  const CHALLENGE_STEPS = [
    {
      label: 'git init',
      match: (lower) => lower === 'git init',
      run: () => handleInit(),
      delay: 500,
      hint1: '提示：這一步要讓 Git 開始「認識」這個資料夾。',
      hint2: '指令是 git init',
    },
    {
      label: 'git add .',
      match: (lower) => lower === 'git add .' || lower === 'git add -a',
      run: () => challengeAddOnly(),
      delay: 450,
      hint1: '提示：下一步是把檔案放進暫存區。',
      hint2: '指令以 git add 開頭（試試 git add .）',
    },
    {
      label: 'git commit -m "..."',
      match: (lower, normalized) => lower.startsWith('git commit -m') && normalized.slice('git commit -m'.length).trim().length > 0,
      run: (normalized) => challengeCommitOnly(normalized),
      delay: 500,
      hint1: '提示：把暫存區的內容正式「拍照存檔」。',
      hint2: '指令以 git commit -m 開頭，後面接你的存檔說明文字',
    },
    {
      label: 'git remote add origin <網址>',
      match: (lower, normalized) => lower.startsWith('git remote add origin ') && normalized.slice('git remote add origin '.length).trim().length > 0,
      run: () => handleLink(),
      delay: 500,
      hint1: '提示：告訴 Git 雲端的網址在哪裡。',
      hint2: '指令是 git remote add origin 加上你的 repo 網址',
    },
    {
      label: 'git push -u origin main',
      match: (lower) => lower === 'git push -u origin main',
      run: () => handlePush(),
      delay: 1000,
      hint1: '提示：把本地端的存檔正式推上雲端。',
      hint2: '指令是 git push -u origin main',
    },
  ];

  const startChallenge = () => {
    setChallengeMode(true);
    setChallengeIdx(0);
    setChallengeAttempts(0);
    setChallengeDone(false);
    setStep(0);
    setLogs([{ prefix: '>', text: '挑戰開始！第 1 步：初始化這個資料夾（忘記指令可以往上看步驟卡）', type: 'info' }]);
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
      addLog(raw, 'input', '$');
      const attempts = challengeAttempts + 1;
      setChallengeAttempts(attempts);
      addLog(attempts >= 2 ? current.hint2 : current.hint1, 'warning');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle title="L2. 情境 A：從零開始" subtitle="自己當造物主，將本地專案上傳到 GitHub" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-base leading-none mt-0.5">💻</span>
          <p className="text-sm text-slate-300"><strong className="text-white">本章所有操作都透過 Terminal 指令完成。</strong>請確保你已經打開終端機（建議用 VSCode 內建終端），並且知道如何在裡面操作目錄。</p>
        </div>
      </div>


      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-slate-50">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-slate-700 flex items-center gap-2"><PlusCircle size={18} /> 操作步驟</h3>
              <button onClick={reset} className="text-xs text-slate-500 hover:text-indigo-600 underline">重新開始</button>
            </div>
            <Callout variant="info" className="mb-3" title="以下是示意模擬">
              點「執行」可以看到邏輯流程。<strong>實際操作請在你電腦真正的 Terminal 裡輸入同樣的指令</strong>（本章末的「換你了」區塊會帶你做一次）。範例中的 Repository URL 是假想的，僅供教學演示。
            </Callout>

            <div className="space-y-3">

              {/* Step 1 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 0 ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-50' : step > 0 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git init</div>
                  <StepAction state={step > 0 ? 'done' : step === 0 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleInit} activeClass="bg-indigo-600 hover:bg-indigo-700" />
                </div>
                <div className="text-xs text-slate-500 mt-2">在目前資料夾建立 .git，開始追蹤檔案。</div>
              </div>

              {step >= 1 && (
                <Callout variant="danger" title="你的資料夾裡多了一個 .git 資料夾">
                  它就是你的<strong>存檔資料庫</strong>，記錄了所有版本歷史。<strong>絕對不要手動刪除或修改它</strong>——刪掉它等於刪掉所有存檔紀錄，而且救不回來。（它預設是隱藏檔案，平常看不到很正常。）
                </Callout>
              )}

              {/* Step 2 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 1 ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-50' : step > 1 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git add . <br/>$ git commit -m "Init"</div>
                  <StepAction state={step > 1 ? 'done' : step === 1 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleCommit} activeClass="bg-indigo-600 hover:bg-indigo-700" />
                </div>
                <div className="text-xs text-slate-500 mt-2">先把本地端的檔案正式存檔一次。<strong className="text-slate-600">注意：這是兩條分開的指令，實作時要一行一行輸入。</strong></div>
              </div>

              {step === 1 && (
                <Callout variant="info" title="第一次遇到「暫存區」？">
                  <code>git add</code> = 把要拍照的東西擺上桌（放進暫存區）；<code>git commit</code> = 按下快門（正式存檔）。兩個指令合體才算完成一次存檔。
                </Callout>
              )}

              {/* Step 3 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 2 ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-50' : step > 2 ? 'bg-green-50 border-green-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700 truncate mr-2" title={`$ git remote add origin ${repoUrl}`}>
                    $ git remote add origin {repoUrl.split('/').pop()}
                  </div>
                  <StepAction state={step > 2 ? 'done' : step === 2 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handleLink} activeClass="bg-indigo-600 hover:bg-indigo-700" />
                </div>
                <div className="text-xs text-slate-500 mt-2">告訴 Git 雲端的網址在哪裡（命名為 origin）。</div>
              </div>

              {step === 2 && (
                <Callout variant="info" title="真實終端裡這個指令通常「沒消息就是好消息」">
                  <code>git remote add</code> 執行成功時<strong>不會顯示任何訊息</strong>——空白畫面就代表成功了。想確認可以輸入 <code>git remote -v</code>，會列出剛剛連結的網址。
                </Callout>
              )}

              {/* Step 4 */}
              <div className={`p-3 border rounded-lg transition-all ${step === 3 ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-50' : step > 3 ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-slate-700">$ git push -u origin main</div>
                  <StepAction state={step > 3 ? 'done' : step === 3 ? 'current' : 'pending'} challengeMode={challengeMode} onClick={handlePush} activeClass="bg-indigo-600 hover:bg-indigo-700 animate-pulse" />
                </div>
                <div className="text-xs text-slate-500 mt-2">把本地的進度推上雲端！(-u 會記住預設目標)</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Visual Feedback */}
        <div className="flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200 p-8 relative overflow-hidden">
          {step === 4 && <div className="absolute inset-0 bg-green-50/50 z-0 animate-fade-in pointer-events-none"></div>}
          
          <div className="relative flex items-center gap-20 z-10 w-full justify-center">
             {/* Local Folder */}
             <div className="flex flex-col items-center relative">
               <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${step >= 1 ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' : 'bg-white text-slate-300 border border-slate-200'}`}>
                 <Laptop size={40} />
               </div>
               {step >= 1 && (
                 <div className="absolute -right-3 -top-3 w-9 h-9 bg-yellow-100 border-2 border-yellow-300 rounded-lg flex items-center justify-center shadow-md animate-fade-in" title=".git folder created">
                   <Folder size={14} className="text-yellow-600" />
                   <span className="absolute text-[7px] font-black text-yellow-700 -bottom-0.5">.git</span>
                 </div>
               )}
               {step >= 2 && step < 4 && (
                 <div className="absolute -bottom-2 bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold animate-fade-in whitespace-nowrap border border-green-200">
                   已存檔 (待上傳)
                 </div>
               )}
               <span className="mt-4 font-bold text-slate-600">Local (你的電腦)</span>
             </div>

             {/* Connection Line */}
             <div className="absolute left-10 right-10 top-10 h-1 bg-slate-200 -z-10 rounded-full">
               <div className={`h-full rounded-full transition-all duration-1000 ease-out bg-indigo-500 ${step >= 3 ? 'w-full opacity-50' : 'w-0'} ${step === 4 ? 'opacity-100 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''}`}></div>
             </div>
             
             {step === 3 && (
               <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 animate-fade-in px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                 已連結 (Ready)
               </div>
             )}
             
             {step === 4 && (
               <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 animate-fade-in px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                 <CheckCircle size={14} /> 上傳成功！
               </div>
             )}

             {/* GitHub Repo */}
             <div className="flex flex-col items-center relative">
               <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${step >= 4 ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-300 border border-slate-200'}`}>
                 <Github size={40} />
               </div>
               <span className="mt-4 font-bold text-slate-600">Remote (GitHub)</span>

               {step >= 4 && (
                 <div className="absolute -right-5 top-1 flex flex-col gap-0.5 animate-fade-in">
                   <div className="flex items-center justify-center gap-1 bg-green-100 border border-green-300 rounded px-1.5 py-0.5 shadow-sm text-[9px] text-green-700 font-bold">
                     <Shield size={10} /> 備份完成
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      <div className="mt-8" ref={terminalRef}>
        <TerminalSim logs={logs} height="h-48" onCommand={challengeMode && !challengeDone ? handleTerminalCommand : undefined} />
      </div>

      {step === MAX_STEP && !challengeMode && (
        <Callout variant="success" title="第一輪完成！你已經看懂整個流程了。" className="mt-4">
          <p className="mb-3">現在換第二輪——這次不能按按鈕了，改成你自己在下面的終端機裡打指令。把「第一次打指令」的緊張感，先在這個安全的地方消耗掉。</p>
          <button
            type="button"
            onClick={startChallenge}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow"
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

      {/* Gitignore & Git Log */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="bg-emerald-50 border-emerald-200">
           <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
             <Eye size={18} /> 偷看遊戲存檔：git log
           </h3>
           <p className="text-sm text-emerald-700 mb-3">
             存檔完通常會心虛：「它真的存進去了嗎？」<code>git log</code> 就是打開時光機的儀表板，列出你所有可以回去的存檔點。
           </p>
           <CommandBlock variant="output" command={'git log --oneline\na1b2c3d (HEAD -> main) feat: 結帳功能\n9f8e7d6 docs: 更新說明'} className="mb-3" />
           <FalseAlarm signal={':'} title="畫面卡住、打字沒反應？" className="mb-3">
             紀錄一多，<code>git log</code> 會進入「瀏覽畫面」：底部出現一個 <code>:</code>，怎麼打字都沒反應。這不是當機——按 <code>q</code> 就能離開、回到指令列。
           </FalseAlarm>
           <p className="text-sm text-emerald-700">
             <strong>💡 視覺化推薦：</strong>如果你覺得純文字太難懂，記得打開我們在 <a href="#setup" className="underline font-bold hover:text-emerald-900">L0 行前準備</a> 中請你裝的 <strong>Git Graph 外掛</strong>，它會在 VSCode 裡畫出超美的時間線樹狀圖喔！
           </p>
        </Card>
      </div>

      {/* 換你了：真機實作 */}
      <div className="mt-10">
        <SectionTitle title="🔥 換你了：在真實電腦上做一次" subtitle="模擬跑完了，現在換你在真實電腦上做一次。" />

        <div className="space-y-4">
          <Card>
            <h4 className="font-bold text-slate-700 mb-2">1. 用 VSCode 建一個資料夾</h4>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600">
              <li>在桌面點右鍵 →「新增資料夾」，命名為 <code className="bg-slate-100 px-1 rounded">my-first-repo</code></li>
              <li>打開 VSCode，選單 <strong>File → Open Folder</strong>，選擇剛剛建立的資料夾</li>
              <li>左側檔案總管區點右鍵 →「New File」，建立 <code className="bg-slate-100 px-1 rounded">notes.md</code></li>
              <li>在檔案裡隨便寫一句話，按 <code className="bg-slate-100 px-1 rounded">Ctrl+S</code> 存檔</li>
            </ol>
          </Card>

          <Card>
            <h4 className="font-bold text-slate-700 mb-2">2. 打開終端機</h4>
            <p className="text-sm text-slate-600">VSCode 上方選單 <strong>Terminal → New Terminal</strong>（它會自動在你的資料夾裡，不用 cd）。</p>
            <p className="text-sm text-slate-600 mt-2">你的畫面開頭可能是 <code className="bg-slate-100 px-1 rounded">PS C:\Users\...&gt;</code> 而不是 <code className="bg-slate-100 px-1 rounded">$</code>——只是提示符號長得不同，完全不影響操作。教學中的 <code className="bg-slate-100 px-1 rounded">$</code> 只代表「指令從這裡開始」，<strong>不用把 $ 打進去</strong>。</p>
          </Card>

          <Card>
            <h4 className="font-bold text-slate-700 mb-2">3. 逐行輸入以下指令</h4>
            <div className="space-y-3">
              <CommandBlock command="git init" comment="初始化這個資料夾為 Git 專案" />
              <CommandBlock variant="output" command={'Initialized empty Git repository in C:/Users/你的名字/Desktop/my-first-repo/.git/'} />
              <CommandBlock command="git add ." comment="把 notes.md 放進暫存區" />
              <NoOutputHint>如果出現下面那行黃色 warning，也一樣算成功。</NoOutputHint>
              <FalseAlarm signal={'warning: LF will be replaced by CRLF in notes.md'}>
                Windows 電腦很常出現這行黃字。它只是在提醒你「換行符號會自動轉換」，<strong>不是錯誤</strong>——忽略它，直接輸入下一條指令即可。
              </FalseAlarm>
              <CommandBlock command='git commit -m "我的第一次存檔"' />
              <CommandBlock variant="output" command={'[main (root-commit) 1a2b3c] 我的第一次存檔\n 1 file changed, 1 insertion(+)\n create mode 100644 notes.md'} />
              <FalseAlarm signal={'~\n~\n~\n(整個畫面突然變樣，滿滿都是 ~ 符號)'} title="忘了打 -m，掉進奇怪的畫面？">
                如果只打了 <code>git commit</code>（忘了 <code>-m "..."</code>），Git 會把你丟進一個滿是 <code>~</code> 的文字編輯器（vim）。逃出方法：先按 <code>Esc</code>，再輸入 <code>:q!</code> 然後按 Enter，就會回到指令列——重新打一次完整的 <code>git commit -m "..."</code> 就好。
              </FalseAlarm>
            </div>
          </Card>

        </div>
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

    <Quiz questions={[{
            q: '執行 git status 後看到一堆紅色文字（Untracked files / Changes not staged），這代表？',
            options: [
              '出現錯誤了，程式碼可能已經損壞，要趕快搶救',
              '只是「狀態標示」——代表有檔案是新增或修改過、還沒放進暫存區，不是壞掉或出錯',
              '代表這個 repo 已經跟遠端斷線了',
            ],
            answer: 1,
            explain: '紅色在 git status 裡只是一種「顏色編碼」，用來標示尚未加入暫存區的變動（新檔案或被修改的檔案），完全不代表出錯。看到紅字就緊張、以為東西壞掉，是很多初學者的直覺誤解；正確反應是接著打 git add . 把它們放進暫存區，看到變成綠色（Changes to be committed）才是下一步 commit 的時機。',
          }]} />
</div>
  );
};
