import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Cpu, 
  Terminal, 
  Sparkles,
  Layers,
  Search,
  FileCode
} from 'lucide-react';
import { runAutonomousCycle } from '../api/client';

export default function AgentActivityPanel({ events = [], agentState, onRefreshData }) {
  const [customGoal, setCustomGoal] = useState('Analyze merchant footwear queries, inspect competitor evidence, and propose a bounded fix.');
  const [isRunning, setIsRunning] = useState(false);
  const [liveResult, setLiveResult] = useState(null);

  const stateSteps = [
    { id: 'OBSERVE', num: '01' },
    { id: 'DIAGNOSE', num: '02' },
    { id: 'PROPOSE', num: '03' },
    { id: 'WAIT_FOR_APPROVAL', num: '04' },
    { id: 'APPLY', num: '05' },
    { id: 'EXPERIMENT', num: '06' },
    { id: 'VERIFY', num: '07' },
    { id: 'REPORT', num: '08' },
  ];

  const currentState = agentState?.current_state || 'OBSERVE';

  const handleRunAutonomous = async () => {
    setIsRunning(true);
    setLiveResult(null);
    try {
      const res = await runAutonomousCycle(customGoal);
      setLiveResult(res);
      if (onRefreshData) onRefreshData();
    } catch (e) {
      alert('Error running agent cycle: ' + e.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card border border-surface-border p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>AUTONOMOUS AGENT REASONING ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Gemini 3.5 Flash Tool-Calling Engine & Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Watch Gemini 3.5 Flash make autonomous decisions, inspect evidence through typed tool invocations, formulate bounded interventions, and enforce the merchant approval gate.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-surface-dark border border-surface-border font-mono text-xs text-slate-300">
          Brain: <strong className="text-brand-blue">Gemini 3.5 Flash</strong>
        </div>
      </div>

      {/* Interactive Autonomous Runner Console */}
      <div className="bg-gradient-to-br from-[#0c1a2e] to-[#070b12] border-2 border-brand-500/50 rounded-2xl p-6 shadow-2xl glow-blue space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-brand-blue animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Interactive Agent Execution Sandbox
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
            Multi-Turn Function Calling
          </span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300">
            Assign Autonomous Goal to Gemini 3.5 Flash:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="E.g. Analyze outdoor gear gaps and formulate a bounded fix..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-dark border border-surface-border text-xs text-slate-200 focus:outline-none focus:border-brand-500 font-mono"
            />
            <button
              onClick={handleRunAutonomous}
              disabled={isRunning}
              className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
              <span>{isRunning ? 'Gemini is Reasoning...' : 'Run Autonomous Cycle'}</span>
            </button>
          </div>
        </div>

        {/* Live Stepper Output */}
        {liveResult && (
          <div className="mt-4 p-4 rounded-xl bg-[#06080d] border border-surface-border space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Autonomous Execution Finished • Status: {liveResult.status}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">{liveResult.steps?.length} Tool Calls</span>
            </div>

            <p className="text-xs text-slate-300 bg-surface-card p-3 rounded-lg border border-surface-border leading-relaxed">
              <strong>Gemini 3.5 Flash Synthesis:</strong> {liveResult.final_summary}
            </p>

            {liveResult.status === 'WAIT_FOR_APPROVAL' && (
              <div className="p-3 bg-brand-500/10 border border-brand-500/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-200">
                  Agent is awaiting your approval to deploy <strong>FixDiff #diff-apex-01</strong>.
                </span>
                <button
                  onClick={onOpenDiffModal}
                  className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Review & Approve Fix Diff →</span>
                </button>
              </div>
            )}

            {/* Individual Steps */}
            <div className="space-y-2 pt-1">
              {liveResult.steps?.map((st, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-dark/90 border border-surface-border text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-brand-blue font-bold">Turn {st.turn}: Invoked `{st.tool_called}()`</span>
                    <span className="text-slate-500">Autonomous Decision</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    ↳ <em>{st.thought}</em>
                  </div>
                  <div className="text-[10px] text-slate-400 bg-[#090d16] p-2 rounded border border-surface-border/60 overflow-x-auto">
                    Args: {JSON.stringify(st.tool_args)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Visual State Machine Progress Bar */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Current Agent State Machine Status
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {stateSteps.map((step) => {
            const isActive = currentState === step.id;
            return (
              <div
                key={step.id}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-brand-500/20 border-brand-500 text-white font-bold shadow-sm glow-blue'
                    : 'bg-surface-dark/60 border-surface-border text-slate-400'
                }`}
              >
                <div className="text-[10px] font-mono text-brand-blue">{step.num}</div>
                <div className="text-[11px] uppercase tracking-wider font-semibold mt-0.5 truncate">
                  {step.id.replace('_', ' ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chronological Audit Event Timeline */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-brand-blue" />
          <span>Chronological Agent & Merchant Events ({events.length})</span>
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-border">
          {events.map((evt, idx) => {
            const isMerchant = evt.actor === 'merchant';
            return (
              <div key={evt.event_id || idx} className="relative group">
                {/* Marker */}
                <div className={`absolute -left-[27px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isMerchant 
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-400' 
                    : 'bg-indigo-950 border-brand-blue text-brand-blue'
                }`}>
                  {isMerchant ? <UserCheck className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>

                <div className="bg-surface-dark border border-surface-border rounded-xl p-4 hover:border-slate-600 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-surface-border/60">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        isMerchant ? 'bg-emerald-500/20 text-emerald-300' : 'bg-brand-500/20 text-brand-blue'
                      }`}>
                        {evt.actor}
                      </span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        [{evt.agent_state}]
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {evt.reason}
                  </p>

                  {evt.tool_name && (
                    <div className="mt-2 text-[10px] font-mono text-slate-400 bg-[#06080d] p-2 rounded border border-surface-border">
                      Tool Executed: <strong className="text-brand-blue">{evt.tool_name}()</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
