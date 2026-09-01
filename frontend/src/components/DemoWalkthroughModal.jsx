import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Search, 
  Layers, 
  GitPullRequest, 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function DemoWalkthroughModal({ isOpen = true, onClose, onNavigateTab, onOpenDiff }) {
  const [currentBeat, setCurrentBeat] = useState(1);

  if (isOpen === false) return null;

  const beats = [
    {
      beat: 1,
      title: "Beat 1: Discover Demand Loss",
      subtitle: "Why are AI shoppers recommending competitors instead of me?",
      tabId: "catalyst",
      color: "from-blue-600 to-indigo-600",
      content: (
        <div className="space-y-3.5 text-xs">
          <p className="text-slate-200 leading-relaxed">
            The merchant is losing recommendations for high-intent queries like <strong className="text-white">"Best waterproof hiking boots under ₹5,000"</strong> across ChatGPT, Perplexity & Claude.
          </p>
          
          <div className="bg-[#090d16] p-4 rounded-2xl border border-slate-800 font-mono space-y-2">
            <div className="flex justify-between items-center text-rose-400">
              <span className="text-slate-400">Your Store (Apex Ridge):</span>
              <span className="font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">3 / 20 trials (15.0%)</span>
            </div>
            <div className="flex justify-between items-center text-emerald-400">
              <span className="text-slate-400">Competitor A (Monsoon Trekker):</span>
              <span className="font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">11 / 20 trials (55.0%)</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-slate-500">Other Competitors:</span>
              <span>6 / 20 trials (30.0%)</span>
            </div>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            Catalyst proactively discovers this across 40 continuous query vectors without requiring manual keyword configuration.
          </p>
        </div>
      )
    },
    {
      beat: 2,
      title: "Beat 2: Diagnose Evidence Deficit",
      subtitle: "What machine-readable evidence is the competitor providing?",
      tabId: "catalyst",
      color: "from-amber-600 to-orange-600",
      content: (
        <div className="space-y-3.5 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Catalyst compares structured product specifications against winning competitors to pinpoint why AI engines favor them.
          </p>

          <div className="grid grid-cols-2 gap-2.5 font-mono">
            <div className="bg-[#090d16] p-3 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Your Product (Baseline)</div>
              <div className="text-sm font-bold text-rose-400">5 Basic Specs</div>
              <div className="text-[10px] text-slate-400">18 Reviews • 3 FAQs</div>
              <div className="text-[10px] text-rose-400 font-bold">0% Schema.org JSON-LD</div>
            </div>

            <div className="bg-[#090d16] p-3 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Competitor A (Winner)</div>
              <div className="text-sm font-bold text-emerald-400">11 Machine Specs</div>
              <div className="text-[10px] text-slate-400">312 Reviews • 18 FAQs</div>
              <div className="text-[10px] text-emerald-400 font-bold">100% Valid JSON-LD</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed">
            <strong className="text-amber-300">Root Cause:</strong> AI models require verified technical signals (IPX7 15,000mm waterproofing, 420g weight, Vibram sole) to cite products in recommendations.
          </div>
        </div>
      )
    },
    {
      beat: 3,
      title: "Beat 3: Grounded Fix & Mandatory Approval",
      subtitle: "Propose a bounded change with zero hallucinations & human sign-off.",
      tabId: "catalyst",
      color: "from-purple-600 to-indigo-600",
      content: (
        <div className="space-y-3.5 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Catalyst drafts <strong className="text-white">FixDiff #diff-apex-01</strong> verified strictly against your catalog data before pausing at <code className="text-amber-300 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">WAIT_FOR_APPROVAL</code>.
          </p>

          <div className="bg-[#05070d] p-3 rounded-2xl border border-slate-800 font-mono text-[11px] space-y-1 text-emerald-300">
            <div>+ Waterproofing: HydroGuard IPX7 (15,000mm)</div>
            <div>+ Weight: 420g (Ultralight Trail)</div>
            <div>+ Outsole: Vibram MegaGrip 5mm Lugs</div>
            <div>+ Schema.org/Product + FAQPage JSON-LD</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <strong>Deterministic Safety Gate:</strong> 0 unsupported claims. Nothing is ever deployed without merchant sign-off from the dashboard.
            </div>
          </div>
        </div>
      )
    },
    {
      beat: 4,
      title: "Beat 4: Prove Incremental Revenue",
      subtitle: "Measure verified AI-attributed GMV in a controlled experiment.",
      tabId: "proof",
      color: "from-emerald-600 to-teal-600",
      content: (
        <div className="space-y-3.5 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Catalyst runs a seeded Control vs. Treatment simulation over identical traffic distribution to prove causal revenue lift.
          </p>

          <div className="bg-[#090d16] p-4 rounded-2xl border border-emerald-500/30 text-center space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono font-bold">
              Verified Incremental AI GMV
            </div>
            <div className="text-3xl font-black text-white font-mono">
              +₹1.50L <span className="text-sm font-bold text-emerald-400">(+125.0% Lift)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Control: ₹1.20L (16.7% win) → Treatment: ₹2.70L (37.5% win)
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-center text-slate-400">
            Lifting AI recommendation rate from <strong>16.7% → 37.5% (+20.8 pts)</strong>
          </div>
        </div>
      )
    },
    {
      beat: 5,
      title: "Beat 5: Attribution Integrity & Anti-Spoof Shield",
      subtitle: "Exclude bot & spoofed traffic to guarantee Razorpay checkout trust.",
      tabId: "proof",
      color: "from-rose-600 to-pink-600",
      content: (
        <div className="space-y-3.5 text-xs">
          <p className="text-slate-200 leading-relaxed">
            A 5-signal deterministic classifier isolates forged referrers and bot clicks so merchants never overclaim revenue:
          </p>

          <div className="bg-[#090d16] p-3.5 rounded-2xl border border-rose-500/30 font-mono text-[11px] space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Referrer Header:</span>
              <span className="text-emerald-400">✓ chatgpt.com (+1)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Query Match Intent:</span>
              <span className="text-rose-400">✗ None (0)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Timing / Dwell Pattern:</span>
              <span className="text-rose-400">✗ Instant Bounce (0)</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800 flex justify-between text-rose-400 font-bold">
              <span>Verdict: REJECTED (Spoofed)</span>
              <span>₹2,500 Excluded</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-center text-blue-200 font-bold text-xs">
            "Catalyst would rather undercount than falsely claim unearned revenue."
          </div>
        </div>
      )
    }
  ];

  const currentStep = beats[currentBeat - 1];

  const handleNext = () => {
    if (currentBeat < beats.length) {
      const nextBeat = currentBeat + 1;
      setCurrentBeat(nextBeat);
      if (typeof onNavigateTab === 'function') {
        onNavigateTab(beats[nextBeat - 1].tabId);
      }
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentBeat > 1) {
      const prevBeat = currentBeat - 1;
      setCurrentBeat(prevBeat);
      if (typeof onNavigateTab === 'function') {
        onNavigateTab(beats[prevBeat - 1].tabId);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#121624] border border-slate-700/90 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className={`p-6 bg-gradient-to-r ${currentStep.color} text-white flex items-start justify-between gap-3 shadow-md`}>
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
              Catalyst 5-Beat Demo Narrative
            </div>
            <h2 className="text-lg font-display font-black text-white">{currentStep.title}</h2>
            <p className="text-xs text-white/90 leading-relaxed font-sans">{currentStep.subtitle}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer flex-shrink-0"
            title="Close Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex bg-[#090d16] border-b border-slate-800 p-2.5 gap-1">
          {beats.map(b => (
            <button
              key={b.beat}
              onClick={() => {
                setCurrentBeat(b.beat);
                if (typeof onNavigateTab === 'function') onNavigateTab(b.tabId);
              }}
              className={`flex-1 py-1.5 text-center text-[10px] font-mono font-bold transition-all rounded-lg cursor-pointer ${
                currentBeat === b.beat 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Beat {b.beat}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1">
          {currentStep.content}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#090d16] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentBeat === 1}
            className="px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentBeat === 3 && typeof onOpenDiff === 'function' && (
              <button
                onClick={onOpenDiff}
                className="px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all cursor-pointer"
              >
                Inspect FixDiff
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{currentBeat === beats.length ? 'Close Walkthrough' : 'Next Beat'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
