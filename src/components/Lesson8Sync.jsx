import { SectionTitle, Card, Callout, Quiz, CommandBlock, NoOutputHint, FalseAlarm, Screenshot } from './Shared';

// Copied from m3-real-outputs.txt with only the account and repo substitutions.
const outputs = {
  "clone": "Cloning into 'git-journal-laptop'...\nremote: Enumerating objects: 9, done.\nremote: Counting objects: 100% (9/9), done.\nremote: Compressing objects: 100% (4/4), done.\nremote: Total 9 (delta 2), reused 7 (delta 1), pack-reused 0 (from 0)\nReceiving objects: 100% (9/9), done.\nResolving deltas: 100% (2/2), done.",
  "day4Commit": "[main c4e3323] 新增 Day 4 筆記\n 1 file changed, 1 insertion(+)\n create mode 100644 day4.md",
  "day4Push": "Enumerating objects: 4, done.\nCounting objects: 100% (4/4), done.\nDelta compression using up to 16 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 552 bytes | 552.00 KiB/s, done.\nTotal 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)\nremote: Resolving deltas: 100% (1/1), completed with 1 local object.\nTo https://github.com/<你的帳號>/git-journal.git\n   58fc040..c4e3323  main -> main",
  "day4Pull": "remote: Enumerating objects: 4, done.\nremote: Counting objects: 100% (4/4), done.\nremote: Compressing objects: 100% (1/1), done.\nremote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0 (from 0)\nFrom https://github.com/<你的帳號>/git-journal\n   58fc040..c4e3323  main       -> origin/main\nUpdating 58fc040..c4e3323\nFast-forward\n day4.md | 1 +\n 1 file changed, 1 insertion(+)\n create mode 100644 day4.md",
  "localTitle": "warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it\n[main f3a48d9] 在電腦上改標題\n 1 file changed, 1 insertion(+), 1 deletion(-)",
  "rejected": "To https://github.com/<你的帳號>/git-journal.git\n ! [rejected]        main -> main (fetch first)\nerror: failed to push some refs to 'https://github.com/<你的帳號>/git-journal.git'\nhint: Updates were rejected because the remote contains work that you do not\nhint: have locally. This is usually caused by another repository pushing to\nhint: the same ref. If you want to integrate the remote changes, use\nhint: 'git pull' before pushing again.\nhint: See the 'Note about fast-forwards' in 'git push --help' for details.",
  "conflictPull": "remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nremote: Compressing objects: 100% (2/2), done.\nremote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)\nFrom https://github.com/<你的帳號>/git-journal\n   c4e3323..4b75a42  main       -> origin/main\nAuto-merging README.md\nCONFLICT (content): Merge conflict in README.md\nAutomatic merge failed; fix conflicts and then commit the result.",
  "conflictStatus": "On branch main\nYour branch and 'origin/main' have diverged,\nand have 1 and 1 different commits each, respectively.\n  (use \"git pull\" if you want to integrate the remote branch with yours)\n\nYou have unmerged paths.\n  (fix conflicts and run \"git commit\")\n  (use \"git merge --abort\" to abort the merge)\n\nUnmerged paths:\n  (use \"git add <file>...\" to mark resolution)\n\tboth modified:   README.md\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")",
  "resolveCommit": "[main d0e7843] 解決標題衝突",
  "resolvePush": "Enumerating objects: 8, done.\nCounting objects: 100% (8/8), done.\nDelta compression using up to 16 threads\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (4/4), 819 bytes | 819.00 KiB/s, done.\nTotal 4 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0)\nremote: Resolving deltas: 100% (2/2), completed with 1 local object.\nTo https://github.com/<你的帳號>/git-journal.git\n   4b75a42..d0e7843  main -> main",
  "log": "*   d0e7843 解決標題衝突\n|\\\n| * 4b75a42 在網頁上改標題\n* | f3a48d9 在電腦上改標題\n|/\n* c4e3323 新增 Day 4 筆記\n*   58fc040 Merge pull request #1 from <你的帳號>/feat/day3\n|\\\n| * 2e61ef9 新增 Day 3 筆記\n|/\n* e6760a9 Part 1 的日誌",
  "markers": "<<<<<<< HEAD\n# Amy 的 Git 學習日誌（電腦版）\n=======\n# Amy 的 Git 學習日誌（網頁版）\n>>>>>>> 4b75a429a6793edb9bbf8220db2d778c93b00b46"
};

