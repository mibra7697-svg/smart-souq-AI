# Save as: create-smart-souq.ps1
# Right-click and "Run with PowerShell"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "     إنشاء مشروع سوق سمارت من الصفر" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# تحقق من Node.js
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
    Write-Host "❌ خطأ: Node.js غير مثبت!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 يرجى تثبيت Node.js من: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Start-Process "https://nodejs.org/"
    pause
    exit
}

# عرض إصدار Node.js
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# إدخال اسم المشروع
$projectName = Read-Host "📛 أدخل اسم المشروع (افتراضي: smart-souq)"
if (-not $projectName) { $projectName = "smart-souq" }

# اختيار الموقع
Write-Host ""
Write-Host "📁 اختر موقع إنشاء المشروع:" -ForegroundColor Yellow
Write-Host "1. سطح المكتب" -ForegroundColor White
Write-Host "2. مجلد المستندات" -ForegroundColor White
Write-Host "3. المجلد الحالي" -ForegroundColor White
Write-Host ""

$locationChoice = Read-Host "🔘 اختر رقم الخيار (1/2/3)"

switch ($locationChoice) {
    "1" { $projectPath = "$env:USERPROFILE\Desktop\$projectName" }
    "2" { $projectPath = "$env:USERPROFILE\Documents\$projectName" }
    "3" { $projectPath = "$PWD\$projectName" }
    default { $projectPath = "$env:USERPROFILE\Desktop\$projectName" }
}

Write-Host ""
Write-Host "📍 سينشأ المشروع في: $projectPath" -ForegroundColor Cyan

# إنشاء المجلدات
Write-Host ""
Write-Host "📁 جاري إنشاء المجلدات..." -ForegroundColor Yellow

$folders = @(
    "$projectPath",
    "$projectPath\public",
    "$projectPath\src",
    "$projectPath\src\components",
    "$projectPath\src\pages",
    "$projectPath\src\utils",
    "$projectPath\src\assets",
    "$projectPath\scripts",
    "$projectPath\config",
    "$projectPath\docs"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    Write-Host "✅ تم إنشاء: $folder" -ForegroundColor Green
}

# إنشاء package.json
$packageJson = @{
    name = $projectName
    version = "1.0.0"
    private = $true
    description = "سوق سمارت - منصة تسويقية ذكية"
    author = "سوق سمارت"
    license = "MIT"
    dependencies = @{
        react = "^18.2.0"
        "react-dom" = "^18.2.0"
        "lucide-react" = "^0.263.1"
    }
    scripts = @{
        start = "react-scripts start"
        build = "react-scripts build"
        test = "react-scripts test"
        eject = "react-scripts eject"
    }
    devDependencies = @{
        tailwindcss = "^3.3.0"
        postcss = "^8.4.21"
        autoprefixer = "^10.4.14"
        "react-scripts" = "5.0.1"
    }
}

$packageJson | ConvertTo-Json | Out-File "$projectPath\package.json" -Encoding UTF8
Write-Host "✅ تم إنشاء package.json" -ForegroundColor Green

# إنشاء ملفات HTML و CSS أساسية
$indexHtml = @'
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سوق سمارت</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
</body>
</html>
'@

$indexHtml | Out-File "$projectPath\public\index.html" -Encoding UTF8
Write-Host "✅ تم إنشاء index.html" -ForegroundColor Green

# إنشاء ملف App.jsx بسيط
$appJsx = @'
import React from "react";

function App() {
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "50px",
      fontFamily: "'Noto Sans Arabic', sans-serif"
    }}>
      <h1 style={{ color: "#3b82f6" }}>سوق سمارت</h1>
      <p>منصة التسويق الذكية</p>
      <p>تم الإنشاء بنجاح! ابدأ التطوير الآن.</p>
    </div>
  );
}

export default App;
'@

$appJsx | Out-File "$projectPath\src\App.jsx" -Encoding UTF8
Write-Host "✅ تم إنشاء App.jsx" -ForegroundColor Green

# إنشاء ملف index.js
$indexJs = @'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
'@

$indexJs | Out-File "$projectPath\src\index.js" -Encoding UTF8
Write-Host "✅ تم إنشاء index.js" -ForegroundColor Green

# إنشاء ملف start.bat مبسط
$startBat = @'
@echo off
chcp 65001 >nul
echo.
echo تشغيل مشروع...
echo.
npm install
echo.
echo جاري التشغيل...
npm start
pause
'@

$startBat | Out-File "$projectPath\start.bat" -Encoding UTF8
Write-Host "✅ تم إنشاء start.bat" -ForegroundColor Green

# الرسالة النهائية
Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
Write-Host "🎉 تم إنشاء مشروع '$projectName' بنجاح!" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📌 الخطوات التالية:" -ForegroundColor Cyan
Write-Host "1. افتح المجلد: $projectPath" -ForegroundColor White
Write-Host "2. انقر نقراً مزدوجاً على start.bat" -ForegroundColor White
Write-Host "3. انتظر اكتمال التثبيت" -ForegroundColor White
Write-Host "4. افتح http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "🚀 يمكنك البدء في التطوير الآن!" -ForegroundColor Green
Write-Host ""
pause