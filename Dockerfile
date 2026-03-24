# 🐳 Dockerfile لمنصة الوساطة الذكية - Smart Souq Brokerage

# استخدام Node.js كصورة أساسية
FROM node:18-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات الاعتماديات
COPY package*.json ./

# تثبيت الاعتماديات
RUN npm install --production

# نسخ كود المصدر
COPY . .

# إنشاء مجلد للبيانات
RUN mkdir -p /app/data

# تعيين الصلاحيات
RUN chown -R node:node /app
USER node

# كشف المنفذ
EXPOSE 3000

# متغيرات البيئة
ENV NODE_ENV=production
ENV PORT=3000
ENV OLLAMA_URL=http://ai-engine:11434

# أمر التشغيل
CMD ["npm", "start"]

# معلومات الصورة
LABEL maintainer="Smart Souq Team"
LABEL description="🤖 وسيط Smart Souq الذكي - منصة وساطة تجارية بالذكاء الاصطناعي"
LABEL version="1.0.0"
