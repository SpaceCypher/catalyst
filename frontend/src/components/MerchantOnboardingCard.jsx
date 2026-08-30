import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

export default function MerchantOnboardingCard({ onAnalyzeComplete }) {
  const [storeUrl, setStoreUrl] = useState('https://apexridge-outdoors.myshopify.com');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

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
    <div className="max-w-2xl mx-auto my-10 animate-in fade-in zoom-in-95 duration-300">
      {!isAnalyzing ? (
        <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle glow header */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400" />
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-blue text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Razorpay AI Commerce Revenue Agent</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Find where AI is losing you customers.
            </h1>

            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Catalyst discovers why AI shopping engines recommend competitors instead of your store, diagnoses evidence gaps, and drafts verified product fixes to boost your revenue.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                🔗 Your Store URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://yourstore.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface-dark border border-surface-border text-white text-sm focus:outline-none focus:border-brand-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] text-slate-400 self-center">Try sample store:</span>
              <button
                onClick={() => setStoreUrl('https://apexridge-outdoors.myshopify.com')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-dark border border-surface-border text-slate-300 hover:text-white hover:border-slate-500 transition-colors font-mono"
              >
                Apex Ridge Outdoors
              </button>
              <button
                onClick={() => setStoreUrl('https://monsoon-trekker.in')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-dark border border-surface-border text-slate-300 hover:text-white hover:border-slate-500 transition-colors font-mono"
              >
                Monsoon Trekker
              </button>
            </div>

            <button
              onClick={handleStartAnalysis}
              className="w-full mt-4 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white text-base font-bold shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center space-x-2.5 group"
            >
              <Sparkles className="w-5 h-5 text-indigo-200 group-hover:rotate-12 transition-transform" />
              <span>✦ Analyze my store</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Takes ~30 seconds • No changes made without your explicit approval</span>
            </div>
          </div>
        </div>
      ) : (
        /* Agent Progress Screen */
        <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-blue mb-2 animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Catalyst is analyzing your store
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Analyzing: <span className="text-brand-blue">{storeUrl}</span>
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
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
                      ? 'text-brand-blue font-bold scale-[1.02]'
                      : 'text-slate-500'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700" />
                    )}
                  </div>
                  <span>{isDone ? step.doneLabel : step.label}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] font-mono text-slate-400">
              Powered by <strong className="text-brand-blue">Gemini 3.5 Flash</strong> reasoning + Deterministic Verification
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
