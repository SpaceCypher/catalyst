import json
import sqlite3
import urllib.request
from datetime import datetime
from typing import Literal, Optional, Any
from backend.config import settings
from backend.db.database import get_connection
from backend.models.agent import AgentEvent, AgentStateResponse
from backend.models.diff import FixDiff
from backend.generators.catalog_generator import load_catalog, get_product_by_id
from backend.engines.diagnosis_engine import analyze_gaps
from backend.engines.fix_agent import generate_fix_diff
from backend.engines.experiment_engine import run_experiment_simulation
from backend.evaluation.evaluate_classifier import evaluate_heldout
from backend.generators.session_generator import generate_sessions_for_arm

class CatalystAgent:
    """
    Catalyst AI Commerce Revenue Agent.
    Operates as a bounded planner orchestrating typed tools with auditable events.
    """
    VALID_TRANSITIONS = {
        "OBSERVE": ["DIAGNOSE"],
        "DIAGNOSE": ["PROPOSE"],
        "PROPOSE": ["WAIT_FOR_APPROVAL"],
        "WAIT_FOR_APPROVAL": ["APPLY", "REASSESS"],
        "APPLY": ["EXPERIMENT"],
        "EXPERIMENT": ["VERIFY"],
        "VERIFY": ["REPORT"],
        "REPORT": ["REASSESS"],
        "REASSESS": ["OBSERVE", "DIAGNOSE"]
    }

    def __init__(self):
        pass

    def log_event(
        self,
        agent_state: str,
        reason: str,
        actor: Literal["catalyst_agent", "merchant", "system"] = "catalyst_agent",
        tool_name: Optional[str] = None,
        tool_input: Optional[dict] = None,
        tool_output: Optional[dict] = None,
        status: str = "completed"
    ) -> AgentEvent:
        import uuid
        event_id = f"evt-{int(datetime.utcnow().timestamp() * 1000)}-{uuid.uuid4().hex[:6]}"
        event = AgentEvent(
            event_id=event_id,
            timestamp=datetime.utcnow(),
            run_id="run-cat-01",
            agent_state=agent_state,
            tool_name=tool_name,
            tool_input_summary=json.dumps(tool_input) if tool_input else None,
            tool_output_summary=json.dumps(tool_output) if tool_output else None,
            reason=reason,
            status=status,
            actor=actor
        )
        with get_connection() as conn:
            conn.execute("""
                INSERT INTO agent_events (
                    event_id, timestamp, run_id, agent_state, tool_name,
                    tool_input_summary, tool_output_summary, reason, status, actor
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                event.event_id, event.timestamp.isoformat(), event.run_id,
                event.agent_state, event.tool_name, event.tool_input_summary,
                event.tool_output_summary, event.reason, event.status, event.actor
            ))
            conn.commit()
        return event

    def get_state(self) -> AgentStateResponse:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM agent_state WHERE id = 1")
            row = cursor.fetchone()
            if not row:
                return AgentStateResponse(
                    current_state="OBSERVE",
                    last_thought="Observing merchant catalog vs AI shopping recommendations.",
                    next_action_recommendation="Run diagnosis to surface competitor evidence gaps."
                )
            return AgentStateResponse(
                current_state=row["current_state"],
                active_opportunity_id=row["active_opportunity_id"],
                active_diff_id=row["active_diff_id"],
                active_experiment_id=row["active_experiment_id"],
                last_thought=row["last_thought"] or "",
                next_action_recommendation=row["next_action_recommendation"] or "",
                is_autonomous_running=False
            )

    def transition_to(
        self,
        new_state: str,
        thought: str,
        recommendation: str,
        actor: Literal["catalyst_agent", "merchant", "system"] = "catalyst_agent",
        diff_id: Optional[str] = None,
        exp_id: Optional[str] = None
    ):
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE agent_state SET
                    current_state = ?,
                    active_diff_id = COALESCE(?, active_diff_id),
                    active_experiment_id = COALESCE(?, active_experiment_id),
                    last_thought = ?,
                    next_action_recommendation = ?,
                    updated_at = datetime('now')
                WHERE id = 1
            """, (new_state, diff_id, exp_id, thought, recommendation))
            conn.commit()

        self.log_event(
            agent_state=new_state,
            reason=thought,
            actor=actor
        )

    # ---------------- Agent Tools ---------------- #

    def tool_inspect_catalog(self, catalog_state: Literal["thin", "rich", "competitor"]) -> list[dict]:
        products = load_catalog(catalog_state)
        res = [p.model_dump() for p in products]
        self.log_event(
            agent_state="OBSERVE",
            reason=f"Inspected {catalog_state} catalog ({len(products)} products)",
            tool_name="inspect_catalog",
            tool_input={"catalog_state": catalog_state},
            tool_output={"count": len(products)}
        )
        return res

    def tool_diagnose_gap(self) -> dict:
        report = analyze_gaps()
        self.transition_to(
            new_state="DIAGNOSE",
            thought=f"Diagnosed major product evidence gap in Footwear (3% merchant vs 55% Competitor A). Highest impact opportunity is #{report.top_opportunities[0].id}.",
            recommendation="Propose bounded FixDiff for Apex Ridge Waterproof Trekking Boots."
        )
        return report.model_dump()

    def tool_generate_fix_diff(self, opportunity_id: str = "opp-01", product_id: str = "merch-boot-01") -> dict:
        diff = generate_fix_diff(opportunity_id=opportunity_id, product_id=product_id)
        
        # Save to database
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

        self.transition_to(
            new_state="WAIT_FOR_APPROVAL",
            thought="Generated schema-valid FixDiff with 6 technical attributes, Schema.org JSON-LD, and 3 product FAQs. Awaiting merchant approval.",
            recommendation="Merchant review required: Approve & Deploy diff to launch controlled experiment.",
            diff_id=diff.diff_id
        )
        return diff.model_dump()

    def tool_approve_fix(self, diff_id: str) -> dict:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM fix_diffs WHERE diff_id = ?", (diff_id,))
            row = cursor.fetchone()
            if not row:
                raise ValueError(f"Diff '{diff_id}' not found.")
            if row["status"] == "applied":
                return {"diff_id": diff_id, "status": "applied", "message": "Diff is already applied."}
            if row["validation_status"] != "valid":
                raise ValueError(f"Cannot approve invalid diff: {row['validation_error']}")

            now_str = datetime.utcnow().isoformat()
            conn.execute("""
                UPDATE fix_diffs SET
                    status = 'approved',
                    approved_at = ?
                WHERE diff_id = ?
            """, (now_str, diff_id))
            conn.commit()

        self.transition_to(
            new_state="APPLY",
            thought="Merchant approved FixDiff #1. Applied treatment catalog specifications to active testing arm.",
            recommendation="Launch treatment vs control experiment to measure incremental AI GMV.",
            actor="merchant",
            diff_id=diff_id
        )
        return {"diff_id": diff_id, "status": "approved", "approved_at": now_str}

    def tool_apply_fix(self, diff_id: str) -> dict:
        """Publishes the approved patch. STRICT GATE: Rejects if status is not approved."""
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT status FROM fix_diffs WHERE diff_id = ?", (diff_id,))
            row = cursor.fetchone()
            if not row:
                raise ValueError(f"FixDiff {diff_id} not found.")
            if row["status"] != "approved" and row["status"] != "applied":
                raise ValueError(f"SECURITY GATE VIOLATION: FixDiff {diff_id} cannot be applied because its status is '{row['status']}'. Mandatory merchant approval required.")
            
            conn.execute("UPDATE fix_diffs SET status = 'applied' WHERE diff_id = ?", (diff_id,))
            conn.commit()
        return {"diff_id": diff_id, "status": "applied"}

    def tool_reject_fix(self, diff_id: str, reason: str = "Rejected by merchant") -> dict:
        with get_connection() as conn:
            conn.execute("""
                UPDATE fix_diffs SET status = 'rejected' WHERE diff_id = ?
            """, (diff_id,))
            conn.commit()

        self.transition_to(
            new_state="REASSESS",
            thought=f"Merchant rejected FixDiff '{diff_id}': {reason}. Reassessing alternative opportunity gaps.",
            recommendation="Inspect next ranked opportunity from diagnosis panel.",
            actor="merchant",
            diff_id=diff_id
        )
        return {"diff_id": diff_id, "status": "rejected"}

    def tool_run_experiment(self, diff_id: str = "diff-apex-01") -> dict:
        exp_result, ctrl_sessions, treat_sessions = run_experiment_simulation(diff_id=diff_id, seed=settings.RANDOM_SEED)

        # Store in DB
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
            
            # Store sessions into sessions table
            for s in (ctrl_sessions + treat_sessions):
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

        self.transition_to(
            new_state="VERIFY",
            thought=f"Controlled simulation completed. Measured +₹{exp_result.incremental_gmv:,.2f} Verified Incremental AI GMV (+{exp_result.incremental_gmv_pct}% lift).",
            recommendation="Review attribution integrity metrics and inspect rejected spoof sessions.",
            exp_id=exp_result.experiment_id
        )
        return exp_result.model_dump()

agent = CatalystAgent()
