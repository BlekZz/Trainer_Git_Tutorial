import { useState, useEffect } from 'react';
import { SectionTitle, CommandBlock, Callout, NoOutputHint, Card, Quiz, FalseAlarm } from './Shared';
import { Square, CheckSquare } from 'lucide-react';
import { TUTORIAL_REPO } from '../config';

const PROGRESS_KEY = 'gtm-e2-fork-progress';
const StepCheck = ({ stepId, done, onToggle }) => (
  <button type="button" onClick={() => onToggle(stepId)} aria-pressed={done.has(stepId)} className="ml-auto flex items-center gap-2 text-sm text-indigo-700">
    {done.has(stepId) ? <CheckSquare size={16} /> : <Square size={16} />}
    {done.has(stepId) ? '已完成' : '標記完成'}
  </button>
);

export const Elective2Fork = () => {
  const [done, setDone] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]')); }
    catch { return new Set(); }
  });
  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done])); }, [done]);
  const toggleStep = (id) => setDone((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div className="space-y-6 animate-fade-in break-words">
      <header>
        <SectionTitle title="E2 參與別人的專案" subtitle="把別人的雲端相簿複製到自己名下，做好改動，再申請收回原相簿。" />
        <p className="text-sm text-slate-600">選修，不計分，學完作業再來；先完成 L6 的 GitHub 登入與 L7 的 PR 練習。</p>
      </header>
      <Card className="space-y-3">
        <h3 className="font-bold">這次多了誰的相簿？</h3>
        <p><strong>repo</strong> 是一個專案的檔案與保存紀錄，這裡把它想成相簿。<strong>Fork</strong> 是在 GitHub 上把別人的專案複製到自己帳號下，保留它與原專案的關係。<strong>upstream（上游）</strong> 是這份副本所來自的原專案。</p>
        <p><strong>clone</strong> 是把雲端相簿下載成電腦上的一份；Fork 發生在 GitHub，clone 才會在你的電腦產生資料夾。<strong>PR（Pull Request）</strong> 是請對方把你準備好的成果收進主相簿的申請單。</p>
        <p>我先 Fork，再 clone 自己那份，因為我能上傳到自己的雲端相簿。做好後，申請方向是「我的 Fork → 原專案」；與 L7 不同，這次是否收進原專案由維護者決定。</p>
        <p><strong>Collaborator（協作者）</strong> 是被專案擁有者邀請一起操作專案的人；能不能上傳仍要看獲得的權限。本練習不需要對方邀請你。</p>
        <details><summary className="cursor-pointer text-indigo-700">先想：Fork 完成，電腦就會多一個資料夾嗎？</summary><p>不會，還要 clone。能分清兩者再往下；不確定就回看上面的定義。</p></details>
      </Card>
      <Card className="space-y-3">
        <div className="flex gap-3"><h3 className="font-bold">1. 在 GitHub 建立自己的副本</h3><StepCheck stepId={1} done={done} onToggle={toggleStep} /></div>
        <p>打開 <a className="text-indigo-700 underline" href={`https://github.com/${TUTORIAL_REPO}`} target="_blank" rel="noreferrer">{TUTORIAL_REPO}</a>，點右上角 Fork，再選 Create a new fork（若直接進入建立表單，就接著填）。</p>
        <p>Owner 選自己的帳號，Repository name 保留 Trainer_Git_Tutorial，按 Create fork。等幾秒到一分鐘，頁面會進入你帳號下的副本；不要連續重按。</p>
        <p>核對網址是 github.com/你的帳號/Trainer_Git_Tutorial，並顯示 forked from {TUTORIAL_REPO}。若已有副本，就打開它；不用再建一份。</p>
      </Card>
      <Card className="space-y-3">
        <div className="flex gap-3"><h3 className="font-bold">2. 把自己的副本下載到電腦</h3><StepCheck stepId={2} done={done} onToggle={toggleStep} /></div>
        <p>用 VSCode 的 File → Open Folder 開啟你平常放練習的資料夾，選 Terminal → New Terminal。這次要下載另一個專案，不要在 git-journal 裡操作；已有 Trainer_Git_Tutorial 資料夾時，另選一個空資料夾再開始。</p>
        <p>把下面的「你的帳號」換成實際 GitHub 帳號。每個區塊只複製一條，$ 不用輸入；後面的「你的帳號名」也都要換成同一個帳號。</p>
        <FalseAlarm signal="Cloning into 'Trainer_Git_Tutorial'..." title="下載時會跑進度，不是錯誤">接著可能看到 remote:、Receiving objects:、Resolving deltas: 等行；依網速可能花幾秒到幾分鐘。等提示符回來，不要重按 Enter 或關視窗。</FalseAlarm>
        <CommandBlock command="git clone https://github.com/你的帳號/Trainer_Git_Tutorial.git" comment="下載自己剛 Fork 的相簿，保留原本的保存紀錄" />
        <p>成功後會出現 Trainer_Git_Tutorial 資料夾；若看到 Repository not found，先核對帳號與第 1 步是否完成。若說資料夾已存在且不是空的，另選空資料夾重做，不要刪掉原資料。</p>
        <CommandBlock command="cd Trainer_Git_Tutorial" comment="進入剛下載的專案" />
        <NoOutputHint>提示符的路徑會以 Trainer_Git_Tutorial 結尾。</NoOutputHint>
        <p><strong>origin</strong> 是 Git 記住的雲端相簿地址的小名；從自己的 Fork 下載，這個小名就應指向自己的 Fork。</p>
        <CommandBlock command="git remote -v" comment="先核對上傳目的地，避免把改動送錯相簿" />
        <CommandBlock variant="output" command={'origin  https://github.com/你的帳號/Trainer_Git_Tutorial.git (fetch)\norigin  https://github.com/你的帳號/Trainer_Git_Tutorial.git (push)'} />
        <p>兩行都應是你自己的帳號。若不是，先確認 Fork 存在，再照急診室修正地址。接著用 File → Open Folder 開啟剛下載的 Trainer_Git_Tutorial，再開終端機，確認路徑仍是這個專案。</p>
      </Card>
      <Card className="space-y-3">
        <div className="flex gap-3"><h3 className="font-bold">3. 在分支相簿寫一份筆記</h3><StepCheck stepId={3} done={done} onToggle={toggleStep} /></div>
        <p><strong>branch（分支）</strong> 是從某張照片開始另開一本相簿，讓新內容先不影響 main。這裡用你的帳號替分支命名。</p>
        <CommandBlock command="git switch -c feat/你的帳號名" comment="另開分支保存這次筆記" />
        <CommandBlock variant="output" command={"Switched to a new branch 'feat/你的帳號名'"} />
        <p>在 VSCode 左側 learner-commits 資料夾上按右鍵 → New File，輸入「你的帳號名.md」，例如 amy-notes.md。若同名檔已存在，先停下檢查是否做過本練習，不要覆蓋別人的筆記。</p>
        <p>編輯區寫一句這次學到的事，例如「我學會了先確認 PR 要送到誰的相簿。」再按 Enter 留行尾換行，按 Ctrl+S（Mac：Cmd+S）；分頁的未儲存圓點會消失。</p>
        <p><strong>暫存區</strong> 是挑選下一次存檔要包含哪些改動的地方，也就是拍照台；<strong>commit</strong> 是保存一個版本，像拍一張附說明的照片。</p>
        <FalseAlarm signal="LF will be replaced by CRLF" title="Windows 可能提醒換行格式">出現這段表示換行格式提醒，可以繼續；沒有訊息也正常。</FalseAlarm>
        <CommandBlock command="git add learner-commits/你的帳號名.md" comment="只挑自己的筆記放上拍照台，檔名要與剛建的檔案相同" />
        <NoOutputHint />
        <FalseAlarm signal="~" title="下一條保留 -m，避免進入 Vim">若漏掉 -m 而看到滿是 ~ 的編輯器，按 Esc、輸入 :q! 再 Enter 離開；:wq 是保存訊息並離開。先核對 status 是否仍有待存內容，再決定是否重做。</FalseAlarm>
        <CommandBlock command={'git commit -m "新增我的學習筆記"'} comment="把挑好的內容保存成一張照片" />
        <CommandBlock variant="output" command={'[feat/你的帳號名 1234567] 新增我的學習筆記\n 1 file changed, 1 insertion(+)\n create mode 100644 learner-commits/你的帳號名.md'} />
        <p>照片編號與行數可能不同；應看到自己的分支、說明與檔案摘要。</p>
      </Card>
      <Card className="space-y-3">
        <div className="flex gap-3"><h3 className="font-bold">4. 上傳到自己的 Fork</h3><StepCheck stepId={4} done={done} onToggle={toggleStep} /></div>
        <p><strong>push</strong> 是把保存好的照片上傳到雲端。這一步傳到自己的 Fork，還不會改到原專案。</p>
        <Callout title="先核對權限與登入">若 origin 指向別人的相簿，又沒有寫入權限，上傳可能被拒絕並出現 403；先回第 2 步核對。若要求登入，照 L6 完成登入，不要輸入 GitHub 網站密碼；其他錯誤到急診室對照。</Callout>
        <FalseAlarm signal="Enumerating objects:" title="上傳時的進度訊息">Counting、Writing、remote: 開頭的行都可能出現。小筆記通常幾秒到一分鐘；等提示符回來，不要重按 Enter。</FalseAlarm>
        <CommandBlock command="git push -u origin feat/你的帳號名" comment="上傳這個分支，-u 記住以後上傳的位置" />
        <p>第一次成功會列出 new branch 和你上傳的分支名稱，也可能附開 PR 的網址。到自己的 Fork 重新整理，分支選單應找得到它；若出現 rejected 或 fatal，先處理錯誤再繼續。</p>
      </Card>
      <Card className="space-y-3">
        <div className="flex gap-3"><h3 className="font-bold">5. 申請把筆記收進原專案</h3><StepCheck stepId={5} done={done} onToggle={toggleStep} /></div>
        <p>在自己的 Fork 點 Compare &amp; pull request；若提示已消失，從原專案的 Pull requests → New pull request → compare across forks 進入比較頁。</p>
        <p><strong>base repository</strong> 是要收下成果的專案，選 {TUTORIAL_REPO}；<strong>base</strong> 是收下成果的分支，選 main。<strong>head repository</strong> 是提供成果的專案，選你的 Fork；<strong>compare</strong> 是提供成果的分支，選 feat/你的帳號名。</p>
        <details><summary className="cursor-pointer text-indigo-700">一起補完：base 是原專案，那 head 應該是誰的？</summary><p>你自己的 Fork。下方差異應只有你的筆記；若帶出其他人的改動，先停下核對兩邊選項。</p></details>
        <p>按 Create pull request 進入表單，標題寫「新增我的學習筆記」，描述說明改了哪個檔案、學到什麼，再按 Create pull request。你會進入帶編號的 PR 頁；顯示 Open 代表已送出，還沒收進原相簿。</p>
        <p><strong>Code Review</strong> 是請人檢查這次改動。<strong>Request changes</strong> 表示希望你調整內容；照留言在同一分支修改，重做第 3 步的 add、commit 與第 4 步的 push，原 PR 會更新，不用重開。</p>
        <p><strong>Approve</strong> 表示審查者同意內容；<strong>Merge</strong> 才是把成果收進原相簿。若被 Close，表示申請關閉但未必有合併，以 PR 的 Merged 狀態判斷。維護者可能不接受或尚未處理，不能保證時間或結果。</p>
      </Card>
      <Card className="space-y-3">
        <div className="flex gap-3"><h3 className="font-bold">6. 合併後，把新照片帶回來</h3><StepCheck stepId={6} done={done} onToggle={toggleStep} /></div>
        <p>只有 PR 已顯示 Merged 才做這步。先打開自己的 Fork，選 main，按 Sync fork → Update branch；成功後頁面會顯示已跟上原專案。若本來就同步，無須更新；若提示有衝突或要丟掉改動，先停下請講師協助。</p>
        <p><strong>pull</strong> 是下載雲端的新照片並整理進目前的本機相簿。原專案合併不會自動更新你的 Fork，所以不能省略上面的 Sync fork。</p>
        <p>先確認自己的筆記已 commit 並 push，沒有未保存的改動，再切回 main。</p>
        <CommandBlock command="git switch main" comment="回到主相簿再下載更新" />
        <CommandBlock variant="output" command={"Switched to branch 'main'"} />
        <p>可能另附同步狀態；若說切換會覆蓋改動，先按 L2 保存，不要強制切換。</p>
        <FalseAlarm signal="remote: Enumerating objects:" title="下載會顯示進度">通常等幾秒到一分鐘，不要重按 Enter。若進入滿是 ~ 的 Vim，按 Esc、輸入 :q! 再 Enter 離開並檢查狀態；:wq 是保存合併說明後離開。若有 CONFLICT，按 L5 處理。</FalseAlarm>
        <CommandBlock command="git pull" comment="把已同步到 Fork 的照片下載回本機 main" />
        <p>有更新時會列出下載與檔案變更摘要；已同步時顯示 Already up to date.。打開 learner-commits，核對 main 裡已包含自己的筆記，再標記完成。</p>
      </Card>
      <Quiz questions={[
        { q: '已 clone 公開專案，就一定能上傳到原專案嗎？', options: ['可以，下載就有寫入權限', '不一定，能閱讀不代表能上傳', '只要分支改名就可以'], answer: 1, explain: 'clone 不會授予寫入權限；這次透過自己的 Fork 上傳，再用 PR 請維護者合併。' },
        { q: '原專案已合併，自己的 Fork 還沒更新，直接 pull 會拿到新照片嗎？', options: ['會，所有相簿自動同步', '不會，先 Sync fork 再回本機 main 下載', '只能刪掉重練'], answer: 1, explain: '本機 origin 指向自己的 Fork；先把原專案的新照片同步到 Fork，才能從它下載。' },
      ]} />
      <Callout title="離開範例，自己核對一次">不看步驟，說出「原專案、自己的 Fork、本機」三份相簿各在哪裡，再到 PR 頁找出誰提供、誰接收成果。若換成另一個專案，你也應先讀它的貢獻規則，不能直接送練習筆記。</Callout>
    </div>
  );
};
