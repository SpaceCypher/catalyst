import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_root_endpoint():
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json()["product"] == "Catalyst"

def test_catalog_endpoints():
    for state in ["thin", "rich", "competitor"]:
        resp = client.get(f"/api/catalog/{state}")
        assert resp.status_code == 200
        assert resp.json()["count"] > 0

def test_diagnosis_endpoints():
    resp = client.post("/api/diagnosis/run")
    assert resp.status_code == 200
    data = resp.json()
    assert "top_opportunities" in data
    assert len(data["top_opportunities"]) > 0

def test_fix_and_approval_flow():
    # 1. Generate Fix
    gen_resp = client.post("/api/fix/generate?opportunity_id=opp-01&product_id=merch-boot-01")
    assert gen_resp.status_code == 200
    diff = gen_resp.json()
    diff_id = diff["diff_id"]
    assert diff["status"] == "proposed"
    assert len(diff["fields"]) > 0

    # 2. Approve Fix
    appr_resp = client.post(f"/api/fix/{diff_id}/approve")
    assert appr_resp.status_code == 200
    assert appr_resp.json()["status"] == "approved"

def test_autonomous_cycle_endpoint():
    resp = client.post("/api/agent/run_autonomous_cycle", json={"goal": "Find footwear gaps and propose fix"})
    assert resp.status_code == 200
    data = resp.json()
    assert "steps" in data
    assert len(data["steps"]) > 0
    assert data["status"] in ("WAIT_FOR_APPROVAL", "COMPLETED")

def test_attribution_endpoints():
    eval_resp = client.get("/api/attribution/evaluation")
    assert eval_resp.status_code == 200
    eval_data = eval_resp.json()
    assert eval_data["precision"] >= 0.90
    assert eval_data["split"] == "heldout"

    sess_resp = client.get("/api/attribution/sessions?label=Rejected")
    assert sess_resp.status_code == 200
    assert isinstance(sess_resp.json(), list)
