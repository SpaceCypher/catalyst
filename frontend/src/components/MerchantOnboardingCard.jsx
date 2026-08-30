import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Activity, 
  Radar, 
  Zap, 
  Flame,
  Search,
  ExternalLink
} from 'lucide-react';

export default function MerchantOnboardingCard({ onAnalyzeComplete }) {
  const sampleStores = [
    { 
      name: 'Apex Ridge Outdoors', 
      url: 'https://apex-outdoor.vercel.app',
      tag: 'Merchant Store • 12 SKUs',
      badge: 'Deficit Found (-₹1.50L)'
    },
    { 
      name: 'Monsoon Trekker', 
      url: 'https://monsoon-trekker.vercel.app',
      tag: 'Competitor Benchmark • 12 SKUs',
      badge: '55% AI Win Rate'
    }
  ];
  const [storeUrl, setStoreUrl] = useState(sampleStores[0].url);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const liveQueries = [
    "best waterproof hiking boots under ₹5,000",
    "vibram sole grip lightweight monsoon boots",
    "durable mountain trail footwear for rainy trek",
    "breathable ankle support waterproof outdoor boots"
  ];
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQueryIndex((prev) => (prev + 1) % liveQueries.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const analysisSteps = [
    { label: 'Reading your product catalog (12 SKUs)...', doneLabel: 'Catalog ingested (12 SKUs, Footwear & Gear)' },
    { label: 'Simulating 40 high-intent AI shopping queries...', doneLabel: '40 shopping queries tested on AI engines' },
    { label: 'Comparing machine-readable evidence vs Competitor A...', doneLabel: 'Competitor benchmark evidence analyzed' },
    { label: 'Finding your highest-impact revenue opportunity...', doneLabel: 'Found highest-impact opportunity (+₹1.50L potential)' },
    { label: 'Drafting bounded catalog fix & Schema.org JSON-LD...', doneLabel: 'FixDiff drafted with 6 verified attributes' }
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
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyzeComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, stepIndex]);

  return (
    <div className="max-w-3xl mx-auto my-6 sm:my-12 animate-in fade-in zoom-in-95 duration-300">
      {!isAnalyzing ? (
        <div className="relative rounded-3xl bg-[#121624]/90 backdrop-blur-xl border border-slate-700/60 p-8 sm:p-12 shadow-2xl overflow-hidden">
          
          {/* Top hairline bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-slate-700/80" />

          {/* Header Tag & Title */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-200 text-xs font-mono tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Razorpay AI Commerce Revenue Agent</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Where AI is silently <br />
              <span className="text-slate-300 font-medium">
                losing you customers.
              </span>
            </h1>

            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-sans">
              AI engines (ChatGPT, Gemini 3.5, Perplexity) recommend competitors when your catalog lacks structured proof. Catalyst finds the gap and fixes it.
            </p>
          </div>

          {/* Live Query Radar Ticker */}
          <div className="mt-8 p-3 rounded-2xl bg-[#0d0f17] border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2 text-slate-400 pl-2">
              <Radar className="w-4 h-4 text-blue-300" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Live AI Search Radar:</span>
            </div>
            <div className="text-slate-300 truncate font-mono text-[11px] bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700/60 flex-1 max-w-md text-right">
              "{liveQueries[activeQueryIndex]}"
            </div>
          </div>

          {/* Store URL Input Dock */}
          <div className="mt-8 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                  🔗 Enter Your Storefront URL
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Supports any headless / web store</span>
              </div>
              
              <div className="relative group">
                <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://yourstore.vercel.app"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0d0f17] border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-400 font-mono transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Interactive Sample Store Pills */}
            <div className="pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Or inspect verified test stores:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleStores.map((store) => (
                  <button
                    key={store.url}
                    type="button"
                    onClick={() => setStoreUrl(store.url)}
                    className={`p-3 rounded-xl border text-left transition-all font-mono cursor-pointer flex items-center justify-between group ${
                      storeUrl === store.url
                        ? 'bg-slate-800/80 border-blue-400/50 shadow-sm'
                        : 'bg-[#0d0f17] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center gap-1.5">
                        <span>{store.name}</span>
                        {storeUrl === store.url && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{store.tag}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-sans">
                      {store.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Big Tactile CTA */}
            <button
              onClick={handleStartAnalysis}
              className="w-full mt-6 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Run Autonomous Opportunity Scan</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Invariant Note */}
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Deterministic • No changes applied without merchant sign-off</span>
            </div>
          </div>
        </div>
      ) : (
        /* Agent Progress Scanner Screen */
        <div className="relative rounded-3xl bg-[#121624]/95 backdrop-blur-xl border border-slate-700 p-8 sm:p-12 shadow-2xl space-y-8 animate-in fade-in duration-300 overflow-hidden">
          
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 text-blue-300 mb-1">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              Observatory Engine Active
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Scanning catalog endpoints for: <span className="text-blue-200 font-semibold">{storeUrl}</span>
            </p>
          </div>

          <div className="space-y-3 max-w-md mx-auto bg-[#0d0f17] p-5 rounded-2xl border border-slate-800">
            {analysisSteps.map((step, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 text-xs transition-all duration-300 ${
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

          <div className="pt-1 text-center">
            <span className="text-[11px] font-mono text-slate-500">
              Model: <strong className="text-blue-200">Gemini 3.5 Flash</strong> • Verified Ground Truth Invariants
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
