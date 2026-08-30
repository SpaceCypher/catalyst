import pytest
from datetime import datetime
from backend.models.session import Session
from backend.engines.attribution_classifier import classify_session

def test_attribution_classifier_known_signals():
    # 1. Genuine AI Session (AI domain, valid query, direct behavior, timing ok) -> Verified
    s_genuine = Session(
        session_id="s1",
        query_id="q01",
        referrer="chatgpt.com",
        landing_product_id="merch-boot-01",
        timestamp=datetime.utcnow(),
        behavior_signal="direct",
        timing_consistent=True,
        ground_truth_label="AI_GENUINE",
        split="tuning",
        arm="treatment",
        converted=True,
        order_value=4499.0
    )
    res_gen = classify_session(s_genuine)
    assert res_gen.attribution_score >= 3
    assert res_gen.attribution_label == "Verified"
    assert res_gen.attribution_signals["known_ai_referrer"] is True
    assert res_gen.attribution_signals["valid_query_match"] is True

    # 2. Organic Session (google.com, no query, generic) -> Ambiguous or Rejected (Excluded)
    s_organic = Session(
        session_id="s2",
        query_id=None,
        referrer="google.com",
        landing_product_id="merch-boot-01",
        timestamp=datetime.utcnow(),
        behavior_signal="generic",
        timing_consistent=True,
        ground_truth_label="ORGANIC",
        split="tuning",
        arm="control",
        converted=True,
        order_value=4499.0
    )
    res_org = classify_session(s_organic)
    assert res_org.attribution_label in ("Ambiguous", "Rejected")
    assert res_org.attribution_label != "Verified"

    # 3. Spoofed Session (chatgpt.com, invalid query, generic bounce) -> Rejected (-2 penalty)
    s_spoofed = Session(
        session_id="s3",
        query_id="invalid-q99",
        referrer="chatgpt.com",
        landing_product_id="merch-boot-01",
        timestamp=datetime.utcnow(),
        behavior_signal="generic",
        timing_consistent=False,
        ground_truth_label="AI_SPOOFED",
        split="tuning",
        arm="treatment",
        converted=True,
        order_value=2500.0
    )
    res_spf = classify_session(s_spoofed)
    assert res_spf.attribution_score <= 0
    assert res_spf.attribution_label == "Rejected"
    assert res_spf.attribution_signals["spoof_indicator_penalty"] is True
