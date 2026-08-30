# Catalyst — Full Engineering Build Guide

**Purpose of this document:** a complete, self-contained spec you can hand to an agentic coding tool (Claude Code, Cursor, etc.) — or follow yourself — to build Catalyst from an empty folder to a working, demo-ready system. It assumes you've already read `catalyst-design-spec.md` (the product/loop design); this document is the *engineering* companion: what files exist, what goes in each one, what stack/LLM to use, and how to test the whole thing end to end.

Feed an agentic coder Section 9 ("Build Phases") as its task list, and the rest of this document as reference context for what each phase actually needs to produce.

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Data generation & simulation | Python 3.11+ | Best fit for probabilistic sampling, LLM API calls, scientific/statistical evaluation |
| Backend API | FastAPI | Fast to scaffold, auto-generates OpenAPI docs (useful if a judge pokes at the API), async-friendly for LLM calls |
| Database | SQLite | Zero-ops, plenty for hackathon data volumes (thousands of synthetic sessions), one file, easy to inspect |
| LLM provider | Anthropic API (Claude) | Two specific jobs only — see Section 5. Everything else is deterministic Python, not an LLM, by design |
| Frontend | React + Vite + Tailwind | Fast dev loop, matches the four-card dashboard design, easy for an agentic coder to scaffold |
| Charts | Recharts | Lightweight, good enough for the before/after and experiment bar charts |
| Testing | Pytest (backend), Vitest + React Testing Library (frontend) | Standard, agentic-coder-friendly |
| Package management | `pip` + `venv` (backend), `npm` (frontend) | Keep it boring and reproducible |

**Explicit non-choices, and why:** no Postgres/Docker/Kubernetes (unnecessary ops overhead for a hackathon demo), no LLM call inside the attribution classifier (must stay deterministic and auditable — see Section 6.3), no separate microservices (one FastAPI app is enough).

---

## 2. Repository structure

```
catalyst/
├── README.md
├── .env.example
├── .gitignore
├── requirements.txt
├── pytest.ini
│
├── docs/
│   ├── catalyst-design-spec.md          # the product/loop design doc (already written)
│   ├── catalyst-engineering-build-guide.md   # this document
│   └── demo-script.md                   # the locked 5-beat demo arc, timed
│
├── data/
│   ├── seed/
│   │   ├── merchant_catalog_thin.json   # hand-authored starting state (control)
│   │   ├── merchant_catalog_rich.json   # hand-authored fixed state (treatment)
│   │   ├── competitor_catalog.json      # hand-authored, always rich
│   │   └── query_panel.json             # ~30-50 fixed shopping queries, hand-authored
│   └── generated/                       # gitignored — all outputs of the pipeline
│       ├── diagnosis_results.json
│       ├── sessions_tuning.csv
│       ├── sessions_heldout.csv
│       ├── control_arm_results.json
│       ├── treatment_arm_results.json
│       ├── attribution_evaluation.json
│       └── catalyst.db                  # SQLite file
│
├── backend/
│   ├── main.py                          # FastAPI app entrypoint
│   ├── config.py                        # env var loading, constants
│   ├── db/
│   │   ├── database.py                  # SQLite connection/session
│   │   └── schema.sql                   # table definitions
│   ├── models/
│   │   ├── product.py                   # Pydantic: Product, Catalog
│   │   ├── query.py                     # Pydantic: Query, QueryResult
│   │   ├── session.py                   # Pydantic: Session, GroundTruthLabel
│   │   ├── diff.py                      # Pydantic: FixDiff, DiffField
│   │   └── experiment.py                # Pydantic: ExperimentArm, ExperimentResult
│   ├── generators/
│   │   ├── catalog_generator.py         # loads/validates seed catalogs
│   │   ├── query_ground_truth.py        # runs LLM shopping-engine trials, builds ground truth
│   │   ├── session_generator.py         # builds labeled synthetic sessions (genuine/organic/spoofed)
│   │   └── noise.py                     # shared noise-injection helpers
│   ├── engines/
│   │   ├── diagnosis_engine.py          # "Why?" engine — gap analysis + ranked opportunities
│   │   ├── fix_agent.py                 # LLM call that drafts the diff for merchant approval
│   │   ├── attribution_classifier.py    # deterministic 5-signal scorer (NOT an LLM)
│   │   └── experiment_engine.py         # treatment/control GMV computation
│   ├── evaluation/
│   │   ├── evaluate_classifier.py       # precision/recall/FP-cost on held-out set only
│   │   └── evaluate_pipeline.py         # sanity checks across the whole generated dataset
│   ├── api/
│   │   ├── routes_catalog.py
│   │   ├── routes_diagnosis.py
│   │   ├── routes_fix.py
│   │   ├── routes_experiment.py
│   │   └── routes_attribution.py
│   └── tests/
│       ├── test_catalog_generator.py
│       ├── test_query_ground_truth.py
│       ├── test_session_generator.py
│       ├── test_attribution_classifier.py
│       ├── test_experiment_engine.py
│       ├── test_evaluate_classifier.py
│       ├── test_api_catalog.py
│       ├── test_api_diagnosis.py
│       ├── test_api_fix.py
│       ├── test_api_experiment.py
│       └── fixtures/
│           ├── sample_sessions.json     # small hand-labeled set for classifier unit tests
│           └── llm_mock_responses.json  # cached LLM responses so tests don't need live API calls
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api/
│       │   └── client.js                # fetch wrappers for backend endpoints
│       ├── components/
│       │   ├── HeadlineGMVCard.jsx      # ₹ Verified AI-attributed GMV
│       │   ├── VisibilityCard.jsx       # 8% → 17%
│       │   ├── OpportunityCard.jsx      # ₹ potential + ranked list
│       │   ├── DiagnosisPanel.jsx       # "Why are you losing?" detail
│       │   ├── DiffReviewModal.jsx      # the diff + Approve & Deploy button
│       │   ├── ExperimentResultPanel.jsx # control vs treatment table + incremental GMV
│       │   └── SpoofRejectionPanel.jsx  # the closing demo beat
│       └── styles/
│           └── index.css
│
└── scripts/
    ├── setup.sh                        # venv + pip install + npm install, one command
    ├── run_full_pipeline.sh            # generate → diagnose → simulate sessions → evaluate → seed DB
    ├── seed_db.py                      # loads all generated/ JSON+CSV into SQLite
    └── run_demo.sh                     # starts backend + frontend together for the live demo
```

