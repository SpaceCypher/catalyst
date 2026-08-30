#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "⚡ Running Catalyst Full Data Generation & Seed Pipeline"
echo "=========================================================="

./.venv/bin/python scripts/seed_db.py

echo "=========================================================="
echo "✨ Pipeline executed successfully. Artifacts in data/generated/"
echo "=========================================================="
