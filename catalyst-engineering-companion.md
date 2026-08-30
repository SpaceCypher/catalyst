# Catalyst --- Engineering Companion: Agent Contracts, Evaluation & Demo Integrity

**Purpose:** This document complements
`catalyst-engineering-build-guide.md`. It does not replace the build
guide or the product/design spec. The build guide defines the
repository, APIs, schemas, build phases, and core implementation. This
companion closes the engineering gaps most likely to matter during
implementation and judging: agent boundaries, tool contracts,
reproducibility, attribution evaluation, experiment integrity, failure
handling, and demo-safe behavior.

------------------------------------------------------------------------

## 1. Non-negotiable engineering principles

### 1.1 LLM = reasoning/orchestration, not source of truth

Gemini 3.5 Flash is the agent brain. It may:

-   interpret shopping-engine responses;
-   identify likely gaps;
-   rank candidate interventions;
-   generate a merchant-facing explanation;
-   generate a bounded `FixDiff`;
-   choose which approved tool to call next.

It must **not** be the authority for:

-   attribution labels;
-   spoof detection;
-   GMV;
-   treatment/control assignment;
-   incremental GMV;
-   precision/recall;
-   experiment statistics.

Those are deterministic backend computations.

### 1.2 Every consequential action is gated

The agent can **propose** a catalog change.

It cannot silently publish it.

Required state transition:

`proposed → approved → applied`

or

`proposed → rejected`

Only the merchant approval endpoint may move a diff to `approved`.

### 1.3 Synthetic means synthetic

The demo must never imply that the displayed GMV came from real merchant
production traffic.

Any screen or spoken claim about experimental revenue must use:

> **Controlled simulation result**

The system should expose the provenance of every headline number.

### 1.4 Reproducibility beats randomness

All synthetic generation uses `RANDOM_SEED`.

Changing the seed intentionally changes the generated dataset; rerunning
with the same seed must reproduce the same generated artifacts, apart
from explicitly non-deterministic external LLM responses.

Cache external LLM responses so the downstream pipeline is reproducible.

------------------------------------------------------------------------

# 2. Recommended Catalyst agent architecture

``` text
                         ┌─────────────────────┐
                         │   Gemini 3.5 Flash   │
                         │    Catalyst Agent    │
                         └──────────┬──────────┘
                                    │
                          structured tool calls
                                    │
        ┌───────────────┬───────────┼───────────┬───────────────┐
        ▼               ▼           ▼           ▼               ▼
   inspect_data     diagnose     generate    request        summarize
                                 fix         approval
        │               │           │           │
        └───────────────┴───────────┴───────────┘
                                    │
                              FastAPI backend
                                    │
                 ┌──────────────────┼──────────────────┐
                 ▼                  ▼                  ▼
          Diagnosis engine    Attribution engine   Experiment engine
                 │                  │                  │
                 └──────────────────┼──────────────────┘
                                    ▼
                              SQLite / artifacts
```

The agent should operate as a **bounded planner** rather than a
free-form autonomous shell.

It gets access to a small allow-list of typed tools. No arbitrary Python
execution, shell access, database SQL, or unrestricted HTTP access.

------------------------------------------------------------------------

# 3. Agent tool contracts

The exact implementation can differ, but the tool boundaries should
remain stable.

## 3.1 `inspect_catalog`

**Purpose:** retrieve merchant/competitor product evidence.

**Input:**

``` json
{
  "catalog_state": "thin",
  "product_ids": ["merchant-x1", "competitor-a1"]
}
```

**Output:**

``` json
{
  "products": [
    {
      "product_id": "merchant-x1",
      "attributes": [],
      "review_count": 18,
      "review_detail_score": 0.21,
      "faq_count": 3,
      "has_structured_schema": false
    }
  ]
}
```

The agent should reason from returned evidence, not invent missing
facts.

------------------------------------------------------------------------

## 3.2 `get_query_results`

**Purpose:** retrieve cached shopping-engine trials.

