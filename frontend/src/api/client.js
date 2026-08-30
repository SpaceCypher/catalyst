import thinCatalog from '../../../data/seed/merchant_catalog_thin.json';
import richCatalog from '../../../data/seed/merchant_catalog_rich.json';
import compCatalog from '../../../data/seed/competitor_catalog.json';

const API_BASE = '/api';

export async function fetchCatalog(state = 'thin') {
  try {
    const res = await fetch(`${API_BASE}/catalog/${state}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback for standalone static Vercel deployment
  }
  const raw = state === 'rich' ? richCatalog : state === 'competitor' ? compCatalog : thinCatalog;
  return {
    state,
    total_products: raw.length,
    products: raw
  };
}

export async function runDiagnosis() {
  try {
    const res = await fetch(`${API_BASE}/diagnosis/run`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { status: 'success' };
}

export async function fetchOpportunities() {
  try {
    const res = await fetch(`${API_BASE}/diagnosis/opportunities`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return [
    {
      opportunity_id: "opp-01",
      rank: 1,
      title: "Product Evidence & Attributes Gap (Footwear & Trekking)",
      gap_type: "attribute_gap",
      category: "Footwear",
      affected_skus: ["merch-boot-01"],
      merchant_win_rate: 0.15,
      competitor_win_rate: 0.55,
      primary_blocking_reason: "Competitor provides 11 machine-readable attributes (IPX7 waterproofing, 420g weight, Vibram sole) vs 5 basic attributes on your store.",
      estimated_potential_gmv_gain: 150000.0,
      confidence_score: 0.94,
      merchant_evidence: { attributes_count: 5, schema: false, reviews: 18 },
      competitor_evidence: { attributes_count: 11, schema: true, reviews: 312 }
    },
    {
      opportunity_id: "opp-02",
      rank: 2,
      title: "Missing Schema.org Product Structured Data (Outdoor Gear)",
      gap_type: "schema_gap",
      category: "Outdoor Gear",
      affected_skus: ["merch-bag-01", "merch-tent-01"],
      merchant_win_rate: 0.10,
      competitor_win_rate: 0.50,
      primary_blocking_reason: "Search crawlers cannot machine-parse pricing, capacity, and materials without Product JSON-LD schema.",
      estimated_potential_gmv_gain: 90000.0,
      confidence_score: 0.89,
      merchant_evidence: { attributes_count: 6, schema: false, reviews: 12 },
      competitor_evidence: { attributes_count: 12, schema: true, reviews: 194 }
    }
  ];
}

export async function generateFix(opportunityId = 'opp-01', productId = 'merch-boot-01') {
  try {
    const res = await fetch(`${API_BASE}/fix/generate?opportunity_id=${opportunityId}&product_id=${productId}`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return await fetchFix('diff-apex-01');
}

export async function fetchFix(diffId = 'diff-apex-01') {
  try {
    const res = await fetch(`${API_BASE}/fix/${diffId}`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return {
    diff_id: "diff-apex-01",
    opportunity_id: "opp-01",
    product_id: "merch-boot-01",
    product_name: "Apex Ridge Waterproof Trekking Boots",
    status: "proposed",
    validation_status: "valid",
    fields: [
      { field_name: "waterproof_rating", change_type: "addition", current_value: null, proposed_value: "IPX7 (15,000mm hydrostatic head)" },
      { field_name: "weight", change_type: "addition", current_value: "650g", proposed_value: "420g (per boot, UK size 8)" },
      { field_name: "outsole", change_type: "addition", current_value: "Rubber", proposed_value: "Vibram MegaGrip with 5mm multidirectional lugs" },
      { field_name: "structured_schema", change_type: "addition", current_value: null, proposed_value: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Apex Ridge Waterproof Trekking Boots",
        "brand": { "@type": "Brand", "name": "Apex Ridge" },
        "offers": { "@type": "Offer", "price": 3499, "priceCurrency": "INR", "availability": "https://schema.org/InStock" }
      }, null, 2)}
    ]
  };
}

export async function approveFix(diffId) {
  try {
    const res = await fetch(`${API_BASE}/fix/${diffId}/approve`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { diff_id: diffId, status: "approved" };
}

export async function rejectFix(diffId) {
  try {
    const res = await fetch(`${API_BASE}/fix/${diffId}/reject`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { diff_id: diffId, status: "rejected" };
}

export async function runExperiment(diffId = 'diff-apex-01') {
  try {
    const res = await fetch(`${API_BASE}/experiment/run?diff_id=${diffId}`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return await fetchLatestExperiment();
}

export async function fetchLatestExperiment() {
  try {
    const res = await fetch(`${API_BASE}/experiment/latest`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return {
    experiment_id: "exp-cat-42-latest",
    diff_id: "diff-apex-01",
    label: "Controlled simulation result",
    incremental_gmv: 150000.0,
    incremental_gmv_pct: 125.0,
    control: { arm: "control", sample_size: 1500, verified_referrals: 123, verified_conversions: 24, verified_gmv: 120000.0, recommendation_rate: 0.082 },
    treatment: { arm: "treatment", sample_size: 1500, verified_referrals: 267, verified_conversions: 54, verified_gmv: 270000.0, recommendation_rate: 0.178 }
  };
}

export async function fetchAttributionEvaluation() {
  try {
    const res = await fetch(`${API_BASE}/attribution/evaluation`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return {
    dataset_split: "heldout",
    total_sessions_evaluated: 1958,
    precision: 1.0,
    recall: 0.994,
    f1_score: 0.997,
    false_positive_gmv: 0.0,
    spoofed_sessions_rejected: 348,
    spoofed_gmv_excluded: 57183.0,
    ambiguous_gmv_excluded: 228000.0
  };
}

export async function fetchSessions(label = '', groundTruth = '', limit = 50) {
  try {
    let url = `${API_BASE}/attribution/sessions?limit=${limit}`;
    if (label) url += `&label=${label}`;
    if (groundTruth) url += `&ground_truth=${groundTruth}`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {}
  return [
    {
      session_id: "sess-tre-held-gen-00042",
      split: "heldout",
      arm: "treatment",
      ground_truth_label: "AI_GENUINE",
      attribution_label: "Verified",
      total_score: 4,
      amount: 3499.0,
      sku: "merch-boot-01",
      product_name: "Apex Ridge Waterproof Trekking Boots",
      referrer: "https://chatgpt.com",
      query_id: "qry-footwear-01",
      query_text: "Best waterproof hiking boots under ₹5,000 for monsoon treks",
      converted: true,
      timestamp: new Date().toISOString()
    },
    {
      session_id: "sess-tre-held-spf-00142",
      split: "heldout",
      arm: "treatment",
      ground_truth_label: "AI_SPOOFED",
      attribution_label: "Rejected",
      total_score: -1,
      amount: 2500.0,
      sku: "merch-boot-01",
      product_name: "Apex Ridge Waterproof Trekking Boots",
      referrer: "https://chatgpt.com/search?q=fake",
      query_id: "invalid-query",
      query_text: "generic shoes",
      converted: true,
      timestamp: new Date().toISOString()
    }
  ];
}

export async function fetchProvenanceFunnel() {
  try {
    const res = await fetch(`${API_BASE}/attribution/funnel`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return {
    raw_sessions: 1958,
    ai_referrer_detected: 1420,
    valid_query_matched: 890,
    direct_signal_present: 540,
    spoof_signature_absent: 348,
    verified_conversions: 184
  };
}

export async function fetchAgentState() {
  try {
    const res = await fetch(`${API_BASE}/agent/state`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return {
    current_state: "DIAGNOSE",
    active_opportunity_id: "opp-01",
    active_diff_id: "diff-apex-01",
    last_thought: "Diagnosed major product evidence gap in Footwear (15% merchant vs 55% Competitor A).",
    next_action_recommendation: "Propose bounded FixDiff for Apex Ridge Boots."
  };
}

export async function fetchAgentEvents(limit = 40) {
  try {
    const res = await fetch(`${API_BASE}/agent/events?limit=${limit}`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return [
    {
      event_id: "evt-01",
      timestamp: new Date().toISOString(),
      agent_state: "OBSERVE",
      actor: "catalyst_agent",
      tool_name: "get_query_results",
      reason: "Observed 15% AI shopping recommendation share vs 55% Competitor A in Footwear."
    },
    {
      event_id: "evt-02",
      timestamp: new Date().toISOString(),
      agent_state: "DIAGNOSE",
      actor: "catalyst_agent",
      tool_name: "diagnose_gap",
      reason: "Diagnosed missing IPX7 waterproofing specs, Vibram sole specs, and Schema.org JSON-LD."
    }
  ];
}

export async function runAutonomousCycle(goal = 'Analyze merchant catalog performance against AI shopping engines, identify the largest opportunity, and formulate a bounded fix.') {
  try {
    const res = await fetch(`${API_BASE}/agent/run_autonomous_cycle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal })
    });
    if (res.ok) return await res.json();
  } catch (e) {}
  return {
    status: "WAIT_FOR_APPROVAL",
    final_summary: "Gemini 3.5 Flash evaluated Footwear queries, diagnosed the 11 vs 5 attribute gap, and generated FixDiff #diff-apex-01. Paused at WAIT_FOR_APPROVAL.",
    steps: [
      { turn: 1, thought: "I will first inspect shopping engine win rates across categories to find the highest-impact deficit.", tool_called: "get_query_results", tool_args: { category: "Footwear" }, tool_output: { merchant_win_rate_pct: 12.7, competitor_win_rate_pct: 99.5 } },
      { turn: 2, thought: "Footwear win rate is only 15% vs 55% Competitor A. I will diagnose the exact evidence gap for Apex Ridge Boots.", tool_called: "diagnose_gap", tool_args: { product_id: "merch-boot-01", competitor_id: "comp-boot-a1" }, tool_output: { merchant_attributes: 5, competitor_attributes: 11, estimated_potential_gmv: 150000 } },
      { turn: 3, thought: "Competitor provides 11 attributes including IPX7 and Vibram sole. I will formulate a bounded FixDiff.", tool_called: "generate_fix_diff", tool_args: { product_id: "merch-boot-01", justification: "Adding IPX7 specs & Schema.org" }, tool_output: { diff_id: "diff-apex-01", status: "proposed", validation_status: "valid", next_gate: "WAIT_FOR_APPROVAL" } }
    ]
  };
}

export async function resetDemo() {
  try {
    const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { status: "reset_complete" };
}
