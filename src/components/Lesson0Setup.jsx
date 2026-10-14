import { useState } from 'react';
import { SectionTitle, CommandBlock, Callout, NoOutputHint, Card } from './Shared';
import { Copy, Check, Monitor, Apple, MessageSquareHeart, CheckCircle2, ChevronDown, ChevronRight, ArrowRight, Key, Info } from 'lucide-react';

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
  '我是完全沒有寫過程式的新手，正在準備一堂 Git 入門課，需要在我的電腦上安裝這三樣工具：VSCode、Git、GitHub CLI（gh）。以下附上我電腦資訊的截圖，請你先根據截圖判斷我的作業系統與版本，再開始一步一步引導我安裝。請注意：每次只給我一個步驟，等我回報結果之後再給下一步；如果我的系統版本太舊、裝不了最新版，請直接告訴我該改裝哪一個舊版本，並附上那個版本的下載連結；請全程用繁體中文、用不懂程式的人也聽得懂的方式說明。';

const TEXT_PROMPT =
  '我是完全沒有寫過程式的新手，正在準備一堂 Git 入門課，需要在我的電腦上安裝這三樣工具：VSCode、Git、GitHub CLI（gh）。請你先根據我貼在最後面的電腦資訊判斷我的作業系統與版本，再開始一步一步引導我安裝。請注意：每次只給我一個步驟，等我回報結果之後再給下一步；如果我的系統版本太舊、裝不了最新版，請直接告訴我該改裝哪一個舊版本，並附上那個版本的下載連結；請全程用繁體中文、用不懂程式的人也聽得懂的方式說明。以下是我的電腦資訊：';

const STEP_TITLES = [
  '判別你的電腦',
  '印出你的電腦規格',
  '請 AI 當你的安裝助手',
  '安裝三樣工具',
  '確認工具與預設設定',
  '設定存檔作者',
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
  { id: 'vscode', label: 'VSCode 安裝完成', verify: '能正常開啟 VSCode' },
  { id: 'gitgraph', label: 'Git Graph 外掛安裝完成', verify: 'VSCode 左側延伸模組列表能看到 Git Graph' },
  { id: 'git', label: 'Git 安裝完成', verify: '終端機輸入 git -v 顯示 git version 2.x.x' },
  { id: 'gh', label: 'GitHub CLI（gh）安裝完成', verify: '終端機輸入 gh --version 顯示版本號' },
  { id: 'identity', label: '存檔作者設定完成', verify: 'git config user.name 與 git config user.email 顯示自己的名字與信箱' },
  { id: 'config', label: '兩行一次性設定完成', verify: '已在終端機貼過 pull.rebase false 與 init.defaultBranch main 兩行設定' },
];

