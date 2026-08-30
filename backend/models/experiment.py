from typing import Literal, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class ExperimentArmResult(BaseModel):
    arm: Literal["control", "treatment"]
    catalog_state: Literal["thin", "rich"]
    total_sessions: int
    ai_recommendation_share_pct: float
    ai_sessions: int
    organic_sessions: int
    spoofed_sessions: int
    conversions: int
    conversion_rate_pct: float
    verified_gmv: float
    ambiguous_gmv: float
    rejected_gmv: float
    total_gmv: float

class ExperimentResult(BaseModel):
    experiment_id: str
    diff_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    random_seed: int = 42
    catalog_version: str = "v1.2"
    simulation_version: str = "v1.0"
    control: ExperimentArmResult
    treatment: ExperimentArmResult
    incremental_gmv: float  # treatment.verified_gmv - control.verified_gmv
    incremental_gmv_pct: float
    incremental_conversions: int
    visibility_gain_pts: float
    label: str = "Controlled simulation result"
