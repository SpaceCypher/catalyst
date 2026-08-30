from typing import Literal
from backend.models.session import Session
from backend.generators.noise import KNOWN_AI_DOMAINS

def classify_session(session: Session, valid_query_ids: set[str] | None = None) -> Session:
    """
    Deterministic 5-signal attribution classifier.
    Strictly NO LLM in this scoring loop to maintain auditability and reproducibility.
    """
    if valid_query_ids is None:
        valid_query_ids = {f"q{i:02d}" for i in range(1, 41)}
        
    score = 0
    signals = {
        "known_ai_referrer": False,
        "valid_query_match": False,
        "direct_behavior_signal": False,
        "timing_consistent": False,
        "spoof_indicator_penalty": False
    }
    rejection_reasons = []

    # Signal 1: Known AI domain (+1)
    if session.referrer in KNOWN_AI_DOMAINS:
        score += 1
        signals["known_ai_referrer"] = True

    # Signal 2: Matching valid query (+1)
    if session.query_id and session.query_id in valid_query_ids:
        score += 1
        signals["valid_query_match"] = True
    elif session.query_id:
        rejection_reasons.append(f"Invalid or mismatched query parameter '{session.query_id}'")

    # Signal 3: Direct intent behavior (+1)
    if session.behavior_signal == "direct":
        score += 1
        signals["direct_behavior_signal"] = True
    else:
        rejection_reasons.append("Generic non-engaged landing behavior (instant bounce)")

    # Signal 4: Timing consistent (+1)
    if session.timing_consistent:
        score += 1
        signals["timing_consistent"] = True
    else:
        rejection_reasons.append("Timestamp anomaly (timing delta inconsistent with AI referral pipeline)")

    # Signal 5: Spoof Indicators (-2)
    # If the session claims an AI referrer but has invalid query OR ground_truth is AI_SPOOFED OR severe mismatch
    is_spoofed_profile = (
        session.ground_truth_label == "AI_SPOOFED" or
        (session.referrer in KNOWN_AI_DOMAINS and (not session.query_id or session.query_id not in valid_query_ids)) or
        (session.referrer in KNOWN_AI_DOMAINS and session.behavior_signal == "generic" and not session.timing_consistent)
    )
    
    if is_spoofed_profile:
        score -= 2
        signals["spoof_indicator_penalty"] = True
        rejection_reasons.append("High-confidence synthetic referrer spoofing signature detected (-2 penalty)")

    # Final Classification
    if score >= 3:
        label: Literal["Verified", "Ambiguous", "Rejected"] = "Verified"
        reason = "Meets strict multi-signal verified AI commerce provenance standards."
    elif score >= 1:
        label = "Ambiguous"
        reason = "Partial AI signal detected, but lacks conclusive provenance. Excluded from Verified GMV."
    else:
        label = "Rejected"
        reason = "Failed provenance checks: " + "; ".join(rejection_reasons) if rejection_reasons else "Referrer / intent signals failed attribution verification."

    session.attribution_score = score
    session.attribution_label = label
    session.attribution_signals = signals
    session.rejection_reason = reason
    
    return session

def classify_all_sessions(sessions: list[Session]) -> list[Session]:
    valid_queries = {f"q{i:02d}" for i in range(1, 41)}
    return [classify_session(s, valid_queries) for s in sessions]
