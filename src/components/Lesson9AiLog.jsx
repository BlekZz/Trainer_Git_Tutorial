import { useState } from 'react';
import { SquareTerminal, Bot, ListChecks } from 'lucide-react';
import { FlowDiagram } from './Diagrams';
import { SectionTitle, Card, Callout, Quiz, CommandBlock, FalseAlarm, SuccessCheck } from './Shared';

// Real output: Git 2.56 replica of the L2–L8 git-journal history (account substituted).
const logOutput = `eaa9133 (解決標題衝突, 2026-10-21)
fe052fe (在電腦上改標題, 2026-10-21)
667a894 (在網頁上改標題, 2026-10-21)
6825f99 (新增 Day 4 筆記, 2026-10-21)
77d8f71 (Merge pull request #1 from <你的帳號>/feat/day3, 2026-10-20)
056ec63 (新增 Day 3 筆記, 2026-10-20)
e67a664 (解決標題衝突, 2026-10-17)
6d557ce (標題加上名字, 2026-10-17)
8f268c4 (標題改成學習日誌, 2026-10-17)
1bededf (新增 Day 2 筆記, 2026-10-16)
45cd5ec (忽略 tmp 檔, 2026-10-15)
6508323 (新增 Day 1 筆記, 2026-10-14)
6955c5f (新增日誌標題, 2026-10-14)`;

const prompt = `以下是我的 Git 專案存檔紀錄（git log），由新到舊排列，每行是「編號 (說明, 日期)」。請幫我：
1. 依日期由舊到新，整理這個專案每天做了什麼，每天一行。
2. 指出哪些紀錄看得出「為什麼」這樣改，哪些只看得出「改了什麼」。
3. 如果有說明重複、分不出差別的紀錄，列出來。
只根據紀錄回答，紀錄裡沒有的資訊請說「紀錄中看不出來」，不要自己補。

<把 git log 的輸出整段貼在這裡>`;

const sampleAnswer = `【每日進度】
10/14 建立日誌：寫下標題與 Day 1 筆記。
10/15 設定忽略 tmp 暫存檔。
10/16 新增 Day 2 筆記。
10/17 標題有兩個版本（「學習日誌」與「加上名字」），之後解決衝突合成一個。
10/20 透過 PR #1 加入 Day 3 筆記。
10/21 新增 Day 4；網頁與電腦同時改標題，之後解決衝突。

【看得出原因 vs 只看得出改了什麼】
大多數紀錄只說明改了什麼；為什麼要改標題、為什麼忽略 tmp 檔，紀錄中看不出來。

【說明重複】
10/17 與 10/21 都叫「解決標題衝突」，單看說明分不出是哪兩邊的衝突。`;

const CopyBox = ({ label, text }) => {
  const [state, setState] = useState('複製');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('已複製');
    } catch {
      setState('複製失敗，請選取文字手動複製');
    }
  };
  return (
    <div className="min-w-0 rounded-lg overflow-hidden bg-slate-900 text-slate-100 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-800 px-3 py-2 text-xs">
        <span>{label}</span>
        <button type="button" onClick={copy} className="min-h-[36px] rounded px-2 text-indigo-200 hover:bg-white/10 hover:text-white underline" aria-live="polite">{state}</button>
      </div>
      <pre className="p-3 text-sm whitespace-pre-wrap break-all">{text}</pre>
    </div>
  );
};

