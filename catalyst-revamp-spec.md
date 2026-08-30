# Catalyst — Product UX & Agentic Revamp Specification

**Document:** `catalyst-revamp-spec.md`
**Purpose:** Replace the current analytics-heavy Catalyst dashboard with a focused, agent-first merchant experience while preserving the existing backend, experiment engine, attribution system, safety gates, and technical proof surfaces.

---

# 1. Executive Direction

Catalyst currently has the **right underlying engineering**, but the product experience exposes too much of that engineering at once.

The current experience communicates:

> "Here is an analytics platform with AI features."

The new experience must communicate:

> **"Give Catalyst your store. It finds the biggest AI-commerce opportunity, decides what should be done, asks for approval, does it, and shows you whether it worked."**

The redesign therefore changes the product from:

```text
Dashboard
→ Metrics
→ Opportunities
→ Diagnosis
→ Fix
→ Experiments
→ Attribution
→ Audit
```

to:

```text
CONNECT
   ↓
OBSERVE
   ↓
DISCOVER
   ↓
DIAGNOSE
   ↓
PROPOSE
   ↓
APPROVE
   ↓
ACT
   ↓
MEASURE
   ↓
PROVE
```

The existing technical systems remain underneath this experience.

---

# 2. Core Product Principle

## Catalyst should behave like an employee, not an analytics dashboard.

A merchant should not have to understand:

* AI attribution
* recommendation share
* schema.org
* query panels
* A/B experiment mechanics
* spoof detection
* confidence scores
* control/treatment methodology

to use Catalyst.

Catalyst should understand those things **for them**.

The merchant should primarily see:

1. **What did you find?**
2. **Why does it matter?**
3. **What do you want to do?**
4. **What exactly will change?**
5. **Can I approve it?**
6. **Did it work?**
7. **Can I trust that result?**

---

# 3. UX North Star

### The entire product should feel like one continuous agent interaction.

The ideal mental model:

```text
        Merchant
           │
           │ "Analyze my store"
           ▼
      ┌───────────┐
      │ CATALYST   │
      │            │
      │ observes   │
      │ reasons    │
      │ proposes   │
      │ acts       │
      │ measures   │
      └─────┬─────┘
            │
            ▼
       Merchant only
       intervenes when
       approval is needed
```

The agent does the work.

The merchant makes decisions.

---

# 4. New Information Hierarchy

The existing UI shows too many numbers simultaneously.

This must change.

## Rule: One primary message per screen.

Numbers become supporting evidence rather than the product itself.

### Discovery

Primary information:

> **AI buyers are choosing your competitor.**

Supporting:

> Catalyst found a product-information gap.

No giant KPI wall.

---

### Diagnosis

Primary information:

> **Your product isn't giving AI shoppers enough evidence to choose it.**

Supporting:

> Catalyst identified the missing information.

---

### Fix

Primary information:

> **I can fix this using information already in your catalog.**

Supporting:

> Show the exact changes.

---

### Result

Primary information:

> **+₹1.50L**

Supporting:

> Controlled simulation result.

---

### Trust

Primary information:

> **Catalyst excluded suspicious traffic.**

Supporting:

> Show the technical attribution evidence.

---

# 5. New Application Structure

Replace the current top-level navigation:

```text
Overview
Opportunities
Fix & Approve
Experiments
Attribution & Spoof
Agent Audit
Catalog & Data
```

with:

```text
Catalyst
Store
Activity
Proof
```

Potentially:

```text
Catalyst
Store
Activity
Proof
Settings
```

## Catalyst

The primary agent experience.

This is where almost all merchant activity occurs.

## Store

Connected storefront and product state.

## Activity

What Catalyst is currently doing / has done.

## Proof

Technical evidence for merchants and judges.

This contains:

* Experiment
* Attribution
* Spoof detection
* Evaluation
* Audit trail
* Catalog evidence

