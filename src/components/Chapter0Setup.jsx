import React, { useState } from 'react';
import { Copy, Check, Monitor, Apple, MessageSquareHeart, CheckCircle2, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { SectionTitle, InstructionalText, CommandBlock, Callout } from './Shared';

// PromptBlock — 給「要貼給 AI 的中文提示詞」用（不是終端機指令，所以不加 $ 前綴）
const PromptBlock = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden shadow-md">
      <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <MessageSquareHeart size={12} aria-hidden="true" />
          <span>整段複製，貼給 AI（ChatGPT / Claude / Gemini 都可以）</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
          aria-label="複製提示詞"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" aria-hidden="true" />
              <span className="text-green-400">已複製</span>
            </>
          ) : (
            <>
              <Copy size={12} aria-hidden="true" />
              <span>複製</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">{text}</div>
    </div>
  );
};

const SCREENSHOT_PROMPT =
  '我是完全沒有寫過程式的新手，正在準備一堂 Git 入門課，需要在我的電腦上安裝這四樣工具：VSCode、Node.js（LTS 版，需要 v20 以上）、Git、GitHub CLI（gh）。以下附上我電腦資訊的截圖，請你先根據截圖判斷我的作業系統與版本，再開始一步一步引導我安裝。請注意：每次只給我一個步驟，等我回報結果之後再給下一步；如果我的系統版本太舊、裝不了最新版，請直接告訴我該改裝哪一個舊版本，並附上那個版本的下載連結；請全程用繁體中文、用不懂程式的人也聽得懂的方式說明。';

const TEXT_PROMPT =
  '我是完全沒有寫過程式的新手，正在準備一堂 Git 入門課，需要在我的電腦上安裝這四樣工具：VSCode、Node.js（LTS 版，需要 v20 以上）、Git、GitHub CLI（gh）。請你先根據我貼在最後面的電腦資訊判斷我的作業系統與版本，再開始一步一步引導我安裝。請注意：每次只給我一個步驟，等我回報結果之後再給下一步；如果我的系統版本太舊、裝不了最新版，請直接告訴我該改裝哪一個舊版本，並附上那個版本的下載連結；請全程用繁體中文、用不懂程式的人也聽得懂的方式說明。以下是我的電腦資訊：';

const STEP_TITLES = [
  '判別你的電腦',
  '印出你的電腦規格',
  '請 AI 當你的安裝助手',
  '註冊 GitHub 帳號',
  '安裝四樣工具',
  '驗收與連線',
  '完成 Checklist',
];

const TOTAL_STEPS = STEP_TITLES.length;