export const Lesson9AiLog = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words [overflow-wrap:anywhere] [&_pre]:whitespace-pre-wrap">
    <header><SectionTitle title="L9 讓 AI 讀懂你的紀錄" subtitle="把自己的存檔紀錄交給 AI，請它整理進度，再看看哪幾句說明讓它卡住。" /><p className="text-sm text-slate-600">先準備：完成 L8，第一個 git-journal 資料夾有 L2–L8 的完整紀錄。不需要再上傳任何東西。</p></header>
    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：沒參與的人，怎麼五分鐘看懂一個專案？</h3>
      <p>假設你下個月接手同事的專案，同事已經調到別的組。最快的方法不是一個個打開檔案，而是<strong>翻相簿</strong>：每張照片的日期與說明串起來，就是這個專案的進度表。</p>
      <p>照片一多，人讀起來很累，這時可以把整串紀錄交給 AI，請它整理成「每天做了什麼、為什麼」。AI 只能讀到你寫的說明，所以說明寫得越清楚，它整理得越準；說明含糊，它只能猜，甚至自己編理由。</p>
      <p>這一課用你自己的 git-journal 實際試一次：先把紀錄印成一行一張照片，再交給 AI 整理，最後核對 AI 說的是不是真的。</p>
      <FlowDiagram
        label="先把紀錄印成一行一張照片，再交給 AI 整理，最後核對 AI 說的是不是真的"
        steps={[
          { icon: SquareTerminal, tag: '步驟 1', title: '印出紀錄', lines: ['一行一張照片'] },
          { icon: Bot, tag: '步驟 2', title: '交給 AI 整理', lines: ['每天做了什麼、為什麼'], tone: 'accent' },
          { icon: ListChecks, tag: '步驟 3', title: '核對', lines: ['AI 說的是不是真的'], tone: 'success' },
        ]}
        links={['複製', '回頭對照']}
      />
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>AI 整理專案進度時，讀的是你的檔案內容，還是照片說明？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>本課交給它的是照片說明與日期。說明沒寫到的原因，AI 不會知道。若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起想：哪一句讓 AI 卡住？</h3>
      <p>你的 git-journal 裡有兩張照片的說明都是「解決標題衝突」（L5 一次、L8 一次）。我先說結論：AI 能看出有兩次衝突。換你想：它能分出哪次是哪兩邊在衝突嗎？</p>
      <details><summary className="cursor-pointer text-indigo-700">想好再展開</summary><p>分不出來。兩句一模一樣，只能靠日期猜。如果當初寫「解決本機分支的標題衝突」「解決網頁與電腦版標題衝突」，人和 AI 一眼就懂。</p></details>
    </Card>
    <SectionTitle kicker="換你了" title="請 AI 整理你的 Git 日誌" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 把紀錄印成一行一張照片</h3>
      <p>回到<strong>第一個 git-journal</strong> 的 VSCode 視窗（左側顯示 GIT-JOURNAL，不是 GIT-JOURNAL-LAPTOP）。選 Terminal → New Terminal，確認提示符以 git-journal 結尾；$ 和輸出框的內容都不用輸入。</p>
      <p>先把終端機面板往上拉大（拖曳面板上緣），等一下才能一次選取整段紀錄。</p>
      <FalseAlarm signal={': 或 (END)'} title="畫面停住、不能繼續輸入指令？">紀錄較長時會進入分頁閱讀畫面（pager），不是當機。按空白鍵往下翻，按英文小寫 q 回到指令列。短內容可能直接結束。</FalseAlarm>
      <CommandBlock command="git log --format=reference" comment="每張照片印成一行：編號 (說明, 日期)，方便整段複製" />
      <CommandBlock variant="output" command={logOutput} />
      <p>這是照著 L2–L8 實際操作得到的輸出，編號也和 L6–L8 的範例不同（那些來自另一次實測）。你的編號、日期會不同，Merge pull request 那行會是你的帳號。由上往下是由新到舊；每一行就是一張照片，括號裡是你當時寫的說明和日期。</p>
      <SuccessCheck
        terminal={['最上面一行是 L8 的「解決標題衝突」，最下面一行是 L2 的「新增日誌標題」', '大約十幾行，每行都是「編號 (說明, 日期)」']}
        web={['repo 首頁點右上角的 Commits，看到的是同一串說明——接手的人在網頁上讀到的就是這些字']}
        fail="只有兩三行 → 你可能開到別的資料夾，看提示符結尾是不是 git-journal；出現 fatal: not a git repository → 終端機不在 git-journal 裡，回 L2 第 1 步確認開的資料夾。"
      />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 複製紀錄，交給 AI</h3>
      <p>用滑鼠在終端機從第一行選到最後一行，按 Ctrl+C（Mac：Cmd+C）複製。VSCode 終端機有選取文字時，Ctrl+C 是複製；沒選取時是中斷指令，不會刪任何東西，重選一次即可。</p>
      <Callout variant="warning" title="貼進 AI 之前">本課的日誌是練習內容，可以貼。<strong>公司或客戶的專案紀錄</strong>，先問主管能不能貼、可以貼進哪個 AI 工具；紀錄裡若有密碼、客戶名稱等資訊也不要貼。</Callout>
      <p>打開公司允許使用的 AI 對話工具（例如 ChatGPT、Claude、Gemini），把下面整段指示貼進對話框。最後一行 <code>&lt;把 git log 的輸出整段貼在這裡&gt;</code> 要<strong>整個換掉</strong>：刪掉這行，貼上剛才複製的紀錄，角括號不要留下。</p>
      <CopyBox label="貼到 AI 對話框，不是終端機" text={prompt} />
      <p>送出後，AI 會回一段整理。下面是示範回答，你的 AI 用字一定不同，重點是內容：</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-xs font-bold text-slate-500 mb-2">示範回答（每次都會不同）</p><pre className="text-sm whitespace-pre-wrap">{sampleAnswer}</pre></div>
      <Callout variant="success" title="成功的話你會看到">AI 依日期列出 Day 1～Day 4 與改標題的經過，日期和你的紀錄對得上。如果它還指出兩筆「解決標題衝突」分不出差別，也符合預期；沒指出也正常，AI 每次回答不同，第 3 步你會自己核對。</Callout>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 核對 AI 說的是不是真的</h3>
      <p>AI 整理得很快，但它可能補上紀錄裡沒有的「理由」。拿 AI 的每一行，回頭對照第 1 步的輸出：</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>日期與內容對得上 → 可以採用。</li>
        <li>AI 說了某個<strong>原因</strong>（例如「為了讓標題更正式」），但你的說明裡沒有 → 那是 AI 猜的，不能當成事實。</li>
        <li>AI 漏掉某一天 → 看那天的說明是不是太短或太模糊。</li>
      </ul>
      <p>補全練習：如果要重寫那兩句「解決標題衝突」，你會怎麼寫？先自己寫，再展開核對。已經上傳的舊照片說明不用改，練習的是下次的寫法。</p>
      <details><summary className="cursor-pointer text-indigo-700">核對寫法</summary><p>例如 L5 那次寫「解決本機分支的標題衝突，保留名字與學習日誌」，L8 那次寫「解決網頁與電腦版標題衝突，改回統一標題」。重點是說出哪兩邊、最後留下什麼。</p></details>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">實際工作時：AI 可以自己讀紀錄</h3>
      <p>這一課你手動複製貼上。工作上常見的 AI 程式工具（例如 Claude Code、Cursor、GitHub Copilot）打開專案資料夾後，可以自己讀 Git 紀錄。你只要問「讀這個專案的 git log，告訴我最近兩週做了什麼、為什麼這樣改」，它就會自己翻相簿回答。</p>
      <p>不管用哪種工具，規則都一樣：AI 讀得到改了什麼，但「為什麼這樣改」只能靠你留下的說明。每一次 -m 後面的那句話，都是寫給下一個接手的人和 AI 看的。</p>
    </Card>
    <Quiz questions={[
      { q: 'git log --format=reference 每一行包含什麼？', options: ['檔案的完整內容', '照片編號、說明與日期', '你的 GitHub 密碼'], answer: 1, explain: '每行是一張照片：編號 (說明, 日期)，方便整段交給人或 AI 閱讀。' },
      { q: '診斷題：AI 說「10/17 改標題是為了讓日誌更正式」，但你的說明只寫「標題改成學習日誌」，該怎麼看待？', options: ['AI 讀得到你的想法，照單全收', '這是 AI 補的推測，紀錄裡沒有，不能當事實', '代表 Git 紀錄壞了'], answer: 1, explain: 'AI 只讀得到說明；說明沒寫原因，AI 給的原因就是猜測，要回頭核對。' },
      { q: '反向判斷：公司客戶專案的紀錄，可以直接貼進任何 AI 網站嗎？', options: ['可以，只是存檔說明', '先問主管能用哪個工具，也不要貼出密碼或客戶資訊', '貼之前先刪掉 repo'], answer: 1, explain: '紀錄可能含客戶名稱或內部資訊；練習日誌可以貼，工作專案先確認公司規定。' },
      { q: '想讓下一個接手的人與 AI 看懂，哪句說明最好？', options: ['修改', '解決衝突', '解決網頁與電腦版標題衝突，改回統一標題'], answer: 2, explain: '說出哪兩邊、最後留下什麼，沒參與的人只讀這句也懂。' },
    ]} />
  </div>
);
