import { useState } from 'react';
import { SectionTitle, InstructionalText, CommandBlock, Callout, Card, Quiz } from './Shared';


export const Lesson6Push = () => {
const CHECKLIST_ITEMS = [
  { id: 'account', label: 'GitHub 帳號註冊完成', verify: '能登入 github.com 看到自己的主頁' },
  { id: 'auth', label: 'gh 帳號連線完成', verify: '終端機輸入 gh auth status 顯示 Logged in as 你的帳號' },
];
const [checks, setChecks] = useState({});
const toggleCheck = (id) => setChecks(prev => ({...prev, [id]: !prev[id]}));

return (<div className="space-y-6 animate-fade-in">
<SectionTitle title="L6 GitHub 與第一次 push" />
<Card>
          <p className="text-sm text-slate-600">GitHub 是全球最大的程式碼平台，之後的練習都會上傳到這裡。已經有帳號的話，確認能登入就可以直接跳下一步。</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
            <li>前往 <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">github.com</a>，點右上角 <strong>Sign up</strong> 註冊免費帳號。</li>
            <li>依畫面輸入 email、密碼、帳號名稱（username）。</li>
            <li>到你的信箱收驗證碼，回到網頁輸入完成驗證。</li>
            <li>可能會出現英文拼圖人機驗證，照畫面拖曳完成即可。</li>
            <li>註冊後的「你是做什麼的」問卷——<strong>直接按 Skip 跳過</strong>，不影響任何後續步驟。</li>
          </ol>
          <Callout variant="info" title="兩個小提醒">
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>帳號名稱</strong>會出現在你的個人主頁網址（github.com/你的帳號名），別取太隨便。</li>
              <li><strong>註冊用的 email 請記住</strong>——之後設定 Git 身份時會用到同一個 email。</li>
            </ul>
          </Callout>
</Card>
          <Callout variant="success" title="🎉 你已經完成一半了，加油！">
            帳號有了、AI 助手也就位了——剩下的就是把工具裝上、驗收，然後正式開課。
          </Callout>
          <p className="text-sm text-slate-600">兩關都過了之後，讓電腦登入你的 GitHub 帳號：</p>
          <Callout variant="warning" title="這條和前面的不一樣——它會變成問答選單">
            按下 Enter 之後，終端機會變成一連串問答選單，要用<strong>鍵盤上下方向鍵</strong>移動、按 Enter 選擇，<strong>不是用打字的</strong>。看到一堆選項是正常的，照下面的順序選就好。中途畫面會停在 <code className="bg-amber-100 px-1 rounded">Press Enter to open github.com in your browser...</code>——這是要你按一下 Enter 開瀏覽器，不是當機。
          </Callout>
          <CommandBlock command="gh auth login" comment="把 gh 和你的 GitHub 帳號串起來" />
          <div className="text-sm text-slate-700 space-y-1">
            <p>終端機會問你幾個問題，用<strong>上下方向鍵</strong>選、按 Enter 確認，選擇原則：</p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>What account? → <strong>GitHub.com</strong></li>
              <li>Preferred protocol? → <strong>HTTPS</strong>（記得嗎？我們全程不用 SSH）</li>
              <li>Authenticate Git with your GitHub credentials? → <strong>Yes</strong></li>
              <li>How to authenticate? → <strong>Login with a web browser</strong></li>
              <li>它會給你一組 8 碼驗證碼，按 Enter 開瀏覽器、貼上 8 碼、點 Authorize。瀏覽器沒自動開的話，把終端機顯示的網址手動貼到瀏覽器即可。</li>
            </ol>
            <p className="text-slate-500 text-xs mt-1">問題順序和字面可能因版本略有不同，掌握原則就好：GitHub.com → HTTPS → Yes → 瀏覽器登入。</p>
          </div>
          <CommandBlock command="gh auth status" comment="確認連線：看到 Logged in as 你的帳號 就成功了" />
          <CommandBlock
            variant="output"
            command={'github.com\n  ✓ Logged in to github.com account 你的帳號 (keyring)\n  - Active account: true\n  - Git operations protocol: https'}
          />
          <p className="text-xs text-slate-500">gh 的輸出會帶顏色和 ✓ 符號，都是正常的，看到 <code className="bg-slate-100 px-1 rounded">Logged in to github.com</code> 就是成功。</p>
          <div className="space-y-2">
            {CHECKLIST_ITEMS.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${checks[item.id] ? 'bg-green-50 border-green-300' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
              >
                <input
                  type="checkbox"
                  checked={!!checks[item.id]}
                  onChange={() => toggleCheck(item.id)}
                  className="mt-0.5 w-4 h-4 accent-green-600"
                />
                <span className="text-sm">
                  <span className={`font-medium ${checks[item.id] ? 'text-green-900' : 'text-slate-700'}`}>{item.label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">驗證方法：{item.verify}</span>
                </span>
              </label>
            ))}
          </div>
<div className="bg-slate-800 rounded-xl px-5 py-4 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-yellow-400 text-base leading-none mt-0.5">🔑</span>
          <p className="text-sm text-slate-300"><strong className="text-white">需要一個已登入且連線的 GitHub 帳號。</strong>如果還沒有註冊 / 登入 GitHub，請先回到 <a href="#push" className="underline font-bold text-white hover:text-green-300">L6 GitHub 與第一次 push</a> 完成註冊。</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-base leading-none mt-0.5">📂</span>
          <div className="text-sm text-slate-300">
            <strong className="text-white">先在 GitHub 網頁上建好一個空白的新 Repository：</strong>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-slate-300">
              <li>登入 GitHub，點右上角的 <strong className="text-white">"+"</strong> → <strong className="text-white">New repository</strong></li>
              <li>取一個 Repository 名稱（例如 <code className="bg-slate-700 px-1 rounded">my-first-repo</code>）</li>
              <li>選擇 <strong className="text-white">Public</strong></li>
              <li className="text-red-300 font-bold">⚠️ 關鍵：「Add a README file」、「Add .gitignore」、「Choose a license」這三個選項全部<strong>不要勾選</strong>，保持完全空白！（勾了會造成歷史衝突，Push 時會被拒絕）</li>
              <li>點 <strong className="text-white">Create repository</strong>，然後複製頁面上的 HTTPS 網址備用（格式：<code className="bg-slate-700 px-1 rounded text-slate-300">https://github.com/你的帳號/專案名.git</code>）</li>
            </ol>
          </div>
        </div>
</div>
      <InstructionalText title="什麼時候會用到？">
        <p>你用 VSCode 在電腦裡建立了一個資料夾，寫好了幾個 HTML 檔案，現在你想把它們上傳到 GitHub 備份，並分享給全世界。</p>
      </InstructionalText>
          <Card>
            <h4 className="font-bold text-slate-700 mb-2">4. 到 GitHub 建一個空 repo</h4>
            <p className="text-sm text-slate-600">回到本章最上面「⚡ 進入狀態」區塊，照著步驟建立一個空白 Repository（記得三個選項都<strong>不要勾</strong>），並複製它的 HTTPS 網址。</p>
          </Card>

          <Card>
            <h4 className="font-bold text-slate-700 mb-2">5. 連結並上傳</h4>
            <div className="space-y-3">
              <CommandBlock command="git remote add origin https://github.com/你的帳號/my-first-repo.git" comment="記得換成你自己複製的網址" />
              <CommandBlock command="git branch -M main" comment="確保主分支叫 main（有些電腦預設叫 master，會對不上下一行指令）" />
              <CommandBlock command="git push -u origin main" />
              <CommandBlock variant="output" command={'Enumerating objects: 3, done.\nWriting objects: 100% (3/3), 230 bytes | 230.00 KiB/s, done.\nremote: Resolving deltas: 100% (0/0), done.\nTo https://github.com/你的帳號/my-first-repo.git\n * [new branch]      main -> main'} />
            </div>
            <Callout variant="info" className="mt-3">
              畫面會跳出一連串 <code>Enumerating objects...</code>、<code>Writing objects: 100%</code>、<code>remote: ...</code>——這些都是正常的上傳進度，不用理會；最後一行看到 <code>main -&gt; main</code> 就是成功了。另外，如果 push 時跳出瀏覽器登入視窗，照著登入即可，這是正常的身分驗證流程。
            </Callout>
          </Card>

          <Callout variant="success" title="驗證點">
            打開你 GitHub 的 repo 頁面按 <strong>F5 重新整理</strong>——看到 <code>notes.md</code> 出現，恭喜你完成了人生第一次 push！
          </Callout>
      <Quiz
        questions={[
          {
            q: '你確定自己有改檔案、也存檔了，但打開 GitHub 網頁卻完全看不到最新的內容，最可能是漏了哪一步？',
            options: [
              '忘記 git push——commit 只是存在自己電腦裡，沒推上雲端 GitHub 不會知道',
              '忘記重新整理瀏覽器快取，GitHub 其實已經收到了',
              'GitHub 上傳需要等 24 小時才會顯示',
            ],
            answer: 0,
            explain: 'git commit 只是在你「本機」建立一個存檔點，資料完全還在你的電腦裡。GitHub 是遠端伺服器，只有執行 git push 之後，本機的存檔紀錄才會真正傳過去。很多初學者以為 commit 完就等於「上傳」了，其實兩者是完全不同的兩個動作。',
          },
          {
            q: '執行 git remote add origin ... 之後，終端機畫面什麼反應都沒有、也沒有跳出任何文字，這代表？',
            options: [
              '執行失敗了，指令沒有生效，要重新打一次',
              '這是正常現象——很多 Git 指令成功時就是「沒消息就是好消息」，不會印出文字',
              '需要按 Enter 兩次才會真的執行',
            ],
            answer: 1,
            explain: 'git remote add、git add 這類指令的設計邏輯是「沒有異常才不會輸出訊息」，安靜的畫面通常代表成功。如果真的想確認，用 git remote -v 或 git status 主動查詢即可，看到畫面空白就緊張重打，反而容易不小心重複輸入或打錯。',
          },
          {
            q: '在 GitHub 網頁建立新的 Repository 時，「Add a README file」「Add .gitignore」「Choose a license」這三個初始化選項為什麼都不能勾？',
            options: [
              '勾選會讓 Repository 變成付費方案',
              '勾選之後 GitHub 上就已經有了一次歷史紀錄，跟你本機第一次 push 的歷史「兜不起來」，會被拒絕',
              '這三個選項只是介面上的裝飾，其實勾不勾都沒差',
            ],
            answer: 1,
            explain: '只要勾選任何一個初始化選項，GitHub 就會在遠端自動建立一個初始 commit（例如自動產生 README）。這樣一來，遠端 repo 已經有自己的歷史起點，跟你本機從 git init 開始建立的歷史是兩條不同的分支起點，push 時 Git 會判斷成「非快進（non-fast-forward）」而直接拒絕，新手常常因此卡在第一次 push 就搞不懂為什麼失敗。保持完全空白，讓本機的第一次 push 去「創造」遠端的歷史起點，才不會衝突。',
          },
        ]}
      />

</div>);
};
