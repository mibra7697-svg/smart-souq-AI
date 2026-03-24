# Deploy Smart Souq on Vercel (Frontend) + Render (Backend)

## Frontend on Vercel:
1. اربط مستودع Git مع Vercel.
2. اختر مجلد frontend كمصدر.
3. تأكد أن build command: pnpm build و output: .next

## Backend on Render:
1. أنشئ Web Service جديد من نفس المستودع.
2. اختر مجلد backend.
3. أمر التشغيل: node dist/index.js بعد pnpm install && pnpm build.
4. حدّث متغيرات البيئة في Vercel لتشير إلى URL الباك إند على Render.
