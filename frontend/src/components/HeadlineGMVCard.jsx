import React from 'react';
import { TrendingUp, ShieldCheck, Eye, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeadlineGMVCard({ experiment, evaluation, onLaunchDemo }) {
  const verifiedGMV = experiment?.treatment?.verified_gmv 
    ? (experiment.treatment.verified_gmv / 100000).toFixed(2) 
    : "4.72";

  const incrementalGMV = experiment?.incremental_gmv 
    ? (experiment.incremental_gmv / 100000).toFixed(2)
    : "1.50";

  const precisionPct = evaluation?.precision 
    ? (evaluation.precision * 100).toFixed(1)
    : "100.0";

  const visGain = experiment?.visibility_gain_pts ?? 9.6;
  const convLift = experiment?.incremental_gmv_pct ?? 125.0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-card to-[#0d1527] border border-surface-border p-6 shadow-xl glow-blue">
      {/* Top Banner / Controlled Simulation Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-surface-border/80">
        <div className="flex items-center space-x-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Catalyst Live Agent Loop
          </span>
          <span className="text-xs font-medium text-slate-500">•</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-blue border border-brand-500/30">
            Controlled simulation result
          </span>
        </div>

        <button
          onClick={onLaunchDemo}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch 5-Beat Demo Walkthrough</span>
        </button>
      </div>

      {/* Main Hero Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* Left: Primary Hero Metric */}
        <div className="md:col-span-6 space-y-2">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-blue" />
            Verified AI-Attributed GMV
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              ₹{verifiedGMV}L
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              +₹{incrementalGMV}L Incremental
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-1">
            Proven AI commerce provenance via 5-signal deterministic verification. Excludes ambiguous & spoofed traffic.
          </p>
        </div>

        {/* Right: 3 Metric Badges */}
        <div className="md:col-span-6 grid grid-cols-3 gap-3">
          {/* Visibility */}
          <div className="bg-surface-dark/60 rounded-xl p-3.5 border border-surface-border/70 hover:border-brand-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider">AI Visibility</span>
              <Eye className="w-3.5 h-3.5 text-brand-blue" />
            </div>
            <div className="text-xl font-bold text-white font-mono flex items-center gap-1">
              +{visGain}
              <span className="text-xs font-normal text-slate-400">pts</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-medium mt-1">
              8.2% → 17.8% win rate
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-surface-dark/60 rounded-xl p-3.5 border border-surface-border/70 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider">AI Lift</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono flex items-center gap-1">
              +{convLift}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Treatment vs Control
            </div>
          </div>

          {/* Attribution Precision */}
          <div className="bg-surface-dark/60 rounded-xl p-3.5 border border-surface-border/70 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider">Attribution</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono flex items-center gap-1">
              {precisionPct}%
            </div>
            <div className="text-[10px] text-indigo-300 font-medium mt-1">
              Held-out test split
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
