# 🔵 Smart Souq (سوق سمارت)
**The First Solana-Powered Affiliate Marketplace in the MENA Region.**

Smart Souq is a next-generation brokerage and affiliate platform designed to bridge the gap between traditional commerce and Web3. We solve the "payout friction" by using the Solana blockchain to provide instant, low-fee commission withdrawals in USDC.

## 🚀 Key Features
- **Hybrid Web2/Web3 Auth:** Traditional JWT-based login with optional Solana wallet linking.
- **On-Chain Payouts:** Instant USDC withdrawals via Solana network (Devnet ready).
- **Arabic-First UX:** Fully localized Arabic interface with RTL support.
- **Security First:** Robust validation using `PublicKey.isOnCurve` and protected API routes.
- **Complete Dashboard:** Comprehensive management for products, orders, and commissions.

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Mantine UI, Solana Wallet Adapter.
- **Backend:** Node.js, Express, TypeScript.
- **Database:** PostgreSQL with Prisma ORM.
- **Blockchain:** Solana Web3.js (`@solana/web3.js`).

## 📦 Project Structure
- `/frontend`: The Next.js web application.
- `/backend`: Express API with Prisma logic.
- `/docs`: Business plan, technical stack, and deployment guides.

## 🏁 Quick Start
1. **Clone & Install:**
   ```bash
   git clone [your-repo-link]
   cd smart-souq-project
   npm install
   ```
2. **Environment Setup:**
   Configure your `.env` in both `backend` and `frontend` folders (DB URL, JWT Secret).
3. **Run Development:**
   ```bash
   # Backend
   cd backend && npm run dev
   # Frontend
   cd frontend && npm run dev
   ```

## 🗺️ Roadmap
- [x] Solana Wallet Integration.
- [x] Arabic Localization & UX Polish.
- [ ] Smart Contract Escrow for buyer protection.
- [ ] Loyalty NFT program for top-performing affiliates.

Created with passion by Ibrahim Yaseen Mrhij - Prompt Engineer & Full-stack Developer.