import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CatalystAgentHome from './components/CatalystAgentHome';
import StorefrontView from './components/StorefrontView';
import ActivityTimeline from './components/ActivityTimeline';
import ProofHub from './components/ProofHub';
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

const getTabFromPath = () => {
  if (typeof window === 'undefined') return 'catalyst';
  const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (path === 'store' || path === 'storefront') return 'store';
  if (path === 'proof' || path === 'evidence' || path === 'attribution' || path === 'experiment' || path === 'experiments') return 'proof';
  if (path === 'activity' || path === 'timeline' || path === 'audit') return 'activity';
  return 'catalyst';
};

export default function App() {
  const [currentView, setCurrentView] = useState('catalyst'); // 'catalyst' | 'storefront'
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState(getTabFromPath);

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
  const [isApproving, setIsApproving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Synchronize browser URL pathname with active tab
  const navigateToTab = (tab, replace = false) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined' && window.history) {
      const newPath = tab === 'catalyst' ? '/' : `/${tab}`;
      if (window.location.pathname !== newPath) {
        if (replace) {
          window.history.replaceState({ tab }, '', newPath);
        } else {
          window.history.pushState({ tab }, '', newPath);
        }
      }
    }
  };

  // Listen to browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied';

  // Compute dynamic agent status for Navbar badge
  const getAgentStatus = () => {
    if (!hasAnalyzed) return 'ready';
    if (isApproving) return 'analyzing';
    if (!isApproved) return 'waiting_approval';
    return 'complete';
  };

  const handleApproveDiff = async (diffId = 'diff-apex-01') => {
    try {
      setIsApproving(true);
      setActiveDiff(prev => ({ ...(prev || {}), status: 'approved' }));
      const res = await approveFix(diffId);
      setActiveDiff(res || { diff_id: diffId, status: 'approved' });
      setIsDiffModalOpen(false);
      // Run experiment simulation after approval
      const expRes = await runExperiment(diffId);
      setExperimentResult(expRes);
      await loadAllData();
    } catch (e) {
      alert('Error approving fix: ' + e.message);
    } finally {
      setIsApproving(false);
    }
  };

  const handleRejectDiff = async (diffId = 'diff-apex-01') => {
    try {
      setActiveDiff(prev => ({ ...(prev || {}), status: 'rejected' }));
      const res = await rejectFix(diffId);
      setActiveDiff(res || { diff_id: diffId, status: 'rejected' });
      setIsDiffModalOpen(false);
      await loadAllData();
    } catch (e) {
      alert('Error rejecting fix: ' + e.message);
    }
  };

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('catalyst_diff_status');
        localStorage.removeItem('catalyst_has_analyzed');
      }
      await resetDemo();
      setActiveDiff({ diff_id: 'diff-apex-01', status: 'proposed' });
      setExperimentResult(null);
      setHasAnalyzed(false);
      navigateToTab('catalyst', true);
      await loadAllData();
      setActiveDiff({ diff_id: 'diff-apex-01', status: 'proposed' });
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

  const handleOpenStorefront = () => {
    window.open('https://apex-outdoor.vercel.app', '_blank');
  };


  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 flex flex-col font-sans selection:bg-slate-700 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        onResetDemo={handleResetDemo}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenStorefront={handleOpenStorefront}
        isResetting={isResetting}
        hasAnalyzed={hasAnalyzed}
        agentStatus={getAgentStatus()}
      />

      {/* Main Experience Flow with Fixed Navbar Offset */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        
        {/* 1. CATALYST TAB (Primary Agent Flow) */}
        {activeTab === 'catalyst' && (
          <CatalystAgentHome
            hasAnalyzed={hasAnalyzed}
            onAnalyzeComplete={() => {
              setHasAnalyzed(true);
              loadAllData();
            }}
            opportunities={opportunities}
            activeDiff={activeDiff}
            onApproveFix={() => handleApproveDiff('diff-apex-01')}
            onRejectFix={() => handleRejectDiff('diff-apex-01')}
            isApproving={isApproving}
            onRunExperiment={() => runExperiment('diff-apex-01')}
            experimentResult={experimentResult}
            onOpenStorefront={handleOpenStorefront}
            onNavigateToProof={() => navigateToTab('proof')}
            onNavigateToStore={() => navigateToTab('store')}
            onOpenDiffModal={() => setIsDiffModalOpen(true)}
          />
        )}

        {/* 2. STORE TAB (Connected Store State) */}
        {activeTab === 'store' && (
          <StorefrontView
            activeDiff={activeDiff}
            onOpenStorefront={handleOpenStorefront}
          />
        )}

        {/* 3. ACTIVITY TAB (Operations Timeline) */}
        {activeTab === 'activity' && (
          <ActivityTimeline
            activeDiff={activeDiff}
            experimentResult={experimentResult}
          />
        )}

        {/* 4. PROOF TAB (Technical Verification Hub) */}
        {activeTab === 'proof' && (
          <ProofHub
            activeDiff={activeDiff}
            experimentResult={experimentResult}
            evaluationResult={evaluationResult}
            sessions={sessions}
            funnel={funnel}
            agentEvents={agentEvents}
            agentState={agentState}
            onOpenDiffModal={() => setIsDiffModalOpen(true)}
          />
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
            if (tab === 'inbox' || tab === 'opportunities') navigateToTab('catalyst');
            else if (tab === 'experiments' || tab === 'attribution' || tab === 'console') navigateToTab('proof');
            else navigateToTab('catalyst');
            setIsDemoModalOpen(false);
          }}
          onOpenDiff={() => {
            setIsDiffModalOpen(true);
            setIsDemoModalOpen(false);
          }}
        />
      )}

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 py-5 bg-[#090a0f] text-center text-xs text-slate-400 font-mono">
        Catalyst AI Commerce Revenue Agent • Connected to Apex Outdoor (Demo Merchant) • Razorpay Buildathon
      </footer>

    </div>
  );
}

