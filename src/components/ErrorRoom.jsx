import React from 'react';
import { Card, SectionTitle, Callout, CommandBlock } from './Shared';

const ErrorCard = ({ error, translation, children }) => (
  <Card className="mb-4">
    <p className="font-mono text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2 mb-3 break-all">
      {error}
    </p>
    <p className="text-slate-700 font-medium mb-3">👉 {translation}</p>
    <div className="space-y-2">{children}</div>
  </Card>
);

export const ErrorRoom = () => {
  return (
    <div>
      <SectionTitle title="🚑 錯誤訊息急診室" subtitle="遇到看不懂的錯誤？先來這裡查一查" />

      <Callout variant="info" title="怎麼用這一頁" className="mb-6">
        遇到看不懂的英文錯誤？在這頁用 <span className="font-mono">Ctrl+F</span> / <span className="font-mono">Cmd+F</span>
        貼上你的錯誤訊息關鍵字，找到白話翻譯和解法。
      </Callout>

      <ErrorCard
        error="'git' is not recognized as an internal or external command / command not found: git"
        translation="電腦還不認識 git 指令——通常是因為你剛裝完軟體，終端機沒有重新啟動。"
      >
        <p className="text-sm text-slate-600">
          解法：把 VSCode / 終端機視窗全部關掉，重新打開一次再試。PATH 設定只有在「新開的」終端機才會生效。
        </p>
      </ErrorCard>

      <ErrorCard
        error={'畫面突然變成一堆 "~" 符號，游標卡住、打字打不出東西（Vim 編輯器）'}
        translation="你被送進了 Vim 這個文字編輯器，這是 Git 預設用來寫 commit 訊息的工具。"
      >
        <CommandBlock variant="output" command={'~\n~\n~\n"COMMIT_EDITMSG" 為新檔案'} />
        <p className="text-sm text-slate-600">解法：先按一下 <span className="font-mono font-bold">Esc</span>，再輸入 <span className="font-mono font-bold">:wq</span>，最後按 Enter 即可離開並存檔。</p>
      </ErrorCard>

      <ErrorCard
        error="fatal: Need to specify how to reconcile divergent branches."
        translation="Git 不知道遠端和本地的紀錄要用什麼方式合併，需要先設定一次偏好。"
      >
        <CommandBlock command="git config --global pull.rebase false" comment="設定合併策略（只需做一次）" />
        <CommandBlock command="git pull" comment="再重新拉取一次" />
      </ErrorCard>

      <ErrorCard
        error="*** Please tell me who you are."
        translation="Git 不知道你是誰，第一次 commit 前要先自我介紹。"
      >
        <CommandBlock command={'git config --global user.name "你的名字"\ngit config --global user.email "你的Email"'} comment="Chapter 1 教過的兩行設定" />
      </ErrorCard>

      <ErrorCard
        error="fatal: not a git repository (or any of the parent directories): .git"
        translation="你現在所在的資料夾不是一個 Git 專案，Git 找不到 .git 資料夾。"
      >
        <p className="text-sm text-slate-600 mb-2">解法：用 <span className="font-mono">cd</span> 切換到你的專案資料夾再執行指令。</p>
        <CommandBlock command="cd 你的專案資料夾路徑" comment="先移動到專案資料夾" />
      </ErrorCard>

      <ErrorCard
        error="You are in 'detached HEAD' state"
        translation="你現在站在一個沒有分支名字的位置上，但別慌，這不會弄壞任何東西。"
      >
        <CommandBlock command="git checkout main" comment="回到 main 分支這個家" />
      </ErrorCard>

      <ErrorCard
        error="git@github.com: Permission denied (publickey). fatal: Could not read from remote repository."
        translation="你的電腦正在用 SSH 方式連 GitHub，但本教程從頭到尾都用 HTTPS——你走到別條路上了，方向錯了，不是你做壞了什麼。"
      >
        <p className="text-sm text-slate-600">
          先診斷：看看你的 origin 網址是不是 <span className="font-mono">git@github.com:</span> 開頭。
        </p>
        <CommandBlock command="git remote -v" comment="檢查 origin 網址開頭" />
        <p className="text-sm text-slate-600">
          如果是 <span className="font-mono">git@github.com:</span> 開頭，用下面這行切回 HTTPS（把 <span className="font-mono">&lt;你的帳號&gt;</span> 換成你的 GitHub 帳號），然後重試剛剛的指令：
        </p>
        <CommandBlock command="git remote set-url origin https://github.com/<你的帳號>/Trainer_Git_Tutorial.git" comment="把 origin 切回 HTTPS 網址" />
        <p className="text-sm text-slate-600">
          什麼時候會誤入這條路：複製到 GitHub Code 綠色按鈕裡「SSH」分頁的網址、照抄別人畫面上的指令、或跟著網路教學設定了 SSH。全部不需要——我們全程用 HTTPS。
        </p>
      </ErrorCard>

      <ErrorCard
        error="remote: Permission to XXX/XXX.git denied to your-username. fatal: unable to access ... 403"
        translation="你正在對別人的 repo 執行 push，但你沒有寫入權限。"
      >
        <p className="text-sm text-slate-600">
          解法：請看 Chapter 8 的說明——你需要先 Fork 一份到自己名下，再用 <span className="font-mono">git remote set-url</span> 把本地的 origin 改指向你自己的 Fork。
        </p>
      </ErrorCard>

      <ErrorCard
        error="remote: Repository not found. fatal: repository 'https://github.com/...' not found"
        translation="Git 找不到這個網址對應的 repo，通常是兩種情況之一。"
      >
        <p className="text-sm text-slate-600 mb-2">
          1. 你還沒完成 Fork 就跑了 <span className="font-mono">set-url</span>；<br />
          2. 網址裡的帳號或 repo 名稱打錯了。
        </p>
        <CommandBlock command="git remote -v" comment="先檢查目前 origin 指向哪裡" />
        <p className="text-sm text-slate-600">確認 Fork 已完成後，重新執行一次 <span className="font-mono">git remote set-url</span>。</p>
      </ErrorCard>

      <ErrorCard
        error="error: src refspec main does not match any"
        translation="你要 push 的分支叫 main，但這個專案裡根本沒有叫 main 的分支——通常是因為 git init 後預設分支叫 master。"
      >
        <CommandBlock command="git branch -M main" comment="把目前的分支改名為 main" />
        <CommandBlock command="git push -u origin main" comment="再 push 一次" />
        <p className="text-sm text-slate-600">
          想一勞永逸：執行 <a href="#setup" className="text-indigo-600 underline hover:text-indigo-800">Chapter 0 行前準備</a>「一次性建議設定」裡的 <span className="font-mono">git config --global init.defaultBranch main</span>，之後新專案的主分支都會叫 main。
        </p>
      </ErrorCard>

      <ErrorCard
        error="push 時彈出視窗要求輸入密碼（Password for 'https://github.com')"
        translation="不要輸入 GitHub 網站的登入密碼——那個方式已經被 GitHub 停用了，輸入了也一定失敗。"
      >
        <CommandBlock command="gh auth login" comment="用 GitHub CLI 重新登入一次" />
      </ErrorCard>

      <ErrorCard
        error="node -v 顯示的版本太舊（低於 v20，例如 v14 / v16）"
        translation="你電腦上的 Node.js 版本太舊，跑不動本教程需要的工具。"
      >
        <CommandBlock command="node -v" comment="再確認一次目前版本" />
        <p className="text-sm text-slate-600">
          解法：回到「Chapter 0 行前準備」的步驟 3，把這個版本號截圖或複製給 AI 助手，請它引導你安裝 Node.js LTS（v20 以上）；如果你的電腦太舊裝不了新版，AI 會直接給你能用的舊版本與下載連結。
        </p>
      </ErrorCard>

      <ErrorCard
        error="npm install 失敗：npm ERR! network / ETIMEDOUT / EACCES / permission denied"
        translation="套件下載失敗——通常是網路連不上，或是資料夾權限不足。（這只會發生在教學者/貢獻者本地執行專案的情境，一般學員走網頁版不會遇到。）"
      >
        <p className="text-sm text-slate-600 mb-2">
          速查：<br />
          1. <span className="font-mono">network / ETIMEDOUT</span> → 檢查網路，公司或學校網路可能擋住 npm，換個網路（如手機熱點）再試一次；<br />
          2. <span className="font-mono">EACCES / permission denied</span> → 專案放到你自己的使用者資料夾（如桌面）再重跑，不要放在系統資料夾。
        </p>
        <CommandBlock command="npm install" comment="排除原因後再跑一次" />
        <p className="text-sm text-slate-600">
          還是卡住？回到「Chapter 0 行前準備」的步驟 3，把整段錯誤訊息截圖給 AI 助手處理。
        </p>
      </ErrorCard>
    </div>
  );
};

export default ErrorRoom;