Returns:

-   query;
-   catalog state;
-   recommendation outcome;
-   competitor outcome;
-   extracted reason;
-   trial count.

The tool must not silently regenerate results during ordinary dashboard
interaction.

------------------------------------------------------------------------

## 3.3 `diagnose_gap`

**Purpose:** deterministic aggregation of observable gaps.

The backend should produce the evidence set first:

``` text
attribute_gap
faq_gap
review_gap
schema_gap
other_observed_gap
```

Gemini then turns that evidence into a concise explanation and
prioritization.

This separation prevents the LLM from manufacturing evidence.

------------------------------------------------------------------------

## 3.4 `generate_fix_diff`

**Purpose:** generate a bounded proposed change.

Allowed categories:

1.  Product structured data
2.  FAQ/product information
3.  Attribute-rich product copy

The tool must return a schema-valid `FixDiff`.

Hard rule:

> **Never invent a product fact merely because it would improve
> discoverability.**

If the evidence does not establish a value, the agent must leave it
unresolved or ask for merchant input.

------------------------------------------------------------------------

## 3.5 `approve_fix`

This is the only tool that can transition a proposed diff to
approved/applied.

The frontend approval button should call the backend directly or through
a narrow agent tool.

The backend must verify:

-   diff exists;
-   current status is `proposed`;
-   proposed fields are from the allow-list;
-   values pass schema validation.

Do not rely on Gemini to enforce these conditions.

------------------------------------------------------------------------

## 3.6 `get_attribution_evaluation`

Returns the held-out evaluation metrics:

-   precision;
-   recall;
-   false-positive count;
-   false-positive GMV;
-   confusion matrix.

Gemini may explain the results but cannot alter them.

------------------------------------------------------------------------

## 3.7 `run_experiment`

Runs the controlled simulation and returns:

-   control results;
-   treatment results;
-   verified GMV;
-   ambiguous GMV;
-   rejected GMV;
-   incremental GMV;
-   incremental percentage;
-   experiment metadata.

The experiment engine owns the arithmetic.

------------------------------------------------------------------------

# 4. Agent state machine

Do not let the agent jump directly from diagnosis to deployment.

``` text
OBSERVE
   ↓
DIAGNOSE
   ↓
PROPOSE
   ↓
WAIT_FOR_APPROVAL
   ↓
APPLY
   ↓
EXPERIMENT
   ↓
VERIFY
   ↓
REPORT
   ↓
REASSESS
```

The state must be persisted.

A page refresh must not cause the agent to forget that a diff was
already approved.

### Invalid transitions

The backend should reject:

-   `proposed → applied` without approval;
-   `rejected → applied`;
-   `applied → proposed`;
-   applying a second time when the same diff is already applied.

This gives the system an auditable action trail.

------------------------------------------------------------------------

# 5. Fix safety: evidence provenance

Every generated diff should carry the evidence that caused it.

Extend the internal `FixDiff` representation with an optional provenance
structure:

``` json
{
  "evidence": [
    {
      "source": "query_result",
      "query_id": "q17",
      "observation": "Competitor recommended 14/20 trials"
    },
    {
      "source": "catalog_comparison",
      "observation": "Competitor has 11 product attributes; merchant has 5"
    }
  ]
}
```

The UI does not need to expose every raw field, but it should expose a
short:

> **Why this fix?**

section.

This makes the agent's action explainable without requiring a judge to
trust a hidden prompt.

------------------------------------------------------------------------

# 6. Attribution engine: design for auditability

The attribution classifier should remain deterministic.

Recommended signals:

  Signal                                    Points
  --------------------------------------- --------
  Known AI referrer/domain                      +1
  Matching valid query/merchant mention         +1
  Direct AI-like behavior signal                +1
  Timing consistent with referral               +1
  Strong spoof indicator                        −2

Then:

``` text
score >= 3  → Verified
score 1–2   → Ambiguous
score <= 0  → Rejected
```

These thresholds are implementation choices, not scientific truths. They
should be tuned only on the tuning split.

