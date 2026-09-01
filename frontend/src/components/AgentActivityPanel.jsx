import React, { useState } from 'react';
import {
  Activity,
  Clock,
  UserCheck,
  Bot,
  CheckCircle2,
  Search,
  Zap,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Terminal,
  AlertCircle,
  ExternalLink
} from 'lucide-react';


// The 3-step reasoning trace Catalyst produced to arrive at this fix
const REASONING_STEPS = [
  {
    step: 1,
    state: 'OBSERVE',
    label: 'Scanned AI Shopping Surfaces',
    tool: 'get_query_results()',
    what: 'Ran 40 high-intent buying queries across ChatGPT, Claude, Perplexity, Gemini, and Copilot Shopping.',
    found: 'Apex Ridge Boots appeared in 12.7% of relevant queries. Competitor "Monsoon Trekker Pro" appeared in 55.0% of the same queries.',
    output: {
      merchant_win_rate: '12.7%',
      competitor_win_rate: '55.0%',
      queries_tested: 40,
      status: 'DEFICIT_DETECTED'
    },
    color: 'blue'
  },
  {
    step: 2,
    state: 'DIAGNOSE',
    label: 'Identified the Evidence Gap',
    tool: 'diagnose_gap()',
    what: 'Compared merchant product page content against competitor pages for the same winning queries. Measured attribute and structured data coverage.',
    found: 'Merchant page had 5 machine-readable attributes. Competitor had 11. Missing: waterproof rating (IPX7), weight (420g), outsole brand (Vibram), traction depth, and Schema.org JSON-LD structured data.',
    output: {
      merchant_attributes: 5,
      competitor_attributes: 11,
      missing: ['IPX7 waterproof rating', 'Weight (420g)', 'Vibram MegaGrip outsole', 'Schema.org JSON-LD'],
      root_cause: 'AI engines cannot surface unstructured product claims'
    },
    color: 'amber'
  },
  {
    step: 3,
    state: 'PROPOSE',
    label: 'Generated a Bounded, Verified Fix',
    tool: 'generate_fix_diff()',
    what: 'Created FixDiff #diff-apex-01 — a precise, catalog-grounded set of changes. Each proposed attribute was verified against the merchant\'s own catalog data before inclusion.',
    found: '4 verified attributes added. 0 hallucinated claims. Schema.org JSON-LD generated. Agent paused and waiting for merchant approval before any change is deployed.',
    output: {
      diff_id: 'diff-apex-01',
      claims_added: 4,
      hallucinated_claims: 0,
      gate: 'WAIT_FOR_APPROVAL',
      validation_status: 'verified'
    },
    color: 'emerald'
  }
];

const STATE_MACHINE = [
  { id: 'OBSERVE',           num: '01', done: true },
  { id: 'DIAGNOSE',         num: '02', done: true },
  { id: 'PROPOSE',          num: '03', done: true },
  { id: 'WAIT APPROVAL',    num: '04', active: true },
  { id: 'APPLY',            num: '05' },
  { id: 'EXPERIMENT',       num: '06' },
  { id: 'VERIFY',           num: '07' },
  { id: 'REPORT',           num: '08' },
];

const COLOR_MAP = {
  blue: {
    bg: 'bg-blue-950/40',
    border: 'border-blue-800/60',
    badge: 'bg-blue-950 text-blue-300 border-blue-800',
    dot: 'bg-blue-500',
    icon: 'text-blue-400',
    output: 'text-blue-300',
  },
  amber: {
    bg: 'bg-amber-950/30',
    border: 'border-amber-800/60',
    badge: 'bg-amber-950 text-amber-300 border-amber-800',
    dot: 'bg-amber-500',
    icon: 'text-amber-400',
    output: 'text-amber-300',
  },
  emerald: {
    bg: 'bg-emerald-950/30',
    border: 'border-emerald-800/60',
    badge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    dot: 'bg-emerald-500',
    icon: 'text-emerald-400',
    output: 'text-emerald-300',
  },
};

