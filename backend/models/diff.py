from typing import Literal, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field

class DiffField(BaseModel):
    category: Literal["structured_data", "faq", "attributes", "product_copy"]
    field: str
    old_value: Optional[Any] = None
    new_value: Any
    evidence_source: str = ""

class FixEvidence(BaseModel):
    source: str
    query_id: Optional[str] = None
    observation: str

class FixDiff(BaseModel):
    diff_id: str
    opportunity_id: Optional[str] = None
    product_id: str
    product_name: str = ""
    fields: list[DiffField]
    evidence: list[FixEvidence] = Field(default_factory=list)
    reason: str  # LLM-generated explanation
    validation_status: Literal["valid", "rejected_unsupported_facts"] = "valid"
    validation_error: Optional[str] = None
    status: Literal["proposed", "approved", "rejected", "applied"] = "proposed"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved_at: Optional[datetime] = None
    applied_at: Optional[datetime] = None
