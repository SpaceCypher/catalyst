import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MerchantOnboardingCard from './components/MerchantOnboardingCard';
import AgentInboxHome from './components/AgentInboxHome';
import DiagnosisPanel from './components/DiagnosisPanel';
import ExperimentResultPanel from './components/ExperimentResultPanel';
import StorePatchExportPanel from './components/StorePatchExportPanel';
import AgentActivityPanel from './components/AgentActivityPanel';
import DemoStorefront from './components/DemoStorefront';
import DiffReviewModal from './components/DiffReviewModal';
import DemoWalkthroughModal from './components/DemoWalkthroughModal';

import {
  fetchOpportunities,
  fetchFix,
  approveFix,
  rejectFix,
  fetchLatestExperiment,
  runExperiment,
  fetchAttributionEvaluation,
  fetchSessions,
  fetchProvenanceFunnel,
  fetchAgentState,
  fetchAgentEvents,
  resetDemo
} from './api/client';

export default function App() {
  const [currentView, setCurrentView] = useState('catalyst'); // 'catalyst' | 'storefront'
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  const [activeTab, setActiveTab] = useState('inbox');
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [activeDiff, setActiveDiff] = useState(null);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const [experimentResult, setExperimentResult] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [funnel, setFunnel] = useState(null);
  
  const [agentState, setAgentState] = useState(null);
  const [agentEvents, setAgentEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      const [opps, diff, exp, ev, sess, fnl, st, evts] = await Promise.all([
        fetchOpportunities().catch(() => []),
        fetchFix('diff-apex-01').catch(() => null),
        fetchLatestExperiment().catch(() => null),
        fetchAttributionEvaluation().catch(() => null),
        fetchSessions('', '', 50).catch(() => []),
        fetchProvenanceFunnel().catch(() => null),
        fetchAgentState().catch(() => null),
        fetchAgentEvents(40).catch(() => [])
      ]);

      setOpportunities(opps);
      if (opps.length > 0 && !selectedOpp) {
        setSelectedOpp(opps[0]);
      }
      setActiveDiff(diff);
      setExperimentResult(exp);
      setEvaluationResult(ev);
      setSessions(sess);
      setFunnel(fnl);
      setAgentState(st);
      setAgentEvents(evts);
    } catch (e) {
      console.error('Error fetching Catalyst data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleApproveDiff = async (diffId) => {
    try {
      const res = await approveFix(diffId);
      setActiveDiff(res);
      setIsDiffModalOpen(false);
      // Run experiment simulation after approval
      const expRes = await runExperiment(diffId);
      setExperimentResult(expRes);
      loadAllData();
    } catch (e) {
      alert('Error approving fix: ' + e.message);
    }
  };

  const handleRejectDiff = async (diffId) => {
    try {
      const res = await rejectFix(diffId);
      setActiveDiff(res);
      setIsDiffModalOpen(false);
      loadAllData();
    } catch (e) {
      alert('Error rejecting fix: ' + e.message);
    }
  };

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      await resetDemo();
      await loadAllData();
      setHasAnalyzed(false);
      setActiveTab('inbox');
    } catch (e) {
      console.error('Reset failed:', e);
    } finally {
      setIsResetting(false);
    }
  };

  if (currentView === 'storefront') {
    return (
      <DemoStorefront
        activeDiff={activeDiff}
        onReturnToCatalyst={() => setCurrentView('catalyst')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-dark text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDemo={handleResetDemo}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenStorefront={() => setCurrentView('storefront')}
        isResetting={isResetting}
        hasAnalyzed={hasAnalyzed}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!hasAnalyzed ? (
          /* Level 0: 1-Click Merchant Onboarding Entry */
          <MerchantOnboardingCard
            onAnalyzeComplete={() => {
              setHasAnalyzed(true);
              setActiveTab('inbox');
              loadAllData();
            }}
          />
        ) : (
          /* The Clean Product Views */
          <div>
            {activeTab === 'inbox' && (
              <AgentInboxHome
                opportunities={opportunities}
                activeDiff={activeDiff}
                experimentResult={experimentResult}
                evaluationResult={evaluationResult}
                sessions={sessions}
                funnel={funnel}
                agentEvents={agentEvents}
                agentState={agentState}
                onOpenDiffModal={() => setIsDiffModalOpen(true)}
                onViewAllOpportunities={() => setActiveTab('opportunities')}
                onViewExperiments={() => setActiveTab('experiments')}
                onViewExportPatch={() => setActiveTab('export')}
                onOpenStorefront={() => setCurrentView('storefront')}
                onAnalyzeNewStore={() => setHasAnalyzed(false)}
              />
            )}

            {activeTab === 'opportunities' && (
              <DiagnosisPanel
                opportunities={opportunities}
                selectedOpp={selectedOpp}
                activeDiff={activeDiff}
                onSelectOpp={(opp) => setSelectedOpp(opp)}
                onProposeFix={(opp) => setIsDiffModalOpen(true)}
              />
            )}

            {activeTab === 'experiments' && experimentResult && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold text-white">Controlled Experiment Proof</h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Measuring verified incremental AI GMV across identical baseline traffic.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-brand-blue bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                    Controlled simulation result
                  </span>
                </div>
                <ExperimentResultPanel result={experimentResult} />
              </div>
            )}

            {activeTab === 'export' && (
              <StorePatchExportPanel activeDiff={activeDiff} />
            )}

            {activeTab === 'console' && (
              <AgentActivityPanel
                events={agentEvents}
                agentState={agentState}
                onRefreshData={loadAllData}
                onOpenDiffModal={() => setIsDiffModalOpen(true)}
              />
            )}
          </div>
        )}

      </main>

      {/* Bounded Fix Review Modal */}
      {isDiffModalOpen && (
        <DiffReviewModal
          diff={activeDiff}
          onClose={() => setIsDiffModalOpen(false)}
          onApprove={handleApproveDiff}
          onReject={handleRejectDiff}
        />
      )}

      {/* 5-Beat Pitch Demo Walkthrough Stepper Modal */}
      {isDemoModalOpen && (
        <DemoWalkthroughModal
          onClose={() => setIsDemoModalOpen(false)}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            setIsDemoModalOpen(false);
          }}
          onOpenDiff={() => {
            setIsDiffModalOpen(true);
            setIsDemoModalOpen(false);
          }}
        />
      )}

      {/* Clean Footer */}
      <footer className="border-t border-surface-border py-6 bg-[#05080e] text-center text-xs text-slate-400 font-mono">
        Catalyst AI Commerce Revenue Agent • Connected to Apex Outdoor (Demo Merchant) • Razorpay Buildathon
      </footer>

    </div>
  );
}
