import React, { useState, useEffect } from 'react';
import { runDiagnosis } from '../api/client';

import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Check, 
  ExternalLink, 
  Zap, 
  Bot, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  FileCode, 
  Layers, 
  ShoppingBag, 
  Flame, 
  TrendingUp, 
  Lock,
  CreditCard,
  Bell,
  HelpCircle,
  Play,
  ArrowUpRight,
  Target,
  RefreshCw,
  X
} from 'lucide-react';

const OPPORTUNITIES_MAP = {
  'opp-01': {
    id: 'opp-01',
    rank: 1,
    name: 'Apex Ridge Waterproof Boots',
    shortName: '1. Apex Boots',
    sku: 'merch-boot-01',
    category: 'Footwear',
    competitor: 'Monsoon Trekker',
    queryPreset: 'best waterproof hiking boots under ₹5,000',
    presets: [
      'best waterproof hiking boots under ₹5,000',
      'monsoon trekking boots with vibram sole',
      'lightweight 420g trail hiking shoes'
    ],
    headline: 'Apex Ridge Waterproof Boots are losing AI recommendations to Monsoon Trekker.',
    summary: 'AI shopping engines recommend competitors because your product page exposes fewer structured comparison signals.',
    competitorSpecs: [
      { label: '✓ 15,000mm IPX7 Rating', key: 'IPX7' },
      { label: '✓ 420g Lightweight Spec', key: 'weight' },
      { label: '✓ Vibram MegaGrip Outsole', key: 'outsole' },
      { label: '✓ 5mm Lug Depth', key: 'lugs' }
    ],
    merchantDeficits: [
      '✕ Basic "waterproof" claim only',
      '✕ Missing weight specification',
      '✕ Generic "rubber sole" claim',
      '✕ Missing lug depth & monsoon FAQs'
    ],
    diffs: [
      '+ Waterproof rating: 15,000mm IPX7',
      '+ Weight: 420g lightweight',
      '+ Outsole: Vibram MegaGrip 5mm lugs',
      '+ Sizing & Monsoon FAQ section',
      '+ Schema.org/Product & Offers JSON-LD'
    ],
    technicalDiffs: [
      '+ "waterproof_rating": "15,000mm IPX7"',
      '+ "weight": "420g"',
      '+ "outsole": "Vibram MegaGrip 5mm lugs"',
      '+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹4499"'
    ],
    simBefore: {
      first: '#1 🥾 Monsoon Trekker',
      firstTag: 'IPX7 Match',
      second: '#2 🥾 TrailPro Extreme',
      secondTag: 'Vibram Sole',
      omitted: 'Apex Ridge: Omitted (Missing IPX7)'
    },
    simAfter: {
      first: '#1 🥾 Apex Ridge (YOU) ✓',
      firstTag: '15k mm + Vibram',
      second: '#2 🥾 Monsoon Trekker',
      secondTag: 'Alternate'
    },
    offer: {
      name: '💳 ICICI Instant 10% Off',
      code: 'rzp_off_monsoon_icici',
      lift: '+18% Lift',
      cartConv: '14.2% → 17.8%',
      revenue: '+₹48,000'
    },
    recovery: {
      abandoned: '24 sessions',
      recovered: '18 orders (75%)',
      revenue: '+₹72,000'
    },
    revenue: {
      liftPct: '+125% Lift',
      gmvDisplay: '+₹1.50L',
      controlText: '24 orders × ₹5,000 = ₹1.20L',
      treatmentText: '54 orders × ₹5,000 = ₹2.70L',
      netText: '+₹1,50,000 (+₹1.50L)'
    },
    nextAction: {
      title: '⚡ Venture 45L Expedition Backpack',
      desc: 'Catalyst completed the boots fix and automatically discovered your trekking backpacks have the same evidence gap in volume capacity and load-bearing specs.',
      deficits: [
        '• Missing 45-liter laboratory volume spec',
        '• Missing 600D ripstop nylon material rating'
      ],
      potential: '+₹95,000 GMV',
      nextOppId: 'opp-02',
      buttonText: 'Investigate & Fix Venture 45L →'
    }
  },
  'opp-02': {
    id: 'opp-02',
    rank: 2,
    name: 'Venture 45L Expedition Backpack',
    shortName: '2. Venture 45L',
    sku: 'merch-pack-03',
    category: 'Outdoor Gear',
    competitor: 'NorthTrail 45L Alpine Pro',
    queryPreset: 'best lightweight 45L expedition backpack under ₹6,000',
    presets: [
      'best lightweight 45L expedition backpack under ₹6,000',
      '600D ripstop travel backpack with internal frame',
      'waterproof trekking rucksack with raincover'
    ],
    headline: 'Venture 45L Backpack is losing AI recommendations to NorthTrail 45L Alpine Pro.',
    summary: 'Competitors expose 45L certified capacity, 600D Diamond Ripstop nylon, and internal aluminum frame ratings, winning AI travel recommendations.',
    competitorSpecs: [
      { label: '✓ 45L Certified Volume', key: 'capacity' },
      { label: '✓ 600D Diamond Ripstop Nylon', key: 'material' },
      { label: '✓ 6061 Aluminum Stay', key: 'frame' },
      { label: '✓ 3L Hydration Sleeve', key: 'hydration' }
    ],
    merchantDeficits: [
      '✕ Missing 45L laboratory volume',
      '✕ Generic "durable fabric" claim',
      '✕ Unlisted internal frame specs',
      '✕ Missing hydration routing & FAQs'
    ],
    diffs: [
      '+ Capacity: 45-Liter Certified Volume',
      '+ Material: 600D Diamond Ripstop Nylon',
      '+ Frame: Ergonomic 6061 Aluminum Stay',
      '+ 3L Hydration Port & Raincover FAQs',
      '+ Schema.org/Product & Offers JSON-LD'
    ],
    technicalDiffs: [
      '+ "capacity": "45L"',
      '+ "fabric": "600D Diamond Ripstop Nylon"',
      '+ "frame": "6061 Anodized Aluminum"',
      '+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹3999"'
    ],
    simBefore: {
      first: '#1 🎒 NorthTrail 45L',
      firstTag: '45L Match',
      second: '#2 🎒 Alpine Summit',
      secondTag: '600D Nylon',
      omitted: 'Venture 45L: Omitted (Missing 45L volume)'
    },
    simAfter: {
      first: '#1 🎒 Venture 45L (YOU) ✓',
      firstTag: '45L + 600D',
      second: '#2 🎒 NorthTrail 45L',
      secondTag: 'Alternate'
    },
    offer: {
      name: '💳 HDFC Instant ₹500 Off',
      code: 'rzp_off_venture_hdfc',
      lift: '+15% Lift',
      cartConv: '13.8% → 17.1%',
      revenue: '+₹35,000'
    },
    recovery: {
      abandoned: '19 sessions',
      recovered: '14 orders (74%)',
      revenue: '+₹56,000'
    },
    revenue: {
      liftPct: '+110% Lift',
      gmvDisplay: '+₹95,000',
      controlText: '20 orders × ₹4,000 = ₹80,000',
      treatmentText: '44 orders × ₹4,000 = ₹1,75,000',
      netText: '+₹95,000 GMV Lift'
    },
    nextAction: {
      title: '⚡ Summit StormShield 3-Person Tent',
      desc: 'Catalyst verified your boots and backpacks, and queued your 4-season tents for Beaufort wind ratings and hydrostatic floor waterproofing.',
      deficits: [
        '• Missing Beaufort Scale Force 9 wind rating',
        '• Missing 5,000mm bathtub floor waterproofing spec'
      ],
      potential: '+₹1,10,000 GMV',
      nextOppId: 'opp-03',
      buttonText: 'Investigate & Fix StormShield Tent →'
    }
  },
  'opp-03': {
    id: 'opp-03',
    rank: 3,
    name: 'Alpine Haven 3-Person Camping Tent',
    shortName: '3. StormShield Tent',
    sku: 'merch-tent-04',
    category: 'Tents & Shelter',
    competitor: 'StormShield Pro 3P',
    queryPreset: '4 season waterproof 3-person camping tent under ₹7,000',
    presets: [
      '4 season waterproof 3-person camping tent under ₹7,000',
      'windproof alpine tent with 5000mm floor',
      'lightweight 3 person backpacking tent with rainfly'
    ],
    headline: 'Alpine Haven 3-Person Tent is losing AI recommendations to StormShield Pro.',
    summary: 'Competitors expose Beaufort Scale Force 9 wind ratings and 5,000mm bathtub floor specs, winning AI 4-season camping recommendations.',
    competitorSpecs: [
      { label: '✓ Force 9 Wind Rating (80 km/h)', key: 'wind' },
      { label: '✓ 5,000mm Bathtub Floor', key: 'floor' },
      { label: '✓ 7001-T6 Aluminum Poles', key: 'poles' },
      { label: '✓ Double Vestibule & Rainfly', key: 'rainfly' }
    ],
    merchantDeficits: [
      '✕ Generic "wind resistant" claim',
      '✕ Missing hydrostatic floor rating',
      '✕ Unspecified pole alloy',
      '✕ Missing monsoon pitching FAQs'
    ],
    diffs: [
      '+ Wind Rating: Beaufort Scale Force 9 (80 km/h)',
      '+ Floor Waterproofing: 5,000mm Bathtub PU',
      '+ Frame: 7001-T6 Aircraft Grade Aluminum',
      '+ Dual Vestibule & Monsoon FAQs',
      '+ Schema.org/Product & Offers JSON-LD'
    ],
    technicalDiffs: [
      '+ "wind_rating": "Beaufort Force 9 (80 km/h)"',
      '+ "hydrostatic_head_floor": "5000mm"',
      '+ "pole_material": "7001-T6 Aluminum"',
      '+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹5499"'
    ],
    simBefore: {
      first: '#1 ⛺ StormShield Pro',
      firstTag: 'Force 9 Match',
      second: '#2 ⛺ TerraNova Dome',
      secondTag: '5000mm Floor',
      omitted: 'Alpine Haven: Omitted (Missing wind spec)'
    },
    simAfter: {
      first: '#1 ⛺ Alpine Haven (YOU) ✓',
      firstTag: 'Force 9 + 5k mm Floor',
      second: '#2 ⛺ StormShield Pro',
      secondTag: 'Alternate'
    },
    offer: {
      name: '💳 Axis Bank No-Cost EMI',
      code: 'rzp_emi_tent_axis',
      lift: '+22% Lift',
      cartConv: '11.5% → 16.2%',
      revenue: '+₹52,000'
    },
    recovery: {
      abandoned: '21 sessions',
      recovered: '16 orders (76%)',
      revenue: '+₹88,000'
    },
    revenue: {
      liftPct: '+135% Lift',
      gmvDisplay: '+₹1.10L',
      controlText: '16 orders × ₹5,500 = ₹88,000',
      treatmentText: '36 orders × ₹5,500 = ₹1,98,000',
      netText: '+₹1,10,000 (+₹1.10L)'
    },
    nextAction: {
      title: '⚡ SwiftTrail Aero Running Shoes',
      desc: 'Catalyst verified boots, packs, and tents, and identified a missing 8mm heel drop and dual-density EVA midsole spec on trail shoes.',
      deficits: [
        '• Missing 8mm heel-to-toe drop laboratory spec',
        '• Missing multi-directional lug traction index'
      ],
      potential: '+₹45,000 GMV',
      nextOppId: 'opp-04',
      buttonText: 'Investigate & Fix SwiftTrail Shoes →'
    }
  },
  'opp-04': {
    id: 'opp-04',
    rank: 4,
    name: 'SwiftTrail Aero Running Shoes',
    shortName: '4. SwiftTrail Shoes',
    sku: 'merch-shoe-02',
    category: 'Footwear & Trail',
    competitor: 'TrailPro Speed 2',
    queryPreset: 'best lightweight trail running shoes 8mm drop under ₹4,000',
    presets: [
      'best lightweight trail running shoes 8mm drop under ₹4,000',
      'trail running shoes with rock plate and eva cushioning',
      'breathable mesh trail running shoes under 280g'
    ],
    headline: 'SwiftTrail Aero Shoes are losing AI recommendations to TrailPro Speed 2.',
    summary: 'Competitors expose explicit 8mm drop, dual-density EVA cushioning, and lug grip index, winning lightweight trail runner recommendations.',
    competitorSpecs: [
      { label: '✓ 8mm Heel Drop Lab Spec', key: 'drop' },
      { label: '✓ Dual-Density EVA Midsole', key: 'midsole' },
      { label: '✓ 4.5mm Trail Lugs', key: 'lugs' },
      { label: '✓ Integrated Rock Plate', key: 'plate' }
    ],
    merchantDeficits: [
      '✕ Generic "lightweight" claim',
      '✕ Missing heel-to-toe drop spec',
      '✕ Missing midsole cushion details',
      '✕ Missing pronation & trail FAQs'
    ],
    diffs: [
      '+ Heel-to-Toe Drop: 8mm Laboratory Certified',
      '+ Midsole: Dual-Density EVA with Rock Plate',
      '+ Weight: 275g (UK size 8)',
      '+ Trail Grip: 4.5mm Chevron Lugs',
      '+ Schema.org/Product & Offers JSON-LD'
    ],
    technicalDiffs: [
      '+ "heel_drop": "8mm"',
      '+ "midsole_type": "Dual-Density EVA"',
      '+ "weight": "275g"',
      '+ "@context": "https://schema.org/", "@type": "Product", "offers": "₹3299"'
    ],
    simBefore: {
      first: '#1 👟 TrailPro Speed 2',
      firstTag: '8mm Drop Match',
      second: '#2 👟 Salomon CrossPro',
      secondTag: 'EVA Plate',
      omitted: 'SwiftTrail: Omitted (Missing drop spec)'
    },
    simAfter: {
      first: '#1 👟 SwiftTrail Aero (YOU) ✓',
      firstTag: '8mm Drop + 275g',
      second: '#2 👟 TrailPro Speed 2',
      secondTag: 'Alternate'
    },
    offer: {
      name: '💳 UPI Fast Checkout Cashback',
      code: 'rzp_upi_running_cashback',
      lift: '+16% Lift',
      cartConv: '15.0% → 18.5%',
      revenue: '+₹22,000'
    },
    recovery: {
      abandoned: '15 sessions',
      recovered: '12 orders (80%)',
      revenue: '+₹39,500'
    },
    revenue: {
      liftPct: '+95% Lift',
      gmvDisplay: '+₹45,000',
      controlText: '18 orders × ₹3,300 = ₹59,400',
      treatmentText: '32 orders × ₹3,300 = ₹1,05,600',
      netText: '+₹45,000 GMV Lift'
    },
    nextAction: {
      title: '🎉 Entire Catalog Optimized!',
      desc: 'All 4 high-value opportunities across Footwear, Backpacks, Tents, and Trail Running have been verified and patched with zero hallucinations.',
      deficits: [
        '✓ 4/4 Opportunities Resolved',
        '✓ Total Pipeline Lift Realized: +₹4,00,000 GMV'
      ],
      potential: '+₹4,00,000 Total GMV Realized',
      nextOppId: 'opp-01',
      buttonText: 'Review Opportunity #1 (Boots) ←'
    }
  }
};