---

## 3. Environment & configuration

`.env.example`:
```
ANTHROPIC_API_KEY=your_key_here
LLM_MODEL=claude-sonnet-4-5          # use whatever current Claude model string you have API access to
RANDOM_SEED=42
NUM_SHOPPING_TRIALS_PER_QUERY=20     # LLM calls per query per catalog state (see Section 5)
TOTAL_QUERIES_IN_PANEL=40
SESSIONS_TUNING_COUNT=1500
SESSIONS_HELDOUT_COUNT=1500
CONTROL_TRAFFIC_VOLUME=2000
TREATMENT_TRAFFIC_VOLUME=2000
DB_PATH=./data/generated/catalyst.db
```

`RANDOM_SEED` matters a lot here — every generator must accept and use it, so the whole pipeline is reproducible for judges re-running your demo.

---

## 4. Data schemas

### 4.1 Product (`backend/models/product.py`)
```python
class Product(BaseModel):
    product_id: str
    name: str
    category: str
    price: float
    attributes: list[str]          # e.g. ["Waterproof: Yes", "Weight: 420g"]
    review_count: int
    review_detail_score: float     # 0-1, how detailed/specific reviews are
    faq_count: int
    has_structured_schema: bool
    catalog_state: Literal["thin", "rich", "competitor"]
```

### 4.2 Query & QueryResult (`backend/models/query.py`)
```python
class Query(BaseModel):
    query_id: str
    query_text: str
    category: str

class QueryResult(BaseModel):
    query_id: str
    catalog_state: Literal["thin", "rich"]   # which merchant state was tested
    trial_number: int
    merchant_mentioned: bool
    competitor_mentioned: bool
    raw_llm_response: str
    extracted_reason: str | None    # why the LLM did/didn't mention the merchant
```

