import React from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Layers, FileCode, MessageSquare, Star } from 'lucide-react';

export default function OpportunityCard({ opportunities = [], onSelectOpportunity, onGenerateFix, isGenerating }) {
  const topOpp = opportunities[0] || {
    id: 'opp-01',
    rank: 1,
    title: 'Product Evidence & Attributes Gap (Footwear & Trekking)',
    impact_level: 'High',
    affected_queries_count: 12,
    description: 'Competitor A provides 11 machine-readable technical attributes (IPX7 waterproofing, 420g weight, Vibram outsole, terrain ratings) compared to your 5 basic attributes, capturing 55% of AI recommendations.',
    estimated_potential_gmv_gain: 150000.0,
    status: 'open'
  };

  const getGapIcon = (type) => {
    switch (type) {
      case 'attribute_gap': return Layers;
      case 'schema_gap': return FileCode;
      case 'faq_gap': return MessageSquare;
      case 'review_gap': return Star;
      default: return AlertCircle;
    }
  };

  return (
    <div className="rounded-2xl bg-surface-card border border-surface-border p-6 shadow-lg">
      
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Agent Prioritization
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
            <span>Ranked Merchant Opportunities</span>
            <span className="text-xs font-normal text-slate-400">({opportunities.length} identified)</span>
          </h2>
        </div>
        <span className="text-xs text-slate-400 bg-surface-dark px-2.5 py-1 rounded-md border border-surface-border">
          Ranked by Potential AI GMV
        </span>
      </div>

      {/* Hero #1 Opportunity Box */}
      <div className="mt-5 rounded-xl bg-gradient-to-br from-[#121c2e] to-[#0c1322] border-2 border-brand-500/40 p-5 relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500 text-white uppercase tracking-wider">
                Rank #1 Highest Impact
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                High Impact
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {topOpp.affected_queries_count} shopping queries affected
              </span>
            </div>

            <h3 className="text-base font-bold text-white pt-1">
              {topOpp.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              {topOpp.description}
            </p>

            {/* Evidence comparison pill row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              <div className="bg-surface-dark/80 p-2 rounded-lg border border-surface-border text-center">
                <div className="text-[10px] text-slate-400 uppercase">Your Product</div>
                <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">5 Attributes</div>
              </div>
              <div className="bg-surface-dark/80 p-2 rounded-lg border border-surface-border text-center">
                <div className="text-[10px] text-slate-400 uppercase">Competitor A</div>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">11 Attributes</div>
              </div>
              <div className="bg-surface-dark/80 p-2 rounded-lg border border-surface-border text-center">
                <div className="text-[10px] text-slate-400 uppercase">AI Win Share</div>
                <div className="text-sm font-bold text-rose-400 font-mono mt-0.5">3/20 vs 11/20</div>
              </div>
              <div className="bg-surface-dark/80 p-2 rounded-lg border border-surface-border text-center">
                <div className="text-[10px] text-slate-400 uppercase">Est. GMV Gain</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">+₹1.50L</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-surface-border/60 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-slate-400 font-mono">
            Target SKU: <strong className="text-slate-200">Apex Ridge Waterproof Boots (merch-boot-01)</strong>
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelectOpportunity(topOpp)}
              className="px-3 py-1.5 rounded-lg border border-surface-borderLight hover:bg-surface-card text-xs font-semibold text-slate-200 transition-colors"
            >
              Inspect Evidence
            </button>
            <button
              onClick={() => onGenerateFix(topOpp.id, 'merch-boot-01')}
              disabled={isGenerating}
              className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>{isGenerating ? 'Reasoning with Gemini...' : 'Propose Bounded Fix'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Opportunities List */}
      <div className="mt-4 divide-y divide-surface-border">
        {opportunities.slice(1).map((opp, idx) => {
          const Icon = getGapIcon(opp.gap_type);
          return (
            <div 
              key={opp.id} 
              className="py-3 flex items-center justify-between hover:bg-surface-cardLighter/40 px-2 rounded-lg transition-colors cursor-pointer"
              onClick={() => onSelectOpportunity(opp)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-surface-dark border border-surface-border flex items-center justify-center text-slate-400">
                  <Icon className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">#{idx + 2} {opp.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      opp.impact_level === 'High' 
                        ? 'bg-rose-500/15 text-rose-300' 
                        : 'bg-amber-500/15 text-amber-300'
                    }`}>
                      {opp.impact_level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xl">
                    {opp.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block font-mono">
                  <div className="text-xs font-bold text-white">+₹{(opp.estimated_potential_gmv_gain / 1000).toFixed(0)}k</div>
                  <div className="text-[10px] text-slate-500">Est. AI GMV</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
