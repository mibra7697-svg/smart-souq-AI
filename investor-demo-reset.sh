#!/usr/bin/env bash
set -euo pipefail

echo "🧼 Investor Demo Reset: SmartSouq"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📦 Resetting database schema (Prisma db push --force-reset)..."
cd "$ROOT_DIR/backend"

# Note: this repo currently uses db push (no migrations folder).
npx prisma generate
npx prisma db push --force-reset

echo "🌱 Seeding investor-grade demo data..."
npx prisma db seed

echo "✅ Done. Your demo DB is fresh and ready."