### 4.3 Session (`backend/models/session.py`)
```python
class Session(BaseModel):
    session_id: str
    query_id: str | None
    referrer: str
    landing_product_id: str
    timestamp: datetime
    behavior_signal: Literal["direct", "generic"]
    timing_consistent: bool
    ground_truth_label: Literal["AI_GENUINE", "ORGANIC", "AI_SPOOFED"]
    split: Literal["tuning", "heldout"]
    arm: Literal["control", "treatment"]
    converted: bool
    order_value: float | None
    # populated by the classifier, not the generator:
    attribution_score: int | None
    attribution_label: Literal["Verified", "Ambiguous", "Rejected"] | None
```

### 4.4 FixDiff (`backend/models/diff.py`)
```python
class DiffField(BaseModel):
    field: str
    old_value: str | None
    new_value: str

class FixDiff(BaseModel):
    diff_id: str
    product_id: str
    fields: list[DiffField]
    reason: str                     # LLM-generated justification
    status: Literal["proposed", "approved", "rejected"]
    approved_at: datetime | None
```

### 4.5 ExperimentResult (`backend/models/experiment.py`)
```python
class ExperimentArmResult(BaseModel):
    arm: Literal["control", "treatment"]
    ai_visibility_pct: float
    ai_sessions: int
    conversions: int
    verified_gmv: float
    ambiguous_gmv: float
    rejected_gmv: float

class ExperimentResult(BaseModel):
    control: ExperimentArmResult
    treatment: ExperimentArmResult
    incremental_gmv: float          # treatment.verified_gmv - control.verified_gmv
    incremental_gmv_pct: float
    label: str = "Controlled simulation result"
```

---

## 5. Where LLM calls happen, and where they deliberately don't

**Two LLM calls only. Everything else is deterministic Python.** This is not a shortcut — it's the design principle from the spec: the attribution number has to be auditable, and an LLM in that loop would undermine the "we measured this, we didn't assert it" pitch.

### 5.1 Shopping-engine simulator (`generators/query_ground_truth.py`)
Instead of hand-assigning "8% vs 17% recommendation probability," **measure it empirically** by actually running an LLM as a shopping assistant against your synthetic catalogs. This is a meaningfully stronger design than a hardcoded probability — the causal effect of the fix is *observed*, not assumed.

For each query in the panel, run `NUM_SHOPPING_TRIALS_PER_QUERY` independent trials against the **thin** catalog state and the same number against the **rich** state. Example prompt:

```
System: You are a helpful shopping assistant. A user is asking you for a
product recommendation. Below is the catalog data you have access to for
two products. Recommend the best match, or say neither fits, and briefly
explain your reasoning.

Product A (Merchant):
{catalog_json_for_this_state}

Product B (Competitor):
{competitor_catalog_json}

User question: {query_text}
```

Parse the response for which product (if either) was recommended, and capture the stated reason. Aggregate across trials to get the empirical `merchant_mentioned` rate per catalog state — this becomes your real "8% → 17%" (or whatever the actual measured numbers turn out to be — don't force them to match the spec's illustrative example).

**Cost/reliability note:** `40 queries × 20 trials × 2 states = 1,600 calls`. Cache every raw response to `data/generated/diagnosis_results.json` keyed by `(query_id, catalog_state, trial_number)` so re-running the pipeline doesn't re-spend API budget, and so tests can run against cached fixtures instead of live calls.

