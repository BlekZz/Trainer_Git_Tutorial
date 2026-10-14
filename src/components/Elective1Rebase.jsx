import { useState } from 'react';
import { SectionTitle, Badge } from './Shared';
import { GitGraph, CheckCircle, FileCode } from 'lucide-react';

export const Elective1Rebase = () => {
  const [mode, setMode] = useState('diverged');
  const [activeTab, setActiveTab] = useState('code');
  const codeOriginal = `function calculate(a, b) {\n  return a + b;\n}`;
  const codeRemote = `function calculate(a, b) {\n  console.log("Calculating..."); // 同事 (A) 新增\n  return a + b;\n}`;
  const codeLocal = `function calculate(a, b) {\n  if (a < 0) return 0; // 你 (B) 新增\n  return a + b;\n}`;
  
  const codeMerged = `function calculate(a, b) {\n  if (a < 0) return 0; // 你 (B) 新增\n  console.log("Calculating..."); // 同事 (A) 新增\n  return a + b;\n}`;
  const codeRebased = `function calculate(a, b) {\n  console.log("Calculating..."); // 同事 (A) 新增\n  if (a < 0) return 0; // 你 (B) 被重新套用\n  return a + b;\n}`;

return (<div className="space-y-6 animate-fade-in">
<SectionTitle title="E1 Merge vs Rebase" />
      {/* Part 3: Merge vs Rebase */}
      <section>
        <details className="group">
          <summary className="cursor-pointer list-none flex items-center gap-2 mb-2">
            <Badge color="orange">Part 3</Badge>
            <Badge color="gray">進階概念</Badge>
            <h3 className="text-xl font-bold text-slate-800 inline">Merge 與 Rebase：你喜歡怎樣的歷史？</h3>
            <span className="text-slate-400 text-sm ml-auto group-open:hidden">▸ 點開看</span>
            <span className="text-slate-400 text-sm ml-auto hidden group-open:inline">▾ 收合</span>
          </summary>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800 flex items-start gap-2">
            <span className="text-lg leading-none mt-0.5">⭐</span>
            <span><strong>這是進階概念</strong>，看不懂完全正常，先跳過——第一次學習建議先完成 L7 和 E2 的實戰演練，再回來看這裡。</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg mb-8">
           <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex gap-4">
              <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 text-sm font-bold ${activeTab === 'code' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                 <FileCode size={16} /> 程式碼合併比對 (Diff)
              </button>
              <button onClick={() => setActiveTab('graph')} className={`flex items-center gap-2 text-sm font-bold ${activeTab === 'graph' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                 <GitGraph size={16} /> 歷史結構圖 (Graph)
              </button>
           </div>

           <div className="p-6 bg-slate-50/50 min-h-[350px]">
              {/* Controls */}
              <div className="flex gap-2 mb-6 max-w-md mx-auto">
                  <button onClick={() => setMode('diverged')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'diverged' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>
                    1. 分歧 (原始狀態)
                  </button>
                  <button onClick={() => setMode('merged')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'merged' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600'}`}>
                    2. Merge 結果
                  </button>
                  <button onClick={() => setMode('rebased')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${mode === 'rebased' ? 'bg-orange-600 text-white shadow' : 'bg-white text-slate-600'}`}>
                    3. Rebase 結果
                  </button>
              </div>

              {activeTab === 'code' ? (
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-4">
                     <div className="bg-slate-100 p-3 rounded border border-slate-200 font-mono text-xs">
                        <div className="mb-2 font-bold text-slate-500 flex items-center gap-1">原始程式碼 (Base)</div>
                        <pre className="text-slate-400">{codeOriginal}</pre>
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                       <div className="bg-purple-50 p-2 rounded border border-purple-200 font-mono text-xs">
                          <div className="mb-1 font-bold text-purple-700">同事 (Remote A)</div>
                          <pre className="text-slate-600 whitespace-pre-wrap">
                            {codeRemote.split('\n').map((line, i) => (
                              <div key={i} className={line.includes('新增') ? 'bg-purple-200 text-purple-900 font-bold' : ''}>{line}</div>
                            ))}
                          </pre>
                       </div>
                       <div className="bg-indigo-50 p-2 rounded border border-indigo-200 font-mono text-xs">
                          <div className="mb-1 font-bold text-indigo-700">你 (Local B)</div>
                          <pre className="text-slate-600 whitespace-pre-wrap">
                            {codeLocal.split('\n').map((line, i) => (
                              <div key={i} className={line.includes('新增') ? 'bg-indigo-200 text-indigo-900 font-bold' : ''}>{line}</div>
                            ))}
                          </pre>
                       </div>
                     </div>
                   </div>

                   <div className={`p-4 rounded-lg border h-full transition-all duration-500 font-mono text-xs ${mode === 'diverged' ? 'bg-slate-100 border-slate-300' : mode === 'rebased' ? 'bg-orange-50 border-orange-300 shadow-md' : 'bg-blue-50 border-blue-300 shadow-md'}`}>
                      <div className="mb-4 font-bold text-slate-700 flex items-center gap-2 text-sm border-b pb-2">
                        {mode === 'diverged' ? '等待合併...' : 
                         mode === 'rebased' ? <><CheckCircle size={16} className="text-orange-600"/> Rebase：替換基底，再貼上你的修改</> : 
                         <><CheckCircle size={16} className="text-blue-600"/> Merge：保留各自歷史，直接融為一體</>}
                      </div>
                      
                      {mode === 'diverged' ? (
                         <div className="h-40 flex items-center justify-center text-slate-400 italic">請選擇上方按鈕查看結果</div>
                      ) : mode === 'rebased' ? (
                        <pre className="text-slate-700 whitespace-pre-wrap leading-loose">
                          {codeRebased.split('\n').map((line, i) => (
                             <div key={i} className={line.includes('你') ? 'bg-indigo-100 text-indigo-800 px-1 rounded' : line.includes('同事') ? 'bg-purple-100 text-purple-800 px-1 rounded' : ''}>{line}</div>
                          ))}
                        </pre>
                      ) : (
                        <pre className="text-slate-700 whitespace-pre-wrap leading-loose">
                          {codeMerged.split('\n').map((line, i) => (
                             <div key={i} className={line.includes('你') ? 'bg-indigo-100 text-indigo-800 px-1 rounded' : line.includes('同事') ? 'bg-purple-100 text-purple-800 px-1 rounded' : ''}>{line}</div>
                          ))}
                        </pre>
                      )}
                   </div>
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                <div className="relative min-w-[420px] max-w-lg h-64 mx-auto flex items-center justify-center border rounded bg-white">
                   <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                      <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold shadow">Base</div>
                   </div>

                   <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="80" y1="128" x2="160" y2="80" stroke="#9333ea" strokeWidth="3" strokeDasharray="5,5" />
                      {mode !== 'rebased' && <line x1="80" y1="128" x2="160" y2="176" stroke="#4f46e5" strokeWidth="3" strokeDasharray="5,5" />}
                      
                      {mode === 'merged' && (
                         <>
                           <line x1="200" y1="80" x2="320" y2="128" stroke="#9333ea" strokeWidth="3" />
                           <line x1="200" y1="176" x2="320" y2="128" stroke="#4f46e5" strokeWidth="3" />
                         </>
                      )}
                   </svg>

                   <div className="absolute left-40 top-[60px] flex flex-col items-center z-10">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow ring-4 ring-white">A</div>
                      <span className="text-xs text-purple-700 mt-1">Remote</span>
                   </div>

                   <div className={`absolute flex flex-col items-center z-10 transition-all duration-700 ease-in-out
                      ${mode === 'rebased' ? 'left-72 top-[60px]' : 'left-40 top-[156px]'}
                   `}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow ring-4 ring-white bg-indigo-600 text-white`}>
                         {mode === 'rebased' ? "B'" : "B"}
                      </div>
                      <span className="text-xs text-indigo-700 mt-1">Local</span>
                   </div>

                   {mode === 'rebased' && (
                      <div className="absolute left-[210px] top-[78px] w-16 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                   )}

                   {mode === 'merged' && (
                     <div className="absolute left-80 top-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow ring-4 ring-white">M</div>
                        <span className="text-xs text-green-700 mt-1">Merge</span>
                     </div>
                   )}
                </div>
                </div>
              )}
           </div>
          </div>
        </details>
      </section>


</div>);
};
