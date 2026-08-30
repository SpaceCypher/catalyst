import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Zap,
  Info,
  TrendingUp,
  Flame,
  FileCode,
  Layers,
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
  const [showEvidence, setShowEvidence] = useState(false);
  const [showTechnicalDiff, setShowTechnicalDiff] = useState(false);

  const sampleStores = [
    { name: 'Apex Outdoor (Demo)', url: 'https://apex-outdoor.vercel.app', isDemo: true },
    { name: 'Monsoon Trekker (Competitor)', url: 'https://monsoon-trekker.vercel.app', isDemo: false }
  ];

  const analysisSteps = [
    { label: 'Reading your product catalog (12 SKUs)...', doneLabel: 'Read product catalog (12 SKUs, Footwear & Gear)' },
    { label: 'Simulating 40 high-intent AI shopping queries...', doneLabel: 'Checked AI shopping demand across 40 queries' },
    { label: 'Comparing machine-readable evidence vs competitors...', doneLabel: 'Compared competitor product evidence' },
    { label: 'Finding highest-impact revenue opportunity...', doneLabel: 'Opportunity identified: Product Evidence Gap' },
    { label: 'Drafting bounded catalog fix & schema...', doneLabel: 'Bounded fix prepared with verified specs' }
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
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyzeComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, stepIndex]);

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
              Connect your storefront and I'll find your biggest AI commerce opportunity.
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

  // 3. AGENT RESULTS & ACTION ROOM (DISCOVER, DIAGNOSE, PROPOSE, ACT, MEASURE)
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

      {/* Main Agent Conversational Finding Card */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-10 shadow-xl space-y-6">
        
        {/* Finding Greeting */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-medium text-blue-300 uppercase tracking-wider">
            Catalyst Finding
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
            Good morning, Apex Outdoor. <br />
            <span className="text-slate-300">I found something worth fixing.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
            AI shoppers are choosing another boot brand more often. I found a product-information gap that may be contributing to this. I've prepared a fix using information already present in your catalog.
          </p>
        </div>

        {/* Why This Matters (Diagnose & Evidence Collapsible) */}
        <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">Why I found this</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              AI shopping assistants have more useful information to compare on your competitor's product page. Your product already contains some of the information — it just isn't exposed clearly enough. I found 5 missing pieces I can safely add.
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowEvidence(!showEvidence)}
              className="text-xs font-mono text-blue-300 hover:text-blue-200 flex items-center space-x-1 cursor-pointer font-medium"
            >
              <span>{showEvidence ? 'Hide Evidence' : 'View Evidence'}</span>
              {showEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showEvidence && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200 font-mono text-xs">
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-semibold">Your product (Apex Ridge)</div>
                  <div className="text-slate-300 text-sm font-bold">5 useful attributes</div>
                  <div className="text-slate-400 text-[11px]">Thin catalog spec without structured schema</div>
                </div>

                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-semibold">Competitor (Monsoon Trekker)</div>
                  <div className="text-emerald-300 text-sm font-bold">11 useful attributes</div>
                  <div className="text-slate-400 text-[11px]">Exposes IPX7, Vibram, lugs, & JSON-LD</div>
                </div>

                <div className="sm:col-span-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="font-semibold text-slate-400">Missing attributes identified:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                    <li>Waterproof hydrostatic rating (IPX7)</li>
                    <li>Product weight (420g)</li>
                    <li>Outsole specification (Vibram MegaGrip)</li>
                    <li>Traction lugs (5mm)</li>
                    <li>Terrain suitability (Monsoon trekking)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* The Fix Proposal & Plain-English Diff */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">
              Apex Ridge Waterproof Boots (merch-boot-01)
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              I'll update product attributes, structured data, and pre-purchase FAQs. I won't invent new product claims; everything below is verified against your existing catalog.
            </p>
          </div>

          {/* Before & After Visual Diff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">Before</div>
              <div className="text-slate-300">Waterproof hiking boots.</div>
              <div className="text-slate-300">Rubber sole.</div>
              <div className="text-slate-500 text-[11px] pt-2">Schema: None</div>
            </div>

            <div className="bg-[#0e172a] border border-blue-900/50 p-4 rounded-xl space-y-1.5 text-slate-200">
              <div className="text-blue-300 font-semibold text-[11px] uppercase tracking-wider">Catalyst proposes</div>
              <div className="text-emerald-300">+ IPX7 waterproofing</div>
              <div className="text-emerald-300">+ 420g lightweight</div>
              <div className="text-emerald-300">+ Vibram MegaGrip outsole</div>
              <div className="text-emerald-300">+ 5mm traction lugs</div>
              <div className="text-emerald-300">+ Monsoon trekking suitability</div>
              <div className="text-blue-200 text-[11px] pt-1">+ Add Schema.org Product JSON-LD</div>
              <div className="text-blue-200 text-[11px]">+ Add 2 pre-purchase technical FAQs</div>
            </div>
          </div>

          {/* Technical JSON-LD toggle */}
          <div className="pt-1">
            <button
              onClick={() => onOpenDiffModal ? onOpenDiffModal() : setShowTechnicalDiff(!showTechnicalDiff)}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center space-x-1 cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              <span>View technical code changes (JSON-LD & Schema) →</span>
            </button>
          </div>

          {/* Safety Gate Checklist */}
          <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-300">
            <div className="font-semibold text-white text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safety & Invariant Controls</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>All proposed claims verified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>No unsupported specifications</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Only approved fields will change</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Nothing published automatically</span>
              </div>
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
                    <span>Applying fix to storefront...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Approve & Deploy Fix</span>
                  </>
                )}
              </button>

              <button
                onClick={onRejectFix}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="rounded-2xl bg-emerald-950/30 border border-emerald-800/50 p-4 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fix deployed to Apex Outdoor</span>
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

      {/* 4. REVENUE PAYOFF & CAUSAL PROOF (AFTER APPROVAL) */}
      {isDiffApproved && (
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-10 shadow-xl space-y-6 animate-in fade-in duration-300 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">
              Did it work?
            </span>
            <div className="text-5xl sm:text-6xl font-display font-bold text-emerald-300 tracking-tight">
              +₹1.50L
            </div>
            <div className="text-sm font-mono text-slate-300">
              incremental GMV in controlled simulation
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
            The improved catalog generated more verified AI-attributed GMV than the unchanged catalog under identical traffic conditions.
          </p>

          <div className="pt-2">
            <button
              onClick={onNavigateToProof}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>See the technical proof →</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
