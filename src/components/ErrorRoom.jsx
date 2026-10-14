import { Card, SectionTitle, Callout, CommandBlock, NoOutputHint, FalseAlarm } from './Shared';

const ErrorCard = ({ error, translation, children }) => (
  <Card className="space-y-3">
    <pre className="font-mono text-sm text-red-700 bg-red-50 rounded p-3 whitespace-pre-wrap break-words">{error}</pre>
    <p className="text-slate-700 font-medium">{translation}</p>
    <div className="space-y-3">{children}</div>
  </Card>
);

const TransferHint = () => (
  <Callout title="等待傳輸完成">通常等幾秒到一分鐘，期間可能看到 remote:、Counting objects:、Writing objects: 等進度；不要重按 Enter。成功會列出更新摘要，沒有新內容時會說已同步；若看到 rejected、fatal 或 CONFLICT，先處理該錯誤。</Callout>
);

export const ErrorRoom = () => (
  <div className="space-y-6">
    <SectionTitle title="🚑 錯誤訊息急診室" subtitle="用畫面上的原文找原因，再選對應的解法。" />
    <Callout title="怎麼查">按 Ctrl+F（Mac：Cmd+F），貼上錯誤中的幾個英文單字搜尋。只做符合你情況的那張卡，不要整頁依序執行；$ 不用輸入。所有 &lt;佔位文字&gt; 都要整個換掉，角括號不要打進去。</Callout>

    <ErrorCard error={"The term 'git' is not recognized\n'git' is not recognized as an internal or external command\ncommand not found: git"} translation="電腦目前找不到 Git，可能是還沒安裝，或安裝後終端機尚未重開。">
      <p>先把 VSCode 與終端機完全關閉再重開；仍找不到時，回 L0 確認 Git 安裝。上方是不同終端機可能顯示的原文片段，不會一次出現三種。</p>
      <CommandBlock command="git --version" comment="確認新開的終端機找得到 Git" />
      <CommandBlock variant="output" command="git version 2.x.x" />
      <p>版本號依安裝版本不同；看到版本號再重試原本的操作。</p>
    </ErrorCard>

    <ErrorCard error={'~\n~\n".git/COMMIT_EDITMSG"'} translation="你進入了 Vim 文字編輯器，Git 正在等你寫存檔說明。">
      <p>若已寫好說明，按 Esc → 輸入 :wq → Enter，保存並離開；不想編輯則按 Esc → 輸入 :q! → Enter，放棄本次文字編輯。回終端機後先確認狀態；放棄編輯不等於保證取消 Git 的操作，因為原本可能已有預填說明。</p>
      <CommandBlock command="git status" comment="離開編輯器後，先看 Git 是否還在等你完成存檔或合併" />
      <CommandBlock variant="output" command={'On branch main\nnothing to commit, working tree clean'} />
      <p>上方是已完成存檔的例子；分支名可能不同。</p>
      <p>會列出分支與檔案狀態；若仍有待存內容，回 L2 或 L5 使用帶 -m 的存檔指令。若書桌已乾淨，先核對最新存檔再決定是否重做。</p>
    </ErrorCard>

    <ErrorCard error="fatal: Need to specify how to reconcile divergent branches." translation="本機和雲端相簿各有新照片，Git 要你先選擇如何整理在一起。">
      <CommandBlock command="git config --global pull.rebase false" comment="依本課做法，用合併保留兩邊紀錄" />
      <NoOutputHint />
      <FalseAlarm signal="~" title="下載後可能打開合併說明">若出現 Vim，按 Esc → :wq → Enter 接受說明並離開；:q! 是放棄文字編輯。離開後看 status 確認，不要直接再跑一次。</FalseAlarm>
      <TransferHint />
      <CommandBlock command="git pull" comment="重新下載並合併雲端改動" />
      <p>完成會列出更新或合併摘要；若出現 CONFLICT，照下方衝突卡處理。</p>
    </ErrorCard>

    <ErrorCard error="*** Please tell me who you are." translation="Git 還不知道照片旁要記錄哪位作者的名字與信箱。">
      <p>把引號內的範例換成自己的資料，引號保留；這不是登入 GitHub。完整核對方法見 L0。</p>
      <CommandBlock command={'git config --global user.name "你的名字"'} comment="設定作者名字" />
      <NoOutputHint />
      <CommandBlock command={'git config --global user.email "you@example.com"'} comment="把範例換成自己的信箱" />
      <NoOutputHint />
      <p>設定後重試原本的 commit，成功會列出分支、照片編號與說明。</p>
    </ErrorCard>

    <ErrorCard error="fatal: not a git repository (or any of the parent directories): .git" translation="目前這個資料夾找不到 Git 相簿紀錄，可能只是開錯位置。">
      <p>用 VSCode 的 File → Open Folder 選原本的 git-journal 或作業專案，再用 Terminal → New Terminal 開啟終端機；路徑應以該專案名稱結尾。不要為了消除錯誤就隨便建立新相簿。</p>
      <CommandBlock command="git status" comment="核對這裡是否有原本的 Git 紀錄" />
      <CommandBlock variant="output" command={'On branch main\nnothing to commit, working tree clean'} />
      <p>應顯示 On branch 與檔案狀態；若仍是同樣錯誤，回 L2 檢查是否在這個資料夾做過 init，或回 L8 檢查 clone 是否完成。</p>
    </ErrorCard>

    <ErrorCard error="You are in 'detached HEAD' state" translation="你正在看某張照片，沒有跟著一個分支相簿的名稱。">
      <p>HEAD 是 Git 標記目前版本的位置。若在這裡改過內容或新增過 commit，先到 E3 替成果建立分支並保存，再回 main；若只是查看舊版本，直接做下面這條。</p>
      <CommandBlock command="git switch main" comment="回到 main 相簿" />
      <CommandBlock variant="output" command={"Switched to branch 'main'"} />
      <p>可能另附同步狀態；若拒絕切換，先看下一張卡，不要強制切換。</p>
    </ErrorCard>

    <ErrorCard error={'error: Your local changes to the following files would be overwritten by checkout:\n\tREADME.md\nPlease commit your changes or stash them before you switch branches.\nAborting'} translation="書桌上還有改動，切到另一本相簿會蓋掉它們，所以 Git 先擋下來。">
      <p>若要保留，先依下面兩步保存，再重試切換；只做到一半可看 E3 的 stash。檔名請依錯誤列出的實際檔案替換，例如 README.md。</p>
      <FalseAlarm signal="LF will be replaced by CRLF" title="Windows 可能有換行提醒">這段是換行格式提醒，可以繼續；沒有訊息也正常。</FalseAlarm>
      <CommandBlock command="git add <檔名>" comment="把要保留的改動放上拍照台，例如 git add README.md" />
      <NoOutputHint />
      <CommandBlock command={'git commit -m "保存目前的改動"'} comment="保存後才切換相簿" />
      <CommandBlock variant="output" command={'[main 1a2b3c4] 保存目前的改動\n 1 file changed, 1 insertion(+), 1 deletion(-)'} />
      <p>這是修改一個檔案的例子；分支名、編號與行數依你的改動不同。</p>
      <p>成功時會列出分支、照片編號、說明與檔案摘要；若說沒有可存內容，先確認 add 的檔名是否正確。不要為了切換而丟掉還要保留的文字。</p>
    </ErrorCard>

    <ErrorCard error="error: the branch 'feat/day2' is not fully merged" translation="分支還有照片沒收進目前或指定的目標相簿，Git 不願直接刪掉它的名稱。">
      <p>不要改用大寫 -D 強制刪除。回 L4 核對目前在 main、書桌乾淨，再合併那個分支；若發生衝突先照 L5 處理。確認成果已在 main 後，再重試小寫 -d 的刪分支步驟。</p>
    </ErrorCard>

    <ErrorCard error={'CONFLICT (content): Merge conflict in README.md\nAutomatic merge failed; fix conflicts and then commit the result.'} translation="兩本相簿對同一處保存了不同內容，Git 需要你決定最後保留什麼。">
      <p>打開訊息列出的檔案，選好內容，刪掉 &lt;&lt;&lt;&lt;&lt;&lt;&lt;、=======、&gt;&gt;&gt;&gt;&gt;&gt;&gt; 標記，再儲存；每個衝突檔案都要處理。完整示範在 L5，遠端情況見 L8。</p>
      <FalseAlarm signal="LF will be replaced by CRLF" title="挑選檔案時可能有換行提醒">這不是新的衝突；檢查沒有其他錯誤後可繼續。</FalseAlarm>
      <CommandBlock command="git add <檔名>" comment="逐個挑選已解決的檔案，例如 git add README.md" />
      <NoOutputHint />
      <CommandBlock command={'git commit -m "解決合併衝突"'} comment="所有衝突都處理完後，保存合併結果" />
      <CommandBlock variant="output" command="[main 1a2b3c4] 解決合併衝突" />
      <p>分支名與照片編號依實際紀錄不同。</p>
      <p>成功會列出分支、照片編號與這句說明；若仍提示 unmerged，還有檔案未解決或未 add，先核對訊息列出的檔名。</p>
    </ErrorCard>

    <ErrorCard error={'! [rejected] main -> main (fetch first)\nUpdates were rejected because the remote contains work that you do not have locally'} translation="雲端相簿有本機還沒拿到的照片，Git 要你先整合再上傳。">
      <p>先保存本機改動，再下載；這不只會發生在別人改檔，你自己從 GitHub 網頁改檔也會遇到。</p>
      <FalseAlarm signal="~" title="合併時可能打開說明編輯器">若進入 Vim，按 Esc → :wq → Enter 保存說明離開；:q! 是放棄編輯。回終端機先看 status；若出現衝突，先完成上方衝突卡。</FalseAlarm>
      <TransferHint />
      <CommandBlock command="git pull" comment="先把雲端新照片下載並合併" />
      <p>完成會列出更新摘要；有衝突時必須先解完並 commit，不能立刻執行下一條。</p>
      <TransferHint />
      <CommandBlock command="git push" comment="整合完成後，再嘗試上傳" />
      <p>成功會列出分支更新，若期間雲端又有更新仍可能被拒絕；不要用強制上傳覆蓋它。</p>
    </ErrorCard>

    <ErrorCard error="warning: LF will be replaced by CRLF" translation="Git 正在提醒 Windows 換行格式可能轉換，這段本身不是操作失敗。">
      <p>沒有其他 error 或 fatal 時，可繼續下一步；不能只看到 warning 就判定整條指令一定成功。</p>
    </ErrorCard>

    <ErrorCard error={':\n(END)'} translation="你正在分頁看較長的內容，畫面停在等你翻頁，沒有當機。">
      <p>這是 git log、git diff 或 git branch 可能出現的畫面；按 q 離開，終端機提示符會回來。想繼續看可用上下方向鍵。</p>
    </ErrorCard>

    <ErrorCard error={"remote: Support for password authentication was removed\nfatal: Authentication failed for 'https://...'\nPassword for 'https://github.com':"} translation="GitHub 需要有效的登入授權，終端機裡不能用網站登入密碼取代它。">
      <p>這些是同類登入問題的原文片段。若正在等密碼，按 Ctrl+C 取消，回 L6 按登入步驟重新授權；會出現方向鍵選單並開啟瀏覽器，完成後再重試剛才的操作。</p>
    </ErrorCard>

    <ErrorCard error={'git@github.com: Permission denied (publickey).\nfatal: Could not read from remote repository.'} translation="目前使用的 SSH 連線需要電腦金鑰，但本課練習使用 HTTPS 網址登入。">
      <p>SSH 是用電腦金鑰驗證的連線方式；HTTPS 是本課搭配登入授權使用的網址方式。先查 origin，也就是 Git 記住的雲端地址。</p>
      <CommandBlock command="git remote -v" comment="查看 origin 是否以 git@github.com: 開頭" />
      <CommandBlock variant="output" command={'origin  git@github.com:你的帳號/git-journal.git (fetch)\norigin  git@github.com:你的帳號/git-journal.git (push)'} />
      <p>若符合這個情況，在 GitHub 開啟你真正要同步的專案，從 Code → HTTPS 複製網址，再替換下一條的整個佔位文字；例如 https://github.com/amy/git-journal.git，別照抄範例帳號。</p>
      <CommandBlock command="git remote set-url origin <你複製的HTTPS網址>" comment="保留同一個專案，只改連線網址" />
      <NoOutputHint />
      <p>再用上面的 remote -v 核對兩行都變成正確的 https:// 網址，再試原本的操作。若失敗的是 clone，尚無專案可改設定，直接用正確的 HTTPS 網址重試 clone。</p>
    </ErrorCard>

    <ErrorCard error={'remote: Permission to owner/repo.git denied to username.\nThe requested URL returned error: 403'} translation="目前登入的帳號沒有權限把照片上傳到這個雲端相簿。">
      <p>先核對 L6 登入的帳號，以及 origin 是否指向自己真正要上傳的專案。若在 E2 參與別人的專案，先 Fork 並 clone 自己的副本，再從副本提出 PR；單純建立分支不會增加寫入權限。</p>
    </ErrorCard>

    <ErrorCard error={"remote: Repository not found.\nfatal: repository 'https://github.com/...' not found"} translation="Git 無法存取這個專案，可能是網址錯了、還沒建立，或目前帳號沒有閱讀權限。">
      <p>在瀏覽器用同一個帳號打開該網址，確認專案存在且能閱讀；核對網址中的帳號、專案名稱，再依 L6 核對終端機登入。E2 要先完成 Fork，自己的副本網址才會存在。</p>
      <CommandBlock command="git remote -v" comment="已有本機相簿時，檢查記住的地址；clone 失敗則直接核對貼上的網址" />
      <CommandBlock variant="output" command={'origin  https://github.com/你的帳號/git-journal.git (fetch)\norigin  https://github.com/你的帳號/git-journal.git (push)'} />
      <p>專案名依你正在操作的相簿不同；作業應是 git-homework，E2 應是 Trainer_Git_Tutorial。若地址錯誤，依上一張 SSH 卡的 set-url 步驟改成正確 HTTPS 網址。</p>
    </ErrorCard>

    <ErrorCard error="error: src refspec main does not match any" translation="Git 找不到可以上傳的 main，可能還沒存過第一張照片，也可能分支名字不同。">
      <CommandBlock command="git status" comment="先分辨缺少存檔，還是名稱不同" />
      <p>情況一：還沒有任何照片時，輸出包含這兩段：</p>
      <CommandBlock variant="output" command={'On branch main\n\nNo commits yet'} />
      <p>情況二：已有照片，但目前名稱是 master；乾淨的相簿會像這樣：</p>
      <CommandBlock variant="output" command={'On branch master\nnothing to commit, working tree clean'} />
      <p>看到 No commits yet：回 L2 完成第一次 add 與 commit，再上傳。看到 On branch master 且已有存檔：可以做下一條把目前分支改名；若是其他分支，先按 L4 核對，不要直接改名。</p>
      <CommandBlock command="git branch -m main" comment="只在確認目前是要更名的主分支時使用" />
      <NoOutputHint />
      <p>若提示 main 已存在，停下核對，不要用強制更名覆蓋它。成功後回 L6 重試上傳；L0 的預設分支設定只影響之後新建的相簿。</p>
    </ErrorCard>
  </div>
);

export default ErrorRoom;
