@echo off
echo ========================================
echo   SmartSouq Investor Demo Reset Script
echo ========================================
echo.

REM Change to backend directory
echo Switching to backend directory...
cd backend

REM Regenerate Prisma client
echo Regenerating Prisma client...
call npx prisma generate

REM Reset database and synchronize schema
echo Resetting database and synchronizing schema...
call npx prisma db push --force-reset

REM Seed database with growth data
echo Seeding database with 90-day growth data...
call npx prisma db seed

REM Return to root directory
echo Returning to root directory...
cd ..

echo.
echo ========================================
echo   Demo Reset Completed Successfully!
echo ========================================
echo.
echo Database has been reset with (Local PostgreSQL):
echo - Connection: localhost:5432 (smartsouq_db)
echo - 90 days of order data
echo - 15%% growth in Month 2
echo - 30%% growth in Month 3
echo.
pause