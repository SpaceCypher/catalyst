-- Catalyst SQLite Schema

CREATE TABLE IF NOT EXISTS products (
    product_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    attributes TEXT NOT NULL, -- JSON array
    review_count INTEGER NOT NULL,
    review_detail_score REAL NOT NULL,
    faq_count INTEGER NOT NULL,
    has_structured_schema INTEGER NOT NULL,
    catalog_state TEXT NOT NULL -- 'thin', 'rich', 'competitor'
);

CREATE TABLE IF NOT EXISTS queries (
    query_id TEXT PRIMARY KEY,
    query_text TEXT NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS query_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query_id TEXT NOT NULL,
    query_text TEXT NOT NULL,
    category TEXT NOT NULL,
    catalog_state TEXT NOT NULL, -- 'thin', 'rich'
    trial_number INTEGER NOT NULL,
    merchant_mentioned INTEGER NOT NULL,
    competitor_mentioned INTEGER NOT NULL,
    recommended_product_id TEXT,
    raw_llm_response TEXT NOT NULL,
    extracted_reason TEXT,
    FOREIGN KEY(query_id) REFERENCES queries(query_id)
);

CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    query_id TEXT,
    query_text TEXT,
    referrer TEXT NOT NULL,
    landing_product_id TEXT NOT NULL,
    landing_product_name TEXT,
    timestamp TEXT NOT NULL,
    behavior_signal TEXT NOT NULL,
    timing_consistent INTEGER NOT NULL,
    ground_truth_label TEXT NOT NULL, -- 'AI_GENUINE', 'ORGANIC', 'AI_SPOOFED'
    split TEXT NOT NULL, -- 'tuning', 'heldout'
    arm TEXT NOT NULL, -- 'control', 'treatment'
    converted INTEGER NOT NULL,
    order_value REAL,
    attribution_score INTEGER,
    attribution_label TEXT, -- 'Verified', 'Ambiguous', 'Rejected'
    attribution_signals TEXT, -- JSON
    rejection_reason TEXT
);

CREATE TABLE IF NOT EXISTS fix_diffs (
    diff_id TEXT PRIMARY KEY,
    opportunity_id TEXT,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    fields TEXT NOT NULL, -- JSON array of DiffField
    evidence TEXT NOT NULL, -- JSON array of FixEvidence
    reason TEXT NOT NULL,
    validation_status TEXT NOT NULL,
    validation_error TEXT,
    status TEXT NOT NULL, -- 'proposed', 'approved', 'rejected', 'applied'
    created_at TEXT NOT NULL,
    approved_at TEXT,
    applied_at TEXT
);

CREATE TABLE IF NOT EXISTS experiments (
    experiment_id TEXT PRIMARY KEY,
    diff_id TEXT,
    timestamp TEXT NOT NULL,
    random_seed INTEGER NOT NULL,
    catalog_version TEXT NOT NULL,
    simulation_version TEXT NOT NULL,
    control_json TEXT NOT NULL,
    treatment_json TEXT NOT NULL,
    incremental_gmv REAL NOT NULL,
    incremental_gmv_pct REAL NOT NULL,
    incremental_conversions INTEGER NOT NULL,
    visibility_gain_pts REAL NOT NULL,
    label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agent_events (
    event_id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    run_id TEXT NOT NULL,
    agent_state TEXT NOT NULL,
    tool_name TEXT,
    tool_input_summary TEXT,
    tool_output_summary TEXT,
    reason TEXT NOT NULL,
    status TEXT NOT NULL,
    actor TEXT NOT NULL -- 'catalyst_agent', 'merchant', 'system'
);

CREATE TABLE IF NOT EXISTS agent_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    current_state TEXT NOT NULL,
    active_opportunity_id TEXT,
    active_diff_id TEXT,
    active_experiment_id TEXT,
    last_thought TEXT,
    next_action_recommendation TEXT,
    updated_at TEXT NOT NULL
);
