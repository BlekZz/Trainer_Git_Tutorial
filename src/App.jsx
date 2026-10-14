import React, { useState, useEffect } from 'react';
import { GitGraph, Map, Play, Download, GitBranch, RefreshCw, Users, Rocket, Ambulance, CheckCircle, ArrowLeft, ArrowRight, Wrench } from 'lucide-react';

import { Lesson0Setup } from './components/Lesson0Setup';
import { Lesson1Concept } from './components/Lesson1Concept';
import { Lesson2FirstCommit } from './components/Lesson2FirstCommit';
import { Lesson3DiffRestore } from './components/Lesson3DiffRestore';
import { Lesson4Branch } from './components/Lesson4Branch';
import { Lesson5LocalConflict } from './components/Lesson5LocalConflict';
import { Lesson6Push } from './components/Lesson6Push';
import { Lesson7PR } from './components/Lesson7PR';
import { Lesson8Sync } from './components/Lesson8Sync';
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
  { id: 'push', label: 'L6 GitHub 與第一次 push', group: 'Part 2 上雲', icon: <Rocket size={16} /> },
  { id: 'pr', label: 'L7 分支上雲與自己的 PR', group: 'Part 2 上雲', icon: <Users size={16} /> },
  { id: 'sync', label: 'L8 兩台電腦的同步', group: 'Part 2 上雲', icon: <Download size={16} /> },
  { id: 'homework', label: '作業：我的 Git 日誌', group: 'Part 3 作業', icon: <CheckCircle size={16} /> },
  { id: 'e1-rebase', label: 'E1 Merge vs Rebase', group: 'Part 4 選修', icon: <GitBranch size={16} /> },
  { id: 'e2-fork', label: 'E2 參與別人的專案', group: 'Part 4 選修', icon: <Users size={16} /> },
  { id: 'e3-misc', label: 'E3 stash 與其他', group: 'Part 4 選修', icon: <Wrench size={16} /> },
  { id: 'errors', label: '🚑 急診室', group: '急診室', icon: <Ambulance size={16} /> },
];
const groups = ["Part 0 準備","Part 1 單機","Part 2 上雲","Part 3 作業","Part 4 選修","急診室"];
const chapterIds = tabs.slice(0, 10).map(t => t.id);
const legacyHashes = { flow: 'concept', pathA: 'first-commit', pathB: 'first-commit', team: 'pr', practice: 'e2-fork' };

const getVisited = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]'));
  } catch {
    return new Set();
  }
};

const validTabIds = new Set(tabs.map((t) => t.id));

const getInitialTab = () => {
  const hash = window.location.hash.replace('#', '');
  return legacyHashes[hash] || (validTabIds.has(hash) ? hash : tabs[0].id);
};

const App = () => {
  const [activeTab, setActiveTab] = useState(getInitialTab);
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

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const progressCount = chapterIds.filter((id) => visited.has(id)).length;
  const progressPct = Math.round((progressCount / chapterIds.length) * 100);

  const prevTab = currentIndex > 0 ? tabs[currentIndex - 1] : null;
  const nextTab = currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <GitGraph size={200} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Git 時光機實驗室 🚀</h1>
          <p className="text-slate-400 text-lg">
            從零開始，透過互動視覺化理解版本控制的核心邏輯
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 -mt-8 relative z-20 pb-20">

        {/* Navigation Tabs */}
        <div className="mb-3 bg-white p-3 rounded-xl shadow-lg border border-slate-200 space-y-3">
          {groups.map(group => (
            <div key={group}>
              <div className="text-xs font-bold text-slate-500 mb-2">{group}</div>
              <div role="tablist" aria-label={group} className="flex flex-wrap gap-2 min-w-0">
                {tabs.filter(tab => tab.group === group).map(tab => (
                  <button key={tab.id} role="tab" aria-selected={activeTab === tab.id}
                    onClick={() => navigateTo(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-left max-w-full transition-colors ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-600 hover:text-indigo-600'}`}>
                    <span className="shrink-0">{tab.icon}</span>
                    <span>{tab.label}{tab.id.startsWith('e') && tab.id !== 'errors' && <span className="block text-xs opacity-75">學完作業再來</span>}</span>
                    {chapterIds.includes(tab.id) && visited.has(tab.id) && <CheckCircle size={12} className="shrink-0" aria-label="已造訪" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-10 min-h-[600px] transition-all overflow-hidden">
          {activeTab === 'setup' && <Lesson0Setup />}
          {activeTab === 'concept' && <Lesson1Concept />}
          {activeTab === 'first-commit' && <Lesson2FirstCommit />}
          {activeTab === 'diff-restore' && <Lesson3DiffRestore />}
          {activeTab === 'branch' && <Lesson4Branch />}
          {activeTab === 'local-conflict' && <Lesson5LocalConflict />}
          {activeTab === 'push' && <Lesson6Push />}
          {activeTab === 'pr' && <Lesson7PR />}
          {activeTab === 'sync' && <Lesson8Sync />}
          {activeTab === 'homework' && <Homework />}
          {activeTab === 'e1-rebase' && <Elective1Rebase />}
          {activeTab === 'e2-fork' && <Elective2Fork />}
          {activeTab === 'e3-misc' && <Elective3Misc />}
          {activeTab === 'errors' && <ErrorRoom />}
        </div>

        {/* Chapter navigation */}
        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          {prevTab ? (
            <button
              onClick={() => navigateTo(prevTab.id)}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              上一章：{prevTab.label.replace(/^\d+\.\s*/, '').replace('🚑 ', '')}
            </button>
          ) : <span />}

          {nextTab && (
            <button
              onClick={() => navigateTo(nextTab.id)}
              className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-indigo-700 transition-colors"
            >
              {nextTab.id === 'errors'
                ? '🚑 錯誤急診室'
                : `下一章：${nextTab.label.replace(/^\d+\.\s*/, '')}`}
              <ArrowRight size={16} />
            </button>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 py-8 text-sm">
        <p>Built for learning Git fundamentals.</p>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
