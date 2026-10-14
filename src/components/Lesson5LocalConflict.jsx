import { SectionTitle, Card, Callout, Quiz, CommandBlock, NoOutputHint, FalseAlarm, Screenshot } from './Shared';

export const Lesson5LocalConflict = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words">
    <header><SectionTitle title="L5 本機衝突" subtitle="在自己電腦製造一次標題衝突，選好文字並完成合併存檔。" /><p className="text-sm text-slate-600">先準備：完成 L4、目前在 main；git-journal 沒有待保存的改動。</p></header>

    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：兩本相簿對同一行拍了不同樣子</h3>
      <p><strong>衝突（conflict）</strong> 是兩份改動無法自動選出要保留哪份的情況，需要你決定最後的內容。不需要兩個人或 GitHub，自己在兩個分支改同一行就能練。</p>
      <div className="grid sm:grid-cols-2 gap-3 text-center" aria-label="兩個標題由共同版本分開，再由人決定合併結果">
        <div className="rounded bg-blue-50 p-3">main<br /># Amy 的 Git 日誌</div>
        <div className="rounded bg-pink-50 p-3">feat/title<br /># 我的 Git 學習日誌</div>
      </div>
      <p>兩邊原本都是「# 我的 Git 日誌」。我想保留名字與「學習」兩種資訊，所以合併時會整理成「# Amy 的 Git 學習日誌」，而不是讓 Git 猜。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>兩本相簿對同一行各存一種標題，Git 能替你決定喜歡哪句嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>不能；需要由你選出或重寫最終文字，再保存合併結果。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起選：留一邊，還是重寫？</h3>
      <p>我先指出 main 有名字，feat/title 有「學習」。你接手補一句同時保留這兩個資訊的標題，想好再核對。</p>
      <details><summary className="cursor-pointer">核對這次要保存的內容</summary><p># Amy 的 Git 學習日誌。只保留一行，不需要重複兩個標題。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>在 VSCode 改完標題並按儲存，合併就結束了嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>還沒；要 add 告訴 Git 已處理這個檔案，再 commit 保存合併照片。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <SectionTitle title="🔥 換你了：在 git-journal 製造並解開衝突" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 在 feat/title 保存一種標題</h3>
      <CommandBlock command={"git status"} comment="確認從乾淨的 main 開始，方便需要時取消合併" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
      <p>若不是上面的狀態，先回 L4 完成收尾。這次標題中的 Amy 是練習文字，先照寫，方便對照畫面。</p>
      <CommandBlock command={"git switch -c feat/title"} comment="另開一本相簿嘗試新標題" />
      <CommandBlock variant="output" command={"Switched to a new branch 'feat/title'"} />
      <p>打開 README.md，把第 1 行整行換成下方內容，保留行尾換行並按 Ctrl+S（Mac：Cmd+S）；編輯區會顯示新標題。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>README.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all"># 我的 Git 學習日誌</pre></div>
      <p>這次用 <strong>-am</strong>：-a 把「已被 Git 記錄的檔案」修改挑進來，-m 附上說明，所以這一條會挑選並拍照。README.md 在 L2 已記錄，可以用；全新的檔案仍要先 add。請確認這時只改了 README.md。</p>
      <FalseAlarm signal={"warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it\nwarning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"}>這是換行提醒，不是標題沒保存；有時還會提到已存在的 .gitignore。沒有這兩行也正常。</FalseAlarm>
      <CommandBlock command={"git commit -am \"標題改成學習日誌\""} comment="保存分支版本，之後回 main 才不會帶著未存的文字" />
      <CommandBlock variant="output" command={"warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it\nwarning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it\n[feat/title 5d010e5] 標題改成學習日誌\n 1 file changed, 1 insertion(+), 1 deletion(-)"} />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 回 main，把同一行改成另一種標題</h3>
      <CommandBlock command={"git switch main"} comment="回到另一份照片，在相同位置做不同修改" />
      <CommandBlock variant="output" command={"Switched to branch 'main'"} />
      <p>README.md 會恢復「# 我的 Git 日誌」，這是 main 的照片。把第 1 行改成下方文字並儲存；不要新增成第 2 行。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>README.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all"># Amy 的 Git 日誌</pre></div>
      <FalseAlarm signal={"warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it\nwarning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"}>這仍是換行提醒，可以接著做合併。</FalseAlarm>
      <CommandBlock command={"git commit -am \"標題加上名字\""} comment="保存 main 的另一個標題，形成兩邊都改同一行的情況" />
      <CommandBlock variant="output" command={"warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it\nwarning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it\n[main c10b022] 標題加上名字\n 1 file changed, 1 insertion(+), 1 deletion(-)"} />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 請 Git 合併，觀察預期的衝突</h3>
      <FalseAlarm signal={"Auto-merging README.md\nCONFLICT (content): Merge conflict in README.md\nAutomatic merge failed; fix conflicts and then commit the result."} title="這次出現 CONFLICT 正是練習目標">Git 會停止自動合併，等你決定標題；檔案沒有毀損。不要反覆執行 merge，先讀下面的 status 和標記。</FalseAlarm>
      <CommandBlock command={"git merge feat/title"} comment="嘗試把兩本相簿合在一起，讓 Git 指出需要決定的位置" />
      <CommandBlock variant="output" command={"Auto-merging README.md\nCONFLICT (content): Merge conflict in README.md\nAutomatic merge failed; fix conflicts and then commit the result."} />
      <CommandBlock command={"git status"} comment="查出是哪個檔案等待你處理" />
      <CommandBlock variant="output" command={"On branch main\nYou have unmerged paths.\n  (fix conflicts and run \"git commit\")\n  (use \"git merge --abort\" to abort the merge)\n\nUnmerged paths:\n  (use \"git add <file>...\" to mark resolution)\n\tboth modified:   README.md\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")"} />
      <p>both modified: README.md 表示兩邊都改了它。若沒有出現衝突，停下來核對前兩步是否確實在不同分支改了同一行、各自 commit；不要硬照後面的標記操作。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">想先退回合併前？只在仍有衝突、尚未完成 commit 時使用</summary>
        <Callout variant="warning">下面是退出路徑，主線練習不用輸入。因為合併前書桌乾淨，它能回到 main 合併前的狀態；這次手動解衝突的改動會丟掉，兩邊已 commit 的照片仍在。</Callout>
        <CommandBlock command={"git merge --abort"} comment="取消這次尚未完成的合併" />
        <NoOutputHint>README.md 會回到「# Amy 的 Git 日誌」。這不是刪除 feat/title。</NoOutputHint>
        <CommandBlock command={"git status"} comment="核對已退出衝突狀態" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
        <p>準備好重新練時，重做本節上面的 merge 與 status；會再看到同樣的 CONFLICT 與 both modified，然後接著做第 4 步。</p>
      </details>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">4. 在 VSCode 選出最後的文字</h3>
      <p>從左側檔案總管點 README.md，在文字編輯區會看到下面這段（是檔案內容，不是指令）：</p>
      <CommandBlock variant="output" command={"<<<<<<< HEAD\n# Amy 的 Git 日誌\n=======\n# 我的 Git 學習日誌\n>>>>>>> feat/title"} />
      <ul className="list-disc pl-5 space-y-2">
        <li><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>：上半段開始；HEAD 是你現在站的相簿，本次為 main。</li>
        <li><code>=======</code>：把兩份候選文字分開。</li>
        <li><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feat/title</code>：下半段結束；下半段來自要收進來的 feat/title。</li>
      </ul>
      <p>本次兩邊都是你自己寫的，因此不要把 Current／Incoming 理解成「我／別人」。上方可能出現三個按鈕：</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Accept Current Change</strong>：只留目前 main 的「# Amy 的 Git 日誌」。</li>
        <li><strong>Accept Incoming Change</strong>：只留 feat/title 的「# 我的 Git 學習日誌」。</li>
        <li><strong>Accept Both Changes</strong>：兩行都留下，不會自動幫你組合成一句。</li>
      </ul>
      <Screenshot id="L5-vscode-conflict" alt="README.md 的兩個衝突標題與 VSCode 接受目前、傳入或雙方變更按鈕" caption="你會看到 main 與 feat/title 的標題分成兩段，上方提供接受其中一邊或兩邊的選項。" />
      <p>這次請先按 Accept Both Changes，編輯區會留下兩行標題、移除分隔標記；再把兩行整理成下面這一行。若沒看到按鈕，直接在文字編輯區把整段五行（包含三個標記行）換成這一行，結果相同。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>README.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all"># Amy 的 Git 學習日誌</pre></div>
      <p>按 Ctrl+S（Mac：Cmd+S）。完成訊號：檔案只有這行標題與行尾換行，沒有 &lt;&lt;&lt;&lt;&lt;&lt;&lt;、======= 或 &gt;&gt;&gt;&gt;&gt;&gt;&gt;。只刪掉標記、卻不看最後的文字，不算完成判斷。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">5. 告訴 Git 已處理好，再保存合併照片</h3>
      <FalseAlarm signal={"warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <CommandBlock command={"git add README.md"} comment="把已選好的結果放上拍照台，標示這個檔案已處理" />
      <CommandBlock variant="output" command={"warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it"} />
      <FalseAlarm signal="~" title="本課帶 -m，避免打開 Vim">若漏掉 -m 而進入 Vim，按 Esc，輸入 :q! 再 Enter 離開編輯；:wq 是保存訊息並離開。合併可能已帶有預填訊息，離開後先用 status 核對：若已 clean，不要重複 commit；若仍在合併中，再執行下面帶 -m 的指令。</FalseAlarm>
      <CommandBlock command={"git commit -m \"解決標題衝突\""} comment="用一句說明保存已解決的合併結果" />
      <CommandBlock variant="output" command={"[main a43e379] 解決標題衝突"} />
      <p>這次多一張連接兩邊紀錄的合併照片。上方編號只是例子；說明文字就是你在 -m 後輸入的內容。</p>
      <FalseAlarm signal={': 或 (END)'} title="畫面停住、不能繼續輸入指令？">這是分頁閱讀畫面（pager），不是當機；按英文小寫 q 回到指令列。短內容也可能直接結束。</FalseAlarm>
      <CommandBlock command={"git log --oneline --graph"} comment="--graph 用線條畫出兩邊照片如何匯合" />
      <CommandBlock variant="output" command={"*   a43e379 解決標題衝突\n|\\  \n| * 5d010e5 標題改成學習日誌\n* | c10b022 標題加上名字\n|/  \n* b2dbb59 新增 Day 2 筆記\n* 846a6e1 忽略 tmp 檔\n* fea9562 新增 Day 1 筆記\n* 187430f 新增日誌標題"} />
      <p>最上面是合併照片；往下兩條線分別有兩次改標題的照片，再接回 Day 2。編號會不同，有些設定也會附上 HEAD 與分支名稱；重點是兩條線匯合、兩份紀錄都在。</p>
      <CommandBlock command={"git status"} comment="最後核對沒有待處理的合併或改動" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
      <Callout variant="success">完成訊號：main 的 README.md 是「# Amy 的 Git 學習日誌」，紀錄有合併照片，status 顯示 working tree clean。這份 git-journal 留給 L6 繼續使用。</Callout>
    </Card>
    <Card className="space-y-3 bg-green-50">
      <h3 className="font-bold">Part 1 自我檢核：不看教材自己做一次 L2→L4</h3>
      <p>先收起指令，換成「旅行清單」情境。用 L1 的建資料夾與 Open Folder 方法，在 git-journal 旁建立另一個空資料夾 album-practice 並開啟；不要建在 git-journal 裡，也不要刪掉原本的成果。這輪不提供指令，卡住再回對應 L-number。</p>
      <ul className="space-y-3">
        {[
          'L2：建立 Git 紀錄，為行李清單與行程各保存一次；翻相簿能找到兩筆不同說明。',
          'L3：改一行看差異，取消一次挑選但保留文字，再丟棄這段練習改動；讓 scratch.tmp 不出現在待挑選清單。',
          'L4：自己命名一個分支，新增美食清單並保存；切回 main 時它不在，合併後它出現，刪除分支名稱後內容仍在。',
          '不看指令，能解釋每一步是在改書桌、拍照台，還是相簿。'
        ].map(text => <li key={text}><label className="flex items-start gap-2"><input type="checkbox" className="mt-1 shrink-0" /><span>{text}</span></label></li>)}
      </ul>
      <p>全部能獨立完成再進 Part 2；有卡住的項目就回該課再做一次。挑戰結束後，用 Open Folder 重新開回原本 git-journal，左側應看得到 README.md、day1.md、day2.md 與 .gitignore。</p>
    </Card>
    <Quiz questions={[
  {
    "q": "看到衝突標記，代表專案壞了嗎？",
    "options": [
      "是，只能刪掉重來",
      "不是，Git 在等你選出最後的文字",
      "不用看，直接 commit"
    ],
    "answer": 1,
    "explain": "標記只是指出兩份候選內容；你需要決定、移除標記並儲存。"
  },
  {
    "q": "修好文字並儲存後，正確收尾順序是？",
    "options": [
      "只儲存就好",
      "git add README.md，再 git commit -m \"解決標題衝突\"",
      "再次 merge 就好"
    ],
    "answer": 1,
    "explain": "先用 add 標示處理完成，再用 commit 保存合併照片。這整段只在本機進行。"
  },
  {
    "q": "診斷題：本次 Accept Current Change 會保留哪個？",
    "options": [
      "feat/title 的學習日誌",
      "main 的 Amy 的 Git 日誌",
      "自動拼成 Amy 的 Git 學習日誌"
    ],
    "answer": 1,
    "explain": "目前站在 main，所以 Current 是 main。Both 也只會留兩份，並不幫你組句。"
  },
  {
    "q": "反向判斷：已 commit 完成合併，還能用 merge --abort 撤銷嗎？",
    "options": [
      "可以隨時用",
      "不行，它只用來取消尚在進行中的合併",
      "會刪掉兩邊照片"
    ],
    "answer": 1,
    "explain": "逃生路徑要在合併尚未完成時選；它不會刪掉兩邊已保存的照片。"
  }
]} />
  </div>
);