export const Lesson8Sync = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words [overflow-wrap:anywhere] [&_pre]:whitespace-pre-wrap">
    <header><SectionTitle title="L8 兩台電腦的同步" subtitle="用兩個資料夾練習上傳、下載，再解決自己在網頁與電腦改同一行的衝突。" /><p className="text-sm text-slate-600">先準備：完成 L7，git-journal 在乾淨的 main；自己的 GitHub 已有 Day 3 且仍登入。</p></header>
    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：換電腦，先拿回整本相簿</h3>
      <p><strong>clone</strong> 是把整本雲端相簿下載到新電腦，包含檔案與存檔紀錄，也會記住 origin 地址。這次用第二個資料夾 git-journal-laptop 模擬第二台電腦，不用真的換機器。</p>
      <div className="grid sm:grid-cols-3 gap-3 text-center" aria-label="第二個資料夾上傳到 GitHub，第一個資料夾再下載">
        <div className="rounded bg-purple-50 p-3">第二個視窗<br />git-journal-laptop<br />拍 Day 4 → push 上傳</div>
        <div className="rounded bg-indigo-50 p-3">自己的 GitHub<br />git-journal<br />雲端相簿</div>
        <div className="rounded bg-blue-50 p-3">第一個視窗<br />git-journal<br />pull 下載 → 看見 Day 4</div>
      </div>
      <p>我先 clone，因為新電腦還沒有相簿；之後只下載新照片就用 pull。兩個資料夾各有自己的書桌與相簿，改一邊不會自動改另一邊。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>第二個資料夾剛 commit，第一個資料夾會馬上多出 Day 4 嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>不會；第二邊要先 push，第一邊再 pull。若答不出來，回看上方三格圖並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起選：同一行有兩種標題時</h3>
      <p>我先提供前半段：網頁保存「網頁版」，電腦保存「電腦版」，兩邊都改第 1 行。你接手決定：能直接把電腦照片蓋上去嗎？</p>
      <details><summary className="cursor-pointer">核對處理順序</summary><p>不能略過雲端的新照片；上傳會被拒。先 pull，遇到同一行衝突就像 L5，選好文字、add、commit，最後再 push。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>看到衝突時，Current 永遠代表第一台電腦嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>不是，Current 是目前正在操作的這份相簿，Incoming 是這次收進來的版本。本課會在第一個視窗處理。能指出自己站在哪裡，再進真機；不確定可回 L5 看兩份候選文字。</p></details></Callout>
    <SectionTitle title="🔥 換你了：讓自己的兩份相簿同步" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 在旁邊下載第二份相簿</h3>
      <p>在原本 git-journal 的 VSCode 選 Terminal → New Terminal。確認新終端機的 PowerShell 提示符路徑以 git-journal 結尾；$ 與 PS 路徑不用打，每次一條指令，輸出框也不用輸入。</p>
      <CommandBlock command="cd .." comment="往上一層，回到裝著 git-journal 的資料夾，避免把第二份塞在第一份裡" />
      <NoOutputHint>提示符的路徑會少掉最後的 git-journal。例如原本是 PS C:\Users\Amy\Documents\git-journal&gt;，現在應是 PS C:\Users\Amy\Documents&gt;；這些是位置示意，不用照打。</NoOutputHint>
      <p>若路徑不是預期的父資料夾，先停下核對。下方 <code>&lt;你的帳號&gt;</code> 要<strong>整個換成自己的帳號，角括號不要打</strong>。例如帳號是 amy-example，完整指令是 <code className="break-all">git clone https://github.com/amy-example/git-journal.git git-journal-laptop</code>；請換成自己的網址。</p>
      <FalseAlarm signal="Cloning into 'git-journal-laptop'..." title="下載時會跑進度，不是卡住">接著會看到 remote:、Receiving objects 與 Resolving deltas。小相簿通常幾秒到一分鐘，等提示符回來，不要重按 Enter；數量與編號因自己的紀錄而不同。</FalseAlarm>
      <CommandBlock command="git clone https://github.com/<你的帳號>/git-journal.git git-journal-laptop" comment="下載自己的整本雲端相簿，並把新資料夾命名為 git-journal-laptop" />
      <CommandBlock variant="output" command={outputs.clone} />
      <Callout variant="warning" title="下載前後的檢查">若看到 destination path 'git-journal-laptop' already exists and is not an empty directory.，先確認是否已做過，不要刪舊成果或一直重試。若看到 Repository not found，核對自己的帳號、repo 網址與 L6 登入授權；其他訊息到側邊欄「急診室」對照。</Callout>
      <p>下載完成，父資料夾裡會多出 git-journal-laptop。<strong>clone 不會自動把終端機移進新資料夾</strong>，接著用新視窗開它。</p>
      <p>在 VSCode 選 File → New Window，再在<strong>新視窗</strong>選 File → Open Folder → 選 git-journal-laptop。左側應顯示 GIT-JOURNAL-LAPTOP，並看得到 README.md 與 day1.md～day3.md。接著選 Terminal → New Terminal，提示符路徑必須以 git-journal-laptop 結尾。</p>
      <p>保留第一個 git-journal 視窗。真的換新電腦時，還要先完成 L0 的工具與 Git 身份設定、L6 的登入授權；本次同一台電腦共用那些設定。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 在第二個視窗保存並上傳 Day 4</h3>
      <p>確認左側是 GIT-JOURNAL-LAPTOP。在它上面按右鍵 → New File，輸入 day4.md。編輯區貼上下方內容，最後按 Enter 留行尾換行，再按 Ctrl+S（Mac：Cmd+S）；左側多出 day4.md，分頁的未儲存圓點消失。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">檔案內容：<strong>day4.md</strong>（貼到編輯區，不是終端機）</p><pre className="whitespace-pre-wrap break-all">Day 4：在第二台電腦寫日誌</pre></div>
      <FalseAlarm signal="LF will be replaced by CRLF" title="Windows 可能出現換行提醒">訊息若提到 day4.md 並出現這段，並不是失敗，可以繼續；沒有訊息也正常。</FalseAlarm>
      <CommandBlock command="git add day4.md" comment="把第二個資料夾的新筆記放上拍照台" />
      <Callout title="挑選後的畫面">通常沒有訊息；若出現上方 CRLF 換行提醒也正常。等提示符回來即可繼續。</Callout>
      <FalseAlarm signal="~" title="記得帶 -m">漏掉 -m 而進入 Vim 時，按 Esc，輸入 :q! 再 Enter 離開；:wq 是保存訊息並離開。離開後先看 status，仍有 Changes to be committed 才重做帶 -m 的指令。</FalseAlarm>
      <CommandBlock command={'git commit -m "新增 Day 4 筆記"'} comment="先在第二份相簿保存照片，才有內容可以上傳" />
      <CommandBlock variant="output" command={outputs.day4Commit} />
      <p>補全練習：clone 已記住 main 的目的地。請先寫出把新照片上傳的指令，想好再展開，只執行一次。</p>
      <FalseAlarm signal="Enumerating objects: 4, done." title="接下來是正常上傳進度">小相簿通常幾秒到一分鐘，會看到 Counting、Writing 與 main → main；等提示符回來，不要重按 Enter。若跳出瀏覽器登入，登入自己的帳號並授權，不要在終端機輸入網站密碼。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對上傳指令</summary>
        <CommandBlock command="git push" comment="把第二份相簿的 Day 4 送到自己的 GitHub" />
        <CommandBlock variant="output" command={outputs.day4Push} />
      </details>
      <p>回自己的 GitHub main 頁重新整理，應看到 day4.md。這只證明雲端收到了；第一個資料夾還沒下載。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 回第一個視窗，自己補上下載步驟</h3>
      <p>切回左側顯示 GIT-JOURNAL 的第一個 VSCode 視窗。第 1 步用來 clone 的終端機還在父資料夾，請選 Terminal → New Terminal 另開一個，<strong>確認提示符以 git-journal 結尾</strong>，不要在父資料夾操作。</p>
      <p>先寫出「把雲端新照片帶回目前 main」的指令，再展開核對。這次由你選方法，不需要再下載整本新相簿。</p>
      <FalseAlarm signal="Fast-forward" title="這是正常更新">前面會跑 remote: 下載進度，接著列出 day4.md。小相簿通常幾秒到一分鐘；等提示符回來再繼續，不要重按 Enter。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對下載指令</summary>
        <CommandBlock command="git pull" comment="把第二個視窗已上傳的 Day 4 下載到第一個資料夾" />
        <CommandBlock variant="output" command={outputs.day4Pull} />
      </details>
      <Callout variant="success">完成訊號：第一個視窗出現 day4.md，打開後內容是「Day 4：在第二台電腦寫日誌」。接下來都留在第一個視窗；第二個視窗先不要改檔案。</Callout>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">4. 在網頁與第一個視窗，各改同一行</h3>
      <p>到自己的 GitHub git-journal 頁，分支選 main，點 README.md，再點鉛筆 Edit this file；會出現可輸入文字的編輯區。把<strong>第 1 行整行</strong>換成下方文字。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">網頁檔案內容：<strong>README.md</strong></p><pre className="whitespace-pre-wrap break-all"># Amy 的 Git 學習日誌（網頁版）</pre></div>
      <p>按 Commit changes 開啟確認框，訊息填「在網頁上改標題」，選 <strong>Commit directly to the main branch</strong>，再按框內 Commit changes。頁面回到檔案內容時，應看到「網頁版」。Amy 沿用 L5 的練習文字。</p>
      <Screenshot id="L8-web-edit" alt="自己的 main 在 GitHub 編輯 README.md，並直接 Commit changes 到 main" caption="你會看到 README.md 的網頁編輯區與 Commit changes 確認框；保存後標題有「網頁版」。" />
      <p>現在回<strong>第一個 git-journal 視窗，先不要 pull</strong>，讓它保留原有照片。打開 README.md，把同一個第 1 行換成下方文字並 Ctrl+S；編輯區應看到「電腦版」。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">電腦檔案內容：<strong>README.md</strong></p><pre className="whitespace-pre-wrap break-all"># Amy 的 Git 學習日誌（電腦版）</pre></div>
      <p>沿用 L5 的 -am：-a 挑入已被 Git 記錄的檔案修改，-m 寫照片說明。這次請確認只改 README.md；新檔案不能靠 -a 加入。</p>
      <FalseAlarm signal="warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it">這是 Windows 換行提醒，不是保存失敗；原本已用 CRLF 或 Mac 可能沒有這行。</FalseAlarm>
      <CommandBlock command={'git commit -am "在電腦上改標題"'} comment="保存電腦版，讓兩邊同一行各有一張新照片" />
      <CommandBlock variant="output" command={outputs.localTitle} />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">5. 觀察上傳被拒，再下載兩邊的改動</h3>
      <FalseAlarm signal=" ! [rejected]        main -> main (fetch first)" title="這次上傳被拒是預期練習，照片沒有壞">雲端相簿有電腦還沒有的新照片，所以這次上傳沒有完成。error: failed to push some refs 是這次被拒的結果，不要一直重推；下一步先下載。這不是每次 push 都可忽略的訊息。</FalseAlarm>
      <CommandBlock command="git push" comment="觀察 Git 如何避免直接蓋掉電腦還沒收到的網頁照片" />
      <CommandBlock variant="output" command={outputs.rejected} />
      <p>接下來 pull 會收到網頁版。因為你也改了同一行，Git 不能替你決定哪個標題較好。</p>
      <FalseAlarm signal="CONFLICT (content): Merge conflict in README.md" title="這次會停下來，等你選標題">看到 Automatic merge failed 時不要重複 pull；往下看 status 和 README.md 的候選文字。小相簿通常幾秒到一分鐘，先等下載進度結束、提示符回來。</FalseAlarm>
      <FalseAlarm signal="~" title="如果兩邊改的是不同行，pull 可能打開 Vim">不同位置的改動可能自動合併，接著打開合併訊息編輯器。若看到滿是 ~ 的 Vim，保留預填說明，按 Esc，輸入 <strong>:wq</strong> 再 Enter，保存並離開；不要一直按 Enter。這次同一行衝突通常不會開它。</FalseAlarm>
      <CommandBlock command="git pull" comment="下載網頁的照片，讓 Git 指出無法自動選擇的同一行" />
      <CommandBlock variant="output" command={outputs.conflictPull} />
      <CommandBlock command="git status" comment="確認現在等待處理的是 README.md" />
      <CommandBlock variant="output" command={outputs.conflictStatus} />
      <p>have diverged 表示兩邊各有自己新增的照片；both modified: README.md 表示這個檔案兩邊都改過。輸出的 &lt;file&gt; 是整個替換成檔名的佔位符，不要輸入角括號。現在是在合併中，不用再照 status 裡的提示重複 pull。</p>
      <p>若沒有 CONFLICT，先核對第 4 步是否兩邊都改同一行、都已保存；若已自動合併，不要硬加衝突標記。若出現 fatal: Need to specify how to reconcile divergent branches.，或只顯示不能向前更新，表示 Git 設定與本課不同；先把原文交給講師確認，不要強行覆蓋。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">6. 像 L5 一樣，在 VSCode 選出最後的文字</h3>
      <p>第一個視窗打開 README.md，會看到這段檔案內容，不是要輸入的指令：</p>
      <CommandBlock variant="output" command={outputs.markers} />
      <ul className="list-disc pl-5 space-y-2">
        <li>HEAD 是現在站的位置；上半段 Current 是這份電腦相簿的「電腦版」。</li>
        <li>======= 分開兩份候選文字；下半段 Incoming 是下載回來的「網頁版」。</li>
        <li>最底下這次是<strong>一長串代碼</strong>，不是 L5 的分支名。它是雲端版本那張照片的 commit id（存檔編號），你的代碼可能不同。</li>
      </ul>
      <p>Accept Current Change 只留電腦版；Accept Incoming Change 只留網頁版；Accept Both Changes 會留兩行，不會替你組成一句。這次先按 Accept Both Changes，標記會消失、留下兩行，再整理成下方這一行。</p>
      <p>若沒出現按鈕，直接在文字編輯區把整段五行（包括三個標記行）換成下方一行，結果相同。</p>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="text-sm mb-2">解決後的檔案內容：<strong>README.md</strong></p><pre className="whitespace-pre-wrap break-all"># Amy 的 Git 學習日誌</pre></div>
      <p>保留行尾換行，按 Ctrl+S（Mac：Cmd+S）。完成訊號：只有整理好的標題，沒有 &lt;&lt;&lt;&lt;&lt;&lt;&lt;、======= 或 &gt;&gt;&gt;&gt;&gt;&gt;&gt;，也沒有兩個重複標題。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">7. 補全三步：標示處理完成、保存、上傳</h3>
      <p>先把下面三個答案都收起，自己寫出這三步的指令，commit 說明用「解決標題衝突」。想好後逐一展開核對，每條只執行一次；需要提醒可回 L5 第 5 步。</p>
      <FalseAlarm signal="LF will be replaced by CRLF" title="挑入 README.md 時可能再看到換行提醒">這只是 Windows 換行格式提醒，沒有訊息也正常；它不表示還有衝突。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對第 1 步：告訴 Git 已處理好</summary>
        <CommandBlock command="git add README.md" comment="挑入整理好的內容，標示這個檔案已解決" />
        <Callout title="挑選後的畫面">通常沒有訊息；若出現上方 CRLF 換行提醒也正常。等提示符回來即可繼續。</Callout>
      </details>
      <FalseAlarm signal="~" title="保存時記得帶 -m">若漏掉 -m 進入 Vim，按 Esc，輸入 :q! 再 Enter 離開編輯；:wq 是保存訊息並離開。合併可能有預填訊息，離開後先用 status 核對：若已 clean，不要重複 commit；仍在合併中才執行帶 -m 的指令。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對第 2 步：保存合併照片</summary>
        <CommandBlock command={'git commit -m "解決標題衝突"'} comment="把你選好的結果保存成連接兩邊紀錄的照片" />
        <CommandBlock variant="output" command={outputs.resolveCommit} />
      </details>
      <FalseAlarm signal="Enumerating objects: 8, done." title="這次會正常上傳合併成果">接著有 Counting、Writing 與 main → main；小相簿通常幾秒到一分鐘，等提示符回來，不要重按 Enter。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對第 3 步：把成果送回雲端</summary>
        <CommandBlock command="git push" comment="讓雲端也保存已解決衝突的標題" />
        <CommandBlock variant="output" command={outputs.resolvePush} />
      </details>
      <FalseAlarm signal={': 或 (END)'} title="紀錄畫面停住時">這是分頁閱讀畫面（pager），按英文小寫 q 回到指令列，短內容也可能直接結束。</FalseAlarm>
      <CommandBlock command="git log --oneline --graph" comment="核對合併照片連到電腦與網頁的兩筆標題紀錄" />
      <CommandBlock variant="output" command={outputs.log} />
      <p>最上面是「解決標題衝突」，下面兩條線保留了「在網頁上改標題」與「在電腦上改標題」。實測把 Part 1 簡化成一筆，你的下面會有 L2–L5 的完整照片；編號與 PR 號碼也可能不同。</p>
      <Callout variant="success">完成訊號：第一個資料夾的標題沒有衝突標記，紀錄保留兩邊改動，push 成功；重新整理自己的 GitHub README.md，應看到「# Amy 的 Git 學習日誌」。第二個資料夾尚未下載這次標題，這是正常的。</Callout>
    </Card>
    <Card className="space-y-3 bg-green-50">
      <h3 className="font-bold">獨立練習：換一個下載入口，自己驗收</h3>
      <p>現在換回 GIT-JOURNAL-LAPTOP 視窗，不新增檔案、不改文字。先自己決定怎麼讓第二份相簿也收到剛才的合併照片；不看指令做一次，卡住再回第 3 步。</p>
      <p>你會看到下載進度，等提示符回來再檢查。注意：這次 README.md 的文字可能和原本一模一樣（解完衝突的標題剛好等於舊標題），真正更新的是「紀錄」，所以不能只看檔案內容判斷。若有未保存改動，先處理完再同步。</p>
      <p>完成訊號：在<strong>兩個</strong>視窗的終端機各輸入一次 <code>git log -1 --oneline</code>（只顯示最新一張照片），兩邊印出的編號要一模一樣。編號以你自己第一個資料夾顯示的為準，下面只是範例：</p>
      <CommandBlock command="git log -1 --oneline" comment="兩個資料夾各輸入一次，比對最前面的編號" />
      <CommandBlock variant="output" command={"d0e7843 解決標題衝突"} />
    </Card>
    <Quiz questions={[
      { q: 'clone 完後，終端機還在父資料夾，能直接在那裡操作日誌嗎？', options: ['可以，Git 會自己找', '先在新視窗開 git-journal-laptop，確認新終端機位置', '再 clone 一次'], answer: 1, explain: 'clone 會建資料夾，但不會把原本終端機移進去；必須確認正在操作哪份相簿。' },
      { q: '診斷題：第二個視窗 commit 後，第一個視窗 pull 卻沒有新內容，可能少了哪一步？', options: ['第二個視窗還沒 push', '第一個視窗還沒 init', '少刪一個分支'], answer: 0, explain: '雲端要先收到照片，另一份相簿才下載得到；commit 只保存在目前電腦的那份相簿。' },
      { q: '診斷題：看到 rejected (fetch first)，一直重推會解決嗎？', options: ['會，按多次就好', '不會，要先下載並處理雲端的新照片', '先刪 README.md'], answer: 1, explain: '被拒是因為雲端有本機沒有的照片；這次下載後有同一行衝突，要選文字、add、commit 再上傳。' },
      { q: '衝突標記底下是一長串代碼，代表什麼？', options: ['GitHub 密碼', '雲端版本的存檔編號', '一定是壞檔'], answer: 1, explain: '它指出下載回來那張照片的 commit id；仍然是比較上、下兩份文字，像 L5 一樣處理。' },
      { q: '反向判斷：你的旅行清單早已在這台電腦下載過，只是落後雲端，應再 clone 嗎？', options: ['每次都 clone', '在既有資料夾 pull 就好', '重新 init'], answer: 1, explain: 'clone 是第一次拿整本相簿；已有相簿要更新，確認書桌乾淨後用 pull。' },
    ]} />
    <SectionTitle title="新專案用 init、雲上已有用 clone" />
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="space-y-3 bg-indigo-50/50 border-indigo-100">
        <h3 className="font-bold text-indigo-900">新專案：從第一張照片開始</h3>
        <p>自己剛建的資料夾，還沒有任何 Git 紀錄，用 init 建相簿，再挑檔案、拍照。要第一次上雲，回 L6 建空的雲端相簿並記住地址。</p>
      </Card>
      <Card className="space-y-3 bg-purple-50/50 border-purple-100">
        <h3 className="font-bold text-purple-900">雲上已有：第一次拿到這台電腦</h3>
        <p>自己的雲端相簿已有紀錄，新電腦用 clone 整本下載；它已包含相簿與地址，不用再 init 或 remote add。已下載過、只是要更新，就在那份資料夾 pull。</p>
      </Card>
    </div>
  </div>
);
