import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  TrendingDown, 
  Layers, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';

export default function DiagnosisPanel({ opportunities = [], activeDiff, onProposeFix, isGenerating }) {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied';

  const sampleQueries = [
    {
      id: 'q01',
      text: 'Best waterproof hiking boots under ₹5,000 for monsoon treks',
      category: 'Footwear',
      yourRate: '3 / 20',
      compRate: '11 / 20',
      compBRate: '6 / 20',
      winner: 'Competitor A (SummitPro Trek)',
      gapReason: 'Competitor A provides exhaustive technical attributes (IPX7 15,000mm waterproofing, Vibram MegaGrip sole, 420g weight) and structured JSON-LD schema, answering consumer queries on rain durability that merchant catalog leaves blank.'
    },
    {
      id: 'q02',
      text: 'Trekking boots with high ankle support and Vibram grip',
      category: 'Footwear',
      yourRate: '2 / 20',
      compRate: '13 / 20',
      compBRate: '5 / 20',
      winner: 'Competitor A (SummitPro Trek)',
      gapReason: 'Merchant boot description lacks ankle collar specifications, lace-hook material, and sole lug depth metrics.'
    },
    {
      id: 'q11',
      text: 'Durable trekking backpack 45L to 50L with rain cover under ₹3,500',
      category: 'Outdoor Gear',
      yourRate: '4 / 20',
      compRate: '12 / 20',
      compBRate: '4 / 20',
      winner: 'Competitor A (Apex Expedition 50L)',
      gapReason: 'Competitor includes 8 specific pocket locations, 3D mesh suspension diagram, and PU coating hydrostatic rating.'
    },
    {
      id: 'q31',
      text: 'Noise cancelling wireless earbuds with long battery for gym under ₹3,500',
      category: 'Electronics',
      yourRate: '5 / 20',
      compRate: '10 / 20',
      compBRate: '5 / 20',
      winner: 'Competitor B (SoundPeak Elite 85)',
      gapReason: 'Competitor provides IP57 sweatproof test data and 42dB hybrid ANC decibel reduction graph.'
    }
  ];

  const currentQuery = sampleQueries[selectedQueryIndex];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card border border-surface-border p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>02 DIAGNOSE</span>
            <span>•</span>
            <span>Why is AI Recommending Competitors?</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            AI Shopping Engine Discovery Diagnosis
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Empirical multi-trial audit comparing merchant product evidence against competitor catalogs across 40 high-intent shopping queries.
          </p>
        </div>

        <button
          onClick={() => onProposeFix('opp-01', 'merch-boot-01')}
          disabled={isGenerating}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all ${
            isApproved 
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'
              : 'bg-brand-500 hover:bg-brand-600 text-white hover:scale-105'
          }`}
        >
          <span>
            {isGenerating 
              ? 'Generating...' 
              : isApproved 
              ? '✓ Fix Approved (Review Diff)' 
              : 'Propose Bounded Fix'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Query Selector Tabs */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Select High-Intent Shopping Query
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {sampleQueries.map((q, idx) => {
            const isSelected = selectedQueryIndex === idx;
            return (
              <button
                key={q.id}
                onClick={() => setSelectedQueryIndex(idx)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected 
                    ? 'bg-brand-500/10 border-brand-500 shadow-sm' 
                    : 'bg-surface-dark/60 border-surface-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400">{q.id} • {q.category}</span>
                  <span className="text-[10px] font-bold font-mono text-rose-400">{q.yourRate} Win</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-2">
                  "{q.text}"
                </div>
              </button>
            );
          })}
        </div>

        {/* Query Detail Box */}
        <div className="mt-6 p-5 rounded-xl bg-surface-dark border border-surface-border">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-surface-border">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Current Query Under Test</span>
              <h2 className="text-base font-bold text-white mt-0.5">
                "{currentQuery.text}"
              </h2>
            </div>

            {/* Win Rates Comparison */}
            <div className="flex items-center space-x-3 font-mono text-xs">
              <div className="bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-400">Your Store</div>
                <div className="font-bold text-rose-400">{currentQuery.yourRate} <span className="text-[10px]">(15%)</span></div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-400">Competitor A</div>
                <div className="font-bold text-emerald-400">{currentQuery.compRate} <span className="text-[10px]">(55%)</span></div>
              </div>
              <div className="bg-surface-card border border-surface-border px-3 py-1.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-400">Competitor B</div>
                <div className="font-bold text-slate-300">{currentQuery.compBRate} <span className="text-[10px]">(30%)</span></div>
              </div>
            </div>
          </div>

          {/* Gemini AI Reasoning Summary */}
          <div className="mt-4 p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-500/30">
            <div className="flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-indigo-300">
                  Gemini 3.5 Flash Discovery Reasoning:
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {currentQuery.gapReason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Deep Evidentiary Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Your Merchant Catalog Evidence */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <h3 className="text-sm font-bold text-white">Your Product (Apex Ridge Boots)</h3>
            </div>
            <span className="text-xs font-mono text-rose-400 font-semibold">Thin Catalog State</span>
          </div>

          <div className="mt-4 space-y-4 text-xs">
            <div>
              <div className="text-slate-400 font-medium mb-1">Product Attributes (5 total):</div>
              <ul className="space-y-1.5 font-mono text-slate-300">
                <li className="flex items-center space-x-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Material: Synthetic Leather</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Color: Olive Brown</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Sole: Rubber</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Closure: Lace-Up</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Warranty: 6 months</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-border">
              <div className="bg-surface-dark p-2.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-500">Reviews</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">18</div>
              </div>
              <div className="bg-surface-dark p-2.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-500">Product FAQs</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">3</div>
              </div>
              <div className="bg-surface-dark p-2.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-500">JSON-LD Schema</div>
                <div className="text-sm font-bold text-rose-400 font-mono mt-0.5">Missing</div>
              </div>
            </div>

            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-300 text-[11px]">
              <strong>Missing Critical Specs:</strong> Waterproof membrane rating (IPX7 / mm), exact weight, Vibram sole construction, terrain compatibility, wide toe-box fit guide.
            </div>
          </div>
        </div>

        {/* Competitor A Evidence */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-bold text-white">Competitor A (SummitPro Trek)</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">Rich Catalog State</span>
          </div>

          <div className="mt-4 space-y-4 text-xs">
            <div>
              <div className="text-slate-400 font-medium mb-1">Product Attributes (11 total):</div>
              <ul className="space-y-1.5 font-mono text-slate-300">
                <li className="flex items-center space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Waterproof Rating: HydroGuard IPX7 (15,000mm head)</span>
                </li>
                <li className="flex items-center space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Weight: 420g per boot (Ultralight)</span>
                </li>
                <li className="flex items-center space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sole: Vibram MegaGrip Deep 5mm Lugs</span>
                </li>
                <li className="flex items-center space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terrain: Alpine Rock, Wet Scree, Heavy Snow</span>
                </li>
                <li className="flex items-center space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sizing & Fit: Wide Toe Box for thick socks</span>
                </li>
                <li className="flex items-center space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Warranty: 2-Year Full Replacement Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-border">
              <div className="bg-surface-dark p-2.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-500">Reviews</div>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">312</div>
              </div>
              <div className="bg-surface-dark p-2.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-500">Product FAQs</div>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">18</div>
              </div>
              <div className="bg-surface-dark p-2.5 rounded-lg text-center">
                <div className="text-[10px] text-slate-500">JSON-LD Schema</div>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">100% Valid</div>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 text-[11px]">
              <strong>Advantage Driver:</strong> Machine-readable evidence matches the exact token patterns queried by LLM shopping agents when formulating recommendations.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
