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
  Lock
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
  const [showFixDiff, setShowFixDiff] = useState(false);
  const [isRunningAiTest, setIsRunningAiTest] = useState(false);
  const [hasRunAiTest, setHasRunAiTest] = useState(false);
  const [simulatedQuery, setSimulatedQuery] = useState('Best waterproof hiking boots under ₹5,000 for monsoon trekking?');

  const analysisSteps = [
    { label: 'Reading your product catalog (12 SKUs)...', doneLabel: 'Read product catalog (12 SKUs, Footwear & Gear)' },
    { label: 'Simulating 40 high-intent AI shopping queries...', doneLabel: 'Tested 40 AI shopping queries across ChatGPT & Perplexity' },
    { label: 'Comparing machine-readable evidence vs competitors...', doneLabel: 'Benchmarked evidence gap against Monsoon Trekker' },
    { label: 'Finding highest-impact revenue opportunity...', doneLabel: 'Opportunity found: Product Information Deficit' },
    { label: 'Preparing bounded catalog fix & schema...', doneLabel: 'Bounded fix prepared with verified specs' }
  ];

  const isDiffApproved = 
    activeDiff?.status === 'approved' || 
    activeDiff?.status === 'applied' ||
    (typeof window !== 'undefined' && localStorage.getItem('catalyst_diff_status') === 'approved');

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setStepIndex(0);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    if (stepIndex < analysisSteps.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyzeComplete();
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, stepIndex]);

  const handleRunAiTest = () => {
    setIsRunningAiTest(true);
    setTimeout(() => {
      setIsRunningAiTest(false);
      setHasRunAiTest(true);
    }, 1200);
  };

  // 1. FIRST-TIME ONBOARDING (CONNECT)
  if (!hasAnalyzed && !isAnalyzing) {
    return (
      <div className="max-w-xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/90 border border-slate-700/60 p-8 sm:p-12 shadow-2xl text-center space-y-6">
          
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-blue-300">
            <Zap className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Make your store easier for AI to sell.
            </h1>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              I'll find where AI shoppers are choosing someone else — and fix it.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <div className="relative">
                <Globe className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://yourstore.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0d0f17] border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-mono">Sample store:</span>
              <button
                type="button"
                onClick={() => setStoreUrl('https://apex-outdoor.vercel.app')}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Apex Outdoor · Demo
              </button>
            </div>

            <button
              onClick={handleStartAnalysis}
              className="w-full mt-4 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>Analyze my store</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>No changes will be made without your approval.</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. LIVE ANALYSIS ANIMATION (OBSERVE)
  if (isAnalyzing) {
    return (
      <div className="max-w-xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/90 border border-slate-700/60 p-8 sm:p-12 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 text-blue-300 mb-1">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              Analyzing Apex Outdoor...
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Store: <span className="text-blue-200">{storeUrl}</span>
            </p>
          </div>

          <div className="space-y-3 bg-[#0d0f17] p-5 rounded-2xl border border-slate-800">
            {analysisSteps.map((step, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 text-xs transition-all duration-200 ${
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

  // 3. CONTINUOUS AGENT WORKFLOW (DISCOVER -> DIAGNOSE -> PROPOSE -> ACT -> MEASURE)
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 my-4">
      
      {/* Context Badge */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Connected store: <strong className="text-slate-200">Apex Outdoor · Demo</strong></span>
        </div>
        <button
          onClick={onOpenStorefront}
          className="text-blue-300 hover:text-blue-200 flex items-center space-x-1 underline cursor-pointer"
        >
          <span>Open storefront</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* BEAT 1: THE DISCOVERY CARD */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-10 shadow-xl space-y-6">
        
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-medium text-blue-300 uppercase tracking-wider bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <Bot className="w-3.5 h-3.5 text-blue-400" />
            <span>Catalyst Finding</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
            I found something.
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
            AI shoppers looking for waterproof hiking boots are choosing competitors over you.
          </p>
        </div>

        {/* BEAT 2: VISCERAL AI SHOPPING SIMULATOR (BEFORE FIX) */}
        <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Shopping Simulation (Perplexity / ChatGPT Shopping)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/60">
              Apex Ridge Not Recommended
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-2">
            <div className="text-slate-400">
              <span className="text-blue-300 font-semibold">User Query:</span> "{simulatedQuery}"
            </div>
            <div className="p-3 rounded-lg bg-[#090a0f] border border-slate-800/80 text-slate-300 space-y-1.5 leading-relaxed font-sans">
              <div className="flex items-center space-x-1.5 text-xs text-rose-400 font-mono font-semibold">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                <span>AI Recommends: Monsoon Trekker Pro Boots (Competitor)</span>
              </div>
              <p className="text-xs text-slate-400">
                "Monsoon Trekker provides verified IPX7 immersion waterproofing, Vibram MegaGrip sole, and 410g weight. Apex Ridge Boots does not specify hydrostatic head rating, outsole brand, or weight."
              </p>
            </div>
          </div>

          {/* Side-by-side Evidence Matrix */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-semibold text-white">Why? Your product doesn't clearly expose key specifications:</div>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="text-emerald-400 text-[11px] font-semibold">Competitor Evidence (11 specs)</div>
                <div className="text-slate-300 text-xs">✓ IPX7 Waterproof (15,000mm)</div>
                <div className="text-slate-300 text-xs">✓ 420g Lightweight</div>
                <div className="text-slate-300 text-xs">✓ Vibram MegaGrip sole</div>
                <div className="text-slate-300 text-xs">✓ 5mm traction lugs</div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="text-rose-400 text-[11px] font-semibold">Your Store (Apex Ridge)</div>
                <div className="text-rose-300 text-xs">✕ Missing waterproof rating</div>
                <div className="text-rose-300 text-xs">✕ Missing product weight</div>
                <div className="text-rose-300 text-xs">✕ Missing outsole specification</div>
                <div className="text-rose-300 text-xs">✕ Missing lug depth</div>
              </div>
            </div>
          </div>

        </div>

        {/* BEAT 3: PROPOSED BOUNDED FIX */}
        <div className="rounded-2xl bg-[#0e172a] border border-blue-900/40 p-5 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-blue-300 uppercase tracking-wider">
              Catalyst Proposal
            </div>
            <h3 className="text-base font-semibold text-white">
              Here's what I'd change for Apex Ridge Waterproof Boots
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Nothing invented — every claim is verified against existing records in your catalog.
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs text-slate-200">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>Add verified specifications (IPX7 waterproof, 420g weight, Vibram sole, 5mm lugs)</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-300">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>Add 4 AI-relevant pre-purchase FAQs</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-300">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>Add Schema.org Product + Offers structured data (JSON-LD)</span>
            </div>
          </div>

          {/* Safety Gate Checklist */}
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap gap-4">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>0 unsupported claims</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bounded to approved fields only</span>
            </div>
          </div>

          {/* Approval Action Buttons */}
          {!isDiffApproved ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onApproveFix}
                disabled={isApproving}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isApproving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deploying verified fix to storefront...</span>
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
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Review changes
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-800/60 p-3.5 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fix deployed to Apex Outdoor · Storefront Updated</span>
              </div>
              <button
                onClick={onOpenStorefront}
                className="text-emerald-300 hover:text-white underline cursor-pointer"
              >
                See updated store →
              </button>
            </div>
          )}
        </div>

      </div>

      {/* BEAT 4: TEST & PROOF (AFTER APPROVAL) */}
      {isDiffApproved && (
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-10 shadow-xl space-y-6 animate-in fade-in duration-300">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fix Live & Tested</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Catalyst tested the change.
            </h2>
            <p className="text-sm text-slate-300 font-sans">
              I simulated identical shopping demand to test whether the improved store actually wins AI recommendations.
            </p>
          </div>

          {/* AI Shopping Simulation: AFTER FIX */}
          <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live AI Recommendation Comparison</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">
                Apex Ridge Recommended ✓
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {/* Before */}
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2 opacity-75">
                <div className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Before Fix</div>
                <div className="text-rose-300 font-semibold">Monsoon Trekker chosen</div>
                <div className="text-[11px] text-slate-400">Apex Ridge boot lacked machine-readable waterproof and sole evidence.</div>
              </div>

              {/* After */}
              <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-800/50 space-y-2">
                <div className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">After Catalyst Fix</div>
                <div className="text-white font-semibold">Apex Ridge Boots chosen ✓</div>
                <div className="text-[11px] text-slate-300">AI crawler matched IPX7 waterproofing, 420g lightweight, and Vibram MegaGrip specs.</div>
              </div>
            </div>
          </div>

          {/* Major Revenue Payoff Box */}
          <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-6 text-center space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Controlled Simulation Revenue Impact
            </div>
            <div className="text-5xl sm:text-6xl font-display font-bold text-emerald-300 tracking-tight">
              +₹1.50L
            </div>
            <div className="text-sm font-mono text-slate-300">
              incremental GMV in controlled A/B simulation
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Verified payment provenance</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Spoofed traffic excluded</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onNavigateToProof}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>View technical proof & data →</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