The technical system remains intact, but it is **progressively disclosed**.

---

# 6. First-Time Onboarding

The first screen must be extremely simple.

## Screen

```text
                         Catalyst

              Make your store easier
                 for AI to sell.

       Connect your storefront and I'll
       find the biggest opportunity.

       ┌─────────────────────────────────┐
       │ https://yourstore.com            │
       └─────────────────────────────────┘

                 [ Analyze my store ]

       No changes will be made without
                 your approval.
```

### Important

The merchant should immediately understand:

* what Catalyst does
* what they need to provide
* that Catalyst won't modify anything without approval

No dashboard yet.

---

# 7. Demo Store Onboarding

For the buildathon, support:

```text
Apex Outdoor (Demo)
```

The URL can resolve to the connected dummy storefront.

The UI should visibly say:

> **Connected store: Apex Outdoor · Demo**

Do not pretend it is a real merchant.

---

# 8. Analysis Experience

After clicking:

**Analyze my store**

do not immediately show the dashboard.

Show Catalyst working.

## Agent Activity

```text
Catalyst

Analyzing Apex Outdoor...

✓ Connected to storefront
✓ Read product catalog
✓ Identified high-intent products
✓ Checked AI shopping demand
✓ Compared competitor evidence
● Finding the highest-impact opportunity...
```

The final step resolves:

```text
✓ Opportunity found
```

Then transition into the result.

---

# 9. Agent Result — The New Home Screen

The result should look almost conversational.

```text
Good morning, Apex Outdoor.

I found something worth fixing.

AI shoppers are choosing another boot
brand more often.

I found a product-information gap that
may be contributing to this.

I've prepared a fix using information
already present in your catalog.

                  [ Review Fix → ]
```

Optional subtle metadata:

> Analyzed your storefront and high-intent shopping demand.

Do **not** immediately show:

* 3/20
* 11/20
* 55%
* ₹1.5L
* 100% precision
* 348 spoofed sessions

Those belong later.

---

# 10. Why This Matters

When the merchant clicks:

**Review Fix**

show the reasoning in natural language.

```text
Why I found this

AI shopping assistants have more useful
information to compare on your competitor's
product page.

Your product already contains some of the
information — it just isn't exposed clearly
enough.

I found 5 missing pieces I can safely add.
```

Then:

> **Evidence**

collapsed by default.

Opening it reveals:

```text
Your product
5 useful attributes

Competitor
11 useful attributes

Missing:
• Waterproof rating
• Product weight
• Outsole specification
• Traction
• Terrain suitability
```

The numbers are now **evidence**, not the headline.

---

# 11. Agentic Fix Experience

This is the most important screen.

Catalyst says:

> **I can fix this.**

Then:

```text
Apex Ridge Waterproof Boots

I'll update:

✓ Product attributes
✓ Product structured data
✓ Pre-purchase FAQs

I won't invent new product claims.
Everything below is verified against
your existing catalog.

             [ Review changes ]
```

---

# 12. Fix Diff

The diff should be visually understandable without technical knowledge.

## Before

```text
Waterproof hiking boots.
Rubber sole.
```

## Catalyst proposes

```text
+ IPX7 waterproofing
+ 420g weight
+ Vibram MegaGrip outsole
+ 5mm traction lugs
+ Monsoon trekking suitability
```

Then:

```text
+ Add structured product data
+ Add relevant FAQs
```

Technical JSON-LD remains available through:

> **View technical changes**

Do not make JSON-LD the primary interface.

---

# 13. Safety Gate

The UI should explicitly communicate the safety mechanism.

```text
✓ All proposed claims verified
✓ No unsupported specifications
✓ Only approved fields will change
✓ Nothing will be published automatically
```

Then:

# **[ Approve & Deploy ]**

Secondary:

**Reject**

If rejected:

> I'll reassess the opportunity and propose another approach.

This makes the agent's autonomy **bounded**, rather than uncontrolled.

