from typing import Literal, Optional
from pydantic import BaseModel, Field

class AttributionEvaluationResult(BaseModel):
    split: Literal["heldout"] = "heldout"
    total_evaluated_sessions: int
    ground_truth_counts: dict
    predicted_label_counts: dict
    precision: float
    recall: float
    f1_score: float
    false_positive_count: int
    false_positive_gmv: float
    spoofed_total_count: int
    spoofed_correctly_rejected: int
    spoofed_gmv_excluded: float
    ambiguous_count: int
    ambiguous_gmv_excluded: float
    rules_version: str = "v2.1"
    note: str = "Strictly computed on held-out test split only"

class AttributionFunnelStage(BaseModel):
    stage: str
    count: int
    percentage: float
    status: Literal["verified", "in_review", "rejected"]
    description: str

class ProvenanceFunnel(BaseModel):
    ai_surfaces: int
    queries: int
    ai_recommendations: int
    referral_sessions: int
    checkouts_initiated: int
    verified_razorpay_payments: int
    excluded_spoofed_or_ambiguous: int
