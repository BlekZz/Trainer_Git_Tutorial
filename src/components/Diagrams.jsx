import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

// 圖解元件：與側欄目錄同一套視覺語言（墨色 = main／本機、橘紅 = 分支／動作、灰藍 = GitHub 雲端）
// 文字內容沿用各課原有的示意文字，只換呈現方式。

const TONES = {
  ink: { ring: 'bg-slate-800 text-white', box: 'border-slate-300' },
  accent: { ring: 'bg-indigo-500 text-white', box: 'border-indigo-200' },
  cloud: { ring: 'bg-[#3E6BA8] text-white', box: 'border-[#BFD0E6]' },
  success: { ring: 'bg-green-600 text-white', box: 'border-green-200' },
};

const FlowNode = ({ icon: Icon, title, lines = [], tag, tone = 'ink' }) => {
  const t = TONES[tone] || TONES.ink;
  return (
    <div className={`relative flex min-w-0 flex-1 items-center gap-3 rounded-xl border bg-white px-3 py-2.5 text-left sm:flex-col sm:gap-0 sm:px-3 sm:py-4 sm:text-center ${t.box}`}>
      {Icon && (
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:order-2 sm:mb-2 sm:h-11 sm:w-11 ${t.ring}`} aria-hidden="true">
          <Icon size={20} strokeWidth={1.8} />
        </span>
      )}
      <div className="min-w-0 sm:order-3">
        <p className="font-bold leading-snug text-ink">
          {tag && <span className="mr-1.5 align-middle text-xs font-medium text-slate-500 sm:hidden">{tag}</span>}
          {title}
        </p>
        {lines.map((l, i) => (
          <p key={i} className="mt-0.5 text-sm leading-snug text-slate-600 [overflow-wrap:anywhere]">{l}</p>
        ))}
      </div>
      {tag && <span className="order-1 mb-2 hidden rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 sm:inline-block">{tag}</span>}
    </div>
  );
};

const FlowLink = ({ label }) => (
  <div className="flex shrink-0 items-center justify-center gap-2 py-1 sm:w-24 sm:flex-col sm:gap-1 sm:py-0" aria-hidden="true">
    <ArrowDown size={18} className="text-indigo-500 sm:hidden" />
    <ArrowRight size={20} className="hidden text-indigo-500 sm:block" />
    {label && <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-center text-xs font-semibold leading-snug text-indigo-700">{label}</span>}
  </div>
);

// <FlowDiagram label="給螢幕閱讀器的整句說明" steps={[{ icon, title, lines, tag, tone }]} links={['push 上傳']} caption="..." />
export const FlowDiagram = ({ label, steps, links = [], caption, className = '' }) => (
  <figure className={`rounded-xl border border-line bg-slate-50 p-3 sm:p-5 ${className}`}>
    <div role="img" aria-label={label} className="flex flex-col items-stretch sm:flex-row">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <FlowLink label={links[i - 1]} />}
          <FlowNode {...s} />
        </React.Fragment>
      ))}
    </div>
    {caption && <figcaption className="mt-3 text-sm text-slate-600">{caption}</figcaption>}
  </figure>
);

// 分支圖（L4）：main 兩張照片，feat/day2 從第二張分出去多拍 Day 2，虛線是學員要補的合併
export const BranchDiagram = ({ label }) => (
  <figure className="rounded-xl border border-line bg-slate-50 p-3 sm:p-5">
    <svg viewBox="0 0 400 176" className="mx-auto block h-auto w-full max-w-lg" role="img" aria-label={label}>
      <line x1="48" y1="56" x2="168" y2="56" stroke="#1B2430" strokeWidth="3" />
      <path d="M168 56 C 210 56, 214 128, 262 128" fill="none" stroke="#E2532D" strokeWidth="3" />
      <path d="M262 128 C 310 128, 318 56, 352 56" fill="none" stroke="#E2532D" strokeWidth="3" strokeDasharray="6 6" />
      <line x1="168" y1="56" x2="352" y2="56" stroke="#1B2430" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="48" cy="56" r="10" fill="#1B2430" />
      <circle cx="168" cy="56" r="10" fill="#1B2430" />
      <circle cx="262" cy="128" r="10" fill="#E2532D" />
      <circle cx="352" cy="56" r="11" fill="#fff" stroke="#E2532D" strokeWidth="3" strokeDasharray="4 3" />
      <text x="352" y="61" textAnchor="middle" fontSize="15" fontWeight="700" fill="#C2410C">?</text>
      <text x="48" y="30" textAnchor="middle" fontSize="16" fontWeight="600" fill="#1B2430">Day 1</text>
      <text x="168" y="30" textAnchor="middle" fontSize="16" fontWeight="600" fill="#1B2430">忽略清單</text>
      <text x="262" y="164" textAnchor="middle" fontSize="16" fontWeight="600" fill="#C2410C">Day 2</text>
      <text x="352" y="30" textAnchor="middle" fontSize="15" fontWeight="600" fill="#C2410C">最後一步？</text>
    </svg>
    <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-slate-600">
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-800" aria-hidden="true" />main：Day 1 ＋ 忽略清單，留在原照片</span>
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" aria-hidden="true" />feat/day2：從同一張開始，多拍 Day 2</span>
    </div>
  </figure>
);

// 衝突圖（L5）：共同版本 → 兩邊各改同一行 → 由人決定合併結果
const VersionBox = ({ branch, line, tone = 'ink', note }) => (
  <div className={`min-w-0 rounded-lg border bg-white px-3 py-2.5 ${tone === 'accent' ? 'border-indigo-200' : tone === 'success' ? 'border-green-300' : 'border-slate-300'}`}>
    <p className={`text-xs font-semibold ${tone === 'accent' ? 'text-indigo-600' : tone === 'success' ? 'text-green-700' : 'text-slate-500'}`}>{branch}</p>
    <p className="font-mono text-sm text-ink [overflow-wrap:anywhere]">{line}</p>
    {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
  </div>
);

export const ConflictDiagram = ({ label, common, ours, theirs, result }) => (
  <figure className="rounded-xl border border-line bg-slate-50 p-3 sm:p-5">
    <div role="img" aria-label={label} className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1.2fr_auto_1fr] sm:gap-3">
      <VersionBox branch="原本兩邊都是" line={common} />
      <div className="flex justify-center" aria-hidden="true">
        <ArrowDown size={18} className="text-slate-400 sm:hidden" />
        <ArrowRight size={18} className="hidden text-slate-400 sm:block" />
      </div>
      <div className="space-y-2">
        <VersionBox branch={ours.branch} line={ours.line} />
        <VersionBox branch={theirs.branch} line={theirs.line} tone="accent" />
      </div>
      <div className="flex flex-col items-center gap-1" aria-hidden="true">
        <ArrowDown size={18} className="text-indigo-500 sm:hidden" />
        <ArrowRight size={18} className="hidden text-indigo-500 sm:block" />
        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">合併時衝突</span>
      </div>
      <VersionBox branch="由你決定最後內容" line={result} tone="success" />
    </div>
  </figure>
);
