from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import init_db
from backend.api.routes_catalog import router as catalog_router
from backend.api.routes_diagnosis import router as diagnosis_router
from backend.api.routes_fix import router as fix_router
from backend.api.routes_experiment import router as experiment_router
from backend.api.routes_attribution import router as attribution_router
from backend.api.routes_agent import router as agent_router
from backend.agent.catalyst_agent import agent
from backend.generators.session_generator import generate_all_datasets
from backend.evaluation.evaluate_classifier import evaluate_heldout

app = FastAPI(
    title="Catalyst — AI Commerce Revenue Agent API",
    description="Turn AI discovery into measurable, verified incremental GMV. Built for the Razorpay Buildathon.",
    version="1.0.0"
)

# Enable CORS for local dev
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

@app.post("/api/demo/reset")
def reset_demo_state():
    """Resets demo back to initial discovery state for fresh live presentations."""
    init_db()
    agent.transition_to(
        new_state="OBSERVE",
        thought="Demo environment reset. Observing merchant catalog vs AI shopping query performance.",
        recommendation="Run diagnosis to identify top competitor evidence gaps.",
        actor="system"
    )
    # Ensure baseline simulation is populated
    datasets = generate_all_datasets()
    evaluate_heldout(datasets["heldout_sessions"])
    agent.tool_generate_fix_diff("opp-01", "merch-boot-01")
    agent.tool_run_experiment("diff-apex-01")
    
    return {"status": "reset_completed", "current_state": "OBSERVE"}
