# ⚡ Catalyst — AI Commerce Revenue Agent

> **Turn AI discovery into measurable revenue.**  
> *Built for the Razorpay Buildathon.*

Catalyst is an AI Commerce Revenue Agent that helps online merchants discover why AI shopping engines recommend competitors instead of them, proposes bounded and evidence-backed product catalog fixes, gates deployment behind mandatory merchant approval, and measures whether the change generates verified incremental AI-attributed GMV through controlled A/B traffic experiments.

---

## 🏛️ Core Architecture & Principles

```text
               ┌───────────────────────────┐
               │     Gemini 3.5 Flash      │
               │      Catalyst Agent       │
               └─────────────┬─────────────┘
                             │  (Reasoning & Bounded Tool Calls)
    ┌────────────────────────┼────────────────────────┐
    ▼                        ▼                        ▼
inspect_catalog()       diagnose_gap()        generate_fix_diff()
    │                        │                        │
    └────────────────────────┼────────────────────────┘
                             ▼
               ┌───────────────────────────┐
               │      FastAPI Backend      │
               │    (Source of Truth)      │
               └─────────────┬─────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
Diagnosis Engine      5-Signal Classifier    Experiment Engine
(Gap Analysis)       (Deterministic Rules)   (Incremental GMV)
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             ▼
                    SQLite / Generated CSVs
```

### Key Engineering Boundaries:
1. **Gemini 3.5 Flash**: Interprets shopping trials, analyzes evidence gaps, drafts bounded fixes, and generates explanations.
2. **Deterministic Backend**: Computes GMV, treatment/control assignment, incremental GMV, and executes 5-signal deterministic attribution scoring without an LLM in the scoring loop.
3. **Mandatory Merchant Gate**: Every fix requires explicit merchant approval (`proposed` → `approved` → `applied`).
4. **Holdout Evaluation**: Attribution precision, recall, and spoof rejection metrics are evaluated strictly on held-out test data.
5. **Controlled Simulation Result**: Every experimental revenue figure is clearly labeled to guarantee integrity.

---

## 🚀 Quick Start

### 1. Setup Environment
```bash
bash scripts/setup.sh
```

### 2. Run Data Pipeline & Simulation
```bash
bash scripts/run_full_pipeline.sh
```

### 3. Start Application
```bash
bash scripts/run_demo.sh
```
- **Merchant Dashboard**: [http://localhost:5173](http://localhost:5173)
- **FastAPI Backend & Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧪 Running Automated Tests

```bash
./.venv/bin/pytest
```
Tests cover catalog validation, session reproducibility, 5-signal attribution scoring combinations, experiment arithmetic, and held-out leakage prevention.

---

## 🎙️ The 5-Beat Demo Sequence

| Beat | Name | What Judge Sees |
|---|---|---|
| **01** | **Discover** | Merchant is recommended in only 3/20 trials vs Competitor A's 11/20 trials on high-intent boots query. |
| **02** | **Diagnose** | Gemini 3.5 Flash explains why: 5 vs 11 attributes, 18 vs 312 reviews, missing Schema.org JSON-LD. |
| **03** | **Fix & Approve** | Agent drafts bounded FixDiff. Backend validates facts. Merchant reviews and clicks **Approve & Deploy**. |
| **04** | **Prove Revenue** | Controlled experiment measures **+₹1.50L Verified Incremental AI GMV** (+125% lift). |
| **05** | **Trust & Don't Overclaim** | Spoofed session is inspected and **REJECTED** (-2 penalty), excluding ₹2,500 from verified GMV. *"Catalyst would rather undercount than falsely claim revenue."* |
