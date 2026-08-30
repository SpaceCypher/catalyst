import json
from pathlib import Path
from backend.config import BASE_DIR
from backend.models.session import Session
from backend.models.attribution import AttributionEvaluationResult
from backend.engines.attribution_classifier import classify_session

GEN_DIR = BASE_DIR / "data" / "generated"

def evaluate_heldout(heldout_sessions: list[Session]) -> AttributionEvaluationResult:
    """
    Evaluates the attribution classifier strictly on the held-out split.
    Enforces runtime guard preventing tuning data leakage.
    """
    if not heldout_sessions:
        raise ValueError("Held-out sessions list cannot be empty for evaluation.")
        
    for s in heldout_sessions:
        if s.split != "heldout":
            raise ValueError(f"Leakage violation! Session {s.session_id} has split '{s.split}'. Evaluation must be strictly heldout.")

    # Classify all heldout sessions
    classified = [classify_session(s) for s in heldout_sessions]

    y_true_genuine = [s.ground_truth_label == "AI_GENUINE" for s in classified]
    y_pred_verified = [s.attribution_label == "Verified" for s in classified]

    true_positives = sum(1 for yt, yp in zip(y_true_genuine, y_pred_verified) if yt and yp)
    false_positives = sum(1 for yt, yp in zip(y_true_genuine, y_pred_verified) if not yt and yp)
    false_negatives = sum(1 for yt, yp in zip(y_true_genuine, y_pred_verified) if yt and not yp)
    
    precision = true_positives / (true_positives + false_positives) if (true_positives + false_positives) > 0 else 0.0
    recall = true_positives / (true_positives + false_negatives) if (true_positives + false_negatives) > 0 else 0.0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0

    # GMV metrics
    fp_gmv = sum(s.order_value or 0.0 for s in classified if s.converted and not (s.ground_truth_label == "AI_GENUINE") and s.attribution_label == "Verified")

    spoofed_sessions = [s for s in classified if s.ground_truth_label == "AI_SPOOFED"]
    spoofed_rejected = sum(1 for s in spoofed_sessions if s.attribution_label == "Rejected")
    spoofed_gmv_excluded = sum(s.order_value or 0.0 for s in spoofed_sessions if s.converted and s.attribution_label in ("Rejected", "Ambiguous"))

    ambiguous_sessions = [s for s in classified if s.attribution_label == "Ambiguous"]
    ambiguous_gmv_excluded = sum(s.order_value or 0.0 for s in ambiguous_sessions if s.converted)

    gt_counts = {
        "AI_GENUINE": sum(1 for s in classified if s.ground_truth_label == "AI_GENUINE"),
        "ORGANIC": sum(1 for s in classified if s.ground_truth_label == "ORGANIC"),
        "AI_SPOOFED": len(spoofed_sessions)
    }

    pred_counts = {
        "Verified": sum(1 for s in classified if s.attribution_label == "Verified"),
        "Ambiguous": len(ambiguous_sessions),
        "Rejected": sum(1 for s in classified if s.attribution_label == "Rejected")
    }

    eval_result = AttributionEvaluationResult(
        split="heldout",
        total_evaluated_sessions=len(classified),
        ground_truth_counts=gt_counts,
        predicted_label_counts=pred_counts,
        precision=round(precision, 4),
        recall=round(recall, 4),
        f1_score=round(f1, 4),
        false_positive_count=false_positives,
        false_positive_gmv=round(fp_gmv, 2),
        spoofed_total_count=len(spoofed_sessions),
        spoofed_correctly_rejected=spoofed_rejected,
        spoofed_gmv_excluded=round(spoofed_gmv_excluded, 2),
        ambiguous_count=len(ambiguous_sessions),
        ambiguous_gmv_excluded=round(ambiguous_gmv_excluded, 2),
        rules_version="v2.1"
    )

    # Save artifact to data/generated/attribution_evaluation.json
    GEN_DIR.mkdir(parents=True, exist_ok=True)
    with open(GEN_DIR / "attribution_evaluation.json", "w", encoding="utf-8") as f:
        json.dump(eval_result.model_dump(), f, indent=2)

    return eval_result
