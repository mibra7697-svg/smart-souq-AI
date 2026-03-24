# 🚀 Smart Souq Deployment Guide

## 📋 المتطلبات الأساسية

### **البرامج المطلوبة:**
- Docker & Docker Compose
- Git
- OpenSSL (لشهادات SSL)
- Domain name (للإنتاج)

### **الموارد الموصى بها:**
- **CPU:** 2 cores minimum
- **RAM:** 4GB minimum
- **Storage:** 20GB minimum
- **Network:** Stable internet connection

---

## 🔧 إعداد البيئة

### 1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd smart-souq-project
```

### 2. **إعداد متغيرات البيئة**
```bash
# نسخ ملف البيئة للإنتاج
cp .env.production .env

# تعديل القيم الحساسة
nano .env
```

**⚠️ قم بتغيير القيم التالية:**
- `DB_PASSWORD` - كلمة مرور قاعدة البيانات
- `JWT_SECRET` - سر JWT (256 بت على الأقل)
- `REFRESH_TOKEN_SECRET` - سر تحديث الرمز
- `SESSION_SECRET` - سر الجلسة

### 3. **إنشاء شهادات SSL**
```bash
# للتطوير
chmod +x scripts/generate-ssl.sh
./scripts/generate-ssl.sh

# للإنتاج (استخدم Let's Encrypt)
certbot --nginx -d yourdomain.com
```

---

## 🚀 النشر

### **النشر السريع:**
```bash
# جعل السكريبت قابلاً للتنفيذ
chmod +x deploy-prod.sh

# تشغيل النشر
./deploy-prod.sh
```

### **النشر يدوياً:**
```bash
# 1. إيقاف الخدمات الحالية
docker-compose down

# 2. سحب آخر التحديثات
git pull origin main

# 3. بناء الصور
docker-compose build --no-cache

# 4. تشغيل الخدمات
docker-compose up -d

# 5. تشغيل الهجرات
docker-compose exec backend npx prisma migrate deploy

# 6. التحقق من الحالة
docker-compose ps
```

---

## 🌐 الوصول للتطبيق

### **عنوان URL:**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Health Check:** http://localhost:4000/api/health

### **مع Nginx (للإنتاج):**
- **HTTP:** http://yourdomain.com
- **HTTPS:** https://yourdomain.com

---

## 📊 المراقبة والصيانة

### **مراقبة الحالة:**
```bash
# مراقبة الخدمات
./scripts/monitor.sh

# عرض السجلات
docker-compose logs -f

# عرض حالة الحاويات
docker-compose ps
```

### **النسخ الاحتياطي:**
```bash
# نسخ احتياطي لقاعدة البيانات
chmod +x scripts/backup-db.sh
./scripts/backup-db.sh

# استعادة النسخ الاحتياطي
gunzip -c backups/smartsouq_backup_YYYYMMDD_HHMMSS.sql.gz | docker-compose exec -T postgres psql -U postgres smartsouq
```

---

## 🔧 إدارة الخدمات

### **إعادة تشغيل الخدمات:**
```bash
# إعادة تشغيل جميع الخدمات
docker-compose restart

# إعادة تشغيل خدمة محددة
docker-compose restart backend
docker-compose restart frontend
```

### **تحديث التطبيق:**
```bash
# تحديث الكود
git pull origin main

# إعادة البناء والنشر
docker-compose build --no-cache
docker-compose up -d
```

### **الهجرات:**
```bash
# تشغيل الهجرات
docker-compose exec backend npx prisma migrate deploy

# إنشاء هجرة جديدة
docker-compose exec backend npx prisma migrate dev --name migration_name
```

---

## 🛠️ استكشاف الأخطاء

### **مشاكل شائعة:**

#### **1. الحاوية لا تبدأ:**
```bash
# عرض السجلات
docker-compose logs backend
docker-compose logs frontend

# التحقق من الموارد
docker stats
```

#### **2. مشاكل قاعدة البيانات:**
```bash
# التحقق من الاتصال
docker-compose exec postgres pg_isready -U postgres

# عرض سجلات PostgreSQL
docker-compose logs postgres
```

#### **3. مشاكل الشبكة:**
```bash
# التحقق من الشبكات
docker network ls
docker network inspect smart-souq-project_smart-souq-network
```

#### **4. مشاكل SSL:**
```bash
# التحقق من الشهادات
openssl x509 -in nginx/ssl/cert.pem -text -noout

# اختبار Nginx
docker-compose exec nginx nginx -t
```

---

## 🔒 الأمان

### **تأمين الإنتاج:**
1. **تغيير كلمات المرور الافتراضية**
2. **استخدام شهادات SSL حقيقية**
3. **تأمين جدار الحماية**
4. **تحديث الحزم بانتظام**
5. **مراقبة السجلات**

### **أوامر الأمان:**
```bash
# تحديث الحزم
docker-compose pull

# فحص الثغرات
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image smart-souq-project_backend:latest
```

---

## 📈 الأداء

### **تحسين الأداء:**
```bash
# زيادة حدود الذاكرة
echo 'vm.max_map_count=262144' >> /etc/sysctl.conf

# تحسين Docker
echo '{"default-ulimits": {"nofile": {"Name": "nofile", "Hard": 64000, "Soft": 64000}}}' > /etc/docker/daemon.json
```

### **مراقبة الأداء:**
```bash
# استخدام الموارد
docker stats --no-stream

# حجم البيانات
docker system df
```

---

## 🆘 الدعم

### **الحصول على المساعدة:**
1. **عرض السجلات:** `docker-compose logs`
2. **التحقق من الحالة:** `./scripts/monitor.sh`
3. **مراجعة الوثائق:** `README.md`
4. **التواصل:** [Support Channel]

### **أوامر الطوارئ:**
```bash
# إيقاف جميع الخدمات
docker-compose down

# مسح البيانات (⚠️ احذر)
docker-compose down -v

# إعادة تعيين المشروع
docker system prune -a
```

---

## 📝 ملاحظات الإنتاج

### **قبل النشر للإنتاج:**
- [ ] تغيير جميع كلمات المرور
- [ ] إعداد شهادات SSL حقيقية
- [ ] تكوين النطاق وال DNS
- [ ] إعداد المراقبة
- [ ] اختبار النسخ الاحتياطي
- [ ] فحص الأمان

### **بعد النشر:**
- [ ] مراقبة الأداء
- [ ] تحديث بانتظام
- [ ] نسخ احتياطي دوري
- [ ] مراجعة السجلات
- [ ] اختبار الاسترداد من الكوارث

---

**🎉恭喜！مبروك! Congratulations!**  
**تم نشر Smart Souq بنجاح! 🚀**
