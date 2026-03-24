#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Preparing SmartSouq demo database..."

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/backend"

echo "🔁 Resetting database with Prisma migrate reset..."
npx prisma migrate reset --force --skip-generate --skip-seed

echo "🌱 Seeding high-quality demo data..."
npx prisma db seed

cd "$ROOT_DIR"

echo "✅ Database ready with demo data."

echo "▶️ Starting backend (port 4000)..."
(
  cd backend
  pnpm dev
) &>/dev/null &

echo "▶️ Starting frontend (port 3000)..."
(
  cd frontend
  pnpm dev
) &>/dev/null &

echo "🎉 Demo mode is starting up. Backend: http://localhost:4000, Frontend: http://localhost:3000"

