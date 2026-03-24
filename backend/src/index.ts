/// <reference path="./types/express.d.ts" />
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

console.log('Starting server...');
dotenv.config();
console.log('Config loaded');

import authRoutes from './modules/auth/auth.routes';
import productsRoutes from './modules/products/products.routes';
import commissionsRoutes from './modules/commissions/commissions.routes';
import ordersRoutes from './modules/orders/orders.routes';
import payoutsRoutes from './modules/payouts/payouts.routes';
import walletRoutes from './modules/wallet/wallet.routes';
import adminRoutes from './modules/admin/admin.routes';
import sellerRoutes from './modules/seller/seller.routes';
import telegramRoutes from './modules/telegram/telegram.routes';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4001',
  process.env.FRONTEND_URL
].filter((origin): origin is string => !!origin);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Smart Souq API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Smart Souq API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      products: "/api/products",
      orders: "/api/orders"
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/commissions', commissionsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payouts', payoutsRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/telegram', telegramRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 4000;

console.log(`Attempting to start server on port ${PORT}...`);
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Smart Souq API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