---

# 14. Agent State Machine

The backend state machine should map directly to the UI.

```text
OBSERVE
   ↓
DIAGNOSE
   ↓
PROPOSE
   ↓
WAITING_FOR_APPROVAL
   ↓
APPLY
   ↓
EXPERIMENT
   ↓
VERIFY
   ↓
COMPLETE
```

The merchant should see a simplified version:

```text
Found
  ↓
Prepared
  ↓
Waiting for you
  ↓
Applied
  ↓
Measuring
  ↓
Result
```

Technical state names remain in **Proof → Agent Audit**.

---

# 15. After Approval

After the merchant clicks Approve:

```text
Applying your fix...

✓ Product information updated
✓ Structured data updated
✓ FAQs updated

Your storefront has been updated.
```

Then:

# **Fix deployed**

> I'll now test the improved store against the unchanged version.

Button:

**[ See updated store → ]**

---

# 16. Connected Storefront

The dummy Apex storefront should genuinely respond to the Catalyst state.

## Before

```text
Apex Ridge Waterproof Boots

Waterproof hiking boots.
Rubber sole.

₹3,499

[Buy Now]
```

## After

```text
Apex Ridge Waterproof Boots

IPX7 Waterproof
420g Lightweight
Vibram MegaGrip Outsole
5mm Multi-Directional Lugs
Monsoon Trekking Ready

₹3,499

[Buy Now]
```

Also expose:

```text
✓ Machine-readable
✓ Verified specifications
✓ Catalyst Enhanced
```

This is one of the strongest visual demonstrations.

---

# 17. Experiment Should Be Agent-Initiated

Do not make the merchant navigate to an Experiments page.

After deployment:

```text
Catalyst

The fix is live.

I'm going to compare the unchanged
store against the improved version
using the same simulated demand.

[ Running experiment... ]
```

Progress:

```text
✓ Control traffic generated
✓ Treatment traffic generated
✓ AI recommendation outcomes measured
✓ Orders evaluated
✓ Suspicious referrals checked
```

Then:

> **Experiment complete.**

---

# 18. Revenue Result

This is where the first major number appears.

## Result screen

```text
Did it work?

             +₹1.50L

     incremental GMV

Controlled simulation result

The improved catalog generated more
verified AI-attributed GMV than the
unchanged catalog.

              [ See the proof ]
```

The number is the **payoff**, not one of 15 KPIs on the home page.

---

# 19. Progressive Disclosure

Clicking:

**See the proof**

reveals:

```text
Control
₹1.20L

Treatment
₹2.70L

Incremental
+₹1.50L
```

Then:

> **How was this measured?**

Expandable.

```text
Same underlying traffic
Same baseline conditions
Different catalog treatment
Deterministic attribution
```

Then:

> **Attribution integrity**

Expandable.

```text
Verified sessions
Ambiguous sessions
Rejected sessions
Spoofed GMV excluded
```

This preserves all your technical work without overwhelming the merchant.

---

# 20. Spoof Detection

The spoof system becomes a **trust moment**, not a dashboard metric.

Catalyst can say:

> **I rejected suspicious traffic.**

```text
One session appeared to come from an
AI shopping assistant, but its behavior
didn't match a genuine AI referral.

Catalyst excluded it from the revenue
calculation rather than overclaiming.

[ Inspect session ]
```

Then expose the five signals.

This is a great judge-facing moment.

---

# 21. The "Rather Undercount" Principle

Make this a recurring product principle:

> **Catalyst would rather undercount than falsely claim revenue.**

Use it specifically around attribution.

Do not plaster it everywhere.

It should appear when Catalyst rejects suspicious traffic.

---

# 22. Proof Mode

Create a dedicated **Proof** area.

It contains the technical machinery already built.