### 5.2 Fix agent (`engines/fix_agent.py`)
Given the diagnosis output (which attributes/FAQs/reviews the competitor has that the merchant doesn't), one LLM call drafts the structured diff:

```
System: You generate structured product-data improvements for an
e-commerce catalog, based on a gap analysis. Only output valid JSON
matching this schema: {FixDiff schema}. Only propose additions in these
three categories: product structured data, FAQ/product info, attribute-rich
copy. Do not invent facts about the product — only formalize gaps that
are plausible given the product category.

Gap analysis: {diagnosis_output}
Merchant's current product data: {thin_catalog_entry}
```

This output is **never auto-applied** — it's stored with `status="proposed"` and only moves to `"approved"` via the merchant's explicit action in the dashboard.

### 5.3 Attribution classifier — explicitly NOT an LLM
`engines/attribution_classifier.py` is a pure deterministic function (see Section 6.3). No API call, no model, just the 5-signal scoring table from the design spec. This is what makes precision/recall measurable and reproducible.

---

## 6. Core engine specs

### 6.1 Diagnosis engine (`engines/diagnosis_engine.py`)
Input: aggregated `QueryResult`s from Section 5.1 for the thin-catalog state.
Output: a ranked opportunity list.

Algorithm:
1. For every query where `merchant_mentioned=False` and `competitor_mentioned=True`, collect the `extracted_reason` text.
2. Cluster/tally reasons into categories (attribute gap, review-depth gap, FAQ gap, price positioning) — for a hackathon, simple keyword-based bucketing on the reason text is enough; don't over-engineer an NLP clustering pipeline here.
3. Rank categories by frequency × estimated impact (impact = a simple heuristic, e.g., attribute gaps weighted higher than FAQ gaps, informed by how often each shows up as the *stated* blocking reason).
4. Output format matches the design spec's "Top Opportunities" list exactly.

### 6.2 Session generator (`generators/session_generator.py`)
This is the piece with the most moving parts. Pseudocode:

```python
def generate_sessions(arm: str, catalog_state: str, recommendation_rate: float,
                       traffic_volume: int, seed: int) -> list[Session]:
    rng = random.Random(seed)
    sessions = []

    # 1. AI_GENUINE sessions — driven by the measured recommendation_rate
    for query in query_panel:
        if rng.random() < recommendation_rate:
            session = build_session(
                label="AI_GENUINE", query_id=query.query_id,
                referrer=random_ai_domain(rng),
                behavior_signal="direct" if rng.random() > 0.12 else "generic",  # 12% noise
                timing_consistent=rng.random() > 0.10,                          # 10% noise
            )
            sessions.append(session)

    # 2. ORGANIC sessions — same rate in both arms, unaffected by the fix
    for _ in range(organic_count(traffic_volume)):
        sessions.append(build_session(label="ORGANIC", query_id=None,
                                       referrer=random_organic_source(rng)))

    # 3. AI_SPOOFED sessions — same rate in both arms
    for _ in range(spoofed_count(traffic_volume)):
        session = build_session(
            label="AI_SPOOFED",
            query_id=random_invalid_or_mismatched_query_id(rng),
            referrer=random_ai_domain(rng),               # faked to look genuine
            behavior_signal="generic" if rng.random() > 0.15 else "direct",  # 15% look cleaner than typical
            timing_consistent=rng.random() > 0.85,
        )
        sessions.append(session)

    # 4. purchase simulation on top of every session
    for s in sessions:
        s.converted = rng.random() < purchase_probability(s)
        s.order_value = sample_order_value(rng) if s.converted else None

    return sessions
```

Split the full output into `tuning` (used while hand-tuning the classifier's thresholds) and `heldout` (touched exactly once, for final reported metrics) — enforce this split at generation time with a fixed assignment, not a random split done later, so it's impossible to accidentally leak.

### 6.3 Attribution classifier (`engines/attribution_classifier.py`)
```python
def score_session(session: Session, query_lookup: dict) -> int:
    score = 0
    if session.referrer in KNOWN_AI_DOMAINS:
        score += 1
    if session.query_id and query_is_valid_and_mentions_merchant(session.query_id, query_lookup):
        score += 1
    if session.behavior_signal == "direct":
        score += 1
    if session.timing_consistent:
        score += 1
    if has_spoof_indicators(session, query_lookup):
        score -= 2
    return score

def label_from_score(score: int) -> str:
    if score >= 3: return "Verified"
    if score >= 1: return "Ambiguous"
    return "Rejected"
```

Deliberately simple, deliberately deterministic, deliberately no ML model — auditability is the point.

### 6.4 Experiment engine (`engines/experiment_engine.py`)
Runs `session_generator` once per arm using each arm's *measured* recommendation rate from Section 5.1, applies the classifier to every session, and aggregates:

```python
verified_gmv = sum(s.order_value for s in sessions
                    if s.converted and s.attribution_label == "Verified")
```

`incremental_gmv = treatment_result.verified_gmv - control_result.verified_gmv`, always reported with the `"Controlled simulation result"` label attached, never bare.

---

## 7. Backend API

| Method | Path | Returns |
|---|---|---|
| GET | `/api/catalog/{state}` | Product list for `thin` / `rich` / `competitor` |
| POST | `/api/diagnosis/run` | Triggers Section 5.1 trials (or returns cached results if already run), returns ranked opportunities |
| GET | `/api/diagnosis/opportunities` | The ranked opportunity list |
| POST | `/api/fix/generate` | Runs the fix agent (Section 5.3), returns a `FixDiff` with `status="proposed"` |
| POST | `/api/fix/{diff_id}/approve` | Marks diff approved, applies it to the "treatment" catalog state |
| GET | `/api/fix/{diff_id}` | Retrieve a diff and its status |
| POST | `/api/experiment/run` | Runs Section 6.4 end to end, returns `ExperimentResult` |
| GET | `/api/experiment/latest` | Cached latest experiment result |
| GET | `/api/attribution/evaluation` | Precision/recall/FP-cost from the held-out set (Section 8.2) |
| GET | `/api/attribution/sessions?label=Rejected` | Session list filtered by attribution label, for the spoof-rejection demo panel |

Keep all of these synchronous/simple — no websockets, no background job queue. A hackathon judge should be able to hit `/docs` (FastAPI's auto Swagger UI) and understand the whole system in one page.

---

## 8. Testing strategy

### 8.1 Unit tests (fast, no live LLM calls — use `fixtures/llm_mock_responses.json`)
- `test_catalog_generator.py`: seed catalogs load and validate against the `Product` schema; thin catalog genuinely has fewer attributes/reviews/FAQs than rich.
- `test_session_generator.py`: given a fixed seed, output is reproducible byte-for-byte across two runs; label proportions roughly match configured rates within tolerance (e.g., assert AI_GENUINE count is within ±5% of `recommendation_rate × query_count`); tuning/heldout sessions never share a `session_id`.
- `test_attribution_classifier.py`: hand-craft ~10 sessions covering every combination of the 5 signals, assert exact expected scores and labels — this is your ground-truth-of-ground-truth, don't skip it.
- `test_experiment_engine.py`: with a mocked/fixed session set, assert `incremental_gmv` arithmetic is exactly `treatment - control`, and that `verified_gmv` only sums sessions labeled `"Verified"`.

### 8.2 Evaluation harness (`evaluation/evaluate_classifier.py`)
This produces the number that goes on your slide. Run once, on the held-out split only:
```python
def evaluate(heldout_sessions: list[Session]) -> dict:
    y_true = [s.ground_truth_label == "AI_GENUINE" for s in heldout_sessions]
    y_pred = [s.attribution_label == "Verified" for s in heldout_sessions]
    return {
        "precision": precision_score(y_true, y_pred),
        "recall": recall_score(y_true, y_pred),
        "false_positive_count": count_false_positives(y_true, y_pred),
        "false_positive_gmv": sum_gmv_of_false_positives(heldout_sessions, y_pred),
        "spoofed_correctly_rejected": count_spoofed_rejected(heldout_sessions),
        "spoofed_gmv_excluded": sum_gmv_of_correctly_rejected_spoofed(heldout_sessions),
    }
```
Assert in a test that this function has never been called on the tuning split (e.g., by checking `all(s.split == "heldout" for s in input)` at the top of the function and raising if violated — make the leak-proofing an actual runtime guard, not just a convention).

### 8.3 Integration tests (`test_api_*.py`)
Use FastAPI's `TestClient` against a temporary SQLite DB seeded with a small synthetic fixture (not the full 4,000-session dataset — keep these fast). Cover: diagnosis endpoint returns a non-empty ranked list; fix endpoint returns a diff with all three allowed action categories represented at least once across the seed data; approving a diff changes its status and is reflected in a subsequent GET; experiment endpoint returns internally consistent numbers (`treatment.verified_gmv - control.verified_gmv == incremental_gmv`).

### 8.4 End-to-end smoke test (`scripts/run_full_pipeline.sh` + a final assertion script)
1. Run the full pipeline from scratch (generation → diagnosis → sessions → classifier → evaluation → DB seed).
2. Assert `data/generated/attribution_evaluation.json` exists and contains all expected keys.
3. Assert `incremental_gmv > 0` (if your treatment catalog is genuinely richer, this should hold — if it doesn't, something upstream is broken, not just unlucky).
4. Start the backend, hit every endpoint in Section 7 once, assert 200 status codes.
5. This is the test you re-run the morning of the demo.

### 8.5 Manual QA checklist (do this once, right before presenting)
- [ ] Dashboard loads with real numbers, not placeholder text.
- [ ] Clicking a diff opens the review modal with the actual generated fields, not a hardcoded example.
- [ ] Approving a diff visibly updates the opportunity card.
- [ ] Experiment panel shows control vs. treatment with the "Controlled simulation result" label visibly attached — this label must never be missing from the UI, since it's the honesty commitment from the spec.
- [ ] The spoof-rejection panel shows at least one real rejected session with its score breakdown, not a mocked one.
- [ ] Refreshing the page doesn't lose state (read from the DB/cached JSON, not in-memory-only).

---

## 9. Build phases (hand this list to an agentic coder, in order)

1. **Scaffold repo structure** (Section 2) with empty files/stubs and `requirements.txt`/`package.json` populated from Section 1.
2. **Seed data** — hand-author `data/seed/*.json` (thin catalog, rich catalog, competitor catalog, 30-50 query panel). This is the only genuinely manual-creativity step; everything downstream is generated.
3. **Catalog generator + Pydantic models** (Sections 4.1, backend/generators/catalog_generator.py) — load, validate, expose via `/api/catalog/{state}`.
4. **Shopping-engine simulator** (Section 5.1) — implement, run against seed data, cache results. **Checkpoint:** confirm the measured recommendation-rate gap between thin and rich states is non-trivial (if it's near zero, your seed catalogs aren't differentiated enough — go back and widen the gap in Step 2 before continuing).
5. **Diagnosis engine** (Section 6.1) — build the ranked opportunity list from Step 4's output.
6. **Fix agent** (Section 5.2) — generate a diff from the diagnosis output; wire up approve/reject state.
7. **Session generator** (Section 6.2) — implement with the seeded RNG, tuning/heldout split enforced at generation time.
8. **Attribution classifier** (Section 6.3) — implement the 5-signal scorer; write its unit tests (8.1) *before* moving on, since every later metric depends on this being correct.
9. **Evaluation harness** (Section 8.2) — run against the held-out split, produce the real precision/recall numbers.
10. **Experiment engine** (Section 6.4) — run control and treatment arms, compute incremental GMV.
11. **Backend API** (Section 7) — wire all engines behind FastAPI routes; run integration tests (8.3).
12. **Frontend dashboard** (Section 2's `frontend/` tree, four-card layout from the design spec) — build against the real API, not mocked data, from the start.
13. **End-to-end smoke test** (8.4) — run the whole pipeline from a clean `data/generated/` folder and confirm it all comes together.
14. **Demo rehearsal** — walk the 5-beat script from `docs/demo-script.md` against the live app, timing it.

Each phase should be a separate commit/PR-sized chunk — this also means if an agentic coder gets Step 7 wrong, you can roll back without losing Steps 1-6.

---

## 10. Running it

```bash
# one-time setup
bash scripts/setup.sh

# generate all synthetic data + run LLM trials + evaluate (this is the slow one, due to API calls)
bash scripts/run_full_pipeline.sh

# seed the SQLite DB from generated files
python scripts/seed_db.py

# start backend (localhost:8000) + frontend (localhost:5173) together
bash scripts/run_demo.sh
```

Re-run `run_full_pipeline.sh` any time you change the seed catalogs or query panel — everything downstream regenerates deterministically from `RANDOM_SEED`.

---

## 11. Things to double check before you present

- The incremental GMV number on screen must trace back to an actual run of the pipeline, not a value typed into a mock. If you changed the seed catalogs at 2am and didn't re-run Step 4's checkpoint, your dashboard numbers may be stale relative to your seed data — re-run the full pipeline the morning of.
- Never say "ChatGPT recommended this" as a factual claim about a real, live AI product during the pitch — you're demonstrating a *method*, using your own LLM calls as a stand-in for "an AI shopping engine," and that distinction should stay explicit if a judge asks how this would work against real ChatGPT/Perplexity traffic in production (answer: the attribution/verification layer is provider-agnostic; you'd need each provider's actual referral signals, which you don't have access to in a hackathon).
- Keep the "Controlled simulation result" label physically visible in every screenshot and every spoken sentence that mentions incremental GMV — this is the discipline this whole spec was built around, and it's the difference between a defensible pitch and an overclaimed one.