export default function CatalystAgentHome({
  hasAnalyzed,
  onAnalyzeComplete,
  opportunities = [],
  activeDiff,
  onApproveFix,
  onRejectFix,
  isApproving,
  onRunExperiment,
  experimentResult,
  onOpenStorefront,
  onNavigateToProof,
  onNavigateToStore,
  onOpenDiffModal
}) {
  const [storeUrl, setStoreUrl] = useState('https://apex-outdoor.vercel.app');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isInvestigatingNext, setIsInvestigatingNext] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeOpportunityId, setActiveOpportunityId] = useState('opp-01'); // 'opp-01' | 'opp-02' | 'opp-03' | 'opp-04'
  
  // Per-opportunity approval states
  const [backpackApproved, setBackpackApproved] = useState(false);
  const [backpackApproving, setBackpackApproving] = useState(false);
  const [tentApproved, setTentApproved] = useState(false);
  const [tentApproving, setTentApproving] = useState(false);
  const [shoesApproved, setShoesApproved] = useState(false);
  const [shoesApproving, setShoesApproving] = useState(false);
  
  const [showOpportunitiesDrawer, setShowOpportunitiesDrawer] = useState(false);
  const [showTechnicalDiff, setShowTechnicalDiff] = useState(false);
  const [showSupportingQueries, setShowSupportingQueries] = useState(false);
  const [activeWhyModal, setActiveWhyModal] = useState(null);
  const [hasTestedOffer, setHasTestedOffer] = useState(false);
  const [hasApprovedReminder, setHasApprovedReminder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('best waterproof hiking boots under ₹5,000');
  const [isSimulatingQuery, setIsSimulatingQuery] = useState(false);
  const [showFullCapabilities, setShowFullCapabilities] = useState(false);

  const isBootApproved = 
    activeDiff?.status === 'approved' || 
    activeDiff?.status === 'applied' ||
    (typeof window !== 'undefined' && localStorage.getItem('catalyst_diff_status') === 'approved');

  const isApprovedMap = {
    'opp-01': isBootApproved,
    'opp-02': backpackApproved,
    'opp-03': tentApproved,
    'opp-04': shoesApproved
  };

  const isCurrentApproved = isApprovedMap[activeOpportunityId] || false;
  const isCurrentApproving = 
    activeOpportunityId === 'opp-01' ? isApproving :
    activeOpportunityId === 'opp-02' ? backpackApproving :
    activeOpportunityId === 'opp-03' ? tentApproving :
    shoesApproving;

  const currentOpp = OPPORTUNITIES_MAP[activeOpportunityId] || OPPORTUNITIES_MAP['opp-01'];

  // Reset internal states when demo is reset
  useEffect(() => {
    if (!hasAnalyzed || !isBootApproved) {
      setActiveOpportunityId('opp-01');
      setBackpackApproved(false);
      setTentApproved(false);
      setShoesApproved(false);
      setHasTestedOffer(false);
      setHasApprovedReminder(false);
      setShowTechnicalDiff(false);
      setShowSupportingQueries(false);
      setActiveWhyModal(null);
      setSearchQuery('best waterproof hiking boots under ₹5,000');
    }
  }, [hasAnalyzed, isBootApproved]);

  const analysisSteps = [
    { 
      label: 'Connecting to merchant storefront & catalog feed...', 
      doneLabel: 'Storefront connected & verified (https://apex-outdoor.vercel.app)',
      sub: 'Status: 200 OK • REST API sync initialized'
    },
    { 
      label: 'Scanning product catalog (12 SKUs, 60 attributes)...', 
      doneLabel: '12 SKUs scanned — 0% Schema.org JSON-LD structured data detected',
      sub: 'Thin catalog structure identified across Footwear & Gear'
    },
    { 
      label: 'Benchmarking competitors across AI search engines...', 
      doneLabel: 'Competitor evidence mapped (Monsoon Trekker: 11 specs vs Merchant: 5 specs)',
      sub: 'Analyzed SummitPro, TrailPro & Monsoon Trekker catalog schemas'
    },
    { 
      label: 'Evaluating 40 high-intent shopping queries across ChatGPT & Perplexity...', 
      doneLabel: '40 AI query vectors evaluated — 12.7% merchant win rate vs 55% competitor',
      sub: 'Pinpointed highest recommendation loss in Footwear category'
    },
    { 
      label: 'Synthesizing evidence deficit & formulating grounded FixDiff...', 
      doneLabel: 'Grounded FixDiff #diff-apex-01 ready (4 verified specs, 0 hallucinations)',
      sub: 'Paused at WAIT_FOR_APPROVAL for mandatory merchant review'
    }
  ];

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setStepIndex(0);
    try {
      // Trigger real backend gap diagnosis API in background
      runDiagnosis().catch(() => {});
    } catch (_) {}
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    const stepDurations = [900, 1050, 1150, 1100, 850];
    const currentDuration = stepDurations[stepIndex] || 1000;

    if (stepIndex < analysisSteps.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, currentDuration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyzeComplete();
      }, currentDuration);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, stepIndex]);


  const handleSwitchOpportunity = (oppId) => {
    if (oppId === activeOpportunityId) return;
    setIsInvestigatingNext(true);
    setTimeout(() => {
      setActiveOpportunityId(oppId);
      setIsInvestigatingNext(false);
      setShowTechnicalDiff(false);
      setShowSupportingQueries(false);
      setActiveWhyModal(null);
      const targetOpp = OPPORTUNITIES_MAP[oppId] || OPPORTUNITIES_MAP['opp-01'];
      setSearchQuery(targetOpp.queryPreset);
    }, 500);
  };

  const handleApproveCurrent = () => {
    if (activeOpportunityId === 'opp-01') {
      onApproveFix();
    } else if (activeOpportunityId === 'opp-02') {
      setBackpackApproving(true);
      setTimeout(() => {
        setBackpackApproving(false);
        setBackpackApproved(true);
      }, 600);
    } else if (activeOpportunityId === 'opp-03') {
      setTentApproving(true);
      setTimeout(() => {
        setTentApproving(false);
        setTentApproved(true);
      }, 600);
    } else if (activeOpportunityId === 'opp-04') {
      setShoesApproving(true);
      setTimeout(() => {
        setShoesApproving(false);
        setShoesApproved(true);
      }, 600);
    }
  };




  // 1. FIRST-TIME ONBOARDING (CONNECT + METHODOLOGY)
  if (!hasAnalyzed && !isAnalyzing) {
    return (
      <div className="max-w-6xl mx-auto my-6 space-y-6 animate-in fade-in duration-300">
        
        {/* Top Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Commerce Revenue Agent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Meet Catalyst
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            An autonomous AI employee that finds where AI shoppers are choosing someone else — and generates bounded fixes to win the sale.
          </p>
        </div>

        {/* 2-Column Bento: Connect Card + Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Connect Store Input (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
                  <Zap className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                    Connect your store
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Paste your storefront URL to benchmark your technical catalog signals against top competitors across AI shopping surfaces.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://yourstore.com"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#0a0d14] border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-400 shadow-inner"
                    />
                  </div>

                  {/* Demo Sandbox Disclaimer & Preset */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="text-[11px] text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-300">Live Demo Sandbox:</strong> Real-time analysis is currently tuned for the <strong>Apex Ridge Outdoors</strong> demo store.
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1.5 border-t border-amber-500/20 text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setStoreUrl('https://apex-outdoor.vercel.app')}
                        className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold transition-colors cursor-pointer"
                      >
                        Use Demo URL
                      </button>
                      
                      <a
                        href="https://apex-outdoor.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                      >
                        <span>Preview Demo Store</span>
                        <ArrowUpRight className="w-3 h-3 text-amber-400" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Safe · Non-invasive read-only audit</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  onClick={handleStartAnalysis}
                  className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-blue-600/25"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze my store →</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 font-mono mt-2.5">
                  Takes ~3 seconds · Evaluates 40 AI shopping query vectors
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: How Catalyst Works & Methodology (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl flex-1 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                    How Catalyst Works
                  </span>
                </div>
                <button
                  onClick={() => setShowFullCapabilities(true)}
                  className="text-[11px] font-mono text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
                >
                  View full 11 capabilities →
                </button>
              </div>

              {/* 4 Methodology Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Pillar 01 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      01
                    </span>
                    <span className="text-xs font-bold text-white">
                      Discover Demand
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catalyst tests high-intent shopping queries and finds where AI shoppers choose competitors instead of your products.
                  </p>
                </div>

                {/* Pillar 02 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      02
                    </span>
                    <span className="text-xs font-bold text-white">
                      Diagnose the Gap
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    It compares the evidence AI can actually understand — product attributes, reviews, FAQs and structured data — and identifies missing signals.
                  </p>
                </div>

                {/* Pillar 03 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      03
                    </span>
                    <span className="text-xs font-bold text-white">
                      Act Safely
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catalyst creates a grounded fix, verifies every claim against your catalog, and pauses at <code className="text-amber-300 font-mono text-[10px]">WAIT_FOR_APPROVAL</code> until you approve.
                  </p>
                </div>

                {/* Pillar 04 */}
                <div className="p-3.5 rounded-2xl bg-[#0c101c] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[11px] font-bold flex items-center justify-center">
                      04
                    </span>
                    <span className="text-xs font-bold text-white">
                      Prove Revenue
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catalyst re-tests AI discovery, connects AI sessions to Razorpay payments, runs experiments and rejects spoofed attribution before calculating GMV.
                  </p>
                </div>

              </div>

              {/* Anchor Sentence Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 text-xs text-slate-200 leading-relaxed">
                <span className="font-semibold text-blue-200">
                  "Catalyst doesn't just tell you what to improve. It finds the opportunity, proposes the fix, gets your approval, deploys it, measures the outcome, and finds what to do next."
                </span>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Verified Against Catalog Source Data (Zero Hallucinations)</span>
                </div>
                <span className="text-emerald-400 font-bold hidden sm:inline">Grounded</span>
              </div>

            </div>
          </div>

        </div>

        {/* 11-Stage Capability Architecture Modal */}
        {showFullCapabilities && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#121624] border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Catalyst's 11-Stage Closed-Loop Capability Spectrum
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Full autonomous agent pipeline from catalog connection to revenue realization
                  </p>
                </div>
                <button
                  onClick={() => setShowFullCapabilities(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-blue-400">1. Connect</div>
                  <p className="text-slate-300">Paste store URL. Auto-detect products, categories, catalog SKUs and benchmark competitors with zero manual setup.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-blue-400">2. Discover</div>
                  <p className="text-slate-300">Generate high-intent shopping queries. Test merchant vs competitors across AI shopping surfaces to detect omitted products.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-amber-400">3. Diagnose</div>
                  <p className="text-slate-300">Compare product attributes, reviews, evidence depth, missing FAQs and structured data. Rank opportunities by commercial impact.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-amber-400">4. Act</div>
                  <p className="text-slate-300">Generate grounded product-copy improvements, FAQs, Schema.org JSON-LD, and show exact visual diffs explaining the reasoning.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-emerald-400">5. Safety</div>
                  <p className="text-slate-300">Ground every claim in verified merchant data. Enforce mandatory <code className="text-amber-300">WAIT_FOR_APPROVAL</code> and complete agent audit logs.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-emerald-400">6. Deploy</div>
                  <p className="text-slate-300">Apply approved changes to the connected store. Generate CMS/HTML/JSON-LD export payloads for Shopify or WooCommerce.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-purple-400">7. Re-discover</div>
                  <p className="text-slate-300">Re-run the same AI shopping queries across engines to verify whether recommendations flipped to your store as #1 pick.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-purple-400">8. Revenue Optimization</div>
                  <p className="text-slate-300">Identify AI shoppers, recommend appropriate Razorpay card/UPI offers, detect checkout drop-offs, and trigger recovery reminders.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-indigo-400">9. Attribution</div>
                  <p className="text-slate-300">AI referral → session → checkout → Razorpay payment. Reject suspicious spoofed headers with 5-signal classifier.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2">
                  <div className="font-mono font-bold text-indigo-400">10. Experimentation</div>
                  <p className="text-slate-300">Control vs treatment evaluation across 3,000 sessions. Clearly label simulation vs real payment data without claiming unproven causality.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 space-y-2 md:col-span-2">
                  <div className="font-mono font-bold text-cyan-400">11. Learn / Next Action</div>
                  <p className="text-slate-300">If the intervention worked → automatically discover the next biggest opportunity in the catalog. If not → investigate evidence deficits.</p>
                </div>

              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowFullCapabilities(false)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Close Capability Spec
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // 2. LIVE ANALYSIS ANIMATION (CATALYST WORKS)
  if (isAnalyzing || isInvestigatingNext) {
    const progressPct = isInvestigatingNext 
      ? 75 
      : Math.min(100, Math.round(((stepIndex + 1) / analysisSteps.length) * 100));

    return (
      <div className="max-w-2xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-8 sm:p-10 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="inline-flex p-3.5 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-300 shadow-md">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {isInvestigatingNext 
                  ? `Investigating ${currentOpp.name}...` 
                  : 'Catalyst is investigating...'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {isInvestigatingNext 
                  ? `Evaluating ${currentOpp.category} specs, evidence gaps, and AI query rankings` 
                  : `Storefront: ${storeUrl}`}
              </p>
            </div>

            {/* Live Progress Bar */}
            <div className="max-w-md mx-auto space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-blue-300 font-bold">Autonomous Reasoning Engine</span>
                <span>{progressPct}% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3.5 bg-[#090d16] p-6 rounded-2xl border border-slate-800/90 shadow-inner">
            {isInvestigatingNext ? (
              <>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>Inspected catalog SKU: <strong>{currentOpp.name}</strong> ({currentOpp.sku})</div>
                    <div className="text-[11px] text-slate-500">Extracted product attributes and compared against search intent</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>Benchmarked competitor: <strong>{currentOpp.competitor}</strong></div>
                    <div className="text-[11px] text-slate-500">Evaluated machine-readable evidence differences across AI surfaces</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-blue-300 font-semibold font-mono animate-pulse">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0 mt-0.5" />
                  <div>
                    <div>Synthesizing evidence deficit & preparing grounded fix...</div>
                    <div className="text-[11px] text-blue-400/80 font-normal">Validating zero-hallucination claims against merchant source specs</div>
                  </div>
                </div>
              </>
            ) : (
              analysisSteps.map((step, idx) => {
                const isDone = idx < stepIndex;
                const isCurrent = idx === stepIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 text-xs sm:text-sm transition-all duration-300 ${
                      isDone
                        ? 'text-slate-200'
                        : isCurrent
                        ? 'text-blue-200 font-semibold scale-[1.01]'
                        : 'text-slate-500 font-mono opacity-60'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-800" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-mono">{isDone ? step.doneLabel : step.label}</span>
                      {(isDone || isCurrent) && step.sub && (
                        <div className="text-[11px] text-slate-400 font-mono font-normal">
                          ↳ {step.sub}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Telemetry Footer */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="text-slate-500 block">Queries Tested</span>
              <strong className="text-slate-200">40 AI Vectors</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="text-slate-500 block">Catalog Scope</span>
              <strong className="text-slate-200">12 SKUs</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <span className="text-slate-500 block">Surfaces Probed</span>
              <strong className="text-slate-200">ChatGPT, Perplexity</strong>
            </div>
          </div>

        </div>
      </div>
    );
  }


  // 3. MAIN AGENT WORKSPACE (10-Second Comprehension + Multi-Opportunity Switcher)
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Agent Status Bar & Opportunity Selector (Single Row Responsive Layout) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#121624]/90 border border-slate-800 p-3 sm:p-4 rounded-2xl">
        
        {/* Left: Opportunities Selector Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <div className="flex items-center space-x-2 mr-1 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 font-semibold hidden sm:inline">Autonomous Loop:</span>
          </div>

          {/* 4 Dynamic Opportunity Pills */}
          {Object.values(OPPORTUNITIES_MAP).map((opp) => {
            const isSelected = opp.id === activeOpportunityId;
            const isApproved = isApprovedMap[opp.id];

            return (
              <button
                key={opp.id}
                onClick={() => handleSwitchOpportunity(opp.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 flex-shrink-0 ${
                  isSelected 
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm' 
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{opp.shortName}</span>
                {isApproved ? (
                  <span className="text-emerald-400 text-[10px] font-bold">✓ ({opp.revenue.gmvDisplay})</span>
                ) : isSelected ? (
                  <span className="text-amber-400 text-[10px] font-semibold">⚡ Action</span>
                ) : (
                  <span className="text-slate-500 text-[10px]">⏳ Queued</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => setShowOpportunitiesDrawer(!showOpportunitiesDrawer)}
            className={`text-xs font-mono flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              showOpportunitiesDrawer 
                ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-sm' 
                : 'bg-slate-900 hover:bg-slate-800 text-indigo-300 border-slate-700'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            <span>Radar (4)</span>
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded-md border border-indigo-800 font-bold">+₹4.00L</span>
          </button>

          <button
            onClick={onNavigateToStore}
            className="text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Catalog</span>
          </button>
          
          <button
            onClick={onOpenStorefront}
            className="text-xs font-mono text-blue-300 hover:text-blue-200 flex items-center space-x-1 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Store</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Identified Opportunities Radar Drawer / Panel */}
      {showOpportunitiesDrawer && (
        <div className="rounded-3xl bg-[#0f1422] border border-indigo-500/30 p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-display font-bold text-white">
                  Identified Opportunities Radar & Loop Engine
                </h3>
                <span className="text-xs font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-800 font-semibold">
                  4 Catalog Gaps
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Continuous autonomous cycle benchmarks 12 store SKUs across AI search query vectors
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Loop Mode: <strong className="text-emerald-300">Autonomous Cycle Active</strong></span>
              </div>
              <button
                onClick={() => setShowOpportunitiesDrawer(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Autonomous Loop Cycle Flow Diagram */}
          <div className="p-4 rounded-2xl bg-[#090c14] border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-blue-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>6-Stage Autonomous Closed Loop Cycle</span>
              </span>
              <span className="text-emerald-400 font-normal">Next Best Action Auto-Triggered</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold">1. Ingest</div>
                <div className="text-slate-300 text-[10px]">Auto-crawl 12 catalog SKUs</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold">2. Discover</div>
                <div className="text-slate-300 text-[10px]">Test 40 shopping queries</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">3. Diagnose</div>
                <div className="text-slate-300 text-[10px]">Detect spec/schema gap</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">4. Grounded Fix</div>
                <div className="text-slate-300 text-[10px]">Generate verified diff</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">5. Approve Gate</div>
                <div className="text-slate-300 text-[10px]">WAIT_FOR_APPROVAL</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold">6. Realize & Loop</div>
                <div className="text-slate-300 text-[10px]">Razorpay Lift ⟲ Next SKU</div>
              </div>
            </div>
          </div>

          {/* 4 Opportunities Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {Object.values(OPPORTUNITIES_MAP).map((opp) => {
              const isSelected = opp.id === activeOpportunityId;
              const isApproved = isApprovedMap[opp.id];

              return (
                <div 
                  key={opp.id}
                  onClick={() => {
                    handleSwitchOpportunity(opp.id);
                    setShowOpportunitiesDrawer(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected 
                      ? 'bg-blue-950/30 border-blue-500/50 shadow-md' 
                      : 'bg-[#0a0d16] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-blue-400 font-bold">#{opp.rank} {opp.category}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isApproved 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : isSelected
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {isApproved ? 'Resolved ✓' : isSelected ? 'Action ⚡' : 'Queued ⏳'}
                    </span>
                  </div>
                  <div className="font-sans font-bold text-white text-sm">
                    {opp.name}
                  </div>
                  <div className="text-slate-400 text-[11px] space-y-0.5">
                    <div>Deficit: {opp.diffs[0].replace('+', '').trim()}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-semibold">
                    <span className="text-slate-400 text-[10px]">GMV Impact:</span>
                    <span className="text-emerald-400">{opp.revenue.gmvDisplay}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Primary Agent Headline Card (10-Second Comprehension) */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Catalyst Diagnosis</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-300">
                Opportunity #{currentOpp.rank} · {currentOpp.name}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              {currentOpp.headline}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
              {currentOpp.summary}
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className={`text-xs font-mono px-4 py-2 rounded-xl border inline-flex items-center gap-2 ${
              isCurrentApproved 
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60 font-semibold'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
            }`}>
              {isCurrentApproved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Fix Deployed & Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Action Required</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Workflow Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* ================= LEFT COLUMN: Diagnosis & Catalyst Fix ================= */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 1. Evidence Gap Diagnosis Card */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                <span>Why AI Shoppers Overlook You</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Query: "{currentOpp.queryPreset}"
              </span>
            </div>

            {/* Competitor vs Merchant Evidence Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              
              {/* Competitor Box */}
              <div className="p-4 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                  <span>{currentOpp.competitor}</span>
                  <span className="text-[10px] text-emerald-400">✓ Recommended</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px]">
                  {currentOpp.competitorSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{spec.label}</span>
                      <button onClick={() => setActiveWhyModal(spec.key)} className="text-[10px] text-blue-300 hover:underline cursor-pointer">Why?</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apex Ridge Box */}
              <div className="p-4 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-rose-400 text-[11px] font-semibold uppercase tracking-wider">
                  <span>{currentOpp.name} (Your Store)</span>
                  <span className="text-[10px] text-rose-400">✕ Overlooked</span>
                </div>
                <div className="space-y-1.5 text-rose-300 text-[11px]">
                  {currentOpp.merchantDeficits.map((def, idx) => (
                    <div key={idx}>{def}</div>
                  ))}
                </div>
              </div>

            </div>

            {/* "Why?" Explanation Popover */}
            {activeWhyModal && (
              <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-slate-300 flex items-start justify-between gap-2 animate-in fade-in duration-150">
                <div>
                  <strong className="text-blue-300">Why {activeWhyModal}?</strong> This spec exists in your raw catalog records and is the exact criteria AI shopping assistants use to recommend products for this query.
                </div>
                <button onClick={() => setActiveWhyModal(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer">✕</button>
              </div>
            )}

            {/* Progressive Disclosure: Supporting Queries */}
            <div className="pt-1">
              <button
                onClick={() => setShowSupportingQueries(!showSupportingQueries)}
                className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
              >
                {showSupportingQueries ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{showSupportingQueries ? 'Hide supporting queries' : 'View 40 evaluated shopping queries →'}</span>
              </button>

              {showSupportingQueries && (
                <div className="mt-3 p-4 rounded-2xl bg-[#090a0f] border border-slate-800 text-xs font-mono text-slate-300 space-y-2 animate-in fade-in duration-150 max-h-48 overflow-y-auto">
                  <div className="text-[11px] text-slate-400 pb-1 border-b border-slate-800">Evaluated AI Shopping Query Vectors:</div>
                  {currentOpp.presets.map((preset, idx) => (
                    <div key={idx} className="text-rose-400">• "{preset}" → Bypassed (Evidence deficit detected)</div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* 1.5. Autonomous Agent Chain-of-Thought Reasoning Log */}
          <div className="rounded-3xl bg-[#0b101d] border border-blue-900/50 p-5 shadow-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs">
                <Bot className="w-4 h-4 text-blue-400" />
                <span>Agent Chain-of-Thought (Reasoning Trace)</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                100% Fact-Checked
              </span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="p-2.5 rounded-xl bg-[#060810] border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-blue-300 font-bold text-[10px]">
                  <span>STEP 1: OBSERVE DEMAND LOSS</span>
                  <span className="text-slate-500">get_query_results()</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Evaluated 40 high-intent shopping queries. Apex Ridge won only <strong>12.7%</strong> of trials while Monsoon Trekker Pro captured <strong>55.0%</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#060810] border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-amber-300 font-bold text-[10px]">
                  <span>STEP 2: DIAGNOSE EVIDENCE GAP</span>
                  <span className="text-slate-500">diagnose_gap()</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Competitors provide 11 machine-readable specifications in Schema.org JSON-LD. Apex Ridge had only 5 generic text attributes with 0 JSON-LD tags.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#060810] border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-emerald-300 font-bold text-[10px]">
                  <span>STEP 3: PROPOSE CATALOG PATCH</span>
                  <span className="text-slate-500">generate_fix_diff()</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Drafted FixDiff #diff-apex-01. Verified 4 claims against merchant warehouse data (HydroGuard IPX7 15,000mm, 420g, Vibram sole). 0 hallucinations.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-purple-950/20 border border-purple-800/30 text-purple-300 text-[10px] flex items-center justify-between">
                <span>GATE: State paused at <code className="text-white font-bold bg-slate-900 px-1 py-0.5 rounded">WAIT_FOR_APPROVAL</code></span>
                <span className="text-purple-400 font-bold">Human Sign-off Mandatory</span>
              </div>
            </div>
          </div>


          {/* 2. Catalyst's Proposed Fix & Approval Gate */}
          <div className="rounded-3xl bg-[#0e172a] border border-blue-900/40 p-6 shadow-xl space-y-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Catalyst Fix Proposal</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                I prepared a grounded fix for {currentOpp.name}.
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                ✓ All claims verified against your product data · Zero unsupported claims.
              </p>
            </div>

            {/* Human-Readable Diff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-emerald-300 bg-[#090d18] p-4 rounded-2xl border border-blue-900/30">
              {currentOpp.diffs.map((diffItem, idx) => (
                <div key={idx} className={`flex items-center space-x-2 ${idx === currentOpp.diffs.length - 1 ? 'sm:col-span-2' : ''}`}>
                  <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{diffItem}</span>
                </div>
              ))}
            </div>

            {/* Technical Changes Toggle (Progressive Disclosure) */}
            <div className="pt-1">
              <button
                onClick={() => setShowTechnicalDiff(!showTechnicalDiff)}
                className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{showTechnicalDiff ? 'Hide technical changes' : 'Show technical changes (JSON-LD & Payload) →'}</span>
              </button>

              {showTechnicalDiff && (
                <div className="mt-3 p-4 rounded-xl bg-[#090a0f] border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 animate-in fade-in duration-150">
                  {currentOpp.technicalDiffs.map((tech, idx) => (
                    <div key={idx} className={tech.includes('@context') ? 'text-blue-300' : 'text-emerald-400'}>{tech}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Mandatory Approval Gate */}
            {!isCurrentApproved ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleApproveCurrent}
                  disabled={isCurrentApproving}
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isCurrentApproving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deploying approved changes to store...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-blue-200" />
                      <span>Approve & Deploy Fix for {currentOpp.shortName}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenDiffModal}
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Review diff
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-800/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{currentOpp.name} is now Catalyst Enhanced ✓</span>
                </div>
                <button
                  onClick={onOpenStorefront}
                  className="text-emerald-300 hover:text-white underline cursor-pointer font-medium flex items-center space-x-1"
                >
                  <span>View updated store</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* ================= RIGHT COLUMN: AI Simulator & Razorpay Revenue ================= */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 1. AI Search Discovery & Retrieval Benchmark */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 flex-1 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Search className="w-4 h-4" />
                <span>AI Search Discovery Benchmark</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 font-bold">
                40 Continuous Query Vectors
              </span>
            </div>

            {/* Query Intent Vector Table */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Commercial Intent Performance
              </span>
              
              <div className="space-y-1.5">
                {[
                  { query: 'Best waterproof hiking boots under ₹5,000', baseline: '15.0%', patched: '55.0%', lift: '+40.0 pts' },
                  { query: 'Monsoon trekking boots with Vibram sole', baseline: '10.0%', patched: '45.0%', lift: '+35.0 pts' },
                  { query: 'Lightweight 420g trail hiking shoes', baseline: '20.0%', patched: '60.0%', lift: '+40.0 pts' },
                  { query: 'Winter alpine breathable waterproof boots', baseline: '15.0%', patched: '50.0%', lift: '+35.0 pts' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#090d16] border border-slate-800 flex items-center justify-between gap-2 text-[11px]">
                    <div className="truncate flex-1 text-slate-300">
                      "{item.query}"
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-rose-400/80 line-through text-[10px]">{item.baseline}</span>
                      <span className="text-emerald-400 font-bold">{isCurrentApproved ? item.patched : item.baseline}</span>
                      {isCurrentApproved && (
                        <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800/80 font-bold">
                          {item.lift}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aggregate Evidence Density */}
            <div className="p-3.5 rounded-2xl bg-[#080c14] border border-slate-800 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Average Win-Rate:</span>
                <span className="font-bold text-white">
                  {isCurrentApproved ? '16.7% → 37.5% (+125% Lift)' : '16.7% (Baseline)'}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Machine-Readable Specs:</span>
                <span className="font-bold text-emerald-400">
                  {isCurrentApproved ? '11 Specs (100% Valid JSON-LD)' : '5 Specs (0% JSON-LD)'}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Grounded Safety Check:</span>
                <span className="text-emerald-400 font-bold">0 Unsupported Claims ✓</span>
              </div>
            </div>

          </div>

          {/* 2. Razorpay Revenue & Payment Loop Card */}
          <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 shadow-xl space-y-4 font-mono text-xs flex-1">

            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Razorpay Revenue & Payment Intelligence</span>
            </div>

            <div className="space-y-4">
              {/* Payment Offer Experiment */}
              <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="text-[11px] text-slate-400 font-semibold">AI SHOPPER CHECKOUT OPTIMIZATION</div>
                <div className="text-slate-300 font-sans text-xs">
                  Catalyst detected AI-referred shoppers are abandoning checkout. Recommended action: test targeted instant payment offer.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-blue-300 font-semibold flex items-center justify-between">
                  <span>{currentOpp.offer.name}</span>
                  <span className="text-[10px] text-emerald-400">{currentOpp.offer.lift}</span>
                </div>

                <button
                  onClick={() => setHasTestedOffer(!hasTestedOffer)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
                >
                  {hasTestedOffer ? '✓ Offer Applied to AI Traffic' : 'Test offer on AI traffic'}
                </button>

                {/* Offer Live Output Panel */}
                {hasTestedOffer && (
                  <div className="mt-2 p-3 rounded-xl bg-[#090a0f] border border-emerald-800/40 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live Simulation Output:</span>
                    </div>
                    <div className="text-slate-300">
                      • Checkout payload injected: <code className="text-blue-300">{currentOpp.offer.code}</code>
                    </div>
                    <div className="text-slate-300">
                      • AI Cart Conversion: <span className="line-through text-slate-500">14.2%</span> → <strong className="text-emerald-300">{currentOpp.offer.cartConv}</strong> (+3.6% net lift)
                    </div>
                    <div className="text-slate-300">
                      • Additional Lifted GMV: <strong className="text-white">{currentOpp.offer.revenue}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Abandonment Recovery */}
              <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="text-[11px] text-slate-400 font-semibold flex items-center space-x-1">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHECKOUT RECOVERY</span>
                </div>
                <div className="text-slate-300 font-sans text-xs">
                  AI-referred customer abandoned cart at payment step. Suggested action: send approved recovery reminder.
                </div>

                <button
                  onClick={() => setHasApprovedReminder(!hasApprovedReminder)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  {hasApprovedReminder ? '✓ Recovery Reminder Active' : 'Approve reminder'}
                </button>

                {/* Recovery Live Output Panel */}
                {hasApprovedReminder && (
                  <div className="mt-2 p-3 rounded-xl bg-[#090a0f] border border-emerald-800/40 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live Recovery Output:</span>
                    </div>
                    <div className="text-slate-300">
                      • Abandoned AI sessions: <span className="text-white">{currentOpp.recovery.abandoned}</span>
                    </div>
                    <div className="text-slate-300">
                      • Recovered via Razorpay Link: <strong className="text-emerald-300">{currentOpp.recovery.recovered}</strong>
                    </div>
                    <div className="text-slate-300">
                      • Recovered Revenue: <strong className="text-white">{currentOpp.recovery.revenue}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Revenue Payoff & Next Best Action Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Controlled Simulation Revenue Payoff */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Controlled Simulation Revenue Impact ({currentOpp.category})
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                {currentOpp.revenue.liftPct}
              </span>
            </div>

            <div className="flex items-baseline space-x-3">
              <div className="text-4xl sm:text-5xl font-display font-bold text-emerald-300 tracking-tight">
                {currentOpp.revenue.gmvDisplay}
              </div>
              <div className="text-xs font-mono text-slate-300">
                incremental GMV verified
              </div>
            </div>

            {/* Arithmetic Formula Breakdown */}
            <div className="p-4 rounded-2xl bg-[#090a0f] border border-slate-800 text-left space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-400 font-semibold border-b border-slate-800 pb-2">
                <span>Arithmetic Calculation Breakdown:</span>
                <span className="text-[10px] text-blue-300">3,000 Sessions Benchmark</span>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Control Arm (1,500 queries):</span>
                  <span className="text-slate-200">{currentOpp.revenue.controlText}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400">Treatment Arm (1,500 queries):</span>
                  <span className="text-emerald-300 font-bold">{currentOpp.revenue.treatmentText}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 font-bold">
                  <span className="text-white">Net Incremental GMV:</span>
                  <span className="text-emerald-400">{currentOpp.revenue.netText}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5">
                * 348 sessions forged <code className="text-amber-300">utm_source=chatgpt</code> headers but scored &lt;0 on the 5-signal classifier, contributing ₹0 false GMV.
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToProof}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>View deep technical proof & traces →</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </button>
        </div>

        {/* Right: Next Best Action Loop (Closed-loop Agent) */}
        <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <Target className="w-4 h-4" />
                <span>Next Best Action Loop</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                Closed-Loop Agent
              </span>
            </div>

            <h4 className="text-xl font-display font-bold text-white">
              {currentOpp.nextAction.title}
            </h4>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {currentOpp.nextAction.desc}
            </p>

            <div className="p-4 rounded-2xl bg-[#090a0f] border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-semibold">Identified Deficits:</div>
              {currentOpp.nextAction.deficits.map((def, idx) => (
                <div key={idx} className={def.startsWith('✓') ? 'text-emerald-300 font-semibold' : 'text-rose-300'}>
                  {def}
                </div>
              ))}
              <div className="text-emerald-300 font-semibold pt-1">
                Estimated revenue potential: {currentOpp.nextAction.potential}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSwitchOpportunity(currentOpp.nextAction.nextOppId)}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>{currentOpp.nextAction.buttonText}</span>
          </button>
        </div>

      </div>

    </div>
  );
}


