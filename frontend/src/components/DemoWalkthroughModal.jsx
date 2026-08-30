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
  ShieldAlert, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function DemoWalkthroughModal({ isOpen, onClose, onNavigateTab }) {
  const [currentBeat, setCurrentBeat] = useState(1);

  if (!isOpen) return null;

  const beats = [
    {
      beat: 1,
      title: "Beat 1: Discover",
      subtitle: "Why isn't AI recommending me?",
      tabId: "opportunities",
      color: "from-blue-600 to-indigo-600",
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-200 leading-relaxed">
            The merchant is losing AI shopping engine queries for high-intent searches like <strong className="text-white">"Best waterproof hiking boots under ₹5,000"</strong>.
          </p>
          <div className="bg-surface-dark p-3.5 rounded-xl border border-surface-border font-mono space-y-1.5">
            <div className="flex justify-between text-rose-400">
              <span>Your Store:</span>
              <span className="font-bold">3 / 20 trials (15%)</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Competitor A:</span>
              <span className="font-bold">11 / 20 trials (55%)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Competitor B:</span>
              <span>6 / 20 trials (30%)</span>
            </div>
          </div>
          <p className="text-slate-400">
            Catalyst proactively detects this gap across 40 tracked shopping queries without waiting for merchant analytics inquiries.
          </p>
        </div>
      )
    },
    {
      beat: 2,
      title: "Beat 2: Diagnose",
      subtitle: "What evidence is my competitor providing that I am missing?",
      tabId: "opportunities",
      color: "from-amber-600 to-orange-600",
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Catalyst uses <strong className="text-white">Gemini 3.5 Flash</strong> to compare machine-readable product evidence against competitor catalogs.
          </p>
          <div className="grid grid-cols-2 gap-2 text-center font-mono">
            <div className="bg-surface-dark p-2.5 rounded-lg border border-surface-border">
              <div className="text-[10px] text-slate-500 uppercase">Your Product</div>
              <div className="text-sm font-bold text-rose-400 mt-1">5 Attributes</div>
              <div className="text-[10px] text-slate-400 mt-0.5">18 Reviews • 3 FAQs</div>
              <div className="text-[10px] text-rose-400 mt-0.5">No Schema.org</div>
            </div>
            <div className="bg-surface-dark p-2.5 rounded-lg border border-surface-border">
              <div className="text-[10px] text-slate-500 uppercase">Competitor A</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">11 Attributes</div>
              <div className="text-[10px] text-slate-400 mt-0.5">312 Reviews • 18 FAQs</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Valid JSON-LD</div>
            </div>
          </div>
          <p className="text-indigo-300 bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-500/30 text-[11px]">
            <strong>Root Cause:</strong> AI engines favor competitors because their specs explicitly state IPX7 15,000mm waterproofing, Vibram sole, and wide toe box sizing.
          </p>
        </div>
      )
    },
    {
      beat: 3,
      title: "Beat 3: Fix & Approve",
      subtitle: "Propose a bounded change with mandatory merchant approval.",
      tabId: "diff",
      color: "from-purple-600 to-indigo-600",
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Catalyst drafts a schema-valid <strong className="text-white">FixDiff</strong> containing verified product attributes, JSON-LD structured data, and technical FAQs.
          </p>
          <div className="bg-[#06080d] p-3 rounded-lg border border-surface-border font-mono text-[11px] space-y-1 text-emerald-300">
            <div>+ Waterproofing: HydroGuard IPX7 (15,000mm)</div>
            <div>+ Weight: 420g (Ultralight)</div>
            <div>+ Outsole: Vibram MegaGrip 5mm Lugs</div>
            <div>+ Schema.org/Product + FAQPage JSON-LD</div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-[11px]">
            <strong>Safety Gate:</strong> Backend verifies facts against merchant specs before proposing. The agent never silently deploys — merchant approval is mandatory.
          </div>
        </div>
      )
    },
    {
      beat: 4,
      title: "Beat 4: Prove Revenue",
      subtitle: "Measure incremental AI-attributed GMV in a controlled experiment.",
      tabId: "experiments",
      color: "from-emerald-600 to-teal-600",
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Catalyst runs a controlled treatment vs control simulation over the same traffic volume to prove incremental revenue.
          </p>
          <div className="bg-surface-dark p-3.5 rounded-xl border border-emerald-500/40 text-center space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
              Verified Incremental AI GMV
            </div>
            <div className="text-3xl font-black text-white font-mono">
              +₹1.50L <span className="text-base font-bold text-emerald-400">(+125% Lift)</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Control ₹1.20L → Treatment ₹2.70L
            </div>
          </div>
          <p className="text-[10px] font-mono text-center text-slate-400 bg-surface-dark p-1.5 rounded border border-surface-border">
            Always labeled: <strong>"Controlled simulation result"</strong>
          </p>
        </div>
      )
    },
    {
      beat: 5,
      title: "Beat 5: Trust & Don't Overclaim",
      subtitle: "Exclude ambiguous & spoofed traffic to guarantee payments integrity.",
      tabId: "attribution",
      color: "from-rose-600 to-pink-600",
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-200 leading-relaxed">
            Inspect a suspicious session pretending to be AI traffic:
          </p>
          <div className="bg-surface-dark p-3 rounded-lg border border-rose-500/30 font-mono text-[11px] space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Referrer: chatgpt.com</span>
              <span className="text-emerald-400">✓ (+1)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Query Match: invalid-q99</span>
              <span className="text-rose-400">✗ (0)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Behavior: Generic bounce</span>
              <span className="text-rose-400">✗ (0)</span>
            </div>
            <div className="flex justify-between text-rose-300 font-bold">
              <span>Spoof Signature Penalty:</span>
              <span>✓ (-2 Penalty)</span>
            </div>
            <div className="pt-1 border-t border-surface-border flex justify-between text-rose-400 font-bold">
              <span>Decision: REJECTED</span>
              <span>₹2,500 Excluded</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-center text-indigo-200 font-bold text-xs">
            "Catalyst would rather undercount than falsely claim revenue."
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
      onNavigateTab(beats[nextBeat - 1].tabId);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentBeat > 1) {
      const prevBeat = currentBeat - 1;
      setCurrentBeat(prevBeat);
      onNavigateTab(beats[prevBeat - 1].tabId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-card border border-surface-border shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className={`p-5 bg-gradient-to-r ${currentStep.color} text-white flex items-center justify-between`}>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">
              Catalyst 5-Beat Demo Narrative
            </div>
            <h2 className="text-lg font-black mt-0.5">{currentStep.title}</h2>
            <p className="text-xs text-white/90">{currentStep.subtitle}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex bg-surface-dark border-b border-surface-border p-2">
          {beats.map(b => (
            <button
              key={b.beat}
              onClick={() => {
                setCurrentBeat(b.beat);
                onNavigateTab(b.tabId);
              }}
              className={`flex-1 py-1 text-center text-[10px] font-mono font-bold transition-all rounded ${
                currentBeat === b.beat 
                  ? 'bg-brand-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Beat {b.beat}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {currentStep.content}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-surface-dark/80 border-t border-surface-border flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentBeat === 1}
            className="px-3 py-1.5 rounded-lg border border-surface-border text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
          >
            <span>{currentBeat === beats.length ? 'Finish Demo' : 'Next Beat'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
