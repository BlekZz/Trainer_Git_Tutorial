import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Info, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';

// Card 依第一個 <h3> 的寫法自動套版型（課文不用改）：
// 「1. 標題」→ 換你了步驟卡（左側編號節點＋步驟線）
// 「我先示範：標題」→ 示範段（無外框、左側強調線）
// 「一起做：／一起想：…」等 → 白卡＋小標籤
const STEP_RE = /^(\d+)\.\s*(.+)$/s;
const PHASE_RE = /^(我先示範|一起[^：]{0,3}|獨立練習|減少提示|實際工作時)：\s*(.+)$/s;

const parseHeading = (children) => {
  const arr = React.Children.toArray(children);
  const first = arr[0];
  if (!React.isValidElement(first) || first.type !== 'h3' || typeof first.props.children !== 'string') return null;
  const text = first.props.children;
  let m = text.match(STEP_RE);
  if (m) return { kind: 'step', num: m[1], title: m[2], rest: arr.slice(1) };
  m = text.match(PHASE_RE);
  if (m) return { kind: 'phase', label: m[1], title: m[2], rest: arr.slice(1) };
  return null;
};

const stripSurface = (cls) => cls.replace(/\b(bg|border|shadow)-\S+/g, '').trim();

export const Card = ({ children, className = "" }) => {
  const h = parseHeading(children);
  const hasBg = /\bbg-/.test(className);
  const hasBorder = /\bborder-(?!t-|b-|l-|r-)/.test(className);
  const surface = `${hasBg ? '' : 'bg-white'} ${hasBorder ? 'border' : 'border border-line'}`;

  if (h?.kind === 'step') {
    return (
      <section className="step-card md:grid md:grid-cols-[32px_minmax(0,1fr)] md:gap-x-5">
        <span className="step-rail hidden md:block" aria-hidden="true" />
        <span className="relative z-10 mt-5 hidden h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-500 bg-white font-mono text-[13px] font-semibold text-indigo-600 md:flex" aria-hidden="true">
          {h.num}
        </span>
        <div className={`min-w-0 rounded-xl ${surface} p-4 sm:p-5 md:p-6 ${className}`}>
          <h3 className="flex items-start gap-2.5 text-lg font-bold text-ink">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-mono text-xs font-semibold text-white md:hidden" aria-hidden="true">{h.num}</span>
            <span><span className="sr-only">步驟 {h.num}：</span>{h.title}</span>
          </h3>
          {h.rest}
        </div>
      </section>
    );
  }

  if (h?.kind === 'phase' && h.label === '我先示範') {
    return (
      <section className={`border-l-[3px] border-indigo-500 pl-5 md:pl-6 py-1 ${stripSurface(className)}`}>
        <p className="text-xs font-semibold tracking-wider text-indigo-600">我先示範</p>
        <h3 className="text-lg font-bold text-ink">{h.title}</h3>
        {h.rest}
      </section>
    );
  }

  if (h?.kind === 'phase') {
    return (
      <section className={`rounded-xl border border-line bg-white p-4 sm:p-5 md:p-7 ${stripSurface(className)}`}>
        <p className="text-xs font-semibold tracking-wider text-slate-500">{h.label}</p>
        <h3 className="text-lg font-bold text-ink">{h.title}</h3>
        {h.rest}
      </section>
    );
  }

  return (
    <div className={`rounded-xl ${surface} p-4 sm:p-5 md:p-7 ${className}`}>
      {children}
    </div>
  );
};

export const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    gray: "bg-slate-100 text-slate-600",
    red: "bg-red-100 text-red-800",
    indigo: "bg-indigo-100 text-indigo-800",
    pink: "bg-pink-100 text-pink-800"
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-mono font-medium ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

// SectionTitle
// 課名：title="L2 第一次存檔" → 課號以小標顯示，課名為大標
// 動手段：kicker="換你了" → 段落分隔＋強調色標籤
export const SectionTitle = ({ title, subtitle, kicker }) => {
  if (kicker) {
    return (
      <div className="!mt-12 border-t border-line pt-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold tracking-wider text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
          {kicker}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-ink">{title}</h2>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
    );
  }
  const m = typeof title === 'string' ? title.match(/^([LE]\d+)\s+(.+)$/) : null;
  return (
    <div className="mb-2">
      {m && <p className="font-mono text-sm font-medium text-indigo-600">{m[1]}</p>}
      <h2 className="text-[1.75rem] md:text-[2.125rem] font-bold leading-tight text-ink">{m ? m[2] : title}</h2>
      {subtitle && <p className="mt-3 text-base md:text-lg text-slate-600">{subtitle}</p>}
    </div>
  );
};