The held-out split is used once for final reporting.

------------------------------------------------------------------------

# 7. Attribution evaluation protocol

The evaluation harness should produce more than one metric.

## 7.1 Core metrics

``` text
Precision = true_verified / all_predicted_verified

Recall = true_verified / all_ground_truth_ai_genuine
```

Also report:

``` text
False-positive count
False-positive GMV
Rejected spoof count
Ambiguous count
```

### Why false-positive GMV matters

For a payments product, falsely claiming revenue as AI-generated is more
damaging than merely misclassifying a session.

Therefore show:

> **₹X of potentially misattributed GMV excluded**

rather than only:

> 94% precision.

------------------------------------------------------------------------

# 8. Synthetic data generation: causal structure

The session generator should not randomly assign outcomes independently
of the catalog state.

The simulation should encode a causal story:

``` text
Catalog quality
      ↓
AI recommendation probability
      ↓
AI-referred sessions
      ↓
Purchase probability
      ↓
Razorpay order value
```

For example:

-   richer product evidence increases the probability of AI
    recommendation;
-   genuine AI referrals have a different purchase propensity from
    organic traffic;
-   spoofed referrals can have plausible referrer fields but
    inconsistent behavioral signals.

This allows the experiment to demonstrate a meaningful treatment effect
without manually forcing the final GMV number.

------------------------------------------------------------------------

# 9. Treatment/control integrity

The experiment engine must use the same underlying traffic-generation
process for both arms.

Only the treatment condition should receive the approved catalog
intervention.

Conceptually:

``` text
                   SAME BASE PROCESS
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
          CONTROL               TREATMENT
       original catalog       approved fix
              │                     │
              ↓                     ↓
       simulated traffic      simulated traffic
              │                     │
              ↓                     ↓
          verified GMV           verified GMV
              │                     │
              └──────────┬──────────┘
                         ↓
                 Treatment - Control
                         ↓
                Incremental GMV
```

Do not generate treatment and control with different arbitrary
conversion assumptions.

------------------------------------------------------------------------

# 10. Holdout discipline

Maintain two independent evaluation datasets:

### Tuning

Used to:

-   choose classifier thresholds;
-   debug spoof rules;
-   inspect edge cases.

### Held-out

Used only for:

-   final precision/recall;
-   false-positive GMV;
-   final evaluation screenshot.

Never tune thresholds after seeing held-out performance.

If a threshold is changed after the held-out run, regenerate/re-run the
final evaluation and record that as a new evaluation version.

------------------------------------------------------------------------

# 11. Experiment arithmetic

For each arm:

``` python
verified_gmv = sum(
    session.order_value
    for session in sessions
    if session.converted
    and session.attribution_label == "Verified"
)
```

Then:

``` python
incremental_gmv = treatment_verified_gmv - control_verified_gmv
```

And:

``` python
incremental_gmv_pct = (
    incremental_gmv / control_verified_gmv
) * 100
```

Handle a zero control denominator explicitly rather than allowing a
divide-by-zero failure.

Every result object should include:

``` text
experiment_id
seed
catalog_version
attribution_rule_version
control_session_count
treatment_session_count
timestamp
```

This lets the demo answer:

> "Where did this number come from?"

------------------------------------------------------------------------

# 12. Demo data should be engineered, not fabricated after the fact

Before running the final demo, validate these conditions:

### Discovery gap

The thin merchant catalog should materially underperform the
rich/treatment catalog.

### Diagnosis gap

The reason extraction should repeatedly surface the intended missing
evidence.

### Fix validity

The generated diff should contain useful changes that already exist as
facts in the synthetic merchant/product source.

### Attribution

The held-out set should contain enough genuine, organic, and spoofed
examples to make the classifier evaluation meaningful.

### Experiment

Treatment should produce a measurable but not absurd improvement.

Avoid a result such as:

> `₹1.0L → ₹9.0L`

unless the underlying simulation genuinely supports it.

