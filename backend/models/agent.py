from typing import Literal, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field

class AgentEvent(BaseModel):
    event_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    run_id: str
    agent_state: str
    tool_name: Optional[str] = None
    tool_input_summary: Optional[str] = None
    tool_output_summary: Optional[str] = None
    reason: str
    status: str = "completed"
    actor: Literal["catalyst_agent", "merchant", "system"]

class AgentStateResponse(BaseModel):
    current_state: Literal[
        "OBSERVE",
        "DIAGNOSE",
        "PROPOSE",
        "WAIT_FOR_APPROVAL",
        "APPLY",
        "EXPERIMENT",
        "VERIFY",
        "REPORT",
        "REASSESS"
    ]
    active_opportunity_id: Optional[str] = None
    active_diff_id: Optional[str] = None
    active_experiment_id: Optional[str] = None
    last_thought: str = ""
    next_action_recommendation: str = ""
    is_autonomous_running: bool = False
