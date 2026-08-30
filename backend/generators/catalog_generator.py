import json
from pathlib import Path
from typing import Literal
from backend.models.product import Product
from backend.config import BASE_DIR

SEED_DIR = BASE_DIR / "data" / "seed"

def load_catalog(state: Literal["thin", "rich", "competitor"]) -> list[Product]:
    filename_map = {
        "thin": "merchant_catalog_thin.json",
        "rich": "merchant_catalog_rich.json",
        "competitor": "competitor_catalog.json"
    }
    file_path = SEED_DIR / filename_map[state]
    if not file_path.exists():
        raise FileNotFoundError(f"Catalog file not found: {file_path}")
    
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    products = [Product(**item) for item in data]
    return products

def load_query_panel() -> list[dict]:
    file_path = SEED_DIR / "query_panel.json"
    if not file_path.exists():
        raise FileNotFoundError(f"Query panel not found: {file_path}")
    
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_product_by_id(product_id: str, state: Literal["thin", "rich", "competitor"] = "thin") -> Product | None:
    catalog = load_catalog(state)
    for p in catalog:
        if p.product_id == product_id:
            return p
    return None
