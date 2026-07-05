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
        error="push 時彈出視窗要求輸入密碼（Password for 'https://github.com')"
        translation="不要輸入 GitHub 網站的登入密碼——那個方式已經被 GitHub 停用了，輸入了也一定失敗。"
      >
        <CommandBlock command="gh auth login" comment="用 GitHub CLI 重新登入一次" />
      </ErrorCard>
    </div>
  );
};

export default ErrorRoom;
