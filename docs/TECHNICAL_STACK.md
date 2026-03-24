## SmartSouq Technical Stack & Architecture

### Core Technologies

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js 18+, Express, TypeScript
- **Data Layer**: Prisma ORM, PostgreSQL 15
- **Runtime & Packaging**: pnpm, Docker, Docker Compose
- **Testing**: Jest (backend unit/integration), Playwright (frontend E2E)

---

### High-Level Architecture

SmartSouq is implemented as a **“micro‑monolith”**: a single deployable service with clearly separated domain modules and shared core infrastructure.

- **Core layer**
  - `core/prisma`: Prisma client and DB connection
  - `core/middleware`: `authGuard`, rate limiting, error handling
  - `core/utils`: JWT helpers, pagination, logging helpers
- **API layer**
  - `src/index.ts`: Express bootstrap, CORS, security middleware, and route mounting
  - `src/routes/health.ts`: `/api/health` operational health endpoint

---

### Domain Modules (7 Logical Domains)

All modules live under `src/modules` and are wired into `/api/*` routes.

1. **Authentication & Users (`auth`)**
   - JWT-based login / logout / refresh
   - `User` model with roles: `ADMIN`, `SELLER`, `BUYER`, `AFFILIATE`
   - Refresh tokens persisted in `RefreshToken` table
   - Guards other modules via `authGuard`

2. **Catalog & Products (`products`)**
   - CRUD for `Product`
   - Seller ownership enforced via `sellerId`
   - Per-product `commissionRate` used by the commission engine

3. **Orders & Escrow (`orders`)**
   - Order lifecycle: `PENDING → PAID → DELIVERED` or `REFUNDED`
   - Buyer balance debited from `Wallet.availableBalance`
   - Seller funds held in `Wallet.pendingBalance` until delivery
   - Integrates with **Commissions** and **Settlement** services

4. **Commissions & Affiliate Engine (`commissions`)**
   - `Commission` records per order / product / affiliate (`userId`)
   - Aggregates per-user and platform totals
   - Escrow release flow:
     - Commission initially created in `APPROVED` state
     - Admin release moves amount into affiliate wallet and marks `PAID`

5. **Wallets & Payouts (`wallet`, `payouts`)**
   - `Wallet` model with `availableBalance`, `pendingBalance`, and currency
   - `WalletTransaction` history for audits (`COMMISSION`, `PURCHASE`, `REFUND`, etc.)
   - `PayoutRequest` model for withdrawal requests (bank transfer / digital wallets)
   - Payout approval updates wallet balances and status

6. **Admin & Seller Operations (`admin`, `seller`)**
   - Admin overview dashboard stats API (`/api/admin/overview`)
   - Admin tools for commissions, orders, payouts, and logs
   - Seller-facing endpoints for viewing orders, commissions, and payouts

7. **AI & Notifications (`services/ai.service`, `services/notification.service`, `modules/telegram`)**
   - AI recommendation service for affiliate links (high-commission / high‑conversion products)
   - Notification service for Telegram bot / webhook integration
   - Telegram module for register / lookup / send notification APIs

---

### Data Model Overview (Prisma)

Key Prisma models (see `backend/prisma/schema.prisma` for full details):

- `User`: core identity and role
- `Wallet`, `WalletTransaction`: balances and financial history
- `Product`: catalog entries with per-product commission rates
- `Order`: purchase records with buyer, seller, and optional affiliate
- `Commission`: earned commissions, with status (`PENDING`, `APPROVED`, `PAID`, `CANCELLED`)
- `PayoutRequest`: withdrawal workflow and status
- `AffiliateLink`: tracking codes tying affiliates to products

PostgreSQL is the primary data store; all queries go through Prisma to enforce type‑safe access and migrations.

---

### Security & Compliance

- **Transport**
  - HTTPS is expected in front of the API (via Nginx / load balancer)
  - CORS is restricted to known frontend origins (`http://localhost:3000` and `FRONTEND_URL`)

- **Authentication**
  - JWTs signed with HS256 via `core/utils/jwt.ts`
  - Access / refresh tokens with configurable expiry
  - `authGuard` middleware extracts Bearer token and populates `req.userId`

- **Hardening**
  - `helmet` for secure HTTP headers
  - `compression` for bandwidth efficiency
  - Rate limiting middleware (`sensitiveLimiter`) for admin / sensitive routes
  - Centralized error handler to avoid leaking stack traces

- **Database Safety**
  - All writes go through Prisma transactions for multi-step operations (orders, commissions, payouts)
  - Monetary fields are stored as `Decimal` with explicit precision
  - Indices on high-cardinality / query-critical fields (`status`, `createdAt`, foreign keys)

---

### Frontend Architecture

- **App Router structure**
  - `src/app/auth/*`: authentication flows (login)
  - `src/app/dashboard/*`: seller/affiliate dashboards
  - `src/app/dashboard/admin/*`: admin dashboard and management pages

- **State & Auth**
  - `AuthProvider` context manages user + JWT token
  - Tokens stored in `localStorage` and attached via Axios interceptor
  - Next.js middleware guards `/dashboard` routes by checking auth cookies / tokens

- **UI & Internationalization**
  - **RTL‑first** layout with `<html lang="ar" dir="rtl">`
  - Primary typeface: **IBM Plex Sans Arabic**
  - Arabic-first copy for dashboard and financial flows, with English where appropriate

- **Data Visualization**
  - Recharts is used for:
    - Orders by status (bar chart)
    - Commissions vs payouts trends (line chart)
    - Seller / platform performance metrics (admin views)

---

### Deployment & Operations

- **Docker images**
  - Backend: built from `backend/Dockerfile.production`
  - Frontend: built from `frontend/Dockerfile.production`
  - Nginx (optional) for TLS termination and routing

- **Docker Compose (production)**
  - `backend` + `frontend` + `db` (Postgres) + `redis` (+ optional `nginx`)
  - Health checks on Postgres (`pg_isready`) and API (`/health` + `/api/health`)
  - Named volumes for persistent Postgres and Redis data

- **Environment Configuration**
  - `DATABASE_URL`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`
  - `NEXT_PUBLIC_API_URL` for frontend API base
  - Optional: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_DEFAULT_CHAT_ID` for notifications

This document should be kept up to date as we evolve the architecture (e.g., extracting services, adding queues, or introducing more AI features).

