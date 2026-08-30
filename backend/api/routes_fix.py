from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from backend.models.diff import FixDiff
from backend.agent.catalyst_agent import agent
from backend.db.database import get_connection
import json

router = APIRouter(prefix="/api/fix", tags=["Fix Diff & Approval"])

@router.post("/generate", response_model=FixDiff)
def generate_fix(
    opportunity_id: str = Query("opp-01"),
    product_id: str = Query("merch-boot-01")
):
    diff_dict = agent.tool_generate_fix_diff(opportunity_id, product_id)
    return FixDiff(**diff_dict)

@router.get("/{diff_id}", response_model=FixDiff)
def get_fix(diff_id: str):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM fix_diffs WHERE diff_id = ?", (diff_id,))
        row = cursor.fetchone()
        if not row:
            # Generate default proposed diff if not yet created
            diff_dict = agent.tool_generate_fix_diff("opp-01", "merch-boot-01")
            return FixDiff(**diff_dict)
            
        return FixDiff(
            diff_id=row["diff_id"],
            opportunity_id=row["opportunity_id"],
            product_id=row["product_id"],
            product_name=row["product_name"],
            fields=json.loads(row["fields"]),
            evidence=json.loads(row["evidence"]),
            reason=row["reason"],
            validation_status=row["validation_status"],
            validation_error=row["validation_error"],
            status=row["status"],
            created_at=row["created_at"],
            approved_at=row["approved_at"],
            applied_at=row["applied_at"]
        )

@router.post("/{diff_id}/approve")
def approve_fix(diff_id: str):
    try:
        return agent.tool_approve_fix(diff_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{diff_id}/reject")
def reject_fix(diff_id: str):
    try:
        return agent.tool_reject_fix(diff_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
