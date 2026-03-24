# 🎯 Smart Souq Admin Dashboard

## 📁 Structure

```
app/dashboard/admin/
├── page.tsx                    # Main Overview Dashboard
├── users/page.tsx              # Users Management
├── orders/page.tsx             # Orders Management  
├── payouts/page.tsx            # Payouts Management
├── logs/
│   ├── layout.tsx              # Logs Navigation Layout
│   ├── security/page.tsx       # Security Logs
│   └── financial/page.tsx      # Financial Logs
└── layout.tsx                  # Main Admin Layout
```

## 🚀 Features

### 📊 Overview Dashboard (`/dashboard/admin`)
- **Real-time Statistics**: Users, Orders, Commissions, Wallets
- **Financial Overview**: Platform earnings, seller earnings, payouts
- **Recent Activity**: Latest orders with full details
- **Top Sellers**: Performance ranking
- **Monthly Analytics**: Revenue and order trends

### 👥 Users Management (`/dashboard/admin/users`)
- **User Search**: Filter by name, email, username
- **User Details**: Complete profile with wallet info
- **Activity Stats**: Orders, products, commissions, payouts
- **Status Management**: Active/inactive users
- **Pagination**: Efficient data loading

### 📦 Orders Management (`/dashboard/admin/orders`)
- **Order Filtering**: By status (COMPLETED, REFUNDED, PAID, etc.)
- **Order Details**: Customer, product, seller, amounts
- **Commission Tracking**: Automatic calculation display
- **Status Management**: Visual status indicators
- **Date Tracking**: Created and updated timestamps

### 💸 Payouts Management (`/dashboard/admin/payouts`)
- **Payout Requests**: All withdrawal requests
- **Status Filtering**: PENDING, APPROVED, REJECTED, PROCESSING
- **Destination Details**: IBAN and wallet addresses
- **User Information**: Requester details
- **Processing Dates**: Creation and completion times

### 🔒 Security Logs (`/dashboard/admin/logs/security`)
- **Real-time Monitoring**: Live security events
- **Operation Tracking**: Login attempts, admin access
- **IP Address Tracking**: Source monitoring
- **Auto-refresh**: 30-second updates
- **Event Statistics**: Top operations and IPs

### 💰 Financial Logs (`/dashboard/admin/logs/financial`)
- **Transaction Tracking**: All financial operations
- **Amount Analytics**: Credits, debits, net flow
- **Operation Details**: Commission creation, settlements
- **User Tracking**: Transaction sources
- **Real-time Updates**: Live financial monitoring

## 🛠️ Technical Implementation

### 🔗 API Integration
```typescript
// All pages use the same pattern
import axios from "@/services/api";

const response = await axios.get("/admin/overview");
setData(response.data.overview);
```

### 📊 Data Flow
1. **Frontend** → **Axios** → **Backend API** → **Prisma** → **PostgreSQL**
2. **Authentication**: JWT tokens with admin verification
3. **Error Handling**: Comprehensive error states and messages
4. **Loading States**: Visual feedback during data fetching

### 🎨 UI Components
- **shadcn/ui**: Card, Button, Input, Select components
- **Lucide Icons**: Consistent iconography
- **Tailwind CSS**: Responsive design system
- **TypeScript**: Full type safety

### 📱 Responsive Design
- **Mobile**: Collapsible sidebar with hamburger menu
- **Desktop**: Fixed sidebar navigation
- **Tablet**: Adaptive layouts
- **Loading**: Skeleton states and spinners

## 🔧 Configuration

### 📝 Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 🗂️ Required Dependencies
```json
{
  "axios": "^1.6.0",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.0.0"
}
```

### 🎯 shadcn/ui Components
```bash
npx shadcn-ui@latest add card button input select
```

## 🔐 Security Features

### 🛡️ Authentication
- **JWT Verification**: Token-based authentication
- **Role-based Access**: Admin-only endpoints
- **Session Management**: Automatic token refresh
- **Unauthorized Handling**: Graceful error handling

### 📊 Data Protection
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Proper data sanitization
- **CSRF Protection**: Secure API calls
- **Rate Limiting**: Backend protection

## 🚀 Getting Started

### 1️⃣ Install Dependencies
```bash
npm install axios lucide-react
npx shadcn-ui@latest add card button input select
```

### 2️⃣ Configure API
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 3️⃣ Add Navigation
```typescript
// Add to your main navigation
<Link href="/dashboard/admin">
  <Button>Admin Dashboard</Button>
</Link>
```

### 4️⃣ Start Development
```bash
npm run dev
```

## 📈 Performance Features

### ⚡ Optimizations
- **Pagination**: Large dataset handling
- **Debounced Search**: Efficient filtering
- **Auto-refresh**: Real-time data updates
- **Lazy Loading**: Component-level loading
- **Error Boundaries**: Graceful error handling

### 📊 Analytics
- **Real-time Stats**: Live dashboard updates
- **Historical Data**: Monthly and yearly trends
- **User Behavior**: Activity tracking
- **Financial Metrics**: Revenue and commission tracking

## 🎨 Customization

### 🎯 Theming
```css
/* Customize colors in tailwind.config.js */
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  }
}
```

### 📱 Layout Customization
```typescript
// Modify layout.tsx for custom navigation
const navigation = [
  // Add your custom routes here
];
```

## 🔧 Troubleshooting

### 🐛 Common Issues

#### ❌ API Connection Error
```bash
# Check if backend is running
curl http://localhost:4000/health
```

#### ❌ Authentication Error
```typescript
// Check token in localStorage
console.log(localStorage.getItem('accessToken'));
```

#### ❌ Component Import Error
```bash
# Install missing shadcn components
npx shadcn-ui@latest add [component-name]
```

### 📞 Support
- **Backend API**: Check `/api/admin/overview` endpoint
- **Database**: Verify PostgreSQL connection
- **Authentication**: Test JWT token generation
- **Network**: Check CORS configuration

## 🎉 Next Steps

### 🚀 Production Deployment
1. **Environment Setup**: Configure production variables
2. **Build Optimization**: Optimize bundle size
3. **Security Audit**: Review authentication
4. **Performance Testing**: Load testing
5. **Monitoring**: Add error tracking

### 🎨 Feature Enhancements
1. **Charts Integration**: Add data visualization
2. **Export Features**: CSV/PDF downloads
3. **Advanced Filtering**: Date range filters
4. **Bulk Actions**: Multi-select operations
5. **Email Notifications**: Automated alerts

---

**🎯 Smart Souq Admin Dashboard - Complete Management Solution**
