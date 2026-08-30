import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  PlayCircle,
  ShoppingBag,
  Activity,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onResetDemo, 
  onOpenDemoModal,
  onOpenStorefront,
  isResetting,
  hasAnalyzed,
  agentStatus = 'ready' // 'ready' | 'analyzing' | 'waiting_approval' | 'measuring' | 'complete'
}) {
  const navItems = [
    { id: 'catalyst', label: 'Catalyst', icon: Zap },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'proof', label: 'Proof', icon: ShieldCheck },
  ];

  const getStatusDisplay = () => {
    switch(agentStatus) {
      case 'analyzing':
        return { label: 'Catalyst is analyzing store...', color: 'bg-blue-400', textColor: 'text-blue-300', pulse: true };
      case 'waiting_approval':
        return { label: 'Catalyst has 1 recommendation for you', color: 'bg-amber-400', textColor: 'text-amber-300', pulse: true };
      case 'measuring':
        return { label: 'Catalyst is measuring the result...', color: 'bg-purple-400', textColor: 'text-purple-300', pulse: true };
      case 'complete':
        return { label: 'Catalyst verified +₹1.50L revenue impact', color: 'bg-emerald-400', textColor: 'text-emerald-300', pulse: false };
      case 'ready':
      default:
        return { label: 'Catalyst Ready', color: 'bg-emerald-400', textColor: 'text-emerald-300', pulse: false };
    }
  };

  const status = getStatusDisplay();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-[#090a0f]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Status */}
        <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
          <div 
            onClick={() => setActiveTab('catalyst')}
            className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0 select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center group-hover:border-blue-400/50 transition-all flex-shrink-0">
              <Zap className="w-4 h-4 text-blue-300" />
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
                Catalyst
              </span>
              <span className="text-[10px] font-mono font-medium bg-slate-800 text-blue-200 border border-slate-700 px-2 py-0.5 rounded-full whitespace-nowrap inline-block">
                AI Commerce Agent
              </span>
            </div>
          </div>

          {/* Dynamic Agent Status Indicator */}
          <button 
            onClick={() => setActiveTab('proof')}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono transition-colors cursor-pointer"
            title="Click to view agent tool execution trace"
          >
            <span className={`w-2 h-2 rounded-full ${status.color} ${status.pulse ? 'animate-pulse' : ''}`} />
            <span className={status.textColor}>{status.label}</span>
            <span className="text-[10px] text-slate-500 ml-1">trace →</span>
          </button>

          {/* Navigation Tabs (Catalyst, Store, Proof) */}
          {hasAnalyzed && (
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-surface-border flex-shrink-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800/90 text-blue-200 border border-slate-700 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          
          {/* Open Storefront Link */}
          <button
            onClick={onOpenStorefront}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap transition-all cursor-pointer"
            title="Open connected Apex Outdoor merchant storefront"
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
            <span className="whitespace-nowrap">Apex Storefront</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </button>

          {/* 5-Beat Demo Pitch Button */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium whitespace-nowrap transition-all shadow-sm cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="whitespace-nowrap hidden sm:inline">5-Beat Demo Pitch</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            disabled={isResetting}
            title="Reset store analysis"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono whitespace-nowrap transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`w-3 h-3 flex-shrink-0 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline whitespace-nowrap">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
}
