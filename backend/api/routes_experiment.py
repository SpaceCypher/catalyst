from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from backend.models.experiment import ExperimentResult
from backend.agent.catalyst_agent import agent
from backend.db.database import get_connection
import json

router = APIRouter(prefix="/api/experiment", tags=["Experiment Engine"])

@router.post("/run", response_model=ExperimentResult)
def run_experiment(diff_id: str = Query("diff-apex-01")):
    try:
        exp_dict = agent.tool_run_experiment(diff_id)
        return ExperimentResult(**exp_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/latest", response_model=ExperimentResult)
def get_latest_experiment():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM experiments ORDER BY timestamp DESC LIMIT 1")
        row = cursor.fetchone()
        if not row:
            # Run one simulation if not yet executed
            exp_dict = agent.tool_run_experiment("diff-apex-01")
            return ExperimentResult(**exp_dict)

        return ExperimentResult(
            experiment_id=row["experiment_id"],
            diff_id=row["diff_id"],
            timestamp=row["timestamp"],
            random_seed=row["random_seed"],
            catalog_version=row["catalog_version"],
            simulation_version=row["simulation_version"],
            control=json.loads(row["control_json"]),
            treatment=json.loads(row["treatment_json"]),
            incremental_gmv=row["incremental_gmv"],
            incremental_gmv_pct=row["incremental_gmv_pct"],
            incremental_conversions=row["incremental_conversions"],
            visibility_gain_pts=row["visibility_gain_pts"],
            label=row["label"]
        )
