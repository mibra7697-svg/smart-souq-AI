# Smart Souq — Comprehensive Documentation

## Project Title
**Smart Souq** — A Modern Hybrid Brokerage & Affiliate Commerce Platform.

## Features List
- **Brokerage System**: Secure escrow-based transactions between buyers and sellers.
- **Affiliate Marketing**: Advanced commission tracking, tiered rates, and affiliate dashboards.
- **Wallet System**: Integrated digital wallet for managing earnings, payouts, and purchases.
- **Seller Dashboard**: Comprehensive tools for product management and sales tracking.
- **Admin Panel**: Full system oversight, user management, and financial analytics.
- **AI Integration**: Intelligent product analysis and customer persuasion tools using local LLMs.
- **Secure Authentication**: Robust JWT-based auth with role-based access control (RBAC).

## Project Structure
- `backend/`: Node.js/Express application with Prisma ORM.
- `frontend/`: Next.js 14 application (App Router) with Tailwind CSS.
- `deploy/`: Deployment configurations for Docker, Nginx, and PM2.
- `docs/`: Project documentation and guides.
- `scripts/`: Utility scripts for maintenance and setup.

## Requirements
- **Node.js**: v18.0.0 or higher.
- **Package Manager**: pnpm (recommended), npm, or yarn.
- **Database**: PostgreSQL 13+.
- **AI Engine (Optional)**: Ollama.

## Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/smart-souq-project.git
   cd smart-souq-project
   ```

2. **Install Dependencies**:
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Environment Setup**:
   - Copy `.env.example` to `.env` in both `backend` and `frontend` directories.
   - Update database credentials and API keys.

## Database Setup
1. Ensure PostgreSQL is running.
2. Run Prisma migrations:
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```
3. (Optional) Seed the database:
   ```bash
   npx prisma db seed
   ```

## Running Instructions
- **Development Mode**:
  ```bash
  pnpm dev
  ```
  This starts both frontend (http://localhost:3000) and backend (http://localhost:4001).

- **Production Mode**:
  ```bash
  pnpm build
  pnpm start
  ```

## Docker Deployment
1. Build and run containers:
   ```bash
   docker-compose up --build -d
   ```
2. Verify services:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4001
   - Database: Port 5432

## AI Integration
To enable AI features for product analysis and customer interaction:
1. Download and install Ollama from [https://ollama.com/download](https://ollama.com/download).
2. Pull the required model:
   ```bash
   ollama pull llama3.2
   ```
3. Ensure the AI service is running on port 11434.

## Troubleshooting
- **Database Connection**: Verify `DATABASE_URL` in `.env`. Ensure Postgres is accepting connections.
- **Port Conflicts**: If ports 3000 or 4001 are in use, update `.env` or kill the processes.
- **Prisma Errors**: Run `npx prisma generate` after any schema changes.

## Developer Note
This project is currently under active development. Some features may be in beta. Contributions are welcome!
