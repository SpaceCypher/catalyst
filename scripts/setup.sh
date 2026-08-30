#!/usr/bin/env bash
set -e

echo "🚀 Setting up Catalyst environment..."
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

if [ -d "frontend" ]; then
    echo "📦 Installing frontend npm dependencies..."
    cd frontend && npm install && cd ..
fi

echo "✅ Catalyst setup complete! Run 'bash scripts/run_full_pipeline.sh' to generate data and run the pipeline."
