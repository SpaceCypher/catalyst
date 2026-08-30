#!/usr/bin/env bash
set -e

echo "🚀 Starting Catalyst AI Commerce Revenue Agent Demo..."

# Check if database exists
if [ ! -f "data/generated/catalyst.db" ]; then
    echo "🌱 Initializing database and generating simulation data..."
    ./.venv/bin/python scripts/seed_db.py
fi

# Function to kill child processes on exit
cleanup() {
    echo "🛑 Shutting down Catalyst services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit
}
trap cleanup SIGINT SIGTERM EXIT

# Start backend on :8000
echo "⚡ Starting FastAPI Backend at http://localhost:8000 (Docs at /docs)..."
./.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Start frontend on :5173
echo "✨ Starting Frontend at http://localhost:5173..."
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo "=========================================================="
echo "🎯 Catalyst is running!"
echo "   • Merchant Dashboard: http://localhost:5173"
echo "   • FastAPI API Docs:   http://localhost:8000/docs"
echo "   • Model Reasoning:    Gemini 3.5 Flash"
echo "=========================================================="

wait
