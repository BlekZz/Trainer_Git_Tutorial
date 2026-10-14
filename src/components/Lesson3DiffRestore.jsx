import { SectionTitle, Card, Callout, Quiz, CommandBlock, NoOutputHint, FalseAlarm } from './Shared';

export const Lesson3DiffRestore = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words">
    <header><SectionTitle title="L3 看差異與還原" subtitle="分辨保留、取消挑選與丟棄修改，並讓 Git 略過臨時檔案。" /><p className="text-sm text-slate-600">先準備：完成 L2 的兩次存檔；VSCode 開著同一個 git-journal。</p></header>

    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：先看書桌，再決定要不要拍</h3>
      <p><strong>diff（差異）</strong> 是列出修改前後文字差異的清單。預設比較書桌與拍照台；本課一開始拍照台和最新照片相同。</p>
      <p>我不急著丟掉文字，先看清楚改了哪一行。<strong>restore（還原）</strong> 是照著保存的樣子恢復內容；不帶 --staged 時，預設照拍照台恢復書桌。<strong>--staged</strong> 表示這次只調整拍照台，不動書桌。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>想保留新文字，只是不想這次拍進去，要動書桌還是拍照台？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>只動拍照台，使用帶 --staged 的還原。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起判斷：先補選擇，再看理由</h3>
      <p>第一題：打錯了且還沒 add，確定不要這段文字 → 我會還原書桌。</p>
      <p>第二題：文字正確但剛才挑錯檔案 → 你會還原哪裡？</p>
      <details><summary className="cursor-pointer">核對</summary><p>還原拍照台。取消挑選不等於刪掉內容。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>診斷題：想保留剛寫的筆記，只打不帶 --staged 的 restore，對嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>不對，它會覆寫書桌。先想清楚要丟文字，還是只取消挑選。 若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <SectionTitle title="🔥 換你了：在自己的 git-journal 看見差異" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 改一行，再看差異</h3>
      <p>在 VSCode 開啟 day1.md，把唯一一行改成下面這行，保留行尾換行並儲存。你會看到新文字；先不要 add。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>day1.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all">Day 1：學會 git init 和 git add</pre></div>
      <FalseAlarm signal={"warning: in the working copy of 'day1.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <FalseAlarm signal={': 或 (END)'} title="畫面停住、不能繼續輸入指令？">這是分頁閱讀畫面（pager），不是當機；按英文小寫 q 回到指令列。短內容也可能直接結束。</FalseAlarm>
      <CommandBlock command={"git diff"} comment="先檢查到底改了什麼，避免丟錯內容" />
      <CommandBlock variant="output" command={"warning: in the working copy of 'day1.md', LF will be replaced by CRLF the next time Git touches it\ndiff --git a/day1.md b/day1.md\nindex d103947..8f38f68 100644\n--- a/day1.md\n+++ b/day1.md\n@@ -1 +1 @@\n-Day 1：學會 git init\n+Day 1：學會 git init 和 git add"} />
      <p>單個 <strong>-</strong> 開頭的內容行是原本的文字，單個 <strong>+</strong> 開頭的是新文字；不是要輸入的符號。--- 與 +++ 標明比對檔案，@@ 標明行號範圍。本例只換了第 1 行。</p>
      <Callout variant="danger" title="下一步會丟掉尚未放上拍照台的改動">確認這次只是練習文字、真的不要它才執行。Git 沒有保存這段新文字，不能靠 Git 復原它。本例尚未 add，因此拍照台仍是最後一次 commit 的內容。</Callout>
      <CommandBlock command={"git restore day1.md"} comment="照拍照台把書桌恢復原樣" />
      <NoOutputHint />
      <p>回到編輯區，day1.md 應恢復為「Day 1：學會 git init」。</p>
      <CommandBlock command={"git status"} comment="確認沒有待保存的改動" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 再改一次：這次只取消挑選</h3>
      <p>把 day1.md 再改成「Day 1：學會 git init 和 git add」並儲存。這次想留下文字，只練習把它拿下拍照台。</p>
      <FalseAlarm signal={"warning: in the working copy of 'day1.md', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <CommandBlock command={"git add day1.md"} comment="先放上拍照台，才有可取消的挑選" />
      <CommandBlock variant="output" command={"warning: in the working copy of 'day1.md', LF will be replaced by CRLF the next time Git touches it"} />
      <CommandBlock command={"git restore --staged day1.md"} comment="拿下拍照台，保留書桌上的新文字" />
      <NoOutputHint>回 VSCode 看 day1.md，仍有「和 git add」；Source Control 的檔案回到 Changes，不在 Staged Changes。</NoOutputHint>
      <p>一般寫法是 <code>git restore --staged &lt;file&gt;</code> 或 <code>git restore &lt;file&gt;</code>；把整個 &lt;file&gt; 換成檔名、角括號不要打，上方就是完整例子。</p>
      <p>補全練習：現在連這段練習文字也不要了，應用哪種 restore？先回答，再展開；這次不是要保留文字。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對並收回練習改動</summary>
        <Callout variant="danger">下一條會覆寫 day1.md，丟掉「和 git add」。只在你確定不要這段練習改動時執行。</Callout>
        <CommandBlock command={"git restore day1.md"} comment="恢復 L2 的筆記，讓後續練習從相同狀態開始" />
      <NoOutputHint />
        <CommandBlock command={"git status"} comment="核對書桌與相簿已一致" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
      </details>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. .gitignore：列出不想入鏡的新檔案</h3>
      <p><strong>.gitignore</strong> 是列出哪些尚未被 Git 記錄的檔案要略過的文字清單，像寫下「哪些東西不要放上拍照台」。它不會刪除檔案，也不會替已拍過的檔案取消紀錄。</p>
      <p>用左側檔案總管 New File 建立 notes.tmp，寫「練習用臨時筆記」並儲存；左側會多出這個檔案。裡面不要放真實密碼。</p>
      <CommandBlock command={"git status"} comment="先看還沒設定忽略時的狀態" />
      <CommandBlock variant="output" command={"On branch main\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tnotes.tmp\n\nnothing added to commit but untracked files present (use \"git add\" to track)"} />
      <p>notes.tmp 列在 Untracked files 下，表示它仍在 Git 的待挑選清單中。</p>
      <p>再建立名為 .gitignore 的檔案，開頭的點也要輸入，不要加 .txt。內容如下，儲存後左側會看到 .gitignore。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>.gitignore</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all">*.tmp</pre></div>
      <p>* 表示任意檔名，所以所有以 .tmp 結尾的新檔案都會被略過。</p>
      <CommandBlock command={"git status"} comment="確認 notes.tmp 不再列出，但忽略規則本身仍待保存" />
      <CommandBlock variant="output" command={"On branch main\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\t.gitignore\n\nnothing added to commit but untracked files present (use \"git add\" to track)"} />
      <p>回到 VSCode 檔案總管，notes.tmp 仍在，只是可能顯示灰色。它消失的是 Git 待挑選項目，不是你的檔案。</p>
      <FalseAlarm signal={"warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it"}>這是 Windows 換行格式提醒，不是失敗；可以繼續。Mac 或原本已用 CRLF 的檔案可能完全沒有這行，沒有訊息也正常。</FalseAlarm>
      <CommandBlock command={"git add .gitignore"} comment="把忽略清單本身放上拍照台" />
      <CommandBlock variant="output" command={"warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it"} />
      <Callout variant="warning" title="記得帶 -m">commit 一律寫成 <code>git commit -m "說明"</code>。萬一漏了 -m、畫面變成滿是 ~ 的編輯器（Vim）：按 Esc，輸入 <code>:q!</code> 再按 Enter 離開，然後用 git status 確認後重打一次。</Callout>
      <p>這次請你補完存檔，訊息是「忽略 tmp 檔」。想好後展開核對。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對保存忽略清單的指令</summary>
        <CommandBlock command={"git commit -m \"忽略 tmp 檔\""} comment="讓以後的自己知道為什麼新增這份清單" />
      <CommandBlock variant="output" command={"[main 846a6e1] 忽略 tmp 檔\n 1 file changed, 1 insertion(+)\n create mode 100644 .gitignore"} />
      </details>
    </Card>
    <Card className="space-y-3 bg-blue-50">
      <h3 className="font-bold">照片說明怎麼寫？</h3>
      <p>保留「讓未來的自己看懂」這個原則：寫動作與對象，例如「新增 Day 1 筆記」「忽略 tmp 檔」；「更新」「好了」看不出改了什麼。這裡不必背前綴分類。</p>
      <p>換個表面試一次：在同一資料夾建立 scratch.tmp，寫一句旅行草稿並儲存。先預測它會不會出現在 Git 的待挑選清單，再用 status 核對；需要時看下一框。</p>
      <CommandBlock command={"git status"} comment="核對新的 .tmp 檔也被同一條規則略過" />
      <CommandBlock variant="output" command={"On branch main\nnothing to commit, working tree clean"} />
      <Callout variant="success">完成訊號：day1.md 恢復 L2 的原句，.gitignore 已保存，notes.tmp 與 scratch.tmp 留在檔案總管但不列在 status。L4 沿用這份 git-journal。</Callout>
    </Card>
    <Quiz questions={[
  {
    "q": "尚未 add 的練習修改確定不要了，哪個操作合適？",
    "options": [
      "git restore day1.md",
      "再 commit 一次就會自動撤銷",
      "刪除整個 repo"
    ],
    "answer": 0,
    "explain": "本例拍照台與最後照片相同，restore 會覆寫書桌；沒拍過的新文字不能靠 Git 救回。"
  },
  {
    "q": "診斷題：只想取消挑選、保留文字，要選哪個？",
    "options": [
      "git restore day1.md",
      "git restore --staged day1.md",
      "刪除 day1.md"
    ],
    "answer": 1,
    "explain": "--staged 只改拍照台；書桌上的新文字仍保留。"
  },
  {
    "q": "notes.tmp 不再出現在 status，是被刪了嗎？",
    "options": [
      "是",
      "不是，它仍在資料夾，只被忽略",
      "已自動存成照片"
    ],
    "answer": 1,
    "explain": ".gitignore 只讓符合規則、尚未記錄的新檔案不列入待挑選清單。"
  },
  {
    "q": "反向判斷：README.md 已經 commit，寫進 .gitignore 就能停止記錄它嗎？",
    "options": [
      "可以",
      "不行，忽略清單不會替已記錄的檔案取消紀錄",
      "會刪掉所有舊照片"
    ],
    "answer": 1,
    "explain": "本課的忽略練習針對尚未被記錄的 notes.tmp，不能把同一招直接套到已記錄的 README.md。"
  },
  {
    "q": "哪句照片說明最有幫助？",
    "options": [
      "更新",
      "完成了",
      "新增午餐清單"
    ],
    "answer": 2,
    "explain": "動作加對象，之後翻相簿就知道這張照片做了什麼。"
  }
]} />
  </div>
);