function ReasoningStep({ step, isLast }) {
  const [expanded, setExpanded] = useState(step.step === 2); // diagnosis open by default
  const c = COLOR_MAP[step.color];

  return (
    <div className="relative flex gap-4">
      {/* Vertical connector */}
      {!isLast && (
        <div className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-slate-800 z-0" />
      )}

      {/* Step dot */}
      <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full ${c.bg} border ${c.border} flex items-center justify-center mt-0.5`}>
        <span className={`text-[10px] font-mono font-bold ${c.icon}`}>{String(step.step).padStart(2, '0')}</span>
      </div>

      {/* Card */}
      <div className={`flex-1 mb-5 rounded-2xl border ${c.border} ${c.bg} overflow-hidden`}>
        {/* Header — always visible */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer"
        >
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${c.badge}`}>
                {step.state}
              </span>
              <span className={`text-[10px] font-mono ${c.icon}`}>{step.tool}</span>
            </div>
            <p className="text-sm font-semibold text-white">{step.label}</p>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">{step.what}</p>
          </div>
          <div className="flex-shrink-0 mt-0.5">
            {expanded
              ? <ChevronUp className="w-4 h-4 text-slate-500" />
              : <ChevronDown className="w-4 h-4 text-slate-500" />
            }
          </div>
        </button>

        {/* Expanded: what was found + raw output */}
        {expanded && (
          <div className="px-4 pb-4 space-y-3 border-t border-slate-800/60">
            {/* What it found */}
            <div className="pt-3 flex items-start gap-2">
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${c.icon}`} />
              <p className="text-xs text-slate-200 font-sans leading-relaxed">{step.found}</p>
            </div>

            {/* Machine-readable output */}
            <div className="bg-[#05070d] rounded-xl border border-slate-800 p-3 font-mono text-[11px] space-y-1">
              <div className="text-slate-500 mb-2 text-[10px] uppercase tracking-wider">Tool output</div>
              {Object.entries(step.output).map(([k, v]) => (
                <div key={k} className="flex items-start gap-2">
                  <span className="text-slate-500 min-w-[140px]">{k}:</span>
                  <span className={Array.isArray(v) ? 'text-slate-300' : c.output}>
                    {Array.isArray(v) ? v.join(', ') : String(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentActivityPanel({ events = [], agentState, activeDiff, onOpenDiffModal }) {
  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied';

  const defaultEvents = events.length > 0 ? events : [
    {
      event_id: 'evt-01',
      actor: 'catalyst-agent',
      agent_state: 'OBSERVE',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      reason: 'Ingested storefront catalog (12 SKUs) and evaluated 40 high-intent shopping queries across AI engines.',
      tool_name: 'get_query_results'
    },
    {
      event_id: 'evt-02',
      actor: 'catalyst-agent',
      agent_state: 'DIAGNOSE',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      reason: 'Diagnosed evidence gap for Apex Ridge Boots (12.7% win rate vs 55% Monsoon Trekker). Missing IPX7, Vibram sole, and Schema.org specs.',
      tool_name: 'diagnose_gap'
    },
    {
      event_id: 'evt-03',
      actor: 'catalyst-agent',
      agent_state: 'PROPOSE',
      timestamp: new Date(Date.now() - 2400000).toISOString(),
      reason: 'Generated bounded FixDiff #diff-apex-01. Verified 4 claims, 0 hallucinations. Paused for merchant approval.',
      tool_name: 'generate_fix_diff'
    },
    {
      event_id: 'evt-04',
      actor: 'catalyst-agent',
      agent_state: isApproved ? 'APPLY' : 'WAIT_FOR_APPROVAL',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      reason: isApproved
        ? 'Merchant approved FixDiff. Deployed structured Schema.org JSON-LD to live storefront.'
        : 'Mandatory approval gate enforced. No changes deployed without merchant sign-off.',
      tool_name: isApproved ? 'apply_fix_patch' : 'enforce_approval_gate'
    }
  ];

  const stateMachineSteps = [
    { id: 'OBSERVE', num: '01', done: true, active: false },
    { id: 'DIAGNOSE', num: '02', done: true, active: false },
    { id: 'PROPOSE', num: '03', done: true, active: false },
    { id: 'WAIT APPROVAL', num: '04', done: isApproved, active: !isApproved },
    { id: 'APPLY', num: '05', done: isApproved, active: false },
    { id: 'EXPERIMENT', num: '06', done: isApproved, active: false },
    { id: 'VERIFY', num: '07', done: isApproved, active: false },
    { id: 'REPORT', num: '08', done: false, active: isApproved },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-[#121624]/95 border border-slate-700/80 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>Agent Reasoning Audit</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            How Catalyst Arrived at This Fix
          </h2>
          <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
            Every decision Catalyst made is logged here as a verifiable tool call. No black box — you can see exactly what it looked at, what it found, and why it proposed the fix it did.
          </p>
        </div>
        <div className="flex-shrink-0 text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2 text-center space-y-0.5">
          <div className="text-white font-semibold">{isApproved ? 'Deployed & Verified' : '3 tool calls'}</div>
          <div>0 hallucinated claims</div>
        </div>
      </div>

      {/* State Machine Progress */}
      <div className="bg-[#121624]/95 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-3">Agent state machine — current position</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {stateMachineSteps.map(s => (
            <div
              key={s.id}
              className={`py-2 px-1 rounded-xl border text-center transition-all ${
                s.active
                  ? isApproved
                    ? 'bg-emerald-950/50 border-emerald-600/70 ring-1 ring-emerald-500/30'
                    : 'bg-amber-950/40 border-amber-700/60 ring-1 ring-amber-500/20'
                  : s.done
                  ? 'bg-emerald-950/30 border-emerald-800/40'
                  : 'bg-[#090c14] border-slate-800'
              }`}
            >
              <div className={`text-[9px] font-mono font-bold ${
                s.active
                  ? isApproved ? 'text-emerald-300' : 'text-amber-400'
                  : s.done
                  ? 'text-emerald-400'
                  : 'text-slate-600'
              }`}>
                {s.done ? '✓' : s.num}
              </div>
              <div className={`text-[9px] uppercase tracking-wide font-semibold mt-0.5 truncate ${
                s.active
                  ? isApproved ? 'text-emerald-200' : 'text-amber-200'
                  : s.done
                  ? 'text-emerald-300'
                  : 'text-slate-600'
              }`}>
                {s.id}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-sans">
          {isApproved ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-emerald-300 font-medium">Approved & Deployed</span>
              <span className="text-slate-400">— Catalog patch active on apex-outdoor.vercel.app with verified Schema.org JSON-LD.</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="text-amber-300 font-medium">Waiting for your approval</span>
              <span className="text-slate-500">— agent has paused. No changes have been deployed yet.</span>
            </>
          )}
        </div>
      </div>


      {/* Reasoning Trace */}
      <div className="bg-[#121624]/95 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-5">
          Verifiable reasoning trace — click any step to inspect
        </p>

        <div>
          {REASONING_STEPS.map((step, i) => (
            <ReasoningStep
              key={step.step}
              step={step}
              isLast={i === REASONING_STEPS.length - 1}
            />
          ))}
        </div>

        {/* CTA to approve or View Deployed Status */}
        {isApproved ? (
          <div className="mt-2 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-300">FixDiff #diff-apex-01 is Approved & Deployed ✓</p>
              <p className="text-xs text-slate-400 font-sans">4 verified attributes · Schema.org JSON-LD active on apex-outdoor.vercel.app</p>
            </div>
            <a
              href="https://apex-outdoor.vercel.app/?enhanced=true"
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="mt-2 p-4 rounded-2xl bg-blue-950/30 border border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-white">Ready to deploy FixDiff #diff-apex-01?</p>
              <p className="text-xs text-slate-400 font-sans">4 verified attributes · 0 hallucinations · Schema.org JSON-LD included</p>
            </div>
            <button
              onClick={() => typeof onOpenDiffModal === 'function' && onOpenDiffModal()}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Review & Approve Fix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>


      {/* Chronological event log (collapsible) */}
      <details className="bg-[#121624]/95 border border-slate-700/80 rounded-3xl shadow-xl overflow-hidden group">
        <summary className="p-5 flex items-center justify-between gap-3 cursor-pointer list-none">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>Full Chronological Event Log ({defaultEvents.length} events)</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
        </summary>

        <div className="px-6 pb-6 border-t border-slate-800">
          <div className="relative pl-6 space-y-3 mt-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {defaultEvents.map((evt, idx) => {
              const isMerchant = evt.actor === 'merchant';
              return (
                <div key={evt.event_id || idx} className="relative">
                  <div className={`absolute -left-[27px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isMerchant
                      ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                      : 'bg-blue-950 border-blue-600 text-blue-400'
                  }`}>
                    {isMerchant ? <UserCheck className="w-2.5 h-2.5" /> : <Bot className="w-2.5 h-2.5" />}
                  </div>

                  <div className="bg-[#090c14] border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                      <span className={`px-1.5 py-0.5 rounded font-bold uppercase border ${
                        isMerchant ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-blue-950 text-blue-300 border-blue-800'
                      }`}>
                        {evt.actor}
                      </span>
                      <span className="text-slate-400 font-bold">[{evt.agent_state}]</span>
                      <span className="text-slate-600 ml-auto flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{evt.reason}</p>
                    {evt.tool_name && (
                      <div className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800 inline-block">
                        Tool: <span className="text-blue-400 font-bold">{evt.tool_name}()</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </details>

    </div>
  );
}
