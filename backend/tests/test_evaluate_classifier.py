import pytest
from datetime import datetime
from backend.models.session import Session
from backend.evaluation.evaluate_classifier import evaluate_heldout

def test_evaluate_heldout_leakage_guard():
    # If session has split="tuning", it MUST raise ValueError
    leaked_sessions = [
        Session(
            session_id="s_tune",
            query_id="q01",
            referrer="chatgpt.com",
            landing_product_id="merch-boot-01",
            timestamp=datetime.utcnow(),
            behavior_signal="direct",
            timing_consistent=True,
            ground_truth_label="AI_GENUINE",
            split="tuning",
            arm="treatment"
        )
    ]
    with pytest.raises(ValueError, match="Leakage violation"):
        evaluate_heldout(leaked_sessions)

def test_evaluate_heldout_metrics_computation():
    heldout_sessions = [
        Session(
            session_id=f"s_h_{i}",
            query_id="q01",
            referrer="chatgpt.com",
            landing_product_id="merch-boot-01",
            timestamp=datetime.utcnow(),
            behavior_signal="direct",
            timing_consistent=True,
            ground_truth_label="AI_GENUINE",
            split="heldout",
            arm="treatment",
            converted=True,
            order_value=4499.0
        ) for i in range(10)
    ]
    res = evaluate_heldout(heldout_sessions)
    assert res.precision == 1.0
    assert res.recall == 1.0
    assert res.split == "heldout"