// 步驟卡三態外框（樣式對齊 Chapter3PathA）：done 可點擊回頭看
const StepCard = ({ idx, step, setStep, children }) => {
  const isDone = idx < step;
  const isCurrent = idx === step;
  const cls = isCurrent
    ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-50'
    : isDone
      ? 'bg-green-50 border-green-200 opacity-60'
      : 'bg-slate-50 border-slate-200 opacity-40';
  return (
    <div className={`p-4 border rounded-lg transition-all ${cls}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          {isDone
            ? <CheckCircle2 size={18} className="text-green-600 shrink-0" aria-hidden="true" />
            : <span className={`w-[22px] h-[22px] rounded-full text-xs flex items-center justify-center shrink-0 ${isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-600'}`}>{idx + 1}</span>}
          <span>{STEP_TITLES[idx]}</span>
        </div>
        {isDone && (
          <button
            type="button"
            onClick={() => setStep(idx)}
            className="text-xs text-slate-500 hover:text-indigo-600 underline shrink-0"
          >
            回頭看這一步
          </button>
        )}
      </div>
      {isCurrent && <div className="mt-4 space-y-4 animate-fade-in">{children}</div>}
    </div>
  );
};

const CHECKLIST_ITEMS = [
  { id: 'account', label: 'GitHub 帳號註冊完成', verify: '能登入 github.com 看到自己的主頁' },
  { id: 'vscode', label: 'VSCode 安裝完成', verify: '能正常開啟 VSCode' },
  { id: 'gitgraph', label: 'Git Graph 外掛安裝完成', verify: 'VSCode 左側延伸模組列表能看到 Git Graph' },
  { id: 'node', label: 'Node.js 安裝完成', verify: '終端機輸入 node -v 顯示 v20 以上的版本號' },
  { id: 'git', label: 'Git 安裝完成', verify: '終端機輸入 git -v 顯示 git version 2.x.x' },
  { id: 'gh', label: 'GitHub CLI（gh）安裝完成', verify: '終端機輸入 gh --version 顯示版本號' },
  { id: 'auth', label: 'gh 帳號連線完成', verify: '終端機輸入 gh auth status 顯示 Logged in as 你的帳號' },
  { id: 'config', label: '兩行一次性設定完成', verify: '已在終端機貼過 pull.rebase false 與 init.defaultBranch main 兩行設定' },
];

export const Chapter0Setup = () => {
  const [os, setOs] = useState(null); // 'windows' | 'mac'
  const [step, setStep] = useState(0); // 目前所在步驟（0-based），前面的步驟視為已完成
  const [showTextPrompt, setShowTextPrompt] = useState(false);
  const [checks, setChecks] = useState({});

  const isWin = os === 'windows';
  const checkedCount = CHECKLIST_ITEMS.filter((i) => checks[i.id]).length;
  const allChecked = checkedCount === CHECKLIST_ITEMS.length;
  const doneCount = allChecked ? TOTAL_STEPS : step;

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const toggleCheck = (id) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));

  const NextButton = ({ label, disabled = false }) => (
    <button
      type="button"
      onClick={next}
      disabled={disabled}
      className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {label}
      <ArrowRight size={15} aria-hidden="true" />
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle title="0. 行前準備" subtitle="開始上課前，把你的電腦準備好——一步一步來，不用急" />

      {/* 進入狀態提示（深色前置條件框） */}
      <div className="bg-slate-800 rounded-xl px-5 py-4 flex flex-col gap-3 shadow-md mb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">⚡ 進入狀態：讀完再動</div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-base leading-none mt-0.5">🧭</span>
          <p className="text-sm text-slate-300"><strong className="text-white">這一章不教 Git，只做一件事：把你的電腦裝備好。</strong>全部走完大約 30～60 分鐘，建議找一段不被打斷的時間一次完成。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🖥️</span>
          <p className="text-sm text-slate-300"><strong className="text-white">你需要一台能安裝軟體的電腦</strong>（Windows 10+ 或 macOS 10.15+，有管理員權限），以及穩定的網路。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">🤖</span>
          <p className="text-sm text-slate-300"><strong className="text-white">卡關不是你的問題。</strong>每台電腦狀況不同，本章第 3 步會教你把 AI 變成你的專屬安裝助手——遇到任何裝不動的狀況，回去找它就對了。</p>
        </div>
      </div>

      <InstructionalText title="為什麼要先做這一章？">
        <p>後面的章節會需要你在自己的電腦上真的敲指令、真的發 PR。現在花一點時間把工具裝好、帳號連好，之後的每一章都會順很多。</p>
      </InstructionalText>

      {/* 內部進度 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${Math.round((doneCount / TOTAL_STEPS) * 100)}%` }}
          />
        </div>
        <span className="text-sm font-bold text-slate-600 whitespace-nowrap">已完成 {doneCount} / {TOTAL_STEPS}</span>
      </div>

      <div className="space-y-3">

        {/* ── 步驟 1：判別你的電腦 ── */}
        <StepCard step={step} setStep={setStep} idx={0}>
          <p className="text-sm text-slate-600">後面每一步的指令都會依你的系統自動切換，所以先選對系統很重要。<strong>不確定的話，看鍵盤左下角</strong>：有 <code className="bg-slate-100 px-1 rounded">⌘ Command</code> 鍵的是 Mac；有 <code className="bg-slate-100 px-1 rounded">Ctrl</code> 鍵 + Windows 標誌鍵的是 Windows。</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOs('windows')}
              className={`flex flex-col items-center gap-2 border-2 rounded-xl p-5 transition-all ${isWin ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'}`}
            >
              <Monitor size={30} aria-hidden="true" />
              <span className="font-bold">我是 Windows</span>
              <span className="text-xs text-slate-500">鍵盤左下有 Ctrl 和 Windows 鍵</span>
            </button>
            <button
              type="button"
              onClick={() => setOs('mac')}
              className={`flex flex-col items-center gap-2 border-2 rounded-xl p-5 transition-all ${os === 'mac' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'}`}
            >
              <Apple size={30} aria-hidden="true" />
              <span className="font-bold">我是 Mac</span>
              <span className="text-xs text-slate-500">鍵盤左下有 ⌘ Command 鍵</span>
            </button>
          </div>
          {os && (
            <Callout variant="success" title={`好的，接下來的指令都會用${isWin ? ' Windows' : ' Mac'} 版！`}>
              選錯了也沒關係，隨時可以點「回頭看這一步」重選，整章的指令都會跟著切換。
            </Callout>
          )}
          <div className="flex justify-end">
            <NextButton label={os ? '選好了，下一步' : '先選一個系統才能繼續'} disabled={!os} />
          </div>
        </StepCard>

        {/* ── 步驟 2：印出你的電腦規格 ── */}
        <StepCard step={step} setStep={setStep} idx={1}>
          <p className="text-sm text-slate-600">先打開終端機：{isWin ? <>按 <code className="bg-slate-100 px-1 rounded">Windows 鍵</code>，搜尋 <code className="bg-slate-100 px-1 rounded">powershell</code>，點「Windows PowerShell」打開藍色視窗。</> : <>按 <code className="bg-slate-100 px-1 rounded">⌘ + 空白鍵</code> 打開 Spotlight，輸入 <code className="bg-slate-100 px-1 rounded">Terminal</code>（終端機）按 Enter。</>}然後輸入這行指令，把你電腦的規格印出來：</p>
          <CommandBlock
            command={isWin ? 'systeminfo | findstr /C:"OS"' : 'sw_vers && uname -m'}
            comment={isWin ? '列出 Windows 版本相關資訊' : '列出 macOS 版本與晶片架構'}
          />
          {isWin ? (
            <div className="text-sm text-slate-600 space-y-1">
              <p>輸出裡的重點：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className="bg-slate-100 px-1 rounded">OS Name</code>：你的 Windows 版本（例如 Windows 10 / 11）</li>
                <li><code className="bg-slate-100 px-1 rounded">OS Version</code>：詳細的版本號，AI 靠它判斷你的系統夠不夠新</li>
              </ul>
            </div>
          ) : (
            <div className="text-sm text-slate-600 space-y-1">
              <p>輸出裡的重點：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className="bg-slate-100 px-1 rounded">ProductVersion</code>：你的 macOS 版本號，越舊越可能要裝舊版工具</li>
                <li>最後一行是晶片：<code className="bg-slate-100 px-1 rounded">arm64</code> = Apple 晶片（M1/M2/M3...）、<code className="bg-slate-100 px-1 rounded">x86_64</code> = Intel 晶片——之後下載安裝檔會用到</li>
              </ul>
            </div>
          )}
          <Callout variant="info" title="這一步的視窗先不要關">
            下一步我們要把這個畫面直接拿去問 AI，留著它。
          </Callout>
          <div className="flex justify-end">
            <NextButton label="我看到規格了，下一步" />
          </div>
        </StepCard>

        {/* ── 步驟 3：請 AI 當你的安裝助手 ── */}
        <StepCard step={step} setStep={setStep} idx={2}>
          <p className="text-sm text-slate-600"><strong>這是全章最重要的一步。</strong>每台電腦的狀況都不同（尤其是比較舊的電腦），與其對照文件猜，不如讓 AI 看著你的電腦資訊、陪你一步一步裝。方法很簡單：<strong>截圖 + 一段提示詞</strong>。</p>
          <div className="text-sm text-slate-700 space-y-2">
            <p><strong>① 把整個終端機視窗截圖</strong>（就是上一步印出規格的那個畫面）：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              {isWin ? (
                <li>按 <code className="bg-slate-100 px-1 rounded">Win + Shift + S</code>，拖曳框選整個終端機視窗，截圖會自動存到剪貼簿。</li>
              ) : (
                <li>按 <code className="bg-slate-100 px-1 rounded">⌘ + Shift + 4</code>，拖曳框選整個終端機視窗，截圖會存到桌面。</li>
              )}
              <li>不用煩惱哪些資訊重要——<strong>整個視窗都截進去最安全</strong>，讓 AI 自己判斷。</li>
            </ul>
            <p><strong>② 複製下面這段提示詞，連同截圖一起貼給 AI：</strong></p>
          </div>
          <PromptBlock text={SCREENSHOT_PROMPT} />
          <button
            type="button"
            onClick={() => setShowTextPrompt((v) => !v)}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showTextPrompt ? <ChevronDown size={15} aria-hidden="true" /> : <ChevronRight size={15} aria-hidden="true" />}
            沒辦法截圖？改用「複製文字」版（點開）
          </button>
          {showTextPrompt && (
            <div className="space-y-3 border-l-2 border-indigo-200 pl-4">
              <p className="text-sm text-slate-600">先複製下面的提示詞貼給 AI，<strong>再把終端機裡的文字複製上去接在後面</strong>：</p>
              <PromptBlock text={TEXT_PROMPT} />
              <Callout variant="warning" title="複製終端機文字的安全方法">
                {isWin ? (
                  <p>用<strong>滑鼠選取</strong>你要的文字，然後<strong>按滑鼠右鍵</strong>（或按 Enter）就會複製。<strong>不要在終端機裡按 Ctrl+C 以外的任何組合鍵</strong>——有些組合鍵會直接中斷或關閉程式。不確定的時候，一律用滑鼠右鍵最安全。</p>
                ) : (
                  <p>用滑鼠選取你要的文字，按 <code className="bg-amber-100 px-1 rounded">⌘ + C</code> 複製即可，Mac 的終端機這樣操作是安全的。</p>
                )}
              </Callout>
            </div>
          )}
          <Callout variant="danger" title="走錯方向警示：本教程從頭到尾不需要 SSH">
            <p>如果 AI 或任何網路教學叫你跑 <code className="bg-red-100 px-1 rounded">ssh-keygen</code>、設定 <strong>SSH key</strong>、或給你 <code className="bg-red-100 px-1 rounded">git@github.com:</code> 開頭的網址——<strong>停下來，那是另一條路</strong>。我們全程用 HTTPS，直接回覆 AI：「我不要用 SSH，請改用 HTTPS 的方式」。</p>
          </Callout>
          <div className="flex justify-end">
            <NextButton label="我知道怎麼向 AI 求助了，下一步" />
          </div>
        </StepCard>

        {/* ── 步驟 4：註冊 GitHub 帳號 ── */}
        <StepCard step={step} setStep={setStep} idx={3}>
          <p className="text-sm text-slate-600">GitHub 是全球最大的程式碼平台，之後的練習都會上傳到這裡。已經有帳號的話，確認能登入就可以直接跳下一步。</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
            <li>前往 <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">github.com</a>，點右上角 <strong>Sign up</strong> 註冊免費帳號。</li>
            <li>依畫面輸入 email、密碼、帳號名稱（username）。</li>
            <li>到你的信箱收驗證碼，回到網頁輸入完成驗證。</li>
            <li>可能會出現英文拼圖人機驗證，照畫面拖曳完成即可。</li>
            <li>註冊後的「你是做什麼的」問卷——<strong>直接按 Skip 跳過</strong>，不影響任何後續步驟。</li>
          </ol>
          <Callout variant="info" title="兩個小提醒">
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>帳號名稱</strong>會出現在你的個人主頁網址（github.com/你的帳號名），別取太隨便。</li>
              <li><strong>註冊用的 email 請記住</strong>——之後設定 Git 身份時會用到同一個 email。</li>
            </ul>
          </Callout>
          <div className="flex justify-end">
            <NextButton label="我能登入 GitHub 了，下一步" />
          </div>
        </StepCard>

        {/* 成就感提示：過半 */}
        {step >= 4 && !allChecked && (
          <Callout variant="success" title="🎉 你已經完成一半了，加油！">
            帳號有了、AI 助手也就位了——剩下的就是把工具裝上、驗收，然後正式開課。
          </Callout>
        )}

        {/* ── 步驟 5：安裝四樣工具 ── */}
        <StepCard step={step} setStep={setStep} idx={4}>
          <p className="text-sm text-slate-600">依序安裝這四樣工具。<strong>任何一樣裝不動，就回步驟 3 把畫面截圖丟給 AI</strong>，讓它帶你排除。</p>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="font-bold text-slate-800 mb-1">① VSCode（寫程式的編輯器）</p>
              {isWin ? (
                <p>到 <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">code.visualstudio.com</a> 下載，打開安裝檔一直按「下一步」裝到好。</p>
              ) : (
                <p>到 <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">code.visualstudio.com</a> 下載 .zip，解壓縮後<strong>把 App 圖示直接拖進「應用程式」資料夾</strong>——Mac 沒有安裝精靈，拖過去就是裝好了。</p>
              )}
              <p className="mt-1 text-slate-600">裝好後打開 VSCode，點左側四個方塊圖示（延伸模組），搜尋並安裝 <strong>Git Graph</strong> 外掛——它能讓你「看見」Git 的時間線。</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="font-bold text-slate-800 mb-1">② Node.js（讓教學相關工具能運作的引擎）</p>
              <p>到 <a href="https://nodejs.org/" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">nodejs.org</a> 下載標有 <strong>LTS（長期維護版）</strong>的{isWin ? ' .msi' : ' .pkg'} 安裝檔，一路按「Next / 繼續 / 同意」裝到好。</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="font-bold text-slate-800 mb-1">③ Git（本課程的主角）</p>
              {isWin ? (
                <p>到 <a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">git-scm.com/downloads</a> 下載 Windows 版，安裝過程<strong>一直按「Next」就好</strong>，不需要改任何預設選項。</p>
              ) : (
                <p>Mac 通常內建觸發式安裝：打開終端機輸入 <code className="bg-slate-100 px-1 rounded">git --version</code>，若跳出視窗詢問是否安裝「Command Line Developer Tools」，點<strong>安裝</strong>並等它跑完（可能要幾分鐘），再輸入一次看到版本號就是裝好了。</p>
              )}
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="font-bold text-slate-800 mb-1">④ GitHub CLI（gh，最後一章發 PR 的神器）</p>
              {isWin ? (
                <p>到 <a href="https://github.com/cli/cli/releases" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">GitHub CLI Releases</a> 找最新版本，在 <strong>Assets</strong> 列表（通常要點開展開）中下載<strong>檔名結尾是 <code className="bg-slate-100 px-1 rounded">windows_amd64.msi</code></strong> 的檔案並安裝。</p>
              ) : (
                <p>先確認晶片（步驟 2 的 <code className="bg-slate-100 px-1 rounded">arm64</code> = Apple 晶片、<code className="bg-slate-100 px-1 rounded">x86_64</code> = Intel），再到 <a href="https://github.com/cli/cli/releases" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">GitHub CLI Releases</a> 的 Assets 列表下載對應的 .pkg：Apple 晶片選檔名含 <code className="bg-slate-100 px-1 rounded">macOS_arm64</code>、Intel 選 <code className="bg-slate-100 px-1 rounded">macOS_amd64</code>，雙擊安裝。</p>
              )}
            </div>
          </div>
          <Callout variant="danger" title="🛑 剛裝完，必須把終端機關掉重開！">
            剛裝好的軟體，只有<strong>新開的</strong>終端機才抓得到。如果沿用安裝前就開著的舊視窗，會出現 <code className="bg-red-100 px-1 rounded">{isWin ? "'git' is not recognized" : 'command not found'}</code> 這類錯誤——<strong>這不代表安裝失敗</strong>，把 VSCode / 終端機完全關掉再重開就好。
          </Callout>
          <Callout variant="warning" title="裝不動？別硬撐">
            <p>任何一樣工具卡住，<button type="button" onClick={() => setStep(2)} className="underline font-bold text-amber-900 hover:text-amber-700">回步驟 3</button> 把錯誤畫面截圖丟給 AI，照它的指示排除後再回來。</p>
          </Callout>
          <div className="flex justify-end">
            <NextButton label="四樣工具都裝好了，下一步" />
          </div>
        </StepCard>

        {/* ── 步驟 6：驗收與連線 ── */}
        <StepCard step={step} setStep={setStep} idx={5}>
          <p className="text-sm text-slate-600"><strong>重開一個新的終端機</strong>（{isWin ? '搜尋 powershell，或用 VSCode 的 Terminal → New Terminal' : '⌘ + 空白鍵搜尋 Terminal，或用 VSCode 的 Terminal → New Terminal'}），一次輸入一行下面的指令、按 Enter，過三關驗收：</p>
          <CommandBlock
            command={'git -v\nnode -v\ngh --version'}
            comment="三關驗收：每行都要看到版本號才算過"
          />
          <CommandBlock
            variant="output"
            command={'git version 2.x.x\nv20.x.x（本教材需要 v20 以上）\ngh version 2.x.x'}
          />
          <p className="text-sm text-slate-600">三關都過了之後，讓電腦登入你的 GitHub 帳號：</p>
          <CommandBlock command="gh auth login" comment="把 gh 和你的 GitHub 帳號串起來" />
          <div className="text-sm text-slate-700 space-y-1">
            <p>終端機會問你幾個問題，用<strong>上下方向鍵</strong>選、按 Enter 確認，選擇原則：</p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>What account? → <strong>GitHub.com</strong></li>
              <li>Preferred protocol? → <strong>HTTPS</strong>（記得嗎？我們全程不用 SSH）</li>
              <li>Authenticate Git with your GitHub credentials? → <strong>Yes</strong></li>
              <li>How to authenticate? → <strong>Login with a web browser</strong></li>
              <li>它會給你一組 8 碼驗證碼，按 Enter 開瀏覽器、貼上 8 碼、點 Authorize。瀏覽器沒自動開的話，把終端機顯示的網址手動貼到瀏覽器即可。</li>
            </ol>
            <p className="text-slate-500 text-xs mt-1">問題順序和字面可能因版本略有不同，掌握原則就好：GitHub.com → HTTPS → Yes → 瀏覽器登入。</p>
          </div>
          <CommandBlock command="gh auth status" comment="確認連線：看到 Logged in as 你的帳號 就成功了" />
          <p className="text-sm text-slate-600">最後，順手貼上這兩行<strong>一次性設定</strong>（在任何資料夾輸入都可以，只需做一次）：</p>
          <CommandBlock
            command={'git config --global pull.rebase false\ngit config --global init.defaultBranch main'}
            comment="第一行：pull 遇到分歧時用合併處理；第二行：新專案主分支一律叫 main"
          />
          <Callout variant="info" title="這兩行在防什麼？">
            不設定的話，之後 Chapter 6 做同步時 Git 可能反問你要用哪種方式合併、讓你卡住；有些電腦的新專案主分支會叫 <code>master</code>，跟教學指令裡的 <code>main</code> 對不起來。先設好，這兩個坑都不會踩到。
          </Callout>
          <div className="flex justify-end">
            <NextButton label="驗收全過、帳號連好了，最後一步" />
          </div>
        </StepCard>

        {/* ── 步驟 7：完成 Checklist ── */}
        <StepCard step={step} setStep={setStep} idx={6}>
          <p className="text-sm text-slate-600">最後盤點一次。每一項都附了驗證方法，<strong>實際驗證過再打勾</strong>——有任何一項打不了勾，就回到對應的步驟補做。</p>
          <div className="space-y-2">
            {CHECKLIST_ITEMS.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${checks[item.id] ? 'bg-green-50 border-green-300' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
              >
                <input
                  type="checkbox"
                  checked={!!checks[item.id]}
                  onChange={() => toggleCheck(item.id)}
                  className="mt-0.5 w-4 h-4 accent-green-600"
                />
                <span className="text-sm">
                  <span className={`font-medium ${checks[item.id] ? 'text-green-900' : 'text-slate-700'}`}>{item.label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">驗證方法：{item.verify}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-right">已勾選 {checkedCount} / {CHECKLIST_ITEMS.length} 項</p>
          {allChecked ? (
            <Callout variant="success" title="🎉 行前準備全部完成——你已經是一個裝備齊全的冒險者了！">
              <p className="mb-3">工具裝好、帳號連上、還多了一個隨時待命的 AI 助手。接下來就正式進入 Git 的世界吧！</p>
              <a
                href="#concept"
                className="inline-flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-green-700 transition-colors no-underline"
              >
                前往 Chapter 1：觀念與準備
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </Callout>
          ) : (
            <Callout variant="info" title="全部勾完就完賽了">
              中途被打斷也沒關係，回來對照這份清單，補做打不了勾的那幾項就好。
            </Callout>
          )}
        </StepCard>
      </div>
    </div>
  );
};
