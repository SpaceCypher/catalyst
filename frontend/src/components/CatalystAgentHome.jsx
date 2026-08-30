import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Check, 
  ExternalLink, 
  Zap, 
  Bot, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  FileCode, 
  Layers, 
  ShoppingBag, 
  Flame, 
  TrendingUp, 
  Lock,
  CreditCard,
  Bell,
  HelpCircle,
  Play,
  ArrowUpRight,
  Target
} from 'lucide-react';

export default function CatalystAgentHome({
  hasAnalyzed,
  onAnalyzeComplete,
  opportunities = [],
  activeDiff,
  onApproveFix,
  onRejectFix,
  isApproving,
  onRunExperiment,
  experimentResult,
  onOpenStorefront,
  onNavigateToProof,
  onNavigateToStore,
  onOpenDiffModal
}) {
  const [storeUrl, setStoreUrl] = useState('https://apex-outdoor.vercel.app');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showTechnicalDiff, setShowTechnicalDiff] = useState(false);
  const [activeWhyModal, setActiveWhyModal] = useState(null);
  const [hasTestedOffer, setHasTestedOffer] = useState(false);
  const [hasApprovedReminder, setHasApprovedReminder] = useState(false);
  const [nextOpportunityActive, setNextOpportunityActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('best waterproof hiking boots under ₹5,000');
  const [isSimulatingQuery, setIsSimulatingQuery] = useState(false);

  const analysisSteps = [
    { label: 'Connecting to store...', doneLabel: 'Store connected' },
    { label: 'Scanning product catalog (12 SKUs)...', doneLabel: '12 active products identified' },
    { label: 'Benchmarking competitors (Monsoon Trekker)...', doneLabel: 'Competitor evidence analyzed' },
    { label: 'Simulating 40 high-intent AI shopping queries...', doneLabel: '40 AI queries evaluated across search engines' },
    { label: 'Synthesizing evidence deficit...', doneLabel: 'Opportunity detected & bounded fix prepared' }
  ];

  const isDiffApproved = 
    activeDiff?.status === 'approved' || 
    activeDiff?.status === 'applied' ||
    (typeof window !== 'undefined' && localStorage.getItem('catalyst_diff_status') === 'approved');

  // Reset internal states when demo is reset
  useEffect(() => {
    if (!hasAnalyzed || !isDiffApproved) {
      setHasTestedOffer(false);
      setHasApprovedReminder(false);
      setNextOpportunityActive(false);
      setShowTechnicalDiff(false);
      setActiveWhyModal(null);
    }
  }, [hasAnalyzed, isDiffApproved]);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setStepIndex(0);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    if (stepIndex < analysisSteps.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyzeComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, stepIndex]);

  const handleRunAiSimulator = () => {
    setIsSimulatingQuery(true);
    setTimeout(() => {
      setIsSimulatingQuery(false);
    }, 450);
  };

  // 1. FIRST-TIME ONBOARDING (CONNECT)
  if (!hasAnalyzed && !isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/90 border border-slate-700/60 p-8 sm:p-12 shadow-2xl text-center space-y-6">
          
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-blue-300 shadow-md">
            <Zap className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Connect your store
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              I'll find where AI shoppers are choosing someone else — and fix it.
            </p>
          </div>

          <div className="space-y-4 text-left pt-2">
            <div>
              <div className="relative">
                <Globe className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://yourstore.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0d0f17] border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-blue-400 shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-mono">Sample store:</span>
                <button
                  type="button"
                  onClick={() => setStoreUrl('https://apex-outdoor.vercel.app')}
                  className="font-mono px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Apex Outdoor · Demo
                </button>
              </div>

              <div className="flex items-center space-x-1.5 text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No automatic changes</span>
              </div>
            </div>

            <button
              onClick={handleStartAnalysis}
              className="w-full mt-4 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-base font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <span>Analyze my store →</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. LIVE ANALYSIS ANIMATION (CATALYST WORKS)
  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/90 border border-slate-700/60 p-8 sm:p-12 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-blue-300 mb-1">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Catalyst is working...
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Analyzing storefront: <span className="text-blue-200">{storeUrl}</span>
            </p>
          </div>

          <div className="space-y-3 bg-[#0d0f17] p-6 rounded-2xl border border-slate-800">
            {analysisSteps.map((step, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 text-xs sm:text-sm transition-all duration-200 ${
                    isDone
                      ? 'text-slate-200 font-medium'
                      : isCurrent
                      ? 'text-blue-200 font-semibold scale-[1.01]'
                      : 'text-slate-500 font-mono'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-800" />
                    )}
                  </div>
                  <span className="font-mono">{isDone ? step.doneLabel : step.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    );
  }

  // 3. FULLY BALANCED COMMAND WORKSPACE
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121624]/90 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-xs sm:text-sm font-mono text-slate-300">
            Connected Store: <strong className="text-white font-semibold">Apex Ridge Outdoors</strong> <span className="text-slate-500">(12 SKUs active)</span>
          </div>
        </div>

        <button
          onClick={onOpenStorefront}
          className="text-xs font-mono text-blue-300 hover:text-blue-200 flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer w-fit"
        >
          <span>Open live storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Employee Headline Card */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Catalyst Diagnosis</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">⚡ Apex Ridge Waterproof Boots</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              AI shoppers are choosing Monsoon Trekker instead of you.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
              Catalyst found 4 missing product signals (IPX7 waterproof rating, 420g weight, Vibram MegaGrip sole, and 5mm lugs) that AI shopping assistants use to recommend boots.
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className={`text-xs font-mono px-4 py-1.5 rounded-full border inline-block ${
              isDiffApproved 
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60 font-semibold'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
            }`}>
              {isDiffApproved ? '✓ Fix Deployed & Tested' : 'Action Required'}
            </span>
          </div>
        </div>
      </div>

      {/* Balanced 2-Column Grid for Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* ================= LEFT COLUMN: Simulator & Fix Proposal ================= */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 1. AI Shopping Simulator Box */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 flex-1">
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Search className="w-3.5 h-3.5" />
                  <span>Ask an AI Shopper (Live Engine)</span>
                </span>
                <span className="text-[10px] text-blue-300 font-mono">Perplexity / ChatGPT Shopping</span>
              </div>
              
              {/* Search Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunAiSimulator();
                }}
                className="flex items-center space-x-2 pt-1"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. best waterproof hiking boots under ₹5,000"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSimulatingQuery}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-xs font-mono text-white flex items-center space-x-1.5 cursor-pointer transition-all shadow-sm flex-shrink-0"
                >
                  {isSimulatingQuery ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-200" />
                      <span>Querying...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-blue-200" />
                      <span>Run</span>
                    </>
                  )}
                </button>
              </form>

              {/* Preset Query Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px] font-mono">
                <span className="text-slate-500">Presets:</span>
                {[
                  'best waterproof hiking boots under ₹5,000',
                  'monsoon trekking boots with vibram sole',
                  'lightweight 420g trail hiking shoes'
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(preset);
                      setIsSimulatingQuery(true);
                      setTimeout(() => setIsSimulatingQuery(false), 350);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Loading or Result Grid */}
            {isSimulatingQuery ? (
              <div className="p-5 rounded-2xl bg-[#0d0f17] border border-blue-900/40 text-center space-y-2 animate-in fade-in duration-150">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-300">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>Perplexity AI crawler synthesizing product search for: "{searchQuery}"...</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Checking Schema.org JSON-LD, specs table, and return policies...
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
                
                {/* Before Fix */}
                <div className="p-4 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    <span>BEFORE FIX</span>
                    <span className="text-[10px] text-rose-400 font-normal">Apex Omitted</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <div className="text-slate-400 text-[11px]">AI recommendations:</div>
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-white font-semibold flex items-center justify-between">
                      <span>#1 🥾 Monsoon Trekker</span>
                      <span className="text-[10px] text-emerald-400 font-normal">IPX7 Match</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 flex items-center justify-between">
                      <span>#2 🥾 TrailPro Extreme</span>
                      <span className="text-[10px] text-slate-400 font-normal">Vibram Sole</span>
                    </div>
                    <div className="text-rose-400 pt-1 text-[11px] font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Apex Ridge: Omitted (Missing IPX7)</span>
                    </div>
                  </div>
                </div>

                {/* After Fix */}
                <div className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isDiffApproved 
                    ? 'bg-emerald-950/30 border-emerald-800/60 shadow-sm'
                    : 'bg-[#0d0f17] border-slate-800/60 opacity-60'
                }`}>
                  <div className="flex items-center justify-between text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                    <span>AFTER CATALYST FIX</span>
                    <span className="text-[10px] font-bold text-emerald-300">Apex #1 Pick ✓</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <div className="text-slate-400 text-[11px]">AI recommendations:</div>
                    <div className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-700/60 text-white font-bold flex items-center justify-between shadow-sm">
                      <span className="text-emerald-300">#1 🥾 Apex Ridge (YOU) ✓</span>
                      <span className="text-[10px] text-emerald-400 font-normal">15k mm + Vibram</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 flex items-center justify-between">
                      <span>#2 🥾 Monsoon Trekker</span>
                      <span className="text-[10px] text-slate-500 font-normal">Alternate</span>
                    </div>
                    <div className="text-emerald-300 pt-1 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                      <span>AI crawler verified all specifications</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* 2. Human View Fix Proposal Box */}
          <div className="rounded-3xl bg-[#0e172a] border border-blue-900/40 p-6 shadow-xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Catalyst wants to improve Apex Ridge
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                All proposed claims verified against your raw catalog. Zero unsupported claims.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-emerald-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>✓ Add waterproof rating (15,000mm)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>✓ Add weight (420g lightweight)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>✓ Add Vibram MegaGrip 5mm lugs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>✓ Add sizing & monsoon FAQs</span>
              </div>
              <div className="flex items-center space-x-2 sm:col-span-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>✓ Add Schema.org Product + Offers JSON-LD</span>
              </div>
            </div>

            {/* Technical Diff Toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowTechnicalDiff(!showTechnicalDiff)}
                className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{showTechnicalDiff ? 'Hide technical changes' : 'Show technical changes (JSON-LD & Diff) →'}</span>
              </button>

              {showTechnicalDiff && (
                <div className="mt-3 p-4 rounded-xl bg-[#090a0f] border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 animate-in fade-in duration-150">
                  <div className="text-emerald-400">+ "waterproof_rating": "15,000mm IPX7"</div>
                  <div className="text-emerald-400">+ "weight": "420g"</div>
                  <div className="text-emerald-400">+ "outsole": "Vibram MegaGrip 5mm lugs"</div>
                  <div className="text-blue-300">+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹4499"</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!isDiffApproved ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={onApproveFix}
                  disabled={isApproving}
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isApproving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Applying changes to store...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-blue-200" />
                      <span>Approve & Deploy Fix</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenDiffModal}
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Review changes
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-800/60 p-4 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Your store is now Catalyst Enhanced ✓</span>
                </div>
                <button
                  onClick={onOpenStorefront}
                  className="text-emerald-300 hover:text-white underline cursor-pointer font-medium"
                >
                  View live storefront →
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ================= RIGHT COLUMN: Evidence & Razorpay Intelligence ================= */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 1. Evidence Gap Spectrogram Box */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                Evidence Gap Spectrogram
              </span>
              <span className="text-[10px] font-mono text-slate-500">40 AI Queries Benchmark</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-[#0d0f17] p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">Competitor Evidence</div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>IPX7 (15k mm)</span>
                  <button onClick={() => setActiveWhyModal('IPX7')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>420g Weight</span>
                  <button onClick={() => setActiveWhyModal('weight')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Vibram Sole</span>
                  <button onClick={() => setActiveWhyModal('outsole')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>5mm Lugs</span>
                  <button onClick={() => setActiveWhyModal('lugs')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                </div>
              </div>

              <div className="bg-[#0d0f17] p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="text-rose-400 text-[11px] font-semibold uppercase tracking-wider">Your Store</div>
                <div className="text-rose-300">✕ Missing</div>
                <div className="text-rose-300">✕ Missing</div>
                <div className="text-rose-300">✕ Missing</div>
                <div className="text-rose-300">✕ Missing</div>
              </div>
            </div>

            {/* "Why?" Explanation Popover */}
            {activeWhyModal && (
              <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-slate-300 flex items-start justify-between gap-2 animate-in fade-in duration-150">
                <div>
                  <strong className="text-blue-300">Why {activeWhyModal}?</strong> This spec exists in your raw catalog sheet and appears in competitor evidence for the queries where Apex Ridge was previously bypassed.
                </div>
                <button onClick={() => setActiveWhyModal(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer">✕</button>
              </div>
            )}
          </div>

          {/* 2. Razorpay Payment & Offer Layer Box */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 font-mono text-xs flex-1">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Razorpay Payment & Offer Intelligence</span>
            </div>

            <div className="space-y-4">
              {/* Offer Card */}
              <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="text-[11px] text-slate-400 font-semibold">AI SHOPPER DETECTED</div>
                <div className="text-slate-300 font-sans text-xs">
                  This visitor arrived from a verified Perplexity AI recommendation.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-blue-300 font-semibold flex items-center justify-between">
                  <span>💳 ICICI Instant 10% Off</span>
                  <span className="text-[10px] text-emerald-400">+18% Lift</span>
                </div>

                <button
                  onClick={() => setHasTestedOffer(!hasTestedOffer)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
                >
                  {hasTestedOffer ? '✓ Offer Applied to AI Traffic' : 'Test offer on AI traffic'}
                </button>

                {/* Offer Live Output Panel */}
                {hasTestedOffer && (
                  <div className="mt-2 p-3 rounded-xl bg-[#090a0f] border border-emerald-800/40 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live Simulation Output:</span>
                    </div>
                    <div className="text-slate-300">
                      • Checkout payload injected: <code className="text-blue-300">rzp_off_monsoon_icici</code>
                    </div>
                    <div className="text-slate-300">
                      • AI Cart Conversion: <span className="line-through text-slate-500">14.2%</span> → <strong className="text-emerald-300">17.8%</strong> (+3.6% net lift)
                    </div>
                    <div className="text-slate-300">
                      • Additional Lifted GMV: <strong className="text-white">+₹48,000</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Recovery Card */}
              <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="text-[11px] text-slate-400 font-semibold flex items-center space-x-1">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHECKOUT RECOVERY</span>
                </div>
                <div className="text-slate-300 font-sans text-xs">
                  AI-referred customer abandoned cart at payment selection step.
                </div>

                <button
                  onClick={() => setHasApprovedReminder(!hasApprovedReminder)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  {hasApprovedReminder ? '✓ Recovery Reminder Active' : 'Approve reminder'}
                </button>

                {/* Recovery Live Output Panel */}
                {hasApprovedReminder && (
                  <div className="mt-2 p-3 rounded-xl bg-[#090a0f] border border-emerald-800/40 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live Recovery Output:</span>
                    </div>
                    <div className="text-slate-300">
                      • Abandoned AI sessions: <span className="text-white">24 sessions</span>
                    </div>
                    <div className="text-slate-300">
                      • Recovered via Razorpay Link: <strong className="text-emerald-300">18 orders (75% recovery)</strong>
                    </div>
                    <div className="text-slate-300">
                      • Recovered Revenue: <strong className="text-white">+₹72,000</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Equal 2-Column Payoff & Next Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Revenue Payoff & Arithmetic Breakdown */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Controlled Simulation Revenue Impact
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                +125% Lift
              </span>
            </div>

            <div className="flex items-baseline space-x-3">
              <div className="text-4xl sm:text-5xl font-display font-bold text-emerald-300 tracking-tight">
                +₹1.50L
              </div>
              <div className="text-xs font-mono text-slate-300">
                incremental GMV verified
              </div>
            </div>

            {/* Exact Formula & Arithmetic Breakdown */}
            <div className="p-4 rounded-2xl bg-[#090a0f] border border-slate-800 text-left space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-400 font-semibold border-b border-slate-800 pb-2">
                <span>Arithmetic Calculation Breakdown:</span>
                <span className="text-[10px] text-blue-300">3,000 Sessions Benchmark</span>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Control Arm (1,500 queries):</span>
                  <span className="text-slate-200">24 orders × ₹5,000 = ₹1.20L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400">Treatment Arm (1,500 queries):</span>
                  <span className="text-emerald-300 font-bold">54 orders × ₹5,000 = ₹2.70L</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 font-bold">
                  <span className="text-white">Net Incremental GMV:</span>
                  <span className="text-emerald-400">+₹1,50,000 (+₹1.50L)</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5">
                * 348 sessions forged <code className="text-amber-300">utm_source=chatgpt</code> headers but scored &lt;0 on the 5-signal classifier, contributing ₹0 false GMV.
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToProof}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>View deep technical proof & traces →</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </button>
        </div>

        {/* Right: Next Best Action Card */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <Target className="w-4 h-4" />
                <span>Next Best Action Loop</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                Autonomous Growth
              </span>
            </div>

            <h4 className="text-xl font-display font-bold text-white">
              ⚡ Venture 45L Expedition Backpack
            </h4>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Catalyst completed the boots fix and automatically discovered your trekking backpacks have the same evidence gap in volume capacity and load-bearing specs.
            </p>

            <div className="p-4 rounded-2xl bg-[#090a0f] border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-semibold">Identified Deficit on Venture 45L:</div>
              <div className="text-rose-300">• Missing 45-liter laboratory volume spec</div>
              <div className="text-rose-300">• Missing 600D ripstop nylon material rating</div>
              <div className="text-emerald-300 font-semibold pt-1">Estimated revenue potential: +₹95,000 GMV</div>
            </div>
          </div>

          <button
            onClick={() => setNextOpportunityActive(true)}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>{nextOpportunityActive ? '✓ Opportunity Queued for Fix' : 'Investigate & Fix Venture 45L →'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