const NextButton = ({ label, onClick, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {label}
    <ArrowRight size={15} aria-hidden="true" />
  </button>
);

export const Lesson0Setup = () => {
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

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <SectionTitle title="L0 行前準備" subtitle="安裝練習需要的工具，設定每次存檔要記錄的作者名字與信箱。" />
        <p className="text-sm text-slate-600">先準備：一台可安裝軟體的 Windows 或 Mac 電腦；可下載安裝檔的網路連線。</p>
      </header>

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
            <NextButton onClick={next} label={os ? '選好了，下一步' : '先選一個系統才能繼續'} disabled={!os} />
          </div>
        </StepCard>

        {/* ── 步驟 2：印出你的電腦規格 ── */}
        <StepCard step={step} setStep={setStep} idx={1}>
          <p className="text-sm text-slate-600">終端機是用文字指令操作電腦的視窗。先打開終端機：{isWin ? <>按 <code className="bg-slate-100 px-1 rounded">Windows 鍵</code>，搜尋 <code className="bg-slate-100 px-1 rounded">powershell</code>，點「Windows PowerShell」打開藍色視窗。</> : <>按 <code className="bg-slate-100 px-1 rounded">⌘ + 空白鍵</code> 打開 Spotlight，輸入 <code className="bg-slate-100 px-1 rounded">Terminal</code>（終端機）按 Enter。</>}然後輸入這行指令，把你電腦的規格印出來：</p>
          <p className="text-sm text-slate-600">下面的 $ 是提示符，不用輸入；按複製只會複製指令，每次貼一條再按 Enter。</p>
          {isWin ? (
            <>
              <Callout title="收集資料需要等一下">輸入後可能先空白 5 秒到半分鐘，接著列出系統資訊；不要關視窗或重複按 Enter。</Callout>
              <CommandBlock command="systeminfo" comment="列出系統資訊，讓安裝助手判斷適合的版本" />
              <CommandBlock variant="output" command={'OS Name:                   Microsoft Windows 11 Home\nOS Version:                10.0.26100 N/A Build 26100'} />
              <p className="text-sm text-slate-600">上方只節錄兩行；實際會有更多資訊，中文系統的標籤可能是「作業系統名稱」「作業系統版本」。</p>
            </>
          ) : (
            <>
              <CommandBlock command="sw_vers" comment="先查 macOS 版本" />
              <CommandBlock variant="output" command={'ProductName: macOS\nProductVersion: 15.0\nBuildVersion: 24A335'} />
              <CommandBlock command="uname -m" comment="再查晶片架構，下載時才能選對安裝檔" />
              <CommandBlock variant="output" command="arm64" />
              <p className="text-sm text-slate-600">版本號依電腦不同；Intel Mac 會顯示 x86_64。</p>
            </>
          )}
          {isWin ? (
            <div className="text-sm text-slate-600 space-y-1">
              <p>你的行數和措辭可能和上面略有不同（例如 Windows 10、不同的版本號），都是正常的。輸出裡的重點：</p>
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
            <NextButton onClick={next} label="我看到規格了，下一步" />
          </div>
        </StepCard>

        {/* ── 步驟 3：請 AI 當你的安裝助手 ── */}
        <StepCard step={step} setStep={setStep} idx={2}>
          <p className="text-sm text-slate-600">每台電腦的狀況不同，可以把系統版本與晶片資訊交給 AI，請它一次說明一個安裝步驟。若建議與畫面不符，先停下，把差異告訴它或請講師協助。</p>
          <div className="text-sm text-slate-700 space-y-2">
            <p><strong>① 把系統版本與晶片資訊截圖</strong>（就是上一步印出規格的那個畫面）：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              {isWin ? (
                <li>按 <code className="bg-slate-100 px-1 rounded">Win + Shift + S</code>，拖曳框選要提供的資訊，截圖會自動存到剪貼簿。</li>
              ) : (
                <li>按 <code className="bg-slate-100 px-1 rounded">⌘ + Shift + 4</code>，拖曳框選要提供的資訊，截圖會存到桌面。</li>
              )}
              <li>只保留系統版本與晶片資訊；電腦名稱、帳號與其他個人資訊不要一起貼出。</li>
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
              <p className="text-sm text-slate-600">先複製下面的提示詞貼給 AI，<strong>再把系統版本與晶片資訊接在後面</strong>：</p>
              <PromptBlock text={TEXT_PROMPT} />
              <Callout variant="warning" title="複製終端機文字的安全方法">
                {isWin ? (
                  <p>用<strong>滑鼠選取</strong>你要的文字，然後<strong>按滑鼠右鍵</strong>（或按 Enter）就會複製。先選取再複製；沒有選取文字時，Ctrl+C 通常是中斷目前指令。</p>
                ) : (
                  <p>用滑鼠選取你要的文字，按 <code className="bg-amber-100 px-1 rounded">⌘ + C</code> 複製即可，Mac 的終端機這樣操作是安全的。</p>
                )}
              </Callout>
            </div>
          )}
          <Callout variant="danger" title="這一步只需要安裝工具">
            <p>若 AI 開始帶你建立 GitHub 帳號或登入，先回覆：「我現在只安裝工具，帳號登入會在 L6 再做。」</p>
          </Callout>
          <div className="flex justify-end">
            <NextButton onClick={next} label="我知道怎麼向 AI 求助了，下一步" />
          </div>
        </StepCard>



        {/* 成就感提示：過半 */}


        {/* ── 步驟 5：安裝三樣工具 ── */}
        <StepCard step={step} setStep={setStep} idx={3}>
          <p className="text-sm text-slate-600">依序安裝這三樣工具。<strong>任何一樣裝不動，就回步驟 3 把畫面截圖丟給 AI</strong>，讓它帶你排除。</p>
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
              <p className="font-bold text-slate-800 mb-1">② Git（幫你保存與比較檔案版本的工具）</p>
              {isWin ? (
                <p>到 <a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">git-scm.com/downloads</a> 下載 Windows 版，安裝過程<strong>一直按「Next」就好</strong>，不需要改任何預設選項。</p>
              ) : (
                <p>Mac 通常內建觸發式安裝：打開終端機輸入 <code className="bg-slate-100 px-1 rounded">git --version</code>，若跳出視窗詢問是否安裝「Command Line Developer Tools」，點<strong>安裝</strong>並等它跑完（可能要幾分鐘），再輸入一次看到版本號就是裝好了。</p>
              )}
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="font-bold text-slate-800 mb-1">③ GitHub CLI（gh，把電腦和 GitHub 帳號連起來的小工具）</p>
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
            <NextButton onClick={next} label="三樣工具都裝好了，下一步" />
          </div>
        </StepCard>

        {/* ── 步驟 6：驗收與連線 ── */}
        <StepCard step={step} setStep={setStep} idx={4}>
          <p className="text-sm text-slate-600"><strong>重開一個新的終端機</strong>（{isWin ? '搜尋 powershell，或用 VSCode 的 Terminal → New Terminal' : '⌘ + 空白鍵搜尋 Terminal，或用 VSCode 的 Terminal → New Terminal'}），過兩關驗收。<strong>一行一行輸入、每行按一次 Enter</strong>，每一關都要看到版本號才算過：</p>
          <CommandBlock command="git -v" comment="第一關：Git" />
          <CommandBlock variant="output" command="git version 2.x.x" />
          <CommandBlock command="gh --version" comment="第二關：GitHub CLI" />
          <CommandBlock variant="output" command="gh version 2.x.x" />
          <p className="text-sm text-slate-600">最後做兩條<strong>預設設定</strong>（在任何資料夾輸入都可以，一條一條按 Enter）。分支是從某個版本另開的一本相簿，main 是主相簿的名稱；pull 是下載雲端的新照片並整理進目前這本相簿。L4 與 L8 會帶你實際操作，現在先設定它們的預設做法。</p>
          <CommandBlock
            command="git config --global pull.rebase false"
            comment="本機與雲端各有新照片時，保留兩邊紀錄再合在一起"
          />
          <NoOutputHint />
          <CommandBlock
            command="git config --global init.defaultBranch main"
            comment="新專案主分支一律叫 main"
          />
          <NoOutputHint />
          <Callout variant="info" title="這兩行在防什麼？">
            不設定的話，之後 L8 做同步時 Git 可能反問你要用哪種方式合併、讓你卡住；有些電腦的新專案主分支會叫 <code>master</code>，跟教學指令裡的 <code>main</code> 對不起來。先設好，之後新建的練習相簿就能使用一致的名稱與合併方式。
          </Callout>
          <div className="flex justify-end">
            <NextButton onClick={next} label="工具確認完成，設定存檔作者" />
          </div>
        </StepCard>

<StepCard step={step} setStep={setStep} idx={5}>
    {/* --- 設置身份 --- */}
    <div className="mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Key size={20} className="text-amber-500" /> 設定這台電腦的存檔作者
      </h3>
      <Card className="bg-amber-50 border-amber-200 shadow-sm">
        <p className="text-sm text-slate-700 mb-3 font-medium">commit 是保存一個版本，像在相簿裡多放一張照片。Git 會在照片旁記錄作者的名字與信箱，所以先設定這兩項；這不是登入 GitHub。</p>

        <Callout variant="warning" title="請打開你電腦的真實終端機（不是這個網頁）" className="mb-3">
          接下來的指令請在 VSCode 的終端機或系統的終端機 App 裡輸入，這個網頁只是教學展示，不會真的執行指令。
        </Callout>

        <p className="text-sm text-slate-600 mb-2">兩行指令<strong>一行一行輸入、每行按一次 Enter</strong>。記得把 <code>Your Name</code> 換成你的名字、<code>you@example.com</code> 換成你自己的信箱（<strong>引號要保留</strong>）：</p>

        <CommandBlock
          command={'git config --global user.name "Your Name"'}
          comment="設定你的名字"
        />
        <NoOutputHint />

        <div className="mt-3">
          <CommandBlock
            command={'git config --global user.email "you@example.com"'}
            comment="設定你的信箱"
          />
          <NoOutputHint />
        </div>

        <Callout variant="success" title="沒消息就是好消息" className="mt-3">
          這兩條設定成功時不會印出文字：<strong>指令成功時，往往什麼都不會顯示</strong>。畫面安安靜靜跳回可輸入狀態，就代表它做完了。
        </Callout>

        <Callout variant="info" title="`$` 是什麼？" className="mt-3">
          指令開頭的 <code>$</code> 代表「這是要打在終端機的指令」，輸入時不用打 <code>$</code>——用上面的複製按鈕會自動幫你去掉。
        </Callout>

        <p className="text-sm text-slate-600 mt-3">
          這兩行指令在終端機的<strong>任何資料夾</strong>輸入都可以，不需要先 <code>cd</code> 進某個專案。
        </p>

        <p className="text-sm text-slate-600 mt-3">敲完上面兩行後，輸入這行確認設定是否成功——注意對比：<strong>這條有輸出</strong>（回你設定的值），上面那兩條沒有：</p>
        <CommandBlock command="git config user.name" comment="會回你剛剛設定的名字，只有一行" />
        <CommandBlock variant="output" command="Your Name" />
        <p className="text-sm text-slate-600">實際應顯示你填的名字，接著核對信箱：</p>
        <CommandBlock command="git config user.email" comment="確認存檔作者的信箱" />
        <CommandBlock variant="output" command="you@example.com" />
        <p className="text-sm text-slate-600">應顯示你自己的信箱；若不對，重做對應的設定再查一次。</p>

        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <div className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2 shadow-sm">
            <Info size={14} className="shrink-0 mt-0.5 text-amber-500" />
            <span><strong>--global</strong> 代表這台電腦上各個 Git 專案共用的預設值；個別專案仍可能另設不同的值。</span>
          </div>
          <div className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-blue-800 flex items-start gap-2 shadow-sm">
            <Info size={14} className="shrink-0 mt-0.5 text-blue-500" />
            <span>先填自己使用的信箱；到 L6 建立 GitHub 帳號後，再確認它已加入帳號並完成驗證，讓存檔能對應到你的帳號。</span>
          </div>
        </div>

      </Card>
    </div>
<div className="flex justify-end"><NextButton onClick={next} label="下一步" /></div>
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
            <Callout variant="success" title="行前準備完成">
              <p className="mb-3">工具與作者資料已確認，接著到 L1 看懂相簿的三個位置。GitHub 註冊與登入會在 L6 進行。</p>
              <a
                href="#concept"
                className="inline-flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-green-700 transition-colors no-underline"
              >
                前往 L1：觀念與準備
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </Callout>
          ) : (
            <Callout variant="info" title="依實際結果逐項確認">
              中途被打斷也沒關係，回來對照這份清單，補做打不了勾的那幾項就好。
            </Callout>
          )}
        </StepCard>
      </div>
    </div>
  );
};
