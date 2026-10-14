import { SectionTitle, Card, Callout, Quiz, CommandBlock, FalseAlarm, Screenshot } from './Shared';

// Copied from m3-real-outputs.txt with only the account and repo substitutions.
const outputs = {
  "clean": "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
  "branch": "Switched to a new branch 'feat/day3'",
  "commit": "[feat/day3 2e61ef9] 新增 Day 3 筆記\n 1 file changed, 1 insertion(+)\n create mode 100644 day3.md",
  "push": "Enumerating objects: 4, done.\nCounting objects: 100% (4/4), done.\nDelta compression using up to 16 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 534 bytes | 534.00 KiB/s, done.\nTotal 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)\nremote: Resolving deltas: 100% (1/1), completed with 1 local object.\nremote:\nremote: Create a pull request for 'feat/day3' on GitHub by visiting:\nremote:      https://github.com/<你的帳號>/git-journal/pull/new/feat/day3\nremote:\nTo https://github.com/<你的帳號>/git-journal.git\n * [new branch]      feat/day3 -> feat/day3\nbranch 'feat/day3' set up to track 'origin/feat/day3'.",
  "switchMain": "Switched to branch 'main'\nYour branch is up to date with 'origin/main'.",
  "pull": "remote: Enumerating objects: 1, done.\nremote: Counting objects: 100% (1/1), done.\nremote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)\nFrom https://github.com/<你的帳號>/git-journal\n   e6760a9..58fc040  main       -> origin/main\nUpdating e6760a9..58fc040\nFast-forward\n day3.md | 1 +\n 1 file changed, 1 insertion(+)\n create mode 100644 day3.md",
  "log": "*   58fc040 Merge pull request #1 from <你的帳號>/feat/day3\n|\\\n| * 2e61ef9 新增 Day 3 筆記\n|/\n* e6760a9 Part 1 的日誌",
  "deleteBranch": "Deleted branch feat/day3 (was 2e61ef9)."
};

