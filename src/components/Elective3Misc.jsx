import { SectionTitle, Card, CommandBlock, Callout, FalseAlarm } from './Shared';

export const Elective3Misc = () => (
  <div className="space-y-6 animate-fade-in">
    <header>
      <SectionTitle title="E3 暫放改動、回到分支、修改存檔說明" subtitle="遇到三種整理需求時，選出適合的指令並核對結果。" />
      <p className="text-sm text-slate-600">選修，不計分，學完作業再來；操作時使用練習用的 git-journal。</p>
    </header>
    <p>以下三節是各自獨立的情況，不要從頭連續執行。每次只複製一條指令，$ 不用輸入；遇到不符合描述的訊息，先到急診室對照。</p>
    <Card className="space-y-3">
      <h3 className="font-bold">1. 還沒拍好照片，先把改動暫放：stash</h3>
      <p><strong>stash</strong> 是把尚未保存成版本的改動暫時收起來，稍後再取回；它不會在分支相簿裡新增照片。適合內容只改到一半、又需要先切換分支的時候。</p>
      <p>先在練習相簿中修改一個已被 Git 記錄的檔案，例如 README.md，按 Ctrl+S（Mac：Cmd+S）儲存，但先不要 commit。<strong>commit</strong> 是保存一個版本，像替這次內容拍照。</p>
      <Callout variant="warning" title="先確認改的是既有檔案">這條 stash 預設不收新建、尚未被 Git 記錄的檔案，也不收被忽略的檔案。若要保留新檔，先按 L2 完成一次存檔；不要以為 stash 會收走整張書桌。</Callout>
      <CommandBlock command="git stash" comment="暫放既有檔案的未完成改動，讓你能先處理別的事" />
      <p>有改動可收時，終端機會說已保存工作資料夾與暫存區的狀態，既有檔案會回到上次 commit 的內容。只有確認這次有新增暫放紀錄，才做下面的 pop；若說沒有可保存的改動，先停下檢查是否改了既有檔案並儲存，不要 pop，否則可能取回以前留下的另一筆紀錄。</p>
      <p><strong>stash pop</strong> 是取回最近一次暫放的改動，成功套用後移除那筆暫放紀錄。這次先留在原分支、不改其他內容，直接取回剛才的文字。</p>
      <CommandBlock command="git stash pop" comment="把剛才暫放的改動放回書桌" />
      <p>成功時會列出回到工作資料夾的改動，並說明已移除那筆暫放紀錄；打開 README.md，應看到剛才寫的文字。它仍未 commit。若沒有暫放紀錄可取，Git 會告訴你沒有找到紀錄。</p>
      <Callout title="取回時出現 CONFLICT">若你在別的內容上取回，可能發生衝突；Git 會保留暫放紀錄。不要重複 pop，先依 L5 或急診室處理衝突，再確認文字已保留。</Callout>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">2. 正在看舊照片：detached HEAD</h3>
      <p><strong>HEAD</strong> 是 Git 用來標示「你現在看到哪個版本」的位置；<strong>detached HEAD</strong> 表示你直接停在某張照片上，沒有跟著一個分支名稱。這通常發生在你切換到某個舊版本時。</p>
      <FalseAlarm signal={"You are in 'detached HEAD' state"} title="看舊照片不代表弄壞相簿">若你只是查看舊版本、沒有改檔或新增 commit，可以用下面的 switch 回到 main。這節不用刻意進入此狀態。</FalseAlarm>
      <details className="space-y-3"><summary className="cursor-pointer text-indigo-700">已經在這裡改了內容或新增照片，想保留？先做這一步</summary>
        <p>先替目前位置開一本分支相簿，讓成果有名稱可找；若有未存的改動，再照 L2 保存。不要直接回 main。</p>
        <CommandBlock command="git switch -c rescue-notes" comment="用尚未使用過的名稱保留現在的位置" />
        <CommandBlock variant="output" command={"Switched to a new branch 'rescue-notes'"} />
        <p>若名稱已存在，換一個未用過的名稱再試；不要刪掉既有分支。保存完成後才能繼續。</p>
      </details>
      <CommandBlock command="git switch main" comment="回到 main 相簿目前的版本" />
      <CommandBlock variant="output" command={"Switched to branch 'main'"} />
      <p>也可能附帶與雲端的同步狀態；若已在 main，會說已經在這個分支。若 Git 說改動會被覆蓋而拒絕切換，先照 L2 保存或照本頁第一節暫放，不要強制切換。</p>
    </Card>
    <Card className="space-y-3">
      <h3 className="font-bold">3. 只改最後一張照片的說明：amend</h3>
      <p><strong>amend</strong> 是以新的版本取代最後一次存檔；即使只改說明，照片編號也會改變。這節只處理尚未 push 的最後一次 commit，push 就是上傳到雲端。</p>
      <Callout variant="warning" title="只在尚未上傳，而且拍照台是空的時候做">若最後一次存檔已 push，先不要改它。若拍照台有其他改動，amend 會連那些內容一起收進去；先用下方 status 確認。還沒有任何 commit 時也不能 amend。</Callout>
      <CommandBlock command="git status" comment="確認沒有已挑選、會被意外收進照片的改動" />
      <p>會列出目前分支與檔案狀態；看到 nothing to commit, working tree clean 表示書桌與拍照台都乾淨。若看到 Changes to be committed，先停下，按 L3 把不該收進去的改動移出暫存區；這不會丟掉檔案內容。</p>
      <FalseAlarm signal="~" title="保留 -m，避免進入文字編輯器">若漏掉 -m 而進入 Vim，按 Esc、輸入 :q! 再 Enter 離開；:wq 是保存訊息後離開。離開後先核對最後一次存檔的說明，不要直接重做。</FalseAlarm>
      <CommandBlock command={'git commit --amend -m "新訊息"'} comment="把引號內換成你要的說明，引號保留" />
      <p>成功時會印出分支名、新的照片編號與新說明，後面可能仍列出原本那次存檔的檔案摘要；不代表又改了一次檔案。</p>
      <CommandBlock command="git --no-pager log -1 --format=%s" comment="只看最後一次存檔的說明，不進入分頁畫面" />
      <p>會印出你剛填的新說明一行，例如「新訊息」。若出現錯誤或仍是舊說明，先檢查上一條指令，不要接著上傳。</p>
    </Card>
    <Callout title="不看指令，先選方法">
      <p>改到一半要暫放、只看完舊照片要回 main、已上傳的照片想改說明：三種情況各能用哪一招？</p>
      <details><summary className="cursor-pointer">核對答案</summary><p>既有檔案的改動可用 stash 暫放；只查看舊版本可 switch main；已上傳的照片不照本節做 amend。若答不出來，先回看對應節再操作。</p></details>
      <p>換你練：在另一個已被 Git 記錄的練習檔案加一句話，自己暫放再取回，核對文字相同；這次不用照抄 README.md 範例。</p>
    </Callout>
  </div>
);