```text
PROOF

Experiment
────────────────
Control vs Treatment
Incremental GMV
Recommendation lift

Attribution
────────────────
Verified / Ambiguous / Rejected
5-signal classifier

Integrity
────────────────
Spoof rejection
Held-out evaluation
False-positive GMV

Agent Audit
────────────────
Agent decisions
Tool calls
Approval events
State transitions

Catalog
────────────────
Control / Treatment / Competitor
```

This becomes the place where a judge can say:

> "Okay, show me how this actually works."

---

# 23. Agent Activity

Create a dedicated Activity view.

Example:

```text
CATALYST ACTIVITY

Today

11:42
Analyzed storefront
✓

11:43
Found product evidence gap
✓

11:43
Prepared bounded fix
✓

11:44
Waiting for merchant approval
●

11:45
Fix deployed
✓

11:46
Experiment started
✓

11:47
Revenue verified
✓
```

Each event can expand into technical detail.

---

# 24. Agent Identity

Catalyst should feel like a persistent agent.

Header:

```text
⚡ Catalyst

AI Commerce Revenue Agent

● Working
```

When idle:

```text
⚡ Catalyst

AI Commerce Revenue Agent

● Ready
```

During analysis:

```text
⚡ Catalyst

AI Commerce Revenue Agent

● Analyzing your store
```

During deployment:

```text
⚡ Catalyst

AI Commerce Revenue Agent

● Applying approved fix
```

This reinforces that Catalyst is **doing work**, rather than displaying data.

---

# 25. Agent Reasoning UI

Do not expose chain-of-thought.

Instead expose **action summaries**.

Bad:

> Gemini thinks the competitor is probably better because...

Good:

> **I compared product evidence across competing listings.**

Bad:

> Model confidence 87.2%.

Good:

> **Verified against your product catalog.**

Bad:

> LLM reasoning trace...

Good:

> **Why I made this recommendation**

Then show concise evidence.

---

# 26. LLM Responsibilities

Gemini remains the reasoning layer.

It can:

```text
inspect_catalog
↓
interpret shopping evidence
↓
diagnose_gap
↓
generate_fix_diff
↓
explain_fix
```

It must **not** own:

```text
payment truth
GMV arithmetic
attribution scoring
approval state
experiment arithmetic
```

Those remain deterministic backend responsibilities.

This separation should remain exactly as it is.

---

# 27. Agent Tool Architecture

Expose tools conceptually as:

```text
inspect_store()
inspect_catalog()
find_opportunities()
query_ai_shopping()
compare_competitors()
diagnose_gap()
generate_fix()
validate_fix()
request_approval()
apply_fix()
run_experiment()
verify_revenue()
```

Gemini chooses the appropriate action.

The backend enforces permissions.

Example:

```text
Gemini:
"Apply this catalog change."

Backend:
Is this change allowed?
       ↓
Does source evidence support it?
       ↓
Has merchant approved it?
       ↓
YES → apply
NO  → block
```

This is the actual **agentic control loop**.

---

# 28. Agent Permissions

Catalyst should have explicit permissions.

### Can do automatically

* inspect catalog
* analyze opportunities
* query AI shopping scenarios
* compare evidence
* draft fixes
* validate proposed fixes
* run simulations

### Requires merchant approval

* modify storefront
* publish catalog changes

### Backend-controlled

* calculate GMV
* classify attribution
* reject spoofed sessions
* determine experiment arithmetic

This makes "agentic" concrete.

---

# 29. Dummy Store Architecture

The storefront should be state-driven.

```text
STORE_STATE =

CONTROL
    ↓
APPROVED
    ↓
TREATMENT
```

The Catalyst approval action changes the state.

The storefront reads that state.

Therefore:

```text
Catalyst Approve
       ↓
Backend
       ↓
Store state = treatment
       ↓
Storefront changes
```

No fake animation should be responsible for the actual state change.

---

# 30. Reset

Keep:

**Reset Demo**

but move it into:

> Settings / Demo Controls

or make it a small secondary control.

After reset:

