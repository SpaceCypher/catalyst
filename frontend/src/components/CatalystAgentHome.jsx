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
  Target,
  RefreshCw,
  X
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
  const [isInvestigatingNext, setIsInvestigatingNext] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeOpportunityId, setActiveOpportunityId] = useState('opp-01'); // 'opp-01' | 'opp-02' | 'opp-03' | 'opp-04'
  const [backpackApproved, setBackpackApproved] = useState(false);
  const [backpackApproving, setBackpackApproving] = useState(false);
  const [tentApproved, setTentApproved] = useState(false);
  const [tentApproving, setTentApproving] = useState(false);
  const [showOpportunitiesDrawer, setShowOpportunitiesDrawer] = useState(false);
  const [isContinuousLoopActive, setIsContinuousLoopActive] = useState(true);
  
  const [showTechnicalDiff, setShowTechnicalDiff] = useState(false);
  const [showSupportingQueries, setShowSupportingQueries] = useState(false);
  const [activeWhyModal, setActiveWhyModal] = useState(null);
  const [hasTestedOffer, setHasTestedOffer] = useState(false);
  const [hasApprovedReminder, setHasApprovedReminder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('best waterproof hiking boots under ₹5,000');
  const [isSimulatingQuery, setIsSimulatingQuery] = useState(false);
  const [showFullCapabilities, setShowFullCapabilities] = useState(false);

  const isBootApproved = 
    activeDiff?.status === 'approved' || 
    activeDiff?.status === 'applied' ||
    (typeof window !== 'undefined' && localStorage.getItem('catalyst_diff_status') === 'approved');

  // Reset internal states when demo is reset
  useEffect(() => {
    if (!hasAnalyzed || !isBootApproved) {
      setActiveOpportunityId('opp-01');
      setBackpackApproved(false);
      setTentApproved(false);
      setHasTestedOffer(false);
      setHasApprovedReminder(false);
      setShowTechnicalDiff(false);
      setShowSupportingQueries(false);
      setActiveWhyModal(null);
      setSearchQuery('best waterproof hiking boots under ₹5,000');
    }
  }, [hasAnalyzed, isBootApproved]);

  const analysisSteps = [
    { label: 'Connecting to storefront...', doneLabel: 'Storefront connected (https://apex-outdoor.vercel.app)' },
    { label: 'Scanning product catalog (12 SKUs)...', doneLabel: '12 active products and catalog specs identified' },
    { label: 'Benchmarking competitors across AI search engines...', doneLabel: 'Competitor evidence mapped (Monsoon Trekker, TrailPro)' },
    { label: 'Evaluating 40 high-intent shopping queries...', doneLabel: '40 AI shopping queries evaluated (ChatGPT, Perplexity)' },
    { label: 'Synthesizing evidence deficit & preparing grounded fix...', doneLabel: 'Opportunity detected & grounded FixDiff generated' }
  ];

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

  const handleSwitchOpportunity = (oppId) => {
    if (oppId === activeOpportunityId) return;
    setIsInvestigatingNext(true);
    setTimeout(() => {
      setActiveOpportunityId(oppId);
      setIsInvestigatingNext(false);
      setShowTechnicalDiff(false);
      setShowSupportingQueries(false);
      setActiveWhyModal(null);
      if (oppId === 'opp-02') {
        setSearchQuery('best lightweight 45L expedition backpack under ₹6,000');
      } else if (oppId === 'opp-03') {
        setSearchQuery('4 season waterproof 3-person camping tent under ₹7,000');
      } else {
        setSearchQuery('best waterproof hiking boots under ₹5,000');
      }
    }, 600);
  };

  const handleApproveBackpack = () => {
    setBackpackApproving(true);
    setTimeout(() => {
      setBackpackApproving(false);
      setBackpackApproved(true);
    }, 600);
  };

  const handleApproveTent = () => {
    setTentApproving(true);
    setTimeout(() => {
      setTentApproving(false);
      setTentApproved(true);
    }, 600);
  };

  const handleRunAiSimulator = () => {
    setIsSimulatingQuery(true);
    setTimeout(() => {
      setIsSimulatingQuery(false);
    }, 450);
  };

  // Opportunity 1 (Boots) vs Opportunity 2 (Backpack) data
  const isOpp1 = activeOpportunityId === 'opp-01';
  const isCurrentApproved = isOpp1 ? isBootApproved : backpackApproved;
  const isCurrentApproving = isOpp1 ? isApproving : backpackApproving;

  // 1. FIRST-TIME ONBOARDING (CONNECT + METHODOLOGY)
  if (!hasAnalyzed && !isAnalyzing) {
    return (
      <div className="max-w-6xl mx-auto my-6 space-y-6 animate-in fade-in duration-300">
        
        {/* Top Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Commerce Revenue Agent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Meet Catalyst
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            An autonomous AI employee that finds where AI shoppers are choosing someone else — and generates bounded fixes to win the sale.
          </p>
        </div>

        {/* 2-Column Bento: Connect Card + Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Connect Store Input (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
                  <Zap className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                    Connect your store
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Paste your storefront URL to benchmark your technical catalog signals against top competitors across AI shopping surfaces.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://yourstore.com"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#0a0d14] border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-400 shadow-inner"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <span>Preset:</span>
                      <button
                        type="button"
                        onClick={() => setStoreUrl('https://apex-outdoor.vercel.app')}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-blue-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Apex Outdoor · Demo
                      </button>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Safe · Read-only audit</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStartAnalysis}
                  className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-blue-600/25"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze my store →</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 font-mono mt-2.5">
                  Takes ~3 seconds · Evaluates 40 AI shopping query vectors
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: How Catalyst Works & Methodology (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl flex-1 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                    How Catalyst Works
                  </span>
                </div>
                <button
                  onClick={() => setShowFullCapabilities(true)}
                  className="text-[11px] font-mono text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
                >
                  View full 11 capabilities →
                </button>
              </div>

              {/* 4 Methodology Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Pillar 01 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      01
                    </span>
                    <span className="text-xs font-bold text-white">
                      Discover Demand
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catalyst tests high-intent shopping queries and finds where AI shoppers choose competitors instead of your products.
                  </p>
                </div>

                {/* Pillar 02 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      02
                    </span>
                    <span className="text-xs font-bold text-white">
                      Diagnose the Gap
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    It compares the evidence AI can actually understand — product attributes, reviews, FAQs and structured data — and identifies missing signals.
                  </p>
                </div>

                {/* Pillar 03 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      03
                    </span>
                    <span className="text-xs font-bold text-white">
                      Act Safely
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catalyst creates a grounded fix, verifies every claim against your catalog, and pauses at <code className="text-amber-300 font-mono text-[10px]">WAIT_FOR_APPROVAL</code> until you approve.
                  </p>
                </div>

                {/* Pillar 04 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      04
                    </span>
                    <span className="text-xs font-bold text-white">
                      Prove Revenue
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catalyst re-tests AI discovery, connects AI sessions to Razorpay payments, runs experiments and rejects spoofed attribution before calculating GMV.
                  </p>
                </div>

              </div>

              {/* Anchor Sentence Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 text-xs text-slate-200 leading-relaxed">
                <span className="font-semibold text-blue-200">
                  "Catalyst doesn't just tell you what to improve. It finds the opportunity, proposes the fix, gets your approval, deploys it, measures the outcome, and finds what to do next."
                </span>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Verified Against Catalog Source Data (Zero Hallucinations)</span>
                </div>
                <span className="text-emerald-400 font-bold hidden sm:inline">Grounded</span>
              </div>

            </div>
          </div>

        </div>

        {/* 11-Stage Capability Architecture Modal */}
        {showFullCapabilities && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#121624] border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Catalyst's 11-Stage Closed-Loop Capability Spectrum
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Full autonomous agent pipeline from catalog connection to revenue realization
                  </p>
                </div>
                <button
                  onClick={() => setShowFullCapabilities(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-blue-400">1. Connect</div>
                  <p className="text-slate-300">Paste store URL. Auto-detect products, categories, catalog SKUs and benchmark competitors with zero manual setup.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-blue-400">2. Discover</div>
                  <p className="text-slate-300">Generate high-intent shopping queries. Test merchant vs competitors across AI shopping surfaces to detect omitted products.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-amber-400">3. Diagnose</div>
                  <p className="text-slate-300">Compare product attributes, reviews, evidence depth, missing FAQs and structured data. Rank opportunities by commercial impact.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-amber-400">4. Act</div>
                  <p className="text-slate-300">Generate grounded product-copy improvements, FAQs, Schema.org JSON-LD, and show exact visual diffs explaining the reasoning.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-emerald-400">5. Safety</div>
                  <p className="text-slate-300">Ground every claim in verified merchant data. Enforce mandatory <code className="text-amber-300">WAIT_FOR_APPROVAL</code> and complete agent audit logs.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-emerald-400">6. Deploy</div>
                  <p className="text-slate-300">Apply approved changes to the connected store. Generate CMS/HTML/JSON-LD export payloads for Shopify or WooCommerce.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-purple-400">7. Re-discover</div>
                  <p className="text-slate-300">Re-run the same AI shopping queries across engines to verify whether recommendations flipped to your store as #1 pick.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-purple-400">8. Revenue Optimization</div>
                  <p className="text-slate-300">Identify AI shoppers, recommend appropriate Razorpay card/UPI offers, detect checkout drop-offs, and trigger recovery reminders.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-indigo-400">9. Attribution</div>
                  <p className="text-slate-300">AI referral → session → checkout → Razorpay payment. Reject suspicious spoofed headers with 5-signal classifier.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-indigo-400">10. Experimentation</div>
                  <p className="text-slate-300">Control vs treatment evaluation across 3,000 sessions. Clearly label simulation vs real payment data without claiming unproven causality.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2 md:col-span-2">
                  <div className="font-mono font-bold text-cyan-400">11. Learn / Next Action</div>
                  <p className="text-slate-300">If the intervention worked → automatically discover the next biggest opportunity in the catalog. If not → investigate evidence deficits.</p>
                </div>

              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowFullCapabilities(false)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Close Capability Spec
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // 2. LIVE ANALYSIS ANIMATION (CATALYST WORKS)
  if (isAnalyzing || isInvestigatingNext) {
    return (
      <div className="max-w-2xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/90 border border-slate-700/60 p-8 sm:p-12 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-blue-300 mb-1">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              {isInvestigatingNext 
                ? 'Investigating Venture 45L Backpack...' 
                : 'Catalyst is investigating...'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              {isInvestigatingNext 
                ? 'Evaluating volume capacity, 600D ripstop specs, and AI query rankings' 
                : `Storefront: ${storeUrl}`}
            </p>
          </div>

          <div className="space-y-3 bg-[#0d0f17] p-6 rounded-2xl border border-slate-800">
            {isInvestigatingNext ? (
              <>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 font-medium font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Inspected catalog SKU: Venture 45L (merch-bag-01)</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 font-medium font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Benchmarked competitor: NorthTrail 45L Alpine Pro</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-blue-300 font-semibold font-mono animate-pulse">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
                  <span>Synthesizing evidence deficit & grounded fix...</span>
                </div>
              </>
            ) : (
              analysisSteps.map((step, idx) => {
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
              })
            )}
          </div>

        </div>
      </div>
    );
  }

  // 3. MAIN AGENT WORKSPACE (10-Second Comprehension + Multi-Opportunity Switcher)
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Agent Status Bar & Opportunity Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#121624]/90 border border-slate-800 p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 font-semibold">Autonomous Loop:</span>
          </div>

          {/* Opp 1 Pill */}
          <button
            onClick={() => handleSwitchOpportunity('opp-01')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeOpportunityId === 'opp-01' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>1. Apex Boots</span>
            {isBootApproved ? (
              <span className="text-emerald-400 text-[10px] font-bold">✓ (+₹1.50L)</span>
            ) : (
              <span className="text-amber-400 text-[10px]">⚡ Action</span>
            )}
          </button>

          {/* Opp 2 Pill */}
          <button
            onClick={() => handleSwitchOpportunity('opp-02')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeOpportunityId === 'opp-02' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>2. Venture 45L</span>
            {backpackApproved ? (
              <span className="text-emerald-400 text-[10px] font-bold">✓ (+₹95k)</span>
            ) : (
              <span className="text-amber-400 text-[10px]">⚡ Action</span>
            )}
          </button>

          {/* Opp 3 Pill */}
          <button
            onClick={() => handleSwitchOpportunity('opp-03')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeOpportunityId === 'opp-03' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>3. StormShield Tent</span>
            {tentApproved ? (
              <span className="text-emerald-400 text-[10px] font-bold">✓ (+₹1.10L)</span>
            ) : (
              <span className="text-slate-500 text-[10px]">⏳ Queued</span>
            )}
          </button>

          {/* Opp 4 Pill */}
          <button
            onClick={() => handleSwitchOpportunity('opp-04')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeOpportunityId === 'opp-04' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>4. SwiftTrail Shoes</span>
            <span className="text-slate-500 text-[10px]">⏳ Queued</span>
          </button>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Opportunities Radar Toggle Button */}
          <button
            onClick={() => setShowOpportunitiesDrawer(!showOpportunitiesDrawer)}
            className={`text-xs font-mono flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              showOpportunitiesDrawer 
                ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-sm' 
                : 'bg-slate-900 hover:bg-slate-800 text-indigo-300 border-slate-700'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            <span>Opportunities Radar (4)</span>
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded-md border border-indigo-800 font-bold">+₹4.00L</span>
          </button>

          <button
            onClick={onNavigateToStore}
            className="text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Catalog</span>
          </button>
          <button
            onClick={onOpenStorefront}
            className="text-xs font-mono text-blue-300 hover:text-blue-200 flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Storefront</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Identified Opportunities Radar Drawer / Panel */}
      {showOpportunitiesDrawer && (
        <div className="rounded-3xl bg-[#0f1422] border border-indigo-500/30 p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-display font-bold text-white">
                  Identified Opportunities Radar & Loop Engine
                </h3>
                <span className="text-xs font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-800 font-semibold">
                  4 Catalog Gaps
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Continuous autonomous cycle benchmarks 12 store SKUs across AI search query vectors
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Loop Mode: <strong className="text-emerald-300">Continuous Auto-Scan</strong></span>
              </div>
              <button
                onClick={() => setShowOpportunitiesDrawer(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Autonomous Loop Cycle Flow Diagram */}
          <div className="p-4 rounded-2xl bg-[#090c14] border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-blue-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>6-Stage Autonomous Closed Loop Cycle</span>
              </span>
              <span className="text-emerald-400 font-normal">Next Best Action Auto-Triggered</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold">1. Ingest</div>
                <div className="text-slate-300 text-[10px]">Auto-crawl 12 catalog SKUs</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold">2. Discover</div>
                <div className="text-slate-300 text-[10px]">Test 40 shopping queries</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">3. Diagnose</div>
                <div className="text-slate-300 text-[10px]">Detect spec/schema gap</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">4. Grounded Fix</div>
                <div className="text-slate-300 text-[10px]">Generate verified diff</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">5. Approve Gate</div>
                <div className="text-slate-300 text-[10px]">WAIT_FOR_APPROVAL</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold">6. Realize & Loop</div>
                <div className="text-slate-300 text-[10px]">Razorpay Lift ⟲ Next SKU</div>
              </div>
            </div>
          </div>

          {/* 4 Opportunities Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            
            {/* Opp 1 */}
            <div 
              onClick={() => {
                handleSwitchOpportunity('opp-01');
                setShowOpportunitiesDrawer(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeOpportunityId === 'opp-01' 
                  ? 'bg-blue-950/30 border-blue-500/50 shadow-md' 
                  : 'bg-[#0a0d16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-blue-400 font-bold">#1 FOOTWEAR</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                  isBootApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {isBootApproved ? 'Resolved ✓' : 'Action ⚡'}
                </span>
              </div>
              <div className="font-sans font-bold text-white text-sm">
                Apex Ridge Trekking Boots
              </div>
              <div className="text-slate-400 text-[11px] space-y-0.5">
                <div>Gap: IPX7 (15k mm), 420g, Vibram sole</div>
                <div>Win Rate: <span className="text-rose-400">15%</span> vs Comp <span className="text-emerald-400">55%</span></div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-semibold">
                <span className="text-slate-400 text-[10px]">GMV Potential:</span>
                <span className="text-emerald-400">+₹1,50,000</span>
              </div>
            </div>

            {/* Opp 2 */}
            <div 
              onClick={() => {
                handleSwitchOpportunity('opp-02');
                setShowOpportunitiesDrawer(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeOpportunityId === 'opp-02' 
                  ? 'bg-blue-950/30 border-blue-500/50 shadow-md' 
                  : 'bg-[#0a0d16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-bold">#2 OUTDOOR GEAR</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                  backpackApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {backpackApproved ? 'Resolved ✓' : 'Action ⚡'}
                </span>
              </div>
              <div className="font-sans font-bold text-white text-sm">
                Venture 45L Backpack
              </div>
              <div className="text-slate-400 text-[11px] space-y-0.5">
                <div>Gap: 45L volume, 600D ripstop, stay</div>
                <div>Win Rate: <span className="text-rose-400">10%</span> vs Comp <span className="text-emerald-400">50%</span></div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-semibold">
                <span className="text-slate-400 text-[10px]">GMV Potential:</span>
                <span className="text-emerald-400">+₹95,000</span>
              </div>
            </div>

            {/* Opp 3 */}
            <div 
              onClick={() => {
                handleSwitchOpportunity('opp-03');
                setShowOpportunitiesDrawer(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeOpportunityId === 'opp-03' 
                  ? 'bg-blue-950/30 border-blue-500/50 shadow-md' 
                  : 'bg-[#0a0d16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-purple-400 font-bold">#3 TENTS & SHELTER</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                  tentApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}>
                  {tentApproved ? 'Resolved ✓' : 'Queued ⏳'}
                </span>
              </div>
              <div className="font-sans font-bold text-white text-sm">
                Alpine Haven 3-Person Tent
              </div>
              <div className="text-slate-400 text-[11px] space-y-0.5">
                <div>Gap: Force 9 wind rating, 5k mm floor</div>
                <div>Win Rate: <span className="text-rose-400">8%</span> vs Comp <span className="text-emerald-400">58%</span></div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-semibold">
                <span className="text-slate-400 text-[10px]">GMV Potential:</span>
                <span className="text-emerald-400">+₹1,10,000</span>
              </div>
            </div>

            {/* Opp 4 */}
            <div 
              onClick={() => {
                handleSwitchOpportunity('opp-04');
                setShowOpportunitiesDrawer(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeOpportunityId === 'opp-04' 
                  ? 'bg-blue-950/30 border-blue-500/50 shadow-md' 
                  : 'bg-[#0a0d16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-400 font-bold">#4 RUNNING GEAR</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-900 text-slate-400 border border-slate-800">
                  Queued ⏳
                </span>
              </div>
              <div className="font-sans font-bold text-white text-sm">
                SwiftTrail Aero Running Shoes
              </div>
              <div className="text-slate-400 text-[11px] space-y-0.5">
                <div>Gap: 8mm heel drop, EVA midsole, grip</div>
                <div>Win Rate: <span className="text-rose-400">12%</span> vs Comp <span className="text-emerald-400">48%</span></div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-semibold">
                <span className="text-slate-400 text-[10px]">GMV Potential:</span>
                <span className="text-emerald-400">+₹45,000</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Primary Agent Headline Card (10-Second Comprehension) */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Catalyst Diagnosis</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-300">
                {activeOpportunityId === 'opp-01' 
                  ? 'Opportunity #1 · Apex Ridge Waterproof Boots' 
                  : activeOpportunityId === 'opp-02' 
                  ? 'Opportunity #2 · Venture 45L Expedition Backpack'
                  : activeOpportunityId === 'opp-03'
                  ? 'Opportunity #3 · Alpine Haven 3-Person Camping Tent'
                  : 'Opportunity #4 · SwiftTrail Aero Running Shoes'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              {activeOpportunityId === 'opp-01' 
                ? 'Apex Ridge Waterproof Boots are losing AI recommendations to Monsoon Trekker.' 
                : activeOpportunityId === 'opp-02'
                ? 'Venture 45L Backpack is losing AI recommendations to NorthTrail 45L Alpine Pro.'
                : activeOpportunityId === 'opp-03'
                ? 'Alpine Haven 3-Person Tent is losing AI recommendations to StormShield Pro.'
                : 'SwiftTrail Aero Running Shoes are losing AI recommendations to TrailPro Speed.'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
              {activeOpportunityId === 'opp-01' 
                ? 'AI shopping engines (ChatGPT, Perplexity) recommend competitors because your product page exposes fewer structured comparison signals.' 
                : activeOpportunityId === 'opp-02'
                ? 'Competitors expose 45L certified capacity, 600D Diamond Ripstop nylon, and internal aluminum frame ratings, winning AI travel recommendations.'
                : activeOpportunityId === 'opp-03'
                ? 'Competitors expose Beaufort Scale Force 9 wind ratings and 5,000mm bathtub floor specs, winning AI 4-season camping recommendations.'
                : 'Competitors expose explicit 8mm drop, dual-density EVA midsole, and lug grip index, winning lightweight trail runner recommendations.'}
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className={`text-xs font-mono px-4 py-2 rounded-xl border inline-flex items-center gap-2 ${
              isCurrentApproved 
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60 font-semibold'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
            }`}>
              {isCurrentApproved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Fix Deployed & Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Action Required</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Workflow Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* ================= LEFT COLUMN: Diagnosis & Catalyst Fix ================= */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 1. Evidence Gap Diagnosis Card */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                <span>Why AI Shoppers Overlook You</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {isOpp1 ? 'Query: "best waterproof hiking boots under ₹5,000"' : 'Query: "best lightweight 45L expedition backpack under ₹6,000"'}
              </span>
            </div>

            {/* Competitor vs Merchant Evidence Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              
              {/* Competitor Box */}
              <div className="p-4 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                  <span>{isOpp1 ? 'Monsoon Trekker' : 'NorthTrail 45L'}</span>
                  <span className="text-[10px] text-emerald-400">✓ Recommended</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px]">
                  {isOpp1 ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span>✓ 15,000mm IPX7 Rating</span>
                        <button onClick={() => setActiveWhyModal('IPX7')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✓ 420g Lightweight Spec</span>
                        <button onClick={() => setActiveWhyModal('weight')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✓ Vibram MegaGrip Outsole</span>
                        <button onClick={() => setActiveWhyModal('outsole')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✓ 5mm Lug Depth</span>
                        <button onClick={() => setActiveWhyModal('lugs')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span>✓ 45L Certified Volume</span>
                        <button onClick={() => setActiveWhyModal('capacity')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✓ 600D Ripstop Nylon</span>
                        <button onClick={() => setActiveWhyModal('material')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✓ 6061 Aluminum Stay</span>
                        <button onClick={() => setActiveWhyModal('frame')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✓ 3L Hydration Sleeve</span>
                        <button onClick={() => setActiveWhyModal('hydration')} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Apex Ridge Box */}
              <div className="p-4 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-rose-400 text-[11px] font-semibold uppercase tracking-wider">
                  <span>{isOpp1 ? 'Apex Ridge Boots' : 'Venture 45L'}</span>
                  <span className="text-[10px] text-rose-400">✕ Overlooked</span>
                </div>
                <div className="space-y-1.5 text-rose-300 text-[11px]">
                  {isOpp1 ? (
                    <>
                      <div>✕ Basic "waterproof" claim only</div>
                      <div>✕ Missing weight specification</div>
                      <div>✕ Generic "rubber sole" claim</div>
                      <div>✕ Missing lug depth & FAQs</div>
                    </>
                  ) : (
                    <>
                      <div>✕ Missing 45L laboratory volume</div>
                      <div>✕ Generic "durable fabric" claim</div>
                      <div>✕ Unlisted internal frame specs</div>
                      <div>✕ Missing hydration routing & FAQs</div>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* "Why?" Explanation Popover */}
            {activeWhyModal && (
              <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-slate-300 flex items-start justify-between gap-2 animate-in fade-in duration-150">
                <div>
                  <strong className="text-blue-300">Why {activeWhyModal}?</strong> This spec exists in your raw catalog records and is the exact criteria AI shopping assistants use to recommend products for this query.
                </div>
                <button onClick={() => setActiveWhyModal(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer">✕</button>
              </div>
            )}

            {/* Progressive Disclosure: Supporting Queries */}
            <div className="pt-1">
              <button
                onClick={() => setShowSupportingQueries(!showSupportingQueries)}
                className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
              >
                {showSupportingQueries ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{showSupportingQueries ? 'Hide supporting queries' : 'View 40 evaluated shopping queries →'}</span>
              </button>

              {showSupportingQueries && (
                <div className="mt-3 p-4 rounded-2xl bg-[#090a0f] border border-slate-800 text-xs font-mono text-slate-300 space-y-2 animate-in fade-in duration-150 max-h-48 overflow-y-auto">
                  <div className="text-[11px] text-slate-400 pb-1 border-b border-slate-800">Evaluated AI Shopping Query Vectors:</div>
                  {isOpp1 ? (
                    <>
                      <div className="text-rose-400">• "best waterproof hiking boots under ₹5,000" → Apex bypassed (Missing IPX7)</div>
                      <div className="text-rose-400">• "lightweight 420g trail hiking shoes" → Apex bypassed (Missing weight spec)</div>
                      <div className="text-rose-400">• "monsoon trekking boots with vibram sole" → Apex bypassed (Missing Vibram tag)</div>
                    </>
                  ) : (
                    <>
                      <div className="text-rose-400">• "best lightweight 45L expedition backpack under ₹6,000" → Venture bypassed (Missing 45L volume)</div>
                      <div className="text-rose-400">• "600D ripstop travel backpack with internal frame" → Venture bypassed (Missing material tag)</div>
                      <div className="text-rose-400">• "waterproof trekking rucksack with raincover" → Venture bypassed (Missing raincover spec)</div>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* 2. Catalyst's Proposed Fix & Approval Gate */}
          <div className="rounded-3xl bg-[#0e172a] border border-blue-900/40 p-6 shadow-xl space-y-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Catalyst Fix Proposal</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {isOpp1 
                  ? 'I prepared a grounded fix for Apex Ridge Boots.' 
                  : 'I prepared a grounded fix for Venture 45L Backpack.'}
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                ✓ All claims verified against your product data · Zero unsupported claims.
              </p>
            </div>

            {/* Human-Readable Diff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-emerald-300 bg-[#090d18] p-4 rounded-2xl border border-blue-900/30">
              {isOpp1 ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Waterproof rating: 15,000mm IPX7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Weight: 420g lightweight</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Outsole: Vibram MegaGrip 5mm lugs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Sizing & Monsoon FAQ section</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:col-span-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Schema.org/Product & Offers JSON-LD</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Capacity: 45-Liter Certified Volume</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Material: 600D Diamond Ripstop Nylon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Frame: Ergonomic 6061 Aluminum Stay</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ 3L Hydration Port & Raincover FAQs</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:col-span-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>+ Schema.org/Product & Offers JSON-LD</span>
                  </div>
                </>
              )}
            </div>

            {/* Technical Changes Toggle (Progressive Disclosure) */}
            <div className="pt-1">
              <button
                onClick={() => setShowTechnicalDiff(!showTechnicalDiff)}
                className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{showTechnicalDiff ? 'Hide technical changes' : 'Show technical changes (JSON-LD & Payload) →'}</span>
              </button>

              {showTechnicalDiff && (
                <div className="mt-3 p-4 rounded-xl bg-[#090a0f] border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 animate-in fade-in duration-150">
                  {isOpp1 ? (
                    <>
                      <div className="text-emerald-400">+ "waterproof_rating": "15,000mm IPX7"</div>
                      <div className="text-emerald-400">+ "weight": "420g"</div>
                      <div className="text-emerald-400">+ "outsole": "Vibram MegaGrip 5mm lugs"</div>
                      <div className="text-blue-300">+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹4499"</div>
                    </>
                  ) : (
                    <>
                      <div className="text-emerald-400">+ "capacity": "45L"</div>
                      <div className="text-emerald-400">+ "fabric": "600D Diamond Ripstop Nylon"</div>
                      <div className="text-emerald-400">+ "frame": "6061 Anodized Aluminum"</div>
                      <div className="text-blue-300">+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹3999"</div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mandatory Approval Gate */}
            {!isCurrentApproved ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={isOpp1 ? onApproveFix : handleApproveBackpack}
                  disabled={isCurrentApproving}
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isCurrentApproving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deploying approved changes to store...</span>
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
                  Review diff
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-800/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Your store is now Catalyst Enhanced ✓</span>
                </div>
                <button
                  onClick={onOpenStorefront}
                  className="text-emerald-300 hover:text-white underline cursor-pointer font-medium flex items-center space-x-1"
                >
                  <span>View updated store</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* ================= RIGHT COLUMN: AI Simulator & Razorpay Revenue ================= */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 1. AI Shopping Simulator Card */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 flex-1">
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Search className="w-3.5 h-3.5" />
                  <span>AI Shopping Simulator</span>
                </span>
                <span className="text-[10px] text-blue-300 font-mono">Real Engine Verification</span>
              </div>
              
              {/* Simulator Input Form */}
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
                    placeholder={isOpp1 ? "e.g. best waterproof hiking boots under ₹5,000" : "e.g. best lightweight 45L expedition backpack under ₹6,000"}
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
                      <span>Running...</span>
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
                {(isOpp1 ? [
                  'best waterproof hiking boots under ₹5,000',
                  'monsoon trekking boots with vibram sole',
                  'lightweight 420g trail hiking shoes'
                ] : [
                  'best lightweight 45L expedition backpack under ₹6,000',
                  '600D ripstop travel backpack with internal frame',
                  'waterproof trekking rucksack with raincover'
                ]).map((preset, idx) => (
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

            {/* Before vs After Simulation Result Grid */}
            {isSimulatingQuery ? (
              <div className="p-5 rounded-2xl bg-[#0d0f17] border border-blue-900/40 text-center space-y-2 animate-in fade-in duration-150">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-300">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>AI crawler evaluating store catalog for: "{searchQuery}"...</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
                
                {/* BEFORE FIX */}
                <div className="p-4 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    <span>BEFORE FIX</span>
                    <span className="text-[10px] text-rose-400 font-normal">Omitted</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-white font-semibold flex items-center justify-between">
                      <span>#1 🎒 {isOpp1 ? 'Monsoon Trekker' : 'NorthTrail 45L'}</span>
                      <span className="text-[10px] text-emerald-400 font-normal">{isOpp1 ? 'IPX7 Match' : '45L Match'}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 flex items-center justify-between">
                      <span>#2 🎒 {isOpp1 ? 'TrailPro Extreme' : 'Alpine Summit'}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{isOpp1 ? 'Vibram Sole' : '600D Nylon'}</span>
                    </div>
                    <div className="text-rose-400 pt-1 text-[11px] font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{isOpp1 ? 'Apex Ridge: Omitted' : 'Venture 45L: Omitted'}</span>
                    </div>
                  </div>
                </div>

                {/* AFTER FIX */}
                <div className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isCurrentApproved 
                    ? 'bg-emerald-950/30 border-emerald-800/60 shadow-sm'
                    : 'bg-[#0d0f17] border-slate-800/60 opacity-60'
                }`}>
                  <div className="flex items-center justify-between text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                    <span>AFTER CATALYST FIX</span>
                    <span className="text-[10px] font-bold text-emerald-300">#1 Pick ✓</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <div className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-700/60 text-white font-bold flex items-center justify-between shadow-sm">
                      <span className="text-emerald-300">#1 🎒 {isOpp1 ? 'Apex Ridge (YOU)' : 'Venture 45L (YOU)'} ✓</span>
                      <span className="text-[10px] text-emerald-400 font-normal">{isOpp1 ? '15k mm + Vibram' : '45L + 600D'}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 flex items-center justify-between">
                      <span>#2 🎒 {isOpp1 ? 'Monsoon Trekker' : 'NorthTrail 45L'}</span>
                      <span className="text-[10px] text-slate-500 font-normal">Alternate</span>
                    </div>
                    <div className="text-emerald-300 pt-1 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                      <span>AI engine matched all specifications</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* 2. Razorpay Revenue & Payment Loop Card */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 font-mono text-xs flex-1">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Razorpay Revenue & Payment Intelligence</span>
            </div>

            <div className="space-y-4">
              {/* Payment Offer Experiment */}
              <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="text-[11px] text-slate-400 font-semibold">AI SHOPPER CHECKOUT OPTIMIZATION</div>
                <div className="text-slate-300 font-sans text-xs">
                  Catalyst detected AI-referred shoppers are abandoning checkout. Recommended action: test targeted instant payment offer.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-blue-300 font-semibold flex items-center justify-between">
                  <span>💳 {isOpp1 ? 'ICICI Instant 10% Off' : 'HDFC Instant ₹500 Off'}</span>
                  <span className="text-[10px] text-emerald-400">{isOpp1 ? '+18% Lift' : '+15% Lift'}</span>
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
                      • Checkout payload injected: <code className="text-blue-300">{isOpp1 ? 'rzp_off_monsoon_icici' : 'rzp_off_venture_hdfc'}</code>
                    </div>
                    <div className="text-slate-300">
                      • AI Cart Conversion: <span className="line-through text-slate-500">14.2%</span> → <strong className="text-emerald-300">{isOpp1 ? '17.8%' : '17.1%'}</strong> (+3.6% net lift)
                    </div>
                    <div className="text-slate-300">
                      • Additional Lifted GMV: <strong className="text-white">{isOpp1 ? '+₹48,000' : '+₹35,000'}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Abandonment Recovery */}
              <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="text-[11px] text-slate-400 font-semibold flex items-center space-x-1">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHECKOUT RECOVERY</span>
                </div>
                <div className="text-slate-300 font-sans text-xs">
                  AI-referred customer abandoned cart at payment step. Suggested action: send approved recovery reminder.
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
                      • Abandoned AI sessions: <span className="text-white">{isOpp1 ? '24 sessions' : '19 sessions'}</span>
                    </div>
                    <div className="text-slate-300">
                      • Recovered via Razorpay Link: <strong className="text-emerald-300">{isOpp1 ? '18 orders (75%)' : '14 orders (74%)'}</strong>
                    </div>
                    <div className="text-slate-300">
                      • Recovered Revenue: <strong className="text-white">{isOpp1 ? '+₹72,000' : '+₹56,000'}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Revenue Payoff & Next Best Action Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Controlled Simulation Revenue Payoff */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Controlled Simulation Revenue Impact ({isOpp1 ? 'Boots' : 'Backpacks'})
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                {isOpp1 ? '+125% Lift' : '+110% Lift'}
              </span>
            </div>

            <div className="flex items-baseline space-x-3">
              <div className="text-4xl sm:text-5xl font-display font-bold text-emerald-300 tracking-tight">
                {isOpp1 ? '+₹1.50L' : '+₹95,000'}
              </div>
              <div className="text-xs font-mono text-slate-300">
                incremental GMV verified
              </div>
            </div>

            {/* Arithmetic Formula Breakdown */}
            <div className="p-4 rounded-2xl bg-[#090a0f] border border-slate-800 text-left space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-400 font-semibold border-b border-slate-800 pb-2">
                <span>Arithmetic Calculation Breakdown:</span>
                <span className="text-[10px] text-blue-300">3,000 Sessions Benchmark</span>
              </div>

              <div className="space-y-1 text-[11px]">
                {isOpp1 ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Control Arm (1,500 queries):</span>
                      <span className="text-slate-200">20 orders × ₹4,000 = ₹80,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400">Treatment Arm (1,500 queries):</span>
                      <span className="text-emerald-300 font-bold">44 orders × ₹4,000 = ₹1,75,000</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-1 font-bold">
                      <span className="text-white">Net Incremental GMV:</span>
                      <span className="text-emerald-400">+₹95,000 GMV Lift</span>
                    </div>
                  </>
                )}
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

        {/* Right: Next Best Action Loop (Closed-loop Agent) */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <Target className="w-4 h-4" />
                <span>Next Best Action Loop</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                Closed-Loop Agent
              </span>
            </div>

            {isOpp1 ? (
              <>
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

                <button
                  onClick={() => handleSwitchOpportunity('opp-02')}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Investigate & Fix Venture 45L →</span>
                </button>
              </>
            ) : (
              <>
                <h4 className="text-xl font-display font-bold text-white">
                  ⚡ Summit StormShield 3-Person Tent
                </h4>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Catalyst verified both Boots & Backpacks, and queued your 4-season tents for wind-rating and hydrostatic floor specs.
                </p>

                <div className="p-4 rounded-2xl bg-[#090a0f] border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="text-slate-400 font-semibold">Identified Deficit on StormShield Tent:</div>
                  <div className="text-rose-300">• Missing Beaufort Scale Force 9 wind rating</div>
                  <div className="text-rose-300">• Missing 5,000mm bathtub floor waterproofing spec</div>
                  <div className="text-emerald-300 font-semibold pt-1">Estimated revenue potential: +₹1,10,000 GMV</div>
                </div>

                <button
                  onClick={() => handleSwitchOpportunity('opp-01')}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Switch back to Boots (Opportunity #1) ←</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

