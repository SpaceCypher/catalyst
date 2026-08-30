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
  Play
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
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showTechnicalDiff, setShowTechnicalDiff] = useState(false);
  const [activeWhyModal, setActiveWhyModal] = useState(null);
  const [hasTestedOffer, setHasTestedOffer] = useState(false);
  const [hasApprovedReminder, setHasApprovedReminder] = useState(false);
  const [nextOpportunityActive, setNextOpportunityActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('best waterproof hiking boots under ₹5,000');
  const [isSimulatingQuery, setIsSimulatingQuery] = useState(false);

  const analysisSteps = [
    { label: 'Connecting to store...', doneLabel: 'Store connected' },
    { label: 'Scanning product catalog...', doneLabel: '12 products found' },
    { label: 'Identifying market competitors...', doneLabel: 'Competitors identified (Monsoon Trekker)' },
    { label: 'Testing AI shopping queries...', doneLabel: 'Tested 40 high-intent AI shopping queries' },
    { label: 'Synthesizing evidence deficit...', doneLabel: 'Opportunity detected' }
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
    }, 600);
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
              Connect your store
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
              <span>Analyze my store →</span>
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

  // 2. LIVE ANALYSIS ANIMATION (CATALYST WORKS)
  if (isAnalyzing) {
    return (
      <div className="max-w-xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/90 border border-slate-700/60 p-8 sm:p-12 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 text-blue-300 mb-1">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              Catalyst is working...
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Analyzing <span className="text-blue-200">{storeUrl}</span>
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

  // 3. THE EMPLOYEE INBOX (ONE PROBLEM AT A TIME)
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 my-4">
      
      {/* Context Bar */}
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

      {/* Greeting & Inbox Card */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Good morning, Apex Outdoor.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            {isDiffApproved 
              ? 'Catalyst verified +₹1.50L incremental revenue from the recent fix.'
              : 'I found 1 opportunity that could increase your AI-driven sales.'}
          </p>
        </div>

        {/* Primary Opportunity Box */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-5">
          
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-mono text-blue-300 font-semibold">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>⚡ Apex Ridge Waterproof Boots</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                AI shoppers are choosing Monsoon Trekker instead of you.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Catalyst found 4 missing product signals that AI shopping assistants use to recommend boots.
              </p>
            </div>

            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 text-amber-300 border border-amber-800/40 flex-shrink-0">
              {isDiffApproved ? '✓ Fix Deployed' : 'Action Needed'}
            </span>
          </div>

          {!showInvestigation && !isDiffApproved && (
            <div className="pt-2">
              <button
                onClick={() => setShowInvestigation(true)}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-xs font-semibold flex items-center space-x-2 cursor-pointer shadow-sm transition-all"
              >
                <span>See what I found →</span>
              </button>
            </div>
          )}

          {/* 4. INVESTIGATION & AI SHOPPING SIMULATOR */}
          {(showInvestigation || isDiffApproved) && (
            <div className="space-y-5 pt-3 border-t border-slate-800/80 animate-in fade-in duration-200">
              
              {/* Ask an AI Shopper Simulator Box */}
              <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-5 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>Ask an AI shopper</span>
                    <span className="text-[10px] text-blue-300">ChatGPT / Perplexity AI Engine</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-1">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <button
                      onClick={handleRunAiSimulator}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-white flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-blue-300" />
                      <span>Run</span>
                    </button>
                  </div>
                </div>

                {/* Before vs After AI Recommendation Simulator Result */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
                  
                  {/* Before */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                      BEFORE FIX
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>AI recommends:</div>
                      <div className="text-slate-200 font-semibold">🥾 Monsoon Trekker</div>
                      <div className="text-slate-200 font-semibold">🥾 TrailPro</div>
                      <div className="text-rose-400 pt-1 text-[11px] font-bold">
                        ❌ Apex Ridge (Not recommended)
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                    isDiffApproved 
                      ? 'bg-emerald-950/30 border-emerald-800/60'
                      : 'bg-slate-900/30 border-slate-800/60 opacity-60'
                  }`}>
                    <div className="text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                      AFTER CATALYST FIX
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>AI recommends:</div>
                      <div className="text-emerald-300 font-bold">
                        🥾 Apex Ridge (YOU) ✓
                      </div>
                      <div className="text-slate-400">🥾 Monsoon Trekker</div>
                      <div className="text-slate-400">🥾 TrailPro</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Side-by-Side Evidence Table with "Why?" buttons */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-white">Why? Catalyst identified missing specifications:</div>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-[#0d0f17] p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-emerald-400 text-[11px] font-semibold">Competitor Evidence</div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>IPX7 (15,000mm)</span>
                      <button onClick={() => setActiveWhyModal('IPX7')} className="text-[10px] text-blue-300 hover:underline">Why?</button>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>420g Lightweight</span>
                      <button onClick={() => setActiveWhyModal('weight')} className="text-[10px] text-blue-300 hover:underline">Why?</button>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Vibram MegaGrip</span>
                      <button onClick={() => setActiveWhyModal('outsole')} className="text-[10px] text-blue-300 hover:underline">Why?</button>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>5mm Lugs</span>
                      <button onClick={() => setActiveWhyModal('lugs')} className="text-[10px] text-blue-300 hover:underline">Why?</button>
                    </div>
                  </div>

                  <div className="bg-[#0d0f17] p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-rose-400 text-[11px] font-semibold">Your Evidence</div>
                    <div className="text-rose-300">✕ Missing</div>
                    <div className="text-rose-300">✕ Missing</div>
                    <div className="text-rose-300">✕ Missing</div>
                    <div className="text-rose-300">✕ Missing</div>
                  </div>
                </div>

                {/* "Why?" Explanation Popover */}
                {activeWhyModal && (
                  <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-300 flex items-start justify-between gap-2 animate-in fade-in duration-150">
                    <div>
                      <strong className="text-blue-300">Why {activeWhyModal}?</strong> This attribute exists in your raw catalog specification sheet and appears in competitor evidence for the 40 high-intent queries where Apex Ridge was previously excluded.
                    </div>
                    <button onClick={() => setActiveWhyModal(null)} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                )}
              </div>

              {/* 5. HUMAN VIEW FIX PROPOSAL */}
              <div className="rounded-2xl bg-[#0e172a] border border-blue-900/40 p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">
                    Catalyst wants to improve Apex Ridge
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    All claims verified against your catalog. Nothing invented.
                  </p>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-emerald-300">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Add waterproof rating (15,000mm IPX7)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Add weight (420g per boot)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Add outsole specification (Vibram MegaGrip 5mm lugs)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Add sizing & monsoon trekking FAQ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Add Product Schema.org structured data</span>
                  </div>
                </div>

                {/* Technical Diff Toggle */}
                <div>
                  <button
                    onClick={() => setShowTechnicalDiff(!showTechnicalDiff)}
                    className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{showTechnicalDiff ? 'Hide technical changes' : 'Show technical changes (JSON-LD & Diff) →'}</span>
                  </button>

                  {showTechnicalDiff && (
                    <div className="mt-3 p-3.5 rounded-xl bg-[#090a0f] border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 animate-in fade-in duration-150">
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
                      className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {isApproving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Applying changes...</span>
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
                      <span>Your store is now Catalyst Enhanced ✓</span>
                    </div>
                    <button
                      onClick={onOpenStorefront}
                      className="text-emerald-300 hover:text-white underline cursor-pointer"
                    >
                      View live storefront →
                    </button>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      </div>

      {/* 6. RAZORPAY PAYMENT LAYER (SECTIONS 7 & 8) */}
      {isDiffApproved && (
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-5 animate-in fade-in duration-300">
          
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-300 uppercase tracking-wider">
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span>Razorpay Payment & Offer Intelligence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Offer Recommendation */}
            <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="space-y-1">
                <div className="text-slate-400 text-[11px] font-semibold">AI SHOPPER DETECTED</div>
                <p className="text-slate-300 font-sans text-xs">
                  This customer came from a high-intent AI shopping recommendation.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="text-blue-300 font-semibold">💳 ICICI Credit Card: 10% Instant Discount</div>
                <div className="text-[11px] text-slate-400">Expected conversion lift: <strong className="text-emerald-400">High (+18%)</strong></div>
              </div>

              <button
                onClick={() => setHasTestedOffer(true)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                {hasTestedOffer ? '✓ Offer Applied to AI Traffic' : 'Test offer on AI traffic'}
              </button>
            </div>

            {/* Payment-Aware Recovery */}
            <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="space-y-1">
                <div className="text-slate-400 text-[11px] font-semibold flex items-center space-x-1">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHECKOUT RECOVERY</span>
                </div>
                <p className="text-slate-300 font-sans text-xs">
                  AI-referred shopper abandoned checkout after selecting payment.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                Suggested action: Send payment reminder with applicable ICICI offer.
              </div>

              <button
                onClick={() => setHasApprovedReminder(true)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                {hasApprovedReminder ? '✓ Recovery Reminder Scheduled' : 'Approve reminder'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 7. REVENUE STORY & PROOF (SECTION 13) */}
      {isDiffApproved && (
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-10 shadow-xl space-y-6 animate-in fade-in duration-300 text-center">
          
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Catalyst generated a measured improvement
            </div>
            <div className="text-5xl sm:text-6xl font-display font-bold text-emerald-300 tracking-tight">
              +₹1.50L
            </div>
            <div className="text-sm font-mono text-slate-300">
              incremental GMV in controlled simulation
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>AI recommendations ↑</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Conversions ↑</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>348 suspicious sessions excluded</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToProof}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>View proof & technical data →</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          </div>

        </div>
      )}

      {/* 8. NEXT BEST ACTION LOOP (SECTION 9) */}
      {isDiffApproved && (
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300">
          
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
              Catalyst finished this task
            </div>
            <h3 className="text-lg font-display font-bold text-white">
              I found your next opportunity.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Your trekking backpacks (Venture 45L Expedition Backpack) have the same evidence gap in volume capacity and load-bearing specs.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setNextOpportunityActive(true)}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
            >
              <span>{nextOpportunityActive ? '✓ Queued for Investigation' : 'Fix this next →'}</span>
            </button>
            <span className="text-xs font-mono text-slate-500">Autonomous growth loop</span>
          </div>

        </div>
      )}

    </div>
  );
}
