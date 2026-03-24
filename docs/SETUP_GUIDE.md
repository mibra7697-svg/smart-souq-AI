 # Smart Souq — Setup Guide (English + Arabic) 
 Version: 1.0.0  
 Last Updated: 2026-02-07  
 
 ==================================================== 
 =================  ENGLISH VERSION  ================= 
 ==================================================== 
 
 # Smart Souq — Setup Guide  
 This guide explains how to install, configure, and run the Smart Souq platform (backend + frontend + database + optional AI integration). 
 
 ---------------------------------------------------- 
 ## 1. Requirements 
 
 ### System Requirements 
 - Node.js 18+ 
 - npm or yarn (pnpm recommended) 
 - PostgreSQL 13+ 
 - Git 
 - (Optional) Docker & Docker Compose 
 - (Optional) Ollama for AI features 
 
 ### Recommended Hardware 
 - CPU: 4 cores  
 - RAM: 8 GB  
 - Storage: 20 GB SSD  
 
 ---------------------------------------------------- 
## 2. Project Structure 

- `backend/`: Express.js API, Prisma ORM, and business logic.
- `frontend/`: Next.js 14+ Frontend (App Router).
- `deploy/`: Deployment configurations (Docker, Nginx, PM2).
- `docs/`: Project documentation.
- `scripts/`: Utility scripts for maintenance and auditing.
 
 ---------------------------------------------------- 
## 3. Installation (Local Development) 

1. **Clone the repository:** 
    ```bash 
    git clone <repo_url> 
    cd smart-souq-project 
    ``` 
 
2. **Install dependencies (using pnpm):** 
    ```bash 
    npm install -g pnpm 
    pnpm install 
    ``` 
 
3. **Database Setup:** 
   - Ensure PostgreSQL is running (locally or via Docker). 
   - Create a new database (e.g., `smartsouq`). 
   - Configure `backend/.env` with your database URL. 
    ```bash 
    cd backend 
   npx prisma generate 
   npx prisma db push
   npm run db:seed
    ``` 
 
 ---------------------------------------------------- 
 ## 4. Configuration 
 
### Backend (.env)  (local dev example)
 ```env 
PORT=4000 
DATABASE_URL="postgresql://smartuser:StrongPassword123!@localhost:5432/smartsouq" 
JWT_SECRET="change-me-in-production"
REFRESH_TOKEN_SECRET="change-me-refresh"
FRONTEND_URL="http://localhost:3000"
 ``` 
 
### Frontend (.env.local) 
 ```env 
NEXT_PUBLIC_API_URL="http://localhost:4000" 
 ``` 
 
 ---------------------------------------------------- 
## 5. Running the Application 

### Development Mode 

Run backend and frontend in separate terminals:

```bash
# Terminal 1 – backend
cd backend
npm install        # first time only
npm run dev        # http://localhost:4000

# Terminal 2 – frontend
cd frontend
npm install        # first time only
npm run dev        # http://localhost:3000
```

If you prefer pnpm workspaces:

```bash
pnpm dev
```

### Production Build (local, no Docker)

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

---------------------------------------------------- 
## 6. Running with Docker (Production-like)

Smart Souq ships with a production‑oriented `docker-compose.yml` that runs:
- PostgreSQL
- Redis
- Backend API (port 4000)
- Frontend (port 3000)

From the project root:

```bash
docker compose up -d db redis
docker compose run --rm backend npx prisma db push
docker compose run --rm backend npm run db:seed
docker compose up -d backend frontend
```

Then open:
- API health: `http://localhost:4000/health` and `http://localhost:4000/api/health`
- Frontend: `http://localhost:3000`
 
 ==================================================== 
 =================  ARABIC VERSION  ================== 
 ==================================================== 
 
 # دليل الإعداد — Smart Souq 
 يشرح هذا الدليل كيفية تثبيت وإعداد وتشغيل منصة Smart Souq (الواجهة الخلفية، الواجهة الأمامية، وقاعدة البيانات). 
 
 ---------------------------------------------------- 
 ## 1. المتطلبات 
 
 ### متطلبات النظام 
 - Node.js 18+ 
 - PostgreSQL 13+ 
 - Git 
 - pnpm (مستحسن) 
 
 ### العتاد المقترح 
 - المعالج: 4 أنوية 
 - الذاكرة: 8 جيجابايت 
 - التخزين: 20 جيجابايت SSD 
 
 ---------------------------------------------------- 
 ## 2. هيكلية المشروع 
 
 - `backend/`: يحتوي على كود الخادم (Express) وقاعدة البيانات (Prisma). 
 - `frontend/`: يحتوي على واجهة المستخدم (Next.js). 
 - `deploy/`: ملفات النشر وإعدادات السيرفرات (Docker, Nginx). 
 - `docs/`: ملفات التوثيق. 
 
 ---------------------------------------------------- 
 ## 3. التثبيت 
 
 1. **نسخ المستودع:** 
    ```bash 
    git clone <repo_url> 
    cd smart-souq-project 
    ``` 
 
 2. **تثبيت الاعتمادات:** 
    ```bash 
    pnpm install 
    ``` 
 
 3. **إعداد قاعدة البيانات:** 
    تأكد من عمل PostgreSQL، ثم قم بتحديث ملف `.env` في مجلد `backend` برابط الاتصال، ثم نفذ: 
    ```bash 
    cd backend 
    npx prisma generate 
    npx prisma db push 
    ``` 
 
 ---------------------------------------------------- 
 ## 4. الإعدادات (Configuration) 
 
 ### إعدادات الباك إند (.env) 
 يجب ضبط المتغيرات التالية: `PORT`, `DATABASE_URL`, `JWT_SECRET`. 
 
 ### إعدادات الفرونت إند (.env) 
 يجب ضبط `NEXT_PUBLIC_API_URL` ليشير إلى رابط الباك إند. 
 
 ---------------------------------------------------- 
 ## 5. تشغيل التطبيق 
 
 ### وضع التطوير (Development) 
 لتشغيل النظام بالكامل: 
 ```bash 
 pnpm dev 
 ``` 
 
 ### وضع الإنتاج (Production) 
 لبناء وتشغيل النسخة النهائية: 
 ```bash 
 pnpm build 
 pnpm start 
 ```