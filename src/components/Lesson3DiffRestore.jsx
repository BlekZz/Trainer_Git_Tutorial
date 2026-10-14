
import { Quiz, SectionTitle, CommandBlock, Callout, NoOutputHint, Card } from './Shared';
import { FileText, ShieldAlert, LifeBuoy } from 'lucide-react';

export const Lesson3DiffRestore = () => {

return (<div className="space-y-6 animate-fade-in">
<SectionTitle title="L3 看差異與後悔藥" />
      {/* Commit Message Guidelines */}
      <div className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
           <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
             <FileText size={18} /> 養成好習慣：Commit Message 怎麼寫？
           </h3>
           <p className="text-sm text-blue-700 mb-4">好的 Commit Message 能讓同事（或一個月後的你）秒懂你改了什麼。業界通常會使用「前綴 (Prefix)」來分類：</p>
           <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-blue-600 bg-blue-100 px-1 rounded">feat:</span> 新增功能</div>
               <div className="text-slate-500 mt-1">例如：<code>feat: 新增購物車結帳按鈕</code></div>
             </div>
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-red-600 bg-red-100 px-1 rounded">fix:</span> 修復 Bug</div>
               <div className="text-slate-500 mt-1">例如：<code>fix: 修正登入失敗時不會跳出警告的問題</code></div>
             </div>
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-purple-600 bg-purple-100 px-1 rounded">docs:</span> 文件修改</div>
               <div className="text-slate-500 mt-1">例如：<code>docs: 更新 README 安裝教學</code></div>
             </div>
             <div className="bg-white p-3 rounded border border-blue-100 shadow-sm text-sm">
               <div className="font-bold text-slate-700"><span className="text-green-600 bg-green-100 px-1 rounded">style:</span> 格式修改</div>
               <div className="text-slate-500 mt-1">例如：<code>style: 調整首頁標題字體大小</code></div>
             </div>
           </div>
        </Card>
      </div>

        <Card className="bg-yellow-50 border-yellow-200">
           <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
             <ShieldAlert size={18} /> 防雷神針：隱形斗篷 .gitignore
           </h3>
           <p className="text-sm text-yellow-700 mb-3">
             新手最常犯的錯，就是把「幾萬個暫存檔 (如 <code>node_modules</code>)」或是「寫有資料庫密碼的檔案」一起 <code>git add .</code> 傳上 GitHub，導致專案又肥又危險。
           </p>
           <p className="text-sm text-yellow-700 font-bold mb-2">解決方法：</p>
           <p className="text-sm text-yellow-700">
             在專案資料夾底下建立一個名為 <code>.gitignore</code> 的檔案。在裡面寫上你不想被 Git 追蹤的檔案或資料夾名稱。Git 就會當作沒看到它們！<br/>
             <span className="text-xs text-yellow-600">用 VSCode 檔案總管右鍵 → New File，檔名輸入 <code>.gitignore</code>（對，開頭就是一個點）。</span>
           </p>
           <div className="bg-slate-900 rounded p-3 mt-3 font-mono text-xs text-green-400">
             # 檔案名稱：.gitignore<br/>
             node_modules/<br/>
             .env<br/>
             *.log
           </div>
           <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
             <div className="text-xs font-bold text-purple-800 mb-2">📊 數據分析菜鳥版（Python / Jupyter）</div>
             <div className="bg-slate-900 rounded p-2 font-mono text-xs text-green-400">
               # Python 數據分析常見需要忽略的<br/>
               __pycache__/<br/>
               .ipynb_checkpoints/<br/>
               .env<br/>
               *.pyc<br/>
               data/raw/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 原始資料通常不放 Git
             </div>
           </div>
        </Card>
      {/* Emergency Escape Bag */}
      <div className="mt-8">
        <Card className="bg-red-50 border-red-200">
           <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
             <LifeBuoy size={18} /> 緊急逃生包：Oops! 我搞砸了怎麼辦？
           </h3>
           <p className="text-sm text-red-700 mb-4">
             打錯字或加錯檔案時很容易恐慌（例如不小心把全部檔案都 <code>git add .</code> 了，但其實只想傳一個）。別擔心，這幾個指令能救你：
           </p>
           <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded border border-red-100 shadow-sm">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">😭 案發現場 1：不小心 Add 錯檔案</div>
               <p className="text-sm text-slate-600 mb-2">我把還沒寫完的檔案送進暫存區了，我想把它拿出來！</p>
               <CommandBlock command="git restore --staged <檔案名>" />
               <NoOutputHint>想確認的話輸入 <code>git status</code>——看到那個檔案變回紅色（未暫存）就代表拿出來了。</NoOutputHint>
               <p className="text-xs text-slate-500 mt-2">* 這只會把它移出暫存區，不會刪除你的程式碼。就像把照片從拍照台上拿下來，檔案內容一個字都不會變。</p>
             </div>

             <div className="bg-white p-4 rounded border border-red-100 shadow-sm">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">💥 案發現場 2：把程式碼改壞了</div>
               <p className="text-sm text-slate-600 mb-2">剛剛亂改一通，程式全壞了，我想讓這個檔案回到最後一次 Commit 的狀態！</p>
               <CommandBlock command="git restore <檔案名>" />
               <NoOutputHint>想確認的話輸入 <code>git status</code>——那個檔案從變動清單上消失，就代表已還原成功。</NoOutputHint>
               <Callout variant="danger" className="mt-2">
                 這會讓你剛寫的程式碼<strong>永遠消失</strong>，回不去了！執行前先確定你真的不要那些修改。
               </Callout>
             </div>

           </div>
        </Card>
      </div>

<Callout>本章撰寫中</Callout>

<Quiz questions={[{
            q: '你改壞了一個檔案、但還沒 git add，想讓它整個回到最後一次 commit 的乾淨狀態，該用哪個指令？',
            options: [
              'git restore <檔案名>——把還沒暫存的修改整個丟棄，回到上次 commit 的樣子',
              'git commit -m "還原"——重新 commit 一次就能蓋掉剛剛的錯誤',
              'git clone 重新下載一次專案最快最保險',
            ],
            answer: 0,
            explain: 'git restore <檔案名> 專門用來丟棄「尚未暫存」的修改，讓檔案回到最後一次 commit 時的狀態——但要注意這個動作會讓你剛寫的改動永久消失，執行前務必先確認真的不要了。commit 沒辦法「蓋掉」錯誤，它只會再新增一筆歷史紀錄；而重新 clone 則是殺雞用牛刀，且如果本地已經有其他未推送的改動還會被覆蓋，並不是正確的救援方式。',
          }]} />
</div>);
};
