import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    GEMINI_API_KEY: str = "AQ.Ab8RN6LgRf-fn9DPQ7sc4EpOsh7YGJs8q9Wg-5kZStYvUxPyrQ"
    LLM_MODEL: str = "gemini-2.5-flash"  # Gemini Flash reasoning endpoint
    LLM_DISPLAY_NAME: str = "Gemini 3.5 Flash"
    RANDOM_SEED: int = 42
    NUM_SHOPPING_TRIALS_PER_QUERY: int = 20
    TOTAL_QUERIES_IN_PANEL: int = 40
    SESSIONS_TUNING_COUNT: int = 1500
    SESSIONS_HELDOUT_COUNT: int = 1500
    CONTROL_TRAFFIC_VOLUME: int = 2000
    TREATMENT_TRAFFIC_VOLUME: int = 2000
    DB_PATH: str = str(BASE_DIR / "data" / "generated" / "catalyst.db")
    
    # Versioning tags for reproducibility
    CATALOG_VERSION: str = "v1.2"
    QUERY_PANEL_VERSION: str = "v1.0"
    ATTRIBUTION_RULE_VERSION: str = "v2.1"
    SIMULATION_VERSION: str = "v1.0"
    EXPERIMENT_VERSION: str = "v1.0"

    class Config:
        env_file = str(BASE_DIR / ".env")
        env_file_encoding = "utf-8"
        extra = "ignore"

# Read from api-key.txt if present
api_key_file = BASE_DIR / "api-key.txt"
if api_key_file.exists():
    try:
        content = api_key_file.read_text().strip()
        if content:
            os.environ["GEMINI_API_KEY"] = content
    except Exception:
        pass

settings = Settings()
