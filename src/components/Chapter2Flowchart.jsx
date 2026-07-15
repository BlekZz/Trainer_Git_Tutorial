import React from 'react';
import { SectionTitle, Card, Badge, InstructionalText, Callout, Quiz, FalseAlarm } from './Shared';
import { GitBranch, Map, Laptop, Github, Download, PlusCircle } from 'lucide-react';

export const Chapter2Flowchart = () => (
  <div className="space-y-8 animate-fade-in">
    <SectionTitle title="2. 情境總覽與流程介紹" subtitle="搞懂兩大起手式，你就不會再迷路" />

    <InstructionalText title="在開始之前，你必須先知道你處於哪個「情境」" icon={<Map size={18} className="text-indigo-600" />}>
      <p>初學者最常犯的錯誤，就是亂下指令。在你要輸入任何 <code>git</code> 指令前，請先問自己一個問題：<br />
      <strong>「這個專案是全新的（我剛剛在電腦裡開的資料夾），還是已經存在於 GitHub 上了？」</strong></p>
    </InstructionalText>

    <div className="grid md:grid-cols-2 gap-8 relative">
      {/* 裝飾分隔線 */}
      <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2"></div>
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center text-xs font-bold text-slate-400 z-10">VS</div>

      {/* 情境 A */}
      <Card className="bg-indigo-50/50 border-indigo-100 hover:shadow-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <PlusCircle size={100} />
        </div>
        <div className="relative z-10">
          <Badge color="indigo">情境 A</Badge>
          <h3 className="text-xl font-bold text-indigo-900 mt-3 mb-2 flex items-center gap-2">
            自己當造物主：從零開始
          </h3>
          <p className="text-sm text-indigo-700 mb-6 h-10">
            你自己在電腦裡寫好了一些 Code，現在你想把它們推上 GitHub 備份。
          </p>

          <div className="space-y-3 relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-indigo-200"></div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">1</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">初始化 (Init)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git init</code>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">2</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">暫存與存檔 (Add & Commit)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git add .</code> / <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git commit</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-400 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">3</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">連結遠端 (Remote Add)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git remote add origin</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-300 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">4</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">推上雲端 (Push)</div>
                <code className="text-xs text-indigo-600 bg-indigo-50 px-1 rounded">git push -u origin main</code>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 情境 B */}
      <Card className="bg-purple-50/50 border-purple-100 hover:shadow-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Download size={100} />
        </div>
        <div className="relative z-10">
          <Badge color="purple">情境 B</Badge>
          <h3 className="text-xl font-bold text-purple-900 mt-3 mb-2 flex items-center gap-2">
            加入大部隊：參與現有專案
          </h3>
          <p className="text-sm text-purple-700 mb-6 h-10">
            專案已經存在於 GitHub 上（例如公司的專案，或是別人的開源專案），你要下載下來開發。
          </p>

          <div className="space-y-3 relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-purple-200"></div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">1</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">下載專案 (Clone)</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git clone &lt;URL&gt;</code>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">2</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">進入資料夾</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">cd &lt;專案名稱&gt;</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">3</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">開發與存檔 (Add & Commit)</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git add .</code> / <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git commit</code>
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-purple-300 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">4</div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <div className="font-bold text-slate-700 text-sm">推上雲端 (Push)</div>
                <code className="text-xs text-purple-600 bg-purple-50 px-1 rounded">git push</code>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    
    {/* 預防照抄：上面是概念地圖，實際敲之前先打幾支預防針 */}
    <div className="space-y-3">
      <h3 className="text-md font-bold text-slate-700">先打預防針：照著上面的圖敲之前，這幾件事要知道</h3>

      <Callout variant="warning" title="圖中的 git commit 是概念示意，實際輸入務必加 -m">
        實際操作時請打 <code className="bg-amber-100 px-1 rounded">git commit -m "你的存檔訊息"</code>。只打 <code className="bg-amber-100 px-1 rounded">git commit</code> 會掉進一個滿是 <code className="bg-amber-100 px-1 rounded">~</code> 符號的編輯器畫面（不好離開），之後的章節會教怎麼應對，現在先記得加 <code className="bg-amber-100 px-1 rounded">-m</code> 就好。
      </Callout>

      <FalseAlarm signal={'warning: LF will be replaced by CRLF in xxx.md'}>
        Windows 上打 <code className="bg-amber-100 px-1 rounded">git add .</code> 時很常看到這種黃字，它只是在提醒「換行格式會自動轉換」，<strong>不是錯誤</strong>，可以無視、直接繼續下一步。
      </FalseAlarm>

      <FalseAlarm signal={'Enumerating objects: 5, done.\nWriting objects: 100% (5/5), done.\nremote: ...'} title="push 時會冒出一大串訊息——那是上傳進度">
        <code className="bg-amber-100 px-1 rounded">git push</code> 成功時反而話很多：這些是上傳進度回報，不是錯誤。第一次 push 還可能彈出登入視窗，照畫面登入 GitHub 即可。
      </FalseAlarm>

      <FalseAlarm signal={'Receiving objects:  42% (123/291)'} title="clone 時的百分比是下載進度">
        <code className="bg-amber-100 px-1 rounded">git clone</code> 會顯示下載進度百分比，中途停一下是正常的（網路在傳檔案），等它回到可以輸入指令的狀態就是完成了。
      </FalseAlarm>
    </div>

    <Callout variant="info" className="justify-center text-center">
      <span className="font-bold">接下來的兩個章節，我們將分別帶你實際演練這兩條路線！點下方的「下一章」按鈕繼續。</span>
    </Callout>

    <Quiz
      questions={[
        {
          q: '公司請你加入一個已經在 GitHub 上存在的專案，你打開終端機後，第一個該打的指令是什麼？',
          options: [
            'git init，先把自己的資料夾初始化',
            'git clone <URL>，把整個專案下載到本機',
            'git push -u origin main，先把自己的東西推上去',
          ],
          answer: 1,
          explain: '這是情境 B：專案已經存在雲端，你要做的是「下載」而不是「新建」。git init 是情境 A 專用（從零開始的全新專案），在這裡用會建立一個和 GitHub 上專案完全無關的空倉庫。git push 更是本末倒置——你連專案內容都還沒有，根本沒東西可推。',
        },
        {
          q: '情境 A（從零開始）和情境 B（加入現有專案），兩者最關鍵的差別是什麼？',
          options: [
            '情境 A 用 git，情境 B 用 GitHub，是兩套不同的工具',
            '情境 A 從「本機沒有任何 Git 紀錄」開始要用 git init 建立，情境 B 從「雲端已有專案」開始要用 git clone 下載',
            '情境 A 只能自己一個人用，情境 B 才能多人協作',
          ],
          answer: 1,
          explain: '差別在於「起點」：情境 A 是你電腦裡先有程式碼、Git 世界裡完全沒有這個專案的痕跡，所以要 git init 從無到有建立版本控制，再手動連結遠端 (remote add)。情境 B 是雲端已經有現成的專案，git clone 會直接把整個歷史和遠端連結都幫你設定好。兩者都是同一套 Git，情境 A 之後一樣能多人協作。',
        },
        {
          q: '拿到一個新的開發任務，在打任何 git 指令之前，你應該先判斷什麼？',
          options: [
            '先判斷這個專案的程式語言是什麼',
            '先判斷「這個專案是我剛在電腦裡新建的，還是已經存在於 GitHub 上了」，決定走情境 A 還是情境 B',
            '先判斷公司用的是 GitHub 還是 GitLab',
          ],
          answer: 1,
          explain: '這正是本章的核心提醒：初學者最常犯的錯就是不分情境亂下指令，例如專案明明已經在 GitHub 上，卻對著它打 git init。先判斷「新專案 vs 已存在的專案」，才能決定接下來該走哪一條路線，避免搞出兩個互不相關的版本歷史。',
        },
      ]}
    />
  </div>
);
