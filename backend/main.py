from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import init_db, reset_db, get_connection
from backend.api.routes_catalog import router as catalog_router
from backend.api.routes_diagnosis import router as diagnosis_router
from backend.api.routes_fix import router as fix_router
from backend.api.routes_experiment import router as experiment_router
from backend.api.routes_attribution import router as attribution_router
from backend.api.routes_agent import router as agent_router
from backend.agent.catalyst_agent import agent
from backend.generators.session_generator import generate_all_datasets
from backend.evaluation.evaluate_classifier import evaluate_heldout
from backend.generators.catalog_generator import load_catalog
import json

app = FastAPI(
    title="Catalyst — AI Commerce Revenue Agent API",
    description="Turn AI discovery into measurable, verified incremental GMV. Built for the Razorpay Buildathon.",
    version="1.0.0"
)

# Enable CORS for local dev and store
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# Mount API Routers
app.include_router(catalog_router)
app.include_router(diagnosis_router)
app.include_router(fix_router)
app.include_router(experiment_router)
app.include_router(attribution_router)
app.include_router(agent_router)

@app.get("/")
def root():
    return {
        "product": "Catalyst",
        "positioning": "AI Commerce Revenue Agent",
        "tagline": "Turn AI discovery into measurable revenue",
        "docs": "/docs",
        "status": "operational"
    }


@app.get("/api/store/product/{product_id}")
def get_store_product(product_id: str):
    """
    Returns the current live product data for the merchant store.
    - If a fix diff for this product is 'approved' or 'applied', returns the rich (patched) catalog entry.
    - Otherwise, returns the baseline thin catalog entry.
    The store calls this on load instead of reading bundled JSON — no URL params needed.
    """
    # Check if any approved/applied diff exists for this product
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT status FROM fix_diffs WHERE product_id = ? AND status IN ('approved', 'applied') ORDER BY approved_at DESC LIMIT 1",
            (product_id,)
        )
        row = cursor.fetchone()

    is_patched = row is not None

    # Load the appropriate catalog
    catalog_state = "rich" if is_patched else "thin"
    try:
        products = load_catalog(catalog_state)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Catalog load failed: {str(e)}")

    product = next((p for p in products if p.product_id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail=f"Product '{product_id}' not found in {catalog_state} catalog.")

    return {
        "product": product.model_dump(),
        "catalog_state": catalog_state,
        "is_patched": is_patched,
        "diff_status": row["status"] if row else None
    }


@app.get("/api/store/status")
def get_store_status():
    """
    Returns the patch status for all products in the store.
    The store can call this on load to know which products are patched.
    """
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT product_id, status, approved_at, applied_at FROM fix_diffs WHERE status IN ('approved', 'applied')"
        )
        rows = cursor.fetchall()

    patched = {row["product_id"]: {"status": row["status"], "approved_at": row["approved_at"]} for row in rows}
    return {"patched_products": patched, "is_any_patched": len(patched) > 0}


@app.post("/api/demo/reset")
def reset_demo_state():
    """
    Full reset: wipes all DB tables (diffs, experiments, events, sessions, query_results, agent_state)
    and re-seeds fresh baseline data. The merchant store will automatically revert to unpatched
    on its next load since no approved diffs exist in the DB.
    """
    # 1. Wipe DB entirely and re-seed schema defaults
    reset_db()

    # 2. Reset agent state machine to OBSERVE
    agent.transition_to(
        new_state="OBSERVE",
        thought="Demo environment reset. Observing merchant catalog vs AI shopping query performance.",
        recommendation="Run diagnosis to identify top competitor evidence gaps.",
        actor="system"
    )

    # 3. Re-generate attribution sessions
    datasets = generate_all_datasets()
    evaluate_heldout(datasets["heldout_sessions"])

    # 4. Re-generate fix diff (proposed, NOT approved) and experiment
    agent.tool_generate_fix_diff("opp-01", "merch-boot-01")
    agent.tool_run_experiment("diff-apex-01")

    return {
        "status": "reset_completed",
        "current_state": "OBSERVE",
        "db_wiped": True,
        "store_state": "unpatched"
    }
