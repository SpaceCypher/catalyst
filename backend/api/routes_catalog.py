from fastapi import APIRouter, HTTPException
from typing import Literal
from backend.models.product import CatalogListResponse, Product
from backend.generators.catalog_generator import load_catalog

router = APIRouter(prefix="/api/catalog", tags=["Catalog"])

@router.get("/{state}", response_model=CatalogListResponse)
def get_catalog_by_state(state: Literal["thin", "rich", "competitor"]):
    try:
        products = load_catalog(state)
        return CatalogListResponse(
            state=state,
            count=len(products),
            products=products
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
