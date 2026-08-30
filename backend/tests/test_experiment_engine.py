import pytest
from backend.engines.experiment_engine import run_experiment_simulation

def test_experiment_arithmetic_consistency():
    result, ctrl_s, treat_s = run_experiment_simulation(seed=42, traffic_volume=500)
    
    # Assert incremental GMV = treatment.verified_gmv - control.verified_gmv
    expected_inc_gmv = round(result.treatment.verified_gmv - result.control.verified_gmv, 2)
    assert abs(result.incremental_gmv - expected_inc_gmv) < 0.01
    
    # Assert positive lift with rich catalog
    assert result.incremental_gmv > 0
    assert result.treatment.ai_recommendation_share_pct > result.control.ai_recommendation_share_pct
    assert result.label == "Controlled simulation result"
