import { SectionTitle, Card, Callout, Quiz, CommandBlock, NoOutputHint, FalseAlarm, Screenshot } from './Shared';

// Copied from m3-real-outputs.txt with only the account and repo substitutions.
const outputs = {
  "remote": "origin\thttps://github.com/<你的帳號>/git-journal.git (fetch)\norigin\thttps://github.com/<你的帳號>/git-journal.git (push)",
  "push": "Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 16 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (5/5), 590 bytes | 590.00 KiB/s, done.\nTotal 5 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)\nTo https://github.com/<你的帳號>/git-journal.git\n * [new branch]      main -> main\nbranch 'main' set up to track 'origin/main'.",
  "status": "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean"
};

export const Lesson6Push = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words [overflow-wrap:anywhere] [&_pre]:whitespace-pre-wrap">
    <header><SectionTitle title="L6 GitHub 與第一次 push" subtitle="把 Part 1 的 git-journal 上傳到自己的 GitHub 雲端相簿。" /><p className="text-sm text-slate-600">先準備：完成 L5，git-journal 在 main 且沒有待保存的改動；完成 L0 的 gh 安裝。</p></header>
    <Card className="space-y-3 bg-indigo-50">
      <h3 className="font-bold">我先示範：相簿拍好了，送到哪裡？</h3>
      <p><strong>GitHub</strong> 是雲端相簿，像 Google 相簿，可以備份、分享自己的存檔紀錄。<strong>push</strong> 就是把電腦裡已拍好的照片上傳到雲端相簿；只有 commit，照片還留在電腦。</p>
      <p><strong>remote</strong> 是電腦記住的雲端相簿地址，<strong>origin</strong> 是我們替這個地址取的小名。Repository（簡稱 repo）是放檔案與存檔紀錄的地方，本課就在自己的帳號建立一個。</p>
      <p>我會先建空的雲端相簿，再讓電腦記住它的地址，最後上傳已拍好的照片。這樣 L2–L5 的成果就能接著用，不必重新建立本機相簿。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>剛 commit 完就關掉電腦，GitHub 已經有那張照片了嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>還沒有；commit 保存在電腦，push 才上傳。若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起想：先填地址，再選動作</h3>
      <p>我先給前半段：「建立自己的空 repo → 記住它的 HTTPS 地址」。你補最後一步：要把電腦的照片送上去，該選 commit 還是 push？</p>
      <details><summary className="cursor-pointer">核對最後一步</summary><p>push。前提是照片已 commit；本課沿用 L5 已保存好的相簿。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>這次該開新的空資料夾，還是原本 git-journal？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>原本 git-journal，因為照片都在那裡。確認自己找得到 README.md、day1.md、day2.md 與 .gitignore，再開始真機操作。</p></details></Callout>
    <SectionTitle title="🔥 換你了：讓自己的相簿第一次上雲" />
    <Card className="space-y-3">
      <h3 className="font-bold">1. 註冊並登入自己的 GitHub</h3>
      <p>已有帳號就先確認能登入，再跳到第 2 步。還沒有的話，前往 <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline">github.com</a>，點 Sign up，會出現註冊表單。</p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>依畫面輸入 email、密碼與帳號名稱（username）。</li>
        <li>到信箱收驗證碼，回網頁輸入；完成後會進入後續註冊畫面。</li>
        <li>若出現英文拼圖人機驗證，照畫面拖曳完成。詢問職業等問卷可按 Skip，不影響練習。</li>
      </ol>
      <Callout title="兩個小提醒">帳號名稱會出現在個人網址，請選自己能辨識的名字；記住註冊 email，之後可和 L0 設定的 Git 身份核對。Git 的作者設定與 GitHub 登入是兩件事。</Callout>
      <Screenshot id="L6-signup" alt="GitHub 註冊表單的 email、密碼與帳號名稱欄位" caption="你會看到註冊表單；驗證完成後能登入自己的 GitHub 首頁。" />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 讓電腦取得你的登入授權</h3>
      <p>VSCode 選 File → Open Folder，開原本的 git-journal；選 Terminal → New Terminal，下方會出現 PowerShell，提示符路徑應以 git-journal 結尾。每次只打一條，按 Enter，等提示符回來再繼續。<strong>$ 與 PS 路徑不用打</strong>；輸出框也不用輸入。</p>
      <Callout variant="warning" title="這條會變成問答選單">下面按 Enter 後會出現選單，用上下方向鍵移動、Enter 確認，不是用滑鼠點。若單題要求 Yes / No，選 Yes（或依提示輸入 Y）。看到選項是正常的。</Callout>
      <FalseAlarm signal="Press Enter to open github.com in your browser..." title="這是等你開瀏覽器，不是當機">看到這句時按一次 Enter。若瀏覽器沒開，把終端機顯示的網址貼到瀏覽器；要取消這輪登入可按 Ctrl+C，回到提示符後再試。</FalseAlarm>
      <CommandBlock command="gh auth login" comment="授權這台電腦使用自己的 GitHub 帳號" />
      <Callout title="接下來會看到什麼">終端機會依序詢問帳號、連線方式與登入方法；照下面選。完成瀏覽器操作通常需一兩分鐘，等待時不要反覆按 Enter。</Callout>
      <ol className="list-decimal pl-5 space-y-2">
        <li>What account? → 選 <strong>GitHub.com</strong>。</li>
        <li>Preferred protocol? → 選 <strong>HTTPS</strong>。</li>
        <li>Authenticate Git with your GitHub credentials? → 選 <strong>Yes</strong>，讓 Git 也使用這份授權。</li>
        <li>How to authenticate? → 選 <strong>Login with a web browser</strong>。</li>
        <li>終端機給你一組驗證碼；按 Enter 開瀏覽器，在驗證碼頁貼上它。確認登入的是自己的帳號，再按 Authorize。完成後回 VSCode，會看到登入成功訊息與提示符。</li>
      </ol>
      <p className="text-sm text-slate-600">順序與文字可能隨版本不同，原則是 GitHub.com → HTTPS → Yes → 瀏覽器登入。驗證碼過期時重新執行這一步取得新碼。</p>
      <Screenshot id="L6-gh-auth-device" alt="GitHub 瀏覽器驗證碼輸入與 Authorize 授權畫面" caption="你會看到驗證碼欄位，接著是 Authorize 授權畫面；完成後回終端機。" />
      <CommandBlock command="gh auth status" comment="確認目前授權的確是自己的帳號" />
      <Callout title="等待查詢結果">通常幾秒內會看到 Logged in to github.com account 後面接自己的帳號，Git operations protocol 應為 https。✓ 與顏色都是正常的成功提示，等提示符回來再繼續。</Callout>
      <Callout variant="warning" title="登入有卡住時">看到 The term 'gh' is not recognized，回 L0 確認已安裝 gh 並重開 VSCode；看到 You are not logged into any GitHub hosts，回到上面的登入步驟。若顯示的帳號不是自己，先停下來確認瀏覽器登入者，不要建立 repo；其他錯誤可到側邊欄「急診室」對照原文。</Callout>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 建立完全空白的雲端相簿</h3>
      <p>前往 <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-indigo-600 underline">github.com/new</a>，會看到 New repository 表單。Owner 選自己的帳號，Repository name 填 <strong>git-journal</strong>。可選 Private，只供自己練習。</p>
      <Callout variant="warning" title="這次三個初始化選項全部不要選">Add README 不要勾／保持關閉；Add .gitignore 與 license 保持 None。否則雲端相簿已經有一張你電腦沒有的照片，第一次上傳會被拒絕。若名稱已被使用，先確認是否之前已做過本課，不要刪掉已有的成果。</Callout>
      <Screenshot id="L6-new-repo-form" alt="自己的 git-journal 建立表單，README 關閉、gitignore 與 license 為 None" caption="你會看到自己的帳號與 git-journal 名稱，三個初始化選項都沒有加入檔案。" />
      <p>按 Create repository，會進入空 repo 的 Quick setup 頁。選 <strong>HTTPS</strong>，按網址旁的複製按鈕；不要選 SSH，也不用貼頁面下方整串指令。</p>
      <Screenshot id="L6-new-repo-after" alt="空白 git-journal 頁面的 HTTPS 網址與複製按鈕" caption="你會看到以 https://github.com/ 開頭、以 git-journal.git 結尾的網址。" />
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">4. 記住地址，再上傳 main</h3>
      <p>回到 git-journal 的終端機。下方 <code>&lt;你的帳號&gt;</code> 要<strong>整個換掉，角括號不要打進去</strong>。例如帳號是 amy-example，完整指令會是 <code className="break-all">git remote add origin https://github.com/amy-example/git-journal.git</code>；請用自己的網址，不要照用 amy-example。</p>
      <CommandBlock command="git remote add origin https://github.com/<你的帳號>/git-journal.git" comment="讓本機記住雲端相簿地址，並替它取名 origin" />
      <NoOutputHint />
      <CommandBlock command="git remote -v" comment="上傳前先核對 origin 是否指向自己的 git-journal" />
      <CommandBlock variant="output" command={outputs.remote} />
      <p>fetch 與 push 兩行分別顯示下載、上傳使用的地址，都應是自己的帳號。若看到 error: remote origin already exists.，代表地址小名已存在，不要重複新增；用這裡的查詢核對，地址不同就先停下來請講師協助。</p>
      <FalseAlarm signal="Enumerating objects: 5, done." title="上傳會跑百分比，這是正常進度">Counting、Compressing、Writing 與 Total 是整理及傳送照片的進度。小相簿通常幾秒到一分鐘；等 main → main 與提示符回來，不要重按 Enter。數量、編號與速度會不同，實測範例的 Part 1 紀錄有簡化，你的完整相簿會有更多照片。</FalseAlarm>
      <Callout title="第一次 push 可能再開登入視窗">若跳出瀏覽器登入，登入自己的帳號並依畫面授權，再回終端機等待完成。<strong>不要在終端機輸入 GitHub 網站密碼</strong>；若終端機要求 Password，按 Ctrl+C，回第 2 步確認 HTTPS 與授權 Yes 後再試。</Callout>
      <CommandBlock command="git push -u origin main" comment="上傳 main；-u 的意思是「記住以後 push 都送到這裡」" />
      <CommandBlock variant="output" command={outputs.push} />
      <p>這次記住的是 main 的目的地。看到 main → main 與最後的設定訊息，表示自己的雲端 main 已建立。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">5. 補全練習：最後由你確認成果</h3>
      <p>先不要展開：寫出 L2 用來檢查目前狀態的指令。想好後核對，只執行一次。</p>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">核對檢查指令</summary>
        <CommandBlock command="git status" comment="檢查目前在 main、沒有待保存的改動" />
        <CommandBlock variant="output" command={outputs.status} />
      </details>
      <p>Your branch is up to date with 'origin/main'. 表示本機與<strong>目前電腦知道的</strong>雲端 main 一致；status 不會自行連網查新照片。剛才 push 成功，再到網頁核對才完整。</p>
      <p>回自己的 repo 頁按 F5 重新整理（Mac 可按 Cmd+R），應看到 README.md、day1.md、day2.md 與 .gitignore；點 README.md 能看到 L5 的標題。</p>
      <Screenshot id="L6-after-push" alt="第一次上傳後自己的 git-journal 顯示 Part 1 檔案列表" caption="你會看到空白設定頁變成檔案列表，README.md 顯示你在 L5 保存的標題。" />
      <Callout variant="success">完成訊號：本機 main 沒有待保存的改動，自己的 GitHub 頁面看得到原本的檔案。保留這個資料夾與 repo，L7 直接接著做。</Callout>
      <p>獨立判斷，不必另外操作：若改天把自己的「旅行清單」相簿第一次上雲，你會先核對哪個地址？如何證明上傳完成？先說出「自己的 repo 地址、終端機成功訊息、網頁新檔案」再繼續。</p>
    </Card>
    <Quiz questions={[
      { q: '診斷題：commit 完，網頁沒有新照片，最可能少了什麼？', options: ['push 上傳', '再建立一次本機相簿', '等一天'], answer: 0, explain: 'commit 只在電腦保存；push 才把已保存的照片送上雲端。' },
      { q: 'remote add 沒有訊息，接下來怎麼辦？', options: ['重複輸入三次', '用 remote -v 核對地址', '刪掉資料夾'], answer: 1, explain: '這條指令成功時沒有輸出；查地址比反覆新增可靠。' },
      { q: '診斷題：建 repo 時勾 Add README，看起來更完整，為什麼這次不行？', options: ['會收費', '雲端先有了本機沒有的照片，首次上傳會被拒', '檔名不能叫 README'], answer: 1, explain: '這次從 Part 1 的本機相簿接續，雲端必須留空，讓第一次 push 帶入原有紀錄。' },
      { q: '反向判斷：只是要檢查自己的旅行清單雲端地址，需要再 remote add 嗎？', options: ['需要，每次都新增', '不需要，remote -v 就能查', '直接輸入網站密碼'], answer: 1, explain: 'origin 是已記住地址的小名；查看地址不會新增，也不會上傳。' },
    ]} />
  </div>
);
