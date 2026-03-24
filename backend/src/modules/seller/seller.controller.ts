import { Request, Response } from 'express';

export const sellerOverview = async (req: Request, res: Response) => {
  res.json({
    revenue: 0,
    orders: 0,
    products: 0,
    rating: 0
  });
};

export const sellerPerformanceMetrics = async (req: Request, res: Response) => {
  res.json({
    views: 0,
    conversionRate: 0,
    totalSales: 0
  });
};
