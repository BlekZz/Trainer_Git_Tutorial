import React, { useState, useEffect, useRef } from 'react';
import { GitGraph, Map, Play, Download, GitBranch, RefreshCw, Users, Rocket, Ambulance, Bot, CheckCircle, ArrowLeft, ArrowRight, Wrench, Menu, X } from 'lucide-react';

import { Lesson0Setup } from './components/Lesson0Setup';
import { Lesson1Concept } from './components/Lesson1Concept';
import { Lesson2FirstCommit } from './components/Lesson2FirstCommit';
import { Lesson3DiffRestore } from './components/Lesson3DiffRestore';
import { Lesson4Branch } from './components/Lesson4Branch';
import { Lesson5LocalConflict } from './components/Lesson5LocalConflict';
import { Lesson6Push } from './components/Lesson6Push';
import { Lesson7PR } from './components/Lesson7PR';
import { Lesson8Sync } from './components/Lesson8Sync';
import { Lesson9AiLog } from './components/Lesson9AiLog';
import { Homework } from './components/Homework';
import { Elective1Rebase } from './components/Elective1Rebase';
import { Elective2Fork } from './components/Elective2Fork';
import { Elective3Misc } from './components/Elective3Misc';
import { ErrorRoom } from './components/ErrorRoom';

const VISITED_KEY = 'gtm-visited';

const tabs = [
  { id: 'setup', label: 'L0 行前準備', group: 'Part 0 準備', icon: <Wrench size={16} /> },
  { id: 'concept', label: 'L1 觀念', group: 'Part 1 單機', icon: <GitGraph size={16} /> },
  { id: 'first-commit', label: 'L2 第一次存檔', group: 'Part 1 單機', icon: <Play size={16} /> },
  { id: 'diff-restore', label: 'L3 看差異與還原', group: 'Part 1 單機', icon: <Map size={16} /> },
  { id: 'branch', label: 'L4 分支', group: 'Part 1 單機', icon: <GitBranch size={16} /> },
  { id: 'local-conflict', label: 'L5 本機衝突', group: 'Part 1 單機', icon: <RefreshCw size={16} /> },
  { id: 'push', label: 'L6 GitHub 與第一次 push', group: 'Part 2 上雲與協作', icon: <Rocket size={16} /> },
  { id: 'pr', label: 'L7 分支上雲與自己的 PR', group: 'Part 2 上雲與協作', icon: <Users size={16} /> },
  { id: 'sync', label: 'L8 兩台電腦的同步', group: 'Part 2 上雲與協作', icon: <Download size={16} /> },
  { id: 'ai-log', label: 'L9 讓 AI 讀懂你的紀錄', group: 'Part 2 上雲與協作', icon: <Bot size={16} /> },
  { id: 'homework', label: '作業：我的 Git 日誌', group: 'Part 3 作業', icon: <CheckCircle size={16} /> },
  { id: 'e1-rebase', label: 'E1 Merge 與 Rebase', group: 'Part 4 選修', icon: <GitBranch size={16} /> },
  { id: 'e2-fork', label: 'E2 參與別人的專案', group: 'Part 4 選修', icon: <Users size={16} /> },
  { id: 'e3-misc', label: 'E3 暫放改動、回到分支、修改存檔說明', group: 'Part 4 選修', icon: <Wrench size={16} /> },
  { id: 'errors', label: '錯誤急診室', group: '急診室', icon: <Ambulance size={16} /> },
];
const groups = ["Part 0 準備","Part 1 單機","Part 2 上雲與協作","Part 3 作業","Part 4 選修","急診室"];
const chapterIds = tabs.slice(0, 11).map(t => t.id);
const legacyHashes = { flow: 'concept', pathA: 'first-commit', pathB: 'first-commit', team: 'pr', practice: 'e2-fork' };

const getVisited = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]'));
  } catch {
    return new Set();
  }
};

const validTabIds = new Set(tabs.map((t) => t.id));

// 「L2 第一次存檔」→ { code: 'L2', title: '第一次存檔' }
const splitLabel = (label) => {
  const m = label.match(/^([LE]\d+)\s+(.+)$/);
  return m ? { code: m[1], title: m[2] } : { code: null, title: label };
};

const getInitialTab = () => {
  const hash = window.location.hash.replace('#', '');
  return legacyHashes[hash] || (validTabIds.has(hash) ? hash : tabs[0].id);
};