```text
Catalyst
→ Store returns to baseline
→ Fix returns to proposed
→ Experiment resets
→ Attribution dataset resets
→ Demo starts again
```

This is essential for live judging.

---

# 31. Visual Design

Use the newly designed:

## Deep Slate + Ice Blue

The goal is:

**premium + calm + data-dense + low fatigue**

Avoid:

* neon blue
* excessive gradients
* glowing borders
* colorful KPI cards
* rainbow charts
* excessive shadows

### Primary palette

```text
Background       #080F15
Surface 1        #11161D
Surface 2        #161C24
Surface 3        #1D2430

Border           #242C38

Text Primary     #E6EAF0
Text Secondary   #A1ABB8
Text Muted       #687280

Primary          #4DA3FF
Primary Hover    #6EB6FF

Success          #22C55E
Success Soft     #34D399

Warning          #F59E0B
Danger           #EF4444
Info             #38BDF8
```

However, accents should be **used sparingly**.

---

# 32. Color Rules

### Blue

Only for:

* primary action
* current agent state
* selected navigation
* important interactive elements

### Green

Only for:

* successful action
* verified
* deployed
* healthy

### Amber

Only for:

* warning
* needs attention

### Red

Only for:

* error
* rejected
* dangerous action

Never use colors simply to make KPI cards more exciting.

---

# 33. Typography

Use a clean modern sans-serif.

Recommended:

```text
Inter
```

Hierarchy:

```text
Page title       28–32px
Agent message    22–28px
Section heading  18–20px
Body             14–16px
Metadata         12–13px
Numbers          28–40px
```

Numbers should be highly readable.

Do not use overly futuristic monospace typography everywhere.

Monospace only for:

* IDs
* technical values
* JSON
* logs
* hashes

---

# 34. Motion

Use motion to communicate **state**, not decoration.

Good:

```text
Analyzing
  ●
  ●
  ●
```

Good:

> Fix deployed ✓

Good:

> Experiment running...

Avoid:

* constant animated charts
* pulsing cards
* glowing borders
* excessive transitions

---

# 35. Dashboard Reduction

The current Overview dashboard should be removed as the default landing page.

Do not display:

```text
₹0.46L
+₹0.28L
+9.6 pts
+148.4%
100%
4 opportunities
```

simultaneously.

Instead:

```text
I found something worth fixing.

AI buyers are choosing another product.

[ Review opportunity ]
```

The dashboard data still exists under Proof.

---

# 36. Numbers Policy

A number must answer a question.

### Bad

> 17.8%

with no context.

### Good

> **+₹1.50L**
>
> Incremental GMV in controlled simulation.

### Bad

> 100%

### Good

> **Attribution integrity**
>
> No false-positive GMV in held-out evaluation.

Every displayed number should have an explanation.

---

# 37. Demo Flow

The live judge demo should take approximately:

## Beat 1 — Connect

> "I give Catalyst my store."

Paste URL.

Click:

**Analyze my store**

---

## Beat 2 — Discover

Catalyst works visibly.

Then:

> **I found something worth fixing.**

---

## Beat 3 — Diagnose

Catalyst explains:

> AI shoppers are choosing the competitor because your product doesn't expose enough useful evidence.

Click:

**Review Fix**

---

## Beat 4 — Act

Catalyst presents the bounded change.

> "Everything I'm adding already exists in your catalog."

Judge clicks:

**Approve & Deploy**

---

## Beat 5 — Show the Store

Open Apex Outdoor.

The product has changed.

> "The agent actually modified the connected storefront."

---

## Beat 6 — Measure

Catalyst automatically runs the experiment.

Then:

# **+₹1.50L**

> Controlled simulation result.

---

## Beat 7 — Trust

Catalyst:

> "I also rejected suspicious AI traffic rather than counting it as revenue."

Show one spoofed session.

**REJECTED.**

End.

---

