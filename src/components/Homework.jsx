
import { useState } from 'react';
import { SectionTitle, Card, Callout, Quiz, CommandBlock, FalseAlarm, Screenshot } from './Shared';
import { HOMEWORK_REPO_NAME, INSTRUCTOR_MENTION } from '../config';

const prDescription = `${INSTRUCTOR_MENTION} 請 review 我的 Git 作業

- 這個 PR 新增了：<一句話>
- 我在作業中解決過一次衝突：<是哪個檔案>`;

const checklist = [
  { id: 'owner', label: '這是我自己的 Public repo。', verify: 'repo 首頁的 owner 是自己的帳號，名稱旁標示 Public。' },
  { id: 'commits', label: '至少有 3 次有意義的 commit，作者頭像是我。', verify: 'Commits 頁有每天學到什麼的紀錄；作者連到自己的帳號，email 已綁定。' },
  { id: 'ignore', label: '.gitignore 存在，而且指定檔案確實被忽略。', verify: 'GitHub 檔案列表有 .gitignore、沒有 scratch.txt；本機 scratch.txt 還在，但 status 不列為待加入。' },
  { id: 'merge', label: '我在本機合併並解決衝突，保留了 merge commit。', verify: 'Commits 頁可找到解決衝突的紀錄，打開該筆可看到兩個 parent（它連回兩邊的照片）。' },
  { id: 'pr', label: `PR 要合進自己的 main，描述有 ${INSTRUCTOR_MENTION}。`, verify: 'PR 頂部的接收方是自己的 main，描述已填自己的新增內容與衝突檔名。' },
  { id: 'approved', label: '收到講師 Approve 後，我才自己合併。', verify: 'PR 狀態是 Merged；時間線先有講師核准紀錄，後有自己的合併紀錄。' },
  { id: 'sync', label: '合併後，本機 main 和 GitHub main 的最新 commit 相同。', verify: '比對兩邊最新存檔編號，並在原 PR 留言附上本機紀錄與 GitHub main 的截圖。' },
];

const LessonLink = ({ href, children }) => <a href={href} className="text-indigo-700 underline">{children}</a>;

