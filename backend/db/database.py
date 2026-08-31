import sqlite3
import json
import os
from pathlib import Path
from backend.config import settings

def get_db_path() -> str:
    path = Path(settings.DB_PATH)
    path.parent.mkdir(parents=True, exist_ok=True)
    return str(path)

def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(get_db_path(), timeout=30.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA busy_timeout = 30000;")
    return conn

def init_db():
    schema_path = Path(__file__).resolve().parent / "schema.sql"
    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    with get_connection() as conn:
        conn.executescript(schema_sql)
        # Ensure default agent_state row
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM agent_state WHERE id = 1")
        if not cursor.fetchone():
            cursor.execute("""
                INSERT INTO agent_state (
                    id, current_state, active_opportunity_id, active_diff_id, 
                    active_experiment_id, last_thought, next_action_recommendation, updated_at
                ) VALUES (
                    1, 'OBSERVE', 'opp-01', 'diff-apex-01', 'exp-01',
                    'Discovered significant AI visibility gap for Apex Ridge Waterproof Trekking Boots vs Competitor A.',
                    'Review and approve proposed FixDiff #1 to test incremental AI GMV.',
                    datetime('now')
                )
            """)
        conn.commit()

def reset_db():
    """Wipe all mutable data and re-initialize to a clean baseline state."""
    with get_connection() as conn:
        # Delete all rows from every mutable table (preserve schema)
        conn.execute("DELETE FROM fix_diffs")
        conn.execute("DELETE FROM experiments")
        conn.execute("DELETE FROM agent_events")
        conn.execute("DELETE FROM sessions")
        conn.execute("DELETE FROM query_results")
        conn.execute("DELETE FROM agent_state")
        conn.commit()
    # Re-create the default agent_state seed row
    init_db()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at", get_db_path())