# 38. What the Judge Should Remember

After the demo, the judge should be able to summarize Catalyst in one sentence:

> **"It finds why AI isn't recommending a merchant, fixes the underlying product evidence with approval, and connects that intervention to measurable payment outcomes."**

If they instead remember:

> "It had a dashboard with AI visibility, attribution, experiments and 40 queries..."

the UX has failed.

---

# 39. What NOT to Build

Do not add:

* WhatsApp recovery
* generic email campaigns
* coupon optimization
* UPI vs card optimization
* generic SEO dashboard
* generic AI chatbot
* generic merchant analytics
* another recommendation engine
* complex CRM
* full ecommerce backend
* elaborate multi-agent architecture

These dilute the thesis and overlap with existing Razorpay capabilities.

Catalyst's wedge remains:

> **AI discovery → merchant intervention → controlled measurement → payment-grounded proof**

---

# 40. What to Preserve From Current Build

Do **not** throw away the existing engineering.

Preserve:

### Data

* 12-SKU catalog
* thin/rich/competitor states
* query panel
* synthetic sessions
* ground truth

### Agent

* Gemini integration
* bounded tools
* fix generation
* evidence verification

### Safety

* merchant approval
* state transitions
* audit events

### Attribution

* 5-signal classifier
* spoof rejection
* held-out evaluation

### Experiment

* treatment/control
* deterministic simulation
* incremental GMV

### Storefront

* Apex Outdoor
* actual treatment state
* Razorpay checkout simulation

### Testing

* existing 12 tests
* leakage guard
* classifier evaluation
* API tests

The revamp is **primarily an experience-layer transformation**, not a rewrite of the backend.

---

# 41. Final Architecture

```text
                         ┌─────────────────────┐
                         │      MERCHANT       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                     ┌──────────────────────────┐
                     │      CATALYST UI         │
                     │                          │
                     │  Connect → Discover      │
                     │  Diagnose → Approve      │
                     │  Act → Measure → Prove   │
                     └────────────┬─────────────┘
                                  │
                                  ▼
                     ┌──────────────────────────┐
                     │    CATALYST AGENT        │
                     │                          │
                     │      Gemini Flash        │
                     │                          │
                     │ inspect → diagnose       │
                     │ propose → explain        │
                     └────────────┬─────────────┘
                                  │
                     bounded tool calls
                                  │
                                  ▼
              ┌──────────────────────────────────────┐
              │          FASTAPI CONTROL PLANE       │
              │                                      │
              │ permissions / validation / state     │
              └───────────────┬──────────────────────┘
                              │
          ┌───────────────────┼─────────────────────┐
          ▼                   ▼                     ▼
   Diagnosis Engine     Safety Gate          Experiment Engine
                              │                     │
                              ▼                     ▼
                       Storefront State       Control/Treatment
                                                    │
                                                    ▼
                                          Attribution Engine
                                                    │
                                                    ▼
                                              Razorpay GMV
                                                    │
                                                    ▼
                                            Proof Experience
```

---

# 42. The Final Product Loop

The entire Catalyst experience should ultimately collapse to this:

```text
                 CONNECT STORE
                      ↓
               "I'm analyzing..."
                      ↓
              I FOUND A PROBLEM
                      ↓
              "Here's why."
                      ↓
              "Here's my fix."
                      ↓
               [ APPROVE ]
                      ↓
               FIX DEPLOYED
                      ↓
             "I'll measure it."
                      ↓
                EXPERIMENT
                      ↓
                +₹ GMV
                      ↓
              "Here's the proof."
```

### The fundamental redesign decision

**Catalyst should not show the merchant everything it knows.**

It should show the merchant **what matters now**, while keeping the underlying analytics, attribution, experiment methodology, agent trace, and evaluation available as proof.

That is the change that turns the current implementation from **"a very impressive analytics dashboard"** into **"an AI commerce agent that actually works on behalf of the merchant."**
