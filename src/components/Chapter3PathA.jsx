import React, { useState, useRef } from 'react';
import { SectionTitle, Card, TerminalSim, InstructionalText, CommandBlock, Callout, Quiz } from './Shared';
import { Laptop, Folder, ArrowRight, Github, Shield, PlusCircle, CheckCircle, FileText, Eye, ShieldAlert } from 'lucide-react';

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

export const Chapter3PathA = () => {
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
      <SectionTitle title="3. 情境 A：從零開始" subtitle="自己當造物主，將本地專案上傳到 GitHub" />

      {/* 進入狀態提示 */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-base leading-none mt-0.5">💻</span>
          <p className="text-sm text-slate-300"><strong className="text-white">本章所有操作都透過 Terminal 指令完成。</strong>請確保你已經打開終端機（建議用 VSCode 內建終端），並且知道如何在裡面操作目錄。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
          <p className="text-sm text-slate-300"><strong className="text-white">需要一個已登入且連線的 GitHub 帳號。</strong>如果還沒有註冊 / 登入 GitHub，請先回到零基礎新手安裝指南完成註冊。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">📂</span>
          <div className="text-sm text-slate-300">
            <strong className="text-white">先在 GitHub 網頁上建好一個空白的新 Repository：</strong>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-slate-300">
              <li>登入 GitHub，點右上角的 <strong className="text-white">"+"</strong> → <strong className="text-white">New repository</strong></li>
              <li>取一個 Repository 名稱（例如 <code className="bg-slate-700 px-1 rounded">my-first-repo</code>）</li>
              <li>選擇 <strong className="text-white">Public</strong></li>
              <li className="text-red-300 font-bold">⚠️ 關鍵：「Add a README file」、「Add .gitignore」、「Choose a license」這三個選項全部<strong>不要勾選</strong>，保持完全空白！（勾了會造成歷史衝突，Push 時會被拒絕）</li>
              <li>點 <strong className="text-white">Create repository</strong>，然後複製頁面上的 HTTPS 網址備用（格式：<code className="bg-slate-700 px-1 rounded text-slate-300">https://github.com/你的帳號/專案名.git</code>）</li>
            </ol>
          </div>
        </div>
      </div>

      <InstructionalText title="什麼時候會用到？">
        <p>你用 VSCode 在電腦裡建立了一個資料夾，寫好了幾個 HTML 檔案，現在你想把它們上傳到 GitHub 備份，並分享給全世界。</p>
      </InstructionalText>

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
                <div className="text-xs text-slate-500 mt-2">先把本地端的檔案正式存檔一次。</div>
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

      {/* Commit Message Guidelines */}
      <div className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
           <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
             <FileText size={18} /> 養成好習慣：Commit Message 怎麼寫？
           </h3>
           <p className="text-sm text-blue-700 mb-4">好的 Commit Message 能讓同事（或一個月後的你）秒懂你改了什麼。業界通常會使用「前綴 (Prefix)」來分類：</p>
           <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-blue-600 bg-blue-100 px-1 rounded">feat:</span> 新增功能</div>
               <div className="text-slate-500 mt-1">例如：<code>feat: 新增購物車結帳按鈕</code></div>
             </div>
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-red-600 bg-red-100 px-1 rounded">fix:</span> 修復 Bug</div>
               <div className="text-slate-500 mt-1">例如：<code>fix: 修正登入失敗時不會跳出警告的問題</code></div>
             </div>
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-purple-600 bg-purple-100 px-1 rounded">docs:</span> 文件修改</div>
               <div className="text-slate-500 mt-1">例如：<code>docs: 更新 README 安裝教學</code></div>
             </div>
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-green-600 bg-green-100 px-1 rounded">style:</span> 格式修改</div>
               <div className="text-slate-500 mt-1">例如：<code>style: 調整首頁標題字體大小</code></div>
             </div>
           </div>
        </Card>
      </div>

      {/* Gitignore & Git Log */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="bg-yellow-50 border-yellow-200">
           <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
             <ShieldAlert size={18} /> 防雷神針：隱形斗篷 .gitignore
           </h3>
           <p className="text-sm text-yellow-700 mb-3">
             新手最常犯的錯，就是把「幾萬個暫存檔 (如 <code>node_modules</code>)」或是「寫有資料庫密碼的檔案」一起 <code>git add .</code> 傳上 GitHub，導致專案又肥又危險。
           </p>
           <p className="text-sm text-yellow-700 font-bold mb-2">解決方法：</p>
           <p className="text-sm text-yellow-700">
             在專案資料夾底下建立一個名為 <code>.gitignore</code> 的檔案。在裡面寫上你不想被 Git 追蹤的檔案或資料夾名稱。Git 就會當作沒看到它們！<br/>
             <span className="text-xs text-yellow-600">用 VSCode 檔案總管右鍵 → New File，檔名輸入 <code>.gitignore</code>（對，開頭就是一個點）。</span>
           </p>
           <div className="bg-slate-900 rounded p-3 mt-3 font-mono text-xs text-green-400">
             # 檔案名稱：.gitignore<br/>
             node_modules/<br/>
             .env<br/>
             *.log
           </div>
           <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
             <div className="text-xs font-bold text-purple-800 mb-2">📊 數據分析菜鳥版（Python / Jupyter）</div>
             <div className="bg-slate-900 rounded p-2 font-mono text-xs text-green-400">
               # Python 數據分析常見需要忽略的<br/>
               __pycache__/<br/>
               .ipynb_checkpoints/<br/>
               .env<br/>
               *.pyc<br/>
               data/raw/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 原始資料通常不放 Git
             </div>
           </div>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
           <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
             <Eye size={18} /> 偷看遊戲存檔：git log
           </h3>
           <p className="text-sm text-emerald-700 mb-3">
             存檔完通常會心虛：「它真的存進去了嗎？」<code>git log</code> 就是打開時光機的儀表板，列出你所有可以回去的存檔點。
           </p>
           <CommandBlock variant="output" command={'git log --oneline\na1b2c3d (HEAD -> main) feat: 結帳功能\n9f8e7d6 docs: 更新說明'} className="mb-3" />
           <p className="text-sm text-emerald-700">
             <strong>💡 視覺化推薦：</strong>如果你覺得純文字太難懂，記得打開我們在安裝教學中請你裝的 <strong>Git Graph 外掛</strong>，它會在 VSCode 裡畫出超美的時間線樹狀圖喔！
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
          </Card>

          <Card>
            <h4 className="font-bold text-slate-700 mb-2">3. 逐行輸入以下指令</h4>
            <div className="space-y-3">
              <CommandBlock command="git init" comment="初始化這個資料夾為 Git 專案" />
              <CommandBlock command="git add ." comment="把 notes.md 放進暫存區" />
              <CommandBlock command='git commit -m "我的第一次存檔"' />
            </div>
          </Card>

          <Card>
            <h4 className="font-bold text-slate-700 mb-2">4. 到 GitHub 建一個空 repo</h4>
            <p className="text-sm text-slate-600">回到本章最上面「⚡ 進入狀態」區塊，照著步驟建立一個空白 Repository（記得三個選項都<strong>不要勾</strong>），並複製它的 HTTPS 網址。</p>
          </Card>

          <Card>
            <h4 className="font-bold text-slate-700 mb-2">5. 連結並上傳</h4>
            <div className="space-y-3">
              <CommandBlock command="git remote add origin https://github.com/你的帳號/my-first-repo.git" comment="記得換成你自己複製的網址" />
              <CommandBlock command="git branch -M main" comment="確保主分支叫 main（有些電腦預設叫 master，會對不上下一行指令）" />
              <CommandBlock command="git push -u origin main" />
            </div>
            <Callout variant="info" className="mt-3">
              如果 push 時跳出瀏覽器登入視窗，照著登入即可，這是正常的身分驗證流程。
            </Callout>
          </Card>

          <Callout variant="success" title="驗證點">
            打開你 GitHub 的 repo 頁面按 <strong>F5 重新整理</strong>——看到 <code>notes.md</code> 出現，恭喜你完成了人生第一次 push！
          </Callout>
        </div>
      </div>

      <Quiz
        questions={[
          {
            q: '你確定自己有改檔案、也存檔了，但打開 GitHub 網頁卻完全看不到最新的內容，最可能是漏了哪一步？',
            options: [
              '忘記 git push——commit 只是存在自己電腦裡，沒推上雲端 GitHub 不會知道',
              '忘記重新整理瀏覽器快取，GitHub 其實已經收到了',
              'GitHub 上傳需要等 24 小時才會顯示',
            ],
            answer: 0,
            explain: 'git commit 只是在你「本機」建立一個存檔點，資料完全還在你的電腦裡。GitHub 是遠端伺服器，只有執行 git push 之後，本機的存檔紀錄才會真正傳過去。很多初學者以為 commit 完就等於「上傳」了，其實兩者是完全不同的兩個動作。',
          },
          {
            q: '執行 git remote add origin ... 之後，終端機畫面什麼反應都沒有、也沒有跳出任何文字，這代表？',
            options: [
              '執行失敗了，指令沒有生效，要重新打一次',
              '這是正常現象——很多 Git 指令成功時就是「沒消息就是好消息」，不會印出文字',
              '需要按 Enter 兩次才會真的執行',
            ],
            answer: 1,
            explain: 'git remote add、git add 這類指令的設計邏輯是「沒有異常才不會輸出訊息」，安靜的畫面通常代表成功。如果真的想確認，用 git remote -v 或 git status 主動查詢即可，看到畫面空白就緊張重打，反而容易不小心重複輸入或打錯。',
          },
          {
            q: '在 GitHub 網頁建立新的 Repository 時，「Add a README file」「Add .gitignore」「Choose a license」這三個初始化選項為什麼都不能勾？',
            options: [
              '勾選會讓 Repository 變成付費方案',
              '勾選之後 GitHub 上就已經有了一次歷史紀錄，跟你本機第一次 push 的歷史「兜不起來」，會被拒絕',
              '這三個選項只是介面上的裝飾，其實勾不勾都沒差',
            ],
            answer: 1,
            explain: '只要勾選任何一個初始化選項，GitHub 就會在遠端自動建立一個初始 commit（例如自動產生 README）。這樣一來，遠端 repo 已經有自己的歷史起點，跟你本機從 git init 開始建立的歷史是兩條不同的分支起點，push 時 Git 會判斷成「非快進（non-fast-forward）」而直接拒絕，新手常常因此卡在第一次 push 就搞不懂為什麼失敗。保持完全空白，讓本機的第一次 push 去「創造」遠端的歷史起點，才不會衝突。',
          },
        ]}
      />
    </div>
  );
};