export const InstructionalText = ({ title, children, icon }) => (
  <div className="border-l-[3px] border-slate-300 bg-white rounded-r-lg p-5 mb-6 text-slate-700 text-sm">
    <h4 className="font-bold text-ink mb-2 flex items-center gap-2">
      {icon ? icon : null}
      {title}
    </h4>
    {children}
  </div>
);

// CommandBlock — 給「要打在終端機的指令」或「預期輸出」用
// <CommandBlock command={"git add .\ngit commit -m \"訊息\""} comment="把改動存檔" />
// <CommandBlock variant="output" command="On branch main\nnothing to commit" />
export const CommandBlock = ({ command, comment, variant = 'input', className = '' }) => {
  const [copied, setCopied] = useState(false);
  const lines = String(command).split('\n');
  const isOutput = variant === 'output';

  const handleCopy = () => {
    const plain = lines.map((l) => l.replace(/^\$ ?/, '')).join('\n');
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-lg overflow-hidden ${isOutput ? 'border border-line bg-slate-50' : 'bg-term ring-1 ring-black/5'} ${className}`}>
      <div className={`px-3 flex items-center justify-between border-b ${isOutput ? 'py-1.5 bg-slate-100 border-line' : 'py-0.5 bg-slate-800 border-slate-700'}`}>
        <div className={`flex items-center gap-1.5 text-xs ${isOutput ? 'text-slate-500' : 'text-slate-400'}`}>
          <Terminal size={12} aria-hidden="true" />
          <span>{isOutput ? '輸出範例：你會看到類似這樣（不用輸入）' : '在你的終端機輸入'}</span>
        </div>
        {!isOutput && (
          <button
            type="button"
            onClick={handleCopy}
            className="-mr-2 flex min-h-[44px] items-center gap-1 rounded px-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="複製指令"
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-400" aria-hidden="true" />
                <span className="text-green-400">已複製</span>
              </>
            ) : (
              <>
                <Copy size={12} aria-hidden="true" />
                <span>複製</span>
              </>
            )}
          </button>
        )}
      </div>
      <div className="p-3 font-mono text-sm whitespace-pre-wrap break-all">
        {comment && <div className={`${isOutput ? 'text-slate-500' : 'text-slate-400'} text-xs mb-1`}># {comment}</div>}
        {lines.map((line, i) => (
          <div key={i} className={isOutput ? 'text-slate-700 min-h-[1.25em]' : 'text-slate-100'}>
            {isOutput ? line : (
              <>
                <span className="text-green-400">$ </span>
                {line}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Callout — 統一的語意提示框
// <Callout variant="info" title="補充說明">內容</Callout>
export const Callout = ({ variant = 'info', title, children, className = '' }) => {
  const variants = {
    info: {
      wrap: 'bg-[#F1F5FA] border-[#3E6BA8]',
      title: 'text-[#24476F]',
      icon: <Info size={18} className="text-[#3E6BA8]" aria-hidden="true" />,
    },
    warning: {
      wrap: 'bg-amber-50 border-amber-500',
      title: 'text-amber-900',
      icon: <AlertTriangle size={18} className="text-amber-600" aria-hidden="true" />,
    },
    danger: {
      wrap: 'bg-red-50 border-red-600',
      title: 'text-red-800',
      icon: <AlertOctagon size={18} className="text-red-600" aria-hidden="true" />,
    },
    success: {
      wrap: 'bg-green-50 border-green-600',
      title: 'text-green-800',
      icon: <CheckCircle size={18} className="text-green-600" aria-hidden="true" />,
    },
  };
  const v = variants[variant] || variants.info;

  return (
    <div className={`flex items-start gap-3 rounded-r-lg border-l-[3px] px-4 py-3 md:px-5 md:py-4 text-slate-800 ${v.wrap} ${className}`}>
      <div className="shrink-0 mt-1">{v.icon}</div>
      <div className="min-w-0 text-[0.9375rem] leading-relaxed">
        {title && <p className={`font-bold mb-1 ${v.title}`}>{title}</p>}
        {children}
      </div>
    </div>
  );
};

// NoOutputHint — 標示「這條指令成功時完全沒有輸出」，解決初學者盯著空白畫面以為失敗的問題
// 放在對應的 CommandBlock 正下方使用
// <NoOutputHint /> 或 <NoOutputHint>自訂補充文字</NoOutputHint>
export const NoOutputHint = ({ children, className = '' }) => (
  <div className={`flex items-start gap-2 rounded-b-lg border border-t-0 border-slate-200 bg-slate-50 px-3 py-2 -mt-1 ${className}`}>
    <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
    <p className="text-xs leading-relaxed text-slate-600">
      <span className="font-bold text-slate-700">按 Enter 後畫面不會出現任何訊息</span>
      ——這就是成功了。終端機的習慣是「沒消息就是好消息」，直接輸入下一條指令即可。
      {children && <span className="block mt-1">{children}</span>}
    </p>
  </div>
);

// FalseAlarm — 「看起來像錯誤，其實完全正常」的統一提醒框
// signal: 學員實際會在畫面上看到的嚇人文字（等寬字型顯示）
// <FalseAlarm signal={'warning: LF will be replaced by CRLF in xxx.md'}>這只是換行符號提醒…</FalseAlarm>
export const FalseAlarm = ({ signal, title = '看到這個不用慌 — 這不是錯誤', children, className = '' }) => (
  <div className={`rounded-lg border border-amber-200 bg-amber-50/60 p-4 md:p-5 ${className}`}>
    <p className="font-bold text-amber-900 text-sm mb-2 flex items-center gap-2">
      <AlertTriangle size={16} className="text-amber-600 shrink-0" aria-hidden="true" />
      {title}
    </p>
    {signal && (
      <div className="bg-term rounded-md px-3 py-2 mb-2 font-mono text-xs leading-relaxed text-amber-300 whitespace-pre-wrap break-all">
        {signal}
      </div>
    )}
    <div className="text-[0.9375rem] leading-relaxed text-slate-800">{children}</div>
  </div>
);

// Quiz — 章末自我檢測
// <Quiz questions={[{ q: '問題？', options: ['選項A', '選項B', '選項C'], answer: 0, explain: '解析' }]} />
export const Quiz = ({ title = '小測驗：檢查你有沒有真的懂', questions }) => {
  const [answers, setAnswers] = useState({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
  const allDone = answeredCount === questions.length;

  return (
    <div className="mt-12 bg-white border border-line rounded-xl p-4 sm:p-5 md:p-7">
      <p className="text-xs font-semibold tracking-wider text-indigo-600">章末自我檢測</p>
      <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-5">答錯沒關係——看完解析弄懂，比第一次就答對更重要。</p>
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const picked = answers[qi];
          const isAnswered = picked !== undefined;
          return (
            <div key={qi}>
              <p className="text-sm font-medium text-slate-800 mb-2">
                {qi + 1}. {q.q}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.answer;
                  const isPicked = picked === oi;
                  let style = 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700';
                  if (isAnswered) {
                    if (isCorrect) style = 'bg-green-50 border-green-400 text-green-900';
                    else if (isPicked) style = 'bg-red-50 border-red-300 text-red-800';
                    else style = 'bg-white border-slate-200 text-slate-500';
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      className={`w-full text-left text-sm border rounded-lg px-3 py-2.5 min-h-[44px] transition-colors flex items-start gap-2 disabled:cursor-default ${style}`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {isAnswered && isCorrect && <Check size={15} className="text-green-600" aria-hidden="true" />}
                        {isAnswered && isPicked && !isCorrect && <AlertOctagon size={15} className="text-red-500" aria-hidden="true" />}
                        {(!isAnswered || (!isCorrect && !isPicked)) && <span className="inline-block w-[15px]" />}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <div className={`mt-2 text-sm rounded-lg px-3 py-2 ${picked === q.answer ? 'bg-green-50 text-green-900' : 'bg-amber-50 text-amber-900'}`}>
                  {picked === q.answer ? <strong>答對了。</strong> : <strong>再想一下：</strong>}
                  {q.explain}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {allDone && (
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-700">
            結果：{correctCount} / {questions.length} 題答對
            {correctCount === questions.length ? '，全對！' : ''}
          </span>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            重新作答
          </button>
        </div>
      )}
    </div>
  );
};

export const TerminalSim = ({ logs, onCommand, promptLabel = "~/project (main)", height="h-64" }) => {
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    const container = endRef.current?.parentElement;
    if (container) container.scrollTop = container.scrollHeight;
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (onCommand) onCommand(input);
    setInput("");
  };

  return (
    <div className={`bg-term rounded-lg overflow-hidden font-mono text-sm text-slate-300 ring-1 ring-black/5 flex flex-col ${height}`}>
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
        <span className="ml-2 text-xs text-slate-400">bash — git simulation</span>
      </div>
      <div className="p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        {logs.map((log, i) => (
          <div key={i} className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-slate-300'} mb-1 break-all`}>
            {log.prefix && <span className="text-slate-500 mr-2 select-none">{log.prefix}</span>}
            {log.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {onCommand ? (
        <form onSubmit={handleSubmit} className="p-2 bg-slate-800 flex items-center shrink-0">
          <span className="text-green-400 mr-2">➜</span>
          <span className="text-cyan-400 mr-2 whitespace-nowrap">{promptLabel}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-slate-400 min-w-0"
            placeholder="輸入指令試試看..."
          />
        </form>
      ) : (
        <div className="px-3 py-2 bg-slate-800 shrink-0 text-xs text-slate-300">
          此終端機為自動示範（唯讀），請點擊教學步驟按鈕
        </div>
      )}
    </div>
  );
};