A believable result is better than a spectacular but suspicious one.

------------------------------------------------------------------------

# 13. Failure handling

The demo should deliberately include graceful failures.

## Failure A --- LLM diagnosis unavailable

Fallback:

> "Cached diagnosis unavailable. Showing last successful run."

Do not crash the dashboard.

## Failure B --- generated fix contains unsupported fact

Reject the diff server-side:

> "Fix rejected: proposed value lacks source evidence."

This is actually a good agentic safety demonstration.

## Failure C --- attribution ambiguous

Do not force it into Verified.

Show:

> **Ambiguous --- excluded from verified GMV**

## Failure D --- spoofed AI referral

Show the score breakdown and exclude it.

## Failure E --- experiment has insufficient sample size

Return:

> **Experiment inconclusive --- insufficient simulated traffic**

Do not manufacture a positive result.

------------------------------------------------------------------------

# 14. Observability / audit log

Add a lightweight `agent_events` table.

Suggested fields:

``` text
event_id
timestamp
run_id
agent_state
tool_name
tool_input_hash
tool_output_hash
reason
status
actor
```

For approval events:

``` text
actor = "merchant"
```

For agent proposals:

``` text
actor = "catalyst_agent"
```

This gives you a simple audit trail without building enterprise
infrastructure.

A judge can be shown:

``` text
11:04 Agent diagnosed attribute gap
11:05 Agent proposed FixDiff #17
11:06 Merchant approved FixDiff #17
11:06 Treatment catalog updated
11:07 Experiment started
11:08 Experiment completed
```

------------------------------------------------------------------------

# 15. API rules

Keep the existing API simple, but enforce these invariants server-side.

### Diagnosis

`POST /api/diagnosis/run`

-   returns cached results if available;
-   otherwise runs the simulator;
-   stores the run ID.

### Fix

`POST /api/fix/generate`

-   must use a diagnosis run;
-   returns `proposed`.

### Approval

`POST /api/fix/{diff_id}/approve`

-   only accepts `proposed`;
-   validates the diff;
-   applies the treatment catalog change;
-   records approval timestamp.

### Experiment

`POST /api/experiment/run`

-   requires an approved fix;
-   records the experiment version;
-   never mutates historical results.

### Attribution

`GET /api/attribution/evaluation`

-   reads the held-out evaluation artifact;
-   never retrains or retunes the classifier.

------------------------------------------------------------------------

# 16. Version everything that can change a number

The following should have explicit versions:

``` text
CATALOG_VERSION
QUERY_PANEL_VERSION
ATTRIBUTION_RULE_VERSION
SIMULATION_VERSION
EXPERIMENT_VERSION
RANDOM_SEED
```

Then the headline can internally be reproduced as:

``` text
Catalyst run
catalog=v3
queries=v2
rules=v4
simulation=v1
seed=42
```

You do not need to display this in the main dashboard, but it should
exist in the backend.

------------------------------------------------------------------------

# 17. Recommended frontend interaction model

The dashboard should feel like an agent operating a workflow, not a
static analytics page.

### State 1 --- Opportunity found

``` text
Catalyst found an opportunity

Competitor A is recommended 11/20 times.
Your store: 3/20.

[See why]
```

### State 2 --- Fix proposed

``` text
Catalyst proposes a fix

7 attributes + 5 FAQs + Product schema

[Review changes]
```

### State 3 --- Waiting for merchant

``` text
Awaiting your approval

[Reject] [Approve & Deploy]
```

### State 4 --- Experiment running

``` text
Testing approved change...

Control vs Treatment
```

### State 5 --- Result

``` text
+₹X incremental AI GMV

Controlled simulation result
```

This makes the agent's lifecycle visually obvious.

------------------------------------------------------------------------

# 18. Demo sequence

The strongest five-beat sequence is:

## Beat 1 --- Discover

Show:

> **AI recommendation share: 3%**

vs.

> **Competitor A: 55%**

Click into one query.

## Beat 2 --- Explain

