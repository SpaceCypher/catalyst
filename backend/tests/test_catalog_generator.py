import pytest
from backend.generators.catalog_generator import load_catalog, load_query_panel, get_product_by_id

def test_catalogs_load_and_validate():
    thin = load_catalog("thin")
    rich = load_catalog("rich")
    comp = load_catalog("competitor")
    
    assert len(thin) >= 10
    assert len(rich) >= 10
    assert len(comp) >= 5

    # Assert thin has fewer attributes and FAQs than rich
    thin_boot = next(p for p in thin if p.product_id == "merch-boot-01")
    rich_boot = next(p for p in rich if p.product_id == "merch-boot-01")
    
    assert len(thin_boot.attributes) < len(rich_boot.attributes)
    assert thin_boot.faq_count < rich_boot.faq_count
    assert not thin_boot.has_structured_schema
    assert rich_boot.has_structured_schema

def test_query_panel_loads():
    queries = load_query_panel()
    assert len(queries) == 40
    assert all("query_id" in q and "query_text" in q for q in queries)
