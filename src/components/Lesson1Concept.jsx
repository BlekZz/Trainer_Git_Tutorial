import { SectionTitle, Card, Callout, Quiz } from './Shared';
import { FlowDiagram } from './Diagrams';
import { FileText, Camera, Images } from 'lucide-react';

export const Lesson1Concept = () => (
  <div className="min-w-0 space-y-6 animate-fade-in break-words">
    <header><SectionTitle title="L1 觀念" subtitle="用相簿說明 Git 怎麼保存檔案，以及它和 GitHub 的差別。" /><p className="text-sm text-slate-600">先準備：完成 L0 的 Git 與 VSCode 安裝。</p></header>

    <Card className="space-y-4 bg-indigo-50 border-indigo-100">
      <h3 className="font-bold text-indigo-900">我先示範：替學習日誌拍一張照片</h3>
      <p><strong>Git</strong> 是在自己電腦記錄檔案不同版本的工具，像替書桌上的文件拍照、收進相簿。</p>
      <p><strong>GitHub</strong> 是存放與分享這些紀錄的網站，像雲端相簿；L1–L5 全程只用 Git，不需要 GitHub 帳號或網路。</p>
      <p><strong>repo（repository，儲存庫）</strong> 是一個連同修改紀錄一起保存的專案資料夾，像文件與它的相簿放在一起。</p>
      <p><strong>暫存區</strong> 是挑出這一次要保存哪些改動的地方，像拍照前擺好文件的拍照台。</p>
      <p><strong>commit</strong> 是附上一句說明、保存一個版本的動作與紀錄，像按快門後相簿多了一張照片。</p>
      <p>我先在書桌寫日誌，只把這次想保存的內容擺上拍照台，再按快門。只在編輯器按儲存，還沒有替 Git 相簿添照片。</p>
      <FlowDiagram
        label="書桌、拍照台、相簿三個區域：書桌的改動經 add 挑選到拍照台，再經 commit 保存進相簿，用 log 翻相簿"
        steps={[
          { icon: FileText, tag: '①', title: '書桌', lines: ['工作資料夾：正在改的檔案'] },
          { icon: Camera, tag: '②', title: '拍照台', lines: ['暫存區：這次要拍的內容'], tone: 'accent' },
          { icon: Images, tag: '③', title: '相簿', lines: ['存檔紀錄：已保存的版本', '翻相簿（log）'], tone: 'success' },
        ]}
        links={['挑選改動（add）', '按快門（commit）']}
        caption="這是概念圖，不是要輸入的指令。拍照台保存的是挑選當下的內容，後來又修改就要重新挑選。"
      />
      <p><strong>branch（分支）</strong> 是從某張照片開始另開一本相簿，讓一組新想法有自己的後續紀錄。</p>
      <p><strong>merge（合併）</strong> 是把另一本相簿的成果收進目前這本相簿。</p>
      <p>我們把主相簿叫做 <strong>main</strong>。相簿只是比喻，電腦不會真的多出一本紙相簿或複製整個資料夾。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>只在 VSCode 按儲存，相簿就多一張照片了嗎？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>還沒有。儲存只更新書桌上的檔案，還要挑選、按快門。若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <Card className="space-y-3">
      <h3 className="font-bold">一起想：我想保存日誌，但還不想保存草稿</h3>
      <p>書桌有「日誌」與「草稿」。我先挑日誌放上拍照台；接下來請你補完最後一步。</p>
      <details><summary className="cursor-pointer text-indigo-700">想好再展開</summary><p>按快門，附上「新增日誌」的說明。草稿繼續留在書桌，不會因為這次拍照就一起存入相簿。</p></details>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>換成旅行清單與還沒寫完的心得，只保存清單時要挑哪一份？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>只挑旅行清單，再按快門。這與檔名無關，是在選這次要保存哪些改動。若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <SectionTitle kicker="換你了" title="在自己的電腦準備書桌" />
    <Card className="space-y-3">
      <p>Windows 開啟檔案總管，到你找得到的位置（例如「文件」）。在空白處按右鍵 → 新增 → 資料夾，取名 <strong>git-journal</strong>。Mac 在 Finder 的「文件」選「檔案 → 新增檔案夾」。完成後會看到這個空資料夾；L2 會沿用它。</p>
      <p>開啟 VSCode → File（檔案）→ Open Folder（開啟資料夾），選剛建立的 git-journal。若詢問是否信任，確認是自己剛建立的空資料夾再信任。左側檔案總管會顯示 GIT-JOURNAL，裡面暫時沒有檔案。</p>
      <p>選 Terminal（終端機）→ New Terminal（新增終端機）。終端機是讓你用文字請電腦做事的面板，會出現在下方。Windows 通常看到 PS 開頭與 git-journal 結尾的路徑，Mac 提示符可能是 % 或 $。</p>
      <p>教材指令前的 <strong>$ 不用打進去</strong>。這一課先認位置，不輸入 Git 指令；L2 才開始拍第一張照片。</p>
      <p className="font-bold text-indigo-800">自己核對：指出左側的資料夾、下方的終端機，再口頭說出「書桌 → 拍照台 → 相簿」各做什麼。</p>
    </Card>
    <SectionTitle title="為什麼要留存檔紀錄？" subtitle="不只是備份：相簿讓你回得去、看得懂、交得出去。" />
    <Card className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
          <p className="font-bold mb-1">沒有相簿：只剩檔名</p>
          <p className="font-mono text-sm break-all">報告_v2.docx<br />報告_v3_改.docx<br />報告_最終版.docx<br />報告_最終版_真的最終.docx</p>
          <p className="text-sm mt-2 text-slate-600">哪一份是交出去的？v3 改了什麼？為什麼又改？只能靠記憶。</p>
        </div>
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="font-bold mb-1">有相簿：每張照片都有日期與說明（理想寫法示意）</p>
          <p className="font-mono text-sm break-all">10-21 解決網頁與電腦版標題衝突<br />10-20 新增 Day 3 筆記<br />10-17 標題改成學習日誌<br />10-14 新增日誌標題</p>
          <p className="text-sm mt-2 text-slate-600">只有一個檔案，但每個版本都留著，而且看得出順序與原因。</p>
        </div>
      </div>
      <ol className="list-decimal pl-5 space-y-2">
        <li><strong>回得去：</strong>改壞了，可以翻回任何一張照片，不必另存一堆副本。L3 會練。</li>
        <li><strong>看得懂：</strong>一個月後的你，翻相簿就知道專案怎麼走到今天、每一步為什麼這樣做。</li>
        <li><strong>交得出去：</strong>接手的同事、或是你請來幫忙的 AI，讀這串紀錄就能在幾分鐘內掌握進度與決策，不用找你一一解釋。現在許多 AI 工具會直接讀 Git 紀錄，回答「這個專案做到哪了？」這類問題。即使是完全沒參與過的人，也能靠 AI 把來龍去脈理清楚。</li>
      </ol>
      <p>第 3 點有個前提：<strong>照片說明要寫清楚</strong>。只寫「更新」「修改」，人和 AI 都只能猜。L3 教你怎麼寫，L9 讓 AI 實際讀你自己的日誌。</p>
    </Card>
    <Callout title="先停一下，說出答案再繼續"><p>新同事想知道這個專案上週做了哪些決定，在有 Git 紀錄的情況下，最快的方法是什麼？</p><details className="mt-2"><summary className="cursor-pointer">核對想法</summary><p>翻存檔紀錄，或把紀錄交給 AI 整理成摘要。前提是每張照片的說明寫得夠清楚。若答不出來，回看上一段並再說一次，確認有把握再往下。</p></details></Callout>
    <SectionTitle title="全課地圖：先在本機練熟，再把相簿放上雲端" />
    <div className="grid sm:grid-cols-2 gap-4">
      <Card><h3 className="font-bold">Part 1｜L1–L5 本機</h3><p>觀念 → 第一次存檔 → 看差異與還原 → 分支 → 自己解衝突。</p></Card>
      <Card><h3 className="font-bold">Part 2｜L6–L9 上雲與協作</h3><p>到時才建立 GitHub 帳號，備份自己的相簿、提出合併申請、練兩份資料夾之間的同步，最後讓 AI 讀你的紀錄整理進度。</p></Card>
      <Card><h3 className="font-bold">Part 3｜作業</h3><p>獨立完成自己的 Git 日誌，用學過的步驟交件。</p></Card>
      <Card><h3 className="font-bold">Part 4｜選修</h3><p>作業完成後，再學整理紀錄、參與別人的專案與進階救援。</p></Card>
    </div>
    <Quiz questions={[
  {
    "q": "Git 和 GitHub 的關係，哪個說法正確？",
    "options": [
      "是同一個東西",
      "Git 在電腦保存版本；GitHub 提供雲端存放與分享",
      "沒有 GitHub 帳號就不能用 Git"
    ],
    "answer": 1,
    "explain": "本課的相簿在自己電腦，由 Git 管理；GitHub 是之後才用的雲端相簿。"
  },
  {
    "q": "commit 對應哪個動作？",
    "options": [
      "只在編輯器按儲存",
      "按快門並把這個版本收進相簿",
      "刪除書桌上的檔案"
    ],
    "answer": 1,
    "explain": "commit 新增保存紀錄，內容來自拍照台，並附一句說明。"
  },
  {
    "q": "教材顯示 $ git init，實際要輸入哪些字？",
    "options": [
      "包含 $ 全部輸入",
      "只輸入 git init",
      "把 $ 換成姓名"
    ],
    "answer": 1,
    "explain": "$ 是提示符，不是指令的一部分；L2 會帶你實際輸入。"
  },
  {
    "q": "診斷題：草稿還不想保存，但日誌已寫好，要怎麼選？",
    "options": [
      "兩份都必須拍",
      "只把日誌放上拍照台",
      "先把草稿刪掉"
    ],
    "answer": 1,
    "explain": "暫存區用來挑這次要保存的內容，不必刪除不想拍的檔案。"
  },
  {
    "q": "AI 要靠 Git 紀錄幫新同事整理專案進度，哪件事影響最大？",
    "options": [
      "檔名取得越長越好",
      "每張照片的說明寫清楚做了什麼",
      "commit 越少越好"
    ],
    "answer": 1,
    "explain": "AI 讀的是每張照片的日期與說明；說明含糊，整理出來的進度也只能含糊。"
  }
]} />
  </div>
);
