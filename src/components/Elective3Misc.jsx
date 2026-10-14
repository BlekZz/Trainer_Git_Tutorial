
import { SectionTitle, CommandBlock, Callout } from './Shared';


export const Elective3Misc = () => {

return (<div className="space-y-6 animate-fade-in">
<SectionTitle title="E3 stash 與其他" />
               <Callout variant="info" title="🎒 切換前東西沒存怎麼辦？git stash">
                 <code className="bg-blue-100 px-1 rounded">git stash</code> = 把桌上未完成的東西先掃進抽屜（暫存）；<code className="bg-blue-100 px-1 rounded">git stash pop</code> = 從抽屜拿出來繼續。切換分支前，如果工作區還有未存檔的修改，先 <code className="bg-blue-100 px-1 rounded">git commit</code>（建議）或先 <code className="bg-blue-100 px-1 rounded">git stash</code>，再切換。
                 <span className="block mt-1 text-xs">成功時你會看到：<code className="bg-blue-100 px-1 rounded">git stash</code> 顯示 <code className="bg-blue-100 px-1 rounded">Saved working directory and index state ...</code>；<code className="bg-blue-100 px-1 rounded">git stash pop</code> 最後一行顯示 <code className="bg-blue-100 px-1 rounded">Dropped refs/stash@{'{0}'}</code>。</span>
               </Callout>
             <div className="bg-white p-4 rounded border border-red-100 shadow-sm md:col-span-2">
               <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">😵 案發現場 3：畫面出現 detached HEAD</div>
               <p className="text-sm text-slate-600 mb-2">看到 <code>You are in 'detached HEAD' state</code> → 別慌，這只是你時光旅行到了舊存檔點。</p>
               <CommandBlock command="git checkout main" comment="輸入這行就回到現在了" />
               <CommandBlock variant="output" command={"Switched to branch 'main'"} className="mt-2" />
             </div>
<Callout>本章撰寫中</Callout>

</div>);
};
