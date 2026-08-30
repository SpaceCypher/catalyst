import json
import sqlite3
import os
import sys
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.config import settings
from backend.db.database import init_db, get_connection
from backend.generators.catalog_generator import load_catalog, load_query_panel
from backend.generators.query_ground_truth import run_shopping_trials
from backend.generators.session_generator import generate_all_datasets
from backend.engines.diagnosis_engine import analyze_gaps
from backend.engines.fix_agent import generate_fix_diff
from backend.engines.experiment_engine import run_experiment_simulation
from backend.evaluation.evaluate_classifier import evaluate_heldout
from backend.agent.catalyst_agent import agent

def seed_database():
    print("🌱 Initializing Catalyst Database...")
    init_db()
    
    # 1. Seed Products
    print("📦 Loading Seed Catalogs (Thin, Rich, Competitor)...")
    with get_connection() as conn:
        for state in ["thin", "rich", "competitor"]:
            catalog = load_catalog(state)
            for p in catalog:
                conn.execute("""
                    INSERT OR REPLACE INTO products (
                        product_id, name, category, price, attributes,
                        review_count, review_detail_score, faq_count,
                        has_structured_schema, catalog_state
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    p.product_id, p.name, p.category, p.price,
                    json.dumps(p.attributes), p.review_count,
                    p.review_detail_score, p.faq_count,
                    1 if p.has_structured_schema else 0, p.catalog_state
                ))
        conn.commit()

    # 2. Seed Queries
    print("🔍 Loading 40-Query High-Intent Panel...")
    with get_connection() as conn:
        queries = load_query_panel()
        for q in queries:
            conn.execute("""
                INSERT OR REPLACE INTO queries (query_id, query_text, category)
                VALUES (?, ?, ?)
            """, (q["query_id"], q["query_text"], q["category"]))
        conn.commit()

    # 3. Seed Shopping Assistant Trials
    print("🤖 Running Shopping Engine Trials & Diagnosis...")
    query_results = run_shopping_trials(force_refresh=False)
    with get_connection() as conn:
        conn.execute("DELETE FROM query_results")
        for qr in query_results:
            conn.execute("""
                INSERT INTO query_results (
                    query_id, query_text, category, catalog_state, trial_number,
                    merchant_mentioned, competitor_mentioned, recommended_product_id,
                    raw_llm_response, extracted_reason
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                qr.query_id, qr.query_text, qr.category, qr.catalog_state,
                qr.trial_number, 1 if qr.merchant_mentioned else 0,
                1 if qr.competitor_mentioned else 0, qr.recommended_product_id,
                qr.raw_llm_response, qr.extracted_reason
            ))
        conn.commit()

    # 4. Generate Datasets & Heldout Evaluation
    print("📊 Generating Causal Synthetic Sessions (Tuning & Heldout)...")
    datasets = generate_all_datasets(seed=settings.RANDOM_SEED)
    
    print("🎯 Running Held-Out Attribution Evaluation Harness...")
    eval_result = evaluate_heldout(datasets["heldout_sessions"])
    print(f"   Precision: {eval_result.precision*100:.1f}%, Recall: {eval_result.recall*100:.1f}%")
    print(f"   Spoofed GMV Excluded: ₹{eval_result.spoofed_gmv_excluded:,.2f}")

    # 5. Seed FixDiff
    print("⚡ Generating Bounded FixDiff with Evidence Provenance...")
    diff = generate_fix_diff("opp-01", "merch-boot-01")
    with get_connection() as conn:
        conn.execute("""
            INSERT OR REPLACE INTO fix_diffs (
                diff_id, opportunity_id, product_id, product_name, fields, evidence,
                reason, validation_status, validation_error, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            diff.diff_id, diff.opportunity_id, diff.product_id, diff.product_name,
            json.dumps([f.model_dump() for f in diff.fields]),
            json.dumps([e.model_dump() for e in diff.evidence]),
            diff.reason, diff.validation_status, diff.validation_error,
            diff.status, diff.created_at.isoformat()
        ))
        conn.commit()

    # 6. Seed Baseline Controlled Experiment
    print("🔬 Running Baseline Treatment vs Control Experiment...")
    exp_result, ctrl_s, treat_s = run_experiment_simulation("diff-apex-01", seed=settings.RANDOM_SEED)
    with get_connection() as conn:
        conn.execute("""
            INSERT OR REPLACE INTO experiments (
                experiment_id, diff_id, timestamp, random_seed, catalog_version,
                simulation_version, control_json, treatment_json, incremental_gmv,
                incremental_gmv_pct, incremental_conversions, visibility_gain_pts, label
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            exp_result.experiment_id, exp_result.diff_id, exp_result.timestamp.isoformat(),
            exp_result.random_seed, exp_result.catalog_version, exp_result.simulation_version,
            json.dumps(exp_result.control.model_dump()),
            json.dumps(exp_result.treatment.model_dump()),
            exp_result.incremental_gmv, exp_result.incremental_gmv_pct,
            exp_result.incremental_conversions, exp_result.visibility_gain_pts,
            exp_result.label
        ))

        # Populate sessions table with classified experimental sessions
        for s in (ctrl_s + treat_s):
            conn.execute("""
                INSERT OR REPLACE INTO sessions (
                    session_id, query_id, query_text, referrer, landing_product_id,
                    landing_product_name, timestamp, behavior_signal, timing_consistent,
                    ground_truth_label, split, arm, converted, order_value,
                    attribution_score, attribution_label, attribution_signals, rejection_reason
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                s.session_id, s.query_id, s.query_text, s.referrer, s.landing_product_id,
                s.landing_product_name, s.timestamp.isoformat(), s.behavior_signal,
                1 if s.timing_consistent else 0, s.ground_truth_label, s.split, s.arm,
                1 if s.converted else 0, s.order_value, s.attribution_score,
                s.attribution_label, json.dumps(s.attribution_signals) if s.attribution_signals else None,
                s.rejection_reason
            ))
        conn.commit()

    # 7. Agent Audit Events
    agent.log_event(
        agent_state="OBSERVE",
        reason="Catalyst observed thin merchant catalog underperforming in 11/20 boot queries vs Competitor A.",
        actor="catalyst_agent"
    )
    agent.log_event(
        agent_state="DIAGNOSE",
        reason="Diagnosed missing machine-readable attributes (IPX7, 420g, Vibram grip) and lack of Schema.org JSON-LD.",
        actor="catalyst_agent"
    )
    agent.log_event(
        agent_state="PROPOSE",
        reason="Generated proposed FixDiff #diff-apex-01 with 6 technical attributes and 3 pre-purchase FAQs.",
        actor="catalyst_agent"
    )

    print("✅ Seeding complete! Database is populated and ready for demo.")

if __name__ == "__main__":
    seed_database()
