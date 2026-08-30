#!/usr/bin/env bash
set -e

echo "🚀 Building and Deploying Catalyst + Dummy Storefronts to Vercel..."

cd frontend
npm run build
npx vercel --prod --yes
cd ..

echo "✅ Deployment complete!"