Show the evidence gap:

> Competitor has 11 attributes, 312 detailed reviews and 18 FAQs.

> Merchant has 5 attributes, 18 reviews and 3 FAQs.

## Beat 3 --- Act

Click:

> **Generate Fix**

Show the actual diff.

Click:

> **Approve & Deploy**

## Beat 4 --- Prove

Show:

``` text
CONTROL       TREATMENT

₹X GMV        ₹Y GMV

Incremental AI GMV
+₹Z
```

with:

> **Controlled simulation result**

## Beat 5 --- Don't overclaim

Open one suspicious session:

``` text
Referrer: AI domain ✓
Query match: ✓
Behavior: ✗
Spoof indicator: ✓

Decision: REJECTED
GMV excluded: ₹2,500
```

Then say:

> "Catalyst would rather undercount than falsely claim revenue."

That is a stronger ending than another chart.

------------------------------------------------------------------------

# 19. What not to build

Do not spend hackathon time on:

-   production authentication;
-   multi-tenant infrastructure;
-   Kubernetes/Docker orchestration;
-   background queues;
-   elaborate ML attribution models;
-   custom vector databases;
-   real-time streaming;
-   generic chatbot UI;
-   dozens of agent tools;
-   ten types of merchant fixes.

The existing engineering guide already deliberately keeps the stack
simple. Preserve that constraint.

------------------------------------------------------------------------

# 20. What the agent actually demonstrates

A judge should be able to identify these four properties:

### Perception

Catalyst observes AI shopping results and merchant/competitor data.

### Reasoning

Catalyst explains the evidence gap and chooses a bounded intervention.

### Action

Catalyst generates a merchant-reviewable change and applies it only
after approval.

### Verification

Catalyst evaluates the outcome using deterministic attribution and
controlled payment simulation.

That is the complete agentic loop.

------------------------------------------------------------------------

# 21. Final implementation priority

If time becomes tight, prioritize in this order:

**P0 --- Must work**

1.  Synthetic catalog
2.  Query/shopping-engine simulator
3.  Diagnosis
4.  Fix diff + approval
5.  Session generator
6.  Deterministic attribution
7.  Control/treatment experiment
8.  Real dashboard connected to API

**P1 --- Strong differentiators**

9.  Held-out attribution evaluation
10. Spoof-rejection panel
11. Agent event/audit trail
12. Evidence provenance on each fix

**P2 --- Nice to have**

13. More query categories
14. Multiple fix types
15. Polished animations
16. Additional charts

If forced to choose between visual polish and attribution rigor, choose
attribution rigor.

------------------------------------------------------------------------

# 22. Definition of done

Catalyst is demo-ready only when all of these are true:

-   [ ] Gemini can inspect evidence and produce a valid diagnosis.
-   [ ] Gemini can produce a schema-valid bounded `FixDiff`.
-   [ ] Unsupported/invented facts are rejected by backend validation.
-   [ ] A diff cannot be applied without merchant approval.
-   [ ] The same run is reproducible from the same seed and cached LLM
    outputs.
-   [ ] Attribution runs without an LLM.
-   [ ] Attribution metrics are calculated on held-out data.
-   [ ] Treatment/control share the same underlying simulation process.
-   [ ] Incremental GMV is calculated from treatment minus control.
-   [ ] Every experimental GMV display says "Controlled simulation
    result."
-   [ ] At least one spoofed session is correctly surfaced and excluded.
-   [ ] The dashboard uses backend-generated values, not hardcoded demo
    numbers.
-   [ ] Refreshing the page preserves state.
-   [ ] The complete demo can be run from a clean generated-data
    directory.

------------------------------------------------------------------------

## Final rule

**Catalyst should never win the demo by pretending its numbers are more
certain than they are.**

The product's credibility comes from the opposite behavior:

> **It shows its evidence, gates its actions, measures its own errors,
> and only counts revenue it can defend.**

That is the engineering quality bar this companion document is intended
to enforce.
