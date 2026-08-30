from typing import Literal
from pydantic import BaseModel, Field

class Product(BaseModel):
    product_id: str
    name: str
    category: str
    price: float
    attributes: list[str] = Field(default_factory=list)
    review_count: int = 0
    review_detail_score: float = 0.0  # 0 to 1
    faq_count: int = 0
    has_structured_schema: bool = False
    catalog_state: Literal["thin", "rich", "competitor"]

class CatalogListResponse(BaseModel):
    state: Literal["thin", "rich", "competitor"]
    count: int
    products: list[Product]