// Screenshot — GitHub／VSCode 操作截圖（Sprint §7）
// id 對應 public/screenshots/<id>.png；檔案還沒補時顯示「截圖待補」佔位框，讓文字可先寫、圖後補。
// caption 一律寫「你會看到…」。點圖會在新分頁開原圖放大看。
export const Screenshot = ({ id, alt, caption, className = '' }) => {
  const [missing, setMissing] = useState(false);
  const src = `${import.meta.env.BASE_URL}screenshots/${id}.png`;
  // L6–L8 與作業頁的 GitHub 截圖是深色主題拍的（2026-10-31），學員多半看到淺色，圖說統一提醒
  const isGithub = /^(L6|L7|L8|HW)-/.test(id);
  return (
    <figure className={`my-4 ${className}`}>
      {missing ? (
        <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          截圖待補：<span className="font-mono">{id}</span>
        </div>
      ) : (
        <a href={src} target="_blank" rel="noreferrer" title="點一下開新分頁看大圖">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setMissing(true)}
            className="block max-w-full h-auto rounded-lg border border-slate-200 shadow-sm"
          />
        </a>
      )}
      {(caption || !missing) && (
        <figcaption className="mt-2 text-sm text-slate-600 leading-relaxed">
          {caption}
          {!missing && (
            <span className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-500">
              {isGithub && <span>這張是 GitHub 深色主題；你的畫面可能是白底，按鈕位置和文字相同。</span>}
              <span className="sm:hidden">點圖可放大</span>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

// SuccessCheck — 關鍵步驟後的「成功的話你會看到…」卡片，終端機與 GitHub 網頁兩邊並列核對
// terminal / web：字串或節點陣列，各列一個要看到的訊號；fail：沒看到時先做什麼
// <SuccessCheck terminal={['最後一行有 main -> main']} web={['重新整理後看到檔案']} fail="先別重做，回第 4 步核對" />
export const SuccessCheck = ({ title = '成功的話你會看到', terminal = [], vscode = [], web = [], fail, className = '' }) => {
  const cols = [['終端機', terminal], ['VSCode 畫面', vscode], ['GitHub 網頁（按 F5 重新整理後）', web]].filter(([, items]) => items.length > 0);
  return (
  <div className={`rounded-lg border border-green-200 border-l-4 border-l-green-600 bg-green-50 p-4 md:p-5 ${className}`}>
    <p className="font-bold text-green-800 text-sm mb-3 flex items-center gap-2">
      <CheckCircle size={18} className="text-green-600 shrink-0" aria-hidden="true" />
      {title}
    </p>
    <div className={`grid gap-3 ${cols.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {cols.map(([label, items]) => (
        <div key={label} className="min-w-0 rounded-md bg-white border border-green-200 p-3">
          <p className="text-xs font-bold text-slate-500 mb-1">{label}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-800">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      ))}
    </div>
    {fail && <p className="text-sm text-green-900 mt-2"><strong>沒看到：</strong>{fail}</p>}
  </div>
  );
};