export const Homework = () => {
  const [checks, setChecks] = useState({});
  const [copyState, setCopyState] = useState('複製描述');
  const checkedCount = checklist.filter((item) => checks[item.id]).length;
  const copyDescription = async () => {
    try {
      await navigator.clipboard.writeText(prDescription);
      setCopyState('已複製');
    } catch {
      setCopyState('複製失敗，請選取下方文字手動複製');
    }
  };

  return (
    <div className="min-w-0 space-y-6 animate-fade-in break-words [overflow-wrap:anywhere] [&_pre]:whitespace-pre-wrap">
      <header>
        <SectionTitle title="作業：我的 Git 日誌" subtitle="獨立建立一本新的相簿，交給講師看過，再由自己合併並同步回電腦。" />
        <p className="text-sm text-slate-600">先準備：完成 L0–L8，能操作本機 Git，並登入自己的 GitHub 帳號。</p>
      </header>
      <Callout title="這次由你決定怎麼做">任務清單只列目標；先自己回想方法，卡住再用各項的回課連結。請用自己的學習內容，不必照抄課堂日誌。完成的證據是自己的 repo、PR 與存檔紀錄。</Callout>
      <Card className="space-y-4">
        <h3 className="font-bold">任務清單：從空資料夾到交件</h3>
        <ol className="list-decimal pl-5 space-y-4">
          <li><strong>建立新的本機日誌，至少保存 3 次。</strong> 在舊 git-journal 資料夾<strong>外面</strong>建立作業專用的新資料夾 <code>{HOMEWORK_REPO_NAME}</code>，確認裡面是空的，再用 init 建立相簿。每次 commit 各記錄一天學到什麼，說明要有意義。不要搬入舊的 .git 或覆蓋舊練習。 <LessonLink href="#first-commit">回 L2：第一次存檔</LessonLink></li>
          <li><strong>加入生效的 .gitignore。</strong> 這次指定忽略 scratch.txt；保留本機測試檔，但不要讓它進入相簿。 <LessonLink href="#diff-restore">回 L3：忽略檔案與存檔說明</LessonLink></li>
          <li><strong>開一個 feat/... 分支加內容，在本機 merge 回 main。</strong> 斜線後自己取名，例如 feat/reflection；... 不用照打。完成後 main 要看得到分支的內容。 <LessonLink href="#branch">回 L4：分支與本機合併</LessonLink></li>
          <li><strong>刻意製造並解決一次衝突，留下 merge commit。</strong> 讓兩個分支對同一行各有已保存的改動，選出最後內容並保存合併照片；檔案裡不能留下衝突標記。 <LessonLink href="#local-conflict">回 L5：本機衝突</LessonLink></li>
          <li><strong>在 GitHub 建立自己的 Public repo，push main。</strong> 名稱用 <code>{HOMEWORK_REPO_NAME}</code>，建立空的雲端相簿再上傳；首頁應看得到自己的日誌與紀錄。 <LessonLink href="#push">回 L6：第一次上雲</LessonLink></li>
          <li><strong>再開一個新的 feat/... 分支新增內容，push 後開 PR。</strong> PR 在自己的 repo；方向是 <strong>base = 自己的 main ← compare = 這次的新分支</strong>。先保留 Open，等講師看過。 <LessonLink href="#pr">回 L7：分支上雲與 PR</LessonLink></li>
          <li><strong>在 PR 描述寫 {INSTRUCTOR_MENTION} 請 review。</strong> 用下面範本填好新增內容和衝突檔名，再送出 PR；這就是交件，不用另填表單。提及講師會通知對方。 <LessonLink href="#pr">回 L7：填 PR 描述</LessonLink></li>
          <li><strong>等講師 review，再依結果處理。</strong> Approve 後自己 Merge；Request changes 就在同一分支修正、保存、上傳，並留言「已修改，請再看一次」。細節見下方「交件之後會發生什麼」。 <LessonLink href="#pr">回 L7：合併申請</LessonLink>、<LessonLink href="#sync">回 L8：同步成果</LessonLink></li>
        </ol>
      </Card>
      <Card className="space-y-3">
        <h3 className="font-bold">PR 描述範本</h3>
        <p>貼到 GitHub 的 PR 描述欄，<strong>不是終端機</strong>。把 <code>&lt;一句話&gt;</code> 和 <code>&lt;是哪個檔案&gt;</code> 整個換掉，角括號不要留下；例如分別填「新增學習心得」與「README.md」。保留第一行的講師 mention。</p>
        <div className="min-w-0 rounded-lg overflow-hidden bg-slate-900 text-slate-100 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-800 px-3 py-2 text-xs">
            <span>貼到 PR 描述欄</span>
            <button type="button" onClick={copyDescription} className="text-indigo-200 hover:text-white underline" aria-live="polite">{copyState}</button>
          </div>
          <pre className="p-3 text-sm break-all">{prDescription}</pre>
        </div>
        <p>貼上後會看到填好的描述；按 Create pull request 後進入 Open 的 PR 頁，描述裡應有講師 mention 和自己的兩項說明。</p>
        <Screenshot id="HW-pr-mention" alt="學員自己的 PR 描述包含講師 mention、新增內容與衝突檔名" caption="你會看到自己的 PR 描述中提及講師，並列出新增內容與解決衝突的檔案。" />
      </Card>
      <SectionTitle title="交件之後會發生什麼" subtitle="講師看申請單，你負責把通過的照片收進主相簿。" />
      <Card className="space-y-3">
        <h3 className="font-bold">收到 Request changes：修改原本這張申請單</h3>
        <p>在 PR 的 Conversation 時間線讀講師的修改意見；若有逐行留言，到 Files changed 看對應位置。你會看到要求修改的審查紀錄與說明。</p>
        <Screenshot id="HW-review-request-changes" alt="PR 時間線上的 Changes requested 審查紀錄與講師修改意見" caption="你會看到講師要求修改的紀錄；先讀清楚要調整的檔案與內容。" />
        <FalseAlarm signal="LF will be replaced by CRLF" title="保存修改前的提醒">這是 Windows 換行提醒，可以繼續；沒有這行也正常。若忘了 commit 的 -m 而進入滿是 ~ 的 Vim，按 Esc → :q! → Enter 離開（:wq 是保存並離開），再確認保存狀態，避免重複 commit。</FalseAlarm>
        <p>回本機 <code>{HOMEWORK_REPO_NAME}</code>，確認正在這張 PR 的同一個分支。依意見修改，再像 <LessonLink href="#first-commit">L2</LessonLink> 挑入改動並 commit；不要另外開 PR。</p>
        <FalseAlarm signal="Enumerating objects:" title="上傳時會出現正常進度">接著會跑 Counting、Writing 等進度；數量會隨你的修改不同。</FalseAlarm>
        <CommandBlock command="git push" comment="把新照片送到這張 PR 的同一個雲端分支" />
        <Callout title="等上傳完成再回網頁">小相簿通常幾秒到一分鐘；等進度結束、提示符回來，不要重按 Enter。成功時會列出這次的分支更新；重新整理 PR，會多出新 commit，Files changed 也會更新。</Callout>
        <p>在原 PR 下方留言框填「已修改，請再看一次」，按 Comment；時間線應出現自己的留言。接著等待講師再次審查。</p>
      </Card>
      <Card className="space-y-3">
        <h3 className="font-bold">收到 Approve：自己合併，再同步回電腦</h3>
        <p>到 PR 的 Conversation 時間線確認<strong>講師的核准紀錄</strong>。核准只表示講師看過；此時 PR 仍是 Open，照片還沒收進 main。</p>
        <Screenshot id="HW-approved-timeline" alt="PR 時間線中講師的 Approved 核准紀錄，PR 尚未合併" caption="你會看到 PR 時間線裡講師的核准紀錄；接著才由你完成合併。" />
        <p>找到 <strong>Merge pull request</strong>；若按鈕是 Squash and merge 或 Rebase and merge，用旁邊箭頭改選 Create a merge commit。按 Merge pull request 會展開確認區，再按 <strong>Confirm merge</strong>，PR 狀態會成為 Merged，時間線會留下自己的合併紀錄。忘了畫面位置可回 <LessonLink href="#pr">L7</LessonLink>。</p>
        <p>回本機 <code>{HOMEWORK_REPO_NAME}</code>，先確認改動已保存、上傳完成。每次一條指令，$ 提示符不用輸入。</p>
        <FalseAlarm signal="Switched to branch 'main'" title="分支的新內容可能暫時不見">電腦的 main 還沒收到剛才網頁合併的照片；下一步下載後才會出現。即使看到 up to date，也只是對照上次知道的雲端狀態。</FalseAlarm>
        <CommandBlock command="git switch main" comment="回主相簿，準備下載雲端 main" />
        <CommandBlock variant="output" command={"Switched to branch 'main'\nYour branch is up to date with 'origin/main'."} />
        <p>上方沿用 L7 的實錄；若已取得雲端資訊，也可能提示 main 落後，接著仍需下載。</p>
        <FalseAlarm signal="Fast-forward" title="這是正常更新">前面可能有 remote: 下載進度，後面列出更新的檔案。</FalseAlarm>
        <FalseAlarm signal="~" title="若下載時進入 Vim">按 Esc → :wq → Enter，保留合併說明並離開；這表示本機可能也有額外紀錄，回 L8 核對兩邊改動，不要直接勾選同步完成。</FalseAlarm>
        <CommandBlock command="git pull" comment="把已合併的雲端照片下載回本機 main" />
        <Callout title="等下載完成再核對">小相簿通常幾秒到一分鐘；等進度結束、提示符回來，不要重按 Enter。成功後本機應看得到 PR 新增的內容，接著還要比對存檔編號。</Callout>
        <FalseAlarm signal={': 或 (END)'} title="翻紀錄時若停在閱讀畫面">按英文小寫 q 回到指令列；短內容可能直接結束。</FalseAlarm>
        <CommandBlock command="git log -1" comment="查看本機 main 最新一張照片的完整編號" />
        <p>你會看到最新 commit 的編號、作者、日期與說明。到 GitHub repo 首頁選 main，再進 Commits 打開最新一筆，比對完整編號是否相同；這裡要找的是網頁合併後的新照片，不是 PR 分支最後一筆。</p>
        <p>將本機紀錄與 GitHub main 最新 commit 截圖貼到原 PR 留言框，按 Comment。你會看到含截圖的留言；這才完成最後的同步驗收。方法忘了可回 <LessonLink href="#sync">L8</LessonLink>。</p>
      </Card>
      <Callout variant="warning" title="結果不同，先停在原處核對">看到 CONFLICT → 回 <LessonLink href="#local-conflict">L5</LessonLink>；看到 rejected → 回 <LessonLink href="#sync">L8</LessonLink>；看到 Repository not found → 回 <LessonLink href="#push">L6</LessonLink> 核對地址與登入。其他錯誤從側邊欄「急診室」查原文，仍不確定就把畫面交給講師；不要一直重試或重建 repo。</Callout>
      <Card className="space-y-3">
        <h3 className="font-bold">交作業前自我檢核，審查後補完最後兩項</h3>
        <p>實際看到證據才打勾。前 5 項交件前核對，最後 2 項等講師核准、自己合併並同步後再勾。勾選只協助你盤點，不會代替送出 PR。</p>
        <Screenshot id="HW-commits-page" alt="作業 repo 的 Commits 頁列出有意義的存檔說明、作者頭像與合併紀錄" caption="你會看到自己的存檔紀錄、作者頭像，以及本機解決衝突留下的合併照片。" />
        <div className="space-y-2">
          {checklist.map((item) => (
            <label key={item.id} className={`flex items-start gap-3 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${checks[item.id] ? 'bg-green-50 border-green-300' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
              <input type="checkbox" checked={!!checks[item.id]} onChange={() => setChecks((previous) => ({ ...previous, [item.id]: !previous[item.id] }))} className="mt-0.5 w-4 h-4 shrink-0 accent-green-600" />
              <span className="min-w-0 text-sm">
                <span className={`font-medium ${checks[item.id] ? 'text-green-900' : 'text-slate-700'}`}>{item.label}</span>
                <span className="block text-xs text-slate-500 mt-0.5">驗證方法：{item.verify}</span>
              </span>
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-500 text-right" aria-live="polite">已勾選 {checkedCount} / {checklist.length} 項</p>
        {checkedCount === checklist.length && <Callout variant="success" title="作業驗收證據已齊全">你已從新相簿走完存檔、分支、衝突、審查、合併與同步。保留 repo 與 PR，之後可以回來翻自己的紀錄。</Callout>}
      </Card>
      <p className="text-sm text-slate-600">答錯沒關係，先讀解析，再回到對應任務核對。</p>
      <Quiz questions={[
        { q: '診斷題：講師要求修改，下一步要另開一張 PR 嗎？', options: ['要，每次修改都開新的', '不用，在同一分支保存並上傳，再留言', '直接合併就好'], answer: 1, explain: '原 PR 會跟著分支的新 commit 更新；留言讓講師知道可以再看一次。' },
        { q: '診斷題：時間線已有講師核准，但 PR 還是 Open，作業完成了嗎？', options: ['完成，核准就是合併', '尚未，要自己合併並同步回本機', '要再建立一個 repo'], answer: 1, explain: '核准是審查結果；Merge 與 Confirm merge 才收進 main，之後還要同步並貼驗收截圖。' },
        { q: '反向判斷：本機作業已存在，只是落後 GitHub main，要重新下載整本相簿嗎？', options: ['每次都要 clone', '不用，確認改動已保存後，在 main pull', '把舊資料夾清空再 init'], answer: 1, explain: '已有相簿只需同步新照片；最後以存檔編號相同確認，不能只看檔案文字。' },
      ]} />
    </div>
  );
};
