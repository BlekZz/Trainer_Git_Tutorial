import { SectionTitle, Card, Callout, Quiz, CommandBlock, FalseAlarm } from './Shared';

export const Lesson4Branch = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words">
    <header><SectionTitle title="L4 分支" subtitle="另開一本相簿保存 Day 2，再把成果收回 main。" /><p className="text-sm text-slate-600">先準備：完成 L3 並保存 .gitignore；同一份 git-journal 沒有待保存的改動。</p></header>

    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：另開一本相簿，試寫 Day 2</h3>
      <p><strong>branch（分支）</strong> 是從某張照片開始另開一本相簿，讓新想法有自己的後續紀錄。<strong>HEAD</strong> 就是「你現在站在哪一本相簿的哪一頁」。</p>
      <p>我會先從 main 另開 feat/day2，把 Day 2 拍好再切回 main；這樣 main 的照片還是原樣。<strong>merge（合併）</strong> 是把另一本相簿的成果收進目前這本，所以要先站回 main 再收。</p>
      <p>分支保存的是照片紀錄，尚未保存的書桌改動可能跟著你走或擋住切換；本課每次切換前都先完成存檔。</p>
      <p className="text-sm">較舊的教材用 git checkout 做切換，作用對應這裡的 git switch；本課統一用 switch。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>想把 Day 2 收進主相簿，合併前應站在哪一本？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>main；合併會改變你目前站著的相簿。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起看分支圖，補出最後一步</h3>
      <div className="grid sm:grid-cols-2 gap-3 text-center" aria-label="分支與合併概念圖">
        <div className="rounded bg-blue-50 p-4">main：Day 1 ＋ 忽略清單<br />↓ 留在原照片</div>
        <div className="rounded bg-pink-50 p-4">feat/day2：從同一張開始<br />↓ 多拍 Day 2</div>
      </div>
      <p>前半我帶：另開相簿 → 拍 Day 2 → 回 main。最後請你補：要讓 main 也有 Day 2，還缺什麼？</p>
      <details><summary className="cursor-pointer">核對</summary><p>把 feat/day2 合併進 main。只是切回 main 不會自動帶入另一邊的照片。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>只切回 main，看到 day2.md 不見了，要重新建立它嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>不用；它還在 feat/day2 的照片裡。接下來合併成果才會出現在 main。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <SectionTitle title="🔥 換你了：在 git-journal 開分支再合併" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 先確認書桌乾淨，再另開相簿</h3>
      <CommandBlock command={"git status"} comment="先確認沒有會被帶到另一個分支的改動" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
      <Callout title="不是 clean 就先停這一步">回 L3 核對是否已保存 .gitignore、還原 day1.md。看到「Your local changes to the following files would be overwritten by checkout」時，表示 Git 正在擋住可能覆寫的切換；保留需要的改動並完成存檔後再切，不要直接丟棄它們。也可到急診室查原文。</Callout>
      <CommandBlock command={"git switch -c feat/day2"} comment="-c 表示建立新分支並立刻切過去" />
      <CommandBlock variant="output" command={"Switched to a new branch 'feat/day2'"} />
      <p>feat/day2 是這本相簿的名字，不是磁碟上的資料夾路徑。此時 HEAD 站在 feat/day2；main 仍在原本的照片。</p>
      <p>用 VSCode 左側 New File 建立 day2.md，寫下方這一行、留行尾換行並儲存；左側會多出 day2.md。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>day2.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all">Day 2：學會分支</pre></div>
      <p>這次多接手一步：請自己完成「放上拍照台 → 按快門」兩步，檔案是 day2.md，照片說明用「新增 Day 2 筆記」。先寫出兩條指令，再依序輸入；卡住才展開提示。</p>
      <FalseAlarm signal={"warning: in the working copy of 'day2.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <p>完成後會看到以 [feat/day2 編號] 開頭的保存訊息，下方說明一個檔案新增了一行；完整輸出在提示裡可核對。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">提示：先挑選檔案</summary>
      <CommandBlock command={"git add day2.md"} comment="挑選這次要保存的分支成果" />
      <CommandBlock variant="output" command={"warning: in the working copy of 'day2.md', LF will be replaced by CRLF the next time Git touches it"} />
      </details>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對按快門的指令</summary>
        <CommandBlock command={"git commit -m \"新增 Day 2 筆記\""} comment="在 feat/day2 相簿保存新照片" />
      <CommandBlock variant="output" command={"[feat/day2 b2dbb59] 新增 Day 2 筆記\n 1 file changed, 1 insertion(+)\n create mode 100644 day2.md"} />
      </details>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 回到 main，把成果收進來</h3>
      <p>再多接手一步：請先自己排出「切回 main → 合併 feat/day2 → 刪除已合併分支名稱」三步。合併與刪分支是第一次學，第一次請展開提示 2、3；熟悉後再收起提示，自己重述順序。閱讀下一個提醒後再操作，不必重做已完成的指令。</p>
      <FalseAlarm signal="day2.md 不見了" title="切回 main 後，檔案清單會變短">這是你在 VSCode 會觀察到的現象，不是終端機錯誤訊息。main 還沒有那張照片，day2.md 仍在另一本相簿，沒有被刪除。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">提示 1：先站回 main</summary>
      <CommandBlock command={"git switch main"} comment="回到準備接收成果的主相簿" />
      <CommandBlock variant="output" command={"Switched to branch 'main'"} />
      </details>
      <p>看 VSCode 左側檔案總管，day2.md 會消失，README.md 與 day1.md 仍在；開著的 day2.md 分頁可能暫留，請以檔案清單為準。這裡不用 ls，因此 Windows 與 Mac 都能直接對照。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">提示 2：收進另一邊的成果</summary>
      <CommandBlock command={"git merge feat/day2"} comment="把 feat/day2 的照片收進目前的 main" />
      <CommandBlock variant="output" command={"Updating 846a6e1..b2dbb59\nFast-forward\n day2.md | 1 +\n 1 file changed, 1 insertion(+)\n create mode 100644 day2.md"} />
      </details>
      <p><strong>Fast-forward</strong> 表示 main 這段時間沒新增自己的照片，可以直接走到 Day 2 那一頁，不用多拍合併照片。day2.md 現在會重新出現在左側，打開後內容是「Day 2：學會分支」。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">提示 3：清理用完的分支名稱</summary>
      <CommandBlock command={"git branch -d feat/day2"} comment="成果已收進 main，刪除用完的分支名稱" />
      <CommandBlock variant="output" command={"Deleted branch feat/day2 (was b2dbb59)."} />
      </details>
      <p>刪的是 feat/day2 這個名稱，不是 main 已收到的 Day 2 內容。若顯示「is not fully merged」，先核對是否漏做上面的 merge，不要改用強制刪除。</p>
      <FalseAlarm signal={': 或 (END)'} title="分支清單若停在閱讀畫面">這是分頁閱讀畫面，不是當機；按英文小寫 q 回到指令列。清單短時也可能直接結束。</FalseAlarm>
      <CommandBlock command={"git branch"} comment="確認目前只剩主相簿名稱" />
      <CommandBlock variant="output" command={"* main"} />
      <p>* 是目前所在分支。完成訊號：只列出 * main，day2.md 還在，L5 就從這裡繼續。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">減少提示：換檔名，你會怎麼做？</h3>
      <p>先在紙上安排「另開 feat/menu → 新增 menu.md → 保存 → 收進 main → 清理分支」的次序，說出每一步會在哪本相簿。這題只口述，不改目前的 git-journal；L5 結尾再用另一個資料夾獨立實作。</p>
      <details><summary className="cursor-pointer">自我核對</summary><p>建分支並切入 → 建檔 → add → commit → 切回 main → merge → 刪分支名稱。應在 main 看得到 menu.md，最後分支清單只剩 main。</p></details>
    </Card>
    <Quiz questions={[
  {
    "q": "git switch -c feat/day2 會做什麼？",
    "options": [
      "只建立名稱，留在 main",
      "建立並立刻切到 feat/day2",
      "把所有照片刪除"
    ],
    "answer": 1,
    "explain": "-c 是建立，switch 是切換；完成後你站在新的相簿。"
  },
  {
    "q": "在 feat/day2 已 commit 的新內容，會立刻改變 main 的照片嗎？",
    "options": [
      "會",
      "不會，要合併才會收進 main",
      "重開電腦後會"
    ],
    "answer": 1,
    "explain": "已保存的分支成果有自己的紀錄；注意未保存的書桌改動不具備同樣的隔離。"
  },
  {
    "q": "診斷題：切回 main 後 day2.md 不見了，要做什麼？",
    "options": [
      "立刻重新建立",
      "確認在 main，再合併 feat/day2",
      "刪除 .git 重來"
    ],
    "answer": 1,
    "explain": "main 還沒有那張照片，檔案仍在 feat/day2。"
  },
  {
    "q": "HEAD 表示什麼？",
    "options": [
      "雲端帳號",
      "你現在站在哪一本相簿的哪一頁",
      "檔案總數"
    ],
    "answer": 1,
    "explain": "HEAD 是目前位置；切分支後會跟著換位置。"
  }
]} />
  </div>
);
