from typing import Literal, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class Session(BaseModel):
    session_id: str
    query_id: Optional[str] = None
    query_text: Optional[str] = None
    referrer: str
    landing_product_id: str
    landing_product_name: Optional[str] = None
    timestamp: datetime
    behavior_signal: Literal["direct", "generic"]
    timing_consistent: bool
    ground_truth_label: Literal["AI_GENUINE", "ORGANIC", "AI_SPOOFED"]
    split: Literal["tuning", "heldout"]
    arm: Literal["control", "treatment"]
    converted: bool = False
    order_value: Optional[float] = None
    
    # Populated deterministically by Attribution Classifier
    attribution_score: Optional[int] = None
    attribution_label: Optional[Literal["Verified", "Ambiguous", "Rejected"]] = None
    attribution_signals: Optional[dict] = None
    rejection_reason: Optional[str] = None
