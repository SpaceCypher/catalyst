import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  Flame, 
  CheckCircle2, 
  Code2, 
  Terminal, 
  TrendingUp, 
  Layers, 
  FileCode,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ExperimentResultPanel from './ExperimentResultPanel';
import SpoofRejectionPanel from './SpoofRejectionPanel';
import StorePatchExportPanel from './StorePatchExportPanel';
import AgentActivityPanel from './AgentActivityPanel';

export default function ProofHub({
  activeDiff,
  experimentResult,
  evaluationResult,
  sessions = [],
  funnel,
  agentEvents = [],
  agentState,
  onOpenDiffModal
}) {
  const [activeProofSection, setActiveProofSection] = useState('experiment');

  const proofSections = [
    { id: 'experiment', label: '1. Controlled Experiment', icon: FlaskConical },
    { id: 'attribution', label: '2. Attribution & Anti-Spoof', icon: ShieldCheck },
    { id: 'audit', label: '3. Agent Tool Audit', icon: Terminal },
    { id: 'patch', label: '4. Store Patch Export', icon: Code2 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 my-4">
      
      {/* Proof Hub Header */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Technical Verification & Evidence Chamber</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white">
            Proof of Incrementality & Attribution Integrity
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Catalyst operates on deterministic proof. Inspect the controlled A/B experiment arithmetic, 5-signal attribution classifier, held-out leakage guard, and agent execution trace.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {proofSections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeProofSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveProofSection(sec.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-blue-200 border border-slate-700 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Proof Section */}
      <div className="space-y-6">
        {activeProofSection === 'experiment' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-4 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Methodology: 1,500 Control vs 1,500 Treatment identical synthetic sessions</span>
              <span className="text-emerald-400 font-semibold">+₹1.50L Lift (+125%)</span>
            </div>
            <ExperimentResultPanel result={experimentResult} />
          </div>
        )}

        {activeProofSection === 'attribution' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            {/* Core Principle Banner */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center space-x-3 text-xs font-mono">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-slate-300">
                <strong>Attribution Principle:</strong> Catalyst would rather undercount than falsely claim ungrounded revenue.
              </div>
            </div>
            <SpoofRejectionPanel evaluation={evaluationResult} sessions={sessions} />
          </div>
        )}

        {activeProofSection === 'audit' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            <AgentActivityPanel 
              events={agentEvents} 
              agentState={agentState} 
              onOpenDiffModal={onOpenDiffModal}
            />
          </div>
        )}

        {activeProofSection === 'patch' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            <StorePatchExportPanel activeDiff={activeDiff} />
          </div>
        )}
      </div>

    </div>
  );
}
