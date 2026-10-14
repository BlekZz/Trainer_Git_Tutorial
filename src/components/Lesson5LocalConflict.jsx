
import { SectionTitle, CommandBlock, Callout, Card, Badge, Quiz, FalseAlarm } from './Shared';
import { GitMerge, Zap } from 'lucide-react';

export const Lesson5LocalConflict = () => {

return (<div className="space-y-6 animate-fade-in">
<SectionTitle title="L5 本機衝突" />
      {/* Part 2: Conflict & Merge Visual */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Badge color="red">Part 2</Badge>
          <h3 className="text-xl font-bold text-slate-800">終極挑戰：解開衝突 (Conflict)</h3>
        </div>
        
        <Card className="bg-red-50/50 border-red-200 mb-8 overflow-x-auto">
           <div className="min-w-[600px] h-48 relative flex items-center justify-center">
             <div className="absolute top-1/2 left-20 right-20 h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>
             
             {/* Base Commit */}
             <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold">C0</div>
                <div className="text-xs font-mono mt-2 bg-white px-1 border rounded">Line 1: Hello</div>
             </div>

             {/* Diverging Paths */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path d="M 200 100 Q 240 40 400 40" fill="none" stroke="#9333ea" strokeWidth="3" strokeDasharray="4" />
                <path d="M 200 100 Q 240 160 400 160" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="4" />

                <path d="M 400 40 Q 560 40 600 100" fill="none" stroke="#9333ea" strokeWidth="3" />
                <path d="M 400 160 Q 560 160 600 100" fill="none" stroke="#4f46e5" strokeWidth="3" />
             </svg>

             {/* Remote Edit */}
             <div className="absolute left-1/2 top-[20%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">C1</div>
                <div className="text-xs font-mono mt-2 bg-purple-100 text-purple-800 px-1 border border-purple-300 rounded shadow">Line 1: Hello (A改的)</div>
             </div>

             {/* Local Edit */}
             <div className="absolute left-1/2 top-[80%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">C2</div>
                <div className="text-xs font-mono mt-2 bg-indigo-100 text-indigo-800 px-1 border border-indigo-300 rounded shadow">Line 1: Hello (B改的)</div>
             </div>

             {/* Conflict Icon */}
             <div className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2">
                <Zap size={32} className="text-red-500 animate-pulse fill-red-200" />
             </div>

             {/* Merge Commit */}
             <div className="absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-green-100">
                  <GitMerge size={20} />
                </div>
                <div className="text-[10px] font-bold mt-2 bg-white px-2 py-1 border border-green-300 rounded text-green-700 shadow text-center">
                   人為解決衝突<br/>產生 Merge Commit
                </div>
             </div>
           </div>
           
           <p className="text-sm text-slate-600 mt-4 text-center">
              當兩個人「剛好改到了同一個檔案的同一行」，Git 會不知道該聽誰的，這時候就會爆發 <strong>Conflict</strong>。
            </p>
            <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-700">
              <div className="font-bold mb-2">👀 衝突發生時，檔案裡會長這樣：</div>
              <CommandBlock
                variant="output"
                command={'<<<<<<< HEAD\n（你的修改）\n=======\n（對方的修改）\n>>>>>>> 分支名'}
                className="mb-2"
              />
              <p className="text-xs text-slate-500 mb-4">
                <code className="bg-slate-100 px-1 rounded">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> 到 <code className="bg-slate-100 px-1 rounded">=======</code> 之間是「你的版本」，<code className="bg-slate-100 px-1 rounded">=======</code> 之後到 <code className="bg-slate-100 px-1 rounded">&gt;&gt;&gt;&gt;&gt;&gt;&gt; 分支名</code> 是「對方的版本」。選好要保留的內容後，這三種標記要一起刪掉。
              </p>
              <div className="font-bold mb-3">🛠 解決衝突的完整流程：</div>
              <ol className="space-y-2 list-decimal pl-5">
                <li>打開 VSCode，找到被高亮標示衝突的檔案（側邊欄會有紅色驚嘆號）</li>
                <li>在衝突標記之間選擇：保留「你的修改」、「對方的修改」，或兩者都保留</li>
                <li>存檔並關閉衝突標記</li>
                <li className="font-bold text-indigo-700">執行 <code className="bg-indigo-50 px-1 rounded">git add .</code>（這步很多人忘記！解決完衝突還需要重新暫存）</li>
                <li className="font-bold text-indigo-700">執行 <code className="bg-indigo-50 px-1 rounded">git commit -m "解決衝突"</code></li>
              </ol>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-2 text-sm text-amber-800">
                少做第 4 步是最常見的錯誤——解決完衝突直接 push，Git 會說「還有未解決的 merge」，讓你以為沒有修好。
              </div>
              <FalseAlarm signal={'warning: LF will be replaced by CRLF in xxx'} className="mt-3">
                解衝突後執行 <code className="bg-amber-100 px-1 rounded">git add .</code> 時，Windows 上常會冒出這行黃字。它只是換行符號轉換的提醒，<strong>不代表衝突沒解好</strong>，直接繼續下一步 commit 即可。
              </FalseAlarm>
              <Callout variant="warning" title="🆘 救命卡：不小心打了沒有 -m 的 git commit？" className="mt-3">
                如果畫面突然變成一堆 <code className="bg-amber-100 px-1 rounded">~</code> 符號的奇怪編輯器（它叫 Vim），不要慌：按 <code className="bg-amber-100 px-1 rounded">Esc</code>，輸入 <code className="bg-amber-100 px-1 rounded">:wq</code>，按 <code className="bg-amber-100 px-1 rounded">Enter</code>，就能存檔離開。
              </Callout>
            </div>
        </Card>
      </section>

<Callout>本章撰寫中</Callout>

<Quiz questions={[{
            q: '解衝突時打開檔案，看到一堆 <<<<<<< HEAD 這種符號，是不是代表專案壞掉了？',
            options: [
              '是的，代表檔案已經毀損，要重新 clone 一份',
              '不是，這是 Git 正常標示雙方修改內容的方式，需要你手動選擇保留哪一段',
              '是的，代表 Merge 失敗，要立刻執行 git reset --hard',
            ],
            answer: 1,
            explain: '<<<<<<< HEAD 到 ======= 到 >>>>>>> 之間，就是 Git 老實告訴你「這裡兩邊都改了同一行，我不知道聽誰的」，這是完全正常的過程，不是壞掉。慌張地 reset --hard 反而會把兩邊的修改全部丟掉。正確做法是照章節內的流程：打開 VSCode 看高亮，人工選擇要保留誰的內容。',
          },
{
            q: '在編輯器裡把衝突標記都刪乾淨、選好要保留的內容之後，收尾的正確順序是？',
            options: [
              '直接 git push 就好，衝突標記刪掉代表已經解決了',
              '重新執行 git add . 再 git commit -m "訊息"，最後才 push',
              '執行 git pull 讓 Git 自動判斷該保留哪一段',
            ],
            answer: 1,
            explain: '存檔只是改了工作目錄的內容，Git 並不知道你「已經處理完」——它仍然記得這裡曾經衝突過。必須重新 git add . 把解決後的版本放進暫存區，再 git commit 產生一個 merge commit，才算真正收尾。漏掉這一步直接 push，Git 會說還有未解決的 merge，讓人誤以為前面做錯了。',
          }]} />
</div>);
};
