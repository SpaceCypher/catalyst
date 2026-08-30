from typing import Literal, Optional
from pydantic import BaseModel, Field

class Query(BaseModel):
    query_id: str
    query_text: str
    category: str

class QueryResult(BaseModel):
    query_id: str
    query_text: str = ""
    category: str = ""
    catalog_state: Literal["thin", "rich"]
    trial_number: int
    merchant_mentioned: bool
    competitor_mentioned: bool
    recommended_product_id: Optional[str] = None
    raw_llm_response: str
    extracted_reason: Optional[str] = None

class QueryTrialAggregate(BaseModel):
    query_id: str
    query_text: str
    category: str
    total_trials: int
    merchant_win_count: int
    merchant_win_rate: float
    competitor_win_count: int
    competitor_win_rate: float
    top_extracted_reasons: list[str] = Field(default_factory=list)

class DiagnosisOpportunity(BaseModel):
    id: str
    rank: int
    title: str
    gap_type: Literal["attribute_gap", "faq_gap", "review_gap", "schema_gap"]
    impact_level: Literal["High", "Medium", "Low"]
    affected_queries_count: int
    description: str
    merchant_evidence: dict
    competitor_evidence: dict
    estimated_potential_gmv_gain: float
    status: Literal["open", "in_progress", "fixed"] = "open"

class DiagnosisReport(BaseModel):
    run_id: str
    timestamp: str
    total_queries: int
    merchant_visibility_thin_pct: float
    merchant_visibility_rich_pct: float
    competitor_visibility_pct: float
    top_opportunities: list[DiagnosisOpportunity]
    summary_reasoning: str
