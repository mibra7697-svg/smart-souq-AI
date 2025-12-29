@echo off
echo ========================================
echo    تشغيل مشروع سوق سمارت - Smart Souq
echo ========================================
echo.

REM التحقق من تثبيت Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ خطأ: Node.js غير مثبت على النظام!
    echo الرجاء تثبيت Node.js من https://nodejs.org/
    pause
    exit /b 1
)

REM التحقق من إصدار Node.js
for /f "tokens=3" %%v in ('node --version') do set NODE_VERSION=%%v
echo ✅ إصدار Node.js: %NODE_VERSION%

REM التحقق من تثبيت npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ خطأ: npm غير مثبت على النظام!
    pause
    exit /b 1
)

REM عرض إصدار npm
for /f "tokens=3" %%v in ('npm --version') do set NPM_VERSION=%%v
echo ✅ إصدار npm: %NPM_VERSION%
echo.

REM الانتقال إلى مجلد المشروع (إذا كان الملف في مكان آخر)
cd /d "%~dp0"

REM حذف node_modules والملفات المؤقتة إن وجدت
echo 📦 تنظيف الملفات المؤقتة...
if exist node_modules (
    echo حذف node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo حذف package-lock.json...
    del package-lock.json
)

REM تثبيت المكتبات
echo.
echo 📦 جاري تثبيت المكتبات المطلوبة...
call npm install

if %errorlevel% neq 0 (
    echo ❌ فشل تثبيت المكتبات!
    pause
    exit /b 1
)

echo.
echo ✅ تم تثبيت المكتبات بنجاح!

REM التحقق من وجود الملفات الأساسية
if not exist "src\App.jsx" (
    echo ❌ خطأ: ملف App.jsx غير موجود في مجلد src!
    pause
    exit /b 1
)

if not exist "public\index.html" (
    echo ❌ خطأ: ملف index.html غير موجود في مجلد public!
    pause
    exit /b 1
)

echo.
echo 📁 بنية المشروع صحيحة.

REM عرض معلومات المشروع
if exist package.json (
    for /f "tokens=2 delims=:," %%a in ('type package.json ^| findstr /i /c:"\"name\""') do set PROJECT_NAME=%%a
    for /f "tokens=2 delims=:," %%b in ('type package.json ^| findstr /i /c:"\"version\""') do set PROJECT_VERSION=%%b
    
    set PROJECT_NAME=%PROJECT_NAME:"=%
    set PROJECT_VERSION=%PROJECT_VERSION:"=%
    set PROJECT_NAME=%PROJECT_NAME: =%
    set PROJECT_VERSION=%PROJECT_VERSION: =%
    
    echo 📋 اسم المشروع: %PROJECT_NAME%
    echo 🏷️  الإصدار: %PROJECT_VERSION%
)

echo.
echo ========================================
echo ⚡ جاري تشغيل سوق سمارت...
echo 👉 سيفتح المتصفح تلقائياً على http://localhost:3000
echo 📌 اضغط Ctrl+C لإيقاف التشغيل
echo ========================================
echo.

REM تشغيل المشروع
call npm start

if %errorlevel% neq 0 (
    echo.
    echo ❌ فشل تشغيل المشروع!
    echo.
    echo 🔍 الأسباب المحتملة:
    echo 1. المنفذ 3000 مستخدم بالفعل
    echo 2. هناك خطأ في الكود
    echo 3. مشكلة في إعدادات المشروع
    echo.
    echo 💡 الحلول المقترحة:
    echo - تأكد من عدم وجود تطبيق آخر يعمل على المنفذ 3000
    echo - تحقق من ملفات المشروع وخاصة App.jsx
    echo - جرب حذف node_modules وإعادة التشغيل
    echo.
    pause
    exit /b 1
)

pause