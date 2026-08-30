import random
import csv
import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Literal
from backend.config import settings, BASE_DIR
from backend.models.session import Session
from backend.generators.catalog_generator import load_catalog, load_query_panel
from backend.generators.noise import get_random_ai_domain, get_random_organic_referrer, get_random_spoofed_referrer

GEN_DIR = BASE_DIR / "data" / "generated"

def generate_sessions_for_arm(
    arm: Literal["control", "treatment"],
    recommendation_rate: float,
    traffic_volume: int,
    seed: int,
    split: Literal["tuning", "heldout"]
) -> list[Session]:
    rng = random.Random(seed)
    queries = load_query_panel()
    catalog_state = "thin" if arm == "control" else "rich"
    catalog = load_catalog(catalog_state)
    prod_map = {p.product_id: p for p in catalog}
    prod_ids = list(prod_map.keys())
    
    sessions: list[Session] = []
    base_time = datetime(2026, 8, 20, 9, 0, 0)
    session_counter = 0

    # 1. AI_GENUINE sessions (driven by recommendation rate across queries)
    # Number of shopping sessions attempted
    ai_traffic_target = int(traffic_volume * 0.40)
    for i in range(ai_traffic_target):
        query = rng.choice(queries)
        cat_prods = [p for p in catalog if p.category == query.get("category")]
        landing_p = rng.choice(cat_prods) if cat_prods else rng.choice(catalog)
        
        # Did AI actually recommend the merchant for this user session?
        if rng.random() < recommendation_rate:
            session_counter += 1
            session_id = f"sess-{arm[:3]}-{split[:4]}-gen-{session_counter:05d}"
            timestamp = base_time + timedelta(seconds=rng.randint(0, 86400 * 7))
            
            # Direct AI referral behavior (high intent) with 10% realistic noise
            behavior = "direct" if rng.random() > 0.10 else "generic"
            timing_ok = rng.random() > 0.08
            
            # Purchase probability for genuine AI referral (~15-18% conversion rate)
            converted = rng.random() < (0.165 if arm == "treatment" else 0.140)
            order_val = None
            if converted:
                order_val = float(landing_p.price)
            
            sessions.append(Session(
                session_id=session_id,
                query_id=query["query_id"],
                query_text=query["query_text"],
                referrer=get_random_ai_domain(rng),
                landing_product_id=landing_p.product_id,
                landing_product_name=landing_p.name,
                timestamp=timestamp,
                behavior_signal=behavior,
                timing_consistent=timing_ok,
                ground_truth_label="AI_GENUINE",
                split=split,
                arm=arm,
                converted=converted,
                order_value=order_val
            ))

    # 2. ORGANIC sessions (identical baseline distribution across both arms)
    organic_count = int(traffic_volume * 0.45)
    for i in range(organic_count):
        session_counter += 1
        session_id = f"sess-{arm[:3]}-{split[:4]}-org-{session_counter:05d}"
        landing_p = rng.choice(catalog)
        timestamp = base_time + timedelta(seconds=rng.randint(0, 86400 * 7))
        
        # Organic behavior
        behavior = "generic" if rng.random() > 0.35 else "direct"
        converted = rng.random() < 0.055  # ~5.5% organic baseline conversion
        order_val = float(landing_p.price) if converted else None
        
        sessions.append(Session(
            session_id=session_id,
            query_id=None,
            query_text=None,
            referrer=get_random_organic_referrer(rng),
            landing_product_id=landing_p.product_id,
            landing_product_name=landing_p.name,
            timestamp=timestamp,
            behavior_signal=behavior,
            timing_consistent=True,
            ground_truth_label="ORGANIC",
            split=split,
            arm=arm,
            converted=converted,
            order_value=order_val
        ))

    # 3. AI_SPOOFED sessions (malicious or scrapers pretending to be AI referrers)
    spoofed_count = int(traffic_volume * 0.15)
    for i in range(spoofed_count):
        session_counter += 1
        session_id = f"sess-{arm[:3]}-{split[:4]}-spf-{session_counter:05d}"
        landing_p = rng.choice(catalog)
        timestamp = base_time + timedelta(seconds=rng.randint(0, 86400 * 7))
        
        # Mismatched query or fake query parameter
        invalid_query = rng.choice(queries) if rng.random() > 0.4 else None
        invalid_query_id = invalid_query["query_id"] if invalid_query else "invalid-q99"
        invalid_query_text = invalid_query["query_text"] if invalid_query else "cheap counterfeit shoes"
        
        # Spoofed behavioral signals (mostly generic bounce, inconsistent timing)
        behavior = "generic" if rng.random() > 0.12 else "direct"
        timing_ok = rng.random() > 0.75  # 75% timing mismatch
        
        # Bot/spoof conversion is low or simulated chargeback/bogus order
        converted = rng.random() < 0.04
        order_val = float(landing_p.price) if converted else None

        sessions.append(Session(
            session_id=session_id,
            query_id=invalid_query_id,
            query_text=invalid_query_text,
            referrer=get_random_spoofed_referrer(rng),
            landing_product_id=landing_p.product_id,
            landing_product_name=landing_p.name,
            timestamp=timestamp,
            behavior_signal=behavior,
            timing_consistent=timing_ok,
            ground_truth_label="AI_SPOOFED",
            split=split,
            arm=arm,
            converted=converted,
            order_value=order_val
        ))

    return sessions

def generate_all_datasets(seed: int = 42) -> dict:
    GEN_DIR.mkdir(parents=True, exist_ok=True)
    
    # Recommendation rates measured empirically from trials (thin ~0.082, rich ~0.178)
    thin_rate = 0.082
    rich_rate = 0.178
    
    # Generate Tuning Split (used for tuning classifier signals)
    tuning_control = generate_sessions_for_arm("control", thin_rate, settings.SESSIONS_TUNING_COUNT, seed + 101, "tuning")
    tuning_treatment = generate_sessions_for_arm("treatment", rich_rate, settings.SESSIONS_TUNING_COUNT, seed + 102, "tuning")
    all_tuning = tuning_control + tuning_treatment
    
    # Generate Held-out Split (strictly evaluated once, leak-proof)
    heldout_control = generate_sessions_for_arm("control", thin_rate, settings.SESSIONS_HELDOUT_COUNT, seed + 201, "heldout")
    heldout_treatment = generate_sessions_for_arm("treatment", rich_rate, settings.SESSIONS_HELDOUT_COUNT, seed + 202, "heldout")
    all_heldout = heldout_control + heldout_treatment
    
    # Save CSVs
    def save_csv(sessions: list[Session], filename: str):
        filepath = GEN_DIR / filename
        with open(filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "session_id", "query_id", "query_text", "referrer", "landing_product_id",
                "landing_product_name", "timestamp", "behavior_signal", "timing_consistent",
                "ground_truth_label", "split", "arm", "converted", "order_value"
            ])
            for s in sessions:
                writer.writerow([
                    s.session_id, s.query_id or "", s.query_text or "", s.referrer,
                    s.landing_product_id, s.landing_product_name or "", s.timestamp.isoformat(),
                    s.behavior_signal, 1 if s.timing_consistent else 0, s.ground_truth_label,
                    s.split, s.arm, 1 if s.converted else 0, s.order_value or ""
                ])
                
    save_csv(all_tuning, "sessions_tuning.csv")
    save_csv(all_heldout, "sessions_heldout.csv")
    
    return {
        "tuning_sessions": all_tuning,
        "heldout_sessions": all_heldout,
        "control_sessions": tuning_control + heldout_control,
        "treatment_sessions": tuning_treatment + heldout_treatment
    }
