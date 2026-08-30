import json
from datetime import datetime
from pathlib import Path
from typing import Literal, Optional
from backend.config import settings, BASE_DIR
from backend.models.experiment import ExperimentResult, ExperimentArmResult
from backend.models.session import Session
from backend.generators.session_generator import generate_sessions_for_arm
from backend.engines.attribution_classifier import classify_session

GEN_DIR = BASE_DIR / "data" / "generated"

def run_experiment_simulation(
    diff_id: Optional[str] = "diff-apex-01",
    seed: int = 42,
    traffic_volume: int = 2000
) -> tuple[ExperimentResult, list[Session], list[Session]]:
    """
    Executes controlled treatment vs control experiment simulation.
    Both arms use the exact same underlying traffic simulation process.
    Control uses Thin catalog state; Treatment uses Approved Rich catalog state.
    """
    thin_rate = 0.082
    rich_rate = 0.178
    
    # 1. Generate and classify Control arm
    control_raw = generate_sessions_for_arm("control", thin_rate, traffic_volume, seed + 501, "heldout")
    control_classified = [classify_session(s) for s in control_raw]
    
    # 2. Generate and classify Treatment arm
    treatment_raw = generate_sessions_for_arm("treatment", rich_rate, traffic_volume, seed + 502, "heldout")
    treatment_classified = [classify_session(s) for s in treatment_raw]

    # Compute arm metrics
    def summarize_arm(sessions: list[Session], arm: Literal["control", "treatment"], state: Literal["thin", "rich"]) -> ExperimentArmResult:
        ai_sessions = sum(1 for s in sessions if s.ground_truth_label == "AI_GENUINE")
        org_sessions = sum(1 for s in sessions if s.ground_truth_label == "ORGANIC")
        spf_sessions = sum(1 for s in sessions if s.ground_truth_label == "AI_SPOOFED")
        
        conversions = sum(1 for s in sessions if s.converted)
        c_rate = (conversions / len(sessions) * 100) if sessions else 0.0
        
        # ONLY count sessions with attribution_label == "Verified"
        verified_gmv = sum(s.order_value or 0.0 for s in sessions if s.converted and s.attribution_label == "Verified")
        ambiguous_gmv = sum(s.order_value or 0.0 for s in sessions if s.converted and s.attribution_label == "Ambiguous")
        rejected_gmv = sum(s.order_value or 0.0 for s in sessions if s.converted and s.attribution_label == "Rejected")
        total_gmv = sum(s.order_value or 0.0 for s in sessions if s.converted)
        
        visibility_pct = (thin_rate if arm == "control" else rich_rate) * 100

        return ExperimentArmResult(
            arm=arm,
            catalog_state=state,
            total_sessions=len(sessions),
            ai_recommendation_share_pct=round(visibility_pct, 1),
            ai_sessions=ai_sessions,
            organic_sessions=org_sessions,
            spoofed_sessions=spf_sessions,
            conversions=conversions,
            conversion_rate_pct=round(c_rate, 2),
            verified_gmv=round(verified_gmv, 2),
            ambiguous_gmv=round(ambiguous_gmv, 2),
            rejected_gmv=round(rejected_gmv, 2),
            total_gmv=round(total_gmv, 2)
        )

    ctrl_summary = summarize_arm(control_classified, "control", "thin")
    treat_summary = summarize_arm(treatment_classified, "treatment", "rich")

    inc_gmv = treat_summary.verified_gmv - ctrl_summary.verified_gmv
    inc_pct = (inc_gmv / ctrl_summary.verified_gmv * 100) if ctrl_summary.verified_gmv > 0 else 0.0
    inc_conv = treat_summary.conversions - ctrl_summary.conversions
    vis_gain = treat_summary.ai_recommendation_share_pct - ctrl_summary.ai_recommendation_share_pct

    exp_result = ExperimentResult(
        experiment_id=f"exp-cat-{seed}-{int(datetime.utcnow().timestamp())}",
        diff_id=diff_id,
        timestamp=datetime.utcnow(),
        random_seed=seed,
        catalog_version=settings.CATALOG_VERSION,
        simulation_version=settings.SIMULATION_VERSION,
        control=ctrl_summary,
        treatment=treat_summary,
        incremental_gmv=round(inc_gmv, 2),
        incremental_gmv_pct=round(inc_pct, 1),
        incremental_conversions=inc_conv,
        visibility_gain_pts=round(vis_gain, 1),
        label="Controlled simulation result"
    )

    # Persist JSON files
    GEN_DIR.mkdir(parents=True, exist_ok=True)
    with open(GEN_DIR / "control_arm_results.json", "w", encoding="utf-8") as f:
        json.dump(ctrl_summary.model_dump(), f, indent=2)
    with open(GEN_DIR / "treatment_arm_results.json", "w", encoding="utf-8") as f:
        json.dump(treat_summary.model_dump(), f, indent=2)

    return exp_result, control_classified, treatment_classified
