from fastapi import APIRouter
from backend.models.query import DiagnosisReport
from backend.agent.catalyst_agent import agent

router = APIRouter(prefix="/api/diagnosis", tags=["Diagnosis"])

@router.post("/run", response_model=DiagnosisReport)
def run_diagnosis():
    report_dict = agent.tool_diagnose_gap()
    return DiagnosisReport(**report_dict)

@router.get("/opportunities", response_model=list[dict])
def get_ranked_opportunities():
    report_dict = agent.tool_diagnose_gap()
    return report_dict.get("top_opportunities", [])
