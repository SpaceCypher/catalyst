from fastapi import APIRouter, HTTPException, Body
import json
from pydantic import BaseModel
from backend.models.agent import AgentStateResponse, AgentEvent
from backend.agent.catalyst_agent import agent
from backend.agent.gemini_agent_loop import run_gemini_autonomous_agent
from backend.db.database import get_connection

router = APIRouter(prefix="/api/agent", tags=["Agent & Audit Trail"])

class AgentPromptRequest(BaseModel):
    goal: str = "Analyze merchant catalog performance against AI shopping engines, identify the largest opportunity, and formulate a bounded fix."

@router.get("/state", response_model=AgentStateResponse)
def get_agent_state():
    return agent.get_state()

@router.get("/events", response_model=list[AgentEvent])
def get_agent_events(limit: int = 50):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM agent_events ORDER BY timestamp DESC LIMIT ?", (limit,))
        rows = cursor.fetchall()
        events = []
        for r in rows:
            events.append(AgentEvent(
                event_id=r["event_id"],
                timestamp=r["timestamp"],
                run_id=r["run_id"],
                agent_state=r["agent_state"],
                tool_name=r["tool_name"],
                tool_input_summary=r["tool_input_summary"],
                tool_output_summary=r["tool_output_summary"],
                reason=r["reason"],
                status=r["status"],
                actor=r["actor"]
            ))
        return events

@router.post("/run_autonomous_cycle")
def run_autonomous_cycle(req: AgentPromptRequest = Body(default_factory=AgentPromptRequest)):
    """
    Executes a true live multi-turn Gemini 3.5 Flash Function Calling loop.
    Gemini decides which tools to invoke (inspect_catalog -> get_query_results -> diagnose_gap -> generate_fix_diff).
    Pauses deterministically at WAIT_FOR_APPROVAL.
    """
    try:
        res = run_gemini_autonomous_agent(req.goal)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