export const Lesson7PR = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words [overflow-wrap:anywhere] [&_pre]:whitespace-pre-wrap">
    <header><SectionTitle title="L7 分支上雲與自己的 PR" subtitle="在自己的 repo 上傳 Day 3 分支、提出合併申請，再把合併成果下載回電腦。" /><p className="text-sm text-slate-600">先準備：完成 L6 並登入自己的 GitHub；原本 git-journal 在 main 且沒有待保存的改動。</p></header>
    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：申請單與收進相簿是兩個動作</h3>
      <p><strong>PR（Pull Request）</strong> 是「這本分支相簿拍好了，請收進主相簿」的申請單。Create pull request 只是送出申請；按 <strong>Merge pull request</strong> 並確認，才真的把照片收進主相簿。</p>
      <p><strong>pull</strong> 是把雲端的新照片下載下來，並整理進目前的本機相簿。本課在網頁合併後，電腦的 main 不會自動更新，所以最後需要 pull。</p>
      <div className="grid sm:grid-cols-2 gap-3 text-center" aria-label="上傳分支後用 PR 申請收進雲端 main，再下載回本機 main">
        <div className="rounded bg-purple-50 p-3">自己的 feat/day3<br />push 上傳 → PR 申請 → Merge 收進雲端 main</div>
        <div className="rounded bg-blue-50 p-3">自己的本機 main<br />pull 下載 ← 雲端 main</div>
      </div>
      <p>團隊也會各自在分支準備內容再收進 main；這次所有分支都在你自己的 repo，申請與合併都由你完成。我先上傳分支，是因為 GitHub 要先收到分支照片，才有內容可比較。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>按 Create pull request 後，main 就有 Day 3 了嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>還沒有；這只是申請單，要完成 Merge 與 Confirm merge 才收進去。若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起選：申請單的方向</h3>
      <p>我先指出 compare 是「提供照片的分支」，這次填 feat/day3；你補 base，也就是「要收進哪本相簿」。</p>
      <details><summary className="cursor-pointer">核對方向</summary><p>base = main ← compare = feat/day3；兩邊都在你自己的 git-journal。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>網頁已合併，但電腦看不到 day3.md，要再次開 PR 嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>不用；先回電腦的 main，再 pull 下載。能分清「申請合併」與「下載成果」再開始；不確定就回看上方兩格圖。</p></details></Callout>
    <SectionTitle title="🔥 換你了：在自己的 git-journal 開第一張 PR" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 開分支，保存 Day 3</h3>
      <p>回原本 git-journal 的 VSCode，終端機路徑應以 git-journal 結尾。每次一條指令，等提示符回來再繼續；$ 與 PS 路徑不用打，輸出框不用輸入。</p>
      <CommandBlock command="git status" comment="先確定從已上傳、乾淨的 main 開始" />
      <CommandBlock variant="output" command={outputs.clean} />
      <p>若不是 main 或還有待保存的改動，先回 L6 完成收尾。</p>
      <CommandBlock command="git switch -c feat/day3" comment="另開一本分支相簿，讓 Day 3 先在這裡準備" />
      <CommandBlock variant="output" command={outputs.branch} />
      <p>在 VSCode 左側檔案總管的 GIT-JOURNAL 上按右鍵 → New File，輸入 day3.md，會出現空白編輯區。貼上下方一行，最後按 Enter 留行尾換行，再 Ctrl+S（Mac：Cmd+S）；分頁的未儲存圓點會消失。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>day3.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all">Day 3：學會把分支送上雲端</pre></div>
      <FalseAlarm signal="LF will be replaced by CRLF" title="Windows 可能出現換行提醒">如果訊息提到 day3.md 並出現這段，表示換行格式提醒，可以繼續；沒有訊息也正常。</FalseAlarm>
      <CommandBlock command="git add day3.md" comment="只挑這次新建的筆記放上拍照台" />
      <Callout title="挑選後的畫面">通常沒有訊息；若出現上方 CRLF 換行提醒也正常。等提示符回來即可繼續。</Callout>
      <FalseAlarm signal="~" title="記得帶 -m，避免進入 Vim">若漏了 -m 而看到滿是 ~ 的編輯器，按 Esc，輸入 :q! 再 Enter 離開；:wq 是保存訊息並離開。離開後先看 status，仍有 Changes to be committed 才重做帶 -m 的指令。</FalseAlarm>
      <CommandBlock command={'git commit -m "新增 Day 3 筆記"'} comment="保存分支照片，GitHub 才能收到這次紀錄" />
      <CommandBlock variant="output" command={outputs.commit} />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 把分支上傳到自己的雲端相簿</h3>
      <FalseAlarm signal="remote: Create a pull request for 'feat/day3' on GitHub by visiting:" title="這是成功後的提示，不是錯誤">進度中的 Counting、Writing 與 remote: 都正常。這句附的是開申請單的連結，並沒有替你建立 PR。小相簿通常幾秒到一分鐘，等提示符回來，不要重按 Enter。</FalseAlarm>
      <CommandBlock command="git push -u origin feat/day3" comment="讓 GitHub 收到新分支；-u 記住這個分支以後上傳的目的地" />
      <CommandBlock variant="output" command={outputs.push} />
      <p>編號、數量與速度會不同；feat/day3 → feat/day3 表示分支已上傳。若出現登入視窗，依 L6 在瀏覽器登入並授權自己的帳號，不要在終端機輸入網站密碼。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 填自己的 PR 申請單</h3>
      <p>回 GitHub 自己的 git-journal 頁面重新整理，會看到黃色 had recent pushes 提示與 <strong>Compare &amp; pull request</strong> 按鈕，點它會開申請表。</p>
      <Screenshot id="L7-compare-banner" alt="自己的 git-journal 顯示 feat/day3 最近上傳與 Compare & pull request 按鈕" caption="你會看到 feat/day3 的黃色提示，按 Compare & pull request 進入申請表。" />
      <p>若黃色提示已消失，點上方 Pull requests → New pull request，會出現比較分支的頁面；照下面核對 base 與 compare，再按 Create pull request 進入表單。</p>
      <Callout title="送出前先檢查方向">頁面 repo 必須是 <code>&lt;你的帳號&gt;/git-journal</code>，其中佔位文字代表你自己的帳號，不是要輸入角括號。核對 <strong>base = main ← compare = feat/day3</strong>，下方變更應只有 day3.md。方向相反時先改正，不要送出。</Callout>
      <p>標題填「新增 Day 3 筆記」，描述填「新增 day3.md，記錄第一次分支上雲」。表單會保留你輸入的文字。</p>
      <Screenshot id="L7-pr-form" alt="自己的 repo 的 PR 表單，base main、compare feat/day3" caption="你會看到自己的 git-journal、base main 與 compare feat/day3，以及 Day 3 的標題和描述。" />
      <p>按 <strong>Create pull request</strong>，會進入一張標示 Open 的 PR 頁面，並取得編號，例如 #1。這時申請已送出，尚未收進 main。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">4. 自己合併，再刪除雲端分支名稱</h3>
      <p>在剛開的 PR 頁往下找到合併按鈕，先確認文字是 <strong>Merge pull request</strong>。若是 Squash and merge 或 Rebase and merge，點旁邊下拉箭頭改選 Create a merge commit，讓按鈕成為 Merge pull request。</p>
      <p>按 <strong>Merge pull request</strong>，會展開確認區；保留預填說明，再按 <strong>Confirm merge</strong>，頁面會顯示 Merged。</p>
      <Screenshot id="L7-pr-merge-button" alt="PR 頁的 Merge pull request 與 Confirm merge 確認區" caption="你會看到合併確認區；按 Confirm merge 後，PR 狀態會變成 Merged。" />
      <p>若提示有衝突而無法合併，先停下來核對這次是否只新增 day3.md，別跳到刪分支。</p>
      <p>看到 Merged 後按 <strong>Delete branch</strong>。它刪除的是雲端 feat/day3 的名稱，已收進 main 的照片仍在，本機的同名分支也還在。</p>
      <Screenshot id="L7-branch-delete" alt="已合併 PR 下方的 Delete branch 按鈕" caption="你會看到已合併的 PR 與 Delete branch；按下後會顯示分支已刪除。" />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">5. 下載雲端 main，補全最後兩步</h3>
      <FalseAlarm signal="Switched to branch 'main'" title="切回去時 day3.md 暫時不見了？">本機 main 還是合併前的照片，所以檔案暫時不在；下一步下載後就會出現。即使顯示 up to date，也只是和電腦上次知道的雲端狀態比較。</FalseAlarm>
      <CommandBlock command="git switch main" comment="先站回主相簿，才把雲端主相簿的新照片收進來" />
      <CommandBlock variant="output" command={outputs.switchMain} />
      <FalseAlarm signal="Fast-forward" title="這是把 main 向前更新，不是錯誤">pull 會跑 remote: 進度，再顯示更新了哪些檔案。小相簿通常幾秒到一分鐘；等提示符回來，不要重按 Enter。</FalseAlarm>
      <CommandBlock command="git pull" comment="下載網頁剛合併好的 main，讓本機也看得到 day3.md" />
      <CommandBlock variant="output" command={outputs.pull} />
      <p>打開 day3.md 應看到剛寫的筆記。接下來先自己寫出「用每張照片一行、帶分支線條翻紀錄」的指令，再展開核對，只執行一次。</p>
      <FalseAlarm signal={': 或 (END)'} title="紀錄畫面停住時">這是分頁閱讀畫面（pager），按英文小寫 q 回到指令列。短內容可能直接結束。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對翻相簿指令</summary>
        <CommandBlock command="git log --oneline --graph" comment="核對 Day 3 與 GitHub 建立的合併照片" />
        <CommandBlock variant="output" command={outputs.log} />
      </details>
      <p>Merge pull request #1 是 GitHub 在你確認合併時建立的照片，線條連回 Day 3 與原本 main。編號與 PR 號碼可能不同；實測把 Part 1 簡化成一筆「Part 1 的日誌」，你的下方會保留 L2–L5 的完整紀錄，不用改成範例。</p>
      <p>最後要刪除<strong>本機</strong>已合併的 feat/day3 名稱。回想 L4，先寫出指令再核對。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對收尾指令</summary>
        <CommandBlock command="git branch -d feat/day3" comment="照片已在 main，清掉本機用完的分支名稱" />
        <CommandBlock variant="output" command={outputs.deleteBranch} />
      </details>
      <Callout variant="success">完成訊號：GitHub 的 PR 是 Merged，本機 main 有 day3.md，紀錄有合併照片，刪除分支顯示 Deleted branch。若沒看到這些，回到對應步驟核對，再進 L8。</Callout>
      <p>獨立判斷，不必另建分支：自己的旅行清單若在 feat/packing 準備好，要收進 main，申請表兩個欄位怎麼選？收進後電腦又怎麼取得？先自己說出順序；不確定再回看第 3、5 步。</p>
    </Card>
    <Quiz questions={[
      { q: 'Create pull request 按完，哪個動作才真的把照片收進 main？', options: ['再 push 一次', 'Merge pull request，再 Confirm merge', 'Delete branch'], answer: 1, explain: 'PR 是申請單，Merge 與確認才完成收進主相簿。' },
      { q: '診斷題：base = feat/day3、compare = main，看起來兩邊都有選，能直接送出嗎？', options: ['能，方向不影響', '不能，應該 main 接收 feat/day3', '先刪 main'], answer: 1, explain: 'base 是接收方，compare 是提供內容的分支；本課要 main ← feat/day3。' },
      { q: '診斷題：網頁已 Merged，本機 main 沒有 day3.md，下一步？', options: ['重新開 PR', '在本機 main 執行 pull', '重新 init'], answer: 1, explain: '網頁合併不會自動改電腦，pull 才下載並整理到目前的相簿。' },
      { q: '反向判斷：自己的旅行清單 main 只落後雲端，沒有新分支要合併，還需要 PR 嗎？', options: ['每次下載都要 PR', '不用，只需 pull 同步', '先把雲端分支刪掉'], answer: 1, explain: 'PR 處理把分支收進另一分支的申請；下載已有成果用 pull。' },
    ]} />
  </div>
);
