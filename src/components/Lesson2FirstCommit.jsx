import { SectionTitle, Card, Callout, Quiz, CommandBlock, NoOutputHint, FalseAlarm, Screenshot, TerminalSim } from './Shared';
import { useState } from 'react';

// Git output copied verbatim from m2-real-outputs.txt; tutorial narration stays outside the terminal.
const simulation = [
  {
    "cmd": "git init",
    "out": "Initialized empty Git repository in C:/Users/lolz_/Desktop/Projects/Trainer_Git_Tutorial/Claude Temp Files/m2-work/git-journal/.git/",
    "why": "建立這個資料夾的相簿。"
  },
  {
    "cmd": "git status",
    "out": "On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tREADME.md\n\nnothing added to commit but untracked files present (use \"git add\" to track)",
    "why": "旁白：系統已在模擬資料夾建立 README.md，內容是「# 我的 Git 日誌」；這不是要你輸入的指令。現在查看書桌。"
  },
  {
    "cmd": "git add README.md",
    "out": "warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it",
    "why": "挑 README.md 放到拍照台。"
  },
  {
    "cmd": "git status",
    "out": "On branch main\n\nNo commits yet\n\nChanges to be committed:\n  (use \"git rm --cached <file>...\" to unstage)\n\tnew file:   README.md\n",
    "why": "確認這次會拍到 README.md。"
  },
  {
    "cmd": "git commit -m \"新增日誌標題\"",
    "out": "[main (root-commit) 187430f] 新增日誌標題\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md",
    "why": "按快門，保存第一張照片。"
  }
];

