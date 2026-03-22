import React from 'react';
import GraphCanvas from './components/GraphCanvas';
import ChatSidebar from './components/ChatSidebar';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background Graph Visualization */}
      <div className="absolute inset-0 z-0">
        <GraphCanvas />
      </div>

      {/* Floating Chat Sidebar */}
      <ChatSidebar />

      {/* Top Overlay Bar */}
      <div className="absolute top-0 left-0 p-6 z-20 pointer-events-none">
        <div className="flex items-center gap-4 text-white/80">
          <div className="w-10 h-10 glass rounded-lg flex items-center justify-center font-bold text-blue-400">
            D
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Dodge AI</h1>
            <p className="text-xs uppercase tracking-widest opacity-50">Graph Engine v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
