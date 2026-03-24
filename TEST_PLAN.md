# 🧪 Smart Souq Test Plan

## 📋 Overview
This document outlines the comprehensive testing strategy for the Smart Souq Seller Dashboard system.

## 🔧 Backend Tests (Jest + Supertest)

### ✅ Health Check Tests
- **File**: `backend/tests/health.test.ts`
- **Coverage**: Server health, uptime, memory usage
- **Commands**: `npm test` (from backend directory)

### ✅ Authentication Tests
- **File**: `backend/tests/auth.test.ts`
- **Coverage**: Login, token validation, protected routes
- **Commands**: `npm test` (from backend directory)

### 🚀 Run Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

## 🎭 Frontend Tests (Playwright E2E)

### ✅ Dashboard Tests
- **File**: `frontend/tests/dashboard.spec.ts`
- **Coverage**: Full user journey through all pages
- **Features Tested**:
  - Login flow
  - Dashboard overview
  - Navigation between pages
  - Orders page functionality
  - Commissions page functionality
  - Payouts page functionality
  - Logout functionality

### 🚀 Run Frontend Tests
```bash
cd frontend
npm run test:e2e        # Headless mode
npm run test:e2e:ui     # Interactive UI mode
npm run test:e2e:headed # Headed mode (visible browser)
```

## 🔄 Integration Tests

### 📊 Manual Testing Checklist

#### 1️⃣ Authentication Flow
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Token storage in localStorage
- [ ] Automatic redirect to dashboard
- [ ] Logout functionality

#### 2️⃣ Dashboard Overview
- [ ] Wallet balance display
- [ ] Orders summary
- [ ] Commissions summary
- [ ] Payouts summary
- [ ] Real-time data loading

#### 3️⃣ Orders Page
- [ ] Orders table display
- [ ] Filter by status (ALL, PAID, COMPLETED, REFUNDED)
- [ ] Order details display
- [ ] Statistics cards
- [ ] Responsive design

#### 4️⃣ Commissions Page
- [ ] Commissions table display
- [ ] Total earnings calculation
- [ ] Status badges
- [ ] Order ID linking
- [ ] Date formatting

#### 5️⃣ Payouts Page
- [ ] Payout request form
- [ ] Amount validation
- [ ] Request submission
- [ ] Payout history table
- [ ] Status tracking

#### 6️⃣ Navigation & Layout
- [ ] Sidebar navigation
- [ ] Mobile responsiveness
- [ ] Page transitions
- [ ] Breadcrumb structure
- [ ] Loading states

## 🛠️ Development Commands

### 🚀 Start All Services
```bash
# Backend
cd backend
npm run dev

# Frontend (in separate terminal)
cd frontend
npm run dev
```

### 🧪 Run All Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm run test:e2e
```

### 🧹 Clean Cache
```bash
# Frontend
cd frontend
rm -rf .next
npm run dev

# Browser
Ctrl + Shift + R (hard refresh)
```

## 📊 Test Coverage

### Backend API Endpoints
- ✅ `/health` - Server health
- ✅ `/api/health` - Detailed health
- ✅ `/auth/login` - Authentication
- ✅ `/api/wallet` - Wallet data
- ✅ `/api/orders/my` - User orders
- ✅ `/api/commissions/my` - User commissions
- ✅ `/api/commissions/my/total` - Total commissions
- ✅ `/api/payouts/my` - User payouts
- ✅ `/api/payouts/request` - Request payout

### Frontend Pages
- ✅ `/` - Home/redirect
- ✅ `/auth/login` - Login page
- ✅ `/dashboard` - Dashboard overview
- ✅ `/dashboard/orders` - Orders page
- ✅ `/dashboard/commissions` - Commissions page
- ✅ `/dashboard/payouts` - Payouts page

## 🎯 Success Criteria

### ✅ Backend Tests Pass
- All 6 backend tests passing
- Health checks responding correctly
- Authentication flow working
- API endpoints returning correct data

### ✅ Frontend Tests Pass
- All E2E tests passing
- User journey complete
- All pages loading correctly
- Navigation working properly

### ✅ Manual Verification
- No console errors
- All API calls returning 200
- Responsive design working
- Real-time data updates

## 🚨 Troubleshooting

### Common Issues
1. **Port conflicts**: Kill existing Node processes
2. **Database connection**: Check Prisma configuration
3. **CORS issues**: Verify backend CORS settings
4. **Token expiration**: Clear localStorage and re-login
5. **Cache issues**: Hard refresh browser

### Debug Commands
```bash
# Check backend health
curl http://localhost:4000/health

# Check API health
curl http://localhost:4000/api/health

# Test login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📈 Performance Metrics

### Target Performance
- **Page Load**: < 2 seconds
- **API Response**: < 500ms
- **Test Execution**: < 30 seconds
- **Coverage**: > 80%

### Monitoring
- Backend health endpoint
- Frontend error tracking
- API response times
- User interaction metrics

---

**Last Updated**: January 26, 2026
**Version**: 1.0.0
**Status**: ✅ Ready for Production