export const Lesson2FirstCommit = () => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [challenge, setChallenge] = useState(false);
  const [feedback, setFeedback] = useState('');
  const current = simulation[step];
  const advance = (raw) => {
    if (!current) return;
    if (raw.trim() !== current.cmd) {
      setFeedback('還沒符合這一步。先想這一步的目的；需要時展開提示，核對大小寫、空格與英文雙引號。');
      return;
    }
    setLogs(prev => [...prev, { prefix: '$', text: raw }, ...current.out.split('\n').map(text => ({ text }))]);
    setStep(step + 1);
    setFeedback('這一步完成，請讀下一步旁白。');
  };
  const reset = (mode) => { setStep(0); setLogs([]); setChallenge(mode); setFeedback(''); };
  return (
  <div className="min-w-0 space-y-6 animate-fade-in break-words">
    <header><SectionTitle title="L2 第一次存檔" subtitle="在自己的 git-journal 保存兩個版本，並翻出存檔紀錄。" /><p className="text-sm text-slate-600">先準備：完成 L0 的 Git 身份與 main 設定；讀完 L1。</p></header>

    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：保存標題，為什麼要分兩步？</h3>
      <p>我先用 add 挑選 README.md，因為拍照台只應放這次要保存的內容；再用 commit 按快門。README.md 是介紹資料夾內容的文字檔，本課拿它放日誌標題。</p>
      <p>每次輸入一條指令再按 Enter，等提示符回來再輸入下一條。以下長路徑、作者、日期、照片編號是實測範例，不用改成和範例一樣；編號是 Git 給每次存檔的識別碼。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>add 完成就代表相簿多一張照片了嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>還沒有，只有拍照台準備好；下一步才是 commit。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起做：保留按鈕示範與挑戰終端機</h3>
      <p>這是網頁內模擬，不會改你的電腦。第一輪按按鈕，每次只代打一條；第二輪從記憶輸入。終端機標題的 bash 只是模擬外觀，這些 Git 指令也能在 PowerShell 使用。</p>
      <FalseAlarm signal={"warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      {current ? <>
        <p className="font-bold">步驟 {step + 1} / {simulation.length}：{current.why}</p>
        {challenge ? <details><summary className="cursor-pointer">需要時看這一步的指令</summary><code className="break-all">{current.cmd}</code></details> : <button className="rounded bg-indigo-600 px-4 py-2 text-white break-all" onClick={() => advance(current.cmd)}>系統代打：{current.cmd}</button>}
      </> : <Callout variant="success">模擬完成！你已替 README.md 保存第一個版本。</Callout>}
      <div className="whitespace-pre-wrap min-w-0"><TerminalSim logs={logs} promptLabel="練習" onCommand={challenge && current ? advance : undefined} /></div>
      <p role="status" className="text-sm text-indigo-700">{feedback}</p>
      <div className="flex flex-wrap gap-3">
        <button className="rounded border px-3 py-2" onClick={() => reset(false)}>重看按鈕示範</button>
        <button className="rounded border px-3 py-2" onClick={() => reset(true)}>挑戰：自己輸入五步</button>
      </div>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>診斷題：status 的 Changes to be committed 出現 README.md，下一步要拍照還是再建資料夾？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>要拍照。那個標題表示 README.md 已在拍照台。請先完成一次挑戰，再進真機。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <SectionTitle title="🔥 換你了：在自己的 git-journal 拍兩張照片" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 打開自己的資料夾與終端機</h3>
      <p>沿用 L1 的空 git-journal。還沒建的話，在 Windows 檔案總管或 Mac Finder 的「文件」新增這個資料夾；會看到一個空資料夾。VSCode 選 File → Open Folder → 選它，左側會顯示 GIT-JOURNAL。</p>
      <p>選 Terminal → New Terminal，下方出現輸入面板；Windows 的路徑應以 git-journal 結尾。若不是，關掉舊終端機，再從剛開好的資料夾新增終端機。Mac 提示符外觀不同，操作一樣。</p>
      <p><strong>$ 不用打</strong>，也不要輸入畫面原有的 PS 路徑。下面深色框的輸出是讓你對照，不是要再輸入。</p>
      <CommandBlock command={"git init"} comment="在目前資料夾建立保存紀錄的地方" />
      <CommandBlock variant="output" command={"Initialized empty Git repository in C:/Users/lolz_/Desktop/Projects/Trainer_Git_Tutorial/Claude Temp Files/m2-work/git-journal/.git/"} />
      <p>你會多一個通常隱藏的 .git 資料夾；那是相簿紀錄，不要手動刪改。上面的完整路徑是講師測試位置，你的應指向自己的 git-journal。</p>
      <CommandBlock command={"git status"} comment="先看空相簿與空書桌的狀態" />
      <CommandBlock variant="output" command={"On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use \"git add\" to track)"} />
      <p>No commits yet 表示還沒拍照。On branch main 表示目前是主相簿；若是 master，展開下面的更名步驟再繼續。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">只有顯示 On branch master 時才做</summary>
        <p>L0 的預設設定只影響之後新建的相簿，不會替已建立的相簿更名。這裡先把目前的名稱改成 main，讓後續步驟一致。</p>
        <CommandBlock command="git branch -m main" comment="把目前的分支名稱改成 main，不更動檔案內容" />
        <NoOutputHint />
        <CommandBlock command="git status" comment="確認更名後已站在 main" />
        <CommandBlock variant="output" command={'On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use "git add" to track)'} />
      </details>
      <Callout title="真的遇到錯誤時">看到「git is not recognized」或 PowerShell 的「The term 'git' is not recognized」→ 回 L0 確認安裝並重開 VSCode；看到「fatal: not a git repository」→ 確認開的是 git-journal，且已完成這裡的 init。其他訊息到側邊欄「急診室」對照原文。</Callout>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 建立標題，挑選，再保存</h3>
      <p>點 VSCode 左側檔案總管，在 GIT-JOURNAL 上按右鍵 → New File，輸入 README.md，再按 Enter。檔案會在左側出現，中間打開空白編輯區。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>README.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all"># 我的 Git 日誌</pre></div>
      <p>輸入上面這一行，最後按一次 Enter 留下行尾換行，再按 Ctrl+S（Mac：Cmd+S）儲存。分頁上的未儲存圓點消失，內容仍留在編輯區。後面建立單行檔案也照這個方式儲存。</p>
      <FalseAlarm signal="Untracked files:">status 裡的紅色 README.md 是尚未挑選的新檔案，不是檔案壞掉。</FalseAlarm>
      <CommandBlock command={"git status"} comment="檢查剛建立的檔案是否在書桌上" />
      <CommandBlock variant="output" command={"On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tREADME.md\n\nnothing added to commit but untracked files present (use \"git add\" to track)"} />
      <p>輸出中的 <code>&lt;file&gt;</code> 是 Git 的佔位符，表示要整個換成真實檔名，角括號不要打。下面已替你填好 README.md。</p>
      <FalseAlarm signal={"warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <CommandBlock command={"git add README.md"} comment="只把這個檔案放上拍照台" />
      <CommandBlock variant="output" command={"warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"} />
      <CommandBlock command={"git status"} comment="確認拍照台已經有 README.md" />
      <CommandBlock variant="output" command={"On branch main\n\nNo commits yet\n\nChanges to be committed:\n  (use \"git rm --cached <file>...\" to unstage)\n\tnew file:   README.md\n"} />
      <p>Changes to be committed 表示已挑選好。點左側 Source Control（原始檔控制，分叉線圖示）也會看到 README.md 在 Staged Changes（暫存的變更）；這裡只用來對照，指令仍在終端機輸入。</p>
      <Screenshot id="L2-vscode-source-control" alt="VSCode 原始檔控制面板顯示 README.md 已暫存" caption="你會看到 README.md 從 Changes 移到 Staged Changes，表示已放上拍照台。" />
      <FalseAlarm signal="~" title="若漏掉 -m，可能打開 Vim 編輯器">本課一律帶 -m 與英文雙引號，直接寫照片說明。若誤入滿是 ~ 的畫面，按 Esc，輸入 :q! 再按 Enter 離開；:wq 則是儲存訊息並離開。離開後先看 status，仍顯示 Changes to be committed 才重做下面這條。</FalseAlarm>
      <CommandBlock command={"git commit -m \"新增日誌標題\""} comment="-m 後面的引號內是這張照片的說明" />
      <CommandBlock variant="output" command={"[main (root-commit) 187430f] 新增日誌標題\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md"} />
      <p>root-commit 表示第一張照片，1 file changed 表示這次有一個檔案變動。看到「Author identity unknown」或「Please tell me who you are」時，回 L0 補姓名與 email 設定後重試；不需要登入 GitHub。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 補全練習：第二張照片由你按快門</h3>
      <p>先點左側最上方的檔案總管圖示（兩張紙，或按 Ctrl+Shift+E；Mac：Cmd+Shift+E）回到看得到 GIT-JOURNAL 的畫面，再用剛才 New File 的方法建立 day1.md，輸入下方內容並儲存；左側會多出 day1.md。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>day1.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all">Day 1：學會 git init</pre></div>
      <FalseAlarm signal={"warning: in the working copy of 'day1.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <CommandBlock command={"git add day1.md"} comment="把第二份筆記放上拍照台" />
      <CommandBlock variant="output" command={"warning: in the working copy of 'day1.md', LF will be replaced by CRLF the next time Git touches it"} />
      <Callout variant="warning" title="記得帶 -m">commit 一律寫成 <code>git commit -m "說明"</code>。萬一漏了 -m、畫面變成滿是 ~ 的編輯器（Vim）：按 Esc，輸入 <code>:q!</code> 再按 Enter 離開，然後用 git status 確認後重打一次。</Callout>
      <p>請先不展開答案，自己寫出保存它的指令；訊息用「新增 Day 1 筆記」。想好後展開核對，只執行一次。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對最後一步</summary>
        <CommandBlock command={"git commit -m \"新增 Day 1 筆記\""} comment="把 Day 1 筆記正式存進相簿" />
      <CommandBlock variant="output" command={"[main fea9562] 新增 Day 1 筆記\n 1 file changed, 1 insertion(+)\n create mode 100644 day1.md"} />
      </details>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">4. 翻相簿確認兩張照片都在</h3>
      <FalseAlarm signal={': 或 (END)'} title="畫面停住、不能繼續輸入指令？">這是分頁閱讀畫面（pager），不是當機；按英文小寫 q 回到指令列。短內容也可能直接結束。</FalseAlarm>
      <CommandBlock command={"git log"} comment="看完整存檔紀錄，由新到舊排列" />
      <CommandBlock variant="output" command={"commit fea9562f9f8b792fa82f03d68f63f87c1ec0879d\nAuthor: Amy <amy@example.com>\nDate:   Wed Oct 14 12:39:43 2026 +0800\n\n    新增 Day 1 筆記\n\ncommit 187430fa489096190aec00fe1774935d1a378395\nAuthor: Amy <amy@example.com>\nDate:   Wed Oct 14 12:39:43 2026 +0800\n\n    新增日誌標題"} />
      <p>Author 是你在 L0 設定的姓名與 email，Date 是你的存檔時間。範例作者 Amy 不需要照填。若畫面有 HEAD，它表示「你現在站在哪一本相簿的哪一頁」；L4 再操作它。</p>
      <FalseAlarm signal={': 或 (END)'} title="畫面停住、不能繼續輸入指令？">這是分頁閱讀畫面（pager），不是當機；按英文小寫 q 回到指令列。短內容也可能直接結束。</FalseAlarm>
      <CommandBlock command={"git log --oneline"} comment="讓每次存檔只占一行，方便數照片" />
      <CommandBlock variant="output" command={"fea9562 新增 Day 1 筆記\n187430f 新增日誌標題"} />
      <Callout variant="success">完成訊號：你看到兩行紀錄，上面是「新增 Day 1 筆記」，下面是「新增日誌標題」。保留此資料夾，L3 直接接著做。</Callout>
    </Card>
    <Quiz questions={[
  {
    "q": "status 顯示紅色 Untracked files，代表什麼？",
    "options": [
      "檔案損壞",
      "有新檔案還沒被挑進暫存區",
      "需要 GitHub 登入"
    ],
    "answer": 1,
    "explain": "這是狀態標示；只挑這次想保存的檔案，不必把所有紅字全部加入。"
  },
  {
    "q": "診斷題：add 後又修改 README.md，直接 commit 會拍到哪份？",
    "options": [
      "自動拍最新修改",
      "上一次 add 時放在拍照台的內容",
      "所有檔案都刪掉"
    ],
    "answer": 1,
    "explain": "拍照台不會自動跟著書桌更新；想保存後來的修改，需要重新 add。"
  },
  {
    "q": "翻相簿時停在 (END)，怎麼回去輸入指令？",
    "options": [
      "一直按 Enter",
      "按小寫 q",
      "關機"
    ],
    "answer": 1,
    "explain": "這是分頁閱讀畫面；q 離開閱讀，不會刪除紀錄。"
  },
  {
    "q": "第二次 commit 完，log --oneline 應看到什麼？",
    "options": [
      "兩筆紀錄，新在上、舊在下",
      "只剩最新的一筆",
      "GitHub 網址"
    ],
    "answer": 0,
    "explain": "每次 commit 添一張照片，舊的照片仍保留。"
  }
]} />
  </div>
  );
};
