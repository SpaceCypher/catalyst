import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  PlayCircle,
  ShoppingBag,
  ShieldCheck,
  Zap,
  ExternalLink,
  Server
} from 'lucide-react';


export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onResetDemo, 
  onOpenDemoModal,
  onOpenStorefront,
  isResetting,
  hasAnalyzed,
  verifiedRevenue = 150000,
  agentStatus = 'ready' // 'ready' | 'analyzing' | 'waiting_approval' | 'measuring' | 'complete'
}) {
  const navItems = [
    { id: 'catalyst', label: 'Catalyst', icon: Zap },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'proof', label: 'Proof', icon: ShieldCheck },
  ];

  const formattedAmount = verifiedRevenue >= 100000 
    ? `+₹${(verifiedRevenue / 100000).toFixed(2)}L` 
    : `+₹${verifiedRevenue.toLocaleString('en-IN')}`;

  const getStatusDisplay = () => {
    switch(agentStatus) {
      case 'analyzing':
        return { label: 'Analyzing...', color: 'bg-blue-400', textColor: 'text-blue-300', pulse: true };
      case 'waiting_approval':
        return { label: '1 Recommendation', color: 'bg-amber-400', textColor: 'text-amber-300', pulse: true };
      case 'measuring':
        return { label: 'Measuring...', color: 'bg-purple-400', textColor: 'text-purple-300', pulse: true };
      case 'complete':
        return { label: `Verified (${formattedAmount})`, color: 'bg-emerald-400', textColor: 'text-emerald-300', pulse: false };
      case 'ready':
      default:
        return { label: 'Ready', color: 'bg-emerald-400', textColor: 'text-emerald-300', pulse: false };
    }
  };


  const status = getStatusDisplay();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-surface-border bg-[#090a0f]/95 backdrop-blur-xl shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 overflow-x-hidden">
        
        {/* Left: Brand Identity, Status & Tabs */}
        <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0 min-w-0">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('catalyst')}
            className="flex items-center space-x-2 cursor-pointer group flex-shrink-0 select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center group-hover:border-blue-400/50 transition-all flex-shrink-0">
              <Zap className="w-4 h-4 text-blue-300" />
            </div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              Catalyst
            </span>
          </div>

          {/* Compact Agent Status Badge */}
          <button 
            onClick={() => setActiveTab('proof')}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono transition-colors cursor-pointer flex-shrink-0"
            title="Click to view agent tool execution trace"
          >
            <span className={`w-2 h-2 rounded-full ${status.color} ${status.pulse ? 'animate-pulse' : ''}`} />
            <span className={status.textColor}>{status.label}</span>
          </button>

          {/* Navigation Tabs (Catalyst, Store, Proof) */}
          {hasAnalyzed && (
            <nav className="flex items-center space-x-1 pl-2 sm:pl-3 border-l border-surface-border flex-shrink-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800/90 text-blue-200 border border-slate-700 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0">
          
          {/* Open Storefront Link */}
          <button
            onClick={onOpenStorefront}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap transition-all cursor-pointer"
            title="Open connected Apex Outdoor merchant storefront"
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
            <span>Store</span>
            <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5" />
          </button>

          {/* Backend API Link */}
          <a
            href="https://catalyst-880d.onrender.com/docs"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 text-xs font-mono whitespace-nowrap transition-all"
            title="Open Live FastAPI Backend Docs on Render"
          >
            <Server className="w-3.5 h-3.5 flex-shrink-0" />
            <span>API Docs</span>
            <ExternalLink className="w-3 h-3 text-emerald-500/70 ml-0.5" />
          </a>


          {/* 5-Beat Demo Pitch Button */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium whitespace-nowrap transition-all shadow-sm cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">5-Beat Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            disabled={isResetting}
            title="Reset store analysis"
            className="flex items-center space-x-1 px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono whitespace-nowrap transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`w-3 h-3 flex-shrink-0 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
}
