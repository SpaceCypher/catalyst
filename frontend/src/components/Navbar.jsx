import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  PlayCircle,
  Inbox,
  Search,
  FlaskConical,
  Code2,
  Terminal,
  ShoppingBag
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onResetDemo, 
  onOpenDemoModal,
  onOpenStorefront,
  isResetting,
  hasAnalyzed
}) {
  const navItems = [
    { id: 'inbox', label: 'Home', icon: Inbox },
    { id: 'opportunities', label: 'Opportunities', icon: Search },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'export', label: 'Store Patch & Export', icon: Code2 },
    { id: 'console', label: 'Technical Console', icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-[#070c14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-6">
          <div 
            onClick={() => setActiveTab('inbox')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                Catalyst
                <span className="text-[10px] font-mono font-bold bg-brand-500/10 text-brand-blue border border-brand-500/20 px-1.5 py-0.2 rounded">
                  AI Revenue Agent
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Connected: <strong>Apex Outdoor (Demo)</strong></span>
            </div>
          </div>

          {/* Navigation Tabs */}
          {hasAnalyzed && (
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-surface-border">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-blue border border-brand-500/30 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-surface-card'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Open Storefront Button */}
          <button
            onClick={onOpenStorefront}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all"
            title="Open the connected Apex Outdoor merchant storefront"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Apex Storefront</span>
          </button>

          {/* 5-Beat Demo Walkthrough Pitch Button */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all active:scale-95"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">5-Beat Demo Pitch</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            disabled={isResetting}
            title="Reset store analysis"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-border border border-surface-border text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors disabled:opacity-50"
          >
            <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
}
