# 🎙️ Catalyst — 5-Beat Pitch & Demo Script (Timed for 3 Minutes)

**Product:** Catalyst — AI Commerce Revenue Agent  
**Tagline:** Turn AI discovery into measurable revenue.  
**Stack:** FastAPI + SQLite + React + Vite + Tailwind CSS + Gemini 3.5 Flash  

---

## ⏱️ 0:00 - 0:35 — Beat 1: Discover (The Problem)

> *"Right now, millions of consumers ask AI shopping engines: 'What are the best waterproof hiking boots under ₹5,000?'*
> 
> *Our merchant only appears in 3 out of 20 queries (15% win rate). Competitor A appears in 11 out of 20 queries (55% win rate).*
> 
> *Traditional SEO tools cannot fix this because AI shopping engines do not care about backlinks — they parse structured machine-readable product evidence."*

👉 **Action on screen:** Open **Opportunities / Diagnosis** tab. Point to the query comparison table showing `3/20` vs `11/20`.

---

## ⏱️ 0:35 - 1:15 — Beat 2: Explain / Diagnose (The Evidence Gap)

> *"Catalyst doesn't just give a vague SEO score. Powered by Gemini 3.5 Flash, it compares the exact evidentiary tokens:*
> 
> *Competitor A provides **11 machine-readable attributes** (IPX7 15,000mm waterproofing, Vibram MegaGrip sole, 420g weight, wide toe-box fit), **312 detailed customer reviews**, and **valid Schema.org JSON-LD**.*
> 
> *Our merchant catalog only provides 5 generic attributes, 18 reviews, and missing structured schemas. The AI literally doesn't have the proof it needs to recommend our store."*

👉 **Action on screen:** Show the side-by-side evidence breakdown cards.

---

## ⏱️ 1:15 - 1:55 — Beat 3: Act / Fix (Bounded Agent Action & Safety)

> *"Catalyst doesn't just diagnose; it acts. The agent formulates a bounded FixDiff containing 6 verified attributes, Schema.org JSON-LD, and pre-purchase FAQs.*
> 
> *Notice our safety architecture: our deterministic backend validates every claim against real product specs before proposing. Zero hallucinations. And the agent **never silently deploys** — it presents the diff for merchant review.*
> 
> *I click **Approve & Deploy**."*

👉 **Action on screen:** Click **"Propose Bounded Fix"**, show the green diff with Schema.org & FAQs, and click **"Approve & Deploy"**.

---

## ⏱️ 1:55 - 2:35 — Beat 4: Prove Revenue (Controlled Experiment)

> *"Now Catalyst proves causation through a controlled A/B simulation against the exact same baseline consumer traffic.*
> 
> *In the Control arm (original catalog), AI recommendation share was 8.2%, yielding ₹1.20L.*
> *In the Treatment arm (Catalyst fix), recommendation share jumped to 17.8%, yielding ₹2.70L.*
> 
> *That is **+₹1.50L of Verified Incremental AI GMV** (+125% lift).*
> *And notice our commitment on every screen: **'Controlled simulation result'** — we only report what we measure."*

👉 **Action on screen:** Switch to **Experiments** tab. Point to the `+₹1.50L` Hero GMV badge and the side-by-side comparison chart.

---

## ⏱️ 2:35 - 3:00 — Beat 5: Trust (Spoof Rejection & Final Punchline)

> *"Finally, how do we prevent false claims? A scraper hits our store with a faked `chatgpt.com` referrer and buys a ₹2,500 pair of boots.*
> 
> *Our deterministic 5-signal classifier inspects the session: AI domain ✓, but query match ✗, timing anomaly ✗, spoof signature penalty: -2.*
> *Decision: **REJECTED**. The ₹2,500 is completely excluded from our headline GMV.*
> 
> *On our held-out test split, Catalyst achieved **100.0% attribution precision**.*
> 
> ***Catalyst would rather undercount than falsely claim revenue.***
> *Thank you."*

👉 **Action on screen:** Switch to **Attribution & Spoof** tab. Click on `Session #sess-tre-held-spf-00142` to show the -2 penalty and `REJECTED` status.
