import { useState } from 'react';
import { SectionTitle, Card, Callout } from './Shared';

const histories = {
  diverged: '共同照片 → A（main）\n        ↘ B（你的分支）',
  merged: '共同照片 → A ──→ M（合併照片）\n        ↘ B ──↗',
  rebased: "共同照片 → A → B′（重新套用你的改動）",
};

export const Elective1Rebase = () => {
  const [mode, setMode] = useState('diverged');
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <SectionTitle title="E1 Merge 與 Rebase" subtitle="比較兩種整理相簿紀錄的方法，知道什麼時候先別改歷史。" />
        <p className="text-sm text-slate-600">選修，不計分，學完作業再來；先熟悉 L4 的分支與 L5 的衝突。</p>
      </header>
      <Card className="space-y-3">
        <h3 className="font-bold">同樣是收進改動，留下的紀錄不同</h3>
        <p><strong>Merge（合併）</strong> 是把另一本分支相簿的成果收進目前這本相簿。<strong>Rebase（重新套用）</strong> 是換一個起點，把自己這邊的改動逐次重做成新的照片。</p>
        <p>假設兩本相簿從同一張照片出發：main 多了 A，你的分支多了 B。我先保留 A、B 的分開過程，再用合併照片 M 連起來，這是這個例子的 Merge；若把 B 的改動接到 A 後面重新保存，就得到 B′，這是 Rebase。</p>
        <p><strong>commit</strong> 是一次保存的版本，也就是相簿裡的一張照片。B′ 的編號不同於 B，因為它接在不同的照片後面；Rebase 不只是把圖上的圓點移位置。</p>
        <div className="flex flex-wrap gap-2">
          {[
            ['diverged', '1. 兩邊各有新照片'],
            ['merged', '2. 看 Merge'],
            ['rebased', '3. 看 Rebase'],
          ].map(([value, label]) => (
            <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`px-3 py-2 rounded border ${mode === value ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}>{label}</button>
          ))}
        </div>
        <pre className="overflow-x-auto rounded bg-slate-100 p-4" aria-live="polite">{histories[mode]}</pre>
        <p className="text-sm text-slate-600">這是相簿關係示意，不是終端機輸出，也沒有在你的電腦執行指令。兩邊都改到同一處時，兩種方法都可能需要你解衝突；不能靠選 Rebase 省略判斷。</p>
      </Card>
      <Callout variant="warning" title="照片已經分享出去，就先別重做">
        <strong>push</strong> 是把本機保存的版本上傳到雲端。若別人已經拿到你的照片，Rebase 換掉編號後，彼此的紀錄可能接不起來。這堂入門課繼續用已學過的 Merge；日後有團隊需求，再確認哪些尚未分享的紀錄可以整理。
      </Callout>
      <Card className="space-y-3">
        <h3 className="font-bold">一起判斷，再自己說明</h3>
        <p>我想保留「兩邊各自做事，最後合起來」的過程，因此選 Merge。換你補完：如果改用 Rebase，B 的編號會保留嗎？</p>
        <details><summary className="cursor-pointer text-indigo-700">核對答案</summary><p>這個例子不會；B 接到 A 後重新保存，成為編號不同的 B′。不確定就切換上方圖再看一次。</p></details>
        <p>再想一個不同情況：同事已經下載你的分支，現在你只想讓圖排成一直線，適合直接 Rebase 嗎？</p>
        <details><summary className="cursor-pointer text-indigo-700">核對判斷</summary><p>不適合直接做；先確認團隊如何協作。圖比較整齊不值得讓大家手上的紀錄不一致。</p></details>
      </Card>
    </div>
  );
};
