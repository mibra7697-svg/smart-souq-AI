import { Request, Response } from 'express';
import { prisma } from '../core/prisma/client';
import { catchAsync } from '../core/middleware/errorHandler';

export const adminOverview = catchAsync(async (req: Request, res: Response) => {
  const [
    totalOrders,
    completedOrders,
    refundedOrders,
    commissionsData,
    payoutsData,
    walletData,
    recentOrders,
    topSellers,
    recentPayouts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'DELIVERED' } }),
    prisma.order.count({ where: { status: 'REFUNDED' } }),
    prisma.commission.aggregate({ _sum: { amount: true } }),
    prisma.payoutRequest.aggregate({ _sum: { amount: true } }),
    prisma.wallet.aggregate({
      _sum: { availableBalance: true, pendingBalance: true },
    }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { product: { include: { seller: true } } },
    }),
    prisma.user.findMany({
      where: { role: 'SELLER' },
      take: 5,
      include: {
        sellerProducts: {
          include: { orders: true },
        },
      },
    }),
    prisma.payoutRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  res.json({
    stats: {
      totalOrders,
      completedOrders,
      refundedOrders,
      totalCommissions: Number(commissionsData._sum.amount || 0),
      totalPayouts: Number(payoutsData._sum.amount || 0),
      availableBalance: Number(walletData._sum.availableBalance || 0),
      pendingBalance: Number(walletData._sum.pendingBalance || 0),
    },
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      sellerName: o.product?.seller?.name || 'Unknown',
      amount: Number(o.amount),
      status: o.status,
      createdAt: o.createdAt,
    })),
    topSellers:
      topSellers.map((s) => ({
        id: s.id,
        name: s.name,
        totalSales:
          s.sellerProducts?.reduce(
            (sum: number, p: any) => sum + (p.orders?.length || 0),
            0,
          ) || 0,
        totalCommissions: 0,
      })) || [],
    recentPayouts: recentPayouts.map((p) => ({
      id: p.id,
      sellerName: p.user?.name || 'Unknown',
      amount: Number(p.amount),
      status: p.status,
      createdAt: p.createdAt,
    })),
  });
});

export const adminUsers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 20, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where =
    search && String(search).trim().length > 0
      ? {
          OR: [
            {
              name: {
                contains: String(search),
                mode: 'insensitive' as const,
              },
            },
            {
              email: {
                contains: String(search),
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  res.json({
    users: users.map((u) => ({
      ...u,
      status: u.isActive ? 'ACTIVE' : 'INACTIVE',
    })),
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

export const adminOrders = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 20, status } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where =
    status && status !== 'ALL'
      ? { status: String(status) as any }
      : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: { product: { include: { seller: true } } },
    }),
    prisma.order.count({ where }),
  ]);

  res.json({
    orders: orders.map((o) => ({
      id: o.id,
      sellerName: o.product?.seller?.name || 'Unknown',
      amount: Number(o.amount),
      status: o.status,
      createdAt: o.createdAt,
    })),
    total,
  });
});

export const adminPayouts = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 20, status, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (status && status !== 'ALL') {
    where.status = String(status);
  }

  if (search && String(search).trim().length > 0) {
    where.user = {
      OR: [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } },
      ],
    };
  }

  const [payouts, total] = await Promise.all([
    prisma.payoutRequest.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
    prisma.payoutRequest.count({ where }),
  ]);

  res.json({
    data: {
      payouts: payouts.map((p) => ({
        id: p.id,
        amount: Number(p.amount),
        status: p.status,
        method: p.method,
        seller: { username: p.user?.name, email: p.user?.email },
        createdAt: p.createdAt,
      })),
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
      },
    },
  });
});

export const adminSecurityLogs = catchAsync(
  async (req: Request, res: Response) => {
    res.json({ logs: [], message: 'Security logging coming soon' });
  },
);

export const adminFinancialLogs = catchAsync(
  async (req: Request, res: Response) => {
    res.json({ logs: [], message: 'Financial logging coming soon' });
  },
);