const App = () => {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [navOpen, setNavOpen] = useState(false);
  const closeRef = useRef(null);
  const [visited, setVisited] = useState(() => {
    const initial = getVisited();
    const first = getInitialTab();
    if (chapterIds.includes(first)) initial.add(first);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...initial]));
    return initial;
  });

  const navigateTo = (tabId) => {
    if (chapterIds.includes(tabId)) {
      setVisited((prev) => {
        if (prev.has(tabId)) return prev;
        const next = new Set(prev);
        next.add(tabId);
        localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
        return next;
      });
    }
    if (window.location.hash !== `#${tabId}`) window.location.hash = tabId;
    setActiveTab(tabId);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = legacyHashes[hash] || (validTabIds.has(hash) ? hash : tabs[0].id);
    if (hash !== target) window.history.replaceState(null, '', `#${target}`);
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      const target = legacyHashes[hash] || (validTabIds.has(hash) ? hash : tabs[0].id);
      if (hash !== target) window.history.replaceState(null, '', `#${target}`);
      navigateTo(target);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [activeTab]);

  useEffect(() => {
    if (!navOpen) return undefined;
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setNavOpen(false); return; }
      if (e.key !== 'Tab') return;
      const box = document.getElementById('mobile-nav');
      const items = box ? [...box.querySelectorAll('button, a[href]')] : [];
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (opener && opener.focus) opener.focus();
    };
  }, [navOpen]);

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const progressCount = chapterIds.filter((id) => visited.has(id)).length;
  const progressPct = Math.round((progressCount / chapterIds.length) * 100);

  const prevTab = currentIndex > 0 ? tabs[currentIndex - 1] : null;
  const nextTab = currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : null;

  const activeMeta = tabs[currentIndex];

  const go = (id) => { setNavOpen(false); navigateTo(id); };

  const navContent = (
    <nav aria-label="課程目錄" className="px-5 pb-8">
      {groups.filter((g) => g !== '急診室').map((group) => {
        const items = tabs.filter((t) => t.group === group);
        const isBranch = group === 'Part 4 選修';
        return (
          <div key={group} className="mt-6 first:mt-2">
            <p className="mb-1 pl-8 text-[11px] font-semibold tracking-wider text-slate-500">
              {group.replace(/^Part (\d) /, 'PART $1 · ')}{isBranch && <span className="font-normal">（支線，學完作業再來）</span>}
            </p>
            <ul className="relative">
              {items.map((tab, i) => {
                const active = tab.id === activeTab;
                const seen = visited.has(tab.id);
                const { code, title } = splitLabel(tab.label);
                const lane = isBranch ? 'left-[23px]' : 'left-[9px]';
                return (
                  <li key={tab.id} className="relative">
                    <span aria-hidden="true" className={`absolute ${lane} w-[2px] bg-slate-200 ${i === 0 ? 'top-1/2' : 'top-0'} ${i === items.length - 1 && isBranch ? 'bottom-1/2' : 'bottom-0'}`} />
                    {isBranch && i === 0 && (
                      <span aria-hidden="true" className="absolute left-[9px] top-0 h-1/2 w-[16px] rounded-bl-lg border-b-2 border-l-2 border-slate-200" />
                    )}
                    <button
                      type="button"
                      onClick={() => go(tab.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative flex w-full items-center gap-3 rounded-md min-h-[44px] py-2 pr-2 text-left text-sm transition-colors lg:min-h-0 lg:py-1.5 ${isBranch ? 'pl-11' : 'pl-8'} ${active ? 'bg-indigo-50 font-semibold text-ink' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'}`}
                    >
                      <span aria-hidden="true" className={`absolute top-1/2 -translate-y-1/2 rounded-full ${isBranch ? 'left-[18px]' : 'left-[4px]'} ${active ? 'h-3 w-3 bg-indigo-500 ring-4 ring-indigo-100' : seen ? 'h-3 w-3 bg-slate-700' : 'h-3 w-3 border-2 border-slate-300 bg-white'}`} />
                      {code && <span className={`w-7 shrink-0 font-mono text-xs ${active ? 'text-indigo-600' : 'text-slate-500'}`}>{code}</span>}
                      <span className="min-w-0 flex-1 leading-snug">{title}</span>
                      {seen && !active && <span className="sr-only">（已讀）</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => go('errors')}
        aria-current={activeTab === 'errors' ? 'page' : undefined}
        className={`mt-8 flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${activeTab === 'errors' ? 'border-red-300 bg-red-50 font-semibold text-red-800' : 'border-line bg-white text-slate-700 hover:border-red-200 hover:bg-red-50/60'}`}
      >
        <Ambulance size={16} className="shrink-0 text-red-600" aria-hidden="true" />
        <span className="flex-1">錯誤急診室<span className="block text-xs font-normal text-slate-500">看到紅字時，用原文來查</span></span>
      </button>
    </nav>
  );

  const brand = (
    <a href="#setup" onClick={(e) => { e.preventDefault(); go('setup'); }} className="flex items-center gap-3 rounded-md">
      <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="h-8 w-8" />
      <span className="leading-tight">
        <span className="block text-[15px] font-bold text-ink">Git 時光機實驗室</span>
        <span className="block text-xs text-slate-500">零基礎 Git 互動教學</span>
      </span>
    </a>
  );

  const progress = (
    <div className="px-5 pb-2 pt-5">
      <div className="flex items-baseline justify-between text-xs text-slate-500">
        <span>主線進度</span>
        <span className="font-mono text-slate-700">{progressCount} / {chapterIds.length}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={progressCount} aria-valuemin={0} aria-valuemax={chapterIds.length} aria-label="主線已讀課數">
        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <a href="#main" className="skip-link">跳到課文</a>

      {/* 桌機：左側固定目錄 */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-line bg-white lg:flex">
        <div className="border-b border-line px-5 py-5">{brand}</div>
        <div className="nav-scroll flex-1 overflow-y-auto">
          {progress}
          {navContent}
        </div>
      </aside>

      {/* 手機：抽屜目錄 */}
      {navOpen && (
        <div id="mobile-nav" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="課程目錄">
          <button type="button" aria-label="關閉目錄" className="absolute inset-0 bg-ink/40" onClick={() => setNavOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-white shadow-xl animate-slide-in">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              {brand}
              <button type="button" ref={closeRef} onClick={() => setNavOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100" aria-label="關閉目錄">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {progress}
              {navContent}
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        {/* 上方細列：目前位置與進度 */}
        <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-[60rem] items-center gap-3 px-4 md:px-8 xl:px-10">
            <button type="button" onClick={() => setNavOpen(true)} aria-expanded={navOpen} aria-controls="mobile-nav" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-md text-slate-700 hover:bg-slate-200/60 lg:hidden" aria-label="打開課程目錄">
              <Menu size={20} aria-hidden="true" />
            </button>
            <p className="min-w-0 flex-1 truncate text-sm text-slate-500">
              <span className="hidden sm:inline">{activeMeta.group}<span className="mx-2 text-slate-300">/</span></span>
              <span className="font-medium text-ink">{activeMeta.label}</span>
            </p>
            <span className="shrink-0 text-xs text-slate-500 lg:hidden">已讀 {progressCount} / {chapterIds.length}</span>
          </div>
        </header>

        <main id="main" tabIndex={-1} className="mx-auto max-w-[60rem] px-4 pb-16 pt-8 md:px-8 md:pt-12 xl:px-10 focus:outline-none">
          <div className="lesson">
            {activeTab === 'setup' && <Lesson0Setup />}
            {activeTab === 'concept' && <Lesson1Concept />}
            {activeTab === 'first-commit' && <Lesson2FirstCommit />}
            {activeTab === 'diff-restore' && <Lesson3DiffRestore />}
            {activeTab === 'branch' && <Lesson4Branch />}
            {activeTab === 'local-conflict' && <Lesson5LocalConflict />}
            {activeTab === 'push' && <Lesson6Push />}
            {activeTab === 'pr' && <Lesson7PR />}
            {activeTab === 'sync' && <Lesson8Sync />}
            {activeTab === 'ai-log' && <Lesson9AiLog />}
            {activeTab === 'homework' && <Homework />}
            {activeTab === 'e1-rebase' && <Elective1Rebase />}
            {activeTab === 'e2-fork' && <Elective2Fork />}
            {activeTab === 'e3-misc' && <Elective3Misc />}
            {activeTab === 'errors' && <ErrorRoom />}
          </div>

          {/* 上一課／下一課 */}
          <nav aria-label="上一課與下一課" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {prevTab ? (
              <button type="button" onClick={() => navigateTo(prevTab.id)} className="group flex flex-col items-start rounded-xl border border-line bg-white px-5 py-4 text-left transition-colors hover:border-slate-300">
                <span className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft size={14} aria-hidden="true" />上一課</span>
                <span className="mt-1 font-semibold text-ink group-hover:text-indigo-600">{prevTab.label}</span>
              </button>
            ) : <span className="hidden sm:block" />}
            {nextTab && (
              <button type="button" onClick={() => navigateTo(nextTab.id)} className="group flex flex-col items-end rounded-xl border border-indigo-600 bg-indigo-600 px-5 py-4 text-right text-white transition-colors hover:bg-indigo-700">
                <span className="flex items-center gap-1 text-xs text-white">下一課<ArrowRight size={14} aria-hidden="true" /></span>
                <span className="mt-1 font-semibold">{nextTab.label}</span>
              </button>
            )}
          </nav>
        </main>

        <footer className="border-t border-line py-8 text-center text-xs text-slate-500">
          Git 時光機實驗室 · 給第一次打開終端機的你
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.2s ease-out; }
      `}</style>
    </div>
  );
};


export default App;
