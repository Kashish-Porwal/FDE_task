import React from 'react';
import GraphCanvas from './components/GraphCanvas';
import ChatSidebar from './components/ChatSidebar';
import { LayoutDashboard, Compass, Activity, ShieldCheck, Database, Zap } from 'lucide-react';

function App() {
  // Current dataset metrics
  const stats = [
    { label: 'Total Entities', value: '4', icon: Database, color: 'text-blue-400' },
    { label: 'Total Relationships', value: '3', icon: Activity, color: 'text-purple-400' },
    { label: 'Document Types', value: '4', icon: LayoutDashboard, color: 'text-emerald-400' },
    { label: 'Broken Flows', value: '0', icon: ShieldCheck, color: 'text-orange-400' }
  ];

  return (
    <div className="relative h-screen bg-[#0f172a] text-white overflow-hidden flex flex-col font-sans">
      {/* 1. Hero / Header Section */}
      <header className="relative z-50 p-6 bg-slate-900/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                <Zap className="text-blue-400" size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Order-to-Cash Intelligence Graph
              </h1>
            </div>
            <p className="text-blue-400 font-medium tracking-wide text-sm opacity-90">
              Trace relationships across sales orders, deliveries, billing documents, and journal entries.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 relative flex overflow-hidden min-h-0">
        {/* Left Sidebar: Insights & Onboarding */}
        <div className="w-[320px] flex-shrink-0 z-40 p-6 flex flex-col gap-8 bg-slate-900/40 backdrop-blur-xl border-r border-white/5 overflow-y-auto custom-scrollbar">

          {/* Description Section */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60">Business Objective</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              This system helps users explore business document flow, inspect connected entities, and ask natural language questions grounded in the dataset.
            </p>
          </div>

          {/* Insight Cards */}
          <div className="space-y-5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60">Dataset Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="dashboard-card flex flex-col gap-3 p-4">
                  <s.icon className={s.color} size={18} />
                  <div>
                    <div className="text-xl font-bold tracking-tight">{s.value}</div>
                    <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Onboarding / How to Use */}
          <div className="space-y-5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60">How to use</h2>
            <div className="space-y-1.5 bg-blue-600/5 rounded-3xl p-6 border border-blue-500/10">
              {[
                "Explore the relationship graph",
                "Click a node to inspect entity details",
                "Follow links to trace document flow",
                "Ask questions in the AI copilot panel"
              ].map((step, idx) => (
                <div key={idx} className="onboarding-step">
                  <span className="onboarding-number">{idx + 1}</span>
                  <span className="text-xs text-slate-300 font-light">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                System Online
              </p>
            </div>
          </div>
        </div>

        {/* Center: Graph Area */}
        <div className="flex-1 min-w-0 relative bg-[#020617] h-full overflow-hidden">
          <div className="absolute top-8 left-8 z-40 pointer-events-none">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl">
              <Compass className="text-blue-400 rotate-45 animate-pulse" size={16} />
              <span className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">Interactive Map</span>
            </div>
          </div>

          <div className="w-full h-full">
            <GraphCanvas />
          </div>

          <div className="absolute bottom-8 left-8 z-40 pointer-events-none max-w-xs">
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic opacity-60">
              * Zoom and drag to manipulate the 3D space. Select nodes for deep inspection.
            </p>
          </div>
        </div>

        {/* Right: AI Copilot */}
        <div className="w-[360px] flex-shrink-0 border-l border-white/5 bg-slate-900/20">
          <ChatSidebar />
        </div>
      </main>
    </div>
  );
}

export default App;
