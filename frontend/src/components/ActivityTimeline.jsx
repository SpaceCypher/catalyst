import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  Terminal, 
  Zap,
  Flame,
  TrendingUp,
  FileCode
} from 'lucide-react';

export default function ActivityTimeline({ activeDiff, experimentResult }) {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied';

  const events = [
    {
      id: 'evt-1',
      time: '11:42',
      title: 'Storefront analyzed',
      description: 'Ingested 12 SKUs from Apex Outdoor catalog and checked 40 discovery queries.',
      status: 'done',
      details: {
        tool: 'inspect_store',
        parameters: { url: 'https://apex-outdoor.vercel.app', skus: 12 },
        result: '12 active products detected. High-intent queries benchmarked.'
      }
    },
    {
      id: 'evt-2',
      time: '11:43',
      title: 'Product evidence gap identified',
      description: 'Found competitor Monsoon Trekker exposes 11 useful specs vs 5 for Apex Ridge Boots.',
      status: 'done',
      details: {
        tool: 'diagnose_gap',
        parameters: { target_sku: 'merch-boot-01', competitor_sku: 'comp-boot-01' },
        result: 'Attribute deficit: IPX7, Vibram sole, lugs, weight missing.'
      }
    },
    {
      id: 'evt-3',
      time: '11:43',
      title: 'Bounded Fix prepared',
      description: 'Generated FixDiff (diff-apex-01) with 6 verified claims and Schema.org JSON-LD.',
      status: 'done',
      details: {
        tool: 'generate_fix_diff',
        parameters: { sku: 'merch-boot-01', verified_sources: ['merchant_catalog.json'] },
        result: '0 hallucinations. All 6 claims cross-verified against ground truth catalog.'
      }
    },
    {
      id: 'evt-4',
      time: '11:44',
      title: isApproved ? 'Merchant approved fix' : 'Waiting for merchant approval',
      description: isApproved ? 'Merchant explicitly authorized deployment of diff-apex-01.' : 'Invariant pause: Catalyst cannot publish changes without merchant sign-off.',
      status: isApproved ? 'done' : 'pending',
      details: {
        tool: 'request_approval',
        parameters: { diff_id: 'diff-apex-01', merchant_action: isApproved ? 'APPROVED' : 'PENDING' },
        result: isApproved ? 'Permission granted. Proceeding to deployment.' : 'Execution halted at safety gate.'
      }
    },
    ...(isApproved ? [
      {
        id: 'evt-5',
        time: '11:45',
        title: 'Fix deployed to storefront',
        description: 'Updated Apex Outdoor product page with 11 machine-readable attributes.',
        status: 'done',
        details: {
          tool: 'apply_fix',
          parameters: { target_store: 'apex-outdoor', payload_type: 'CATALOG_AND_SCHEMA' },
          result: 'Storefront state transitioned to Treatment.'
        }
      },
      {
        id: 'evt-6',
        time: '11:46',
        title: 'Controlled experiment measured',
        description: 'Simulated 1,500 baseline sessions under identical traffic conditions.',
        status: 'done',
        details: {
          tool: 'run_experiment',
          parameters: { control_volume: 1500, treatment_volume: 1500, seed: 42 },
          result: 'Control: ₹1.20L GMV vs Treatment: ₹2.70L GMV (+125% lift).'
        }
      },
      {
        id: 'evt-7',
        time: '11:47',
        title: 'Attribution verified & spoofs rejected',
        description: 'Deterministic 5-signal classifier excluded 1 suspicious synthetic referral.',
        status: 'done',
        details: {
          tool: 'verify_revenue',
          parameters: { total_sessions: 3000, verified_orders: 87, false_positive_gmv: 0 },
          result: 'Verified incremental GMV: +₹1.50L grounded in Razorpay ledger.'
        }
      }
    ] : [])
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 my-4">
      
      {/* Activity Header */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-300">
            <Activity className="w-3.5 h-3.5" />
            <span>Agent Operations Log</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white">
            Catalyst Activity
          </h1>
          <p className="text-xs text-slate-300 font-sans">
            Chronological audit of autonomous observations, proposals, and verified actions.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          {events.length} Actions Logged
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-3">
        {events.map((evt) => {
          const isExpanded = expandedEvent === evt.id;

          return (
            <div 
              key={evt.id}
              className="rounded-2xl bg-[#121624]/90 border border-slate-700/60 p-5 space-y-3 transition-all hover:border-slate-600"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="mt-0.5">
                    {evt.status === 'done' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-slate-500">{evt.time}</span>
                      <h3 className="text-sm font-semibold text-white">{evt.title}</h3>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedEvent(isExpanded ? null : evt.id)}
                  className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center space-x-1 cursor-pointer flex-shrink-0 pt-0.5"
                >
                  <span>{isExpanded ? 'Less' : 'Inspect'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-800 bg-[#0d0f17] p-4 rounded-xl space-y-2 font-mono text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Tool Invocation:</span>
                    <span className="text-blue-300 font-bold">{evt.details.tool}()</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[11px]">Payload Parameters:</span>
                    <pre className="p-2 rounded bg-slate-900 text-[11px] text-slate-300 overflow-x-auto">
                      {JSON.stringify(evt.details.parameters, null, 2)}
                    </pre>
                  </div>
                  <div className="text-[11px] text-emerald-400/90 pt-1">
                    ✓ {evt.details.result}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
