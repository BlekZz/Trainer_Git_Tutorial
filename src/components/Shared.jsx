import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Info, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

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

export const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6 border-l-4 border-indigo-500 pl-4">
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

export const InstructionalText = ({ title, children, icon }) => (
  <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-5 mb-6 text-slate-700 leading-relaxed text-sm">
    <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
      {icon ? icon : <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
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
    <div className={`bg-slate-900 rounded-lg overflow-hidden shadow-md ${className}`}>
      <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Terminal size={12} aria-hidden="true" />
          <span>{isOutput ? '你會看到類似這樣的輸出' : '在你的終端機輸入'}</span>
        </div>
        {!isOutput && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
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
        {comment && <div className="text-slate-400 text-xs mb-1"># {comment}</div>}
        {lines.map((line, i) => (
          <div key={i} className={isOutput ? 'text-slate-300' : 'text-slate-100'}>
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
      wrap: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info size={18} className="text-blue-500" aria-hidden="true" />,
    },
    warning: {
      wrap: 'bg-amber-50 border-amber-300 text-amber-900',
      icon: <AlertTriangle size={18} className="text-amber-500" aria-hidden="true" />,
    },
    danger: {
      wrap: 'bg-red-50 border-red-300 text-red-900',
      icon: <AlertOctagon size={18} className="text-red-500" aria-hidden="true" />,
    },
    success: {
      wrap: 'bg-green-50 border-green-300 text-green-900',
      icon: <CheckCircle size={18} className="text-green-500" aria-hidden="true" />,
    },
  };
  const v = variants[variant] || variants.info;

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-3 md:p-4 ${v.wrap} ${className}`}>
      <div className="shrink-0 mt-0.5">{v.icon}</div>
      <div className="text-sm leading-relaxed">
        {title && <p className="font-bold mb-1">{title}</p>}
        {children}
      </div>
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
    <div className={`bg-slate-900 rounded-lg overflow-hidden font-mono text-sm text-slate-300 shadow-xl flex flex-col ${height}`}>
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
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
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-slate-600 min-w-0"
            placeholder="輸入指令試試看..."
          />
        </form>
      ) : (
        <div className="px-3 py-2 bg-slate-800 shrink-0 text-[11px] text-slate-500 italic">
          此終端機為自動示範（唯讀），請點擊教學步驟按鈕
        </div>
      )}
    </div>
  );
};
