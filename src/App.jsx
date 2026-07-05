import React, { useState, useEffect } from 'react';
import { GitGraph, Map, Play, Download, GitBranch, RefreshCw, Users, Rocket, Ambulance, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

import { Chapter1Concept } from './components/Chapter1Concept';
import { Chapter2Flowchart } from './components/Chapter2Flowchart';
import { Chapter3PathA } from './components/Chapter3PathA';
import { Chapter4PathB } from './components/Chapter4PathB';
import { Chapter5Branch } from './components/Chapter5Branch';
import { Chapter6Sync } from './components/Chapter6Sync';
import { Chapter7Team } from './components/Chapter7Team';
import { Chapter8Practice } from './components/Chapter8Practice';
import { ErrorRoom } from './components/ErrorRoom';

const VISITED_KEY = 'gtm-visited';

const tabs = [
  { id: 'concept', label: '1. 觀念與準備', shortLabel: '觀念', icon: <GitGraph size={16} /> },
  { id: 'flow', label: '2. 流程總覽', shortLabel: '流程', icon: <Map size={16} /> },
  { id: 'pathA', label: '3. 情境 A', shortLabel: '情境A', icon: <Play size={16} /> },
  { id: 'pathB', label: '4. 情境 B', shortLabel: '情境B', icon: <Download size={16} /> },
  { id: 'branch', label: '5. 分支跳躍', shortLabel: '分支', icon: <GitBranch size={16} /> },
  { id: 'sync', label: '6. 同步與衝突', shortLabel: '同步', icon: <RefreshCw size={16} /> },
  { id: 'team', label: '7. 團隊與 PR', shortLabel: 'PR', icon: <Users size={16} /> },
  { id: 'practice', label: '8. 實戰演練', shortLabel: '實戰', icon: <Rocket size={16} /> },
  { id: 'errors', label: '🚑 急診室', shortLabel: '急診室', icon: <Ambulance size={16} /> },
];

const chapterIds = tabs.filter((t) => t.id !== 'errors').map((t) => t.id);

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
  return validTabIds.has(hash) ? hash : tabs[0].id;
};

const App = () => {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [visited, setVisited] = useState(() => {
    const initial = getVisited();
    const first = getInitialTab();
    if (first !== 'errors') initial.add(first);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...initial]));
    return initial;
  });

  const navigateTo = (tabId) => {
    if (tabId !== 'errors') {
      setVisited((prev) => {
        if (prev.has(tabId)) return prev;
        const next = new Set(prev);
        next.add(tabId);
        localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
        return next;
      });
    }
    setActiveTab(tabId);
  };

  const isFirstHashSync = React.useRef(true);
  useEffect(() => {
    if (isFirstHashSync.current) {
      isFirstHashSync.current = false;
      window.history.replaceState(null, '', `#${activeTab}`);
    } else {
      window.location.hash = activeTab;
    }
    window.scrollTo({ top: 0 });
  }, [activeTab]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (validTabIds.has(hash)) navigateTo(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
        <div
          role="tablist"
          aria-label="章節導覽"
          className="flex sm:flex-wrap gap-2 mb-1 bg-white p-2 rounded-xl shadow-lg border border-slate-200 overflow-x-auto flex-nowrap sm:overflow-visible"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isVisited = tab.id !== 'errors' && visited.has(tab.id);
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => navigateTo(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 shrink-0 sm:flex-1 justify-center whitespace-nowrap
                  ${isActive
                    ? 'bg-indigo-600 text-white shadow-md -translate-y-0.5 z-10'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-indigo-600'
                  }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {isVisited && (
                  <CheckCircle
                    size={12}
                    className={isActive ? 'text-white' : 'text-green-500'}
                    aria-label="已造訪"
                  />
                )}
              </button>
            );
          })}
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
          {activeTab === 'concept' && <Chapter1Concept />}
          {activeTab === 'flow' && <Chapter2Flowchart />}
          {activeTab === 'pathA' && <Chapter3PathA />}
          {activeTab === 'pathB' && <Chapter4PathB />}
          {activeTab === 'branch' && <Chapter5Branch />}
          {activeTab === 'sync' && <Chapter6Sync />}
          {activeTab === 'team' && <Chapter7Team />}
          {activeTab === 'practice' && <Chapter8Practice />}
          {activeTab === 'errors' && <ErrorRoom />}
        </div>

        {/* Chapter navigation */}
        <div className="flex items-center justify-between mt-6 gap-4">
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
